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
import { RectOption, appendChildElement, getElement, appendClipElement } from '../../common/utils/helper';
import { findlElement, drawSymbol, markerAnimate, CircleOption } from '../../common/utils/helper';
import { PathOption, Size } from '@syncfusion/ej2-svg-base';
import { animationMode, isNullOrUndefined } from '@syncfusion/ej2-base';
import { pointRender } from '../../common/model/constants';
import { MarkerExplode } from './marker-explode';
import { getSaturationColor } from '../../common/utils/helper';
export var markerShapes = ['Circle', 'Triangle', 'Diamond', 'Rectangle', 'Pentagon', 'InvertedTriangle', 'VerticalLine', 'Cross', 'Plus', 'HorizontalLine', 'Star'];
/**
 * The `Marker` module is used to render markers for line-type series.
 */
var Marker = /** @class */ (function (_super) {
    __extends(Marker, _super);
    /**
     * Constructor for the marker module.
     *
     * @private
     */
    function Marker(chart) {
        var _this = _super.call(this, chart) || this;
        _this.addEventListener();
        return _this;
    }
    /**
     * Render the marker for series.
     *
     * @returns {void}
     * @private
     */
    Marker.prototype.render = function (series) {
        var _this = this;
        var redraw = series.chart.redraw;
        this.createElement(series, redraw);
        var _loop_1 = function (point) {
            if (point.visible && point.symbolLocations && point.symbolLocations.length) {
                point.symbolLocations.map(function (location, index) {
                    if (series.marker.shape !== 'None') {
                        _this.renderMarker(series, point, location, index, redraw);
                    }
                });
            }
        };
        for (var _i = 0, _a = series.points; _i < _a.length; _i++) {
            var point = _a[_i];
            _loop_1(point);
        }
    };
    Marker.prototype.renderMarker = function (series, point, location, index, redraw) {
        var seriesIndex = series.index === undefined ? series.category : series.index;
        var marker = series.marker;
        series.marker.shape = series.marker.shape ? series.marker.shape : markerShapes[seriesIndex % 10];
        var border = {
            color: marker.border.color,
            width: marker.border.width
        };
        var borderColor = marker.border.color;
        var previousLocation;
        var previousPath;
        var circlePath;
        var shapeOption;
        location.x = location.x + marker.offset.x;
        location.y = location.y - marker.offset.y;
        var isBoxPlot = series.type === 'BoxAndWhisker';
        var fill = marker.fill || ((isBoxPlot || series.marker.isFilled) ? point.interior || series.interior : '#ffffff');
        var markerElement;
        var parentElement = isBoxPlot && !this.chart.enableCanvas ?
            findlElement(series.seriesElement.childNodes, 'Series_' + series.index + '_Point_' + point.index)
            : series.symbolElement;
        border.color = borderColor || series.setPointColor(point, series.interior);
        var symbolId = this.elementId + '_Series_' + seriesIndex + '_Point_' + ((series.removedPointIndex !== null && series.removedPointIndex <= point.index) || this.chart.pointsAdded ?
            (point.index + 1) : point.index) + '_Symbol' + (index ? index : '');
        var argsData = {
            cancel: false, name: pointRender, series: series, point: point,
            fill: point.isEmpty ? (series.emptyPointSettings.fill || fill) : fill,
            border: {
                color: series.type === 'BoxAndWhisker' ?
                    (!isNullOrUndefined(borderColor) && borderColor !== 'transparent') ? borderColor :
                        getSaturationColor(fill, -0.6)
                    : border.color,
                width: border.width
            },
            height: marker.height, width: marker.width, shape: marker.shape
        };
        argsData.border = series.setBorderColor(point, { width: argsData.border.width, color: argsData.border.color });
        if (!series.isRectSeries || series.type === 'BoxAndWhisker') {
            this.chart.trigger(pointRender, argsData);
            point.color = argsData.fill;
        }
        if (!argsData.cancel) {
            var y = void 0;
            if (series.type === 'RangeArea' || series.type === 'RangeColumn' || series.drawType === 'RangeColumn'
                || series.type === 'SplineRangeArea' || series.type === 'RangeStepArea') {
                y = index ? point.low : point.high;
            }
            else if (isBoxPlot) {
                y = point.outliers[index];
            }
            else {
                y = point.y;
            }
            var markerFill = argsData.point.marker.fill || argsData.fill;
            var markerBorder = void 0;
            if (!isNullOrUndefined(argsData.point.marker.border)) {
                markerBorder = {
                    color: argsData.point.marker.border.color || argsData.border.color,
                    width: argsData.point.marker.border.width || argsData.border.width
                };
            }
            else {
                markerBorder = { color: argsData.border.color, width: argsData.border.width };
            }
            var markerWidth = argsData.point.marker.width || argsData.width;
            var markerHeight = argsData.point.marker.height || argsData.height;
            var markerOpacity = argsData.point.marker.opacity || marker.opacity;
            var markerShape = argsData.point.marker.shape || argsData.shape;
            var imageURL = argsData.point.marker.imageUrl || marker.imageUrl;
            shapeOption = new PathOption(symbolId, markerFill, markerBorder.width, markerBorder.color, markerOpacity, series.marker.border.dashArray);
            if ((parentElement !== undefined && parentElement !== null) || this.chart.enableCanvas) {
                if (redraw && getElement(shapeOption.id)) {
                    markerElement = getElement(shapeOption.id);
                    circlePath = markerShape === 'Circle' ? 'c' : '';
                    previousLocation = {
                        x: +markerElement.getAttribute(circlePath + 'x'), y: +markerElement.getAttribute(circlePath + 'y')
                    };
                    previousPath = markerElement.getAttribute('d');
                }
                markerElement = drawSymbol(location, markerShape, new Size(markerWidth, markerHeight), imageURL, shapeOption, point.x.toString() + ':' + y.toString(), this.chart.renderer, series.clipRect);
                if (markerElement) {
                    markerElement.setAttribute('role', 'img');
                    if (series.category === 'TrendLine' && (shapeOption.id === this.elementId + '_Series_0_Point_0_Symbol')) {
                        markerElement.setAttribute('tabindex', '0');
                        markerElement.setAttribute('class', 'e-chart-focused');
                    }
                    markerElement.setAttribute('aria-label', series.accessibility.accessibilityDescriptionFormat ? series.formatAccessibilityDescription(point, series) : (point.x + ': ' + point.y + ', ' + series.name));
                }
                appendChildElement(this.chart.enableCanvas, parentElement, markerElement, redraw, true, circlePath + 'x', circlePath + 'y', previousLocation, previousPath, false, false, null, series.chart.duration);
                if ((series.removedPointIndex !== null && series.removedPointIndex <= point.index)) {
                    parentElement.lastChild.id = this.elementId + '_Series_' + seriesIndex + '_Point_' + point.index + '_Symbol' + (index ? index : '');
                }
            }
            point.marker = {
                border: markerBorder, fill: markerFill, height: markerHeight,
                visible: true, shape: markerShape, width: markerWidth, imageUrl: imageURL
            };
        }
        else {
            location = null;
            point.marker = {
                visible: false
            };
        }
    };
    Marker.prototype.createElement = function (series, redraw) {
        var markerClipRect;
        var marker = series.marker;
        // 8 for extend border value 5 for extend size value
        var explodeValue = marker.border.width + (this.chart.zoomModule &&
            this.chart.zoomModule.isAxisZoomed(this.chart.axisCollections) ? 0 : 8 + 5);
        var render = series.chart.svgRenderer;
        var index = series.index === undefined ? series.category : series.index;
        var options;
        var transform = series.chart.chartAreaType === 'Cartesian' ? 'translate(' + series.clipRect.x + ',' + (series.clipRect.y) + ')' : '';
        if (marker.visible) {
            var markerHeight = (marker.height + explodeValue) / 2;
            var markerWidth = (marker.width + explodeValue) / 2;
            if (series.chart.chartAreaType === 'Cartesian') {
                options = new RectOption(this.elementId + '_ChartMarkerClipRect_' + index, 'transparent', { width: 1, color: 'Gray' }, 1, {
                    x: -markerWidth, y: -markerHeight,
                    width: series.clipRect.width + (markerWidth * 2),
                    height: series.clipRect.height + markerHeight * 2
                }, 0, 0, '', series.marker.border.dashArray);
                markerClipRect = appendClipElement(redraw, options, render);
            }
            else {
                options = new CircleOption(this.elementId + '_ChartMarkerClipRect_' + index, 'transparent', { width: 1, color: 'Gray' }, 1, series.clipRect.width / 2 + series.clipRect.x, series.clipRect.height / 2 + series.clipRect.y, series.chart.radius + Math.max(markerHeight, markerWidth));
                markerClipRect = appendClipElement(redraw, options, render, 'drawCircularClipPath');
            }
            options = {
                'id': this.elementId + 'SymbolGroup' + index,
                'transform': transform,
                'clip-path': 'url(#' + this.elementId + '_ChartMarkerClipRect_' + index + ')'
            };
            series.symbolElement = render.createGroup(options);
            series.symbolElement.appendChild(markerClipRect);
            if (this.chart.enableCanvas) {
                var element = document.getElementById(this.chart.element.id + '_tooltip_svg');
                element.appendChild(series.symbolElement);
            }
        }
    };
    Marker.prototype.getRangeLowPoint = function (region, series) {
        var x = region.x;
        var y = region.y;
        if (series.chart.requireInvertedAxis) {
            y += region.height / 2;
            x += series.yAxis.isAxisInverse ? region.width : 0;
        }
        else {
            y += series.yAxis.isAxisInverse ? 0 : region.height;
            x += region.width / 2;
        }
        return { x: x, y: y };
    };
    /**
     * Calculates the distance between two points in a chart.
     *
     * @param {ChartLocation} startPoint - The starting point with x and y coordinates.
     * @param {ChartLocation} endPoint - The ending point with x and y coordinates.
     * @returns {number} - The distance between the startPoint and endPoint.
     */
    Marker.prototype.calculateDistance = function (startPoint, endPoint) {
        var dx = endPoint.x - startPoint.x;
        var dy = endPoint.y - startPoint.y;
        return Math.sqrt(dx * dx + dy * dy);
    };
    /**
     * Perform marker animation for the given series.
     *
     * @param {Series} series - The series for which marker animation needs to be performed.
     * @returns {void}
     * @private
     */
    Marker.prototype.doMarkerAnimation = function (series) {
        if (!(series.type === 'Scatter' || series.type === 'Bubble' || series.type === 'Candle' || series.type === 'Hilo' ||
            series.type === 'HiloOpenClose' || (series.chart.chartAreaType === 'PolarRadar' && (series.drawType === 'Scatter')))) {
            var markerElements = series.symbolElement.childNodes;
            var delay = series.animation.delay + (series.animation.duration === 0 && animationMode === 'Enable' ? 1000 : series.animation.duration);
            var duration = series.chart.animated ? series.chart.duration : 200;
            var markerDelay = delay;
            var pathLength = series.pathElement ? series.pathElement.getTotalLength() : 0;
            var distances = [];
            for (var i = 1; (series.type === 'Line' && i < series.points.length); i++) {
                if (series.points[i - 1].symbolLocations[0] && series.points[i].symbolLocations[0]) {
                    var distance = this.calculateDistance(series.points[i - 1].symbolLocations[0], series.points[i].symbolLocations[0]);
                    distances.push(distance);
                }
            }
            var j = 1;
            var incFactor = (series.type === 'RangeArea' || series.type === 'RangeColumn' || series.type === 'SplineRangeArea' || series.type === 'RangeStepArea') ? 2 : 1;
            for (var i = 0; i < series.points.length; i++) {
                if (series.points[i].symbolLocations) {
                    if (!series.points[i].symbolLocations.length || !markerElements[j]) {
                        continue;
                    }
                    if (series.type === 'Line') {
                        if (i === 0) {
                            markerDelay = 0;
                        }
                        if (i > 0) {
                            markerDelay += (distances[i - 1] / pathLength) * delay;
                            duration = 0;
                        }
                    }
                    markerAnimate(markerElements[j], markerDelay, duration, series, i, series.points[i].symbolLocations[0], false);
                    if (incFactor === 2) {
                        var lowPoint = this.getRangeLowPoint(series.points[i].regions[0], series);
                        markerAnimate(markerElements[j + 1], markerDelay, duration, series, i, lowPoint, false);
                    }
                    j += incFactor;
                }
            }
        }
    };
    return Marker;
}(MarkerExplode));
export { Marker };
