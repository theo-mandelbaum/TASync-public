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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable max-len */
/**
 * Circular Gauge
 */
import { Property, NotifyPropertyChanges, Component, animationMode } from '@syncfusion/ej2-base';
import { Complex, Browser, isNullOrUndefined } from '@syncfusion/ej2-base';
import { Event, EventHandler, Collection, Internationalization } from '@syncfusion/ej2-base';
import { remove, createElement } from '@syncfusion/ej2-base';
import { SvgRenderer } from '@syncfusion/ej2-svg-base';
import { removeElement, getElement, stringToNumber, measureText, toPixel, textElement, getAngleFromValue, getAngleFromLocation, getPathArc, getPointer, RectOption, Size, GaugeLocation, Rect, TextOption } from './utils/helper-common';
import { setStyles, getValueFromAngle, getRange } from './utils/helper-circular-gauge';
import { Border, Margin, Font, TooltipSettings, LegendSettings } from './model/base';
import { Axis } from './axes/axis';
import { Annotations } from './annotations/annotations';
import { GaugeTooltip } from './user-interaction/tooltip';
import { load, loaded, gaugeMouseMove, gaugeMouseLeave, gaugeMouseDown, pointerMove } from './model/constants';
import { rangeMove, pointerStart, rangeStart, pointerEnd, rangeEnd } from './model/constants';
import { gaugeMouseUp, dragEnd, dragMove, dragStart, resized } from './model/constants';
import { AxisLayoutPanel } from './axes/axis-panel';
import { getThemeStyle } from './model/theme';
import { textTrim, titleTooltip } from './utils/helper-legend';
import { Legend } from './legend/legend';
import { PdfExport } from './model/pdf-export';
import { ImageExport } from './model/image-export';
import { Print } from './model/print';
import { Gradient } from './axes/gradient';
/**
 * Represents the circular gauge control. This is used to customize the properties of the circular gauge to visualize the data in circular scale.
 * ```html
 * <div id="gauge"/>
 * <script>
 *   var gaugeObj = new CircularGauge();
 *   gaugeObj.appendTo("#gauge");
 * </script>
 * ```
 */
