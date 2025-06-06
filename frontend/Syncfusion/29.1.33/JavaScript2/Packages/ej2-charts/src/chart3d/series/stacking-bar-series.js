import { pointRender } from '../../common/model/constants';
var StackingBarSeries3D = /** @class */ (function () {
    function StackingBarSeries3D() {
    }
    /**
     * Draws the stacking bar series on a 3D chart.
     *
     * @param {Chart3DSeries} series - The 3D series to be drawn.
     * @param {Chart3D} chart - The 3D chart on which the series will be drawn.
     * @returns {void}
     */
    StackingBarSeries3D.prototype.draw = function (series, chart) {
        this.createSegments(series);
        series.isRectSeries = true;
        for (var i = 0; i < series.visiblePoints.length; i++) {
            var point = series.visiblePoints[i];
            if (point.visible) {
                var argsData = {
                    cancel: false, series: series, point: point,
                    fill: series.setPointColor(point, series.interior)
                };
                chart.trigger(pointRender, argsData);
                point.color = argsData.fill;
                point.plans = null;
                if (!argsData.cancel) {
                    this.update(argsData.series, argsData.point, i, chart);
                }
                else {
                    point.symbolLocations = null;
                }
            }
        }
    };
    /**
     * Updates a specific point in a stacking bar series on a 3D chart.
     *
     * @param {Chart3DSeries} series - The 3D series to which the point belongs.
     * @param {Chart3DPoint} point - The point to be updated.
     * @param {number} pointIndex - The index of the point within the series.
     * @param {Chart3D} chart - The 3D chart to which the series and point belong.
     * @returns {void}
     */
    StackingBarSeries3D.prototype.update = function (series, point, pointIndex, chart) {
        var seriesIndex = series.index;
        var left = point.left;
        var right = point.right;
        var bottom = series.yAxis.valueType === 'Logarithmic' ? Math.pow(series.yAxis.logBase, series.yAxis.visibleRange.min) : series.yAxis.visibleRange.min;
        var top = series.yAxis.valueType === 'Logarithmic' ? Math.pow(series.yAxis.logBase, series.yAxis.visibleRange.max) : series.yAxis.visibleRange.max;
        var xStart = series.xAxis.visibleRange.min;
        var xEnd = series.xAxis.visibleRange.max;
        if (!((left >= xStart) && (left <= xEnd)) || !((right >= xStart) && (right <= xEnd))) {
            return;
        }
        var topValue;
        if (point.top < 0) {
            topValue = (point.top > bottom) ? point.top : bottom;
        }
        else {
            topValue = (series.yAxis.valueType && series.yAxis.valueType.toLowerCase() === 'logarithmic') ? point.top : (point.top < top) ? point.top : top;
        }
        var tlpoint = chart.svg3DRenderer.transform3DToVisible(series, (point.left > xStart) ? point.left :
            xStart, topValue, chart);
        var rbpoint = chart.svg3DRenderer.transform3DToVisible(series, (xEnd > point.right) ? point.right :
            xEnd, (bottom > point.bottom) ? bottom : point.bottom, chart);
        var tlfVector = chart.vector.vector3D(Math.min(tlpoint.x, rbpoint.x), Math.min(tlpoint.y, rbpoint.y), point.startDepth);
        var brbVector = chart.vector.vector3D(Math.max(tlpoint.x, rbpoint.x), Math.max(tlpoint.y, rbpoint.y), point.endDepth);
        var styleOptions = series.setStyle(series);
        var name = 'region' + '-series-' + seriesIndex + '-point-' + pointIndex;
        if (series.columnFacet === 'Cylinder') {
            chart.polygon.createCylinder(tlfVector, brbVector, chart, pointIndex, series.type, '', point.color, null, styleOptions.opacity, name, chart.chart3D);
        }
        else if (series.columnFacet === 'Rectangle') {
            chart.polygon.createBox(tlfVector, brbVector, chart, pointIndex, '', point.color, null, styleOptions.opacity, chart.requireInvertedAxis, name, chart.chart3D);
        }
    };
    /**
     * Creates segments for a stacking bar series within a 3D chart.
     *
     * @param {Chart3DSeries} series - The 3D series for which segments will be created.
     * @returns {void}
     */
    StackingBarSeries3D.prototype.createSegments = function (series) {
        var xValues = series.getXValues(series.visiblePoints);
        if (xValues == null) {
            return;
        }
        var sbsInfo = series.getSideBySideInfo(series);
        var depthInfo = series.getSegmentDepth(series);
        var median = sbsInfo.delta / 2;
        var visiblePoints = series.visiblePoints;
        var cons = 0.2;
        for (var i = 0; i < visiblePoints.length; i++) {
            var x1 = xValues[i] + sbsInfo.start;
            var x2 = xValues[i] + sbsInfo.end;
            var y2 = series.stackedValues.startValues[i];
            var y1 = series.stackedValues.endValues[i];
            this.setData(x1, y1, x2, y2, depthInfo.start, depthInfo.end, series, visiblePoints[i]);
            if (!series.dataLabel.visible) {
                continue;
            }
            visiblePoints[i].symbolLocations = { x: 0, y: 0, z: 0 };
            switch (series.dataLabel.position) {
                case 'Top':
                    visiblePoints[i].symbolLocations.x = x1 + median;
                    visiblePoints[i].symbolLocations.y = y1;
                    visiblePoints[i].symbolLocations.z = depthInfo.start + (depthInfo.delta / 2);
                    break;
                case 'Bottom':
                    visiblePoints[i].symbolLocations.x = x1 + median;
                    visiblePoints[i].symbolLocations.y = y2 - cons;
                    visiblePoints[i].symbolLocations.z = depthInfo.start + (depthInfo.end - depthInfo.start) / 2;
                    break;
                default:
                    visiblePoints[i].symbolLocations.x = x1 + median;
                    visiblePoints[i].symbolLocations.y = y1 + (y2 - y1) / 2;
                    visiblePoints[i].symbolLocations.z = depthInfo.start;
                    break;
            }
        }
    };
    /**
     * Sets data for a stacking bar series in a 3D chart.
     *
     * @param {number} x1 - The x-coordinate of the starting point of the segment.
     * @param {number} y1 - The y-coordinate of the starting point of the segment.
     * @param {number} x2 - The x-coordinate of the ending point of the segment.
     * @param {number} y2 - The y-coordinate of the ending point of the segment.
     * @param {number} start - The starting value of the segment on the axis.
     * @param {number} end - The ending value of the segment on the axis.
     * @param {Chart3DSeries} series - The 3D series to which the segment belongs.
     * @param {Chart3DPoint} point - The point associated with the segment.
     * @returns {void}
     */
    StackingBarSeries3D.prototype.setData = function (x1, y1, x2, y2, start, end, series, point) {
        point.left = x1;
        point.bottom = y2;
        point.top = y1;
        point.right = x2;
        point.startDepth = start;
        point.endDepth = end;
        point.xRange = series.getDoubleRange(point.left, point.right);
        if (!isNaN(point.top) && !isNaN(point.bottom)) {
            point.yRange = series.getDoubleRange(point.top, point.bottom);
        }
    };
    /**
     * To destroy the stacking bar series.
     *
     * @returns {void}
     * @private
     */
    StackingBarSeries3D.prototype.destroy = function () {
        /**
         * Destroy method performed here
         */
    };
    /**
     * Gets the module name for the  Stacking Bar3D series.
     *
     * @returns {void}
     */
    StackingBarSeries3D.prototype.getModuleName = function () {
        return 'StackingBarSeries3D';
        /**
         * return the module name
         */
    };
    return StackingBarSeries3D;
}());
export { StackingBarSeries3D };
