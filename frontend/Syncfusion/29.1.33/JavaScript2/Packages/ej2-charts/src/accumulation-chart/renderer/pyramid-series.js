/**
 * Defines the behavior of a pyramid series
 */
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
import { removeElement } from '@syncfusion/ej2-svg-base';
import { appendChildElement } from '../../common/utils/helper';
import { TriangularBase } from './triangular-base';
/**
 * The `PyramidSeries` module is used to render the `Pyramid` series.
 */
var PyramidSeries = /** @class */ (function (_super) {
    __extends(PyramidSeries, _super);
    function PyramidSeries() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Defines the path of a pyramid segment.
     *
     * @param {AccPoints} point - The points to initialize the segment size.
     * @param {AccumulationSeries} series - The series for which to define the path.
     * @param {AccumulationChart} chart - The accumulation chart control.
     * @returns {string} - The path of the pyramid segment.
     */
    PyramidSeries.prototype.getSegmentData = function (point, series, chart) {
        var area = series.triangleSize;
        //top of th series
        var seriesTop = chart.initialClipRect.y + (chart.initialClipRect.height - area.height) / 2;
        //consider, if the point is exploded
        var offset = 0;
        var extraSpace = (chart.initialClipRect.width - series.triangleSize.width) / 2;
        var emptySpaceAtLeft = extraSpace + chart.initialClipRect.x;
        //top and bottom
        var top = point.yRatio;
        var bottom = point.yRatio + point.heightRatio;
        //width of the top and bottom edge
        var topRadius = 0.5 * (1 - point.yRatio);
        var bottomRadius = 0.5 * (1 - bottom);
        top += seriesTop / area.height;
        bottom += seriesTop / area.height;
        var line1 = {
            x: emptySpaceAtLeft + offset + topRadius * area.width,
            y: top * area.height
        };
        var line2 = {
            x: emptySpaceAtLeft + offset + (1 - topRadius) * area.width,
            y: top * area.height
        };
        var line3 = {
            x: emptySpaceAtLeft + offset + (1 - bottomRadius) * area.width,
            y: bottom * area.height
        };
        var line4 = {
            x: emptySpaceAtLeft + offset + bottomRadius * area.width,
            y: bottom * area.height
        };
        var polygon = [line1, line2, line3, line4];
        this.setLabelLocation(series, point, polygon);
        var direction = this.findPath(polygon, point, series);
        return direction;
    };
    /**
     * Initializes the size of the pyramid segments.
     *
     * @private
     * @param {AccPoints[]} points - The points to initialize the segment size.
     * @param {AccumulationSeries} series - The series for which to initialize properties.
     * @returns {void}
     */
    PyramidSeries.prototype.initializeSizeRatio = function (points, series) {
        if (series.pyramidMode === 'Linear') {
            _super.prototype.initializeSizeRatio.call(this, points, series, true);
        }
        else {
            this.calculateSurfaceSegments(series);
        }
    };
    /**
     * Defines the size of the pyramid segments, the surface of that will reflect the values.
     *
     * @param {AccumulationSeries} series - The series for which to initialize properties.
     * @returns {void}
     */
    PyramidSeries.prototype.calculateSurfaceSegments = function (series) {
        var count = series.points.length;
        var sumOfValues = series.sumOfPoints;
        var y = [];
        var height = [];
        var gapRatio = Math.min(0, Math.max(series.gapRatio, 1));
        var gapHeight = series.points.length > 1 ? gapRatio / (count - 1) : 0;
        var preSum = this.getSurfaceHeight(0, sumOfValues);
        var currY = 0;
        for (var i = 0; i < count; i++) {
            if (series.points[i].visible) {
                y[i] = currY;
                height[i] = this.getSurfaceHeight(currY, Math.abs(series.points[i].y));
                currY += height[i] + gapHeight * preSum;
            }
        }
        var coef = 1 / (currY - gapHeight * preSum);
        for (var i = 0; i < count; i++) {
            if (series.points[i].visible) {
                series.points[i].yRatio = coef * y[i];
                series.points[i].heightRatio = coef * height[i];
            }
        }
    };
    /**
     * Finds the height of pyramid segment.
     *
     * @param {number} y - The y-coordinate of the segment's point.
     * @param {number} surface - The surface area of the segment that reflects the values.
     * @returns {number} - The height of the pyramid segment.
     */
    PyramidSeries.prototype.getSurfaceHeight = function (y, surface) {
        var result = this.solveQuadraticEquation(1, 2 * y, -surface);
        return result;
    };
    /**
     * Solves quadratic equation.
     *
     * @param {number} a - Coefficient.
     * @param {number} b - Coefficient.
     * @param {number} c - Coefficient.
     * @returns {number} - The height of the pyramid segment.
     */
    PyramidSeries.prototype.solveQuadraticEquation = function (a, b, c) {
        var root1;
        var root2;
        var d = b * b - 4 * a * c;
        if (d >= 0) {
            var sd = Math.sqrt(d);
            root1 = (-b - sd) / (2 * a);
            root2 = (-b + sd) / (2 * a);
            return Math.max(root1, root2);
        }
        return 0;
    };
    /**
     * Renders a pyramid segment.
     *
     * @param {AccPoints} point - The point data.
     * @param {AccumulationSeries} series - The series of the chart.
     * @param {AccumulationChart} chart - The accumulation chart control.
     * @param {PathOption} options - The rendering options for the segment.
     * @param {Element} seriesGroup - The group element to contain the segment.
     * @param {boolean} redraw - Specifies whether to redraw the segment.
     * @param {string} previousRadius - Specifies the previous radius of the pie when animating the individual series point.
     * @param {Object[]} previousCenter - Specifies the previous center of the pie when animating the individual series point.
     * @param {boolean} pointAnimation - Specifies whether the point based animation is enabled.
     * @returns {void}
     */
    PyramidSeries.prototype.renderPoint = function (point, series, chart, options, seriesGroup, redraw, previousRadius, previousCenter, pointAnimation) {
        if (!point.visible) {
            removeElement(options.id);
            return null;
        }
        var previousDirection;
        options.d = this.getSegmentData(point, series, chart);
        if (pointAnimation && document.getElementById(options.id)) {
            previousDirection = document.getElementById(options.id).getAttribute('d');
        }
        point.midAngle = 0;
        var element = chart.renderer.drawPath(options);
        element.setAttribute('role', series.accessibility.accessibilityRole ? series.accessibility.accessibilityRole : 'img');
        element.setAttribute('tabindex', (point.index === 0 && series.accessibility.focusable) ? String(series.accessibility.tabIndex) : '-1');
        element.setAttribute('aria-label', series.accessibility.accessibilityDescription ? series.accessibility.accessibilityDescription : (point.x + ': ' + point.y + '%. ' + series.name));
        appendChildElement(false, seriesGroup, element, redraw, pointAnimation ? pointAnimation : undefined, pointAnimation ? 'x' : undefined, pointAnimation ? 'y' : undefined, undefined, pointAnimation ? previousDirection : undefined, undefined, undefined, undefined, pointAnimation ? chart.duration : undefined);
        if (point.isExplode) {
            chart.accBaseModule.explodePoints(point.index, chart, true);
        }
    };
    /**
     * To get the module name of the Pyramid series.
     *
     * @returns {string} - Returns the module name.
     */
    PyramidSeries.prototype.getModuleName = function () {
        return 'PyramidSeries';
    };
    /**
     * To destroy the pyramid series.
     *
     * @returns {void}
     * @private
     */
    PyramidSeries.prototype.destroy = function () {
        /**
         * Destroys the pyramid series.
         */
    };
    return PyramidSeries;
}(TriangularBase));
export { PyramidSeries };