var CircularGauge = /** @class */ (function (_super) {
    __extends(CircularGauge, _super);
    /**
     * Constructor for creating the widget
     *
     * @param {CircularGaugeModel} options - Specifies the options
     * @param {string} element - Specifies the element
     * @hidden
     */
    function CircularGauge(options, element) {
        var _this = _super.call(this, options, element) || this;
        /** @private */
        _this.allowLoadingAnimation = false;
        /** @private */
        _this.isRangeUpdate = false;
        /** @private */
        _this.isAnimationProgress = true;
        /** @private */
        _this.isResize = false;
        /** @private */
        _this.isOverAllAnimationComplete = false;
        /** @private */
        _this.isDrag = false;
        /**
         * @private
         */
        _this.gradientCount = 0;
        CircularGauge_1.Inject(Gradient);
        if (element) {
            _this.appendTo(element);
        }
        return _this;
    }
    CircularGauge_1 = CircularGauge;
    /**
     * To create svg object, renderer and binding events for the container.
     *
     * @returns {void}
     */
    CircularGauge.prototype.preRender = function () {
        if (!isNullOrUndefined(this.element)) {
            this.unWireEvents();
            this.trigger(load, { gauge: this });
            this.initPrivateVariable();
            this.setCulture();
            this.createSvg();
            this.wireEvents();
        }
    };
    /**
     * To render the circular gauge elements
     *
     * @returns {void}
     */
    CircularGauge.prototype.render = function () {
        if (!isNullOrUndefined(this.element)) {
            this.setTheme();
            this.calculateBounds();
            this.isPropertyChange = false;
            this.allowLoadingAnimation = ((this.animationDuration === 0 && animationMode === 'Enable') || this.animationDuration > 0)
                && !this.isOverAllAnimationComplete;
            this.renderElements(true);
            this.renderAnimation();
            this.renderComplete();
        }
    };
    CircularGauge.prototype.setTheme = function () {
        this.themeStyle = getThemeStyle(this.theme);
    };
    /**
     * Method to unbind events for circular gauge
     *
     * @returns {void}
     */
    CircularGauge.prototype.unWireEvents = function () {
        EventHandler.remove(this.element, Browser.touchStartEvent, this.gaugeOnMouseDown);
        EventHandler.remove(this.element, Browser.touchMoveEvent, this.mouseMove);
        EventHandler.remove(this.element, Browser.touchEndEvent, this.mouseEnd);
        EventHandler.remove(this.element, 'click', this.gaugeOnMouseClick);
        EventHandler.remove(this.element, 'contextmenu', this.gaugeRightClick);
        EventHandler.remove(this.element, (Browser.isPointer ? 'pointerleave' : 'mouseleave'), this.mouseLeave);
        window.removeEventListener((Browser.isTouch && ('orientation' in window && 'onorientationchange' in window)) ? 'orientationchange' : 'resize', this.resizeEvent);
    };
    /**
     * Method to bind events for circular gauge
     *
     * @returns {void}
     */
    CircularGauge.prototype.wireEvents = function () {
        /*! Bind the Event handler */
        EventHandler.add(this.element, Browser.touchStartEvent, this.gaugeOnMouseDown, this);
        EventHandler.add(this.element, Browser.touchMoveEvent, this.mouseMove, this);
        EventHandler.add(this.element, Browser.touchEndEvent, this.mouseEnd, this);
        EventHandler.add(this.element, 'click', this.gaugeOnMouseClick, this);
        EventHandler.add(this.element, 'contextmenu', this.gaugeRightClick, this);
        EventHandler.add(this.element, (Browser.isPointer ? 'pointerleave' : 'mouseleave'), this.mouseLeave, this);
        this.resizeEvent = this.gaugeResize.bind(this);
        window.addEventListener((Browser.isTouch && ('orientation' in window && 'onorientationchange' in window)) ? 'orientationchange' : 'resize', this.resizeEvent);
        /*! Apply the style for circular gauge */
        this.setGaugeStyle(this.element);
    };
    /**
     * Handles the mouse click on accumulation chart.
     *
     * @param {PointerEvent} e - Specifies the pointer event
     * @returns {boolean} - Returns the boolean value
     * @private
     */
    CircularGauge.prototype.gaugeOnMouseClick = function (e) {
        this.setMouseXY(e);
        if (this.legendModule && this.legendSettings.visible) {
            this.legendModule.click(e);
        }
        return false;
    };
    /**
     * Handles the mouse move.
     *
     * @param {PointerEvent} e - Specifies the pointer event
     * @returns {boolean} - Returns the boolean value
     * @private
     */
    CircularGauge.prototype.mouseMove = function (e) {
        var _this = this;
        this.setMouseXY(e);
        var args = this.getMouseArgs(e, 'touchmove', gaugeMouseMove);
        this.trigger('gaugeMouseMove', args, function (observedArgs) {
            var dragArgs;
            var pointerDrag = false;
            if ((!isNullOrUndefined(_this.activePointer) ? _this.activePointer.pathElement[0].id === args.target.id : true)) {
                var pointerIndex = args.target.id.indexOf('_Pointer_') > -1 ? parseInt(args.target.id.slice(-1), 10) : null;
                var axisIndex = args.target.id.indexOf('_Axis_') > -1 ? parseInt(args.target.id.split('_Axis_')[1], 10) : null;
                pointerDrag = (_this.allowPointerDrag && !isNullOrUndefined(axisIndex) && !isNullOrUndefined(pointerIndex))
                    ? _this.axes[axisIndex].pointers[pointerIndex].enableDrag
                    : _this.enablePointerDrag;
                _this.isPointerDragged = pointerDrag;
            }
            if (!args.cancel) {
                if ((_this.isPointerDragged || _this.enableRangeDrag) && _this.svgObject.getAttribute('cursor') !== 'grabbing') {
                    if ((args.target.id.indexOf('_Pointer_') !== -1 && _this.isPointerDragged) || (_this.enableRangeDrag && args.target.id.indexOf('_Range_') !== -1)) {
                        _this.svgObject.setAttribute('cursor', 'pointer');
                    }
                    else {
                        _this.svgObject.setAttribute('cursor', 'auto');
                    }
                }
                else if (_this.svgObject.getAttribute('cursor') !== 'grabbing') {
                    _this.svgObject.setAttribute('cursor', 'auto');
                }
                var svgElement = getElement(_this.element.id + '_svg');
                var extraWidth = _this.element.getBoundingClientRect().left - svgElement.getBoundingClientRect().left;
                if (_this.isPointerDragged && _this.activePointer) {
                    _this.isDrag = true;
                    e.preventDefault();
                    var dragPointInd = parseInt(_this.activePointer.pathElement[0].id.slice(-1), 10);
                    var dragAxisInd = parseInt(_this.activePointer.pathElement[0].id.split('_Axis_')[1], 10);
                    dragArgs = {
                        axis: _this.activeAxis,
                        pointer: _this.activePointer,
                        previousValue: _this.activePointer.currentValue,
                        name: dragMove,
                        type: pointerMove,
                        currentValue: null,
                        axisIndex: dragAxisInd,
                        pointerIndex: dragPointInd
                    };
                    _this.pointerDrag(new GaugeLocation(args.x + extraWidth, args.y), dragAxisInd, dragPointInd);
                    dragArgs.currentValue = _this.activePointer.currentValue;
                    _this.trigger(dragMove, dragArgs);
                    _this.activeRange = null;
                }
                else if (_this.enableRangeDrag && _this.activeRange) {
                    _this.isDrag = true;
                    e.preventDefault();
                    var dragAxisInd = parseInt(_this.activeRange.pathElement[0].id.split('_Axis_')[1], 10);
                    var dragRangeInd = parseInt(_this.activeRange.pathElement[0].id.split('Range_')[1], 10);
                    dragArgs = {
                        axis: _this.activeAxis,
                        name: dragMove,
                        type: rangeMove,
                        range: _this.activeRange,
                        axisIndex: dragAxisInd,
                        rangeIndex: dragRangeInd
                    };
                    _this.rangeDrag(new GaugeLocation(args.x + extraWidth, args.y), dragAxisInd, dragRangeInd);
                    _this.trigger(dragMove, dragArgs);
                }
            }
        });
        this.notify(Browser.touchMoveEvent, e);
        titleTooltip(e, e.clientX, e.clientY, this, false);
        return false;
    };
    /**
     * Handles the mouse leave.
     *
     * @param {PointerEvent} e - Specifies the pointer event
     * @returns {boolean} - Returns the boolean value
     * @private
     */
    CircularGauge.prototype.mouseLeave = function (e) {
        this.setMouseXY(e);
        this.activeAxis = null;
        this.activePointer = null;
        this.activeRange = null;
        this.svgObject.setAttribute('cursor', 'auto');
        var args = this.getMouseArgs(e, 'touchmove', gaugeMouseLeave);
        this.trigger(gaugeMouseLeave, args);
        return false;
    };
    /**
     * Handles the mouse right click.
     *
     * @param {MouseEvent | PointerEvent} event - Specifies the pointer or mouse event.
     * @returns {boolean} - Returns the boolean value.
     * @private
     */
    CircularGauge.prototype.gaugeRightClick = function (event) {
        if (event.buttons === 2 || event.pointerType === 'touch') {
            event.preventDefault();
            event.stopPropagation();
            return false;
        }
        return true;
    };
    /**
     * Handles the pointer draf while mouse move on gauge.
     *
     * @param {GaugeLocation} location - Specifies the location of the gauge
     * @param {number} axisIndex - Specifies the axis index
     * @param {number} pointerIndex - Specifies the pointer index
     * @returns {void}
     * @private
     */
    CircularGauge.prototype.pointerDrag = function (location, axisIndex, pointerIndex) {
        var axis = this.activeAxis;
        var range = axis.visibleRange;
        var value = getValueFromAngle(getAngleFromLocation(this.midPoint, location), range.max, range.min, axis.startAngle, axis.endAngle, axis.direction === 'ClockWise');
        if (value >= range.min && value <= range.max) {
            this.axes[axisIndex].pointers[pointerIndex].value = value;
            this.activePointer.currentValue = value;
            this.gaugeAxisLayoutPanel.pointerRenderer.setPointerValue(axis, this.activePointer, value);
        }
    };
    /**
     * Handles the range draf while mouse move on gauge.
     *
     * @param {GaugeLocation} location - Specifies the gauge location
     * @param {number} axisIndex - Specifies the axis index
     * @param {number} rangeIndex - Specifies the range index
     * @returns {void}
     * @private
     */
    CircularGauge.prototype.rangeDrag = function (location, axisIndex, rangeIndex) {
        if (this.activeAxis) {
            var axis = this.activeAxis;
            var range = axis.visibleRange;
            var value = getValueFromAngle(getAngleFromLocation(this.midPoint, location), range.max, range.min, axis.startAngle, axis.endAngle, axis.direction === 'ClockWise');
            if (value >= range.min && value <= range.max) {
                var previousValue1 = this.activeRange.currentValue;
                this.activeRange.currentValue = value;
                var add = (this.activeRange.end - this.activeRange.start);
                var div = add / 2;
                var avg = parseFloat(this.activeRange.start.toString()) + div;
                var start = typeof this.activeRange.start === 'string' ? parseFloat(this.activeRange.start) : this.activeRange.start;
                var end = typeof this.activeRange.end === 'string' ? parseFloat(this.activeRange.end) : this.activeRange.end;
                this.startValue = (value < avg) ? value : ((previousValue1 < avg) ? previousValue1 : ((start < end) ? this.activeRange.start : this.activeRange.end));
                this.endValue = (value < avg) ? ((previousValue1 > avg) ? previousValue1 : ((start < end) ? this.activeRange.end : this.activeRange.start)) : value;
                this.axes[axisIndex].ranges[rangeIndex].start = this.startValue;
                this.axes[axisIndex].ranges[rangeIndex].end = this.endValue;
                if (this.isTouch) {
                    this.setRangeValue(axisIndex, rangeIndex, this.startValue, this.endValue);
                }
            }
        }
    };
    /**
     * Handles the mouse down on gauge.
     *
     * @param {PointerEvent} e - Specifies the pointer event
     * @returns {boolean} - Returns the boolean value
     * @private
     */
    CircularGauge.prototype.gaugeOnMouseDown = function (e) {
        var _this = this;
        this.setMouseXY(e);
        var currentPointer;
        var currentRange;
        var args = this.getMouseArgs(e, 'touchstart', gaugeMouseDown);
        var pointerDrag = false;
        var pointerIndex = args.target.id.indexOf('_Pointer_') > -1 ? parseInt(args.target.id.slice(-1), 10) : null;
        var axisIndex = args.target.id.indexOf('_Axis_') > -1 ? parseInt(args.target.id.split('_Axis_')[1], 10) : null;
        if (!isNullOrUndefined(axisIndex) && !isNullOrUndefined(pointerIndex)) {
            pointerDrag = this.allowPointerDrag ? this.axes[axisIndex].pointers[pointerIndex].enableDrag
                : this.enablePointerDrag;
        }
        this.trigger('gaugeMouseDown', args, function (observedArgs) {
            if (!args.cancel &&
                args.target.id.indexOf(_this.element.id + '_Axis_') >= 0 &&
                args.target.id.indexOf('_Pointer_') >= 0) {
                currentPointer = getPointer(args.target.id, _this);
                _this.activeAxis = _this.axes[currentPointer.axisIndex];
                _this.activePointer = _this.activeAxis.pointers[currentPointer.pointerIndex];
                if (isNullOrUndefined(_this.activePointer.pathElement)) {
                    _this.activePointer.pathElement = [e.target];
                }
                if (_this.activePointer.type === 'Marker' && _this.activePointer.markerShape === 'Text' && _this.activePointer.pathElement.length === 0) {
                    _this.activePointer.pathElement = [e.target];
                }
                var pointInd = parseInt(_this.activePointer.pathElement[0].id.slice(-1), 10);
                var axisInd = parseInt(_this.activePointer.pathElement[0].id.split('_Axis_')[1], 10);
                _this.trigger(dragStart, {
                    axis: _this.activeAxis,
                    name: dragStart,
                    type: pointerStart,
                    pointer: _this.activePointer,
                    currentValue: _this.activePointer.currentValue,
                    pointerIndex: pointInd,
                    axisIndex: axisInd
                });
                if (pointerDrag) {
                    _this.svgObject.setAttribute('cursor', 'grabbing');
                }
            }
            else if (!args.cancel &&
                args.target.id.indexOf(_this.element.id + '_Axis_') >= 0 &&
                args.target.id.indexOf('_Range_') >= 0) {
                currentRange = getRange(args.target.id, _this);
                _this.activeAxis = _this.axes[currentRange.axisIndex];
                _this.activeRange = _this.activeAxis.ranges[currentRange.rangeIndex];
                if (isNullOrUndefined(_this.activeRange.pathElement)) {
                    _this.activeRange.pathElement = [e.target];
                }
                var rangeInd = parseInt(_this.activeRange.pathElement[0].id.split('Range_')[1], 10);
                var axisInd = parseInt(_this.activeRange.pathElement[0].id.split('_Axis_')[1], 10);
                _this.trigger(dragStart, {
                    axis: _this.activeAxis,
                    name: dragStart,
                    type: rangeStart,
                    range: _this.activeRange,
                    axisIndex: axisInd,
                    rangeIndex: rangeInd
                });
                if (_this.enableRangeDrag) {
                    _this.svgObject.setAttribute('cursor', 'grabbing');
                }
            }
        });
        return false;
    };
    /**
     * Handles the mouse end.
     *
     * @param {PointerEvent} e - Specifies the pointer event
     * @returns {boolean} - Returns the boolean value
     * @private
     */
    CircularGauge.prototype.mouseEnd = function (e) {
        this.setMouseXY(e);
        var args = this.getMouseArgs(e, 'touchend', gaugeMouseUp);
        this.isTouch = e.pointerType === 'touch' || e.pointerType === '2' || e.type === 'touchend';
        this.trigger(gaugeMouseUp, args);
        var pointerDrag = false;
        if (this.activeAxis && this.activePointer) {
            var pointerIndex = parseInt(this.activePointer.pathElement[0].id.slice(-1), 10);
            var axisIndex = parseInt(this.activePointer.pathElement[0].id.split('_Axis_')[1], 10);
            if (!isNullOrUndefined(axisIndex) && !isNullOrUndefined(pointerIndex)) {
                pointerDrag = this.allowPointerDrag ? this.axes[axisIndex].pointers[pointerIndex].enableDrag
                    : this.enablePointerDrag;
            }
            if (pointerDrag) {
                this.svgObject.setAttribute('cursor', 'auto');
                this.trigger(dragEnd, {
                    name: dragEnd,
                    type: pointerEnd,
                    axis: this.activeAxis,
                    pointer: this.activePointer,
                    currentValue: this.activePointer.currentValue,
                    axisIndex: axisIndex,
                    pointerIndex: pointerIndex
                });
                this.activeAxis = null;
                this.activePointer = null;
                this.isPointerDragged = false;
            }
        }
        else if (this.activeAxis && this.activeRange && this.enableRangeDrag) {
            this.svgObject.setAttribute('cursor', 'auto');
            var rangeInd = parseInt(this.activeRange.pathElement[0].id.slice(-1), 10);
            var axisInd = parseInt(this.activeRange.pathElement[0].id.split('_Axis_')[1], 10);
            this.trigger(dragEnd, {
                name: dragEnd,
                type: rangeEnd,
                axis: this.activeAxis,
                range: this.activeRange,
                axisIndex: axisInd,
                rangeIndex: rangeInd
            });
            this.activeAxis = null;
            this.activeRange = null;
        }
        if (!isNullOrUndefined(this.activePointer)) {
            this.activePointer = null;
        }
        this.isDrag = false;
        this.svgObject.setAttribute('cursor', 'auto');
        this.notify(Browser.touchEndEvent, e);
        if (e.type.indexOf('touch') > -1 && (args.target.id === (this.element.id + '_CircularGaugeTitle') || args.target.id.indexOf('_gauge_legend_') > -1)) {
            var touchArg = e;
            titleTooltip(e, touchArg.changedTouches[0].pageX, touchArg.changedTouches[0].pageY, this, true);
        }
        return false;
    };
    /**
     * Handles the mouse event arguments.
     *
     * @param {PointerEvent} e - Specifies the pointer event
     * @param {string} type - Specifies the type
     * @param {string} name - Specifies the name
     * @returns {IMouseEventArgs} - Returns the mouse event args
     * @private
     */
    CircularGauge.prototype.getMouseArgs = function (e, type, name) {
        var rect = this.element.getBoundingClientRect();
        var location = new GaugeLocation(-rect.left, -rect.top);
        var isTouch = (e.type === type);
        location.x += isTouch ? e.changedTouches[0].clientX : e.clientX;
        location.y += isTouch ? e.changedTouches[0].clientY : e.clientY;
        return {
            cancel: false, name: name,
            x: location.x, y: location.y,
            target: isTouch ? e.target : e.target
        };
    };
    /**
     * Handles the gauge resize.
     *
     * @param {Event} e - Specifies the event
     * @returns {boolean} - Returns the boolean value
     * @private
     */
    CircularGauge.prototype.gaugeResize = function (e) {
        var _this = this;
        if (!this.isDestroyed) {
            // eslint-disable-next-line prefer-const
            var args = {
                gauge: this,
                previousSize: this.availableSize,
                name: resized,
                cancel: false,
                currentSize: this.calculateSvgSize()
            };
            this.trigger(resized, args);
            if (!args.cancel) {
                if (this.resizeTo) {
                    clearTimeout(this.resizeTo);
                }
                if (!isNullOrUndefined(this.element) && this.element.classList.contains('e-circulargauge')) {
                    this.animatePointer = false;
                    this.resizeTo = window.setTimeout(function () {
                        _this.isResize = true;
                        _this.isPropertyChange = true;
                        _this.createSvg();
                        _this.calculateBounds();
                        _this.allowLoadingAnimation = false;
                        if (_this.isOverAllAnimationComplete) {
                            _this.loadingAnimationDuration = [];
                        }
                        _this.renderElements();
                        _this.isResize = false;
                    }, 500);
                }
            }
        }
        return false;
    };
    /**
     * Applying styles for circular gauge elements
     *
     * @param {HTMLElement} element - Specifies the html element
     * @returns {void}
     */
    CircularGauge.prototype.setGaugeStyle = function (element) {
        element.style.touchAction = 'element';
        element.style.msTouchAction = 'element';
        element.style.msContentZooming = 'none';
        element.style.msUserSelect = 'none';
        element.style.webkitUserSelect = 'none';
        element.style.position = 'relative';
    };
    /**
     * Method to set culture for gauge
     *
     * @returns {void}
     */
    CircularGauge.prototype.setCulture = function () {
        this.intl = new Internationalization();
    };
    /**
     * Methods to create svg element for circular gauge.
     *
     * @returns {void}
     */
    CircularGauge.prototype.createSvg = function () {
        this.removeSvg();
        if (isNullOrUndefined(this.renderer)) {
            this.renderer = new SvgRenderer(this.element.id);
        }
        if (isNullOrUndefined(this.gaugeAxisLayoutPanel)) {
            this.gaugeAxisLayoutPanel = new AxisLayoutPanel(this);
        }
        this.availableSize = this.calculateSvgSize();
        this.svgObject = this.renderer.createSvg({
            id: this.element.id + '_svg',
            width: this.availableSize.width,
            height: this.availableSize.height
        });
    };
    /**
     * To Remove the SVG from circular gauge.
     *
     * @returns {void}
     * @private
     */
    CircularGauge.prototype.removeSvg = function () {
        if (!isNullOrUndefined(this.element)) {
            removeElement(this.element.id + '_Secondary_Element');
            if (this.svgObject) {
                while (this.svgObject.childNodes.length > 0) {
                    while (this.svgObject.childNodes.length > 0) {
                        this.svgObject.removeChild(this.svgObject.firstChild);
                    }
                    if (!this.svgObject.hasChildNodes() && this.svgObject.parentNode) {
                        remove(this.svgObject);
                    }
                }
                if (!this.svgObject.hasChildNodes() && this.svgObject.parentNode) {
                    remove(this.svgObject);
                }
            }
            removeElement(this.element.id + '_svg');
            this.clearTemplate();
        }
    };
    /**
     * To initialize the circular gauge private variable.
     *
     * @returns {void}
     * @private
     */
    CircularGauge.prototype.initPrivateVariable = function () {
        if (this.element.id === '') {
            var collection = document.getElementsByClassName('e-circulargauge').length;
            this.element.id = 'circulargauge_control_' + collection;
        }
        this.renderer = new SvgRenderer(this.element.id);
        this.gaugeAxisLayoutPanel = new AxisLayoutPanel(this);
        this.animatePointer = true;
    };
    /**
     * To calculate the size of the circular gauge element.
     *
     * @returns {void}
     */
    CircularGauge.prototype.calculateSvgSize = function () {
        var containerWidth = this.element.offsetWidth;
        var containerHeight = this.element.offsetHeight;
        var borderWidth = parseInt(this.element.style.borderWidth.split('px').join(''), 10) * 2;
        var width = stringToNumber(this.width, containerWidth) || containerWidth || 600;
        var height = stringToNumber(this.height, containerHeight) || containerHeight || 450;
        width = !isNaN(borderWidth) ? (width - borderWidth) : width;
        height = !isNaN(borderWidth) ? (height - borderWidth) : height;
        return new Size(width, height);
    };
    /**
     * To calculate the spacing of the circular gauge element.
     *
     * @param {number} top - Specifies the top value
     * @param {number} left - Specifies the left value
     * @param {number} width - Specifies the width
     * @param {number} height - Specifies the height
     * @param {number} radius - Specifies the radius
     * @param {number} titleHeight - Specifies the titleHeight
     * @param {number} isUpperAngle - Specifies the isUpperAngle
     * @param {number} isLowerAngle - Specifies the isLowerAngle
     * @param {number} isFullPercent - Specifies the boolean value
     * @param {number} isUpper - Specifies the boolean value
     * @param {number} isLower - Specifies the boolean value
     * @returns {void}
     */
    /* eslint-disable max-len */
    CircularGauge.prototype.radiusAndCenterCalculation = function (top, left, width, height, radius, titleHeight, isUpperAngle, isLowerAngle, isFullPercent, radiusPercent, isUpper, isLower) {
        var rect;
        var bottom = this.margin.bottom + this.border.width;
        var minRadius;
        var widthRadius;
        var centerX;
        var centerY;
        if (this.moveToCenter && this.axes.length === 1 &&
            isNullOrUndefined(this.centerXpoint) && isNullOrUndefined(this.centerYpoint)) {
            rect = new Rect(left, top, width, height);
        }
        else {
            if (!this.allowMargin) {
                if (!isNullOrUndefined(this.legendModule) && (width > height) && (this.legendSettings.position === 'Top' || this.legendSettings.position === 'Bottom')) {
                    minRadius = Math.min(width, height) / 2;
                    rect = new Rect((left + (width / 2) - minRadius), (top + (height / 2) - minRadius), minRadius * 2, minRadius * 2);
                }
                else {
                    if (width > height && (isLowerAngle && isLower || isUpperAngle && isUpper)) {
                        widthRadius = ((width) / 2);
                        var heightValue = isUpper && isLower ? (height / 2) : (height * (3 / 4));
                        if (widthRadius > heightValue) {
                            widthRadius = heightValue;
                        }
                        rect = new Rect((left + (width / 2) - widthRadius), (top + (height / 2) - widthRadius), widthRadius * 2, widthRadius * 2);
                    }
                    else {
                        if (height > width) {
                            var heightRadius = height / 2;
                            rect = new Rect((left + (width / 2) - radius), (top + (height / 2) - heightRadius), radius * 2, heightRadius * 2);
                        }
                        else {
                            rect = new Rect((left + (width / 2) - radius), (top + (height / 2) - radius), radius * 2, radius * 2);
                        }
                    }
                }
            }
            else {
                rect = new Rect((left + (width / 2) - radius), (top + (height / 2) - radius), radius * 2, radius * 2);
            }
        }
        this.gaugeRect = rect;
        if (this.legendModule && this.legendSettings.visible) {
            this.legendModule.getLegendOptions(this.axes);
            this.legendModule.calculateLegendBounds(this.gaugeRect, this.availableSize);
        }
        if (!this.allowMargin) {
            if (!isNullOrUndefined(this.legendModule) && (isUpperAngle || isLowerAngle) && (width > height) && (this.legendSettings.position === 'Top' || this.legendSettings.position === 'Bottom')) {
                var difference = height - this.gaugeRect.height;
                this.gaugeRect.width = width - ((this.availableSize.width - this.gaugeRect.width) / 2);
                this.gaugeRect.y = this.gaugeRect.y - difference;
                this.gaugeRect.height = this.gaugeRect.height + difference + ((this.availableSize.height - this.gaugeRect.height) / 2);
            }
            else if (!isNullOrUndefined(this.legendModule) && (isUpperAngle || isLowerAngle) && (width > height) && (this.legendSettings.position === 'Left' || this.legendSettings.position === 'Right')) {
                var difference = this.gaugeRect.height - this.gaugeRect.width;
                this.gaugeRect.x = this.legendSettings.position === 'Right'
                    ? this.gaugeRect.x + this.margin.right : this.gaugeRect.x;
                this.gaugeRect.width = this.legendSettings.position === 'Left' ?
                    Math.abs(width - ((this.availableSize.width - this.gaugeRect.width + difference) / 2))
                    : Math.abs(width - ((this.availableSize.width - this.gaugeRect.width) / 2) - 10);
            }
            centerX = this.centerXpoint !== null ?
                stringToNumber(this.centerXpoint, this.availableSize.width) : this.gaugeRect.x + (this.gaugeRect.width / 2);
            if ((isUpperAngle || isLowerAngle) && !isNullOrUndefined(this.legendModule)) {
                centerX = (this.legendSettings.position === 'Top' || this.legendSettings.position === 'Bottom')
                    ? this.availableSize.width / 2 : this.legendSettings.position === 'Right' ? (this.gaugeRect.width / 2) + this.margin.right :
                    centerX;
            }
            centerY = ((isUpperAngle || isLowerAngle) ? (isUpperAngle ?
                (((this.gaugeRect.height * (3 / 4) + this.gaugeRect.y) - bottom))
                : (((this.gaugeRect.height * (1 / 4)) + (this.gaugeRect.y)))) : this.gaugeRect.y + (this.gaugeRect.height / 2));
            centerY = !isFullPercent && (isUpperAngle || isLowerAngle) ? (this.gaugeRect.height / 2) + this.gaugeRect.y + (radiusPercent * (3 / 4) * (1 / 2)) : centerY;
            if (!isNullOrUndefined(this.axes) && this.axes.length > 1 && !isNullOrUndefined(this.midPoint)) {
                isUpper = isUpperAngle ? isUpperAngle : isUpper;
                isLower = isLowerAngle ? isLowerAngle : isLower;
                if (isUpper && isLower) {
                    centerY = (this.availableSize.height / 2) - bottom;
                }
            }
        }
        else {
            centerX = this.centerXpoint !== null ?
                stringToNumber(this.centerXpoint, this.availableSize.width) : this.gaugeRect.x + (this.gaugeRect.width / 2);
            centerY = this.centerYpoint !== null ?
                stringToNumber(this.centerYpoint, this.availableSize.height) : this.gaugeRect.y + (this.gaugeRect.height / 2);
        }
        this.midPoint = new GaugeLocation(centerX, centerY);
    };
    /**
     * Method to calculate the availble size for circular gauge.
     *
     * @returns {void}
     */
    CircularGauge.prototype.calculateBounds = function () {
        var padding = 5;
        var rect;
        var margin = this.margin;
        var titleHeight = 0;
        if (this.title) {
            titleHeight = measureText(this.title, this.titleStyle).height + padding;
        }
        var top = margin.top + titleHeight + this.border.width;
        var left = margin.left + this.border.width;
        var isUpper = false;
        var isLower = false;
        var width = this.availableSize.width - left - margin.right - this.border.width;
        var height = this.availableSize.height - top - this.border.width - margin.bottom;
        var radius = Math.min(width, height) / 2;
        this.centerXpoint = (this.centerX === '') ? null : this.centerX;
        this.centerYpoint = (this.centerY === '') ? null : this.centerY;
        if (this.moveToCenter && this.axes.length === 1 &&
            isNullOrUndefined(this.centerXpoint) && isNullOrUndefined(this.centerYpoint)) {
            rect = new Rect(left, top, width, height);
        }
        if (!this.allowMargin) {
            for (var j = 0; j < this.axes.length; j++) {
                var isUpperAngle = 270 <= this.axes[j].startAngle && this.axes[j].startAngle <= 360 &&
                    0 <= this.axes[j].endAngle && this.axes[j].endAngle <= 90;
                var isLowerAngle = 90 >= this.axes[j].startAngle && this.axes[j].startAngle <= 180 &&
                    180 <= this.axes[j].endAngle && 270 <= this.axes[j].endAngle && 0 !== this.axes[j].startAngle &&
                    360 !== this.axes[j].endAngle;
                isUpper = isUpperAngle ? isUpperAngle : isUpper;
                isLower = isLowerAngle ? isLowerAngle : isLower;
                var isFullPercent = this.axes[j].radius !== null ? parseInt(this.axes[0].radius.split('%')[0], 10) >= 100 : true;
                var radiusPercent = this.axes[j].radius !== null ? radius * (parseInt(this.axes[0].radius.split('%')[0], 10) / 100) : radius;
                this.radiusAndCenterCalculation(top, left, width, height, radius, titleHeight, isUpperAngle, isLowerAngle, isFullPercent, radiusPercent, isUpper, isLower);
            }
        }
        else {
            rect = new Rect((left + (width / 2) - radius), (top + (height / 2) - radius), radius * 2, radius * 2);
            this.radiusAndCenterCalculation(top, left, width, height, radius, titleHeight, false, false, null, null, false, false);
        }
        this.gaugeAxisLayoutPanel.measureAxis(this.gaugeRect);
    };
    /**
     * To render elements for circular gauge
     *
     * @param {boolean} animate - Specifies whether animation is true or false
     * @returns {void}
     */
    CircularGauge.prototype.renderElements = function (animate) {
        if (animate === void 0) { animate = true; }
        this.renderBorder();
        this.renderTitle();
        this.gaugeAxisLayoutPanel.renderAxes(animate);
        this.renderLegend();
        this.element.appendChild(this.svgObject);
        this.trigger(loaded, { gauge: this });
        removeElement('gauge-measuretext');
    };
    CircularGauge.prototype.renderAnimation = function () {
        if (this.allowLoadingAnimation) {
            for (var i = 0; i < this.axes.length; i++) {
                this.gaugeAxisLayoutPanel.axisLineAnimation(i, this.loadingAnimationDuration[i], this);
            }
        }
    };
    /**
     * Method to render legend for accumulation chart
     *
     * @returns {void}
     */
    CircularGauge.prototype.renderLegend = function () {
        if (!this.legendModule || !this.legendSettings.visible) {
            return null;
        }
        if (this.legendModule.legendCollection.length) {
            this.legendModule.renderLegend(this.legendSettings, this.legendModule.legendBounds);
        }
    };
    /**
     * Method to render the title for circular gauge.
     *
     * @returns {void}
     */
    CircularGauge.prototype.renderTitle = function () {
        if (this.title) {
            // eslint-disable-next-line prefer-const
            var style = {
                color: this.titleStyle.color,
                size: this.titleStyle.size || this.themeStyle.titleFontSize,
                fontFamily: this.titleStyle.fontFamily || this.themeStyle.fontFamily,
                fontStyle: this.titleStyle.fontStyle,
                fontWeight: this.titleStyle.fontWeight || this.themeStyle.titleFontWeight,
                opacity: this.titleStyle.opacity
            };
            var titleSize = style.size;
            if (!isNaN(Number(titleSize))) {
                style.size = titleSize + 'px';
            }
            var width = Math.abs((this.margin.left + this.margin.right) - this.availableSize.width);
            var trimmedTitle = textTrim(width, this.title, style);
            var size = measureText(trimmedTitle, style);
            var options = new TextOption(this.element.id + '_CircularGaugeTitle', this.availableSize.width / 2, this.margin.top + 3 * (size.height / 4), 'middle', trimmedTitle);
            var element = textElement(options, style, style.color || this.themeStyle.titleFontColor, this.svgObject, '');
            element.setAttribute('aria-label', this.description || this.title);
            element.setAttribute('role', 'region');
            element.setAttribute('tabindex', this.tabIndex.toString());
        }
    };
    /**
     * Method to render the border for circular gauge.
     *
     * @returns {void}
     */
    CircularGauge.prototype.renderBorder = function () {
        var borderWidth = this.border.width;
        if (borderWidth > 0 || (this.background || this.themeStyle.backgroundColor)) {
            this.svgObject.appendChild(this.renderer.drawRectangle(new RectOption(this.element.id + '_CircularGaugeBorder', this.background || this.themeStyle.backgroundColor, this.border, null, new Rect(borderWidth / 2, borderWidth / 2, this.availableSize.width - borderWidth, this.availableSize.height - borderWidth))));
        }
    };
    /* eslint-disable valid-jsdoc */
    /**
     * This method is used to set the pointer value dynamically for circular gauge.
     *
     * @param {number} axisIndex - Specifies the index value for the axis in circular gauge.
     * @param {number} pointerIndex - Specifies the index value for the pointer in circular gauge.
     * @param {number} value - Specifies the value for the pointer in circular gauge.
     */
    CircularGauge.prototype.setPointerValue = function (axisIndex, pointerIndex, value) {
        var _this = this;
        var axis = this.axes[axisIndex];
        var pointer = axis.pointers[pointerIndex];
        var pointerRadius = pointer.currentRadius;
        this.allowLoadingAnimation = false;
        if (!this.isDestroyed && pointer.currentValue !== value) {
            var enableAnimation_1 = pointer.animation.enable || animationMode === 'Enable';
            value = value < axis.visibleRange.min ? axis.visibleRange.min : value;
            value = value > axis.visibleRange.max ? axis.visibleRange.max : value;
            pointer['isPointerAnimation'] = true;
            document.getElementById(this.element.id + '_Axis_' + axisIndex + '_Pointer_' + pointerIndex).style.visibility = 'visible';
            if (!isNullOrUndefined(pointer.pathElement)) {
                pointer.pathElement.map(function (element) {
                    if (pointer.type === 'RangeBar') {
                        setStyles(element, pointer.color, pointer.border);
                        if (enableAnimation_1) {
                            _this.gaugeAxisLayoutPanel.pointerRenderer.performRangeBarAnimation(element, pointer.currentValue, value, axis, pointer, axisIndex);
                        }
                        else {
                            _this.isAnimationProgress = false;
                            _this.gaugeAxisLayoutPanel.pointerRenderer.setPointerValue(axis, pointer, value);
                        }
                    }
                    else {
                        if (element.id.indexOf('_Pointer_NeedleCap_') >= 0) {
                            setStyles(element, pointer.cap.color, pointer.cap.border);
                        }
                        else if (element.id.indexOf('_Pointer_NeedleTail_') >= 0) {
                            setStyles(element, pointer.needleTail.color, pointer.needleTail.border);
                        }
                        else if (element.id.indexOf('_Pointer_NeedleRect_') >= 0) {
                            setStyles(element, 'transparent', { color: 'transparent', width: 0 });
                        }
                        else if (pointer.type === 'Marker' && pointer.markerShape !== 'Text') {
                            setStyles(element, pointer.color, pointer.border);
                        }
                        if (enableAnimation_1) {
                            if (pointer.type === 'Marker' && pointer.markerShape === 'Text') {
                                _this.gaugeAxisLayoutPanel.pointerRenderer.performTextAnimation(element, pointer.currentValue, value, axis, pointer, axisIndex);
                            }
                            else {
                                _this.gaugeAxisLayoutPanel.pointerRenderer.performNeedleAnimation(element, pointer.currentValue, value, axis, pointer, axisIndex);
                            }
                        }
                        else {
                            _this.gaugeAxisLayoutPanel.pointerRenderer.setPointerValue(axis, pointer, value);
                        }
                    }
                });
            }
            if (this.allowLoadingAnimation && !pointer.animation.enable) {
                this.allowLoadingAnimation = false;
                pointer.value = value;
            }
        }
        this.isProtectedOnChange = true;
        pointer.previousValue = pointer.currentValue;
        pointer.currentValue = value;
        pointer.value = value;
        this.isProtectedOnChange = false;
    };
    /**
     * This method is used to set the annotation content dynamically for circular gauge.
     *
     * @param {number} axisIndex - Specifies the index value for the axis in circular gauge.
     * @param {number} annotationIndex - Specifies the index value for the annotation in circular gauge.
     * @param {string | Function} content - Specifies the content for the annotation in circular gauge.
     * @returns {void}
     */
    CircularGauge.prototype.setAnnotationValue = function (axisIndex, annotationIndex, content) {
        if (!this.isDestroyed) {
            this.allowLoadingAnimation = false;
            var isElementExist = getElement(this.element.id + '_Annotations_' + axisIndex) !== null;
            var element = getElement(this.element.id + '_Annotations_' + axisIndex) ||
                createElement('div', {
                    id: this.element.id + '_Annotations_' + axisIndex, styles: this.animationDuration > 0 ? 'opacity: 0' : 'opacity: 1'
                });
            var annotation = this.axes[axisIndex].annotations[annotationIndex];
            if (content !== null) {
                removeElement(this.element.id + '_Axis_' + axisIndex + '_Annotation_' + annotationIndex);
                annotation.content = content;
                this.annotationsModule.createTemplate(element, annotationIndex, axisIndex, this);
                var secondaryElement = getElement(this.element.id + '_Secondary_Element');
                if (!isElementExist && !isNullOrUndefined(secondaryElement)) {
                    secondaryElement.appendChild(element);
                }
            }
        }
    };
    /**
     * This method is used to print the rendered circular gauge.
     *
     * @param {string[] | string | Element} id - Specifies the element to print the circular gauge.
     */
    CircularGauge.prototype.print = function (id) {
        if (this.allowPrint && this.printModule) {
            this.printModule.print(this, id);
        }
    };
    /**
     * This method is used to perform the export functionality for the circular gauge.
     *
     * @param {ExportType} type - Specifies the type of the export.
     * @param {string} fileName - Specifies the file name for the exported file.
     * @param {PdfPageOrientation}  orientation - Specifies the orientation for the exported PDF document.
     * @param {boolean} allowDownload - Specifies whether to download as a file.
     * @returns {Promise<string>} - Specifies the base64 string of the exported image which is returned when the allowDownload is set to false.
     */
    CircularGauge.prototype.export = function (type, fileName, orientation, allowDownload) {
        var _this = this;
        if (isNullOrUndefined(allowDownload)) {
            allowDownload = true;
        }
        if (type === 'PDF' && this.allowPdfExport && this.pdfExportModule) {
            // eslint-disable-next-line
            return new Promise(function (resolve, reject) {
                resolve(_this.pdfExportModule.export(_this, type, fileName, orientation, allowDownload));
            });
        }
        else if (this.allowImageExport && (type !== 'PDF') && this.imageExportModule) {
            // eslint-disable-next-line
            return new Promise(function (resolve, reject) {
                resolve(_this.imageExportModule.export(_this, type, fileName, allowDownload));
            });
        }
        return null;
    };
    /**
     * Method to set mouse x, y from events
     *
     * @param {PointerEvent} e - Specifies the pointer event
     * @returns {void}
     */
    CircularGauge.prototype.setMouseXY = function (e) {
        var pageX;
        var pageY;
        var svgRect = getElement(this.element.id + '_svg').getBoundingClientRect();
        var rect = this.element.getBoundingClientRect();
        if (e.type.indexOf('touch') > -1) {
            this.isTouch = true;
            var touchArg = e;
            pageY = touchArg.changedTouches[0].clientY;
            pageX = touchArg.changedTouches[0].clientX;
        }
        else {
            this.isTouch = e.pointerType === 'touch' || e.pointerType === '2';
            pageX = e.clientX;
            pageY = e.clientY;
        }
        this.mouseY = (pageY - rect.top) - Math.max(svgRect.top - rect.top, 0);
        this.mouseX = (pageX - rect.left) - Math.max(svgRect.left - rect.left, 0);
    };
    /**
     * This method is used to set the range values dynamically for circular gauge.
     *
     * @param {number} axisIndex - Specifies the index value for the axis in circular gauge.
     * @param {number} rangeIndex - Specifies the index value for the range in circular gauge.
     * @param {number} start - Specifies the start value for the current range in circular gauge.
     * @param {number} end - Specifies the end value for the current range in circular gauge.
     */
    CircularGauge.prototype.setRangeValue = function (axisIndex, rangeIndex, start, end) {
        this.allowLoadingAnimation = false;
        var element = getElement(this.element.id + '_Axis_' + axisIndex + '_Range_' + rangeIndex);
        var axis = this.axes[axisIndex];
        var range = axis.ranges[rangeIndex];
        var axisRange = axis.visibleRange;
        var isClockWise = axis.direction === 'ClockWise';
        var startValue = Math.min(Math.max(start, axisRange.min), end);
        var endValue = Math.min(Math.max(start, end), axisRange.max);
        var oldRangeStart = range.start;
        var oldRangeEnd = range.end;
        range.start = start;
        range.end = end;
        if (range.start !== range.end && oldRangeStart === oldRangeEnd && this.legendModule && this.legendSettings.visible) {
            this.legendModule.getLegendOptions(this.axes);
            var height = this.legendModule.legendBounds.height + this.legendSettings.margin.top + this.legendSettings.margin.bottom + this.legendSettings.border.width;
            var width = this.legendModule.legendBounds.width + this.legendSettings.margin.left + this.legendSettings.margin.right + this.legendSettings.border.width;
            // eslint-disable-next-line prefer-const
            var rect = this.gaugeRect;
            var position = this.legendModule.position;
            if (position === 'Bottom') {
                rect.height = rect.height + height;
            }
            if (position === 'Top') {
                rect.height = rect.height + height;
                rect.y = rect.y - height;
            }
            if (position === 'Left') {
                rect.width = rect.width + width;
                rect.x = rect.x - width;
            }
            if (position === 'Right') {
                rect.width = rect.width + width;
            }
            this.legendModule.calculateLegendBounds(rect, this.availableSize);
            if (this.legendModule.legendCollection.length) {
                this.legendModule.renderLegend(this.legendSettings, this.legendModule.legendBounds);
            }
        }
        this.isRangeUpdate = true;
        var startAngle = getAngleFromValue(startValue, axisRange.max, axisRange.min, axis.startAngle, axis.endAngle, isClockWise);
        var endAngle = getAngleFromValue(endValue, axisRange.max, axisRange.min, axis.startAngle, axis.endAngle, isClockWise);
        var startWidth;
        if (!isNullOrUndefined(range.startWidth) && range.startWidth.length > 0) {
            startWidth = toPixel(range.startWidth, range.currentRadius);
        }
        else {
            startWidth = range.startWidth;
        }
        var endWidth;
        if (!isNullOrUndefined(range.endWidth) && range.endWidth.length > 0) {
            endWidth = toPixel(range.endWidth, range.currentRadius);
        }
        else {
            endWidth = range.endWidth;
        }
        endAngle = isClockWise ? endAngle : [startAngle, startAngle = endAngle][0];
        endWidth = isClockWise ? endWidth : [startWidth, startWidth = endWidth][0];
        element.setAttribute('d', getPathArc(this.midPoint, Math.round(startAngle), Math.round(endAngle), range.currentRadius, startWidth, endWidth, range, axis));
        setStyles(element, (range.color ? range.color : range.rangeColor), {
            color: (range.color ? range.color : range.rangeColor),
            width: 0
        });
    };
    /**
     * This method destroys the circular gauge. This method removes the events associated with the circular gauge and disposes the objects created for rendering and updating the circular gauge.
     *
     * @method destroy
     * @return {void}
     * @member of Circular-Gauge
     */
    CircularGauge.prototype.destroy = function () {
        if (!isNullOrUndefined(this.element)) {
            this.unWireEvents();
        }
        if (!isNullOrUndefined(this.tooltipModule)) {
            this.tooltipModule.removeEventListener();
        }
        _super.prototype.destroy.call(this);
        if (!isNullOrUndefined(this.gaugeAxisLayoutPanel)) {
            this.gaugeAxisLayoutPanel.destroy();
        }
        this.availableSize = null;
        this.midPoint = null;
        this.activePointer = null;
        this.activeAxis = null;
        this.activeRange = null;
        this.gaugeRect = null;
        this.gaugeAxisLayoutPanel = null;
        this.themeStyle = null;
        this.loadingAnimationDuration = null;
        this.intl = null;
        this.removeSvg();
        this.resizeEvent = null;
        this.svgObject = null;
        this.renderer = null;
    };
    /**
     * To provide the array of modules needed for control rendering
     *
     * @returns {ModuleDeclaration[]} - Returns the modules
     * @private
     */
    CircularGauge.prototype.requiredModules = function () {
        var modules = [];
        var annotationEnable = false;
        var axes = this.axes;
        axes.map(function (axis) {
            axis.annotations.map(function (annotation) {
                if (!annotationEnable) {
                    annotationEnable = ((!isNullOrUndefined(annotation.content) && annotation.content.length !== 0) || typeof (annotation.content) === 'function');
                }
            });
        });
        if (annotationEnable) {
            modules.push({
                member: 'Annotations',
                args: [this, Annotations],
                name: 'Annotations'
            });
        }
        if (this.tooltip.enable) {
            modules.push({
                member: 'Tooltip',
                args: [this, GaugeTooltip],
                name: 'Tooltip'
            });
        }
        if (this.allowPrint) {
            modules.push({
                member: 'Print',
                args: [this, Print],
                name: 'Print'
            });
        }
        if (this.allowImageExport) {
            modules.push({
                member: 'ImageExport',
                args: [this, ImageExport],
                name: 'ImageExport'
            });
        }
        if (this.allowPdfExport) {
            modules.push({
                member: 'PdfExport',
                args: [this, PdfExport],
                name: 'PdfExport'
            });
        }
        if (this.legendSettings.visible) {
            modules.push({
                member: 'Legend',
                args: [this, Legend],
                name: 'Legend'
            });
        }
        modules.push({
            member: 'Gradient',
            args: [this, Gradient],
            name: 'Gradient'
        });
        return modules;
    };
    /**
     * Get the properties to be maintained in the persisted state.
     *
     * @returns {string} - Returns the string
     * @private
     */
    CircularGauge.prototype.getPersistData = function () {
        return this.addOnPersist([]);
    };
    /**
     * Called internally if any of the property value changed.
     *
     * @param {CircularGaugeModel} newProp - Specifies the new property
     * @param {CircularGaugeModel} oldProp - Specifies the old property
     * @returns {void}
     * @private
     */
    CircularGauge.prototype.onPropertyChanged = function (newProp, oldProp) {
        // property method calculated
        if (!this.isDestroyed) {
            this.isPropertyChange = true;
            var renderer = false;
            this.allowLoadingAnimation = this.animationDuration > 0 && !this.isOverAllAnimationComplete ? true : false;
            var refreshBounds = false;
            var refreshWithoutAnimation = false;
            var isPointerValueSame = (Object.keys(newProp).length === 1 && newProp instanceof Object &&
                !isNullOrUndefined(this.activePointer));
            for (var _i = 0, _a = Object.keys(newProp); _i < _a.length; _i++) {
                var prop = _a[_i];
                switch (prop) {
                    case 'height':
                    case 'width':
                    case 'centerX':
                    case 'centerY':
                    case 'margin':
                        this.createSvg();
                        refreshBounds = true;
                        break;
                    case 'animationDuration':
                        this.allowLoadingAnimation = true;
                        break;
                    case 'title':
                        refreshBounds = (newProp.title === '' || oldProp.title === '');
                        renderer = !(newProp.title === '' || oldProp.title === '');
                        break;
                    case 'titleStyle':
                        if (newProp.titleStyle && newProp.titleStyle.size) {
                            refreshBounds = true;
                        }
                        else {
                            renderer = true;
                        }
                        break;
                    case 'border':
                        renderer = true;
                        break;
                    case 'background':
                        renderer = true;
                        break;
                    case 'legendSettings':
                        refreshWithoutAnimation = true;
                        break;
                    case 'axes':
                        // eslint-disable-next-line no-case-declarations
                        var axesPropertyLength = this.axes.length;
                        for (var x = 0; x < axesPropertyLength; x++) {
                            if (!isNullOrUndefined(newProp.axes[x])) {
                                var collection = Object.keys(newProp.axes[x]);
                                for (var _b = 0, collection_1 = collection; _b < collection_1.length; _b++) {
                                    var collectionProp = collection_1[_b];
                                    if (collectionProp === 'pointers') {
                                        var pointerPropertyLength = Object.keys(newProp.axes[x].pointers).length;
                                        for (var y = 0; y < pointerPropertyLength; y++) {
                                            var index = parseInt(Object.keys(newProp.axes[x].pointers)[y], 10);
                                            if (!isNullOrUndefined(Object.keys(newProp.axes[x].pointers[index]))) {
                                                this.allowLoadingAnimation = false;
                                                this.loadingAnimationDuration = [];
                                                this.isAnimationProgress = this.axes[x].pointers[index].animation.enable;
                                                this.axes[x].pointers[index]['previousValue'] = this.axes[x].pointers[index]['currentValue'];
                                                this.axes[x].pointers[index]['isPointerAnimation'] = Object.keys(newProp.axes[x].pointers[index]).indexOf('value') > -1;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        refreshWithoutAnimation = true;
                        break;
                }
            }
            if (!isPointerValueSame && !this.isRangeUpdate) {
                if (!refreshBounds && renderer) {
                    this.removeSvg();
                    this.renderElements();
                }
                if (refreshBounds || this.allowLoadingAnimation) {
                    this.removeSvg();
                    this.calculateBounds();
                    this.renderElements();
                    if (this.allowLoadingAnimation) {
                        this.allowLoadingAnimation = this.animationDuration > 0 && !this.isOverAllAnimationComplete ? true : false;
                        this.renderAnimation();
                    }
                }
                if (refreshWithoutAnimation && !renderer && !refreshBounds && !this.allowLoadingAnimation) {
                    this.removeSvg();
                    this.calculateBounds();
                    this.renderElements(false);
                }
            }
            this.isRangeUpdate = false;
        }
    };
    /**
     * Get component name for circular gauge
     *
     * @returns {string} - Returns the module name
     * @private
     */
    CircularGauge.prototype.getModuleName = function () {
        return 'circulargauge';
    };
    var CircularGauge_1;
    __decorate([
        Property(null)
    ], CircularGauge.prototype, "width", void 0);
    __decorate([
        Property(null)
    ], CircularGauge.prototype, "height", void 0);
    __decorate([
        Complex({ color: 'transparent', width: 0 }, Border)
    ], CircularGauge.prototype, "border", void 0);
    __decorate([
        Property(null)
    ], CircularGauge.prototype, "background", void 0);
    __decorate([
        Property('')
    ], CircularGauge.prototype, "title", void 0);
    __decorate([
        Property(0)
    ], CircularGauge.prototype, "animationDuration", void 0);
    __decorate([
        Complex({ size: null, color: null, fontWeight: null, fontFamily: null }, Font)
    ], CircularGauge.prototype, "titleStyle", void 0);
    __decorate([
        Complex({}, Margin)
    ], CircularGauge.prototype, "margin", void 0);
    __decorate([
        Collection([{}], Axis)
    ], CircularGauge.prototype, "axes", void 0);
    __decorate([
        Complex({}, TooltipSettings)
    ], CircularGauge.prototype, "tooltip", void 0);
    __decorate([
        Property(false)
    ], CircularGauge.prototype, "enablePointerDrag", void 0);
    __decorate([
        Property(false)
    ], CircularGauge.prototype, "enableRangeDrag", void 0);
    __decorate([
        Property(false)
    ], CircularGauge.prototype, "allowPrint", void 0);
    __decorate([
        Property(false)
    ], CircularGauge.prototype, "allowImageExport", void 0);
    __decorate([
        Property(false)
    ], CircularGauge.prototype, "allowPdfExport", void 0);
    __decorate([
        Property(true)
    ], CircularGauge.prototype, "allowRangePreRender", void 0);
    __decorate([
        Property(null)
    ], CircularGauge.prototype, "centerX", void 0);
    __decorate([
        Property(null)
    ], CircularGauge.prototype, "centerY", void 0);
    __decorate([
        Property(false)
    ], CircularGauge.prototype, "moveToCenter", void 0);
    __decorate([
        Property('Material')
    ], CircularGauge.prototype, "theme", void 0);
    __decorate([
        Property(false)
    ], CircularGauge.prototype, "useGroupingSeparator", void 0);
    __decorate([
        Property(null)
    ], CircularGauge.prototype, "description", void 0);
    __decorate([
        Property(0)
    ], CircularGauge.prototype, "tabIndex", void 0);
    __decorate([
        Property(true)
    ], CircularGauge.prototype, "allowMargin", void 0);
    __decorate([
        Complex({}, LegendSettings)
    ], CircularGauge.prototype, "legendSettings", void 0);
    __decorate([
        Event()
    ], CircularGauge.prototype, "loaded", void 0);
    __decorate([
        Event()
    ], CircularGauge.prototype, "load", void 0);
    __decorate([
        Event()
    ], CircularGauge.prototype, "animationComplete", void 0);
    __decorate([
        Event()
    ], CircularGauge.prototype, "axisLabelRender", void 0);
    __decorate([
        Event()
    ], CircularGauge.prototype, "radiusCalculate", void 0);
    __decorate([
        Event()
    ], CircularGauge.prototype, "annotationRender", void 0);
    __decorate([
        Event()
    ], CircularGauge.prototype, "legendRender", void 0);
    __decorate([
        Event()
    ], CircularGauge.prototype, "tooltipRender", void 0);
    __decorate([
        Event()
    ], CircularGauge.prototype, "dragStart", void 0);
    __decorate([
        Event()
    ], CircularGauge.prototype, "dragMove", void 0);
    __decorate([
        Event()
    ], CircularGauge.prototype, "dragEnd", void 0);
    __decorate([
        Event()
    ], CircularGauge.prototype, "gaugeMouseMove", void 0);
    __decorate([
        Event()
    ], CircularGauge.prototype, "gaugeMouseLeave", void 0);
    __decorate([
        Event()
    ], CircularGauge.prototype, "gaugeMouseDown", void 0);
    __decorate([
        Event()
    ], CircularGauge.prototype, "gaugeMouseUp", void 0);
    __decorate([
        Event()
    ], CircularGauge.prototype, "resized", void 0);
    __decorate([
        Event()
    ], CircularGauge.prototype, "beforePrint", void 0);
    CircularGauge = CircularGauge_1 = __decorate([
        NotifyPropertyChanges
    ], CircularGauge);
    return CircularGauge;
}(Component));
export { CircularGauge };
