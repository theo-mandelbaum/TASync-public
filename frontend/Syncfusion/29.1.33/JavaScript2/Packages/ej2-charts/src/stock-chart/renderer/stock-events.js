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
import { withIn, PointData, textElement, getElement, valueToCoefficient, drawSymbol, ChartLocation } from '../../common/utils/helper';
import { BaseTooltip } from '../../common/user-interaction/tooltip';
import { Tooltip, PathOption, TextOption, measureText, Size } from '@syncfusion/ej2-svg-base';
import { createElement, remove } from '@syncfusion/ej2-base';
import { DataUtil } from '@syncfusion/ej2-data';
import { stockEventRender } from '../../common/model/constants';
/**
 * @private
 */
var StockEvents = /** @class */ (function (_super) {
    __extends(StockEvents, _super);
    function StockEvents(stockChart) {
        var _this = _super.call(this, stockChart.chart) || this;
        /** @private */
        _this.symbolLocations = [];
        _this.stockChart = stockChart;
        _this.chartId = _this.stockChart.element.id;
        return _this;
    }
    /**
     * To render stock events in chart
     *
     * @returns {Element} Stock event element
     * @private
     */
    StockEvents.prototype.renderStockEvents = function () {
        var sChart = this.stockChart;
        var stockEvent;
        var stockEventElement;
        var textSize;
        // Creation of group elements for stock events
        var stockEventsElementGroup = sChart.renderer.createGroup({ id: this.chartId + '_StockEvents' });
        this.symbolLocations = initialArray(sChart.series.length, sChart.stockEvents.length, new ChartLocation(0, 0));
        for (var i = 0; i < sChart.stockEvents.length; i++) {
            stockEvent = this.stockChart.stockEvents[i];
            for (var _i = 0, _a = sChart.chart.series; _i < _a.length; _i++) {
                var series = _a[_i];
                var argsData = {
                    name: stockEventRender, stockChart: sChart, text: stockEvent.text,
                    type: stockEvent.type, cancel: false, series: series
                };
                sChart.trigger(stockEventRender, argsData);
                stockEvent.text = argsData.text;
                stockEvent.type = argsData.type;
                textSize = measureText(stockEvent.text + 'W', stockEvent.textStyle, this.stockChart.themeStyle.axisLabelFont);
                if (!argsData.cancel) {
                    stockEventElement = sChart.renderer.createGroup({ id: this.chartId + '_Series_' + series.index + '_StockEvents_' + i });
                    var stockEventDate = this.dateParse(stockEvent.date).getTime();
                    stockEventDate = this.stockChart.isDateTimeCategory ? series.xAxis.labels.indexOf(stockEventDate.toString()) :
                        stockEventDate;
                    if (withIn(stockEventDate, series.xAxis.visibleRange) && (stockEventDate >= series.xMin &&
                        stockEventDate <= series.xMax)) {
                        if (stockEvent.seriesIndexes.length > 0) {
                            for (var j = 0; j < stockEvent.seriesIndexes.length; j++) {
                                if (stockEvent.seriesIndexes[j] === series.index) {
                                    stockEventsElementGroup.appendChild(this.creatEventGroup(stockEventElement, series, stockEvent, i, textSize));
                                }
                            }
                        }
                        else {
                            stockEventsElementGroup.appendChild(this.creatEventGroup(stockEventElement, series, stockEvent, i, textSize));
                        }
                    }
                }
            }
        }
        return stockEventsElementGroup;
    };
    StockEvents.prototype.creatEventGroup = function (stockEventElement, series, stockEvent, i, textSize) {
        var symbolLocation = this.findClosePoint(series, stockEvent);
        if (!stockEvent.showOnSeries) {
            symbolLocation.y = series.yAxis.rect.y + series.yAxis.rect.height;
        }
        this.symbolLocations[series.index][i] = symbolLocation;
        this.createStockElements(stockEventElement, stockEvent, series, i, symbolLocation, textSize);
        return stockEventElement;
    };
    StockEvents.prototype.findClosePoint = function (series, sEvent) {
        var stockEventDate = this.dateParse(sEvent.date).getTime();
        stockEventDate = this.stockChart.isDateTimeCategory ? series.xAxis.labels.indexOf(stockEventDate.toString()) : stockEventDate;
        var closeIndex = this.getClosest(series, stockEventDate);
        var pointData;
        var point;
        var yPixel;
        for (var k = 0; k < series.points.length; k++) {
            point = series.points[k];
            if (closeIndex === point.xValue && point.visible) {
                pointData = new PointData(point, series);
            }
            else if (k !== 0 && k !== series.points.length - 1) {
                if (closeIndex > series.points[k - 1].xValue && closeIndex < series.points[k + 1].xValue) {
                    pointData = new PointData(point, series);
                }
            }
        }
        var xPixel = series.xAxis.rect.x + valueToCoefficient(pointData.point.xValue, series.xAxis) * series.xAxis.rect.width;
        yPixel = valueToCoefficient(pointData.point[sEvent.placeAt], series.yAxis) * series.yAxis.rect.height;
        yPixel = (yPixel * -1) + (series.yAxis.rect.y + series.yAxis.rect.height);
        return new ChartLocation(xPixel, yPixel);
    };
    StockEvents.prototype.createStockElements = function (stockEventElement, stockEve, series, i, symbolLocation, textSize) {
        var result = new Size(textSize.width > 20 ? textSize.width : 20, textSize.height > 20 ? textSize.height : 20);
        var pathString;
        var pathOption;
        var lx = symbolLocation.x;
        var ly = symbolLocation.y;
        var stockId = this.chartId + '_Series_' + series.index + '_StockEvents_' + i;
        var border = stockEve.border;
        switch (stockEve.type) {
            case 'Flag':
            case 'Circle':
            case 'Square':
                stockEventElement.appendChild(drawSymbol(new ChartLocation(lx, ly), 'Circle', new Size(2, 2), '', new PathOption(stockId + '_Circle', 'transparent', border.width, border.color), this.dateParse(stockEve.date).toISOString()));
                stockEventElement.appendChild(drawSymbol(new ChartLocation(lx, ly - 5), 'VerticalLine', new Size(9, 9), '', new PathOption(stockId + '_Path', border.color, border.width, border.color), this.dateParse(stockEve.date).toISOString()));
                stockEventElement.appendChild(drawSymbol(new ChartLocation(stockEve.type !== 'Flag' ? lx : lx + result.width / 2, ly - result.height), stockEve.type, result, '', new PathOption(stockId + '_Shape', stockEve.background, border.width, border.color), this.dateParse(stockEve.date).toISOString()));
                textElement(this.stockChart.renderer, new TextOption(stockId + '_Text', stockEve.type !== 'Flag' ? symbolLocation.x : symbolLocation.x + result.width / 2, (symbolLocation.y - result.height), 'middle', stockEve.text, '', 'middle'), stockEve.textStyle, stockEve.textStyle.color, stockEventElement);
                break;
            case 'ArrowUp':
            case 'ArrowDown':
            case 'ArrowRight':
            case 'ArrowLeft':
                pathString = 'M' + ' ' + lx + ' ' + ly + ' ' + this.findArrowpaths(stockEve.type);
                pathOption = new PathOption(stockId + '_Shape', stockEve.background, border.width, border.color, 1, '', pathString);
                stockEventElement.appendChild(this.stockChart.renderer.drawPath(pathOption));
                break;
            case 'Triangle':
            case 'InvertedTriangle':
                result.height = 3 * textSize.height;
                result.width = textSize.width + (1.5 * textSize.width);
                stockEventElement.appendChild(drawSymbol(new ChartLocation(symbolLocation.x, symbolLocation.y), stockEve.type, new Size(20, 20), '', new PathOption(stockId + '_Shape', stockEve.background, border.width, border.color), this.dateParse(stockEve.date).toISOString()));
                textElement(this.stockChart.renderer, new TextOption(stockId + '_Text', symbolLocation.x, symbolLocation.y, 'middle', stockEve.text, '', 'middle'), stockEve.textStyle, stockEve.textStyle.color, stockEventElement);
                break;
            case 'Text':
                textSize.height += 8; //padding for text height
                pathString = 'M' + ' ' + (lx) + ' ' + (ly) + ' ' +
                    'L' + ' ' + (lx - 5) + ' ' + (ly - 5) + ' ' +
                    'L' + ' ' + (lx - ((textSize.width) / 2)) + ' ' + (ly - 5) + ' ' +
                    'L' + ' ' + (lx - ((textSize.width) / 2)) + ' ' + (ly - textSize.height) + ' ' +
                    'L' + ' ' + (lx + ((textSize.width) / 2)) + ' ' + (ly - textSize.height) + ' ' +
                    'L' + ' ' + (lx + ((textSize.width) / 2)) + ' ' + (ly - 5) + ' ' +
                    'L' + ' ' + (lx + 5) + ' ' + (ly - 5) + ' ' + 'Z';
                pathOption = new PathOption(stockId + '_Shape', stockEve.background, border.width, border.color, 1, '', pathString);
                stockEventElement.appendChild(this.stockChart.renderer.drawPath(pathOption));
                textElement(this.stockChart.renderer, new TextOption(stockId + '_Text', lx, ly - (textSize.height / 2), 'middle', stockEve.text, '', 'middle'), stockEve.textStyle, stockEve.textStyle.color, stockEventElement);
                break;
            default:
                //pin type calculation.
                pathString = 'M' + ' ' + lx + ' ' + ly + ' ' +
                    'L' + ' ' + (lx - ((textSize.width) / 2)) + ' ' + (ly - textSize.height / 3) + ' ' +
                    'L' + ' ' + (lx - ((textSize.width) / 2)) + ' ' + (ly - textSize.height) + ' ' +
                    'L' + ' ' + (lx + ((textSize.width) / 2)) + ' ' + (ly - textSize.height) + ' ' +
                    'L' + ' ' + (lx + ((textSize.width) / 2)) + ' ' + (ly - textSize.height / 3) + ' ' + 'Z';
                pathOption = new PathOption(stockId + '_Shape', stockEve.background, border.width, border.color, 1, '', pathString);
                stockEventElement.appendChild(this.stockChart.renderer.drawPath(pathOption));
                //append text element
                textElement(this.stockChart.renderer, new TextOption(stockId + '_Text', lx, ly - (textSize.height / 2), 'middle', stockEve.text, '', 'middle'), stockEve.textStyle, stockEve.textStyle.color, stockEventElement);
        }
    };
    StockEvents.prototype.renderStockEventTooltip = function (targetId) {
        var seriesIndex = parseInt((targetId.split('_StockEvents_')[0]).split(this.chartId + '_Series_')[1], 10);
        var pointIndex = parseInt(targetId.split('_StockEvents_')[1].replace(/\D+/g, ''), 10);
        var updatedLocation = this.symbolLocations[seriesIndex][pointIndex];
        var pointLocation = new ChartLocation(updatedLocation.x, updatedLocation.y + this.stockChart.toolbarHeight + this.stockChart.titleSize.height);
        this.applyHighLights(pointIndex, seriesIndex);
        //title size and toolbar height is added location for placing tooltip
        var svgElement = this.getElement(this.chartId + '_StockEvents_Tooltip_svg');
        var isTooltip = (this.stockEventTooltip && svgElement && parseInt(svgElement.getAttribute('opacity'), 10) > 0);
        if (!isTooltip) {
            if (getElement(this.chartId + '_StockEvents_Tooltip_svg')) {
                remove(getElement(this.chartId + '_StockEvents_Tooltip'));
            }
            var tooltipElement = createElement('div', {
                id: this.chartId + '_StockEvents_Tooltip', className: 'ejSVGTooltip',
                attrs: { 'style': 'pointer-events:none; position:absolute;z-index: 1' }
            });
            getElement(this.chartId + '_Secondary_Element').appendChild(tooltipElement);
            this.stockEventTooltip = new Tooltip({
                opacity: 1,
                header: '', content: [(this.stockChart.stockEvents[pointIndex].description)],
                enableAnimation: true, location: pointLocation,
                theme: this.stockChart.theme,
                inverted: true,
                areaBounds: this.stockChart.chart.chartAxisLayoutPanel.seriesClipRect
            });
            this.stockEventTooltip.areaBounds.y += this.stockChart.toolbarHeight + this.stockChart.titleSize.height;
            this.stockEventTooltip.appendTo('#' + tooltipElement.id);
        }
        else {
            this.stockEventTooltip.content = [(this.stockChart.stockEvents[pointIndex].description)];
            this.stockEventTooltip.location = pointLocation;
            this.stockEventTooltip.dataBind();
        }
    };
    /**
     * Remove the stock event tooltip
     *
     * @param {number} duration tooltip timeout duration
     * @returns {void}
     */
    StockEvents.prototype.removeStockEventTooltip = function (duration) {
        var _this = this;
        var tooltipElement = this.getElement(this.chartId + '_StockEvents_Tooltip');
        this.stopAnimation();
        if (tooltipElement && this.stockEventTooltip) {
            this.toolTipInterval = +setTimeout(function () {
                _this.stockEventTooltip.fadeOut();
                _this.removeHighLights();
            }, duration);
        }
        else if (tooltipElement && this.stockChart.onPanning) {
            remove(tooltipElement);
        }
    };
    StockEvents.prototype.findArrowpaths = function (type) {
        var arrowString = '';
        switch (type) {
            case 'ArrowUp':
                arrowString = 'l -10 10 l 5 0 l 0 10 l 10 0 l 0 -10 l 5 0 z';
                break;
            case 'ArrowDown':
                arrowString = 'l -10 -10 l 5 0 l 0 -10 l 10 0 l 0 10 l 5 0 z';
                break;
            case 'ArrowLeft':
                arrowString = 'l -10 -10 l 0 5 l -10 0 l 0 10 l 10 0 l 0 5 z';
                break;
            case 'ArrowRight':
                arrowString = 'l 10 -10 l 0 5 l 10 0 l 0 10 l -10 0 l 0 5 z';
                break;
        }
        return arrowString;
    };
    StockEvents.prototype.applyHighLights = function (pointIndex, seriesIndex) {
        if (this.pointIndex !== pointIndex || this.seriesIndex !== seriesIndex) {
            this.removeHighLights();
        }
        this.pointIndex = pointIndex;
        this.seriesIndex = seriesIndex;
        var stockId = this.chartId + '_Series_' + seriesIndex + '_StockEvents_' + pointIndex;
        this.setOpacity(stockId + '_Shape', 0.5);
        this.setOpacity(stockId + '_Text', 0.5);
    };
    StockEvents.prototype.removeHighLights = function () {
        var stockId = this.chartId + '_Series_' + this.seriesIndex + '_StockEvents_' + this.pointIndex;
        this.setOpacity(stockId + '_Shape', 1);
        this.setOpacity(stockId + '_Text', 1);
    };
    StockEvents.prototype.setOpacity = function (elementId, opacity) {
        if (getElement(elementId)) {
            getElement(elementId).setAttribute('opacity', opacity.toString());
        }
    };
    /**
     * To convert the c# or javascript date formats into js format
     * refer chart control's dateTime processing.
     *
     * @param {Date | string} value date or string value
     * @returns {Date} date format value
     */
    StockEvents.prototype.dateParse = function (value) {
        var dateParser = this.chart.intl.getDateParser({ skeleton: 'full', type: 'dateTime' });
        var dateFormatter = this.chart.intl.getDateFormat({ skeleton: 'full', type: 'dateTime' });
        return new Date((Date.parse(dateParser(dateFormatter(new Date(DataUtil.parse.parseJson({ val: value }).val))))));
    };
    return StockEvents;
}(BaseTooltip));
export { StockEvents };
/**
 * To initial the array.
 *
 * @private
 * @param {number} numrows The number of rows in the array.
 * @param {number} numcols The number of columns in the array.
 * @param {ChartLocation} initial The initial value to fill the array with.
 * @returns {ChartLocation[]} An array filled with the specified initial value.
 */
function initialArray(numrows, numcols, initial) {
    var arr = [];
    for (var i = 0; i < numrows; ++i) {
        var columns = [];
        for (var j = 0; j < numcols; ++j) {
            columns[j] = initial;
        }
        arr[i] = columns;
    }
    return arr;
}
