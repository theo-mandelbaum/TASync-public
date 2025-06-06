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
import { Component, Property, NotifyPropertyChanges, Complex, Collection, Browser } from '@syncfusion/ej2-base';
import { EventHandler, remove, Internationalization } from '@syncfusion/ej2-base';
import { Event } from '@syncfusion/ej2-base';
import { createSvg, removeElement } from '../common/utils/helper';
import { Rect, measureText, Size } from '@syncfusion/ej2-svg-base';
import { Border, Margin, PeriodSelectorSettings } from '../common/model/base';
import { RangeSeries } from './renderer/chart-render';
import { RangeNavigatorAxis } from './renderer/range-axis';
import { RangeNavigatorSeries, StyleSettings, RangeTooltipSettings } from './model/range-base';
import { RangeSlider } from './renderer/slider';
import { RectOption, getElement } from '../common/utils/helper';
import { LineSeries } from '../chart/series/line-series';
import { beforeResize } from '../common/model/constants';
import { getRangeThemeColor } from './utils/theme';
import { Font } from '../common/model/base';
import { MajorGridLines, MajorTickLines } from '../chart/axis/axis';
import { Double } from '../chart/axis/double-axis';
import { ExportUtils } from '../common/utils/export';
import { PeriodSelector } from '../common/period-selector/period-selector';
import { PrintUtils } from '../common/utils/print';
/**
 * Range Navigator
 */
