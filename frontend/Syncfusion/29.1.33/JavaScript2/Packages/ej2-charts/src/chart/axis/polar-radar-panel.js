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
import { valueToCoefficient, inside, isOverlap, textTrim } from '../../common/utils/helper';
import { appendChildElement } from '../../common/utils/helper';
import { CircleOption } from '../../common/utils/helper';
import { Size, measureText, TextOption, PathOption, Rect } from '@syncfusion/ej2-svg-base';
import { LineBase } from '../series/line-base';
import { textElement, ChartLocation, valueToPolarCoefficient, CoefficientToVector, getElement } from '../../common/utils/helper';
/**
 * Specifies the layout for polar axis panels.
 *
 * @private
 */
var PolarRadarPanel = /** @class */ (function (_super) {
    __extends(PolarRadarPanel, _super);
    function PolarRadarPanel() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /** @private */
        _this.visibleAxisLabelRect = [];
        return _this;
    }
    /**
     * Measure the polar radar axis size.
     *
     * @returns {void}
     * @private
     */
    PolarRadarPanel.prototype.measureAxis = function (rect) {
        var chart = this.chart;
        this.initialClipRect = rect;
        this.seriesClipRect = new Rect(rect.x, rect.y, rect.width, rect.height);
        //Measure axis size calculation
        this.measureRowAxis(chart, this.initialClipRect);
        this.measureColumnAxis(chart, this.initialClipRect);
        this.calculateAxisSize();
    };
    PolarRadarPanel.prototype.measureRowAxis = function (chart, rect) {
        this.calculateRowSize(rect);
        var row = chart.rows[0];
        this.measureDefinition(row, chart, new Size(chart.availableSize.width, row.computedHeight));
    };
    PolarRadarPanel.prototype.measureColumnAxis = function (chart, rect) {
        this.calculateColumnSize(rect);
        var column = chart.columns[0];
        this.measureDefinition(column, chart, new Size(column.computedWidth, chart.availableSize.height));
    };
    /**
     * Measures the column and row in the chart.
     *
     * @param {Row | Column} definition - The row or column to measure.
     * @param {Chart} chart - The chart instance.
     * @param {Size} size - The size of the chart.
     * @returns {void}
     * @private
     */
    PolarRadarPanel.prototype.measureDefinition = function (definition, chart, size) {
        for (var _i = 0, _a = definition.axes; _i < _a.length; _i++) {
            var axis = _a[_i];
            axis.getModule(chart);
            axis.baseModule.calculateRangeAndInterval(size, axis);
        }
    };
    /**
     * Measure the axis.
     *
     * @returns {void}
     * @private
     */
    PolarRadarPanel.prototype.calculateAxisSize = function () {
        var chart = this.chart;
        var axis;
        var padding = 5;
        this.centerX = this.initialClipRect.width * 0.5 + this.initialClipRect.x;
        this.centerY = this.initialClipRect.height * 0.5 + this.initialClipRect.y;
        chart.radius = Math.min(this.initialClipRect.width, this.initialClipRect.height) / 2 - padding -
            chart.primaryXAxis.majorTickLines.height - chart.primaryXAxis.maxLabelSize.height;
        chart.radius = (chart.primaryXAxis.coefficient * chart.radius) / 100;
        this.seriesClipRect.y = this.centerY - chart.radius;
        this.seriesClipRect.x = this.centerX - chart.radius;
        this.seriesClipRect.height = 2 * chart.radius;
        this.seriesClipRect.width = 2 * chart.radius;
        this.calculateRowSize(this.seriesClipRect);
        axis = chart.primaryYAxis;
        axis.rect = this.seriesClipRect;
        this.calculateColumnSize(this.seriesClipRect);
        axis = chart.primaryXAxis;
        axis.rect = this.seriesClipRect;
    };
    /**
     * Measure the axis.
     *
     * @returns {void}
     * @private
     */
    PolarRadarPanel.prototype.measure = function () {
        var chart = this.chart;
        var yAxis = chart.primaryYAxis;
        yAxis.isRTLEnabled = chart.enableRtl;
        yAxis.setIsInversedAndOpposedPosition(true);
        chart.verticalAxes.push(yAxis);
        var row = chart.rows[0];
        row.axes[0] = yAxis;
        chart.rows[0] = row;
        var xAxis = chart.primaryXAxis;
        xAxis.isRTLEnabled = chart.enableRtl;
        xAxis.setIsInversedAndOpposedPosition(true);
        chart.horizontalAxes.push(xAxis);
        var column = chart.columns[0];
        column.axes[0] = xAxis;
        chart.columns[0] = column;
    };
    /**
     * Measure the row size.
     *
     * @returns {void}
     */
    PolarRadarPanel.prototype.calculateRowSize = function (rect) {
        /** Calculate row size */
        var chart = this.chart;
        var row = chart.rows[0];
        row.computedHeight = rect.height / 2;
        row.computedTop = rect.y;
        chart.rows[0] = row;
    };
    /**
     * Measure the row size.
     *
     * @returns {void}
     */
    PolarRadarPanel.prototype.calculateColumnSize = function (rect) {
        /** Calculate column size */
        var chart = this.chart;
        var column = chart.columns[0];
        column.computedLeft = rect.x;
        column.computedWidth = rect.width;
        chart.columns[0] = column;
    };
    /**
     * To render the axis element.
     *
     * @returns {void}
     * @private
     */
    PolarRadarPanel.prototype.renderAxes = function () {
        var axis;
        var chart = this.chart;
        this.startAngle = chart.primaryXAxis.startAngle;
        var axisElement = chart.renderer.createGroup({ id: chart.element.id + 'AxisCollection' });
        var axisLineElement = chart.renderer.createGroup({ id: chart.element.id + 'AxisOutsideCollection' });
        for (var i = 0, len = chart.axisCollections.length; i < len; i++) {
            this.element = chart.renderer.createGroup({ id: chart.element.id + 'AxisGroup' + i });
            axis = chart.axisCollections[i];
            if (axis.orientation === 'Horizontal') {
                if (axis.majorGridLines.width > 0 || axis.majorTickLines.width > 0) {
                    this.drawXAxisGridLine(axis, i);
                }
                if (axis.visible && axis.internalVisibility) {
                    this.drawXAxisLabels(axis, i);
                }
            }
            else {
                this.drawYAxisGridLine(axis, i);
                if (axis.lineStyle.width > 0) {
                    this.drawYAxisLine(axis, i);
                }
                if (axis.visible && axis.internalVisibility) {
                    this.drawYAxisLabels(axis, i);
                }
            }
            if (!this.chart.enableCanvas) {
                axisElement.appendChild(this.element);
            }
        }
        if (!this.chart.enableCanvas) {
            axisElement.appendChild(this.element);
        }
        appendChildElement(chart.enableCanvas, chart.svgObject, axisElement, chart.redraw);
        return axisLineElement;
    };
    PolarRadarPanel.prototype.drawYAxisLine = function (axis, index) {
        var chart = this.chart;
        var optionsLine = {};
        var vector = CoefficientToVector(valueToPolarCoefficient(axis.visibleLabels[0].value, axis), this.startAngle);
        var axisLine = 'M ' + this.centerX + ' ' + this.centerY + 'L ' +
            (this.centerX + chart.radius * vector.x) + ' ' + (this.centerY + chart.radius * vector.y);
        optionsLine = {
            'id': chart.element.id + 'AxisLine_' + index,
            'd': axisLine,
            'stroke-dasharray': axis.lineStyle.dashArray,
            'stroke-width': axis.lineStyle.width,
            'stroke': axis.lineStyle.color || chart.themeStyle.axisLine
        };
        /**
         * I252450
         * When we click the center of the marker which is plotted in the axis line, selection did not work is fixed
         * Cause: Instead of marker id, axis  line id is obtained while clicking
         * Fix: Pointer events set to none for axis lines
         */
        var element = chart.renderer.drawPath(optionsLine);
        this.setPointerEventNone(element);
        if (!this.chart.enableCanvas) {
            chart.yAxisElements.appendChild(element);
        }
    };
    PolarRadarPanel.prototype.drawYAxisLabels = function (axis, index) {
        var chart = this.chart;
        var elementSize;
        var options;
        var pointX = 0;
        var pointY = 0;
        var angle = this.startAngle < 0 ? this.startAngle + 360 : this.startAngle;
        var anchor = 'middle';
        var radius;
        var padding = 5;
        var isIntersect;
        var labelRegions = [];
        var isLabelVisible = [];
        isLabelVisible[0] = true;
        var intersectType = axis.labelIntersectAction;
        var labelElement = chart.renderer.createGroup({ id: chart.element.id + 'AxisLabels' + index });
        var vector = CoefficientToVector(valueToPolarCoefficient(axis.visibleLabels[0].value, axis), this.startAngle);
        for (var i = 0, len = axis.visibleLabels.length; i < len; i++) {
            isIntersect = false;
            radius = chart.radius * valueToCoefficient(axis.visibleLabels[i].value, axis);
            elementSize = axis.visibleLabels[i].size;
            radius = chart.radius * valueToCoefficient(axis.visibleLabels[i].value, axis);
            pointX = (this.centerX + radius * vector.x) + ((axis.majorTickLines.height + elementSize.width / 2 + padding / 2)
                * (Math.cos(angle * Math.PI / 180)) * (axis.labelPosition === 'Inside' && chart.enableRtl ? -1 : axis.labelPosition === 'Inside' ? 1 : axis.labelPosition === 'Outside' && chart.enableRtl ? 1 : -1));
            pointY = (this.centerY + radius * vector.y) + ((axis.majorTickLines.height + elementSize.height / 2)
                * (Math.sin(angle * Math.PI / 180)) * (axis.labelPosition === 'Inside' && chart.enableRtl ? -1 : axis.labelPosition === 'Inside' ? 1 : axis.labelPosition === 'Outside' && chart.enableRtl ? 1 : -1));
            pointY += (elementSize.height / 4);
            labelRegions[i] = this.getLabelRegion(pointX, pointY, axis.visibleLabels[i], anchor);
            if (i !== 0 && intersectType === 'Hide') {
                for (var j = i; j >= 0; j--) {
                    j = (j === 0) ? 0 : (j === i) ? (j - 1) : j;
                    if (isLabelVisible[j] && isOverlap(labelRegions[i], labelRegions[j])) {
                        isIntersect = true;
                        isLabelVisible[i] = false;
                        break;
                    }
                    else {
                        isLabelVisible[i] = true;
                    }
                }
                if (isIntersect) {
                    continue; // If the label is intersect, the label render is ignored.
                }
                // To check Y axis label with visible X axis label
                for (var _i = 0, _a = this.visibleAxisLabelRect; _i < _a.length; _i++) {
                    var rect = _a[_i];
                    if (isOverlap(labelRegions[i], rect)) {
                        isIntersect = true;
                        break;
                    }
                }
            }
            if (isIntersect) {
                continue;
            }
            this.visibleAxisLabelRect.push(labelRegions[i]);
            options = new TextOption(chart.element.id + index + '_AxisLabel_' + i, pointX, pointY, anchor, axis.visibleLabels[i].text);
            textElement(chart.renderer, options, axis.labelStyle, axis.labelStyle.color || chart.themeStyle.axisLabelFont.color, labelElement, false, chart.redraw, true, true, null, null, null, null, chart.enableCanvas, null, chart.themeStyle.axisLabelFont);
        }
        if (!this.chart.enableCanvas) {
            chart.yAxisElements.appendChild(labelElement);
        }
    };
    PolarRadarPanel.prototype.drawYAxisGridLine = function (axis, index) {
        var chart = this.chart;
        var options;
        var radius;
        var majorTick = '';
        var majorGrid = '';
        var vector;
        var angle = this.startAngle < 0 ? this.startAngle + 360 : this.startAngle;
        var x1;
        var y1;
        var x2;
        var y2;
        var border = {
            color: axis.majorGridLines.color || chart.themeStyle.majorGridLine,
            width: axis.majorGridLines.width
        };
        var previousValue;
        var element;
        var inversedRadius;
        if (axis.majorGridLines.width > 0) {
            if (chart.visibleSeries[0].type === 'Polar') {
                for (var j = 0; j < axis.visibleLabels.length; j++) {
                    element = getElement(chart.element.id + '_MajorGridLine_' + index + '_' + j);
                    previousValue = element ? element.getAttribute('r') : null;
                    radius = chart.radius * valueToCoefficient(axis.visibleLabels[j].value, axis);
                    if (axis.isInversed && !inversedRadius) {
                        inversedRadius = radius;
                    }
                    options = new CircleOption(chart.element.id + '_MajorGridLine_' + index + '_' + j, 'transparent', border, axis.majorGridLines.width, this.centerX, this.centerY, radius);
                    appendChildElement(chart.enableCanvas, this.element, chart.renderer.drawCircle(options), chart.redraw, true, 'r', 'r', new ChartLocation(+previousValue, +previousValue), null, true);
                }
                if (radius !== chart.radius && (!axis.isInversed || inversedRadius !== chart.radius)) {
                    options = new CircleOption(chart.element.id + '_MajorGridLine_' + index + '_' + axis.visibleLabels.length + 1, 'transparent', border, axis.majorGridLines.width, this.centerX, this.centerY, chart.radius);
                    appendChildElement(chart.enableCanvas, this.element, chart.renderer.drawCircle(options), chart.redraw, true, 'r', 'r', new ChartLocation(+previousValue, +previousValue), null, true);
                }
            }
            else {
                for (var j = 0; j < axis.visibleLabels.length; j++) {
                    radius = chart.radius * valueToCoefficient(axis.visibleLabels[j].value, axis);
                    majorGrid = this.renderRadarGrid(radius, '', chart);
                    element = getElement(chart.element.id + '_MajorGridLine_' + index + '_' + j);
                    previousValue = element ? element.getAttribute('d') : null;
                    options = new PathOption(chart.element.id + '_MajorGridLine_' + index + '_' + j, 'transparent', axis.majorGridLines.width, axis.majorGridLines.color || chart.themeStyle.majorGridLine, null, null, majorGrid);
                    appendChildElement(chart.enableCanvas, this.element, chart.renderer.drawPath(options), chart.redraw, true, 'x', 'y', null, previousValue, true);
                }
                if (radius !== chart.radius) {
                    majorGrid = this.renderRadarGrid(chart.radius, '', chart);
                    element = getElement(chart.element.id + '_MajorGridLine_' + index + '_' + axis.visibleLabels.length);
                    previousValue = element ? element.getAttribute('d') : null;
                    options = new PathOption(chart.element.id + '_MajorGridLine_' + index + '_' + axis.visibleLabels.length, 'transparent', axis.majorGridLines.width, axis.majorGridLines.color || chart.themeStyle.majorGridLine, null, null, majorGrid);
                    appendChildElement(chart.enableCanvas, this.element, chart.renderer.drawPath(options), chart.redraw, true, 'x', 'y', null, previousValue, true);
                }
            }
        }
        if (axis.majorTickLines.width > 0) {
            vector = CoefficientToVector(valueToPolarCoefficient(axis.visibleLabels[0].value, axis), this.startAngle);
            for (var i = 0; i < axis.visibleLabels.length; i++) {
                radius = chart.radius * valueToCoefficient(axis.visibleLabels[i].value, axis);
                x1 = this.centerX + radius * vector.x;
                y1 = this.centerY + radius * vector.y;
                x2 = x1 + (axis.majorTickLines.height * (Math.cos(angle * Math.PI / 180)) * (axis.tickPosition === 'Inside' && chart.enableRtl ? -1 : axis.tickPosition === 'Inside' ? 1 : axis.tickPosition === 'Outside' && chart.enableRtl ? 1 : -1));
                y2 = y1 + (axis.majorTickLines.height * (Math.sin(angle * Math.PI / 180)) * (axis.tickPosition === 'Inside' && chart.enableRtl ? -1 : axis.tickPosition === 'Inside' ? 1 : axis.tickPosition === 'Outside' && chart.enableRtl ? 1 : -1));
                majorTick = 'M ' + x1 + ' ' + y1 + ' L ' + x2 + ' ' + y2;
                this.renderTickLine(axis, index, majorTick, '', i);
            }
        }
    };
    PolarRadarPanel.prototype.renderRadarGrid = function (radius, majorGrid, chart) {
        var vector;
        var vector2;
        var x1;
        var y1;
        var x2;
        var y2;
        for (var i = 0, len = chart.primaryXAxis.visibleLabels.length; i < len; i++) {
            vector = CoefficientToVector(valueToPolarCoefficient(chart.primaryXAxis.visibleLabels[i].value, chart.primaryXAxis), this.startAngle);
            if (i + 1 < len) {
                vector2 = CoefficientToVector(valueToPolarCoefficient(chart.primaryXAxis.visibleLabels[i + 1].value, chart.primaryXAxis), this.startAngle);
            }
            else {
                vector2 = CoefficientToVector(valueToPolarCoefficient(chart.primaryXAxis.visibleLabels[0].value, chart.primaryXAxis), this.startAngle);
            }
            x1 = this.centerX + radius * vector.x;
            y1 = this.centerY + radius * vector.y;
            x2 = this.centerX + radius * vector2.x;
            y2 = this.centerY + radius * vector2.y;
            majorGrid = majorGrid.concat((i ? 'L ' : 'M ') + x1 + ' ' + y1 + ' ' + 'L ' + x2 + ' ' + y2 + ' ');
        }
        return majorGrid;
    };
    PolarRadarPanel.prototype.drawXAxisGridLine = function (axis, index) {
        var chart = this.chart;
        var tempInterval;
        var vector;
        var majorGrid = '';
        var majorTick = '';
        var minorGirdLine = '';
        var minorTickLine = '';
        var x1 = this.centerX;
        var x2;
        var y1 = this.centerY;
        var y2;
        var minorDirection;
        var length = axis.visibleLabels.length;
        //Gridlines
        for (var i = 0; i < length; i++) {
            tempInterval = axis.visibleLabels[i].value;
            vector = CoefficientToVector(valueToPolarCoefficient(axis.visibleLabels[i].value, axis), this.startAngle);
            x2 = this.centerX + chart.radius * vector.x;
            y2 = this.centerY + chart.radius * vector.y;
            var xLoc = x2 + (axis.majorTickLines.height * vector.x * (axis.tickPosition === 'Inside' ? -1 : 1));
            var yLoc = y2 + (axis.majorTickLines.height * vector.y * (axis.tickPosition === 'Inside' ? -1 : 1));
            majorGrid = 'M ' + x1 + ' ' + y1 + ' ' + 'L ' + x2 + ' ' + y2;
            majorTick = 'M ' + x2 + ' ' + y2 + ' L ' + xLoc + ' ' + yLoc;
            if (axis.minorTicksPerInterval > 0 && (axis.minorGridLines.width > 0 || axis.minorTickLines.width > 0)
                && axis.valueType !== 'Category' && chart.visibleSeries[0].type !== 'Radar') {
                minorDirection = this.drawAxisMinorLine(axis, tempInterval, minorGirdLine, minorTickLine);
                minorGirdLine = minorDirection[0];
                minorTickLine = minorDirection[1];
            }
            this.renderTickLine(axis, index, majorTick, minorTickLine, i);
            this.renderGridLine(axis, index, majorGrid, minorGirdLine, i);
        }
    };
    PolarRadarPanel.prototype.drawAxisMinorLine = function (axis, tempInterval, minorGird, minorTick) {
        var value = tempInterval;
        var x;
        var y;
        var vector;
        var range = axis.visibleRange;
        var direction = [];
        for (var j = 0; j < axis.minorTicksPerInterval; j++) {
            value += (axis.valueType === 'DateTime' ? axis.dateTimeInterval : axis.visibleRange.interval) /
                (axis.minorTicksPerInterval + 1);
            if (inside(value, range)) {
                vector = CoefficientToVector(valueToPolarCoefficient(value, axis), this.startAngle);
                x = this.centerX + this.chart.radius * vector.x;
                y = this.centerY + this.chart.radius * vector.y;
                var tickXSize = x + (axis.minorTickLines.height * vector.x * (axis.tickPosition === 'Inside' ? -1 : 1));
                var tickYSize = y + (axis.minorTickLines.height * vector.y * (axis.tickPosition === 'Inside' ? -1 : 1));
                minorGird = minorGird.concat('M' + ' ' + this.centerX + ' ' + this.centerY
                    + 'L ' + x + ' ' + y);
                minorTick = minorTick.concat('M' + ' ' + x + ' ' + y + 'L' + ' ' + (tickXSize) + ' ' +
                    (tickYSize));
            }
        }
        direction.push(minorGird);
        direction.push(minorTick);
        return direction;
    };
    /**
     * To render the axis label.
     *
     * @param {Axis} axis axis
     * @param {number} index index
     * @returns {void}
     * @private
     */
    PolarRadarPanel.prototype.drawXAxisLabels = function (axis, index) {
        this.visibleAxisLabelRect = [];
        var legendRect;
        if (this.chart.legendModule) {
            legendRect = this.chart.legendModule.legendBounds;
        }
        var chart = this.chart;
        var pointX = 0;
        var pointY = 0;
        var labelElement = chart.renderer.createGroup({ id: chart.element.id + 'AxisLabels' + index });
        var options;
        var vector;
        var labelText;
        var firstLabelX;
        var islabelInside = axis.labelPosition === 'Inside';
        var padding = 5;
        var lastLabelX;
        var label;
        var textAnchor = '';
        var isIntersect;
        var labelRegions = [];
        var isLabelVisible = [];
        isLabelVisible[0] = true;
        var intersectType = axis.labelIntersectAction;
        var ticksbwtLabel = axis.valueType === 'Category' && axis.labelPlacement === 'BetweenTicks' ? 0.5 : 0;
        var radius = chart.radius + axis.majorTickLines.height;
        radius = (islabelInside) ? -radius : radius;
        for (var i = 0, len = axis.visibleLabels.length; i < len; i++) {
            isIntersect = false;
            vector = CoefficientToVector(valueToPolarCoefficient(axis.visibleLabels[i].value + ticksbwtLabel, axis), this.startAngle);
            if (!isNaN(vector.x) && !isNaN(vector.y)) {
                pointX = this.centerX + (radius + axis.majorTickLines.height + padding) * vector.x;
                pointY = this.centerY + (radius + axis.majorTickLines.height + padding) * vector.y;
                textAnchor = parseFloat(pointX.toFixed(1)) === parseFloat(this.centerX.toFixed(1)) ? 'middle' :
                    ((pointX < this.centerX && !islabelInside) || (pointX > this.centerX && islabelInside)) ? 'end' : 'start';
            }
            label = axis.visibleLabels[i];
            labelText = label.text;
            // to trim axis labels based on available size
            if ((axis.enableTrim || intersectType === 'Trim') && !axis.enableWrap) {
                var originalText = axis.visibleLabels[i].originalText;
                var trimText = void 0;
                var size = void 0;
                var labelPosition = axis.labelPosition;
                var chartWidth = chart.availableSize.width;
                var textLength = originalText.length;
                for (var i_1 = textLength - 1; i_1 >= 0; --i_1) {
                    trimText = originalText.substring(0, i_1) + '...';
                    size = measureText(trimText, axis.labelStyle, this.chart.themeStyle.axisLabelFont).width;
                    if (pointX === chartWidth / 2 ? (pointX - size / 2 >= 0 && pointX + size / 2 <= chartWidth) :
                        ((labelPosition === 'Outside' && ((pointX >= chartWidth / 2 && pointX + size <= chartWidth) ||
                            (pointX <= chartWidth / 2 && pointX - size >= 0))) || (labelPosition === 'Inside' &&
                            (pointX + size <= chartWidth / 2 || pointX - size >= chartWidth / 2)))) {
                        labelText = i_1 === textLength - 1 ? originalText : trimText;
                        label.size.width = measureText(labelText, axis.labelStyle, this.chart.themeStyle.axisLabelFont).width;
                        label.text = labelText;
                        break;
                    }
                }
            }
            // fix for label style not working in axisLabelRender event issue
            labelRegions[i] = this.getLabelRegion(pointX, pointY, label, textAnchor);
            if (i === 0) {
                firstLabelX = pointX;
            }
            else if (i === axis.visibleLabels.length - 1 && axis.valueType !== 'Category') {
                lastLabelX = measureText(labelText, axis.labelStyle, this.chart.themeStyle.axisLabelFont).height;
                lastLabelX += pointX;
                labelText = (lastLabelX > firstLabelX) ? '' : labelText;
            }
            // Label intersect action (Hide) perform here
            if (i !== 0 && intersectType === 'Hide') {
                for (var j = i; j >= 0; j--) {
                    j = (j === 0) ? 0 : ((j === i) ? (j - 1) : j);
                    if (isLabelVisible[j] && isOverlap(labelRegions[i], labelRegions[j])) {
                        isIntersect = true;
                        isLabelVisible[i] = false;
                        break;
                    }
                    else {
                        isLabelVisible[i] = true;
                    }
                }
            }
            if (!isIntersect && legendRect) {
                isIntersect = isOverlap(labelRegions[i], legendRect);
                if (isIntersect) {
                    var width = this.getAvailableSpaceToTrim(legendRect, labelRegions[i]);
                    if (width > 0) {
                        labelText = textTrim(width, axis.visibleLabels[i].originalText, axis.labelStyle, this.chart.enableRtl, this.chart.themeStyle.axisLabelFont);
                        isIntersect = false;
                    }
                }
            }
            options = new TextOption(chart.element.id + index + '_AxisLabel_' + i, pointX, pointY, !chart.enableRtl ? textAnchor : textAnchor === 'end' ? 'start' : textAnchor === 'start' ? 'end' : textAnchor, labelText, '', 'central');
            if (isIntersect) {
                continue; // If the label is intersect, the label render is ignored.
            }
            this.visibleAxisLabelRect.push(labelRegions[i]);
            textElement(chart.renderer, options, label.labelStyle, label.labelStyle.color || chart.themeStyle.axisLabelFont.color, labelElement, false, chart.redraw, true, true, null, null, null, null, chart.enableCanvas, null, chart.themeStyle.axisLabelFont);
        }
        if (!this.chart.enableCanvas) {
            this.element.appendChild(labelElement);
        }
    };
    /**
     * To get available space to trim.
     *
     * @param {Rect} legendRect legendRect
     * @param {Rect} labelRect labelRect
     * @returns {number} available space value
     */
    PolarRadarPanel.prototype.getAvailableSpaceToTrim = function (legendRect, labelRect) {
        var legendX1 = legendRect.x;
        var legendX2 = legendX1 + legendRect.width;
        var labelX1 = labelRect.x;
        var labelX2 = labelX1 + labelRect.width;
        var width = 0;
        if (labelX1 > legendX1 && labelX1 < legendX2 && labelX2 > legendX2) {
            width = labelX2 - legendX2;
        }
        else if (labelX1 > legendX1 && labelX1 < legendX2 && labelX2 < legendX2) {
            width = 0;
        }
        else if (labelX2 > legendX1 && labelX2 < legendX2 && labelX1 < legendX1) {
            width = legendX1 - labelX1;
        }
        else if (labelX2 > legendX1 && labelX2 > legendX2 && labelX1 < legendX1) {
            width = legendX1 - labelX1;
        }
        return width;
    };
    /**
     * Getting axis label bounds
     *
     * @param {number} pointX pointX
     * @param {number} pointY pointY
     * @param {VisibleLabels} label label
     * @param {string} anchor anchor
     * @returns {Rect} label region
     */
    PolarRadarPanel.prototype.getLabelRegion = function (pointX, pointY, label, anchor) {
        if (anchor === 'middle') {
            pointX -= (label.size.width / 2);
        }
        else if (anchor === 'end') {
            pointX -= label.size.width;
        }
        pointY -= (label.size.height / 2);
        return new Rect(pointX, pointY, label.size.width, label.size.height);
    };
    PolarRadarPanel.prototype.renderTickLine = function (axis, index, majorTickLine, minorTickLine, gridIndex) {
        var tickOptions;
        var chart = this.chart;
        var direction;
        var element;
        if (axis.majorTickLines.width > 0) {
            element = getElement(chart.element.id + '_MajorTickLine_' + index + '_' + gridIndex);
            direction = element ? element.getAttribute('d') : null;
            tickOptions = new PathOption(chart.element.id + '_MajorTickLine_' + index + '_' + gridIndex, 'transparent', axis.majorTickLines.width, axis.majorTickLines.color || chart.themeStyle.majorTickLine, null, null, majorTickLine);
            /**
             * I252450
             * When we click the center of the marker which is plotted in the axis, selection did not work is fixed
             * Cause: Instead of marker id, axis Tick line id is obtained while clicking
             * Fix: Pointer events set to none for tick lines
             */
            element = chart.renderer.drawPath(tickOptions);
            this.setPointerEventNone(element);
            appendChildElement(chart.enableCanvas, chart.yAxisElements, element, chart.redraw, true, 'x', 'y', null, direction);
        }
        if (axis.minorTickLines.width > 0) {
            element = getElement(chart.element.id + '_MinorTickLine_' + index + '_' + gridIndex);
            direction = element ? element.getAttribute('d') : null;
            tickOptions = new PathOption(chart.element.id + '_MinorTickLine_' + index + '_' + gridIndex, 'transparent', axis.minorTickLines.width, axis.minorTickLines.color || chart.themeStyle.minorTickLine, null, null, minorTickLine);
            /**
             * I252450
             * When we click the center of the marker which is plotted in the axis, selection did not work is fixed
             * Cause: Instead of marker id, axis Tick line id is obtained while clicking
             * Fix: Pointer events set to none for tick lines
             */
            element = chart.renderer.drawPath(tickOptions);
            this.setPointerEventNone(element);
            appendChildElement(chart.enableCanvas, chart.yAxisElements, element, chart.redraw, true, 'x', 'y', null, direction);
        }
    };
    PolarRadarPanel.prototype.renderGridLine = function (axis, index, majorGrid, minorGird, gridIndex) {
        var chart = this.chart;
        var gridOptions;
        var direction;
        var element;
        if (axis.majorGridLines.width > 0) {
            element = getElement(chart.element.id + '_MajorGridLine_' + index + '_' + gridIndex);
            direction = element ? element.getAttribute('d') : null;
            gridOptions = new PathOption(chart.element.id + '_MajorGridLine_' + index + '_' + gridIndex, 'transparent', axis.majorGridLines.width, axis.majorGridLines.color || chart.themeStyle.majorGridLine, null, axis.majorGridLines.dashArray, majorGrid);
            appendChildElement(chart.enableCanvas, this.element, chart.renderer.drawPath(gridOptions), chart.redraw, true, 'x', 'y', null, direction);
        }
        if (axis.minorGridLines.width > 0) {
            element = getElement(chart.element.id + '_MinorGridLine_' + index + '_' + gridIndex);
            direction = element ? element.getAttribute('d') : null;
            gridOptions = new PathOption(chart.element.id + '_MinorGridLine_' + index + '_' + gridIndex, 'transparent', axis.minorGridLines.width, axis.minorGridLines.color || chart.themeStyle.minorGridLine, null, axis.minorGridLines.dashArray, minorGird);
            appendChildElement(chart.enableCanvas, this.element, chart.renderer.drawPath(gridOptions), chart.redraw, true, 'x', 'y', null, direction);
        }
    };
    PolarRadarPanel.prototype.setPointerEventNone = function (element) {
        if (element) {
            element.style.pointerEvents = 'none';
        }
    };
    return PolarRadarPanel;
}(LineBase));
export { PolarRadarPanel };
