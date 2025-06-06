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
import { Component, EventHandler, Property, Event, Complex, Collection } from '@syncfusion/ej2-base';
import { L10n, Internationalization } from '@syncfusion/ej2-base';
import { NotifyPropertyChanges, ChildProperty } from '@syncfusion/ej2-base';
import { attributes, addClass, removeClass, setStyleAttribute, detach, closest } from '@syncfusion/ej2-base';
import { isNullOrUndefined, formatUnit, Browser, SanitizeHtmlHelper, initializeCSPTemplate } from '@syncfusion/ej2-base';
import { Tooltip, getZindexPartial } from '@syncfusion/ej2-popups';
/**
 * Configures the ticks data of the Slider.
 */
var TicksData = /** @class */ (function (_super) {
    __extends(TicksData, _super);
    function TicksData() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property('None')
    ], TicksData.prototype, "placement", void 0);
    __decorate([
        Property(10)
    ], TicksData.prototype, "largeStep", void 0);
    __decorate([
        Property(1)
    ], TicksData.prototype, "smallStep", void 0);
    __decorate([
        Property(false)
    ], TicksData.prototype, "showSmallTicks", void 0);
    __decorate([
        Property(null)
    ], TicksData.prototype, "format", void 0);
    return TicksData;
}(ChildProperty));
export { TicksData };
/**
 * It illustrates the color track data in slider.
 * {% codeBlock src='slider/colorrange/index.md' %}{% endcodeBlock %}
 */
var ColorRangeData = /** @class */ (function (_super) {
    __extends(ColorRangeData, _super);
    function ColorRangeData() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property(null)
    ], ColorRangeData.prototype, "color", void 0);
    __decorate([
        Property(null)
    ], ColorRangeData.prototype, "start", void 0);
    __decorate([
        Property(null)
    ], ColorRangeData.prototype, "end", void 0);
    return ColorRangeData;
}(ChildProperty));
export { ColorRangeData };
/**
 * It illustrates the limit data in slider.
 * {% codeBlock src='slider/limits/index.md' %}{% endcodeBlock %}
 */
var LimitData = /** @class */ (function (_super) {
    __extends(LimitData, _super);
    function LimitData() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property(false)
    ], LimitData.prototype, "enabled", void 0);
    __decorate([
        Property(null)
    ], LimitData.prototype, "minStart", void 0);
    __decorate([
        Property(null)
    ], LimitData.prototype, "minEnd", void 0);
    __decorate([
        Property(null)
    ], LimitData.prototype, "maxStart", void 0);
    __decorate([
        Property(null)
    ], LimitData.prototype, "maxEnd", void 0);
    __decorate([
        Property(false)
    ], LimitData.prototype, "startHandleFixed", void 0);
    __decorate([
        Property(false)
    ], LimitData.prototype, "endHandleFixed", void 0);
    return LimitData;
}(ChildProperty));
export { LimitData };
/**
 * It illustrates the tooltip data in slider.
 */
var TooltipData = /** @class */ (function (_super) {
    __extends(TooltipData, _super);
    function TooltipData() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property('')
    ], TooltipData.prototype, "cssClass", void 0);
    __decorate([
        Property('Before')
    ], TooltipData.prototype, "placement", void 0);
    __decorate([
        Property('Focus')
    ], TooltipData.prototype, "showOn", void 0);
    __decorate([
        Property(false)
    ], TooltipData.prototype, "isVisible", void 0);
    __decorate([
        Property(null)
    ], TooltipData.prototype, "format", void 0);
    return TooltipData;
}(ChildProperty));
export { TooltipData };
var bootstrapTooltipOffset = 6;
var bootstrap4TooltipOffset = 3;
var tolerance = 1e-10;
var classNames = {
    root: 'e-slider',
    rtl: 'e-rtl',
    sliderHiddenInput: 'e-slider-input',
    controlWrapper: 'e-control-wrapper',
    sliderHandle: 'e-handle',
    rangeBar: 'e-range',
    sliderButton: 'e-slider-button',
    firstButton: 'e-first-button',
    secondButton: 'e-second-button',
    scale: 'e-scale',
    tick: 'e-tick',
    large: 'e-large',
    tickValue: 'e-tick-value',
    sliderTooltip: 'e-slider-tooltip',
    sliderHover: 'e-slider-hover',
    sliderFirstHandle: 'e-handle-first',
    sliderSecondHandle: 'e-handle-second',
    sliderDisabled: 'e-disabled',
    sliderContainer: 'e-slider-container',
    horizontalTooltipBefore: 'e-slider-horizontal-before',
    horizontalTooltipAfter: 'e-slider-horizontal-after',
    verticalTooltipBefore: 'e-slider-vertical-before',
    verticalTooltipAfter: 'e-slider-vertical-after',
    materialTooltip: 'e-material-tooltip',
    materialTooltipOpen: 'e-material-tooltip-open',
    materialTooltipActive: 'e-tooltip-active',
    materialSlider: 'e-material-slider',
    sliderTrack: 'e-slider-track',
    sliderHorizantalColor: 'e-slider-horizantal-color',
    sliderVerticalColor: 'e-slider-vertical-color',
    sliderHandleFocused: 'e-handle-focused',
    verticalSlider: 'e-vertical',
    horizontalSlider: 'e-horizontal',
    sliderHandleStart: 'e-handle-start',
    sliderTooltipStart: 'e-material-tooltip-start',
    sliderTabHandle: 'e-tab-handle',
    sliderButtonIcon: 'e-button-icon',
    sliderSmallSize: 'e-small-size',
    sliderTickPosition: 'e-tick-pos',
    sliderFirstTick: 'e-first-tick',
    sliderLastTick: 'e-last-tick',
    sliderButtonClass: 'e-slider-btn',
    sliderTooltipWrapper: 'e-tooltip-wrap',
    sliderTabTrack: 'e-tab-track',
    sliderTabRange: 'e-tab-range',
    sliderActiveHandle: 'e-handle-active',
    sliderMaterialHandle: 'e-material-handle',
    sliderMaterialRange: 'e-material-range',
    sliderMaterialDefault: 'e-material-default',
    materialTooltipShow: 'e-material-tooltip-show',
    materialTooltipHide: 'e-material-tooltip-hide',
    readonly: 'e-read-only',
    limits: 'e-limits',
    limitBarDefault: 'e-limit-bar',
    limitBarFirst: 'e-limit-first',
    limitBarSecond: 'e-limit-second',
    dragHorizontal: 'e-drag-horizontal',
    dragVertical: 'e-drag-vertical'
};
/**
 * The Slider component allows the user to select a value or range
 * of values in-between a min and max range, by dragging the handle over the slider bar.
 * ```html
 * <div id='slider'></div>
 * ```
 * ```typescript
 * <script>
 *   var sliderObj = new Slider({ value: 10 });
 *   sliderObj.appendTo('#slider');
 * </script>
 * ```
 */
