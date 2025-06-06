import { PdfViewerBase } from '../index';
import { splitArrayCollection, processPathData, getPathString } from '@syncfusion/ej2-drawings';
import { Browser, isNullOrUndefined } from '@syncfusion/ej2-base';
var InkAnnotation = /** @class */ (function () {
    function InkAnnotation(pdfViewer, pdfViewerBase) {
        this.newObject = [];
        /**
         * @private
         */
        this.outputString = '';
        /**
         * @private
         */
        this.inkAnnotationindex = [];
        /**
         * @private
         */
        this.isAddAnnotationProgramatically = false;
        /**
         * @private
         */
        this.currentPageNumber = '';
        /**
         * @private
         */
        this.inkAnnotationInitialZoom = 1;
        /**
         * @private
         */
        this.inkPathDataCollection = [];
        this.pdfViewer = pdfViewer;
        this.pdfViewerBase = pdfViewerBase;
    }
    /**
     * @private
     * @returns {void}
     */
    InkAnnotation.prototype.drawInk = function () {
        this.pdfViewerBase.disableTextSelectionMode();
        this.pdfViewer.tool = 'Ink';
    };
    InkAnnotation.prototype.drawInkAnnotation = function (pageNumber) {
        if (this.pdfViewerBase.isToolbarInkClicked) {
            this.pdfViewerBase.isInkAdded = true;
            this.pdfViewer.annotationModule.isFormFieldShape = false;
            var pageIndex = !isNaN(pageNumber) ? pageNumber : this.pdfViewerBase.currentPageNumber - 1;
            if ((this.outputString && this.outputString !== '') || this.inkPathDataCollection.length > 0) {
                var currentAnnot = this.addInk(pageIndex);
                this.pdfViewer.renderDrawing(undefined, pageIndex);
                this.pdfViewer.clearSelection(pageIndex);
                this.pdfViewer.select([currentAnnot.id], currentAnnot.annotationSelectorSettings);
                if (this.pdfViewer.toolbar && this.pdfViewer.toolbar.annotationToolbarModule) {
                    this.pdfViewer.toolbar.annotationToolbarModule.enableSignaturePropertiesTools(true);
                }
                if (Browser.isDevice && !this.pdfViewer.enableDesktopMode &&
                    this.pdfViewer.enableToolbar && this.pdfViewer.enableAnnotationToolbar) {
                    this.pdfViewer.toolbarModule.annotationToolbarModule.createPropertyTools('Ink');
                }
            }
            else {
                this.outputString = '';
                this.newObject = [];
                this.pdfViewerBase.isToolbarInkClicked = false;
                this.pdfViewer.tool = '';
                this.inkPathDataCollection = [];
            }
            this.pdfViewerBase.isInkAdded = false;
        }
    };
    /**
     * @private
     * @returns {any} - any
     */
    InkAnnotation.prototype.updateInkDataWithZoom = function () {
        var updatedPathData = '';
        if (this.outputString !== '') {
            this.inkPathDataCollection.push({ pathData: this.outputString, zoomFactor: this.inkAnnotationInitialZoom });
        }
        if (this.inkPathDataCollection.length > 0) {
            //for loop to get the path data from the collection with path zoom factor
            for (var i = 0; i < this.inkPathDataCollection.length; i++) {
                updatedPathData += this.updatePathDataWithZoom(this.inkPathDataCollection[parseInt(i.toString(), 10)].pathData, this.inkPathDataCollection[parseInt(i.toString(), 10)].zoomFactor);
            }
        }
        else {
            updatedPathData += this.updatePathDataWithZoom(this.outputString, this.inkAnnotationInitialZoom);
        }
        return updatedPathData;
    };
    InkAnnotation.prototype.updatePathDataWithZoom = function (pathData, pathZoomFactor) {
        var pathString = '';
        var zoom = this.pdfViewerBase.getZoomFactor();
        var collectionData = processPathData(pathData);
        var csData = splitArrayCollection(collectionData);
        for (var j = 0; j < csData.length; j++) {
            var pathValue = csData[parseInt(j.toString(), 10)];
            pathString += pathValue.command + pathValue.x * (zoom / pathZoomFactor) + ',' + pathValue.y * (zoom / pathZoomFactor) + ' ';
        }
        return pathString;
    };
    /**
     * @private
     * @returns {void}
     */
    InkAnnotation.prototype.storePathData = function () {
        this.convertToPath(this.newObject);
        this.newObject = [];
    };
    /**
     * @param {any} position - It describes about the position of the annotation
     * @param {number} pageIndex - It describes about the page index value
     * @private
     * @returns {void}
     */
    InkAnnotation.prototype.drawInkInCanvas = function (position, pageIndex) {
        if (this.currentPageNumber !== '' && parseInt(this.currentPageNumber, 10) !== pageIndex) {
            this.drawInkAnnotation(parseInt(this.currentPageNumber, 10));
            this.pdfViewerBase.isToolbarInkClicked = true;
            this.pdfViewer.tool = 'Ink';
        }
        var zoom = this.pdfViewerBase.getZoomFactor();
        this.inkAnnotationInitialZoom = zoom;
        var ratio = this.pdfViewerBase.getWindowDevicePixelRatio();
        var canvas = this.pdfViewerBase.getAnnotationCanvas('_annotationCanvas_', pageIndex);
        var context = canvas.getContext('2d');
        var thickness = this.pdfViewer.inkAnnotationSettings.thickness ? this.pdfViewer.inkAnnotationSettings.thickness : 1;
        var opacity = this.pdfViewer.inkAnnotationSettings.opacity ? this.pdfViewer.inkAnnotationSettings.opacity : 1;
        var strokeColor = this.pdfViewer.inkAnnotationSettings.strokeColor ? this.pdfViewer.inkAnnotationSettings.strokeColor : '#ff0000';
        if (!Browser.isDevice || (Browser.isDevice && zoom <= 0.7)) {
            context.setTransform(ratio, 0, 0, ratio, 0, 0);
        }
        context.beginPath();
        context.lineJoin = 'round';
        context.lineCap = 'round';
        context.moveTo(position.prevPosition.x, position.prevPosition.y);
        context.lineTo(position.currentPosition.x, position.currentPosition.y);
        context.lineWidth = thickness * zoom > 1 ? thickness * zoom : thickness;
        context.strokeStyle = strokeColor;
        context.globalAlpha = opacity;
        // After the addition of a TextMarkup annotation, a LineDash value was introduced. To eliminate it, the value was cleared.
        context.setLineDash([]);
        context.stroke();
        // context.lineWidth = 2;
        context.arc(position.prevPosition.x, position.prevPosition.y, 2 / 2, 0, Math.PI * 2, true);
        context.closePath();
        this.pdfViewerBase.prevPosition = position.currentPosition;
        this.newObject.push(position.currentPosition.x, position.currentPosition.y);
        this.currentPageNumber = pageIndex.toString();
    };
    InkAnnotation.prototype.convertToPath = function (newObject) {
        this.movePath(newObject[0], newObject[1]);
        this.linePath(newObject[0], newObject[1]);
        for (var n = 2; n < newObject.length; n = n + 2) {
            this.linePath(newObject[parseInt(n.toString(), 10)], newObject[n + 1]);
        }
    };
    InkAnnotation.prototype.linePath = function (x, y) {
        if (!isNullOrUndefined(x) && !isNullOrUndefined(y)) {
            this.outputString += 'L' + x + ',' + y + ' ';
        }
    };
    InkAnnotation.prototype.movePath = function (x, y) {
        if (!isNullOrUndefined(x) && !isNullOrUndefined(y)) {
            this.outputString += 'M' + x + ',' + y + ' ';
        }
    };
    /**
     * @param {number} pageNumber - It describes about the page number
     * @private
     * @returns {any} - any
     */
    InkAnnotation.prototype.addInk = function (pageNumber) {
        this.outputString = this.updateInkDataWithZoom();
        var currentBounds = this.calculateInkSize(this.outputString);
        var annot;
        if (this.pdfViewerBase.isToolbarInkClicked) {
            var annotationName = this.pdfViewer.annotation.createGUID();
            var modifiedDate = this.pdfViewer.annotation.stickyNotesAnnotationModule.getDateAndTime();
            var pageIndex = !isNaN(pageNumber) ? pageNumber : this.pdfViewerBase.currentPageNumber - 1;
            var thickness = this.pdfViewer.inkAnnotationSettings.thickness ? this.pdfViewer.inkAnnotationSettings.thickness : 1;
            var opacity = this.pdfViewer.inkAnnotationSettings.opacity ? this.pdfViewer.inkAnnotationSettings.opacity : 1;
            var strokeColor = this.pdfViewer.inkAnnotationSettings.strokeColor ? this.pdfViewer.inkAnnotationSettings.strokeColor : '#ff0000';
            var isLock = this.pdfViewer.inkAnnotationSettings.isLock ?
                this.pdfViewer.inkAnnotationSettings.isLock : this.pdfViewer.annotationSettings.isLock;
            var author = (this.pdfViewer.annotationSettings.author !== 'Guest') ? this.pdfViewer.annotationSettings.author : this.pdfViewer.inkAnnotationSettings.author ? this.pdfViewer.inkAnnotationSettings.author : 'Guest';
            var subject = (this.pdfViewer.annotationSettings.subject !== '' && !isNullOrUndefined(this.pdfViewer.annotationSettings.subject)) ? this.pdfViewer.annotationSettings.subject : this.pdfViewer.inkAnnotationSettings.subject ? this.pdfViewer.inkAnnotationSettings.subject : 'Ink';
            var customData = !isNullOrUndefined(this.pdfViewer.annotationSettings.customData) ?
                this.pdfViewer.annotationSettings.customData : this.pdfViewer.inkAnnotationSettings.customData ?
                this.pdfViewer.inkAnnotationSettings.customData : null;
            var isPrint = this.pdfViewer.inkAnnotationSettings.isPrint;
            var allowedInteractions = this.pdfViewer.inkAnnotationSettings.allowedInteractions ?
                this.pdfViewer.inkAnnotationSettings.allowedInteractions : this.pdfViewer.annotationSettings.allowedInteractions;
            var annotationSettings = this.pdfViewer.annotationSettings ? this.pdfViewer.annotationSettings :
                this.pdfViewer.annotationModule.updateAnnotationSettings(this.pdfViewer.inkAnnotationSettings);
            annot = {
                id: 'ink' + this.pdfViewerBase.inkCount, bounds: { x: currentBounds.x, y: currentBounds.y, width: currentBounds.width, height: currentBounds.height }, pageIndex: pageIndex, data: this.outputString, customData: customData,
                shapeAnnotationType: 'Ink', opacity: opacity, strokeColor: strokeColor, thickness: thickness, annotName: annotationName, comments: [],
                author: author, subject: subject, notes: '',
                review: { state: '', stateModel: '', modifiedDate: modifiedDate, author: author },
                annotationSelectorSettings: this.getSelector('Ink', ''), modifiedDate: modifiedDate, annotationSettings: annotationSettings,
                isPrint: isPrint, allowedInteractions: allowedInteractions, isCommentLock: false, isLocked: isLock
            };
            var annotation = this.pdfViewer.add(annot);
            var bounds = { left: annot.bounds.x, top: annot.bounds.y, width: annot.bounds.width, height: annot.bounds.height };
            var settings = {
                opacity: annot.opacity, strokeColor: annot.strokeColor, thickness: annot.thickness, modifiedDate: annot.modifiedDate,
                width: annot.bounds.width, height: annot.bounds.height, data: this.outputString
            };
            this.pdfViewerBase.inkCount++;
            var commentsDivid = this.pdfViewer.annotation.stickyNotesAnnotationModule.addComments('ink', (annot.pageIndex + 1), annot.shapeAnnotationType);
            if (commentsDivid) {
                document.getElementById(commentsDivid).id = annotationName;
            }
            annot.annotName = annotationName;
            this.pdfViewer.annotation.addAction(pageIndex, null, annotation, 'Addition', '', annotation, annotation);
            this.pdfViewer.annotationModule.storeAnnotations(pageIndex, annot, '_annotations_ink');
            this.pdfViewer.fireAnnotationAdd(annot.pageIndex, annot.annotName, 'Ink', bounds, settings);
            if (this.pdfViewerBase.isInkAdded) {
                this.outputString = '';
                this.newObject = [];
                this.inkPathDataCollection = [];
            }
            this.pdfViewerBase.isToolbarInkClicked = false;
            this.pdfViewer.tool = '';
        }
        return annot;
    };
    /**
     * @private
     * @returns {void}
     */
    InkAnnotation.prototype.setAnnotationMode = function () {
        if (this.pdfViewerBase.isToolbarInkClicked) {
            this.drawInkAnnotation();
        }
        else {
            this.pdfViewerBase.isToolbarInkClicked = true;
            this.drawInk();
        }
    };
    InkAnnotation.prototype.saveInkSignature = function () {
        var storeObject = PdfViewerBase.sessionStorageManager.getItem(this.pdfViewerBase.documentId + '_annotations_ink');
        if (this.pdfViewerBase.isStorageExceed) {
            storeObject = this.pdfViewerBase.annotationStorage[this.pdfViewerBase.documentId + '_annotations_ink'];
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
                        var strokeColorString = pageAnnotationObject.annotations[parseInt(z.toString(), 10)].strokeColor;
                        pageAnnotationObject.annotations[parseInt(z.toString(), 10)].strokeColor =
                            JSON.stringify(this.pdfViewerBase.signatureModule.getRgbCode(strokeColorString));
                        pageAnnotationObject.annotations[parseInt(z.toString(), 10)].bounds =
                            JSON.stringify(this.pdfViewer.annotation.
                                getInkBounds(pageAnnotationObject.annotations[parseInt(z.toString(), 10)].bounds, pageAnnotationObject.pageIndex));
                        var collectionData = processPathData(pageAnnotationObject.annotations[parseInt(z.toString(), 10)].data);
                        var csData = splitArrayCollection(collectionData);
                        pageAnnotationObject.annotations[parseInt(z.toString(), 10)].data = JSON.stringify(csData);
                    }
                    newArray = pageAnnotationObject.annotations;
                }
                annotations[pageAnnotationObject.pageIndex] = newArray;
            }
        }
        return JSON.stringify(annotations);
    };
    /**
     * @param {number} pageNumber - It describes about the page number value
     * @param {any} annotationBase - It describes about the annotation base
     * @private
     * @returns {void}
     */
    InkAnnotation.prototype.addInCollection = function (pageNumber, annotationBase) {
        if (annotationBase) {
            var pageAnnotations = this.getAnnotations(pageNumber, null);
            if (pageAnnotations) {
                pageAnnotations.push(annotationBase);
            }
            this.manageInkAnnotations(pageAnnotations, pageNumber);
        }
    };
    /**
     * @private
     * @param {string} data - data
     * @returns {any} - points
     */
    InkAnnotation.prototype.calculateInkSize = function (data) {
        var minimumX = -1;
        var minimumY = -1;
        var maximumX = -1;
        var maximumY = -1;
        var collectionData = processPathData(data);
        var zoomvalue = this.pdfViewerBase.getZoomFactor();
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
        return { x: (minimumX / zoomvalue), y: (minimumY / zoomvalue),
            width: (newdifferenceX / zoomvalue), height: (newdifferenceY / zoomvalue) };
    };
    /**
     * @param {any} annotationCollection - It describes about the annotation collection
     * @param {number} pageIndex - page index value
     * @param {boolean} isImport - It ensures whether the isImport is true or not
     * @param {boolean} isAnnotOrderAction - It ensures whether the isAnnotOrderAction is true or not
     * @private
     * @returns {void}
     */
    InkAnnotation.prototype.renderExistingInkSignature = function (annotationCollection, pageIndex, isImport, isAnnotOrderAction) {
        var annot;
        var isinkAnnotationAdded = false;
        if (!isImport) {
            for (var p = 0; p < this.inkAnnotationindex.length; p++) {
                if (this.inkAnnotationindex[parseInt(p.toString(), 10)] === pageIndex) {
                    isinkAnnotationAdded = true;
                    break;
                }
            }
        }
        if (annotationCollection && (!isinkAnnotationAdded || isAnnotOrderAction)) {
            if (annotationCollection.length > 0 && this.inkAnnotationindex.indexOf(pageIndex) === -1) {
                this.inkAnnotationindex.push(pageIndex);
            }
            for (var n = 0; n < annotationCollection.length; n++) {
                var currentAnnotation = annotationCollection[parseInt(n.toString(), 10)];
                if (currentAnnotation) {
                    var data = currentAnnotation.PathData;
                    if (isImport && data) {
                        if (typeof (data) === 'object' && data.length > 1) {
                            data = getPathString(data);
                        }
                        else {
                            if (!(currentAnnotation.IsPathData || (data.split('command').length <= 1))) {
                                data = getPathString(JSON.parse(data));
                            }
                        }
                    }
                    this.outputString = data;
                    var calculateInkPosition = this.calculateInkSize(this.outputString);
                    this.outputString = '';
                    var rectDiff = 0;
                    var rectDifference = 1;
                    var bounds = currentAnnotation.Bounds;
                    if (calculateInkPosition) {
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
                    var isLock = currentAnnotation.AnnotationSettings ? currentAnnotation.AnnotationSettings.isLock : false;
                    var selectorSettings = currentAnnotation.AnnotationSelectorSettings ? typeof (currentAnnotation.AnnotationSelectorSettings) === 'string' ? JSON.parse(currentAnnotation.AnnotationSelectorSettings) : currentAnnotation.AnnotationSelectorSettings : this.getSelector(currentAnnotation, 'Ink');
                    var customData = this.pdfViewer.annotation.getCustomData(currentAnnotation);
                    var isPrint = true;
                    if (currentAnnotation.AnnotationSettings) {
                        isPrint = currentAnnotation.AnnotationSettings.isPrint;
                    }
                    else {
                        isPrint = this.pdfViewer.inkAnnotationSettings.isPrint;
                    }
                    isPrint = !isNullOrUndefined(currentAnnotation.IsPrint) ? currentAnnotation.IsPrint : true;
                    if (currentAnnotation.IsLocked) {
                        isLock = currentAnnotation.IsLocked;
                    }
                    if (currentAnnotation.Subject === 'Highlight' && currentAnnotation.Opacity === 1) {
                        currentAnnotation.Opacity = currentAnnotation.Opacity / 2;
                    }
                    currentAnnotation.allowedInteractions = currentAnnotation.AllowedInteractions ?
                        currentAnnotation.AllowedInteractions : this.pdfViewer.annotationModule.
                        updateAnnotationAllowedInteractions(currentAnnotation);
                    currentAnnotation.AnnotationSettings = currentAnnotation.AnnotationSettings ?
                        currentAnnotation.AnnotationSettings : this.pdfViewer.annotationModule.updateAnnotationSettings(currentAnnotation);
                    annot = {
                        id: 'ink' + this.pdfViewerBase.inkCount, bounds: { x: currentLeft, y: currentTop, width: currentWidth, height: currentHeight }, pageIndex: pageIndex, data: data,
                        shapeAnnotationType: 'Ink', opacity: currentAnnotation.Opacity, strokeColor: currentAnnotation.StrokeColor, thickness: currentAnnotation.Thickness, annotName: currentAnnotation.AnnotName,
                        comments: this.pdfViewer.annotationModule.
                            getAnnotationComments(currentAnnotation.Comments, currentAnnotation, currentAnnotation.Author),
                        author: currentAnnotation.Author, allowedInteractions: currentAnnotation.allowedInteractions,
                        subject: currentAnnotation.Subject, modifiedDate: currentAnnotation.ModifiedDate,
                        review: { state: '', stateModel: '', modifiedDate: currentAnnotation.ModifiedDate, author: currentAnnotation.Author }, notes: currentAnnotation.Note, annotationSettings: currentAnnotation.AnnotationSettings,
                        annotationSelectorSettings: selectorSettings, customData: customData, isPrint: isPrint,
                        isCommentLock: currentAnnotation.IsCommentLock
                    };
                    this.pdfViewer.add(annot);
                    var canvasPageIndex = currentAnnotation.pageIndex ? currentAnnotation.pageIndex : currentAnnotation.PageNumber;
                    var canvass = this.pdfViewerBase.getAnnotationCanvas('_annotationCanvas_', canvasPageIndex);
                    this.pdfViewer.renderDrawing(canvass, annot.pageIndex);
                    this.pdfViewer.annotationModule.storeAnnotations(annot.pageIndex, annot, '_annotations_ink');
                    if (this.isAddAnnotationProgramatically) {
                        var settings = {
                            opacity: annot.opacity, strokeColor: annot.strokeColor, thickness: annot.thickness,
                            modifiedDate: annot.modifiedDate,
                            width: annot.bounds.width, height: annot.bounds.height, data: this.outputString
                        };
                        this.pdfViewer.fireAnnotationAdd(annot.pageIndex, annot.annotName, 'Ink', bounds, settings);
                    }
                    this.pdfViewerBase.currentSignatureAnnot = null;
                    this.pdfViewerBase.signatureCount++;
                    this.pdfViewerBase.inkCount++;
                    if (this.pdfViewerBase.navigationPane && this.pdfViewerBase.navigationPane.annotationMenuObj &&
                        this.pdfViewer.isSignatureEditable) {
                        this.pdfViewerBase.navigationPane.annotationMenuObj.enableItems([this.pdfViewer.localeObj.getConstant('Export Annotations')], true);
                        this.pdfViewerBase.navigationPane.annotationMenuObj.enableItems([this.pdfViewer.localeObj.getConstant('Export XFDF')], true);
                    }
                }
            }
        }
    };
    // To save the imported annotations while downloading or exporting for the page above 10 without a scroll (EJ2-63924)
    /**
     * @param {any} annotation - This is annotation
     * @param {number} pageNumber - This is page number
     * @private
     * @returns {void}
     */
    InkAnnotation.prototype.saveImportedInkAnnotation = function (annotation, pageNumber) {
        var annotationObject = null;
        var currentBounds = annotation.Bounds;
        var bounds = { x: currentBounds.X, y: currentBounds.Y, width: currentBounds.Width, height: currentBounds.Height };
        var allowedInteractions = this.pdfViewer.annotationModule.updateAnnotationAllowedInteractions(annotation);
        var customData = this.pdfViewer.annotation.getCustomData(annotation);
        var comments = this.pdfViewer.annotationModule.getAnnotationComments(annotation.Comments, annotation, annotation.Author);
        var review = { state: annotation.State, stateModel: annotation.StateModel,
            modifiedDate: annotation.ModifiedDate, author: annotation.Author };
        var annotationSettings = annotation.AnnotationSettings ? annotation.AnnotationSettings :
            this.pdfViewer.annotationModule.updateAnnotationSettings(annotation);
        var annotationSelectorSettings = this.getSettings(annotation);
        var data = annotation.PathData;
        if (typeof (data) === 'object' && data.length > 1) {
            data = getPathString(data);
        }
        else {
            if (!annotation.IsPathData && data.split('command').length > 1) {
                data = getPathString(JSON.parse(data));
            }
        }
        annotationObject = {
            allowedInteractions: allowedInteractions, annotName: annotation.AnnotName,
            annotationSelectorSettings: annotationSelectorSettings,
            annotationSettings: annotationSettings, author: annotation.Author, bounds: bounds,
            customData: customData, comments: comments, data: data,
            id: 'Ink', isCommentLock: annotation.IsCommentLock, isLocked: annotation.IsLocked, isPrint: annotation.IsPrint, modifiedDate: annotation.ModifiedDate,
            note: annotation.Note, opacity: annotation.Opacity, pageIndex: pageNumber, review: review,
            shapeAnnotationType: annotation.AnnotationType,
            strokeColor: annotation.StrokeColor, subject: annotation.Subject, thickness: annotation.Thickness
        };
        this.pdfViewer.annotationModule.storeAnnotations(pageNumber, annotationObject, '_annotations_ink');
    };
    // To get the annotation selector settings
    InkAnnotation.prototype.getSettings = function (annotation) {
        var selector = this.pdfViewer.annotationSelectorSettings;
        if (annotation.AnnotationSelectorSettings) {
            selector = annotation.AnnotationSelectorSettings;
        }
        else {
            selector = this.getSelector(annotation.ShapeAnnotationType, annotation.Subject);
        }
        return selector;
    };
    /**
     * @param {number} pageNumber - It describes about the page number value
     * @param {any} annotations - It describes about the annotations
     * @private
     * @returns {void}
     */
    InkAnnotation.prototype.storeInkSignatureData = function (pageNumber, annotations) {
        this.pdfViewer.annotation.addAction(annotations.pageIndex, null, annotations, 'Addition', '', annotations, annotations);
        var annotation = null;
        var left = annotations.bounds.left ? annotations.bounds.left : annotations.bounds.x;
        var top = annotations.bounds.top ? annotations.bounds.top : annotations.bounds.y;
        if (annotations.wrapper && annotations.wrapper.bounds) {
            left = annotations.wrapper.bounds.left;
            top = annotations.wrapper.bounds.top;
        }
        annotation = {
            id: annotations.id, bounds: { x: left, y: top, width: annotations.bounds.width, height: annotations.bounds.height },
            shapeAnnotationType: 'Ink', opacity: annotations.opacity, thickness: annotations.thickness, strokeColor: annotations.strokeColor, pageIndex: annotations.pageIndex, data: annotations.data,
            annotName: annotations.annotName,
            comments: annotations.comments, author: annotations.author, subject: annotations.subject,
            modifiedDate: annotations.modifiedDate,
            review: { state: '', stateModel: '', modifiedDate: annotations.modifiedDate, author: annotations.author }, notes: annotations.notes,
            annotationSelectorSettings: this.getSelector(annotations, 'Ink'), isCommentLock: annotations.isCommentLock
        };
        var storeObject = PdfViewerBase.sessionStorageManager.getItem(this.pdfViewerBase.documentId + '_annotations_ink');
        var index = 0;
        if (!storeObject) {
            var shapeAnnotation = { pageIndex: pageNumber, annotations: [] };
            shapeAnnotation.annotations.push(annotation);
            index = shapeAnnotation.annotations.indexOf(annotation);
            var annotationCollection = [];
            annotationCollection.push(shapeAnnotation);
            var annotationStringified = JSON.stringify(annotationCollection);
            PdfViewerBase.sessionStorageManager.setItem(this.pdfViewerBase.documentId + '_annotations_ink', annotationStringified);
        }
        else {
            var annotObject = JSON.parse(storeObject);
            PdfViewerBase.sessionStorageManager.removeItem(this.pdfViewerBase.documentId + '_annotations_ink');
            var pageIndex = this.pdfViewer.annotationModule.getPageCollection(annotObject, pageNumber);
            if (pageIndex != null && annotObject[parseInt(pageIndex.toString(), 10)]) {
                annotObject[parseInt(pageIndex.toString(), 10)].annotations.push(annotation);
                index = annotObject[parseInt(pageIndex.toString(), 10)].annotations.indexOf(annotation);
            }
            else {
                var markupAnnotation = { pageIndex: pageNumber, annotations: [] };
                markupAnnotation.annotations.push(annotation);
                index = markupAnnotation.annotations.indexOf(annotation);
                annotObject.push(markupAnnotation);
            }
            var annotationStringified = JSON.stringify(annotObject);
            PdfViewerBase.sessionStorageManager.setItem(this.pdfViewerBase.documentId + '_annotations_ink', annotationStringified);
        }
    };
    InkAnnotation.prototype.getSelector = function (type, subject) {
        var selector = this.pdfViewer.annotationSelectorSettings;
        if ((type === 'Ink' || subject === 'Ink') && this.pdfViewer.inkAnnotationSettings.annotationSelectorSettings) {
            selector = this.pdfViewer.inkAnnotationSettings.annotationSelectorSettings;
            this.pdfViewerBase.updateSelectorSettings(selector);
        }
        return selector;
    };
    InkAnnotation.prototype.getAnnotations = function (pageIndex, shapeAnnotations) {
        var annotationCollection;
        var storeObject = PdfViewerBase.sessionStorageManager.getItem(this.pdfViewerBase.documentId + '_annotations_ink');
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
    /**
     * @param {string} property - It describes about the property
     * @param {number} pageNumber - It describes about the page number
     * @param {any} annotationBase - It is about the annotation base
     * @private
     * @returns {any} - any
     */
    InkAnnotation.prototype.modifySignatureInkCollection = function (property, pageNumber, annotationBase) {
        if (!isNullOrUndefined(annotationBase.formFieldAnnotationType) && annotationBase.formFieldAnnotationType !== '') {
            this.pdfViewer.annotationModule.isFormFieldShape = true;
        }
        else {
            this.pdfViewer.annotationModule.isFormFieldShape = false;
        }
        this.pdfViewerBase.updateDocumentEditedProperty(true);
        var currentAnnotObject = null;
        var pageAnnotations = this.getAnnotations(pageNumber, null);
        if (pageAnnotations != null && annotationBase) {
            for (var i = 0; i < pageAnnotations.length; i++) {
                if (annotationBase.id === pageAnnotations[parseInt(i.toString(), 10)].id) {
                    if (property === 'bounds') {
                        this.pdfViewerBase.isBounds =
                            this.pdfViewerBase.boundsCalculation(pageAnnotations[parseInt(i.toString(), 10)].bounds, annotationBase.wrapper.bounds);
                        if (this.pdfViewerBase.isBounds) {
                            pageAnnotations[parseInt(i.toString(), 10)].bounds = {
                                x: annotationBase.wrapper.bounds.left,
                                y: annotationBase.wrapper.bounds.top, width: annotationBase.bounds.width,
                                height: annotationBase.bounds.height
                            };
                        }
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
                        pageAnnotations[parseInt(i.toString(), 10)].notes = annotationBase.notes;
                    }
                    else if (property === 'delete') {
                        currentAnnotObject = pageAnnotations.splice(i, 1)[0];
                        break;
                    }
                    if (this.pdfViewerBase.isBounds) {
                        pageAnnotations[parseInt(i.toString(), 10)].modifiedDate =
                            this.pdfViewer.annotation.stickyNotesAnnotationModule.getDateAndTime();
                    }
                    this.pdfViewer.annotationModule.storeAnnotationCollections(pageAnnotations[parseInt(i.toString(), 10)], pageNumber);
                }
            }
            this.manageInkAnnotations(pageAnnotations, pageNumber);
        }
        return currentAnnotObject;
    };
    InkAnnotation.prototype.manageInkAnnotations = function (pageAnnotations, pageNumber) {
        var storeObject = PdfViewerBase.sessionStorageManager.getItem(this.pdfViewerBase.documentId + '_annotations_ink');
        if (storeObject) {
            var annotObject = JSON.parse(storeObject);
            PdfViewerBase.sessionStorageManager.removeItem(this.pdfViewerBase.documentId + '_annotations_ink');
            var index = this.pdfViewer.annotationModule.getPageCollection(annotObject, pageNumber);
            if (index != null && annotObject[parseInt(index.toString(), 10)]) {
                annotObject[parseInt(index.toString(), 10)].annotations = pageAnnotations;
            }
            var annotationStringified = JSON.stringify(annotObject);
            PdfViewerBase.sessionStorageManager.setItem(this.pdfViewerBase.documentId + '_annotations_ink', annotationStringified);
        }
    };
    /**
     * @param {any} currentAnnotation - It describes about the current annotation
     * @param {number} pageIndex - It describes about the page index value
     * @param {boolean} isImport - It ensures whether the isImport is true or not
     * @private
     * @returns {any} - any
     */
    InkAnnotation.prototype.updateInkCollections = function (currentAnnotation, pageIndex, isImport) {
        var annot;
        if (currentAnnotation) {
            var bounds = currentAnnotation.Bounds;
            var currentLeft = (bounds.X);
            var currentTop = (bounds.Y);
            var currentWidth = (bounds.Width);
            var currentHeight = (bounds.Height);
            var customData = currentAnnotation.customData;
            var isPrint = currentAnnotation.isPrint;
            currentAnnotation.AllowedInteractions = currentAnnotation.AllowedInteractions ?
                currentAnnotation.AllowedInteractions : this.pdfViewer.annotationModule.
                updateAnnotationAllowedInteractions(currentAnnotation);
            currentAnnotation.AnnotationSettings = currentAnnotation.AnnotationSettings ?
                currentAnnotation.AnnotationSettings : this.pdfViewer.inkAnnotationSettings ?
                this.pdfViewer.inkAnnotationSettings : this.pdfViewer.annotationSettings;
            if (currentAnnotation.IsLocked) {
                currentAnnotation.AnnotationSettings.isLock = currentAnnotation.IsLocked;
            }
            var data = currentAnnotation.PathData;
            if (isImport) {
                data = getPathString(JSON.parse(currentAnnotation.PathData));
            }
            annot = {
                id: 'ink' + this.pdfViewerBase.signatureCount, bounds: { x: currentLeft, y: currentTop, width: currentWidth, height: currentHeight }, pageIndex: pageIndex, data: data,
                shapeAnnotationType: 'Ink', opacity: currentAnnotation.Opacity, strokeColor: currentAnnotation.StrokeColor, thickness: currentAnnotation.Thickness, annotationId: currentAnnotation.AnnotName,
                customData: customData, comments: this.pdfViewer.annotationModule.
                    getAnnotationComments(currentAnnotation.Comments, currentAnnotation, currentAnnotation.Author),
                author: currentAnnotation.Author, allowedInteractions: currentAnnotation.AllowedInteractions,
                subject: currentAnnotation.Subject, modifiedDate: currentAnnotation.ModifiedDate,
                review: { state: '', stateModel: '', modifiedDate: currentAnnotation.ModifiedDate, author: currentAnnotation.Author }, notes: currentAnnotation.Note, isPrint: isPrint, isCommentLock: currentAnnotation.IsCommentLock, annotationSettings: currentAnnotation.AnnotationSettings, isLocked: currentAnnotation.AnnotationSettings.isLock
            };
            return annot;
        }
    };
    /**
     * This method used to add annotations with using program.
     *
     * @param {InkAnnotationSettings} annotationObject - It describes type of annotation object
     * @param {IPoint} offset - It describes about the annotation bounds or location
     * @param {number} pageNumber - It describes about the annotation page number
     * @returns {object} - onject
     * @private
     */
    InkAnnotation.prototype.updateAddAnnotationDetails = function (annotationObject, offset, pageNumber) {
        //Creating new object if annotationObject is null
        if (!annotationObject) {
            annotationObject = { offset: { x: 10, y: 10 }, pageNumber: 0, width: undefined, height: undefined };
            offset = annotationObject.offset;
        }
        else if (!annotationObject.offset) {
            offset = { x: 10, y: 10 };
        }
        else {
            offset = annotationObject.offset;
        }
        //Creating the CurrentDate and Annotation name
        var currentDateString = this.pdfViewer.annotation.stickyNotesAnnotationModule.getDateAndTime();
        var annotationName = this.pdfViewer.annotation.createGUID();
        //Creating annotation settings
        var annotationSelectorSettings = this.pdfViewer.inkAnnotationSettings.annotationSelectorSettings;
        this.pdfViewerBase.updateSelectorSettings(annotationSelectorSettings);
        var annotationSettings = this.pdfViewer.annotationModule.updateSettings(this.pdfViewer.inkAnnotationSettings);
        annotationObject.author = annotationObject.author ? annotationObject.author : this.pdfViewer.annotationModule.updateAnnotationAuthor('ink', annotationSettings.AnnotationType);
        var allowedInteractions = this.pdfViewer.inkAnnotationSettings.allowedInteractions ?
            this.pdfViewer.inkAnnotationSettings.allowedInteractions : this.pdfViewer.annotationSettings.allowedInteractions;
        annotationSettings.isLock = annotationObject.isLock ? annotationObject.isLock : annotationSettings.isLock;
        annotationObject.width = annotationObject.width ? annotationObject.width : 150;
        annotationObject.height = annotationObject.height ? annotationObject.height : 60;
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
        //Creating Annotation objects with it's proper properties
        var signatureInkAnnotation = [];
        var ink = {
            AllowedInteractions: annotationObject.allowedInteractions ? annotationObject.allowedInteractions : allowedInteractions,
            AnnotName: annotationName,
            AnnotType: 'ink',
            AnnotationFlags: null,
            AnnotationSelectorSettings: annotationObject.annotationSelectorSettings ?
                annotationObject.annotationSelectorSettings : annotationSelectorSettings,
            AnnotationSettings: annotationSettings,
            AnnotationType: 'Ink',
            Author: annotationObject.author ? annotationObject.author : 'Guest',
            Bounds: { X: offset.x, Y: offset.y, Width: annotationObject.width, Height: annotationObject.height,
                Left: offset.x, Top: offset.y, Location: { X: offset.x, Y: offset.y },
                Size: { Height: annotationObject.height, IsEmpty: false, Width: annotationObject.width } },
            Comments: null,
            CreatedDate: currentDateString,
            CustomData: annotationObject.customData ? annotationObject.customData : null,
            ExistingCustomData: null,
            IsCommentLock: false,
            IsLock: annotationObject.isLock ? annotationObject.isLock : false,
            IsPrint: !isNullOrUndefined(annotationObject.isPrint) ? annotationObject.isPrint : true,
            ModifiedDate: '',
            Note: '',
            Opacity: annotationObject.opacity ? annotationObject.opacity : 1,
            PathData: annotationObject.path,
            PageNumber: pageNumber,
            State: '',
            StateModel: '',
            StrokeColor: annotationObject.strokeColor ? annotationObject.strokeColor : 'rgba(255,0,0,1)',
            SubType: null,
            Subject: annotationObject.subject ? annotationObject.subject : 'Ink',
            Type: null,
            Thickness: annotationObject.thickness ? annotationObject.thickness : 1
        };
        //Adding the annotation object to an array and return it
        signatureInkAnnotation[0] = ink;
        return { signatureInkAnnotation: signatureInkAnnotation };
    };
    return InkAnnotation;
}());
export { InkAnnotation };
