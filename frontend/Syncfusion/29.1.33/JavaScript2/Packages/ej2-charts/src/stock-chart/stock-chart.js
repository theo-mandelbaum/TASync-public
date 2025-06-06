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
import { Component, Property, Complex, Collection, Internationalization, NotifyPropertyChanges } from '@syncfusion/ej2-base';
import { Browser, remove, Event, EventHandler } from '@syncfusion/ej2-base';
import { DataManager } from '@syncfusion/ej2-data';
import { Chart, ZoomSettings, CrosshairSettings } from '../chart/chart';
import { appendChildElement, redrawElement, titlePositionX, textElement } from '../common/utils/helper';
import { Size, Rect, TextOption, measureText, SvgRenderer } from '@syncfusion/ej2-svg-base';
import { calculateSize, getElement } from '../common/utils/helper';
import { RangeNavigator } from '../range-navigator/range-navigator';
import { getRangeValueXByPoint } from '../range-navigator/utils/helper';
import { PeriodSelector } from '../common/period-selector/period-selector';
import { CartesianChart } from './renderer/cartesian-chart';
import { RangeSelector } from './renderer/range-selector';
import { ToolBarSelector } from './renderer/toolbar-selector';
import { StockMargin, StockChartArea, StockChartAxis, StockChartRow, StockChartIndexes, StockEventsSettings } from './model/base';
import { StockSeries, StockChartIndicator, StockChartBorder } from './model/base';
import { StockChartAnnotationSettings } from './model/base';
import { StockChartFont } from './model/base';
import { getSeriesColor, getThemeColor } from '../common/model/theme';
import { StockEvents } from './renderer/stock-events';
import { StockChartLegendSettings } from './legend/legend';
import { ColumnSeries, RangeAreaSeries, SplineRangeAreaSeries } from './index';
import { Periods, StockTooltipSettings } from '../common/model/base';
/**
 * Stock Chart
 *
 * @public
 */
