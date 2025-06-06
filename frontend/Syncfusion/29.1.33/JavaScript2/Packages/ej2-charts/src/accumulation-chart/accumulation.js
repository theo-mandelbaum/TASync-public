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
/**
 * AccumulationChart file
 */
import { Property, Component, Complex, Collection, NotifyPropertyChanges, animationMode, SanitizeHtmlHelper } from '@syncfusion/ej2-base';
import { Internationalization, Event, Browser, EventHandler, Touch } from '@syncfusion/ej2-base';
import { remove, extend, isNullOrUndefined, updateBlazorTemplate } from '@syncfusion/ej2-base';
import { Margin, Border, TooltipSettings, CenterLabel, Indexes, Accessibility, TitleStyleSettings } from '../common/model/base';
import { AccumulationSeries, PieCenter } from './model/acc-base';
import { getThemeColor } from '../common/model/theme';
import { load, pointClick } from '../common/model/constants';
import { pointMove, chartDoubleClick, chartMouseClick, chartMouseDown } from '../common/model/constants';
import { chartMouseLeave, chartMouseMove, chartMouseUp, resized, beforeResize } from '../common/model/constants';
import { LegendSettings } from '../common/legend/legend';
import { indexFinder, appendChildElement, redrawElement, blazorTemplatesReset, getTextAnchor, stringToNumber, textWrap, subtractRect } from '../common/utils/helper';
import { RectOption, showTooltip, ImageOption } from '../common/utils/helper';
import { textElement, createSvg, calculateSize, removeElement, firstToLowerCase, withInBounds } from '../common/utils/helper';
import { getElement, titlePositionX } from '../common/utils/helper';
import { Rect, Size, measureText, TextOption } from '@syncfusion/ej2-svg-base';
import { Data } from '../common/model/data';
import { AccumulationBase } from './renderer/accumulation-base';
import { PieSeries } from './renderer/pie-series';
import { AccumulationAnnotationSettings } from './model/acc-base';
import { getTitle, AccPointData } from '../common/utils/helper';
import { Animation } from '@syncfusion/ej2-base';
import { PrintUtils } from '../common/utils/print';
/**
 * Represents the AccumulationChart control.
 * ```html
 * <div id="accumulation"/>
 * <script>
 *   var accObj = new AccumulationChart({});
 *   accObj.appendTo("#accumulation");
 * </script>
 * ```
 *
 * @public
 */
