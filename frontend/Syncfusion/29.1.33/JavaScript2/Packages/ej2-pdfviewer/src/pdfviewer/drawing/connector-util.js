import { PathElement, Rect, Point, Size, RotateTransform, TextElement, randomId, identityMatrix, rotateMatrix, transformPointByMatrix, intersect3 } from '@syncfusion/ej2-drawings';
import { setElementStype, findPointsLength } from './drawing-util';
import { isNullOrUndefined } from '@syncfusion/ej2-base';
/**
 * @private
 * @param {PdfAnnotationBaseModel} obj - Specified the annotation object.
 * @param {PointModel[]} points - Specified the annotation points.
 * @returns {PointModel[]} - Returns the annotation points model array.
 */
export function getConnectorPoints(obj, points) {
    points = obj.vertexPoints;
    var newPoints = points.slice(0);
    if (newPoints && newPoints.length > 0) {
        obj.sourcePoint = newPoints[0];
        obj.targetPoint = newPoints[newPoints.length - 1];
    }
    return newPoints;
}
/**
 * @private
 * @param {PdfAnnotationBaseModel} connector - Specified the annotation connector model.
 * @param {PointModel[]} points - Specified the annotation points.
 * @returns {string} - Returns the annotation path value.
 */
export function getSegmentPath(connector, points) {
    var path = '';
    var getPt;
    var pts = [];
    var j = 0;
    while (j < points.length) {
        pts.push({ x: points[parseInt(j.toString(), 10)].x, y: points[parseInt(j.toString(), 10)].y });
        j++;
    }
    pts = clipDecorators(connector, pts);
    for (var k = 0; k < pts.length; k++) {
        getPt = pts[parseInt(k.toString(), 10)];
        if (k === 0) {
            path = 'M' + getPt.x + ' ' + getPt.y;
        }
        if (k > 0) {
            path += ' ' + 'L' + getPt.x + ' ' + getPt.y;
        }
    }
    return path;
}
/**
 * @private
 * @param {PdfAnnotationBaseModel} connector - Specified the annotation connector model.
 * @param {PointModel[]} points - Specified the annotation points.
 * @param {PathElement} element - Specified the annotation element.
 * @returns {PathElement} - Returns the annotation path element.
 */
export function updateSegmentElement(connector, points, element) {
    var bounds = new Rect();
    var segmentPath = getSegmentPath(connector, points);
    bounds = Rect.toBounds(points);
    element.width = bounds.width;
    element.height = bounds.height;
    element.offsetX = bounds.x + element.width / 2;
    element.offsetY = bounds.y + element.height / 2;
    element.data = segmentPath;
    if (connector.wrapper) {
        connector.wrapper.offsetX = element.offsetX;
        connector.wrapper.offsetY = element.offsetY;
        var boundsValue = bounds.width;
        if (bounds.width < bounds.height) {
            boundsValue = bounds.height;
        }
        else {
            boundsValue = bounds.width;
        }
        connector.wrapper.width = connector.enableShapeLabel ? boundsValue / 2 : boundsValue;
        connector.wrapper.height = bounds.height;
    }
    return element;
}
/**
 * @private
 * @param {PdfAnnotationBaseModel} connector - Specified the annotation connector model.
 * @param {PathElement} segmentElement - Specified the annotation segment element.
 * @returns {PathElement} - Returns the annotation path element.
 */
export function getSegmentElement(connector, segmentElement) {
    var points = [];
    points = getConnectorPoints(connector);
    segmentElement.staticSize = true;
    segmentElement = updateSegmentElement(connector, points, segmentElement);
    setElementStype(connector, segmentElement);
    return segmentElement;
}
/**
 * @private
 * @param {PdfAnnotationBaseModel} obj - Specified the annotation object.
 * @param {DrawingElement} element - Specified the annotation drawing element.
 * @param {PointModel} pt - Specified the annotation point.
 * @param {PointModel} adjacentPoint - Specified the annotation adjacent point.
 * @param {boolean} isSource - Specified the is source value or not.
 * @returns {void}
 */
