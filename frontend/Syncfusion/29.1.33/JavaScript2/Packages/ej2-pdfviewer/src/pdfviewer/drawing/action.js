import { contains } from '@syncfusion/ej2-drawings';
import { Rect } from '@syncfusion/ej2-drawings';
import { Point, identityMatrix, rotateMatrix } from '@syncfusion/ej2-drawings';
import { Container, transformPointByMatrix } from '@syncfusion/ej2-drawings';
import { isPointOverConnector } from './connector-util';
import { LineTool, NodeDrawingTool, StampTool } from './tools';
import { isNullOrUndefined } from '@syncfusion/ej2-base';
/**
 * @private
 * @param {MouseEvent | TouchEvent} event - Specified the annotaion event.
 * @param {PdfViewerBase} pdfBase - Specified the pdfviewer base element.
 * @param {PdfViewer} pdfViewer - Specified the pdfviewer element.
 * @param {boolean} isOverlapped - Specified the overlapped element or not.
 * @returns {any} - Returns the active element.
 */
export function findActiveElement(event, pdfBase, pdfViewer, isOverlapped) {
    if (pdfViewer && pdfBase.activeElements.activePageID > -1) {
        var objects = findObjectsUnderMouse(pdfBase, pdfViewer, event);
        var object = findObjectUnderMouse(objects, event, pdfBase, pdfViewer);
        if (isOverlapped) {
            return objects;
        }
        return object;
    }
    return undefined;
}
/**
 * @private
 * @param {PdfViewerBase} pdfBase - Specified the pdfviewer base element.
 * @param {PdfViewer} pdfViewer - Specified the pdfviewer element.
 * @param {MouseEvent} event - Specified the annotaion event.
 * @returns {IElement[]} - Returns the annotaion elements.
 */
export function findObjectsUnderMouse(pdfBase, pdfViewer, event) {
    var pt = pdfBase.currentPosition || { x: event.offsetX, y: event.offsetY };
    pt = { x: pt.x / pdfBase.getZoomFactor(), y: pt.y / pdfBase.getZoomFactor() };
    var pageTable = pdfViewer.getPageTable(pdfBase.activeElements.activePageID);
    var objArray = findObjects(pt, pageTable.objects, pdfViewer.touchPadding);
    return objArray;
}
/**
 * @private
 * @param {PdfAnnotationBaseModel[]} objects - Specified the annotaion object model.
 * @param {any} event - Specified the annotaion event.
 * @param {PdfViewerBase} pdfBase - Specified the pdfviewer base element.
 * @param {PdfViewer} pdfViewer - Specified the pdfviewer element.
 * @returns {IElement} - Returns the annotaion element.
 */
