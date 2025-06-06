import { Rect } from '../primitives/rect';
import { RealAction, ScrollActions } from '../enum/enum';
import { identityMatrix, scaleMatrix, translateMatrix, transformPointByMatrix, multiplyMatrix } from '../primitives/matrix';
import { updateRuler } from '../ruler/ruler';
import { canZoom, canPan, canVitualize } from './../utility/constraints-util';
/**
 */
var DiagramScroller = /** @class */ (function () {
    function DiagramScroller(diagram) {
        /** @private */
        this.transform = { tx: 0, ty: 0, scale: 1 };
        /**   @private  */
        this.oldCollectionObjects = [];
        /**   @private  */
        this.removeCollection = [];
        this.vPortWidth = 0;
        this.vPortHeight = 0;
        this.currentZoomFActor = 1;
        this.hOffset = 0;
        this.vOffset = 0;
        this.scrolled = false;
        this.hScrollSize = 0;
        this.vScrollSize = 0;
        this.diagram = diagram;
        this.objects = [];
        this.transform = diagram.scroller ? diagram.scroller.transform : { tx: 0, ty: 0, scale: 1 };
        this.vPortWidth = diagram.scrollSettings.viewPortWidth;
        this.vPortHeight = diagram.scrollSettings.viewPortHeight;
        this.currentZoomFActor = diagram.scrollSettings.currentZoom;
        this.hOffset = diagram.scrollSettings.horizontalOffset;
        this.vOffset = diagram.scrollSettings.verticalOffset;
    }
    Object.defineProperty(DiagramScroller.prototype, "viewPortHeight", {
        /**
         * verticalOffset method \
         *
         * @returns { number }     verticalOffset method .\
         *
         * @private
         */
        get: function () {
            return this.vPortHeight;
        },
        /**
         * verticalOffset method \
         *
         * @returns { void }     verticalOffset method .\
         * @param {number} offset - provide the hOffset value.
         *
         * @private
         */
        set: function (offset) {
            this.vPortHeight = offset;
            this.diagram.scrollSettings.viewPortHeight = offset;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DiagramScroller.prototype, "currentZoom", {
        /**
         * verticalOffset method \
         *
         * @returns { number }     verticalOffset method .\
         *
         * @private
         */
        get: function () {
            return this.currentZoomFActor || 1;
        },
        /**
         * verticalOffset method \
         *
         * @returns { void }     verticalOffset method .\
         * @param {number} offset - provide the hOffset value.
         *
         * @private
         */
        set: function (offset) {
            this.currentZoomFActor = offset;
            this.diagram.scrollSettings.currentZoom = offset;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DiagramScroller.prototype, "viewPortWidth", {
        /**
         * verticalOffset method \
         *
         * @returns { number }     verticalOffset method .\
         *
         * @private
         */
        get: function () {
            return this.vPortWidth;
        },
        /**
         * verticalOffset method \
         *
         * @returns { void }     verticalOffset method .\
         * @param {number} offset - provide the hOffset value.
         *
         * @private
         */
        set: function (offset) {
            this.vPortWidth = offset;
            this.diagram.scrollSettings.viewPortWidth = offset;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DiagramScroller.prototype, "horizontalOffset", {
        /**
         * verticalOffset method \
         *
         * @returns { number }     verticalOffset method .\
         *
         * @private
         */
        get: function () {
            return this.hOffset;
        },
        /**
         * verticalOffset method \
         *
         * @returns { void }     verticalOffset method .\
         * @param {number} offset - provide the hOffset value.
         *
         * @private
         */
        set: function (offset) {
            this.hOffset = offset;
            if (Math.abs(this.hOffset - this.diagram.scrollSettings.horizontalOffset) > 1) {
                this.diagram.realActions = this.diagram.realActions | RealAction.hScrollbarMoved;
                this.scrolled = true;
            }
            this.diagram.scrollSettings.horizontalOffset = offset;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DiagramScroller.prototype, "verticalOffset", {
        /**
         * verticalOffset method \
         *
         * @returns { number }     verticalOffset method .\
         *
         * @private
         */
        get: function () {
            return this.vOffset;
        },
        /**
         * verticalOffset method \
         *
         * @returns { void }     verticalOffset method .\
         * @param {number} offset - provide the hOffset value.
         *
         * @private
         */
        set: function (offset) {
            this.vOffset = offset;
            if (Math.abs(this.vOffset - this.diagram.scrollSettings.verticalOffset) > 1) {
                this.diagram.realActions = this.diagram.realActions | RealAction.vScrollbarMoved;
                this.scrolled = true;
            }
            this.diagram.scrollSettings.verticalOffset = offset;
        },
        enumerable: true,
        configurable: true
    });
    // Method added to get bounds value if diagram is loaded from negative axis.
    // SF-359118 implemented for this ticket requirement.
    DiagramScroller.prototype.getBounds = function () {
        var pageBounds;
        var postion = this.diagram.spatialSearch.getPageBounds(0, 0);
        if ((postion.x < 0 || postion.y < 0) && !this.diagram.pageSettings.multiplePage) {
            pageBounds = this.getPageBounds(undefined, undefined, true, true);
        }
        else {
            pageBounds = this.getPageBounds(undefined, undefined, true);
        }
        return pageBounds;
    };
    /**
     * updateScrollOffsets method \
     *
     * @returns { void }     updateScrollOffsets method .\
     * @param {number} hOffset - provide the hOffset value.
     * @param {number} vOffset - provide the vOffset value.
     *
     * @private
     */
    DiagramScroller.prototype.updateScrollOffsets = function (hOffset, vOffset) {
        var offsetX = 0;
        var offsetY = 0;
        var pageBounds = this.getBounds();
        pageBounds.x *= this.currentZoom;
        pageBounds.y *= this.currentZoom;
        pageBounds.width *= this.currentZoom;
        pageBounds.height *= this.currentZoom;
        offsetX = Math.max(0, hOffset - pageBounds.left);
        offsetY = Math.max(0, vOffset - pageBounds.top);
        if (hOffset !== undefined && vOffset !== undefined) {
            this.horizontalOffset = offsetX;
            this.verticalOffset = offsetY;
            this.diagram.setOffset(offsetX, offsetY);
        }
        else {
            this.diagram.setOffset(-this.horizontalOffset - pageBounds.x, -this.verticalOffset - pageBounds.y);
        }
        this.transform = {
            tx: Math.max(this.horizontalOffset, -pageBounds.left) / this.currentZoom, ty: Math.max(this.verticalOffset, -pageBounds.top) / this.currentZoom,
            scale: this.currentZoom
        };
    };
    /**
     * setScrollOffset method \
     *
     * @returns { void }     setScrollOffset method .\
     * @param {number} hOffset - provide the hOffset value.
     * @param {number} vOffset - provide the vOffset value.
     *
     * @private
     */
    DiagramScroller.prototype.setScrollOffset = function (hOffset, vOffset) {
        this.scrolled = false;
        var pageBounds = this.getBounds();
        pageBounds.x *= this.currentZoom;
        pageBounds.y *= this.currentZoom;
        pageBounds.width *= this.currentZoom;
        pageBounds.height *= this.currentZoom;
        var x = -pageBounds.left;
        var y = -pageBounds.top;
        var set = false;
        var viewWidth = this.viewPortWidth * this.currentZoom;
        var viewHeight = this.viewPortHeight * this.currentZoom;
        var newX = x - hOffset;
        if (newX !== this.horizontalOffset) {
            if (x < this.horizontalOffset) {
                if (this.horizontalOffset > newX) {
                    this.horizontalOffset -= hOffset;
                }
                else {
                    this.horizontalOffset = newX;
                }
                set = true;
            }
            var right = Math.max(pageBounds.right + this.vScrollSize, viewWidth);
            if (!set && right < -newX + this.viewPortWidth) {
                var actualRight = -newX + viewWidth - this.vScrollSize;
                var currentRight = -this.horizontalOffset + viewWidth - this.vScrollSize;
                if (actualRight < currentRight) {
                    //define
                    this.horizontalOffset = newX;
                }
                else {
                    if (actualRight - pageBounds.right > actualRight - currentRight) {
                        this.horizontalOffset = newX;
                    }
                    else {
                        this.horizontalOffset = -(pageBounds.right + this.vScrollSize - viewWidth);
                    }
                }
                set = true;
            }
            if (!set) {
                this.horizontalOffset = x - hOffset;
            }
        }
        set = false;
        //vertical offset
        var newY = y - vOffset;
        if (newY !== this.verticalOffset) {
            if (y < this.verticalOffset) {
                if (this.verticalOffset > newY) {
                    this.verticalOffset -= vOffset;
                }
                else {
                    this.verticalOffset = newY;
                }
                set = true;
            }
            var bottom = Math.max(pageBounds.bottom + this.hScrollSize, viewHeight);
            if (!set && bottom < -newY + viewHeight) {
                var actualBottom = -newY + viewHeight - this.hScrollSize;
                var currentBottom = -this.verticalOffset + viewHeight - this.hScrollSize;
                if (actualBottom < currentBottom) {
                    //define
                    this.verticalOffset = newY;
                }
                else {
                    if (actualBottom - pageBounds.bottom > actualBottom - currentBottom) {
                        this.verticalOffset = newY;
                    }
                    else {
                        this.verticalOffset = -(pageBounds.bottom + this.hScrollSize - viewHeight);
                    }
                }
                set = true;
            }
            if (!set) {
                this.verticalOffset = y - vOffset;
            }
        }
        this.transform = {
            tx: Math.max(this.horizontalOffset, -pageBounds.left) / this.currentZoom, ty: Math.max(this.verticalOffset, -pageBounds.top) / this.currentZoom,
            scale: this.currentZoom
        };
        this.setSize();
    };
    /**
     * getObjects \
     *
     * @returns { string[] }     To get page pageBounds.\
     * @param {string[]} coll1 - provide the source value.
     * @param {string[]} coll2 - provide the source value.
     * @private
     */
    DiagramScroller.prototype.getObjects = function (coll1, coll2) {
        var objects = [];
        for (var i = 0; i < coll1.length; i++) {
            var isExist = false;
            for (var j = 0; j < coll2.length; j++) {
                if (coll1[parseInt(i.toString(), 10)] === coll2[parseInt(j.toString(), 10)]) {
                    isExist = true;
                    break;
                }
            }
            if (!isExist) {
                objects.push(coll1[parseInt(i.toString(), 10)]);
            }
        }
        return objects;
    };
    /**
     * virtualizeElements \
     *
     * @returns { void }     To get page pageBounds.\
     *
     * @private
     */
    DiagramScroller.prototype.virtualizeElements = function () {
        var viewWidth = this.viewPortWidth / this.currentZoom;
        var viewHeight = this.viewPortHeight / this.currentZoom;
        var oObjects = this.diagram.spatialSearch.findObjects(new Rect(-this.horizontalOffset / this.currentZoom, -this.verticalOffset / this.currentZoom, viewWidth, viewHeight));
        var oObjectsID = [];
        var renderOrder = [];
        for (var j = 0; j < oObjects.length; j++) {
            var bpmnShape = oObjects[parseInt(j.toString(), 10)].shape;
            if (bpmnShape.type === 'Bpmn' && bpmnShape && bpmnShape.activity && bpmnShape.activity.subProcess && bpmnShape.activity.subProcess.processes && bpmnShape.activity.subProcess.processes.length > 0) {
                for (var k = 0; k < bpmnShape.activity.subProcess.processes.length; k++) {
                    renderOrder.push(bpmnShape.activity.subProcess.processes[parseInt(k.toString(), 10)]);
                }
                renderOrder.push(oObjects[parseInt(j.toString(), 10)].id);
            }
            else if (oObjects[parseInt(j.toString(), 10)].processId === '' || oObjects[parseInt(j.toString(), 10)].processId === undefined) {
                renderOrder.push(oObjects[parseInt(j.toString(), 10)].id);
            }
        }
        oObjectsID = renderOrder;
        var zindexOrder = [];
        for (var j = 0; j < oObjects.length; j++) {
            var items = oObjects[parseInt(j.toString(), 10)].shape;
            if (items.type === 'Bpmn' && items && items.activity && items.activity.subProcess && items.activity.subProcess.processes && items.activity.subProcess.processes.length > 0) {
                zindexOrder.push(oObjects[parseInt(j.toString(), 10)].id);
                for (var t = 0; t < items.activity.subProcess.processes.length; t++) {
                    zindexOrder.push(items.activity.subProcess.processes[parseInt(t.toString(), 10)]);
                }
            }
            else if (oObjects[parseInt(j.toString(), 10)].processId === '' || oObjects[parseInt(j.toString(), 10)].processId === undefined) {
                zindexOrder.push(oObjects[parseInt(j.toString(), 10)].id);
            }
        }
        for (var j = 0; j < oObjects.length; j++) {
            for (var k = 0; k < zindexOrder.length; k++) {
                if (oObjects[parseInt(j.toString(), 10)].id === zindexOrder[parseInt(k.toString(), 10)]) {
                    oObjects[parseInt(j.toString(), 10)].zIndex = k;
                    break;
                }
            }
        }
        var newObjects = this.getObjects(oObjectsID, this.oldCollectionObjects);
        if (this.oldCollectionObjects.length === 0) {
            this.oldCollectionObjects = oObjectsID;
        }
        var removeObjects = this.getObjects(this.oldCollectionObjects, oObjectsID);
        this.diagram.updateVirtualObjects(newObjects, false, removeObjects);
        this.oldCollectionObjects = oObjectsID;
    };
    /**
     * setSize \
     *
     * @returns { void }     To get page pageBounds.\
     * @param {PointModel} newOffset - provide the newOffset value.
     *
     * @private
     */
    DiagramScroller.prototype.setSize = function (newOffset) {
        var pageBounds = this.getPageBounds(undefined, undefined, true);
        pageBounds.x *= this.currentZoom;
        pageBounds.y *= this.currentZoom;
        pageBounds.width *= this.currentZoom;
        pageBounds.height *= this.currentZoom;
        var x = Math.min(pageBounds.x, -this.horizontalOffset);
        var y = Math.min(pageBounds.y, -this.verticalOffset);
        var difX = -this.horizontalOffset + this.viewPortWidth - pageBounds.right;
        var difY = -this.verticalOffset + this.viewPortHeight - pageBounds.bottom;
        var hScrollSize = this.scrollerWidth;
        var vScrollSize = this.scrollerWidth;
        if (-this.verticalOffset <= pageBounds.y && -this.verticalOffset + this.viewPortHeight >= pageBounds.bottom) {
            vScrollSize = 0;
        }
        if (-this.horizontalOffset <= pageBounds.x && -this.horizontalOffset + this.viewPortWidth >= pageBounds.right) {
            hScrollSize = 0;
        }
        this.hScrollSize = hScrollSize;
        this.vScrollSize = vScrollSize;
        var oldWidth = this.diagramWidth;
        var oldHeight = this.diagramHeight;
        this.diagramWidth = Math.max(pageBounds.right, -this.horizontalOffset + this.viewPortWidth - vScrollSize) - x;
        this.diagramHeight = Math.max(pageBounds.bottom, -this.verticalOffset + this.viewPortHeight - hScrollSize) - y;
        if ((oldWidth !== this.diagramWidth || oldHeight !== this.diagramHeight) && this.diagram.scrollSettings.scrollLimit !== 'Diagram') {
            this.diagram.setSize(this.diagramWidth, this.diagramHeight);
        }
        if (this.diagram.scrollSettings.scrollLimit === 'Diagram') {
            if ((oldWidth !== this.diagramWidth || oldHeight !== this.diagramHeight || this.currentZoom !== 1)
                && ((!this.diagram.diagramActions || !newOffset) || (this.diagram.diagramActions && newOffset &&
                    ((this.verticalOffset !== 0 || this.verticalOffset === newOffset.y) &&
                        (this.horizontalOffset !== 0 || this.horizontalOffset === newOffset.x))))) {
                if ((this.diagram.scrollActions & ScrollActions.Interaction) && newOffset) {
                    this.transform = {
                        tx: Math.max(newOffset.x, -(pageBounds.left / this.currentZoom)) / this.currentZoom,
                        ty: Math.max(newOffset.y, -(pageBounds.top / this.currentZoom)) / this.currentZoom,
                        scale: this.currentZoom
                    };
                    this.horizontalOffset = newOffset.x;
                    this.verticalOffset = newOffset.y;
                }
                this.diagram.setSize(this.diagramWidth, this.diagramHeight);
                if ((!(this.diagram.scrollActions & ScrollActions.PropertyChange)) && newOffset) {
                    this.horizontalOffset = newOffset.x;
                    this.verticalOffset = newOffset.y;
                    this.transform = {
                        tx: Math.max(newOffset.x, -pageBounds.left) / this.currentZoom,
                        ty: Math.max(newOffset.y, -pageBounds.top) / this.currentZoom,
                        scale: this.currentZoom
                    };
                }
            }
            else if (newOffset && oldWidth === this.diagramWidth && oldHeight === this.diagramHeight &&
                ((this.diagram.diagramCanvas.scrollHeight > this.viewPortHeight &&
                    newOffset.y < 0 && this.horizontalOffset === newOffset.x && this.verticalOffset === 0) ||
                    (this.diagram.diagramCanvas.scrollWidth > this.viewPortWidth &&
                        newOffset.x < 0 && this.verticalOffset === newOffset.y && this.horizontalOffset === 0))) {
                this.verticalOffset = newOffset.y;
                this.horizontalOffset = newOffset.x;
                this.transform = {
                    tx: Math.max(newOffset.x, -pageBounds.left) / this.currentZoom,
                    ty: Math.max(newOffset.y, -pageBounds.top) / this.currentZoom,
                    scale: this.currentZoom
                };
            }
        }
        this.diagram.transformLayers();
        this.diagram.element.style.overflow = 'hidden';
    };
    /**
     * setViewPortSize \
     *
     * @returns { void }     To get page pageBounds.\
     * @param {number} width - provide the factor value.
     * @param {number} height - provide the factor value.
     *
     * @private
     */
    DiagramScroller.prototype.setViewPortSize = function (width, height) {
        this.viewPortWidth = width;
        this.viewPortHeight = height;
    };
    /**
     * To get page pageBounds \
     *
     * @returns { Rect }     To get page pageBounds.\
     * @param {boolean} boundingRect - provide the factor value.
     * @param {DiagramRegions} region - provide the factor value.
     * @param {boolean} hasPadding - provide the factor value.
     * @param {boolean} isnegativeRegion - provide the isnegativeRegion value.
     *
     * @private
     */
    DiagramScroller.prototype.getPageBounds = function (boundingRect, region, hasPadding, isnegativeRegion) {
        var rect = new Rect();
        var temp = 0;
        var pageBounds;
        if (region !== 'Content' && !isnegativeRegion && this.diagram.pageSettings.width !== null && this.diagram.pageSettings.height !== null) {
            var width = this.diagram.pageSettings.width;
            var height = this.diagram.pageSettings.height;
            var negwidth = 0;
            var negheight = 0;
            if (this.diagram.pageSettings.multiplePage) {
                rect = this.diagram.spatialSearch.getPageBounds(0, 0);
                if (rect.right > width) {
                    var x = Math.ceil(rect.right / width);
                    width = width * x;
                }
                if (rect.bottom > height) {
                    var x = Math.ceil(rect.bottom / height);
                    height = height * x;
                }
                if (rect.left < 0 && Math.abs(rect.left) > negwidth) {
                    var x = Math.ceil(Math.abs(rect.left) / this.diagram.pageSettings.width);
                    negwidth = this.diagram.pageSettings.width * x;
                }
                if (rect.top < 0 && Math.abs(rect.top) > negheight) {
                    var x = Math.ceil(Math.abs(rect.top) / this.diagram.pageSettings.height);
                    negheight = this.diagram.pageSettings.height * x;
                }
            }
            pageBounds = new Rect((-negwidth), (-negheight), width + negwidth, height + negheight);
        }
        else {
            var origin_1 = boundingRect ? undefined : 0;
            pageBounds = this.diagram.spatialSearch.getPageBounds(origin_1, origin_1);
        }
        if (hasPadding) {
            var scrollpadding = this.diagram.scrollSettings.padding;
            pageBounds.x -= scrollpadding.left;
            pageBounds.y -= scrollpadding.top;
            pageBounds.width += (scrollpadding.left + scrollpadding.right);
            pageBounds.height += (scrollpadding.top + scrollpadding.bottom);
        }
        return pageBounds;
    };
    /**
     * To get page break when PageBreak is set as true \
     *
     * @returns { Segment[] }     To get page break when PageBreak is set as true.\
     * @param {Rect} pageBounds - provide the factor value.
     *
     * @private
     */
    DiagramScroller.prototype.getPageBreak = function (pageBounds) {
        var i = 0;
        var j = 0;
        var v = -1;
        var collection = [];
        var x1 = 0;
        var x2 = 0;
        var y1 = 0;
        var y2 = 0;
        var left = this.diagram.pageSettings.margin.left;
        var right = this.diagram.pageSettings.margin.right;
        var top = this.diagram.pageSettings.margin.top;
        var bottom = this.diagram.pageSettings.margin.bottom;
        var widthCount = 1;
        var heightCount = 1;
        var segment = { x1: x1, y1: y1, x2: x2, y2: y2 };
        while (pageBounds.width > i) {
            i = i + (this.diagram.pageSettings.width ? this.diagram.pageSettings.width : pageBounds.width);
            if (i === this.diagram.pageSettings.width) {
                segment = {
                    x1: pageBounds.left + left, y1: pageBounds.top + top,
                    x2: pageBounds.left + left, y2: pageBounds.bottom - bottom
                };
                collection[++v] = segment;
            }
            if (i < pageBounds.width) {
                x1 = pageBounds.topLeft.x + this.diagram.pageSettings.width * widthCount;
                y1 = pageBounds.topLeft.y + top;
                x2 = pageBounds.bottomLeft.x + this.diagram.pageSettings.width * widthCount;
                y2 = pageBounds.bottomLeft.y - bottom;
                segment = { x1: x1, y1: y1, x2: x2, y2: y2 };
                collection[++v] = segment;
                widthCount++;
            }
            if (pageBounds.width === i) {
                segment = {
                    x1: pageBounds.right - right, y1: pageBounds.top + top,
                    x2: pageBounds.right - right, y2: pageBounds.bottom - bottom
                };
                collection[++v] = segment;
            }
        }
        while (pageBounds.height > j) {
            j = j + (this.diagram.pageSettings.height ? this.diagram.pageSettings.height : pageBounds.height);
            if (j === this.diagram.pageSettings.height) {
                segment = {
                    x1: pageBounds.left + left, y1: pageBounds.top + top,
                    x2: pageBounds.right - right, y2: pageBounds.top + top
                };
                collection[++v] = segment;
            }
            if (j < pageBounds.height) {
                x1 = pageBounds.topLeft.x + left;
                y1 = pageBounds.topLeft.y + this.diagram.pageSettings.height * heightCount;
                x2 = pageBounds.topRight.x - right;
                y2 = pageBounds.topRight.y + this.diagram.pageSettings.height * heightCount;
                segment = { x1: x1, y1: y1, x2: x2, y2: y2 };
                collection[++v] = segment;
                heightCount++;
            }
            if (pageBounds.height === j) {
                segment = {
                    x1: pageBounds.left + left, y1: pageBounds.bottom - bottom,
                    x2: pageBounds.right - right, y2: pageBounds.bottom - bottom
                };
                collection[++v] = segment;
            }
        }
        return collection;
    };
    /**
     * zoom method \
     *
     * @returns { void }     zoom method .\
     * @param {number} factor - provide the factor value.
     * @param {number} deltaX - provide the bounds value.
     * @param {number} deltaY - provide the bounds value.
     * @param {PointModel} focusPoint - provide the bounds value.
     * @param {boolean} isInteractiveZoomPan - provide the isInteractiveZoomPan value.
     * @param {boolean} isBringIntoView - provide the isBringIntoView value.
     * @param {boolean} isTrackpadScroll - provide the isTrackpadScroll value.
     * @param {boolean} canZoomOut - provide the canZoomOut value.
     *
     * @private
     */
    DiagramScroller.prototype.zoom = function (factor, deltaX, deltaY, focusPoint, isInteractiveZoomPan, isBringIntoView, isTrackpadScroll, canZoomOut) {
        if (canZoom(this.diagram) && factor !== 1 || (canPan(this.diagram) && factor === 1)) {
            var matrix = identityMatrix();
            scaleMatrix(matrix, this.currentZoom, this.currentZoom);
            translateMatrix(matrix, this.horizontalOffset, this.verticalOffset);
            focusPoint = focusPoint || {
                x: (this.viewPortWidth / 2 - this.horizontalOffset) / this.currentZoom,
                y: (this.viewPortHeight / 2 - this.verticalOffset) / this.currentZoom
            };
            focusPoint = transformPointByMatrix(matrix, focusPoint);
            //Bug 853566: Fit to page is not working when zoom value less than minZoom.
            // Removed minZoom calculation to call fitToPage even if currentZoom less than minZoom.
            if ((this.currentZoom * factor) <= this.diagram.scrollSettings.maxZoom &&
                ((this.currentZoom * factor) >= this.diagram.scrollSettings.minZoom || (canZoomOut || factor >= 1))) {
                this.currentZoom *= factor;
                var pageBounds = this.getPageBounds(undefined, undefined, true);
                pageBounds.x *= this.currentZoom;
                pageBounds.y *= this.currentZoom;
                //target Matrix
                var targetMatrix = identityMatrix();
                scaleMatrix(targetMatrix, factor, factor, focusPoint.x, focusPoint.y);
                translateMatrix(targetMatrix, deltaX || 0, deltaY || 0);
                multiplyMatrix(matrix, targetMatrix);
                var newOffset = transformPointByMatrix(matrix, { x: 0, y: 0 });
                if (factor === 1) {
                    // EJ2-69238 - add true as an extra parameter to calcuate the horizontal and vertical offset
                    newOffset = this.applyScrollLimit(newOffset.x, newOffset.y, isInteractiveZoomPan, isBringIntoView, isTrackpadScroll);
                }
                // Bug 829925: Scroll bar flickers on scrolling the diagram using touchpad.
                // The below condition is used to avoid the flickering of the scroll bar on scrolling the diagram using trackpad.
                isTrackpadScroll = (-(pageBounds.y) >= newOffset.y && -(pageBounds.x) >= newOffset.x && isTrackpadScroll);
                if ((this.diagram.scrollActions & ScrollActions.PropertyChange ||
                    !(this.diagram.scrollActions & ScrollActions.Interaction)) ||
                    this.diagram.scrollSettings.scrollLimit !== 'Diagram' || isTrackpadScroll) {
                    this.transform = {
                        tx: Math.max(newOffset.x, -pageBounds.left) / this.currentZoom,
                        ty: Math.max(newOffset.y, -pageBounds.top) / this.currentZoom,
                        scale: this.currentZoom
                    };
                    this.horizontalOffset = newOffset.x;
                    this.verticalOffset = newOffset.y;
                }
                this.setSize(newOffset);
                if (this.diagram.mode !== 'SVG' && canVitualize(this.diagram)) {
                    this.diagram.scroller.virtualizeElements();
                }
                if (this.diagram.mode !== 'SVG' && !canVitualize(this.diagram)) {
                    this.diagram.refreshDiagramLayer();
                }
                this.diagram.setOffset(-this.horizontalOffset - pageBounds.x, -this.verticalOffset - pageBounds.y);
                updateRuler(this.diagram);
                //Bug 863516: Overview is not synced with diagram content while zoom-out the diagram.
                //Updating overview after the page scrolled or zoomed.
                if (this.diagram.views && this.diagram.views.overview) {
                    var overview = this.diagram.views.overview;
                    var bounds = overview.scrollOverviewRect(overview.parent.scroller.horizontalOffset, overview.parent.scroller.verticalOffset, overview.parent.scroller.currentZoom, true);
                    overview.updateOverviewrect(-bounds.x, -bounds.y, bounds.width, bounds.height);
                    overview.updateView(overview);
                }
            }
        }
    };
    /**
     * fitToPage method \
     *
     * @returns { void }     fitToPage method .\
     * @param {IFitOptions} options - provide the bounds value.
     *
     * @private
     */
    DiagramScroller.prototype.fitToPage = function (options) {
        options = options || {};
        var mode = options.mode;
        var region = options.region;
        var margin = options.margin || {};
        var canZoomIn = options.canZoomIn;
        var customBounds = options.customBounds;
        // Allows fitToPage when the currentZoom less than minZoom.
        var canZoomOut = options.canZoomOut;
        margin.bottom = margin.bottom || 25;
        margin.top = margin.top || 25;
        margin.left = margin.left || 25;
        margin.right = margin.right || 25;
        var bounds = customBounds;
        var factor;
        var deltaX = -this.horizontalOffset;
        var deltaY = -this.verticalOffset;
        region = region ? region : 'PageSettings';
        //fit mode
        if ((region === 'PageSettings' && this.diagram.pageSettings.width && this.diagram.pageSettings.height)
            || (this.diagram.nodes.length > 0 || this.diagram.connectors.length > 0)) {
            mode = mode ? mode : 'Page';
            if (region !== 'CustomBounds') {
                bounds = this.getPageBounds(true, region, true);
            }
            var scale = { x: 0, y: 0 };
            //Bug 853566: Fit to page is not working when zoom value less than minZoom.
            // Resetting margin value if the margin value is greater than the viewport size to avoid scale value in negative.
            if ((margin.left + margin.right) > this.viewPortWidth) {
                if (this.viewPortWidth <= 100) {
                    margin.left = 5;
                    margin.right = 5;
                }
                else {
                    margin.left = 25;
                    margin.right = 25;
                }
            }
            if ((margin.top + margin.bottom) > this.viewPortHeight) {
                if (this.viewPortHeight <= 100) {
                    margin.top = 5;
                    margin.bottom = 5;
                }
                else {
                    margin.top = 25;
                    margin.bottom = 25;
                }
            }
            scale.x = (this.viewPortWidth - (margin.left + margin.right)) / (bounds.width);
            scale.y = (this.viewPortHeight - (margin.top + margin.bottom)) / (bounds.height);
            if (!canZoomIn && (((bounds.width - this.horizontalOffset) < this.viewPortWidth) &&
                (bounds.height - this.verticalOffset) < this.viewPortHeight)) {
                scale.x = Math.min(this.currentZoom, scale.x);
                scale.y = Math.min(this.currentZoom, scale.y);
            }
            var zoomFactor = void 0;
            var centerX = void 0;
            var centerY = void 0;
            switch (mode) {
                case 'Width':
                    zoomFactor = scale.x;
                    factor = zoomFactor / this.currentZoom;
                    centerX = (this.viewPortWidth - (bounds.width) * zoomFactor) / 2 - bounds.x * zoomFactor;
                    deltaX += centerX + (margin.left - margin.right) / 2 * zoomFactor;
                    deltaY -= -this.verticalOffset * factor;
                    deltaY = region !== 'CustomBounds' ? deltaY : deltaY - this.verticalOffset * factor;
                    break;
                case 'Height':
                    zoomFactor = scale.y;
                    factor = (zoomFactor / this.currentZoom);
                    centerX = ((this.viewPortWidth - (bounds.width) * zoomFactor) / 2) - bounds.x * zoomFactor;
                    centerY = ((this.viewPortHeight - (bounds.height) * zoomFactor) / 2) - bounds.y * zoomFactor;
                    deltaX += centerX + (margin.left - margin.right) / 2 * zoomFactor;
                    deltaY += centerY + (margin.top - margin.bottom) / 2 * zoomFactor;
                    break;
                case 'Page':
                    zoomFactor = Math.min(scale.x, scale.y);
                    factor = (zoomFactor / this.currentZoom);
                    centerX = (this.viewPortWidth - (bounds.width) * zoomFactor) / 2 - bounds.x * zoomFactor;
                    centerY = (this.viewPortHeight - (bounds.height) * zoomFactor) / 2 - bounds.y * zoomFactor;
                    deltaX += centerX + (margin.left - margin.right) / 2 * zoomFactor;
                    deltaY += centerY + (margin.top - margin.bottom) / 2 * zoomFactor;
                    break;
            }
            /**
             * EJ2-62912 - fit to page is not working properly when call it multiple times.
             */
            this.zoom(factor, deltaX, deltaY, { x: 0, y: 0 }, true, undefined, undefined, canZoomOut);
        }
        else {
            factor = 1 / this.currentZoom;
            this.zoom(factor, deltaX, deltaY, { x: 0, y: 0 }, true, undefined, undefined, canZoomOut);
        }
    };
    /**
     * bringIntoView method \
     *
     * @returns { void }     bringIntoView method .\
     * @param {Rect} rect - provide the bounds value.
     * @param {boolean} isBringIntoView - provide the isBringIntoView value.
     *
     * @private
     */
    DiagramScroller.prototype.bringIntoView = function (rect, isBringIntoView) {
        // EJ2-68130-Bringintoview shows the object outside the viewport
        var x = 0;
        var y = 0;
        var scale = this.currentZoom;
        var bounds = rect;
        var hoffset = -this.horizontalOffset;
        var voffset = -this.verticalOffset;
        bounds = new Rect(bounds.x * scale, bounds.y * scale, bounds.width * scale, bounds.height * scale);
        var view = new Rect(hoffset, voffset, this.viewPortWidth, this.viewPortHeight);
        //To prevent nodes from being cut off in the horizontal and vertical scrollbars when calling the "bring into view" function, a padding value is added.
        var nodePadding = 20;
        if (!(view.containsRect(bounds))) {
            if (bounds.right > (-hoffset + this.viewPortWidth)) {
                x = bounds.right - this.viewPortWidth;
                x += nodePadding;
            }
            if (bounds.x < -hoffset) {
                x = bounds.x;
            }
            if (bounds.bottom > (-voffset + this.viewPortHeight)) {
                y = bounds.bottom - this.viewPortHeight;
                y += nodePadding;
            }
            if (bounds.y < -voffset) {
                y = bounds.y;
            }
            this.zoom(1, -this.horizontalOffset - x, -this.verticalOffset - y, null, undefined, isBringIntoView);
        }
    };
    /**
     * bringToCenter method \
     *
     * @returns { void }     bringToCenter method .\
     * @param {Rect} bounds - provide the bounds value.
     *
     * @private
     */
    DiagramScroller.prototype.bringToCenter = function (bounds) {
        var scale = this.currentZoom;
        var actualbounds = new Rect(bounds.x * scale, bounds.y * scale, bounds.width * scale, bounds.height * scale);
        var hoffset = actualbounds.x + actualbounds.width / 2 - this.viewPortWidth / 2;
        var voffset = actualbounds.y + actualbounds.height / 2 - this.viewPortHeight / 2;
        /**
         * In applyScrollLimit method the sign of deltaX and deltaY
         * will be changed ,so here we change the sign.
         * similarly for bringIntoView.
         */
        hoffset *= -1;
        voffset *= -1;
        this.zoom(1, -this.horizontalOffset - hoffset, -this.verticalOffset - voffset, null);
    };
    DiagramScroller.prototype.applyScrollLimit = function (hOffset, vOffset, isInteractiveZoomPan, isBringIntoView, isTrackpadScroll) {
        /**
         * EJ2-60980- ScrollOffset is not updated properly in runtime.
         * EJ2-62524 - panning is not working properly in diagram.
         * isInteractiveZoomPan is undefined while setting scrollOffset at runtime.
         */
        if (this.diagram.scrollSettings.scrollLimit === 'Infinity') {
            if (isInteractiveZoomPan === undefined && !isBringIntoView) {
                hOffset = -hOffset;
                vOffset = -vOffset;
            }
        }
        if (this.diagram.scrollSettings.scrollLimit !== 'Infinity') {
            var bounds = void 0;
            if (this.diagram.scrollSettings.scrollLimit === 'Limited') {
                var scrollableBounds = this.diagram.scrollSettings.scrollableArea;
                bounds = new Rect(scrollableBounds.x, scrollableBounds.y, scrollableBounds.width, scrollableBounds.height);
            }
            // Bug 829925: Scroll bar flickers on scrolling the diagram using touchpad.
            // Added below code to get the page bounds based on the scroll.
            bounds = bounds || (isTrackpadScroll ? this.getPageBounds(false, undefined, true) : this.getPageBounds(true, undefined, true));
            // 939223: Unable to Pan to the Extreme End of the Diagram When Scroll Padding is Applied
            var eventHandler = 'eventHandler';
            if (this.diagram["" + eventHandler].currentAction === 'Pan' && this.diagram["" + eventHandler].inAction) {
                bounds = this.getPageBounds(false, undefined, true);
            }
            bounds.x *= this.currentZoom;
            bounds.y *= this.currentZoom;
            bounds.width *= this.currentZoom;
            bounds.height *= this.currentZoom;
            if (isInteractiveZoomPan !== undefined) {
                hOffset *= -1;
                vOffset *= -1;
            }
            // EJ2-69238 - Added below code to multiple the horizontal and vertical offset to bring the node in viewport
            if (isBringIntoView) {
                hOffset *= -1;
                vOffset *= -1;
            }
            var allowedRight = Math.max(bounds.right, this.viewPortWidth);
            if (!isBringIntoView && !(hOffset <= bounds.x && (hOffset + this.viewPortWidth >= bounds.right ||
                hOffset >= bounds.right - this.viewPortWidth)
                || hOffset >= bounds.x && (hOffset + this.viewPortWidth <= allowedRight))) {
                //not allowed case
                if (hOffset >= bounds.x) {
                    hOffset = Math.max(bounds.x, Math.min(hOffset, hOffset - (hOffset + this.viewPortWidth - this.vScrollSize - allowedRight)));
                }
                else {
                    var allowed = bounds.right - this.viewPortWidth;
                    hOffset = Math.min(allowed, bounds.x);
                }
            }
            var allowedBottom = Math.max(bounds.bottom, this.viewPortHeight);
            // EJ2-69238 - Added below code to restrict the min value calculation for vertical offset in bringIntoview scenarion.
            if (!isBringIntoView && !(vOffset <= bounds.y && vOffset + this.viewPortHeight >= bounds.bottom
                || vOffset >= bounds.y && vOffset + this.viewPortHeight <= allowedBottom)) {
                //not allowed case
                if (vOffset >= bounds.y) {
                    vOffset = Math.max(bounds.y, Math.min(vOffset, vOffset - (vOffset + this.viewPortHeight - this.hScrollSize - allowedBottom)));
                }
                else {
                    var allowed = bounds.bottom - this.viewPortHeight;
                    vOffset = Math.min(bounds.y, allowed);
                }
            }
            hOffset *= -1;
            vOffset *= -1;
        }
        return { x: hOffset, y: vOffset };
    };
    return DiagramScroller;
}());
export { DiagramScroller };