export function updateDecoratorElement(obj, element, pt, adjacentPoint, isSource) {
    element.offsetX = pt.x;
    element.offsetY = pt.y;
    var angle = Point.findAngle(pt, adjacentPoint);
    var getPath = getDecoratorShape(isSource ? obj.sourceDecoraterShapes : obj.taregetDecoraterShapes);
    var thickness = 0;
    var size;
    if (obj.shapeAnnotationType === 'LineWidthArrowHead' || obj.shapeAnnotationType === 'Line') {
        thickness = obj.thickness;
        size = new Size(thickness * 12, thickness * 12);
    }
    else {
        thickness = obj.thickness <= 5 ? 5 : obj.thickness;
        size = new Size(thickness * 2, thickness * 2);
    }
    element.transform = RotateTransform.Self;
    setElementStype(obj, element);
    element.style.fill = (obj.fillColor !== 'tranparent') ? obj.fillColor : 'white';
    element.rotateAngle = angle;
    element.data = getPath;
    element.canMeasurePath = true;
    element.width = size.width;
    element.height = size.height;
    if (obj.sourceDecoraterShapes === 'Butt') {
        element.width = size.width - 10;
        element.height = size.height + 10;
    }
}
/**
 * @private
 * @param {PdfAnnotationBaseModel} obj - Specified the annotation object.
 * @param {PointModel} offsetPoint - Specified the annotation offset point.
 * @param {PointModel} adjacentPoint - Specified the annotation adjacent point.
 * @param {boolean} isSource - Specified the is source value or not.
 * @returns {PathElement} - Returns the annotation path element.
 */
export function getDecoratorElement(obj, offsetPoint, adjacentPoint, isSource) {
    var decEle = new PathElement();
    updateDecoratorElement(obj, decEle, offsetPoint, adjacentPoint, isSource);
    return decEle;
}
/**
 * @private
 * @param {PdfAnnotationBaseModel} connector - Specified the annotation object.
 * @param {PointModel[]} pts - Specified the annotation point model array.
 * @returns {PointModel[]} - Returns the annotation point model array.
 */
export function clipDecorators(connector, pts) {
    pts[0] = clipDecorator(connector, pts, true);
    pts[pts.length - 1] = clipDecorator(connector, pts, false);
    return pts;
}
/**
 * @private
 * @param {PdfAnnotationBaseModel} connector - Specified the annotation connector object.
 * @param {PointModel[]} points - Specified the annotation offset point.
 * @param {boolean} isSource - Specified the is source value or not.
 * @returns {PointModel} - Returns the annotation point model.
 */
export function clipDecorator(connector, points, isSource) {
    var point = { x: 0, y: 0 };
    var start = { x: 0, y: 0 };
    var end = { x: 0, y: 0 };
    var length = points.length;
    start = !isSource ? points[length - 1] : points[0];
    end = !isSource ? points[length - 2] : points[1];
    var len = Point.distancePoints(start, end);
    len = (len === 0) ? 1 : len;
    var width = connector.thickness;
    point.x = (Math.round(start.x + width * (end.x - start.x) / len));
    point.y = (Math.round(start.y + width * (end.y - start.y) / len));
    var strokeWidth = 1;
    point = Point.adjustPoint(point, end, true, (strokeWidth / 2));
    return point;
}
/**
 * @param {PdfAnnotationBaseModel} obj - Specified the annotation object.
 * @param {PointModel[]} points - Specified the annotation point model array.
 * @param {MeasureAnnotation} measure - Specified the measure annotation object.
 * @param {PdfViewer} pdfviewer - Specified the pdfviewer element.
 * @hidden
 * @returns {TextElement[]} - Returns the text element collections.
 */
export function initDistanceLabel(obj, points, measure, pdfviewer) {
    var labels = [];
    var angle = Point.findAngle(points[0], points[1]);
    var textele = textElement(obj, angle);
    if (!pdfviewer.enableImportAnnotationMeasurement && obj.notes && obj.notes !== '') {
        textele.content = obj.notes;
    }
    else {
        textele.content = measure.setConversion(findPointsLength([points[0], points[1]]) * measure.pixelToPointFactor, obj);
    }
    textele.rotateValue = { y: -10, angle: angle };
    if (obj.enableShapeLabel === true) {
        textele.style.strokeColor = obj.labelBorderColor;
        textele.style.fill = obj.labelFillColor;
        textele.style.fontSize = obj.fontSize;
        textele.style.color = obj.fontColor;
        textele.style.fontFamily = obj.fontFamily;
    }
    labels.push(textele);
    return labels;
}
/**
 * @param {PdfAnnotationBaseModel} obj - Specified the annotation object.
 * @param {PointModel[]} points - Specified the annotation point model array.
 * @param {MeasureAnnotation} measure - Specified the measure annotation object.
 * @hidden
 * @returns {string} - Returns the distance value.
 */
