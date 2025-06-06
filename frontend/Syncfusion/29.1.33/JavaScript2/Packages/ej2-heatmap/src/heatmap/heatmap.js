/**
 * Heat Map Component
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
import { Component, Property, NotifyPropertyChanges, Internationalization, Complex, isNullOrUndefined, SanitizeHtmlHelper } from '@syncfusion/ej2-base';
import { remove, Event, EventHandler, Touch } from '@syncfusion/ej2-base';
// eslint-disable-next-line
import { Browser } from '@syncfusion/ej2-base';
import { SvgRenderer, CanvasRenderer } from '@syncfusion/ej2-svg-base';
import { Size, stringToNumber, RectOption, Rect, TextBasic, measureText, removeMeasureElement } from './utils/helper';
import { DrawSvgCanvas, TextOption, titlePositionX, getTitle, showTooltip, getElement, SelectedCellDetails } from './utils/helper';
import { removeElement, CanvasTooltip, getTooltipText } from './utils/helper';
import { Margin, Title } from './model/base';
import { Theme, getThemeColor } from './model/theme';
import { Axis } from './axis/axis';
import { AxisHelper } from './axis/axis-helpers';
import { Series, CellSettings } from './series/series';
import { PaletteSettings, CellColor } from './utils/colorMapping';
import { TooltipSettings } from './utils/tooltip';
import { TwoDimensional } from './datasource/twodimensional';
import { LegendSettings } from '../heatmap/legend/legend';
import { Data } from './datasource/adaptor';
import { ExportUtils } from '../heatmap/utils/export';
/**
 * Represents the heatmap control. This is used to customize the properties of the heatmap in order to visualize two-dimensional data, with values represented by gradient or solid color variations.
 * ```html
 * <div id="container"/>
 * <script>
 *   var heatmapObj = new HeatMap();
 *   heatmapObj.appendTo("#container");
 * </script>
 * ```
 */