export function findObjectUnderMouse(objects, event, pdfBase, pdfViewer) {
    var actualTarget = null;
    var touchArg;
    var offsetX;
    var offsetY;
    if (event && event.type && event.type.indexOf('touch') !== -1) {
        touchArg = event;
        if (pdfViewer.annotation) {
            var pageDiv = pdfBase.getElement('_pageDiv_' + pdfViewer.annotation.getEventPageNumber(event));
            if (pageDiv) {
                var pageCurrentRect = pageDiv.getBoundingClientRect();
                offsetX = touchArg.changedTouches[0].clientX - pageCurrentRect.left;
                offsetY = touchArg.changedTouches[0].clientY - pageCurrentRect.top;
            }
        }
    }
    else if (event && event.target && event.path && event.target.parentElement && event.target.parentElement.classList.contains('foreign-object')) {
        var targetParentRect = event.path[4].getBoundingClientRect();
        offsetX = event.clientX - targetParentRect.left;
        offsetY = event.clientY - targetParentRect.top;
    }
    else if (event.target && event.target.parentElement && event.target.parentElement.classList.contains('foreign-object')) {
        var targetParentRect = event.target.offsetParent.offsetParent.offsetParent.getBoundingClientRect();
        offsetX = event.clientX - targetParentRect.left;
        offsetY = event.clientY - targetParentRect.top;
    }
    else if (event.target && event.target.parentElement && event.target.parentElement.parentElement && event.target.parentElement.parentElement.classList.contains('foreign-object')) {
        var targetParentRect = void 0;
        if (event.target.offsetParent && event.target.offsetParent.offsetParent &&
            event.target.offsetParent.offsetParent.offsetParent && event.target.offsetParent.offsetParent.offsetParent.offsetParent) {
            targetParentRect = event.target.offsetParent.offsetParent.offsetParent.offsetParent.getBoundingClientRect();
            offsetX = event.clientX - targetParentRect.left;
            offsetY = event.clientY - targetParentRect.top;
        }
        else if (event.target.parentElement.offsetParent && event.target.parentElement.offsetParent.offsetParent) {
            targetParentRect = event.target.parentElement.offsetParent.offsetParent.getBoundingClientRect();
            offsetX = event.clientX - targetParentRect.left;
            offsetY = event.clientY - targetParentRect.top;
        }
    }
    else {
        offsetX = !isNaN(event.offsetX) ? event.offsetX : (event.position ? event.position.x : 0);
        offsetY = !isNaN(event.offsetY) ? event.offsetY : (event.position ? event.position.y : 0);
    }
    //EJ2-63562 - Reduced the offset selector by half to improve selection of fields in mobile devices
    var offsetForSelector = pdfViewer.touchPadding / 2;
    var boundsDiff = 0;
    for (var i = 0; i < objects.length; i++) {
        if (!(objects[parseInt(i.toString(), 10)].shapeAnnotationType === 'Distance' || objects[parseInt(i.toString(), 10)].shapeAnnotationType === 'Line' || objects[parseInt(i.toString(), 10)].shapeAnnotationType === 'LineWidthArrowHead' || pdfBase.tool instanceof LineTool)) {
            var bounds = objects[parseInt(i.toString(), 10)].wrapper.bounds;
            var rotationValue = 0;
            if (objects[parseInt(i.toString(), 10)].shapeAnnotationType === 'Stamp' || objects[parseInt(i.toString(), 10)].shapeAnnotationType === 'Image') {
                rotationValue = 25;
            }
            if ((((bounds.x - offsetForSelector) * pdfBase.getZoomFactor()) < offsetX) &&
                (((bounds.x + bounds.width + offsetForSelector) * pdfBase.getZoomFactor()) > offsetX) &&
                (((bounds.y - offsetForSelector - rotationValue) * pdfBase.getZoomFactor()) < offsetY) &&
                (((bounds.y + bounds.height + offsetForSelector) * pdfBase.getZoomFactor()) > offsetY)) {
                if (pdfBase.tool instanceof NodeDrawingTool || pdfBase.tool instanceof StampTool) {
                    actualTarget = objects[parseInt(i.toString(), 10)];
                }
                else {
                    if (!boundsDiff) {
                        actualTarget = objects[parseInt(i.toString(), 10)];
                        boundsDiff = (offsetX - ((bounds.x - offsetForSelector) * pdfBase.getZoomFactor())) +
                            (((bounds.x + bounds.width + offsetForSelector) * pdfBase.getZoomFactor()) - offsetX) +
                            (offsetY - ((bounds.y - offsetForSelector - rotationValue) * pdfBase.getZoomFactor())) +
                            (((bounds.y + bounds.height + offsetForSelector) * pdfBase.getZoomFactor()) - offsetY);
                    }
                    else {
                        var objectBounds = (offsetX - ((bounds.x - offsetForSelector) * pdfBase.getZoomFactor())) +
                            (((bounds.x + bounds.width + offsetForSelector) * pdfBase.getZoomFactor()) - offsetX) +
                            (offsetY - ((bounds.y - offsetForSelector - rotationValue) * pdfBase.getZoomFactor())) +
                            (((bounds.y + bounds.height + offsetForSelector) * pdfBase.getZoomFactor()) - offsetY);
                        if (boundsDiff > objectBounds) {
                            actualTarget = objects[parseInt(i.toString(), 10)];
                            boundsDiff = objectBounds;
                        }
                        else if (boundsDiff === objectBounds) {
                            actualTarget = objects[parseInt(i.toString(), 10)];
                            boundsDiff = objectBounds;
                        }
                        else if ((objects[parseInt(i.toString(), 10)].shapeAnnotationType === 'Image') || (objects[parseInt(i.toString(), 10)].shapeAnnotationType === 'Stamp')) {
                            actualTarget = objects[parseInt(i.toString(), 10)];
                        }
                    }
                }
            }
        }
        else {
            var pt = { x: offsetX / pdfBase.getZoomFactor(), y: offsetY / pdfBase.getZoomFactor() };
            var obj = findElementUnderMouse(objects[parseInt(i.toString(), 10)], pt, offsetForSelector);
            var isOver = isPointOverConnector(objects[parseInt(i.toString(), 10)], pt);
            if (obj && !isOver) {
                var newpoint = CalculateLeaderPoints(objects[parseInt(i.toString(), 10)], obj);
                if (newpoint) {
                    var rect = Rect.toBounds([newpoint, newpoint]);
                    rect.Inflate(10);
                    if (rect.containsPoint(pt)) {
                        isOver = true;
                    }
                }
            }
            if (obj && isOver) {
                actualTarget = objects[parseInt(i.toString(), 10)];
            }
        }
    }
    return actualTarget;
}
/**
 * @private
 * @param {any} selector - Specified the annotaion selctor.
 * @param {any} currentobject - Specified the current annotaion object.
 * @returns {any} - Returns the leader points.
 */