var StockChart = /** @class */ (function (_super) {
    __extends(StockChart, _super);
    /**
     * Constructor for creating the widget.
     *
     * @param {StockChartModel} options - Specifies the stock chart model.
     * @param {string | HTMLElement} element - Specifies the element for the stock chart.
     * @hidden
     */
    function StockChart(options, element) {
        var _this = _super.call(this, options, element) || this;
        /** @private */
        _this.isSingleAxis = false;
        _this.chartid = 57723;
        _this.tempSeriesType = [];
        /** private */
        _this.zoomChange = false;
        /** @private */
        _this.allowPan = false;
        /** @private  */
        _this.onPanning = false;
        /** @private */
        _this.trendlinetriggered = true;
        /** @private */
        _this.initialRender = true;
        /** @private */
        _this.rangeFound = false;
        /** @private */
        _this.tempPeriods = [];
        _this.isDateTimeCategory = false;
        _this.sortedData = [];
        _this.visibleRange = {
            min: 0, max: 0,
            delta: 0, interval: 0
        };
        _this.isStockChartRendered = false;
        StockChart_1.Inject(ColumnSeries, RangeAreaSeries, SplineRangeAreaSeries);
        _this.toolbarHeight = _this.enablePeriodSelector ? (Browser.isDevice ? 56 : 42) : 0;
        return _this;
    }
    StockChart_1 = StockChart;
    /**
     * Called internally if any of the property value changed.
     *
     * @private
     * @param {StockChartModel} newProp - The new StockChartModel.
     * @returns {void}
     */
    StockChart.prototype.onPropertyChanged = function (newProp) {
        // on property changes
        for (var _i = 0, _a = Object.keys(newProp); _i < _a.length; _i++) {
            var property = _a[_i];
            switch (property) {
                case 'series':
                    this.storeDataSource();
                    this.chartRender();
                    this.stockChartDataManagerSuccess();
                    this.legendClicked = false;
                    break;
            }
        }
    };
    /**
     * To change the range for chart.
     *
     * @param {number} updatedStart - The updated start value for the chart range.
     * @param {number} updatedEnd - The updated end value for the chart range.
     * @returns {void}
     */
    StockChart.prototype.rangeChanged = function (updatedStart, updatedEnd) {
        // manage chart refresh
        var chartElement = document.getElementById(this.chartObject.id);
        if (chartElement) {
            while (chartElement.firstChild) {
                chartElement.removeChild(chartElement.firstChild);
            }
        }
        this.startValue = updatedStart;
        this.endValue = updatedEnd;
        this.cartesianChart.initializeChart();
        this.periodSelector.datePicker.startDate = this.isDateTimeCategory ? new Date(this.sortedData[updatedStart]) :
            new Date(updatedStart);
        this.periodSelector.datePicker.endDate = this.isDateTimeCategory ? new Date(this.sortedData[updatedEnd]) :
            new Date(updatedEnd);
        this.periodSelector.datePicker.dataBind();
    };
    /**
     * Pre render for financial Chart.
     *
     * @returns {void}
     */
    StockChart.prototype.preRender = function () {
        this.unWireEvents();
        this.initPrivateVariable();
        this.allowServerDataBinding = false;
        this.isProtectedOnChange = true;
        this.setCulture();
        this.wireEvents();
    };
    /**
     * Method to bind events for chart.
     *
     * @returns {void}
     */
    StockChart.prototype.unWireEvents = function () {
        /** Find the Events type */
        var startEvent = Browser.touchStartEvent;
        var moveEvent = Browser.touchMoveEvent;
        var stopEvent = Browser.touchEndEvent;
        var cancelEvent = Browser.isPointer ? 'pointerleave' : 'mouseleave';
        /** UnBind the Event handler */
        EventHandler.remove(this.element, startEvent, this.stockChartOnMouseDown);
        EventHandler.remove(this.element, moveEvent, this.stockChartOnMouseMove);
        EventHandler.remove(this.element, stopEvent, this.stockChartMouseEnd);
        EventHandler.remove(this.element, 'click', this.stockChartOnMouseClick);
        EventHandler.remove(this.element, 'contextmenu', this.stockChartRightClick);
        EventHandler.remove(this.element, cancelEvent, this.stockChartOnMouseLeave);
        window.removeEventListener((Browser.isTouch && ('orientation' in window && 'onorientationchange' in window)) ? 'orientationchange' : 'resize', this.stockChartResize);
    };
    StockChart.prototype.wireEvents = function () {
        /** Find the Events type */
        var cancelEvent = Browser.isPointer ? 'pointerleave' : 'mouseleave';
        /** Bind the Event handler */
        EventHandler.add(this.element, Browser.touchStartEvent, this.stockChartOnMouseDown, this);
        EventHandler.add(this.element, Browser.touchMoveEvent, this.stockChartOnMouseMove, this);
        EventHandler.add(this.element, Browser.touchEndEvent, this.stockChartMouseEnd, this);
        EventHandler.add(this.element, 'click', this.stockChartOnMouseClick, this);
        EventHandler.add(this.element, 'contextmenu', this.stockChartRightClick, this);
        EventHandler.add(this.element, cancelEvent, this.stockChartOnMouseLeave, this);
        window.addEventListener((Browser.isTouch && ('orientation' in window && 'onorientationchange' in window)) ? 'orientationchange' : 'resize', this.stockChartResize.bind(this));
        this.setStyle(this.element);
    };
    StockChart.prototype.initPrivateVariable = function () {
        if (this.element.id === '') {
            var collection = document.getElementsByClassName('e-stockChart').length;
            this.element.id = 'stockChart_' + this.chartid + '_' + collection;
        }
        this.seriesXMax = null;
        this.seriesXMin = null;
        this.startValue = null;
        this.endValue = null;
        this.currentEnd = null;
        this.margin = {
            right: this.margin.right === null ? (Browser.isDevice ? 5 : 10) : this.margin.right,
            left: this.margin.left === null ? (Browser.isDevice ? 5 : 10) : this.margin.left,
            top: this.margin.top === null ? (Browser.isDevice ? 5 : 10) : this.margin.top,
            bottom: this.margin.bottom === null ? (Browser.isDevice ? 5 : 10) : this.margin.bottom
        };
        this.isStockChartRendered = false;
    };
    /**
     * Method to set culture for chart.
     *
     * @returns {void}
     */
    StockChart.prototype.setCulture = function () {
        this.intl = new Internationalization();
    };
    StockChart.prototype.storeDataSource = function () {
        for (var i = 0; i < this.series.length; i++) {
            var series = this.series[i];
            this.tempSeriesType.push(series.type);
            series.localData = undefined;
        }
        if (this.series.length === 0) {
            this.series.push({});
        }
        this.initialRender = !this.legendClicked;
        this.rangeFound = false;
        this.resizeTo = null;
        this.startValue = null;
        this.endValue = null;
    };
    /**
     * To Initialize the control rendering.
     *
     * @returns {void}
     */
    StockChart.prototype.render = function () {
        var _this = this;
        var loadEventData = { name: 'load', stockChart: this, theme: this.theme };
        this.trigger('load', loadEventData, function () {
            //this.theme = this.theme;
            _this.themeStyle = getThemeColor(_this.theme, false, _this);
            _this.storeDataSource();
            _this.drawSVG();
            _this.renderTitle();
            _this.renderLegend();
            _this.chartModuleInjection();
            _this.chartRender();
            if (!(_this.dataSource instanceof DataManager) || !(_this.series[0].dataSource instanceof DataManager)) {
                _this.stockChartDataManagerSuccess();
                _this.initialRender = false;
            }
            _this.renderComplete();
            _this.allowServerDataBinding = true;
            _this.isStockChartRendered = true;
        });
        this.isProtectedOnChange = false;
    };
    /**
     * DataManager Success.
     *
     * @returns {void}
     */
    StockChart.prototype.stockChartDataManagerSuccess = function () {
        this.findRange();
        this.renderRangeSelector();
        this.renderPeriodSelector();
        this.trigger('loaded', { stockChart: this });
    };
    /**
     * To set styles to resolve mvc width issue.
     *
     * @param {HTMLElement} element - The html element.
     * @returns {void}
     */
    StockChart.prototype.setStyle = function (element) {
        var zooming = this.zoomSettings;
        var disableScroll = zooming.enableSelectionZooming || zooming.enablePinchZooming ||
            this.selectionMode !== 'None' || this.crosshair.enable;
        element.style.msTouchAction = disableScroll ? 'none' : 'element';
        element.style.touchAction = disableScroll ? 'none' : 'element';
        element.style.msUserSelect = 'none';
        element.style.msContentZooming = 'none';
        element.style.position = 'relative';
        element.style.display = 'block';
        element.style.webkitUserSelect = 'none';
    };
    StockChart.prototype.drawSVG = function () {
        this.removeSvg();
        calculateSize(this);
        this.renderer = new SvgRenderer(this.element.id);
        this.renderBorder();
        this.createSecondaryElements();
        this.calculateVisibleSeries();
        this.calculateLegendBounds();
        //overall svg in which chart and selector appened
        this.mainObject = this.renderer.createSvg({
            id: this.element.id + '_stockChart_svg',
            width: this.availableSize.width,
            height: this.availableSize.height - (this.enablePeriodSelector ? this.toolbarHeight : 0) - this.titleSize.height,
            style: 'display: block;'
        });
        this.svgObject = this.mainObject;
        this.element.appendChild(this.mainObject);
    };
    StockChart.prototype.calculateVisibleSeries = function () {
        this.visibleSeries = [];
        var series;
        var color = getSeriesColor(this.theme);
        var count = color.length;
        var seriesCollections = this.series.sort(function (a, b) { return a.zOrder - b.zOrder; });
        for (var i = 0, len = seriesCollections.length; i < len; i++) {
            series = seriesCollections[i];
            series.category = 'Series';
            series.index = i;
            series.interior = series.fill || color[i % count];
            this.visibleSeries.push(series);
            seriesCollections[i] = series;
        }
    };
    StockChart.prototype.createSecondaryElements = function () {
        var tooltipDiv = redrawElement(false, this.element.id + '_Secondary_Element') ||
            this.createElement('div');
        tooltipDiv.id = this.element.id + '_Secondary_Element';
        if (this.title) {
            this.titleSize = measureText(this.title, this.titleStyle, this.themeStyle.chartTitleFont);
            this.titleSize.height += 15; // for title padding
        }
        else {
            this.titleSize = { height: null, width: null };
        }
        var height = (this.enablePeriodSelector ? this.toolbarHeight : 0) + this.titleSize.height;
        tooltipDiv.style.cssText = 'position: relative; height:' + height + 'px';
        appendChildElement(false, this.element, tooltipDiv, false);
    };
    /**
     * To provide the array of modules needed for control rendering
     *
     * @returns {ModuleDeclaration[]} required modules
     * @private
     */
    StockChart.prototype.requiredModules = function () {
        var modules = [];
        if (this.legendSettings.visible) {
            modules.push({
                member: 'StockLegend',
                args: [this]
            });
        }
        return modules;
    };
    StockChart.prototype.findCurrentData = function (totalData, xName) {
        var tempData = (!this.enablePeriodSelector && !this.enableSelector) ? totalData : undefined;
        var start = (this.isDateTimeCategory) ? new Date(this.sortedData[Math.floor(this.startValue)]).getTime() :
            this.startValue;
        var end = (this.isDateTimeCategory) ? new Date(this.sortedData[Math.floor(this.endValue)]).getTime() : this.endValue;
        if (totalData && start && end) {
            tempData = totalData
                .filter(function (data) {
                return (new Date(Date.parse(data[xName])).getTime() >= start &&
                    new Date(Date.parse(data[xName])).getTime() <= end);
            });
        }
        return tempData;
    };
    /**
     * Render period selector.
     *
     * @returns {void}
     */
    StockChart.prototype.renderPeriodSelector = function () {
        if (this.enablePeriodSelector) {
            this.toolbarSelector.initializePeriodSelector();
            this.periodSelector.toolbar.refreshOverflow(); //to avoid overlapping toolbar elements
            if (!this.enableSelector) {
                this.cartesianChart.cartesianChartRefresh(this);
            }
        }
    };
    StockChart.prototype.chartRender = function () {
        this.sortedData = [];
        this.cartesianChart = new CartesianChart(this);
        this.cartesianChart.initializeChart();
    };
    /**
     * To render range Selector.
     *
     * @returns {void}
     */
    StockChart.prototype.renderRangeSelector = function () {
        //SVG in which range navigator is going to append
        if (this.enableSelector) {
            this.rangeSelector = new RangeSelector(this);
            this.rangeSelector.initializeRangeNavigator();
        }
    };
    /**
     * Get component name.
     *
     * @returns {string} - To get the module name.
     */
    StockChart.prototype.getModuleName = function () {
        return 'stockChart';
    };
    /**
     * Get the properties to be maintained in the persisted state.
     *
     * @private
     * @returns {string} - The persisted data containing the properties.
     */
    StockChart.prototype.getPersistData = function () {
        return '';
    };
    /**
     * To Remove the SVG.
     *
     * @returns {void}
     * @private
     */
    StockChart.prototype.removeSvg = function () {
        if (document.getElementById(this.element.id + '_Secondary_Element')) {
            remove(document.getElementById(this.element.id + '_Secondary_Element'));
        }
        var removeLength = 0;
        if (this.mainObject) {
            while (this.mainObject.childNodes.length > removeLength) {
                this.mainObject.removeChild(this.mainObject.firstChild);
            }
            if (!this.mainObject.hasChildNodes() && this.mainObject.parentNode) {
                remove(this.mainObject);
                this.mainObject = null;
                this.selectorObject = null;
                this.chartObject = null;
            }
        }
    };
    /**
     * Module Injection for components.
     *
     * @returns {void}
     */
    StockChart.prototype.chartModuleInjection = function () {
        var moduleName;
        for (var _i = 0, _a = this.getInjectedModules(); _i < _a.length; _i++) {
            var modules = _a[_i];
            moduleName = modules.prototype.getModuleName().toLowerCase();
            if (moduleName.indexOf('rangetooltip') === -1) {
                Chart.Inject(modules);
            }
            else {
                RangeNavigator.Inject(modules);
            }
            if (moduleName === 'datetime' || moduleName === 'areaseries' || moduleName === 'steplineseries' || moduleName === 'datetimecategory') {
                RangeNavigator.Inject(modules);
            }
        }
    };
    /**
     * Find range for financal chart.
     *
     * @returns {void}
     * @private
     */
    StockChart.prototype.findRange = function () {
        var _this = this;
        this.seriesXMin = Infinity;
        this.seriesXMax = -Infinity;
        for (var _i = 0, _a = this.chart.series; _i < _a.length; _i++) {
            var value = _a[_i];
            if (value.visible) {
                this.seriesXMin = Math.min(this.seriesXMin, value.xMin);
                this.seriesXMax = Math.max(this.seriesXMax, value.xMax);
            }
        }
        this.endValue = this.currentEnd = this.seriesXMax;
        if (this.enablePeriodSelector) {
            this.toolbarSelector = new ToolBarSelector(this);
            this.periodSelector = new PeriodSelector(this);
            this.tempPeriods = this.periods.length ? this.periods : this.toolbarSelector.calculateAutoPeriods();
            this.tempPeriods.map(function (period) {
                if (period.selected && period.text.toLowerCase() === 'ytd') {
                    if (_this.isDateTimeCategory) {
                        var currentYear = new Date(_this.sortedData[_this.currentEnd]).getFullYear();
                        var index = _this.currentEnd - 1;
                        for (; index >= 0; index--) {
                            if (new Date(_this.sortedData[index]).getFullYear() !== currentYear) {
                                _this.startValue = index + 1;
                                break;
                            }
                        }
                        _this.startValue = index === -1 ? 0 : _this.startValue;
                    }
                    else {
                        _this.startValue = new Date(new Date(_this.currentEnd).getFullYear().toString()).getTime();
                    }
                }
                else if (period.selected && period.text.toLowerCase() === 'all') {
                    _this.startValue = _this.seriesXMin;
                }
                else if (period.selected) {
                    _this.startValue = _this.periodSelector.changedRange(period.intervalType, _this.endValue, period.interval).getTime();
                    _this.startValue = _this.isDateTimeCategory ? _this.periodSelector.findStartValue(_this.startValue, _this.endValue) :
                        _this.startValue;
                }
            });
        }
        else {
            this.startValue = this.seriesXMin;
        }
        this.rangeFound = true;
    };
    /**
     * Handles the chart resize.
     *
     * @returns {boolean} false
     * @private
     */
    StockChart.prototype.stockChartResize = function () {
        var _this = this;
        // To avoid resize console error
        if (!document.getElementById(this.element.id)) {
            return false;
        }
        this.animateSeries = false;
        if (this.resizeTo) {
            clearTimeout(this.resizeTo);
        }
        this.resizeTo = +setTimeout(function () {
            if (_this.cartesianChart) {
                calculateSize(_this);
                _this.renderBorder();
                _this.calculateLegendBounds();
                _this.renderTitle();
                _this.renderLegend();
                _this.cartesianChart.cartesianChartRefresh(_this);
                _this.mainObject.setAttribute('width', (_this.availableSize.width + (_this.stockLegendModule && (_this.legendSettings.position === 'Right' || _this.legendSettings.position === 'Left') ? _this.stockLegendModule.legendBounds.width : 0)).toString());
                if (_this.enablePeriodSelector) {
                    _this.renderPeriodSelector();
                }
            }
        }, 500);
        return false;
    };
    /**
     * Handles the mouse down on chart.
     *
     * @param {PointerEvent} e - The pointer event.
     * @returns {boolean} - false
     * @private
     */
    StockChart.prototype.stockChartOnMouseDown = function (e) {
        var pageX;
        var pageY;
        var target;
        var touchArg;
        var rect = this.chart.element.getBoundingClientRect();
        var element = e.target;
        this.trigger('stockChartMouseDown', { target: element.id, x: this.mouseX, y: this.mouseY });
        if (e.type === 'touchstart') {
            this.isTouch = true;
            touchArg = e;
            pageX = touchArg.changedTouches[0].clientX;
            target = touchArg.target;
            pageY = touchArg.changedTouches[0].clientY;
        }
        else {
            this.isTouch = e.pointerType === 'touch';
            pageX = e.clientX;
            pageY = e.clientY;
            target = e.target;
        }
        if (target.id.indexOf(this.element.id + '_stockChart_chart') > -1) {
            var svgRect = getElement(this.element.id + '_stockChart_chart').getBoundingClientRect();
            this.mouseDownY = this.previousMouseMoveY = (pageY - rect.top) - Math.max(svgRect.top - rect.top, 0);
            this.mouseDownX = this.previousMouseMoveX = (pageX - rect.left) - Math.max(svgRect.left - rect.left, 0);
            this.setMouseXY(pageX, pageY);
            this.referenceXAxis = this.chart.primaryXAxis;
            getElement(this.element.id + '_stockChart_chart').setAttribute('cursor', 'pointer');
            if (this.isDateTimeCategory) {
                this.visibleRange.min = this.sortedData.indexOf(parseInt(this.referenceXAxis.labels[this.referenceXAxis.visibleRange.min], 10));
                this.visibleRange.max = this.sortedData.indexOf(parseInt(this.referenceXAxis.labels[this.referenceXAxis.visibleRange.max], 10));
                this.visibleRange.delta = this.referenceXAxis.visibleRange.delta;
                this.visibleRange.interval = this.referenceXAxis.visibleRange.interval;
            }
            else {
                this.visibleRange = this.referenceXAxis.visibleRange;
            }
            this.mouseDownXPoint = getRangeValueXByPoint(this.mouseX - this.referenceXAxis.rect.x, this.referenceXAxis.rect.width, this.visibleRange, this.referenceXAxis.isInversed);
            this.allowPan = true;
            this.notify(Browser.touchStartEvent, e);
        }
        return false;
    };
    /**
     * Handles the mouse up.
     *
     * @param {PointerEvent} e - The pointer event.
     * @returns {boolean} - false
     * @private
     */
    StockChart.prototype.stockChartMouseEnd = function (e) {
        var pageY;
        var pageX;
        var touchArg;
        if (e.type === 'touchend') {
            touchArg = e;
            pageX = touchArg.changedTouches[0].clientX;
            pageY = touchArg.changedTouches[0].clientY;
            this.isTouch = true;
        }
        else {
            pageY = e.clientY;
            pageX = e.clientX;
            this.isTouch = e.pointerType === 'touch' || e.pointerType === '2';
        }
        getElement(this.element.id + '_stockChart_chart').setAttribute('cursor', 'auto');
        this.onPanning = false;
        this.setMouseXY(pageX, pageY);
        this.stockChartOnMouseUp(e);
        return false;
    };
    /**
     * Handles the mouse up.
     *
     * @param {PointerEvent | TouchEvent} e - The pointer event or touch event.
     * @returns {boolean} - false
     * @private
     */
    StockChart.prototype.stockChartOnMouseUp = function (e) {
        var element = e.target;
        this.trigger('stockChartMouseUp', { target: element.id, x: this.mouseX, y: this.mouseY });
        this.isChartDrag = false;
        this.allowPan = false;
        if (this.rangeNavigator) {
            this.rangeNavigator.rangeSlider.isDrag = false;
        }
        if (this.isTouch) {
            this.threshold = new Date().getTime() + 300;
        }
        this.notify(Browser.touchEndEvent, e);
        if (this.stockEvent) {
            this.stockEvent.removeStockEventTooltip(0);
        }
        return false;
    };
    /**
     * To find mouse x, y for aligned chart element svg position.
     *
     * @param {number} pageX - The x-coordinate of the mouse pointer event.
     * @param {number} pageY - The y-coordinate of the mouse pointer event.
     * @returns {void}
     */
    StockChart.prototype.setMouseXY = function (pageX, pageY) {
        var svgRectElement = getElement(this.element.id + '_stockChart_chart');
        if (this.element && svgRectElement) {
            var stockRect = this.element.getBoundingClientRect();
            var svgRect = svgRectElement.getBoundingClientRect();
            this.mouseX = (pageX - stockRect.left) - Math.max(svgRect.left - stockRect.left, 0);
            this.mouseY = (pageY - stockRect.top) - Math.max(svgRect.top - stockRect.top, 0);
        }
    };
    /**
     * Handles the mouse move.
     *
     * @param {PointerEvent} e - The pointer event.
     * @returns {boolean} - false
     * @private
     */
    StockChart.prototype.stockChartOnMouseMove = function (e) {
        var pageX;
        var touchArg;
        var pageY;
        this.mouseMoveEvent = e;
        if (e.type === 'touchmove') {
            this.isTouch = true;
            touchArg = e;
            pageY = touchArg.changedTouches[0].clientY;
            pageX = touchArg.changedTouches[0].clientX;
        }
        else {
            this.isTouch = e.pointerType === 'touch' || e.pointerType === '2' || this.isTouch;
            pageX = e.clientX;
            pageY = e.clientY;
        }
        this.trigger('stockChartMouseMove', { target: e.target.id, x: this.mouseX, y: this.mouseY });
        if (getElement(this.element.id + '_stockChart_chart')) {
            this.setMouseXY(pageX, pageY);
            this.chartOnMouseMove(e);
        }
        return false;
    };
    /**
     * Handles the mouse move on chart.
     *
     * @param {PointerEvent | TouchEvent} e - The pointer event or touch event.
     * @returns {boolean} - false
     * @private
     */
    StockChart.prototype.chartOnMouseMove = function (e) {
        if (this.rangeNavigator && this.rangeNavigator.rangeSlider.isDrag) {
            this.rangeNavigator.mouseX = this.mouseX;
            this.rangeNavigator.rangeSlider.mouseMoveHandler(e);
        }
        if (this.allowPan && !this.chart.startMove && this.mouseDownXPoint && this.mouseX !== this.previousMouseMoveX &&
            this.zoomSettings.enablePan) {
            this.onPanning = true;
            this.zoomChange = false;
            getElement(this.element.id + '_stockChart_chart').setAttribute('cursor', 'pointer');
            this.mouseUpXPoint = getRangeValueXByPoint(this.mouseX - this.referenceXAxis.rect.x, this.referenceXAxis.rect.width, this.visibleRange, this.referenceXAxis.isInversed);
            var diff = Math.abs(this.mouseUpXPoint - this.mouseDownXPoint);
            if (this.mouseDownXPoint < this.mouseUpXPoint) {
                if (this.seriesXMin <= this.visibleRange.min - diff) {
                    this.startValue = this.visibleRange.min - diff;
                    this.endValue = this.visibleRange.max - diff;
                    if (this.enableSelector) {
                        this.rangeNavigator.rangeSlider.setSlider(this.visibleRange.min - diff, this.visibleRange.max - diff, !this.rangeNavigator.enableDeferredUpdate, (this.rangeNavigator.rangeTooltipModule
                            && this.rangeNavigator.tooltip.enable));
                    }
                    else {
                        this.cartesianChart.cartesianChartRefresh(this);
                    }
                }
            }
            else {
                if (this.seriesXMax >= this.visibleRange.max + diff) {
                    this.startValue = this.visibleRange.min + diff;
                    this.endValue = this.visibleRange.max + diff;
                    if (this.enableSelector) {
                        this.rangeNavigator.rangeSlider.setSlider(this.visibleRange.min + diff, this.visibleRange.max + diff, !this.rangeNavigator.enableDeferredUpdate, (this.rangeNavigator.rangeTooltipModule
                            && this.rangeNavigator.tooltip.enable));
                    }
                    else {
                        this.cartesianChart.cartesianChartRefresh(this);
                    }
                }
            }
        }
        this.notify(Browser.touchMoveEvent, e);
        if (e.target.id === '' && !this.onPanning === true) { //to remove the tooltip when hover on mouse move
            var element = void 0;
            if (this.chart.tooltip.enable || this.crosshair.enable) {
                element = document.getElementById(this.element.id + '_stockChart_chart_tooltip');
                if (element) {
                    remove(element);
                }
            }
            if (getElement(this.element.id + '_StockEvents_Tooltip')) {
                this.stockEvent.removeStockEventTooltip(0);
            }
        }
        if (e.target.id.indexOf('StockEvents') !== -1) {
            clearInterval(this.stockEvent.toolTipInterval);
            this.stockEvent.renderStockEventTooltip(e.target.id);
        }
        else {
            if (this.stockEvent) {
                this.stockEvent.removeStockEventTooltip(1000);
            }
        }
        this.isTouch = false;
        return false;
    };
    /**
     * Handles the mouse click on chart.
     *
     * @param {PointerEvent | TouchEvent} e - The pointer event or touch event.
     * @returns {boolean} - false
     * @private
     */
    StockChart.prototype.stockChartOnMouseClick = function (e) {
        var element = e.target;
        this.trigger('stockChartMouseClick', { target: element.id, x: this.mouseX, y: this.mouseY });
        this.notify('click', e);
        return false;
    };
    StockChart.prototype.stockChartRightClick = function (event) {
        if (this.crosshair.enable &&
            (event.buttons === 2 || event.which === 0 || event.pointerType === 'touch')) {
            event.preventDefault();
            event.stopPropagation();
            return false;
        }
        return true;
    };
    /**
     * Handles the mouse leave.
     *
     * @param {PointerEvent} e - The pointer event.
     * @returns {boolean} false
     * @private
     */
    StockChart.prototype.stockChartOnMouseLeave = function (e) {
        var touchArg;
        var pageX;
        var pageY;
        if (e.type === 'touchleave') {
            this.isTouch = true;
            touchArg = e;
            pageX = touchArg.changedTouches[0].clientX;
            pageY = touchArg.changedTouches[0].clientY;
        }
        else {
            pageX = e.clientX;
            pageY = e.clientY;
            this.isTouch = e.pointerType === 'touch' || e.pointerType === '2';
        }
        this.setMouseXY(pageX, pageY);
        this.allowPan = false;
        this.stockChartOnMouseLeaveEvent(e);
        return false;
    };
    /**
     * Handles the mouse leave on chart.
     *
     * @param {PointerEvent | TouchEvent} e - The pointer event or touch event.
     * @returns {boolean} - false
     * @private
     */
    StockChart.prototype.stockChartOnMouseLeaveEvent = function (e) {
        var cancelEvent = Browser.isPointer ? 'pointerleave' : 'mouseleave';
        //this.trigger(chartMouseLeave, { target: element.id, x: this.mouseX, y: this.mouseY });
        this.isChartDrag = false;
        this.notify(cancelEvent, e);
        if (this.stockEvent) {
            this.stockEvent.removeStockEventTooltip(1000);
        }
        if (this.rangeNavigator) {
            this.rangeNavigator.rangeSlider.isDrag = false;
        }
        if (this.onPanning) {
            this.onPanning = false;
            this.chart.mouseLeave(e);
            getElement(this.element.id + '_stockChart_chart').setAttribute('cursor', 'auto');
        }
        return false;
    };
    /**
     * Destroy method.
     *
     * @returns {void}
     */
    StockChart.prototype.destroy = function () {
        this.cartesianChart = null;
        this.chart = null;
        this.periodSelector = null;
        this.rangeNavigator = null;
        this.rangeSelector = null;
        this.tempPeriods = [];
        this.toolbarSelector = null;
        this.visibleSeries = [];
        this.yAxisElements = null;
        var element = document.getElementById(this.element.id + '_stockChart_chartKeyboard_chart_focus');
        if (element) {
            element.remove();
        }
        var borderElement = document.getElementById(this.element.id + '_stock_border');
        if (borderElement) {
            borderElement.remove();
        }
        if (this.element) {
            this.unWireEvents();
            _super.prototype.destroy.call(this);
            this.removeSvg();
            this.svgObject = null;
        }
    };
    StockChart.prototype.renderBorder = function () {
        if (this.border.width) {
            var border = this.createElement('div');
            border.id = this.element.id + '_stock_border';
            border.style.width = (this.availableSize.width) + 'px';
            border.style.height = (this.availableSize.height) + 'px';
            border.style.position = 'absolute';
            border.style.border = this.border.width + 'px solid ' + this.border.color;
            border.style.pointerEvents = 'none';
            appendChildElement(false, getElement(this.element.id), border);
        }
    };
    /**
     * Render title for chart.
     *
     * @returns {void}
     */
    StockChart.prototype.renderTitle = function () {
        var rect;
        if (this.title) {
            appendChildElement(false, getElement(this.element.id + '_Secondary_Element'), this.renderer.createSvg({
                id: this.element.id + '_stockChart_Title',
                width: this.availableSize.width,
                height: this.titleSize.height,
                fill: this.background || this.themeStyle.background
            }), false);
            var alignment = this.titleStyle.textAlignment;
            var getAnchor = alignment === 'Near' ? 'start' : alignment === 'Far' ? 'end' : 'middle';
            rect = new Rect(0, 0, this.availableSize.width, 0);
            var options = new TextOption(this.element.id + '_ChartTitle', titlePositionX(rect, this.titleStyle), ((this.titleSize.height - 10)), getAnchor, this.title, '', 'auto');
            textElement(this.renderer, options, this.titleStyle, this.titleStyle.color || this.themeStyle.chartTitleFont.color || this.findTitleColor(), getElement(this.element.id + '_stockChart_Title'), false, false, null, null, null, null, null, null, null, null, this.themeStyle.chartTitleFont);
            this.availableSize.height -= (this.titleSize.height + 5);
        }
    };
    /**
     * To calculate the legend bounds.
     *
     * @private
     * @returns {void}
     */
    StockChart.prototype.calculateLegendBounds = function () {
        if (this.stockLegendModule && this.legendSettings.visible) {
            this.stockLegendModule.getLegendOptions(this.visibleSeries);
        }
        var titleHeight = this.titleSize.height;
        var left = this.border.width;
        var width = this.availableSize.width - this.border.width - left;
        var top = this.chartArea.border.width * 0.5 + this.border.width;
        var height = this.availableSize.height - top - this.border.width -
            (this.enablePeriodSelector ? this.toolbarHeight : 0) - titleHeight;
        this.initialClipRect = new Rect(left, top, width, height);
        this.tempAvailableSize = new Size(this.availableSize.width, this.availableSize.height -
            (this.enablePeriodSelector ? this.toolbarHeight : 0) - titleHeight);
        if (this.stockLegendModule && this.legendSettings.visible) {
            this.stockLegendModule.calculateLegendBounds(this.initialClipRect, this.tempAvailableSize, null);
        }
    };
    /**
     * To render the legend.
     *
     * @private
     * @returns {void}
     */
    StockChart.prototype.renderLegend = function () {
        if (this.stockLegendModule && this.stockLegendModule.legendCollections.length && this.legendSettings.visible) {
            this.stockLegendModule.calTotalPage = true;
            var bounds = this.stockLegendModule.legendBounds;
            this.stockLegendModule.renderLegend(this, this.legendSettings, bounds);
            if (this.legendSettings.position === 'Auto' || this.legendSettings.position === 'Bottom' || this.legendSettings.position === 'Top') {
                this.availableSize.height -= this.stockLegendModule.legendBounds.height;
            }
            else if (this.legendSettings.position === 'Left' || this.legendSettings.position === 'Right') {
                this.availableSize.width -= this.stockLegendModule.legendBounds.width;
            }
        }
    };
    StockChart.prototype.findTitleColor = function () {
        if (this.theme.toLocaleLowerCase().indexOf('highcontrast') > -1 || this.theme.indexOf('Dark') > -1) {
            return '#ffffff';
        }
        return '#424242';
    };
    /**
     * To calculate the stock events.
     *
     * @private
     * @returns {void}
     */
    StockChart.prototype.calculateStockEvents = function () {
        if (this.stockEvents.length) {
            this.stockEvent = new StockEvents(this);
            appendChildElement(false, this.chartObject, this.stockEvent.renderStockEvents());
        }
    };
    var StockChart_1;
    __decorate([
        Property(null)
    ], StockChart.prototype, "width", void 0);
    __decorate([
        Property(null)
    ], StockChart.prototype, "height", void 0);
    __decorate([
        Property('')
    ], StockChart.prototype, "dataSource", void 0);
    __decorate([
        Complex({}, StockMargin)
    ], StockChart.prototype, "margin", void 0);
    __decorate([
        Complex({ color: '#DDDDDD', width: 1 }, StockChartBorder)
    ], StockChart.prototype, "border", void 0);
    __decorate([
        Property(null)
    ], StockChart.prototype, "background", void 0);
    __decorate([
        Property('Material')
    ], StockChart.prototype, "theme", void 0);
    __decorate([
        Complex({ name: 'primaryXAxis', valueType: 'DateTime' }, StockChartAxis)
    ], StockChart.prototype, "primaryXAxis", void 0);
    __decorate([
        Complex({ border: { color: null, width: 0.5 }, background: 'transparent' }, StockChartArea)
    ], StockChart.prototype, "chartArea", void 0);
    __decorate([
        Complex({ name: 'primaryYAxis', opposedPosition: true, labelPosition: 'Inside', tickPosition: 'Inside' }, StockChartAxis)
    ], StockChart.prototype, "primaryYAxis", void 0);
    __decorate([
        Collection([{}], StockChartRow)
    ], StockChart.prototype, "rows", void 0);
    __decorate([
        Collection([{ opposedPosition: true }], StockChartAxis)
    ], StockChart.prototype, "axes", void 0);
    __decorate([
        Collection([], StockSeries)
    ], StockChart.prototype, "series", void 0);
    __decorate([
        Collection([], StockEventsSettings)
    ], StockChart.prototype, "stockEvents", void 0);
    __decorate([
        Property(false)
    ], StockChart.prototype, "isTransposed", void 0);
    __decorate([
        Property('')
    ], StockChart.prototype, "title", void 0);
    __decorate([
        Complex({ size: null, fontWeight: null, color: null, fontStyle: null, fontFamily: null }, StockChartFont)
    ], StockChart.prototype, "titleStyle", void 0);
    __decorate([
        Collection([], StockChartIndicator)
    ], StockChart.prototype, "indicators", void 0);
    __decorate([
        Complex({ shared: true, enableMarker: false }, StockTooltipSettings)
    ], StockChart.prototype, "tooltip", void 0);
    __decorate([
        Complex({ dashArray: '5', lineType: 'Vertical' }, CrosshairSettings)
    ], StockChart.prototype, "crosshair", void 0);
    __decorate([
        Complex({}, StockChartLegendSettings)
    ], StockChart.prototype, "legendSettings", void 0);
    __decorate([
        Complex({ enablePan: true }, ZoomSettings)
    ], StockChart.prototype, "zoomSettings", void 0);
    __decorate([
        Property(true)
    ], StockChart.prototype, "enablePeriodSelector", void 0);
    __decorate([
        Property(true)
    ], StockChart.prototype, "enableCustomRange", void 0);
    __decorate([
        Property(false)
    ], StockChart.prototype, "isSelect", void 0);
    __decorate([
        Property(true)
    ], StockChart.prototype, "enableSelector", void 0);
    __decorate([
        Collection([], Periods)
    ], StockChart.prototype, "periods", void 0);
    __decorate([
        Collection([{}], StockChartAnnotationSettings)
    ], StockChart.prototype, "annotations", void 0);
    __decorate([
        Event()
    ], StockChart.prototype, "selectorRender", void 0);
    __decorate([
        Event()
    ], StockChart.prototype, "stockChartMouseMove", void 0);
    __decorate([
        Event()
    ], StockChart.prototype, "stockChartMouseLeave", void 0);
    __decorate([
        Event()
    ], StockChart.prototype, "stockChartMouseDown", void 0);
    __decorate([
        Event()
    ], StockChart.prototype, "stockChartMouseUp", void 0);
    __decorate([
        Event()
    ], StockChart.prototype, "stockChartMouseClick", void 0);
    __decorate([
        Event()
    ], StockChart.prototype, "pointClick", void 0);
    __decorate([
        Event()
    ], StockChart.prototype, "pointMove", void 0);
    __decorate([
        Event()
    ], StockChart.prototype, "onZooming", void 0);
    __decorate([
        Event()
    ], StockChart.prototype, "legendRender", void 0);
    __decorate([
        Event()
    ], StockChart.prototype, "legendClick", void 0);
    __decorate([
        Property('None')
    ], StockChart.prototype, "selectionMode", void 0);
    __decorate([
        Property(false)
    ], StockChart.prototype, "isMultiSelect", void 0);
    __decorate([
        Event()
    ], StockChart.prototype, "load", void 0);
    __decorate([
        Event()
    ], StockChart.prototype, "loaded", void 0);
    __decorate([
        Event()
    ], StockChart.prototype, "rangeChange", void 0);
    __decorate([
        Event()
    ], StockChart.prototype, "axisLabelRender", void 0);
    __decorate([
        Event()
    ], StockChart.prototype, "beforeExport", void 0);
    __decorate([
        Event()
    ], StockChart.prototype, "tooltipRender", void 0);
    __decorate([
        Event()
    ], StockChart.prototype, "seriesRender", void 0);
    __decorate([
        Event()
    ], StockChart.prototype, "stockEventRender", void 0);
    __decorate([
        Collection([], StockChartIndexes)
    ], StockChart.prototype, "selectedDataIndexes", void 0);
    __decorate([
        Property([])
    ], StockChart.prototype, "seriesType", void 0);
    __decorate([
        Property(['EMA', 'TMA', 'SMA', 'Momentum', 'ATR', 'Accumulation Distribution', 'Bollinger Bands', 'MACD', 'Stochastic', 'RSI'])
    ], StockChart.prototype, "indicatorType", void 0);
    __decorate([
        Property(['PNG', 'JPEG', 'SVG', 'PDF', 'XLSX', 'CSV', 'Print'])
    ], StockChart.prototype, "exportType", void 0);
    __decorate([
        Property([])
    ], StockChart.prototype, "trendlineType", void 0);
    StockChart = StockChart_1 = __decorate([
        NotifyPropertyChanges
    ], StockChart);
    return StockChart;
}(Component));
export { StockChart };