var AccumulationChart = /** @class */ (function (_super) {
    __extends(AccumulationChart, _super);
    /**
     * Constructor for creating the AccumulationChart widget.
     *
     * @private
     * @param {AccumulationChartModel} options - Specifies the accumulation chart model.
     * @param {string | HTMLElement} element - Specifies the element for the accumulation chart.
     */
    function AccumulationChart(options, element) {
        var _this = _super.call(this, options, element) || this;
        /** @private */
        _this.animateselected = false;
        /** @private */
        _this.explodeDistance = 0;
        /** @private */
        _this.currentLegendIndex = 0;
        /** @private */
        _this.currentPointIndex = 0;
        /** @private */
        _this.previousTargetId = '';
        /** @private */
        _this.isLegendClicked = false;
        _this.chartid = 57724;
        return _this;
    }
    /**
     * Animate the series bounds on data change.
     *
     * @private
     * @param {number} duration - The duration of the animation.
     * @returns {void}
     */
    AccumulationChart.prototype.animate = function (duration) {
        this.duration = (duration === 0 && animationMode === 'Enable') ? 700 : duration;
        this.animateselected = true;
        this.animateSeries = false;
        var temIndex = 0;
        var tempcolor = [];
        var tempindex = [];
        var tempindex1 = [];
        var currentSeries = this.visibleSeries[0];
        var datasource = [];
        datasource = currentSeries.dataSource;
        currentSeries.sumOfPoints = 0;
        if (currentSeries.points.length < Object.keys(currentSeries.dataSource).length) {
            this.refresh();
        }
        else if (currentSeries.points.length > Object.keys(currentSeries.dataSource).length) {
            var currentSeries_1 = this.visibleSeries[0];
            currentSeries_1.points = currentSeries_1.points.filter(function (entry1) {
                entry1.visible = false;
                tempindex.push(entry1.index);
                tempcolor.push(entry1.color);
                return (datasource).some(function (entry2) {
                    var accPoint = entry2;
                    if (entry1.x === accPoint.x) {
                        entry1.visible = true;
                        tempindex1.push(entry1.index);
                        entry1.index = temIndex;
                        temIndex++;
                    }
                    return entry1.x === accPoint.x;
                });
            });
            var missing = tempindex.filter(function (item) { return tempindex1.indexOf(item) < 0; });
            var interval = tempindex.length - missing.length;
            for (var i = (tempindex.length - 1); i >= interval; i--) {
                removeElement('container_Series_0_Point_' + tempindex[i]);
            }
            for (var i = 0; i < currentSeries_1.points.length; i++) {
                currentSeries_1.points[i].y = currentSeries_1.dataSource[i].y;
                currentSeries_1.points[i].color = tempcolor[i];
                currentSeries_1.sumOfPoints += currentSeries_1.dataSource[i].y;
            }
            this.redraw = this.enableAnimation;
            this.animateSeries = false;
            this.calculateBounds();
            this.renderElements();
        }
        else {
            for (var i = 0; i < currentSeries.points.length; i++) {
                currentSeries.points[i].y = currentSeries.dataSource[i][currentSeries.yName];
                currentSeries.points[i].color = currentSeries.dataSource[i][currentSeries.pointColorMapping] != null
                    ? currentSeries.dataSource[i][currentSeries.pointColorMapping] : currentSeries.points[i].color;
                currentSeries.sumOfPoints += currentSeries.dataSource[i][currentSeries.yName];
            }
            this.redraw = this.enableAnimation;
            this.animateSeries = false;
            this.removeSvg();
            this.refreshPoints(currentSeries.points);
            this.renderElements();
        }
    };
    Object.defineProperty(AccumulationChart.prototype, "type", {
        /**
         * Gets the type of accumulation chart.
         *
         * @returns {AccumulationType} - The type of accumulation chart.
         * @private
         * */
        get: function () {
            if (this.series && this.series.length) {
                return this.series[0].type;
            }
            return 'Pie';
        },
        enumerable: true,
        configurable: true
    });
    // accumulation chart methods.
    /**
     * To create svg object, renderer and binding events for the container.
     *
     * @returns {void}
     */
    AccumulationChart.prototype.preRender = function () {
        var blazor = 'Blazor';
        this.isBlazor = window[blazor];
        this.allowServerDataBinding = false;
        this.unWireEvents();
        this.setCulture();
        this.animateSeries = true;
        if (this.element.id === '') {
            var collection = document.getElementsByClassName('e-accumulationchart').length;
            this.element.id = 'acc_chart_' + this.chartid + '_' + collection;
        }
        this.wireEvents();
        this.element.setAttribute('dir', this.enableRtl ? 'rtl' : 'ltr');
        this.element.style.outline = 'none';
    };
    /**
     * Themeing for chart goes here.
     *
     * @returns {void}
     */
    AccumulationChart.prototype.setTheme = function () {
        /** Set theme for accumulation chart */
        this.themeStyle = getThemeColor(this.theme, false, this);
    };
    /**
     * To render the accumulation chart elements.
     *
     * @returns {void}
     */
    AccumulationChart.prototype.render = function () {
        var _this = this;
        if (this.element.className.indexOf('e-accumulationchart') === -1) {
            this.element.classList.add('e-accumulationchart');
        }
        this.element.setAttribute('role', this.accessibility.accessibilityRole ? this.accessibility.accessibilityRole : 'region');
        this.element.setAttribute('tabindex', this.accessibility.focusable ? String(this.accessibility.tabIndex) : '-1');
        this.element.setAttribute('aria-label', this.accessibility.accessibilityDescription ? this.accessibility.accessibilityDescription : this.title + '. Syncfusion interactive chart.');
        this.element.setAttribute('class', this.element.getAttribute('class') + ' e-accumulationchart-focused');
        var loadEventData = {
            chart: this.isBlazor ? {} : this,
            accumulation: this.isBlazor ? {} : this,
            theme: this.theme, name: load, cancel: false
        };
        this.trigger(load, loadEventData, function () {
            _this.theme = _this.isBlazor ? loadEventData.theme : _this.theme;
            _this.setTheme();
            _this.accBaseModule = new AccumulationBase(_this);
            _this.pieSeriesModule = new PieSeries(_this);
            _this.calculateVisibleSeries();
            _this.processData();
            _this.renderComplete();
            _this.allowServerDataBinding = true;
        });
    };
    /**
     * Method to unbind events for accumulation chart.
     *
     * @returns {void}
     */
    AccumulationChart.prototype.unWireEvents = function () {
        /** Find the Events type */
        var isIE11Pointer = Browser.isPointer;
        var start = Browser.touchStartEvent;
        var move = Browser.touchMoveEvent;
        var stop = Browser.touchEndEvent;
        var cancel = isIE11Pointer ? 'pointerleave' : 'mouseleave';
        /** UnBind the Event handler */
        EventHandler.remove(this.element, move, this.accumulationMouseMove);
        EventHandler.remove(this.element, stop, this.accumulationMouseEnd);
        EventHandler.remove(this.element, start, this.accumulationMouseStart);
        EventHandler.remove(this.element, 'click', this.accumulationOnMouseClick);
        EventHandler.remove(this.element, 'dblclick', this.accumulationOnDoubleClick);
        EventHandler.remove(this.element, 'contextmenu', this.accumulationRightClick);
        EventHandler.remove(this.element, cancel, this.accumulationMouseLeave);
        EventHandler.remove(this.element, 'keydown', this.accumulationChartKeyDown);
        EventHandler.remove(document.body, 'keydown', this.documentKeyHandler);
        EventHandler.remove(this.element, 'keyup', this.accumulationChartKeyUp);
        window.removeEventListener((Browser.isTouch && ('orientation' in window && 'onorientationchange' in window)) ? 'orientationchange' : 'resize', this.accumulationResizeBound);
    };
    /**
     * Method to bind events for the accumulation chart.
     *
     * @returns {void}
     */
    AccumulationChart.prototype.wireEvents = function () {
        /**
         * To fix react timeout destroy issue.
         */
        if (!this.element) {
            return;
        }
        /** Find the Events type */
        var isIE11Pointer = Browser.isPointer;
        var start = Browser.touchStartEvent;
        var stop = Browser.touchEndEvent;
        var move = Browser.touchMoveEvent;
        var cancel = isIE11Pointer ? 'pointerleave' : 'mouseleave';
        /** Bind the Event handler */
        EventHandler.add(this.element, move, this.accumulationMouseMove, this);
        EventHandler.add(this.element, stop, this.accumulationMouseEnd, this);
        EventHandler.add(this.element, start, this.accumulationMouseStart, this);
        EventHandler.add(this.element, 'click', this.accumulationOnMouseClick, this);
        EventHandler.add(this.element, 'dblclick', this.accumulationOnDoubleClick, this);
        EventHandler.add(this.element, 'contextmenu', this.accumulationRightClick, this);
        EventHandler.add(this.element, cancel, this.accumulationMouseLeave, this);
        EventHandler.add(this.element, 'keydown', this.accumulationChartKeyDown, this);
        EventHandler.add(document.body, 'keydown', this.documentKeyHandler, this);
        EventHandler.add(this.element, 'keyup', this.accumulationChartKeyUp, this);
        this.accumulationResizeBound = this.accumulationResize.bind(this);
        window.addEventListener((Browser.isTouch && ('orientation' in window && 'onorientationchange' in window)) ? 'orientationchange' : 'resize', this.accumulationResizeBound);
        new Touch(this.element); // To avoid geasture blocking for browser
        /** Apply the style for chart */
        this.setStyle(this.element);
    };
    /**
     * Method to set mouse x, y from events.
     *
     * @param {PointerEvent} e - The pointer event containing mouse coordinates.
     * @returns {void}
     */
    AccumulationChart.prototype.setMouseXY = function (e) {
        var pageX;
        var pageY;
        var svgRectElement = getElement(this.element.id + '_svg');
        if (svgRectElement && this.element) {
            var svgRect = svgRectElement.getBoundingClientRect();
            var rect = this.element.getBoundingClientRect();
            if (e.type.indexOf('touch') > -1) {
                this.isTouch = true;
                var touchArg = e;
                pageY = touchArg.changedTouches[0].clientY;
                pageX = touchArg.changedTouches[0].clientX;
            }
            else {
                this.isTouch = e.pointerType === 'touch' || e.pointerType === '2';
                pageX = e.clientX;
                pageY = e.clientY;
            }
            this.mouseY = (pageY - rect.top) - Math.max(svgRect.top - rect.top, 0);
            this.mouseX = (pageX - rect.left) - Math.max(svgRect.left - rect.left, 0);
        }
    };
    /**
     * Handles the mouse end.
     *
     * @param {PointerEvent} e - The pointer event containing mouse coordinates.
     * @returns {boolean} - Mouse end of accumulation chart.
     * @private
     */
    AccumulationChart.prototype.accumulationMouseEnd = function (e) {
        this.setMouseXY(e);
        this.trigger(chartMouseUp, { target: e.target.id, x: this.mouseX, y: this.mouseY });
        if (this.isTouch) {
            this.titleTooltip(e, this.mouseX, this.mouseY, this.isTouch);
            if (this.accumulationDataLabelModule && this.visibleSeries[0].dataLabel.visible) {
                this.accumulationDataLabelModule.move(e, this.mouseX, this.mouseY, this.isTouch);
            }
            if (this.accumulationLegendModule && this.legendSettings.visible) {
                this.accumulationLegendModule.move(e);
            }
        }
        if (this.centerLabel.hoverTextFormat) {
            this.updateCenterLabel(e);
        }
        this.notify(Browser.touchEndEvent, e);
        return false;
    };
    /*public removeSvgOffset(x: number, y: number): ChartLocation {
        let rect: ClientRect = this.element.getBoundingClientRect();
        let svgRect: ClientRect = getElement(this.element.id + '_svg').getBoundingClientRect();
        return { x: (x - rect.left) - Math.max(svgRect.left - rect.left, 0), y: (y - rect.top) - Math.max(svgRect.top - rect.top, 0)};
    }*/
    /**
     * Handles the mouse start.
     *
     * @param {PointerEvent} e - The pointer event containing mouse coordinates.
     * @returns {boolean} - Mouse start of accumulation chart.
     * @private
     */
    AccumulationChart.prototype.accumulationMouseStart = function (e) {
        this.setMouseXY(e);
        this.trigger(chartMouseDown, { target: e.target.id, x: this.mouseX, y: this.mouseY });
        return false;
    };
    /**
     * Handles the accumulation chart resize.
     *
     * @returns {boolean} - Resize method of accumulation chart.
     * @private
     */
    AccumulationChart.prototype.accumulationResize = function () {
        var _this = this;
        this.animateSeries = false;
        var args = {
            accumulation: this.isBlazor ? {} : this,
            previousSize: new Size(this.availableSize.width, this.availableSize.height),
            name: resized,
            currentSize: new Size(0, 0),
            chart: this.isBlazor ? {} : this
        };
        var beforeResizeArgs = { name: 'beforeResize', cancelResizedEvent: false };
        if (this.resizeTo) {
            clearTimeout(this.resizeTo);
        }
        this.trigger(beforeResize, beforeResizeArgs);
        if (!beforeResizeArgs.cancelResizedEvent) {
            this.resizeTo = +setTimeout(function () {
                if (_this.isDestroyed) {
                    clearTimeout(_this.resizeTo);
                    return;
                }
                calculateSize(_this);
                args.currentSize = _this.availableSize;
                _this.trigger(resized, args);
                _this.refreshSeries();
                _this.refreshChart();
            }, 500);
        }
        return false;
    };
    /**
     * Handles the print method for accumulation chart control.
     *
     * @param {string[] | string | Element} id - The id of the accumulation chart to be printed on the page.
     * @returns {void}
     */
    AccumulationChart.prototype.print = function (id) {
        // To handle the print funtion in IE and Edge browsers
        var clippath = document.getElementById(this.element.id + '_Series_0').style.clipPath;
        document.getElementById(this.element.id + '_Series_0').style.clipPath = '';
        var exportChart = new PrintUtils(this);
        exportChart.print(id);
        document.getElementById(this.element.id + '_Series_0').style.clipPath = clippath;
    };
    /**
     * Export method for the chart.
     *
     * @param {ExportType} type - The type of export.
     * @param {string} fileName - The name of the file for export.
     * @returns {void}
     */
    AccumulationChart.prototype.export = function (type, fileName) {
        if (this.exportModule) {
            this.exportModule.export(type, fileName);
            if (this.afterExport) {
                this.exportModule.getDataUrl(this);
            }
        }
    };
    /**
     * Applying styles for accumulation chart element.
     *
     * @param {HTMLElement} element - Specifies the element.
     * @returns {void}
     */
    AccumulationChart.prototype.setStyle = function (element) {
        element.style.touchAction = 'element';
        element.style.msTouchAction = 'element';
        element.style.msContentZooming = 'none';
        element.style.msUserSelect = 'none';
        element.style.webkitUserSelect = 'none';
        element.style.position = 'relative';
        element.style.display = 'block';
        element.style.height = (element.style.height || (this.height && this.height.indexOf('%') === -1)) ? element.style.height : 'inherit';
        var tabColor = '';
        switch (this.theme) {
            case 'HighContrastLight':
            case 'HighContrast':
                tabColor = '#969696';
                break;
            case 'MaterialDark':
            case 'FabricDark':
            case 'Bootstrap':
            case 'Bootstrap4':
                tabColor = '#66afe9';
                break;
            case 'Tailwind':
            case 'TailwindDark':
                tabColor = '#4f46e5';
                break;
            case 'Bootstrap5':
            case 'Bootstrap5Dark':
                tabColor = '#0d6efd';
                break;
            case 'Fluent':
            case 'FluentDark':
                tabColor = '#9e9e9e';
                break;
            case 'Fluent2':
            case 'Fluent2Dark':
            case 'Fluent2HighContrast':
                tabColor = '#0078D4';
                break;
            default:
                tabColor = '#9e9e9e';
                break;
        }
    };
    /**
     * Method to set the annotation content dynamically for accumulation.
     *
     * @param {number} annotationIndex - The index of the annotation.
     * @param {string} content - The content to set for the annotation.
     * @returns {void}
     */
    AccumulationChart.prototype.setAnnotationValue = function (annotationIndex, content) {
        var annotation = this.annotations[annotationIndex];
        var element;
        var parentNode = getElement(this.element.id + '_Annotation_Collections');
        if (content) {
            annotation.content = content;
            if (parentNode) {
                element = this.createElement('div');
                removeElement(this.element.id + '_Annotation_' + annotationIndex);
                this.annotationModule.processAnnotation(annotation, annotationIndex, element);
                parentNode.appendChild(element.children[0]);
            }
            else {
                this.annotationModule.renderAnnotations(getElement(this.element.id + '_Secondary_Element'));
            }
        }
    };
    /**
     * Handles the mouse move on accumulation chart.
     *
     * @param {PointerEvent} e - The pointer event containing mouse coordinates.
     * @returns {boolean} - Mouse move of accumulation chart.
     * @private
     */
    AccumulationChart.prototype.accumulationMouseMove = function (e) {
        if (!getElement(this.element.id + '_svg')) {
            return false;
        }
        this.setMouseXY(e);
        this.trigger(chartMouseMove, { target: e.target.id, x: this.mouseX, y: this.mouseY });
        if (this.pointMove) {
            this.triggerPointEvent(pointMove, e.target, e);
        }
        if (this.accumulationLegendModule && this.legendSettings.visible) {
            this.accumulationLegendModule.move(e);
        }
        if (this.accumulationDataLabelModule && this.visibleSeries[0] && this.visibleSeries[0].dataLabel.visible) {
            this.accumulationDataLabelModule.move(e, this.mouseX, this.mouseY);
        }
        if (this.centerLabel.hoverTextFormat) {
            this.updateCenterLabel(e);
        }
        if (!this.isTouch) {
            this.titleTooltip(e, this.mouseX, this.mouseY);
        }
        if (this.enableBorderOnMouseMove && this.type === 'Pie' && this.pieSeriesModule &&
            withInBounds(this.mouseX, this.mouseY, this.initialClipRect)) {
            this.pieSeriesModule.findSeries(e, this.series[0].borderRadius);
        }
        this.notify(Browser.touchMoveEvent, e);
        return false;
    };
    AccumulationChart.prototype.titleTooltip = function (event, x, y, isTouch) {
        var targetId = event.target.id;
        var id = (targetId === (this.element.id + '_title') || targetId === (this.element.id + '_subTitle') ||
            targetId === (this.element.id + '_chart_legend_title'));
        if ((event.target.textContent.indexOf('...') > -1) && id) {
            var title = (targetId === (this.element.id + '_title')) ?
                this.title : (targetId === (this.element.id + '_subTitle')) ? this.subTitle : this.legendSettings.title;
            showTooltip(title, x, y, this.element.offsetWidth, this.element.id + '_EJ2_Title_Tooltip', getElement(this.element.id + '_Secondary_Element'), isTouch);
        }
        else {
            removeElement(this.element.id + '_EJ2_Title_Tooltip');
        }
    };
    /**
     * Handles the keyboard onkeydown on chart.
     *
     * @param {KeyboardEvent} e - The keyboard event.
     * @returns {boolean} - false
     * @private
     */
    AccumulationChart.prototype.accumulationChartKeyDown = function (e) {
        var actionKey = '';
        if (this.tooltip.enable && ((e.code === 'Tab' && this.previousTargetId.indexOf('Series') > -1) || e.code === 'Escape')) {
            actionKey = 'ESC';
        }
        if (e.code.indexOf('Arrow') > -1) {
            e.preventDefault();
        }
        if (e.ctrlKey && (e.key === 'p')) {
            e.preventDefault();
            actionKey = 'CtrlP';
        }
        if (actionKey !== '') {
            this.chartKeyboardNavigations(e, e.target.id, actionKey);
        }
        if (e.code === 'Tab') {
            this.removeNavigationStyle();
        }
        return false;
    };
    /**
     * Handles the keyboard onkeydown on chart.
     *
     * @param {KeyboardEvent} e - The keyboard event.
     * @returns {boolean} - false
     * @private
     */
    AccumulationChart.prototype.accumulationChartKeyUp = function (e) {
        var actionKey = '';
        var targetId = e.target['id'];
        var legendElement = getElement(this.element.id + '_chart_legend_translate_g');
        var pagingElement = getElement(this.element.id + '_chart_legend_pageup');
        if (legendElement) {
            var firstChild = legendElement.firstElementChild;
            var className = firstChild.getAttribute('class');
            if (className && className.indexOf('e-accumulationchart-focused') === -1) {
                className = className + ' e-accumulationchart-focused';
            }
            else if (!className) {
                className = 'e-accumulationchart-focused';
            }
            firstChild.setAttribute('class', className);
        }
        if (pagingElement) {
            pagingElement.setAttribute('class', 'e-accumulationchart-focused');
        }
        this.removeNavigationStyle();
        if (e.code === 'Tab') {
            if (this.previousTargetId !== '') {
                if (this.previousTargetId.indexOf('_Point_') > -1 && targetId.indexOf('_Point_') === -1) {
                    var groupElement = document.getElementById(this.previousTargetId).parentElement;
                    this.setTabIndex(groupElement.children[this.currentPointIndex], groupElement.firstElementChild);
                    this.currentPointIndex = 0;
                }
                else if (this.previousTargetId.indexOf('_chart_legend_page') > -1 && targetId.indexOf('_chart_legend_page') === -1 &&
                    targetId.indexOf('_chart_legend_g_') === -1) {
                    this.setTabIndex(e.target, pagingElement);
                }
                else if (this.previousTargetId.indexOf('_chart_legend_g_') > -1 && targetId.indexOf('chart_legend_g_') === -1 && legendElement) {
                    this.setTabIndex(legendElement.children[this.currentLegendIndex], legendElement.firstElementChild);
                }
            }
            this.previousTargetId = targetId;
            if (targetId.indexOf('_chart_legend_g_') > -1 && this.highlightMode !== 'None') {
                targetId = e.target['lastElementChild'].id;
                actionKey = 'Tab';
            }
            else if (targetId.indexOf('_Point_') > -1 && (this.highlightMode !== 'None' || this.tooltip.enable)) {
                actionKey = 'Tab';
            }
        }
        else if (e.code.indexOf('Arrow') > -1) {
            e.preventDefault();
            if (targetId.indexOf('_chart_legend_page') > -1) {
                e.target.removeAttribute('tabindex');
                this.previousTargetId = targetId = this.element.id + '_chart_legend_page' + (e.code === 'ArrowRight' ? 'up' : 'down');
                this.focusTarget(getElement(targetId));
            }
            else if ((targetId.indexOf('_chart_legend_') > -1) && legendElement) {
                e.target.removeAttribute('tabindex');
                this.currentLegendIndex += (e.code === 'ArrowUp' || e.code === 'ArrowRight') ? +1 : -1;
                this.currentLegendIndex = this.getActualIndex(this.currentLegendIndex, legendElement.children.length);
                var currentLegend = legendElement.children[this.currentLegendIndex];
                this.focusTarget(currentLegend);
                this.removeNavigationStyle();
                this.setNavigationStyle(currentLegend.id);
                this.previousTargetId = targetId = currentLegend.lastElementChild.id;
                actionKey = this.highlightMode !== 'None' ? 'ArrowMove' : '';
            }
            else if (targetId.indexOf('_Point_') > -1) {
                e.target.setAttribute('tabindex', '-1');
                this.currentPointIndex += (e.code === 'ArrowUp' || e.code === 'ArrowRight') ? +1 : -1;
                var totalLength = 0;
                for (var i = 0; i < e.target['parentElement'].children.length; i++) {
                    totalLength = e.target['parentElement'].children[i].id.indexOf('_Point_') > -1 ? totalLength + 1 : totalLength;
                }
                this.currentPointIndex = this.getActualIndex(this.currentPointIndex, totalLength);
                targetId = this.element.id + '_Series_0_Point_' + this.currentPointIndex;
                this.focusTarget(getElement(targetId));
                this.removeNavigationStyle();
                this.setNavigationStyle(targetId);
                actionKey = this.tooltip.enable ? 'ArrowMove' : '';
            }
        }
        else if ((e.code === 'Enter' || e.code === 'Space') && ((targetId.indexOf('_chart_legend_') > -1) ||
            (targetId.indexOf('_Point_') > -1))) {
            targetId = (targetId.indexOf('_chart_legend_g') > -1) ? e.target['lastElementChild'].id : targetId;
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
    AccumulationChart.prototype.setTabIndex = function (previousElement, currentElement) {
        if (previousElement) {
            previousElement.removeAttribute('tabindex');
        }
        if (currentElement) {
            currentElement.setAttribute('tabindex', '0');
        }
    };
    AccumulationChart.prototype.getActualIndex = function (index, totalLength) {
        return index > totalLength - 1 ? 0 : (index < 0 ? totalLength - 1 : index);
    };
    AccumulationChart.prototype.focusTarget = function (element) {
        var className = element.getAttribute('class');
        element.setAttribute('tabindex', '0');
        if (className && className.indexOf('e-accumulationchart-focused') === -1) {
            className = className + ' e-accumulationchart-focused';
        }
        else if (!className) {
            className = 'e-accumulationchart-focused';
        }
        element.setAttribute('tabindex', '0');
        element.setAttribute('class', className);
        element.focus();
        return element.id;
    };
    /**
     * Handles the document onkey.
     *
     * @param {KeyboardEvent} e - The keyboard event.
     * @returns {void}
     * @private
     */
    AccumulationChart.prototype.documentKeyHandler = function (e) {
        // 74 - J
        if (e.altKey && e.keyCode === 74 && !isNullOrUndefined(this.element)) {
            this.element.focus();
        }
    };
    /**
     * Handles to set style for key event on the document.
     *
     * @param {target} target - element which currently focused.
     * @returns {void}
     * @private
     */
    AccumulationChart.prototype.setNavigationStyle = function (target) {
        var currentElement = document.getElementById(target);
        if (currentElement) {
            currentElement.style.setProperty('outline', this.focusBorderWidth + "px solid " + (this.focusBorderColor || this.themeStyle.tabColor));
            currentElement.style.setProperty('margin', this.focusBorderMargin + "px");
        }
    };
    /**
     * Handles to remove style for key event on the document.
     *
     * @returns {void}
     * @private
     */
    AccumulationChart.prototype.removeNavigationStyle = function () {
        var currentElement = document.querySelectorAll("path[id*=_Series_0_Point_], [id*=" + this.element.id + "], [id*=_ChartBorder], text[id*=_title],g[id*=_chart_legend]");
        if (currentElement) {
            currentElement.forEach(function (element) {
                if (element instanceof HTMLElement || element instanceof SVGElement) {
                    element.style.setProperty('outline', 'none');
                    element.style.setProperty('margin', '');
                }
            });
        }
    };
    AccumulationChart.prototype.chartKeyboardNavigations = function (e, targetId, actionKey) {
        this.isLegendClicked = false;
        switch (actionKey) {
            case 'Tab':
            case 'ArrowMove':
                if (this.accumulationHighlightModule) {
                    //  this.accumulationHighlightModule.removeHighlightElements();
                }
                if (targetId.indexOf('_Point_') > -1) {
                    var seriesIndex = +(targetId.split('_Series_')[1].split('_Point_')[0]);
                    var pointIndex = +(targetId.split('_Series_')[1].replace('_Symbol', '').split('_Point_')[1]);
                    var pointRegion = this.visibleSeries[seriesIndex].points[pointIndex].symbolLocation;
                    this.mouseX = pointRegion.x + this.initialClipRect.x;
                    this.mouseY = pointRegion.y + this.initialClipRect.y;
                    if (this.accumulationHighlightModule) {
                        var targetElement = getElement(targetId);
                        if (!isNullOrUndefined(targetElement)) {
                            if (targetElement.id.indexOf('text') > 1) {
                                targetElement = getElement(targetElement.id.replace('text', 'shape'));
                            }
                            if ((targetElement).hasAttribute('class') && (targetElement).getAttribute('class').indexOf('highlight') > -1) {
                                return;
                            }
                            this.accumulationHighlightModule.calculateSelectedElements(this, targetElement, 'mousemove');
                            return;
                        }
                    }
                    if (this.accumulationTooltipModule) {
                        var series = this.visibleSeries[seriesIndex];
                        var data = void 0;
                        if (series.enableTooltip) {
                            data = new AccPointData(series.points[pointIndex], series);
                        }
                        this.accumulationTooltipModule.renderSeriesTooltip(this, data);
                    }
                }
                if (this.accumulationHighlightModule && this.highlightMode !== 'None') {
                    targetId = targetId.indexOf('_chart_legend_g_') > -1 ? document.getElementById(targetId).firstChild['id'] : targetId;
                    var legendID = this.element.id + '_chart_legend';
                    var legendItemsId = [legendID + '_text_', legendID + '_shape_marker_',
                        legendID + '_shape_'];
                    for (var i = 0; i < legendItemsId.length; i++) {
                        var id = legendItemsId[i];
                        if (targetId.indexOf(id) > -1) {
                            document.getElementById(targetId).setAttribute('class', '');
                            this.accumulationHighlightModule.legendSelection(this, 0, parseInt(targetId.split(id)[1], 10), getElement(targetId), 'mousemove');
                            break;
                        }
                    }
                }
                break;
            case 'Enter':
            case 'Space':
                if (targetId.indexOf('_chart_legend_') > -1 && this.accumulationLegendModule) {
                    this.isLegendClicked = true;
                    this.accumulationLegendModule.click(e);
                    this.focusChild(document.getElementById(targetId).parentElement);
                    this.setNavigationStyle(document.getElementById(targetId).parentElement.id);
                }
                else {
                    if (this.accumulationSelectionModule) {
                        this.accumulationSelectionModule.calculateSelectedElements(this, document.getElementById(targetId), 'click');
                    }
                    this.setNavigationStyle(targetId);
                }
                break;
            case 'CtrlP':
                this.print();
                break;
            case 'ESC':
                if (this.accumulationTooltipModule) {
                    this.accumulationTooltipModule.removeTooltip(1);
                }
                break;
        }
    };
    AccumulationChart.prototype.focusChild = function (element) {
        element.setAttribute('tabindex', '0');
        var className = element.getAttribute('class');
        element.setAttribute('tabindex', '0');
        if (className && className.indexOf('e-accumulationchart-focused') === -1) {
            className = 'e-accumulationchart-focused ' + className;
        }
        else if (!className) {
            className = 'e-accumulationchart-focused';
        }
        element.setAttribute('class', className);
        element.focus();
        return element.id;
    };
    /**
     * Handles the mouse double click on accumulation chart.
     *
     * @param {PointerEvent} e - The pointer event.
     * @returns {boolean} - Mouse double click of accumulation chart.
     * @private
     */
    AccumulationChart.prototype.accumulationOnDoubleClick = function (e) {
        this.trigger(chartDoubleClick, { target: e.target.id, x: this.mouseX, y: this.mouseY });
        return false;
    };
    /**
     * Handles the mouse click on accumulation chart.
     *
     * @param {PointerEvent} e - The pointer event.
     * @returns {boolean} - Mouse click of accumulation chart.
     * @private
     */
    AccumulationChart.prototype.accumulationOnMouseClick = function (e) {
        this.setMouseXY(e);
        if (this.accumulationLegendModule && this.legendSettings.visible) {
            this.accumulationLegendModule.click(e);
        }
        if (this.selectionMode !== 'None' && this.accumulationSelectionModule) {
            this.accumulationSelectionModule.calculateSelectedElements(this, e.target, e.type);
        }
        if (this.visibleSeries[0].explode) {
            this.accBaseModule.processExplode(e);
        }
        if (this.enableBorderOnMouseMove && this.pieSeriesModule && this.type === 'Pie') {
            this.pieSeriesModule.findSeries(e, this.series[0].borderRadius);
        }
        this.trigger(chartMouseClick, { target: e.target.id, x: this.mouseX, y: this.mouseY });
        if (this.pointClick) {
            this.triggerPointEvent(pointClick, e.target, e);
        }
        this.removeNavigationStyle();
        return false;
    };
    AccumulationChart.prototype.triggerPointEvent = function (event, element, e) {
        var evt = e;
        var indexes = indexFinder(element.id, true);
        if (indexes.series >= 0 && indexes.point >= 0) {
            this.trigger(event, {
                series: this.isBlazor ? {} : this.series[indexes.series],
                point: this.series[indexes.series].points[indexes.point],
                seriesIndex: indexes.series, pointIndex: indexes.point,
                x: this.mouseX, y: this.mouseY, pageX: evt.pageX, pageY: evt.pageY
            });
        }
    };
    /**
     * Handles the mouse right click on accumulation chart.
     *
     * @param {MouseEvent | PointerEvent} event - The mouse event or pointer event.
     * @returns {boolean} - Right click of accumulation chart.
     * @private
     */
    AccumulationChart.prototype.accumulationRightClick = function (event) {
        if (event.buttons === 2 && event.pointerType === 'touch') {
            event.preventDefault();
            event.stopPropagation();
            return false;
        }
        return true;
    };
    /**
     * Handles the mouse leave on accumulation chart.
     *
     * @param {PointerEvent} e - The pointer event.
     * @returns {boolean} - Mouse leave of accumulation chart.
     * @private
     */
    AccumulationChart.prototype.accumulationMouseLeave = function (e) {
        this.setMouseXY(e);
        this.trigger(chartMouseLeave, { target: e.target.id, x: this.mouseX, y: this.mouseY });
        this.notify(Browser.isPointer ? 'pointerleave' : 'mouseleave', e);
        var borderElement = document.getElementById(this.element.id + 'PointHover_Border');
        if (borderElement) {
            this.pieSeriesModule.removeBorder(borderElement, 1000);
            borderElement = null;
        }
        return false;
    };
    /**
     * Method to set culture for chart.
     *
     * @returns {void}
     */
    AccumulationChart.prototype.setCulture = function () {
        this.intl = new Internationalization();
    };
    /**
     * Method to create SVG element for accumulation chart.
     *
     * @returns {void}
     */
    AccumulationChart.prototype.createPieSvg = function () {
        this.removeSvg();
        createSvg(this);
    };
    /**
     * To Remove the SVG from accumulation chart.
     *
     * @returns {boolean} - Remove svg.
     * @private
     */
    AccumulationChart.prototype.removeSvg = function () {
        if (this.redraw) {
            return null;
        }
        blazorTemplatesReset(this);
        removeElement(this.element.id + '_Secondary_Element');
        if (this.svgObject) {
            while (this.svgObject.childNodes.length > 0) {
                this.svgObject.removeChild(this.svgObject.firstChild);
            }
            if (!this.svgObject.hasChildNodes() && this.svgObject.parentNode) {
                remove(this.svgObject);
            }
        }
        removeElement('EJ2_legend_tooltip');
        removeElement('EJ2_datalabel_tooltip');
        removeElement(this.element.id + 'PointHover_Border');
    };
    /**
     * Method to create the secondary element for tooltip, datalabel and annotaitons.
     *
     * @returns {void}
     */
    AccumulationChart.prototype.createSecondaryElement = function () {
        var element = redrawElement(this.redraw, this.element.id + '_Secondary_Element') ||
            this.createElement('div', {
                id: this.element.id + '_Secondary_Element',
                styles: 'position: relative'
            });
        appendChildElement(false, this.element, element, this.redraw);
    };
    /**
     * Method to find visible series based on series types.
     *
     * @returns {void}
     */
    AccumulationChart.prototype.calculateVisibleSeries = function () {
        this.visibleSeries = [];
        for (var i = 0, length_1 = this.series.length; i < length_1; i++) {
            this.series[i].index = i;
            if (this.series[i].type === this.type && this.visibleSeries.length === 0) {
                this.visibleSeries.push(this.series[i]);
                break;
            }
        }
    };
    /**
     * To find points from dataSource.
     *
     * @param {boolean} render - Indicates whether to render the points (default: true).
     * @returns {void}
     */
    AccumulationChart.prototype.processData = function (render) {
        if (render === void 0) { render = true; }
        this.seriesCounts = 0;
        for (var _i = 0, _a = this.visibleSeries; _i < _a.length; _i++) {
            var series = _a[_i];
            series.dataModule = new Data(series.dataSource || this.dataSource, series.query);
            series.refreshDataManager(this, render);
        }
    };
    /**
     * To refresh the accumulation chart.
     *
     * @private
     * @returns {void}
     */
    AccumulationChart.prototype.refreshChart = function () {
        this.doGrouppingProcess();
        this.createPieSvg();
        this.calculateBounds();
        this.renderElements();
        removeElement('chartmeasuretext');
    };
    /**
     * Method to find groupped points.
     *
     * @returns {void}
     */
    AccumulationChart.prototype.doGrouppingProcess = function () {
        var series = this.visibleSeries[0];
        if (!isNullOrUndefined(series.resultData) && ((!isNullOrUndefined(series.lastGroupTo) &&
            series.lastGroupTo !== series.groupTo))) {
            series.getPoints(series.resultData, this);
        }
    };
    /**
     * Method to calculate bounds for accumulation chart.
     *
     * @returns {void}
     */
    AccumulationChart.prototype.calculateBounds = function () {
        this.initialClipRect = new Rect(this.margin.left, this.margin.top, this.availableSize.width, this.availableSize.height);
        this.titleCollection = [];
        this.subTitleCollection = [];
        var titleHeight = 0;
        var subTitleHeight = 0;
        var maxWidth = 0;
        var titleWidth = 0;
        if (this.title) {
            this.titleCollection = getTitle(this.title, this.titleStyle, this.initialClipRect.width, this.enableRtl, this.themeStyle.chartTitleFont);
        }
        titleHeight = this.title ? measureText(this.title, this.titleStyle, this.themeStyle.chartTitleFont).height * this.titleCollection.length : titleHeight;
        if (this.subTitle) {
            for (var _i = 0, _a = this.titleCollection; _i < _a.length; _i++) {
                var titleText = _a[_i];
                titleWidth = measureText(titleText, this.titleStyle, this.themeStyle.chartSubTitleFont).width;
                maxWidth = titleWidth > maxWidth ? titleWidth : maxWidth;
            }
            this.subTitleCollection = getTitle(this.subTitle, this.subTitleStyle, this.initialClipRect.width, this.enableRtl, this.themeStyle.chartSubTitleFont);
            subTitleHeight = (measureText(this.subTitle, this.subTitleStyle, this.themeStyle.chartSubTitleFont).height * this.subTitleCollection.length);
        }
        var left = this.margin.left + this.border.width;
        var width = this.availableSize.width - left - this.margin.right - this.border.width;
        var top = this.margin.top + this.border.width;
        var height = this.availableSize.height - top - this.border.width - this.margin.bottom;
        var marginTotal = subTitleHeight + titleHeight;
        switch (this.titleStyle.position) {
            case 'Top':
                left = 0;
                top = subTitleHeight + titleHeight;
                width = this.margin.right + this.margin.left;
                height = this.margin.bottom + this.margin.top;
                break;
            case 'Bottom':
                height -= (marginTotal + this.margin.bottom * 2);
                break;
            case 'Left':
                left += marginTotal;
                width -= marginTotal;
                break;
            case 'Right':
                width -= marginTotal;
                break;
        }
        if (this.titleStyle.position !== 'Top') {
            this.initialClipRect = new Rect(left, top, width, height);
        }
        else {
            this.initialClipRect = subtractRect(this.initialClipRect, new Rect(left, top, width, height));
        }
        this.calculateLegendBounds();
    };
    /**
     * Method to calculate legend bounds for accumulation chart.
     *
     * @returns {void}
     */
    AccumulationChart.prototype.calculateLegendBounds = function () {
        if (!this.accumulationLegendModule || !this.legendSettings.visible) {
            return null;
        }
        this.accumulationLegendModule.getLegendOptions(this, this.visibleSeries);
        this.accumulationLegendModule.calculateLegendBounds(this.initialClipRect, this.availableSize, null);
    };
    /**
     * To render elements for accumulation chart.
     *
     * @private
     * @returns {void}
     */
    AccumulationChart.prototype.renderElements = function () {
        this.renderBorder();
        this.createSecondaryElement();
        this.renderSeries();
        this.renderTitle();
        this.renderCenterLabel(true);
        this.renderLegend();
        appendChildElement(false, this.element, this.svgObject, this.redraw);
        this.processSelection();
        this.processExplode();
        this.renderAnnotation();
        this.setSecondaryElementPosition();
        updateBlazorTemplate(this.element.id + '_DataLabel', 'Template', this.series[0].dataLabel);
        this.trigger('loaded', { accumulation: this.isBlazor ? {} : this, chart: this.isBlazor ? {} : this });
        this.animateSeries = false;
    };
    /**
     * To set the left and top position for data label template for center aligned chart.
     *
     * @private
     * @returns {void}
     */
    AccumulationChart.prototype.setSecondaryElementPosition = function () {
        var tooltipParent = getElement(this.element.id + '_Secondary_Element');
        if (!tooltipParent) {
            return;
        }
        var rect = this.element.getBoundingClientRect();
        var svgRect = getElement(this.element.id + '_svg').getBoundingClientRect();
        tooltipParent.style.left = Math.max(svgRect.left - rect.left, 0) + 'px';
        tooltipParent.style.top = Math.max(svgRect.top - rect.top, 0) + 'px';
    };
    /**
     * To render the annotaitions for accumulation series.
     *
     * @private
     * @returns {void}
     */
    AccumulationChart.prototype.renderAnnotation = function () {
        if (this.annotationModule) {
            this.annotationModule.renderAnnotations(getElement(this.element.id + '_Secondary_Element'));
        }
    };
    /**
     * Method to process the explode in accumulation chart.
     *
     * @private
     * @returns {void}
     */
    AccumulationChart.prototype.processExplode = function () {
        if (this.redraw) {
            return null;
        }
        if (!this.visibleSeries[0].explode) {
            return null;
        }
        this.accBaseModule.invokeExplode();
    };
    /**
     * Method to render series for accumulation chart.
     *
     * @returns {void}
     */
    AccumulationChart.prototype.renderSeries = function () {
        if (!this.redraw) {
            this.svgObject.appendChild(this.renderer.createGroup({ id: this.element.id + '_SeriesCollection' }));
        }
        for (var _i = 0, _a = this.visibleSeries; _i < _a.length; _i++) {
            var series = _a[_i];
            if (series.visible && this[(firstToLowerCase(series.type) + 'SeriesModule')]) {
                this[(firstToLowerCase(series.type) + 'SeriesModule')].initProperties(this, series);
                series.renderSeries(this, this.redraw);
            }
        }
    };
    /**
     * Method to render border for accumulation chart.
     *
     * @returns {void}
     */
    AccumulationChart.prototype.renderBorder = function () {
        var padding = this.border.width;
        var rect = new RectOption(this.element.id + '_border', this.background || this.themeStyle.background, this.border, 1, new Rect(padding / 2, padding / 2, this.availableSize.width - padding, this.availableSize.height - padding), 0, 0, '', this.border.dashArray);
        var htmlObject = this.renderer.drawRectangle(rect);
        htmlObject.setAttribute('aria-hidden', 'true');
        appendChildElement(false, this.svgObject, htmlObject, this.redraw);
        // to draw back ground image for accumulation chart
        var backGroundImage = this.backgroundImage;
        if (backGroundImage) {
            var image = new ImageOption(this.availableSize.height - padding, this.availableSize.width - padding, backGroundImage, 0, 0, this.element.id + '_background', 'visible', 'none');
            appendChildElement(false, this.svgObject, this.renderer.drawImage(image), this.redraw);
        }
    };
    /**
     * Method to render legend for accumulation chart.
     *
     * @returns {void}
     */
    AccumulationChart.prototype.renderLegend = function () {
        if (!this.accumulationLegendModule || !this.legendSettings.visible) {
            return null;
        }
        if (this.accumulationLegendModule.legendCollections.length) {
            if (this.visibleSeries[0].type === 'Pie') {
                this.accumulationLegendModule.getSmartLegendLocation(this.visibleSeries[0].labelBound, this.accumulationLegendModule.legendBounds, this.margin);
            }
            this.accumulationLegendModule.renderLegend(this, this.legendSettings, this.accumulationLegendModule.legendBounds, this.redraw);
        }
    };
    /**
     * To process the selection in accumulation chart.
     *
     * @private
     * @returns {void}
     */
    AccumulationChart.prototype.processSelection = function () {
        var selectedDataIndexes = [];
        if (this.accumulationSelectionModule && this.selectionMode !== 'None') {
            selectedDataIndexes = extend([], this.accumulationSelectionModule.selectedDataIndexes, null, true);
            this.accumulationSelectionModule.invokeSelection(this);
        }
        if (this.accumulationHighlightModule && this.highlightMode !== 'None') {
            this.accumulationHighlightModule.invokeHighlight(this);
        }
        if (selectedDataIndexes.length > 0) {
            this.accumulationSelectionModule.selectedDataIndexes = selectedDataIndexes;
            this.accumulationSelectionModule.redrawSelection(this);
        }
    };
    /**
     * To render title for accumulation chart.
     *
     * @returns {void}
     */
    AccumulationChart.prototype.renderTitle = function () {
        var margin = this.margin;
        if (!this.title) {
            return null;
        }
        var textAnchor = getTextAnchor(this.titleStyle.textAlignment, this.enableRtl);
        var titleSize = measureText(this.title, this.titleStyle, this.themeStyle.chartTitleFont);
        var padding = 20;
        var titleHeight = this.margin.top + (titleSize.height * 3 / 4);
        var legendHeight = this.accumulationLegendModule === undefined ? 0 : this.legendSettings.position === 'Top' ?
            this.accumulationLegendModule.legendBounds.height : 0;
        var explode = this.explodeDistance === 0 ? 0 : this.explodeDistance;
        var expodeValue = legendHeight !== 0 ? 0 : explode / 2;
        var rect = new Rect(margin.left, 0, this.availableSize.width - margin.left - margin.right, 0);
        var positionY = this.margin.top + ((titleSize.height) * 3 / 4);
        var positionX = titlePositionX(rect, this.titleStyle || this.themeStyle.chartTitleFont);
        var rotation;
        var alignment = this.titleStyle.textAlignment;
        var subtitleSize = measureText(this.subTitle, this.subTitleStyle, this.themeStyle.chartSubTitleFont);
        switch (this.titleStyle.position) {
            case 'Top':
                positionX = titlePositionX(rect, this.titleStyle);
                positionY = titleHeight;
                break;
            case 'Bottom':
                positionX += textAnchor === 'start' ? this.border.width :
                    textAnchor === 'end' ? this.border.width : 0;
                positionY = this.availableSize.height - this.margin.bottom - subtitleSize.height - (titleSize.height / 2);
                break;
            case 'Left':
                positionX = this.margin.left + ((titleSize.height) * 3 / 4);
                positionY = alignment === 'Near' ? margin.bottom + this.border.width :
                    alignment === 'Far' ? this.availableSize.height - margin.bottom - this.border.width : this.availableSize.height / 2;
                textAnchor = alignment === 'Near' ? 'end' : alignment === 'Far' ? 'start' : 'middle';
                textAnchor = this.enableRtl ? (textAnchor === 'end' ? 'start' : textAnchor === 'start' ? 'end' : textAnchor) : textAnchor;
                rotation = 'rotate(' + -90 + ',' + positionX + ',' + positionY + ')';
                break;
            case 'Right':
                positionX = this.availableSize.width - this.margin.right - ((titleSize.height) * 3 / 4);
                positionY = alignment === 'Near' ? margin.bottom + this.border.width :
                    alignment === 'Far' ? this.availableSize.height - margin.bottom - this.border.width : this.availableSize.height / 2;
                textAnchor = alignment === 'Near' ? 'start' : alignment === 'Far' ? 'end' : 'middle';
                textAnchor = this.enableRtl ? (textAnchor === 'end' ? 'start' : textAnchor === 'start' ? 'end' : textAnchor) : textAnchor;
                rotation = 'rotate(' + 90 + ',' + positionX + ',' + positionY + ')';
                break;
            case 'Custom':
                positionX = this.titleStyle.x;
                positionY = this.titleStyle.y;
                textAnchor = 'middle';
                break;
        }
        var options = new TextOption(this.element.id + '_title', positionX, positionY, textAnchor, this.titleCollection, rotation, 'auto');
        var space = (this.series[0].type === 'Pie' && this.visibleSeries[0].dataLabel.position === 'Outside' && this.visibleSeries[0].dataLabel.connectorStyle.length) ? stringToNumber(this.visibleSeries[0].dataLabel.connectorStyle.length, this.accBaseModule.radius) : 0;
        if (!this.subTitle && (this.series[0].type !== 'Funnel' && this.series[0].type !== 'Pyramid')) {
            options.y = parseInt(this.series[0].radius, 10) >= 80 ? options.y :
                (this.accBaseModule.center.y - this.accBaseModule.radius - padding
                    - titleHeight - legendHeight - expodeValue - space);
            if (this.series[0].type === 'Pie' && (parseInt(this.series[0].radius, 10) < 80 || isNaN(parseInt(this.series[0].radius, 10)))) {
                options.y = options.y < (this.initialClipRect.y - legendHeight) ? (this.initialClipRect.y - legendHeight) : options.y;
            }
        }
        var element = textElement(this.renderer, options, this.titleStyle, this.titleStyle.color || this.themeStyle.chartTitleFont.color, this.svgObject, false, this.redraw, null, null, null, null, null, null, null, null, this.themeStyle.chartTitleFont);
        if (element) {
            element.setAttribute('tabindex', '0');
            element.style.outline = 'none';
            element.parentNode.insertBefore(element, this.svgObject.children && this.svgObject.children[1]);
        }
        if (this.subTitle) {
            this.renderSubTitle(options);
        }
    };
    /**
     * To update center label on mouse move.
     *
     * @param {Event} event - The mouse move event.
     * @returns {void}
     */
    AccumulationChart.prototype.updateCenterLabel = function (event) {
        var data = this.getPieData(event);
        this.format = (data.point == null) ? '' : this.parseFormat(data.point, this.visibleSeries[0], this.centerLabel.hoverTextFormat);
        this.renderCenterLabel();
    };
    /**
     * Function to get pie data on mouse move.
     *
     * @param {PointerEvent | TouchEvent} e - The event object containing mouse or touch coordinates.
     * @returns {AccPointData} - The data of the pie.
     */
    AccumulationChart.prototype.getPieData = function (e) {
        var dataIndex = indexFinder(e.target.id, true);
        if (!isNaN(dataIndex.series)) {
            return new AccPointData(this.visibleSeries[0].points[dataIndex.point], this.visibleSeries[0]);
        }
        return new AccPointData(null, null);
    };
    /**
     * Function to get format of pie data on mouse move.
     *
     * @param {AccPoints} point - The point data.
     * @param {AccumulationSeries} series - The series to which the point belongs.
     * @param {string} format - The format string for the data.
     * @returns {string} - The formatted data.
     */
    AccumulationChart.prototype.parseFormat = function (point, series, format) {
        var value;
        var textValue;
        var regExp = RegExp;
        for (var _i = 0, _a = Object.keys(point); _i < _a.length; _i++) {
            var dataValue = _a[_i];
            value = new regExp('${point' + '.' + dataValue + '}', 'gm');
            format = format.replace(value.source, point[dataValue]);
        }
        for (var _b = 0, _c = Object.keys(Object.getPrototypeOf(series)); _b < _c.length; _b++) {
            var dataValue = _c[_b];
            value = new regExp('${series' + '.' + dataValue + '}', 'gm');
            textValue = series[dataValue];
            format = format.replace(value.source, textValue);
        }
        return format;
    };
    /**
     * To render center label for accumulation chart.
     *
     * @param {boolean} isanimate - Specifies whether to animate the rendering.
     * @param {boolean} pointAnimation - Specifies whether point animation is enabled.
     * @private
     * @returns {void}
     */
    AccumulationChart.prototype.renderCenterLabel = function (isanimate, pointAnimation) {
        var _this = this;
        if (!this.centerLabel.text || this.type !== 'Pie') {
            return null;
        }
        var initialPositions = [];
        if (pointAnimation) {
            var tspanElements_1 = (getElement(this.element.id + '_centerLabel')).querySelectorAll('tspan');
            tspanElements_1.forEach(function (tspan) {
                initialPositions.push({
                    x: tspan.getAttribute('x'),
                    y: tspan.getAttribute('y')
                });
            });
        }
        var series = this.series[0];
        var ypos;
        var getAnchor = getTextAnchor(this.centerLabel.textStyle.textAlignment, this.enableRtl);
        var padding = 10;
        // To get side of square inside the circle , which is considered as maxwidth , d*sqrt(0.5)
        var maxwidth = this.pieSeriesModule.innerRadius ? ((2 * this.pieSeriesModule.innerRadius) * (0.7071067)) :
            ((2 * this.pieSeriesModule.radius) * (0.7071067));
        var labelCollection = (this.format || this.centerLabel.text).split('<br>');
        var centerLabelSize = measureText(labelCollection[0], this.centerLabel.textStyle, this.themeStyle.chartTitleFont);
        var collectionLength = labelCollection.length;
        for (var i = 0; i < collectionLength; i++) {
            var labelSize = measureText(labelCollection[i], this.centerLabel.textStyle, this.themeStyle.chartTitleFont);
            if (labelSize.width > maxwidth) {
                labelCollection.splice.apply(labelCollection, [i, 1].concat((textWrap(labelCollection[i], maxwidth, this.centerLabel.textStyle, this.enableRtl, null, null, this.themeStyle.chartTitleFont))));
            }
        }
        if (centerLabelSize.height * (labelCollection.length) > maxwidth) {
            ypos = this.accBaseModule.center.y + ((centerLabelSize.height + padding) / 2) - (maxwidth / 2);
        }
        else if ((series.startAngle && series.endAngle) && (Math.abs(series.endAngle - series.startAngle) === 180)) {
            ypos = this.accBaseModule.center.y - (centerLabelSize.height * labelCollection.length / 2) +
                ((centerLabelSize.height + padding) / 2) - this.pieSeriesModule.innerRadius / 2 +
                (this.pieSeriesModule.innerRadius ? padding : 0);
            if ((centerLabelSize.height * (labelCollection.length) + this.pieSeriesModule.innerRadius / 2 + padding > maxwidth)) {
                ypos = this.accBaseModule.center.y + ((centerLabelSize.height + padding) / 2) - (maxwidth / 2);
            }
        }
        else {
            ypos = labelCollection.length > 1 ? (this.accBaseModule.center.y - (centerLabelSize.height * labelCollection.length / 2) +
                ((centerLabelSize.height + padding) / 2)) : (this.accBaseModule.center.y + (centerLabelSize.height) / 4);
        }
        var options = new TextOption(this.element.id + '_centerLabel', (((this.series[0].animation.enable && animationMode !== 'Disable') || animationMode === 'Enable') && isanimate) ? this.pieSeriesModule.center.x - 1 : this.pieSeriesModule.center.x, ypos, getAnchor, '', '', 'auto');
        var element = textElement(this.renderer, options, this.centerLabel.textStyle, this.centerLabel.textStyle.color ||
            this.themeStyle.chartTitleFont.color, this.svgObject, false, this.redraw, null, null, null, null, null, null, null, null, this.themeStyle.chartTitleFont);
        var tspanElements = [];
        for (var i = 0; i < labelCollection.length; i++) {
            var tspanOption = { x: options.x, y: options.y + (i * centerLabelSize.height), fill: '' };
            var tspanElement = this.renderer.createTSpan(tspanOption, '');
            tspanElement.style.fontFamily = 'inherit';
            tspanElement.style.fontStyle = 'inherit';
            tspanElement.style.fontSize = 'inherit';
            tspanElement.style.fontWeight = (labelCollection[i].indexOf('<b>') > -1 || labelCollection[i].indexOf('</b>') > -1) ? 'bold' : 'inherit';
            tspanElement.textContent = labelCollection[i].replace(/<\/?b>/g, '');
            element.appendChild(tspanElement);
            tspanElements.push(tspanElement);
        }
        if (pointAnimation) {
            tspanElements.forEach(function (tspanElement, index) {
                _this.animateTspan(tspanElement, Number(initialPositions[index].x), Number(initialPositions[index].y), Number(tspanElement.getAttribute('x')), Number(tspanElement.getAttribute('y')), _this.duration);
            });
        }
        if (isanimate && ((this.series[0].animation.enable && animationMode !== 'Disable') || animationMode === 'Enable') && this.animateSeries) {
            this.centerLabelDelay(element);
        }
    };
    /**
     * Animates the x and y attributes of a tspan element.
     *
     * @param {HTMLElement} element - The tspan element to animate.
     * @param {number} startx - The initial x coordinate of the tspan.
     * @param {number} starty - The initial y coordinate of the tspan.
     * @param {number} endx - The final x coordinate of the tspan.
     * @param {number} endy - The final y coordinate of the tspan.
     * @param {number} duration - The duration of the animation in milliseconds.
     *
     * @private
     * @returns {void}
     */
    AccumulationChart.prototype.animateTspan = function (element, startx, starty, endx, endy, duration) {
        new Animation({}).animate(element, {
            duration: duration,
            progress: function (args) {
                element.style.animation = '';
                var progress = args.timeStamp / args.duration;
                var currentX = startx + (endx - startx) * progress;
                var currentY = starty + (endy - starty) * progress;
                element.setAttribute('x', currentX.toString());
                element.setAttribute('y', currentY.toString());
            },
            end: function () {
                element.setAttribute('x', endx.toString());
                element.setAttribute('y', endy.toString());
            }
        });
    };
    /**
     * Function to delay Center label at initial stage of accumulation chart.
     *
     * @param {Element} element - The element to delay.
     * @returns {void}
     */
    AccumulationChart.prototype.centerLabelDelay = function (element) {
        element.style.visibility = 'hidden';
        var animation = new Animation({});
        animation.animate(element, {
            delay: this.duration ? this.duration : this.series[0].animation.duration,
            progress: function (args) {
                args.element.style.visibility = 'visible';
            }
        });
    };
    AccumulationChart.prototype.renderSubTitle = function (options) {
        var maxWidth = 0;
        var titleWidth = 0;
        var padding = 10;
        var alignment = this.titleStyle.textAlignment;
        var subTitleElementSize = measureText(this.subTitle, this.subTitleStyle, this.themeStyle.chartSubTitleFont);
        for (var _i = 0, _a = this.titleCollection; _i < _a.length; _i++) {
            var titleText = _a[_i];
            titleWidth = measureText(titleText, this.titleStyle, this.themeStyle.chartSubTitleFont).width;
            maxWidth = titleWidth > maxWidth ? titleWidth : maxWidth;
        }
        var rect = new Rect(alignment === 'Center' ? (options.x - maxWidth / 2) : alignment === 'Far' ? options.x - maxWidth : options.x, 0, maxWidth, 0);
        if (this.titleStyle.position === 'Left') {
            rect.x = alignment === 'Center' ? (options.x - maxWidth * 0.5) : alignment === 'Far' ? this.margin.left + ((subTitleElementSize.height) * 3 / 4) : (options.x - maxWidth);
        }
        var subTitleOption = new TextOption(this.element.id + '_subTitle', titlePositionX(rect, this.subTitleStyle), options.y * options.text.length + ((subTitleElementSize.height) * 3 / 4) + padding, getTextAnchor(this.subTitleStyle.textAlignment, this.enableRtl), this.subTitleCollection, options.transform, 'auto');
        textElement(this.renderer, subTitleOption, this.subTitleStyle, this.subTitleStyle.color || this.themeStyle.chartSubTitleFont.color, this.svgObject, false, this.redraw, null, null, null, null, null, null, null, null, this.themeStyle.chartSubTitleFont);
    };
    /**
     * To get the series parent element.
     *
     * @private
     * @returns {Element} - The parent element of the series.
     */
    AccumulationChart.prototype.getSeriesElement = function () {
        return this.svgObject.getElementsByTagName('g')[0];
    };
    /**
     * To refresh the all visible series points.
     *
     * @private
     * @returns {void}
     */
    AccumulationChart.prototype.refreshSeries = function () {
        for (var _i = 0, _a = this.visibleSeries; _i < _a.length; _i++) {
            var series = _a[_i];
            this.refreshPoints(series.points);
        }
    };
    /**
     * To refresh points label region and visible.
     *
     * @private
     * @param {AccPoints[]} points - The array of points to refresh.
     * @returns {void}
     */
    AccumulationChart.prototype.refreshPoints = function (points) {
        for (var _i = 0, points_1 = points; _i < points_1.length; _i++) {
            var point = points_1[_i];
            point.labelPosition = null;
            point.labelRegion = null;
            point.labelVisible = true;
        }
    };
    /**
     * To get Module name.
     *
     * @private
     * @returns {string} - Returns the module name.
     */
    AccumulationChart.prototype.getModuleName = function () {
        return 'accumulationchart';
    };
    /**
     * To destroy the accumulation charts.
     *
     * @private
     * @returns {void}
     */
    AccumulationChart.prototype.destroy = function () {
        /**
         * To fix react timeout destroy issue.
         */
        if (this.element) {
            this.unWireEvents();
            _super.prototype.destroy.call(this);
            this.element.classList.remove('e-accumulationchart');
            this.element.classList.remove('e-accumulationchart-focused');
            var element = document.getElementById(this.element.id + 'Keyboard_accumulationchart_focus');
            if (element) {
                element.remove();
            }
            removeElement('chartmeasuretext');
            this.removeSvg();
            var highlightElement = document.getElementById(this.element.id + '_ej2_chart_highlight');
            if (highlightElement) {
                highlightElement.remove();
            }
            var selectionElement = document.getElementById(this.element.id + '_ej2_chart_selection');
            if (selectionElement) {
                selectionElement.remove();
            }
            this.svgObject = null;
        }
    };
    /**
     * To provide the array of modules needed for control rendering.
     *
     * @returns {ModuleDeclaration[]} - required modules.
     * @private
     */
    AccumulationChart.prototype.requiredModules = function () {
        var modules = [];
        var enableAnnotation = false;
        modules.push({
            member: this.type + 'Series',
            args: [this]
        });
        if (this.legendSettings.visible) {
            modules.push({
                member: 'AccumulationLegend',
                args: [this]
            });
        }
        if (this.findDatalabelVisibility()) {
            modules.push({
                member: 'AccumulationDataLabel',
                args: [this]
            });
        }
        if (this.tooltip.enable) {
            modules.push({
                member: 'AccumulationTooltip',
                args: [this]
            });
        }
        if (this.selectionMode !== 'None') {
            modules.push({
                member: 'AccumulationSelection',
                args: [this]
            });
        }
        if (this.highlightMode !== 'None') {
            modules.push({
                member: 'AccumulationHighlight',
                args: [this]
            });
        }
        if (this.enableExport || this.allowExport) {
            modules.push({
                member: 'Export',
                args: [this]
            });
        }
        enableAnnotation = this.annotations.some(function (value) {
            return (value.content !== null);
        });
        if (enableAnnotation) {
            modules.push({
                member: 'Annotation',
                args: [this]
            });
        }
        return modules;
    };
    /**
     * To find datalabel visibility in series.
     *
     * @returns {boolean} - false
     */
    AccumulationChart.prototype.findDatalabelVisibility = function () {
        for (var _i = 0, _a = this.series; _i < _a.length; _i++) {
            var series = _a[_i];
            if (series.dataLabel.visible) {
                return true;
            }
        }
        return false;
    };
    /**
     * Get visible series for accumulation chart by index.
     *
     * @param {AccumulationSeries[]} visibleSeries - The array of visible series in the accumulation chart.
     * @param {number} index - The index of the series to retrieve.
     * @returns {AccumulationSeries} - The visible series at the specified index.
     */
    AccumulationChart.prototype.changeVisibleSeries = function (visibleSeries, index) {
        for (var _i = 0, visibleSeries_1 = visibleSeries; _i < visibleSeries_1.length; _i++) {
            var series = visibleSeries_1[_i];
            if (index === series.index) {
                return series;
            }
        }
        return null;
    };
    /**
     * Get the properties to be maintained in the persisted state.
     *
     * @private
     * @returns {string} - The persisted data containing the properties.
     */
    AccumulationChart.prototype.getPersistData = function () {
        return '';
    };
    /**
     * Method to sanitize any potentially untrusted strings and scripts before rendering them.
     *
     * @param {string} value - Specifies the html value to sanitize
     * @returns {string} Returns the sanitized html string
     * @private
     */
    AccumulationChart.prototype.sanitize = function (value) {
        if (this.enableHtmlSanitizer) {
            return SanitizeHtmlHelper.sanitize(value);
        }
        return value;
    };
    /**
     * Called internally if any of the property value changed.
     *
     * @private
     * @param {AccumulationChartModel} newProp - The new AccumulationChartModel.
     * @param {AccumulationChartModel} oldProp - The old AccumulationChartModel.
     * @returns {void}
     */
    AccumulationChart.prototype.onPropertyChanged = function (newProp, oldProp) {
        var update = {
            refreshElements: false, refreshBounds: false
        };
        for (var _i = 0, _a = Object.keys(newProp); _i < _a.length; _i++) {
            var prop = _a[_i];
            switch (prop) {
                case 'theme':
                    this.animateSeries = true;
                    break;
                case 'title':
                case 'subTitle':
                case 'height':
                case 'width':
                case 'margin':
                    update.refreshBounds = true;
                    break;
                case 'titleStyle':
                    if (newProp.titleStyle && (newProp.titleStyle.size || newProp.titleStyle.textOverflow)) {
                        update.refreshBounds = true;
                    }
                    else {
                        update.refreshElements = true;
                    }
                    break;
                case 'subTitleStyle':
                    if (newProp.subTitleStyle && (newProp.subTitleStyle.size || newProp.subTitleStyle.textOverflow)) {
                        update.refreshBounds = true;
                    }
                    else {
                        update.refreshElements = true;
                    }
                    break;
                case 'legendSettings':
                    update.refreshBounds = true;
                    update.refreshElements = true;
                    break;
                case 'dataSource':
                    this.processData(false);
                    update.refreshBounds = true;
                    break;
                case 'series':
                    if (!this.animateselected) {
                        var len = this.series.length;
                        var seriesRefresh = false;
                        var series = void 0;
                        var blazorProp = void 0;
                        for (var i = 0; i < len; i++) {
                            series = newProp.series[i];
                            if ((series.startAngle || series.endAngle || series.explodeOffset || series.neckHeight ||
                                series.neckWidth || series.radius || series.innerRadius || series.groupMode ||
                                series.emptyPointSettings) && this.isBlazor) {
                                blazorProp = true;
                            }
                            if (newProp.series[i] && (newProp.series[i].dataSource || newProp.series[i].yName
                                || newProp.series[i].xName || series.type ||
                                newProp.series[i].dataLabel || series.radius || series.innerRadius ||
                                series.startAngle || series.endAngle || series.gapRatio || series.neckWidth || series.explode ||
                                series.neckWidth || series.pyramidMode || series.explodeOffset || series.funnelMode || blazorProp)) {
                                extend(this.changeVisibleSeries(this.visibleSeries, i), series, null, true);
                                seriesRefresh = true;
                            }
                            if (newProp.series[i] && !isNullOrUndefined(newProp.series[i].explodeIndex) &&
                                newProp.series[i].explodeIndex >= 0
                                && newProp.series[i].explodeIndex !== oldProp.series[i].explodeIndex) {
                                this.accBaseModule.explodePoints(newProp.series[i].explodeIndex, this);
                                this.accBaseModule.deExplodeAll(newProp.series[i].explodeIndex, this.enableAnimation ? 300 : 0);
                            }
                            else if (newProp.series[i].explodeIndex < 0) {
                                this.accBaseModule.deExplodeAll(newProp.series[i].explodeIndex, this.enableAnimation ? 300 : 0);
                            }
                            if (!this.pieSeriesModule) {
                                this.pieSeriesModule = new PieSeries(this);
                            }
                        }
                        if (seriesRefresh) {
                            this.calculateVisibleSeries();
                            this.processData(false);
                            update.refreshBounds = true;
                        }
                    }
                    this.animateselected = false;
                    this.redraw = false;
                    break;
                case 'enableRtl':
                case 'locale':
                case 'currencyCode':
                    _super.prototype.refresh.call(this);
                    break;
                case 'background':
                case 'border':
                case 'annotations':
                case 'enableSmartLabels':
                    update.refreshElements = true;
                    break;
                case 'isMultiSelect':
                case 'selectedDataIndexes':
                case 'selectionMode':
                    if (this.accumulationSelectionModule) {
                        if (isNullOrUndefined(this.accumulationSelectionModule.selectedDataIndexes)) {
                            this.accumulationSelectionModule.invokeSelection(this);
                        }
                        else {
                            this.accumulationSelectionModule.selectedDataIndexes = this.selectedDataIndexes;
                            this.accumulationSelectionModule.redrawSelection(this);
                        }
                    }
                    break;
                case 'tooltip':
                    if (this.accumulationTooltipModule) { // To check the tooltip enable is true.
                        this.accumulationTooltipModule.previousPoints = [];
                        if (this.tooltip.template) {
                            this.accumulationTooltipModule.template = this.tooltip.template;
                        }
                    }
                    break;
                case 'center':
                    if (!isNullOrUndefined(newProp.center.x)) {
                        this.center.x = newProp.center.x;
                        update.refreshElements = true;
                    }
                    if (!isNullOrUndefined(newProp.center.y)) {
                        this.center.y = newProp.center.y;
                        update.refreshElements = true;
                    }
                    break;
            }
        }
        if (!update.refreshBounds && update.refreshElements) {
            this.createPieSvg();
            this.renderElements();
        }
        else if (update.refreshBounds) {
            this.refreshSeries();
            this.createPieSvg();
            this.calculateBounds();
            this.renderElements();
        }
    };
    __decorate([
        Property(null)
    ], AccumulationChart.prototype, "width", void 0);
    __decorate([
        Property(null)
    ], AccumulationChart.prototype, "height", void 0);
    __decorate([
        Property(null)
    ], AccumulationChart.prototype, "title", void 0);
    __decorate([
        Property(null)
    ], AccumulationChart.prototype, "backgroundImage", void 0);
    __decorate([
        Complex({}, PieCenter)
    ], AccumulationChart.prototype, "center", void 0);
    __decorate([
        Property('')
    ], AccumulationChart.prototype, "dataSource", void 0);
    __decorate([
        Complex({ fontFamily: null, size: null, fontStyle: null, fontWeight: null, color: null }, TitleStyleSettings)
    ], AccumulationChart.prototype, "titleStyle", void 0);
    __decorate([
        Property(null)
    ], AccumulationChart.prototype, "subTitle", void 0);
    __decorate([
        Complex({ fontFamily: null, size: null, fontStyle: null, fontWeight: null, color: null }, TitleStyleSettings)
    ], AccumulationChart.prototype, "subTitleStyle", void 0);
    __decorate([
        Complex({}, LegendSettings)
    ], AccumulationChart.prototype, "legendSettings", void 0);
    __decorate([
        Complex({}, TooltipSettings)
    ], AccumulationChart.prototype, "tooltip", void 0);
    __decorate([
        Complex({}, CenterLabel)
    ], AccumulationChart.prototype, "centerLabel", void 0);
    __decorate([
        Property('None')
    ], AccumulationChart.prototype, "selectionMode", void 0);
    __decorate([
        Property('')
    ], AccumulationChart.prototype, "highlightColor", void 0);
    __decorate([
        Property('None')
    ], AccumulationChart.prototype, "highlightMode", void 0);
    __decorate([
        Property('None')
    ], AccumulationChart.prototype, "selectionPattern", void 0);
    __decorate([
        Property('None')
    ], AccumulationChart.prototype, "highlightPattern", void 0);
    __decorate([
        Property(false)
    ], AccumulationChart.prototype, "enableHtmlSanitizer", void 0);
    __decorate([
        Property(true)
    ], AccumulationChart.prototype, "enableBorderOnMouseMove", void 0);
    __decorate([
        Property(false)
    ], AccumulationChart.prototype, "isMultiSelect", void 0);
    __decorate([
        Property(true)
    ], AccumulationChart.prototype, "enableAnimation", void 0);
    __decorate([
        Collection([], Indexes)
    ], AccumulationChart.prototype, "selectedDataIndexes", void 0);
    __decorate([
        Complex({}, Margin)
    ], AccumulationChart.prototype, "margin", void 0);
    __decorate([
        Property(true)
    ], AccumulationChart.prototype, "enableSmartLabels", void 0);
    __decorate([
        Complex({ color: '#DDDDDD', width: 0 }, Border)
    ], AccumulationChart.prototype, "border", void 0);
    __decorate([
        Property(null)
    ], AccumulationChart.prototype, "background", void 0);
    __decorate([
        Collection([{}], AccumulationSeries)
    ], AccumulationChart.prototype, "series", void 0);
    __decorate([
        Collection([{}], AccumulationAnnotationSettings)
    ], AccumulationChart.prototype, "annotations", void 0);
    __decorate([
        Property('Material')
    ], AccumulationChart.prototype, "theme", void 0);
    __decorate([
        Property(false)
    ], AccumulationChart.prototype, "useGroupingSeparator", void 0);
    __decorate([
        Property(true)
    ], AccumulationChart.prototype, "enableExport", void 0);
    __decorate([
        Property(false)
    ], AccumulationChart.prototype, "allowExport", void 0);
    __decorate([
        Complex({}, Accessibility)
    ], AccumulationChart.prototype, "accessibility", void 0);
    __decorate([
        Property(null)
    ], AccumulationChart.prototype, "focusBorderColor", void 0);
    __decorate([
        Property(1.5)
    ], AccumulationChart.prototype, "focusBorderWidth", void 0);
    __decorate([
        Property(0)
    ], AccumulationChart.prototype, "focusBorderMargin", void 0);
    __decorate([
        Event()
    ], AccumulationChart.prototype, "loaded", void 0);
    __decorate([
        Event()
    ], AccumulationChart.prototype, "legendClick", void 0);
    __decorate([
        Event()
    ], AccumulationChart.prototype, "load", void 0);
    __decorate([
        Event()
    ], AccumulationChart.prototype, "seriesRender", void 0);
    __decorate([
        Event()
    ], AccumulationChart.prototype, "legendRender", void 0);
    __decorate([
        Event()
    ], AccumulationChart.prototype, "textRender", void 0);
    __decorate([
        Event()
    ], AccumulationChart.prototype, "tooltipRender", void 0);
    __decorate([
        Event()
    ], AccumulationChart.prototype, "pointRender", void 0);
    __decorate([
        Event()
    ], AccumulationChart.prototype, "annotationRender", void 0);
    __decorate([
        Event()
    ], AccumulationChart.prototype, "beforePrint", void 0);
    __decorate([
        Event()
    ], AccumulationChart.prototype, "chartMouseMove", void 0);
    __decorate([
        Event()
    ], AccumulationChart.prototype, "chartMouseClick", void 0);
    __decorate([
        Event()
    ], AccumulationChart.prototype, "chartDoubleClick", void 0);
    __decorate([
        Event()
    ], AccumulationChart.prototype, "pointClick", void 0);
    __decorate([
        Event()
    ], AccumulationChart.prototype, "pointMove", void 0);
    __decorate([
        Event()
    ], AccumulationChart.prototype, "animationComplete", void 0);
    __decorate([
        Event()
    ], AccumulationChart.prototype, "chartMouseDown", void 0);
    __decorate([
        Event()
    ], AccumulationChart.prototype, "chartMouseLeave", void 0);
    __decorate([
        Event()
    ], AccumulationChart.prototype, "chartMouseUp", void 0);
    __decorate([
        Event()
    ], AccumulationChart.prototype, "beforeResize", void 0);
    __decorate([
        Event()
    ], AccumulationChart.prototype, "resized", void 0);
    __decorate([
        Event()
    ], AccumulationChart.prototype, "beforeExport", void 0);
    __decorate([
        Event()
    ], AccumulationChart.prototype, "afterExport", void 0);
    __decorate([
        Event()
    ], AccumulationChart.prototype, "selectionComplete", void 0);
    __decorate([
        Property('USD')
    ], AccumulationChart.prototype, "currencyCode", void 0);
    AccumulationChart = __decorate([
        NotifyPropertyChanges
    ], AccumulationChart);
    return AccumulationChart;
}(Component));
export { AccumulationChart };