export function updateDistanceLabel(obj, points, measure) {
    var distance;
    for (var i = 0; i < obj.wrapper.children.length; i++) {
        var textElement_1 = obj.wrapper.children[parseInt(i.toString(), 10)];
        if (textElement_1 && !isNullOrUndefined(textElement_1.content)) {
            distance = measure.setConversion(findPointsLength([points[0], points[1]]) * measure.pixelToPointFactor, obj);
            textElement_1.content = distance;
            textElement_1.childNodes[0].text = textElement_1.content;
            textElement_1.refreshTextElement();
        }
    }
    return distance;
}
/**
 * @param {PdfAnnotationBaseModel} obj - Specified the annotation object.
 * @param {MeasureAnnotation} measure - Specified the measure annotation object.
 * @hidden
 * @returns {string} - Returns the radius label value.
 */
export function updateRadiusLabel(obj, measure) {
    var radius;
    for (var i = 0; i < obj.wrapper.children.length; i++) {
        var textElement_2 = obj.wrapper.children[parseInt(i.toString(), 10)];
        if (textElement_2 && !isNullOrUndefined(textElement_2.content)) {
            radius = measure.setConversion((obj.bounds.width / 2) * measure.pixelToPointFactor, obj);
            textElement_2.content = radius;
            if (textElement_2.childNodes.length === 2) {
                textElement_2.childNodes[0].text = radius;
                textElement_2.childNodes.splice(textElement_2.childNodes.length - 1, 1);
            }
            else {
                textElement_2.childNodes[0].text = radius;
            }
            textElement_2.refreshTextElement();
        }
    }
    return radius;
}
/**
 * @param {PdfAnnotationBaseModel} obj - Specified the annotation object.
 * @param {PointModel[]} points - Specified the annotation point model array.
 * @param {MeasureAnnotation} measure - Specified the measure annotation object.
 * @param {PdfViewer} pdfviewer - Specified the pdfviewer element.
 * @hidden
 * @returns {TextElement[]} - Returns the text element collections.
 */
export function initPerimeterLabel(obj, points, measure, pdfviewer) {
    var labels = [];
    var angle = Point.findAngle(points[0], points[1]);
    var textele = textElement(obj, angle);
    if (!pdfviewer.enableImportAnnotationMeasurement && obj.notes && obj.notes !== '') {
        textele.content = obj.notes;
    }
    else {
        textele.content = measure.calculatePerimeter(obj);
    }
    if (obj.enableShapeLabel === true) {
        textele.style.strokeColor = obj.labelBorderColor;
        textele.style.fill = obj.labelFillColor;
        textele.style.fontSize = obj.fontSize;
        textele.style.color = obj.fontColor;
        textele.style.fontFamily = obj.fontFamily;
    }
    textele.rotateValue = { y: -10, angle: angle };
    labels.push(textele);
    return labels;
}
/**
 * @param {PdfAnnotationBaseModel} obj - Specified the annotation object.
 * @param {PointModel[]} points - Specified the annotation point model array.
 * @param {MeasureAnnotation} measure - Specified the measure annotation object.
 * @hidden
 * @returns {string} - Returns the perimeter label value.
 */
export function updatePerimeterLabel(obj, points, measure) {
    var perimeter;
    for (var i = 0; i < obj.wrapper.children.length; i++) {
        var textElement_3 = obj.wrapper.children[parseInt(i.toString(), 10)];
        if (textElement_3 && !isNullOrUndefined(textElement_3.content)) {
            perimeter = measure.calculatePerimeter(obj);
            textElement_3.content = perimeter;
            textElement_3.childNodes[0].text = textElement_3.content;
            textElement_3.refreshTextElement();
        }
    }
    return perimeter;
}
/**
 * @param {PdfAnnotationBaseModel} obj - Specified the annotation object.
 * @hidden
 * @returns {void}
 */
export function removePerimeterLabel(obj) {
    for (var i = 0; i < obj.wrapper.children.length; i++) {
        var textElement_4 = obj.wrapper.children[parseInt(i.toString(), 10)];
        if (textElement_4 && !isNullOrUndefined(textElement_4.content)) {
            obj.wrapper.children.splice(i, 1);
        }
    }
}
/**
 * @param {PdfAnnotationBaseModel} obj - Specified the annotation object.
 * @hidden
 * @returns {void}
 */
