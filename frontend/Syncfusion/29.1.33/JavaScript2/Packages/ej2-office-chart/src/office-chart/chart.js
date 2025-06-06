/* eslint-disable */
/* tslint:disable:no-any */
import { Chart, AccumulationChart, AccumulationLegend, PieSeries, AccumulationTooltip, AccumulationDataLabel, DateTime, BarSeries, StackingBarSeries, LineSeries, StackingLineSeries, ColumnSeries, StackingColumnSeries, AreaSeries, StackingAreaSeries, Trendlines, ScatterSeries, BubbleSeries, RadarSeries, PolarSeries, ErrorBar, SplineSeries, DataLabel, Category, Legend, Tooltip, Export } from '@syncfusion/ej2-charts';
Chart.Inject(AreaSeries, StackingAreaSeries, BarSeries, PieSeries, StackingBarSeries, PolarSeries, ScatterSeries, BubbleSeries, RadarSeries, DateTime, ColumnSeries, StackingColumnSeries, LineSeries, StackingLineSeries, ErrorBar, Trendlines, SplineSeries, DataLabel, Category, Legend, Tooltip, Export);
AccumulationChart.Inject(AccumulationLegend, PieSeries, AccumulationTooltip, AccumulationDataLabel);
import { SvgRenderer } from '@syncfusion/ej2-svg-base';
import { createElement, isNullOrUndefined } from '@syncfusion/ej2-base';
import { chartTypeProperty, widthProperty, heightProperty, chartDataProperty, chartCategoryProperty, chartLegendProperty, chartPrimaryCategoryAxisProperty, chartSeriesProperty, chartTitleProperty, chartPrimaryValueAxisProperty, dataPointsProperty, seriesNameProperty, errorBarProperty, dataLabelProperty, trendLinesProperty, fillProperty, foreColorProperty, positionProperty, typeProperty, directionProperty, endStyleProperty, nameProperty, forwardProperty, backwardProperty, interceptProperty, lineProperty, rgbProperty, categoryTypeProperty, hasMajorGridLinesProperty, hasMinorGridLinesProperty, minimumValueProperty, maximumValueProperty, majorUnitProperty, categoryXNameProperty, numberFormatProperty, yValueProperty, sizeProperty, seriesFormatProperty, idProperty, isAutoMajorProperty } from '../index';
/**
 * Chart component is used to convert office charts to ej2-charts.
 */
