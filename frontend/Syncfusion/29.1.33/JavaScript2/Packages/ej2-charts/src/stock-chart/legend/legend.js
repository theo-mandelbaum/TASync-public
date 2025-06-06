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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { getUnicodeText, textTrim, withInBounds } from '../../common/utils/helper';
import { BaseLegend, LegendOptions } from '../../common/legend/legend';
import { measureText } from '@syncfusion/ej2-svg-base';
import { legendClick, legendRender, regSub, regSup } from '../../common/model/constants';
import { StockChartBorder, StockChartFont, StockMargin } from '../model/base';
import { Browser } from '@syncfusion/ej2-base';
import { Property, Complex, ChildProperty } from '@syncfusion/ej2-base';
import { ContainerPadding, Location } from '../../common/model/base';
/**
 * Configures the legends in charts.
 */
var StockChartLegendSettings = /** @class */ (function (_super) {
    __extends(StockChartLegendSettings, _super);
    function StockChartLegendSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property(false)
    ], StockChartLegendSettings.prototype, "visible", void 0);
    __decorate([
        Property(null)
    ], StockChartLegendSettings.prototype, "height", void 0);
    __decorate([
        Property(null)
    ], StockChartLegendSettings.prototype, "width", void 0);
    __decorate([
        Complex({ x: 0, y: 0 }, Location)
    ], StockChartLegendSettings.prototype, "location", void 0);
    __decorate([
        Property('Auto')
    ], StockChartLegendSettings.prototype, "position", void 0);
    __decorate([
        Property('Series')
    ], StockChartLegendSettings.prototype, "mode", void 0);
    __decorate([
        Property(8)
    ], StockChartLegendSettings.prototype, "padding", void 0);
    __decorate([
        Property(null)
    ], StockChartLegendSettings.prototype, "itemPadding", void 0);
    __decorate([
        Property('Center')
    ], StockChartLegendSettings.prototype, "alignment", void 0);
    __decorate([
        Complex({ fontFamily: null, size: null, fontStyle: null, fontWeight: null, color: null }, StockChartFont)
    ], StockChartLegendSettings.prototype, "textStyle", void 0);
    __decorate([
        Property(10)
    ], StockChartLegendSettings.prototype, "shapeHeight", void 0);
    __decorate([
        Property(10)
    ], StockChartLegendSettings.prototype, "shapeWidth", void 0);
    __decorate([
        Complex({}, StockChartBorder)
    ], StockChartLegendSettings.prototype, "border", void 0);
    __decorate([
        Complex({ left: 0, right: 0, top: 0, bottom: 0 }, StockMargin)
    ], StockChartLegendSettings.prototype, "margin", void 0);
    __decorate([
        Complex({ left: 0, right: 0, top: 0, bottom: 0 }, ContainerPadding)
    ], StockChartLegendSettings.prototype, "containerPadding", void 0);
    __decorate([
        Property(8)
    ], StockChartLegendSettings.prototype, "shapePadding", void 0);
    __decorate([
        Property('transparent')
    ], StockChartLegendSettings.prototype, "background", void 0);
    __decorate([
        Property(1)
    ], StockChartLegendSettings.prototype, "opacity", void 0);
    __decorate([
        Property(true)
    ], StockChartLegendSettings.prototype, "toggleVisibility", void 0);
    __decorate([
        Property(null)
    ], StockChartLegendSettings.prototype, "description", void 0);
    __decorate([
        Property(3)
    ], StockChartLegendSettings.prototype, "tabIndex", void 0);
    __decorate([
        Property(null)
    ], StockChartLegendSettings.prototype, "title", void 0);
    __decorate([
        Complex({ fontFamily: null, size: null, fontStyle: null, fontWeight: null, color: null }, StockChartFont)
    ], StockChartLegendSettings.prototype, "titleStyle", void 0);
    __decorate([
        Property('Top')
    ], StockChartLegendSettings.prototype, "titlePosition", void 0);
    __decorate([
        Property(100)
    ], StockChartLegendSettings.prototype, "maximumTitleWidth", void 0);
    __decorate([
        Property(true)
    ], StockChartLegendSettings.prototype, "enablePages", void 0);
    __decorate([
        Property(false)
    ], StockChartLegendSettings.prototype, "isInversed", void 0);
    return StockChartLegendSettings;
}(ChildProperty));
export { StockChartLegendSettings };
/**
 * `Legend` module is used to render legend for the stockchart.
 */
