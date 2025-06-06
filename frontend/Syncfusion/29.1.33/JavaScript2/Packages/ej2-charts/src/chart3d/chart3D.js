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
import { Component, Property, NotifyPropertyChanges, Internationalization, remove, Complex, Collection, Browser, EventHandler, extend, Animation, animationMode } from '@syncfusion/ej2-base';
import { L10n, isNullOrUndefined, Touch } from '@syncfusion/ej2-base';
import { Event } from '@syncfusion/ej2-base';
import { Rect, Size, SvgRenderer, TextOption, measureText, removeElement } from '@syncfusion/ej2-svg-base';
import { ImageOption, RectOption, appendChildElement, createSvg, getElement, getTextAnchor, getTitle, redrawElement, textElement, titlePositionX, showTooltip, appendClipElement, getAnimationFunction, withInBounds } from '../common/utils/helper';
import { beforeResize, load, pointClick, pointMove, resized } from '../common/model/constants';
import { TitleSettings } from './model/chart3d-Interface';
import { CartesianAxisLayoutPanel } from './axis/cartesian-panel';
import { get3DSeriesColor, get3DThemeColor } from './model/theme';
import { Border, Indexes, Margin } from '../common/model/base';
import { Vector3D, Matrix3D, Graphics3D, BinaryTreeBuilder, Polygon3D, ChartTransform3D, Svg3DRenderer, Chart3DRender } from './utils/chart3dRender';
import { AxisRenderer, WallRenderer } from './utils/renderer';
import { Chart3DAxis, Chart3DColumn, Chart3DRow } from './axis/axis';
import { Data } from '../common/model/data';
import { Chart3DSeries } from './series/chart-series';
import { Chart3DTooltipSettings } from './user-interaction/tooltip';
import { Chart3DLegendSettings } from './legend/legend';
import { PrintUtils } from '../common/utils/print';
/**
 * The Chart3D class represents a 3D chart component that extends the Component class
 * and implements the INotifyPropertyChanged interface.
 *
 * @public
 * @class
 * @extends Component<HTMLElement>
 * @implements {INotifyPropertyChanged} INotifyPropertyChanged
 */
