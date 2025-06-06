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
import { withInRange, sum, appendChildElement, getElement } from '../../common/utils/helper';
import { getSaturationColor, getPoint } from '../../common/utils/helper';
import { Size, PathOption } from '@syncfusion/ej2-svg-base';
import { isNullOrUndefined } from '@syncfusion/ej2-base';
import { ColumnBase } from './column-base';
import { getMedian } from '../../common/utils/helper';
/**
 * The `BoxAndWhiskerSeries` module is used to render the box and whisker series.
 */
var BoxAndWhiskerSeries = /** @class */ (function (_super) {
    __extends(BoxAndWhiskerSeries, _super);
    function BoxAndWhiskerSeries() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Renders the BoxAndWhisker series on the chart.
     *
     * @param {Series} series - The series to be rendered.
     * @param {Axis} xAxis - The X-axis associated with the series.
     * @param {Axis} yAxis - The Y-axis associated with the series.
     * @param {boolean} isInverted - Indicates whether the chart is inverted or not.
     * @returns {void}
     * @private
     */
    BoxAndWhiskerSeries.prototype.render = function (series, xAxis, yAxis, isInverted) {
        this.sideBySideInfo = this.getSideBySideInfo(series);
        var argsData;
        for (var _i = 0, _a = series.points; _i < _a.length; _i++) {
            var point = _a[_i];
            this.renderPoint(series, point, this.sideBySideInfo, argsData, xAxis, yAxis, isInverted);
        }
        if (series.marker.visible) {
            series.chart.markerRender.render(series);
        }
    };
    /**
     * update the tip region fo box plot
     *
     * @param {Series} series series
     * @param {Points} point point
     * @param {DoubleRange} sideBySideInfo sideBySideInfo
     * @returns {void}
     */
    BoxAndWhiskerSeries.prototype.updateTipRegion = function (series, point, sideBySideInfo) {
        var tipRegion = this.getRectangle((point.xValue + sideBySideInfo.median), point.maximum, (point.xValue + sideBySideInfo.median), point.minimum, series);
        this.updateTipSize(series, point, tipRegion, series.chart.requireInvertedAxis);
    };
    /**
     * Update tip size to tip regions
     *
     * @param {Series} series Series
     * @param {Points} point Points
     * @param {Rect} region rect region
     * @param {boolean} isInverted isInverted
     * @returns {void}
     */
    BoxAndWhiskerSeries.prototype.updateTipSize = function (series, point, region, isInverted) {
        var borderWidth = series.border.width || 1;
        if (!isInverted) {
            region.x -= borderWidth / 2;
            region.width = region.width || borderWidth;
        }
        else {
            region.y -= borderWidth / 2;
            region.height = region.height || borderWidth;
        }
        point.regions.push(region);
    };
    BoxAndWhiskerSeries.prototype.renderPoint = function (series, point, sideBySideInfo, argsData, xAxis, yAxis, isInverted) {
        point.symbolLocations = [];
        point.regions = [];
        var centerRegion;
        if (point.visible && withInRange(series.points[point.index - 1], point, series.points[point.index + 1], series)) {
            this.findBoxPlotValues(point.y, point, series.boxPlotMode, series.showOutliers);
            //region to cover the top and bottom ticks
            this.updateTipRegion(series, point, sideBySideInfo);
            //get middle rect
            centerRegion = this.getRectangle((point.xValue + sideBySideInfo.start), point.upperQuartile, (point.xValue + sideBySideInfo.end), point.lowerQuartile, series);
            point.regions.push(centerRegion);
            argsData = this.triggerEvent(series, point, series.interior, {
                color: (!isNullOrUndefined(series.border.color) && series.border.color !== 'transparent') ? series.border.color :
                    getSaturationColor(series.interior, -0.6),
                width: series.border.width ? series.border.width : 1
            });
            if (!argsData.cancel) {
                this.renderBoxAndWhisker(series, point, argsData, this.getPathString(point, series, getPoint(point.xValue, point.median, xAxis, yAxis, isInverted), getPoint(point.xValue + sideBySideInfo.median, point.average, xAxis, yAxis, isInverted)), sideBySideInfo.median);
            }
        }
    };
    /**
     * Updates the direction of rendering for the specified series.
     *
     * @param {Series} series - The series to be rendered.
     * @param {number[]} point - The point to be updated.
     * @param {boolean} isInverted - Specifies the inverted axis.
     * @returns {void}
     * @private
     */
    BoxAndWhiskerSeries.prototype.updateDirection = function (series, point, isInverted) {
        var argsData;
        for (var i = 0; i < point.length; i++) {
            var visiblePoint = series.points[point[i]];
            this.renderPoint(series, visiblePoint, this.sideBySideInfo, argsData, series.xAxis, series.yAxis, isInverted);
            if (visiblePoint.symbolLocations && visiblePoint.symbolLocations.length && series.marker.visible) {
                series.chart.markerRender.renderMarker(series, visiblePoint, visiblePoint.symbolLocations[0], visiblePoint.symbolLocations.length - 1, true);
            }
            if (series.marker.dataLabel.visible && series.chart.dataLabelModule) {
                series.chart.dataLabelCollections = [];
                series.chart.dataLabelModule.commonId = series.chart.element.id + '_Series_' + series.index + '_Point_';
                if (visiblePoint.outliers.length === 0) {
                    var element = getElement(series.chart.dataLabelModule.commonId + visiblePoint.index + '_Text_' + 5);
                    if (element) {
                        element.remove();
                    }
                }
                series.chart.dataLabelModule.renderDataLabel(series, visiblePoint, null, series.marker.dataLabel);
            }
        }
        var children = series.seriesElement.children;
        for (var i = children.length - 1; i >= 0; i--) {
            if (children[i].children.length === 0) {
                series.seriesElement.removeChild(children[i]);
            }
        }
    };
    /**
     * Calculation for path direction performed here.
     *
     * @param {Points} point point
     * @param {Series} series series
     * @param {ChartLocation} median median
     * @param {ChartLocation} average average
     * @returns {string} direction
     * @private
     */
    BoxAndWhiskerSeries.prototype.getPathString = function (point, series, median, average) {
        var topRect = point.regions[0];
        var midRect = point.regions[1];
        var direction = '';
        var center = series.chart.requireInvertedAxis ? topRect.y + topRect.height / 2 :
            topRect.x + topRect.width / 2;
        var midWidth = midRect.x + midRect.width;
        var midHeight = midRect.y + midRect.height;
        var topWidth = topRect.x + topRect.width;
        var topHeight = topRect.y + topRect.height;
        if (!series.chart.requireInvertedAxis) {
            this.updateTipSize(series, point, { x: midRect.x, y: topRect.y, width: midWidth - midRect.x, height: 0 }, true);
            this.updateTipSize(series, point, { x: midRect.x, y: topHeight, width: midWidth - midRect.x, height: 0 }, true);
            direction += 'M ' + midRect.x + ' ' + topRect.y + ' ' + 'L ' + midWidth + ' ' + topRect.y;
            direction += ' M ' + center + ' ' + topRect.y + ' ' + 'L ' + center + ' ' + midRect.y;
            direction += ' M ' + midRect.x + ' ' + midRect.y + ' ' + 'L ' + midWidth + ' ' + midRect.y +
                ' L ' + midWidth + ' ' + midHeight + ' L ' + midRect.x + ' ' + midHeight + ' Z';
            direction += ' M ' + center + ' ' + midHeight + ' L ' + center + ' ' + topHeight;
            direction += ' M ' + midRect.x + ' ' + topHeight + ' L ' + midWidth + ' ' + topHeight;
            direction += ' M ' + midRect.x + ' ' + median.y + ' L ' + midWidth + ' ' + median.y;
            direction += series.showMean ?
                ' M ' + (average.x - 5) + ' ' + (average.y - 5) + ' L ' + (average.x + 5) + ' ' + (average.y + 5) +
                    ' M ' + (average.x + 5) + ' ' + (average.y - 5) + ' L ' + (average.x - 5) + ' ' + (average.y + 5) : '';
        }
        else {
            this.updateTipSize(series, point, { x: topRect.x, y: midRect.y, width: 0, height: midHeight - midRect.y }, false);
            this.updateTipSize(series, point, { x: topWidth, y: midRect.y, width: 0, height: midHeight - midRect.y }, true);
            direction += 'M ' + topRect.x + ' ' + midRect.y + ' L ' + topRect.x + ' ' + midHeight;
            direction += 'M ' + topRect.x + ' ' + center + ' ' + 'L ' + midRect.x + ' ' + center;
            direction += ' M ' + midRect.x + ' ' + midRect.y + ' ' + 'L ' + midWidth + ' ' + midRect.y +
                ' L ' + midWidth + ' ' + midHeight + ' L ' + midRect.x + ' ' + midHeight + ' Z';
            direction += ' M ' + midWidth + ' ' + center + ' L ' + topWidth + ' ' + center;
            direction += ' M ' + topWidth + ' ' + midRect.y + ' L ' + topWidth + ' ' + midHeight;
            direction += ' M ' + median.x + ' ' + midRect.y + ' ' + 'L ' + median.x + ' ' + midHeight;
            direction += series.showMean ?
                'M ' + (average.x + 5) + ' ' + (average.y - 5) + ' L ' + (average.x - 5) + ' ' + (average.y + 5) +
                    'M ' + (average.x - 5) + ' ' + (average.y - 5) + ' L ' + (average.x + 5) + ' ' + (average.y + 5) : '';
        }
        return direction;
    };
    /**
     * Rendering for box and whisker append here.
     *
     * @param {Series} series series
     * @param {Points} point point
     * @param {IPointRenderEventArgs} argsData argsData
     * @param {string} direction path direction
     * @param {number} median median
     * @returns {void}
     * @private
     */
    BoxAndWhiskerSeries.prototype.renderBoxAndWhisker = function (series, point, argsData, direction, median) {
        var location;
        var size;
        var symbolId = series.chart.element.id + '_Series_' + series.index + '_Point_' + ((series.removedPointIndex !== null && series.removedPointIndex <= point.index) ? (point.index + 1) : point.index);
        var previusDirection = getElement(symbolId + '_BoxPath') ? getElement((symbolId + '_BoxPath')).getAttribute('d') : '';
        var element = series.chart.renderer.drawPath(new PathOption(symbolId + '_BoxPath', argsData.fill, argsData.border.width, argsData.border.color, series.opacity, series.border.dashArray, direction), new Int32Array([series.clipRect.x, series.clipRect.y]));
        element.setAttribute('role', 'img');
        element.setAttribute('aria-label', series.accessibility.accessibilityDescriptionFormat ? series.formatAccessibilityDescription(point, series) :
            (point.x.toString() + ':' + point.maximum.toString() + ':' + point.minimum.toString() + ':' + point.lowerQuartile.toString() + ':' + point.upperQuartile.toString()));
        var parentElement = series.chart.renderer.createGroup({
            'id': symbolId
        });
        appendChildElement(series.chart.enableCanvas, parentElement, element, series.chart.redraw, true, null, null, null, previusDirection, null, null, null, series.chart.duration);
        if (series.removedPointIndex !== null && series.removedPointIndex <= point.index) {
            parentElement.id = series.chart.element.id + '_Series_' + series.index + '_Point_' + point.index;
            element.id = series.chart.element.id + '_Series_' + series.index + '_Point_' + point.index + '_BoxPath';
        }
        for (var i = 0; i < point.outliers.length; i++) {
            location = getPoint((point.xValue + median), point.outliers[i], series.xAxis, series.yAxis, series.chart.requireInvertedAxis);
            size = new Size(series.marker.width, series.marker.height);
            point.symbolLocations.push(location);
            this.updateTipSize(series, point, {
                x: location.x - (size.width / 2), y: location.y - (size.height / 2),
                width: size.width, height: size.height
            }, true);
        }
        appendChildElement(series.chart.enableCanvas, series.seriesElement, parentElement, series.chart.redraw, false, null, null, null, null, null, null, null, series.chart.duration, true);
    };
    /**
     * To find the box plot values.
     *
     * @param {number[]} yValues yValues
     * @param {Points} point point
     * @param {BoxPlotMode} mode mode
     * @param {boolean} showOutliers - Specifies to show or hide the outliers in a box-and-whisker series type.
     * @returns {void}
     * @private
     */
    BoxAndWhiskerSeries.prototype.findBoxPlotValues = function (yValues, point, mode, showOutliers) {
        var yCount = yValues.length;
        var quartile = {
            average: sum(yValues) / yCount,
            lowerQuartile: 0, upperQuartile: 0,
            maximum: 0, minimum: 0,
            median: 0, outliers: []
        };
        if (mode === 'Exclusive') {
            quartile.lowerQuartile = this.getExclusiveQuartileValue(yValues, yCount, 0.25);
            quartile.upperQuartile = this.getExclusiveQuartileValue(yValues, yCount, 0.75);
            quartile.median = this.getExclusiveQuartileValue(yValues, yCount, 0.5);
        }
        else if (mode === 'Inclusive') {
            quartile.lowerQuartile = this.getInclusiveQuartileValue(yValues, yCount, 0.25);
            quartile.upperQuartile = this.getInclusiveQuartileValue(yValues, yCount, 0.75);
            quartile.median = this.getInclusiveQuartileValue(yValues, yCount, 0.5);
        }
        else {
            quartile.median = getMedian(yValues);
            this.getQuartileValues(yValues, yCount, quartile);
        }
        this.getMinMaxOutlier(yValues, yCount, quartile, showOutliers);
        point.minimum = quartile.minimum;
        point.maximum = quartile.maximum;
        point.lowerQuartile = quartile.lowerQuartile;
        point.upperQuartile = quartile.upperQuartile;
        point.median = quartile.median;
        point.outliers = quartile.outliers;
        point.average = quartile.average;
    };
    /**
     * to find the exclusive quartile values
     *
     * @param {number[]} yValues yValues
     * @param {number} count count
     * @param {number} percentile percentile
     * @returns {number} exclusive quartile value
     */
    BoxAndWhiskerSeries.prototype.getExclusiveQuartileValue = function (yValues, count, percentile) {
        if (count === 0) {
            return 0;
        }
        else if (count === 1) {
            return yValues[0];
        }
        var value = 0;
        var rank = percentile * (count + 1);
        var integerRank = Math.floor(Math.abs(rank));
        var fractionRank = rank - integerRank;
        if (integerRank === 0) {
            value = yValues[0];
        }
        else if (integerRank > count - 1) {
            value = yValues[count - 1];
        }
        else {
            value = fractionRank * (yValues[integerRank] - yValues[integerRank - 1]) + yValues[integerRank - 1];
        }
        return value;
    };
    /**
     * to find the inclusive quartile values
     *
     * @param {number[]} yValues yValues
     * @param {number} count count
     * @param {number} percentile percentile
     * @returns {number} inclusive quartile value
     */
    BoxAndWhiskerSeries.prototype.getInclusiveQuartileValue = function (yValues, count, percentile) {
        if (count === 0) {
            return 0;
        }
        else if (count === 1) {
            return yValues[0];
        }
        var value = 0;
        var rank = percentile * (count - 1);
        var integerRank = Math.floor(Math.abs(rank));
        var fractionRank = rank - integerRank;
        value = fractionRank * (yValues[integerRank + 1] - yValues[integerRank]) + yValues[integerRank];
        return value;
    };
    /**
     * To find the quartile values
     *
     * @param {number[]} yValues yValues
     * @param {number} count count
     * @param {IBoxPlotQuartile} quartile quartile
     * @returns {void}
     */
    BoxAndWhiskerSeries.prototype.getQuartileValues = function (yValues, count, quartile) {
        if (count === 1) {
            quartile.lowerQuartile = yValues[0];
            quartile.upperQuartile = yValues[0];
            return null;
        }
        var isEvenList = count % 2 === 0;
        var halfLength = count / 2;
        var lowerQuartileArray = yValues.slice(0, halfLength);
        var upperQuartileArray = yValues.slice(isEvenList ? halfLength : halfLength + 1, count);
        quartile.lowerQuartile = getMedian(lowerQuartileArray);
        quartile.upperQuartile = getMedian(upperQuartileArray);
    };
    /**
     * To find the min, max and outlier values
     *
     * @param {number[]} yValues yValues
     * @param {number} count count
     * @param {IBoxPlotQuartile} quartile quartile
     * @param {boolean} showOutliers - Specifies to show or hide the outliers in a box-and-whisker series type.
     * @returns {void}
     */
    BoxAndWhiskerSeries.prototype.getMinMaxOutlier = function (yValues, count, quartile, showOutliers) {
        var interquartile = quartile.upperQuartile - quartile.lowerQuartile;
        var rangeIQR = 1.5 * interquartile;
        for (var i = 0; i < count; i++) {
            if ((yValues[i] < quartile.lowerQuartile - rangeIQR) && showOutliers) {
                quartile.outliers.push(yValues[i]);
            }
            else {
                quartile.minimum = yValues[i];
                break;
            }
        }
        for (var i = count - 1; i >= 0; i--) {
            if ((yValues[i] > quartile.upperQuartile + rangeIQR) && showOutliers) {
                quartile.outliers.push(yValues[i]);
            }
            else {
                quartile.maximum = yValues[i];
                break;
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
    BoxAndWhiskerSeries.prototype.doAnimation = function (series) {
        this.animate(series);
    };
    /**
     * Get module name.
     *
     * @returns {string} module name
     */
    BoxAndWhiskerSeries.prototype.getModuleName = function () {
        return 'BoxAndWhiskerSeries';
        /**
         * return the module name
         */
    };
    /**
     * To destroy the candle series.
     *
     * @returns {void}
     * @private
     */
    BoxAndWhiskerSeries.prototype.destroy = function () {
        /**
         * Destroys the candle series.
         */
    };
    return BoxAndWhiskerSeries;
}(ColumnBase));
export { BoxAndWhiskerSeries };
