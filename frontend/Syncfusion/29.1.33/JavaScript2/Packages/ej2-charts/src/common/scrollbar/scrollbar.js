import { EventHandler, Browser, remove, isNullOrUndefined } from '@syncfusion/ej2-base';
import { ScrollElements, createScrollSvg } from './scrollbar-elements';
import { getElement, minMax, logBase } from '../utils/helper';
import { getScrollbarThemeColor } from '../model/theme';
import { scrollChanged, scrollEnd, scrollStart } from '../model/constants';
/**
 * Configures the scrollbar base.
 *
 * @private
 */
var ScrollBar = /** @class */ (function () {
    /**
     * Constructor for creating scrollbar
     *
     * @param component
     * @param axis
     */
    function ScrollBar(component, axis) {
        /** @private */
        this.scrollRange = { max: null, min: null, interval: null, delta: null };
        this.component = component;
        this.elements = [];
        this.scrollElements = new ScrollElements(component);
        this.axis = axis;
        this.mouseMoveListener = this.scrollMouseMove.bind(this);
        this.mouseUpListener = this.scrollMouseUp.bind(this);
        this.animateDuration = 500;
        this.isPointer = Browser.isPointer;
        this.browserName = Browser.info.name;
    }
    /**
     * To Mouse x and y position
     *
     * @param e
     */
    ScrollBar.prototype.getMouseXY = function (e) {
        var pageX;
        var pageY;
        var touchArg;
        if (e.type.indexOf('touch') > -1) {
            touchArg = e;
            pageX = touchArg.changedTouches[0].clientX;
            pageY = touchArg.changedTouches[0].clientY;
        }
        else {
            pageX = e.clientX;
            pageY = e.clientY;
        }
        var svgRect = getElement(this.component.element.id + '_scrollBar_svg' + this.axis.name).getBoundingClientRect();
        this.mouseX = pageX - Math.max(svgRect.left, 0);
        this.mouseY = pageY - Math.max(svgRect.top, 0);
    };
    /**
     * Method to bind events for scrollbar svg object
     *
     * @param element
     * @returns {void}
     */
    ScrollBar.prototype.wireEvents = function (element) {
        EventHandler.add(element, Browser.touchStartEvent, this.scrollMouseDown, this);
        EventHandler.add(element, Browser.touchMoveEvent, this.scrollMouseMove, this);
        EventHandler.add(element, Browser.touchEndEvent, this.scrollMouseUp, this);
        EventHandler.add(element, 'mousewheel', this.scrollMouseWheel, this);
        window.addEventListener('mousemove', this.mouseMoveListener, false);
        window.addEventListener('mouseup', this.mouseUpListener, false);
    };
    /**
     * Method to remove events for srcollbar svg object
     *
     * @param element
     */
    ScrollBar.prototype.unWireEvents = function (element) {
        EventHandler.remove(element, Browser.touchStartEvent, this.scrollMouseDown);
        EventHandler.remove(element, Browser.touchMoveEvent, this.scrollMouseMove);
        EventHandler.remove(element, Browser.touchEndEvent, this.scrollMouseUp);
        EventHandler.remove(element, 'mousewheel', this.scrollMouseWheel);
        window.removeEventListener('mousemove', this.mouseMoveListener, false);
        window.removeEventListener('mouseup', this.mouseUpListener, false);
    };
    /**
     * Handles the mouse down on scrollbar.
     *
     * @param e
     */
    ScrollBar.prototype.scrollMouseDown = function (e) {
        var id = e.target.id;
        var elem = this.scrollElements;
        var isInverse = this.axis.isAxisInverse;
        this.getMouseXY(e);
        this.isResizeLeft = this.isExist(id, '_leftCircle_') || this.isExist(id, '_leftArrow_');
        this.isResizeRight = this.isExist(id, '_rightCircle_') || this.isExist(id, '_rightArrow_');
        //  this.previousXY = this.isVertical ? this.mouseY : this.mouseX;
        this.previousXY = (this.isVertical && isInverse) ? this.mouseY : this.isVertical ? this.width -
            this.mouseY : isInverse ? this.width - this.mouseX : this.mouseX;
        this.previousWidth = elem.thumbRectWidth;
        this.previousRectX = elem.thumbRectX;
        this.startZoomPosition = this.axis.zoomPosition;
        this.startZoomFactor = this.axis.zoomFactor;
        this.startRange = this.axis.visibleRange;
        this.scrollStarted = true;
        this.component.trigger(scrollStart, this.getArgs(scrollStart));
        if (this.isExist(id, 'scrollBarThumb_') || this.isExist(id, 'gripCircle')) {
            this.isThumbDrag = true;
            if (this.axis.scrollbarSettings.height >= 12) {
                this.svgObject.style.cursor = '-webkit-grabbing';
            }
        }
        else if (this.isExist(id, 'scrollBarBackRect_')) {
            var currentX = this.moveLength(this.previousXY, this.previousRectX);
            elem.thumbRectX = this.isWithIn(currentX) ? currentX : elem.thumbRectX;
            this.positionThumb(elem.thumbRectX, elem.thumbRectWidth);
            this.setZoomFactorPosition(elem.thumbRectX, elem.thumbRectWidth);
            this.axis.zoomPosition = this.zoomPosition < 0 ? 0 : this.zoomPosition > 0.9 ? 1 : this.zoomPosition;
            if (this.isLazyLoad) {
                var thumbMove = elem.thumbRectX > this.previousRectX ? 'RightMove' : 'LeftMove';
                var args = this.calculateLazyRange(elem.thumbRectX, elem.thumbRectWidth, thumbMove);
                if (args) {
                    this.component.trigger(scrollEnd, args);
                }
            }
        }
        /**
         * Customer issue
         * Task ID - EJ2-28898
         * Issue: While element's height is smaller than chart'height, html scroll bar presents. On that case while moving chart scrollbar,
         * html scrollbar goes up due to chart's svg removed from the dom when zoomFactor and zoomPosition chnaged
         * Fix: Only for scrolling purpose, height for element is set to chart's available height
         */
        if (this.component.element.style.height === '') {
            this.isCustomHeight = true;
            this.component.element.style.height = this.component.availableSize.height + 'px';
        }
    };
    /**
     * To check the matched string
     *
     * @param id
     * @param match
     */
    ScrollBar.prototype.isExist = function (id, match) {
        return id.indexOf(match) > -1;
    };
    /**
     * To check current poisition is within scrollbar region
     *
     * @param currentX
     */
    ScrollBar.prototype.isWithIn = function (currentX) {
        var circleRadius = this.axis.scrollbarSettings.height / 2;
        return (currentX - circleRadius >= 0 &&
            currentX + this.scrollElements.thumbRectWidth + circleRadius <= this.width);
    };
    /**
     * Method to find move length of thumb
     *
     * @param mouseXY
     * @param thumbX
     * @param circleRadius
     */
    ScrollBar.prototype.moveLength = function (mouseXY, thumbX, circleRadius) {
        if (circleRadius === void 0) { circleRadius = this.axis.scrollbarSettings.height / 2; }
        var moveLength = (10 / 100) * (this.width - circleRadius * 2);
        if (mouseXY < thumbX) {
            moveLength = thumbX - (thumbX - moveLength > circleRadius ? moveLength : circleRadius);
        }
        else {
            moveLength = thumbX + (thumbX + this.scrollElements.thumbRectWidth + moveLength < this.width - circleRadius ?
                moveLength : circleRadius);
        }
        return moveLength;
    };
    /**
     * Method to calculate zoom factor and position
     *
     * @param currentX
     * @param currentWidth
     */
    ScrollBar.prototype.setZoomFactorPosition = function (currentX, currentWidth) {
        this.isScrollUI = true;
        var axis = this.axis;
        var circleRadius = this.axis.scrollbarSettings.height / 2;
        var circleWidth = 1;
        var currentScrollWidth = currentX + currentWidth + circleRadius + circleWidth;
        var currentZPWidth = circleRadius + (circleWidth / 2);
        var axisSize = this.isVertical ? axis.rect.height : this.width;
        this.zoomFactor = (currentWidth + (currentScrollWidth >= this.width ? circleRadius + circleWidth : 0)) / axisSize;
        this.zoomPosition = currentScrollWidth > axisSize ? (1 - axis.zoomFactor) : currentX < (circleRadius + circleWidth) ? 0 :
            (currentX - (currentX - currentZPWidth <= 0 ? currentZPWidth : 0)) / axisSize;
        this.zoomPosition = (this.component.enableRtl && !this.isVertical && !axis.isInversed) || (axis.isInversed &&
            !(this.component.enableRtl && !this.isVertical)) ? 1 - (this.zoomPosition + axis.zoomFactor) : this.zoomPosition;
    };
    /**
     * Handles the mouse move on scrollbar.
     *
     * @param e
     */
    ScrollBar.prototype.scrollMouseMove = function (e) {
        var target = e.target;
        var elem = this.scrollElements;
        var isInverse = this.axis.isAxisInverse;
        if (!getElement(this.svgObject.id)) {
            return null;
        }
        this.getMouseXY(e);
        if (!isNullOrUndefined(target.id)) {
            this.setCursor(target);
            this.setTheme(target);
        }
        //let mouseXY: number = this.isVertical ? this.mouseY : this.mouseX;
        var mouseXY = (this.isVertical && isInverse) ? this.width - this.mouseY : this.isVertical ?
            this.mouseY : this.mouseX;
        var range = this.axis.visibleRange;
        var zoomPosition = this.zoomPosition;
        var zoomFactor = this.zoomFactor;
        var moveLength = this.previousRectX - elem.thumbRectX;
        var thumbMove = moveLength < 0 ? 'RightMove' : 'LeftMove';
        var args;
        if (this.isLazyLoad && (this.isThumbDrag || this.isResizeLeft || this.isResizeRight)) {
            args = this.calculateLazyRange(elem.thumbRectX, elem.thumbRectWidth, thumbMove);
        }
        var currentRange = args ? args.currentRange : null;
        if (this.isThumbDrag) {
            this.component.isScrolling = this.isThumbDrag;
            mouseXY = (this.isVertical || isInverse) ? this.width - mouseXY : mouseXY;
            var currentX = elem.thumbRectX + (mouseXY - this.previousXY);
            if (mouseXY >= currentX + elem.thumbRectWidth) {
                this.setCursor(target);
            }
            else {
                if (this.axis.scrollbarSettings.height >= 12) {
                    this.svgObject.style.cursor = '-webkit-grabbing';
                }
            }
            if (mouseXY >= 0 && mouseXY <= currentX + elem.thumbRectWidth) {
                elem.thumbRectX = this.isWithIn(currentX) ? currentX : elem.thumbRectX;
                this.positionThumb(elem.thumbRectX, elem.thumbRectWidth);
                this.previousXY = mouseXY;
                this.setZoomFactorPosition(currentX, elem.thumbRectWidth);
                this.axis.zoomPosition = this.zoomPosition < 0 ? 0 : this.zoomPosition > 0.9 ? 1 : this.zoomPosition;
            }
            this.component.trigger(scrollChanged, this.getArgs(scrollChanged, range, zoomPosition, zoomFactor, currentRange));
        }
        else if (this.isResizeLeft || this.isResizeRight) {
            this.resizeThumb();
        }
    };
    /**
     * Handles the mouse wheel on scrollbar.
     *
     * @param e
     */
    ScrollBar.prototype.scrollMouseWheel = function (e) {
        if (!this.axis.scrollbarSettings.enableZoom) {
            return null;
        }
        var svgRect = getElement(this.component.element.id + '_scrollBar_svg' + this.axis.name).getBoundingClientRect();
        this.mouseX = e.clientX - Math.max(svgRect.left, 0);
        this.mouseY = e.clientY - Math.max(svgRect.top, 0);
        var origin = 0.5;
        var elem = this.scrollElements;
        var axis = this.axis;
        var direction = (this.browserName === 'mozilla' && !this.isPointer) ?
            -(e.detail) / 3 > 0 ? 1 : -1 : (e['wheelDelta'] / 120) > 0 ? 1 : -1;
        var cumulative = Math.max(Math.max(1 / minMax(axis.zoomFactor, 0, 1), 1) + (0.25 * direction), 1);
        var range = this.axis.visibleRange;
        var zoomPosition = this.zoomPosition;
        var zoomFactor = this.zoomFactor;
        var args;
        if (cumulative >= 1) {
            origin = axis.orientation === 'Horizontal' ? this.mouseX / axis.rect.width : 1 - (this.mouseY / axis.rect.height);
            origin = origin > 1 ? 1 : origin < 0 ? 0 : origin;
            this.zoomFactor = (cumulative === 1) ? 1 : minMax(1 / cumulative, 0, 1);
            this.zoomPosition = (cumulative === 1) ? 0 : axis.zoomPosition + ((axis.zoomFactor - this.zoomFactor) * origin);
        }
        elem.thumbRectX = this.isWithIn(this.zoomPosition * this.width) ? this.zoomPosition * this.width : elem.thumbRectX;
        this.isScrollUI = true;
        this.positionThumb(elem.thumbRectX, elem.thumbRectWidth);
        if (this.isLazyLoad) {
            this.setZoomFactorPosition(elem.thumbRectX, elem.thumbRectWidth);
            this.axis.zoomFactor = this.zoomFactor;
            this.axis.zoomPosition = this.zoomPosition < 0 ? 0 : this.zoomPosition > 0.9 ? 1 : this.zoomPosition;
        }
        axis.zoomFactor = this.zoomFactor;
        axis.zoomPosition = this.zoomPosition;
        if (this.isLazyLoad) {
            args = this.calculateMouseWheelRange(elem.thumbRectX, elem.thumbRectWidth);
            if (args) {
                if ((args.currentRange.minimum !== args.previousAxisRange.minimum) && (args.currentRange.maximum !==
                    args.previousAxisRange.maximum)) {
                    this.component.trigger(scrollEnd, args);
                    this.isScrollEnd = false;
                }
            }
        }
        if (!this.isLazyLoad) {
            this.component.trigger(scrollChanged, this.getArgs(scrollChanged, range, zoomPosition, zoomFactor));
        }
    };
    /**
     * Handles the mouse up on scrollbar.
     *
     * @param e
     */
    ScrollBar.prototype.scrollMouseUp = function () {
        var args;
        this.startX = this.scrollElements.thumbRectX;
        var circleRadius = this.axis.scrollbarSettings.height / 2;
        var circleWidth = 1;
        var currentScrollWidth = this.startX + this.scrollElements.thumbRectWidth + circleRadius + circleWidth;
        var currentZPWidth = circleRadius + (circleWidth / 2);
        if ((this.isResizeLeft || this.isResizeRight) && !this.isLazyLoad) {
            this.axis.zoomFactor = (currentScrollWidth >= this.width - 1 && (this.startX - currentZPWidth) <= 0) ? 1 : this.zoomFactor;
        }
        if (this.isLazyLoad) {
            var moveLength = this.previousRectX - this.startX;
            if ((moveLength > 0 || moveLength < 0) && this.isThumbDrag) {
                var thumbMove = moveLength < 0 ? 'RightMove' : 'LeftMove';
                if (thumbMove === 'RightMove') {
                    this.startX = (this.startX + Math.abs(moveLength)) < this.width - circleRadius ? this.startX :
                        this.width - circleRadius - this.scrollElements.thumbRectWidth;
                }
                else {
                    this.startX = (this.startX + this.scrollElements.thumbRectWidth - Math.abs(moveLength)) > circleRadius ?
                        this.startX : circleRadius;
                }
                args = this.calculateLazyRange(this.startX, this.scrollElements.thumbRectWidth, thumbMove);
                if (args) {
                    this.component.trigger(scrollEnd, args);
                    this.scrollStarted = false;
                }
            }
            if (this.isResizeLeft || this.isResizeRight) {
                args = this.calculateLazyRange(this.startX, this.scrollElements.thumbRectWidth);
                if (args) {
                    this.component.trigger(scrollEnd, args);
                    this.scrollStarted = false;
                }
            }
        }
        this.isThumbDrag = false;
        this.isResizeLeft = false;
        this.isResizeRight = false;
        this.isScrollEnd = false;
        this.component.isScrolling = false;
        if (this.scrollStarted && !this.isLazyLoad) {
            this.component.trigger(scrollEnd, this.getArgs(scrollChanged, this.startRange, this.startZoomPosition, this.startZoomFactor));
            this.scrollStarted = false;
        }
        /**
         * Customer issue
         * Task ID - EJ2-28898
         * Chart's height setted is removed here.
         */
        if (this.isCustomHeight) {
            this.component.element.style.height = null;
        }
    };
    ScrollBar.prototype.calculateMouseWheelRange = function (scrollThumbX, scrollThumbWidth) {
        var zoomFactor;
        var zoomPosition;
        var args;
        var range = this.scrollRange;
        var previousRange = this.getStartEnd(this.previousStart, this.previousEnd, false);
        var circleRadius = this.axis.scrollbarSettings.height / 2;
        if ((scrollThumbX + scrollThumbWidth + circleRadius) <= this.width) {
            zoomPosition = (scrollThumbX - circleRadius) / this.width;
            zoomFactor = scrollThumbWidth / (this.width);
        }
        var currentStart = range.min + zoomPosition * range.delta;
        var currentEnd = currentStart + zoomFactor * range.delta;
        if (currentEnd) {
            args = { axis: this.axis, currentRange: this.getStartEnd(currentStart, currentEnd, true), previousAxisRange: previousRange };
        }
        return args;
    };
    /**
     * Range calculation for lazy loading.
     *
     * @param scrollThumbX
     * @param scrollThumbWidth
     * @param thumbMove
     * @param scrollThumbX
     * @param scrollThumbWidth
     * @param thumbMove
     * @param scrollThumbX
     * @param scrollThumbWidth
     * @param thumbMove
     */
    ScrollBar.prototype.calculateLazyRange = function (scrollThumbX, scrollThumbWidth, thumbMove) {
        var currentScrollWidth = scrollThumbWidth;
        var zoomFactor;
        var zoomPosition;
        var currentStart;
        var currentEnd;
        var args;
        var range = this.scrollRange;
        var previousRange = this.getStartEnd(this.previousStart, this.previousEnd, false);
        var circleRadius = this.axis.scrollbarSettings.height / 2;
        var circleWidth = 16;
        if (this.isResizeRight || thumbMove === 'RightMove') {
            currentScrollWidth = this.isResizeRight ? currentScrollWidth + circleWidth : currentScrollWidth;
            zoomFactor = (currentScrollWidth) / this.width;
            zoomPosition = thumbMove === 'RightMove' ? (scrollThumbX + circleRadius) / this.width : this.axis.zoomPosition;
            currentStart = thumbMove === 'RightMove' ? (range.min + zoomPosition * range.delta) : this.previousStart;
            currentEnd = currentStart + zoomFactor * range.delta;
        }
        else if (this.isResizeLeft || thumbMove === 'LeftMove') {
            zoomPosition = (scrollThumbX - circleRadius) / this.width;
            zoomFactor = currentScrollWidth / this.width;
            currentStart = range.min + zoomPosition * range.delta;
            currentStart = currentStart >= range.min ? currentStart : range.min;
            currentEnd = thumbMove === 'LeftMove' ? (currentStart + zoomFactor * range.delta) : this.previousEnd;
        }
        else if (this.isThumbDrag) {
            zoomPosition = thumbMove === 'RightMove' ? (scrollThumbX + circleRadius) / this.width : (scrollThumbX - circleRadius) / this.width;
            zoomFactor = (this.scrollElements.thumbRectWidth) / this.width;
            currentStart = range.min + zoomPosition * range.delta;
            currentStart = currentStart >= range.min ? currentStart : range.min;
            currentEnd = currentStart + zoomFactor * range.delta;
        }
        if (currentEnd) {
            args = { axis: (this.component.isBlazor ? {} : this.axis), currentRange: this.getStartEnd(currentStart, currentEnd, true),
                previousAxisRange: previousRange };
        }
        return args;
    };
    /**
     * Get start and end values
     *
     * @param start
     * @param end
     * @param isCurrentStartEnd
     * @param start
     * @param end
     * @param isCurrentStartEnd
     * @param start
     * @param end
     * @param isCurrentStartEnd
     */
    ScrollBar.prototype.getStartEnd = function (start, end, isCurrentStartEnd) {
        var valueType = this.valueType;
        if ((valueType === 'DateTime' || valueType === 'DateTimeCategory') && isCurrentStartEnd) {
            this.previousStart = start;
            this.previousEnd = end;
        }
        else if (isCurrentStartEnd) {
            var currentStart = Math.round(start);
            var currentEnd = Math.ceil(end);
            if (this.axis.valueType === 'Category') {
                currentEnd -= (!this.axis.scrollbarSettings.enableZoom && currentEnd - currentStart >
                    this.previousEnd - this.previousStart) ? (currentEnd - currentStart) - (this.previousEnd - this.previousStart) : 0;
            }
            this.previousStart = start = currentStart;
            this.previousEnd = end = currentEnd;
        }
        switch (valueType) {
            case 'Double':
            case 'Category':
            case 'Logarithmic':
                start = Math.round(start);
                end = Math.ceil(end);
                break;
            case 'DateTime':
            case 'DateTimeCategory':
                start = new Date(start);
                end = new Date(end);
                break;
        }
        return { minimum: start, maximum: end };
    };
    /**
     * To render scroll bar
     *
     * @param isScrollExist
     * @private
     */
    ScrollBar.prototype.render = function (isScrollExist) {
        if (this.component.zoomModule || (isScrollExist && this.axis.scrollbarSettings.enable)) {
            this.getDefaults();
        }
        this.getTheme();
        this.removeScrollSvg();
        createScrollSvg(this, this.component.svgRenderer);
        this.wireEvents(this.svgObject);
        this.svgObject.appendChild(this.scrollElements.renderElements(this, this.component.svgRenderer));
        return this.svgObject;
    };
    /**
     * Theming for scrollabr
     *
     * @returns {void}
     */
    ScrollBar.prototype.getTheme = function () {
        this.scrollbarThemeStyle = getScrollbarThemeColor(this.component.theme);
    };
    /**
     * Method to remove existing scrollbar.
     *
     * @returns {void}
     */
    ScrollBar.prototype.removeScrollSvg = function () {
        if (document.getElementById(this.component.element.id + '_scrollBar_svg' + this.axis.name)) {
            remove(document.getElementById(this.component.element.id + '_scrollBar_svg' + this.axis.name));
        }
    };
    /**
     * Method to set cursor fpr scrollbar
     *
     * @param target
     */
    ScrollBar.prototype.setCursor = function (target) {
        var id = target.id;
        this.svgObject.style.cursor = ((id.indexOf('scrollBarThumb_') > -1 || id.indexOf('_gripCircle') > -1) && this.axis.scrollbarSettings.height >= 12) ?
            '-webkit-grab' : (id.indexOf('Circle_') > -1 || id.indexOf('Arrow_') > -1) ? this.isVertical ? 'ns-resize' :
            'ew-resize' : 'auto';
    };
    /**
     * Method to set theme for sollbar
     *
     * @param target
     */
    ScrollBar.prototype.setTheme = function (target) {
        var id = target.id;
        var isLeftHover = id.indexOf('_leftCircle_') > -1 || id.indexOf('_leftArrow_') > -1;
        var isRightHover = id.indexOf('_rightCircle_') > -1 || id.indexOf('_rightArrow_') > -1;
        var style = this.scrollbarThemeStyle;
        var leftArrowEle = this.scrollElements.leftArrowEle;
        var rightArrowEle = this.scrollElements.rightArrowEle;
        var leftCircleEle = this.scrollElements.leftCircleEle;
        var rightCircleEle = this.scrollElements.rightCircleEle;
        var isAxis = this.isCurrentAxis(target, leftArrowEle);
        leftCircleEle.style.fill = isLeftHover && isAxis ? style.circleHover : style.circle;
        rightCircleEle.style.fill = isRightHover && isAxis ? style.circleHover : style.circle;
        leftCircleEle.style.stroke = isLeftHover && isAxis ? style.circleHover : style.circle;
        rightCircleEle.style.stroke = isRightHover && isAxis ? style.circleHover : style.circle;
        if (this.component.theme === 'HighContrastLight') {
            leftArrowEle.style.fill = isLeftHover && isAxis ? style.arrowHover : style.arrow;
            leftArrowEle.style.stroke = isLeftHover && isAxis ? style.arrowHover : style.arrow;
            rightArrowEle.style.fill = isRightHover && isAxis ? style.arrowHover : style.arrow;
            rightArrowEle.style.stroke = isRightHover && isAxis ? style.arrowHover : style.arrow;
            leftCircleEle.style.stroke = isLeftHover && isAxis ? style.circleHover : style.circle;
            rightCircleEle.style.stroke = isRightHover && isAxis ? style.circleHover : style.circle;
        }
    };
    /**
     * To check current axis
     *
     * @param target
     * @param ele
     */
    ScrollBar.prototype.isCurrentAxis = function (target, ele) {
        return (target.id.split('_')[2] === ele.id.split('_')[2]);
    };
    /**
     * Method to resize thumb
     *
     * @param e
     */
    ScrollBar.prototype.resizeThumb = function () {
        var currentWidth;
        var circleRadius = this.axis.scrollbarSettings.height / 2;
        var padding = 5;
        var gripWidth = 14;
        var minThumbWidth = circleRadius * 2 + padding * 2 + gripWidth;
        var thumbX = this.previousRectX;
        var isInverse = this.axis.isAxisInverse;
        // let mouseXY: number = this.isVertical ? this.mouseY : this.mouseX;
        var mouseXY = (this.isVertical && isInverse) ? this.mouseY : this.isVertical ? this.width -
            this.mouseY : isInverse ? this.width - this.mouseX : this.mouseX;
        var diff = Math.abs(this.previousXY - mouseXY);
        if (this.isResizeLeft && mouseXY >= 0) {
            var currentX = thumbX + (mouseXY > this.previousXY ? diff : -diff);
            currentWidth = currentX - circleRadius >= 0 ? this.previousWidth + (mouseXY > this.previousXY ? -diff : diff) :
                this.previousWidth;
            currentX = currentX - circleRadius >= 0 ? currentX : thumbX;
            if (currentWidth >= minThumbWidth && mouseXY < currentX + currentWidth) {
                this.scrollElements.thumbRectX = this.previousRectX = currentX;
                this.scrollElements.thumbRectWidth = this.previousWidth = currentWidth;
                this.previousXY = mouseXY;
                this.setZoomFactorPosition(currentX, currentWidth);
                var argsData = {
                    axis: (this.component.isBlazor ? {} : this.axis),
                    name: scrollChanged,
                    range: this.axis.visibleRange,
                    zoomFactor: this.zoomFactor,
                    zoomPosition: this.zoomPosition,
                    previousRange: this.axis.visibleRange,
                    previousZoomFactor: this.axis.zoomFactor,
                    previousZoomPosition: this.axis.zoomPosition,
                    currentRange: null,
                    cancel: false
                };
                this.component.trigger(scrollChanged, argsData);
                if (!argsData.cancel) {
                    this.positionThumb(currentX, currentWidth);
                    this.axis.zoomFactor = argsData.zoomFactor;
                    this.axis.zoomPosition = argsData.zoomPosition;
                }
                else {
                    this.zoomFactor = argsData.previousZoomFactor;
                    this.zoomPosition = argsData.previousZoomPosition;
                }
            }
        }
        else if (this.isResizeRight) {
            currentWidth = mouseXY >= minThumbWidth + this.scrollElements.thumbRectX && mouseXY <= this.width - circleRadius ?
                mouseXY - this.scrollElements.thumbRectX : this.previousWidth;
            this.scrollElements.thumbRectWidth = this.previousWidth = currentWidth;
            this.previousXY = mouseXY;
            this.setZoomFactorPosition(this.startX, currentWidth);
            if (!this.isLazyLoad) {
                this.setZoomFactorPosition(this.startX, currentWidth);
            }
            var argsData = {
                axis: (this.component.isBlazor ? {} : this.axis),
                name: scrollChanged,
                range: this.axis.visibleRange,
                zoomFactor: this.zoomFactor,
                zoomPosition: this.zoomPosition,
                previousRange: this.axis.visibleRange,
                previousZoomFactor: this.axis.zoomFactor,
                previousZoomPosition: this.axis.zoomPosition,
                currentRange: null,
                cancel: false
            };
            this.component.trigger(scrollChanged, argsData);
            if (!argsData.cancel) {
                this.positionThumb(this.startX, currentWidth);
                this.axis.zoomFactor = argsData.zoomFactor;
                this.axis.zoomPosition = argsData.zoomPosition;
            }
            else {
                this.zoomFactor = argsData.previousZoomFactor;
                this.zoomPosition = argsData.previousZoomPosition;
            }
        }
    };
    /**
     * Method to position the scrollbar thumb
     *
     * @param currentX
     * @param currentWidth
     */
    ScrollBar.prototype.positionThumb = function (currentX, currentWidth) {
        var elem = this.scrollElements;
        var gripWidth = 14;
        var gripCircleDiameter = 2;
        var padding = gripWidth / 2 - gripCircleDiameter;
        elem.slider.setAttribute('x', this.axis.scrollbarSettings.enableZoom ? currentX.toString() : (currentX - this.axis.scrollbarSettings.height / 2).toString());
        elem.slider.setAttribute('width', this.axis.scrollbarSettings.enableZoom ? currentWidth.toString() : (currentWidth + this.axis.scrollbarSettings.height).toString());
        elem.leftCircleEle.setAttribute('cx', currentX.toString());
        elem.rightCircleEle.setAttribute('cx', (currentX + currentWidth).toString());
        elem.setArrowDirection(currentX, currentWidth, this.height);
        elem.gripCircle.setAttribute('transform', 'translate(' + (currentX + currentWidth / 2 + ((this.isVertical ? 1 : -1) * padding)) +
            ',' + (this.isVertical ? (this.axis.scrollbarSettings.height / 2 + padding / 2) - 0.5 : (this.axis.scrollbarSettings.height / 2 - padding / 2) - 0.5) + ') rotate(' + (this.isVertical ? '180' : '0') + ')');
    };
    /**
     * Method to get default values
     *
     * @returns {void}
     */
    ScrollBar.prototype.getDefaults = function () {
        var axis = this.axis;
        var circleRadius = this.axis.scrollbarSettings.height / 2;
        var padding = 5;
        var gripWidth = 14;
        var minThumbWidth = circleRadius * 2 + padding * 2 + gripWidth;
        if (this.axis.scrollbarSettings.enable) {
            this.isLazyLoad = true;
            this.getLazyDefaults(axis);
        }
        this.isVertical = axis.orientation === 'Vertical';
        var isRtlEnabled = (this.component.enableRtl && !this.isVertical && !axis.isInversed) ||
            (axis.isInversed && !(this.component.enableRtl && !this.isVertical));
        this.zoomFactor = this.isLazyLoad ? this.zoomFactor : axis.zoomFactor;
        this.zoomPosition = this.isLazyLoad ? isRtlEnabled ? 1 - (this.zoomPosition + this.zoomFactor) : this.zoomPosition : isRtlEnabled ?
            1 - (axis.zoomPosition + axis.zoomFactor) : axis.zoomPosition;
        var currentWidth = this.zoomFactor * (this.isVertical ? axis.rect.height : axis.rect.width);
        currentWidth = (this.isLazyLoad && !this.axis.scrollbarSettings.enableZoom) ||
            currentWidth > minThumbWidth ? currentWidth : minThumbWidth;
        this.scrollX = axis.rect.x;
        this.scrollY = axis.rect.y;
        this.width = this.isVertical ? axis.rect.height : axis.rect.width;
        this.height = this.axis.scrollbarSettings.height;
        var currentX = this.zoomPosition * (this.isVertical ? axis.rect.height : this.width);
        var minThumbX = (this.width - minThumbWidth - circleRadius);
        this.scrollElements.thumbRectX = currentX > minThumbX ? minThumbX : currentX < circleRadius ? circleRadius : currentX;
        this.scrollElements.thumbRectWidth = this.isThumbDrag ? this.scrollElements.thumbRectWidth :
            ((currentWidth + this.scrollElements.thumbRectX) < this.width - (circleRadius * 2))
                ? currentWidth : this.width - this.scrollElements.thumbRectX - circleRadius;
    };
    /**
     * Lazy load default values.
     *
     * @param axis
     */
    ScrollBar.prototype.getLazyDefaults = function (axis) {
        var start;
        var end;
        var valueType = axis.valueType;
        var scrollbarSettings = axis.scrollbarSettings;
        var range = axis.scrollbarSettings.range;
        var visibleRange = axis.visibleRange;
        var pointsLength = axis.scrollbarSettings.pointsLength;
        this.valueType = valueType = (!scrollbarSettings.range.minimum || !scrollbarSettings.range.maximum) &&
            scrollbarSettings.pointsLength ? 'Double' : valueType;
        var option = {
            skeleton: 'full',
            type: 'dateTime'
        };
        var dateParser = this.component.intl.getDateParser(option);
        var dateFormatter = this.component.intl.getDateFormat(option);
        switch (valueType) {
            case 'Double':
            case 'Category':
            case 'Logarithmic':
                start = range.minimum ? range.minimum : pointsLength ? 0 : visibleRange.min;
                end = range.maximum ? range.maximum : pointsLength ? (pointsLength - 1) : visibleRange.max;
                break;
            case 'DateTime':
            case 'DateTimeCategory':
                start = range.minimum ? Date.parse(dateParser(dateFormatter(range.minimum))) : visibleRange.min;
                end = range.maximum ? Date.parse(dateParser(dateFormatter(range.maximum))) : visibleRange.max;
                break;
        }
        start = Math.min(start, visibleRange.min);
        end = Math.max(end, visibleRange.max);
        var zoomFactor = (visibleRange.max - visibleRange.min) / (end - start);
        var zoomPosition = (visibleRange.min - start) / (end - start);
        this.zoomFactor = range.minimum || range.maximum ? zoomFactor : (this.axis.maxPointLength / axis.scrollbarSettings.pointsLength);
        this.zoomPosition = range.minimum || range.maximum ? zoomPosition : axis.zoomPosition;
        this.zoomPosition = (this.component.enableRtl && axis.orientation === 'Horizontal' && !axis.isInversed) || (axis.isInversed && !(this.component.enableRtl && axis.orientation === 'Horizontal')) ? 1 - (this.zoomPosition + this.zoomFactor) : this.zoomPosition;
        this.scrollRange.min = start;
        this.scrollRange.max = end;
        this.scrollRange.delta = end - start;
        this.previousStart = visibleRange.min;
        this.previousEnd = visibleRange.max;
    };
    /**
     * Method to get log range
     *
     * @param axis
     */
    ScrollBar.prototype.getLogRange = function (axis) {
        var range = axis.scrollbarSettings.range;
        var start = logBase(range.minimum, axis.logBase);
        var end = logBase(range.maximum, axis.logBase);
        start = isFinite(start) ? start : range.minimum;
        end = isFinite(start) ? end : range.maximum;
        return { minimum: Math.floor(start / 1), maximum: Math.ceil(end / 1) };
    };
    /**
     * Method for injecting scrollbar module.
     *
     * @param axis
     * @param component
     */
    ScrollBar.prototype.injectTo = function (axis, component) {
        axis.zoomingScrollBar = new ScrollBar(component, axis);
    };
    /**
     * Method to destroy scrollbar.
     *
     * @returns {void}
     */
    ScrollBar.prototype.destroy = function () {
        var _this = this;
        if (this.axes) {
            this.axes.map(function (axis) {
                axis.zoomingScrollBar.destroy();
            });
        }
        else {
            this.elements.map(function (element) {
                _this.unWireEvents(element);
                remove(element.firstChild);
            });
            this.elements = [];
        }
    };
    /**
     * Method to get scrollbar module name.
     *
     * @returns {string}
     */
    ScrollBar.prototype.getModuleName = function () {
        return 'ScrollBar';
    };
    ScrollBar.prototype.getArgs = function (eventName, range, zoomPosition, zoomFactor, currentRanges) {
        var scrollArgs = {
            axis: (this.component.isBlazor ? {} : this.axis),
            name: eventName,
            range: this.axis.visibleRange,
            zoomFactor: this.axis.zoomFactor,
            zoomPosition: this.axis.zoomPosition,
            previousRange: range,
            previousZoomFactor: zoomFactor,
            previousZoomPosition: zoomPosition,
            currentRange: currentRanges
        };
        return scrollArgs;
    };
    return ScrollBar;
}());
export { ScrollBar };
