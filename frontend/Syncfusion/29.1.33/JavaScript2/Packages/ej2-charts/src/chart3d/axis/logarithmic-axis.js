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
import { Double3D } from '../axis/double-axis';
import { getActualDesiredIntervalsCount, triggerLabelRender } from '../../common/utils/helper';
import { logBase, withIn } from '../../common/utils/helper';
import { extend, getValue } from '@syncfusion/ej2-base';
/**
 * The `Logarithmic` module is used to render log axis.
 */
var Logarithmic3D = /** @class */ (function (_super) {
    __extends(Logarithmic3D, _super);
    /**
     * Constructor for the logerithmic module.
     *
     * @param {Chart3D} chart - Chart3D instance.
     * @private
     */
    function Logarithmic3D(chart) {
        return _super.call(this, chart) || this;
    }
    /**
     * Calculates the range and interval for the specified axis based on the provided size.
     *
     * @param {Size} size - The size of the chart area used for range and interval calculation.
     * @param {Chart3DAxis} axis - The axis for which the range and interval are calculated.
     * @returns {void}
     */
    Logarithmic3D.prototype.calculateRangeAndInterval = function (size, axis) {
        this.calculateRange(axis);
        this.getActualRange(axis, size);
        this.calculateVisibleRange(size, axis);
        this.calculateVisibleLabels(axis, this.chart);
    };
    /**
     * Calculates actual range for the axis.
     *
     * @param {Chart3DAxis} axis - The axis for which the range and interval are calculated.
     * @param {Size} size - The size of the axis.
     * @returns {void}
     * @private
     */
    Logarithmic3D.prototype.getActualRange = function (axis, size) {
        this.initializeDoubleRange(axis);
        this.min = this.min < 0 ? 0 : this.min;
        var logStart = logBase(this.min, axis.logBase);
        logStart = isFinite(logStart) ? logStart : this.min;
        var logEnd = this.max === 1 ? 1 : logBase(this.max, axis.logBase);
        logEnd = isFinite(logStart) ? logEnd : this.max;
        this.min = Math.floor(logStart / 1);
        var isRectSeries = axis.series && axis.series.some(function (item) {
            return (item.type.indexOf('Column') !== -1 || item.type.indexOf('Bar') !== -1);
        });
        if (isRectSeries) {
            this.min = (this.min <= 0) ? (+this.min - 1) : this.min;
        }
        this.max = Math.ceil(logEnd / 1);
        this.max = this.max === this.min ? this.max + 1 : this.max;
        axis.actualRange.interval = axis.interval || this.calculateLogNiceInterval(this.max - this.min, size, axis);
        axis.actualRange.min = this.min;
        axis.actualRange.max = this.max;
        axis.actualRange.delta = this.max - this.min;
    };
    /**
     * Calculates visible range for the axis.
     *
     * @param {Size} size - The size of the axis.
     * @param {Chart3DAxis} axis - The axis for which the range and interval are calculated.
     * @returns {void}
     * @private
     */
    Logarithmic3D.prototype.calculateVisibleRange = function (size, axis) {
        axis.visibleRange = {
            interval: axis.actualRange.interval, max: axis.actualRange.max,
            min: axis.actualRange.min, delta: axis.actualRange.delta
        };
    };
    /**
     * Calculates log inteval for the axis.
     *
     * @param {number} delta - The delta value.
     * @param {Size} size - The size of the axis.
     * @param {Chart3DAxis} axis - The axis for which the range and interval are calculated.
     * @returns {number} - Returns the log interval.
     * @private
     */
    Logarithmic3D.prototype.calculateLogNiceInterval = function (delta, size, axis) {
        var actualDesiredIntervalsCount = getActualDesiredIntervalsCount(size, axis);
        var niceInterval = delta;
        var minInterval = Math.pow(axis.logBase, Math.floor(logBase(niceInterval, 10)));
        for (var j = 0, len = axis.intervalDivs.length; j < len; j++) {
            var currentInterval = minInterval * axis.intervalDivs[j];
            if (actualDesiredIntervalsCount < (delta / currentInterval)) {
                break;
            }
            niceInterval = currentInterval;
        }
        return niceInterval;
    };
    /**
     * Calculates labels for the axis.
     *
     * @param {Chart3DAxis} axis - The axis for which the range and interval are calculated.
     * @param {Chart3D} chart - Specifies the instance of the chart.
     * @returns {void}
     * @private
     */
    Logarithmic3D.prototype.calculateVisibleLabels = function (axis, chart) {
        /** Generate axis labels */
        var tempInterval = axis.visibleRange.min;
        axis.visibleLabels = [];
        var labelStyle;
        var value;
        var axisFormat = this.getFormat(axis);
        var isCustomFormat = axisFormat.match('{value}') !== null;
        var startValue = Math.pow(axis.logBase, axis.visibleRange.min);
        axis.format = chart.intl.getNumberFormat({
            format: isCustomFormat ? '' : axisFormat,
            useGrouping: chart.useGroupingSeparator,
            maximumFractionDigits: startValue < 1 ? 20 : 3
        });
        axis.startLabel = axis.format(startValue < 1 ? +startValue.toPrecision(1) : startValue);
        axis.endLabel = axis.format(Math.pow(axis.logBase, axis.visibleRange.max));
        for (; tempInterval <= axis.visibleRange.max; tempInterval += axis.visibleRange.interval) {
            labelStyle = (extend({}, getValue('properties', axis.labelStyle), null, true));
            if (withIn(tempInterval, axis.visibleRange)) {
                value = Math.pow(axis.logBase, tempInterval);
                triggerLabelRender(this.chart, tempInterval, this.formatValue(axis, isCustomFormat, axisFormat, value < 1 ? +value.toPrecision(1) : value), labelStyle, axis);
            }
        }
        if (axis.getMaxLabelWidth) {
            axis.getMaxLabelWidth(this.chart);
        }
    };
    /**
     * Get module name.
     *
     * @returns {string} - Returns the module name.
     */
    Logarithmic3D.prototype.getModuleName = function () {
        /**
         * Returns the module name
         */
        return 'Logarithmic3D';
    };
    /**
     * To destroy the category axis.
     *
     * @returns {void}
     * @private
     */
    Logarithmic3D.prototype.destroy = function () {
        /**
         * Destroy method performed here
         */
    };
    return Logarithmic3D;
}(Double3D));
export { Logarithmic3D };