export function updateCalibrateLabel(obj) {
    if (obj.wrapper && obj.wrapper.children) {
        for (var i = 0; i < obj.wrapper.children.length; i++) {
            var textElement_5 = obj.wrapper.children[parseInt(i.toString(), 10)];
            if (textElement_5 && !isNullOrUndefined(textElement_5.content)) {
                textElement_5.content = obj.notes;
                textElement_5.childNodes[0].text = textElement_5.content;
                textElement_5.refreshTextElement();
            }
        }
    }
}
/**
 * Used to find the path for polygon shapes
 *
 * @param {PointModel[]} collection - Specified the polygon annotaion points collection.
 * @hidden
 * @returns {string} - Returns the polygon annotation path.
 */
export function getPolygonPath(collection) {
    var path = '';
    var seg;
    path = 'M' + collection[0].x + ' ' + collection[0].y;
    var i;
    for (i = 1; i < collection.length; i++) {
        seg = collection[parseInt(i.toString(), 10)];
        path += 'L' + seg.x + ' ' + seg.y;
    }
    path += 'Z';
    return path;
}
/**
 * @param {PdfAnnotationBaseModel} obj - Specified the annotation object.
 * @param {number} angle - Specified the annotaion rotation angle.
 * @hidden
 * @returns {TextElement} - Returns the annotation text element.
 */
export function textElement(obj, angle) {
    var textele = new TextElement();
    setElementStype(obj, textele);
    textele.style.fill = 'transparent';
    textele.id = randomId();
    textele.horizontalAlignment = 'Center';
    textele.rotateValue = { y: 10, angle: angle };
    textele.verticalAlignment = 'Top';
    textele.relativeMode = 'Object';
    textele.setOffsetWithRespectToBounds(.5, .5, 'Absolute');
    // eslint-disable-next-line
    textele.offsetX;
    textele.style.textWrapping = 'NoWrap';
    return textele;
}
/**
 * @param {PdfAnnotationBaseModel} obj - Specified the annotation object.
 * @param {PointModel[]} points - Specified the annotaion leader points.
 * @hidden
 * @returns {PathElement[]} - Returns the annotation path elements.
 */
export function initLeaders(obj, points) {
    var leaders = [];
    var leader = initLeader(obj, points[0], points[1]);
    leaders.push(leader);
    leader = initLeader(obj, points[1], points[0], true);
    leaders.push(leader);
    return leaders;
}
/**
 * @param {PdfAnnotationBaseModel} obj - Specified the annotation object.
 * @param {PointModel} point1 - Specified the annotaion leader point1.
 * @param {PointModel} point2 - Specified the annotaion leader point2.
 * @param {boolean} isSecondLeader - Specified the is second leader or not.
 * @hidden
 * @returns {PathElement} - Returns the annotation path element.
 */
export function initLeader(obj, point1, point2, isSecondLeader) {
    var element = new PathElement();
    element.offsetX = point1.x;
    element.offsetY = point1.y;
    var angle = Point.findAngle(point1, point2);
    var center = { x: (point1.x + point2.x) / 2, y: (point1.y + point2.y) / 2 };
    var matrix = identityMatrix();
    rotateMatrix(matrix, 0 - angle, center.x, center.y);
    var rotatedPoint = transformPointByMatrix(matrix, point1);
    var newPoint1 = { x: rotatedPoint.x, y: rotatedPoint.y - obj.leaderHeight };
    matrix = identityMatrix();
    rotateMatrix(matrix, angle, element.offsetX, element.offsetY);
    rotatedPoint = transformPointByMatrix(matrix, newPoint1);
    var finalPoint = { x: point1.x, y: point1.y };
    element.offsetX = finalPoint.x;
    element.offsetY = finalPoint.y;
    element.transform = RotateTransform.Self;
    var getPath = 'M' + point1.x + ',' + point1.y + ',L' + rotatedPoint.x + ',' + rotatedPoint.y + 'Z';
    var size = new Size(0, obj.leaderHeight);
    element.pivot.x = .5;
    if (isSecondLeader) {
        element.id = 'leader2_' + randomId();
        element.pivot.y = 0;
    }
    else {
        element.id = 'leader1_' + randomId();
        element.pivot.y = 1;
    }
    setElementStype(obj, element);
    element.rotateAngle = angle;
    element.data = getPath;
    element.canMeasurePath = true;
    element.width = size.width;
    element.height = size.height;
    return element;
}
/**
 * @private
 * @param {PdfAnnotationBaseModel} connector - Specified the annotation connector object.
 * @param {PointModel} reference - Specified the pointer reference value.
 * @returns {boolean} - Returns true or false.
 */
