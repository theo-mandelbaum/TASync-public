import { ClosestPoint, SmithchartRect } from '../../smithchart/utils/utils';
import { Tooltip } from '@syncfusion/ej2-svg-base';
import { isNullOrUndefined, createElement } from '@syncfusion/ej2-base';
/**
 * To render tooltip
 */
var TooltipRender = /** @class */ (function () {
    function TooltipRender() {
    }
    TooltipRender.prototype.smithchartMouseMove = function (smithchart, e) {
        var touchArg;
        var pageX;
        var pageY;
        if (e.type === 'touchend' || e.type === 'touchmove') {
            touchArg = e;
            pageX = touchArg.changedTouches[0].clientX;
            pageY = touchArg.changedTouches[0].clientY;
            this.tooltipElement = undefined;
        }
        else {
            pageY = e.clientY;
            pageX = e.clientX;
        }
        this.setMouseXY(smithchart, pageX, pageY);
        for (var i = 0; i < smithchart.series.length; i++) {
            var series = smithchart.series[i];
            var seriesIndex = i;
            var closestPoint = new ClosestPoint();
            closestPoint = this.closestPointXY(smithchart, this.mouseX, this.mouseY, series, seriesIndex);
            if (closestPoint.location && series.tooltip.visible && series.visibility === 'visible') {
                this.createTooltip(smithchart, e, closestPoint.index, seriesIndex, series);
                break;
            }
            else if (this.tooltipElement) {
                if (this.tooltipElement.enable && !series.tooltip.template) {
                    this.tooltipElement.enable = false;
                }
                this.tooltipElement.fadeOut();
            }
        }
        return this.tooltipElement;
    };
    TooltipRender.prototype.setMouseXY = function (smithchart, pageX, pageY) {
        var svgRectElement = document.getElementById(smithchart.element.id + '_svg');
        if (smithchart.element && svgRectElement) {
            var rect = smithchart.element.getBoundingClientRect();
            var svgRect = svgRectElement.getBoundingClientRect();
            this.mouseX = (pageX - rect.left) - Math.max(svgRect.left - rect.left, 0);
            this.mouseY = (pageY - rect.top) - Math.max(svgRect.top - rect.top, 0);
        }
    };
    TooltipRender.prototype.createTooltip = function (smithchart, e, pointIndex, seriesindex, series) {
        var _this = this;
        var currentPoint = series.points[pointIndex];
        var pointX = currentPoint.resistance;
        var pointY = currentPoint.reactance;
        var tooltip = currentPoint.tooltip ? [currentPoint.tooltip] : null;
        var tooltipText = [pointX + ' : ' + (smithchart.theme.indexOf('Tailwind3') > -1 ? pointY : '<b>' + pointY + '</b>')];
        var argsData = {
            cancel: false, name: 'tooltipRender',
            text: tooltip || tooltipText,
            headerText: smithchart.theme.indexOf('Tailwind3') > -1 ? series.name : '<b>' + series.name + '</b>',
            template: series.tooltip.template,
            point: currentPoint
        };
        var smithChartTooltipSuccess = function (argsData) {
            var markerHeight = smithchart.series[seriesindex].marker.height / 2;
            var div = document.getElementById(smithchart.element.id + '_smithchart_tooltip_div');
            if (isNullOrUndefined(div)) {
                div = createElement('div', {
                    id: smithchart.element.id + '_smithchart_tooltip_div',
                    styles: 'pointer-events: none; position: absolute;z-index:1;'
                });
                document.getElementById(smithchart.element.id + '_Secondary_Element').appendChild(div);
            }
            _this.tooltipElement = new Tooltip({
                enable: true,
                header: argsData.headerText,
                content: argsData.text,
                border: series.tooltip.border,
                fill: series.tooltip.fill || smithchart.themeStyle.tooltipFill,
                opacity: series.tooltip.opacity,
                data: currentPoint,
                template: argsData.template,
                location: {
                    x: _this.locationX + smithchart.element.offsetLeft,
                    y: _this.locationY - markerHeight + smithchart.element.offsetTop
                },
                shared: false,
                areaBounds: new SmithchartRect(smithchart.bounds.x, smithchart.bounds.y, smithchart.bounds.width, smithchart.bounds.height),
                palette: [series.fill || smithchart.seriesColors[seriesindex % smithchart.seriesColors.length]],
                shapes: ['Circle'],
                availableSize: smithchart.availableSize,
                theme: smithchart.theme
            });
            _this.tooltipElement.opacity = smithchart.themeStyle.tooltipFillOpacity || _this.tooltipElement.opacity;
            _this.tooltipElement.textStyle.fontFamily = smithchart.themeStyle.fontFamily || 'Roboto, Segoe UI, Noto, Sans-serif';
            _this.tooltipElement.textStyle.size = smithchart.themeStyle.tooltipFontSize || '13px';
            _this.tooltipElement.textStyle.color = smithchart.themeStyle.tooltipBoldLabel || _this.tooltipElement.textStyle.color;
            _this.tooltipElement.appendTo(div);
            var element = document.getElementById(smithchart.element.id + '_smithchart_tooltip_div_Trackball_0');
            if (element) {
                element.setAttribute('role', 'img');
            }
        };
        smithChartTooltipSuccess.bind(this, smithchart);
        smithchart.trigger('tooltipRender', argsData, smithChartTooltipSuccess);
    };
    TooltipRender.prototype.closestPointXY = function (smithchart, x, y, series, seriesindex) {
        var pointIndex;
        var chartPoint;
        var closePoint;
        for (var j = 0; j < series.points.length; j++) {
            chartPoint = smithchart.seriesrender.getLocation(seriesindex, j);
            this.locationX = chartPoint.x;
            this.locationY = chartPoint.y;
            pointIndex = j;
            var a = x - chartPoint.x;
            var b = y - chartPoint.y;
            var distance = Math.abs(Math.sqrt((a * a) + (b * b)));
            if (distance < series.marker.width) {
                closePoint = chartPoint;
                pointIndex = j;
                break;
            }
        }
        return { location: closePoint, index: pointIndex };
    };
    /**
     * Get module name.
     *
     * @returns {string} It returns module name
     */
    TooltipRender.prototype.getModuleName = function () {
        return 'TooltipRender';
    };
    /**
     * To destroy the legend.
     *
     * @returns {void}
     * @private
     */
    TooltipRender.prototype.destroy = function () {
        /**
         * Destroy method performed here
         */
    };
    return TooltipRender;
}());
export { TooltipRender };