var HeatMap = /** @class */ (function (_super) {
    __extends(HeatMap, _super);
    function HeatMap() {
        /**
         * Sets and gets the width of the heatmap. The width of the heatmap accepts pixel or percentage values given in string format.
         *
         * If specified as '100%, heatmap renders to the full width of its parent element.
         *
         * @default null
         */
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /** @private */
        _this.enableCanvasRendering = false;
        /** @private */
        _this.isColorRange = false;
        /** @private */
        _this.isCellTapHold = false;
        /** @private */
        _this.selectedCellCount = 0;
        /** @private */
        _this.toggleValue = [];
        /** @private */
        _this.legendOnLoad = true;
        /** @private */
        _this.resizing = false;
        /** @private */
        _this.rendering = true;
        /** @private */
        _this.multiSelection = false;
        /** @private */
        _this.rectSelected = false;
        /** @private */
        _this.previousSelectedCellsRect = [];
        /** @private */
        _this.multiCellCollection = [];
        /** @private */
        _this.selectedMultiCellCollection = [];
        /** @private */
        _this.tempMultiCellCollection = [];
        /**
         * @private
         */
        _this.tooltipCollection = [];
        /**
         * @private
         */
        _this.isCellData = false;
        return _this;
    }
    HeatMap.prototype.preRender = function () {
        this.initPrivateVariable();
        this.unWireEvents();
        this.wireEvents();
    };
    /**
     * This method is used to perform the export functionality for the heatmap.
     *
     * @param {ExportType} type - Specifies the type of the exported file.
     * @param {string} fileName - Specifies the file name for the exported file.
     * @param {PdfPageOrientation} orientation - Specifies the orientation for the exported PDF document.
     */
    HeatMap.prototype.export = function (type, fileName, orientation) {
        var exportMap = new ExportUtils(this);
        exportMap.export(type, fileName, orientation);
    };
    HeatMap.prototype.initPrivateVariable = function () {
        this.renderer = new SvgRenderer(this.element.id);
        this.canvasRenderer = new CanvasRenderer(this.element.id);
        this.secondaryCanvasRenderer = new CanvasRenderer(this.element.id + '_secondary');
        this.heatMapAxis = new AxisHelper(this);
        this.heatMapSeries = new Series(this);
        this.drawSvgCanvas = new DrawSvgCanvas(this);
        this.twoDimensional = new TwoDimensional(this);
        this.cellColor = new CellColor(this);
        this.tempRectHoverClass = '';
        this.tempTooltipRectId = '';
        this.setCulture();
    };
    /**
     * Method to set culture for heatmap
     */
    HeatMap.prototype.setCulture = function () {
        this.intl = new Internationalization();
    };
    HeatMap.prototype.render = function () {
        this.horizontalGradient = this.legendSettings.position === 'Bottom' || this.legendSettings.position === 'Top';
        this.updateBubbleHelperProperty();
        this.trigger('load', { heatmap: this });
        if (this.theme === 'TailwindDark' || this.theme === 'Tailwind') {
            var textSettings = { title: { textStyle: { size: '12px', fontFamily: 'Inter', fontWeight: '500' } }, textStyle: { size: '12px', fontFamily: 'Inter' } };
            this.setProperties({ titleSettings: { textStyle: { size: '14px', fontFamily: 'Inter' } } }, true);
            this.setProperties({ legendSettings: textSettings }, true);
            this.setProperties({ xAxis: textSettings }, true);
            this.setProperties({ yAxis: textSettings }, true);
            this.setProperties({ cellSettings: { textStyle: { fontFamily: 'Inter' } } }, true);
        }
        if (this.theme === 'Tailwind3Dark' || this.theme === 'Tailwind3') {
            var textSettings = { title: { textStyle: { size: '12px', fontFamily: 'Inter', fontWeight: '500' } }, textStyle: { size: '12px', fontFamily: 'Inter', fontWeight: '500' } };
            this.setProperties({ titleSettings: { textStyle: { size: '14px', fontFamily: 'Inter', fontWeight: '600' } } }, true);
            this.setProperties({ legendSettings: textSettings }, true);
            this.setProperties({ xAxis: { title: { textStyle: { size: '12px', fontFamily: 'Inter', fontWeight: '500' } }, textStyle: { size: '12px', fontFamily: 'Inter', fontWeight: '400' } } }, true);
            this.setProperties({ yAxis: { title: { textStyle: { size: '12px', fontFamily: 'Inter', fontWeight: '500' } }, textStyle: { size: '12px', fontFamily: 'Inter', fontWeight: '400' } } }, true);
            this.setProperties({ cellSettings: { textStyle: { fontFamily: 'Inter', fontWeight: '400' } } }, true);
        }
        if (this.theme === 'Material3' || this.theme === 'Material3Dark') {
            var textSettings = { title: { textStyle: { size: '14px', fontFamily: 'Roboto', fontWeight: '500' } }, textStyle: { size: '12px', fontFamily: 'Roboto', fontWeight: '400' } };
            this.setProperties({ titleSettings: { textStyle: { size: '16px', fontFamily: 'Roboto' } } }, true);
            this.setProperties({ legendSettings: textSettings }, true);
            this.setProperties({ xAxis: textSettings }, true);
            this.setProperties({ yAxis: textSettings }, true);
            this.setProperties({ cellSettings: { textStyle: { fontFamily: 'Roboto', fontWeight: '400' } } }, true);
        }
        if (this.theme === 'Bootstrap5' || this.theme === 'Bootstrap5Dark') {
            var textSettings = { title: { textStyle: { size: '12px', fontFamily: 'Segoe UI', fontWeight: '400' } }, textStyle: { size: '12px', fontFamily: 'Segoe UI', fontWeight: '400' } };
            this.setProperties({ titleSettings: { textStyle: { size: '14px', fontFamily: 'Segoe UI', fontWeight: '400' } } }, true);
            this.setProperties({ legendSettings: textSettings }, true);
            this.setProperties({ xAxis: textSettings }, true);
            this.setProperties({ yAxis: textSettings }, true);
            this.setProperties({ cellSettings: { textStyle: { size: '10px', fontWeight: '400', fontFamily: 'Segoe UI' } } }, true);
        }
        if (this.theme === 'Fluent' || this.theme === 'FluentDark') {
            var textSettings = { title: { textStyle: { size: '12px', fontFamily: '"Segoe UI", -apple-system, BlinkMacSystemFont, "Roboto", "Helvetica Neue", sans-serif', fontWeight: '500' } }, textStyle: { size: '12px', fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"' } };
            this.setProperties({ titleSettings: { textStyle: { size: '16px', fontFamily: '"Segoe UI", -apple-system, BlinkMacSystemFont, "Roboto", "Helvetica Neue", sans-serif' } } }, true);
            this.setProperties({ legendSettings: textSettings }, true);
            this.setProperties({ xAxis: textSettings }, true);
            this.setProperties({ yAxis: textSettings }, true);
            this.setProperties({ cellSettings: { textStyle: { fontFamily: '"Segoe UI", -apple-system, BlinkMacSystemFont, "Roboto", "Helvetica Neue", sans-serif' } } }, true);
        }
        if (this.theme === 'Fluent2' || this.theme === 'Fluent2Dark' || this.theme === 'Fluent2HighContrast') {
            var textSettings = { title: { textStyle: { size: '12px', fontFamily: 'Segoe UI', fontWeight: '400' } }, textStyle: { size: '12px', fontFamily: 'Segoe UI', fontWeight: '400' } };
            this.setProperties({ titleSettings: { textStyle: { size: '14px', fontFamily: 'Segoe UI', fontWeight: '600' } } }, true);
            this.setProperties({ legendSettings: textSettings }, true);
            this.setProperties({ xAxis: textSettings }, true);
            this.setProperties({ yAxis: textSettings }, true);
            this.setProperties({ cellSettings: { textStyle: { size: '10px', fontWeight: '400', fontFamily: 'Segoe UI' } } }, true);
        }
        this.initAxis();
        this.processInitData();
        this.setTheme();
        this.calculateMaxLength();
        this.heatMapAxis.calculateVisibleLabels();
        this.twoDimensional.processDataSource(this.completeAdaptDataSource);
        this.createSvg();
        this.cellColor.getColorCollection();
        this.calculateBounds();
        this.renderElements();
        this.appendSvgObject();
        if (this.tooltipModule) {
            this.tooltipModule.showHideTooltip(false);
        }
        this.renderComplete();
    };
    /**
     * To re-calculate the datasource while changing datasource property dynamically.
     *
     * @private
     */
    HeatMap.prototype.reRenderDatasource = function () {
        this.dataSourceMinValue = null;
        this.dataSourceMaxValue = null;
        this.processInitData();
        this.calculateMaxLength();
        this.heatMapAxis.calculateVisibleLabels();
        this.twoDimensional.processDataSource(this.completeAdaptDataSource);
        this.cellColor.getColorCollection();
        this.calculateBounds();
    };
    /**
     * To process datasource property.
     *
     * @private
     */
    HeatMap.prototype.processInitData = function () {
        if (this.adaptorModule) {
            this.adaptorModule.constructDatasource(this.dataSource, this.dataSourceSettings);
        }
        else {
            this.completeAdaptDataSource = this.dataSource;
        }
    };
    /**
     * To set render mode of heatmap as SVG or Canvas.
     *
     * @private
     */
    HeatMap.prototype.setRenderMode = function () {
        if (this.renderingMode === 'Canvas') {
            this.enableCanvasRendering = true;
        }
        else if (this.renderingMode === 'Auto' &&
            (this.axisCollections[0].axisLabelSize * this.axisCollections[1].axisLabelSize) >= 10000) {
            this.enableCanvasRendering = true;
        }
        else {
            this.enableCanvasRendering = false;
        }
    };
    /**
     * To set bubble helper private property.
     *
     * @private
     */
    HeatMap.prototype.updateBubbleHelperProperty = function () {
        if (isNullOrUndefined(this.legendModule) || (this.cellSettings.tileType === 'Bubble' &&
            (this.cellSettings.bubbleType === 'Size' || this.cellSettings.bubbleType === 'Sector'))) {
            this.legendVisibilityByCellType = false;
        }
        else if (this.legendModule && this.legendSettings.visible) {
            this.legendVisibilityByCellType = true;
        }
        if (this.cellSettings.tileType === 'Bubble' && this.cellSettings.bubbleType === 'SizeAndColor') {
            this.bubbleSizeWithColor = true;
        }
        else {
            this.bubbleSizeWithColor = false;
        }
    };
    HeatMap.prototype.renderElements = function () {
        this.tooltipCollection = [];
        this.renderSecondaryElement();
        this.renderBorder();
        this.renderTitle();
        this.heatMapAxis.renderAxes();
        if (this.tooltipModule && this.showTooltip) {
            this.tooltipModule.tooltipObject = null;
            this.tooltipModule.createTooltipDiv(this);
        }
        this.heatMapSeries.renderRectSeries();
        if (this.legendModule && this.legendSettings.visible
            && this.legendVisibilityByCellType) {
            this.legendModule.renderLegendItems();
            if (this.paletteSettings.type === 'Fixed' && this.legendSettings.enableSmartLegend &&
                this.legendSettings.labelDisplayType === 'None') {
                this.legendModule.createTooltipDiv();
            }
        }
        removeMeasureElement();
    };
    /**
     * Get component name
     *
     * @private
     */
    HeatMap.prototype.getModuleName = function () {
        return 'heatmap';
    };
    /**
     * Get the properties to be maintained in the persisted state.
     *
     * @private
     */
    HeatMap.prototype.getPersistData = function () {
        return '';
    };
    /**
     * @private
     */
    // tslint:disable-next-line:max-func-body-length
    HeatMap.prototype.onPropertyChanged = function (newProp, oldProp) {
        var renderer = false;
        var refreshBounds = false;
        var isUpdateSelection = true;
        for (var _i = 0, _a = Object.keys(newProp); _i < _a.length; _i++) {
            var prop = _a[_i];
            switch (prop) {
                case 'renderingMode':
                    this.rendering = false;
                    isUpdateSelection = false;
                    renderer = true;
                    break;
                case 'cellSettings':
                    this.updateBubbleHelperProperty();
                    if (this.legendModule && ((newProp.cellSettings.tileType !== (oldProp.cellSettings
                        !== undefined && oldProp.cellSettings.tileType))
                        || (newProp.cellSettings.bubbleType !== oldProp.cellSettings.bubbleType))) {
                        this.legendOnLoad = true;
                        this.legendModule.updateLegendRangeCollections();
                    }
                    if (this.cellSettings.tileType === 'Bubble') {
                        isUpdateSelection = false;
                    }
                    this.reRenderDatasource();
                    refreshBounds = true;
                    break;
                case 'showTooltip':
                    refreshBounds = true;
                    break;
                case 'dataSource':
                case 'dataSourceSettings':
                    this.isCellData = false;
                    this.paletteCellSelectionUpdation();
                    this.reRenderDatasource();
                    isUpdateSelection = false;
                    renderer = true;
                    break;
                case 'titleSettings':
                case 'width':
                case 'height':
                case 'margin':
                case 'backgroundColor':
                    refreshBounds = true;
                    break;
                case 'legendSettings':
                    this.updateBubbleHelperProperty();
                    if (this.legendModule && this.legendVisibilityByCellType && (((newProp.legendSettings.visible !==
                        (oldProp.legendSettings !== undefined && oldProp.legendSettings.visible)) ||
                        (newProp.legendSettings.enableSmartLegend !== oldProp.legendSettings.enableSmartLegend)))) {
                        this.legendOnLoad = true;
                        this.legendModule.updateLegendRangeCollections();
                    }
                    else {
                        this.legendOnLoad = false;
                    }
                    refreshBounds = true;
                    break;
                case 'yAxis':
                case 'xAxis':
                    this.paletteCellSelectionUpdation();
                    this.reRenderDatasource();
                    isUpdateSelection = false;
                    refreshBounds = true;
                    break;
                case 'paletteSettings':
                    this.paletteCellSelectionUpdation();
                    this.twoDimensional.processDataSource(this.completeAdaptDataSource);
                    this.cellColor.getColorCollection();
                    this.calculateBounds();
                    renderer = true;
                    break;
                case 'theme':
                    this.setTheme();
                    renderer = true;
                    break;
                case 'tooltipSettings':
                    if (this.tooltipModule) {
                        this.tooltipModule.tooltipObject.fill = this.tooltipSettings.fill;
                        this.tooltipModule.tooltipObject.border = this.tooltipSettings.border;
                        this.tooltipModule.tooltipObject.textStyle = this.tooltipSettings.textStyle;
                        this.tooltipModule.tooltipObject.template = this.tooltipSettings.template;
                        this.tooltipModule.tooltipObject.refresh();
                    }
                    break;
            }
        }
        if (!refreshBounds && renderer) {
            this.createSvg();
            this.renderElements();
            this.appendSvgObject();
            this.trigger('created');
            if (!isUpdateSelection) {
                this.clearSelection();
            }
        }
        else if (refreshBounds) {
            this.createSvg();
            this.refreshBound();
            this.appendSvgObject();
            this.trigger('created');
        }
        if (this.allowSelection && this.rectSelected) {
            if (isUpdateSelection) {
                this.updateCellSelection();
            }
            else {
                this.clearSelection();
            }
        }
        this.rendering = true;
    };
    HeatMap.prototype.paletteCellSelectionUpdation = function () {
        this.updateBubbleHelperProperty();
        if (this.legendModule && this.legendVisibilityByCellType) {
            this.legendOnLoad = true;
            this.legendModule.updateLegendRangeCollections();
        }
    };
    /**
     * create svg or canvas element
     *
     * @private
     */
    HeatMap.prototype.createSvg = function () {
        this.removeSvg();
        this.setRenderMode();
        this.calculateSize();
        if (!this.enableCanvasRendering) {
            this.svgObject = this.renderer.createSvg({
                id: this.element.id + '_svg',
                width: this.availableSize.width,
                height: this.availableSize.height
            });
            if (this.cellSettings.border.width.toString() === '0' && this.cellSettings.tileType === 'Rect') {
                this.svgObject.setAttribute('shape-rendering', 'crispEdges');
            }
        }
        else {
            this.svgObject = this.canvasRenderer.createCanvas({
                id: this.element.id + '_canvas',
                width: this.availableSize.width,
                height: this.availableSize.height
            });
            if (this.allowSelection) {
                this.createMultiCellDiv(true);
            }
        }
    };
    /**
     *  To Remove the SVG.
     *
     * @private
     */
    HeatMap.prototype.removeSvg = function () {
        if (document.getElementById(this.element.id + '_Secondary_Element')) {
            remove(document.getElementById(this.element.id + '_Secondary_Element'));
        }
        if (document.getElementById(this.element.id + 'Celltooltipcontainer')) {
            remove(document.getElementById(this.element.id + 'Celltooltipcontainer'));
        }
        if (document.getElementById(this.element.id + 'legendLabelTooltipContainer')) {
            remove(document.getElementById(this.element.id + 'legendLabelTooltipContainer'));
        }
        if (document.getElementById(this.element.id + '_Multi_CellSelection_Canvas')) {
            remove(document.getElementById(this.element.id + '_Multi_CellSelection_Canvas'));
        }
        if (document.getElementById(this.element.id + '_CellSelection_Container')) {
            remove(document.getElementById(this.element.id + '_CellSelection_Container'));
        }
        if (document.getElementById(this.element.id + '_secondary_canvas')) {
            remove(document.getElementById(this.element.id + '_secondary_canvas'));
        }
        if (this.svgObject) {
            var svgElement = document.getElementById(this.svgObject.id);
            if (svgElement) {
                while (this.svgObject.childNodes.length) {
                    this.svgObject.removeChild(this.svgObject.firstChild);
                }
                remove(this.svgObject);
            }
        }
    };
    HeatMap.prototype.renderSecondaryElement = function () {
        var tooltipDiv = this.createElement('div');
        tooltipDiv.id = this.element.id + '_Secondary_Element';
        this.element.appendChild(tooltipDiv);
        var divElement = this.createElement('div', {
            id: this.element.id + '_CellSelection_Container'
        });
        divElement.style.cssText = 'position:absolute; z-index: 2 ; top:' + this.initialClipRect.y + 'px' + '; left:' + this.initialClipRect.x + 'px';
        this.element.appendChild(divElement);
    };
    /**
     * To provide the array of modules needed for control rendering
     *
     * @returns {ModuleDeclaration[]}
     * @private
     */
    HeatMap.prototype.requiredModules = function () {
        var modules = [];
        if (this.showTooltip) {
            modules.push({
                member: 'Tooltip',
                args: [this],
                name: 'Tooltip'
            });
        }
        if (this.legendSettings.visible) {
            modules.push({
                member: 'Legend',
                args: [this],
                name: 'Legend'
            });
        }
        if (!isNullOrUndefined(this.dataSourceSettings) && ((this.dataSourceSettings.adaptorType === 'Table' && this.dataSourceSettings.isJsonData) || this.dataSourceSettings.adaptorType === 'Cell')) {
            modules.push({
                member: 'Adaptor',
                args: [this],
                name: 'Adaptor'
            });
        }
        return modules;
    };
    /**
     * This method destroys the heatmap. This method removes the events associated with the heatmap and disposes the objects created for rendering and updating the heatmap.
     * {% codeBlock src='heatmap/destroy/index.md' %}{% endcodeBlock %}
     *
     * @function destroy
     * @returns {void}.
     * @member of Heatmap
     */
    HeatMap.prototype.destroy = function () {
        this.unWireEvents();
        this.touchInstance.destroy();
        this.touchInstance = null;
        for (var i = 0; i < this.axisCollections.length; i++) {
            this.axisCollections[i].destroy();
        }
        this.axisCollections = null;
        if (!isNullOrUndefined(this.heatMapSeries)) {
            this.heatMapSeries.destroy();
        }
        this.heatMapSeries = null;
        if (!isNullOrUndefined(this.heatMapAxis)) {
            this.heatMapAxis.destroy();
        }
        this.heatMapAxis = null;
        _super.prototype.destroy.call(this);
        removeMeasureElement();
        if (!isNullOrUndefined(this.twoDimensional)) {
            this.twoDimensional.destroy();
        }
        this.twoDimensional = null;
        this.element.innerHTML = '';
        this.availableSize = null;
        this.elementSize = null;
        this.initialClipRect = null;
        this.element.classList.remove('e-heatmap');
        this.drawSvgCanvas = null;
        this.cellColor = null;
        this.colorCollection = null;
        this.legendColorCollection = null;
        this.clonedDataSource = null;
        this.completeAdaptDataSource = null;
        this.currentRect = null;
        this.dataMax = null;
        this.dataMin = null;
        this.previousRect = null;
        this.selectedCellsRect = null;
        this.canvasSelectedCells = null;
        this.titleRect = null;
        this.tooltipCollection = null;
        this.border = null;
        this.intl = null;
        this.titleCollection = null;
        this.themeStyle = null;
        this.renderer = null;
        this.canvasRenderer = null;
        this.secondaryCanvasRenderer = null;
        this.svgObject = null;
        this.resizeEvent = null;
        this.toggleValue = [];
        this.previousSelectedCellsRect = [];
        this.selectedMultiCellCollection = [];
        this.tempMultiCellCollection = [];
    };
    /**
     * Applies all the pending property changes and render the component again.
     *
     * @function destroy
     * @returns {void}.
     */
    HeatMap.prototype.refresh = function () {
        _super.prototype.refresh.call(this);
        this.element.classList.add('e-heatmap');
    };
    /**
     * Appending svg object to the element
     *
     * @private
     */
    HeatMap.prototype.appendSvgObject = function () {
        this.element.appendChild(this.svgObject);
        if (this.enableCanvasRendering && this.allowSelection) {
            this.createMultiCellDiv(false);
        }
    };
    HeatMap.prototype.renderBorder = function () {
        this.border = {
            width: 0
        };
        var background = !isNullOrUndefined(this.backgroundColor) ? this.backgroundColor : this.themeStyle.background;
        var width = 0;
        var rect = new RectOption(this.element.id + '_HeatmapBorder', background, this.border, 1, new Rect(width / 2, width / 2, this.availableSize.width - width, this.availableSize.height - width));
        this.drawSvgCanvas.drawRectangle(rect, this.svgObject);
    };
    HeatMap.prototype.calculateSize = function () {
        var width = stringToNumber(this.width, this.element.offsetWidth) || this.element.offsetWidth || 600;
        var height = stringToNumber(this.height, this.element.offsetHeight) || this.element.offsetHeight || 450;
        this.availableSize = new Size(width, height);
        var alignElement = this.element;
        while (alignElement.parentNode) {
            if (alignElement.tagName === 'BODY') {
                break;
            }
            var align = alignElement.align;
            if (align === 'center') {
                var containerWidth = this.availableSize.width.toString();
                this.element.style.width = containerWidth + 'px';
                this.element.style.margin = '0 auto';
                break;
            }
            alignElement = alignElement.parentElement;
        }
    };
    HeatMap.prototype.renderTitle = function () {
        if (this.titleSettings.text) {
            var titleStyle = this.titleSettings.textStyle;
            var anchor = titleStyle.textAlignment === 'Near' ? 'start' :
                titleStyle.textAlignment === 'Far' ? 'end' : 'middle';
            this.elementSize = measureText(this.titleCollection[0], titleStyle);
            var options = new TextOption(this.element.id + '_HeatmapTitle', new TextBasic(titlePositionX(this.availableSize.width - this.margin.left - this.margin.right, this.margin.left, this.margin.right, titleStyle), this.margin.top + ((this.elementSize.height) * 3 / 4), anchor, this.titleCollection), titleStyle, titleStyle.color || this.themeStyle.heatMapTitle);
            if (this.titleCollection.length > 1) {
                this.drawSvgCanvas.createWrapText(options, titleStyle, this.svgObject);
            }
            else {
                this.drawSvgCanvas.createText(options, this.svgObject, this.titleCollection[0]);
                if (this.titleCollection[0].indexOf('...') !== -1 && this.enableCanvasRendering) {
                    this.tooltipCollection.push(new CanvasTooltip(this.titleSettings.text, new Rect(this.margin.left, this.margin.top, this.elementSize.width, this.elementSize.height)));
                }
            }
        }
    };
    HeatMap.prototype.titleTooltip = function (event, x, y, isTouch) {
        var targetId = event.target.id;
        if ((targetId === (this.element.id + '_HeatmapTitle')) && (event.target.textContent.indexOf('...') > -1)) {
            showTooltip(this.titleSettings.text, x, y, this.element.offsetWidth, this.element.id + '_Title_Tooltip', getElement(this.element.id + '_Secondary_Element'), isTouch, this);
        }
        else {
            removeElement(this.element.id + '_Title_Tooltip');
        }
    };
    // eslint-disable-next-line
    HeatMap.prototype.axisTooltip = function (event, x, y, isTouch) {
        var targetId = event.target.id;
        if ((targetId.indexOf(this.element.id + '_XAxis_Label') !== -1) ||
            (targetId.indexOf(this.element.id + '_YAxis_Label') !== -1) ||
            (targetId.indexOf(this.element.id + '_XAxis_MultiLevel') !== -1) ||
            (targetId.indexOf(this.element.id + '_YAxis_MultiLevel') !== -1)) {
            var tooltipText = getTooltipText(this.tooltipCollection, x, y);
            if (tooltipText) {
                showTooltip(tooltipText, x, y, this.element.offsetWidth, this.element.id + '_axis_Tooltip', getElement(this.element.id + '_Secondary_Element'), this.isTouch, this);
            }
            else {
                removeElement(this.element.id + '_axis_Tooltip');
            }
        }
        else {
            removeElement(this.element.id + '_axis_Tooltip');
        }
    };
    HeatMap.prototype.isHeatmapRect = function (x, y) {
        var firstRectDetails = [];
        var lastRectDetails = [];
        var isRect;
        var borderBoundary = 5;
        if (this.heatMapSeries.rectPositionCollection.length > 0) {
            firstRectDetails.push(this.heatMapSeries.rectPositionCollection[0][0]);
            lastRectDetails.push(this.heatMapSeries.rectPositionCollection[this.yLength - 1][this.xLength - 1]);
        }
        if (firstRectDetails.length > 0 && lastRectDetails.length > 0) {
            if (this.cellSettings.border.width > borderBoundary && (x >= firstRectDetails[0].x && y >= firstRectDetails[0].y &&
                x <= (lastRectDetails[0].x + lastRectDetails[0].width) &&
                y <= (lastRectDetails[0].y + lastRectDetails[0].height)) && this.cellSettings.tileType === 'Rect') {
                var currentRect = this.heatMapSeries.getCurrentRect(x, y);
                var rectHeight = lastRectDetails[0].height;
                var rectWidth = lastRectDetails[0].width;
                var cellBorder = this.cellSettings.border.width / 2;
                if ((x >= (currentRect.x + cellBorder) && (y >= (currentRect.y + cellBorder)) &&
                    (x <= (currentRect.x + (rectWidth - cellBorder)) &&
                        (y <= (currentRect.y + (rectHeight - cellBorder)))))) {
                    isRect = true;
                    this.isRectBoundary = true;
                }
                else {
                    isRect = false;
                    this.isRectBoundary = false;
                }
            }
            else {
                isRect = (x >= firstRectDetails[0].x && y >= firstRectDetails[0].y &&
                    x <= (lastRectDetails[0].x + lastRectDetails[0].width) &&
                    y <= (lastRectDetails[0].y + lastRectDetails[0].height));
                this.isRectBoundary = isRect;
            }
        }
        return isRect;
    };
    HeatMap.prototype.setTheme = function () {
        /*! Set theme */
        this.themeStyle = getThemeColor(this.theme);
    };
    HeatMap.prototype.calculateBounds = function () {
        var margin = this.margin;
        // Title Height;
        var titleHeight = 0;
        var padding = (this.legendModule && this.legendSettings.position === 'Top'
            && this.legendVisibilityByCellType) || this.titleSettings.textStyle.size === '0px' ? 0 : 16; // title padding
        var left = margin.left;
        var width = this.availableSize.width - left - margin.right;
        if ((this.paletteSettings.colorGradientMode === 'Column' || this.paletteSettings.colorGradientMode === 'Row') &&
            this.paletteSettings.type === 'Gradient') {
            if (this.paletteSettings.palette.length === 0) {
                this.legendVisibilityByCellType = false;
            }
            else {
                for (var i = 0; i < this.paletteSettings.palette.length; i++) {
                    if (this.paletteSettings.palette[i].value !== null || '') {
                        this.legendVisibilityByCellType = true;
                    }
                    else if (this.paletteSettings.palette[i].value === null || '') {
                        this.legendVisibilityByCellType = false;
                        break;
                    }
                }
            }
        }
        if (this.titleSettings.text) {
            var titleText = this.enableHtmlSanitizer ? SanitizeHtmlHelper.sanitize(this.titleSettings.text) :
                this.titleSettings.text;
            this.titleCollection = getTitle(titleText, this.titleSettings.textStyle, width);
            titleHeight = (measureText(titleText, this.titleSettings.textStyle).height * this.titleCollection.length) +
                padding;
        }
        var top = margin.top + titleHeight;
        this.titleRect = new Rect(margin.left, margin.top, this.availableSize.width - margin.left - margin.right, titleHeight);
        var height = this.availableSize.height - top - margin.bottom;
        this.initialClipRect = new Rect(left, top, width, height);
        var legendTop = this.initialClipRect.y;
        if (this.legendModule && this.legendSettings.visible && this.legendVisibilityByCellType) {
            this.legendModule.calculateLegendBounds(this.initialClipRect);
        }
        this.heatMapAxis.measureAxis(this.initialClipRect);
        if (this.legendModule && this.legendSettings.visible && this.legendVisibilityByCellType) {
            this.legendModule.calculateLegendSize(this.initialClipRect, legendTop);
        }
        this.heatMapAxis.calculateAxisSize(this.initialClipRect);
    };
    HeatMap.prototype.refreshBound = function () {
        this.updateBubbleHelperProperty();
        this.calculateBounds();
        this.renderElements();
    };
    HeatMap.prototype.initAxis = function () {
        var axis;
        var axes = [this.xAxis, this.yAxis];
        this.axisCollections = [];
        for (var i = 0, len = axes.length; i < len; i++) {
            axis = axes[i];
            axis.orientation = (i === 0) ? 'Horizontal' : 'Vertical';
            axis.jsonCellLabel = [];
            this.axisCollections.push(axis);
        }
    };
    /**
     * Method to bind events for HeatMap
     */
    HeatMap.prototype.wireEvents = function () {
        var _this = this;
        /*! Find the Events type */
        // eslint-disable-next-line
        var isIE11Pointer = Browser.isPointer;
        var start = Browser.touchStartEvent;
        var stop = Browser.touchEndEvent;
        var move = Browser.touchMoveEvent;
        var cancel = isIE11Pointer ? 'pointerleave' : 'mouseleave';
        EventHandler.add(this.element, Browser.isDevice ? start : 'click', this.heatMapMouseClick, this);
        EventHandler.add(this.element, 'contextmenu', this.heatMapMouseRightClick, this);
        EventHandler.add(this.element, 'dblclick', this.heatMapMouseDoubleClick, this);
        EventHandler.add(this.element, start, this.heatMapMouseMove, this);
        EventHandler.add(this.element, stop, this.heatMapMouseLeave, this);
        EventHandler.add(this.element, move, this.heatMapMouseMove, this);
        EventHandler.add(this.element, cancel, this.heatMapMouseLeave, this);
        EventHandler.add(this.element, 'keyup', this.heatMapKeyUp, this);
        EventHandler.add(this.element, 'keydown', this.heatMapKeyDown, this);
        this.resizeEvent = this.heatMapResize.bind(this);
        window.addEventListener((Browser.isTouch && ('orientation' in window && 'onorientationchange' in window)) ? 'orientationchange' : 'resize', this.resizeEvent);
        // eslint-disable-next-line
        var heatmap = this;
        /**
         * Support for touch tapHold and tap for HeatMap
         */
        this.touchInstance = new Touch(this.element, {
            tapHold: function (e) {
                var targetId = e.originalEvent.target.id;
                if ((targetId.indexOf(_this.element.id + '_HeatMapRect_') !== -1 || targetId.indexOf(_this.element.id + '_HeatMapRectLabels_') !== -1) && _this.allowSelection) {
                    heatmap.isCellTapHold = true;
                    var selectedCellCollection = [];
                    for (var i = 0; i < _this.multiCellCollection.length; i++) {
                        selectedCellCollection.push(_this.multiCellCollection[i]);
                    }
                    if (!e.originalEvent.ctrlKey || !_this.enableMultiSelect) {
                        _this.multiCellCollection = [];
                    }
                    heatmap.getDataCollection();
                    var argData = {
                        heatmap: heatmap,
                        cancel: false,
                        name: 'cellSelected',
                        data: heatmap.multiCellCollection
                    };
                    heatmap.trigger('cellSelected', argData);
                    if (!argData.cancel) {
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        if (e.ctrlKey === false || !_this.enableMultiSelect) {
                            _this.removeSelectedCellsBorder(false);
                        }
                        heatmap.currentRect.allowCollection = false;
                    }
                    else {
                        _this.multiCellCollection = selectedCellCollection;
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        if (_this.multiCellCollection.length > 0 || e.ctrlKey === false || !_this.enableMultiSelect) {
                            _this.removeSelectedCellsBorder(true);
                        }
                    }
                    heatmap.setCellOpacity();
                    window.clearTimeout(_this.tooltipTimer);
                    heatmap.tooltipOnMouseMove(null, heatmap.currentRect, heatmap.isCellTapHold);
                }
            },
            // eslint-disable-next-line @typescript-eslint/tslint/config
            tap: function (e) {
                var targetId = e.originalEvent.target.id;
                if ((targetId.indexOf(_this.element.id + '_HeatMapRect_') !== -1 || targetId.indexOf(_this.element.id + '_HeatMapRectLabels_') !== -1 || targetId.indexOf(_this.element.id + '_CellSelection_Container_') !== -1)) {
                    var isCellTap = false;
                    if (!heatmap.isCellTapHold) {
                        isCellTap = true;
                    }
                    var pageX = void 0;
                    var pageY = void 0;
                    var touchArg = void 0;
                    var elementRect = _this.element.getBoundingClientRect();
                    if (e.originalEvent.type === 'touchend' || e.originalEvent.type === 'touchstart') {
                        _this.isTouch = true;
                        touchArg = e.originalEvent;
                        pageX = touchArg.changedTouches[0].clientX;
                        pageY = touchArg.changedTouches[0].clientY;
                    }
                    else {
                        _this.isTouch = false;
                        pageX = e.originalEvent.clientX;
                        pageY = e.originalEvent.clientY;
                    }
                    pageX -= elementRect.left;
                    pageY -= elementRect.top;
                    var currentRect = _this.heatMapSeries.getCurrentRect(pageX, pageY);
                    window.clearTimeout(_this.tooltipTimer);
                    heatmap.tooltipOnMouseMove(null, currentRect, isCellTap);
                }
            }
        });
        this.setStyle(this.element);
    };
    /**
     * Applying styles for heatmap element
     */
    HeatMap.prototype.setStyle = function (element) {
        element.style.touchAction = 'element';
        element.style.touchAction = 'element';
        element.style.zoom = 'none';
        element.style.userSelect = 'none';
        element.style.webkitUserSelect = 'none';
        element.style.position = 'relative';
        element.style.display = 'block';
    };
    /**
     * This method is used to print the rendered heatmap.
     */
    HeatMap.prototype.print = function () {
        var exportChart = new ExportUtils(this);
        exportChart.print();
    };
    /**
     * Method to unbind events for HeatMap
     */
    HeatMap.prototype.unWireEvents = function () {
        /*! Find the Events type */
        // eslint-disable-next-line
        var isIE11Pointer = Browser.isPointer;
        var start = Browser.touchStartEvent;
        var stop = Browser.touchEndEvent;
        var move = Browser.touchMoveEvent;
        var cancel = isIE11Pointer ? 'pointerleave' : 'mouseleave';
        EventHandler.remove(this.element, Browser.isDevice ? start : 'click', this.heatMapMouseClick);
        EventHandler.remove(this.element, 'contextmenu', this.heatMapMouseRightClick);
        EventHandler.remove(this.element, 'dblclick', this.heatMapMouseDoubleClick);
        EventHandler.remove(this.element, start, this.heatMapMouseMove);
        EventHandler.remove(this.element, stop, this.heatMapMouseLeave);
        EventHandler.remove(this.element, move, this.heatMapMouseMove);
        EventHandler.remove(this.element, cancel, this.heatMapMouseLeave);
        EventHandler.remove(this.element, 'keyup', this.heatMapKeyUp);
        EventHandler.remove(this.element, 'keydown', this.heatMapKeyDown);
        window.removeEventListener((Browser.isTouch && ('orientation' in window && 'onorientationchange' in window)) ? 'orientationchange' : 'resize', this.resizeEvent);
    };
    /**
     * Handles the heatmap resize.
     *
     * @returns {boolean}
     * @private
     */
    // eslint-disable-next-line
    HeatMap.prototype.heatMapResize = function (e) {
        var _this = this;
        this.resizing = true;
        var argData = {
            heatmap: this,
            cancel: false,
            name: 'resized',
            currentSize: new Size(0, 0),
            previousSize: new Size(this.availableSize.width, this.availableSize.height)
        };
        if (this.resizeTimer) {
            clearTimeout(this.resizeTimer);
        }
        this.resizeTimer = setTimeout(function () {
            if (_this.isDestroyed) {
                clearTimeout(_this.resizeTimer);
                return;
            }
            _this.createSvg();
            argData.currentSize = _this.availableSize;
            _this.trigger('resized', argData);
            _this.refreshBound();
            _this.appendSvgObject();
            if (_this.allowSelection) {
                _this.updateCellSelection();
            }
            _this.trigger('loaded', ({ heatmap: _this }));
            _this.resizing = false;
        }, 500);
        return false;
    };
    /**
     * Method to bind selection after window resize for HeatMap
     */
    HeatMap.prototype.updateCellSelection = function () {
        var wSize = this.initialClipRect.width / this.axisCollections[0].axisLabelSize;
        var hSize = this.initialClipRect.height / this.axisCollections[1].axisLabelSize;
        var x = this.initialClipRect.x;
        var y = this.initialClipRect.y;
        if (!this.enableCanvasRendering) {
            if (this.multiCellCollection.length !== 0) {
                var containersRect = document.getElementById(this.element.id + '_Container_RectGroup');
                var containerText = document.getElementById(this.element.id + '_Container_TextGroup');
                for (var i = 0; i < containersRect.childNodes.length; i++) {
                    containersRect.childNodes[i].setAttribute('opacity', '0.3');
                    if (this.cellSettings.showLabel && containerText.childNodes[i]) {
                        containerText.childNodes[i].setAttribute('opacity', '0.3');
                    }
                }
                for (var i = 0; i < this.multiCellCollection.length; i++) {
                    var collectionClass = this.multiCellCollection[i].cellElement;
                    var cellIndex = collectionClass.id.replace(this.element.id + '_HeatMapRect_', '');
                    var index = parseInt(cellIndex, 10);
                    containersRect.childNodes[index].setAttribute('opacity', '1');
                    if (this.cellSettings.showLabel && containerText.childNodes[i]) {
                        var getText = document.getElementById(this.element.id + '_HeatMapRectLabels_' + index);
                        if (getText) {
                            getText.setAttribute('opacity', '1');
                        }
                        this.addSvgClass(containersRect.childNodes[index]);
                    }
                }
            }
        }
        else if (this.enableCanvasRendering) {
            var rect = this.multiCellCollection;
            var oldCanvas = document.getElementById(this.element.id + '_canvas');
            var newCanvas = document.getElementById(this.element.id + '_secondary_canvas');
            var initialRect = this.initialClipRect;
            var rectHeight = initialRect.y + initialRect.height;
            var rectWidth = initialRect.x + initialRect.width;
            for (var i = 0; i < this.multiCellCollection.length; i++) {
                this.multiCellCollection[i].width = rect[i].width = wSize;
                this.multiCellCollection[i].height = rect[i].height = hSize;
                this.multiCellCollection[i].x = rect[i].x = x + wSize * this.multiCellCollection[i].xPosition;
                this.multiCellCollection[i].y = rect[i].y = y + hSize * this.multiCellCollection[i].yPosition;
                var rectImage = oldCanvas.getContext('2d').getImageData(rect[i].x, rect[i].y, rect[i].width, rect[i].height);
                newCanvas.getContext('2d').putImageData(rectImage, rect[i].x, rect[i].y);
                oldCanvas.style.opacity = '0.3';
            }
            var topPositions = oldCanvas.getContext('2d').getImageData(0, 0, this.availableSize.width, initialRect.y);
            newCanvas.getContext('2d').putImageData(topPositions, 0, 0);
            var bottomPositions = oldCanvas.getContext('2d').getImageData(0, rectHeight, this.availableSize.width, this.availableSize.height - rectHeight);
            newCanvas.getContext('2d').putImageData(bottomPositions, 0, initialRect.y + initialRect.height);
            var rightPosition = oldCanvas.getContext('2d').
                getImageData(rectWidth, 0, this.availableSize.width - rectWidth, this.availableSize.height);
            newCanvas.getContext('2d').putImageData(rightPosition, rectWidth, 0);
            var leftPosition = oldCanvas.getContext('2d').getImageData(0, 0, initialRect.x, this.availableSize.height);
            newCanvas.getContext('2d').putImageData(leftPosition, 0, 0);
            removeElement(this.element.id + '_selectedCells');
        }
    };
    HeatMap.prototype.clearSVGSelection = function () {
        var rect = document.getElementById(this.element.id + '_Container_RectGroup');
        var text = document.getElementById(this.element.id + '_Container_TextGroup');
        for (var i = 0; i < rect.childNodes.length; i++) {
            var elementClassName = rect.childNodes[i].getAttribute('class');
            if (elementClassName === this.element.id + '_selected') {
                this.removeSvgClass(rect.childNodes[i], elementClassName);
            }
            rect.childNodes[i].setAttribute('opacity', '1');
            if (this.cellSettings.showLabel && text.childNodes[i]) {
                text.childNodes[i].setAttribute('opacity', '1');
            }
        }
    };
    /**
     * Get the maximum length of data source for both horizontal and vertical
     *
     * @private
     */
    HeatMap.prototype.calculateMaxLength = function () {
        var dataSource = this.completeAdaptDataSource;
        if (dataSource && dataSource.length > 0) {
            var xAxisMax = dataSource.length - 1;
            var yAxisMax = 0;
            for (var i = 0; i <= xAxisMax; i++) {
                var length_1 = dataSource[i].length;
                yAxisMax = yAxisMax > length_1 ? yAxisMax : length_1;
            }
            this.axisCollections[0].maxLength = xAxisMax;
            this.axisCollections[1].maxLength = yAxisMax - 1;
        }
        else {
            this.axisCollections[0].maxLength = 0;
            this.axisCollections[1].maxLength = 0;
        }
    };
    /**
     * To find mouse x, y for aligned heatmap element svg position
     */
    HeatMap.prototype.setMouseXY = function (pageX, pageY) {
        var rect = this.element.getBoundingClientRect();
        var svgCanvasRect;
        if (this.enableCanvasRendering) {
            svgCanvasRect = document.getElementById(this.element.id + '_canvas').getBoundingClientRect();
        }
        else {
            svgCanvasRect = document.getElementById(this.element.id + '_svg').getBoundingClientRect();
        }
        this.mouseX = (pageX - rect.left) - Math.max(svgCanvasRect.left - rect.left, 0);
        this.mouseY = (pageY - rect.top) - Math.max(svgCanvasRect.top - rect.top, 0);
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    HeatMap.prototype.triggerClickEvent = function (e, isDoubleClick, hasRightClicked) {
        var pageX;
        var pageY;
        var touchArg;
        var elementRect = this.element.getBoundingClientRect();
        if (e.type === 'touchstart') {
            if (!isDoubleClick) {
                this.isTouch = true;
            }
            touchArg = e;
            pageY = touchArg.changedTouches[0].clientY;
            pageX = touchArg.changedTouches[0].clientX;
        }
        else {
            if (!isDoubleClick) {
                this.isTouch = false;
            }
            pageY = e.clientY;
            pageX = e.clientX;
        }
        pageX -= elementRect.left;
        pageY -= elementRect.top;
        var isheatmapRect = this.isHeatmapRect(pageX, pageY);
        if (isheatmapRect) {
            var currentRect = this.heatMapSeries.getCurrentRect(pageX, pageY);
            this.trigger(isDoubleClick ? 'cellDoubleClick' : 'cellClick', {
                heatmap: this,
                value: currentRect.value,
                x: currentRect.x,
                y: currentRect.y,
                xLabel: this.heatMapSeries.hoverXAxisLabel,
                yLabel: this.heatMapSeries.hoverYAxisLabel,
                xValue: this.heatMapSeries.hoverXAxisValue,
                yValue: this.heatMapSeries.hoverYAxisValue,
                cellElement: this.enableCanvasRendering ? null : document.getElementById(currentRect.id),
                hasRightClicked: hasRightClicked,
                event: e
            });
        }
        return { x: pageX, y: pageY };
    };
    HeatMap.prototype.heatMapMouseRightClick = function (e) {
        this.triggerClickEvent(e, false, true);
    };
    HeatMap.prototype.heatMapMouseDoubleClick = function (e) {
        this.triggerClickEvent(e, true, false);
    };
    /**
     * @param {PointerEvent} e - Specifies the event.
     * @returns {boolean} Returns the boolean that that the heatmap is clicked or not
     * @private
     */
    HeatMap.prototype.heatMapMouseClick = function (e) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        var position = this.triggerClickEvent(e, false, false);
        var pageX = position.x;
        var pageY = position.y;
        this.notify('click', e);
        if (this.isHeatmapRect(pageX, pageY) && this.currentRect) {
            var rectElement = document.getElementById(this.currentRect.id);
            if (!isNullOrUndefined(rectElement)) {
                rectElement.focus();
            }
        }
        if (this.paletteSettings.type !== 'Gradient' && this.legendModule
            && this.legendSettings.visible && this.legendVisibilityByCellType) {
            var page = this.legendModule.navigationCollections;
            if (page.length && pageX > page[0].x && pageX < page[0].x + page[0].width &&
                pageY > page[0].y && pageY < page[0].y + page[0].height) {
                this.legendModule.translatePage(this, this.legendModule.currentPage, true);
            }
            else if (page.length && pageX > page[1].x && pageX < page[1].x + page[1].width &&
                pageY > page[1].y && pageY < page[1].y + page[1].height) {
                this.legendModule.translatePage(this, this.legendModule.currentPage, false);
            }
            var legendRange = this.legendModule.legendRange;
            var legendTextRange = this.legendModule.legendTextRange;
            var loop = true;
            for (var i = 0; i < legendRange.length; i++) {
                if (this.legendModule && this.legendSettings.toggleVisibility &&
                    this.legendModule.currentPage === legendRange[i].currentPage) {
                    if ((loop && (pageX >= legendRange[i].x
                        && pageX <= legendRange[i].width + legendRange[i].x) &&
                        (pageY >= legendRange[i].y && pageY <= legendRange[i].y + legendRange[i].height) ||
                        ((this.legendSettings.showLabel && this.legendSettings.labelDisplayType !== 'None' &&
                            pageX >= legendTextRange[i].x
                            && pageX <= legendTextRange[i].width + legendTextRange[i].x) &&
                            (pageY >= legendTextRange[i].y
                                && pageY <= legendTextRange[i].y + legendTextRange[i].height)))) {
                        this.legendModule.legendRangeSelection(i);
                        loop = false;
                    }
                }
            }
        }
        return false;
    };
    /**
     * Handles the mouse Move.
     *
     * @returns {boolean}
     *
     * @private
     */
    HeatMap.prototype.heatMapMouseMove = function (e) {
        var pageX;
        var pageY;
        var touchArg;
        var elementRect = this.element.getBoundingClientRect();
        if (e.type === 'touchmove' || e.type === 'touchstart') {
            this.isTouch = true;
            touchArg = e;
            pageX = touchArg.changedTouches[0].clientX;
            pageY = touchArg.changedTouches[0].clientY;
        }
        else {
            this.isTouch = false;
            pageX = e.clientX;
            pageY = e.clientY;
        }
        this.removeFocus('none');
        pageX -= elementRect.left;
        pageY -= elementRect.top;
        this.setMouseXY(pageX, pageY);
        this.mouseAction(e, pageX, pageY, touchArg, elementRect);
        return true;
    };
    /**
     * Handles the mouse Move.
     *
     * @returns {boolean}
     */
    HeatMap.prototype.mouseAction = function (e, pageX, pageY, touchArg, elementRect) {
        var tooltipText;
        if (e.target && e.target.id) {
            var isheatmapRect = this.isHeatmapRect(pageX, pageY);
            if (this.legendModule) {
                if (isheatmapRect) {
                    if (this.paletteSettings.type === 'Gradient' &&
                        this.legendSettings.showGradientPointer && this.legendSettings.visible && this.legendVisibilityByCellType) {
                        this.legendModule.renderGradientPointer(e, pageX, pageY);
                    }
                }
                else {
                    this.legendModule.removeGradientPointer();
                }
                this.renderMousePointer(pageX, pageY);
            }
            var isshowTooltip = void 0;
            var currentRect = void 0;
            isshowTooltip = this.showTooltip && this.tooltipModule ? isheatmapRect : false;
            if (isheatmapRect) {
                currentRect = this.heatMapSeries.getCurrentRect(pageX, pageY);
                if (e.which !== 2 && e.which !== 3) {
                    isshowTooltip = this.cellSelectionOnMouseMove(e, currentRect, pageX, pageY, isshowTooltip);
                }
            }
            this.tooltipOnMouseMove(e, currentRect, isshowTooltip, isheatmapRect);
            if (this.legendModule && this.legendSettings.visible && this.paletteSettings.type === 'Fixed' &&
                this.legendSettings.enableSmartLegend && this.legendSettings.labelDisplayType === 'None') {
                this.legendModule.createTooltip(pageX, pageY);
            }
            if (!this.enableCanvasRendering) {
                if (this.titleSettings.text && this.titleSettings.textStyle.textOverflow === 'Trim') {
                    this.titleTooltip(e, pageX, pageY, this.isTouch);
                }
                this.axisTooltip(e, pageX, pageY, this.isTouch);
                if (this.legendModule && this.legendSettings.visible && this.legendSettings.showLabel && this.legendVisibilityByCellType) {
                    this.legendModule.renderLegendLabelTooltip(e, pageX, pageY);
                }
                if (this.legendModule && this.legendSettings.visible && this.legendVisibilityByCellType) {
                    this.legendModule.renderLegendTitleTooltip(e, pageX, pageY);
                }
            }
            else {
                // eslint-disable-next-line
                elementRect = this.element.getBoundingClientRect();
                var tooltipRect = (this.paletteSettings.type === 'Fixed' && this.legendSettings.enableSmartLegend &&
                    this.legendSettings.labelDisplayType === 'None') ? false : true;
                tooltipText = getTooltipText(this.tooltipCollection, pageX, pageY) || (this.legendModule && tooltipRect &&
                    (!isNullOrUndefined(this.legendModule.legendLabelTooltip) &&
                        getTooltipText(this.legendModule.legendLabelTooltip, pageX, pageY)
                        || !isNullOrUndefined(this.legendModule.legendTitleTooltip) &&
                            getTooltipText(this.legendModule.legendTitleTooltip, pageX, pageY)));
                if (tooltipText) {
                    showTooltip(tooltipText, pageX, pageY, this.element.offsetWidth, this.element.id + '_canvas_Tooltip', getElement(this.element.id + '_Secondary_Element'), this.isTouch, this);
                }
                else {
                    removeElement(this.element.id + '_canvas_Tooltip');
                }
            }
        }
        return true;
    };
    /**
     * Triggering cell selection
     */
    HeatMap.prototype.cellSelectionOnMouseMove = function (e, currentRect, pageX, pageY, isshowTooltip) {
        if ((this.cellSettings.tileType === 'Rect' && e.type === 'mousedown' || e.type === 'touchstart'
            || e.type === 'pointerdown') && this.allowSelection) {
            this.previousRect = currentRect;
            this.multiSelection = true;
            this.rectSelected = true;
            this.initialCellX = pageX;
            this.initialCellY = pageY;
            e.preventDefault();
        }
        if (this.cellSettings.tileType === 'Rect' && this.multiSelection && currentRect) {
            isshowTooltip = false;
            this.highlightSelectedCells(this.previousRect, currentRect, pageX, pageY, e);
        }
        return isshowTooltip;
    };
    /**
     * Rendering tooltip on mouse move
     */
    HeatMap.prototype.tooltipOnMouseMove = function (e, currentRect, isshowTooltip, isheatmapRect) {
        var _this = this;
        if (isshowTooltip && currentRect) {
            if (this.tempTooltipRectId !== currentRect.id) {
                if (this.showTooltip) {
                    if ((this.cellSettings.enableCellHighlighting || (this.tooltipModule && this.showTooltip))
                        && !this.enableCanvasRendering) {
                        this.heatMapSeries.highlightSvgRect(currentRect.id);
                    }
                    if (this.tooltipTimer && !isNullOrUndefined(e) && (e.type === 'touchstart' || e.type === 'touchmove')) {
                        window.clearTimeout(this.tooltipTimer);
                        this.tooltipTimer = null;
                    }
                    this.tooltipModule.renderTooltip(currentRect);
                    var tooltipObject_1 = this.tooltipModule.tooltipObject;
                    if (this.isTouch) {
                        this.tooltipTimer = setTimeout(function () {
                            if (!isNullOrUndefined(tooltipObject_1) &&
                                !isNullOrUndefined(document.getElementById(tooltipObject_1.element.id))
                                && !isNullOrUndefined(document.getElementById(tooltipObject_1.element.id).firstChild)) {
                                tooltipObject_1.fadeOut();
                            }
                            _this.tooltipModule.isFadeout = true;
                            window.clearTimeout(_this.tooltipTimer);
                            _this.tooltipTimer = null;
                        }, 1500);
                        if (e) {
                            if (e.type === 'touchmove') {
                                if (e.cancelable) {
                                    e.preventDefault();
                                }
                            }
                        }
                    }
                }
                this.tempTooltipRectId = currentRect.id;
            }
        }
        else {
            if (e !== null) {
                var borderBoundary = 5;
                if (!isheatmapRect) {
                    if ((this.cellSettings.enableCellHighlighting || this.showTooltip) && !this.enableCanvasRendering &&
                        this.cellSettings.border.width < borderBoundary) {
                        this.heatMapSeries.highlightSvgRect(e.target.id);
                    }
                    if (this.tooltipModule && this.showTooltip) {
                        this.tooltipModule.showHideTooltip(false, true);
                    }
                }
                else if (!this.showTooltip && this.cellSettings.border.width > borderBoundary) {
                    this.heatMapSeries.highlightSvgRect(e.target.id);
                }
            }
            this.tempTooltipRectId = '';
        }
    };
    /**
     * To select the multiple cells on mouse move action
     */
    HeatMap.prototype.highlightSelectedCells = function (previousRect, currentRect, pageX, pageY, e) {
        var pXIndex = previousRect.xIndex;
        var pYIndex = previousRect.yIndex;
        var cXIndex = currentRect.xIndex;
        var cYIndex = currentRect.yIndex;
        this.currentRect = currentRect;
        this.selectedCellsRect = new Rect(0, 0, 0, 0);
        this.selectedCellsRect.x = previousRect.x > currentRect.x ? currentRect.x : previousRect.x;
        this.selectedCellsRect.y = previousRect.y > currentRect.y ? currentRect.y : previousRect.y;
        this.selectedCellsRect.width = ((previousRect.x > currentRect.x ? (pXIndex - cXIndex) :
            (cXIndex - pXIndex)) + 1) * currentRect.width;
        this.selectedCellsRect.height = ((previousRect.y > currentRect.y ? (pYIndex - cYIndex) :
            (cYIndex - pYIndex)) + 1) * currentRect.height;
        if (e.type === 'touchstart' && this.multiCellCollection.length === 0 && !this.isCellTapHold) {
            this.isCellTapHold = true;
        }
        else {
            this.isCellTapHold = false;
        }
        e.preventDefault();
        var x = this.initialCellX > pageX ? pageX : this.initialCellX;
        var y = this.initialCellY > pageY ? pageY : this.initialCellY;
        var rect = new Rect(x - this.initialClipRect.x, y - this.initialClipRect.y, Math.abs(pageX - this.initialCellX), Math.abs(pageY - this.initialCellY));
        if (((rect.width > 0) && this.enableMultiSelect && e.ctrlKey === false)) {
            this.removeSelectedCellsBorder(false);
            var tooltipElement = document.getElementById(this.element.id + 'Celltooltipcontainer_svg');
            if (tooltipElement) {
                this.tooltipModule.tooltipObject = null;
                tooltipElement.setAttribute('opacity', '0');
            }
        }
        var parentDiv = document.getElementById(this.element.id + '_CellSelection_Container');
        var svgObject = this.renderer.createSvg({
            id: this.element.id + '_CellSelection_Container_svg',
            width: this.initialClipRect.width,
            height: this.initialClipRect.height
        });
        parentDiv.appendChild(svgObject);
        var parent = document.getElementById(this.element.id + '_CellSelection_Container_svg');
        if (this.enableMultiSelect) {
            var rectItems = new RectOption(this.element.id + '_selectedCells', '#87ceeb', { color: 'transparent', width: 1 }, 1, rect, '#0000ff');
            parent.appendChild(this.renderer.drawRectangle(rectItems));
            document.getElementById(this.element.id + '_selectedCells').style.opacity = '0.5';
        }
    };
    /**
     * Method to get selected cell data collection for HeatMap
     */
    HeatMap.prototype.getDataCollection = function () {
        if (!isNullOrUndefined(this.previousRect) && !isNullOrUndefined(this.currentRect)) {
            var pXIndex = this.previousRect.xIndex;
            var pYIndex = this.previousRect.yIndex;
            var cXIndex = this.currentRect.xIndex;
            var cYIndex = this.currentRect.yIndex;
            var minX = cXIndex > pXIndex ? pXIndex : cXIndex;
            var maxX = cXIndex > pXIndex ? cXIndex : pXIndex;
            var minY = cYIndex > pYIndex ? pYIndex : cYIndex;
            var maxY = cYIndex > pYIndex ? cYIndex : pYIndex;
            var tempX = minX;
            var tempY = minY;
            var cellX = this.previousRect.x;
            var cellY = this.previousRect.y;
            this.getCellCollection(this.currentRect, this.previousRect, true, tempX, tempY, maxX, maxY, minX, cellX, cellY);
            tempX = minX;
            tempY = minY;
            cellX = this.previousRect.x;
            cellY = this.previousRect.y;
            this.checkSelectedCells();
            this.getCellCollection(this.currentRect, this.previousRect, false, tempX, tempY, maxX, maxY, minX, cellX, cellY);
            this.selectedMultiCellCollection = [];
            this.canvasSelectedCells = new Rect(0, 0, 0, 0);
            this.selectedCellCount = 0;
        }
    };
    /**
     * To get the selected datas.
     */
    HeatMap.prototype.getCellCollection = function (currentRect, previousRect, singleCellData, tempX, tempY, maxX, maxY, minX, cellX, cellY) {
        var xIndex = Math.abs((currentRect.xIndex === previousRect.xIndex ?
            0 : currentRect.xIndex - previousRect.xIndex)) + 1;
        var yIndex = Math.abs((currentRect.yIndex === previousRect.yIndex ?
            0 : currentRect.yIndex - previousRect.yIndex)) + 1;
        for (var i = 0; i < (xIndex * yIndex); i++) {
            if (singleCellData) {
                this.getSelectedCellData(cellX, cellY, true);
            }
            else {
                this.getSelectedCellData(cellX, cellY, false);
            }
            if (tempX < maxX) {
                cellX += currentRect.xIndex > previousRect.xIndex ? currentRect.width : -currentRect.width;
                tempX++;
            }
            else if (tempY < maxY) {
                cellY += currentRect.yIndex > previousRect.yIndex ? currentRect.height : -currentRect.height;
                cellX = previousRect.x;
                tempX = minX;
            }
        }
    };
    /**
     * To remove the selection on mouse click without ctrl key.
     */
    HeatMap.prototype.removeSelectedCellsBorder = function (isSelectionCancel) {
        if (!this.enableCanvasRendering) {
            var containerRect = document.getElementById(this.element.id + '_Container_RectGroup');
            var containerText = document.getElementById(this.element.id + '_Container_TextGroup');
            for (var i = 0; i < containerRect.childNodes.length; i++) {
                var elementClassName = containerRect.childNodes[i].getAttribute('class');
                if (isSelectionCancel) {
                    containerRect.childNodes[i].setAttribute('opacity', '1');
                    if (this.cellSettings.showLabel && containerText.childNodes[i]) {
                        containerText.childNodes[i].setAttribute('opacity', '1');
                        this.removeSvgClass(containerRect.childNodes[i], elementClassName);
                    }
                }
                else {
                    containerRect.childNodes[i].setAttribute('opacity', '0.3');
                    if (this.cellSettings.showLabel && containerText.childNodes[i]) {
                        containerText.childNodes[i].setAttribute('opacity', '0.3');
                        this.removeSvgClass(containerRect.childNodes[i], elementClassName);
                    }
                }
            }
        }
        else {
            var ctx = this.secondaryCanvasRenderer.ctx;
            for (var i = 0; i < this.previousSelectedCellsRect.length; i++) {
                var rect = this.previousSelectedCellsRect[i];
                ctx.save();
                ctx.clearRect(rect.x - 1, rect.y - 1, rect.width + 2, rect.height + 2);
                ctx.restore();
            }
            for (var i = 0; i < this.multiCellCollection.length; i++) {
                var rects = this.multiCellCollection[i];
                if (this.multiCellCollection.length > 0) {
                    ctx.save();
                    ctx.clearRect(rects.x - 1, rects.y - 1, rects.width + 2, rects.height + 2);
                }
            }
        }
    };
    /**
     * To highlight the selected multiple cells on mouse move action in canvas mode.
     */
    HeatMap.prototype.highlightSelectedAreaInCanvas = function (rect) {
        if (rect.x) {
            var oldCanvas = document.getElementById(this.element.id + '_canvas');
            var newCanvas = document.getElementById(this.element.id + '_secondary_canvas');
            var initialRect = this.initialClipRect;
            var rectImage = oldCanvas.getContext('2d').getImageData(rect.x, rect.y, rect.width, rect.height);
            newCanvas.getContext('2d').putImageData(rectImage, rect.x, rect.y);
            oldCanvas.style.opacity = '0.3';
            var topPosition = oldCanvas.getContext('2d').getImageData(0, 0, this.availableSize.width, initialRect.y);
            newCanvas.getContext('2d').putImageData(topPosition, 0, 0);
            var bottomPosition = oldCanvas.getContext('2d').getImageData(0, initialRect.y + initialRect.height, this.availableSize.width, this.availableSize.height - (initialRect.y + initialRect.height));
            newCanvas.getContext('2d').putImageData(bottomPosition, 0, initialRect.y + initialRect.height);
            var rightPosition = oldCanvas.getContext('2d').getImageData(initialRect.x + initialRect.width, 0, this.availableSize.width - (initialRect.x + initialRect.width), this.availableSize.height);
            newCanvas.getContext('2d').putImageData(rightPosition, initialRect.x + initialRect.width, 0);
            var leftPosition = oldCanvas.getContext('2d').getImageData(0, 0, initialRect.x, this.availableSize.height);
            newCanvas.getContext('2d').putImageData(leftPosition, 0, 0);
        }
    };
    /**
     * To get the collection of selected cells.
     */
    HeatMap.prototype.getSelectedCellData = function (cellX, cellY, cellCollection) {
        var xAxis = this.axisCollections[0];
        var yAxis = this.axisCollections[1];
        var xLabels = xAxis.tooltipLabels;
        var yLabels = yAxis.tooltipLabels.slice().reverse();
        var rectPosition = this.heatMapSeries.getCurrentRect(cellX + 1, cellY + 1);
        var currentRect = document.getElementById(rectPosition.id);
        var cellDetails = new SelectedCellDetails(null, '', '', 0, 0, null, 0, 0, 0, 0, 0, 0);
        cellDetails.value = rectPosition.value;
        cellDetails.xLabel = xLabels[rectPosition.xIndex].toString();
        cellDetails.yLabel = yLabels[rectPosition.yIndex].toString();
        cellDetails.xValue = xAxis.labelValue[rectPosition.xIndex];
        cellDetails.yValue = yAxis.labelValue.slice().reverse()[rectPosition.yIndex];
        cellDetails.cellElement = this.enableCanvasRendering ? null : currentRect;
        cellDetails.xPosition = rectPosition.xIndex;
        cellDetails.yPosition = rectPosition.yIndex;
        cellDetails.width = this.currentRect.width;
        cellDetails.height = this.currentRect.height;
        cellDetails.x = this.currentRect.x;
        cellDetails.y = this.currentRect.y;
        this.currentRect.allowCollection = true;
        this.addSvgClass(currentRect);
        if (cellCollection) {
            this.selectedMultiCellCollection.push(cellDetails);
            this.currentRect.allowCollection = false;
        }
        else {
            for (var i = 0; i < this.multiCellCollection.length; i++) {
                if (this.multiCellCollection[i].xPosition === cellDetails.xPosition &&
                    this.multiCellCollection[i].yPosition === cellDetails.yPosition) {
                    this.currentRect.allowCollection = false;
                    if (this.selectedCellCount === this.selectedMultiCellCollection.length) {
                        this.currentRect.allowCollection = false;
                        if (!this.enableCanvasRendering) {
                            for (var j = 0; j < this.selectedMultiCellCollection.length; j++) {
                                var rectElement = this.selectedMultiCellCollection[j].cellElement;
                                if (rectElement) {
                                    var index = rectElement.id.replace(this.element.id + '_HeatMapRect_', '');
                                    // eslint-disable-next-line
                                    var containerText = document.getElementById(this.element.id + '_Container_TextGroup');
                                    var elementClassName = rectElement.getAttribute('class');
                                    rectElement.setAttribute('opacity', '0.3');
                                    var getText = document.getElementById(this.element.id + '_HeatMapRectLabels_' + index);
                                    if (getText) {
                                        getText.setAttribute('opacity', '0.3');
                                    }
                                    this.removeSvgClass(rectElement, elementClassName);
                                }
                            }
                        }
                        else {
                            var ctx = this.secondaryCanvasRenderer.ctx;
                            var rect = this.canvasSelectedCells;
                            ctx.save();
                            ctx.clearRect(rect.x - 1, rect.y - 1, rect.width + 2, rect.height + 2);
                            ctx.restore();
                            this.selectedCellsRect = new Rect(0, 0, 0, 0);
                        }
                        this.multiCellCollection.splice(i, 1);
                    }
                }
            }
        }
        if (rectPosition.visible && !isNullOrUndefined(rectPosition.value) && this.currentRect.allowCollection === true) {
            this.multiCellCollection.push(cellDetails);
        }
    };
    /**
     * To add class for selected cells
     *
     * @private
     */
    HeatMap.prototype.addSvgClass = function (element) {
        if (!this.enableCanvasRendering) {
            var className = this.element.id + '_selected';
            element.classList.add(className);
        }
    };
    /**
     * To remove class for unselected cells
     *
     * @private
     */
    HeatMap.prototype.removeSvgClass = function (rectElement, className) {
        if (className) {
            rectElement.setAttribute('class', className.replace(className, ''));
        }
    };
    /**
     * This method is used to clear the cell selection in the heatmap.
     * {% codeBlock src='heatmap/clearSelection/index.md' %}{% endcodeBlock %}
     */
    HeatMap.prototype.clearSelection = function () {
        if (!this.enableCanvasRendering && this.allowSelection) {
            this.clearSVGSelection();
        }
        if (this.enableCanvasRendering) {
            var ctx = this.secondaryCanvasRenderer.ctx;
            for (var i = 0; i < this.previousSelectedCellsRect.length; i++) {
                ctx.save();
                ctx.clearRect(this.previousSelectedCellsRect[i].x - 1, this.previousSelectedCellsRect[i].y - 1, this.previousSelectedCellsRect[i].width + 2, this.previousSelectedCellsRect[i].height + 2);
                ctx.restore();
            }
            for (var i = 0; i < this.multiCellCollection.length; i++) {
                var rects = this.multiCellCollection[i];
                if (this.multiCellCollection.length > 0) {
                    ctx.save();
                    ctx.clearRect(rects.x - 1, rects.y - 1, rects.width + 2, rects.height + 2);
                }
            }
            var canvas = document.getElementById(this.element.id + '_canvas');
            canvas.style.opacity = '1';
        }
        this.tempMultiCellCollection = [];
        this.multiCellCollection = [];
        this.rectSelected = false;
    };
    HeatMap.prototype.renderMousePointer = function (pageX, pageY) {
        var legendRange = this.legendModule.legendRange;
        var legendTextRange = this.legendModule.legendTextRange;
        var loop = true;
        for (var i = 0; i < legendRange.length; i++) {
            if (this.legendSettings.toggleVisibility && this.legendModule.currentPage === legendRange[i].currentPage) {
                if ((loop && (pageX >= legendRange[i].x
                    && pageX <= legendRange[i].width + legendRange[i].x) &&
                    (pageY >= legendRange[i].y && pageY <= legendRange[i].y + legendRange[i].height) ||
                    ((this.legendSettings.showLabel && this.legendSettings.labelDisplayType !== 'None' &&
                        pageX >= legendTextRange[i].x
                        && pageX <= legendTextRange[i].width + legendTextRange[i].x) &&
                        (pageY >= legendTextRange[i].y
                            && pageY <= legendTextRange[i].y + legendTextRange[i].height)))) {
                    if (this.enableCanvasRendering) {
                        document.getElementById(this.element.id + '_canvas').style.cursor = 'Pointer';
                    }
                    else {
                        document.getElementById(this.element.id + '_svg').style.cursor = 'Pointer';
                        var legendLabelTooltipContainer = document.getElementById(this.element.id + 'legendLabelTooltipContainer');
                        if (!isNullOrUndefined(legendLabelTooltipContainer)) {
                            legendLabelTooltipContainer.style.cursor = 'Pointer';
                        }
                    }
                    loop = false;
                }
                else if (loop) {
                    if (this.enableCanvasRendering) {
                        document.getElementById(this.element.id + '_canvas').style.cursor = '';
                    }
                    else {
                        document.getElementById(this.element.id + '_svg').style.cursor = '';
                    }
                }
            }
        }
    };
    /**
     * Handles the mouse end.
     *
     * @returns {boolean}
     * @private
     */
    HeatMap.prototype.heatMapMouseLeave = function (e) {
        var _this = this;
        if (e.target && e.target.id &&
            (this.cellSettings.enableCellHighlighting || (this.tooltipModule && this.showTooltip))
            && !this.enableCanvasRendering) {
            this.heatMapSeries.highlightSvgRect(this.tempTooltipRectId);
        }
        if (this.allowSelection && this.multiSelection) {
            this.multiSelection = false;
            if (e.type === 'mouseup' || e.type === 'mouseleave' || e.type === 'touchend' || e.type === 'pointerup') {
                if (e.which !== 2 && e.which !== 3) {
                    if (this.isCellTapHold === false) {
                        var rect = void 0;
                        var selectionRect = document.getElementById(this.element.id + '_selectedCells');
                        if (!isNullOrUndefined(selectionRect)) {
                            var rectBound = selectionRect.getClientRects()[0];
                            rect = new Rect(rectBound.left, rectBound.top, rectBound.width, rectBound.height);
                        }
                        else {
                            var pageX = void 0;
                            var pageY = void 0;
                            var touchArg = void 0;
                            var elementRect = this.element.getBoundingClientRect();
                            if (e.type === 'touchend') {
                                this.isTouch = true;
                                touchArg = e;
                                pageY = touchArg.changedTouches[0].clientY;
                                pageX = touchArg.changedTouches[0].clientX;
                            }
                            else {
                                this.isTouch = false;
                                pageY = e.clientY;
                                pageX = e.clientX;
                            }
                            pageX -= elementRect.left;
                            pageY -= elementRect.top;
                            var x = this.initialCellX > pageX ? pageX : this.initialCellX;
                            var y = this.initialCellY > pageY ? pageY : this.initialCellY;
                            rect = new Rect(x - this.initialClipRect.x, y - this.initialClipRect.y, Math.abs(pageX - this.initialCellX) !== 0 ? Math.abs(pageX - this.initialCellX) :
                                Math.abs(pageY - this.initialCellY), Math.abs(pageY - this.initialCellY));
                        }
                        if (!(rect.width > 0 && !this.enableMultiSelect)) {
                            var selectedCellCollection = [];
                            for (var i = 0; i < this.multiCellCollection.length; i++) {
                                selectedCellCollection.push(this.multiCellCollection[i]);
                            }
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            if (e.ctrlKey === false || !this.enableMultiSelect) {
                                this.multiCellCollection = [];
                            }
                            this.getDataCollection();
                            var argData = {
                                heatmap: this,
                                cancel: false,
                                name: 'cellSelected',
                                data: this.multiCellCollection
                            };
                            this.trigger('cellSelected', argData);
                            if (!argData.cancel) {
                                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                if (e.ctrlKey === false || !this.enableMultiSelect) {
                                    this.removeSelectedCellsBorder(false);
                                }
                                this.currentRect.allowCollection = false;
                            }
                            else {
                                this.multiCellCollection = selectedCellCollection;
                                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                if (this.multiCellCollection.length > 0 || e.ctrlKey === false || !this.enableMultiSelect) {
                                    this.removeSelectedCellsBorder(true);
                                }
                            }
                            this.setCellOpacity();
                            if (e.type === 'touchend') {
                                window.clearTimeout(this.tooltipTimer);
                                this.tooltipOnMouseMove(null, this.currentRect, true);
                            }
                        }
                    }
                    else {
                        this.isCellTapHold = false;
                    }
                }
            }
        }
        if (this.tooltipModule && this.showTooltip && e.type === 'mouseleave') {
            this.tooltipModule.showHideTooltip(false);
        }
        this.tempTooltipRectId = '';
        if (this.legendModule && this.legendSettings.visible && this.legendModule.tooltipObject &&
            this.legendModule.tooltipObject.element) {
            var tooltipElement_1 = this.legendModule.tooltipObject.element.firstChild;
            if (e.type === 'mouseleave') {
                tooltipElement_1.setAttribute('opacity', '0');
            }
            else {
                if (this.legendTooltipTimer) {
                    window.clearTimeout(this.legendTooltipTimer);
                }
                this.legendTooltipTimer = setTimeout(function () {
                    tooltipElement_1.setAttribute('opacity', '0');
                }, 1500);
            }
        }
        if (this.paletteSettings.type === 'Gradient' && this.legendModule && this.legendSettings.showGradientPointer &&
            this.legendSettings.visible && this.legendVisibilityByCellType) {
            if (e.type === 'mouseleave') {
                this.legendModule.removeGradientPointer();
            }
            else {
                if (this.gradientTimer) {
                    window.clearTimeout(this.gradientTimer);
                }
                this.gradientTimer = setTimeout(function () { _this.legendModule.removeGradientPointer(); }, 1500);
            }
        }
        if (this.enableCanvasRendering) {
            var main = document.getElementById(this.element.id + '_hoverRect_canvas');
            if (main) {
                main.style.visibility = 'hidden';
                this.tempRectHoverClass = '';
            }
        }
        if (this.titleSettings.text && this.titleCollection[0].indexOf('...') !== -1) {
            if (e.cancelable) {
                e.preventDefault();
            }
            if (!this.isTouch) {
                if (!this.enableCanvasRendering) {
                    removeElement(this.element.id + '_Title_Tooltip');
                }
                else {
                    removeElement(this.element.id + '_canvas_Tooltip');
                }
            }
        }
        return true;
    };
    /**
     * This method is used to perform operations when keyboard up on Heatmap.
     *
     * @param {KeyboardEvent} e - Specifies the keyboard event on Heatmap.
     * @returns {void}
     * @private
     */
    HeatMap.prototype.heatMapKeyUp = function (e) {
        if (e.code !== 'Tab') {
            return;
        }
        this.removeFocus('none');
        if (this.tooltipModule) {
            this.tooltipModule.showHideTooltip(false);
        }
        var targetElement = e.target;
        var isRect = targetElement.id.indexOf('HeatMapRect') > -1;
        var isLegend = targetElement.id.indexOf('Legend') > -1;
        var toHighlightCells = this.cellSettings.enableCellHighlighting;
        if (toHighlightCells && !isLegend && !this.rectSelected) {
            this.heatMapSeries.highlightSvgRect(targetElement.id);
        }
        else if ((isRect && this.allowSelection) || (isLegend && this.legendSettings.toggleVisibility) || targetElement.id.indexOf('arrow') > -1) {
            targetElement.style.outline = '2px solid black';
            targetElement.classList.add('keyboard-focused');
        }
    };
    /**
     * This method is used to perform operations when keyboard down on Heatmap.
     *
     * @param {KeyboardEvent} e - Specifies the keyboard event on Heatmap.
     * @returns {void}
     * @private
     */
    HeatMap.prototype.heatMapKeyDown = function (e) {
        if (e.code !== 'Enter') {
            return;
        }
        if (!e.ctrlKey) {
            this.multiCellCollection = [];
        }
        this.removeFocus('none');
        var targetElement = e.target;
        if (this.allowSelection && (targetElement.id.indexOf('HeatMapRect') > -1) && this.cellSettings.tileType === 'Rect') {
            this.previousRect = this.currentRect = this.getRectElement(targetElement.id);
            this.removeSelectedCellsBorder(false);
            this.getDataCollection();
            this.setCellOpacity();
            this.rectSelected = true;
        }
        else if (this.legendModule && this.legendSettings.visible) {
            var index = this.calculateLegendIndex(targetElement);
            if (!isNullOrUndefined(index)) {
                this.legendModule.legendRangeSelection(index);
            }
            targetElement = document.getElementById(targetElement.id);
            this.handleArrowNavigation(targetElement);
            targetElement.setAttribute('tabindex', '0');
            targetElement.focus();
        }
    };
    /**
     * Method to find the legend index.
     */
    HeatMap.prototype.calculateLegendIndex = function (targetElement) {
        if (this.legendSettings.toggleVisibility) {
            if (targetElement.id.indexOf('Legend_Index') > -1) {
                return parseFloat(targetElement.id.split('Legend_Index_')[1]);
            }
            if (targetElement.id.indexOf('_Smart_Legend_Group_') > -1) {
                return parseFloat(targetElement.id.split('_Smart_Legend_Group_')[1]);
            }
        }
        return null;
    };
    /**
     * Method to handle arrow navigation in legend.
     */
    HeatMap.prototype.handleArrowNavigation = function (targetElement) {
        if (targetElement.id.indexOf('arrow') > -1) {
            var currentPage = this.legendModule.currentPage;
            var maxPage = this.legendColorCollection.length / this.legendModule.listPerPage;
            if (currentPage < maxPage && targetElement.id.indexOf('rightarrow') > -1) {
                this.legendModule.translatePage(this, currentPage, true);
            }
            else if (currentPage <= maxPage && targetElement.id.indexOf('leftarrow') > -1) {
                this.legendModule.translatePage(this, currentPage, false);
            }
        }
    };
    /**
     * Method to return Current rect.
     */
    HeatMap.prototype.getRectElement = function (id) {
        var rectCollection = this.heatMapSeries.rectPositionCollection;
        for (var i = 0; i < rectCollection.length; i++) {
            for (var j = 0; j < rectCollection[i].length; j++) {
                if (rectCollection[i][j].id === id) {
                    return rectCollection[i][j];
                }
            }
        }
        return null;
    };
    /**
     * Method to remove the highlight outline.
     */
    HeatMap.prototype.removeFocus = function (outline) {
        var highlightedElement = document.querySelector('.keyboard-focused');
        if (highlightedElement) {
            highlightedElement.style.outline = outline;
            highlightedElement.classList.remove('keyboard-focused');
        }
    };
    /**
     * Method to Check for deselection of cell.
     */
    HeatMap.prototype.checkSelectedCells = function () {
        if (!this.enableCanvasRendering) {
            for (var i = 0; i < this.multiCellCollection.length; i++) {
                for (var j = 0; j < this.selectedMultiCellCollection.length; j++) {
                    if (this.selectedMultiCellCollection[j].cellElement.getAttribute('id')
                        === this.multiCellCollection[i].cellElement.getAttribute('id')) {
                        this.selectedCellCount++;
                    }
                }
            }
        }
        else {
            this.canvasSelectedCells = new Rect(0, 0, 0, 0);
            this.canvasSelectedCells.x = this.selectedCellsRect.x;
            this.canvasSelectedCells.y = this.selectedCellsRect.y;
            this.canvasSelectedCells.width = this.selectedCellsRect.width;
            this.canvasSelectedCells.height = this.selectedCellsRect.height;
            for (var i = 0; i < this.multiCellCollection.length; i++) {
                for (var j = 0; j < this.selectedMultiCellCollection.length; j++) {
                    if (this.selectedMultiCellCollection[j].xPosition === this.multiCellCollection[i].xPosition &&
                        this.selectedMultiCellCollection[j].yPosition === this.multiCellCollection[i].yPosition) {
                        this.selectedCellCount++;
                    }
                }
            }
            if (this.legendModule && this.rectSelected && this.paletteSettings.type === 'Gradient') {
                this.legendModule.removeGradientPointer();
            }
        }
    };
    /**
     * Method to remove opacity for text of selected cell for HeatMap
     */
    HeatMap.prototype.removeOpacity = function (containersRect, containerText) {
        for (var i = 0; i < containersRect.childNodes.length; i++) {
            containersRect.childNodes[i].setAttribute('opacity', '0.3');
            if (this.cellSettings.showLabel && containerText.childNodes[i]) {
                containerText.childNodes[i].setAttribute('opacity', '0.3');
            }
        }
    };
    /**
     * Method to set opacity for selected cell for HeatMap
     */
    HeatMap.prototype.setCellOpacity = function () {
        if (!this.enableCanvasRendering) {
            if (this.multiCellCollection.length !== 0) {
                this.tempMultiCellCollection.push(this.multiCellCollection);
                var containersRect = document.getElementById(this.element.id + '_Container_RectGroup');
                var containerText = document.getElementById(this.element.id + '_Container_TextGroup');
                this.removeOpacity(containersRect, containerText);
                for (var i = 0; i < this.multiCellCollection.length; i++) {
                    var collectionClasss = this.multiCellCollection[i].cellElement;
                    var index = parseInt(collectionClasss.id.replace(this.element.id + '_HeatMapRect_', ''), 10);
                    containersRect.childNodes[index].setAttribute('opacity', '1');
                    containersRect.childNodes[index].setAttribute('tabindex', '0');
                    if (this.cellSettings.showLabel) {
                        var getText = document.getElementById(this.element.id + '_HeatMapRectLabels_' + index);
                        if (getText) {
                            getText.setAttribute('opacity', '1');
                        }
                    }
                }
            }
        }
        else {
            this.previousSelectedCellsRect.push(this.selectedCellsRect);
            this.highlightSelectedAreaInCanvas(this.selectedCellsRect);
        }
        removeElement(this.element.id + '_selectedCells');
    };
    /**
     * To create div container for rendering two layers of canvas.
     *
     * @returns {void}
     * @private
     */
    HeatMap.prototype.createMultiCellDiv = function (onLoad) {
        if (onLoad) {
            var divElement = this.createElement('div', {
                id: this.element.id + '_Multi_CellSelection_Canvas'
            });
            divElement.style.position = 'relative';
            this.element.appendChild(divElement);
            this.svgObject.style.position = 'absolute';
            this.svgObject.style.left = '0px';
            this.svgObject.style.top = '0px';
            this.svgObject.style.zIndex = '0';
        }
        else {
            var secondaryCanvas = void 0;
            secondaryCanvas = document.getElementById(this.element.id + '_secondary_canvas');
            if (isNullOrUndefined(secondaryCanvas)) {
                secondaryCanvas = this.secondaryCanvasRenderer.createCanvas({
                    width: this.availableSize.width,
                    height: this.availableSize.height, x: 0, y: 0
                });
            }
            secondaryCanvas.style.cssText = 'position: relative; z-index: 1';
            this.element.appendChild(secondaryCanvas);
        }
    };
    __decorate([
        Property(null)
    ], HeatMap.prototype, "width", void 0);
    __decorate([
        Property(null)
    ], HeatMap.prototype, "height", void 0);
    __decorate([
        Property(true)
    ], HeatMap.prototype, "showTooltip", void 0);
    __decorate([
        Event()
    ], HeatMap.prototype, "tooltipRender", void 0);
    __decorate([
        Event()
    ], HeatMap.prototype, "resized", void 0);
    __decorate([
        Event()
    ], HeatMap.prototype, "loaded", void 0);
    __decorate([
        Event()
    ], HeatMap.prototype, "cellRender", void 0);
    __decorate([
        Event()
    ], HeatMap.prototype, "cellSelected", void 0);
    __decorate([
        Property('SVG')
    ], HeatMap.prototype, "renderingMode", void 0);
    __decorate([
        Property(null)
    ], HeatMap.prototype, "dataSource", void 0);
    __decorate([
        Complex({}, Data)
    ], HeatMap.prototype, "dataSourceSettings", void 0);
    __decorate([
        Property(null)
    ], HeatMap.prototype, "backgroundColor", void 0);
    __decorate([
        Property('Material')
    ], HeatMap.prototype, "theme", void 0);
    __decorate([
        Property(false)
    ], HeatMap.prototype, "allowSelection", void 0);
    __decorate([
        Property(true)
    ], HeatMap.prototype, "enableMultiSelect", void 0);
    __decorate([
        Property(false)
    ], HeatMap.prototype, "enableHtmlSanitizer", void 0);
    __decorate([
        Complex({}, Margin)
    ], HeatMap.prototype, "margin", void 0);
    __decorate([
        Complex({ text: '', textStyle: Theme.heatMapTitleFont }, Title)
    ], HeatMap.prototype, "titleSettings", void 0);
    __decorate([
        Complex({}, Axis)
    ], HeatMap.prototype, "xAxis", void 0);
    __decorate([
        Complex({ position: 'Right' }, LegendSettings)
    ], HeatMap.prototype, "legendSettings", void 0);
    __decorate([
        Complex({}, PaletteSettings)
    ], HeatMap.prototype, "paletteSettings", void 0);
    __decorate([
        Complex({}, TooltipSettings)
    ], HeatMap.prototype, "tooltipSettings", void 0);
    __decorate([
        Complex({}, Axis)
    ], HeatMap.prototype, "yAxis", void 0);
    __decorate([
        Complex({}, CellSettings)
    ], HeatMap.prototype, "cellSettings", void 0);
    __decorate([
        Event()
    ], HeatMap.prototype, "created", void 0);
    __decorate([
        Event()
    ], HeatMap.prototype, "load", void 0);
    __decorate([
        Event()
    ], HeatMap.prototype, "cellClick", void 0);
    __decorate([
        Event()
    ], HeatMap.prototype, "cellDoubleClick", void 0);
    __decorate([
        Event()
    ], HeatMap.prototype, "legendRender", void 0);
    HeatMap = __decorate([
        NotifyPropertyChanges
    ], HeatMap);
    return HeatMap;
}(Component));
export { HeatMap };
