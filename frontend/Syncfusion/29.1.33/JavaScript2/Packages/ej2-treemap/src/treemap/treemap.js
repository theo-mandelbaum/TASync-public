/**
 * Tree Map Components
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
import { Component, NotifyPropertyChanges, Property, extend, Fetch, SanitizeHtmlHelper } from '@syncfusion/ej2-base';
import { Complex, Collection } from '@syncfusion/ej2-base';
import { Event, Internationalization } from '@syncfusion/ej2-base';
import { SvgRenderer } from '@syncfusion/ej2-svg-base';
import { isNullOrUndefined, createElement, EventHandler, Browser, remove } from '@syncfusion/ej2-base';
import { Border, Margin, TitleSettings, LegendSettings, InitialDrillSettings } from './model/base';
import { SelectionSettings, TooltipSettings, LevelSettings, LeafItemSettings, HighlightSettings } from './model/base';
import { Size, stringToNumber, RectOption, Rect, textTrim, measureText, findChildren, removeElement, setItemTemplateContent, legendMaintain, removeLegend } from '../treemap/utils/helper';
import { removeClassNames, textFormatter } from '../treemap/utils/helper';
import { findPosition, TextOption, renderTextElement, isContainsData, TreeMapAjax } from '../treemap/utils/helper';
import { load, loaded, drillStart, drillEnd } from '../treemap/model/constants';
import { itemClick, itemMove, click, mouseMove, resize, doubleClick, rightClick } from '../treemap/model/constants';
import { LayoutPanel } from './layout/render-panel';
import { DataManager, Query } from '@syncfusion/ej2-data';
import { getThemeStyle } from './model/theme';
import { Print } from './model/print';
import { ImageExport } from './model/image-export';
import { PdfExport } from './model/pdf-export';
/**
 * Represents the treemap control. It is used to visualize both hierarchical and flat data.
 * ```html
 * <div id="container"/>
 * <script>
 *   var treemap = new TreeMap();
 *   treemap.appendTo("#container");
 * </script>
 * ```
 */
