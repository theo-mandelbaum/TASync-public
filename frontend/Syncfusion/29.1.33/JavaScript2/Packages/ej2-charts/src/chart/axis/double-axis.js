import { getMinPointsDelta, getActualDesiredIntervalsCount, setRange, triggerLabelRender } from '../../common/utils/helper';
import { DoubleRange } from '../utils/double-range';
import { withIn, logBase } from '../../common/utils/helper';
import { isNullOrUndefined, extend, getValue } from '@syncfusion/ej2-base';
/**
 * The `Double` module is used to render the numeric axis in charts.
 */
var Double = /** @class */ (function () {
    /**
     * Constructor for the dateTime module.
     *
     * @private
     * @param {Chart} chart - Specifies the chart.
     */
    function Double(chart) {
        this.isColumn = 0;
        this.isStacking = false;
        this.chart = chart;
    }
    /**
     * Numeric Nice Interval for the axis.
     *
     * @private
     * @param {Axis} axis - The axis.
     * @param {number} delta - The delta value.
     * @param {Size} size - The size.
     * @returns {number} - The calculated nice interval.
     */
    Double.prototype.calculateNumericNiceInterval = function (axis, delta, size) {
        var actualDesiredIntervalsCount = getActualDesiredIntervalsCount(size, axis);
        var niceInterval = delta / actualDesiredIntervalsCount;
        if (!isNullOrUndefined(axis.desiredIntervals)) {
            if (this.isAutoIntervalOnBothAxis(axis)) {
                return niceInterval;
            }
        }
        var minInterval = Math.pow(10, Math.floor(logBase(niceInterval, 10)));
        for (var _i = 0, _a = axis.intervalDivs; _i < _a.length; _i++) {
            var interval = _a[_i];
            var currentInterval = minInterval * interval;
            if (actualDesiredIntervalsCount < (delta / currentInterval)) {
                break;
            }
            niceInterval = currentInterval;
        }
        return niceInterval;
    };
    /**
     * Determines whether auto interval is enabled on both axes.
     *
     * @private
     * @param {Axis} axis - The axis.
     * @returns {boolean} - The boolean value indicating if auto interval is enabled on both axes.
     */
    Double.prototype.isAutoIntervalOnBothAxis = function (axis) {
        if (((axis.zoomFactor < 1 || axis.zoomPosition > 0) && axis.enableAutoIntervalOnZooming)) {
            return false;
        }
        else {
            return true;
        }
    };
    Double.prototype.getActualRange = function (axis, size) {
        this.initializeDoubleRange(axis);
        if ((!axis.startFromZero) && (this.isColumn > 0)) {
            axis.actualRange.interval = axis.interval || this.calculateNumericNiceInterval(axis, axis.doubleRange.delta, size);
            axis.actualRange.max = axis.doubleRange.end + axis.actualRange.interval;
            if ((axis.doubleRange.start - axis.actualRange.interval < 0 && axis.doubleRange.start > 0)) {
                axis.actualRange.min = 0;
            }
            else {
                axis.actualRange.min = axis.doubleRange.start - (this.isStacking ? 0 : axis.actualRange.interval);
            }
        }
        else {
            axis.actualRange.interval = axis.interval || this.calculateNumericNiceInterval(axis, axis.doubleRange.delta, size);
            axis.actualRange.min = axis.doubleRange.start;
            axis.actualRange.max = axis.doubleRange.end;
        }
    };
    /**
     * Range for the axis.
     *
     * @private
     * @param {Axis} axis - The axis.
     * @returns {void}
     */
    Double.prototype.initializeDoubleRange = function (axis) {
        //Axis Min
        if (axis.minimum !== null) {
            this.min = axis.minimum;
        }
        else if (this.min === null || this.min === Number.POSITIVE_INFINITY) {
            this.min = 0;
        }
        // Axis Max
        if (axis.maximum !== null) {
            this.max = axis.maximum;
        }
        else if (this.max === null || this.max === Number.NEGATIVE_INFINITY) {
            this.max = 5;
        }
        if (this.min === this.max) {
            this.max = axis.valueType.indexOf('Category') > -1 ? this.max : this.min + 1;
        }
        axis.doubleRange = new DoubleRange(this.min, this.max);
        axis.actualRange = {};
    };
    /**
     * The function to calculate the range and labels for the axis.
     *
     * @returns {void}
     * @private
     */
    Double.prototype.calculateRangeAndInterval = function (size, axis) {
        this.calculateRange(axis);
        this.getActualRange(axis, size);
        this.applyRangePadding(axis, size);
        this.calculateVisibleLabels(axis, this.chart);
    };
    /**
     * Calculate Range for the axis.
     *
     * @private
     */
    Double.prototype.calculateRange = function (axis) {
        /** Generate axis range */
        this.min = null;
        this.max = null;
        if (!setRange(axis)) {
            for (var _i = 0, _a = axis.series; _i < _a.length; _i++) {
                var series = _a[_i];
                if (!series.visible) {
                    continue;
                }
                this.paddingInterval = 0;
                if (!isNullOrUndefined(series.points)) {
                    axis.maxPointLength = series.points.length;
                }
                axis.maxPointLength = series.points.length;
                if (((series.type.indexOf('Column') > -1 || series.type.indexOf('Histogram') > -1) && axis.orientation === 'Horizontal')
                    || (series.type.indexOf('Bar') > -1 && axis.orientation === 'Vertical')) {
                    if ((series.xAxis.valueType === 'Double' || series.xAxis.valueType === 'DateTime')
                        && series.xAxis.rangePadding === 'Auto') {
                        this.paddingInterval = getMinPointsDelta(series.xAxis, axis.series) * 0.5;
                    }
                }
                //For xRange
                if (axis.orientation === 'Horizontal') {
                    if (this.chart.requireInvertedAxis) {
                        this.yAxisRange(axis, series);
                    }
                    else {
                        this.findMinMax(series.xMin - this.paddingInterval, series.xMax + this.paddingInterval);
                    }
                }
                // For yRange
                if (axis.orientation === 'Vertical') {
                    this.isColumn += (series.type.indexOf('Column') !== -1 || series.type.indexOf('Bar') !== -1 || series.drawType === 'Column') ? 1 : 0;
                    this.isStacking = series.type.indexOf('Stacking') !== -1;
                    if (this.chart.requireInvertedAxis) {
                        this.findMinMax(series.xMin - this.paddingInterval, series.xMax + this.paddingInterval);
                    }
                    else {
                        this.yAxisRange(axis, series);
                    }
                }
            }
        }
    };
    Double.prototype.yAxisRange = function (axis, series) {
        if (series.dragSettings.enable && this.chart.dragY) {
            if (this.chart.dragY >= axis.visibleRange.max) {
                series.yMax = this.chart.dragY + axis.visibleRange.interval;
            }
            if (this.chart.dragY <= axis.visibleRange.min) {
                series.yMin = this.chart.dragY - axis.visibleRange.interval;
            }
        }
        if (series.type === 'Waterfall') {
            var cumulativeMax = 0;
            var cumulativeValue = 0;
            for (var i = 0; i < series.yData.length; i++) {
                if (!(series.intermediateSumIndexes && series.intermediateSumIndexes.indexOf(i) !== -1) &&
                    !(series.sumIndexes && series.sumIndexes.indexOf(i) !== -1)) {
                    cumulativeValue += series.yData[i];
                }
                if (cumulativeValue > cumulativeMax) {
                    cumulativeMax = cumulativeValue;
                }
            }
            this.findMinMax(series.yMin, cumulativeMax);
        }
        else {
            this.findMinMax(series.yMin, series.yMax);
        }
    };
    Double.prototype.findMinMax = function (min, max) {
        if (this.min === null || this.min > min) {
            this.min = min;
        }
        if (this.max === null || this.max < max) {
            this.max = max;
        }
        if ((this.max === this.min) && this.max < 0 && this.min < 0) { // max == min
            this.max = 0;
        }
    };
    /**
     * Apply padding for the range.
     *
     * @private
     * @param {Axis} axis - The axis for which padding is applied.
     * @param {Size} size - The size used for padding calculation.
     * @returns {void}
     */
    Double.prototype.applyRangePadding = function (axis, size) {
        var start = axis.actualRange.min;
        var end = axis.actualRange.max;
        if (!setRange(axis)) {
            var interval = axis.actualRange.interval;
            var padding = axis.getRangePadding(this.chart);
            if (padding === 'Additional' || padding === 'Round') {
                this.findAdditional(axis, start, end, interval, size);
            }
            else if (padding === 'Normal') {
                this.findNormal(axis, start, end, interval, size);
            }
            else {
                this.updateActualRange(axis, start, end, interval);
            }
        }
        axis.actualRange.delta = axis.actualRange.max - axis.actualRange.min;
        this.calculateVisibleRange(size, axis);
    };
    Double.prototype.updateActualRange = function (axis, minimum, maximum, interval) {
        axis.actualRange = {
            min: axis.minimum != null ? axis.minimum : minimum,
            max: axis.maximum != null ? axis.maximum : maximum,
            interval: axis.interval != null ? axis.interval : interval,
            delta: axis.actualRange.delta
        };
    };
    Double.prototype.findAdditional = function (axis, start, end, interval, size) {
        var minimum;
        var maximum;
        minimum = Math.floor(start / interval) * interval;
        maximum = Math.ceil(end / interval) * interval;
        if (axis.rangePadding === 'Additional') {
            minimum -= interval;
            maximum += interval;
        }
        if (!isNullOrUndefined(axis.desiredIntervals)) {
            var delta = maximum - minimum;
            interval = this.calculateNumericNiceInterval(axis, delta, size);
        }
        this.updateActualRange(axis, minimum, maximum, interval);
    };
    Double.prototype.findNormal = function (axis, start, end, interval, size) {
        var remaining;
        var minimum;
        var maximum;
        var startValue = start;
        if (start < 0) {
            startValue = 0;
            minimum = start + (start * 0.05);
            remaining = interval + (minimum % interval);
            if ((0.365 * interval) >= remaining) {
                minimum -= interval;
            }
            if (minimum % interval < 0) {
                minimum = (minimum - interval) - (minimum % interval);
            }
        }
        else {
            minimum = start < ((5.0 / 6.0) * end) ? 0 : (start - (end - start) * 0.5);
            if (minimum % interval > 0) {
                minimum -= (minimum % interval);
            }
        }
        maximum = (end > 0) ? (end + (end - startValue) * 0.05) : (end - (end - startValue) * 0.05);
        remaining = interval - (maximum % interval);
        if ((0.365 * interval) >= remaining) {
            maximum += interval;
        }
        if (maximum % interval > 0) {
            maximum = (maximum + interval) - (maximum % interval);
        }
        axis.doubleRange = new DoubleRange(minimum, maximum);
        if (minimum === 0 || (minimum < 0 && maximum < 0)) {
            interval = this.calculateNumericNiceInterval(axis, axis.doubleRange.delta, size);
            maximum = Math.ceil(maximum / interval) * interval;
        }
        this.updateActualRange(axis, minimum, maximum, interval);
    };
    /**
     * Calculate visible range for axis.
     *
     * @private
     * @param {Size} size - The size used for calculation.
     * @param {Axis} axis - The axis for which the visible range is calculated.
     * @returns {void}
     */
    Double.prototype.calculateVisibleRange = function (size, axis) {
        axis.visibleRange = {
            max: axis.actualRange.max, min: axis.actualRange.min,
            delta: axis.actualRange.delta, interval: axis.actualRange.interval
        };
        if (this.chart.chartAreaType === 'Cartesian') {
            var isLazyLoad = isNullOrUndefined(axis.zoomingScrollBar) ? false : axis.zoomingScrollBar.isLazyLoad;
            if ((axis.zoomFactor < 1 || axis.zoomPosition > 0) && !isLazyLoad) {
                axis.calculateVisibleRangeOnZooming();
                axis.visibleRange.interval = (axis.enableAutoIntervalOnZooming) ?
                    this.calculateNumericNiceInterval(axis, axis.doubleRange.delta, size)
                    : axis.visibleRange.interval;
            }
        }
        var rangeDifference = (axis.visibleRange.max - axis.visibleRange.min) % axis.visibleRange.interval;
        if (rangeDifference !== 0 && !isNaN(rangeDifference) && axis.valueType === 'Double' &&
            axis.orientation === 'Vertical' && axis.rangePadding === 'Auto') {
            var duplicateTempInterval = void 0;
            var tempInterval = axis.visibleRange.min;
            for (; (tempInterval <= axis.visibleRange.max) && (duplicateTempInterval !== tempInterval); tempInterval += axis.visibleRange.interval) {
                duplicateTempInterval = tempInterval;
            }
            if (duplicateTempInterval < axis.visibleRange.max) {
                axis.visibleRange.max = duplicateTempInterval + axis.visibleRange.interval;
            }
        }
        axis.triggerRangeRender(this.chart, axis.visibleRange.min, axis.visibleRange.max, axis.visibleRange.interval);
    };
    /**
     * Calculate label for the axis.
     *
     * @private
     */
    Double.prototype.calculateVisibleLabels = function (axis, chart) {
        /** Generate axis labels */
        axis.visibleLabels = [];
        var tempInterval = axis.visibleRange.min;
        var labelStyle;
        var controlName = chart.getModuleName();
        var isPolarRadar = controlName === 'chart' && chart.chartAreaType === 'PolarRadar';
        if (!isPolarRadar && (axis.zoomFactor < 1 || axis.zoomPosition > 0 || this.paddingInterval)) {
            tempInterval = axis.visibleRange.min - (axis.visibleRange.min % axis.visibleRange.interval);
        }
        var format = this.getFormat(axis);
        var isCustom = format.match('{value}') !== null;
        var intervalDigits = 0;
        var formatDigits = 0;
        if (axis.labelFormat && axis.labelFormat.indexOf('n') > -1) {
            formatDigits = parseInt(axis.labelFormat.substring(1, axis.labelFormat.length), 10);
        }
        axis.format = chart.intl.getNumberFormat({
            format: isCustom ? '' : format,
            useGrouping: chart.useGroupingSeparator
        });
        axis.startLabel = axis.format(axis.visibleRange.min);
        axis.endLabel = axis.format(axis.visibleRange.max);
        if (axis.visibleRange.interval && (axis.visibleRange.interval + '').indexOf('.') >= 0) {
            intervalDigits = (axis.visibleRange.interval + '').split('.')[1].length;
        }
        var duplicateTempInterval;
        for (; (tempInterval <= axis.visibleRange.max) && (duplicateTempInterval !== tempInterval); tempInterval += axis.visibleRange.interval) {
            duplicateTempInterval = tempInterval;
            labelStyle = (extend({}, getValue('properties', axis.labelStyle), null, true));
            if (withIn(tempInterval, axis.visibleRange)) {
                triggerLabelRender(chart, tempInterval, this.formatValue(axis, isCustom, format, tempInterval), labelStyle, axis);
            }
        }
        if (tempInterval && (tempInterval + '').indexOf('.') >= 0 && (tempInterval + '').split('.')[1].length > 10) {
            tempInterval = (tempInterval + '').split('.')[1].length > (formatDigits || intervalDigits) ?
                +tempInterval.toFixed(formatDigits || intervalDigits) : tempInterval;
            if (tempInterval <= axis.visibleRange.max) {
                triggerLabelRender(chart, tempInterval, this.formatValue(axis, isCustom, format, tempInterval), labelStyle, axis);
            }
        }
        if (axis.getMaxLabelWidth) {
            axis.getMaxLabelWidth(this.chart);
        }
    };
    /**
     * Format of the axis label.
     *
     * @private
     */
    Double.prototype.getFormat = function (axis) {
        if (axis.labelFormat) {
            if (axis.labelFormat.indexOf('p') === 0 && axis.labelFormat.indexOf('{value}') === -1 && axis.isStack100) {
                return '{value}%';
            }
            return axis.labelFormat;
        }
        return axis.isStack100 ? '{value}%' : '';
    };
    /**
     * Formatted the axis label.
     *
     * @private
     */
    Double.prototype.formatValue = function (axis, isCustom, format, tempInterval) {
        /*The toLocaleString method is used to adjust the decimal points for this ticket, specifically for ticket numbers I481747 and I541484.*/
        var labelValue = !(tempInterval % 1) ? tempInterval : Number(tempInterval.toLocaleString('en-US').split(',').join(''));
        return isCustom ? format.replace('{value}', axis.format(labelValue))
            : format ? axis.format(tempInterval) : axis.format(labelValue);
    };
    /**
     * Get module name.
     *
     * @returns {string} - Returns the module name.
     */
    Double.prototype.getModuleName = function () {
        /**
         * Returns the module name
         */
        return 'Double';
    };
    /**
     * To destroy the double axis.
     *
     * @returns {void}
     * @private
     */
    Double.prototype.destroy = function () {
        /**
         * Destroy method performed here.
         */
    };
    return Double;
}());
export { Double };
