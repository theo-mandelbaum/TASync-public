import { createElement, isNullOrUndefined, Animation } from '@syncfusion/ej2-base';
import { DataUtil } from '@syncfusion/ej2-data';
import { subtractThickness, valueToCoefficient, sum, redrawElement, isBreakLabel, ChartLocation, withInBounds, rotateTextSize, removeElement, calculateScrollbarOffset } from '../../common/utils/helper';
import { subArray, inside, appendChildElement, stringToNumber } from '../../common/utils/helper';
import { Thickness, logBase, createZoomingLabels, getElement } from '../../common/utils/helper';
import { Size, Rect, measureText, TextOption, PathOption } from '@syncfusion/ej2-svg-base';
import { textElement, textTrim, getRotatedRectangleCoordinates, isRotatedRectIntersect, isZoomSet } from '../../common/utils/helper';
/**
 * Specifies the Cartesian Axis Layout.
 */
var axisPadding = 10;
var CartesianAxisLayoutPanel = /** @class */ (function () {
    /** @private */
    /**
     * Constructor for creating the chart.
     *
     * @param {Chart} chartModule - Specifies the Chart model.
     * @private */
    function CartesianAxisLayoutPanel(chartModule) {
        this.chart = chartModule;
        this.padding = 5;
    }
    /**
     * Measure the axis size.
     *
     * @returns {void}
     * @private
     */
    CartesianAxisLayoutPanel.prototype.measureAxis = function (rect) {
        var chart = this.chart;
        var chartAreaWidth = chart.chartArea.width ? stringToNumber(chart.chartArea.width, chart.availableSize.width) : null;
        this.crossAt(chart);
        this.seriesClipRect = new Rect(rect.x, rect.y, rect.width, rect.height);
        this.initialClipRect = rect;
        this.leftSize = 0;
        this.rightSize = 0;
        this.topSize = 0;
        this.bottomSize = 0;
        //Measure Axis size with initial Rect
        this.measureRowAxis(chart, this.initialClipRect);
        this.initialClipRect = subtractThickness(this.initialClipRect, new Thickness(this.leftSize, this.rightSize, 0, 0));
        this.measureColumnAxis(chart, this.initialClipRect);
        this.initialClipRect = subtractThickness(this.initialClipRect, new Thickness(0, 0, this.topSize, this.bottomSize));
        if (!this.chart.delayRedraw) {
            this.calculateAxisSize(this.initialClipRect);
        }
        this.leftSize = 0;
        this.rightSize = 0;
        this.topSize = 0;
        this.bottomSize = 0;
        //Measure Axis size with series Rect
        this.measureRowAxis(chart, this.initialClipRect);
        this.seriesClipRect = subtractThickness(this.seriesClipRect, new Thickness(this.leftSize, this.rightSize, 0, 0));
        this.measureColumnAxis(chart, this.initialClipRect);
        this.seriesClipRect = subtractThickness(this.seriesClipRect, new Thickness(0, 0, this.topSize, this.bottomSize));
        if (chartAreaWidth) {
            this.calculateFixedChartArea(chart, chartAreaWidth);
        }
        if (!this.chart.delayRedraw) {
            chart.refreshAxis();
            this.calculateAxisSize(this.seriesClipRect);
        }
    };
    CartesianAxisLayoutPanel.prototype.calculateFixedChartArea = function (chart, chartAreaWidth) {
        this.seriesClipRect.width = chartAreaWidth;
        this.seriesClipRect.x = chart.availableSize.width - chart.margin.right - chartAreaWidth -
            (chart.legendSettings.position === 'Right' ? chart.legendModule.legendBounds.width : 0);
        for (var _i = 0, _a = chart.rows; _i < _a.length; _i++) {
            var item = _a[_i];
            this.seriesClipRect.x -= sum(item.farSizes);
        }
    };
    CartesianAxisLayoutPanel.prototype.measureRowAxis = function (chart, rect) {
        var row;
        this.calculateRowSize(rect);
        for (var _i = 0, _a = chart.rows; _i < _a.length; _i++) {
            var item = _a[_i];
            row = item;
            row.nearSizes = [];
            row.farSizes = [];
            row.insideNearSizes = [];
            row.insideFarSizes = [];
            this.arrangeAxis(row);
            this.measureDefinition(row, chart, new Size(chart.availableSize.width, row.computedHeight));
            if (this.leftSize < sum(row.nearSizes)) {
                this.leftSize = sum(row.nearSizes);
            }
            if (this.rightSize < sum(row.farSizes)) {
                this.rightSize = sum(row.farSizes);
            }
        }
    };
    CartesianAxisLayoutPanel.prototype.measureColumnAxis = function (chart, rect) {
        var column;
        this.calculateColumnSize(rect);
        for (var _i = 0, _a = chart.columns; _i < _a.length; _i++) {
            var item = _a[_i];
            column = item;
            column.farSizes = [];
            column.nearSizes = [];
            column.insideNearSizes = [];
            column.insideFarSizes = [];
            this.arrangeAxis(column);
            this.measureDefinition(column, chart, new Size(column.computedWidth, chart.availableSize.height));
            if (this.bottomSize < sum(column.nearSizes)) {
                this.bottomSize = sum(column.nearSizes);
            }
            if (this.topSize < sum(column.farSizes)) {
                this.topSize = sum(column.farSizes);
            }
        }
    };
    /**
     * Measure the column and row in chart.
     *
     * @returns {void}
     * @private
     */
    CartesianAxisLayoutPanel.prototype.measureDefinition = function (definition, chart, size) {
        var ele;
        for (var _i = 0, _a = definition.axes; _i < _a.length; _i++) {
            var axis = _a[_i];
            ele = axis.scrollbarSettings.height;
            axis.scrollBarHeight = chart.scrollBarModule && chart.zoomModule && chart.zoomSettings.enableScrollbar &&
                axis.enableScrollbarOnZooming && chart.zoomModule.isZoomed && (axis.zoomFactor < 1 || axis.zoomPosition > 0) ? ele : 0;
            axis.scrollBarHeight = chart.scrollBarModule && (chart.zoomModule && chart.zoomSettings.enableScrollbar &&
                axis.enableScrollbarOnZooming && chart.zoomModule.isZoomed && (axis.zoomFactor < 1 || axis.zoomPosition > 0)
                || axis.scrollbarSettings.enable) ? ele : 0;
            axis.getModule(chart);
            axis.baseModule.calculateRangeAndInterval(size, axis);
            definition.computeSize(axis, axis.scrollBarHeight, definition, chart);
        }
        if (definition.farSizes.length > 0) {
            definition.farSizes[definition.farSizes.length - 1] -= axisPadding;
        }
        if (definition.nearSizes.length > 0) {
            definition.nearSizes[definition.nearSizes.length - 1] -= axisPadding;
        }
    };
    /**
     * Measure the axis.
     *
     * @param {Rect} rect - The rect for measuring the axis.
     * @returns {void}
     * @private
     */
    CartesianAxisLayoutPanel.prototype.calculateAxisSize = function (rect) {
        var chart = this.chart;
        var row;
        var column;
        var definition;
        var axis;
        var nearCount = 0;
        var farCount = 0;
        var size = 0;
        var x;
        var y;
        var axisOffset;
        this.calculateRowSize(rect);
        for (var i = 0, len = chart.rows.length; i < len; i++) {
            row = chart.rows[i];
            nearCount = 0;
            farCount = 0;
            for (var j = 0, len_1 = row.axes.length; j < len_1; j++) {
                axis = row.axes[j];
                axisOffset = axis.plotOffset;
                if (axis.rect.height === 0) {
                    axis.rect.height = row.computedHeight;
                    size = 0;
                    for (var k = i + 1, len_2 = i + axis.span; k < len_2; k++) {
                        definition = chart.rows[k];
                        size += definition.computedHeight;
                    }
                    axis.rect.y = (row.computedTop - size) + (axis.plotOffsetTop ? axis.plotOffsetTop : axisOffset);
                    axis.rect.height = (axis.rect.height + size) -
                        (this.getAxisOffsetValue(axis.plotOffsetTop, axis.plotOffsetBottom, axis.plotOffset));
                    axis.rect.width = 0;
                }
                if (axis.isAxisOpposedPosition) {
                    if (axis.labelPosition === 'Inside' && axis.orientation === 'Vertical') {
                        if (farCount > 0) {
                            x = rect.x + rect.width + sum(subArray(row.farSizes, farCount))
                                + axis.maxLabelSize.width + axis.multiLevelLabelHeight + (axis.tickPosition === 'Inside' ? axis.majorTickLines.height : 0) + axis.labelPadding;
                        }
                        else {
                            x = rect.x + rect.width - sum(subArray(row.insideFarSizes, farCount));
                        }
                    }
                    else {
                        x = rect.x + rect.width + sum(subArray(row.farSizes, farCount));
                    }
                    axis.rect.x = axis.rect.x >= x ? axis.rect.x : x;
                    farCount++;
                }
                else {
                    if (axis.labelPosition === 'Inside' && axis.orientation === 'Vertical') {
                        if (nearCount > 0) {
                            x = rect.x - sum(subArray(row.nearSizes, nearCount)) - axis.maxLabelSize.width -
                                axis.multiLevelLabelHeight - (axis.tickPosition === 'Inside' ? axis.majorTickLines.height : 0) - axis.labelPadding;
                        }
                        else {
                            x = rect.x + sum(subArray(row.insideNearSizes, nearCount));
                        }
                    }
                    else {
                        x = rect.x - sum(subArray(row.nearSizes, nearCount));
                    }
                    axis.rect.x = axis.rect.x <= x ? axis.rect.x : x;
                    nearCount++;
                }
            }
        }
        this.calculateColumnSize(rect);
        for (var i = 0, len = chart.columns.length; i < len; i++) {
            column = chart.columns[i];
            nearCount = 0;
            farCount = 0;
            for (var j = 0, len_3 = column.axes.length; j < len_3; j++) {
                axis = column.axes[j];
                axisOffset = axis.plotOffset;
                if (axis.rect.width === 0) {
                    for (var k = i, len_4 = (i + axis.span); k < len_4; k++) {
                        definition = chart.columns[k];
                        axis.rect.width += definition.computedWidth;
                    }
                    axis.rect.x = column.computedLeft + (axis.plotOffsetLeft ? axis.plotOffsetLeft : axisOffset);
                    axis.rect.width -= (this.getAxisOffsetValue(axis.plotOffsetLeft, axis.plotOffsetRight, axis.plotOffset));
                    axis.rect.height = 0;
                }
                if (axis.isAxisOpposedPosition) {
                    if (axis.labelPosition === 'Inside' && axis.orientation === 'Horizontal') {
                        if (farCount > 0) {
                            y = rect.y - sum(subArray(column.farSizes, farCount)) - axis.maxLabelSize.height
                                - axis.multiLevelLabelHeight - (axis.tickPosition === 'Inside' ? axis.majorTickLines.height : 0) - axis.labelPadding;
                        }
                        else {
                            y = rect.y + sum(subArray(column.insideFarSizes, farCount));
                        }
                    }
                    else {
                        y = rect.y - sum(subArray(column.farSizes, farCount));
                    }
                    axis.rect.y = axis.rect.y <= y ? axis.rect.y : y;
                    farCount++;
                }
                else {
                    if (axis.labelPosition === 'Inside' && axis.orientation === 'Horizontal') {
                        if (nearCount > 0) {
                            y = rect.y + rect.height + sum(subArray(column.nearSizes, nearCount)) + axis.maxLabelSize.height
                                + axis.multiLevelLabelHeight + (axis.tickPosition === 'Inside' ? axis.majorTickLines.height : 0) + axis.labelPadding;
                        }
                        else {
                            y = rect.y + rect.height - sum(subArray(column.insideNearSizes, nearCount));
                        }
                    }
                    else {
                        y = rect.y + rect.height + sum(subArray(column.nearSizes, nearCount));
                    }
                    axis.rect.y = axis.rect.y >= y ? axis.rect.y : y;
                    nearCount++;
                }
            }
        }
    };
    /**
     * Measure the axis.
     *
     * @returns {void}
     * @private
     */
    CartesianAxisLayoutPanel.prototype.measure = function () {
        var chart = this.chart;
        var row;
        var column;
        var definition;
        var actualIndex;
        var span;
        for (var _i = 0, _a = chart.axisCollections; _i < _a.length; _i++) {
            var axis = _a[_i];
            //definition.Axes = axis;
            if (axis.orientation === 'Vertical') {
                chart.verticalAxes.push(axis);
                actualIndex = this.getActualRow(axis);
                row = chart.rows[actualIndex];
                this.pushAxis(row, axis);
                span = ((actualIndex + axis.span) > chart.rows.length ? chart.rows.length : (actualIndex + axis.span));
                for (var j = actualIndex + 1; j < span; j++) {
                    definition = chart.rows[j];
                    definition.axes[row.axes.length - 1] = axis;
                    chart.rows[j] = definition;
                }
                chart.rows[actualIndex] = row;
            }
            else {
                chart.horizontalAxes.push(axis);
                actualIndex = this.getActualColumn(axis);
                column = chart.columns[actualIndex];
                this.pushAxis(column, axis);
                span = ((actualIndex + axis.span) > chart.columns.length ? chart.columns.length : (actualIndex + axis.span));
                for (var j = actualIndex + 1; j < span; j++) {
                    definition = chart.columns[j];
                    definition.axes[column.axes.length - 1] = axis;
                    chart.columns[j] = definition;
                }
                chart.columns[actualIndex] = column;
            }
            axis.isRTLEnabled = chart.enableRtl;
            axis.setIsInversedAndOpposedPosition();
        }
    };
    CartesianAxisLayoutPanel.prototype.getAxisOffsetValue = function (position1, position2, plotOffset) {
        var rangeOffset = position1 ? (position1 + (position2 ? position2 :
            plotOffset)) : (position2 ? position2 + plotOffset : 2 * plotOffset);
        return rangeOffset;
    };
    CartesianAxisLayoutPanel.prototype.crossAt = function (chart) {
        for (var _i = 0, _a = chart.axisCollections; _i < _a.length; _i++) {
            var axis = _a[_i];
            if (axis.crossesAt === null) {
                continue;
            }
            if (!axis.crossesInAxis) {
                if (chart.requireInvertedAxis) {
                    axis.crossInAxis = ((axis.orientation === 'Horizontal')) ? chart.primaryXAxis : chart.primaryYAxis;
                }
                else {
                    axis.crossInAxis = ((axis.orientation === 'Horizontal')) ? chart.primaryYAxis : chart.primaryXAxis;
                }
                axis.crossAt = this.updateCrossAt(axis.crossInAxis, axis.crossesAt);
                continue;
            }
            else {
                for (var i = 2, len = chart.axisCollections.length; i < len; i++) {
                    if (axis.crossesInAxis === chart.axisCollections[i].name) {
                        axis.crossInAxis = chart.axisCollections[i];
                        axis.crossAt = this.updateCrossAt(axis.crossInAxis, axis.crossesAt);
                        continue;
                    }
                }
            }
        }
    };
    CartesianAxisLayoutPanel.prototype.updateCrossAt = function (axis, crossAt) {
        switch (axis.valueType) {
            case 'DateTime': {
                var option = {
                    skeleton: 'full',
                    type: 'dateTime'
                };
                var dateParser = this.chart.intl.getDateParser(option);
                var dateFormatter = this.chart.intl.getDateFormat(option);
                return Date.parse(dateParser(dateFormatter(new Date(DataUtil.parse.parseJson({ val: crossAt }).val))));
            }
            case 'Category':
                return parseFloat(crossAt) ? parseFloat(crossAt) : axis.labels.indexOf(crossAt);
            case 'Logarithmic':
                return logBase(crossAt, axis.logBase);
            default:
                return crossAt;
        }
    };
    CartesianAxisLayoutPanel.prototype.pushAxis = function (definition, axis) {
        for (var i = 0, len = definition.axes.length; i <= len; i++) {
            if (!definition.axes[i]) {
                definition.axes[i] = axis;
                break;
            }
        }
    };
    CartesianAxisLayoutPanel.prototype.arrangeAxis = function (definition) {
        var axisCollection = [];
        for (var i = 0, len = definition.axes.length; i <= len; i++) {
            if (definition.axes[i]) {
                axisCollection.push(definition.axes[i]);
            }
        }
        definition.axes = axisCollection;
    };
    CartesianAxisLayoutPanel.prototype.getActualColumn = function (axis) {
        var actualLength = this.chart.columns.length;
        var pos = axis.columnIndex;
        var result = pos >= actualLength ? actualLength - 1 : (pos < 0 ? 0 : pos);
        return result;
    };
    CartesianAxisLayoutPanel.prototype.getActualRow = function (axis) {
        var actualLength = this.chart.rows.length;
        var pos = axis.rowIndex;
        var result = pos >= actualLength ? actualLength - 1 : (pos < 0 ? 0 : pos);
        return result;
    };
    /**
     * Measure the row size.
     *
     * @returns {void}
     */
    CartesianAxisLayoutPanel.prototype.calculateRowSize = function (rect) {
        /** Calculate row size */
        var chart = this.chart;
        var row;
        var rowTop = rect.y + rect.height;
        var height = 0;
        var remainingHeight = Math.max(0, rect.height);
        for (var i = 0, len = chart.rows.length; i < len; i++) {
            row = chart.rows[i];
            if (row.height.indexOf('%') !== -1) {
                height = Math.min(remainingHeight, (rect.height * parseInt(row.height, 10) / 100));
            }
            else {
                height = Math.min(remainingHeight, parseInt(row.height, 10));
            }
            height = (i !== (len - 1)) ? height : remainingHeight;
            row.computedHeight = height;
            rowTop -= height;
            row.computedTop = rowTop;
            remainingHeight -= height;
        }
    };
    /**
     * Measure the row size.
     *
     * @param {Rect} rect rect
     * @returns {void}
     */
    CartesianAxisLayoutPanel.prototype.calculateColumnSize = function (rect) {
        /** Calculate column size */
        var chart = this.chart;
        var column;
        var columnLeft = rect.x;
        var width = 0;
        var remainingWidth = Math.max(0, rect.width);
        for (var i = 0, len = chart.columns.length; i < len; i++) {
            column = chart.columns[i];
            if (column.width.indexOf('%') !== -1) {
                width = Math.min(remainingWidth, (rect.width * parseInt(column.width, 10) / 100));
            }
            else {
                width = Math.min(remainingWidth, parseInt(column.width, 10));
            }
            width = (i !== (len - 1)) ? width : remainingWidth;
            column.computedWidth = width;
            column.computedLeft = columnLeft;
            columnLeft += width;
            remainingWidth -= width;
        }
    };
    /**
     * To render the axis element.
     *
     * @returns {void}
     * @private
     */
    CartesianAxisLayoutPanel.prototype.renderAxes = function () {
        var chart = this.chart;
        var axis;
        var axisElement = chart.renderer.createGroup({ id: chart.element.id + 'AxisInsideCollection' });
        var axisLineElement = chart.renderer.createGroup({ id: chart.element.id + 'AxisOutsideCollection' });
        if (axisLineElement) {
            axisLineElement.setAttribute('aria-hidden', 'true');
        }
        var outsideElement;
        var isInside;
        if (chart.scrollBarModule) {
            chart.scrollBarModule.topScrollBarCount = 0;
            chart.scrollBarModule.bottomScrollBarCount = 0;
            chart.scrollBarModule.leftScrollBarCount = 0;
            chart.scrollBarModule.rightScrollBarCount = 0;
        }
        for (var i = 0, len = chart.axisCollections.length; i < len; i++) {
            var axisVisibility = true;
            axis = chart.axisCollections[i];
            this.element = chart.renderer.createGroup({ id: chart.element.id + 'AxisGroup' + i + 'Inside' });
            if (this.element) {
                this.element.setAttribute('aria-hidden', 'true');
            }
            outsideElement = chart.renderer.createGroup({ id: chart.element.id + 'AxisGroup' + i + 'Outside' });
            if (outsideElement) {
                outsideElement.setAttribute('aria-hidden', 'true');
            }
            for (var _i = 0, _a = axis.series; _i < _a.length; _i++) {
                var series = _a[_i];
                if (axis.name === series.yAxisName || axis.name === series.xAxisName) {
                    axisVisibility = series.visible;
                    if (series.category === 'Pareto' && !series.paretoOptions.showAxis && series.type === 'Line') {
                        axisVisibility = false;
                    }
                    if (!axisVisibility) {
                        continue;
                    }
                    else {
                        break;
                    }
                }
            }
            if (!axisVisibility) {
                if (axis.zoomingScrollBar) {
                    axis.zoomingScrollBar.removeScrollSvg();
                }
                continue;
            }
            isInside = this.findAxisPosition(axis);
            this.drawAxis(axis, i, isInside, outsideElement, axisElement, axisLineElement);
        }
        this.drawPaneLines(chart, axisElement);
        appendChildElement(chart.enableCanvas, chart.svgObject, axisElement, chart.redraw);
        return axisLineElement;
    };
    /**
     * To render the axis scrollbar
     *
     * @param {Chart} chart chart
     * @param {Axis} axis axis
     * @returns {void}
     */
    CartesianAxisLayoutPanel.prototype.renderScrollbar = function (chart, axis) {
        var isZoomed = isNullOrUndefined(chart.zoomModule) ? false : chart.zoomModule.isZoomed;
        if (!axis.zoomingScrollBar) {
            chart.scrollBarModule.injectTo(axis, chart);
        }
        if (((isZoomed && (axis.zoomFactor < 1 || axis.zoomPosition > 0)) || (axis.scrollbarSettings.enable &&
            (axis.zoomFactor <= 1 || axis.zoomPosition >= 0))) &&
            (!axis.zoomingScrollBar.isScrollUI)) {
            if (!chart.scrollElement) {
                chart.scrollElement = redrawElement(chart.redraw, chart.element.id + '_scrollElement') || createElement('div', { id: chart.element.id + '_scrollElement' });
            }
            appendChildElement(false, chart.scrollElement, axis.zoomingScrollBar.render(true), true);
        }
        else if (axis.zoomFactor === 1 && axis.zoomPosition === 0 && axis.zoomingScrollBar.svgObject && !axis.scrollbarSettings.enable) {
            axis.zoomingScrollBar.destroy();
        }
        else if (axis.zoomingScrollBar.svgObject) {
            var topOffset = (axis.isAxisOpposedPosition && axis.orientation === 'Horizontal' ? -16 : 0)
                + axis.rect.y + Math.max(0.5, axis.lineStyle.width / 2);
            var leftOffset = (axis.isAxisOpposedPosition && axis.orientation !== 'Horizontal' ? 16 : 0)
                + axis.rect.x - (axis.orientation === 'Vertical' ? axis.scrollbarSettings.height : 0);
            if (axis.orientation !== 'Horizontal' && (axis.scrollbarSettings.position === 'Left' || axis.scrollbarSettings.position === 'Right')) {
                leftOffset = calculateScrollbarOffset(axis.zoomingScrollBar, false);
            }
            else if (axis.orientation === 'Horizontal' && (axis.scrollbarSettings.position === 'Top' || axis.scrollbarSettings.position === 'Bottom')) {
                topOffset = calculateScrollbarOffset(axis.zoomingScrollBar, true);
            }
            axis.zoomingScrollBar.svgObject.style.top = topOffset + 'px';
            axis.zoomingScrollBar.svgObject.style.left = leftOffset + 'px';
        }
        if (axis.zoomingScrollBar.isScrollUI) {
            axis.zoomingScrollBar.isScrollUI = false;
        }
    };
    /**
     * Draws pane lines for the specified chart.
     *
     * @param {Chart} chart -The chart for which pane lines are to be drawn.
     * @param {Element} [axisElement] -Optional. The axis element to which the pane lines are associated.
     * @returns {void}
     * @private
     */
    CartesianAxisLayoutPanel.prototype.drawPaneLines = function (chart, axisElement) {
        this.element = chart.renderer.createGroup({ id: chart.element.id + 'DefinitionLine' });
        for (var j = 0, len = chart.rows.length; j < len; j++) {
            var row = chart.rows[j];
            if (row.border.color) {
                this.drawBottomLine(row, j, true);
            }
        }
        for (var j = 0, len = chart.columns.length; j < len; j++) {
            var column = chart.columns[j];
            if (column.border.color) {
                this.drawBottomLine(column, j, false);
            }
        }
        axisElement = axisElement ? axisElement : getElement(chart.element.id + 'AxisInsideCollection');
        if (!this.chart.enableCanvas) {
            axisElement.appendChild(this.element);
        }
    };
    /**
     * Draws an axis for the specified axis configuration.
     *
     * @private
     * @param {Axis} axis -The axis configuration to be drawn.
     * @param {number} index -The index of the axis.
     * @param {boolean} isInside -Indicates whether the axis is inside or outside the plot area.
     * @param {Element} outsideElement -The element where the axis should be drawn if it's outside the plot area.
     * @param {Element} axisElement -The element representing the axis.
     * @param {Element} axisLineElement -The element representing the axis line.
     * @returns {void}
     */
    CartesianAxisLayoutPanel.prototype.drawAxis = function (axis, index, isInside, outsideElement, axisElement, axisLineElement) {
        axis.updateCrossValue();
        var axisName = '';
        if (axis.orientation === 'Horizontal') {
            if (axis.visible && axis.internalVisibility && axis.lineStyle.width > 0) {
                this.drawAxisLine(axis, index, axis.plotOffset, 0, 0, 0, axis.plotOffsetLeft, axis.plotOffsetRight, isInside ? outsideElement : this.element, axis.updatedRect);
            }
            axisName = 'X';
        }
        else {
            if (axis.visible && axis.internalVisibility && axis.lineStyle.width > 0) {
                this.drawAxisLine(axis, index, 0, axis.plotOffset, axis.plotOffsetBottom, axis.plotOffsetTop, 0, 0, isInside ? outsideElement : this.element, axis.updatedRect);
            }
            axisName = 'Y';
        }
        if (axis.majorGridLines.width > 0 || axis.majorTickLines.width > 0 || axis.minorTickLines.width > 0 ||
            axis.minorGridLines.width > 0) {
            this['draw' + axisName + 'AxisGridLine'](axis, index, (isInside || axis.tickPosition === 'Inside') ? outsideElement : this.element, axis.updatedRect);
        }
        if (axis.visible && axis.internalVisibility) {
            this['draw' + axisName + 'AxisLabels'](axis, index, (isInside || axis.labelPosition === 'Inside') ? outsideElement : this.element, (axis.placeNextToAxisLine ? axis.updatedRect : axis.rect));
            this['draw' + axisName + 'AxisBorder'](axis, index, (isInside || axis.labelPosition === 'Inside') ? outsideElement : this.element, (axis.placeNextToAxisLine ? axis.updatedRect : axis.rect));
            this['draw' + axisName + 'AxisTitle'](axis, index, isInside ? outsideElement : this.element, (axis.placeNextToAxisLine ? axis.updatedRect : axis.rect));
        }
        if (!this.chart.enableCanvas) {
            axisElement.appendChild(this.element);
            if (outsideElement && outsideElement.childNodes.length > 0) {
                axisLineElement.appendChild(outsideElement);
            }
        }
        if (this.chart.scrollBarModule && ((this.chart.zoomSettings.enableScrollbar && axis.enableScrollbarOnZooming) ||
            axis.scrollbarSettings.enable)) {
            this.renderScrollbar(this.chart, axis);
        }
        else {
            if (axis.zoomingScrollBar) {
                axis.zoomingScrollBar.destroy();
            }
        }
    };
    /**
     * To find the axis position
     *
     * @param {Axis} axis axis
     * @returns {boolean} axis position
     * @private
     */
    CartesianAxisLayoutPanel.prototype.findAxisPosition = function (axis) {
        return axis.crossAt !== null && axis.isInside(axis.crossInAxis.visibleRange);
    };
    /**
     * To render the bootom line of the columns and rows
     *
     * @param {Row | Column} definition definition
     * @param {number} index index
     * @param {boolean} isRow isRow
     * @returns {void}
     */
    CartesianAxisLayoutPanel.prototype.drawBottomLine = function (definition, index, isRow) {
        var chart = this.chart;
        var optionsLine = {};
        var x1;
        var x2;
        var y1;
        var y2;
        var definitionName;
        if (isRow) {
            definition = definition;
            y1 = y2 = definition.computedTop + definition.computedHeight;
            x1 = this.seriesClipRect.x;
            x2 = x1 + this.seriesClipRect.width;
            definitionName = 'Row';
        }
        else {
            definition = definition;
            x1 = x2 = definition.computedLeft;
            y1 = this.seriesClipRect.y;
            y2 = y1 + this.seriesClipRect.height;
            definitionName = 'Column';
        }
        optionsLine = {
            'id': chart.element.id + '_AxisBottom_' + definitionName + index,
            x1: x1,
            y1: y1,
            x2: x2,
            y2: y2,
            'stroke-width': definition.border.width,
            'stroke': definition.border.color
        };
        this.htmlObject = chart.renderer.drawLine(optionsLine);
        appendChildElement(chart.enableCanvas, this.element, this.htmlObject);
    };
    /**
     * To render the axis line
     *
     * @param {Axis} axis axis
     * @param {number} index index
     * @param {number} plotX plotX
     * @param {number} plotY plotY
     * @param {number} plotBottom plotBottom
     * @param {number} plotTop plotTop
     * @param {number} plotLeft plotLeft
     * @param {number} plotRight plotRight
     * @param {Element} parent parent
     * @param {Rect} rect rect
     * @returns {void}
     */
    CartesianAxisLayoutPanel.prototype.drawAxisLine = function (axis, index, plotX, plotY, plotBottom, plotTop, plotLeft, plotRight, parent, rect) {
        var chart = this.chart;
        var optionsLine = {};
        var element = getElement(chart.element.id + 'AxisLine_' + index);
        var direction = element ? element.getAttribute('d') : '';
        element = null;
        optionsLine = {
            'id': chart.element.id + 'AxisLine_' + index,
            'd': 'M ' + (rect.x - plotX - plotLeft) + ' ' + (rect.y - plotY - plotTop) +
                ' L ' + (rect.x + rect.width + plotX + plotRight) + ' ' + (rect.y + rect.height + plotY + plotBottom),
            'stroke-dasharray': axis.lineStyle.dashArray,
            'stroke-width': axis.lineStyle.width,
            'stroke': axis.lineStyle.color || chart.themeStyle.axisLine
        };
        this.htmlObject = chart.renderer.drawPath(optionsLine);
        appendChildElement(chart.enableCanvas, parent, this.htmlObject, chart.redraw, true, 'x', 'y', null, direction, null, null, null, chart.duration);
    };
    /**
     * To render the yAxis grid line
     *
     * @param {Axis} axis axis
     * @param {number} index index
     * @param {Element} parent parent
     * @param {Rect} rect rect
     * @returns {void}
     */
    CartesianAxisLayoutPanel.prototype.drawYAxisGridLine = function (axis, index, parent, rect) {
        var isLogAxis = axis.valueType === 'Logarithmic';
        var isCategoryAxis = axis.valueType.indexOf('Category') > -1;
        var tempInterval;
        var pointY = 0;
        var majorGrid = '';
        var majorTick = '';
        var minorGridDirection;
        var isOpposed = axis.isAxisOpposedPosition;
        var tickSize = isOpposed ? axis.majorTickLines.height : -axis.majorTickLines.height;
        var axisLineSize = (isOpposed) ? axis.lineStyle.width * 0.5 : -axis.lineStyle.width * 0.5;
        var ticksbwtLabel = (axis.valueType === 'Category' && axis.labelPlacement === 'BetweenTicks') ?
            0.5 : 0;
        var scrollBarHeight = (isNullOrUndefined(axis.crossesAt) && axis.scrollbarSettings.position !== 'Right' && axis.scrollbarSettings.position !== 'Left') ? isOpposed ? axis.scrollBarHeight :
            -axis.scrollBarHeight : 0;
        var isTickInside = axis.tickPosition === 'Inside';
        var ticks = isTickInside ? (rect.x - tickSize - axisLineSize) : (rect.x + tickSize + axisLineSize + scrollBarHeight);
        var length = axis.visibleLabels.length;
        var chartThemeStyle = this.chart.themeStyle;
        var count = 1;
        if (axis.valueType.indexOf('Category') > -1 && axis.labelPlacement === 'BetweenTicks' && length > 0 && !this.chart.stockChart) {
            length += 1;
        }
        var minorGridLines = axis.minorGridLines;
        var minorTickLines = axis.minorTickLines;
        //Gridlines
        for (var i = 0; i < length; i++) {
            tempInterval = !axis.visibleLabels[i] ? (axis.visibleLabels[i - 1].value + axis.visibleRange.interval) - ticksbwtLabel
                : axis.visibleLabels[i].value - ticksbwtLabel;
            pointY = valueToCoefficient(tempInterval, axis) * rect.height;
            pointY = (pointY * -1) + (rect.y + rect.height);
            if (pointY >= rect.y && (rect.y + rect.height) >= pointY) {
                if (this.chart.redraw && !this.chart.enableCanvas && this.chart.zoomRedraw && axis.visible && axis.majorGridLines.width && i !== 0 && !getElement(this.chart.element.id + '_MajorGridLine_' + index + '_' + i)) {
                    majorGrid = 'M ' + this.seriesClipRect.x + ' ' + (this.seriesClipRect.y + (axis.isInversed ? this.seriesClipRect.height + ((this.seriesClipRect.height / (i ? i : 1)) * count) : -((this.seriesClipRect.height / (i ? i : 1)) * count))) +
                        ' L ' + (this.seriesClipRect.x + this.seriesClipRect.width) + ' ' + (this.seriesClipRect.y + (axis.isInversed ? this.seriesClipRect.height + ((this.seriesClipRect.height / (i ? i : 1)) * count) : -((this.seriesClipRect.height / (i ? i : 1)) * count)));
                    this.updateAxisElement(axis, index, majorGrid, i, '_MajorGridLine_', this.element, false);
                    getElement(parent.id).appendChild(this.element.childNodes[this.element.childNodes.length - 1]);
                }
                if ((inside(tempInterval, axis.visibleRange)) || this.isBorder(axis, i, pointY)) {
                    majorGrid = 'M ' + this.seriesClipRect.x + ' ' + (pointY) +
                        ' L ' + (this.seriesClipRect.x + this.seriesClipRect.width) + ' ' + pointY;
                    this.renderGridLine(axis, index, majorGrid, axis.majorGridLines, '_MajorGridLine_', i, this.element, chartThemeStyle.majorGridLine, axis.majorGridLines.dashArray);
                }
                if (this.chart.redraw && this.chart.zoomRedraw && axis.majorTickLines.width && i !== 0 && !getElement(this.chart.element.id + '_MajorTickLine_' + index + '_' + i) && !this.chart.enableCanvas && axis.visible) {
                    majorTick = 'M ' + this.seriesClipRect.x + ' ' + (this.seriesClipRect.y + (axis.isInversed ? this.seriesClipRect.height + ((this.seriesClipRect.height / (i ? i : 1)) * count) : -((this.seriesClipRect.height / (i ? i : 1)) * count))) +
                        ' L ' + ticks + ' ' + (this.seriesClipRect.y + (axis.isInversed ? this.seriesClipRect.height + ((this.seriesClipRect.height / (i ? i : 1)) * count) : -((this.seriesClipRect.height / (i ? i : 1)) * count)));
                    this.updateAxisElement(axis, index, majorTick, i, '_MajorTickLine_', parent, false);
                    getElement(parent.id).appendChild(this.element.childNodes[this.element.childNodes.length - 1]);
                    count += 1;
                }
                majorTick = 'M ' + (rect.x + axisLineSize + (isTickInside ? scrollBarHeight : 0)) + ' ' + pointY +
                    ' L ' + (ticks) + ' ' + pointY;
                this.renderGridLine(axis, index, majorTick, axis.majorTickLines, '_MajorTickLine_', i, parent, chartThemeStyle.majorTickLine);
                if ((minorGridLines.width > 0 || minorTickLines.width > 0) && axis.minorTicksPerInterval > 0) {
                    if (i === 0 && isZoomSet(axis) && !isLogAxis && !isCategoryAxis) {
                        this.renderMinorGridOnZooming(axis, tempInterval, rect, i, index, chartThemeStyle, parent);
                    }
                    minorGridDirection = this.drawAxisMinorLine(axis, tempInterval, rect, i);
                    this.renderGridLine(axis, index, minorGridDirection[0], minorGridLines, '_MinorGridLine_', i, this.element, chartThemeStyle.minorGridLine, minorGridLines.dashArray);
                    this.renderGridLine(axis, index, minorGridDirection[1], minorTickLines, '_MinorTickLine_', i, parent, chartThemeStyle.minorTickLine);
                    if (i === length - 1 && isZoomSet(axis) && isLogAxis && !isCategoryAxis) {
                        this.renderMinorGridOnZooming(axis, (tempInterval + axis.visibleRange.interval), rect, i, index, chartThemeStyle, parent);
                    }
                }
            }
        }
        if (length && this.previousYLabel > length && !this.chart.enableCanvas && axis.visible &&
            this.chart.zoomRedraw && this.chart.redraw) {
            for (var i = length; i < this.previousYLabel; i++) {
                var pointYValue = this.seriesClipRect.y + (axis.isInversed ? ((this.seriesClipRect.height / length) *
                    ((i - length) + 1)) + this.seriesClipRect.height : -((this.seriesClipRect.height / length) * ((i - length) + 1)));
                if (axis.majorGridLines.width) {
                    majorGrid = 'M ' + this.seriesClipRect.x + ' ' + +pointYValue +
                        ' L ' + (this.seriesClipRect.x + this.seriesClipRect.width) + ' ' + pointYValue;
                    this.updateAxisElement(axis, index, majorGrid, i, '_MajorGridLine_', this.element, true);
                }
                if (axis.majorTickLines.width) {
                    majorTick = 'M ' + this.seriesClipRect.x + ' ' + pointYValue +
                        ' L ' + ticks + ' ' + pointYValue;
                    this.updateAxisElement(axis, index, majorTick, i, '_MajorTickLine_', parent, true);
                }
            }
        }
    };
    /**
     * To check the border of the axis
     *
     * @param {Axis} axis axis
     * @param {number} index index
     * @param {number} value value
     * @returns {boolean} check the border of the axis
     */
    CartesianAxisLayoutPanel.prototype.isBorder = function (axis, index, value) {
        var border = this.chart.chartArea.border;
        var rect = this.seriesClipRect;
        var orientation = axis.orientation;
        var start = (orientation === 'Horizontal') ? rect.x : rect.y;
        var size = (orientation === 'Horizontal') ? rect.width : rect.height;
        var startIndex = (orientation === 'Horizontal') ? 0 : axis.visibleLabels.length - 1;
        var endIndex = (orientation === 'Horizontal') ? axis.visibleLabels.length - 1 : 0;
        if (axis.plotOffset > 0) {
            return true;
        }
        else if ((value === start || value === (start + size)) && (border.width <= 0 || border.color === 'transparent')) {
            return true;
        }
        else if ((value !== start && index === startIndex) || (value !== (start + size) && index === endIndex)) {
            return true;
        }
        return false;
    };
    /**
     * To render the yAxis label
     *
     * @param {Axis} axis axis
     * @param {number} index index
     * @param {Element} parent parent
     * @param {Rect} rect rect
     * @returns {void}
     * @private
     */
    CartesianAxisLayoutPanel.prototype.drawYAxisLabels = function (axis, index, parent, rect) {
        var chart = this.chart;
        var label;
        var pointX = 0;
        var pointY = 0;
        var elementSize;
        var labelSpace = axis.labelPadding;
        var options;
        var isAxisBreakLabel;
        var isLabelInside = axis.labelPosition === 'Inside';
        var isOpposed = axis.isAxisOpposedPosition;
        var RotatedWidth;
        var tickSpace = axis.labelPosition === axis.tickPosition ? axis.majorTickLines.height : 0;
        var padding = tickSpace + labelSpace + axis.lineStyle.width * 0.5;
        var angle = axis.angle % 360;
        var isVerticalAngle = (angle === -90 || angle === 90 || angle === 270 || angle === -270);
        padding += (isVerticalAngle) ? (isLabelInside ? 5 : -5) : 0;
        padding = (isOpposed) ? padding : -padding;
        var labelElement = chart.renderer.createGroup({ id: chart.element.id + 'AxisLabels' + index });
        var scrollBarHeight = (isNullOrUndefined(axis.crossesAt) && axis.scrollbarSettings.position !== 'Left' && axis.scrollbarSettings.position !== 'Right') ? axis.scrollBarHeight * (isOpposed ? 1 : -1) : 0;
        var textHeight;
        var textPadding;
        var maxLineWidth;
        var pixel = 10;
        var isInverse = axis.isAxisInverse;
        var count = 1;
        var previousEnd = isInverse ? rect.y : (rect.y + rect.height);
        var labelPadding;
        var intervalLength;
        var labelHeight;
        var yAxisLabelX;
        var isLabelOnAxisLineLeft = ((!isOpposed && !isLabelInside) || (isOpposed && isLabelInside));
        if (isLabelInside) {
            labelPadding = !isLabelOnAxisLineLeft ? -padding : padding;
        }
        else {
            labelPadding = !isLabelOnAxisLineLeft ? -padding + (chart.enableRtl ? -scrollBarHeight : scrollBarHeight) :
                padding + (chart.enableRtl ? -scrollBarHeight : scrollBarHeight);
        }
        var sizeWidth = [];
        var breakLabelSizeWidth = [];
        axis.visibleLabels.map(function (item) {
            sizeWidth.push(item.size['width']);
            breakLabelSizeWidth.push(item.breakLabelSize['width']);
        });
        var LabelMaxWidth = Math.max.apply(Math, sizeWidth);
        var breakLabelMaxWidth = Math.max.apply(Math, breakLabelSizeWidth);
        RotatedWidth = LabelMaxWidth;
        if (angle >= -45 && angle <= 45 && angle !== 0) {
            RotatedWidth = LabelMaxWidth * Math.cos(angle * Math.PI / 180);
            if (RotatedWidth < 0) {
                RotatedWidth = -RotatedWidth;
            }
        }
        for (var i = 0, len = axis.visibleLabels.length; i < len; i++) {
            label = axis.visibleLabels[i];
            isAxisBreakLabel = isBreakLabel(axis.visibleLabels[i].originalText);
            elementSize = isAxisBreakLabel ? axis.visibleLabels[i].breakLabelSize : axis.visibleLabels[i].size;
            pointY = (valueToCoefficient(axis.visibleLabels[i].value, axis) * rect.height) + (chart.stockChart ? 7 : 0);
            pointY = Math.floor((pointY * -1) + (rect.y + rect.height));
            textHeight = ((elementSize.height / 8) * axis.visibleLabels[i].text.length / 2);
            textPadding = (chart.requireInvertedAxis && axis.labelPosition === 'Inside') ? 0 : ((elementSize.height / 4) * 3) + 3;
            intervalLength = rect.height / axis.visibleLabels.length;
            labelHeight = ((axis.labelIntersectAction === 'Trim' || axis.labelIntersectAction === 'Wrap') && angle !== 0 &&
                elementSize.width > intervalLength) ? intervalLength : elementSize.width;
            pointY = (isAxisBreakLabel ? (axis.labelPosition === 'Inside' ? (pointY - (elementSize.height / 2) - textHeight + textPadding)
                : (pointY - textHeight)) : (axis.labelPosition === 'Inside' ? pointY + textPadding : pointY));
            if (axis.labelPosition === 'Inside' && ((i === 0 && !axis.isInversed) || (i === len - 1 && axis.isInversed))) {
                if (chart.stockChart) {
                    pointY -= (textPadding);
                }
                else {
                    pointY -= (textPadding - ((chart.requireInvertedAxis && axis.labelPosition === 'Inside') ? 0 : (axis.opposedPosition ? -padding : padding)));
                }
            }
            if (axis.majorGridLines.width > axis.majorTickLines.width) {
                maxLineWidth = axis.majorGridLines.width;
            }
            else {
                maxLineWidth = axis.majorTickLines.width;
            }
            if (axis.labelStyle.textAlignment === 'Far') {
                pointY = pointY - maxLineWidth - pixel;
            }
            else if (axis.labelStyle.textAlignment === 'Near') {
                pointY = pointY + maxLineWidth + pixel;
            }
            // label X value adjustment (Start)
            if (isLabelInside) {
                yAxisLabelX = labelPadding + ((angle === 0 ? elementSize.width :
                    (isAxisBreakLabel ? breakLabelMaxWidth : LabelMaxWidth)) / 2);
            }
            else {
                yAxisLabelX = labelPadding - ((angle === 0 ? elementSize.width :
                    (isAxisBreakLabel ? breakLabelMaxWidth : RotatedWidth)) / 2);
            }
            if (axis.enableWrap && chart.requireInvertedAxis && angle && ((!axis.opposedPosition && axis.labelPosition === 'Inside') || (axis.opposedPosition && axis.labelPosition === 'Outside'))) {
                yAxisLabelX = axis.opposedPosition ? yAxisLabelX - LabelMaxWidth / 2 : yAxisLabelX + LabelMaxWidth / 2;
            }
            pointX = isOpposed ? (axis.scrollBarHeight !== 0 && axis.scrollbarSettings.position !== 'Right' && axis.scrollbarSettings.position !== 'Left') ? ((rect.x + axis.scrollBarHeight + padding) - yAxisLabelX) :
                (rect.x - yAxisLabelX) : (rect.x + yAxisLabelX);
            if (isVerticalAngle) {
                pointX += (isOpposed) ? 5 : -5;
            }
            yAxisLabelX = labelPadding;
            options = new TextOption(chart.element.id + index + '_AxisLabel_' + i, pointX, pointY, 'middle', label.text, '', 'middle', angle);
            switch (axis.edgeLabelPlacement) {
                case 'None':
                    break;
                case 'Hide':
                    if (((i === 0 || (isInverse && i === len - 1)) && options.y > rect.y) ||
                        (((i === len - 1) || (isInverse && i === 0)) && options.y - elementSize.height * 0.5 < rect.y)) {
                        options.text = '';
                    }
                    break;
                case 'Shift':
                    if ((i === 0 || (isInverse && i === len - 1)) && options.y > rect.y + rect.height) {
                        options.y = pointY = rect.y + rect.height;
                    }
                    else if (((i === len - 1) || (isInverse && i === 0)) &&
                        (options.y <= 0)) {
                        options.y = pointY = rect.y + elementSize.height * 0.5;
                    }
                    break;
            }
            // ------- Hide Calculation (Start) -------------
            var previousYValue = options.y;
            var currentYValue = options.y - labelHeight;
            if (isAxisBreakLabel) {
                previousYValue = (options.y - (labelHeight / 2));
                currentYValue = options.y + (labelHeight / 2);
            }
            if ((angle === 90 || angle === 270) && axis.labelIntersectAction === 'Hide' && i !== 0 &&
                (!isInverse ? previousYValue >= previousEnd : currentYValue <= previousEnd)) {
                continue;
            }
            previousEnd = isInverse ? previousYValue : currentYValue;
            // ------- Hide Calculation (End) -------------
            options.transform = 'rotate(' + angle + ',' + pointX + ',' + pointY + ')';
            if (this.chart.redraw && this.chart.zoomRedraw && !getElement(options.id) && !this.chart.enableCanvas && axis.visible) {
                var optionsY = options.y;
                options.y = this.seriesClipRect.y + (axis.isInversed ? this.seriesClipRect.height + ((this.seriesClipRect.height /
                    (i ? i : 1)) * count) : -((this.seriesClipRect.height / (i ? i : 1)) * count));
                this.updateAxisElement(axis, index, '', i, '_AxisLabel_', labelElement, false, options, label);
                options.y = optionsY;
                count += 1;
            }
            textElement(chart.renderer, options, label.labelStyle, label.labelStyle.color || chart.themeStyle.axisLabelFont.color, labelElement, false, chart.redraw, true, true, chart.duration, null, null, null, chart.enableCanvas, null, chart.themeStyle.axisLabelFont, new ChartLocation(pointX, pointY));
        }
        if (this.previousYLabel && axis.visibleLabels.length && this.previousYLabel > axis.visibleLabels.length
            && !this.chart.enableCanvas && axis.visible && this.chart.zoomRedraw && chart.redraw && options.text) {
            for (var i = axis.visibleLabels.length; i < this.previousYLabel; i++) {
                options.y = this.seriesClipRect.y + (axis.isInversed ? this.seriesClipRect.height +
                    ((this.seriesClipRect.height / axis.visibleLabels.length) * ((i - axis.visibleLabels.length) + 1)) :
                    -((this.seriesClipRect.height / axis.visibleLabels.length) * ((i - axis.visibleLabels.length) + 1)));
                options.id = chart.element.id + index + '_AxisLabel_' + i;
                this.updateAxisElement(axis, index, '', i, '_AxisLabel_', labelElement, true, options, label);
            }
        }
        else {
            this.previousYLabel = axis.visibleLabels.length;
        }
        if (!this.chart.enableCanvas) {
            if (!chart.delayRedraw) {
                appendChildElement(chart.enableCanvas, parent, labelElement, chart.redraw);
            }
            else if (axis.visible && axis.internalVisibility) {
                this.createZoomingLabel(this.chart, labelElement, axis, index, rect);
            }
        }
    };
    /**
     * Animates the template element.
     *
     * @param {Axis} axis axis
     * @param {Element} element - The element to animate.
     * @param {number} duration - The duration of the animation.
     * @param {boolean} label - Label.
     * @param {Rect} bounds - The bounding rectangle.
     * @param {boolean} isRemove isRemoved
     * @param {number} i index of the element
     * @returns {void}
     * @private
     */
    CartesianAxisLayoutPanel.prototype.rangeAnimate = function (axis, element, duration, label, bounds, isRemove, i) {
        var _this = this;
        if (element) {
            new Animation({}).animate(element, {
                duration: duration,
                progress: function () {
                    var animateElement = getElement(element.id);
                    animateElement.style.animation = '';
                    if (label) {
                        if (withInBounds(parseFloat(animateElement.getAttribute('x')), parseFloat(animateElement.getAttribute('y')), bounds)) {
                            animateElement.style.visibility = 'visible';
                        }
                        else {
                            animateElement.style.visibility = 'hidden';
                        }
                    }
                    else {
                        var direction = animateElement.getAttribute('d').split(' ');
                        if (withInBounds(parseFloat(direction[1]), parseFloat(direction[2]), bounds)) {
                            animateElement.style.visibility = 'visible';
                        }
                        else {
                            animateElement.style.visibility = 'hidden';
                        }
                    }
                },
                end: function () {
                    var animateElement = getElement(element.id);
                    animateElement.style.visibility = '';
                    if (isRemove && i >= axis.visibleLabels.length) {
                        removeElement(animateElement);
                        if (label) {
                            if (axis.orientation === 'Vertical') {
                                _this.previousYLabel = axis.visibleLabels.length;
                            }
                            else {
                                _this.previousXLabel = axis.visibleLabels.length;
                            }
                        }
                    }
                }
            });
        }
    };
    /**
     * To get X value based on lineBreakAlignment for Y axis line break labels only.
     *
     * @param {number} x text x position
     * @param {Axis} axis y axis values
     * @param {number} textWidth axis label width
     * @returns {number} returns suitable axis label x position
     */
    CartesianAxisLayoutPanel.prototype.getAxisLabelXvalue = function (x, axis, textWidth) {
        var anchor = axis.lineBreakAlignment;
        var isLabelInside = axis.labelPosition === 'Inside';
        var isOpposed = axis.isAxisOpposedPosition;
        if ((isOpposed && isLabelInside) || (!isOpposed && !isLabelInside)) {
            return (anchor === 'Right' ? x : (anchor === 'Center' ? (x - textWidth / 2) : (x - textWidth)));
        }
        else {
            return (anchor === 'Left' ? x : (anchor === 'Center' ? (x + textWidth / 2) : (x + textWidth)));
        }
    };
    /**
     * To render the yAxis label border.
     *
     * @param {Axis} axis axis
     * @param {number} index index
     * @param {Element} parent parent
     * @param {Rect} rect rect
     * @returns {void}
     */
    CartesianAxisLayoutPanel.prototype.drawYAxisBorder = function (axis, index, parent, rect) {
        if (axis.border.width > 0) {
            var startY = void 0;
            var pointY = void 0;
            var scrollBarHeight = (axis.labelPosition === 'Outside' && axis.scrollbarSettings.position !== 'Right' && axis.scrollbarSettings.position !== 'Left') ? axis.scrollBarHeight : 0;
            var isOpposed = axis.isAxisOpposedPosition;
            scrollBarHeight = (isOpposed ? 1 : -1) * scrollBarHeight;
            var gap = (rect.height / axis.visibleRange.delta) * (axis.valueType === 'DateTime' ? axis.dateTimeInterval
                : axis.visibleRange.interval);
            var endY = void 0;
            var length_1 = axis.maxLabelSize.width + 10 + ((axis.tickPosition === axis.labelPosition) ?
                axis.majorTickLines.height : 0);
            var labelBorder = '';
            var ticksbwtLabel = (axis.valueType === 'Category' && axis.labelPlacement === 'BetweenTicks') ? -0.5 : 0;
            var endX = ((isOpposed && axis.labelPosition === 'Inside') || (!isOpposed
                && axis.labelPosition === 'Outside')) ? rect.x - length_1 + scrollBarHeight : rect.x + length_1 + scrollBarHeight;
            for (var i = 0, len = axis.visibleLabels.length; i < len; i++) {
                pointY = valueToCoefficient(axis.visibleLabels[i].value + ticksbwtLabel, axis);
                pointY = (axis.isAxisInverse ? (1 - pointY) : pointY) * rect.height;
                if (axis.valueType === 'Category' && axis.labelPlacement === 'BetweenTicks') {
                    startY = (pointY * -1) + (rect.y + rect.height);
                    endY = (pointY * -1) - (gap) + (rect.y + rect.height);
                }
                else {
                    startY = (pointY * -1) + gap / 2 + (rect.y + rect.height);
                    endY = (pointY * -1) - gap / 2 + (rect.y + rect.height);
                }
                switch (axis.border.type) {
                    case 'Rectangle':
                    case 'WithoutTopBorder':
                        if (startY > (rect.y + rect.height)) {
                            labelBorder += ('M' + ' ' + endX + ' ' + (rect.y + rect.height) + ' ' + 'L' + ' ' + endX + ' ' + endY + ' ');
                        }
                        else if (Math.floor(rect.y) > (endY)) {
                            labelBorder += ('M' + ' ' + (rect.x + scrollBarHeight) + ' ' + startY + ' ' + 'L' + ' ' + endX
                                + ' ' + startY + ' ' + 'L' + ' ' + endX + ' ' + (rect.y) + ' ');
                        }
                        else {
                            labelBorder += ('M' + ' ' + (rect.x + scrollBarHeight) + ' ' + startY + ' ' + 'L' + ' ' + endX +
                                ' ' + startY + ' ' + 'L' + ' ' + endX + ' ' + endY + ' ');
                            if (i === axis.visibleLabels.length - 1) {
                                labelBorder += ('M' + ' ' + (rect.x + scrollBarHeight) + ' ' + endY + ' ' + 'L' + ' ' +
                                    endX + ' ' + endY + ' ');
                            }
                        }
                        break;
                    case 'WithoutTopandBottomBorder':
                        if (!(startY > rect.y + rect.height) && !((endY) < Math.floor(rect.y))) {
                            labelBorder += ('M' + ' ' + (rect.x + scrollBarHeight) + ' ' + startY + ' ' + 'L' + ' ' + endX +
                                ' ' + startY + ' ' + 'M' + ' ' + endX + ' ' + endY + ' ' +
                                'L' + ' ' + (rect.x + scrollBarHeight) + ' ' + endY);
                        }
                        break;
                }
            }
            labelBorder += (axis.border.type === 'Rectangle') ? ('M' + ' ' + (rect.x + scrollBarHeight) + ' ' + rect.y + ' ' + 'L' + ' ' +
                (rect.x + scrollBarHeight) + ' ' + (rect.y + rect.height) + ' ') : '';
            if (labelBorder !== '') {
                this.createAxisBorderElement(axis, index, labelBorder, parent);
            }
        }
        for (var i = 0; i < this.chart.visibleSeries.length; i++) {
            if (axis.multiLevelLabels.length > 0 && this.chart.multiLevelLabelModule && this.chart.visibleSeries[i].visible) {
                this.chart.multiLevelLabelModule.renderYAxisMultiLevelLabels(axis, index, parent, rect);
                break;
            }
        }
    };
    /**
     * To render the yAxis title
     *
     * @param {Axis} axis axis
     * @param {number} index index
     * @param {Element} parent parent
     * @param {Rect} rect rect
     * @returns {void}
     */
    CartesianAxisLayoutPanel.prototype.drawYAxisTitle = function (axis, index, parent, rect) {
        if (axis.title) {
            var chart = this.chart;
            var isRotated = false;
            var isOpposed = axis.isAxisOpposedPosition;
            var labelRotation = (axis.titleRotation == null ? (isOpposed ? 90 : -90) : axis.titleRotation) % 360;
            var padding = (axis.tickPosition === 'Inside' ? 0 : axis.majorTickLines.height + axis.titlePadding) +
                (axis.labelPosition === 'Inside' ? 0 :
                    (axis.maxLabelSize.width + axis.multiLevelLabelHeight + this.padding));
            padding = (axis.tickPosition !== 'Outside' && (axis.tickPosition === 'Inside' || axis.labelPosition === 'Inside'))
                ? (axis.titlePadding === 5 ? padding : padding + axis.titlePadding)
                : padding;
            padding = isOpposed ? padding + (axis.scrollbarSettings.position === 'Right' || axis.scrollbarSettings.position === 'Left' ? 0 : axis.scrollBarHeight) : -padding - (axis.scrollbarSettings.position === 'Right' || axis.scrollbarSettings.position === 'Left' ? 0 : axis.scrollBarHeight);
            if ((labelRotation !== -90 && !isOpposed) || (labelRotation !== 90 && isOpposed)) {
                padding += axis.isAxisOpposedPosition ? axis.titleSize.width / 2 + (axis.labelPosition === 'Inside' ? (axis.labelPadding !== 5 ? 0 : axis.labelPadding) : axis.labelPadding) :
                    -axis.titleSize.width / 2 - (axis.labelPosition === 'Inside' ? (axis.labelPadding !== 5 ? 0 : axis.labelPadding) : axis.labelPadding);
                isRotated = true;
            }
            var x = rect.x + padding;
            var y = void 0;
            var anchor = void 0;
            if (axis.titleStyle.textAlignment === 'Center') {
                anchor = 'middle';
                y = rect.y + rect.height * 0.5;
            }
            else if (axis.titleStyle.textAlignment === 'Near') {
                anchor = axis.opposedPosition ? 'end' : 'start';
                y = rect.height + rect.y;
            }
            else {
                anchor = axis.opposedPosition ? 'start' : 'end';
                y = rect.y;
            }
            var titleSize = (axis.titleSize.height * (axis.titleCollection.length - 1));
            var options = new TextOption(chart.element.id + '_AxisTitle_' + index, x, y + (isRotated ? -titleSize : -(axis.labelPosition === 'Inside' ? (axis.labelPadding !== 5 ? 0 : axis.labelPadding) : axis.labelPadding) - titleSize), anchor, axis.titleCollection, 'rotate(' + labelRotation + ',' + (x) + ',' + (y) + ')', null, labelRotation);
            var element = textElement(chart.renderer, options, axis.titleStyle, axis.titleStyle.color || chart.themeStyle.axisTitleFont.color, parent, null, null, null, null, null, null, null, null, chart.enableCanvas, null, chart.themeStyle.axisTitleFont, new ChartLocation(x, y));
            element.setAttribute('aria-hidden', 'true');
        }
    };
    /**
     * xAxis grid line calculation performed here
     *
     * @param {Axis} axis axis
     * @param {number} index index
     * @param {Element} parent parent
     * @param {Rect} rect rect
     * @returns {void}
     */
    CartesianAxisLayoutPanel.prototype.drawXAxisGridLine = function (axis, index, parent, rect) {
        var isLogAxis = axis.valueType === 'Logarithmic';
        var isCategoryAxis = axis.valueType.indexOf('Category') > -1;
        var tempInterval;
        var pointX = 0;
        var majorGrid = '';
        var majorTick = '';
        var minorDirection;
        var count = 1;
        var isOpposed = axis.isAxisOpposedPosition;
        var tickSize = (isOpposed) ? -axis.majorTickLines.height : axis.majorTickLines.height;
        var axisLineSize = (isOpposed) ? -axis.lineStyle.width * 0.5 : axis.lineStyle.width * 0.5;
        var scrollBarHeight = (isNullOrUndefined(axis.crossesAt) && axis.scrollbarSettings.position !== 'Top' && axis.scrollbarSettings.position !== 'Bottom') ? isOpposed ? -axis.scrollBarHeight :
            axis.scrollBarHeight : 0;
        var ticksbwtLabel = (axis.valueType.indexOf('Category') > -1 && axis.labelPlacement === 'BetweenTicks' && !this.chart.stockChart) ?
            0.5 : 0;
        var length = axis.visibleLabels.length;
        var isTickInside = axis.tickPosition === 'Inside';
        var ticks = isTickInside ? (rect.y - tickSize - axisLineSize) : (rect.y + tickSize + axisLineSize + scrollBarHeight);
        var chartThemeStyle = this.chart.themeStyle;
        if (axis.valueType.indexOf('Category') > -1 && length > 0 && axis.labelPlacement === 'BetweenTicks' && !this.chart.stockChart) {
            length += 1;
        }
        var numericIDs = this.calculateGridLineId(parent, length);
        for (var i = 0; i < length; i++) {
            if (axis.valueType !== 'DateTimeCategory') {
                tempInterval = axis.visibleLabels[i] ? axis.visibleLabels[i].value - ticksbwtLabel
                    : (axis.visibleLabels[i - 1].value + axis.visibleRange.interval) - ticksbwtLabel;
            }
            else {
                tempInterval = axis.visibleLabels[i] ?
                    axis.visibleLabels[i].value - ticksbwtLabel : axis.visibleRange.max;
            }
            pointX = (valueToCoefficient(tempInterval, axis) * rect.width) + rect.x;
            if (pointX >= rect.x && (rect.x + rect.width) >= pointX) {
                if (inside(tempInterval, axis.visibleRange) || this.isBorder(axis, i, pointX)) {
                    if (this.chart.redraw && ((this.chart.pointsAdded && !this.chart.pointsRemoved) || this.chart.zoomRedraw) &&
                        axis.majorGridLines.width && i !== 0 && axis.visible &&
                        !getElement(this.chart.element.id + '_MajorGridLine_' + index + '_' + i) && !this.chart.enableCanvas) {
                        var pointXValue = this.seriesClipRect.x + ((this.chart.enableRtl !== axis.isInversed) ?
                            -((this.seriesClipRect.width / length) * count) : this.seriesClipRect.width +
                            ((this.seriesClipRect.width / (i ? i : 1)) * count));
                        majorGrid = 'M ' + pointXValue + ' ' + (this.seriesClipRect.y + this.seriesClipRect.height) +
                            ' L ' + pointXValue + ' ' + this.seriesClipRect.y;
                        this.renderGridLine(axis, index, majorGrid, axis.majorGridLines, '_MajorGridLine_', i, this.element, chartThemeStyle.majorGridLine, axis.majorGridLines.dashArray, (numericIDs['MajorGridLine'] && numericIDs['MajorGridLine'].ids ? numericIDs['MajorGridLine'].ids[i] : null), numericIDs['MajorGridLine'] ? numericIDs['MajorGridLine'].isPointRemoved : false);
                        this.rangeAnimate(axis, this.element.childNodes[this.element.childNodes.length - 1], this.chart.duration, false, new Rect(this.seriesClipRect.x, axis.rect.y, this.seriesClipRect.x +
                            this.seriesClipRect.width, this.chart.availableSize.height), false, i);
                        if (getElement(parent.id)) {
                            getElement(parent.id).appendChild(this.element.childNodes[this.element.childNodes.length - 1]);
                        }
                    }
                    majorGrid = 'M ' + pointX + ' ' + (this.seriesClipRect.y + this.seriesClipRect.height) +
                        ' L ' + pointX + ' ' + this.seriesClipRect.y;
                    this.renderGridLine(axis, index, majorGrid, axis.majorGridLines, '_MajorGridLine_', i, this.element, chartThemeStyle.majorGridLine, axis.majorGridLines.dashArray, (numericIDs['MajorGridLine'] && numericIDs['MajorGridLine'].ids ? numericIDs['MajorGridLine'].ids[i] : null), numericIDs['MajorGridLine'] ? numericIDs['MajorGridLine'].isPointRemoved : false);
                }
                if (this.chart.redraw && this.chart.zoomRedraw && axis.majorTickLines.width && !getElement(this.chart.element.id + '_MajorTickLine_' + index + '_' + i) && !this.chart.enableCanvas && axis.visible) {
                    majorTick = 'M ' + (this.seriesClipRect.x + ((this.chart.enableRtl !== axis.isInversed) ? -((this.seriesClipRect.width / length) * count) : this.seriesClipRect.width + ((this.seriesClipRect.width / (i ? i : 1)) * count))) + ' ' + (rect.y + axisLineSize + (isTickInside ? scrollBarHeight : 0))
                        + ' L ' + (this.seriesClipRect.x + ((this.chart.enableRtl !== axis.isInversed) ? -((this.seriesClipRect.width / length) * count) : this.seriesClipRect.width + ((this.seriesClipRect.width / (i ? i : 1)) * count))) + ' ' + ticks;
                    this.updateAxisElement(axis, index, majorTick, i, '_MajorTickLine_', parent, false);
                    getElement(parent.id).appendChild(this.element.childNodes[this.element.childNodes.length - 1]);
                    count += 1;
                }
                majorTick = 'M ' + (pointX) + ' ' + (rect.y + axisLineSize + (isTickInside ? scrollBarHeight : 0))
                    + ' L ' + (pointX) + ' ' + ticks;
                this.renderGridLine(axis, index, majorTick, axis.majorTickLines, '_MajorTickLine_', i, parent, chartThemeStyle.majorTickLine, null, (numericIDs['MajorTickLine'] && numericIDs['MajorTickLine'].ids ? numericIDs['MajorTickLine'].ids[i] : null), numericIDs['MajorTickLine'] ? numericIDs['MajorTickLine'].isPointRemoved : false);
                if (axis.minorTicksPerInterval > 0 && (axis.minorGridLines.width > 0 || axis.minorTickLines.width > 0)) {
                    if (i === 0 && isZoomSet(axis) && !isLogAxis && !isCategoryAxis) {
                        this.renderMinorGridOnZooming(axis, tempInterval, rect, i, index, chartThemeStyle, parent);
                    }
                    minorDirection = this.drawAxisMinorLine(axis, tempInterval, rect, i);
                    this.renderGridLine(axis, index, minorDirection[0], axis.minorGridLines, '_MinorGridLine_', i, this.element, chartThemeStyle.minorGridLine, axis.minorGridLines.dashArray, (numericIDs['MinorGridLine'] && numericIDs['MinorGridLine'].ids ? numericIDs['MinorGridLine'].ids[i] : null), numericIDs['MinorGridLine'] ? numericIDs['MinorGridLine'].isPointRemoved : false);
                    this.renderGridLine(axis, index, minorDirection[1], axis.minorTickLines, '_MinorTickLine_', i, parent, chartThemeStyle.minorTickLine, null, (numericIDs['MinorTickLine'] && numericIDs['MinorTickLine'].ids ? numericIDs['MinorTickLine'].ids[i] : null), numericIDs['MinorTickLine'] ? numericIDs['MinorTickLine'].isPointRemoved : false);
                    if (i === length - 1 && isZoomSet(axis) && isLogAxis && !isCategoryAxis) {
                        this.renderMinorGridOnZooming(axis, (tempInterval + axis.visibleRange.interval), rect, i, index, chartThemeStyle, parent);
                    }
                }
            }
        }
        if (length && this.previousXLabel > length && !this.chart.enableCanvas && axis.visible &&
            this.chart.zoomRedraw && this.chart.redraw) {
            for (var i = length; i < this.previousXLabel; i++) {
                var pointXValue = this.seriesClipRect.x + ((this.chart.enableRtl !== axis.isInversed) ?
                    -((this.seriesClipRect.width / length) * ((i - length) + 1)) :
                    this.seriesClipRect.width + ((this.seriesClipRect.width / length) * ((i - length) + 1)));
                if (axis.majorGridLines.width) {
                    majorGrid = 'M ' + pointXValue + ' ' + (this.seriesClipRect.y + this.seriesClipRect.height) +
                        ' L ' + pointXValue + ' ' + this.seriesClipRect.y;
                    this.updateAxisElement(axis, index, majorGrid, i, '_MajorGridLine_', this.element, true);
                }
                if (axis.majorTickLines.width) {
                    majorTick = 'M ' + (pointXValue) + ' ' + (rect.y + axisLineSize + (isTickInside ? scrollBarHeight : 0))
                        + ' L ' + (pointXValue) + ' ' + ticks;
                    this.updateAxisElement(axis, index, majorTick, i, '_MajorTickLine_', parent, true);
                }
            }
        }
    };
    CartesianAxisLayoutPanel.prototype.calculateGridLineId = function (parent, length) {
        var _this = this;
        var numericIDs = {};
        if (this.chart.pointsRemoved) {
            var elementTypes = ['MajorGridLine', 'MajorTickLine', 'MinorGridLine', 'MinorTickLine'];
            elementTypes.forEach(function (type) {
                var parentElement = getElement(parent.id);
                var elements = parentElement.querySelectorAll('[id*="_' + type + '_"]');
                var elementArray = [];
                for (var i = 0; i < elements.length; i++) {
                    elementArray.push(elements[i]);
                }
                var len = type === 'MajorGridLine' && _this.chart.chartArea.border.width ? length - 2 : length;
                len = type === 'MinorGridLine' || type === 'MinorTickLine' ? length - 1 : len;
                if (elementArray.length > 0 && elementArray.length > len) {
                    var elementsLength = elementArray.length;
                    for (var k = 0; k < elementsLength - len; k++) {
                        if (elementArray[k]) {
                            parentElement.removeChild(elementArray[k]);
                        }
                        elementArray.shift();
                    }
                    var numericIds = elementArray.map(function (element) {
                        var parts = element.id.split('_');
                        return parseInt(parts[parts.length - 1], 10);
                    });
                    numericIDs[type] = {
                        ids: numericIds,
                        isPointRemoved: true
                    };
                }
            });
        }
        return numericIDs;
    };
    /**
     * To render missing minor grid lines while zooming
     *
     * @param {Axis} axis axis
     * @param {number} tempInterval tempInterval
     * @param {Rect} rect rect
     * @param {number} i i
     * @param {number} index index
     * @param {IThemeStyle} chartThemeStyle chartThemeStyle
     * @param {Element} parent parent
     * @returns {void}
     */
    CartesianAxisLayoutPanel.prototype.renderMinorGridOnZooming = function (axis, tempInterval, rect, i, index, chartThemeStyle, parent) {
        var minorDirection = this.drawAxisMinorLine(axis, tempInterval, rect, i, true);
        this.renderGridLine(axis, index, minorDirection[0], axis.minorGridLines, '_MinorGridLine_', -1, this.element, chartThemeStyle.minorGridLine, axis.minorGridLines.dashArray);
        this.renderGridLine(axis, index, minorDirection[1], axis.minorTickLines, '_MinorTickLine_', -1, parent, chartThemeStyle.minorTickLine);
    };
    /**
     * To calcualte the axis minor line
     *
     * @param {Axis} axis axis
     * @param {number} tempInterval tempInterval
     * @param {Rect} rect rect
     * @param {number} labelIndex labelIndex
     * @param {boolean} isFirstLabel isFirstLabel
     * @returns {string[]} axis minor line path
     */
    CartesianAxisLayoutPanel.prototype.drawAxisMinorLine = function (axis, tempInterval, rect, labelIndex, isFirstLabel) {
        var value = tempInterval;
        var coor = 0;
        var position = 0;
        var range = axis.visibleRange;
        var isTickInside = axis.tickPosition === 'Inside';
        var direction = [];
        var tickSize = axis.isAxisOpposedPosition ? -axis.minorTickLines.height : axis.minorTickLines.height;
        var logStart;
        var logEnd;
        var logInterval = 1;
        var logPosition = 1;
        var ticksX = isTickInside ? (rect.y - tickSize) : (rect.y + tickSize);
        var ticksY = isTickInside ? (rect.x + tickSize) : (rect.x - tickSize);
        var minorGird = '';
        var minorTick = '';
        var isInverse = axis.isAxisInverse;
        if (axis.valueType === 'Logarithmic') {
            logStart = Math.pow(axis.logBase, value - range.interval);
            logEnd = Math.pow(axis.logBase, value);
            logInterval = (logEnd - logStart) / (axis.minorTicksPerInterval + 1);
            logPosition = logStart + logInterval;
        }
        if (axis.orientation === 'Horizontal') {
            for (var j = 0; j < axis.minorTicksPerInterval; j++) {
                value = this.findLogNumeric(axis, logPosition, value, labelIndex, isFirstLabel);
                logPosition += logInterval;
                if (inside(value, range)) {
                    position = ((value - range.min) / (range.max - range.min));
                    position = Math.ceil((isInverse ? (1 - position) : position) * rect.width);
                    coor = (Math.floor(position + rect.x));
                    if (this.chart.enableCanvas) {
                        if (minorGird === '') {
                            minorGird = 'M ' + coor + ' ' + this.seriesClipRect.y +
                                ' L ' + coor + ' ' + (this.seriesClipRect.y + this.seriesClipRect.height);
                        }
                        else {
                            minorGird = minorGird + ' M ' + coor + ' ' + this.seriesClipRect.y +
                                ' L ' + coor + ' ' + (this.seriesClipRect.y + this.seriesClipRect.height);
                        }
                        coor = (Math.floor(position + rect.x));
                        if (minorTick === '') {
                            minorTick = minorTick.concat('M' + ' ' + coor + ' ' + (rect.y)
                                + ' L ' + coor + ' ' + (ticksX + axis.scrollBarHeight));
                        }
                        else {
                            minorTick = minorTick.concat(' M' + ' ' + coor + ' ' + (rect.y)
                                + ' L ' + coor + ' ' + (ticksX + axis.scrollBarHeight));
                        }
                    }
                    else {
                        minorGird = minorGird.concat('M' + ' ' + coor + ' ' + (this.seriesClipRect.y)
                            + 'L ' + coor + ' ' + (this.seriesClipRect.y + this.seriesClipRect.height));
                        coor = (Math.floor(position + rect.x));
                        minorTick = minorTick.concat('M' + ' ' + coor + ' ' + (rect.y)
                            + 'L ' + coor + ' ' + (ticksX + axis.scrollBarHeight));
                    }
                }
            }
        }
        else {
            for (var j = 0; j < axis.minorTicksPerInterval; j++) {
                value = this.findLogNumeric(axis, logPosition, value, labelIndex, isFirstLabel);
                if (inside(value, range)) {
                    position = ((value - range.min) / (range.max - range.min));
                    position = Math.ceil(((isInverse ? (1 - position) : position)) * rect.height) * -1; // For inversed axis
                    coor = (Math.floor(position + rect.y + rect.height));
                    if (this.chart.enableCanvas) {
                        if (minorGird === '') {
                            minorGird = 'M ' + this.seriesClipRect.x + ' ' + coor +
                                ' L ' + (this.seriesClipRect.x + this.seriesClipRect.width) + ' ' + coor;
                        }
                        else {
                            minorGird = minorGird + ' M ' + this.seriesClipRect.x + ' ' + coor +
                                ' L ' + (this.seriesClipRect.x + this.seriesClipRect.width) + ' ' + coor;
                        }
                        coor = (Math.floor(position + rect.y + rect.height));
                        if (minorTick === '') {
                            minorTick = minorTick.concat('M' + ' ' + rect.x + ' ' + coor + ' L ' + (ticksY - axis.scrollBarHeight) +
                                ' ' + coor + ' ');
                        }
                        else {
                            minorTick = minorTick.concat(' M' + ' ' + rect.x + ' ' + coor + ' L ' + (ticksY - axis.scrollBarHeight) +
                                ' ' + coor + ' ');
                        }
                    }
                    else {
                        minorGird = minorGird.concat('M' + ' ' + (this.seriesClipRect.x) + ' ' + coor
                            + 'L ' + (this.seriesClipRect.x + this.seriesClipRect.width) + ' ' + coor + ' ');
                        coor = (Math.floor(position + rect.y + rect.height));
                        minorTick = minorTick.concat('M' + ' ' + rect.x + ' ' + coor + 'L ' + (ticksY - axis.scrollBarHeight) +
                            ' ' + coor + ' ');
                    }
                }
                logPosition += logInterval;
            }
        }
        direction.push(minorGird);
        direction.push(minorTick);
        return direction;
    };
    /**
     * To find the numeric value of the log
     *
     * @param {Axis} axis axis
     * @param {number} logPosition logPosition
     * @param {number} value value
     * @param {number} labelIndex labelIndex
     * @param {boolean} isFirstLabel isFirstLabel
     * @returns {number} value
     */
    CartesianAxisLayoutPanel.prototype.findLogNumeric = function (axis, logPosition, value, labelIndex, isFirstLabel) {
        var range = axis.visibleRange;
        var tempValue;
        if (axis.valueType === 'Logarithmic') {
            value = logBase(logPosition, axis.logBase);
        }
        else if (axis.valueType === 'DateTime') {
            tempValue = axis.dateTimeInterval / (axis.minorTicksPerInterval + 1);
            value = isFirstLabel ? (value - tempValue) : (value + tempValue);
        }
        else if (axis.valueType === 'DateTimeCategory') {
            var padding = axis.labelPlacement === 'BetweenTicks' ? 0.5 : 0;
            value += ((axis.visibleLabels[labelIndex + 1] ?
                axis.visibleLabels[labelIndex + 1].value - padding : axis.visibleRange.max) -
                (axis.visibleLabels[labelIndex] ?
                    axis.visibleLabels[labelIndex].value - padding : axis.visibleRange.min)) /
                (axis.minorTicksPerInterval + 1);
        }
        else {
            tempValue = range.interval / (axis.minorTicksPerInterval + 1);
            value = isFirstLabel ? (value - tempValue) : (value + tempValue);
        }
        return value;
    };
    /**
     * To render the xAxis Labels
     *
     * @param {Axis} axis axis
     * @param {number} index index
     * @param {Element} parent parent
     * @param {Rect} rect rect
     * @returns {void}
     * @private
     */
    CartesianAxisLayoutPanel.prototype.drawXAxisLabels = function (axis, index, parent, rect) {
        var chart = this.chart;
        var pointX = 0;
        var pointY = 0;
        var previousLabel = 0;
        var labelSpace = axis.labelPadding;
        var labelHeight;
        var elementSize;
        var labelPadding;
        var anchor;
        var pixel = 10;
        var labelElement = chart.renderer.createGroup({ id: chart.element.id + 'AxisLabels' + index });
        var islabelInside = axis.labelPosition === 'Inside';
        var isOpposed = axis.isAxisOpposedPosition;
        var tickSpace = axis.labelPosition === axis.tickPosition ? axis.majorTickLines.height : 0;
        var padding = tickSpace + labelSpace + axis.lineStyle.width * 0.5;
        var angle = axis.angle % 360;
        var isHorizontalAngle = (angle === 0 || angle === -180 || angle === 180);
        var options;
        var labelWidth;
        var isInverse = axis.isAxisInverse;
        var isLeft;
        var count = 1;
        var previousEnd = isInverse ? (rect.x + rect.width) : rect.x;
        var width = 0;
        var length = axis.visibleLabels.length;
        var intervalLength;
        var label;
        var isAxisBreakLabel;
        var scrollBarHeight = axis.scrollbarSettings.enable || (!islabelInside && isNullOrUndefined(axis.crossesAt)
            && (axis.zoomFactor < 1 || axis.zoomPosition > 0)) ? axis.scrollbarSettings.position === 'Top' || axis.scrollbarSettings.position === 'Bottom' ? 0 : axis.scrollBarHeight : 0;
        var newPoints = [];
        var isRotatedLabelIntersect = false;
        var textPoints = [];
        var rotatedLabelSize = new Size(0, 0);
        padding += (angle === 90 || angle === 270 || angle === -90 || angle === -270) ? (islabelInside ? 5 : -5) : 0;
        var isLabelUnderAxisLine = ((!isOpposed && !islabelInside) || (isOpposed && islabelInside));
        var axislabelElement = getElement(chart.element.id + 'AxisLabels' + index);
        var pointsRemoved = this.removeAxisLabelElements(axis, axislabelElement);
        var legendWidth = (chart.legendModule && chart.legendSettings.position === 'Right' && chart.legendModule.legendBounds.height + chart.legendModule.legendBounds.y >= axis.rect.y) ? chart.legendModule.legendBounds.width : 0;
        var isEndAnchor = isLabelUnderAxisLine ?
            ((360 >= angle && angle >= 180) || (-1 >= angle && angle >= -180)) :
            ((1 <= angle && angle <= 180) || (-181 >= angle && angle >= -360));
        for (var i = 0, len = length; i < len; i++) {
            label = axis.visibleLabels[i];
            isAxisBreakLabel = isBreakLabel(label.originalText) || (axis.labelIntersectAction === 'Wrap' && label.text.length > 1);
            pointX = (valueToCoefficient(label.value, axis) * rect.width) + rect.x;
            elementSize = label.size;
            if (axis.enableWrap) {
                elementSize.height = measureText(label.text, axis.labelStyle, chart.themeStyle.axisLabelFont).height;
            }
            intervalLength = rect.width / length;
            labelWidth = isAxisBreakLabel ? label.breakLabelSize.width : elementSize.width;
            width = ((axis.labelIntersectAction === 'Trim' || axis.labelIntersectAction === 'Wrap') && angle === 0 &&
                labelWidth > intervalLength) ? intervalLength : labelWidth;
            labelHeight = elementSize.height / 4;
            pointX -= (isAxisBreakLabel || angle !== 0) ? 0 : (width / 2);
            // label X value adjustment for label rotation (Start)
            if (angle !== 0) {
                if (isAxisBreakLabel) {
                    pointX -= axis.lineBreakAlignment === 'Left' ? (label.breakLabelSize.width / 2) : axis.lineBreakAlignment === 'Right' ?
                        -(label.breakLabelSize.width / 2) : 0;
                }
                else {
                    pointX -= (angle === -90 || angle === 270 ? -labelHeight : (angle === 90 || angle === -270) ? labelHeight : 0);
                }
            }
            // label X value adjustment for label rotation (End)
            if (axis.labelStyle.textAlignment === 'Far') {
                pointX = pointX + width - pixel;
            }
            else if (axis.labelStyle.textAlignment === 'Near') {
                pointX = pointX - width + pixel;
            }
            // For line break label alignment like left, right & center in angle 0
            if (isAxisBreakLabel && axis.lineBreakAlignment !== 'Center' && angle === 0) {
                pointX += axis.lineBreakAlignment === 'Left' ? -(width / 2) : (width / 2);
            }
            var paddingForBreakLabel = isAxisBreakLabel ?
                (isHorizontalAngle ? (axis.opposedPosition || islabelInside ? 0 : elementSize.height) :
                    (label.breakLabelSize.width / 2)) : 0;
            padding = isAxisBreakLabel ? (tickSpace + labelSpace + axis.lineStyle.width * 0.5) : padding;
            // label Y value adjustment (Start)
            if (islabelInside && angle) {
                if (isAxisBreakLabel) {
                    pointY = isOpposed ? (rect.y + padding + (paddingForBreakLabel)) : (rect.y - padding - (paddingForBreakLabel));
                }
                else {
                    pointY = isOpposed ? (rect.y + padding + labelHeight) : (rect.y - padding - labelHeight);
                }
            }
            else {
                if (isAxisBreakLabel) {
                    labelPadding = !isLabelUnderAxisLine ? -(padding + scrollBarHeight + (paddingForBreakLabel)) :
                        padding + scrollBarHeight + (angle ? paddingForBreakLabel : (3 * labelHeight));
                }
                else {
                    labelPadding = !isLabelUnderAxisLine ?
                        -(padding + scrollBarHeight + (angle ? labelHeight : (label.index > 1 ? (2 * labelHeight) : 0))) :
                        padding + scrollBarHeight + ((angle ? 1 : 3) * labelHeight);
                }
                pointY = (rect.y + (labelPadding * label.index));
            }
            // label Y value adjustment (End)
            if (isAxisBreakLabel) {
                anchor = this.getAnchor(axis); // for break label self alignment
            }
            else {
                anchor = (chart.enableRtl) ? ((isEndAnchor) ? '' : 'end') : (chart.isRtlEnabled || isEndAnchor) ? 'end' : '';
            }
            options = new TextOption(chart.element.id + index + '_AxisLabel_' + i, pointX, pointY, anchor);
            options.id = pointsRemoved && axislabelElement &&
                axislabelElement.children[i] ? axislabelElement.children[i].id : options.id;
            if (angle !== 0) {
                rotatedLabelSize = rotateTextSize(label.labelStyle, label.originalText, angle, chart, chart.themeStyle.axisLabelFont);
                isLeft = ((angle < 0 && angle > -90) || (angle < -180 && angle > -270) ||
                    (angle > 90 && angle < 180) || (angle > 270 && angle < 360));
            }
            if (axis.edgeLabelPlacement) {
                switch (axis.edgeLabelPlacement) {
                    case 'None':
                        break;
                    case 'Hide':
                        if (((i === 0 || (isInverse && i === len - 1)) && options.x < rect.x) ||
                            ((i === len - 1 || (isInverse && i === 0)) &&
                                (options.x + (angle === 0 ? width : rotatedLabelSize.width) > rect.x + rect.width))) {
                            continue;
                        }
                        break;
                    case 'Shift':
                        if (i === len - 2 && axis.labelIntersectAction !== 'MultipleRows') {
                            if (anchor === 'start' || anchor === '') {
                                previousLabel = options.x + width; // For start anchor
                            }
                            else if (anchor === 'middle') {
                                previousLabel = options.x + (width / 2); // For middle anchor
                            }
                            else {
                                previousLabel = options.x; // For end anchor
                            }
                        }
                        if ((i === 0 || (isInverse && i === len - 1)) && (options.x < rect.x || (angle !== 0 && isLeft && options.x < rect.x) || (axis.lineBreakAlignment === 'Center' && options.x - (label.size.width / label.text.length) / 2 < rect.x && angle === 0))) {
                            intervalLength -= (rect.x - options.x);
                            if (anchor === '') {
                                if (options.x <= 0) {
                                    pointX = options.x = 0;
                                }
                                else {
                                    pointX = options.x;
                                }
                                intervalLength = rect.width / length;
                            }
                            else if (isLeft && angle !== 0) {
                                intervalLength = rect.width / length;
                                if (rect.x + intervalLength > options.x + rotatedLabelSize.width) {
                                    options.x = pointX = rect.x + padding;
                                }
                                else {
                                    options.x = pointX = rect.x + intervalLength - padding;
                                }
                            }
                            else if (isAxisBreakLabel && axis.lineBreakAlignment === 'Center' && axis.labelPlacement === 'OnTicks' && angle === 0) {
                                var maxWidth = 0;
                                for (var i_1 = 0; i_1 < label.text.length; i_1++) {
                                    var breakLabelWidth = measureText(label.text[i_1], axis.labelStyle, chart.themeStyle.axisLabelFont).width;
                                    if (breakLabelWidth > maxWidth) {
                                        maxWidth = breakLabelWidth;
                                    }
                                }
                                options.x = pointX = rect.x + maxWidth / 2;
                            }
                            else if (!(anchor === 'start' && options.x > 0)) {
                                options.x = pointX = !isHorizontalAngle ? rect.x + padding : rect.x;
                            }
                        }
                        else if ((i === len - 1 || (isInverse && i === 0)) &&
                            (((options.x + width) > chart.availableSize.width - chart.border.width - legendWidth && (anchor === 'start' || anchor === '') && angle === 0) ||
                                ((anchor === 'start') && angle !== 0 && !isLeft && (options.x + rotatedLabelSize.width) > chart.availableSize.width - chart.border.width - legendWidth) ||
                                (anchor === 'middle' && angle !== 0 && !isLeft && (options.x + rotatedLabelSize.width / 2) > chart.availableSize.width - chart.border.width - legendWidth) ||
                                (anchor === 'end' && angle !== 0 && !isLeft && options.x > chart.availableSize.width - chart.border.width - legendWidth) ||
                                (anchor === 'end' && options.x > chart.availableSize.width - chart.border.width - legendWidth && angle === 0) ||
                                (anchor === 'middle' && (options.x + width / 2) > chart.availableSize.width - chart.border.width - legendWidth && angle === 0))) {
                            var axisLabelWidth = angle !== 0 ? rotatedLabelSize.width : width;
                            var shiftedXValue = void 0;
                            //Apply a default 5px padding between the edge label and the chart container
                            var padding_1 = 5;
                            if (anchor === 'start' || anchor === '') {
                                shiftedXValue = options.x - ((options.x + axisLabelWidth) -
                                    chart.availableSize.width + chart.border.width + padding_1 + legendWidth);
                            }
                            else if (anchor === 'middle') {
                                shiftedXValue = options.x - ((options.x + axisLabelWidth / 2) -
                                    chart.availableSize.width + chart.border.width + padding_1 + legendWidth);
                            }
                            else {
                                shiftedXValue = options.x - (options.x - (chart.availableSize.width + chart.border.width + padding_1
                                    + legendWidth));
                            }
                            // Check for overlap with previous label
                            if (previousLabel !== 0 && shiftedXValue < previousLabel) {
                                var maxAvailableWidth = chart.availableSize.width - previousLabel;
                                label.text = textTrim(maxAvailableWidth, label.originalText, axis.labelStyle, chart.isRtlEnabled, chart.themeStyle.axisLabelFont);
                            }
                            else {
                                options.x = pointX = shiftedXValue;
                            }
                        }
                        break;
                }
            }
            options.text = this.getLabelText(label, axis, intervalLength);
            options.labelRotation = angle;
            // ------- Hide Calculation (Start) -------------
            // Currect label actual start value (Start)
            var xValue = void 0;
            var xValue2 = void 0;
            if (isAxisBreakLabel && angle === 0) {
                if (axis.lineBreakAlignment === 'Right') {
                    xValue = (options.x - width);
                    xValue2 = options.x;
                }
                else if (axis.lineBreakAlignment === 'Center') {
                    xValue = (options.x - (width / 2));
                    xValue2 = options.x + (width / 2);
                }
                else {
                    xValue = options.x;
                    xValue2 = options.x + width;
                }
            }
            else {
                xValue = options.x;
                xValue2 = options.x + width;
            }
            // Currect label actual start value (End)
            if (angle === 0 && axis.labelIntersectAction === 'Hide' && i !== 0 &&
                (!isInverse ? xValue <= previousEnd : xValue2 >= previousEnd)) {
                continue;
            }
            // Previous label actual end value (Start)
            if (isAxisBreakLabel) {
                if (axis.lineBreakAlignment === 'Right') {
                    previousEnd = isInverse ? (options.x - width) : options.x;
                }
                else if (axis.lineBreakAlignment === 'Center') {
                    previousEnd = isInverse ? (options.x - (width / 2)) : options.x + (width / 2);
                }
                else {
                    previousEnd = isInverse ? options.x : options.x + width;
                }
            }
            else {
                previousEnd = isInverse ? options.x : options.x + width;
            }
            // Previous label actual end value (End)
            // ------- Hide Calculation (End) -------------
            // label Rotataion calculation (Start)
            if (angle !== 0) {
                var height = void 0;
                var rect_1 = void 0;
                if (isAxisBreakLabel) {
                    var xAdjustment = 0;
                    var yAdjustment = 0;
                    height = (label.breakLabelSize.height);
                    yAdjustment = (label.breakLabelSize.height) - 4; // 4 for label bound correction
                    // xAdjustment (Start)
                    if (axis.lineBreakAlignment === 'Center') {
                        xAdjustment = -(label.breakLabelSize.width / 2);
                    }
                    else if (axis.lineBreakAlignment === 'Right') {
                        xAdjustment = -label.breakLabelSize.width;
                    }
                    // xAdjustment (End)
                    if (isLabelUnderAxisLine) {
                        yAdjustment = (label.breakLabelSize.height) / (options.text.length + 1);
                    }
                    rect_1 = new Rect(options.x + xAdjustment, options.y - (yAdjustment), label.breakLabelSize.width, height);
                }
                else {
                    height = (pointY) - (options.y - ((label.size.height / 2)));
                    rect_1 = new Rect(options.x, options.y - ((label.size.height / 2) - 5), label.size.width, height);
                }
                var rectCoordinates = this.getRectanglePoints(rect_1);
                var rectCenterX = isAxisBreakLabel ? rect_1.x + (rect_1.width / 2) : pointX;
                var rectCenterY = isAxisBreakLabel ? rect_1.y + (rect_1.height / 2) : (pointY - (height / 2));
                if (isAxisBreakLabel) {
                    options.transform = 'rotate(' + angle + ',' + rectCenterX + ',' + rectCenterY + ')';
                }
                else {
                    options.transform = 'rotate(' + angle + ',' + pointX + ',' + pointY + ')';
                }
                newPoints.push(getRotatedRectangleCoordinates(rectCoordinates, rectCenterX, rectCenterY, angle));
                isRotatedLabelIntersect = false;
                if (axis.labelIntersectAction !== 'None') {
                    for (var index_1 = i; index_1 > 0; index_1--) {
                        if (newPoints[i] && newPoints[index_1 - 1] &&
                            isRotatedRectIntersect(newPoints[i], newPoints[index_1 - 1])) {
                            isRotatedLabelIntersect = true;
                            newPoints[i] = null;
                            break;
                        }
                    }
                }
                var rotateAngle = ((angle > 0 && angle < 90) || (angle > 180 && angle < 270) ||
                    (angle < -90 && angle > -180) || (angle < -270 && angle > -360));
                var textRect = new Rect(options.x, options.y - (elementSize.height / 2 + padding / 2), label.size.width, height);
                var textRectCoordinates = this.getRectanglePoints(textRect);
                var rectPoints = [];
                rectPoints.push(new ChartLocation(rotateAngle ? this.chart.availableSize.width : this.padding, axis.rect.y));
                rectPoints.push(new ChartLocation(rotateAngle ? this.chart.availableSize.width :
                    this.padding, axis.rect.y + axis.maxLabelSize.height));
                textPoints.push(getRotatedRectangleCoordinates(textRectCoordinates, rectCenterX, rectCenterY, angle));
                var newRect = new Rect(0, axis.rect.y, this.chart.availableSize.width, axis.maxLabelSize.height * 2);
                for (var k = 0; k < textPoints[i].length; k++) {
                    if (!axis.opposedPosition && !withInBounds(textPoints[i][k].x, textPoints[i][k].y, newRect) && typeof options.text === 'string') {
                        var interSectPoint = this.calculateIntersection(textPoints[i][0], textPoints[i][1], rectPoints[0], rectPoints[1]);
                        var rectPoint1 = rotateAngle ? this.chart.availableSize.width - pointX : pointX;
                        var rectPoint2 = interSectPoint.y - axis.rect.y;
                        var trimValue = Math.sqrt((rectPoint1 * rectPoint1) + (rectPoint2 * rectPoint2));
                        options.text = textTrim(trimValue, label.text, label.labelStyle, chart.enableRtl, chart.themeStyle.axisLabelFont);
                    }
                }
            }
            if (this.chart.redraw && ((chart.pointsAdded && !chart.pointsRemoved) || this.chart.zoomRedraw) &&
                !getElement(options.id) && i !== 0 && !this.chart.enableCanvas && axis.visible) {
                var optionsX = options.x;
                options.x = this.seriesClipRect.x + ((chart.enableRtl !== axis.isInversed) ? -((this.seriesClipRect.width / (i ? i : 1))
                    * count) : this.seriesClipRect.width + (this.seriesClipRect.width / (i ? i : 1)) * count);
                var transform = options.transform;
                options.transform = angle ? 'rotate(' + angle + ',' + options.x + ',' + parseFloat(options.transform.split(',')[2]) + ')' : '';
                var element_1 = textElement(chart.renderer, options, label.labelStyle, label.labelStyle.color || chart.themeStyle.axisLabelFont.color, labelElement, (axis.isAxisOpposedPosition !== (axis.labelPosition === 'Inside')), chart.redraw, true, null, chart.duration, null, label.size, isRotatedLabelIntersect, chart.enableCanvas, null, chart.themeStyle.axisLabelFont);
                this.rangeAnimate(axis, element_1, this.chart.duration, true, new Rect(this.seriesClipRect.x, axis.rect.y, this.seriesClipRect.x + this.seriesClipRect.width, this.chart.availableSize.height), false, i);
                options.x = optionsX;
                options.transform = transform;
                count += 1;
            }
            // label Rotataion calculation (End)
            var element = textElement(chart.renderer, options, label.labelStyle, label.labelStyle.color || chart.themeStyle.axisLabelFont.color, labelElement, (axis.isAxisOpposedPosition !== (axis.labelPosition === 'Inside')), chart.redraw, true, null, chart.duration, null, label.size, isRotatedLabelIntersect, chart.enableCanvas, null, chart.themeStyle.axisLabelFont, new ChartLocation(parseFloat(options.transform.split(',')[1]), parseFloat(options.transform.split(',')[2])));
            if (pointsRemoved) {
                element.id = chart.element.id + index + '_AxisLabel_' + i;
            }
        }
        if (this.previousXLabel && length && this.previousXLabel > length && !this.chart.enableCanvas &&
            axis.visible && this.chart.zoomRedraw && this.chart.redraw && options.text) {
            for (var i = length; i < this.previousXLabel; i++) {
                options.x = this.seriesClipRect.x + ((chart.enableRtl !== axis.isInversed) ? -((this.seriesClipRect.width / length) *
                    (i - length + 1)) : this.seriesClipRect.width + ((this.seriesClipRect.width / length) * (i - length + 1)));
                options.id = chart.element.id + index + '_AxisLabel_' + i;
                options.transform = angle ? 'rotate(' + angle + ',' + options.x + ',' + parseFloat(options.transform.split(',')[2]) + ')' : '';
                this.updateAxisElement(axis, index, '', i, '_AxisLabel_', labelElement, true, options, label);
            }
        }
        else {
            this.previousXLabel = length;
        }
        if (!this.chart.enableCanvas) {
            if (!chart.delayRedraw) {
                parent.appendChild(labelElement);
            }
            else if (axis.visible && axis.internalVisibility) {
                this.createZoomingLabel(this.chart, labelElement, axis, index, rect);
            }
        }
    };
    /**
     * To render the axis grid, tick lines and label
     *
     * @param {Axis} axis axis
     * @param {number} index index
     * @param {string} gridDirection gridDirection
     * @param {number} i index of the element
     * @param {string} elementId elementId
     * @param {Element} parentElement parent
     * @param {boolean} isRemove isRemoved
     * @param {TextOption} option - The options for the text element.
     * @param {VisibleLabels} label - Label.
     * @returns {void}
     */
    CartesianAxisLayoutPanel.prototype.updateAxisElement = function (axis, index, gridDirection, i, elementId, parentElement, isRemove, option, label) {
        var element;
        var isGrid = elementId.indexOf('Grid') > -1;
        var isLabel = elementId.indexOf('Label') > -1;
        if (isLabel) {
            element = textElement(this.chart.renderer, option, label.labelStyle, label.labelStyle.color || this.chart.themeStyle.axisLabelFont.color, parentElement, (axis.isAxisOpposedPosition !== (axis.labelPosition === 'Inside')), this.chart.redraw, true, null, this.chart.duration, null, null, null, this.chart.enableCanvas, null, this.chart.themeStyle.axisLabelFont);
        }
        else {
            this.renderGridLine(axis, index, gridDirection, isGrid ? axis.majorGridLines : axis.majorTickLines, elementId, i, this.element, isGrid ? this.chart.themeStyle.majorGridLine : this.chart.themeStyle.majorTickLine, isGrid ? axis.majorGridLines.dashArray : null);
            if (this.element && parentElement.childNodes) {
                element = this.element.childNodes[parentElement.childNodes.length - 1];
            }
        }
        this.rangeAnimate(axis, element, this.chart.duration, isLabel, new Rect((axis.orientation === 'Vertical') ? 0 : this.seriesClipRect.x, (axis.orientation === 'Vertical') ? this.seriesClipRect.y : axis.rect.y, this.seriesClipRect.width, this.seriesClipRect.height), isRemove, i);
    };
    CartesianAxisLayoutPanel.prototype.removeAxisLabelElements = function (axis, axislabelElement) {
        if (this.chart.pointsRemoved && axislabelElement && axislabelElement.childNodes.length) {
            var pointsRemoved = false;
            if (axis.valueType.indexOf('Category') > -1) {
                var visibleLabelTexts_1 = [];
                axis.visibleLabels.map(function (label) {
                    if (typeof label.text !== 'string') {
                        visibleLabelTexts_1.push(label.text.join(''));
                    }
                    else {
                        visibleLabelTexts_1.push(label.text);
                    }
                });
                for (var i = axislabelElement.childNodes.length - 1; i >= 0; i--) {
                    var childNode = axislabelElement.childNodes[i];
                    if (visibleLabelTexts_1.indexOf(childNode.textContent.trim()) === -1) {
                        axislabelElement.removeChild(childNode);
                        pointsRemoved = true;
                    }
                }
            }
            else if (axislabelElement.childNodes.length > axis.visibleLabels.length) {
                for (var j = 0; j < axislabelElement.childNodes.length - axis.visibleLabels.length; j++) {
                    axislabelElement.removeChild(axislabelElement.childNodes[j]);
                    pointsRemoved = true;
                }
            }
            return pointsRemoved;
        }
        return false;
    };
    CartesianAxisLayoutPanel.prototype.calculateIntersection = function (p1, p2, p3, p4) {
        var c2x = p3.x - p4.x;
        var c3x = p1.x - p2.x;
        var c2y = p3.y - p4.y;
        var c3y = p1.y - p2.y;
        var d = c3x * c2y - c3y * c2x;
        var u1 = p1.x * p2.y - p1.y * p2.x;
        var u4 = p3.x * p4.y - p3.y * p4.x;
        var px = (u1 * c2x - c3x * u4) / d;
        var py = (u1 * c2y - c3y * u4) / d;
        var p = { x: px, y: py };
        return p;
    };
    /**
     * To get text anchor value for line break labels.
     *
     * @param {Axis} axis axis model
     * @returns {string} returns text anchor
     */
    CartesianAxisLayoutPanel.prototype.getAnchor = function (axis) {
        return (axis.lineBreakAlignment === 'Center' ? 'middle' : (this.chart.enableRtl) ? (axis.lineBreakAlignment === 'Left' ? 'end' : 'start') : (axis.lineBreakAlignment === 'Left' ? 'start' : 'end'));
    };
    /**
     * Get rect coordinates
     *
     * @param {Rect} rect rect
     * @returns {ChartLocation[]} rectangle points
     */
    CartesianAxisLayoutPanel.prototype.getRectanglePoints = function (rect) {
        var point1 = new ChartLocation(rect.x, rect.y);
        var point2 = new ChartLocation(rect.x + rect.width, rect.y);
        var point3 = new ChartLocation(rect.x + rect.width, rect.y + rect.height);
        var point4 = new ChartLocation(rect.x, rect.y + rect.height);
        return [point1, point2, point3, point4];
    };
    /**
     * To get axis label text
     *
     * @param {VisibleLabels} label label
     * @param {Axis} axis axis
     * @param {number} intervalLength intervalLength
     * @returns {string | string[]} label or label collection
     */
    CartesianAxisLayoutPanel.prototype.getLabelText = function (label, axis, intervalLength) {
        if (isBreakLabel(label.originalText)) {
            var result = [];
            var str = void 0;
            for (var index = 0; index < label.text.length; index++) {
                str = this.findAxisLabel(axis, label.text[index], intervalLength);
                result.push(str);
            }
            return result;
        }
        else {
            return this.findAxisLabel(axis, label.text, intervalLength);
        }
    };
    /**
     * To render the x-axis label border.
     *
     * @param {Axis} axis axis
     * @param {number} index index
     * @param {Element} parent parent
     * @param {Rect} axisRect axisRect
     * @returns {void}
     */
    CartesianAxisLayoutPanel.prototype.drawXAxisBorder = function (axis, index, parent, axisRect) {
        if (axis.border.width > 0) {
            var scrollBarHeight = (axis.labelPosition === 'Outside' && axis.scrollbarSettings.position !== 'Top' && axis.scrollbarSettings.position !== 'Bottom') ? axis.scrollBarHeight : 0;
            var isOpposed = axis.isAxisOpposedPosition;
            var startX = void 0;
            var startY = axisRect.y + ((isOpposed ? -1 : 1) * scrollBarHeight);
            var padding = 10;
            var pointX = void 0;
            var gap = (axisRect.width / axis.visibleRange.delta) * (axis.valueType === 'DateTime' ? axis.dateTimeInterval
                : axis.visibleRange.interval);
            var endX = void 0;
            var length_2 = axis.maxLabelSize.height +
                ((axis.tickPosition === axis.labelPosition) ? axis.majorTickLines.height : 0);
            var labelBorder = '';
            var ticksbwtLabel = (axis.valueType === 'Category' && axis.labelPlacement === 'BetweenTicks') ? -0.5 : 0;
            var endY = ((isOpposed && axis.labelPosition === 'Inside') ||
                (!isOpposed && axis.labelPosition === 'Outside')) ?
                (axisRect.y + length_2 + padding + scrollBarHeight) : (axisRect.y - length_2 - padding - scrollBarHeight);
            for (var i = 0, len = axis.visibleLabels.length; i < len; i++) {
                pointX = valueToCoefficient(axis.visibleLabels[i].value + ticksbwtLabel, axis);
                pointX = (axis.isAxisInverse ? (1 - pointX) : pointX) * axisRect.width;
                if (axis.valueType === 'Category' && axis.labelPlacement === 'BetweenTicks') {
                    startX = pointX + axisRect.x;
                    endX = pointX + (gap) + axisRect.x;
                }
                else {
                    startX = pointX - gap * 0.5 + axisRect.x;
                    endX = pointX + gap * 0.5 + axisRect.x;
                }
                switch (axis.border.type) {
                    case 'Rectangle':
                    case 'WithoutTopBorder':
                        if (startX < axisRect.x && axis.labelPlacement !== 'OnTicks') {
                            labelBorder += ('M' + ' ' + axisRect.x + ' ' + endY + ' ' + 'L' + ' ' + endX + ' ' + endY + ' ');
                        }
                        else if (Math.floor(endX) > axisRect.width + axisRect.x && !(axis.visibleLabels.length === 1) &&
                            !(i === axis.visibleLabels.length - 1)) {
                            labelBorder += ('M' + ' ' + startX + ' ' + startY + ' ' + 'L' + ' ' + startX + ' ' + endY + ' ' +
                                'L' + ' ' + (axisRect.width + axisRect.x) + ' ' + endY + ' ');
                        }
                        else {
                            startX = (i === 0 && axis.labelPlacement === 'OnTicks') ? axisRect.x : startX;
                            endX = ((i === axis.visibleLabels.length - 1) && axis.labelPlacement === 'OnTicks') ? endX - gap * 0.5 : endX;
                            labelBorder += ('M' + ' ' + startX + ' ' + startY + ' ' + 'L' + ' ' + startX + ' ' +
                                endY + ' ' + 'L' + ' ' + endX + ' ' + endY + ' ');
                            if (i === 0) {
                                labelBorder += ('M' + ' ' + startX + ' ' + startY + ' ' + 'L' + ' ' + startX + ' ' + endY + ' ' +
                                    'M ' + startX + ' ' + endY + ' L ' + (axisRect.x) + ' ' + endY);
                            }
                            if (i === axis.visibleLabels.length - 1) {
                                labelBorder += ('M' + ' ' + endX + ' ' + startY + ' ' + 'L' + ' ' + endX + ' ' + endY + ' ' +
                                    'M ' + endX + ' ' + endY + ' L ' + (axisRect.width + axisRect.x) + ' ' + endY);
                            }
                        }
                        break;
                    case 'WithoutTopandBottomBorder':
                        if (!(startX < axisRect.x) && !(Math.floor(endX) > axisRect.width + axisRect.x)) {
                            labelBorder += ('M' + ' ' + startX + ' ' + startY + ' ' + 'L' + ' ' + startX + ' ' + endY + ' ' +
                                'M ' + endX + ' ' + startY + ' L ' + endX + ' ' + endY);
                        }
                        break;
                }
            }
            labelBorder += (axis.border.type === 'Rectangle' ? ('M ' + ' ' + axisRect.x + ' ' + startY + 'L' + ' ' +
                (axisRect.x + axisRect.width) + ' ' + startY) : '');
            if (labelBorder !== '') {
                this.createAxisBorderElement(axis, index, labelBorder, parent);
            }
        }
        for (var i = 0; i < this.chart.visibleSeries.length; i++) {
            if (this.chart.multiLevelLabelModule && axis.multiLevelLabels.length > 0 && this.chart.visibleSeries[i].visible) {
                this.chart.multiLevelLabelModule.renderXAxisMultiLevelLabels(axis, index, parent, axisRect);
                break;
            }
        }
    };
    /**
     * To create border element of the axis
     *
     * @param {Axis} axis axis
     * @param {number} index index
     * @param {string} labelBorder labelBorder
     * @param {Element} parent parent
     * @returns {void}
     */
    CartesianAxisLayoutPanel.prototype.createAxisBorderElement = function (axis, index, labelBorder, parent) {
        var element = getElement(this.chart.element.id + '_BorderLine_' + index);
        var direction = element ? element.getAttribute('d') : '';
        var borderElement = this.chart.renderer.drawPath(new PathOption(this.chart.element.id + '_BorderLine_' + index, 'transparent', axis.border.width, axis.border.color || this.chart.themeStyle.axisLine, 1, '', labelBorder));
        borderElement.style.pointerEvents = 'none';
        appendChildElement(this.chart.enableCanvas, parent, borderElement, this.chart.redraw, false, 'x', 'y', null, direction, true, null, null, this.chart.duration);
    };
    /**
     * To find the axis label of the intersect action
     *
     * @param {Axis} axis axis
     * @param {string} label label
     * @param {number} width width
     * @returns {string} label
     */
    CartesianAxisLayoutPanel.prototype.findAxisLabel = function (axis, label, width) {
        return (axis.labelIntersectAction === 'Trim' ?
            ((axis.angle % 360 === 0 && !axis.enableTrim) ? textTrim(width, label, axis.labelStyle, this.chart.enableRtl, this.chart.themeStyle.axisLabelFont) : label) : label);
    };
    /**
     * X-Axis Title function performed
     *
     * @param {Axis} axis axis
     * @param {number} index index
     * @param {Element} parent parent
     * @param {Rect} rect rect
     * @returns {void}
     */
    CartesianAxisLayoutPanel.prototype.drawXAxisTitle = function (axis, index, parent, rect) {
        if (axis.title) {
            var chart = this.chart;
            var elementSize = measureText(axis.title, axis.titleStyle, this.chart.themeStyle.axisTitleFont);
            var scrollBarHeight = (isNullOrUndefined(axis.crossesAt) && axis.scrollbarSettings.position !== 'Top' && axis.scrollbarSettings.position !== 'Bottom') ? axis.scrollBarHeight : 0;
            var padding = (axis.tickPosition === 'Inside' ? 0 : axis.majorTickLines.height + axis.titlePadding) +
                (axis.labelPosition === 'Inside' ? 0 :
                    axis.maxLabelSize.height + axis.multiLevelLabelHeight + axis.labelPadding);
            padding = (axis.tickPosition !== 'Outside' && (axis.tickPosition === 'Inside' || axis.labelPosition === 'Inside'))
                ? (axis.titlePadding === 5 ? padding : padding + axis.titlePadding)
                : padding;
            var titleSize = (axis.titleSize.height * (axis.titleCollection.length - 1));
            padding = axis.isAxisOpposedPosition ? -(padding + elementSize.height / 4 + scrollBarHeight + titleSize) : (padding + (3 *
                elementSize.height / 4) + scrollBarHeight);
            var labelRotation = axis.titleRotation ? axis.titleRotation : 0;
            var x = void 0;
            var y = rect.y + padding;
            var anchor = void 0;
            if (axis.titleStyle.textAlignment === 'Center') {
                anchor = 'middle';
                x = rect.x + rect.width * 0.5;
            }
            else if (axis.titleStyle.textAlignment === 'Near') {
                anchor = 'start';
                x = rect.x;
            }
            else {
                anchor = 'end';
                x = rect.x + rect.width;
            }
            if (labelRotation !== 0) {
                y += axis.opposedPosition ? -(axis.titleSize.height / 2 + elementSize.height / 4) :
                    axis.titleSize.height / 2 - elementSize.height / 4;
            }
            var options = new TextOption(chart.element.id + '_AxisTitle_' + index, x, y, anchor, axis.titleCollection, 'rotate(' + labelRotation + ',' + (x) + ',' + (y) + ')', null, labelRotation);
            var element = textElement(chart.renderer, options, axis.titleStyle, axis.titleStyle.color || chart.themeStyle.axisTitleFont.color, parent, null, chart.redraw, chart.redraw, null, null, null, null, null, chart.enableCanvas, null, chart.themeStyle.axisTitleFont, new ChartLocation(x, y));
            element.setAttribute('aria-hidden', 'true');
        }
    };
    /**
     * To render the axis grid and tick lines(Both Major and Minor)
     *
     * @param {Axis} axis axis
     * @param {number} index index
     * @param {string} gridDirection gridDirection
     * @param {MajorTickLinesModel | MinorTickLinesModel | MajorGridLinesModel | MinorGridLinesModel} gridModel gridModel
     * @param {string} gridId gridId
     * @param {number} gridIndex gridIndex
     * @param {Element} parent parent
     * @param {string} themeColor themeColor
     * @param {string} dashArray dashArray
     * @param {number} removeIndex removeIndex
     * @param {boolean} isRemoved isRemoved
     * @returns {void}
     */
    CartesianAxisLayoutPanel.prototype.renderGridLine = function (axis, index, gridDirection, gridModel, gridId, gridIndex, parent, themeColor, dashArray, removeIndex, isRemoved) {
        if (dashArray === void 0) { dashArray = null; }
        if (removeIndex === void 0) { removeIndex = null; }
        if (isRemoved === void 0) { isRemoved = false; }
        var chart = this.chart;
        var direction;
        var element;
        if (gridModel.width > 0 && axis.visible && axis.internalVisibility && gridDirection) {
            element = getElement(chart.element.id + gridId + index + '_' + (isRemoved ? removeIndex : gridIndex));
            direction = element ? element.getAttribute('d') : null;
            element = null;
            this.htmlObject = chart.renderer.drawPath(new PathOption(chart.element.id + gridId + index + '_' + (isRemoved ? removeIndex : gridIndex), 'transparent', gridModel.width, gridModel.color || themeColor, null, dashArray, gridDirection));
            appendChildElement(chart.enableCanvas, parent, this.htmlObject, chart.redraw, true, 'x', 'y', null, direction, true, null, null, chart.duration);
            if (isRemoved) {
                this.htmlObject.id = chart.element.id + gridId + index + '_' + gridIndex;
            }
        }
    };
    /**
     * To Find the parent node of the axis
     *
     * @param {string} elementId elementId
     * @param {Element} label label
     * @param {number} index index
     * @returns {Element} parent node of the axis
     */
    CartesianAxisLayoutPanel.prototype.findParentNode = function (elementId, label, index) {
        if (document.getElementById(elementId + 'AxisGroup' + index + 'Inside').contains(document.getElementById(label.id))) {
            return document.getElementById(elementId + 'AxisGroup' + index + 'Inside');
        }
        else {
            return document.getElementById(elementId + 'AxisGroup' + index + 'Outside');
        }
    };
    /**
     * Create Zooming Labels Function Called here
     *
     * @param {Chart} chart chart
     * @param {Element} labelElement labelElement
     * @param {Axis} axis axis
     * @param {number} index index
     * @param {Rect} rect rect
     * @returns {void}
     */
    CartesianAxisLayoutPanel.prototype.createZoomingLabel = function (chart, labelElement, axis, index, rect) {
        var parentNode = this.findParentNode(chart.element.id, labelElement, index);
        labelElement.setAttribute('opacity', '0.3');
        var zoomElement = chart.renderer.createGroup({
            id: chart.element.id + 'AxisLabels_Zoom' + index
        });
        zoomElement = createZoomingLabels(chart, axis, zoomElement, index, axis.orientation === 'Vertical', rect);
        parentNode.replaceChild(labelElement, document.getElementById(labelElement.id));
        if (getElement(chart.element.id + 'AxisLabels_Zoom' + index)) {
            parentNode.replaceChild(zoomElement, document.getElementById(zoomElement.id));
        }
        else {
            parentNode.appendChild(zoomElement);
        }
    };
    return CartesianAxisLayoutPanel;
}());
export { CartesianAxisLayoutPanel };
