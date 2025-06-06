/**
 * HeatMap tool tip file
 */
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
import { createElement, Property, Complex, ChildProperty, isNullOrUndefined, select } from '@syncfusion/ej2-base';
import { getSanitizedTexts, removeElement } from '../utils/helper';
import { Tooltip as tool } from '@syncfusion/ej2-svg-base';
import { TooltipBorder, Font } from '../model/base';
import { Theme } from '../model/theme';
/**
 * Sets and gets the options to customize the tooltip in heatmap.
 */
var TooltipSettings = /** @class */ (function (_super) {
    __extends(TooltipSettings, _super);
    function TooltipSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property('')
    ], TooltipSettings.prototype, "template", void 0);
    __decorate([
        Property('')
    ], TooltipSettings.prototype, "fill", void 0);
    __decorate([
        Complex({}, TooltipBorder)
    ], TooltipSettings.prototype, "border", void 0);
    __decorate([
        Complex(Theme.tooltipFont, Font)
    ], TooltipSettings.prototype, "textStyle", void 0);
    return TooltipSettings;
}(ChildProperty));
export { TooltipSettings };
/**
 *
 * The `Tooltip` module is used to render the tooltip for heatmap series.
 */
var Tooltip = /** @class */ (function () {
    function Tooltip(heatMap) {
        /* private */
        this.isFirst = true;
        /* private */
        this.isFadeout = false;
        this.heatMap = heatMap;
    }
    /**
     * Get module name
     */
    Tooltip.prototype.getModuleName = function () {
        return 'Tooltip';
    };
    /**
     * To show/hide Tooltip.
     *
     * @private
     */
    Tooltip.prototype.showHideTooltip = function (isShow, isFadeout) {
        if (!isNullOrUndefined(this.heatMap)) {
            var ele = document.getElementById(this.heatMap.element.id + 'Celltooltipcontainer');
            if (!isShow) {
                if (!isNullOrUndefined(ele) && ele.style.visibility !== 'hidden') {
                    if (!isNullOrUndefined(this.tooltipObject) && isFadeout && this.heatMap.isRectBoundary) {
                        this.tooltipObject.fadeOut();
                    }
                    else {
                        if (!isNullOrUndefined(this.tooltipObject) && !isNullOrUndefined(this.tooltipObject.element)) {
                            var tooltipElement = this.tooltipObject.element.firstChild;
                            tooltipElement.setAttribute('opacity', '0');
                        }
                    }
                    ele.style.visibility = 'hidden';
                }
                this.isFadeout = true;
            }
            else {
                ele.style.visibility = 'visible';
            }
        }
    };
    /**
     * To destroy the Tooltip.
     *
     * @returns {void}
     * @private
     */
    Tooltip.prototype.destroy = function () {
        if (!isNullOrUndefined(this.tooltipObject)) {
            this.tooltipObject.destroy();
            this.tooltipObject.controlInstance = null;
            removeElement(this.heatMap.element.id + 'Celltooltipcontainer');
        }
        this.tooltipObject = null;
        this.heatMap = null;
    };
    /**
     * To add Tooltip to the rect cell.
     *
     * @returns {void}
     * @private
     */
    Tooltip.prototype.createTooltip = function (currentRect, x, y, tempTooltipText) {
        var offset = null;
        var element = select('#' + this.heatMap.element.id + 'Celltooltipcontainer');
        if (this.heatMap.cellSettings.showLabel && this.heatMap.heatMapSeries.checkLabelXDisplay &&
            this.heatMap.heatMapSeries.checkLabelYDisplay) {
            offset = parseInt(this.heatMap.cellSettings.textStyle.size, 10) / 2;
        }
        if (this.heatMap.theme === 'Tailwind' || this.heatMap.theme === 'Tailwind3') {
            this.heatMap.setProperties({ tooltipSettings: { textStyle: { size: '12px', fontFamily: 'Inter', fontWeight: '500' } } }, true);
        }
        if (this.heatMap.theme === 'TailwindDark' || this.heatMap.theme === 'Tailwind3Dark') {
            this.heatMap.setProperties({ tooltipSettings: { fill: '#F9FAFB', textStyle: { size: '12px', fontFamily: 'Inter', fontWeight: '500', color: '#1F2937' } } }, true);
        }
        if (this.heatMap.theme === 'Bootstrap5') {
            this.heatMap.setProperties({ tooltipSettings: { fill: '#000000', textStyle: { size: '12px', fontFamily: 'Segoe UI', fontWeight: '400', color: '#FFFFFF' } } }, true);
        }
        if (this.heatMap.theme === 'Bootstrap5Dark') {
            this.heatMap.setProperties({ tooltipSettings: { fill: '#FFFFFF', textStyle: { size: '12px', fontFamily: 'Segoe UI', fontWeight: '400', color: '#212529' } } }, true);
        }
        if (this.heatMap.theme === 'Fluent') {
            this.heatMap.setProperties({ tooltipSettings: { textStyle: { size: '12px', fontFamily: '"Segoe UI", -apple-system, BlinkMacSystemFont, "Roboto", "Helvetica Neue", sans-serif', fontWeight: '500' } } }, true);
        }
        if (this.heatMap.theme === 'FluentDark') {
            this.heatMap.setProperties({ tooltipSettings: { fill: '#252423', textStyle: { size: '12px', fontFamily: '"Segoe UI", -apple-system, BlinkMacSystemFont, "Roboto", "Helvetica Neue", sans-serif', fontWeight: '500', color: '#F3F2F1' } } }, true);
        }
        if (this.heatMap.theme === 'Material3') {
            this.heatMap.setProperties({ tooltipSettings: { fill: '#313033', textStyle: { size: '14px', fontFamily: 'Roboto', fontWeight: '400', color: '#F4EFF4' } } }, true);
        }
        if (this.heatMap.theme === 'Material3Dark') {
            this.heatMap.setProperties({ tooltipSettings: { fill: '#E6E1E5', textStyle: { size: '14px', fontFamily: 'Roboto', fontWeight: '400', color: '#313033' } } }, true);
        }
        if (this.heatMap.theme === 'Fluent2') {
            this.heatMap.setProperties({ tooltipSettings: { fill: '#FFFFFF', textStyle: { size: '12px', fontFamily: 'Segoe UI', fontWeight: '400', color: '#242424' } } }, true);
        }
        if (this.heatMap.theme === 'Fluent2Dark') {
            this.heatMap.setProperties({ tooltipSettings: { fill: '#292929', textStyle: { size: '12px', fontFamily: 'Segoe UI', fontWeight: '400', color: '#FFFFFF' } } }, true);
        }
        if (this.heatMap.theme === 'Fluent2HighContrast') {
            this.heatMap.setProperties({
                tooltipSettings: {
                    fill: '#000000', textStyle: { size: '12px', fontFamily: 'Segoe UI', fontWeight: '400', color: '#FFFFFF' },
                    border: { width: 1, color: '#FFF' }
                }
            }, true);
        }
        this.tooltipObject = new tool({
            opacity: (this.heatMap.theme === 'Tailwind' || this.heatMap.theme === 'Tailwind3' || this.heatMap.theme === 'TailwindDark' || this.heatMap.theme === 'Tailwind3Dark' || this.heatMap.theme === 'Bootstrap5' || this.heatMap.theme === 'Bootstrap5Dark' || this.heatMap.theme === 'Fluent' || this.heatMap.theme === 'FluentDark'
                || this.heatMap.theme === 'Fluent2' || this.heatMap.theme === 'Fluent2Dark' || this.heatMap.theme === 'Fluent2HighContrast') ? 1 : 0.75,
            enableAnimation: false,
            offset: offset,
            location: { x: x, y: y },
            availableSize: this.heatMap.availableSize,
            data: {
                xValue: this.heatMap.heatMapSeries.hoverXAxisValue,
                yValue: this.heatMap.heatMapSeries.hoverYAxisValue,
                value: currentRect.value,
                xLabel: this.heatMap.heatMapSeries.hoverXAxisLabel ?
                    this.heatMap.heatMapSeries.hoverXAxisLabel.toString() : null,
                yLabel: this.heatMap.heatMapSeries.hoverYAxisLabel ?
                    this.heatMap.heatMapSeries.hoverYAxisLabel.toString() : null
            },
            theme: this.heatMap.theme,
            content: tempTooltipText,
            fill: this.heatMap.tooltipSettings.fill,
            enableShadow: true,
            template: this.heatMap.tooltipSettings.template === '' ? null : this.heatMap.tooltipSettings.template,
            border: {
                width: this.heatMap.tooltipSettings.border.width,
                color: this.heatMap.tooltipSettings.border.color
            },
            textStyle: {
                size: this.heatMap.tooltipSettings.textStyle.size,
                fontWeight: this.heatMap.tooltipSettings.textStyle.fontWeight.toLowerCase(),
                color: this.heatMap.tooltipSettings.textStyle.color,
                fontStyle: this.heatMap.tooltipSettings.textStyle.fontStyle.toLowerCase(),
                fontFamily: this.heatMap.tooltipSettings.textStyle.fontFamily
            },
            areaBounds: {
                height: this.heatMap.initialClipRect.height + this.heatMap.initialClipRect.y,
                width: this.heatMap.initialClipRect.width, x: this.heatMap.initialClipRect.x
            }
        }, element);
    };
    /**
     * To create div container for tooltip.
     *
     * @returns {void}
     * @private
     */
    Tooltip.prototype.createTooltipDiv = function (heatMap) {
        var position = 'absolute';
        var top = heatMap.enableCanvasRendering && heatMap.allowSelection ? heatMap.availableSize.height : 0;
        var element2 = createElement('div', {
            id: this.heatMap.element.id + 'Celltooltipcontainer'
        });
        element2.style.cssText = 'position:' + position + '; z-index: 3;top:-' + top + 'px';
        var tooltipElement = createElement('div', {
            id: this.heatMap.element.id + 'Celltooltipparent'
        });
        tooltipElement.style.position = 'relative';
        tooltipElement.appendChild(element2);
        this.heatMap.element.appendChild(tooltipElement);
    };
    /**
     * To get default tooltip content.
     *
     * @private
     */
    Tooltip.prototype.getTooltipContent = function (currentRect, hetmapSeries) {
        var value;
        var content;
        var heatMap = this.heatMap;
        var adaptData = this.heatMap.dataSourceSettings;
        if (heatMap.bubbleSizeWithColor) {
            var xAxis = heatMap.xAxis.title && heatMap.xAxis.title.text !== '' ? heatMap.xAxis.title.text : 'X-Axis';
            var yAxis = heatMap.yAxis.title && heatMap.yAxis.title.text !== '' ? heatMap.yAxis.title.text : 'Y-Axis';
            var value1 = adaptData.isJsonData && adaptData.adaptorType === 'Cell' ?
                adaptData.bubbleDataMapping.size : 'Value 1';
            var value2 = adaptData.isJsonData && adaptData.adaptorType === 'Cell' ?
                adaptData.bubbleDataMapping.color : 'Value 2';
            value = hetmapSeries.getFormatedText(currentRect.value[0].bubbleData, this.heatMap.cellSettings.format);
            content = [xAxis + ' : ' + hetmapSeries.hoverXAxisLabel + '<br/>'
                    + yAxis + ' : ' + hetmapSeries.hoverYAxisLabel + '<br/>'
                    + value1 + ' : ' + value + '<br/>'
                    + value2 + ' : '
                    + hetmapSeries.getFormatedText(currentRect.value[1].bubbleData, this.heatMap.cellSettings.format)];
        }
        else {
            value = currentRect.value;
            content = [hetmapSeries.hoverXAxisLabel + ' | ' + hetmapSeries.hoverYAxisLabel + ' : ' +
                    hetmapSeries.getFormatedText(value, this.heatMap.cellSettings.format)];
        }
        content = getSanitizedTexts(content, this.heatMap.enableHtmlSanitizer);
        return content;
    };
    /**
     * To render tooltip.
     *
     * @private
     */
    Tooltip.prototype.renderTooltip = function (currentRect) {
        var _this = this;
        var hetmapSeries = this.heatMap.heatMapSeries;
        var tempTooltipText = [''];
        var showTooltip = this.heatMap.bubbleSizeWithColor ?
            !isNullOrUndefined(currentRect.value) && !isNullOrUndefined(currentRect.value[0].bubbleData)
                && currentRect.value[0].bubbleData.toString() !== '' ? true : false
            : isNullOrUndefined(currentRect.value) || (!isNullOrUndefined(currentRect.value) &&
                currentRect.value.toString() === '') ? false : true;
        if (!showTooltip) {
            this.showHideTooltip(false, false);
            if (!currentRect.visible) {
                this.showHideTooltip(false, false);
            }
        }
        else {
            if (!isNullOrUndefined(this.heatMap.tooltipRender)) {
                // this.tooltipObject.header = '';
                // this.tooltipObject.content = this.getTemplateText(
                //     currentRect, this.heatMap.tooltipTemplate, hetmapSeries.hoverXAxisLabel,
                //     hetmapSeries.hoverYAxisLabel);
                var content = this.getTooltipContent(currentRect, hetmapSeries);
                var argData = {
                    heatmap: this.heatMap,
                    cancel: false,
                    name: 'tooltipRender',
                    value: currentRect.value,
                    xValue: this.heatMap.heatMapSeries.hoverXAxisValue,
                    yValue: this.heatMap.heatMapSeries.hoverYAxisValue,
                    xLabel: this.heatMap.heatMapSeries.hoverXAxisLabel ?
                        this.heatMap.heatMapSeries.hoverXAxisLabel.toString() : null,
                    yLabel: this.heatMap.heatMapSeries.hoverYAxisLabel ?
                        this.heatMap.heatMapSeries.hoverYAxisLabel.toString() : null,
                    content: content
                };
                this.heatMap.trigger('tooltipRender', argData, function (observedArgs) {
                    if (!observedArgs.cancel) {
                        tempTooltipText = observedArgs.content;
                        _this.tooltipCallback(currentRect, tempTooltipText);
                    }
                    else {
                        if (_this.tooltipObject) {
                            _this.showHideTooltip(false);
                        }
                    }
                });
            }
            else {
                //  this.tooltipObject.header = hetmapSeries.hoverYAxisLabel.toString();
                tempTooltipText = this.getTooltipContent(currentRect, hetmapSeries);
                this.tooltipCallback(currentRect, tempTooltipText);
            }
        }
    };
    /**
     * To render tooltip.
     */
    Tooltip.prototype.tooltipCallback = function (currentRect, tempTooltipText) {
        if (!this.tooltipObject) {
            this.createTooltip(currentRect, currentRect.x + (currentRect.width / 2), currentRect.y + (currentRect.height / 2), tempTooltipText);
        }
        else {
            this.tooltipObject.content = tempTooltipText;
            this.tooltipObject.data = {
                xValue: this.heatMap.heatMapSeries.hoverXAxisValue,
                yValue: this.heatMap.heatMapSeries.hoverYAxisValue,
                xLabel: this.heatMap.heatMapSeries.hoverXAxisLabel ?
                    this.heatMap.heatMapSeries.hoverXAxisLabel.toString() : null,
                yLabel: this.heatMap.heatMapSeries.hoverYAxisLabel ?
                    this.heatMap.heatMapSeries.hoverYAxisLabel.toString() : null,
                value: currentRect.value
            };
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if (this.heatMap.isVue || this.heatMap.isVue3) {
            this.tooltipObject.controlInstance = this.heatMap;
        }
        this.showHideTooltip(true);
        this.tooltipObject.enableAnimation = (this.isFirst || this.isFadeout) ? false : true;
        this.isFirst = (this.isFirst) ? false : this.isFirst;
        this.isFadeout = (this.isFadeout) ? false : this.isFadeout;
        this.tooltipObject.location.x = currentRect.x + (currentRect.width / 2);
        this.tooltipObject.location.y = currentRect.y + (currentRect.height / 2);
        if (!currentRect.visible) {
            this.showHideTooltip(false, false);
        }
    };
    return Tooltip;
}());
export { Tooltip };
