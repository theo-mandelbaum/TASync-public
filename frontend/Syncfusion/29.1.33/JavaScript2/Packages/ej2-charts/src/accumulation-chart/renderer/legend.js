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
 * AccumulationChart legend
 */
import { Browser, isNullOrUndefined, Animation } from '@syncfusion/ej2-base';
import { pointByIndex } from '../model/acc-base';
import { BaseLegend, LegendOptions } from '../../common/legend/legend';
import { Rect, measureText } from '@syncfusion/ej2-svg-base';
import { textTrim, getElement, blazorTemplatesReset } from '../../common/utils/helper';
import { textWrap } from '../../common/utils/helper';
import { legendClick } from '../../common/model/constants';
/**
 * The `AccumulationLegend` module is used to render the `Legend` for the Accumulation chart.
 */
var AccumulationLegend = /** @class */ (function (_super) {
    __extends(AccumulationLegend, _super);
    /**
     * Constructor for Accumulation Legend.
     *
     * @param {AccumulationChart} chart Get a chart as a parameter.
     */
    function AccumulationLegend(chart) {
        var _this = _super.call(this, chart) || this;
        _this.library = _this;
        _this.titleRect = new Rect(0, chart.margin.top, 0, 0);
        _this.addEventListener();
        return _this;
    }
    /**
     * Binding events for legend module.
     *
     * @returns {void}
     */
    AccumulationLegend.prototype.addEventListener = function () {
        if (this.chart.isDestroyed) {
            return;
        }
        this.chart.on(Browser.touchMoveEvent, this.mouseMove, this);
        this.chart.on(Browser.touchEndEvent, this.mouseEnd, this);
        this.chart.on('click', this.click, this);
    };
    /**
     * UnBinding events for legend module.
     *
     * @returns {void}
     */
    AccumulationLegend.prototype.removeEventListener = function () {
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
     * @param {MouseEvent} e - The mouse move event for legend module.
     * @returns {void}
     */
    AccumulationLegend.prototype.mouseMove = function (e) {
        if (this.chart.legendSettings.visible && !this.chart.isTouch) {
            if (this.chart.accumulationHighlightModule && this.chart.highlightMode !== 'None') {
                if (!this.chart.legendSettings.toggleVisibility) {
                    this.click(e);
                }
                var legendItemsId = [this.legendID + '_text_', this.legendID + '_shape_marker_',
                    this.legendID + '_shape_', this.legendID + '_g_'];
                var targetId = e.target.id;
                var index = void 0;
                for (var _i = 0, legendItemsId_1 = legendItemsId; _i < legendItemsId_1.length; _i++) {
                    var id = legendItemsId_1[_i];
                    if (targetId.indexOf(id) > -1) {
                        index = parseInt(targetId.split(id)[1], 10);
                        this.chart.accumulationHighlightModule.legendSelection(this.chart, 0, index, e.target, e.type);
                        break;
                    }
                }
            }
        }
    };
    /**
     * To handle mosue end for legend module.
     *
     * @param {MouseEvent} e - The mouse end event for legend module.
     * @returns {void}
     */
    AccumulationLegend.prototype.mouseEnd = function (e) {
        if (this.chart.legendSettings.visible && this.chart.isTouch) {
            this.move(e);
        }
    };
    /**
     * Get the legend options.
     *
     * @param {AccumulationChart} chart - The accumulation chart control.
     * @param {AccumulationSeries[]} series - The array of series in the accumulation chart.
     * @returns {void}
     * @private
     */
    AccumulationLegend.prototype.getLegendOptions = function (chart, series) {
        this.legendCollections = [];
        this.isRtlEnable = chart.enableRtl;
        this.isReverse = !this.isRtlEnable && chart.legendSettings.reverse;
        for (var i = 0; i < 1; i++) {
            var seriesType = series[i].type;
            if (seriesType === 'Pie' || seriesType === 'Doughnut') {
                seriesType = (series[i].innerRadius !== '0' && series[i].innerRadius !== '0%') ?
                    'Doughnut' : 'Pie';
            }
            for (var _i = 0, _a = series[i].points; _i < _a.length; _i++) {
                var point = _a[_i];
                if (!isNullOrUndefined(point.x) && !isNullOrUndefined(point.y)) {
                    this.legendCollections.push(new LegendOptions((chart.useGroupingSeparator && typeof point.x === 'number') ? chart.intl.formatNumber(point.x, { useGrouping: true })
                        : point.x.toString(), point.color, series[i].legendShape, point.visible, seriesType, point.legendImageUrl, null, null, point.index, series[i].index, null, point.x.toString()));
                }
            }
            if (this.isReverse) {
                this.legendCollections.reverse();
            }
        }
    };
    /**
     * To find legend bounds for accumulation chart.
     *
     * @param {Size} availableSize - The available size for the legend.
     * @param {Rect} legendBounds - The boundary of the legend.
     * @param {LegendSettingsModel} legend - The legend settings.
     * @returns {void}
     * @private
     */
    AccumulationLegend.prototype.getLegendBounds = function (availableSize, legendBounds, legend) {
        this.calculateLegendTitle(legend, legendBounds);
        this.isTitle = legend.title ? true : false;
        var extraWidth = 0;
        var extraHeight = 0;
        var legendOption;
        this.chartRowCount = 1;
        this.rowHeights = [];
        this.columnHeights = [];
        this.pageHeights = [];
        var padding = legend.padding;
        var titlePosition = legend.titlePosition;
        var titlePlusArrowSpace = 0;
        var arrowWidth = this.arrowWidth;
        var arrowHeight = legend.enablePages ? 0 : this.arrowHeight;
        if (!this.isVertical) {
            extraHeight = !legend.height ? ((availableSize.height / 100) * 5) : 0;
        }
        else {
            extraWidth = !legend.width ? ((availableSize.width / 100) * 5) : 0;
        }
        legendBounds.width += extraWidth;
        legendBounds.height += extraHeight;
        var shapePadding = legend.shapePadding;
        var maximumWidth = legend.maximumLabelWidth ? legend.maximumLabelWidth : 0;
        var shapeWidth = legend.shapeWidth;
        var rowWidth = 0;
        var columnCount = 0;
        var rowCount = 0;
        var columnWidth = [];
        var pageWidth = [];
        var pageRowWidth = 0;
        var previousRowCount = 0;
        var columnHeight = 0;
        var legendWidth = 0;
        var titleHeight = 0;
        this.maxItemHeight = Math.max(measureText('MeasureText', legend.textStyle, this.chart.themeStyle.legendLabelFont).height, legend.shapeHeight);
        var legendEventArgs;
        var render = false;
        var maxColumn = legend.layout === 'Auto' && legend.maximumColumns > 0;
        if (legend.fixedWidth) {
            for (var i = 0; i < this.legendCollections.length; i++) {
                var textWidth = shapeWidth + shapePadding + (!this.isVertical ? (i === 0) ? padding : this.itemPadding :
                    padding) + (legend.maximumLabelWidth ? legend.maximumLabelWidth :
                    measureText(this.legendCollections[i].text, legend.textStyle, this.chart.themeStyle.legendLabelFont).width);
                this.maxColumnWidth = this.maxColumnWidth > textWidth ? this.maxColumnWidth : textWidth;
            }
        }
        for (var i = 0; i < this.legendCollections.length; i++) {
            legendOption = this.legendCollections[i];
            legendEventArgs = { fill: legendOption.fill, text: legendOption.text, shape: legendOption.shape,
                name: 'legendRender', cancel: false };
            this.chart.trigger('legendRender', legendEventArgs);
            legendOption.render = !legendEventArgs.cancel;
            legendOption.text = legendOption.originalText = ((legendEventArgs.text.indexOf('&') > -1) ?
                this.convertHtmlEntities(legendEventArgs.text) : legendEventArgs.text);
            legendOption.fill = legendEventArgs.fill;
            legendOption.shape = legendEventArgs.shape;
            legendOption.textSize = measureText(legendOption.text, legend.textStyle, this.chart.themeStyle.legendLabelFont);
            if (legendOption.render && legendOption.text !== '') {
                render = true;
                legendWidth = legend.fixedWidth ? this.maxColumnWidth : shapeWidth + shapePadding +
                    (legend.maximumLabelWidth ? legend.maximumLabelWidth : legendOption.textSize.width)
                    + (!this.isVertical || legend.layout === 'Horizontal' ? (i === 0 || (columnCount === 1 && rowCount > 0 && legend.layout === 'Horizontal')) ? padding : this.itemPadding : padding);
                this.getLegendHeight(legendOption, legend, legendBounds, rowWidth, this.maxItemHeight, padding);
                if (this.isVertical && legend.layout === 'Auto' && !maxColumn) {
                    columnHeight += Math.max(legendOption.textSize.height, legend.shapeHeight) + ((i === 0) ? padding : this.itemPadding);
                    if (columnHeight + this.itemPadding + (arrowHeight / this.pageButtonSize) > (legendBounds.height)) {
                        //columnHeight = Math.max(columnHeight, (rowCount * (this.maxItemHeight + padding)) + padding + arrowHeight);
                        rowWidth = rowWidth + maximumWidth;
                        pageRowWidth = this.getPageWidth(pageWidth);
                        this.totalPages = Math.max(rowCount, this.totalPages || 1);
                        if ((rowWidth - pageRowWidth + legendWidth) > legendBounds.width) {
                            pageWidth.push(rowWidth - pageRowWidth);
                            rowCount = this.rowHeights.length;
                            previousRowCount = rowCount;
                        }
                        else {
                            rowCount = previousRowCount;
                        }
                        columnWidth.push(maximumWidth);
                        maximumWidth = 0;
                        columnHeight = Math.max(legendOption.textSize.height, legend.shapeHeight) + padding;
                        columnCount++;
                    }
                    this.columnHeights[columnCount] = (this.columnHeights[columnCount] ?
                        this.columnHeights[columnCount] : 0) + Math.max(legendOption.textSize.height, legend.shapeHeight)
                        + ((i === 0) ? padding : this.itemPadding);
                    maximumWidth = Math.max(legendWidth, maximumWidth);
                    this.rowHeights[rowCount] = Math.max((this.rowHeights[rowCount] ?
                        this.rowHeights[rowCount] : 0), Math.max(legendOption.textSize.height, legend.shapeHeight));
                    rowCount++;
                }
                else {
                    if (!legend.enablePages) { // For new legend navigation support
                        titlePlusArrowSpace = this.isTitle && titlePosition !== 'Top' ? this.legendTitleSize.width + this.fivePixel : 0;
                        titlePlusArrowSpace += arrowWidth;
                    }
                    rowWidth = rowWidth + legendWidth;
                    if (maxColumn ? legend.maximumColumns === columnCount : legendBounds.width < (padding + rowWidth + titlePlusArrowSpace) || (this.legend.layout === 'Vertical' && columnCount === 1)) {
                        maximumWidth = Math.max(maximumWidth, (rowWidth + padding + titlePlusArrowSpace - legendWidth));
                        if (rowCount === 0 && (legendWidth !== rowWidth)) {
                            rowCount = 1;
                        }
                        rowWidth = legendWidth;
                        rowCount++;
                        columnCount = 0;
                        //  columnHeight = (rowCount * (this.maxItemHeight + padding)) + padding + this.legendTitleSize.height;
                    }
                    var len = rowCount ? (rowCount - 1) : rowCount;
                    this.rowHeights[len] = Math.max((this.rowHeights[len] ? this.rowHeights[len] : 0), Math.max(legendOption.textSize.height, legend.shapeHeight));
                    this.columnHeights[columnCount] = (this.columnHeights[columnCount] ?
                        this.columnHeights[columnCount] : 0) +
                        Math.max(legendOption.textSize.height, legend.shapeHeight) + padding;
                    if (maxColumn && this.columnHeights[columnCount] > legendBounds.height) {
                        this.columnHeights[columnCount] -= Math.max(legendOption.textSize.height, legend.shapeHeight) + padding;
                    }
                    columnCount++;
                }
            }
        }
        titleHeight = titlePosition === 'Top' ? this.legendTitleSize.height : 0;
        if (this.isVertical && legend.layout === 'Auto' && !maxColumn) {
            rowWidth = rowWidth + maximumWidth;
            this.isPaging = legendBounds.width < (rowWidth + padding);
            columnHeight = Math.max.apply(null, this.columnHeights) + padding + arrowHeight + titleHeight;
            columnHeight = Math.max(columnHeight, ((this.totalPages || 1) * (this.maxItemHeight + padding)) + padding + arrowHeight);
            this.isPaging = this.isPaging && (this.totalPages > 1);
            columnWidth.push(maximumWidth);
        }
        else {
            this.totalPages = this.totalRowCount = rowCount;
            columnHeight = Math.max.apply(null, this.columnHeights) + padding + arrowHeight + titleHeight;
            this.isPaging = (legendBounds.height < columnHeight || (legend.layout === 'Horizontal' && this.rowHeights.length > 1)) && !maxColumn;
            columnHeight = !legend.enablePages && this.isPaging && legend.layout !== 'Vertical' ? (this.maxItemHeight + padding) + padding + titleHeight : columnHeight;
            columnHeight = Math.max(columnHeight, (this.maxItemHeight + padding) + padding + titleHeight);
            if (legend.layout === 'Horizontal') {
                columnHeight = (this.maxItemHeight) + (padding * 2) + titleHeight + this.pageButtonSize + legend.border.width;
            }
            if (!this.isPaging) { // For title left and right position
                rowWidth += this.isTitle && titlePosition !== 'Top' ? (this.fivePixel + this.legendTitleSize.width + this.fivePixel) : 0;
            }
        }
        this.maxColumns = 0; // initialization for max columns
        var width;
        if (maxColumn && this.maxColumnWidth && legend.fixedWidth) {
            width = (this.maxColumnWidth * legend.maximumColumns) + padding;
            this.isPaging = false;
        }
        else {
            width = (this.isVertical && legend.layout === 'Auto' && !maxColumn) ? this.getMaxColumn(columnWidth, legendBounds.width, padding, rowWidth + padding) :
                Math.max(rowWidth + padding, maximumWidth);
        }
        if (render) { // if any legends not skipped in event check
            this.setBounds(width, columnHeight, legend, legendBounds);
        }
        else {
            this.setBounds(0, 0, legend, legendBounds);
        }
    };
    AccumulationLegend.prototype.getPageWidth = function (pageWidth) {
        var sum = 0;
        for (var i = 0; i < pageWidth.length; i++) {
            sum += pageWidth[i];
        }
        return sum;
    };
    /** @private */
    AccumulationLegend.prototype.getLegendHeight = function (option, legend, bounds, rowWidth, legendHeight, padding) {
        var legendWidth = option.textSize.width;
        var textPadding = legend.shapePadding + (padding * 2) + legend.shapeWidth;
        switch (legend.textWrap) {
            case 'Wrap':
            case 'AnyWhere':
                if (legendWidth > legend.maximumLabelWidth || legendWidth + rowWidth > bounds.width) {
                    option.textCollection = textWrap(option.text, (legend.maximumLabelWidth ? Math.min(legend.maximumLabelWidth, (bounds.width - textPadding)) :
                        (bounds.width - textPadding)), legend.textStyle, this.chart.enableRtl, legend.textWrap === 'AnyWhere', null, this.chart.themeStyle.legendLabelFont);
                }
                else {
                    option.textCollection.push(option.text);
                }
                option.textSize.height = (legendHeight * option.textCollection.length);
                break;
        }
    };
    /**
     * To find html entities value for legend.
     *
     * @param {string} legendText - The text of the legend item.
     * @returns {string} - Converts the entities to normal string.
     * @private
     */
    AccumulationLegend.prototype.convertHtmlEntities = function (legendText) {
        var text = (legendText).replace('&amp;', '&').replace('&lt;', '<').replace('&gt;', '>').replace('&quot;', '"').replace('&nbsp;', ' ').replace('&cent;', '¢').replace('&pound;', '£').replace('&yen;', '¥').replace('&euro;', '€').replace('&copy;', '©').replace('&reg;', '®');
        text = (text).replace('&#38;', '&').replace('&#60;', '<').replace('&#62;', '>').replace('&#34;', '"').replace('&#160;', ' ').
            replace('&#162;', '¢').replace('&#163;', '£').replace('&#165;', '¥').replace('&#8364;', '€').replace('&#169;', '©').replace('&#174;', '®');
        return text;
    };
    /**
     * To find maximum column size for legend.
     *
     * @param {number[]} columns - Array containing the number of legend items in each column.
     * @param {number} width - The total width available.
     * @param {number} padding - The padding between legend items.
     * @param {number} rowWidth - The width of each row of legend items.
     * @returns {number} - Get a maximum columns.
     */
    AccumulationLegend.prototype.getMaxColumn = function (columns, width, padding, rowWidth) {
        var maxPageColumn = padding;
        this.maxColumnWidth = Math.max.apply(null, columns);
        for (var _i = 0, columns_1 = columns; _i < columns_1.length; _i++) {
            var column = columns_1[_i];
            maxPageColumn += this.maxColumnWidth;
            this.maxColumns++;
            if (maxPageColumn + padding > width) {
                maxPageColumn -= this.maxColumnWidth;
                this.maxColumns--;
                break;
            }
        }
        this.isPaging = (maxPageColumn < rowWidth) && (this.totalPages > 1);
        if (maxPageColumn === padding) {
            maxPageColumn = width;
        }
        this.maxColumns = Math.max(1, this.maxColumns);
        this.maxWidth = maxPageColumn;
        var columnWidth = this.maxColumnWidth + padding;
        var prevPage = 0;
        var columnCount = this.columnHeights.length;
        if (this.isPaging && this.isVertical) {
            for (var i = 1; i < columnCount; i++) {
                columnWidth += (this.maxColumnWidth + padding);
                if (columnWidth > width) {
                    this.pageHeights.push(((prevPage !== i - 1) ? Math.max.apply(null, this.columnHeights.slice(prevPage, i - 1)) :
                        this.columnHeights[prevPage]));
                    columnWidth = this.maxColumnWidth + padding;
                    prevPage = i;
                }
            }
            this.pageHeights.push(((prevPage !== columnCount - 1) ?
                Math.max.apply(null, this.columnHeights.slice(prevPage, columnCount - 1)) : this.columnHeights[prevPage]));
            this.totalPages = this.pageHeights.length;
        }
        return maxPageColumn;
    };
    /**
     * To find available width from legend x position.
     *
     * @param {number} tx - The x-coordinate of the legend.
     * @param {number} width - The total width available.
     * @returns {number} - Get a available width.
     */
    AccumulationLegend.prototype.getAvailWidth = function (tx, width) {
        if (this.isVertical && this.legend.layout === 'Auto' && !(this.legend.maximumColumns > 0)) {
            width = this.maxWidth;
        }
        else if (!this.isVertical && this.legend.layout !== 'Vertical' && !(this.legend.maximumColumns > 0) && this.isPaging && !this.legend.enablePages) {
            return width - tx - this.fivePixel;
        }
        return width - ((this.legend.padding * 2) + this.legend.shapeWidth + this.legend.shapePadding);
    };
    /**
     * To find legend rendering locations from legend items.
     *
     * @param {LegendOptions} legendOption - The legend options.
     * @param {ChartLocation} start - The starting location for legend rendering.
     * @param {number} textPadding - The padding between legend text items.
     * @param {LegendOptions} prevLegend - The previous legend options.
     * @param {Rect} rect - The bounding of the legend.
     * @param {number} count - The count of legend items.
     * @param {number} firstLegend - The index of the first legend item.
     * @returns {void}
     * @private
     */
    AccumulationLegend.prototype.getRenderPoint = function (legendOption, start, textPadding, prevLegend, rect, count, firstLegend) {
        var padding = this.legend.padding;
        var previousLocation = prevLegend.location.y + this.maxItemHeight / 4 + (prevLegend.textCollection.length > 0 ?
            ((prevLegend.textCollection.length - 1) * this.maxItemHeight) : 0);
        if (this.isVertical && this.legend.layout === 'Auto' && !(this.legend.maximumColumns > 0)) {
            if (count === firstLegend || (previousLocation + Math.max(legendOption.textSize.height, this.legend.shapeHeight)
                + padding > (rect.y + rect.height))) {
                legendOption.location.x = prevLegend.location.x + ((count === firstLegend) ? 0 : (!this.isRtlEnable) ?
                    this.maxColumnWidth : -this.maxColumnWidth);
                legendOption.location.y = start.y;
                var textStartLoc = (this.legend.shapeWidth / 2) + padding;
                this.pageXCollections.push(legendOption.location.x + ((!this.isRtlEnable) ? -textStartLoc : textStartLoc));
            }
            else {
                legendOption.location.x = prevLegend.location.x;
                legendOption.location.y = prevLegend.location.y + Math.max(prevLegend.textSize.height, this.legend.shapeHeight)
                    + this.itemPadding;
            }
        }
        else {
            var textWidth = this.legend.fixedWidth ? this.maxColumnWidth : textPadding + (this.legend.maximumLabelWidth ?
                this.legend.maximumLabelWidth : prevLegend.textSize.width);
            var previousBound = prevLegend.location.x + ((!this.isRtlEnable) ? textWidth : -textWidth);
            if (this.legend.layout === 'Auto' && this.legend.maximumColumns > 0 ? count % this.legend.maximumColumns === 0 :
                this.isWithinBounds(previousBound, (this.legend.maximumLabelWidth ? this.legend.maximumLabelWidth :
                    legendOption.textSize.width) + textPadding - this.itemPadding, rect, this.legend.shapeWidth / 2) || this.legend.layout === 'Vertical') {
                if (count !== firstLegend) {
                    this.chartRowCount++;
                }
                legendOption.location.y = (count === firstLegend) ? prevLegend.location.y :
                    prevLegend.location.y + this.rowHeights[(this.chartRowCount - 2)] + padding;
                legendOption.location.x = start.x;
            }
            else {
                legendOption.location.y = prevLegend.location.y;
                legendOption.location.x = (count === firstLegend) ? prevLegend.location.x : previousBound;
            }
        }
        var availablewidth = this.getAvailWidth(legendOption.location.x, this.legendBounds.width);
        availablewidth = this.legend.maximumLabelWidth ? Math.min(this.legend.maximumLabelWidth, availablewidth) : availablewidth;
        if (this.legend.textOverflow === 'Ellipsis' && this.legend.textWrap === 'Normal') {
            legendOption.text = textTrim(+availablewidth.toFixed(4), legendOption.text, this.legend.textStyle, this.chart.enableRtl, this.chart.themeStyle.legendLabelFont);
        }
    };
    /**
     * Check whether legend group within legend bounds or not.
     *
     * @param {number} previousBound - The previous bound value.
     * @param {number} textWidth - The width of the legend text.
     * @param {Rect} legendBounds - The bounding of the legend.
     * @param {number} shapeWidth - The width of the legend shape.
     * @returns {boolean} - A boolean indicating whether the legend group is within the legend bounds.
     */
    AccumulationLegend.prototype.isWithinBounds = function (previousBound, textWidth, legendBounds, shapeWidth) {
        if (!this.isRtlEnable) {
            return (previousBound + textWidth) > (legendBounds.x + legendBounds.width + shapeWidth);
        }
        else {
            return (previousBound - textWidth) < (legendBounds.x - shapeWidth);
        }
    };
    /**
     * Finding the smart legend place according to positions.
     *
     * @param {Rect} labelBound - The bounding of the label.
     * @param {Rect} legendBound - The bounding of the legend.
     * @param {MarginModel} margin - The margin of the legend.
     * @returns {void}
     * @private
     */
    AccumulationLegend.prototype.getSmartLegendLocation = function (labelBound, legendBound, margin) {
        var space;
        switch (this.position) {
            case 'Left':
                space = ((labelBound.x - legendBound.width) - margin.left) / 2;
                legendBound.x = (labelBound.x - legendBound.width) < margin.left ? legendBound.x :
                    (labelBound.x - legendBound.width) - space;
                break;
            case 'Right':
                space = ((this.chart.availableSize.width - margin.right) - (labelBound.x + labelBound.width + legendBound.width)) / 2;
                legendBound.x = (labelBound.x + labelBound.width + legendBound.width) > (this.chart.availableSize.width - margin.right) ?
                    legendBound.x : (labelBound.x + labelBound.width + space);
                break;
            case 'Top':
                this.getTitleRect(this.chart);
                space = ((labelBound.y - legendBound.height) - (this.titleRect.y + this.titleRect.height)) / 2;
                legendBound.y = (labelBound.y - legendBound.height) < margin.top ? legendBound.y :
                    (labelBound.y - legendBound.height) - space;
                break;
            case 'Bottom':
                space = ((this.chart.availableSize.height - margin.bottom) - (labelBound.y + labelBound.height + legendBound.height)) / 2;
                legendBound.y = labelBound.y + labelBound.height + legendBound.height > (this.chart.availableSize.height - margin.bottom) ?
                    legendBound.y : (labelBound.y + labelBound.height) + space;
                break;
        }
    };
    /**
     * To get title rect.
     *
     * @param {AccumulationChart} accumulation - The accumulation chart control.
     * @returns {void}
     */
    AccumulationLegend.prototype.getTitleRect = function (accumulation) {
        if (!accumulation.title) {
            return null;
        }
        var titleSize = measureText(accumulation.title, accumulation.titleStyle, this.chart.themeStyle.legendTitleFont);
        this.titleRect = new Rect(accumulation.availableSize.width / 2 - titleSize.width / 2, accumulation.margin.top, titleSize.width, titleSize.height);
    };
    /**
     * To get legend by index.
     *
     * @param {number} index - The index of the legend.
     * @param {LegendOptions[]} legendCollections - The array of legend options.
     * @returns {LegendOptions} - Return legend index.
     */
    AccumulationLegend.prototype.legendByIndex = function (index, legendCollections) {
        for (var _i = 0, legendCollections_1 = legendCollections; _i < legendCollections_1.length; _i++) {
            var legend = legendCollections_1[_i];
            if (legend.pointIndex === index) {
                return legend;
            }
        }
        return null;
    };
    /**
     * To show or hide the legend on clicking the legend.
     *
     * @param {Event} event - The click event.
     * @returns {void}
     * @private
     */
    AccumulationLegend.prototype.click = function (event) {
        var targetId = event.target.id.indexOf('_chart_legend_g_') > -1 ?
            event.target.firstChild['id'] : event.target.id;
        var chart = this.chart;
        var legendItemsId = [this.legendID + '_text_', this.legendID + '_shape_', this.legendID + '_shape_marker_'];
        // if ((<AccumulationChart>this.chart).accumulationSelectionModule) {
        //     // const selectedDataIndexes: Indexes[] = <Indexes[]>extend([], (<AccumulationChart>this.chart)
        //     //     .accumulationSelectionModule.selectedDataIndexes, null, true);
        // }
        this.chart.animateSeries = false;
        for (var _i = 0, legendItemsId_2 = legendItemsId; _i < legendItemsId_2.length; _i++) {
            var id = legendItemsId_2[_i];
            if (targetId.indexOf(id) > -1) {
                var pointIndex = parseInt(targetId.split(id)[1], 10);
                if (this.chart.legendSettings.toggleVisibility && !isNaN(pointIndex)) {
                    var currentSeries = this.chart.visibleSeries[0];
                    var point = pointByIndex(pointIndex, currentSeries.points);
                    var legendOption = this.legendByIndex(pointIndex, this.legendCollections);
                    var legendClickArgs = {
                        legendText: legendOption.text, legendShape: legendOption.shape,
                        chart: chart.isBlazor ? {} : chart, series: currentSeries, point: point,
                        name: legendClick, cancel: false
                    };
                    this.chart.trigger(legendClick, legendClickArgs);
                    if (!legendClickArgs.cancel) {
                        point.visible = !point.visible;
                        legendOption.visible = point.visible;
                        currentSeries.sumOfPoints += point.visible ? point.y : -point.y;
                        chart.redraw = chart.enableAnimation;
                        this.sliceVisibility(pointIndex, point.visible);
                        chart.removeSvg();
                        //To remove the blazor templates
                        blazorTemplatesReset(chart);
                        this.chart.refreshPoints(currentSeries.points);
                        this.chart.calculateBounds();
                        var borderElement = document.getElementById(this.chart.element.id + 'PointHover_Border');
                        if (borderElement) {
                            this.chart.pieSeriesModule.removeBorder(borderElement, 0);
                        }
                        if (this.chart.accumulationTooltipModule) {
                            this.chart.accumulationTooltipModule.removeTooltip(0);
                        }
                        this.chart.renderElements();
                    }
                }
                else if (this.chart.accumulationSelectionModule && !isNaN(pointIndex)) {
                    this.chart.accumulationSelectionModule.legendSelection(this.chart, 0, pointIndex, event.target, event.type);
                }
                else if (this.chart.accumulationHighlightModule && !isNaN(pointIndex)) {
                    this.chart.accumulationHighlightModule.legendSelection(this.chart, 0, pointIndex, event.target, event.type);
                }
            }
        }
        if (targetId.indexOf(this.legendID + '_pageup') > -1) {
            this.changePage(event, true);
        }
        else if (targetId.indexOf(this.legendID + '_pagedown') > -1) {
            this.changePage(event, false);
        }
        chart.redraw = false;
    };
    /**
     * To translate the point elements by index and position.
     *
     * @param {number} index - The index of the point element.
     * @param {boolean} isVisible - A boolean value indicating whether the point is visible.
     * @returns {void}
     */
    AccumulationLegend.prototype.sliceVisibility = function (index, isVisible) {
        var sliceId = this.chart.element.id + '_Series_0_Point_';
        if (this.chart.visibleSeries[0].dataLabel.visible) {
            sliceId = this.chart.element.id + '_datalabel_Series_0_';
            this.sliceAnimate(getElement(sliceId + 'g_' + index), isVisible);
        }
    };
    /**
     * Slice animation.
     *
     * @param {Element} element - slice element.
     * @param {boolean} isVisible - boolean value of slice.
     * @returns {void}
     */
    AccumulationLegend.prototype.sliceAnimate = function (element, isVisible) {
        if (!element) {
            return null;
        }
        new Animation({}).animate(element, {
            duration: 300,
            delay: 0,
            name: isVisible ? 'FadeIn' : 'FadeOut',
            end: function (args) {
                args.element.style.visibility = isVisible ? 'visible' : 'hidden';
            }
        });
    };
    /**
     * Get module name.
     *
     * @returns {string} - Return module name.
     * @private
     */
    AccumulationLegend.prototype.getModuleName = function () {
        return 'AccumulationLegend';
    };
    /**
     * To destroy the Legend.
     *
     * @returns {void}
     * @private
     */
    AccumulationLegend.prototype.destroy = function () {
        /**
         * Destroy method calling here.
         */
        this.removeEventListener();
    };
    return AccumulationLegend;
}(BaseLegend));
export { AccumulationLegend };
