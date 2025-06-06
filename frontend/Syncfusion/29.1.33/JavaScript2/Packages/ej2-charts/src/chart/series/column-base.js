import { Animation, animationMode, isNullOrUndefined, remove } from '@syncfusion/ej2-base';
import { DoubleRange } from '../utils/double-range';
import { appendChildElement, redrawElement, pathAnimation, valueToCoefficient, getVisiblePoints, colorNameToHex, checkColorFormat, applyZLight } from '../../common/utils/helper';
import { getAnimationFunction, getPoint, getMinPointsDelta } from '../../common/utils/helper';
import { PathOption, Rect } from '@syncfusion/ej2-svg-base';
import { pointRender } from '../../common/model/constants';
/**
 * Base class for column series.
 * This class provides common properties and methods for column series in the chart.
 *
 * @private
 */
var ColumnBase = /** @class */ (function () {
    function ColumnBase() {
    }
    ColumnBase.prototype.getSideBySideInfo = function (series) {
        series.isRectSeries = true;
        if ((series.chart.enableSideBySidePlacement && !series.position) || !isNullOrUndefined(series.columnWidthInPixel)) {
            this.getSideBySidePositions(series);
        }
        if (series.columnWidthInPixel) {
            return new DoubleRange(0, 0);
        }
        var position = series.type === 'Histogram' || !series.chart.enableSideBySidePlacement ? 0 : series.position;
        var rectCount = series.type === 'Histogram' || !series.chart.enableSideBySidePlacement ? 1 : series.rectCount;
        var visibleSeries = series.chart.visibleSeries;
        var seriesSpacing = series.chart.enableSideBySidePlacement ? series.columnSpacing : 0; // Column Spacing
        var pointSpacing = (series.columnWidth === null || isNaN(+series.columnWidth)) ? ((series.type === 'Histogram') ? 1 : 0.7) :
            Math.min(series.columnWidth, 1); // Column width
        var minimumPointDelta = getMinPointsDelta(series.xAxis, visibleSeries);
        var width = minimumPointDelta * pointSpacing;
        var radius;
        var location = (position) / rectCount - 0.5;
        var doubleRange = new DoubleRange(location, location + (1 / rectCount));
        if (!(isNaN(doubleRange.start) || isNaN(doubleRange.end))) {
            if (series.groupName && series.type.indexOf('Stacking') === -1) {
                var mainColumnWidth_1 = 0.7;
                series.chart.series.filter(function (series) {
                    if (series.columnWidth > mainColumnWidth_1) {
                        mainColumnWidth_1 = series.columnWidth;
                    }
                });
                var mainWidth = minimumPointDelta * mainColumnWidth_1;
                var mainDoubleRange = new DoubleRange(doubleRange.start * mainWidth, doubleRange.end * mainWidth);
                var difference = ((mainDoubleRange.delta) - (doubleRange.end * width - doubleRange.start * width)) / 2;
                doubleRange = new DoubleRange(mainDoubleRange.start + difference, mainDoubleRange.end - difference);
            }
            else {
                doubleRange = new DoubleRange(doubleRange.start * width, doubleRange.end * width);
            }
            radius = seriesSpacing * doubleRange.delta;
            doubleRange = new DoubleRange(doubleRange.start + radius / 2, doubleRange.end - radius / 2);
        }
        return doubleRange;
    };
    /**
     * Gets the rectangle bounds based on two points.
     *
     * @param {number} x1 - The x-coordinate of the first point.
     * @param {number} y1 - The y-coordinate of the first point.
     * @param {number} x2 - The x-coordinate of the second point.
     * @param {number} y2 - The y-coordinate of the second point.
     * @param {Series} series - The series associated with the rectangle.
     * @returns {Rect} - The rectangle bounds.
     */
    ColumnBase.prototype.getRectangle = function (x1, y1, x2, y2, series) {
        var point1 = getPoint(x1, y1, series.xAxis, series.yAxis, series.chart.requireInvertedAxis);
        var point2 = getPoint(x2, y2, series.xAxis, series.yAxis, series.chart.requireInvertedAxis);
        return new Rect(Math.min(point1.x, point2.x), Math.min(point1.y, point2.y), Math.abs(point2.x - point1.x), Math.abs(point2.y - point1.y));
    };
    /**
     * Draws a cylinder using the provided options and element.
     *
     * @param {PathOption} options - The path options for drawing the cylinder.
     * @param {HTMLElement} element - The HTML element to which the cylinder is drawn.
     * @param {CylinderSeriesOption} cylinderSeriesOption - The options specific to the cylinder series.
     * @param {Rect} rect - The rectangle bounds within which the cylinder is drawn.
     * @param {Series} series - The series associated with the cylinder.
     * @returns {void}
     */
    ColumnBase.prototype.drawCylinder = function (options, element, cylinderSeriesOption, rect, series) {
        var width = rect.width;
        var height = rect.height;
        if (series.chart.enableCanvas) {
            var ctx = series.chart.canvasRender.ctx;
            var canvasCtx = ctx;
            ctx.save();
            var gradientColor = colorNameToHex(options.fill);
            var x = rect.x + series.clipRect.x;
            var y = rect.y + series.clipRect.y;
            var arc = 2 * Math.PI + 0.1;
            var rx = void 0;
            var ry = void 0;
            var cx1 = void 0;
            var cx2 = void 0;
            var cy1 = void 0;
            var cy2 = void 0;
            var x1 = void 0;
            var x2 = void 0;
            var y1 = void 0;
            var y2 = void 0;
            var cx = void 0;
            var cy = void 0;
            var xl = void 0;
            var yl = void 0;
            var xPos = void 0;
            var yPos = void 0;
            var step = void 0;
            var rxt = void 0;
            var ryt = void 0;
            var gx1 = 0;
            var gx2 = 0;
            var gy1 = 0;
            var gy2 = 0;
            var ini = 0;
            ctx.fillStyle = applyZLight(gradientColor, 0.9);
            ctx.lineWidth = 0;
            ctx.strokeStyle = applyZLight(gradientColor, 0.9);
            ctx.globalAlpha = options.opacity;
            if (cylinderSeriesOption.isColumn) {
                gx1 = x;
                gx2 = width + x;
                rx = width / 2;
                ry = rx / 4;
                cx2 = cx1 = x + rx;
                y2 = cy1 = y - ry;
                x2 = x;
                x1 = x + width;
                cy2 = y1 = y + height - ry;
                step = Math.PI;
                rxt = -rx;
                ryt = ry;
                if (cylinderSeriesOption.stacking) {
                    if (!cylinderSeriesOption.isLastSeries) {
                        y2 = cy1 = y + ry;
                    }
                }
            }
            else {
                gy2 = height + y;
                gy1 = y;
                ry = height / 2;
                rx = ry / 4;
                x2 = cx1 = x + rx;
                x1 = cx2 = x + width + rx;
                y1 = y + height;
                y2 = y;
                cy2 = cy1 = y + ry;
                ini = Math.PI / 2;
                step = Math.PI * 1.5;
                if (cylinderSeriesOption.stacking) {
                    if (!cylinderSeriesOption.isLastSeries) {
                        x1 = cx2 = x + width - rx;
                    }
                }
                ry = -ry;
                rx = -rx;
                rxt = rx;
                ryt = -ry;
            }
            var color = applyZLight(gradientColor, 0.7);
            var gradient = ctx.createLinearGradient(gx1, gy1, gx2, gy2);
            gradient.addColorStop(0, gradientColor);
            gradient.addColorStop(0.3, color);
            gradient.addColorStop(0.7, color);
            gradient.addColorStop(1, gradientColor);
            for (var j = 1; j <= 4; j++) {
                var i = 0;
                if (j < 4) {
                    ctx.beginPath();
                }
                if (j % 2 === 0) {
                    cx = cx2;
                    cy = cy2;
                    xl = x2;
                    yl = y2;
                }
                else {
                    cx = cx1;
                    cy = cy1;
                    xl = x1;
                    yl = y1;
                }
                if (j === 4) {
                    rx = rxt;
                    ry = ryt;
                    ctx.fillStyle = gradient;
                }
                if (j > 2) {
                    i = ini;
                    arc = step;
                }
                for (; i <= arc; i += 0.1) {
                    xPos = cx - (rx * Math.cos(i));
                    yPos = cy + (ry * Math.sin(i));
                    if (i === 0) {
                        ctx.moveTo(xPos, yPos);
                    }
                    else {
                        ctx.lineTo(xPos, yPos);
                    }
                }
                if (j > 2) {
                    ctx.lineTo(xl, yl);
                }
                if (j !== 3) {
                    ctx.stroke();
                    ctx.fill();
                }
            }
            if (options.id.indexOf('Series') >= 0) {
                ctx.clip();
                ctx.restore();
                ctx = canvasCtx;
            }
        }
        else {
            var chart = series.chart;
            var x = rect.x;
            var y = rect.y;
            var id = options.id;
            var gradientColor = options.fill;
            var fillColor = gradientColor;
            var format = checkColorFormat(gradientColor);
            if (!format) {
                gradientColor = colorNameToHex(gradientColor);
            }
            var AEx = 0;
            var AEy = 0;
            var LX = 0;
            var LY = 0;
            var GX = 0;
            var GY = 0;
            var X = void 0;
            var Y = void 0;
            var X1 = void 0;
            var Y1 = void 0;
            var X2 = void 0;
            var Y2 = void 0;
            var rx = void 0;
            var ry = void 0;
            var i = 2;
            if (cylinderSeriesOption.isColumn) {
                rx = width / 2;
                ry = rx / 4;
                X = X1 = x;
                Y = ry < y ? y - ry : cylinderSeriesOption.stacking ? y + ry : (y - ry);
                Y1 = Y;
                AEx = 2 * rx;
                LY = ry < y ? height : (height < 2 * ry ? height : cylinderSeriesOption.stacking ? height - (2 * ry) : height);
                X2 = X;
                Y2 = ry < y ? Y + height : (height < Y ? height + Y : cylinderSeriesOption.stacking ? height + (y - ry) : height + Y);
                GX = 100;
                if (cylinderSeriesOption.stacking) {
                    if (!cylinderSeriesOption.isLastSeries) {
                        Y = Y1 = y + ry;
                        LY = height < rx / 2 ? height : height - rx / 2;
                    }
                }
            }
            else {
                ry = height / 2;
                rx = ry / 4;
                Y = Y1 = y;
                X = X1 = Math.abs(x - rx);
                AEy = 2 * ry;
                LX = width;
                X2 = X + width;
                Y2 = Y;
                GY = 100;
                if (cylinderSeriesOption.stacking) {
                    if (!cylinderSeriesOption.isLastSeries) {
                        X2 = (X + width - rx * 2);
                        LX = width - rx * 2;
                    }
                }
            }
            remove(this.element);
            while (i--) {
                options.d = 'M' + X.toString() + ',' + Y.toString() + 'a' + rx.toString() + ',' + ry.toString() + ' 0 1,0 ' + AEx.toString() + ',' + AEy.toString() + 'a' + rx.toString() + ',' + ry.toString() + ' 0 1,0 ' + (-1 * AEx).toString() + ',' + (-1 * AEy).toString();
                options.id = id + '_' + 'Region_' + i;
                options.fill = applyZLight(gradientColor, 0.9);
                if (i % 2 === 0 && series.type !== 'StackingBar100' && series.type !== 'StackingBar' && series.type !== 'Bar') {
                    options.fill = options.fill + '10';
                }
                this.element = chart.renderer.drawPath(this.options, new Int32Array([series.clipRect.x, series.clipRect.y]));
                appendChildElement(series.chart.enableCanvas, series.seriesElement, this.element, chart.redraw);
                X = X2;
                Y = Y2;
            }
            options.d = 'M' + X1.toString() + ',' + Y1.toString() + 'a' + rx.toString() + ',' + ry.toString() + ' 0 1,0 ' + AEx.toString() + ',' + AEy.toString() + 'l' + LX.toString() + ' ' + LY.toString() + 'a' + rx.toString() + ',' + ry.toString() + ' 0 1,1 ' + (-1 * AEx).toString() + ',' + (-1 * AEy).toString() + ' z';
            options.id = id + '_' + 'Region_2';
            options.fill = applyZLight(gradientColor, 0.7);
            var optiong = void 0;
            if (fillColor.indexOf('url') === -1) {
                if (!document.getElementById(id)) {
                    optiong = { 'id': id, x1: '0%', y1: '0%', x2: GX.toString() + '%', y2: GY.toString() + '%' };
                    var gradientElement = [{ colorStop: '0%', color: gradientColor }, { colorStop: '30%', color: applyZLight(gradientColor, 0.7) }, { colorStop: '70%', color: applyZLight(gradientColor, 0.7) }, { colorStop: '100%', color: gradientColor }];
                    this.drawGradient(optiong, gradientElement, series);
                }
                options.fill = 'url(#' + optiong.id + ')';
            }
            this.element = chart.renderer.drawPath(this.options, new Int32Array([series.clipRect.x, series.clipRect.y]));
            appendChildElement(series.chart.enableCanvas, series.seriesElement, this.element, chart.redraw);
        }
    };
    /**
     * Draws a gradient using the provided options and gradient element.
     *
     * @param {OptionGradient} optiong - The gradient options for drawing the gradient.
     * @param {Object} gradientElement - The gradient element to which the gradient is applied.
     * @param {Series} series - The series associated with the gradient.
     * @returns {void}
     */
    ColumnBase.prototype.drawGradient = function (optiong, gradientElement, series) {
        var chart = series.chart;
        var defElement = chart.renderer.createDefs();
        var xmlns = 'http://www.w3.org/2000/svg';
        var linearGradientElement = document.createElementNS(xmlns, 'linearGradient');
        linearGradientElement.setAttribute('id', optiong.id);
        linearGradientElement.setAttribute('x1', optiong.x1);
        linearGradientElement.setAttribute('y1', optiong.y1);
        linearGradientElement.setAttribute('x2', optiong.x2);
        linearGradientElement.setAttribute('y2', optiong.y2);
        for (var i = 0; i < gradientElement.length; i++) {
            var stopElement = document.createElementNS(xmlns, 'stop');
            stopElement.setAttribute('offset', gradientElement[i].colorStop);
            stopElement.setAttribute('stop-color', gradientElement[i].color);
            stopElement.setAttribute('stop-opacity', '1');
            linearGradientElement.appendChild(stopElement);
        }
        series.seriesElement.appendChild(defElement);
        defElement.appendChild(linearGradientElement);
    };
    /**
     * To get the position of each series.
     *
     * @param {Series} series - The series for which side-by-side positions are calculated.
     * @returns {void}
     * @private
     */
    ColumnBase.prototype.getSideBySidePositions = function (series) {
        var chart = series.chart;
        for (var _i = 0, _a = chart.columns; _i < _a.length; _i++) {
            var columnItem = _a[_i];
            for (var _b = 0, _c = chart.rows; _b < _c.length; _b++) {
                var item = _c[_b];
                this.findRectPosition(series.findSeriesCollection(columnItem, item, false));
            }
        }
    };
    ColumnBase.prototype.findRectPosition = function (seriesCollection) {
        var groupingValues = [];
        var vSeries = { rectCount: 0, position: null };
        for (var i = 0; i < seriesCollection.length; i++) {
            var value = seriesCollection[i];
            if (value.type.indexOf('Stacking') !== -1 || value.groupName !== '') {
                var groupName = value.type.indexOf('Stacking') !== -1 ? value.stackingGroup : value.type + value.groupName;
                if (groupName) {
                    if (groupingValues[groupName] === undefined) {
                        value.position = vSeries.rectCount;
                        groupingValues[groupName] = vSeries.rectCount++;
                    }
                    else {
                        value.position = groupingValues[groupName];
                    }
                }
                else {
                    if (vSeries.position === null) {
                        value.position = vSeries.rectCount;
                        vSeries.position = vSeries.rectCount++;
                    }
                    else {
                        value.position = vSeries.position;
                    }
                }
            }
            else {
                value.position = vSeries.rectCount++;
            }
        }
        for (var i = 0; i < seriesCollection.length; i++) {
            var value = seriesCollection[i];
            value.rectCount = vSeries.rectCount;
        }
    };
    /**
     * Updates the location of the symbol based on the point and rect coordinates.
     *
     * @param {Points} point - The point for which the symbol location is updated.
     * @param {Rect} rect - The rect representing the symbol location.
     * @param {Series} series - The series to which the point belongs.
     * @returns {void}
     */
    ColumnBase.prototype.updateSymbolLocation = function (point, rect, series) {
        if (!series.chart.requireInvertedAxis) {
            this.updateXRegion(point, rect, series);
        }
        else {
            this.updateYRegion(point, rect, series);
        }
        if (series.type === 'Histogram') {
            point.minimum = +point.x - series.histogramValues.binWidth / 2;
            point.maximum = +point.x + series.histogramValues.binWidth / 2;
        }
    };
    /**
     * Updates the x-region of the symbol based on the point and rect coordinates.
     *
     * @param {Points} point - The point for which the x-region is updated.
     * @param {Rect} rect - The rect representing the x-region.
     * @param {Series} series - The series to which the point belongs.
     * @returns {void}
     */
    ColumnBase.prototype.updateXRegion = function (point, rect, series) {
        point.symbolLocations.push({
            x: rect.x + (rect.width) / 2,
            y: (series.seriesType === 'BoxPlot' || series.seriesType.indexOf('HighLow') !== -1 ||
                (point.yValue >= 0 === !series.yAxis.isAxisInverse)) ? rect.y : (rect.y + rect.height)
        });
        this.getRegion(point, rect, series);
        if (series.type === 'RangeColumn') {
            point.symbolLocations.push({
                x: rect.x + (rect.width) / 2,
                y: rect.y + rect.height
            });
        }
    };
    /**
     * Updates the y-region of the symbol based on the point and rect coordinates.
     *
     * @param {Points} point - The point for which the y-region is updated.
     * @param {Rect} rect - The rect representing the y-region.
     * @param {Series} series - The series to which the point belongs.
     * @returns {void}
     */
    ColumnBase.prototype.updateYRegion = function (point, rect, series) {
        point.symbolLocations.push({
            x: (series.seriesType === 'BoxPlot' || series.seriesType.indexOf('HighLow') !== -1 ||
                (point.yValue >= 0 === !series.yAxis.isAxisInverse)) ? rect.x + rect.width : rect.x,
            y: rect.y + rect.height / 2
        });
        this.getRegion(point, rect, series);
        if (series.type === 'RangeColumn') {
            point.symbolLocations.push({
                x: rect.x,
                y: rect.y + rect.height / 2
            });
        }
    };
    /**
     * To render the marker for the series.
     *
     * @param {Series} series - The series for which markers are rendered.
     * @returns {void}
     * @private
     */
    ColumnBase.prototype.renderMarker = function (series) {
        if (series.marker && series.marker.visible) {
            series.chart.markerRender.render(series);
        }
    };
    /**
     * To get the marker region when Y value is 0
     *
     * @param {Points} point point
     * @param {rect} rect rect
     * @param {Series} series series
     * @returns {void}
     */
    ColumnBase.prototype.getRegion = function (point, rect, series) {
        if (point.y === 0) {
            var markerWidth = (series.marker && series.marker.width) ? series.marker.width : 0;
            var markerHeight = (series.marker && series.marker.height) ? series.marker.height : 0;
            point.regions.push(new Rect(point.symbolLocations[0].x - markerWidth, point.symbolLocations[0].y - markerHeight, 2 * markerWidth, 2 * markerHeight));
        }
        else {
            point.regions.push(rect);
        }
    };
    /**
     * Triggers the point render event.
     *
     * @param {Series} series - The series associated with the point.
     * @param {Points} point - The data point for which the event is triggered.
     * @param {string} fill - The fill color of the point.
     * @param {BorderModel} border - The border settings of the point.
     * @returns {IPointRenderEventArgs} - The event arguments.
     */
    ColumnBase.prototype.triggerEvent = function (series, point, fill, border) {
        var argsData = {
            cancel: false, name: pointRender, series: series, point: point,
            fill: series.setPointColor(point, fill),
            border: series.setBorderColor(point, border),
            cornerRadius: series.cornerRadius
        };
        series.chart.trigger(pointRender, argsData);
        point.color = argsData.fill;
        return argsData;
    };
    /**
     * Draws a rectangle for the data point.
     *
     * @param {Series} series - The series associated with the point.
     * @param {Points} point - The data point for which the rectangle is drawn.
     * @param {Rect} rect - The rect bounds.
     * @param {IPointRenderEventArgs} argsData - The event arguments.
     * @returns {void}
     */
    ColumnBase.prototype.drawRectangle = function (series, point, rect, argsData) {
        var chart = series.chart;
        var check = chart.requireInvertedAxis ? rect.height : rect.width;
        if (check <= 0) {
            return null;
        }
        var direction;
        if (point.y === 0) {
            // For 0 values corner radius will not calculate
            direction = this.calculateRoundedRectPath(rect, 0, 0, 0, 0);
        }
        else {
            var topLeft = void 0;
            var topRight = void 0;
            var bottomLeft = void 0;
            var bottomRight = void 0;
            var isNegative = point.y < 0;
            if (chart.requireInvertedAxis) {
                topLeft = isNegative ? argsData.cornerRadius.topRight : argsData.cornerRadius.topLeft;
                topRight = isNegative ? argsData.cornerRadius.topLeft : argsData.cornerRadius.topRight;
                bottomLeft = isNegative ? argsData.cornerRadius.bottomRight : argsData.cornerRadius.bottomLeft;
                bottomRight = isNegative ? argsData.cornerRadius.bottomLeft : argsData.cornerRadius.bottomRight;
            }
            else {
                topLeft = isNegative ? argsData.cornerRadius.bottomLeft : argsData.cornerRadius.topLeft;
                topRight = isNegative ? argsData.cornerRadius.bottomRight : argsData.cornerRadius.topRight;
                bottomLeft = isNegative ? argsData.cornerRadius.topLeft : argsData.cornerRadius.bottomLeft;
                bottomRight = isNegative ? argsData.cornerRadius.topRight : argsData.cornerRadius.bottomRight;
            }
            direction = this.calculateRoundedRectPath(rect, topLeft, topRight, bottomLeft, bottomRight, chart.requireInvertedAxis);
        }
        var name = series.category === 'Indicator' ? chart.element.id + '_Indicator_' + series.index + '_' + series.name +
            '_Point_' + point.index : chart.element.id + '_Series_' + series.index + '_Point_' + ((series.removedPointIndex !== null && series.removedPointIndex <= point.index) ? (point.index + 1) : point.index);
        var previousElement = redrawElement(chart.redraw, name);
        var previousDirection = previousElement ? previousElement.getAttribute('d') : '';
        this.options = new PathOption(name, argsData.fill, argsData.border.width, argsData.border.color, series.opacity, series.border.dashArray, (series.columnFacet === 'Cylinder') ? '' : direction);
        this.element = chart.renderer.drawPath(this.options, new Int32Array([series.clipRect.x, series.clipRect.y]));
        if (series.removedPointIndex !== null && series.removedPointIndex <= point.index) {
            this.element.id = chart.element.id + '_Series_' + series.index + '_Point_' + point.index;
        }
        switch (series.seriesType) {
            case 'XY':
                this.element.setAttribute('role', 'img');
                this.element.setAttribute('aria-label', series.accessibility.accessibilityDescriptionFormat ? series.formatAccessibilityDescription(point, series) : (point.x + ':' + point.yValue + ', ' + series.name));
                break;
            case 'HighLow':
                this.element.setAttribute('role', 'img');
                this.element.setAttribute('aria-label', series.accessibility.accessibilityDescriptionFormat ? series.formatAccessibilityDescription(point, series) : (point.x + ':' + point.high + ', ' + point.low + ', ' + series.name));
                break;
        }
        if (!(series.columnFacet === 'Cylinder' && (chart.redraw || !chart.enableAnimation) && series.seriesElement.querySelector('#' + this.element.id))) {
            appendChildElement(series.chart.enableCanvas, series.seriesElement, this.element, chart.redraw);
        }
        if (!series.chart.enableCanvas) {
            pathAnimation(this.element, (series.columnFacet === 'Cylinder') ? '' : direction, chart.redraw, previousDirection, chart.duration);
        }
    };
    /**
     * To animate the series.
     *
     * @param {Series} series - The series to be animated.
     * @returns {void}
     * @private
     */
    ColumnBase.prototype.animate = function (series) {
        var rectElements = series.seriesElement.childNodes;
        var count = series.category === 'Indicator' ? 0 : 1;
        var visiblePoints = getVisiblePoints(series);
        for (var _i = 0, visiblePoints_1 = visiblePoints; _i < visiblePoints_1.length; _i++) {
            var point = visiblePoints_1[_i];
            if (!point.symbolLocations.length && !(series.type === 'BoxAndWhisker' && point.regions.length)) {
                continue;
            }
            if ((series.type === 'Column' || series.type === 'Bar' || series.type === 'StackingColumn' || series.type === 'StackingColumn100' || series.type === 'StackingBar' || series.type === 'StackingBar100') && series.columnFacet === 'Cylinder') {
                for (var j = 0; j < rectElements.length; j++) {
                    this.animateRect(rectElements[j], series, point);
                }
            }
            else {
                this.animateRect(rectElements[count], series, point);
                count++;
            }
        }
    };
    /**
     * Animates the rect element.
     *
     * @param {HTMLElement} element - The rect element to be animated.
     * @param {Series} series - The series associated with the rect.
     * @param {Points} point - The data point associated with the rect.
     * @returns {void}
     */
    ColumnBase.prototype.animateRect = function (element, series, point) {
        var option = series.animation;
        var duration = series.chart.animated ? series.chart.duration : option.duration;
        var effect = getAnimationFunction('Linear');
        var isPlot = point.yValue < 0;
        var x;
        var y;
        var elementHeight = +point.regions[0].height;
        var elementWidth = +point.regions[0].width;
        var centerX;
        var centerY;
        if (!series.chart.requireInvertedAxis) {
            x = +point.regions[0].x;
            if (series.type.indexOf('Stacking') > -1) {
                y = (1 - valueToCoefficient(0, series.yAxis)) * (series.yAxis.rect.height);
                centerX = x;
                centerY = y;
            }
            else {
                y = +point.regions[0].y;
                centerY = (series.seriesType.indexOf('HighLow') !== -1 || series.type.indexOf('Waterfall') !== -1) ? y + elementHeight / 2 :
                    (isPlot !== series.yAxis.isAxisInverse) ? y : y + elementHeight;
                centerX = isPlot ? x : x + elementWidth;
            }
        }
        else {
            y = +point.regions[0].y;
            if (series.type.indexOf('Stacking') > -1) {
                x = (valueToCoefficient(0, series.yAxis)) * series.yAxis.rect.width;
                centerX = x;
                centerY = y;
            }
            else {
                x = +point.regions[0].x;
                centerY = isPlot ? y : y + elementHeight;
                centerX = (series.seriesType.indexOf('HighLow') !== -1 || series.type.indexOf('Waterfall') !== -1) ? x + elementWidth / 2 :
                    (isPlot !== series.yAxis.isAxisInverse) ? x + elementWidth : x;
            }
        }
        var value;
        if (!isNullOrUndefined(element)) {
            element.style.visibility = 'hidden';
            new Animation({}).animate(element, {
                duration: (duration === 0 && animationMode === 'Enable') ? 1000 : duration,
                delay: option.delay,
                progress: function (args) {
                    if (args.timeStamp >= args.delay) {
                        element.style.visibility = 'visible';
                        if (!series.chart.requireInvertedAxis) {
                            elementHeight = elementHeight ? elementHeight : 1;
                            value = effect(args.timeStamp - args.delay, 0, elementHeight, args.duration);
                            element.setAttribute('transform', 'translate(' + centerX + ' ' + centerY +
                                ') scale(1,' + (value / elementHeight) + ') translate(' + (-centerX) + ' ' + (-centerY) + ')');
                        }
                        else {
                            elementWidth = elementWidth ? elementWidth : 1;
                            value = effect(args.timeStamp - args.delay, 0, elementWidth, args.duration);
                            element.setAttribute('transform', 'translate(' + centerX + ' ' + centerY +
                                ') scale(' + (value / elementWidth) + ', 1) translate(' + (-centerX) + ' ' + (-centerY) + ')');
                        }
                    }
                },
                end: function () {
                    var annotations = document.getElementById(series.chart.element.id + '_Annotation_Collections');
                    if (annotations) {
                        annotations.style.visibility = 'visible';
                    }
                    var stackLabelGroup = document.getElementById(series.chart.element.id + '_StackLabelGroup');
                    if (stackLabelGroup) {
                        stackLabelGroup.setAttribute('visibility', 'visible');
                    }
                    element.setAttribute('transform', 'translate(0,0)');
                    var seriesElement = series.seriesElement;
                    if (element === seriesElement.lastElementChild || point.index === series.points.length - 1 ||
                        (series.type === 'Waterfall' && element === seriesElement.children[seriesElement.childElementCount - 2])) {
                        series.chart.trigger('animationComplete', { series: series.chart.isBlazor ? {} : series });
                        if (series.type === 'Waterfall') {
                            var rectElements = seriesElement.childNodes;
                            for (var i = 0; i < rectElements.length; i++) {
                                if (rectElements[i].id.indexOf('Connector') !== -1) {
                                    rectElements[i].style.visibility = 'visible';
                                    rectElements[i].setAttribute('transform', 'translate(0,0)');
                                }
                            }
                        }
                    }
                }
            });
        }
    };
    /**
     * Calculates the path for a rounded rectangle.
     *
     * @param {Rect} rect - The bounding rectangle.
     * @param {number} topLeft - The radius of the top-left corner.
     * @param {number} topRight - The radius of the top-right corner.
     * @param {number} bottomLeft - The radius of the bottom-left corner.
     * @param {number} bottomRight - The radius of the bottom-right corner.
     * @param {boolean} inverted - Indicates whether the rectangle is inverted.
     * @returns {string} The SVG path string representing the rounded rectangle.
     */
    ColumnBase.prototype.calculateRoundedRectPath = function (rect, topLeft, topRight, bottomLeft, bottomRight, inverted) {
        if (inverted === void 0) { inverted = false; }
        var halfValue = inverted ? rect.width / 2 : rect.height / 2;
        topLeft = Math.min(topLeft, halfValue);
        topRight = Math.min(topRight, halfValue);
        bottomLeft = Math.min(bottomLeft, halfValue);
        bottomRight = Math.min(bottomRight, halfValue);
        return 'M' + ' ' + rect.x + ' ' + (topLeft + rect.y) +
            ' Q ' + rect.x + ' ' + rect.y + ' ' + (rect.x + topLeft) + ' ' +
            rect.y + ' ' + 'L' + ' ' + (rect.x + rect.width - topRight) + ' ' + rect.y +
            ' Q ' + (rect.x + rect.width) + ' ' + rect.y + ' ' +
            (rect.x + rect.width) + ' ' + (rect.y + topRight) + ' ' + 'L ' +
            (rect.x + rect.width) + ' ' + (rect.y + rect.height - bottomRight)
            + ' Q ' + (rect.x + rect.width) + ' ' + (rect.y + rect.height) + ' ' + (rect.x + rect.width - bottomRight) + ' ' +
            (rect.y + rect.height) + ' ' + 'L ' + (rect.x + bottomLeft) + ' ' + (rect.y + rect.height) + ' Q ' + rect.x + ' ' +
            (rect.y + rect.height) + ' ' + rect.x + ' ' + (rect.y + rect.height - bottomLeft) + ' ' + 'L' + ' ' + rect.x + ' ' +
            (topLeft + rect.y) + ' ' + 'Z';
    };
    return ColumnBase;
}());
export { ColumnBase };
