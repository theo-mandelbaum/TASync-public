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
import { extend, Browser, remove, ChildProperty, Property, Complex } from '@syncfusion/ej2-base';
import { ChartLocation, Point3D } from '../../common/utils/helper';
import { Rect } from '@syncfusion/ej2-svg-base';
import { BaseTooltip } from '../../common/user-interaction/tooltip';
import { tooltipRender } from '../../common/model/constants';
import { isNullOrUndefined } from '@syncfusion/ej2-base';
import { Border, Font } from '../../common/model/base';
import { Location } from '../../common/model/base';
import { valueToCoefficients } from '../utils/chart3dRender';
/**
 * Configures the ToolTips in the chart.
 *
 * @public
 */
var Chart3DTooltipSettings = /** @class */ (function (_super) {
    __extends(Chart3DTooltipSettings, _super);
    function Chart3DTooltipSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property(false)
    ], Chart3DTooltipSettings.prototype, "enable", void 0);
    __decorate([
        Property(true)
    ], Chart3DTooltipSettings.prototype, "enableMarker", void 0);
    __decorate([
        Property(null)
    ], Chart3DTooltipSettings.prototype, "fill", void 0);
    __decorate([
        Property(null)
    ], Chart3DTooltipSettings.prototype, "header", void 0);
    __decorate([
        Property(null)
    ], Chart3DTooltipSettings.prototype, "opacity", void 0);
    __decorate([
        Complex({ fontFamily: null, size: '12px', fontStyle: 'Normal', fontWeight: null, color: null }, Font)
    ], Chart3DTooltipSettings.prototype, "textStyle", void 0);
    __decorate([
        Property(null)
    ], Chart3DTooltipSettings.prototype, "format", void 0);
    __decorate([
        Property(null)
    ], Chart3DTooltipSettings.prototype, "template", void 0);
    __decorate([
        Property(true)
    ], Chart3DTooltipSettings.prototype, "enableAnimation", void 0);
    __decorate([
        Property(300)
    ], Chart3DTooltipSettings.prototype, "duration", void 0);
    __decorate([
        Property(1000)
    ], Chart3DTooltipSettings.prototype, "fadeOutDuration", void 0);
    __decorate([
        Property('Move')
    ], Chart3DTooltipSettings.prototype, "fadeOutMode", void 0);
    __decorate([
        Property(false)
    ], Chart3DTooltipSettings.prototype, "enableTextWrap", void 0);
    __decorate([
        Complex({ color: null, width: null }, Border)
    ], Chart3DTooltipSettings.prototype, "border", void 0);
    __decorate([
        Complex({ x: null, y: null }, Location)
    ], Chart3DTooltipSettings.prototype, "location", void 0);
    return Chart3DTooltipSettings;
}(ChildProperty));
export { Chart3DTooltipSettings };
/**
 * The `Tooltip` module is used to render the tooltip for chart series.
 */
