import { animationMode, Browser, createElement } from '@syncfusion/ej2-base';
import { RectOption, drawSymbol, linear } from '../../common/utils/helper';
import { getXLocation, getExactData, getRangeValueXByPoint, getNearestValue } from '../utils/helper';
import { PathOption } from '@syncfusion/ej2-svg-base';
import { Animation } from '@syncfusion/ej2-base';
/**
 * Class for slider
 */
var RangeSlider = /** @class */ (function () {
    function RangeSlider(range) {
        this.control = range;
        this.points = [];
        this.isIOS = Browser.isIos || Browser.isIos7;
        var thumb = range.navigatorStyleSettings.thumb;
        this.thumbVisible = (range.themeStyle.thumbWidth !== 0 && range.themeStyle.thumbHeight !== 0);
        this.elementId = range.element.id;
        this.thumpPadding = range.themeStyle.thumbWidth / 2;
        this.addEventListener();
        this.thumbColor = range.disableRangeSelector ? 'transparent' :
            (thumb.fill || range.themeStyle.thumbBackground);
    }
    /**
     * Render Slider elements for range navigator.
     *
     * @param {RangeNavigator} range - RangeNavigator instance.
     * @returns {void}
     */
    RangeSlider.prototype.render = function (range) {
        var renderer = range.renderer;
        var style = range.navigatorStyleSettings;
        var disabledColor = (range.disableRangeSelector) ? 'transparent' : null;
        var sliderGroup = renderer.createGroup({
            'id': this.elementId + '_sliders',
            style: (range.disableRangeSelector) ? 'pointer-events:none;' : ''
        });
        var option = new RectOption(this.elementId + '_leftUnSelectedArea', disabledColor || style.unselectedRegionColor || range.themeStyle.unselectedRectColor, { width: 0 }, 1, {
            x: range.bounds.x, y: range.bounds.y,
            width: range.bounds.width / 3,
            height: range.bounds.height
        }, 0, 0, '', style.thumb.border.dashArray);
        this.leftUnSelectedElement = renderer.drawRectangle(option);
        option.id = this.elementId + '_rightUnSelectedArea';
        this.rightUnSelectedElement = renderer.drawRectangle(option);
        option.id = this.elementId + '_SelectedArea';
        option.fill = disabledColor || style.selectedRegionColor || range.themeStyle.selectedRegionColor;
        this.selectedElement = renderer.drawRectangle(option);
        this.selectedElement.setAttribute('role', 'region');
        this.selectedElement.setAttribute('aria-label', 'Range Slider with ' + range.rangeSlider.points.length + ' data points');
        this.selectedElement.style.cursor = '-webkit-grab';
        this.leftSlider = renderer.createGroup({
            'id': this.elementId + '_LeftSlider', 'style': 'cursor: ew-resize'
        });
        this.rightSlider = renderer.createGroup({
            'id': this.elementId + '_RightSlider', 'style': 'cursor: ew-resize'
        });
        this.createThump(renderer, range.bounds, this.leftSlider, this.elementId + '_LeftSlider', sliderGroup);
        this.createThump(renderer, range.bounds, this.rightSlider, this.elementId + '_RightSlider');
        sliderGroup.appendChild(this.leftUnSelectedElement);
        sliderGroup.appendChild(this.rightUnSelectedElement);
        sliderGroup.appendChild(this.selectedElement);
        sliderGroup.appendChild(this.leftSlider);
        sliderGroup.appendChild(this.rightSlider);
        range.svgObject.appendChild(sliderGroup);
    };
    /**
     * Thumb creation performed.
     *
     * @param {SvgRenderer} render - SvgRenderer
     * @param {Rect} bounds - bounds
     * @param {Element} parent - parent element
     * @param {string} id - id
     * @param {Element} sliderGroup - sliderGroup
     * @returns {void}
     */
    RangeSlider.prototype.createThump = function (render, bounds, parent, id, sliderGroup) {
        var control = this.control;
        var thump = control.navigatorStyleSettings.thumb;
        var style = control.themeStyle;
        var y = bounds.y + bounds.height / 2;
        var x = this.thumpPadding;
        var tickLength = (control.themeStyle.thumbHeight / 2) - 5;
        var disabledColor = control.disableRangeSelector ? 'transparent' : null;
        var lineColor = disabledColor || thump.border.color || style.thumpLineColor;
        var shadowElement;
        parent.appendChild(render.drawPath(new PathOption(id + '_ThumpLine', 'transparent', thump.border.width, control.series.length ? lineColor : 'transparent', 1, thump.border.dashArray, 'M' + ' ' + (x) + ' ' + (bounds.y) + ' ' + 'L' + ' ' + (x) + ' ' + (bounds.y + bounds.height) + ' ')));
        this.thumpY = y - (control.themeStyle.thumbHeight / 2);
        this.sliderY = bounds.y > this.thumpY ? this.thumpY : bounds.y;
        if (sliderGroup && !control.disableRangeSelector) {
            shadowElement = render.createDefs();
            shadowElement.innerText = '<rect xmlns="http://www.w3.org/2000/svg" id="' + this.control.element.id + '_shadow' + '" x="0" ' +
                'y="' + this.thumpY + '" width="' + control.themeStyle.thumbWidth + '" height="' + control.themeStyle.thumbHeight + '"' +
                ' rx="' + (thump.type === 'Circle' ? '50%' : '0%') + '"/>' +
                '<filter xmlns="http://www.w3.org/2000/svg" x="-25.0%" y="-20.0%" width="150.0%" height="150.0%"' +
                ' filterUnits="objectBoundingBox" id="ej2-range-shadow"><feOffset dx="0" dy="1" in="SourceAlpha"' +
                'result="shadowOffsetOuter1"/><feGaussianBlur stdDeviation="1.5" in="shadowOffsetOuter1" result="shadowBlurOuter1"/>' +
                '<feComposite in="shadowBlurOuter1" in2="SourceAlpha" operator="out" result="shadowBlurOuter1"/>' +
                '<feColorMatrix values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.16 0" type="matrix" in="shadowBlurOuter1"/>' +
                '</filter>';
            sliderGroup.appendChild(shadowElement);
        }
        parent.innerText += '<use xmlns="http://www.w3.org/2000/svg" fill="black" fill-opacity="1" filter="url(#ej2-range-shadow)"' +
            ' xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#path-1"/>';
        if (thump.type === 'Circle') {
            parent.appendChild(drawSymbol({ x: x, y: y }, 'Circle', { width: control.themeStyle.thumbWidth, height: control.themeStyle.thumbHeight }, '', new PathOption(id + '_ThumpSymbol', disabledColor || this.thumbColor, thump.border.width, lineColor, 1, null), 'Thumb'));
        }
        else {
            parent.appendChild(render.drawRectangle(new RectOption(id + '_ThumpSymbol', disabledColor || this.thumbColor, { width: thump.border.width, color: lineColor }, 1, {
                x: x - (control.themeStyle.thumbWidth / 2), y: y - (control.themeStyle.thumbHeight / 2),
                width: control.themeStyle.thumbWidth,
                height: control.themeStyle.thumbHeight
            }, 2, 2, '', thump.border.dashArray)));
        }
        if (this.thumbVisible) {
            parent.appendChild(render.drawPath(new PathOption(id + '_ThumpGrip', 'transparent', 1, disabledColor || control.themeStyle.gripColor, 1, null, 'M' + ' ' + (x + 2) + ' ' + (y + tickLength) + ' ' + 'L' + ' ' + (x + 2) + ' ' + (y - tickLength) + ' ' +
                ((this.control.theme.indexOf('Fluent2') > -1 || this.control.theme.indexOf('Bootstrap5') > -1 || this.control.theme.indexOf('Tailwind3') > -1) ? '' : 'M' + ' ' + (x) + ' ' + (y + tickLength) + ' ' + 'L' + ' ' + (x) + ' ' + (y - tickLength) + ' ') +
                'M' + ' ' + (x - 2) + ' ' + (y + tickLength) + ' ' + 'L' + ' ' + (x - 2) + ' ' + (y - tickLength) + ' ')));
        }
    };
    /**
     * Sets the slider value for the range navigator.
     *
     * @param {number} start - The start value of the slider.
     * @param {number} end - The end value of the slider.
     * @param {boolean} trigger - Indicates whether to trigger events.
     * @param {boolean} showTooltip - Indicates whether to show tooltips.
     * @param {boolean} resize - Indicates whether to resize.
     * @returns {void}
     */
    RangeSlider.prototype.setSlider = function (start, end, trigger, showTooltip, resize) {
        if (resize === void 0) { resize = false; }
        var range = this.control;
        var padding = range.bounds.x;
        var axisRange = range.chartSeries.xAxis.actualRange;
        var isLeightWeight = range.series.length === 0;
        if (isNaN(start) && isNaN(end)) {
            start = 0;
            end = range.bounds.width;
        }
        if (!(end >= start)) {
            start = [end, end = start][0];
        }
        start = end >= start ? start : [end, end = start][0];
        start = Math.max(start, axisRange.min);
        end = Math.min(end, axisRange.max);
        this.startX = padding + getXLocation(start, axisRange, range.bounds.width, range.enableRtl);
        this.endX = padding + getXLocation(end, axisRange, range.bounds.width, range.enableRtl);
        var selectedX = range.enableRtl ? this.endX : this.startX;
        var rightPadding = range.enableRtl ? this.startX : this.endX;
        this.sliderWidth = Math.abs(this.endX - this.startX);
        this.selectedElement.setAttribute('x', (selectedX) + '');
        this.selectedElement.setAttribute('width', this.sliderWidth + '');
        this.leftUnSelectedElement.setAttribute('width', (selectedX - padding) + '');
        this.rightUnSelectedElement.setAttribute('x', rightPadding + '');
        this.rightUnSelectedElement.setAttribute('width', (range.bounds.width - (rightPadding - padding)) + '');
        this.leftSlider.setAttribute('transform', 'translate(' + (this.startX - this.thumpPadding) + ', 0)');
        this.rightSlider.setAttribute('transform', 'translate(' + (this.endX - this.thumpPadding) + ', 0)');
        var left = this.control.svgObject.getBoundingClientRect().left -
            this.control.element.getBoundingClientRect().left;
        var leftX = this.control.enableRtl ? this.endX : this.startX;
        var rightX = this.control.enableRtl ? this.startX : this.endX;
        this.leftRect = {
            x: isLeightWeight ? left + padding : padding,
            y: isLeightWeight ? 0 : range.bounds.y,
            width: isLeightWeight ? leftX - padding : leftX,
            height: isLeightWeight ? this.thumpY : range.bounds.height
        };
        this.rightRect = {
            x: isLeightWeight ? left + rightX : rightX,
            y: isLeightWeight ? 0 : range.bounds.y,
            width: (range.bounds.width - (rightPadding - padding)),
            height: isLeightWeight ? this.thumpY : range.bounds.height
        };
        this.midRect = {
            x: isLeightWeight ? leftX + left : 0,
            y: isLeightWeight ? 0 : range.bounds.y,
            width: isLeightWeight ? Math.abs(this.endX - this.startX) : rightX,
            height: isLeightWeight ? this.thumpY : range.bounds.height
        };
        this.currentStart = start;
        this.currentEnd = end;
        if (showTooltip) {
            this.control.rangeTooltipModule.renderLeftTooltip(this);
            this.control.rangeTooltipModule.renderRightTooltip(this);
        }
        var periodSelectorModule = this.control.periodSelectorModule;
        if (periodSelectorModule && this.control.redraw && (this.control.getModuleName() === 'rangeNavigator')) {
            var selectedIndex = periodSelectorModule.findSelectedIndex(start, end, periodSelectorModule.control.periods);
            periodSelectorModule.setSelectedStyle(selectedIndex);
            this.control.redraw = false;
        }
        if (trigger && !resize) {
            this.triggerEvent(axisRange);
        }
    };
    /**
     * Trigger changed event.
     *
     * @param {VisibleRangeModel} range - Axis visible range.
     * @returns {void}
     */
    RangeSlider.prototype.triggerEvent = function (range) {
        var xAxis = this.control.chartSeries.xAxis;
        var valueType = xAxis.valueType;
        var argsData = {
            cancel: false,
            start: valueType === 'DateTime' ? new Date(this.currentStart) : valueType === 'DateTimeCategory' ? this.currentStart :
                (valueType === 'Logarithmic' ? Math.pow(xAxis.logBase, this.currentStart) : this.currentStart),
            end: valueType === 'DateTime' ? new Date(this.currentEnd) : valueType === 'DateTimeCategory' ? this.currentEnd :
                (valueType === 'Logarithmic' ? Math.pow(xAxis.logBase, this.currentEnd) : this.currentEnd),
            name: 'changed',
            selectedData: getExactData(this.points, this.currentStart, this.currentEnd),
            zoomPosition: (this.control.enableRtl ? range.max - this.currentEnd :
                this.currentStart - range.min) / range.delta,
            zoomFactor: (this.currentEnd - this.currentStart) / range.delta,
            selectedPeriod: this.selectedPeriod ? this.selectedPeriod : ''
        };
        this.control.trigger('changed', argsData);
    };
    /**
     * @hidden
     * @returns {void}
     */
    RangeSlider.prototype.addEventListener = function () {
        if (this.control.isDestroyed) {
            return;
        }
        this.control.on(Browser.touchMoveEvent, this.mouseMoveHandler, this);
        this.control.on(Browser.touchStartEvent, this.mouseDownHandler, this);
        this.control.on(Browser.touchEndEvent, this.mouseUpHandler, this);
        this.control.on(Browser.isPointer ? 'pointerleave' : 'mouseleave', this.mouseCancelHandler, this);
    };
    /**
     * @hidden
     * @returns {void}
     */
    RangeSlider.prototype.removeEventListener = function () {
        if (this.control.isDestroyed) {
            return;
        }
        this.control.off(Browser.touchMoveEvent, this.mouseMoveHandler);
        this.control.off(Browser.touchStartEvent, this.mouseDownHandler);
        this.control.off(Browser.touchEndEvent, this.mouseUpHandler);
        this.control.off(Browser.isPointer ? 'pointerleave' : 'mouseleave', this.mouseCancelHandler);
    };
    /**
     * Mouse move handler perfomed here.
     *
     * @hidden
     * @param {PointerEvent | TouchEvent} e - Mouse event argument.
     * @returns {void}
     */
    RangeSlider.prototype.mouseMoveHandler = function (e) {
        var control = this.control;
        var axisRange = control.chartSeries.xAxis.actualRange;
        var bounds = control.bounds;
        var start;
        var end;
        this.getCurrentSlider(e.target.id);
        if (this.isDrag && control.mouseX >= bounds.x) {
            switch (this.currentSlider) {
                case 'Left':
                    control.startValue = this.getRangeValue(Math.abs(control.mouseX - bounds.x));
                    break;
                case 'Right':
                    control.endValue = this.getRangeValue(Math.abs(control.mouseX - bounds.x));
                    break;
                case 'Middle': {
                    start = Math.max(this.getRangeValue(Math.abs(this.startX - (this.previousMoveX - control.mouseX) - bounds.x)), axisRange.min);
                    end = Math.min(this.getRangeValue(Math.abs(this.endX - (this.previousMoveX - control.mouseX) - bounds.x)), axisRange.max);
                    var currentWidth = Math.floor(Math.abs(getXLocation(end, axisRange, control.bounds.width, control.enableRtl) -
                        getXLocation(start, axisRange, control.bounds.width, control.enableRtl)));
                    if (currentWidth === Math.floor(this.sliderWidth)) {
                        control.startValue = start;
                        control.endValue = end;
                    }
                    else {
                        if (end === axisRange.max) {
                            control.endValue = axisRange.max;
                        }
                        if (Math.floor(this.startX) === bounds.x) {
                            control.startValue = axisRange.min;
                        }
                    }
                    break;
                }
            }
            if (e.preventDefault && this.isIOS) {
                e.preventDefault();
            }
            if (this.currentSlider !== 'Middle') {
                var periodSelectorModule = this.control.periodSelectorModule;
                if (periodSelectorModule) {
                    var buttons = periodSelectorModule.control.periods;
                    buttons.map(function (period) {
                        period.selected = false;
                    });
                    periodSelectorModule.selectedIndex = undefined;
                    var selectedIndex = periodSelectorModule.findSelectedIndex(control.startValue, control.endValue, buttons);
                    periodSelectorModule.setSelectedStyle(selectedIndex);
                }
            }
            this.setSlider(control.startValue, control.endValue, !control.enableDeferredUpdate, (control.rangeTooltipModule && control.tooltip.enable));
            this.previousMoveX = control.mouseX;
        }
    };
    /**
     * To get the range value.
     *
     * @param {number} x - The xValue.
     * @returns {number} - The range value.
     */
    RangeSlider.prototype.getRangeValue = function (x) {
        var control = this.control;
        var axisRange = control.chartSeries.xAxis.actualRange;
        var bounds = control.bounds;
        return getRangeValueXByPoint(x, bounds.width, axisRange, control.enableRtl);
    };
    /**
     * Moused down handler for slider perform here.
     *
     * @param {PointerEvent} e - Mouse event argument.
     * @returns {void}
     */
    RangeSlider.prototype.mouseDownHandler = function (e) {
        this.currentSlider = this.getCurrentSlider(e.target.id);
        this.selectedElement.style.cursor = '-webkit-grabbing';
        this.isDrag = !(this.currentSlider === 'UnSelectedArea' || !this.currentSlider);
        this.previousMoveX = this.control.mouseDownX;
    };
    /**
     * To get the current slider element.
     *
     * @param {string} id - The id of the slider element.
     * @returns {string} - The slider element.
     */
    RangeSlider.prototype.getCurrentSlider = function (id) {
        var hoverColor = this.control.themeStyle.thumbHoverColor;
        if (id.indexOf(this.elementId + '_LeftSlider') > -1) {
            this.leftSlider.childNodes[2].setAttribute('fill', hoverColor);
            return 'Left';
        }
        else if (id.indexOf(this.elementId + '_RightSlider') > -1) {
            this.rightSlider.childNodes[2].setAttribute('fill', hoverColor);
            return 'Right';
        }
        else if (id.indexOf(this.elementId + '_SelectedArea') > -1) {
            return 'Middle';
        }
        else if (id.indexOf('UnSelectedArea') > -1) {
            this.leftSlider.childNodes[2].setAttribute('fill', this.thumbColor);
            this.rightSlider.childNodes[2].setAttribute('fill', this.thumbColor);
            return 'UnSelectedArea';
        }
        else if (id.indexOf(this.elementId + '_AxisLabel_') > -1 && (this.control.valueType === 'DateTime' || this.control.valueType === 'DateTimeCategory')) {
            this.labelIndex = +id.substring(id.lastIndexOf('_') + 1, id.length);
            return 'firstLevelLabels';
        }
        else if (id.indexOf(this.elementId + '_SecondaryLabel') > -1 && (this.control.valueType === 'DateTime' || this.control.valueType === 'DateTimeCategory')) {
            this.labelIndex = +id.substring(id.lastIndexOf('_') + 1, id.length);
            return 'secondLevelLabels';
        }
        else {
            this.leftSlider.childNodes[2].setAttribute('fill', this.thumbColor);
            this.rightSlider.childNodes[2].setAttribute('fill', this.thumbColor);
            if (this.control.periodSelectorModule) {
                this.control.periodSelectorModule.triggerChange = true;
            }
            return null;
        }
    };
    /**
     * Mouse up handler performed here.
     *
     * @returns {void}
     */
    RangeSlider.prototype.mouseUpHandler = function () {
        var control = this.control;
        var range = control.chartSeries.xAxis.actualRange;
        var trigger = control.enableDeferredUpdate;
        var enabledTooltip = control.tooltip.enable;
        if (control.stockChart) {
            control.stockChart.zoomChange = false;
        }
        if (this.currentSlider === 'UnSelectedArea') {
            var value = void 0;
            var start = void 0;
            var end = void 0;
            var isRtl = control.enableRtl;
            var difference = control.endValue - control.startValue;
            if (control.mouseDownX < this.startX) {
                value = Math.max(this.getRangeValue((control.mouseDownX - (this.sliderWidth / 2) - control.bounds.x)), range.min);
                end = isRtl ? value : (value + difference);
                start = isRtl ? (value - difference) : value;
            }
            else {
                value = Math.min(this.getRangeValue((control.mouseDownX + (this.sliderWidth / 2) - control.bounds.x)), range.max);
                start = isRtl ? value : (value - difference);
                end = isRtl ? (value + difference) : value;
            }
            this.performAnimation(start, end, control);
            trigger = false;
        }
        else if (this.currentSlider === 'firstLevelLabels' || this.currentSlider === 'secondLevelLabels') {
            var secondLabel = control.rangeAxis[this.currentSlider][this.labelIndex + 1];
            if (this.selectedPeriod) {
                var periodSelectorModule = this.control.periodSelectorModule;
                if (periodSelectorModule) {
                    var buttons = periodSelectorModule.control.periods;
                    buttons.map(function (period) {
                        period.selected = false;
                    });
                    periodSelectorModule.selectedIndex = undefined;
                    var selectedIndex = periodSelectorModule.findSelectedIndex(control.rangeAxis[this.currentSlider][this.labelIndex].value, (secondLabel ? (control.allowIntervalData ?
                        secondLabel.value - 1 : secondLabel.value) : range.max), buttons);
                    periodSelectorModule.setSelectedStyle(selectedIndex);
                }
            }
            /**
             * One millisecond is subtracted from the label to indicate the previous label value
             */
            this.performAnimation(control.rangeAxis[this.currentSlider][this.labelIndex].value, (secondLabel ? (control.allowIntervalData ? secondLabel.value - 1 : secondLabel.value) : range.max), control);
            trigger = false;
        }
        else if (this.currentSlider === null) {
            trigger = false;
        }
        if (this.isDrag && control.allowSnapping) {
            this.setAllowSnapping(control, this.currentStart, this.currentEnd, true, enabledTooltip);
            trigger = false;
        }
        if (trigger) {
            this.setSlider(this.currentStart, this.currentEnd, true, enabledTooltip);
        }
        if (this.currentSlider !== null) {
            if (this.control.periodSelectorSettings.periods.length > 0) {
                this.control.periodSelectorModule.triggerChange = false;
                this.control.periodSelectorModule.datePicker.startDate = this.control.periodSelectorModule.isDatetimeCategory ?
                    new Date(this.control.periodSelectorModule.sortedData[Math.floor(this.currentStart)]) : new Date(this.currentStart);
                this.control.periodSelectorModule.datePicker.endDate = this.control.periodSelectorModule.isDatetimeCategory ?
                    new Date(this.control.periodSelectorModule.sortedData[Math.floor(this.currentEnd)]) : new Date(this.currentEnd);
            }
        }
        this.selectedElement.style.cursor = '-webkit-grab';
        control.startValue = this.currentStart;
        control.endValue = this.currentEnd;
        this.isDrag = false;
        this.labelIndex = null;
        this.currentSlider = null;
    };
    /**
     * Allow Snapping perfomed here.
     *
     * @param {RangeNavigator} control - RangeNavigator instance.
     * @param {number} start - start
     * @param {number} end - end
     * @param {boolean} trigger - trigger
     * @param {boolean} tooltip - tooltip
     * @private
     * @returns {void}
     */
    RangeSlider.prototype.setAllowSnapping = function (control, start, end, trigger, tooltip) {
        var values = control.rangeAxis.lowerValues;
        values.push(control.chartSeries.xAxis.actualRange.max);
        this.setSlider(getNearestValue(values, start), getNearestValue(values, end), trigger, tooltip);
        control.startValue = this.currentStart;
        control.endValue = this.currentEnd;
    };
    /**
     * Animation Calculation for slider navigation.
     *
     * @param {number} start - The start value for the animation.
     * @param {number} end - The end value for the animation.
     * @param {RangeNavigator} control - The RangeNavigator control.
     * @returns {void}
     */
    RangeSlider.prototype.performAnimation = function (start, end, control) {
        var _this = this;
        var currentStart = this.currentStart;
        var currentEnd = this.currentEnd;
        var isDeffered = control.enableDeferredUpdate;
        var enableTooltip = control.tooltip.enable;
        new Animation({}).animate(createElement('div'), {
            duration: (this.control.animationDuration === 0 && animationMode === 'Enable') ? 1000 : this.control.animationDuration,
            progress: function (args) {
                _this.setSlider(linear(args.timeStamp, 0, start - currentStart, args.duration) + currentStart, linear(args.timeStamp, 0, end - currentEnd, args.duration) + currentEnd, !isDeffered, enableTooltip);
            },
            end: function () {
                if (control.allowSnapping) {
                    _this.setAllowSnapping(control, start, end, true, enableTooltip);
                }
                else {
                    _this.setSlider(start, end, true, enableTooltip);
                }
                _this.control.startValue = _this.currentStart;
                _this.control.endValue = _this.currentEnd;
                if (_this.control.periodSelectorSettings.periods.length > 0) {
                    _this.control.periodSelectorModule.triggerChange = false;
                    _this.control.periodSelectorModule.datePicker.startDate = _this.control.periodSelectorModule.isDatetimeCategory ?
                        new Date(_this.control.periodSelectorModule.sortedData[Math.floor(_this.currentStart)]) : new Date(_this.currentStart);
                    _this.control.periodSelectorModule.datePicker.endDate = _this.control.periodSelectorModule.isDatetimeCategory ?
                        new Date(_this.control.periodSelectorModule.sortedData[Math.floor(_this.currentEnd)]) : new Date(_this.currentEnd);
                }
            }
        });
    };
    /**
     * Mouse Cancel Handler.
     *
     * @returns {void}
     */
    RangeSlider.prototype.mouseCancelHandler = function () {
        if (this.isDrag && this.control.allowSnapping) {
            this.setAllowSnapping(this.control, this.currentStart, this.currentEnd, false, this.control.tooltip.enable);
        }
        this.isDrag = false;
        this.currentSlider = null;
        this.control.startValue = this.currentStart;
        this.control.endValue = this.currentEnd;
    };
    /**
     * Destroy Method Calling here.
     *
     * @returns {void}
     */
    RangeSlider.prototype.destroy = function () {
        this.removeEventListener();
    };
    return RangeSlider;
}());
export { RangeSlider };
