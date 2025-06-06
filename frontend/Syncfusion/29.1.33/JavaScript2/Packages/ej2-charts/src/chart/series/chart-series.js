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
import { Property, ChildProperty, Complex, Collection, getValue, animationMode } from '@syncfusion/ej2-base';
import { isNullOrUndefined, extend } from '@syncfusion/ej2-base';
import { StackValues, RectOption, appendChildElement, appendClipElement, getElement } from '../../common/utils/helper';
import { firstToLowerCase, CircleOption, getColorByValue } from '../../common/utils/helper';
import { Rect, Size } from '@syncfusion/ej2-svg-base';
import { Border, Font, Margin, Animation, DragSettings, EmptyPointSettings, Connector, CornerRadius, Accessibility, SeriesAccessibility } from '../../common/model/base';
import { DataManager, DataUtil } from '@syncfusion/ej2-data';
import { Offset } from '../../common/model/base';
import { seriesRender } from '../../common/model/constants';
import { getVisiblePoints, setRange, findClipRect } from '../../common/utils/helper';
import { Browser } from '@syncfusion/ej2-base';
/**
 * This class provides options to customize the appearance and behavior of data labels within a series.
 */
var DataLabelSettings = /** @class */ (function (_super) {
    __extends(DataLabelSettings, _super);
    function DataLabelSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property(false)
    ], DataLabelSettings.prototype, "visible", void 0);
    __decorate([
        Property(true)
    ], DataLabelSettings.prototype, "showZero", void 0);
    __decorate([
        Property(null)
    ], DataLabelSettings.prototype, "name", void 0);
    __decorate([
        Property('transparent')
    ], DataLabelSettings.prototype, "fill", void 0);
    __decorate([
        Property(null)
    ], DataLabelSettings.prototype, "format", void 0);
    __decorate([
        Property(1)
    ], DataLabelSettings.prototype, "opacity", void 0);
    __decorate([
        Property(0)
    ], DataLabelSettings.prototype, "angle", void 0);
    __decorate([
        Property(false)
    ], DataLabelSettings.prototype, "enableRotation", void 0);
    __decorate([
        Property('Auto')
    ], DataLabelSettings.prototype, "position", void 0);
    __decorate([
        Property(5)
    ], DataLabelSettings.prototype, "rx", void 0);
    __decorate([
        Property(5)
    ], DataLabelSettings.prototype, "ry", void 0);
    __decorate([
        Property('Center')
    ], DataLabelSettings.prototype, "alignment", void 0);
    __decorate([
        Complex({ width: null, color: null }, Border)
    ], DataLabelSettings.prototype, "border", void 0);
    __decorate([
        Complex({ left: 5, right: 5, top: 5, bottom: 5 }, Margin)
    ], DataLabelSettings.prototype, "margin", void 0);
    __decorate([
        Complex({ size: null, color: null, fontStyle: null, fontWeight: null, fontFamily: null }, Font)
    ], DataLabelSettings.prototype, "font", void 0);
    __decorate([
        Property(null)
    ], DataLabelSettings.prototype, "template", void 0);
    __decorate([
        Property('Hide')
    ], DataLabelSettings.prototype, "labelIntersectAction", void 0);
    return DataLabelSettings;
}(ChildProperty));
export { DataLabelSettings };
/**
 * This class is used to define the appearance and behavior of the series markers.
 */
var MarkerSettings = /** @class */ (function (_super) {
    __extends(MarkerSettings, _super);
    function MarkerSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property(false)
    ], MarkerSettings.prototype, "visible", void 0);
    __decorate([
        Property(null)
    ], MarkerSettings.prototype, "shape", void 0);
    __decorate([
        Property('')
    ], MarkerSettings.prototype, "imageUrl", void 0);
    __decorate([
        Property(5)
    ], MarkerSettings.prototype, "height", void 0);
    __decorate([
        Property(false)
    ], MarkerSettings.prototype, "isFilled", void 0);
    __decorate([
        Property(5)
    ], MarkerSettings.prototype, "width", void 0);
    __decorate([
        Complex({ width: 2, color: null }, Border)
    ], MarkerSettings.prototype, "border", void 0);
    __decorate([
        Complex({ x: 0, y: 0 }, Offset)
    ], MarkerSettings.prototype, "offset", void 0);
    __decorate([
        Property(null)
    ], MarkerSettings.prototype, "fill", void 0);
    __decorate([
        Property(true)
    ], MarkerSettings.prototype, "allowHighlight", void 0);
    __decorate([
        Property(1)
    ], MarkerSettings.prototype, "opacity", void 0);
    __decorate([
        Complex({}, DataLabelSettings)
    ], MarkerSettings.prototype, "dataLabel", void 0);
    return MarkerSettings;
}(ChildProperty));
export { MarkerSettings };
/**
 * The `ParetoOptions` class provides a set of properties for configuring the Pareto series.
 */
var ParetoOptions = /** @class */ (function (_super) {
    __extends(ParetoOptions, _super);
    function ParetoOptions() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property(null)
    ], ParetoOptions.prototype, "fill", void 0);
    __decorate([
        Property(1)
    ], ParetoOptions.prototype, "width", void 0);
    __decorate([
        Property('0')
    ], ParetoOptions.prototype, "dashArray", void 0);
    __decorate([
        Complex(null, MarkerSettings)
    ], ParetoOptions.prototype, "marker", void 0);
    __decorate([
        Property(true)
    ], ParetoOptions.prototype, "showAxis", void 0);
    return ParetoOptions;
}(ChildProperty));
export { ParetoOptions };
/**
 * The model that represents how the points in a series are configured and displayed.
 *
 * @public
 */
var Points = /** @class */ (function () {
    function Points() {
        /** Specifies the locations of symbols associated with the point. */
        this.symbolLocations = null;
        /** Specifies the regions associated with the point. */
        this.regions = null;
        /** Specifies the percentage value of the point. */
        this.percentage = null;
        /** Specifies the region data of the point. */
        this.regionData = null;
        /** Indicates whether the point is selected. */
        this.isSelect = false;
        /** Specifies the marker settings for the point. */
        this.marker = {
            visible: false
        };
        /**
         * Indicates whether the point is within the specified range.
         *
         * @private
         */
        this.isPointInRange = true;
        /** Specifies the vertical error value for the point. */
        this.verticalError = null;
        /** Specifies the vertical negative error value for the point. */
        this.verticalNegativeError = null;
        /** Specifies the horizontal error value for the point. */
        this.horizontalError = null;
        /** Specifies the horizontal negative error value for the point. */
        this.horizontalNegativeError = null;
        /** Specifies the vertical positive error value for the point. */
        this.verticalPositiveError = null;
        /** Specifies the horizontal positive error value for the point. */
        this.horizontalPositiveError = null;
    }
    return Points;
}());
export { Points };
/**
 * Configures the behavior and appearance of trendlines in a chart series.
 * Trendlines indicate trends and the rate of price changes over a period.
 */
var Trendline = /** @class */ (function (_super) {
    __extends(Trendline, _super);
    function Trendline() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /** @private */
        _this.clipRect = new Rect(0, 0, 0, 0);
        return _this;
    }
    /**
     * Sets the data source for the specified series in the provided chart.
     *
     * @private
     * @param {Series} series - The series for which the data source is set.
     * @param {Chart} chart - The chart in which the data source is set.
     * @returns {void}
     */
    Trendline.prototype.setDataSource = function (series, chart) {
        if (series) {
            this.points = series.points;
        }
        chart.trendLineModule.initDataSource(this);
        chart.visibleSeriesCount++;
    };
    __decorate([
        Property('')
    ], Trendline.prototype, "name", void 0);
    __decorate([
        Property('')
    ], Trendline.prototype, "dashArray", void 0);
    __decorate([
        Property(true)
    ], Trendline.prototype, "visible", void 0);
    __decorate([
        Property('Linear')
    ], Trendline.prototype, "type", void 0);
    __decorate([
        Property(2)
    ], Trendline.prototype, "period", void 0);
    __decorate([
        Property(2)
    ], Trendline.prototype, "polynomialOrder", void 0);
    __decorate([
        Property(0)
    ], Trendline.prototype, "backwardForecast", void 0);
    __decorate([
        Property(0)
    ], Trendline.prototype, "forwardForecast", void 0);
    __decorate([
        Complex({}, Animation)
    ], Trendline.prototype, "animation", void 0);
    __decorate([
        Complex({}, MarkerSettings)
    ], Trendline.prototype, "marker", void 0);
    __decorate([
        Property(true)
    ], Trendline.prototype, "enableTooltip", void 0);
    __decorate([
        Property(null)
    ], Trendline.prototype, "intercept", void 0);
    __decorate([
        Property('')
    ], Trendline.prototype, "fill", void 0);
    __decorate([
        Property(1)
    ], Trendline.prototype, "width", void 0);
    __decorate([
        Property('SeriesType')
    ], Trendline.prototype, "legendShape", void 0);
    __decorate([
        Complex({}, Accessibility)
    ], Trendline.prototype, "accessibility", void 0);
    return Trendline;
}(ChildProperty));
export { Trendline };
/**
 * The `ErrorBarCapSettings` class provides options to customize the appearance and behavior of error bars in a series.
 */
var ErrorBarCapSettings = /** @class */ (function (_super) {
    __extends(ErrorBarCapSettings, _super);
    function ErrorBarCapSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property(1)
    ], ErrorBarCapSettings.prototype, "width", void 0);
    __decorate([
        Property(10)
    ], ErrorBarCapSettings.prototype, "length", void 0);
    __decorate([
        Property(null)
    ], ErrorBarCapSettings.prototype, "color", void 0);
    __decorate([
        Property(1)
    ], ErrorBarCapSettings.prototype, "opacity", void 0);
    return ErrorBarCapSettings;
}(ChildProperty));
export { ErrorBarCapSettings };
var ChartSegment = /** @class */ (function (_super) {
    __extends(ChartSegment, _super);
    function ChartSegment() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property(null)
    ], ChartSegment.prototype, "value", void 0);
    __decorate([
        Property(null)
    ], ChartSegment.prototype, "color", void 0);
    __decorate([
        Property('0')
    ], ChartSegment.prototype, "dashArray", void 0);
    return ChartSegment;
}(ChildProperty));
export { ChartSegment };
/**
 * The `ErrorBarSettings` class provides options to customize the appearance and behavior of error bars in a series.
 *
 * @public
 */