var Tooltip3D = /** @class */ (function (_super) {
    __extends(Tooltip3D, _super);
    /**
     * Constructor for tooltip module.
     *
     * @param {Chart3D} chart - Specifies the chart instance
     * @private
     */
    function Tooltip3D(chart) {
        var _this = _super.call(this, chart) || this;
        _this.chart3D = chart;
        _this.commonXvalues = [];
        _this.addEventListener();
        return _this;
    }
    /**
     * Adds event listeners for handling mouse and touch events on the chart.
     *
     * @returns {void}
     * @private
     */
    Tooltip3D.prototype.addEventListener = function () {
        if (this.chart.isDestroyed) {
            return;
        }
        var cancelEvent = Browser.isPointer ? 'pointerleave' : 'mouseleave';
        this.chart.on(cancelEvent, this.mouseLeaveHandler, this);
        this.chart.on('tapHold', this.longPress, this);
        this.chart.on(Browser.touchMoveEvent, this.mouseMoveHandler, this);
        this.chart.on(Browser.touchEndEvent, this.mouseUpHandler, this);
    };
    /**
     * Unbinding events for selection module.
     *
     * @returns {void}
     */
    Tooltip3D.prototype.removeEventListener = function () {
        if (this.chart.isDestroyed) {
            return;
        }
        this.chart.off('pointerleave' || 'mouseleave', this.mouseLeaveHandler);
        this.chart.off('tapHold', this.longPress);
        this.chart.off(Browser.touchMoveEvent, this.mouseLeaveHandler);
        this.chart.off(Browser.touchMoveEvent, this.mouseMoveHandler);
        this.chart.off(Browser.touchEndEvent, this.mouseUpHandler);
    };
    /**
     * Handles the mouse up event for the 3D chart.
     *
     * @param {MouseEvent | PointerEvent | TouchEvent} event - The mouse or touch event.
     * @returns {void}
     * @private
     */
    Tooltip3D.prototype.mouseUpHandler = function (event) {
        var _this = this;
        var chart = this.control;
        var data = this.get3dData(event);
        if (chart.isTouch) {
            this.tooltip(event);
            if (chart.tooltip.fadeOutMode === 'Move') {
                this.removeTooltip(chart.tooltip.fadeOutDuration);
                clearTimeout(this.timerId);
                this.timerId = +setTimeout(function () {
                    _this.removeBlurEffect();
                }, 500);
            }
            if (chart.startMove && chart.tooltip.fadeOutMode === 'Move') {
                this.removeTooltip(2000);
                this.removeBlurEffect();
            }
        }
        else if (!this.findData(data, this.previousPoints[0]) && chart.tooltip.fadeOutMode === 'Click') {
            this.removeTooltip(0);
            this.removeBlurEffect();
        }
    };
    /**
     * Handles the mouse leave event for the 3D chart.
     *
     * @returns {void}
     * @private
     */
    Tooltip3D.prototype.mouseLeaveHandler = function () {
        this.removeTooltip(this.chart.tooltip.fadeOutDuration);
        this.removeBlurEffect();
    };
    /**
     * Handles the mouse move event for the 3D chart.
     *
     * @param {MouseEvent | PointerEvent | TouchEvent} event - The mouse move event.
     * @returns {void}
     * @public
     */
    Tooltip3D.prototype.mouseMoveHandler = function (event) {
        var chart = this.chart3D;
        chart.mouseX = chart.mouseX / chart.scaleX;
        chart.mouseY = chart.mouseY / chart.scaleY;
        // Tooltip for chart series.
        if (!chart.disableTrackTooltip && !chart.rotateActivate) {
            if (!chart.isTouch || (chart.startMove)) {
                this.tooltip(event);
            }
        }
    };
    /**
     * Handles the long press on chart.
     *
     * @returns {boolean} false
     * @private
     */
    Tooltip3D.prototype.longPress = function () {
        return false;
    };
    /**
     * To create Tooltip styles for series
     *
     * @returns {void}
     */
    Tooltip3D.prototype.seriesStyles = function () {
        if (!this.styleAdded) {
            var style = document.createElement('style');
            style.setAttribute('id', this.element.id + '_ej2_chart_tooltip');
            style.innerText += ' .' + this.element.id + '_ej2_tooltipDeselected { opacity:' + (0.2) + ';} ';
            document.body.appendChild(style);
            this.styleAdded = true;
        }
    };
    /**
     * Handles the tooltip display for the 3D chart.
     *
     * @param {MouseEvent | PointerEvent | TouchEvent | KeyboardEvent} e - The event triggering the tooltip display.
     * @returns {void}
     * @public
     */
    Tooltip3D.prototype.tooltip = function (e) {
        var elementId = this.element.id + '_tooltip_svg';
        var svgElement = this.getElement(elementId);
        var isTooltip = (svgElement && parseInt(svgElement.getAttribute('opacity'), 10) > 0);
        var tooltipDiv = this.getTooltipElement(isTooltip);
        if (this.chart3D.tooltip3DModule) {
            this.renderSeriesTooltip(this.chart3D, !isTooltip, tooltipDiv, e);
        }
    };
    /**
     * Finds the header for the tooltip based on the provided Point3D.
     *
     * @param {Point3D} data - The Point3D used to find the header.
     * @returns {string} - The header for the tooltip.
     * @private
     */
    Tooltip3D.prototype.findHeader = function (data) {
        if (this.header === '') {
            return '';
        }
        this.header = this.parseTemplate(data.point, data.series, this.header, data.series.xAxis, data.series.yAxis);
        if (this.header.replace(/<b>/g, '').replace(/<\/b>/g, '').trim() !== '') {
            return this.header;
        }
        return '';
    };
    /**
     * Renders the tooltip for the series in the 3D chart.
     *
     * @param {Chart3D} chart - The 3D chart instance.
     * @param {boolean} isFirst - A boolean indicating whether it is the first series.
     * @param {HTMLDivElement} tooltipDiv - The tooltip div element.
     * @param {MouseEvent | PointerEvent | TouchEvent | KeyboardEvent} e - The event that triggered the tooltip.
     * @returns {void}
     * @private
     */
    Tooltip3D.prototype.renderSeriesTooltip = function (chart, isFirst, tooltipDiv, e) {
        var data = this.get3dData(e);
        this.currentPoints = [];
        if (this.findData(data, this.previousPoints[0]) &&
            ((this.previousPoints[0] && !((this.previousPoints[0].point.index === data.point.index && this.previousPoints[0].series.index
                === data.series.index) && this.chart3D.isRemove)) || !this.previousPoints[0])) {
            if (this.pushData(data, isFirst, tooltipDiv, true)) {
                this.triggerTooltipRender(data, isFirst, this.getTooltipText(data), this.findHeader(data));
            }
        }
        else if (!data.point && this.chart3D.isRemove && chart.tooltip.fadeOutMode === 'Move') {
            this.removeTooltip(this.chart.tooltip.fadeOutDuration);
            this.removeBlurEffect();
            this.chart3D.isRemove = false;
        }
        if (data && data.point) {
            this.findMouseValue(data, chart);
        }
    };
    /**
     * Triggers the rendering of the tooltip with the specified point and text information.
     *
     * @param {Point3D} point - The data point for which the tooltip is triggered.
     * @param {boolean} isFirst - A boolean indicating whether it is the first series.
     * @param {string} textCollection - The text information to be displayed in the tooltip.
     * @param {string} headerText - The header text for the tooltip.
     * @returns {void}
     * @private
     */
    Tooltip3D.prototype.triggerTooltipRender = function (point, isFirst, textCollection, headerText) {
        var _this = this;
        var tooltipTemplate;
        var argsData = {
            cancel: false, text: textCollection, headerText: headerText, template: tooltipTemplate,
            textStyle: this.textStyle,
            data: {
                pointX: point.point.x, pointY: point.point.y, seriesIndex: point.series.index, seriesName: point.series.name,
                pointIndex: point.point.index, pointText: point.point.text
            }
        };
        var borderWidth = this.chart.border.width;
        var padding = 3;
        var chartTooltipSuccess = function (argsData) {
            if (!argsData.cancel) {
                _this.headerText = argsData.headerText;
                _this.formattedText = _this.formattedText.concat(argsData.text);
                _this.text = _this.formattedText;
                _this.createTooltip(_this.chart, isFirst, _this.getSymbolLocation(point), point.series.clipRect, point.point, _this.chart3D.tooltip.enableMarker ? ['Circle'] : [], 0, new Rect(borderWidth, borderWidth, _this.chart.availableSize.width - padding - borderWidth * 2, _this.chart.availableSize.height - padding - borderWidth * 2), false, null, _this.getTemplateText(point), _this.template ? argsData.template : '');
                _this.blurEffect(_this.chart3D.visibleSeries, point.series);
            }
            else {
                _this.removeHighlight();
                remove(_this.getElement(_this.element.id + '_tooltip'));
            }
            _this.chart3D.isRemove = true;
        };
        chartTooltipSuccess.bind(this, point);
        this.chart.trigger(tooltipRender, argsData, chartTooltipSuccess);
    };
    /**
     * Applies a blur effect to the specified series while removing the effect from others.
     *
     * @param {Chart3DSeries[]} visibleSeries - The array of visible series in the 3D chart.
     * @param {Chart3DSeries} tooltipSeries - The series associated with the tooltip.
     * @returns {void}
     * @private
     */
    Tooltip3D.prototype.blurEffect = function (visibleSeries, tooltipSeries) {
        if (!this.chart3D.highlight3DModule || (this.chart3D.legendSettings.enableHighlight && this.chart3D.highlightMode === 'None')) {
            var pointElements_1 = [];
            for (var _i = 0, visibleSeries_1 = visibleSeries; _i < visibleSeries_1.length; _i++) {
                var series = visibleSeries_1[_i];
                if (series.visible && series.index !== tooltipSeries.index) {
                    var elements = document.querySelectorAll("[id*=\"region-series-" + series.index + "\"]");
                    elements.forEach(function (el) {
                        pointElements_1.push(el);
                    });
                }
                else if (series.visible) {
                    var tooltipElements = document.querySelectorAll("[id*=\"region-series-" + series.index + "\"]");
                    for (var i = 0; i < tooltipElements.length; i++) {
                        var element = tooltipElements[i];
                        var elementClassName = element.getAttribute('class') || '';
                        if (elementClassName.indexOf(this.element.id + '_ej2_tooltipDeselected') > -1) {
                            element.setAttribute('class', elementClassName.replace(this.element.id + '_ej2_tooltipDeselected', ''));
                        }
                        this.chart3D.stopElementAnimation(element, series.index);
                    }
                }
            }
            for (var i = 0; i < pointElements_1.length; i++) {
                if (pointElements_1[i]) {
                    var elementClassName = pointElements_1[i].getAttribute('class') || '';
                    elementClassName += ((elementClassName !== '') ? ' ' : '');
                    if (elementClassName.indexOf('_selection_') === -1 && elementClassName.indexOf(this.element.id + '_ej2_tooltipDeselected') === -1) {
                        pointElements_1[i].setAttribute('class', elementClassName + this.element.id + '_ej2_tooltipDeselected');
                    }
                }
            }
        }
    };
    Tooltip3D.prototype.removeBlurEffect = function () {
        if (!this.chart3D.highlight3DModule || (this.chart3D.legendSettings.enableHighlight && this.chart3D.highlightMode === 'None')) {
            var elements = document.getElementsByClassName(this.element.id + '_ej2_tooltipDeselected');
            while (elements.length > 0) {
                var element = elements[0];
                var elementClassName = element.getAttribute('class') || '';
                if (elementClassName.indexOf(this.element.id + '_ej2_tooltipDeselected') > -1) {
                    element.setAttribute('class', elementClassName.replace(this.element.id + '_ej2_tooltipDeselected', ''));
                    var index = parseFloat(element.id.split('-series-')[1].split('-point-')[0]);
                    this.chart3D.highlightAnimation(element, index, 700, 0.2);
                }
            }
        }
    };
    /**
     * Gets the location of the symbol based on the current mouse position in the chart.
     *
     * @param {Point3D} point - The tooltip point.
     * @returns {ChartLocation} - The location of the tooltip.
     * @private
     */
    Tooltip3D.prototype.getSymbolLocation = function (point) {
        var rect = document.getElementById(this.element.id + '_svg').getBoundingClientRect();
        var upperElement;
        if (point.series.columnFacet === 'Cylinder') {
            upperElement = document.querySelectorAll('[id*="' + this.element.id + '-svg-' + (point.series.type.indexOf('Column') === -1 ? '0' : '1') + '-region-series-' + point.series.index + '-point-' + point.point.index + '"]');
        }
        else {
            upperElement = document.querySelectorAll('[id*="' + this.element.id + '-svg-' + (point.series.type.indexOf('Column') === -1 ? '5' : '2') + '-region-series-' + point.series.index + '-point-' + point.point.index + '"]');
        }
        var tooltipElement;
        if (upperElement) {
            if (upperElement.length === 1) {
                tooltipElement = upperElement[0].getBoundingClientRect();
            }
            else {
                for (var i = 0; i < upperElement.length; i++) {
                    var element = upperElement[i];
                    if (element.id.indexOf('-' + point.point.index + '-back-front') !== -1 || element.id.indexOf('-' + point.point.index + '-front-back') !== -1) {
                        tooltipElement = element.getBoundingClientRect();
                        break;
                    }
                }
            }
            if (upperElement.length !== 0 && !tooltipElement) {
                tooltipElement = upperElement[0].getBoundingClientRect();
            }
        }
        var location = new ChartLocation((this.chart3D.tooltip.location.x !== null) ? this.chart3D.tooltip.location.x :
            tooltipElement.left - rect.left + (tooltipElement.width / 2), (this.chart3D.tooltip.location.y !== null) ?
            this.chart3D.tooltip.location.y : tooltipElement.top - rect.top + (tooltipElement.height / 2));
        return location;
    };
    /**
     * Gets the tooltip text based on the provided point data.
     *
     * @param {Point3D} pointData - The data of the point for which the tooltip is generated.
     * @returns {string} - The tooltip text.
     * @private
     */
    Tooltip3D.prototype.getTooltipText = function (pointData) {
        return this.parseTemplate(pointData.point, pointData.series, this.getFormat(this.chart3D, pointData.series), pointData.series.xAxis, pointData.series.yAxis);
    };
    /**
     * Gets the template text based on the provided data.
     *
     * @param {Point3D} data - The data object for which the template text is generated.
     * @returns {Chart3DPoint | Chart3DPoint[]} - The template text.
     * @private
     */
    Tooltip3D.prototype.getTemplateText = function (data) {
        if (this.template) {
            var point = extend({}, data.point);
            point.x = this.formatPointValue(data.point, data.series.xAxis, 'x', true, false);
            point.y = this.formatPointValue(data.point, data.series.yAxis, 'y', false, true);
            return point;
        }
        else {
            return data.point;
        }
    };
    /**
     * Finds the mouse value based on the provided data and chart.
     *
     * @param {Point3D} data - The data object containing information about the point.
     * @param {Chart3D} chart - The Chart3D instance.
     * @returns {void}
     * @private
     */
    Tooltip3D.prototype.findMouseValue = function (data, chart) {
        if (!chart.requireInvertedAxis) {
            this.valueX = valueToCoefficients(data.point.xValue, data.series.xAxis) *
                data.series.xAxis.rect.width + data.series.xAxis.rect.x;
            this.valueY = chart.mouseY;
        }
        else {
            this.valueY = (1 - valueToCoefficients(data.point.xValue, data.series.xAxis)) * data.series.xAxis.rect.height
                + data.series.xAxis.rect.y;
            this.valueX = chart.mouseX;
        }
    };
    /**
     * Parses the template using the provided point, series, format, xAxis, and yAxis information.
     *
     * @param {Chart3DPoint} point - The point for which the template needs to be parsed.
     * @param {Chart3DSeries} series - The series associated with the point.
     * @param {string} format - The format string.
     * @param {Chart3DAxis} xAxis - The X-axis of the chart.
     * @param {Chart3DAxis} yAxis - The Y-axis of the chart.
     * @returns {string} - The parsed template string.
     * @private
     */
    Tooltip3D.prototype.parseTemplate = function (point, series, format, xAxis, yAxis) {
        var val;
        var textValue;
        var regExp = RegExp;
        for (var _i = 0, _a = Object.keys(point); _i < _a.length; _i++) {
            var dataValue = _a[_i];
            val = new regExp('${point' + '.' + dataValue + '}', 'gm');
            format = format.replace(val.source, this.formatPointValue(point, val.source === '${point.x}' ? xAxis : yAxis, dataValue, val.source === '${point.x}', (val.source === '${point.y}')));
        }
        for (var _b = 0, _c = Object.keys(Object.getPrototypeOf(series)); _b < _c.length; _b++) {
            var dataValue = _c[_b];
            val = new regExp('${series' + '.' + dataValue + '}', 'gm');
            textValue = series[dataValue];
            format = format.replace(val.source, textValue);
        }
        return format;
    };
    /**
     * Formats the point value based on the provided point, axis, dataValue, and other flags.
     *
     * @param {Chart3DPoint} point - The point for which the value needs to be formatted.
     * @param {Chart3DAxis} axis - The axis associated with the point.
     * @param {string} dataValue - The data value to be formatted.
     * @param {boolean} isXPoint - Indicates whether the point is on the X-axis.
     * @param {boolean} isYPoint - Indicates whether the point is on the Y-axis.
     * @returns {string} - The formatted point value.
     * @private
     */
    Tooltip3D.prototype.formatPointValue = function (point, axis, dataValue, isXPoint, isYPoint) {
        var textValue;
        var customLabelFormat;
        var value;
        if (axis.valueType !== 'Category' && isXPoint) {
            customLabelFormat = axis.labelFormat && axis.labelFormat.match('{value}') !== null;
            textValue = customLabelFormat ? axis.labelFormat.replace('{value}', axis.format(point[dataValue])) :
                axis.format(point[dataValue]);
        }
        else if (isYPoint && !isNullOrUndefined(point[dataValue])) {
            customLabelFormat = axis.labelFormat && axis.labelFormat.match('{value}') !== null;
            value = axis.format(point[dataValue]);
            textValue = customLabelFormat ? axis.labelFormat.replace('{value}', value) : value;
        }
        else {
            textValue = point[dataValue];
        }
        return textValue;
    };
    /**
     * Gets the format for the tooltip based on the provided chart and series.
     *
     * @param {Chart3D} chart - The 3D chart instance.
     * @param {Chart3DSeries} series - The 3D series for which the tooltip format is needed.
     * @returns {string} - The tooltip format.
     * @private
     */
    Tooltip3D.prototype.getFormat = function (chart, series) {
        if (series.tooltipFormat) {
            return series.tooltipFormat;
        }
        if (!series.tooltipFormat && chart.tooltip.format) {
            return chart.tooltip.format;
        }
        var textX = '${point.x}';
        var format = textX;
        return format + ' : ' + (chart.theme.indexOf('Tailwind3') > -1 ? '${point.y}' : '<b>${point.y}</b>');
    };
    /**
     * Gets the 3D data (point and series) associated with the provided event in the chart.
     *
     * @param {MouseEvent | PointerEvent | TouchEvent | KeyboardEvent} event - The event for which to retrieve 3D data.
     * @returns {Point3D} - The 3D data object containing the point and series information.
     * @private
     */
    Tooltip3D.prototype.get3dData = function (event) {
        var chart = this.chart3D;
        var point = null;
        var series = null;
        var currentX = this.chart3D.mouseX;
        var currentY = this.chart3D.mouseY;
        var rect = this.chart3D.chartAxisLayoutPanel.seriesClipRect;
        var index;
        var pointIndex;
        var seriesIndex;
        var targetElement = event.target;
        if (targetElement && currentX > rect.x && currentX < (rect.x + rect.width) &&
            currentY > rect.y && currentY < (rect.y + rect.height)) {
            var nodeName = targetElement.nodeName;
            if ((nodeName === 'shape' || nodeName === 'path') && targetElement.id.indexOf('region') > 1) {
                index = targetElement.id.match(/(\d+)/g);
                pointIndex = parseInt(index[index.length - 1].toString(), 10);
                seriesIndex = parseInt(index[index.length - 2].toString(), 10);
            }
        }
        if (!isNullOrUndefined(seriesIndex)) {
            series = chart.visibleSeries[seriesIndex];
        }
        if (series) {
            if (series.visible) {
                point = series.points[pointIndex];
            }
            if (point) {
                return new Point3D(point, series);
            }
        }
        return new Point3D(point, series);
    };
    /**
     * Finds data based on the provided 3D data and the previous 3D data.
     *
     * @param {Point3D} data - The current 3D data.
     * @param {Point3D} previous - The previous 3D data.
     * @returns {boolean} - Returns true if the data is found based on the conditions.
     * @private
     */
    Tooltip3D.prototype.findData = function (data, previous) {
        return data.point && ((!previous || (previous.point !== data.point)) || (previous.point === data.point));
    };
    /**
     * Gets the module name.
     *
     * @returns {string} - The module name.
     */
    Tooltip3D.prototype.getModuleName = function () {
        /**
         * Returns the module name
         */
        return 'Tooltip3D';
    };
    /**
     * To destroy the tooltip.
     *
     * @returns {void}
     * @private
     */
    Tooltip3D.prototype.destroy = function () {
        /**
         * Destroy method performed here
         */
        this.removeEventListener();
    };
    return Tooltip3D;
}(BaseTooltip));
export { Tooltip3D };
