/**
 * Cartesian chart renderer for financial chart
 */
import { Chart } from '../../chart/chart';
import { Size } from '@syncfusion/ej2-svg-base';
import { remove, extend } from '@syncfusion/ej2-base';
import { onZooming } from '../../common/model/constants';
import { getElement } from '../../common/utils/helper';
import { DataUtil } from '@syncfusion/ej2-data';
/** @private */
var CartesianChart = /** @class */ (function () {
    function CartesianChart(chart) {
        this.stockChart = chart;
    }
    CartesianChart.prototype.initializeChart = function (chartArgsData) {
        var _this = this;
        var stockChart = this.stockChart;
        var isProtect = 'isProtectedOnChange';
        var startValue = null;
        var endValue = null;
        stockChart[isProtect] = true;
        if (!stockChart.chartObject) {
            stockChart.chartObject = stockChart.renderer.createGroup({
                id: stockChart.element.id + '_stockChart_chart'
            });
            stockChart.mainObject.appendChild(stockChart.chartObject);
        }
        else {
            var chartElement = document.getElementById(stockChart.chartObject.id);
            while (chartElement.firstChild) {
                chartElement.removeChild(chartElement.firstChild);
            }
            if (getElement(stockChart.chartObject + '_tooltip')) {
                remove(getElement(stockChart.chartObject + '_tooltip'));
            }
        }
        this.stockChart.isDateTimeCategory = this.stockChart.primaryXAxis.valueType === 'DateTimeCategory';
        if (this.stockChart.isDateTimeCategory && !this.stockChart.sortedData.length) {
            for (var _i = 0, _a = this.stockChart.series; _i < _a.length; _i++) {
                var series = _a[_i];
                var dataSource = series.dataSource;
                var xName = series.xName;
                for (var _b = 0, dataSource_1 = dataSource; _b < dataSource_1.length; _b++) {
                    var dataItem = dataSource_1[_b];
                    var currentData = Date.parse(new Date(DataUtil.parse.parseJson({ val: dataItem[xName] }).val).toString());
                    if (this.stockChart.sortedData.indexOf(currentData) === -1) {
                        this.stockChart.sortedData.push(currentData);
                    }
                }
            }
            this.stockChart.sortedData.sort(function (a, b) { return a - b; });
        }
        this.cartesianChartSize = this.calculateChartSize();
        stockChart.chart = new Chart({
            chartArea: stockChart.chartArea,
            margin: this.findMargin(stockChart),
            primaryXAxis: this.copyObject(stockChart.primaryXAxis),
            primaryYAxis: this.copyObject(stockChart.primaryYAxis),
            rows: stockChart.rows,
            indicators: stockChart.indicators,
            axes: stockChart.axes,
            tooltipRender: function (args) {
                _this.stockChart.trigger('tooltipRender', args);
            },
            axisLabelRender: function (args) {
                _this.stockChart.trigger('axisLabelRender', args);
            },
            seriesRender: function (args) {
                startValue = (_this.stockChart.startValue != null && _this.stockChart.isDateTimeCategory) ?
                    _this.stockChart.sortedData[Math.floor(_this.stockChart.startValue)] : _this.stockChart.startValue;
                endValue = (_this.stockChart.endValue != null && _this.stockChart.isDateTimeCategory) ?
                    _this.stockChart.sortedData[Math.floor(_this.stockChart.endValue)] : _this.stockChart.endValue;
                if (args.data && startValue && endValue) {
                    args.data = args.data
                        .filter(function (data) {
                        return (new Date(DataUtil.parse.parseJson({ val: (data[args.series.xName]) }).val).getTime() >= startValue &&
                            new Date(DataUtil.parse.parseJson({ val: (data[args.series.xName]) }).val).getTime() <= endValue);
                    });
                }
                args.data = chartArgsData ? chartArgsData : args.data;
                //args.data = this.stockChart.findCurrentData(args.data ,args.series.xName);
                _this.stockChart.trigger('seriesRender', args);
            },
            onZooming: function (args) { _this.stockChart.trigger(onZooming, args); },
            pointClick: function (args) {
                _this.stockChart.trigger('pointClick', args);
            },
            pointMove: function (args) {
                _this.stockChart.trigger('pointMove', args);
            },
            dataSource: stockChart.dataSource,
            series: this.findSeriesCollection(stockChart.series),
            zoomSettings: this.copyObject(stockChart.zoomSettings),
            tooltip: stockChart.tooltip,
            crosshair: stockChart.crosshair,
            height: this.cartesianChartSize.height.toString(),
            selectedDataIndexes: stockChart.selectedDataIndexes,
            selectionMode: stockChart.selectionMode,
            isMultiSelect: stockChart.isMultiSelect,
            annotations: stockChart.annotations,
            theme: stockChart.theme,
            legendSettings: { visible: false },
            enableRtl: stockChart.enableRtl,
            zoomComplete: function (args) {
                if (args.axis.valueType.indexOf('DateTime') !== -1 && stockChart.rangeNavigator) {
                    _this.stockChart.zoomChange = true;
                    var newRange = _this.calculateUpdatedRange(args.currentZoomFactor, args.currentZoomPosition, args.axis);
                    stockChart.rangeSelector.sliderChange(newRange.start, newRange.end);
                }
            }
        });
        if (stockChart.indicators.length !== 0) {
            if (stockChart.isSelect) {
                for (var i = 0; i < stockChart.indicators.length; i++) {
                    stockChart.chart.indicators[i].animation.enable = false;
                    stockChart.chart.indicators[i].dataSource = extend([], stockChart.chart.series[0].dataSource, null, true);
                }
            }
            stockChart.isSelect = true;
        }
        stockChart.chart.stockChart = stockChart;
        stockChart.chart.appendTo(stockChart.chartObject);
        stockChart[isProtect] = false;
        if (stockChart.onPanning) {
            getElement(this.stockChart.element.id + '_stockChart_chart').setAttribute('cursor', 'pointer');
            stockChart.chart.mouseMove(stockChart.mouseMoveEvent);
        }
    };
    CartesianChart.prototype.findMargin = function (stockChart) {
        var margin = {};
        margin.top = stockChart.stockLegendModule && stockChart.legendSettings.visible && stockChart.legendSettings.position === 'Top' ?
            stockChart.margin.top : stockChart.margin.top * 2;
        margin.left = stockChart.margin.left;
        margin.right = stockChart.margin.right;
        margin.bottom = stockChart.margin.bottom;
        return margin;
    };
    CartesianChart.prototype.findSeriesCollection = function (series) {
        var chartSeries = [];
        for (var i = 0, len = series.length; i < len; i++) {
            chartSeries.push(series[i]);
            chartSeries[i].high = series[i].high;
            chartSeries[i].low = series[i].low;
            chartSeries[i].open = series[i].open;
            chartSeries[i].close = series[i].close;
            chartSeries[i].xName = series[i].xName;
            chartSeries[i].volume = series[i].volume;
            chartSeries[i].animation = series[i].animation;
            if (series[i].localData) {
                chartSeries[i].dataSource = series[i].localData;
            }
            chartSeries[i].yName = series[i].yName === '' ? series[i].close : series[i].yName;
            chartSeries[i].splineType = chartSeries[i].type === 'Spline' ? 'Cardinal' : 'Natural';
        }
        return chartSeries;
    };
    CartesianChart.prototype.calculateChartSize = function () {
        var stockChart = this.stockChart;
        return (new Size(stockChart.availableSize.width, (stockChart.enablePeriodSelector && stockChart.enableSelector) ?
            ((stockChart.availableSize.height - stockChart.toolbarHeight - 51)) :
            (stockChart.enableSelector && !stockChart.enablePeriodSelector) ? (stockChart.availableSize.height - 51) :
                (stockChart.enablePeriodSelector && !stockChart.enableSelector) ?
                    stockChart.availableSize.height - stockChart.toolbarHeight : stockChart.availableSize.height));
    };
    CartesianChart.prototype.calculateUpdatedRange = function (zoomFactor, zoomPosition, axis) {
        var start;
        var end;
        //if (zoomFactor < 1 || zoomPosition > 0) {
        var chartRange = axis.actualRange;
        var inversed = false;
        if (!inversed) {
            start = chartRange.min + zoomPosition * chartRange.delta;
            end = start + zoomFactor * chartRange.delta;
        }
        else {
            start = chartRange.max - (zoomPosition * chartRange.delta);
            end = start - (zoomFactor * chartRange.delta);
        }
        //}
        if (this.stockChart.isDateTimeCategory) {
            start = this.stockChart.sortedData.indexOf(parseInt(axis.labels[Math.floor(start)], 10));
            end = this.stockChart.sortedData.indexOf(parseInt(axis.labels[Math.floor(end)], 10));
        }
        var result = { start: start, end: end };
        return result;
    };
    /**
     * Cartesian chart refreshes based on start and end value
     *
     * @param {StockChart} stockChart stock chart instance
     * @param {Object[]} data stock chart data
     * @returns {void}
     */
    CartesianChart.prototype.cartesianChartRefresh = function (stockChart, data) {
        stockChart.cartesianChart.initializeChart(data);
    };
    CartesianChart.prototype.copyObject = function (originalObject) {
        return (extend({}, originalObject, {}, true));
    };
    return CartesianChart;
}());
export { CartesianChart };
