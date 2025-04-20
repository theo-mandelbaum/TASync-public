import { isNullOrUndefined } from '@syncfusion/ej2-base';
import { Rect } from '@syncfusion/ej2-drawings';
import { PdfAnnotationBorder, PdfRotationAngle, PdfSquareAnnotation, PdfAnnotationFlag, _PdfDictionary, _PdfName, PdfBorderEffectStyle, PdfBorderEffect, PdfAnnotationState, PdfAnnotationStateModel, PdfCircleAnnotation, PdfPopupAnnotation, PdfLineAnnotation, PdfLineEndingStyle, PdfFontStyle, PdfFontFamily, PdfStandardFont, PdfStringFormat, PdfTextAlignment, PdfRubberStampAnnotation, PdfPen, PdfBrush, PdfVerticalAlignment, PdfPath, PdfRubberStampAnnotationIcon, PdfBitmap, PdfPolyLineAnnotation, PdfCircleMeasurementType, PdfPopupIcon, PdfFreeTextAnnotation, PdfBorderStyle, PdfRectangleAnnotation, PdfPolygonAnnotation, PdfEllipseAnnotation, PdfTextMarkupAnnotation, PdfInkAnnotation, PdfLineIntent, PdfTemplate, PdfTextMarkupAnnotationType, PdfLineCaptionType, PdfMeasurementUnit, PdfAnnotationIntent, PdfTrueTypeFont, _decode, _annotationFlagsToString } from '@syncfusion/ej2-pdf';
import { SizeBase, getArialFontData } from '../index';
import { PdfViewerUtils } from '../base/pdfviewer-utlis';
/**
 * AnnotationRenderer
 *
 * @hidden
 */
