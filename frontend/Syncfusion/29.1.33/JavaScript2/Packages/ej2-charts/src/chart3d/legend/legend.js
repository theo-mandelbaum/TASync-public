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
/**
 * Chart legend
 */
import { Browser, ChildProperty, Complex, Property, extend, remove } from '@syncfusion/ej2-base';
import { Border, ContainerPadding, Font, Margin } from '../../common/model/base';
import { LegendOptions, BaseLegend } from '../../common/legend/legend';
import { textTrim, removeElement } from '../../common/utils/helper';
import { getUnicodeText } from '../../common/utils/helper';
import { measureText, getElement } from '@syncfusion/ej2-svg-base';
import { legendRender, legendClick, regSub, regSup } from '../../common/model/constants';
import { textWrap } from '../../common/utils/helper';
import { Location } from '../../common/model/base';
/**
 * Configures the legends in charts.
 */
var Chart3DLegendSettings = /** @class */ (function (_super) {
    __extends(Chart3DLegendSettings, _super);
    function Chart3DLegendSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property(true)
    ], Chart3DLegendSettings.prototype, "visible", void 0);
    __decorate([
        Property(null)
    ], Chart3DLegendSettings.prototype, "height", void 0);
    __decorate([
        Property(null)
    ], Chart3DLegendSettings.prototype, "width", void 0);
    __decorate([
        Complex({ x: 0, y: 0 }, Location)
    ], Chart3DLegendSettings.prototype, "location", void 0);
    __decorate([
        Property('Auto')
    ], Chart3DLegendSettings.prototype, "position", void 0);
    __decorate([
        Property('Series')
    ], Chart3DLegendSettings.prototype, "mode", void 0);
    __decorate([
        Property(8)
    ], Chart3DLegendSettings.prototype, "padding", void 0);
    __decorate([
        Property(null)
    ], Chart3DLegendSettings.prototype, "itemPadding", void 0);
    __decorate([
        Property('Center')
    ], Chart3DLegendSettings.prototype, "alignment", void 0);
    __decorate([
        Complex({ fontFamily: null, size: null, fontStyle: null, fontWeight: null, color: null }, Font)
    ], Chart3DLegendSettings.prototype, "textStyle", void 0);
    __decorate([
        Property(10)
    ], Chart3DLegendSettings.prototype, "shapeHeight", void 0);
    __decorate([
        Property(10)
    ], Chart3DLegendSettings.prototype, "shapeWidth", void 0);
    __decorate([
        Complex({}, Border)
    ], Chart3DLegendSettings.prototype, "border", void 0);
    __decorate([
        Complex({ left: 0, right: 0, top: 0, bottom: 0 }, Margin)
    ], Chart3DLegendSettings.prototype, "margin", void 0);
    __decorate([
        Complex({ left: 0, right: 0, top: 0, bottom: 0 }, ContainerPadding)
    ], Chart3DLegendSettings.prototype, "containerPadding", void 0);
    __decorate([
        Property(8)
    ], Chart3DLegendSettings.prototype, "shapePadding", void 0);
    __decorate([
        Property('transparent')
    ], Chart3DLegendSettings.prototype, "background", void 0);
    __decorate([
        Property(1)
    ], Chart3DLegendSettings.prototype, "opacity", void 0);
    __decorate([
        Property(true)
    ], Chart3DLegendSettings.prototype, "toggleVisibility", void 0);
    __decorate([
        Property(false)
    ], Chart3DLegendSettings.prototype, "enableHighlight", void 0);
    __decorate([
        Property(null)
    ], Chart3DLegendSettings.prototype, "description", void 0);
    __decorate([
        Property(3)
    ], Chart3DLegendSettings.prototype, "tabIndex", void 0);
    __decorate([
        Property(null)
    ], Chart3DLegendSettings.prototype, "title", void 0);
    __decorate([
        Complex({ fontFamily: null, size: null, fontStyle: null, fontWeight: null, color: null }, Font)
    ], Chart3DLegendSettings.prototype, "titleStyle", void 0);
    __decorate([
        Property('Top')
    ], Chart3DLegendSettings.prototype, "titlePosition", void 0);
    __decorate([
        Property('Normal')
    ], Chart3DLegendSettings.prototype, "textWrap", void 0);
    __decorate([
        Property('Ellipsis')
    ], Chart3DLegendSettings.prototype, "textOverflow", void 0);
    __decorate([
        Property(100)
    ], Chart3DLegendSettings.prototype, "maximumTitleWidth", void 0);
    __decorate([
        Property(null)
    ], Chart3DLegendSettings.prototype, "maximumLabelWidth", void 0);
    __decorate([
        Property(true)
    ], Chart3DLegendSettings.prototype, "enablePages", void 0);
    __decorate([
        Property(false)
    ], Chart3DLegendSettings.prototype, "isInversed", void 0);
    __decorate([
        Property(false)
    ], Chart3DLegendSettings.prototype, "reverse", void 0);
    return Chart3DLegendSettings;
}(ChildProperty));
export { Chart3DLegendSettings };
/**
 * The `Legend` module is used to render legend for the chart.
 */