var TreeMap = /** @class */ (function (_super) {
    __extends(TreeMap, _super);
    /**
     * Constructor for TreeMap.
     *
     * @param {TreeMapModel} options - Specifies the treemap instance.
     * @param {string | HTMLElement} element - Specifies the treemap element.
     */
    function TreeMap(options, element) {
        var _this = _super.call(this, options, element) || this;
        /**
         * resize the treemap
         */
        _this.isResize = false;
        /** @private */
        _this.orientation = 'Horizontal';
        /** @private */
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        _this.drilledItems = [];
        /** @private */
        _this.isHierarchicalData = false;
        /** @private */
        _this.levelSelection = [];
        /** @private */
        _this.legendId = [];
        return _this;
    }
    TreeMap.prototype.preRender = function () {
        var _this = this;
        this.trigger(load, { treemap: this }, function () {
            _this.initPrivateVariable();
            _this.unWireEVents();
            _this.createSvg();
            _this.wireEVents();
            _this.setCulture();
        });
    };
    TreeMap.prototype.render = function () {
        this.renderElements();
    };
    TreeMap.prototype.renderElements = function () {
        this.treemapLevelData = new LevelsData();
        this.treemapLevelData.levelsData = null;
        this.treemapLevelData.defaultLevelsData = null;
        this.treemapLevelData.hierarchyData = null;
        this.createSecondaryElement();
        this.addTabIndex();
        this.themeStyle = getThemeStyle(this.theme);
        this.renderBorder();
        this.renderTitle(this.titleSettings, 'title', null, null);
        if (!isNullOrUndefined(this.treemapLevelData.levelsData)) {
            this.treemapLevelData.defaultLevelsData = this.treemapLevelData.levelsData;
        }
        this.processDataManager();
    };
    TreeMap.prototype.processDataManager = function () {
        var _this = this;
        var dataModule;
        var queryModule;
        var fetchApiModule;
        var localAjax;
        if (this.dataSource instanceof DataManager) {
            dataModule = this.dataSource;
            queryModule = this.query instanceof Query ? this.query : new Query();
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            var dataManager = dataModule.executeQuery(queryModule);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            dataManager.then(function (e) {
                _this.dataSource = e['result'];
                _this.renderTreeMapElements();
            });
        }
        else if (this.dataSource instanceof TreeMapAjax) {
            localAjax = this.dataSource;
            fetchApiModule = new Fetch(localAjax.dataOptions, localAjax.type, localAjax.contentType);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            fetchApiModule.onSuccess = function (args) {
                if (!isNullOrUndefined(args.type) && args.type === 'application/octet-stream') {
                    var reader_1 = new FileReader();
                    // eslint-disable-next-line @typescript-eslint/no-this-alias
                    var treemap_1 = _this;
                    reader_1.onload = function () {
                        args = JSON.parse(reader_1.result.toString());
                        treemap_1.dataSource = args;
                        treemap_1.renderTreeMapElements();
                    };
                    reader_1.readAsText(args);
                }
                else {
                    _this.dataSource = args;
                    _this.renderTreeMapElements();
                }
            };
            fetchApiModule.send(localAjax.sendData);
        }
        else {
            this.renderTreeMapElements();
        }
    };
    TreeMap.prototype.renderTreeMapElements = function () {
        this.processingData();
        if (this.treeMapLegendModule && this.legendSettings.visible) {
            this.treeMapLegendModule.renderLegend();
        }
        this.layout.processLayoutPanel();
        this.element.appendChild(this.svgObject);
        if (!isNullOrUndefined(this.treeMapLegendModule) && this.legendSettings.visible) {
            legendMaintain(this, this.treeMapLegendModule.legendGroup);
        }
        this.elementChange();
        this.trigger(loaded, { treemap: this, isResized: this.isResize });
        this.isResize = false;
        this.renderComplete();
    };
    TreeMap.prototype.createSvg = function () {
        if (this.svgObject) {
            while (this.svgObject.childNodes.length > 0) {
                this.svgObject.removeChild(this.svgObject.firstChild);
            }
            if (!this.svgObject.hasChildNodes() && this.svgObject.parentNode) {
                remove(this.svgObject);
            }
        }
        if (isNullOrUndefined(this.renderer)) {
            this.renderer = new SvgRenderer(this.element.id);
        }
        if (isNullOrUndefined(this.layout)) {
            this.layout = new LayoutPanel(this);
        }
        this.clearTemplate();
        var containerWidth = this.element.clientWidth;
        var containerHeight = this.element.clientHeight;
        this.availableSize = new Size(stringToNumber(this.width, containerWidth) || containerWidth || 600, stringToNumber(this.height, containerHeight) || containerHeight || 450);
        this.svgObject = this.renderer.createSvg({
            id: this.element.id + '_svg',
            width: this.availableSize.width,
            height: this.availableSize.height
        });
    };
    /**
     * To initilize the private varibales of treemap.
     *
     * @returns {void}
     */
    TreeMap.prototype.initPrivateVariable = function () {
        if (this.element.id === '') {
            var collection = document.getElementsByClassName('e-treemap').length;
            this.element.id = 'treemap_control_' + collection;
        }
        this.renderer = new SvgRenderer(this.element.id);
        this.layout = new LayoutPanel(this);
    };
    TreeMap.prototype.createSecondaryElement = function () {
        var secondaryEle = document.getElementById(this.element.id + '_Secondary_Element');
        if (secondaryEle && secondaryEle.childElementCount > 0) {
            secondaryEle.parentNode.removeChild(secondaryEle);
        }
        if (isNullOrUndefined(document.getElementById(this.element.id + '_Secondary_Element'))) {
            var secondaryElement = createElement('div', {
                id: this.element.id + '_Secondary_Element'
            });
            secondaryElement.style.cssText = 'position: absolute;z-index:1;';
            this.element.appendChild(secondaryElement);
        }
    };
    TreeMap.prototype.elementChange = function () {
        if (this.treeMapLegendModule && this.legendSettings.visible && this.treeMapLegendModule.legendGroup && this.layout.layoutGroup
            && !isNullOrUndefined(this.svgObject) && !isNullOrUndefined(document.getElementById(this.layout.layoutGroup.id))
            && !isNullOrUndefined(document.getElementById(this.treeMapLegendModule.legendGroup.id))) {
            this.svgObject.insertBefore(this.layout.layoutGroup, this.treeMapLegendModule.legendGroup);
        }
    };
    /**
     * Render the treemap border
     *
     * @private
     * @returns {void}
     */
    TreeMap.prototype.renderBorder = function () {
        var width = this.border.width;
        var borderElement = this.svgObject.querySelector('#' + this.element.id + '_TreeMap_Border');
        if ((this.border.width > 0 || (this.background || this.themeStyle.backgroundColor)) && isNullOrUndefined(borderElement)) {
            var borderRect = new RectOption(this.element.id + '_TreeMap_Border', this.background || this.themeStyle.backgroundColor, this.border, 1, new Rect(width / 2, width / 2, this.availableSize.width - width, this.availableSize.height - width));
            this.svgObject.appendChild(this.renderer.drawRectangle(borderRect));
        }
        else if (borderElement) {
            borderElement.setAttribute('fill', this.background || this.themeStyle.backgroundColor);
        }
    };
    TreeMap.prototype.renderTitle = function (title, type, bounds, groupEle) {
        var style = {
            color: title.textStyle.color, size: title.textStyle.size, fontFamily: title.textStyle.fontFamily,
            fontStyle: title.textStyle.fontStyle, fontWeight: title.textStyle.fontWeight, opacity: title.textStyle.opacity
        };
        var height;
        var titlePadding = 10;
        var width = (this.availableSize.width - this.margin.right - this.margin.left);
        style.fontFamily = style.fontFamily || this.themeStyle.fontFamily;
        style.fontWeight = style.fontWeight || this.themeStyle.titleFontWeight;
        style.size = style.size || (type === 'title' ? this.themeStyle.fontSize : this.themeStyle.subtitleFontSize);
        if (title.text) {
            if (isNullOrUndefined(groupEle)) {
                groupEle = this.renderer.createGroup({ id: this.element.id + '_Title_Group' });
            }
            var titleText = this.enableHtmlSanitizer ? (SanitizeHtmlHelper.sanitize(title.text)) : title.text;
            var trimmedTitle = textTrim(width, titleText, style);
            var elementSize = measureText(trimmedTitle, style);
            var rect = (isNullOrUndefined(bounds)) ? new Rect(this.margin.left, this.margin.top, this.availableSize.width, this.availableSize.height) : bounds;
            var location_1 = findPosition(rect, title.alignment, elementSize, type);
            var options = new TextOption(this.element.id + '_TreeMap_' + type, location_1.x, location_1.y, 'start', trimmedTitle);
            var titleBounds = new Rect(location_1.x, location_1.y, elementSize.width, elementSize.height);
            var element = renderTextElement(options, style, style.color || (type === 'title' ? this.themeStyle.titleFontColor : this.themeStyle.subTitleFontColor), groupEle);
            element.setAttribute('aria-label', title.description || titleText);
            element.setAttribute('role', 'region');
            element.setAttribute('tabindex', this.tabIndex.toString());
            if ((type === 'title' && !title.subtitleSettings.text) || (type === 'subtitle')) {
                height = (this.availableSize.height - titleBounds.y - titlePadding - this.margin.bottom);
                this.areaRect = new Rect(this.margin.left, titleBounds.y + titlePadding, width, height);
            }
            if (type !== 'subtitle' && title.subtitleSettings.text) {
                this.renderTitle(title.subtitleSettings, 'subtitle', titleBounds, groupEle);
            }
            else {
                this.svgObject.appendChild(groupEle);
            }
        }
        else {
            height = (this.availableSize.height - this.margin.top - this.margin.bottom);
            this.areaRect = new Rect(this.margin.left, this.margin.top, width, height);
        }
    };
    TreeMap.prototype.processingData = function () {
        var _this = this;
        var path;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        this.dataSource = this.dataSource;
        if (!isNullOrUndefined(this.dataSource) && this.dataSource.length > 0 && this.weightValuePath) {
            this.treemapLevelData.levelsData = [];
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            this.dataSource.map(function (data) {
                data[_this.weightValuePath] = (data[_this.weightValuePath]) ? data[_this.weightValuePath].toString() :
                    data[_this.weightValuePath];
            });
            this.leafItemSettings.labelPath = this.leafItemSettings.labelPath || this.weightValuePath;
            this.checkIsHierarchicalData();
            if (this.levels.length === 0) {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                var data_1 = {};
                data_1['level'] = 0;
                path = this.leafItemSettings.labelPath;
                data_1[path] = [];
                for (var i = 0; i < this.dataSource.length; i++) {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    var child = findChildren(this.dataSource[i])['values'];
                    if (this.isHierarchicalData && child && child.length > 0) {
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        child.forEach(function (currentData) {
                            if (currentData[path]) {
                                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                data_1[path].push({
                                    groupIndex: 0, name: currentData[path],
                                    levelOrderName: currentData[path].toString(),
                                    data: currentData, weight: currentData[_this.weightValuePath]
                                });
                            }
                        });
                    }
                    else {
                        if (this.dataSource[i][path]) {
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            data_1[path].push({
                                groupIndex: 0, name: this.dataSource[i][path], levelOrderName: this.dataSource[i][path].toString(), data: this.dataSource[i],
                                weight: this.dataSource[i][this.weightValuePath]
                            });
                        }
                    }
                }
                this.treemapLevelData.levelsData.push(data_1);
            }
            else {
                if (this.isHierarchicalData) {
                    this.treemapLevelData.hierarchyData = [];
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    this.treemapLevelData.hierarchyData = extend([], this.dataSource, this.treemapLevelData.hierarchyData, true);
                    for (var i = 0; i < this.treemapLevelData.hierarchyData.length; i++) {
                        this.processHierarchicalData(this.treemapLevelData.hierarchyData[i], i);
                    }
                    this.treemapLevelData.levelsData = this.treemapLevelData.hierarchyData;
                }
                else {
                    this.processFlatJsonData();
                    if (this.treemapLevelData.levelsData.length > 1) {
                        this.reOrderLevelData(this.treemapLevelData.levelsData.length - 1);
                    }
                }
                path = this.levels[0].groupPath;
            }
            if (!this.isHierarchicalData) {
                this.findTotalWeight(this.treemapLevelData.levelsData[0][path], 'Parent');
            }
        }
    };
    TreeMap.prototype.checkIsHierarchicalData = function () {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        var child;
        this.dataSource = this.dataSource;
        for (var i = 0; i < this.dataSource.length; i++) {
            child = findChildren(this.dataSource[i])['values'];
            if (child && child.length) {
                this.isHierarchicalData = true;
                break;
            }
            else if (i === this.dataSource.length - 1) {
                this.isHierarchicalData = false;
            }
        }
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    TreeMap.prototype.processHierarchicalData = function (data, dataCount) {
        var _this = this;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        var childData;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        var newData = {};
        var levelIndex;
        var path = this.leafItemSettings.labelPath ? this.leafItemSettings.labelPath : this.weightValuePath;
        var key;
        newData = findChildren(data);
        childData = newData ? newData['values'] : null;
        if (childData && childData.length > 0) {
            key = newData['key'];
            for (var i = 0; i < this.levels.length; i++) {
                if (key === this.levels[i].groupPath) {
                    levelIndex = i;
                }
            }
            for (var j = 0; j < childData.length; j++) {
                childData[j]['name'] = childData[j][path];
                childData[j]['levelOrderName'] = (levelIndex === 0 ? childData[j]['name'] :
                    data['levelOrderName'] + '#' + childData[j]['name']) + '';
                var childItemLevel = childData[j]['levelOrderName'];
                var childLevel = void 0;
                if (childItemLevel.search('#') > 0) {
                    childLevel = childItemLevel.split('#').length - 1;
                }
                childData[j]['groupIndex'] = isNullOrUndefined(levelIndex) ? childLevel === this.levels.length
                    ? this.levels.length : childLevel : levelIndex;
                if (levelIndex !== 0) {
                    childData[j]['parent'] = data;
                }
                childData[j]['groupName'] = key;
                childData[j]['data'] = childData[j];
                childData[j]['isDrilled'] = false;
                childData[j]['weight'] = childData[j][this.weightValuePath];
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            childData.forEach(function (currentData) {
                _this.processHierarchicalData(currentData, dataCount);
            });
        }
        if (dataCount === this.treemapLevelData.hierarchyData.length - 1) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            var mainData_1 = this.treemapLevelData.hierarchyData[0][this.levels[0].groupPath];
            if (!isNullOrUndefined(mainData_1)) {
                for (var k = 0; k < this.treemapLevelData.hierarchyData.length; k++) {
                    childData = findChildren(this.treemapLevelData.hierarchyData[k])['values'];
                    if (k !== 0 && childData) {
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        childData.forEach(function (currentData) { mainData_1.push(currentData); });
                        this.treemapLevelData.hierarchyData.splice(k, 1);
                        k -= 1;
                    }
                }
                mainData_1 = this.treemapLevelData.hierarchyData[0][this.levels[0].groupPath];
                for (var l = 0; l < mainData_1.length; l++) {
                    newData[this.levels[0].groupPath] = mainData_1;
                    mainData_1[l]['parent'] = newData;
                }
            }
        }
    };
    /* eslint-disable valid-jsdoc */
    /**
     * This method is used to perform the print functionality in treemap.
     *
     * @param {string[] | string | Element} id - Specifies the element to print the treemap.
     * @returns {void}
     */
    TreeMap.prototype.print = function (id) {
        if (this.allowPrint && this.printModule) {
            this.printModule.print(this, id);
        }
    };
    /**
     * This method is used to perform the export functionality for the rendered treemap.
     *
     * @param {ExportType} type - Specifies the extension type of the exported document.
     * @param {string} fileName - Specifies file name for exporting the rendered TreeMap.
     * @param {PdfPageOrientation} orientation - Specifies the orientation of the PDF document.
     * @param {boolean} allowDownload - Specifies whether the exported file should be downloaded or not.
     * @returns {string} - Specifies the base64 string of the exported image which is returned when the allowDownload is set to false.
     */
    TreeMap.prototype.export = function (type, fileName, orientation, allowDownload) {
        var _this = this;
        if (isNullOrUndefined(allowDownload)) {
            allowDownload = true;
        }
        if (type === 'PDF' && this.allowPdfExport && this.pdfExportModule) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
            return new Promise(function (resolve, reject) {
                resolve(_this.pdfExportModule.export(_this, type, fileName, orientation, allowDownload));
            });
        }
        else if (this.allowImageExport && (type !== 'PDF') && this.imageExportModule) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
            return new Promise(function (resolve, reject) {
                resolve(_this.imageExportModule.export(_this, type, fileName, allowDownload));
            });
        }
        return null;
    };
    TreeMap.prototype.processFlatJsonData = function () {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        this.dataSource = this.dataSource;
        var groupPath;
        var orderNames = [];
        for (var i = 0; i < this.levels.length + 1; i++) {
            groupPath = this.levels[i] ? this.levels[i].groupPath : this.leafItemSettings.labelPath;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            var level = {};
            level['level'] = i;
            level[groupPath] = [];
            this.treemapLevelData.levelsData.push(level);
            for (var j = 0; j < this.dataSource.length; j++) {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                var currentData = {};
                var childName = '';
                if (!isNullOrUndefined(groupPath)) {
                    var name_1 = this.dataSource[j][groupPath];
                    if (i !== 0) {
                        for (var k = 0; k <= i; k++) {
                            var childGroupPath = this.levels[k] ? this.levels[k].groupPath : groupPath;
                            childName += (this.dataSource[j][childGroupPath]) + ((k === i) ? '' : '#');
                        }
                    }
                    if (!(orderNames.length > 0 ? orderNames.indexOf(childName ?
                        childName : name_1) !== -1 : false)) {
                        currentData['name'] = name_1;
                        currentData['levelOrderName'] = ((childName) ? childName : name_1) + '';
                        currentData['groupIndex'] = i;
                        currentData['isDrilled'] = false;
                        currentData['groupName'] = groupPath;
                        currentData['data'] = this.dataSource[j];
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any, max-len
                        this.treemapLevelData.levelsData[(this.treemapLevelData.levelsData.length - 1)][groupPath].push(currentData);
                        orderNames.push((childName) ? childName : name_1);
                    }
                }
            }
        }
    };
    /**
     * This method orders the treemap level data.
     *
     * @param {number} start - Specifies the start value of the treemap level.
     * @returns {void}
     * @private
     */
    TreeMap.prototype.reOrderLevelData = function (start) {
        var currentName;
        var currentPath = this.levels[start] ? this.levels[start].groupPath : this.leafItemSettings.labelPath;
        var prevPath = this.levels[start - 1].groupPath;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        var currentData = this.treemapLevelData.levelsData[start][currentPath];
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        var previousData = this.treemapLevelData.levelsData[start - 1][prevPath];
        for (var i = 0; i < currentData.length; i++) {
            currentName = currentData[i]['levelOrderName'];
            for (var j = 0; j < previousData.length; j++) {
                previousData[j][currentPath] = isNullOrUndefined(previousData[j][currentPath]) ?
                    [] : previousData[j][currentPath];
                if (this.IsChildHierarchy(currentName.split('#'), previousData[j]['levelOrderName'].split('#'))) {
                    if (isNullOrUndefined(currentData[i]['parent'])) {
                        currentData[i]['parent'] = previousData[j];
                    }
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    previousData[j][currentPath].push(currentData[i]);
                    break;
                }
            }
        }
        this.findTotalWeight(this.treemapLevelData.levelsData[this.treemapLevelData.levelsData.length - 1][currentPath], 'Child');
        this.treemapLevelData.levelsData.splice(start, 1);
        if ((start - 1) > 0) {
            this.reOrderLevelData(start - 1);
        }
    };
    TreeMap.prototype.IsChildHierarchy = function (current, previous) {
        var isChild = false;
        for (var i = 0; i < previous.length; i++) {
            if (current.length < i || previous[i] !== current[i]) {
                return false;
            }
            else {
                isChild = true;
            }
        }
        return isChild;
    };
    /**
     * This method finds the weight value of the treemap level.
     *
     * @param {any[]} processData - Specifies the treemap data.
     * @param {string} type - Specifies the type of the data.
     * @returns {void}
     * @private
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    TreeMap.prototype.findTotalWeight = function (processData, type) {
        var _this = this;
        var totalWeight;
        var split;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        var groupName;
        var groupObj = {};
        var _loop_1 = function (i) {
            totalWeight = 0;
            groupName = processData[i]['groupName'];
            split = processData[i]['levelOrderName'].split('#');
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            this_1.dataSource.forEach(function (data) {
                if (isContainsData(split, processData[i]['levelOrderName'], data, _this)) {
                    totalWeight += parseFloat(data[_this.weightValuePath]);
                }
            });
            if (type === 'Parent') {
                groupObj[groupName] = processData;
                processData[i]['parent'] = groupObj;
            }
            processData[i]['weight'] = totalWeight;
        };
        var this_1 = this;
        for (var i = 0; i < processData.length; i++) {
            _loop_1(i);
        }
    };
    /**
     * To unbind event handlers for treemap.
     *
     * @returns {void}
     * @private
     */
    TreeMap.prototype.unWireEVents = function () {
        EventHandler.remove(this.element, 'click', this.clickOnTreeMap);
        EventHandler.remove(this.element, 'dblclick', this.doubleClickOnTreeMap);
        EventHandler.remove(this.element, 'contextmenu', this.rightClickOnTreeMap);
        EventHandler.remove(this.element, Browser.touchStartEvent, this.mouseDownOnTreeMap);
        EventHandler.remove(this.element, Browser.touchMoveEvent, this.mouseMoveOnTreeMap);
        EventHandler.remove(this.element, Browser.touchEndEvent, this.mouseEndOnTreeMap);
        EventHandler.remove(this.element, 'pointerleave mouseleave', this.mouseLeaveOnTreeMap);
        EventHandler.remove(this.element, 'keydown', this.keyDownHandler);
        EventHandler.remove(this.element, 'keyup', this.keyUpHandler);
        EventHandler.remove(this.element, 'focusout', this.focusHandler);
        window.removeEventListener('resize', this.resizeEvent);
    };
    /**
     * To bind event handlers for treemap.
     *
     * @returns {void}
     */
    TreeMap.prototype.wireEVents = function () {
        EventHandler.add(this.element, 'click', this.clickOnTreeMap, this);
        EventHandler.add(this.element, 'dblclick', this.doubleClickOnTreeMap, this);
        EventHandler.add(this.element, 'contextmenu', this.rightClickOnTreeMap, this);
        EventHandler.add(this.element, Browser.touchStartEvent, this.mouseDownOnTreeMap, this);
        EventHandler.add(this.element, Browser.touchMoveEvent, this.mouseMoveOnTreeMap, this);
        EventHandler.add(this.element, Browser.touchEndEvent, this.mouseEndOnTreeMap, this);
        EventHandler.add(this.element, 'pointerleave mouseleave', this.mouseLeaveOnTreeMap, this);
        EventHandler.add(this.element, 'keydown', this.keyDownHandler, this);
        EventHandler.add(this.element, 'keyup', this.keyUpHandler, this);
        EventHandler.add(this.element, 'focusout', this.focusHandler, this);
        this.resizeEvent = this.resizeOnTreeMap.bind(this);
        window.addEventListener('resize', this.resizeEvent);
    };
    /**
     * Method to set culture for maps
     *
     * @returns {void}
     */
    TreeMap.prototype.setCulture = function () {
        this.intl = new Internationalization();
    };
    /**
     * To add tab index for treemap element
     *
     * @returns {void}
     */
    TreeMap.prototype.addTabIndex = function () {
        this.element.setAttribute('aria-label', this.description || 'TreeMap Element');
        this.element.setAttribute('role', 'region');
        this.element.setAttribute('tabindex', this.tabIndex.toString());
    };
    /**
     * This method handles the window resize event on treemap.
     *
     * @param {Event} e - Specifies the pointer event.
     * @returns {void}
     * @private
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    TreeMap.prototype.resizeOnTreeMap = function (e) {
        var _this = this;
        if (!this.isDestroyed) {
            this.isResize = true;
            var args_1 = {
                name: resize,
                cancel: false,
                previousSize: this.availableSize,
                currentSize: new Size(0, 0),
                treemap: this
            };
            if (this.resizeTo) {
                clearTimeout(this.resizeTo);
            }
            if (!isNullOrUndefined(this.element) && this.element.classList.contains('e-treemap')) {
                this.resizeTo = setTimeout(function () {
                    _this.unWireEVents();
                    _this.createSvg();
                    _this.refreshing = true;
                    _this.wireEVents();
                    args_1.currentSize = _this.availableSize;
                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                    _this.trigger(resize, args_1, function (observedArgs) {
                        _this.render();
                        _this.refreshing = false;
                    });
                }, 500);
            }
        }
    };
    /**
     * This method handles the click event on the treemap.
     *
     * @param {PointerEvent} e - Specifies the mouse click event in the treemap.
     * @returns {void}
     * @private
     */
    TreeMap.prototype.clickOnTreeMap = function (e) {
        var _this = this;
        var targetEle = e.target;
        var targetId = targetEle.id;
        var eventArgs;
        var itemIndex;
        var labelText = targetEle.innerHTML;
        var clickArgs = { cancel: false, name: click, treemap: this, mouseEvent: e };
        this.trigger(click, clickArgs);
        if (targetId.indexOf('_Item_Index') > -1) {
            e.preventDefault();
            itemIndex = parseFloat(targetId.split('_Item_Index_')[1]);
            eventArgs = {
                cancel: false, name: itemClick, treemap: this, item: this.layout.renderItems[itemIndex], mouseEvent: e,
                groupIndex: this.layout.renderItems[itemIndex]['groupIndex'], groupName: this.layout.renderItems[itemIndex]['name'],
                text: labelText, contentItemTemplate: labelText
            };
            this.trigger(itemClick, eventArgs, function (observedArgs) {
                if (observedArgs.text !== labelText || observedArgs.contentItemTemplate !== labelText) {
                    if (isNullOrUndefined(_this.leafItemSettings.labelTemplate)) {
                        observedArgs.text = textFormatter(observedArgs.text, observedArgs['item']['data'], observedArgs.treemap);
                        targetEle.textContent = observedArgs.text;
                    }
                    else {
                        setItemTemplateContent(targetId, targetEle, observedArgs.contentItemTemplate);
                    }
                }
            });
        }
        var end = new Date().getMilliseconds();
        var doubleTapTimer1;
        if (!isNullOrUndefined(this.doubleClick)) {
            if (!isNullOrUndefined(doubleTapTimer1) && end - doubleTapTimer1 < 500) {
                this.doubleClickOnTreeMap(e);
            }
            doubleTapTimer1 = end;
        }
    };
    /**
     * This method handles the double click event in the treemap.
     *
     * @param {PointerEvent} e - Specifies the pointer event of mouse click.
     * @returns {void}
     */
    TreeMap.prototype.doubleClickOnTreeMap = function (e) {
        var doubleClickArgs = { cancel: false, name: doubleClick, treemap: this, mouseEvent: e };
        this.trigger(doubleClick, doubleClickArgs);
        //this.notify('dblclick', e);
    };
    /**
     * This method handles the right click event in the treemap.
     *
     * @param {PointerEvent} e - Specifies the pointer event of mouse click.
     * @returns {void}
     * @private
     */
    TreeMap.prototype.rightClickOnTreeMap = function (e) {
        var rightClickArgs = { cancel: false, name: rightClick, treemap: this, mouseEvent: e };
        this.trigger(rightClick, rightClickArgs);
    };
    /**
     * This method handles the mouse down event in the treemap.
     *
     * @param {PointerEvent} e - Specifies the pointer event of mouse click.
     * @returns {void}
     * @private
     */
    TreeMap.prototype.mouseDownOnTreeMap = function (e) {
        if (e.target.id.indexOf('_Item_Index') > -1) {
            this.mouseDown = true;
        }
        if (e.type === 'touchstart' || e.type === 'mousedown') {
            this.removeFocus('none');
            e.preventDefault();
        }
        this.notify(Browser.touchStartEvent, e);
    };
    /**
     * This method handles the mouse move event in the treemap.
     *
     * @param {PointerEvent} e - Specifies the pointer event of mouse click.
     * @returns {void}
     * @private
     */
    TreeMap.prototype.mouseMoveOnTreeMap = function (e) {
        var targetEle = e.target;
        var targetId = targetEle.id;
        var eventArgs;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        var item;
        var moveArgs = { cancel: false, name: mouseMove, treemap: this, mouseEvent: e };
        this.trigger(mouseMove, moveArgs);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        var childItems;
        this.removeFocus('none');
        if (targetId.indexOf('_Item_Index') > -1) {
            item = this.layout.renderItems[parseFloat(targetId.split('_Item_Index_')[1])];
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            childItems = findChildren(item)['values'];
            this.element.style.cursor = (!item['isLeafItem'] && childItems && childItems.length > 0 && this.enableDrillDown) ?
                'pointer' : 'auto';
            eventArgs = { cancel: false, name: itemMove, treemap: this, item: item, mouseEvent: e };
            this.trigger(itemMove, eventArgs);
        }
        else {
            this.element.style.cursor = 'default';
        }
        this.notify(Browser.touchMoveEvent, e);
    };
    /**
     * This method calculates the selected treemap levels.
     *
     * @param {string} labelText - Specifies the label text.
     * @param {any} item - Specifies the treemap item.
     * @returns {any} - Returns label of the drilled level.
     * @private
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    TreeMap.prototype.calculateSelectedTextLevels = function (labelText, item) {
        //to find the levels by clicking the particular text both for drillDownView as true / false.
        var drillLevel;
        var k;
        var text;
        var levelLabels = item['levelOrderName'];
        var levelText = levelLabels.split('#');
        for (var _i = 0, _a = Object.keys(levelText); _i < _a.length; _i++) {
            k = _a[_i];
            if (levelText[k] === labelText) {
                drillLevel = parseInt(k, 10);
                text = labelText;
            }
        }
        return { drillLevel: drillLevel, currentLevelLabel: text, levelText: levelText };
    };
    /**
     * This method calculates the previous level of child items in treemap.
     *
     * @param {any} drillLevelValues - Specifies the values of drill level.
     * @param {any} item - Specifies the treemap item.
     * @param {boolean} directLevel - Specifies the current level.
     * @returns {boolean} - check whether it is previous level or not.
     * @private
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    TreeMap.prototype.calculatePreviousLevelChildItems = function (drillLevelValues, item, directLevel) {
        //By clicking any child items drilldown to the particular level.
        //At the time store all the previous drilled level items in drilledItems
        // This condition satisfies while drilldown View is set as false and the text contains '[+]'
        var text;
        var p = 0;
        var levelItems;
        var text1;
        var drillTextLevel = this.layout.renderItems[0]['levelOrderName'].split('#').length;
        for (var h = 0; h < drillTextLevel; h++) {
            text1 = h === 0 ? drillLevelValues['levelText'][h] : text1 + '#' + drillLevelValues['levelText'][h];
        }
        p = drillTextLevel > 1 ? drillTextLevel : p;
        for (var _i = 0, _a = Object['values'](this.layout.renderItems); _i < _a.length; _i++) {
            levelItems = _a[_i];
            var drillLevelText = levelItems['levelOrderName'].split('#');
            if (drillLevelText[0] === drillLevelValues['levelText'][0]) {
                text = p === 0 ? isNullOrUndefined(text1) ? text1 : drillLevelValues['levelText'][p] :
                    directLevel ? text1 : text1 + '#' + drillLevelValues['levelText'][p];
                if (text === levelItems['levelOrderName']) {
                    this.drilledItems.push({ name: levelItems['levelOrderName'], data: levelItems });
                    p++;
                    directLevel = true;
                    if (p <= item['groupIndex']) {
                        text = text + '#' + drillLevelValues['levelText'][p];
                        text1 = text;
                    }
                }
            }
        }
        return directLevel;
    };
    /**
     * This method compares the selected labels with the drill down items.
     *
     * @param {any} drillLevelValues - Specifies the values of drill level.
     * @param {any} item - Specifies the treemap item.
     * @param {number} i - Specifies the treemap item.
     * @returns {any} - return the new drill down object.
     * @private
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    TreeMap.prototype.compareSelectedLabelWithDrillDownItems = function (drillLevelValues, item, i) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        var drillLevelChild;
        var newDrillItem = {};
        var b = drillLevelValues['drillLevel'] + 1;
        if (b === this.drilledItems[i]['data']['groupIndex']) {
            drillLevelChild = this.drilledItems[i]['data']['parent'];
            drillLevelChild['isDrilled'] = true;
            newDrillItem[drillLevelChild[this.drilledItems[i]['data']['groupName']]]
                = [drillLevelChild];
            // to remove all the items after matched drilled items
            this.drilledItems.splice(i, this.drilledItems.length);
        }
        else if (drillLevelValues['drillLevel'] === (this.drilledItems.length - 1)
            || drillLevelValues['drillLevel'] === item['groupIndex']) {
            newDrillItem[item['groupName']] = [item];
        }
        return newDrillItem;
    };
    /**
     * This method handles mouse end event in treemap.
     *
     * @param {PointerEvent} e - Specifies the pointer event of mouse.
     * @returns {void}
     * @private
     */
    TreeMap.prototype.mouseEndOnTreeMap = function (e) {
        var _this = this;
        var targetEle = e.target;
        var targetId = targetEle.id;
        var totalRect;
        var startEvent;
        var endEvent;
        var directLevel = false;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        var index;
        var newDrillItem = {};
        var item;
        var process = true;
        var layoutID = this.element.id + '_TreeMap_' + this.layoutType + '_Layout';
        var drillLevel;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        var templateID = this.element.id + '_Label_Template_Group';
        var drillLevelValues;
        if (targetId.indexOf('_Item_Index') > -1 && this.enableDrillDown && !this.drillMouseMove) {
            if (e.cancelable) {
                e.preventDefault();
            }
            index = parseFloat(targetId.split('_Item_Index_')[1]);
            item = this.layout.renderItems[index];
            var labelText = targetEle.textContent;
            if (this.enableBreadcrumb) {
                drillLevelValues = this.calculateSelectedTextLevels(labelText, item);
                drillLevel = drillLevelValues['drillLevel'];
                if (!this.drillDownView && labelText.search('[+]') !== -1) {
                    directLevel = this.calculatePreviousLevelChildItems(drillLevelValues, item, directLevel);
                }
            }
            if (this.levels.length !== 0 && !item['isLeafItem'] && findChildren(item)['values'] &&
                findChildren(item)['values'].length > 0) {
                if (this.drilledItems.length > 0) {
                    item = directLevel ? this.drilledItems[this.drilledItems.length - 1]['data'] : item;
                    for (var i = 0; i < this.drilledItems.length; i++) {
                        if (!isNullOrUndefined(drillLevel)) { //Compare the selected text level with drilled items
                            var drillLength = this.drilledItems.length;
                            newDrillItem = this.compareSelectedLabelWithDrillDownItems(drillLevelValues, item, i);
                            if (drillLength !== this.drilledItems.length) {
                                i -= 1;
                                break;
                            }
                        } //when clicking the levels drill back to the previous level process takes place
                        if (item['levelOrderName'] === this.drilledItems[i]['name'] && !directLevel && isNullOrUndefined(drillLevel)) {
                            if (item['groupIndex'] === 0 && item['parent'][item['groupName']] instanceof Array) {
                                item['isDrilled'] = !(item['isDrilled']);
                                if (!item['isDrilled']) {
                                    newDrillItem = item['parent'];
                                }
                                else {
                                    newDrillItem[item['groupName']] = [item];
                                }
                            }
                            else {
                                item['isDrilled'] = false;
                                item['parent']['isDrilled'] = true;
                                item = item['parent'];
                                newDrillItem[item['groupName']] = [item];
                            }
                            this.drilledItems.splice(i, 1);
                            i -= 1;
                            break;
                        }
                        else if (i === this.drilledItems.length - 1 && isNullOrUndefined(drillLevel)) {
                            item['isDrilled'] = true; // click the items move to next level.
                            newDrillItem[item['groupName']] = [item];
                        }
                    }
                }
                else {
                    item['isDrilled'] = true;
                    newDrillItem[item['groupName']] = [item];
                }
                startEvent = {
                    cancel: false, name: drillStart, treemap: this,
                    element: targetEle, groupIndex: this.enableBreadcrumb &&
                        this.drilledItems.length !== 0 && !isNullOrUndefined(drillLevel) ?
                        this.drilledItems[this.drilledItems.length - 1]['data']['groupIndex'] : item['groupIndex'],
                    groupName: this.enableBreadcrumb && this.drilledItems.length !== 0 && !isNullOrUndefined(drillLevel) ?
                        this.drilledItems[this.drilledItems.length - 1]['data']['name'] : item['name'],
                    rightClick: e.which === 3 ? true : false, childItems: null, item: newDrillItem
                };
                this.trigger(drillStart, startEvent, function (observedArgs) {
                    _this.currentLevel = item['isDrilled'] && isNullOrUndefined(drillLevel) ? item['groupIndex'] :
                        (!isNullOrUndefined(drillLevel) && _this.enableBreadcrumb && item['isDrilled']) ? drillLevel : null;
                    if (!observedArgs.cancel) {
                        if (document.getElementById(layoutID)) {
                            var layerElementId = document.getElementById(layoutID);
                            layerElementId.parentNode.removeChild(layerElementId);
                        }
                        totalRect = extend({}, _this.areaRect, totalRect, true);
                        if (_this.legendSettings.visible && !isNullOrUndefined(_this.treeMapLegendModule)) {
                            if (!isNullOrUndefined(newDrillItem)) {
                                _this.treeMapLegendModule.legendGroup.textContent = '';
                                _this.treeMapLegendModule.legendGroup = null;
                                _this.treeMapLegendModule.widthIncrement = 0;
                                _this.treeMapLegendModule.heightIncrement = 0;
                                if (_this.enableBreadcrumb && !isNullOrUndefined(drillLevel)) {
                                    _this.drilledLegendItems = {
                                        name: _this.drilledItems[_this.drilledItems.length - 1]['data']['levelOrderName'],
                                        data: _this.drilledItems[_this.drilledItems.length - 1]['data']
                                    };
                                }
                                else {
                                    _this.drilledLegendItems = { name: item['levelOrderName'], data: item };
                                }
                                _this.treeMapLegendModule.renderLegend();
                            }
                            totalRect = !isNullOrUndefined(_this.totalRect) ? _this.totalRect : totalRect;
                        }
                        if (document.getElementById(templateID)) {
                            var drillElementId = document.getElementById(templateID);
                            drillElementId.parentNode.removeChild(drillElementId);
                        }
                        if (!isNullOrUndefined(observedArgs.childItems) && !observedArgs.cancel) {
                            _this.layout.onDemandProcess(observedArgs.childItems);
                        }
                        else {
                            _this.layout.calculateLayoutItems(newDrillItem, totalRect);
                            _this.layout.renderLayoutItems();
                        }
                    }
                });
                endEvent = { cancel: false, name: drillEnd, treemap: this, renderItems: this.layout.renderItems };
                this.trigger(drillEnd, endEvent);
                if (process) {
                    if (!directLevel && isNullOrUndefined(drillLevel)) {
                        this.drilledItems.push({ name: item['levelOrderName'], data: item });
                    }
                }
            }
        }
        this.mouseDown = false;
        this.notify(Browser.touchEndEvent, e);
    };
    /**
     * This method handles mouse leave event in treemap.
     *
     * @param {PointerEvent} e - Specifies the pointer event of mouse.
     * @return {void}
     * @private
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    TreeMap.prototype.mouseLeaveOnTreeMap = function (e) {
        if (this.treeMapTooltipModule) {
            this.treeMapTooltipModule.removeTooltip();
        }
        if (this.treeMapLegendModule) {
            this.treeMapLegendModule.removeInteractivePointer();
        }
        removeClassNames(document.getElementsByClassName('treeMapHighLight'), 'treeMapHighLight', this);
        if (this.treeMapHighlightModule) {
            removeLegend(this.treeMapHighlightModule.shapeHighlightCollection, this);
            this.treeMapHighlightModule.highLightId = '';
        }
        this.removeFocus('');
    };
    /**
     * This method is used to perform operations when keyboard up on TreeMap.
     *
     * @param {KeyboardEvent} event - Specifies the keyboard event on TreeMap.
     * @returns {void}
     * @private
     */
    TreeMap.prototype.keyUpHandler = function (event) {
        if (event.code !== 'Tab') {
            return;
        }
        var id = event.target['id'];
        var targetEle = document.getElementById(id);
        if ((id.indexOf('Item_Index') > -1 || id.indexOf('Legend') > -1)) {
            if (this.treeMapTooltipModule) {
                this.treeMapTooltipModule.removeTooltip();
            }
            if (this.treeMapHighlightModule && this.highlightSettings.enable) {
                targetEle.style.setProperty('outline', 'none');
                targetEle.classList.add('keyboard-focused');
                var highlightElement = id.indexOf('_Legend_') > -1 && this.legendSettings.mode === 'Default' ?
                    targetEle.children[0] : targetEle;
                this.treeMapHighlightModule.highlightOnMouseMove(highlightElement);
            }
            else {
                this.removeFocus('');
                targetEle.style.outline = '2px solid black';
                targetEle.classList.add('keyboard-focused');
            }
        }
        else {
            removeClassNames(document.getElementsByClassName('treeMapHighLight'), 'treeMapHighLight', this);
            if (this.treeMapHighlightModule) {
                removeLegend(this.treeMapHighlightModule.shapeHighlightCollection, this);
            }
            this.removeFocus('none');
        }
    };
    /**
     * This method is used to perform operations when keyboard down on treemap.
     *
     * @param {KeyboardEvent} event - Specifies the keyboard event on treemap.
     * @returns {void}
     * @private
     */
    TreeMap.prototype.keyDownHandler = function (event) {
        var id = event.target['id'];
        var targetEle = document.getElementById(id);
        if (event.code === 'Enter') {
            if (this.selectionSettings.enable && (id.indexOf('Item_Index') > -1 || id.indexOf('Legend') > -1)) {
                var selectionElement = id.indexOf('_Legend_') > -1 && this.legendSettings.mode === 'Default' ?
                    targetEle.children[0] : targetEle;
                this.treeMapSelectionModule.selectionOnMouseDown(selectionElement);
            }
            if (this.enableDrillDown && targetEle.childElementCount > 0) {
                this.mouseEndOnTreeMap(event);
            }
        }
    };
    /**
     * This method is used to perform operations when focus out on treemap.
     *
     * @param {KeyboardEvent} event - Specifies the keyboard event on treemap.
     * @returns {void}
     * @private
     */
    TreeMap.prototype.focusHandler = function (event) {
        var id = event.target['id'];
        if (!this.element.contains(event.relatedTarget) ||
            (id.indexOf('Item_Index') > -1 && event.relatedTarget.id.indexOf('Legend') > -1) ||
            (id.indexOf('Legend') > -1 && event.relatedTarget.id.indexOf('Item_Index') > -1)) {
            if (this.treeMapHighlightModule && this.highlightSettings.enable) {
                removeClassNames(document.getElementsByClassName('treeMapHighLight'), 'treeMapHighLight', this);
                removeLegend(this.treeMapHighlightModule.legendHighlightCollection, this);
                this.treeMapHighlightModule.highLightId = '';
            }
            else {
                this.removeFocus('none');
            }
        }
    };
    TreeMap.prototype.removeFocus = function (outline) {
        var highlightedElement = document.querySelector('.keyboard-focused');
        if (highlightedElement) {
            highlightedElement.style.outline = outline;
            highlightedElement.classList.remove('keyboard-focused');
        }
    };
    /**
     * This method is used to select or remove the selection of treemap item based on the provided selection settings.
     *
     * @param {string[]} levelOrder - Specifies the order of the level.
     * @param {boolean} isSelected - Specifies whether the treemap item should be selected or the selection should be removed.
     * @return {void}
     */
    TreeMap.prototype.selectItem = function (levelOrder, isSelected) {
        if (isNullOrUndefined(isSelected)) {
            isSelected = true;
        }
        var levelOrderName = '';
        for (var i = 0; i < levelOrder.length; i++) {
            if (i !== levelOrder.length - 1) {
                levelOrderName += levelOrder[i] + '#';
            }
            else {
                levelOrderName += levelOrder[i];
            }
        }
        if (this.treeMapSelectionModule && this.selectionSettings.enable) {
            this.treeMapSelectionModule.selectTreemapItem(levelOrderName, isSelected);
        }
    };
    /**
     * To provide the array of modules needed for maps rendering
     *
     * @returns {ModuleDeclaration[]} Returns the modules
     * @private
     */
    TreeMap.prototype.requiredModules = function () {
        var modules = [];
        if (this.tooltipSettings.visible) {
            modules.push({
                member: 'treeMapTooltip',
                args: [this],
                name: 'TreeMapTooltip'
            });
        }
        if (this.highlightSettings.enable) {
            modules.push({
                member: 'treeMapHighlight',
                args: [this],
                name: 'TreeMapHighlight'
            });
        }
        if (this.selectionSettings.enable) {
            modules.push({
                member: 'treeMapSelection',
                args: [this],
                name: 'TreeMapSelection'
            });
        }
        if (this.legendSettings.visible) {
            modules.push({
                member: 'treeMapLegend',
                args: [this],
                name: 'TreeMapLegend'
            });
        }
        if (this.allowPrint) {
            modules.push({
                member: 'Print',
                args: [this, Print],
                name: 'Print'
            });
        }
        if (this.allowImageExport) {
            modules.push({
                member: 'ImageExport',
                args: [this, ImageExport],
                name: 'ImageExport'
            });
        }
        if (this.allowPdfExport) {
            modules.push({
                member: 'PdfExport',
                args: [this, PdfExport],
                name: 'PdfExport'
            });
        }
        return modules;
    };
    /**
     * Called internally if any of the property value changed.
     *
     * @param {TreeMapModel} newProp - Specifies the new property
     * @param {TreeMapModel} oldProp - Specifies the old property
     * @returns {void}
     * @private
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    TreeMap.prototype.onPropertyChanged = function (newProp, oldProp) {
        if (!this.isDestroyed) {
            var render = false;
            for (var _i = 0, _a = Object.keys(newProp); _i < _a.length; _i++) {
                var prop = _a[_i];
                switch (prop) {
                    case 'background':
                        this.renderBorder();
                        break;
                    case 'height':
                    case 'width':
                    case 'layoutType':
                    case 'levels':
                    case 'drillDownView':
                    case 'renderDirection':
                    case 'leafItemSettings':
                    case 'legendSettings':
                    case 'dataSource':
                        render = true;
                        break;
                }
            }
            if (render) {
                this.createSvg();
                this.renderElements();
            }
        }
    };
    /**
     * Gets component name.
     *
     * @returns {string} - return the treemap instance.
     * @private
     */
    TreeMap.prototype.getModuleName = function () {
        return 'treemap';
    };
    /**
     * This method destroys the treemap. This method removes the events associated with the treemap and disposes the objects created for rendering and updating the treemap.
     */
    TreeMap.prototype.destroy = function () {
        this.unWireEVents();
        removeElement('treeMapMeasureText');
        this.drilledItems = [];
        this.levelSelection = [];
        this.legendId = [];
        this.removeSvg();
        _super.prototype.destroy.call(this);
        this.areaRect = null;
        this.themeStyle = null;
        this.totalRect = null;
        this.drilledLegendItems = null;
        this.doubleTapTimer = null;
        this.treemapLevelData = null;
        this.resizeEvent = null;
        this.availableSize = null;
        this.intl = null;
        if (!isNullOrUndefined(this.layout)) {
            this.layout.destroy();
        }
        this.layout = null;
        this.renderer = null;
    };
    TreeMap.prototype.removeSvg = function () {
        removeElement(this.element.id + '_Secondary_Element');
        if (this.svgObject) {
            while (this.svgObject.childNodes.length > 0) {
                this.svgObject.removeChild(this.svgObject.firstChild);
            }
            if (!this.svgObject.hasChildNodes() && this.svgObject.parentNode) {
                remove(this.svgObject);
            }
        }
    };
    /**
     * Get the properties to be maintained in the persisted state.
     *
     * @returns {string} - Returns the string value.
     * @private
     */
    TreeMap.prototype.getPersistData = function () {
        return '';
    };
    __decorate([
        Property(false)
    ], TreeMap.prototype, "allowPrint", void 0);
    __decorate([
        Property(false)
    ], TreeMap.prototype, "allowImageExport", void 0);
    __decorate([
        Property(false)
    ], TreeMap.prototype, "allowPdfExport", void 0);
    __decorate([
        Property(null)
    ], TreeMap.prototype, "width", void 0);
    __decorate([
        Property(null)
    ], TreeMap.prototype, "height", void 0);
    __decorate([
        Complex({}, Border)
    ], TreeMap.prototype, "border", void 0);
    __decorate([
        Complex({}, Margin)
    ], TreeMap.prototype, "margin", void 0);
    __decorate([
        Property(null)
    ], TreeMap.prototype, "background", void 0);
    __decorate([
        Property('Material')
    ], TreeMap.prototype, "theme", void 0);
    __decorate([
        Complex({}, TitleSettings)
    ], TreeMap.prototype, "titleSettings", void 0);
    __decorate([
        Property('Squarified')
    ], TreeMap.prototype, "layoutType", void 0);
    __decorate([
        Property(null)
    ], TreeMap.prototype, "dataSource", void 0);
    __decorate([
        Property(null)
    ], TreeMap.prototype, "query", void 0);
    __decorate([
        Property(null)
    ], TreeMap.prototype, "weightValuePath", void 0);
    __decorate([
        Property('')
    ], TreeMap.prototype, "rangeColorValuePath", void 0);
    __decorate([
        Property('')
    ], TreeMap.prototype, "equalColorValuePath", void 0);
    __decorate([
        Property(null)
    ], TreeMap.prototype, "colorValuePath", void 0);
    __decorate([
        Property([])
    ], TreeMap.prototype, "palette", void 0);
    __decorate([
        Property('TopLeftBottomRight')
    ], TreeMap.prototype, "renderDirection", void 0);
    __decorate([
        Property(false)
    ], TreeMap.prototype, "enableDrillDown", void 0);
    __decorate([
        Property(false)
    ], TreeMap.prototype, "enableBreadcrumb", void 0);
    __decorate([
        Property(' - ')
    ], TreeMap.prototype, "breadcrumbConnector", void 0);
    __decorate([
        Property(false)
    ], TreeMap.prototype, "drillDownView", void 0);
    __decorate([
        Property(false)
    ], TreeMap.prototype, "enableHtmlSanitizer", void 0);
    __decorate([
        Complex({}, InitialDrillSettings)
    ], TreeMap.prototype, "initialDrillDown", void 0);
    __decorate([
        Complex({}, LeafItemSettings)
    ], TreeMap.prototype, "leafItemSettings", void 0);
    __decorate([
        Collection([], LevelSettings)
    ], TreeMap.prototype, "levels", void 0);
    __decorate([
        Complex({}, HighlightSettings)
    ], TreeMap.prototype, "highlightSettings", void 0);
    __decorate([
        Complex({}, SelectionSettings)
    ], TreeMap.prototype, "selectionSettings", void 0);
    __decorate([
        Complex({}, TooltipSettings)
    ], TreeMap.prototype, "tooltipSettings", void 0);
    __decorate([
        Complex({}, LegendSettings)
    ], TreeMap.prototype, "legendSettings", void 0);
    __decorate([
        Property(false)
    ], TreeMap.prototype, "useGroupingSeparator", void 0);
    __decorate([
        Property(null)
    ], TreeMap.prototype, "description", void 0);
    __decorate([
        Property(0)
    ], TreeMap.prototype, "tabIndex", void 0);
    __decorate([
        Property(null)
    ], TreeMap.prototype, "format", void 0);
    __decorate([
        Event()
    ], TreeMap.prototype, "load", void 0);
    __decorate([
        Event()
    ], TreeMap.prototype, "beforePrint", void 0);
    __decorate([
        Event()
    ], TreeMap.prototype, "loaded", void 0);
    __decorate([
        Event()
    ], TreeMap.prototype, "itemRendering", void 0);
    __decorate([
        Event()
    ], TreeMap.prototype, "drillStart", void 0);
    __decorate([
        Event()
    ], TreeMap.prototype, "drillEnd", void 0);
    __decorate([
        Event()
    ], TreeMap.prototype, "itemSelected", void 0);
    __decorate([
        Event()
    ], TreeMap.prototype, "itemHighlight", void 0);
    __decorate([
        Event()
    ], TreeMap.prototype, "tooltipRendering", void 0);
    __decorate([
        Event()
    ], TreeMap.prototype, "itemClick", void 0);
    __decorate([
        Event()
    ], TreeMap.prototype, "itemMove", void 0);
    __decorate([
        Event()
    ], TreeMap.prototype, "click", void 0);
    __decorate([
        Event()
    ], TreeMap.prototype, "doubleClick", void 0);
    __decorate([
        Event()
    ], TreeMap.prototype, "rightClick", void 0);
    __decorate([
        Event()
    ], TreeMap.prototype, "mouseMove", void 0);
    __decorate([
        Event()
    ], TreeMap.prototype, "resize", void 0);
    __decorate([
        Event()
    ], TreeMap.prototype, "legendItemRendering", void 0);
    __decorate([
        Event()
    ], TreeMap.prototype, "legendRendering", void 0);
    TreeMap = __decorate([
        NotifyPropertyChanges
    ], TreeMap);
    return TreeMap;
}(Component));
export { TreeMap };
/**
 * @private
 */
var LevelsData = /** @class */ (function () {
    function LevelsData() {
    }
    return LevelsData;
}());
export { LevelsData };
