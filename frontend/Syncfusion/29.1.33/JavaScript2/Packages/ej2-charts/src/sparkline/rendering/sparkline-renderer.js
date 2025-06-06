import { extend, isNullOrUndefined } from '@syncfusion/ej2-base';
import { PathOption, drawPath, drawRectangle, RectOption, Rect, CircleOption, drawCircle, getSeriesColor } from '../utils/helper';
import { measureText, renderTextElement, TextOption } from '../utils/helper';
import { DataManager, Query } from '@syncfusion/ej2-data';
/**
 * Sparkline rendering calculation file
 */
var SparklineRenderer = /** @class */ (function () {
    /**
     * Sparkline data calculations.
     *
     * @param {Sparkline} sparkline - The Sparkline control.
     */
    function SparklineRenderer(sparkline) {
        this.sparkline = sparkline;
    }
    /**
     * To process the sparkline data.
     *
     * @returns {void}
     */
    SparklineRenderer.prototype.processData = function () {
        var data = this.sparkline.dataSource;
        if (isNullOrUndefined(data) || !data.length) {
            return;
        }
        else if (!isNaN(this.sparkline.dataSource[0]) || this.sparkline.valueType === 'Numeric') {
            data = (this.sparkline.enableRtl) ? data.reverse() : data;
            this.sparkline.sparklineData = data; // extend([], data) as Object[];
        }
        else {
            this['process' + this.sparkline.valueType]();
        }
        this.axisCalculation();
    };
    SparklineRenderer.prototype.processDataManager = function () {
        var _this = this;
        var dataModule;
        var queryModule;
        if (this.sparkline.dataSource instanceof DataManager) {
            dataModule = this.sparkline.dataSource;
            queryModule = this.sparkline.query instanceof Query ? this.sparkline.query : new Query();
            var dataManager = dataModule.executeQuery(queryModule);
            dataManager.then(function (e) {
                _this.sparkline.setProperties({ dataSource: e['result'] }, true);
                _this.sparkline.sparklineData = _this.sparkline.dataSource;
                _this.sparkline.processSparklineData();
            });
        }
        else {
            this.sparkline.processSparklineData();
        }
    };
    /**
     * To process sparkline category data.
     *
     * @param {Object[]} data - The data array to process.
     * @param {string} x - The name of the x-field.
     * @param {string} y - The name of the y-field.
     * @returns {void}
     */
    SparklineRenderer.prototype.processCategory = function (data, x, y) {
        var _this = this;
        if (data === void 0) { data = this.sparkline.dataSource; }
        if (x === void 0) { x = this.sparkline.xName; }
        if (y === void 0) { y = this.sparkline.yName; }
        var temp = [];
        var xValues = [];
        data.forEach(function (value) {
            if (xValues.indexOf(value[x]) === -1) {
                xValues.push(value[x]);
            }
            var currentData = {};
            currentData[_this.sparkline.xName] = xValues.indexOf(value[x]);
            currentData[_this.sparkline.yName] = value[y];
            temp.push(currentData);
        });
        this.sparkline.sparklineData = temp;
    };
    /**
     * To process sparkline DateTime data.
     *
     * @param {Object[]} data - The data array to process.
     * @param {string} x - The name of the x-field.
     * @param {string} y - The name of the y-field.
     * @returns {void}
     */
    SparklineRenderer.prototype.processDateTime = function (data, x, y) {
        if (data === void 0) { data = this.sparkline.dataSource; }
        if (x === void 0) { x = this.sparkline.xName; }
        if (y === void 0) { y = this.sparkline.yName; }
        var temp = [];
        data.forEach(function (value) {
            var currentData = {};
            currentData[x] = value[x].getTime();
            currentData[y] = value[y];
            temp.push(currentData);
        });
        this.sparkline.sparklineData = temp;
    };
    /**
     * To render sparkline series.
     *
     * @private
     * @returns {void}
     */
    SparklineRenderer.prototype.renderSeries = function () {
        var _this = this;
        var spark = this.sparkline;
        this.clipId = spark.element.id + '_sparkline_clip_path';
        this.drawAxis();
        var argsData = {
            name: 'seriesRendering',
            cancel: false,
            lineWidth: spark.lineWidth,
            border: spark.border,
            fill: spark.fill,
            sparkline: spark
        };
        var seriesRenderingSuccess = function (args) {
            if (!_this.visiblePoints || args.cancel) {
                return;
            }
            if (spark.type !== 'Pie' && spark.type !== 'WinLoss' && spark.rangeBandSettings.length) {
                var group = _this.sparkline.renderer.createGroup({ id: _this.sparkline.element.id + '_sparkline_rangeband_g' });
                for (var i = 0; i < spark.rangeBandSettings.length; i++) {
                    if ((spark.axisSettings.minY <= spark.rangeBandSettings[i].startRange) ||
                        (spark.axisSettings.maxY >= spark.rangeBandSettings[i].endRange)) {
                        _this.rangeBand(spark.rangeBandSettings[i], group, i);
                    }
                }
                _this.sparkline.svgObject.appendChild(group);
            }
            _this['render' + spark.type](_this.visiblePoints, args);
            _this.renderMarker(_this.visiblePoints);
            _this.renderLabel(_this.visiblePoints);
        };
        seriesRenderingSuccess.bind(this);
        spark.trigger('seriesRendering', argsData, seriesRenderingSuccess);
    };
    /**
     * To render a range band.
     *
     * @param {RangeBandSettingsModel} rangeBandSettings - The settings for the range band.
     * @param {Element} group - The group element to render the range band.
     * @param {number} index - The index of the range band.
     * @returns {void}
     */
    SparklineRenderer.prototype.rangeBand = function (rangeBandSettings, group, index) {
        var model = this.sparkline;
        var height = (model.availableSize.height) - model.padding.top * 2;
        var width = (model.availableSize.width) - model.padding.left * 2;
        var stValue = rangeBandSettings.startRange;
        var edValue = rangeBandSettings.endRange;
        var stHeight = (height - ((height / this.unitY) * (stValue - this.min))) + model.padding.top;
        var edHeight = (height - ((height / this.unitY) * (edValue - this.min))) + model.padding.top;
        var color = rangeBandSettings.color || this.sparkline.sparkTheme.rangeBandColor;
        if (edHeight > (height + model.padding.top)) {
            edHeight = (height + model.padding.top);
        }
        else if (edHeight < (0 + model.padding.top)) {
            edHeight = (0 + model.padding.top);
        }
        if (stHeight > (height + model.padding.top)) {
            stHeight = (height + model.padding.top);
        }
        else if (stHeight < (0 + model.padding.top)) {
            stHeight = (0 + model.padding.top);
        }
        var path = 'M ' + (model.padding.left) + ' ' + stHeight + ' L ' + (width + (model.padding.left)) + ' ' + stHeight +
            ' L ' + (width + (model.padding.left)) + ' ' + edHeight + ' L ' + (model.padding.left) + ' ' + edHeight + ' Z ';
        var pathOption = {
            'id': model.element.id + '_rangeBand_' + index,
            'fill': color,
            'opacity': rangeBandSettings.opacity,
            'stroke': 'transparent',
            'stroke-width': model.lineWidth,
            'd': path,
            'stroke-dasharray': ''
        };
        drawPath(this.sparkline, pathOption, group);
    };
    /**
     * To render line series.
     *
     * @param {SparkValues[]} points - The data points for the line series.
     * @param {ISeriesRenderingEventArgs} args - The rendering event arguments.
     * @returns {void}
     */
    SparklineRenderer.prototype.renderLine = function (points, args) {
        var spark = this.sparkline;
        var g = this.sparkline.renderer.createGroup({
            id: spark.element.id + '_sparkline_g',
            'clip-path': 'url(#' + this.clipId + ')'
        });
        var color = this.sparkline.fill;
        color = (this.sparkline.fill === '#00bdae' && this.sparkline.theme === 'Bootstrap4')
            ? this.sparkline.sparkTheme.axisLineColor : color;
        var pathOption = new PathOption(spark.element.id + '_sparkline_line', 'transparent', args.lineWidth, color, spark.opacity);
        var d = '';
        for (var i = 0, len = points.length; i < len; i++) {
            if (i === 0) {
                d = 'M ' + points[0].x + ' ' + points[i].y + ' ';
            }
            d += 'L ' + points[i].x + ' ' + points[i].y + ' ';
        }
        pathOption.d = d;
        pathOption['aria-label'] = 'Line series with' + points.length + 'data points';
        pathOption['tabindex'] = '0';
        drawPath(this.sparkline, pathOption, g);
        this.sparkline.svgObject.appendChild(g);
    };
    /**
     * To render pie series.
     *
     * @param {SparkValues[]} points - The data points for the pie series.
     * @param {ISeriesRenderingEventArgs} args - The rendering event arguments.
     * @returns {void}
     */
    SparklineRenderer.prototype.renderPie = function (points, args) {
        var spark = this.sparkline;
        var height = spark.availableSize.height - (spark.padding.top + spark.padding.bottom);
        var width = spark.availableSize.width - (spark.padding.left + spark.padding.right);
        var area = (height <= width) ? height / 2 : width / 2;
        var X = spark.availableSize.width / 2; // center position of x
        var Y = spark.availableSize.height / 2; // center position of y
        var deg = 0;
        var stRad;
        var edRad;
        var stroke = args.border.color;
        var opacity = spark.opacity;
        var strokeWidth = args.border.width;
        var colors = (spark.palette.length) ? spark.palette : getSeriesColor(this.sparkline.theme);
        var group = this.sparkline.renderer.createGroup({ id: spark.element.id + '_sparkline_g' });
        var low;
        var high;
        var locations = extend([], [], points);
        if (spark.highPointColor || spark.lowPointColor) {
            var pointsYvalues = locations.map(function (a) { return a.yVal; });
            low = Math.min.apply(null, pointsYvalues);
            high = Math.max.apply(null, pointsYvalues);
        }
        this.negativePointIndexes = [];
        for (var i = 0, stDeg = 90, edDeg = void 0, flag = void 0; i < points.length; i++) {
            stDeg += deg;
            deg = points[i]['degree'];
            deg = (deg === 360 ? deg - 0.001 : deg);
            edDeg = stDeg + deg;
            stRad = (stDeg - 90) * Math.PI / 180.0;
            edRad = (edDeg - 90) * Math.PI / 180.0;
            points[i]['stAng'] = stRad;
            points[i]['endAng'] = edRad;
            flag = (deg < 180) ? '0' : '1';
            var temp = points[i]['coordinates'] = {
                sX: X + (area * Math.cos(stRad)), sY: Y +
                    (area * Math.sin(stRad)), eX: X + (area * Math.cos(edRad)), eY: Y + (area * Math.sin(edRad))
            };
            var pathArc = 'M ' + X + ' ' + Y + ' L ' + temp['eX'] + ' ' + temp['eY'] + ' A ' + area + ' ' +
                area + ' 0 ' + flag + ',0 ' + temp['sX'] + ' ' + temp['sY'] + ' Z';
            var pathOption = {
                'id': spark.element.id + '_sparkline_pie_' + i,
                'opacity': opacity,
                'fill': colors[i % colors.length],
                'stroke': stroke,
                'stroke-width': strokeWidth,
                'd': pathArc,
                'stroke-dasharray': ''
            };
            this.getPieSpecialPoint(points[i], spark, pathOption, i, high, low, points.length);
            var pointArgs = this.triggerPointRender('pointRendering', i, pathOption.fill, { color: stroke, width: strokeWidth });
            pathOption.fill = pointArgs.fill;
            pathOption.stroke = pointArgs.border.color;
            pathOption['stroke-width'] = pointArgs.border.width;
            if (!pointArgs.cancel) {
                var element = drawPath(this.sparkline, pathOption, group);
                element.setAttribute('role', 'img');
                element.setAttribute('aria-label', spark.dataSource[i][spark.xName] + ' : ' + points[i].yVal);
                element.setAttribute('tabindex', i === 0 ? '0' : '-1');
                element.style.outline = 'none';
            }
            var diffRadian = edRad - stRad;
            var mid = {
                x: X + ((area / 2) * Math.cos(stRad + (diffRadian / 2))),
                y: Y + ((area / 2) * Math.sin(stRad + (diffRadian / 2)))
            };
            points[i].location.x = mid.x;
            points[i].location.y = mid.y;
        }
        this.sparkline.svgObject.appendChild(group);
    };
    /**
     * To get special point color and option for Pie series.
     *
     * @param {SparkValues} temp - The data point for the special point.
     * @param {Sparkline} spark - The sparkline instance.
     * @param {PathOption} option - The option for the special point.
     * @param {number} i - The index of the special point.
     * @param {number} high - The high value.
     * @param {number} low - The low value.
     * @param {number} length - The total number of data points.
     * @returns {void}
     */
    SparklineRenderer.prototype.getPieSpecialPoint = function (temp, spark, option, i, high, low, length) {
        if (temp.yVal < 0 && spark.negativePointColor) {
            option.fill = spark.negativePointColor;
            this.negativePointIndexes.push(i);
        }
        if (i === 0 && spark.startPointColor) {
            option.fill = spark.startPointColor;
            this.startPointIndex = i;
        }
        else if ((i === (length - 1)) && spark.endPointColor) {
            option.fill = spark.endPointColor;
            this.endPointIndex = i;
        }
        if (temp.yVal === high && spark.highPointColor) {
            option.fill = spark.highPointColor;
            this.highPointIndex = i;
        }
        else if (temp.yVal === low && spark.lowPointColor) {
            option.fill = spark.lowPointColor;
            this.lowPointIndex = i;
        }
    };
    /**
     * To render area series.
     *
     * @param {SparkValues[]} points - The data points for the area series.
     * @param {ISeriesRenderingEventArgs} args - The rendering event arguments.
     * @returns {void}
     */
    SparklineRenderer.prototype.renderArea = function (points, args) {
        var spark = this.sparkline;
        var group = this.sparkline.renderer.createGroup({
            id: spark.element.id + '_sparkline_g',
            'clip-path': 'url(#' + this.clipId + ')'
        });
        var pathOption = new PathOption(spark.element.id + '_sparkline_area', args.fill, 0, 'transparent', spark.opacity);
        var d = '';
        var str = '';
        for (var i = 0, len = points.length; i < len; i++) {
            if (i !== 0) {
                str += 'L ' + points[i].x + ' ' + points[i].y + ' ';
            }
            else {
                d = 'M ' + points[i].x + ' ' + this.axisHeight + ' ';
                str = 'M ' + points[i].x + ' ' + points[i].y + ' ';
            }
            d += 'L ' + points[i].x + ' ' + points[i].y + ' ';
            if (i === (len - 1)) {
                d += 'L ' + points[i].x + ' ' + this.axisHeight + ' Z';
            }
        }
        pathOption.d = d;
        pathOption['aria-label'] = 'Area series with' + points.length + 'data points';
        drawPath(this.sparkline, pathOption, group);
        pathOption = new PathOption(spark.element.id + '_sparkline_area_str', 'transparent', args.border.width, args.border.color, spark.opacity, '', str);
        drawPath(this.sparkline, pathOption, group);
        this.sparkline.svgObject.appendChild(group);
    };
    /**
     * To render column series.
     *
     * @param {SparkValues[]} points - The data points for the column series.
     * @param {ISeriesRenderingEventArgs} args - The rendering event arguments.
     * @returns {void}
     */
    SparklineRenderer.prototype.renderColumn = function (points, args) {
        var _this = this;
        var spark = this.sparkline;
        var locations = extend([], [], points);
        var group = this.sparkline.renderer.createGroup({
            id: spark.element.id + '_sparkline_g',
            'clip-path': 'url(#' + this.clipId + ')'
        });
        var lowPos;
        var highPos;
        if (this.sparkline.highPointColor || this.sparkline.lowPointColor) {
            var pointsYPos = locations.map(function (a) { return a.markerPosition; });
            highPos = Math.min.apply(null, pointsYPos);
            lowPos = Math.max.apply(null, pointsYPos);
        }
        var id = spark.element.id + '_sparkline_column_';
        var rectOptions = new RectOption(id, '', args.border, spark.opacity, null);
        var temp;
        var len = points.length;
        this.negativePointIndexes = [];
        var colors = (spark.palette.length) ? spark.palette : getSeriesColor(this.sparkline.theme);
        var _loop_1 = function (i) {
            temp = points[i];
            rectOptions.id = id + i;
            rectOptions.fill = spark.fill !== '#00bdae' ? spark.fill : colors[0];
            rectOptions.rect = new Rect(temp.x, temp.y, temp.width, temp.height);
            this_1.getSpecialPoint(true, temp, spark, rectOptions, i, highPos, lowPos, len);
            temp.location.y = (temp.markerPosition <= this_1.axisHeight) ? temp.y : (temp.y + temp.height);
            temp.location.x = temp.x + (temp.width / 2);
            rectOptions.stroke = args.border.color ? (args.border.color) : rectOptions.fill;
            var pointArgs = {
                name: 'pointRendering', cancel: false, pointIndex: i, fill: rectOptions.fill,
                border: { color: rectOptions.stroke, width: args.border.width }
            };
            this_1.sparkline.trigger('pointRendering', pointArgs, function () {
                temp = points[i];
                rectOptions.id = id + i;
                rectOptions.rect = new Rect(temp.x, temp.y, temp.width, temp.height);
                _this.getSpecialPoint(true, temp, spark, rectOptions, i, highPos, lowPos, len);
                rectOptions.fill = pointArgs.fill;
                rectOptions.stroke = pointArgs.border.color;
                temp.location.y = (temp.markerPosition <= _this.axisHeight) ? temp.y : (temp.y + temp.height);
                rectOptions['stroke-width'] = pointArgs.border.width;
                temp.location.x = temp.x + (temp.width / 2);
                if (!pointArgs.cancel) {
                    var element = drawRectangle(spark, rectOptions, group);
                    element.setAttribute('role', 'img');
                    element.setAttribute('aria-label', spark.dataSource[i][spark.xName] + ' : ' + points[i].yVal);
                    element.setAttribute('tabindex', i === 0 ? '0' : '-1');
                    element.style.outline = 'none';
                    group.appendChild(element);
                }
            });
        };
        var this_1 = this;
        for (var i = 0; i < len; i++) {
            _loop_1(i);
        }
        this.sparkline.svgObject.appendChild(group);
    };
    /**
     * To render WinLoss series.
     *
     * @param {SparkValues[]} points - The data points for the winloss series.
     * @param {ISeriesRenderingEventArgs} args - The rendering event arguments.
     * @returns {void}
     */
    SparklineRenderer.prototype.renderWinLoss = function (points, args) {
        var spark = this.sparkline;
        var group = this.sparkline.renderer.createGroup({
            id: spark.element.id + '_sparkline_g',
            'clip-path': 'url(#' + this.clipId + ')'
        });
        var id = spark.element.id + '_sparkline_winloss_';
        var options = new RectOption(id, '', args.border, spark.opacity, null);
        var temp;
        var len = points.length;
        var paletteLength = spark.palette.length;
        var colors = (spark.palette.length) ? spark.palette : getSeriesColor(this.sparkline.theme);
        for (var i = 0; i < len; i++) {
            temp = points[i];
            options.id = id + i;
            options.fill = (paletteLength) ? spark.palette[i % paletteLength] : ((temp.yVal === this.axisValue) ?
                (this.sparkline.tiePointColor || '#a216f3') : ((temp.yVal > this.axisValue) ? args.fill || colors[i % colors.length] :
                (spark.negativePointColor || '#e20f07')));
            options.stroke = (args.border.color) ? (args.border.color) : options.fill;
            options.rect = new Rect(temp.x, temp.y, temp.width, temp.height);
            temp.location.x = temp.x + (temp.width / 2);
            temp.location.y = (temp.yVal >= this.axisValue) ? (temp.y) : (temp.y + temp.height);
            var pointArgs = this.triggerPointRender('pointRendering', i, options.fill, { color: options.stroke, width: args.border.width });
            options.fill = pointArgs.fill;
            options.stroke = pointArgs.border.color;
            options['stroke-width'] = pointArgs.border.width;
            if (!pointArgs.cancel) {
                var element = drawRectangle(spark, options, group);
                element.setAttribute('role', 'img');
                element.setAttribute('aria-label', spark.dataSource[i][spark.xName] + ' : ' + points[i].yVal);
                element.setAttribute('tabindex', i === 0 ? '0' : '-1');
                element.style.outline = 'none';
            }
        }
        this.sparkline.svgObject.appendChild(group);
    };
    SparklineRenderer.prototype.renderMarker = function (points) {
        var _this = this;
        var spark = this.sparkline;
        var marker = spark.markerSettings;
        if ((spark.type === 'Pie' || spark.type === 'WinLoss' || !marker.visible.length)) {
            return;
        }
        var locations = extend([], [], points);
        var group = this.sparkline.renderer.createGroup({
            id: spark.element.id + '_sparkline_marker_g',
            'clip-path': 'url(#' + this.clipId + ')'
        });
        var temp;
        var id = spark.element.id + '_sparkline_marker_';
        var option = new CircleOption('', marker.fill, marker.border, marker.opacity, 0, 0, marker.size / 2, '');
        var highPos;
        var lowPos;
        var visible = marker.visible.join();
        if ((visible.toLowerCase().indexOf('high') > -1) || (visible.toLowerCase().indexOf('low') > -1)) {
            var pointsYPos = locations.map(function (a) { return a.markerPosition; });
            highPos = Math.min.apply(null, pointsYPos);
            lowPos = Math.max.apply(null, pointsYPos);
        }
        this.negativePointIndexes = [];
        var _loop_2 = function (i, length_1) {
            temp = points[i];
            option.id = id + i;
            option.cx = temp.location.x;
            option.cy = temp.location.y;
            option.fill = marker.fill;
            var render = (visible.toLowerCase().indexOf('all') > -1);
            render = this_2.getSpecialPoint(render, temp, spark, option, i, highPos, lowPos, length_1, visible.toLowerCase());
            option.stroke = marker.border.color || option.fill;
            var markerArgs = {
                name: 'markerRendering', cancel: false,
                border: { color: option.stroke, width: marker.border.width },
                fill: option.fill, pointIndex: i,
                sparkline: this_2.sparkline,
                x: option.cx, y: option.cy, size: marker.size
            };
            this_2.sparkline.trigger('markerRendering', markerArgs, function () {
                if (render && !markerArgs.cancel) {
                    option.id = id + i;
                    option.cx = markerArgs.x;
                    option.cy = markerArgs.y;
                    option.fill = markerArgs.fill;
                    option.stroke = markerArgs.border.color;
                    option['stroke-width'] = markerArgs.border.width;
                    option.r = markerArgs.size / 2;
                    var element = drawCircle(spark, option, group);
                    element.setAttribute('role', 'img');
                    element.setAttribute('aria-label', spark.dataSource[i][spark.xName] + ' : ' + points[i].yVal);
                    if ((_this.sparkline.type.indexOf('Line') > -1) || (_this.sparkline.type.indexOf('Area') > -1)) {
                        element.setAttribute('tabindex', i === 0 ? '0' : '-1');
                        element.style.outline = 'none';
                    }
                    group.appendChild(element);
                }
            });
        };
        var this_2 = this;
        for (var i = 0, length_1 = points.length; i < length_1; i++) {
            _loop_2(i, length_1);
        }
        this.sparkline.svgObject.appendChild(group);
    };
    /**
     * To get special point color and option.
     *
     * @param {boolean} render - Indicates whether to render the special point.
     * @param {SparkValues} temp - The data point for the special point.
     * @param {Sparkline} spark - The sparkline instance.
     * @param {PathOption} option - The option for the special point.
     * @param {number} i - The index of the special point.
     * @param {number} highPos - The position of the high value.
     * @param {number} lowPos - The position of the low value.
     * @param {number} length - The total number of data points.
     * @param {string} visible - The visibility state of the special point.
     * @returns {boolean} - Indicates whether the special point is rendered.
     */
    SparklineRenderer.prototype.getSpecialPoint = function (render, temp, spark, option, i, highPos, lowPos, length, visible) {
        if (visible === void 0) { visible = ''; }
        if (temp.markerPosition > this.axisHeight) {
            option.fill = spark.negativePointColor || option.fill;
            this.negativePointIndexes.push(i);
            render = render || (visible.indexOf('negative') > -1);
        }
        if (i === 0) {
            option.fill = spark.startPointColor || option.fill;
            this.startPointIndex = i;
            render = render || (visible.indexOf('start') > -1);
        }
        else if ((i === (length - 1))) {
            option.fill = spark.endPointColor || option.fill;
            this.endPointIndex = i;
            render = render || (visible.indexOf('end') > -1);
        }
        if (temp.markerPosition === highPos) {
            option.fill = spark.highPointColor || option.fill;
            this.highPointIndex = i;
            render = render || (visible.indexOf('high') > -1);
        }
        else if (temp.markerPosition === lowPos) {
            option.fill = spark.lowPointColor || option.fill;
            this.lowPointIndex = i;
            render = render || (visible.indexOf('low') > -1);
        }
        if (visible.indexOf('none') > -1) {
            render = false;
        }
        return render;
    };
    /**
     * To render data label for sparkline.
     *
     * @param {SparkValues[]} points - The data points for the series datalabels.
     * @returns {void}
     */
    SparklineRenderer.prototype.renderLabel = function (points) {
        var _this = this;
        var spark = this.sparkline;
        var dataLabel = spark.dataLabelSettings;
        var color = dataLabel.textStyle.color || spark.sparkTheme.dataLabelColor;
        if ((spark.type === 'WinLoss' || !dataLabel.visible.length)) {
            return;
        }
        var locations = extend([], [], points);
        var id = spark.element.id + '_sparkline_label_';
        var group = this.sparkline.renderer.createGroup({
            id: spark.element.id + '_sparkline_label_g',
            style: 'pointer-events: none;'
        });
        group.setAttribute('aria-hidden', 'true');
        var g;
        var temp;
        var textId = id + 'text_';
        var rectId = id + 'rect_';
        var option = new TextOption('', 0, 0, 'middle', '', 'middle');
        var labelStyle = dataLabel.textStyle;
        var pointsYPos = locations.map(function (a) { return a.markerPosition; });
        var highPos = Math.min.apply(null, pointsYPos);
        var lowPos = Math.max.apply(null, pointsYPos);
        var space = 1;
        var padding = (dataLabel.fill !== 'transparent' || dataLabel.border.width) ? 2 : 0;
        var size = measureText('sparkline_measure_text', labelStyle, this.sparkline.sparkTheme.dataLabelFont);
        var rectOptions = new RectOption('', dataLabel.fill, dataLabel.border, dataLabel.opacity, null);
        var edgeLabelOption;
        var _loop_3 = function (i, length_2) {
            temp = points[i];
            option.id = textId + i;
            option.x = temp.location.x + dataLabel.offset.x;
            option.y = ((spark.type === 'Pie') ? temp.location.y : ((temp.markerPosition > this_3.axisHeight) ? (temp.location.y +
                (size.height / 2) + space + 2 + padding) : (temp.location.y - (size.height / 2) - space - padding))) + dataLabel.offset.y;
            option.text = (dataLabel.format !== '') ? this_3.formatter(dataLabel.format, this_3.sparkline.dataSource[i]) :
                temp.yVal.toString();
            var labelArgs = {
                name: 'dataLabelRendering', cancel: false,
                border: dataLabel.border, fill: dataLabel.fill, pointIndex: i,
                sparkline: this_3.sparkline,
                x: option.x, y: option.y, text: option.text, color: color
            };
            this_3.sparkline.trigger('dataLabelRendering', labelArgs, function () {
                size = measureText(labelArgs.text, labelStyle, _this.sparkline.sparkTheme.dataLabelFont);
                option.text = labelArgs.text;
                var renderLabel = (dataLabel.visible.join().toLowerCase().indexOf('all') > -1);
                renderLabel = _this.getLabelVisible(renderLabel, temp, i, dataLabel, length_2, highPos, lowPos);
                edgeLabelOption = _this.arrangeLabelPosition(dataLabel.edgeLabelMode, renderLabel, labelArgs.x, i, length_2, size, padding);
                if (renderLabel && !labelArgs.cancel && edgeLabelOption.render) {
                    rectOptions.id = rectId + i;
                    rectOptions.fill = labelArgs.fill;
                    rectOptions.stroke = labelArgs.border.color;
                    rectOptions['stroke-width'] = labelArgs.border.width;
                    option.y = labelArgs.y;
                    option.x = edgeLabelOption.x;
                    rectOptions.rect = new Rect(option.x - ((size.width / 2) + padding), (option.y - padding - (size.height / 1.75)), size.width + (padding * 2), size.height + (padding * 2));
                    g = _this.sparkline.renderer.createGroup({ id: id + 'g' + i });
                    drawRectangle(spark, rectOptions, g);
                    renderTextElement(option, labelStyle, labelArgs.color, g, _this.sparkline.sparkTheme.dataLabelFont);
                    group.appendChild(g);
                }
            });
        };
        var this_3 = this;
        for (var i = 0, length_2 = points.length; i < length_2; i++) {
            _loop_3(i, length_2);
        }
        this.sparkline.svgObject.appendChild(group);
    };
    SparklineRenderer.prototype.arrangeLabelPosition = function (edgeLabel, render, x, index, length, size, padding) {
        if (edgeLabel === 'None') {
            return { x: x, render: render };
        }
        if (index === 0 && ((x - (size.width / 2) - padding) <= 0)) {
            if (edgeLabel === 'Hide') {
                render = false;
            }
            else {
                x = this.sparkline.padding.left + padding + (size.width / 2);
            }
        }
        else if (index === length - 1 && ((x + (size.width / 2) + padding) >= this.sparkline.availableSize.width)) {
            if (edgeLabel === 'Hide') {
                render = false;
            }
            else {
                x -= (size.width / 2 + padding);
            }
        }
        return { x: x, render: render };
    };
    /**
     * To get special point color and option.
     *
     * @param {boolean} render - Indicates whether to render the special point.
     * @param {SparkValues} temp - The data point for the special point.
     * @param {number} i - The index of the sparkline instance.
     * @param {SparklineDataLabelSettingsModel} label - The options for the special point.
     * @param {number} length - The total number of data points.
     * @param {number} highPos - The position of the high value.
     * @param {number} lowPos - The position of the low value.
     * @returns {boolean} - Indicates whether the special point is rendered.
     */
    SparklineRenderer.prototype.getLabelVisible = function (render, temp, i, label, length, highPos, lowPos) {
        var labelVisible = label.visible.join().toLowerCase();
        if (temp.markerPosition > this.axisHeight) {
            render = render || (labelVisible.indexOf('negative') > -1);
        }
        if (i === 0) {
            render = render || (labelVisible.indexOf('start') > -1);
        }
        else if ((i === (length - 1))) {
            render = render || (labelVisible.indexOf('end') > -1);
        }
        if (temp.markerPosition === highPos) {
            render = render || (labelVisible.indexOf('high') > -1);
        }
        else if (temp.markerPosition === lowPos) {
            render = render || (labelVisible.indexOf('low') > -1);
        }
        if (label.visible.join().toLowerCase().indexOf('none') > -1) {
            render = false;
        }
        return render;
    };
    /**
     * To format text.
     *
     * @param {string} format - The format string to apply.
     * @param {object} data - The data object to format.
     * @returns {string} - The formatted text.
     */
    SparklineRenderer.prototype.formatter = function (format, data) {
        if (isNullOrUndefined(format)) {
            return null;
        }
        var keys = Object.keys(data);
        for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
            var key = keys_1[_i];
            format = format.split('${' + key + '}').join(data[key]);
        }
        return format;
    };
    /**
     * To calculate min and max for x and y axis.
     *
     * @returns {void}
     */
    SparklineRenderer.prototype.axisCalculation = function () {
        this.findRanges(this.sparkline.sparklineData);
    };
    /**
     * To find x axis interval.
     *
     * @param {Object[]} data - The data points.
     * @param {string} x - The x-axis field name.
     * @returns {number} - The calculated interval.
     */
    SparklineRenderer.prototype.getInterval = function (data, x) {
        var interval = 1;
        var x1 = data[0][x];
        var x2 = isNullOrUndefined(data[1]) ? undefined : data[1][x];
        if (!isNullOrUndefined(x1) && !isNullOrUndefined(x2)) {
            var temp = extend([], data);
            var validData_1 = [];
            temp.forEach(function (value) {
                if (!isNullOrUndefined(value[x])) {
                    validData_1.push(value);
                }
            });
            validData_1.sort(function (a, b) {
                if (isNullOrUndefined(a[x]) || isNullOrUndefined(b[x])) {
                    return 0;
                }
                return a[x] - b[x];
            });
            validData_1 = (this.sparkline.enableRtl) ? validData_1.reverse() : validData_1;
            interval = validData_1[1][x] - validData_1[0][x];
        }
        return interval;
    };
    /**
     * To find x axis interval for padding.
     *
     * @param {Object[]} data - The data points.
     * @param {string} x - The x-axis field name.
     * @param {SparklineValueType} type - The type of sparkline value.
     * @param {number} delta - The delta values.
     * @returns {number} - The calculated x-axis interval for padding.
     */
    SparklineRenderer.prototype.getPaddingInterval = function (data, x, type, delta) {
        var interval = 1;
        var size = this.sparkline.availableSize.height;
        var intervalCount = interval * data.length;
        intervalCount = Math.max((size * (intervalCount / 100)), 1);
        var niceInterval = delta / intervalCount;
        for (var _i = 0, _a = this.sparkline.intervalDivs; _i < _a.length; _i++) {
            var intervalVal = _a[_i];
            var currentInterval = interval * intervalVal;
            if (intervalCount < (delta / currentInterval)) {
                break;
            }
            niceInterval = currentInterval;
        }
        return niceInterval;
    };
    /**
     * To calculate axis ranges internally.
     *
     * @param {Object[]} data - The data points.
     * @returns {void}
     */
    SparklineRenderer.prototype.findRanges = function (data) {
        var model = this.sparkline;
        var max;
        var min;
        var minX;
        var maxX;
        var maxPointsLength = data.length;
        var temp;
        var sumofValues = 0;
        var isNumericArray = Array.isArray(data) && typeof data[0] !== 'object';
        if (isNumericArray) {
            if (model.type === 'Pie') {
                for (var i = 0; i < maxPointsLength; i++) {
                    sumofValues += Math.abs(data[i]);
                }
            }
            else {
                max = Math.max.apply(null, data);
                min = Math.min.apply(null, data);
                minX = 0;
                maxX = maxPointsLength - 1;
            }
        }
        else {
            if (model.type === 'Pie') {
                for (var i = 0; i < maxPointsLength; i++) {
                    sumofValues += Math.abs(data[i][model.yName]);
                }
            }
            else {
                if (isNullOrUndefined(data[0][model.xName])) {
                    var x_1 = data.map(function (z) { return z[model.yName]; });
                    max = Math.max.apply(null, x_1);
                    min = Math.min.apply(null, x_1);
                }
                else {
                    temp = extend([], data);
                    temp = temp.sort(function (a, b) { return a[model.yName] - b[model.yName]; });
                    max = temp[temp.length - 1][model.yName];
                    min = temp[0][model.yName];
                }
                if (!isNullOrUndefined(data[0][model.xName])) {
                    temp = temp.sort(function (a, b) { return a[model.xName] - b[model.xName]; });
                    temp = (this.sparkline.enableRtl) ? temp.reverse() : temp;
                    maxX = temp[temp.length - 1][model.xName];
                    minX = temp[0][model.xName];
                }
                else {
                    minX = 0;
                    maxX = maxPointsLength - 1;
                }
            }
        }
        var y2;
        var height;
        var width;
        var x1 = 0;
        var y1;
        var padding = model.padding;
        var point;
        var axis = model.axisSettings;
        var value = axis.value;
        if (model.type !== 'Pie') {
            this.maxLength = maxPointsLength;
            height = model.availableSize.height - (padding.bottom + padding.top);
            width = model.availableSize.width - (padding.left + padding.right);
            maxX = isNullOrUndefined(axis.maxX) ? maxX : axis.maxX;
            minX = isNullOrUndefined(axis.minX) ? minX : axis.minX;
            max = isNullOrUndefined(axis.maxY) ? max : axis.maxY;
            min = isNullOrUndefined(axis.minY) ? min : axis.minY;
            var color = axis.lineSettings.color || this.sparkline.sparkTheme.axisLineColor;
            var eventArgs = {
                name: 'axisRendering', cancel: false, sparkline: model,
                maxX: maxX, minX: minX, maxY: max, minY: min, value: axis.value,
                lineColor: color, lineWidth: axis.lineSettings.width
            };
            model.trigger('axisRendering', eventArgs);
            if (eventArgs.cancel) {
                this.visiblePoints = [];
                return;
            }
            maxX = eventArgs.maxX;
            minX = eventArgs.minX;
            max = eventArgs.maxY;
            min = eventArgs.minY;
            value = this.axisValue = eventArgs.value;
            this.axisColor = eventArgs.lineColor;
            this.axisWidth = eventArgs.lineWidth;
        }
        var unitX = maxX - minX;
        var unitY = max - min;
        unitX = (unitX === 0) ? 1 : unitX;
        unitY = (unitY === 0) ? 1 : unitY;
        this.unitX = unitX;
        this.unitY = unitY;
        this.min = min;
        x1 = 0;
        y1 = height - ((height / unitY) * (-min));
        y1 = (min < 0 && max <= 0) ? 0 : (min < 0 && max > 0) ? y1 : height;
        if (value >= min && value <= max) {
            y1 = height - Math.round(height * ((value - min) / this.unitY));
        }
        this.axisHeight = y1 + padding.top;
        var percent;
        var x;
        var y;
        var visiblePoints = [];
        var delta = max - min;
        var interval = this.getInterval(data, model.xName);
        var interVal = this.getPaddingInterval(data, model.xName, model.valueType, delta);
        for (var i = 0; i < maxPointsLength; i++) {
            if (isNullOrUndefined(data[i][model.xName]) && isNullOrUndefined(data[i][model.yName]) &&
                ((data[i][model.yName]) !== 0) && isNumericArray) {
                x = i;
                y = data[i];
            }
            else if (isNullOrUndefined(data[i][model.xName])) {
                x = i;
                y = data[i][model.yName];
            }
            else {
                x = data[i][model.xName];
                y = data[i][model.yName];
            }
            if (isNullOrUndefined(x) || isNullOrUndefined(y)) {
                continue;
            }
            if (model.type === 'Line' || model.type === 'Area') {
                y2 = (min !== max && maxPointsLength !== 1) ? height - Math.round(height * ((y - min) / this.unitY)) : padding.top;
                point = { x: (minX !== maxX) ? Math.round(width * ((x - minX) / this.unitX)) : width / 2, y: y2, markerPosition: y2 };
            }
            else if (model.type === 'Column' || model.type === 'WinLoss') {
                var colWidth = width / (((maxX - minX) / interval) + 1);
                var calSpace = 0.5;
                var space = (calSpace * 2); //calspace is default space for column and winloss
                colWidth -= (space);
                x1 = (((x - minX) / interval) * (colWidth + space)) + (space / 2);
                if (model.type === 'WinLoss') {
                    // win or gain column height half of the height , draw(zero) height factor
                    var winLossFactor = 0.5;
                    var drawHeightFactor = 40;
                    y2 = (y > value) ? (height / 4) : (y < value) ? (height * winLossFactor) :
                        ((height * winLossFactor) - (height / drawHeightFactor));
                    point = {
                        x: x1, y: y2, height: (y !== value) ? (height / 4) : height / 20, width: colWidth,
                        markerPosition: (y2 > y1) ? (y1 + Math.abs(y2 - y1)) : y2
                    };
                }
                else {
                    if (i === 0 && model.rangePadding !== 'None') {
                        min -= model.rangePadding === 'Additional' ? (interVal + padding.top) : interVal;
                        max += model.rangePadding === 'Additional' ? (interVal + padding.top) : interVal;
                        unitX = maxX - minX;
                        unitY = max - min;
                        unitX = (unitX === 0) ? 1 : unitX;
                        unitY = (unitY === 0) ? 1 : unitY;
                        this.unitX = unitX;
                        this.unitY = unitY;
                        this.min = min;
                    }
                    var z = ((height / this.unitY) * (y - min));
                    var z1 = (y === min && y > value) ? ((maxPointsLength !== 1 && this.unitY !== 1) ?
                        (height / this.unitY) * (min / 2) : (z | 1)) :
                        (y === max && y < value && maxPointsLength !== 1 && this.unitY !== 1) ? (height / this.unitY) * (-max / 2) : z;
                    y2 = Math.abs(height - z1);
                    point = {
                        x: x1, y: (y2 > y1) ? y1 : y2, height: Math.abs(y2 - y1),
                        width: colWidth, markerPosition: (y2 > y1) ? (y1 + Math.abs(y2 - y1)) : y2
                    };
                }
            }
            else if (model.type === 'Pie') {
                percent = (Math.abs(y) / sumofValues) * 100;
                point = {
                    percent: percent, degree: ((Math.abs(y) / sumofValues) * 360)
                };
            }
            if (model.type !== 'Pie') {
                point.x += padding.left;
                point.y += padding.top;
            }
            if (model.type !== 'WinLoss') {
                point.markerPosition += padding.top;
            }
            point.location = { x: point.x, y: point.y };
            point.xVal = x;
            point.yVal = y;
            visiblePoints.push(point);
        }
        visiblePoints.sort(function (a, b) {
            return a.x - b.x;
        });
        this.visiblePoints = visiblePoints;
    };
    /**
     * To render the sparkline axis.
     *
     * @returns {void}
     */
    SparklineRenderer.prototype.drawAxis = function () {
        var spark = this.sparkline;
        var height = this.axisHeight;
        if ((spark.type !== 'WinLoss') && (spark.type !== 'Pie') && spark.axisSettings.lineSettings.visible) {
            var xAxis = {
                'id': spark.element.id + '_Sparkline_XAxis',
                'x1': spark.padding.left, 'y1': height,
                'x2': spark.availableSize.width - spark.padding.right, 'y2': height,
                'stroke': this.axisColor,
                'opacity': spark.axisSettings.lineSettings.opacity,
                'stroke-dasharray': spark.axisSettings.lineSettings.dashArray,
                'stroke-width': this.axisWidth,
                'clip-path': 'url(#' + this.clipId + ')'
            };
            spark.svgObject.appendChild(spark.renderer.drawLine(xAxis));
        }
    };
    /**
     * To trigger point render event.
     *
     * @param {string} name - The name of the data point.
     * @param {number} i - The index of the data point.
     * @param {string} fill - The fill color of the data point.
     * @param {SparklineBorderModel} border - The border settings of the data point.
     * @returns {ISparklinePointEventArgs} - The event arguments for the point render event.
     */
    SparklineRenderer.prototype.triggerPointRender = function (name, i, fill, border) {
        var args = {
            name: name, cancel: false,
            border: border, fill: fill,
            sparkline: this.sparkline,
            pointIndex: i
        };
        this.sparkline.trigger(name, args);
        return args;
    };
    return SparklineRenderer;
}());
export { SparklineRenderer };
