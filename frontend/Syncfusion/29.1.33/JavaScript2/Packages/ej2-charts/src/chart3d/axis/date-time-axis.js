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
import { setRange, triggerLabelRender } from '../../common/utils/helper';
import { DoubleRange } from '../utils/doubleRange';
import { withIn, firstToLowerCase } from '../../common/utils/helper';
import { DataUtil } from '@syncfusion/ej2-data';
import { NiceIntervals } from '../axis/axis-helper';
import { extend, getValue } from '@syncfusion/ej2-base';
/**
 * The `DateTime` module is used to render datetime axis.
 */
var DateTime3D = /** @class */ (function (_super) {
    __extends(DateTime3D, _super);
    /**
     * Constructor for the dateTime module.
     *
     * @param {Chart3D} chart - Chart3D instance.
     * @private
     */
    function DateTime3D(chart) {
        return _super.call(this, chart) || this;
    }
    /**
     * Calculates the range and interval for the specified axis based on the provided size.
     *
     * @param {Size} size - The size of the chart area used for range and interval calculation.
     * @param {Chart3DAxis} axis - The axis for which the range and interval are calculated.
     * @returns {void}
     */
    DateTime3D.prototype.calculateRangeAndInterval = function (size, axis) {
        this.calculateRange(axis);
        this.getActualRange(axis, size);
        this.applyRangePadding(axis, size);
        this.calculateVisibleLabels(axis, this.chart);
    };
    /**
     * Retrieves the actual range for the specified axis based on the provided size.
     *
     * @param {Chart3DAxis} axis - The axis for which the actual range is calculated.
     * @param {Size} size - The size of the chart area used in the range calculation.
     * @returns {void}
     */
    DateTime3D.prototype.getActualRange = function (axis, size) {
        var option = {
            skeleton: 'full',
            type: 'dateTime'
        };
        var dateParser = this.chart.intl.getDateParser(option);
        var dateFormatter = this.chart.intl.getDateFormat(option);
        // Axis min
        if ((axis.minimum) !== null) {
            this.min = Date.parse(dateParser(dateFormatter(new Date(DataUtil.parse.parseJson({ val: axis.minimum }).val))));
        }
        else if (this.min === null || this.min === Number.POSITIVE_INFINITY) {
            this.min = Date.parse(dateParser(dateFormatter(new Date(1970, 1, 1))));
        }
        // Axis Max
        if ((axis.maximum) !== null) {
            this.max = Date.parse(dateParser(dateFormatter(new Date(DataUtil.parse.parseJson({ val: axis.maximum }).val))));
        }
        else if (this.max === null || this.max === Number.NEGATIVE_INFINITY) {
            this.max = Date.parse(dateParser(dateFormatter(new Date(1970, 5, 1))));
        }
        if (this.min === this.max) {
            this.max = this.max + 2592000000;
            this.min = this.min - 2592000000;
        }
        axis.actualRange = {};
        axis.doubleRange = new DoubleRange(this.min, this.max);
        var datetimeInterval = this.calculateDateTimeNiceInterval(axis, size, axis.doubleRange.start, axis.doubleRange.end);
        if (!axis.interval) {
            axis.actualRange.interval = datetimeInterval;
        }
        else {
            axis.actualRange.interval = axis.interval;
        }
        axis.actualRange.min = axis.doubleRange.start;
        axis.actualRange.max = axis.doubleRange.end;
    };
    /**
     * Applies range padding to the specified axis based on the provided size.
     *
     * @param {Chart3DAxis} axis - The axis to which range padding is applied.
     * @param {Size} size - The size of the chart area used in the padding calculation.
     * @returns {void}
     */
    DateTime3D.prototype.applyRangePadding = function (axis, size) {
        this.min = (axis.actualRange.min);
        this.max = (axis.actualRange.max);
        var minimum;
        var maximum;
        var interval = axis.actualRange.interval;
        if (!setRange(axis)) {
            var rangePadding = axis.getRangePadding(this.chart);
            minimum = new Date(this.min);
            maximum = new Date(this.max);
            var intervalType = axis.actualIntervalType;
            if (rangePadding === 'None') {
                this.min = minimum.getTime();
                this.max = maximum.getTime();
            }
            else if (rangePadding === 'Additional' || rangePadding === 'Round') {
                switch (intervalType) {
                    case 'Years':
                        this.getYear(minimum, maximum, rangePadding, interval);
                        break;
                    case 'Months':
                        this.getMonth(minimum, maximum, rangePadding, interval);
                        break;
                    case 'Days':
                        this.getDay(minimum, maximum, rangePadding, interval);
                        break;
                    case 'Hours':
                        this.getHour(minimum, maximum, rangePadding, interval);
                        break;
                    case 'Minutes': {
                        var minute = (minimum.getMinutes() / interval) * interval;
                        var endMinute = maximum.getMinutes() + (minimum.getMinutes() - minute);
                        if (rangePadding === 'Round') {
                            this.min = (new Date(minimum.getFullYear(), minimum.getMonth(), minimum.getDate(), minimum.getHours(), minute, 0)).getTime();
                            this.max = (new Date(maximum.getFullYear(), maximum.getMonth(), maximum.getDate(), maximum.getHours(), endMinute, 59)).getTime();
                        }
                        else {
                            this.min = (new Date(minimum.getFullYear(), minimum.getMonth(), minimum.getDate(), minimum.getHours(), minute + (-interval), 0)).getTime();
                            this.max = (new Date(maximum.getFullYear(), maximum.getMonth(), maximum.getDate(), maximum.getHours(), endMinute + (interval), 0)).getTime();
                        }
                        break;
                    }
                    case 'Seconds': {
                        var second = (minimum.getSeconds() / interval) * interval;
                        var endSecond = maximum.getSeconds() + (minimum.getSeconds() - second);
                        if (rangePadding === 'Round') {
                            this.min = (new Date(minimum.getFullYear(), minimum.getMonth(), minimum.getDate(), minimum.getHours(), minimum.getMinutes(), second, 0)).getTime();
                            this.max = (new Date(maximum.getFullYear(), maximum.getMonth(), maximum.getDate(), maximum.getHours(), maximum.getMinutes(), endSecond, 0)).getTime();
                        }
                        else {
                            this.min = (new Date(minimum.getFullYear(), minimum.getMonth(), minimum.getDate(), minimum.getHours(), minimum.getMinutes(), second + (-interval), 0)).getTime();
                            this.max = (new Date(maximum.getFullYear(), maximum.getMonth(), maximum.getDate(), maximum.getHours(), maximum.getMinutes(), endSecond + (interval), 0)).getTime();
                        }
                        break;
                    }
                }
            }
        }
        axis.actualRange.min = (axis.minimum != null) ? this.min : this.min;
        axis.actualRange.max = (axis.maximum != null) ? this.max : this.max;
        axis.actualRange.delta = (axis.actualRange.max - axis.actualRange.min);
        axis.doubleRange = new DoubleRange(axis.actualRange.min, axis.actualRange.max);
        this.calculateVisibleRange(size, axis);
    };
    /**
     * Determines the year values within the specified date range with consideration for range padding and interval.
     *
     * @param {Date} minimum - The minimum date of the range.
     * @param {Date} maximum - The maximum date of the range.
     * @param {ChartRangePadding} rangePadding - The type of range padding to apply.
     * @param {number} interval - The desired interval between years.
     * @returns {void}
     */
    DateTime3D.prototype.getYear = function (minimum, maximum, rangePadding, interval) {
        var startYear = minimum.getFullYear();
        var endYear = maximum.getFullYear();
        if (rangePadding === 'Additional') {
            this.min = (new Date(startYear - interval, 1, 1, 0, 0, 0)).getTime();
            this.max = (new Date(endYear + interval, 1, 1, 0, 0, 0)).getTime();
        }
        else {
            this.min = new Date(startYear, 0, 0, 0, 0, 0).getTime();
            this.max = new Date(endYear, 11, 30, 23, 59, 59).getTime();
        }
    };
    /**
     * Determines the month values within the specified date range with consideration for range padding and interval.
     *
     * @param {Date} minimum - The minimum date of the range.
     * @param {Date} maximum - The maximum date of the range.
     * @param {ChartRangePadding} rangePadding - The type of range padding to apply.
     * @param {number} interval - The desired interval between months.
     * @returns {void}
     */
    DateTime3D.prototype.getMonth = function (minimum, maximum, rangePadding, interval) {
        var month = minimum.getMonth();
        var endMonth = maximum.getMonth();
        if (rangePadding === 'Round') {
            this.min = (new Date(minimum.getFullYear(), month, 0, 0, 0, 0)).getTime();
            this.max = (new Date(maximum.getFullYear(), endMonth, new Date(maximum.getFullYear(), maximum.getMonth(), 0).getDate(), 23, 59, 59)).getTime();
        }
        else {
            this.min = (new Date(minimum.getFullYear(), month + (-interval), 1, 0, 0, 0)).getTime();
            this.max = (new Date(maximum.getFullYear(), endMonth + (interval), endMonth === 2 ? 28 : 30, 0, 0, 0)).getTime();
        }
    };
    /**
     * Determines the day values within the specified date range with consideration for range padding and interval.
     *
     * @param {Date} minimum - The minimum date of the range.
     * @param {Date} maximum - The maximum date of the range.
     * @param {ChartRangePadding} rangePadding - The type of range padding to apply.
     * @param {number} interval - The desired interval between days.
     * @returns {void}
     */
    DateTime3D.prototype.getDay = function (minimum, maximum, rangePadding, interval) {
        var day = minimum.getDate();
        var endDay = maximum.getDate();
        if (rangePadding === 'Round') {
            this.min = (new Date(minimum.getFullYear(), minimum.getMonth(), day, 0, 0, 0)).getTime();
            this.max = (new Date(maximum.getFullYear(), maximum.getMonth(), endDay, 23, 59, 59)).getTime();
        }
        else {
            this.min = (new Date(minimum.getFullYear(), minimum.getMonth(), day + (-interval), 0, 0, 0)).getTime();
            this.max = (new Date(maximum.getFullYear(), maximum.getMonth(), endDay + (interval), 0, 0, 0)).getTime();
        }
    };
    /**
     * Determines the hour values within the specified date range with consideration for range padding and interval.
     *
     * @param {Date} minimum - The minimum date of the range.
     * @param {Date} maximum - The maximum date of the range.
     * @param {ChartRangePadding} rangePadding - The type of range padding to apply.
     * @param {number} interval - The desired interval between hours.
     * @returns {void}
     */
    DateTime3D.prototype.getHour = function (minimum, maximum, rangePadding, interval) {
        var hour = (minimum.getHours() / interval) * interval;
        var endHour = maximum.getHours() + (minimum.getHours() - hour);
        if (rangePadding === 'Round') {
            this.min = (new Date(minimum.getFullYear(), minimum.getMonth(), minimum.getDate(), hour, 0, 0)).getTime();
            this.max = (new Date(maximum.getFullYear(), maximum.getMonth(), maximum.getDate(), endHour, 59, 59)).getTime();
        }
        else {
            this.min = (new Date(minimum.getFullYear(), minimum.getMonth(), minimum.getDate(), hour + (-interval), 0, 0)).getTime();
            this.max = (new Date(maximum.getFullYear(), maximum.getMonth(), maximum.getDate(), endHour + (interval), 0, 0)).getTime();
        }
    };
    /**
     * Calculates the visible range for the specified axis based on the provided size.
     *
     * @param {Size} size - The size of the chart area used in the visible range calculation.
     * @param {Chart3DAxis} axis - The axis for which the visible range is calculated.
     * @returns {void}
     */
    DateTime3D.prototype.calculateVisibleRange = function (size, axis) {
        axis.visibleRange = {
            min: axis.actualRange.min,
            max: axis.actualRange.max,
            interval: axis.actualRange.interval,
            delta: axis.actualRange.delta
        };
        axis.dateTimeInterval = this.increaseDateTimeInterval(axis, axis.visibleRange.min, axis.visibleRange.interval).getTime()
            - axis.visibleRange.min;
        axis.triggerRangeRender(this.chart, axis.visibleRange.min, axis.visibleRange.max, axis.visibleRange.interval);
    };
    /**
     * Calculate visible labels for the axis.
     *
     * @param {Chart3DAxis} axis -  The axis for which the labels are calculated.
     * @param {Chart3D} chart chart
     * @returns {void}
     * @private
     */
    DateTime3D.prototype.calculateVisibleLabels = function (axis, chart) {
        axis.visibleLabels = [];
        var tempInterval = axis.visibleRange.min;
        var labelStyle;
        if (!setRange(axis)) {
            tempInterval = this.alignRangeStart(axis, tempInterval, axis.visibleRange.interval).getTime();
        }
        while (tempInterval <= axis.visibleRange.max) {
            labelStyle = (extend({}, getValue('properties', axis.labelStyle), null, true));
            axis.format = chart.intl.getDateFormat({
                format: this.findCustomFormats(axis) || '',
                type: firstToLowerCase(axis.skeletonType),
                skeleton: this.getSkeleton(axis)
            });
            axis.startLabel = axis.format(new Date(axis.visibleRange.min));
            axis.endLabel = axis.format(new Date(axis.visibleRange.max));
            if (withIn(tempInterval, axis.visibleRange)) {
                var interval = this.increaseDateTimeInterval(axis, tempInterval, axis.visibleRange.interval).getTime();
                if (interval > axis.visibleRange.max) {
                    axis.endLabel = axis.format(new Date(tempInterval));
                }
                triggerLabelRender(chart, tempInterval, axis.format(new Date(tempInterval)), labelStyle, axis);
            }
            var actualInterval = tempInterval;
            tempInterval = this.increaseDateTimeInterval(axis, tempInterval, axis.visibleRange.interval).getTime();
            if (actualInterval === tempInterval) {
                break;
            }
        }
        if ((axis.actualIntervalType === 'Months' || axis.actualIntervalType === 'Days')) {
            axis.format = chart.intl.getDateFormat({
                format: axis.labelFormat || (axis.actualIntervalType === 'Months' && !axis.skeleton ? 'y MMM' : ''),
                type: firstToLowerCase(axis.skeletonType), skeleton: axis.skeleton || (axis.actualIntervalType === 'Days' ? 'MMMd' : '')
            });
        }
        if (axis.getMaxLabelWidth) {
            axis.getMaxLabelWidth(this.chart);
        }
    };
    /**
     * Increases a date-time interval by the specified value for the given axis.
     *
     * @param {Chart3DAxis} axis - The axis for which the date-time interval is increased.
     * @param {number} value - The value by which to increase the interval.
     * @param {number} interval - The original interval to be adjusted.
     * @returns {Date} - The adjusted date-time interval.
     * @private
     */
    DateTime3D.prototype.increaseDateTimeInterval = function (axis, value, interval) {
        var result = new Date(value);
        if (axis.interval) {
            axis.isIntervalInDecimal = (interval % 1) === 0;
            axis.visibleRange.interval = interval;
        }
        else {
            interval = Math.ceil(interval);
            axis.visibleRange.interval = interval;
        }
        var intervalType = axis.actualIntervalType;
        if (axis.isIntervalInDecimal) {
            switch (intervalType) {
                case 'Years':
                    result.setFullYear(result.getFullYear() + interval);
                    return result;
                case 'Months':
                    result.setMonth(result.getMonth() + interval);
                    return result;
                case 'Days':
                    result.setDate(result.getDate() + interval);
                    return result;
                case 'Hours':
                    result.setHours(result.getHours() + interval);
                    return result;
                case 'Minutes':
                    result.setMinutes(result.getMinutes() + interval);
                    return result;
                case 'Seconds':
                    result.setSeconds(result.getSeconds() + interval);
                    return result;
            }
        }
        return result;
    };
    /**
     * Aligns the starting date of the range for the specified axis based on the provided date and interval size.
     *
     * @param {Chart3DAxis} axis - The axis for which the range start is aligned.
     * @param {number} sDate - The date in numerical format to be aligned.
     * @param {number} intervalSize - The size of the interval used for alignment.
     * @returns {Date} - The aligned date for the range start.
     * @private
     */
    DateTime3D.prototype.alignRangeStart = function (axis, sDate, intervalSize) {
        var sResult = new Date(sDate);
        switch (axis.actualIntervalType) {
            case 'Years': {
                var year = Math.floor(Math.floor(sResult.getFullYear() / intervalSize) * intervalSize);
                sResult = new Date(year, sResult.getMonth(), sResult.getDate(), 0, 0, 0);
                return sResult;
            }
            case 'Months': {
                var month = Math.floor(Math.floor((sResult.getMonth()) / intervalSize) * intervalSize);
                sResult = new Date(sResult.getFullYear(), month, sResult.getDate(), 0, 0, 0);
                return sResult;
            }
            case 'Days': {
                var day = Math.floor(Math.floor((sResult.getDate()) / intervalSize) * intervalSize);
                sResult = new Date(sResult.getFullYear(), sResult.getMonth(), day, 0, 0, 0);
                return sResult;
            }
            case 'Hours': {
                var hour = Math.floor(Math.floor((sResult.getHours()) / intervalSize) * intervalSize);
                sResult = new Date(sResult.getFullYear(), sResult.getMonth(), sResult.getDate(), hour, 0, 0);
                return sResult;
            }
            case 'Minutes': {
                var minutes = Math.floor(Math.floor((sResult.getMinutes()) / intervalSize) * intervalSize);
                sResult = new Date(sResult.getFullYear(), sResult.getMonth(), sResult.getDate(), sResult.getHours(), minutes, 0, 0);
                return sResult;
            }
            case 'Seconds': {
                var seconds = Math.floor(Math.floor((sResult.getSeconds()) / intervalSize) * intervalSize);
                sResult = new Date(sResult.getFullYear(), sResult.getMonth(), sResult.getDate(), sResult.getHours(), sResult.getMinutes(), seconds, 0);
                return sResult;
            }
        }
        return sResult;
    };
    /**
     * Get module name.
     *
     * @returns {string} - Returns the module name.
     */
    DateTime3D.prototype.getModuleName = function () {
        /**
         * Returns the module name
         */
        return 'DateTime3D';
    };
    /**
     * To destroy the date time axis.
     *
     * @returns {void}
     * @private
     */
    DateTime3D.prototype.destroy = function () {
        /**
         * Destroy method performed here
         */
    };
    return DateTime3D;
}(NiceIntervals));
export { DateTime3D };