var AnnotationRenderer = /** @class */ (function () {
    /**
     * @param {PdfViewer} pdfViewer - The PdfViewer.
     * @param {PdfViewerBase} pdfViewerBase - The PdfViewerBase.
     * @private
     */
    function AnnotationRenderer(pdfViewer, pdfViewerBase) {
        this.formats = ['M/d/yyyy h:mm:ss tt', 'M/d/yyyy, h:mm:ss tt', 'M/d/yyyy h:mm tt',
            'MM/dd/yyyy hh:mm:ss', 'M/d/yyyy h:mm:ss',
            'M/d/yyyy hh:mm tt', 'M/d/yyyy hh tt',
            'M/d/yyyy h:mm', 'M/d/yyyy h:mm',
            'MM/dd/yyyy hh:mm', 'M/dd/yyyy hh:mm', 'dd/M/yyyy h:mm:ss tt', 'dd/M/yyyy, h:mm:ss tt',
            'M/d/yy, h:mm:ss tt', 'yyyy/MM/dd, h:mm:ss tt', 'dd/MMM/yy, h:mm:ss tt',
            'yyyy-MM-dd, h:mm:ss tt', 'dd-MMM-yy, h:mm:ss tt', 'MM-dd-yy, h:mm:ss tt', 'YYYY-MM-DDTHH:mm:ss.sssZ', '±YYYYYY-MM-DDTHH:mm:ss.sssZ', 'yyyy-MM-ddTHH:mm:ss.fffZ'];
        this.pdfViewer = pdfViewer;
        this.pdfViewerBase = pdfViewerBase;
    }
    /**
     * @param {any} details - details
     * @param {PdfPage} page - page
     * @private
     * @returns {void}
     */
    AnnotationRenderer.prototype.addShape = function (details, page) {
        var shapeAnnotation = details;
        var isLock = this.checkAnnotationLock(shapeAnnotation);
        if (!isNullOrUndefined(shapeAnnotation.shapeAnnotationType) && shapeAnnotation.shapeAnnotationType === 'Line') {
            var points = JSON.parse(shapeAnnotation.vertexPoints);
            var linePoints = this.getSaveVertexPoints(points, page);
            var lineAnnotation = new PdfLineAnnotation(linePoints);
            if (!isNullOrUndefined(shapeAnnotation.note)) {
                lineAnnotation.text = shapeAnnotation.note.toString();
            }
            lineAnnotation.author = !isNullOrUndefined(shapeAnnotation.author) && shapeAnnotation.author.toString() !== '' ? shapeAnnotation.author.toString() : 'Guest';
            lineAnnotation._dictionary.set('NM', shapeAnnotation.annotName.toString());
            if (!isNullOrUndefined(shapeAnnotation.subject)) {
                lineAnnotation.subject = shapeAnnotation.subject.toString();
            }
            if (!isNullOrUndefined(shapeAnnotation.strokeColor)) {
                var strokeColor = JSON.parse(shapeAnnotation.strokeColor);
                var color = [strokeColor.r, strokeColor.g, strokeColor.b];
                lineAnnotation.color = color;
            }
            if (!isNullOrUndefined(shapeAnnotation.fillColor)) {
                var fillColor = JSON.parse(shapeAnnotation.fillColor);
                if (!isNullOrUndefined(fillColor.r) && !isNullOrUndefined(fillColor.g) && !isNullOrUndefined(fillColor.b) &&
                    !isNullOrUndefined(fillColor.a) && fillColor.a > 0) {
                    var innerColor = [fillColor.r, fillColor.g, fillColor.b];
                    lineAnnotation.innerColor = innerColor;
                }
            }
            if (!isNullOrUndefined(shapeAnnotation.opacity)) {
                lineAnnotation.opacity = shapeAnnotation.opacity;
            }
            var lineBorder = new PdfAnnotationBorder();
            lineBorder.width = shapeAnnotation.thickness;
            lineBorder.style = shapeAnnotation.borderStyle;
            lineBorder.dash = shapeAnnotation.borderDashArray;
            lineAnnotation.border = lineBorder;
            lineAnnotation.rotationAngle = this.getRotateAngle(shapeAnnotation.rotateAngle);
            lineAnnotation.lineEndingStyle.begin = this.getLineEndingStyle(shapeAnnotation.lineHeadStart);
            lineAnnotation.lineEndingStyle.end = this.getLineEndingStyle(shapeAnnotation.lineHeadEnd);
            var dateValue = void 0;
            if (!isNullOrUndefined(shapeAnnotation.modifiedDate) && !isNaN(Date.parse(shapeAnnotation.modifiedDate))) {
                dateValue = new Date(Date.parse(shapeAnnotation.modifiedDate));
                lineAnnotation.modifiedDate = dateValue;
            }
            var commentsDetails = shapeAnnotation.comments;
            var bounds = JSON.parse(shapeAnnotation.bounds);
            lineAnnotation.bounds = bounds;
            lineAnnotation.bounds.x = bounds.left;
            lineAnnotation.bounds.y = bounds.top;
            if (commentsDetails.length > 0) {
                for (var i = 0; i < commentsDetails.length; i++) {
                    lineAnnotation.comments.add(this.addCommentsCollection(commentsDetails[parseInt(i.toString(), 10)], lineAnnotation.bounds));
                }
            }
            var reviewDetails = shapeAnnotation.review;
            lineAnnotation.reviewHistory.add(this.addReviewCollections(reviewDetails, lineAnnotation.bounds));
            this.preserveIsLockProperty(shapeAnnotation, lineAnnotation);
            if (!isNullOrUndefined(shapeAnnotation.customData)) {
                lineAnnotation.setValues('CustomData', JSON.stringify(shapeAnnotation.customData));
            }
            if (shapeAnnotation.allowedInteractions && shapeAnnotation['allowedInteractions'] != null) {
                lineAnnotation.setValues('AllowedInteractions', JSON.stringify(shapeAnnotation['allowedInteractions']));
            }
            lineAnnotation.setAppearance(true);
            page.annotations.add(lineAnnotation);
        }
        else if (!isNullOrUndefined(shapeAnnotation.shapeAnnotationType) && shapeAnnotation.shapeAnnotationType === 'Square') {
            var bounds = JSON.parse(shapeAnnotation.bounds);
            if (isNullOrUndefined(bounds.left)) {
                shapeAnnotation.bounds.left = 0;
            }
            if (isNullOrUndefined(bounds.top)) {
                shapeAnnotation.bounds.top = 0;
            }
            var cropValues = this.getCropBoxValue(page, false);
            var left = this.convertPixelToPoint(bounds.left);
            var top_1 = this.convertPixelToPoint(bounds.top);
            var width = this.convertPixelToPoint(bounds.width);
            var height = this.convertPixelToPoint(bounds.height);
            var cropX = 0;
            var cropY = 0;
            if (cropValues.x !== 0 && cropValues.y !== 0 && cropValues.x === left) {
                cropX = cropValues.x;
                cropY = cropValues.y;
            }
            else if (cropValues.x === 0 && page.cropBox[2] === page.size[0] && cropValues.y === page.size[1]) {
                cropX = cropValues.x;
                cropY = cropValues.y;
            }
            var squareAnnotation = new PdfSquareAnnotation(cropX + left, cropY + top_1, width, height);
            if (!isNullOrUndefined(shapeAnnotation.note)) {
                squareAnnotation.text = shapeAnnotation.note.toString();
            }
            squareAnnotation.author = !isNullOrUndefined(shapeAnnotation.author) && shapeAnnotation.author.toString() !== '' ? shapeAnnotation.author.toString() : 'Guest';
            squareAnnotation._dictionary.set('NM', shapeAnnotation.annotName.toString());
            if (!isNullOrUndefined(shapeAnnotation.subject)) {
                squareAnnotation.subject = shapeAnnotation.subject.toString();
            }
            if (!isNullOrUndefined(shapeAnnotation.strokeColor)) {
                var strokeColor = JSON.parse(shapeAnnotation.strokeColor);
                var color = [strokeColor.r, strokeColor.g, strokeColor.b];
                squareAnnotation.color = color;
            }
            if (!isNullOrUndefined(shapeAnnotation.fillColor)) {
                var fillColor = JSON.parse(shapeAnnotation.fillColor);
                if (!this.isTransparentColor(fillColor)) {
                    var innerColor = [fillColor.r, fillColor.g, fillColor.b];
                    squareAnnotation.innerColor = innerColor;
                }
                if (fillColor.a < 1 && fillColor.a > 0) {
                    squareAnnotation._dictionary.update('FillOpacity', fillColor.a);
                    fillColor.a = 1;
                }
                else {
                    squareAnnotation._dictionary.update('FillOpacity', fillColor.a);
                }
            }
            if (!isNullOrUndefined(shapeAnnotation.opacity)) {
                squareAnnotation.opacity = shapeAnnotation.opacity;
            }
            var lineBorder = new PdfAnnotationBorder();
            lineBorder.width = shapeAnnotation.thickness;
            lineBorder.style = shapeAnnotation.borderStyle;
            lineBorder.dash = shapeAnnotation.borderDashArray;
            squareAnnotation.border = lineBorder;
            squareAnnotation.rotationAngle = this.getRotateAngle(shapeAnnotation.rotateAngle);
            var dateValue = void 0;
            if (!isNullOrUndefined(shapeAnnotation.modifiedDate) && !isNaN(Date.parse(shapeAnnotation.modifiedDate))) {
                dateValue = new Date(Date.parse(shapeAnnotation.modifiedDate));
                squareAnnotation.modifiedDate = dateValue;
            }
            var commentsDetails = shapeAnnotation.comments;
            if (commentsDetails.length > 0) {
                for (var i = 0; i < commentsDetails.length; i++) {
                    squareAnnotation.comments.add(this.addCommentsCollection(commentsDetails[parseInt(i.toString(), 10)], squareAnnotation.bounds));
                }
            }
            var reviewDetails = shapeAnnotation.review;
            squareAnnotation.reviewHistory.add(this.addReviewCollections(reviewDetails, squareAnnotation.bounds));
            if (!isNullOrUndefined(shapeAnnotation.isCloudShape) && shapeAnnotation.isCloudShape) {
                var borderEffect = new PdfBorderEffect();
                borderEffect.style = PdfBorderEffectStyle.cloudy;
                borderEffect.intensity = shapeAnnotation.cloudIntensity;
                squareAnnotation.borderEffect = borderEffect;
                var rectDifferences = JSON.parse(shapeAnnotation.rectangleDifference);
                if (rectDifferences.length > 0) {
                    var rd = this.getRDValues(rectDifferences);
                    squareAnnotation._dictionary.update('RD', rd);
                }
            }
            this.preserveIsLockProperty(shapeAnnotation, squareAnnotation);
            if (!isNullOrUndefined(shapeAnnotation.customData)) {
                squareAnnotation.setValues('CustomData', JSON.stringify(shapeAnnotation.customData));
            }
            if (shapeAnnotation.allowedInteractions && shapeAnnotation['allowedInteractions'] != null) {
                squareAnnotation.setValues('AllowedInteractions', JSON.stringify(shapeAnnotation['allowedInteractions']));
            }
            squareAnnotation.setAppearance(true);
            page.annotations.add(squareAnnotation);
        }
        else if (!isNullOrUndefined(shapeAnnotation.shapeAnnotationType) && shapeAnnotation.shapeAnnotationType === 'Circle') {
            var bounds = JSON.parse(shapeAnnotation.bounds);
            var left = !isNullOrUndefined(bounds.left) ? this.convertPixelToPoint(bounds.left) : 0;
            var top_2 = !isNullOrUndefined(bounds.top) ? this.convertPixelToPoint(bounds.top) : 0;
            var width = !isNullOrUndefined(bounds.width) ? this.convertPixelToPoint(bounds.width) : 0;
            var height = !isNullOrUndefined(bounds.height) ? this.convertPixelToPoint(bounds.height) : 0;
            var cropValues = this.getCropBoxValue(page, false);
            var cropX = 0;
            var cropY = 0;
            if (cropValues.x !== 0 && cropValues.y !== 0 && cropValues.x === left) {
                cropX = cropValues.x;
                cropY = cropValues.y;
            }
            else if (cropValues.x === 0 && page.cropBox[2] === page.size[0] && cropValues.y === page.size[1]) {
                cropX = cropValues.x;
                cropY = cropValues.y;
            }
            var circleAnnotation = new PdfCircleAnnotation(cropX + left, cropY + top_2, width, height);
            if (!isNullOrUndefined(shapeAnnotation.note)) {
                circleAnnotation.text = shapeAnnotation.note.toString();
            }
            circleAnnotation.author = !isNullOrUndefined(shapeAnnotation.author) && shapeAnnotation.author.toString() !== '' ? shapeAnnotation.author.toString() : 'Guest';
            circleAnnotation._dictionary.set('NM', shapeAnnotation.annotName.toString());
            if (!isNullOrUndefined(shapeAnnotation.subject)) {
                circleAnnotation.subject = shapeAnnotation.subject.toString();
            }
            if (!isNullOrUndefined(shapeAnnotation.strokeColor)) {
                var strokeColor = JSON.parse(shapeAnnotation.strokeColor);
                var color = [strokeColor.r, strokeColor.g, strokeColor.b];
                circleAnnotation.color = color;
            }
            if (!isNullOrUndefined(shapeAnnotation.fillColor)) {
                var fillColor = JSON.parse(shapeAnnotation.fillColor);
                if (!this.isTransparentColor(fillColor)) {
                    var innerColor = [fillColor.r, fillColor.g, fillColor.b];
                    circleAnnotation.innerColor = innerColor;
                }
                if (fillColor.a < 1 && fillColor.a > 0) {
                    circleAnnotation._dictionary.update('FillOpacity', fillColor.a);
                    fillColor.a = 1;
                }
                else {
                    circleAnnotation._dictionary.update('FillOpacity', fillColor.a);
                }
            }
            if (!isNullOrUndefined(shapeAnnotation.opacity)) {
                circleAnnotation.opacity = shapeAnnotation.opacity;
            }
            var lineBorder = new PdfAnnotationBorder();
            lineBorder.width = shapeAnnotation.thickness;
            lineBorder.style = shapeAnnotation.borderStyle;
            lineBorder.dash = shapeAnnotation.borderDashArray;
            circleAnnotation.border = lineBorder;
            circleAnnotation.rotationAngle = this.getRotateAngle(shapeAnnotation.rotateAngle);
            var dateValue = void 0;
            if (!isNullOrUndefined(shapeAnnotation.modifiedDate) && !isNaN(Date.parse(shapeAnnotation.modifiedDate))) {
                dateValue = new Date(Date.parse(shapeAnnotation.modifiedDate));
                circleAnnotation.modifiedDate = dateValue;
            }
            var commentsDetails = shapeAnnotation.comments;
            if (commentsDetails.length > 0) {
                for (var i = 0; i < commentsDetails.length; i++) {
                    circleAnnotation.comments.add(this.addCommentsCollection(commentsDetails[parseInt(i.toString(), 10)], circleAnnotation.bounds));
                }
            }
            var reviewDetails = shapeAnnotation.review;
            circleAnnotation.reviewHistory.add(this.addReviewCollections(reviewDetails, circleAnnotation.bounds));
            if (!isNullOrUndefined(shapeAnnotation.isCloudShape) && shapeAnnotation.isCloudShape) {
                var borderEffect = new PdfBorderEffect();
                borderEffect.style = PdfBorderEffectStyle.cloudy;
                borderEffect.intensity = shapeAnnotation.cloudIntensity;
                circleAnnotation._borderEffect = borderEffect;
                var rectDifferences = JSON.parse(shapeAnnotation.rectangleDifference);
                if (rectDifferences.length > 0) {
                    var rd = this.getRDValues(rectDifferences);
                    circleAnnotation._dictionary.update('RD', rd);
                }
            }
            this.preserveIsLockProperty(shapeAnnotation, circleAnnotation);
            if (!isNullOrUndefined(shapeAnnotation.customData)) {
                circleAnnotation.setValues('CustomData', JSON.stringify(shapeAnnotation.customData));
            }
            if (shapeAnnotation.allowedInteractions && shapeAnnotation['allowedInteractions'] != null) {
                circleAnnotation.setValues('AllowedInteractions', JSON.stringify(shapeAnnotation['allowedInteractions']));
            }
            circleAnnotation.setAppearance(true);
            page.annotations.add(circleAnnotation);
        }
        else if (!isNullOrUndefined(shapeAnnotation.shapeAnnotationType) && shapeAnnotation.shapeAnnotationType === 'Polygon') {
            var points = JSON.parse(shapeAnnotation.vertexPoints);
            var linePoints = this.getSaveVertexPoints(points, page);
            var bounds = JSON.parse(shapeAnnotation.bounds);
            if (isNullOrUndefined(bounds.left)) {
                shapeAnnotation.bounds.left = 0;
            }
            if (isNullOrUndefined(bounds.top)) {
                shapeAnnotation.bounds.top = 0;
            }
            var left = this.convertPixelToPoint(bounds.left);
            var top_3 = this.convertPixelToPoint(bounds.top);
            var width = this.convertPixelToPoint(bounds.width);
            var height = this.convertPixelToPoint(bounds.height);
            var polygonAnnotation = new PdfPolygonAnnotation(linePoints);
            polygonAnnotation.bounds = new Rect(left, top_3, width, height);
            if (!isNullOrUndefined(shapeAnnotation.note)) {
                polygonAnnotation.text = shapeAnnotation.note.toString();
            }
            polygonAnnotation.author = !isNullOrUndefined(shapeAnnotation.author) && shapeAnnotation.author.toString() !== '' ? shapeAnnotation.author.toString() : 'Guest';
            if (!isNullOrUndefined(shapeAnnotation.subject)) {
                polygonAnnotation.subject = shapeAnnotation.subject.toString();
            }
            polygonAnnotation._dictionary.set('NM', shapeAnnotation.annotName.toString());
            if (!isNullOrUndefined(shapeAnnotation.strokeColor)) {
                var strokeColor = JSON.parse(shapeAnnotation.strokeColor);
                var color = [strokeColor.r, strokeColor.g, strokeColor.b];
                polygonAnnotation.color = color;
            }
            if (!isNullOrUndefined(shapeAnnotation.fillColor)) {
                var fillColor = JSON.parse(shapeAnnotation.fillColor);
                if (!this.isTransparentColor(fillColor)) {
                    var innerColor = [fillColor.r, fillColor.g, fillColor.b];
                    polygonAnnotation.innerColor = innerColor;
                }
                if (fillColor.a < 1 && fillColor.a > 0) {
                    polygonAnnotation._dictionary.update('FillOpacity', fillColor.a);
                    fillColor.a = 1;
                }
                else {
                    polygonAnnotation._dictionary.update('FillOpacity', fillColor.a);
                }
            }
            if (!isNullOrUndefined(shapeAnnotation.opacity)) {
                polygonAnnotation.opacity = shapeAnnotation.opacity;
            }
            var lineBorder = new PdfAnnotationBorder();
            lineBorder.width = shapeAnnotation.thickness;
            lineBorder.style = shapeAnnotation.borderStyle;
            lineBorder.dash = shapeAnnotation.borderDashArray;
            polygonAnnotation.border = lineBorder;
            polygonAnnotation.rotationAngle = this.getRotateAngle(shapeAnnotation.rotateAngle);
            var dateValue = void 0;
            if (!isNullOrUndefined(shapeAnnotation.modifiedDate) && !isNaN(Date.parse(shapeAnnotation.modifiedDate))) {
                dateValue = new Date(Date.parse(shapeAnnotation.modifiedDate));
                polygonAnnotation.modifiedDate = dateValue;
            }
            var commentsDetails = shapeAnnotation.comments;
            if (commentsDetails.length > 0) {
                for (var i = 0; i < commentsDetails.length; i++) {
                    polygonAnnotation.comments.add(this.addCommentsCollection(commentsDetails[parseInt(i.toString(), 10)], polygonAnnotation.bounds));
                }
            }
            var reviewDetails = shapeAnnotation.review;
            polygonAnnotation.reviewHistory.add(this.addReviewCollections(reviewDetails, polygonAnnotation.bounds));
            if (!isNullOrUndefined(shapeAnnotation.isCloudShape) && shapeAnnotation.isCloudShape) {
                var borderEffect = new PdfBorderEffect();
                borderEffect.style = PdfBorderEffectStyle.cloudy;
                borderEffect.intensity = shapeAnnotation.cloudIntensity;
                polygonAnnotation.borderEffect = borderEffect;
                var rectDifferences = JSON.parse(shapeAnnotation.rectangleDifference);
                if (rectDifferences.length > 0) {
                    var rd = this.getRDValues(rectDifferences);
                    polygonAnnotation._dictionary.update('RD', rd);
                }
            }
            this.preserveIsLockProperty(shapeAnnotation, polygonAnnotation);
            if (!isNullOrUndefined(shapeAnnotation.customData)) {
                polygonAnnotation.setValues('CustomData', JSON.stringify(shapeAnnotation.customData));
            }
            if (!isNullOrUndefined(shapeAnnotation.allowedInteractions)) {
                polygonAnnotation.setValues('AllowedInteractions', JSON.stringify(shapeAnnotation.allowedInteractions));
            }
            polygonAnnotation.setAppearance(true);
            page.annotations.add(polygonAnnotation);
        }
        else if (!isNullOrUndefined(shapeAnnotation.shapeAnnotationType) && shapeAnnotation.shapeAnnotationType === 'Polyline') {
            var points = JSON.parse(shapeAnnotation.vertexPoints);
            var linePoints = this.getSaveVertexPoints(points, page);
            var bounds = JSON.parse(shapeAnnotation.bounds);
            var polylineAnnotation = new PdfPolyLineAnnotation(linePoints);
            polylineAnnotation.bounds = new Rect(this.convertPixelToPoint(bounds.left ? bounds.left : 0), this.convertPixelToPoint(bounds.top ? bounds.top : 0), this.convertPixelToPoint(bounds.width ? bounds.width : 0), this.convertPixelToPoint(bounds.height ? bounds.height : 0));
            if (!isNullOrUndefined(shapeAnnotation.note)) {
                polylineAnnotation.text = shapeAnnotation.note.toString();
            }
            polylineAnnotation.author = !isNullOrUndefined(shapeAnnotation.author) && shapeAnnotation.author.toString() !== '' ? shapeAnnotation.author.toString() : 'Guest';
            if (!isNullOrUndefined(shapeAnnotation.subject)) {
                polylineAnnotation.subject = shapeAnnotation.subject.toString();
            }
            polylineAnnotation._dictionary.set('NM', shapeAnnotation.annotName.toString());
            if (!isNullOrUndefined(shapeAnnotation.strokeColor)) {
                var strokeColor = JSON.parse(shapeAnnotation.strokeColor);
                var color = [strokeColor.r, strokeColor.g, strokeColor.b];
                polylineAnnotation.color = color;
            }
            if (!isNullOrUndefined(shapeAnnotation.fillColor)) {
                var fillColor = JSON.parse(shapeAnnotation.fillColor);
                if (!this.isTransparentColor(fillColor)) {
                    var innerColor = [fillColor.r, fillColor.g, fillColor.b];
                    polylineAnnotation.innerColor = innerColor;
                }
                if (fillColor.a < 1 && fillColor.a > 0) {
                    polylineAnnotation._dictionary.update('FillOpacity', fillColor.a);
                    fillColor.a = 1;
                }
                else {
                    polylineAnnotation._dictionary.update('FillOpacity', fillColor.a);
                }
            }
            if (!isNullOrUndefined(shapeAnnotation.opacity)) {
                polylineAnnotation.opacity = shapeAnnotation.opacity;
            }
            var lineBorder = new PdfAnnotationBorder();
            lineBorder.width = shapeAnnotation.thickness;
            lineBorder.style = shapeAnnotation.borderStyle;
            lineBorder.dash = shapeAnnotation.borderDashArray;
            polylineAnnotation.border = lineBorder;
            polylineAnnotation.rotationAngle = this.getRotateAngle(shapeAnnotation.rotateAngle);
            polylineAnnotation.beginLineStyle = this.getLineEndingStyle(shapeAnnotation.lineHeadStart);
            polylineAnnotation.endLineStyle = this.getLineEndingStyle(shapeAnnotation.lineHeadEnd);
            var dateValue = void 0;
            if (!isNullOrUndefined(shapeAnnotation.modifiedDate) && !isNaN(Date.parse(shapeAnnotation.modifiedDate))) {
                dateValue = new Date(Date.parse(shapeAnnotation.modifiedDate));
                polylineAnnotation.modifiedDate = dateValue;
            }
            var commentsDetails = shapeAnnotation.comments;
            if (commentsDetails.length > 0) {
                for (var i = 0; i < commentsDetails.length; i++) {
                    polylineAnnotation.comments.add(this.addCommentsCollection(commentsDetails[parseInt(i.toString(), 10)], polylineAnnotation.bounds));
                }
            }
            var reviewDetails = shapeAnnotation.review;
            polylineAnnotation.reviewHistory.add(this.addReviewCollections(reviewDetails, polylineAnnotation.bounds));
            if (!isNullOrUndefined(shapeAnnotation.isCloudShape) && shapeAnnotation.isCloudShape) {
                var dictionary = new _PdfDictionary(page._crossReference);
                dictionary.update('S', _PdfName.get('C'));
                dictionary.update('I', shapeAnnotation.cloudIntensity);
                polylineAnnotation._dictionary.update('BE', dictionary);
                var rectDifferences = JSON.parse(shapeAnnotation.rectangleDifference);
                if (rectDifferences.length > 0) {
                    var rd = this.getRDValues(rectDifferences);
                    polylineAnnotation._dictionary.update('RD', rd);
                }
            }
            this.preserveIsLockProperty(shapeAnnotation, polylineAnnotation);
            polylineAnnotation.setAppearance(true);
            if (!isNullOrUndefined(shapeAnnotation.customData)) {
                polylineAnnotation.setValues('CustomData', JSON.stringify(shapeAnnotation.customData));
            }
            if (!isNullOrUndefined(shapeAnnotation.allowedInteractions)) {
                polylineAnnotation.setValues('AllowedInteractions', JSON.stringify(shapeAnnotation.allowedInteractions));
            }
            page.annotations.add(polylineAnnotation);
        }
        if (!isNullOrUndefined(shapeAnnotation.enableShapeLabel) && shapeAnnotation.enableShapeLabel) {
            var labelBounds = JSON.parse(shapeAnnotation.labelBounds.toString());
            var left = this.convertPixelToPoint(labelBounds.left);
            var top_4 = this.convertPixelToPoint(labelBounds.top);
            if (shapeAnnotation.shapeAnnotationType === 'Line') {
                top_4 = top_4 - 5;
            }
            var labelWidth = this.convertPixelToPoint(labelBounds.width);
            var labelHeight = this.convertPixelToPoint(labelBounds.height);
            var annotation = new PdfFreeTextAnnotation(top_4, left, labelWidth, labelHeight);
            annotation.author = shapeAnnotation.author;
            var dateValue = void 0;
            if (!isNullOrUndefined(shapeAnnotation.modifiedDate) && !isNaN(Date.parse(shapeAnnotation.modifiedDate))) {
                dateValue = new Date(Date.parse(shapeAnnotation.modifiedDate));
                annotation.modifiedDate = dateValue;
            }
            annotation._dictionary.set('NM', shapeAnnotation.annotName.toString() + 'freeText');
            annotation.lineEndingStyle = PdfLineEndingStyle.openArrow;
            annotation.annotationIntent = PdfAnnotationIntent.freeTextTypeWriter;
            var fontSize = 0;
            if (!isNullOrUndefined(shapeAnnotation.fontSize)) {
                fontSize = parseFloat(shapeAnnotation.fontSize);
            }
            fontSize = !isNullOrUndefined(fontSize) && !isNaN(fontSize) && fontSize > 0 ? fontSize : 16;
            var fontFamily = this.getFontFamily(shapeAnnotation.fontFamily);
            var fontJson = {};
            var fontStyle = this.getFontStyle(fontJson);
            annotation.font = new PdfStandardFont(fontFamily, this.convertPixelToPoint(fontSize), fontStyle);
            annotation.subject = 'Text Box';
            annotation.text = '';
            if (!isNullOrUndefined(shapeAnnotation.labelContent)) {
                if (shapeAnnotation.labelContent.toString() !== null) {
                    annotation.text = shapeAnnotation.labelContent.toString();
                }
            }
            annotation.rotationAngle = this.getRotateAngle(shapeAnnotation.rotateAngle);
            annotation.border = new PdfAnnotationBorder();
            if (Object.prototype.hasOwnProperty.call(shapeAnnotation, 'thickness')) {
                if (!isNullOrUndefined(shapeAnnotation.thickness)) {
                    var thickness = parseInt(shapeAnnotation.thickness.toString(), 10);
                    annotation.border.width = thickness;
                }
            }
            annotation.opacity = 1.0;
            if (Object.prototype.hasOwnProperty.call(shapeAnnotation, 'opacity')) {
                if (!isNullOrUndefined(shapeAnnotation.opacity)) {
                    annotation.opacity = parseFloat(shapeAnnotation.opacity);
                }
            }
            var color = JSON.parse(shapeAnnotation.labelBorderColor);
            var color1 = [color.r, color.g, color.b];
            annotation.borderColor = color1;
            var fillColor = JSON.parse(shapeAnnotation.labelFillColor);
            var color2 = [fillColor.r, fillColor.g, fillColor.b];
            annotation.color = color2;
            var textMarkupColor = JSON.parse(shapeAnnotation.fontColor);
            var color3 = [textMarkupColor.r, textMarkupColor.g, textMarkupColor.b];
            annotation.textMarkUpColor = color3;
            var commentsDetails = annotation.comments;
            if (commentsDetails.length > 0) {
                for (var i = 0; i < commentsDetails.length; i++) {
                    annotation.comments.add(this.addCommentsCollection(commentsDetails[parseInt(i.toString(), 10)], annotation.bounds));
                }
            }
            if (!isNullOrUndefined(shapeAnnotation.customData)) {
                annotation.setValues('CustomData', shapeAnnotation.customData);
            }
            page.annotations.add(annotation);
        }
    };
    /**
     * @private
     * @param {any} details - details
     * @param {PdfPage} page - page
     * @returns {void}
     */
    AnnotationRenderer.prototype.saveInkSignature = function (details, page) {
        var inkSignatureAnnotation = details;
        var bounds = JSON.parse(inkSignatureAnnotation.bounds);
        var stampObjects = JSON.parse(inkSignatureAnnotation.data.toString());
        var rotationAngle = this.getInkRotateAngle(page.rotation.toString());
        var left = this.convertPixelToPoint(bounds.x);
        var top = this.convertPixelToPoint(bounds.y);
        var width = this.convertPixelToPoint(bounds.width);
        var height = this.convertPixelToPoint(bounds.height);
        var opacity = inkSignatureAnnotation.opacity;
        var thickness = parseInt(inkSignatureAnnotation.thickness.toString(), 10);
        if (!isNullOrUndefined(inkSignatureAnnotation.strokeColor)) {
            var strokeColor = JSON.parse(inkSignatureAnnotation.strokeColor);
            var color = [strokeColor.r, strokeColor.g, strokeColor.b];
            inkSignatureAnnotation.color = color;
        }
        var minimumX = -1;
        var minimumY = -1;
        var maximumX = -1;
        var maximumY = -1;
        var drawingPath = new PdfPath();
        for (var p = 0; p < stampObjects.length; p++) {
            var val = stampObjects[parseInt(p.toString(), 10)];
            drawingPath.addLine(val.x, val.y, 0, 0);
        }
        var rotatedPath = this.getRotatedPathForMinMax(drawingPath._points, rotationAngle);
        for (var k = 0; k < rotatedPath.points.length; k += 2) {
            var value = rotatedPath.points[parseInt(k.toString(), 10)];
            if (minimumX === -1) {
                minimumX = value[0];
                minimumY = value[1];
                maximumX = value[0];
                maximumY = value[1];
            }
            else {
                var point1 = value[0];
                var point2 = value[1];
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
        var newDifferenceX = (maximumX - minimumX) / width;
        var newDifferenceY = (maximumY - minimumY) / height;
        if (newDifferenceX === 0) {
            newDifferenceX = 1;
        }
        else if (newDifferenceY === 0) {
            newDifferenceY = 1;
        }
        var linePoints = [];
        var isNewValues = 0;
        if (rotationAngle !== 0) {
            for (var j = 0; j < stampObjects.length; j++) {
                var val = stampObjects[parseInt(j.toString(), 10)];
                var path = val['command'].toString();
                if (path === 'M' && j !== isNewValues) {
                    isNewValues = j;
                    break;
                }
                linePoints.push((parseFloat(val['x'].toString())));
                linePoints.push((parseFloat(val['y'].toString())));
            }
            var rotatedPoints = this.getRotatedPath(linePoints, rotationAngle);
            linePoints = [];
            for (var z = 0; z < rotatedPoints._points.length; z += 2) {
                linePoints.push((rotatedPoints._points[parseInt(z.toString(), 10)][0] - minimumX) / newDifferenceX + left);
                linePoints.push(page.size[1] - (rotatedPoints._points[parseInt(z.toString(), 10)][1] - minimumY) / newDifferenceY - top);
            }
        }
        else {
            for (var j = 0; j < stampObjects.length; j++) {
                var val = stampObjects[parseInt(j.toString(), 10)];
                var path = val['command'].toString();
                if (path === 'M' && j !== isNewValues) {
                    isNewValues = j;
                    break;
                }
                linePoints.push(((val.x - minimumX) / newDifferenceX) + left);
                var newX = ((val.y - minimumY) / newDifferenceY);
                linePoints.push(page.size[1] - newX - top);
            }
        }
        var colors = [inkSignatureAnnotation.color[0], inkSignatureAnnotation.color[1], inkSignatureAnnotation.color[2]];
        var inkAnnotation = new PdfInkAnnotation([left, top, width, height], linePoints);
        var bound = new Rect();
        bound = new Rect(inkAnnotation.bounds.x, (page.size[1] - (inkAnnotation.bounds.y + inkAnnotation.bounds.height)), inkAnnotation.bounds.width, inkAnnotation.bounds.height);
        inkAnnotation.bounds = bound;
        inkAnnotation.color = colors;
        linePoints = [];
        if (isNewValues > 0) {
            if (rotationAngle !== 0) {
                var pathCollection = [];
                for (var i = isNewValues; i < stampObjects.length; i++) {
                    var val = stampObjects[parseInt(i.toString(), 10)];
                    var path = val['command'].toString();
                    if (path === 'M' && i !== isNewValues) {
                        pathCollection.push(linePoints);
                        linePoints = [];
                    }
                    linePoints.push(val['x']);
                    linePoints.push(val['y']);
                }
                if (linePoints.length > 0) {
                    pathCollection.push(linePoints);
                }
                for (var g = 0; g < pathCollection.length; g++) {
                    var graphicsPoints = [];
                    var pointsCollections = pathCollection[parseInt(g.toString(), 10)];
                    if (pointsCollections.length > 0) {
                        var rotatedPoints = this.getRotatedPath(pointsCollections, rotationAngle);
                        for (var z = 0; z < rotatedPoints._points.length; z += 2) {
                            graphicsPoints.push((rotatedPoints._points[parseInt(z.toString(), 10)][0] - minimumX) / newDifferenceX + left);
                            graphicsPoints.push(page.size[1] - (rotatedPoints._points[parseInt(z.toString(), 10)][1]
                                - minimumY) / newDifferenceY - top);
                        }
                        inkAnnotation.inkPointsCollection.push(graphicsPoints);
                    }
                    graphicsPoints = [];
                }
            }
            else {
                for (var i = isNewValues; i < stampObjects.length; i++) {
                    var val = stampObjects[parseInt(i.toString(), 10)];
                    var path = val['command'].toString();
                    if (path === 'M' && i !== isNewValues) {
                        inkAnnotation.inkPointsCollection.push(linePoints);
                        linePoints = [];
                    }
                    linePoints.push((val['x'] - minimumX) / newDifferenceX + left);
                    var newX = ((val['y'] - minimumY) / newDifferenceY);
                    linePoints.push(page.size[1] - newX - top);
                }
                if (linePoints.length > 0) {
                    inkAnnotation.inkPointsCollection.push(linePoints);
                }
            }
        }
        var isLock = this.checkAnnotationLock(inkSignatureAnnotation);
        if (isNullOrUndefined(inkSignatureAnnotation.author) || (isNullOrUndefined(inkSignatureAnnotation.author) && inkSignatureAnnotation.author === '')) {
            inkSignatureAnnotation.author = 'Guest';
        }
        else {
            inkAnnotation.author = !isNullOrUndefined(inkSignatureAnnotation.author) ? inkSignatureAnnotation.author.toString() !== '' ? inkSignatureAnnotation.author.toString() : 'Guest' : 'Guest';
        }
        if (!isNullOrUndefined(inkSignatureAnnotation.subject) && inkSignatureAnnotation.subject !== '') {
            inkAnnotation.subject = inkSignatureAnnotation.subject.toString();
        }
        if (!isNullOrUndefined(inkSignatureAnnotation.note)) {
            inkAnnotation.text = inkSignatureAnnotation.note.toString();
        }
        else if (!isNullOrUndefined(inkSignatureAnnotation.notes)) {
            inkAnnotation.text = inkSignatureAnnotation.notes.toString();
        }
        var dateValue;
        if (!isNullOrUndefined(inkSignatureAnnotation.modifiedDate) && !isNaN(Date.parse(inkSignatureAnnotation.modifiedDate))) {
            dateValue = new Date(Date.parse(inkSignatureAnnotation.modifiedDate));
            inkAnnotation.modifiedDate = dateValue;
        }
        var reviewDetails = inkSignatureAnnotation.review;
        inkAnnotation.reviewHistory.add(this.addReviewCollections(reviewDetails, inkAnnotation.bounds));
        var commentsDetails = inkSignatureAnnotation.comments;
        if (commentsDetails.length > 0) {
            for (var i = 0; i < commentsDetails.length; i++) {
                inkAnnotation.comments.add(this.addCommentsCollection(commentsDetails[parseInt(i.toString(), 10)], inkAnnotation.bounds));
            }
        }
        this.preserveIsLockProperty(inkSignatureAnnotation, inkAnnotation);
        inkAnnotation.border.width = thickness;
        inkAnnotation.opacity = opacity;
        inkAnnotation._isEnableControlPoints = false;
        inkAnnotation._dictionary.set('NM', inkSignatureAnnotation.annotName.toString());
        inkAnnotation.rotationAngle = this.getRotateAngle(inkSignatureAnnotation.rotationAngle);
        if (!isNullOrUndefined(inkSignatureAnnotation.customData)) {
            inkAnnotation.setValues('CustomData', JSON.stringify(inkSignatureAnnotation.customData));
        }
        inkAnnotation.setAppearance(true);
        page.annotations.add(inkAnnotation);
        return inkSignatureAnnotation;
    };
    /**
     * @private
     * @param {number[]} linePoints - points
     * @param {number} rotationAngle - rotateAngle
     * @returns {PdfPath} - graphicsPath
     */
    AnnotationRenderer.prototype.getRotatedPath = function (linePoints, rotationAngle) {
        var docPath = this.getRotatedPoints(linePoints, rotationAngle);
        var graphicsPath = new PdfPath();
        for (var j = 0; j < docPath.points.length; j += 2) {
            graphicsPath.addLine(docPath.points[parseInt(j.toString(), 10)][0], docPath.points[parseInt(j.toString(), 10)][1], docPath.points[parseInt((j + 1).toString(), 10)][0], docPath.points[j + 1][1]);
        }
        return graphicsPath;
    };
    AnnotationRenderer.prototype.getRotationMatrix = function (angleInDegrees) {
        var angleInRadians = angleInDegrees * (Math.PI / 180);
        var cosTheta = Math.cos(angleInRadians);
        var sinTheta = Math.sin(angleInRadians);
        return [
            [cosTheta, -sinTheta, 0],
            [sinTheta, cosTheta, 0],
            [0, 0, 1]
        ];
    };
    AnnotationRenderer.prototype.getRotatedPoints = function (pointsCollection, rotationAngle) {
        var graphicsPath = new Path();
        for (var j = 0; j < pointsCollection.length; j += 2) {
            graphicsPath.moveTo(pointsCollection[parseInt(j.toString(), 10)], pointsCollection[parseInt((j + 1).toString(), 10)]);
            graphicsPath.lineTo(0, 0);
        }
        var rotationMatrix = this.getRotationMatrix(rotationAngle);
        graphicsPath.transform(rotationMatrix);
        return graphicsPath;
    };
    /**
     * Rotates a path based on the provided points collection and rotation angle.
     * @param {number[]} pointsCollection - The collection of points to be rotated.
     * @param {number} rotationAngle - The angle to rotate the points, in degrees.
     * @returns {Path} - The rotated graphics path.
     * @private
     */
    AnnotationRenderer.prototype.getRotatedPathForMinMax = function (pointsCollection, rotationAngle) {
        var graphicsPath = new Path();
        for (var j = 0; j < pointsCollection.length; j += 2) {
            graphicsPath.moveTo(pointsCollection[parseInt(j.toString(), 10)][0], pointsCollection[parseInt(j.toString(), 10)][1]);
            graphicsPath.lineTo(pointsCollection[parseInt((j + 1).toString(), 10)][0], pointsCollection[parseInt((j + 1).toString(), 10)][1]);
        }
        var rotationMatrix = this.getRotationMatrix(rotationAngle);
        graphicsPath.transform(rotationMatrix);
        return graphicsPath;
    };
    /**
     * @param {any} details -details
     * @param {PdfDocument} loadedDocument - loadedDocument
     * @private
     * @returns {void}
     */
    AnnotationRenderer.prototype.addTextMarkup = function (details, loadedDocument) {
        var markupAnnotation = details;
        var pageNo = parseInt(markupAnnotation['pageNumber'].toString(), 10);
        var page = loadedDocument.getPage(pageNo);
        var annotationtypes = new PdfTextMarkupAnnotation();
        switch (markupAnnotation.textMarkupAnnotationType.toString()) {
            case 'Highlight':
                annotationtypes.textMarkupType = PdfTextMarkupAnnotationType.highlight;
                break;
            case 'Strikethrough':
                annotationtypes.textMarkupType = PdfTextMarkupAnnotationType.strikeOut;
                break;
            case 'Underline':
                annotationtypes.textMarkupType = PdfTextMarkupAnnotationType.underline;
                break;
            case 'Squiggly':
                annotationtypes.textMarkupType = PdfTextMarkupAnnotationType.squiggly;
                break;
        }
        var bounds = JSON.parse(markupAnnotation.bounds);
        var boundsCollection = [];
        for (var i = 0; i < bounds.length; i++) {
            var bound = bounds[parseInt(i.toString(), 10)];
            var cropValues = this.getCropBoxValue(page, true);
            if (!isNullOrUndefined(bound['left'])) {
                boundsCollection.push(new Rect(cropValues.x + this.convertPixelToPoint(bound['left']), cropValues.y + this.convertPixelToPoint(bound['top']), Object.prototype.hasOwnProperty.call(bound, 'width') ? this.convertPixelToPoint(bound['width']) : 0, Object.prototype.hasOwnProperty.call(bound, 'height') ? this.convertPixelToPoint(bound['height']) : 0));
            }
        }
        var annotation = new PdfTextMarkupAnnotation(null, 0, 0, 0, 0);
        if (boundsCollection.length > 0) {
            annotation.bounds = { x: boundsCollection[0].x, y: boundsCollection[0].y,
                width: boundsCollection[0].width, height: boundsCollection[0].height };
        }
        annotation.textMarkupType = annotationtypes.textMarkupType;
        var isLock = this.checkAnnotationLock(markupAnnotation);
        if (isNullOrUndefined(markupAnnotation.author) || (isNullOrUndefined(markupAnnotation.author) && markupAnnotation.author === '')) {
            markupAnnotation.author = 'Guest';
        }
        else {
            annotation.author = !isNullOrUndefined(markupAnnotation.author) ? markupAnnotation.author.toString() !== '' ? markupAnnotation.author.toString() : 'Guest' : 'Guest';
        }
        if (!isNullOrUndefined(markupAnnotation.subject) && markupAnnotation.subject !== '') {
            annotation.subject = markupAnnotation.subject.toString();
        }
        if (!isNullOrUndefined(markupAnnotation.note)) {
            annotation.text = markupAnnotation.note.toString();
        }
        if (!isNullOrUndefined(markupAnnotation.annotationRotation)) {
            annotation.rotateAngle = this.getRotateAngle(markupAnnotation.annotationRotation);
        }
        var dateValue;
        if (!isNullOrUndefined(markupAnnotation.modifiedDate) && !isNaN(Date.parse(markupAnnotation.modifiedDate))) {
            dateValue = new Date(Date.parse(markupAnnotation.modifiedDate));
            annotation.modifiedDate = dateValue;
        }
        annotation._dictionary.set('NM', markupAnnotation.annotName.toString());
        if (!isNullOrUndefined(markupAnnotation.color)) {
            var annotColor = JSON.parse(markupAnnotation.color);
            var color = [annotColor.r, annotColor.g, annotColor.b];
            annotation.color = color;
        }
        if (!isNullOrUndefined(markupAnnotation.opacity)) {
            annotation.opacity = markupAnnotation.opacity;
        }
        if (boundsCollection.length > 0) {
            // Don't need to set bounds explicitly for text markup annotation
            var boundArrayCollection = [];
            for (var i = 0; i < boundsCollection.length; i++) {
                var _a = boundsCollection[parseInt(i.toString(), 10)], x = _a.x, y = _a.y, width = _a.width, height = _a.height;
                if (x !== 0 && y !== 0 && width !== 0 && height !== 0) {
                    boundArrayCollection.push([x, y, width, height]);
                }
            }
            annotation.boundsCollection = boundArrayCollection;
        }
        var commentsDetails = markupAnnotation.comments;
        if (commentsDetails.length > 0) {
            for (var i = 0; i < commentsDetails.length; i++) {
                annotation.comments.add(this.addCommentsCollection(commentsDetails[parseInt(i.toString(), 10)], annotation.bounds));
            }
        }
        var reviewDetails = markupAnnotation.review;
        annotation.reviewHistory.add(this.addReviewCollections(reviewDetails, annotation.bounds));
        if (!isNullOrUndefined(markupAnnotation.color)) {
            var annotColor = JSON.parse(markupAnnotation.color);
            var color = [annotColor.r, annotColor.g, annotColor.b];
            annotation.textMarkUpColor = color;
        }
        this.preserveIsLockProperty(markupAnnotation, annotation);
        if (!isNullOrUndefined(markupAnnotation.customData)) {
            annotation.setValues('CustomData', JSON.stringify(markupAnnotation.customData));
        }
        if (!isNullOrUndefined(markupAnnotation.allowedInteractions)) {
            annotation.setValues('AllowedInteractions', JSON.stringify(markupAnnotation.allowedInteractions));
        }
        if (!isNullOrUndefined(markupAnnotation.textMarkupContent)) {
            annotation._dictionary.set('TextMarkupContent', markupAnnotation.textMarkupContent.toString());
        }
        annotation.setAppearance(true);
        page.annotations.add(annotation);
    };
    /**
     * @private
     * @param {PdfPage} page - page
     * @param {boolean} isPath - path
     * @returns {PointBase} - points
     */
    AnnotationRenderer.prototype.getCropBoxValue = function (page, isPath) {
        var cropBoxX = 0;
        var cropBoxY = 0;
        if (page != null) {
            cropBoxX = !isPath ? page.cropBox[0] : 0;
            cropBoxY = !isPath ? page.cropBox[1] : 0;
        }
        return { x: cropBoxX, y: cropBoxY };
    };
    AnnotationRenderer.prototype.getBothCropBoxValue = function (page) {
        var cropBoxX = page.cropBox[0];
        var cropBoxY = page.cropBox[1];
        return [cropBoxX, cropBoxY];
    };
    AnnotationRenderer.prototype.preserveIsLockProperty = function (annotation, annotPDF) {
        var isLock = this.checkAnnotationLock(annotation);
        var isPrint = false;
        var isCommentLock = false;
        if (annotation.isCommentLock && annotation['isCommentLock'] !== null) {
            isCommentLock = Boolean(annotation['isCommentLock'].toString());
        }
        if (annotation.isPrint && annotation['isPrint'] !== null) {
            isPrint = Boolean(annotation['isPrint'].toString());
        }
        if ((!isNullOrUndefined(annotation.isLocked) && annotation.isLocked) || isLock) {
            isLock = true;
        }
        if (isLock && isCommentLock && isPrint) {
            annotPDF.flags = PdfAnnotationFlag.locked | PdfAnnotationFlag.print | PdfAnnotationFlag.readOnly;
        }
        else if (isLock && isCommentLock) {
            annotPDF.flags = PdfAnnotationFlag.locked | PdfAnnotationFlag.readOnly;
        }
        else if (isLock && isPrint) {
            annotPDF.flags = PdfAnnotationFlag.locked | PdfAnnotationFlag.print;
        }
        else if (isCommentLock && isPrint) {
            annotPDF.flags = PdfAnnotationFlag.print | PdfAnnotationFlag.readOnly;
        }
        else if (isLock) {
            annotPDF.flags = PdfAnnotationFlag.locked;
        }
        else if (isCommentLock) {
            annotPDF.flags = PdfAnnotationFlag.readOnly;
        }
        else {
            annotPDF.flags = PdfAnnotationFlag.print;
        }
    };
    /**
     * @private
     * @param {any} details - details
     * @param {PdfPage} page - page
     * @returns {void}
     */
    AnnotationRenderer.prototype.addCustomStampAnnotation = function (details, page) {
        var stampAnnotation = details;
        var bounds = JSON.parse(stampAnnotation.bounds);
        var pageNo = parseInt(stampAnnotation['pageNumber'].toString(), 10);
        var cropValues = this.getCropBoxValue(page, false);
        var left = 0;
        var top = 0;
        var graphics = page.graphics;
        var isTemplate = (!isNullOrUndefined(stampAnnotation.template) && (stampAnnotation.template !== '')) ? true : false;
        if (Object.prototype.hasOwnProperty.call(stampAnnotation, 'wrapperBounds') && !isTemplate) {
            var wrapperBounds = stampAnnotation.wrapperBounds;
            var boundsXY = this.calculateBoundsXY(wrapperBounds, bounds, pageNo, page);
            left = boundsXY.x;
            top = boundsXY.y;
        }
        else {
            left = this.convertPixelToPoint(bounds.left);
            top = this.convertPixelToPoint(bounds.top);
        }
        var cropX = 0;
        var cropY = 0;
        if (cropValues.x !== 0 && cropValues.y !== 0 && cropValues.x === left) {
            cropX = cropValues.x;
            cropY = cropValues.y;
        }
        else if (cropValues.x === 0 && page.cropBox[2] === page.size[0] && cropValues.y === page.size[1]) {
            cropX = cropValues.x;
            cropY = cropValues.y;
        }
        left += cropX;
        top += cropY;
        var width = this.convertPixelToPoint(bounds.width);
        var height = this.convertPixelToPoint(bounds.height);
        if (!isNullOrUndefined(stampAnnotation.stampAnnotationType) && (stampAnnotation.stampAnnotationType === 'image') && (stampAnnotation.stampAnnotationPath !== ' ') && !isTemplate) {
            if (page.rotation === PdfRotationAngle.angle90 || page.rotation === PdfRotationAngle.angle270) {
                width = this.convertPixelToPoint((bounds.height));
                height = this.convertPixelToPoint((bounds.width));
            }
        }
        var opacity = stampAnnotation.opacity;
        var rotateAngle = stampAnnotation.rotateAngle;
        var isLock = false;
        if (Object.prototype.hasOwnProperty.call(stampAnnotation, 'annotationSettings') && !isNullOrUndefined(stampAnnotation.annotationSettings)) {
            var annotationSettings = stampAnnotation.annotationSettings;
            if (!isNullOrUndefined(annotationSettings.isLock)) {
                isLock = annotationSettings.isLock;
            }
        }
        if (!isNullOrUndefined(stampAnnotation.stampAnnotationType) && (stampAnnotation.stampAnnotationType === 'image') && (stampAnnotation.stampAnnotationPath !== ' ') || isTemplate) {
            var rubberStampAnnotation = new PdfRubberStampAnnotation(left, top, width, height);
            page.annotations.add(rubberStampAnnotation);
            if (isTemplate) {
                var appearance = rubberStampAnnotation.appearance.normal;
                var dictionary = new _PdfDictionary(page._crossReference);
                var state = appearance.graphics.save();
                appearance.graphics.setTransparency(opacity);
                var template = new PdfTemplate(stampAnnotation.template, dictionary._crossReference);
                template._isExported = true;
                template._appearance = stampAnnotation.template;
                template._crossReference = dictionary._crossReference;
                template._size = [stampAnnotation.templateSize[0], stampAnnotation.templateSize[1]];
                var bounds_1 = { x: 0, y: 0, width: width, height: height };
                appearance.graphics.drawTemplate(template, bounds_1);
                appearance.graphics.restore(state);
            }
            else {
                var imageUrl = (stampAnnotation['stampAnnotationPath'].toString()).split(',')[1];
                var bytes = _decode(imageUrl, false);
                var bitmap = void 0;
                if (bytes && bytes.length > 2 && ((bytes[0] === 255 && bytes[1] === 216) || (bytes[0] === 137 && bytes[1] === 80 &&
                    bytes[2] === 78 && bytes[3] === 71 && bytes[4] === 13 && bytes[5] === 10 && bytes[6] === 26 && bytes[7] === 10))) {
                    bitmap = new PdfBitmap(bytes);
                    var appearance = rubberStampAnnotation.appearance.normal;
                    var state = appearance.graphics.save();
                    appearance.graphics.setTransparency(opacity);
                    appearance.graphics.drawImage(bitmap, 0, 0, width, height);
                    appearance.graphics.restore(state);
                }
                else {
                    var appearance = rubberStampAnnotation.appearance;
                    var filterAnnot = this.pdfViewerBase.pngData.filter(function (nameStamp) { return nameStamp.name === stampAnnotation.annotName; });
                    var dictionary = filterAnnot[0]._dictionary.get('AP');
                    var pngDictionary = dictionary.get('N');
                    appearance.normal = new PdfTemplate(pngDictionary, page._crossReference);
                }
                rubberStampAnnotation.rotationAngle = this.getRubberStampRotateAngle(page.rotation, rotateAngle);
            }
            rubberStampAnnotation.opacity = opacity;
            if (!isNullOrUndefined(stampAnnotation.note)) {
                rubberStampAnnotation.text = stampAnnotation.note.toString();
            }
            rubberStampAnnotation._dictionary.set('NM', stampAnnotation.annotName.toString());
            var dateValue = void 0;
            if (!isNullOrUndefined(stampAnnotation.modifiedDate) && !isNaN(Date.parse(stampAnnotation.modifiedDate))) {
                dateValue = new Date(Date.parse(stampAnnotation.modifiedDate));
                rubberStampAnnotation.modifiedDate = dateValue;
            }
            var commentsDetails = stampAnnotation.comments;
            if (commentsDetails.length > 0) {
                for (var i = 0; i < commentsDetails.length; i++) {
                    rubberStampAnnotation.comments.add(this.addCommentsCollection(commentsDetails[parseInt(i.toString(), 10)], rubberStampAnnotation.bounds));
                }
            }
            var reviewDetails = stampAnnotation.review;
            rubberStampAnnotation.reviewHistory.add(this.addReviewCollections(reviewDetails, rubberStampAnnotation.bounds));
            if (!isNullOrUndefined(stampAnnotation.author) && stampAnnotation.author) {
                rubberStampAnnotation.author = stampAnnotation.author.toString();
            }
            if (!isNullOrUndefined(stampAnnotation.subject) && stampAnnotation.subject) {
                rubberStampAnnotation.subject = stampAnnotation.subject.toString();
            }
            this.preserveIsLockProperty(stampAnnotation, rubberStampAnnotation);
            if (!isNullOrUndefined(stampAnnotation.customData)) {
                rubberStampAnnotation.setValues('CustomData', JSON.stringify(stampAnnotation.customData));
            }
            if (!isNullOrUndefined(stampAnnotation.icon)) {
                rubberStampAnnotation.setValues('iconName', stampAnnotation.icon);
            }
        }
        else {
            var icon = stampAnnotation.icon.toString();
            var stampColor = stampAnnotation.stampFillcolor.toString();
            var fillColor = !isNullOrUndefined(stampAnnotation.fillColor) ? stampAnnotation.fillColor.toString() : '#192760';
            var isDynamic = stampAnnotation.isDynamicStamp.toString();
            var textBrush = new PdfBrush([0, 0, 0]);
            var colors = [];
            if (fillColor === '#192760') {
                colors = [25, 39, 96];
            }
            else if (fillColor === '#516c30') {
                colors = [81, 108, 48];
            }
            else if (fillColor === '#8a251a') {
                colors = [138, 37, 26];
            }
            textBrush = new PdfBrush(colors);
            var stampBrush = new PdfBrush([0, 0, 0]);
            var stampcolors = [];
            if (stampColor === '#e6eddf') {
                stampcolors = [230, 237, 223];
            }
            else if (stampColor === '#f6dedd') {
                stampcolors = [246, 222, 221];
            }
            else if (stampColor === '#dce3ef') {
                stampcolors = [220, 227, 239];
            }
            textBrush = new PdfBrush(colors);
            stampBrush = new PdfBrush(stampcolors);
            var pens = new PdfPen(colors, 1);
            var rectangle = new Rect(left, top, width, height);
            if (page.rotation === PdfRotationAngle.angle90 || page.rotation === PdfRotationAngle.angle270) {
                rectangle = new Rect(left, top, height, width);
            }
            var rubberStampAnnotation = new PdfRubberStampAnnotation;
            rubberStampAnnotation.bounds = rectangle;
            if (!isNullOrUndefined(stampAnnotation.subject) && stampAnnotation.subject) {
                rubberStampAnnotation.subject = stampAnnotation.subject.toString();
            }
            if (!isNullOrUndefined(stampAnnotation.note)) {
                rubberStampAnnotation.text = stampAnnotation.note.toString();
            }
            rubberStampAnnotation._dictionary.set('NM', stampAnnotation.annotName.toString());
            var dateValue = void 0;
            if (!isNullOrUndefined(stampAnnotation.modifiedDate) && !isNaN(Date.parse(stampAnnotation.modifiedDate))) {
                dateValue = new Date(Date.parse(stampAnnotation.modifiedDate));
                rubberStampAnnotation.modifiedDate = dateValue;
            }
            var commentsDetails = stampAnnotation.comments;
            if (commentsDetails.length > 0) {
                for (var i = 0; i < commentsDetails.length; i++) {
                    rubberStampAnnotation.comments.add(this.addCommentsCollection(commentsDetails[parseInt(i.toString(), 10)], rubberStampAnnotation.bounds));
                }
            }
            var reviewDetails = stampAnnotation.review;
            rubberStampAnnotation.reviewHistory.add(this.addReviewCollections(reviewDetails, rubberStampAnnotation.bounds));
            var isIconExists = false;
            if (isDynamic !== 'true') {
                isIconExists = this.getIconName(stampAnnotation, icon, rubberStampAnnotation);
            }
            var graphicsPath = void 0;
            if (icon.trim() === 'Accepted' || icon.trim() === 'Rejected') {
                graphicsPath = this.drawStampAsPath(stampAnnotation.stampAnnotationPath, rubberStampAnnotation, textBrush, stampBrush);
            }
            else if (isIconExists) {
                if (page.rotation === PdfRotationAngle.angle90 || page.rotation === PdfRotationAngle.angle270) {
                    rubberStampAnnotation.bounds = rectangle;
                }
                rubberStampAnnotation.rotationAngle = this.getRubberStampRotateAngle(page.rotation, stampAnnotation.rotateAngle);
            }
            if (!isNullOrUndefined(stampAnnotation.modifiedDate) && !isNaN(Date.parse(stampAnnotation.modifiedDate))) {
                var dateValue_1;
                if (!isNullOrUndefined(stampAnnotation.modifiedDate) && !isNaN(Date.parse(stampAnnotation.modifiedDate))) {
                    dateValue_1 = new Date(Date.parse(stampAnnotation.modifiedDate));
                    rubberStampAnnotation.modifiedDate = dateValue_1;
                }
            }
            rubberStampAnnotation.opacity = opacity;
            rubberStampAnnotation.author = !isNullOrUndefined(stampAnnotation.author) && stampAnnotation.author.toString() !== '' ? stampAnnotation.author.toString() : 'Guest';
            this.preserveIsLockProperty(stampAnnotation, rubberStampAnnotation);
            if (!isNullOrUndefined(stampAnnotation.customData)) {
                rubberStampAnnotation.setValues('CustomData', JSON.stringify(stampAnnotation.customData));
            }
            if (!isNullOrUndefined(stampAnnotation.rotateAngle)) {
                rubberStampAnnotation.setValues('rotateAngle', stampAnnotation.rotateAngle.toString());
            }
            if (!isNullOrUndefined(stampAnnotation.icon)) {
                rubberStampAnnotation.setValues('iconName', stampAnnotation.icon.toString());
            }
            page.annotations.add(rubberStampAnnotation);
            if (!isIconExists) {
                var appearance = rubberStampAnnotation.appearance.normal;
                appearance.graphics.drawRoundedRectangle(0, 0, rectangle.width, rectangle.height, 10, pens, stampBrush);
                if (isDynamic === 'true') {
                    var text = stampAnnotation.dynamicText.toString();
                    var state = appearance.graphics.save();
                    appearance.graphics.setTransparency(opacity);
                    this.renderDynamicStamp(rubberStampAnnotation, icon, text, textBrush, rectangle, pens, page);
                    appearance.graphics.restore(state);
                    rubberStampAnnotation._dictionary.set('Name', _PdfName.get('#23D' + icon.split(' ').join('')));
                }
                else {
                    this.retriveDefaultWidth(icon.trim());
                    var state = appearance.graphics.save();
                    appearance.graphics.setTransparency(opacity);
                    this.renderSignHereStamp(rubberStampAnnotation, rectangle, icon, textBrush, page, pens, graphicsPath);
                    appearance.graphics.restore(state);
                }
                rubberStampAnnotation.rotationAngle = this.getRubberStampRotateAngle(page.rotation, rotateAngle);
            }
        }
    };
    /**
     * @param {any} details - details
     * @param {PdfPage} page - page
     * @private
     * @returns {void}
     */
    AnnotationRenderer.prototype.addMeasure = function (details, page) {
        var measureShapeAnnotation = details;
        if (!isNullOrUndefined(measureShapeAnnotation.shapeAnnotationType) && measureShapeAnnotation.shapeAnnotationType === 'Line') {
            var points = JSON.parse(measureShapeAnnotation.vertexPoints);
            var linePoints = this.getSaveVertexPoints(points, page);
            var lineAnnotation = new PdfLineAnnotation(linePoints);
            if (!isNullOrUndefined(measureShapeAnnotation.note)) {
                lineAnnotation.text = measureShapeAnnotation.note.toString();
            }
            lineAnnotation.author = !isNullOrUndefined(measureShapeAnnotation.author) && measureShapeAnnotation.author.toString() !== '' ? measureShapeAnnotation.author.toString() : 'Guest';
            if (!isNullOrUndefined(measureShapeAnnotation.subject)) {
                lineAnnotation.subject = measureShapeAnnotation.subject.toString();
            }
            lineAnnotation.lineIntent = PdfLineIntent.lineDimension;
            if (!isNullOrUndefined(measureShapeAnnotation.annotName)) {
                lineAnnotation.name = measureShapeAnnotation.annotName.toString();
            }
            if (!isNullOrUndefined(measureShapeAnnotation.strokeColor)) {
                var strokeColor = JSON.parse(measureShapeAnnotation.strokeColor);
                lineAnnotation.color = [strokeColor.r, strokeColor.g, strokeColor.b];
            }
            if (!isNullOrUndefined(measureShapeAnnotation.fillColor)) {
                var fillColor = JSON.parse(measureShapeAnnotation.fillColor);
                if (!this.isTransparentColor(fillColor)) {
                    var innerColor = [fillColor.r, fillColor.g, fillColor.b];
                    lineAnnotation.innerColor = innerColor;
                }
                if (fillColor.a < 1 && fillColor.a > 0) {
                    lineAnnotation._dictionary.update('FillOpacity', fillColor.a);
                    fillColor.a = 1;
                }
                else {
                    lineAnnotation._dictionary.update('FillOpacity', fillColor.a);
                }
            }
            if (!isNullOrUndefined(measureShapeAnnotation.opacity)) {
                lineAnnotation.opacity = measureShapeAnnotation.opacity;
            }
            var lineBorder = new PdfAnnotationBorder();
            lineBorder.width = measureShapeAnnotation.thickness;
            if (!isNullOrUndefined(measureShapeAnnotation.borderStyle) && measureShapeAnnotation.borderStyle !== '') {
                lineBorder.style = this.getBorderStyle(measureShapeAnnotation.borderStyle);
            }
            if (!isNullOrUndefined(measureShapeAnnotation.borderDashArray)) {
                lineBorder.dash = [measureShapeAnnotation.borderDashArray, measureShapeAnnotation.borderDashArray];
            }
            lineAnnotation.border = lineBorder;
            lineAnnotation.rotationAngle = this.getRotateAngle(measureShapeAnnotation.rotateAngle);
            lineAnnotation.lineEndingStyle.begin = this.getLineEndingStyle(measureShapeAnnotation.lineHeadStart);
            lineAnnotation.lineEndingStyle.end = this.getLineEndingStyle(measureShapeAnnotation.lineHeadEnd);
            var dateValue = void 0;
            if (!isNullOrUndefined(measureShapeAnnotation.modifiedDate) && !isNaN(Date.parse(measureShapeAnnotation.modifiedDate))) {
                dateValue = new Date(Date.parse(measureShapeAnnotation.modifiedDate));
                lineAnnotation.modifiedDate = dateValue;
            }
            lineAnnotation.caption.type = this.getCaptionType(measureShapeAnnotation.captionPosition);
            var hasUniCode = /[\u0600-\u06FF]/.test(lineAnnotation.text);
            lineAnnotation.caption.cap = !hasUniCode && measureShapeAnnotation.caption;
            lineAnnotation.leaderExt = measureShapeAnnotation.leaderLength;
            lineAnnotation.leaderLine = measureShapeAnnotation.leaderLineExtension;
            var commentsDetails = measureShapeAnnotation.comments;
            var bounds = JSON.parse(measureShapeAnnotation.bounds);
            lineAnnotation.bounds = bounds;
            lineAnnotation.bounds.x = bounds.left;
            lineAnnotation.bounds.y = bounds.top;
            if (commentsDetails.length > 0) {
                for (var i = 0; i < commentsDetails.length; i++) {
                    lineAnnotation.comments.add(this.addCommentsCollection(commentsDetails[parseInt(i.toString(), 10)], lineAnnotation.bounds));
                }
            }
            var reviewDetails = measureShapeAnnotation.review;
            lineAnnotation.reviewHistory.add(this.addReviewCollections(reviewDetails, lineAnnotation.bounds));
            lineAnnotation._dictionary.update('LLO', measureShapeAnnotation.leaderLineOffset);
            this.preserveIsLockProperty(measureShapeAnnotation, lineAnnotation);
            var measureDetail = JSON.parse(measureShapeAnnotation.calibrate);
            if (!isNullOrUndefined(measureDetail)) {
                lineAnnotation._dictionary.set('Measure', this.setMeasureDictionary(measureDetail));
            }
            if (!isNullOrUndefined(measureShapeAnnotation.customData)) {
                lineAnnotation.setValues('CustomData', JSON.stringify(measureShapeAnnotation.customData));
            }
            if (measureShapeAnnotation.allowedInteractions && measureShapeAnnotation['allowedInteractions'] != null) {
                lineAnnotation.setValues('AllowedInteractions', JSON.stringify(measureShapeAnnotation['allowedInteractions']));
            }
            lineAnnotation.setAppearance(true);
            page.annotations.add(lineAnnotation);
        }
        else if (!isNullOrUndefined(measureShapeAnnotation.shapeAnnotationType) && measureShapeAnnotation.shapeAnnotationType === 'Polyline') {
            var points = JSON.parse(measureShapeAnnotation.vertexPoints);
            var linePoints = this.getSaveVertexPoints(points, page);
            var polylineAnnotation = new PdfPolyLineAnnotation(linePoints);
            polylineAnnotation.author = !isNullOrUndefined(measureShapeAnnotation.author) && measureShapeAnnotation.author.toString() !== '' ? measureShapeAnnotation.author.toString() : 'Guest';
            if (!isNullOrUndefined(measureShapeAnnotation.note)) {
                polylineAnnotation.text = measureShapeAnnotation.note.toString();
            }
            polylineAnnotation._dictionary.set('NM', measureShapeAnnotation.annotName.toString());
            if (!isNullOrUndefined(measureShapeAnnotation.subject)) {
                polylineAnnotation.subject = measureShapeAnnotation.subject.toString();
            }
            if (!isNullOrUndefined(measureShapeAnnotation.strokeColor)) {
                var strokeColor = JSON.parse(measureShapeAnnotation.strokeColor);
                var color = [strokeColor.r, strokeColor.g, strokeColor.b];
                polylineAnnotation.color = color;
            }
            if (!isNullOrUndefined(measureShapeAnnotation.fillColor)) {
                var fillColor = JSON.parse(measureShapeAnnotation.fillColor);
                if (!this.isTransparentColor(fillColor)) {
                    var innerColor = [fillColor.r, fillColor.g, fillColor.b];
                    polylineAnnotation.innerColor = innerColor;
                }
                if (fillColor.a < 1 && fillColor.a > 0) {
                    polylineAnnotation._dictionary.update('FillOpacity', fillColor.a);
                    fillColor.a = 1;
                }
                else {
                    polylineAnnotation._dictionary.update('FillOpacity', fillColor.a);
                }
            }
            if (!isNullOrUndefined(measureShapeAnnotation.opacity)) {
                polylineAnnotation.opacity = measureShapeAnnotation.opacity;
            }
            var lineBorder = new PdfAnnotationBorder();
            lineBorder.width = measureShapeAnnotation.thickness;
            lineBorder.style = this.getBorderStyle(measureShapeAnnotation.borderStyle);
            lineBorder.dash = measureShapeAnnotation.borderDashArray;
            polylineAnnotation.border = lineBorder;
            polylineAnnotation.rotationAngle = this.getRotateAngle(measureShapeAnnotation.rotateAngle);
            polylineAnnotation.beginLineStyle = this.getLineEndingStyle(measureShapeAnnotation.lineHeadStart);
            polylineAnnotation.endLineStyle = this.getLineEndingStyle(measureShapeAnnotation.lineHeadEnd);
            var dateValue = void 0;
            if (!isNullOrUndefined(measureShapeAnnotation.modifiedDate) && !isNaN(Date.parse(measureShapeAnnotation.modifiedDate))) {
                dateValue = new Date(Date.parse(measureShapeAnnotation.modifiedDate));
                polylineAnnotation.modifiedDate = dateValue;
            }
            var commentsDetails = measureShapeAnnotation.comments;
            var bounds = JSON.parse(measureShapeAnnotation.bounds);
            polylineAnnotation.bounds = bounds;
            polylineAnnotation.bounds.x = bounds.left;
            polylineAnnotation.bounds.y = bounds.top;
            if (commentsDetails.length > 0) {
                for (var i = 0; i < commentsDetails.length; i++) {
                    polylineAnnotation.comments.add(this.addCommentsCollection(commentsDetails[parseInt(i.toString(), 10)], polylineAnnotation.bounds));
                }
            }
            var reviewDetails = measureShapeAnnotation.review;
            polylineAnnotation.reviewHistory.add(this.addReviewCollections(reviewDetails, polylineAnnotation.bounds));
            polylineAnnotation._dictionary.set('IT', _PdfName.get(measureShapeAnnotation.indent.toString()));
            if (!isNullOrUndefined(measureShapeAnnotation.isCloudShape) && measureShapeAnnotation.isCloudShape) {
                var dictionary = new _PdfDictionary(page._crossReference);
                dictionary.update('S', _PdfName.get('C'));
                dictionary.update('I', measureShapeAnnotation.cloudIntensity);
                polylineAnnotation._dictionary.update('BE', dictionary);
                var rectDifferences = JSON.parse(measureShapeAnnotation.rectangleDifference);
                if (rectDifferences.length > 0) {
                    var rd = this.getRDValues(rectDifferences);
                    polylineAnnotation._dictionary.update('RD', rd);
                }
            }
            this.preserveIsLockProperty(measureShapeAnnotation, polylineAnnotation);
            var measureDetail = JSON.parse(measureShapeAnnotation.calibrate);
            if (!isNullOrUndefined(measureDetail)) {
                polylineAnnotation._dictionary.set('Measure', this.setMeasureDictionary(measureDetail));
            }
            if (!isNullOrUndefined(measureShapeAnnotation.customData)) {
                polylineAnnotation.setValues('CustomData', JSON.stringify(measureShapeAnnotation.customData));
            }
            if (measureShapeAnnotation.allowedInteractions && measureShapeAnnotation['allowedInteractions'] !== null) {
                polylineAnnotation.setValues('AllowedInteractions', JSON.stringify(measureShapeAnnotation['allowedInteractions']));
            }
            polylineAnnotation.setAppearance(true);
            page.annotations.add(polylineAnnotation);
        }
        else if (!isNullOrUndefined(measureShapeAnnotation.shapeAnnotationType) && (measureShapeAnnotation.shapeAnnotationType === 'Polyline') && (measureShapeAnnotation.shapeAnnotationType === 'PolygonRadius') || (measureShapeAnnotation.shapeAnnotationType === 'Circle')) {
            var circleMeasurementAnnotation = this.addCircleMeasurementAnnotation(measureShapeAnnotation, page);
            page.annotations.add(circleMeasurementAnnotation);
        }
        else if (!isNullOrUndefined(measureShapeAnnotation.shapeAnnotationType) && (measureShapeAnnotation.shapeAnnotationType === 'Polygon') && measureShapeAnnotation.indent !== 'PolygonRadius') {
            var points = JSON.parse(measureShapeAnnotation.vertexPoints);
            var linePoints = this.getSaveVertexPoints(points, page);
            var polygonAnnotation = new PdfPolygonAnnotation(linePoints);
            polygonAnnotation.author = !isNullOrUndefined(measureShapeAnnotation.author) && measureShapeAnnotation.author.toString() !== '' ? measureShapeAnnotation.author.toString() : 'Guest';
            if (!isNullOrUndefined(measureShapeAnnotation.note)) {
                polygonAnnotation.text = measureShapeAnnotation.note.toString();
            }
            if (!isNullOrUndefined(measureShapeAnnotation.annotName)) {
                polygonAnnotation.name = measureShapeAnnotation.annotName.toString();
            }
            if (!isNullOrUndefined(measureShapeAnnotation.subject)) {
                polygonAnnotation.subject = measureShapeAnnotation.subject.toString();
            }
            if (!isNullOrUndefined(measureShapeAnnotation.strokeColor)) {
                var strokeColor = JSON.parse(measureShapeAnnotation.strokeColor);
                polygonAnnotation.color = [strokeColor.r, strokeColor.g, strokeColor.b];
            }
            if (!isNullOrUndefined(measureShapeAnnotation.fillColor)) {
                var fillColor = JSON.parse(measureShapeAnnotation.fillColor);
                if (!this.isTransparentColor(fillColor)) {
                    var innerColor = [fillColor.r, fillColor.g, fillColor.b];
                    polygonAnnotation.innerColor = innerColor;
                }
                if (fillColor.a < 1 && fillColor.a > 0) {
                    polygonAnnotation._dictionary.update('FillOpacity', fillColor.a);
                    fillColor.a = 1;
                }
                else {
                    polygonAnnotation._dictionary.update('FillOpacity', fillColor.a);
                }
            }
            if (!isNullOrUndefined(measureShapeAnnotation.opacity)) {
                polygonAnnotation.opacity = measureShapeAnnotation.opacity;
            }
            var lineBorder = new PdfAnnotationBorder();
            lineBorder.width = measureShapeAnnotation.thickness;
            lineBorder.style = measureShapeAnnotation.borderStyle;
            if (!isNullOrUndefined(measureShapeAnnotation.borderDashArray)) {
                lineBorder.dash = [measureShapeAnnotation.borderDashArray, measureShapeAnnotation.borderDashArray];
            }
            polygonAnnotation.border = lineBorder;
            polygonAnnotation._dictionary.update('IT', _PdfName.get(measureShapeAnnotation.indent.toString()));
            polygonAnnotation.rotationAngle = this.getRotateAngle(measureShapeAnnotation.rotateAngle);
            var dateValue = void 0;
            if (!isNullOrUndefined(measureShapeAnnotation.modifiedDate) && !isNaN(Date.parse(measureShapeAnnotation.modifiedDate))) {
                dateValue = new Date(Date.parse(measureShapeAnnotation.modifiedDate));
                polygonAnnotation.modifiedDate = dateValue;
            }
            var commentsDetails = measureShapeAnnotation.comments;
            var bounds = JSON.parse(measureShapeAnnotation.bounds);
            polygonAnnotation.bounds = bounds;
            polygonAnnotation.bounds.x = bounds.left;
            polygonAnnotation.bounds.y = bounds.top;
            if (commentsDetails.length > 0) {
                for (var i = 0; i < commentsDetails.length; i++) {
                    polygonAnnotation.comments.add(this.addCommentsCollection(commentsDetails[parseInt(i.toString(), 10)], polygonAnnotation.bounds));
                }
            }
            var reviewDetails = measureShapeAnnotation.review;
            polygonAnnotation.reviewHistory.add(this.addReviewCollections(reviewDetails, polygonAnnotation.bounds));
            if (!isNullOrUndefined(measureShapeAnnotation.isCloudShape) && Boolean(measureShapeAnnotation['isCloudShape'].toString())) {
                polygonAnnotation.borderEffect.style = PdfBorderEffectStyle.cloudy;
                polygonAnnotation.borderEffect.intensity = measureShapeAnnotation['cloudIntensity'];
                var rectDifferences = JSON.parse(measureShapeAnnotation.rectangleDifference);
                if (rectDifferences.length > 0) {
                    var rd = this.getRDValues(rectDifferences);
                    polygonAnnotation._dictionary.update('RD', rd);
                }
            }
            this.preserveIsLockProperty(measureShapeAnnotation, polygonAnnotation);
            var measureDetail = JSON.parse(measureShapeAnnotation.calibrate);
            if (!isNullOrUndefined(measureDetail)) {
                polygonAnnotation._dictionary.set('Measure', this.setMeasureDictionary(measureDetail));
                if (measureShapeAnnotation['indent'] === 'PolygonVolume' && Object.prototype.hasOwnProperty.call(measureDetail, 'depth')) {
                    polygonAnnotation._dictionary.update('Depth', measureDetail['depth']);
                }
            }
            if (!isNullOrUndefined(measureShapeAnnotation.customData)) {
                polygonAnnotation.setValues('CustomData', JSON.stringify(measureShapeAnnotation.customData));
            }
            if (measureShapeAnnotation.allowedInteractions && measureShapeAnnotation['allowedInteractions'] != null) {
                polygonAnnotation.setValues('AllowedInteractions', JSON.stringify(measureShapeAnnotation['allowedInteractions']));
            }
            polygonAnnotation.setAppearance(true);
            page.annotations.add(polygonAnnotation);
        }
    };
    /**
     * @param {any} details - details
     * @param {PdfPage} page - page
     * @private
     * @returns {void}
     */
    AnnotationRenderer.prototype.addStickyNotes = function (details, page) {
        var popUpAnnotation = details;
        var bounds = JSON.parse(popUpAnnotation.bounds);
        var cropValues = this.getCropBoxValue(page, false);
        var left = this.convertPixelToPoint(bounds.left);
        var top = this.convertPixelToPoint(bounds.top);
        var width = this.convertPixelToPoint(bounds.width);
        var height = this.convertPixelToPoint(bounds.height);
        var cropX = 0;
        var cropY = 0;
        if (cropValues.x !== 0 && cropValues.y !== 0 && cropValues.x === left) {
            cropX = cropValues.x;
            cropY = cropValues.y;
        }
        else if (cropValues.x === 0 && page.cropBox[2] === page.size[0] && cropValues.y === page.size[1]) {
            cropX = cropValues.x;
            cropY = cropValues.y;
        }
        var annotation = new PdfPopupAnnotation(null, cropX + left, cropY + top, width, height);
        if (popUpAnnotation['author'] === null) {
            popUpAnnotation['author'] = 'Guest';
        }
        if (popUpAnnotation['note'] != null) {
            annotation.text = popUpAnnotation['note'].toString();
        }
        annotation.author = popUpAnnotation['author'].toString();
        if (popUpAnnotation['subject'] != null) {
            annotation.subject = popUpAnnotation['subject'].toString();
        }
        annotation._dictionary.set('NM', popUpAnnotation.annotName.toString());
        var dateValue;
        if (!isNullOrUndefined(popUpAnnotation.modifiedDate) && !isNaN(Date.parse(popUpAnnotation.modifiedDate))) {
            dateValue = new Date(Date.parse(popUpAnnotation.modifiedDate));
            annotation.modifiedDate = dateValue;
        }
        var commentsDetails = popUpAnnotation.comments;
        if (commentsDetails.length > 0) {
            for (var i = 0; i < commentsDetails.length; i++) {
                annotation.comments.add(this.addCommentsCollection(commentsDetails[parseInt(i.toString(), 10)], annotation.bounds));
            }
        }
        var reviewDetails = popUpAnnotation.review;
        annotation.reviewHistory.add(this.addReviewCollections(reviewDetails, annotation.bounds));
        var color = [255, 255, 51];
        annotation.color = color;
        annotation.opacity = popUpAnnotation.opacity;
        annotation.icon = PdfPopupIcon.comment;
        this.preserveIsLockProperty(popUpAnnotation, annotation);
        if (!isNullOrUndefined(popUpAnnotation.customData)) {
            annotation.setValues('CustomData', JSON.stringify(popUpAnnotation.customData));
        }
        page.annotations.add(annotation);
    };
    AnnotationRenderer.hasDynamicText = function (freeTextAnnotation) {
        return Object.prototype.hasOwnProperty.call(freeTextAnnotation, 'dynamicText') &&
            !isNullOrUndefined(freeTextAnnotation.dynamicText.toString());
    };
    AnnotationRenderer.setFontFromKeys = function (freeTextAnnotation, annotation, textFont, fontSize, fontStyle) {
        var font = PdfViewerUtils.tryGetFontFromKeys(textFont, freeTextAnnotation.dynamicText.toString(), fontSize, fontStyle);
        if (!isNullOrUndefined(font)) {
            annotation.font = font;
            annotation.setAppearance(true);
        }
        else {
            annotation.setAppearance(false);
        }
    };
    /**
     * @param {any} details - details
     * @param {PdfPage} page - page
     * @param {string} textFont - textFont
     * @private
     * @returns {void}
     */
    AnnotationRenderer.prototype.addFreeText = function (details, page, textFont) {
        var freeTextAnnotation = details;
        var bounds = JSON.parse(freeTextAnnotation.bounds);
        var cropValues = this.getCropBoxValue(page, false);
        var left = this.convertPixelToPoint(bounds.left);
        var top = this.convertPixelToPoint(bounds.top);
        var width = this.convertPixelToPoint(bounds.width);
        var height = this.convertPixelToPoint(bounds.height);
        var cropX = 0;
        var cropY = 0;
        if (cropValues.x !== 0 && cropValues.y !== 0 && cropValues.x === left) {
            cropX = cropValues.x;
            cropY = cropValues.y;
        }
        else if (cropValues.x === 0 && page.cropBox[2] === page.size[0] && cropValues.y === page.size[1]) {
            cropX = cropValues.x;
            cropY = cropValues.y;
        }
        var annotation = new PdfFreeTextAnnotation(cropX + left, cropY + top, width, height);
        annotation.setAppearance(true);
        if (isNullOrUndefined(freeTextAnnotation['author'])) {
            freeTextAnnotation['author'] = 'Guest';
        }
        annotation.author = freeTextAnnotation['author'].toString();
        var dateValue;
        if (!isNullOrUndefined(freeTextAnnotation.modifiedDate) && !isNaN(Date.parse(freeTextAnnotation.modifiedDate))) {
            dateValue = new Date(Date.parse(freeTextAnnotation.modifiedDate));
            annotation.modifiedDate = dateValue;
        }
        var reviewDetails = freeTextAnnotation.review;
        annotation.reviewHistory.add(this.addReviewCollections(reviewDetails, annotation.bounds));
        annotation._dictionary.set('NM', freeTextAnnotation.annotName.toString());
        annotation.lineEndingStyle = PdfLineEndingStyle.openArrow;
        annotation.annotationIntent = PdfAnnotationIntent.freeTextTypeWriter;
        var fontSize = 0;
        if (!isNullOrUndefined(freeTextAnnotation.fontSize)) {
            fontSize = parseFloat(freeTextAnnotation.fontSize);
        }
        fontSize = !isNullOrUndefined(fontSize) && !isNaN(fontSize) && fontSize > 0 ? fontSize : 16; //default 16px
        var fontFamily = this.getFontFamily(freeTextAnnotation.fontFamily);
        var fontJson = {};
        if (Object.prototype.hasOwnProperty.call(freeTextAnnotation, 'font') && !isNullOrUndefined(freeTextAnnotation.font)) {
            fontJson = freeTextAnnotation.font;
        }
        var fontStyle = this.getFontStyle(fontJson);
        annotation.font = new PdfStandardFont(fontFamily, this.convertPixelToPoint(fontSize), fontStyle);
        if (AnnotationRenderer.hasDynamicText(freeTextAnnotation)) {
            if (!isNullOrUndefined(textFont) && Object.keys(textFont).length > 0) {
                var fontKey = PdfViewerUtils.getFontKey(textFont, freeTextAnnotation.fontFamily.toLowerCase());
                if (!isNullOrUndefined(fontKey)) {
                    var fontStream = textFont["" + fontKey];
                    fontStream = PdfViewerUtils.processFontStream(fontStream);
                    var font = new PdfTrueTypeFont(fontStream, this.convertPixelToPoint(fontSize), fontStyle);
                    var glyphPresent = PdfViewerUtils.isSupportedFont(freeTextAnnotation.dynamicText.toString(), font);
                    annotation.setAppearance(glyphPresent);
                    if (glyphPresent) {
                        annotation.font = font;
                    }
                    else {
                        AnnotationRenderer.setFontFromKeys(freeTextAnnotation, annotation, textFont, fontSize, fontStyle);
                    }
                }
                else {
                    AnnotationRenderer.setFontFromKeys(freeTextAnnotation, annotation, textFont, fontSize, fontStyle);
                }
            }
            else {
                try {
                    annotation.font.measureString(freeTextAnnotation.dynamicText.toString());
                }
                catch (e) {
                    annotation.setAppearance(false);
                }
            }
        }
        if (freeTextAnnotation['subject'] != null) {
            annotation.subject = freeTextAnnotation['subject'].toString();
        }
        // Markup Text
        annotation.text = '';
        if (Object.prototype.hasOwnProperty.call(freeTextAnnotation, 'dynamicText') && !isNullOrUndefined(freeTextAnnotation.dynamicText.toString())) {
            // Markup Text
            annotation.text = freeTextAnnotation.dynamicText.toString();
        }
        var rotateAngle = 'RotateAngle' + Math.abs(freeTextAnnotation.rotateAngle);
        annotation.rotationAngle = this.getRotateAngle(rotateAngle);
        var lineBorder = new PdfAnnotationBorder();
        lineBorder.width = !isNullOrUndefined(freeTextAnnotation.thickness) ? freeTextAnnotation.thickness : 1;
        annotation.border = lineBorder;
        annotation.border.width = lineBorder.width;
        if (Object.prototype.hasOwnProperty.call(freeTextAnnotation, 'padding') && !isNullOrUndefined(freeTextAnnotation.padding)) {
            // let padding: PdfPaddings = new PdfPaddings(); // PdfPaddings not exist in ej2-pdf
            // annotation.setPaddings(padding);  // setPaddings not exist
        }
        annotation.opacity = !isNullOrUndefined(freeTextAnnotation.opacity) ? freeTextAnnotation.opacity : 1;
        if (!isNullOrUndefined(freeTextAnnotation.strokeColor)) {
            var strokeColor = JSON.parse(freeTextAnnotation.strokeColor);
            var color = [strokeColor.r, strokeColor.g, strokeColor.b];
            annotation.borderColor = color;
            // Modified Implementation for setting border width for transparent border
            if (!this.isTransparentColor(strokeColor)) {
                annotation.border.width = !isNullOrUndefined(freeTextAnnotation.thickness) ? freeTextAnnotation.thickness : 0;
            }
        }
        if (!isNullOrUndefined(freeTextAnnotation.fillColor)) {
            var fillColor = JSON.parse(freeTextAnnotation.fillColor);
            if (!this.isTransparentColor(fillColor)) {
                var color = [fillColor.r, fillColor.g, fillColor.b];
                if (freeTextAnnotation.isTransparentSet) {
                    annotation.color = undefined;
                }
                else {
                    annotation.color = color;
                }
            }
            if (fillColor.a < 1 && fillColor.a > 0) {
                annotation._dictionary.update('FillOpacity', fillColor.a);
                fillColor.a = 1;
            }
            else {
                annotation._dictionary.update('FillOpacity', fillColor.a);
            }
        }
        if (!isNullOrUndefined(freeTextAnnotation.fontColor)) {
            var textMarkupColor = JSON.parse(freeTextAnnotation.fontColor);
            if (!this.isTransparentColor(textMarkupColor)) {
                var fontColor = [textMarkupColor.r, textMarkupColor.g, textMarkupColor.b];
                annotation.textMarkUpColor = fontColor;
            }
        }
        var commentsDetails = freeTextAnnotation.comments;
        if (commentsDetails.length > 0) {
            for (var i = 0; i < commentsDetails.length; i++) {
                annotation.comments.add(this.addCommentsCollection(commentsDetails[parseInt(i.toString(), 10)], annotation.bounds));
            }
        }
        this.preserveIsLockProperty(freeTextAnnotation, annotation);
        if (!isNullOrUndefined(freeTextAnnotation.customData)) {
            annotation.setValues('CustomData', JSON.stringify(freeTextAnnotation.customData));
        }
        if (Object.prototype.hasOwnProperty.call(freeTextAnnotation, 'textAlign') && !isNullOrUndefined(freeTextAnnotation.textAlign)) {
            annotation.textAlignment = this.getPdfTextAlignment(freeTextAnnotation.textAlign.toString().toLowerCase());
        }
        if (Object.prototype.hasOwnProperty.call(freeTextAnnotation, 'allowedInteractions') && !isNullOrUndefined(freeTextAnnotation.allowedInteractions)) {
            annotation.setValues('AllowedInteractions', JSON.stringify(freeTextAnnotation.allowedInteractions));
        }
        page.annotations.add(annotation);
    };
    AnnotationRenderer.prototype.renderSignHereStamp = function (rubberStampAnnotation, rectangle, icon, textBrush, page, pens, graphicsPath) {
        var stringFormat = new PdfStringFormat();
        var font = new PdfStandardFont(PdfFontFamily.helvetica, 20, PdfFontStyle.bold | PdfFontStyle.italic);
        stringFormat.alignment = PdfTextAlignment.center;
        stringFormat.lineAlignment = PdfVerticalAlignment.middle;
        var point1 = [0, 0];
        var point2 = [0, 0];
        var drawingPath = new PdfPath();
        var appearance = rubberStampAnnotation.appearance.normal;
        if (this.defaultHeight > 0 && this.defaultWidth > 0) {
            appearance.graphics.scaleTransform(rectangle.width / (this.defaultWidth + 4), rectangle.height / 28.00);
        }
        point1 = [(this.defaultWidth / 2 + 1), 15, 0, 0];
        point2 = [0, 0];
        drawingPath.addLine(point1[0], point1[1], point2[0], point2[1]);
        var pointValues = [drawingPath._points[0][0], drawingPath._points[0][1], 0, 0];
        if (graphicsPath) {
            var minX = Number.MAX_VALUE;
            var minY = Number.MAX_VALUE;
            var maxX = Number.MIN_VALUE;
            var maxY = Number.MIN_VALUE;
            for (var i = 0; i < graphicsPath._points.length; i++) {
                var point = graphicsPath._points[parseInt(i.toString(), 10)];
                minX = Math.min(minX, point[0]);
                minY = Math.min(minY, point[1]);
                maxX = Math.max(maxX, point[0]);
                maxY = Math.max(maxY, point[1]);
            }
            var offsetX = (rectangle.width - (maxX - minX)) / 2 - minX;
            var offsetY = (rectangle.height - (maxY - minY)) / 2 - minY;
            for (var i = 0; i < graphicsPath._points.length; i++) {
                graphicsPath._points[parseInt(i.toString(), 10)][0] += offsetX;
                graphicsPath._points[parseInt(i.toString(), 10)][1] += offsetY;
            }
            rubberStampAnnotation.appearance.normal.graphics.drawPath(graphicsPath, pens, textBrush);
        }
        else {
            appearance.graphics.drawString(icon.toUpperCase(), font, pointValues, pens, textBrush, stringFormat);
        }
    };
    AnnotationRenderer.prototype.retriveDefaultWidth = function (subject) {
        switch (subject.trim()) {
            case 'Witness':
                this.defaultWidth = 97.39;
                this.defaultHeight = 16.84;
                break;
            case 'Initial Here':
                this.defaultWidth = 151.345;
                this.defaultHeight = 16.781;
                break;
            case 'Sign Here':
                this.defaultWidth = 121.306;
                this.defaultHeight = 16.899;
                break;
            default:
                this.defaultWidth = 0;
                this.defaultHeight = 0;
                break;
        }
    };
    AnnotationRenderer.prototype.renderDynamicStamp = function (rubberStampAnnotation, icon, text, textBrush, rectangle, pens, page) {
        var stringFormat = new PdfStringFormat();
        stringFormat.alignment = PdfTextAlignment.left;
        stringFormat.lineAlignment = PdfVerticalAlignment.middle;
        var stampFont = null;
        var detailsFont = null;
        var hasUniCode = false;
        var regex = /[\u0600-\u06FF]/;
        var flag = regex.test(text);
        if (flag) {
            hasUniCode = true;
        }
        if (hasUniCode) {
            stampFont = new PdfTrueTypeFont(getArialFontData(), this.pdfViewer.annotationModule.calculateFontSize(icon.toUpperCase(), rectangle) - 5, PdfFontStyle.bold | PdfFontStyle.italic);
            detailsFont = new PdfTrueTypeFont(getArialFontData(), this.pdfViewer.annotationModule.calculateFontSize(text.toUpperCase(), rectangle) - 5, PdfFontStyle.bold | PdfFontStyle.italic);
        }
        else {
            stampFont = new PdfStandardFont(PdfFontFamily.helvetica, this.pdfViewer.annotationModule.calculateFontSize(icon.toUpperCase(), rectangle) - 5, PdfFontStyle.bold | PdfFontStyle.italic);
            detailsFont = new PdfStandardFont(PdfFontFamily.helvetica, this.pdfViewer.annotationModule.calculateFontSize(text, rectangle) - 5, PdfFontStyle.bold | PdfFontStyle.italic);
        }
        var appearance = rubberStampAnnotation.appearance.normal;
        var point1 = [0, 0];
        var point2 = [0, 0];
        var drawingPath = new PdfPath();
        point1 = [5, (rectangle.height / 3)];
        point2 = [5, (rectangle.height - (detailsFont.size * 2))];
        drawingPath.addLine(point1[0], point1[1], point2[0], point2[1]);
        var stampTypeBounds = [drawingPath._points[0][0], drawingPath._points[0][1], 0, 0];
        var stampTimeStampbounds = [drawingPath._points[1][0], drawingPath._points[1][1],
            (rectangle.width - drawingPath._points[1][0]), (rectangle.height - drawingPath._points[1][1])];
        appearance.graphics.drawString(icon.toUpperCase(), stampFont, stampTypeBounds, pens, textBrush, stringFormat);
        appearance.graphics.drawString(text, detailsFont, stampTimeStampbounds, pens, textBrush, stringFormat);
    };
    AnnotationRenderer.prototype.calculateBoundsXY = function (wrapperBounds, bounds, pageNo, pdfPageBase) {
        var boundsXY = new Rect();
        var pageSize = this.pdfViewer.pdfRendererModule.getPageSize(pageNo);
        if (pdfPageBase.rotation === PdfRotationAngle.angle90) {
            boundsXY.x = this.convertPixelToPoint(wrapperBounds.y);
            boundsXY.y = this.convertPixelToPoint(pageSize.width - wrapperBounds.x - wrapperBounds.width);
        }
        else if (pdfPageBase.rotation === PdfRotationAngle.angle180) {
            boundsXY.x = this.convertPixelToPoint(pageSize.width - wrapperBounds.x - wrapperBounds.width);
            boundsXY.y = this.convertPixelToPoint(pageSize.height - wrapperBounds.y - wrapperBounds.height);
        }
        else if (pdfPageBase.rotation === PdfRotationAngle.angle270) {
            boundsXY.x = this.convertPixelToPoint(pageSize.height - wrapperBounds.y - wrapperBounds.height);
            boundsXY.y = this.convertPixelToPoint(wrapperBounds.x);
        }
        else {
            boundsXY.x = this.convertPixelToPoint(wrapperBounds.x);
            boundsXY.y = this.convertPixelToPoint(wrapperBounds.y);
        }
        return boundsXY;
    };
    AnnotationRenderer.prototype.setMeasurementUnit = function (unit) {
        var measurementUnit;
        switch (unit) {
            case 'cm':
                measurementUnit = PdfMeasurementUnit.centimeter;
                break;
            case 'in':
                measurementUnit = PdfMeasurementUnit.inch;
                break;
            case 'mm':
                measurementUnit = PdfMeasurementUnit.millimeter;
                break;
            case 'pt':
                measurementUnit = PdfMeasurementUnit.point;
                break;
            case 'p':
                measurementUnit = PdfMeasurementUnit.pica;
                break;
        }
        return measurementUnit;
    };
    AnnotationRenderer.prototype.getRubberStampRotateAngle = function (angleEnum, rotationAngle) {
        var angle = PdfRotationAngle.angle0;
        switch (rotationAngle) {
            case 0:
                angle = PdfRotationAngle.angle0;
                break;
            case 90:
                angle = PdfRotationAngle.angle90;
                break;
            case 180:
                angle = PdfRotationAngle.angle180;
                break;
            case 270:
                angle = PdfRotationAngle.angle270;
                break;
            default:
                break;
        }
        angle = (angleEnum - angle + 4) % 4;
        return angle;
    };
    AnnotationRenderer.prototype.getFontFamily = function (fontFamily) {
        var font = PdfFontFamily.helvetica;
        fontFamily = !isNullOrUndefined(fontFamily) && fontFamily !== '' ? fontFamily : 'Helvetica';
        switch (fontFamily) {
            case 'Helvetica':
                font = PdfFontFamily.helvetica;
                break;
            case 'Courier':
                font = PdfFontFamily.courier;
                break;
            case 'Times New Roman':
                font = PdfFontFamily.timesRoman;
                break;
            case 'Symbol':
                font = PdfFontFamily.symbol;
                break;
            case 'ZapfDingbats':
                font = PdfFontFamily.zapfDingbats;
                break;
            default:
                break;
        }
        return font;
    };
    AnnotationRenderer.prototype.getFontStyle = function (fontJson) {
        var fontStyle = PdfFontStyle.regular;
        if (!isNullOrUndefined(fontJson)) {
            if (fontJson.isBold) {
                fontStyle = fontStyle | PdfFontStyle.bold;
            }
            if (fontJson.isItalic) {
                fontStyle = fontStyle | PdfFontStyle.italic;
            }
            if (fontJson.isStrikeout) {
                fontStyle = fontStyle | PdfFontStyle.strikeout;
            }
            if (fontJson.isUnderline) {
                fontStyle = fontStyle | PdfFontStyle.underline;
            }
        }
        return fontStyle;
    };
    AnnotationRenderer.prototype.getPdfTextAlignment = function (alignment) {
        var textAlignment = PdfTextAlignment.left;
        switch (alignment) {
            case 'center':
                textAlignment = PdfTextAlignment.center;
                break;
            case 'right':
                textAlignment = PdfTextAlignment.right;
                break;
            case 'justify':
                textAlignment = PdfTextAlignment.justify;
                break;
            default:
                break;
        }
        return textAlignment;
    };
    AnnotationRenderer.prototype.drawStampAsPath = function (resultObjects, rubberStampAnnotation, textBrush, stampBrush) {
        var currentPoint = { x: 0, y: 0 };
        var graphicsPath = new PdfPath();
        var stampObjects = resultObjects;
        for (var index = 0; index < stampObjects.length; index++) {
            var val = stampObjects[parseInt(index.toString(), 10)];
            var path = val.command.toString();
            if (path === 'M') {
                graphicsPath.startFigure();
                currentPoint = { x: val.x, y: val.y };
            }
            if (path === 'L') {
                var array = [
                    currentPoint, { x: val.x, y: val.y }
                ];
                this.transformPoints(array);
                var array1 = [
                    { x: array[0].x, y: array[0].y }, { x: array[1].x, y: array[1].y }
                ];
                graphicsPath.addLine(this.convertPixelToPoint(array1[0].x), this.convertPixelToPoint(array1[0].y), this.convertPixelToPoint(array1[1].x), this.convertPixelToPoint(array1[1].y));
                currentPoint = { x: val.x, y: val.y };
            }
            if (path === 'C') {
                var array2 = [
                    currentPoint,
                    { x: val.x, y: val.y },
                    { x: val.x1, y: val.y1 },
                    { x: val.x2, y: val.y2 }
                ];
                this.transformPoints(array2);
                var array21 = [
                    { x: array2[0].x, y: array2[0].y },
                    { x: array2[1].x, y: array2[1].y },
                    { x: array2[2].x, y: array2[2].y },
                    { x: array2[3].x, y: array2[3].y }
                ];
                graphicsPath.addBezier(this.convertPixelToPoint(array21[0].x), this.convertPixelToPoint(array21[0].y), this.convertPixelToPoint(array21[1].x), this.convertPixelToPoint(array21[1].y), this.convertPixelToPoint(array21[2].x), this.convertPixelToPoint(array21[2].y), this.convertPixelToPoint(array21[3].x), this.convertPixelToPoint(array21[3].y));
                currentPoint = { x: val.x, y: val.y };
            }
            if (path === 'Z' || path === 'z') {
                graphicsPath.closeFigure();
            }
        }
        return graphicsPath;
    };
    AnnotationRenderer.prototype.transformPoints = function (points) {
        if (!isNullOrUndefined(points)) {
            for (var i = 0; i < points.length; i++) {
                points[parseInt(i.toString(), 10)] = this.transform(points[parseInt(i.toString(), 10)]);
            }
        }
    };
    AnnotationRenderer.prototype.transform = function (point) {
        var x = point.x;
        var y = point.y;
        return { x: x, y: y };
    };
    AnnotationRenderer.prototype.getIconName = function (stampAnnotation, subject, rubberStampAnnotation) {
        var iconExists = true;
        switch (subject.trim()) {
            case 'Approved':
                rubberStampAnnotation.icon = PdfRubberStampAnnotationIcon.approved;
                break;
            case 'Confidential':
                rubberStampAnnotation.icon = PdfRubberStampAnnotationIcon.confidential;
                break;
            case 'Not Approved':
                rubberStampAnnotation.icon = PdfRubberStampAnnotationIcon.notApproved;
                break;
            case 'Draft':
                rubberStampAnnotation.icon = PdfRubberStampAnnotationIcon.draft;
                break;
            case 'Final':
                rubberStampAnnotation.icon = PdfRubberStampAnnotationIcon.final;
                break;
            case 'Completed':
                rubberStampAnnotation.icon = PdfRubberStampAnnotationIcon.completed;
                break;
            case 'For Public Release':
                rubberStampAnnotation.icon = PdfRubberStampAnnotationIcon.forPublicRelease;
                break;
            case 'Not For Public Release':
                rubberStampAnnotation.icon = PdfRubberStampAnnotationIcon.notForPublicRelease;
                break;
            case 'For Comment':
                rubberStampAnnotation.icon = PdfRubberStampAnnotationIcon.forComment;
                break;
            case 'Void':
                rubberStampAnnotation.icon = PdfRubberStampAnnotationIcon.void;
                break;
            case 'Preliminary Results':
                rubberStampAnnotation.icon = PdfRubberStampAnnotationIcon.preliminaryResults;
                break;
            case 'Information Only':
                rubberStampAnnotation.icon = PdfRubberStampAnnotationIcon.informationOnly;
                break;
            default:
                iconExists = false;
                break;
        }
        return iconExists;
    };
    AnnotationRenderer.prototype.addCircleMeasurementAnnotation = function (measureShapeAnnotation, page) {
        var bounds = JSON.parse(measureShapeAnnotation.bounds);
        var cropValues = this.getCropBoxValue(page, false);
        var left = this.convertPixelToPoint(bounds.left);
        var top = this.convertPixelToPoint(bounds.top);
        var width = this.convertPixelToPoint(bounds.width);
        var height = this.convertPixelToPoint(bounds.height);
        if (isNullOrUndefined(bounds.left)) {
            measureShapeAnnotation.bounds.left = 0;
        }
        if (isNullOrUndefined(bounds.top)) {
            measureShapeAnnotation.bounds.top = 0;
        }
        var cropX = 0;
        var cropY = 0;
        if (cropValues.x !== 0 && cropValues.y !== 0 && cropValues.x === left) {
            cropX = cropValues.x;
            cropY = cropValues.y;
        }
        else if (cropValues.x === 0 && page.cropBox[2] === page.size[0] && cropValues.y === page.size[1]) {
            cropX = cropValues.x;
            cropY = cropValues.y;
        }
        var circleAnnotation = new PdfCircleAnnotation(cropX + left, cropY + top, width, height);
        if (!isNullOrUndefined(measureShapeAnnotation.note)) {
            circleAnnotation.text = measureShapeAnnotation.note.toString();
        }
        circleAnnotation.author = !isNullOrUndefined(measureShapeAnnotation.author) && measureShapeAnnotation.author.toString() !== '' ? measureShapeAnnotation.author.toString() : 'Guest';
        circleAnnotation._dictionary.set('NM', measureShapeAnnotation.annotName.toString());
        if (!isNullOrUndefined(measureShapeAnnotation.subject)) {
            circleAnnotation.subject = measureShapeAnnotation.subject.toString();
        }
        if (!isNullOrUndefined(measureShapeAnnotation.strokeColor)) {
            var strokeColor = JSON.parse(measureShapeAnnotation.strokeColor);
            var color = [strokeColor.r, strokeColor.g, strokeColor.b];
            circleAnnotation.color = color;
        }
        if (!isNullOrUndefined(measureShapeAnnotation.fillColor)) {
            var fillColor = JSON.parse(measureShapeAnnotation.fillColor);
            if (!this.isTransparentColor(fillColor)) {
                var innerColor = [fillColor.r, fillColor.g, fillColor.b];
                circleAnnotation.innerColor = innerColor;
            }
            if (fillColor.a < 1 && fillColor.a > 0) {
                circleAnnotation._dictionary.update('FillOpacity', fillColor.a);
                fillColor.a = 1;
            }
            else {
                circleAnnotation._dictionary.update('FillOpacity', fillColor.a);
            }
        }
        if (!isNullOrUndefined(measureShapeAnnotation.opacity)) {
            circleAnnotation.opacity = measureShapeAnnotation.opacity;
        }
        var lineBorder = new PdfAnnotationBorder();
        lineBorder.width = measureShapeAnnotation.thickness;
        lineBorder.style = measureShapeAnnotation.borderStyle;
        lineBorder.dash = measureShapeAnnotation.borderDashArray;
        circleAnnotation.border = lineBorder;
        circleAnnotation.rotationAngle = this.getRotateAngle(measureShapeAnnotation.rotateAngle);
        var dateValue;
        if (!isNullOrUndefined(measureShapeAnnotation.modifiedDate) && !isNaN(Date.parse(measureShapeAnnotation.modifiedDate))) {
            dateValue = new Date(Date.parse(measureShapeAnnotation.modifiedDate));
            circleAnnotation.modifiedDate = dateValue;
        }
        var commentsDetails = measureShapeAnnotation.comments;
        if (commentsDetails.length > 0) {
            for (var i = 0; i < commentsDetails.length; i++) {
                circleAnnotation.comments.add(this.addCommentsCollection(commentsDetails[parseInt(i.toString(), 10)], circleAnnotation.bounds));
            }
        }
        var reviewDetails = measureShapeAnnotation.review;
        circleAnnotation.reviewHistory.add(this.addReviewCollections(reviewDetails, circleAnnotation.bounds));
        if (!isNullOrUndefined(measureShapeAnnotation.isCloudShape) && measureShapeAnnotation.isCloudShape) {
            var borderEffect = new PdfBorderEffect();
            borderEffect.style = PdfBorderEffectStyle.cloudy;
            borderEffect.intensity = measureShapeAnnotation.cloudIntensity;
            circleAnnotation._borderEffect = borderEffect;
            var rectDifferences = JSON.parse(measureShapeAnnotation.rectangleDifference);
            if (rectDifferences.length > 0) {
                var rd = this.getRDValues(rectDifferences);
                circleAnnotation._dictionary.update('RD', rd);
            }
        }
        this.preserveIsLockProperty(measureShapeAnnotation, circleAnnotation);
        circleAnnotation.measureType = PdfCircleMeasurementType.radius;
        var measureDetail = JSON.parse(measureShapeAnnotation.calibrate);
        if (!isNullOrUndefined(measureDetail)) {
            circleAnnotation._dictionary.set('Measure', this.setMeasureDictionary(measureDetail));
        }
        if (!isNullOrUndefined(measureShapeAnnotation.customData)) {
            circleAnnotation.setValues('CustomData', JSON.stringify(measureShapeAnnotation.customData));
        }
        circleAnnotation.setAppearance(true);
        return circleAnnotation;
    };
    AnnotationRenderer.prototype.setMeasureDictionary = function (measureDetail) {
        var measureDictionary = new _PdfDictionary();
        measureDictionary.set('Type', 'Measure');
        measureDictionary.set('R', measureDetail.ratio);
        if (!isNullOrUndefined(measureDetail.x)) {
            var xNumberFormat = this.createNumberFormat(measureDetail.x);
            measureDictionary.set('X', xNumberFormat);
        }
        if (!isNullOrUndefined(measureDetail.distance)) {
            var dNumberFormat = this.createNumberFormat(JSON.parse(measureDetail.distance));
            measureDictionary.set('D', dNumberFormat);
        }
        if (!isNullOrUndefined(measureDetail.area)) {
            var aNumberFormat = this.createNumberFormat(JSON.parse(measureDetail.area));
            measureDictionary.set('A', aNumberFormat);
        }
        if (!isNullOrUndefined(measureDetail.angle)) {
            var tNumberFormat = this.createNumberFormat(JSON.parse(measureDetail.angle));
            measureDictionary.set('T', tNumberFormat);
        }
        if (!isNullOrUndefined(measureDetail.volume)) {
            var vNumberFormat = this.createNumberFormat(JSON.parse(measureDetail.volume));
            measureDictionary.set('V', vNumberFormat);
        }
        return measureDictionary;
    };
    AnnotationRenderer.prototype.createNumberFormat = function (numberFormatList) {
        var numberFormats = [];
        if (isNullOrUndefined(numberFormatList) || numberFormatList.length === 0) {
            return undefined;
        }
        for (var index = 0; index < numberFormatList.length; index++) {
            var numberFormatDictionary = new _PdfDictionary();
            var numberFormat = numberFormatList[parseInt(index.toString(), 10)];
            numberFormatDictionary.set('Type', 'NumberFormat');
            numberFormatDictionary.set('U', numberFormat.unit);
            numberFormatDictionary.set('F', numberFormat.fractionalType);
            numberFormatDictionary.set('D', numberFormat.denominator);
            numberFormatDictionary.set('C', numberFormat.conversionFactor);
            numberFormatDictionary.set('FD', numberFormat.formatDenominator);
            numberFormats.push(numberFormatDictionary);
        }
        return numberFormats;
    };
    AnnotationRenderer.prototype.checkAnnotationLock = function (annotation) {
        var isLock = false;
        if (!isNullOrUndefined(annotation.annotationSettings)) {
            var annotationSettings = annotation.annotationSettings;
            if (!isNullOrUndefined(annotationSettings.isLock)) {
                isLock = annotationSettings.isLock;
            }
        }
        return isLock;
    };
    AnnotationRenderer.prototype.getSaveVertexPoints = function (points, page) {
        var pageHeight = page.size[1];
        var pointList = [];
        for (var index = 0; index < points.length; index++) {
            var x = this.convertPixelToPoint(points[parseInt(index.toString(), 10)].x);
            pointList.push(x);
            var y = pageHeight - this.convertPixelToPoint(points[parseInt(index.toString(), 10)].y);
            pointList.push(y);
        }
        return pointList;
    };
    AnnotationRenderer.prototype.getLineEndingStyle = function (endingStyle) {
        var style = PdfLineEndingStyle.none;
        switch (endingStyle) {
            case 'Square':
                style = PdfLineEndingStyle.square;
                break;
            case 'ClosedArrow':
            case 'Closed':
                style = PdfLineEndingStyle.closedArrow;
                break;
            case 'RClosedArrow':
                style = PdfLineEndingStyle.rClosedArrow;
                break;
            case 'OpenArrow':
            case 'Open':
                style = PdfLineEndingStyle.openArrow;
                break;
            case 'ROpenArrow':
                style = PdfLineEndingStyle.rOpenArrow;
                break;
            case 'Butt':
                style = PdfLineEndingStyle.butt;
                break;
            case 'Circle':
            case 'Round':
                style = PdfLineEndingStyle.circle;
                break;
            case 'Diamond':
                style = PdfLineEndingStyle.diamond;
                break;
            case 'Slash':
                style = PdfLineEndingStyle.slash;
                break;
        }
        return style;
    };
    AnnotationRenderer.prototype.getCaptionType = function (captionPosition) {
        var captionType = PdfLineCaptionType.inline;
        switch (captionPosition) {
            case 'Inline':
                captionType = PdfLineCaptionType.inline;
                break;
            case 'Top':
                captionType = PdfLineCaptionType.top;
                break;
        }
        return captionType;
    };
    AnnotationRenderer.prototype.addReviewCollections = function (popupAnnotation, bounds) {
        var annotation = new PdfPopupAnnotation(null, bounds.x, bounds.y, bounds.width, bounds.height);
        if (popupAnnotation['state'] != null) {
            annotation.state = this.getReviewState(popupAnnotation['state'].toString());
            annotation.stateModel = PdfAnnotationStateModel.review;
        }
        return annotation;
    };
    AnnotationRenderer.prototype.addCommentsCollection = function (popupAnnotation, bounds) {
        var annotation = new PdfPopupAnnotation();
        annotation.text = popupAnnotation.note;
        annotation.author = popupAnnotation.author;
        annotation.subject = popupAnnotation.subject;
        if (!isNullOrUndefined(popupAnnotation.note)) {
            annotation.text = popupAnnotation['note'].toString();
        }
        else {
            annotation._annotFlags = PdfAnnotationFlag.print;
        }
        var reviewDetails = popupAnnotation.review;
        annotation.reviewHistory.add(this.addReviewCollections(reviewDetails, bounds));
        var dateValue;
        if (!isNullOrUndefined(popupAnnotation.modifiedDate) && !isNaN(Date.parse(popupAnnotation.modifiedDate))) {
            dateValue = new Date(Date.parse(popupAnnotation.modifiedDate));
            annotation.modifiedDate = dateValue;
        }
        if (!isNullOrUndefined(popupAnnotation.annotName)) {
            annotation._dictionary.set('NM', popupAnnotation.annotName.toString());
        }
        return annotation;
    };
    AnnotationRenderer.prototype.getReviewState = function (state) {
        var reviewState;
        switch (state) {
            case 'Accepted':
                reviewState = PdfAnnotationState.accepted;
                break;
            case 'Cancelled':
                reviewState = PdfAnnotationState.cancel;
                break;
            case 'Completed':
                reviewState = PdfAnnotationState.completed;
                break;
            case 'Rejected':
                reviewState = PdfAnnotationState.rejected;
                break;
            case 'None':
                reviewState = PdfAnnotationState.none;
                break;
            default:
                reviewState = PdfAnnotationState.unmarked;
                break;
        }
        return reviewState;
    };
    AnnotationRenderer.prototype.convertPixelToPoint = function (value) {
        return (value * 72 / 96);
    };
    AnnotationRenderer.prototype.convertPointToPixel = function (value) {
        return (value * 96 / 72);
    };
    AnnotationRenderer.prototype.isTransparentColor = function (fillColor) {
        return fillColor && fillColor.a === 0;
    };
    AnnotationRenderer.prototype.getRDValues = function (values) {
        var rectDifference = [];
        for (var i = 0; i < values.length; i++) {
            rectDifference.push(parseFloat(values[parseInt(i.toString(), 10)]));
        }
        return rectDifference;
    };
    AnnotationRenderer.prototype.getRotateAngle = function (angleString) {
        var angle = PdfRotationAngle.angle0;
        switch (angleString) {
            case 'RotateAngle0':
                angle = PdfRotationAngle.angle0;
                break;
            case 'RotateAngle180':
                angle = PdfRotationAngle.angle180;
                break;
            case 'RotateAngle270':
                angle = PdfRotationAngle.angle270;
                break;
            case 'RotateAngle90':
                angle = PdfRotationAngle.angle90;
                break;
        }
        return angle;
    };
    /**
     * @private
     * @param {string} angleString - height
     * @returns {number} - angle
     */
    AnnotationRenderer.prototype.getInkRotateAngle = function (angleString) {
        var angle = 0;
        switch (angleString) {
            case '0':
                angle = 0;
                break;
            case '1':
                angle = -90;
                break;
            case '2':
                angle = -180;
                break;
            case '3':
                angle = -270;
                break;
        }
        return angle;
    };
    /**
     * @private
     * @param {PdfInkAnnotation} inkAnnot - inkAnnot
     * @param {number} height - height
     * @param {number} width - width
     * @param {number} pageRotation - pageRotation
     * @param {number} pageNumber - pageNumber
     * @param {PdfPage} loadedPage - loadedPage
     * @returns {void}
     */
    AnnotationRenderer.prototype.loadSignature = function (inkAnnot, height, width, pageRotation, pageNumber, loadedPage) {
        var signature = new SignatureAnnotationBase();
        var outputstring = '';
        if (!isNullOrUndefined(inkAnnot.inkPointsCollection)) {
            for (var index = 0; index < inkAnnot.inkPointsCollection.length; index++) {
                var inkList = inkAnnot.inkPointsCollection[parseInt(index.toString(), 10)];
                for (var j = 0; j < inkList.length; j += 2) {
                    var x = void 0;
                    var y = void 0;
                    if (inkAnnot._page.rotation === PdfRotationAngle.angle90) {
                        x = inkList[j + 1];
                        y = inkList[parseInt(j.toString(), 10)];
                    }
                    else if (inkAnnot._page.rotation === PdfRotationAngle.angle180) {
                        x = inkAnnot._page.size[0] - inkList[parseInt(j.toString(), 10)];
                        y = inkList[j + 1];
                    }
                    else if (inkAnnot._page.rotation === PdfRotationAngle.angle270) {
                        x = inkAnnot._page.size[0] - inkList[j + 1];
                        y = inkAnnot._page.size[1] - inkList[parseInt(j.toString(), 10)];
                    }
                    else {
                        x = inkList[parseInt(j.toString(), 10)];
                        y = inkAnnot._page.size[1] - inkList[j + 1];
                    }
                    if (j === 0) {
                        outputstring += 'M' + x + ',' + y + ' ';
                    }
                    else {
                        outputstring += 'L' + x + ',' + y + ' ';
                    }
                }
            }
        }
        signature.AnnotationType = 'Signature';
        signature.Bounds = this.getBounds(inkAnnot.bounds, height, width, pageRotation);
        signature.Opacity = inkAnnot.opacity;
        signature.Thickness = inkAnnot.border.width;
        signature.PathData = outputstring;
        signature.StrokeColor = 'rgba(' + inkAnnot.color[0] + ',' + inkAnnot.color[1] + ',' + inkAnnot.color[2] + ',' + (inkAnnot.color[3] ? inkAnnot.color[3] : 1) + ')';
        signature.PageNumber = pageNumber;
        signature.SignatureName = inkAnnot.name;
        return signature;
    };
    /**
     * @private
     * @param {PdfInkAnnotation} inkAnnot - inkAnnot
     * @param {number} height - height
     * @param {number} width - width
     * @param {number} pageRotation - PageRotation
     * @param {number} pageNumber - number
     * @param {PdfPage} loadedPage - loadedPage
     * @returns {void}
     */
    AnnotationRenderer.prototype.loadInkAnnotation = function (inkAnnot, height, width, pageRotation, pageNumber, loadedPage) {
        var signature = new InkSignatureAnnotation();
        var outputstring = '';
        if (!isNullOrUndefined(inkAnnot.inkPointsCollection)) {
            for (var index = 0; index < inkAnnot.inkPointsCollection.length; index++) {
                var inkList = inkAnnot.inkPointsCollection[parseInt(index.toString(), 10)];
                for (var j = 0; j < inkList.length; j += 2) {
                    var x = void 0;
                    var y = void 0;
                    if (inkAnnot._page.rotation === PdfRotationAngle.angle90) {
                        x = inkList[j + 1];
                        y = inkList[parseInt(j.toString(), 10)];
                    }
                    else if (inkAnnot._page.rotation === PdfRotationAngle.angle180) {
                        x = inkAnnot._page.size[0] - inkList[parseInt(j.toString(), 10)];
                        y = inkList[j + 1];
                    }
                    else if (inkAnnot._page.rotation === PdfRotationAngle.angle270) {
                        x = inkAnnot._page.size[0] - inkList[j + 1];
                        y = inkAnnot._page.size[1] - inkList[parseInt(j.toString(), 10)];
                    }
                    else {
                        x = inkList[parseInt(j.toString(), 10)];
                        y = inkAnnot._page.size[1] - inkList[j + 1];
                    }
                    if (j === 0) {
                        outputstring += 'M' + x + ',' + y + ' ';
                    }
                    else {
                        outputstring += 'L' + x + ',' + y + ' ';
                    }
                }
            }
        }
        signature.Author = inkAnnot.author;
        signature.Subject = inkAnnot.subject;
        if (!isNullOrUndefined(inkAnnot.modifiedDate)) {
            signature.ModifiedDate = this.formatDate(inkAnnot.modifiedDate);
        }
        else {
            signature.ModifiedDate = this.formatDate(new Date());
        }
        signature.Note = this.getValidNoteContent(inkAnnot.text);
        for (var i = 0; i < inkAnnot.reviewHistory.count; i++) {
            signature.State = this.getStateString(inkAnnot.reviewHistory.at(parseInt(i.toString(), 10)).state);
            signature.StateModel = this.getStateModelString(inkAnnot.reviewHistory.at(parseInt(i.toString(), 10)).stateModel);
        }
        if (isNullOrUndefined(signature.State) || isNullOrUndefined(signature.StateModel)) {
            signature.State = 'Unmarked';
            signature.StateModel = 'None';
        }
        signature.Comments = new Array();
        for (var i = 0; i < inkAnnot.comments.count; i++) {
            var annot = this.loadPopupAnnotation(inkAnnot.comments.at(i), height, width, pageRotation);
            signature.Comments.push(annot);
        }
        this.updateIsLockProperty(signature, inkAnnot);
        signature.AnnotationType = 'Ink';
        signature.AnnotType = 'Ink';
        signature.Bounds = this.getBounds(inkAnnot.bounds, height, width, pageRotation);
        if (inkAnnot.bounds.y < 0) {
            var cropRect = new Rect(inkAnnot.bounds.x, loadedPage.cropBox[1] + inkAnnot.bounds.y, inkAnnot.bounds.width, inkAnnot.bounds.height);
            signature.Bounds = this.getBounds(cropRect, height, width, pageRotation);
        }
        signature.Opacity = inkAnnot.opacity;
        signature.Thickness = inkAnnot.border.width;
        signature.PathData = outputstring;
        signature.StrokeColor = 'rgba(' + inkAnnot.color[0] + ',' + inkAnnot.color[1] + ',' + inkAnnot.color[2] + ',' + (inkAnnot.color[3] ? inkAnnot.color[3] : 1) + ')';
        signature.PageNumber = pageNumber;
        signature.AnnotName = inkAnnot.name;
        if (inkAnnot._dictionary.has('CustomData') && !isNullOrUndefined(inkAnnot._dictionary.get('CustomData'))) {
            var customData = inkAnnot._dictionary.get('CustomData');
            if (customData != null) {
                signature.ExistingCustomData = customData;
            }
        }
        return signature;
    };
    /**
     * @param {PdfSquareAnnotation} squareAnnot - squareAnnot
     * @param {number} height - height
     * @param {number} width - width
     * @param {number} pageRotation - pageRotation
     * @param {PdfFreeTextAnnotation} shapeFreeText - shapeFreeText
     * @private
     * @returns {void}
     */
    AnnotationRenderer.prototype.loadSquareAnnotation = function (squareAnnot, height, width, pageRotation, shapeFreeText) {
        var shapeAnnotation = new ShapeAnnotationBase();
        shapeAnnotation.ShapeAnnotationType = 'Square';
        shapeAnnotation.Author = squareAnnot.author;
        shapeAnnotation.AnnotName = squareAnnot.name;
        shapeAnnotation.Subject = squareAnnot.subject;
        if (!isNullOrUndefined(squareAnnot.modifiedDate)) {
            shapeAnnotation.ModifiedDate = this.formatDate(squareAnnot.modifiedDate);
        }
        else {
            shapeAnnotation.ModifiedDate = this.formatDate(new Date());
        }
        shapeAnnotation.Note = this.getValidNoteContent(squareAnnot.text);
        shapeAnnotation.Thickness = squareAnnot.border.width;
        shapeAnnotation.BorderStyle = this.getBorderStylesString(squareAnnot.border.style);
        shapeAnnotation.BorderDashArray = squareAnnot.border.dash ? squareAnnot.border.dash[0] ? squareAnnot.border.dash[0] : 0 : 0;
        shapeAnnotation.Opacity = squareAnnot.opacity;
        shapeAnnotation.RotateAngle = this.getRotateAngleString(squareAnnot.rotate);
        shapeAnnotation.AnnotType = 'shape';
        for (var i = 0; i < squareAnnot.reviewHistory.count; i++) {
            shapeAnnotation.State = this.getStateString(squareAnnot.reviewHistory.at(parseInt(i.toString(), 10)).state);
            shapeAnnotation.StateModel = this.getStateModelString(squareAnnot.reviewHistory.at(parseInt(i.toString(), 10)).stateModel);
        }
        if (isNullOrUndefined(shapeAnnotation.State) || isNullOrUndefined(shapeAnnotation.StateModel)) {
            shapeAnnotation.State = 'Unmarked';
            shapeAnnotation.StateModel = 'None';
        }
        shapeAnnotation.Comments = new Array();
        for (var i = 0; i < squareAnnot.comments.count; i++) {
            var annot = this.loadPopupAnnotation(squareAnnot.comments.at(i), height, width, pageRotation);
            shapeAnnotation.Comments.push(annot);
        }
        shapeAnnotation.Bounds = this.getBounds(squareAnnot.bounds, height, width, pageRotation);
        shapeAnnotation.LineHeadStart = 'None';
        shapeAnnotation.LineHeadEnd = 'None';
        if (!isNullOrUndefined(squareAnnot.borderEffect)) {
            if (squareAnnot.borderEffect.style === PdfBorderEffectStyle.cloudy) {
                shapeAnnotation.IsCloudShape = true;
                shapeAnnotation.CloudIntensity = squareAnnot.borderEffect.intensity;
            }
            else {
                shapeAnnotation.IsCloudShape = false;
                shapeAnnotation.CloudIntensity = 0;
            }
        }
        else {
            shapeAnnotation.IsCloudShape = false;
            shapeAnnotation.CloudIntensity = 0;
        }
        if (squareAnnot._dictionary.has('RD') && !isNullOrUndefined(squareAnnot._dictionary.get('RD'))) {
            shapeAnnotation.RectangleDifference = squareAnnot._dictionary.get('RD');
        }
        else {
            shapeAnnotation.RectangleDifference = new Array();
        }
        this.updateIsLockProperty(shapeAnnotation, squareAnnot);
        if (squareAnnot._dictionary.has('AllowedInteractions')) {
            var allowedInteractions = squareAnnot.getValues('AllowedInteractions');
            var text = allowedInteractions[0];
            shapeAnnotation.AllowedInteractions = JSON.parse(text);
        }
        shapeAnnotation.StrokeColor = !isNullOrUndefined(squareAnnot.color) ? 'rgba(' + squareAnnot.color[0] + ',' + squareAnnot.color[1] + ',' + squareAnnot.color[2] + ',' + (squareAnnot.color[3] ? squareAnnot.color[3] : 1) + ')' : 'rgba(0,0,0,1)';
        var fillOpacity = (!isNullOrUndefined(squareAnnot.color) && squareAnnot.color[3]) ? squareAnnot.color[3] : 1;
        if (squareAnnot._dictionary.has('FillOpacity') && !isNullOrUndefined(squareAnnot._dictionary.get('FillOpacity'))) {
            fillOpacity = parseInt(squareAnnot._dictionary.get('FillOpacity').toString(), 10);
        }
        fillOpacity = squareAnnot.innerColor ? fillOpacity : 0;
        squareAnnot.innerColor = squareAnnot.innerColor ? squareAnnot.innerColor : [255, 255, 255];
        shapeAnnotation.FillColor = 'rgba(' + squareAnnot.innerColor[0] + ',' + squareAnnot.innerColor[1] + ',' + squareAnnot.innerColor[2] + ',' + fillOpacity + ')';
        shapeAnnotation.EnableShapeLabel = false;
        if (shapeFreeText != null) {
            shapeAnnotation.EnableShapeLabel = true;
            shapeAnnotation.LabelContent = shapeFreeText.text;
            shapeAnnotation.LabelFillColor = 'rgba(' + shapeFreeText.color[0] + ',' + shapeFreeText.color[1] + ',' + shapeFreeText.color[2] + ',' + (shapeFreeText.color[3] ? shapeFreeText.color[3] : 1) + ')';
            shapeAnnotation.FontColor = 'rgba(' + shapeFreeText.textMarkUpColor[0] + ',' + shapeFreeText.textMarkUpColor[1] + ',' + shapeFreeText.textMarkUpColor[2] + ',' + (shapeFreeText.textMarkUpColor[3] ? shapeFreeText.textMarkUpColor[3] : 1) + ')';
            shapeAnnotation.LabelBorderColor = 'rgba(' + shapeFreeText.borderColor[0] + ',' + shapeFreeText.borderColor[1] + ',' + shapeFreeText.borderColor[2] + ',' + (shapeFreeText.borderColor[3] ? shapeFreeText.borderColor[3] : 1) + ')';
            shapeAnnotation.FontSize = shapeFreeText.font.size;
        }
        if (squareAnnot._dictionary.has('CustomData') && !isNullOrUndefined(squareAnnot._dictionary.get('CustomData'))) {
            var customData = squareAnnot._dictionary.get('CustomData');
            if (customData != null) {
                shapeAnnotation.ExistingCustomData = customData;
            }
        }
        return shapeAnnotation;
    };
    /**
     * @param {PdfLineAnnotation} lineAnnot - lineAnnot
     * @param {number} height - height
     * @param {number} width - width
     * @param {number} pageRotation - pageRotation
     * @param {PdfFreeTextAnnotation} shapeFreeText - shapeFreeText
     * @private
     * @returns {void}
     */
    AnnotationRenderer.prototype.loadLineAnnotation = function (lineAnnot, height, width, pageRotation, shapeFreeText) {
        var shapeAnnotation = new ShapeAnnotationBase();
        shapeAnnotation.ShapeAnnotationType = 'Line';
        shapeAnnotation.Author = lineAnnot.author;
        shapeAnnotation.AnnotName = lineAnnot.name;
        shapeAnnotation.Subject = lineAnnot.subject;
        if (!isNullOrUndefined(lineAnnot.modifiedDate)) {
            shapeAnnotation.ModifiedDate = this.formatDate(lineAnnot.modifiedDate);
        }
        else {
            shapeAnnotation.ModifiedDate = this.formatDate(new Date());
        }
        shapeAnnotation.Note = this.getValidNoteContent(lineAnnot.text);
        shapeAnnotation.Thickness = lineAnnot.border.width;
        shapeAnnotation.BorderStyle = this.getBorderStylesString(lineAnnot.border.style);
        shapeAnnotation.BorderDashArray = lineAnnot.border.dash ? lineAnnot.border.dash[0] ? lineAnnot.border.dash[0] : 0 : 0;
        shapeAnnotation.Opacity = lineAnnot.opacity;
        shapeAnnotation.RotateAngle = this.getRotateAngleString(lineAnnot.rotate);
        shapeAnnotation.AnnotType = 'shape';
        shapeAnnotation.EnableShapeLabel = false;
        if (shapeFreeText != null) {
            shapeAnnotation.EnableShapeLabel = true;
            shapeAnnotation.LabelContent = shapeFreeText.text;
            shapeAnnotation.LabelFillColor = 'rgba(' + shapeFreeText.color[0] + ',' + shapeFreeText.color[1] + ',' + shapeFreeText.color[2] + ',' + (shapeFreeText.color[3] ? shapeFreeText.color[3] : 1) + ')';
            shapeAnnotation.FontColor = 'rgba(' + shapeFreeText.textMarkUpColor[0] + ',' + shapeFreeText.textMarkUpColor[1] + ',' + shapeFreeText.textMarkUpColor[2] + ',' + (shapeFreeText.textMarkUpColor[3] ? shapeFreeText.textMarkUpColor[3] : 1) + ')';
            shapeAnnotation.LabelBorderColor = 'rgba(' + shapeFreeText.borderColor[0] + ',' + shapeFreeText.borderColor[1] + ',' + shapeFreeText.borderColor[2] + ',' + (shapeFreeText.borderColor[3] ? shapeFreeText.borderColor[3] : 1) + ')';
            shapeAnnotation.FontSize = shapeFreeText.font.size;
        }
        for (var i = 0; i < lineAnnot.reviewHistory.count; i++) {
            shapeAnnotation.State = this.getStateString(lineAnnot.reviewHistory.at(parseInt(i.toString(), 10)).state);
            shapeAnnotation.StateModel = this.getStateModelString(lineAnnot.reviewHistory.at(parseInt(i.toString(), 10)).stateModel);
        }
        if (isNullOrUndefined(shapeAnnotation.State) || isNullOrUndefined(shapeAnnotation.StateModel)) {
            shapeAnnotation.State = 'Unmarked';
            shapeAnnotation.StateModel = 'None';
        }
        shapeAnnotation.Comments = new Array();
        for (var i = 0; i < lineAnnot.comments.count; i++) {
            var annot = this.loadPopupAnnotation(lineAnnot.comments.at(i), height, width, pageRotation);
            shapeAnnotation.Comments.push(annot);
        }
        shapeAnnotation.Bounds = this.getBounds(lineAnnot.bounds, height, width, pageRotation);
        shapeAnnotation.LineHeadStart = this.getLineEndingStyleString(lineAnnot.lineEndingStyle.begin);
        shapeAnnotation.LineHeadEnd = this.getLineEndingStyleString(lineAnnot.lineEndingStyle.end);
        if (!isNullOrUndefined(lineAnnot._borderEffect)) {
            if (lineAnnot._borderEffect.style === PdfBorderEffectStyle.cloudy) {
                shapeAnnotation.IsCloudShape = true;
                shapeAnnotation.CloudIntensity = lineAnnot._borderEffect.intensity;
            }
            else {
                shapeAnnotation.IsCloudShape = false;
                shapeAnnotation.CloudIntensity = 0;
            }
        }
        else {
            shapeAnnotation.IsCloudShape = false;
            shapeAnnotation.CloudIntensity = 0;
        }
        shapeAnnotation.VertexPoints = this.getLinePoints(lineAnnot.linePoints, height, width, pageRotation, lineAnnot._page);
        if (lineAnnot._dictionary.has('RD') && !isNullOrUndefined(lineAnnot._dictionary.get('RD'))) {
            shapeAnnotation.RectangleDifference = lineAnnot._dictionary.get('RD');
        }
        else {
            shapeAnnotation.RectangleDifference = new Array();
        }
        this.updateIsLockProperty(shapeAnnotation, lineAnnot);
        if (lineAnnot._dictionary.has('AllowedInteractions')) {
            var allowedInteractions = lineAnnot.getValues('AllowedInteractions');
            var text = allowedInteractions[0];
            shapeAnnotation.AllowedInteractions = JSON.parse(text);
        }
        var color = !isNullOrUndefined(lineAnnot.color) ? lineAnnot.color : [0, 0, 0];
        shapeAnnotation.StrokeColor = 'rgba(' + color[0] + ',' + color[1] + ',' + color[2] + ',' + (color[3] ? color[3] : 1) + ')';
        var fillOpacity = lineAnnot.color && lineAnnot.color[3] ? lineAnnot.color[3] : 1;
        if (lineAnnot._dictionary.has('FillOpacity') && !isNullOrUndefined(lineAnnot._dictionary.get('FillOpacity'))) {
            fillOpacity = parseInt(lineAnnot._dictionary.get('FillOpacity').toString(), 10);
        }
        fillOpacity = lineAnnot.innerColor ? fillOpacity : 0;
        lineAnnot.innerColor = lineAnnot.innerColor ? lineAnnot.innerColor : [255, 255, 255];
        shapeAnnotation.FillColor = 'rgba(' + lineAnnot.innerColor[0] + ',' + lineAnnot.innerColor[1] + ',' + lineAnnot.innerColor[2] + ',' + fillOpacity + ')';
        if (lineAnnot._dictionary.has('CustomData') && !isNullOrUndefined(lineAnnot._dictionary.get('CustomData'))) {
            var customData = lineAnnot._dictionary.get('CustomData');
            if (customData != null) {
                shapeAnnotation.ExistingCustomData = customData;
            }
        }
        if (lineAnnot.lineIntent === PdfLineIntent.lineArrow || !lineAnnot._dictionary.has('Measure')) {
            return shapeAnnotation;
        }
        else {
            var measureShapeAnnotation = new MeasureShapeAnnotationBase(shapeAnnotation);
            if (lineAnnot._dictionary.has('Measure')) {
                measureShapeAnnotation.Calibrate = this.getMeasureObject(lineAnnot);
            }
            measureShapeAnnotation.Indent = lineAnnot.lineIntent.toString();
            measureShapeAnnotation.Caption = lineAnnot.caption.cap;
            measureShapeAnnotation.LeaderLength = lineAnnot.leaderExt;
            measureShapeAnnotation.LeaderLineExtension = lineAnnot.leaderLine;
            measureShapeAnnotation.ExistingCustomData = shapeAnnotation.ExistingCustomData;
            if (lineAnnot._dictionary.has('LLO')) {
                measureShapeAnnotation.LeaderLineOffset = lineAnnot._dictionary.get('LLO');
            }
            else {
                measureShapeAnnotation.LeaderLineOffset = 0;
            }
            measureShapeAnnotation.CaptionPosition = lineAnnot.caption.type.toString();
            if (lineAnnot.flags === PdfAnnotationFlag.readOnly) {
                measureShapeAnnotation.IsCommentLock = true;
            }
            else {
                measureShapeAnnotation.IsCommentLock = false;
            }
            if (lineAnnot.flags === PdfAnnotationFlag.print) {
                measureShapeAnnotation.IsPrint = true;
            }
            if (lineAnnot._dictionary.has('CustomData') && !isNullOrUndefined(lineAnnot._dictionary.get('CustomData'))) {
                var customData = lineAnnot._dictionary.get('CustomData');
                if (customData != null) {
                    measureShapeAnnotation.ExistingCustomData = customData;
                }
            }
            return measureShapeAnnotation;
        }
    };
    AnnotationRenderer.prototype.getLinePoints = function (points, pageHeight, pageWidth, pageRotation, page) {
        var linePoints = [];
        var startingPoint = new AnnotPoint(points[0], points[1]);
        var endingPoint = new AnnotPoint(points[2], points[3]);
        var cropBox = this.getBothCropBoxValue(page);
        var cropBoxX = 0;
        var cropBoxY = 0;
        if (!(cropBox[0] === 0 && page.cropBox[2] === page.size[2] && cropBox[1] === page.size[3])) {
            cropBoxX = cropBox[0];
            cropBoxY = cropBox[1];
        }
        if (pageRotation === 0) {
            startingPoint = { X: this.convertPointToPixel(points[0]) - this.convertPointToPixel(cropBoxX),
                Y: (pageHeight - this.convertPointToPixel(points[1])) + this.convertPointToPixel(cropBoxY) };
            endingPoint = { X: this.convertPointToPixel(points[2]) - this.convertPointToPixel(cropBoxX),
                Y: (pageHeight - this.convertPointToPixel(points[3])) + this.convertPointToPixel(cropBoxY) };
        }
        else if (pageRotation === 1) {
            startingPoint = { X: this.convertPointToPixel(points[1]), Y: this.convertPointToPixel(points[0]) };
            endingPoint = { X: this.convertPointToPixel(points[3]), Y: this.convertPointToPixel(points[2]) };
        }
        else if (pageRotation === 2) {
            startingPoint = { X: pageWidth - this.convertPointToPixel(points[0]), Y: this.convertPointToPixel(points[1]) };
            endingPoint = { X: pageWidth - this.convertPointToPixel(points[2]), Y: this.convertPointToPixel(points[3]) };
        }
        else if (pageRotation === 3) {
            startingPoint = { X: (pageWidth - this.convertPointToPixel(points[1])), Y: (pageHeight - this.convertPointToPixel(points[0])) };
            endingPoint = { X: pageWidth - this.convertPointToPixel(points[3]), Y: pageHeight - this.convertPointToPixel(points[2]) };
        }
        linePoints.push(startingPoint);
        linePoints.push(endingPoint);
        return linePoints;
    };
    /**
     * @param {PdfEllipseAnnotation} ellipseAnnot - ellipseAnnot
     * @param {number} height - height
     * @param {number} width - width
     * @param {number} pageRotation - pageRotation
     * @param {PdfFreeTextAnnotation} shapeFreeText - shapeFreeTezt
     * @private
     * @returns {void}
     */
    AnnotationRenderer.prototype.loadEllipseAnnotation = function (ellipseAnnot, height, width, pageRotation, shapeFreeText) {
        var shapeAnnotation = new ShapeAnnotationBase();
        shapeAnnotation.ShapeAnnotationType = 'Circle';
        shapeAnnotation.Author = ellipseAnnot.author;
        shapeAnnotation.AnnotName = ellipseAnnot.name;
        shapeAnnotation.Subject = ellipseAnnot.subject;
        if (!isNullOrUndefined(ellipseAnnot.modifiedDate)) {
            shapeAnnotation.ModifiedDate = this.formatDate(ellipseAnnot.modifiedDate);
        }
        else {
            shapeAnnotation.ModifiedDate = this.formatDate(new Date());
        }
        shapeAnnotation.Note = this.getValidNoteContent(ellipseAnnot.text);
        shapeAnnotation.Thickness = ellipseAnnot.border.width;
        shapeAnnotation.BorderStyle = this.getBorderStylesString(ellipseAnnot.border.style);
        shapeAnnotation.BorderDashArray = ellipseAnnot.border.dash ? ellipseAnnot.border.dash[0] ? ellipseAnnot.border.dash[0] : 0 : 0;
        shapeAnnotation.Opacity = ellipseAnnot.opacity;
        shapeAnnotation.RotateAngle = this.getRotateAngleString(ellipseAnnot.rotate);
        shapeAnnotation.AnnotType = 'shape';
        for (var i = 0; i < ellipseAnnot.reviewHistory.count; i++) {
            shapeAnnotation.State = this.getStateString(ellipseAnnot.reviewHistory.at(parseInt(i.toString(), 10)).state);
            shapeAnnotation.StateModel = this.getStateModelString(ellipseAnnot.reviewHistory.at(parseInt(i.toString(), 10)).stateModel);
        }
        if (isNullOrUndefined(shapeAnnotation.State) || isNullOrUndefined(shapeAnnotation.StateModel)) {
            shapeAnnotation.State = 'Unmarked';
            shapeAnnotation.StateModel = 'None';
        }
        shapeAnnotation.Comments = new Array();
        for (var i = 0; i < ellipseAnnot.comments.count; i++) {
            var annot = this.loadPopupAnnotation(ellipseAnnot.comments.at(i), height, width, pageRotation);
            shapeAnnotation.Comments.push(annot);
        }
        shapeAnnotation.Bounds = this.getBounds(ellipseAnnot.bounds, height, width, pageRotation);
        shapeAnnotation.LineHeadStart = 'None';
        shapeAnnotation.LineHeadEnd = 'None';
        if (!isNullOrUndefined(ellipseAnnot._borderEffect)) {
            if (ellipseAnnot._borderEffect.style === PdfBorderEffectStyle.cloudy) {
                shapeAnnotation.IsCloudShape = true;
                shapeAnnotation.CloudIntensity = ellipseAnnot._borderEffect.intensity;
            }
            else {
                shapeAnnotation.IsCloudShape = false;
                shapeAnnotation.CloudIntensity = 0;
            }
        }
        else {
            shapeAnnotation.IsCloudShape = false;
            shapeAnnotation.CloudIntensity = 0;
        }
        if (ellipseAnnot._dictionary.has('RD') && !isNullOrUndefined(ellipseAnnot._dictionary.get('RD'))) {
            shapeAnnotation.RectangleDifference = ellipseAnnot._dictionary.get('RD');
        }
        else {
            shapeAnnotation.RectangleDifference = new Array();
        }
        this.updateIsLockProperty(shapeAnnotation, ellipseAnnot);
        if (ellipseAnnot._dictionary.has('AllowedInteractions')) {
            var allowedInteractions = ellipseAnnot.getValues('AllowedInteractions');
            var text = allowedInteractions[0];
            shapeAnnotation.AllowedInteractions = JSON.parse(text);
        }
        shapeAnnotation.StrokeColor = 'rgba(' + ellipseAnnot.color[0] + ',' + ellipseAnnot.color[1] + ',' + ellipseAnnot.color[2] + ',' + (ellipseAnnot.color[3] ? ellipseAnnot.color[3] : 1) + ')';
        var fillOpacity = ellipseAnnot.color[3] ? ellipseAnnot.color[3] : 1;
        if (ellipseAnnot._dictionary.has('FillOpacity') && !isNullOrUndefined(ellipseAnnot._dictionary.get('FillOpacity'))) {
            fillOpacity = parseInt(ellipseAnnot._dictionary.get('FillOpacity').toString(), 10);
        }
        fillOpacity = ellipseAnnot.innerColor ? fillOpacity : 0;
        ellipseAnnot.innerColor = ellipseAnnot.innerColor ? ellipseAnnot.innerColor : [255, 255, 255];
        shapeAnnotation.FillColor = 'rgba(' + ellipseAnnot.innerColor[0] + ',' + ellipseAnnot.innerColor[1] + ',' + ellipseAnnot.innerColor[2] + ',' + fillOpacity + ')';
        shapeAnnotation.EnableShapeLabel = false;
        if (shapeFreeText != null) {
            shapeAnnotation.EnableShapeLabel = true;
            shapeAnnotation.LabelContent = shapeFreeText.text;
            shapeAnnotation.LabelFillColor = 'rgba(' + shapeFreeText.color[0] + ',' + shapeFreeText.color[1] + ',' + shapeFreeText.color[2] + ',' + (shapeFreeText.color[3] ? shapeFreeText.color[3] : 1) + ')';
            shapeAnnotation.FontColor = 'rgba(' + shapeFreeText.textMarkUpColor[0] + ',' + shapeFreeText.textMarkUpColor[1] + ',' + shapeFreeText.textMarkUpColor[2] + ',' + (shapeFreeText.textMarkUpColor[3] ? shapeFreeText.textMarkUpColor[3] : 1) + ')';
            shapeAnnotation.LabelBorderColor = 'rgba(' + shapeFreeText.borderColor[0] + ',' + shapeFreeText.borderColor[1] + ',' + shapeFreeText.borderColor[2] + ',' + (shapeFreeText.borderColor[3] ? shapeFreeText.borderColor[3] : 1) + ')';
            shapeAnnotation.FontSize = shapeFreeText.font.size;
        }
        if (ellipseAnnot._dictionary.has('CustomData') && !isNullOrUndefined(ellipseAnnot._dictionary.get('CustomData'))) {
            var customData = ellipseAnnot._dictionary.get('CustomData');
            if (customData != null) {
                shapeAnnotation.ExistingCustomData = customData;
            }
        }
        if (ellipseAnnot._dictionary.has('Measure')) {
            shapeAnnotation.FillColor = 'rgba(' + ellipseAnnot.innerColor[0] + ',' + ellipseAnnot.innerColor[1] + ',' + ellipseAnnot.innerColor[2] + ',' + fillOpacity + ')';
            var measureShapeAnnotation = new MeasureShapeAnnotationBase(shapeAnnotation);
            measureShapeAnnotation.Calibrate = this.getMeasureObject(ellipseAnnot);
            if (ellipseAnnot._dictionary.has('IT')) {
                measureShapeAnnotation.Indent = ellipseAnnot._dictionary.get('IT');
            }
            else {
                measureShapeAnnotation.Indent = 'PolyLineDimension';
            }
            measureShapeAnnotation.Caption = false;
            measureShapeAnnotation.LeaderLength = 0;
            measureShapeAnnotation.LeaderLineExtension = 0;
            measureShapeAnnotation.LeaderLineOffset = 0;
            measureShapeAnnotation.CaptionPosition = '';
            if (ellipseAnnot.flags === PdfAnnotationFlag.readOnly) {
                measureShapeAnnotation.IsCommentLock = true;
            }
            else {
                measureShapeAnnotation.IsCommentLock = false;
            }
            if (ellipseAnnot.flags === PdfAnnotationFlag.print) {
                measureShapeAnnotation.IsPrint = true;
            }
            if (ellipseAnnot._dictionary.has('CustomData') && !isNullOrUndefined(ellipseAnnot._dictionary.get('CustomData'))) {
                var customData = ellipseAnnot._dictionary.get('CustomData');
                if (customData != null) {
                    measureShapeAnnotation.ExistingCustomData = customData;
                }
            }
            return measureShapeAnnotation;
        }
        else {
            return shapeAnnotation;
        }
    };
    /**
     * @param {PdfPolygonAnnotation} polygonAnnot - polygonAnnot
     * @param {number} height - height
     * @param {number} width - width
     * @param {number} pageRotation - pageRotation
     * @param {PdfFreeTextAnnotation} shapeFreeText - shapeFreeText
     * @private
     * @returns {void}
     */
    AnnotationRenderer.prototype.loadPolygonAnnotation = function (polygonAnnot, height, width, pageRotation, shapeFreeText) {
        var shapeAnnotation = new ShapeAnnotationBase();
        shapeAnnotation.ShapeAnnotationType = 'Polygon';
        shapeAnnotation.Author = polygonAnnot.author;
        shapeAnnotation.AnnotName = polygonAnnot.name;
        shapeAnnotation.Subject = polygonAnnot.subject;
        if (!isNullOrUndefined(polygonAnnot.modifiedDate)) {
            shapeAnnotation.ModifiedDate = this.formatDate(polygonAnnot.modifiedDate);
        }
        else {
            shapeAnnotation.ModifiedDate = this.formatDate(new Date());
        }
        shapeAnnotation.Note = this.getValidNoteContent(polygonAnnot.text);
        shapeAnnotation.Thickness = polygonAnnot.border.width;
        shapeAnnotation.BorderStyle = this.getBorderStylesString(polygonAnnot.border.style);
        shapeAnnotation.BorderDashArray = polygonAnnot.border.dash ? polygonAnnot.border.dash[0] ? polygonAnnot.border.dash[0] : 0 : 0;
        shapeAnnotation.Opacity = polygonAnnot.opacity;
        shapeAnnotation.RotateAngle = this.getRotateAngleString(polygonAnnot.rotate);
        shapeAnnotation.AnnotType = 'shape';
        for (var i = 0; i < polygonAnnot.reviewHistory.count; i++) {
            shapeAnnotation.State = this.getStateString(polygonAnnot.reviewHistory.at(parseInt(i.toString(), 10)).state);
            shapeAnnotation.StateModel = this.getStateModelString(polygonAnnot.reviewHistory.at(parseInt(i.toString(), 10)).stateModel);
        }
        if (isNullOrUndefined(shapeAnnotation.State) || isNullOrUndefined(shapeAnnotation.StateModel)) {
            shapeAnnotation.State = 'Unmarked';
            shapeAnnotation.StateModel = 'None';
        }
        shapeAnnotation.Comments = new Array();
        for (var i = 0; i < polygonAnnot.comments.count; i++) {
            var annot = this.loadPopupAnnotation(polygonAnnot.comments.at(i), height, width, pageRotation);
            shapeAnnotation.Comments.push(annot);
        }
        shapeAnnotation.Bounds = this.getBounds(polygonAnnot.bounds, height, width, pageRotation);
        if (!isNullOrUndefined(polygonAnnot._dictionary.get('Vertices'))) {
            shapeAnnotation.VertexPoints = this.getVertexPoints(polygonAnnot._dictionary.get('Vertices'), width, height, pageRotation, polygonAnnot._page);
        }
        if (!isNullOrUndefined(shapeAnnotation.VertexPoints) && shapeAnnotation.VertexPoints[0] !==
            shapeAnnotation.VertexPoints[shapeAnnotation.VertexPoints.length - 1]) {
            shapeAnnotation.VertexPoints.push(shapeAnnotation.VertexPoints[0]);
        }
        shapeAnnotation.StrokeColor = 'rgba(' + polygonAnnot.color[0] + ',' + polygonAnnot.color[1] + ',' + polygonAnnot.color[2] + ',' + (polygonAnnot.color[3] ? polygonAnnot.color[3] : 1) + ')';
        var fillOpacity = polygonAnnot.color[3] ? polygonAnnot.color[3] : 1;
        if (polygonAnnot._dictionary.has('FillOpacity') && !isNullOrUndefined(polygonAnnot._dictionary.get('FillOpacity'))) {
            fillOpacity = parseInt(polygonAnnot._dictionary.get('FillOpacity').toString(), 10);
        }
        fillOpacity = polygonAnnot.innerColor ? fillOpacity : 0;
        polygonAnnot.innerColor = polygonAnnot.innerColor ? polygonAnnot.innerColor : [255, 255, 255];
        shapeAnnotation.FillColor = 'rgba(' + polygonAnnot.innerColor[0] + ',' + polygonAnnot.innerColor[1] + ',' + polygonAnnot.innerColor[2] + ',' + fillOpacity + ')';
        shapeAnnotation.LineHeadStart = 'None';
        shapeAnnotation.LineHeadEnd = 'None';
        shapeAnnotation.EnableShapeLabel = false;
        if (shapeFreeText != null) {
            shapeAnnotation.EnableShapeLabel = true;
            shapeAnnotation.LabelContent = shapeFreeText.text;
            shapeAnnotation.LabelFillColor = 'rgba(' + shapeFreeText.color[0] + ',' + shapeFreeText.color[1] + ',' + shapeFreeText.color[2] + ',' + (shapeFreeText.color[3] ? shapeFreeText.color[3] : 1) + ')';
            shapeAnnotation.FontColor = 'rgba(' + shapeFreeText.textMarkUpColor[0] + ',' + shapeFreeText.textMarkUpColor[1] + ',' + shapeFreeText.textMarkUpColor[2] + ',' + (shapeFreeText.textMarkUpColor[3] ? shapeFreeText.textMarkUpColor[3] : 1) + ')';
            shapeAnnotation.LabelBorderColor = 'rgba(' + shapeFreeText.borderColor[0] + ',' + shapeFreeText.borderColor[1] + ',' + shapeFreeText.borderColor[2] + ',' + (shapeFreeText.borderColor[3] ? shapeFreeText.borderColor[3] : 1) + ')';
            shapeAnnotation.FontSize = shapeFreeText.font.size;
        }
        if (!isNullOrUndefined(polygonAnnot.borderEffect)) {
            if (polygonAnnot.borderEffect.style === PdfBorderEffectStyle.cloudy) {
                shapeAnnotation.IsCloudShape = true;
                shapeAnnotation.CloudIntensity = polygonAnnot.borderEffect.intensity;
            }
            else {
                shapeAnnotation.IsCloudShape = false;
                shapeAnnotation.CloudIntensity = 0;
            }
        }
        else {
            shapeAnnotation.IsCloudShape = false;
            shapeAnnotation.CloudIntensity = 0;
        }
        if (polygonAnnot._dictionary.has('RD') && !isNullOrUndefined(polygonAnnot._dictionary.get('RD'))) {
            shapeAnnotation.RectangleDifference = polygonAnnot._dictionary.get('RD');
        }
        else {
            shapeAnnotation.RectangleDifference = new Array();
        }
        this.updateIsLockProperty(shapeAnnotation, polygonAnnot);
        if (polygonAnnot._dictionary.has('CustomData') && !isNullOrUndefined(polygonAnnot._dictionary.get('CustomData'))) {
            var customData = polygonAnnot._dictionary.get('CustomData');
            if (customData != null) {
                shapeAnnotation.ExistingCustomData = customData;
            }
        }
        if (polygonAnnot._dictionary.has('AllowedInteractions')) {
            var allowedInteractions = polygonAnnot.getValues('AllowedInteractions');
            var text = allowedInteractions[0];
            shapeAnnotation.AllowedInteractions = JSON.parse(text);
        }
        if (polygonAnnot._dictionary.has('Measure')) {
            var measureShapeAnnotation = new MeasureShapeAnnotationBase(shapeAnnotation);
            if (polygonAnnot._dictionary.has('IT') && !isNullOrUndefined(polygonAnnot._dictionary.get('IT'))) {
                measureShapeAnnotation.Indent = polygonAnnot._dictionary.get('IT').name;
            }
            else {
                measureShapeAnnotation.Indent = 'PolygonDimension';
            }
            measureShapeAnnotation.Calibrate = this.getMeasureObject(polygonAnnot);
            if (isNullOrUndefined(measureShapeAnnotation.Calibrate)) {
                return shapeAnnotation;
            }
            if (measureShapeAnnotation.Indent === 'PolygonVolume' && polygonAnnot._dictionary.has('Depth') && (!isNullOrUndefined(polygonAnnot._dictionary.get('Depth')))) {
                measureShapeAnnotation.Calibrate.Depth = polygonAnnot._dictionary.get('Depth');
            }
            measureShapeAnnotation.Caption = false;
            measureShapeAnnotation.LeaderLength = 0;
            measureShapeAnnotation.LeaderLineExtension = 0;
            measureShapeAnnotation.LeaderLineOffset = 0;
            measureShapeAnnotation.CaptionPosition = '';
            if (polygonAnnot.flags === PdfAnnotationFlag.readOnly) {
                measureShapeAnnotation.IsCommentLock = true;
            }
            else {
                measureShapeAnnotation.IsCommentLock = false;
            }
            if (polygonAnnot.flags === PdfAnnotationFlag.print) {
                measureShapeAnnotation.IsPrint = true;
            }
            if (polygonAnnot._dictionary.has('CustomData') && !isNullOrUndefined(polygonAnnot._dictionary.get('CustomData'))) {
                var customData = polygonAnnot._dictionary.get('CustomData');
                if (!isNullOrUndefined(customData)) {
                    measureShapeAnnotation.ExistingCustomData = customData;
                }
            }
            return measureShapeAnnotation;
        }
        else {
            return shapeAnnotation;
        }
    };
    /**
     * @param {PdfPolyLineAnnotation} polyLineAnnot - polyLineAnnot
     * @param {number} height -height
     * @param {number} width - width
     * @param {number} pageRotation - pageRotation
     * @param {PdfFreeTextAnnotation} shapeFreeText - shapeFreeText
     * @private
     * @returns {void}
     */
    AnnotationRenderer.prototype.loadPolylineAnnotation = function (polyLineAnnot, height, width, pageRotation, shapeFreeText) {
        var shapeAnnotation = new ShapeAnnotationBase();
        shapeAnnotation.ShapeAnnotationType = 'Polyline';
        shapeAnnotation.Author = polyLineAnnot.author;
        shapeAnnotation.AnnotName = polyLineAnnot.name;
        shapeAnnotation.Subject = polyLineAnnot.subject;
        if (!isNullOrUndefined(polyLineAnnot.modifiedDate)) {
            shapeAnnotation.ModifiedDate = this.formatDate(polyLineAnnot.modifiedDate);
        }
        else {
            shapeAnnotation.ModifiedDate = this.formatDate(new Date());
        }
        shapeAnnotation.Note = this.getValidNoteContent(polyLineAnnot.text);
        shapeAnnotation.Thickness = polyLineAnnot.border.width;
        shapeAnnotation.BorderStyle = this.getBorderStylesString(polyLineAnnot.border.style);
        shapeAnnotation.BorderDashArray = polyLineAnnot.border.dash ? polyLineAnnot.border.dash[0] ? polyLineAnnot.border.dash[0] : 0 : 0;
        shapeAnnotation.Opacity = polyLineAnnot.opacity;
        shapeAnnotation.RotateAngle = this.getRotateAngleString(polyLineAnnot.rotate);
        shapeAnnotation.AnnotType = 'shape';
        if (!isNullOrUndefined(polyLineAnnot.reviewHistory)) {
            for (var i = 0; i < polyLineAnnot.reviewHistory.count; i++) {
                shapeAnnotation.State = this.getStateString(polyLineAnnot.reviewHistory.at(parseInt(i.toString(), 10)).state);
                shapeAnnotation.StateModel = this.getStateModelString(polyLineAnnot.reviewHistory.at(parseInt(i.toString(), 10)).
                    stateModel);
            }
        }
        if (isNullOrUndefined(shapeAnnotation.State) || isNullOrUndefined(shapeAnnotation.StateModel)) {
            shapeAnnotation.State = 'Unmarked';
            shapeAnnotation.StateModel = 'None';
        }
        shapeAnnotation.Comments = new Array();
        if (!isNullOrUndefined(polyLineAnnot.comments)) {
            for (var i = 0; i < polyLineAnnot.comments.count; i++) {
                var annot = this.loadPopupAnnotation(polyLineAnnot.comments.at(i), height, width, pageRotation);
                shapeAnnotation.Comments.push(annot);
            }
        }
        shapeAnnotation.Bounds = this.getBounds(polyLineAnnot.bounds, height, width, pageRotation);
        if (!isNullOrUndefined(polyLineAnnot._dictionary.get('Vertices'))) {
            shapeAnnotation.VertexPoints = this.getVertexPoints(polyLineAnnot._dictionary.get('Vertices'), width, height, pageRotation, polyLineAnnot._page);
        }
        shapeAnnotation.StrokeColor = 'rgba(' + polyLineAnnot.color[0] + ',' + polyLineAnnot.color[1] + ',' + polyLineAnnot.color[2] + ',' + (polyLineAnnot.color[3] ? polyLineAnnot.color[3] : 1) + ')';
        var fillOpacity = polyLineAnnot.color[3] ? polyLineAnnot.color[3] : 1;
        if (polyLineAnnot._dictionary.has('FillOpacity') && !isNullOrUndefined(polyLineAnnot._dictionary.get('FillOpacity'))) {
            fillOpacity = parseInt(polyLineAnnot._dictionary.get('FillOpacity').toString(), 10);
        }
        fillOpacity = polyLineAnnot.innerColor ? fillOpacity : 0;
        polyLineAnnot.innerColor = polyLineAnnot.innerColor ? polyLineAnnot.innerColor : [255, 255, 255];
        shapeAnnotation.FillColor = 'rgba(' + polyLineAnnot.innerColor[0] + ',' + polyLineAnnot.innerColor[1] + ',' + polyLineAnnot.innerColor[2] + ',' + fillOpacity + ')';
        shapeAnnotation.LineHeadStart = this.getLineEndingStyleString(polyLineAnnot.beginLineStyle);
        shapeAnnotation.LineHeadEnd = this.getLineEndingStyleString(polyLineAnnot.endLineStyle);
        shapeAnnotation.EnableShapeLabel = false;
        if (shapeFreeText != null) {
            shapeAnnotation.EnableShapeLabel = true;
            shapeAnnotation.LabelContent = shapeFreeText.text;
            shapeAnnotation.LabelFillColor = 'rgba(' + shapeFreeText.color[0] + ',' + shapeFreeText.color[1] + ',' + shapeFreeText.color[2] + ',' + (shapeFreeText.color[3] ? shapeFreeText.color[3] : 1) + ')';
            shapeAnnotation.FontColor = 'rgba(' + shapeFreeText.textMarkUpColor[0] + ',' + shapeFreeText.textMarkUpColor[1] + ',' + shapeFreeText.textMarkUpColor[2] + ',' + (shapeFreeText.textMarkUpColor[3] ? shapeFreeText.textMarkUpColor[3] : 1) + ')';
            shapeAnnotation.LabelBorderColor = 'rgba(' + shapeFreeText.borderColor[0] + ',' + shapeFreeText.borderColor[1] + ',' + shapeFreeText.borderColor[2] + ',' + (shapeFreeText.borderColor[3] ? shapeFreeText.borderColor[3] : 1) + ')';
            shapeAnnotation.FontSize = shapeFreeText.font.size;
        }
        if (!isNullOrUndefined(polyLineAnnot._borderEffect)) {
            if (polyLineAnnot._borderEffect.style === PdfBorderEffectStyle.cloudy) {
                shapeAnnotation.IsCloudShape = true;
                shapeAnnotation.CloudIntensity = polyLineAnnot._borderEffect.intensity;
            }
            else {
                shapeAnnotation.IsCloudShape = false;
                shapeAnnotation.CloudIntensity = 0;
            }
        }
        else {
            shapeAnnotation.IsCloudShape = false;
            shapeAnnotation.CloudIntensity = 0;
        }
        if (polyLineAnnot._dictionary.has('RD') && !isNullOrUndefined(polyLineAnnot._dictionary.get('RD'))) {
            shapeAnnotation.RectangleDifference = polyLineAnnot._dictionary.get('RD');
        }
        else {
            shapeAnnotation.RectangleDifference = new Array();
        }
        this.updateIsLockProperty(shapeAnnotation, polyLineAnnot);
        if (polyLineAnnot._dictionary.has('CustomData') && !isNullOrUndefined(polyLineAnnot._dictionary.get('CustomData'))) {
            var customData = polyLineAnnot._dictionary.get('CustomData');
            if (customData != null) {
                shapeAnnotation.ExistingCustomData = customData;
            }
        }
        if (polyLineAnnot._dictionary.has('AllowedInteractions')) {
            var allowedInteractions = polyLineAnnot.getValues('AllowedInteractions');
            var text = allowedInteractions[0];
            shapeAnnotation.AllowedInteractions = JSON.parse(text);
        }
        if (polyLineAnnot._dictionary.has('Measure')) {
            shapeAnnotation.FillColor = 'rgba(' + polyLineAnnot.innerColor[0] + ',' + polyLineAnnot.innerColor[1] + ',' + polyLineAnnot.innerColor[2] + ',' + fillOpacity + ')';
            var measureShapeAnnotation = new MeasureShapeAnnotationBase(shapeAnnotation);
            measureShapeAnnotation.Calibrate = this.getMeasureObject(polyLineAnnot);
            if (polyLineAnnot._dictionary.has('IT')) {
                measureShapeAnnotation.Indent = polyLineAnnot._dictionary.get('IT').name;
            }
            else {
                measureShapeAnnotation.Indent = 'PolyLineDimension';
            }
            measureShapeAnnotation.Caption = false;
            measureShapeAnnotation.LeaderLength = 0;
            measureShapeAnnotation.LeaderLineExtension = 0;
            measureShapeAnnotation.LeaderLineOffset = 0;
            measureShapeAnnotation.CaptionPosition = '';
            if (polyLineAnnot.flags === PdfAnnotationFlag.readOnly) {
                measureShapeAnnotation.IsCommentLock = true;
            }
            else {
                measureShapeAnnotation.IsCommentLock = false;
            }
            if (polyLineAnnot.flags === PdfAnnotationFlag.print) {
                measureShapeAnnotation.IsPrint = true;
            }
            if (polyLineAnnot._dictionary.has('CustomData') && !isNullOrUndefined(polyLineAnnot._dictionary.get('CustomData'))) {
                var customData = polyLineAnnot._dictionary.get('CustomData');
                if (customData != null) {
                    measureShapeAnnotation.ExistingCustomData = customData;
                }
            }
            return measureShapeAnnotation;
        }
        else {
            return shapeAnnotation;
        }
    };
    /**
     * @private
     * @param {PdfRubberStampAnnotation} annotation - annotation
     * @param {number} pageNumber - pageNumber
     * @returns {void}
     */
    AnnotationRenderer.prototype.loadSignatureImage = function (annotation, pageNumber) {
        var stampAnnotation = annotation;
        var formsFields = new SignatureAnnotationBase();
        formsFields.SignatureName = stampAnnotation.name;
        var dictionary = annotation._dictionary.get('AP');
        if (dictionary === null) {
            var pdfReference = annotation._dictionary.get('AP');
            if (pdfReference !== null && pdfReference.Object !== null) {
                dictionary = pdfReference.Object;
            }
        }
        if (dictionary !== null && dictionary.has('N')) {
            this.m_renderer.findStampImage(annotation);
        }
        formsFields.Bounds = new Rect(stampAnnotation.bounds.x, stampAnnotation.bounds.y, stampAnnotation.bounds.width, stampAnnotation.bounds.height);
        formsFields.PathData = this.m_renderer.imageData;
        formsFields.AnnotationType = 'SignatureImage';
        formsFields.PageNumber = pageNumber;
        formsFields.Opacity = stampAnnotation.opacity;
        formsFields.StrokeColor = 'rgba(' + stampAnnotation.color + ',' + stampAnnotation.color[1] + ',' + stampAnnotation.color[2] + ',' + (stampAnnotation.color[3] ? stampAnnotation.color[3] : 1) + ')';
        return formsFields;
    };
    AnnotationRenderer.prototype.getMeasureObject = function (annotation) {
        var measureObject = new Measure();
        var measureDictionary;
        if (annotation._dictionary.has('Measure')) {
            measureDictionary = annotation._dictionary.get('Measure');
        }
        if (measureDictionary.has('R')) {
            measureObject.Ratio = measureDictionary.get('R');
        }
        else {
            return null;
        }
        var xList;
        if (measureDictionary.has('X')) {
            xList = this.getMeasureValues(measureDictionary.getArray('X'));
        }
        measureObject.X = xList;
        var distanceList;
        if (measureDictionary.has('D')) {
            distanceList = this.getMeasureValues(measureDictionary.getArray('D'));
        }
        measureObject.Distance = distanceList;
        var areaList;
        if (measureDictionary.has('A')) {
            areaList = this.getMeasureValues(measureDictionary.getArray('A'));
        }
        measureObject.Area = areaList;
        var angleList;
        if (measureDictionary.has('T')) {
            angleList = this.getMeasureValues(measureDictionary.getArray('T'));
        }
        measureObject.Angle = angleList;
        var volumeList;
        if (measureDictionary.has('V')) {
            volumeList = this.getMeasureValues(measureDictionary.getArray('V'));
        }
        measureObject.Volume = volumeList;
        if (!isNullOrUndefined(measureDictionary) && measureDictionary.has('TargetUnitConversion')) {
            measureObject.TargetUnitConversion = measureDictionary.get('TargetUnitConversion').FloatValue;
        }
        else {
            measureObject.TargetUnitConversion = 0;
        }
        return measureObject;
    };
    AnnotationRenderer.prototype.getMeasureValues = function (arrayValues) {
        var measureValuesArray = new Array();
        if (!isNullOrUndefined(arrayValues)) {
            for (var index = 0; index < arrayValues.length; index++) {
                var measureFormat = arrayValues[parseInt(index.toString(), 10)];
                var measureValue = new NumberFormat();
                if (!isNullOrUndefined(measureFormat)) {
                    if (measureFormat.has('D') && !isNullOrUndefined(measureFormat.get('D'))) {
                        measureValue.Denominator = measureFormat.get('D');
                    }
                    if (measureFormat.has('C') && !isNullOrUndefined(measureFormat.get('C'))) {
                        measureValue.ConversionFactor = measureFormat.get('C');
                    }
                    if (measureFormat.has('F') && !isNullOrUndefined(measureFormat.get('F'))) {
                        var fObject = measureFormat.get('F');
                        if (typeof fObject === 'object' && !isNullOrUndefined(fObject.name)) {
                            measureValue.FractionalType = fObject.name;
                        }
                    }
                    else {
                        measureValue.FractionalType = 'D';
                    }
                    if (measureFormat.has('FD') && !isNullOrUndefined(measureFormat.get('FD'))) {
                        measureValue.FormatDenominator = measureFormat.get('FD');
                    }
                    if (measureFormat.has('U') && !isNullOrUndefined(measureFormat.get('U'))) {
                        measureValue.Unit = measureFormat.get('U');
                    }
                }
                measureValuesArray.push(measureValue);
            }
        }
        return measureValuesArray;
    };
    AnnotationRenderer.prototype.getVertexPoints = function (vertices, pageWidth, pageHeight, pageRotation, page) {
        var vertexPoints = [];
        var cropBox = this.getBothCropBoxValue(page);
        var cropBoxX = 0;
        var cropBoxY = 0;
        if (!(cropBox[0] === 0 && page.cropBox[2] === page.size[2] && cropBox[1] === page.size[3])) {
            cropBoxX = cropBox[0];
            cropBoxY = cropBox[1];
        }
        if (pageRotation === 0) {
            for (var i = 0; i < vertices.length; i++) {
                var point = { X: this.convertPointToPixel(vertices[parseInt(i.toString(), 10)]) -
                        this.convertPointToPixel(cropBoxX), Y: (pageHeight - this.convertPointToPixel(vertices[i + 1])) +
                        this.convertPointToPixel(cropBoxY) };
                i = i + 1;
                vertexPoints.push(point);
            }
        }
        else if (pageRotation === 1) {
            for (var i = 0; i < vertices.length; i++) {
                var point = { X: this.convertPointToPixel(vertices[i + 1]),
                    Y: this.convertPointToPixel(vertices[parseInt(i.toString(), 10)]) };
                i = i + 1;
                vertexPoints.push(point);
            }
        }
        else if (pageRotation === 2) {
            for (var i = 0; i < vertices.length; i++) {
                var point = { X: pageWidth - this.convertPointToPixel(vertices[parseInt(i.toString(), 10)]),
                    Y: this.convertPointToPixel(vertices[i + 1]) };
                i = i + 1;
                vertexPoints.push(point);
            }
        }
        else if (pageRotation === 3) {
            for (var i = 0; i < vertices.length; i++) {
                var point = { X: pageWidth - this.convertPointToPixel(vertices[i + 1]),
                    Y: pageHeight - this.convertPointToPixel(vertices[parseInt(i.toString(), 10)]) };
                i = i + 1;
                vertexPoints.push(point);
            }
        }
        return vertexPoints;
    };
    AnnotationRenderer.prototype.getLineIndentString = function (lineIntent) {
        switch (lineIntent) {
            case PdfLineIntent.lineArrow:
                return 'LineArrow';
            case PdfLineIntent.lineDimension:
                return 'LineDimension';
        }
    };
    AnnotationRenderer.prototype.getLineEndingStyleString = function (lineEndingStyle) {
        switch (lineEndingStyle) {
            case PdfLineEndingStyle.none:
                return 'None';
            case PdfLineEndingStyle.butt:
                return 'Butt';
            case PdfLineEndingStyle.circle:
                return 'Circle';
            case PdfLineEndingStyle.closedArrow:
                return 'ClosedArrow';
            case PdfLineEndingStyle.diamond:
                return 'Diamond';
            case PdfLineEndingStyle.openArrow:
                return 'OpenArrow';
            case PdfLineEndingStyle.rClosedArrow:
                return 'RClosedArrow';
            case PdfLineEndingStyle.rOpenArrow:
                return 'ROpenArrow';
            case PdfLineEndingStyle.slash:
                return 'Slash';
            case PdfLineEndingStyle.square:
                return 'Square';
        }
    };
    AnnotationRenderer.prototype.getBorderStylesString = function (borderStyle) {
        switch (borderStyle) {
            case PdfBorderStyle.solid:
                return 'Solid';
            case PdfBorderStyle.dashed:
                return 'Dashed';
            case PdfBorderStyle.beveled:
                return 'Beveled';
            case PdfBorderStyle.inset:
                return 'Inset';
            case PdfBorderStyle.underline:
                return 'Underline';
            case PdfBorderStyle.dot:
                return 'Dot';
            default:
                return 'None';
        }
    };
    AnnotationRenderer.prototype.getBorderStyle = function (borderStyle) {
        var style = PdfBorderStyle.solid;
        switch (borderStyle) {
            case 'Solid':
                style = PdfBorderStyle.solid;
                break;
            case 'Dashed':
                style = PdfBorderStyle.dashed;
                break;
            case 'Beveled':
                style = PdfBorderStyle.beveled;
                break;
            case 'Inset':
                style = PdfBorderStyle.inset;
                break;
            case 'Underline':
                style = PdfBorderStyle.underline;
                break;
            case 'Dot':
                style = PdfBorderStyle.dot;
                break;
        }
        return style;
    };
    AnnotationRenderer.prototype.getRotateAngleString = function (angle) {
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
    AnnotationRenderer.prototype.getValidNoteContent = function (note) {
        if (isNullOrUndefined(note) || note === '' || note === ' ') {
            return '';
        }
        return note;
    };
    AnnotationRenderer.prototype.getBounds = function (bounds, pageHeight, pageWidth, pageRotation) {
        var bound;
        if (pageRotation === 0) {
            bound = new AnnotBounds(this.convertPointToPixel(bounds.x), this.convertPointToPixel(bounds.y), this.convertPointToPixel(bounds.width), this.convertPointToPixel(bounds.height));
        }
        else if (pageRotation === 1) {
            bound = new AnnotBounds(pageWidth - this.convertPointToPixel(bounds.y) - this.convertPointToPixel(bounds.height), this.convertPointToPixel(bounds.x), this.convertPointToPixel(bounds.height), this.convertPointToPixel(bounds.width));
        }
        else if (pageRotation === 2) {
            bound = new AnnotBounds(pageWidth - this.convertPointToPixel(bounds.x) - this.convertPointToPixel(bounds.width), pageHeight - this.convertPointToPixel(bounds.y) - this.convertPointToPixel(bounds.height), this.convertPointToPixel(bounds.width), this.convertPointToPixel(bounds.height));
        }
        else if (pageRotation === 3) {
            bound = new AnnotBounds(this.convertPointToPixel(bounds.y), pageHeight - this.convertPointToPixel(bounds.x) -
                this.convertPointToPixel(bounds.width), this.convertPointToPixel(bounds.height), this.convertPointToPixel(bounds.width));
        }
        return bound;
    };
    /**
     * @private
     * @param {PdfPopupAnnotation} popupAnnot - popupAnnot
     * @param {number} height - height
     * @param {number} width - width
     * @param {number} pageRotation - pageRotation
     * @returns {void}
     */
    AnnotationRenderer.prototype.loadPopupAnnotation = function (popupAnnot, height, width, pageRotation) {
        var popupAnnotation = new PopupAnnotationBase();
        popupAnnotation.Author = popupAnnot.author;
        popupAnnotation.Subject = popupAnnot.subject;
        if (popupAnnot._dictionary.has('Subtype') && !isNullOrUndefined(popupAnnot._dictionary.get('Subtype')) && !isNullOrUndefined(popupAnnot._dictionary.get('Subtype').name)) {
            popupAnnotation.SubType = popupAnnot._dictionary.get('Subtype').name.toString();
        }
        if (popupAnnot._dictionary.has('Type') && !isNullOrUndefined(popupAnnot._dictionary.get('Type')) && !isNullOrUndefined(popupAnnot._dictionary.get('Type').name)) {
            popupAnnotation.Type = popupAnnot._dictionary.get('Type').name.toString();
        }
        if (popupAnnot._dictionary.has('IRT') && !isNullOrUndefined(popupAnnot._dictionary.get('IRT'))) {
            var reference = popupAnnot._dictionary.get('IRT');
            if (reference != null) {
                popupAnnotation.Reference = reference.Reference;
            }
        }
        popupAnnotation.AnnotName = popupAnnot.name;
        if (!isNullOrUndefined(popupAnnot.modifiedDate)) {
            popupAnnotation.ModifiedDate = this.formatDate(popupAnnot.modifiedDate);
        }
        else {
            popupAnnotation.ModifiedDate = this.formatDate(new Date());
        }
        popupAnnotation.Note = popupAnnot.text;
        this.updateIsLockProperty(popupAnnotation, popupAnnot);
        popupAnnotation.Icon = this.getPopupIconString(popupAnnot.icon);
        popupAnnotation.State = this.getStateString(popupAnnot.state);
        popupAnnotation.StateModel = this.getStateModelString(popupAnnot.stateModel);
        popupAnnotation.Size = new SizeBase(popupAnnot.bounds.width, popupAnnot.bounds.height);
        popupAnnot.color = popupAnnot.color ? popupAnnot.color : [0, 0, 0];
        popupAnnotation.Color = new AnnotColor(popupAnnot.color[0], popupAnnot.color[1], popupAnnot.color[2]);
        popupAnnotation.Opacity = popupAnnot.opacity;
        popupAnnotation.AnnotType = 'sticky';
        popupAnnotation.StrokeColor = 'rgba(' + popupAnnotation.Color.R + ',' + popupAnnotation.Color.G + ',' + popupAnnotation.Color.B + ',' + 1 + ')';
        popupAnnotation.Bounds = this.getBounds(popupAnnot.bounds, height, width, pageRotation);
        for (var i = 0; i < popupAnnot.reviewHistory.count; i++) {
            popupAnnotation.State = this.getStateString(popupAnnot.reviewHistory.at(parseInt(i.toString(), 10)).state);
            popupAnnotation.StateModel = this.getStateModelString(popupAnnot.reviewHistory.at(parseInt(i.toString(), 10)).stateModel);
        }
        if (isNullOrUndefined(popupAnnotation.State) || popupAnnotation.State === 'None' || isNullOrUndefined(popupAnnotation.StateModel)) {
            popupAnnotation.State = 'Unmarked';
            popupAnnotation.StateModel = 'None';
        }
        popupAnnotation.Comments = new Array();
        if (popupAnnot._dictionary.has('CustomData') && !isNullOrUndefined(popupAnnot._dictionary.get('CustomData'))) {
            var customData = popupAnnot._dictionary.get('CustomData');
            if (customData != null) {
                popupAnnotation.ExistingCustomData = customData;
            }
        }
        for (var i = 0; i < popupAnnot.comments.count; i++) {
            popupAnnotation.Comments.push(this.loadPopupAnnotation(popupAnnot.comments.at(i), height, width, pageRotation));
        }
        return popupAnnotation;
    };
    /**
     * @param {PdfFreeTextAnnotation} freeTextAnnot - freeTextAnnot
     * @param {number} height - height
     * @param {number} width - width
     * @param {number} pageRotation - pageRotation
     * @param {PdfPage} page - page
     * @private
     * @returns {void}
     */
    AnnotationRenderer.prototype.loadFreeTextAnnotation = function (freeTextAnnot, height, width, pageRotation, page) {
        var freeTextAnnotation = new FreeTextAnnotationBase();
        freeTextAnnotation.AnnotationIntent = this.getAnnotationIntentString(freeTextAnnot.annotationIntent); // returns wrong value
        freeTextAnnotation.AnnotationFlags = this.getAnnotationFlagsString(freeTextAnnot.flags);
        freeTextAnnotation.Author = freeTextAnnot.author;
        freeTextAnnotation.AnnotName = freeTextAnnot.name;
        if (isNullOrUndefined(freeTextAnnotation.AnnotName) || freeTextAnnotation.AnnotName === '') {
            freeTextAnnotation.AnnotName = Math.abs(Math.random()).toString(36).substring(2);
        }
        freeTextAnnotation.AnnotType = 'Text Box';
        freeTextAnnotation.FreeTextAnnotationType = 'Text Box';
        freeTextAnnotation.BorderColor = new AnnotColor(freeTextAnnot.borderColor[0], freeTextAnnot.borderColor[1], freeTextAnnot.borderColor[2]);
        var points = [{ X: 100, Y: 400 }, { X: 200, Y: 400 }];
        freeTextAnnotation.CalloutLines = points;
        var backgroundColor = freeTextAnnot.color ? freeTextAnnot.color : [0, 0, 0];
        if (isNullOrUndefined(freeTextAnnot.color)) {
            freeTextAnnotation.IsTransparentSet = true;
        }
        freeTextAnnotation.Color = new AnnotColor(backgroundColor[0], backgroundColor[1], backgroundColor[2]);
        freeTextAnnotation.Flatten = freeTextAnnot.flatten;
        freeTextAnnotation.FlattenPopups = !isNullOrUndefined(freeTextAnnot.flattenPopups) ? freeTextAnnot.flattenPopups : false; // returns undefined
        freeTextAnnotation.FontFamily = this.getFontFamilyString(freeTextAnnot.font._fontFamily);
        freeTextAnnotation.FontSize = this.convertPointToPixel(freeTextAnnot.font.size);
        freeTextAnnotation.Font = new FontBase(freeTextAnnot.font, freeTextAnnotation.FontFamily); // need to be checked
        freeTextAnnotation.Thickness = freeTextAnnot.border.width;
        freeTextAnnotation.StrokeColor = 'rgba(' + freeTextAnnot.borderColor[0] + ',' + freeTextAnnot.borderColor[1] + ',' + freeTextAnnot.borderColor[2] + ',' + (freeTextAnnot.borderColor[3] ? freeTextAnnot.borderColor[3] : 1) + ')';
        var fillOpacity;
        if (freeTextAnnot._dictionary.has('FillOpacity') && !isNullOrUndefined(freeTextAnnot._dictionary.get('FillOpacity'))) {
            fillOpacity = parseInt(freeTextAnnot._dictionary.get('FillOpacity').toString(), 10);
        }
        fillOpacity = freeTextAnnot.color ? (!isNullOrUndefined(fillOpacity) ? fillOpacity : 1) : 0;
        freeTextAnnotation.FillColor = 'rgba(' + backgroundColor[0] + ',' + backgroundColor[1] + ',' + backgroundColor[2] + ',' + fillOpacity + ')';
        freeTextAnnotation.Layer = freeTextAnnot._dictionary.has('Layer') ? freeTextAnnot._dictionary.get('Layer') : null;
        // freeTextAnnotation.Location = freeTextAnnot._dictionary.has('Location') ? freeTextAnnot._dictionary.get('Location') : JSON.stringify({X: freeTextAnnot.bounds.x ,Y: freeTextAnnot.bounds.y});
        freeTextAnnotation.Location = freeTextAnnot._dictionary.has('Location') ? freeTextAnnot._dictionary.get('Location') : '{X=' + freeTextAnnot.bounds.x + ',Y=' + freeTextAnnot.bounds.y + '}';
        freeTextAnnotation.MarkupText = freeTextAnnot.text;
        if (!isNullOrUndefined(freeTextAnnot.modifiedDate)) {
            freeTextAnnotation.ModifiedDate = this.formatDate(freeTextAnnot.modifiedDate);
        }
        else {
            freeTextAnnotation.ModifiedDate = this.formatDate(new Date());
        }
        freeTextAnnotation.Name = 'freeText';
        freeTextAnnotation.Opacity = freeTextAnnot.opacity;
        if (freeTextAnnot._dictionary.has('Rotation') && !isNullOrUndefined(freeTextAnnot._dictionary.get('Rotation'))) {
            freeTextAnnotation.Rotate = parseInt(freeTextAnnot._dictionary.get('Rotation'), 10);
        }
        if (freeTextAnnot._dictionary.has('Rotate') && !isNullOrUndefined(freeTextAnnot._dictionary.get('Rotate'))) {
            freeTextAnnotation.Rotate = parseInt(freeTextAnnot._dictionary.get('Rotate'), 10);
        }
        if (!isNullOrUndefined(freeTextAnnot.subject)) {
            freeTextAnnotation.Subject = freeTextAnnot.subject;
        }
        else {
            freeTextAnnotation.Subject = 'Text Box';
        }
        freeTextAnnotation.Text = freeTextAnnot.text;
        freeTextAnnotation.MarkupText = freeTextAnnot.text;
        freeTextAnnotation.TextAlign = this.getTextAlignmentString(freeTextAnnot.textAlignment);
        if (isNullOrUndefined(freeTextAnnotation.State) || freeTextAnnotation.State === 'None' || isNullOrUndefined(freeTextAnnotation.StateModel)) {
            freeTextAnnotation.State = 'Unmarked';
            freeTextAnnotation.StateModel = 'None';
        }
        freeTextAnnotation.FontColor = !isNullOrUndefined(freeTextAnnot.textMarkUpColor) ? 'rgba(' + freeTextAnnot.textMarkUpColor[0] + ',' + freeTextAnnot.textMarkUpColor[1] + ',' + freeTextAnnot.textMarkUpColor[2] + ',' + (freeTextAnnot.textMarkUpColor[3] ? freeTextAnnot.textMarkUpColor[3] : 1) + ')' : 'rgba(0, 0, 0, 1)';
        for (var i = 0; i < freeTextAnnot.reviewHistory.count; i++) {
            freeTextAnnotation.State = this.getStateString(freeTextAnnot.reviewHistory.at(parseInt(i.toString(), 10)).state);
            freeTextAnnotation.StateModel = this.getStateModelString(freeTextAnnot.reviewHistory.at(parseInt(i.toString(), 10)).stateModel);
        }
        freeTextAnnotation.Comments = new Array();
        for (var i = 0; i < freeTextAnnot.comments.count; i++) {
            var annot = this.loadPopupAnnotation(freeTextAnnot.comments.at(i), height, width, pageRotation);
            freeTextAnnotation.Comments.push(annot);
        }
        freeTextAnnotation.Bounds = this.getBounds(freeTextAnnot.bounds, height, width, pageRotation);
        if (freeTextAnnotation.Bounds.Y < 0) {
            var cropRect = { x: freeTextAnnot.bounds.x, y: page.cropBox[1] + freeTextAnnot.bounds.y,
                width: freeTextAnnot.bounds.width, height: freeTextAnnot.bounds.height };
            freeTextAnnotation.Bounds = this.getBounds(cropRect, height, width, pageRotation);
        }
        freeTextAnnotation.PageRotation = pageRotation;
        this.updateIsLockProperty(freeTextAnnotation, freeTextAnnot);
        if (freeTextAnnot._dictionary.has('CustomData') && !isNullOrUndefined(freeTextAnnot._dictionary.get('CustomData'))) {
            var customData = freeTextAnnot._dictionary.get('CustomData');
            if (customData != null) {
                freeTextAnnotation.ExistingCustomData = customData;
            }
        }
        if (freeTextAnnot._dictionary.has('AllowedInteractions')) {
            var allowedInteractions = freeTextAnnot.getValues('AllowedInteractions');
            var text = allowedInteractions[0];
            freeTextAnnotation.AllowedInteractions = JSON.parse(text);
        }
        return freeTextAnnotation;
    };
    AnnotationRenderer.prototype.getTextAlignmentString = function (textAlignment) {
        switch (textAlignment) {
            case PdfTextAlignment.left:
                return 'Left';
            case PdfTextAlignment.right:
                return 'Right';
            case PdfTextAlignment.center:
                return 'Center';
            case PdfTextAlignment.justify:
                return 'Justify';
            default:
                return 'Left';
        }
    };
    /**
     * @param {PdfFreeTextAnnotation} inkAnnot - inkAnnot
     * @param {number} pageNumber - pageNumber
     * @param {number} height - height
     * @param {number} width - width
     * @param {number} pageRotation - pageRotation
     * @private
     * @returns {void}
     */
    AnnotationRenderer.prototype.loadSignatureText = function (inkAnnot, pageNumber, height, width, pageRotation) {
        var formFields = new SignatureAnnotationBase();
        formFields.SignatureName = inkAnnot.name;
        formFields.Bounds = this.getBounds(inkAnnot.bounds, width, height, pageRotation);
        formFields.AnnotationType = 'SignatureText';
        formFields.FontFamily = this.getFontFamilyString(inkAnnot.font._fontFamily);
        formFields.FontSize = this.convertPointToPixel(inkAnnot.font.size);
        formFields.PathData = inkAnnot.text;
        formFields.PageNumber = pageNumber;
        formFields.StrokeColor = 'rgba(' + inkAnnot.textMarkUpColor[0] + ',' + inkAnnot.textMarkUpColor[1] + ',' + inkAnnot.textMarkUpColor[2] + ',' + (inkAnnot.textMarkUpColor[3] ? inkAnnot.textMarkUpColor[3] : 1) + ')';
        formFields.Opacity = inkAnnot.opacity;
        formFields.Thickness = 1;
        return formFields;
    };
    AnnotationRenderer.prototype.getFontFamilyString = function (fontFamily) {
        switch (fontFamily) {
            case PdfFontFamily.helvetica:
                return 'Helvetica';
            case PdfFontFamily.timesRoman:
                return 'Times New Roman';
            case PdfFontFamily.courier:
                return 'Courier';
            case PdfFontFamily.symbol:
                return 'Symbol';
            case PdfFontFamily.zapfDingbats:
                return 'ZapfDingbats';
            default:
                return 'Helvetica';
        }
    };
    AnnotationRenderer.prototype.getAnnotationFlagsString = function (flags) {
        switch (flags) {
            case PdfAnnotationFlag.default:
                return 'Default';
            case PdfAnnotationFlag.invisible:
                return 'Invisible';
            case PdfAnnotationFlag.hidden:
                return 'Hidden';
            case PdfAnnotationFlag.print:
                return 'Print';
            case PdfAnnotationFlag.noZoom:
                return 'NoZoom';
            case PdfAnnotationFlag.noRotate:
                return 'NoRotate';
            case PdfAnnotationFlag.noView:
                return 'NoView';
            case PdfAnnotationFlag.readOnly:
                return 'ReadOnly';
            case PdfAnnotationFlag.locked:
                return 'Locked';
            case PdfAnnotationFlag.toggleNoView:
                return 'ToggleNoView';
            default:
                return 'Default';
        }
    };
    AnnotationRenderer.prototype.getAnnotationIntentString = function (annotationIntent) {
        switch (annotationIntent) {
            case PdfAnnotationIntent.freeTextCallout:
                return 'FreeTextCallout';
            case PdfAnnotationIntent.freeTextTypeWriter:
                return 'FreeTextTypeWriter';
            case PdfAnnotationIntent.none:
                return 'None';
        }
    };
    AnnotationRenderer.prototype.getStateString = function (state) {
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
    AnnotationRenderer.prototype.getStateModelString = function (stateModel) {
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
    AnnotationRenderer.prototype.getPopupIconString = function (icon) {
        switch (icon) {
            case PdfPopupIcon.comment:
                return 'Comment';
            case PdfPopupIcon.help:
                return 'Help';
            case PdfPopupIcon.insert:
                return 'Insert';
            case PdfPopupIcon.key:
                return 'Key';
            case PdfPopupIcon.newParagraph:
                return 'NewParagraph';
            case PdfPopupIcon.note:
                return 'Note';
            case PdfPopupIcon.paragraph:
                return 'Paragraph';
            default:
                return null;
        }
    };
    AnnotationRenderer.prototype.formatDate = function (date) {
        var month = this.datePadding(date.getMonth() + 1); // Months are zero-based
        var day = this.datePadding(date.getDate());
        var year = date.getFullYear();
        var hours = this.datePadding(date.getHours());
        var minutes = this.datePadding(date.getMinutes());
        var seconds = this.datePadding(date.getSeconds());
        return month + "/" + day + "/" + year + " " + hours + ":" + minutes + ":" + seconds;
    };
    // Pad the numbers with leading zeros if they are single digits
    AnnotationRenderer.prototype.datePadding = function (number) {
        return number < 10 ? ('0' + number) : number.toString();
    };
    /**
     * @param {string} jsonObject - jsonObject
     * @param {PdfDocument} loadedDocument - loadedDocument
     * @private
     * @returns {void}
     */
    AnnotationRenderer.prototype.removeSignatureTypeAnnot = function (jsonObject, loadedDocument) {
        if ((Object.prototype.hasOwnProperty.call(jsonObject, 'isAnnotationsExist') &&
            JSON.parse(jsonObject['isAnnotationsExist'])) ||
            (Object.prototype.hasOwnProperty.call(jsonObject, 'isFormFieldAnnotationsExist') &&
                JSON.parse(jsonObject['isFormFieldAnnotationsExist']))) {
            var annotationPageList = jsonObject.annotationsPageList ? jsonObject.annotationsPageList : [];
            var formFieldsPageList = jsonObject.formFieldsPageList ? (jsonObject.formFieldsPageList) : '[]';
            if (annotationPageList.length !== 0) {
                var removeAnnotList = JSON.parse(annotationPageList);
                for (var i = 0; i < removeAnnotList.length; i++) {
                    var loadedPageNo = removeAnnotList[parseInt(i.toString(), 10)];
                    // Removing annotations from the page.
                    var page = loadedDocument.getPage(parseInt(loadedPageNo, 10));
                    var oldPageAnnotations = page.annotations;
                    var totalAnnotation = parseInt(oldPageAnnotations.count.toString(), 10);
                    for (var m = totalAnnotation - 1; m >= 0; m--) {
                        var annotation = oldPageAnnotations.at(m);
                        if (annotation instanceof PdfFreeTextAnnotation ||
                            annotation instanceof PdfInkAnnotation ||
                            annotation instanceof PdfLineAnnotation ||
                            annotation instanceof PdfRubberStampAnnotation ||
                            annotation instanceof PdfTextMarkupAnnotation ||
                            annotation instanceof PdfPopupAnnotation ||
                            annotation instanceof PdfSquareAnnotation ||
                            annotation instanceof PdfCircleAnnotation ||
                            annotation instanceof PdfEllipseAnnotation ||
                            annotation instanceof PdfPolygonAnnotation ||
                            annotation instanceof PdfRectangleAnnotation ||
                            annotation instanceof PdfPolyLineAnnotation) {
                            oldPageAnnotations.remove(annotation);
                        }
                    }
                }
            }
            if (formFieldsPageList.length !== 0) {
                var removeAnnotList = JSON.parse(formFieldsPageList);
                for (var i = 0; i < removeAnnotList.length; i++) {
                    var loadedPageNo = removeAnnotList[parseInt(i.toString(), 10)];
                    // Removing formfields from the page.
                    var page = loadedDocument.getPage(parseInt(loadedPageNo, 10) - 1);
                    var oldPageAnnotations = page.annotations;
                    var totalAnnotation = parseInt(oldPageAnnotations.count.toString(), 10);
                    for (var m = totalAnnotation - 1; m >= 0; m--) {
                        var annotation = oldPageAnnotations.at(m);
                        if (annotation instanceof PdfFreeTextAnnotation ||
                            annotation instanceof PdfInkAnnotation ||
                            annotation instanceof PdfLineAnnotation ||
                            annotation instanceof PdfRubberStampAnnotation ||
                            annotation instanceof PdfTextMarkupAnnotation ||
                            annotation instanceof PdfPopupAnnotation ||
                            annotation instanceof PdfSquareAnnotation ||
                            annotation instanceof PdfCircleAnnotation ||
                            annotation instanceof PdfEllipseAnnotation ||
                            annotation instanceof PdfPolygonAnnotation ||
                            annotation instanceof PdfRectangleAnnotation ||
                            annotation instanceof PdfPolyLineAnnotation) {
                            oldPageAnnotations.remove(annotation);
                        }
                    }
                }
            }
        }
    };
    /**
     * @private
     * @param {any} annotation - annotation
     * @param {any} AnnotFromPDF - AnnotFromPDF
     * @returns {void}
     */
    AnnotationRenderer.prototype.updateIsLockProperty = function (annotation, AnnotFromPDF) {
        var annotFlags = _annotationFlagsToString(AnnotFromPDF.flags);
        if (!isNullOrUndefined(annotFlags) && annotFlags.includes('locked')) {
            annotation.IsLocked = true;
        }
        else {
            annotation.IsLocked = false;
        }
        if (!isNullOrUndefined(annotFlags) && annotFlags.includes('readOnly')) {
            annotation.IsCommentLock = true;
        }
        else {
            annotation.IsCommentLock = false;
        }
        if (!isNullOrUndefined(annotFlags) && annotFlags.includes('print')) {
            annotation.IsPrint = true;
        }
    };
    /**
     * @param {PdfTextMarkupAnnotation} textMarkup - textMarkup
     * @param {number} height - height
     * @param {number} width - width
     * @param {number} pageRotation - pageRotation
     * @param {PdfPage} page - page
     * @private
     * @returns {void}
     */
    AnnotationRenderer.prototype.loadTextMarkupAnnotation = function (textMarkup, height, width, pageRotation, page) {
        var markupAnnotation = new TextMarkupAnnotationBase();
        markupAnnotation.TextMarkupAnnotationType = this.getMarkupAnnotTypeString(textMarkup.textMarkupType);
        if (markupAnnotation.TextMarkupAnnotationType === 'StrikeOut') {
            markupAnnotation.TextMarkupAnnotationType = 'Strikethrough';
        }
        markupAnnotation.Author = textMarkup.author;
        markupAnnotation.Subject = textMarkup.subject;
        markupAnnotation.AnnotName = textMarkup.name;
        markupAnnotation.Note = textMarkup.text ? textMarkup.text : '';
        markupAnnotation.Rect = new RectangleBase(textMarkup.bounds.x, textMarkup.bounds.y, textMarkup.bounds.width + textMarkup.bounds.x, textMarkup.bounds.height + textMarkup.bounds.y);
        markupAnnotation.Opacity = textMarkup.opacity;
        // markupAnnotation.Color = 'rgba(' + textMarkup.color[0] + ',' + textMarkup.color[1] + ',' + textMarkup.color[2] + ',' + (textMarkup.color[3] ? textMarkup.color[3] : 1) + ')';
        markupAnnotation.Color = '#' + (1 << 24 | textMarkup.color[0] << 16 | textMarkup.color[1] << 8 | textMarkup.color[2]).toString(16).slice(1);
        if (!isNullOrUndefined(textMarkup.modifiedDate)) {
            markupAnnotation.ModifiedDate = this.formatDate(textMarkup.modifiedDate);
        }
        else {
            markupAnnotation.ModifiedDate = this.formatDate(new Date());
        }
        markupAnnotation.AnnotationRotation = textMarkup.rotationAngle;
        var quadPoints = textMarkup._dictionary.has('QuadPoints') ? textMarkup._dictionary.get('QuadPoints') : [];
        var bounds = [];
        if (pageRotation === 0) {
            for (var i = 0; i < textMarkup.boundsCollection.length; i++) {
                var _a = textMarkup.boundsCollection[parseInt(i.toString(), 10)], x = _a[0], y = _a[1], width_1 = _a[2], height_1 = _a[3];
                var boundsObject = { x: x, y: y, width: width_1, height: height_1 };
                bounds.push(this.getBounds(boundsObject, height_1, width_1, pageRotation));
            }
        }
        else {
            bounds = this.getTextMarkupBounds(quadPoints, height, width, pageRotation, page);
        }
        markupAnnotation.Bounds = bounds;
        markupAnnotation.AnnotType = 'textMarkup';
        for (var i = 0; i < textMarkup.reviewHistory.count; i++) {
            markupAnnotation.State = this.getStateString(textMarkup.reviewHistory.at(parseInt(i.toString(), 10)).state);
            markupAnnotation.StateModel = this.getStateModelString(textMarkup.reviewHistory.at(parseInt(i.toString(), 10)).stateModel);
        }
        if (isNullOrUndefined(markupAnnotation.State) || isNullOrUndefined(markupAnnotation.StateModel)) {
            markupAnnotation.State = 'Unmarked';
            markupAnnotation.StateModel = 'None';
        }
        markupAnnotation.Comments = new Array();
        for (var i = 0; i < textMarkup.comments.count; i++) {
            var annot = this.loadPopupAnnotation(textMarkup.comments.at(i), height, width, pageRotation);
            markupAnnotation.Comments.push(annot);
        }
        this.updateIsLockProperty(markupAnnotation, textMarkup);
        if (textMarkup._dictionary.has('CustomData') && !isNullOrUndefined(textMarkup._dictionary.get('CustomData'))) {
            var customData = textMarkup._dictionary.get('CustomData');
            if (customData != null) {
                markupAnnotation.ExistingCustomData = customData;
            }
        }
        if (textMarkup._dictionary.has('AllowedInteractions')) {
            var allowedInteractions = textMarkup.getValues('AllowedInteractions');
            var text = allowedInteractions[0];
            markupAnnotation.AllowedInteractions = JSON.parse(text);
        }
        if (textMarkup._dictionary.has('TextMarkupContent')) {
            var textMarkupData = textMarkup.getValues('TextMarkupContent');
            if (!isNullOrUndefined(textMarkupData)) {
                markupAnnotation.TextMarkupContent = textMarkupData[0];
            }
        }
        return markupAnnotation;
    };
    AnnotationRenderer.prototype.getTextMarkupBounds = function (quadPoints, pageHeight, pageWidth, pageRotation, page) {
        var x = 0;
        var y = 0;
        var width = 0;
        var height = 0;
        var annotationBoundList = [];
        var cropValues = this.getCropBoxValue(page, false);
        var cropX = 0;
        var cropY = 0;
        if (cropValues.x !== 0 && cropValues.y !== 0) {
            cropX = cropValues.x;
            cropY = cropValues.y;
        }
        if (!isNullOrUndefined(quadPoints)) {
            for (var k = 0; k < quadPoints.length; k++) {
                if (pageRotation === 0) {
                    x = this.convertPointToPixel(parseInt(quadPoints[parseInt(k.toString(), 10)], 10) - cropX);
                    y = pageHeight - this.convertPointToPixel(parseInt(quadPoints[k + 1], 10) + cropY);
                    height = this.convertPointToPixel(parseInt(quadPoints[k + 3], 10) - parseInt(quadPoints[k + 7], 10));
                    width = this.convertPointToPixel(parseInt(quadPoints[k + 6], 10) - parseInt(quadPoints[k + 4], 10));
                }
                else if (pageRotation === 1) {
                    x = this.convertPointToPixel(parseInt(quadPoints[k + 5], 10));
                    y = this.convertPointToPixel(parseInt(quadPoints[parseInt(k.toString(), 10)], 10));
                    height = this.convertPointToPixel(parseInt(quadPoints[k + 6], 10) - parseInt(quadPoints[k + 4], 10));
                    width = this.convertPointToPixel(parseInt(quadPoints[k + 3], 10) - parseInt(quadPoints[k + 7], 10));
                }
                else if (pageRotation === 2) {
                    x = pageWidth - this.convertPointToPixel(parseInt(quadPoints[k + 2], 10));
                    y = this.convertPointToPixel(parseInt(quadPoints[k + 5], 10));
                    height = this.convertPointToPixel(parseInt(quadPoints[k + 3], 10) - parseInt(quadPoints[k + 7], 10));
                    width = this.convertPointToPixel(parseInt(quadPoints[k + 6], 10) - parseInt(quadPoints[k + 4], 10));
                }
                else {
                    x = pageWidth - this.convertPointToPixel(parseInt(quadPoints[k + 1], 10));
                    y = pageHeight - this.convertPointToPixel(parseInt(quadPoints[k + 6], 10));
                    height = this.convertPointToPixel(parseInt(quadPoints[k + 6], 10) - parseInt(quadPoints[k + 4], 10));
                    width = this.convertPointToPixel(parseInt(quadPoints[k + 3], 10) - parseInt(quadPoints[k + 7], 10));
                }
                var bounds = new AnnotBounds(x, y, width, height);
                k = k + 7;
                annotationBoundList.push(bounds);
            }
        }
        return annotationBoundList;
    };
    AnnotationRenderer.prototype.getMarkupAnnotTypeString = function (textMarkupType) {
        var type = '';
        switch (textMarkupType) {
            case PdfTextMarkupAnnotationType.highlight:
                type = 'Highlight';
                break;
            case PdfTextMarkupAnnotationType.strikeOut:
                type = 'StrikeOut';
                break;
            case PdfTextMarkupAnnotationType.underline:
                type = 'Underline';
                break;
            case PdfTextMarkupAnnotationType.squiggly:
                type = 'Squiggly';
                break;
        }
        return type;
    };
    return AnnotationRenderer;
}());
export { AnnotationRenderer };
/**
 *
 * @hidden
 */
var PointBase = /** @class */ (function () {
    function PointBase(x, y) {
        this.x = x;
        this.y = y;
    }
    return PointBase;
}());
export { PointBase };
/**
 *
 * @hidden
 */
var FreeTextAnnotationBase = /** @class */ (function () {
    function FreeTextAnnotationBase() {
        this.AnnotationSelectorSettings = null;
        this.TextMarkupColor = null;
        this.Color = null;
        this.Font = null;
        this.Border = null;
        this.LineEndingStyle = null;
        this.AnnotationFlags = null;
        this.CalloutLines = null;
        this.ModifiedDate = null;
        this.Comments = null;
        this.CreatedDate = null;
        this.InnerColor = null;
        this.Layer = null;
        this.Page = null;
        this.PageTags = null;
        this.ReviewHistory = null;
        this.Rotate = 0;
        this.Note = null;
        this.CustomData = null;
        this.AnnotationSettings = null;
        this.IsPrint = true;
        this.IsReadonly = false;
        this.ExistingCustomData = null;
        this.Bounds = null;
        this.PageRotation = 0;
        this.IsTransparentSet = false;
    }
    return FreeTextAnnotationBase;
}());
export { FreeTextAnnotationBase };
/**
 *
 * @hidden
 */
var InkSignatureAnnotation = /** @class */ (function () {
    function InkSignatureAnnotation() {
        this.AnnotationType = null;
        this.Bounds = null;
        this.CustomData = null;
        this.Opacity = 0;
        this.StrokeColor = null;
        this.Thickness = null;
        this.PathData = null;
        this.IsLocked = null;
        this.IsCommentLock = null;
        this.PageNumber = null;
        this.AnnotName = null;
        this.Author = null;
        this.ModifiedDate = null;
        this.Subject = null;
        this.Note = null;
        this.State = null;
        this.StateModel = null;
        this.AnnotationSelectorSettings = null;
        this.AnnotationSettings = null;
        this.AllowedInteractions = null;
        this.Comments = null;
        this.AnnotType = null;
        this.IsPrint = null;
        this.ExistingCustomData = null;
    }
    return InkSignatureAnnotation;
}());
export { InkSignatureAnnotation };
/**
 *
 * @hidden
 */
var ShapeAnnotationBase = /** @class */ (function () {
    function ShapeAnnotationBase() {
        this.LabelBounds = new AnnotBounds(0, 0, 0, 0);
        this.LabelContent = null;
        this.LabelFillColor = null;
        this.LabelBorderColor = null;
        this.LabelSettings = null;
        this.FontColor = null;
        this.FontSize = 0;
        this.AnnotationSettings = null;
        this.AnnotationSelectorSettings = null;
        this.VertexPoints = null;
        this.CustomData = null;
        this.ExistingCustomData = null;
        this.IsPrint = true;
        this.AllowedInteractions = null;
        this.AnnotationRotation = 0;
    }
    return ShapeAnnotationBase;
}());
export { ShapeAnnotationBase };
/**
 *
 * @hidden
 */
var MeasureShapeAnnotationBase = /** @class */ (function () {
    function MeasureShapeAnnotationBase(shapeAnnotation) {
        this.LabelBounds = new AnnotBounds(0, 0, 0, 0);
        this.LabelContent = null;
        this.LabelFillColor = null;
        this.LabelBorderColor = null;
        this.LabelSettings = null;
        this.FontColor = null;
        this.FontSize = 0;
        this.AnnotationSettings = null;
        this.AnnotationSelectorSettings = null;
        this.VertexPoints = null;
        this.CustomData = null;
        this.ExistingCustomData = null;
        this.IsPrint = true;
        this.AllowedInteractions = null;
        this.AnnotationRotation = 0;
        this.Author = shapeAnnotation.Author;
        this.AnnotationSelectorSettings = shapeAnnotation.AnnotationSelectorSettings;
        this.BorderDashArray = shapeAnnotation.BorderDashArray;
        this.BorderStyle = shapeAnnotation.BorderStyle;
        this.Bounds = shapeAnnotation.Bounds;
        this.CloudIntensity = shapeAnnotation.CloudIntensity;
        this.FillColor = shapeAnnotation.FillColor;
        this.IsCloudShape = shapeAnnotation.IsCloudShape;
        this.IsLocked = shapeAnnotation.IsLocked;
        this.LineHeadEnd = shapeAnnotation.LineHeadEnd;
        this.LineHeadStart = shapeAnnotation.LineHeadStart;
        this.ModifiedDate = shapeAnnotation.ModifiedDate;
        this.Note = shapeAnnotation.Note;
        this.Opacity = shapeAnnotation.Opacity;
        this.RectangleDifference = shapeAnnotation.RectangleDifference;
        this.RotateAngle = shapeAnnotation.RotateAngle;
        this.ShapeAnnotationType = shapeAnnotation.ShapeAnnotationType;
        this.StrokeColor = shapeAnnotation.StrokeColor;
        this.Subject = shapeAnnotation.Subject;
        this.Thickness = shapeAnnotation.Thickness;
        this.VertexPoints = shapeAnnotation.VertexPoints;
        this.AnnotName = shapeAnnotation.AnnotName;
        this.Comments = shapeAnnotation.Comments;
        this.State = shapeAnnotation.State;
        this.StateModel = shapeAnnotation.StateModel;
        this.AnnotType = 'shape_measure';
        this.AnnotationSettings = shapeAnnotation.AnnotationSettings;
        this.EnableShapeLabel = shapeAnnotation.EnableShapeLabel;
        this.AllowedInteractions = shapeAnnotation.AllowedInteractions;
        this.AnnotationRotation = shapeAnnotation.AnnotationRotation;
        if (shapeAnnotation.EnableShapeLabel === true) {
            this.LabelContent = shapeAnnotation.LabelContent;
            this.LabelFillColor = shapeAnnotation.LabelFillColor;
            this.FontColor = shapeAnnotation.FontColor;
            this.LabelBorderColor = shapeAnnotation.LabelBorderColor;
            this.FontSize = shapeAnnotation.FontSize;
            this.LabelSettings = shapeAnnotation.LabelSettings;
            this.LabelBounds = shapeAnnotation.LabelBounds;
        }
    }
    return MeasureShapeAnnotationBase;
}());
export { MeasureShapeAnnotationBase };
/**
 *
 * @hidden
 */
var SignatureAnnotationBase = /** @class */ (function () {
    function SignatureAnnotationBase() {
        this.PathData = null;
        this.ExistingCustomData = null;
    }
    return SignatureAnnotationBase;
}());
export { SignatureAnnotationBase };
var Measure = /** @class */ (function () {
    function Measure() {
        this.Ratio = '';
        this.X = [];
        this.Distance = [];
        this.Area = [];
        this.Angle = [];
        this.Volume = [];
        this.TargetUnitConversion = 0;
        this.Depth = 0;
    }
    return Measure;
}());
var NumberFormat = /** @class */ (function () {
    function NumberFormat() {
        this.Unit = '';
        this.ConversionFactor = 0;
        this.FractionalType = '';
        this.Denominator = 0;
        this.FormatDenominator = false;
    }
    return NumberFormat;
}());
/**
 *
 * @hidden
 */
var PopupAnnotationBase = /** @class */ (function () {
    function PopupAnnotationBase() {
        this.AnnotationFlags = null;
        this.AnnotationSelectorSettings = null;
        this.AnnotationSettings = null;
        this.ExistingCustomData = null;
        this.CustomData = null;
        this.IsPrint = false;
    }
    return PopupAnnotationBase;
}());
export { PopupAnnotationBase };
/**
 *
 * @hidden
 */
var TextMarkupAnnotationBase = /** @class */ (function () {
    function TextMarkupAnnotationBase() {
        this.AnnotationSelectorSettings = null;
        this.AnnotationSettings = null;
        this.ExistingCustomData = null;
        this.CustomData = null;
        this.IsPrint = true;
        this.IsMultiSelect = false;
        this.AnnotpageNumbers = null;
        this.AnnotNameCollection = null;
    }
    return TextMarkupAnnotationBase;
}());
export { TextMarkupAnnotationBase };
/**
 *
 * @hidden
 */
var PdfLayer = /** @class */ (function () {
    function PdfLayer() {
    }
    return PdfLayer;
}());
export { PdfLayer };
/**
 *
 * @hidden
 */
var AnnotPoint = /** @class */ (function () {
    function AnnotPoint(_X, _Y) {
        this.X = _X;
        this.Y = _Y;
    }
    return AnnotPoint;
}());
export { AnnotPoint };
/**
 *
 * @hidden
 */
var AnnotBounds = /** @class */ (function () {
    function AnnotBounds(_X, _Y, _Width, _Height) {
        this.X = _X;
        this.Y = _Y;
        this.Width = _Width;
        this.Height = _Height;
        this.Location = {
            X: _X,
            Y: _Y
        };
        this.Size = {
            IsEmpty: false,
            Width: _Width,
            Height: _Height
        };
        this.Left = _X;
        this.Top = _Y;
        this.Right = _X + _Width;
        this.Bottom = _Y + _Height;
    }
    return AnnotBounds;
}());
export { AnnotBounds };
/**
 *
 * @hidden
 */
var AnnotColor = /** @class */ (function () {
    function AnnotColor(_R, _G, _B) {
        this.IsEmpty = true;
        this.R = _R;
        this.G = _G;
        this.B = _B;
        if (this.R !== 0 || this.G !== 0 || this.B !== 0) {
            this.IsEmpty = false;
        }
    }
    return AnnotColor;
}());
export { AnnotColor };
/**
 *
 * @hidden
 */
var FontBase = /** @class */ (function () {
    function FontBase(pdfFont, fontFamilyString) {
        this.Bold = pdfFont.isBold;
        this.FontFamily = pdfFont._fontFamily;
        this.Height = pdfFont.height;
        this.Italic = pdfFont.isItalic;
        this.Name = fontFamilyString;
        this.Size = pdfFont.size;
        this.Strikeout = pdfFont.isStrikeout;
        this.Style = pdfFont.style;
        this.Underline = pdfFont.isUnderline;
    }
    return FontBase;
}());
export { FontBase };
/**
 *
 * @hidden
 */
var Path = /** @class */ (function () {
    function Path() {
        this.points = [];
    }
    Path.prototype.moveTo = function (x, y) {
        this.points.push([x, y]);
    };
    Path.prototype.lineTo = function (x, y) {
        this.points.push([x, y]);
    };
    Path.prototype.transform = function (matrix) {
        this.points = this.points.map(function (_a) {
            var x = _a[0], y = _a[1];
            var newX = matrix[0][0] * x + matrix[0][1] * y + matrix[0][2];
            var newY = matrix[1][0] * x + matrix[1][1] * y + matrix[1][2];
            return [newX, newY];
        });
    };
    return Path;
}());
export { Path };
/**
 *
 * @hidden
 */
var RectangleBase = /** @class */ (function () {
    /**
     * @param {number} left - left
     * @param {number} top - top
     * @param {number} right - right
     * @param {number} bottom - bottom
     * @private
     */
    function RectangleBase(left, top, right, bottom) {
        this.left = left;
        this.top = top;
        this.right = right;
        this.bottom = bottom;
        this.width = right - left;
        this.height = bottom - top;
    }
    return RectangleBase;
}());
export { RectangleBase };
