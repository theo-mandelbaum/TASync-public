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
import { Property, ChildProperty, Complex } from '@syncfusion/ej2-base';
import { isNullOrUndefined, extend } from '@syncfusion/ej2-base';
import { getVisiblePoints, StackValues } from '../../common/utils/helper';
import { firstToLowerCase } from '../../common/utils/helper';
import { Rect } from '@syncfusion/ej2-svg-base';
import { Border, Margin, Animation } from '../../common/model/base';
import { DataManager, DataUtil } from '@syncfusion/ej2-data';
import { seriesRender } from '../../common/model/constants';
import { setRange } from '../../common/utils/helper';
import { Chart3DTextFont } from '../model/chart3d-Interface';
import { getMinPointsDeltaValue } from '../utils/chart3dRender';
/**
 * Configures the data label in the series.
 */
var Chart3DDataLabelSettings = /** @class */ (function (_super) {
    __extends(Chart3DDataLabelSettings, _super);
    function Chart3DDataLabelSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property(false)
    ], Chart3DDataLabelSettings.prototype, "visible", void 0);
    __decorate([
        Property(null)
    ], Chart3DDataLabelSettings.prototype, "name", void 0);
    __decorate([
        Property('transparent')
    ], Chart3DDataLabelSettings.prototype, "fill", void 0);
    __decorate([
        Property(null)
    ], Chart3DDataLabelSettings.prototype, "format", void 0);
    __decorate([
        Property(1)
    ], Chart3DDataLabelSettings.prototype, "opacity", void 0);
    __decorate([
        Property(0)
    ], Chart3DDataLabelSettings.prototype, "angle", void 0);
    __decorate([
        Property(false)
    ], Chart3DDataLabelSettings.prototype, "enableRotation", void 0);
    __decorate([
        Property('Middle')
    ], Chart3DDataLabelSettings.prototype, "position", void 0);
    __decorate([
        Complex({ width: null, color: null }, Border)
    ], Chart3DDataLabelSettings.prototype, "border", void 0);
    __decorate([
        Complex({ left: 5, right: 5, top: 5, bottom: 5 }, Margin)
    ], Chart3DDataLabelSettings.prototype, "margin", void 0);
    __decorate([
        Complex({ size: null, color: null, fontStyle: null, fontWeight: null, fontFamily: null }, Chart3DTextFont)
    ], Chart3DDataLabelSettings.prototype, "font", void 0);
    __decorate([
        Property(null)
    ], Chart3DDataLabelSettings.prototype, "template", void 0);
    return Chart3DDataLabelSettings;
}(ChildProperty));
export { Chart3DDataLabelSettings };
/**
 * Configures the Empty Points of series
 */
var Chart3DEmptyPointSettings = /** @class */ (function (_super) {
    __extends(Chart3DEmptyPointSettings, _super);
    function Chart3DEmptyPointSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property(null)
    ], Chart3DEmptyPointSettings.prototype, "fill", void 0);
    __decorate([
        Property('Gap')
    ], Chart3DEmptyPointSettings.prototype, "mode", void 0);
    return Chart3DEmptyPointSettings;
}(ChildProperty));
export { Chart3DEmptyPointSettings };
/**
 * Points model for the series.
 *
 * @public
 */
var Chart3DPoint = /** @class */ (function () {
    function Chart3DPoint() {
        /** Point symbol location. */
        this.symbolLocations = null;
        /** Point percentage value. */
        this.percentage = null;
        /** To know the point is selected. */
        this.isSelect = false;
    }
    return Chart3DPoint;
}());
export { Chart3DPoint };
/**
 * Configures the series in charts.
 *
 * @public
 */