var Chart3D = /** @class */ (function (_super) {
    __extends(Chart3D, _super);
    /**
     * Constructor for creating the 3D chart
     *
     * @param {Chart3DModel} options - Specifies the 3D chart model.
     * @param {string | HTMLElement} element - Specifies the element for the 3D chart.
     * @hidden
     */
    function Chart3D(options, element) {
        var _this = _super.call(this, options, element) || this;
        _this.previousTargetId = '';
        _this.currentPointIndex = 0;
        _this.currentSeriesIndex = 0;
        _this.currentLegendIndex = 0;
        /** @public */
        _this.animated = false;
        /** @private */
        _this.isPointMouseDown = false;
        /** @private */
        _this.visible = 0;
        /** @private */
        _this.clickCount = 0;
        /** @private */
        _this.maxPointCount = 0;
        /** @private */
        _this.singleClickTimer = 0;
        /** @private */
        _this.isRtlEnabled = false;
        /** @private */
        _this.scaleX = 1;
        /** @private */
        _this.scaleY = 1;
        _this.chartId = 57723;
        /** @private */
        _this.isLegendClicked = false;
        /** @private */
        _this.rotateActivate = false;
        /** @private */
        _this.isRemove = false;
        /** @private */
        _this.polygons = [];
        return _this;
    }
    /**
     * Checks if the given elementId has special characters and modifies it if necessary.
     *
     * @param {string} elementId - The input elementId to be checked.
     * @returns {string} - The modified elementId.
     */
    Chart3D.prototype.isIdHasSpecialCharacter = function (elementId) {
        var regex = /^[A-Za-z ]+$/;
        var numberRegex = /^[0-9 ]+$/;
        var childElementId = '';
        if (!regex.test(elementId)) {
            var start = 0;
            if (numberRegex.test(elementId[0])) {
                childElementId += ('\\3' + elementId[0]);
                start = 1;
            }
            for (var i = start; i < elementId.length; i++) {
                if (!regex.test(elementId[i]) && elementId.indexOf('-') === -1 &&
                    elementId.indexOf('_') === -1 && elementId.indexOf('\\') === -1 && !numberRegex.test(elementId[i])) {
                    childElementId += ('\\' + elementId[i]);
                }
                else {
                    childElementId += elementId[i];
                }
            }
            return childElementId;
        }
        else {
            return elementId;
        }
    };
    /**
     * For internal use only - Initialize the event handler;
     *
     * @returns {void}
     */
    Chart3D.prototype.preRender = function () {
        this.element.id = this.isIdHasSpecialCharacter(this.element.id);
        this.allowServerDataBinding = false;
        this.unWireEvents();
        this.initPrivateVariable();
        this.setCulture();
        this.wireEvents();
        this.element.setAttribute('dir', this.enableRtl ? 'rtl' : '');
    };
    /**
     * Initializes private variables and prepares the chart component for rendering.
     *
     * @returns {void}
     */
    Chart3D.prototype.initPrivateVariable = function () {
        this.delayRedraw = false;
        this.animateSeries = true;
        this.horizontalAxes = [];
        this.verticalAxes = [];
        this.polygons = [];
        this.vector = new Vector3D(0, 0, 0);
        this.wallRender = new WallRenderer();
        this.matrixObj = new Matrix3D();
        this.bspTreeObj = new BinaryTreeBuilder();
        this.polygon = new Polygon3D();
        this.graphics = new Graphics3D();
        this.transform3D = new ChartTransform3D();
        this.svg3DRenderer = new Svg3DRenderer();
        this.axisRender = new AxisRenderer();
        this.chart3DRender = new Chart3DRender();
        this.chartAxisLayoutPanel = new CartesianAxisLayoutPanel(this);
        this.refreshAxis();
        this.refreshDefinition(this.rows);
        this.refreshDefinition(this.columns);
        if (this.tooltip3DModule) {
            this.tooltip3DModule.previousPoints = [];
        }
        this.element.setAttribute('role', 'region');
        this.element.setAttribute('tabindex', '0');
        this.element.style.outline = 'none';
        this.element.setAttribute('aria-label', this.description || this.title + '. Syncfusion interactive chart.');
        if (!(this.element.classList.contains('e-chart-focused'))) {
            this.element.setAttribute('class', this.element.getAttribute('class') + ' e-chart-focused');
        }
        if (this.element.id === '') {
            var collection = document.getElementsByClassName('e-chart').length;
            this.element.id = 'chart_' + this.chartId + '_' + collection;
        }
        this.svgId = this.element.id + '_svg';
    };
    /**
     * Method to set culture for chart.
     *
     * @returns {void}
     */
    Chart3D.prototype.setCulture = function () {
        this.intl = new Internationalization();
        this.localeObject = new L10n(this.getModuleName(), this.defaultLocalConstants, this.locale);
    };
    /**
     * To Initialize the 3D chart rendering.
     *
     * @returns {void}
     */
    Chart3D.prototype.render = function () {
        var _this = this;
        this.svgRenderer = new SvgRenderer(this.element.id);
        var loadEventData = {
            chart: this, theme: this.theme, cancel: false
        };
        /**
         * Load event for the 3D chart componet.
         */
        this.trigger(load, loadEventData, function () {
            if (!loadEventData.cancel) {
                _this.cartesianChartRendering();
            }
        });
    };
    /**
     * Renders the chart using a Cartesian coordinate system.
     *
     * This function is responsible for rendering the chart's graphical elements and data points using a Cartesian coordinate system.
     * It may include actions such as drawing axes, plotting data, and applying visual styles.
     *
     * @returns {void}
     */
    Chart3D.prototype.cartesianChartRendering = function () {
        this.setTheme();
        this.createChartSvg();
        this.calculateVisibleSeries();
        this.calculateVisibleAxis();
        this.processData();
        this.renderComplete();
        this.allowServerDataBinding = true;
    };
    /**
     * Method to create SVG element.
     *
     * @returns {void}
     */
    Chart3D.prototype.createChartSvg = function () {
        this.removeSvg();
        createSvg(this);
    };
    /**
     * Method to remove the SVG.
     *
     * @returns {void}
     * @private
     */
    Chart3D.prototype.removeSvg = function () {
        if (this.redraw) {
            return null;
        }
        removeElement(this.element.id + '_Secondary_Element');
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if (this.isReact) {
            this.clearTemplate();
        }
        var removeLength = 0;
        if (this.svgObject) {
            while (this.svgObject.childNodes.length > removeLength) {
                this.svgObject.removeChild(this.svgObject.firstChild);
            }
            if (!this.svgObject.hasChildNodes() && this.svgObject.parentNode) {
                remove(this.svgObject);
            }
        }
    };
    /**
     * Processes and prepares data for rendering.
     *
     * @param {boolean} render - (Optional) Indicates whether to trigger rendering after data processing.
     * @returns {void}
     */
    Chart3D.prototype.processData = function (render) {
        if (render === void 0) { render = true; }
        this.visibleSeriesCount = 0;
        var check = true;
        for (var _i = 0, _a = this.visibleSeries; _i < _a.length; _i++) {
            var series = _a[_i];
            if (!series.visible && !this.legendSettings.visible) {
                this.visibleSeriesCount++;
                continue;
            }
            this.initializeDataModule(series);
        }
        if (render && (!this.visibleSeries.length || this.visibleSeriesCount === this.visibleSeries.length && check)) {
            this.refreshBound();
            this.trigger('loaded', { chart: this });
        }
    };
    /**
     * Initializes the data module for a three-dimensional series.
     *
     * @param {Chart3DSeries} series - The series for which data module is initialized.
     * @returns {void}
     */
    Chart3D.prototype.initializeDataModule = function (series) {
        series.xData = [];
        series.yData = [];
        var dataSource;
        var isAngular = 'isAngular';
        if (this[isAngular]) {
            dataSource = Object.keys(series.dataSource).length ? series.dataSource : this.dataSource;
        }
        else {
            dataSource = series.dataSource || this.dataSource;
        }
        series.dataModule = new Data(dataSource, series.query);
        series.points = [];
        series.refreshDataManager(this);
    };
    /**
     * Animate the series bounds.
     *
     * @param {number} duration - Specifies the duration of the animation.
     * @private
     * @returns {void}
     */
    Chart3D.prototype.animate = function (duration) {
        this.redraw = true;
        this.animated = true; //used to set duration as 1000 for animation at default 300
        this.duration = duration ? duration : 1000;
    };
    /**
     * Refresh the chart bounds.
     *
     * @private
     * @returns {void}
     */
    Chart3D.prototype.refreshBound = function () {
        if (this.legend3DModule && this.legendSettings.visible) {
            this.legend3DModule.getLegendOptions(this.visibleSeries, this);
        }
        if (this.tooltip.enable && this.tooltip3DModule) {
            this.tooltip3DModule.previousPoints = [];
        }
        this.calculateStackValues();
        this.calculateBounds();
        this.renderElements();
        removeElement('chartmeasuretext');
        this.removeSelection();
    };
    /**
     * Clears the selection state in the chart.
     *
     * @returns {void}
     */
    Chart3D.prototype.removeSelection = function () {
        for (var _i = 0, _a = this.visibleSeries; _i < _a.length; _i++) {
            var series = _a[_i];
            if (series.visible) {
                for (var _b = 0, _c = series.points; _b < _c.length; _b++) {
                    var point = _c[_b];
                    point.isSelect = false;
                }
            }
        }
    };
    /**
     * Calculates stacked values for three-dimensional series in the chart.
     *
     * @returns {void}
     */
    Chart3D.prototype.calculateStackValues = function () {
        var series;
        var isCalculateStacking = false;
        for (var i = 0, len = this.visibleSeries.length; i < len; i++) {
            series = this.visibleSeries[i];
            series.position = series.rectCount = undefined;
            if (((series.type.indexOf('Stacking') !== -1)) && !isCalculateStacking) {
                series.calculateStackedValue(series.type.indexOf('100') > -1, this);
                isCalculateStacking = true;
            }
        }
    };
    /**
     * Calculates the bounds and dimensions for the chart area.
     *
     * @returns {void}
     */
    Chart3D.prototype.calculateBounds = function () {
        var margin = this.margin;
        // Title Height;
        var titleHeight = 0;
        var subTitleHeight = 0;
        var titleWidth = 0;
        var padding = this.titleStyle.position === 'Top' || (this.titleStyle.position === 'Bottom') ? 15 : 5;
        var left = margin.left + this.border.width;
        var width = this.availableSize.width - left - margin.right - this.border.width;
        var elementSpacing = 0;
        var top = margin.top + this.border.width;
        var height = this.availableSize.height - top - this.border.width - margin.bottom;
        this.titleCollection = [];
        this.subTitleCollection = [];
        if (this.title) {
            this.titleCollection = getTitle(this.title, this.titleStyle, (this.titleStyle.position === 'Left' || this.titleStyle.position === 'Right' ? height : width), this.enableRtl, this.themeStyle.chartTitleFont);
            titleHeight = (measureText(this.title, this.titleStyle, this.themeStyle.chartTitleFont).height * this.titleCollection.length) + padding;
            if (this.subTitle) {
                var maxWidth = 0;
                for (var _i = 0, _a = this.titleCollection; _i < _a.length; _i++) {
                    var titleText = _a[_i];
                    titleWidth = measureText(titleText, this.titleStyle, this.themeStyle.chartSubTitleFont).width;
                    maxWidth = titleWidth > maxWidth ? titleWidth : maxWidth;
                }
                this.subTitleCollection = getTitle(this.subTitle, this.subTitleStyle, maxWidth, this.enableRtl, this.themeStyle.chartSubTitleFont);
                subTitleHeight = (measureText(this.subTitle, this.subTitleStyle, this.themeStyle.chartSubTitleFont).height * this.subTitleCollection.length) +
                    padding;
            }
        }
        else if (this.legendSettings.position !== 'Top' && this.border.width) {
            elementSpacing = 10;
        }
        top = margin.top + elementSpacing + this.border.width;
        height = this.availableSize.height - top - this.border.width - margin.bottom;
        var marginTotal = subTitleHeight + titleHeight + this.titleStyle.border.width + this.subTitleStyle.border.width;
        switch (this.titleStyle.position) {
            case 'Top':
                top += marginTotal;
                height -= marginTotal;
                break;
            case 'Bottom':
                height -= marginTotal;
                break;
            case 'Left':
                left += marginTotal;
                width -= marginTotal;
                break;
            case 'Right':
                left -= (this.titleStyle.border.width + this.subTitleStyle.border.width);
                width -= marginTotal;
                break;
        }
        this.initialClipRect = new Rect(left, top, width, height);
        if (this.legend3DModule && this.legendSettings.visible) {
            this.legend3DModule.calculateLegendBounds(this.initialClipRect, this.availableSize, null);
        }
        this.chartAxisLayoutPanel.measureAxis(this.initialClipRect);
    };
    /**
     * Renders various chart elements, including the border, title, series, legend, and datalabel etc.
     *
     * @returns {void}
     */
    Chart3D.prototype.renderElements = function () {
        this.renderBorder();
        this.renderTitle();
        this.createSeriesElements();
        this.render3DChart();
        this.renderLegend();
        this.performSelection();
        this.setSecondaryElementPosition();
        this.doAnimation();
    };
    /**
     * Animates the height of an SVG element.
     *
     * @param {HTMLElement} element - The SVG element to animate.
     * @param {Chart3DSeries} series - The series related to the animation.
     * @param {Chart3DPoint} point - The point related to the animation.
     * @param {HTMLElement} dataLabelElement - The data label element related to the animation.
     * @param {HTMLElement} shapeElement - The shape element related to the animation.
     * @param {HTMLElement} templateElement - The template element related to the animation.
     * @returns {void}
     */
    Chart3D.prototype.animateRect = function (element, series, point, dataLabelElement, shapeElement, templateElement) {
        var option = series.animation;
        var duration = series.chart.animated ? series.chart.duration : option.duration;
        var effect = getAnimationFunction('Linear');
        var elementHeight = element.getAttribute('height') ? +element.getAttribute('height') : 0;
        var elementWidth = element.getAttribute('width') ? +element.getAttribute('width') : 0;
        var isPlot = point.yValue < 0;
        var centerX;
        var centerY;
        var x = +element.getAttribute('x');
        var y = +element.getAttribute('y');
        if (!series.chart.requireInvertedAxis) {
            centerY = (isPlot !== series.yAxis.isAxisInverse) ? y : y + elementHeight;
            centerX = isPlot ? x : x + elementWidth;
        }
        else {
            if (series.type.indexOf('Stacking') > -1) {
                centerX = x;
                centerY = y;
            }
            else {
                centerY = isPlot ? y : y + elementHeight;
                centerX = (isPlot !== series.yAxis.isAxisInverse) ? x + elementWidth : x;
            }
        }
        var value;
        if (!isNullOrUndefined(element)) {
            element.style.visibility = 'hidden';
            if (dataLabelElement) {
                dataLabelElement.style.visibility = 'hidden';
            }
            if (shapeElement) {
                shapeElement.style.visibility = 'hidden';
            }
            if (templateElement) {
                templateElement.style.visibility = 'hidden';
            }
            new Animation({}).animate(element, {
                duration: (duration === 0 && animationMode === 'Enable') ? 1000 : duration,
                delay: option.delay,
                progress: function (args) {
                    if (args.timeStamp >= args.delay) {
                        element.style.visibility = 'visible';
                        if (!series.chart.requireInvertedAxis) {
                            elementHeight = elementHeight ? elementHeight : 1;
                            value = effect(args.timeStamp - args.delay, 0, elementHeight, args.duration);
                            element.setAttribute('transform', 'translate(' + centerX + ' ' + centerY +
                                ') scale(1,' + (value / elementHeight) + ') translate(' + (-centerX) + ' ' + (-centerY) + ')');
                        }
                        else {
                            elementWidth = elementWidth ? elementWidth : 1;
                            value = effect(args.timeStamp - args.delay, 0, elementWidth, args.duration);
                            element.setAttribute('transform', 'translate(' + centerX + ' ' + centerY +
                                ') scale(' + (value / elementWidth) + ', 1) translate(' + (-centerX) + ' ' + (-centerY) + ')');
                        }
                    }
                },
                end: function () {
                    element.setAttribute('transform', 'translate(0,0)');
                    if (dataLabelElement) {
                        dataLabelElement.style.visibility = 'visible';
                    }
                    if (shapeElement) {
                        shapeElement.style.visibility = 'visible';
                    }
                    if (templateElement) {
                        templateElement.style.visibility = 'visible';
                    }
                    series.chart.trigger('animationComplete', { series: series });
                }
            });
        }
    };
    /**
     * Animates the series.
     *
     * @returns {void}
     */
    Chart3D.prototype.doAnimation = function () {
        var _this = this;
        var _loop_1 = function (i) {
            var series = this_1.visibleSeries[i];
            if (series.visible && series.animation.enable && this_1.animateSeries && !this_1.rotateActivate) {
                var dataLabelElement = void 0;
                var shapeElement = void 0;
                var templateElement = void 0;
                var options = new RectOption(this_1.element.id + '_ChartSeriesClipRect_' + i, 'transparent', { width: 1, color: 'Gray' }, 1, {
                    x: 0, y: 0,
                    width: this_1.availableSize.width,
                    height: this_1.availableSize.height
                });
                var clipRectElement = appendClipElement(this_1.redraw, options, this_1.svgRenderer);
                appendChildElement(false, this_1.chart3D, clipRectElement.children[0], this_1.redraw);
                for (var k = 0; series.visiblePoints && k < series.visiblePoints.length; k++) {
                    var point = series.visiblePoints[k];
                    var elements = document.querySelectorAll("[id*=\"region-series-" + i + "\"]");
                    elements.forEach(function (element) {
                        element.setAttribute('clip-path', 'url(#' + _this.element.id + '_ChartSeriesClipRect_' + i + ')');
                    });
                    if (series.dataLabel.visible) {
                        dataLabelElement = getElement(this_1.element.id + '-svg-series-' + series.index + '-point-' + k + '-data-label');
                        shapeElement = getElement(this_1.element.id + '-svg-data-label-series-' + series.index + '-point-' + k);
                        templateElement = getElement(this_1.element.id + '-series-' + series.index + '-data-label-' + k);
                    }
                    this_1.animateRect(document.getElementById(this_1.element.id + '_ChartSeriesClipRect_' + i).children[0], series, point, dataLabelElement, shapeElement, templateElement);
                }
            }
        };
        var this_1 = this;
        for (var i = 0; i < this.visibleSeries.length; i++) {
            _loop_1(i);
        }
    };
    /**
     * Performs data selection based on selected data indexes.
     *
     * @returns {void}
     */
    Chart3D.prototype.performSelection = function () {
        var selectedDataIndexes = [];
        if (this.selection3DModule) {
            selectedDataIndexes = extend([], this.selection3DModule.selectedDataIndexes, null, true);
            this.selection3DModule.invokeSelection(this);
        }
        if (this.highlight3DModule) {
            this.highlight3DModule.invokeHighlight(this);
        }
        if ((!this.highlight3DModule || (this.legendSettings.enableHighlight && this.highlightMode === 'None')) && this.tooltip3DModule) {
            this.tooltip3DModule.seriesStyles();
        }
        if (selectedDataIndexes.length > 0) {
            this.selection3DModule.selectedDataIndexes = selectedDataIndexes;
            this.selection3DModule.redrawSelection(this, this.selectionMode);
        }
    };
    /**
     * To render the legend.
     *
     * @returns {void}
     */
    Chart3D.prototype.renderLegend = function () {
        if (this.legend3DModule && this.legend3DModule.legendCollections.length && this.legendSettings.visible) {
            this.legend3DModule.calTotalPage = true;
            var bounds = this.legend3DModule.legendBounds;
            this.legend3DModule.renderLegend(this, this.legendSettings, bounds);
        }
        if (!this.redraw) {
            this.element.appendChild(this.svgObject);
        }
    };
    /**
     * To set the left and top position for secondary element in chart.
     *
     * @returns {void}
     */
    Chart3D.prototype.setSecondaryElementPosition = function () {
        var element = getElement(this.element.id + '_Secondary_Element');
        if (!element) {
            return;
        }
        var rect = this.element.getBoundingClientRect();
        var svgRect = getElement(this.svgId).getBoundingClientRect();
        element.style.left = Math.max(svgRect.left - rect.left, 0) + 'px';
        element.style.top = Math.max(svgRect.top - rect.top, 0) + 'px';
    };
    /**
     * Initializes module-specific elements and settings for the chart.
     *
     * @returns {void}
     */
    Chart3D.prototype.initializeModuleElements = function () {
        this.dataLabelCollections = [];
        var elementId = this.element.id;
        if (this.series.length) {
            this.seriesElements = this.svgRenderer.createGroup({ id: elementId + 'SeriesCollection' });
        }
        this.dataLabelElements = this.renderer.createGroup({ id: elementId + 'DataLabelCollection' });
    };
    /**
     * Renders elements specific to chart series.
     *
     * @returns {void}
     */
    Chart3D.prototype.createSeriesElements = function () {
        // Initialize the series elements values
        this.initializeModuleElements();
        var elementId = this.element.id;
        var tooltipDiv = redrawElement(this.redraw, elementId + '_Secondary_Element') ||
            this.createElement('div');
        tooltipDiv.id = elementId + '_Secondary_Element';
        tooltipDiv.style.cssText = 'position: relative';
        appendChildElement(false, this.element, tooltipDiv, this.redraw);
        // For userInteraction
        if (this.tooltip.enable) {
            appendChildElement(false, this.svgObject, this.renderer.createGroup({ id: elementId + '_UserInteraction', style: 'pointer-events:none;' }), this.redraw);
        }
    };
    /**
     * Renders the chart title.
     *
     * @returns {void}
     */
    Chart3D.prototype.renderTitle = function () {
        var rect;
        var margin = this.margin;
        var elementSpacing = 5;
        if (this.title) {
            var getAnchor = getTextAnchor(this.titleStyle.textAlignment, this.enableRtl);
            var elementSize = measureText(this.title, this.titleStyle, this.themeStyle.chartTitleFont);
            rect = new Rect(margin.left, 0, this.availableSize.width - margin.left - margin.right, 0);
            var borderWidth = this.titleStyle.border.width;
            var positionY = this.margin.top + ((elementSize.height) * 3 / 4);
            var positionX = titlePositionX(rect, this.titleStyle || this.themeStyle.chartTitleFont) + borderWidth;
            var rotation = void 0;
            var alignment = this.titleStyle.textAlignment;
            var subtitleSize = measureText(this.subTitle, this.subTitleStyle, this.themeStyle.chartSubTitleFont);
            switch (this.titleStyle.position) {
                case 'Top':
                    positionY += borderWidth * 0.5;
                    positionX += getAnchor === 'start' ? borderWidth * 0.5 + this.border.width :
                        getAnchor === 'end' ? ((-borderWidth * 2) - this.border.width) : 0;
                    break;
                case 'Bottom':
                    positionX += getAnchor === 'start' ? (borderWidth * 0.5) + this.border.width :
                        getAnchor === 'end' ? (-borderWidth * 2) - this.border.width : 0;
                    positionY = this.availableSize.height - this.margin.bottom - subtitleSize.height - (elementSize.height / 2) -
                        (borderWidth * 0.5) - (this.subTitleStyle.border.width * 0.5);
                    break;
                case 'Left':
                    positionX = this.margin.left + ((elementSize.height) * 3 / 4) + (borderWidth * 0.5);
                    positionY = alignment === 'Near' ? margin.bottom + (borderWidth * 0.5) + this.border.width :
                        alignment === 'Far' ? this.availableSize.height - margin.bottom - (borderWidth * 0.5) - this.border.width : this.availableSize.height / 2;
                    getAnchor = alignment === 'Near' ? 'end' : alignment === 'Far' ? 'start' : 'middle';
                    getAnchor = this.enableRtl ? (getAnchor === 'end' ? 'start' : getAnchor === 'start' ? 'end' : getAnchor) : getAnchor;
                    rotation = 'rotate(' + -90 + ',' + positionX + ',' + positionY + ')';
                    break;
                case 'Right':
                    positionX = this.availableSize.width - this.margin.right - ((elementSize.height) * 3 / 4) - (borderWidth * 0.5);
                    positionY = alignment === 'Near' ? margin.bottom + (borderWidth * 0.5) + this.border.width :
                        alignment === 'Far' ? this.availableSize.height - margin.bottom - (borderWidth * 0.5) - this.border.width : this.availableSize.height / 2;
                    getAnchor = alignment === 'Near' ? 'start' : alignment === 'Far' ? 'end' : 'middle';
                    getAnchor = this.enableRtl ? (getAnchor === 'end' ? 'start' : getAnchor === 'start' ? 'end' : getAnchor) : getAnchor;
                    rotation = 'rotate(' + 90 + ',' + positionX + ',' + positionY + ')';
                    break;
                case 'Custom':
                    positionX = this.titleStyle.x;
                    positionY = this.titleStyle.y;
                    getAnchor = 'middle';
                    break;
            }
            var borderOptions = {
                'id': this.element.id + '-chart-title-border',
                'x': positionX - (getAnchor === 'middle' ? (elementSize.width / 2) + elementSpacing : getAnchor === 'end' ? elementSize.width + elementSpacing : elementSpacing),
                'y': positionY - elementSize.height + (elementSize.height / 4),
                'rx': this.titleStyle.border.cornerRadius,
                'ry': this.titleStyle.border.cornerRadius,
                'width': elementSize.width + (elementSpacing * 2),
                'height': elementSize.height * this.titleCollection.length,
                'fill': this.titleStyle.background,
                'stroke-width': borderWidth,
                'stroke': this.titleStyle.border.color,
                'transform': rotation ? rotation : ''
            };
            var htmlObject = redrawElement(this.redraw, this.element.id + '-chart-title-border', borderOptions, this.renderer)
                || this.renderer.drawRectangle(borderOptions);
            appendChildElement(false, this.svgObject, htmlObject, this.redraw);
            var options = new TextOption(this.element.id + '-chart-title', positionX, positionY, getAnchor, this.titleCollection, rotation, 'auto');
            var element = redrawElement(this.redraw, this.element.id + '-chart-title', options, this.renderer) ||
                textElement(this.renderer, options, this.titleStyle, this.titleStyle.color || this.themeStyle.chartTitleFont.color, this.svgObject, null, null, null, null, null, null, null, null, false, null, this.themeStyle.chartTitleFont);
            if (element) {
                element.setAttribute('tabindex', '0');
                element.style.outline = 'none';
                element.setAttribute('class', 'e-chart-focused');
            }
            if (this.subTitle) {
                this.renderSubTitle(options);
            }
        }
    };
    /**
     * Renders the chart sub title.
     *
     * @param {TextOption} options - Specifies the text option.
     * @returns {void}
     */
    Chart3D.prototype.renderSubTitle = function (options) {
        var maxWidth = 0;
        var titleWidth = 0;
        var padding = 10;
        var alignment = this.titleStyle.textAlignment;
        for (var _i = 0, _a = this.titleCollection; _i < _a.length; _i++) {
            var titleText = _a[_i];
            titleWidth = measureText(titleText, this.titleStyle, this.themeStyle.chartTitleFont).width;
            maxWidth = titleWidth > maxWidth ? titleWidth : maxWidth;
        }
        var subTitleElementSize = measureText(this.subTitleCollection.
            reduce(function (a, b) { return (a.length > b.length ? a : b); }), this.subTitleStyle, this.themeStyle.chartSubTitleFont);
        var getAnchor = getTextAnchor(this.subTitleStyle.textAlignment, this.enableRtl);
        var rect = new Rect(alignment === 'Center' ? (options.x - maxWidth * 0.5) : alignment === 'Far' ? options.x - maxWidth : options.x, 0, maxWidth, 0);
        if (this.titleStyle.position === 'Left') {
            rect.x = alignment === 'Center' ? (options.x - maxWidth * 0.5) : alignment === 'Far' ? this.margin.left + ((subTitleElementSize.height) * 3 / 4) : (options.x - maxWidth);
        }
        var elementSize = measureText(this.title, this.titleStyle, this.themeStyle.chartTitleFont);
        var positionY = options.y * options.text.length + subTitleElementSize.height + (padding / 2) +
            this.titleStyle.border.width + (this.subTitleStyle.border.width * 0.5);
        if (this.titleStyle.position === 'Bottom') {
            positionY = options.y * options.text.length + (padding / 2) + (elementSize.height / 2) + (subTitleElementSize.height / 2);
        }
        var borderOptions = {
            'id': this.element.id + '-chart-sub-title-border',
            'x': titlePositionX(rect, this.subTitleStyle) - (getAnchor === 'middle' ? (subTitleElementSize.width / 2) + padding / 2 : getAnchor === 'end' ? subTitleElementSize.width + padding / 2 : padding / 2),
            'y': positionY - subTitleElementSize.height + (subTitleElementSize.height / 4),
            'rx': this.subTitleStyle.border.cornerRadius,
            'ry': this.subTitleStyle.border.cornerRadius,
            'width': subTitleElementSize.width + padding,
            'height': subTitleElementSize.height * this.subTitleCollection.length,
            'fill': this.subTitleStyle.background,
            'stroke-width': this.subTitleStyle.border.width,
            'stroke': this.subTitleStyle.border.color,
            'transform': options.transform
        };
        var htmlObject = redrawElement(this.redraw, this.element.id + '-chart-sub-title-border', borderOptions, this.renderer)
            || this.renderer.drawRectangle(borderOptions);
        appendChildElement(false, this.svgObject, htmlObject, this.redraw);
        var subTitleOptions = new TextOption(this.element.id + '-chart-sub-title', titlePositionX(rect, this.subTitleStyle), positionY, getTextAnchor(this.subTitleStyle.textAlignment, this.enableRtl), this.subTitleCollection, options.transform, 'auto');
        var element = redrawElement(this.redraw, this.element.id + '-chart-sub-title', subTitleOptions, this.renderer) ||
            textElement(this.renderer, subTitleOptions, this.subTitleStyle, this.subTitleStyle.color || this.themeStyle.chartSubTitleFont.color, this.svgObject, null, null, null, null, null, null, null, null, false, null, this.themeStyle.chartSubTitleFont);
    };
    /**
     * Renders the chart border.
     *
     * @returns {void}
     */
    Chart3D.prototype.renderBorder = function () {
        var x = 0;
        var y = 0;
        var width = this.border.width;
        var backGroundImage = this.backgroundImage;
        var fillColor = backGroundImage ? 'transparent' : (this.background || this.themeStyle.background);
        var rect = new RectOption(this.element.id + '-chart-border', fillColor, this.border, 1, new Rect(width * 0.5 + x, width * 0.5 + y, this.availableSize.width - width, this.availableSize.height - width), 0, 0, '', this.border.dashArray);
        this.htmlObject = redrawElement(this.redraw, this.element.id + '-chart-border', rect, this.renderer)
            || this.renderer.drawRectangle(rect);
        this.htmlObject.setAttribute('aria-hidden', 'true');
        appendChildElement(false, this.svgObject, this.htmlObject, this.redraw);
        // to draw back ground image for chart
        if (backGroundImage) {
            var image = new ImageOption(this.availableSize.height - width, this.availableSize.width - width, backGroundImage, 0, 0, this.element.id + '-chart-background', 'visible', 'none');
            this.htmlObject = redrawElement(this.redraw, this.element.id + '-chart-background', image, this.renderer)
                || this.renderer.drawImage(image);
            appendChildElement(false, this.svgObject, this.htmlObject, this.redraw);
        }
    };
    /**
     * To provide the array of modules needed for control rendering
     *
     * @returns {ModuleDeclaration[]} - Array of modules needed for control rendering
     * @private
     */
    Chart3D.prototype.requiredModules = function () {
        var _this = this;
        var modules = [];
        var series = this.series;
        var moduleName;
        var dataLabelEnable = false;
        if (this.tooltip.enable) {
            modules.push({
                member: 'Tooltip3D',
                args: [this]
            });
        }
        series.map(function (value) {
            _this.isLegend = (_this.legendSettings.visible && ((value.name !== '') || !!_this.isLegend));
            moduleName = value.type.indexOf('100') !== -1 ? value.type.replace('100', '') + 'Series3D' : value.type + 'Series3D';
            dataLabelEnable = value.dataLabel.visible || dataLabelEnable;
            if (!modules.some(function (currentModule) {
                return currentModule.member === moduleName;
            })) {
                modules.push({
                    member: moduleName,
                    args: [_this, series]
                });
            }
        });
        if (dataLabelEnable) {
            modules.push({
                member: 'DataLabel3D',
                args: [this, series]
            });
        }
        modules = this.findAxisModule(modules);
        if (this.isLegend) {
            modules.push({
                member: 'Legend3D',
                args: [this]
            });
        }
        if (this.enableExport) {
            modules.push({
                member: 'Export3D',
                args: [this]
            });
        }
        if (this.selectionMode !== 'None') {
            modules.push({
                member: 'Selection3D',
                args: [this]
            });
        }
        if (this.highlightMode !== 'None' || this.legendSettings.enableHighlight) {
            modules.push({
                member: 'Highlight3D',
                args: [this]
            });
        }
        return modules;
    };
    /**
     * Finds axis modules within a collection of module declarations.
     *
     * @param {ModuleDeclaration[]} modules - The collection of module declarations to search for axis modules.
     * @returns {ModuleDeclaration[]} - An array of module declarations representing axis modules.
     */
    Chart3D.prototype.findAxisModule = function (modules) {
        var axisCollections = [];
        axisCollections.push(this.primaryXAxis);
        axisCollections.push(this.primaryYAxis);
        axisCollections = axisCollections.concat(this.axes);
        var datetimeEnabled = false;
        var categoryEnabled = false;
        var logarithmicEnabled = false;
        var dateTimeCategoryEnabled = false;
        for (var _i = 0, axisCollections_1 = axisCollections; _i < axisCollections_1.length; _i++) {
            var axis = axisCollections_1[_i];
            datetimeEnabled = axis.valueType === 'DateTime' || datetimeEnabled;
            categoryEnabled = axis.valueType === 'Category' || categoryEnabled;
            logarithmicEnabled = axis.valueType === 'Logarithmic' || logarithmicEnabled;
            dateTimeCategoryEnabled = axis.valueType === 'DateTimeCategory' || dateTimeCategoryEnabled;
        }
        if (datetimeEnabled) {
            modules.push({
                member: 'DateTime3D',
                args: [this]
            });
        }
        if (categoryEnabled) {
            modules.push({
                member: 'Category3D',
                args: [this]
            });
        }
        if (logarithmicEnabled) {
            modules.push({
                member: 'Logarithmic3D',
                args: [this]
            });
        }
        if (dateTimeCategoryEnabled) {
            modules.push({
                member: 'DateTimeCategory3D',
                args: [this]
            });
        }
        return modules;
    };
    /**
     * Sets the theme for the chart.
     *
     * @returns {void}
     */
    Chart3D.prototype.setTheme = function () {
        /** Set theme */
        this.themeStyle = get3DThemeColor(this.theme);
    };
    /**
     * Handles to set style for key event on the document.
     *
     * @param {target} target - element which currently focused.
     * @returns {void}
     * @private
     */
    Chart3D.prototype.setNavigationStyle = function (target) {
        var currentElement = document.getElementById(target);
        if (currentElement) {
            currentElement.style.setProperty('outline', "1.5px solid " + this.themeStyle.tabColor);
        }
    };
    /**
     * Handles to remove style for key event on the document.
     *
     * @returns {void}
     * @private
     */
    Chart3D.prototype.removeNavigationStyle = function () {
        var currentElement = document.querySelectorAll("[id*=_Point_], [id*=" + this.element.id + "], [id*=_ChartBorder], text[id*=_ChartTitle],g[id*=_chart_legend],  text[id*=_ChartSubTitle], div[id*=_Annotation]");
        if (currentElement) {
            currentElement.forEach(function (element) {
                if (element instanceof HTMLElement || element instanceof SVGElement) {
                    element.style.setProperty('outline', 'none');
                }
            });
        }
    };
    /**
     * Renders the three-dimensional chart, creating a 3D visualization.
     *
     * The function sets up a 3D perspective, depth, rotation, and tilt to create a 3D visualization of the chart.
     *
     * @returns {void}
     */
    Chart3D.prototype.render3DChart = function () {
        this.chart3D = this.svgRenderer.createGroup({ 'id': this.element.id + '-svg-chart-3d' });
        this.chart3D.setAttribute('role', 'region');
        this.chart3D.setAttribute('aria-hidden', 'false');
        this.draw3DAxis();
        this.wallRender.update3DWall(this);
        this.renderSeries();
        appendChildElement(false, this.svgObject, this.chart3D, this.redraw);
        var size = new Size(this.availableSize.width, this.availableSize.height);
        this.graphics.prepareView(this.perspectiveAngle, this.depth, this.rotation, this.tilt, size, this);
        this.graphics.view(this.svgObject, this);
    };
    /**
     * Draws three-dimensional axes for the chart.
     *
     * @returns {void}
     */
    Chart3D.prototype.draw3DAxis = function () {
        for (var i = 0; i < this.axisCollections.length; i++) {
            this.axisRender.drawAxes(i, this.axisCollections[i], this);
        }
    };
    /**
     * Renders chart series elements.
     *
     * @private
     * @returns {void}
     */
    Chart3D.prototype.renderSeries = function () {
        var visibility;
        for (var _i = 0, _a = this.visibleSeries; _i < _a.length; _i++) {
            var item = _a[_i];
            visibility = item.visible;
            if (visibility) {
                this.visible++;
                item.renderSeries(this);
            }
        }
        this.visible = 0;
    };
    /**
     * Initializes the configuration for an axis within a three-dimensional chart series.
     *
     * @param {Chart3DSeries} series - The series to which the axis belongs.
     * @param {Chart3DAxis} axis - The axis to be configured and initialized.
     * @param {boolean} isSeries - Indicates whether the axis configuration is for the series.
     * @returns {void}
     */
    Chart3D.prototype.initAxis = function (series, axis, isSeries) {
        if (series.xAxisName === axis.name || (series.xAxisName == null && axis.name === 'primaryXAxis')) {
            axis.orientation = this.requireInvertedAxis ? 'Vertical' : 'Horizontal';
            series.xAxis = axis;
            if (isSeries) {
                axis.series.push(series);
            }
        }
        else if (series.yAxisName === axis.name || (series.yAxisName == null && axis.name === 'primaryYAxis')) {
            axis.orientation = this.requireInvertedAxis ? 'Horizontal' : 'Vertical';
            series.yAxis = axis;
            if (isSeries) {
                axis.series.push(series);
            }
        }
    };
    /**
     * Calculate the visible axis.
     *
     * @private
     * @returns {void}
     */
    Chart3D.prototype.calculateVisibleAxis = function () {
        var axis;
        var axes = [this.primaryXAxis, this.primaryYAxis];
        axes = axes.concat(this.axes);
        this.axisCollections = [];
        for (var i = 0, len = axes.length; i < len; i++) {
            axis = axes[i];
            axis.series = [];
            axis.labels = [];
            axis.indexLabels = {};
            axis.orientation = (i === 0) ? (this.requireInvertedAxis ? 'Vertical' : 'Horizontal') :
                (i === 1) ? (this.requireInvertedAxis ? 'Horizontal' : 'Vertical') : axis.orientation;
            for (var _i = 0, _a = this.visibleSeries; _i < _a.length; _i++) {
                var series = _a[_i];
                this.initAxis(series, axis, true);
            }
            if (axis.orientation != null) {
                this.axisCollections.push(axis);
            }
        }
        if (this.rows.length > 0 && this.columns.length > 0) {
            this.chartAxisLayoutPanel.measure();
        }
    };
    /**
     * Unbinding events from the element while component destroy.
     *
     * @hidden
     * @returns {void}
     */
    Chart3D.prototype.unWireEvents = function () {
        var startEvent = Browser.touchStartEvent;
        var moveEvent = Browser.touchMoveEvent;
        var stopEvent = Browser.touchEndEvent;
        var cancelEvent = Browser.isPointer ? 'pointerleave' : 'mouseleave';
        /** UnBind the Event handler */
        EventHandler.remove(this.element, startEvent, this.chartOnMouseDown);
        EventHandler.remove(this.element, moveEvent, this.mouseMove);
        EventHandler.remove(this.element, stopEvent, this.mouseEnd);
        EventHandler.remove(this.element, 'click', this.chartOnMouseClick);
        EventHandler.remove(this.element, cancelEvent, this.mouseLeave);
        EventHandler.remove(this.element, 'keydown', this.chartKeyDown);
        EventHandler.remove(document.body, 'keydown', this.documentKeyHandler);
        EventHandler.remove(this.element, 'keyup', this.chartKeyUp);
        window.removeEventListener((Browser.isTouch && ('orientation' in window && 'onorientationchange' in window)) ? 'orientationchange' : 'resize', this.resizeBound);
        /**
         * To fix memory issue
         */
        if (this.touchObject) {
            this.touchObject.destroy();
            this.touchObject = null;
        }
    };
    /**
     * Binding events to the element while component creation.
     *
     * @hidden
     * @returns {void}
     */
    Chart3D.prototype.wireEvents = function () {
        /**
         * To fix react timeout destroy issue.
         */
        if (!this.element) {
            return;
        }
        /** Find the Events type */
        var cancelEvent = Browser.isPointer ? 'pointerleave' : 'mouseleave';
        /** Bind the Event handler */
        EventHandler.add(this.element, Browser.touchStartEvent, this.chartOnMouseDown, this);
        EventHandler.add(this.element, Browser.touchMoveEvent, this.mouseMove, this);
        EventHandler.add(this.element, Browser.touchEndEvent, this.mouseEnd, this);
        EventHandler.add(this.element, 'click', this.chartOnMouseClick, this);
        EventHandler.add(this.element, cancelEvent, this.mouseLeave, this);
        EventHandler.add(this.element, 'keydown', this.chartKeyDown, this);
        EventHandler.add(document.body, 'keydown', this.documentKeyHandler, this);
        EventHandler.add(this.element, 'keyup', this.chartKeyUp, this);
        this.resizeBound = this.chartResize.bind(this);
        window.addEventListener((Browser.isTouch && ('orientation' in window && 'onorientationchange' in window)) ? 'orientationchange' : 'resize', this.resizeBound);
        this.longPressBound = this.longPress.bind(this);
        this.touchObject = new Touch(this.element, { tapHold: this.longPressBound, tapHoldThreshold: 500 });
        /** Apply the style for chart */
        this.setStyle(this.element);
    };
    /**
     * Handles the long press on chart.
     *
     * @param {TapEventArgs} e - Specifies the tap event arguments.
     * @returns {boolean} false
     * @private
     */
    Chart3D.prototype.longPress = function (e) {
        this.mouseX = (e && e.originalEvent.changedTouches) ? (e.originalEvent.changedTouches[0].clientX) : 0;
        this.mouseY = (e && e.originalEvent.changedTouches) ? (e.originalEvent.changedTouches[0].clientY) : 0;
        this.startMove = true;
        this.setMouseXY(this.mouseX, this.mouseY);
        this.notify('tapHold', e);
        return false;
    };
    /**
     * Handles the mouse click on chart.
     *
     * @param {PointerEvent | TouchEvent} e - Specifies the pointer event.
     * @returns {boolean} false
     * @private
     */
    Chart3D.prototype.chartOnMouseClick = function (e) {
        var _this = this;
        var element = e.target;
        var chart = this;
        this.clickCount++;
        var timeInterval = 400;
        if (this.clickCount === 1) {
            this.singleClickTimer = +setTimeout(function () {
                chart.clickCount = 0;
                chart.trigger('chart3DMouseClick', { target: element.id, x: chart.mouseX, y: chart.mouseY });
            }, timeInterval);
        }
        else if (this.clickCount === 2) {
            clearTimeout(this.singleClickTimer);
            this.clickCount = 0;
        }
        var isAngular = 'isAngular';
        if (this[isAngular]) {
            //const observers: string = 'observers';
            timeInterval = 0;
        }
        else {
            timeInterval = 0;
        }
        if (this.clickCount === 1 && this.pointClick) {
            this.singleClickTimer = +setTimeout(function () {
                _this.clickCount = 0;
                _this.triggerPointEvent(pointClick, e);
            }, timeInterval);
        }
        this.removeNavigationStyle();
        this.notify('click', e);
        return false;
    };
    /**
     * Export method for the chart.
     *
     * @param {ExportType} type - Specifies the type of the export.
     * @param {string} fileName - Specifies the file name of the exported file.
     * @returns {void}
     */
    Chart3D.prototype.export = function (type, fileName) {
        if (this.export3DModule) {
            this.export3DModule.export(type, fileName);
            if (this.afterExport) {
                this.export3DModule.getDataUrl(this);
            }
        }
    };
    /**
     * Handles the chart resize.
     *
     * @returns {boolean} false
     * @private
     */
    Chart3D.prototype.chartResize = function () {
        var _this = this;
        this.animateSeries = false;
        var arg = {
            chart: this,
            currentSize: new Size(0, 0),
            previousSize: new Size(this.availableSize.width, this.availableSize.height)
        };
        var beforeResizeArgs = { cancel: false };
        if (this.resizeTo) {
            clearTimeout(this.resizeTo);
        }
        this.trigger(beforeResize, beforeResizeArgs);
        if (!beforeResizeArgs.cancel) {
            this.resizeTo = +setTimeout(function () {
                if (_this.isDestroyed) {
                    clearTimeout(_this.resizeTo);
                    return;
                }
                _this.createChartSvg();
                arg.currentSize = _this.availableSize;
                _this.trigger(resized, arg);
                _this.polygons = [];
                _this.refreshAxis();
                _this.refreshBound();
                _this.trigger('loaded', { chart: _this });
            }, 500);
        }
        return false;
    };
    /**
     * Triggers a point-specific event with the specified event type and event data.
     *
     * @param {string} event - The type of event to trigger.
     * @param {PointerEvent | TouchEvent} [e] - (Optional) The event data associated with the triggered event.
     * @returns {void}
     */
    Chart3D.prototype.triggerPointEvent = function (event, e) {
        var evt = e;
        var series = null;
        var point = null;
        var index;
        var pointIndex;
        var seriesIndex;
        var targetElement = evt.target;
        if (targetElement) {
            var nodeName = targetElement.nodeName;
            if ((nodeName === 'path' || nodeName === 'shape') && targetElement.id.indexOf('-region-') > 1) {
                index = targetElement.id.match(/(\d+)/g);
                pointIndex = parseInt(index[index.length - 1].toString(), 10);
                seriesIndex = parseInt(index[index.length - 2].toString(), 10);
            }
            if (!isNullOrUndefined(seriesIndex)) {
                series = this.visibleSeries[seriesIndex];
            }
            if (series && series.visible) {
                point = series.points[pointIndex];
            }
        }
        if (series && point) {
            this.trigger(event, {
                series: series,
                point: point,
                seriesIndex: seriesIndex, pointIndex: pointIndex,
                x: this.mouseX, y: this.mouseY
            });
        }
    };
    /**
     * Handles the mouse down on chart.
     *
     * @param {PointerEvent} e - Specifies the pointer event.
     * @returns {boolean} false
     * @private
     */
    Chart3D.prototype.chartOnMouseDown = function (e) {
        var pageX;
        var pageY;
        var touchArg;
        var rect = this.element.getBoundingClientRect();
        var element = e.target;
        this.trigger('chart3DMouseDown', { target: element.id, x: this.mouseX, y: this.mouseY });
        if (e.type === 'touchstart') {
            this.isTouch = true;
            touchArg = e;
            pageX = touchArg.changedTouches[0].clientX;
            pageY = touchArg.changedTouches[0].clientY;
        }
        else {
            this.isTouch = e.pointerType === 'touch';
            pageX = e.clientX;
            pageY = e.clientY;
        }
        var svgRect = getElement(this.svgId).getBoundingClientRect();
        this.mouseDownX = this.previousMouseMoveX = (pageX - rect.left) - Math.max(svgRect.left - rect.left, 0);
        this.mouseDownY = this.previousMouseMoveY = (pageY - rect.top) - Math.max(svgRect.top - rect.top, 0);
        if (this.enableRotation) {
            if (this.isTouch && this.tooltip3DModule && this.tooltip3DModule.svgTooltip) {
                this.tooltip3DModule.svgTooltip.fadeOut();
            }
            this.rotateActivate = true;
            this.previousCoords = { x: this.mouseDownX, y: this.mouseDownY };
        }
        this.notify(Browser.touchStartEvent, e);
        return false;
    };
    /**
     * Handles the mouse move on chart.
     *
     * @param {PointerEvent} e - Specifies the pointer event.
     * @returns {boolean} false
     * @private
     */
    Chart3D.prototype.mouseMove = function (e) {
        var pageX;
        var pageY;
        var touchArg;
        if (e.type === 'touchmove') {
            this.isTouch = true;
            touchArg = e;
            pageX = touchArg.changedTouches[0].clientX;
            pageY = touchArg.changedTouches[0].clientY;
        }
        else {
            this.isTouch = e.pointerType === 'touch' || e.pointerType === '2' || this.isTouch;
            pageX = e.clientX;
            pageY = e.clientY;
        }
        if (getElement(this.svgId)) {
            this.setMouseXY(pageX, pageY);
            this.chartOnMouseMove(e);
        }
        return false;
    };
    /**
     * Handles the mouse leave on chart.
     *
     * @param {PointerEvent} e - Specifies the pointer event.
     * @returns {boolean} false
     * @private
     */
    Chart3D.prototype.mouseLeave = function (e) {
        var pageX;
        var pageY;
        var touchArg;
        if (e.type === 'touchleave') {
            this.isTouch = true;
            touchArg = e;
            pageX = touchArg.changedTouches[0].clientX;
            pageY = touchArg.changedTouches[0].clientY;
        }
        else {
            this.isTouch = e.pointerType === 'touch' || e.pointerType === '2';
            pageX = e.clientX;
            pageY = e.clientY;
        }
        this.setMouseXY(pageX, pageY);
        this.chartOnMouseLeave(e);
        return false;
    };
    /**
     * Handles the mouse up on chart.
     *
     * @param {PointerEvent} e - Specifies the pointer event.
     * @returns {boolean} false
     * @private
     */
    Chart3D.prototype.mouseEnd = function (e) {
        var pageY;
        var pageX;
        var touchArg;
        if (e.type === 'touchend') {
            touchArg = e;
            pageX = touchArg.changedTouches[0].clientX;
            this.isTouch = true;
            pageY = touchArg.changedTouches[0].clientY;
        }
        else {
            pageY = e.clientY;
            pageX = e.clientX;
            this.isTouch = e.pointerType === 'touch' || e.pointerType === '2';
        }
        this.setMouseXY(pageX, pageY);
        this.chartOnMouseUp(e);
        return false;
    };
    /**
     * Handles the mouse up on chart.
     *
     * @param {PointerEvent | TouchEvent} e - Specifies the pointer event.
     * @private
     * @returns {boolean} false
     */
    Chart3D.prototype.chartOnMouseUp = function (e) {
        var element = e.target;
        this.trigger('chart3DMouseUp', { target: element.id, x: this.mouseX, y: this.mouseY });
        if (this.isTouch) {
            this.titleTooltip(e, this.mouseX, this.mouseY);
            this.axisTooltip(e, this.mouseX, this.mouseY, this.isTouch);
        }
        this.notify(Browser.touchEndEvent, e);
        this.rotateActivate = false;
        this.delayRedraw = false;
        return false;
    };
    /**
     * Prints the chart in the page.
     *
     * @param {string[] | string | Element} id - The id of the chart to be printed on the page.
     * @returns {void}
     */
    Chart3D.prototype.print = function (id) {
        var printChart = new PrintUtils(this);
        printChart.print(id);
    };
    /**
     * Handles the mouse move on chart.
     *
     * @param {PointerEvent | TouchEvent} e - Specifies the pointer event.
     * @returns {boolean} false
     * @private
     */
    Chart3D.prototype.chartOnMouseMove = function (e) {
        var element = e.target;
        this.trigger('chart3DMouseMove', { target: element.id, x: this.mouseX, y: this.mouseY });
        if (this.pointMove) {
            this.triggerPointEvent(pointMove, e);
        }
        if (!this.isTouch) {
            this.titleTooltip(e, this.mouseX, this.mouseY);
            this.axisTooltip(e, this.mouseX, this.mouseY);
        }
        if (this.rotateActivate && withInBounds(this.mouseX, this.mouseY, this.chartAxisLayoutPanel.seriesClipRect)) {
            var difX = this.previousCoords.x - this.mouseX;
            var difY = this.previousCoords.y - this.mouseY;
            if (difX || difY) {
                this.tilt -= difY;
                this.rotation += difX;
                if (!this.isTouch) {
                    var grpElement = document.getElementById(this.chart3D.id);
                    grpElement.innerHTML = '';
                    grpElement.remove();
                }
                else {
                    document.querySelectorAll('[id*="axis-label-"]').forEach(function (axisElement) { return axisElement.remove(); });
                    this.delayRedraw = true;
                }
                var size = { width: this.availableSize.width, height: this.availableSize.height };
                this.graphics.view(this.svgObject, this, this.rotation, this.tilt, size, this.perspectiveAngle, this.depth);
                appendChildElement(false, this.svgObject, this.chart3D, this.redraw);
                this.previousCoords.y = this.mouseY;
                this.previousCoords.x = this.mouseX;
                this.isRemove = false;
            }
        }
        this.notify(Browser.touchMoveEvent, e);
        this.isTouch = false;
        return false;
    };
    /**
     * Displays a tooltip for a title or element at the specified coordinates.
     *
     * @param {Event} event - The event triggering the tooltip display.
     * @param {number} x - The X-coordinate for the tooltip.
     * @param {number} y - The Y-coordinate for the tooltip.
     * @param {boolean} [isTouch] - (Optional) Indicates whether the event was triggered by a touch input.
     * @returns {void}
     */
    Chart3D.prototype.titleTooltip = function (event, x, y, isTouch) {
        var targetId = event.target.id;
        var id = (targetId === (this.element.id + '-chart-title') || targetId === (this.element.id + '-chart-sub-title') ||
            targetId.indexOf('-axis-title') > -1 || targetId.indexOf('_legend_title') > -1);
        var index = 0;
        if (targetId.indexOf('-axis-title') > -1) {
            index = parseInt(((targetId.replace(this.element.id + '-svg', '')).replace('-axis-title', '')).split('-')[1], 10);
        }
        if (id && (event.target.textContent.indexOf('...') > -1)) {
            var title = (targetId === (this.element.id + '-chart-title')) ? this.title :
                targetId.indexOf('-axis-title') > -1 ? this.axisCollections[index].title :
                    targetId.indexOf('-chart-sub-title') > -1 ? this.subTitle : this.legendSettings.title;
            showTooltip(title, x, y, this.element.offsetWidth, this.element.id + '-EJ2-title-tooltip', getElement(this.element.id + '_Secondary_Element'), isTouch);
        }
        else {
            removeElement(this.element.id + '-EJ2-title-tooltip');
        }
    };
    /**
     * To find mouse x, y coordinate for the chart.
     *
     * @param {number} pageX - Specifies the x value of the pageX.
     * @param {number} pageY - Specifies the y value of the pageY.
     * @returns {void}
     */
    Chart3D.prototype.setMouseXY = function (pageX, pageY) {
        if (getElement(this.svgId)) {
            var svgRect = getElement(this.svgId).getBoundingClientRect();
            var rect = this.element.getBoundingClientRect();
            this.mouseY = ((pageY - rect.top) - Math.max(svgRect.top - rect.top, 0) / this.scaleX);
            this.mouseX = ((pageX - rect.left) - Math.max(svgRect.left - rect.left, 0) / this.scaleY);
        }
    };
    /**
     * Handles the mouse leave on chart.
     *
     * @param {PointerEvent | TouchEvent} e - Specifies the pointer event.
     * @returns {boolean} false
     * @private
     */
    Chart3D.prototype.chartOnMouseLeave = function (e) {
        var element = e.target;
        var cancelEvent = Browser.isPointer ? 'pointerleave' : 'mouseleave';
        this.trigger('chart3DMouseLeave', { target: element.id, x: this.mouseX, y: this.mouseY });
        removeElement(this.element.id + '-EJ2-axis-label-tooltip');
        this.isPointMouseDown = false;
        this.notify(cancelEvent, e);
        this.rotateActivate = false;
        this.delayRedraw = false;
        return false;
    };
    /**
     * Handles the 'onkeydown' keyboard event on the chart.
     *
     * @param {KeyboardEvent} e - Specifies the keydown event arguments.
     * @returns {boolean} false
     * @private
     */
    Chart3D.prototype.chartKeyDown = function (e) {
        var actionKey = '';
        if (e.code === 'Tab') {
            this.removeNavigationStyle();
        }
        if (e.code === 'Space') {
            e.preventDefault();
        }
        if (this.tooltip.enable && ((e.code === 'Tab' && this.previousTargetId.indexOf('-series') > -1) || e.code === 'Escape')) {
            actionKey = 'ESC';
        }
        if (this.highlightMode !== 'None' && e.code === 'Tab' && this.previousTargetId.indexOf('_chart_legend_') > -1) {
            if (this.highlight3DModule) {
                this.highlight3DModule.removeLegendHighlightStyles();
            }
        }
        if (e.ctrlKey && (e.key === 'p')) {
            e.preventDefault();
            actionKey = 'CtrlP';
        }
        if (actionKey !== '') {
            this.chartKeyboardNavigations(e, e.target.id, actionKey);
        }
        return false;
    };
    /**
     *Handles the 'onkeyup' keyboard event on the chart..
     *
     * @param {KeyboardEvent} e - Specifies the keyup event arguments.
     * @returns {boolean} false
     * @private
     */
    Chart3D.prototype.chartKeyUp = function (e) {
        var actionKey = '';
        var targetId = e.target['id'];
        var groupElement;
        var targetElement = e.target;
        var titleElement = getElement(this.element.id + '-chart-title');
        var seriesElement = getElement(this.element.id + '-svg-0-region-series-0-point-0');
        var legendElement = getElement(this.element.id + '_chart_legend_translate_g');
        var pagingElement = getElement(this.element.id + '_chart_legend_pageup');
        this.removeNavigationStyle();
        if (titleElement) {
            titleElement.setAttribute('class', 'e-chart-focused');
        }
        if (seriesElement) {
            var className = seriesElement.getAttribute('class');
            if (className && className.indexOf('e-chart-focused') === -1) {
                className = className + ' e-chart-focused';
            }
            else if (!className) {
                className = 'e-chart-focused';
            }
            seriesElement.setAttribute('class', className);
        }
        if (legendElement) {
            var firstChild = legendElement.firstElementChild;
            var className = firstChild.getAttribute('class');
            if (className && className.indexOf('e-chart-focused') === -1) {
                className = className + ' e-chart-focused';
            }
            else if (!className) {
                className = 'e-chart-focused';
            }
            firstChild.setAttribute('class', className);
        }
        if (pagingElement) {
            pagingElement.setAttribute('class', 'e-chart-focused');
        }
        if (e.code === 'Tab') {
            if (this.previousTargetId !== '') {
                if ((this.previousTargetId.indexOf('-series-') > -1 && targetId.indexOf('-series-') === -1)) {
                    var previousElement = getElement(this.element.id + '-svg-0-region-series-' + this.currentSeriesIndex + '-point-' + this.currentPointIndex);
                    this.setTabIndex(previousElement, seriesElement);
                    this.currentPointIndex = 0;
                    this.currentSeriesIndex = 0;
                }
                else if (this.previousTargetId.indexOf('_chart_legend_page') > -1 && targetId.indexOf('_chart_legend_page') === -1
                    && targetId.indexOf('_chart_legend_g_') === -1) {
                    this.setTabIndex(e.target, getElement(this.element.id + '_chart_legend_pageup'));
                }
                else if (this.previousTargetId.indexOf('_chart_legend_g_') > -1 && targetId.indexOf('_chart_legend_g_') === -1) {
                    groupElement = getElement(this.element.id + '_chart_legend_translate_g');
                    this.setTabIndex(groupElement.children[this.currentLegendIndex], groupElement.firstElementChild);
                }
            }
            this.previousTargetId = targetId;
            if (targetId.indexOf('-series-') > -1) {
                this.currentSeriesIndex = +(targetId.split('-series-')[1].split('-point-')[0]);
                targetElement.removeAttribute('tabindex');
                targetElement.blur();
                targetId = this.focusChild(targetElement);
            }
            actionKey = this.highlightMode !== 'None' || this.tooltip.enable ? 'Tab' : '';
        }
        else if (e.code.indexOf('Arrow') > -1) {
            e.preventDefault();
            this.previousTargetId = targetId;
            if (targetId.indexOf('_chart_legend_page') > -1) {
                if (e.code === 'ArrowLeft') {
                    getElement(this.element.id + '_chart_legend_pagedown').removeAttribute('tabindex');
                    this.focusChild(getElement(this.element.id + '_chart_legend_pageup'));
                }
                else if (e.code === 'ArrowRight') {
                    getElement(this.element.id + '_chart_legend_pageup').removeAttribute('tabindex');
                    this.focusChild(getElement(this.element.id + '_chart_legend_pagedown'));
                }
            }
            else if ((targetId.indexOf('_chart_legend_') > -1)) {
                var legendElement_1 = targetElement.parentElement.children;
                legendElement_1[this.currentLegendIndex].removeAttribute('tabindex');
                this.currentLegendIndex += (e.code === 'ArrowUp' || e.code === 'ArrowRight') ? +1 : -1;
                this.currentLegendIndex = this.getActualIndex(this.currentLegendIndex, legendElement_1.length);
                var currentLegend = legendElement_1[this.currentLegendIndex];
                this.focusChild(currentLegend);
                this.removeNavigationStyle();
                this.setNavigationStyle(currentLegend.id);
                targetId = currentLegend.children[1].id;
                actionKey = this.highlightMode !== 'None' ? 'ArrowMove' : '';
            }
            else if (targetId.indexOf('-series-') > -1) {
                var currentPoint = e.target;
                targetElement.removeAttribute('tabindex');
                targetElement.blur();
                if (e.code === 'ArrowRight' || e.code === 'ArrowLeft') {
                    this.currentSeriesIndex = this.currentSeriesIndex + (e.code === 'ArrowRight' ? 1 : -1);
                    this.currentSeriesIndex = this.getActualIndex(this.currentSeriesIndex, this.series.length);
                }
                else {
                    this.currentPointIndex += e.code === 'ArrowUp' ? 1 : -1;
                }
                if (targetId.indexOf('-point-') > -1) {
                    this.currentPointIndex = this.getActualIndex(this.currentPointIndex, this.visibleSeries[this.currentSeriesIndex].points.length ?
                        this.currentSeries.points.length : 1);
                    var pointElements = document.querySelectorAll('[id*="svg-0-region-series-' + this.currentSeriesIndex + '-point-' +
                        this.currentPointIndex + '"]');
                    for (var i = 0; i < pointElements.length; i++) {
                        if (pointElements[i].id.split('-point-')[1].split('-')[0] === this.currentPointIndex.toString()) {
                            currentPoint = pointElements[i];
                        }
                    }
                }
                targetId = this.focusChild(currentPoint);
                this.removeNavigationStyle();
                this.setNavigationStyle(currentPoint.id);
                actionKey = this.tooltip.enable || this.highlightMode !== 'None' ? 'ArrowMove' : '';
            }
        }
        else if ((e.code === 'Enter' || e.code === 'Space') && ((targetId.indexOf('_chart_legend_') > -1) ||
            (targetId.indexOf('-point-') > -1))) {
            targetId = (targetId.indexOf('_chart_legend_page') > -1) ? targetId : ((targetId.indexOf('_chart_legend_') > -1) ?
                targetElement.children[1].id : targetId);
            actionKey = 'Enter';
        }
        if (actionKey !== '') {
            this.chartKeyboardNavigations(e, targetId, actionKey);
        }
        if (e.code === 'Tab') {
            this.setNavigationStyle(targetId);
        }
        return false;
    };
    /**
     * Sets the tabindex for the current element and removes it from the previous element.
     *
     * @param {HTMLElement} previousElement - The element whose tabindex should be removed.
     * @param {HTMLElement} currentElement - The element to which tabindex should be set.
     * @returns {void}
     * @private
     */
    Chart3D.prototype.setTabIndex = function (previousElement, currentElement) {
        if (previousElement) {
            previousElement.removeAttribute('tabindex');
        }
        if (currentElement) {
            currentElement.setAttribute('tabindex', '0');
        }
    };
    /**
     * Calculates the actual index considering boundary conditions within a given range.
     *
     * @param {number} index - The index to be adjusted.
     * @param {number} totalLength - The total length or maximum allowed index value.
     * @returns {number} - The adjusted index within the valid range.
     */
    Chart3D.prototype.getActualIndex = function (index, totalLength) {
        return index > totalLength - 1 ? 0 : (index < 0 ? totalLength - 1 : index);
    };
    /**
     *  Used to configure tooltips for the chart's axes.
     *
     * @private
     * @param {Event} event - Specifies the event args.
     * @param {number} x - Specifies the x value.
     * @param {number} y - Specifies the y value.
     * @param {boolean} isTouch - Specifies the boolean value.
     * @description - Handles the axis tooltip.
     * @returns {void}
     */
    Chart3D.prototype.axisTooltip = function (event, x, y, isTouch) {
        var targetId = event.target.id;
        if ((targetId.indexOf('axis-label') > -1) &&
            (event.target.textContent.indexOf('...') > -1)) {
            var isTitleOrLegendEnabled = (this.legendSettings.visible || this.primaryXAxis.title === '');
            showTooltip(this.findAxisLabel(targetId), x, y, this.element.offsetWidth, this.element.id + '-EJ2-axis-label-tooltip', getElement(this.element.id + '_Secondary_Element'), isTouch, isTitleOrLegendEnabled);
        }
        else {
            removeElement(this.element.id + '-EJ2-axis-label-tooltip');
        }
    };
    /**
     * Searches for an axis label based on the provided text.
     *
     * @param {string} text - The text to search for within the axis label collection.
     * @returns {string} - The matching axis label, or an empty string if no match is found.
     */
    Chart3D.prototype.findAxisLabel = function (text) {
        var texts = ((text.replace(this.element.id + '-', '')).replace('-axis-label', '')).split('-');
        return this.axisCollections[parseInt(texts[0], 10)].visibleLabels[parseInt(texts[1], 10)].originalText;
    };
    /**
     * Sets focus on a child element within the parent element.
     *
     * @param {HTMLElement} element - The parent element containing the child to be focused.
     * @returns {string} - A message indicating the result of the focus operation.
     */
    Chart3D.prototype.focusChild = function (element) {
        element.setAttribute('tabindex', '0');
        var className = element.getAttribute('class');
        element.setAttribute('tabindex', '0');
        if (className && className.indexOf('e-chart-focused') === -1) {
            className = 'e-chart-focused ' + className;
        }
        else if (!className) {
            className = 'e-chart-focused';
        }
        element.setAttribute('class', className);
        element.focus();
        return element.id;
    };
    /**
     * Handles the document onkey.
     *
     * @param {KeyboardEvent} e - The keyboard event triggering the navigation.
     * @private
     * @returns {void}
     */
    Chart3D.prototype.documentKeyHandler = function (e) {
        if (e.altKey && e.keyCode === 74 && !isNullOrUndefined(this.element)) {
            this.element.focus();
        }
    };
    /**
     * Handles chart keyboard navigation events.
     *
     * @param {KeyboardEvent} e - The keyboard event triggering the navigation.
     * @param {string} targetId - The ID of the target element or chart component.
     * @param { string} actionKey - - The type of keyboard action (e.g., 'Tab' or 'ArrowMove').
     * @returns {void}
     */
    Chart3D.prototype.chartKeyboardNavigations = function (e, targetId, actionKey) {
        this.isLegendClicked = false;
        this.removeNavigationStyle();
        this.setNavigationStyle(targetId);
        switch (actionKey) {
            case 'Tab':
            case 'ArrowMove':
                if (this.highlight3DModule) {
                    this.highlight3DModule.removeLegendHighlightStyles();
                }
                if (targetId.indexOf('-point-') > -1) {
                    if (document.activeElement) {
                        var element = document.activeElement;
                        var rect = element.getBoundingClientRect();
                        // Client coordinates (relative to the viewport)
                        var clientX = rect.left + rect.width / 2;
                        var clientY = rect.top;
                        // Page coordinates (relative to the whole document)
                        var pageX = window.scrollX + clientX;
                        var pageY = window.scrollY + clientY;
                        this.mouseX = pageX;
                        this.mouseY = pageY;
                    }
                    if (this.highlight3DModule) {
                        this.highlight3DModule.highlightChart(document.getElementById(targetId), 'mousemove');
                        this.highlight3DModule.completeSelection();
                    }
                    if (this.tooltip3DModule) {
                        var data = { series: this.visibleSeries[targetId.split('-series-')[1].split('-point-')[0]], point: this.visibleSeries[targetId.split('-series-')[1].split('-point-')[0]].points[targetId.split('-point-')[1].split('-')[0]] };
                        var svgElement = document.getElementById(this.element.id + '_tooltip_svg');
                        var isFirst = (svgElement && parseInt(svgElement.getAttribute('opacity'), 10) > 0);
                        var tooltipDiv = this.tooltip3DModule.getTooltipElement(isFirst);
                        if (this.tooltip3DModule.pushData(data, !isFirst, tooltipDiv, true)) {
                            this.tooltip3DModule.triggerTooltipRender(data, !isFirst, this.tooltip3DModule.getTooltipText(data), this.tooltip3DModule.findHeader(data));
                        }
                    }
                }
                if (this.highlight3DModule && this.highlightMode !== 'None') {
                    targetId = targetId.indexOf('_chart_legend_g_') > -1 ? document.getElementById(targetId).firstChild['id'] : targetId;
                    var legendID = this.element.id + '_chart_legend';
                    var legendItemsId = [legendID + '_text_', legendID + '_shape_marker_',
                        legendID + '_shape_'];
                    for (var i = 0; i < legendItemsId.length; i++) {
                        var id = legendItemsId[i];
                        if (targetId.indexOf(id) > -1) {
                            document.getElementById(targetId).setAttribute('class', '');
                            this.highlight3DModule.legendSelection(this, parseInt(targetId.split(id)[1], 10), document.getElementById(targetId), 'mousemove');
                            break;
                        }
                    }
                }
                break;
            case 'Enter':
            case 'Space':
                if (targetId.indexOf('_chart_legend_') > -1) {
                    this.isLegendClicked = true;
                    this.legend3DModule.click(e);
                    this.focusChild(document.getElementById(targetId).parentElement);
                    this.setNavigationStyle(document.getElementById(targetId).parentElement.id);
                }
                else {
                    if (this.selection3DModule) {
                        this.selection3DModule.calculateSelectedElements(document.getElementById(targetId), 'click');
                    }
                    this.setNavigationStyle(targetId);
                }
                break;
            case 'CtrlP':
                this.print();
                break;
            case 'ESC':
                this.tooltip3DModule.removeTooltip(1);
                break;
        }
    };
    /**
     *  Applys the style for chart.
     *
     * @private
     * @param {HTMLElement} element - Specifies the element.
     * @returns {void}
     */
    Chart3D.prototype.setStyle = function (element) {
        var disableScroll = this.selectionMode !== 'None' || this.highlightMode !== 'None';
        element.style.touchAction = this.enableRotation || disableScroll ? 'none' : 'element';
        element.style.msTouchAction = disableScroll ? 'none' : 'element';
        element.style.msContentZooming = 'none';
        element.style.msUserSelect = 'none';
        element.style.webkitUserSelect = 'none';
        element.style.position = 'relative';
        element.style.display = 'block';
        element.style.overflow = 'hidden';
        element.style.height = (element.style.height || (this.height && this.height.indexOf('%') === -1)) ? element.style.height : 'inherit';
    };
    /**
     * The method to determine whether it is a secondary axis or not.
     *
     * @param  {Chart3DAxis} axis - Specifies the axis.
     * @returns {boolean} Returns the boolean value.
     * @private
     */
    Chart3D.prototype.isSecondaryAxis = function (axis) {
        return (this.axes.indexOf(axis) > -1);
    };
    /**
     * To refresh the rows and columns.
     *
     * @param {Chart3DRow[] | Chart3DColumn} definitions - Specifies the row or column definition.
     * @private
     * @returns {void}
     */
    Chart3D.prototype.refreshDefinition = function (definitions) {
        for (var _i = 0, definitions_1 = definitions; _i < definitions_1.length; _i++) {
            var item = definitions_1[_i];
            item.axes = [];
        }
    };
    /**
     * Adds new series to the chart
     *
     * @param {Chart3DSeriesModel[]} seriesCollection - The series collection to be added to the chart.
     * @returns {void}
     */
    Chart3D.prototype.addSeries = function (seriesCollection) {
        this.animateSeries = false;
        for (var _i = 0, seriesCollection_1 = seriesCollection; _i < seriesCollection_1.length; _i++) {
            var series = seriesCollection_1[_i];
            series = new Chart3DSeries(this, 'series', series);
            this.series.push(series);
        }
        this.refresh();
    };
    /**
     * Removes a series from the chart
     *
     * @param {number} index - The index of the series to be removed from the chart.
     * @returns {void}
     */
    Chart3D.prototype.removeSeries = function (index) {
        this.redraw = false;
        this.animateSeries = false;
        if (this.visibleSeries[index]) {
            this.visibleSeries[index].xAxis.orientation = null;
            this.visibleSeries[index].yAxis.orientation = null;
        }
        for (var i = 0; i < this.axes.length; i++) {
            if (this.axes[i].orientation === null) {
                this.axes.splice(i, 1);
            }
        }
        this.series.splice(index, 1);
        this.refresh();
    };
    /**
     * Refresh the axis default value.
     *
     * @private
     * @returns {void}
     */
    Chart3D.prototype.refreshAxis = function () {
        var axis = this.primaryXAxis;
        axis.rect = new Rect(undefined, undefined, 0, 0);
        axis = this.primaryYAxis;
        axis.isStack100 = false;
        axis.rect = new Rect(undefined, undefined, 0, 0);
        for (var _i = 0, _a = this.axes; _i < _a.length; _i++) {
            var item = _a[_i];
            axis = item;
            axis.rect = new Rect(undefined, undefined, 0, 0);
            axis.isStack100 = false;
        }
    };
    /**
     * Refresh the 3D chart axis.
     *
     * @param {Chart3DAxis} axis - Specifies the axis.
     * @returns {boolean} Returns the boolean value.
     * @private
     */
    Chart3D.prototype.axisChange = function (axis) {
        if (!axis.name && !axis.valueType) {
            return false;
        }
        this.refreshDefinition(this.columns);
        this.refreshDefinition(this.rows);
        this.calculateVisibleAxis();
        this.processData();
        return true;
    };
    /**
     * Get visible series by index.
     *
     * @param {Chart3DSeries[]} visibleSeries - Specifies the visible series.
     * @param {number} index - Specifies the index.
     * @returns {Chart3DSeries} Returns the chart 3D series.
     */
    Chart3D.prototype.getVisibleSeries = function (visibleSeries, index) {
        for (var _i = 0, visibleSeries_1 = visibleSeries; _i < visibleSeries_1.length; _i++) {
            var series = visibleSeries_1[_i];
            if (index === series.index) {
                return series;
            }
        }
        return null;
    };
    /**
     * To remove style element.
     *
     * @private
     * @returns {void}
     */
    Chart3D.prototype.removeStyles = function () {
        removeElement(this.element.id + '_ej2_chart_selection');
        removeElement(this.element.id + '_ej2_chart_highlight');
    };
    /**
     * To find the 3D chart visible series.
     *
     * @private
     * @returns {void}
     */
    Chart3D.prototype.calculateVisibleSeries = function () {
        var series;
        this.visibleSeries = [];
        var colors = this.palettes.length ? this.palettes : get3DSeriesColor(this.theme);
        var count = colors.length;
        var seriesCollection = this.series;
        var vibileSeries = this.series[0];
        if (vibileSeries) {
            this.requireInvertedAxis = ((vibileSeries.type.indexOf('Bar') !== -1) && !this.isTransposed) ||
                ((vibileSeries.type.indexOf('Bar') === -1) && this.isTransposed);
        }
        for (var i = 0, len = seriesCollection.length; i < len; i++) {
            series = seriesCollection[i];
            series.category = 'Series';
            series.index = i;
            series.interior = series.fill || colors[i % count];
            if (this.isSecondaryAxis(series.xAxis)) {
                series.xAxis.internalVisibility = series.xAxis.series.some(function (value) { return (value.visible); });
            }
            if (this.isSecondaryAxis(series.yAxis)) {
                series.yAxis.internalVisibility = series.yAxis.series.some(function (value) { return (value.visible); });
            }
            switch (series.type) {
                case 'Bar':
                case 'StackingBar':
                case 'StackingBar100':
                    if (seriesCollection[0].type.indexOf('Bar') === -1) {
                        continue;
                    }
                    break;
                default:
                    if (seriesCollection[0].type.indexOf('Bar') > -1) {
                        continue;
                    }
                    break;
            }
            this.visibleSeries.push(series);
            seriesCollection[i] = series;
        }
    };
    Chart3D.prototype.highlightAnimation = function (element, index, duration, startOpacity) {
        var endOpacity = parseFloat(this.visibleSeries[index].opacity.toString());
        if (endOpacity) {
            new Animation({}).animate(element, {
                duration: duration,
                progress: function (args) {
                    element.style.animation = '';
                    var progress = args.timeStamp / args.duration;
                    var currentOpacity = startOpacity + (endOpacity - startOpacity) * progress;
                    element.setAttribute('opacity', currentOpacity.toString());
                },
                end: function () {
                    element.setAttribute('opacity', endOpacity.toString());
                }
            });
        }
    };
    Chart3D.prototype.stopElementAnimation = function (element, index) {
        var endOpacity = parseFloat(this.visibleSeries[index].opacity.toString());
        var animation = element.getAttribute('e-animate');
        if (animation) {
            Animation.stop(element);
        }
        element.setAttribute('opacity', endOpacity.toString());
    };
    /**
     * To destroy the widget.
     *
     * @function destroy
     * @member of Chart
     * @returns {void}
     */
    Chart3D.prototype.destroy = function () {
        this.horizontalAxes = [];
        this.verticalAxes = [];
        this.visibleSeries = [];
        this.axisCollections = [];
        this.seriesElements = null;
        this.chartAxisLayoutPanel = null;
        this.dataLabelElements = null;
        this.dataLabelCollections = null;
        removeElement(this.element.id + 'Keyboard_chart_focus');
        removeElement(this.element.id + '_ej2_chart_highlight');
        removeElement('chartmeasuretext');
        var highlightElement = document.getElementById(this.element.id + '_ej2_chart_highlight');
        if (highlightElement) {
            highlightElement.remove();
        }
        var selectionElement = document.getElementById(this.element.id + '_ej2_chart_selection');
        if (selectionElement) {
            selectionElement.remove();
        }
        /**
         * To fix react timeout destroy issue.
         */
        if (this.element) {
            this.unWireEvents();
            if (this.isReact) {
                this.clearTemplate();
            }
            _super.prototype.destroy.call(this);
            this.polygons = [];
            var grpElement = document.getElementById(this.chart3D.id);
            if (grpElement) {
                grpElement.innerHTML = '';
                grpElement.remove();
            }
            this.removeSvg();
            this.svgObject = null;
        }
    };
    /**
     * For internal use only - Get the module name.
     *
     * @returns {string} returns the module name
     * @private
     */
    Chart3D.prototype.getModuleName = function () {
        return 'chart3d';
    };
    /**
     * Get the properties to be maintained in the persisted state.
     *
     * @private
     * @returns {string} returns the string.
     */
    Chart3D.prototype.getPersistData = function () {
        var keyEntity = ['loaded'];
        return this.addOnPersist(keyEntity);
    };
    /**
     * Called internally if any of the property value changed.
     *
     * @private
     * @param {Chart3DModel} newProp - Specifies the new property.
     * @param {Chart3DModel} oldProp - Specifies the old property.
     * @returns {void}
     */
    Chart3D.prototype.onPropertyChanged = function (newProp, oldProp) {
        var renderer = false;
        var refreshBounds = false;
        var axis;
        this.animateSeries = false;
        var len;
        var seriesRefresh = false;
        var series;
        if (!this.delayRedraw) {
            for (var _i = 0, _a = Object.keys(newProp); _i < _a.length; _i++) {
                var prop = _a[_i];
                switch (prop) {
                    case 'primaryXAxis':
                        axis = newProp.primaryXAxis;
                        refreshBounds = this.axisChange(axis);
                        if (newProp.primaryXAxis.edgeLabelPlacement) {
                            renderer = true;
                        }
                        refreshBounds = true;
                        if (!isNullOrUndefined(axis.isInversed) || !isNullOrUndefined(axis.opposedPosition)) {
                            this.primaryXAxis.setIsInversedAndOpposedPosition();
                        }
                        break;
                    case 'primaryYAxis':
                        axis = newProp.primaryYAxis;
                        refreshBounds = this.axisChange(axis);
                        if (newProp.primaryYAxis.edgeLabelPlacement) {
                            renderer = true;
                        }
                        refreshBounds = true;
                        if (!isNullOrUndefined(axis.isInversed) || !isNullOrUndefined(axis.opposedPosition)) {
                            this.primaryYAxis.setIsInversedAndOpposedPosition();
                        }
                        break;
                    case 'axes':
                        for (var _b = 0, _c = Object.keys(newProp.axes); _b < _c.length; _b++) {
                            var index = _c[_b];
                            axis = newProp.axes[index];
                            refreshBounds = refreshBounds || this.axisChange(axis);
                            refreshBounds = true;
                            if (!isNullOrUndefined(axis.isInversed) || !isNullOrUndefined(axis.opposedPosition)) {
                                this.axes[index].setIsInversedAndOpposedPosition();
                            }
                        }
                        break;
                    case 'height':
                    case 'width':
                        this.createChartSvg();
                        refreshBounds = true;
                        break;
                    case 'subTitle':
                    case 'title':
                        refreshBounds = true;
                        break;
                    case 'titleStyle':
                        if (newProp.titleStyle && (newProp.titleStyle.size || newProp.titleStyle.textOverflow)) {
                            refreshBounds = true;
                        }
                        else {
                            renderer = true;
                        }
                        break;
                    case 'subTitleStyle':
                        if (newProp.subTitleStyle && (newProp.subTitleStyle.size || newProp.subTitleStyle.textOverflow)) {
                            refreshBounds = true;
                        }
                        else {
                            renderer = true;
                        }
                        break;
                    case 'border':
                        renderer = true;
                        break;
                    case 'series':
                        len = this.series.length;
                        for (var i = 0; i < len; i++) {
                            series = newProp.series[i];
                            if (series && (series.dataSource || series.query || series.xName ||
                                series.yName || series.size || series.fill || series.name || series.type)) {
                                extend(this.getVisibleSeries(this.visibleSeries, i), series, null, true);
                                seriesRefresh = true;
                            }
                        }
                        if (this.availableSize && this.element) {
                            this.element.style.height = (!this.element.style.height || this.element.style.height === 'inherit') ? (this.availableSize.height + 'px') : this.element.style.height;
                        }
                        if (seriesRefresh) {
                            this.calculateVisibleSeries();
                            this.refreshDefinition(this.columns);
                            this.refreshDefinition(this.rows);
                            this.calculateVisibleAxis();
                            this.processData(false);
                            refreshBounds = true;
                        }
                        break;
                    case 'background':
                        renderer = true;
                        break;
                    case 'dataSource':
                        this.processData(false);
                        refreshBounds = true;
                        break;
                    case 'legendSettings':
                        if (!newProp.legendSettings.background || !newProp.legendSettings.opacity) {
                            refreshBounds = true;
                        }
                        renderer = true;
                        break;
                    case 'palettes':
                        this.calculateVisibleSeries();
                        renderer = true;
                        break;
                    case 'selectedDataIndexes':
                        if (this.selection3DModule) {
                            this.selection3DModule.currentMode = this.selectionMode;
                            this.selection3DModule.selectedDataIndexes = this.selectedDataIndexes;
                            this.selection3DModule.styleId = this.element.id + '_ej2_chart_selection';
                            this.selection3DModule.redrawSelection(this, oldProp.selectionMode, true);
                        }
                        break;
                    case 'selectionMode':
                        if (this.selection3DModule && newProp.selectionMode && newProp.selectionMode.indexOf('Drag') === -1) {
                            this.selection3DModule.currentMode = this.selectionMode;
                            this.selection3DModule.styleId = this.element.id + '_ej2_chart_selection';
                            this.selection3DModule.redrawSelection(this, oldProp.selectionMode, true);
                        }
                        break;
                    case 'isMultiSelect':
                        if (this.selection3DModule && !newProp.isMultiSelect && this.selection3DModule.selectedDataIndexes.length > 1) {
                            this.selection3DModule.currentMode = this.selectionMode;
                            this.selection3DModule.styleId = this.element.id + '_ej2_chart_selection';
                            this.selection3DModule.redrawSelection(this, oldProp.selectionMode);
                        }
                        break;
                    case 'highlightMode':
                    case 'selectionPattern':
                    case 'highlightPattern':
                        this.removeStyles();
                        renderer = true;
                        break;
                    case 'theme':
                        this.animateSeries = true;
                        break;
                    case 'enableRtl':
                    case 'locale':
                    case 'currencyCode':
                        this.refresh();
                        break;
                    case 'tooltip':
                        if (this.tooltip3DModule) { // To check the tooltip enable is true.
                            this.tooltip3DModule.previousPoints = [];
                            if (this.tooltip.template) {
                                this.tooltip3DModule.template = this.tooltip.template;
                            }
                        }
                        break;
                    case 'enableRotation':
                    case 'tilt':
                    case 'depth':
                    case 'wallSize':
                    case 'rotation':
                    case 'perspectiveAngle':
                    case 'enableSideBySidePlacement':
                        renderer = true;
                        break;
                }
            }
            if (!refreshBounds && renderer) {
                this.removeSvg();
                this.polygons = [];
                this.renderElements();
                this.trigger('loaded', { chart: this });
            }
            if (refreshBounds) {
                this.removeSvg();
                if (this.isReact) {
                    this.clearTemplate();
                }
                this.polygons = [];
                this.refreshAxis();
                this.refreshBound();
                this.trigger('loaded', { chart: this });
                this.redraw = false;
                this.animated = false;
            }
        }
    };
    __decorate([
        Property('')
    ], Chart3D.prototype, "title", void 0);
    __decorate([
        Property('')
    ], Chart3D.prototype, "subTitle", void 0);
    __decorate([
        Property('Bootstrap5')
    ], Chart3D.prototype, "theme", void 0);
    __decorate([
        Property(null)
    ], Chart3D.prototype, "description", void 0);
    __decorate([
        Property(null)
    ], Chart3D.prototype, "width", void 0);
    __decorate([
        Property(null)
    ], Chart3D.prototype, "backgroundImage", void 0);
    __decorate([
        Property(null)
    ], Chart3D.prototype, "background", void 0);
    __decorate([
        Property('')
    ], Chart3D.prototype, "dataSource", void 0);
    __decorate([
        Property(null)
    ], Chart3D.prototype, "height", void 0);
    __decorate([
        Property(50)
    ], Chart3D.prototype, "depth", void 0);
    __decorate([
        Property(2)
    ], Chart3D.prototype, "wallSize", void 0);
    __decorate([
        Property(0)
    ], Chart3D.prototype, "tilt", void 0);
    __decorate([
        Property(false)
    ], Chart3D.prototype, "enableRotation", void 0);
    __decorate([
        Property(0)
    ], Chart3D.prototype, "rotation", void 0);
    __decorate([
        Property(true)
    ], Chart3D.prototype, "enableSideBySidePlacement", void 0);
    __decorate([
        Property(90)
    ], Chart3D.prototype, "perspectiveAngle", void 0);
    __decorate([
        Property(null)
    ], Chart3D.prototype, "wallColor", void 0);
    __decorate([
        Property(false)
    ], Chart3D.prototype, "isTransposed", void 0);
    __decorate([
        Property('USD')
    ], Chart3D.prototype, "currencyCode", void 0);
    __decorate([
        Property(false)
    ], Chart3D.prototype, "enableExport", void 0);
    __decorate([
        Event()
    ], Chart3D.prototype, "load", void 0);
    __decorate([
        Event()
    ], Chart3D.prototype, "loaded", void 0);
    __decorate([
        Event()
    ], Chart3D.prototype, "pointClick", void 0);
    __decorate([
        Event()
    ], Chart3D.prototype, "pointMove", void 0);
    __decorate([
        Event()
    ], Chart3D.prototype, "pointRender", void 0);
    __decorate([
        Event()
    ], Chart3D.prototype, "legendRender", void 0);
    __decorate([
        Event()
    ], Chart3D.prototype, "legendClick", void 0);
    __decorate([
        Event()
    ], Chart3D.prototype, "seriesRender", void 0);
    __decorate([
        Event()
    ], Chart3D.prototype, "textRender", void 0);
    __decorate([
        Event()
    ], Chart3D.prototype, "tooltipRender", void 0);
    __decorate([
        Event()
    ], Chart3D.prototype, "beforeResize", void 0);
    __decorate([
        Event()
    ], Chart3D.prototype, "resized", void 0);
    __decorate([
        Event()
    ], Chart3D.prototype, "chart3DMouseMove", void 0);
    __decorate([
        Event()
    ], Chart3D.prototype, "chart3DMouseClick", void 0);
    __decorate([
        Event()
    ], Chart3D.prototype, "chart3DMouseDown", void 0);
    __decorate([
        Event()
    ], Chart3D.prototype, "chart3DMouseLeave", void 0);
    __decorate([
        Event()
    ], Chart3D.prototype, "chart3DMouseUp", void 0);
    __decorate([
        Event()
    ], Chart3D.prototype, "axisLabelRender", void 0);
    __decorate([
        Event()
    ], Chart3D.prototype, "selectionComplete", void 0);
    __decorate([
        Event()
    ], Chart3D.prototype, "beforeExport", void 0);
    __decorate([
        Event()
    ], Chart3D.prototype, "afterExport", void 0);
    __decorate([
        Event()
    ], Chart3D.prototype, "beforePrint", void 0);
    __decorate([
        Complex({}, Margin)
    ], Chart3D.prototype, "margin", void 0);
    __decorate([
        Complex({ fontFamily: null, size: null, fontStyle: null, fontWeight: null, color: null }, TitleSettings)
    ], Chart3D.prototype, "titleStyle", void 0);
    __decorate([
        Complex({ fontFamily: null, size: null, fontStyle: null, fontWeight: null, color: null }, TitleSettings)
    ], Chart3D.prototype, "subTitleStyle", void 0);
    __decorate([
        Complex({}, Chart3DLegendSettings)
    ], Chart3D.prototype, "legendSettings", void 0);
    __decorate([
        Complex({ color: '#DDDDDD', width: 0 }, Border)
    ], Chart3D.prototype, "border", void 0);
    __decorate([
        Complex({ name: 'primaryXAxis' }, Chart3DAxis)
    ], Chart3D.prototype, "primaryXAxis", void 0);
    __decorate([
        Complex({ name: 'primaryYAxis' }, Chart3DAxis)
    ], Chart3D.prototype, "primaryYAxis", void 0);
    __decorate([
        Complex({}, Chart3DTooltipSettings)
    ], Chart3D.prototype, "tooltip", void 0);
    __decorate([
        Collection([{}], Chart3DRow)
    ], Chart3D.prototype, "rows", void 0);
    __decorate([
        Collection([{}], Chart3DColumn)
    ], Chart3D.prototype, "columns", void 0);
    __decorate([
        Collection([{}], Chart3DAxis)
    ], Chart3D.prototype, "axes", void 0);
    __decorate([
        Collection([{}], Chart3DSeries)
    ], Chart3D.prototype, "series", void 0);
    __decorate([
        Property('')
    ], Chart3D.prototype, "highlightColor", void 0);
    __decorate([
        Property('None')
    ], Chart3D.prototype, "selectionMode", void 0);
    __decorate([
        Property('None')
    ], Chart3D.prototype, "highlightMode", void 0);
    __decorate([
        Property('None')
    ], Chart3D.prototype, "selectionPattern", void 0);
    __decorate([
        Property('None')
    ], Chart3D.prototype, "highlightPattern", void 0);
    __decorate([
        Property(false)
    ], Chart3D.prototype, "isMultiSelect", void 0);
    __decorate([
        Collection([], Indexes)
    ], Chart3D.prototype, "selectedDataIndexes", void 0);
    __decorate([
        Property(false)
    ], Chart3D.prototype, "useGroupingSeparator", void 0);
    __decorate([
        Property([])
    ], Chart3D.prototype, "palettes", void 0);
    Chart3D = __decorate([
        NotifyPropertyChanges
    ], Chart3D);
    return Chart3D;
}(Component));
export { Chart3D };