var Slider = /** @class */ (function (_super) {
    __extends(Slider, _super);
    function Slider(options, element) {
        var _this = _super.call(this, options, element) || this;
        _this.horDir = 'left';
        _this.verDir = 'bottom';
        _this.transition = {
            handle: 'left .4s cubic-bezier(.25, .8, .25, 1), right .4s cubic-bezier(.25, .8, .25, 1), ' +
                'top .4s cubic-bezier(.25, .8, .25, 1) , bottom .4s cubic-bezier(.25, .8, .25, 1)',
            rangeBar: 'all .4s cubic-bezier(.25, .8, .25, 1)'
        };
        _this.transitionOnMaterialTooltip = {
            handle: 'left 1ms ease-out, right 1ms ease-out, bottom 1ms ease-out, top 1ms ease-out',
            rangeBar: 'left 1ms ease-out, right 1ms ease-out, bottom 1ms ease-out, width 1ms ease-out, height 1ms ease-out'
        };
        _this.scaleTransform = 'transform .4s cubic-bezier(.25, .8, .25, 1)';
        _this.customAriaText = null;
        _this.drag = true;
        _this.isDragComplete = false;
        _this.initialTooltip = true;
        return _this;
    }
    Slider.prototype.preRender = function () {
        var localeText = { incrementTitle: 'Increase', decrementTitle: 'Decrease' };
        this.l10n = new L10n('slider', localeText, this.locale);
        this.isElementFocused = false;
        this.tickElementCollection = [];
        this.tooltipFormatInfo = {};
        this.ticksFormatInfo = {};
        this.initCultureInfo();
        this.initCultureFunc();
        this.formChecker();
    };
    Slider.prototype.formChecker = function () {
        var formElement = closest(this.element, 'form');
        if (formElement) {
            this.isForm = true;
            // this condition needs to be checked, if the slider is going to be refreshed by `refresh()`
            // then we need to revert the slider `value` back to `formResetValue` to preserve the initial value
            if (!isNullOrUndefined(this.formResetValue)) {
                this.setProperties({ 'value': this.formResetValue }, true);
            }
            this.formResetValue = this.value;
            if (this.type === 'Range' &&
                (isNullOrUndefined(this.formResetValue) || typeof (this.formResetValue) !== 'object')) {
                this.formResetValue = [parseFloat(formatUnit(this.min)), parseFloat(formatUnit(this.max))];
            }
            else if (isNullOrUndefined(this.formResetValue)) {
                this.formResetValue = parseFloat(formatUnit(this.min));
            }
            this.formElement = formElement;
        }
        else {
            this.isForm = false;
        }
    };
    Slider.prototype.initCultureFunc = function () {
        this.internationalization = new Internationalization(this.locale);
    };
    Slider.prototype.initCultureInfo = function () {
        this.tooltipFormatInfo.format = (!isNullOrUndefined(this.tooltip.format)) ? this.tooltip.format : null;
        this.ticksFormatInfo.format = (!isNullOrUndefined(this.ticks.format)) ? this.ticks.format : null;
    };
    Slider.prototype.formatString = function (value, formatInfo) {
        var formatValue = null;
        var formatString = null;
        if ((value || value === 0)) {
            formatValue = this.formatNumber(value);
            var numberOfDecimals = this.numberOfDecimals(value);
            formatString = this.internationalization.getNumberFormat(formatInfo)(this.makeRoundNumber(value, numberOfDecimals));
        }
        return { elementVal: formatValue, formatString: formatString };
    };
    Slider.prototype.formatNumber = function (value) {
        var numberOfDecimals = this.numberOfDecimals(value);
        return this.internationalization.getNumberFormat({
            maximumFractionDigits: numberOfDecimals,
            minimumFractionDigits: numberOfDecimals, useGrouping: false
        })(value);
    };
    Slider.prototype.numberOfDecimals = function (value) {
        var decimalPart = value.toString().split('.')[1];
        var numberOfDecimals = !decimalPart || !decimalPart.length ? 0 : decimalPart.length;
        return numberOfDecimals;
    };
    Slider.prototype.makeRoundNumber = function (value, precision) {
        var decimals = precision || 0;
        return Number(value.toFixed(decimals));
    };
    /**
     * To Initialize the control rendering
     *
     * @returns {void}
     * @private
     */
    Slider.prototype.render = function () {
        var _this = this;
        this.initialize();
        this.initRender();
        this.wireEvents();
        this.setZindex();
        this.renderComplete();
        if (this.element.tagName === 'EJS-SLIDER') {
            if (this.getTheme(this.sliderContainer) === 'none') {
                setTimeout(function () {
                    _this.refresh();
                }, 0);
            }
        }
    };
    Slider.prototype.initialize = function () {
        addClass([this.element], classNames.root);
        this.setCSSClass();
    };
    Slider.prototype.setElementWidth = function (width) {
        if (!isNullOrUndefined(width) && !isNullOrUndefined(this.sliderContainer)) {
            if (typeof width === 'number') {
                this.sliderContainer.style.width = formatUnit(width);
            }
            else if (typeof width === 'string') {
                this.sliderContainer.style.width = (width.match(/px|%|em/)) ? (width) : (formatUnit(width));
            }
        }
    };
    Slider.prototype.setCSSClass = function (oldCSSClass) {
        if (oldCSSClass) {
            removeClass([this.element], oldCSSClass.split(' '));
        }
        if (this.cssClass) {
            addClass([this.element], this.cssClass.split(' '));
        }
    };
    Slider.prototype.setEnabled = function () {
        if (!this.enabled) {
            addClass([this.sliderContainer], [classNames.sliderDisabled]);
            if (this.tooltip.isVisible && this.tooltipElement && this.tooltip.showOn === 'Always') {
                this.tooltipElement.classList.add(classNames.sliderDisabled);
            }
            this.unwireEvents();
        }
        else {
            removeClass([this.sliderContainer], [classNames.sliderDisabled]);
            if (this.tooltip.isVisible && this.tooltipElement && this.tooltip.showOn === 'Always') {
                this.tooltipElement.classList.remove(classNames.sliderDisabled);
            }
            this.wireEvents();
        }
    };
    Slider.prototype.getTheme = function (container) {
        var theme = window.getComputedStyle(container, ':after').getPropertyValue('content');
        return theme.replace(/['"]+/g, '');
    };
    /**
     * Initialize the rendering
     *
     * @returns {void}
     * @private
     */
    Slider.prototype.initRender = function () {
        this.sliderContainer = this.createElement('div', { className: classNames.sliderContainer + ' ' + classNames.controlWrapper });
        this.element.parentNode.insertBefore(this.sliderContainer, this.element);
        this.sliderContainer.appendChild(this.element);
        this.sliderTrack = this.createElement('div', { className: classNames.sliderTrack });
        this.element.appendChild(this.sliderTrack);
        this.setElementWidth(this.width);
        this.element.tabIndex = -1;
        this.getThemeInitialization();
        this.setHandler();
        this.createRangeBar();
        if (this.limits.enabled) {
            this.createLimitBar();
        }
        this.setOrientClass();
        this.hiddenInput = (this.createElement('input', {
            attrs: {
                type: 'hidden', value: (isNullOrUndefined(this.value) ? (isNullOrUndefined(this.min) ? '0' : this.min.toString()) : this.value.toString()),
                name: this.element.getAttribute('name') || this.element.getAttribute('id') ||
                    '_' + (Math.random() * 1000).toFixed(0) + 'slider', class: classNames.sliderHiddenInput
            }
        }));
        this.hiddenInput.tabIndex = -1;
        this.sliderContainer.appendChild(this.hiddenInput);
        if (this.showButtons) {
            this.setButtons();
        }
        this.setEnableRTL();
        if (this.type === 'Range') {
            this.rangeValueUpdate();
        }
        else {
            this.value = isNullOrUndefined(this.value) ? (isNullOrUndefined(this.min) ? 0 :
                parseFloat(formatUnit(this.min.toString()))) : this.value;
        }
        this.previousVal = this.type !== 'Range' ? this.checkHandleValue(parseFloat(formatUnit(this.value.toString()))) :
            [this.checkHandleValue(parseFloat(formatUnit(this.value[0].toString()))),
                this.checkHandleValue(parseFloat(formatUnit(this.value[1].toString())))];
        this.previousChanged = this.previousVal;
        if (!isNullOrUndefined(this.element.hasAttribute('name'))) {
            this.element.removeAttribute('name');
        }
        this.setValue();
        if (this.limits.enabled) {
            this.setLimitBar();
        }
        if (this.ticks.placement !== 'None') {
            this.renderScale();
        }
        if (this.tooltip.isVisible) {
            this.renderTooltip();
        }
        if (!this.enabled) {
            addClass([this.sliderContainer], [classNames.sliderDisabled]);
        }
        else {
            removeClass([this.sliderContainer], [classNames.sliderDisabled]);
        }
        if (this.readonly) {
            addClass([this.sliderContainer], [classNames.readonly]);
        }
        else {
            removeClass([this.sliderContainer], [classNames.readonly]);
        }
    };
    Slider.prototype.getThemeInitialization = function () {
        this.isMaterial = this.getTheme(this.sliderContainer) === 'material'
            || this.getTheme(this.sliderContainer) === 'material-dark';
        this.isMaterial3 = this.getTheme(this.sliderContainer) === 'Material3'
            || this.getTheme(this.sliderContainer) === 'Material3-dark';
        this.isBootstrap = this.getTheme(this.sliderContainer) === 'bootstrap'
            || this.getTheme(this.sliderContainer) === 'bootstrap-dark';
        this.isBootstrap4 = this.getTheme(this.sliderContainer) === 'bootstrap4';
        this.isTailwind = this.getTheme(this.sliderContainer) === 'tailwind' || this.getTheme(this.sliderContainer) === 'tailwind-dark';
        this.isTailwind3 = this.getTheme(this.sliderContainer) === 'tailwind3' || this.getTheme(this.sliderContainer) === 'tailwind3-dark';
        this.isBootstrap5 = this.getTheme(this.sliderContainer) === 'bootstrap5';
        this.isFluent = this.getTheme(this.sliderContainer) === 'FluentUI';
        this.isFluent2 = this.getTheme(this.sliderContainer) === 'fluent2';
        this.isBootstrap5Dot3 = this.getTheme(this.sliderContainer) === 'bootstrap5.3';
        this.isMaterialTooltip = (this.isMaterial || this.isMaterial3) && this.type !== 'Range' && this.tooltip.isVisible;
    };
    Slider.prototype.createRangeBar = function () {
        if (this.type !== 'Default') {
            this.rangeBar = (this.createElement('div', { attrs: { class: classNames.rangeBar } }));
            this.element.appendChild(this.rangeBar);
            if (this.drag && this.type === 'Range') {
                if (this.orientation === 'Horizontal') {
                    this.rangeBar.classList.add(classNames.dragHorizontal);
                }
                else {
                    this.rangeBar.classList.add(classNames.dragVertical);
                }
            }
        }
    };
    Slider.prototype.createLimitBar = function () {
        var firstElementClassName = this.type !== 'Range' ? classNames.limitBarDefault :
            classNames.limitBarFirst;
        firstElementClassName += ' ' + classNames.limits;
        this.limitBarFirst = (this.createElement('div', {
            attrs: { class: firstElementClassName }
        }));
        this.element.appendChild(this.limitBarFirst);
        if (this.type === 'Range') {
            this.limitBarSecond = (this.createElement('div', {
                attrs: {
                    class: classNames.limitBarSecond + ' ' + classNames.limits
                }
            }));
            this.element.appendChild(this.limitBarSecond);
        }
    };
    Slider.prototype.setOrientClass = function () {
        if (this.orientation !== 'Vertical') {
            this.sliderContainer.classList.remove(classNames.verticalSlider);
            this.sliderContainer.classList.add(classNames.horizontalSlider);
            this.firstHandle.setAttribute('aria-orientation', 'horizontal');
            if (this.type === 'Range') {
                this.secondHandle.setAttribute('aria-orientation', 'horizontal');
            }
        }
        else {
            this.sliderContainer.classList.remove(classNames.horizontalSlider);
            this.sliderContainer.classList.add(classNames.verticalSlider);
            this.firstHandle.setAttribute('aria-orientation', 'vertical');
            if (this.type === 'Range') {
                this.secondHandle.setAttribute('aria-orientation', 'vertical');
            }
        }
    };
    Slider.prototype.setAriaAttributes = function (element) {
        var _this = this;
        var min = this.min;
        var max = this.max;
        if (!isNullOrUndefined(this.customValues) && this.customValues.length > 0) {
            min = this.customValues[0];
            max = this.customValues[this.customValues.length - 1];
        }
        if (this.type !== 'Range') {
            attributes(element, {
                'aria-valuemin': isNullOrUndefined(min) ? '0' : min.toString(), 'aria-valuemax': (isNullOrUndefined(max) ? '100' : max.toString())
            });
        }
        else {
            var range = !isNullOrUndefined(this.customValues) && this.customValues.length > 0 ?
                [[min.toString(), (this.customValues[this.value[1]]).toString()],
                    [(this.customValues[this.value[0]]).toString(), max.toString()]] :
                [[min.toString(), this.value[1].toString()], [this.value[0].toString(), max.toString()]];
            range.forEach(function (range, index) {
                var element = index === 0 ? _this.firstHandle : _this.secondHandle;
                if (element) {
                    attributes(element, {
                        'aria-valuemin': range[0], 'aria-valuemax': range[1]
                    });
                }
            });
        }
    };
    Slider.prototype.createSecondHandle = function () {
        this.secondHandle = this.createElement('div', {
            attrs: {
                class: classNames.sliderHandle, 'role': 'slider', tabIndex: '0', 'aria-label': 'slider'
            }
        });
        this.secondHandle.classList.add(classNames.sliderSecondHandle);
        this.element.appendChild(this.secondHandle);
    };
    Slider.prototype.createFirstHandle = function () {
        this.firstHandle = this.createElement('div', {
            attrs: {
                class: classNames.sliderHandle, 'role': 'slider', tabIndex: '0', 'aria-label': 'slider'
            }
        });
        this.firstHandle.classList.add(classNames.sliderFirstHandle);
        this.element.appendChild(this.firstHandle);
        if (this.isMaterialTooltip) {
            this.materialHandle = this.createElement('div', {
                attrs: {
                    class: classNames.sliderHandle + ' ' +
                        classNames.sliderMaterialHandle
                }
            });
            this.element.appendChild(this.materialHandle);
        }
    };
    Slider.prototype.wireFirstHandleEvt = function (destroy) {
        if (!destroy) {
            EventHandler.add(this.firstHandle, 'mousedown touchstart', this.handleFocus, this);
            EventHandler.add(this.firstHandle, 'transitionend', this.transitionEnd, this);
            EventHandler.add(this.firstHandle, 'mouseenter touchenter', this.handleOver, this);
            EventHandler.add(this.firstHandle, 'mouseleave touchend', this.handleLeave, this);
        }
        else {
            EventHandler.remove(this.firstHandle, 'mousedown touchstart', this.handleFocus);
            EventHandler.remove(this.firstHandle, 'transitionend', this.transitionEnd);
            EventHandler.remove(this.firstHandle, 'mouseenter touchenter', this.handleOver);
            EventHandler.remove(this.firstHandle, 'mouseleave touchend', this.handleLeave);
        }
    };
    Slider.prototype.wireSecondHandleEvt = function (destroy) {
        if (!destroy) {
            EventHandler.add(this.secondHandle, 'mousedown touchstart', this.handleFocus, this);
            EventHandler.add(this.secondHandle, 'transitionend', this.transitionEnd, this);
            EventHandler.add(this.secondHandle, 'mouseenter touchenter', this.handleOver, this);
            EventHandler.add(this.secondHandle, 'mouseleave touchend', this.handleLeave, this);
        }
        else {
            EventHandler.remove(this.secondHandle, 'mousedown touchstart', this.handleFocus);
            EventHandler.remove(this.secondHandle, 'transitionend', this.transitionEnd);
            EventHandler.remove(this.secondHandle, 'mouseenter touchenter', this.handleOver);
            EventHandler.remove(this.secondHandle, 'mouseleave touchend', this.handleLeave);
        }
    };
    Slider.prototype.handleStart = function () {
        if (this.type !== 'Range') {
            this.firstHandle.classList[this.handlePos1 === 0 ? 'add' : 'remove'](classNames.sliderHandleStart);
            if (this.isMaterialTooltip) {
                this.materialHandle.classList[this.handlePos1 === 0 ? 'add' : 'remove'](classNames.sliderHandleStart);
                if (this.tooltipElement) {
                    this.tooltipElement.classList[this.handlePos1 === 0 ? 'add' : 'remove'](classNames.sliderTooltipStart);
                }
            }
        }
    };
    Slider.prototype.transitionEnd = function (e) {
        if (e.propertyName !== 'transform') {
            this.handleStart();
            if (!this.enableAnimation) {
                this.getHandle().style.transition = 'none';
            }
            if (this.type !== 'Default') {
                this.rangeBar.style.transition = 'none';
            }
            if ((this.isMaterial || this.isMaterial3) && this.tooltip.isVisible && this.type === 'Default') {
                this.tooltipElement.style.transition = this.transition.handle;
            }
            this.tooltipToggle(this.getHandle());
            this.closeTooltip();
        }
    };
    Slider.prototype.handleFocusOut = function () {
        if (this.firstHandle.classList.contains(classNames.sliderHandleFocused)) {
            this.firstHandle.classList.remove(classNames.sliderHandleFocused);
        }
        if (this.type === 'Range') {
            if (this.secondHandle.classList.contains(classNames.sliderHandleFocused)) {
                this.secondHandle.classList.remove(classNames.sliderHandleFocused);
            }
        }
    };
    Slider.prototype.handleFocus = function (e) {
        this.focusSliderElement();
        this.sliderBarClick(e);
        if (e.currentTarget === this.firstHandle) {
            this.firstHandle.classList.add(classNames.sliderHandleFocused);
            this.firstHandle.classList.add(classNames.sliderTabHandle);
        }
        else {
            this.secondHandle.classList.add(classNames.sliderHandleFocused);
            this.secondHandle.classList.add(classNames.sliderTabHandle);
        }
        EventHandler.add(document, 'mousemove touchmove', this.sliderBarMove, this);
        EventHandler.add(document, 'mouseup touchend', this.sliderBarUp, this);
    };
    Slider.prototype.handleOver = function (e) {
        if (this.tooltip.isVisible && this.tooltip.showOn === 'Hover') {
            this.tooltipToggle(e.currentTarget);
        }
        if (this.type === 'Default') {
            this.tooltipToggle(this.getHandle());
        }
    };
    Slider.prototype.handleLeave = function (e) {
        if (this.tooltip.isVisible && this.tooltip.showOn === 'Hover' &&
            !e.currentTarget.classList.contains(classNames.sliderHandleFocused) &&
            !e.currentTarget.classList.contains(classNames.sliderTabHandle)) {
            this.closeTooltip();
        }
    };
    Slider.prototype.setHandler = function () {
        this.createFirstHandle();
        if (this.type === 'Range') {
            this.createSecondHandle();
        }
    };
    Slider.prototype.setEnableRTL = function () {
        if (this.enableRtl && this.orientation !== 'Vertical') {
            addClass([this.sliderContainer], classNames.rtl);
        }
        else {
            removeClass([this.sliderContainer], classNames.rtl);
        }
        var preDir = (this.orientation !== 'Vertical') ? this.horDir : this.verDir;
        if (this.enableRtl) {
            this.horDir = 'right';
            this.verDir = 'bottom';
        }
        else {
            this.horDir = 'left';
            this.verDir = 'bottom';
        }
        var currDir = (this.orientation !== 'Vertical') ? this.horDir : this.verDir;
        if (preDir !== currDir) {
            if (this.orientation === 'Horizontal') {
                setStyleAttribute(this.firstHandle, { 'right': '', 'left': 'auto' });
                if (this.type === 'Range') {
                    setStyleAttribute(this.secondHandle, { 'top': '', 'left': 'auto' });
                }
            }
        }
        this.setBarColor();
    };
    Slider.prototype.tooltipValue = function () {
        var _this = this;
        var text;
        var args = {
            value: this.value,
            text: ''
        };
        if (this.initialTooltip) {
            this.initialTooltip = false;
            this.setTooltipContent();
            args.text = text = (typeof (this.tooltipObj.content) === 'function' ? this.tooltipObj.content() : this.tooltipObj.content);
            this.trigger('tooltipChange', args, function (observedArgs) {
                _this.addTooltipClass(observedArgs.text);
                if (text !== observedArgs.text) {
                    _this.customAriaText = observedArgs.text;
                    if (_this.enableHtmlSanitizer) {
                        observedArgs.text = SanitizeHtmlHelper.sanitize(observedArgs.text.toString());
                    }
                    else {
                        observedArgs.text = observedArgs.text.toString();
                    }
                    var contentTemp = function () {
                        return observedArgs.text;
                    };
                    _this.tooltipObj.content = initializeCSPTemplate(contentTemp);
                    _this.setAriaAttrValue(_this.firstHandle);
                    if (_this.type === 'Range') {
                        _this.setAriaAttrValue(_this.secondHandle);
                    }
                }
            });
            if (this.isMaterialTooltip) {
                this.setPreviousVal('change', this.value);
            }
        }
    };
    Slider.prototype.setTooltipContent = function () {
        var content = this.formatContent(this.tooltipFormatInfo, false);
        var contentTemp = function () {
            return content;
        };
        this.tooltipObj.content = initializeCSPTemplate(contentTemp);
    };
    Slider.prototype.formatContent = function (formatInfo, ariaContent) {
        var content = '';
        var handle1 = this.handleVal1;
        var handle2 = this.handleVal2;
        if (!isNullOrUndefined(this.customValues) && this.customValues.length > 0) {
            handle1 = this.customValues[this.handleVal1];
            handle2 = this.customValues[this.handleVal2];
        }
        if (!ariaContent) {
            if (this.type === 'Range') {
                if (this.enableRtl && this.orientation !== 'Vertical') {
                    content = (!isNullOrUndefined(formatInfo.format)) ? (this.formatString(handle2, formatInfo)
                        .formatString + ' - ' + this.formatString(handle1, formatInfo).formatString) :
                        (handle2.toString() + ' - ' + handle1.toString());
                }
                else {
                    content = (!isNullOrUndefined(formatInfo.format)) ? (this.formatString(handle1, formatInfo)
                        .formatString + ' - ' + this.formatString(handle2, formatInfo).formatString) :
                        (handle1.toString() + ' - ' + handle2.toString());
                }
            }
            else {
                if (!isNullOrUndefined(handle1)) {
                    content = (!isNullOrUndefined(formatInfo.format)) ?
                        this.formatString(handle1, formatInfo).formatString : handle1.toString();
                }
            }
            return content;
        }
        else {
            if (this.type === 'Range') {
                if (this.enableRtl && this.orientation !== 'Vertical') {
                    content = (!isNullOrUndefined(this.tooltip) && !isNullOrUndefined(this.tooltip.format)) ?
                        (this.formatString(handle2, formatInfo).elementVal + ' - ' +
                            this.formatString(handle1, formatInfo).elementVal) :
                        (handle2.toString() + ' - ' + handle1.toString());
                }
                else {
                    content = (!isNullOrUndefined(this.tooltip) && !isNullOrUndefined(this.tooltip.format)) ?
                        (this.formatString(handle1, formatInfo).elementVal + ' - ' +
                            this.formatString(handle2, formatInfo).elementVal) :
                        (handle1.toString() + ' - ' + handle2.toString());
                }
            }
            else {
                if (!isNullOrUndefined(handle1)) {
                    content = (!isNullOrUndefined(this.tooltip) && !isNullOrUndefined(this.tooltip.format)) ?
                        this.formatString(handle1, formatInfo).elementVal : handle1.toString();
                }
            }
            return content;
        }
    };
    Slider.prototype.addTooltipClass = function (content) {
        if (this.isMaterialTooltip) {
            var count = content.toString().length;
            if (!this.tooltipElement) {
                var cssClass = count > 4 ? classNames.sliderMaterialRange : classNames.sliderMaterialDefault;
                this.tooltipObj.cssClass = classNames.sliderTooltip + ' ' + cssClass;
            }
            else {
                var cssClass = count > 4 ?
                    { oldCss: classNames.sliderMaterialDefault, newCss: classNames.sliderMaterialRange } :
                    { oldCss: classNames.sliderMaterialRange, newCss: classNames.sliderMaterialDefault };
                this.tooltipElement.classList.remove(cssClass.oldCss);
                if (!this.tooltipElement.classList.contains(cssClass.newCss)) {
                    this.tooltipElement.classList.add(cssClass.newCss);
                    this.tooltipElement.style.transform = count > 4 ? 'scale(1)' :
                        this.getTooltipTransformProperties(this.previousTooltipClass).rotate;
                }
            }
        }
    };
    Slider.prototype.tooltipPlacement = function () {
        return this.orientation === 'Horizontal' ? (this.tooltip.placement === 'Before' ? 'TopCenter' : 'BottomCenter') :
            (this.tooltip.placement === 'Before' ? 'LeftCenter' : 'RightCenter');
    };
    Slider.prototype.tooltipBeforeOpen = function (args) {
        this.tooltipElement = args.element;
        if (this.tooltip.cssClass) {
            addClass([this.tooltipElement], this.tooltip.cssClass.split(' ').filter(function (css) { return css; }));
        }
        args.target.removeAttribute('aria-describedby');
        if (this.isMaterialTooltip) {
            this.tooltipElement.firstElementChild.classList.add(classNames.materialTooltipHide);
            this.handleStart();
            this.setTooltipTransform();
        }
    };
    Slider.prototype.tooltipCollision = function (position) {
        if (this.isBootstrap || this.isBootstrap4 || ((this.isMaterial || this.isMaterial3) && !this.isMaterialTooltip)) {
            var tooltipOffsetValue = this.isBootstrap4 ? bootstrap4TooltipOffset : bootstrapTooltipOffset;
            switch (position) {
                case 'TopCenter':
                    this.tooltipObj.setProperties({ 'offsetY': -(tooltipOffsetValue) }, false);
                    break;
                case 'BottomCenter':
                    this.tooltipObj.setProperties({ 'offsetY': tooltipOffsetValue }, false);
                    break;
                case 'LeftCenter':
                    this.tooltipObj.setProperties({ 'offsetX': -(tooltipOffsetValue) }, false);
                    break;
                case 'RightCenter':
                    this.tooltipObj.setProperties({ 'offsetX': tooltipOffsetValue }, false);
                    break;
            }
        }
    };
    Slider.prototype.materialTooltipEventCallBack = function (event) {
        this.sliderBarClick(event);
        EventHandler.add(document, 'mousemove touchmove', this.sliderBarMove, this);
        EventHandler.add(document, 'mouseup touchend', this.sliderBarUp, this);
    };
    Slider.prototype.wireMaterialTooltipEvent = function (destroy) {
        if (this.isMaterialTooltip) {
            if (!destroy) {
                EventHandler.add(this.tooltipElement, 'mousedown touchstart', this.materialTooltipEventCallBack, this);
            }
            else {
                EventHandler.remove(this.tooltipElement, 'mousedown touchstart', this.materialTooltipEventCallBack);
            }
        }
    };
    Slider.prototype.tooltipPositionCalculation = function (position) {
        var cssClass;
        switch (position) {
            case 'TopCenter':
                cssClass = classNames.horizontalTooltipBefore;
                break;
            case 'BottomCenter':
                cssClass = classNames.horizontalTooltipAfter;
                break;
            case 'LeftCenter':
                cssClass = classNames.verticalTooltipBefore;
                break;
            case 'RightCenter':
                cssClass = classNames.verticalTooltipAfter;
                break;
        }
        return cssClass;
    };
    Slider.prototype.getTooltipTransformProperties = function (className) {
        var transformProperties;
        if (this.tooltipElement) {
            var position = this.orientation === 'Horizontal' ?
                ((this.tooltipElement.clientHeight + 14) - (this.tooltipElement.clientHeight / 2)) :
                ((this.tooltipElement.clientWidth + 14) - (this.tooltipElement.clientWidth / 2));
            transformProperties = this.orientation === 'Horizontal' ?
                (className === classNames.horizontalTooltipBefore ? { rotate: 'rotate(45deg)', translate: "translateY(" + position + "px)" } :
                    { rotate: 'rotate(225deg)', translate: "translateY(" + -(position) + "px)" }) :
                (className === classNames.verticalTooltipBefore ? { rotate: 'rotate(-45deg)', translate: "translateX(" + position + "px)" } :
                    { rotate: 'rotate(-225deg)', translate: "translateX(" + (-position) + "px)" });
        }
        return transformProperties;
    };
    Slider.prototype.openMaterialTooltip = function () {
        var _this = this;
        if (this.isMaterialTooltip) {
            this.refreshTooltip(this.firstHandle);
            var tooltipContentElement = this.tooltipElement.firstElementChild;
            tooltipContentElement.classList.remove(classNames.materialTooltipHide);
            tooltipContentElement.classList.add(classNames.materialTooltipShow);
            this.firstHandle.style.cursor = 'default';
            this.tooltipElement.style.transition = this.scaleTransform;
            this.tooltipElement.classList.add(classNames.materialTooltipOpen);
            this.materialHandle.style.transform = 'scale(0)';
            if (tooltipContentElement.innerText.length > 4) {
                this.tooltipElement.style.transform = 'scale(1)';
            }
            else {
                this.tooltipElement.style.transform = this.getTooltipTransformProperties(this.previousTooltipClass).rotate;
            }
            if (this.type === 'Default') {
                setTimeout(function () { if (_this.tooltipElement) {
                    _this.tooltipElement.style.transition = _this.transition.handle;
                } }, 2500);
            }
            else {
                setTimeout(function () { if (_this.tooltipElement) {
                    _this.tooltipElement.style.transition = 'none';
                } }, 2500);
            }
        }
    };
    Slider.prototype.closeMaterialTooltip = function () {
        var _this = this;
        if (this.isMaterialTooltip) {
            var tooltipContentElement = this.tooltipElement.firstElementChild;
            this.tooltipElement.style.transition = this.scaleTransform;
            tooltipContentElement.classList.remove(classNames.materialTooltipShow);
            tooltipContentElement.classList.add(classNames.materialTooltipHide);
            this.firstHandle.style.cursor = '-webkit-grab';
            this.firstHandle.style.cursor = 'grab';
            if (this.materialHandle) {
                this.materialHandle.style.transform = 'scale(1)';
            }
            this.tooltipElement.classList.remove(classNames.materialTooltipOpen);
            this.setTooltipTransform();
            this.tooltipTarget = undefined;
            setTimeout(function () { if (_this.tooltipElement) {
                _this.tooltipElement.style.transition = 'none';
            } }, 2500);
        }
    };
    Slider.prototype.checkTooltipPosition = function (args) {
        var tooltipClass = this.tooltipPositionCalculation(args.collidedPosition);
        if (this.tooltipCollidedPosition === undefined ||
            this.tooltipCollidedPosition !== args.collidedPosition || !args.element.classList.contains(tooltipClass)) {
            if (this.isMaterialTooltip) {
                if (tooltipClass !== undefined) {
                    args.element.classList.remove(this.previousTooltipClass);
                    args.element.classList.add(tooltipClass);
                    this.previousTooltipClass = tooltipClass;
                }
                if (args.element.style.transform && args.element.classList.contains(classNames.materialTooltipOpen) &&
                    args.element.firstElementChild.innerText.length <= 4) {
                    args.element.style.transform = this.getTooltipTransformProperties(this.previousTooltipClass).rotate;
                }
            }
            this.tooltipCollidedPosition = args.collidedPosition;
        }
        if (this.isMaterialTooltip && this.tooltipElement && this.tooltipElement.style.transform.indexOf('translate') !== -1) {
            this.setTooltipTransform();
        }
    };
    Slider.prototype.setTooltipTransform = function () {
        var transformProperties = this.getTooltipTransformProperties(this.previousTooltipClass);
        if (isNullOrUndefined(this.tooltipElement)) {
            return;
        }
        if (this.tooltipElement.firstElementChild.innerText.length > 4) {
            this.tooltipElement.style.transform = transformProperties.translate + " scale(0.01)";
        }
        else {
            this.tooltipElement.style.transform = transformProperties.translate + " " + transformProperties.rotate + " scale(0.01)";
        }
    };
    Slider.prototype.renderTooltip = function () {
        this.tooltipObj = new Tooltip({
            showTipPointer: this.isBootstrap || this.isMaterial || this.isMaterial3 || this.isBootstrap4 || this.isTailwind
                || this.isTailwind3 || this.isBootstrap5 || this.isFluent || this.isFluent2 || this.isBootstrap5Dot3,
            cssClass: classNames.sliderTooltip,
            height: (this.isMaterial || this.isMaterial3) ? 30 : 'auto',
            animation: { open: { effect: 'None' }, close: { effect: 'FadeOut', duration: 500 } },
            opensOn: 'Custom',
            beforeOpen: this.tooltipBeforeOpen.bind(this),
            beforeCollision: this.checkTooltipPosition.bind(this),
            beforeClose: this.tooltipBeforeClose.bind(this),
            enableHtmlSanitizer: this.enableHtmlSanitizer
        });
        this.tooltipObj.appendTo(this.firstHandle);
        this.initializeTooltipProps();
    };
    Slider.prototype.initializeTooltipProps = function () {
        var tooltipShowOn = (this.tooltip.showOn === 'Auto' ? 'Hover' : this.tooltip.showOn);
        this.setProperties({ tooltip: { showOn: tooltipShowOn } }, true);
        this.tooltipObj.position = this.tooltipPlacement();
        this.tooltipCollision(this.tooltipObj.position);
        [this.firstHandle, this.rangeBar, this.secondHandle].forEach(function (handle) {
            if (!isNullOrUndefined(handle)) {
                handle.style.transition = 'none';
            }
        });
        if (this.isMaterialTooltip) {
            this.sliderContainer.classList.add(classNames.materialSlider);
            this.tooltipValue();
            this.tooltipObj.animation.close.effect = 'None';
            this.tooltipObj.open(this.firstHandle);
        }
    };
    Slider.prototype.tooltipBeforeClose = function () {
        this.tooltipElement = undefined;
        this.tooltipCollidedPosition = undefined;
    };
    Slider.prototype.setButtons = function () {
        this.firstBtn = this.createElement('div', { className: classNames.sliderButton + ' ' + classNames.firstButton });
        this.firstBtn.appendChild(this.createElement('span', { className: classNames.sliderButtonIcon }));
        if (this.isTailwind || this.isTailwind3) {
            this.firstBtn.querySelector('span').classList.add('e-icons');
        }
        this.firstBtn.tabIndex = -1;
        this.secondBtn = this.createElement('div', { className: classNames.sliderButton + ' ' + classNames.secondButton });
        this.secondBtn.appendChild(this.createElement('span', { className: classNames.sliderButtonIcon }));
        if (this.isTailwind || this.isTailwind3) {
            this.secondBtn.querySelector('span').classList.add('e-icons');
        }
        this.secondBtn.tabIndex = -1;
        this.sliderContainer.classList.add(classNames.sliderButtonClass);
        this.sliderContainer.appendChild(this.firstBtn);
        this.sliderContainer.appendChild(this.secondBtn);
        this.sliderContainer.appendChild(this.element);
        this.buttonTitle();
    };
    Slider.prototype.buttonTitle = function () {
        var enabledRTL = this.enableRtl && this.orientation !== 'Vertical';
        this.l10n.setLocale(this.locale);
        var decrementTitle = this.l10n.getConstant('decrementTitle');
        var incrementTitle = this.l10n.getConstant('incrementTitle');
        attributes(enabledRTL ? this.secondBtn : this.firstBtn, { 'aria-label': decrementTitle, title: decrementTitle });
        attributes(enabledRTL ? this.firstBtn : this.secondBtn, { 'aria-label': incrementTitle, title: incrementTitle });
    };
    Slider.prototype.buttonFocusOut = function () {
        if (this.isMaterial || this.isMaterial3) {
            this.getHandle().classList.remove('e-large-thumb-size');
        }
    };
    Slider.prototype.repeatButton = function (args) {
        var hVal = this.handleValueUpdate();
        var enabledRTL = this.enableRtl && this.orientation !== 'Vertical';
        var value;
        if (args.target.parentElement.classList.contains(classNames.firstButton)
            || args.target.classList.contains(classNames.firstButton)) {
            if (enabledRTL) {
                value = this.add(hVal, parseFloat(this.step.toString()), true);
            }
            else {
                value = this.add(hVal, parseFloat(this.step.toString()), false);
            }
        }
        else if (args.target.parentElement.classList.contains(classNames.secondButton)
            || (args.target.classList.contains(classNames.secondButton))) {
            if (enabledRTL) {
                value = this.add(hVal, parseFloat(this.step.toString()), false);
            }
            else {
                value = this.add(hVal, parseFloat(this.step.toString()), true);
            }
        }
        if (this.limits.enabled) {
            value = this.getLimitCorrectedValues(value);
        }
        if (value >= this.min && value <= this.max) {
            this.changeHandleValue(value);
            this.tooltipToggle(this.getHandle());
        }
    };
    Slider.prototype.repeatHandlerMouse = function (args) {
        args.preventDefault();
        if (args.type === ('mousedown') || args.type === ('touchstart')) {
            this.buttonClick(args);
            this.repeatInterval = setInterval(this.repeatButton.bind(this), 180, args);
        }
    };
    Slider.prototype.materialChange = function () {
        if (!this.getHandle().classList.contains('e-large-thumb-size')) {
            this.getHandle().classList.add('e-large-thumb-size');
        }
    };
    Slider.prototype.focusHandle = function () {
        if (!this.getHandle().classList.contains(classNames.sliderTabHandle)) {
            this.getHandle().classList.add(classNames.sliderTabHandle);
        }
    };
    Slider.prototype.repeatHandlerUp = function (e) {
        this.changeEvent('changed', e);
        this.closeTooltip();
        clearInterval(this.repeatInterval);
        this.getHandle().focus();
    };
    Slider.prototype.customTickCounter = function (bigNum) {
        var tickCount = 4;
        if (!isNullOrUndefined(this.customValues) && this.customValues.length > 0) {
            if (bigNum > 4) {
                tickCount = 3;
            }
            if (bigNum > 7) {
                tickCount = 2;
            }
            if (bigNum > 14) {
                tickCount = 1;
            }
            if (bigNum > 28) {
                tickCount = 0;
            }
        }
        return tickCount;
    };
    Slider.prototype.renderScale = function () {
        var orien = this.orientation === 'Vertical' ? 'v' : 'h';
        this.ul = this.createElement('ul', {
            className: classNames.scale + ' ' + 'e-' + orien + '-scale ' + classNames.tick + '-' + this.ticks.placement.toLowerCase(),
            attrs: { role: 'presentation', 'aria-hidden': 'true' }
        });
        this.ul.style.zIndex = '-1';
        if (Browser.isAndroid && orien === 'h') {
            this.ul.classList.add(classNames.sliderTickPosition);
        }
        var smallStep = this.ticks.smallStep;
        if (!this.ticks.showSmallTicks) {
            if (this.ticks.largeStep > 0) {
                smallStep = this.ticks.largeStep;
            }
            else {
                smallStep = (parseFloat(formatUnit(this.max))) - (parseFloat(formatUnit(this.min)));
            }
        }
        else if (smallStep <= 0) {
            smallStep = parseFloat(formatUnit(this.step));
        }
        var min = parseFloat(formatUnit(this.min));
        var max = parseFloat(formatUnit(this.max));
        var steps = parseFloat(formatUnit(smallStep));
        var bigNum = !isNullOrUndefined(this.customValues) && this.customValues.length > 0 && this.customValues.length - 1;
        var customStep = this.customTickCounter(bigNum);
        var count = !isNullOrUndefined(this.customValues) && this.customValues.length > 0 ?
            (bigNum * customStep) + bigNum : Math.abs((max - min) / steps);
        this.element.appendChild(this.ul);
        var li;
        var start = parseFloat(this.min.toString());
        if (orien === 'v') {
            start = parseFloat(this.max.toString());
        }
        var left = 0;
        var islargeTick;
        var tickWidth = 100 / count;
        if (tickWidth === Infinity) {
            tickWidth = 5;
        }
        for (var i = 0, y = !isNullOrUndefined(this.customValues) && this.customValues.length > 0 ?
            this.customValues.length - 1 : 0, k = 0; i <= count; i++) {
            li = (this.createElement('li', {
                attrs: {
                    class: classNames.tick, role: 'presentation',
                    'aria-hidden': 'true'
                }
            }));
            if (!isNullOrUndefined(this.customValues) && this.customValues.length > 0) {
                islargeTick = i % (customStep + 1) === 0;
                if (islargeTick) {
                    if (orien === 'h') {
                        start = this.customValues[k];
                        k++;
                    }
                    else {
                        start = this.customValues[y];
                        y--;
                    }
                    li.setAttribute('title', start.toString());
                }
            }
            else {
                li.setAttribute('title', start.toString());
                if (this.numberOfDecimals(this.max) === 0 && this.numberOfDecimals(this.min) === 0 &&
                    this.numberOfDecimals(this.step) === 0) {
                    if (orien === 'h') {
                        var reminder = (start - parseFloat(this.min.toString())) % this.ticks.largeStep;
                        islargeTick = (Math.abs(reminder) < tolerance || Math.abs(this.ticks.largeStep - reminder) < tolerance);
                    }
                    else {
                        var reminder = Math.abs(start - parseFloat(this.max.toString())) % this.ticks.largeStep;
                        islargeTick = (Math.abs(reminder) < tolerance || Math.abs(this.ticks.largeStep - reminder) < tolerance);
                    }
                }
                else {
                    var largestep = this.ticks.largeStep;
                    var startValue = start;
                    if (orien === 'h') {
                        var reminder = ((startValue - min) % largestep);
                        islargeTick = Math.abs(reminder) < tolerance || Math.abs(largestep - reminder) < tolerance;
                    }
                    else {
                        var reminder = Math.abs(startValue - parseFloat(max.toString())) % largestep;
                        islargeTick = Math.abs(reminder) < tolerance || Math.abs(largestep - reminder) < tolerance;
                    }
                }
            }
            if (islargeTick) {
                li.classList.add(classNames.large);
            }
            if (orien === 'h') {
                li.style.width = tickWidth + '%';
            }
            else {
                li.style.height = tickWidth + '%';
            }
            var repeat = islargeTick ? (this.ticks.placement === 'Both' ? 2 : 1) : 0;
            if (islargeTick) {
                for (var j = 0; j < repeat; j++) {
                    this.createTick(li, start);
                }
            }
            else if (isNullOrUndefined(this.customValues)) {
                this.formatTicksValue(li, start);
            }
            this.ul.appendChild(li);
            this.tickElementCollection.push(li);
            var decimalPoints = void 0;
            if (isNullOrUndefined(this.customValues)) {
                if (this.numberOfDecimals(smallStep) > this.numberOfDecimals(start)) {
                    decimalPoints = this.numberOfDecimals(smallStep);
                }
                else {
                    decimalPoints = this.numberOfDecimals(start);
                }
                if (orien === 'h') {
                    start = this.makeRoundNumber(start + smallStep, decimalPoints);
                }
                else {
                    if (this.min > this.max) {
                        start = this.makeRoundNumber(start + smallStep, decimalPoints);
                    }
                    else {
                        start = this.makeRoundNumber(start - smallStep, decimalPoints);
                    }
                }
                left = this.makeRoundNumber(left + smallStep, decimalPoints);
            }
        }
        this.ticksAlignment(orien, tickWidth);
    };
    Slider.prototype.ticksAlignment = function (orien, tickWidth, triggerEvent) {
        if (triggerEvent === void 0) { triggerEvent = true; }
        this.firstChild = this.ul.firstElementChild;
        this.lastChild = this.ul.lastElementChild;
        this.firstChild.classList.add(classNames.sliderFirstTick);
        this.lastChild.classList.add(classNames.sliderLastTick);
        this.sliderContainer.classList.add(classNames.scale + '-' + this.ticks.placement.toLowerCase());
        if (orien === 'h') {
            this.firstChild.style.width = tickWidth / 2 + '%';
            this.lastChild.style.width = tickWidth / 2 + '%';
        }
        else {
            this.firstChild.style.height = tickWidth / 2 + '%';
            this.lastChild.style.height = tickWidth / 2 + '%';
        }
        var eventArgs = { ticksWrapper: this.ul, tickElements: this.tickElementCollection };
        if (triggerEvent) {
            this.trigger('renderedTicks', eventArgs);
        }
        this.scaleAlignment();
    };
    Slider.prototype.createTick = function (li, start) {
        var span = this.createElement('span', {
            className: classNames.tickValue + ' ' + classNames.tick + '-' + this.ticks.placement.toLowerCase(),
            attrs: { role: 'presentation', 'aria-hidden': 'true' }
        });
        li.appendChild(span);
        if (isNullOrUndefined(this.customValues)) {
            this.formatTicksValue(li, start, span);
        }
        else {
            if (this.enableHtmlSanitizer) {
                span.innerHTML = SanitizeHtmlHelper.sanitize(start.toString());
            }
            else {
                span.innerHTML = start.toString();
            }
        }
    };
    Slider.prototype.formatTicksValue = function (li, start, spanElement) {
        var _this = this;
        var tickText = this.formatNumber(start);
        var text = !isNullOrUndefined(this.ticks) && !isNullOrUndefined(this.ticks.format) ?
            this.formatString(start, this.ticksFormatInfo).formatString : tickText;
        var eventArgs = { value: start, text: text, tickElement: li };
        this.trigger('renderingTicks', eventArgs, function (observedArgs) {
            li.setAttribute('title', observedArgs.text.toString());
            if (spanElement) {
                if (_this.enableHtmlSanitizer) {
                    spanElement.innerHTML = SanitizeHtmlHelper.sanitize(observedArgs.text.toString());
                }
                else {
                    spanElement.innerHTML = observedArgs.text.toString();
                }
            }
        });
    };
    Slider.prototype.scaleAlignment = function () {
        this.tickValuePosition();
        if (this.orientation === 'Vertical') {
            if (this.element.getBoundingClientRect().width <= 15) {
                this.sliderContainer.classList.add(classNames.sliderSmallSize);
            }
            else {
                this.sliderContainer.classList.remove(classNames.sliderSmallSize);
            }
        }
        else {
            if (this.element.getBoundingClientRect().height <= 15) {
                this.sliderContainer.classList.add(classNames.sliderSmallSize);
            }
            else {
                this.sliderContainer.classList.remove(classNames.sliderSmallSize);
            }
        }
    };
    Slider.prototype.tickValuePosition = function () {
        this.firstChild = this.element.querySelector('ul').children[0];
        var first = this.firstChild.getBoundingClientRect();
        var firstChild;
        var otherChild;
        var smallStep = this.ticks.smallStep;
        var count = Math.abs((parseFloat(formatUnit(this.max))) - (parseFloat(formatUnit(this.min)))) / smallStep;
        if (this.firstChild.children.length > 0) {
            firstChild = this.firstChild.children[0].getBoundingClientRect();
        }
        var tickElements = [this.sliderContainer.querySelectorAll('.' + classNames.tick + '.' +
                classNames.large + ' .' + classNames.tickValue)];
        var other;
        if (this.ticks.placement === 'Both') {
            other = [].slice.call(tickElements[0], 2);
        }
        else {
            other = [].slice.call(tickElements[0], 1);
        }
        var tickWidth = this.orientation === 'Vertical' ?
            (first.height * 2) : (first.width * 2);
        for (var i = 0; i < this.firstChild.children.length; i++) {
            if (this.orientation === 'Vertical') {
                this.firstChild.children[i].style.top = -(firstChild.height / 2) + 'px';
            }
            else {
                if (!this.enableRtl) {
                    this.firstChild.children[i].style.left = -(firstChild.width / 2) + 'px';
                }
                else {
                    this.firstChild.children[i].style.left = (tickWidth -
                        this.firstChild.children[i].getBoundingClientRect().width) / 2 + 'px';
                }
            }
        }
        for (var i = 0; i < other.length; i++) {
            otherChild = other[i].getBoundingClientRect();
            if (this.orientation === 'Vertical') {
                setStyleAttribute(other[i], { top: (tickWidth - otherChild.height) / 2 + 'px' });
            }
            else {
                setStyleAttribute(other[i], { left: (tickWidth - otherChild.width) / 2 + 'px' });
            }
        }
        if (this.enableRtl && this.lastChild.children.length && count !== 0) {
            this.lastChild.children[0].style.left = -(this.lastChild.getBoundingClientRect().width / 2) + 'px';
            if (this.ticks.placement === 'Both') {
                this.lastChild.children[1].style.left = -(this.lastChild.getBoundingClientRect().width / 2) + 'px';
            }
        }
        if (count === 0) {
            if (this.orientation === 'Horizontal') {
                if (!this.enableRtl) {
                    this.firstChild.classList.remove(classNames.sliderLastTick);
                    this.firstChild.style.left = this.firstHandle.style.left;
                }
                else {
                    this.firstChild.classList.remove(classNames.sliderLastTick);
                    this.firstChild.style.right = this.firstHandle.style.right;
                    this.firstChild.children[0].style.left =
                        (this.firstChild.getBoundingClientRect().width / 2) + 2 + 'px';
                    if (this.ticks.placement === 'Both') {
                        this.firstChild.children[1].style.left =
                            (this.firstChild.getBoundingClientRect().width / 2) + 2 + 'px';
                    }
                }
            }
            if (this.orientation === 'Vertical') {
                this.firstChild.classList.remove(classNames.sliderLastTick);
            }
        }
    };
    Slider.prototype.setAriaAttrValue = function (element) {
        var ariaValueText;
        var isTickFormatted = ((!isNullOrUndefined(this.ticks) && !isNullOrUndefined(this.ticks.format))) ? true : false;
        var text = !isTickFormatted ?
            this.formatContent(this.ticksFormatInfo, false) : this.formatContent(this.tooltipFormatInfo, false);
        var valuenow = isTickFormatted ? this.formatContent(this.ticksFormatInfo, true) :
            this.formatContent(this.tooltipFormatInfo, true);
        text = (!this.customAriaText) ? (text) : (this.customAriaText);
        if (text.split(' - ').length === 2) {
            ariaValueText = text.split(' - ');
        }
        else {
            ariaValueText = [text, text];
        }
        this.setAriaAttributes(element);
        if (this.type !== 'Range') {
            attributes(element, { 'aria-valuenow': valuenow, 'aria-valuetext': text });
        }
        else {
            if (!this.enableRtl) {
                if (element === this.firstHandle) {
                    attributes(element, { 'aria-valuenow': valuenow.split(' - ')[0], 'aria-valuetext': ariaValueText[0] });
                }
                else {
                    attributes(element, { 'aria-valuenow': valuenow.split(' - ')[1], 'aria-valuetext': ariaValueText[1] });
                }
            }
            else {
                if (element === this.firstHandle) {
                    attributes(element, { 'aria-valuenow': valuenow.split(' - ')[1], 'aria-valuetext': ariaValueText[1] });
                }
                else {
                    attributes(element, { 'aria-valuenow': valuenow.split(' - ')[0], 'aria-valuetext': ariaValueText[0] });
                }
            }
        }
    };
    Slider.prototype.handleValueUpdate = function () {
        var hVal;
        if (this.type === 'Range') {
            if (this.activeHandle === 1) {
                hVal = this.handleVal1;
            }
            else {
                hVal = this.handleVal2;
            }
        }
        else {
            hVal = this.handleVal1;
        }
        return hVal;
    };
    Slider.prototype.getLimitCorrectedValues = function (value) {
        if (this.type === 'MinRange' || this.type === 'Default') {
            value = (this.getLimitValueAndPosition(value, this.limits.minStart, this.limits.minEnd))[0];
        }
        else {
            if (this.activeHandle === 1) {
                value = (this.getLimitValueAndPosition(value, this.limits.minStart, this.limits.minEnd))[0];
            }
            else {
                value = (this.getLimitValueAndPosition(value, this.limits.maxStart, this.limits.maxEnd))[0];
            }
        }
        return value;
    };
    Slider.prototype.focusSliderElement = function () {
        if (!this.isElementFocused) {
            this.element.focus();
            this.isElementFocused = true;
        }
    };
    Slider.prototype.buttonClick = function (args) {
        this.focusSliderElement();
        var value;
        var enabledRTL = this.enableRtl && this.orientation !== 'Vertical';
        var hVal = this.handleValueUpdate();
        if ((args.keyCode === 40) || (args.keyCode === 37)
            || args.currentTarget.classList.contains(classNames.firstButton)) {
            if (enabledRTL) {
                value = this.add(hVal, parseFloat(this.step.toString()), true);
            }
            else {
                value = this.add(hVal, parseFloat(this.step.toString()), false);
            }
        }
        else if ((args.keyCode === 38) || (args.keyCode === 39) ||
            args.currentTarget.classList.contains(classNames.secondButton)) {
            if (enabledRTL) {
                value = this.add(hVal, parseFloat(this.step.toString()), false);
            }
            else {
                value = this.add(hVal, parseFloat(this.step.toString()), true);
            }
        }
        else if ((args.keyCode === 33
            || args.currentTarget.classList.contains(classNames.firstButton))) {
            if (enabledRTL) {
                value = this.add(hVal, parseFloat(this.ticks.largeStep.toString()), false);
            }
            else {
                value = this.add(hVal, parseFloat(this.ticks.largeStep.toString()), true);
            }
        }
        else if ((args.keyCode === 34) ||
            args.currentTarget.classList.contains(classNames.secondButton)) {
            if (enabledRTL) {
                value = this.add(hVal, parseFloat(this.ticks.largeStep.toString()), true);
            }
            else {
                value = this.add(hVal, parseFloat(this.ticks.largeStep.toString()), false);
            }
        }
        else if ((args.keyCode === 36)) {
            value = parseFloat(this.min < this.max ? this.min.toString() : this.max.toString());
        }
        else if ((args.keyCode === 35)) {
            value = parseFloat(this.min < this.max ? this.max.toString() : this.min.toString());
        }
        if (this.limits.enabled) {
            value = this.getLimitCorrectedValues(value);
        }
        this.changeHandleValue(value);
        if ((this.isMaterial || this.isMaterial3) && !this.tooltip.isVisible &&
            !this.getHandle().classList.contains(classNames.sliderTabHandle)) {
            this.materialChange();
        }
        this.tooltipToggle(this.getHandle());
        this.getHandle().focus();
        this.focusHandle();
        if (args.currentTarget.classList.contains(classNames.firstButton)) {
            EventHandler.add(this.firstBtn, 'mouseup touchend', this.buttonUp, this);
        }
        if (args.currentTarget.classList.contains(classNames.secondButton)) {
            EventHandler.add(this.secondBtn, 'mouseup touchend', this.buttonUp, this);
        }
    };
    Slider.prototype.tooltipToggle = function (target) {
        if (this.isMaterialTooltip) {
            if (!this.tooltipElement.classList.contains(classNames.materialTooltipOpen)) {
                this.openMaterialTooltip();
            }
            else {
                this.refreshTooltip(this.firstHandle);
            }
        }
        else {
            if (!this.tooltipElement) {
                this.openTooltip(target);
            }
            else {
                this.refreshTooltip(target);
            }
        }
    };
    Slider.prototype.buttonUp = function (args) {
        if (args.currentTarget.classList.contains(classNames.firstButton)) {
            EventHandler.remove(this.firstBtn, 'mouseup touchend', this.buttonUp);
        }
        if (args.currentTarget.classList.contains(classNames.secondButton)) {
            EventHandler.remove(this.secondBtn, 'mouseup touchend', this.buttonUp);
        }
    };
    Slider.prototype.setRangeBar = function () {
        if (this.orientation === 'Horizontal' && !isNullOrUndefined(this.rangeBar)) {
            if (this.type === 'MinRange') {
                if (this.enableRtl) {
                    this.rangeBar.style.right = '0px';
                }
                else {
                    this.rangeBar.style.left = '0px';
                }
                setStyleAttribute(this.rangeBar, { 'width': isNullOrUndefined(this.handlePos1) ? 0 : this.handlePos1 + 'px' });
            }
            else {
                if (this.enableRtl) {
                    this.rangeBar.style.right = this.handlePos1 + 'px';
                }
                else {
                    this.rangeBar.style.left = this.handlePos1 + 'px';
                }
                setStyleAttribute(this.rangeBar, { 'width': this.handlePos2 - this.handlePos1 + 'px' });
            }
        }
        else if (!isNullOrUndefined(this.rangeBar)) {
            if (this.type === 'MinRange') {
                this.rangeBar.style.bottom = this.min > this.max ? this.handlePos1 + 'px' : '0px';
                setStyleAttribute(this.rangeBar, { 'height': isNullOrUndefined(this.handlePos1) ? 0 : this.min > this.max ? this.element.clientHeight - this.handlePos1 + 'px' : this.handlePos1 + 'px' });
            }
            else {
                this.rangeBar.style.bottom = this.min > this.max ? this.handlePos2 + 'px' : this.handlePos1 + 'px';
                setStyleAttribute(this.rangeBar, { 'height': this.min > this.max ? this.handlePos1 - this.handlePos2 + 'px' : this.handlePos2 - this.handlePos1 + 'px' });
            }
        }
    };
    Slider.prototype.checkValidValueAndPos = function (value) {
        value = this.checkHandleValue(value);
        value = this.checkHandlePosition(value);
        return value;
    };
    Slider.prototype.setLimitBarPositions = function (fromMinPostion, fromMaxpostion, toMinPostion, toMaxpostion) {
        if (this.orientation === 'Horizontal') {
            if (!this.enableRtl) {
                this.limitBarFirst.style.left = fromMinPostion + 'px';
                this.limitBarFirst.style.width = (fromMaxpostion - fromMinPostion) + 'px';
            }
            else {
                this.limitBarFirst.style.right = fromMinPostion + 'px';
                this.limitBarFirst.style.width = (fromMaxpostion - fromMinPostion) + 'px';
            }
        }
        else {
            this.limitBarFirst.style.bottom = (this.min < this.max ? fromMinPostion : fromMaxpostion) + 'px';
            this.limitBarFirst.style.height = (this.min < this.max ? (fromMaxpostion - fromMinPostion) : (fromMinPostion - fromMaxpostion)) + 'px';
        }
        if (this.type === 'Range') {
            if (this.orientation === 'Horizontal') {
                if (!this.enableRtl) {
                    this.limitBarSecond.style.left = toMinPostion + 'px';
                    this.limitBarSecond.style.width = (toMaxpostion - toMinPostion) + 'px';
                }
                else {
                    this.limitBarSecond.style.right = toMinPostion + 'px';
                    this.limitBarSecond.style.width = (toMaxpostion - toMinPostion) + 'px';
                }
            }
            else {
                this.limitBarSecond.style.bottom = (this.min < this.max ? toMinPostion : toMaxpostion) + 'px';
                this.limitBarSecond.style.height = (this.min < this.max ? (toMaxpostion - toMinPostion) : (toMinPostion - toMaxpostion)) + 'px';
            }
        }
    };
    Slider.prototype.setLimitBar = function () {
        if (this.type === 'Default' || this.type === 'MinRange') {
            var fromPosition = (this.getLimitValueAndPosition(this.limits.minStart, this.limits.minStart, this.limits.minEnd, true))[0];
            fromPosition = this.checkValidValueAndPos(fromPosition);
            var toPosition = (this.getLimitValueAndPosition(this.limits.minEnd, this.limits.minStart, this.limits.minEnd, true))[0];
            toPosition = this.checkValidValueAndPos(toPosition);
            this.setLimitBarPositions(fromPosition, toPosition);
        }
        else if (this.type === 'Range') {
            var fromMinPostion = (this.getLimitValueAndPosition(this.limits.minStart, this.limits.minStart, this.limits.minEnd, true))[0];
            fromMinPostion = this.checkValidValueAndPos(fromMinPostion);
            var fromMaxpostion = (this.getLimitValueAndPosition(this.limits.minEnd, this.limits.minStart, this.limits.minEnd, true))[0];
            fromMaxpostion = this.checkValidValueAndPos(fromMaxpostion);
            var toMinPostion = (this.getLimitValueAndPosition(this.limits.maxStart, this.limits.maxStart, this.limits.maxEnd, true))[0];
            toMinPostion = this.checkValidValueAndPos(toMinPostion);
            var toMaxpostion = (this.getLimitValueAndPosition(this.limits.maxEnd, this.limits.maxStart, this.limits.maxEnd, true))[0];
            toMaxpostion = this.checkValidValueAndPos(toMaxpostion);
            this.setLimitBarPositions(fromMinPostion, fromMaxpostion, toMinPostion, toMaxpostion);
        }
    };
    Slider.prototype.getLimitValueAndPosition = function (currentValue, minValue, maxValue, limitBar) {
        if (isNullOrUndefined(minValue)) {
            minValue = this.min < this.max ? this.min : this.max;
            if (isNullOrUndefined(currentValue) && limitBar) {
                currentValue = minValue;
            }
        }
        if (isNullOrUndefined(maxValue)) {
            maxValue = this.min < this.max ? this.max : this.min;
            if (isNullOrUndefined(currentValue) && limitBar) {
                currentValue = maxValue;
            }
        }
        if (currentValue < minValue) {
            currentValue = minValue;
        }
        if (currentValue > maxValue) {
            currentValue = maxValue;
        }
        return [currentValue, this.checkHandlePosition(currentValue)];
    };
    Slider.prototype.setValue = function () {
        if (!isNullOrUndefined(this.customValues) && this.customValues.length > 0) {
            this.min = 0;
            this.max = this.customValues.length - 1;
            this.setBarColor();
        }
        this.setAriaAttributes(this.firstHandle);
        this.handleVal1 = isNullOrUndefined(this.value) ? this.checkHandleValue(parseFloat(this.min.toString())) :
            this.checkHandleValue(parseFloat(this.value.toString()));
        this.handlePos1 = this.checkHandlePosition(this.handleVal1);
        this.preHandlePos1 = this.handlePos1;
        if (isNullOrUndefined(this.activeHandle)) {
            this.activeHandle = this.type === 'Range' ? 2 : 1;
        }
        if (this.type === 'Default' || this.type === 'MinRange') {
            if (this.limits.enabled) {
                var values = this.getLimitValueAndPosition(this.handleVal1, this.limits.minStart, this.limits.minEnd);
                this.handleVal1 = values[0];
                this.handlePos1 = values[1];
                this.preHandlePos1 = this.handlePos1;
            }
            this.setHandlePosition(null);
            this.handleStart();
            this.value = this.handleVal1;
            this.setAriaAttrValue(this.firstHandle);
            this.changeEvent('changed', null);
        }
        else {
            this.validateRangeValue();
        }
        if (this.type !== 'Default') {
            this.setRangeBar();
        }
        if (this.limits.enabled) {
            this.setLimitBar();
        }
    };
    Slider.prototype.rangeValueUpdate = function () {
        if (this.value === null || typeof (this.value) !== 'object') {
            this.value = [parseFloat(formatUnit(this.min)), parseFloat(formatUnit(this.max))];
        }
    };
    Slider.prototype.validateRangeValue = function () {
        this.rangeValueUpdate();
        this.setRangeValue();
    };
    Slider.prototype.modifyZindex = function () {
        if (this.type === 'Range' && !isNullOrUndefined(this.firstHandle) && !isNullOrUndefined(this.secondHandle)) {
            if (this.activeHandle === 1) {
                this.firstHandle.style.zIndex = (this.zIndex + 4) + '';
                this.secondHandle.style.zIndex = (this.zIndex + 3) + '';
            }
            else {
                this.firstHandle.style.zIndex = (this.zIndex + 3) + '';
                this.secondHandle.style.zIndex = (this.zIndex + 4) + '';
            }
        }
        else if (this.isMaterialTooltip && this.tooltipElement) {
            this.tooltipElement.style.zIndex = getZindexPartial(this.element) + '';
        }
    };
    Slider.prototype.setHandlePosition = function (event) {
        var _this = this;
        var handle;
        var pos = (this.activeHandle === 1) ? this.handlePos1 : this.handlePos2;
        if (this.isMaterialTooltip) {
            handle = [this.firstHandle, this.materialHandle];
        }
        else {
            handle = [this.getHandle()];
        }
        this.handleStart();
        handle.forEach(function (handle) {
            if (isNullOrUndefined(handle)) {
                return;
            }
            if (_this.orientation === 'Horizontal') {
                if (_this.enableRtl) {
                    handle.style.right = pos + "px";
                }
                else {
                    handle.style.left = pos + "px";
                }
            }
            else {
                handle.style.bottom = pos + "px";
            }
        });
        this.changeEvent('change', event);
    };
    Slider.prototype.getHandle = function () {
        return (this.activeHandle === 1) ? this.firstHandle : this.secondHandle;
    };
    Slider.prototype.setRangeValue = function () {
        this.updateRangeValue();
        this.activeHandle = 1;
        this.setHandlePosition(null);
        this.activeHandle = 2;
        this.setHandlePosition(null);
        this.activeHandle = 1;
    };
    Slider.prototype.changeEvent = function (eventName, e) {
        var previous = eventName === 'change' ? this.previousVal : this.previousChanged;
        if (this.type !== 'Range') {
            this.setProperties({ 'value': this.handleVal1 }, true);
            if (previous !== this.value && (!this.isMaterialTooltip || !this.initialTooltip)) {
                this.trigger(eventName, this.changeEventArgs(eventName, e));
                this.initialTooltip = true;
                this.setPreviousVal(eventName, this.value);
            }
            this.setAriaAttrValue(this.firstHandle);
        }
        else {
            var value = this.value = [this.handleVal1, this.handleVal2];
            this.setProperties({ 'value': value }, true);
            if (previous.length === this.value.length
                && this.value[0] !== previous[0] || this.value[1] !== previous[1]) {
                this.initialTooltip = false;
                this.trigger(eventName, this.changeEventArgs(eventName, e));
                this.initialTooltip = true;
                this.setPreviousVal(eventName, this.value);
            }
            this.setAriaAttrValue(this.getHandle());
        }
        this.hiddenInput.value = this.value.toString();
    };
    Slider.prototype.changeEventArgs = function (eventName, e) {
        var eventArgs;
        if (this.tooltip.isVisible && this.tooltipObj && this.initialTooltip) {
            this.tooltipValue();
            eventArgs = {
                value: this.value,
                previousValue: eventName === 'change' ? this.previousVal : this.previousChanged,
                action: eventName, text: (typeof (this.tooltipObj.content) === 'function' ? this.tooltipObj.content() : this.tooltipObj.content), isInteracted: isNullOrUndefined(e) ? false : true
            };
        }
        else {
            eventArgs = {
                value: this.value,
                previousValue: eventName === 'change' ? this.previousVal : this.previousChanged,
                action: eventName, text: isNullOrUndefined(this.ticksFormatInfo.format) ? this.value.toString() :
                    (this.type !== 'Range' ? this.formatString(this.value, this.ticksFormatInfo).formatString :
                        (this.formatString(this.value[0], this.ticksFormatInfo).formatString + ' - ' +
                            this.formatString(this.value[1], this.ticksFormatInfo).formatString)),
                isInteracted: isNullOrUndefined(e) ? false : true
            };
        }
        return eventArgs;
    };
    Slider.prototype.setPreviousVal = function (eventName, value) {
        if (eventName === 'change') {
            this.previousVal = value;
        }
        else {
            this.previousChanged = value;
        }
    };
    Slider.prototype.updateRangeValue = function () {
        var values = this.value.toString().split(',').map(Number);
        if ((this.enableRtl && this.orientation !== 'Vertical') || this.rtl) {
            this.value = [values[1], values[0]];
        }
        else {
            this.value = [values[0], values[1]];
        }
        if (this.enableRtl && this.orientation !== 'Vertical') {
            this.handleVal1 = this.checkHandleValue(this.value[1]);
            this.handleVal2 = this.checkHandleValue(this.value[0]);
        }
        else {
            this.handleVal1 = this.checkHandleValue(this.value[0]);
            this.handleVal2 = this.checkHandleValue(this.value[1]);
        }
        this.handlePos1 = this.checkHandlePosition(this.handleVal1);
        this.handlePos2 = this.checkHandlePosition(this.handleVal2);
        if (this.min < this.max && this.handlePos1 > this.handlePos2) {
            this.handlePos1 = this.handlePos2;
            this.handleVal1 = this.handleVal2;
        }
        if (this.min > this.max && this.handlePos1 < this.handlePos2) {
            this.handlePos2 = this.handlePos1;
            this.handleVal2 = this.handleVal1;
        }
        this.preHandlePos1 = this.handlePos1;
        this.preHandlePos2 = this.handlePos2;
        if (this.limits.enabled) {
            this.activeHandle = 1;
            var values_1 = this.getLimitValueAndPosition(this.handleVal1, this.limits.minStart, this.limits.minEnd);
            this.handleVal1 = values_1[0];
            this.handlePos1 = values_1[1];
            this.preHandlePos1 = this.handlePos1;
            this.activeHandle = 2;
            values_1 = this.getLimitValueAndPosition(this.handleVal2, this.limits.maxStart, this.limits.maxEnd);
            this.handleVal2 = values_1[0];
            this.handlePos2 = values_1[1];
            this.preHandlePos2 = this.handlePos2;
        }
    };
    Slider.prototype.checkHandlePosition = function (value) {
        var pos;
        value = (100 *
            (value - (parseFloat(formatUnit(this.min))))) / ((parseFloat(formatUnit(this.max))) - (parseFloat(formatUnit(this.min))));
        if (this.orientation === 'Horizontal') {
            pos = this.element.getBoundingClientRect().width * (value / 100);
        }
        else {
            pos = this.element.getBoundingClientRect().height * (value / 100);
        }
        if (((parseFloat(formatUnit(this.max))) === (parseFloat(formatUnit(this.min))))) {
            if (this.orientation === 'Horizontal') {
                pos = this.element.getBoundingClientRect().width;
            }
            else {
                pos = this.element.getBoundingClientRect().height;
            }
        }
        return pos;
    };
    Slider.prototype.checkHandleValue = function (value) {
        if (this.min === this.max) {
            return (parseFloat(formatUnit(this.max)));
        }
        var handle = this.tempStartEnd();
        if (value < handle.start) {
            value = handle.start;
        }
        else if (value > handle.end) {
            value = handle.end;
        }
        return value;
    };
    /**
     * It is used to reposition slider.
     *
     * @returns {void}
     */
    Slider.prototype.reposition = function () {
        var _this = this;
        if (!isNullOrUndefined(this.firstHandle)) {
            this.firstHandle.style.transition = 'none';
        }
        if (this.type !== 'Default' && !isNullOrUndefined(this.rangeBar)) {
            this.rangeBar.style.transition = 'none';
        }
        if (this.type === 'Range' && !isNullOrUndefined(this.secondHandle)) {
            this.secondHandle.style.transition = 'none';
        }
        this.handlePos1 = this.checkHandlePosition(this.handleVal1);
        if (this.handleVal2) {
            this.handlePos2 = this.checkHandlePosition(this.handleVal2);
        }
        if (this.orientation === 'Horizontal') {
            if (this.enableRtl) {
                this.firstHandle.style.right = this.handlePos1 + "px";
            }
            else {
                this.firstHandle.style.left = this.handlePos1 + "px";
            }
            if (this.isMaterialTooltip && !isNullOrUndefined(this.materialHandle)) {
                if (this.enableRtl) {
                    this.materialHandle.style.right = this.handlePos1 + "px";
                }
                else {
                    this.materialHandle.style.left = this.handlePos1 + "px";
                }
            }
            if (this.type === 'MinRange' && !isNullOrUndefined(this.rangeBar)) {
                if (this.enableRtl) {
                    this.rangeBar.style.right = '0px';
                }
                else {
                    this.rangeBar.style.left = '0px';
                }
                setStyleAttribute(this.rangeBar, { 'width': isNullOrUndefined(this.handlePos1) ? 0 : this.handlePos1 + 'px' });
            }
            else if (this.type === 'Range' && !isNullOrUndefined(this.secondHandle) && !isNullOrUndefined(this.rangeBar)) {
                if (this.enableRtl) {
                    this.secondHandle.style.right = this.handlePos2 + "px";
                    this.rangeBar.style.right = this.handlePos1 + 'px';
                }
                else {
                    this.secondHandle.style.left = this.handlePos2 + "px";
                    this.rangeBar.style.left = this.handlePos1 + 'px';
                }
                setStyleAttribute(this.rangeBar, { 'width': this.handlePos2 - this.handlePos1 + 'px' });
            }
        }
        else {
            this.firstHandle.style.bottom = this.handlePos1 + "px";
            if (this.isMaterialTooltip) {
                this.materialHandle.style.bottom = this.handlePos1 + "px";
            }
            if (this.type === 'MinRange') {
                this.rangeBar.style.bottom = this.min > this.max ? this.handlePos1 + 'px' : '0px';
                setStyleAttribute(this.rangeBar, { 'height': isNullOrUndefined(this.handlePos1) ? 0 : this.min > this.max ? this.element.clientHeight - this.handlePos1 + 'px' : this.handlePos1 + 'px' });
            }
            else if (this.type === 'Range') {
                this.secondHandle.style.bottom = this.handlePos2 + "px";
                this.rangeBar.style.bottom = this.min > this.max ? this.handlePos2 + 'px' : this.handlePos1 + 'px';
                setStyleAttribute(this.rangeBar, { 'height': this.min > this.max ? this.handlePos1 - this.handlePos2 + 'px' : this.handlePos2 - this.handlePos1 + 'px' });
            }
        }
        if (this.limits.enabled) {
            this.setLimitBar();
        }
        if (this.ticks.placement !== 'None' && this.ul) {
            this.removeElement(this.ul);
            this.ul = undefined;
            this.renderScale();
        }
        this.handleStart();
        if (!this.tooltip.isVisible) {
            setTimeout(function () {
                if (!isNullOrUndefined(_this.firstHandle)) {
                    _this.firstHandle.style.transition = _this.scaleTransform;
                }
                if (_this.type === 'Range' && !isNullOrUndefined(_this.secondHandle)) {
                    _this.secondHandle.style.transition = _this.scaleTransform;
                }
            });
        }
        this.refreshTooltip(this.tooltipTarget);
        this.setBarColor();
    };
    Slider.prototype.changeHandleValue = function (value) {
        var position = null;
        if (this.activeHandle === 1) {
            if (!(this.limits.enabled && this.limits.startHandleFixed)) {
                this.handleVal1 = this.checkHandleValue(value);
                this.handlePos1 = this.checkHandlePosition(this.handleVal1);
                if (this.type === 'Range' && ((this.handlePos1 > this.handlePos2 && this.min < this.max) || (this.handlePos1 < this.handlePos2 && this.min > this.max))) {
                    this.handlePos1 = this.handlePos2;
                    this.handleVal1 = this.handleVal2;
                }
                if (this.handlePos1 !== this.preHandlePos1) {
                    position = this.preHandlePos1 = this.handlePos1;
                }
            }
            this.modifyZindex();
        }
        else {
            if (!(this.limits.enabled && this.limits.endHandleFixed)) {
                this.handleVal2 = this.checkHandleValue(value);
                this.handlePos2 = this.checkHandlePosition(this.handleVal2);
                if (this.type === 'Range' && ((this.handlePos2 < this.handlePos1 && this.min < this.max) || (this.handlePos2 > this.handlePos1 && this.min > this.max))) {
                    this.handlePos2 = this.handlePos1;
                    this.handleVal2 = this.handleVal1;
                }
                if (this.handlePos2 !== this.preHandlePos2) {
                    position = this.preHandlePos2 = this.handlePos2;
                }
            }
            this.modifyZindex();
        }
        if (position !== null) {
            if (this.type !== 'Default') {
                this.setRangeBar();
            }
            this.setHandlePosition(null);
        }
    };
    Slider.prototype.tempStartEnd = function () {
        if (this.min > this.max) {
            return {
                start: this.max,
                end: this.min
            };
        }
        else {
            return {
                start: this.min,
                end: this.max
            };
        }
    };
    Slider.prototype.xyToPosition = function (position) {
        var pos;
        if (this.min === this.max) {
            return 100;
        }
        if (this.orientation === 'Horizontal') {
            var left = position.x - this.element.getBoundingClientRect().left;
            var num = this.element.offsetWidth / 100;
            this.val = (left / num);
        }
        else {
            var top_1 = position.y - this.element.getBoundingClientRect().top;
            var num = this.element.offsetHeight / 100;
            this.val = 100 - (top_1 / num);
        }
        var val = this.stepValueCalculation(this.val);
        if (val < 0) {
            val = 0;
        }
        else if (val > 100) {
            val = 100;
        }
        if (this.enableRtl && this.orientation !== 'Vertical') {
            val = 100 - val;
        }
        if (this.orientation === 'Horizontal') {
            pos = this.element.getBoundingClientRect().width * (val / 100);
        }
        else {
            pos = this.element.getBoundingClientRect().height * (val / 100);
        }
        return pos;
    };
    Slider.prototype.stepValueCalculation = function (value) {
        if (this.step === 0) {
            this.step = 1;
        }
        var percentStep = (parseFloat(formatUnit(this.step))) / ((parseFloat(formatUnit(this.max)) - parseFloat(formatUnit(this.min))) / 100);
        var remain = value % Math.abs(percentStep);
        if (remain !== 0) {
            if ((percentStep / 2) > remain) {
                value -= remain;
            }
            else {
                value += Math.abs(percentStep) - remain;
            }
        }
        return value;
    };
    Slider.prototype.add = function (a, b, addition) {
        var precision;
        var x = Math.pow(10, precision || 3);
        var val;
        if (addition) {
            val = (Math.round(a * x) + Math.round(b * x)) / x;
        }
        else {
            val = (Math.round(a * x) - Math.round(b * x)) / x;
        }
        return val;
    };
    Slider.prototype.positionToValue = function (pos) {
        var val;
        var diff = parseFloat(formatUnit(this.max)) - parseFloat(formatUnit(this.min));
        if (this.orientation === 'Horizontal') {
            val = (pos / this.element.getBoundingClientRect().width) * diff;
        }
        else {
            val = (pos / this.element.getBoundingClientRect().height) * diff;
        }
        var total = this.add(val, parseFloat(this.min.toString()), true);
        return (total);
    };
    Slider.prototype.sliderBarClick = function (evt) {
        evt.preventDefault();
        var pos;
        if (evt.type === 'mousedown' || evt.type === 'mouseup' || evt.type === 'click') {
            pos = { x: evt.clientX, y: evt.clientY };
        }
        else if (evt.type === 'touchend' || evt.type === 'touchstart') {
            pos = { x: evt.changedTouches[0].clientX, y: evt.changedTouches[0].clientY };
        }
        var handlepos = this.xyToPosition(pos);
        var handleVal = this.positionToValue(handlepos);
        if (this.type === 'Range' && (this.min < (this.max) && (this.handlePos2 - handlepos) < (handlepos - this.handlePos1) || (this.min > this.max) && (this.handlePos1 - handlepos) > (handlepos - this.handlePos2))) {
            this.activeHandle = 2;
            if (!(this.limits.enabled && this.limits.endHandleFixed)) {
                if (this.limits.enabled) {
                    var value = this.getLimitValueAndPosition(handleVal, this.limits.maxStart, this.limits.maxEnd);
                    handleVal = value[0];
                    handlepos = value[1];
                }
                this.secondHandle.classList.add(classNames.sliderActiveHandle);
                this.handlePos2 = this.preHandlePos2 = handlepos;
                this.handleVal2 = handleVal;
            }
            this.modifyZindex();
            this.secondHandle.focus();
        }
        else {
            this.activeHandle = 1;
            if (!(this.limits.enabled && this.limits.startHandleFixed)) {
                if (this.limits.enabled) {
                    var value = this.getLimitValueAndPosition(handleVal, this.limits.minStart, this.limits.minEnd);
                    handleVal = value[0];
                    handlepos = value[1];
                }
                this.firstHandle.classList.add(classNames.sliderActiveHandle);
                this.handlePos1 = this.preHandlePos1 = handlepos;
                this.handleVal1 = handleVal;
            }
            this.modifyZindex();
            this.firstHandle.focus();
        }
        if (this.isMaterialTooltip) {
            this.tooltipElement.classList.add(classNames.materialTooltipActive);
        }
        var focusedElement = this.element.querySelector('.' + classNames.sliderTabHandle);
        if (focusedElement && this.getHandle() !== focusedElement) {
            focusedElement.classList.remove(classNames.sliderTabHandle);
        }
        var handle = this.activeHandle === 1 ? this.firstHandle : this.secondHandle;
        var behindElement;
        if ((evt.type === 'click' || evt.type === 'mousedown') && evt.target === handle) {
            var eventX = evt.clientX, eventY = evt.clientY;
            behindElement = document.elementFromPoint(eventX, eventY);
        }
        if (!this.checkRepeatedValue(handleVal)) {
            return;
        }
        var transition = (this.isMaterial || this.isMaterial3) && this.tooltip.isVisible ?
            this.transitionOnMaterialTooltip : this.transition;
        this.getHandle().style.transition = transition.handle;
        if (this.type !== 'Default') {
            this.rangeBar.style.transition = transition.rangeBar;
        }
        this.setHandlePosition(evt);
        if (this.isMaterialTooltip) {
            this.initialTooltip = false;
        }
        if (evt.target !== handle) {
            this.changeEvent('changed', evt);
        }
        if (this.type !== 'Default') {
            this.setRangeBar();
        }
    };
    Slider.prototype.handleValueAdjust = function (handleValue, assignValue, handleNumber) {
        if (handleNumber === 1) {
            this.handleVal1 = assignValue;
            this.handleVal2 = this.handleVal1 + this.minDiff;
        }
        else if (handleNumber === 2) {
            this.handleVal2 = assignValue;
            this.handleVal1 = this.handleVal2 - this.minDiff;
        }
        this.handlePos1 = this.checkHandlePosition(this.handleVal1);
        this.handlePos2 = this.checkHandlePosition(this.handleVal2);
    };
    Slider.prototype.dragRangeBarMove = function (event) {
        var _a, _b;
        if (event.type !== 'touchmove') {
            event.preventDefault();
        }
        this.rangeBarDragged = true;
        var pos;
        this.rangeBar.style.transition = 'none';
        this.firstHandle.style.transition = 'none';
        this.secondHandle.style.transition = 'none';
        var xPostion;
        var yPostion;
        if (event.type === 'mousemove') {
            _a = [event.clientX, event.clientY], xPostion = _a[0], yPostion = _a[1];
        }
        else {
            _b = [event.changedTouches[0].clientX, event.changedTouches[0].clientY], xPostion = _b[0], yPostion = _b[1];
        }
        if (!(this.limits.enabled && this.limits.startHandleFixed) && !(this.limits.enabled && this.limits.endHandleFixed)) {
            if (!this.enableRtl) {
                pos = { x: xPostion - this.firstPartRemain, y: yPostion + this.secondPartRemain };
            }
            else {
                pos = { x: xPostion + this.secondPartRemain, y: yPostion + this.secondPartRemain };
            }
            if (this.min > this.max) {
                this.handlePos2 = this.xyToPosition(pos);
                this.handleVal2 = this.positionToValue(this.handlePos2);
            }
            else {
                this.handlePos1 = this.xyToPosition(pos);
                this.handleVal1 = this.positionToValue(this.handlePos1);
            }
            if (!this.enableRtl) {
                pos = { x: xPostion + this.secondPartRemain, y: yPostion - this.firstPartRemain };
            }
            else {
                pos = { x: xPostion - this.firstPartRemain, y: yPostion - this.firstPartRemain };
            }
            if (this.min > this.max) {
                this.handlePos1 = this.xyToPosition(pos);
                this.handleVal1 = this.positionToValue(this.handlePos1);
            }
            else {
                this.handlePos2 = this.xyToPosition(pos);
                this.handleVal2 = this.positionToValue(this.handlePos2);
            }
            if (this.limits.enabled) {
                var value = this.getLimitValueAndPosition(this.handleVal1, this.limits.minStart, this.limits.minEnd);
                this.handleVal1 = value[0];
                this.handlePos1 = value[1];
                if (this.handleVal1 === this.limits.minEnd) {
                    this.handleValueAdjust(this.handleVal1, this.limits.minEnd, 1);
                }
                if (this.handleVal1 === this.limits.minStart) {
                    this.handleValueAdjust(this.handleVal1, this.limits.minStart, 1);
                }
                value = this.getLimitValueAndPosition(this.handleVal2, this.limits.maxStart, this.limits.maxEnd);
                this.handleVal2 = value[0];
                this.handlePos2 = value[1];
                if (this.handleVal2 === this.limits.maxStart) {
                    this.handleValueAdjust(this.handleVal2, this.limits.maxStart, 2);
                }
                if (this.handleVal2 === this.limits.maxEnd) {
                    this.handleValueAdjust(this.handleVal2, this.limits.maxEnd, 2);
                }
            }
            if (this.handleVal2 === (this.min > this.max ? this.min : this.max)) {
                this.handleValueAdjust(this.handleVal2, (this.min > this.max ? this.min : this.max), 2);
            }
            if (this.handleVal1 === (this.min > this.max ? this.max : this.min)) {
                this.handleValueAdjust(this.handleVal1, (this.min > this.max ? this.max : this.min), 1);
            }
        }
        this.activeHandle = 1;
        this.setHandlePosition(event);
        this.activeHandle = 2;
        this.setHandlePosition(event);
        this.tooltipToggle(this.rangeBar);
        this.setRangeBar();
    };
    Slider.prototype.sliderBarUp = function (event) {
        this.changeEvent('changed', event);
        this.handleFocusOut();
        this.firstHandle.classList.remove(classNames.sliderActiveHandle);
        if (this.type === 'Range') {
            this.initialTooltip = false;
            this.secondHandle.classList.remove(classNames.sliderActiveHandle);
        }
        this.closeTooltip();
        if (this.isMaterial || this.isMaterial3) {
            this.getHandle().classList.remove('e-large-thumb-size');
            if (this.isMaterialTooltip) {
                this.tooltipElement.classList.remove(classNames.materialTooltipActive);
            }
        }
        EventHandler.remove(document, 'mousemove touchmove', this.sliderBarMove);
        EventHandler.remove(document, 'mouseup touchend', this.sliderBarUp);
    };
    Slider.prototype.sliderBarMove = function (evt) {
        if (evt.type !== 'touchmove') {
            evt.preventDefault();
        }
        var pos;
        if (evt.type === 'mousemove') {
            pos = { x: evt.clientX, y: evt.clientY };
        }
        else {
            pos = { x: evt.changedTouches[0].clientX, y: evt.changedTouches[0].clientY };
        }
        var handlepos = this.xyToPosition(pos);
        var handleVal = this.positionToValue(handlepos);
        handlepos = Math.round(handlepos);
        if (this.type !== 'Range' && this.activeHandle === 1) {
            if (!(this.limits.enabled && this.limits.startHandleFixed)) {
                if (this.limits.enabled) {
                    var valueAndPostion = this.getLimitValueAndPosition(handleVal, this.limits.minStart, this.limits.minEnd);
                    handlepos = valueAndPostion[1];
                    handleVal = valueAndPostion[0];
                }
                this.handlePos1 = handlepos;
                this.handleVal1 = handleVal;
            }
            this.firstHandle.classList.add(classNames.sliderActiveHandle);
        }
        if (this.type === 'Range') {
            if (this.activeHandle === 1) {
                this.firstHandle.classList.add(classNames.sliderActiveHandle);
                if (!(this.limits.enabled && this.limits.startHandleFixed)) {
                    if ((this.min < this.max && handlepos > this.handlePos2 || (this.min > this.max && handlepos < this.handlePos2))) {
                        handlepos = this.handlePos2;
                        handleVal = this.handleVal2;
                    }
                    if (handlepos !== this.preHandlePos1) {
                        if (this.limits.enabled) {
                            var value = this.getLimitValueAndPosition(handleVal, this.limits.minStart, this.limits.minEnd);
                            handleVal = value[0];
                            handlepos = value[1];
                        }
                        this.handlePos1 = this.preHandlePos1 = handlepos;
                        this.handleVal1 = handleVal;
                        this.activeHandle = 1;
                    }
                }
            }
            else if (this.activeHandle === 2) {
                this.secondHandle.classList.add(classNames.sliderActiveHandle);
                if (!(this.limits.enabled && this.limits.endHandleFixed)) {
                    if ((this.min < this.max && handlepos < this.handlePos1) || (this.min > this.max && handlepos > this.handlePos1)) {
                        handlepos = this.handlePos1;
                        handleVal = this.handleVal1;
                    }
                    if (handlepos !== this.preHandlePos2) {
                        if (this.limits.enabled) {
                            var value = this.getLimitValueAndPosition(handleVal, this.limits.maxStart, this.limits.maxEnd);
                            handleVal = value[0];
                            handlepos = value[1];
                        }
                        this.handlePos2 = this.preHandlePos2 = handlepos;
                        this.handleVal2 = handleVal;
                        this.activeHandle = 2;
                    }
                }
            }
        }
        if (!this.checkRepeatedValue(handleVal)) {
            return;
        }
        this.getHandle().style.transition = this.scaleTransform;
        if (this.type !== 'Default') {
            this.rangeBar.style.transition = 'none';
        }
        this.setHandlePosition(evt);
        if ((this.isMaterial || this.isMaterial3) && !this.tooltip.isVisible &&
            !this.getHandle().classList.contains(classNames.sliderTabHandle)) {
            this.materialChange();
        }
        this.tooltipToggle(this.getHandle());
        if (this.type !== 'Default') {
            this.setRangeBar();
        }
    };
    Slider.prototype.dragRangeBarUp = function (event) {
        if (!this.rangeBarDragged) {
            this.focusSliderElement();
            this.sliderBarClick(event);
        }
        else {
            this.isDragComplete = true;
        }
        this.changeEvent('changed', event);
        this.closeTooltip();
        EventHandler.remove(document, 'mousemove touchmove', this.dragRangeBarMove);
        EventHandler.remove(document, 'mouseup touchend', this.dragRangeBarUp);
        this.rangeBarDragged = false;
    };
    Slider.prototype.checkRepeatedValue = function (currentValue) {
        if (this.type === 'Range') {
            var previousVal = this.enableRtl && this.orientation !== 'Vertical' ? (this.activeHandle === 1 ?
                this.previousVal[1] : this.previousVal[0]) :
                (this.activeHandle === 1 ? this.previousVal[0] : this.previousVal[1]);
            if (currentValue === previousVal) {
                return 0;
            }
        }
        else {
            if (currentValue === this.previousVal) {
                return 0;
            }
        }
        return 1;
    };
    Slider.prototype.refreshTooltip = function (target) {
        if (this.tooltip.isVisible && this.tooltipObj) {
            this.tooltipValue();
            if (target) {
                this.tooltipObj.refresh(target);
                this.tooltipTarget = target;
            }
        }
    };
    Slider.prototype.openTooltip = function (target) {
        if (this.tooltip.isVisible && this.tooltipObj && !this.isMaterialTooltip) {
            this.tooltipValue();
            this.tooltipObj.open(target);
            this.tooltipTarget = target;
        }
    };
    Slider.prototype.closeTooltip = function () {
        if (this.tooltip.isVisible && this.tooltipObj && this.tooltip.showOn !== 'Always' && !this.isMaterialTooltip) {
            this.tooltipValue();
            this.tooltipObj.close();
            this.tooltipTarget = undefined;
        }
    };
    Slider.prototype.keyDown = function (event) {
        switch (event.keyCode) {
            case 37:
            case 38:
            case 39:
            case 40:
            case 33:
            case 34:
            case 36:
            case 35:
                event.preventDefault();
                this.buttonClick(event);
                break;
        }
    };
    Slider.prototype.wireButtonEvt = function (destroy) {
        if (!destroy) {
            EventHandler.add(this.firstBtn, 'mouseleave touchleave', this.buttonFocusOut, this);
            EventHandler.add(this.secondBtn, 'mouseleave touchleave', this.buttonFocusOut, this);
            EventHandler.add(this.firstBtn, 'mousedown touchstart', this.repeatHandlerMouse, this);
            EventHandler.add(this.firstBtn, 'mouseup mouseleave touchup touchend', this.repeatHandlerUp, this);
            EventHandler.add(this.secondBtn, 'mousedown touchstart', this.repeatHandlerMouse, this);
            EventHandler.add(this.secondBtn, 'mouseup mouseleave touchup touchend', this.repeatHandlerUp, this);
            EventHandler.add(this.firstBtn, 'focusout', this.sliderFocusOut, this);
            EventHandler.add(this.secondBtn, 'focusout', this.sliderFocusOut, this);
        }
        else {
            EventHandler.remove(this.firstBtn, 'mouseleave touchleave', this.buttonFocusOut);
            EventHandler.remove(this.secondBtn, 'mouseleave touchleave', this.buttonFocusOut);
            EventHandler.remove(this.firstBtn, 'mousedown touchstart', this.repeatHandlerMouse);
            EventHandler.remove(this.firstBtn, 'mouseup mouseleave touchup touchend', this.repeatHandlerUp);
            EventHandler.remove(this.secondBtn, 'mousedown touchstart', this.repeatHandlerMouse);
            EventHandler.remove(this.secondBtn, 'mouseup mouseleave touchup touchend', this.repeatHandlerUp);
            EventHandler.remove(this.firstBtn, 'focusout', this.sliderFocusOut);
            EventHandler.remove(this.secondBtn, 'focusout', this.sliderFocusOut);
        }
    };
    Slider.prototype.rangeBarMousedown = function (event) {
        var _a, _b;
        event.preventDefault();
        this.focusSliderElement();
        if (this.type === 'Range' && this.drag && event.target === this.rangeBar) {
            var xPostion = void 0;
            var yPostion = void 0;
            if (event.type === 'mousedown') {
                _a = [event.clientX, event.clientY], xPostion = _a[0], yPostion = _a[1];
            }
            else if (event.type === 'touchstart') {
                _b = [event.changedTouches[0].clientX, event.changedTouches[0].clientY], xPostion = _b[0], yPostion = _b[1];
            }
            if (this.orientation === 'Horizontal') {
                this.firstPartRemain = xPostion - this.rangeBar.getBoundingClientRect().left;
                this.secondPartRemain = this.rangeBar.getBoundingClientRect().right - xPostion;
            }
            else {
                this.firstPartRemain = yPostion - this.rangeBar.getBoundingClientRect().top;
                this.secondPartRemain = this.rangeBar.getBoundingClientRect().bottom - yPostion;
            }
            this.minDiff = this.handleVal2 - this.handleVal1;
            this.tooltipToggle(this.rangeBar);
            var focusedElement = this.element.querySelector('.' + classNames.sliderTabHandle);
            if (focusedElement) {
                focusedElement.classList.remove(classNames.sliderTabHandle);
            }
            EventHandler.add(document, 'mousemove touchmove', this.dragRangeBarMove, this);
            EventHandler.add(document, 'mouseup touchend', this.dragRangeBarUp, this);
        }
    };
    Slider.prototype.elementClick = function (event) {
        if (this.isDragComplete) {
            this.isDragComplete = false;
            return;
        }
        event.preventDefault();
        this.focusSliderElement();
        this.sliderBarClick(event);
        this.focusHandle();
    };
    Slider.prototype.wireEvents = function () {
        this.onresize = this.reposition.bind(this);
        window.addEventListener('resize', this.onresize);
        if (this.enabled && !this.readonly) {
            EventHandler.add(this.element, 'click', this.elementClick, this);
            if (this.type === 'Range' && this.drag) {
                EventHandler.add(this.rangeBar, 'mousedown touchstart', this.rangeBarMousedown, this);
            }
            EventHandler.add(this.sliderContainer, 'keydown', this.keyDown, this);
            EventHandler.add(this.sliderContainer, 'keyup', this.keyUp, this);
            EventHandler.add(this.element, 'focusout', this.sliderFocusOut, this);
            EventHandler.add(this.sliderContainer, 'mouseover mouseout touchstart touchend', this.hover, this);
            this.wireFirstHandleEvt(false);
            if (this.type === 'Range') {
                this.wireSecondHandleEvt(false);
            }
            if (this.showButtons) {
                this.wireButtonEvt(false);
            }
            this.wireMaterialTooltipEvent(false);
            if (this.isForm) {
                EventHandler.add(this.formElement, 'reset', this.formResetHandler, this);
            }
        }
    };
    Slider.prototype.unwireEvents = function () {
        EventHandler.remove(this.element, 'click', this.elementClick);
        if (this.type === 'Range' && this.drag) {
            EventHandler.remove(this.rangeBar, 'mousedown touchstart', this.rangeBarMousedown);
        }
        EventHandler.remove(this.sliderContainer, 'keydown', this.keyDown);
        EventHandler.remove(this.sliderContainer, 'keyup', this.keyUp);
        EventHandler.remove(this.element, 'focusout', this.sliderFocusOut);
        EventHandler.remove(this.sliderContainer, 'mouseover mouseout touchstart touchend', this.hover);
        this.wireFirstHandleEvt(true);
        if (this.type === 'Range') {
            this.wireSecondHandleEvt(true);
        }
        if (this.showButtons) {
            this.wireButtonEvt(true);
        }
        this.wireMaterialTooltipEvent(true);
        EventHandler.remove(this.element, 'reset', this.formResetHandler);
    };
    Slider.prototype.formResetHandler = function () {
        this.setProperties({ 'value': this.formResetValue }, true);
        this.setValue();
    };
    Slider.prototype.keyUp = function (event) {
        if (event.keyCode === 9 && event.target.classList.contains(classNames.sliderHandle)) {
            this.focusSliderElement();
            if (!event.target.classList.contains(classNames.sliderTabHandle)) {
                if (this.element.querySelector('.' + classNames.sliderTabHandle)) {
                    this.element.querySelector('.' + classNames.sliderTabHandle).classList.remove(classNames.sliderTabHandle);
                }
                event.target.classList.add(classNames.sliderTabHandle);
                var parentElement = event.target.parentElement;
                if (parentElement === this.element) {
                    parentElement.querySelector('.' + classNames.sliderTrack).classList.add(classNames.sliderTabTrack);
                    if (this.type === 'Range' || this.type === 'MinRange') {
                        parentElement.querySelector('.' + classNames.rangeBar).classList.add(classNames.sliderTabRange);
                    }
                }
                if (this.type === 'Range') {
                    var previousSibling = event.target.previousSibling;
                    if (previousSibling && previousSibling.classList.contains(classNames.sliderHandle)) {
                        this.activeHandle = 2;
                    }
                    else {
                        this.activeHandle = 1;
                    }
                }
                this.getHandle().focus();
                this.tooltipToggle(this.getHandle());
            }
        }
        this.closeTooltip();
        this.changeEvent('changed', event);
    };
    Slider.prototype.hover = function (event) {
        if (!isNullOrUndefined(event)) {
            if (event.type === 'mouseover' || event.type === 'touchmove' || event.type === 'mousemove' ||
                event.type === 'pointermove' || event.type === 'touchstart') {
                this.sliderContainer.classList.add(classNames.sliderHover);
            }
            else {
                this.sliderContainer.classList.remove(classNames.sliderHover);
                var curTarget = event.currentTarget;
                if (this.tooltip.isVisible && this.tooltip.showOn !== 'Always' && this.tooltipObj && this.isMaterialTooltip &&
                    !curTarget.classList.contains(classNames.sliderHandleFocused) &&
                    !curTarget.classList.contains(classNames.sliderTabHandle)) {
                    this.closeMaterialTooltip();
                }
            }
        }
    };
    Slider.prototype.sliderFocusOut = function (event) {
        if (event.relatedTarget !== this.secondHandle && event.relatedTarget !== this.firstHandle &&
            event.relatedTarget !== this.element && event.relatedTarget !== this.firstBtn && event.relatedTarget !== this.secondBtn) {
            this.closeMaterialTooltip();
            this.closeTooltip();
            if (this.element.querySelector('.' + classNames.sliderTabHandle)) {
                this.element.querySelector('.' + classNames.sliderTabHandle).classList.remove(classNames.sliderTabHandle);
            }
            if (this.element.querySelector('.' + classNames.sliderTabTrack)) {
                this.element.querySelector('.' + classNames.sliderTabTrack).classList.remove(classNames.sliderTabTrack);
                if ((this.type === 'Range' || this.type === 'MinRange') &&
                    this.element.querySelector('.' + classNames.sliderTabRange)) {
                    this.element.querySelector('.' + classNames.sliderTabRange).classList.remove(classNames.sliderTabRange);
                }
            }
            this.hiddenInput.focus();
            this.hiddenInput.blur();
            this.isElementFocused = false;
        }
    };
    Slider.prototype.removeElement = function (element) {
        if (element.parentNode) {
            element.parentNode.removeChild(element);
        }
    };
    Slider.prototype.changeSliderType = function (type, args) {
        if (this.isMaterialTooltip && this.materialHandle) {
            this.sliderContainer.classList.remove(classNames.materialSlider);
            this.removeElement(this.materialHandle);
            this.materialHandle = undefined;
        }
        this.removeElement(this.firstHandle);
        this.firstHandle = undefined;
        if (type !== 'Default') {
            if (type === 'Range') {
                this.removeElement(this.secondHandle);
                this.secondHandle = undefined;
            }
            this.removeElement(this.rangeBar);
            this.rangeBar = undefined;
        }
        if (this.tooltip.isVisible && !isNullOrUndefined(this.tooltipObj)) {
            this.tooltipObj.destroy();
            this.tooltipElement = undefined;
            this.tooltipCollidedPosition = undefined;
        }
        if (this.limits.enabled) {
            if (type === 'MinRange' || type === 'Default') {
                if (!isNullOrUndefined(this.limitBarFirst)) {
                    this.removeElement(this.limitBarFirst);
                    this.limitBarFirst = undefined;
                }
            }
            else {
                if (!isNullOrUndefined(this.limitBarSecond)) {
                    this.removeElement(this.limitBarSecond);
                    this.limitBarSecond = undefined;
                }
            }
        }
        this.activeHandle = 1;
        this.getThemeInitialization();
        if (this.type === 'Range') {
            this.rangeValueUpdate();
        }
        this.createRangeBar();
        if (this.limits.enabled) {
            this.createLimitBar();
        }
        this.setHandler();
        this.setOrientClass();
        this.wireFirstHandleEvt(!this.enabled);
        if (this.type === 'Range') {
            this.wireSecondHandleEvt(!this.enabled);
        }
        this.setValue();
        if (this.tooltip.isVisible) {
            this.renderTooltip();
            this.wireMaterialTooltipEvent(false);
        }
        this.setBarColor();
        if (args !== 'tooltip') {
            this.updateConfig();
        }
        if (this.readonly) {
            this.sliderContainer.classList.remove(classNames.readonly);
            this.setReadOnly();
        }
    };
    Slider.prototype.changeRtl = function () {
        if (!this.enableRtl && this.type === 'Range') {
            this.value = [this.handleVal2, this.handleVal1];
        }
        this.updateConfig();
        if (this.tooltip.isVisible) {
            this.tooltipObj.refresh(this.firstHandle);
        }
        if (this.showButtons) {
            var enabledRTL = this.enableRtl && this.orientation !== 'Vertical';
            attributes(enabledRTL ? this.secondBtn : this.firstBtn, { 'aria-label': 'Decrease', title: 'Decrease' });
            attributes(enabledRTL ? this.firstBtn : this.secondBtn, { 'aria-label': 'Increase', title: 'Increase' });
        }
    };
    Slider.prototype.changeOrientation = function () {
        this.changeSliderType(this.type, 'null');
    };
    Slider.prototype.updateConfig = function () {
        this.setEnableRTL();
        this.setValue();
        if (this.tooltip.isVisible) {
            this.refreshTooltip(this.tooltipTarget);
        }
        if (this.ticks.placement !== 'None') {
            if (this.ul) {
                this.removeElement(this.ul);
                this.ul = undefined;
                this.renderScale();
            }
        }
        this.limitsPropertyChange();
    };
    Slider.prototype.limitsPropertyChange = function () {
        if (this.limits.enabled) {
            if (isNullOrUndefined(this.limitBarFirst) && this.type !== 'Range') {
                this.createLimitBar();
            }
            if (isNullOrUndefined(this.limitBarFirst) && isNullOrUndefined(this.limitBarSecond) && this.type === 'Range') {
                this.createLimitBar();
            }
            this.setLimitBar();
            this.setValue();
        }
        else {
            if (!isNullOrUndefined(this.limitBarFirst)) {
                detach(this.limitBarFirst);
            }
            if (!isNullOrUndefined(this.limitBarSecond)) {
                detach(this.limitBarSecond);
            }
        }
    };
    /**
     * Get the properties to be maintained in the persisted state.
     *
     * @returns {string} - Returns the string
     * @private
     */
    Slider.prototype.getPersistData = function () {
        var keyEntity = ['value'];
        return this.addOnPersist(keyEntity);
    };
    /**
     * Removes the component from the DOM and detaches all its related event handlers.
     * Also it removes the attributes and classes.
     *
     * @method destroy
     * @returns {void}
     */
    Slider.prototype.destroy = function () {
        _super.prototype.destroy.call(this);
        this.unwireEvents();
        window.removeEventListener('resize', this.onresize);
        removeClass([this.sliderContainer], [classNames.sliderDisabled]);
        this.firstHandle.removeAttribute('aria-orientation');
        if (this.type === 'Range') {
            this.secondHandle.removeAttribute('aria-orientation');
        }
        if (this.sliderContainer.parentNode) {
            this.sliderContainer.parentNode.insertBefore(this.element, this.sliderContainer);
        }
        detach(this.sliderContainer);
        if (this.tooltip.isVisible) {
            this.tooltipObj.destroy();
        }
        this.element.innerHTML = '';
        this.hiddenInput = null;
        this.sliderContainer = null;
        this.sliderTrack = null;
        this.rangeBar = null;
        this.firstHandle = null;
        this.secondHandle = null;
        this.tickElementCollection = null;
        this.ul = null;
        this.firstBtn = null;
        this.secondBtn = null;
        this.materialHandle = null;
        this.tooltipObj = null;
        this.tooltipTarget = null;
        this.limitBarFirst = null;
        this.limitBarSecond = null;
        this.firstChild = null;
        this.lastChild = null;
        this.tooltipElement = null;
    };
    /**
     * Calls internally if any of the property value is changed.
     *
     * @param {SliderModel} newProp - Specifies the new properties
     * @param {SliderModel} oldProp - Specifies the old properties
     * @returns {void}
     * @private
     */
    Slider.prototype.onPropertyChanged = function (newProp, oldProp) {
        var _this = this;
        for (var _i = 0, _a = Object.keys(newProp); _i < _a.length; _i++) {
            var prop = _a[_i];
            switch (prop) {
                case 'cssClass':
                    this.setCSSClass(oldProp.cssClass);
                    break;
                case 'value':
                    if (newProp && oldProp) {
                        var value = isNullOrUndefined(newProp.value) ?
                            (this.type === 'Range' ? [this.min, this.max] : this.min) : newProp.value;
                        this.setProperties({ 'value': value }, true);
                        if (!isNullOrUndefined(oldProp.value) && oldProp.value.toString() !== value.toString()) {
                            this.setValue();
                            this.refreshTooltip(this.tooltipTarget);
                            if (this.type === 'Range') {
                                if (isNullOrUndefined(newProp.value) || oldProp.value[1] === value[1]) {
                                    this.activeHandle = 1;
                                }
                                else {
                                    this.activeHandle = 2;
                                }
                            }
                        }
                    }
                    break;
                case 'min':
                case 'step':
                case 'max':
                    this.setMinMaxValue();
                    break;
                case 'tooltip':
                    if (!isNullOrUndefined(newProp.tooltip) && !isNullOrUndefined(oldProp.tooltip)) {
                        this.initialTooltip = true;
                        this.setTooltip(prop);
                        if (!this.showButtons) {
                            this.wireEvents();
                        }
                    }
                    break;
                case 'type':
                    if (!isNullOrUndefined(oldProp) && Object.keys(oldProp).length
                        && !isNullOrUndefined(oldProp.type)) {
                        this.changeSliderType(oldProp.type, prop);
                        this.setZindex();
                    }
                    break;
                case 'enableRtl':
                    if (oldProp.enableRtl !== newProp.enableRtl && this.orientation !== 'Vertical') {
                        this.rtl = oldProp.enableRtl;
                        this.changeRtl();
                    }
                    break;
                case 'limits':
                    this.limitsPropertyChange();
                    break;
                case 'orientation':
                    this.changeOrientation();
                    break;
                case 'ticks':
                    if (!isNullOrUndefined(this.sliderContainer.querySelector('.' + classNames.scale))) {
                        detach(this.ul);
                        Array.prototype.forEach.call(this.sliderContainer.classList, function (className) {
                            if (className.match(/e-scale-/)) {
                                _this.sliderContainer.classList.remove(className);
                            }
                        });
                    }
                    if (this.ticks.placement !== 'None') {
                        this.renderScale();
                        this.setZindex();
                    }
                    break;
                case 'locale':
                    if (this.showButtons) {
                        this.buttonTitle();
                    }
                    break;
                case 'showButtons':
                    if (newProp.showButtons) {
                        this.setButtons();
                        this.reposition();
                        if (this.enabled && !this.readonly) {
                            this.wireButtonEvt(false);
                        }
                    }
                    else {
                        if (this.firstBtn && this.secondBtn) {
                            this.sliderContainer.removeChild(this.firstBtn);
                            this.sliderContainer.removeChild(this.secondBtn);
                            this.sliderContainer.classList.remove(classNames.sliderButtonClass);
                            this.firstBtn = undefined;
                            this.secondBtn = undefined;
                            this.reposition();
                        }
                    }
                    break;
                case 'enabled':
                    this.setEnabled();
                    break;
                case 'readonly':
                    this.setReadOnly();
                    break;
                case 'customValues':
                    this.setValue();
                    this.reposition();
                    break;
                case 'colorRange':
                    this.reposition();
                    break;
                case 'width':
                    this.setElementWidth(newProp.width);
                    this.setMinMaxValue();
                    if (this.limits) {
                        this.limitsPropertyChange();
                    }
                    break;
            }
        }
    };
    Slider.prototype.setReadOnly = function () {
        if (this.readonly) {
            this.unwireEvents();
            this.sliderContainer.classList.add(classNames.readonly);
        }
        else {
            this.wireEvents();
            this.sliderContainer.classList.remove(classNames.readonly);
        }
    };
    Slider.prototype.setMinMaxValue = function () {
        var _this = this;
        this.setValue();
        this.refreshTooltip(this.tooltipTarget);
        if (!isNullOrUndefined(this.sliderContainer.querySelector('.' + classNames.scale))) {
            if (this.ul) {
                detach(this.ul);
                Array.prototype.forEach.call(this.sliderContainer.classList, function (className) {
                    if (className.match(/e-scale-/)) {
                        _this.sliderContainer.classList.remove(className);
                    }
                });
            }
        }
        if (this.ticks.placement !== 'None') {
            this.renderScale();
            this.setZindex();
        }
    };
    Slider.prototype.setZindex = function () {
        this.zIndex = 6;
        if (!isNullOrUndefined(this.ticks) && this.ticks.placement !== 'None' && !isNullOrUndefined(this.ul) && !isNullOrUndefined(this.element)) {
            this.ul.style.zIndex = (this.zIndex + -7) + '';
            this.element.style.zIndex = (this.zIndex + 2) + '';
        }
        if (!this.isMaterial && !this.isMaterial3 && !isNullOrUndefined(this.ticks) && this.ticks.placement === 'Both') {
            this.element.style.zIndex = (this.zIndex + 2) + '';
        }
        if (!isNullOrUndefined(this.firstHandle)) {
            this.firstHandle.style.zIndex = (this.zIndex + 3) + '';
        }
        if (this.type === 'Range' && !isNullOrUndefined(this.secondHandle)) {
            this.secondHandle.style.zIndex = (this.zIndex + 4) + '';
        }
    };
    Slider.prototype.setTooltip = function (args) {
        this.changeSliderType(this.type, args);
    };
    Slider.prototype.setBarColor = function () {
        var trackPosition;
        var trackClassName;
        var child = this.sliderTrack.lastElementChild;
        while (child) {
            this.sliderTrack.removeChild(child);
            child = this.sliderTrack.lastElementChild;
        }
        for (var i = 0; i < this.colorRange.length; i++) {
            if (!isNullOrUndefined(this.colorRange[i].start) && !isNullOrUndefined(this.colorRange[i].end)) {
                if (this.colorRange[i].end > this.colorRange[i].start) {
                    if (this.colorRange[i].start < this.min) {
                        this.colorRange[i].start = this.min;
                    }
                    if (this.colorRange[i].end > this.max) {
                        this.colorRange[i].end = this.max;
                    }
                    var startingPosition = this.checkHandlePosition(this.colorRange[i].start);
                    var endPosition = this.checkHandlePosition(this.colorRange[i].end);
                    var trackContainer = this.createElement('div');
                    trackContainer.style.backgroundColor = this.colorRange[i].color;
                    trackContainer.style.border = '1px solid ' + this.colorRange[i].color;
                    if (this.orientation === 'Horizontal') {
                        trackClassName = classNames.sliderHorizantalColor;
                        if (this.enableRtl) {
                            if (isNullOrUndefined(this.customValues)) {
                                trackPosition =
                                    this.checkHandlePosition(this.max) - this.checkHandlePosition(this.colorRange[i].end);
                            }
                            else {
                                trackPosition = this.checkHandlePosition(this.customValues.length - this.colorRange[i].end - 1);
                            }
                        }
                        else {
                            trackPosition = this.checkHandlePosition(this.colorRange[i].start);
                        }
                        trackContainer.style.width = endPosition - startingPosition + 'px';
                        trackContainer.style.left = trackPosition + 'px';
                    }
                    else {
                        trackClassName = classNames.sliderVerticalColor;
                        trackPosition = this.checkHandlePosition(this.colorRange[i].start);
                        trackContainer.style.height = endPosition - startingPosition + 'px';
                        trackContainer.style.bottom = trackPosition + 'px';
                    }
                    trackContainer.classList.add(trackClassName);
                    this.sliderTrack.appendChild(trackContainer);
                }
            }
        }
    };
    /**
     * Gets the component name
     *
     * @returns {string} - Returns the string
     * @private
     */
    Slider.prototype.getModuleName = function () {
        return 'slider';
    };
    __decorate([
        Property(null)
    ], Slider.prototype, "value", void 0);
    __decorate([
        Property(null)
    ], Slider.prototype, "customValues", void 0);
    __decorate([
        Property(1)
    ], Slider.prototype, "step", void 0);
    __decorate([
        Property(null)
    ], Slider.prototype, "width", void 0);
    __decorate([
        Property(0)
    ], Slider.prototype, "min", void 0);
    __decorate([
        Property(100)
    ], Slider.prototype, "max", void 0);
    __decorate([
        Property(false)
    ], Slider.prototype, "readonly", void 0);
    __decorate([
        Property('Default')
    ], Slider.prototype, "type", void 0);
    __decorate([
        Collection([{}], ColorRangeData)
    ], Slider.prototype, "colorRange", void 0);
    __decorate([
        Complex({}, TicksData)
    ], Slider.prototype, "ticks", void 0);
    __decorate([
        Complex({}, LimitData)
    ], Slider.prototype, "limits", void 0);
    __decorate([
        Property(true)
    ], Slider.prototype, "enabled", void 0);
    __decorate([
        Complex({}, TooltipData)
    ], Slider.prototype, "tooltip", void 0);
    __decorate([
        Property(false)
    ], Slider.prototype, "showButtons", void 0);
    __decorate([
        Property(true)
    ], Slider.prototype, "enableAnimation", void 0);
    __decorate([
        Property('Horizontal')
    ], Slider.prototype, "orientation", void 0);
    __decorate([
        Property('')
    ], Slider.prototype, "cssClass", void 0);
    __decorate([
        Property(true)
    ], Slider.prototype, "enableHtmlSanitizer", void 0);
    __decorate([
        Event()
    ], Slider.prototype, "created", void 0);
    __decorate([
        Event()
    ], Slider.prototype, "change", void 0);
    __decorate([
        Event()
    ], Slider.prototype, "changed", void 0);
    __decorate([
        Event()
    ], Slider.prototype, "renderingTicks", void 0);
    __decorate([
        Event()
    ], Slider.prototype, "renderedTicks", void 0);
    __decorate([
        Event()
    ], Slider.prototype, "tooltipChange", void 0);
    Slider = __decorate([
        NotifyPropertyChanges
    ], Slider);
    return Slider;
}(Component));
export { Slider };
