import { PdfViewerBase } from '../../index';
import { NumericTextBox } from '@syncfusion/ej2-inputs';
import { createElement, Browser, isNullOrUndefined, isBlazor } from '@syncfusion/ej2-base';
import { Dialog } from '@syncfusion/ej2-popups';
import { DropDownButton } from '@syncfusion/ej2-splitbuttons';
import { Point } from '@syncfusion/ej2-drawings';
/**
 * @hidden
 */
var MeasureAnnotation = /** @class */ (function () {
    function MeasureAnnotation(pdfviewer, pdfViewerBase) {
        /**
         * @private
         */
        this.measureShapeCount = 0;
        /**
         * @private
         */
        this.isAddAnnotationProgramatically = false;
        this.pdfViewer = pdfviewer;
        this.pdfViewerBase = pdfViewerBase;
    }
    Object.defineProperty(MeasureAnnotation.prototype, "pixelToPointFactor", {
        /**
         * @private
         * @returns {number} - number
         */
        get: function () {
            return (72 / 96);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {any} shapeAnnotations - It describes about the shape annotations
     * @param {number} pageNumber - It describes about the page number
     * @param {boolean} isImportAction - It describes about whether the isImportAction is true or not
     * @param {boolean} isAnnotOrderAction - It describes about whether the isAnnotOrderAction is true or not
     * @private
     * @returns {void}
     */
    MeasureAnnotation.prototype.renderMeasureShapeAnnotations = function (shapeAnnotations, pageNumber, isImportAction, isAnnotOrderAction) {
        if (shapeAnnotations) {
            if (shapeAnnotations.length >= 1) {
                var measureAnnots = this.pdfViewer.annotation.getStoredAnnotations(pageNumber, shapeAnnotations, '_annotations_shape_measure');
                if (!measureAnnots || isImportAction || isAnnotOrderAction) {
                    for (var i = 0; i < shapeAnnotations.length; i++) {
                        var annotation = shapeAnnotations[parseInt(i.toString(), 10)];
                        var annotationObject = null;
                        this.measureShapeCount = this.measureShapeCount + 1;
                        annotation.annotationAddMode = this.pdfViewer.annotationModule.
                            findAnnotationMode(annotation, pageNumber, annotation.AnnotType);
                        var isAnnotationRotated = void 0;
                        if (annotation.ShapeAnnotationType) {
                            if (isImportAction) {
                                if (this.pdfViewerBase.isJsonImported) {
                                    annotation.Bounds = this.pdfViewerBase.
                                        importJsonForRotatedDocuments(annotation.Rotate, pageNumber, annotation.Bounds, annotation.AnnotationRotation);
                                    isAnnotationRotated = this.pdfViewerBase.isPageRotated;
                                }
                            }
                            var vertexPoints = null;
                            if (annotation.VertexPoints) {
                                vertexPoints = [];
                                if (isImportAction && this.pdfViewerBase.isJsonImported) {
                                    vertexPoints = this.pdfViewerBase.
                                        calculateVertexPoints(annotation.Rotate, pageNumber, annotation.VertexPoints, annotation.AnnotationRotation);
                                }
                                else {
                                    for (var j = 0; j < annotation.VertexPoints.length; j++) {
                                        var x = annotation.VertexPoints[parseInt(j.toString(), 10)].X ?
                                            annotation.VertexPoints[parseInt(j.toString(), 10)].X :
                                            annotation.VertexPoints[parseInt(j.toString(), 10)].x;
                                        var y = annotation.VertexPoints[parseInt(j.toString(), 10)].Y ?
                                            annotation.VertexPoints[parseInt(j.toString(), 10)].Y :
                                            annotation.VertexPoints[parseInt(j.toString(), 10)].y;
                                        var point = { x: x, y: y };
                                        vertexPoints.push(point);
                                    }
                                }
                            }
                            if (annotation.Bounds && annotation.EnableShapeLabel === true) {
                                annotation.LabelBounds = this.pdfViewer.annotationModule.
                                    inputElementModule.calculateLabelBoundsFromLoadedDocument(annotation.Bounds);
                                annotation.LabelBorderColor = annotation.LabelBorderColor ?
                                    annotation.LabelBorderColor : annotation.StrokeColor;
                                annotation.FontColor = annotation.FontColor ? annotation.FontColor : annotation.StrokeColor;
                                annotation.LabelFillColor = annotation.LabelFillColor ? annotation.LabelFillColor : annotation.FillColor;
                                annotation.FontSize = annotation.FontSize ? annotation.FontSize : 16;
                                annotation.LabelSettings = annotation.LabelSettings ? annotation.LabelSettings :
                                    this.pdfViewer.shapeLabelSettings;
                            }
                            annotation.AnnotationSettings = annotation.AnnotationSettings ? annotation.AnnotationSettings :
                                this.pdfViewer.annotationModule.updateAnnotationSettings(annotation);
                            if (annotation.IsLocked) {
                                annotation.AnnotationSettings.isLock = annotation.IsLocked;
                            }
                            annotation.allowedInteractions = annotation.AllowedInteractions ? annotation.AllowedInteractions :
                                this.pdfViewer.annotationModule.updateAnnotationAllowedInteractions(annotation);
                            var isPrint = annotation.IsPrint;
                            var measureObject = {
                                ratio: annotation.Calibrate.Ratio, x: this.getNumberFormatArray(annotation.Calibrate.X),
                                distance: this.getNumberFormatArray(annotation.Calibrate.Distance),
                                area: this.getNumberFormatArray(annotation.Calibrate.Area),
                                angle: this.getNumberFormatArray(annotation.Calibrate.Angle),
                                volume: this.getNumberFormatArray(annotation.Calibrate.Volume),
                                targetUnitConversion: annotation.Calibrate.TargetUnitConversion
                            };
                            if (annotation.Calibrate.Depth) {
                                measureObject.depth = annotation.Calibrate.Depth;
                            }
                            var left = annotation.Bounds.X ? annotation.Bounds.X : annotation.Bounds.x;
                            var top_1 = annotation.Bounds.Y ? annotation.Bounds.Y : annotation.Bounds.y;
                            var width = annotation.Bounds.Width ? annotation.Bounds.Width : annotation.Bounds.width;
                            var height = annotation.Bounds.Height ? annotation.Bounds.Height : annotation.Bounds.height;
                            annotationObject = {
                                id: 'measure' + this.measureShapeCount, shapeAnnotationType: annotation.ShapeAnnotationType, author: annotation.Author, allowedInteractions: annotation.allowedInteractions, modifiedDate: annotation.ModifiedDate, subject: annotation.Subject,
                                note: annotation.Note, strokeColor: annotation.StrokeColor, fillColor: annotation.FillColor,
                                opacity: annotation.Opacity, thickness: annotation.Thickness,
                                rectangleDifference: annotation.RectangleDifference,
                                borderStyle: annotation.BorderStyle, borderDashArray: annotation.BorderDashArray,
                                rotateAngle: annotation.RotateAngle, isCloudShape: annotation.IsCloudShape,
                                cloudIntensity: annotation.CloudIntensity, vertexPoints: vertexPoints,
                                lineHeadStart: annotation.LineHeadStart, lineHeadEnd: annotation.LineHeadEnd,
                                isLocked: annotation.IsLocked,
                                bounds: { left: left, top: top_1, width: width, height: height, right: annotation.Bounds.Right,
                                    bottom: annotation.Bounds.Bottom },
                                caption: annotation.Caption, captionPosition: annotation.CaptionPosition, calibrate: measureObject,
                                leaderLength: annotation.LeaderLength, leaderLineExtension: annotation.LeaderLineExtension,
                                leaderLineOffset: annotation.LeaderLineOffset, indent: annotation.Indent,
                                annotName: annotation.AnnotName, comments: this.pdfViewer.annotationModule.
                                    getAnnotationComments(annotation.Comments, annotation, annotation.Author),
                                review: { state: annotation.State, stateModel: annotation.StateModel,
                                    modifiedDate: annotation.ModifiedDate, author: annotation.Author },
                                labelContent: annotation.LabelContent, enableShapeLabel: annotation.EnableShapeLabel,
                                labelFillColor: annotation.LabelFillColor,
                                fontColor: annotation.FontColor, labelBorderColor: annotation.LabelBorderColor,
                                fontSize: annotation.FontSize,
                                labelBounds: annotation.LabelBounds, annotationSelectorSettings: this.getSettings(annotation),
                                labelSettings: annotation.LabelSettings, annotationSettings: annotation.AnnotationSettings,
                                customData: this.pdfViewer.annotation.getCustomData(annotation),
                                isPrint: annotation.IsPrint, isCommentLock: annotation.IsCommentLock,
                                isAnnotationRotated: isAnnotationRotated
                            };
                            var vPoints = annotationObject.vertexPoints;
                            if (vertexPoints == null) {
                                vPoints = [];
                            }
                            var annotationSelectorSettings = typeof (annotation.AnnotationSelectorSettings) === 'string' ? JSON.parse(annotation.AnnotationSelectorSettings) : annotation.AnnotationSelectorSettings;
                            if (isNullOrUndefined(annotation.AnnotationSelectorSettings)) {
                                this.pdfViewerBase.annotationSelectorSettingLoad(annotation);
                            }
                            else {
                                annotation.AnnotationSelectorSettings = annotationSelectorSettings;
                            }
                            annotation.allowedInteractions = annotation.AllowedInteractions ?
                                annotation.AllowedInteractions : this.pdfViewer.annotationModule.
                                updateAnnotationAllowedInteractions(annotation);
                            var annot = {
                                id: 'measure' + this.measureShapeCount, shapeAnnotationType: this.getShapeType(annotationObject), author: annotationObject.author, allowedInteractions: annotation.allowedInteractions, modifiedDate: annotationObject.modifiedDate,
                                subject: annotationObject.subject, notes: annotationObject.note, fillColor: annotationObject.fillColor,
                                strokeColor: annotationObject.strokeColor, opacity: annotationObject.opacity,
                                thickness: annotationObject.thickness, borderStyle: annotationObject.borderStyle, borderDashArray: annotationObject.borderDashArray.toString(), rotateAngle: parseFloat(annotationObject.rotateAngle.split('Angle')[1]),
                                isCloudShape: annotationObject.isCloudShape, cloudIntensity: annotationObject.cloudIntensity,
                                taregetDecoraterShapes: this.pdfViewer.annotation.getArrowType(annotationObject.lineHeadEnd),
                                sourceDecoraterShapes: this.pdfViewer.annotation.getArrowType(annotationObject.lineHeadStart),
                                vertexPoints: vPoints, bounds: { x: annotationObject.bounds.left, y: annotationObject.bounds.top,
                                    width: annotationObject.bounds.width, height: annotationObject.bounds.height },
                                leaderHeight: annotationObject.leaderLength, pageIndex: pageNumber,
                                annotName: annotationObject.annotName, comments: annotationObject.comments,
                                review: annotationObject.review,
                                measureType: this.getMeasureType(annotationObject),
                                labelContent: annotation.LabelContent, enableShapeLabel: annotation.EnableShapeLabel,
                                labelFillColor: annotation.LabelFillColor,
                                fontColor: annotation.FontColor, labelBorderColor: annotation.LabelBorderColor,
                                fontSize: annotation.FontSize,
                                labelBounds: annotation.LabelBounds, annotationSelectorSettings: annotation.AnnotationSelectorSettings,
                                annotationSettings: annotationObject.annotationSettings, annotationAddMode: annotation.annotationAddMode,
                                isPrint: isPrint, isCommentLock: annotationObject.isCommentLock, customData: annotationObject.customData
                            };
                            this.pdfViewer.annotation.storeAnnotations(pageNumber, annotationObject, '_annotations_shape_measure');
                            this.pdfViewer.add(annot);
                            if (this.isAddAnnotationProgramatically) {
                                var settings = {
                                    opacity: annot.opacity, strokeColor: annot.strokeColor, thickness: annot.thickness,
                                    modifiedDate: annot.modifiedDate,
                                    width: annot.bounds.width, height: annot.bounds.height
                                };
                                this.pdfViewer.fireAnnotationAdd(annot.pageIndex, annot.annotName, annotation.ShapeAnnotationType, annot.bounds, settings);
                            }
                        }
                    }
                }
            }
            else if (shapeAnnotations.shapeAnnotationType) {
                var annotationObject = this.createAnnotationObject(shapeAnnotations);
                this.pdfViewer.annotationModule.isFormFieldShape = false;
                this.pdfViewer.annotationModule.storeAnnotations(pageNumber, annotationObject, '_annotations_shape_measure');
                if (shapeAnnotations) {
                    shapeAnnotations.customData = annotationObject.customData;
                }
                this.pdfViewer.annotationModule.triggerAnnotationAdd(shapeAnnotations);
            }
        }
    };
    /**
     * @param {any} annotation - It describes about the annotation
     * @private
     * @returns {any} - any
     */
    MeasureAnnotation.prototype.getSettings = function (annotation) {
        var selector = this.pdfViewer.annotationSelectorSettings;
        if (annotation.AnnotationSelectorSettings) {
            selector = typeof (annotation.AnnotationSelectorSettings) === 'string' ? JSON.parse(annotation.AnnotationSelectorSettings) : annotation.AnnotationSelectorSettings;
        }
        else {
            selector = this.getSelector(annotation.Subject);
        }
        return selector;
    };
    /**
     * @param {AnnotType} type - It describes about the annotation type
     * @private
     * @returns {void}
     */
    MeasureAnnotation.prototype.setAnnotationType = function (type) {
        var author = 'Guest';
        var subject = '';
        var customData;
        this.updateMeasureproperties();
        this.pdfViewerBase.disableTextSelectionMode();
        switch (type) {
            case 'Distance': {
                this.currentAnnotationMode = 'Distance';
                var modifiedDateDist = this.pdfViewer.annotation.stickyNotesAnnotationModule.getDateAndTime();
                author = (this.pdfViewer.annotationSettings.author !== 'Guest') ? this.pdfViewer.annotationSettings.author : this.pdfViewer.distanceSettings.author ? this.pdfViewer.distanceSettings.author : 'Guest';
                subject = (this.pdfViewer.annotationSettings.subject !== '' && !isNullOrUndefined(this.pdfViewer.annotationSettings.subject)) ? this.pdfViewer.annotationSettings.subject : this.pdfViewer.distanceSettings.subject ? this.pdfViewer.distanceSettings.subject : 'Distance calculation';
                customData = !isNullOrUndefined(this.pdfViewer.annotationSettings.customData) ?
                    this.pdfViewer.annotationSettings.customData : this.pdfViewer.distanceSettings.customData ?
                    this.pdfViewer.distanceSettings.customData : null;
                this.pdfViewer.drawingObject = {
                    sourceDecoraterShapes: this.pdfViewer.annotation.getArrowType(this.distanceStartHead),
                    taregetDecoraterShapes: this.pdfViewer.annotation.getArrowType(this.distanceEndHead), measureType: 'Distance',
                    fillColor: this.distanceFillColor, notes: '', strokeColor: this.distanceStrokeColor, leaderHeight: this.leaderLength,
                    opacity: this.distanceOpacity, thickness: this.distanceThickness, borderDashArray: this.distanceDashArray.toString(),
                    shapeAnnotationType: 'Distance', author: author, subject: subject, isCommentLock: false, customData: customData
                };
                this.pdfViewer.tool = 'Distance';
                break;
            }
            case 'Perimeter': {
                this.currentAnnotationMode = 'Perimeter';
                var modifiedDatePeri = this.pdfViewer.annotation.stickyNotesAnnotationModule.getDateAndTime();
                author = (this.pdfViewer.annotationSettings.author !== 'Guest') ? this.pdfViewer.annotationSettings.author : this.pdfViewer.perimeterSettings.author ? this.pdfViewer.perimeterSettings.author : 'Guest';
                subject = (this.pdfViewer.annotationSettings.subject !== '' && !isNullOrUndefined(this.pdfViewer.annotationSettings.subject)) ? this.pdfViewer.annotationSettings.subject : this.pdfViewer.perimeterSettings.subject ? this.pdfViewer.perimeterSettings.subject : 'Perimeter calculation';
                this.pdfViewer.drawingObject = {
                    shapeAnnotationType: 'LineWidthArrowHead', fillColor: this.perimeterFillColor, notes: '', strokeColor: this.perimeterStrokeColor, opacity: this.perimeterOpacity,
                    thickness: this.perimeterThickness, sourceDecoraterShapes: this.pdfViewer.annotation.getArrowType(this.perimeterStartHead),
                    taregetDecoraterShapes: this.pdfViewer.annotation.getArrowType(this.perimeterEndHead), measureType: 'Perimeter', borderDashArray: this.perimeterDashArray.toString(),
                    author: author, subject: subject, isCommentLock: false, customData: customData
                };
                this.pdfViewer.tool = 'Perimeter';
                break;
            }
            case 'Area': {
                this.currentAnnotationMode = 'Area';
                var modifiedDateArea = this.pdfViewer.annotation.stickyNotesAnnotationModule.getDateAndTime();
                author = (this.pdfViewer.annotationSettings.author !== 'Guest') ? this.pdfViewer.annotationSettings.author : this.pdfViewer.areaSettings.author ? this.pdfViewer.areaSettings.author : 'Guest';
                subject = (this.pdfViewer.annotationSettings.subject !== '' && !isNullOrUndefined(this.pdfViewer.annotationSettings.subject)) ? this.pdfViewer.annotationSettings.subject : this.pdfViewer.areaSettings.subject ? this.pdfViewer.areaSettings.subject : 'Area calculation';
                this.pdfViewer.drawingObject = {
                    shapeAnnotationType: 'Polygon', fillColor: this.areaFillColor, notes: '', strokeColor: this.areaStrokeColor,
                    thickness: this.areaThickness, opacity: this.areaOpacity, measureType: 'Area',
                    modifiedDate: modifiedDateArea, borderStyle: '', borderDashArray: '0',
                    author: author, subject: subject, isCommentLock: false, customData: customData
                };
                this.pdfViewer.tool = 'Polygon';
                break;
            }
            case 'Radius': {
                this.currentAnnotationMode = 'Radius';
                var modifiedDateRad = this.pdfViewer.annotation.stickyNotesAnnotationModule.getDateAndTime();
                author = (this.pdfViewer.annotationSettings.author !== 'Guest') ? this.pdfViewer.annotationSettings.author : this.pdfViewer.radiusSettings.author ? this.pdfViewer.radiusSettings.author : 'Guest';
                subject = (this.pdfViewer.annotationSettings.subject !== '' && !isNullOrUndefined(this.pdfViewer.annotationSettings.subject)) ? this.pdfViewer.annotationSettings.subject : this.pdfViewer.radiusSettings.subject ? this.pdfViewer.radiusSettings.subject : 'Radius calculation';
                customData = !isNullOrUndefined(this.pdfViewer.annotationSettings.customData) ?
                    this.pdfViewer.annotationSettings.customData : this.pdfViewer.radiusSettings.customData ?
                    this.pdfViewer.radiusSettings.customData : null;
                this.pdfViewer.drawingObject = {
                    shapeAnnotationType: 'Radius', fillColor: this.radiusFillColor, notes: '', strokeColor: this.radiusStrokeColor, opacity: this.radiusOpacity,
                    thickness: this.radiusThickness, measureType: 'Radius', modifiedDate: modifiedDateRad, borderStyle: '', borderDashArray: '0',
                    author: author, subject: subject, isCommentLock: false, customData: customData
                };
                this.pdfViewer.tool = 'DrawTool';
                break;
            }
            case 'Volume': {
                this.currentAnnotationMode = 'Volume';
                var modifiedDateVol = this.pdfViewer.annotation.stickyNotesAnnotationModule.getDateAndTime();
                author = (this.pdfViewer.annotationSettings.author !== 'Guest') ? this.pdfViewer.annotationSettings.author : this.pdfViewer.volumeSettings.author ? this.pdfViewer.volumeSettings.author : 'Guest';
                subject = (this.pdfViewer.annotationSettings.subject !== '' && !isNullOrUndefined(this.pdfViewer.annotationSettings.subject)) ? this.pdfViewer.annotationSettings.subject : this.pdfViewer.volumeSettings.subject ? this.pdfViewer.volumeSettings.subject : 'Volume calculation';
                this.pdfViewer.drawingObject = {
                    shapeAnnotationType: 'Polygon', notes: '', fillColor: this.volumeFillColor, strokeColor: this.volumeStrokeColor,
                    opacity: this.volumeOpacity, thickness: this.volumeThickness, measureType: 'Volume',
                    modifiedDate: modifiedDateVol, borderStyle: '', borderDashArray: '0',
                    author: author, subject: subject, isCommentLock: false, customData: customData
                };
                this.pdfViewer.tool = 'Polygon';
                break;
            }
        }
    };
    MeasureAnnotation.prototype.updateMeasureproperties = function () {
        this.distanceFillColor = this.pdfViewer.distanceSettings.fillColor ? this.pdfViewer.distanceSettings.fillColor : '#ff0000';
        this.distanceStrokeColor = this.pdfViewer.distanceSettings.strokeColor ? this.pdfViewer.distanceSettings.strokeColor : '#ff0000';
        this.distanceOpacity = this.pdfViewer.distanceSettings.opacity ? this.pdfViewer.distanceSettings.opacity : 1;
        this.distanceThickness = this.pdfViewer.distanceSettings.thickness ? this.pdfViewer.distanceSettings.thickness : 1;
        this.distanceDashArray = this.pdfViewer.distanceSettings.borderDashArray ? this.pdfViewer.distanceSettings.borderDashArray : 0;
        this.leaderLength = this.pdfViewer.distanceSettings.leaderLength != null ? this.pdfViewer.distanceSettings.leaderLength : 40;
        this.distanceStartHead = this.pdfViewer.distanceSettings.lineHeadStartStyle ? this.pdfViewer.distanceSettings.lineHeadStartStyle : 'Closed';
        this.distanceEndHead = this.pdfViewer.distanceSettings.lineHeadEndStyle ? this.pdfViewer.distanceSettings.lineHeadEndStyle : 'Closed';
        this.perimeterFillColor = this.pdfViewer.perimeterSettings.fillColor ? this.pdfViewer.perimeterSettings.fillColor : '#ffffff00';
        this.perimeterStrokeColor = this.pdfViewer.perimeterSettings.strokeColor ? this.pdfViewer.perimeterSettings.strokeColor : '#ff0000';
        this.perimeterOpacity = this.pdfViewer.perimeterSettings.opacity ? this.pdfViewer.perimeterSettings.opacity : 1;
        this.perimeterThickness = this.pdfViewer.perimeterSettings.thickness ? this.pdfViewer.perimeterSettings.thickness : 1;
        this.perimeterDashArray = this.pdfViewer.perimeterSettings.borderDashArray ? this.pdfViewer.perimeterSettings.borderDashArray : 0;
        this.perimeterStartHead = this.pdfViewer.perimeterSettings.lineHeadStartStyle ? this.pdfViewer.perimeterSettings.lineHeadStartStyle : 'Open';
        this.perimeterEndHead = this.pdfViewer.perimeterSettings.lineHeadEndStyle ? this.pdfViewer.perimeterSettings.lineHeadEndStyle : 'Open';
        this.areaFillColor = this.pdfViewer.areaSettings.fillColor ? this.pdfViewer.areaSettings.fillColor : '#ffffff00';
        this.areaStrokeColor = this.pdfViewer.areaSettings.strokeColor ? this.pdfViewer.areaSettings.strokeColor : '#ff0000';
        this.areaOpacity = this.pdfViewer.areaSettings.opacity ? this.pdfViewer.areaSettings.opacity : 1;
        this.areaThickness = this.pdfViewer.areaSettings.thickness ? this.pdfViewer.areaSettings.thickness : 1;
        this.radiusFillColor = this.pdfViewer.radiusSettings.fillColor ? this.pdfViewer.radiusSettings.fillColor : '#ffffff00';
        this.radiusStrokeColor = this.pdfViewer.radiusSettings.strokeColor ? this.pdfViewer.radiusSettings.strokeColor : '#ff0000';
        this.radiusOpacity = this.pdfViewer.radiusSettings.opacity ? this.pdfViewer.radiusSettings.opacity : 1;
        this.radiusThickness = this.pdfViewer.radiusSettings.thickness ? this.pdfViewer.radiusSettings.thickness : 1;
        this.volumeFillColor = this.pdfViewer.volumeSettings.fillColor ? this.pdfViewer.volumeSettings.fillColor : '#ffffff00';
        this.volumeStrokeColor = this.pdfViewer.volumeSettings.strokeColor ? this.pdfViewer.volumeSettings.strokeColor : '#ff0000';
        this.volumeOpacity = this.pdfViewer.volumeSettings.opacity ? this.pdfViewer.volumeSettings.opacity : 1;
        this.volumeThickness = this.pdfViewer.volumeSettings.thickness ? this.pdfViewer.volumeSettings.thickness : 1;
        this.unit = this.pdfViewer.measurementSettings.conversionUnit.toLowerCase();
        this.displayUnit = this.pdfViewer.measurementSettings.displayUnit.toLowerCase();
        if (isNullOrUndefined(this.ratio) || this.ratio !== this.pdfViewer.measurementSettings.scaleRatio) {
            this.ratio = this.pdfViewer.measurementSettings.scaleRatio;
        }
        this.volumeDepth = this.pdfViewer.measurementSettings.depth;
        this.scaleRatioString = '1 ' + this.unit + ' = ' + this.ratio.toString() + ' ' + this.displayUnit;
    };
    MeasureAnnotation.prototype.createAnnotationObject = function (annotationModel) {
        var bound;
        var labelBound;
        var annotationName = this.pdfViewer.annotation.createGUID();
        var commentsDivid = this.pdfViewer.annotation.stickyNotesAnnotationModule.addComments('shape_measure', (annotationModel.pageIndex + 1), annotationModel.measureType);
        if (commentsDivid) {
            document.getElementById(commentsDivid).id = annotationName;
        }
        annotationModel.annotName = annotationName;
        // eslint-disable-next-line
        annotationModel.author = annotationModel && annotationModel.author != 'Guest' ? annotationModel.author : this.pdfViewer.annotationModule.updateAnnotationAuthor('measure', annotationModel.subject);
        this.pdfViewer.annotation.stickyNotesAnnotationModule.addTextToComments(annotationName, annotationModel.notes);
        if (annotationModel.wrapper.bounds) {
            bound = {
                left: annotationModel.wrapper.bounds.x, top: annotationModel.wrapper.bounds.y,
                height: annotationModel.wrapper.bounds.height, width: annotationModel.wrapper.bounds.width,
                right: annotationModel.wrapper.bounds.right, bottom: annotationModel.wrapper.bounds.bottom
            };
            labelBound = this.pdfViewer.annotationModule.inputElementModule.calculateLabelBounds(annotationModel.wrapper.bounds);
        }
        else {
            bound = { left: 0, top: 0, height: 0, width: 0, right: 0, bottom: 0 };
            labelBound = { left: 0, top: 0, height: 0, width: 0, right: 0, bottom: 0 };
        }
        var borderDashArray = parseInt(annotationModel.borderDashArray, 10);
        borderDashArray = isNaN(borderDashArray) ? 0 : borderDashArray;
        var measure = { ratio: this.scaleRatioString, x: [this.createNumberFormat('x')], distance: [this.createNumberFormat('d')], area: [this.createNumberFormat('a')] };
        if (annotationModel.measureType === 'Volume') {
            measure.depth = this.volumeDepth;
        }
        var annotationSettings = this.pdfViewer.annotationModule.findAnnotationSettings(annotationModel, true);
        var allowedInteractions = this.pdfViewer.annotationModule.updateAnnotationAllowedInteractions(annotationModel);
        annotationModel.isPrint = annotationSettings.isPrint;
        var setting = this.pdfViewer.shapeLabelSettings;
        var labelSettings = { borderColor: annotationModel.strokeColor, fillColor: annotationModel.fillColor,
            fontColor: annotationModel.fontColor, fontSize: annotationModel.fontSize, labelContent: annotationModel.labelContent,
            labelHeight: setting.labelHeight, labelWidth: setting.labelMaxWidth, opacity: annotationModel.opacity
        };
        return {
            id: annotationModel.id, shapeAnnotationType: this.getShapeAnnotType(annotationModel.measureType),
            author: annotationModel.author, allowedInteractions: allowedInteractions,
            subject: annotationModel.subject, note: annotationModel.notes, strokeColor: annotationModel.strokeColor,
            fillColor: annotationModel.fillColor, opacity: annotationModel.opacity, thickness: annotationModel.thickness,
            borderStyle: annotationModel.borderStyle, borderDashArray: borderDashArray, bounds: bound,
            modifiedDate: this.pdfViewer.annotation.stickyNotesAnnotationModule.getDateAndTime(),
            rotateAngle: 'RotateAngle' + annotationModel.rotateAngle, isCloudShape: annotationModel.isCloudShape, cloudIntensity: annotationModel.cloudIntensity,
            vertexPoints: annotationModel.vertexPoints, lineHeadStart: this.pdfViewer.annotation.
                getArrowTypeForCollection(annotationModel.sourceDecoraterShapes),
            lineHeadEnd: this.pdfViewer.annotation.getArrowTypeForCollection(annotationModel.taregetDecoraterShapes),
            rectangleDifference: [], isLocked: annotationSettings.isLock,
            leaderLength: annotationModel.leaderHeight, leaderLineExtension: 2, leaderLineOffset: 0, calibrate: measure, caption: true, captionPosition: 'Top',
            indent: this.getIndent(annotationModel.measureType), annotName: annotationName, comments: [], review: { state: '', stateModel: '', modifiedDate: this.pdfViewer.annotation.stickyNotesAnnotationModule.getDateAndTime(), author: annotationModel.author },
            labelContent: annotationModel.labelContent, enableShapeLabel: annotationModel.enableShapeLabel,
            labelFillColor: annotationModel.labelFillColor,
            labelBorderColor: annotationModel.labelBorderColor, fontColor: annotationModel.fontColor, fontSize: annotationModel.fontSize,
            labelBounds: labelBound, annotationSelectorSettings: this.getSelector(annotationModel.subject),
            labelSettings: labelSettings, annotationSettings: annotationSettings,
            customData: this.pdfViewer.annotation.getMeasureData(annotationModel.subject), isPrint: annotationModel.isPrint,
            isCommentLock: annotationModel.isCommentLock, isAnnotationRotated: false
        };
    };
    MeasureAnnotation.prototype.getSelector = function (type) {
        var selector = this.pdfViewer.annotationSelectorSettings;
        if ((type === 'Distance calculation') && this.pdfViewer.distanceSettings.annotationSelectorSettings) {
            selector = this.pdfViewer.distanceSettings.annotationSelectorSettings;
        }
        else if ((type === 'Perimeter calculation') && this.pdfViewer.perimeterSettings.annotationSelectorSettings) {
            selector = this.pdfViewer.perimeterSettings.annotationSelectorSettings;
        }
        else if ((type === 'Area calculation') && this.pdfViewer.areaSettings.annotationSelectorSettings) {
            selector = this.pdfViewer.areaSettings.annotationSelectorSettings;
        }
        else if ((type === 'Radius calculation') && this.pdfViewer.radiusSettings.annotationSelectorSettings) {
            selector = this.pdfViewer.radiusSettings.annotationSelectorSettings;
        }
        else if ((type === 'Volume calculation') && this.pdfViewer.volumeSettings.annotationSelectorSettings) {
            selector = this.pdfViewer.volumeSettings.annotationSelectorSettings;
        }
        return selector;
    };
    MeasureAnnotation.prototype.getShapeAnnotType = function (measureType) {
        var annotationType;
        switch (measureType) {
            case 'Distance':
                annotationType = 'Line';
                break;
            case 'Perimeter':
                annotationType = 'Polyline';
                break;
            case 'Area':
            case 'Volume':
                annotationType = 'Polygon';
                break;
            case 'Radius':
                annotationType = 'Circle';
                break;
        }
        return annotationType;
    };
    MeasureAnnotation.prototype.getShapeType = function (shape) {
        var shapeType;
        if (shape.shapeAnnotationType === 'Line') {
            shapeType = 'Distance';
        }
        else if (shape.shapeAnnotationType === 'Polyline') {
            shapeType = 'LineWidthArrowHead';
        }
        else if (shape.shapeAnnotationType === 'Polygon' && shape.indent === 'PolygonDimension') {
            shapeType = 'Polygon';
        }
        else if ((shape.shapeAnnotationType === 'Polygon' && shape.indent === 'PolygonRadius') || shape.shapeAnnotationType === 'Circle') {
            shapeType = 'Radius';
        }
        else if (shape.shapeAnnotationType === 'Polygon' && shape.indent === 'PolygonVolume') {
            shapeType = 'Polygon';
        }
        return shapeType;
    };
    MeasureAnnotation.prototype.getMeasureType = function (shape) {
        var measureType;
        if (shape.shapeAnnotationType === 'Line') {
            measureType = 'Distance';
        }
        else if (shape.shapeAnnotationType === 'Polyline') {
            measureType = 'Perimeter';
        }
        else if (shape.shapeAnnotationType === 'Polygon' && shape.indent === 'PolygonDimension') {
            measureType = 'Area';
        }
        else if ((shape.shapeAnnotationType === 'Polygon' && shape.indent === 'PolygonRadius') || shape.shapeAnnotationType === 'Circle') {
            measureType = 'Radius';
        }
        else if (shape.shapeAnnotationType === 'Polygon' && shape.indent === 'PolygonVolume') {
            measureType = 'Volume';
        }
        return measureType;
    };
    MeasureAnnotation.prototype.getIndent = function (measureType) {
        var indent;
        switch (measureType) {
            case 'Distance':
                indent = 'LineDimension';
                break;
            case 'Perimeter':
                indent = 'PolyLineDimension';
                break;
            case 'Area':
                indent = 'PolygonDimension';
                break;
            case 'Radius':
                indent = 'PolygonRadius';
                break;
            case 'Volume':
                indent = 'PolygonVolume';
                break;
        }
        return indent;
    };
    MeasureAnnotation.prototype.getNumberFormatArray = function (list) {
        var numberFormatArray = [];
        if (list) {
            for (var i = 0; i < list.length; i++) {
                numberFormatArray[parseInt(i.toString(), 10)] = { unit: list[parseInt(i.toString(), 10)].Unit,
                    fractionalType: list[parseInt(i.toString(), 10)].FractionalType,
                    conversionFactor: list[parseInt(i.toString(), 10)].ConversionFactor,
                    denominator: list[parseInt(i.toString(), 10)].Denominator,
                    formatDenominator: list[parseInt(i.toString(), 10)].FormatDenominator };
            }
        }
        return numberFormatArray;
    };
    MeasureAnnotation.prototype.createNumberFormat = function (type) {
        var cFactor = 1;
        var unit = this.displayUnit;
        if (type === 'x') {
            cFactor = this.getFactor(this.unit);
        }
        if (type === 'a') {
            unit = 'sq ' + this.displayUnit;
        }
        var numberFormat = { unit: unit, fractionalType: 'D', conversionFactor: cFactor, denominator: 100, formatDenominator: false };
        return numberFormat;
    };
    /**
     * @private
     * @returns {string} - string
     */
    MeasureAnnotation.prototype.saveMeasureShapeAnnotations = function () {
        var storeObject = PdfViewerBase.sessionStorageManager.getItem(this.pdfViewerBase.documentId + '_annotations_shape_measure');
        if (this.pdfViewerBase.isStorageExceed) {
            storeObject = this.pdfViewerBase.annotationStorage[this.pdfViewerBase.documentId + '_annotations_shape_measure'];
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
                        if (this.pdfViewerBase.isJsonExported) {
                            if (pageAnnotationObject.annotations[parseInt(z.toString(), 10)].isAnnotationRotated) {
                                pageAnnotationObject.annotations[parseInt(z.toString(), 10)].bounds =
                                    this.pdfViewer.annotation.getBounds(pageAnnotationObject.
                                        annotations[parseInt(z.toString(), 10)].bounds, pageAnnotationObject.pageIndex);
                                pageAnnotationObject.annotations[parseInt(z.toString(), 10)].vertexPoints =
                                    this.pdfViewer.annotation.getVertexPoints(pageAnnotationObject.
                                        annotations[parseInt(z.toString(), 10)].vertexPoints, pageAnnotationObject.pageIndex);
                            }
                            else {
                                var pageDetails = this.pdfViewerBase.pageSize[pageAnnotationObject.pageIndex];
                                if (pageDetails) {
                                    pageAnnotationObject.annotations[parseInt(z.toString(), 10)].annotationRotation = pageDetails.rotation;
                                }
                            }
                        }
                        pageAnnotationObject.annotations[parseInt(z.toString(), 10)].bounds =
                            JSON.stringify(this.pdfViewer.annotation.
                                getBounds(pageAnnotationObject.annotations[parseInt(z.toString(), 10)].bounds, pageAnnotationObject.pageIndex));
                        var strokeColorString = pageAnnotationObject.annotations[parseInt(z.toString(), 10)].strokeColor;
                        pageAnnotationObject.annotations[parseInt(z.toString(), 10)].strokeColor =
                            JSON.stringify(this.getRgbCode(strokeColorString));
                        var fillColorString = pageAnnotationObject.annotations[parseInt(z.toString(), 10)].fillColor;
                        pageAnnotationObject.annotations[parseInt(z.toString(), 10)].fillColor =
                            JSON.stringify(this.getRgbCode(fillColorString));
                        pageAnnotationObject.annotations[parseInt(z.toString(), 10)].vertexPoints =
                            JSON.stringify(this.pdfViewer.annotation.
                                getVertexPoints(pageAnnotationObject.annotations[parseInt(z.toString(), 10)].vertexPoints, pageAnnotationObject.pageIndex));
                        if (pageAnnotationObject.annotations[parseInt(z.toString(), 10)].rectangleDifference !== null) {
                            pageAnnotationObject.annotations[parseInt(z.toString(), 10)].rectangleDifference =
                                JSON.stringify(pageAnnotationObject.annotations[parseInt(z.toString(), 10)].rectangleDifference);
                        }
                        pageAnnotationObject.annotations[parseInt(z.toString(), 10)].calibrate =
                            this.getStringifiedMeasure(pageAnnotationObject.annotations[parseInt(z.toString(), 10)].calibrate);
                        if (pageAnnotationObject.annotations[parseInt(z.toString(), 10)].enableShapeLabel === true) {
                            pageAnnotationObject.annotations[parseInt(z.toString(), 10)].labelBounds =
                                JSON.stringify(this.pdfViewer.annotationModule.inputElementModule.calculateLabelBounds(JSON.parse(pageAnnotationObject.annotations[parseInt(z.toString(), 10)].bounds), pageAnnotationObject.pageIndex));
                            var labelFillColorString = pageAnnotationObject.annotations[parseInt(z.toString(), 10)].labelFillColor;
                            pageAnnotationObject.annotations[parseInt(z.toString(), 10)].labelFillColor =
                                JSON.stringify(this.getRgbCode(labelFillColorString));
                            var labelBorderColorString = pageAnnotationObject.annotations[parseInt(z.toString(), 10)].labelBorderColor;
                            pageAnnotationObject.annotations[parseInt(z.toString(), 10)].labelBorderColor =
                                JSON.stringify(this.getRgbCode(labelBorderColorString));
                            pageAnnotationObject.annotations[parseInt(z.toString(), 10)].labelSettings.fillColor = labelFillColorString;
                            var fontColorString = pageAnnotationObject.annotations[parseInt(z.toString(), 10)].labelSettings.fontColor;
                            pageAnnotationObject.annotations[parseInt(z.toString(), 10)].fontColor =
                                JSON.stringify(this.getRgbCode(fontColorString));
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
     * @private
     * @returns {void}
     */
    MeasureAnnotation.prototype.createScaleRatioWindow = function () {
        var _this = this;
        if (!isBlazor()) {
            var elementID = this.pdfViewer.element.id;
            var dialogDiv = createElement('div', { id: elementID + '_scale_ratio_window', className: 'e-pv-scale-ratio-window' });
            this.pdfViewerBase.pageContainer.appendChild(dialogDiv);
            var contentElement = this.createRatioUI();
            this.scaleRatioDialog = new Dialog({
                showCloseIcon: true, closeOnEscape: false, isModal: true, header: this.pdfViewer.localeObj.getConstant('Scale Ratio'),
                target: this.pdfViewer.element, content: contentElement, close: function () {
                    _this.sourceTextBox.destroy();
                    _this.convertUnit.destroy();
                    _this.destTextBox.destroy();
                    _this.dispUnit.destroy();
                    _this.scaleRatioDialog.destroy();
                    var dialogElement = _this.pdfViewerBase.getElement('_scale_ratio_window');
                    dialogElement.parentElement.removeChild(dialogElement);
                }
            });
            if (!Browser.isDevice || this.pdfViewer.enableDesktopMode) {
                this.scaleRatioDialog.buttons = [
                    { buttonModel: { content: this.pdfViewer.localeObj.getConstant('OK'), isPrimary: true }, click: this.onOkClicked.bind(this) },
                    { buttonModel: { content: this.pdfViewer.localeObj.getConstant('Cancel') }, click: this.onCancelClicked.bind(this) }
                ];
            }
            else {
                this.scaleRatioDialog.buttons = [
                    { buttonModel: { content: this.pdfViewer.localeObj.getConstant('Cancel') }, click: this.onCancelClicked.bind(this) },
                    { buttonModel: { content: this.pdfViewer.localeObj.getConstant('OK'), isPrimary: true }, click: this.onOkClicked.bind(this) }
                ];
            }
            if (this.pdfViewer.enableRtl) {
                this.scaleRatioDialog.enableRtl = true;
            }
            this.scaleRatioDialog.appendTo(dialogDiv);
            this.convertUnit.content = this.createContent(this.pdfViewer.localeObj.getConstant(this.unit)).outerHTML;
            this.dispUnit.content = this.createContent(this.pdfViewer.localeObj.getConstant(this.displayUnit)).outerHTML;
            this.depthUnit.content = this.createContent(this.pdfViewer.localeObj.getConstant(this.displayUnit)).outerHTML;
        }
        else {
            this.pdfViewer._dotnetInstance.invokeMethodAsync('OpenScaleRatioDialog');
        }
    };
    MeasureAnnotation.prototype.createRatioUI = function () {
        var element = createElement('div');
        var elementID = this.pdfViewer.element.id;
        var items = [{ text: this.pdfViewer.localeObj.getConstant('pt'), label: 'pt' }, { text: this.pdfViewer.localeObj.getConstant('in'), label: 'in' }, { text: this.pdfViewer.localeObj.getConstant('mm'), label: 'mm' }, { text: this.pdfViewer.localeObj.getConstant('cm'), label: 'cm' }, { text: this.pdfViewer.localeObj.getConstant('p'), label: 'p' }, { text: this.pdfViewer.localeObj.getConstant('ft'), label: 'ft' }, { text: this.pdfViewer.localeObj.getConstant('ft_in'), label: 'ft_in' }, { text: this.pdfViewer.localeObj.getConstant('m'), label: 'm' }];
        var labelText = createElement('div', { id: elementID + '_scale_ratio_label', className: 'e-pv-scale-ratio-text' });
        labelText.textContent = this.pdfViewer.localeObj.getConstant('Scale Ratio');
        element.appendChild(labelText);
        var sourceContainer = createElement('div', { id: elementID + '_scale_src_container' });
        element.appendChild(sourceContainer);
        var srcInputElement = this.createInputElement('input', 'e-pv-scale-ratio-src-input', elementID + '_src_input', sourceContainer);
        this.sourceTextBox = new NumericTextBox({ value: this.srcValue ? this.srcValue : 1, format: '##', cssClass: 'e-pv-scale-ratio-src-input', min: 1, max: 100 }, srcInputElement);
        var srcUnitElement = this.createInputElement('button', 'e-pv-scale-ratio-src-unit', elementID + '_src_unit', sourceContainer);
        this.convertUnit = new DropDownButton({ items: items, cssClass: 'e-pv-scale-ratio-src-unit' }, srcUnitElement);
        this.convertUnit.select = this.convertUnitSelect.bind(this);
        var destinationContainer = createElement('div', { id: elementID + '_scale_dest_container' });
        var destInputElement = this.createInputElement('input', 'e-pv-scale-ratio-dest-input', elementID + '_dest_input', destinationContainer);
        this.destTextBox = new NumericTextBox({ value: this.destValue ? this.destValue : 1, format: '##', cssClass: 'e-pv-scale-ratio-dest-input', min: 1, max: 100 }, destInputElement);
        var destUnitElement = this.createInputElement('button', 'e-pv-scale-ratio-dest-unit', elementID + '_dest_unit', destinationContainer);
        this.dispUnit = new DropDownButton({ items: items, cssClass: 'e-pv-scale-ratio-dest-unit' }, destUnitElement);
        this.dispUnit.select = this.dispUnitSelect.bind(this);
        element.appendChild(destinationContainer);
        var depthLabelText = createElement('div', { id: elementID + '_depth_label', className: 'e-pv-depth-text' });
        depthLabelText.textContent = this.pdfViewer.localeObj.getConstant('Depth');
        element.appendChild(depthLabelText);
        var depthContainer = createElement('div', { id: elementID + '_depth_container' });
        element.appendChild(depthContainer);
        var depthInputElement = this.createInputElement('input', 'e-pv-depth-input', elementID + '_depth_input', depthContainer);
        this.depthTextBox = new NumericTextBox({ value: this.volumeDepth, format: '##', cssClass: 'e-pv-depth-input', min: 1 }, depthInputElement);
        var depthUnitElement = this.createInputElement('button', 'e-pv-depth-unit', elementID + '_depth_unit', depthContainer);
        this.depthUnit = new DropDownButton({ items: items, cssClass: 'e-pv-depth-unit' }, depthUnitElement);
        this.depthUnit.select = this.depthUnitSelect.bind(this);
        return element;
    };
    MeasureAnnotation.prototype.convertUnitSelect = function (args) {
        this.convertUnit.content = this.createContent(args.item.text).outerHTML;
    };
    MeasureAnnotation.prototype.dispUnitSelect = function (args) {
        this.dispUnit.content = this.createContent(args.item.text).outerHTML;
        this.depthUnit.content = this.createContent(args.item.text).outerHTML;
    };
    MeasureAnnotation.prototype.depthUnitSelect = function (args) {
        this.depthUnit.content = this.createContent(args.item.text).outerHTML;
    };
    MeasureAnnotation.prototype.createContent = function (text) {
        var divElement = createElement('div', { className: 'e-pv-scale-unit-content' });
        divElement.textContent = text;
        return divElement;
    };
    MeasureAnnotation.prototype.createInputElement = function (input, className, idString, parentElement) {
        var container = createElement('div', { id: idString + '_container', className: className + '-container' });
        var textBoxInput = createElement(input, { id: idString });
        if (input === 'input') {
            textBoxInput.type = 'text';
        }
        container.appendChild(textBoxInput);
        parentElement.appendChild(container);
        return textBoxInput;
    };
    /**
     * @private
     * @returns {void}
     */
    MeasureAnnotation.prototype.onOkClicked = function () {
        if (isBlazor()) {
            var unitElement = document.querySelector('#' + this.pdfViewer.element.id + '_src_unit');
            var displayElement = document.querySelector('#' + this.pdfViewer.element.id + '_dest_unit');
            var sourceTextBox = document.querySelector('#' + this.pdfViewer.element.id + '_ratio_input');
            var destTextBox = document.querySelector('#' + this.pdfViewer.element.id + '_dest_input');
            var depthTextBox = document.querySelector('#' + this.pdfViewer.element.id + '_depth_input');
            if (unitElement && displayElement && sourceTextBox && destTextBox && depthTextBox) {
                this.unit = unitElement.value;
                this.displayUnit = displayElement.value;
                this.ratio = parseInt(destTextBox.value, 10) / parseInt(sourceTextBox.value, 10);
                this.volumeDepth = parseInt(depthTextBox.value, 10);
            }
            this.scaleRatioString = parseInt(sourceTextBox.value, 10) + ' ' + this.unit + ' = ' + parseInt(destTextBox.value, 10) + ' ' + this.displayUnit;
            this.updateMeasureValues(this.scaleRatioString, this.displayUnit, this.unit, this.volumeDepth);
        }
        else {
            this.unit = this.getContent(this.convertUnit.content);
            this.displayUnit = this.getContent(this.dispUnit.content);
            this.ratio = this.destTextBox.value / this.sourceTextBox.value;
            this.volumeDepth = this.depthTextBox.value;
            this.scaleRatioString = this.sourceTextBox.value + ' ' + this.unit + ' = ' + this.destTextBox.value + ' ' + this.displayUnit;
            this.scaleRatioDialog.hide();
            var originalUnit = this.restoreUnit(this.convertUnit);
            var originalDisplayUnit = this.restoreUnit(this.dispUnit);
            this.updateMeasureValues(this.scaleRatioString, originalDisplayUnit, originalUnit, this.volumeDepth);
        }
    };
    MeasureAnnotation.prototype.restoreUnit = function (dropdownObject) {
        var calibUnit;
        for (var i = 0; i < dropdownObject.items.length; i++) {
            var convertUnitItem = dropdownObject.items[parseInt(i.toString(), 10)];
            if (this.unit === convertUnitItem.text) {
                calibUnit = convertUnitItem.label;
            }
        }
        return calibUnit;
    };
    /**
     * @param {string} ratio - It describes about the ratio
     * @param {CalibrationUnit} displayUnit - It describes about the display unit
     * @param {CalibrationUnit} conversionUnit - It describes about the conversion unit
     * @param {number} depth - It describes about the depth
     * @private
     * @returns {void}
     */
    MeasureAnnotation.prototype.updateMeasureValues = function (ratio, displayUnit, conversionUnit, depth) {
        this.scaleRatioString = ratio;
        this.displayUnit = displayUnit;
        this.unit = conversionUnit;
        this.volumeDepth = depth;
        for (var i = 0; i < this.pdfViewerBase.pageCount; i++) {
            var pageAnnotations = this.getAnnotations(i, null);
            if (pageAnnotations) {
                for (var j = 0; j < pageAnnotations.length; j++) {
                    pageAnnotations = this.getAnnotations(i, null);
                    var measureObject = pageAnnotations[parseInt(j.toString(), 10)];
                    if (!measureObject.annotationSettings.isLock) {
                        measureObject.calibrate.ratio = ratio;
                        measureObject.calibrate.x[0].unit = displayUnit;
                        measureObject.calibrate.distance[0].unit = displayUnit;
                        measureObject.calibrate.area[0].unit = displayUnit;
                        measureObject.calibrate.x[0].conversionFactor = this.getFactor(conversionUnit);
                        if (measureObject.indent === 'PolygonVolume') {
                            measureObject.calibrate.depth = depth;
                        }
                        pageAnnotations[parseInt(j.toString(), 10)] = measureObject;
                        this.manageAnnotations(pageAnnotations, i);
                        this.pdfViewer.annotation.updateCalibrateValues(this.getAnnotationBaseModel(measureObject.id));
                    }
                }
            }
            this.pdfViewer.annotation.renderAnnotations(i, null, null, null, null, false);
        }
    };
    MeasureAnnotation.prototype.getAnnotationBaseModel = function (id) {
        var annotationBase = null;
        for (var i = 0; i < this.pdfViewer.annotations.length; i++) {
            if (id === this.pdfViewer.annotations[parseInt(i.toString(), 10)].id) {
                annotationBase = this.pdfViewer.annotations[parseInt(i.toString(), 10)];
                break;
            }
        }
        return annotationBase;
    };
    MeasureAnnotation.prototype.getContent = function (unit) {
        return unit.split('</div>')[0].split('">')[1];
    };
    /**
     * @param value
     * @param currentAnnot
     * @private
     */
    MeasureAnnotation.prototype.setConversion = function (value, currentAnnot) {
        var values;
        if (currentAnnot) {
            var pageIndex = currentAnnot.pageIndex;
            if (currentAnnot.id === 'diagram_helper') {
                pageIndex = currentAnnot.pageIndex ? currentAnnot.pageIndex : this.pdfViewerBase.activeElements.activePageID;
                currentAnnot = this.getCurrentObject(pageIndex, null, currentAnnot.annotName);
            }
            if (currentAnnot) {
                values = this.getCurrentValues(currentAnnot.id, pageIndex);
            }
            else {
                values = this.getCurrentValues();
            }
        }
        else {
            values = this.getCurrentValues();
        }
        var scaledValue = value * values.ratio;
        return this.convertPointToUnits(values.factor, scaledValue, values.unit);
    };
    MeasureAnnotation.prototype.onCancelClicked = function () {
        this.scaleRatioDialog.hide();
    };
    /**
     * @param {string} property - It describes about the property
     * @param {number} pageNumber - It describes about the page number
     * @param {any} annotationBase - It describes about the annotation base
     * @param {boolean} isNewlyAdded - It describes about whether the isNewlyAdded is true or not
     * @private
     * @returns {IMeasureShapeAnnotation} - IMeasureShapeAnnotation
     */
    MeasureAnnotation.prototype.modifyInCollection = function (property, pageNumber, annotationBase, isNewlyAdded) {
        if (!isNullOrUndefined(annotationBase.formFieldAnnotationType) && annotationBase.formFieldAnnotationType !== '') {
            this.pdfViewer.annotationModule.isFormFieldShape = true;
        }
        else {
            this.pdfViewer.annotationModule.isFormFieldShape = false;
        }
        var currentAnnotObject = null;
        var isEdited = false;
        var pageAnnotations = this.getAnnotations(pageNumber, null);
        if (pageAnnotations != null && annotationBase) {
            for (var i = 0; i < pageAnnotations.length; i++) {
                if (annotationBase.id === pageAnnotations[parseInt(i.toString(), 10)].id) {
                    if (property === 'bounds') {
                        this.pdfViewerBase.isBounds =
                            this.pdfViewerBase.boundsCalculation(pageAnnotations[parseInt(i.toString(), 10)].bounds, annotationBase.wrapper.bounds);
                        if (this.pdfViewerBase.isBounds) {
                            this.pdfViewer.annotationModule.stickyNotesAnnotationModule.updateAnnotationModifiedDate(annotationBase, true);
                            if (pageAnnotations[parseInt(i.toString(), 10)].shapeAnnotationType === 'Line' || pageAnnotations[parseInt(i.toString(), 10)].shapeAnnotationType === 'Polyline') {
                                pageAnnotations[parseInt(i.toString(), 10)].vertexPoints = annotationBase.vertexPoints;
                                pageAnnotations[parseInt(i.toString(), 10)].bounds =
                                    {
                                        left: annotationBase.bounds.x, top: annotationBase.bounds.y,
                                        width: annotationBase.bounds.width, height: annotationBase.bounds.height,
                                        right: annotationBase.bounds.right, bottom: annotationBase.bounds.bottom
                                    };
                            }
                            else if (pageAnnotations[parseInt(i.toString(), 10)].shapeAnnotationType === 'Polygon') {
                                pageAnnotations[parseInt(i.toString(), 10)].vertexPoints = annotationBase.vertexPoints;
                                pageAnnotations[parseInt(i.toString(), 10)].bounds =
                                    {
                                        left: annotationBase.bounds.x, top: annotationBase.bounds.y, width: annotationBase.bounds.width,
                                        height: annotationBase.bounds.height, right: annotationBase.bounds.right,
                                        bottom: annotationBase.bounds.bottom
                                    };
                            }
                            else {
                                pageAnnotations[parseInt(i.toString(), 10)].bounds =
                                    {
                                        left: annotationBase.bounds.x, top: annotationBase.bounds.y, width: annotationBase.bounds.width,
                                        height: annotationBase.bounds.height, right: annotationBase.bounds.right,
                                        bottom: annotationBase.bounds.bottom
                                    };
                            }
                        }
                        if (pageAnnotations[parseInt(i.toString(), 10)].enableShapeLabel === true && annotationBase.wrapper) {
                            pageAnnotations[parseInt(i.toString(), 10)].labelBounds =
                                this.pdfViewer.annotationModule.inputElementModule.calculateLabelBounds(annotationBase.wrapper.bounds);
                        }
                    }
                    else if (property === 'fill') {
                        pageAnnotations[parseInt(i.toString(), 10)].fillColor = annotationBase.wrapper.children[0].style.fill;
                        if (this.pdfViewer.enableShapeLabel) {
                            pageAnnotations[parseInt(i.toString(), 10)].labelFillColor = annotationBase.wrapper.children[0].style.fill;
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
                    else if (property === 'dashArray') {
                        pageAnnotations[parseInt(i.toString(), 10)].borderDashArray =
                            annotationBase.wrapper.children[0].style.strokeDashArray;
                        pageAnnotations[parseInt(i.toString(), 10)].borderStyle = annotationBase.borderStyle;
                    }
                    else if (property === 'startArrow') {
                        pageAnnotations[parseInt(i.toString(), 10)].lineHeadStart =
                            this.pdfViewer.annotation.getArrowTypeForCollection(annotationBase.sourceDecoraterShapes);
                    }
                    else if (property === 'endArrow') {
                        pageAnnotations[parseInt(i.toString(), 10)].lineHeadEnd =
                            this.pdfViewer.annotation.getArrowTypeForCollection(annotationBase.taregetDecoraterShapes);
                    }
                    else if (property === 'leaderLength') {
                        pageAnnotations[parseInt(i.toString(), 10)].leaderLength = annotationBase.leaderHeight;
                    }
                    else if (property === 'notes') {
                        pageAnnotations[parseInt(i.toString(), 10)].note = annotationBase.notes;
                        if (pageAnnotations[parseInt(i.toString(), 10)].enableShapeLabel === true) {
                            isEdited = true;
                            pageAnnotations[parseInt(i.toString(), 10)].labelContent = annotationBase.notes;
                        }
                    }
                    else if (property === 'delete') {
                        currentAnnotObject = pageAnnotations.splice(i, 1)[0];
                        break;
                    }
                    else if (property === 'labelContent') {
                        pageAnnotations[parseInt(i.toString(), 10)].note = annotationBase.labelContent;
                        pageAnnotations[parseInt(i.toString(), 10)].labelContent = annotationBase.labelContent;
                        break;
                    }
                    else if (property === 'fontColor') {
                        pageAnnotations[parseInt(i.toString(), 10)].fontColor = annotationBase.fontColor;
                    }
                    else if (property === 'fontSize') {
                        pageAnnotations[parseInt(i.toString(), 10)].fontSize = annotationBase.fontSize;
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
        if (!isNewlyAdded && isEdited) {
            this.pdfViewerBase.updateDocumentEditedProperty(true);
        }
        return currentAnnotObject;
    };
    /**
     * @param {number} pageNumber -It describes about the page number
     * @param {IMeasureShapeAnnotation} annotationBase - It describes about the annotation base
     * @private
     * @returns {void}
     */
    MeasureAnnotation.prototype.addInCollection = function (pageNumber, annotationBase) {
        var pageAnnotations = this.getAnnotations(pageNumber, null);
        if (pageAnnotations) {
            pageAnnotations.push(annotationBase);
        }
        this.manageAnnotations(pageAnnotations, pageNumber);
    };
    MeasureAnnotation.prototype.manageAnnotations = function (pageAnnotations, pageNumber) {
        var storeObject = PdfViewerBase.sessionStorageManager.getItem(this.pdfViewerBase.documentId + '_annotations_shape_measure');
        if (this.pdfViewerBase.isStorageExceed) {
            storeObject = this.pdfViewerBase.annotationStorage[this.pdfViewerBase.documentId + '_annotations_shape_measure'];
        }
        if (storeObject) {
            var annotObject = JSON.parse(storeObject);
            if (!this.pdfViewerBase.isStorageExceed) {
                PdfViewerBase.sessionStorageManager.removeItem(this.pdfViewerBase.documentId + '_annotations_shape_measure');
            }
            var index = this.pdfViewer.annotationModule.getPageCollection(annotObject, pageNumber);
            if (index != null && annotObject[parseInt(index.toString(), 10)]) {
                annotObject[parseInt(index.toString(), 10)].annotations = pageAnnotations;
            }
            var annotationStringified = JSON.stringify(annotObject);
            if (this.pdfViewerBase.isStorageExceed) {
                this.pdfViewerBase.annotationStorage[this.pdfViewerBase.documentId + '_annotations_shape_measure'] = annotationStringified;
            }
            else {
                PdfViewerBase.sessionStorageManager.setItem(this.pdfViewerBase.documentId + '_annotations_shape_measure', annotationStringified);
            }
        }
    };
    MeasureAnnotation.prototype.getAnnotations = function (pageIndex, shapeAnnotations) {
        var annotationCollection;
        var storeObject = PdfViewerBase.sessionStorageManager.getItem(this.pdfViewerBase.documentId + '_annotations_shape_measure');
        if (this.pdfViewerBase.isStorageExceed) {
            storeObject = this.pdfViewerBase.annotationStorage[this.pdfViewerBase.documentId + '_annotations_shape_measure'];
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
    MeasureAnnotation.prototype.getCurrentObject = function (pageNumber, id, annotName) {
        var currentAnnotObject = null;
        var pageAnnotations = this.getAnnotations(pageNumber, null);
        if (pageAnnotations != null) {
            for (var i = 0; i < pageAnnotations.length; i++) {
                if (id) {
                    if (id === pageAnnotations[parseInt(i.toString(), 10)].id) {
                        currentAnnotObject = pageAnnotations[parseInt(i.toString(), 10)];
                        break;
                    }
                }
                else if (annotName) {
                    if (annotName === pageAnnotations[parseInt(i.toString(), 10)].annotName) {
                        currentAnnotObject = pageAnnotations[parseInt(i.toString(), 10)];
                        break;
                    }
                }
            }
        }
        return currentAnnotObject;
    };
    MeasureAnnotation.prototype.getCurrentValues = function (id, pageNumber) {
        var ratio;
        var unit;
        var factor;
        var depth;
        if (id && !isNaN(pageNumber)) {
            var currentAnnotObject = this.getCurrentObject(pageNumber, id);
            if (currentAnnotObject) {
                ratio = this.getCurrentRatio(currentAnnotObject.calibrate.ratio);
                unit = currentAnnotObject.calibrate.x[0].unit;
                factor = currentAnnotObject.calibrate.x[0].conversionFactor;
                depth = currentAnnotObject.calibrate.depth;
            }
            else {
                ratio = this.ratio;
                unit = this.displayUnit;
                factor = this.getFactor(this.unit);
                depth = this.volumeDepth;
            }
        }
        else {
            ratio = this.ratio;
            unit = this.displayUnit;
            factor = this.getFactor(this.unit);
            depth = this.volumeDepth;
        }
        return { ratio: ratio, unit: unit, factor: factor, depth: depth };
    };
    MeasureAnnotation.prototype.getCurrentRatio = function (ratioString) {
        var stringArray = ratioString.split(' ');
        if (stringArray[3] === '=') {
            return parseFloat(stringArray[4]) / parseFloat(stringArray[0]);
        }
        else {
            return parseFloat(stringArray[3]) / parseFloat(stringArray[0]);
        }
    };
    /**
     * @param {PointModel} points - It describes about the points
     * @param {string} id - It describes about the id
     * @param {number} pageNumber - It describes about the page number
     * @private
     * @returns {string} - string
     */
    MeasureAnnotation.prototype.calculateArea = function (points, id, pageNumber) {
        var values = this.getCurrentValues(id, pageNumber);
        var area = this.getArea(points, values.factor, values.unit) * values.ratio;
        if (values.unit === 'ft_in') {
            var calculateValue = Math.round(area * 100) / 100;
            if (calculateValue >= 12) {
                calculateValue = (Math.round(calculateValue / 12 * 100) / 100).toString();
                calculateValue = calculateValue.split('.');
                if (calculateValue[1]) {
                    var inchValue = 0;
                    if (calculateValue[1].charAt(1)) {
                        inchValue = parseInt(calculateValue[1].charAt(0), 10) + '.' + parseInt(calculateValue[1].charAt(1), 10);
                        inchValue = Math.round(inchValue);
                    }
                    else {
                        inchValue = calculateValue[1];
                    }
                    if (!inchValue) {
                        return (calculateValue[0] + ' ' + this.pdfViewer.localeObj.getConstant('sq') + ' ' + this.pdfViewer.localeObj.getConstant('ft'));
                    }
                    else {
                        return (calculateValue[0] + ' ' + this.pdfViewer.localeObj.getConstant('sq') + ' ' + this.pdfViewer.localeObj.getConstant('ft') + ' ' + inchValue + ' ' + this.pdfViewer.localeObj.getConstant('in'));
                    }
                }
                else {
                    return (calculateValue[0] + ' ' + this.pdfViewer.localeObj.getConstant('sq') + ' ' + this.pdfViewer.localeObj.getConstant('ft'));
                }
            }
            else {
                return (Math.round(area * 100) / 100) + ' ' + this.pdfViewer.localeObj.getConstant('sq') + ' ' + this.pdfViewer.localeObj.getConstant('in');
            }
        }
        if (values.unit === 'm') {
            return ((area * 100) / 100) + ' ' + this.pdfViewer.localeObj.getConstant('sq') + ' ' + this.pdfViewer.localeObj.getConstant(values.unit);
        }
        return (Math.round(area * 100) / 100) + ' ' + this.pdfViewer.localeObj.getConstant('sq') + ' ' + this.pdfViewer.localeObj.getConstant(values.unit);
    };
    MeasureAnnotation.prototype.getArea = function (points, factor, unit) {
        var area = 0;
        var j = points.length - 1;
        for (var i = 0; i < points.length; i++) {
            area += (points[parseInt(j.toString(), 10)].x * this.pixelToPointFactor *
                factor + points[parseInt(i.toString(), 10)].x * this.pixelToPointFactor * factor) *
                (points[parseInt(j.toString(), 10)].y * this.pixelToPointFactor * factor - points[parseInt(i.toString(), 10)].y *
                    this.pixelToPointFactor * factor);
            j = i;
        }
        if (unit === 'ft_in') {
            return (Math.abs((area) * 2.0));
        }
        else {
            return (Math.abs((area) / 2.0));
        }
    };
    /**
     * @param {PointModel} points - It describes about the points
     * @param {string} id - It describes about the id
     * @param {number} pageNumber - It describes about the page number
     * @private
     * @returns {string} - string
     */
    MeasureAnnotation.prototype.calculateVolume = function (points, id, pageNumber) {
        var values = this.getCurrentValues(id, pageNumber);
        var depth = values.depth ? values.depth : this.volumeDepth;
        var area = this.getArea(points, values.factor, values.unit);
        var volume = area * ((depth * this.convertUnitToPoint(values.unit)) * values.factor) * values.ratio;
        if (values.unit === 'ft_in') {
            var calculateValue = Math.round(volume * 100) / 100;
            if (calculateValue >= 12) {
                calculateValue = (Math.round(calculateValue / 12 * 100) / 100).toString();
                calculateValue = calculateValue.split('.');
                if (calculateValue[1]) {
                    var inchValue = 0;
                    if (calculateValue[1].charAt(1)) {
                        inchValue = parseInt(calculateValue[1].charAt(0), 10) + '.' + parseInt(calculateValue[1].charAt(1), 10);
                        inchValue = Math.round(inchValue);
                    }
                    else {
                        inchValue = calculateValue[1];
                    }
                    if (!inchValue) {
                        return (calculateValue[0] + ' ' + this.pdfViewer.localeObj.getConstant('cu') + ' ' + this.pdfViewer.localeObj.getConstant('ft'));
                    }
                    else {
                        return (calculateValue[0] + ' ' + this.pdfViewer.localeObj.getConstant('cu') + ' ' + this.pdfViewer.localeObj.getConstant('ft') + ' ' + inchValue + ' ' + this.pdfViewer.localeObj.getConstant('in'));
                    }
                }
                else {
                    return (calculateValue[0] + ' ' + this.pdfViewer.localeObj.getConstant('cu') + ' ' + this.pdfViewer.localeObj.getConstant('ft'));
                }
            }
            else {
                return (Math.round(volume * 100) / 100) + ' ' + this.pdfViewer.localeObj.getConstant('cu') + ' ' + this.pdfViewer.localeObj.getConstant('in');
            }
        }
        return (Math.round(volume * 100) / 100) + ' ' + this.pdfViewer.localeObj.getConstant('cu') + ' ' + this.pdfViewer.localeObj.getConstant(values.unit);
    };
    /**
     * @param {PdfAnnotationBaseModel} pdfAnnotationBase - It describes about the pdf annotation base
     * @private
     * @returns {string} - string
     */
    MeasureAnnotation.prototype.calculatePerimeter = function (pdfAnnotationBase) {
        var perimeter = Point.getLengthFromListOfPoints(pdfAnnotationBase.vertexPoints);
        return this.setConversion(perimeter * this.pixelToPointFactor, pdfAnnotationBase);
    };
    MeasureAnnotation.prototype.getFactor = function (unit) {
        var factor;
        switch (unit) {
            case 'in':
                factor = (1 / 72);
                break;
            case 'cm':
                factor = (1 / 28.346);
                break;
            case 'mm':
                factor = (1 / 2.835);
                break;
            case 'pt':
                factor = 1;
                break;
            case 'p':
                factor = 1 / 12;
                break;
            case 'ft':
                factor = 1 / 864;
                break;
            case 'ft_in':
                factor = 1 / 72;
                break;
            case 'm':
                factor = (1 / 2834.64567);
                break;
        }
        return factor;
    };
    MeasureAnnotation.prototype.convertPointToUnits = function (factor, value, unit) {
        var convertedValue;
        if (unit === 'ft_in') {
            var calculateValue = Math.round((value * factor) * 100) / 100;
            if (calculateValue >= 12) {
                calculateValue = (Math.round(calculateValue / 12 * 100) / 100).toString();
                calculateValue = calculateValue.split('.');
                if (calculateValue[1]) {
                    var inchValue = 0;
                    if (calculateValue[1].charAt(1)) {
                        inchValue = parseInt(calculateValue[1].charAt(0), 10) + '.' + parseInt(calculateValue[1].charAt(1), 10);
                        inchValue = Math.round(inchValue);
                    }
                    else {
                        inchValue = calculateValue[1];
                    }
                    if (!inchValue) {
                        convertedValue = calculateValue[0] + ' ' + this.pdfViewer.localeObj.getConstant('ft');
                    }
                    else {
                        convertedValue = calculateValue[0] + ' ' + this.pdfViewer.localeObj.getConstant('ft') + ' ' + inchValue + ' ' + this.pdfViewer.localeObj.getConstant('in');
                    }
                }
                else {
                    convertedValue = calculateValue[0] + ' ' + this.pdfViewer.localeObj.getConstant('ft');
                }
            }
            else {
                convertedValue = Math.round((value * factor) * 100) / 100 + ' ' + this.pdfViewer.localeObj.getConstant('in');
            }
        }
        else {
            convertedValue = Math.round((value * factor) * 100) / 100 + ' ' + this.pdfViewer.localeObj.getConstant(unit);
        }
        return convertedValue;
    };
    MeasureAnnotation.prototype.convertUnitToPoint = function (unit) {
        var factor;
        switch (unit) {
            case 'in':
                factor = 72;
                break;
            case 'cm':
                factor = 28.346;
                break;
            case 'mm':
                factor = 2.835;
                break;
            case 'pt':
                factor = 1;
                break;
            case 'p':
                factor = 12;
                break;
            case 'ft':
                factor = 864;
                break;
            case 'ft_in':
                factor = 72;
                break;
            case 'm':
                factor = 2834.64567;
                break;
        }
        return factor;
    };
    MeasureAnnotation.prototype.getStringifiedMeasure = function (measure) {
        if (!isNullOrUndefined(measure)) {
            measure.angle = JSON.stringify(measure.angle);
            measure.area = JSON.stringify(measure.area);
            measure.distance = JSON.stringify(measure.distance);
            measure.volume = JSON.stringify(measure.volume);
        }
        return JSON.stringify(measure);
    };
    MeasureAnnotation.prototype.getRgbCode = function (colorString) {
        // eslint-disable-next-line
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
     * @param {any} annotation - It describes about the annotation
     * @param {number} pageNumber - It describes about the page number
     * @private
     * @returns {any} - any
     */
    MeasureAnnotation.prototype.saveImportedMeasureAnnotations = function (annotation, pageNumber) {
        var annotationObject = null;
        var vertexPoints = null;
        if (annotation.VertexPoints) {
            vertexPoints = [];
            for (var j = 0; j < annotation.VertexPoints.length; j++) {
                var point = { x: annotation.VertexPoints[parseInt(j.toString(), 10)].X,
                    y: annotation.VertexPoints[parseInt(j.toString(), 10)].Y };
                vertexPoints.push(point);
            }
        }
        var measureObject = {
            ratio: annotation.Calibrate.Ratio, x: this.getNumberFormatArray(annotation.Calibrate.X),
            distance: this.getNumberFormatArray(annotation.Calibrate.Distance),
            area: this.getNumberFormatArray(annotation.Calibrate.Area),
            angle: this.getNumberFormatArray(annotation.Calibrate.Angle),
            volume: this.getNumberFormatArray(annotation.Calibrate.Volume),
            targetUnitConversion: annotation.Calibrate.TargetUnitConversion
        };
        if (annotation.Calibrate.Depth) {
            measureObject.depth = annotation.Calibrate.Depth;
        }
        if (annotation.Bounds && annotation.EnableShapeLabel === true) {
            annotation.LabelBounds =
                this.pdfViewer.annotationModule.inputElementModule.calculateLabelBoundsFromLoadedDocument(annotation.Bounds);
            annotation.LabelBorderColor = annotation.LabelBorderColor ? annotation.LabelBorderColor : annotation.StrokeColor;
            annotation.FontColor = annotation.FontColor ? annotation.FontColor : annotation.StrokeColor;
            annotation.LabelFillColor = annotation.LabelFillColor ? annotation.LabelFillColor : annotation.FillColor;
            annotation.FontSize = annotation.FontSize ? annotation.FontSize : 16;
            annotation.LabelSettings = annotation.LabelSettings ? annotation.LabelSettings : this.pdfViewer.shapeLabelSettings;
        }
        annotation.allowedInteractions = annotation.AllowedInteractions ?
            annotation.AllowedInteractions : this.pdfViewer.annotationModule.updateAnnotationAllowedInteractions(annotation);
        annotation.AnnotationSettings = annotation.AnnotationSettings ?
            annotation.AnnotationSettings : this.pdfViewer.annotationModule.updateAnnotationSettings(annotation);
        annotation.Author = this.pdfViewer.annotationModule.updateAnnotationAuthor('measure', annotation.Subject);
        annotationObject = {
            id: 'measure', shapeAnnotationType: annotation.ShapeAnnotationType, author: annotation.Author, allowedInteractions: annotation.allowedInteractions, modifiedDate: annotation.ModifiedDate, subject: annotation.Subject,
            note: annotation.Note, strokeColor: annotation.StrokeColor, fillColor: annotation.FillColor,
            opacity: annotation.Opacity, thickness: annotation.Thickness, rectangleDifference: annotation.RectangleDifference,
            borderStyle: annotation.BorderStyle, borderDashArray: annotation.BorderDashArray,
            rotateAngle: annotation.RotateAngle, isCloudShape: annotation.IsCloudShape,
            cloudIntensity: annotation.CloudIntensity, vertexPoints: vertexPoints,
            lineHeadStart: annotation.LineHeadStart, lineHeadEnd: annotation.LineHeadEnd, isLocked: annotation.IsLocked,
            bounds: { left: annotation.Bounds.X, top: annotation.Bounds.Y, width: annotation.Bounds.Width,
                height: annotation.Bounds.Height, right: annotation.Bounds.Right, bottom: annotation.Bounds.Bottom },
            caption: annotation.Caption, captionPosition: annotation.CaptionPosition, calibrate: measureObject,
            leaderLength: annotation.LeaderLength, leaderLineExtension: annotation.LeaderLineExtension,
            leaderLineOffset: annotation.LeaderLineOffset, indent: annotation.Indent, annotName: annotation.AnnotName,
            comments: this.pdfViewer.annotationModule.getAnnotationComments(annotation.Comments, annotation, annotation.Author),
            review: { state: annotation.State, stateModel: annotation.StateModel, modifiedDate: annotation.ModifiedDate,
                author: annotation.Author },
            labelContent: annotation.LabelContent, enableShapeLabel: annotation.EnableShapeLabel, labelFillColor: annotation.LabelFillColor,
            labelBorderColor: annotation.LabelBorderColor, fontColor: annotation.FontColor, fontSize: annotation.FontSize,
            labelBounds: annotation.LabelBounds, annotationSelectorSettings: this.getSettings(annotation),
            labelSettings: annotation.LabelSettings, annotationSettings: annotation.AnnotationSettings,
            customData: this.pdfViewer.annotation.getCustomData(annotation), isPrint: annotation.IsPrint,
            isCommentLock: annotation.IsCommentLock, isAnnotationRotated: false
        };
        this.pdfViewer.annotationModule.storeAnnotations(pageNumber, annotationObject, '_annotations_shape_measure');
    };
    /**
     * @param {any} annotation - It describes about the annotation
     * @param {number} pageNumber - It describes about the page number value
     * @private
     * @returns {any} - any
     */
    MeasureAnnotation.prototype.updateMeasureAnnotationCollections = function (annotation, pageNumber) {
        var annotationObject = null;
        var vertexPoints = null;
        if (annotation.VertexPoints) {
            vertexPoints = [];
            for (var j = 0; j < annotation.VertexPoints.length; j++) {
                var point = { x: annotation.VertexPoints[parseInt(j.toString(), 10)].X,
                    y: annotation.VertexPoints[parseInt(j.toString(), 10)].Y };
                vertexPoints.push(point);
            }
        }
        var measureObject = {
            ratio: annotation.Calibrate.Ratio, x: this.getNumberFormatArray(annotation.Calibrate.X),
            distance: this.getNumberFormatArray(annotation.Calibrate.Distance),
            area: this.getNumberFormatArray(annotation.Calibrate.Area),
            angle: this.getNumberFormatArray(annotation.Calibrate.Angle), volume: this.getNumberFormatArray(annotation.Calibrate.Volume),
            targetUnitConversion: annotation.Calibrate.TargetUnitConversion
        };
        if (annotation.Calibrate.Depth) {
            measureObject.depth = annotation.Calibrate.Depth;
        }
        if (annotation.Bounds && annotation.EnableShapeLabel === true) {
            annotation.LabelBounds =
                this.pdfViewer.annotationModule.inputElementModule.calculateLabelBoundsFromLoadedDocument(annotation.Bounds);
            annotation.LabelBorderColor = annotation.LabelBorderColor ? annotation.LabelBorderColor : annotation.StrokeColor;
            annotation.FontColor = annotation.FontColor ? annotation.FontColor : annotation.StrokeColor;
            annotation.LabelFillColor = annotation.LabelFillColor ? annotation.LabelFillColor : annotation.FillColor;
            annotation.FontSize = annotation.FontSize ? annotation.FontSize : 16;
            var settings = this.pdfViewer.shapeLabelSettings;
            var labelSettings = { borderColor: annotation.StrokeColor, fillColor: annotation.FillColor, fontColor: annotation.FontColor,
                fontSize: annotation.FontSize, labelContent: annotation.LabelContent, labelHeight: settings.labelHeight,
                labelWidth: settings.labelWidth, opacity: annotation.Opacity
            };
            annotation.LabelSettings = annotation.LabelSettings ? annotation.LabelSettings : labelSettings;
        }
        annotation.allowedInteractions = annotation.AllowedInteractions ?
            annotation.AllowedInteractions : this.pdfViewer.annotationModule.updateAnnotationAllowedInteractions(annotation);
        annotation.AnnotationSelectorSettings =
            annotation.AnnotationSelectorSettings ? annotation.AnnotationSelectorSettings :
                this.pdfViewerBase.annotationSelectorSettingLoad(annotation);
        annotation.AnnotationSettings = annotation.AnnotationSettings ?
            annotation.AnnotationSettings : this.pdfViewer.annotationModule.updateAnnotationSettings(annotation);
        if (annotation.IsLocked) {
            annotation.AnnotationSettings.isLock = annotation.IsLocked;
        }
        annotationObject = {
            id: 'measure', shapeAnnotationType: annotation.ShapeAnnotationType, author: annotation.Author, allowedInteractions: annotation.allowedInteractions, modifiedDate: annotation.ModifiedDate, subject: annotation.Subject,
            note: annotation.Note, strokeColor: annotation.StrokeColor, fillColor: annotation.FillColor,
            opacity: annotation.Opacity, thickness: annotation.Thickness, rectangleDifference: annotation.RectangleDifference,
            borderStyle: annotation.BorderStyle, borderDashArray: annotation.BorderDashArray,
            rotateAngle: annotation.RotateAngle, isCloudShape: annotation.IsCloudShape,
            cloudIntensity: annotation.CloudIntensity, vertexPoints: vertexPoints, lineHeadStart: annotation.LineHeadStart,
            lineHeadEnd: annotation.LineHeadEnd, isLocked: annotation.IsLocked,
            bounds: { left: annotation.Bounds.X, top: annotation.Bounds.Y, width: annotation.Bounds.Width,
                height: annotation.Bounds.Height, right: annotation.Bounds.Right, bottom: annotation.Bounds.Bottom },
            caption: annotation.Caption, captionPosition: annotation.CaptionPosition, calibrate: measureObject,
            leaderLength: annotation.LeaderLength, leaderLineExtension: annotation.LeaderLineExtension,
            leaderLineOffset: annotation.LeaderLineOffset, indent: annotation.Indent, annotationId: annotation.AnnotName,
            comments: this.pdfViewer.annotationModule.getAnnotationComments(annotation.Comments, annotation, annotation.Author),
            review: { state: annotation.State, stateModel: annotation.StateModel, modifiedDate: annotation.ModifiedDate,
                author: annotation.Author },
            labelContent: annotation.LabelContent, enableShapeLabel: annotation.EnableShapeLabel, labelFillColor: annotation.LabelFillColor,
            labelBorderColor: annotation.LabelBorderColor, fontColor: annotation.FontColor, fontSize: annotation.FontSize,
            labelBounds: annotation.LabelBounds, pageNumber: pageNumber, annotationSelectorSettings: annotation.AnnotationSelectorSettings,
            labelSettings: annotation.labelSettings, annotationSettings: annotation.AnnotationSettings,
            customData: this.pdfViewer.annotation.getCustomData(annotation), isPrint: annotation.IsPrint,
            isCommentLock: annotation.IsCommentLock
        };
        return annotationObject;
    };
    /**
     * This method used to add annotations with using program.
     *
     * @param {AnnotationType} annotationType - It describes the annotation type
     * @param {any} annotationObject - It describes type of annotation object
     * @param {IPoint} offset - It describes about the annotation bounds or location
     * @returns {object} - object
     * @private
     */
    MeasureAnnotation.prototype.updateAddAnnotationDetails = function (annotationType, annotationObject, offset) {
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
        //Initialize the annotation settings
        var annotationSelectorSettings = null;
        var allowedInteractions = null;
        var annotationSettings = null;
        var measureAnnotationType = '';
        var shapeAnnotationType = '';
        var subject = '';
        var isArrow = false;
        var vertexPoints = [];
        //Creating the CurrentDate and Annotation name
        var currentDateString = this.pdfViewer.annotation.stickyNotesAnnotationModule.getDateAndTime();
        var annotationName = this.pdfViewer.annotation.createGUID();
        if (annotationType === 'Distance') {
            //Creating annotation settings
            annotationSelectorSettings = this.pdfViewer.lineSettings.annotationSelectorSettings;
            this.pdfViewerBase.updateSelectorSettings(annotationSelectorSettings);
            annotationSettings = this.pdfViewer.annotationModule.updateSettings(this.pdfViewer.lineSettings);
            annotationObject.author = annotationObject.author ? annotationObject.author : this.pdfViewer.annotationModule.updateAnnotationAuthor('measure', annotationType);
            allowedInteractions = this.pdfViewer.lineSettings.allowedInteractions ?
                this.pdfViewer.lineSettings.allowedInteractions : this.pdfViewer.annotationSettings.allowedInteractions;
            measureAnnotationType = 'LineDimension';
            shapeAnnotationType = 'Line';
            subject = this.pdfViewer.lineSettings.subject !== '' ? this.pdfViewer.lineSettings.subject : this.pdfViewer.annotationSettings.subject !== '' ? this.pdfViewer.annotationSettings.subject : 'Distance calculation';
            isArrow = true;
            if (annotationObject.vertexPoints) {
                vertexPoints = annotationObject.vertexPoints;
            }
            else {
                vertexPoints = [{ x: offset.x, y: offset.y }, { x: offset.x + 100, y: offset.y }];
            }
            annotationObject.width = annotationObject.width ? annotationObject.width : 1;
            annotationObject.height = annotationObject.height ? annotationObject.height : 1;
        }
        else if (annotationType === 'Perimeter') {
            //Creating annotation settings
            annotationSelectorSettings = this.pdfViewer.arrowSettings.annotationSelectorSettings;
            this.pdfViewerBase.updateSelectorSettings(annotationSelectorSettings);
            annotationSettings = this.pdfViewer.annotationModule.updateSettings(this.pdfViewer.arrowSettings);
            annotationObject.author = annotationObject.author ? annotationObject.author : this.pdfViewer.annotationModule.updateAnnotationAuthor('measure', annotationType);
            allowedInteractions = this.pdfViewer.arrowSettings.allowedInteractions ?
                this.pdfViewer.arrowSettings.allowedInteractions : this.pdfViewer.annotationSettings.allowedInteractions;
            measureAnnotationType = 'PolyLineDimension';
            shapeAnnotationType = 'Polyline';
            subject = this.pdfViewer.arrowSettings.subject !== '' ? this.pdfViewer.arrowSettings.subject : this.pdfViewer.annotationSettings.subject !== '' ? this.pdfViewer.annotationSettings.subject : 'Perimeter calculation';
            isArrow = true;
            if (annotationObject.vertexPoints) {
                vertexPoints = annotationObject.vertexPoints;
            }
            else {
                vertexPoints = [{ x: offset.x, y: offset.y },
                    { x: offset.x + 85, y: offset.y },
                    { x: offset.x + 86, y: offset.y + 62 }];
            }
            annotationObject.width = annotationObject.width ? annotationObject.width : 1;
            annotationObject.height = annotationObject.height ? annotationObject.height : 1;
        }
        else if (annotationType === 'Area') {
            //Creating annotation settings
            annotationSelectorSettings = this.pdfViewer.rectangleSettings.annotationSelectorSettings;
            this.pdfViewerBase.updateSelectorSettings(annotationSelectorSettings);
            annotationSettings = this.pdfViewer.annotationModule.updateSettings(this.pdfViewer.rectangleSettings);
            annotationObject.author = annotationObject.author ? annotationObject.author : this.pdfViewer.annotationModule.updateAnnotationAuthor('measure', annotationType);
            allowedInteractions = this.pdfViewer.rectangleSettings.allowedInteractions ?
                this.pdfViewer.rectangleSettings.allowedInteractions : this.pdfViewer.annotationSettings.allowedInteractions;
            measureAnnotationType = 'PolygonDimension';
            shapeAnnotationType = 'Polygon';
            subject = this.pdfViewer.rectangleSettings.subject !== '' ? this.pdfViewer.rectangleSettings.subject : this.pdfViewer.annotationSettings.subject !== '' ? this.pdfViewer.annotationSettings.subject : 'Area calculation';
            if (annotationObject.vertexPoints) {
                vertexPoints = annotationObject.vertexPoints;
            }
            else {
                vertexPoints = [{ x: offset.x, y: offset.y },
                    { x: offset.x + 88, y: offset.y - 1 },
                    { x: offset.x + 89, y: offset.y + 53 },
                    { x: offset.x, y: offset.y }];
            }
            annotationObject.width = annotationObject.width ? annotationObject.width : 1;
            annotationObject.height = annotationObject.height ? annotationObject.height : 1;
        }
        else if (annotationType === 'Radius') {
            //Creating annotation settings
            annotationSelectorSettings = this.pdfViewer.circleSettings.annotationSelectorSettings;
            this.pdfViewerBase.updateSelectorSettings(annotationSelectorSettings);
            annotationSettings = this.pdfViewer.annotationModule.updateSettings(this.pdfViewer.circleSettings);
            annotationObject.author = annotationObject.author ? annotationObject.author : this.pdfViewer.annotationModule.updateAnnotationAuthor('measure', annotationType);
            allowedInteractions = this.pdfViewer.circleSettings.allowedInteractions ?
                this.pdfViewer.circleSettings.allowedInteractions : this.pdfViewer.annotationSettings.allowedInteractions;
            measureAnnotationType = 'PolygonRadius';
            shapeAnnotationType = 'Circle';
            subject = this.pdfViewer.circleSettings.subject !== '' ? this.pdfViewer.circleSettings.subject : this.pdfViewer.annotationSettings.subject !== '' ? this.pdfViewer.annotationSettings.subject : 'Radius calculation';
            annotationObject.width = annotationObject.width ? annotationObject.width : 100;
            annotationObject.height = annotationObject.height ? annotationObject.height : 100;
            vertexPoints = null;
        }
        else if (annotationType === 'Volume') {
            //Creating annotation settings
            annotationSelectorSettings = this.pdfViewer.polygonSettings.annotationSelectorSettings;
            this.pdfViewerBase.updateSelectorSettings(annotationSelectorSettings);
            annotationSettings = this.pdfViewer.annotationModule.updateSettings(this.pdfViewer.polygonSettings);
            annotationObject.author = annotationObject.author ? annotationObject.author : this.pdfViewer.annotationModule.updateAnnotationAuthor('measure', annotationType);
            allowedInteractions = this.pdfViewer.polygonSettings.allowedInteractions ?
                this.pdfViewer.polygonSettings.allowedInteractions : this.pdfViewer.annotationSettings.allowedInteractions;
            measureAnnotationType = 'PolygonVolume';
            shapeAnnotationType = 'Polygon';
            subject = this.pdfViewer.polygonSettings.subject !== '' ? this.pdfViewer.polygonSettings.subject : this.pdfViewer.annotationSettings.subject !== '' ? this.pdfViewer.annotationSettings.subject : 'Volume calculation';
            if (annotationObject.vertexPoints) {
                vertexPoints = annotationObject.vertexPoints;
            }
            else {
                vertexPoints = [
                    { x: offset.x, y: offset.y },
                    { x: offset.x, y: offset.y + 109 },
                    { x: offset.x + 120, y: offset.y + 109 },
                    { x: offset.x + 120, y: offset.y - 1 },
                    { x: offset.x, y: offset.y }
                ];
            }
            annotationObject.width = annotationObject.width ? annotationObject.width : 1;
            annotationObject.height = annotationObject.height ? annotationObject.height : 1;
        }
        annotationSettings.isLock = annotationObject.isLock ? annotationObject.isLock : annotationSettings.isLock;
        annotationSettings.minHeight = annotationObject.minHeight ? annotationObject.minHeight : annotationSettings.minHeight;
        annotationSettings.minWidth = annotationObject.minWidth ? annotationObject.minWidth : annotationSettings.minWidth;
        annotationSettings.maxWidth = annotationObject.maxWidth ? annotationObject.maxWidth : annotationSettings.maxWidth;
        annotationSettings.maxHeight = annotationObject.maxHeight ? annotationObject.maxHeight : annotationSettings.maxHeight;
        //Calculating area for all the measurements
        var values = { depth: 96,
            factor: 0.013888888888888888,
            ratio: 1,
            unit: 'in' };
        var notes = '';
        if (vertexPoints || annotationType === 'Radius' || annotationType === 'Volume') {
            if (annotationType === 'Distance' || annotationType === 'Perimeter' || annotationType === 'Radius') {
                var length_1 = 0;
                if (annotationType === 'Radius') {
                    length_1 = (annotationObject.width / 2) * this.pixelToPointFactor;
                }
                else {
                    for (var i = 0; i < vertexPoints.length - 1; i++) {
                        length_1 += Math.sqrt(Math.pow((vertexPoints[parseInt(i.toString(), 10)].x - vertexPoints[i + 1].x), 2)
                            + Math.pow((vertexPoints[parseInt(i.toString(), 10)].y - vertexPoints[i + 1].y), 2));
                    }
                    length_1 = length_1 * this.pixelToPointFactor;
                }
                var scaledValue = length_1 * values.ratio;
                notes = this.convertPointToUnits(values.factor, scaledValue, values.unit);
            }
            else if (annotationType === 'Area' || annotationType === 'Volume') {
                var area = 0;
                var j = vertexPoints.length - 1;
                for (var i = 0; i < vertexPoints.length; i++) {
                    area += (vertexPoints[parseInt(j.toString(), 10)].x * this.pixelToPointFactor *
                        values.factor + vertexPoints[parseInt(i.toString(), 10)].x * this.pixelToPointFactor *
                        values.factor) * (vertexPoints[parseInt(j.toString(), 10)].y * this.pixelToPointFactor *
                        values.factor - vertexPoints[parseInt(i.toString(), 10)].y * this.pixelToPointFactor * values.factor);
                    j = i;
                }
                area = (Math.abs((area) / 2.0));
                if (annotationType === 'Volume') {
                    area = area * ((values.depth * this.convertUnitToPoint(values.unit)) * values.factor) * values.ratio;
                    notes = Math.round(area * 100) / 100 + this.pdfViewer.localeObj.getConstant('cu') + ' ' + this.pdfViewer.localeObj.getConstant(values.unit);
                }
                else {
                    notes = Math.round(area * 100) / 100 + this.pdfViewer.localeObj.getConstant('sq') + ' ' + this.pdfViewer.localeObj.getConstant(values.unit);
                }
            }
        }
        //Converting points model into vertex property
        if (vertexPoints) {
            vertexPoints = this.pdfViewer.annotation.getVertexPointsXY(vertexPoints);
        }
        //Creating Annotation objects with it's proper properties
        var measureShapeAnnotation = [];
        var shape = {
            AllowedInteractions: annotationObject.allowedInteractions ? annotationObject.allowedInteractions : allowedInteractions,
            AnnotName: annotationName,
            AnnotType: 'shape_measure',
            AnnotationSelectorSettings: annotationObject.annotationSelectorSettings ?
                annotationObject.annotationSelectorSettings : annotationSelectorSettings,
            AnnotationSettings: annotationSettings,
            Author: annotationObject.author ? annotationObject.author : 'Guest',
            BorderDashArray: annotationObject.borderDashArray ? annotationObject.borderDashArray : 0,
            BorderStyle: 'Solid',
            Bounds: { X: offset.x, Y: offset.y, Width: annotationObject.width, Height: annotationObject.height,
                Left: offset.x, Top: offset.y, Location: { X: offset.x, Y: offset.y },
                Size: { Height: annotationObject.height, IsEmpty: false, Width: annotationObject.width } },
            Calibrate: {
                Area: [{ ConversionFactor: 1, Denominator: 100, FormatDenominator: false, FractionalType: 'D', Unit: 'sq in' }],
                Depth: annotationObject.depth ? annotationObject.depth : 0,
                Distance: [{ ConversionFactor: 1, Denominator: 100, FormatDenominator: false, FractionalType: 'D', Unit: 'in' }],
                Ratio: '1 in = 1 in',
                TargetUnitConversion: 0,
                Volume: null,
                X: [{ ConversionFactor: 0.013888889, Denominator: 100, FormatDenominator: false, FractionalType: 'D', Unit: 'in' }]
            },
            Caption: true,
            CaptionPosition: 'Top',
            CloudIntensity: 0,
            Comments: null,
            CustomData: annotationObject.customData ? annotationObject.customData : null,
            CreatedDate: currentDateString,
            EnableShapeLabel: false,
            ExistingCustomData: null,
            FillColor: annotationObject.fillColor ? annotationObject.fillColor : '#ffffff00',
            FontColor: null,
            FontSize: 0,
            Indent: measureAnnotationType,
            IsCloudShape: false,
            IsCommentLock: false,
            IsLocked: annotationObject.isLock ? annotationObject.isLock : false,
            IsPrint: !isNullOrUndefined(annotationObject.isPrint) ? annotationObject.isPrint : true,
            LabelBorderColor: null,
            LabelBounds: { X: 0, Y: 0, Width: 0, Height: 0 },
            LabelContent: null,
            LabelFillColor: null,
            LabelSettings: null,
            LeaderLength: annotationObject.leaderLength ? annotationObject.leaderLength : 0,
            LeaderLineExtension: 0,
            LeaderLineOffset: 0,
            LineHeadStart: annotationObject.lineHeadStartStyle ? annotationObject.lineHeadStartStyle : isArrow ? 'ClosedArrow' : 'None',
            LineHeadEnd: annotationObject.lineHeadEndStyle ? annotationObject.lineHeadEndStyle : isArrow ? 'ClosedArrow' : 'None',
            ModifiedDate: '',
            Note: notes,
            Opacity: annotationObject.opacity ? annotationObject.opacity : 1,
            RectangleDifference: [],
            RotateAngle: 'RotateAngle0',
            ShapeAnnotationType: shapeAnnotationType,
            State: '',
            StateModel: '',
            StrokeColor: annotationObject.strokeColor ? annotationObject.strokeColor : '#ff0000',
            Subject: annotationObject.subject ? annotationObject.subject : subject,
            Thickness: annotationObject.thickness ? annotationObject.thickness : 1,
            VertexPoints: vertexPoints
        };
        //Adding the annotation object to an array and return it
        measureShapeAnnotation[0] = shape;
        return { measureShapeAnnotation: measureShapeAnnotation };
    };
    return MeasureAnnotation;
}());
export { MeasureAnnotation };
