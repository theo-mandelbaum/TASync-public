var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable jsdoc/require-returns */
/* eslint-disable valid-jsdoc */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { DiagramElement } from '../elements/diagram-element';
import { ElementAction, FlipDirection } from '../../enum/enum';
import { Thickness } from '../appearance';
import { Size } from '../../primitives/size';
import { Rect } from '../../primitives/rect';
import { rotatePoint, getOffset } from '../../utility/base-util';
/**
 * Container module is used to group related objects
 */
var Container = /** @class */ (function (_super) {
    __extends(Container, _super);
    function Container() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * Gets/Sets the space between the container and its immediate children
         */
        _this.padding = new Thickness(0, 0, 0, 0);
        //private members
        _this.desiredBounds = undefined;
        /** @private */
        _this.measureChildren = true;
        /**   @private  */
        _this.prevRotateAngle = 0;
        return _this;
    }
    /**
     * returns whether the container has child elements or not
     */
    Container.prototype.hasChildren = function () {
        if (this.children !== undefined && this.children.length > 0) {
            return true;
        }
        return false;
    };
    /**
     * Measures the minimum space that the container requires
     *
     * @param {Size} availableSize
     * @param {string} id
     * @param {Function} callback
     */
    Container.prototype.measure = function (availableSize, id, callback) {
        // measure the element and find the desired size
        this.desiredBounds = undefined;
        var desired = undefined;
        var child;
        var center = { x: 0, y: 0 };
        var y;
        var x;
        var childBounds;
        if (this.hasChildren()) {
            //Measuring the children
            for (var i = 0; i < this.children.length; i++) {
                child = this.children[parseInt(i.toString(), 10)];
                if (child.horizontalAlignment === 'Stretch' && !availableSize.width) {
                    availableSize.width = child.bounds.width;
                }
                if (child.verticalAlignment === 'Stretch' && !availableSize.height) {
                    availableSize.height = child.bounds.height;
                }
                var force = child.horizontalAlignment === 'Stretch' || child.verticalAlignment === 'Stretch';
                if (this.measureChildren || force || (child instanceof Container && child.measureChildren !== undefined)) {
                    child.measure(availableSize, id, callback);
                }
                childBounds = this.GetChildrenBounds(child);
                if (child.horizontalAlignment !== 'Stretch' && child.verticalAlignment !== 'Stretch') {
                    if (this.desiredBounds === undefined) {
                        this.desiredBounds = childBounds;
                    }
                    else {
                        this.desiredBounds.uniteRect(childBounds);
                    }
                }
                else if (this.actualSize && !this.actualSize.width && !this.actualSize.height &&
                    !child.preventContainer && child.horizontalAlignment === 'Stretch' && child.verticalAlignment === 'Stretch') {
                    if (this.desiredBounds === undefined) {
                        this.desiredBounds = child.bounds;
                    }
                    else {
                        this.desiredBounds.uniteRect(child.bounds);
                    }
                }
            }
            if (this.desiredBounds !== undefined && this.rotateAngle !== 0) {
                var offsetPt = {
                    x: this.desiredBounds.x + this.desiredBounds.width * this.pivot.x,
                    y: this.desiredBounds.y + this.desiredBounds.height * this.pivot.y
                };
                var newPoint = rotatePoint(this.rotateAngle, undefined, undefined, offsetPt);
                this.desiredBounds.x = newPoint.x - this.desiredBounds.width * this.pivot.x;
                this.desiredBounds.y = newPoint.y - this.desiredBounds.height * this.pivot.y;
            }
            /**
             * Adding padding to the group bounds during initial rendering and for the group selection
             */
            if (this.desiredBounds !== undefined) {
                this.desiredBounds.width += this.padding.left + this.padding.right;
                this.desiredBounds.height += this.padding.top + this.padding.bottom;
                this.desiredBounds.x -= this.padding.left;
                this.desiredBounds.y -= this.padding.top;
            }
            if (this.desiredBounds) {
                desired = new Size(this.desiredBounds.width, this.desiredBounds.height);
            }
        }
        desired = this.validateDesiredSize(desired, availableSize);
        this.stretchChildren(desired);
        this.desiredSize = desired;
        return desired;
    };
    /**
     * Arranges the container and its children
     *
     * @param {Size} desiredSize  - provide the desiredSize value
     */
    Container.prototype.arrange = function (desiredSize) {
        var child;
        var bounds;
        var childBounds = this.desiredBounds;
        if (childBounds) {
            var x = this.offsetX;
            var y = this.offsetY;
            this.offsetX = childBounds.x + childBounds.width * this.pivot.x;
            this.offsetY = childBounds.y + childBounds.height * this.pivot.y;
            // container has rotateAngle
            if (this.hasChildren()) {
                //Measuring the children
                for (var i = 0; i < this.children.length; i++) {
                    child = this.children[parseInt(i.toString(), 10)];
                    var arrange = false;
                    if (child.horizontalAlignment === 'Stretch') {
                        child.offsetX = this.offsetX;
                        child.parentTransform = this.parentTransform + this.rotateAngle;
                        if (this.flip && (this.elementActions & ElementAction.ElementIsGroup)) {
                            child.parentTransform = (this.flip === FlipDirection.Horizontal || this.flip === FlipDirection.Vertical) ?
                                -child.parentTransform : child.parentTransform;
                        }
                        arrange = true;
                    }
                    if (child.verticalAlignment === 'Stretch') {
                        child.offsetY = this.offsetY;
                        child.parentTransform = this.parentTransform + this.rotateAngle;
                        arrange = true;
                    }
                    if (arrange || this.measureChildren || (child instanceof Container && child.measureChildren !== undefined)) {
                        child.arrange(child.desiredSize);
                    }
                    //EJ2-839298 - Connector draw cursor is not enabled while hover the group node port
                    //EJ2-909503-Annotation for the group is behind its internal nodes
                    if (i === 0) {
                        var childBounds_1 = child.outerBounds;
                        this.outerBounds = new Rect(childBounds_1.x, childBounds_1.y, childBounds_1.width, childBounds_1.height);
                    }
                    else {
                        this.outerBounds.uniteRect(child.outerBounds);
                    }
                }
            }
        }
        this.actualSize = desiredSize;
        this.updateBounds();
        this.prevRotateAngle = this.rotateAngle;
        return desiredSize;
    };
    //protected methods
    /**
     * Stretches the child elements based on the size of the container
     *
     * @param {Size} size  - provide the size value
     */
    Container.prototype.stretchChildren = function (size) {
        if (this.hasChildren()) {
            for (var _i = 0, _a = this.children; _i < _a.length; _i++) {
                var child = _a[_i];
                if (child.horizontalAlignment === 'Stretch' || child.desiredSize.width === undefined) {
                    child.desiredSize.width = size.width - child.margin.left - child.margin.right;
                }
                if (child.verticalAlignment === 'Stretch' || child.desiredSize.height === undefined) {
                    child.desiredSize.height = size.height - child.margin.top - child.margin.bottom;
                }
                if (child instanceof Container) {
                    child.stretchChildren(child.desiredSize);
                }
            }
        }
    };
    /**
     * Considers the padding of the element when measuring its desired size
     * @param {Size} size - provide the size value
     */
    Container.prototype.applyPadding = function (size) {
        size.width += this.padding.left + this.padding.right;
        size.height += this.padding.top + this.padding.bottom;
    };
    /**
     * Finds the offset of the child element with respect to the container
     *
     * @param {DiagramElement} child - provide the child value
     * @param {PointModel} center - provide the center value
     */
    Container.prototype.findChildOffsetFromCenter = function (child, center) {
        var topLeft = { x: center.x - child.desiredSize.width / 2, y: center.y - child.desiredSize.height / 2 };
        var offset = getOffset(topLeft, child);
        //Rotate based on child rotate angle
        offset = rotatePoint(child.rotateAngle, center.x, center.y, offset);
        //Rotate based on parent pivot
        offset = rotatePoint(this.rotateAngle + this.parentTransform, this.offsetX, this.offsetY, offset);
        child.offsetX = offset.x;
        child.offsetY = offset.y;
    };
    //private methods - check its need
    Container.prototype.GetChildrenBounds = function (child) {
        var childBounds;
        var childSize = child.desiredSize.clone();
        var diffAngle = child.rotateAngle - this.rotateAngle;
        var refPoint = { x: child.offsetX, y: child.offsetY };
        var left = refPoint.x - childSize.width * child.pivot.x;
        var top = refPoint.y - childSize.height * child.pivot.y;
        var right = left + childSize.width;
        var bottom = top + childSize.height;
        var topLeft = { x: left, y: top };
        var topRight = { x: right, y: top };
        var bottomLeft = { x: left, y: bottom };
        var bottomRight = { x: right, y: bottom };
        topLeft = rotatePoint(child.rotateAngle, child.offsetX, child.offsetY, topLeft);
        topRight = rotatePoint(child.rotateAngle, child.offsetX, child.offsetY, topRight);
        bottomLeft = rotatePoint(child.rotateAngle, child.offsetX, child.offsetY, bottomLeft);
        bottomRight = rotatePoint(child.rotateAngle, child.offsetX, child.offsetY, bottomRight);
        if (this.rotateAngle !== 0) {
            topLeft = rotatePoint(-this.rotateAngle, undefined, undefined, topLeft);
            topRight = rotatePoint(-this.rotateAngle, undefined, undefined, topRight);
            bottomLeft = rotatePoint(-this.rotateAngle, undefined, undefined, bottomLeft);
            bottomRight = rotatePoint(-this.rotateAngle, undefined, undefined, bottomRight);
        }
        return Rect.toBounds([topLeft, topRight, bottomLeft, bottomRight]);
    };
    return Container;
}(DiagramElement));
export { Container };
