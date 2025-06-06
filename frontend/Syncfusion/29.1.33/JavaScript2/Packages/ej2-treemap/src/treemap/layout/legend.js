import { findChildren, Location, Rect, Size, measureText, TextOption, PathOption, RectOption, drawSymbol, orderByArea, legendMaintain } from '../utils/helper';
import { Browser, isNullOrUndefined, EventHandler, extend, SanitizeHtmlHelper } from '@syncfusion/ej2-base';
import { renderTextElement, textTrim } from '../utils/helper';
import { legendItemRendering, legendRendering } from '../model/constants';
/**
 * Legend module class
 */
var TreeMapLegend = /** @class */ (function () {
    function TreeMapLegend(treemap) {
        this.page = 0;
        /** @private */
        this.legendBorderRect = new Rect(0, 0, 0, 0);
        this.currentPage = 0;
        /** @private */
        this.heightIncrement = 0;
        /** @private */
        this.widthIncrement = 0;
        this.textMaxWidth = 0;
        this.legendInteractiveGradient = [];
        this.legendItemRect = new Rect(0, 0, 0, 0);
        this.treemap = treemap;
        this.addEventListener();
    }
    /**
     * method for legend
     *
     * @returns {void}
     * @private
     */
    TreeMapLegend.prototype.renderLegend = function () {
        var _this = this;
        this.page = 0;
        this.legendRenderingCollections = [];
        this.legendCollections = [];
        this.legendNames = [];
        this.totalPages = [];
        this.gradientCount = 1;
        this.widthIncrement = 0;
        this.heightIncrement = 0;
        this.defsElement = this.treemap.renderer.createDefs();
        this.treemap.svgObject.appendChild(this.defsElement);
        var eventArgs = {
            cancel: false, name: legendRendering, treemap: this.treemap, _changePosition: this.treemap.legendSettings.position,
            position: this.treemap.legendSettings.position
        };
        this.treemap.trigger(legendRendering, eventArgs, function (observedArgs) {
            if (!observedArgs.cancel && observedArgs._changePosition !== _this.treemap.legendSettings.position) {
                _this.treemap.legendSettings.position = observedArgs._changePosition;
            }
            _this.calculateLegendBounds();
            if (_this.legendCollections.length > 0) {
                _this.drawLegend();
            }
        });
    };
    // eslint-disable-next-line valid-jsdoc
    /** @private */
    TreeMapLegend.prototype.calculateLegendBounds = function () {
        var _this = this;
        var treemap = this.treemap;
        var legend = treemap.legendSettings;
        this.findColorMappingLegendItems(treemap.treemapLevelData.levelsData[0]);
        if (((!isNullOrUndefined(this.treemap.palette) && this.treemap.palette.length > 0) || !isNullOrUndefined(treemap.colorValuePath))
            && this.legendCollections.length === 0) {
            this.findPaletteLegendItems(treemap.treemapLevelData.levelsData[0]);
        }
        if (this.legendCollections.length > 0) {
            // eslint-disable-next-line @typescript-eslint/tslint/config
            this.legendCollections.sort(function (firstItem, nextItem) { return (firstItem.levelIndex > nextItem.levelIndex) ? 1 :
                (firstItem.levelIndex < nextItem.levelIndex) ? -1 : 0; });
            // eslint-disable-next-line @typescript-eslint/tslint/config
            this.legendCollections.sort(function (firstItem, nextItem) { return (firstItem.groupIndex > nextItem.groupIndex) ? 1 :
                (firstItem.groupIndex < nextItem.groupIndex) ? -1 : 0; });
            // eslint-disable-next-line @typescript-eslint/tslint/config
            this.legendCollections.sort(function (firstItem, nextItem) { return (firstItem.leafIndex > nextItem.leafIndex) ? 1 :
                (firstItem.leafIndex < nextItem.leafIndex) ? -1 : 0; });
            var defaultSize = 25;
            var textPadding = 10;
            var position = legend.position;
            var legendTitle = treemap.enableHtmlSanitizer ? SanitizeHtmlHelper.sanitize(legend.title.text) : legend.title.text;
            var titleTextStyle = legend.titleStyle;
            var legendMode = legend.mode;
            var shapeX = 0;
            var shapeY = 0;
            var textX = 0;
            var textY = 0;
            var shapeHeight = legend.shapeHeight;
            var shapeWidth = legend.shapeWidth;
            var shapeLocation = [];
            var textLocation = [];
            var orientation_1 = (legend.orientation === 'None') ? ((position === 'Top' || position === 'Bottom'
                || (position === 'Auto' && treemap.availableSize.width <= treemap.availableSize.height))
                ? 'Horizontal' : 'Vertical') : legend.orientation;
            var leftPadding = 10;
            var topPadding = 10;
            var spacing = 10;
            var legendWidth = (legend.width.length > 1) ? (legend.width.indexOf('%') > -1) ? (treemap.availableSize.width / 100)
                * parseFloat(legend.width) : parseFloat(legend.width) : null;
            var legendHeight = (legend.height.length > 1) ? (legend.height.indexOf('%') > -1) ?
                (treemap.availableSize.height / 100) * parseFloat(legend.height) : parseFloat(legend.height) : null;
            titleTextStyle.fontFamily = titleTextStyle.fontFamily || treemap.themeStyle.fontFamily;
            titleTextStyle.fontWeight = titleTextStyle.fontWeight || treemap.themeStyle.titleFontWeight;
            titleTextStyle.size = titleTextStyle.size || treemap.themeStyle.subtitleFontSize;
            var legendTitleSize = measureText(legendTitle, titleTextStyle);
            var startX_1 = 0;
            var startY_1 = 0;
            var shapePadding = legend.shapePadding;
            var itemTextStyle = legend.textStyle;
            itemTextStyle.size = itemTextStyle.size || treemap.themeStyle.legendFontSize;
            itemTextStyle.fontFamily = itemTextStyle.fontFamily || treemap.themeStyle.fontFamily;
            itemTextStyle.fontWeight = itemTextStyle.fontWeight || treemap.themeStyle.fontWeight;
            if (legendMode === 'Default') {
                legendWidth = (isNullOrUndefined(legendWidth)) ? treemap.areaRect.width : legendWidth;
                legendHeight = (isNullOrUndefined(legendHeight)) ? treemap.areaRect.height : legendHeight;
                var j = 0;
                for (var i = 0; i < this.legendCollections.length; i++) {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    var legendItem = this.legendCollections[i];
                    if (isNullOrUndefined(this.totalPages[this.page])) {
                        this.totalPages[this.page] = { Page: (this.page + 1), Collection: [] };
                    }
                    var legendTextSize = measureText(treemap.enableHtmlSanitizer ?
                        SanitizeHtmlHelper.sanitize(legendItem['legendName']) : legendItem['legendName'], itemTextStyle);
                    this.textMaxWidth = Math.max(this.textMaxWidth, legendTextSize.width);
                    if (i === 0) {
                        startX_1 = shapeX = (leftPadding + (shapeWidth / 2));
                        startY_1 = shapeY = topPadding + legendTitleSize.height + (shapeHeight > legendTextSize.height ? shapeHeight / 2
                            : (legendTextSize.height / 4));
                    }
                    else {
                        var maxSize = (legendTextSize.height > shapeHeight) ? legendTextSize.height : shapeHeight;
                        if (orientation_1 === 'Horizontal') {
                            var prvePositionX = (textLocation[j - 1].x + textLocation[j - 1].width) + textPadding + shapeWidth;
                            if ((prvePositionX + shapePadding + legendTextSize.width) > legendWidth) {
                                var nextPositionY = (textLocation[j - 1].y > (shapeLocation[j - 1].y + (shapeHeight / 2)) ?
                                    textLocation[j - 1].y : (shapeLocation[j - 1].y + (shapeHeight / 2))) + topPadding;
                                if ((nextPositionY + maxSize) > legendHeight) {
                                    this.getPageChanged();
                                    j = 0;
                                    shapeLocation = [];
                                    textLocation = [];
                                    shapeX = startX_1;
                                    shapeY = startY_1;
                                }
                                else {
                                    shapeX = (shapeLocation[0].x);
                                    shapeY = (nextPositionY + (maxSize / 2));
                                }
                            }
                            else {
                                shapeX = (prvePositionX - (shapeWidth / 2));
                                shapeY = (shapeLocation[j - 1]).y;
                            }
                        }
                        else {
                            var prevPositionY = textLocation[j - 1].y > shapeLocation[j - 1].y + (shapeHeight / 2) ?
                                textLocation[j - 1].y : shapeLocation[j - 1].y + (shapeHeight / 2);
                            if ((prevPositionY + topPadding + maxSize) > legendHeight) {
                                var nextPositionX = (textLocation[j - 1].x + this.textMaxWidth + textPadding);
                                if ((nextPositionX + shapePadding + legendTextSize.width) > legendWidth) {
                                    shapeX = startX_1;
                                    shapeY = startY_1;
                                    textLocation = [];
                                    shapeLocation = [];
                                    this.getPageChanged();
                                    j = 0;
                                }
                                else {
                                    shapeX = nextPositionX + (shapeWidth / 2);
                                    shapeY = (shapeLocation[0].y);
                                }
                            }
                            else {
                                shapeX = shapeLocation[j - 1].x;
                                shapeY = prevPositionY + topPadding + (shapeHeight / 2);
                            }
                        }
                    }
                    textX = shapeX + (shapeWidth / 2) + shapePadding;
                    textY = shapeY + (legendTextSize.height / 4);
                    shapeLocation.push({ x: shapeX, y: shapeY });
                    textLocation.push({ x: textX, y: textY, width: legendTextSize.width, height: (legendTextSize.height / 2) });
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    this.totalPages[this.page]['Collection'].push({
                        DisplayText: legendItem['legendName'], element: legendItem['gradientElement'],
                        Shape: { x: shapeX, y: shapeY },
                        Text: { x: textX, y: textY },
                        Fill: legendItem['legendFill'],
                        Data: legendItem['legendData'],
                        Rect: {
                            x: shapeLocation[j].x - (shapeWidth / 2),
                            y: (shapeLocation[j].y - (shapeHeight / 2)) < (textY - legendTextSize.height) ?
                                (shapeLocation[j].y - (shapeHeight / 2)) : (textY - legendTextSize.height),
                            width: Math.abs((shapeLocation[j].x - (shapeWidth / 2)) - (textX + legendTextSize.width)),
                            height: ((shapeHeight > legendTextSize.height) ? shapeHeight : legendTextSize.height)
                        }
                    });
                    j++;
                }
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                var collection = this.totalPages[0]['Collection'];
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                collection.forEach(function (legendObj, index) {
                    var legendRect = new Rect(legendObj['Rect']['x'], legendObj['Rect']['y'], legendObj['Rect']['width'], legendObj['Rect']['height']);
                    if (index === 0) {
                        startX_1 = legendRect.x;
                        startY_1 = legendRect.y;
                    }
                    _this.widthIncrement = Math.max(_this.widthIncrement, Math.abs(startX_1 - (legendRect.x + legendRect.width)));
                    _this.heightIncrement = Math.max(_this.heightIncrement, Math.abs(startY_1 - (legendRect.y + legendRect.height)));
                });
                legendWidth = ((this.widthIncrement < legendWidth) ? this.widthIncrement : legendWidth);
                legendHeight = ((this.heightIncrement < legendHeight) ? this.heightIncrement : legendHeight);
                this.legendItemRect = {
                    x: collection[0]['Rect']['x'], y: collection[0]['Rect']['y'],
                    width: legendWidth, height: legendHeight
                };
            }
            else {
                var legendLength = this.legendCollections.length;
                var rectWidth = (orientation_1 === 'Horizontal') ? (isNullOrUndefined(legendWidth)) ? (treemap.areaRect.width / legendLength) :
                    (legendWidth / legendLength) : (isNullOrUndefined(legendWidth)) ? defaultSize : legendWidth;
                var rectHeight = (orientation_1 === 'Horizontal') ? (isNullOrUndefined(legendHeight)) ? defaultSize : legendHeight :
                    (isNullOrUndefined(legendHeight)) ? (treemap.areaRect.height / legendLength) : (legendHeight / legendLength);
                startX_1 = 0;
                startY_1 = legendTitleSize.height + spacing;
                var textPadding_1 = 10;
                var placement = legend.labelPosition;
                var itemStartX = 0;
                var itemStartY = 0;
                var labelAction = legend.labelDisplayMode;
                var maxTextHeight = 0;
                var maxTextWidth = 0;
                for (var i = 0; i < this.legendCollections.length; i++) {
                    startX_1 = (orientation_1 === 'Horizontal') ? (startX_1 + rectWidth) : startX_1;
                    startY_1 = (orientation_1 === 'Horizontal') ? startY_1 : (startY_1 + rectHeight);
                    var legendText = this.legendCollections[i]['legendName'];
                    var itemTextSize = new Size(0, 0);
                    if (labelAction === 'None') {
                        itemTextSize = measureText(legendText, itemTextStyle);
                    }
                    else if (labelAction === 'Trim') {
                        legendText = textTrim((orientation_1 === 'Horizontal' ? rectWidth : rectHeight), legendText, itemTextStyle);
                        itemTextSize = measureText(legendText, itemTextStyle);
                    }
                    else {
                        legendText = '';
                    }
                    maxTextHeight = Math.max(maxTextHeight, itemTextSize.height);
                    maxTextWidth = Math.max(maxTextWidth, itemTextSize.width);
                    if (itemTextSize.width > 0 && itemTextSize.height > 0) {
                        if (orientation_1 === 'Horizontal') {
                            textX = startX_1 + (rectWidth / 2);
                            textY = (placement === 'After') ? (startY_1 + rectHeight + (itemTextSize.height / 2)) + textPadding_1 :
                                (startY_1 - textPadding_1);
                        }
                        else {
                            textX = (placement === 'After') ? startX_1 - (itemTextSize.width / 2) - textPadding_1
                                : (startX_1 + rectWidth + itemTextSize.width / 2) + textPadding_1;
                            textY = startY_1 + (rectHeight / 2) + (itemTextSize.height / 4);
                        }
                    }
                    if (i === 0) {
                        itemStartX = (orientation_1 === 'Horizontal') ? startX_1 : (placement === 'After') ?
                            textX - (itemTextSize.width / 2) : startX_1;
                        itemStartY = (orientation_1 === 'Horizontal') ? (placement === 'After') ? startY_1 :
                            textY - (itemTextSize.height / 2) : startY_1;
                    }
                    if (i === legendLength - 1) {
                        legendWidth = (orientation_1 === 'Horizontal') ? Math.abs((startX_1 + rectWidth) - itemStartX) :
                            (rectWidth + maxTextWidth + textPadding_1);
                        legendHeight = (orientation_1 === 'Horizontal') ? (rectHeight + (maxTextHeight / 2) + textPadding_1) :
                            Math.abs((startY_1 + rectHeight) - itemStartY);
                    }
                    this.legendRenderingCollections.push({
                        fill: this.legendCollections[i]['legendFill'], x: startX_1, y: startY_1,
                        width: rectWidth, height: rectHeight, element: this.legendCollections[i]['gradientElement'],
                        text: legendText, textX: textX, textY: textY,
                        textWidth: itemTextSize.width, textHeight: itemTextSize.height,
                        data: this.legendCollections[i]['legendData']
                    });
                }
                this.legendItemRect = { x: itemStartX, y: itemStartY, width: legendWidth, height: legendHeight };
            }
        }
    };
    TreeMapLegend.prototype.getPageChanged = function () {
        this.page++;
        if (isNullOrUndefined(this.totalPages[this.page])) {
            this.totalPages[this.page] = { Page: (this.page + 1), Collection: [] };
        }
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    TreeMapLegend.prototype.findColorMappingLegendItems = function (data) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        var child = findChildren(data)['values'];
        if (child && child.length > 0) {
            this.calculateLegendItems(child);
            if (this.treemap.levels.length > 0) {
                for (var i = 0; i < child.length; i++) {
                    this.findColorMappingLegendItems(child[i]);
                }
            }
        }
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    TreeMapLegend.prototype.findPaletteLegendItems = function (data) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        var child;
        var legendFillColor;
        if (!isNullOrUndefined(this.treemap.drilledItems)) {
            if (this.treemap.drilledItems.length === 0 && !isNullOrUndefined(this.treemap.initialDrillDown.groupName)
                && isNullOrUndefined(this.treemap.drilledLegendItems)) {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                var items = findChildren(data)['values'];
                for (var k = 0; k < items.length; k++) {
                    if (items[k]['Name'] === this.treemap.initialDrillDown.groupName) {
                        items[k]['isDrilled'] = !items[k]['isDrilled'];
                        data = items[k];
                        this.treemap.currentLevel = this.treemap.initialDrillDown.groupIndex;
                        legendFillColor = this.treemap.palette.length > 0 ? this.treemap.palette[k % this.treemap.palette.length] :
                            items[k]['data'][this.treemap.colorValuePath];
                        break;
                    }
                }
            }
        }
        if (this.treemap.enableDrillDown && !isNullOrUndefined(this.treemap.drilledLegendItems)) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            var childElement = this.treemap.drilledLegendItems;
            if (!isNullOrUndefined(childElement['data']['options'])) {
                legendFillColor = childElement['data']['options']['fill'];
            }
            else {
                for (var k = 0; k < childElement.length; k++) {
                    legendFillColor = this.treemap.palette.length > 0 ? this.treemap.palette[k % this.treemap.palette.length] :
                        childElement[k]['data'][this.treemap.colorValuePath];
                    break;
                }
            }
            if (childElement['data']['isDrilled']) {
                child = findChildren(childElement['data'])['values'];
            }
            else {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                var parentElement = childElement['data']['parent'];
                child = findChildren(parentElement)['values'];
            }
        }
        else {
            child = findChildren(data)['values'];
        }
        var isDuplicate;
        var legendName;
        if (child && child.length > 0) {
            for (var i = 0; i < child.length; i++) {
                if (isNullOrUndefined(child[i]['data'][this.treemap.legendSettings.showLegendPath]) ||
                    child[i]['data'][this.treemap.legendSettings.showLegendPath]) {
                    legendName = child[i]['data'][this.treemap.legendSettings.valuePath] ?
                        child[i]['data'][this.treemap.legendSettings.valuePath] : child[i]['name'];
                    isDuplicate = this.treemap.legendSettings.removeDuplicateLegend ?
                        this.removeDuplicates(this.legendCollections, legendName) : false;
                    if (!isDuplicate) {
                        this.legendCollections.push({
                            legendName: legendName,
                            legendFill: this.treemap.palette.length > 0 ? !isNullOrUndefined(this.treemap.currentLevel)
                                ? legendFillColor : this.treemap.palette[i % this.treemap.palette.length] :
                                child[i]['data'][this.treemap.colorValuePath],
                            legendData: [],
                            itemArea: child[i]['weight'],
                            levelOrderName: child[i]['levelOrderName']
                        });
                    }
                }
            }
            this.legendCollections.sort(orderByArea);
            if (this.treemap.palette.length > 0) {
                for (var j = 0; j < this.legendCollections.length; j++) {
                    this.legendCollections[j]['legendFill'] = !isNullOrUndefined(this.treemap.currentLevel)
                        ? legendFillColor : this.treemap.palette[j % this.treemap.palette.length];
                }
            }
        }
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    TreeMapLegend.prototype.calculateLegendItems = function (data) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        var isAddData;
        var fill;
        var rangeValue;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        var currentData;
        var legendText;
        var isLeafItem;
        var colorMapProcess = false;
        var colorMapping;
        var groupIndex;
        var leaf = this.treemap.leafItemSettings;
        var levels = this.treemap.levels;
        var equalValue;
        var position = this.treemap.legendSettings.position;
        var gradientElement;
        var x2;
        var y2;
        var actualValue;
        var isDuplicate;
        var isEqualColor;
        var isRange;
        var isDesaturation = false;
        var legendIndex = 0;
        var outfill;
        var labelLegend;
        var otherIndex;
        this.outOfRangeLegend = null;
        for (var i = 0; i < data.length; i++) {
            fill = '';
            isEqualColor = false;
            isRange = false;
            isDesaturation = false;
            currentData = data[i]['data'];
            groupIndex = data[i]['groupIndex'];
            isLeafItem = (this.treemap.levels.length === 0 || groupIndex === this.treemap.levels.length);
            colorMapping = isLeafItem ? leaf.colorMapping : levels[groupIndex].colorMapping;
            for (var j = 0; j < colorMapping.length; j++) {
                var colorMap = colorMapping[j];
                gradientElement = null;
                rangeValue = Number(currentData[this.treemap.rangeColorValuePath]);
                equalValue = currentData[this.treemap.equalColorValuePath];
                colorMap.value = !isNullOrUndefined(colorMap.value) ? colorMap.value.toString() : colorMap.value;
                if (!isNullOrUndefined(colorMap.from) && !isNullOrUndefined(colorMap.to) &&
                    rangeValue >= colorMap.from && rangeValue <= colorMap.to && colorMap.showLegend) {
                    colorMapProcess = true;
                    isRange = true;
                    actualValue = colorMap.from + ' - ' + colorMap.to;
                    legendText = !isNullOrUndefined(colorMap.label) ? colorMap.label : colorMap.from + ' - ' + colorMap.to;
                    fill = isNullOrUndefined(colorMap.color) ? fill : colorMap.color;
                    isAddData = this.isAddNewLegendData(actualValue);
                }
                else if (!isNullOrUndefined(colorMap.value) && equalValue === colorMap.value && colorMap.showLegend) {
                    colorMapProcess = true;
                    isEqualColor = true;
                    actualValue = colorMap.value.toString();
                    legendText = !isNullOrUndefined(colorMap.label) ? colorMap.label : colorMap.value.toString();
                    fill = isNullOrUndefined(colorMap.color) ? fill :
                        Object.prototype.toString.call(colorMap.color) === '[object Array]' ? colorMap.color[0] : colorMap.color;
                    isAddData = this.isAddNewLegendData(actualValue);
                }
                if (colorMapProcess && isNullOrUndefined(colorMap.value) && colorMap.maxOpacity && colorMap.minOpacity
                    && this.treemap.legendSettings.mode === 'Interactive') {
                    var colors = [];
                    isDesaturation = true;
                    if (Object.prototype.toString.call(colorMap.color) === '[object Array]') {
                        for (var q = 0; q < colorMap.color.length; q++) {
                            var offsetColor = 100 / (colorMap.color.length - 1);
                            var offsetValue = q * offsetColor + '%';
                            var stop1Color = { colorStop: offsetValue.toString(), color: colorMap.color[q] };
                            colors.push(stop1Color);
                        }
                    }
                    else {
                        var stop1Color = { colorStop: '0%', color: fill };
                        var stop2Color = { colorStop: '100%', color: fill };
                        colors.push(stop1Color);
                        colors.push(stop2Color);
                    }
                    x2 = position === 'Top' || position === 'Bottom' ? '100%' : '0%';
                    y2 = position === 'Top' || position === 'Bottom' ? '0%' : '100%';
                    var gradient = {
                        id: 'groupIndex_' + groupIndex + '_colorIndex_' + this.gradientCount, x1: '0%', y1: '0%', x2: x2, y2: y2
                    };
                    gradientElement = this.treemap.renderer.drawGradient('linearGradient', gradient, colors).childNodes[0];
                    if (Object.prototype.toString.call(colorMap.color) !== '[object Array]') {
                        gradientElement.childNodes[0].setAttribute('stop-opacity', colorMap.minOpacity.toString());
                        gradientElement.childNodes[1].setAttribute('stop-opacity', colorMap.maxOpacity.toString());
                    }
                    this.defsElement.appendChild(gradientElement);
                    this.gradientCount++;
                }
                isDuplicate = this.treemap.legendSettings.removeDuplicateLegend ?
                    this.removeDuplicates(this.legendCollections, legendText) : false;
                if (isAddData && isAddData['process'] && colorMapProcess && !isDuplicate) {
                    colorMapProcess = false;
                    fill = ((Object.prototype.toString.call(colorMap.color) === '[object Array]')) && isNullOrUndefined(gradientElement)
                        && isNullOrUndefined(colorMap.value) ? this.legendGradientColor(colorMap, legendIndex) : fill;
                    this.legendCollections.push({
                        actualValue: actualValue, levelIndex: !isLeafItem ? j : -1, leafIndex: isLeafItem ? j : -1,
                        legendName: legendText, legendFill: fill, legendData: [], groupIndex: !isLeafItem ? groupIndex : -1,
                        gradientElement: !isNullOrUndefined(gradientElement) ? gradientElement : isNullOrUndefined(colorMap.value)
                            ? this.legendLinearGradient : null, name: data[i]['name'],
                        opacity: this.treemap.legendSettings.opacity, borderColor: this.treemap.legendSettings.border.color,
                        borderWidth: this.treemap.legendSettings.border.width
                    });
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    this.legendCollections[this.legendCollections.length - 1]['legendData'].push(data[i]);
                    legendIndex++;
                }
                else if (colorMapProcess) {
                    colorMapProcess = false;
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    this.legendCollections[isAddData['value']]['legendData'].push(data[i]);
                }
                if (!isRange && !isDesaturation && !isEqualColor) {
                    if (isNullOrUndefined(colorMap.from) && isNullOrUndefined(colorMap.to)
                        && isNullOrUndefined(colorMap.minOpacity) &&
                        isNullOrUndefined(colorMap.maxOpacity) && isNullOrUndefined(colorMap.value) &&
                        !isNullOrUndefined(colorMap.color)) {
                        outfill = ((Object.prototype.toString.call(colorMap.color) === '[object Array]'))
                            ? colorMap.color[0] : colorMap.color;
                        labelLegend = !isNullOrUndefined(colorMap.label) ? colorMap.label : 'Others';
                        isDuplicate = this.treemap.legendSettings.removeDuplicateLegend ?
                            this.removeDuplicates(this.legendCollections, labelLegend) : false;
                        if (isNullOrUndefined(this.outOfRangeLegend) && !isDuplicate) {
                            this.legendCollections.push({
                                actualValue: labelLegend, legendData: [],
                                legendName: labelLegend, legendFill: outfill, groupIndex: (!isLeafItem || groupIndex > -1) ? groupIndex : -1
                            });
                            otherIndex = this.legendCollections.length;
                            this.outOfRangeLegend = this.legendCollections[otherIndex - 1];
                            legendIndex++;
                        }
                        for (var k = this.legendCollections.length - 1; k >= 0; k--) {
                            if (this.legendCollections[k]['actualValue'] === (colorMap.label || 'Others')) {
                                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                this.legendCollections[k]['legendData'].push(data[i]);
                                break;
                            }
                        }
                    }
                }
            }
        }
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    TreeMapLegend.prototype.removeDuplicates = function (legendCollection, text) {
        var isDuplicate = false;
        for (var i = 0; i < legendCollection.length; i++) {
            if (legendCollection[i]['legendName'] === text) {
                isDuplicate = true;
                break;
            }
            else {
                continue;
            }
        }
        return isDuplicate;
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    TreeMapLegend.prototype.isAddNewLegendData = function (legendText) {
        var newDataProcess;
        var itemValue;
        if (this.legendCollections.length === 0) {
            newDataProcess = true;
        }
        else {
            for (var j = 0; j < this.legendCollections.length; j++) {
                if (legendText === this.legendCollections[j]['actualValue']) {
                    newDataProcess = false;
                    itemValue = j;
                    break;
                }
                else if (j === this.legendCollections.length - 1) {
                    newDataProcess = true;
                }
            }
        }
        return { process: newDataProcess, value: itemValue };
    };
    // eslint-disable-next-line valid-jsdoc
    /**
     * To draw the legend
     *
     * @private
     */
    TreeMapLegend.prototype.drawLegend = function () {
        var legend = this.treemap.legendSettings;
        var render = this.treemap.renderer;
        var fill;
        var textOptions;
        var gradientElement;
        var textFont = legend.textStyle;
        this.legendGroup = render.createGroup({ id: this.treemap.element.id + '_Legend_Group' });
        this.renderLegendBorder();
        this.renderLegendTitle();
        if (legend.mode === 'Default') {
            this.drawLegendItem(this.currentPage);
        }
        else {
            for (var i = 0; i < this.legendRenderingCollections.length; i++) {
                var itemId = this.treemap.element.id + '_Legend_Index_' + i;
                var textId = this.treemap.element.id + '_Legend_Index_' + i + '_Text';
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                var item = this.legendRenderingCollections[i];
                gradientElement = item['element'];
                fill = gradientElement ? 'url(#' + gradientElement.id + ')' : item['fill'];
                var bounds = new Rect(item['x'], item['y'], item['width'], item['height']);
                var textLocation = new Location(item['textX'], item['textY']);
                var rectOptions = new RectOption(itemId, fill, legend.shapeBorder, legend.opacity, bounds);
                if (this.treemap.enableRtl) {
                    if (this.treemap.legendSettings.position === 'Left' || this.treemap.legendSettings.position === 'Right'
                        || (this.treemap.legendSettings.position === 'Auto'
                            && this.treemap.availableSize.width >= this.treemap.availableSize.height)) {
                        rectOptions.y = (this.translate.y + this.legendBorderRect.y + this.legendBorderRect.height)
                            - (this.translate.y + rectOptions.height) - Math.abs(this.legendBorderRect.y - rectOptions.y);
                        textLocation.y = (this.translate.y + this.legendBorderRect.y + this.legendBorderRect.height)
                            - (this.translate.y) + (item['textHeight'] / 2)
                            - Math.abs(this.legendBorderRect.y - textLocation.y);
                    }
                    else {
                        rectOptions.x = (this.translate.x + this.legendBorderRect.x + this.legendBorderRect.width)
                            - (this.translate.x + rectOptions.width)
                            - Math.abs(this.legendBorderRect.x - rectOptions.x);
                        textLocation.x = (this.translate.x + this.legendBorderRect.x + this.legendBorderRect.width)
                            - this.translate.x - Math.abs(this.legendBorderRect.x - textLocation.x);
                    }
                }
                var text = this.treemap.enableHtmlSanitizer ? (SanitizeHtmlHelper.sanitize(item['text'])) : item['text'];
                textOptions = new TextOption(textId, textLocation.x, textLocation.y, 'middle', text, '', '');
                renderTextElement(textOptions, textFont, textFont.color || this.treemap.themeStyle.legendTextColor, this.legendGroup);
                var legendElement = render.drawRectangle(rectOptions);
                legendElement.setAttribute('tabindex', this.treemap.tabIndex.toString());
                legendElement.style.outline = '';
                this.legendGroup.appendChild(legendElement);
            }
        }
        legendMaintain(this.treemap, this.legendGroup);
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    TreeMapLegend.prototype.defaultLegendRtlLocation = function (collection, spacing, treemap, legend) {
        var shapeLocation = collection['Shape'];
        var textLocation = collection['Text'];
        var legendText = collection['DisplayText'];
        var textSize = measureText(legendText, legend.textStyle);
        shapeLocation.x = (this.translate.x + this.legendBorderRect.x + this.legendBorderRect.width)
            - (this.translate.x + spacing) - Math.abs(this.legendBorderRect.x - shapeLocation.x);
        textLocation.x = (this.translate.x + this.legendBorderRect.x + this.legendBorderRect.width)
            - (this.translate.x + textSize.width + spacing) - Math.abs(this.legendBorderRect.x - textLocation.x);
        if (treemap.legendSettings.position === 'Left' || treemap.legendSettings.position === 'Right'
            || (treemap.legendSettings.position === 'Auto'
                && this.treemap.availableSize.width >= this.treemap.availableSize.height)) {
            shapeLocation.y = (this.translate.y + this.legendBorderRect.y + this.legendBorderRect.height)
                - this.translate.y - Math.abs(Math.abs(this.legendBorderRect.y) - shapeLocation.y) - (legend.shapeHeight / 2);
            textLocation.y = (this.translate.y + this.legendBorderRect.y + this.legendBorderRect.height)
                - this.translate.y - Math.abs(Math.abs(this.legendBorderRect.y) - textLocation.y);
        }
        return { shapeLocation: shapeLocation, textLocation: textLocation };
    };
    TreeMapLegend.prototype.drawLegendItem = function (page) {
        var _this = this;
        var treemap = this.treemap;
        var spacing = 10;
        var legend = treemap.legendSettings;
        var shapeSize = new Size(legend.shapeWidth, legend.shapeHeight);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        var textOptions;
        var legendRtlLocation;
        var render = treemap.renderer;
        var shapeBorder = legend.shapeBorder;
        var eventArgs;
        if (page >= 0 && page < this.totalPages.length) {
            if (document.getElementById(this.legendGroup.id)) {
                document.getElementById(this.legendGroup.id).remove();
            }
            var isLineShape_1 = (legend.shape === 'HorizontalLine' || legend.shape === 'VerticalLine' || legend.shape === 'Cross');
            var strokeColor_1 = isLineShape_1 ? isNullOrUndefined(legend.fill) ? '#000000' : legend.fill : shapeBorder.color;
            var strokeWidth_1 = isLineShape_1 ? (shapeBorder.width === 0) ? 1 : shapeBorder.width : shapeBorder.width;
            var _loop_1 = function (i) {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                var collection = this_1.totalPages[page]['Collection'][i];
                var legendText = this_1.treemap.enableHtmlSanitizer ? SanitizeHtmlHelper.sanitize(collection['DisplayText']) : collection['DisplayText'];
                var legendElement = render.createGroup({ id: treemap.element.id + '_Legend_Index_' + i });
                legendElement.setAttribute('aria-label', legendText + ' Legend');
                legendElement.setAttribute('role', 'region');
                legendElement.setAttribute('tabindex', this_1.treemap.tabIndex.toString());
                legendElement.style.outline = 'none';
                var shapeId = treemap.element.id + '_Legend_Shape_Index_' + i;
                var textId = treemap.element.id + '_Legend_Text_Index_' + i;
                var shapeLocation = collection['Shape'];
                var textLocation = collection['Text'];
                if (treemap.enableRtl) {
                    legendRtlLocation = this_1.defaultLegendRtlLocation(collection, spacing, treemap, legend);
                    shapeLocation = legendRtlLocation['shapeLocation'];
                    textLocation = legendRtlLocation['textLocation'];
                }
                eventArgs = {
                    cancel: false, name: legendItemRendering, treemap: treemap, fill: collection['Fill'],
                    shape: legend.shape, imageUrl: legend.imageUrl
                };
                treemap.trigger(legendItemRendering, eventArgs, function (observedArgs) {
                    var renderOptions = new PathOption(shapeId, observedArgs.fill, strokeWidth_1, isLineShape_1 ? collection['Fill'] : strokeColor_1, legend.opacity, '');
                    legendElement.appendChild(drawSymbol(shapeLocation, observedArgs.shape, shapeSize, observedArgs.imageUrl, renderOptions));
                    textOptions = new TextOption(textId, textLocation.x, textLocation.y, 'start', legendText, '', '');
                    renderTextElement(textOptions, legend.textStyle, legend.textStyle.color || treemap.themeStyle.legendTextColor, legendElement);
                    _this.legendGroup.appendChild(legendElement);
                });
            };
            var this_1 = this;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            for (var i = 0; i < this.totalPages[page]['Collection'].length; i++) {
                _loop_1(i);
            }
            var pagingGroup = void 0;
            var width = spacing;
            var height = (spacing / 2);
            if (this.page !== 0) {
                var pagingText = (page + 1) + '/' + this.totalPages.length;
                var pagingFont = legend.textStyle;
                var pagingTextSize = measureText(pagingText, pagingFont);
                var leftPageX = (this.legendItemRect.x + this.legendItemRect.width) - pagingTextSize.width -
                    (width * 2) - spacing;
                var rightPageX = (this.legendItemRect.x + this.legendItemRect.width);
                var locY = (this.legendItemRect.y + this.legendItemRect.height) + (height / 2) + spacing;
                var pageTextX = rightPageX - width - (pagingTextSize.width / 2) - (spacing / 2);
                pagingGroup = render.createGroup({ id: treemap.element.id + '_Legend_Paging_Group' });
                var leftPageElement = render.createGroup({ id: treemap.element.id + '_Legend_Left_Paging_Group' });
                var rightPageElement = render.createGroup({ id: treemap.element.id + '_Legend_Right_Paging_Group' });
                var rightPath = ' M ' + rightPageX + ' ' + locY + ' L ' + (rightPageX - width) + ' ' + (locY - height) +
                    ' L ' + (rightPageX - width) + ' ' + (locY + height) + ' z ';
                var leftPath = ' M ' + leftPageX + ' ' + locY + ' L ' + (leftPageX + width) + ' ' + (locY - height) +
                    ' L ' + (leftPageX + width) + ' ' + (locY + height) + ' z ';
                var leftPageOptions = new PathOption(treemap.element.id + '_Left_Page', '#a6a6a6', 0, '#a6a6a6', 1, '', leftPath);
                leftPageElement.appendChild(render.drawPath(leftPageOptions));
                var leftRectPageOptions = new RectOption(treemap.element.id + '_Left_Page_Rect', 'transparent', {}, 1, new Rect(leftPageX - (width / 2), (locY - (height * 2)), width * 2, spacing * 2), '');
                leftPageElement.appendChild(render.drawRectangle(leftRectPageOptions));
                this.wireEvents(leftPageElement);
                var rightPageOptions = new PathOption(treemap.element.id + '_Right_Page', '#a6a6a6', 0, '#a6a6a6', 1, '', rightPath);
                rightPageElement.appendChild(render.drawPath(rightPageOptions));
                var rightRectPageOptions = new RectOption(treemap.element.id + '_Right_Page_Rect', 'transparent', {}, 1, new Rect((rightPageX - width), (locY - height), width, spacing), '');
                rightPageElement.appendChild(render.drawRectangle(rightRectPageOptions));
                this.wireEvents(rightPageElement);
                pagingGroup.appendChild(leftPageElement);
                pagingGroup.appendChild(rightPageElement);
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                var pageTextOptions = {
                    'id': treemap.element.id + '_Paging_Text',
                    'x': pageTextX,
                    'y': locY + (pagingTextSize.height / 4),
                    'fill': '#a6a6a6',
                    'font-size': '14px',
                    'font-style': pagingFont.fontStyle,
                    'font-family': pagingFont.fontFamily,
                    'font-weight': pagingFont.fontWeight,
                    'text-anchor': 'middle',
                    'transform': '',
                    'opacity': 1,
                    'dominant-baseline': '',
                    'role': 'region',
                    'aria-label': pagingText
                };
                pagingGroup.appendChild(render.createText(pageTextOptions, pagingText));
                this.legendGroup.appendChild(pagingGroup);
            }
        }
    };
    TreeMapLegend.prototype.renderLegendBorder = function () {
        var treemap = this.treemap;
        var legend = treemap.legendSettings;
        var legendTitle = legend.title.text;
        var spacing = 10;
        var textStyle = legend.titleStyle;
        var title = textTrim((this.legendItemRect.width + (spacing * 2)), legendTitle, textStyle);
        var textSize = measureText(title, textStyle);
        this.legendBorderRect = new Rect((this.legendItemRect.x - spacing), (this.legendItemRect.y - spacing - textSize.height), (this.legendItemRect.width) + (spacing * 2), (this.legendItemRect.height) + (spacing * 2) + textSize.height +
            (legend.mode === 'Interactive' ? 0 : (this.page !== 0) ? spacing : 0));
        var borderStyle = {
            color: legend.border.color || this.treemap.themeStyle.legendBorderColor,
            width: legend.border.width || this.treemap.themeStyle.legendBorderWidth
        };
        var renderOptions = new RectOption(treemap.element.id + '_Legend_Border', legend.background, borderStyle, 1, this.legendBorderRect, '');
        var legendBorder = treemap.renderer.drawRectangle(renderOptions);
        legendBorder.style.pointerEvents = 'none';
        this.legendGroup.appendChild(legendBorder);
        this.getLegendAlignment(treemap, this.legendBorderRect.width, this.legendBorderRect.height, legend);
        this.legendGroup.setAttribute('transform', 'translate( ' + (this.translate.x + (-(this.legendBorderRect.x))) + ' ' +
            (this.translate.y + (-(this.legendBorderRect.y))) + ' )');
        treemap.svgObject.appendChild(this.legendGroup);
    };
    TreeMapLegend.prototype.renderLegendTitle = function () {
        var legend = this.treemap.legendSettings;
        var textStyle = legend.titleStyle;
        var legendTitle = this.treemap.enableHtmlSanitizer ? (SanitizeHtmlHelper.sanitize(legend.title.text)) : legend.title.text;
        var textOptions;
        var spacing = 10;
        var trimTitle = textTrim((this.legendItemRect.width + (spacing * 2)), legendTitle, textStyle);
        var textSize = measureText(trimTitle, textStyle);
        if (legendTitle) {
            textOptions = new TextOption(this.treemap.element.id + '_LegendTitle', (this.legendItemRect.x) + (this.legendItemRect.width / 2), this.legendItemRect.y - (textSize.height / 2) - (spacing / 2), 'middle', trimTitle, '');
            var textElement = renderTextElement(textOptions, textStyle, textStyle.color ||
                this.treemap.themeStyle.legendTitleColor, this.legendGroup);
            textElement.setAttribute('role', 'region');
            textElement.setAttribute('aria-label', legendTitle);
        }
    };
    /**
     * To rendered the interactive pointer
     *
     * @param {PointerEvent | TouchEvent} e - Specifies the pointer argument.
     * @returns {void}
     * @private
     */
    TreeMapLegend.prototype.renderInteractivePointer = function (e) {
        var treemap = this.treemap;
        var target = e.target;
        var interactiveId = treemap.element.id + '_Interactive_Legend';
        var pointerDrawn = false;
        target = !(e.type.indexOf('touch') > -1) ? target :
            document.elementFromPoint(e.changedTouches[0].clientX, e.changedTouches[0].clientY);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        var targetItem;
        var legend = treemap.legendSettings;
        if (target.id.indexOf('_Item_Index') > -1 && legend.visible && this.legendRenderingCollections.length > 0) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            var currentData = void 0;
            var legendRect = void 0;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            var data = void 0;
            var fill = void 0;
            var stroke = void 0;
            var strokeWidth = void 0;
            var legendElement = void 0;
            targetItem = treemap.layout.renderItems[parseFloat(target.id.split('_Item_Index_')[1])];
            var svgRect = treemap.svgObject.getBoundingClientRect();
            for (var i = 0; i < this.legendCollections.length && !pointerDrawn; i++) {
                currentData = this.legendCollections[i];
                legendElement = document.getElementById(treemap.element.id + '_Legend_Index_' + i);
                legendRect = legendElement.getBoundingClientRect();
                var rect = new Rect(Math.abs(legendRect.left - svgRect.left), Math.abs(legendRect.top - svgRect.top), legendRect.width, legendRect.height);
                fill = legendElement.getAttribute('fill');
                stroke = legend.shapeBorder.color;
                strokeWidth = legend.shapeBorder.width;
                if (!isNullOrUndefined(currentData['legendData']) && currentData['legendData'].length > 0) {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    data = currentData['legendData'];
                    var valuePath = treemap.rangeColorValuePath;
                    if (targetItem['levelOrderName'].indexOf(this.legendCollections[i]['legendName']) > -1) {
                        this.drawInteractivePointer(legend, fill, stroke, interactiveId, strokeWidth, rect);
                        pointerDrawn = true;
                    }
                    else {
                        for (var j = 0; j < data.length; j++) {
                            if ((treemap.rangeColorValuePath && treemap.leafItemSettings.colorMapping.length > 0)
                                ? data[j]['data'][valuePath] === targetItem['data'][valuePath]
                                : (data[j]['levelOrderName'] === targetItem['levelOrderName'] ||
                                    data[j]['levelOrderName'].indexOf(targetItem['levelOrderName']) > -1)) {
                                this.drawInteractivePointer(legend, fill, stroke, interactiveId, strokeWidth, rect);
                                pointerDrawn = true;
                                break;
                            }
                        }
                    }
                }
                else if (this.treemap.leafItemSettings.colorMapping.length === 0 && this.treemap.palette) {
                    if (targetItem['levelOrderName'].indexOf(currentData['levelOrderName']) > -1) {
                        this.drawInteractivePointer(legend, fill, stroke, interactiveId, strokeWidth, rect);
                        pointerDrawn = true;
                    }
                }
            }
        }
        else {
            this.removeInteractivePointer();
        }
    };
    TreeMapLegend.prototype.drawInteractivePointer = function (legend, fill, stroke, id, strokeWidth, rect) {
        var path;
        var locX;
        var locY;
        var height = 10;
        var width = 10;
        var direction = (legend.orientation === 'None') ? (legend.position === 'Top' || legend.position === 'Bottom')
            ? 'Horizontal' : 'Vertical' : legend.orientation;
        if (direction === 'Horizontal') {
            if (!legend.invertedPointer) {
                locX = rect.x + (rect.width / 2);
                locY = rect.y;
                path = ' M ' + locX + ' ' + locY + ' L ' + (locX - width) + ' ' + (locY - height) +
                    ' L ' + (locX + width) + ' ' + (locY - height) + ' Z ';
            }
            else {
                locX = rect.x + (rect.width / 2);
                locY = rect.y + (rect.height);
                path = ' M ' + locX + ' ' + locY + ' L ' + (locX - width) + ' ' + (locY + height) +
                    ' L ' + (locX + width) + ' ' + (locY + height) + ' Z ';
            }
        }
        else {
            if (!legend.invertedPointer) {
                locX = rect.x + (rect.width);
                locY = rect.y + (rect.height / 2);
                path = ' M ' + locX + ' ' + locY + ' L ' + (locX + width) + ' ' + (locY - height) +
                    ' L ' + (locX + width) + ' ' + (locY + height) + ' z ';
            }
            else {
                locX = rect.x;
                locY = rect.y + (rect.height / 2);
                path = ' M ' + locX + ' ' + locY + ' L ' + (locX - width) + ' ' + (locY - height) +
                    ' L ' + (locX - width) + ' ' + (locY + height) + ' z ';
            }
        }
        var pathOptions = new PathOption(id, fill, strokeWidth, stroke, 1, '', path);
        this.treemap.svgObject.appendChild(this.treemap.renderer.drawPath(pathOptions));
    };
    TreeMapLegend.prototype.getLegendAlignment = function (treemap, width, height, legend) {
        var x;
        var y;
        var spacing = 10;
        var totalRect;
        // eslint-disable-next-line prefer-const
        totalRect = extend({}, treemap.areaRect, totalRect, true);
        var areaX = totalRect.x;
        var areaY = totalRect.y;
        var areaHeight = totalRect.height;
        var areaWidth = totalRect.width;
        var totalWidth = treemap.availableSize.width;
        var totalHeight = treemap.availableSize.height;
        var position = legend.position === 'Auto' ? (totalWidth > totalHeight) ? 'Right' : 'Bottom' : legend.position;
        if (legend.position === 'Float') {
            this.translate = legend.location;
        }
        else {
            switch (position) {
                case 'Top':
                case 'Bottom':
                    totalRect.height = (areaHeight - height);
                    x = (totalWidth / 2) - (width / 2);
                    y = (position === 'Top') ? areaY : (areaY + totalRect.height) + spacing;
                    totalRect.y = (position === 'Top') ? areaY + height + spacing : areaY;
                    break;
                case 'Left':
                case 'Right':
                    totalRect.width = (areaWidth - width);
                    x = (position === 'Left') ? areaX : areaX + totalRect.width;
                    y = (totalHeight / 2) - (height / 2);
                    totalRect.x = (position === 'Left') ? areaX + width : areaX;
                    break;
            }
            switch (legend.alignment) {
                case 'Near':
                    if (position === 'Top' || position === 'Bottom') {
                        x = totalRect.x;
                    }
                    else {
                        y = totalRect.y;
                    }
                    break;
                case 'Far':
                    if (position === 'Top' || position === 'Bottom') {
                        x = totalWidth - width;
                    }
                    else {
                        y = totalHeight - height;
                    }
                    break;
            }
            this.treemap.totalRect = totalRect;
            this.translate = new Location(x, y);
        }
    };
    /**
     * @param {PointerEvent} e - Specifies the event.
     * @returns {void}
     * @private
     */
    TreeMapLegend.prototype.mouseUpHandler = function (e) {
        this.renderInteractivePointer(e);
        clearTimeout(this.clearTimeout);
        this.clearTimeout = setTimeout(this.removeInteractivePointer.bind(this), 3000);
    };
    // eslint-disable-next-line valid-jsdoc
    /**
     * To remove the interactive pointer
     *
     * @private
     */
    TreeMapLegend.prototype.removeInteractivePointer = function () {
        if (document.getElementById(this.treemap.element.id + '_Interactive_Legend')) {
            var legendElementId = document.getElementById(this.treemap.element.id + '_Interactive_Legend');
            legendElementId.parentNode.removeChild(legendElementId);
        }
    };
    /**
     * To change the next page
     *
     * @param {PointerEvent} e - Specifies the pointer event argument.
     * @returns {void}
     * @private
     */
    TreeMapLegend.prototype.changeNextPage = function (e) {
        this.currentPage = (e.target.id.indexOf('_Left_Page_') > -1) ? (this.currentPage - 1) :
            (this.currentPage + 1);
        if (this.currentPage >= 0 && this.currentPage < this.totalPages.length) {
            this.drawLegend();
        }
        else {
            this.currentPage = (e.target.id.indexOf('_Left_Page_') > -1) ? 0 : this.totalPages.length - 1;
        }
    };
    /**
     * Wire events for event handler
     *
     * @param {Element} element - Specifies the element.
     * @returns {void}
     * @private
     */
    TreeMapLegend.prototype.wireEvents = function (element) {
        EventHandler.add(element, Browser.touchStartEvent, this.changeNextPage, this);
    };
    // eslint-disable-next-line valid-jsdoc
    /**
     * To add the event listener
     *
     * @private
     */
    TreeMapLegend.prototype.addEventListener = function () {
        if (this.treemap.isDestroyed) {
            return;
        }
        this.treemap.on(Browser.touchMoveEvent, this.renderInteractivePointer, this);
        this.treemap.on(Browser.touchEndEvent, this.mouseUpHandler, this);
    };
    // eslint-disable-next-line valid-jsdoc
    /**
     * To remove the event listener
     *
     * @private
     */
    TreeMapLegend.prototype.removeEventListener = function () {
        if (this.treemap.isDestroyed) {
            return;
        }
        this.treemap.off(Browser.touchMoveEvent, this.renderInteractivePointer);
        this.treemap.off(Browser.touchEndEvent, this.mouseUpHandler);
    };
    /**
     * Get module name.
     *
     * @returns {string} Returns the legend module name.
     */
    TreeMapLegend.prototype.getModuleName = function () {
        return 'treeMapLegend';
    };
    /**
     * To destroy the legend.
     *
     * @returns {void}
     * @private
     */
    TreeMapLegend.prototype.destroy = function () {
        clearTimeout(this.clearTimeout);
        this.clearTimeout = null;
        this.legendRenderingCollections = [];
        this.legendCollections = [];
        this.outOfRangeLegend = null;
        this.totalPages = [];
        this.translate = null;
        this.legendBorderRect = null;
        this.legendGroup = null;
        this.legendNames = [];
        this.defsElement = null;
        this.legendLinearGradient = null;
        this.legendInteractiveGradient = [];
        this.legendItemRect = null;
        this.removeEventListener();
        this.treemap = null;
    };
    /**
     * Get the gradient color for interactive legend.
     *
     * @param {ColorMappingModel} colorMap - Specifies the color mapping instance.
     * @param {number} legendIndex - Specifies the index of legend.
     * @returns {string} - Returns the legend color.
     * @private
     */
    TreeMapLegend.prototype.legendGradientColor = function (colorMap, legendIndex) {
        var legendFillColor;
        var xmlns = 'http://www.w3.org/2000/svg';
        if (!isNullOrUndefined(colorMap.color) && Object.prototype.toString.call(colorMap.color) === '[object Array]') {
            var defElement = this.treemap.renderer.createDefs();
            var linerGradientEle = document.createElementNS(xmlns, 'linearGradient');
            var opacity = 1;
            var position = this.treemap.legendSettings.position;
            var x2 = position === 'Top' || position === 'Bottom' ? '100' : '0';
            var y2 = position === 'Top' || position === 'Bottom' ? '0' : '100';
            linerGradientEle.setAttribute('id', 'linear_' + legendIndex);
            linerGradientEle.setAttribute('x1', 0 + '%');
            linerGradientEle.setAttribute('y1', 0 + '%');
            linerGradientEle.setAttribute('x2', x2 + '%');
            linerGradientEle.setAttribute('y2', y2 + '%');
            for (var b = 0; b < colorMap.color.length; b++) {
                var offsetColor = 100 / (colorMap.color.length - 1);
                var stopEle = document.createElementNS(xmlns, 'stop');
                stopEle.setAttribute('offset', b * offsetColor + '%');
                stopEle.setAttribute('stop-color', colorMap.color[b]);
                stopEle.setAttribute('stop-opacity', opacity.toString());
                linerGradientEle.appendChild(stopEle);
            }
            defElement.appendChild(linerGradientEle);
            this.legendLinearGradient = linerGradientEle;
            var color = 'url(' + '#linear_' + legendIndex + ')';
            this.defsElement.appendChild(linerGradientEle);
            legendFillColor = color;
        }
        return legendFillColor;
    };
    return TreeMapLegend;
}());
export { TreeMapLegend };