export function isPointOverConnector(connector, reference) {
    var vertexPoints = connector.vertexPoints;
    if (!isNullOrUndefined(vertexPoints)) {
        for (var i = 0; i < vertexPoints.length - 1; i++) {
            var start = vertexPoints[parseInt(i.toString(), 10)];
            var end = vertexPoints[i + 1];
            var rect = Rect.toBounds([start, end]);
            rect.Inflate(10);
            if (rect.containsPoint(reference)) {
                var intersectinPt = findNearestPoint(reference, start, end);
                var segment1 = { x1: start.x, x2: end.x, y1: start.y, y2: end.y };
                var segment2 = { x1: reference.x, x2: intersectinPt.x, y1: reference.y, y2: intersectinPt.y };
                var intersectDetails = intersect3(segment1, segment2);
                if (intersectDetails.enabled) {
                    var distance = Point.findLength(reference, intersectDetails.intersectPt);
                    if (Math.abs(distance) < 10) {
                        return true;
                    }
                }
                else {
                    var rect_1 = Rect.toBounds([reference, reference]);
                    rect_1.Inflate(3);
                    if (rect_1.containsPoint(start) || rect_1.containsPoint(end)) {
                        return true;
                    }
                }
                if (Point.equals(reference, intersectinPt)) {
                    return true;
                }
            }
        }
    }
    return false;
}
/**
 * @param {PointModel} reference - Specified the pointer reference value.
 * @param {PointModel} start - Specified the pointer start value.
 * @param {PointModel} end - Specified the pointer end value.
 * @private
 * @returns {PointModel} - Returns annotation point model.
 */
export function findNearestPoint(reference, start, end) {
    var shortestPoint;
    var shortest = Point.findLength(start, reference);
    var shortest1 = Point.findLength(end, reference);
    if (shortest > shortest1) {
        shortestPoint = end;
    }
    else {
        shortestPoint = start;
    }
    var angleBWStAndEnd = Point.findAngle(start, end);
    var angleBWStAndRef = Point.findAngle(shortestPoint, reference);
    var r = Point.findLength(shortestPoint, reference);
    var vaAngle = angleBWStAndRef + ((angleBWStAndEnd - angleBWStAndRef) * 2);
    return {
        x: (shortestPoint.x + r * Math.cos(vaAngle * Math.PI / 180)),
        y: (shortestPoint.y + r * Math.sin(vaAngle * Math.PI / 180))
    };
}
/**
 * @param {DecoratorShapes} shape - Specified the annotation decorator shapes.
 * @hidden
 * @returns {string} - Returns the annotation decorator shape value.
 */
export function getDecoratorShape(shape) {
    return decoratorShapes["" + shape];
}
var decoratorShapes = {
    'OpenArrow': 'M15.9,23 L5,16 L15.9,9 L17,10.7 L8.7,16 L17,21.3Z',
    'Square': 'M0,0 L10,0 L10,10 L0,10 z',
    'Fletch': 'M14.8,10c0,0-3.5,6,0.2,12c0,0-2.5-6-10.9-6C4.1,16,11.3,16,14.8,10z',
    'OpenFetch': 'M6,17c-0.6,0-1-0.4-1-1s0.4-1,1-1c10.9,0,11-5,11-5' +
        'c0-0.6,0.4-1,1-1s1,0.4,1,1C19,10.3,18.9,17,6,17C6,17,6,17,6,17z ' +
        'M18,23c-0.5,0-1-0.4-1-1c0-0.2-0.3-5-11-5c-0.6,0-1-0.5-1-1s0.4-1,1-1c0,0,0,0,0,0' +
        'c12.9,0,13,6.7,13,7    C19,22.6,18.6,23,18,23z',
    'IndentedArrow': 'M17,10c0,0-4.5,5.5,0,12L5,16L17,10z',
    'OutdentedArrow': 'M14.6,10c0,0,5.4,6,0,12L5,16L14.6,10z',
    'DoubleArrow': 'M19,10 L19,22 L13,16Z M12,10 L12,22 L6,16Z',
    'Arrow': 'M15,10 L15,22 L5,16Z',
    'Diamond': 'M12,23l-7-7l7-7l6.9,7L12,23z',
    'Circle': 'M0,50 A50,50,0 1 1 100,50 A50,50,0 1 1 0,50 Z',
    'Butt': 'M0,0 L0,90'
};