var Chart3DSeries = /** @class */ (function (_super) {
    __extends(Chart3DSeries, _super);
    function Chart3DSeries(parent, propName, defaultValue, isArray) {
        var _this = _super.call(this, parent, propName, defaultValue, isArray) || this;
        /** @private */
        _this.currentViewData = [];
        /** @private */
        _this.clipRect = new Rect(0, 0, 0, 0);
        _this.visibleSeriesCount = 0;
        /** @private */
        _this.category = 'Series';
        /** @private */
        _this.isRectSeries = false;
        /** @private */
        _this.all = false;
        return _this;
    }
    /**
     * This method is responsible for handling and processing JSON data.
     *
     * @returns {void}
     * @hidden
     */
    Chart3DSeries.prototype.processJsonData = function () {
        var i = 0;
        var point = new Chart3DPoint();
        var xName = this.xName;
        var textMappingName = this instanceof Chart3DSeries && this.dataLabel.name ?
            this.dataLabel.name : '';
        var len = (this.currentViewData || []).length;
        this.points = [];
        this.xMin = Infinity;
        this.xMax = -Infinity;
        this.yMin = Infinity;
        this.yMax = -Infinity;
        this.sizeMax = -Infinity;
        if (this.xAxis.valueType === 'Category') {
            while (i < len) {
                point = this.dataPoint(i, textMappingName, xName);
                this.pushCategoryData(point, i, point.x);
                this.pushData(point, i);
                this.setEmptyPoint(point, i);
                i++;
            }
        }
        else if (this.xAxis.valueType.indexOf('DateTime') > -1) {
            var option = {
                skeleton: 'full',
                type: 'dateTime'
            };
            var dateParser = this.chart.intl.getDateParser(option);
            var dateFormatter = this.chart.intl.getDateFormat(option);
            while (i < len) {
                point = this.dataPoint(i, textMappingName, xName);
                if (!isNullOrUndefined(point.x) && point.x !== '') {
                    point.x = new Date(DataUtil.parse.parseJson({ val: point.x }).val);
                    if (this.xAxis.valueType === 'DateTime') {
                        point.xValue = Date.parse(point.x.toString());
                    }
                    else {
                        this.pushCategoryData(point, i, Date.parse(dateParser(dateFormatter(point.x))).toString());
                    }
                    this.pushData(point, i);
                    this.setEmptyPoint(point, i);
                }
                else {
                    point.visible = false;
                }
                i++;
            }
        }
        else {
            while (i < len) {
                point = this.dataPoint(i, textMappingName, xName);
                point.xValue = point.x;
                this.pushData(point, i);
                this.setEmptyPoint(point, i);
                i++;
            }
        }
    };
    /**
     * Pushes data into a collection at a specified index.
     *
     * @param {Chart3DPoint} point - The Chart3DPoint object representing the data to be pushed.
     * @param {number} i - The index at which the data should be pushed.
     * @returns {void}
     */
    Chart3DSeries.prototype.pushData = function (point, i) {
        point.index = i;
        point.yValue = point.y;
        point.series = this;
        // To find the min, max for the axis range.
        this.xMin = Math.min(this.xMin, point.xValue);
        this.xMax = Math.max(this.xMax, point.xValue);
        this.xData.push(point.xValue);
    };
    /**
     * Creates and returns a Chart3DPoint object representing a data point at the specified index.
     *
     * @param {number} i - The index of the data point.
     * @param {string} textMappingName - The name of the property containing text information for the data point.
     * @param {string} xName - The name of the property containing X-axis information for the data point.
     * @returns {Chart3DPoint} - The Chart3DPoint object representing the data point.
     */
    Chart3DSeries.prototype.dataPoint = function (i, textMappingName, xName) {
        this.points[i] = new Chart3DPoint();
        var point = this.points[i];
        var currentViewData = this.currentViewData[i];
        var getObjectValueByMappingString = this.get3DObjectValue;
        point.x = getObjectValueByMappingString(xName, currentViewData);
        point.interior = getObjectValueByMappingString(this.pointColorMapping, currentViewData);
        if (this instanceof Chart3DSeries) {
            point.y = getObjectValueByMappingString(this.yName, currentViewData);
            point.size = getObjectValueByMappingString(this.size, currentViewData);
            point.text = getObjectValueByMappingString(textMappingName, currentViewData);
            point.tooltip = getObjectValueByMappingString(this.tooltipMappingName, currentViewData);
        }
        return point;
    };
    /**
     * Retrieves the value associated with a specified mapping name from a given data object.
     *
     * @param {string} mappingName - The mapping name used to retrieve the value from the data object.
     * @param {Object} data - The data object from which the value is retrieved.
     * @returns {Object} - The value associated with the specified mapping name in the data object.
     */
    Chart3DSeries.prototype.get3DObjectValue = function (mappingName, data) {
        return data[mappingName];
    };
    /**
     * Sets values for an empty data point at the specified index.
     *
     * @param {Chart3DPoint} point - The Chart3DPoint object representing the empty data point.
     * @param {number} i - The index of the empty data point.
     * @returns {void}
     */
    Chart3DSeries.prototype.setEmptyPoint = function (point, i) {
        if (!this.findVisibility(point)) {
            point.visible = true;
            return null;
        }
        point.isEmpty = true;
        var series = this instanceof Chart3DSeries && this;
        var mode = series.emptyPointSettings.mode;
        switch (mode) {
            case 'Zero':
                point.visible = true;
                point.y = point.yValue = this.yData[i] = 0;
                break;
            case 'Average':
                if (this instanceof Chart3DSeries) {
                    point.y = point.yValue = this.yData[i] = this.getAverage(this.yName, i);
                }
                point.visible = true;
                break;
            case 'Drop':
            case 'Gap':
                this.yData[i] = null;
                point.visible = false;
                break;
        }
    };
    /**
     * Determines the visibility status of a Chart3DPoint.
     *
     * @param {Chart3DPoint} point - The Chart3DPoint object for which visibility is determined.
     * @returns {boolean} - A boolean indicating the visibility status of the Chart3DPoint.
     */
    Chart3DSeries.prototype.findVisibility = function (point) {
        this.setXYMinMax(point.yValue);
        this.yData.push(point.yValue);
        return isNullOrUndefined(point.x) || (isNullOrUndefined(point.y) || isNaN(+point.y));
    };
    /**
     * Sets the minimum and maximum values for the X and Y dimensions based on the provided Y value.
     *
     * @param {number} yValue - The Y value used to set the minimum and maximum values for the X and Y dimensions.
     * @returns {void}
     */
    Chart3DSeries.prototype.setXYMinMax = function (yValue) {
        var isLogAxis = (this.yAxis.valueType === 'Logarithmic' || this.xAxis.valueType === 'Logarithmic');
        var isNegativeValue = yValue < 0 || this.yAxis.rangePadding === 'None';
        var seriesMinY;
        if (!setRange(this.yAxis)) {
            seriesMinY = ((isLogAxis ? (yValue) : isNegativeValue ? yValue : 0));
        }
        else {
            seriesMinY = yValue;
        }
        this.yMin = isLogAxis ?
            Math.min(this.yMin, (isNullOrUndefined(seriesMinY) || isNaN(seriesMinY) || (seriesMinY === 0) ||
                (seriesMinY.toString() === '0') || (seriesMinY.toString() === '')) ? this.yMin : seriesMinY) :
            Math.min(this.yMin, (isNullOrUndefined(seriesMinY) || isNaN(seriesMinY)) ? this.yMin : seriesMinY);
        this.yMax = Math.max(this.yMax, (isNullOrUndefined(yValue) || isNaN(yValue)) ? this.yMax : yValue);
    };
    /**
     * Pushes category data to the Chart3DPoint object at the specified index.
     *
     * @param {Chart3DPoint} point - The Chart3DPoint object to which category data is pushed.
     * @param {number} index - The index at which the category data is pushed.
     * @param {string} pointX - The X value of the category data to be pushed.
     * @returns {void}
     */
    Chart3DSeries.prototype.pushCategoryData = function (point, index, pointX) {
        if (this.chart.tooltip) {
            if (!this.visible) {
                return null;
            }
        }
        if (!this.xAxis.isIndexed) {
            if (this.xAxis.indexLabels[pointX] === undefined) {
                this.xAxis.indexLabels[pointX] = this.xAxis.labels.length;
                this.xAxis.labels.push(pointX);
            }
            point.xValue = this.xAxis.indexLabels[pointX];
        }
        else {
            if (this.xAxis.labels[index]) {
                this.xAxis.labels[index] += ', ' + pointX;
            }
            else {
                this.xAxis.labels.push(pointX);
            }
            // this.xAxis.labels[index as number] ? this.xAxis.labels[index as number] += ', ' + pointX :
            //     this.xAxis.labels.push(pointX);
            point.xValue = index;
        }
    };
    /**
     * Calculates the average value of a specified member in the data object.
     *
     * @param {string} member - The member for which the average is calculated.
     * @param {number} i - The index used for the calculation.
     * @param {Object} data - The data object from which the average is calculated. Defaults to the current view data.
     * @returns {number} - The calculated average value.
     */
    Chart3DSeries.prototype.getAverage = function (member, i, data) {
        if (data === void 0) { data = this.currentViewData; }
        var previous = data[i - 1] ? (data[i - 1][member] || 0) : 0;
        var next = data[i + 1] ? (data[i + 1][member] || 0) : 0;
        return (previous + next) / 2;
    };
    /**
     * Refreshes the data manager for the 3D chart.
     *
     * @param {Chart3D} chart - The 3D chart for which the data manager is refreshed.
     * @returns {void}
     */
    Chart3DSeries.prototype.refreshDataManager = function (chart) {
        var _this = this;
        this.chart = chart;
        var dataSource;
        var isAngular = 'isAngular';
        if (chart[isAngular]) {
            dataSource = Object.keys(this.dataSource).length ? this.dataSource : chart.dataSource;
        }
        else {
            dataSource = this.dataSource || chart.dataSource;
        }
        if (!(dataSource instanceof DataManager) && isNullOrUndefined(this.query)) {
            this.dataManagerSuccess({ result: dataSource, count: dataSource.length }, false);
            return;
        }
        var dataManager = this.dataModule.getData(this.dataModule.generateQuery().requiresCount());
        dataManager.then(function (e) { return _this.dataManagerSuccess(e); });
    };
    /**
     * Handles the success callback for the data manager operation.
     *
     * @param {Object} e - The success callback parameters containing the result and count.
     * @param {Object} e.result - The result object returned by the data manager operation.
     * @param {number} e.count - The count of items returned by the data manager operation.
     * @param {boolean} [isRemoteData=true] - Indicates whether the data is fetched remotely. Defaults to true.
     * @returns {void}
     */
    Chart3DSeries.prototype.dataManagerSuccess = function (e, isRemoteData) {
        if (isRemoteData === void 0) { isRemoteData = true; }
        this.currentViewData = e.count ? e.result : [];
        this.chart.allowServerDataBinding = false;
        if (this instanceof Chart3DSeries) {
            var argsData = {
                series: this, data: this.currentViewData, fill: this.interior
            };
            this.chart.trigger(seriesRender, argsData);
            this.interior = argsData.fill;
            this.currentViewData = argsData.data;
        }
        this.processJsonData();
        this.refreshChart(isRemoteData);
        this.currentViewData = null;
    };
    /**
     * Refreshes the chart, updating its data and appearance.
     *
     * @param {boolean} isRemoteData - Indicates whether the data is fetched remotely.
     * @returns {void}
     */
    Chart3DSeries.prototype.refreshChart = function (isRemoteData) {
        var chart = this.chart;
        if (this instanceof Chart3DSeries) {
            chart.visibleSeriesCount += isRemoteData ? 1 : 0;
        }
        if (chart.visibleSeries.length === (chart.visibleSeriesCount)) {
            chart.refreshBound();
            chart.trigger('loaded', { chart: chart });
        }
        if (this instanceof Chart3DSeries) {
            chart.visibleSeriesCount += isRemoteData ? 0 : 1;
        }
    };
    /**
     * Refreshes the axis labels in the chart.
     * This method is responsible for updating and rendering the axis labels based on the chart's current state.
     *
     * @returns {void}
     * @public
     */
    Chart3DSeries.prototype.refreshAxisLabel = function () {
        if (this.xAxis.valueType !== 'Category') {
            return null;
        }
        this.xAxis.labels = [];
        this.xAxis.indexLabels = {};
        for (var _i = 0, _a = this.xAxis.series; _i < _a.length; _i++) {
            var item = _a[_i];
            if (item.visible) {
                item.xMin = Infinity;
                item.xMax = -Infinity;
                for (var _b = 0, _c = item.points; _b < _c.length; _b++) {
                    var point = _c[_b];
                    item.pushCategoryData(point, point.index, point.x);
                    item.xMin = Math.min(item.xMin, point.xValue);
                    item.xMax = Math.max(item.xMax, point.xValue);
                }
            }
        }
    };
    /**
     * Finds the collection of Chart3DSeries associated with the given Chart3DColumn and Chart3DRow in the 3D chart.
     *
     * @param {Chart3DColumn} column - The Chart3DColumn object representing the column in the 3D chart.
     * @param {Chart3DRow} row - The Chart3DRow object representing the row in the 3D chart.
     * @param {boolean} isStack - Indicates whether the series should be stacked.
     * @returns {Chart3DSeries[]} - An array of Chart3DSeries associated with the specified column and row.
     * @public
     */
    Chart3DSeries.prototype.findSeriesCollection = function (column, row, isStack) {
        var seriesCollection = [];
        for (var _i = 0, _a = row.axes; _i < _a.length; _i++) {
            var rowAxis = _a[_i];
            for (var _b = 0, _c = rowAxis.series; _b < _c.length; _b++) {
                var rowSeries = _c[_b];
                for (var _d = 0, _e = column.axes; _d < _e.length; _d++) {
                    var axis = _e[_d];
                    for (var _f = 0, _g = axis.series; _f < _g.length; _f++) {
                        var series = _g[_f];
                        if (series === rowSeries && series.visible && this.rectSeriesInChart(series, isStack)) {
                            seriesCollection.push(series);
                        }
                    }
                }
            }
        }
        return seriesCollection;
    };
    /**
     * Checks whether the given Chart3DSeries with rectangular data is present in the 3D chart.
     *
     * @param {Chart3DSeries} series - The Chart3DSeries object to check for presence in the chart.
     * @param {boolean} isStack - Indicates whether the series should be stacked.
     * @returns {boolean} - A boolean value indicating whether the series is present in the 3D chart.
     * @private
     */
    Chart3DSeries.prototype.rectSeriesInChart = function (series, isStack) {
        var type = (series.type).toLowerCase();
        return type.indexOf('column') !== -1 || type.indexOf('bar') !== -1 || isStack;
    };
    /**
     * Calculates the stacked values for the Chart3DSeries based on stacking type and chart context.
     *
     * @param {boolean} isStacking100 - Indicates whether the stacking type is 100% stacking.
     * @param {Chart3D} chart - The parent Chart3D object providing context for the calculation.
     * @returns {void}
     * @private
     */
    Chart3DSeries.prototype.calculateStackedValue = function (isStacking100, chart) {
        for (var _i = 0, _a = chart.columns; _i < _a.length; _i++) {
            var columnItem = _a[_i];
            for (var _b = 0, _c = chart.rows; _b < _c.length; _b++) {
                var item = _c[_b];
                this.calculateStackingValues(this.findSeriesCollection(columnItem, item, true), isStacking100);
            }
        }
    };
    /**
     * Calculates stacking values for the given Chart3DSeries collection based on the stacking type.
     *
     * @param {Chart3DSeries[]} seriesCollection - The collection of Chart3DSeries to calculate stacking values for.
     * @param {boolean} isStacking100 - Indicates whether the stacking type is 100% stacking.
     * @returns {void}
     * @private
     */
    Chart3DSeries.prototype.calculateStackingValues = function (seriesCollection, isStacking100) {
        var startValues;
        var endValues;
        var yValues = [];
        var lastPositive = [];
        var lastNegative = [];
        var stackingGroup;
        var lastValue;
        var value;
        var frequencies = [];
        if (isStacking100) {
            frequencies = this.findFrequencies(seriesCollection);
        }
        var groupingValues = [];
        var visiblePoints = [];
        for (var i = 0; i < seriesCollection.length; i++) {
            var series = seriesCollection[i];
            if (!groupingValues[series.stackingGroup]) {
                groupingValues[series.stackingGroup] = [];
                groupingValues[series.stackingGroup].push(series);
            }
            else if (groupingValues[series.stackingGroup] !== undefined) {
                groupingValues[series.stackingGroup].push(series);
            }
        }
        var keys = Object.keys(groupingValues);
        for (var k = 0; k < keys.length; k++) {
            var stackingSeies = [];
            var stackedValues = [];
            var seriesCollection_2 = groupingValues[keys[k]];
            for (var _i = 0, seriesCollection_1 = seriesCollection_2; _i < seriesCollection_1.length; _i++) {
                var series = seriesCollection_1[_i];
                if (series.type.indexOf('Stacking') !== -1) {
                    stackingGroup = series.stackingGroup;
                    if (!lastPositive[stackingGroup]) {
                        lastPositive[stackingGroup] = [];
                        lastNegative[stackingGroup] = [];
                    }
                    yValues = series.yData;
                    startValues = [];
                    endValues = [];
                    stackingSeies.push(series);
                    visiblePoints = getVisiblePoints(series);
                    for (var j = 0, pointsLength = visiblePoints.length; j < pointsLength; j++) {
                        lastValue = 0;
                        value = +yValues[j]; // Fix for chart not rendering while y value is given as string issue
                        if (lastPositive[stackingGroup][visiblePoints[j].xValue] === undefined) {
                            lastPositive[stackingGroup][visiblePoints[j].xValue] = 0;
                        }
                        if (lastNegative[stackingGroup][visiblePoints[j].xValue] === undefined) {
                            lastNegative[stackingGroup][visiblePoints[j].xValue] = 0;
                        }
                        if (isStacking100) {
                            value = value / frequencies[stackingGroup][visiblePoints[j].xValue] * 100;
                            value = !isNaN(value) ? value : 0;
                            visiblePoints[j].percentage = +(value.toFixed(2));
                        }
                        else {
                            stackedValues[j] = stackedValues[j] ?
                                stackedValues[j] + Math.abs(value) : Math.abs(value);
                        }
                        if (value >= 0) {
                            lastValue = lastPositive[stackingGroup][visiblePoints[j].xValue];
                            lastPositive[stackingGroup][visiblePoints[j].xValue] += value;
                        }
                        else {
                            lastValue = lastNegative[stackingGroup][visiblePoints[j].xValue];
                            lastNegative[stackingGroup][visiblePoints[j].xValue] += value;
                        }
                        startValues.push(lastValue);
                        endValues.push(value + lastValue);
                        if (isStacking100 && (endValues[j] > 100)) {
                            endValues[j] = 100;
                        }
                    }
                    series.stackedValues = new StackValues(startValues, endValues);
                    var isLogAxis = series.yAxis.valueType === 'Logarithmic';
                    var isColumnBarType = (series.type.indexOf('Column') !== -1 || series.type.indexOf('Bar') !== -1);
                    series.yMin = isLogAxis && isColumnBarType && series.yMin < 1 ? series.yMin :
                        Math.min.apply(0, isStacking100 ? startValues : endValues);
                    series.yMax = Math.max.apply(0, endValues);
                    if (series.yMin > Math.min.apply(0, endValues)) {
                        series.yMin = (isStacking100) ? -100 :
                            isLogAxis && isColumnBarType && series.yMin < 1 ? series.yMin : Math.min.apply(0, endValues);
                    }
                    if (series.yMax < Math.max.apply(0, startValues)) {
                        series.yMax = 0;
                    }
                }
            }
            this.findPercentageOfStacking(stackingSeies, stackedValues, isStacking100);
        }
    };
    /**
     * Finds the percentage of stacking for the given Chart3DSeries collection and values.
     *
     * @param {Chart3DSeries[]} stackingSeries - The collection of Chart3DSeries to find the percentage of stacking for.
     * @param {number[]} values - The values to calculate the percentage of stacking.
     * @param {boolean} isStacking100 - Indicates whether the stacking type is 100% stacking.
     * @returns {void}
     */
    Chart3DSeries.prototype.findPercentageOfStacking = function (stackingSeries, values, isStacking100) {
        for (var _i = 0, stackingSeries_1 = stackingSeries; _i < stackingSeries_1.length; _i++) {
            var item = stackingSeries_1[_i];
            if (isStacking100) {
                return null;
            }
            for (var _a = 0, _b = getVisiblePoints(item); _a < _b.length; _a++) {
                var point = _b[_a];
                point.percentage = Math.abs(+(point.y / values[point.index] * 100).toFixed(2));
            }
        }
    };
    /**
     * Finds the frequencies for the given Chart3DSeries collection.
     *
     * @param {Chart3DSeries[]} seriesCollection - The collection of Chart3DSeries to find frequencies for.
     * @returns {number[]} An array of frequencies for each series in the collection.
     * @private
     */
    Chart3DSeries.prototype.findFrequencies = function (seriesCollection) {
        var frequencies = [];
        var stackingGroup;
        var visiblePoints = [];
        for (var _i = 0, seriesCollection_3 = seriesCollection; _i < seriesCollection_3.length; _i++) {
            var series = seriesCollection_3[_i];
            series.yAxis.isStack100 = series.type.indexOf('100') !== -1 ? true : false;
            visiblePoints = this.getVisiblePoints();
            if (series.type.indexOf('Stacking') !== -1) {
                stackingGroup = series.stackingGroup;
                if (!frequencies[stackingGroup]) {
                    frequencies[stackingGroup] = [];
                }
                for (var j = 0, pointsLength = visiblePoints.length; j < pointsLength; j++) {
                    if (frequencies[stackingGroup][visiblePoints[j].xValue] === undefined) {
                        frequencies[stackingGroup][visiblePoints[j].xValue] = 0;
                    }
                    if (series.yData[j] > 0) {
                        frequencies[stackingGroup][visiblePoints[j].xValue] += series.yData[j];
                    }
                    else {
                        frequencies[stackingGroup][visiblePoints[j].xValue] -= series.yData[j];
                    }
                }
            }
        }
        return frequencies;
    };
    /**
     * Renders the Chart3DSeries on the given 3D chart.
     *
     * @param {Chart3D} chart - The 3D chart on which to render the series.
     * @returns {void}
     * @private
     */
    Chart3DSeries.prototype.renderSeries = function (chart) {
        var seriesType = firstToLowerCase(this.type);
        seriesType = seriesType.replace('100', '');
        if (chart[seriesType + 'Series3DModule']) {
            this.visiblePoints = this.getVisiblePoints();
            chart[seriesType + 'Series3DModule'].draw(this, chart);
            if (this.dataLabel.visible && this.visible) {
                chart.dataLabel3DModule.render(this, this.chart, this.dataLabel);
            }
        }
    };
    /**
     * Retrieves the visible data points for the Chart3DSeries.
     * The visibility of points may be influenced by factors such as data filtering or chart settings.
     *
     * @returns {Chart3DPoint[]} An array of Chart3DPoint objects representing the visible data points.
     * @private
     */
    Chart3DSeries.prototype.getVisiblePoints = function () {
        var points = extend([], this.points, null, true);
        var tempPoints = [];
        var tempPoint;
        var pointIndex = 0;
        for (var i = 0; i < points.length; i++) {
            tempPoint = points[i];
            if (isNullOrUndefined(tempPoint.x)) {
                continue;
            }
            else {
                tempPoint.index = pointIndex++;
                tempPoints.push(tempPoint);
            }
        }
        return tempPoints;
    };
    /**
     * Sets the color for a specific Chart3DPoint in the series.
     * This method allows you to customize the color of an individual data point.
     *
     * @param {Chart3DPoint} point - The Chart3DPoint for which to set the color.
     * @param {string} color - The color value to be applied to the data point.
     * @returns {string} The updated color value after applying any modifications or validations.
     * @private
     */
    Chart3DSeries.prototype.setPointColor = function (point, color) {
        color = point.interior || color;
        return point.isEmpty ? (this.emptyPointSettings.fill || color) : color;
    };
    /**
     * Gets the Y values from an array of Chart3DPoint objects.
     *
     * @param {Chart3DPoint[]} points - An array of Chart3DPoint objects.
     * @returns {number[]} An array containing the Y values extracted from the provided data points.
     * @private
     */
    Chart3DSeries.prototype.getYValues = function (points) {
        var values = [];
        var length = points.length;
        for (var i = 0; i < length; i++) {
            values.push(points[i].yValue);
        }
        return values;
    };
    /**
     * Gets the X values from an array of Chart3DPoint objects.
     * This method extracts the X values from a collection of data points.
     *
     * @param {Chart3DPoint[]} points - An array of Chart3DPoint objects.
     * @returns {number[]} An array containing the X values extracted from the provided data points.
     * @private
     */
    Chart3DSeries.prototype.getXValues = function (points) {
        var values = [];
        var length = points.length;
        for (var i = 0; i < length; i++) {
            values.push(points[i].xValue);
        }
        return values;
    };
    /**
     * Gets the segment depth information for a Chart3DSeries.
     * This method retrieves the depth information for the segments of a Chart3DSeries.
     *
     * @param {Chart3DSeries} series - The Chart3DSeries for which segment depth is obtained.
     * @returns {Chart3DDepthInfoType} The depth information for the segments of the specified series.
     * @private
     */
    Chart3DSeries.prototype.getSegmentDepth = function (series) {
        var actualDepth = this.chart.depth;
        var start;
        var end;
        if (this.chart.enableSideBySidePlacement) {
            var space = actualDepth / 4;
            start = space;
            end = space * (series.columnFacet === 'Rectangle' ? 2.5 : 3);
        }
        else {
            var index = series.position - 1;
            var count = series.rectCount;
            var space = actualDepth / ((count * 2) + count + 1);
            start = space + (space * index * 3);
            end = start + space * (series.columnFacet === 'Rectangle' ? 1.5 : 2);
        }
        return { start: start, end: end, delta: end - start };
    };
    /**
     * Calculates the side-by-side positions for segments in a Chart3DSeries.
     * This method determines the positions of segments when they are arranged side-by-side.
     *
     * @param {Chart3DSeries} series - The Chart3DSeries for which side-by-side positions are calculated.
     * @returns {void}
     * @private
     */
    Chart3DSeries.prototype.getSideBySidePositions = function (series) {
        var chart = series.chart;
        for (var _i = 0, _a = chart.columns; _i < _a.length; _i++) {
            var columnItem = _a[_i];
            for (var _b = 0, _c = chart.rows; _b < _c.length; _b++) {
                var item = _c[_b];
                this.findRectPosition(series.findSeriesCollection(columnItem, item, false));
            }
        }
    };
    /**
     * Finds the position of rectangles for a collection of Chart3DSeries.
     * This method determines the position of rectangles based on the given series collection.
     *
     * @param {Chart3DSeries[]} seriesCollection - The collection of Chart3DSeries for which rectangle positions are determined.
     * @returns {void}
     * @private
     */
    Chart3DSeries.prototype.findRectPosition = function (seriesCollection) {
        var groupingValues = [];
        var vSeries = { rectCount: 0, position: null };
        for (var i = 0; i < seriesCollection.length; i++) {
            var value = seriesCollection[i];
            if (value.type.indexOf('Stacking') !== -1 || value.groupName !== '') {
                var groupName = value.type.indexOf('Stacking') !== -1 ? value.stackingGroup : value.type + value.groupName;
                if (groupName) {
                    if (groupingValues[groupName] === undefined) {
                        value.position = vSeries.rectCount;
                        groupingValues[groupName] = vSeries.rectCount++;
                    }
                    else {
                        value.position = groupingValues[groupName];
                    }
                }
                else {
                    if (vSeries.position === null) {
                        vSeries.rectCount++;
                        value.position = vSeries.rectCount;
                        vSeries.position = vSeries.rectCount;
                    }
                    else {
                        value.position = vSeries.position;
                    }
                }
            }
            else {
                vSeries.rectCount++;
                value.position = vSeries.rectCount;
            }
        }
        for (var i = 0; i < seriesCollection.length; i++) {
            var value = seriesCollection[i];
            value.rectCount = vSeries.rectCount;
        }
    };
    /**
     * Gets a range of values between the specified start and end points.
     * This method returns a Chart3DRangeValues object representing the range of values between the given start and end points.
     *
     * @param {number} start - The starting point of the range.
     * @param {number} end - The ending point of the range.
     * @returns {Chart3DRangeValues} - An object representing the range of values between the start and end points.
     */
    Chart3DSeries.prototype.getDoubleRange = function (start, end) {
        var mstart;
        var mend;
        if (start > end) {
            mstart = end;
            mend = start;
        }
        else {
            mstart = start;
            mend = end;
        }
        var mdelta = mend - mstart;
        var mmedian = (mstart + mend) / 2;
        var misEmpty = isNaN(mstart) || isNaN(mend);
        return { start: mstart, end: mend, delta: mdelta, median: mmedian, isEmpty: misEmpty };
    };
    /**
     * Sets the style options for the specified Chart3DSeries.
     * This method applies the style options to customize the appearance of the specified series.
     *
     * @param {Chart3DSeries} series - The Chart3DSeries for which the style options should be set.
     * @returns {Chart3DStyleOptions} - An object representing the style options applied to the series.
     */
    Chart3DSeries.prototype.setStyle = function (series) {
        var options = {
            interior: series.interior,
            opacity: series.opacity,
            dashArray: ''
        };
        return options;
    };
    /**
     * Gets the side-by-side positioning information for the specified Chart3DSeries.
     * This method calculates and returns the range values that define the position of the series in a side-by-side arrangement.
     *
     * @param {Chart3DSeries} series - The Chart3DSeries for which side-by-side positioning information is needed.
     * @returns {Chart3DRangeValues} - An object representing the range values that define the position of the series in a side-by-side arrangement.
     */
    Chart3DSeries.prototype.getSideBySideInfo = function (series) {
        this.chart.currentSeries = series;
        var minimumPointDelta = getMinPointsDeltaValue(series.xAxis, this.chart.visibleSeries);
        var spacing = series.columnSpacing;
        var columnWidth = (series.columnWidth === null || isNaN(+series.columnWidth)) ? 0.7 : Math.min(series.columnWidth, 1);
        this.getSideBySidePositions(series);
        var pos = series.position;
        var all = series.rectCount;
        var width = minimumPointDelta * columnWidth;
        var loc = (pos - (series.stackingGroup === '' ? 1 : 0)) / all - 0.5;
        var range = this.getDoubleRange(loc, loc + (1 / all));
        if (!this.chart.enableSideBySidePlacement) {
            return this.getDoubleRange(-width / 2, width / 2);
        }
        if (!range.isEmpty) {
            range = this.getDoubleRange(range.start * width, range.end * width);
            var radius = spacing * range.delta;
            range = this.getDoubleRange(range.start + radius / 2, range.end - radius / 2);
        }
        return range;
    };
    __decorate([
        Property('')
    ], Chart3DSeries.prototype, "xName", void 0);
    __decorate([
        Property('')
    ], Chart3DSeries.prototype, "pointColorMapping", void 0);
    __decorate([
        Property(true)
    ], Chart3DSeries.prototype, "visible", void 0);
    __decorate([
        Property(null)
    ], Chart3DSeries.prototype, "xAxisName", void 0);
    __decorate([
        Property(null)
    ], Chart3DSeries.prototype, "yAxisName", void 0);
    __decorate([
        Complex({ duration: 2000 }, Animation)
    ], Chart3DSeries.prototype, "animation", void 0);
    __decorate([
        Property(null)
    ], Chart3DSeries.prototype, "fill", void 0);
    __decorate([
        Property('')
    ], Chart3DSeries.prototype, "dataSource", void 0);
    __decorate([
        Property()
    ], Chart3DSeries.prototype, "query", void 0);
    __decorate([
        Complex({}, Chart3DDataLabelSettings)
    ], Chart3DSeries.prototype, "dataLabel", void 0);
    __decorate([
        Property('')
    ], Chart3DSeries.prototype, "name", void 0);
    __decorate([
        Property('')
    ], Chart3DSeries.prototype, "yName", void 0);
    __decorate([
        Property('')
    ], Chart3DSeries.prototype, "size", void 0);
    __decorate([
        Property('')
    ], Chart3DSeries.prototype, "stackingGroup", void 0);
    __decorate([
        Property(1)
    ], Chart3DSeries.prototype, "opacity", void 0);
    __decorate([
        Property('')
    ], Chart3DSeries.prototype, "groupName", void 0);
    __decorate([
        Property('Column')
    ], Chart3DSeries.prototype, "type", void 0);
    __decorate([
        Property(true)
    ], Chart3DSeries.prototype, "enableTooltip", void 0);
    __decorate([
        Property('')
    ], Chart3DSeries.prototype, "tooltipFormat", void 0);
    __decorate([
        Property('')
    ], Chart3DSeries.prototype, "tooltipMappingName", void 0);
    __decorate([
        Property('SeriesType')
    ], Chart3DSeries.prototype, "legendShape", void 0);
    __decorate([
        Property('')
    ], Chart3DSeries.prototype, "legendImageUrl", void 0);
    __decorate([
        Complex(null, Chart3DEmptyPointSettings)
    ], Chart3DSeries.prototype, "emptyPointSettings", void 0);
    __decorate([
        Property(null)
    ], Chart3DSeries.prototype, "columnWidth", void 0);
    __decorate([
        Property('Rectangle')
    ], Chart3DSeries.prototype, "columnFacet", void 0);
    __decorate([
        Property(0.1)
    ], Chart3DSeries.prototype, "columnSpacing", void 0);
    return Chart3DSeries;
}(ChildProperty));
export { Chart3DSeries };
