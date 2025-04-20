import { Rect, itemsToOrder, TextOption, measureText, textTrim, hide, wordWrap, textWrap, getTemplateFunction, convertElement, findLabelLocation, PathOption, textFormatter, colorNameToHex, convertHexToColor, colorMap, measureElement, convertToContainer, convertToRect, getShortestEdge, getArea, orderByArea, isParentItem, maintainSelection } from '../utils/helper';
import { isNullOrUndefined, createElement, extend, SanitizeHtmlHelper } from '@syncfusion/ej2-base';
import { findChildren, renderTextElement } from '../utils/helper';
import { itemRendering } from '../model/constants';
/**
 * To calculate and render the shape layer
 */
var LayoutPanel = /** @class */ (function () {
    function LayoutPanel(treemap) {
        this.treemap = treemap;
    }
    LayoutPanel.prototype.processLayoutPanel = function () {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        var data;
        var totalRect;
        if (this.treemap.treemapLevelData.levelsData && this.treemap.treemapLevelData.levelsData.length > 0) {
            data = (!isNullOrUndefined(this.treemap.initialDrillDown.groupIndex) &&
                !isNullOrUndefined(this.treemap.initialDrillDown.groupName)) &&
                (isNullOrUndefined(this.treemap.drilledItems) ? isNullOrUndefined(this.treemap.drilledItems)
                    : this.treemap.drilledItems.length === 0) ?
                this.getDrilldownData(this.treemap.treemapLevelData.levelsData[0], [])[0] : this.treemap.treemapLevelData.levelsData[0];
            totalRect = extend({}, this.treemap.areaRect, totalRect, false);
            if (!isNullOrUndefined(this.treemap.treeMapLegendModule) && !isNullOrUndefined(this.treemap.totalRect)) {
                if (this.treemap.legendSettings.position !== 'Float') {
                    totalRect = this.treemap.totalRect;
                }
            }
            if (!isNullOrUndefined(this.treemap.currentLevel) &&
                (isNullOrUndefined(this.treemap.drilledItems) ? !isNullOrUndefined(this.treemap.drilledItems)
                    : this.treemap.drilledItems.length !== 0)) {
                var count = this.treemap.drilledItems.length - 1;
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                var x = this.treemap.drilledItems[count]['data'];
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                var y = {};
                y[this.treemap.drilledItems[count]['data']['groupName']] = [x];
                if (!isNullOrUndefined(this.treemap.initialDrillDown.groupIndex) && !this.treemap.enableBreadcrumb) {
                    this.treemap.currentLevel = this.treemap.drilledItems[count]['data']['groupIndex'];
                }
                this.calculateLayoutItems(y || this.treemap.treemapLevelData.levelsData[0], totalRect);
                this.renderLayoutItems();
            }
            else {
                if (!isNullOrUndefined(this.treemap.initialDrillDown.groupIndex) &&
                    (isNullOrUndefined(this.treemap.drilledItems) ? isNullOrUndefined(this.treemap.drilledItems)
                        : this.treemap.drilledItems.length === 0)) {
                    this.treemap.currentLevel = this.treemap.initialDrillDown.groupIndex;
                }
                this.calculateLayoutItems(data || this.treemap.treemapLevelData.levelsData[0], totalRect);
                this.renderLayoutItems();
            }
        }
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    LayoutPanel.prototype.getDrilldownData = function (data, drillData) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        var treemap = this.treemap;
        var newData = {};
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        var child = findChildren(data)['values'];
        if (child && child.length > 0 && drillData.length === 0) {
            for (var i = 0; i < child.length; i++) {
                if (child[i]['groupIndex'] === treemap.initialDrillDown.groupIndex &&
                    child[i]['name'] === treemap.initialDrillDown.groupName) {
                    child[i]['isDrilled'] = true;
                    newData[child[i]['groupName']] = [child[i]];
                    drillData.push(newData);
                }
            }
            for (var j = 0; j < child.length; j++) {
                this.getDrilldownData(child[j], drillData);
            }
        }
        return drillData;
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    LayoutPanel.prototype.calculateLayoutItems = function (data, rect) {
        this.renderItems = [];
        this.parentData = [];
        if (!isNullOrUndefined(this.treemap.weightValuePath)) {
            if (this.treemap.layoutType.indexOf('SliceAndDice') > -1) {
                this.computeSliceAndDiceDimensional(data, rect);
            }
            else {
                rect.height = rect.height + rect.y;
                rect.width = rect.width + rect.x;
                this.computeSquarifyDimensional(data, rect);
            }
        }
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    LayoutPanel.prototype.computeSliceAndDiceDimensional = function (data, coords) {
        var leafItem = this.treemap.leafItemSettings;
        var rect;
        var groups = this.treemap.levels;
        var groupIndex;
        var isLeafItem = false;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        var children = findChildren(data)['values'];
        var gap;
        var headerHeight;
        if (children && children.length > 0) {
            this.sliceAndDiceProcess(children, coords);
            if (this.treemap.levels.length > 0) {
                for (var i = 0; i < children.length; i++) {
                    groupIndex = children[i]['groupIndex'];
                    isLeafItem = (groups.length === 0 || groupIndex === groups.length);
                    gap = isLeafItem ? leafItem.gap : groups[groupIndex].groupGap;
                    headerHeight = groups.length === 0 ? 0 : groups[groupIndex] ? groups[groupIndex].showHeader ?
                        groups[groupIndex].headerHeight : 0 : groups[groupIndex - 1].showHeader ?
                        groups[groupIndex - 1].headerHeight : 0;
                    rect = children[i]['rect'];
                    rect = new Rect(rect.x + (gap / 2), rect.y + (headerHeight + (gap / 2)), rect.width - gap, Math.abs(rect.height - (gap + headerHeight)));
                    this.computeSliceAndDiceDimensional(children[i], rect);
                }
            }
        }
        return data;
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    LayoutPanel.prototype.sliceAndDiceProcess = function (processData, rect) {
        var parentArea = rect.height * rect.width;
        var levels = this.treemap.levels;
        var childValue;
        var alottedValue = 0;
        var totalWeight = 0;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        processData.forEach(function (data) { totalWeight += data['weight']; });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        processData.forEach(function (child) {
            child['weightArea'] = parentArea * child['weight'] / totalWeight;
        });
        var isHorizontal = (this.treemap.layoutType === 'SliceAndDiceAuto') ? (rect.width > rect.height) :
            (this.treemap.layoutType === 'SliceAndDiceHorizontal');
        processData.sort(itemsToOrder);
        for (var i = 0; i < processData.length; i++) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            var item = processData[i];
            item['isLeafItem'] = (levels.length === 0) || ((this.treemap.isHierarchicalData ||
                isNullOrUndefined(this.treemap.leafItemSettings.labelPath)) ?
                item['groupIndex'] === levels.length - 1 : item['groupIndex'] === this.treemap.levels.length);
            if (isHorizontal) {
                childValue = ((parentArea / totalWeight) * processData[i]['weight']) / rect.height;
                if (alottedValue <= rect.width) {
                    processData[i]['rect'] = new Rect(alottedValue + rect.x, rect.y, childValue, rect.height);
                }
            }
            else {
                childValue = ((parentArea / totalWeight) * processData[i]['weight']) / rect.width;
                if (alottedValue <= rect.height) {
                    processData[i]['rect'] = new Rect(rect.x, alottedValue + rect.y, rect.width, childValue);
                }
            }
            alottedValue += childValue;
            this.renderItems.push(processData[i]);
        }
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    LayoutPanel.prototype.computeSquarifyDimensional = function (data, coords) {
        var leaf = this.treemap.leafItemSettings;
        var rect;
        var levels = this.treemap.levels;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        var item;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        var child = findChildren(data)['values'];
        var index;
        var padding;
        var headerHeight;
        if (child && child.length > 0) {
            if (this.parentData.length === 0) {
                this.parentData = [];
                this.parentData.push(child);
            }
            this.calculateChildrenLayout(data, child, coords);
            if (this.treemap.levels.length > 0) {
                for (var i = 0; i < child.length; i++) {
                    item = child[i];
                    index = item['groupIndex'];
                    rect = item['rect'];
                    padding = (item['isLeafItem'] ? leaf.padding : levels[index].groupPadding) / 2;
                    headerHeight = this.treemap.isHierarchicalData ? index === 0 && item['isLeafItem'] ? 0 : levels[index] ?
                        levels[index].showHeader ? levels[index].headerHeight : 0 : 0 :
                        (levels.length === 0) ? 0 : levels[index] ?
                            levels[index].showHeader ? levels[index].headerHeight : 0 : 0;
                    rect = new Rect(rect.x + padding, rect.y + (headerHeight + padding), rect.width - padding, rect.height - padding);
                    if (!item['isLeafItem'] && item['weight'] > 0) {
                        this.computeSquarifyDimensional(child[i], rect);
                    }
                }
            }
        }
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    LayoutPanel.prototype.calculateChildrenLayout = function (parent, children, coords) {
        this.computeTotalArea(children, getArea(coords));
        children.sort(orderByArea);
        this.performRowsLayout(children, [], coords, []);
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    LayoutPanel.prototype.performRowsLayout = function (data, currentRow, rect, stack) {
        var dataLength = data.length;
        if (dataLength === 0) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            var newCoordinates = this.getCoordinates(currentRow, rect);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            var newStack = stack.concat(newCoordinates);
            return newStack;
        }
        var width = getShortestEdge(rect);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        var nextDatum = data[0];
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        var restData = data.slice(1, dataLength);
        if (this.aspectRatio(currentRow, nextDatum, width)) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            var newRow = currentRow.concat(nextDatum);
            return this.performRowsLayout(restData, newRow, rect, stack);
        }
        else {
            var currentRowLength = currentRow.length;
            var valueSum = 0;
            for (var i = 0; i < currentRowLength; i += 1) {
                valueSum += currentRow[i]['itemArea'];
            }
            var newContainer = this.cutArea(rect, valueSum);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            var newCoordinates = this.getCoordinates(currentRow, rect);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            var newStack = stack.concat(newCoordinates);
            return this.performRowsLayout(data, [], newContainer, newStack);
        }
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    LayoutPanel.prototype.aspectRatio = function (currentRow, nextDatum, length) {
        if (currentRow.length === 0) {
            return true;
        }
        else {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            var newRow = currentRow.concat(nextDatum);
            var currentMaxAspectRatio = this.findMaxAspectRatio(currentRow, length);
            var newMaxAspectRatio = this.findMaxAspectRatio(newRow, length);
            return (currentMaxAspectRatio >= newMaxAspectRatio);
        }
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    LayoutPanel.prototype.findMaxAspectRatio = function (row, length) {
        var rowLength = row.length;
        var minArea = Infinity;
        var maxArea = -Infinity;
        var sumArea = 0;
        for (var i = 0; i < rowLength; i += 1) {
            var area = row[i]['itemArea'];
            if (area < minArea) {
                minArea = area;
            }
            if (area > maxArea) {
                maxArea = area;
            }
            sumArea += area;
        }
        var result = Math.max((Math.pow(length, 2)) * maxArea / (Math.pow(sumArea, 2)), (Math.pow(sumArea, 2)) /
            ((Math.pow(length, 2)) * minArea));
        return result;
    };
    LayoutPanel.prototype.cutArea = function (rect, area) {
        var newContainer = convertToContainer(rect);
        var width = newContainer.width;
        var height = newContainer.height;
        var xOffset = newContainer.x;
        var yOffset = newContainer.y;
        if (width >= height) {
            var areaWidth = area / height;
            var newWidth = width - areaWidth;
            var container = {
                x: xOffset + areaWidth,
                y: yOffset,
                width: newWidth,
                height: height
            };
            return convertToRect(container);
        }
        else {
            var areaHeight = area / width;
            var newHeight = height - areaHeight;
            var container = {
                x: xOffset,
                y: yOffset + areaHeight,
                width: width,
                height: newHeight
            };
            return convertToRect(container);
        }
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    LayoutPanel.prototype.getCoordinates = function (row, rect) {
        var container = convertToContainer(rect);
        var width = container.width;
        var height = container.height;
        var xOffset = container.x;
        var yOffset = container.y;
        var rowLength = row.length;
        var levels = this.treemap.levels;
        var leaf = this.treemap.leafItemSettings;
        var index;
        var valueSum = 0;
        for (var i = 0; i < rowLength; i += 1) {
            valueSum += row[i]['itemArea'];
        }
        var areaWidth = valueSum / height;
        var areaHeight = valueSum / width;
        var subXOffset = xOffset;
        var subYOffset = yOffset;
        var padding;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        var coordinates = [];
        var isParent;
        var parentRect;
        for (var i = 0; i < rowLength; i += 1) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            var item = row[i];
            index = item['groupIndex'];
            item['isLeafItem'] = (levels.length === 0) || (this.treemap.isHierarchicalData ? index === levels.length :
                isNullOrUndefined(leaf.labelPath) ? false : index === levels.length);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            isParent = isParentItem(this.parentData[0], item);
            parentRect = isParent ? this.treemap.areaRect : item['parent'].rect;
            padding = item['isLeafItem'] ? leaf.padding : levels[index].groupPadding;
            if (width >= height) {
                var y1 = subYOffset + item['itemArea'] / areaWidth;
                item['rect'] = {
                    x: subXOffset,
                    y: subYOffset,
                    width: subXOffset + areaWidth,
                    height: y1
                };
                subYOffset = y1;
            }
            else {
                var x1 = subXOffset + item['itemArea'] / areaHeight;
                item['rect'] = {
                    x: subXOffset,
                    y: subYOffset,
                    width: x1,
                    height: subYOffset + areaHeight
                };
                subXOffset = x1;
            }
            if (item['weight'] > 0 && (isParent || (Math.round(rect.y + (padding / 2)) <=
                Math.round(parentRect.y + (parentRect.height - parentRect.y)) && Math.round(rect.x + (padding / 2)) <=
                Math.round(parentRect.x + (parentRect.width - parentRect.x))))) {
                this.renderItems.push(item);
                coordinates.push(item);
            }
        }
        return coordinates;
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    LayoutPanel.prototype.computeTotalArea = function (data, area) {
        var dataLength = data.length;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        var result = [];
        for (var i = 0; i < dataLength; i += 1) {
            var dataLength_1 = data.length;
            var dataSum = 0;
            for (var i_1 = 0; i_1 < dataLength_1; i_1 += 1) {
                dataSum += data[i_1]['weight'];
            }
            var multiplier = area / dataSum;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            var datum = void 0;
            for (var j = 0; j < dataLength_1; j++) {
                datum = data[j];
                datum['itemArea'] = datum['weight'] * multiplier;
                result.push(datum);
            }
        }
        return result;
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    LayoutPanel.prototype.onDemandProcess = function (childItems) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        var parentItem = {};
        var totalRect;
        parentItem = childItems[0]['parent'];
        this.treemap.currentLevel = parentItem['isDrilled'] ? parentItem['groupIndex'] : null;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        var parentItemGroupname = {};
        if (isNullOrUndefined(parentItem['groupName'])) {
            parentItemGroupname = parentItem;
        }
        else {
            parentItemGroupname[parentItem['groupName']] = [parentItem];
        }
        totalRect = extend({}, this.treemap.areaRect, totalRect, false);
        if (!isNullOrUndefined(this.treemap.treeMapLegendModule) && !isNullOrUndefined(this.treemap.totalRect)) {
            totalRect = this.treemap.totalRect;
        }
        var count = this.treemap.levels.length;
        for (var i = 0; i < count; i++) {
            var levelCount = childItems[0]['groupIndex'];
            if (count === levelCount) {
                this.treemap.levels[count] = this.treemap.levels[i];
            }
            else {
                this.treemap.levels.splice(count - 1, 1);
            }
        }
        this.calculateLayoutItems(parentItemGroupname, totalRect);
        this.renderLayoutItems();
    };
    // eslint-disable-next-line valid-jsdoc
    /** @private */
    LayoutPanel.prototype.renderLayoutItems = function () {
        var _this = this;
        var position;
        var treeMap = this.treemap;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        var txtVisible;
        var getItemColor;
        var eventArgs;
        this.renderer = treeMap.renderer;
        var pathOptions;
        var elementID = treeMap.element.id;
        var index;
        var templatePosition;
        var mode = treeMap.layoutType;
        var rect;
        var format;
        var interSectAction = this.treemap.leafItemSettings.interSectAction;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        var fill;
        var item;
        var renderText;
        var opacity;
        var rectPath = '';
        var secondaryEle = document.getElementById(treeMap.element.id + '_Secondary_Element');
        var groupId;
        var templateEle;
        var gap;
        var textStyle;
        var levels = treeMap.levels;
        this.layoutGroup = this.renderer.createGroup({ id: elementID + '_TreeMap_' + mode + '_Layout' });
        var itemGroup;
        var template;
        var border;
        var templateGroup = createElement('div', {
            id: treeMap.element.id + '_Label_Template_Group',
            className: 'template'
        });
        templateGroup.style.cssText = 'overflow: hidden; position: absolute;pointer-events: none;' +
            'top:' + treeMap.areaRect.y + 'px;' +
            'left:' + treeMap.areaRect.x + 'px;' +
            'height:' + treeMap.areaRect.height + 'px;' +
            'width:' + treeMap.areaRect.width + 'px;';
        var isLeafItem = false;
        var leaf = treeMap.leafItemSettings;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        var childItems;
        var connectorText;
        var _loop_1 = function (i) {
            item = this_1.renderItems[i];
            index = item['groupIndex'];
            if (this_1.treemap.drillDownView && isNullOrUndefined(this_1.treemap.currentLevel)
                && index > 0 || this_1.treemap.drillDownView
                && index > (this_1.treemap.currentLevel + 1)) {
                return "continue";
            }
            rect = item['rect'];
            isLeafItem = item['isLeafItem'];
            groupId = elementID + '_Level_Index_' + index + '_Item_Index_' + i;
            itemGroup = this_1.renderer.createGroup({ id: groupId + '_Group' });
            gap = (isLeafItem ? leaf.gap : levels[index].groupGap) / 2;
            var treemapItemRect = this_1.treemap.totalRect ? (treeMap.legendSettings.visible ? this_1.treemap.totalRect
                : convertToContainer(this_1.treemap.totalRect)) : this_1.treemap.areaRect;
            if (treeMap.layoutType === 'Squarified') {
                rect.width = Math.abs(rect.x - rect.width) - gap;
                rect.height = Math.abs(rect.y - rect.height) - gap;
            }
            if (treeMap.renderDirection === 'TopRightBottomLeft') {
                rect.x = (treemapItemRect.x + treemapItemRect.width) - rect.width - Math.abs(treemapItemRect.x - rect.x);
            }
            else if (treeMap.renderDirection === 'BottomLeftTopRight') {
                rect.y = (treemapItemRect.y + treemapItemRect.height) - rect.height - Math.abs(treemapItemRect.y - rect.y);
            }
            else if (treeMap.renderDirection === 'BottomRightTopLeft') {
                rect.x = (treemapItemRect.x + treemapItemRect.width) - rect.width - Math.abs(treemapItemRect.x - rect.x);
                rect.y = (treemapItemRect.y + treemapItemRect.height) - rect.height - Math.abs(treemapItemRect.y - rect.y);
            }
            getItemColor = this_1.getItemColor(isLeafItem, item);
            fill = getItemColor['fill'];
            opacity = getItemColor['opacity'];
            format = isLeafItem ? leaf.labelFormat : (levels[index]).headerFormat;
            var levelName;
            txtVisible = isLeafItem ? leaf.showLabels : (levels[index]).showHeader;
            if (index === this_1.treemap.currentLevel) {
                if (this_1.treemap.enableBreadcrumb) {
                    var re = /#/gi;
                    connectorText = '#' + this_1.treemap.breadcrumbConnector + '#';
                    levelName = item['levelOrderName'].replace(re, connectorText);
                    levelName = index !== 0 ? '#' + levelName : levelName;
                }
                else {
                    levelName = item['name'];
                }
            }
            else {
                if (this_1.treemap.enableBreadcrumb) {
                    item['isDrilled'] = false;
                }
                levelName = item['name'];
            }
            renderText = textFormatter(format, item['data'], this_1.treemap) || levelName || 'undefined';
            childItems = findChildren(item)['values'];
            renderText = !isLeafItem && childItems && childItems.length > 0 && this_1.treemap.enableDrillDown ?
                !item['isDrilled'] ? treeMap.enableRtl ? renderText + ' [+]' : '[+] ' + renderText :
                    treeMap.enableRtl ? renderText + ' [-]' : '[-] ' + renderText : renderText;
            if (treeMap.enableHtmlSanitizer) {
                renderText = SanitizeHtmlHelper.sanitize(renderText);
            }
            var fontFamily = (isLeafItem ? leaf.labelStyle.fontFamily : levels[index].headerStyle.fontFamily);
            fontFamily = fontFamily || this_1.treemap.themeStyle.labelFontFamily;
            var size = (isLeafItem ? leaf.labelStyle.size : levels[index].headerStyle.size);
            size = size || this_1.treemap.themeStyle.labelFontSize;
            var fontWeight = (isLeafItem ? leaf.labelStyle.fontWeight : levels[index].headerStyle.fontWeight);
            fontWeight = fontWeight || this_1.treemap.themeStyle.fontWeight;
            var color = (isLeafItem ? leaf.labelStyle.color : levels[index].headerStyle.color);
            var fontStyle = (isLeafItem ? leaf.labelStyle.fontStyle : levels[index].headerStyle.fontStyle);
            var textStyleOpacity = (isLeafItem ? leaf.labelStyle.opacity : levels[index].headerStyle.opacity);
            textStyle = {
                fontFamily: fontFamily, size: size, fontWeight: fontWeight, color: color, fontStyle: fontStyle, opacity: textStyleOpacity
            };
            border = isLeafItem ? leaf.border : levels[index].border;
            position = !isLeafItem ? (levels[index].headerAlignment) === 'Near' ? 'TopLeft' : (levels[index].headerAlignment) === 'Center' ?
                'TopCenter' : 'TopRight' : leaf.labelPosition;
            templatePosition = isLeafItem ? leaf.templatePosition : levels[index].templatePosition;
            template = isLeafItem ? leaf.labelTemplate : levels[index].headerTemplate;
            item['options'] = { border: border, opacity: opacity, fill: fill };
            eventArgs = {
                cancel: false, name: itemRendering, treemap: this_1.treemap, text: renderText,
                currentItem: item, RenderItems: this_1.renderItems, options: item['options'], textColor: textStyle.color
            };
            this_1.treemap.trigger(itemRendering, eventArgs, function (observedArgs) {
                if (!observedArgs.cancel) {
                    rectPath = ' M ' + rect.x + ' ' + rect.y + ' L ' + (rect.x + rect.width) + ' ' + rect.y +
                        ' L ' + (rect.x + rect.width) + ' ' + (rect.y + rect.height) + ' L ' + rect.x + ' ' + (rect.y + rect.height) + 'z';
                    pathOptions = new PathOption(groupId + '_RectPath', fill, border.width, border.color, opacity, null, rectPath);
                    var path = _this.renderer.drawPath(pathOptions);
                    itemGroup.appendChild(path);
                    if (txtVisible) {
                        if (eventArgs.text !== renderText) {
                            eventArgs.text = textFormatter(eventArgs.text, item['data'], _this.treemap) || levelName;
                        }
                        textStyle.color = eventArgs.textColor ? eventArgs.textColor : textStyle.color;
                        _this.renderItemText(eventArgs.text.toString(), itemGroup, textStyle, rect, interSectAction, groupId, fill, position, connectorText);
                    }
                    if (template) {
                        templateEle = _this.renderTemplate(secondaryEle, groupId, rect, templatePosition, template, item, isLeafItem);
                        if (!isNullOrUndefined(templateEle)) {
                            templateGroup.appendChild(templateEle);
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            _this.treemap.renderReactTemplates();
                        }
                    }
                    itemGroup.setAttribute('aria-label', item['name']);
                    if ((_this.treemap.enableDrillDown && !isLeafItem) || (_this.treemap.selectionSettings.enable ||
                        _this.treemap.highlightSettings.enable)) {
                        itemGroup.setAttribute('role', 'button');
                        itemGroup.setAttribute('tabindex', _this.treemap.tabIndex.toString());
                        itemGroup.style.outline = 'none';
                        itemGroup.style.cursor = _this.treemap.highlightSettings.enable && !_this.treemap.selectionSettings.enable && (_this.treemap.enableDrillDown && item['groupIndex'] === (_this.treemap.levels.length - 1)) ? 'default' :
                            _this.treemap.highlightSettings.enable && !_this.treemap.selectionSettings.enable && !_this.treemap.enableDrillDown ? 'default' : 'pointer';
                    }
                    else {
                        itemGroup.setAttribute('role', 'region');
                    }
                    maintainSelection(_this.treemap, itemGroup, 'treeMapSelection');
                    _this.layoutGroup.appendChild(itemGroup);
                }
            });
        };
        var this_1 = this;
        for (var i = 0; i < this.renderItems.length; i++) {
            _loop_1(i);
        }
        if (templateGroup.childNodes.length > 0) {
            secondaryEle.appendChild(templateGroup);
        }
        this.treemap.svgObject.appendChild(this.layoutGroup);
        maintainSelection(this.treemap, this.layoutGroup, 'treeMapSelection');
    };
    LayoutPanel.prototype.renderItemText = function (text, parentElement, textStyle, rect, interSectAction, groupId, fill, position, connectorText) {
        var padding = 5;
        var textSize;
        var textCollection = [];
        var customText;
        var tspanText = [];
        var height = 0;
        var textName;
        textCollection = ((text.indexOf('<br>')) !== -1) ? text.split('<br>') : null;
        customText = this.labelInterSectAction(rect, text, textStyle, interSectAction);
        textSize = measureText(textCollection && textCollection[0] || customText[0], textStyle);
        if (this.treemap.enableRtl) {
            var labelSize = measureText(text, textStyle);
            var drillSymbolCount = text.search('[+]') || text.search('[-]');
            if (rect.width < labelSize.width && drillSymbolCount > 0) {
                var label = text.substring(drillSymbolCount - 1, text.length);
                var drillSymbol = '[+]';
                var drillSymbolSize = measureText(drillSymbol, textStyle);
                customText['0'] = textTrim(rect.width - drillSymbolSize.width - padding, customText[0], textStyle) + label;
            }
        }
        var textLocation = findLabelLocation(rect, position, textSize, 'Text', this.treemap);
        if (!isNullOrUndefined(textCollection)) {
            var collection = [];
            var texts = null;
            var maxNumber = [];
            for (var i = 0; i < textCollection.length; i++) {
                texts = textTrim((rect.width - 5), textCollection[i], textStyle);
                textSize = measureText(texts, textStyle);
                height += textSize.height;
                maxNumber.push(textSize.width);
                collection.push(texts);
            }
            customText = collection;
            textSize.width = Math.max.apply(null, maxNumber);
            textSize.height = height;
        }
        if (interSectAction === 'WrapByWord' || interSectAction === 'Wrap' || interSectAction === 'Trim') {
            for (var j = 0; j < customText.length; j++) {
                textSize = measureText(customText[j], textStyle);
                height += textSize.height;
                if ((rect.height - padding) > height) {
                    tspanText.push(customText[j]);
                }
            }
            if (interSectAction === 'Wrap' && customText.length !== tspanText.length && tspanText.length) {
                var collectionLength = tspanText.length - 1;
                var stringText = tspanText[collectionLength];
                stringText = stringText.substring(0, (stringText.length - 1)) + '...';
                tspanText.splice(collectionLength);
                if (stringText !== '...') {
                    tspanText.push(stringText);
                }
            }
        }
        else {
            textName = customText;
            tspanText.push(textName);
        }
        var textOptions = new TextOption(groupId + '_Text', textLocation.x, textLocation.y, 'start', tspanText, '', '', connectorText);
        renderTextElement(textOptions, textStyle, textStyle.color || this.getSaturatedColor(fill), parentElement);
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    LayoutPanel.prototype.getItemColor = function (isLeafItem, item) {
        var treemap = this.treemap;
        var itemFill = isLeafItem ? treemap.leafItemSettings.fill : treemap.levels[item['groupIndex']].fill;
        var itemOpacity = isLeafItem ? treemap.leafItemSettings.opacity : treemap.levels[item['groupIndex']].opacity;
        if (!isNullOrUndefined(treemap.treemapLevelData.defaultLevelsData)) {
            if (treemap.treemapLevelData.defaultLevelsData.length > 0) {
                treemap.treemapLevelData.levelsData = treemap.treemapLevelData.defaultLevelsData;
            }
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        var parentData = findChildren(treemap.treemapLevelData.levelsData[0])['values'];
        var colorMapping = isLeafItem ? treemap.leafItemSettings.colorMapping :
            treemap.levels[item['groupIndex']].colorMapping;
        if (colorMapping.length > 0) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            var option = colorMap(colorMapping, item['data'][treemap.equalColorValuePath], item['data'][treemap.rangeColorValuePath]);
            if (!isNullOrUndefined(option)) {
                itemFill = !isNullOrUndefined(option['fill']) ? option['fill'] : treemap.leafItemSettings.fill;
                itemOpacity = option['opacity'];
            }
        }
        else {
            for (var i = 0; i < parentData.length; i++) {
                if (parentData[i]['levelOrderName'] === item['levelOrderName'].split('#')[0]) {
                    itemFill = !isNullOrUndefined(itemFill) ? itemFill : !isNullOrUndefined(treemap.colorValuePath) ?
                        parentData[i]['data'][treemap.colorValuePath] : !isNullOrUndefined(item['options']) ?
                        item['options'].fill : (!isNullOrUndefined(treemap.palette) && treemap.palette.length > 0) ?
                        treemap.palette[i % treemap.palette.length] : '#808080';
                }
            }
        }
        return { fill: itemFill, opacity: itemOpacity };
    };
    /**
     * To find saturated color for datalabel
     *
     * @param {string} color - Specifies the color
     * @returns {string} - Returns the color
     */
    LayoutPanel.prototype.getSaturatedColor = function (color) {
        var saturatedColor = color;
        saturatedColor = (saturatedColor === 'transparent') ? window.getComputedStyle(document.body, null).backgroundColor : saturatedColor;
        var rgbValue = convertHexToColor(colorNameToHex(saturatedColor));
        var contrast = Math.round((rgbValue.r * 299 + rgbValue.g * 587 + rgbValue.b * 114) / 1000);
        return contrast >= 128 ? 'black' : 'white';
    };
    LayoutPanel.prototype.renderTemplate = function (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, max-len
    secondaryEle, groupId, rect, position, template, item, isLeafItem) {
        var templateId = isLeafItem ? groupId + '_LabelTemplate' : groupId + '_HeaderTemplate';
        var baseTemplateId = isLeafItem ? '_LabelTemplate' : '_HeaderTemplate';
        if (isNullOrUndefined(template['prototype']) && typeof template === 'string') {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            var keys = Object.keys(item['data']);
            for (var i = 0; i < keys.length; i++) {
                var regExp = RegExp;
                template = template.replace(new regExp('{{:' + keys[i] + '}}', 'g'), item['data'][keys[i].toString()]);
            }
        }
        if (this.treemap.enableHtmlSanitizer && typeof template === 'string') {
            template = SanitizeHtmlHelper.sanitize(template);
        }
        var labelElement;
        if (!isNullOrUndefined(document.getElementById(this.treemap.element.id + '_Secondary_Element'))) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            var templateFn = getTemplateFunction(template);
            var templateElement = templateFn(item['data'], this.treemap, template, this.treemap.element.id + baseTemplateId, false);
            labelElement = convertElement(templateElement, templateId, item['data']);
            var templateSize = measureElement(labelElement, secondaryEle);
            var templateLocation = findLabelLocation(rect, position, templateSize, 'Template', this.treemap);
            labelElement.style.left = templateLocation.x + 'px';
            labelElement.style.top = templateLocation.y + 'px';
        }
        return labelElement;
    };
    LayoutPanel.prototype.labelInterSectAction = function (rect, text, textStyle, alignment) {
        var textValue;
        var maxWidth = rect.width - 10;
        switch (alignment) {
            case 'Hide':
                textValue = [hide(maxWidth, rect.height, text, textStyle)];
                break;
            case 'Trim':
                textValue = [textTrim((maxWidth + 3), text, textStyle)];
                break;
            case 'WrapByWord':
                textValue = wordWrap(maxWidth, text, textStyle);
                break;
            case 'Wrap':
                textValue = textWrap(maxWidth, text, textStyle);
                break;
        }
        return textValue;
    };
    /**
     *
     * @returns {void}
     * @private
     */
    LayoutPanel.prototype.destroy = function () {
        this.treemap = null;
        this.currentRect = null;
        this.layoutGroup = null;
        this.renderer = null;
        this.renderItems = [];
        this.parentData = [];
    };
    return LayoutPanel;
}());
export { LayoutPanel };
