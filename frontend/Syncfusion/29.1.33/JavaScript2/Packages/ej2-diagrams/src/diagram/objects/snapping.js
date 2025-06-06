import { Rect } from '../primitives/rect';
import { PathElement } from '../core/elements/path-element';
import { SnapConstraints } from '../enum/enum';
import { Connector } from './connector';
import { Selector } from '../objects/node';
import { getBounds } from './../utility/base-util';
import { randomId } from './../utility/base-util';
import { isSelected } from '../interaction/actions';
import { TextElement } from '../core/elements/text-element';
import { DiagramHtmlElement } from '../core/elements/html-element';
/**
 * Snapping
 */
var Snapping = /** @class */ (function () {
    function Snapping(diagram) {
        this.line = [];
        this.diagram = diagram;
    }
    /** @private */
    Snapping.prototype.canSnap = function () {
        return (this.diagram.snapSettings.constraints
            & (SnapConstraints.SnapToObject | SnapConstraints.SnapToLines)) !== 0;
    };
    Snapping.prototype.getWrapperObject = function (selectedObject, nameTable) {
        if (selectedObject.nodes && selectedObject.nodes.length > 0
            && (this.diagram.snapSettings.constraints & SnapConstraints.SnapToLines || this.diagram.snapSettings.constraints
                & SnapConstraints.SnapToObject)) {
            for (var i = 0; i < selectedObject.nodes.length; i++) {
                if (((selectedObject.nodes[parseInt(i.toString(), 10)].shape.type === 'SwimLane' || selectedObject.nodes[parseInt(i.toString(), 10)].isLane)
                    || selectedObject.nodes[parseInt(i.toString(), 10)].parentId !== ''
                        && nameTable[(selectedObject.nodes[parseInt(i.toString(), 10)].parentId)]
                        && nameTable[(selectedObject.nodes[parseInt(i.toString(), 10)].parentId)].isLane) && nameTable['helper']) {
                    return nameTable['helper'].wrapper;
                }
                else {
                    return selectedObject.wrapper;
                }
            }
        }
        return selectedObject.wrapper;
    };
    Snapping.prototype.setSnapLineColor = function () {
        return this.diagram.snapSettings.snapLineColor;
    };
    /**
     * Snap to object
     *
     * @private
     */
    Snapping.prototype.snapPoint = function (diagram, selectedObject, towardsLeft, towardsTop, delta, startPoint, endPoint) {
        var snapSettings = this.diagram.snapSettings;
        var zoomFactor = this.diagram.scroller.currentZoom;
        var offset = { x: 0, y: 0 };
        var wrapper = this.getWrapperObject(selectedObject, diagram.nameTable);
        var bounds = getBounds(wrapper);
        var horizontallysnapped = { snapped: false, offset: 0 };
        var verticallysnapped = { snapped: false, offset: 0 };
        if (this.diagram.snapSettings.constraints & SnapConstraints.SnapToObject) {
            //let snapLine: SVGElement;
            var snapLine = document.createElementNS('http://www.w3.org/2000/svg', 'g');
            snapLine.setAttribute('id', '_SnappingLines');
            snapLine.setAttribute('shapeRendering', 'crispEdges');
            this.getAdornerLayerSvg().appendChild(snapLine);
            this.snapObject(diagram, selectedObject, snapLine, horizontallysnapped, verticallysnapped, delta, startPoint === endPoint);
        }
        //original position
        var left = bounds.x + delta.x;
        var top = bounds.y + delta.y;
        var right = bounds.x + bounds.width + delta.x;
        var bottom = bounds.y + bounds.height + delta.y;
        var scaledIntervals = snapSettings.verticalGridlines.scaledIntervals;
        //snapped positions
        var roundedRight = this.round(right, scaledIntervals, zoomFactor);
        var roundedLeft = this.round(left, scaledIntervals, zoomFactor);
        scaledIntervals = snapSettings.horizontalGridlines.scaledIntervals;
        var roundedTop = this.round(top, scaledIntervals, zoomFactor);
        var roundedBottom = this.round(bottom, scaledIntervals, zoomFactor);
        //currentposition
        var currentright = bounds.x + bounds.width;
        var currentbottom = bounds.y + bounds.height;
        if (!horizontallysnapped.snapped) {
            if (this.diagram.snapSettings.constraints & SnapConstraints.SnapToVerticalLines) {
                if (Math.abs(delta.x) >= 1) {
                    if (towardsLeft) {
                        if (Math.abs(roundedRight - currentright) > Math.abs(roundedLeft - bounds.x)) {
                            offset.x += roundedLeft - bounds.x;
                        }
                        else {
                            offset.x += roundedRight - currentright;
                        }
                    }
                    else {
                        if (Math.abs(roundedRight - currentright) < Math.abs(roundedLeft - bounds.x)) {
                            offset.x += roundedRight - currentright;
                        }
                        else {
                            offset.x += roundedLeft - bounds.x;
                        }
                    }
                }
            }
            else {
                offset.x = endPoint.x - startPoint.x;
            }
        }
        else {
            if (this.diagram.snapSettings.constraints & SnapConstraints.SnapToObject) {
                offset.x = horizontallysnapped.offset;
            }
            else {
                offset.x = endPoint.x - startPoint.x;
            }
        }
        if (!verticallysnapped.snapped) {
            if (this.diagram.snapSettings.constraints & SnapConstraints.SnapToHorizontalLines) {
                if (Math.abs(delta.y) >= 1) {
                    if (towardsTop) {
                        if (Math.abs(roundedBottom - currentbottom) > Math.abs(roundedTop - bounds.y)) {
                            offset.y += roundedTop - bounds.y;
                        }
                        else {
                            offset.y += roundedBottom - currentbottom;
                        }
                    }
                    else {
                        if (Math.abs(roundedBottom - currentbottom) < Math.abs(roundedTop - bounds.y)) {
                            offset.y += roundedBottom - currentbottom;
                        }
                        else {
                            offset.y += roundedTop - bounds.y;
                        }
                    }
                }
            }
            else {
                offset.y = endPoint.y - startPoint.y;
            }
        }
        else {
            offset.y = verticallysnapped.offset;
        }
        return offset;
    };
    /**
     * @private
     */
    Snapping.prototype.round = function (value, snapIntervals, scale) {
        if (scale === 1) {
            scale = Math.pow(2, Math.floor(Math.log(scale) / Math.log(2)));
        }
        else {
            scale = scale;
        }
        var cutoff = 0;
        var i = 0;
        for (i = 0; i < snapIntervals.length; i++) {
            cutoff += snapIntervals[parseInt(i.toString(), 10)];
        }
        cutoff /= scale;
        var quotient = Math.floor(Math.abs(value) / cutoff);
        var bal = value % cutoff;
        var prev = quotient * cutoff;
        if (prev !== value) {
            if (value >= 0) {
                for (i = 0; i < snapIntervals.length; i++) {
                    if (bal <= snapIntervals[parseInt(i.toString(), 10)] / scale) {
                        return prev + (bal < (snapIntervals[parseInt(i.toString(), 10)] / (2 * scale))
                            ? 0 : snapIntervals[parseInt(i.toString(), 10)] / scale);
                    }
                    else {
                        prev += snapIntervals[parseInt(i.toString(), 10)] / scale;
                        bal -= snapIntervals[parseInt(i.toString(), 10)] / scale;
                    }
                }
            }
            else {
                prev = prev * -1;
                for (i = snapIntervals.length - 1; i >= 0; i--) {
                    if (Math.abs(bal) <= snapIntervals[parseInt(i.toString(), 10)] / scale) {
                        return prev - (Math.abs(bal) < (snapIntervals[parseInt(i.toString(), 10)] / (2 * scale))
                            ? 0 : snapIntervals[parseInt(i.toString(), 10)] / scale);
                    }
                    else {
                        prev -= snapIntervals[parseInt(i.toString(), 10)] / scale;
                        bal += snapIntervals[parseInt(i.toString(), 10)] / scale;
                    }
                }
            }
        }
        return value;
    };
    //Snap to Object
    Snapping.prototype.snapObject = function (diagram, selectedObject, g, horizontalSnap, verticalSnap, delta, ended) {
        var lengthX = null;
        var lengthY;
        var hTarget;
        var vTarget;
        var scroller = this.diagram.scroller;
        var snapSettings = this.diagram.snapSettings;
        var objectsAtLeft = [];
        var objectsAtRight = [];
        var objectsAtTop = [];
        var objectsAtBottom = [];
        var wrapper = this.getWrapperObject(selectedObject, diagram.nameTable);
        var bounds = getBounds(wrapper);
        var scale = diagram.scroller.currentZoom;
        var hoffset = -scroller.horizontalOffset;
        var voffset = -scroller.verticalOffset;
        var snapObjDistance = snapSettings.snapObjectDistance / scale;
        var viewPort = new Rect(0, 0, scroller.viewPortWidth, scroller.viewPortHeight);
        var hIntersectRect = new Rect(hoffset / scale, (bounds.y - snapObjDistance - 5), viewPort.width / scale, (bounds.height + 2 * snapObjDistance + 10));
        var vIntersectRect = new Rect((bounds.x - snapObjDistance - 5), voffset / scale, (bounds.width + 2 * snapObjDistance + 10), viewPort.height / scale);
        viewPort = new Rect(hoffset / scale, voffset / scale, viewPort.width / scale, viewPort.height / scale);
        var nodes = this.findNodes(diagram.spatialSearch, selectedObject, vIntersectRect, viewPort);
        var i;
        var target;
        var targetBounds;
        var nameTable = diagram.nameTable;
        for (i = 0; i < nodes.length; i++) {
            target = nodes[parseInt(i.toString(), 10)];
            if (this.canBeTarget(diagram, target)) {
                if (!(this.diagram.nameTable[target.id] instanceof Connector) && this.canConsider(nameTable, selectedObject, target)) {
                    targetBounds = target.bounds;
                    if (targetBounds.height + targetBounds.y < delta.y + bounds.y) {
                        objectsAtTop.push({
                            obj: target, distance: Math.abs(bounds.y + delta.y - targetBounds.y - targetBounds.height)
                        });
                    }
                    else if (targetBounds.y > bounds.y + delta.y + bounds.height) {
                        objectsAtBottom.push({ obj: target, distance: Math.abs(bounds.y + delta.y + bounds.height - targetBounds.y) });
                    }
                    if (lengthX == null || lengthX > Math.abs(targetBounds.y - bounds.y - delta.y)) {
                        if (Math.abs(targetBounds.x + targetBounds.width / 2 - (bounds.x + bounds.width / 2 + delta.x)) <=
                            snapObjDistance) {
                            hTarget = this.createSnapObject(targetBounds, bounds, 'centerX');
                            lengthX = Math.abs(targetBounds.y - bounds.y);
                        }
                        else if (Math.abs(targetBounds.x + targetBounds.width - (bounds.x + bounds.width + delta.x)) <= snapObjDistance) {
                            hTarget = this.createSnapObject(targetBounds, bounds, 'right');
                            lengthX = Math.abs(targetBounds.y - bounds.y);
                        }
                        else if (Math.abs(targetBounds.x - (bounds.x + delta.x)) <= snapObjDistance) {
                            hTarget = this.createSnapObject(targetBounds, bounds, 'left');
                            lengthX = Math.abs(targetBounds.y - bounds.y);
                        }
                        else if (Math.abs(targetBounds.x - (bounds.x + bounds.width + delta.x)) <= snapObjDistance) {
                            hTarget = this.createSnapObject(targetBounds, bounds, 'rightLeft');
                            lengthX = Math.abs(targetBounds.y - bounds.y);
                        }
                        else if (Math.abs(targetBounds.x + targetBounds.width - (bounds.x + delta.x)) <= snapObjDistance) {
                            hTarget = this.createSnapObject(targetBounds, bounds, 'leftRight');
                            lengthX = Math.abs(targetBounds.y - bounds.y);
                        }
                    }
                }
            }
        }
        nodes = this.findNodes(diagram.spatialSearch, selectedObject, hIntersectRect, viewPort);
        for (var j = 0; j < nodes.length; j++) {
            target = nodes[parseInt(j.toString(), 10)];
            if (this.canBeTarget(diagram, target)) {
                if (!(this.diagram.nameTable[target.id] instanceof Connector) && this.canConsider(nameTable, selectedObject, target)) {
                    targetBounds = target.bounds;
                    if (targetBounds.x + targetBounds.width < bounds.x + delta.x) {
                        objectsAtLeft[objectsAtLeft.length] = {
                            obj: target, distance: Math.abs((bounds.x + delta.x) - targetBounds.x - targetBounds.width)
                        };
                    }
                    if (targetBounds.x > bounds.x + delta.x + bounds.width) {
                        objectsAtRight[objectsAtRight.length] = {
                            obj: target, distance: Math.abs(bounds.x + delta.x + bounds.width - targetBounds.x)
                        };
                    }
                    if (lengthY == null || lengthY > Math.abs(targetBounds.x - bounds.x - delta.x)) {
                        if (Math.abs(targetBounds.y + targetBounds.height / 2 - (bounds.y + bounds.height / 2 + delta.y))
                            <= snapObjDistance) {
                            vTarget = this.createSnapObject(targetBounds, bounds, 'centerY');
                            lengthY = Math.abs(targetBounds.x - bounds.x);
                        }
                        else if (Math.abs(targetBounds.y - bounds.y - delta.y) <= snapObjDistance) {
                            vTarget = this.createSnapObject(targetBounds, bounds, 'top');
                            lengthY = Math.abs(targetBounds.x - bounds.x);
                        }
                        else if (Math.abs(targetBounds.y + targetBounds.height - (bounds.y + bounds.height + delta.y)) <=
                            snapObjDistance) {
                            vTarget = this.createSnapObject(targetBounds, bounds, 'bottom');
                            lengthY = Math.abs(targetBounds.x - bounds.x);
                        }
                        else if (Math.abs(targetBounds.y + targetBounds.height - bounds.y - delta.y) <= snapObjDistance) {
                            vTarget = this.createSnapObject(targetBounds, bounds, 'topBottom');
                            lengthY = Math.abs(targetBounds.x - bounds.x);
                        }
                        else if (Math.abs(targetBounds.y - (bounds.y + bounds.height + delta.y)) <= snapObjDistance) {
                            vTarget = this.createSnapObject(targetBounds, bounds, 'bottomTop');
                            lengthY = Math.abs(targetBounds.x - bounds.x);
                        }
                    }
                }
            }
        }
        this.createGuidelines(diagram, hTarget, vTarget, g, horizontalSnap, verticalSnap, ended);
        if (!horizontalSnap.snapped) {
            this.createHSpacingLines(diagram, g, selectedObject, objectsAtLeft, objectsAtRight, horizontalSnap, verticalSnap, ended, delta, snapObjDistance);
        }
        if (!verticalSnap.snapped) {
            this.createVSpacingLines(diagram, g, selectedObject, objectsAtTop, objectsAtBottom, horizontalSnap, verticalSnap, ended, delta, snapObjDistance);
        }
    };
    /**
     * @private
     */
    Snapping.prototype.snapConnectorEnd = function (point) {
        var snapSettings = this.diagram.snapSettings;
        var zoomFactor = this.diagram.scroller.currentZoom;
        if (snapSettings.constraints & SnapConstraints.SnapToLines) {
            point.x = this.round(point.x, snapSettings.verticalGridlines.scaledIntervals, zoomFactor);
            point.y = this.round(point.y, snapSettings.horizontalGridlines.scaledIntervals, zoomFactor);
        }
        return point;
    };
    Snapping.prototype.canBeTarget = function (diagram, node) {
        node = this.diagram.nameTable[node.id];
        return !(isSelected(this.diagram, node, false));
    };
    Snapping.prototype.snapSize = function (diagram, horizontalSnap, verticalSnap, snapLine, deltaX, deltaY, selectedObject, ended) {
        var lengthX;
        var lengthY;
        var snapSettings = this.diagram.snapSettings;
        var scroller = this.diagram.scroller;
        var hTarget;
        var vTarget;
        var bounds = getBounds(selectedObject.wrapper);
        var nameTable = diagram.nameTable;
        var sameWidth = [];
        var sameHeight = [];
        var scale = diagram.scroller.currentZoom;
        var hoffset = -scroller.horizontalOffset;
        var voffset = -scroller.verticalOffset;
        var snapObjDistance = snapSettings.snapObjectDistance / scale;
        var viewPort = new Rect(0, 0, scroller.viewPortWidth, scroller.viewPortHeight);
        var hintersectedrect = new Rect(hoffset / scale, (bounds.y - 5) / scale, viewPort.width / scale, (bounds.height + 10) / scale);
        var vintersectedrect = new Rect((bounds.x - 5) / scale, voffset / scale, (bounds.width + 10) / scale, viewPort.height / scale);
        viewPort = new Rect(hoffset / scale, voffset / scale, viewPort.width / scale, viewPort.height / scale);
        var nodesInView = [];
        var nodes = this.findNodes(diagram.spatialSearch, selectedObject, vintersectedrect, viewPort, nodesInView);
        var i;
        var target;
        var targetBounds;
        for (i = 0; i < nodes.length; i++) {
            target = nodes[parseInt(i.toString(), 10)];
            if (this.canConsider(nameTable, selectedObject, target) && !(this.diagram.nameTable[target.id] instanceof Connector)) {
                targetBounds = target.bounds;
                if (lengthX == null || lengthX > Math.abs(targetBounds.y - bounds.y)) {
                    if (horizontalSnap.left) {
                        if (Math.abs(bounds.x + deltaX - targetBounds.x) <= snapObjDistance) {
                            hTarget = this.createSnapObject(targetBounds, bounds, 'left');
                            lengthX = Math.abs(targetBounds.y - bounds.y);
                        }
                        else if (Math.abs(bounds.x + deltaX - targetBounds.x - targetBounds.width) <= snapObjDistance) {
                            hTarget = this.createSnapObject(targetBounds, bounds, 'leftRight');
                            lengthX = Math.abs(targetBounds.y - bounds.y);
                        }
                    }
                    else if (horizontalSnap.right) {
                        if (Math.abs(bounds.x + deltaX + bounds.width - targetBounds.x - targetBounds.width) <= snapObjDistance) {
                            hTarget = this.createSnapObject(targetBounds, bounds, 'right');
                            lengthX = Math.abs(targetBounds.y - bounds.y);
                        }
                        else if (Math.abs(bounds.x + deltaX + bounds.width - targetBounds.x) <= snapObjDistance) {
                            hTarget = this.createSnapObject(targetBounds, bounds, 'rightLeft');
                            lengthX = Math.abs(targetBounds.y - bounds.y);
                        }
                    }
                }
            }
        }
        nodes = this.findNodes(diagram.spatialSearch, selectedObject, hintersectedrect, viewPort);
        for (var i_1 = 0; i_1 < nodes.length; i_1++) {
            var target_1 = nodes[parseInt(i_1.toString(), 10)];
            if (this.canConsider(nameTable, selectedObject, target_1) && !(this.diagram.nameTable[target_1.id] instanceof Connector)) {
                var targetBounds_1 = target_1.bounds;
                if (lengthY == null || lengthY > Math.abs(targetBounds_1.x - bounds.x)) {
                    if (verticalSnap.top) {
                        if (Math.abs(bounds.y + deltaY - targetBounds_1.y) <= snapObjDistance) {
                            vTarget = this.createSnapObject(targetBounds_1, bounds, 'top');
                            lengthY = Math.abs(targetBounds_1.x - bounds.x);
                        }
                        else if (Math.abs(bounds.y + deltaY - targetBounds_1.y - targetBounds_1.height) <= snapObjDistance) {
                            vTarget = this.createSnapObject(targetBounds_1, bounds, 'topBottom');
                            lengthY = Math.abs(targetBounds_1.x - bounds.x);
                        }
                    }
                    else if (verticalSnap.bottom) {
                        if (Math.abs(bounds.y + bounds.height + deltaY - targetBounds_1.y - targetBounds_1.height) <= snapObjDistance) {
                            vTarget = this.createSnapObject(targetBounds_1, bounds, 'bottom');
                            lengthY = Math.abs(targetBounds_1.x - bounds.x);
                        }
                        else if (Math.abs(bounds.y + bounds.height + deltaY - targetBounds_1.y) <= snapObjDistance) {
                            vTarget = this.createSnapObject(targetBounds_1, bounds, 'bottomTop');
                            lengthY = Math.abs(targetBounds_1.x - bounds.x);
                        }
                    }
                }
            }
        }
        for (i = 0; i < nodesInView.length; i++) {
            target = nodesInView[parseInt(i.toString(), 10)];
            if (this.canConsider(nameTable, selectedObject, target)) {
                var targetBounds_2 = target.bounds;
                var delta = horizontalSnap.left ? -deltaX : deltaX;
                var difference = Math.abs(bounds.width + delta - targetBounds_2.width);
                var actualDiff = void 0;
                if (difference <= snapObjDistance) {
                    actualDiff = horizontalSnap.left ? -targetBounds_2.width + bounds.width : targetBounds_2.width - bounds.width;
                    sameWidth[sameWidth.length] = { source: target, difference: difference, offset: actualDiff };
                }
                delta = verticalSnap.top ? -deltaY : deltaY;
                var dify = Math.abs(bounds.height + delta - targetBounds_2.height);
                if (dify <= snapObjDistance) {
                    actualDiff = verticalSnap.top ? -targetBounds_2.height + bounds.height : targetBounds_2.height - bounds.height;
                    sameHeight[sameHeight.length] = { source: target, difference: dify, offset: actualDiff };
                }
            }
        }
        var g;
        if (!diagram.getTool) {
            var g_1 = this.createGuidelines(diagram, hTarget, vTarget, snapLine, horizontalSnap, verticalSnap, ended);
        }
        if (!horizontalSnap.snapped && sameWidth.length > 0 && (horizontalSnap.left || horizontalSnap.right)) {
            this.addSameWidthLines(diagram, snapLine, sameWidth, horizontalSnap, ended, selectedObject);
        }
        if (!verticalSnap.snapped && sameHeight.length > 0 && (verticalSnap.top || verticalSnap.bottom)) {
            this.addSameHeightLines(diagram, snapLine, sameHeight, verticalSnap, ended, selectedObject);
        }
    };
    /**
     * Snap to object on top
     *
     * @private
     */
    Snapping.prototype.snapTop = function (horizontalSnap, verticalSnap, snapLine, deltaX, deltaY, shape, ended, initialBoundsT) {
        var dify = deltaY;
        verticalSnap.top = true;
        var y;
        horizontalSnap.left = horizontalSnap.right = false;
        var zoomFactor = this.diagram.scroller.currentZoom;
        //let initialBoundsT: Rect = new Rect(shape.offsetX, shape.offsetY, shape.width, shape.height);
        if (this.diagram.snapSettings.constraints & SnapConstraints.SnapToObject && !shape.rotateAngle) {
            //(!this.selectedObject.isLane && !this.selectedObject.isSwimlane)) {
            y = initialBoundsT.y - initialBoundsT.height * shape.pivot.y + deltaY - (shape.offsetY - shape.height * shape.pivot.y);
            this.snapSize(this.diagram, horizontalSnap, verticalSnap, snapLine, deltaX, y, this.diagram.selectedItems, ended);
        }
        if (!verticalSnap.snapped) {
            if (this.diagram.snapSettings.constraints & SnapConstraints.SnapToHorizontalLines) {
                var top_1 = initialBoundsT.y - initialBoundsT.height * shape.pivot.y;
                var actualTop = top_1 + deltaY;
                var roundedTop = this.round(actualTop, this.diagram.snapSettings.horizontalGridlines.scaledIntervals, zoomFactor);
                dify = roundedTop - top_1;
            }
        }
        else {
            dify = (deltaY - y) + verticalSnap.offset;
        }
        return dify;
    };
    /**
     * Snap to object on right
     *
     * @private
     */
    Snapping.prototype.snapRight = function (horizontalSnap, verticalSnap, snapLine, deltaX, deltaY, shape, ended, initialBound) {
        var difx = deltaX;
        var x;
        horizontalSnap.right = true;
        verticalSnap.top = verticalSnap.bottom = false;
        var zoomFactor = this.diagram.scroller.currentZoom;
        //let initialBound: Rect = new Rect(shape.offsetX, shape.offsetY, shape.width, shape.height);
        if (this.diagram.snapSettings.constraints & SnapConstraints.SnapToObject && !shape.rotateAngle) {
            //(!this.selectedObject.isLane && !this.selectedObject.isSwimlane)) {
            x = initialBound.x + initialBound.width * (1 - shape.pivot.x) + deltaX - (shape.offsetX + shape.width * (1 - shape.pivot.x));
            this.snapSize(this.diagram, horizontalSnap, verticalSnap, snapLine, x, deltaY, this.diagram.selectedItems, ended);
        }
        if (!horizontalSnap.snapped) {
            if (this.diagram.snapSettings.constraints & SnapConstraints.SnapToVerticalLines) {
                var right = initialBound.x + initialBound.width * (1 - shape.pivot.x);
                var actualRight = right + deltaX;
                var roundedRight = this.round(actualRight, this.diagram.snapSettings.verticalGridlines.scaledIntervals, zoomFactor);
                difx = roundedRight - right;
            }
        }
        else {
            difx = (deltaX - x) + horizontalSnap.offset;
        }
        return difx;
    };
    /**
     * Snap to object on left
     *
     * @private
     */
    Snapping.prototype.snapLeft = function (horizontalSnap, verticalSnap, snapLine, deltaX, deltaY, shape, ended, initialBoundsB) {
        var difx = deltaX;
        var x = 0;
        horizontalSnap.left = true;
        verticalSnap.top = verticalSnap.bottom = false;
        var zoomFactor = this.diagram.scroller.currentZoom;
        //let initialBoundsB: Rect = new Rect(shape.offsetX, shape.offsetY, shape.width, shape.height);
        if (this.diagram.snapSettings.constraints & SnapConstraints.SnapToObject && !shape.rotateAngle) {
            //(!this.selectedObject.isLane && !this.selectedObject.isSwimlane)) {
            x = initialBoundsB.x - initialBoundsB.width * shape.pivot.x + deltaX - (shape.offsetX - shape.width * shape.pivot.x);
            this.snapSize(this.diagram, horizontalSnap, verticalSnap, snapLine, x, deltaY, this.diagram.selectedItems, ended);
        }
        if (!horizontalSnap.snapped) {
            if (this.diagram.snapSettings.constraints & SnapConstraints.SnapToVerticalLines) {
                var left = initialBoundsB.x - initialBoundsB.width * shape.pivot.x;
                var actualLeft = left + deltaX;
                var roundedLeft = this.round(actualLeft, this.diagram.snapSettings.horizontalGridlines.scaledIntervals, zoomFactor);
                difx = roundedLeft - left;
            }
        }
        else {
            difx = (deltaX - x) + horizontalSnap.offset;
        }
        return difx;
    };
    /**
     * Snap to object on bottom
     *
     * @private
     */
    Snapping.prototype.snapBottom = function (horizontalSnap, verticalSnap, snapLine, deltaX, deltaY, shape, ended, initialRect) {
        var dify = deltaY;
        verticalSnap.bottom = true;
        horizontalSnap.left = horizontalSnap.right = false;
        var zoomFactor = this.diagram.scroller.currentZoom;
        var y = 0;
        //let initialRect: Rect = new Rect(shape.offsetX, shape.offsetY, shape.width, shape.height);
        if (this.diagram.snapSettings.constraints & SnapConstraints.SnapToObject && !shape.rotateAngle) {
            //(!this.selectedObject.isLane && !this.selectedObject.isSwimlane)) {
            y = initialRect.y + initialRect.height * (1 - shape.pivot.y) + deltaY - (shape.offsetY + shape.height * (1 - shape.pivot.y));
            this.snapSize(this.diagram, horizontalSnap, verticalSnap, snapLine, deltaX, y, this.diagram.selectedItems, ended);
        }
        // eslint-disable-next-line max-len
        var bounds = ((shape instanceof TextElement) || (shape instanceof DiagramHtmlElement)) ? getBounds(shape) :
            getBounds(shape.wrapper);
        if (!verticalSnap.snapped) {
            if (this.diagram.snapSettings.constraints & SnapConstraints.SnapToHorizontalLines) {
                var bottom = initialRect.y + initialRect.height * (1 - shape.pivot.y);
                var actualBottom = bottom + deltaY;
                var roundedBottom = this.round(actualBottom, this.diagram.snapSettings.horizontalGridlines.scaledIntervals, zoomFactor);
                dify = roundedBottom - bottom;
            }
        }
        else {
            dify = (deltaY - y) + verticalSnap.offset;
        }
        return dify;
    };
    //To create the same width and same size lines
    Snapping.prototype.createGuidelines = function (diagram, hTarget, vTarget, snapLine, horizontalSnap, verticalSnap, ended) {
        if (hTarget) {
            horizontalSnap.offset = hTarget.offsetX;
            horizontalSnap.snapped = true;
            if (!ended) {
                if (hTarget.type === 'sideAlign') {
                    this.renderAlignmentLines(hTarget.start, hTarget.end, snapLine, diagram.scroller.transform);
                }
                else {
                    this.renderAlignmentLines(hTarget.start, hTarget.end, snapLine, diagram.scroller.transform);
                }
            }
        }
        if (vTarget) {
            verticalSnap.offset = vTarget.offsetY;
            verticalSnap.snapped = true;
            if (!ended) {
                if (vTarget.type === 'sideAlign') {
                    this.renderAlignmentLines(vTarget.start, vTarget.end, snapLine, diagram.scroller.transform);
                }
                else {
                    this.renderAlignmentLines(vTarget.start, vTarget.end, snapLine, diagram.scroller.transform);
                }
            }
        }
        return snapLine;
    };
    //To create the alignment lines
    Snapping.prototype.renderAlignmentLines = function (start, end, svg, transform) {
        start = {
            x: (start.x + transform.tx) * transform.scale,
            y: (start.y + transform.ty) * transform.scale
        };
        end = {
            x: (end.x + transform.tx) * transform.scale,
            y: (end.y + transform.ty) * transform.scale
        };
        var line1 = {
            stroke: this.setSnapLineColor(), strokeWidth: 1, startPoint: { x: start.x, y: start.y },
            endPoint: { x: end.x, y: end.y }, fill: this.setSnapLineColor(), dashArray: '', width: 1,
            x: 0, y: 0, height: 0, angle: 0, pivotX: 0,
            pivotY: 0, visible: true, opacity: 1, id: randomId()
        };
        var i = 0;
        this.line.push(line1);
        for (i = 0; i < this.line.length; i++) {
            this.diagram.diagramRenderer.drawLine(svg, this.line.pop());
        }
    };
    //To create Horizontal spacing lines
    Snapping.prototype.createHSpacingLines = function (diagram, g, shape, objectsAtLeft, objectsAtRight, horizontalSnap, verticalSnap, ended, delta, snapObjDistance) {
        var top = 0;
        this.sortByDistance(objectsAtLeft, 'distance', true);
        this.sortByDistance(objectsAtRight, 'distance', true);
        var equallySpaced = [];
        var bounds;
        if (diagram.selectedObject.helperObject) {
            bounds = getBounds(diagram.selectedObject.helperObject.wrapper);
        }
        else {
            bounds = getBounds(shape.wrapper);
        }
        var nearestleft;
        var nearestright;
        var targetBounds;
        var equaldistance;
        if (objectsAtLeft.length > 0) {
            equallySpaced[equallySpaced.length] = objectsAtLeft[0];
            nearestleft = ((objectsAtLeft[0].obj).bounds);
            top = nearestleft.y;
            if (objectsAtLeft.length > 1) {
                targetBounds = ((objectsAtLeft[1].obj).bounds);
                equaldistance = nearestleft.x - targetBounds.x - targetBounds.width;
                if (Math.abs(equaldistance - objectsAtLeft[0].distance) <= snapObjDistance) {
                    top = this.findEquallySpacedNodesAtLeft(objectsAtLeft, equaldistance, top, equallySpaced);
                }
                else {
                    equaldistance = objectsAtLeft[0].distance;
                }
            }
            else {
                equaldistance = objectsAtLeft[0].distance;
            }
        }
        this.sortByDistance(equallySpaced, 'distance');
        equallySpaced[equallySpaced.length] = { obj: shape, distance: 0 };
        top = bounds.y < top || !top ? bounds.y : top;
        if (objectsAtRight.length > 0) {
            var dist = void 0;
            nearestright = ((objectsAtRight[0].obj).bounds);
            top = nearestright.y < top ? nearestright.y : top;
            if (objectsAtRight.length > 1) {
                targetBounds = ((objectsAtRight[1].obj).bounds);
                dist = targetBounds.x - nearestright.x - nearestright.width;
            }
            if (objectsAtLeft.length > 0) {
                if (Math.abs(objectsAtRight[0].distance - objectsAtLeft[0].distance) <= snapObjDistance) {
                    var adjustablevalue = Math.abs(objectsAtRight[0].distance - objectsAtLeft[0].distance) / 2;
                    (objectsAtRight[0].distance < objectsAtLeft[0].distance) ?
                        equaldistance -= adjustablevalue : equaldistance += adjustablevalue;
                    equallySpaced[equallySpaced.length] = objectsAtRight[0];
                }
                else if (objectsAtLeft.length === 1) {
                    nearestleft = undefined;
                    equallySpaced.splice(0, 1);
                    equallySpaced[equallySpaced.length] = objectsAtRight[0];
                    equaldistance = dist;
                }
            }
            else {
                equaldistance = dist;
                equallySpaced[equallySpaced.length] = objectsAtRight[0];
            }
            if (objectsAtRight.length > 1 && nearestright.x + nearestright.width < targetBounds.x) {
                top = this.findEquallySpacedNodesAtRight(objectsAtRight, dist, top, equallySpaced, snapObjDistance);
            }
        }
        if (equallySpaced.length > 2) {
            this.addHSpacingLines(diagram, g, equallySpaced, ended, top);
            var deltaHorizontal = 0;
            if (ended) {
                deltaHorizontal = delta.x;
            }
            if (nearestleft) {
                horizontalSnap.offset = equaldistance - Math.abs(bounds.x + deltaHorizontal - nearestleft.x - nearestleft.width)
                    + deltaHorizontal;
            }
            else if (nearestright) {
                horizontalSnap.offset = Math.abs(bounds.x + bounds.width + deltaHorizontal - nearestright.x)
                    - equaldistance + deltaHorizontal;
            }
            horizontalSnap.snapped = true;
        }
    };
    //To create vertical spacing lines
    Snapping.prototype.createVSpacingLines = function (diagram, g, shape, objectsAtTop, objectsAtBottom, horizontalSnap, verticalSnap, ended, delta, snapObjDistance) {
        var right = 0;
        this.sortByDistance(objectsAtTop, 'distance', true);
        this.sortByDistance(objectsAtBottom, 'distance', true);
        var equallySpaced = [];
        var wrapper = this.getWrapperObject(shape, diagram.nameTable);
        var bounds = getBounds(wrapper);
        var nearesttop;
        var nearestbottom;
        var targetBounds;
        var equaldistance;
        if (objectsAtTop.length > 0) {
            equallySpaced[equallySpaced.length] = objectsAtTop[0];
            nearesttop = ((objectsAtTop[0].obj).bounds);
            right = nearesttop.x + nearesttop.width;
            if (objectsAtTop.length > 1) {
                targetBounds = ((objectsAtTop[1].obj).bounds);
                equaldistance = nearesttop.y - targetBounds.y - targetBounds.height;
                if (Math.abs(equaldistance - objectsAtTop[0].distance) <= snapObjDistance) {
                    right = this.findEquallySpacedNodesAtTop(objectsAtTop, equaldistance, right, equallySpaced);
                }
                else {
                    equaldistance = objectsAtTop[0].distance;
                }
            }
            else {
                equaldistance = objectsAtTop[0].distance;
            }
        }
        this.sortByDistance(equallySpaced, 'distance');
        equallySpaced[equallySpaced.length] = { obj: shape, distance: 0 };
        right = bounds.x + bounds.width > right || !right ? bounds.x + bounds.width : right;
        var dist;
        if (objectsAtBottom.length > 0) {
            nearestbottom = ((objectsAtBottom[0].obj).bounds);
            right = nearestbottom.x + nearestbottom.width > right ? nearestbottom.x + nearestbottom.width : right;
            if (objectsAtBottom.length > 1) {
                targetBounds = ((objectsAtBottom[1].obj).bounds);
                dist = targetBounds.y - nearestbottom.y - nearestbottom.height;
            }
            if (objectsAtTop.length > 0) {
                if (Math.abs(objectsAtBottom[0].distance - objectsAtTop[0].distance) <= snapObjDistance) {
                    var adjustablevalue = Math.abs(objectsAtBottom[0].distance - objectsAtTop[0].distance) / 2;
                    (objectsAtBottom[0].distance < objectsAtTop[0].distance) ?
                        equaldistance -= adjustablevalue : equaldistance += adjustablevalue;
                    equallySpaced[equallySpaced.length] = objectsAtBottom[0];
                }
                else if (objectsAtTop.length === 1) {
                    nearesttop = undefined;
                    equallySpaced.splice(0, 1);
                    equallySpaced[equallySpaced.length] = objectsAtBottom[0];
                    equaldistance = dist;
                }
            }
            else {
                equaldistance = dist;
                equallySpaced[equallySpaced.length] = objectsAtBottom[0];
            }
            if (objectsAtBottom.length > 1 && targetBounds.y > nearestbottom.y + nearestbottom.height) {
                right = this.findEquallySpacedNodesAtBottom(objectsAtBottom, dist, right, equallySpaced, snapObjDistance);
            }
        }
        if (equallySpaced.length > 2) {
            this.addVSpacingLines(diagram, g, equallySpaced, ended, right);
            var deltaVertical = 0;
            if (ended) {
                deltaVertical = delta.y;
            }
            if (nearesttop) {
                verticalSnap.offset = equaldistance - Math.abs(bounds.y + deltaVertical - nearesttop.y - nearesttop.height) + deltaVertical;
            }
            else if (nearestbottom) {
                verticalSnap.offset = Math.abs(bounds.y + bounds.height + deltaVertical - nearestbottom.y) - equaldistance + deltaVertical;
            }
            verticalSnap.snapped = true;
        }
    };
    //Add the Horizontal spacing lines
    Snapping.prototype.addHSpacingLines = function (diagram, g, equallySpaced, ended, top) {
        var i;
        var start;
        var end;
        if (!ended) {
            for (i = 0; i < equallySpaced.length - 1; i++) {
                var crnt = equallySpaced[parseInt(i.toString(), 10)].obj instanceof Selector ?
                    getBounds((equallySpaced[parseInt(i.toString(), 10)].obj).wrapper)
                    : ((equallySpaced[parseInt(i.toString(), 10)].obj).bounds);
                var next = equallySpaced[i + 1].obj instanceof Selector ?
                    getBounds((equallySpaced[i + 1].obj).wrapper) : ((equallySpaced[i + 1].obj).bounds);
                start = { x: crnt.x + crnt.width, y: top - 15 };
                end = { x: next.x, y: top - 15 };
                this.renderSpacingLines(start, end, g, this.getAdornerLayerSvg(), diagram.scroller.transform);
            }
        }
    };
    //Add the vertical spacing lines
    Snapping.prototype.addVSpacingLines = function (diagram, g, equallySpacedObjects, ended, right) {
        var start;
        var end;
        if (!ended) {
            for (var i = 0; i < equallySpacedObjects.length - 1; i++) {
                var crnt = equallySpacedObjects[parseInt(i.toString(), 10)].obj instanceof Selector ?
                    getBounds((equallySpacedObjects[parseInt(i.toString(), 10)].obj).wrapper)
                    : ((equallySpacedObjects[parseInt(i.toString(), 10)].obj).bounds);
                var next = equallySpacedObjects[i + 1].obj instanceof Selector ?
                    getBounds((equallySpacedObjects[i + 1].obj).wrapper) :
                    ((equallySpacedObjects[i + 1].obj).bounds);
                start = { x: right + 15, y: crnt.y + crnt.height };
                end = { x: right + 15, y: next.y };
                this.renderSpacingLines(start, end, g, this.getAdornerLayerSvg(), diagram.scroller.transform);
            }
        }
    };
    //To add same width lines
    Snapping.prototype.addSameWidthLines = function (diagram, snapLine, sameWidths, horizontalSnap, ended, shape) {
        this.sortByDistance(sameWidths, 'offset');
        var bounds = getBounds(shape.wrapper);
        var target = sameWidths[0];
        var startPt;
        var endPt;
        var targetBounds = (target.source).bounds;
        var sameSizes = [];
        sameSizes.push(sameWidths[0]);
        var i;
        var crntbounds;
        for (i = 1; i < sameWidths.length; i++) {
            crntbounds = (sameWidths[parseInt(i.toString(), 10)].source).bounds;
            if (crntbounds.width === targetBounds.width) {
                sameSizes.push(sameWidths[parseInt(i.toString(), 10)]);
            }
        }
        if (!ended) {
            startPt = { x: bounds.x + target.offset, y: bounds.y - 15 };
            endPt = { x: bounds.x + bounds.width + target.offset, y: bounds.y - 15 };
            this.renderSpacingLines(startPt, endPt, snapLine, this.getAdornerLayerSvg(), diagram.scroller.transform);
            for (i = 0; i < sameSizes.length; i++) {
                bounds = (sameSizes[parseInt(i.toString(), 10)].source).bounds;
                startPt = { x: bounds.x, y: bounds.y - 15 };
                endPt = { x: bounds.x + bounds.width, y: bounds.y - 15 };
                this.renderSpacingLines(startPt, endPt, snapLine, this.getAdornerLayerSvg(), diagram.scroller.transform);
            }
        }
        horizontalSnap.offset = target.offset;
        horizontalSnap.snapped = true;
    };
    //To add same height lines
    Snapping.prototype.addSameHeightLines = function (diagram, snapLine, sameHeights, verticalSnap, ended, shape) {
        this.sortByDistance(sameHeights, 'offset');
        var bounds = getBounds(shape.wrapper);
        var target = sameHeights[0];
        var targetBounds = (target.source).bounds;
        var start;
        var end;
        var sameSizes = [];
        sameSizes.push(sameHeights[0]);
        var i;
        var crntbounds;
        for (i = 0; i < sameHeights.length; i++) {
            crntbounds = (sameHeights[parseInt(i.toString(), 10)].source).bounds;
            if (crntbounds.height === targetBounds.height) {
                sameSizes.push(sameHeights[parseInt(i.toString(), 10)]);
            }
        }
        if (!ended) {
            start = { x: bounds.x + bounds.width + 15, y: bounds.y + target.offset };
            end = { x: bounds.x + bounds.width + 15, y: bounds.y + target.offset + bounds.height };
            this.renderSpacingLines(start, end, snapLine, this.getAdornerLayerSvg(), diagram.scroller.transform);
            for (i = 0; i < sameSizes.length; i++) {
                bounds = (sameSizes[parseInt(i.toString(), 10)].source).bounds;
                start = { x: bounds.x + bounds.width + 15, y: bounds.y };
                end = { x: bounds.x + bounds.width + 15, y: bounds.y + bounds.height };
                this.renderSpacingLines(start, end, snapLine, this.getAdornerLayerSvg(), diagram.scroller.transform);
            }
        }
        verticalSnap.offset = target.offset;
        verticalSnap.snapped = true;
    };
    //Render spacing lines
    Snapping.prototype.renderSpacingLines = function (start, end, snapLine, svg, transform) {
        var d;
        var d1;
        var line1;
        var element = new PathElement();
        var options = {};
        start = {
            x: (start.x + transform.tx) * transform.scale,
            y: (start.y + transform.ty) * transform.scale
        };
        end = {
            x: (end.x + transform.tx) * transform.scale,
            y: (end.y + transform.ty) * transform.scale
        };
        if (start.x === end.x) {
            d = 'M' + (start.x - 5) + ' ' + (start.y + 5) + 'L' + start.x + ' ' + start.y +
                'L' + (start.x + 5) + ' ' + (start.y + 5) + 'z' + 'M' + (end.x - 5) + ' ' +
                (end.y - 5) + ' L' + end.x + ' ' + end.y + ' L' +
                (end.x + 5) + ' ' + (end.y - 5) + 'z';
            line1 = {
                startPoint: { x: start.x - 8, y: start.y - 1 },
                endPoint: { x: start.x + 8, y: start.y - 1 },
                stroke: this.setSnapLineColor(),
                strokeWidth: 1, fill: this.setSnapLineColor(), dashArray: '', width: 1, x: 0, y: 0, height: 0, angle: 0, pivotX: 0,
                pivotY: 0, visible: true, opacity: 1, id: randomId()
            };
            element.data = d;
            options.data = element.data;
            options.angle = 0;
            options.pivotX = 0;
            options.pivotY = 0;
            options.x = 0;
            options.y = 0;
            options.height = 0;
            options.width = 1;
            options.id = randomId();
            this.diagram.diagramRenderer.drawPath(snapLine, options);
            this.line.push(line1);
            this.diagram.diagramRenderer.drawLine(snapLine, this.line.pop());
            line1 = {
                startPoint: { x: end.x - 8, y: end.y + 1 },
                endPoint: { x: end.x + 8, y: end.y + 1 },
                stroke: this.setSnapLineColor(),
                strokeWidth: 1, fill: this.setSnapLineColor(), dashArray: '', width: 1, x: 0, y: 0, height: 0, angle: 0, pivotX: 0,
                pivotY: 0, visible: true, opacity: 1, id: this.getAdornerLayerSvg().id + 'spacing'
            };
            this.line.push(line1);
            this.diagram.diagramRenderer.drawLine(snapLine, this.line.pop());
        }
        else {
            d = 'M' + (start.x + 5) + ' ' + (start.y + 5) + ' L' + start.x + ' ' + start.y +
                ' L' + (start.x + 5) + ' ' + (start.y - 5) + 'z' + 'M' + (end.x - 5) + ' ' +
                (end.y - 5) + ' L' + end.x + ' ' + end.y +
                ' L' + (end.x - 5) + ' ' + (end.y + 5) + 'z';
            element.data = d;
            options.data = d;
            options.angle = 0;
            options.pivotX = 0;
            options.pivotY = 0;
            options.x = 0;
            options.y = 0;
            options.height = 0;
            options.width = 1;
            options.id = randomId();
            this.diagram.diagramRenderer.drawPath(snapLine, options);
            line1 = {
                visible: true, opacity: 1, id: randomId(),
                startPoint: { x: start.x - 1, y: start.y - 8 },
                endPoint: { x: start.x - 1, y: start.y + 8 },
                stroke: this.setSnapLineColor(),
                strokeWidth: 1, fill: this.setSnapLineColor(), dashArray: '0', width: 1, x: 0, y: 0, height: 0, angle: 0, pivotX: 0,
                pivotY: 0
            };
            this.line.push(line1);
            this.diagram.diagramRenderer.drawLine(snapLine, this.line.pop());
            line1 = {
                width: 1, x: 0, y: 0, height: 0, angle: 0, pivotX: 0,
                pivotY: 0, visible: true, opacity: 1, id: randomId(),
                startPoint: { x: end.x + 1, y: end.y - 8 },
                endPoint: { x: end.x + 1, y: end.y + 8 },
                stroke: this.setSnapLineColor(),
                strokeWidth: 1, fill: this.setSnapLineColor(), dashArray: '0'
            };
            this.line.push(line1);
            this.diagram.diagramRenderer.drawLine(snapLine, this.line.pop());
        }
        line1 = {
            startPoint: { x: start.x, y: start.y },
            endPoint: { x: end.x, y: end.y }, stroke: this.setSnapLineColor(), strokeWidth: 1, fill: this.setSnapLineColor(),
            dashArray: '0', width: 1, x: 0, y: 0, height: 0, angle: 0, pivotX: 0,
            pivotY: 0, visible: true, opacity: 1, id: randomId()
        };
        this.line.push(line1);
        this.diagram.diagramRenderer.drawLine(snapLine, this.line.pop());
    };
    /**
     * To Create Snap object with position, initial bounds, and final bounds \
     *
     * @returns {  void }  To Create Snap object with position, initial bounds, and final bounds .\
     * @param {Diagram} targetBounds - provide the targetBounds value.
     * @param {Rect} bounds - provide the angle value.
     * @param {string} snap - provide the angle value.
     * @private
     */
    Snapping.prototype.createSnapObject = function (targetBounds, bounds, snap) {
        var snapObject;
        switch (snap) {
            case 'left':
                snapObject = {
                    start: { x: (targetBounds.x), y: Math.min(targetBounds.y, bounds.y) },
                    end: { x: (targetBounds.x), y: Math.max(targetBounds.y + targetBounds.height, bounds.y + bounds.height) },
                    offsetX: targetBounds.x - bounds.x, offsetY: 0, type: 'sideAlign'
                };
                break;
            case 'right':
                snapObject = {
                    type: 'sideAlign',
                    start: { x: (targetBounds.x + targetBounds.width), y: Math.min(targetBounds.y, bounds.y) },
                    offsetX: targetBounds.x + targetBounds.width - bounds.x - bounds.width,
                    offsetY: 0,
                    end: {
                        x: (targetBounds.x + targetBounds.width),
                        y: Math.max(targetBounds.y + targetBounds.height, bounds.y + bounds.height)
                    }
                };
                break;
            case 'top':
                snapObject = {
                    offsetY: targetBounds.y - bounds.y, offsetX: 0, type: 'sideAlign',
                    start: { x: (Math.min(targetBounds.x, bounds.x)), y: targetBounds.y },
                    end: { x: (Math.max(targetBounds.x + targetBounds.width, bounds.x + bounds.width)), y: targetBounds.y }
                };
                break;
            case 'bottom':
                snapObject = {
                    type: 'sideAlign', offsetY: targetBounds.y + targetBounds.height - bounds.y - bounds.height, offsetX: 0,
                    end: {
                        x: (Math.max(targetBounds.x + targetBounds.width, bounds.x + bounds.width)),
                        y: targetBounds.y + targetBounds.height
                    },
                    start: { x: (Math.min(targetBounds.x, bounds.x)), y: targetBounds.y + targetBounds.height }
                };
                break;
            case 'topBottom':
                snapObject = {
                    start: { x: (Math.min(targetBounds.x, bounds.x)), y: targetBounds.y + targetBounds.height },
                    end: {
                        x: (Math.max(targetBounds.x + targetBounds.width, bounds.x + bounds.width)),
                        y: targetBounds.y + targetBounds.height
                    },
                    offsetY: targetBounds.y + targetBounds.height - bounds.y, offsetX: 0, type: 'sideAlign'
                };
                break;
            case 'bottomTop':
                snapObject = {
                    start: { x: (Math.min(targetBounds.x, bounds.x)), y: targetBounds.y },
                    end: { x: (Math.max(targetBounds.x + targetBounds.width, bounds.x + bounds.width)), y: targetBounds.y },
                    offsetY: targetBounds.y - bounds.y - bounds.height, offsetX: 0, type: 'sideAlign'
                };
                break;
            case 'leftRight':
                snapObject = {
                    start: { x: (targetBounds.x + targetBounds.width), y: Math.min(targetBounds.y, bounds.y) },
                    end: {
                        x: (targetBounds.x + targetBounds.width),
                        y: Math.max(targetBounds.y + targetBounds.height, bounds.y + bounds.height)
                    },
                    offsetX: targetBounds.x + targetBounds.width - bounds.x, offsetY: 0, type: 'sideAlign'
                };
                break;
            case 'rightLeft':
                snapObject = {
                    start: { x: (targetBounds.x), y: (Math.min(targetBounds.y, bounds.y)) },
                    end: { x: (targetBounds.x), y: Math.max(targetBounds.y + targetBounds.height, bounds.y + bounds.height) },
                    offsetX: targetBounds.x - bounds.x - bounds.width, offsetY: 0, type: 'sideAlign'
                };
                break;
            case 'centerX':
                snapObject = {
                    start: { x: (targetBounds.x + targetBounds.width / 2), y: (Math.min(targetBounds.y, bounds.y)) },
                    end: {
                        x: (targetBounds.x + targetBounds.width / 2),
                        y: Math.max(targetBounds.y + targetBounds.height, bounds.y + bounds.height)
                    },
                    offsetX: targetBounds.x + targetBounds.width / 2 - (bounds.x + bounds.width / 2), offsetY: 0, type: 'centerAlign'
                };
                break;
            case 'centerY':
                snapObject = {
                    start: { x: (Math.min(targetBounds.x, bounds.x)), y: targetBounds.y + targetBounds.height / 2 },
                    end: {
                        x: (Math.max(targetBounds.x + targetBounds.width, bounds.x + bounds.width)),
                        y: targetBounds.y + targetBounds.height / 2
                    },
                    offsetY: targetBounds.y + targetBounds.height / 2 - (bounds.y + bounds.height / 2), offsetX: 0, type: 'centerAlign'
                };
                break;
        }
        return snapObject;
    };
    /**
     *  Calculate the snap angle \
     *
     * @returns {  void }  Calculate the snap angle .\
     * @param {Diagram} diagram - provide the diagram value.
     * @param {number} angle - provide the angle value.
     * @private
     */
    Snapping.prototype.snapAngle = function (diagram, angle) {
        var snapSettings = this.diagram.snapSettings;
        var snapAngle = snapSettings.snapAngle;
        var width = angle % (snapAngle || 0);
        if (width >= (snapAngle / 2)) {
            return angle + snapAngle - width;
        }
        else {
            return angle - width;
        }
    };
    //Check whether the node to be snapped or not.
    Snapping.prototype.canConsider = function (nameTable, selectedObject, target) {
        var consider = false;
        if (this.diagram.selectedItems.nodes.length && this.diagram.selectedItems.nodes[0].id === target.id) {
            return false;
        }
        else {
            return true;
        }
    };
    //Find the total number of nodes in diagram using SpatialSearch
    Snapping.prototype.findNodes = function (spatialSearch, node, child, viewPort, nodesInView) {
        var nodes = [];
        var nd;
        var bounds;
        var quads = spatialSearch.findQuads(nodesInView ? viewPort : child);
        for (var i = 0; i < quads.length; i++) {
            var quad = quads[parseInt(i.toString(), 10)];
            if (quad.objects.length > 0) {
                for (var j = 0; j < quad.objects.length; j++) {
                    nd = quad.objects[parseInt(j.toString(), 10)];
                    if (!(this.diagram.nameTable[nd.id] instanceof Connector) && nd.visible
                        && !(this.diagram.nameTable[nd.id].shape.type === 'SwimLane') && !(this.diagram.nameTable[nd.id].isLane) &&
                        !(this.diagram.nameTable[nd.id].isPhase) && !(this.diagram.nameTable[nd.id].isHeader) && nd.id !== 'helper') {
                        bounds = getBounds(nd);
                        if (nodes.indexOf(nd) === -1 && this.intersectsRect(child, bounds)) {
                            nodes.push(nd);
                        }
                        if (nodesInView && nodesInView.indexOf(nd) && this.intersectsRect(viewPort, bounds)) {
                            nodesInView.push(nd);
                        }
                    }
                }
            }
        }
        return nodes;
    };
    Snapping.prototype.intersectsRect = function (child, bounds) {
        return ((((bounds.x < (child.x + child.width)) && (child.x < (bounds.x + bounds.width)))
            && (bounds.y < (child.y + child.height))) && (child.y < (bounds.y + bounds.height)));
    };
    Snapping.prototype.getAdornerLayerSvg = function () {
        return this.diagram.diagramRenderer.adornerSvgLayer;
    };
    /**
     *  To remove grid lines on mouse move and mouse up \
     *
     * @returns {  void }  To remove grid lines on mouse move and mouse up .\
     * @param {Diagram} diagram - provide the source value.
     * @private
     */
    Snapping.prototype.removeGuidelines = function (diagram) {
        var selectionRect = this.getAdornerLayerSvg().getElementById('_SnappingLines');
        var line = this.getAdornerLayerSvg().getElementById('pivotLine');
        if (selectionRect) {
            selectionRect.parentNode.removeChild(selectionRect);
        }
        if (line) {
            line.parentNode.removeChild(line);
        }
    };
    //Sort the objects by its distance
    Snapping.prototype.sortByDistance = function (obj, value, ascending) {
        var i;
        var j;
        var temp;
        if (ascending) {
            for (i = 0; i < obj.length; i++) {
                for (j = i + 1; j < obj.length; j++) {
                    if (obj[parseInt(i.toString(), 10)]["" + value] > obj[parseInt(j.toString(), 10)]["" + value]) {
                        temp = obj[parseInt(i.toString(), 10)];
                        obj[parseInt(i.toString(), 10)] = obj[parseInt(j.toString(), 10)];
                        obj[parseInt(j.toString(), 10)] = temp;
                    }
                }
            }
        }
        else {
            for (i = 0; i < obj.length; i++) {
                for (j = i + 1; j < obj.length; j++) {
                    if (obj[parseInt(i.toString(), 10)]["" + value] < obj[parseInt(j.toString(), 10)]["" + value]) {
                        temp = obj[parseInt(i.toString(), 10)];
                        obj[parseInt(i.toString(), 10)] = obj[parseInt(j.toString(), 10)];
                        obj[parseInt(j.toString(), 10)] = temp;
                    }
                }
            }
        }
    };
    //To find nodes that are equally placed at left of the selected node
    Snapping.prototype.findEquallySpacedNodesAtLeft = function (objectsAtLeft, equalDistance, top, equallySpaced) {
        var prevBounds;
        var targetBounds;
        var dist;
        var i;
        for (i = 1; i < objectsAtLeft.length; i++) {
            prevBounds = ((objectsAtLeft[i - 1].obj).bounds);
            targetBounds = ((objectsAtLeft[parseInt(i.toString(), 10)].obj).bounds);
            dist = prevBounds.x - targetBounds.x - targetBounds.width;
            if (Math.abs(dist - equalDistance) <= 1) {
                equallySpaced[equallySpaced.length] = objectsAtLeft[parseInt(i.toString(), 10)];
                if (targetBounds.y < top) {
                    top = targetBounds.y;
                }
            }
            else {
                break;
            }
        }
        return top;
    };
    //To find nodes that are equally placed at right of the selected node
    Snapping.prototype.findEquallySpacedNodesAtRight = function (objectsAtRight, equalDistance, top, equallySpaced, snapObjDistance) {
        var actualDistance = objectsAtRight[0].distance;
        var target;
        var targetBounds;
        var prevBounds;
        var dist;
        if (Math.abs(equalDistance - actualDistance) <= snapObjDistance) {
            for (var i = 0; i < objectsAtRight.length - 1; i++) {
                target = objectsAtRight[parseInt(i.toString(), 10)].obj;
                targetBounds = ((objectsAtRight[i + 1].obj).bounds);
                prevBounds = (target.bounds);
                dist = targetBounds.x - prevBounds.x - prevBounds.width;
                if (Math.abs(dist - equalDistance) <= 1) {
                    equallySpaced[equallySpaced.length] = objectsAtRight[i + 1];
                    if (prevBounds.y < top) {
                        top = prevBounds.y;
                    }
                }
                else {
                    break;
                }
            }
        }
        return top;
    };
    Snapping.prototype.findEquallySpacedNodesAtTop = function (objectsAtTop, equalDistance, right, equallySpaced) {
        var prevBounds;
        var targetBounds;
        var dist;
        for (var i = 1; i < objectsAtTop.length; i++) {
            prevBounds = ((objectsAtTop[i - 1].obj).bounds);
            targetBounds = ((objectsAtTop[parseInt(i.toString(), 10)].obj).bounds);
            dist = prevBounds.y - targetBounds.y - targetBounds.height;
            if (Math.abs(dist - equalDistance) <= 1) {
                equallySpaced[equallySpaced.length] = objectsAtTop[parseInt(i.toString(), 10)];
                if (targetBounds.x + targetBounds.width > right) {
                    right = targetBounds.x + targetBounds.width;
                }
            }
            else {
                break;
            }
        }
        return right;
    };
    //To find nodes that are equally placed at bottom of the selected node
    Snapping.prototype.findEquallySpacedNodesAtBottom = function (objectsAtBottom, equalDistance, right, equallySpaced, snapObjDistance) {
        var actualDistance = objectsAtBottom[0].distance;
        var target;
        var targetBounds;
        var prevBounds;
        var dist;
        if (Math.abs(equalDistance - actualDistance) <= snapObjDistance) {
            for (var i = 0; i < objectsAtBottom.length - 1; i++) {
                target = objectsAtBottom[parseInt(i.toString(), 10)].obj;
                targetBounds = ((objectsAtBottom[i + 1].obj).bounds);
                prevBounds = (target.bounds);
                dist = targetBounds.y - prevBounds.y - prevBounds.height;
                if (Math.abs(dist - equalDistance) <= 1) {
                    equallySpaced[equallySpaced.length] = objectsAtBottom[i + 1];
                    if (prevBounds.x + prevBounds.width > right) {
                        right = prevBounds.x + prevBounds.width;
                    }
                }
                else {
                    break;
                }
            }
        }
        return right;
    };
    /**
     * To get Adoner layer to draw snapLine
     *
     * @private
     */
    Snapping.prototype.getLayer = function () {
        var snapLine;
        if (this.diagram.snapSettings.constraints & SnapConstraints.SnapToObject) {
            snapLine = document.createElementNS('http://www.w3.org/2000/svg', 'g');
            snapLine.setAttribute('id', '_SnappingLines');
            snapLine.setAttribute('shapeRendering', 'crispEdges');
            this.getAdornerLayerSvg().appendChild(snapLine);
        }
        return snapLine;
    };
    /**
     * Constructor for the snapping module
     *
     * @private
     */
    // constructor() {
    //     //constructs the snapping module
    // }
    /**
     *To destroy the ruler
     *
     * @returns {void} To destroy the ruler
     */
    Snapping.prototype.destroy = function () {
        /**
         * Destroys the snapping module
         */
    };
    /**
     * Core method to return the component name.
     *
     * @returns {string}  Core method to return the component name.
     * @private
     */
    Snapping.prototype.getModuleName = function () {
        /**
         * Returns the module name
         */
        return 'Snapping';
    };
    return Snapping;
}());
export { Snapping };
