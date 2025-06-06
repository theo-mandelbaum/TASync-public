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
import { getPoint, withInRange, ChartLocation, TransformToVisible } from '../../common/utils/helper';
import { PathOption } from '@syncfusion/ej2-svg-base';
import { MultiColoredSeries } from './multi-colored-base';
/**
 * The `AreaSeries` module is used to render the area series.
 */
var AreaSeries = /** @class */ (function (_super) {
    __extends(AreaSeries, _super);
    function AreaSeries() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Renders the area series on the chart.
     *
     * @param {Series} series - The series to be rendered.
     * @param {Axis} xAxis - The X-axis associated with the series.
     * @param {Axis} yAxis - The Y-axis associated with the series.
     * @param {boolean} isInverted - Indicates whether the chart is inverted or not.
     * @param {boolean} pointAnimate - Specifies whether the point has to be animated or not.
     * @param {boolean} pointUpdate - Specifies whether the point has to be updated or not.
     * @returns {void}
     * @private
     */
    AreaSeries.prototype.render = function (series, xAxis, yAxis, isInverted, pointAnimate, pointUpdate) {
        var startPoint = null;
        var direction = '';
        var isPolar = (series.chart && series.chart.chartAreaType === 'PolarRadar');
        var origin = Math.max(series.yAxis.visibleRange.min, 0);
        if (isPolar) {
            var connectPoints = this.getFirstLastVisiblePoint(series.points);
            origin = connectPoints.first.yValue;
        }
        var currentXValue;
        var isDropMode = (series.emptyPointSettings && series.emptyPointSettings.mode === 'Drop');
        var borderWidth = series.border.width ? series.border.width : 0;
        var borderColor = series.border.color ? series.border.color : series.interior;
        var getCoordinate = series.chart.chartAreaType === 'PolarRadar' ? TransformToVisible : getPoint;
        var visiblePoints = this.enableComplexProperty(series);
        var point;
        var emptyPointDirection = '';
        for (var i = 0; i < visiblePoints.length; i++) {
            point = visiblePoints[i];
            currentXValue = point.xValue;
            point.symbolLocations = [];
            point.regions = [];
            if (point.visible && withInRange(visiblePoints[i - 1], point, visiblePoints[i + 1], series)) {
                direction += this.getAreaPathDirection(currentXValue, origin, series, isInverted, getCoordinate, startPoint, 'M');
                startPoint = startPoint || new ChartLocation(currentXValue, origin);
                // First Point to draw the area path
                direction += this.getAreaPathDirection(currentXValue, point.yValue, series, isInverted, getCoordinate, null, 'L');
                if (visiblePoints[i + 1] && (!visiblePoints[i + 1].visible &&
                    (!isPolar || (isPolar && this.withinYRange(visiblePoints[i + 1], yAxis)))) && !isDropMode) {
                    direction += this.getAreaEmptyDirection({ 'x': currentXValue, 'y': origin }, startPoint, series, isInverted, getCoordinate);
                    startPoint = null;
                }
                this.storePointLocation(point, series, isInverted, getCoordinate);
            }
        }
        if (isPolar && direction !== '') {
            var endPoint = '';
            var chart = this.chart;
            endPoint += this.getAreaPathDirection(0, origin, series, isInverted, getCoordinate, null, 'L');
            if (xAxis.isAxisInverse || yAxis.isAxisInverse) {
                direction += (series.type === 'Polar' ? chart.polarSeriesModule.getPolarIsInversedPath(xAxis, endPoint) :
                    chart.radarSeriesModule.getRadarIsInversedPath(xAxis, endPoint));
            }
            direction = direction.concat(direction + ' ' + 'Z');
        }
        this[pointAnimate ? 'addAreaPath' : 'appendLinePath'](new PathOption(series.chart.element.id + '_Series_' + series.index, series.interior, 0, 'transparent', series.opacity, series.dashArray, ((direction !== '') ? (direction + this.getAreaPathDirection(series.points[series.points.length - 1].xValue, series.chart.chartAreaType === 'PolarRadar' ?
            series.points[series.points.length - 1].yValue : origin, series, isInverted, getCoordinate, null, 'L')) : '')), series, '');
        /**
         * To draw border for the path directions of area
         */
        if (series.border.width !== 0) {
            emptyPointDirection = this.removeEmptyPointsBorder(direction);
            this[pointAnimate ? 'addAreaPath' : 'appendLinePath'](new PathOption(series.chart.element.id + '_Series_border_' + series.index, 'transparent', borderWidth, borderColor, 1, series.border.dashArray, emptyPointDirection), series, '');
        }
        if (!pointUpdate) {
            this.renderMarker(series);
        }
    };
    /**
     * To animate point for area series.
     *
     * @param {Series} series - Specifies the series.
     * @param {number} point - Specifies the point.
     * @returns {void}
     * @private
     */
    AreaSeries.prototype.updateDirection = function (series, point) {
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
     * To destroy the area series.
     *
     * @returns {void}
     * @private
     */
    AreaSeries.prototype.destroy = function () {
        /**
         * Destroy method calling here.
         */
    };
    /**
     * Get module name.
     *
     * @returns {string} - Returns the module name.
     */
    AreaSeries.prototype.getModuleName = function () {
        /**
         * Returns the module name of the series.
         */
        return 'AreaSeries';
    };
    /**
     * Animates the series.
     *
     * @param  {Series} series - Defines the series to animate.
     * @returns {void}
     * @private
     */
    AreaSeries.prototype.doAnimation = function (series) {
        var option = series.animation;
        this.doLinearAnimation(series, option);
    };
    return AreaSeries;
}(MultiColoredSeries));
export { AreaSeries };
