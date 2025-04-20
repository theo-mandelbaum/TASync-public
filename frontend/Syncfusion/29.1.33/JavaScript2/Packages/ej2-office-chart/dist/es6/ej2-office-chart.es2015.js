import { Chart, AreaSeries, StackingAreaSeries, BarSeries, PieSeries, StackingBarSeries, PolarSeries, ScatterSeries, BubbleSeries, RadarSeries, DateTime, ColumnSeries, StackingColumnSeries, LineSeries, StackingLineSeries, ErrorBar, Trendlines, SplineSeries, DataLabel, Category, Legend, Tooltip, Export, AccumulationChart, AccumulationLegend, AccumulationTooltip, AccumulationDataLabel } from '@syncfusion/ej2-charts';
import { SvgRenderer } from '@syncfusion/ej2-svg-base';
import { isNullOrUndefined, createElement } from '@syncfusion/ej2-base';

/* eslint-disable */
Chart.Inject(AreaSeries, StackingAreaSeries, BarSeries, PieSeries, StackingBarSeries, PolarSeries, ScatterSeries, BubbleSeries, RadarSeries, DateTime, ColumnSeries, StackingColumnSeries, LineSeries, StackingLineSeries, ErrorBar, Trendlines, SplineSeries, DataLabel, Category, Legend, Tooltip, Export);
AccumulationChart.Inject(AccumulationLegend, PieSeries, AccumulationTooltip, AccumulationDataLabel);
/**
 * Chart component is used to convert office charts to ej2-charts.
 */