var Legend3D = /** @class */ (function (_super) {
    __extends(Legend3D, _super);
    function Legend3D(chart) {
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
    Legend3D.prototype.addEventListener = function () {
        if (this.chart.isDestroyed) {
            return;
        }
        this.chart.on(Browser.touchMoveEvent, this.mouseMove, this);
        this.chart.on('click', this.click, this);
        this.chart.on(Browser.touchEndEvent, this.mouseEnd, this);
    };
    /**
     * Unbinding events for legend module.
     *
     * @returns {void}
     */
    Legend3D.prototype.removeEventListener = function () {
        if (this.chart.isDestroyed) {
            return;
        }
        this.chart.off(Browser.touchMoveEvent, this.mouseMove);
        this.chart.off('click', this.click);
        this.chart.off(Browser.touchEndEvent, this.mouseEnd);
    };
    /**
     * To handle mosue move for legend module
     *
     * @param {MouseEvent} e - Specifies the mouse event.
     * @returns {void}
     */
    Legend3D.prototype.mouseMove = function (e) {
        if (this.chart.legendSettings.visible && !this.chart.isTouch) {
            this.move(e);
            if (this.chart.highlight3DModule && (this.chart.highlightMode !== 'None' || this.chart.legendSettings.enableHighlight)) {
                var legendItemsId = [this.legendID + '_text_', this.legendID + '_shape_marker_',
                    this.legendID + '_shape_', this.legendID + '_g_'];
                var targetId = e.target.id;
                var index = void 0;
                for (var _i = 0, legendItemsId_1 = legendItemsId; _i < legendItemsId_1.length; _i++) {
                    var id = legendItemsId_1[_i];
                    if (targetId.indexOf(id) > -1) {
                        index = parseInt(targetId.split(id)[1], 10);
                        this.chart.highlight3DModule.legendSelection(this.chart, index, e.target, e.type);
                        break;
                    }
                }
            }
        }
    };
    /**
     * To handle mouse end for legend module
     *
     * @param {MouseEvent} e - Specifies the mouse event.
     * @returns {void}
     */
    Legend3D.prototype.mouseEnd = function (e) {
        if (this.chart.legendSettings.visible && this.chart.isTouch) {
            this.move(e);
        }
    };
    /**
     * Retrieves and returns legend options for the visible series within a 3D chart.
     *
     * @param {Chart3DSeries[]} visibleSeriesCollection - The collection of visible series to extract legend options from.
     * @param {Chart3D} chart - The 3D chart containing the series and legend.
     * @returns {void}
     */
    Legend3D.prototype.getLegendOptions = function (visibleSeriesCollection, chart) {
        this.legendCollections = [];
        var seriesType;
        var fill;
        this.isRtlEnable = chart.enableRtl;
        this.isReverse = !this.isRtlEnable && chart.legendSettings.reverse;
        if (visibleSeriesCollection.length > 1) {
            this.legend.mode = 'Series';
        }
        for (var _i = 0, visibleSeriesCollection_1 = visibleSeriesCollection; _i < visibleSeriesCollection_1.length; _i++) {
            var series = visibleSeriesCollection_1[_i];
            if (this.legend.mode === 'Series') {
                seriesType = series.type;
                // To set legend color when use pointColorMapping
                fill = (series.pointColorMapping && series.points.length > 0) ?
                    (series.points[0].interior ? series.points[0].interior : series.interior) : series.interior;
                this.legendCollections.push(new LegendOptions(series.name, fill, series.legendShape, series.visible, seriesType, series.legendImageUrl ? series.legendImageUrl : '', 'None', false, null, null));
            }
            else if (this.legend.mode === 'Point') {
                var _loop_1 = function (points) {
                    seriesType = series.type;
                    fill = points.interior ? points.interior : series.interior;
                    if (this_1.legendCollections.filter(function (i) { return i.text === points.x.toString(); }).length === 0) {
                        this_1.legendCollections.push(new LegendOptions(points.x.toString(), fill, series.legendShape, points.visible, seriesType, '', 'None', false));
                    }
                };
                var this_1 = this;
                for (var _a = 0, _b = series.points; _a < _b.length; _a++) {
                    var points = _b[_a];
                    _loop_1(points);
                }
            }
        }
        if (this.isReverse) {
            this.legendCollections.reverse();
        }
    };
    /**
     * Calculates and retrieves the legend bounds within the available size for the provided legend settings.
     *
     * @param {Size} availableSize - The available size for positioning the legend.
     * @param {Rect} legendBounds - The initial bounds of the legend.
     * @param {Chart3DLegendSettingsModel} legend - The customization option for the legend.
     * @returns {void}
     */
    Legend3D.prototype.get3DLegendBounds = function (availableSize, legendBounds, legend) {
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
                cancel: false
            };
            this.chart.trigger(legendRender, legendEventArgs);
            legendOption.render = !legendEventArgs.cancel;
            legendOption.text = legendEventArgs.text;
            legendOption.fill = legendEventArgs.fill;
            legendOption.shape = legendEventArgs.shape;
            legendOption.markerShape = 'None';
            legendOption.textSize = measureText(legendOption.text, legend.textStyle, this.chart.themeStyle.legendLabelFont);
            shapeWidth = legendOption.text ? legend.shapeWidth : 0;
            shapePadding = legendOption.text ? legend.shapePadding : 0;
            if (legendOption.render && legendOption.text) {
                render = true;
                legendWidth = shapeWidth + shapePadding + (legend.maximumLabelWidth ? legend.maximumLabelWidth :
                    legendOption.textSize.width) + (!this.isVertical ? (i === 0) ? padding : this.itemPadding : padding);
                rowWidth = rowWidth + legendWidth;
                if (!legend.enablePages && !this.isVertical) {
                    titlePlusArrowSpace = this.isTitle && titlePosition !== 'Top' ? this.legendTitleSize.width + this.fivePixel : 0;
                    titlePlusArrowSpace += arrowWidth;
                }
                this.getLegendHeight(legendOption, legend, legendBounds, rowWidth, this.maxItemHeight, padding);
                if (legendBounds.width < (padding + rowWidth + titlePlusArrowSpace) || this.isVertical) {
                    maximumWidth = Math.max(maximumWidth, (rowWidth + padding + titlePlusArrowSpace - (this.isVertical ? 0 : legendWidth)));
                    if (rowCount === 0 && (legendWidth !== rowWidth)) {
                        rowCount = 1;
                    }
                    rowWidth = this.isVertical ? 0 : legendWidth;
                    rowCount++;
                    columnCount = 0;
                    columnHeight = verticalArrowSpace;
                }
                var len = (rowCount > 0 ? (rowCount - 1) : 0);
                this.rowHeights[len] = Math.max((this.rowHeights[len] ? this.rowHeights[len] : 0), legendOption.textSize.height);
                this.columnHeights[columnCount] = (this.columnHeights[columnCount] ?
                    this.columnHeights[columnCount] : 0) +
                    legendOption.textSize.height + (this.isVertical ? (i === 0) ? padding : this.itemPadding : padding);
                columnCount++;
            }
        }
        columnHeight = Math.max.apply(null, this.columnHeights) + padding + titleSpace;
        columnHeight = Math.max(columnHeight, (this.maxItemHeight + padding) + padding + titleSpace);
        this.isPaging = legendBounds.height < columnHeight;
        if (this.isPaging && !legend.enablePages) {
            if (this.isVertical) {
                columnHeight += columnHeight;
            }
            else {
                columnHeight = (this.maxItemHeight + padding) + padding + (titlePosition === 'Top' ? titleSpace : 0);
            }
        }
        this.totalPages = rowCount;
        if (!this.isPaging && !this.isVertical) {
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
     * Calculates and retrieves the height of the legend within the specified legend bounds and based on the provided options and settings.
     *
     * @param {LegendOptions} legendOption - The options and data for the legend.
     * @param {Chart3DLegendSettingsModel} legend - The customization options for the legend.
     * @param {Rect} legendBounds - The bounds of the legend.
     * @param {number} rowWidth - The width of a row within the legend.
     * @param {number} legendHeight - The initial height of the legend.
     * @param {number} padding - The padding applied to the legend.
     * @returns {void}
     * @private
     */
    Legend3D.prototype.getLegendHeight = function (legendOption, legend, legendBounds, rowWidth, legendHeight, padding) {
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
     * Calculates and retrieves the render point (position) for the legend item within the legend area.
     *
     * @param {LegendOptions} legendOption - The options and data for the legend item.
     * @param {ChartLocation} start - The starting point for positioning the legend item.
     * @param {number} textPadding - The padding applied to the legend text.
     * @param {LegendOptions} prevLegend - The previous legend item for reference.
     * @param {Rect} rect - The bounding rectangle of the legend area.
     * @param {number} count - The index of the legend item within the legend.
     * @param {number} firstLegend - The index of the first legend item.
     * @returns {void}
     * @private
     */
    Legend3D.prototype.getRenderPoint = function (legendOption, start, textPadding, prevLegend, rect, count, firstLegend) {
        var padding = this.legend.padding;
        var textWidth = textPadding + (this.legend.maximumLabelWidth ?
            this.legend.maximumLabelWidth : prevLegend.textSize.width);
        var previousBound = prevLegend.location.x + ((!this.isRtlEnable) ? textWidth : -textWidth);
        if (this.isWithinBounds(previousBound, (this.legend.maximumLabelWidth ?
            this.legend.maximumLabelWidth : legendOption.textSize.width) + textPadding - this.itemPadding, rect) || this.isVertical) {
            legendOption.location.x = start.x;
            if (count !== firstLegend) {
                this.chartRowCount++;
            }
            legendOption.location.y = (count === firstLegend) ? prevLegend.location.y :
                prevLegend.location.y + (this.isVertical ? prevLegend.textSize.height :
                    this.rowHeights[(this.chartRowCount - 2)]) + (this.isVertical ? this.itemPadding : padding);
        }
        else {
            legendOption.location.x = (count === firstLegend) ? prevLegend.location.x : previousBound;
            legendOption.location.y = prevLegend.location.y;
        }
        var availwidth = (!this.isRtlEnable) ? (this.legendBounds.x + this.legendBounds.width) - (legendOption.location.x +
            textPadding - this.itemPadding - this.legend.shapeWidth / 2) :
            (legendOption.location.x - textPadding + this.itemPadding + (this.legend.shapeWidth / 2)) - this.legendBounds.x;
        if (!this.isVertical && this.isPaging && !this.legend.enablePages) {
            availwidth = this.legendBounds.width - legendOption.location.x - this.fivePixel;
        }
        availwidth = this.legend.maximumLabelWidth ? Math.min(this.legend.maximumLabelWidth, availwidth) : availwidth;
        if (this.legend.textOverflow === 'Ellipsis' && this.legend.textWrap === 'Normal') {
            legendOption.text = textTrim(+availwidth.toFixed(4), legendOption.text, this.legend.textStyle, this.chart.enableRtl, this.chart.themeStyle.legendLabelFont);
        }
    };
    /**
     * Checks whether the previous bound  width is within the given rectangular bounds.
     *
     * @param {number} previousBound - The previous bound (position) of an element.
     * @param {number} textWidth - The width of the text or element to be positioned.
     * @param {Rect} rect - The rectangular bounds to check against.
     * @returns {boolean} - True if the element is within the bounds; otherwise, false.
     * @private
     */
    Legend3D.prototype.isWithinBounds = function (previousBound, textWidth, rect) {
        if (!this.isRtlEnable) {
            return (previousBound + textWidth) > (rect.x + rect.width + (this.legend.shapeWidth / 2));
        }
        else {
            return (previousBound - textWidth) < (rect.x - (this.legend.shapeWidth / 2));
        }
    };
    /**
     * Handles the click event on a legend item at the specified index.
     *
     * @param {number} index - The index of the legend item clicked.
     * @param {Event | PointerEvent} event - The click or pointer event.
     * @returns {void}
     * @private
     */
    Legend3D.prototype.LegendClick = function (index, event) {
        var chart = this.chart;
        var seriesIndex = chart.legendSettings.mode === 'Series' ? index : 0;
        var legendIndex = !this.isReverse ? index : (this.legendCollections.length - 1) - index;
        var series = chart.visibleSeries[seriesIndex];
        var legend = this.legendCollections[legendIndex];
        var changeDetection = 'isProtectedOnChange';
        if (chart.legendSettings.mode === 'Series') {
            var legendClickArgs = {
                legendText: legend.text, legendShape: legend.shape,
                series: series, cancel: false
            };
            this.chart.trigger(legendClick, legendClickArgs);
            series.legendShape = legendClickArgs.legendShape;
            if (!legendClickArgs.cancel) {
                if (series.fill !== null) {
                    chart.visibleSeries[index].interior = series.fill;
                }
                if (chart.legendSettings.toggleVisibility) {
                    series.chart[changeDetection] = true;
                    this.changeSeriesVisiblity(series, series.visible);
                    legend.visible = series.visible;
                    this.refreshLegendToggle(chart, series);
                }
                else if (chart.highlight3DModule) {
                    chart.highlight3DModule.legendSelection(chart, index, event.target, event.type);
                }
                else if (chart.selection3DModule) {
                    chart.selection3DModule.legendSelection(chart, index, event.target, event.type);
                }
                series.chart[changeDetection] = false;
            }
        }
        else if (chart.legendSettings.mode === 'Point') {
            var point = series.points[index];
            var legendClickArgs = {
                legendText: legend.text, legendShape: legend.shape,
                series: series, cancel: false
            };
            this.chart.trigger(legendClick, legendClickArgs);
            if (chart.legendSettings.toggleVisibility && !legendClickArgs.cancel) {
                point.visible = !point.visible;
                var legendOption = this.legendCollections[index];
                legendOption.visible = point.visible;
                this.refreshLegendToggle(chart, series);
            }
        }
    };
    /**
     * Refreshes the legend toggle behavior for the specified series in a 3D chart.
     *
     * @param {Chart3D} chart - The 3D chart containing the legend and series.
     * @param {Chart3DSeries} series - The series for which the legend toggle behavior is refreshed.
     * @returns {void}
     * @private
     */
    Legend3D.prototype.refreshLegendToggle = function (chart, series) {
        var selectedDataIndexes = [];
        if (chart.selection3DModule) {
            selectedDataIndexes = extend([], chart.selection3DModule.selectedDataIndexes, null, true);
        }
        if ((chart.svgObject.childNodes.length > 0)) {
            while (chart.svgObject.lastChild) {
                chart.svgObject.removeChild(chart.svgObject.lastChild);
            }
            remove(chart.svgObject);
        }
        chart.animateSeries = false;
        removeElement(getElement(chart.element.id + '_Secondary_Element').querySelectorAll('.ejSVGTooltip')[0]);
        this.redrawSeriesElements(series, chart);
        chart.removeSvg();
        chart.refreshAxis();
        series.refreshAxisLabel();
        this.refreshSeries(chart.visibleSeries);
        chart.polygons = [];
        chart.refreshBound();
        chart.trigger('loaded', { chart: chart });
        if (selectedDataIndexes.length > 0) {
            chart.selection3DModule.selectedDataIndexes = selectedDataIndexes;
            chart.selection3DModule.redrawSelection(chart, chart.selectionMode);
        }
        if (chart.highlight3DModule && chart.highlightMode !== 'None' || chart.legendSettings.enableHighlight) {
            chart.highlight3DModule.redrawSelection(chart, chart.highlightMode);
        }
        chart.redraw = false;
    };
    /**
     * Changes the visibility of the specified series in a 3D chart.
     *
     * @param {Chart3DSeries} series - The series whose visibility is being changed.
     * @param {boolean} visibility - The new visibility state for the series (true for visible, false for hidden).
     * @returns {void}
     * @private
     */
    Legend3D.prototype.changeSeriesVisiblity = function (series, visibility) {
        series.visible = !visibility;
        if (this.isSecondaryAxis(series.xAxis)) {
            series.xAxis.internalVisibility = series.xAxis.series.some(function (value) { return (value.visible); });
        }
        if (this.isSecondaryAxis(series.yAxis)) {
            series.yAxis.internalVisibility = series.yAxis.series.some(function (value) { return (value.visible); });
        }
    };
    /**
     * Checks whether the specified axis is a secondary axis within the 3D chart.
     *
     * @param {Chart3DAxis} axis - The axis to be checked.
     * @returns {boolean} - True if the axis is a secondary axis, otherwise, false.
     * @private
     */
    Legend3D.prototype.isSecondaryAxis = function (axis) {
        return (this.chart.axes.indexOf(axis) > -1);
    };
    /**
     * Redraws the elements of a 3D series on the chart.
     *
     * @param {Chart3DSeries} series - The 3D series to redraw.
     * @param {Chart3D} chart - The 3D chart instance.
     * @returns {void}
     * @private
     */
    Legend3D.prototype.redrawSeriesElements = function (series, chart) {
        if (!chart.redraw) {
            return null;
        }
        removeElement(chart.element.id + '_Series_' + (series.index === undefined ? series.category : series.index) +
            '_DataLabelCollections');
    };
    /**
     * Refreshes the position information of each series in a collection.
     *
     * @param {Chart3DSeries[]} seriesCollection - The collection of 3D series to refresh.
     * @returns {void}
     * @private
     */
    Legend3D.prototype.refreshSeries = function (seriesCollection) {
        for (var _i = 0, seriesCollection_1 = seriesCollection; _i < seriesCollection_1.length; _i++) {
            var series = seriesCollection_1[_i];
            series.position = undefined;
        }
    };
    /**
     * To show the tooltip for the trimmed text in legend.
     *
     * @param {Event | PointerEvent} event - Specifies the event.
     * @returns {void}
     * @private
     */
    Legend3D.prototype.click = function (event) {
        if (!this.chart.legendSettings.visible) {
            return;
        }
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
    };
    /**
     * Get module name
     *
     * @returns {string} - Returns the module name
     */
    Legend3D.prototype.getModuleName = function () {
        return 'Legend3D';
    };
    /**
     * To destroy the legend module.
     *
     * @returns {void}
     * @private
     */
    Legend3D.prototype.destroy = function () {
        this.removeEventListener();
    };
    return Legend3D;
}(BaseLegend));
export { Legend3D };
