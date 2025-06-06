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
import { firstToLowerCase, RectOption } from '../../common/utils/helper';
import { NiceInterval } from '../../chart/axis/axis-helper';
import { DataManager, DataUtil } from '@syncfusion/ej2-data';
import { DataPoint } from '../utils/helper';
import { animationMode, getValue, isNullOrUndefined } from '@syncfusion/ej2-base';
import { getSeriesColor } from '../../common/model/theme';
import { PathOption, Rect, measureText, Size } from '@syncfusion/ej2-svg-base';
import { Data } from '../../common/model/data';
/**
 * To render Chart series
 */
var RangeSeries = /** @class */ (function (_super) {
    __extends(RangeSeries, _super);
    function RangeSeries(range) {
        var _this = _super.call(this) || this;
        _this.dataSource = range.dataSource;
        _this.xName = range.xName;
        _this.yName = range.yName;
        _this.query = range.query;
        _this.xMin = Infinity;
        _this.xMax = -Infinity;
        _this.yMin = Infinity;
        _this.yMax = -Infinity;
        _this.labels = [];
        _this.indexLabels = {};
        return _this;
    }
    /**
     * To render light weight and data manager process.
     *
     * @param {RangeNavigator} control - RangeNavigator instance.
     * @returns {void}
     */
    RangeSeries.prototype.renderChart = function (control) {
        var _this = this;
        var dataSource;
        var query;
        this.seriesLength = 0;
        control.rangeSlider.points = [];
        if (control.series.length) {
            control.series.map(function (series) {
                dataSource = series.dataSource || control.dataSource;
                query = series.query || control.query;
                series.points = [];
                _this.processDataSource(dataSource, query, control, series);
            });
        }
        else {
            this.processDataSource(control.dataSource, control.query, control);
        }
    };
    RangeSeries.prototype.processDataSource = function (dataSource, query, control, series) {
        var _this = this;
        if (!(dataSource instanceof DataManager) && !isNullOrUndefined(dataSource) && isNullOrUndefined(query)) {
            this.dataManagerSuccess({ result: dataSource, count: dataSource.length }, control, series);
            return;
        }
        control.dataModule = new Data(dataSource, query);
        var dataManager = control.dataModule.getData(control.dataModule.generateQuery().requiresCount());
        dataManager.then(function (e) { return _this.dataManagerSuccess(e, control, series); });
    };
    /**
     * data manager process calculated here.
     *
     * @param {Object} e - The data manager result object.
     * @param {Object} e.result - The result of the data manager process.
     * @param {number} e.count - The count of items in the result.
     * @param {RangeNavigator} control - The RangeNavigator control.
     * @param {RangeNavigatorSeries} series - Optional parameter representing the series data.
     * @returns {void}
     */
    RangeSeries.prototype.dataManagerSuccess = function (e, control, series) {
        var viewData = e.count ? e.result : [];
        control.allowServerDataBinding = false;
        this.processJsonData(viewData, control, Object.keys(viewData).length, series);
        this.seriesLength += series ? 1 : this.seriesLength;
        if (!series || this.seriesLength === control.series.length) {
            this.processXAxis(control);
            this.calculateGroupingBounds(control);
            this.processYAxis(control);
            control.renderChart();
        }
    };
    /**
     * Process JSON data from data source.
     *
     * @param {Object[]} viewData - The data array to be processed.
     * @param {RangeNavigator} control - The RangeNavigator control.
     * @param {number} len - The length of the data array.
     * @param {RangeNavigatorSeries} series - The series data for the RangeNavigator control.
     * @returns {void}
     */
    RangeSeries.prototype.processJsonData = function (viewData, control, len, series) {
        var i = 0;
        var point;
        var xName = (series && series.xName) || control.xName;
        var yName = (series && series.yName) || control.yName;
        while (i < len) {
            point = new DataPoint(getValue(xName, viewData[i]), getValue(yName, viewData[i]));
            point.yValue = +point.y;
            if (control.valueType.indexOf('DateTime') > -1) {
                var dateParser = control.intl.getDateParser({ skeleton: 'full', type: 'dateTime' });
                var dateFormatter = control.intl.getDateFormat({ skeleton: 'full', type: 'dateTime' });
                point.x = new Date(DataUtil.parse.parseJson({ val: point.x }).val);
                point.xValue = Date.parse(dateParser(dateFormatter(point.x)));
                if (control.valueType === 'DateTimeCategory') {
                    if (this.indexLabels[point.xValue.toString()] === undefined) {
                        this.indexLabels[point.xValue.toString()] = this.labels.length;
                        this.labels.push(point.xValue.toString());
                    }
                    point.xValue = this.indexLabels[point.xValue];
                }
            }
            else {
                point.xValue = +point.x;
            }
            if (series) {
                series.points.push(point);
            }
            this.xMin = Math.min(this.xMin, point.xValue);
            this.yMin = Math.min(this.yMin, point.yValue);
            this.xMax = Math.max(this.xMax, point.xValue);
            this.yMax = Math.max(this.yMax, point.yValue);
            control.rangeSlider.points.push(point);
            i++;
        }
    };
    /**
     * Process x axis for range navigator.
     *
     * @private
     * @param {RangeNavigator} control - The RangeNavigator control.
     * @returns {void}
     */
    RangeSeries.prototype.processXAxis = function (control) {
        var axis = {
            minimum: control.minimum, maximum: control.maximum,
            interval: control.interval, valueType: control.valueType,
            isInversed: control.enableRtl, labelFormat: control.labelFormat,
            logBase: control.logBase, skeleton: control.skeleton, skeletonType: control.skeletonType
        };
        this.xAxis = axis;
        this.xAxis.intervalType = control.intervalType;
        this.xAxis.maximumLabels = 3;
        this.xAxis.skeleton = control.skeleton;
        this.xAxis.intervalDivs = [10, 5, 2, 1];
        this.xAxis.rect = control.bounds;
        this.xAxis.visibleLabels = [];
        this.xAxis.orientation = 'Horizontal';
        this.xAxis.labels = this.labels;
        this.xAxis.indexLabels = this.indexLabels;
        var axisModule = control[firstToLowerCase(control.valueType) + 'Module'];
        axisModule.min = this.xMin;
        axisModule.max = this.xMax;
        axisModule.getActualRange(this.xAxis, control.bounds);
        if (this.xAxis.valueType === 'Double' || this.xAxis.valueType === 'DateTime' || this.xAxis.valueType === 'DateTimeCategory') {
            axisModule.updateActualRange(this.xAxis, this.xAxis.actualRange.min, this.xAxis.actualRange.max, this.xAxis.actualRange.interval);
        }
        this.xAxis.actualRange.delta = this.xAxis.actualRange.max - this.xAxis.actualRange.min;
        this.xAxis.visibleRange = this.xAxis.actualRange;
        axisModule.calculateVisibleLabels(this.xAxis, control);
        if (this.xAxis.valueType === 'DateTimeCategory' && control.periodSelectorModule) {
            control.periodSelectorModule.isDatetimeCategory = true;
            control.periodSelectorModule.sortedData = this.labels.map(function (label) { return parseInt(label, 10); });
        }
    };
    /**
     * Process yAxis for range navigator.
     *
     * @param {RangeNavigator} control - RangeNavigator instance.
     * @private
     * @returns {void}
     */
    RangeSeries.prototype.processYAxis = function (control) {
        var axis = {
            majorGridLines: { width: 0 }, rangePadding: 'None',
            majorTickLines: { width: 0 }, labelStyle: { size: '0' },
            visible: false, valueType: 'Double', minimum: null, maximum: null,
            interval: null
        };
        this.yAxis = axis;
        this.yAxis.rect = control.bounds;
        this.yAxis.maximumLabels = 3;
        this.yAxis.intervalDivs = [10, 5, 2, 1];
        this.yAxis.orientation = 'Vertical';
        if (this.yMin === this.yMax) {
            this.yMax += 1;
            this.yMin -= 1;
        }
        control.doubleModule.min = this.yMin;
        control.doubleModule.max = this.yMax;
        control.doubleModule.getActualRange(this.yAxis, control.bounds);
        control.doubleModule.updateActualRange(this.yAxis, this.yAxis.actualRange.min, this.yAxis.actualRange.max, this.yAxis.actualRange.interval);
        this.yAxis.actualRange.delta = this.yAxis.actualRange.max - this.yAxis.actualRange.min;
        this.yAxis.visibleRange = this.yAxis.actualRange;
    };
    /**
     * Process Light weight control.
     *
     * @param {RangeNavigator} control - RangeNavigator instance.
     * @private
     * @returns {void}
     */
    RangeSeries.prototype.renderSeries = function (control) {
        var _this = this;
        this.chartGroup = control.renderer.createGroup({ id: control.element.id + '_chart' });
        var colors = getSeriesColor(control.theme);
        control.series.map(function (series, index) {
            var isSeriesVisible = control.stockChart ? control.stockChart.series[index].visible : true;
            if (isSeriesVisible) {
                series.xAxis = _this.xAxis;
                series.yAxis = _this.yAxis;
                series.chart = control;
                series.index = index;
                series.xAxis.isInversed = control.enableRtl;
                series.interior = series.fill || colors[index % colors.length];
                _this.createSeriesElement(control, series, index);
                if (series.xAxis.valueType === 'DateTimeCategory') {
                    for (var i = 0; i < series.points.length; i++) {
                        series.points[i].xValue =
                            _this.xAxis.labels.indexOf(Date.parse(series.points[i].x.toString()).toString());
                    }
                }
                if (control[firstToLowerCase(series.type) + 'SeriesModule']) {
                    control[firstToLowerCase(series.type) + 'SeriesModule'].render(series, _this.xAxis, _this.yAxis, false);
                }
                else {
                    control['line' + 'SeriesModule'].render(series, _this.xAxis, _this.yAxis, false);
                }
                _this.chartGroup.appendChild(series.seriesElement);
                if (((series.animation.enable && animationMode !== 'Disable') || animationMode === 'Enable') && control.animateSeries) {
                    if (control[firstToLowerCase(series.type) + 'SeriesModule']) {
                        control[firstToLowerCase(series.type) + 'SeriesModule'].doAnimation(series);
                    }
                    else {
                        //control['line' + 'SeriesModule'].doAnimation(series);
                    }
                }
            }
        });
    };
    /**
     * Append series elements in element.
     *
     * @param {RangeNavigator} control - The RangeNavigator control.
     * @returns {void}
     */
    RangeSeries.prototype.appendSeriesElements = function (control) {
        control.svgObject.appendChild(this.chartGroup);
        if (control.series.length) {
            this.drawSeriesBorder(control);
        }
    };
    RangeSeries.prototype.createSeriesElement = function (control, series, index) {
        var elementId = control.element.id;
        series.clipRect = new Rect(this.xAxis.rect.x, this.yAxis.rect.y, this.xAxis.rect.width, this.yAxis.rect.height);
        series.clipRectElement = control.renderer.drawClipPath(new RectOption(elementId + '_RangeSeriesClipRect_' + index, 'transparent', { width: 1, color: 'Gray' }, 1, {
            x: 0, y: 0,
            width: series.clipRect.width,
            height: series.clipRect.height
        }));
        series.seriesElement = control.renderer.createGroup({
            'id': elementId + 'SeriesGroup' + index,
            'transform': 'translate(' + series.clipRect.x + ',' + (series.clipRect.y) + ')',
            'clip-path': 'url(#' + elementId + '_RangeSeriesClipRect_' + index + ')'
        });
        series.seriesElement.appendChild(series.clipRectElement);
    };
    /**
     * Calculate grouping bounds for x axis.
     *
     * @private
     * @param {RangeNavigator} control - The RangeNavigator control.
     * @returns {void}
     */
    RangeSeries.prototype.calculateGroupingBounds = function (control) {
        var padding = control.margin.bottom;
        var labelHeight = measureText('string', control.labelStyle, control.themeStyle.axisLabelFont).height;
        var xMin = control.valueType === 'DateTimeCategory' ? parseInt(this.xAxis.labels[this.xMin], 10) : this.xMin;
        var xMax = control.valueType === 'DateTimeCategory' ? parseInt(this.xAxis.labels[this.xMax], 10) : this.xMax;
        this.calculateDateTimeNiceInterval(this.xAxis, new Size(control.bounds.width, control.bounds.height), xMin, xMax, false);
        if (control.enableGrouping && (control.valueType === 'DateTime' || control.valueType === 'DateTimeCategory')
            && (this.xAxis.actualIntervalType !== 'Years' || !control.series.length)) {
            control.bounds.height -= (control.labelPosition === 'Outside' || control.series.length === 0) ? padding + labelHeight :
                (labelHeight + 2 * padding);
        }
        if (!control.series.length) {
            control.bounds.y += control.bounds.height / 4;
            control.bounds.height = control.bounds.height / 2;
        }
    };
    RangeSeries.prototype.drawSeriesBorder = function (control) {
        var start = control.stockChart ? 'M' : 'L';
        var close = control.stockChart ? '' : 'Z';
        var options = new PathOption(control.element.id + '_SeriesBorder', 'transparent', control.navigatorBorder.width, control.navigatorBorder.color || (control.theme.indexOf('Dark') > -1 ? '#49454F' : '#DDDDDD'), 1, control.navigatorBorder.dashArray, ('M ' + (control.bounds.x) + ' ' + (control.bounds.y) +
            ' L ' + (control.bounds.x + control.bounds.width) + ' ' + control.bounds.y +
            start + (control.bounds.x + control.bounds.width) + ' ' + (control.bounds.y + control.bounds.height) +
            ' L ' + (control.bounds.x) + ' ' + (control.bounds.y + control.bounds.height) + close));
        var htmlObject = control.renderer.drawPath(options);
        control.svgObject.appendChild(htmlObject);
    };
    return RangeSeries;
}(NiceInterval));
export { RangeSeries };
