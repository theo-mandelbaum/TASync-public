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
/**
 * Chart legend
 */
import { remove, Browser, extend, isNullOrUndefined } from '@syncfusion/ej2-base';
import { LegendOptions, BaseLegend } from '../../common/legend/legend';
import { textTrim, removeElement, RectOption, withInBounds, blazorTemplatesReset } from '../../common/utils/helper';
import { getUnicodeText } from '../../common/utils/helper';
import { measureText, Rect, getElement } from '@syncfusion/ej2-svg-base';
import { legendRender, legendClick, regSub, regSup } from '../../common/model/constants';
import { textWrap } from '../../common/utils/helper';
/**
 * The `Legend` module is used to render the legend for the chart.
 */
var Legend = /** @class */ (function (_super) {
    __extends(Legend, _super);
    function Legend(chart) {
        var _this = _super.call(this, chart) || this;
        _this.library = _this;
        _this.addEventListener();
        return _this;
    }
    /**
     * Binding events for legend module.
     *
     * @returns {void}
     */
    Legend.prototype.addEventListener = function () {
        if (this.chart.isDestroyed) {
            return;
        }
        this.chart.on(Browser.touchMoveEvent, this.mouseMove, this);
        this.chart.on('click', this.click, this);
        this.chart.on(Browser.touchEndEvent, this.mouseEnd, this);
    };
    /**
     * UnBinding events for legend module.
     *
     * @returns {void}
     */
    Legend.prototype.removeEventListener = function () {
        if (this.chart.isDestroyed) {
            return;
        }
        this.chart.off(Browser.touchMoveEvent, this.mouseMove);
        this.chart.off('click', this.click);
        this.chart.off(Browser.touchEndEvent, this.mouseEnd);
    };
    /**
     * To handle mosue move for legend module.
     *
     * @param {MouseEvent} e - The mouse event.
     * @returns {void}
     */
    Legend.prototype.mouseMove = function (e) {
        if (this.chart.legendSettings.visible && !this.chart.isTouch) {
            this.move(e);
            if (this.chart.highlightModule && (this.chart.highlightMode !== 'None' || this.chart.legendSettings.enableHighlight)) {
                var legendItemsId = [this.legendID + '_text_', this.legendID + '_shape_marker_',
                    this.legendID + '_shape_', this.legendID + '_g_'];
                var targetId = e.target.id;
                var index = void 0;
                for (var _i = 0, legendItemsId_1 = legendItemsId; _i < legendItemsId_1.length; _i++) {
                    var id = legendItemsId_1[_i];
                    if (targetId.indexOf(id) > -1) {
                        index = parseInt(targetId.split(id)[1], 10);
                        this.chart.highlightModule.legendSelection(this.chart, index, e.target, e.type);
                        break;
                    }
                }
                // this.click(e);
            }
        }
    };
    /**
     * To handle mosue end for legend module.
     *
     * @param {MouseEvent} e - The mouse event.
     * @returns {void}
     */
    Legend.prototype.mouseEnd = function (e) {
        if (this.chart.legendSettings.visible && this.chart.isTouch) {
            this.move(e);
        }
    };
    /**
     * Retrieves the legend options based on the visible series collection and chart.
     *
     * @param {Series[]} visibleSeriesCollection - The collection of visible series.
     * @param {Chart} chart - The chart instance.
     * @returns {void}
     * @private
     */
    Legend.prototype.getLegendOptions = function (visibleSeriesCollection, chart) {
        this.legendCollections = [];
        var seriesType;
        var fill;
        var dashArray;
        var colors = [];
        this.isRtlEnable = chart.enableRtl;
        this.isReverse = !this.isRtlEnable && chart.legendSettings.reverse;
        if (visibleSeriesCollection.length > 1) {
            this.legend.mode = 'Series';
        }
        for (var _i = 0, visibleSeriesCollection_1 = visibleSeriesCollection; _i < visibleSeriesCollection_1.length; _i++) {
            var series = visibleSeriesCollection_1[_i];
            if (this.legend.mode === 'Series') {
                if (series.category !== 'Indicator') {
                    seriesType = (chart.chartAreaType === 'PolarRadar') ? series.drawType :
                        series.type;
                    dashArray = !series.marker.visible && (seriesType.indexOf('Line') > -1 && seriesType.indexOf('Area') === -1) ? series.dashArray : '';
                    // To set legend color when use pointColorMapping
                    fill = (series.pointColorMapping && series.points.length > 0) ?
                        (series.points[0].interior ? series.points[0].interior : series.interior) : series.interior;
                    this.legendCollections.push(new LegendOptions(series.name, fill, series.legendShape, (series.category === 'TrendLine' ?
                        this.chart.series[series.sourceIndex].trendlines[series.index].visible : series.visible), seriesType, series.legendImageUrl ? series.legendImageUrl : (series.type === 'Scatter' && series.marker.shape === 'Image' ?
                        series.marker.imageUrl : ''), series.marker.shape, series.marker.visible, null, null, dashArray));
                }
            }
            else if (this.legend.mode === 'Point') {
                for (var _a = 0, _b = series.points; _a < _b.length; _a++) {
                    var points = _b[_a];
                    seriesType = (chart.chartAreaType === 'PolarRadar') ? series.drawType :
                        series.type;
                    fill = points.interior ? points.interior : series.interior;
                    this.legendCollections.push(new LegendOptions(points.x.toString(), fill, series.legendShape, (series.category === 'TrendLine' ?
                        this.chart.series[series.sourceIndex].trendlines[series.index].visible : points.visible), seriesType, (series.type === 'Scatter' && series.marker.shape === 'Image') ? series.marker.imageUrl : '', series.marker.shape, series.marker.visible));
                }
            }
            else if (this.legend.mode === 'Range') {
                for (var _c = 0, _d = series.points; _c < _d.length; _c++) {
                    var points = _d[_c];
                    seriesType = (chart.chartAreaType === 'PolarRadar') ? series.drawType :
                        series.type;
                    fill = points.interior ? points.interior : series.interior;
                    var legendLabel = 'Others';
                    if (colors.indexOf(fill) < 0) {
                        colors.push(fill);
                        if (chart.rangeColorSettings.length >= 1 && chart.rangeColorSettings[0].colors.length === 1) {
                            for (var _e = 0, _f = chart.rangeColorSettings; _e < _f.length; _e++) {
                                var rangeMap = _f[_e];
                                if (rangeMap.colors[0] === fill) {
                                    legendLabel = rangeMap.label;
                                }
                            }
                            this.legendCollections.push(new LegendOptions(legendLabel, fill, series.legendShape, (series.category === 'TrendLine' ?
                                this.chart.series[series.sourceIndex].trendlines[series.index].visible : points.visible), seriesType, (series.type === 'Scatter' && series.marker.shape === 'Image') ? series.marker.imageUrl : '', series.marker.shape, series.marker.visible));
                        }
                    }
                }
            }
            else {
                if (this.legendCollections.length === 0 && chart.rangeColorSettings.length > 0) {
                    var startLabel = chart.rangeColorSettings[0].start.toString();
                    var endLabel = chart.rangeColorSettings[chart.rangeColorSettings.length - 1].end.toString();
                    this.legendCollections.push(new LegendOptions(startLabel, series.interior, 'Rectangle', true, seriesType, '', series.marker.shape, series.marker.visible));
                    this.legendCollections.push(new LegendOptions(endLabel, series.interior, 'Rectangle', true, seriesType, '', series.marker.shape, series.marker.visible));
                }
            }
        }
        if (this.isReverse && chart.legendSettings.mode !== 'Gradient') {
            this.legendCollections.reverse();
        }
    };
    /**
     * Calculates the legend bounds based on the available size and legend settings.
     *
     * @param {Size} availableSize - The available size for the legend.
     * @param {Rect} legendBounds - The current bounds of the legend.
     * @param {LegendSettingsModel} legend - The legend settings.
     * @returns {void}
     * @private
     */
    Legend.prototype.getLegendBounds = function (availableSize, legendBounds, legend) {
        this.calculateLegendTitle(legend, legendBounds);
        this.isTitle = legend.title ? true : false;
        this.chartRowCount = 1;
        this.rowHeights = [];
        this.columnHeights = [];
        this.pageHeights = [];
        var padding = legend.padding;
        var titlePosition = legend.titlePosition;
        var extraHeight = 0;
        var legendOption;
        var extraWidth = 0;
        var arrowWidth = this.arrowWidth;
        var arrowHeight = this.arrowHeight;
        var verticalArrowSpace = this.isVertical && !legend.enablePages ? arrowHeight : 0;
        var titleSpace = this.isTitle && titlePosition === 'Top' ? this.legendTitleSize.height + this.fivePixel : 0;
        titleSpace = this.isTitle && this.isVertical && titlePosition !== 'Top' ? this.legendTitleSize.height + this.fivePixel : titleSpace;
        if (!this.isVertical) {
            extraHeight = !legend.height ? ((availableSize.height / 100) * 5) : 0;
        }
        else {
            extraWidth = !legend.width ? ((availableSize.width / 100) * 5) : 0;
        }
        legendBounds.height += (extraHeight);
        legendBounds.width += extraWidth;
        var shapeWidth = legend.shapeWidth;
        var shapePadding = legend.shapePadding;
        var maximumWidth = 0;
        var rowWidth = 0;
        var legendWidth = 0;
        var columnHeight = 0;
        var columnCount = 0;
        var rowCount = 0;
        var titlePlusArrowSpace = 0;
        var legendEventArgs;
        var render = false;
        this.maxItemHeight = Math.max(measureText('MeasureText', legend.textStyle, this.chart.themeStyle.legendLabelFont).height, legend.shapeHeight);
        var maxColumn = legend.layout === 'Auto' && legend.maximumColumns > 0;
        if (legend.fixedWidth) {
            for (var i = 0; i < this.legendCollections.length; i++) {
                var textWidth = shapeWidth + shapePadding + (!this.isVertical ? (i === 0) ? padding : this.itemPadding
                    : padding) + (legend.maximumLabelWidth ? legend.maximumLabelWidth :
                    measureText(this.legendCollections[i].text, legend.textStyle, this.chart.themeStyle.legendLabelFont).width);
                this.maxWidth = Math.max(this.maxWidth, textWidth);
            }
        }
        for (var i = 0; i < this.legendCollections.length; i++) {
            legendOption = this.legendCollections[i];
            if (regSub.test(legendOption.text)) {
                legendOption.text = getUnicodeText(legendOption.text, regSub);
            }
            if (regSup.test(legendOption.text)) {
                legendOption.text = getUnicodeText(legendOption.text, regSup);
            }
            legendEventArgs = {
                fill: legendOption.fill, text: legendOption.text, shape: legendOption.shape,
                markerShape: legendOption.markerShape, name: legendRender, cancel: false
            };
            this.chart.trigger(legendRender, legendEventArgs);
            legendOption.render = !legendEventArgs.cancel;
            legendOption.text = legendEventArgs.text;
            legendOption.fill = legendEventArgs.fill;
            legendOption.shape = legendEventArgs.shape;
            legendOption.markerShape = legendEventArgs.markerShape;
            legendOption.textSize = measureText(legendOption.text, legend.textStyle, this.chart.themeStyle.legendLabelFont);
            shapeWidth = legendOption.text ? legend.shapeWidth : 0;
            shapePadding = legendOption.text ? legend.shapePadding : 0;
            if (legendOption.render && legendOption.text) {
                render = true;
                legendWidth = legend.fixedWidth ? this.maxWidth : shapeWidth + shapePadding +
                    (legend.maximumLabelWidth ? legend.maximumLabelWidth : legendOption.textSize.width) +
                    ((!this.isVertical || legend.layout === 'Horizontal') ? (i === 0 || (columnCount === 1 && rowCount > 0 && legend.layout === 'Horizontal')) ? padding : this.itemPadding : padding);
                rowWidth = rowWidth + legendWidth;
                if (!legend.enablePages && !this.isVertical) {
                    titlePlusArrowSpace = this.isTitle && titlePosition !== 'Top' ? this.legendTitleSize.width + this.fivePixel : 0;
                    titlePlusArrowSpace += arrowWidth;
                }
                this.getLegendHeight(legendOption, legend, legendBounds, rowWidth, this.maxItemHeight, padding);
                if (maxColumn ? columnCount === legend.maximumColumns : legend.layout === 'Vertical' || (legendBounds.width < (padding + rowWidth + titlePlusArrowSpace)) || (this.isVertical && legend.layout === 'Auto')) {
                    maximumWidth = Math.max(maximumWidth, (rowWidth + padding + titlePlusArrowSpace - (this.isVertical &&
                        this.legend.layout === 'Auto' ? 0 : legendWidth)));
                    if (rowCount === 0 && (legendWidth !== rowWidth)) {
                        rowCount = 1;
                    }
                    rowWidth = this.isVertical && this.legend.layout === 'Auto' ? 0 : legendWidth;
                    rowCount++;
                    columnCount = 0;
                    columnHeight = verticalArrowSpace;
                    //columnHeight = (rowCount * (this.maxItemHeight + padding)) + padding + titleSpace + verticalArrowSpace;
                }
                var len = (rowCount > 0 ? (rowCount - 1) : 0);
                this.rowHeights[len] = Math.max((this.rowHeights[len] ?
                    this.rowHeights[len] : 0), Math.max(legendOption.textSize.height, legend.shapeHeight));
                // this.maxItemHeight = Math.max(this.maxItemHeight, legendOption.textSize.height);
                this.columnHeights[columnCount] = (this.columnHeights[columnCount] ?
                    this.columnHeights[columnCount] : 0) + Math.max(legendOption.textSize.height, legend.shapeHeight) +
                    ((this.isVertical || (rowCount > 0 && this.legend.itemPadding)) ? (i === 0) ? padding : this.itemPadding : padding);
                columnCount++;
            }
        }
        columnHeight = Math.max.apply(null, this.columnHeights) + padding + titleSpace;
        columnHeight = Math.max(columnHeight, (this.maxItemHeight + padding) + padding + titleSpace);
        if (legend.layout === 'Horizontal') {
            columnHeight = this.maxItemHeight + (padding * 2) + titleSpace + this.pageButtonSize + legend.border.width;
        }
        this.isPaging = (legendBounds.height < columnHeight || (legend.layout === 'Horizontal' && this.rowHeights.length > 1)) && !maxColumn;
        if (this.isPaging && !legend.enablePages) {
            if (!this.isVertical) {
                columnHeight = (this.maxItemHeight + padding) + padding + (titlePosition === 'Top' ? titleSpace : 0);
            }
        }
        this.totalPages = rowCount;
        if (maxColumn && this.maxWidth && legend.fixedWidth) {
            rowWidth = this.maxWidth * legend.maximumColumns;
            this.isPaging = false;
        }
        if ((!this.isPaging || this.legend.layout !== 'Auto') && !this.isVertical) {
            rowWidth += this.isTitle && titlePosition !== 'Top' ? (this.fivePixel + this.legendTitleSize.width + this.fivePixel) : 0;
        }
        if (render) {
            this.setBounds(Math.max((rowWidth + padding), maximumWidth), columnHeight, legend, legendBounds);
        }
        else {
            this.setBounds(0, 0, legend, legendBounds);
        }
    };
    /**
     * Calculates the height of the legend based on the legend options, settings, and available space.
     *
     * @param {LegendOptions} legendOption - The legend options.
     * @param {LegendSettingsModel} legend - The legend settings.
     * @param {Rect} legendBounds - The current bounds of the legend.
     * @param {number} rowWidth - The width of the legend rows.
     * @param {number} legendHeight - The current height of the legend.
     * @param {number} padding - The padding around the legend items.
     * @returns {void}
     * @private
     */
    Legend.prototype.getLegendHeight = function (legendOption, legend, legendBounds, rowWidth, legendHeight, padding) {
        var legendWidth = legendOption.textSize.width;
        var textPadding = legend.shapePadding + (padding * 2) + legend.shapeWidth;
        switch (legend.textWrap) {
            case 'Wrap':
            case 'AnyWhere':
                if (legendWidth > legend.maximumLabelWidth || legendWidth + rowWidth > legendBounds.width) {
                    legendOption.textCollection = textWrap(legendOption.text, (legend.maximumLabelWidth ? Math.min(legend.maximumLabelWidth, (legendBounds.width - textPadding)) :
                        (legendBounds.width - textPadding)), legend.textStyle, this.chart.enableRtl, null, null, this.chart.themeStyle.legendLabelFont);
                }
                else {
                    legendOption.textCollection.push(legendOption.text);
                }
                legendOption.textSize.height = (legendHeight * legendOption.textCollection.length);
                break;
        }
    };
    /**
     * Calculates the rendering point for the legend item based on various parameters.
     *
     * @param {LegendOptions} legendOption - The legend options.
     * @param {ChartLocation} start - The starting location for the legend.
     * @param {number} textPadding - The padding around the legend text.
     * @param {LegendOptions} previousLegend - The options of the previous legend item.
     * @param {Rect} rect - The bounding rectangle for the legend.
     * @param {number} count - The count of legend items.
     * @param {number} firstLegend - The index of the first legend item.
     * @returns {void}
     * @private
     */
    Legend.prototype.getRenderPoint = function (legendOption, start, textPadding, previousLegend, rect, count, firstLegend) {
        var padding = this.legend.padding;
        var textWidth = this.legend.fixedWidth ? this.maxWidth : textPadding + (this.legend.maximumLabelWidth ?
            this.legend.maximumLabelWidth : previousLegend.textSize.width);
        var previousBound = previousLegend.location.x + ((!this.isRtlEnable) ? textWidth : -textWidth);
        if (this.legend.layout === 'Auto' && this.legend.maximumColumns > 0 ? count % this.legend.maximumColumns === 0 : this.legend.layout === 'Vertical' || this.isWithinBounds(previousBound, (this.legend.maximumLabelWidth ?
            this.legend.maximumLabelWidth : legendOption.textSize.width) + textPadding - this.itemPadding, rect) || (this.isVertical && this.legend.layout === 'Auto')) {
            legendOption.location.x = start.x;
            if (count !== firstLegend) {
                this.chartRowCount++;
            }
            legendOption.location.y = (count === firstLegend) ? previousLegend.location.y :
                previousLegend.location.y + (this.isVertical && this.legend.layout !== 'Horizontal' && !(this.legend.maximumColumns > 0) ? Math.max(previousLegend.textSize.height, this.legend.shapeHeight) :
                    this.rowHeights[(this.chartRowCount - 2)]) + ((this.isVertical || (this.chartRowCount > 1 &&
                    this.legend.itemPadding)) ? this.itemPadding : padding);
        }
        else {
            legendOption.location.x = (count === firstLegend) ? previousLegend.location.x : previousBound;
            legendOption.location.y = previousLegend.location.y;
        }
        var availwidth = (!this.isRtlEnable) ? (this.legendBounds.x + this.legendBounds.width) - (legendOption.location.x +
            textPadding - this.itemPadding - this.legend.shapeWidth / 2) : (legendOption.location.x - textPadding + this.itemPadding +
            (this.legend.shapeWidth / 2)) - this.legendBounds.x;
        if (!this.isVertical && this.isPaging && !this.legend.enablePages) {
            availwidth = this.legendBounds.width - legendOption.location.x - this.fivePixel;
        }
        availwidth = this.legend.maximumLabelWidth ? Math.min(this.legend.maximumLabelWidth, availwidth) : availwidth;
        if (this.legend.textOverflow === 'Ellipsis' && this.legend.textWrap === 'Normal') {
            legendOption.text = textTrim(+availwidth.toFixed(4), legendOption.text, this.legend.textStyle, this.chart.enableRtl, this.chart.themeStyle.legendLabelFont);
        }
    };
    Legend.prototype.isWithinBounds = function (previousBound, textWidth, rect) {
        if (!this.isRtlEnable) {
            return (previousBound + textWidth) > (rect.x + rect.width + (this.legend.shapeWidth / 2));
        }
        else {
            return (previousBound - textWidth) < (rect.x - (this.legend.shapeWidth / 2));
        }
    };
    /**
     * Handles the click event for a legend item.
     *
     * @param {number} index - The index of the clicked legend item.
     * @param {Event | PointerEvent} event - The click event.
     * @returns {void}
     * @private
     */
    Legend.prototype.LegendClick = function (index, event) {
        var chart = this.chart;
        var seriesIndex = chart.legendSettings.mode === 'Series' ? index : 0;
        var legendIndex = !this.isReverse ? index : (this.legendCollections.length - 1) - index;
        var series = chart.visibleSeries[seriesIndex];
        var legend = this.legendCollections[legendIndex];
        var changeDetection = 'isProtectedOnChange';
        if (chart.legendSettings.mode === 'Series') {
            var legendClickArgs = {
                legendText: legend.text, legendShape: legend.shape,
                chart: chart.isBlazor ? {} : chart, series: series, points: series.points, name: legendClick, cancel: false
            };
            this.chart.trigger(legendClick, legendClickArgs);
            series.legendShape = legendClickArgs.legendShape;
            if (!legendClickArgs.cancel) {
                if (series.fill !== null) {
                    chart.visibleSeries[index].interior = series.fill;
                }
                if (chart.legendSettings.toggleVisibility) {
                    series.chart[changeDetection] = true;
                    if (series.category === 'TrendLine') {
                        if (!chart.series[series.sourceIndex].trendlines[series.index].visible &&
                            chart.series[series.sourceIndex].visible) {
                            chart.series[series.sourceIndex].trendlines[series.index].visible = true;
                        }
                        else {
                            chart.series[series.sourceIndex].trendlines[series.index].visible = false;
                        }
                    }
                    else {
                        this.changeSeriesVisiblity(series, series.visible);
                    }
                    legend.visible = series.category === 'TrendLine' ? chart.series[series.sourceIndex].trendlines[series.index].visible :
                        (series.visible);
                    this.refreshLegendToggle(chart, series);
                    if (chart.highlightModule && chart.legendSettings.enableHighlight) {
                        chart.highlightModule.legendSelection(chart, index, event.target, 'mousemove');
                    }
                }
                else if (chart.highlightModule) {
                    chart.highlightModule.legendSelection(chart, index, event.target, event.type);
                }
                else if (chart.selectionModule) {
                    chart.selectionModule.legendSelection(chart, index, event.target, event.type);
                }
                series.chart[changeDetection] = false;
            }
        }
        else if (chart.legendSettings.mode === 'Point') {
            var point = series.points[index];
            var legendClickArgs = {
                legendText: legend.text, legendShape: legend.shape,
                chart: chart.isBlazor ? {} : chart, series: series, points: [point], name: legendClick, cancel: false
            };
            this.chart.trigger(legendClick, legendClickArgs);
            if (chart.legendSettings.toggleVisibility && !legendClickArgs.cancel) {
                point.visible = !point.visible;
                var legendOption = this.legendCollections[index];
                legendOption.visible = point.visible;
                this.refreshLegendToggle(chart, series);
            }
        }
        else if (chart.legendSettings.mode === 'Range') {
            var points = [];
            var legendOption = this.legendCollections[index];
            for (var _i = 0, _a = series.points; _i < _a.length; _i++) {
                var point = _a[_i];
                if (legendOption.fill === (point.interior || series.interior)) {
                    points.push(point);
                }
            }
            var legendClickArgs = {
                legendText: legend.text, legendShape: legend.shape,
                chart: chart.isBlazor ? {} : chart, series: series, points: points, name: legendClick, cancel: false
            };
            this.chart.trigger(legendClick, legendClickArgs);
            if (chart.legendSettings.toggleVisibility && !legendClickArgs.cancel) {
                legendOption.visible = !legendOption.visible;
                for (var _b = 0, points_1 = points; _b < points_1.length; _b++) {
                    var point = points_1[_b];
                    point.visible = !point.visible;
                }
                this.refreshLegendToggle(chart, series);
            }
        }
    };
    Legend.prototype.refreshLegendToggle = function (chart, series) {
        var selectedDataIndexes = [];
        if (chart.selectionModule) {
            selectedDataIndexes = extend([], chart.selectionModule.selectedDataIndexes, null, true);
        }
        if ((chart.svgObject.childNodes.length > 0) && !chart.enableAnimation && !chart.enableCanvas) {
            while (chart.svgObject.lastChild) {
                chart.svgObject.removeChild(chart.svgObject.lastChild);
            }
            remove(chart.svgObject);
        }
        chart.animateSeries = false;
        chart.redraw = chart.enableAnimation;
        series.isLegendClicked = true;
        chart.rotatedDataLabelCollections = [];
        removeElement(getElement(chart.element.id + '_Secondary_Element').querySelectorAll('.ejSVGTooltip')[0]);
        blazorTemplatesReset(chart);
        this.redrawSeriesElements(series, chart);
        chart.removeSvg();
        chart.refreshAxis();
        series.refreshAxisLabel();
        this.refreshSeries(chart.visibleSeries);
        for (var _i = 0, _a = chart.visibleSeries; _i < _a.length; _i++) {
            var series_1 = _a[_i];
            if (!isNullOrUndefined(series_1)) {
                chart.markerRender.removeHighlightedMarker(series_1, null, true);
            }
        }
        chart.refreshBound();
        chart.trigger('loaded', { chart: chart });
        if (selectedDataIndexes.length > 0) {
            chart.selectionModule.selectedDataIndexes = selectedDataIndexes;
            chart.selectionModule.redrawSelection(chart, chart.selectionMode);
        }
        if (!chart.enableCanvas && chart.highlightModule && (chart.highlightMode !== 'None' || chart.legendSettings.enableHighlight)) {
            chart.highlightModule.redrawSelection(chart, chart.highlightMode);
        }
        chart.redraw = false;
        series.isLegendClicked = false;
    };
    Legend.prototype.changeSeriesVisiblity = function (series, visibility) {
        series.visible = !visibility;
        if (this.isSecondaryAxis(series.xAxis)) {
            series.xAxis.internalVisibility = series.xAxis.series.some(function (value) { return (value.visible); });
        }
        if (this.isSecondaryAxis(series.yAxis) || (series.category === 'Pareto' && series.type === 'Line')) {
            series.yAxis.internalVisibility = series.yAxis.series.some(function (value) { return (value.visible); });
        }
        if (series.trendlines.length && series.visible) {
            series.trendlines.forEach(function (trendline) {
                trendline.visible = true;
            });
        }
    };
    Legend.prototype.isSecondaryAxis = function (axis) {
        return (this.chart.axes.indexOf(axis) > -1);
    };
    Legend.prototype.redrawSeriesElements = function (series, chart) {
        if (!chart.redraw) {
            return null;
        }
        removeElement(chart.element.id + '_Series_' + (series.index === undefined ? series.category : series.index) +
            '_DataLabelCollections');
    };
    Legend.prototype.refreshSeries = function (seriesCollection) {
        for (var _i = 0, seriesCollection_1 = seriesCollection; _i < seriesCollection_1.length; _i++) {
            var series = seriesCollection_1[_i];
            if (series.type.indexOf('Spline') > -1) {
                var isArea = (series.type.indexOf('Area') > -1 || series.drawType.indexOf('Area') > -1);
                var isRange = series.type.indexOf('Range') > -1;
                this.chart['spline' + (isArea ? isRange ? 'RangeArea' : 'Area' : '') + 'SeriesModule'].findSplinePoint(series);
            }
            if (series.visible) {
                series.position = undefined;
            }
        }
    };
    /**
     * Handles the click event for showing tooltip on trimmed text in legend.
     *
     * @param {Event | PointerEvent} event - The click event.
     * @returns {void}
     * @private
     */
    Legend.prototype.click = function (event) {
        var _this = this;
        if (!this.chart.legendSettings.visible) {
            return;
        }
        var pageX = this.chart.mouseX;
        var pageY = this.chart.mouseY;
        var legendRegion = [];
        var targetId = event.target.id.indexOf('_chart_legend_g_') > -1 ?
            event.target.firstChild['id'] : event.target.id;
        var legendItemsId = [this.legendID + '_text_', this.legendID + '_shape_marker_',
            this.legendID + '_shape_'];
        var seriesIndex;
        for (var _i = 0, legendItemsId_2 = legendItemsId; _i < legendItemsId_2.length; _i++) {
            var id = legendItemsId_2[_i];
            if (targetId.indexOf(id) > -1) {
                seriesIndex = parseInt(targetId.split(id)[1], 10);
                this.LegendClick(seriesIndex, event);
                break;
            }
        }
        if (targetId.indexOf(this.legendID + '_pageup') > -1) {
            this.changePage(event, true);
        }
        else if (targetId.indexOf(this.legendID + '_pagedown') > -1) {
            this.changePage(event, false);
        }
        if (this.chart.enableCanvas && this.pagingRegions.length) {
            this.checkWithinBounds(pageX, pageY);
        }
        legendRegion = this.legendRegions.filter(function (region) {
            return (withInBounds(pageX, (pageY + (_this.isPaging ? (_this.currentPageNumber - 1) *
                _this.translatePage(_this.chart.enableCanvas, null, 1, 2) : 0)), region.rect));
        });
        if (legendRegion.length && this.chart.enableCanvas) {
            this.LegendClick(legendRegion[0].index, event);
        }
    };
    /**
     * Checks whether the provided coordinates are within the bounds.
     *
     * @param {number} pageX - The x-coordinate of the mouse pointer.
     * @param {number} pageY - The y-coordinate of the mouse pointer.
     * @returns {void}
     * @protected
     */
    Legend.prototype.checkWithinBounds = function (pageX, pageY) {
        var cRender = this.chart.renderer;
        var bounds = this.legendBounds;
        var borderWidth = this.chart.legendSettings.border.width;
        var canvasRect = new Rect(bounds.x, bounds.y, bounds.width, bounds.height);
        canvasRect.x = canvasRect.x - borderWidth / 2;
        canvasRect.y = canvasRect.y - borderWidth / 2;
        canvasRect.width = canvasRect.width + borderWidth;
        canvasRect.height = canvasRect.height + borderWidth;
        if (withInBounds(pageX, pageY, this.pagingRegions[0])) {
            // pageDown calculations are performing here
            if (!this.isRtlEnable) {
                this.canvasPageDown(cRender, canvasRect, bounds);
            }
            else {
                this.canvasPageUp(cRender, canvasRect, bounds);
            }
            return null;
        }
        if (withInBounds(pageX, pageY, this.pagingRegions[1])) {
            // pageUp calculations are performing here
            if (!this.isRtlEnable) {
                this.canvasPageUp(cRender, canvasRect, bounds);
            }
            else {
                this.canvasPageDown(cRender, canvasRect, bounds);
            }
            return null;
        }
    };
    Legend.prototype.canvasPageDown = function (cRender, canvasRect, bounds) {
        if (--this.currentPageNumber > 0) {
            this.legendRegions = [];
            cRender.clearRect(canvasRect);
            cRender.canvasClip(new RectOption('legendClipPath', 'transparent', { width: 0, color: '' }, null, canvasRect));
            this.renderLegend(this.chart, this.legend, bounds);
            cRender.canvasRestore();
        }
        else {
            ++this.currentPageNumber;
        }
    };
    Legend.prototype.canvasPageUp = function (cRender, canvasRect, bounds) {
        if (++this.currentPageNumber > 0 && this.currentPageNumber <= this.totalNoOfPages) {
            this.legendRegions = [];
            cRender.clearRect(canvasRect);
            cRender.canvasClip(new RectOption('legendClipPath', 'transpaent', { width: 0, color: '' }, null, canvasRect));
            this.renderLegend(this.chart, this.legend, bounds);
            cRender.canvasRestore();
        }
        else {
            --this.currentPageNumber;
        }
    };
    /**
     * Get module name.
     *
     * @returns {string} - Returns the module name.
     */
    Legend.prototype.getModuleName = function () {
        return 'Legend';
    };
    /**
     * To destroy the Legend.
     *
     * @returns {void}
     * @private
     */
    Legend.prototype.destroy = function () {
        this.removeEventListener();
    };
    return Legend;
}(BaseLegend));
export { Legend };
