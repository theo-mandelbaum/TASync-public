import { titlePositionX, textElement, appendChildElement, getElement, RectOption } from '../../common/utils/helper';
import { DropDownButton } from '@syncfusion/ej2-splitbuttons';
import { Rect, TextOption, measureText, SvgRenderer } from '@syncfusion/ej2-svg-base';
import { remove } from '@syncfusion/ej2-base';
/**
 * Period selector for range navigator
 */
/** @private */
var ToolBarSelector = /** @class */ (function () {
    function ToolBarSelector(chart) {
        this.selectedSeries = '';
        this.selectedIndicator = '';
        this.selectedTrendLine = '';
        this.indicators = [];
        this.stockChart = chart;
        this.selectedSeries = this.stockChart.series[0].type;
    }
    ToolBarSelector.prototype.initializePeriodSelector = function () {
        var periods = this.stockChart.tempPeriods;
        this.stockChart.periods = periods;
        this.stockChart.periodSelector.rootControl = this.stockChart;
        var rect = this.stockChart.chart.chartAxisLayoutPanel.seriesClipRect;
        var htmlElement = getElement(this.stockChart.element.id + '_Secondary_Element');
        var height = this.stockChart.toolbarHeight;
        this.stockChart.periodSelector.appendSelector({ thumbSize: 0, element: htmlElement, width: rect.width, height: height }, rect.x);
        if (this.stockChart.seriesType.length > 0) {
            this.initializeSeriesSelector();
        }
        this.initializeIndicatorSelector();
        if (this.stockChart.trendlineType.length > 0) {
            this.initializeTrendlineSelector();
        }
        this.exportButton();
    };
    /**
     * This method returns itemModel for dropdown button.
     *
     * @param {ChartSeriesType[] | TechnicalIndicators[] | ExportType[] | TrendlineTypes[]} type - The type of data for the dropdown button (e.g., ChartSeriesType, TechnicalIndicators, ExportType, TrendlineTypes).
     * @returns {ItemModel[]} - An array of item models for the dropdown button.
     */
    ToolBarSelector.prototype.getDropDownItems = function (type) {
        var result = [];
        if (type === this.stockChart.seriesType) {
            for (var i = 0; i < type.length; i++) {
                result.push({ text: '&nbsp;&nbsp;&nbsp;' + type[i].toString() });
            }
            for (var i = 0; i < this.stockChart.series.length; i++) {
                for (var j = 0; j < result.length; j++) {
                    var text = result[j].text.replace('&nbsp;&nbsp;&nbsp;', '');
                    text = (text === 'OHLC') ? 'HiloOpenClose' : text;
                    if (text === this.stockChart.series[i].type) {
                        result[j].text = result[j].text.replace('&nbsp;&nbsp;&nbsp;', '&#10004&nbsp;');
                    }
                }
            }
        }
        else if (type === this.stockChart.indicatorType) {
            for (var i = 0; i < type.length; i++) {
                result.push({ text: '&nbsp;&nbsp;&nbsp;' + type[i].toString() });
            }
            for (var i = 0; i < this.stockChart.indicators.length; i++) {
                for (var j = 0; j < result.length; j++) {
                    var text = result[j].text.replace('&nbsp;&nbsp;&nbsp;', '');
                    text = text.toLowerCase().replace(/(^\w|_\w)/g, function (match) { return match.toUpperCase(); }).replace(/_/g, '');
                    text = text === 'Accumulation distribution' ? 'AccumulationDistribution' : text === 'Bollinger bands' ? 'BollingerBands' : text;
                    if (text === this.stockChart.indicators[i].type) {
                        result[j].text = result[j].text.replace('&nbsp;&nbsp;&nbsp;', '&#10004&nbsp;');
                        this.indicators.push(text);
                    }
                }
            }
        }
        else if (type === this.stockChart.exportType) {
            for (var i = 0; i < type.length; i++) {
                result.push({ text: type[i].toString() });
            }
        }
        else {
            for (var i = 0; i < type.length; i++) {
                if (type[i].toString() !== 'Print') {
                    result.push({ text: '&nbsp;&nbsp;&nbsp;' + type[i].toString() });
                }
            }
        }
        return result;
    };
    /**
     * This method changes the type of series while selectind series in dropdown button.
     *
     * @param {string} seriesType - The type of series selected from the dropdown button.
     * @returns {void}
     */
    ToolBarSelector.prototype.addedSeries = function (seriesType) {
        var series = this.stockChart.series;
        for (var i = 0; i < series.length; i++) {
            if (series[i].yName === 'volume') {
                continue;
            }
            series[i].type = (seriesType.indexOf('Candle') > -1 ? 'Candle' :
                (seriesType.indexOf('OHLC') > -1 ? 'HiloOpenClose' : seriesType));
            series[i].enableSolidCandles = seriesType === 'Candle';
            for (var index = 0; index < series[i].trendlines.length; index++) {
                var trendLine = series[i].trendlines[index];
                trendLine.animation.enable = false;
                trendLine.enableTooltip = false;
            }
        }
    };
    ToolBarSelector.prototype.initializeSeriesSelector = function () {
        var _this = this;
        if (this.stockChart.seriesType.indexOf('HiloOpenClose') > -1) {
            this.stockChart.seriesType[this.stockChart.seriesType.indexOf('HiloOpenClose')] = 'OHLC';
        }
        if (this.stockChart.seriesType.indexOf('Candle') > -1 && this.stockChart.seriesType.indexOf('Hollow Candle') === -1) {
            this.stockChart.seriesType[this.stockChart.seriesType.length] = 'Hollow Candle';
        }
        var seriesType = new DropDownButton({
            enableHtmlSanitizer: false,
            items: this.getDropDownItems(this.stockChart.seriesType),
            select: function (args) {
                _this.selectedSeries = args.item.text;
                var text = _this.tickMark(args);
                _this.addedSeries(text);
                _this.stockChart.cartesianChart.initializeChart();
                if (_this.stockChart.stockLegendModule && _this.stockChart.stockLegendModule.legendCollections.length
                    && _this.stockChart.legendSettings.visible) {
                    var bounds = _this.stockChart.stockLegendModule.legendBounds;
                    _this.stockChart.stockLegendModule.renderLegend(_this.stockChart, _this.stockChart.legendSettings, bounds);
                }
            }
        });
        seriesType.appendTo('#' + this.stockChart.element.id + '_seriesType');
    };
    ToolBarSelector.prototype.initializeTrendlineSelector = function () {
        var _this = this;
        this.trendlineDropDown = new DropDownButton({
            enableHtmlSanitizer: false,
            items: this.stockChart.resizeTo ? this.trendlineDropDown.items :
                this.getDropDownItems(this.stockChart.trendlineType),
            select: function (args) {
                var type = _this.tickMark(args);
                _this.selectedTrendLine = _this.selectedTrendLine === '' ? type : _this.selectedTrendLine + ',' + type;
                if (_this.trendline !== type) {
                    _this.trendline = type;
                    for (var i = 0; i < _this.stockChart.series.length; i++) {
                        if (_this.stockChart.series[i].yName === 'volume') {
                            continue;
                        }
                        if (_this.stockChart.series[0].trendlines.length === 0) {
                            var trendlines = void 0;
                            if (_this.stockChart.trendlinetriggered) {
                                trendlines = [{ type: type, width: 1, enableTooltip: false }];
                                _this.stockChart.trendlinetriggered = false;
                            }
                            _this.stockChart.series[0].trendlines = trendlines;
                        }
                        else {
                            _this.stockChart.series[0].trendlines[0].width = 1;
                            _this.stockChart.series[0].trendlines[0].type = type;
                            _this.stockChart.series[0].trendlines[0].animation.enable = _this.stockChart.trendlinetriggered ? true : false;
                        }
                    }
                    _this.stockChart.cartesianChart.initializeChart();
                }
                else {
                    args.item.text = '&nbsp;&nbsp;&nbsp;' + args.item.text.replace('&#10004&nbsp;', '');
                    _this.stockChart.series[0].trendlines[0].width = 0;
                    _this.trendline = null;
                    _this.stockChart.cartesianChart.initializeChart();
                }
            }
        });
        this.trendlineDropDown.appendTo('#' + this.stockChart.element.id + '_trendType');
    };
    ToolBarSelector.prototype.initializeIndicatorSelector = function () {
        var _this = this;
        this.indicatorDropDown = new DropDownButton({
            enableHtmlSanitizer: false,
            items: this.stockChart.resizeTo ? this.indicatorDropDown.items :
                this.getDropDownItems(this.stockChart.indicatorType),
            select: function (args) {
                for (var l = 0; l < _this.stockChart.series.length; l++) {
                    if (_this.stockChart.series[l].trendlines.length !== 0) {
                        _this.stockChart.series[l].trendlines[0].animation.enable = false;
                    }
                }
                args.item.text = args.item.text.indexOf('&#10004&nbsp;') >= 0 ? args.item.text.substr(args.item.text.indexOf(';') + 1) :
                    args.item.text;
                var text = args.item.text.replace('&nbsp;&nbsp;&nbsp;', '');
                text = text.split(' ')[0].toLocaleLowerCase() + (text.split(' ')[1] ? text.split(' ')[1] : '');
                text = text.substr(0, 1).toUpperCase() + text.substr(1);
                var type = text;
                _this.selectedIndicator = _this.selectedIndicator.indexOf(type) === -1 ? _this.selectedIndicator + ' ' + type :
                    _this.selectedIndicator.replace(type, '');
                if (type === 'Tma' || type === 'BollingerBands' || type === 'Sma' || type === 'Ema') {
                    if (_this.indicators.indexOf(type) === -1) {
                        args.item.text = '&#10004&nbsp;' + args.item.text.replace('&nbsp;&nbsp;&nbsp;', '');
                        var indicator = _this.getIndicator(type, _this.stockChart.series[0].yAxisName);
                        _this.indicators.push(type);
                        _this.stockChart.indicators = _this.stockChart.indicators.concat(indicator);
                        _this.stockChart.cartesianChart.initializeChart();
                    }
                    else {
                        args.item.text = '&nbsp;&nbsp;&nbsp;' + args.item.text;
                        for (var z = 0; z < _this.stockChart.indicators.length; z++) {
                            if (_this.stockChart.indicators[z].type === type) {
                                _this.stockChart.indicators.splice(z, 1);
                            }
                        }
                        _this.indicators.splice(_this.indicators.indexOf(type), 1);
                        _this.stockChart.cartesianChart.initializeChart();
                    }
                }
                else {
                    _this.createIndicatorAxes(type, args);
                }
            }
        });
        this.indicatorDropDown.appendTo('#' + this.stockChart.element.id + '_indicatorType');
    };
    ToolBarSelector.prototype.getIndicator = function (type, yAxisName) {
        var currentSeries = this.stockChart.series[0];
        var indicator = [{
                type: type, period: 3, yAxisName: yAxisName,
                dataSource: currentSeries.localData,
                xName: currentSeries.xName,
                open: currentSeries.open,
                close: currentSeries.close,
                high: currentSeries.high,
                low: currentSeries.low,
                volume: currentSeries.volume,
                fill: type === 'Sma' ? '#32CD32' : '#6063ff',
                animation: { enable: false }, upperLine: { color: '#FFE200', width: 1 },
                periodLine: { width: 2 }, lowerLine: { color: '#FAA512', width: 1 },
                fastPeriod: 8, slowPeriod: 5, macdType: 'Both', width: 1,
                macdPositiveColor: '#6EC992', macdNegativeColor: '#FF817F',
                bandColor: 'rgba(245, 203, 35, 0.12)'
            }];
        return indicator;
    };
    ToolBarSelector.prototype.createIndicatorAxes = function (type, args) {
        if (this.indicators.indexOf(type) === -1) {
            args.item.text = '&#10004&nbsp;' + args.item.text.replace('&nbsp;&nbsp;&nbsp;', '');
            this.indicators.push(type);
            var len = this.stockChart.rows.length;
            this.stockChart.rows[this.stockChart.rows.length - 1].height = '15%';
            var row = [{ height: '' + (100 - len * 15) + 'px' }];
            if (this.stockChart.rows.length === 1) {
                this.stockChart.isSingleAxis = true;
            }
            this.stockChart.rows = this.stockChart.rows.concat(row);
            if (!this.stockChart.isSingleAxis) {
                this.stockChart.axes[0].rowIndex += 1;
            }
            else {
                for (var i = 0; i < this.stockChart.axes.length; i++) {
                    this.stockChart.axes[i].rowIndex += 1;
                }
            }
            var axis = [{
                    plotOffset: 10, opposedPosition: true,
                    rowIndex: (!this.stockChart.isSingleAxis ? this.stockChart.axes.length : 0),
                    desiredIntervals: 1,
                    labelFormat: 'n2',
                    majorGridLines: this.stockChart.primaryYAxis.majorGridLines,
                    lineStyle: this.stockChart.primaryYAxis.lineStyle,
                    labelPosition: this.stockChart.primaryYAxis.labelPosition,
                    majorTickLines: this.stockChart.primaryYAxis.majorTickLines,
                    rangePadding: 'None', name: type.toString()
                }];
            this.stockChart.axes = this.stockChart.axes.concat(axis);
            this.stockChart.primaryYAxis.rowIndex = (!this.stockChart.isSingleAxis ? 0 : len + 1);
            var indicator = this.getIndicator(type, type.toString());
            this.stockChart.indicators = this.stockChart.indicators.concat(indicator);
            this.stockChart.cartesianChart.initializeChart();
        }
        else {
            args.item.text = '&nbsp;&nbsp;&nbsp;' + args.item.text;
            for (var i = 0; i < this.stockChart.indicators.length; i++) {
                if (this.stockChart.indicators[i].type === type) {
                    this.stockChart.indicators.splice(i, 1);
                }
            }
            this.indicators.splice(this.indicators.indexOf(type), 1);
            var removedIndex = 0;
            for (var z = 0; z < this.stockChart.axes.length; z++) {
                if (this.stockChart.axes[z].name === type) {
                    removedIndex = this.stockChart.axes[z].rowIndex;
                    this.stockChart.rows.splice(z, 1);
                    this.stockChart.axes.splice(z, 1);
                }
            }
            for (var z = 0; z < this.stockChart.axes.length; z++) {
                if (this.stockChart.axes[z].rowIndex !== 0 && this.stockChart.axes[z].rowIndex > removedIndex) {
                    this.stockChart.axes[z].rowIndex = this.stockChart.axes[z].rowIndex - 1;
                }
            }
            this.stockChart.cartesianChart.initializeChart();
        }
    };
    ToolBarSelector.prototype.tickMark = function (args) {
        var text;
        var items = args.item['parentObj'].items;
        for (var i = 0; i < items.length; i++) {
            items[i].text = items[i].text.indexOf('&#10004&nbsp;') >= 0 ?
                items[i].text.substr(items[i].text.indexOf(';') + 1) :
                items[i].text;
            if (!(items[i].text.indexOf('&nbsp;&nbsp;&nbsp;') >= 0)) {
                items[i].text = '&nbsp;&nbsp;&nbsp;' + items[i].text;
            }
        }
        if (args.item.text.indexOf('&nbsp;&nbsp;&nbsp;') >= 0) {
            text = args.item.text.replace('&nbsp;&nbsp;&nbsp;', '');
            args.item.text = args.item.text.replace('&nbsp;&nbsp;&nbsp;', '&#10004&nbsp;');
        }
        else {
            text = args.item.text.replace('&#10004&nbsp;', '');
        }
        return text;
    };
    ToolBarSelector.prototype.exportButton = function () {
        var _this = this;
        var exportChart = new DropDownButton({
            enableHtmlSanitizer: false,
            items: this.getDropDownItems(this.stockChart.exportType),
            select: function (args) {
                var type = args.item.text;
                if (_this.stockChart.chart.exportModule) {
                    var stockChart = _this.stockChart;
                    var stockID = stockChart.element.id + '_stockChart_';
                    var svgHeight = stockChart.svgObject.getBoundingClientRect();
                    _this.stockChart.svgObject.insertAdjacentElement('afterbegin', _this.addExportSettings(type === 'Print'));
                    var additionalRect = stockChart.svgObject.firstElementChild.getBoundingClientRect();
                    var rect = new RectOption('additionalRect', 'transparent', { width: 0, color: 'transparent' }, 1, new Rect(0, 0, _this.stockChart.availableSize.width, additionalRect.height));
                    stockChart.svgObject.firstElementChild.insertAdjacentElement('afterbegin', _this.stockChart.renderer.drawRectangle(rect));
                    _this.stockChart.svgObject.setAttribute('height', (svgHeight.height + additionalRect.height).toString());
                    getElement(stockID + 'chart').style.transform = 'translateY(' + additionalRect.height + 'px)';
                    if (stockChart.enableSelector) {
                        getElement(stockID + 'rangeSelector').setAttribute('transform', 'translate(' + 0 + ',' + (stockChart.cartesianChart.cartesianChartSize.height + additionalRect.height) + ')');
                    }
                    if (_this.stockChart.legendSettings.visible && _this.stockChart.stockLegendModule) {
                        getElement(stockChart.element.id + '_chart_legend_g').style.transform = 'translateY(' + additionalRect.height + 'px)';
                    }
                    if (type === 'Print') {
                        _this.stockChart.chart.print(_this.stockChart.svgObject.id);
                    }
                    else {
                        stockChart.chart.exportModule.export(type, 'StockChart', null, [stockChart], null, stockChart.svgObject.clientHeight);
                    }
                    remove(getElement(_this.stockChart.element.id + '_additionalExport'));
                    getElement(stockID + 'chart').style.transform = '';
                    if (stockChart.enableSelector) {
                        getElement(stockID + 'rangeSelector').setAttribute('transform', 'translate(' + 0 + ',' + (stockChart.cartesianChart.cartesianChartSize.height) + ')');
                    }
                    if (_this.stockChart.legendSettings.visible && _this.stockChart.stockLegendModule) {
                        getElement(stockChart.element.id + '_chart_legend_g').style.transform = 'translateY(0px)';
                    }
                    _this.stockChart.svgObject.setAttribute('height', (svgHeight.height).toString());
                }
            }
        });
        exportChart.appendTo('#' + this.stockChart.element.id + '_export');
    };
    ToolBarSelector.prototype.calculateAutoPeriods = function () {
        var defaultPeriods = [];
        var min = this.stockChart.isDateTimeCategory ? this.stockChart.sortedData[this.stockChart.seriesXMin] :
            this.stockChart.seriesXMin;
        var max = this.stockChart.isDateTimeCategory ? this.stockChart.sortedData[this.stockChart.seriesXMax] :
            this.stockChart.seriesXMax;
        defaultPeriods = this.findRange(min, max);
        defaultPeriods.push({ text: 'YTD', selected: true }, { text: 'All' });
        return defaultPeriods;
    };
    /**
     * Finds the range of periods between the specified minimum and maximum values.
     *
     * @param {number} min - The minimum value of the range.
     * @param {number} max - The maximum value of the range.
     * @returns {PeriodsModel[]} - An array of PeriodsModel objects that fall within the specified range.
     * @private
     */
    ToolBarSelector.prototype.findRange = function (min, max) {
        var defaultPeriods = [];
        if (((max - min) / 3.154e+10) >= 1) {
            defaultPeriods.push({ text: '1M', interval: 1, intervalType: 'Months' }, { text: '3M', interval: 3, intervalType: 'Months' }, { text: '6M', interval: 6, intervalType: 'Months' }, { text: '1Y', interval: 1, intervalType: 'Years' });
        }
        else if ((max - min) / 1.577e+10 >= 1) {
            defaultPeriods.push({ text: '1M', interval: 1, intervalType: 'Months' }, { text: '3M', interval: 3, intervalType: 'Months' }, { text: '6M', interval: 6, intervalType: 'Months' });
        }
        else if ((max - min) / 2.628e+9 >= 1) {
            defaultPeriods.push({ text: '1D', interval: 1, intervalType: 'Days' }, { text: '3W', interval: 3, intervalType: 'Weeks' }, { text: '1M', interval: 1, intervalType: 'Months' });
        }
        else if ((max - min) / 8.64e+7 >= 1) {
            defaultPeriods.push({ text: '1H', interval: 1, intervalType: 'Hours' }, { text: '12H', interval: 12, intervalType: 'Hours' }, { text: '1D', interval: 1, intervalType: 'Days' });
        }
        return defaultPeriods;
    };
    /**
     * Text elements added to while export the chart
     * It details about the seriesTypes, indicatorTypes and Trendlines selected in chart.
     *
     * @param {boolean} isPrint - Specifies whether the export is for printing.
     * @returns {Element} - The element containing the exported chart details.
     */
    ToolBarSelector.prototype.addExportSettings = function (isPrint) {
        var exportElement = this.stockChart.renderer.createGroup({
            id: this.stockChart.element.id + '_additionalExport',
            width: this.stockChart.availableSize.width,
            fill: this.stockChart.background ? this.stockChart.background : 'transparent'
        });
        var titleHeight = measureText(this.stockChart.title, this.stockChart.titleStyle, this.stockChart.themeStyle.chartTitleFont).height;
        var options = new TextOption(exportElement.id + '_Title', titlePositionX(new Rect(0, 0, this.stockChart.availableSize.width, 0), this.stockChart.titleStyle), 0, 'middle', this.stockChart.title, '', 'text-before-edge');
        textElement(this.stockChart.renderer, options, this.stockChart.titleStyle, this.stockChart.titleStyle.color || this.stockChart.themeStyle.chartTitleFont.color, exportElement, null, null, null, null, null, null, null, null, null, null, this.stockChart.themeStyle.chartTitleFont);
        if (isPrint) {
            return exportElement;
        }
        var style = { size: '16px', fontWeight: '600', color: this.stockChart.themeStyle.chartTitleFont.color, fontStyle: 'Normal', fontFamily: this.stockChart.themeStyle.chartTitleFont.fontFamily };
        var x = measureText('Series: ' + this.selectedSeries, style).width / 2;
        var y = titleHeight;
        this.textElementSpan(new TextOption(exportElement.id + '_Series', x, y, 'start', ['Series : ', this.selectedSeries], '', 'text-before-edge'), style, this.stockChart.themeStyle.chartTitleFont.color, exportElement);
        x += measureText('Series: ' + this.selectedSeries + ' Z', style).width;
        if (this.selectedIndicator !== '') {
            this.textElementSpan(new TextOption(exportElement.id + '_Indicator', x, y, 'start', ['Indicator :', this.selectedIndicator], '', 'text-before-edge'), style, this.stockChart.themeStyle.chartTitleFont.color, exportElement);
            x += measureText('Indicator: ' + this.selectedIndicator + ' Z', style).width;
        }
        if (this.selectedTrendLine !== '') {
            this.textElementSpan(new TextOption(exportElement.id + '_TrendLine', x, y, 'start', ['Trendline :', this.selectedTrendLine], '', 'text-before-edge'), style, this.stockChart.themeStyle.chartTitleFont.color, exportElement);
        }
        return exportElement;
    };
    /** @private */
    ToolBarSelector.prototype.textElementSpan = function (options, font, color, parent, isMinus, redraw, isAnimate, forceAnimate, animateDuration) {
        if (isMinus === void 0) { isMinus = false; }
        if (forceAnimate === void 0) { forceAnimate = false; }
        var renderer = new SvgRenderer('');
        var renderOptions = {};
        var tspanElement;
        renderOptions = {
            'id': options.id,
            'font-style': font.fontStyle,
            'font-family': font.fontFamily,
            'font-weight': font.fontWeight,
            'text-anchor': options.anchor,
            'x': options.x,
            'y': options.y,
            'fill': color,
            'font-size': font.size,
            'transform': options.transform,
            'opacity': font.opacity,
            'dominant-baseline': options.baseLine
        };
        var text = typeof options.text === 'string' ? options.text : isMinus ? options.text[options.text.length - 1] : options.text[0];
        var htmlObject = renderer.createText(renderOptions, text);
        if (typeof options.text !== 'string' && options.text.length > 1) {
            for (var i = 1, len = options.text.length; i < len; i++) {
                options.text[i] = ' ' + options.text[i];
                tspanElement = renderer.createTSpan({
                    'x': options.x + measureText(text, font).width + 5, 'id': options.id,
                    'y': (options.y), opacity: 0.5
                }, options.text[i]);
                htmlObject.appendChild(tspanElement);
            }
        }
        appendChildElement(false, parent, htmlObject, redraw, isAnimate, 'x', 'y', null, null, forceAnimate, false, null, animateDuration);
        return htmlObject;
    };
    return ToolBarSelector;
}());
export { ToolBarSelector };