var RangeNavigator = /** @class */ (function (_super) {
    __extends(RangeNavigator, _super);
    /**
     * Constructor for creating the widget.
     *
     * @param {RangeNavigatorModel} options - Specifies the Range Navigator model.
     * @param {string | HTMLElement} element - Specifies the element for the Range Navigator.
     * @hidden
     */
    function RangeNavigator(options, element) {
        var _this = _super.call(this, options, element) || this;
        /** @private */
        _this.animateSeries = true;
        _this.chartid = 57725;
        _this.redraw = false;
        return _this;
    }
    /**
     * Starting point of the control initialization.
     *
     * @returns {void}
     */
    RangeNavigator.prototype.preRender = function () {
        this.unWireEvents();
        this.setCulture();
        this.allowServerDataBinding = false;
        if (this.periodSelectorModule) {
            this.periodSelectorModule.selectedIndex = null;
        }
        if (this.element.id === '') {
            var collection = document.getElementsByClassName('e-rangenavigator').length;
            this.element.id = 'rangenavigator_' + this.chartid + '_' + collection;
        }
        this.wireEvents();
    };
    /**
     * To initialize the private variables.
     *
     * @returns {void}
     */
    RangeNavigator.prototype.initPrivateVariables = function () {
        this.doubleModule = new Double();
        this.labels = [];
        this.rangeSlider = new RangeSlider(this);
        this.chartSeries = new RangeSeries(this);
        this.lineSeriesModule = new LineSeries();
        this.rangeAxis = new RangeNavigatorAxis(this);
    };
    /**
     * Method to set culture for chart.
     *
     * @returns {void}
     */
    RangeNavigator.prototype.setCulture = function () {
        this.intl = new Internationalization();
    };
    /**
     * To initialize the slider.
     *
     * @returns {void}
     */
    RangeNavigator.prototype.setSliderValue = function () {
        var isDateTime = this.valueType === 'DateTime';
        var isDateTimeCategory = this.valueType === 'DateTimeCategory';
        var range = this.chartSeries.xAxis.actualRange;
        this.startValue = (this.startValue || (isDateTimeCategory && this.startValue === 0)) ? this.startValue : (!this.value[0] ?
            range.min : (isDateTime ? (new Date(this.value[0].toString())).getTime() : isDateTimeCategory ?
            this.getRangeValue(new Date(this.value[0].toString()).getTime(), true) : +this.value[0]));
        this.endValue = (this.endValue || (isDateTimeCategory && this.endValue === 0)) ? this.endValue : (!this.value[1] ? range.max :
            (isDateTime ? (new Date(this.value[1].toString())).getTime() : isDateTimeCategory ?
                this.getRangeValue(new Date(this.value[1].toString()).getTime(), false) : +this.value[1]));
    };
    /**
     * To find the start and end value in the date-time category.
     *
     * @param {number} value - The value in the date-time category.
     * @param {boolean} isStart - To find the start value in the date-time category.
     * @returns {number} - The start or end value in date-time category.
     */
    RangeNavigator.prototype.getRangeValue = function (value, isStart) {
        var labels = this.chartSeries.xAxis.labels;
        var index = labels.length - 1;
        while (index >= 0 && parseInt(labels[index], 10) > value) {
            index--;
        }
        return isStart ? (index !== -1 ? index : this.chartSeries.xAxis.actualRange.min) :
            (index === 0 ? this.chartSeries.xAxis.actualRange.max : index);
    };
    /**
     * To render the range navigator.
     *
     * @returns {void}
     */
    RangeNavigator.prototype.render = function () {
        var _this = this;
        var loadEventData = {
            name: 'load', rangeNavigator: this,
            theme: this.theme
        };
        this.trigger('load', loadEventData, function () {
            //this.theme = this.theme;
            _this.setTheme();
            _this.initPrivateVariables();
            _this.createRangeSvg();
            _this.calculateBounds();
            _this.chartSeries.renderChart(_this);
            removeElement('chartmeasuretext');
            _this.renderComplete();
            _this.allowServerDataBinding = true;
        });
        this.element.setAttribute('tabindex', '0');
        this.element.style.outline = 'none';
        this.element.setAttribute('role', 'region');
        this.element.setAttribute('aria-label', 'Range navigator' + ' Syncfusion interactive chart.');
    };
    /**
     * Theming for rangeNavigator.
     *
     * @returns {void}
     */
    RangeNavigator.prototype.setTheme = function () {
        /** Set theme */
        this.themeStyle = getRangeThemeColor(this.theme, this);
    };
    /**
     * Method to create SVG for Range Navigator.
     *
     * @returns {void}
     */
    RangeNavigator.prototype.createRangeSvg = function () {
        this.removeSvg();
        createSvg(this);
        this.renderChartBackground();
    };
    /**
     * Bounds calculation for widget performed.
     *
     * @returns {void}
     */
    RangeNavigator.prototype.calculateBounds = function () {
        var labelPadding = this.enableGrouping ? 15 : 8;
        var thumb = this.navigatorStyleSettings.thumb;
        var labelSize = measureText('tempString', this.labelStyle, this.themeStyle.axisLabelFont).height;
        var margin = this.margin;
        var isLeightWeight = !this.series.length;
        var tooltipSpace = (!this.disableRangeSelector) &&
            isLeightWeight && this.tooltip.enable ? 35 : 0;
        if (!this.periodSelectorModule && this.periodSelectorSettings.periods.length && !this.stockChart) {
            this.periodSelectorModule = new PeriodSelector(this);
        }
        var selector = this.periodSelectorModule;
        if (this.periodSelectorModule && this.periodSelectorSettings.periods.length > 0) {
            selector.periodSelectorSize = { x: 0, y: 0, height: 0, width: 0 };
            selector.periodSelectorSize.width = this.availableSize.width;
            selector.periodSelectorSize.height = this.periodSelectorSettings.height;
            selector.periodSelectorSize.y = this.periodSelectorSettings.position === 'Bottom' ?
                this.availableSize.height - selector.periodSelectorSize.height : 0;
        }
        var periodSelectorY = this.periodSelectorSettings.position === 'Top' && selector ?
            selector.periodSelectorSize.y + selector.periodSelectorSize.height : 0;
        var left = 0;
        var top = 0;
        if (this.stockChart && this.stockChart.stockLegendModule && this.stockChart.legendSettings.visible) {
            if (this.stockChart.legendSettings.position === 'Left') {
                left += this.stockChart.stockLegendModule.legendBounds.width;
            }
            else if (this.stockChart.legendSettings.position === 'Top') {
                top += this.stockChart.stockLegendModule.legendBounds.height;
            }
        }
        this.bounds = new Rect((this.themeStyle.thumbWidth / 2 + thumb.border.width + margin.left + left), margin.top + tooltipSpace + periodSelectorY + top, this.availableSize.width - this.themeStyle.thumbWidth - (thumb.border.width * 2) - margin.left - margin.right, this.availableSize.height - margin.top - margin.bottom - tooltipSpace - (selector ? selector.periodSelectorSize.height : 0));
        var deductHeight = ((this.labelPosition === 'Outside' || isLeightWeight) ?
            (labelSize + labelPadding) : 0) + ((this.tickPosition === 'Outside' || isLeightWeight) ?
            (this.majorTickLines.height) : 0);
        this.bounds.height -= deductHeight;
        if (isLeightWeight) {
            var height = this.enableGrouping ? this.bounds.height - ((labelSize) + labelPadding) : this.bounds.height;
            this.bounds.y += (this.themeStyle.thumbHeight > height ? (this.themeStyle.thumbHeight - height) / 2 : 0);
        }
        if (this.disableRangeSelector) {
            this.bounds.y = 0;
            this.bounds.height = this.periodSelectorSettings.periods.length > 0 ? this.periodSelectorSettings.height : 0;
        }
    };
    /**
     * Creating Chart for range navigator.
     *
     * @param {boolean} resize - Indicates whether the chart should be resized.
     * @returns {void}
     */
    RangeNavigator.prototype.renderChart = function (resize) {
        if (resize === void 0) { resize = false; }
        this.chartSeries.renderSeries(this);
        this.chartSeries.appendSeriesElements(this);
        this.rangeAxis.renderGridLines();
        this.rangeAxis.renderAxisLabels();
        this.createSecondaryElement();
        this.setSliderValue();
        this.renderPeriodSelector();
        this.renderSlider(resize);
        if (!this.stockChart) {
            this.element.appendChild(this.svgObject);
        }
        this.trigger('loaded', { rangeNavigator: this });
        this.rangeSlider.setSlider(this.startValue, this.endValue, false, this.tooltip.enable && this.tooltip.displayMode === 'Always', resize);
    };
    /**
     * To render period selector value.
     *
     * @returns {void}
     */
    RangeNavigator.prototype.renderPeriodSelector = function () {
        if (this.periodSelectorModule) {
            this.periodSelectorModule.renderSelectorElement(this);
            this.periodSelectorModule.renderSelector();
        }
    };
    /**
     * Creating secondary range navigator.
     *
     * @returns {void}
     */
    RangeNavigator.prototype.createSecondaryElement = function () {
        // For userInteraction
        if (this.tooltip.enable) {
            var tooltipDiv = this.createElement('div');
            tooltipDiv.id = this.element.id + '_Secondary_Element';
            tooltipDiv.style.position = 'relative';
            this.element.appendChild(tooltipDiv);
        }
    };
    /**
     * Slider Calculation ane rendering performed here.
     *
     * @param {boolean} resize - Indicates whether the slider should be resized.
     * @returns {void}
     */
    RangeNavigator.prototype.renderSlider = function (resize) {
        this.rangeSlider.render(this);
        if (this.periodSelectorModule) {
            this.startValue = this.periodSelectorModule.control.startValue;
            this.endValue = this.periodSelectorModule.control.endValue;
        }
        this.rangeSlider.setSlider(this.startValue, this.endValue, true, this.tooltip.enable && this.tooltip.displayMode === 'Always', resize);
    };
    /**
     * To Remove the SVG.
     *
     * @returns {void}
     * @private
     */
    RangeNavigator.prototype.removeSvg = function () {
        if (getElement(this.element.id + '_Secondary_Element')) {
            remove(getElement(this.element.id + '_Secondary_Element'));
            if (this.isReact) {
                this.clearTemplate();
            }
        }
        var removeLength = 0;
        if (this.svgObject) {
            while (this.svgObject.childNodes.length > removeLength) {
                this.svgObject.removeChild(this.svgObject.firstChild);
            }
            if (!this.svgObject.hasChildNodes() && this.svgObject.parentNode && !this.stockChart) {
                remove(this.svgObject);
            }
        }
    };
    /** Wire, UnWire and Event releated calculation Started here */
    /**
     * Method to un-bind events for range navigator.
     *
     * @returns {void}
     */
    RangeNavigator.prototype.unWireEvents = function () {
        /** Find the Events type */
        var startEvent = Browser.touchStartEvent;
        var moveEvent = Browser.touchMoveEvent;
        var stopEvent = Browser.touchEndEvent;
        var cancelEvent = Browser.isPointer ? 'pointerleave' : 'mouseleave';
        /** UnBind the Event handler */
        EventHandler.remove(this.element, startEvent, this.rangeOnMouseDown);
        EventHandler.remove(this.element, moveEvent, this.mouseMove);
        EventHandler.remove(this.element, stopEvent, this.mouseEnd);
        EventHandler.remove(this.element, 'click', this.rangeOnMouseClick);
        //EventHandler.remove(this.element, 'contextmenu', this.rangeRightClick);
        EventHandler.remove(this.element, cancelEvent, this.mouseLeave);
        window.removeEventListener((Browser.isTouch && ('orientation' in window && 'onorientationchange' in window)) ? 'orientationchange' : 'resize', this.rangeResize);
    };
    /**
     * Method to bind events for range navigator.
     *
     * @returns {void}
     */
    RangeNavigator.prototype.wireEvents = function () {
        /** Find the Events type */
        var cancelEvent = Browser.isPointer ? 'pointerleave' : 'mouseleave';
        /** Bind the Event handler */
        EventHandler.add(this.element, Browser.touchStartEvent, this.rangeOnMouseDown, this);
        EventHandler.add(this.element, Browser.touchMoveEvent, this.mouseMove, this);
        EventHandler.add(this.element, Browser.touchEndEvent, this.mouseEnd, this);
        EventHandler.add(this.element, 'click', this.rangeOnMouseClick, this);
        //EventHandler.add(this.element, 'contextmenu', this.rangeRightClick, this);
        EventHandler.add(this.element, cancelEvent, this.mouseLeave, this);
        window.addEventListener((Browser.isTouch && ('orientation' in window && 'onorientationchange' in window)) ? 'orientationchange' : 'resize', this.rangeResize.bind(this));
        var element = this.element;
        element.style.touchAction = 'none';
        element.style.msTouchAction = 'none';
        element.style.msContentZooming = 'none';
        element.style.msUserSelect = 'none';
        element.style.webkitUserSelect = 'none';
        element.style.position = 'relative';
        element.style.display = 'block';
    };
    /**
     * Handles the widget resize.
     *
     * @private
     * @returns {boolean} - Indicates whether the widget was resized..
     */
    RangeNavigator.prototype.rangeResize = function () {
        var _this = this;
        // To avoid resize console error
        if (!document.getElementById(this.element.id) || !this.svgObject) {
            return false;
        }
        this.animateSeries = false;
        this.removeAllTooltip();
        var beforeResizeArgs = { name: 'beforeResize', cancelResizedEvent: false };
        if (this.resizeTo) {
            clearTimeout(this.resizeTo);
        }
        var arg = {
            rangeNavigator: this,
            name: 'resized',
            currentSize: new Size(0, 0),
            previousSize: new Size(this.availableSize.width, this.availableSize.height)
        };
        this.trigger(beforeResize, beforeResizeArgs);
        if (!beforeResizeArgs.cancelResizedEvent) {
            this.resizeTo = +setTimeout(function () {
                if (_this.isDestroyed) {
                    clearTimeout(_this.resizeTo);
                    return;
                }
                _this.createRangeSvg();
                arg.currentSize = _this.availableSize;
                _this.trigger('resized', arg);
                _this.calculateBounds();
                _this.chartSeries.processXAxis(_this);
                _this.chartSeries.calculateGroupingBounds(_this);
                _this.chartSeries.processYAxis(_this);
                _this.renderChart(true);
            }, 500);
        }
        return false;
    };
    /**
     * Bug task ID: EJ2-30797
     * while resizing tooltip shows in wrong position
     * Cause: Due to time lag in resize, tooltip did not remove until the component calculation
     * Fix: Removed the tooltip element on resize
     *
     * @returns {void}
     */
    RangeNavigator.prototype.removeAllTooltip = function () {
        if (this.tooltip.enable && this.tooltip.displayMode === 'Always') {
            if (getElement(this.element.id + '_leftTooltip')) {
                remove(getElement(this.element.id + '_leftTooltip'));
            }
            if (getElement(this.element.id + '_rightTooltip')) {
                remove(getElement(this.element.id + '_rightTooltip'));
            }
        }
    };
    /**
     * Handles the mouse move.
     *
     * @private
     * @param {PointerEvent} e - The pointer event.
     * @returns {boolean} - false.
     */
    RangeNavigator.prototype.mouseMove = function (e) {
        if (this.stockChart) {
            return false;
        }
        if (getElement(!this.stockChart ? this.element.id + '_svg' : this.element.id)) {
            this.mouseX = this.setMouseX(e);
            this.notify(Browser.touchMoveEvent, e);
        }
        return false;
    };
    /**
     * Handles the mouse leave.
     *
     * @private
     * @param {PointerEvent} e - The pointer event.
     * @returns {boolean} - false.
     */
    RangeNavigator.prototype.mouseLeave = function (e) {
        var rangeSlider = this.rangeSlider;
        if (rangeSlider.isDrag) {
            if (this.stockChart) {
                return false;
            }
            var enabledTooltip = rangeSlider.control.tooltip.enable;
            if (rangeSlider.control.allowSnapping) {
                rangeSlider.isDrag = false;
                rangeSlider.setAllowSnapping(rangeSlider.control, rangeSlider.currentStart, rangeSlider.currentEnd, false, enabledTooltip);
            }
            rangeSlider.triggerEvent(this.chartSeries.xAxis.actualRange);
        }
        var cancelEvent = Browser.isPointer ? 'pointerleave' : 'mouseleave';
        this.mouseX = this.setMouseX(e);
        this.notify(cancelEvent, e);
        return false;
    };
    /**
     * Handles the mouse click on range navigator.
     *
     * @private
     * @param {PointerEvent | TouchEvent} e - The pointer event.
     * @returns {boolean} - false.
     */
    RangeNavigator.prototype.rangeOnMouseClick = function (e) {
        this.notify('click', e);
        return false;
    };
    /**
     * Handles the print method for range navigator control.
     *
     * @param {string[] | string | Element} id - The id of the range navigator to be printed on the page.
     * @returns {void}
     */
    RangeNavigator.prototype.print = function (id) {
        new PrintUtils(this).print(id);
    };
    /**
     * Handles the export method for range navigator control.
     *
     * @param {ExportType} type - The type of export.
     * @param {string} fileName - The name of the file for export.
     * @param {PdfPageOrientation} orientation - The orientation of the PDF page.
     * @param {Chart | AccumulationChart | RangeNavigator[]} controls - Array of controls to be exported.
     * @param {number} width - The width of the exported content.
     * @param {number} height - The height of the exported content.
     * @param {boolean} isVertical - Indicates whether the export is vertical.
     * @returns {void}
     */
    RangeNavigator.prototype.export = function (type, fileName, orientation, controls, width, height, isVertical) {
        controls = controls ? controls : [this];
        new ExportUtils(this).export(type, fileName, orientation, controls, width, height, isVertical);
    };
    /**
     * Creating a background element to the svg object.
     *
     * @returns {void}
     */
    RangeNavigator.prototype.renderChartBackground = function () {
        var top = 0;
        var left = 0;
        if (this.stockChart && this.stockChart.legendSettings.visible && this.stockChart.stockLegendModule) {
            if (this.stockChart.legendSettings.position === 'Top') {
                top += this.stockChart.stockLegendModule.legendBounds.height;
            }
            else if (this.stockChart.legendSettings.position === 'Left') {
                left += this.stockChart.stockLegendModule.legendBounds.width;
            }
        }
        var rect = new RectOption(this.element.id + '_ChartBorder', this.background || this.themeStyle.background, { width: 0, color: 'transparent' }, 1, new Rect(left, top, this.availableSize.width, this.availableSize.height));
        this.svgObject.appendChild(this.renderer.drawRectangle(rect));
    };
    /**
     * Handles the mouse down on range navigator.
     *
     * @private
     * @param {PointerEvent} e - The pointer event.
     * @returns {boolean} - false.
     */
    RangeNavigator.prototype.rangeOnMouseDown = function (e) {
        this.mouseDownX = this.setMouseX(e);
        this.notify(Browser.touchStartEvent, e);
        return false;
    };
    /**
     * Handles the mouse up.
     *
     * @private
     * @param {PointerEvent} e - The pointer event.
     * @returns {boolean} - false.
     */
    RangeNavigator.prototype.mouseEnd = function (e) {
        this.mouseX = this.setMouseX(e);
        this.notify(Browser.touchEndEvent, e);
        return false;
    };
    // private rangeRightClick(event: MouseEvent | PointerEvent): boolean {
    //     if (event.buttons === 2 || event.which === 0 || (<PointerEvent>event).pointerType === 'touch') {
    //         event.preventDefault();
    //         event.stopPropagation();
    //         return false;
    //     }
    //     return true;
    // }
    /**
     * To find mouse x, y for aligned range navigator element svg position.
     *
     * @param {PointerEvent} e - The pointer event.
     * @returns {number} - The mouse x-coordinate relative to the aligned range navigator SVG position..
     */
    RangeNavigator.prototype.setMouseX = function (e) {
        var pageX = e.type.indexOf('touch') > -1 ?
            e.changedTouches[0].clientX : e.clientX;
        var rect = this.element.getBoundingClientRect();
        var svgRect = !this.stockChart ? getElement(this.element.id + '_svg').getBoundingClientRect() :
            getElement(this.element.id).getBoundingClientRect();
        return (pageX - rect.left) - Math.max(svgRect.left - rect.left, 0);
    };
    /** Wire, UnWire and Event releated calculation End here */
    /**
     * Get the properties to be maintained in the persisted state.
     *
     * @private
     * @returns {string} - The persisted data containing the properties.
     */
    RangeNavigator.prototype.getPersistData = function () {
        var keyEntity = ['loaded'];
        return this.addOnPersist(keyEntity);
    };
    /**
     * OnProperty change method calling here.
     *
     * @param {RangeNavigatorModel} newProp - The new RangeNavigatorModel.
     * @returns {void}
     */
    RangeNavigator.prototype.onPropertyChanged = function (newProp) {
        var renderer = false;
        var refreshBounds = false;
        var refreshRange = false;
        this.animateSeries = false;
        for (var _i = 0, _a = Object.keys(newProp); _i < _a.length; _i++) {
            var prop = _a[_i];
            switch (prop) {
                case 'width':
                case 'height':
                case 'navigatorBorder':
                case 'enableGrouping':
                case 'labelPosition':
                case 'tickPosition':
                case 'labelStyle':
                    refreshBounds = true;
                    break;
                case 'enableRtl':
                case 'xName':
                case 'yName':
                case 'query':
                case 'minimum':
                case 'maximum':
                case 'interval':
                case 'intervalType':
                case 'logBase':
                case 'valueType':
                case 'majorGridLines':
                case 'minorGridLines':
                case 'navigatorStyleSettings':
                case 'labelFormat':
                case 'skeleton':
                case 'skeletonType':
                case 'secondaryLabelAlignment':
                case 'background':
                    renderer = true;
                    break;
                case 'dataSource':
                case 'series':
                    renderer = true;
                    refreshBounds = true;
                    break;
                case 'theme':
                    this.animateSeries = true;
                    break;
                case 'locale':
                    _super.prototype.refresh.call(this);
                    break;
                case 'value':
                    this.startValue = null;
                    this.endValue = null;
                    refreshRange = true;
                    this.redraw = true;
                    break;
            }
        }
        if (!refreshBounds && renderer) {
            this.removeSvg();
            this.chartSeries.xMin = Infinity;
            this.chartSeries.xMax = -Infinity;
            this.chartSeries.renderChart(this);
        }
        // issue fix for Range Navigator size gets reduced when the data source is refreshed
        if (refreshBounds && renderer) {
            this.removeSvg();
            this.chartSeries.xMin = this.chartSeries.yMin = Infinity;
            this.chartSeries.xMax = this.chartSeries.yMax = -Infinity;
            this.calculateBounds();
            this.chartSeries.renderChart(this);
        }
        if (refreshBounds && !renderer) {
            this.removeSvg();
            this.calculateBounds();
            this.chartSeries.renderChart(this);
        }
        if (!refreshBounds && !renderer && refreshRange) {
            this.setSliderValue();
            this.rangeSlider.setSlider(this.startValue, this.endValue, true, this.tooltip.enable && this.tooltip.displayMode === 'Always');
        }
    };
    /**
     * To provide the array of modules needed for control rendering
     *
     * @returns {ModuleDeclaration[]} requiredModules
     * @private
     */
    RangeNavigator.prototype.requiredModules = function () {
        var _this = this;
        var modules = [];
        this.series.map(function (series) {
            if (series.type === 'Area' || series.type === 'StepLine') {
                modules.push({
                    member: series.type + 'Series',
                    args: [_this]
                });
            }
        });
        if (this.periodSelectorSettings.periods.length > 0) {
            modules.push({
                member: 'PeriodSelector',
                args: [this]
            });
        }
        if (this.valueType !== 'Double') {
            modules.push({
                member: this.valueType,
                args: [this]
            });
        }
        if (this.tooltip.enable) {
            modules.push({
                member: 'RangeTooltip',
                args: [this]
            });
        }
        return modules;
    };
    /**
     * To get the module name of the widget.
     *
     * @returns {string} - Returns the module name.
     */
    RangeNavigator.prototype.getModuleName = function () {
        return 'rangeNavigator';
    };
    /**
     * To destroy the widget
     *
     * @function destroy
     * @returns {void}
     * @member of rangeNavigator
     */
    RangeNavigator.prototype.destroy = function () {
        this.unWireEvents();
        if (this.isReact) {
            this.clearTemplate();
        }
        this.rangeSlider.destroy();
        _super.prototype.destroy.call(this);
        this.element.innerText = '';
        this.element.classList.remove('e-rangenavigator');
    };
    __decorate([
        Property(null)
    ], RangeNavigator.prototype, "width", void 0);
    __decorate([
        Property(null)
    ], RangeNavigator.prototype, "height", void 0);
    __decorate([
        Property(null)
    ], RangeNavigator.prototype, "dataSource", void 0);
    __decorate([
        Property(null)
    ], RangeNavigator.prototype, "xName", void 0);
    __decorate([
        Property(null)
    ], RangeNavigator.prototype, "yName", void 0);
    __decorate([
        Property()
    ], RangeNavigator.prototype, "query", void 0);
    __decorate([
        Collection([], RangeNavigatorSeries)
    ], RangeNavigator.prototype, "series", void 0);
    __decorate([
        Complex({}, RangeTooltipSettings)
    ], RangeNavigator.prototype, "tooltip", void 0);
    __decorate([
        Property(null)
    ], RangeNavigator.prototype, "minimum", void 0);
    __decorate([
        Property(null)
    ], RangeNavigator.prototype, "maximum", void 0);
    __decorate([
        Property(null)
    ], RangeNavigator.prototype, "interval", void 0);
    __decorate([
        Property('Auto')
    ], RangeNavigator.prototype, "intervalType", void 0);
    __decorate([
        Property('Hide')
    ], RangeNavigator.prototype, "labelIntersectAction", void 0);
    __decorate([
        Property(10)
    ], RangeNavigator.prototype, "logBase", void 0);
    __decorate([
        Property('Double')
    ], RangeNavigator.prototype, "valueType", void 0);
    __decorate([
        Property('Outside')
    ], RangeNavigator.prototype, "labelPosition", void 0);
    __decorate([
        Property('Auto')
    ], RangeNavigator.prototype, "labelPlacement", void 0);
    __decorate([
        Property(500)
    ], RangeNavigator.prototype, "animationDuration", void 0);
    __decorate([
        Property(false)
    ], RangeNavigator.prototype, "enableGrouping", void 0);
    __decorate([
        Property(false)
    ], RangeNavigator.prototype, "enableDeferredUpdate", void 0);
    __decorate([
        Property(false)
    ], RangeNavigator.prototype, "disableRangeSelector", void 0);
    __decorate([
        Property(false)
    ], RangeNavigator.prototype, "allowSnapping", void 0);
    __decorate([
        Property(false)
    ], RangeNavigator.prototype, "allowIntervalData", void 0);
    __decorate([
        Property(false)
    ], RangeNavigator.prototype, "useGroupingSeparator", void 0);
    __decorate([
        Property()
    ], RangeNavigator.prototype, "groupBy", void 0);
    __decorate([
        Property('Outside')
    ], RangeNavigator.prototype, "tickPosition", void 0);
    __decorate([
        Complex({ fontFamily: null, size: null, fontStyle: null, fontWeight: null, color: null }, Font)
    ], RangeNavigator.prototype, "labelStyle", void 0);
    __decorate([
        Complex({}, MajorGridLines)
    ], RangeNavigator.prototype, "majorGridLines", void 0);
    __decorate([
        Complex({}, MajorTickLines)
    ], RangeNavigator.prototype, "majorTickLines", void 0);
    __decorate([
        Complex({}, StyleSettings)
    ], RangeNavigator.prototype, "navigatorStyleSettings", void 0);
    __decorate([
        Complex({}, PeriodSelectorSettings)
    ], RangeNavigator.prototype, "periodSelectorSettings", void 0);
    __decorate([
        Complex({ color: null, width: 1 }, Border)
    ], RangeNavigator.prototype, "navigatorBorder", void 0);
    __decorate([
        Property('Material')
    ], RangeNavigator.prototype, "theme", void 0);
    __decorate([
        Property([])
    ], RangeNavigator.prototype, "value", void 0);
    __decorate([
        Property(null)
    ], RangeNavigator.prototype, "background", void 0);
    __decorate([
        Property('')
    ], RangeNavigator.prototype, "labelFormat", void 0);
    __decorate([
        Property('')
    ], RangeNavigator.prototype, "skeleton", void 0);
    __decorate([
        Property('DateTime')
    ], RangeNavigator.prototype, "skeletonType", void 0);
    __decorate([
        Property('Middle')
    ], RangeNavigator.prototype, "secondaryLabelAlignment", void 0);
    __decorate([
        Complex({ top: 5, bottom: 5, right: 5, left: 5 }, Margin)
    ], RangeNavigator.prototype, "margin", void 0);
    __decorate([
        Event()
    ], RangeNavigator.prototype, "load", void 0);
    __decorate([
        Event()
    ], RangeNavigator.prototype, "loaded", void 0);
    __decorate([
        Event()
    ], RangeNavigator.prototype, "resized", void 0);
    __decorate([
        Event()
    ], RangeNavigator.prototype, "beforeResize", void 0);
    __decorate([
        Event()
    ], RangeNavigator.prototype, "labelRender", void 0);
    __decorate([
        Event()
    ], RangeNavigator.prototype, "changed", void 0);
    __decorate([
        Event()
    ], RangeNavigator.prototype, "tooltipRender", void 0);
    __decorate([
        Event()
    ], RangeNavigator.prototype, "selectorRender", void 0);
    __decorate([
        Event()
    ], RangeNavigator.prototype, "beforePrint", void 0);
    RangeNavigator = __decorate([
        NotifyPropertyChanges
    ], RangeNavigator);
    return RangeNavigator;
}(Component));
export { RangeNavigator };
