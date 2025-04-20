import { isNullOrUndefined } from '@syncfusion/ej2-base';
import { AnnotationRenderer, FormFieldsBase } from './index';
import { PdfAnnotationFlag, PdfInkAnnotation, PdfPen, PdfPath } from '@syncfusion/ej2-pdf';
import { Rect } from '@syncfusion/ej2-drawings';
/**
 * SignatureBase
 *
 * @hidden
 */
var SignatureBase = /** @class */ (function () {
    function SignatureBase(pdfViewer, pdfViewerBase) {
        this.pdfViewer = pdfViewer;
        this.pdfViewerBase = pdfViewerBase;
    }
    /**
     * @private
     * @param {string} jsonObject - jsonObject
     * @param {any} loadedDocument - loadedDocument
     * @returns {void}
     */
    SignatureBase.prototype.saveSignatureData = function (jsonObject, loadedDocument) {
        var formfields = new FormFieldsBase(this.pdfViewer, this.pdfViewerBase);
        var signatureDetails = JSON.parse(jsonObject.signatureData);
        if (!isNullOrUndefined(signatureDetails)) {
            for (var i = 0; i < signatureDetails.length; i++) {
                var pageData = signatureDetails[parseInt(i.toString(), 10)];
                // Save signature as data
                if (pageData.length > 0) {
                    for (var p = 0; p < pageData.length; p++) {
                        var data = pageData[parseInt(p.toString(), 10)];
                        var signatureType = Object.prototype.hasOwnProperty.call(data, 'shapeAnnotationType') && data['shapeAnnotationType'] !== null
                            ? data['shapeAnnotationType'].toString()
                            : null;
                        if (signatureType !== null && signatureType === 'SignatureText') {
                            formfields.drawFreeTextAnnotations(data, loadedDocument, true);
                        }
                        else if (signatureType !== null && signatureType === 'SignatureImage') {
                            formfields.drawImage(data, loadedDocument, true);
                        }
                        else {
                            var pageNumber = data.pageIndex;
                            var page = loadedDocument.getPage(pageNumber);
                            var rotateAngle = this.getRotateAngle(page.rotation.toString());
                            var size = page.size;
                            var pageWidth = size[0];
                            var pageHeight = size[1];
                            if (rotateAngle === 1 || rotateAngle === 3) {
                                pageHeight = size[0];
                                pageWidth = size[1];
                            }
                            else {
                                pageHeight = size[1];
                                pageWidth = size[0];
                            }
                            var bounds = JSON.parse(data.bounds);
                            bounds = this.getSignatureBounds(bounds, this.convertPointToPixel(pageHeight), this.convertPointToPixel(pageWidth), rotateAngle);
                            var stampObjects = JSON.parse(data.data);
                            var left = this.convertPixelToPoint(bounds.left);
                            var top_1 = this.convertPixelToPoint(bounds.top);
                            var width = this.convertPixelToPoint(bounds.width);
                            var height = this.convertPixelToPoint(bounds.height);
                            var opacity = data.opacity;
                            var thickness = data.thickness;
                            var strokeColor = JSON.parse(data.strokeColor);
                            var color = [strokeColor.r, strokeColor.g, strokeColor.b];
                            var minimumX = -1;
                            var minimumY = -1;
                            var maximumX = -1;
                            var maximumY = -1;
                            for (var p_1 = 0; p_1 < stampObjects.length; p_1++) {
                                var value = stampObjects[parseInt(p_1.toString(), 10)];
                                if (minimumX === -1) {
                                    minimumX = value.x;
                                    minimumY = value.y;
                                    maximumX = value.x;
                                    maximumY = value.x;
                                }
                                else {
                                    var point1 = value.x;
                                    var point2 = value.y;
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
                            var newDifferenceX = maximumX - minimumX;
                            var newDifferenceY = maximumY - minimumY;
                            var newPoint1 = [0, 0];
                            var loadedPage = loadedDocument.getPage(pageNumber);
                            var graphics = null;
                            if (loadedPage != null) {
                                graphics = loadedPage.graphics;
                                graphics.save();
                                graphics.setTransparency(opacity);
                                graphics.translateTransform(left, top_1);
                            }
                            var colors = new PdfPen(color, width);
                            colors._width = this.convertPixelToPoint(thickness);
                            if (stampObjects.length > 0) {
                                var dataPath = new PdfPath();
                                for (var j = 0; j < stampObjects.length; j++) {
                                    var value = stampObjects[parseInt(j.toString(), 10)];
                                    var path = value.command.toString();
                                    var differenceX = ((newDifferenceX) / width);
                                    var differenceY = ((newDifferenceY) / height);
                                    var newX = ((value.x - minimumX) / differenceX);
                                    var currentY = ((value.y - minimumY) / differenceY);
                                    if (path === 'M') {
                                        if (j !== 0) {
                                            page.graphics.drawPath(dataPath, colors, null);
                                            dataPath = new PdfPath();
                                        }
                                        newPoint1 = [newX, currentY];
                                        if (!isNullOrUndefined(graphics)) {
                                            dataPath.addLine(newX, currentY, newX, currentY);
                                        }
                                    }
                                    else if (path === 'L') {
                                        var newPoint2 = [newX, currentY];
                                        if (graphics != null) {
                                            // Removed this line to fix the issue EJ2-60295
                                            // graphics.DrawLine(colors, newpoint1, newpoint2);
                                            dataPath.addLine(newPoint1[0], newPoint1[1], newPoint2[0], newPoint2[1]);
                                        }
                                        newPoint1 = newPoint2;
                                    }
                                    if (j === stampObjects.length - 1) {
                                        page.graphics.drawPath(dataPath, colors, null);
                                    }
                                }
                            }
                            if (graphics != null) {
                                graphics.restore();
                            }
                        }
                    }
                }
            }
        }
    };
    /**
     * getSignatureBounds
     *
     * @param {Rect} bounds - bounds
     * @param {number} pageHeight - pageHeight
     * @param {number} pageWidth - pageWidth
     * @param {number} rotateAngle - rotateAngle
     * @returns {void}
     */
    SignatureBase.prototype.getSignatureBounds = function (bounds, pageHeight, pageWidth, rotateAngle) {
        var bound;
        if (rotateAngle === 0) {
            bound = { 'left': bounds.left, 'top': bounds.top, 'width': bounds.width, 'height': bounds.height };
        }
        else if (rotateAngle === 1) {
            bound = { 'left': (pageWidth - bounds.top - bounds.height), 'top': bounds.left, 'width': bounds.height, 'height': bounds.width };
        }
        else if (rotateAngle === 2) {
            bound = { 'left': (pageWidth - bounds.left - bounds.width), 'top': (pageHeight - bounds.top - bounds.height), 'width': bounds.width, 'height': bounds.height };
        }
        else if (rotateAngle === 3) {
            bound = { 'left': bounds.top, 'top': (pageHeight - bounds.left - bounds.width), 'width': bounds.height, 'height': bounds.width };
        }
        return bound;
    };
    /**
     * @private
     * @param {string} jsonObject - jsonObject
     * @param {any} loadedDocument - loadedDocument
     * @returns {void}
     */
    SignatureBase.prototype.saveSignatureAsAnnotatation = function (jsonObject, loadedDocument) {
        var annotationRenderer = new AnnotationRenderer(this.pdfViewer, this.pdfViewerBase);
        var signatureDetails = JSON.parse(jsonObject.signatureData);
        if (!isNullOrUndefined(signatureDetails)) {
            for (var i = 0; i < signatureDetails.length; i++) {
                var pageData = signatureDetails[parseInt(i.toString(), 10)];
                // Save signature as data
                if (pageData.length > 0) {
                    for (var p = 0; p < pageData.length; p++) {
                        var formfields = new FormFieldsBase(this.pdfViewer, this.pdfViewerBase);
                        var signatureAnnotation = pageData[parseInt(p.toString(), 10)];
                        var signatureType = Object.prototype.hasOwnProperty.call(signatureAnnotation, 'shapeAnnotationType') && signatureAnnotation['shapeAnnotationType'] !== null
                            ? signatureAnnotation['shapeAnnotationType'].toString()
                            : null;
                        if (signatureType !== null && signatureType === 'SignatureText') {
                            formfields.drawFreeTextAnnotations(signatureAnnotation, loadedDocument, false);
                        }
                        else if (signatureType !== null && signatureType === 'SignatureImage') {
                            formfields.drawImage(signatureAnnotation, loadedDocument, false);
                        }
                        else {
                            var bounds = JSON.parse(signatureAnnotation.bounds);
                            var stampObjects = JSON.parse(signatureAnnotation.data);
                            var pageNumber = signatureAnnotation.pageIndex;
                            var page = loadedDocument.getPage(pageNumber);
                            var cropValues = annotationRenderer.getCropBoxValue(page, false);
                            var left = cropValues.x + this.convertPixelToPoint(bounds.left);
                            var top_2 = this.convertPixelToPoint(bounds.top);
                            if (!(cropValues.x === 0 && (page.cropBox[2] === page.size[0] && cropValues.y === page.size[1]))) {
                                top_2 -= cropValues.y;
                            }
                            var width = this.convertPixelToPoint(bounds.width);
                            var height = this.convertPixelToPoint(bounds.height);
                            // let cropX = 0;
                            // let cropY = 0;
                            // if(page.cropBox.x)
                            var opacity = signatureAnnotation.opacity;
                            var thickness = signatureAnnotation.thickness;
                            var strokeColor = JSON.parse(signatureAnnotation.strokeColor);
                            var color = [strokeColor.r, strokeColor.g, strokeColor.b];
                            var minimumX = -1;
                            var minimumY = -1;
                            var maximumX = -1;
                            var maximumY = -1;
                            var rotationAngle = annotationRenderer.getInkRotateAngle(page.rotation.toString());
                            var drawingPath = new PdfPath();
                            for (var p_2 = 0; p_2 < stampObjects.length; p_2++) {
                                var val = stampObjects[parseInt(p_2.toString(), 10)];
                                drawingPath.addLine(val.x, val.y, 0, 0);
                            }
                            var rotatedPath = annotationRenderer.getRotatedPathForMinMax(drawingPath._points, rotationAngle);
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
                                var rotatedPoints = annotationRenderer.getRotatedPath(linePoints, rotationAngle);
                                linePoints = [];
                                for (var z = 0; z < rotatedPoints._points.length; z += 2) {
                                    linePoints.push((rotatedPoints._points[parseInt(z.toString(), 10)][0] - minimumX)
                                        / newDifferenceX + left);
                                    linePoints.push(page.size[1] - (rotatedPoints._points[parseInt(z.toString(), 10)][1]
                                        - minimumY) / newDifferenceY - top_2);
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
                                    linePoints.push(page.size[1] - newX - top_2);
                                }
                            }
                            var inkAnnotation = new PdfInkAnnotation([left, top_2, width, height], linePoints);
                            var bound = new Rect();
                            bound = new Rect(inkAnnotation.bounds.x, (page.size[1] - (inkAnnotation.bounds.y +
                                inkAnnotation.bounds.height)), inkAnnotation.bounds.width, inkAnnotation.bounds.height);
                            inkAnnotation.bounds = bound;
                            inkAnnotation.color = color;
                            linePoints = [];
                            if (isNewValues > 0) {
                                if (rotationAngle !== 0) {
                                    var pathCollection = [];
                                    for (var i_1 = isNewValues; i_1 < stampObjects.length; i_1++) {
                                        var val = stampObjects[parseInt(i_1.toString(), 10)];
                                        var path = val['command'].toString();
                                        if (path === 'M' && i_1 !== isNewValues) {
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
                                            var rotatedPoints = annotationRenderer.getRotatedPath(pointsCollections, rotationAngle);
                                            for (var z = 0; z < rotatedPoints._points.length; z += 2) {
                                                graphicsPoints.push((rotatedPoints._points[parseInt(z.toString(), 10)][0] - minimumX)
                                                    / newDifferenceX + left);
                                                graphicsPoints.push(page.size[1] - (rotatedPoints._points[parseInt(z.toString(), 10)][1]
                                                    - minimumY) / newDifferenceY - top_2);
                                            }
                                            inkAnnotation.inkPointsCollection.push(graphicsPoints);
                                        }
                                        graphicsPoints = [];
                                    }
                                }
                                else {
                                    for (var i_2 = isNewValues; i_2 < stampObjects.length; i_2++) {
                                        var val = stampObjects[parseInt(i_2.toString(), 10)];
                                        var path = val['command'].toString();
                                        if (path === 'M' && i_2 !== isNewValues) {
                                            inkAnnotation.inkPointsCollection.push(linePoints);
                                            linePoints = [];
                                        }
                                        linePoints.push((val['x'] - minimumX) / newDifferenceX + left);
                                        var newX = ((val['y'] - minimumY) / newDifferenceY);
                                        linePoints.push(page.size[1] - newX - top_2);
                                    }
                                    if (linePoints.length > 0) {
                                        inkAnnotation.inkPointsCollection.push(linePoints);
                                    }
                                }
                            }
                            inkAnnotation.border.width = thickness;
                            inkAnnotation.opacity = opacity;
                            inkAnnotation._dictionary.set('NM', signatureAnnotation.signatureName.toString());
                            inkAnnotation._annotFlags = PdfAnnotationFlag.print;
                            if (Object.prototype.hasOwnProperty.call(signatureAnnotation, 'author') && signatureAnnotation['author'] !== null) {
                                var author = signatureAnnotation['author'].toString();
                                if (author !== 'Guest') {
                                    inkAnnotation.author = author;
                                }
                            }
                            page.annotations.add(inkAnnotation);
                        }
                    }
                }
            }
        }
    };
    SignatureBase.prototype.convertPointToPixel = function (number) {
        return number * 96 / 72;
    };
    SignatureBase.prototype.convertPixelToPoint = function (value) {
        return (value * (72 / 96));
    };
    SignatureBase.prototype.getRotateAngle = function (angleString) {
        var angle = 0;
        switch (angleString) {
            case 'RotateAngle0':
            case '0':
                angle = 0;
                break;
            case 'RotateAngle180':
            case '2':
                angle = 2;
                break;
            case 'RotateAngle270':
            case '3':
                angle = 3;
                break;
            case 'RotateAngle90':
            case '1':
                angle = 1;
                break;
        }
        return angle;
    };
    return SignatureBase;
}());
export { SignatureBase };
