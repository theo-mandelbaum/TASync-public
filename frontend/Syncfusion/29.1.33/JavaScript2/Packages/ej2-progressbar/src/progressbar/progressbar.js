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
import { Component, Property, NotifyPropertyChanges, Browser, Complex, Event, Collection, EventHandler } from '@syncfusion/ej2-base';
import { createElement, remove, isNullOrUndefined } from '@syncfusion/ej2-base';
import { Rect, Size, RectOption, stringToNumber } from './utils/helper';
import { Margin, Animation, Font, RangeColor, TooltipSettings } from './model/progress-base';
import { SvgRenderer, PathOption, getElement } from '@syncfusion/ej2-svg-base';
import { getProgressThemeColor } from './utils/theme';
import { lineCapRadius, completeAngle, valueChanged, progressCompleted } from './model/constant';
import { mouseClick, mouseDown, mouseLeave, mouseMove, mouseUp } from './model/constant';
import { ProgressTooltip } from './model/index';
import { ProgressAnnotationSettings } from './model/index';
import { Linear } from './types/linear-progress';
import { Circular } from './types/circular-progress';
import { ProgressAnimation } from './utils/progress-animation';
/**
 *  progress bar control
 */
var ProgressBar = /** @class */ (function (_super) {
    __extends(ProgressBar, _super);
    function ProgressBar(options, element) {
        var _this = _super.call(this, options, element) || this;
        /** @private */
        _this.linear = new Linear(_this);
        /** @private */
        _this.circular = new Circular(_this);
        /** @private */
        _this.annotateAnimation = new ProgressAnimation();
        /** @private */
        // private resizeTo: number;
        /** @private */
        _this.destroyIndeterminate = false;
        /** @private */
        _this.scaleX = 1;
        /** @private */
        _this.scaleY = 1;
        ProgressBar_1.Inject(ProgressTooltip);
        return _this;
    }
    ProgressBar_1 = ProgressBar;
    ProgressBar.prototype.getModuleName = function () {
        return 'progressbar';
    };
    ProgressBar.prototype.preRender = function () {
        this.unWireEvents();
        this.initPrivateVariable();
        this.wireEvents();
    };
    ProgressBar.prototype.initPrivateVariable = function () {
        this.progressRect = new Rect(0, 0, 0, 0);
        this.progressSize = new Size(0, 0);
    };
    ProgressBar.prototype.render = function () {
        var _this = this;
        this.trigger('load', { progressBar: this });
        this.element.style.display = 'block';
        this.element.style.position = 'relative';
        this.element.setAttribute('role', 'progressbar');
        this.element.setAttribute('aria-valuemin', this.minimum.toString());
        this.element.setAttribute('aria-valuemax', this.maximum.toString());
        this.element.setAttribute('aria-valuenow', this.value ? this.value.toString() : '0');
        this.element.setAttribute('tabindex', '0');
        this.element.setAttribute('aria-label', this.labelStyle.text || 'progress bar');
        this.calculateProgressBarSize();
        this.setTheme();
        this.createSVG();
        this.argsData = { value: this.value, progressColor: this.progressColor, trackColor: this.trackColor };
        if (this.argsData.value === this.maximum) {
            this.trigger(progressCompleted, this.argsData, function () { _this.controlRendering(); });
        }
        else {
            this.trigger(valueChanged, this.argsData, function () { _this.controlRendering(); });
        }
    };
    ProgressBar.prototype.controlRendering = function () {
        this.renderElements();
        this.trigger('loaded', { progressBar: this });
        this.renderComplete();
        this.controlRenderedTimeStamp = new Date().getTime();
    };
    /**
     * calculate size of the progress bar.
     *
     * @returns {void}
     */
    ProgressBar.prototype.calculateProgressBarSize = function () {
        var containerWidth = this.element.clientWidth || this.element.offsetWidth;
        var containerHeight = this.element.clientHeight;
        var width = (this.type === 'Linear') ? 200 : 120;
        var height = (this.type === 'Linear') ? 30 : 120;
        var padding = 10;
        var thickness = Math.max(this.progressThickness, this.trackThickness);
        height = (this.type === 'Linear' && thickness > (height - padding)) ? thickness + padding : height;
        this.progressSize.width = stringToNumber(this.width, containerWidth) || containerWidth || width;
        this.progressSize.height = stringToNumber(this.height, containerHeight) || containerHeight || height;
        this.progressRect.x = this.margin.left;
        this.progressRect.y = this.margin.top;
        this.progressRect.width = this.progressSize.width - (this.margin.left + this.margin.right);
        this.progressRect.height = this.progressSize.height - (this.margin.top + this.margin.bottom);
        this.initialClipRect = new Rect(this.progressRect.x, this.progressRect.y, this.progressSize.height, this.progressSize.width);
    };
    /**
     * Render Annotation in progress bar.
     *
     * @returns {void}
     */
    ProgressBar.prototype.renderAnnotations = function () {
        this.renderAnnotation();
    };
    /**
     * Render SVG Element.
     *
     * @returns {void}
     */
    ProgressBar.prototype.renderElements = function () {
        this.createSecondaryElement();
        this.renderTrack();
        this.renderProgress();
        this.renderLabel();
        if (this.annotations.length > 0) {
            this.renderAnnotations();
        }
        this.setSecondaryElementPosition();
        if (this.tooltip.enable && !(this.tooltip.showTooltipOnHover)) {
            this.progressTooltipModule.tooltip();
        }
    };
    ProgressBar.prototype.createSecondaryElement = function () {
        var secElement = document.getElementById(this.element.id + 'Secondary_Element');
        if (this.tooltip.enable) {
            this.tooltipElement = createElement('div', {
                id: this.element.id + '_tooltip',
                className: 'ejSVGTooltip',
                styles: 'pointer-events: none; position: absolute; zIndex: 1; visibility: visible'
            });
            if (secElement) {
                this.secElement.appendChild(this.tooltipElement);
            }
        }
        var tooltipElement = document.getElementById(this.element.id + '_tooltip');
        if (secElement) {
            secElement.innerHTML = '';
            this.secElement = tooltipElement ? secElement.appendChild(tooltipElement) : secElement;
            return;
        }
        this.secElement = createElement('div', {
            id: this.element.id + 'Secondary_Element',
            styles: 'position: absolute'
        });
        this.element.appendChild(this.secElement);
        if (this.tooltipElement) {
            this.secElement.appendChild(this.tooltipElement);
        }
    };
    /**
     * To set the left and top position for annotation for center aligned.
     *
     * @returns {void}
     */
    ProgressBar.prototype.setSecondaryElementPosition = function () {
        var element = this.secElement;
        var rect = this.element.getBoundingClientRect();
        if (getElement(this.svgObject.id)) {
            var svgRect = getElement(this.svgObject.id).getBoundingClientRect();
            element.style.left = Math.max(svgRect.left - rect.left, 0) + 'px';
            element.style.top = Math.max(svgRect.top - rect.top, 0) + 'px';
        }
    };
    ProgressBar.prototype.createSVG = function () {
        this.removeSvg();
        this.renderer = new SvgRenderer(this.element.id);
        this.svgObject = this.renderer.createSvg({
            id: this.element.id + 'SVG',
            width: this.progressSize.width,
            height: this.progressSize.height,
            style: 'background-color:' + this.themeStyle.backgroundColor
        });
    };
    ProgressBar.prototype.clipPathElement = function () {
        this.clipPath = this.renderer.createClipPath({ 'id': this.element.id + '_clippath' });
        this.bufferClipPath = this.renderer.createClipPath({ 'id': this.element.id + '_clippathBuffer' });
    };
    ProgressBar.prototype.renderTrack = function () {
        if (this.type === 'Linear') {
            this.linear.renderLinearTrack();
        }
        else if (this.type === 'Circular') {
            this.circular.renderCircularTrack();
        }
    };
    ProgressBar.prototype.renderProgress = function () {
        this.clipPathElement();
        if (this.type === 'Linear') {
            this.linear.renderLinearProgress();
        }
        else if (this.type === 'Circular') {
            this.circular.renderCircularProgress();
        }
    };
    ProgressBar.prototype.renderLabel = function () {
        if (this.type === 'Linear' && this.showProgressValue && !this.isIndeterminate) {
            this.linear.renderLinearLabel();
        }
        else if (this.type === 'Circular' && this.showProgressValue && !this.isIndeterminate) {
            this.circular.renderCircularLabel();
        }
        this.element.appendChild(this.svgObject);
    };
    ProgressBar.prototype.getPathLine = function (x, width, thickness) {
        var moveTo = (this.enableRtl) ? ((this.cornerRadius === 'Round') ?
            (x + this.progressRect.width) - ((lineCapRadius / 2) * thickness) : (x + this.progressRect.width)) :
            ((this.cornerRadius === 'Round') ? (x + (lineCapRadius / 2) * thickness) : x);
        //TODO : BLAZ-14309 - ProgressBar renders improperly when corner radius is set to "Round" and the value between one to four.
        thickness = width < thickness && this.cornerRadius === 'Round' ? width : thickness;
        var lineTo = (this.enableRtl) ? ((this.cornerRadius === 'Round' && width) ?
            (moveTo - width + (lineCapRadius * thickness)) : (moveTo - width)) :
            ((this.cornerRadius === 'Round' && width) ? (moveTo + width - (lineCapRadius * thickness)) : (moveTo + width));
        return 'M' + moveTo + ' ' + (this.progressRect.y + (this.progressRect.height / 2)) +
            'L' + lineTo + ' ' + (this.progressRect.y + (this.progressRect.height / 2));
    };
    ProgressBar.prototype.calculateProgressRange = function (value, minimum, maximum) {
        var min = minimum || this.minimum;
        var max = maximum || this.maximum;
        var endValue = (value - min) / (max - min) * ((this.type === 'Linear') ? 1 : this.totalAngle);
        var result = (value < min || value > max) ? 0 : endValue;
        return result;
    };
    ProgressBar.prototype.calculateSegmentSize = function (width, thickness) {
        var count = (this.type === 'Circular' && this.totalAngle === completeAngle) ? this.segmentCount : this.segmentCount - 1;
        var cornerCount = (this.totalAngle === completeAngle || this.type === 'Linear') ? this.segmentCount : this.segmentCount - 1;
        var gap = this.gapWidth || ((this.type === 'Linear') ? this.themeStyle.linearGapWidth : this.themeStyle.circularGapWidth);
        var size = (width - count * gap);
        size = (size - ((this.cornerRadius === 'Round') ? (cornerCount * (lineCapRadius * thickness)) : 0)) / this.segmentCount;
        gap += (this.cornerRadius === 'Round') ? lineCapRadius * thickness : 0;
        return ' ' + size + ' ' + gap;
    };
    ProgressBar.prototype.createClipPath = function (clipPath, range, d, refresh, thickness, isLabel, isMaximum) {
        var path;
        var rect;
        var option;
        var posx;
        var posy;
        var pathWidth;
        var x = this.progressRect.x;
        var totalWidth = this.progressRect.width;
        if (this.type === 'Linear') {
            if (this.cornerRadius === 'Round4px') {
                posx = x;
                pathWidth = totalWidth * range;
                posx += (!isLabel) ? (-4) : 0;
                posy = this.progressRect.y;
                pathWidth += ((!isLabel && isMaximum) || this.isIndeterminate) ? 4 : 0;
            }
            else {
                //TODO : BLAZ-14309 - ProgressBar renders improperly when corner radius is set to "Round" and the value between one to four.
                posx = (this.enableRtl && !isLabel) ? (x + totalWidth + (this.cornerRadius === 'Round' ? thickness / 10 : 0)) : x - (this.cornerRadius === 'Round' ? thickness / 10 : 0);
                pathWidth = totalWidth * range;
                //TODO : BLAZ-14309 - ProgressBar renders improperly when corner radius is set to "Round" and the value between one to four.
                //posx += (this.cornerRadius === 'Round' && !isLabel) ?
                //    ((this.enableRtl) ? (lineCapRadius / 2) * thickness : -(lineCapRadius / 2) * thickness) : 0;
                posy = (this.progressRect.y + (this.progressRect.height / 2)) - (thickness / 2);
                pathWidth += (this.cornerRadius === 'Round' && !isLabel) ? (lineCapRadius * thickness) : 0;
            }
            if (!refresh) {
                rect = new RectOption(this.element.id + '_clippathrect' + (isLabel ? 'label' : ''), 'transparent', 1, 'transparent', 1, new Rect(posx, posy, thickness, pathWidth));
                path = this.renderer.drawRectangle(rect);
                clipPath.appendChild(path);
            }
            else {
                path = getElement(this.element.id + '_clippathrect' + (isLabel ? 'label' : ''));
                path.setAttribute('width', (pathWidth).toString());
                if (this.isActive) {
                    path.setAttribute('x', (posx).toString());
                }
            }
        }
        else {
            if (!refresh) {
                option = new PathOption(this.element.id + '_clippathcircle', 'transparent', 10, 'transparent', 1, '0', d);
                path = this.renderer.drawPath(option);
                clipPath.appendChild(path);
            }
            else {
                path = getElement(this.element.id + '_clippathcircle');
                path.setAttribute('d', d);
            }
        }
        return path;
    };
    /**
     * Theming for progress bar.
     *
     * @returns {void}
     */
    ProgressBar.prototype.setTheme = function () {
        this.themeStyle = getProgressThemeColor(this.theme);
        switch (this.theme) {
            case 'Bootstrap':
            case 'Bootstrap4':
                this.cornerRadius = this.cornerRadius === 'Auto' ?
                    ((this.type === 'Linear') ? 'Round4px' : 'Round') : this.cornerRadius;
                break;
            case 'Fluent2':
            case 'Fluent2Dark':
            case 'Fluent2HighContrast':
            case 'Bootstrap5':
            case 'Bootstrap5Dark':
                this.cornerRadius = this.cornerRadius === 'Auto' && this.type === 'Linear' ? 'Round' : this.cornerRadius;
                break;
            default:
                this.cornerRadius = this.cornerRadius === 'Auto' ? 'Square' : this.cornerRadius;
        }
    };
    /**
     * Annotation for progress bar.
     *
     * @returns {void}
     */
    ProgressBar.prototype.renderAnnotation = function () {
        if (this.progressAnnotationModule && this.annotations.length > 0) {
            this.progressAnnotationModule.renderAnnotations(this.secElement);
        }
    };
    /**
     * Handles the progressbar resize.
     *
     * @returns {boolean} false
     * @private
     */
    ProgressBar.prototype.progressResize = function () {
        var _this = this;
        // 800 used as buffer time for resize event preventing from control rendered time
        if (!(new Date().getTime() > this.controlRenderedTimeStamp + 800)) {
            return false;
        }
        var arg = {
            bar: this,
            name: 'resized',
            currentSize: new Size(0, 0),
            previousSize: new Size(this.progressSize.width, this.progressSize.height),
            cancel: (this.cancelResize) ? true : false
        };
        if (this.resizeTo) {
            clearTimeout(this.resizeTo);
        }
        this.resizeTo = setTimeout(function () {
            if (_this.isDestroyed) {
                clearTimeout(_this.resizeTo);
                return;
            }
            arg.currentSize = _this.progressSize;
            _this.trigger('resized', arg);
            if ((_this.width === null || _this.height === null || _this.width.indexOf('%') > -1 || _this.height.indexOf('%') > -1)
                && !arg.cancel) {
                if (_this.secElement) {
                    _this.secElement.innerHTML = '';
                }
                _this.calculateProgressBarSize();
                _this.createSVG();
                _this.renderElements();
            }
        }, 500);
        return false;
    };
    ProgressBar.prototype.progressMouseClick = function (e) {
        this.mouseEvent(mouseClick, e);
    };
    ProgressBar.prototype.progressMouseDown = function (e) {
        this.mouseEvent(mouseDown, e);
    };
    ProgressBar.prototype.progressMouseMove = function (e) {
        this.mouseEvent(mouseMove, e);
        var target = e.target;
        if (this.tooltip.enable && this.tooltip.showTooltipOnHover) {
            if (target.id.indexOf('Circularprogress') >= 0 || target.id.indexOf('Circularbuffer') >= 0 || target.id.indexOf('Linearprogress') >= 0 || target.id.indexOf('Linearbuffer') >= 0 || target.id.indexOf('Linearbuffer') >= 0) {
                this.progressTooltipModule.tooltip(e);
            }
            else if (this.progressTooltipModule.isRendered) {
                this.progressTooltipModule.removeTooltip(1000);
                this.progressTooltipModule.isRendered = false;
            }
        }
    };
    ProgressBar.prototype.progressMouseUp = function (e) {
        this.mouseEvent(mouseUp, e);
    };
    ProgressBar.prototype.progressMouseLeave = function (e) {
        this.mouseEvent(mouseLeave, e);
    };
    ProgressBar.prototype.mouseEvent = function (eventName, e) {
        var element = e.target;
        this.trigger(eventName, { target: element.id });
    };
    /**
     * Method to un-bind events for progress bar.
     *
     * @returns {void}
     */
    ProgressBar.prototype.unWireEvents = function () {
        var startEvent = Browser.touchStartEvent;
        var moveEvent = Browser.touchMoveEvent;
        var stopEvent = Browser.touchEndEvent;
        /*! Find the Events type */
        var cancelEvent = Browser.isPointer ? 'pointerleave' : 'mouseleave';
        /*! UnBind the Event handler */
        EventHandler.remove(this.element, 'click', this.progressMouseClick);
        EventHandler.remove(this.element, startEvent, this.progressMouseDown);
        EventHandler.remove(this.element, moveEvent, this.progressMouseMove);
        EventHandler.remove(this.element, stopEvent, this.progressMouseUp);
        EventHandler.remove(this.element, cancelEvent, this.progressMouseLeave);
        window.removeEventListener((Browser.isTouch && ('orientation' in window && 'onorientationchange' in window)) ? 'orientationchange' : 'resize', this.resizeBounds);
    };
    /**
     * Method to bind events for bullet chart.
     *
     * @returns {void}
     */
    ProgressBar.prototype.wireEvents = function () {
        var startEvent = Browser.touchStartEvent;
        var moveEvent = Browser.touchMoveEvent;
        var stopEvent = Browser.touchEndEvent;
        /*! Find the Events type */
        var cancelEvent = Browser.isPointer ? 'pointerleave' : 'mouseleave';
        /*! Bind the Event handler */
        EventHandler.add(this.element, 'click', this.progressMouseClick, this);
        EventHandler.add(this.element, startEvent, this.progressMouseDown, this);
        EventHandler.add(this.element, moveEvent, this.progressMouseMove, this);
        EventHandler.add(this.element, stopEvent, this.progressMouseUp, this);
        EventHandler.add(this.element, cancelEvent, this.progressMouseLeave, this);
        this.resizeBounds = this.progressResize.bind(this);
        window.addEventListener((Browser.isTouch && ('orientation' in window && 'onorientationchange' in window)) ? 'orientationchange' : 'resize', this.resizeBounds);
    };
    ProgressBar.prototype.removeSvg = function () {
        var svgElement = document.getElementById(this.element.id + 'SVG');
        if (svgElement) {
            remove(svgElement);
        }
    };
    ProgressBar.prototype.onPropertyChanged = function (newProp, oldProp) {
        for (var _i = 0, _a = Object.keys(newProp); _i < _a.length; _i++) {
            var prop = _a[_i];
            switch (prop) {
                case 'annotations':
                    this.secElement.innerHTML = '';
                    this.renderAnnotation();
                    break;
                case 'value':
                    this.cancelResize = (this.animation.enable) ? true : false;
                    this.argsData = {
                        value: this.value,
                        progressColor: this.argsData.progressColor,
                        trackColor: this.argsData.trackColor
                    };
                    if (this.argsData.value < oldProp.value && this.animation.enable) {
                        this.argsData.value = oldProp.value;
                    }
                    if (this.argsData.value === this.maximum) {
                        this.trigger(progressCompleted, this.argsData);
                    }
                    else {
                        this.trigger(valueChanged, this.argsData);
                    }
                    if (this.type === 'Circular') {
                        this.circular.renderCircularProgress(this.previousEndAngle, this.previousTotalEnd, !isNullOrUndefined(oldProp.value));
                        if (this.showProgressValue) {
                            this.circular.renderCircularLabel(true);
                        }
                        if (this.progressAnnotationModule && this.animation.enable && !this.isIndeterminate) {
                            this.annotateAnimation.doAnnotationAnimation(this.clipPath, this, this.annotateEnd, this.annotateTotal);
                        }
                    }
                    else {
                        this.linear.renderLinearProgress(!isNullOrUndefined(oldProp.value), this.previousWidth);
                        if (this.showProgressValue) {
                            this.linear.renderLinearLabel(true);
                        }
                    }
                    if (this.progressTooltipModule) {
                        this.progressTooltipModule.tooltip();
                    }
                    this.element.setAttribute('aria-valuenow', this.argsData.value ? this.argsData.value.toString() : '0');
                    break;
                case 'animation':
                    this.createSVG();
                    this.renderElements();
                    break;
            }
        }
    };
    ProgressBar.prototype.requiredModules = function () {
        var modules = [];
        var enableAnnotation = false;
        enableAnnotation = this.annotations.some(function (value) {
            return (value.content !== null);
        });
        if (enableAnnotation) {
            modules.push({
                member: 'ProgressAnnotation',
                args: [this]
            });
        }
        if (this.tooltip.enable) {
            modules.push({
                member: 'ProgressTooltip',
                args: [this]
            });
        }
        return modules;
    };
    ProgressBar.prototype.getPersistData = function () {
        return ' ';
    };
    ProgressBar.prototype.show = function () {
        if (!isNullOrUndefined(this.svgObject)) {
            this.svgObject.setAttribute('visibility', 'Visible');
            if (this.isIndeterminate) {
                this.destroyIndeterminate = false;
                if (this.type === 'Linear') {
                    this.linear.renderLinearProgress(true);
                }
                else {
                    this.circular.renderCircularProgress(null, null, true);
                }
            }
        }
    };
    ProgressBar.prototype.hide = function () {
        if (!isNullOrUndefined(this.svgObject)) {
            this.svgObject.setAttribute('visibility', 'Hidden');
            if (this.isIndeterminate) {
                this.destroyIndeterminate = true;
            }
        }
    };
    /**
     * To destroy the widget.
     *
     * @returns {void}
     */
    ProgressBar.prototype.destroy = function () {
        this.unWireEvents();
        _super.prototype.destroy.call(this);
        this.removeSvg();
        if (this.isReact) {
            this.clearTemplate();
        }
        this.svgObject = null;
        this.element.classList.remove('e-progressbar');
        if (!this.refreshing) {
            this.destroyIndeterminate = true;
        }
    };
    var ProgressBar_1;
    __decorate([
        Property('Linear')
    ], ProgressBar.prototype, "type", void 0);
    __decorate([
        Property(null)
    ], ProgressBar.prototype, "value", void 0);
    __decorate([
        Property(null)
    ], ProgressBar.prototype, "secondaryProgress", void 0);
    __decorate([
        Property('')
    ], ProgressBar.prototype, "secondaryProgressColor", void 0);
    __decorate([
        Property(null)
    ], ProgressBar.prototype, "secondaryProgressThickness", void 0);
    __decorate([
        Property(0)
    ], ProgressBar.prototype, "minimum", void 0);
    __decorate([
        Property(100)
    ], ProgressBar.prototype, "maximum", void 0);
    __decorate([
        Property(0)
    ], ProgressBar.prototype, "startAngle", void 0);
    __decorate([
        Property(0)
    ], ProgressBar.prototype, "endAngle", void 0);
    __decorate([
        Property('100%')
    ], ProgressBar.prototype, "radius", void 0);
    __decorate([
        Property('100%')
    ], ProgressBar.prototype, "innerRadius", void 0);
    __decorate([
        Property(1)
    ], ProgressBar.prototype, "segmentCount", void 0);
    __decorate([
        Property(null)
    ], ProgressBar.prototype, "gapWidth", void 0);
    __decorate([
        Property('')
    ], ProgressBar.prototype, "segmentColor", void 0);
    __decorate([
        Property('Auto')
    ], ProgressBar.prototype, "cornerRadius", void 0);
    __decorate([
        Property(null)
    ], ProgressBar.prototype, "height", void 0);
    __decorate([
        Property(null)
    ], ProgressBar.prototype, "width", void 0);
    __decorate([
        Property(false)
    ], ProgressBar.prototype, "isIndeterminate", void 0);
    __decorate([
        Property(false)
    ], ProgressBar.prototype, "isActive", void 0);
    __decorate([
        Property(false)
    ], ProgressBar.prototype, "isGradient", void 0);
    __decorate([
        Property(false)
    ], ProgressBar.prototype, "isStriped", void 0);
    __decorate([
        Property('Auto')
    ], ProgressBar.prototype, "role", void 0);
    __decorate([
        Property(false)
    ], ProgressBar.prototype, "enableRtl", void 0);
    __decorate([
        Property(true)
    ], ProgressBar.prototype, "labelOnTrack", void 0);
    __decorate([
        Property(null)
    ], ProgressBar.prototype, "trackColor", void 0);
    __decorate([
        Property(null)
    ], ProgressBar.prototype, "progressColor", void 0);
    __decorate([
        Property(0)
    ], ProgressBar.prototype, "trackThickness", void 0);
    __decorate([
        Property(0)
    ], ProgressBar.prototype, "progressThickness", void 0);
    __decorate([
        Property(false)
    ], ProgressBar.prototype, "enablePieProgress", void 0);
    __decorate([
        Property('Fabric')
    ], ProgressBar.prototype, "theme", void 0);
    __decorate([
        Property(false)
    ], ProgressBar.prototype, "showProgressValue", void 0);
    __decorate([
        Property(false)
    ], ProgressBar.prototype, "enableProgressSegments", void 0);
    __decorate([
        Complex({ size: null, color: null, fontStyle: null, fontWeight: null, fontFamily: null }, Font)
    ], ProgressBar.prototype, "labelStyle", void 0);
    __decorate([
        Complex({}, Margin)
    ], ProgressBar.prototype, "margin", void 0);
    __decorate([
        Complex({}, Animation)
    ], ProgressBar.prototype, "animation", void 0);
    __decorate([
        Complex({}, TooltipSettings)
    ], ProgressBar.prototype, "tooltip", void 0);
    __decorate([
        Event()
    ], ProgressBar.prototype, "load", void 0);
    __decorate([
        Event()
    ], ProgressBar.prototype, "textRender", void 0);
    __decorate([
        Event()
    ], ProgressBar.prototype, "loaded", void 0);
    __decorate([
        Event()
    ], ProgressBar.prototype, "valueChanged", void 0);
    __decorate([
        Event()
    ], ProgressBar.prototype, "progressCompleted", void 0);
    __decorate([
        Event()
    ], ProgressBar.prototype, "animationComplete", void 0);
    __decorate([
        Event()
    ], ProgressBar.prototype, "mouseClick", void 0);
    __decorate([
        Event()
    ], ProgressBar.prototype, "mouseMove", void 0);
    __decorate([
        Event()
    ], ProgressBar.prototype, "mouseUp", void 0);
    __decorate([
        Event()
    ], ProgressBar.prototype, "mouseDown", void 0);
    __decorate([
        Event()
    ], ProgressBar.prototype, "mouseLeave", void 0);
    __decorate([
        Event()
    ], ProgressBar.prototype, "tooltipRender", void 0);
    __decorate([
        Collection([{}], ProgressAnnotationSettings)
    ], ProgressBar.prototype, "annotations", void 0);
    __decorate([
        Collection([{}], RangeColor)
    ], ProgressBar.prototype, "rangeColors", void 0);
    ProgressBar = ProgressBar_1 = __decorate([
        NotifyPropertyChanges
    ], ProgressBar);
    return ProgressBar;
}(Component));
export { ProgressBar };
