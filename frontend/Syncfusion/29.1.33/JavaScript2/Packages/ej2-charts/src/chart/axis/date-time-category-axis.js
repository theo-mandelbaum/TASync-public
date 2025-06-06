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
import { Category } from '../axis/category-axis';
import { triggerLabelRender, valueToCoefficient } from '../../common/utils/helper';
import { withIn, firstToLowerCase } from '../../common/utils/helper';
import { extend, getValue } from '@syncfusion/ej2-base';
/**
 * The `DateTimeCategory` module is used to render the datetime category axis in charts.
 *
 * @private
 */
var DateTimeCategory = /** @class */ (function (_super) {
    __extends(DateTimeCategory, _super);
    /**
     * Constructor for the category module.
     *
     * @private
     * @param {Chart} chart - Specifies the chart.
     */
    function DateTimeCategory(chart) {
        return _super.call(this, chart) || this;
    }
    /**
     * The function to calculate the range and labels for the axis.
     *
     * @returns {void}
     * @private
     */
    DateTimeCategory.prototype.calculateRangeAndInterval = function (size, axis) {
        this.axisSize = size;
        this.calculateRange(axis);
        this.getActualRange(axis, size);
        this.applyRangePadding(axis, size);
        this.calculateVisibleLabels(axis);
    };
    /**
     * Calculate label for the axis.
     *
     * @private
     */
    DateTimeCategory.prototype.calculateVisibleLabels = function (axis) {
        /** Generate axis labels */
        axis.visibleLabels = [];
        var labelStyle;
        var padding = axis.labelPlacement === 'BetweenTicks' ? 0.5 : 0;
        var previousIndex = 0;
        var isRangeNavigator = this.chart.getModuleName() === 'rangeNavigator';
        this.axisSize = isRangeNavigator ? this.chart.availableSize : this.axisSize;
        if (isRangeNavigator || this.chart.stockChart) {
            axis.labels.sort(function (a, b) { return Number(a) - Number(b); });
        }
        if (axis.intervalType === 'Auto') {
            this.calculateDateTimeNiceInterval(axis, this.axisSize, parseInt(axis.labels[0], 10), parseInt(axis.labels[axis.labels.length - 1], 10));
        }
        else {
            axis.actualIntervalType = axis.intervalType;
        }
        axis.format = this.chart.intl.getDateFormat({
            format: axis.labelFormat || this.blazorCustomFormat(axis), type: firstToLowerCase(axis.skeletonType),
            skeleton: this.getSkeleton(axis, null, null, this.chart.isBlazor)
        });
        var i = (!isRangeNavigator && this.chart.stockChart) ? 1 : 0;
        var interval = axis.interval ? axis.interval : 1;
        for (; i < axis.labels.length; i += interval) {
            labelStyle = (extend({}, getValue('properties', axis.labelStyle), null, true));
            if (this.chart.stockChart || isRangeNavigator) {
                if (axis.intervalType === 'Auto') {
                    if ((((!isRangeNavigator && i === 1) || this.StartOfWeek(axis.labels.map(Number)[i], axis.labels.map(Number)[i - 1], axis, i, previousIndex))
                        || axis.isIndexed) && withIn(i, axis.visibleRange)) {
                        triggerLabelRender(this.chart, i, (axis.isIndexed ? this.getIndexedAxisLabel(axis.labels[i], axis.format) :
                            axis.format(new Date(axis.labels.map(Number)[i]))), labelStyle, axis);
                        previousIndex = i;
                    }
                }
                else if ((((!isRangeNavigator && i === 1) || !this.sameInterval(axis.labels.map(Number)[i], axis.labels.map(Number)[i - 1], axis.actualIntervalType, i))
                    || axis.isIndexed) && withIn(i, axis.visibleRange)) {
                    if ((!isRangeNavigator && i === 1) || this.isMaximum(i, previousIndex, axis)) {
                        triggerLabelRender(this.chart, i, (axis.isIndexed ? this.getIndexedAxisLabel(axis.labels[i], axis.format) :
                            axis.format(new Date(axis.labels.map(Number)[i]))), labelStyle, axis);
                        previousIndex = i;
                    }
                }
            }
            else {
                if (!this.sameInterval(axis.labels.map(Number)[i], axis.labels.map(Number)[i - 1], axis.actualIntervalType, i)
                    || axis.isIndexed) {
                    if (withIn(i - padding, axis.visibleRange)) {
                        triggerLabelRender(this.chart, i, (axis.isIndexed ? this.getIndexedAxisLabel(axis.labels[i], axis.format) :
                            axis.format(new Date(axis.labels.map(Number)[i]))), labelStyle, axis);
                    }
                }
            }
        }
        axis.startLabel = axis.visibleLabels[0] ? axis.visibleLabels[0].text : '';
        axis.endLabel = axis.visibleLabels[axis.visibleLabels.length - 1] ? axis.visibleLabels[axis.visibleLabels.length - 1].text : '';
        if (axis.getMaxLabelWidth) {
            axis.getMaxLabelWidth(this.chart);
        }
    };
    /**
     * Calculate the Blazor custom format for axis.
     *
     * @param {Axis} axis - The axis for which the custom format is calculated.
     * @returns {string} - The custom format string.
     * @private
     */
    DateTimeCategory.prototype.blazorCustomFormat = function (axis) {
        if (this.chart.isBlazor && axis.actualIntervalType === 'Years') {
            return 'yyyy';
        }
        else {
            return '';
        }
    };
    /**
     * To get the Indexed axis label text with axis format for DateTimeCategory axis.
     *
     * @param {string} value value
     * @param {Function} format format
     * @returns {string} Indexed axis label text
     * @private
     */
    DateTimeCategory.prototype.getIndexedAxisLabel = function (value, format) {
        var texts = value.split(',');
        for (var i = 0; i < texts.length; i++) {
            texts[i] = format(new Date(parseInt(texts[i], 10)));
        }
        return texts.join(', ');
    };
    /**
     * Get the same interval.
     *
     * @param {number} currentDate - The current date.
     * @param {number} previousDate - The previous date.
     * @param {RangeIntervalType} type - The type of range interval.
     * @param {number} index - The index of the interval.
     * @returns {boolean} - Indicates if the intervals are the same.
     * @private
     */
    DateTimeCategory.prototype.sameInterval = function (currentDate, previousDate, type, index) {
        var sameValue;
        if (index === 0) {
            sameValue = false;
        }
        else {
            switch (type) {
                case 'Years':
                    sameValue = new Date(currentDate).getFullYear() === new Date(previousDate).getFullYear();
                    break;
                case 'Quarter':
                    sameValue = new Date(currentDate).getFullYear() === new Date(previousDate).getFullYear() &&
                        Math.floor(new Date(currentDate).getMonth() / 3) === Math.floor(new Date(previousDate).getMonth() / 3);
                    break;
                case 'Months':
                    sameValue = new Date(currentDate).getFullYear() === new Date(previousDate).getFullYear() &&
                        new Date(currentDate).getMonth() === new Date(previousDate).getMonth();
                    break;
                case 'Weeks':
                    sameValue = new Date(currentDate).getFullYear() === new Date(previousDate).getFullYear() &&
                        new Date(currentDate).getMonth() === new Date(previousDate).getMonth() &&
                        Math.floor((new Date(currentDate).getDate() - 1) / 7) ===
                            Math.floor((new Date(previousDate).getDate() - 1) / 7);
                    break;
                case 'Days':
                    sameValue = (Math.abs(currentDate - previousDate) < 24 * 60 * 60 * 1000 &&
                        new Date(currentDate).getDay() === new Date(previousDate).getDay());
                    break;
                case 'Hours':
                    sameValue = (Math.abs(currentDate - previousDate) < 60 * 60 * 1000 &&
                        new Date(currentDate).getDay() === new Date(previousDate).getDay());
                    break;
                case 'Minutes':
                    sameValue = (Math.abs(currentDate - previousDate) < 60 * 1000 &&
                        new Date(currentDate).getMinutes() === new Date(previousDate).getMinutes());
                    break;
                case 'Seconds':
                    sameValue = (Math.abs(currentDate - previousDate) < 1000 &&
                        new Date(currentDate).getDay() === new Date(previousDate).getDay());
                    break;
            }
        }
        return sameValue;
    };
    /**
     * To check whether the current label comes in the same week as the previous label week.
     *
     * @param {number} currentDate - The current date.
     * @param {number} previousDate - The previous date.
     * @param {Axis} axis - The axis.
     * @param {number} index - The current index.
     * @param {number} previousIndex - The previous index.
     * @returns {boolean} - Indicates if the labels fall in the same week.
     */
    DateTimeCategory.prototype.StartOfWeek = function (currentDate, previousDate, axis, index, previousIndex) {
        if (index === 0) {
            return true;
        }
        var isMonday = false;
        var labelsCount = 30;
        if (axis.labels.length >= labelsCount) {
            var previousDay = new Date(previousDate);
            var currentday = new Date(currentDate);
            previousDay.setDate(previousDay.getDate() - previousDay.getDay());
            currentday.setDate(currentday.getDate() - currentday.getDay());
            isMonday = !(previousDay.getTime() === currentday.getTime()) && this.isMaximum(index, previousIndex, axis);
        }
        else {
            isMonday = this.isMaximum(index, previousIndex, axis);
        }
        return isMonday;
    };
    /**
     * To check whether the distance between labels is above the axisLabel maximum length.
     *
     * @param {number} index - The current index.
     * @param {number} previousIndex - The previous index.
     * @param {Axis} axis - The axis.
     * @returns {boolean} - Indicates if the distance between labels exceeds the maximum length.
     * @private
     */
    DateTimeCategory.prototype.isMaximum = function (index, previousIndex, axis) {
        if (index === 0) {
            return true;
        }
        var axisLabelMaximumLength = 100;
        var pointX = valueToCoefficient(index, axis) * axis.rect.width;
        var previousPointX = valueToCoefficient(previousIndex, axis) * axis.rect.width;
        return (pointX - previousPointX >= (axis.labels.length >= 15 ? axisLabelMaximumLength : axisLabelMaximumLength / 2));
    };
    /**
     * Get module name.
     *
     * @returns {string} - Returns the module name.
     */
    DateTimeCategory.prototype.getModuleName = function () {
        /**
         * Returns the module name
         */
        return 'DateTimeCategory';
    };
    /**
     * To destroy the category axis.
     *
     * @returns {void}
     * @private
     */
    DateTimeCategory.prototype.destroy = function () {
        /**
         * Destroy method performed here
         */
    };
    return DateTimeCategory;
}(Category));
export { DateTimeCategory };
