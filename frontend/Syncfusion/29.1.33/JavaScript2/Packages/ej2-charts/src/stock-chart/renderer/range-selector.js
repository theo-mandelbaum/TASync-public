/**
 * Render range navigator for financial chart
 */
import { RangeNavigator } from '../../range-navigator/range-navigator';
import { remove } from '@syncfusion/ej2-base';
import { getElement } from '../../common/utils/helper';
import { Size } from '@syncfusion/ej2-svg-base';
/** @private */
var RangeSelector = /** @class */ (function () {
    function RangeSelector(stockChart) {
        this.stockChart = stockChart;
    }
    RangeSelector.prototype.initializeRangeNavigator = function () {
        var _this = this;
        var stockChart = this.stockChart;
        var padding = stockChart.chart.axisCollections[1].labelPadding +
            stockChart.chart.axisCollections[1].lineStyle.width * 0.5;
        if (!stockChart.selectorObject) {
            stockChart.selectorObject = stockChart.renderer.createGroup({
                id: stockChart.element.id + '_stockChart_rangeSelector',
                transform: 'translate(' + 0 + ',' + stockChart.cartesianChart.cartesianChartSize.height + ')'
            });
            stockChart.mainObject.appendChild(stockChart.selectorObject);
        }
        else {
            var chartElement = document.getElementById(stockChart.selectorObject.id);
            while (chartElement.firstChild) {
                chartElement.removeChild(chartElement.firstChild);
            }
            if (getElement(stockChart.selectorObject.id + '_leftTooltip')) {
                remove(getElement(stockChart.selectorObject.id + '_leftTooltip'));
            }
            if (getElement(stockChart.selectorObject.id + '_rightTooltip')) {
                remove(getElement(stockChart.selectorObject.id + '_rightTooltip'));
            }
        }
        stockChart.rangeNavigator = new RangeNavigator({
            locale: 'en',
            valueType: stockChart.primaryXAxis.valueType,
            theme: this.stockChart.theme,
            series: this.findSeriesCollection(stockChart.series),
            height: this.calculateChartSize().height.toString(),
            tickPosition: 'Inside',
            majorTickLines: { width: 0 },
            value: [stockChart.isDateTimeCategory ? new Date(stockChart.sortedData[Math.floor(stockChart.startValue)]) :
                    new Date(stockChart.startValue),
                stockChart.isDateTimeCategory ? new Date(stockChart.sortedData[Math.floor(stockChart.endValue)]) :
                    new Date(stockChart.endValue)],
            margin: this.findMargin(),
            tooltip: { enable: stockChart.tooltip.enable, displayMode: 'OnDemand' },
            labelPlacement: 'OnTicks',
            labelPosition: 'Inside',
            dataSource: stockChart.dataSource,
            intervalType: stockChart.primaryXAxis.intervalType,
            enableRtl: stockChart.enableRtl,
            changed: function (args) {
                var arg = {
                    name: 'rangeChange',
                    end: args.end,
                    selectedData: args.selectedData,
                    start: args.start,
                    zoomFactor: args.zoomFactor,
                    zoomPosition: args.zoomPosition,
                    data: undefined
                };
                _this.stockChart.trigger('rangeChange', arg);
                _this.stockChart.startValue = args.start;
                _this.stockChart.endValue = args.end;
                if (!_this.stockChart.zoomChange) {
                    _this.stockChart.cartesianChart.cartesianChartRefresh(_this.stockChart, arg.data);
                }
                if (stockChart.periodSelector && stockChart.periodSelector.datePicker) {
                    stockChart.periodSelector.datePicker.startDate = _this.stockChart.isDateTimeCategory ?
                        new Date(_this.stockChart.sortedData[Math.floor(args.start)]) : new Date(args.start);
                    stockChart.periodSelector.datePicker.endDate = _this.stockChart.isDateTimeCategory ?
                        new Date(_this.stockChart.sortedData[Math.floor(args.end)]) : new Date(args.end);
                    stockChart.periodSelector.datePicker.dataBind();
                }
            }
        });
        stockChart.rangeNavigator.stockChart = stockChart;
        stockChart.rangeNavigator.appendTo(stockChart.selectorObject);
    };
    RangeSelector.prototype.findMargin = function () {
        var margin = {};
        margin.top = 5;
        margin.left = 0;
        margin.right = 0;
        margin.bottom = 0;
        return margin;
    };
    RangeSelector.prototype.findSeriesCollection = function (series) {
        var chartSeries = [];
        for (var i = 0, len = series.length; i < len; i++) {
            chartSeries.push(series[i]);
            chartSeries[i].xName = series[i].xName;
            chartSeries[i].yName = series[i].yName;
        }
        return chartSeries;
    };
    RangeSelector.prototype.calculateChartSize = function () {
        var stockChart = this.stockChart;
        return (new Size(stockChart.availableSize.width, (stockChart.enableSelector) ? 51 : 0));
    };
    /**
     * Performs slider change
     *
     * @param {number} start slider start value
     * @param {number} end slider end value
     * @returns {void}
     */
    RangeSelector.prototype.sliderChange = function (start, end) {
        this.stockChart.rangeNavigator.rangeSlider.performAnimation(start, end, this.stockChart.rangeNavigator);
    };
    return RangeSelector;
}());
export { RangeSelector };
