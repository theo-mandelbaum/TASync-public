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
import { extend, Browser, remove } from '@syncfusion/ej2-base';
import { PointData, ChartLocation } from '../../common/utils/helper';
import { getElement, measureText, Rect } from '@syncfusion/ej2-svg-base';
import { removeElement, withInBounds } from '../../common/utils/helper';
import { BaseTooltip } from '../../common/user-interaction/tooltip';
import { tooltipRender, sharedTooltipRender } from '../../common/model/constants';
import { isNullOrUndefined } from '@syncfusion/ej2-base';
/**
 * The `Tooltip` module is used to render tooltips for chart series.
 */
var Tooltip = /** @class */ (function (_super) {
    __extends(Tooltip, _super);
    /**
     * Constructor for the Touch module.
     *
     * @param {Chart} chart - The chart instance.
     */
    function Tooltip(chart) {
        var _this = _super.call(this, chart) || this;
        _this.commonXvalues = [];
        _this.addEventListener();
        return _this;
    }
    /**
     * Adds event listeners for the chart.
     *
     * @returns {void}
     */
    Tooltip.prototype.addEventListener = function () {
        if (this.chart.isDestroyed) {
            return;
        }
        var cancelEvent = Browser.isPointer ? 'pointerleave' : 'mouseleave';
        this.chart.on(cancelEvent, this.mouseLeaveHandler, this);
        this.chart.on('tapHold', this.longPress, this);
        this.chart.on(Browser.touchMoveEvent, this.mouseMoveHandler, this);
        this.chart.on(Browser.touchEndEvent, this.mouseUpHandler, this);
    };
    Tooltip.prototype.mouseUpHandler = function () {
        var chart = this.control;
        var data = this.getData();
        data.lierIndex = this.lierIndex;
        if (chart.isTouch && !this.isSelected(chart) &&
            ((withInBounds(chart.mouseX, chart.mouseY, chart.chartAxisLayoutPanel.seriesClipRect) && chart.tooltip.shared)
                || !chart.tooltip.shared)) {
            if (!chart.crosshair.enable) {
                this.tooltip();
                if (chart.tooltip.fadeOutMode === 'Move') {
                    this.removeTooltip(chart.tooltip.fadeOutDuration);
                }
            }
            else if (chart.startMove && chart.tooltip.fadeOutMode === 'Move') {
                this.removeTooltip(2000);
            }
        }
        else if (!this.findData(data, this.previousPoints[0]) && chart.tooltip.fadeOutMode === 'Click') {
            this.removeTooltip(0);
        }
    };
    Tooltip.prototype.mouseLeaveHandler = function () {
        this.removeTooltip(this.chart.tooltip.fadeOutDuration);
    };
    Tooltip.prototype.mouseMoveHandler = function () {
        var chart = this.chart;
        if (chart.stockChart && chart.stockChart.onPanning) {
            if (chart.mouseY < chart.chartAxisLayoutPanel.seriesClipRect.y) {
                chart.mouseY = chart.chartAxisLayoutPanel.seriesClipRect.y;
            }
            else if (chart.mouseY > chart.chartAxisLayoutPanel.seriesClipRect.y + chart.chartAxisLayoutPanel.seriesClipRect.height) {
                chart.mouseY = chart.chartAxisLayoutPanel.seriesClipRect.y + chart.chartAxisLayoutPanel.seriesClipRect.height;
            }
        }
        // Tooltip for chart series.
        if (!chart.disableTrackTooltip && !this.isSelected(chart)) {
            if (!chart.tooltip.shared && (!chart.isTouch || (chart.startMove))) {
                this.tooltip();
            }
            if (withInBounds(chart.mouseX, chart.mouseY, chart.chartAxisLayoutPanel.seriesClipRect)) {
                if (chart.tooltip.shared && (!chart.isTouch || (chart.startMove))) {
                    this.tooltip();
                }
            }
            else {
                if (chart.tooltip.shared && chart.tooltip.fadeOutMode === 'Move') {
                    this.removeTooltip(this.chart.tooltip.fadeOutDuration);
                }
            }
        }
    };
    /**
     * Handles the long press on chart.
     *
     * @returns {boolean} false
     * @private
     */
    Tooltip.prototype.longPress = function () {
        var chart = this.chart;
        if (chart.crosshair.enable && withInBounds(chart.mouseX, chart.mouseY, chart.chartAxisLayoutPanel.seriesClipRect)) {
            this.tooltip();
            chart.markerRender.markerMove(false);
        }
        return false;
    };
    /**
     * Renders the tooltip.
     *
     * @returns {void}
     * @private
     */
    Tooltip.prototype.tooltip = function () {
        var elementId = this.chart.enableCanvas ? this.element.id + '_tooltip_group' : this.element.id + '_tooltip_svg';
        var svgElement = this.getElement(elementId);
        // To prevent the disappearance of the tooltip, while resize the stock chart.
        var isStockSvg = this.chart.stockChart && svgElement && (svgElement.firstChild.childNodes.length > 1);
        var isTooltip = (svgElement && parseInt(svgElement.getAttribute('opacity'), 10) > 0 && !isStockSvg);
        var tooltipDiv = this.getTooltipElement(isTooltip);
        if (this.chart.enableCanvas && tooltipDiv) {
            document.getElementById(this.chart.element.id + '_Secondary_Element').appendChild(tooltipDiv);
            tooltipDiv.appendChild(document.getElementById(this.chart.element.id + '_tooltip_svg'));
        }
        if (!this.chart.tooltip.shared) {
            this.renderSeriesTooltip(this.chart, !isTooltip, tooltipDiv);
        }
        else {
            this.renderGroupedTooltip(this.chart, !isTooltip, tooltipDiv);
        }
    };
    Tooltip.prototype.findHeader = function (data) {
        if (this.header === '') {
            return '';
        }
        this.header = this.parseTemplate(data.point, data.series, this.header, data.series.xAxis, data.series.yAxis);
        if (this.header.replace(/<b>/g, '').replace(/<\/b>/g, '').trim() !== '') {
            return this.header;
        }
        return '';
    };
    Tooltip.prototype.findShapes = function () {
        if (!this.chart.tooltip.enableMarker) {
            return [];
        }
        var marker = [];
        for (var _i = 0, _a = this.currentPoints; _i < _a.length; _i++) {
            var data = _a[_i];
            marker.push(data.point.marker.shape || data.series.marker.shape || 'Circle');
        }
        return marker;
    };
    Tooltip.prototype.renderSeriesTooltip = function (chart, isFirst, tooltipDiv) {
        var data = this.getData();
        var closestPointData = null;
        var smallestDistance = Infinity;
        data.lierIndex = this.lierIndex;
        this.currentPoints = [];
        if (this.findData(data, this.previousPoints[0])) {
            if (!(chart.dataEditingModule && chart.dataEditingModule.isPointDragging) && (this.previousPoints[0] &&
                data.point.index === this.previousPoints[0].point.index && data.series.index === this.previousPoints[0].series.index)) {
                return null;
            }
            if (this.pushData(data, isFirst, tooltipDiv, true)) {
                this.triggerTooltipRender(data, isFirst, this.getTooltipText(data), this.findHeader(data));
            }
        }
        else {
            var tooltipWithInBounds = withInBounds(chart.mouseX, chart.mouseY, chart.chartAxisLayoutPanel.seriesClipRect);
            if (!data.point && this.isRemove && chart.tooltip.fadeOutMode === 'Move' && (!chart.tooltip.showNearestTooltip || !tooltipWithInBounds)) {
                this.removeTooltip(this.chart.tooltip.fadeOutDuration);
                this.isRemove = false;
            }
            else {
                var commonXvalues = this.mergeXvalues(this.chart.visibleSeries);
                for (var i = chart.visibleSeries.length - 1; i >= 0; i--) {
                    var series = chart.visibleSeries[i];
                    if (series.visible && !(series.category === 'TrendLine')) {
                        data = this.getClosestX(chart, series, commonXvalues) || data;
                        if (chart.tooltip.showNearestTooltip && tooltipWithInBounds && series.showNearestTooltip && data &&
                            data.point && series.enableTooltip && data.point.symbolLocations[0]) {
                            var currentDistance = Math.sqrt(Math.pow((chart.mouseX - data.series.clipRect.x) -
                                data.point.symbolLocations[0].x, 2) + Math.pow((chart.mouseY -
                                data.series.clipRect.y) - data.point.symbolLocations[0].y, 2));
                            if (currentDistance < smallestDistance) {
                                smallestDistance = currentDistance;
                                closestPointData = data;
                            }
                        }
                    }
                }
                if (chart.tooltip.showNearestTooltip && closestPointData && this.pushData(closestPointData, isFirst, tooltipDiv, true)) {
                    data = closestPointData;
                    this.triggerTooltipRender(data, isFirst, this.getTooltipText(data), this.findHeader(data));
                }
            }
        }
        if (data && data.point) {
            this.findMouseValues(data, chart, this);
        }
    };
    Tooltip.prototype.triggerTooltipRender = function (point, isFirst, textCollection, headerText) {
        var _this = this;
        var tooltipTemplate;
        var argsData = {
            cancel: false, name: tooltipRender, text: textCollection, headerText: headerText, template: tooltipTemplate,
            series: this.chart.isBlazor ? {} : point.series, textStyle: this.textStyle, point: point.point,
            data: { pointX: point.point.x, pointY: point.point.y, seriesIndex: point.series.index, seriesName: point.series.name,
                pointIndex: point.point.index, pointText: point.point.text }
        };
        var borderWidth = this.chart.border.width;
        var padding = 3;
        var tooltip = this.chart.tooltip;
        var chartTooltipSuccess = function (argsData) {
            if (!argsData.cancel) {
                if (point.series.type === 'BoxAndWhisker') {
                    _this.removeText();
                    isFirst = true;
                }
                _this.headerText = argsData.headerText;
                _this.formattedText = _this.formattedText.concat(argsData.text);
                _this.text = _this.formattedText;
                var location_1 = _this.getSymbolLocation(point);
                location_1 = location_1 ? location_1 : new ChartLocation(null, null);
                location_1.x = tooltip.location.x !== null ? tooltip.location.x : location_1.x;
                location_1.y = tooltip.location.y !== null ? tooltip.location.y : location_1.y;
                location_1 = (location_1.x === null && location_1.y === null) ? null : location_1;
                _this.createTooltip(_this.chart, isFirst, location_1, point.series.clipRect, point.point, _this.findShapes(), _this.findMarkerHeight(_this.currentPoints[0]), new Rect(borderWidth, borderWidth, _this.chart.availableSize.width - padding - borderWidth * 2, _this.chart.availableSize.height - padding - borderWidth * 2), _this.chart.crosshair.enable, null, _this.getTemplateText(point), _this.template ? argsData.template : '');
            }
            else {
                _this.removeHighlight();
                remove(_this.getElement(_this.element.id + '_tooltip'));
            }
            _this.isRemove = true;
        };
        chartTooltipSuccess.bind(this, point);
        this.chart.trigger(tooltipRender, argsData, chartTooltipSuccess);
    };
    Tooltip.prototype.findMarkerHeight = function (pointData) {
        var markerHeight = 0;
        var series = pointData.series;
        markerHeight = ((series.marker.visible || (this.chart.tooltip.shared &&
            (!series.isRectSeries || series.marker.visible)) || series.type === 'Scatter' || series.drawType === 'Scatter')
            && !(series.type === 'Candle' || series.type === 'Hilo' || series.type === 'HiloOpenClose')) ?
            ((series.marker.height + 2) / 2 + (2 * series.marker.border.width)) : 0;
        return markerHeight;
    };
    Tooltip.prototype.findData = function (data, previous) {
        return data.point && ((!previous || (previous.point !== data.point)) ||
            (previous && previous.lierIndex > 3 && previous.lierIndex !== this.lierIndex) || (previous.point === data.point));
    };
    Tooltip.prototype.getSymbolLocation = function (data) {
        var location;
        if (data.series.type !== 'BoxAndWhisker') {
            if (!data.point.symbolLocations[0]) {
                return null;
            }
            location = new ChartLocation(data.point.symbolLocations[0].x, data.point.symbolLocations[0].y);
        }
        switch (data.series.type) {
            case 'BoxAndWhisker':
                return this.getBoxLocation(data);
            case 'Waterfall':
                return this.getWaterfallRegion(data, location);
            case 'RangeArea':
            case 'RangeStepArea':
            case 'SplineRangeArea':
            case 'RangeColumn':
                return this.getRangeArea(data, location);
            default:
                return location;
        }
    };
    Tooltip.prototype.getRangeArea = function (data, location) {
        if (data.point.regions[0]) {
            if (!this.inverted) {
                location.y = data.point.regions[0].y + data.point.regions[0].height / 2;
            }
            else {
                location.x = data.point.regions[0].x + data.point.regions[0].width / 2;
            }
            if (data.series.type === 'RangeStepArea') {
                location.y = data.point.regions[0].y + data.point.regions[0].height / 2 + data.point.regions[0].width;
            }
        }
        return location;
    };
    Tooltip.prototype.getWaterfallRegion = function (data, location) {
        if (!this.inverted) {
            location.y = (data.point.y < 0) ?
                location.y - data.point.regions[0].height : location.y;
        }
        else {
            location.x = (data.point.y < 0) ?
                location.x + (this.chart.enableRtl ? -data.point.regions[0].width : data.point.regions[0].width) : location.x;
        }
        return location;
    };
    Tooltip.prototype.getTooltipText = function (pointData) {
        var series = pointData.series;
        return this.parseTemplate(pointData.point, series, this.getFormat(this.chart, series), series.xAxis, series.yAxis);
    };
    Tooltip.prototype.getTemplateText = function (data) {
        this.template = this.chart.enableHtmlSanitizer ? this.chart.sanitize(this.template) : this.template;
        if (this.template && this.chart.tooltip.shared) {
            var point = [];
            for (var i = 0; i < data.length; i++) {
                point[i] = extend({}, data[i].point);
                point[i].x = this.formatPointValue(data[i].point, data[i].series.xAxis, 'x', true, false);
                if ((data[i].series.seriesType === 'XY')) {
                    point[i].y = this.formatPointValue(data[i].point, data[i].series.yAxis, 'y', false, true);
                }
                else {
                    point[i].low = this.formatPointValue(data[i].point, data[i].series.yAxis, 'low', false, true);
                    point[i].high = this.formatPointValue(data[i].point, data[i].series.yAxis, 'high', false, true);
                }
            }
            return point;
        }
        else if (this.template) {
            var point = extend({}, data.point);
            point.x = this.formatPointValue(data.point, data.series.xAxis, 'x', true, false);
            if ((data.series.seriesType === 'XY')) {
                point.y = this.formatPointValue(data.point, data.series.yAxis, 'y', false, true);
            }
            else {
                point.low = this.formatPointValue(data.point, data.series.yAxis, 'low', false, true);
                point.high = this.formatPointValue(data.point, data.series.yAxis, 'high', false, true);
            }
            return point;
        }
        else {
            return data.point;
        }
    };
    Tooltip.prototype.renderGroupedTooltip = function (chart, isFirst, tooltipDiv) {
        var data;
        var dataCollection = [];
        var lastData;
        var pointData = chart.chartAreaType === 'PolarRadar' ? this.getData() : null;
        this.stopAnimation();
        this.removeHighlight();
        this.currentPoints = [];
        var extraPoints = [];
        var closestXValue = Number.MAX_VALUE;
        var closetYValue = Number.MAX_VALUE;
        var pointXValue;
        var pointYValue;
        var tempData;
        //let headerContent : string = '';
        if (isFirst) {
            if (!chart.stockChart) {
                if (tooltipDiv) {
                    document.getElementById(this.element.id + '_Secondary_Element').appendChild(tooltipDiv);
                }
            }
            else {
                if (tooltipDiv && !getElement(tooltipDiv.id)) {
                    document.getElementById(chart.stockChart.element.id + '_Secondary_Element').appendChild(tooltipDiv);
                }
            }
        }
        this.removeText();
        var argument = {
            text: [], cancel: false, name: sharedTooltipRender, data: [], point: [], series: [], headerText: '', textStyle: this.textStyle, template: []
        };
        var i = 0;
        for (var _i = 0, _a = chart.visibleSeries; _i < _a.length; _i++) {
            var series = _a[_i];
            if (!series.enableTooltip || !series.visible) {
                continue;
            }
            if (chart.chartAreaType === 'Cartesian' && series.visible) {
                data = this.getClosestX(chart, series, this.commonXValue(this.chart.visibleSeries));
            }
            else if (chart.chartAreaType === 'PolarRadar' && series.visible && pointData.point !== null) {
                data = new PointData(series.points[pointData.point.index], series);
            }
            // if (data && this.header !== '' && this.currentPoints.length === 0) {
            //     headerContent = this.findHeader(data);
            // }
            if (chart.tooltip.showNearestPoint && !data) {
                data = this.getClosestX(chart, series, this.commonXValue([series]));
            }
            if (data) {
                argument.data.push({ pointX: data.point.x, pointY: data.point.y, seriesIndex: data.series.index,
                    seriesName: data.series.name, pointIndex: data.point.index, pointText: data.point.text });
                argument.series[i] = data.series;
                argument.point[i] = data.point;
                argument.headerText = this.findHeader(data);
                this.currentPoints.push(data);
                if (this.template != null) {
                    argument.template.push(chart.enableHtmlSanitizer ? chart.sanitize(this.template.toString()) : this.template.toString());
                }
                argument.text.push(this.getTooltipText(data));
                pointXValue = (!chart.requireInvertedAxis) ? chart.mouseX - data.series.clipRect.x : chart.mouseY - data.series.clipRect.y;
                pointYValue = chart.mouseY - data.series.clipRect.y;
                if (data.point.symbolLocations && data.point.symbolLocations.length &&
                    Math.abs(pointXValue - data.point.symbolLocations[0].x) <= closestXValue &&
                    Math.abs(data.point.symbolLocations[0].y - pointYValue) < Math.abs(closetYValue - pointYValue)) {
                    closestXValue = Math.abs(pointXValue - data.point.symbolLocations[0].x);
                    closetYValue = data.point.symbolLocations[0].y;
                    tempData = data;
                }
                lastData = (data.series.category === 'TrendLine' && chart.tooltip.shared) ? lastData : tempData || data;
                dataCollection.push(data);
            }
            // if (data && this.triggerEvent(data, isFirst, this.getTooltipText(data)), this.findHeader(data)) {
            //     this.findMouseValue(data, chart);
            //     (<PointData[]>this.currentPoints).push(data);
            //     data = null;
            // } else if (data) {
            //     extraPoints.push(data);
            // }
            i++;
        }
        if (!chart.tooltip.showNearestPoint) {
            var collection = [];
            this.currentPoints = [];
            argument.point = [];
            argument.series = [];
            argument.data = [];
            argument.text = [];
            for (var _b = 0, dataCollection_1 = dataCollection; _b < dataCollection_1.length; _b++) {
                var data_1 = dataCollection_1[_b];
                if (data_1.point.symbolLocations[0].x === lastData.point.symbolLocations[0].x || ((data_1.series.type.indexOf('Column') !== -1 || lastData.series.type.indexOf('Column') !== -1) && (data_1.point.xValue === lastData.point.xValue))) {
                    argument.point.push(data_1.point);
                    argument.series.push(data_1.series);
                    argument.text.push(this.getTooltipText(data_1));
                    argument.headerText = this.findHeader(data_1);
                    collection.push(data_1);
                    argument.data.push({
                        pointX: data_1.point.x, pointY: data_1.point.y, seriesIndex: data_1.series.index,
                        seriesName: data_1.series.name, pointIndex: data_1.point.index, pointText: data_1.point.text
                    });
                }
            }
            dataCollection = collection;
            this.currentPoints = collection;
        }
        if (dataCollection.length > 0 && this.currentPoints.length > 0) { // To avoid console error when we have empty chart with shared tooltip.
            this.triggerSharedTooltip(argument, lastData, extraPoints, chart, isFirst, dataCollection);
        }
        else if (this.getElement(this.element.id + '_tooltip_path')) {
            this.getElement(this.element.id + '_tooltip_path').setAttribute('d', '');
        }
    };
    Tooltip.prototype.triggerSharedTooltip = function (argument, point, extraPoints, chart, isFirst, dataCollection) {
        var _this = this;
        var tooltipTemplate = argument.template;
        var argsData = {
            cancel: false, name: sharedTooltipRender, text: argument.text, headerText: argument.headerText,
            textStyle: argument.textStyle, template: tooltipTemplate,
            point: argument.point, series: argument.series,
            data: argument.data
        };
        var borderWidth = this.chart.border.width;
        var padding = 3;
        var toolbarHeight;
        var titleHeight;
        var currentPoints = [];
        if (chart.stockChart) {
            toolbarHeight = chart.stockChart.enablePeriodSelector ? chart.stockChart.toolbarHeight : 0;
            titleHeight = measureText(this.chart.stockChart.title, this.chart.stockChart.titleStyle, this.chart.themeStyle.tooltipLabelFont).height + 10;
        }
        var sharedTooltip = function (argsData) {
            if (!argsData.cancel) {
                if (point.series.type === 'BoxAndWhisker') {
                    _this.removeText();
                    isFirst = true;
                }
                for (var i = 0; i < argsData.text.length; i++) {
                    if (argsData.text[i]) {
                        currentPoints.push(_this.currentPoints[i]);
                    }
                }
                _this.currentPoints = currentPoints;
                _this.formattedText = _this.formattedText.concat(argsData.text);
                _this.text = argsData.text;
                _this.headerText = argsData.headerText;
                if (typeof (argsData.template) != 'object') {
                    argsData.template = argsData.template.split(',');
                    if (argsData.template.length > currentPoints.length) {
                        argsData.template = argsData.template.splice(argsData.template.length - 1);
                    }
                }
                else {
                    if (argsData.template.length > currentPoints.length) {
                        argsData.template.splice(argsData.template.length - 1);
                    }
                }
                var tooltip = _this.chart.tooltip;
                _this.findMouseValues(point, _this.chart, _this);
                var location_2 = _this.findSharedLocation();
                location_2 = location_2 ? location_2 : new ChartLocation(null, null);
                location_2.x = tooltip.location.x !== null ? tooltip.location.x : location_2.x;
                location_2.y = tooltip.location.y !== null ? tooltip.location.y : location_2.y;
                location_2 = (location_2.x === null && location_2.y === null) ? null : location_2;
                if (point.series.type.indexOf('Range') === -1 || withInBounds(location_2.x, location_2.y, chart.chartAxisLayoutPanel.seriesClipRect)) {
                    _this.createTooltip(chart, isFirst, location_2, _this.currentPoints.length === 1 ? _this.currentPoints[0].series.clipRect : null, dataCollection.length === 1 ? dataCollection[0].point : null, _this.findShapes(), _this.findMarkerHeight(_this.currentPoints[0]), new Rect(borderWidth, (chart.stockChart ? (toolbarHeight + titleHeight + borderWidth) : borderWidth), _this.chart.availableSize.width - padding - borderWidth * 2, _this.chart.availableSize.height - padding - borderWidth * 2), _this.chart.crosshair.enable, extraPoints, _this.template ? _this.getTemplateText(dataCollection) : null, _this.template ? argsData.template.join('') : '');
                }
                else {
                    removeElement(_this.element.id + '_tooltip');
                    extraPoints.push(point);
                }
                point = null;
            }
            else {
                removeElement(_this.element.id + '_tooltip');
                extraPoints.push(point);
            }
        };
        sharedTooltip.bind(this, point, extraPoints);
        this.chart.trigger(sharedTooltipRender, argsData, sharedTooltip);
    };
    Tooltip.prototype.findSharedLocation = function () {
        var stockChart = this.chart.stockChart;
        if (stockChart) {
            if (this.text.length === 1) {
                this.text.push('');
            }
            var toolbarHeight = stockChart.enablePeriodSelector ? stockChart.toolbarHeight : 0;
            var element = document.getElementById(stockChart.element.id + '_ChartTitle');
            var titleHeight = stockChart.title !== '' ? element.getBoundingClientRect().height + 10 : 0;
            if (stockChart.tooltip.position === 'Nearest') {
                return new ChartLocation(this.valueX, this.valueY + toolbarHeight + titleHeight);
            }
            return new ChartLocation(this.chart.chartAxisLayoutPanel.seriesClipRect.x + 5, this.chart.chartAxisLayoutPanel.seriesClipRect.y + toolbarHeight + 5 + titleHeight);
        }
        else {
            if (this.currentPoints.length > 1) {
                return new ChartLocation(this.valueX, this.valueY);
            }
            else {
                return this.getSymbolLocation(this.currentPoints[0]);
            }
        }
    };
    Tooltip.prototype.getBoxLocation = function (data) {
        var location = this.lierIndex > 3 ? (data.point.outliers.length > 0 ?
            data.point.symbolLocations[this.lierIndex - 4] : null) :
            {
                x: data.point.regions[0].x + (data.point.regions[0].width / 2),
                y: data.point.regions[0].y + (data.point.regions[0].height / 2)
            };
        return location;
    };
    Tooltip.prototype.parseTemplate = function (point, series, format, xAxis, yAxis) {
        var val;
        var textValue;
        var regExp = RegExp;
        for (var _i = 0, _a = Object.keys(point); _i < _a.length; _i++) {
            var dataValue = _a[_i];
            val = new regExp('${point' + '.' + dataValue + '}', 'gm');
            format = format.replace(val.source, this.formatPointValue(point, val.source === '${point.x}' ? xAxis : yAxis, dataValue, val.source === '${point.x}', (val.source === '${point.high}' ||
                val.source === '${point.open}' ||
                val.source === '${point.close}' ||
                val.source === '${point.low}' ||
                val.source === '${point.y}' ||
                val.source === '${point.minimum}' ||
                val.source === '${point.maximum}' ||
                val.source === '${point.outliers}' ||
                val.source === '${point.upperQuartile}' ||
                val.source === '${point.lowerQuartile}' ||
                val.source === '${point.median}')));
        }
        for (var _b = 0, _c = Object.keys(Object.getPrototypeOf(series)); _b < _c.length; _b++) {
            var dataValue = _c[_b];
            val = new regExp('${series' + '.' + dataValue + '}', 'gm');
            textValue = series[dataValue];
            format = format.replace(val.source, textValue);
        }
        return format;
    };
    Tooltip.prototype.formatPointValue = function (point, axis, dataValue, isXPoint, isYPoint) {
        var textValue;
        var customLabelFormat;
        var value;
        if (axis.valueType !== 'Category' && isXPoint) {
            customLabelFormat = axis.labelFormat && axis.labelFormat.match('{value}') !== null;
            var formattedValue = axis.valueType === 'Double' ? +point[dataValue] : point[dataValue];
            textValue = customLabelFormat ? axis.labelFormat.replace('{value}', axis.format(formattedValue)) :
                axis.format(formattedValue);
        }
        else if (isYPoint && !isNullOrUndefined(point[dataValue])) {
            customLabelFormat = axis.labelFormat && axis.labelFormat.match('{value}') !== null;
            value = dataValue === 'outliers' ? axis.format(point[dataValue][this.lierIndex - 4]) :
                axis.format(+point[dataValue]);
            textValue = customLabelFormat ? axis.labelFormat.replace('{value}', value) : value;
        }
        else if (dataValue === 'size') {
            var format = this.chart.intl.getNumberFormat({ format: '', useGrouping: this.chart.useGroupingSeparator });
            textValue = typeof point[dataValue] === 'number' ? format(point[dataValue]) : point[dataValue];
            textValue = textValue ? textValue : '';
        }
        else {
            textValue = point[dataValue];
        }
        return textValue;
    };
    Tooltip.prototype.getFormat = function (chart, series) {
        if (series.tooltipFormat) {
            if (series.seriesType === 'XY' && series.category === 'Indicator') {
                return this.getIndicatorTooltipFormat(series, chart, chart.tooltip.format);
            }
            return series.tooltipFormat;
        }
        if (!series.tooltipFormat && chart.tooltip.format) {
            if (series.seriesType === 'XY' && series.category === 'Indicator') {
                return this.getIndicatorTooltipFormat(series, chart, chart.tooltip.format);
            }
            return chart.tooltip.format;
        }
        var textX = (series.type === 'Histogram') ? '${point.minimum}' + '-' + '${point.maximum}' : '${point.x}';
        var format = !chart.tooltip.shared ? textX : '${series.name}';
        switch (series.seriesType) {
            case 'XY':
                if (series.category === 'Indicator') {
                    this.getIndicatorTooltipFormat(series, chart, chart.tooltip.format);
                }
                return format + ' : ' + ((series.type === 'Bubble') ? chart.theme.indexOf('Tailwind3') > -1 ? '${point.y}  Size : ${point.size}' : '<b>${point.y}</b>  Size : <b>${point.size}</b>' : chart.theme.indexOf('Tailwind3') > -1 ? '${point.y}' :
                    '<b>${point.y}</b>');
            case 'HighLow':
                return format + ('<br/>High : <b>${point.high}</b><br/>Low : <b>${point.low}</b>');
            case 'HighLowOpenClose':
                return format + ('<br/>High : <b>${point.high}</b><br/>Low : <b>${point.low}</b><br/>' +
                    'Open : <b>${point.open}</b><br/>Close : <b>${point.close}</b>');
            case 'BoxPlot': {
                return format + '<br/>' + (this.lierIndex > 3 ? 'Outliers : <b>${point.outliers}</b>' :
                    'Maximum : <b>${point.maximum}</b><br/>Q3 : <b>${point.upperQuartile}</b><br/>' +
                        'Median : <b>${point.median}</b><br/>Q1 : <b>${point.lowerQuartile}</b><br/>Minimum : <b>${point.minimum}</b>');
            }
            //default: return '';
        }
    };
    Tooltip.prototype.getIndicatorTooltipFormat = function (series, chart, format) {
        var toolTip;
        if (series.seriesType === 'XY') {
            toolTip = series.name + ' : <b>${point.y}</b>';
        }
        else {
            toolTip = format;
        }
        return toolTip;
    };
    /*
    * @hidden
    */
    Tooltip.prototype.removeHighlightedMarker = function (data, fadeOut) {
        for (var _i = 0, data_2 = data; _i < data_2.length; _i++) {
            var item = data_2[_i];
            removeElement(this.element.id + '_Series_' + item.series.index +
                '_Point_' + item.point.index + '_Trackball');
            if (this.chart.markerRender) {
                this.chart.markerRender.removeHighlightedMarker(item.series, item.point, fadeOut);
            }
        }
        this.previousPoints = [];
    };
    /**
     * Get module name.
     *
     * @returns {string} - Returns the module name.
     */
    Tooltip.prototype.getModuleName = function () {
        /**
         * Returns the module name
         */
        return 'Tooltip';
    };
    /**
     * To destroy the tooltip.
     *
     * @returns {void}
     * @private
     */
    Tooltip.prototype.destroy = function () {
        /**
         * Destroy method performed here
         */
    };
    return Tooltip;
}(BaseTooltip));
export { Tooltip };
