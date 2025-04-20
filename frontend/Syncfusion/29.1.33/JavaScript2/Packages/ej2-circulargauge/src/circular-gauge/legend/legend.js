import { getElement, stringToNumber, measureText, textElement, appendPath, calculateShapes, PathOption, RectOption, Size, GaugeLocation, Rect, TextOption } from '../utils/helper-common';
import { textTrim } from '../utils/helper-legend';
import { isNullOrUndefined } from '@syncfusion/ej2-base';
/*
 * Sets and gets the module to add the legend in the circular gauge.
 */
var Legend = /** @class */ (function () {
    function Legend(gauge) {
        this.legendRegions = [];
        this.rowCount = 0; // legend row counts per page
        this.pageButtonSize = 8;
        this.pageXCollections = []; // pages of x locations
        this.maxColumns = 0;
        this.maxWidth = 0;
        this.currentPage = 1;
        this.pagingRegions = [];
        /**
         * @private
         */
        this.position = 'Auto';
        this.gauge = gauge;
        this.toggledIndexes = [];
        this.legend = this.gauge.legendSettings;
        this.legendID = this.gauge.element.id + '_gauge_legend';
        this.addEventListener();
    }
    /**
     * Binding events for legend module.
     *
     * @returns {void}
     */
    Legend.prototype.addEventListener = function () {
        if (this.gauge.isDestroyed) {
            return;
        }
        //   this.gauge.on(Browser.touchMoveEvent, this.mouseMove, this);
        this.gauge.on('click', this.click, this);
        // this.gauge.on(Browser.touchEndEvent, this.mouseEnd, this);
    };
    /**
     * UnBinding events for legend module.
     *
     * @returns {void}
     */
    Legend.prototype.removeEventListener = function () {
        if (this.gauge.isDestroyed) {
            return;
        }
        //  this.gauge.off(Browser.touchMoveEvent, this.mouseMove);
        this.gauge.off('click', this.click);
        //  this.gauge.off(Browser.touchEndEvent, this.mouseEnd);
    };
    /**
     * Get the legend options.
     *
     * @param {Axis[]} axes - Specifies the axes.
     * @returns {void}
     * @private
     */
    Legend.prototype.getLegendOptions = function (axes) {
        this.legendCollection = [];
        var range;
        var text = '';
        for (var i = 0; i < axes.length; i++) {
            for (var j = 0; j < axes[i].ranges.length; j++) {
                range = axes[i].ranges[j];
                if (!isNullOrUndefined(range.start) && !isNullOrUndefined(range.end) && (range.start !== range.end)) {
                    text = range.legendText ? range.legendText : range.start + ' - ' + range.end;
                    this.legendCollection.push(new LegendOptions(text, text, range.color, this.legend.shape, this.legend.visible, this.legend.border, this.legend.shapeBorder, this.legend.shapeWidth, this.legend.shapeHeight, j, i));
                }
            }
        }
    };
    Legend.prototype.calculateLegendBounds = function (rect, availableSize) {
        var legend = this.legend;
        this.position = (legend.position !== 'Auto') ? legend.position :
            (availableSize.width > availableSize.height ? 'Right' : 'Bottom');
        this.legendBounds = (this.position === 'Custom') ? new Rect(legend.location.x, legend.location.y, 0, 0) : new Rect(rect.x, rect.y, 0, 0);
        this.isVertical = (this.position === 'Left' || this.position === 'Right');
        if (this.isVertical) {
            this.legendBounds.height = stringToNumber(legend.height, availableSize.height - (rect.y - this.gauge.margin.top)) || rect.height;
            this.legendBounds.width = stringToNumber(legend.width || '20%', availableSize.width);
        }
        else {
            this.legendBounds.width = stringToNumber(legend.width, availableSize.width) || rect.width;
            this.legendBounds.height = stringToNumber(legend.height || '20%', availableSize.height);
        }
        this.getLegendBounds(availableSize, this.legendBounds, legend);
        this.getLocation(this.position, legend.alignment, this.legendBounds, rect, availableSize);
    };
    /**
     * To find legend alignment for chart and accumulation chart
     *
     * @param {number} start - Specifies the start.
     * @param {number} size - Specifies the size.
     * @param {number} legendSize - Specifies the  legendSize.
     * @param {Alignment} alignment - Specifies the alignment.
     * @returns {number} - Returns the start value.
     */
    Legend.prototype.alignLegend = function (start, size, legendSize, alignment) {
        switch (alignment) {
            case 'Far':
                start = (size - legendSize) - start;
                break;
            case 'Center':
                start = ((size - legendSize) / 2);
                break;
        }
        return start;
    };
    /**
     * To find legend location based on position, alignment for chart and accumulation chart
     *
     * @param {LegendPosition} position - Specifies the position.
     * @param {Alignment} alignment - Specifies the alignment.
     * @param {Rect} legendBounds - Specifies the legendBounds.
     * @param {Rect} rect - Specifies the rect.
     * @param {Size} availableSize - Specifies the availableSize.
     * @returns {void}
     */
    Legend.prototype.getLocation = function (position, alignment, legendBounds, rect, availableSize) {
        var padding = this.legend.border.width;
        var legendHeight = legendBounds.height + padding + this.legend.margin.top + this.legend.margin.bottom;
        var legendWidth = legendBounds.width + padding + this.legend.margin.left + this.legend.margin.right;
        var marginBottom = this.gauge.margin.bottom;
        if (position === 'Bottom') {
            legendBounds.x = this.alignLegend(legendBounds.x, availableSize.width, legendBounds.width, alignment);
            legendBounds.y = rect.y + (rect.height - legendHeight) + padding + this.legend.margin.top;
            this.subtractThickness(rect, 0, 0, 0, legendHeight);
        }
        else if (position === 'Top') {
            legendBounds.x = this.alignLegend(legendBounds.x, availableSize.width, legendBounds.width, alignment);
            legendBounds.y = rect.y + padding + this.legend.margin.top;
            this.subtractThickness(rect, 0, 0, legendHeight, 0);
        }
        else if (position === 'Right') {
            legendBounds.x = rect.x + (rect.width - legendBounds.width) + this.legend.margin.right;
            legendBounds.y = rect.y + this.alignLegend(0, availableSize.height - (rect.y + marginBottom), legendBounds.height, alignment);
            this.subtractThickness(rect, 0, legendWidth, 0, 0);
        }
        else if (position === 'Custom') {
            this.subtractThickness(rect, 0, 0, 0, 0);
        }
        else {
            legendBounds.x = legendBounds.x + this.legend.margin.left;
            legendBounds.y = rect.y + this.alignLegend(0, availableSize.height - (rect.y + marginBottom), legendBounds.height, alignment);
            this.subtractThickness(rect, legendWidth, 0, 0, 0);
        }
    };
    /**
     * Renders the legend.
     *
     * @param {LegendSettingsModel} legend - Specifies the legend.
     * @param {Rect} legendBounds - Specifies the legendBounds.
     * @returns {void}
     * @private
     */
    Legend.prototype.renderLegend = function (legend, legendBounds) {
        var firstLegend = this.findFirstLegendPosition(this.legendCollection);
        var padding = legend.padding;
        this.legendRegions = [];
        this.maxItemHeight = Math.max(this.legendCollection[0].textSize.height, legend.shapeHeight);
        var legendGroup = this.gauge.renderer.createGroup({ id: this.legendID + '_g' });
        var legendTranslateGroup = this.createLegendElements(legendBounds, legendGroup, legend, this.legendID);
        if (firstLegend !== this.legendCollection.length) {
            this.totalPages = 0;
            var legendAxisGroup = void 0; // legendItem group for each series group element
            // starting shape center x,y position && to resolve lint error used new line for declaration
            var start = new GaugeLocation(
            // eslint-disable-next-line max-len
            (!this.gauge.enableRtl) ? legendBounds.x + padding + (legend.shapeWidth / 2) : (!this.isVertical) ? legendBounds.width + legendBounds.x - (padding) - (legend.shapeWidth) : legendBounds.x + this.maxWidth - padding - legend.shapeWidth / 2, legendBounds.y + padding + this.maxItemHeight / 2);
            var textOptions = new TextOption('', start.x, start.y, 'start');
            var textPadding = (2 * legend.shapePadding) + (2 * padding) + legend.shapeWidth;
            var count = 0;
            this.pageXCollections = [];
            this.legendCollection[firstLegend].location = start;
            var previousLegend = this.legendCollection[firstLegend];
            for (var _i = 0, _a = this.legendCollection; _i < _a.length; _i++) {
                var legendOption = _a[_i];
                if (legendOption.render && legendOption.text !== '') {
                    legendAxisGroup = this.gauge.renderer.createGroup({
                        id: this.legendID + '_g_' + count
                    });
                    this.getRenderPoint(legendOption, start, textPadding, previousLegend, legendBounds, count, firstLegend);
                    this.renderSymbol(legendOption, legendAxisGroup, legendOption.axisIndex, legendOption.rangeIndex);
                    this.renderText(legendOption, legendAxisGroup, textOptions, legendOption.axisIndex, legendOption.rangeIndex);
                    if (legendAxisGroup) {
                        legendAxisGroup.style.cursor = (!legend.toggleVisibility) ? 'auto' : 'pointer';
                    }
                    if (legendTranslateGroup) {
                        legendTranslateGroup.appendChild(legendAxisGroup);
                    }
                    previousLegend = legendOption;
                }
                count++;
            }
            if (this.isPaging) {
                this.renderPagingElements(legendBounds, textOptions, legendGroup);
            }
            else {
                this.totalPages = 1;
            }
        }
        this.appendChildElement(this.gauge.svgObject, legendGroup);
        this.setStyles(this.toggledIndexes);
    };
    /**
     * To render legend paging elements for chart and accumulation chart
     *
     * @param {Rect} bounds - Specifies the bounds.
     * @param {TextOption} textOption - Specifies the textOption.
     * @param {Element} legendGroup - Specifies the legendGroup.
     * @returns {void}
     */
    Legend.prototype.renderPagingElements = function (bounds, textOption, legendGroup) {
        var paginggroup = this.gauge.renderer.createGroup({ id: this.legendID + '_navigation' });
        this.pagingRegions = [];
        legendGroup.appendChild(paginggroup);
        var grayColor = this.gauge.themeStyle.labelColor;
        var legend = this.gauge.legendSettings; // to solve parameter lint error, legend declaration is here
        var padding = 8; // const padding for paging elements
        if (!this.isVertical) {
            this.totalPages = Math.ceil(this.totalPages / Math.max(1, this.rowCount - 1));
        }
        else {
            this.totalPages = Math.ceil(this.totalPages / this.maxColumns);
        }
        var symbolOption = new PathOption(this.legendID + '_pageup', 'transparent', 5, grayColor, 1, '', '');
        var iconSize = this.pageButtonSize;
        if (paginggroup) {
            paginggroup.style.cursor = 'pointer';
        }
        var textStyle = {
            size: legend.textStyle.size || this.gauge.themeStyle.fontSize,
            color: legend.textStyle.color || this.gauge.themeStyle.labelColor,
            fontFamily: legend.textStyle.fontFamily || this.gauge.themeStyle.labelFontFamily,
            fontWeight: legend.textStyle.fontWeight || this.gauge.themeStyle.fontWeight,
            fontStyle: legend.textStyle.fontStyle,
            opacity: legend.textStyle.opacity
        };
        // Page left arrow drawing calculation started here
        this.clipPathHeight = (this.rowCount - 1) * (this.maxItemHeight + legend.padding);
        this.clipRect.setAttribute('height', this.clipPathHeight.toString());
        var x = bounds.x + iconSize / 2;
        var y = bounds.y + this.clipPathHeight + ((bounds.height - this.clipPathHeight) / 2);
        var size = measureText(this.totalPages + '/' + this.totalPages, textStyle);
        appendPath(calculateShapes({ x: x, y: y }, 'LeftArrow', new Size(iconSize, iconSize), '', symbolOption), paginggroup, this.gauge, 'Path');
        this.pagingRegions.push(new Rect(!this.gauge.enableRtl ?
            // eslint-disable-next-line max-len
            x + bounds.width - (2 * (iconSize + padding) + padding + size.width) - iconSize * 0.5 : x, y - iconSize * 0.5, iconSize, iconSize));
        // Page numbering rendering calculation started here
        textOption.x = x + (iconSize / 2) + padding;
        textOption.y = y + (size.height / 4);
        textOption.id = this.legendID + '_pagenumber';
        textOption.text = !this.gauge.enableRtl ? '1/' + this.totalPages : this.totalPages + '/1';
        var pageTextElement = textElement(textOption, textStyle, grayColor, paginggroup);
        x = (textOption.x + padding + (iconSize / 2) + size.width);
        symbolOption.id = this.legendID + '_pagedown';
        appendPath(calculateShapes({ x: x, y: y }, 'RightArrow', new Size(iconSize, iconSize), '', symbolOption), paginggroup, this.gauge, 'Path');
        this.pagingRegions.push(new Rect(!this.gauge.enableRtl ?
            // eslint-disable-next-line max-len
            x + (bounds.width - (2 * (iconSize + padding) + padding + size.width) - iconSize * 0.5) : x, y - iconSize * 0.5, iconSize, iconSize));
        //placing the navigation buttons and page numbering in legend right corner
        // eslint-disable-next-line max-len
        var translateX = (this.gauge.enableRtl) ? legend.border.width + (iconSize / 2) : bounds.width - (2 * (iconSize + padding) + padding + size.width);
        paginggroup.setAttribute('transform', 'translate(' + translateX + ', ' + 0 + ')');
        this.translatePage(pageTextElement, this.currentPage - 1, this.currentPage);
    };
    /**
     * To translate legend pages for chart and accumulation chart
     *
     * @param {Element} pagingText - Specifies the pagingText.
     * @param {number} page - Specifies the page.
     * @param {number} pageNumber - Specifies the pageNumber.
     * @returns {number} - Returns the size.
     */
    Legend.prototype.translatePage = function (pagingText, page, pageNumber) {
        var size = (this.clipPathHeight) * page;
        var translate = 'translate(0,-' + size + ')';
        if (this.isVertical) {
            var pageX = this.pageXCollections[page * this.maxColumns];
            size = (!this.gauge.enableRtl) ? pageX - this.legendBounds.x : (this.legendBounds.x + this.maxWidth) - pageX;
            size = size < 0 ? 0 : size; // to avoid small pixel variation
            translate = ((!this.gauge.enableRtl) ? 'translate(-' : 'translate(') + size + ',0)';
        }
        this.legendTranslateGroup.setAttribute('transform', translate);
        pagingText.textContent = !this.gauge.enableRtl ? (pageNumber) + '/' + this.totalPages : this.totalPages + '/' + pageNumber;
        this.currentPage = pageNumber;
        return size;
    };
    /**
     * To render legend text for chart and accumulation chart
     *
     * @param {LegendOptions} legendOption - Specifies the legendOption.
     * @param {Element} group - Specifies the group.
     * @param {TextOption} textOptions - Specifies the textOptions.
     * @param {number} axisIndex - Specifies the axisIndex.
     * @param {number} rangeIndex - Specifies the rangeIndex.
     * @returns {void}
     */
    Legend.prototype.renderText = function (legendOption, group, textOptions, axisIndex, rangeIndex) {
        var legend = this.gauge.legendSettings;
        var hiddenColor = '#D3D3D3';
        textOptions.id = this.legendID + '_Axis_' + axisIndex + '_text_' + rangeIndex;
        var fontcolor = legendOption.visible ? legend.textStyle.color || this.gauge.themeStyle.labelColor : hiddenColor;
        var textStyle = {
            size: legend.textStyle.size || this.gauge.themeStyle.fontSize,
            color: fontcolor,
            fontFamily: legend.textStyle.fontFamily || this.gauge.themeStyle.labelFontFamily,
            fontWeight: legend.textStyle.fontWeight || this.gauge.themeStyle.fontWeight,
            fontStyle: legend.textStyle.fontStyle,
            opacity: legend.textStyle.opacity
        };
        textOptions.text = legendOption.text;
        textOptions.x = this.gauge.enableRtl ? (legendOption.location.x - (measureText(legendOption.text, textStyle).width +
            legend.shapeWidth / 2 + legend.shapePadding)) : (legendOption.location.x + (legend.shapeWidth / 2) + legend.shapePadding);
        textOptions.y = legendOption.location.y + this.maxItemHeight / 4;
        var legendTextElement = textElement(textOptions, textStyle, fontcolor, group, '');
        legendTextElement.setAttribute('aria-label', textOptions.text);
        legendTextElement.setAttribute('role', 'region');
    };
    /**
     * To render legend symbols for chart and accumulation chart
     *
     * @param {LegendOptions} legendOption - Specifies the legendOption.
     * @param {Element} group - Specifies the group.
     * @param {number} axisIndex - Specifies the axisIndex.
     * @param {number} rangeIndex - Specifies the rangeIndex.
     * @returns {void}
     */
    Legend.prototype.renderSymbol = function (legendOption, group, axisIndex, rangeIndex) {
        legendOption.fill = legendOption.fill ? legendOption.fill :
            this.gauge.axes[axisIndex].ranges[rangeIndex].rangeColor;
        appendPath(calculateShapes(legendOption.location, legendOption.shape, new Size(legendOption.shapeWidth, legendOption.shapeHeight), '', new PathOption(this.legendID + '_Axis_' + axisIndex + '_Shape_' + rangeIndex, legendOption.fill, legendOption.shapeBorder.width, legendOption.shapeBorder.color, null, legendOption.shapeBorder.dashArray, '', '')), group, this.gauge, legendOption.shape === 'Circle' ? 'Ellipse' : 'Path');
    };
    /**
     * To find legend rendering locations from legend options.
     *
     * @param {LegendOptions} legendOption - Specifies the legendOption.
     * @param {GaugeLocation} start - Specifies the start.
     * @param {number} textPadding - Specifies the textPadding.
     * @param {LegendOptions} prevLegend - Specifies the prevLegend.
     * @param {Rect} rect - Specifies the rect.
     * @param {number} count - Specifies the count.
     * @param {number} firstLegend - Specifies the firstLegend.
     * @returns {void}
     * @private
     */
    Legend.prototype.getRenderPoint = function (legendOption, start, textPadding, prevLegend, rect, count, firstLegend) {
        var padding = this.legend.padding;
        var textStyle = {
            size: this.legend.textStyle.size || this.gauge.themeStyle.fontSize,
            color: this.legend.textStyle.color || this.gauge.themeStyle.labelColor,
            fontFamily: this.legend.textStyle.fontFamily || this.gauge.themeStyle.labelFontFamily,
            fontWeight: this.legend.textStyle.fontWeight || this.gauge.themeStyle.fontWeight,
            fontStyle: this.legend.textStyle.fontStyle,
            opacity: this.legend.textStyle.opacity
        };
        if (this.isVertical) {
            if (count === firstLegend || (prevLegend.location.y + (this.maxItemHeight * 1.5) + (padding * 2) > rect.y + rect.height)) {
                legendOption.location.x = prevLegend.location.x + ((count === firstLegend) ? 0 : (!this.gauge.enableRtl) ?
                    this.maxColumnWidth : -this.maxColumnWidth - (4 * this.legend.shapePadding) / 3);
                legendOption.location.y = start.y;
                var textStartLoc = (this.legend.shapeWidth / 2) + padding;
                this.pageXCollections.push(legendOption.location.x + ((!this.gauge.enableRtl) ? -textStartLoc : textStartLoc));
                this.totalPages++;
            }
            else {
                legendOption.location.x = prevLegend.location.x;
                legendOption.location.y = prevLegend.location.y + this.maxItemHeight + padding;
            }
        }
        else {
            // eslint-disable-next-line max-len
            var previousBound = (prevLegend.location.x + ((!this.gauge.enableRtl) ? prevLegend.textSize.width + textPadding : -prevLegend.textSize.width - textPadding));
            // eslint-disable-next-line max-len
            if (this.isWithinBounds(previousBound, (legendOption.textSize.width + textPadding) - padding, rect, this.legend.shapeWidth / 2)) {
                legendOption.location.y = (count === firstLegend) ? prevLegend.location.y :
                    prevLegend.location.y + this.maxItemHeight + padding;
                legendOption.location.x = start.x;
            }
            else {
                legendOption.location.y = prevLegend.location.y;
                legendOption.location.x = (count === firstLegend) ? prevLegend.location.x : previousBound;
            }
            this.totalPages = this.totalRowCount;
        }
        var availablewidth = this.getAvailWidth(legendOption.location.x, this.legendBounds.width);
        legendOption.text = textTrim(+availablewidth.toFixed(4), legendOption.text, textStyle);
    };
    Legend.prototype.isWithinBounds = function (previousBound, textWidth, legendBounds, shapeWidth) {
        if (!this.gauge.enableRtl) {
            return (previousBound + textWidth) > (legendBounds.x + legendBounds.width + shapeWidth);
        }
        else {
            return (previousBound - textWidth) < (legendBounds.x - shapeWidth);
        }
    };
    /**
     * To show or hide the legend on clicking the legend.
     *
     * @param {Event} event - Specifies the event argument.
     * @returns {void}
     *
     * @private
     */
    Legend.prototype.click = function (event) {
        var targetId = event.target.id;
        var legendItemsId = ['_text_', '_Shape_'];
        var index;
        var toggledIndex = -1;
        if (targetId.indexOf(this.legendID) > -1) {
            for (var _i = 0, legendItemsId_1 = legendItemsId; _i < legendItemsId_1.length; _i++) {
                var id = legendItemsId_1[_i];
                if (targetId.indexOf(id) > -1) {
                    var axisIndex = parseInt(targetId.split(this.legendID + '_Axis_')[1].split(id)[0], 10);
                    var rangeIndex = parseInt(targetId.split(this.legendID + '_Axis_')[1].split(id)[1], 10);
                    if (this.gauge.legendSettings.toggleVisibility && !isNaN(rangeIndex)) {
                        var legendOption = this.legendByIndex(axisIndex, rangeIndex, this.legendCollection);
                        index = new Index(axisIndex, rangeIndex, !legendOption.render);
                        if (this.toggledIndexes.length === 0) {
                            this.toggledIndexes.push(index);
                        }
                        else {
                            for (var i = 0; i < this.toggledIndexes.length; i++) {
                                if (this.toggledIndexes[i].axisIndex === index.axisIndex &&
                                    this.toggledIndexes[i].rangeIndex === index.rangeIndex) {
                                    toggledIndex = i;
                                    break;
                                }
                                else {
                                    toggledIndex = -1;
                                }
                            }
                            if (toggledIndex === -1) {
                                this.toggledIndexes.push(index);
                            }
                            else {
                                this.toggledIndexes[toggledIndex].isToggled =
                                    !this.toggledIndexes[toggledIndex].isToggled;
                            }
                        }
                        this.setStyles(this.toggledIndexes);
                    }
                }
            }
        }
        if (targetId.indexOf(this.legendID + '_pageup') > -1) {
            this.changePage(event, !this.gauge.enableRtl ? true : false);
        }
        else if (targetId.indexOf(this.legendID + '_pagedown') > -1) {
            this.changePage(event, !this.gauge.enableRtl ? false : true);
        }
    };
    /**
     * Set toggled legend styles.
     *
     * @param {Index[]} toggledIndexes - Specifies the toggledIndexes.
     * @returns {void}
     */
    Legend.prototype.setStyles = function (toggledIndexes) {
        for (var i = 0; i < toggledIndexes.length; i++) {
            var count = 0;
            for (var j = 0; j < toggledIndexes[i].rangeIndex; j++) {
                var rangeStart = this.gauge.axes[toggledIndexes[i].axisIndex].ranges[j].start;
                var rangeEnd = this.gauge.axes[toggledIndexes[i].axisIndex].ranges[j].end;
                if (rangeStart === rangeEnd) {
                    count++;
                }
            }
            var rangeID = this.gauge.element.id + '_Axis_' + toggledIndexes[i].axisIndex + '_Range_' + toggledIndexes[i].rangeIndex;
            var shapeID = this.legendID + '_Axis_' + toggledIndexes[i].axisIndex + '_Shape_' + toggledIndexes[i].rangeIndex;
            var textID = this.legendID + '_Axis_' + toggledIndexes[i].axisIndex + '_text_' + toggledIndexes[i].rangeIndex;
            var rangeElement = this.gauge.svgObject.querySelector('#' + rangeID);
            var shapeElement = this.gauge.svgObject.querySelector('#' + shapeID);
            var textElement_1 = this.gauge.svgObject.querySelector('#' + textID);
            if (toggledIndexes[i].isToggled) {
                if (!isNullOrUndefined(rangeElement)) {
                    rangeElement.style.visibility = 'visible';
                    shapeElement.setAttribute('fill', this.legendCollection[toggledIndexes[i].rangeIndex - count].fill);
                    textElement_1.setAttribute('fill', this.legend.textStyle.color || this.gauge.themeStyle.labelColor);
                }
            }
            else {
                var hiddenColor = '#D3D3D3';
                if (!isNullOrUndefined(rangeElement)) {
                    rangeElement.style.visibility = 'hidden';
                    shapeElement.setAttribute('fill', hiddenColor);
                    textElement_1.setAttribute('fill', hiddenColor);
                }
            }
        }
    };
    /**
     * To get legend by index
     *
     * @param {number} axisIndex - Specifies the axisIndex.
     * @param {number} rangeIndex - Specifies the rangeIndex.
     * @param {LegendOptions[]} legendCollections - Specifies the legendCollections.
     * @returns {LegendOptions} - Specifies the LegendOptions.
     */
    Legend.prototype.legendByIndex = function (axisIndex, rangeIndex, legendCollections) {
        for (var _i = 0, legendCollections_1 = legendCollections; _i < legendCollections_1.length; _i++) {
            var legend = legendCollections_1[_i];
            if (legend.axisIndex === axisIndex && legend.rangeIndex === rangeIndex) {
                return legend;
            }
        }
        return null;
    };
    /**
     * To change legend pages for chart and accumulation chart
     *
     * @param {Event} event - Specifies the event.
     * @param {boolean} pageUp - Specifies the pageUp.
     * @returns {void}
     */
    Legend.prototype.changePage = function (event, pageUp) {
        var pageText = document.getElementById(this.legendID + '_pagenumber');
        var page = parseInt(pageText.textContent.split('/')[!this.gauge.enableRtl ? 0 : 1], 10);
        if (pageUp && page > 1) {
            this.translatePage(pageText, (page - 2), (page - 1));
        }
        else if (!pageUp && page < this.totalPages) {
            this.translatePage(pageText, page, (page + 1));
        }
    };
    /**
     * To find available width from legend x position.
     *
     * @param {number} tx - Specifies the tx value.
     * @param {number} width - Specifies the width.
     * @returns {number} - Returns the number.
     */
    Legend.prototype.getAvailWidth = function (tx, width) {
        if (this.isVertical) {
            width = this.maxWidth;
        }
        return width - ((this.legend.padding * 2) + this.legend.shapeWidth + this.legend.shapePadding);
    };
    /**
     * To create legend rendering elements for chart and accumulation chart
     *
     * @param {Rect} legendBounds - Specifies the legendBounds.
     * @param {Element} legendGroup - Specifies the legendGroup.
     * @param {LegendSettingsModel} legend - Specifies the legend.
     * @param {string} id - Specifies the id.
     * @returns {Element} - Returns the element.
     */
    Legend.prototype.createLegendElements = function (legendBounds, legendGroup, legend, id) {
        var padding = legend.padding;
        var borderStyle = {
            color: legend.border.color || this.gauge.themeStyle.legendBorderColor || '',
            width: legend.border.width || this.gauge.themeStyle.legendBorderWidth || 1, dashArray: legend.border.dashArray
        };
        var options = new RectOption(id + '_element', legend.background, borderStyle, legend.opacity, legendBounds);
        options.width = this.isVertical ? this.maxWidth : legendBounds.width;
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        legendGroup ? legendGroup.appendChild(this.gauge.renderer.drawRectangle(options)) : this.gauge.renderer.drawRectangle(options);
        var legendItemsGroup = this.gauge.renderer.createGroup({ id: id + '_collections' });
        legendGroup.appendChild(legendItemsGroup);
        this.legendTranslateGroup = this.gauge.renderer.createGroup({ id: id + '_translate_g' });
        legendItemsGroup.appendChild(this.legendTranslateGroup);
        var clippath = this.gauge.renderer.createClipPath({ id: id + '_clipPath' });
        options.id += '_clipPath_rect';
        options.width = this.isVertical ? options.width - padding : options.width;
        this.clipRect = this.gauge.renderer.drawRectangle(options);
        clippath.appendChild(this.clipRect);
        this.appendChildElement(this.gauge.svgObject, clippath);
        legendItemsGroup.style.cssText = 'clip-path:url(#' + clippath.id + ')';
        return this.legendTranslateGroup;
    };
    /**
     * Method to append child element
     *
     * @param {Element} parent - Specifies the element.
     * @param {Element} childElement - Specifies the child element.
     * @returns {void}
     */
    Legend.prototype.appendChildElement = function (parent, childElement) {
        var existChild = parent.querySelector('#' + childElement.id);
        var element = (existChild || getElement(childElement.id));
        var child = childElement;
        if (existChild) {
            parent.replaceChild(child, element);
        }
        else {
            parent.appendChild(child);
        }
    };
    /**
     * To find first valid legend text index for chart and accumulation chart
     *
     * @param {LegendOptions[]} legendCollection - Specifies the legend collection.
     * @returns {number} - Returns the count.
     */
    Legend.prototype.findFirstLegendPosition = function (legendCollection) {
        var count = 0;
        for (var _i = 0, legendCollection_1 = legendCollection; _i < legendCollection_1.length; _i++) {
            var legend = legendCollection_1[_i];
            if (legend.render && legend.text !== '') {
                break;
            }
            count++;
        }
        return count;
    };
    /**
     * To find legend bounds for accumulation chart.
     *
     * @param {Size} availableSize - Specifies the availableSize.
     * @param {Rect} legendBounds - Specifies the legendBounds.
     * @param {LegendSettingsModel} legend - Specifies the legend.
     * @returns {void}
     * @private
     */
    Legend.prototype.getLegendBounds = function (availableSize, legendBounds, legend) {
        var extraWidth = 0;
        var extraHeight = 0;
        var padding = legend.padding;
        if (!this.isVertical) {
            extraHeight = !legend.height ? ((availableSize.height / 100) * 5) : 0;
        }
        else {
            extraWidth = !legend.width ? ((availableSize.width / 100) * 5) : 0;
        }
        legendBounds.width += extraWidth;
        legendBounds.height += extraHeight;
        var textStyle = {
            size: legend.textStyle.size || this.gauge.themeStyle.fontSize,
            color: this.legend.textStyle.color || this.gauge.themeStyle.labelColor,
            fontFamily: legend.textStyle.fontFamily || this.gauge.themeStyle.labelFontFamily,
            fontWeight: legend.textStyle.fontWeight || this.gauge.themeStyle.fontWeight,
            fontStyle: legend.textStyle.fontStyle,
            opacity: legend.textStyle.opacity
        };
        var maximumWidth = 0;
        var rowWidth = 0;
        var rowCount = 0;
        var columnWidth = [];
        var columnHeight = 0;
        var legendWidth = 0;
        this.maxItemHeight = Math.max(measureText('MeasureText', textStyle).height, legend.shapeHeight);
        var legendEventArgs;
        var render = false;
        for (var _i = 0, _a = this.legendCollection; _i < _a.length; _i++) {
            var legendOption = _a[_i];
            legendEventArgs = {
                fill: legendOption.fill, text: legendOption.text, shape: legendOption.shape,
                name: 'legendRender', cancel: false
            };
            this.gauge.trigger('legendRender', legendEventArgs);
            legendOption.render = !legendEventArgs.cancel;
            legendOption.text = legendEventArgs.text;
            legendOption.fill = legendEventArgs.fill;
            legendOption.shape = legendEventArgs.shape;
            legendOption.textSize = measureText(legendOption.text, textStyle);
            if (legendOption.render && legendOption.text !== '') {
                render = true;
                legendWidth = legend.shapeWidth + (2 * legend.shapePadding) + legendOption.textSize.width + (2 * padding);
                if (this.isVertical) {
                    ++rowCount;
                    columnHeight = (rowCount * (this.maxItemHeight + padding)) + padding;
                    if ((rowCount * (this.maxItemHeight + padding)) + padding > legendBounds.height) {
                        columnHeight = Math.max(columnHeight, (rowCount * (this.maxItemHeight + padding)) + padding);
                        rowWidth = rowWidth + maximumWidth;
                        columnWidth.push(maximumWidth);
                        this.totalPages = Math.max(rowCount, this.totalPages || 1);
                        maximumWidth = 0;
                        rowCount = 1;
                    }
                    maximumWidth = Math.max(legendWidth, maximumWidth);
                }
                else {
                    rowWidth = rowWidth + legendWidth;
                    if (legendBounds.width < (padding + rowWidth)) {
                        maximumWidth = Math.max(maximumWidth, (rowWidth + padding - legendWidth));
                        if (rowCount === 0 && (legendWidth !== rowWidth)) {
                            rowCount = 1;
                        }
                        rowWidth = legendWidth;
                        rowCount++;
                        columnHeight = (rowCount * (this.maxItemHeight + padding)) + padding;
                    }
                }
            }
        }
        if (this.isVertical) {
            rowWidth = rowWidth + maximumWidth;
            this.isPaging = legendBounds.width < (rowWidth + padding);
            columnHeight = Math.max(columnHeight, ((this.totalPages || 1) * (this.maxItemHeight + padding)) + padding);
            this.isPaging = this.isPaging && (this.totalPages > 1);
            if (columnWidth[columnWidth.length - 1] !== maximumWidth) {
                columnWidth.push(maximumWidth);
            }
        }
        else {
            this.isPaging = legendBounds.height < columnHeight;
            this.totalPages = this.totalRowCount = rowCount;
            columnHeight = Math.max(columnHeight, (this.maxItemHeight + padding) + padding);
        }
        this.maxColumns = 0; // initialization for max columns
        var width = this.isVertical ? this.getMaxColumn(columnWidth, legendBounds.width, padding, rowWidth + padding) :
            Math.max(rowWidth + padding, maximumWidth);
        if (render) { // if any legends not skipped in event check
            this.setBounds(width, columnHeight, legend, legendBounds);
        }
        else {
            this.setBounds(0, 0, legend, legendBounds);
        }
    };
    /**
     * @param {Rect} rect - Specifies the rect.
     * @param {number} left - Specifies the left.
     * @param {number} right - Specifies the right.
     * @param {number} top - Specifies the top.
     * @param {number} bottom - Specifies the bottom.
     * @returns {Rect} - Returns the rect.
     * @private
     */
    Legend.prototype.subtractThickness = function (rect, left, right, top, bottom) {
        rect.x += left;
        rect.y += top;
        rect.width -= left + right;
        rect.height -= top + bottom;
        return rect;
    };
    /**
     * To set bounds for chart and accumulation chart
     *
     * @param {number} computedWidth - Specifies compute width.
     * @param {number} computedHeight - Specifies compute height.
     * @param {LegendSettingsModel} legend - Specifies the legend.
     * @param {Rect} legendBounds - Specifies the legend bounds.
     * @returns {void}
     */
    Legend.prototype.setBounds = function (computedWidth, computedHeight, legend, legendBounds) {
        computedWidth = computedWidth < legendBounds.width ? computedWidth : legendBounds.width;
        computedHeight = computedHeight < legendBounds.height ? computedHeight : legendBounds.height;
        legendBounds.width = !legend.width ? computedWidth : legendBounds.width;
        legendBounds.height = !legend.height ? computedHeight : legendBounds.height;
        this.rowCount = Math.max(1, Math.ceil((legendBounds.height - legend.padding) / (this.maxItemHeight + legend.padding)));
        if (this.rowCount === 1 && (legend.position === 'Bottom' || legend.position === 'Top') && (!isNullOrUndefined(legend.width) && legend.width.indexOf('%') > -1)) {
            legendBounds.width = computedWidth;
        }
    };
    /**
     * To find maximum column size for legend
     *
     * @param {number[]} columns - Specifies the columns
     * @param {number} width - Specifies the width
     * @param {number} padding - Specifies the padding
     * @param {number} rowWidth - Specifies the row width
     * @returns {number} - Returns the number
     */
    Legend.prototype.getMaxColumn = function (columns, width, padding, rowWidth) {
        var maxPageColumn = padding;
        this.maxColumnWidth = Math.max.apply(null, columns);
        for (var i = 0; i < columns.length; i++) {
            maxPageColumn += this.maxColumnWidth;
            this.maxColumns++;
            if (maxPageColumn + padding > width) {
                maxPageColumn -= this.maxColumnWidth;
                this.maxColumns--;
                break;
            }
        }
        this.isPaging = (maxPageColumn < rowWidth) && (this.totalPages > 1);
        if (maxPageColumn === padding) {
            maxPageColumn = width;
        }
        this.maxColumns = Math.max(1, this.maxColumns);
        this.maxWidth = maxPageColumn;
        return maxPageColumn;
    };
    /**
     * Get module name.
     *
     * @returns {string} - Returns the module name.
     */
    Legend.prototype.getModuleName = function () {
        return 'Legend';
    };
    /**
     * To destroy the legend.
     *
     * @returns {void}
     * @private
     */
    Legend.prototype.destroy = function () {
        this.legendCollection = [];
        this.legendRenderingCollections = [];
        this.legendRegions = [];
        this.titleRect = null;
        this.pageXCollections = [];
        this.clipRect = null;
        this.legendTranslateGroup = null;
        this.legend = null;
        this.pagingRegions = [];
        this.toggledIndexes = [];
        this.legendBounds = null;
        this.removeEventListener();
        this.gauge = null;
    };
    return Legend;
}());
export { Legend };
/**
 * @private
 */
var Index = /** @class */ (function () {
    function Index(axisIndex, rangeIndex, isToggled) {
        this.axisIndex = axisIndex;
        this.rangeIndex = rangeIndex;
        this.isToggled = isToggled;
    }
    return Index;
}());
export { Index };
/**
 * Class for legend options
 *
 * @private
 */
var LegendOptions = /** @class */ (function () {
    function LegendOptions(text, originalText, fill, shape, visible, border, shapeBorder, shapeWidth, shapeHeight, rangeIndex, axisIndex) {
        this.location = { x: 0, y: 0 };
        this.text = text;
        this.originalText = originalText;
        this.fill = fill;
        this.shape = shape;
        this.visible = visible;
        this.border = border;
        this.shapeBorder = shapeBorder;
        this.shapeWidth = shapeWidth;
        this.shapeHeight = shapeHeight;
        this.rangeIndex = rangeIndex;
        this.axisIndex = axisIndex;
    }
    return LegendOptions;
}());
export { LegendOptions };
