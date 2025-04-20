import { createElement, isNullOrUndefined, Animation, animationMode } from '@syncfusion/ej2-base';
import { stringToNumber, measureText, getLocationFromAngle, getLabelFormat, VisibleLabels, isCompleteAngle, Size, Rect, getPathArc, getAngleFromValue } from '../utils/helper-common';
import { calculateSum } from '../utils/helper-axis-panel';
import { axisLabelRender, radiusCalculate } from '../model/constants';
import { AxisRenderer } from './axis-renderer';
import { PointerRenderer } from './pointer-renderer';
import { getCompleteArc } from '../utils/helper-pointer-renderer';
/**
 * Specifies the CircularGauge Axis Layout.
 */
var AxisLayoutPanel = /** @class */ (function () {
    function AxisLayoutPanel(gauge) {
        this.axisOption = [];
        this.prevAnimatedMajorTickValue = [];
        this.prevAnimatedMajorTickIndex = [];
        this.prevAnimatedMinorTickValue = [];
        this.prevAnimatedMinorTickIndex = [];
        this.allowAxisCount = [];
        this.rangeAnimationCount = 0;
        this.gauge = gauge;
        this.axisRenderer = new AxisRenderer(gauge);
        this.pointerRenderer = new PointerRenderer(gauge);
    }
    /**
     * Measure the calculate the axis size and radius.
     *
     * @return {void}
     * @private
     */
    AxisLayoutPanel.prototype.measureAxis = function (rect) {
        this.measureAxisSize(this.gauge, rect);
        this.calculateAxesRadius();
    };
    /**
     * Measure to calculate the axis radius of the circular gauge.
     *
     * @returns {void}
     * @private
     */
    AxisLayoutPanel.prototype.calculateAxesRadius = function () {
        var _this = this;
        var totalRadius;
        var currentRadius;
        var rangeMaximumRadius = 0;
        var xMarginDiff = this.gauge.margin.left + this.gauge.margin.right;
        var yMarginDiff = this.gauge.margin.top + this.gauge.margin.bottom;
        var _loop_1 = function (axis) {
            totalRadius = (Math.min(axis.rect.width, axis.rect.height) / 2);
            currentRadius = axis.radius != null ? stringToNumber(axis.radius, totalRadius) : totalRadius;
            // eslint-disable-next-line prefer-spread
            rangeMaximumRadius = Math.max.apply(Math, axis.ranges.map(function (value) {
                return value.radius ?
                    (value.radius.indexOf('%') < 0 ? 100 : parseInt(value.radius, 10)) : 0;
            }));
            currentRadius = (rangeMaximumRadius > 100 && axis.radius == null) ?
                (currentRadius * 100) / rangeMaximumRadius : currentRadius;
            axis.currentRadius = currentRadius - axis.nearSize;
            if (this_1.gauge.moveToCenter && this_1.gauge.axes.length === 1 &&
                isNullOrUndefined(this_1.gauge.centerXpoint) && isNullOrUndefined(this_1.gauge.centerYpoint)) {
                var endAngle = void 0;
                var startAngle = axis.startAngle;
                var startPoint = getLocationFromAngle(startAngle - 90, currentRadius, this_1.gauge.midPoint);
                endAngle = axis.endAngle;
                endAngle -= isCompleteAngle(startAngle, endAngle) ? 0.0001 : 0;
                var endPoint = getLocationFromAngle(endAngle - 90, currentRadius, this_1.gauge.midPoint);
                var xDiff = void 0;
                var yDiff = void 0;
                var startXDiff = void 0;
                var endXDiff = void 0;
                var startYDiff = void 0;
                var endYDiff = void 0;
                var newPoint = void 0;
                if (startAngle > endAngle ? Math.abs(startAngle - endAngle) > 90 ? true : false : true) {
                    if ((startAngle >= 270 && startAngle <= 360) && ((endAngle > 270 && endAngle <= 360) ||
                        (endAngle >= 0 && endAngle <= 180))) {
                        startXDiff = Math.abs(this_1.gauge.gaugeRect.x - Math.abs(startPoint.x - this_1.gauge.gaugeRect.x));
                        newPoint = (endAngle <= 360 && endAngle >= 270) ? this_1.gauge.midPoint : (endAngle <= 90) ? endPoint :
                            getLocationFromAngle(90 - 90, currentRadius, this_1.gauge.midPoint);
                        endXDiff = Math.abs(newPoint.x - this_1.gauge.gaugeRect.width);
                        startPoint = (endAngle <= 360 && endAngle >= 270) ? endPoint :
                            getLocationFromAngle(360 - 90, currentRadius, this_1.gauge.midPoint);
                        startYDiff = Math.abs(startPoint.y - this_1.gauge.gaugeRect.y);
                        endPoint = (endAngle <= 360 && endAngle >= 270 || (endAngle >= 0 && endAngle < 90)) ?
                            this_1.gauge.midPoint : (endAngle >= 90 && endAngle <= 180) ? endPoint :
                            getLocationFromAngle(180 - 90, currentRadius, this_1.gauge.midPoint);
                        endYDiff = Math.abs(endPoint.y - (this_1.gauge.gaugeRect.y + this_1.gauge.gaugeRect.height));
                    }
                    else if ((startAngle >= 0 && startAngle < 90) && (endAngle >= 0 && endAngle <= 270)) {
                        startYDiff = Math.abs(startPoint.y - this_1.gauge.gaugeRect.y);
                        newPoint = (endAngle >= 180) ? getLocationFromAngle(180 - 90, currentRadius, this_1.gauge.midPoint) :
                            endPoint;
                        endYDiff = Math.abs(newPoint.y - (this_1.gauge.gaugeRect.y + this_1.gauge.gaugeRect.height));
                        startPoint = (endAngle >= 180) ? endPoint : this_1.gauge.midPoint;
                        startXDiff = Math.abs(this_1.gauge.gaugeRect.x - Math.abs(startPoint.x - this_1.gauge.gaugeRect.x));
                        endPoint = (endAngle >= 90) ? getLocationFromAngle(90 - 90, currentRadius, this_1.gauge.midPoint) : endPoint;
                        endXDiff = Math.abs(endPoint.x - this_1.gauge.gaugeRect.width);
                    }
                    else if ((startAngle >= 90 && startAngle < 180) && (endAngle > 90 && endAngle <= 360)) {
                        newPoint = (endAngle <= 180) ? this_1.gauge.midPoint : (endAngle >= 270) ?
                            getLocationFromAngle(270 - 90, currentRadius, this_1.gauge.midPoint) : endPoint;
                        startXDiff = Math.abs(newPoint.x - this_1.gauge.gaugeRect.x);
                        endXDiff = Math.abs(startPoint.x - this_1.gauge.gaugeRect.width);
                        startPoint = (endAngle > 270) ? getLocationFromAngle(endAngle - 90, currentRadius, this_1.gauge.midPoint) :
                            this_1.gauge.midPoint;
                        startYDiff = Math.abs(this_1.gauge.gaugeRect.y - startPoint.y);
                        endPoint = (endAngle >= 180) ? getLocationFromAngle(180 - 90, currentRadius, this_1.gauge.midPoint) : endPoint;
                        endYDiff = Math.abs(endPoint.y - (this_1.gauge.gaugeRect.y + this_1.gauge.gaugeRect.height));
                    }
                    else if ((startAngle >= 180 && startAngle <= 270) && ((endAngle <= 360 && endAngle >= 270) ||
                        (endAngle <= 180 && endAngle >= 0))) {
                        newPoint = (endAngle > 180 && endAngle < 270) ? endPoint :
                            getLocationFromAngle(270 - 90, currentRadius, this_1.gauge.midPoint);
                        startXDiff = Math.abs(this_1.gauge.gaugeRect.x - Math.abs(newPoint.x - this_1.gauge.gaugeRect.x));
                        newPoint = (endAngle >= 180 && endAngle <= 360) ? this_1.gauge.midPoint : (endAngle <= 90) ? endPoint :
                            getLocationFromAngle(0, currentRadius, this_1.gauge.midPoint);
                        endXDiff = Math.abs(newPoint.x - this_1.gauge.gaugeRect.width);
                        newPoint = (endAngle > 180 && endAngle < 270) ? this_1.gauge.midPoint : (endAngle >= 270 && endAngle <= 360) ?
                            endPoint : getLocationFromAngle(360 - 90, currentRadius, this_1.gauge.midPoint);
                        startYDiff = Math.abs(newPoint.y - this_1.gauge.gaugeRect.y);
                        endPoint = (endAngle <= 360 && endAngle >= 270 || (endAngle >= 0 && endAngle < 90)) ?
                            startPoint : ((270 - startAngle) < (endAngle - 90)) ? endPoint : startPoint;
                        endYDiff = Math.abs(endPoint.y - (this_1.gauge.gaugeRect.y + this_1.gauge.gaugeRect.height));
                    }
                    if ((!isNullOrUndefined(startXDiff) && !isNullOrUndefined(endXDiff) && !isNullOrUndefined(startYDiff) &&
                        !isNullOrUndefined(endYDiff)) && ((startXDiff > 0 || endXDiff > 0) && (startYDiff > 0 || endYDiff > 0))) {
                        xDiff = Math.abs((startXDiff + endXDiff) - xMarginDiff);
                        yDiff = Math.abs((startYDiff + endYDiff) - yMarginDiff);
                        this_1.gauge.midPoint.x = this_1.gauge.midPoint.x - (startXDiff / 2) + (endXDiff / 2);
                        this_1.gauge.midPoint.y = this_1.gauge.midPoint.y - (startYDiff / 2) + (endYDiff / 2);
                        totalRadius = (Math.min(this_1.gauge.gaugeRect.width, this_1.gauge.gaugeRect.height) / 2) +
                            (Math.min(xDiff, yDiff) / 2);
                        axis.currentRadius = (axis.radius != null ? stringToNumber(axis.radius, totalRadius) : totalRadius) - axis.nearSize;
                    }
                }
            }
            axis.visibleRange.interval = this_1.calculateNumericInterval(axis, axis.rect);
            var args = {
                cancel: false, name: radiusCalculate, currentRadius: axis.currentRadius, gauge: this_1.gauge,
                midPoint: this_1.gauge.midPoint, axis: axis
            };
            this_1.gauge.trigger('radiusCalculate', args, function () {
                axis.currentRadius = args.currentRadius;
                _this.gauge.midPoint = args.midPoint;
                _this.calculateVisibleLabels(axis);
            });
        };
        var this_1 = this;
        for (var _i = 0, _a = this.gauge.axes; _i < _a.length; _i++) {
            var axis = _a[_i];
            _loop_1(axis);
        }
    };
    /**
     * Measure to calculate the axis size.
     *
     * @return {void}
     * @private
     */
    AxisLayoutPanel.prototype.measureAxisSize = function (gauge, rect) {
        var _this = this;
        var sum;
        this.computeSize(gauge.axes, rect);
        gauge.axes.map(function (axis, index) {
            sum = calculateSum(index, _this.farSizes.length - 1, _this.farSizes);
            axis.rect = new Rect(rect.x + sum, rect.y + sum, rect.width - (sum * 2), rect.height - (sum * 2));
        });
    };
    /**
     * Calculate the axis values of the circular gauge.
     *
     * @return {void}
     * @private
     */
    AxisLayoutPanel.prototype.calculateAxisValues = function (rect) {
        for (var _i = 0, _a = this.gauge.axes; _i < _a.length; _i++) {
            var axis = _a[_i];
            this.calculateVisibleRange(axis, rect);
            this.calculateVisibleLabels(axis);
        }
    };
    /**
     * Calculate the visible range of an axis.
     *
     * @param {Axis} axis - Specifies the axis.
     * @param {Rect} rect - Specifies the rect.
     * @returns {void}
     * @private
     */
    AxisLayoutPanel.prototype.calculateVisibleRange = function (axis, rect) {
        var interval = axis.majorTicks.interval;
        var minimumValue = Math.min(axis.minimum === null ? 0 : axis.minimum, axis.maximum !== null ? axis.maximum : 100);
        var maximumValue = Math.max(axis.minimum, axis.maximum === null ? 100 : axis.maximum);
        axis.pointers.map(function (pointer) {
            pointer.currentValue = pointer.value !== null ?
                pointer.value < minimumValue ? minimumValue : pointer.value > maximumValue ? maximumValue : pointer.value
                : minimumValue;
            minimumValue = axis.minimum === null ? Math.min(pointer.currentValue, minimumValue) : minimumValue;
            maximumValue = axis.maximum === null ? Math.max(pointer.currentValue, maximumValue) : maximumValue;
        });
        minimumValue = (minimumValue === maximumValue) ?
            (interval !== null ? minimumValue - interval : minimumValue - 1) : minimumValue;
        axis.visibleRange = { min: minimumValue, max: maximumValue, interval: interval };
        axis.visibleRange.interval = this.calculateNumericInterval(axis, rect);
    };
    /**
     * Calculate the numeric intervals of an axis range.
     *
     * @return {void}
     * @private
     */
    AxisLayoutPanel.prototype.calculateNumericInterval = function (axis, rect) {
        var allowComponentRender = ((!isNullOrUndefined(axis.minimum) && !isNullOrUndefined(axis.maximum)
            && axis.minimum !== axis.maximum) || (isNullOrUndefined(axis.minimum) || isNullOrUndefined(axis.maximum)));
        if (!allowComponentRender) {
            return 0;
        }
        else if (axis.majorTicks.interval !== null) {
            return axis.majorTicks.interval;
        }
        var totalAngle = axis.endAngle - axis.startAngle;
        totalAngle = totalAngle <= 0 ? (totalAngle + 360) : totalAngle;
        return this.calculateNiceInterval(axis.visibleRange.max, axis.visibleRange.min, axis.currentRadius ? axis.currentRadius : (rect.width / 2), totalAngle);
    };
    /**
     * Calculate the nice interval of an axis range.
     *
     * @return {void}
     * @private
     */
    AxisLayoutPanel.prototype.calculateNiceInterval = function (maxValue, minValue, radius, degree) {
        var delta = maxValue - minValue;
        var circumference = 2 * Math.PI * radius * (degree / 360);
        var desiredIntervalsCount = Math.max((circumference * ((0.533 * 3) / 100)), 1);
        var niceInterval = delta / desiredIntervalsCount;
        var minInterval = Math.pow(10, Math.floor(Math.log(niceInterval) / Math.log(10)));
        for (var _i = 0, _a = [10, 5, 2, 1]; _i < _a.length; _i++) {
            var interval = _a[_i];
            var currentInterval = minInterval * interval;
            if (desiredIntervalsCount < (delta / currentInterval)) {
                break;
            }
            niceInterval = currentInterval;
        }
        return niceInterval;
    };
    /**
     * Calculate the visible labels of an axis.
     *
     * @return {void}
     * @private
     */
    AxisLayoutPanel.prototype.calculateVisibleLabels = function (axis) {
        var style = axis.labelStyle;
        var customLabelFormat = style.format && style.format.match('{value}') !== null;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        var format = this.gauge.intl.getNumberFormat({
            format: getLabelFormat(style.format), useGrouping: this.gauge.useGroupingSeparator
        });
        var argsData;
        axis.visibleLabels = [];
        var roundValue;
        var interval = axis.visibleRange.interval;
        var max = axis.visibleRange.max;
        if ((isNullOrUndefined(axis.minimum) && isNullOrUndefined(axis.maximum)) || axis.minimum !== axis.maximum) {
            var _loop_2 = function (i) {
                roundValue = axis.roundingPlaces ? parseFloat(i.toFixed(axis.roundingPlaces)) : i;
                argsData = {
                    cancel: false, name: axisLabelRender, axis: axis,
                    text: customLabelFormat ? style.format.replace(new RegExp('{value}', 'g'), format(roundValue)) :
                        format(roundValue),
                    value: roundValue
                };
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                var axisLabelRenderSuccess = function (argsData) {
                    if (!argsData.cancel) {
                        axis.visibleLabels.push(new VisibleLabels(argsData.text, i));
                    }
                };
                axisLabelRenderSuccess.bind(this_2);
                this_2.gauge.trigger(axisLabelRender, argsData, axisLabelRenderSuccess);
            };
            var this_2 = this;
            for (var i = axis.visibleRange.min; (i <= max && interval); i += interval) {
                _loop_2(i);
            }
        }
        var lastLabel = axis.visibleLabels.length ? axis.visibleLabels[axis.visibleLabels.length - 1].value : null;
        var maxVal = axis.visibleRange.max;
        if (!isNullOrUndefined(lastLabel) && lastLabel !== maxVal && axis.showLastLabel === true) {
            argsData = {
                cancel: false, name: axisLabelRender, axis: axis,
                text: customLabelFormat ? style.format.replace(new RegExp('{value}', 'g'), format(maxVal)) :
                    format(maxVal),
                value: maxVal
            };
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            var axisLabelRenderSuccess = function (argsData) {
                if (!argsData.cancel) {
                    axis.visibleLabels.push(new VisibleLabels(argsData.text, maxVal));
                }
            };
            axisLabelRenderSuccess.bind(this);
            this.gauge.trigger(axisLabelRender, argsData, axisLabelRenderSuccess);
        }
        this.getMaxLabelWidth(this.gauge, axis);
    };
    /**
     * Measure the axes available size.
     *
     * @return {void}
     * @private
     */
    AxisLayoutPanel.prototype.computeSize = function (axes, rect) {
        var lineSize;
        var outerHeight;
        var innerHeight;
        var heightForCross;
        var axisPadding = 5;
        var majorTickOffset = 0;
        var minorTickOffset = 0;
        var labelOffset = 0;
        var labelPadding = 10;
        this.farSizes = [];
        this.calculateAxisValues(rect);
        for (var _i = 0, axes_1 = axes; _i < axes_1.length; _i++) {
            var axis = axes_1[_i];
            lineSize = (axis.lineStyle.width / 2);
            outerHeight = 0;
            innerHeight = 0;
            heightForCross = axis.majorTicks.position === 'Cross' ? axis.majorTicks.height / 2 : heightForCross;
            heightForCross = (axis.minorTicks.position === 'Cross' && heightForCross < axis.minorTicks.height / 2) ?
                axis.minorTicks.height / 2 : heightForCross;
            heightForCross = (axis.labelStyle.position === 'Cross' && heightForCross < axis.maxLabelSize.height / 2) ?
                axis.maxLabelSize.height / 2 : heightForCross;
            lineSize = lineSize < heightForCross ? heightForCross : lineSize;
            majorTickOffset = axis.majorTicks.offset;
            minorTickOffset = axis.minorTicks.offset;
            labelOffset = axis.labelStyle.offset;
            labelPadding = axis.labelStyle.shouldMaintainPadding ? 10 : 0;
            // Calculating the outer space of the axis
            outerHeight += !(axis.majorTicks.position === 'Outside' && axis.minorTicks.position === 'Outside' &&
                axis.labelStyle.position === 'Outside') ? axisPadding : 0;
            outerHeight += (axis.majorTicks.position === 'Outside' ? (axis.majorTicks.height + lineSize) : 0) +
                (axis.labelStyle.position === 'Outside' ? (axis.maxLabelSize.height + labelOffset + labelPadding) : 0) +
                ((axis.minorTicks.position === 'Outside' && !(axis.majorTicks.position === 'Outside')) ?
                    (axis.minorTicks.height + lineSize) : 0) + lineSize;
            outerHeight += (axis.majorTicks.position === 'Outside' && axis.minorTicks.position === 'Outside') ?
                Math.max(majorTickOffset, minorTickOffset) : (axis.majorTicks.position === 'Outside' ?
                majorTickOffset : axis.minorTicks.position === 'Outside' ? minorTickOffset : 0);
            // Calculating the inner space of the axis
            innerHeight += ((axis.majorTicks.position === 'Inside') ? (axis.majorTicks.height + lineSize) : 0) +
                ((axis.labelStyle.position === 'Inside') ? (axis.maxLabelSize.height + labelOffset + labelPadding) : 0) +
                ((axis.minorTicks.position === 'Inside' && axis.majorTicks.position === 'Outside') ?
                    (axis.minorTicks.height + lineSize) : 0) + lineSize;
            innerHeight += ((axis.majorTicks.position === 'Inside') && (axis.minorTicks.position === 'Inside')) ?
                Math.max(majorTickOffset, minorTickOffset) : ((axis.majorTicks.position === 'Inside') ?
                majorTickOffset : (axis.minorTicks.position === 'Inside') ? minorTickOffset : 0);
            if (this.farSizes[this.farSizes.length - 1]) {
                this.farSizes[this.farSizes.length - 1] += (innerHeight + outerHeight);
            }
            axis.nearSize = outerHeight - axisPadding;
            axis.farSize = innerHeight;
            outerHeight = (this.gauge.axes.length === (this.farSizes.length + 1)) ? 0 : outerHeight;
            this.farSizes.push(outerHeight);
        }
    };
    /**
     * To render the Axis element of the circular gauge.
     *
     * @return {void}
     * @private
     */
    AxisLayoutPanel.prototype.renderAxes = function (animate) {
        var _this = this;
        if (animate === void 0) { animate = true; }
        var gauge = this.gauge;
        var renderer = this.axisRenderer;
        var element;
        var axesElements = gauge.renderer.createGroup({
            'id': gauge.element.id + '_AxesCollection',
            'clip-path': 'url(#' + gauge.element.id + '_GaugeAreaClipRect_' + ')'
        });
        // To append the secondary element for annotation and tooltip
        var annotationElement = createElement('div', {
            id: gauge.element.id + '_Secondary_Element'
        });
        annotationElement.style.position = 'relative';
        gauge.element.appendChild(annotationElement);
        gauge.axes.map(function (axis, index) {
            element = gauge.renderer.createGroup({
                id: gauge.element.id + '_Axis_Group_' + index
            });
            _this.gauge.allowComponentRender = ((!isNullOrUndefined(axis.minimum) && !isNullOrUndefined(axis.maximum)
                && axis.minimum !== axis.maximum) || (isNullOrUndefined(axis.minimum) || isNullOrUndefined(axis.maximum)));
            renderer.checkAngles(axis);
            renderer.drawAxisOuterLine(axis, index, element, gauge);
            if (gauge.allowRangePreRender) {
                renderer.drawAxisRange(axis, index, element);
            }
            renderer.drawAxisLine(axis, index, element, gauge);
            if (!gauge.allowRangePreRender) {
                renderer.drawAxisRange(axis, index, element);
            }
            renderer.drawMajorTickLines(axis, index, element, gauge);
            renderer.drawMinorTickLines(axis, index, element, gauge);
            renderer.drawAxisLabels(axis, index, element, gauge);
            _this.pointerRenderer.drawPointers(axis, index, element, gauge, animate);
            if (gauge.annotationsModule) {
                gauge.annotationsModule.renderAnnotation(axis, index, gauge);
            }
            axesElements.appendChild(element);
        });
        // For append clip rect for axes
        gauge.svgObject.appendChild(gauge.renderer.drawClipPath({
            'id': gauge.element.id + '_GaugeAreaClipRect_',
            'x': 0, 'y': 0,
            'width': gauge.availableSize.width,
            'height': gauge.availableSize.height,
            'fill': 'transparent', 'stroke': 'transparent'
        }));
        gauge.svgObject.appendChild(axesElements);
        if (gauge.allowLoadingAnimation) {
            this.durationSplitUp((gauge.animationDuration === 0 && animationMode === 'Enable') ? 3000 : gauge.animationDuration, axesElements);
        }
    };
    AxisLayoutPanel.prototype.labelElementAnimation = function (element, axisIndex) {
        var _this = this;
        if (element) {
            new Animation({}).animate(element, {
                duration: this.gauge.loadingAnimationDuration[axisIndex],
                progress: function () {
                    element.style.visibility = 'visible';
                },
                end: function () {
                    element.style.visibility = 'visible';
                    var axisElement = document.getElementById(_this.gauge.element.id + '_Axis_Labels_' + axisIndex);
                    if (_this.gauge.axes[axisIndex].showLastLabel && parseInt(element.id.split('Label_')[1], 10) === (axisElement.childElementCount - 2)) {
                        axisElement.style.visibility = 'visible';
                        element = document.getElementById(_this.gauge.element.id + '_Axis_' + axisIndex + '_Label_' + (axisElement.childElementCount - 1));
                        if (element) {
                            element.style.visibility = 'visible';
                        }
                    }
                }
            });
        }
    };
    AxisLayoutPanel.prototype.elementLabelAnimation = function (element, axisIndex, tickIndex, gauge) {
        var _this = this;
        if (element) {
            new Animation({}).animate(element, {
                duration: gauge.axes[axisIndex].labelStyle.font.size != null &&
                    (gauge.axes[axisIndex].labelStyle.font.size === '0px' || gauge.axes[axisIndex].labelStyle.font.size === '0') ? 0 :
                    ((gauge.loadingAnimationDuration[axisIndex] / this.axisOption[axisIndex].axisLabelCount)),
                progress: function () {
                    element.style.visibility = 'visible';
                },
                end: function () {
                    tickIndex += 1;
                    _this.elementLabelAnimation(document.getElementById(gauge.element.id + '_Axis_' + axisIndex + '_Label_' + tickIndex), axisIndex, tickIndex, gauge);
                    var axisElement = document.getElementById(_this.gauge.element.id + '_Axis_Labels_' + axisIndex);
                    if (_this.gauge.axes[axisIndex].showLastLabel && parseInt(element.id.split('Label_')[1], 10) === (axisElement.childElementCount - 2)) {
                        element = document.getElementById(_this.gauge.element.id + '_Axis_' + axisIndex + '_Label_' + (axisElement.childElementCount - 1));
                        if (element) {
                            element.style.visibility = 'visible';
                        }
                        axisElement.style.visibility = 'visible';
                    }
                    if (_this.rangeAnimationCount === 0 && (_this.axisOption[axisIndex].axisLabelCount - 1) === tickIndex) {
                        axisElement.style.visibility = 'visible';
                        _this.rangeAnimationCount++;
                        _this.rangeAnimation(gauge);
                    }
                }
            });
        }
    };
    AxisLayoutPanel.prototype.axisLineCalculation = function (axisElement, axis, value, gauge) {
        var checkMinValue = value === axis.visibleRange.min;
        var location = gauge.midPoint;
        var isClockWise = axis.direction === 'ClockWise';
        var axisWidth = axis.lineStyle.width / 2;
        var startAngle = getAngleFromValue(axis.visibleRange.min, axis.visibleRange.max, axis.visibleRange.min, axis.startAngle, axis.endAngle, isClockWise);
        var endAngle = getAngleFromValue(value, axis.visibleRange.max, axis.visibleRange.min, axis.startAngle, axis.endAngle, isClockWise);
        if (isClockWise) {
            if (startAngle > endAngle) {
                endAngle = Math.round(startAngle) === Math.round(endAngle) && !checkMinValue ?
                    Math.round(endAngle) - 0.5 : Math.round(endAngle);
            }
            else {
                endAngle = startAngle === endAngle && !checkMinValue ? endAngle + 1 : endAngle;
            }
        }
        else {
            endAngle = Math.round(startAngle) === Math.round(endAngle) && !checkMinValue ?
                [startAngle, startAngle = (endAngle > startAngle ? endAngle + 0.5 : endAngle - 1)][0]
                : [startAngle, startAngle = endAngle][0];
        }
        axisElement.setAttribute('d', getCompleteArc(location, startAngle, endAngle, (axis.currentRadius + axisWidth), (axis.currentRadius - axisWidth), checkMinValue));
    };
    AxisLayoutPanel.prototype.axisLineAnimation = function (axisIndex, duration, gauge) {
        var _this = this;
        // eslint-disable-next-line
        var axis = gauge.axes[axisIndex];
        this.prevAnimatedMajorTickValue.push(axis.minimum);
        this.prevAnimatedMinorTickValue.push(axis.minimum);
        this.prevAnimatedMinorTickIndex.push(0);
        this.prevAnimatedMajorTickIndex.push(0);
        this.prevAnimatedTickType = 'major';
        if (this.axisOption[axisIndex].isAxisLine) {
            var axisElement_1 = document.getElementById(gauge.element.id + '_AxisLine_' + axisIndex);
            var start_1 = axis.visibleRange.min;
            var end_1 = axis.visibleRange.max;
            var pointerValue_1;
            var timeStamp_1;
            var val_1 = Math.abs(start_1 - end_1);
            new Animation({}).animate(axisElement_1, {
                duration: duration,
                progress: function (arg) {
                    axisElement_1.style.visibility = 'visible';
                    axisElement_1.setAttribute('fill', axis.lineStyle.color);
                    axisElement_1.setAttribute('stroke-width', '0');
                    timeStamp_1 = (arg.timeStamp / arg.duration);
                    pointerValue_1 = end_1 > start_1 ? start_1 + (timeStamp_1 * val_1) : start_1 - (timeStamp_1 * val_1);
                    _this.axisLineCalculation(axisElement_1, axis, pointerValue_1, gauge);
                },
                end: function () {
                    axisElement_1.setAttribute('fill', 'transparent');
                    axisElement_1.setAttribute('stroke-width', axis.lineStyle.width.toString());
                    axisElement_1.setAttribute('d', getPathArc(gauge.midPoint, axis.startAngle - 90, axis.endAngle - 90, axis.currentRadius));
                    axisElement_1.style.visibility = 'visible';
                    _this.axisAnimation(axisIndex, duration, gauge);
                }
            });
        }
        else if (this.axisOption[axisIndex].isMajorTick || this.axisOption[axisIndex].isMinorTick) {
            if (this.axisOption[axisIndex].isMajorTick || (this.axisOption[axisIndex].isMajorTick &&
                this.axisOption[axisIndex].isMinorTick)) {
                this.tickElementAnimation(document.getElementById(gauge.element.id + '_Axis_Major_TickLine_' + axisIndex + '_' + 0), document.getElementById(gauge.element.id + '_Axis_' + axisIndex + '_Label_' + 0), duration, axisIndex, this.axisOption[axisIndex].isMajorTick &&
                    this.axisOption[axisIndex].isMinorTick
                    ? 0 : -1, 'major', this.axisOption[axisIndex], gauge);
            }
            else if (this.axisOption[axisIndex].isMinorTick) {
                this.tickElementAnimation(document.getElementById(gauge.element.id + '_Axis_Minor_TickLine_' + axisIndex + '_' + 0), document.getElementById(gauge.element.id + '_Axis_' + axisIndex + '_Label_' + 0), duration, axisIndex, -1, 'minor', this.axisOption[axisIndex], gauge);
            }
        }
        else if (!this.axisOption[axisIndex].isAxisLine) {
            this.labelRangeAnimation(gauge, axisIndex);
        }
    };
    AxisLayoutPanel.prototype.axisAnimation = function (axisIndex, duration, gauge) {
        var _this = this;
        var axisElement = document.getElementById(gauge.element.id + '_AxisLine_' + axisIndex);
        var axisOption = this.axisOption[axisIndex];
        new Animation({}).animate(axisElement, {
            duration: (this.axisOption[axisIndex].majorTickCount === 0 ? 0
                : duration / this.axisOption[axisIndex].majorTickCount),
            progress: function () {
                axisElement.style.visibility = 'visible';
            },
            end: function () {
                if (axisOption.isMajorTick) {
                    _this.tickElementAnimation(document.getElementById(gauge.element.id + '_Axis_Major_TickLine_' + axisIndex + '_' + 0), document.getElementById(gauge.element.id + '_Axis_' + axisIndex + '_Label_' + 0), duration, axisIndex, axisOption.isMajorTick && axisOption.isMinorTick ? 0 : -1, 'major', axisOption, gauge);
                }
                else if (axisOption.isMinorTick) {
                    _this.tickElementAnimation(document.getElementById(gauge.element.id + '_Axis_Minor_TickLine_' + axisIndex + '_' + 0), document.getElementById(gauge.element.id + '_Axis_' + axisIndex + '_Label_' + 0), duration, axisIndex, -1, 'minor', axisOption, gauge);
                }
                _this.labelRangeAnimation(gauge, axisIndex);
            }
        });
    };
    AxisLayoutPanel.prototype.tickElementAnimation = function (tickElement, labelElement, duration, axisIndex, 
    // eslint-disable-next-line
    tickIndex, type, axis, gauge) {
        var _this = this;
        if (tickElement && this.gauge.isAnimationProgress) {
            new Animation({}).animate(tickElement, {
                duration: (axis.isMinorTick ? axis.minorTickCount === 0 ? 0
                    : (duration / axis.minorTickCount) / this.allowAxisCount[axisIndex] :
                    axis.majorTickCount === 0 ? 0 : (duration / axis.majorTickCount) / this.allowAxisCount[axisIndex]),
                progress: function () {
                    tickElement.style.visibility = 'visible';
                },
                end: function () {
                    if (axis.isMajorTick && axis.isMinorTick && gauge.allowLoadingAnimation && _this.gauge.isAnimationProgress) {
                        tickElement.style.visibility = 'visible';
                        var currentTickValue = parseFloat(tickElement.getAttribute('data-interval'));
                        _this.prevAnimatedTickType = type;
                        if (type === 'major') {
                            _this.prevAnimatedMajorTickValue[axisIndex] = currentTickValue;
                            _this.prevAnimatedMajorTickIndex[axisIndex] = tickIndex;
                        }
                        else {
                            _this.prevAnimatedMinorTickValue[axisIndex] = currentTickValue;
                            _this.prevAnimatedMinorTickIndex[axisIndex] = tickIndex;
                        }
                        var minorTickInterval = (gauge.axes[axisIndex].minorTicks.interval != null
                            ? gauge.axes[axisIndex].minorTicks.interval :
                            (gauge.axes[axisIndex].visibleRange.interval / 2));
                        var minorTickValue = minorTickInterval < gauge.axes[axisIndex].visibleRange.interval ? currentTickValue +
                            minorTickInterval : _this.prevAnimatedMinorTickValue[axisIndex] + minorTickInterval;
                        var majorTickValue = _this.prevAnimatedMajorTickValue[axisIndex]
                            + gauge.axes[axisIndex].visibleRange.interval;
                        type = minorTickValue < majorTickValue ? 'minor' : 'major';
                        if (type === 'major' && axis.majorTickCount !== axis.minorTickCount && tickIndex !== 0 && _this.prevAnimatedTickType === 'minor') {
                            tickIndex = _this.prevAnimatedMajorTickIndex[axisIndex];
                        }
                        if (type === 'minor' && axis.majorTickCount !== axis.minorTickCount && tickIndex !== 0 && _this.prevAnimatedTickType === 'major') {
                            tickIndex = _this.prevAnimatedMinorTickIndex[axisIndex];
                        }
                        tickIndex = type === 'minor' ? axis.majorTickCount === axis.minorTickCount ? tickIndex : (currentTickValue ===
                            _this.prevAnimatedMajorTickValue[axisIndex] ? tickIndex : tickIndex + 1) : tickIndex + 1;
                        tickElement = type === 'minor' ? document.getElementById(gauge.element.id + '_Axis_Minor_TickLine_' + axisIndex + '_' + tickIndex) :
                            document.getElementById(gauge.element.id + '_Axis_Major_TickLine_' + axisIndex + '_' + tickIndex);
                        labelElement = type === 'minor' ? null : document.getElementById(gauge.element.id + '_Axis_' + axisIndex + '_Label_' + tickIndex);
                        if (type === 'major' || tickIndex === 0) {
                            _this.labelElementAnimation(document.getElementById(gauge.element.id + '_Axis_' + axisIndex + '_Label_' + tickIndex), axisIndex);
                        }
                        _this.tickElementAnimation(tickElement, labelElement, duration, axisIndex, tickIndex, type, axis, gauge);
                        if (_this.rangeAnimationCount === 0 && type === 'minor' && (tickIndex === axis.minorTickCount - 1 || tickIndex === axis.minorTickCount) && (gauge.axes.length - 1) === axisIndex) {
                            _this.rangeAnimationCount++;
                            _this.rangeAnimation(gauge);
                        }
                    }
                    else if (gauge.allowLoadingAnimation && axis.isMajorTick && _this.gauge.isAnimationProgress) {
                        tickElement.style.visibility = 'visible';
                        type = 'major';
                        tickIndex = tickIndex + 1;
                        tickElement = document.getElementById(gauge.element.id + '_Axis_Major_TickLine_' + axisIndex + '_' + tickIndex);
                        labelElement = document.getElementById(gauge.element.id + '_Axis_' + axisIndex + '_Label_' + tickIndex);
                        _this.tickElementAnimation(tickElement, labelElement, duration, axisIndex, tickIndex, type, axis, gauge);
                        if (type === 'major' || tickIndex === 0) {
                            _this.labelElementAnimation(document.getElementById(gauge.element.id + '_Axis_' + axisIndex + '_Label_' + tickIndex), axisIndex);
                        }
                        if (_this.rangeAnimationCount === 0 && type === 'major' && tickIndex === axis.majorTickCount - 1 && (gauge.axes.length - 1) === axisIndex) {
                            _this.rangeAnimationCount++;
                            _this.rangeAnimation(gauge);
                        }
                    }
                    else if (gauge.allowLoadingAnimation && _this.gauge.isAnimationProgress && axis.isMinorTick) {
                        tickElement.style.visibility = 'visible';
                        type = 'minor';
                        tickIndex = tickIndex + 1;
                        tickElement = document.getElementById(gauge.element.id + '_Axis_Minor_TickLine_' + axisIndex + '_' + tickIndex);
                        labelElement = document.getElementById(gauge.element.id + '_Axis_' + axisIndex + '_Label_' + tickIndex);
                        _this.tickElementAnimation(tickElement, labelElement, duration, axisIndex, tickIndex, type, axis, gauge);
                        if (type === 'minor') {
                            _this.labelElementAnimation(document.getElementById(gauge.element.id + '_Axis_' + axisIndex + '_Label_' + tickIndex), axisIndex);
                        }
                        if (_this.rangeAnimationCount === 0 && type === 'minor' && tickIndex === axis.minorTickCount - 1 && (gauge.axes.length - 1) === axisIndex) {
                            _this.rangeAnimationCount++;
                            _this.rangeAnimation(gauge);
                        }
                    }
                }
            });
        }
        this.labelRangeAnimation(gauge, axisIndex);
    };
    AxisLayoutPanel.prototype.labelRangeAnimation = function (gauge, axisIndex) {
        var options = this.axisOption[axisIndex];
        if (!isNullOrUndefined(options)) {
            if (!options.isMajorTick && !options.isMinorTick && options.isAxisLabel) {
                if (options.axisLabelCount > 0) {
                    if (gauge.axes[axisIndex].labelStyle.hiddenLabel === 'First') {
                        this.elementLabelAnimation(document.getElementById(gauge.element.id + '_Axis_' + axisIndex + '_Label_' + 1), axisIndex, 0, gauge);
                    }
                    else {
                        this.elementLabelAnimation(document.getElementById(gauge.element.id + '_Axis_' + axisIndex + '_Label_' + 0), axisIndex, 0, gauge);
                    }
                }
            }
            else if ((this.rangeAnimationCount === 0 && !options.isMajorTick &&
                !options.isMinorTick && !options.isAxisLabel && options.isRange)
                || this.rangeAnimationCount === 0 && this.gauge.isAnimationProgress
                    && !options.isMajorTick && !options.isMinorTick && !options.isAxisLabel && options.isRange) {
                this.rangeAnimationCount++;
                this.rangeAnimation(gauge);
            }
        }
    };
    AxisLayoutPanel.prototype.rangeAnimation = function (gauge) {
        for (var j = 0; j < gauge.axes.length; j++) {
            var rangesElement = document.getElementById(gauge.element.id + '_Axis_Ranges_' + j);
            if (!isNullOrUndefined(rangesElement) && gauge.allowLoadingAnimation) {
                this.rangeElementAnimation(rangesElement, j, gauge);
            }
        }
    };
    AxisLayoutPanel.prototype.rangeElementAnimation = function (rangeElement, axisIndex, gauge) {
        var _this = this;
        var height = 0;
        var opacity = 1;
        var isRangeAbsent = rangeElement.childElementCount > 0 &&
            gauge.axes[axisIndex].ranges[0].start !== gauge.axes[axisIndex].ranges[0].end;
        new Animation({}).animate(rangeElement, {
            duration: isRangeAbsent ? gauge.loadingAnimationDuration[axisIndex] : 0,
            progress: function (args) {
                if (args.timeStamp > args.delay) {
                    height = ((args.timeStamp - args.delay) / args.duration);
                    rangeElement['style']['opacity'] = (opacity * height);
                }
            },
            end: function () {
                rangeElement['style']['opacity'] = opacity;
                var axisElement = document.getElementById(_this.gauge.element.id + '_Axis_Labels_' + axisIndex);
                if (!isNullOrUndefined(axisElement)) {
                    axisElement.style.visibility = 'visible';
                }
                if (gauge.allowLoadingAnimation && axisIndex === 0) {
                    _this.axisOption = [];
                    gauge.axes.map(function (axis, axisindex) {
                        axis.pointers.map(function (pointer, pointerIndex) {
                            var pointerElement = document.getElementById(gauge.element.id + '_Axis_' + axisindex + '_Pointer_' + pointerIndex);
                            if (!isNullOrUndefined(pointerElement) && _this.gauge.isAnimationProgress) {
                                pointer.previousValue = !_this.gauge.isPropertyChange ? axis.minimum : pointer.previousValue;
                                gauge.gaugeAxisLayoutPanel.pointerRenderer.doPointerAnimation(pointerElement, pointer, axis, axisIndex);
                            }
                        });
                        if (axis.pointers.length === 0 && _this.gauge.isAnimationProgress) {
                            if (_this.gauge.loadingAnimationDuration[axisIndex] > 0 &&
                                !isNullOrUndefined(_this.gauge.annotationsModule)) {
                                _this.gauge.annotationsModule.annotationAnimation(_this.gauge);
                            }
                        }
                        else {
                            _this.gauge.isOverAllAnimationComplete = true;
                        }
                    });
                }
            }
        });
    };
    AxisLayoutPanel.prototype.durationSplitUp = function (duration, axesElements) {
        var splitUpCount = 0;
        this.gauge.loadingAnimationDuration = [];
        for (var i = 0; i < axesElements.childElementCount; i++) {
            splitUpCount = 0;
            var axisCount = 0;
            var element = axesElements.children[i];
            var isAxisLine = false;
            var isMajorTick = false;
            var majorTickCount = 0;
            var labelCount = 0;
            var isMinorTick = false;
            var minorTickCount = 0;
            var isLabel = false;
            var isrange = false;
            var isPointer = false;
            for (var j = 0; j < element.childElementCount; j++) {
                var elementId = element.children[j]['id'];
                if (elementId.indexOf('_AxisLine_') > 0) {
                    isAxisLine = true;
                    splitUpCount++;
                }
                else if (elementId.indexOf('MajorTickLines') > 0) {
                    isMajorTick = true;
                    axisCount++;
                    majorTickCount = element.children[j].childElementCount;
                    splitUpCount++;
                }
                else if (elementId.indexOf('MinorTickLines') > 0) {
                    isMinorTick = true;
                    axisCount++;
                    minorTickCount = element.children[j].childElementCount;
                    if (!isMajorTick) {
                        splitUpCount++;
                    }
                }
                else if (elementId.indexOf('_Axis_Labels_') > 0) {
                    isLabel = true;
                    axisCount++;
                    labelCount = element.children[j].childElementCount;
                    if (!isMajorTick && !isMinorTick && this.gauge.axes[i].labelStyle.font.size != null &&
                        (this.gauge.axes[i].labelStyle.font.size !== '0px' && this.gauge.axes[i].labelStyle.font.size !== '0')) {
                        splitUpCount++;
                    }
                }
                else if (elementId.indexOf('_Axis_Ranges_') > 0) {
                    isrange = true;
                    if (this.gauge.axes[i].ranges.length === 1
                        && (!isNullOrUndefined(this.gauge.axes[i].ranges)
                            && this.gauge.axes[i].ranges[0].start === 0
                            && this.gauge.axes[i].ranges[0].end === 0)) {
                        splitUpCount++;
                    }
                }
                else if (elementId.indexOf('_Axis_Pointers_') > 0) {
                    isPointer = true;
                    if (this.gauge.axes[i].pointers.length > 0 && this.gauge.axes[i].pointers.length !== 1 &&
                        this.gauge.axes[i].pointers[0].value !== this.gauge.axes[i].minimum) {
                        splitUpCount++;
                    }
                }
            }
            this.allowAxisCount.push(axisCount === 0 ? 1 : axisCount);
            this.axisOption.push({
                isAxisLine: isAxisLine, isMajorTick: isMajorTick, isMinorTick: isMinorTick,
                isAxisLabel: isLabel, isPointer: isPointer, isRange: isrange,
                axisLabelCount: labelCount, majorTickCount: majorTickCount, minorTickCount: minorTickCount
            });
            isAxisLine = false;
            isMajorTick = false;
            majorTickCount = 0;
            isMinorTick = false;
            labelCount = 0;
            minorTickCount = 0;
            isLabel = false;
            isrange = false;
            isPointer = false;
            if (this.gauge.axes[i].annotations != null
                && this.gauge.axes[i].annotations.length > 0
                && !isNullOrUndefined(this.gauge.annotationsModule)) {
                splitUpCount++;
            }
            this.gauge.loadingAnimationDuration.push(splitUpCount === 0 ? duration : duration / splitUpCount);
        }
    };
    /**
     * Calculate maximum label width for the axis.
     *
     * @param {CircularGauge} gauge - Specifies the instance of the gauge.
     * @param {Axis} axis - Specifies the axis.
     * @returns {void}
     */
    AxisLayoutPanel.prototype.getMaxLabelWidth = function (gauge, axis) {
        axis.maxLabelSize = new Size(0, 0);
        var textStyle = {
            size: axis.labelStyle.font.size || this.gauge.themeStyle.fontSize,
            color: axis.labelStyle.font.color || this.gauge.themeStyle.labelColor,
            fontFamily: axis.labelStyle.font.fontFamily || this.gauge.themeStyle.labelFontFamily,
            fontWeight: axis.labelStyle.font.fontWeight || this.gauge.themeStyle.fontWeight,
            fontStyle: axis.labelStyle.font.fontStyle,
            opacity: axis.labelStyle.font.opacity
        };
        for (var _i = 0, _a = axis.visibleLabels; _i < _a.length; _i++) {
            var label = _a[_i];
            label.size = measureText(label.text, textStyle);
            axis.maxLabelSize.width = label.size.width > axis.maxLabelSize.width ?
                label.size.width : axis.maxLabelSize.width;
            axis.maxLabelSize.height = label.size.height > axis.maxLabelSize.height ?
                label.size.height : axis.maxLabelSize.height;
        }
    };
    AxisLayoutPanel.prototype.destroy = function () {
        this.gauge = null;
        this.farSizes = [];
        if (!isNullOrUndefined(this.axisRenderer)) {
            this.axisRenderer.destroy();
        }
        this.axisRenderer = null;
        if (!isNullOrUndefined(this.pointerRenderer)) {
            this.pointerRenderer.destroy();
        }
        this.pointerRenderer = null;
        this.axisOption = null;
        this.prevAnimatedMajorTickValue = null;
        this.prevAnimatedMajorTickIndex = null;
        this.prevAnimatedMinorTickIndex = null;
        this.prevAnimatedMinorTickValue = null;
        this.allowAxisCount = null;
    };
    return AxisLayoutPanel;
}());
export { AxisLayoutPanel };
