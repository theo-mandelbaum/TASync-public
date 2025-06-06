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
import { Category3D } from '../axis/category-axis';
import { triggerLabelRender, withIn } from '../../common/utils/helper';
import { firstToLowerCase } from '../../common/utils/helper';
import { extend, getValue } from '@syncfusion/ej2-base';
/**
 * The DatetimeCategory module is used to render date time category axis.
 */
var DateTimeCategory3D = /** @class */ (function (_super) {
    __extends(DateTimeCategory3D, _super);
    /**
     * Constructor for the category module.
     *
     * @param {Chart3D} chart - Chart3D instance.
     * @private
     */
    function DateTimeCategory3D(chart) {
        return _super.call(this, chart) || this;
    }
    /**
     * Calculates the range and interval for the specified axis based on the provided size.
     *
     * @param {Size} size - The size of the chart area used for range and interval calculation.
     * @param {Chart3DAxis} axis - The axis for which the range and interval are calculated.
     * @returns {void}
     */
    DateTimeCategory3D.prototype.calculateRangeAndInterval = function (size, axis) {
        this.axisSize = size;
        this.calculateRange(axis);
        this.getActualRange(axis, size);
        this.applyRangePadding(axis, size);
        this.calculateVisibleLabels(axis);
    };
    /**
     * Calculates and updates the visible labels for the specified axis.
     *
     * @param {Chart3DAxis} axis - The axis for which visible labels are calculated.
     * @returns {void}
     */
    DateTimeCategory3D.prototype.calculateVisibleLabels = function (axis) {
        /** Generate axis labels */
        axis.visibleLabels = [];
        var labelStyle;
        var padding = 0;
        if (axis.intervalType === 'Auto') {
            this.calculateDateTimeNiceInterval(axis, this.axisSize, parseInt(axis.labels[0], 10), parseInt(axis.labels[axis.labels.length - 1], 10));
        }
        else {
            axis.actualIntervalType = axis.intervalType;
        }
        axis.format = this.chart.intl.getDateFormat({
            format: axis.labelFormat || '', type: firstToLowerCase(axis.skeletonType),
            skeleton: this.getSkeleton(axis)
        });
        var i = 0;
        for (; i < axis.labels.length; i++) {
            labelStyle = (extend({}, getValue('properties', axis.labelStyle), null, true));
            if (!this.sameInterval(axis.labels.map(Number)[i], axis.labels.map(Number)[i - 1], axis.actualIntervalType, i)
                || axis.isIndexed) {
                if (withIn(i - padding, axis.visibleRange)) {
                    triggerLabelRender(this.chart, i, (axis.isIndexed ? this.getIndexedAxisLabel(axis.labels[i], axis.format) :
                        axis.format(new Date(axis.labels.map(Number)[i]))), labelStyle, axis);
                }
            }
        }
        if (axis.getMaxLabelWidth) {
            axis.getMaxLabelWidth(this.chart);
        }
    };
    /**
     * To get the indexed axis label text with format for DateTimeCategory axis.
     *
     * @param {string} value value
     * @param {Function} format format
     * @returns {string} Indexed axis label text
     */
    DateTimeCategory3D.prototype.getIndexedAxisLabel = function (value, format) {
        var texts = value.split(',');
        for (var i = 0; i < texts.length; i++) {
            texts[i] = format(new Date(parseInt(texts[i], 10)));
        }
        return texts.join(', ');
    };
    /**
     * Checks whether two dates have the same interval value of the specified type at the given index.
     *
     * @param {number} currentDate - The current date to be compared.
     * @param {number} previousDate - The previous date to be compared.
     * @param {IntervalType} type - The type of interval (year, month, day, etc.).
     * @param {number} index - The index within the interval.
     * @returns {boolean} - True if the two dates have the same interval value; otherwise, false.
     */
    DateTimeCategory3D.prototype.sameInterval = function (currentDate, previousDate, type, index) {
        var sameValue;
        if (index === 0) {
            sameValue = false;
        }
        else {
            switch (type) {
                case 'Years':
                    sameValue = new Date(currentDate).getFullYear() === new Date(previousDate).getFullYear();
                    break;
                case 'Months':
                    sameValue = new Date(currentDate).getFullYear() === new Date(previousDate).getFullYear() &&
                        new Date(currentDate).getMonth() === new Date(previousDate).getMonth();
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
     * Get module name.
     *
     * @returns {string} - Returns the module name
     */
    DateTimeCategory3D.prototype.getModuleName = function () {
        /**
         * Returns the module name
         */
        return 'DateTimeCategory3D';
    };
    /**
     * To destroy the datetime category axis.
     *
     * @returns {void}
     * @private
     */
    DateTimeCategory3D.prototype.destroy = function () {
        /**
         * Destroy method performed here
         */
    };
    return DateTimeCategory3D;
}(Category3D));
export { DateTimeCategory3D };
