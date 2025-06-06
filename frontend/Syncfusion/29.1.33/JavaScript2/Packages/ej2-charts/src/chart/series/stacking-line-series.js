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
import { getPoint, withInRange, TransformToVisible } from '../../common/utils/helper';
import { PathOption, Rect } from '@syncfusion/ej2-svg-base';
import { LineBase } from './line-base';
/**
 * The `StackingLineSeries` module is used to render the stacking line series.
 */
var StackingLineSeries = /** @class */ (function (_super) {
    __extends(StackingLineSeries, _super);
    function StackingLineSeries() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Render the Stacking line series.
     *
     * @param {Series} series - The series to be rendered.
     * @param {Axis} xAxis - The x-axis of the chart.
     * @param {Axis} yAxis - The y-axis of the chart.
     * @param {boolean} isInverted - Specifies whether the chart is inverted.
     * @param {boolean} pointAnimate - Specifies whether the point has to be animated or not.
     * @param {boolean} pointUpdate - Specifies whether the point has to be updated or not.
     * @returns {void}
     * @private
     */
    StackingLineSeries.prototype.render = function (series, xAxis, yAxis, isInverted, pointAnimate, pointUpdate) {
        var polarType = series.chart.chartAreaType === 'PolarRadar';
        var getCoordinate = polarType ? TransformToVisible : getPoint;
        var direction = '';
        var visiblePts = this.enableComplexProperty(series);
        var pointsLength = visiblePts.length;
        var stackedvalue = series.stackedValues;
        var pointIndex;
        var nextPointIndex;
        var point1;
        var point2;
        for (var i = 0; i < pointsLength; i++) {
            visiblePts[i].regions = [];
            visiblePts[i].symbolLocations = [];
            pointIndex = visiblePts[i].index;
            if (visiblePts[i].visible && withInRange(visiblePts[i - 1], visiblePts[i], visiblePts[i + 1], series)) {
                point1 = getCoordinate(visiblePts[i].xValue, stackedvalue.endValues[pointIndex], xAxis, yAxis, isInverted, series);
                direction = direction.concat((i ? 'L' : 'M') + ' ' + (point1.x) + ' ' + (point1.y) + ' ');
                visiblePts[i].symbolLocations.push(getCoordinate(visiblePts[i].xValue, stackedvalue.endValues[pointIndex], xAxis, yAxis, isInverted, series));
                visiblePts[i].regions.push(new Rect(visiblePts[i].symbolLocations[0].x - series.marker.width, visiblePts[i].symbolLocations[0].y - series.marker.height, 2 * series.marker.width, 2 * series.marker.height));
            }
            else {
                if (series.emptyPointSettings.mode !== 'Drop') {
                    if (visiblePts[i + 1] && visiblePts[i + 1].visible) {
                        nextPointIndex = visiblePts[i + 1].index;
                        point1 = getCoordinate(visiblePts[i + 1].xValue, stackedvalue.endValues[nextPointIndex], xAxis, yAxis, isInverted, series);
                        direction = direction.concat('M' + ' ' + (point1.x) + ' ' + (point1.y) + ' ');
                    }
                }
            }
        }
        if (series.chart.chartAreaType === 'PolarRadar' && visiblePts.length > 1) {
            point1 = { 'y': stackedvalue.endValues[0], 'x': series.points[0].xValue };
            point2 = getCoordinate(point1.x, point1.y, xAxis, yAxis, isInverted, series);
            direction += ('L' + ' ' + (point2.x) + ' ' + (point2.y) + ' ');
        }
        var options = new PathOption(series.chart.element.id + '_Series_' + series.index, 'none', series.width, series.interior, series.opacity, series.dashArray, direction);
        this[pointAnimate ? 'addPath' : 'appendLinePath'](options, series, '');
        if (!pointUpdate) {
            this.renderMarker(series);
        }
    };
    /**
     * To animate point for stacking line series.
     *
     * @param {Series} series - Specifies the series.
     * @param {number} point - Specifies the point.
     * @returns {void}
     * @private
     */
    StackingLineSeries.prototype.updateDirection = function (series, point) {
        this.render(series, series.xAxis, series.yAxis, series.chart.requireInvertedAxis, false, true);
        for (var i = 0; i < point.length; i++) {
            if (series.marker && series.marker.visible) {
                series.chart.markerRender.renderMarker(series, series.points[point[i]], series.points[point[i]].symbolLocations[0], null, true);
            }
            if (series.marker.dataLabel.visible && series.chart.dataLabelModule) {
                series.chart.dataLabelModule.commonId = series.chart.element.id + '_Series_' + series.index + '_Point_';
                series.chart.dataLabelModule.renderDataLabel(series, series.points[point[i]], null, series.marker.dataLabel);
            }
        }
    };
    /**
     * Animates the series.
     *
     * @param  {Series} series - Defines the series to animate.
     * @returns {void}
     * @private
     */
    StackingLineSeries.prototype.doAnimation = function (series) {
        var option = series.animation;
        this.doLinearAnimation(series, option);
    };
    /**
     * To destroy the stacking line.
     *
     * @returns {void}
     * @private
     */
    StackingLineSeries.prototype.destroy = function () {
        /**
         * Destroy method calling here.
         */
    };
    /**
     * Get module name.
     *
     * @returns {string} - Returns the module name.
     */
    StackingLineSeries.prototype.getModuleName = function () {
        /**
         * Returns the module name of the series.
         */
        return 'StackingLineSeries';
    };
    return StackingLineSeries;
}(LineBase));
export { StackingLineSeries };
