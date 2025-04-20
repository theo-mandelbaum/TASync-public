import { PdfViewerBase } from '../index';
import { createElement, Browser, isNullOrUndefined, isBlazor } from '@syncfusion/ej2-base';
/**
 * The `TextMarkupAnnotation` module is used to handle text markup annotation actions of PDF viewer.
 *
 * @hidden
 * @param {Event} event - It describes about the event
 * @returns {void}
 */
var TextMarkupAnnotation = /** @class */ (function () {
    /**
     * @param {PdfViewer} pdfViewer - It describes about the pdfViewer
     * @param {PdfViewerBase} viewerBase - It describes about the viewerBase
     * @private
     * @returns {void}
     */
    function TextMarkupAnnotation(pdfViewer, viewerBase) {
        var _this = this;
        /**
         * @private
         */
        this.currentTextMarkupAddMode = '';
        /**
         * @private
         */
        this.selectTextMarkupCurrentPage = null;
        /**
         * @private
         */
        this.currentTextMarkupAnnotation = null;
        /**
         * @private
         */
        this.isAddAnnotationProgramatically = false;
        this.currentAnnotationIndex = null;
        this.isAnnotationSelect = false;
        /**
         * @private
         */
        this.isDropletClicked = false;
        /**
         * @private
         */
        this.isRightDropletClicked = false;
        /**
         * @private
         */
        this.isLeftDropletClicked = false;
        /**
         * @private
         */
        this.isSelectionMaintained = false;
        this.isExtended = false;
        this.isNewAnnotation = false;
        this.selectedTextMarkup = null;
        this.multiPageCollection = [];
        this.triggerAddEvent = false;
        /**
         * @private
         */
        this.isSelectedAnnotation = false;
        this.dropletHeight = 20;
        // To update the height value of strikethrough and underline annotations for Chinese language (Task ID: 861029).
        this.strikeoutDifference = -3;
        this.underlineDifference = 2;
        /**
         * @private
         */
        this.annotationClickPosition = {};
        this.maintainSelection = function () {
            _this.isDropletClicked = true;
            _this.pdfViewer.textSelectionModule.initiateSelectionByTouch();
            _this.isExtended = true;
            _this.pdfViewer.textSelectionModule.selectionRangeArray = [];
        };
        this.selectionEnd = function () {
            if (_this.isDropletClicked) {
                _this.isDropletClicked = false;
            }
        };
        this.annotationLeftMove = function () {
            if (_this.isDropletClicked) {
                _this.isLeftDropletClicked = true;
            }
        };
        this.annotationRightMove = function () {
            if (_this.isDropletClicked) {
                _this.isRightDropletClicked = true;
            }
        };
        this.pdfViewer = pdfViewer;
        this.pdfViewerBase = viewerBase;
    }
    /**
     * @private
     * @returns {void}
     */
    TextMarkupAnnotation.prototype.createAnnotationSelectElement = function () {
        this.dropDivAnnotationLeft = createElement('div', { id: this.pdfViewer.element.id + '_droplet_left', className: 'e-pv-drop' });
        this.dropDivAnnotationLeft.style.borderRight = '2px solid';
        this.dropDivAnnotationRight = createElement('div', { id: this.pdfViewer.element.id + '_droplet_right', className: 'e-pv-drop' });
        this.dropDivAnnotationRight.style.borderLeft = '2px solid';
        this.dropElementLeft = createElement('div', { className: 'e-pv-droplet', id: this.pdfViewer.element.id + '_dropletspan_left' });
        this.dropElementLeft.style.transform = 'rotate(0deg)';
        this.dropDivAnnotationLeft.appendChild(this.dropElementLeft);
        this.dropElementRight = createElement('div', { className: 'e-pv-droplet', id: this.pdfViewer.element.id + '_dropletspan_right' });
        this.dropElementRight.style.transform = 'rotate(-90deg)';
        this.dropDivAnnotationRight.appendChild(this.dropElementRight);
        this.pdfViewerBase.pageContainer.appendChild(this.dropDivAnnotationLeft);
        this.pdfViewerBase.pageContainer.appendChild(this.dropDivAnnotationRight);
        this.dropElementLeft.style.top = '20px';
        this.dropElementRight.style.top = '20px';
        this.dropElementRight.style.left = '-8px';
        this.dropElementLeft.style.left = '-8px';
        this.dropDivAnnotationLeft.style.display = 'none';
        this.dropDivAnnotationRight.style.display = 'none';
        this.dropDivAnnotationLeft.addEventListener('mousedown', this.maintainSelection);
        this.dropDivAnnotationLeft.addEventListener('mousemove', this.annotationLeftMove);
        this.dropDivAnnotationLeft.addEventListener('mouseup', this.selectionEnd);
        this.dropDivAnnotationRight.addEventListener('mousedown', this.maintainSelection);
        this.dropDivAnnotationRight.addEventListener('mousemove', this.annotationRightMove);
        this.dropDivAnnotationRight.addEventListener('mouseup', this.selectionEnd);
    };
    /**
     * @param {any} target - It describes about the target
     * @param {any} x - It describes about the X
     * @param {any} y - It describes about the Y
     * @private
     * @returns {void}
     */
    TextMarkupAnnotation.prototype.textSelect = function (target, x, y) {
        if (this.isLeftDropletClicked) {
            var leftElement = this.dropDivAnnotationRight.getBoundingClientRect();
            var rightElement = this.dropDivAnnotationLeft.getBoundingClientRect();
            var clientX = x;
            var clientY = y;
            if (target.classList.contains('e-pv-text')) {
                if ((rightElement.top - 25) > leftElement.top) {
                    this.pdfViewer.textSelectionModule.textSelectionOnDrag(target, clientX, clientY, true);
                }
                else {
                    this.pdfViewer.textSelectionModule.textSelectionOnDrag(target, clientX, clientY, false);
                }
                this.updateLeftposition(clientX, clientY);
            }
        }
        else if (this.isRightDropletClicked) {
            var leftElement = this.dropDivAnnotationLeft.getBoundingClientRect();
            var clientX = x;
            var clientY = y;
            if (target.classList.contains('e-pv-text')) {
                if ((clientY) >= leftElement.top) {
                    this.pdfViewer.textSelectionModule.textSelectionOnDrag(target, clientX, clientY, true);
                }
                else {
                    this.pdfViewer.textSelectionModule.textSelectionOnDrag(target, clientX, clientY, false);
                }
                this.updatePosition(clientX, clientY);
            }
        }
    };
    /**
     * @param {boolean} hide - It describes about the hide
     * @private
     * @returns {void}
     */
    TextMarkupAnnotation.prototype.showHideDropletDiv = function (hide) {
        var type = this.pdfViewer.annotationModule.textMarkupAnnotationModule.currentTextMarkupAddMode;
        var isEnableResizer = this.isEnableTextMarkupResizer(type);
        if (isEnableResizer && this.dropDivAnnotationLeft && this.dropDivAnnotationRight) {
            if (hide) {
                this.dropDivAnnotationLeft.style.display = 'none';
                this.dropDivAnnotationRight.style.display = 'none';
            }
            else {
                this.dropDivAnnotationLeft.style.display = '';
                this.dropDivAnnotationRight.style.display = '';
                this.updateDropletStyles(type);
            }
        }
    };
    /**
     * @param {string} type - It describes about the type
     * @private
     * @returns {boolean} - boolean
     */
    TextMarkupAnnotation.prototype.isEnableTextMarkupResizer = function (type) {
        var isEnableResizer = false;
        if (type) {
            if (type === 'Highlight' && this.pdfViewer.highlightSettings.enableTextMarkupResizer) {
                isEnableResizer = true;
            }
            else if (type === 'Underline' && this.pdfViewer.underlineSettings.enableTextMarkupResizer) {
                isEnableResizer = true;
            }
            else if (type === 'Strikethrough' && this.pdfViewer.strikethroughSettings.enableTextMarkupResizer) {
                isEnableResizer = true;
            }
            else if (this.pdfViewer.enableTextMarkupResizer) {
                isEnableResizer = true;
            }
        }
        else {
            if (this.pdfViewer.enableTextMarkupResizer) {
                isEnableResizer = true;
            }
            else if (this.pdfViewer.highlightSettings.enableTextMarkupResizer) {
                isEnableResizer = true;
            }
            else if (this.pdfViewer.underlineSettings.enableTextMarkupResizer) {
                isEnableResizer = true;
            }
            else if (this.pdfViewer.strikethroughSettings.enableTextMarkupResizer) {
                isEnableResizer = true;
            }
        }
        return isEnableResizer;
    };
    TextMarkupAnnotation.prototype.updateDropletStyles = function (type) {
        if (this.isEnableTextMarkupResizer(type) && this.dropDivAnnotationLeft && this.dropDivAnnotationLeft.offsetWidth > 0) {
            this.dropDivAnnotationLeft.style.width = this.dropletHeight * this.pdfViewerBase.getZoomFactor() + 'px';
            this.dropDivAnnotationRight.style.width = this.dropletHeight * this.pdfViewerBase.getZoomFactor() + 'px';
            this.dropElementLeft.style.width = this.dropletHeight * this.pdfViewerBase.getZoomFactor() + 'px';
            this.dropElementRight.style.width = this.dropletHeight * this.pdfViewerBase.getZoomFactor() + 'px';
            this.dropDivAnnotationLeft.style.height = this.dropletHeight * this.pdfViewerBase.getZoomFactor() + 'px';
            this.dropDivAnnotationRight.style.height = this.dropletHeight * this.pdfViewerBase.getZoomFactor() + 'px';
            this.dropElementLeft.style.height = this.dropletHeight * this.pdfViewerBase.getZoomFactor() + 'px';
            this.dropElementRight.style.height = this.dropletHeight * this.pdfViewerBase.getZoomFactor() + 'px';
            this.dropElementLeft.style.top = this.dropletHeight * this.pdfViewerBase.getZoomFactor() + 'px';
            this.dropElementRight.style.top = this.dropletHeight * this.pdfViewerBase.getZoomFactor() + 'px';
        }
    };
    TextMarkupAnnotation.prototype.updateAnnotationBounds = function () {
        this.isSelectionMaintained = false;
        var annotation = this.currentTextMarkupAnnotation;
        if (annotation && annotation.isMultiSelect) {
            this.showHideDropletDiv(true);
            this.updateMultiAnnotBounds(annotation);
        }
        else if (annotation && annotation.bounds) {
            this.retreieveSelection(annotation, null);
            this.pdfViewer.textSelectionModule.maintainSelection(this.selectTextMarkupCurrentPage, false);
            this.isSelectionMaintained = true;
            window.getSelection().removeAllRanges();
        }
    };
    TextMarkupAnnotation.prototype.updateMultiAnnotBounds = function (annotation) {
        if (!annotation.annotpageNumbers) {
            var annotationList = this.getAnnotations(annotation.pageNumber, null);
            if (annotationList) {
                for (var z = 0; z < annotationList.length; z++) {
                    if (annotationList[parseInt(z.toString(), 10)].annotName === annotation.annotName) {
                        annotation = annotationList[parseInt(z.toString(), 10)];
                        break;
                    }
                }
            }
        }
        var lowestNumber = annotation.annotpageNumbers[0];
        var highestNumber = annotation.annotpageNumbers[0];
        for (var p = 0; p < annotation.annotpageNumbers.length; p++) {
            var currentPage = annotation.annotpageNumbers[parseInt(p.toString(), 10)];
            if (currentPage >= highestNumber) {
                highestNumber = currentPage;
            }
            if (currentPage <= lowestNumber) {
                lowestNumber = currentPage;
            }
        }
        for (var k = lowestNumber; k <= highestNumber; k++) {
            var annotationList = this.getAnnotations(k, null);
            if (annotationList) {
                for (var j = 0; j < annotation.annotNameCollection.length; j++) {
                    var currentAnnot = annotation.annotNameCollection[parseInt(j.toString(), 10)];
                    for (var z = 0; z < annotationList.length; z++) {
                        if (annotationList[parseInt(z.toString(), 10)].annotName === currentAnnot) {
                            var newAnnotation = annotationList[parseInt(z.toString(), 10)];
                            this.retreieveSelection(newAnnotation, null);
                            this.pdfViewer.textSelectionModule.maintainSelection(newAnnotation.pageNumber, false);
                        }
                    }
                }
            }
        }
        this.isSelectionMaintained = true;
        window.getSelection().removeAllRanges();
    };
    TextMarkupAnnotation.prototype.retreieveSelection = function (annotation, element) {
        for (var k = 0; k < annotation.bounds.length; k++) {
            var bound = annotation.bounds[parseInt(k.toString(), 10)];
            var x = (bound.left ? bound.left : bound.Left) * this.pdfViewerBase.getZoomFactor();
            var y = (bound.top ? bound.top : bound.Top) * this.pdfViewerBase.getZoomFactor();
            var width = (bound.width ? bound.width : bound.Width) * this.pdfViewerBase.getZoomFactor();
            var textLayer = this.pdfViewerBase.getElement('_textLayer_' + annotation.pageNumber);
            if (textLayer) {
                var textDivs = textLayer.childNodes;
                for (var n = 0; n < textDivs.length; n++) {
                    if (textDivs[parseInt(n.toString(), 10)]) {
                        var rangebounds = textDivs[parseInt(n.toString(), 10)].getBoundingClientRect();
                        var top_1 = this.getClientValueTop(rangebounds.top, annotation.pageNumber);
                        var currentLeft = rangebounds.left - this.pdfViewerBase.getElement('_pageDiv_' + annotation.pageNumber).getBoundingClientRect().left;
                        var totalLeft = currentLeft + rangebounds.width;
                        var textDiVLeft = parseInt(textDivs[parseInt(n.toString(), 10)].style.left, 10);
                        var currentTop = parseInt(textDivs[parseInt(n.toString(), 10)].style.top, 10);
                        var isLeftBounds = this.pdfViewer.textSelectionModule.
                            checkLeftBounds(currentLeft, textDiVLeft, totalLeft, x);
                        var isTopBounds = this.pdfViewer.textSelectionModule.checkTopBounds(top_1, currentTop, y);
                        if (isLeftBounds && isTopBounds) {
                            element = textDivs[parseInt(n.toString(), 10)];
                            break;
                        }
                    }
                }
                if (element != null) {
                    var boundingRect = this.pdfViewerBase.getElement('_textLayer_' + annotation.pageNumber).getBoundingClientRect();
                    this.pdfViewer.textSelectionModule.textSelectionOnMouseMove(element, x + boundingRect.left, y + boundingRect.top, false);
                    if ((annotation.bounds.length - 1) === k) {
                        this.pdfViewer.textSelectionModule.textSelectionOnMouseMove(element, x + boundingRect.left + width, y + boundingRect.top, false);
                    }
                }
            }
        }
    };
    /**
     * @param {number} x - It describes about the X
     * @param {number} y - It describes about the Y
     * @param {boolean} isSelected - It describes about the isSelected
     * @private
     * @returns {void}
     */
    TextMarkupAnnotation.prototype.updatePosition = function (x, y, isSelected) {
        this.showHideDropletDiv(false);
        var pageTopValue = this.pdfViewerBase.pageSize[this.pdfViewerBase.currentPageNumber - 1].top;
        var topClientValue = this.getClientValueTop(y, this.pdfViewerBase.currentPageNumber - 1);
        var rightDivElement = document.getElementById(this.pdfViewer.element.id + '_droplet_right');
        if (isSelected) {
            rightDivElement.style.top = topClientValue * this.pdfViewerBase.getZoomFactor() + pageTopValue * this.pdfViewerBase.getZoomFactor() + 'px';
        }
        else {
            rightDivElement.style.top = topClientValue + pageTopValue * this.pdfViewerBase.getZoomFactor() + 'px';
        }
        rightDivElement.style.left = x + this.pdfViewerBase.viewerContainer.scrollLeft - this.pdfViewerBase.viewerContainer.getBoundingClientRect().left + 'px';
    };
    /**
     * @param {number} x - It describes about the X
     * @param {number} y - It describes about the Y
     * @param {boolean} isSelected - It describes about the isSelected
     * @private
     * @returns {void}
     */
    TextMarkupAnnotation.prototype.updateLeftposition = function (x, y, isSelected) {
        this.showHideDropletDiv(false);
        var pageTopValue = this.pdfViewerBase.pageSize[this.pdfViewerBase.currentPageNumber - 1].top;
        var topClientValue = this.getClientValueTop(y, this.pdfViewerBase.currentPageNumber - 1);
        var leftDivElement = document.getElementById(this.pdfViewer.element.id + '_droplet_left');
        leftDivElement.style.display = '';
        if (isSelected) {
            leftDivElement.style.top = topClientValue * this.pdfViewerBase.getZoomFactor() + pageTopValue * this.pdfViewerBase.getZoomFactor() + 'px';
        }
        else {
            leftDivElement.style.top = topClientValue + pageTopValue * this.pdfViewerBase.getZoomFactor() + 'px';
        }
        leftDivElement.style.left = x + this.pdfViewerBase.viewerContainer.scrollLeft - this.pdfViewerBase.viewerContainer.getBoundingClientRect().left - (this.dropletHeight * this.pdfViewerBase.getZoomFactor()) + 'px';
    };
    TextMarkupAnnotation.prototype.getClientValueTop = function (clientValue, pageNumber) {
        if (this.pdfViewerBase.getElement('_pageDiv_' + pageNumber)) {
            return clientValue - this.pdfViewerBase.getElement('_pageDiv_' + pageNumber).getBoundingClientRect().top;
        }
        else {
            return clientValue;
        }
    };
    /**
     * @param {any} textMarkupAnnotations - It describes about the text markup annotations
     * @param {number} pageNumber - It describes about the page number
     * @param {boolean} isImportTextMarkup - It describes about the isImportTextMarkup
     * @param {boolean} isAnnotOrderAction - It describes about the isAnnotOrderAction
     * @private
     * @returns {void}
     */
    TextMarkupAnnotation.prototype.renderTextMarkupAnnotationsInPage = function (textMarkupAnnotations, pageNumber, isImportTextMarkup, isAnnotOrderAction) {
        var canvasId = textMarkupAnnotations && textMarkupAnnotations.textMarkupAnnotationType === 'Highlight' ? '_blendAnnotationsIntoCanvas_' : '_annotationCanvas_';
        var canvas = (canvasId === '_blendAnnotationsIntoCanvas_') ? this.pdfViewerBase.getElement(canvasId + pageNumber) :
            this.pdfViewerBase.getAnnotationCanvas(canvasId, pageNumber);
        if (isImportTextMarkup) {
            this.renderTextMarkupAnnotations(null, pageNumber, canvas, this.pdfViewerBase.getZoomFactor());
            this.renderTextMarkupAnnotations(textMarkupAnnotations, pageNumber, canvas, this.pdfViewerBase.getZoomFactor(), true);
        }
        else {
            this.renderTextMarkupAnnotations(textMarkupAnnotations, pageNumber, canvas, this.pdfViewerBase.getZoomFactor(), null, isAnnotOrderAction);
        }
    };
    TextMarkupAnnotation.prototype.renderTextMarkupAnnotations = function (textMarkupAnnotations, pageNumber, canvas, factor, isImportAction, isAnnotOrderAction) {
        var highlightCanvasContext = null;
        if (canvas) {
            var context = canvas.getContext('2d');
            context.setTransform(1, 0, 0, 1, 0, 0);
            context.setLineDash([]);
            var annotations_1;
            if (!isImportAction && !isAnnotOrderAction) {
                annotations_1 = this.getAnnotations(pageNumber, textMarkupAnnotations);
            }
            else {
                annotations_1 = textMarkupAnnotations;
            }
            if (textMarkupAnnotations) {
                textMarkupAnnotations.forEach(function (textMarkupAnnotation) {
                    var exists = annotations_1.some(function (existingAnnotation) {
                        return existingAnnotation.annotName === textMarkupAnnotation.AnnotName;
                    });
                    if (!exists) {
                        annotations_1.push(textMarkupAnnotation);
                    }
                });
            }
            if (annotations_1) {
                var distinctAnnotations = [];
                for (var i = 0; i < annotations_1.length; i++) {
                    var duplicateFound = false;
                    for (var j = 0; j < distinctAnnotations.length; j++) {
                        if (annotations_1[parseInt(i.toString(), 10)].AnnotName ===
                            distinctAnnotations[parseInt(j.toString(), 10)].AnnotName &&
                            annotations_1[parseInt(i.toString(), 10)].annotName === distinctAnnotations[parseInt(j.toString(), 10)].annotName) {
                            duplicateFound = true;
                            break;
                        }
                    }
                    if (!duplicateFound) {
                        distinctAnnotations.push(annotations_1[parseInt(i.toString(), 10)]);
                    }
                }
                annotations_1 = distinctAnnotations;
            }
            if (annotations_1) {
                for (var i = 0; i < annotations_1.length; i++) {
                    var annotation = annotations_1[parseInt(i.toString(), 10)];
                    var annotationObject = null;
                    var isAnnotationRotated = void 0;
                    if (annotation.TextMarkupAnnotationType) {
                        if (isImportAction) {
                            if (this.pdfViewerBase.isJsonImported) {
                                var newArray = [];
                                for (var i_1 = 0; i_1 < annotation.Bounds.length; i_1++) {
                                    annotation.Bounds[parseInt(i_1.toString(), 10)] = this.pdfViewerBase.
                                        importJsonForRotatedDocuments(annotation.Rotate, pageNumber, annotation.Bounds[parseInt(i_1.toString(), 10)], annotation.AnnotationRotation);
                                    annotation.Bounds[parseInt(i_1.toString(), 10)].left = annotation.Bounds[parseInt(i_1.toString(), 10)].X;
                                    annotation.Bounds[parseInt(i_1.toString(), 10)].top = annotation.Bounds[parseInt(i_1.toString(), 10)].Y;
                                    newArray.push(annotation.Bounds[parseInt(i_1.toString(), 10)]);
                                }
                                annotation.Bounds = newArray;
                                isAnnotationRotated = this.pdfViewerBase.isPageRotated;
                            }
                        }
                        annotation.annotationAddMode = this.pdfViewer.annotationModule.
                            findAnnotationMode(annotation, pageNumber, annotation.AnnotType);
                        annotation.allowedInteractions = annotation.AllowedInteractions ? annotation.AllowedInteractions :
                            this.pdfViewer.annotationModule.updateAnnotationAllowedInteractions(annotation);
                        annotation.AnnotationSettings = annotation.AnnotationSettings ? annotation.AnnotationSettings :
                            this.pdfViewer.annotationModule.updateAnnotationSettings(annotation);
                        if (annotation.IsLocked) {
                            annotation.AnnotationSettings.isLock = annotation.IsLocked;
                        }
                        annotationObject = {
                            textMarkupAnnotationType: annotation.TextMarkupAnnotationType, color: annotation.Color,
                            allowedInteractions: annotation.allowedInteractions, opacity: annotation.Opacity,
                            bounds: annotation.Bounds, author: annotation.Author, subject: annotation.Subject,
                            modifiedDate: annotation.ModifiedDate, note: annotation.Note, rect: annotation.Rect,
                            annotName: annotation.AnnotName, comments: this.pdfViewer.annotationModule.getAnnotationComments(annotation.Comments, annotation, annotation.Author), review: { state: annotation.State, stateModel: annotation.StateModel, modifiedDate: annotation.ModifiedDate, author: annotation.Author }, shapeAnnotationType: 'textMarkup', pageNumber: pageNumber,
                            textMarkupContent: annotation.TextMarkupContent, textMarkupStartIndex: 0, textMarkupEndIndex: 0,
                            annotationSelectorSettings: this.getSettings(annotation),
                            customData: this.pdfViewer.annotation.getCustomData(annotation), annotationAddMode: annotation.annotationAddMode, annotationSettings: annotation.AnnotationSettings,
                            isLocked: annotation.IsLocked, isPrint: annotation.IsPrint, isCommentLock: annotation.IsCommentLock,
                            isAnnotationRotated: isAnnotationRotated, annotationRotation: annotation.AnnotationRotation
                        };
                        if (annotation.IsMultiSelect) {
                            annotationObject.annotNameCollection = annotation.AnnotNameCollection;
                            annotationObject.annotpageNumbers = annotation.AnnotpageNumbers;
                            annotationObject.isMultiSelect = annotation.IsMultiSelect;
                        }
                        if (annotation.textMarkupContent && annotation.textMarkupContent !== '') {
                            annotationObject.textMarkupContent = annotation.textMarkupContent;
                            annotationObject.textMarkupStartIndex = annotation.textMarkupStartIndex;
                            annotationObject.textMarkupEndIndex = annotation.textMarkupEndIndex;
                        }
                        if (isNullOrUndefined(annotation.TextMarkupContent) && isNullOrUndefined(annotation.textMarkupContent)) {
                            var markedBounds = annotation.Bounds;
                            var storedData = this.pdfViewerBase.getStoredData(pageNumber, true);
                            if (isNullOrUndefined(storedData)) {
                                this.pdfViewerBase.requestForTextExtraction(pageNumber, annotationObject);
                            }
                            else {
                                var pageCharText = storedData.pageText.split('');
                                var characterBounds = this.pdfViewerBase.textLayer.
                                    characterBound[parseInt(pageNumber.toString(), 10)];
                                var textMarkupContent = this.pdfViewerBase.
                                    textMarkUpContent(markedBounds, pageCharText, characterBounds);
                                annotationObject.textMarkupContent = textMarkupContent;
                            }
                        }
                        this.pdfViewer.annotationModule.storeAnnotations(pageNumber, annotationObject, '_annotations_textMarkup');
                        if (this.isAddAnnotationProgramatically) {
                            var settings = {
                                opacity: annotationObject.opacity, author: annotation.author, subject: annotation.subject,
                                modifiedDate: annotation.modifiedDate,
                                width: annotationObject.bounds.width, height: annotationObject.bounds.height
                            };
                            this.pdfViewer.fireAnnotationAdd(annotationObject.pageNumber, annotationObject.annotName, annotation.TextMarkupAnnotationType, annotationObject.bounds, settings);
                        }
                    }
                    var type = annotation.TextMarkupAnnotationType ? annotation.TextMarkupAnnotationType :
                        annotation.textMarkupAnnotationType;
                    var annotBounds = annotation.Bounds ? annotation.Bounds : annotation.bounds;
                    var opacity = annotation.Opacity ? annotation.Opacity : annotation.opacity;
                    var color = annotation.Color ? annotation.Color : annotation.color;
                    var annotationRotation = annotation.AnnotationRotation ? annotation.AnnotationRotation :
                        annotation.annotationRotation;
                    var isPrint = true;
                    if (annotation.TextMarkupAnnotationType) {
                        isPrint = annotation.IsPrint;
                    }
                    if (annotation.textMarkupAnnotationType) {
                        isPrint = annotation.isPrint;
                    }
                    if (type === 'Highlight' && isNullOrUndefined(highlightCanvasContext)) {
                        highlightCanvasContext = this.getHighlightCanvasContext(this.isPrintCanvas(canvas), pageNumber);
                    }
                    switch (type) {
                        case 'Highlight':
                            this.renderHighlightAnnotation(annotBounds, opacity, color, highlightCanvasContext.context, factor, isPrint, pageNumber);
                            break;
                        case 'Strikethrough':
                            this.renderStrikeoutAnnotation(annotBounds, opacity, color, context, factor, pageNumber, isPrint, annotationRotation, annotation.textMarkupContent);
                            break;
                        case 'Underline':
                            this.renderUnderlineAnnotation(annotBounds, opacity, color, context, factor, pageNumber, isPrint, annotationRotation);
                            break;
                    }
                }
            }
            var isMaintainedSelector = false;
            if (this.currentTextMarkupAnnotation && this.currentTextMarkupAnnotation.annotpageNumbers) {
                for (var m = 0; m < this.currentTextMarkupAnnotation.annotpageNumbers.length; m++) {
                    if (pageNumber === this.currentTextMarkupAnnotation.annotpageNumbers[parseInt(m.toString(), 10)]) {
                        isMaintainedSelector = true;
                        this.isAnnotationSelect = false;
                        break;
                    }
                }
            }
            if ((pageNumber === this.selectTextMarkupCurrentPage) || isMaintainedSelector) {
                if (!this.isAnnotationSelect) {
                    this.maintainAnnotationSelection();
                }
                else {
                    this.isAnnotationSelect = false;
                }
            }
            var annotImg = canvas.toDataURL();
            var highlightImg = void 0;
            if (highlightCanvasContext) {
                highlightImg = highlightCanvasContext.canvas.toDataURL();
            }
            return { annotImg: annotImg, highlightImg: highlightImg };
        }
    };
    TextMarkupAnnotation.prototype.getHighlightCanvasContext = function (isPrintCanvas, pageNumber) {
        var canvas;
        if (!isPrintCanvas) {
            canvas = this.pdfViewerBase.getElement('_blendAnnotationsIntoCanvas_' + pageNumber);
            if (isNullOrUndefined(canvas)) {
                var pageDiv = document.getElementById(this.pdfViewer.element.id + '_pageDiv_' + pageNumber);
                canvas = this.pdfViewer.annotationModule.createBlendAnnotationsIntoCanvas(pageDiv, parseFloat(pageDiv.style.width), parseFloat(pageDiv.style.height), pageNumber);
            }
        }
        else {
            canvas = this.pdfViewerBase.getElement(this.pdfViewer.element.id + '_print_blendAnnotations_canvas_' + pageNumber);
            if (isNullOrUndefined(canvas)) {
                canvas = createElement('canvas', { id: this.pdfViewer.element.id + '_print_blendAnnotations_canvas_' + pageNumber });
                canvas.style.width = 816 + 'px';
                canvas.style.height = 1056 + 'px';
                var pageWidth = this.pdfViewerBase.pageSize[parseInt(pageNumber.toString(), 10)].width;
                var pageHeight = this.pdfViewerBase.pageSize[parseInt(pageNumber.toString(), 10)].height;
                var zoom = void 0;
                if (isPrintCanvas) {
                    zoom = 1;
                }
                else {
                    zoom = this.pdfViewerBase.getZoomFactor();
                }
                var zoomRatio = this.pdfViewerBase.getZoomRatio(zoom);
                canvas.height = pageHeight * zoomRatio;
                canvas.width = pageWidth * zoomRatio;
            }
        }
        var context = canvas.getContext('2d');
        context.setTransform(1, 0, 0, 1, 0, 0);
        context.setLineDash([]);
        return { context: context, canvas: canvas };
    };
    TextMarkupAnnotation.prototype.isPrintCanvas = function (canvas) {
        return canvas && canvas.id.indexOf('_print_annotation_layer_') !== -1 ? true : false;
    };
    /**
     * @param {any} annotation - It describes about the annotation
     * @private
     * @returns {any} - any
     */
    TextMarkupAnnotation.prototype.getSettings = function (annotation) {
        var selector;
        if (annotation.AnnotationSelectorSettings) {
            selector = typeof (annotation.AnnotationSelectorSettings) === 'string' ? JSON.parse(annotation.AnnotationSelectorSettings) : annotation.AnnotationSelectorSettings;
        }
        else {
            selector = this.getSelector(annotation.TextMarkupAnnotationType);
        }
        return selector;
    };
    /**
     * @param {string} type - It describes about the type
     * @private
     * @returns {void}
     */
    TextMarkupAnnotation.prototype.drawTextMarkupAnnotations = function (type) {
        var isDrawn = false;
        this.isTextMarkupAnnotationMode = true;
        this.pdfViewer.annotationModule.isFormFieldShape = false;
        this.currentTextMarkupAddMode = type;
        var isCleared = true;
        this.multiPageCollection = [];
        var selectionObject = this.pdfViewer.textSelectionModule ?
            this.pdfViewer.textSelectionModule.selectionRangeArray : [];
        if (selectionObject.length > 0 && !this.isSelectionMaintained) {
            isDrawn = true;
            this.convertSelectionToTextMarkup(type, selectionObject, this.pdfViewerBase.getZoomFactor());
        }
        var selection = window.getSelection();
        var targetElement;
        if (selection && selection.anchorNode) {
            targetElement = selection.anchorNode.parentElement;
        }
        if (this.isEnableTextMarkupResizer(type) && this.isExtended && window.getSelection().toString()) {
            var pageBounds = this.getDrawnBounds();
            if (pageBounds[0] && pageBounds[0].bounds) {
                var currentAnnot = this.currentTextMarkupAnnotation;
                for (var k = 0; k < pageBounds.length; k++) {
                    if (currentAnnot && currentAnnot.pageNumber === pageBounds[parseInt(k.toString(), 10)].pageIndex) {
                        this.currentTextMarkupAnnotation = currentAnnot;
                        this.selectTextMarkupCurrentPage = pageBounds[parseInt(k.toString(), 10)].pageIndex;
                        this.updateTextMarkupAnnotationBounds(pageBounds, k);
                    }
                    else {
                        if (currentAnnot) {
                            if (type === '') {
                                type = currentAnnot.textMarkupAnnotationType;
                            }
                        }
                        if (!currentAnnot.isMultiSelect) {
                            var isMultiSelect = false;
                            if (this.isMultiAnnotation(type)) {
                                this.multiPageCollection.push(currentAnnot);
                                isMultiSelect = true;
                            }
                            this.drawTextMarkups(type, pageBounds[parseInt(k.toString(), 10)].bounds, pageBounds[parseInt(k.toString(), 10)].pageIndex, pageBounds[parseInt(k.toString(), 10)].rect, this.pdfViewerBase.getZoomFactor(), pageBounds[parseInt(k.toString(), 10)].textContent, pageBounds[parseInt(k.toString(), 10)].startIndex, pageBounds[parseInt(k.toString(), 10)].endIndex, isMultiSelect, targetElement);
                        }
                        else {
                            if (currentAnnot.isMultiSelect && currentAnnot.annotNameCollection) {
                                this.modifyCurrentAnnotation(currentAnnot, pageBounds, k);
                            }
                        }
                    }
                }
            }
        }
        else if (window.getSelection().toString() && !isDrawn) {
            var pageBounds = this.getDrawnBounds();
            var isMultiSelect = this.isMultiPageAnnotations(pageBounds, type);
            if (pageBounds.length > 0) {
                for (var i = 0; i < pageBounds.length; i++) {
                    if (type === '') {
                        isCleared = false;
                    }
                    this.drawTextMarkups(type, pageBounds[parseInt(i.toString(), 10)].bounds, pageBounds[parseInt(i.toString(), 10)].pageIndex, pageBounds[parseInt(i.toString(), 10)].rect, this.pdfViewerBase.getZoomFactor(), pageBounds[parseInt(i.toString(), 10)].textContent, pageBounds[parseInt(i.toString(), 10)].startIndex, pageBounds[parseInt(i.toString(), 10)].endIndex, isMultiSelect, targetElement);
                }
            }
        }
        if (this.multiPageCollection) {
            for (var j = 0; j < this.multiPageCollection.length; j++) {
                this.updateAnnotationNames(this.multiPageCollection[parseInt(j.toString(), 10)], this.multiPageCollection[parseInt(j.toString(), 10)].pageNumber);
            }
        }
        this.isExtended = false;
        this.isSelectionMaintained = false;
        // this.pdfViewerBase.annotationHelper.redoCollection = [];
        if (isCleared && this.pdfViewer.textSelectionModule) {
            this.pdfViewer.textSelectionModule.clearTextSelection();
        }
        if (this.isEnableTextMarkupResizer(type)) {
            this.updateAnnotationBounds();
        }
    };
    TextMarkupAnnotation.prototype.isMultiPageAnnotations = function (pageBounds, type) {
        var isMultiSelect = false;
        for (var n = 0; n < pageBounds.length; n++) {
            if (pageBounds[parseInt(n.toString(), 10)].pageIndex !== pageBounds[0].pageIndex && this.isMultiAnnotation(type)) {
                isMultiSelect = true;
                break;
            }
        }
        return isMultiSelect;
    };
    TextMarkupAnnotation.prototype.isMultiAnnotation = function (type) {
        var isSelection = false;
        if (type === 'Highlight' && this.pdfViewer.highlightSettings.enableMultiPageAnnotation) {
            isSelection = true;
        }
        else if (type === 'Underline' && this.pdfViewer.underlineSettings.enableMultiPageAnnotation) {
            isSelection = true;
        }
        else if (type === 'Strikethrough' && this.pdfViewer.strikethroughSettings.enableMultiPageAnnotation) {
            isSelection = true;
        }
        else if (this.pdfViewer.enableMultiPageAnnotation) {
            isSelection = true;
        }
        return isSelection;
    };
    TextMarkupAnnotation.prototype.modifyCurrentAnnotation = function (currentAnnot, pageBounds, index) {
        for (var c = 0; c < currentAnnot.annotNameCollection.length; c++) {
            var currentAnnots = currentAnnot.annotNameCollection[parseInt(c.toString(), 10)];
            var annotationList = this.getAnnotations(pageBounds[parseInt(index.toString(), 10)].pageIndex, null);
            if (annotationList) {
                for (var z = 0; z < annotationList.length; z++) {
                    if (annotationList[parseInt(z.toString(), 10)].annotName === currentAnnots) {
                        this.currentTextMarkupAnnotation = annotationList[parseInt(z.toString(), 10)];
                        this.selectTextMarkupCurrentPage = pageBounds[parseInt(index.toString(), 10)].pageIndex;
                        this.updateTextMarkupAnnotationBounds(pageBounds, index);
                        break;
                    }
                }
            }
        }
    };
    TextMarkupAnnotation.prototype.drawAnnotationSelector = function (newAnnotation, annotation, newcanvas) {
        var newBounds = [];
        var x = 0;
        var y = 0;
        var width = 0;
        var height = 0;
        var currentTop = 0;
        var nextTop = 0;
        var currentLeft = 0;
        var nextLeft = 0;
        var currentRotation = 0;
        var nextRotation = 0;
        for (var i = 0; i < newAnnotation.bounds.length; i++) {
            currentTop = newAnnotation.bounds[parseInt(i.toString(), 10)].top ?
                newAnnotation.bounds[parseInt(i.toString(), 10)].top : newAnnotation.bounds[parseInt(i.toString(), 10)].Top;
            nextTop = !isNullOrUndefined(newAnnotation.bounds[i + 1]) ? newAnnotation.bounds[i + 1].top ?
                newAnnotation.bounds[i + 1].top : newAnnotation.bounds[i + 1].Top : 0;
            var rotation180Exists = void 0;
            if (this.pdfViewerBase.clientSideRendering) {
                currentLeft = newAnnotation.bounds[parseInt(i.toString(), 10)].left ?
                    newAnnotation.bounds[parseInt(i.toString(), 10)].left : newAnnotation.bounds[parseInt(i.toString(), 10)].Left;
                nextLeft = !isNullOrUndefined(newAnnotation.bounds[i + 1]) ? newAnnotation.bounds[i + 1].left ?
                    newAnnotation.bounds[i + 1].left : newAnnotation.bounds[i + 1].Left : 0;
                currentRotation = newAnnotation.bounds[parseInt(i.toString(), 10)].rotation;
                nextRotation = !isNullOrUndefined(newAnnotation.bounds[i + 1]) ? newAnnotation.bounds[i + 1].rotation : 0;
                rotation180Exists = (currentRotation === 0) || (currentRotation === 180);
            }
            if (newAnnotation.bounds.length > 1 && i < newAnnotation.bounds.length - 1 && currentTop === nextTop) {
                newBounds.push(newAnnotation.bounds[parseInt(i.toString(), 10)]);
            }
            else {
                if (i === newAnnotation.bounds.length - 1 || newAnnotation.bounds.length >= 1) {
                    newBounds.push(newAnnotation.bounds[parseInt(i.toString(), 10)]);
                }
                if (newBounds.length >= 1) {
                    x = newBounds[0].left ? newBounds[0].left : newBounds[0].Left;
                    y = newBounds[0].top ? newBounds[0].top : newBounds[0].Top;
                    height = newBounds[0].height ? newBounds[0].height : newBounds[0].Height;
                    for (var j = 0; j < newBounds.length; j++) {
                        if ((!isNaN(newBounds[parseInt(j.toString(), 10)].width) &&
                            newBounds[parseInt(j.toString(), 10)].width > 0) || (!isNaN(newBounds[parseInt(j.toString(), 10)].Width) &&
                            newBounds[parseInt(j.toString(), 10)].Width > 0)) {
                            width += newBounds[parseInt(j.toString(), 10)].width ?
                                newBounds[parseInt(j.toString(), 10)].width : newBounds[parseInt(j.toString(), 10)].Width;
                        }
                    }
                    if (!newcanvas) {
                        var canvasId = newAnnotation.textMarkupAnnotationType === 'Highlight' ? '_blendAnnotationsIntoCanvas_' : '_annotationCanvas_';
                        newcanvas = (canvasId === '_blendAnnotationsIntoCanvas_') ? this.pdfViewerBase.getElement(canvasId + newAnnotation.pageNumber) :
                            this.pdfViewerBase.getAnnotationCanvas(canvasId, newAnnotation.pageNumber);
                    }
                    this.drawAnnotationSelectRect(newcanvas, this.getMagnifiedValue(x - 0.5, this.pdfViewerBase.getZoomFactor()), this.getMagnifiedValue(y - 0.5, this.pdfViewerBase.getZoomFactor()), this.getMagnifiedValue(width + 0.5, this.pdfViewerBase.getZoomFactor()), this.getMagnifiedValue(height + 0.5, this.pdfViewerBase.getZoomFactor()), annotation);
                    newBounds = [];
                    width = 0;
                }
            }
        }
    };
    TextMarkupAnnotation.prototype.selectMultiPageAnnotations = function (annotation) {
        for (var k = 0; k < annotation.annotNameCollection.length; k++) {
            var currentAnnot = annotation.annotNameCollection[parseInt(k.toString(), 10)];
            if (currentAnnot !== annotation.annotName) {
                for (var p = 0; p < annotation.annotpageNumbers.length; p++) {
                    var currentPage = annotation.annotpageNumbers[parseInt(p.toString(), 10)];
                    var annotationList = this.getAnnotations(currentPage, null);
                    if (annotationList) {
                        for (var z = 0; z < annotationList.length; z++) {
                            if (annotationList[parseInt(z.toString(), 10)].annotName === currentAnnot) {
                                var newAnnotation = annotationList[parseInt(z.toString(), 10)];
                                this.drawAnnotationSelector(newAnnotation, annotation);
                            }
                        }
                    }
                }
            }
        }
    };
    TextMarkupAnnotation.prototype.deletMultiPageAnnotation = function (annotation) {
        for (var k = 0; k < annotation.annotNameCollection.length; k++) {
            var currentAnnot = annotation.annotNameCollection[parseInt(k.toString(), 10)];
            if (currentAnnot !== annotation.annotName) {
                for (var p = 0; p < annotation.annotpageNumbers.length; p++) {
                    var currentPage = annotation.annotpageNumbers[parseInt(p.toString(), 10)];
                    var annotationList = this.getAnnotations(currentPage, null);
                    if (annotationList) {
                        for (var z = 0; z < annotationList.length; z++) {
                            if (annotationList[parseInt(z.toString(), 10)].annotName === currentAnnot) {
                                var newAnnotation = annotationList[parseInt(z.toString(), 10)];
                                var deletedAnnotation = null;
                                deletedAnnotation = annotationList.splice(z, 1)[0];
                                this.pdfViewer.annotationModule.addAction(currentPage, z, deletedAnnotation, 'Text Markup Deleted', null);
                                this.currentAnnotationIndex = z;
                                this.pdfViewer.annotation.stickyNotesAnnotationModule.findPosition(deletedAnnotation, 'textMarkup');
                                var removeDiv = document.getElementById(deletedAnnotation.annotName);
                                if (removeDiv) {
                                    if (removeDiv.parentElement.childElementCount === 1) {
                                        this.pdfViewer.annotationModule.stickyNotesAnnotationModule.updateAccordionContainer(removeDiv);
                                    }
                                    else {
                                        removeDiv.remove();
                                    }
                                }
                                this.pdfViewer.annotationModule.updateAnnotationCollection(newAnnotation);
                                this.manageAnnotations(annotationList, currentPage);
                                this.pdfViewer.annotationModule.updateImportAnnotationCollection(newAnnotation, newAnnotation.pageNumber, 'textMarkupAnnotation');
                                this.pdfViewer.annotationModule.renderAnnotations(currentPage, null, null, null);
                            }
                        }
                    }
                }
            }
        }
    };
    TextMarkupAnnotation.prototype.modifyMultiPageAnnotations = function (annotation, property, value) {
        for (var k = 0; k < annotation.annotNameCollection.length; k++) {
            var currentAnnot = annotation.annotNameCollection[parseInt(k.toString(), 10)];
            if (currentAnnot !== annotation.annotName) {
                for (var p = 0; p < annotation.annotpageNumbers.length; p++) {
                    var currentPage = annotation.annotpageNumbers[parseInt(p.toString(), 10)];
                    var annotationList = this.getAnnotations(currentPage, null);
                    if (annotationList) {
                        for (var z = 0; z < annotationList.length; z++) {
                            if (annotationList[parseInt(z.toString(), 10)].annotName === currentAnnot) {
                                if (property === 'Color') {
                                    annotationList[parseInt(z.toString(), 10)].color = value;
                                }
                                else {
                                    annotationList[parseInt(z.toString(), 10)].opacity = value;
                                }
                                annotationList[parseInt(z.toString(), 10)].modifiedDate =
                                    this.pdfViewer.annotation.stickyNotesAnnotationModule.getDateAndTime();
                                this.currentAnnotationIndex = z;
                                if (status === null || status === 'changed') {
                                    this.pdfViewer.annotationModule.addAction(annotationList[parseInt(z.toString(), 10)].pageNumber, z, annotationList[parseInt(z.toString(), 10)], 'Text Markup Property modified', property);
                                }
                                this.pdfViewer.annotationModule.stickyNotesAnnotationModule.
                                    updateAnnotationModifiedDate(annotationList[parseInt(z.toString(), 10)]);
                                this.manageAnnotations(annotationList, currentPage);
                                this.pdfViewer.annotationModule.renderAnnotations(currentPage, null, null, null);
                            }
                        }
                    }
                }
            }
        }
    };
    TextMarkupAnnotation.prototype.convertSelectionToTextMarkup = function (type, selectionObject, factor) {
        var isMultiSelect = false;
        this.triggerAddEvent = false;
        this.multiPageCollection = [];
        for (var i = 0; i < selectionObject.length; i++) {
            var textValue = selectionObject[parseInt(i.toString(), 10)].textContent;
            var indexes = void 0;
            if (selectionObject[parseInt(i.toString(), 10)].startNode === selectionObject[parseInt(i.toString(), 10)].endNode) {
                var parentText = document.getElementById(selectionObject[parseInt(i.toString(), 10)].startNode).textContent;
                indexes = this.getIndexNumbers(selectionObject[parseInt(i.toString(), 10)].pageNumber, textValue, parentText);
            }
            else {
                indexes = this.getIndexNumbers(selectionObject[parseInt(i.toString(), 10)].pageNumber, textValue);
            }
            if (!isMultiSelect) {
                for (var n = 1; n < selectionObject.length; n++) {
                    if (selectionObject[parseInt(n.toString(), 10)].pageNumber !== selectionObject[0].pageNumber &&
                        this.isMultiAnnotation(type)) {
                        isMultiSelect = true;
                        break;
                    }
                }
            }
            if (this.isMultiAnnotation(type) && (selectionObject.length - 1) === i) {
                this.triggerAddEvent = true;
            }
            this.drawTextMarkups(type, selectionObject[parseInt(i.toString(), 10)].rectangleBounds, selectionObject[parseInt(i.toString(), 10)].pageNumber, selectionObject[parseInt(i.toString(), 10)].bound, factor, textValue, indexes.startIndex, indexes.endIndex, isMultiSelect, document.getElementById(selectionObject[parseInt(i.toString(), 10)].startNode));
        }
    };
    TextMarkupAnnotation.prototype.updateTextMarkupAnnotationBounds = function (pageBounds, currentIndex) {
        if (this.currentTextMarkupAnnotation) {
            var pageAnnotations = this.getAnnotations(pageBounds[parseInt(currentIndex.toString(), 10)].pageIndex, null);
            var annotation = null;
            if (pageAnnotations) {
                for (var i = 0; i < pageAnnotations.length; i++) {
                    if (JSON.stringify(this.currentTextMarkupAnnotation) === JSON.stringify(pageAnnotations[parseInt(i.toString(), 10)])) {
                        pageAnnotations[parseInt(i.toString(), 10)].bounds = pageBounds[parseInt(currentIndex.toString(), 10)].bounds;
                        pageAnnotations[parseInt(i.toString(), 10)].textMarkupContent =
                            pageBounds[parseInt(currentIndex.toString(), 10)].textContent;
                        pageAnnotations[parseInt(i.toString(), 10)].textMarkupStartIndex =
                            pageBounds[parseInt(currentIndex.toString(), 10)].startIndex;
                        pageAnnotations[parseInt(i.toString(), 10)].textMarkupEndIndex =
                            pageBounds[parseInt(currentIndex.toString(), 10)].endIndex;
                        pageAnnotations[parseInt(i.toString(), 10)].modifiedDate =
                            this.pdfViewer.annotation.stickyNotesAnnotationModule.getDateAndTime();
                        annotation = pageAnnotations[parseInt(i.toString(), 10)];
                    }
                }
                this.manageAnnotations(pageAnnotations, pageBounds[parseInt(currentIndex.toString(), 10)].pageIndex);
                this.currentTextMarkupAnnotation = null;
                this.pdfViewer.annotationModule.renderAnnotations(pageBounds[parseInt(currentIndex.toString(), 10)].pageIndex, null, null, null);
                this.pdfViewerBase.updateDocumentEditedProperty(true);
                if (annotation) {
                    var settings = { opacity: annotation.opacity, color: annotation.color, author: annotation.author,
                        subject: annotation.subject, modifiedDate: annotation.modifiedDate };
                    var multiPageCollection = this.multiPageCollectionList(annotation);
                    if (multiPageCollection.length > 0) {
                        if ((pageBounds.length - 1) === currentIndex) {
                            this.pdfViewer.fireAnnotationResize(pageBounds[parseInt(currentIndex.toString(), 10)].pageIndex, annotation.annotName, annotation.textMarkupAnnotationType, annotation.bounds, settings, annotation.textMarkupContent, annotation.textMarkupStartIndex, annotation.textMarkupEndIndex, null, multiPageCollection);
                        }
                    }
                    else {
                        this.pdfViewer.fireAnnotationResize(pageBounds[parseInt(currentIndex.toString(), 10)].pageIndex, annotation.annotName, annotation.textMarkupAnnotationType, annotation.bounds, settings, annotation.textMarkupContent, annotation.textMarkupStartIndex, annotation.textMarkupEndIndex, null);
                    }
                }
                this.currentAnnotationIndex = null;
                this.selectTextMarkupCurrentPage = null;
            }
        }
    };
    /**
     * @param {any} annotation - It describes about the annotation
     * @private
     * @returns {any} - any
     */
    TextMarkupAnnotation.prototype.multiPageCollectionList = function (annotation) {
        var multiPageCollectionList = [];
        if (annotation.isMultiSelect && annotation.annotNameCollection) {
            multiPageCollectionList.push(annotation);
            for (var k = 0; k < annotation.annotNameCollection.length; k++) {
                var currentAnnot = annotation.annotNameCollection[parseInt(k.toString(), 10)];
                if (currentAnnot !== annotation.annotName) {
                    for (var p = 0; p < annotation.annotpageNumbers.length; p++) {
                        var currentPage = annotation.annotpageNumbers[parseInt(p.toString(), 10)];
                        var annotationList = this.getAnnotations(currentPage, null);
                        if (annotationList) {
                            for (var z = 0; z < annotationList.length; z++) {
                                if (annotationList[parseInt(z.toString(), 10)].annotName === currentAnnot) {
                                    multiPageCollectionList.push(annotationList[parseInt(z.toString(), 10)]);
                                }
                            }
                        }
                    }
                }
            }
        }
        return multiPageCollectionList;
    };
    TextMarkupAnnotation.prototype.updateAnnotationNames = function (annotations, pageNumber) {
        if (annotations) {
            var pageAnnotations = this.getAnnotations(pageNumber, null);
            var annotation = null;
            if (pageAnnotations) {
                for (var i = 0; i < pageAnnotations.length; i++) {
                    if (annotations.annotName === pageAnnotations[parseInt(i.toString(), 10)].annotName) {
                        var annotNamesCollections = [];
                        var annotpageNumbers = [];
                        for (var p = 0; p < this.multiPageCollection.length; p++) {
                            annotNamesCollections.push(this.multiPageCollection[parseInt(p.toString(), 10)].annotName);
                            annotpageNumbers.push(this.multiPageCollection[parseInt(p.toString(), 10)].pageNumber);
                        }
                        pageAnnotations[parseInt(i.toString(), 10)].isMultiSelect = true;
                        pageAnnotations[parseInt(i.toString(), 10)].annotNameCollection = annotNamesCollections;
                        pageAnnotations[parseInt(i.toString(), 10)].annotpageNumbers = annotpageNumbers;
                        annotation = pageAnnotations[parseInt(i.toString(), 10)];
                    }
                }
                this.manageAnnotations(pageAnnotations, pageNumber);
            }
        }
    };
    TextMarkupAnnotation.prototype.updateAnnotationContent = function (annotation, pageBound) {
        if (annotation) {
            var pageAnnotations = this.getAnnotations(this.selectTextMarkupCurrentPage, null);
            var annotation_1 = null;
            if (pageAnnotations) {
                for (var i = 0; i < pageAnnotations.length; i++) {
                    if (JSON.stringify(this.currentTextMarkupAnnotation) === JSON.stringify(pageAnnotations[parseInt(i.toString(), 10)])) {
                        pageAnnotations[parseInt(i.toString(), 10)].textMarkupContent = pageBound.textContent;
                        pageAnnotations[parseInt(i.toString(), 10)].textMarkupStartIndex = pageBound.startIndex;
                        pageAnnotations[parseInt(i.toString(), 10)].textMarkupEndIndex = pageBound.endIndex;
                        annotation_1 = pageAnnotations[parseInt(i.toString(), 10)];
                    }
                    this.pdfViewer.annotationModule.storeAnnotationCollections(pageAnnotations[parseInt(i.toString(), 10)], this.selectTextMarkupCurrentPage);
                }
                this.manageAnnotations(pageAnnotations, this.selectTextMarkupCurrentPage);
            }
        }
    };
    TextMarkupAnnotation.prototype.drawTextMarkups = function (type, bounds, pageNumber, rect, factor, textContent, startIndex, endIndex, isMultiSelect, targetElement) {
        var annotation = null;
        this.isNewAnnotation = false;
        var author = 'Guest';
        var subject;
        var context = (type === 'Highlight') ? this.getPageContext(pageNumber, '_blendAnnotationsIntoCanvas_') : this.getPageContext(pageNumber, '_annotationCanvas_');
        var modifiedDate = this.pdfViewer.annotation.stickyNotesAnnotationModule.getDateAndTime();
        this.highlightColor = this.highlightColor ? this.highlightColor : this.pdfViewer.highlightSettings.color ? this.pdfViewer.highlightSettings.color : '#FFDF56';
        this.underlineColor = this.underlineColor ? this.underlineColor : this.pdfViewer.underlineSettings.color ? this.pdfViewer.underlineSettings.color : '#00ff00';
        this.strikethroughColor = this.strikethroughColor ? this.strikethroughColor : this.pdfViewer.strikethroughSettings.color ? this.pdfViewer.strikethroughSettings.color : '#ff0000';
        this.highlightOpacity = this.highlightOpacity ? this.highlightOpacity : this.pdfViewer.highlightSettings.opacity;
        this.underlineOpacity = this.underlineOpacity ? this.underlineOpacity : this.pdfViewer.underlineSettings.opacity;
        this.strikethroughOpacity = this.strikethroughOpacity ? this.strikethroughOpacity : this.pdfViewer.strikethroughSettings.opacity;
        this.annotationAddMode = 'UI Drawn Annotation';
        var allowedInteractions;
        var pageDetails = this.pdfViewerBase.pageSize[parseInt(pageNumber.toString(), 10)];
        var annotationRotate = 0;
        var pageRotation = this.pdfViewerBase.getAngle(pageDetails.rotation);
        if (isNullOrUndefined(context)) {
            var pageDiv = document.getElementById(this.pdfViewer.element.id + '_pageDiv_' + pageNumber);
            // If the 'blendAnnotationsIntoCanvas' is not implemented, it should be created to highlight annotations.
            var canvas = this.pdfViewer.annotationModule.createBlendAnnotationsIntoCanvas(pageDiv, parseFloat(pageDiv.style.width), parseFloat(pageDiv.style.height), pageNumber);
            context = canvas.getContext('2d');
        }
        if (context) {
            context.setLineDash([]);
            switch (type) {
                case 'Highlight':
                    this.isNewAnnotation = true;
                    subject = (this.pdfViewer.highlightSettings.subject !== '' && this.pdfViewer.highlightSettings.subject) ? this.pdfViewer.highlightSettings.subject : this.pdfViewer.annotationSettings.subject ? this.pdfViewer.annotationSettings.subject : 'Highlight';
                    author = (this.pdfViewer.highlightSettings.author !== 'Guest' && this.pdfViewer.highlightSettings.author) ? this.pdfViewer.highlightSettings.author : this.pdfViewer.annotationSettings.author ? this.pdfViewer.annotationSettings.author : 'Guest';
                    allowedInteractions = this.pdfViewer.highlightSettings.allowedInteractions ? this.pdfViewer.highlightSettings.allowedInteractions : ['None'];
                    if (isNullOrUndefined(this.highlightOpacity)) {
                        this.highlightOpacity = 1;
                    }
                    annotation = this.getAddedAnnotation(type, this.highlightColor, this.highlightOpacity, bounds, author, subject, modifiedDate, '', false, rect, pageNumber, textContent, startIndex, endIndex, isMultiSelect, allowedInteractions, annotationRotate);
                    if (annotation) {
                        this.renderHighlightAnnotation(annotation.bounds, annotation.opacity, annotation.color, context, factor, annotation.isPrint, pageNumber);
                    }
                    break;
                case 'Strikethrough':
                    this.isNewAnnotation = true;
                    subject = (this.pdfViewer.strikethroughSettings.subject !== '' && this.pdfViewer.strikethroughSettings.subject) ? this.pdfViewer.strikethroughSettings.subject : this.pdfViewer.annotationSettings.subject ? this.pdfViewer.annotationSettings.subject : 'Strikethrough';
                    author = (this.pdfViewer.strikethroughSettings.author !== 'Guest' && this.pdfViewer.strikethroughSettings.author) ? this.pdfViewer.strikethroughSettings.author : this.pdfViewer.annotationSettings.author ? this.pdfViewer.annotationSettings.author : 'Guest';
                    allowedInteractions = this.pdfViewer.strikethroughSettings.allowedInteractions ? this.pdfViewer.strikethroughSettings.allowedInteractions : ['None'];
                    if (targetElement && targetElement.style.transform !== '') {
                        if (targetElement.style.transform.startsWith('rotate(90deg)')) {
                            annotationRotate = Math.abs(pageRotation - 90);
                        }
                        else if (targetElement.style.transform.startsWith('rotate(180deg)')) {
                            annotationRotate = Math.abs(pageRotation - 180);
                        }
                        else if (targetElement.style.transform.startsWith('rotate(-90deg)')) {
                            annotationRotate = Math.abs(pageRotation - 270);
                        }
                        else {
                            annotationRotate = pageRotation;
                        }
                    }
                    if (isNullOrUndefined(this.strikethroughOpacity)) {
                        this.strikethroughOpacity = 1;
                    }
                    annotation = this.getAddedAnnotation(type, this.strikethroughColor, this.strikethroughOpacity, bounds, author, subject, modifiedDate, '', false, rect, pageNumber, textContent, startIndex, endIndex, isMultiSelect, allowedInteractions, annotationRotate);
                    if (annotation) {
                        this.renderStrikeoutAnnotation(annotation.bounds, annotation.opacity, annotation.color, context, factor, pageNumber, annotation.isPrint, annotation.annotationRotation, annotation.textMarkupContent);
                    }
                    break;
                case 'Underline':
                    this.isNewAnnotation = true;
                    subject = (this.pdfViewer.underlineSettings.subject !== '' && this.pdfViewer.underlineSettings.subject) ? this.pdfViewer.underlineSettings.subject : this.pdfViewer.annotationSettings.subject ? this.pdfViewer.annotationSettings.subject : 'Underline';
                    author = (this.pdfViewer.underlineSettings.author !== 'Guest' && this.pdfViewer.underlineSettings.author) ? this.pdfViewer.underlineSettings.author : this.pdfViewer.annotationSettings.author ? this.pdfViewer.annotationSettings.author : 'Guest';
                    allowedInteractions = this.pdfViewer.underlineSettings.allowedInteractions ? this.pdfViewer.underlineSettings.allowedInteractions : ['None'];
                    if (targetElement && targetElement.style.transform !== '') {
                        if (targetElement.style.transform.startsWith('rotate(90deg)')) {
                            annotationRotate = Math.abs(pageRotation - 90);
                        }
                        else if (targetElement.style.transform.startsWith('rotate(180deg)')) {
                            annotationRotate = Math.abs(pageRotation - 180);
                        }
                        else if (targetElement.style.transform.startsWith('rotate(-90deg)')) {
                            annotationRotate = Math.abs(pageRotation - 270);
                        }
                        else {
                            annotationRotate = pageRotation;
                        }
                    }
                    if (isNullOrUndefined(this.underlineOpacity)) {
                        this.underlineOpacity = 1;
                    }
                    annotation = this.getAddedAnnotation(type, this.underlineColor, this.underlineOpacity, bounds, author, subject, modifiedDate, '', false, rect, pageNumber, textContent, startIndex, endIndex, isMultiSelect, allowedInteractions, annotationRotate);
                    if (annotation) {
                        this.renderUnderlineAnnotation(annotation.bounds, annotation.opacity, annotation.color, context, factor, pageNumber, annotation.isPrint, annotation.annotationRotation);
                    }
                    break;
            }
            this.isNewAnnotation = false;
            if (annotation) {
                this.pdfViewerBase.updateDocumentEditedProperty(true);
                var settings = { opacity: annotation.opacity, color: annotation.color, author: annotation.author,
                    subject: annotation.subject, modifiedDate: annotation.modifiedDate };
                if (this.isMultiAnnotation(type)) {
                    if (this.triggerAddEvent) {
                        this.pdfViewer.fireAnnotationAdd(pageNumber, annotation.annotName, type, annotation.bounds, settings, textContent, startIndex, endIndex, null, this.multiPageCollection);
                    }
                }
                else {
                    this.pdfViewer.fireAnnotationAdd(pageNumber, annotation.annotName, type, annotation.bounds, settings, textContent, startIndex, endIndex);
                }
            }
            if (Browser.isDevice && !this.pdfViewer.enableDesktopMode && this.pdfViewer.enableToolbar &&
                this.pdfViewer.enableAnnotationToolbar) {
                this.pdfViewer.toolbarModule.annotationToolbarModule.createPropertyTools(type);
            }
        }
    };
    TextMarkupAnnotation.prototype.retreiveTextIndex = function (annotation) {
        if (annotation.textMarkupContent === '') {
            this.retreieveSelection(annotation, null);
            var pageBounds = this.getDrawnBounds();
            window.getSelection().removeAllRanges();
            if (pageBounds[0] && pageBounds[0].bounds) {
                this.updateAnnotationContent(annotation, pageBounds[0]);
                annotation.textMarkupContent = pageBounds[0].textContent;
                annotation.textMarkupStartIndex = pageBounds[0].startIndex;
                annotation.textMarkupEndIndex = pageBounds[0].endIndex;
            }
        }
        return annotation;
    };
    TextMarkupAnnotation.prototype.renderHighlightAnnotation = function (bounds, opacity, color, context, factor, isPrint, pageIndex) {
        var zoomRatio = this.pdfViewerBase.getZoomRatio(factor);
        for (var i = 0; i < bounds.length; i++) {
            var bound = bounds[parseInt(i.toString(), 10)];
            context.beginPath();
            var x = bound.X ? bound.X : bound.left;
            var y = bound.Y ? bound.Y : bound.top;
            var width = bound.Width ? bound.Width : bound.width;
            var height = bound.Height ? bound.Height : bound.height;
            var rotation = bound.Rotation ? bound.Rotation : bound.rotation;
            x = x ? x : bound.x;
            y = y ? y : bound.y;
            // The highlighted position is slightly increased. So Subtract -1 from the height.
            if (this.pdfViewerBase.clientSideRendering) {
                if (rotation >= 0) {
                    rotation = Math.abs(rotation) / 90;
                }
                if (rotation === 0 || rotation === 2) {
                    height = height - 1;
                }
                else if (rotation === 1 || rotation === 3) {
                    width = width - 1;
                }
            }
            else {
                height = height - 1;
            }
            if (context.canvas.id === this.pdfViewer.element.id + '_print_annotation_layer_' + pageIndex ||
                context.canvas.id === this.pdfViewer.element.id + '_print_blendAnnotations_canvas_' + pageIndex) {
                if (isPrint) {
                    context.rect((x * zoomRatio), (y * zoomRatio), (width * zoomRatio), (height * zoomRatio));
                    context.globalAlpha = opacity;
                    context.closePath();
                    context.fillStyle = color;
                    context.msFillRule = 'nonzero';
                    context.fill();
                }
            }
            else {
                context.rect((x * zoomRatio), (y * zoomRatio), (width * zoomRatio), (height * zoomRatio));
                context.globalAlpha = opacity;
                context.closePath();
                context.fillStyle = color;
                context.msFillRule = 'nonzero';
                context.fill();
            }
        }
        context.save();
    };
    TextMarkupAnnotation.prototype.renderStrikeoutAnnotation = function (bounds, opacity, color, context, factor, pageNumber, isPrint, annotationRotation, textContent) {
        for (var i = 0; i < bounds.length; i++) {
            var bound = this.getProperBounds(bounds[parseInt(i.toString(), 10)]);
            var pageDetails = this.pdfViewerBase.pageSize[parseInt(pageNumber.toString(), 10)];
            var factorRatio = this.pdfViewerBase.getZoomRatio(factor);
            var rotation = pageDetails.rotation;
            if (annotationRotation || (this.pdfViewerBase.clientSideRendering && bounds[parseInt(i.toString(), 10)].rotation)) {
                var pageRotation = this.pdfViewerBase.getAngle(rotation);
                rotation = this.pdfViewerBase.clientSideRendering ? Math.abs(bounds[parseInt(i.toString(), 10)].rotation) / 90 :
                    Math.abs(annotationRotation - pageRotation) / 90;
            }
            if (context.canvas.id === this.pdfViewer.element.id + '_print_annotation_layer_' + pageNumber) {
                if (isPrint) {
                    if (rotation === 1) {
                        this.drawLine(opacity, (bound.x + (bound.width / 2)), bound.y, bound.width, bound.height, color, factorRatio, context, pageNumber, this.pdfViewerBase.clientSideRendering ?
                            bounds[parseInt(i.toString(), 10)].rotation : annotationRotation, textContent);
                    }
                    else if (rotation === 2) {
                        this.drawLine(opacity, bound.x, (bound.y + (bound.height / 2)), bound.width, bound.height, color, factorRatio, context, pageNumber, this.pdfViewerBase.clientSideRendering ?
                            bounds[parseInt(i.toString(), 10)].rotation : annotationRotation, textContent);
                    }
                    else if (rotation === 3) {
                        this.drawLine(opacity, bound.x, bound.y, (bound.width / 2), bound.height, color, factorRatio, context, pageNumber, this.pdfViewerBase.clientSideRendering ? bounds[parseInt(i.toString(), 10)].rotation :
                            annotationRotation, textContent);
                    }
                    else {
                        this.drawLine(opacity, bound.x, bound.y, bound.width, (bound.height / 2), color, factorRatio, context, pageNumber, this.pdfViewerBase.clientSideRendering ? bounds[parseInt(i.toString(), 10)].rotation :
                            annotationRotation, textContent);
                    }
                }
            }
            else {
                if (rotation === 1) {
                    this.drawLine(opacity, (bound.x + (bound.width / 2)), bound.y, bound.width, bound.height, color, factorRatio, context, pageNumber, this.pdfViewerBase.clientSideRendering ?
                        bounds[parseInt(i.toString(), 10)].rotation :
                        annotationRotation, textContent);
                }
                else if (rotation === 2) {
                    this.drawLine(opacity, bound.x, (bound.y + (bound.height / 2)), bound.width, bound.height, color, factorRatio, context, pageNumber, this.pdfViewerBase.clientSideRendering ?
                        bounds[parseInt(i.toString(), 10)].rotation :
                        annotationRotation, textContent);
                }
                else if (rotation === 3) {
                    this.drawLine(opacity, bound.x, bound.y, (bound.width / 2), bound.height, color, factorRatio, context, pageNumber, this.pdfViewerBase.clientSideRendering ? bounds[parseInt(i.toString(), 10)].rotation :
                        annotationRotation, textContent);
                }
                else {
                    this.drawLine(opacity, bound.x, bound.y, bound.width, (bound.height / 2), color, factorRatio, context, pageNumber, this.pdfViewerBase.clientSideRendering ? bounds[parseInt(i.toString(), 10)].rotation :
                        annotationRotation, textContent);
                }
            }
        }
    };
    TextMarkupAnnotation.prototype.renderUnderlineAnnotation = function (bounds, opacity, color, context, factor, pageNumber, isPrint, annotationRotation) {
        for (var i = 0; i < bounds.length; i++) {
            var boundValues = this.getProperBounds(bounds[parseInt(i.toString(), 10)]);
            var factorRatio = this.pdfViewerBase.getZoomRatio(factor);
            if (context.canvas.id === this.pdfViewer.element.id + '_print_annotation_layer_' + pageNumber) {
                if (isPrint) {
                    this.drawLine(opacity, boundValues.x, boundValues.y, boundValues.width, boundValues.height, color, factorRatio, context, pageNumber, this.pdfViewerBase.clientSideRendering ? bounds[parseInt(i.toString(), 10)].rotation
                        : annotationRotation);
                }
            }
            else {
                this.drawLine(opacity, boundValues.x, boundValues.y, boundValues.width, boundValues.height, color, factorRatio, context, pageNumber, this.pdfViewerBase.clientSideRendering ? bounds[parseInt(i.toString(), 10)].rotation :
                    annotationRotation);
            }
        }
    };
    TextMarkupAnnotation.prototype.getProperBounds = function (bound) {
        var x = bound.X ? bound.X : bound.left;
        var y = bound.Y ? bound.Y : bound.top;
        var width = bound.Width ? bound.Width : bound.width;
        var height = bound.Height ? bound.Height : bound.height;
        x = x ? x : bound.x;
        y = y ? y : bound.y;
        return { x: x, y: y, width: width, height: height };
    };
    TextMarkupAnnotation.prototype.isChineseLanguage = function (textContent) {
        var chineseRegex = /[\u4e00-\u9fff]/;
        // Check if the text contains Chinese characters
        var isChinese = chineseRegex.test(textContent);
        if (isChinese) {
            return true;
        }
        else {
            return false;
        }
    };
    TextMarkupAnnotation.prototype.drawLine = function (opacity, x, y, width, height, color, factor, context, pageNumber, annotationRotation, textContent) {
        context.globalAlpha = opacity;
        if (isBlazor()) {
            y = y - 1;
        }
        if (this.isChineseLanguage(textContent)) {
            height = height - 1.5;
        }
        if (!this.pdfViewerBase.clientSideRendering && !this.isChineseLanguage(textContent)) {
            height = height - 1;
        }
        context.beginPath();
        var pageDetails = this.pdfViewerBase.pageSize[parseInt(pageNumber.toString(), 10)];
        var rotation = pageDetails.rotation;
        if (annotationRotation || (this.pdfViewerBase.clientSideRendering && annotationRotation >= 0)) {
            var pageRotation = this.pdfViewerBase.getAngle(rotation);
            rotation = this.pdfViewerBase.clientSideRendering ? Math.abs(annotationRotation) / 90 :
                Math.abs(annotationRotation - pageRotation) / 90;
        }
        if (this.pdfViewerBase.clientSideRendering) {
            if (rotation === 0 || rotation === 2) {
                height = height - 1;
            }
            else if (rotation === 1 || rotation === 3) {
                width = width - 1;
            }
        }
        if (rotation === 1) {
            context.moveTo((x * factor), (y * factor));
            context.lineTo((x * factor), (y + height) * factor);
        }
        else if (rotation === 2) {
            context.moveTo((x * factor), (y * factor));
            context.lineTo((width + x) * factor, (y * factor));
        }
        else if (rotation === 3) {
            context.moveTo((width + x) * factor, (y * factor));
            context.lineTo((width + x) * factor, (y + height) * factor);
        }
        else {
            context.moveTo((x * factor), (y + height) * factor);
            context.lineTo((width + x) * factor, (y + height) * factor);
        }
        context.lineWidth = 1;
        context.strokeStyle = color;
        context.closePath();
        context.msFillRule = 'nonzero';
        context.stroke();
    };
    /**
     * @param {any} textMarkupAnnotations - It describes about the text markup annotations
     * @param {number} pageIndex - It describes about the page number
     * @param {any} stampData - It describes about the stamp data
     * @param {any} shapeData - It describes about the shape data
     * @param {any} measureShapeData - It describes about the measure shape data
     * @param {any} stickyData - It describes about the sticky data
     * @param {any} freeTextData - It describes about the free text data
     * @param {any} inkData - It describes about the ink data
     * @private
     * @returns {string} - string
     */
    TextMarkupAnnotation.prototype.printAnnotationsInCanvas = function (textMarkupAnnotations, pageIndex, stampData, shapeData, measureShapeData, stickyData, freeTextData, inkData) {
        var canvas = createElement('canvas', { id: this.pdfViewer.element.id + '_print_annotation_layer_' + pageIndex });
        canvas.style.width = 816 + 'px';
        canvas.style.height = 1056 + 'px';
        var pageWidth = this.pdfViewerBase.pageSize[parseInt(pageIndex.toString(), 10)].width;
        var pageHeight = this.pdfViewerBase.pageSize[parseInt(pageIndex.toString(), 10)].height;
        var zoom = 1;
        var zoomRatio = this.pdfViewerBase.getZoomRatio(zoom);
        canvas.height = pageHeight * zoomRatio;
        canvas.width = pageWidth * zoomRatio;
        var shapeAnnotation = this.getAnnotations(pageIndex, null, '_annotations_shape');
        var measureShapeAnnotation = this.getAnnotations(pageIndex, null, '_annotations_shape_measure');
        var stampAnnotation = this.getAnnotations(pageIndex, null, '_annotations_stamp');
        var stickyNoteAnnotation = this.getAnnotations(pageIndex, null, '_annotations_sticky');
        var inkAnnotation = this.getAnnotations(pageIndex, null, '_annotations_ink');
        if (inkAnnotation || stampAnnotation || shapeAnnotation || stickyNoteAnnotation || measureShapeAnnotation) {
            this.pdfViewer.renderDrawing(canvas, pageIndex);
            this.pdfViewer.annotation.renderAnnotations(pageIndex, null, null, null, canvas, null, null, freeTextData, inkData);
        }
        else {
            this.pdfViewer.annotation.renderAnnotations(pageIndex, shapeData, measureShapeData, null, canvas, null, null, freeTextData, inkData);
            this.pdfViewer.annotation.stampAnnotationModule.renderStampAnnotations(stampData, pageIndex, canvas);
            this.pdfViewer.annotation.stickyNotesAnnotationModule.renderStickyNotesAnnotations(stickyData, pageIndex, canvas);
        }
        return this.renderTextMarkupAnnotations(null, pageIndex, canvas, zoom);
    };
    /**
     * @private
     * @returns {string} - string
     */
    TextMarkupAnnotation.prototype.saveTextMarkupAnnotations = function () {
        var storeTextMarkupObject = PdfViewerBase.sessionStorageManager.getItem(this.pdfViewerBase.documentId + '_annotations_textMarkup');
        if (this.pdfViewerBase.isStorageExceed) {
            storeTextMarkupObject = this.pdfViewerBase.annotationStorage[this.pdfViewerBase.documentId + '_annotations_textMarkup'];
        }
        var textMarkupAnnotations = [];
        for (var j = 0; j < this.pdfViewerBase.pageCount; j++) {
            textMarkupAnnotations[parseInt(j.toString(), 10)] = [];
        }
        if (storeTextMarkupObject && !this.pdfViewer.annotationSettings.skipDownload) {
            var textMarkupAnnotationCollection = JSON.parse(storeTextMarkupObject);
            for (var i = 0; i < textMarkupAnnotationCollection.length; i++) {
                var newArray = [];
                var pageAnnotationObject = textMarkupAnnotationCollection[parseInt(i.toString(), 10)];
                if (pageAnnotationObject) {
                    var _loop_1 = function (z) {
                        this_1.pdfViewer.annotationModule.updateModifiedDate(pageAnnotationObject.annotations[parseInt(z.toString(), 10)]);
                        if (this_1.pdfViewerBase.isJsonExported) {
                            if (pageAnnotationObject.annotations[parseInt(z.toString(), 10)].isAnnotationRotated) {
                                pageAnnotationObject.annotations[parseInt(z.toString(), 10)].bounds =
                                    this_1.getBoundsForSave(pageAnnotationObject.annotations[parseInt(z.toString(), 10)].bounds, i);
                            }
                            else {
                                var pageDetails = this_1.pdfViewerBase.pageSize[pageAnnotationObject.pageIndex];
                                if (pageDetails) {
                                    pageAnnotationObject.annotations[parseInt(z.toString(), 10)].annotationRotation = pageDetails.rotation;
                                }
                            }
                        }
                        if (this_1.isChineseLanguage(pageAnnotationObject.annotations[parseInt(z.toString(), 10)].textMarkupContent)) {
                            if (pageAnnotationObject.annotations[parseInt(z.toString(), 10)].bounds.length > 0) {
                                var heightDifference_1 = pageAnnotationObject.annotations[parseInt(z.toString(), 10)].textMarkupAnnotationType === 'Strikethrough' ? this_1.strikeoutDifference : pageAnnotationObject.annotations[parseInt(z.toString(), 10)].textMarkupAnnotationType === 'Underline' ? this_1.underlineDifference : 0;
                                pageAnnotationObject.annotations[parseInt(z.toString(), 10)].bounds.forEach(function (bound) {
                                    bound.height = bound.height ? bound.height : bound.Height;
                                    if (bound.height > 0) {
                                        // Update height value
                                        bound.height += heightDifference_1;
                                    }
                                });
                            }
                        }
                        pageAnnotationObject.annotations[parseInt(z.toString(), 10)].bounds =
                            JSON.stringify(this_1.getBoundsForSave(pageAnnotationObject.annotations[parseInt(z.toString(), 10)].bounds, pageAnnotationObject.annotations[parseInt(z.toString(), 10)].pageNumber));
                        var colorString = pageAnnotationObject.annotations[parseInt(z.toString(), 10)].color;
                        pageAnnotationObject.annotations[parseInt(z.toString(), 10)].color = JSON.stringify(this_1.getRgbCode(colorString));
                        pageAnnotationObject.annotations[parseInt(z.toString(), 10)].rect =
                            JSON.stringify(pageAnnotationObject.annotations[parseInt(z.toString(), 10)].rect);
                    };
                    var this_1 = this;
                    for (var z = 0; pageAnnotationObject.annotations.length > z; z++) {
                        _loop_1(z);
                    }
                    newArray = pageAnnotationObject.annotations;
                }
                textMarkupAnnotations[pageAnnotationObject.pageIndex] = newArray;
            }
        }
        return JSON.stringify(textMarkupAnnotations);
    };
    /**
     * @private
     * @returns {void}
     */
    TextMarkupAnnotation.prototype.deleteTextMarkupAnnotation = function () {
        if (this.currentTextMarkupAnnotation) {
            var isLock = false;
            if (this.currentTextMarkupAnnotation.annotationSettings) {
                isLock = this.currentTextMarkupAnnotation.annotationSettings.isLock;
                if (this.pdfViewer.annotationModule.checkAllowedInteractions('Delete', this.currentTextMarkupAnnotation)) {
                    isLock = false;
                }
            }
            if (!isLock) {
                var deletedAnnotation = null;
                this.showHideDropletDiv(true);
                var annotation = this.currentTextMarkupAnnotation;
                if (this.currentTextMarkupAnnotation.isMultiSelect && annotation.annotNameCollection) {
                    this.deletMultiPageAnnotation(annotation);
                }
                var pageAnnotations = this.getAnnotations(this.selectTextMarkupCurrentPage, null);
                if (pageAnnotations) {
                    for (var i = 0; i < pageAnnotations.length; i++) {
                        if (this.currentTextMarkupAnnotation.annotName === pageAnnotations[parseInt(i.toString(), 10)].annotName) {
                            deletedAnnotation = pageAnnotations.splice(i, 1)[0];
                            this.pdfViewer.annotationModule.addAction(this.selectTextMarkupCurrentPage, i, deletedAnnotation, 'Text Markup Deleted', null);
                            this.currentAnnotationIndex = i;
                            this.pdfViewer.annotation.stickyNotesAnnotationModule.findPosition(deletedAnnotation, 'textMarkup');
                            var removeDiv = document.getElementById(deletedAnnotation.annotName);
                            if (removeDiv) {
                                if (removeDiv.parentElement.childElementCount === 1) {
                                    this.pdfViewer.annotationModule.stickyNotesAnnotationModule.updateAccordionContainer(removeDiv);
                                }
                                else {
                                    removeDiv.remove();
                                }
                            }
                        }
                    }
                    this.pdfViewer.annotationModule.updateAnnotationCollection(this.currentTextMarkupAnnotation);
                    this.manageAnnotations(pageAnnotations, this.selectTextMarkupCurrentPage);
                    this.pdfViewer.annotationModule.updateImportAnnotationCollection(this.currentTextMarkupAnnotation, this.currentTextMarkupAnnotation.pageNumber, 'textMarkupAnnotation');
                    var annotationId = this.currentTextMarkupAnnotation.annotName;
                    var annotationBounds = this.currentTextMarkupAnnotation.bounds;
                    this.currentTextMarkupAnnotation = null;
                    this.pdfViewer.annotationModule.renderAnnotations(this.selectTextMarkupCurrentPage, null, null, null);
                    this.pdfViewerBase.updateDocumentEditedProperty(true);
                    var multiPageCollection = this.multiPageCollectionList(annotation);
                    if (multiPageCollection.length > 0) {
                        multiPageCollection.push(deletedAnnotation);
                        this.pdfViewer.fireAnnotationRemove(this.selectTextMarkupCurrentPage, annotationId, deletedAnnotation.textMarkupAnnotationType, annotationBounds, deletedAnnotation.textMarkupContent, deletedAnnotation.textMarkupStartIndex, deletedAnnotation.textMarkupEndIndex, multiPageCollection);
                    }
                    else if (!isNullOrUndefined(deletedAnnotation)) {
                        this.pdfViewer.fireAnnotationRemove(this.selectTextMarkupCurrentPage, annotationId, deletedAnnotation.textMarkupAnnotationType, annotationBounds, deletedAnnotation.textMarkupContent, deletedAnnotation.textMarkupStartIndex, deletedAnnotation.textMarkupEndIndex);
                    }
                    this.currentAnnotationIndex = null;
                    this.selectTextMarkupCurrentPage = null;
                    if (Browser.isDevice && !this.pdfViewer.enableDesktopMode) {
                        this.pdfViewer.toolbarModule.annotationToolbarModule.hideMobileAnnotationToolbar();
                        this.pdfViewer.toolbarModule.showToolbar(true);
                    }
                }
            }
        }
    };
    /**
     * @param {any} bounds - bounds
     * @returns {void}
     * @private
     */
    TextMarkupAnnotation.prototype.modifyBoundsProperty = function (bounds) {
        if (this.currentTextMarkupAnnotation) {
            var pageAnnotations = this.modifyAnnotationProperty('Bounds', bounds, null);
            this.manageAnnotations(pageAnnotations, this.selectTextMarkupCurrentPage);
            this.pdfViewer.annotationModule.renderAnnotations(this.selectTextMarkupCurrentPage, null, null, null);
            this.pdfViewerBase.updateDocumentEditedProperty(true);
            var annotation = this.currentTextMarkupAnnotation;
            var multiPageCollection = this.multiPageCollectionList(annotation);
            if (multiPageCollection.length > 0) {
                this.pdfViewer.fireAnnotationPropertiesChange(this.selectTextMarkupCurrentPage, annotation.annotName, annotation.textMarkupAnnotationType, false, false, false, false, annotation.textMarkupContent, annotation.textMarkupStartIndex, annotation.textMarkupEndIndex, multiPageCollection);
                this.currentAnnotationIndex = null;
            }
            else {
                this.pdfViewer.fireAnnotationPropertiesChange(this.selectTextMarkupCurrentPage, annotation.annotName, annotation.textMarkupAnnotationType, false, false, false, false, annotation.textMarkupContent, annotation.textMarkupStartIndex, annotation.textMarkupEndIndex);
                this.currentAnnotationIndex = null;
            }
        }
    };
    /**
     * @param {string} color - It describes about the color
     * @private
     * @returns {void}
     */
    TextMarkupAnnotation.prototype.modifyColorProperty = function (color) {
        if (this.currentTextMarkupAnnotation) {
            var pageAnnotations = this.modifyAnnotationProperty('Color', color, null);
            this.manageAnnotations(pageAnnotations, this.selectTextMarkupCurrentPage);
            this.pdfViewer.annotationModule.renderAnnotations(this.selectTextMarkupCurrentPage, null, null, null);
            this.pdfViewerBase.updateDocumentEditedProperty(true);
            var annotation = this.currentTextMarkupAnnotation;
            var multiPageCollection = this.multiPageCollectionList(annotation);
            if (multiPageCollection.length > 0) {
                this.pdfViewer.fireAnnotationPropertiesChange(this.selectTextMarkupCurrentPage, annotation.annotName, annotation.textMarkupAnnotationType, true, false, false, false, annotation.textMarkupContent, annotation.textMarkupStartIndex, annotation.textMarkupEndIndex, multiPageCollection);
                this.currentAnnotationIndex = null;
            }
            else {
                this.pdfViewer.fireAnnotationPropertiesChange(this.selectTextMarkupCurrentPage, annotation.annotName, annotation.textMarkupAnnotationType, true, false, false, false, annotation.textMarkupContent, annotation.textMarkupStartIndex, annotation.textMarkupEndIndex);
                this.currentAnnotationIndex = null;
            }
        }
    };
    /**
     * @param {ChangeEventArgs} args - It describes about the args
     * @param {number} isOpacity - It describes about the isOpacity
     * @private
     * @returns {void}
     */
    TextMarkupAnnotation.prototype.modifyOpacityProperty = function (args, isOpacity) {
        if (this.currentTextMarkupAnnotation) {
            var pageAnnotations = void 0;
            if (!(isNullOrUndefined(isOpacity))) {
                pageAnnotations = this.modifyAnnotationProperty('Opacity', isOpacity, 'changed');
            }
            else {
                pageAnnotations = this.modifyAnnotationProperty('Opacity', args.value / 100, args.name);
            }
            if (pageAnnotations) {
                this.manageAnnotations(pageAnnotations, this.selectTextMarkupCurrentPage);
                this.pdfViewer.annotationModule.renderAnnotations(this.selectTextMarkupCurrentPage, null, null, null);
                if (!(isNullOrUndefined(isOpacity)) || args.name === 'changed') {
                    this.pdfViewerBase.updateDocumentEditedProperty(true);
                    var annotation = this.currentTextMarkupAnnotation;
                    var multiPageCollection = this.multiPageCollectionList(annotation);
                    if (multiPageCollection.length > 0) {
                        this.pdfViewer.fireAnnotationPropertiesChange(this.selectTextMarkupCurrentPage, annotation.annotName, annotation.textMarkupAnnotationType, false, true, false, false, annotation.textMarkupContent, annotation.textMarkupStartIndex, annotation.textMarkupEndIndex, multiPageCollection);
                        this.currentAnnotationIndex = null;
                    }
                    else {
                        this.pdfViewer.fireAnnotationPropertiesChange(this.selectTextMarkupCurrentPage, annotation.annotName, annotation.textMarkupAnnotationType, false, true, false, false, annotation.textMarkupContent, annotation.textMarkupStartIndex, annotation.textMarkupEndIndex);
                        this.currentAnnotationIndex = null;
                    }
                }
            }
        }
    };
    /**
     * @param {string} property -It describes about the property
     * @param {any} value - It describes about the value
     * @param {string} status - It describes about the status
     * @param {string} annotName - It describes about the annotation name
     * @private
     * @returns {ITextMarkupAnnotation} - ITextMarkuoAnnotation
     */
    TextMarkupAnnotation.prototype.modifyAnnotationProperty = function (property, value, status, annotName) {
        var annotation = this.currentTextMarkupAnnotation;
        this.pdfViewer.annotationModule.isFormFieldShape = false;
        if (annotation.isMultiSelect && annotation.annotNameCollection) {
            this.modifyMultiPageAnnotations(annotation, property, value);
        }
        var pageAnnotations = this.getAnnotations(this.selectTextMarkupCurrentPage, null);
        if (pageAnnotations) {
            for (var i = 0; i < pageAnnotations.length; i++) {
                if (JSON.stringify(this.currentTextMarkupAnnotation) === JSON.stringify(pageAnnotations[parseInt(i.toString(), 10)])) {
                    if (property === 'Color') {
                        pageAnnotations[parseInt(i.toString(), 10)].color = value;
                    }
                    else if (property === 'Opacity') {
                        pageAnnotations[parseInt(i.toString(), 10)].opacity = value;
                    }
                    else if (property === 'AnnotationSettings') {
                        pageAnnotations[parseInt(i.toString(), 10)].annotationSettings = { isLock: value };
                    }
                    else if (property === 'Bounds') {
                        pageAnnotations[parseInt(i.toString(), 10)].bounds = value;
                    }
                    else if (property === 'AnnotationSelectorSettings') {
                        pageAnnotations[parseInt(i.toString(), 10)].annotationSelectorSettings = value;
                    }
                    pageAnnotations[parseInt(i.toString(), 10)].modifiedDate =
                        this.pdfViewer.annotation.stickyNotesAnnotationModule.getDateAndTime();
                    this.currentAnnotationIndex = i;
                    if (status === null || status === 'changed') {
                        this.pdfViewer.annotationModule.addAction(this.selectTextMarkupCurrentPage, i, this.currentTextMarkupAnnotation, 'Text Markup Property modified', property);
                    }
                    this.currentTextMarkupAnnotation = pageAnnotations[parseInt(i.toString(), 10)];
                    this.pdfViewer.annotationModule.stickyNotesAnnotationModule.
                        updateAnnotationModifiedDate(pageAnnotations[parseInt(i.toString(), 10)]);
                    this.pdfViewer.annotationModule.storeAnnotationCollections(pageAnnotations[parseInt(i.toString(), 10)], this.selectTextMarkupCurrentPage);
                }
            }
        }
        return pageAnnotations;
    };
    /**
     * @param {ITextMarkupAnnotation} annotation - It describes about the annotation
     * @param {number} pageNumber - It describes about the page number
     * @param {number} index - It describes about the index
     * @param {string} action - It describes about the action
     * @private
     * @returns {void}
     */
    TextMarkupAnnotation.prototype.undoTextMarkupAction = function (annotation, pageNumber, index, action) {
        var pageAnnotations = this.getAnnotations(pageNumber, null);
        if (pageAnnotations) {
            if (action === 'Text Markup Added') {
                this.pdfViewer.annotation.stickyNotesAnnotationModule.findPosition(pageAnnotations[parseInt(index.toString(), 10)], 'textMarkup', null, true);
                var removeDiv = document.getElementById(pageAnnotations[parseInt(index.toString(), 10)].annotName);
                if (removeDiv) {
                    if (removeDiv.parentElement.childElementCount === 1) {
                        this.pdfViewer.annotationModule.stickyNotesAnnotationModule.updateAccordionContainer(removeDiv);
                    }
                    else {
                        removeDiv.parentElement.removeChild(removeDiv);
                    }
                }
                pageAnnotations.splice(index, 1);
                this.pdfViewer.annotationCollection.splice(index, 1);
            }
            else if (action === 'Text Markup Deleted') {
                this.pdfViewer.annotationModule.stickyNotesAnnotationModule.addAnnotationComments(pageNumber, annotation.shapeAnnotationType, true);
                pageAnnotations.splice(index, 0, annotation);
            }
        }
        this.clearCurrentAnnotation();
        this.pdfViewerBase.updateDocumentEditedProperty(true);
        this.manageAnnotations(pageAnnotations, pageNumber);
        this.pdfViewer.annotationModule.renderAnnotations(pageNumber, null, null, null);
    };
    /**
     * @param {ITextMarkupAnnotation} annotation - It describes about the annotation
     * @param {number} pageNumber - It describes about the page number
     * @param {number} index - It describes about the index
     * @param {string} property - It describes about the proeperty
     * @param {boolean} isUndoAction - It describes about the isUndoAction
     * @private
     * @returns {ITextMarkupAnnotation} - Itextmarkupannotation
     */
    TextMarkupAnnotation.prototype.undoRedoPropertyChange = function (annotation, pageNumber, index, property, isUndoAction) {
        var pageAnnotations = this.getAnnotations(pageNumber, null);
        if (pageAnnotations) {
            if (property === 'Color') {
                var tempColor = pageAnnotations[parseInt(index.toString(), 10)].color;
                pageAnnotations[parseInt(index.toString(), 10)].color = annotation.color;
                annotation.color = tempColor;
            }
            else {
                var tempOpacity = pageAnnotations[parseInt(index.toString(), 10)].opacity;
                pageAnnotations[parseInt(index.toString(), 10)].opacity = annotation.opacity;
                annotation.opacity = tempOpacity;
            }
            this.pdfViewer.annotationModule.stickyNotesAnnotationModule.updateAnnotationModifiedDate(annotation, null, true);
            if (isUndoAction) {
                annotation.modifiedDate = this.pdfViewer.annotation.stickyNotesAnnotationModule.getDateAndTime();
            }
        }
        this.clearCurrentAnnotation();
        this.pdfViewerBase.updateDocumentEditedProperty(true);
        this.manageAnnotations(pageAnnotations, pageNumber);
        this.pdfViewer.annotationModule.renderAnnotations(pageNumber, null, null, null);
        return annotation;
    };
    /**
     * @param {ITextMarkupAnnotation} annotation - It describes about the annotation
     * @param {number} pageNumber - It describes about the page number
     * @param {number} index - It describes about the index
     * @param {string} action - It describes about the action
     * @private
     * @returns {void}
     */
    TextMarkupAnnotation.prototype.redoTextMarkupAction = function (annotation, pageNumber, index, action) {
        var pageAnnotations = this.getAnnotations(pageNumber, null);
        if (pageAnnotations) {
            if (action === 'Text Markup Added') {
                this.pdfViewer.annotationModule.stickyNotesAnnotationModule.addAnnotationComments(pageNumber, annotation.shapeAnnotationType, false);
                pageAnnotations.push(annotation);
            }
            else if (action === 'Text Markup Deleted') {
                this.pdfViewer.annotation.stickyNotesAnnotationModule.findPosition(pageAnnotations[parseInt(index.toString(), 10)], 'textMarkup');
                var removeDiv = document.getElementById(pageAnnotations[parseInt(index.toString(), 10)].annotName);
                if (removeDiv) {
                    if (removeDiv.parentElement.childElementCount === 1) {
                        this.pdfViewer.annotationModule.stickyNotesAnnotationModule.updateAccordionContainer(removeDiv);
                    }
                    else {
                        removeDiv.remove();
                    }
                }
                pageAnnotations.splice(index, 1);
            }
        }
        this.clearCurrentAnnotation();
        this.pdfViewerBase.updateDocumentEditedProperty(true);
        this.manageAnnotations(pageAnnotations, pageNumber);
        this.pdfViewer.annotationModule.renderAnnotations(pageNumber, null, null, null);
    };
    /**
     * @param {number} pageNumber - It describes about the page number
     * @param {string} note -  It describes about the note
     * @private
     * @returns {void}
     */
    TextMarkupAnnotation.prototype.saveNoteContent = function (pageNumber, note) {
        var pageAnnotations = this.getAnnotations(pageNumber, null);
        if (pageAnnotations) {
            for (var i = 0; i < pageAnnotations.length; i++) {
                if (JSON.stringify(this.currentTextMarkupAnnotation) === JSON.stringify(pageAnnotations[parseInt(i.toString(), 10)])) {
                    pageAnnotations[parseInt(i.toString(), 10)].note = note;
                }
            }
        }
        this.manageAnnotations(pageAnnotations, pageNumber);
        this.pdfViewerBase.updateDocumentEditedProperty(true);
    };
    TextMarkupAnnotation.prototype.clearCurrentAnnotation = function () {
        if (!this.isExtended) {
            if (!(this.pdfViewer.isMaintainSelection && !this.pdfViewer.textSelectionModule.isTextSelection)) {
                this.selectTextMarkupCurrentPage = null;
                this.currentTextMarkupAnnotation = null;
            }
            var isSkip = false;
            if (this.pdfViewer.annotation.freeTextAnnotationModule &&
                this.pdfViewer.annotation.freeTextAnnotationModule.isInuptBoxInFocus) {
                isSkip = true;
            }
            if (!isSkip) {
                this.enableAnnotationPropertiesTool(false);
            }
        }
    };
    /**
     * @param {number} pageNumber - It describes about the pageNumber
     * @param {boolean} isSelect - It describes about the isSelect
     * @private
     * @returns {void}
     */
    TextMarkupAnnotation.prototype.clearCurrentAnnotationSelection = function (pageNumber, isSelect) {
        if (isSelect) {
            this.isAnnotationSelect = true;
        }
        else {
            this.isAnnotationSelect = false;
        }
        var lowerPageIndex = (pageNumber - 2) >= 0 ? (pageNumber - 2) : 0;
        var higherPageIndex = (pageNumber + 2) < this.pdfViewerBase.pageCount ? (pageNumber + 2) :
            this.pdfViewerBase.pageCount - 1;
        for (var k = lowerPageIndex; k <= higherPageIndex; k++) {
            this.clearAnnotationSelection(k);
        }
    };
    TextMarkupAnnotation.prototype.getBoundsForSave = function (bounds, pageIndex) {
        var newArray = [];
        for (var i = 0; i < bounds.length; i++) {
            var bound = this.getAnnotationBounds(bounds[parseInt(i.toString(), 10)], pageIndex);
            newArray.push(bound);
        }
        return newArray;
    };
    TextMarkupAnnotation.prototype.getAnnotationBounds = function (bounds, pageIndex) {
        var left = !isNullOrUndefined(bounds.left) ? bounds.left : bounds.Left;
        var top = !isNullOrUndefined(bounds.top) ? bounds.top : bounds.Top;
        var height = !isNullOrUndefined(bounds.height) ? bounds.height : bounds.Height;
        var width = !isNullOrUndefined(bounds.width) ? bounds.width : bounds.Width;
        var pageDetails = this.pdfViewerBase.pageSize[parseInt(pageIndex.toString(), 10)];
        left = left ? left : bounds.x;
        top = top ? top : bounds.y;
        if (pageDetails) {
            if (pageDetails.rotation === 1) {
                return { left: top, top: pageDetails.width - (left + width), width: height, height: width };
            }
            else if (pageDetails.rotation === 2) {
                return { left: pageDetails.width - left - width, top: pageDetails.height - top - height, width: width, height: height };
            }
            else if (pageDetails.rotation === 3) {
                return { left: pageDetails.height - top - height, top: left, width: height, height: width };
            }
            else {
                return { left: left, top: top, width: width, height: height };
            }
        }
        else {
            return { left: left, top: top, width: width, height: height };
        }
    };
    TextMarkupAnnotation.prototype.getRgbCode = function (colorString) {
        // eslint-disable-next-line
        if (!colorString.match(/#([a-z0-9]+)/gi) && !colorString.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/)) {
            colorString = this.pdfViewer.annotationModule.nameToHash(colorString);
        }
        var markupStringArray = colorString.split(',');
        if (isNullOrUndefined(markupStringArray[1])) {
            colorString = this.pdfViewer.annotationModule.getValue(colorString, 'rgba');
            markupStringArray = colorString.split(',');
        }
        var textMarkupR = parseInt(markupStringArray[0].split('(')[1], 10);
        var textMarkupG = parseInt(markupStringArray[1], 10);
        var textMarkupB = parseInt(markupStringArray[2], 10);
        var textMarkupA = parseInt(markupStringArray[3], 10);
        return { a: textMarkupA, r: textMarkupR, g: textMarkupG, b: textMarkupB };
    };
    TextMarkupAnnotation.prototype.getDrawnBounds = function () {
        var pageBounds = [];
        var selection = window.getSelection();
        if (selection.anchorNode !== null) {
            var range = document.createRange();
            var isBackWardSelection = this.pdfViewerBase.textLayer.isBackWardSelection(selection);
            if (selection.anchorNode === selection.focusNode) {
                var pageId = this.pdfViewerBase.textLayer.getPageIndex(selection.anchorNode);
                var startIndex = 0;
                var endIndex = 0;
                if (!isNaN(pageId)) {
                    var pageRect = this.pdfViewerBase.getElement('_pageDiv_' + pageId).getBoundingClientRect();
                    if (this.pdfViewerBase.isMixedSizeDocument) {
                        pageRect = this.pdfViewerBase.getElement('_textLayer_' + pageId).getBoundingClientRect();
                    }
                    if (isBackWardSelection) {
                        range.setStart(selection.focusNode, selection.focusOffset);
                        range.setEnd(selection.anchorNode, selection.anchorOffset);
                    }
                    else {
                        if (selection.anchorOffset < selection.focusOffset) {
                            startIndex = selection.anchorOffset;
                            endIndex = selection.focusOffset;
                            range.setStart(selection.anchorNode, selection.anchorOffset);
                            range.setEnd(selection.focusNode, selection.focusOffset);
                        }
                        else {
                            startIndex = selection.focusOffset;
                            endIndex = selection.anchorOffset;
                            range.setStart(selection.focusNode, selection.focusOffset);
                            range.setEnd(selection.anchorNode, selection.anchorOffset);
                        }
                    }
                    var boundingRect = range.getBoundingClientRect();
                    var annotationRotate = 0;
                    if (this.pdfViewerBase.clientSideRendering) {
                        var pageDetails = this.pdfViewerBase.pageSize[parseInt(pageId.toString(), 10)];
                        var pageRotation = this.pdfViewerBase.getAngle(pageDetails.rotation);
                        var textElement = void 0;
                        if (range.startContainer.parentElement) {
                            textElement = range.startContainer.parentElement;
                        }
                        else {
                            textElement = range.startContainer.parentNode;
                        }
                        if (textElement && textElement.style.transform !== '') {
                            if (textElement.style.transform.startsWith('rotate(90deg)')) {
                                annotationRotate = 90;
                            }
                            else if (textElement.style.transform.startsWith('rotate(180deg)')) {
                                annotationRotate = 180;
                            }
                            else if (textElement.style.transform.startsWith('rotate(-90deg)') || textElement.style.transform.startsWith('rotate(270deg)')) {
                                annotationRotate = 270;
                            }
                            else {
                                annotationRotate = 0;
                            }
                        }
                    }
                    var indexes = this.getIndexNumbers(pageId, range.toString(), range.commonAncestorContainer.textContent.toString());
                    var rectangle = { left: this.getDefaultValue(boundingRect.left - pageRect.left),
                        top: this.getDefaultValue(boundingRect.top - pageRect.top), width: this.getDefaultValue(boundingRect.width),
                        height: this.getDefaultValue(boundingRect.height), right: this.getDefaultValue(boundingRect.right - pageRect.left),
                        bottom: this.getDefaultValue(boundingRect.bottom - pageRect.top), rotation: annotationRotate };
                    var rectangleArray = [];
                    rectangleArray.push(rectangle);
                    var rect = { left: rectangle.left, top: rectangle.top, right: rectangle.right,
                        bottom: rectangle.bottom, rotation: annotationRotate };
                    pageBounds.push({ pageIndex: pageId, bounds: rectangleArray, rect: rect, startIndex: indexes.startIndex,
                        endIndex: indexes.endIndex, textContent: range.toString() });
                }
            }
            else {
                var startNode = void 0;
                var endNode = void 0;
                var selectionStartOffset = void 0;
                var selectionEndOffset = void 0;
                if (isBackWardSelection) {
                    startNode = selection.focusNode;
                    selectionStartOffset = selection.focusOffset;
                    endNode = selection.anchorNode;
                    selectionEndOffset = selection.anchorOffset;
                }
                else {
                    startNode = selection.anchorNode;
                    selectionStartOffset = selection.anchorOffset;
                    endNode = selection.focusNode;
                    selectionEndOffset = selection.focusOffset;
                }
                var anchorPageId = this.pdfViewerBase.textLayer.getPageIndex(startNode);
                var anchorTextId = this.pdfViewerBase.textLayer.getTextIndex(startNode, anchorPageId);
                var focusPageId = this.pdfViewerBase.textLayer.getPageIndex(endNode);
                var focusTextId = this.pdfViewerBase.textLayer.getTextIndex(endNode, focusPageId);
                var startOffset = 0;
                var endOffset = 0;
                var currentId = 0;
                for (var i = anchorPageId; i <= focusPageId; i++) {
                    var selectionRects = [];
                    var pageStartId = void 0;
                    var pageEndId = void 0;
                    var pageStartOffset = void 0;
                    var pageEndOffset = void 0;
                    var textDivs = this.pdfViewerBase.getElement('_textLayer_' + i).childNodes;
                    var pageRect = this.pdfViewerBase.getElement('_pageDiv_' + i).getBoundingClientRect();
                    if (this.pdfViewerBase.isMixedSizeDocument) {
                        pageRect = this.pdfViewerBase.getElement('_textLayer_' + i).getBoundingClientRect();
                    }
                    if (i === anchorPageId) {
                        currentId = anchorTextId;
                    }
                    else {
                        currentId = 0;
                    }
                    for (var j = currentId; j < textDivs.length; j++) {
                        var textElement = textDivs[parseInt(j.toString(), 10)];
                        if (j === currentId) {
                            pageStartId = currentId;
                            pageStartOffset = (i === anchorPageId) ? selectionStartOffset : 0;
                        }
                        else {
                            pageEndId = j;
                            pageEndOffset = (i === focusPageId) ? selectionEndOffset : textElement.textContent.length;
                        }
                        if (j === anchorTextId && i === anchorPageId) {
                            startOffset = selectionStartOffset;
                        }
                        else {
                            startOffset = 0;
                        }
                        if (j === focusTextId && i === focusPageId) {
                            endOffset = selectionEndOffset;
                        }
                        else {
                            endOffset = textElement.textContent.length;
                        }
                        for (var k = 0; k < textElement.childNodes.length; k++) {
                            var node = textElement.childNodes[parseInt(k.toString(), 10)];
                            range.setStart(node, startOffset);
                            range.setEnd(node, endOffset);
                        }
                        var boundingRect = range.getBoundingClientRect();
                        var annotationRotate = 0;
                        if (this.pdfViewerBase.clientSideRendering) {
                            var pageDetails = this.pdfViewerBase.pageSize[parseInt(i.toString(), 10)];
                            var pageRotation = this.pdfViewerBase.getAngle(pageDetails.rotation);
                            if (textElement && textElement.style.transform !== '') {
                                if (textElement.style.transform.startsWith('rotate(90deg)')) {
                                    annotationRotate = 90;
                                }
                                else if (textElement.style.transform.startsWith('rotate(180deg)')) {
                                    annotationRotate = 180;
                                }
                                else if (textElement.style.transform.startsWith('rotate(-90deg)') || textElement.style.transform.startsWith('rotate(270deg)')) {
                                    annotationRotate = 270;
                                }
                                else {
                                    annotationRotate = 0;
                                }
                            }
                        }
                        var rectangle = { left: this.getDefaultValue(boundingRect.left - pageRect.left),
                            top: this.getDefaultValue(boundingRect.top - pageRect.top),
                            width: this.getDefaultValue(boundingRect.width), height: this.getDefaultValue(boundingRect.height),
                            right: this.getDefaultValue(boundingRect.right - pageRect.left),
                            bottom: this.getDefaultValue(boundingRect.bottom - pageRect.top), rotation: annotationRotate };
                        selectionRects.push(rectangle);
                        range.detach();
                        if (i === focusPageId && j === focusTextId) {
                            break;
                        }
                    }
                    if (!pageEndId) {
                        pageEndId = pageStartId;
                    }
                    if (!pageEndOffset) {
                        pageEndOffset = endOffset;
                    }
                    var startElementNode = this.pdfViewerBase.getElement('_text_' + i + '_' + pageStartId).childNodes[0];
                    var endElementNode = this.pdfViewerBase.getElement('_text_' + i + '_' + pageEndId).childNodes[0];
                    var pageRange = document.createRange();
                    pageRange.setStart(startElementNode, pageStartOffset);
                    pageRange.setEnd(endElementNode, pageEndOffset);
                    var pageRectBounds = pageRange.getBoundingClientRect();
                    var textValue = pageRange.toString();
                    var indexes = this.getIndexNumbers(i, textValue);
                    var pageRectangle = { left: this.getDefaultValue(pageRectBounds.left - pageRect.left),
                        top: this.getDefaultValue(pageRectBounds.top - pageRect.top),
                        width: this.getDefaultValue(pageRectBounds.width), height: this.getDefaultValue(pageRectBounds.height),
                        right: this.getDefaultValue(pageRectBounds.right - pageRect.left),
                        bottom: this.getDefaultValue(pageRectBounds.bottom - pageRect.top) };
                    var rect = { left: pageRectangle.left, top: pageRectangle.top, right: pageRectangle.right,
                        bottom: pageRectangle.bottom };
                    pageBounds.push({ pageIndex: i, bounds: selectionRects, rect: rect, startIndex: indexes.startIndex,
                        endIndex: indexes.endIndex, textContent: textValue });
                }
            }
        }
        selection.removeAllRanges();
        return pageBounds;
    };
    TextMarkupAnnotation.prototype.getIndexNumbers = function (pageNumber, content, parentText) {
        var storedData = this.pdfViewerBase.clientSideRendering ?
            this.pdfViewerBase.getLinkInformation(pageNumber) : this.pdfViewerBase.getStoredData(pageNumber);
        var startIndex;
        var endIndex;
        if (storedData) {
            var previousIndex = 0;
            var pageText = storedData.pageText;
            for (var p = 0; p < pageNumber; p++) {
                if (this.pdfViewer.isExtractText) {
                    var documentIndex = this.pdfViewer.textSearchModule.
                        documentTextCollection[parseInt(p.toString(), 10)][parseInt(p.toString(), 10)];
                    var pageTextData = documentIndex.pageText ? documentIndex.pageText : documentIndex.PageText;
                    if (this.pdfViewer.textSearchModule && this.pdfViewer.
                        textSearchModule.documentTextCollection && this.pdfViewer.textSearchModule.isTextRetrieved) {
                        if (this.pdfViewer.textSearchModule.documentTextCollection[parseInt(p.toString(), 10)]) {
                            previousIndex = previousIndex + pageTextData.length;
                        }
                    }
                    else {
                        if (this.pdfViewer.textSearchModule && this.pdfViewer.textSearchModule.documentTextCollection) {
                            if (pageNumber <= this.pdfViewer.textSearchModule.documentTextCollection.length) {
                                if (this.pdfViewer.textSearchModule.documentTextCollection[parseInt(p.toString(), 10)]) {
                                    previousIndex = previousIndex + pageTextData.length;
                                }
                            }
                            else {
                                previousIndex = 0;
                                break;
                            }
                        }
                    }
                }
            }
            if (!isNullOrUndefined(parentText)) {
                var parentIndex = pageText.indexOf(parentText);
                var initialIndex = parentText.indexOf(content);
                startIndex = (parentIndex + initialIndex) + previousIndex;
            }
            else {
                startIndex = (pageText.indexOf(content)) + previousIndex;
            }
            endIndex = startIndex + (content.length - 1);
        }
        return { startIndex: startIndex, endIndex: endIndex };
    };
    /**
     * @param {number} pageNumber - It describes about the page number
     * @private
     * @returns {void}
     */
    TextMarkupAnnotation.prototype.rerenderAnnotationsPinch = function (pageNumber) {
        var _this = this;
        // Need to be check both canvases. The 'blendAnnotationsIntoCanvas' is used for highlight annotations.
        ['_annotationCanvas_', '_blendAnnotationsIntoCanvas_'].forEach(function (id) {
            var annotCanvas = _this.pdfViewerBase.getElement(id + pageNumber);
            if (annotCanvas) {
                var oldAnnotCanvas = _this.pdfViewerBase.getElement('_old_annotationCanvas_' + pageNumber);
                if (oldAnnotCanvas) {
                    if (annotCanvas) {
                        oldAnnotCanvas.id = annotCanvas.id;
                        annotCanvas.parentElement.removeChild(annotCanvas);
                    }
                    else {
                        oldAnnotCanvas.id = _this.pdfViewer.element.id + '_annotationCanvas_' + pageNumber;
                    }
                    annotCanvas = oldAnnotCanvas;
                }
                annotCanvas.style.width = '';
                annotCanvas.style.height = '';
                if (_this.pdfViewer.restrictZoomRequest) {
                    annotCanvas.style.width = _this.pdfViewerBase.pageSize[parseInt(pageNumber.toString(), 10)].width * _this.pdfViewerBase.getZoomFactor() + 'px';
                    annotCanvas.style.height = _this.pdfViewerBase.pageSize[parseInt(pageNumber.toString(), 10)].height * _this.pdfViewerBase.getZoomFactor() + 'px';
                }
                else {
                    annotCanvas.width =
                        _this.pdfViewerBase.pageSize[parseInt(pageNumber.toString(), 10)].width * _this.pdfViewerBase.getZoomFactor();
                    annotCanvas.height =
                        _this.pdfViewerBase.pageSize[parseInt(pageNumber.toString(), 10)].height * _this.pdfViewerBase.getZoomFactor();
                }
                _this.renderTextMarkupAnnotations(null, pageNumber, annotCanvas, _this.pdfViewerBase.getZoomFactor());
            }
        });
    };
    /**
     * @param {number} pageNumber - It describes about the page number
     * @private
     * @returns {void}
     */
    TextMarkupAnnotation.prototype.rerenderAnnotations = function (pageNumber) {
        var _this = this;
        var oldCanvasCollection = document.querySelectorAll('#' + this.pdfViewer.element.id + '_old_annotationCanvas_' + pageNumber);
        for (var i = 0; i < oldCanvasCollection.length; i++) {
            if (oldCanvasCollection[parseInt(i.toString(), 10)]) {
                oldCanvasCollection[parseInt(i.toString(), 10)].parentElement.removeChild(oldCanvasCollection[parseInt(i.toString(), 10)]);
            }
        }
        // Styles need to be applied to both canvases. The 'blendAnnotationsIntoCanvas' is used for highlight annotations.
        var canvasIds = [
            '_annotationCanvas_' + pageNumber,
            '_blendAnnotationsIntoCanvas_' + pageNumber
        ];
        canvasIds.forEach(function (id) {
            var canvas = _this.pdfViewerBase.getElement(id);
            if (canvas) {
                canvas.style.display = 'block';
            }
        });
    };
    /**
     * @param {MouseEvent} event - It describes about the event
     * @private
     * @returns {void}
     */
    TextMarkupAnnotation.prototype.onTextMarkupAnnotationMouseUp = function (event) {
        var pageNumber = this.pdfViewer.annotationModule.getEventPageNumber(event);
        if (!isNullOrUndefined(pageNumber) && !isNaN(pageNumber)) {
            var canvas = this.pdfViewerBase.getElement('_annotationCanvas_' + pageNumber);
            var highlighCanvas = this.pdfViewerBase.getElement('_blendAnnotationsIntoCanvas_' + pageNumber);
            if (this.currentTextMarkupAnnotation) {
                this.selectedTextMarkup = this.currentTextMarkupAnnotation;
            }
            else {
                this.selectedTextMarkup = null;
            }
            this.clearCurrentSelectedAnnotation();
            var currentAnnot = this.getCurrentMarkupAnnotation(event.clientX, event.clientY, pageNumber, canvas);
            var currentHighlightAnnot = this.getCurrentMarkupAnnotation(event.clientX, event.clientY, pageNumber, highlighCanvas);
            if (currentAnnot && !window.getSelection().toString()) {
                this.onTextMarkupMouseUp(currentAnnot, event, canvas, pageNumber);
            }
            else if (currentHighlightAnnot && !window.getSelection().toString()) {
                this.onTextMarkupMouseUp(currentHighlightAnnot, event, highlighCanvas, pageNumber);
            }
            else {
                this.clearCurrentAnnotation();
            }
            if (this.pdfViewer.isMaintainSelection && !this.pdfViewer.textSelectionModule.isTextSelection) {
                if (currentAnnot || currentHighlightAnnot) {
                    this.clearCurrentAnnotationSelection(pageNumber);
                }
            }
            else {
                this.clearCurrentAnnotationSelection(pageNumber);
            }
        }
        else {
            if (!this.pdfViewerBase.isClickedOnScrollBar(event, true)) {
                this.clearCurrentAnnotation();
                this.clearCurrentAnnotationSelection(pageNumber);
            }
        }
    };
    TextMarkupAnnotation.prototype.onTextMarkupMouseUp = function (currentAnnot, event, canvas, pageNumber) {
        var isLock = false;
        var isSelection = false;
        if (currentAnnot.annotationSettings && currentAnnot.annotationSettings.isLock) {
            isLock = currentAnnot.annotationSettings.isLock;
            if (isLock && this.pdfViewer.annotationModule.checkAllowedInteractions('Select', currentAnnot)) {
                isLock = false;
                if (this.pdfViewer.annotationModule.checkAllowedInteractions('PropertyChange', currentAnnot)) {
                    isSelection = false;
                }
                else {
                    isSelection = true;
                }
            }
        }
        if (!isLock) {
            var canvasParentPosition = canvas.parentElement.getBoundingClientRect();
            var leftClickPosition = event.clientX - canvasParentPosition.left;
            var topClickPosition = event.clientY - canvasParentPosition.top;
            this.annotationClickPosition = { x: leftClickPosition, y: topClickPosition };
            this.selectAnnotation(currentAnnot, canvas, pageNumber, event);
            if (Browser.isDevice && !this.pdfViewer.enableDesktopMode && this.pdfViewer.enableToolbar &&
                this.pdfViewer.enableAnnotationToolbar) {
                this.pdfViewer.toolbarModule.annotationToolbarModule.
                    createPropertyTools(this.currentTextMarkupAnnotation.textMarkupAnnotationType);
            }
            this.currentTextMarkupAnnotation = currentAnnot;
            this.selectTextMarkupCurrentPage = pageNumber;
            if (!isSelection) {
                this.enableAnnotationPropertiesTool(true);
            }
            var commentPanelDiv = document.getElementById(this.pdfViewer.element.id + '_commantPanel');
            if (commentPanelDiv && commentPanelDiv.style.display === 'block') {
                var accordionExpand = document.getElementById(this.pdfViewer.element.id + '_accordionContainer' + (pageNumber + 1));
                if (accordionExpand) {
                    accordionExpand.ej2_instances[0].expandItem(true);
                }
                var comments = document.getElementById(currentAnnot.annotName);
                if (comments) {
                    comments.firstChild.click();
                }
            }
            if (!isBlazor()) {
                if (this.pdfViewer.toolbarModule && this.pdfViewer.enableAnnotationToolbar) {
                    this.pdfViewer.toolbarModule.annotationToolbarModule.isToolbarHidden = true;
                    this.pdfViewer.toolbarModule.annotationToolbarModule.
                        showAnnotationToolbar(this.pdfViewer.toolbarModule.annotationItem);
                }
            }
        }
    };
    /**
     * @param {TouchEvent} event - It describes about the event
     * @private
     * @returns {void}
     */
    TextMarkupAnnotation.prototype.onTextMarkupAnnotationTouchEnd = function (event) {
        var pageNumber = this.pdfViewer.annotationModule.getEventPageNumber(event);
        if (!isNullOrUndefined(pageNumber) && !isNaN(pageNumber)) {
            if (this.currentTextMarkupAnnotation) {
                this.selectedTextMarkup = this.currentTextMarkupAnnotation;
            }
            else {
                this.selectedTextMarkup = null;
            }
            this.clearCurrentAnnotationSelection(pageNumber);
            var touchCanvas = this.pdfViewerBase.getElement('_annotationCanvas_' + pageNumber);
            var highlightTouchCanvas = this.pdfViewerBase.getElement('_blendAnnotationsIntoCanvas_' + pageNumber);
            this.clearCurrentSelectedAnnotation();
            var currentAnnot = this.getCurrentMarkupAnnotation(event.touches[0].clientX, event.touches[0].clientY, pageNumber, touchCanvas);
            var currentHighlightAnnot = this.getCurrentMarkupAnnotation(event.touches[0].clientX, event.touches[0].clientY, pageNumber, highlightTouchCanvas);
            if (currentAnnot) {
                this.onTextMarkupTouchEnd(currentAnnot, touchCanvas, event, pageNumber);
            }
            else if (currentHighlightAnnot) {
                this.onTextMarkupTouchEnd(currentHighlightAnnot, highlightTouchCanvas, event, pageNumber);
            }
            else {
                this.clearCurrentAnnotation();
            }
            this.clearCurrentAnnotationSelection(pageNumber);
        }
        else if (this.selectTextMarkupCurrentPage != null && (Browser.isDevice && !this.pdfViewer.enableDesktopMode)) {
            var number = this.selectTextMarkupCurrentPage;
            this.selectTextMarkupCurrentPage = null;
            this.clearAnnotationSelection(number);
        }
        else {
            this.clearCurrentAnnotation();
            this.clearCurrentAnnotationSelection(pageNumber);
        }
    };
    TextMarkupAnnotation.prototype.onTextMarkupTouchEnd = function (currentAnnot, touchCanvas, event, pageNumber) {
        var isLock = false;
        if (currentAnnot.annotationSettings && currentAnnot.annotationSettings.isLock) {
            isLock = currentAnnot.annotationSettings.isLock;
        }
        if (!isLock) {
            var canvasParentPosition = touchCanvas.parentElement.getBoundingClientRect();
            var leftClickPosition = event.touches[0].clientX - canvasParentPosition.left;
            var topClickPosition = event.touches[0].clientY - canvasParentPosition.top;
            this.annotationClickPosition = { x: leftClickPosition, y: topClickPosition };
            this.selectAnnotation(currentAnnot, touchCanvas, pageNumber, event);
            if (Browser.isDevice && !this.pdfViewer.enableDesktopMode && this.pdfViewer.enableToolbar &&
                this.pdfViewer.enableAnnotationToolbar) {
                this.pdfViewer.toolbarModule.annotationToolbarModule.
                    createPropertyTools(this.currentTextMarkupAnnotation.textMarkupAnnotationType);
            }
            this.currentTextMarkupAnnotation = currentAnnot;
            this.selectTextMarkupCurrentPage = pageNumber;
            this.enableAnnotationPropertiesTool(true);
            var accordionExpand = document.getElementById(this.pdfViewer.element.id + '_accordionContainer' + (pageNumber + 1));
            if (accordionExpand) {
                accordionExpand.ej2_instances[0].expandItem(true);
            }
            var comments = document.getElementById(currentAnnot.annotName);
            if (comments) {
                if (!Browser.isDevice) {
                    comments.firstChild.click();
                }
            }
        }
    };
    /**
     * @private
     * @returns {void}
     */
    TextMarkupAnnotation.prototype.clearCurrentSelectedAnnotation = function () {
        if (this.currentTextMarkupAnnotation) {
            this.clearAnnotationSelection(this.selectTextMarkupCurrentPage);
            var currentAnnot = this.currentTextMarkupAnnotation;
            this.pdfViewer.fireAnnotationUnSelect(currentAnnot.annotName, currentAnnot.pageNumber, currentAnnot);
            this.currentTextMarkupAnnotation = null;
            this.clearCurrentAnnotation();
        }
    };
    /**
     * @param {MouseEvent} event - It describes about the event
     * @private
     * @returns {void}
     */
    TextMarkupAnnotation.prototype.onTextMarkupAnnotationMouseMove = function (event) {
        var _this = this;
        var eventTarget = event.target;
        var pageIndex = parseInt(eventTarget.id.split('_text_')[1], 10) || parseInt(eventTarget.id.split('_textLayer_')[1], 10) || parseInt(eventTarget.id.split('_annotationCanvas_')[1], 10);
        if (event.target && (eventTarget.id.indexOf('_text') > -1 || eventTarget.id.indexOf('_annotationCanvas') > -1 || eventTarget.classList.contains('e-pv-hyperlink')) && this.pdfViewer.annotation) {
            pageIndex = this.pdfViewer.annotation.getEventPageNumber(event);
            // Need to be check both canvases. The 'blendAnnotationsIntoCanvas' is used for highlight annotations.
            ['_annotationCanvas_', '_blendAnnotationsIntoCanvas_'].forEach(function (id) {
                var canvas = _this.pdfViewerBase.getElement(id + pageIndex);
                var currentAnnot = _this.getCurrentMarkupAnnotation(event.clientX, event.clientY, pageIndex, canvas);
                if (currentAnnot) {
                    var eventTarget_1 = event.target;
                    eventTarget_1.style.cursor = 'pointer';
                    var currentPosition = _this.pdfViewerBase.getMousePosition(event);
                    var relativePosition = _this.pdfViewerBase.relativePosition(event);
                    var viewerPositions = { left: relativePosition.x, top: relativePosition.y };
                    var mousePositions = { left: currentPosition.x, top: currentPosition.y };
                    var annotationSettings = { opacity: currentAnnot.opacity, color: currentAnnot.color,
                        author: currentAnnot.author, subject: currentAnnot.subject, modifiedDate: currentAnnot.modifiedDate };
                    _this.pdfViewerBase.isMousedOver = true;
                    _this.pdfViewer.fireAnnotationMouseover(currentAnnot.annotName, currentAnnot.pageNumber, currentAnnot.textMarkupAnnotationType, currentAnnot.bounds, annotationSettings, mousePositions, viewerPositions);
                    // this.showPopupNote(event, currentAnnot);
                }
                else {
                    _this.pdfViewer.annotationModule.hidePopupNote();
                    if (_this.pdfViewerBase.isPanMode && !_this.pdfViewerBase.getAnnotationToolStatus()) {
                        eventTarget.style.cursor = 'grab';
                    }
                    if (_this.pdfViewerBase.isMousedOver && !_this.pdfViewerBase.isFormFieldMousedOver) {
                        _this.pdfViewer.fireAnnotationMouseLeave(pageIndex);
                        _this.pdfViewerBase.isMousedOver = false;
                    }
                }
            });
        }
    };
    TextMarkupAnnotation.prototype.showPopupNote = function (event, annotation) {
        if (annotation.note) {
            this.pdfViewer.annotationModule.showPopupNote(event, annotation.color, annotation.author, annotation.note, annotation.textMarkupAnnotationType);
        }
    };
    TextMarkupAnnotation.prototype.getCurrentMarkupAnnotation = function (clientX, clientY, pageNumber, canvas) {
        var currentTextMarkupAnnotations = [];
        if (canvas) {
            var canvasParentPosition = canvas.parentElement.getBoundingClientRect();
            if (canvas.clientWidth !== canvas.parentElement.clientWidth) {
                canvasParentPosition = canvas.getBoundingClientRect();
            }
            var leftClickPosition = clientX - canvasParentPosition.left;
            var topClickPosition = clientY - canvasParentPosition.top;
            var annotationList = this.getAnnotations(pageNumber, null);
            var isAnnotationGot = false;
            if (annotationList) {
                for (var i = 0; i < annotationList.length; i++) {
                    var annotation = annotationList[parseInt(i.toString(), 10)];
                    for (var j = 0; j < annotation.bounds.length; j++) {
                        var bound = annotation.bounds[parseInt(j.toString(), 10)];
                        var left = bound.left ? bound.left : bound.Left;
                        var top_2 = bound.top ? bound.top : bound.Top;
                        var width = bound.width ? bound.width : bound.Width;
                        var height = bound.height ? bound.height : bound.Height;
                        if (leftClickPosition >= this.getMagnifiedValue(left, this.pdfViewerBase.getZoomFactor()) &&
                            leftClickPosition <= this.getMagnifiedValue(left + width, this.pdfViewerBase.getZoomFactor()) &&
                            topClickPosition >= this.getMagnifiedValue(top_2, this.pdfViewerBase.getZoomFactor()) &&
                            topClickPosition <= this.getMagnifiedValue(top_2 + height, this.pdfViewerBase.getZoomFactor())) {
                            currentTextMarkupAnnotations.push(annotation);
                            isAnnotationGot = true;
                        }
                        else {
                            if (isAnnotationGot) {
                                isAnnotationGot = false;
                                break;
                            }
                        }
                    }
                }
            }
            var currentAnnot = null;
            if (currentTextMarkupAnnotations.length > 1) {
                currentAnnot = this.compareCurrentAnnotations(currentTextMarkupAnnotations);
            }
            else if (currentTextMarkupAnnotations.length === 1) {
                currentAnnot = currentTextMarkupAnnotations[0];
            }
            return currentAnnot;
        }
        else {
            return null;
        }
    };
    TextMarkupAnnotation.prototype.compareCurrentAnnotations = function (annotations) {
        var previousX;
        var currentAnnotation = null;
        for (var i = 0; i < annotations.length; i++) {
            if (i === annotations.length - 1) {
                break;
            }
            var firstAnnotBounds = annotations[parseInt(i.toString(), 10)].bounds;
            var firstXposition = firstAnnotBounds[0].left ? firstAnnotBounds[0].left : firstAnnotBounds[0].Left;
            var firstYposition = firstAnnotBounds[0].top ? firstAnnotBounds[0].top : firstAnnotBounds[0].Top;
            var secondAnnotBounds = annotations[i + 1].bounds;
            var secondXposition = secondAnnotBounds[0].left ? secondAnnotBounds[0].left : secondAnnotBounds[0].Left;
            var secondYposition = secondAnnotBounds[0].top ? secondAnnotBounds[0].top : secondAnnotBounds[0].Top;
            if ((firstXposition < secondXposition) || (firstYposition < secondYposition)) {
                previousX = secondXposition;
                currentAnnotation = annotations[i + 1];
            }
            else {
                previousX = firstXposition;
                currentAnnotation = annotations[parseInt(i.toString(), 10)];
            }
            if (previousX && (i === (annotations.length - 2))) {
                if ((previousX === firstXposition) && (previousX === secondXposition)) {
                    previousX = secondXposition;
                    currentAnnotation = annotations[i + 1];
                }
            }
        }
        return currentAnnotation;
    };
    /**
     * @param {number} pageNumber - It describes about the pageNumber
     * @private
     * @returns {void}
     */
    TextMarkupAnnotation.prototype.clearAnnotationSelection = function (pageNumber) {
        var _this = this;
        // Styles need to be applied to both canvases. The 'blendAnnotationsIntoCanvas' is used for highlight annotations.
        var canvasIds = [
            '_annotationCanvas_' + pageNumber,
            '_blendAnnotationsIntoCanvas_' + pageNumber
        ];
        canvasIds.forEach(function (id) {
            var canvas = _this.pdfViewerBase.getElement(id);
            if (canvas) {
                var context = canvas.getContext('2d');
                context.setLineDash([]);
                _this.pdfViewer.annotationModule.renderAnnotations(pageNumber, null, null, null);
            }
        });
    };
    /**
     * @param {ITextMarkupAnnotation} annotation - It describes about the annotation
     * @param {HTMLElement} canvas - It describes about the canvas
     * @param {number} pageNumber - It describes about the page number
     * @param {MouseEvent} event - It describes about the event
     * @param {boolean} isProgrammaticSelection - It describes about the programmactic selection
     * @private
     * @returns {void}
     */
    TextMarkupAnnotation.prototype.selectAnnotation = function (annotation, canvas, pageNumber, event, isProgrammaticSelection) {
        if (this.pdfViewer.selectedItems.annotations[0]) {
            this.pdfViewer.clearSelection(this.pdfViewer.selectedItems.annotations[0].pageIndex);
            this.pdfViewer.clearSelection(this.selectTextMarkupCurrentPage);
        }
        var isLock = false;
        if (annotation.annotationSettings && annotation.annotationSettings.isLock) {
            isLock = annotation.annotationSettings.isLock;
            if (isLock && this.pdfViewer.annotationModule.checkAllowedInteractions('Select', annotation)) {
                isLock = false;
            }
        }
        if (!isLock) {
            var isCurrentTextMarkup = false;
            if (!this.currentTextMarkupAnnotation) {
                isCurrentTextMarkup = true;
            }
            if (this.selectedTextMarkup && annotation && !isProgrammaticSelection) {
                if (this.selectedTextMarkup.annotName === annotation.annotName) {
                    isCurrentTextMarkup = false;
                }
                else {
                    isCurrentTextMarkup = true;
                }
            }
            if (!isNaN(pageNumber)) {
                this.selectTextMarkupCurrentPage = pageNumber;
                this.currentTextMarkupAnnotation = annotation;
                annotation = this.retreiveTextIndex(annotation);
                this.currentTextMarkupAnnotation = annotation;
            }
            if (this.isSelectedAnnotation && this.pdfViewer.textSelectionModule) {
                this.pdfViewerBase.isSelection = true;
                this.updateAnnotationBounds();
            }
            var currentEvent = event;
            if (this.isEnableTextMarkupResizer(annotation.textMarkupAnnotationType) && annotation && currentEvent &&
                !currentEvent.touches) {
                this.updateCurrentResizerPosition(annotation);
            }
            this.drawAnnotationSelector(annotation, this.currentTextMarkupAnnotation, canvas);
            if (annotation.isMultiSelect && annotation.annotNameCollection) {
                this.selectMultiPageAnnotations(annotation);
            }
            if (annotation.annotName !== '' && !this.isNewAnnotation) {
                if (isCurrentTextMarkup) {
                    var isSelected = false;
                    if (!currentEvent) {
                        isSelected = true;
                    }
                    this.pdfViewer.annotationModule.annotationSelect(annotation.annotName, this.selectTextMarkupCurrentPage, annotation, null, false, isSelected);
                    this.selectedTextMarkup = null;
                }
            }
            if (annotation && this.isEnableTextMarkupResizer(annotation.textMarkupAnnotationType)) {
                this.isTextMarkupAnnotationMode = true;
            }
        }
    };
    /**
     * @param {any} annotation - annotation
     * @private
     * @returns {void}
     */
    TextMarkupAnnotation.prototype.updateCurrentResizerPosition = function (annotation) {
        if (!annotation) {
            annotation = this.currentTextMarkupAnnotation;
        }
        if (annotation) {
            if (this.isEnableTextMarkupResizer(annotation.textMarkupAnnotationType) && annotation) {
                var textElement = this.pdfViewerBase.getElement('_textLayer_' + this.selectTextMarkupCurrentPage);
                if (textElement) {
                    var boundingRect = textElement.getBoundingClientRect();
                    var left = annotation.bounds[0].left ? annotation.bounds[0].left : annotation.bounds[0].Left;
                    var top_3 = annotation.bounds[0].top ? annotation.bounds[0].top : annotation.bounds[0].Top;
                    this.updateLeftposition(left * this.pdfViewerBase.getZoomFactor() + boundingRect.left, (boundingRect.top + top_3), true);
                    var endPosition = annotation.bounds[annotation.bounds.length - 1];
                    var endLeft = endPosition.left ? endPosition.left : endPosition.Left;
                    var endTop = endPosition.top ? endPosition.top : endPosition.Top;
                    var endWidth = endPosition.width ? endPosition.width : endPosition.Width;
                    this.updatePosition((endLeft + endWidth) * this.pdfViewerBase.getZoomFactor() + boundingRect.left, (endTop + boundingRect.top), true);
                }
            }
        }
    };
    TextMarkupAnnotation.prototype.drawAnnotationSelectRect = function (canvas, x, y, width, height, annotation) {
        var ratio = this.pdfViewerBase.getZoomRatio();
        if (canvas) {
            var context = canvas.getContext('2d');
            context.setTransform(1, 0, 0, 1, 0, 0);
            context.beginPath();
            if (typeof (annotation).annotationSelectorSettings === 'string') {
                var lineDash = JSON.parse(annotation.annotationSelectorSettings).selectorLineDashArray.length === 0 ?
                    [4] : JSON.parse(annotation.annotationSelectorSettings).selectorLineDashArray;
                if (lineDash.length > 2) {
                    lineDash = [lineDash[0], lineDash[1]];
                }
                context.setLineDash(lineDash);
                context.globalAlpha = 1;
                context.rect(x * ratio, y * ratio, width * ratio, height * ratio);
                context.closePath();
                var borderColor = JSON.parse(annotation.annotationSelectorSettings).selectionBorderColor === '' ? '#0000ff' : JSON.parse(annotation.annotationSelectorSettings).selectionBorderColor;
                context.strokeStyle = borderColor;
                context.lineWidth = JSON.parse(annotation.annotationSelectorSettings).selectionBorderThickness === 1 ?
                    1 : (annotation.annotationSelectorSettings).selectionBorderThickness;
                context.stroke();
                context.save();
            }
            else {
                var lineDash = (annotation.annotationSelectorSettings).selectorLineDashArray.length === 0 ? [4] :
                    (annotation.annotationSelectorSettings).selectorLineDashArray;
                if (lineDash.length > 2) {
                    lineDash = [lineDash[0], lineDash[1]];
                }
                context.setLineDash(lineDash);
                context.globalAlpha = 1;
                context.rect(x * ratio, y * ratio, width * ratio, height * ratio);
                context.closePath();
                var borderColor = (annotation.annotationSelectorSettings).selectionBorderColor === '' ? '#0000ff' : (annotation.annotationSelectorSettings).selectionBorderColor;
                context.strokeStyle = borderColor;
                context.lineWidth = (annotation.annotationSelectorSettings).selectionBorderThickness ? 1 :
                    (annotation.annotationSelectorSettings).selectionBorderThickness;
                context.stroke();
                context.save();
            }
        }
    };
    /**
     * @param {boolean} isEnable - It describes about the isEnable
     * @private
     * @returns {void}
     */
    TextMarkupAnnotation.prototype.enableAnnotationPropertiesTool = function (isEnable) {
        if (this.pdfViewer.toolbarModule && this.pdfViewer.toolbarModule.annotationToolbarModule) {
            this.pdfViewer.toolbarModule.annotationToolbarModule.colorDropDownElementInBlazor = this.pdfViewer.element.querySelector('.e-pv-annotation-color-container');
        }
        if (this.pdfViewer.toolbarModule && this.pdfViewer.toolbarModule.annotationToolbarModule) {
            if (!Browser.isDevice) {
                this.pdfViewer.toolbarModule.annotationToolbarModule.createMobileAnnotationToolbar(isEnable);
            }
        }
        if (this.pdfViewer.toolbarModule && this.pdfViewer.toolbarModule.annotationToolbarModule &&
            this.pdfViewer.toolbarModule.annotationToolbarModule.isMobileAnnotEnabled &&
            this.pdfViewer.selectedItems.annotations.length === 0) {
            if (this.pdfViewer.toolbarModule.annotationToolbarModule) {
                this.pdfViewer.toolbarModule.annotationToolbarModule.selectAnnotationDeleteItem(isEnable);
                var enable = isEnable;
                if (this.isTextMarkupAnnotationMode) {
                    enable = true;
                }
                this.pdfViewer.toolbarModule.annotationToolbarModule.enableTextMarkupAnnotationPropertiesTools(enable);
                if (this.currentTextMarkupAnnotation) {
                    if (!isBlazor()) {
                        this.pdfViewer.toolbarModule.annotationToolbarModule.
                            updateColorInIcon(this.pdfViewer.toolbarModule.annotationToolbarModule.colorDropDownElement, this.currentTextMarkupAnnotation.color);
                    }
                    else {
                        this.pdfViewer.toolbarModule.annotationToolbarModule.
                            updateColorInIcon(this.pdfViewer.toolbarModule.annotationToolbarModule.colorDropDownElementInBlazor, this.currentTextMarkupAnnotation.color);
                    }
                }
                else {
                    if (!isNullOrUndefined(this.isTextMarkupAnnotationMode) && !this.isTextMarkupAnnotationMode) {
                        if (!isBlazor()) {
                            this.pdfViewer.toolbarModule.annotationToolbarModule.updateColorInIcon(this.pdfViewer.toolbarModule.annotationToolbarModule.colorDropDownElement, '#000000');
                        }
                        else {
                            this.pdfViewer.toolbarModule.annotationToolbarModule.updateColorInIcon(this.pdfViewer.toolbarModule.annotationToolbarModule.colorDropDownElementInBlazor, '#000000');
                        }
                    }
                    else {
                        this.pdfViewer.toolbarModule.annotationToolbarModule.setCurrentColorInPicker();
                    }
                }
            }
        }
    };
    /**
     * @private
     * @returns {void}
     */
    TextMarkupAnnotation.prototype.maintainAnnotationSelection = function () {
        if (this.currentTextMarkupAnnotation) {
            var canvasId = this.currentTextMarkupAnnotation.textMarkupAnnotationType === 'Highlight' ? '_blendAnnotationsIntoCanvas_' : '_annotationCanvas_';
            var canvas = (canvasId === '_blendAnnotationsIntoCanvas_') ? this.pdfViewerBase.getElement(canvasId + this.selectTextMarkupCurrentPage) :
                this.pdfViewerBase.getAnnotationCanvas(canvasId, this.selectTextMarkupCurrentPage);
            if (canvas) {
                this.selectAnnotation(this.currentTextMarkupAnnotation, canvas, this.selectTextMarkupCurrentPage);
            }
        }
    };
    // private storeAnnotations(pageNumber: number, annotation: ITextMarkupAnnotation): number {
    //     let storeObject: any = PdfViewerBase.sessionStorageManager.getItem(this.pdfViewerBase.documentId + '_annotations_textMarkup');
    //     let index: number = 0;
    //     if (!storeObject) {
    //         let markupAnnotation: IPageAnnotations = { pageIndex: pageNumber, annotations: [] };
    //         markupAnnotation.annotations.push(annotation);
    //         index = markupAnnotation.annotations.indexOf(annotation);
    //         let annotationCollection: IPageAnnotations[] = [];
    //         annotationCollection.push(markupAnnotation);
    //         let annotationStringified: string = JSON.stringify(annotationCollection);
    //         PdfViewerBase.sessionStorageManager.setItem(this.pdfViewerBase.documentId + '_annotations_textMarkup', annotationStringified);
    //     } else {
    //         let annotObject: IPageAnnotations[] = JSON.parse(storeObject);
    //         PdfViewerBase.sessionStorageManager.removeItem(this.pdfViewerBase.documentId + '_annotations_textMarkup');
    //         let pageIndex: number = this.pdfViewer.annotationModule.getPageCollection(annotObject, pageNumber);
    //         if (annotObject[pageIndex]) {
    //             (annotObject[pageIndex] as IPageAnnotations).annotations.push(annotation);
    //             index = (annotObject[pageIndex] as IPageAnnotations).annotations.indexOf(annotation);
    //         } else {
    //             let markupAnnotation: IPageAnnotations = { pageIndex: pageNumber, annotations: [] };
    //             markupAnnotation.annotations.push(annotation);
    //             index = markupAnnotation.annotations.indexOf(annotation);
    //             annotObject.push(markupAnnotation);
    //         }
    //         let annotationStringified: string = JSON.stringify(annotObject);
    //         PdfViewerBase.sessionStorageManager.setItem(this.pdfViewerBase.documentId + '_annotations_textMarkup', annotationStringified);
    //     }
    //     return index;
    // }
    /**
     * @param {ITextMarkupAnnotation} pageAnnotations - It describes about the page annotations
     * @param {number} pageNumber - It describes about the page number
     * @private
     * @returns {void}
     */
    TextMarkupAnnotation.prototype.manageAnnotations = function (pageAnnotations, pageNumber) {
        var storeObject = PdfViewerBase.sessionStorageManager.getItem(this.pdfViewerBase.documentId + '_annotations_textMarkup');
        if (this.pdfViewerBase.isStorageExceed) {
            storeObject = this.pdfViewerBase.annotationStorage[this.pdfViewerBase.documentId + '_annotations_textMarkup'];
        }
        if (storeObject) {
            var annotObject = JSON.parse(storeObject);
            if (!this.pdfViewerBase.isStorageExceed) {
                PdfViewerBase.sessionStorageManager.removeItem(this.pdfViewerBase.documentId + '_annotations_textMarkup');
            }
            var index = this.pdfViewer.annotationModule.getPageCollection(annotObject, pageNumber);
            if (index != null && annotObject[parseInt(index.toString(), 10)]) {
                annotObject[parseInt(index.toString(), 10)].annotations = pageAnnotations;
            }
            var annotationStringified = JSON.stringify(annotObject);
            if (this.pdfViewerBase.isStorageExceed) {
                this.pdfViewerBase.annotationStorage[this.pdfViewerBase.documentId + '_annotations_textMarkup'] = annotationStringified;
            }
            else {
                PdfViewerBase.sessionStorageManager.setItem(this.pdfViewerBase.documentId + '_annotations_textMarkup', annotationStringified);
            }
        }
    };
    /**
     * @param {number} pageIndex - It describes about the pageIndex
     * @param {any} textMarkupAnnotations - It describes about the text markup annotations
     * @param {string} id -It describes about the id
     * @private
     * @returns {any} - any
     */
    TextMarkupAnnotation.prototype.getAnnotations = function (pageIndex, textMarkupAnnotations, id) {
        var annotationCollection;
        if (id == null || id === undefined) {
            id = '_annotations_textMarkup';
        }
        var storeObject = PdfViewerBase.sessionStorageManager.getItem(this.pdfViewerBase.documentId + id);
        if (this.pdfViewerBase.isStorageExceed) {
            storeObject = this.pdfViewerBase.annotationStorage[this.pdfViewerBase.documentId + id];
        }
        if (storeObject) {
            var annotObject = JSON.parse(storeObject);
            var index = this.pdfViewer.annotationModule.getPageCollection(annotObject, pageIndex);
            if (index != null && annotObject[parseInt(index.toString(), 10)]) {
                annotationCollection = annotObject[parseInt(index.toString(), 10)].annotations;
            }
            else {
                annotationCollection = textMarkupAnnotations;
            }
        }
        else {
            annotationCollection = textMarkupAnnotations;
        }
        return annotationCollection;
    };
    TextMarkupAnnotation.prototype.getAddedAnnotation = function (type, color, opacity, bounds, author, subject, predefinedDate, note, isCommentLock, rect, pageNumber, textContent, startIndex, endIndex, isMultiSelect, allowedInteractions, annotationRotate) {
        var modifiedDate = predefinedDate ? predefinedDate : this.pdfViewer.annotation.
            stickyNotesAnnotationModule.getDateAndTime();
        var annotationName = this.pdfViewer.annotation.createGUID();
        var commentsDivid = this.pdfViewer.annotation.stickyNotesAnnotationModule.addComments('textMarkup', pageNumber + 1, type);
        if (commentsDivid) {
            document.getElementById(commentsDivid).id = annotationName;
        }
        var annotationSettings = this.pdfViewer.annotationSettings;
        var isPrint = this.getIsPrintValue(type);
        var annotation = {
            textMarkupAnnotationType: type, color: color, opacity: opacity, bounds: bounds, author: author,
            allowedInteractions: allowedInteractions, subject: subject, modifiedDate: modifiedDate, note: note, rect: rect,
            annotName: annotationName, comments: [], review: { state: '', stateModel: '', author: author, modifiedDate: modifiedDate }, shapeAnnotationType: 'textMarkup', pageNumber: pageNumber,
            textMarkupContent: textContent, textMarkupStartIndex: startIndex, textMarkupEndIndex: endIndex,
            isMultiSelect: isMultiSelect, annotationSelectorSettings: this.getSelector(type),
            customData: this.pdfViewer.annotation.getTextMarkupData(subject), annotationAddMode: this.annotationAddMode,
            annotationSettings: annotationSettings, isPrint: isPrint, isCommentLock: isCommentLock, isAnnotationRotated: false,
            annotationRotation: annotationRotate,
            isLocked: false
        };
        annotation.annotationSettings = this.pdfViewer.annotationModule.updateAnnotationSettings(annotation);
        if (isMultiSelect) {
            this.multiPageCollection.push(annotation);
        }
        var isSkip = false;
        if (isMultiSelect && this.isExtended) {
            isSkip = true;
        }
        if (document.getElementById(annotationName) && !isSkip) {
            document.getElementById(annotationName).addEventListener('mouseup', this.annotationDivSelect(annotation, pageNumber));
        }
        var storedIndex = this.pdfViewer.annotationModule.storeAnnotations(pageNumber, annotation, '_annotations_textMarkup');
        this.pdfViewer.annotationModule.addAction(pageNumber, storedIndex, annotation, 'Text Markup Added', null);
        return annotation;
    };
    TextMarkupAnnotation.prototype.getSelector = function (type) {
        var selector = this.pdfViewer.annotationSelectorSettings;
        if (type === 'Highlight' && this.pdfViewer.highlightSettings.annotationSelectorSettings) {
            selector = this.pdfViewer.highlightSettings.annotationSelectorSettings;
        }
        else if (type === 'Underline' && this.pdfViewer.underlineSettings.annotationSelectorSettings) {
            selector = this.pdfViewer.underlineSettings.annotationSelectorSettings;
        }
        else if (type === 'Strikethrough' && this.pdfViewer.strikethroughSettings.annotationSelectorSettings) {
            selector = this.pdfViewer.strikethroughSettings.annotationSelectorSettings;
        }
        return selector;
    };
    TextMarkupAnnotation.prototype.getIsPrintValue = function (type) {
        var isPrint = true;
        if (type === 'Highlight') {
            isPrint = this.pdfViewer.highlightSettings.isPrint;
        }
        if (type === 'Underline') {
            isPrint = this.pdfViewer.underlineSettings.isPrint;
        }
        if (type === 'Strikethrough') {
            isPrint = this.pdfViewer.strikethroughSettings.isPrint;
        }
        if (isNullOrUndefined(isPrint)) {
            isPrint = true;
        }
        return isPrint;
    };
    TextMarkupAnnotation.prototype.annotationDivSelect = function (annotation, pageNumber) {
        var canvasId = annotation.textMarkupAnnotationType === 'Highlight' ? '_blendAnnotationsIntoCanvas_' : '_annotationCanvas_';
        var canvas = (canvasId === '_blendAnnotationsIntoCanvas_') ? this.pdfViewerBase.getElement(canvasId + pageNumber) :
            this.pdfViewerBase.getAnnotationCanvas(canvasId, pageNumber);
        this.selectAnnotation(annotation, canvas, pageNumber);
        if (this.pdfViewer.toolbarModule) {
            if (this.pdfViewer.toolbarModule.annotationToolbarModule && this.pdfViewer.enableAnnotationToolbar) {
                this.pdfViewer.toolbarModule.annotationToolbarModule.clearShapeMode();
                this.pdfViewer.toolbarModule.annotationToolbarModule.clearMeasureMode();
                var isLock = false;
                if (annotation.annotationSettings && annotation.annotationSettings.isLock) {
                    isLock = annotation.annotationSettings.isLock;
                }
                if (isLock) {
                    if (this.pdfViewer.annotationModule.checkAllowedInteractions('PropertyChange', annotation)) {
                        this.pdfViewer.toolbarModule.annotationToolbarModule.enableTextMarkupAnnotationPropertiesTools(true);
                        this.pdfViewer.toolbarModule.annotationToolbarModule.setCurrentColorInPicker();
                    }
                    if (this.pdfViewer.annotationModule.checkAllowedInteractions('Delete', annotation)) {
                        this.pdfViewer.toolbarModule.annotationToolbarModule.selectAnnotationDeleteItem(true);
                    }
                }
                else {
                    this.pdfViewer.toolbarModule.annotationToolbarModule.enableTextMarkupAnnotationPropertiesTools(true);
                    this.pdfViewer.toolbarModule.annotationToolbarModule.selectAnnotationDeleteItem(true);
                    this.pdfViewer.toolbarModule.annotationToolbarModule.setCurrentColorInPicker();
                }
                this.pdfViewer.toolbarModule.annotationToolbarModule.isToolbarHidden = true;
                if (!isBlazor()) {
                    this.pdfViewer.toolbarModule.annotationToolbarModule.showAnnotationToolbar(this.pdfViewer.toolbarModule.annotationItem);
                }
            }
        }
    };
    TextMarkupAnnotation.prototype.getPageContext = function (pageNumber, canvasId) {
        var canvas;
        if (canvasId === '_annotationCanvas_') {
            canvas = this.pdfViewerBase.getAnnotationCanvas(canvasId, pageNumber);
        }
        else {
            canvas = this.pdfViewerBase.getElement(canvasId + pageNumber);
        }
        var context = null;
        if (canvas) {
            context = canvas.getContext('2d');
        }
        return context;
    };
    TextMarkupAnnotation.prototype.getDefaultValue = function (value) {
        return value / this.pdfViewerBase.getZoomFactor();
    };
    TextMarkupAnnotation.prototype.getMagnifiedValue = function (value, factor) {
        return value * factor;
    };
    /**
     * @param {any} annotation - It describes about the annotation
     * @param {number} pageNumber - It describes about the page number
     * @private
     * @returns {void}
     */
    TextMarkupAnnotation.prototype.saveImportedTextMarkupAnnotations = function (annotation, pageNumber) {
        var annotationObject = null;
        annotation.Author = this.pdfViewer.annotationModule.updateAnnotationAuthor('textMarkup', annotation.Subject);
        annotation.allowedInteractions = this.pdfViewer.annotationModule.updateAnnotationAllowedInteractions(annotation);
        annotation.AnnotationSettings = annotation.AnnotationSettings ?
            annotation.AnnotationSettings : this.pdfViewer.annotationModule.updateSettings(this.pdfViewer.customStampSettings);
        annotationObject = {
            textMarkupAnnotationType: annotation.TextMarkupAnnotationType, color: annotation.Color, opacity: annotation.Opacity,
            allowedInteractions: annotation.allowedInteractions, bounds: annotation.Bounds, author: annotation.Author,
            subject: annotation.Subject, modifiedDate: annotation.ModifiedDate, note: annotation.Note, rect: annotation.Rect,
            annotName: annotation.AnnotName, isLocked: annotation.IsLocked,
            comments: this.pdfViewer.annotationModule.getAnnotationComments(annotation.Comments, annotation, annotation.Author), review: { state: annotation.State,
                stateModel: annotation.StateModel,
                modifiedDate: annotation.ModifiedDate, author: annotation.Author },
            shapeAnnotationType: 'textMarkup',
            pageNumber: pageNumber, textMarkupContent: '', textMarkupStartIndex: 0,
            textMarkupEndIndex: 0, annotationSelectorSettings: this.getSettings(annotation),
            customData: this.pdfViewer.annotation.getCustomData(annotation),
            isMultiSelect: annotation.IsMultiSelect, annotNameCollection: annotation.AnnotNameCollection,
            annotpageNumbers: annotation.AnnotpageNumbers,
            annotationAddMode: this.annotationAddMode, annotationSettings: annotation.AnnotationSettings,
            isPrint: annotation.IsPrint, isCommentLock: annotation.IsCommentLock, isAnnotationRotated: false
        };
        this.pdfViewer.annotationModule.storeAnnotations(pageNumber, annotationObject, '_annotations_textMarkup');
    };
    /**
     * @param {any} annotation - It describes about the annotation
     * @param {number} pageNumber - It describes about the page number
     * @private
     * @returns {any} - any
     */
    TextMarkupAnnotation.prototype.updateTextMarkupAnnotationCollections = function (annotation, pageNumber) {
        var annotationObject = null;
        annotation.allowedInteractions = annotation.AllowedInteractions ?
            annotation.AllowedInteractions : this.pdfViewer.annotationModule.updateAnnotationAllowedInteractions(annotation);
        annotation.AnnotationSettings = annotation.AnnotationSettings ?
            annotation.AnnotationSettings : this.pdfViewer.annotationModule.updateSettings(this.pdfViewer.customStampSettings);
        if (annotation.IsLocked) {
            annotation.AnnotationSettings.isLock = annotation.IsLocked;
        }
        annotationObject = {
            textMarkupAnnotationType: annotation.TextMarkupAnnotationType, allowedInteractions: annotation.allowedInteractions,
            color: annotation.Color, opacity: annotation.Opacity, bounds: annotation.Bounds, author: annotation.Author,
            subject: annotation.Subject, modifiedDate: annotation.ModifiedDate, note: annotation.Note, rect: annotation.Rect,
            annotationId: annotation.AnnotName, comments: this.pdfViewer.annotationModule.getAnnotationComments(annotation.Comments, annotation, annotation.Author), review: { state: annotation.State, stateModel: annotation.StateModel, modifiedDate: annotation.ModifiedDate, author: annotation.Author }, shapeAnnotationType: 'textMarkup', pageNumber: pageNumber, isMultiSelect: annotation.IsMultiSelect, annotNameCollection: annotation.AnnotNameCollection, annotpageNumbers: annotation.AnnotpageNumbers, customData: this.pdfViewer.annotation.getCustomData(annotation),
            annotationSettings: annotation.AnnotationSettings, isLocked: annotation.IsLocked, isPrint: annotation.IsPrint,
            isCommentLock: annotation.IsCommentLock
        };
        return annotationObject;
    };
    /**
     * @param {string} textMarkUpSettings - It describes about the textmarkup settings
     * @private
     * @returns {void}
     */
    TextMarkupAnnotation.prototype.updateTextMarkupSettings = function (textMarkUpSettings) {
        if (textMarkUpSettings === 'highlightSettings') {
            this.highlightColor = this.pdfViewer.highlightSettings.color ? this.pdfViewer.highlightSettings.color : this.highlightColor;
            this.highlightOpacity = this.pdfViewer.highlightSettings.opacity ?
                this.pdfViewer.highlightSettings.opacity : this.highlightOpacity;
        }
        if (textMarkUpSettings === 'underlineSettings') {
            this.underlineColor = this.pdfViewer.underlineSettings.color ? this.pdfViewer.underlineSettings.color : this.underlineColor;
            this.underlineOpacity = this.pdfViewer.underlineSettings.opacity ?
                this.pdfViewer.underlineSettings.opacity : this.underlineOpacity;
        }
        if (textMarkUpSettings === 'strikethroughSettings') {
            this.strikethroughColor = this.pdfViewer.strikethroughSettings.color ?
                this.pdfViewer.strikethroughSettings.color : this.strikethroughColor;
            this.strikethroughOpacity = this.pdfViewer.strikethroughSettings.opacity ?
                this.pdfViewer.strikethroughSettings.opacity : this.strikethroughOpacity;
        }
    };
    /**
     * @private
     * @returns {void}
     */
    TextMarkupAnnotation.prototype.clear = function () {
        this.selectTextMarkupCurrentPage = null;
        this.currentTextMarkupAnnotation = null;
        this.annotationClickPosition = null;
        PdfViewerBase.sessionStorageManager.removeItem(this.pdfViewerBase.documentId + '_annotations_textMarkup');
    };
    /**
     * Get vertex points properties
     *
     * @param {any} points - It describes about the points
     * @private
     * @returns {any} - any
     */
    TextMarkupAnnotation.prototype.getOffsetPoints = function (points) {
        var offsetPoints = [];
        //Converting points model into vertex property
        for (var j = 0; j < points.length; j++) {
            offsetPoints[parseInt(j.toString(), 10)] = { X: points[parseInt(j.toString(), 10)].x,
                Y: points[parseInt(j.toString(), 10)].y, Width: points[parseInt(j.toString(), 10)].width,
                Height: points[parseInt(j.toString(), 10)].height, Left: points[parseInt(j.toString(), 10)].x,
                Top: points[parseInt(j.toString(), 10)].y };
        }
        return offsetPoints;
    };
    /**
     * This method used to add annotations with using program.
     *
     * @param {AnnotationType} annotationType - It describes the annotation type
     * @param {any} annotationObject - It describes type of annotation object
     * @returns {object} - object
     * @private
     */
    TextMarkupAnnotation.prototype.updateAddAnnotationDetails = function (annotationType, annotationObject) {
        //Creating new object if annotationObject is null
        if (!annotationObject) {
            annotationObject = { pageNumber: 0 };
        }
        //Initialize the annotation settings
        var annotSelectorSettings = null;
        var annotallowedInteractions = null;
        var textMarkupAnnotationType = '';
        var annotSettings = null;
        var color = '';
        var bounds = [];
        //Creating the CurrentDate and Annotation name
        var currentDateString = this.pdfViewer.annotation.stickyNotesAnnotationModule.getDateAndTime();
        var annotationName = this.pdfViewer.annotation.createGUID();
        if (annotationType === 'Highlight') {
            //Creating annotation settings
            annotSelectorSettings = this.pdfViewer.highlightSettings.annotationSelectorSettings;
            this.pdfViewerBase.updateSelectorSettings(annotSelectorSettings);
            annotSettings = this.pdfViewer.annotationModule.updateSettings(this.pdfViewer.highlightSettings);
            annotationObject.author = annotationObject.author ? annotationObject.author : this.pdfViewer.annotationModule.updateAnnotationAuthor('textMarkup', annotationType);
            annotallowedInteractions = this.pdfViewer.highlightSettings.allowedInteractions ?
                this.pdfViewer.highlightSettings.allowedInteractions : this.pdfViewer.annotationSettings.allowedInteractions;
            textMarkupAnnotationType = 'Highlight';
            color = annotationObject.color ? annotationObject.color : '#FFDF56';
        }
        else if (annotationType === 'Underline') {
            //Creating annotation settings
            annotSelectorSettings = this.pdfViewer.underlineSettings.annotationSelectorSettings;
            this.pdfViewerBase.updateSelectorSettings(annotSelectorSettings);
            annotSettings = this.pdfViewer.annotationModule.updateSettings(this.pdfViewer.underlineSettings);
            annotationObject.author = annotationObject.author ? annotationObject.author : this.pdfViewer.annotationModule.updateAnnotationAuthor('textMarkup', annotationType);
            annotallowedInteractions = this.pdfViewer.underlineSettings.allowedInteractions ?
                this.pdfViewer.underlineSettings.allowedInteractions : this.pdfViewer.annotationSettings.allowedInteractions;
            textMarkupAnnotationType = 'Underline';
            color = annotationObject.color ? annotationObject.color : '#00ff00';
        }
        else if (annotationType === 'Strikethrough') {
            //Creating annotation settings
            annotSelectorSettings = this.pdfViewer.strikethroughSettings.annotationSelectorSettings;
            this.pdfViewerBase.updateSelectorSettings(annotSelectorSettings);
            annotSettings = this.pdfViewer.annotationModule.updateSettings(this.pdfViewer.strikethroughSettings);
            annotationObject.author = annotationObject.author ? annotationObject.author : this.pdfViewer.annotationModule.updateAnnotationAuthor('textMarkup', annotationType);
            annotallowedInteractions = this.pdfViewer.strikethroughSettings.allowedInteractions ?
                this.pdfViewer.strikethroughSettings.allowedInteractions : this.pdfViewer.annotationSettings.allowedInteractions;
            textMarkupAnnotationType = 'Strikethrough';
            color = annotationObject.color ? annotationObject.color : '#ff0000';
        }
        annotSettings.isLock = annotationObject.isLock ? annotationObject.isLock : annotSettings.isLock;
        //Creating the offset points
        if (annotationObject.bounds) {
            bounds = this.getOffsetPoints(annotationObject.bounds);
        }
        else {
            bounds = [{ X: 1, Y: 1, Width: 100, Height: 14, Left: 1, Top: 1, Location: { X: 1, Y: 1 },
                    Size: { Height: 14, IsEmpty: false, Width: 100 } }];
        }
        //Creating Annotation objects with it's proper properties
        var textMarkupAnnotation = [];
        var textmarkup = {
            AllowedInteractions: annotationObject.allowedInteractions ? annotationObject.allowedInteractions : annotallowedInteractions,
            AnnotName: annotationName,
            AnnotNameCollection: null,
            AnnotType: 'textMarkup',
            AnnotationSelectorSettings: annotationObject.annotationSelectorSettings ?
                annotationObject.annotationSelectorSettings : annotSelectorSettings,
            AnnotationSettings: annotSettings,
            Author: annotationObject.author ? annotationObject.author : 'Guest',
            Bounds: bounds,
            Color: annotationObject.color ? annotationObject.color : color,
            Comments: null,
            CreatedDate: currentDateString,
            CustomData: annotationObject.customData ? annotationObject.customData : null,
            ExistingCustomData: null,
            EnableMultiPageAnnotation: annotationObject.enableMultiPageAnnotation ? annotationObject.enableMultiPageAnnotation : false,
            EnableTextMarkupResizer: annotationObject.enableTextMarkupResizer ? annotationObject.enableTextMarkupResizer : false,
            IsCommentLock: false,
            IsMultiSelect: false,
            IsLocked: annotationObject.isLock ? annotationObject.isLock : false,
            IsLock: annotationObject.isLock ? annotationObject.isLock : false,
            IsPrint: !isNullOrUndefined(annotationObject.isPrint) ? annotationObject.isPrint : true,
            ModifiedDate: '',
            Note: '',
            Opacity: annotationObject.opacity ? annotationObject.opacity : 1,
            Rect: {},
            State: '',
            StateModel: '',
            Subject: annotationObject.subject ? annotationObject.subject : textMarkupAnnotationType,
            TextMarkupAnnotationType: textMarkupAnnotationType
        };
        //Adding the annotation object to an array and return it
        textMarkupAnnotation[0] = textmarkup;
        return { textMarkupAnnotation: textMarkupAnnotation };
    };
    return TextMarkupAnnotation;
}());
export { TextMarkupAnnotation };