export function CalculateLeaderPoints(selector, currentobject) {
    var leaderCount = 0;
    var sourcePoint = selector.sourcePoint;
    var targetPoint = selector.targetPoint;
    if (selector.shapeAnnotationType === 'Distance') {
        var segment = currentobject;
        var newPoint1 = void 0;
        var angle = Point.findAngle(selector.sourcePoint, selector.targetPoint);
        if (segment.id.indexOf('leader') > -1) {
            var center = selector.wrapper.children[0].bounds.center;
            if (leaderCount === 0 && segment.id.indexOf('leader1') > -1) {
                newPoint1 = { x: selector.sourcePoint.x, y: selector.sourcePoint.y - selector.leaderHeight };
                center = sourcePoint;
            }
            else {
                newPoint1 = { x: selector.targetPoint.x, y: selector.targetPoint.y - selector.leaderHeight };
                center = targetPoint;
            }
            var matrix = identityMatrix();
            rotateMatrix(matrix, angle, center.x, center.y);
            var rotatedPoint = transformPointByMatrix(matrix, { x: newPoint1.x, y: newPoint1.y });
            return rotatedPoint;
        }
    }
}
/**
 * @private
 * @param {IElement} obj - Specified the annotation element.
 * @param {PointModel} position - Specified the annotation position value.
 * @param {number} padding - Specified the annotation padding.
 * @returns {DrawingElement} - Returns the annotation drawing element.
 */
export function findElementUnderMouse(obj, position, padding) {
    return findTargetShapeElement(obj.wrapper, position, padding);
}
/**
 * @private
 * @param {PdfAnnotationBaseModel} obj - Specified the annotation object model.
 * @param {string} key - Specified the annotation key value.
 * @param {object[]} collection - Specified the annotation collection.
 * @returns {void}
 */
export function insertObject(obj, key, collection) {
    if (collection.length === 0) {
        collection.push(obj);
    }
    else if (collection.length === 1) {
        if (collection[0]["" + key] > obj["" + key]) {
            collection.splice(0, 0, obj);
        }
        else {
            collection.push(obj);
        }
    }
    else if (collection.length > 1) {
        var low = 0;
        var high = collection.length - 1;
        var mid = Math.floor((low + high) / 2);
        while (mid !== low) {
            if (collection[parseInt(mid.toString(), 10)]["" + key] < obj["" + key]) {
                low = mid;
                mid = Math.floor((low + high) / 2);
            }
            else if (collection[parseInt(mid.toString(), 10)]["" + key] > obj["" + key]) {
                high = mid;
                mid = Math.floor((low + high) / 2);
            }
        }
        if (collection[parseInt(high.toString(), 10)]["" + key] < obj["" + key]) {
            collection.push(obj);
        }
        else if (collection[parseInt(low.toString(), 10)]["" + key] > obj["" + key]) {
            collection.splice(low, 0, obj);
        }
        else if ((collection[parseInt(low.toString(), 10)]["" + key] < obj["" + key]) && collection[parseInt(high.toString(), 10)]["" + key] > obj["" + key]) {
            collection.splice(high, 0, obj);
        }
    }
}
/**
 * @private
 * @param {Container} container - Specified the annotaion container.
 * @param {PointModel} position - Specified the annotation position.
 * @param {number} padding - Specified the annotaion padding value.
 * @returns {DrawingElement} - Returns the annotation drawing element.
 */
