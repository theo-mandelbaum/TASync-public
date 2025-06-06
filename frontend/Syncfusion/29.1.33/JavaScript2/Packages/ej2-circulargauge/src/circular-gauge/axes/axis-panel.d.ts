import { CircularGauge } from '../circular-gauge';
import { Rect } from '../utils/helper-common';
import { Axis } from './axis';
import { ICircularGaugeAnimation } from '../model/interface';
import { PointerRenderer } from './pointer-renderer';
/**
 * Specifies the CircularGauge Axis Layout.
 */
export declare class AxisLayoutPanel {
    private gauge;
    private farSizes;
    private axisRenderer;
    pointerRenderer: PointerRenderer;
    axisOption: ICircularGaugeAnimation[];
    private prevAnimatedMajorTickValue;
    private prevAnimatedMajorTickIndex;
    private prevAnimatedMinorTickValue;
    private prevAnimatedMinorTickIndex;
    private prevAnimatedTickType;
    private allowAxisCount;
    private rangeAnimationCount;
    constructor(gauge: CircularGauge);
    /**
     * Measure the calculate the axis size and radius.
     *
     * @return {void}
     * @private
     */
    measureAxis(rect: Rect): void;
    /**
     * Measure to calculate the axis radius of the circular gauge.
     *
     * @returns {void}
     * @private
     */
    private calculateAxesRadius;
    /**
     * Measure to calculate the axis size.
     *
     * @return {void}
     * @private
     */
    private measureAxisSize;
    /**
     * Calculate the axis values of the circular gauge.
     *
     * @return {void}
     * @private
     */
    private calculateAxisValues;
    /**
     * Calculate the visible range of an axis.
     *
     * @param {Axis} axis - Specifies the axis.
     * @param {Rect} rect - Specifies the rect.
     * @returns {void}
     * @private
     */
    private calculateVisibleRange;
    /**
     * Calculate the numeric intervals of an axis range.
     *
     * @return {void}
     * @private
     */
    private calculateNumericInterval;
    /**
     * Calculate the nice interval of an axis range.
     *
     * @return {void}
     * @private
     */
    private calculateNiceInterval;
    /**
     * Calculate the visible labels of an axis.
     *
     * @return {void}
     * @private
     */
    private calculateVisibleLabels;
    /**
     * Measure the axes available size.
     *
     * @return {void}
     * @private
     */
    private computeSize;
    /**
     * To render the Axis element of the circular gauge.
     *
     * @return {void}
     * @private
     */
    renderAxes(animate?: boolean): void;
    private labelElementAnimation;
    private elementLabelAnimation;
    axisLineCalculation(axisElement: HTMLElement, axis: Axis, value: number, gauge: CircularGauge): void;
    axisLineAnimation(axisIndex: number, duration: number, gauge: CircularGauge): void;
    axisAnimation(axisIndex: number, duration: number, gauge: CircularGauge): void;
    private tickElementAnimation;
    private labelRangeAnimation;
    private rangeAnimation;
    private rangeElementAnimation;
    private durationSplitUp;
    /**
     * Calculate maximum label width for the axis.
     *
     * @param {CircularGauge} gauge - Specifies the instance of the gauge.
     * @param {Axis} axis - Specifies the axis.
     * @returns {void}
     */
    private getMaxLabelWidth;
    destroy(): void;
}
