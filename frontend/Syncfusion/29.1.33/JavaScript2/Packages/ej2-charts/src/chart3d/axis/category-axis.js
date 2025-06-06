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
import { getActualDesiredIntervalsCount, triggerLabelRender } from '../../common/utils/helper';
import { DoubleRange } from '../utils/doubleRange';
import { withIn } from '../../common/utils/helper';
import { extend, getValue } from '@syncfusion/ej2-base';
import { NiceIntervals } from '../axis/axis-helper';
/**
 * The `Category` module is used to render category axis.
 */
var Category3D = /** @class */ (function (_super) {
    __extends(Category3D, _super);
    /**
     * Constructor for the category module.
     *
     * @param {Chart3D} chart - Chart instance.
     * @private
     */
    function Category3D(chart) {
        return _super.call(this, chart) || this;
    }
    /**
     * Calculates the range and interval for the specified axis based on the provided size.
     *
     * @param {Size} size - The size of the chart area used for range and interval calculation.
     * @param {Chart3DAxis} axis - The axis for which the range and interval are calculated.
     * @returns {void}
     * @private
     */
    Category3D.prototype.calculateRangeAndInterval = function (size, axis) {
        this.calculateRange(axis);
        this.getActualRange(axis, size);
        this.applyRangePadding(axis, size);
        this.calculateVisibleLabels(axis);
    };
    /**
     * Retrieves the actual range for the specified axis based on the provided size.
     *
     * @param {Chart3DAxis} axis - The axis for which the actual range is calculated.
     * @param {Size} size - The size of the chart area used in the range calculation.
     * @returns {void}
     */
    Category3D.prototype.getActualRange = function (axis, size) {
        this.initializeDoubleRange(axis);
        axis.actualRange = {};
        if (!axis.interval) {
            axis.actualRange.interval = Math.max(1, Math.floor(axis.doubleRange.delta / getActualDesiredIntervalsCount(size, axis)));
        }
        else {
            axis.actualRange.interval = Math.ceil(axis.interval);
        }
        axis.actualRange.min = axis.doubleRange.start;
        axis.actualRange.max = axis.doubleRange.end;
        axis.actualRange.delta = axis.doubleRange.delta;
    };
    /**
     * Applies range padding to the specified axis based on the provided size.
     *
     * @param {Chart3DAxis} axis - The axis to which range padding is applied.
     * @param {Size} size - The size of the chart area used in the padding calculation.
     * @returns {void}
     */
    Category3D.prototype.applyRangePadding = function (axis, size) {
        var ticks = 0.5;
        axis.actualRange.min -= ticks;
        axis.actualRange.max += ticks;
        axis.doubleRange = new DoubleRange(axis.actualRange.min, axis.actualRange.max);
        axis.actualRange.delta = axis.doubleRange.delta;
        this.calculateVisibleRange(size, axis);
    };
    /**
     * Calculate visible labels for the axis based on the range calculated.
     *
     * @param {Chart3DAxis} axis - The axis for which the labels are calculated.
     * @returns {void}
     * @private
     */
    Category3D.prototype.calculateVisibleLabels = function (axis) {
        /** Generate axis labels */
        axis.visibleLabels = [];
        axis.visibleRange.interval = axis.visibleRange.interval < 1 ? 1 : axis.visibleRange.interval;
        var tempInterval = Math.ceil(axis.visibleRange.min);
        var labelStyle;
        var position;
        axis.startLabel = axis.labels[Math.round(axis.visibleRange.min)];
        axis.endLabel = axis.labels[Math.floor(axis.visibleRange.max)];
        for (; tempInterval <= axis.visibleRange.max; tempInterval += axis.visibleRange.interval) {
            labelStyle = (extend({}, getValue('properties', axis.labelStyle), null, true));
            if (withIn(tempInterval, axis.visibleRange) && axis.labels.length > 0) {
                position = Math.round(tempInterval);
                triggerLabelRender(this.chart, position, axis.labels[position] ? axis.labels[position].toString() : position.toString(), labelStyle, axis);
            }
        }
        if (axis.getMaxLabelWidth) {
            axis.getMaxLabelWidth(this.chart);
        }
    };
    /**
     * Get module name
     *
     * @returns {string} - Returns the module name
     */
    Category3D.prototype.getModuleName = function () {
        /**
         * Returns the module name
         */
        return 'Category3D';
    };
    /**
     * To destroy the category axis.
     *
     * @returns {void}
     * @private
     */
    Category3D.prototype.destroy = function () {
        /**
         * Destroy method performed here
         */
    };
    return Category3D;
}(NiceIntervals));
export { Category3D };