export function findTargetShapeElement(container, position, padding) {
    if (container && container.children) {
        for (var i = container.children.length - 1; i >= 0; i--) {
            var shapeElement = container.children[parseInt(i.toString(), 10)];
            var touchPadding = padding;
            if (!isNullOrUndefined(shapeElement.children) && shapeElement.children.length > 0) {
                for (var j = shapeElement.children.length - 1; j >= 0; j--) {
                    var currentTarget = shapeElement.children[parseInt(j.toString(), 10)];
                    if (currentTarget && currentTarget.bounds.containsPoint(position, touchPadding)) {
                        if (currentTarget instanceof Container) {
                            var targetElement = this.findTargetElement(currentTarget, position);
                            if (targetElement) {
                                return targetElement;
                            }
                        }
                        if (currentTarget.bounds.containsPoint(position, touchPadding)) {
                            return currentTarget;
                        }
                    }
                }
            }
            else {
                if (shapeElement && shapeElement.bounds.containsPoint(position, touchPadding)) {
                    if (shapeElement instanceof Container) {
                        var targetElement = this.findTargetElement(shapeElement, position);
                        if (targetElement) {
                            return targetElement;
                        }
                    }
                    if (shapeElement.bounds.containsPoint(position, touchPadding)) {
                        return shapeElement;
                    }
                }
            }
        }
    }
    if (container && container.bounds.containsPoint(position, padding) && container.style.fill !== 'none') {
        var element = container;
        var paddingValue = 10;
        var rotateThumbDistance = 30;
        var matrix = identityMatrix();
        rotateMatrix(matrix, element.parentTransform, element.offsetX, element.offsetY);
        var x = element.offsetX - element.pivot.x * element.actualSize.width;
        var y = element.offsetY - element.pivot.y * element.actualSize.height;
        var rotateThumb = {
            x: x + ((element.pivot.x === 0.5 ? element.pivot.x * 2 : element.pivot.x) * element.actualSize.width / 2),
            y: y - rotateThumbDistance
        };
        rotateThumb = transformPointByMatrix(matrix, rotateThumb);
        if (contains(position, rotateThumb, paddingValue)) {
            return container;
        }
    }
    return null;
}
/**
 * @private
 * @param {PointModel} region - Specified the annotation region point model.
 * @param {PdfAnnotationBaseModel[]} objCollection - Specified the annotation object collections.
 * @param {number} touchPadding - touchPadding
 * @returns {PdfAnnotationBaseModel[]} - Returns the annotation object collections.
 */
export function findObjects(region, objCollection, touchPadding) {
    var objects = [];
    for (var _i = 0, objCollection_1 = objCollection; _i < objCollection_1.length; _i++) {
        var obj = objCollection_1[_i];
        if (findElementUnderMouse(obj, region, touchPadding) || ((obj.shapeAnnotationType === 'Stamp') && findElementUnderMouse(obj, region, 40))) {
            insertObject(obj, 'zIndex', objects);
        }
    }
    return objects;
}
/**
 * @private
 * @param {MouseEvent} event - Specified the annotaion mouse event.
 * @returns {number} - Returns the active page Id.
 */
export function findActivePage(event) {
    var activePageID = undefined;
    if (event.target && event.target.wrapper) {
        return event.target.pageIndex;
    }
    if (event.target) {
        var elementIdColl = event.target.id.split('_');
        if (elementIdColl.length > 0) {
            activePageID = parseInt(elementIdColl[elementIdColl.length - 1], 10);
        }
    }
    return activePageID;
}
/**
 * @hidden
 */
var ActiveElements = /** @class */ (function () {
    function ActiveElements() {
        this.activePage = undefined;
        this.activePageID = undefined;
    }
    Object.defineProperty(ActiveElements.prototype, "activePageID", {
        /**
         * @private
         * @returns {number} - Returns the active page Id.
         */
        get: function () {
            return this.activePage;
        },
        /**
         * @private
         * @param {number} offset - The page offset value.
         */
        set: function (offset) {
            this.activePage = offset;
        },
        enumerable: true,
        configurable: true
    });
    return ActiveElements;
}());
export { ActiveElements };