class ChartComponent {
    constructor() {
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
    chartRender(chart, keywordIndex) {
        this.keywordIndex = !isNullOrUndefined(keywordIndex) ? keywordIndex : 0;
        this.chartType = chart[chartTypeProperty[this.keywordIndex]];
        this.isPieType = (this.chartType === 'Pie' || this.chartType === 'Doughnut');
        let chartData = this.chartData(chart, this.chartType);
        let chartModel = {
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
        for (let i = 0; i < this.chart.series.length; i++) {
            this.chart.series[parseInt(i.toString(), 10)].animation.enable = false;
        }
        this.chart.title = chart[chartTitleProperty[this.keywordIndex]];
        this.chart.legendSettings = this.parseChartLegend(chart[chartLegendProperty[this.keywordIndex]]);
    }
    /**
     * @private
     */
    convertChartToImage(chart, elementWidth, elementHeight) {
        let promise;
        return promise = new Promise((resolve, reject) => {
            let width = 0;
            let height = 0;
            const dataInfo = this.getControlsValue([chart], elementWidth, elementHeight);
            width = width ? width : dataInfo.width;
            height = height ? height : dataInfo.height;
            const element = createElement('canvas');
            const displayPixelRatio = Math.max(1, window.devicePixelRatio || 1);
            element.width = width * (displayPixelRatio);
            element.height = height * (displayPixelRatio);
            element.style.width = width + 'px';
            element.style.height = height + 'px';
            // tslint:disable-next-line:max-line-length
            const url = window.URL.createObjectURL(new Blob([(new XMLSerializer()).serializeToString(dataInfo.svg)], { type: 'image/svg+xml' }));
            const image = new Image();
            const canvasContext = element.getContext('2d');
            canvasContext.scale(displayPixelRatio, displayPixelRatio);
            image.onload = (() => {
                canvasContext.drawImage(image, 0, 0);
                window.URL.revokeObjectURL(url);
                const dataURL = element.toDataURL('image/png');
                resolve(dataURL);
            });
            image.onerror = (() => {
                reject('Invalid data');
            });
            image.src = url;
        });
    }
    getControlsValue(controls, elementWidth, elementHeight) {
        let width = 0;
        let height = 0;
        let content = '';
        const svgRenderer = new SvgRenderer('').createSvg({
            id: 'Image_Export',
            width: 200, height: 200
        });
        controls.map((control) => {
            if (control) {
                const svgElement = control.svgObject.cloneNode(true);
                const groupElement = control.renderer.createGroup({
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
    }
    officeChartType(type) {
        let chartType = '';
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
    }
    chartSeries(series, data, type) {
        // json data
        const chartSeries = [];
        for (let i = 0; i < series.length; i++) {
            const seriesData = series[parseInt(i.toString(), 10)];
            const seriesValue = this.writeChartSeries(seriesData, data, type, i);
            chartSeries.push(seriesValue);
        }
        return chartSeries;
    }
    writeChartSeries(seriesData, data, type, count) {
        const chartType = this.officeChartType(type);
        // let isAreaType: boolean = (type === 'Area_Stacked_100' || type === 'Area' || type === 'Area_Stacked');
        let seriesFormat = seriesData[dataPointsProperty[this.keywordIndex]][parseInt(count.toString(), 10)];
        const series = {};
        let fill;
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
                const data = {};
                data.dataLabel = this.parseDataLabels(seriesData[dataLabelProperty[this.keywordIndex]]);
                series.marker = data;
            }
        }
        if (seriesData.hasOwnProperty(errorBarProperty[this.keywordIndex])) {
            const errorBarData = seriesData[errorBarProperty[this.keywordIndex]];
            series.errorBar = this.parseErrorBars(errorBarData);
        }
        if (seriesData.hasOwnProperty(trendLinesProperty[this.keywordIndex])) {
            const trendLines = seriesData[trendLinesProperty[this.keywordIndex]];
            let trendLinesData = [];
            for (let count = 0; count < trendLines.length; count++) {
                let trendLine = trendLines[parseInt(count.toString(), 10)];
                let data = {};
                data = this.parseTrendLines(trendLine, fill);
                trendLinesData.push(data);
                series.trendlines = trendLinesData;
            }
        }
        return series;
    }
    parseDataLabels(label) {
        let dataLabel = {};
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
    }
    parseErrorBars(errorBarData) {
        let errorBar = {};
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
    }
    parseTrendLines(trendLines, fill) {
        let trendLine = {};
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
    }
    dataLabelPosition(position) {
        let labelPosition = 'Auto';
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
    }
    chartFormat(dataPoints, type) {
        let format = dataPoints;
        if (type === 'Line' || type === 'StackingLine' || type === 'StackingLine100') {
            return format[lineProperty[this.keywordIndex]][rgbProperty[this.keywordIndex]];
        }
        else {
            return format[fillProperty[this.keywordIndex]][rgbProperty[this.keywordIndex]];
        }
    }
    chartPrimaryXAxis(data, type) {
        // json data
        let primaryXAxis = {};
        if (data[chartTitleProperty[this.keywordIndex]]) {
            primaryXAxis.title = data[chartTitleProperty[this.keywordIndex]];
        }
        let categoryType = this.chartCategoryType(data[categoryTypeProperty[this.keywordIndex]]);
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
    }
    chartCategoryType(categoryType) {
        let type = '';
        switch (categoryType) {
            case 'Time':
                type = 'DateTime';
                break;
            case 'Automatic':
                type = 'Category';
                break;
        }
        return type;
    }
    chartPrimaryYAxis(data) {
        // json data
        let primaryYAxis = {};
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
    }
    checkAndSetAxisValue(primaryYAxis, data) {
        if (data[minimumValueProperty[this.keywordIndex]] !== 0) {
            primaryYAxis.minimum = data[minimumValueProperty[this.keywordIndex]];
        }
        if (data[maximumValueProperty[this.keywordIndex]] !== 0) {
            primaryYAxis.maximum = data[maximumValueProperty[this.keywordIndex]];
        }
        if (data[majorUnitProperty[this.keywordIndex]] !== 0) {
            const isAutoMajor = data[isAutoMajorProperty[this.keywordIndex]];
            if (isAutoMajor && this.parseBoolValue(isAutoMajor)) {
                const majorUnit = this.calculateMajorUnit(this.chartYValues);
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
    }
    calculateMajorUnit(chartYValues) {
        if (chartYValues && chartYValues.length > 0) {
            let maxValue = Number.MIN_VALUE;
            let minValue = Number.MAX_VALUE;
            for (let i = 0; i < chartYValues.length; i++) {
                const yValue = chartYValues[parseInt(i.toString(), 10)];
                if (yValue > maxValue) {
                    maxValue = yValue;
                }
                if (yValue < minValue) {
                    minValue = yValue;
                }
            }
            const range = maxValue - minValue;
            const intervalSize = range / 1.5;
            return this.roundToNiceNumber(intervalSize);
        }
        return 1;
    }
    roundToNiceNumber(range) {
        const log10 = Math.floor(Math.log(range) / Math.log(10));
        const pow10 = Math.pow(10, log10);
        const frac = range / pow10;
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
    }
    chartData(chart, type) {
        // json data
        const data = chart[chartCategoryProperty[this.keywordIndex]];
        const chartData = [];
        for (let i = 0; i < data.length; i++) {
            const xData = data[parseInt(i.toString(), 10)];
            const plotValue = this.chartPlotData(xData, chart, type, i);
            chartData.push(plotValue);
        }
        return chartData;
    }
    chartPlotData(data, chart, type, count) {
        let plotValue = {};
        let series = chart[chartSeriesProperty[this.keywordIndex]];
        if (chart[chartPrimaryCategoryAxisProperty[this.keywordIndex]][numberFormatProperty[this.keywordIndex]] === 'm/d/yyyy') {
            const date = data[categoryXNameProperty[this.keywordIndex]];
            const array = date.split('/');
            const month = Number(array[0]);
            const day = Number(array[1]);
            const year = Number(array[2]);
            plotValue.x = new Date(year, month - 1, day);
        }
        else {
            plotValue.x = data[categoryXNameProperty[this.keywordIndex]];
        }
        for (let j = 0; j < series.length; j++) {
            const yData = data[chartDataProperty[this.keywordIndex]][parseInt(j.toString(), 10)];
            if (!isNullOrUndefined(yData)) {
                const yValue = yData[yValueProperty[this.keywordIndex]];
                this.chartYValues.push(yValue);
                plotValue['y' + j] = yValue;
                if (type === 'Bubble') {
                    plotValue['size' + j] = yData[sizeProperty[this.keywordIndex]];
                }
            }
            if (chart[chartTypeProperty[this.keywordIndex]] === 'Pie' || chart[chartTypeProperty[this.keywordIndex]] === 'Doughnut' || chart[chartTypeProperty[this.keywordIndex]] === 'Column_Stacked') {
                let seriesData = series[parseInt(j.toString(), 10)];
                let seriesDataPoints = seriesData[dataPointsProperty[this.keywordIndex]].find((obj) => {
                    return obj[idProperty[this.keywordIndex]] === count;
                });
                if (!isNullOrUndefined(seriesDataPoints)) {
                    const color = this.chartFormat(seriesDataPoints, type);
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
                        const color = this.chartFormat(seriesDataPoints, type);
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
                                const color = this.getColor(seriesData[seriesFormatProperty[this.keywordIndex]][fillProperty[this.keywordIndex]][rgbProperty[this.keywordIndex]]);
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
    }
    getColor(color) {
        if (color.length > 0) {
            if (color[0] === '#') {
                if (color.length > 7) {
                    return color.substr(0, 7);
                }
            }
        }
        return color;
    }
    parseChartLegend(data) {
        const legendSettings = {};
        let position = data[positionProperty[this.keywordIndex]];
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
    }
    parseBoolValue(value) {
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
    }
    /**
     * Destroys the internal objects which is maintained.
     */
    destroy() {
        if (this.chart) {
            this.chart.destroy();
        }
        this.chart = undefined;
        if (this.chartYValues) {
            this.chartYValues = [];
        }
        this.chartYValues = undefined;
    }
}

const widthProperty = ['width', 'w'];
const heightProperty = ['height', 'h'];
const chartDataProperty = ['chartData', 'chd'];
const chartCategoryProperty = ['chartCategory', 'c'];
const chartSeriesProperty = ['chartSeries', 'cs'];
const chartLegendProperty = ['chartLegend', 'cl'];
const chartPrimaryCategoryAxisProperty = ['chartPrimaryCategoryAxis', 'cpca'];
const chartPrimaryValueAxisProperty = ['chartPrimaryValueAxis', 'cpva'];
const chartTitleProperty = ['chartTitle', 'ctt'];
const chartTypeProperty = ['chartType', 'ct'];
const trendLinesProperty = ['trendLines', 'tl'];
const dataPointsProperty = ['dataPoints', 'dp'];
const seriesNameProperty = ['seriesName', 'sn'];
const dataLabelProperty = ['dataLabel', 'sl'];
const errorBarProperty = ['errorBar', 'eb'];
const fillProperty = ['fill', 'f'];
const lineProperty = ['line', 'l'];
const rgbProperty = ['rgb', 'rgb'];
const idProperty = ['id', 'i'];
const foreColorProperty = ['foreColor', 'fc'];
const positionProperty = ['position', 'p'];
const typeProperty = ['type', 't'];
const nameProperty = ['name', 'n'];
const directionProperty = ['direction', 'dir'];
const endStyleProperty = ['endStyle', 'est'];
const forwardProperty = ['forward', 'fw'];
const backwardProperty = ['backward', 'bw'];
const interceptProperty = ['intercept', 'itr'];
const categoryTypeProperty = ['categoryType', 'ct'];
const hasMajorGridLinesProperty = ['hasMajorGridLines', 'hmajgl'];
const hasMinorGridLinesProperty = ['hasMinorGridLines', 'hmingl'];
const majorUnitProperty = ['majorUnit', 'maju'];
const isAutoMajorProperty = ['isAutoMajor', 'iam'];
const maximumValueProperty = ['maximumValue', 'maxv'];
const minimumValueProperty = ['minimumValue', 'minv'];
const categoryXNameProperty = ['categoryXName', 'cx'];
const numberFormatProperty = ['numberFormat', 'nf'];
const yValueProperty = ['yValue', 'y'];
const sizeProperty = ['size', 'sz'];
const seriesFormatProperty = ['seriesFormat', 'sf'];

export { ChartComponent, backwardProperty, categoryTypeProperty, categoryXNameProperty, chartCategoryProperty, chartDataProperty, chartLegendProperty, chartPrimaryCategoryAxisProperty, chartPrimaryValueAxisProperty, chartSeriesProperty, chartTitleProperty, chartTypeProperty, dataLabelProperty, dataPointsProperty, directionProperty, endStyleProperty, errorBarProperty, fillProperty, foreColorProperty, forwardProperty, hasMajorGridLinesProperty, hasMinorGridLinesProperty, heightProperty, idProperty, interceptProperty, isAutoMajorProperty, lineProperty, majorUnitProperty, maximumValueProperty, minimumValueProperty, nameProperty, numberFormatProperty, positionProperty, rgbProperty, seriesFormatProperty, seriesNameProperty, sizeProperty, trendLinesProperty, typeProperty, widthProperty, yValueProperty };
//# sourceMappingURL=ej2-office-chart.es2015.js.map