var StockLegend = /** @class */ (function (_super) {
    __extends(StockLegend, _super);
    function StockLegend(chart) {
        var _this = _super.call(this, chart) || this;
        _this.library = _this;
        _this.addEventListener();
        return _this;
    }
    /**
     * Binding events for Stocklegend module.
     *
     * @returns {void}
     */
    StockLegend.prototype.addEventListener = function () {
        if (this.chart.isDestroyed) {
            return;
        }
        this.chart.on('click', this.click, this);
        this.chart.on(Browser.touchEndEvent, this.mouseEnd, this);
        this.chart.on(Browser.touchMoveEvent, this.mouseMove, this);
    };
    /**
     * UnBinding events for Stocklegend module.
     *
     * @returns {void}
     */
    StockLegend.prototype.removeEventListener = function () {
        if (this.chart.isDestroyed) {
            return;
        }
        this.chart.off('click', this.click);
        this.chart.off(Browser.touchEndEvent, this.mouseEnd);
        this.chart.off(Browser.touchMoveEvent, this.mouseMove);
    };
    /**
     * To handle mouse move for Stocklegend module.
     *
     * @param {MouseEvent} e - The mouse move event.
     * @returns {void}
     */
    StockLegend.prototype.mouseMove = function (e) {
        if (this.chart.legendSettings.visible && !this.chart.isTouch) {
            this.move(e);
        }
    };
    /**
     * To handle mouse end for Stocklegend module.
     *
     * @param {MouseEvent} e - The mouse move event.
     * @returns {void}
     */
    StockLegend.prototype.mouseEnd = function (e) {
        if (this.chart.legendSettings.visible && this.chart.isTouch) {
            this.move(e);
        }
    };
    StockLegend.prototype.getLegendOptions = function (visibleSeriesCollection) {
        this.legendCollections = [];
        var seriesType;
        var fillColor;
        if (visibleSeriesCollection.length > 1) {
            this.legend.mode = 'Series';
        }
        for (var _i = 0, visibleSeriesCollection_1 = visibleSeriesCollection; _i < visibleSeriesCollection_1.length; _i++) {
            var series = visibleSeriesCollection_1[_i];
            if (this.legend.mode === 'Series') {
                if (series.category !== 'Indicator') {
                    seriesType = series.type;
                    fillColor = (series.pointColorMapping && series.points.length > 0) ?
                        (series.points[0].interior ? series.points[0].interior : series.interior) : series.interior;
                    this.legendCollections.push(new LegendOptions(series.name, fillColor, series.legendShape, (series.category === 'TrendLine' ?
                        this.chart.series[series.sourceIndex].trendlines[series.index].visible : series.visible), seriesType, series.legendImageUrl, series.marker.shape, series.marker.visible));
                }
            }
        }
    };
    /**
     * Retrieves the bounds of the legend.
     *
     * @param {Size} availableSize - The available size for the legend.
     * @param {Rect} legendBound - The bounds of the legend element.
     * @param {StockChartLegendSettingsModel} legend - The settings for the legend.
     * @returns {void}
     * @private
     */
    StockLegend.prototype.getLegendBounds = function (availableSize, legendBound, legend) {
        this.calculateLegendTitle(legend, legendBound);
        var padding = legend.padding;
        this.isTitle = legend.title ? true : false;
        var titlePosition = legend.titlePosition;
        var extraWidth = 0;
        var extraHeight = 0;
        var legendOption;
        var arrowHeight = this.arrowHeight;
        var arrowWidth = this.arrowWidth;
        var verticalArrowSpace = this.isVertical && !legend.enablePages ? arrowHeight : 0;
        var titleSpace = this.isTitle && titlePosition === 'Top' ? this.fivePixel + this.legendTitleSize.height : 0;
        titleSpace = this.isTitle && this.isVertical && titlePosition !== 'Top' ? this.fivePixel + this.legendTitleSize.height : titleSpace;
        if (!this.isVertical) {
            extraHeight = !legend.height ? ((availableSize.height / 100) * 5) : 0;
        }
        else {
            extraWidth = !legend.width ? ((availableSize.width / 100) * 5) : 0;
        }
        legendBound.height += (extraHeight);
        legendBound.width += extraWidth;
        var shapePadding = legend.shapePadding;
        var shapeWidth = legend.shapeWidth;
        var maximumWidth = 0;
        var rowWidth = 0;
        var legendWidth = 0;
        var columnHeight = 0;
        var rowCount = 0;
        var titlePlusArrowSpace = 0;
        var legendEventArgs;
        this.maxItemHeight = Math.max(measureText('MeasureText', legend.textStyle, this.chart.themeStyle.legendLabelFont).height, legend.shapeHeight);
        var render = false;
        for (var i = 0; i < this.legendCollections.length; i++) {
            legendOption = this.legendCollections[i];
            if (regSup.test(legendOption.text)) {
                legendOption.text = getUnicodeText(legendOption.text, regSup);
            }
            if (regSub.test(legendOption.text)) {
                legendOption.text = getUnicodeText(legendOption.text, regSub);
            }
            legendEventArgs = {
                fill: legendOption.fill, text: legendOption.text, shape: legendOption.shape,
                markerShape: legendOption.markerShape, name: legendRender, cancel: false
            };
            this.chart.trigger(legendRender, legendEventArgs);
            legendOption.text = legendEventArgs.text;
            legendOption.render = !legendEventArgs.cancel;
            legendOption.shape = legendEventArgs.shape;
            legendOption.fill = legendEventArgs.fill;
            legendOption.markerShape = legendEventArgs.markerShape;
            legendOption.textSize = measureText(legendOption.text, legend.textStyle, this.chart.themeStyle.legendLabelFont);
            if (legendOption.render) {
                render = true;
                legendWidth = shapePadding + shapeWidth + legendOption.textSize.width + (!this.isVertical ? (i === 0) ? padding :
                    this.itemPadding : padding);
                rowWidth = rowWidth + legendWidth;
                if (!legend.enablePages && !this.isVertical) {
                    titlePlusArrowSpace = this.isTitle && titlePosition !== 'Top' ? this.legendTitleSize.width + this.fivePixel : 0;
                    titlePlusArrowSpace += arrowWidth;
                }
                if (legendBound.width < (padding + rowWidth + titlePlusArrowSpace) || this.isVertical) {
                    maximumWidth = Math.max(maximumWidth, (rowWidth + padding + titlePlusArrowSpace -
                        (this.isVertical ? 0 : legendWidth)));
                    if (rowCount === 0 && (legendWidth !== rowWidth)) {
                        rowCount = 1;
                    }
                    rowWidth = this.isVertical ? 0 : legendWidth;
                    rowCount++;
                    columnHeight = (rowCount * (this.maxItemHeight + (this.isVertical ? this.itemPadding : padding))) +
                        padding + titleSpace + verticalArrowSpace;
                }
            }
        }
        columnHeight = Math.max(columnHeight, (this.maxItemHeight + padding) + padding + titleSpace);
        this.isPaging = legendBound.height < columnHeight;
        if (this.isPaging && !legend.enablePages) {
            if (!this.isVertical) {
                columnHeight = (this.maxItemHeight + padding) + padding + (titlePosition === 'Top' ? titleSpace : 0);
            }
        }
        this.totalPages = rowCount;
        if (!this.isPaging && !this.isVertical) {
            rowWidth += this.isTitle && titlePosition !== 'Top' ? (this.fivePixel + this.legendTitleSize.width + this.fivePixel) : 0;
        }
        if (render) {
            this.setBounds(Math.max((rowWidth + padding), maximumWidth), columnHeight, legend, legendBound);
        }
        else {
            this.setBounds(0, 0, legend, legendBound);
        }
    };
    /**
     * Retrieves the render point for the legend.
     *
     * @param {LegendOptions} legendOptions - The options for the legend.
     * @param {ChartLocation} start - The starting point for rendering the legend.
     * @param {number} textPadding - The padding around legend text.
     * @param {LegendOptions} prevLegend - The options for the previous legend.
     * @param {Rect} rect - The bounding for the legend.
     * @param {number} count - The count of legends.
     * @param {number} firstLegend - The index of the first legend.
     * @returns {void}
     * @private
     */
    StockLegend.prototype.getRenderPoint = function (legendOptions, start, textPadding, prevLegend, rect, count, firstLegend) {
        var previousBound = (prevLegend.location.x + textPadding + prevLegend.textSize.width);
        var padding = this.legend.padding;
        if ((previousBound + (legendOptions.textSize.width + textPadding - this.itemPadding)) >
            (rect.x + rect.width + this.legend.shapeWidth / 2) ||
            this.isVertical) {
            legendOptions.location.x = start.x;
            legendOptions.location.y = (count === firstLegend) ? prevLegend.location.y :
                prevLegend.location.y + this.maxItemHeight + (this.isVertical ? this.itemPadding : padding);
        }
        else {
            legendOptions.location.x = (count === firstLegend) ? prevLegend.location.x : previousBound;
            legendOptions.location.y = prevLegend.location.y;
        }
        var availwidth = (this.legendBounds.width + this.legendBounds.x) - (legendOptions.location.x +
            textPadding - this.itemPadding - this.legend.shapeWidth / 2);
        legendOptions.text = textTrim(+availwidth.toFixed(4), legendOptions.text, this.legend.textStyle, this.chart.enableRtl, this.chart.themeStyle.legendLabelFont);
    };
    /**
     * Handles the click event on the legend.
     *
     * @param {number} index - The index of the legend item.
     * @returns {void}
     * @private
     */
    StockLegend.prototype.legendClick = function (index) {
        var chart = this.chart;
        var seriesIndex = chart.legendSettings.mode === 'Series' ? index : 0;
        var targetSeries = chart.visibleSeries[seriesIndex];
        var targetLegend = this.legendCollections[index];
        var legendClickArgs = {
            legendText: targetLegend.text, legendShape: targetLegend.shape,
            chart: chart, series: targetSeries, name: legendClick, cancel: false
        };
        this.chart.trigger(legendClick, legendClickArgs);
        targetSeries.legendShape = legendClickArgs.legendShape;
        if (targetSeries.fill !== null) {
            chart.visibleSeries[index].interior = targetSeries.fill;
        }
        if (chart.legendSettings.toggleVisibility) {
            chart.legendClicked = true;
            this.changeSeriesVisiblity(targetSeries, targetSeries.visible);
            targetLegend.visible = targetSeries.category === 'TrendLine' ? chart.series[targetSeries.sourceIndex].trendlines[targetSeries.index].visible :
                (targetSeries.visible);
            this.refreshLegendToggle(chart);
        }
    };
    StockLegend.prototype.refreshLegendToggle = function (chart) {
        var bounds = chart.stockLegendModule.legendBounds;
        chart.stockLegendModule.renderLegend(chart, chart.legendSettings, bounds);
    };
    StockLegend.prototype.changeSeriesVisiblity = function (series, visibility) {
        series.visible = !visibility;
        if (this.SecondaryAxis(series.yAxis)) {
            series.yAxis.internalVisibility = series.yAxis.series.some(function (value) { return (value.visible); });
        }
        if (this.SecondaryAxis(series.xAxis)) {
            series.xAxis.internalVisibility = series.xAxis.series.some(function (value) { return (value.visible); });
        }
    };
    StockLegend.prototype.SecondaryAxis = function (axis) {
        return (this.chart.axes.indexOf(axis) > -1);
    };
    /**
     * To show the tooltip for the trimmed text in legend.
     *
     * @param {Event | PointerEvent} event - The click event.
     * @returns {void}
     */
    StockLegend.prototype.click = function (event) {
        var _this = this;
        if (!this.chart.legendSettings.visible) {
            return;
        }
        var pageY = this.chart.mouseY;
        var pageX = this.chart.mouseX;
        var legendItemsId = [this.legendID + '_text_', this.legendID + '_shape_marker_',
            this.legendID + '_shape_'];
        var targetId = event.target.id;
        var seriesIndex;
        for (var _i = 0, legendItemsId_1 = legendItemsId; _i < legendItemsId_1.length; _i++) {
            var id = legendItemsId_1[_i];
            if (targetId.indexOf(id) > -1) {
                seriesIndex = parseInt(targetId.split(id)[1], 10);
                this.legendClick(seriesIndex);
                break;
            }
        }
        if (targetId.indexOf(this.legendID + '_pagedown') > -1) {
            this.changePage(event, false);
        }
        else if (targetId.indexOf(this.legendID + '_pageup') > -1) {
            this.changePage(event, true);
        }
        this.legendRegions.filter(function (region) {
            return (withInBounds(pageX, (pageY + (_this.isPaging ? (_this.currentPageNumber - 1) *
                _this.translatePage(false, null, 1, 2) : 0)), region.rect));
        });
    };
    /**
     * Get module name.
     *
     * @returns {string} - Returns the module name.
     */
    StockLegend.prototype.getModuleName = function () {
        return 'StockLegend';
    };
    /**
     * To destroy the Legend.
     *
     * @returns {void}
     * @private
     */
    StockLegend.prototype.destroy = function () {
        this.removeEventListener();
    };
    return StockLegend;
}(BaseLegend));
export { StockLegend };