var ErrorBarSettings = /** @class */ (function (_super) {
    __extends(ErrorBarSettings, _super);
    function ErrorBarSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property(false)
    ], ErrorBarSettings.prototype, "visible", void 0);
    __decorate([
        Property('Fixed')
    ], ErrorBarSettings.prototype, "type", void 0);
    __decorate([
        Property('Both')
    ], ErrorBarSettings.prototype, "direction", void 0);
    __decorate([
        Property('Vertical')
    ], ErrorBarSettings.prototype, "mode", void 0);
    __decorate([
        Property(null)
    ], ErrorBarSettings.prototype, "color", void 0);
    __decorate([
        Property(1)
    ], ErrorBarSettings.prototype, "verticalError", void 0);
    __decorate([
        Property(1)
    ], ErrorBarSettings.prototype, "width", void 0);
    __decorate([
        Property(1)
    ], ErrorBarSettings.prototype, "horizontalError", void 0);
    __decorate([
        Property(3)
    ], ErrorBarSettings.prototype, "verticalPositiveError", void 0);
    __decorate([
        Property(3)
    ], ErrorBarSettings.prototype, "verticalNegativeError", void 0);
    __decorate([
        Property(1)
    ], ErrorBarSettings.prototype, "horizontalPositiveError", void 0);
    __decorate([
        Property(1)
    ], ErrorBarSettings.prototype, "horizontalNegativeError", void 0);
    __decorate([
        Complex(null, ErrorBarCapSettings)
    ], ErrorBarSettings.prototype, "errorBarCap", void 0);
    __decorate([
        Property('')
    ], ErrorBarSettings.prototype, "errorBarColorMapping", void 0);
    return ErrorBarSettings;
}(ChildProperty));
export { ErrorBarSettings };
/**
 * Defines the common behavior for series and technical indicators.
 */