var ChartComponent = /** @class */ (function () {
    function ChartComponent() {
        /**
         * @private
         */
        this.keywordIndex = undefined;
        /**
         * @private
         */
        this.chartYValues = [];
    }
    /**
     * @private
     */
    ChartComponent.prototype.chartRender = function (chart, keywordIndex) {
        this.keywordIndex = !isNullOrUndefined(keywordIndex) ? keywordIndex : 0;
        this.chartType = chart[chartTypeProperty[this.keywordIndex]];
        this.isPieType = (this.chartType === 'Pie' || this.chartType === 'Doughnut');
        var chartData = this.chartData(chart, this.chartType);
        var chartModel = {
            enableAnimation: false,
            width: chart[widthProperty[this.keywordIndex]] * (96 / 72) + 'px',
            height: chart[heightProperty[this.keywordIndex]] * (96 / 72) + 'px'
        };
        if (this.isPieType) {
            this.chart = new AccumulationChart(chartModel);
        }
        else {
            this.chart = new Chart(chartModel);
            this.chart.primaryXAxis = this.chartPrimaryXAxis(chart[chartPrimaryCategoryAxisProperty[this.keywordIndex]], this.chartType);
            this.chart.primaryYAxis = this.chartPrimaryYAxis(chart[chartPrimaryValueAxisProperty[this.keywordIndex]]);
        }
        this.chart.series = this.chartSeries(chart[chartSeriesProperty[this.keywordIndex]], chartData, this.chartType);
        for (var i = 0; i < this.chart.series.length; i++) {
            this.chart.series[parseInt(i.toString(), 10)].animation.enable = false;
        }
        this.chart.title = chart[chartTitleProperty[this.keywordIndex]];
        this.chart.legendSettings = this.parseChartLegend(chart[chartLegendProperty[this.keywordIndex]]);
    };
    /**
     * @private
     */
    ChartComponent.prototype.convertChartToImage = function (chart, elementWidth, elementHeight) {
        var _this = this;
        var promise;
        return promise = new Promise(function (resolve, reject) {
            var width = 0;
            var height = 0;
            var dataInfo = _this.getControlsValue([chart], elementWidth, elementHeight);
            width = width ? width : dataInfo.width;
            height = height ? height : dataInfo.height;
            var element = createElement('canvas');
            var displayPixelRatio = Math.max(1, window.devicePixelRatio || 1);
            element.width = width * (displayPixelRatio);
            element.height = height * (displayPixelRatio);
            element.style.width = width + 'px';
            element.style.height = height + 'px';
            // tslint:disable-next-line:max-line-length
            var url = window.URL.createObjectURL(new Blob([(new XMLSerializer()).serializeToString(dataInfo.svg)], { type: 'image/svg+xml' }));
            var image = new Image();
            var canvasContext = element.getContext('2d');
            canvasContext.scale(displayPixelRatio, displayPixelRatio);
            image.onload = (function () {
                canvasContext.drawImage(image, 0, 0);
                window.URL.revokeObjectURL(url);
                var dataURL = element.toDataURL('image/png');
                resolve(dataURL);
            });
            image.onerror = (function () {
                reject('Invalid data');
            });
            image.src = url;
        });
    };
    ChartComponent.prototype.getControlsValue = function (controls, elementWidth, elementHeight) {
        var width = 0;
        var height = 0;
        var content = '';
        var svgRenderer = new SvgRenderer('').createSvg({
            id: 'Image_Export',
            width: 200, height: 200
        });
        controls.map(function (control) {
            if (control) {
                var svgElement = control.svgObject.cloneNode(true);
                var groupElement = control.renderer.createGroup({
                    style: 'transform: translateY(' + height + 'px)'
                });
                groupElement.appendChild(svgElement);
                width = Math.max(control.availableSize.width, elementWidth);
                height += control.availableSize.height;
                content += control.svgObject.outerHTML;
                svgRenderer.appendChild(groupElement);
            }
        });
        svgRenderer.setAttribute('width', width + '');
        svgRenderer.setAttribute('height', height + '');
        return {
            'width': width,
            'height': height,
            'svg': svgRenderer
        };
    };
    ChartComponent.prototype.officeChartType = function (type) {
        var chartType = '';
        switch (type) {
            case 'Area_Stacked':
                chartType = 'StackingArea';
                break;
            case 'Area':
                chartType = 'Area';
                break;
            case 'Area_Stacked_100':
                chartType = 'StackingArea100';
                break;
            case 'Bar_Clustered':
                chartType = 'Bar';
                break;
            case 'Bar_Stacked':
                chartType = 'StackingBar';
                break;
            case 'Bar_Stacked_100':
                chartType = 'StackingBar100';
                break;
            case 'Column_Clustered':
                chartType = 'Column';
                break;
            case 'Column_Stacked':
                chartType = 'StackingColumn';
                break;
            case 'Column_Stacked_100':
                chartType = 'StackingColumn100';
                break;
            case 'Scatter_Markers':
                chartType = 'Scatter';
                break;
            case 'Bubble':
                chartType = 'Bubble';
                break;
            case 'Doughnut':
            case 'Pie':
                chartType = 'Pie';
                break;
            case 'Line_Stacked_100':
            case 'Line_Markers_Stacked_100':
                chartType = 'StackingLine100';
                break;
            case 'Line':
            case 'Line_Markers':
                chartType = 'Line';
                break;
            case 'Line_Stacked':
            case 'Line_Markers_Stacked':
                chartType = 'StackingLine';
                break;
        }
        return chartType;
    };
    ChartComponent.prototype.chartSeries = function (series, data, type) {
        // json data
        var chartSeries = [];
        for (var i = 0; i < series.length; i++) {
            var seriesData = series[parseInt(i.toString(), 10)];
            var seriesValue = this.writeChartSeries(seriesData, data, type, i);
            chartSeries.push(seriesValue);
        }
        return chartSeries;
    };
    ChartComponent.prototype.writeChartSeries = function (seriesData, data, type, count) {
        var chartType = this.officeChartType(type);
        // let isAreaType: boolean = (type === 'Area_Stacked_100' || type === 'Area' || type === 'Area_Stacked');
        var seriesFormat = seriesData[dataPointsProperty[this.keywordIndex]][parseInt(count.toString(), 10)];
        var series = {};
        var fill;
        series.type = chartType;
        series.dataSource = data;
        series.name = seriesData[seriesNameProperty[this.keywordIndex]];
        series.xName = 'x';
        series.yName = 'y' + count;
        if (type === 'Bubble') {
            series.size = 'size' + count;
        }
        if (this.isPieType) {
            series.pointColorMapping = 'color';
            if (type === 'Doughnut') {
                series.innerRadius = '75%';
                series.radius = '70%';
            }
        }
        else {
            if (isNullOrUndefined(seriesFormat)) {
                seriesFormat = seriesData[dataPointsProperty[this.keywordIndex]][0];
            }
            fill = this.chartFormat(seriesFormat, chartType);
            series.fill = fill;
            if (!isNullOrUndefined(seriesFormat[fillProperty[this.keywordIndex]][foreColorProperty[this.keywordIndex]])) {
                series.pointColorMapping = 'color';
            }
        }
        if (type === 'Line_Markers' || type === 'Line_Markers_Stacked' || type === 'Line_Markers_Stacked_100') {
            series.marker = { visible: true };
        }
        if (seriesData.hasOwnProperty(dataLabelProperty[this.keywordIndex])) {
            if (this.isPieType) {
                series.dataLabel = this.parseDataLabels(seriesData[dataLabelProperty[this.keywordIndex]]);
            }
            else {
                var data_1 = {};
                data_1.dataLabel = this.parseDataLabels(seriesData[dataLabelProperty[this.keywordIndex]]);
                series.marker = data_1;
            }
        }
        if (seriesData.hasOwnProperty(errorBarProperty[this.keywordIndex])) {
            var errorBarData = seriesData[errorBarProperty[this.keywordIndex]];
            series.errorBar = this.parseErrorBars(errorBarData);
        }
        if (seriesData.hasOwnProperty(trendLinesProperty[this.keywordIndex])) {
            var trendLines = seriesData[trendLinesProperty[this.keywordIndex]];
            var trendLinesData = [];
            for (var count_1 = 0; count_1 < trendLines.length; count_1++) {
                var trendLine = trendLines[parseInt(count_1.toString(), 10)];
                var data_2 = {};
                data_2 = this.parseTrendLines(trendLine, fill);
                trendLinesData.push(data_2);
                series.trendlines = trendLinesData;
            }
        }
        return series;
    };
    ChartComponent.prototype.parseDataLabels = function (label) {
        var dataLabel = {};
        dataLabel.visible = true;
        if (this.isPieType) {
            if (label[positionProperty[this.keywordIndex]] === 'BestFit' || label[positionProperty[this.keywordIndex]] === 'Inside') {
                dataLabel.position = 'Inside';
            }
            else {
                dataLabel.position = 'Outside';
            }
        }
        else {
            dataLabel.position = this.dataLabelPosition(label[positionProperty[this.keywordIndex]]);
        }
        return dataLabel;
    };
    ChartComponent.prototype.parseErrorBars = function (errorBarData) {
        var errorBar = {};
        errorBar.visible = true;
        errorBar.type = errorBarData[typeProperty[this.keywordIndex]];
        errorBar.direction = errorBarData[directionProperty[this.keywordIndex]];
        if (errorBarData[endStyleProperty[this.keywordIndex]] === 'Cap') {
            errorBar.errorBarCap = { width: 1 };
        }
        else {
            errorBar.errorBarCap = { width: 0 };
        }
        return errorBar;
    };
    ChartComponent.prototype.parseTrendLines = function (trendLines, fill) {
        var trendLine = {};
        trendLine.type = trendLines[typeProperty[this.keywordIndex]];
        trendLine.name = trendLines[nameProperty[this.keywordIndex]];
        trendLine.forwardForecast = trendLines[forwardProperty[this.keywordIndex]];
        trendLine.backwardForecast = trendLines[backwardProperty[this.keywordIndex]];
        if (trendLines[interceptProperty[this.keywordIndex]] === 'NaN') {
            trendLine.intercept = 0;
        }
        else {
            trendLine.intercept = trendLines[interceptProperty[this.keywordIndex]];
        }
        trendLine.fill = fill;
        return trendLine;
    };
    ChartComponent.prototype.dataLabelPosition = function (position) {
        var labelPosition = 'Auto';
        switch (position) {
            case 'Outside':
                labelPosition = 'Outer';
                break;
            case 'Center':
                labelPosition = 'Middle';
                break;
            case 'Inside':
                labelPosition = 'Top';
                break;
            case 'OutsideBase':
                labelPosition = 'Bottom';
                break;
        }
        return labelPosition;
    };
    ChartComponent.prototype.chartFormat = function (dataPoints, type) {
        var format = dataPoints;
        if (type === 'Line' || type === 'StackingLine' || type === 'StackingLine100') {
            return format[lineProperty[this.keywordIndex]][rgbProperty[this.keywordIndex]];
        }
        else {
            return format[fillProperty[this.keywordIndex]][rgbProperty[this.keywordIndex]];
        }
    };
    ChartComponent.prototype.chartPrimaryXAxis = function (data, type) {
        // json data
        var primaryXAxis = {};
        if (data[chartTitleProperty[this.keywordIndex]]) {
            primaryXAxis.title = data[chartTitleProperty[this.keywordIndex]];
        }
        var categoryType = this.chartCategoryType(data[categoryTypeProperty[this.keywordIndex]]);
        primaryXAxis.valueType = categoryType;
        if (categoryType === 'DateTime') {
            primaryXAxis.intervalType = 'Days';
            primaryXAxis.labelFormat = 'M/d/yyyy';
            primaryXAxis.edgeLabelPlacement = 'Shift';
        }
        if (type === 'Scatter_Markers' || type === 'Bubble') {
            this.checkAndSetAxisValue(primaryXAxis, data);
        }
        if (this.parseBoolValue(data[hasMajorGridLinesProperty[this.keywordIndex]])) {
            primaryXAxis.majorGridLines = { width: 1 };
        }
        if (this.parseBoolValue(data[hasMinorGridLinesProperty[this.keywordIndex]])) {
            primaryXAxis.minorTicksPerInterval = 4;
        }
        return primaryXAxis;
    };
    ChartComponent.prototype.chartCategoryType = function (categoryType) {
        var type = '';
        switch (categoryType) {
            case 'Time':
                type = 'DateTime';
                break;
            case 'Automatic':
                type = 'Category';
                break;
        }
        return type;
    };
    ChartComponent.prototype.chartPrimaryYAxis = function (data) {
        // json data
        var primaryYAxis = {};
        if (data[chartTitleProperty[this.keywordIndex]]) {
            primaryYAxis.title = data[chartTitleProperty[this.keywordIndex]];
        }
        this.checkAndSetAxisValue(primaryYAxis, data);
        if (data[hasMajorGridLinesProperty[this.keywordIndex]]) {
            primaryYAxis.majorGridLines = { width: 1 };
        }
        if (data[hasMinorGridLinesProperty[this.keywordIndex]]) {
            primaryYAxis.minorTicksPerInterval = 4;
        }
        return primaryYAxis;
    };
    ChartComponent.prototype.checkAndSetAxisValue = function (primaryYAxis, data) {
        if (data[minimumValueProperty[this.keywordIndex]] !== 0) {
            primaryYAxis.minimum = data[minimumValueProperty[this.keywordIndex]];
        }
        if (data[maximumValueProperty[this.keywordIndex]] !== 0) {
            primaryYAxis.maximum = data[maximumValueProperty[this.keywordIndex]];
        }
        if (data[majorUnitProperty[this.keywordIndex]] !== 0) {
            var isAutoMajor = data[isAutoMajorProperty[this.keywordIndex]];
            if (isAutoMajor && this.parseBoolValue(isAutoMajor)) {
                var majorUnit = this.calculateMajorUnit(this.chartYValues);
                if (majorUnit < 10 && (this.chartType === "Bar_Stacked_100" || this.chartType === "Line_Stacked_100" || this.chartType === "Column_Stacked_100" || this.chartType === "Line_Markers_Stacked_100" || this.chartType === "Area_Stacked_100")) {
                    primaryYAxis.interval = 10;
                }
                else {
                    primaryYAxis.interval = majorUnit;
                }
            }
            else {
                primaryYAxis.interval = data[majorUnitProperty[this.keywordIndex]];
            }
        }
    };
    ChartComponent.prototype.calculateMajorUnit = function (chartYValues) {
        if (chartYValues && chartYValues.length > 0) {
            var maxValue = Number.MIN_VALUE;
            var minValue = Number.MAX_VALUE;
            for (var i = 0; i < chartYValues.length; i++) {
                var yValue = chartYValues[parseInt(i.toString(), 10)];
                if (yValue > maxValue) {
                    maxValue = yValue;
                }
                if (yValue < minValue) {
                    minValue = yValue;
                }
            }
            var range = maxValue - minValue;
            var intervalSize = range / 1.5;
            return this.roundToNiceNumber(intervalSize);
        }
        return 1;
    };
    ChartComponent.prototype.roundToNiceNumber = function (range) {
        var log10 = Math.floor(Math.log(range) / Math.log(10));
        var pow10 = Math.pow(10, log10);
        var frac = range / pow10;
        if (frac < 1.5) {
            return 1 * pow10;
        }
        else if (frac < 3) {
            return 2 * pow10;
        }
        else if (frac < 7) {
            return 5 * pow10;
        }
        else {
            return 10 * pow10;
        }
    };
    ChartComponent.prototype.chartData = function (chart, type) {
        // json data
        var data = chart[chartCategoryProperty[this.keywordIndex]];
        var chartData = [];
        for (var i = 0; i < data.length; i++) {
            var xData = data[parseInt(i.toString(), 10)];
            var plotValue = this.chartPlotData(xData, chart, type, i);
            chartData.push(plotValue);
        }
        return chartData;
    };
    ChartComponent.prototype.chartPlotData = function (data, chart, type, count) {
        var _this = this;
        var plotValue = {};
        var series = chart[chartSeriesProperty[this.keywordIndex]];
        if (chart[chartPrimaryCategoryAxisProperty[this.keywordIndex]][numberFormatProperty[this.keywordIndex]] === 'm/d/yyyy') {
            var date = data[categoryXNameProperty[this.keywordIndex]];
            var array = date.split('/');
            var month = Number(array[0]);
            var day = Number(array[1]);
            var year = Number(array[2]);
            plotValue.x = new Date(year, month - 1, day);
        }
        else {
            plotValue.x = data[categoryXNameProperty[this.keywordIndex]];
        }
        for (var j = 0; j < series.length; j++) {
            var yData = data[chartDataProperty[this.keywordIndex]][parseInt(j.toString(), 10)];
            if (!isNullOrUndefined(yData)) {
                var yValue = yData[yValueProperty[this.keywordIndex]];
                this.chartYValues.push(yValue);
                plotValue['y' + j] = yValue;
                if (type === 'Bubble') {
                    plotValue['size' + j] = yData[sizeProperty[this.keywordIndex]];
                }
            }
            if (chart[chartTypeProperty[this.keywordIndex]] === 'Pie' || chart[chartTypeProperty[this.keywordIndex]] === 'Doughnut' || chart[chartTypeProperty[this.keywordIndex]] === 'Column_Stacked') {
                var seriesData = series[parseInt(j.toString(), 10)];
                var seriesDataPoints = seriesData[dataPointsProperty[this.keywordIndex]].find(function (obj) {
                    return obj[idProperty[_this.keywordIndex]] === count;
                });
                if (!isNullOrUndefined(seriesDataPoints)) {
                    var color = this.chartFormat(seriesDataPoints, type);
                    if (chart[chartTypeProperty[this.keywordIndex]] !== 'Column_Stacked') {
                        plotValue.color = color;
                    }
                    else {
                        plotValue['color' + j] = color;
                    }
                }
                else {
                    if (seriesData[dataPointsProperty[this.keywordIndex]].length > 1 && seriesData[dataPointsProperty[this.keywordIndex]][parseInt(count.toString(), 10)][idProperty[this.keywordIndex]] === 0) {
                        seriesDataPoints = seriesData[dataPointsProperty[this.keywordIndex]][parseInt(count.toString(), 10)];
                        var color = this.chartFormat(seriesDataPoints, type);
                        if (chart[chartTypeProperty[this.keywordIndex]] !== 'Column_Stacked') {
                            plotValue.color = color;
                        }
                        else {
                            plotValue['color' + j] = color;
                        }
                    }
                    else {
                        if (!isNullOrUndefined(seriesData[seriesFormatProperty[this.keywordIndex]]) && !isNullOrUndefined(seriesData[seriesFormatProperty[this.keywordIndex]][fillProperty[this.keywordIndex]])) {
                            if (seriesData[seriesFormatProperty[this.keywordIndex]][fillProperty[this.keywordIndex]][rgbProperty[this.keywordIndex]].length > 7) {
                                var color = this.getColor(seriesData[seriesFormatProperty[this.keywordIndex]][fillProperty[this.keywordIndex]][rgbProperty[this.keywordIndex]]);
                                if (chart[chartTypeProperty[this.keywordIndex]] !== 'Column_Stacked') {
                                    plotValue.color = color;
                                }
                                else {
                                    plotValue['color' + j] = color;
                                }
                            }
                        }
                    }
                }
            }
        }
        return plotValue;
    };
    ChartComponent.prototype.getColor = function (color) {
        if (color.length > 0) {
            if (color[0] === '#') {
                if (color.length > 7) {
                    return color.substr(0, 7);
                }
            }
        }
        return color;
    };
    ChartComponent.prototype.parseChartLegend = function (data) {
        var legendSettings = {};
        var position = data[positionProperty[this.keywordIndex]];
        if (position === 'Corner') {
            position = 'right';
        }
        if (position) {
            legendSettings.visible = true;
            legendSettings.position = position.charAt(0).toUpperCase() + position.slice(1);
        }
        else {
            legendSettings.visible = false;
        }
        return legendSettings;
    };
    ChartComponent.prototype.parseBoolValue = function (value) {
        if (typeof value === 'string' || value instanceof String) {
            if (isNullOrUndefined(value) || value === 'f' || value === '0' || value === 'off' || value === 'false') {
                return false;
            }
            else {
                return true;
            }
        }
        else {
            if (value === 1 || value === true) {
                return true;
            }
            else {
                return false;
            }
        }
    };
    /**
     * Destroys the internal objects which is maintained.
     */
    ChartComponent.prototype.destroy = function () {
        if (this.chart) {
            this.chart.destroy();
        }
        this.chart = undefined;
        if (this.chartYValues) {
            this.chartYValues = [];
        }
        this.chartYValues = undefined;
    };
    return ChartComponent;
}());
export { ChartComponent };