var SeriesBase = /** @class */ (function (_super) {
    __extends(SeriesBase, _super);
    function SeriesBase() {
        /**
         * The data source field that contains the x value.
         * It is applicable to both series and technical indicators.
         *
         * @default ''
         */
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.rangeColorPoints = [];
        _this.isAdvancedColor = undefined;
        /** @private */
        _this.currentViewData = [];
        /** @private */
        _this.clipRect = new Rect(0, 0, 0, 0);
        /** @private */
        _this.seriesType = 'XY';
        _this.isRectTypeSeries = false;
        _this.removedPointIndex = null;
        /** @private */
        _this.isLegendClicked = false;
        return _this;
    }
    /**
     * Process data for the series.
     *
     * @hidden
     * @returns {void}
     */
    SeriesBase.prototype.processJsonData = function () {
        var i = 0;
        var point = new Points();
        var xName = (this instanceof Series && this.type === 'Histogram') ? 'x' : this.xName;
        var textMappingName = this instanceof Series && this.marker.dataLabel.name ?
            this.marker.dataLabel.name : '';
        if (this instanceof Series) {
            if ((this.type === 'Waterfall' || this.type === 'Histogram')) {
                this.currentViewData = this.chart[firstToLowerCase(this.type) + 'SeriesModule'].
                    processInternalData(extend([], this.currentViewData, null, true), this);
            }
            if (this.category === 'Pareto') {
                this.currentViewData = extend([], this.currentViewData, null, true);
                if (this.type === 'Line') {
                    this.currentViewData = this.chart.paretoSeriesModule.performCumulativeCalculation(this.currentViewData, this);
                }
            }
            this.isRectTypeSeries = this.type.indexOf('Column') > -1 || this.type.indexOf('Bar') > -1
                || this.type.indexOf('Histogram') > -1;
        }
        var len = (this.currentViewData || []).length;
        this.points = [];
        this.xMin = Infinity;
        this.xMax = -Infinity;
        this.yMin = Infinity;
        this.yMax = -Infinity;
        this.sizeMax = -Infinity;
        this.getSeriesType();
        if (this.xAxis.valueType === 'Category') {
            while (i < len) {
                this.pushCategoryPoint(point, i, textMappingName, xName);
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
                this.pushDateTimePoint(point, i, textMappingName, xName, dateParser, dateFormatter);
                i++;
            }
        }
        else {
            while (i < len) {
                this.pushDoublePoint(point, i, textMappingName, xName);
                i++;
            }
        }
        this.updateSplineValue();
        this.updateYAxisForErrorBars();
        if (this instanceof Series && this.type === 'Waterfall' && isNullOrUndefined(this.yAxis.minimum)) {
            this.yMin = Math.min.apply(Math, this.chart.waterfallSeriesModule.cumulativeSums);
        }
    };
    /**
     * Calculates the errorbar and adds a range to axis if errorbar exeeds to the actual range.
     *
     * @returns {void}
     * @private
     */
    SeriesBase.prototype.updateYAxisForErrorBars = function () {
        if (this instanceof Series) {
            if (this.chart.errorBarModule) {
                var maxVerticalError = void 0;
                var minVerticalError = void 0;
                if (this.errorBar.verticalError) {
                    for (var i = 0; i < this.points.length; i++) {
                        var verticalErrors = [];
                        var minVerticalErrorValue = [];
                        for (var i_1 = 0; i_1 < this.points.length; i_1++) {
                            var point = this.points[i_1];
                            if (point.verticalError) {
                                verticalErrors.push(point.verticalError);
                                minVerticalErrorValue.push(point.yValue - point.verticalError);
                            }
                        }
                        maxVerticalError = verticalErrors && verticalErrors.length > 0 ? Math.max.apply(Math, verticalErrors) : 0;
                        minVerticalError = verticalErrors && verticalErrors.length > 0 ? Math.min.apply(Math, minVerticalErrorValue) : 0;
                    }
                }
                this.yMax += !isNaN(maxVerticalError) && isNullOrUndefined(this.yAxis.maximum) ? maxVerticalError : 0;
                this.yMin = !isNaN(minVerticalError) && minVerticalError < this.yMin && minVerticalError < 0 &&
                    isNullOrUndefined(this.yAxis.minimum) ? minVerticalError : this.yMin;
            }
        }
    };
    /**
     * Pushes a category point to the data collection.
     *
     * @param {Points} point -The point to be pushed.
     * @param {number} index -The index of the point.
     * @param {string} textMappingName -The name of the text mapping.
     * @param {string} xName -The name of the x-coordinate.
     * @returns {void}
     * @private
     */
    SeriesBase.prototype.pushCategoryPoint = function (point, index, textMappingName, xName) {
        point = this.dataPoint(index, textMappingName, xName);
        this.pushCategoryData(point, index, point.x);
        this.pushData(point, index);
        this.setEmptyPoint(point, index);
        this.rangeColorsInterior(point);
    };
    /**
     * Pushes a double point to the data collection.
     *
     * @param {Points} point -The point to be pushed.
     * @param {number} index -The index of the point.
     * @param {string} textMappingName -The name of the text mapping.
     * @param {string} xName -The name of the x-coordinate.
     * @returns {void}
     * @private
     */
    SeriesBase.prototype.pushDoublePoint = function (point, index, textMappingName, xName) {
        point = this.dataPoint(index, textMappingName, xName);
        point.xValue = point.x;
        this.pushData(point, index);
        this.setEmptyPoint(point, index);
    };
    /**
     * Pushes a DateTime point to the data collection.
     *
     * @param {Points} point -The point to be pushed.
     * @param {number} index -The index of the point.
     * @param {string} textMappingName -The name of the text mapping.
     * @param {string} xName -The name of the x-coordinate.
     * @param {Function} dateParser -The date parser function.
     * @param {Function} dateFormatter -The date formatter function.
     * @returns {void}
     * @private
     */
    SeriesBase.prototype.pushDateTimePoint = function (point, index, textMappingName, xName, dateParser, dateFormatter) {
        point = this.dataPoint(index, textMappingName, xName);
        if (!isNullOrUndefined(point.x) && point.x !== '') {
            point.x = new Date(DataUtil.parse.parseJson({ val: point.x }).val);
            if (this.xAxis.valueType === 'DateTime') {
                point.xValue = Date.parse(point.x.toString());
            }
            else {
                if (this.chart.isBlazor) {
                    this.pushCategoryData(point, index, Date.parse(point.x.toString()).toString());
                }
                else {
                    this.pushCategoryData(point, index, Date.parse(dateParser(dateFormatter(point.x))).toString());
                }
            }
            this.pushData(point, index);
            this.setEmptyPoint(point, index);
        }
        else {
            point.visible = false;
        }
    };
    SeriesBase.prototype.updateSplineValue = function () {
        if (this instanceof Series && !(this.chart.stockChart && this.xAxis.valueType === 'DateTimeCategory')) {
            if (this.type.indexOf('Spline') > -1 || (this.drawType.indexOf('Spline') > -1 && this.chart.chartAreaType === 'PolarRadar')) {
                var isArea = (this.type.indexOf('Area') > -1 || this.drawType.indexOf('Area') > -1);
                var isRange = this.type.indexOf('Range') > -1;
                this.chart['spline' + (isArea ? isRange ? 'RangeArea' : 'Area' : '') + 'SeriesModule'].findSplinePoint(this);
            }
            else if (this.type.indexOf('Histogram') > -1 && (this.xAxis.maximum || this.xAxis.minimum)) {
                this.chart['histogramSeriesModule'].calculateBinValues(this);
            }
            if (this.type.indexOf('Histogram') > -1 && this.points.length === 1) {
                this.xMin = this.xMin - this.histogramValues.binWidth;
                this.xMax = this.xMax + this.histogramValues.binWidth;
            }
        }
    };
    SeriesBase.prototype.rangeColorsInterior = function (point) {
        if (this.chart.rangeColorSettings && this.chart.rangeColorSettings.length > 0 && this.chart.visibleSeries.length === 1 &&
            (this.chart.series[0].type === 'Column' || this.chart.series[0].type === 'Bar' ||
                this.chart.series[0].type === 'Scatter' || this.chart.series[0].type === 'Bubble')) {
            if (!this.rangeColorPoints[point.interior]) {
                this.rangeColorPoints[point.interior] = [];
            }
            else if (this.rangeColorPoints[point.interior] !== undefined) {
                this.rangeColorPoints[point.interior].push(point);
            }
        }
    };
    /**
     * Sets the empty point values.
     *
     * @param {Points} point - The point to be set.
     * @param {number} i - The index of the point.
     * @private
     * @returns {void}
     */
    SeriesBase.prototype.pushData = function (point, i) {
        point.index = i;
        point.yValue = point.y;
        point.series = this;
        // To find the min, max for the axis range.
        this.xMin = Math.min(this.xMin, point.xValue);
        this.xMax = Math.max(this.xMax, point.xValue);
        this.xData.push(point.xValue);
    };
    /**
     * Retrieves the data point at the specified index with the given text mapping name and x-name.
     *
     * @param {number} i - The index of the data point to retrieve.
     * @param {string} textMappingName - The name used to map text data.
     * @param {string} xName - The name used for the x-axis.
     * @returns {Points} - The data point at the specified index.
     * @private
     */
    SeriesBase.prototype.dataPoint = function (i, textMappingName, xName) {
        this.points[i] = new Points();
        var point = this.points[i];
        var currentViewData = this.currentViewData[i];
        var getObjectValueByMappingString = this.enableComplexProperty ? getValue : this.getObjectValue;
        point.x = getObjectValueByMappingString(xName, currentViewData);
        point.high = getObjectValueByMappingString(this.high, currentViewData);
        point.low = getObjectValueByMappingString(this.low, currentViewData);
        point.open = getObjectValueByMappingString(this.open, currentViewData);
        point.close = getObjectValueByMappingString(this.close, currentViewData);
        point.volume = getObjectValueByMappingString(this.volume, currentViewData);
        point.interior = getObjectValueByMappingString(this.pointColorMapping, currentViewData);
        if (this instanceof Series) {
            if (this.errorBar.visible) {
                point.errorBarColor = getObjectValueByMappingString(this.errorBar.errorBarColorMapping, currentViewData);
                point.verticalError = typeof this.errorBar.verticalError == 'string' ? getObjectValueByMappingString(this.errorBar.verticalError, currentViewData) : this.errorBar.verticalError;
                point.horizontalError = typeof this.errorBar.horizontalError == 'string' ? getObjectValueByMappingString(this.errorBar.horizontalError, currentViewData) : this.errorBar.horizontalError;
                point.verticalNegativeError = typeof this.errorBar.verticalNegativeError == 'string' ? getObjectValueByMappingString(this.errorBar.verticalNegativeError, currentViewData) : this.errorBar.verticalNegativeError;
                point.verticalPositiveError = typeof this.errorBar.verticalPositiveError == 'string' ? getObjectValueByMappingString(this.errorBar.verticalPositiveError, currentViewData) : this.errorBar.verticalPositiveError;
                point.horizontalNegativeError = typeof this.errorBar.horizontalNegativeError == 'string' ? getObjectValueByMappingString(this.errorBar.horizontalNegativeError, currentViewData) : this.errorBar.horizontalNegativeError;
                point.horizontalPositiveError = typeof this.errorBar.horizontalPositiveError == 'string' ? getObjectValueByMappingString(this.errorBar.horizontalPositiveError, currentViewData) : this.errorBar.horizontalPositiveError;
            }
            point.y = getObjectValueByMappingString(this.yName, currentViewData);
            point.size = getObjectValueByMappingString(this.size, currentViewData);
            point.text = getObjectValueByMappingString(textMappingName, currentViewData);
            point.tooltip = getObjectValueByMappingString(this.tooltipMappingName, currentViewData);
            if (this.isAdvancedColorSupported()) {
                this.rangeColorName = this.colorName.length > 0 ? this.colorName : this.yName;
                point.colorValue = getObjectValueByMappingString(this.rangeColorName, currentViewData);
                point.interior = this.getPointFillColor(point.interior, point.colorValue);
            }
        }
        return point;
    };
    SeriesBase.prototype.isAdvancedColorSupported = function () {
        if (isNullOrUndefined(this.isAdvancedColor)) {
            if (this.chart.rangeColorSettings && this.chart.rangeColorSettings.length > 0 &&
                (this.chart.series[0].type === 'Column' || this.chart.series[0].type === 'Bar' ||
                    this.chart.series[0].type === 'Scatter' || this.chart.series[0].type === 'Bubble')) {
                this.isAdvancedColor = true;
            }
            else {
                this.isAdvancedColor = false;
            }
        }
        return this.isAdvancedColor;
    };
    SeriesBase.prototype.getPointFillColor = function (pointFill, value) {
        var color = pointFill;
        if (value && this.chart.rangeColorSettings && this.chart.rangeColorSettings.length > 0) {
            for (var _i = 0, _a = this.chart.rangeColorSettings; _i < _a.length; _i++) {
                var rangeMap = _a[_i];
                if (value >= rangeMap.start && value <= rangeMap.end) {
                    if (rangeMap.colors.length > 1) {
                        color = getColorByValue(rangeMap, value);
                    }
                    else {
                        color = rangeMap.colors[0];
                    }
                }
            }
        }
        return color;
    };
    /**
     * Pushes a category point to the data collection.
     *
     * @param {string} mappingName - The name of the mapping.
     * @param {Object} data - The data to be pushed.
     * @returns {Object} - The data point at the specified index.
     * @private
     */
    SeriesBase.prototype.getObjectValue = function (mappingName, data) {
        return data[mappingName];
    };
    /**
     * Sets the specified data point as an empty point at the given index.
     *
     * @private
     * @param {Points} point - The data point to set as empty.
     * @param {number} i - The index of the data point.
     * @returns {void}
     */
    SeriesBase.prototype.setEmptyPoint = function (point, i) {
        if (!this.findVisibility(point)) {
            point.visible = true;
            return null;
        }
        point.isEmpty = true;
        var mode = this instanceof Series && point.isPointInRange ? this.emptyPointSettings.mode : 'Drop';
        switch (mode) {
            case 'Zero':
                point.visible = true;
                if (this instanceof Series && this.seriesType.indexOf('HighLow') > -1) {
                    point.high = point.low = 0;
                    if (this.seriesType.indexOf('HighLowOpenClose') > -1) {
                        point.open = point.close = 0;
                    }
                }
                else {
                    point.y = point.yValue = this.yData[i] = 0;
                }
                break;
            case 'Average':
                if (this instanceof Series) {
                    if (this.seriesType.indexOf('HighLow') > -1) {
                        point.high = (isNullOrUndefined(point.high) || isNaN(+point.high)) ? this.getAverage(this.high, i) : point.high;
                        point.low = (isNullOrUndefined(point.low) || isNaN(+point.low)) ? this.getAverage(this.low, i) : point.low;
                        if (this.seriesType.indexOf('HighLowOpenClose') > -1) {
                            point.open = (isNullOrUndefined(point.open) || isNaN(+point.open)) ? this.getAverage(this.open, i) : point.open;
                            point.close = (isNullOrUndefined(point.close) || isNaN(+point.close)) ? this.getAverage(this.close, i) :
                                point.close;
                        }
                    }
                    else {
                        point.y = point.yValue = this.yData[i] = this.getAverage(this.yName, i);
                    }
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
    SeriesBase.prototype.findVisibility = function (point) {
        var type = this instanceof Series ? this.seriesType : 'HighLowOpenClose';
        var yValues;
        var yAxisMin = this.yAxis.minimum;
        var yAxisMax = this.yAxis.maximum;
        switch (type) {
            case 'XY':
                if (this.chart.chartAreaType === 'PolarRadar' && ((!isNullOrUndefined(yAxisMin) && point.yValue < yAxisMin) ||
                    (!isNullOrUndefined(yAxisMax) && point.yValue > yAxisMax))) {
                    point.isPointInRange = false;
                    return true;
                }
                this.setXYMinMax(point.yValue);
                this.yData.push(point.yValue);
                if (this instanceof Series && this.type === 'Bubble') {
                    this.sizeMax = Math.max(this.sizeMax, (isNullOrUndefined(point.size) || isNaN(+point.size)) ? this.sizeMax
                        : point.size);
                }
                return isNullOrUndefined(point.x) || (isNullOrUndefined(point.y) || isNaN(+point.y));
            case 'HighLow':
                this.setHiloMinMax(point.high, point.low);
                return isNullOrUndefined(point.x) || (isNullOrUndefined(point.low) || isNaN(+point.low)) ||
                    (isNullOrUndefined(point.high) || isNaN(+point.high));
            case 'HighLowOpenClose':
                this.setHiloMinMax(point.high, point.low);
                return isNullOrUndefined(point.x) || (isNullOrUndefined(point.low) || isNaN(+point.low)) ||
                    (isNullOrUndefined(point.open) || isNaN(+point.open)) || (isNullOrUndefined(point.close) || isNaN(+point.close))
                    || (isNullOrUndefined(point.high) || isNaN(+point.high));
            case 'BoxPlot':
                yValues = (point.y || [null]).filter(function (value) {
                    return !isNullOrUndefined(value) && !isNaN(value);
                }).sort(function (a, b) {
                    return a - b;
                });
                point.y = yValues;
                this.yMin = Math.min(this.yMin, Math.min.apply(Math, yValues));
                this.yMax = Math.max(this.yMax, Math.max.apply(Math, yValues));
                return !yValues.length;
        }
    };
    /**
     * To get Y min max for the provided point seriesType XY.
     *
     * @param {number} yValue - The y value used to determine the minimum and maximum values for the x and y coordinates.
     * @returns {void}
     */
    SeriesBase.prototype.setXYMinMax = function (yValue) {
        var isLogAxis = (this.yAxis.valueType === 'Logarithmic' || this.xAxis.valueType === 'Logarithmic');
        var isNegativeValue = yValue < 0 || this.yAxis.rangePadding === 'None';
        var seriesMinY;
        if (this.isRectTypeSeries && !setRange(this.yAxis)) {
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
     * Sets the minimum and maximum values for the high and low values.
     *
     * @private
     * @param {number} high - The high value used to determine the maximum value.
     * @param {number} low - The low value used to determine the minimum value.
     * @returns {void}
     */
    SeriesBase.prototype.setHiloMinMax = function (high, low) {
        this.yMin = Math.min(this.yMin, Math.min((isNullOrUndefined(low) || isNaN(low)) ? this.yMin : low, (isNullOrUndefined(high) || isNaN(high)) ? this.yMin : high));
        this.yMax = Math.max(this.yMax, Math.max((isNullOrUndefined(low) || isNaN(low)) ? this.yMax : low, (isNullOrUndefined(high) || isNaN(high)) ? this.yMax : high));
    };
    /**
     * Finds the type of the series.
     *
     * @private
     * @returns {void}
     */
    SeriesBase.prototype.getSeriesType = function () {
        var type;
        if (this instanceof Series) {
            var seriesType = this.chart.chartAreaType === 'PolarRadar' ? this.drawType : this.type;
            if (seriesType) {
                switch (seriesType) {
                    case 'RangeColumn':
                    case 'RangeArea':
                    case 'RangeStepArea':
                    case 'SplineRangeArea':
                    case 'Hilo':
                        type = 'HighLow';
                        break;
                    case 'HiloOpenClose':
                    case 'Candle':
                        type = 'HighLowOpenClose';
                        break;
                    case 'BoxAndWhisker':
                        type = 'BoxPlot';
                        break;
                    default:
                        type = 'XY';
                }
            }
        }
        this.seriesType = type;
    };
    /**
     * Pushes category data into the series points.
     *
     * @param {Points} point - The point to which category data will be pushed.
     * @param {number} index - The index of the data point.
     * @param {string} pointX - The x-value of the point.
     * @returns {void}
     * @private
     */
    SeriesBase.prototype.pushCategoryData = function (point, index, pointX) {
        if (!this.chart.tooltip.shared) {
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
     * Gets the average value of a member in the specified data array or current view data.
     *
     * @param {string} member - The member whose average is to be calculated.
     * @param {number} i - The index of the data point.
     * @param {Object} data - The data array from which to calculate the average. Defaults to the current view data.
     * @returns {number} - The average value of the specified member.
     */
    SeriesBase.prototype.getAverage = function (member, i, data) {
        if (data === void 0) { data = this.currentViewData; }
        var previous = data[i - 1] ? (data[i - 1][member] || 0) : 0;
        var next = data[i + 1] ? (data[i + 1][member] || 0) : 0;
        return (previous + next) / 2;
    };
    /**
     * Refreshes the data manager for the provided chart.
     *
     * @param {Chart} chart - The chart whose data manager is to be refreshed.
     * @returns {void}
     * @private
     */
    SeriesBase.prototype.refreshDataManager = function (chart) {
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
    SeriesBase.prototype.dataManagerSuccess = function (e, isRemoteData) {
        if (isRemoteData === void 0) { isRemoteData = true; }
        this.currentViewData = e.count ? e.result : [];
        this.chart.allowServerDataBinding = false;
        if (this instanceof Series) {
            if (this.chart.stockChart) {
                this.chart.stockChart.series[this.index].localData = this.currentViewData;
            }
            var argsData = {
                name: seriesRender, series: this, data: this.currentViewData, fill: this.interior
            };
            this.chart.trigger(seriesRender, argsData);
            this.interior = argsData.fill;
            this.currentViewData = argsData.data;
        }
        if (this.chart.stockChart && !(this instanceof Series)) {
            this.currentViewData = this.chart.stockChart.findCurrentData(this.chart.stockChart.series[0].localData, this.chart.stockChart.series[0].xName);
        }
        this.processJsonData();
        this.recordsCount = e.count;
        this.refreshChart(isRemoteData);
        this.currentViewData = null;
    };
    SeriesBase.prototype.refreshChart = function (isRemoteData) {
        var chart = this.chart;
        if (this instanceof Series) {
            chart.visibleSeriesCount += isRemoteData ? 1 : 0;
        }
        chart.refreshTechnicalIndicator(this);
        if (this instanceof Series && this.category !== 'TrendLine') {
            for (var _i = 0, _a = this.trendlines; _i < _a.length; _i++) {
                var trendline = _a[_i];
                trendline.setDataSource(this, chart);
            }
        }
        //if (chart.visibleSeries.length === (chart.visibleSeriesCount - chart.indicators.length)) {
        if (chart.visibleSeries.length === (chart.visibleSeriesCount)) {
            chart.refreshBound();
            chart.trigger('loaded', { chart: chart.isBlazor ? {} : chart });
            if (this.chart.stockChart && this.chart.stockChart.initialRender) {
                this.chart.stockChart.initialRender = false;
                this.chart.stockChart.stockChartDataManagerSuccess();
            }
        }
        if (this instanceof Series) {
            chart.visibleSeriesCount += isRemoteData ? 0 : 1;
        }
    };
    __decorate([
        Property('')
    ], SeriesBase.prototype, "xName", void 0);
    __decorate([
        Property('')
    ], SeriesBase.prototype, "colorName", void 0);
    __decorate([
        Property('')
    ], SeriesBase.prototype, "high", void 0);
    __decorate([
        Property('')
    ], SeriesBase.prototype, "low", void 0);
    __decorate([
        Property('')
    ], SeriesBase.prototype, "open", void 0);
    __decorate([
        Property('')
    ], SeriesBase.prototype, "close", void 0);
    __decorate([
        Property('')
    ], SeriesBase.prototype, "volume", void 0);
    __decorate([
        Property('')
    ], SeriesBase.prototype, "pointColorMapping", void 0);
    __decorate([
        Property(true)
    ], SeriesBase.prototype, "visible", void 0);
    __decorate([
        Property(null)
    ], SeriesBase.prototype, "xAxisName", void 0);
    __decorate([
        Property(null)
    ], SeriesBase.prototype, "yAxisName", void 0);
    __decorate([
        Complex(null, Animation)
    ], SeriesBase.prototype, "animation", void 0);
    __decorate([
        Property(null)
    ], SeriesBase.prototype, "fill", void 0);
    __decorate([
        Property(1)
    ], SeriesBase.prototype, "width", void 0);
    __decorate([
        Property('')
    ], SeriesBase.prototype, "dashArray", void 0);
    __decorate([
        Property('')
    ], SeriesBase.prototype, "dataSource", void 0);
    __decorate([
        Property()
    ], SeriesBase.prototype, "query", void 0);
    __decorate([
        Collection([], ChartSegment)
    ], SeriesBase.prototype, "segments", void 0);
    __decorate([
        Property('X')
    ], SeriesBase.prototype, "segmentAxis", void 0);
    __decorate([
        Property(false)
    ], SeriesBase.prototype, "enableComplexProperty", void 0);
    return SeriesBase;
}(ChildProperty));
export { SeriesBase };
/**
 * The `Series` class is used to configure individual series in a chart.
 *
 * @public
 */
var Series = /** @class */ (function (_super) {
    __extends(Series, _super);
    function Series(parent, propName, defaultValue, isArray) {
        var _this = _super.call(this, parent, propName, defaultValue, isArray) || this;
        _this.visibleSeriesCount = 0;
        /** @private */
        _this.category = 'Series';
        /** @private */
        _this.isRectSeries = false;
        /** @private */
        _this.drawPoints = [];
        /** @private */
        _this.lowDrawPoints = [];
        /** @private */
        _this.delayedAnimation = false;
        /** @private */
        _this.rangeColorName = _this.colorName.length > 0 ? _this.colorName : _this.yName;
        /** @private */
        _this.currentData = [];
        return _this;
    }
    /**
     * Refresh the axis label.
     *
     * @returns {void}
     * @private
     */
    Series.prototype.refreshAxisLabel = function () {
        if (this.xAxis.valueType.indexOf('Category') === -1) {
            return null;
        }
        this.xAxis.labels = [];
        this.xAxis.indexLabels = {};
        var option = {
            skeleton: 'full',
            type: 'dateTime'
        };
        var dateParser = this.chart.intl.getDateParser(option);
        var dateFormatter = this.chart.intl.getDateFormat(option);
        for (var _i = 0, _a = this.xAxis.series; _i < _a.length; _i++) {
            var item = _a[_i];
            if (item.visible && item.category !== 'TrendLine') {
                item.xMin = Infinity;
                item.xMax = -Infinity;
                for (var _b = 0, _c = item.points; _b < _c.length; _b++) {
                    var point = _c[_b];
                    item.pushCategoryData(point, point.index, this.xAxis.valueType === 'DateTimeCategory' ? Date.parse(dateParser(dateFormatter(point.x))).toString() : point.x);
                    item.xMin = Math.min(item.xMin, point.xValue);
                    item.xMax = Math.max(item.xMax, point.xValue);
                }
            }
        }
    };
    /**
     * To get the series collection.
     *
     * @returns {void}
     * @private
     */
    Series.prototype.findSeriesCollection = function (column, row, isStack) {
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
     * Checks if the series in the chart are rectangular.
     *
     * @param {Series} series - The series to be checked.
     * @param {boolean} isStack - Specifies whether the series are stacked.
     * @returns {boolean} - Returns true if the series in the chart are rectangular, otherwise false.
     */
    Series.prototype.rectSeriesInChart = function (series, isStack) {
        var type = (series.type).toLowerCase();
        return (type.indexOf('column') !== -1 || type.indexOf('bar') !== -1 || type.indexOf('histogram') !== -1 ||
            type.indexOf('hiloopenclose') !== -1 || type.indexOf('candle') !== -1 || type.indexOf('pareto') !== -1 ||
            type.indexOf('hilo') !== -1 || series.drawType.indexOf('Column') !== -1 ||
            type.indexOf('waterfall') !== -1 || type.indexOf('boxandwhisker') !== -1 || isStack);
    };
    /**
     * Calculates the stacked value for the chart.
     *
     * @param {boolean} isStacking100 - Specifies whether the stacking is 100%.
     * @param {Chart} chart - The chart for which the stacked value is calculated.
     * @returns {void}
     * @private
     */
    Series.prototype.calculateStackedValue = function (isStacking100, chart) {
        for (var _i = 0, _a = chart.columns; _i < _a.length; _i++) {
            var columnItem = _a[_i];
            for (var _b = 0, _c = chart.rows; _b < _c.length; _b++) {
                var item = _c[_b];
                this.calculateStackingValues(this.findSeriesCollection(columnItem, item, true), isStacking100);
            }
        }
    };
    Series.prototype.calculateStackingValues = function (seriesCollection, isStacking100) {
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
                if (series.type.indexOf('Stacking') !== -1 || (series.drawType.indexOf('Stacking') !== -1 &&
                    (series.chart.chartAreaType === 'PolarRadar'))) {
                    stackingGroup = (series.type.indexOf('StackingArea') !== -1) ? 'StackingArea100' :
                        (series.type.indexOf('StackingLine') !== -1) ? 'StackingLine100' : series.stackingGroup;
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
                    series.yMin = isLogAxis && isColumnBarType && series.yMin < 1 ? series.yMin : (series.yAxis.startFromZero && series.yAxis.rangePadding === 'Auto' && series.yMin >= 0) ? 0 : parseFloat((Math.min.apply(0, isStacking100 ? startValues : endValues)).toFixed(10));
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
    Series.prototype.findPercentageOfStacking = function (stackingSeies, values, isStacking100) {
        for (var _i = 0, stackingSeies_1 = stackingSeies; _i < stackingSeies_1.length; _i++) {
            var item = stackingSeies_1[_i];
            if (isStacking100) {
                return null;
            }
            for (var _a = 0, _b = getVisiblePoints(item); _a < _b.length; _a++) {
                var point = _b[_a];
                point.percentage = Math.abs(+(point.y / values[point.index] * 100).toFixed(2));
            }
        }
    };
    Series.prototype.findFrequencies = function (seriesCollection) {
        var frequencies = [];
        var stackingGroup;
        var visiblePoints = [];
        for (var _i = 0, seriesCollection_3 = seriesCollection; _i < seriesCollection_3.length; _i++) {
            var series = seriesCollection_3[_i];
            series.yAxis.isStack100 = series.type.indexOf('100') !== -1 ? true : false;
            visiblePoints = getVisiblePoints(series);
            if (series.type.indexOf('Stacking') !== -1) {
                stackingGroup = (series.type.indexOf('StackingArea') !== -1) ? 'StackingArea100' :
                    (series.type.indexOf('StackingLine') !== -1) ? 'StackingLine100' : series.stackingGroup;
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
    /* private dataManagerFailure(e: { result: Object[] }): void {
         this.currentViewData = [];
         this.refreshChart();
     }*/
    /**
     * Renders the series on the chart.
     *
     * @param {Chart} chart - The chart on which the series is rendered.
     * @returns {void}
     * @private
     */
    Series.prototype.renderSeries = function (chart) {
        if (this.chart.stockChart && this.xAxis.valueType === 'DateTimeCategory') {
            for (var i = 0; i < this.points.length; i++) {
                var index = this.xAxis.labels.indexOf(Date.parse(this.points[i].x.toString()).toString());
                this.points[i].xValue = index;
                if (chart.series.length > 1) {
                    this.xData[i] = index;
                    this.xMin = (this.xMin > index) ? index : this.xMin;
                    this.xMax = (this.xMax < index) ? index : this.xMax;
                }
            }
            if (this instanceof Series && this.type.indexOf('Spline') > -1) {
                var isArea = this.type.indexOf('Area') > -1;
                var isRange = this.type.indexOf('Range') > -1;
                this.chart['spline' + (isArea ? isRange ? 'RangeArea' : 'Area' : '') + 'SeriesModule'].findSplinePoint(this);
            }
        }
        var seriesType = firstToLowerCase(this.type);
        seriesType = seriesType.replace('100', '');
        if (chart[seriesType + 'SeriesModule']) {
            if (this.category !== 'Indicator' && this.category !== 'TrendLine') {
                this.createSeriesElements(chart);
            }
            this.visiblePoints = getVisiblePoints(this);
            if (this.chart.enableCanvas) {
                this.chart.canvasRender.ctx.save();
                this.chart.canvasRender.ctx.beginPath();
                if (chart.requireInvertedAxis) {
                    this.chart.canvasRender.ctx.rect(this.yAxis.rect.x, this.xAxis.rect.y, this.yAxis.rect.width, this.xAxis.rect.height);
                }
                else {
                    this.chart.canvasRender.ctx.rect(this.xAxis.rect.x, this.yAxis.rect.y, this.xAxis.rect.width, this.yAxis.rect.height);
                }
                this.chart.canvasRender.ctx.clip();
                chart[seriesType + 'SeriesModule'].render(this, this.xAxis, this.yAxis, chart.requireInvertedAxis);
                this.chart.canvasRender.ctx.restore();
            }
            else {
                chart[seriesType + 'SeriesModule'].render(this, this.xAxis, this.yAxis, chart.requireInvertedAxis);
            }
            if (this.category !== 'Indicator') {
                if (this.errorBar.visible) {
                    this.chart.errorBarModule.render(this);
                }
                if (this.marker.dataLabel.visible) {
                    if (this.chart.enableCanvas) {
                        this.chart.canvasRender.ctx.save();
                        this.chart.canvasRender.ctx.beginPath();
                        if (chart.requireInvertedAxis) {
                            this.chart.canvasRender.ctx.rect(this.yAxis.rect.x, this.xAxis.rect.y, this.yAxis.rect.width, this.xAxis.rect.height);
                        }
                        else {
                            this.chart.canvasRender.ctx.rect(this.xAxis.rect.x, this.yAxis.rect.y, this.xAxis.rect.width, this.yAxis.rect.height);
                        }
                        this.chart.canvasRender.ctx.clip();
                        chart.dataLabelModule.render(this, this.chart, this.marker.dataLabel);
                        this.chart.canvasRender.ctx.restore();
                    }
                    else {
                        chart.dataLabelModule.render(this, this.chart, this.marker.dataLabel);
                    }
                }
                this.appendSeriesElement(chart.seriesElements, chart);
            }
            if (!this.chart.enableCanvas) {
                this.performAnimation(chart, seriesType, this.errorBar, this.marker, this.marker.dataLabel);
            }
        }
    };
    /**
     * Creates elements for the series on the chart.
     *
     * @param {Chart} chart - The chart for which series elements are created.
     * @returns {void}
     * @private
     */
    Series.prototype.createSeriesElements = function (chart) {
        if (this.category !== 'Indicator') {
            var elementId = chart.element.id;
            // 8 for extend border value 5 for extend size value
            var explodeValue = this.marker.border.width + 8 + 5;
            var render = (this.type === 'Bubble') || (!this.marker.visible && chart.tooltip.shared && chart.enableCanvas) ?
                chart.svgRenderer : chart.renderer;
            var index = this.index === undefined ? this.category : this.index;
            var markerHeight = void 0;
            var markerWidth = void 0;
            var options = void 0;
            if (this.type === 'Scatter' || this.drawType === 'Scatter') {
                markerHeight = (this.marker.height + explodeValue) / 2;
                markerWidth = (this.marker.width + explodeValue) / 2;
            }
            else {
                markerHeight = 0;
                markerWidth = 0;
            }
            if (chart.chartAreaType === 'PolarRadar') {
                var markerMaxValue = (this.drawType === 'Scatter') ? Math.max(this.marker.width, this.marker.height) : 0;
                options = new CircleOption(elementId + '_ChartSeriesClipRect_' + index, 'transparent', { width: 1, color: 'Gray' }, 1, this.clipRect.width / 2 + this.clipRect.x, this.clipRect.height / 2 + this.clipRect.y, chart.radius + markerMaxValue);
                this.clipRectElement = appendClipElement(chart.redraw, options, render, 'drawCircularClipPath');
            }
            else {
                options = new RectOption(elementId + '_ChartSeriesClipRect_' + index, 'transparent', { width: 1, color: 'Gray' }, 1, {
                    x: (this.xAxis.columnIndex === 0) ? -markerWidth : 0, y: (this.yAxis.rowIndex === chart.rows.length - 1) ? -markerHeight : 0,
                    width: this.clipRect.width + (this.xAxis.columnIndex === chart.columns.length - 1 ? markerWidth * 2 : markerWidth),
                    height: this.clipRect.height + (this.yAxis.rowIndex === 0 ? markerHeight * 2 : markerHeight)
                });
                this.clipRectElement = appendClipElement(chart.redraw, options, render);
            }
            var transform = chart.chartAreaType === 'Cartesian' ? 'translate(' + this.clipRect.x + ',' + (this.clipRect.y) + ')' : '';
            this.symbolElement = null;
            this.seriesElement = render.createGroup({
                'id': elementId + 'SeriesGroup' + index,
                'transform': transform,
                'clip-path': 'url(#' + elementId + '_ChartSeriesClipRect_' + index + ')'
            });
            if (this.seriesElement) {
                this.seriesElement.setAttribute('role', this.accessibility.accessibilityRole ? this.accessibility.accessibilityRole : 'region');
                this.seriesElement.setAttribute('tabindex', this.accessibility.focusable ? String(this.accessibility.tabIndex) : '-1');
                this.seriesElement.style.outline = 'none';
                this.seriesElement.setAttribute('aria-label', this.accessibility.accessibilityDescription ? this.accessibility.accessibilityDescription : (this.name + ',' + this.type + ' series with ' + this.points.length + ' data points'));
                this.seriesElement.setAttribute('aria-hidden', 'false');
            }
            if (!this.chart.enableCanvas || this.type === 'Bubble') {
                this.seriesElement.setAttribute('tabindex', this.accessibility.focusable ? (index === 0 ? '0' : !this.checkTabindex(chart.visibleSeries, index) ? String(this.accessibility.tabIndex) : '') : '-1');
                this.seriesElement.style.outline = 'none';
                this.seriesElement.appendChild(this.clipRectElement);
            }
        }
    };
    Series.prototype.checkTabindex = function (visibleSeries, index) {
        for (var i = 0; i < index; i++) {
            if (visibleSeries[i].visible) {
                return true;
            }
        }
        return false;
    };
    /**
     * Appends a series element to the chart.
     *
     * @param {Element} element - The series element to append.
     * @param {Chart} chart - The chart to which the series element will be appended.
     * @returns {void}
     * @private
     */
    Series.prototype.appendSeriesElement = function (element, chart) {
        var marker = this.marker;
        var dataLabel = marker.dataLabel;
        var redraw = chart.redraw;
        if (this.category !== 'TrendLine') {
            appendChildElement(chart.enableCanvas, chart.seriesElements, this.seriesElement, redraw);
            var errorBar = this.errorBar;
            if (errorBar.visible) {
                if (chart.chartAreaType === 'PolarRadar') {
                    appendChildElement(chart.enableCanvas, chart.seriesElements, this.seriesElement, redraw);
                }
                else {
                    appendChildElement(chart.enableCanvas, chart.seriesElements, this.errorBarElement, redraw);
                }
            }
        }
        if (marker.visible && (chart.chartAreaType === 'Cartesian' ||
            ((this.drawType !== 'Scatter') && chart.chartAreaType === 'PolarRadar')) && this.type !== 'Scatter' &&
            this.type !== 'Bubble' && this.type !== 'Candle' && this.type !== 'Hilo' && this.type !== 'HiloOpenClose' && this.symbolElement) {
            appendChildElement(chart.enableCanvas, chart.seriesElements, this.symbolElement, redraw);
        }
        if (dataLabel.visible && this.textElement) {
            appendChildElement(chart.enableCanvas, chart.dataLabelElements, this.shapeElement, redraw);
            appendChildElement(chart.enableCanvas, chart.dataLabelElements, this.textElement, redraw);
        }
        if (!chart.enableCanvas && chart.dataLabelElements.hasChildNodes()) {
            chart.seriesElements.appendChild(chart.dataLabelElements);
        }
    };
    /**
     * Performs animation for the specified chart elements.
     *
     * @param {Chart} chart - The chart for which animation is performed.
     * @param {string} type - The type of animation to be performed.
     * @param {ErrorBarSettingsModel} errorBar - The error bar settings for the animation.
     * @param {MarkerSettingsModel} marker - The marker settings for the animation.
     * @param {DataLabelSettingsModel} dataLabel - The data label settings for the animation.
     * @returns {void}
     * @private
     */
    Series.prototype.performAnimation = function (chart, type, errorBar, marker, dataLabel) {
        if (((this.animation.enable && animationMode !== 'Disable') || animationMode === 'Enable') && chart.animateSeries && (!chart.stockChart || !chart.stockChart.isStockChartRendered)) {
            chart[type + 'SeriesModule'].doAnimation(this);
            if (errorBar.visible) {
                chart.errorBarModule.doErrorBarAnimation(this);
            }
            if (marker.visible && (this.isRectSeries || this.type === 'Line' || this.type === 'Polar' || this.type === 'Radar')) {
                chart.markerRender.doMarkerAnimation(this);
            }
            //to datalabel animation disabled for edge and IE
            if (dataLabel.visible && Browser.info.name !== 'edge' && !Browser.isIE) {
                chart.dataLabelModule.doDataLabelAnimation(this);
            }
        }
    };
    /**
     * Sets the color of a data point.
     *
     * @param {Points} point - The data point.
     * @param {string} color - The color to set.
     * @returns {string} - The updated color.
     * @private
     */
    Series.prototype.setPointColor = function (point, color) {
        color = point.interior || color;
        return point.isEmpty ? (this.emptyPointSettings.fill || color) : color;
    };
    /**
     * Sets the border color of a data point.
     *
     * @param {Points} point - The data point.
     * @param {BorderModel} border - The border color to set.
     * @returns {BorderModel} - The updated border color.
     * @private
     */
    Series.prototype.setBorderColor = function (point, border) {
        border.width = point.isEmpty ? (this.emptyPointSettings.border.width || border.width) : border.width;
        border.color = point.isEmpty ? (this.emptyPointSettings.border.color || border.color) : border.color;
        return border;
    };
    /**
     * Adds a data point to the data source.
     *
     * @function addPoint
     * @param {Object} dataPoint - The data point to be added.
     * @param {number} duration - The duration for the animation.
     * @returns {void}
     */
    Series.prototype.addPoint = function (dataPoint, duration) {
        var yMin = this.yMin;
        var yMax = this.yMax;
        this.removeTrackballElements();
        this.dataSource.push(dataPoint);
        if (this.type === 'Radar' || this.type === 'Polar') {
            return this.chart.refresh();
        }
        if (this.type === 'Histogram') {
            this.currentViewData = this.chart[firstToLowerCase(this.type) + 'SeriesModule'].
                processInternalData(extend([], this.dataSource, null, true), this);
            for (var i = 0; i < this.currentViewData.length; i++) {
                this.updatePoint(i);
            }
        }
        else {
            this.currentViewData = this.dataSource;
            var pointIndex = this.points.length === 0 ? 0 : this.points[this.points.length - 1].index + 1;
            this.updatePoint(pointIndex);
        }
        if (this.category === 'Pareto') {
            var dataSource = extend([], this.dataSource, null, true);
            var series = this.chart.visibleSeries[this.index + this.chart.series.length];
            series.currentViewData = this.chart.paretoSeriesModule.performCumulativeCalculation(dataSource, this);
            for (var i = 0; i < series.currentViewData.length; i++) {
                if (!series.points[i]) {
                    series.updatePoint(i);
                }
                series.points[i].y = series.points[i].yValue = series.currentViewData[i][series.yName];
            }
        }
        this.updateSplineValue();
        this.chart.calculateStackValues();
        this.chart.redraw = this.chart.enableAnimation;
        var chartDuration = this.chart.duration;
        this.chart.duration = isNullOrUndefined(duration) ? 500 : duration;
        this.chart.animateSeries = false;
        this.chart.pointsAdded = true;
        if (this.chart.enableAnimation && (!(this.isRectSeries || this.type === 'Bubble' || this.type === 'Scatter')) && (this.type.indexOf('step') === -1)) {
            if (this.marker && this.marker.visible && this.visible) {
                for (var i = this.points.length - 2; i >= 0; i--) {
                    if (this.points[i] && !isNullOrUndefined(this.points[this.points.length - 2].y) &&
                        this.points[i].symbolLocations && this.points[i].symbolLocations[0] !== undefined) {
                        this.chart.markerRender.renderMarker(this, this.points[this.points.length - 2], this.points[i].symbolLocations[0], null, true);
                        break;
                    }
                }
            }
        }
        if (this.yMin >= yMin && this.yMax <= yMax) {
            if (!setRange(this.xAxis)) {
                this.xAxis.baseModule.calculateRangeAndInterval(new Size(this.xAxis.rect.width, this.chart.availableSize.height), this.xAxis);
                this.xAxis.updateAxis();
            }
            this.chart.pointsAdded = false;
            this.updateSeries(true, false);
        }
        if (this.yMin < yMin || this.yMax > yMax) {
            this.updateChartAxis();
            this.chart.pointsAdded = false;
            this.updateSeries(true, true);
        }
        this.chart.redraw = false;
        this.chart.duration = chartDuration;
    };
    /**
     * Removes a data point from the series data source at the specified index.
     *
     * @function removePoint
     * @param {number} index - The index of the data point to be removed.
     * @param {number} duration - The duration for the animation.
     * @returns {void}
     */
    Series.prototype.removePoint = function (index, duration) {
        var dataSource = extend([], this.dataSource, null, true);
        var chartDuration = this.chart.duration;
        if (dataSource.length > 0 && index >= 0 && index < dataSource.length) {
            dataSource.splice(index, 1);
            this.dataSource.splice(index, 1);
            this.removeTrackballElements(index);
            if (this.type === 'Radar' || this.type === 'Polar') {
                return this.chart.refresh();
            }
            this.chart.redraw = this.chart.enableAnimation;
            this.chart.animateSeries = false;
            this.chart.pointsAdded = true;
            this.chart.duration = isNullOrUndefined(duration) ? 500 : duration;
            if (this.type === 'Histogram') {
                var length_1 = this.points.length;
                this.points = [];
                this.visiblePoints = [];
                this.currentViewData = this.chart[firstToLowerCase(this.type) + 'SeriesModule'].
                    processInternalData(extend([], this.dataSource, null, true), this);
                for (var i = 0; i < this.currentViewData.length; i++) {
                    this.updatePoint(i);
                }
                if (length_1 > this.points.length) {
                    this.removedPointIndex = index;
                }
            }
            else {
                this.removedPointIndex = index;
                this.points.splice(index, 1);
                this.visiblePoints.splice(index, 1);
            }
            this.yData = [];
            this.xData = [];
            var yMin = this.yMin;
            var yMax = this.yMax;
            this.yMin = Infinity;
            this.xMin = Infinity;
            this.yMax = -Infinity;
            this.xMax = -Infinity;
            if (this.xAxis.valueType.indexOf('Category') > -1 && this.chart.series.length === 1) {
                this.xAxis.labels = [];
                this.xAxis.indexLabels = {};
            }
            if (index === 0) {
                this.chart.pointsRemoved = this.chart.enableAnimation;
            }
            for (var i = 0; i < this.points.length; i++) {
                this.updatePointsAfterRemoval(i);
            }
            if (this.category === 'Pareto') {
                var series = this.chart.visibleSeries[this.index + this.chart.series.length];
                series.yMin = Infinity;
                series.xMin = Infinity;
                series.yMax = -Infinity;
                series.xMax = -Infinity;
                series.points.splice(index, 1);
                series.visiblePoints.splice(index, 1);
                series.currentViewData = this.chart.paretoSeriesModule.performCumulativeCalculation(this.dataSource, this);
                for (var i = 0; i < series.currentViewData.length; i++) {
                    series.points[i].y = series.points[i].yValue = series.currentViewData[i][series.yName];
                    series.updatePointsAfterRemoval(i);
                }
            }
            this.updateSplineValue();
            this.chart.calculateStackValues();
            if (!setRange(this.xAxis) && yMax === this.yMax && yMin === this.yMin) {
                this.xAxis.baseModule.calculateRangeAndInterval(new Size(this.xAxis.rect.width, this.chart.availableSize.height), this.xAxis);
                this.xAxis.updateAxis();
                this.createSeriesElements(this.chart);
                this.chart.pointsAdded = false;
                this.updateSeries(true, false);
            }
            else if (yMax < this.yMax || yMin > this.yMin || yMax > this.yMax || yMin < this.yMin) {
                this.updateChartAxis();
                this.createSeriesElements(this.chart);
                this.chart.pointsAdded = false;
                this.updateSeries(true, true);
            }
        }
        appendChildElement(this.chart.enableCanvas, this.chart.seriesElements, this.seriesElement, true);
        this.chart.redraw = false;
        this.chart.duration = chartDuration;
        this.chart.pointsRemoved = false;
        this.removedPointIndex = null;
    };
    Series.prototype.updatePointsAfterRemoval = function (index) {
        var point = this.points[index];
        var option = {
            skeleton: 'full',
            type: 'dateTime'
        };
        var dateParser = this.chart.intl.getDateParser(option);
        var dateFormatter = this.chart.intl.getDateFormat(option);
        if (this.xAxis.valueType === 'Category' && this.chart.series.length === 1) {
            this.pushCategoryData(point, index, point.x);
        }
        else if (this.xAxis.valueType === 'DateTimeCategory' && this.chart.series.length === 1) {
            this.pushCategoryData(point, index, Date.parse(dateParser(dateFormatter(point.x))).toString());
        }
        this.pushData(point, index);
        this.setEmptyPoint(this.points[index], index);
    };
    /**
     * Removes trackball elements from the series.
     *
     * @param {number} index - The index of the data point.
     * @returns {void}
     */
    Series.prototype.removeTrackballElements = function (index) {
        if (this.marker.visible) {
            if (index !== undefined) {
                var baseId = this.chart.element.id + '_Series_' + this.index + '_Point_' + index + '_Trackball_';
                var trackball0 = getElement(baseId + '0');
                if (trackball0) {
                    trackball0.remove();
                }
                var trackball1 = getElement(baseId + '1');
                if (trackball1) {
                    trackball1.remove();
                }
                var symbolElement = getElement(this.chart.element.id + '_Series_' + this.index + '_Point_' + index + '_Symbol');
                if (symbolElement) {
                    symbolElement.setAttribute('visibility', 'visible');
                }
            }
            else {
                var baseClassPattern = this.chart.element.id + '_EJ2-Trackball_Series_' + this.index + '_Point_';
                var elements = document.querySelectorAll("[class*=\"" + baseClassPattern + "\"]");
                if (elements[0]) {
                    var pointIndexMatch = elements[0].id.match(/_Point_(\d+)_/);
                    var pointIndex = pointIndexMatch ? parseInt(pointIndexMatch[1], 10) : null;
                    elements[0].remove();
                    var symbolElement = getElement(this.chart.element.id + '_Series_' + this.index + '_Point_' + pointIndex + '_Symbol');
                    if (symbolElement) {
                        symbolElement.setAttribute('visibility', 'visible');
                    }
                }
                if (elements[1]) {
                    elements[1].remove();
                }
            }
        }
        if (this.chart.tooltip.enable) {
            this.chart.tooltipModule.previousPoints = [];
            var tooltipElement = getElement(this.chart.element.id + '_tooltip');
            if (tooltipElement) {
                tooltipElement.remove();
            }
        }
    };
    /**
     * Sets the data source with the provided data.
     *
     * @function setData
     * @param {Object[]} data - An array of objects representing the data points.
     * @param {number} duration - The duration for the animation.
     * @returns {void}
     */
    Series.prototype.setData = function (data, duration) {
        var _this = this;
        if (!data) {
            return null;
        }
        var updatedData = [];
        if (this.dataSource.length === data.length) {
            for (var i = 0; i < data.length; i++) {
                if (data[i][this.xName] instanceof Date) {
                    updatedData.push(data[i][this.xName].getTime());
                }
                else {
                    updatedData.push(data[i][this.xName]);
                }
                if (this.currentData.length < this.dataSource.length) {
                    var dataSource = extend([], this.dataSource, null, true);
                    if (dataSource[i][this.xName] instanceof Date) {
                        this.currentData.push(dataSource[i][this.xName].getTime());
                    }
                    else {
                        this.currentData.push(dataSource[i][this.xName]);
                    }
                }
            }
        }
        var isSameData = updatedData.every(function (element) { return _this.currentData.indexOf(element) !== -1; });
        if (this.currentViewData) {
            isSameData = true;
        }
        var isXAxisChanged = false;
        var yMin = this.yMin;
        var yMax = this.yMax;
        this.yMin = Infinity;
        this.yMax = -Infinity;
        var points = [];
        this.chart.dataLabelCollections = [];
        this.chart.rotatedDataLabelCollections = [];
        var samePoints = false;
        var index = null;
        if (this.dataSource.length === data.length && !(this.type === 'Radar' || this.type === 'Polar') && isSameData) {
            samePoints = true;
            this.yData = [];
            if (this.type === 'Histogram' && this.dataSource.length === data.length) {
                var newHistogramData = this.chart[firstToLowerCase(this.type) + 'SeriesModule'].
                    processInternalData(extend([], data, null, true), this);
                this.currentViewData = newHistogramData;
                for (var j = 0; j < newHistogramData.length; j++) {
                    this.updatePoint(j);
                }
            }
            else {
                for (var i = 0; i < data.length; i++) {
                    var newData = data[i][this.xName];
                    var existingData = this.dataSource[i][this.xName];
                    if (data[i][this.xName] instanceof Date) {
                        newData = data[i][this.xName].getTime();
                        existingData = this.dataSource[i][this.xName].getTime();
                    }
                    if (this.currentData[i] !== newData) {
                        isXAxisChanged = true;
                    }
                    var point = this.points[i];
                    var getObjectValueByMappingString = this.enableComplexProperty ? getValue : this.getObjectValue;
                    var existingPoint = this.dataSource[i];
                    var newPoint = data[i];
                    if ((this.seriesType === 'XY' || this.seriesType === 'BoxPlot')) {
                        point.y = getObjectValueByMappingString(this.yName, newPoint);
                        if (this.type === 'Bubble' && existingPoint[this.size] !== newPoint[this.size]) {
                            point.size = getObjectValueByMappingString(this.size, newPoint);
                        }
                        points.push(i);
                    }
                    else if (existingPoint[this.high] !== newPoint[this.high] || existingPoint[this.low] !== newPoint[this.low] ||
                        existingPoint[this.open] !== newPoint[this.open] || existingPoint[this.close] !== newPoint[this.close] ||
                        existingPoint[this.volume] !== newPoint[this.volume]) {
                        point.high = getObjectValueByMappingString(this.high, newPoint);
                        point.low = getObjectValueByMappingString(this.low, newPoint);
                        point.open = getObjectValueByMappingString(this.open, newPoint);
                        point.close = getObjectValueByMappingString(this.close, newPoint);
                        point.volume = getObjectValueByMappingString(this.volume, newPoint);
                        points.push(i);
                    }
                    point.yValue = point.y;
                    point.x = getObjectValueByMappingString(this.xName, newPoint);
                    if (!this.currentViewData) {
                        point.index = (this.xAxis.valueType === 'DateTime' && typeof (point.x) !== 'number') ? this.currentData.indexOf(point.x.getTime()) : this.currentData.indexOf(point.x);
                    }
                    if ((this.xAxis.valueType === 'Category' || this.xAxis.valueType === 'DateTimeCategory') && i < this.xAxis.visibleLabels.length) {
                        this.xAxis.visibleLabels[i].value = updatedData.indexOf(this.currentData[i *
                            this.xAxis.visibleRange.interval]);
                        this.xAxis.labels[i] = String(updatedData[i]);
                    }
                    this.setEmptyPoint(point, i);
                    this.dataSource[i] = data[i];
                }
            }
        }
        if (!samePoints) {
            this.dataSource = data;
        }
        else {
            this.chart.redraw = this.chart.enableAnimation;
            this.chart.animateSeries = false;
            this.chart.pointsAdded = true;
            var chartDuration = this.chart.duration;
            this.chart.duration = isNullOrUndefined(duration) ? 500 : duration;
            if (this.type.indexOf('Stacking') !== -1) {
                this.chart.calculateStackValues();
            }
            this.updateSplineValue();
            if (yMax === this.yMax && yMin === this.yMin && this.visible) {
                this.chart.pointsAdded = false;
                this.chart[firstToLowerCase((this.category === 'Pareto' ? 'Column' : this.type.replace('100', ''))) + 'SeriesModule'].updateDirection(this, points, this.chart.requireInvertedAxis);
                if (this.chart.annotationModule) {
                    this.chart.annotationModule.renderAnnotations(getElement((this.chart.element.id) + '_Secondary_Element'));
                }
                if (!setRange(this.xAxis) && (isXAxisChanged)) {
                    this.xAxis.updateAxis();
                }
            }
            else if ((yMax < this.yMax || yMin > this.yMin || yMax > this.yMax || yMin < this.yMin) && this.visible) {
                var maximumLabelWidth = this.yAxis.maxLabelSize.width;
                this.yAxis.baseModule.calculateRangeAndInterval(new Size(this.chart.availableSize.width, this.yAxis.rect.height), this.yAxis);
                if (maximumLabelWidth < this.yAxis.maxLabelSize.width) {
                    this.chart.calculateBounds();
                    this.chart.axisCollections.forEach(function (axis) {
                        if (!setRange(axis)) {
                            axis.updateAxis();
                        }
                    });
                    this.chart.chartAxisLayoutPanel.drawPaneLines(this.chart);
                    this.chart.renderAreaBorder();
                }
                else {
                    if (!setRange(this.yAxis)) {
                        this.yAxis.updateAxis();
                    }
                    if (!setRange(this.xAxis) && (isXAxisChanged)) {
                        this.xAxis.updateAxis();
                    }
                    if (this.type === 'Histogram' && !setRange(this.xAxis)) {
                        this.xAxis.baseModule.calculateRangeAndInterval(new Size(this.xAxis.rect.width, this.chart.availableSize.height), this.xAxis);
                        this.xAxis.updateAxis();
                    }
                }
                this.chart.pointsAdded = false;
                if (isXAxisChanged) {
                    this.chart[firstToLowerCase((this.category === 'Pareto' ? 'Column' : this.type.replace('100', ''))) + 'SeriesModule'].updateDirection(this, points, this.chart.requireInvertedAxis);
                    index = this.index;
                }
                this.updateSeries(false, true, index);
                if (this.chart.stripLineModule) {
                    this.chart.stripLineModule.renderStripLine(this.chart, 'Behind', this.chart.axisCollections);
                }
            }
            this.chart.redraw = false;
            this.chart.pointsRemoved = false;
            this.chart.duration = chartDuration;
        }
    };
    /**
     * Updates the chart axes based on current data and axis bounds.
     *
     * @returns {void}
     */
    Series.prototype.updateChartAxis = function () {
        var maximumLabelWidth = this.yAxis.maxLabelSize.width;
        this.yAxis.baseModule.calculateRangeAndInterval(new Size(this.chart.availableSize.width, this.yAxis.rect.height), this.yAxis);
        if (maximumLabelWidth < this.yAxis.maxLabelSize.width) {
            this.chart.calculateBounds();
            this.chart.axisCollections.forEach(function (axis) {
                if (!setRange(axis)) {
                    axis.updateAxis();
                }
            });
            this.chart.chartAxisLayoutPanel.drawPaneLines(this.chart);
            this.chart.renderAreaBorder();
        }
        else {
            if (!setRange(this.xAxis)) {
                this.xAxis.baseModule.calculateRangeAndInterval(new Size(this.xAxis.rect.width, this.chart.availableSize.height), this.xAxis);
                this.xAxis.updateAxis();
            }
            if (!setRange(this.yAxis)) {
                this.yAxis.updateAxis();
            }
        }
        if (this.chart.stripLineModule) {
            this.chart.stripLineModule.renderStripLine(this.chart, 'Behind', this.chart.axisCollections);
        }
    };
    Series.prototype.updateSeries = function (xAxis, yAxis, index) {
        var seriesCollection = [];
        if (xAxis && yAxis) {
            var set = new Set(this.xAxis.series.concat(this.yAxis.series));
            set.forEach(function (series) {
                seriesCollection.push(series);
            });
        }
        else {
            seriesCollection = xAxis ? this.xAxis.series.slice() : this.yAxis.series.slice();
        }
        for (var _i = 0, seriesCollection_4 = seriesCollection; _i < seriesCollection_4.length; _i++) {
            var series = seriesCollection_4[_i];
            if (series.visible && series.index !== index) {
                findClipRect(series, this.chart.enableCanvas);
                var transform = 'translate(' + this.clipRect.x + ',' + (this.clipRect.y) + ')';
                series.seriesElement.setAttribute('transform', transform);
                series.chart[firstToLowerCase(series.type.replace('100', '')) + 'SeriesModule'].render(series, series.xAxis, series.yAxis, series.chart.requireInvertedAxis, series.chart.enableAnimation);
                if (series.marker.visible && (series.chart.chartAreaType === 'Cartesian') && series.type !== 'Scatter' && series.type !== 'Bubble'
                    && series.type !== 'Candle' && series.type !== 'Hilo' && series.type !== 'HiloOpenClose' && series.symbolElement) {
                    series.symbolElement.setAttribute('transform', transform);
                    appendChildElement(series.chart.enableCanvas, series.chart.seriesElements, series.symbolElement, true);
                }
                if (series.marker.dataLabel.visible && series.chart.dataLabelModule) {
                    series.chart.dataLabelCollections = [];
                    series.chart.dataLabelModule.render(series, series.chart, series.marker.dataLabel);
                    if (series.textElement) {
                        if (series.shapeElement) {
                            series.shapeElement.setAttribute('transform', transform);
                        }
                        appendChildElement(series.chart.enableCanvas, series.chart.dataLabelElements, series.shapeElement, true);
                        series.textElement.setAttribute('transform', transform);
                        appendChildElement(series.chart.enableCanvas, series.chart.dataLabelElements, series.textElement, true);
                    }
                }
                if (series.chart.annotationModule) {
                    series.chart.annotationModule.renderAnnotations(getElement((series.chart.element.id) + '_Secondary_Element'));
                }
            }
        }
    };
    Series.prototype.updatePoint = function (index) {
        var point = new Points();
        var textMappingName = this instanceof Series && this.marker.dataLabel.name ?
            this.marker.dataLabel.name : '';
        var xName = (this instanceof Series && this.type === 'Histogram') ? 'x' : this.xName;
        if (this.xAxis.valueType === 'Category') {
            this.pushCategoryPoint(point, index, textMappingName, xName);
        }
        else if (this.xAxis.valueType.indexOf('DateTime') > -1) {
            var point_1 = this.points[index];
            var option = {
                skeleton: 'full',
                type: 'dateTime'
            };
            var dateParser = this.chart.intl.getDateParser(option);
            var dateFormatter = this.chart.intl.getDateFormat(option);
            this.pushDateTimePoint(point_1, index, textMappingName, xName, dateParser, dateFormatter);
        }
        else {
            this.pushDoublePoint(point, index, textMappingName, xName);
        }
    };
    /**
     * Formats the accessibility description for a chart series.
     *
     * @param {Points} point - Data point containing the values to be formatted.
     * @param {Series} series - Series containing the values to be formatted.
     * @param {string} format - String format with placeholders to be replaced with actual values.
     * @returns {string} The formatted accessibility description string.
     */
    Series.prototype.formatAccessibilityDescription = function (point, series) {
        var format = series.accessibility.accessibilityDescriptionFormat;
        return format
            .replace('${series.name}', series && series.name ? series.name : '')
            .replace('${point.x}', point && point.x ? point.x.toString() : '')
            .replace('${point.y}', point && point.y ? point.y.toString() : '')
            .replace('${point.high}', point && point.high ? point.high.toString() : '')
            .replace('${point.low}', point && point.low ? point.low.toString() : '')
            .replace('${point.close}', point && point.close ? point.close.toString() : '')
            .replace('${point.open}', point && point.open ? point.open.toString() : '')
            .replace('${point.maximum}', point && point.maximum ? point.maximum.toString() : '')
            .replace('${point.minimum}', point && point.minimum ? point.minimum.toString() : '')
            .replace('${point.median}', point && point.median ? point.median.toString() : '')
            .replace('${point.lowerQuartile}', point && point.lowerQuartile ? point.lowerQuartile.toString() : '')
            .replace('${point.upperQuartile}', point && point.upperQuartile ? point.upperQuartile.toString() : '');
    };
    __decorate([
        Property('')
    ], Series.prototype, "name", void 0);
    __decorate([
        Property('')
    ], Series.prototype, "yName", void 0);
    __decorate([
        Property('Line')
    ], Series.prototype, "drawType", void 0);
    __decorate([
        Property(true)
    ], Series.prototype, "isClosed", void 0);
    __decorate([
        Property(null)
    ], Series.prototype, "bearFillColor", void 0);
    __decorate([
        Property(null)
    ], Series.prototype, "bullFillColor", void 0);
    __decorate([
        Property(false)
    ], Series.prototype, "enableSolidCandles", void 0);
    __decorate([
        Property('')
    ], Series.prototype, "size", void 0);
    __decorate([
        Property(null)
    ], Series.prototype, "binInterval", void 0);
    __decorate([
        Property(false)
    ], Series.prototype, "showNormalDistribution", void 0);
    __decorate([
        Property('')
    ], Series.prototype, "stackingGroup", void 0);
    __decorate([
        Complex({ color: null, width: 0 }, Border)
    ], Series.prototype, "border", void 0);
    __decorate([
        Property(1)
    ], Series.prototype, "opacity", void 0);
    __decorate([
        Property(0)
    ], Series.prototype, "zOrder", void 0);
    __decorate([
        Property('')
    ], Series.prototype, "groupName", void 0);
    __decorate([
        Property('Line')
    ], Series.prototype, "type", void 0);
    __decorate([
        Complex(null, ErrorBarSettings)
    ], Series.prototype, "errorBar", void 0);
    __decorate([
        Complex(null, MarkerSettings)
    ], Series.prototype, "marker", void 0);
    __decorate([
        Complex(null, ParetoOptions)
    ], Series.prototype, "paretoOptions", void 0);
    __decorate([
        Complex({}, DragSettings)
    ], Series.prototype, "dragSettings", void 0);
    __decorate([
        Collection([], Trendline)
    ], Series.prototype, "trendlines", void 0);
    __decorate([
        Property(true)
    ], Series.prototype, "enableTooltip", void 0);
    __decorate([
        Property(true)
    ], Series.prototype, "showNearestTooltip", void 0);
    __decorate([
        Property('')
    ], Series.prototype, "tooltipFormat", void 0);
    __decorate([
        Property('')
    ], Series.prototype, "tooltipMappingName", void 0);
    __decorate([
        Property('SeriesType')
    ], Series.prototype, "legendShape", void 0);
    __decorate([
        Property('')
    ], Series.prototype, "legendImageUrl", void 0);
    __decorate([
        Property(null)
    ], Series.prototype, "selectionStyle", void 0);
    __decorate([
        Property(null)
    ], Series.prototype, "unSelectedStyle", void 0);
    __decorate([
        Property(null)
    ], Series.prototype, "nonHighlightStyle", void 0);
    __decorate([
        Property(1)
    ], Series.prototype, "minRadius", void 0);
    __decorate([
        Property(3)
    ], Series.prototype, "maxRadius", void 0);
    __decorate([
        Property('Natural')
    ], Series.prototype, "splineType", void 0);
    __decorate([
        Property(0.5)
    ], Series.prototype, "cardinalSplineTension", void 0);
    __decorate([
        Complex(null, EmptyPointSettings)
    ], Series.prototype, "emptyPointSettings", void 0);
    __decorate([
        Property(true)
    ], Series.prototype, "showMean", void 0);
    __decorate([
        Property('Normal')
    ], Series.prototype, "boxPlotMode", void 0);
    __decorate([
        Property(true)
    ], Series.prototype, "showOutliers", void 0);
    __decorate([
        Property(null)
    ], Series.prototype, "columnWidth", void 0);
    __decorate([
        Property(null)
    ], Series.prototype, "columnWidthInPixel", void 0);
    __decorate([
        Property('Rectangle')
    ], Series.prototype, "columnFacet", void 0);
    __decorate([
        Property(0)
    ], Series.prototype, "columnSpacing", void 0);
    __decorate([
        Property('#C64E4A')
    ], Series.prototype, "negativeFillColor", void 0);
    __decorate([
        Property('#4E81BC')
    ], Series.prototype, "summaryFillColor", void 0);
    __decorate([
        Property()
    ], Series.prototype, "intermediateSumIndexes", void 0);
    __decorate([
        Property()
    ], Series.prototype, "sumIndexes", void 0);
    __decorate([
        Property('Left')
    ], Series.prototype, "step", void 0);
    __decorate([
        Property(false)
    ], Series.prototype, "noRisers", void 0);
    __decorate([
        Complex({}, SeriesAccessibility)
    ], Series.prototype, "accessibility", void 0);
    __decorate([
        Complex({ color: 'black', width: 2 }, Connector)
    ], Series.prototype, "connector", void 0);
    __decorate([
        Complex(null, CornerRadius)
    ], Series.prototype, "cornerRadius", void 0);
    return Series;
}(SeriesBase));
export { Series };
