import { Rect, Size, measureText, TextOption, rotateTextSize, textTrim, CanvasTooltip, PathOption, textWrap, getIsLineBreakLabel } from '../utils/helper';
import { sum, titlePositionX, LineOption, Line, DrawSvgCanvas, TextBasic, titlePositionY, getTitle } from '../utils/helper';
import { extend, Browser, isNullOrUndefined, SanitizeHtmlHelper } from '@syncfusion/ej2-base';
var AxisHelper = /** @class */ (function () {
    function AxisHelper(heatMap) {
        this.heatMap = heatMap;
        this.padding = 10;
        this.drawSvgCanvas = new DrawSvgCanvas(heatMap);
    }
    /**
     * To render the x and y axis.
     *
     * @private
     */
    AxisHelper.prototype.renderAxes = function () {
        this.initialClipRect = this.heatMap.initialClipRect;
        var heatMap = this.heatMap;
        var axisElement;
        var element;
        if (!heatMap.enableCanvasRendering) {
            axisElement = this.heatMap.renderer.createGroup({ id: heatMap.element.id + 'AxisCollection' });
        }
        var axes = this.heatMap.axisCollections;
        for (var i = 0, len = axes.length; i < len; i++) {
            var axis = axes[i];
            if (axis.orientation === 'Horizontal') {
                if (!heatMap.enableCanvasRendering) {
                    element = this.heatMap.renderer.createGroup({ id: heatMap.element.id + 'XAxisGroup' });
                }
                this.drawXAxisLine(element, axis);
                this.drawXAxisTitle(axis, element, axis.rect);
                this.drawXAxisLabels(axis, element, axis.rect);
            }
            else {
                element = heatMap.renderer.createGroup({ id: heatMap.element.id + 'YAxisGroup' });
                this.drawYAxisLine(element, axis);
                this.drawYAxisTitle(axis, element, axis.rect);
                this.drawYAxisLabels(axis, element, axis.rect);
            }
            if (axis.multiLevelLabels.length > 0) {
                this.drawMultiLevels(element, axis);
            }
            if (!heatMap.enableCanvasRendering) {
                axisElement.appendChild(element);
            }
        }
        if (!heatMap.enableCanvasRendering) {
            this.heatMap.svgObject.appendChild(axisElement);
        }
    };
    AxisHelper.prototype.drawXAxisLine = function (parent, axis) {
        var y = this.initialClipRect.y + (!axis.opposedPosition ? this.initialClipRect.height : 0);
        var line = new LineOption(this.heatMap.element.id + '_XAxisLine', new Line(this.initialClipRect.x, y, this.initialClipRect.x + this.initialClipRect.width, y), 'transparent', 0);
        this.drawSvgCanvas.drawLine(line, parent);
    };
    AxisHelper.prototype.drawYAxisLine = function (parent, axis) {
        var x = this.initialClipRect.x + ((!axis.opposedPosition) ? 0 : this.initialClipRect.width);
        var line = new LineOption(this.heatMap.element.id + '_YAxisLine', new Line(x, this.initialClipRect.y, x, this.initialClipRect.height + this.initialClipRect.y), 'transparent', 0);
        this.drawSvgCanvas.drawLine(line, parent);
    };
    AxisHelper.prototype.drawXAxisTitle = function (axis, parent, rect) {
        var titlepadding = (axis.textStyle.size === '0px' ? 0 : 10);
        var y = rect.y + (!axis.opposedPosition ? (axis.maxLabelSize.height + titlepadding +
            sum(axis.xAxisMultiLabelHeight)) : -(axis.maxLabelSize.height + titlepadding + sum(axis.xAxisMultiLabelHeight)));
        if (axis.title.text) {
            var heatMap = this.heatMap;
            var title = axis.title;
            var axisTitleText = this.heatMap.enableHtmlSanitizer ? (SanitizeHtmlHelper.sanitize(title.text)) : title.text;
            var elementSize = measureText(axisTitleText, title.textStyle);
            var padding = this.padding;
            var anchor = title.textStyle.textAlignment === 'Near' ? 'start' :
                title.textStyle.textAlignment === 'Far' ? 'end' : 'middle';
            padding = axis.opposedPosition ? -(padding + elementSize.height / 4) : (padding + (3 * elementSize.height / 4));
            var options = new TextOption(heatMap.element.id + '_XAxisTitle', new TextBasic(rect.x + titlePositionX(rect.width, 0, 0, title.textStyle), y + padding, anchor, axisTitleText), title.textStyle, title.textStyle.color || heatMap.themeStyle.axisTitle);
            this.drawSvgCanvas.createText(options, parent, axisTitleText);
        }
    };
    AxisHelper.prototype.drawYAxisTitle = function (axis, parent, rect) {
        if (axis.title.text) {
            var title = axis.title;
            var heatMap = this.heatMap;
            var labelRotation = (axis.opposedPosition) ? 90 : -90;
            var anchor = title.textStyle.textAlignment === 'Near' ? 'start' :
                title.textStyle.textAlignment === 'Far' ? 'end' : 'middle';
            var padding = 10;
            padding = axis.opposedPosition ? padding : -padding;
            var titlepadding = (axis.textStyle.size === '0px' ? 0 : padding);
            var x = rect.x + titlepadding + ((axis.opposedPosition) ? axis.maxLabelSize.width + sum(axis.yAxisMultiLabelHeight) :
                -(axis.maxLabelSize.width + sum(axis.yAxisMultiLabelHeight)));
            var y = rect.y + titlePositionY(rect, 0, 0, title.textStyle) + (axis.opposedPosition ? this.padding : -this.padding);
            var axisTitleText = this.heatMap.enableHtmlSanitizer ? (SanitizeHtmlHelper.sanitize(title.text)) : title.text;
            var options = new TextOption(heatMap.element.id + '_YAxisTitle', new TextBasic(x, y - this.padding, anchor, axisTitleText, labelRotation, 'rotate(' + labelRotation + ',' + (x) + ',' + (y) + ')', 'auto'), title.textStyle, title.textStyle.color || heatMap.themeStyle.axisTitle);
            if (!this.heatMap.enableCanvasRendering) {
                this.drawSvgCanvas.createText(options, parent, axisTitleText);
            }
            else {
                this.drawSvgCanvas.canvasDrawText(options, axisTitleText, x, y);
            }
        }
    };
    /**
     * Get the visible labels for both x and y axis
     *
     * @private
     */
    AxisHelper.prototype.calculateVisibleLabels = function () {
        var heatmap = this.heatMap;
        var axis;
        var axisCollection = heatmap.axisCollections;
        var data = this.heatMap.dataSourceSettings;
        var processLabels = !(data && data.isJsonData && data.adaptorType === 'Cell');
        for (var i = 0, len = axisCollection.length; i < len; i++) {
            axis = axisCollection[i];
            if (axis.valueType === 'Numeric' && processLabels) {
                axis.clearAxisLabel();
                axis.calculateNumericAxisLabels(this.heatMap);
            }
            else if (axis.valueType === 'DateTime' && processLabels) {
                axis.clearAxisLabel();
                axis.calculateDateTimeAxisLabel(this.heatMap);
            }
            else if (axis.valueType === 'Category') {
                axis.clearAxisLabel();
                axis.calculateCategoryAxisLabels();
            }
            axis.tooltipLabels = axis.isInversed ? axis.tooltipLabels.reverse() : axis.tooltipLabels;
        }
    };
    /**
     * Measure the title and labels rendering position for both X and Y axis.
     *
     * @param rect
     * @private
     */
    AxisHelper.prototype.measureAxis = function (rect) {
        var heatmap = this.heatMap;
        var axis;
        var axisCollection = heatmap.axisCollections;
        for (var i = axisCollection.length - 1; i >= 0; i--) {
            axis = axisCollection[i];
            var padding = axis.textStyle.size === '0px' ? 0 : this.padding;
            axis.nearSizes = [];
            axis.farSizes = [];
            axis.computeSize(axis, heatmap, rect);
            if (!axis.opposedPosition) {
                if (axis.orientation === 'Horizontal') {
                    rect.height -= (sum(axis.nearSizes) + padding);
                }
                else {
                    rect.x += sum(axis.nearSizes) + padding;
                    rect.width -= sum(axis.nearSizes) + padding;
                }
            }
            else {
                if (axis.orientation === 'Horizontal') {
                    rect.y += sum(axis.farSizes) + padding;
                    rect.height -= sum(axis.farSizes) + padding;
                }
                else {
                    rect.width -= sum(axis.farSizes) + padding;
                }
            }
        }
    };
    /**
     * Calculate the X and Y axis line position
     *
     * @param rect
     * @private
     */
    AxisHelper.prototype.calculateAxisSize = function (rect) {
        var heatmap = this.heatMap;
        var axisCollection = heatmap.axisCollections;
        for (var i = 0, len = axisCollection.length; i < len; i++) {
            var axis = axisCollection[i];
            axis.rect = extend({}, rect, null, true);
            if (axis.orientation === 'Horizontal' && axis.multiLevelLabels.length !== 0) {
                if (axis.opposedPosition) {
                    axis.rect.y += (axis.angle === 0 || axis.angle === 180 || axis.angle === 360 ? 0 : this.padding);
                    this.heatMap.initialClipRect.y += (axis.angle === 0 || axis.angle === 180 || axis.angle === 360 ? 0 : this.padding);
                }
                rect.height -= (axis.angle === 0 || axis.angle === 180 || axis.angle === 360 ? 0 : this.padding);
            }
            if (axis.orientation === 'Horizontal' && !axis.opposedPosition) {
                axis.rect.y = rect.y + rect.height;
                axis.rect.height = 0;
            }
            if (axis.orientation === 'Vertical' && axis.opposedPosition) {
                axis.rect.x = rect.x + rect.width;
                axis.rect.width = 0;
            }
            axis.multiLevelPosition = [];
            for (var i_1 = 0; i_1 < axis.multiLevelLabels.length; i_1++) {
                var multiPosition = axis.multiPosition(axis, i_1);
                axis.multiLevelPosition.push(multiPosition);
            }
        }
    };
    AxisHelper.prototype.drawXAxisLabels = function (axis, parent, rect) {
        var heatMap = this.heatMap;
        var labels = axis.axisLabels;
        var isLineBreak = false;
        var borderWidth = this.heatMap.cellSettings.border.width > 5 ? (this.heatMap.cellSettings.border.width / 2) : 0;
        var interval = (rect.width - borderWidth) / axis.axisLabelSize;
        var compactInterval = 0;
        var axisInterval = axis.interval ? axis.interval : 1;
        var tempintervel = rect.width / (axis.axisLabelSize / axis.axisLabelInterval);
        var temp = axis.axisLabelInterval;
        if (tempintervel > 0) {
            while (tempintervel < parseInt(axis.textStyle.size, 10)) {
                temp = temp + 1;
                tempintervel = rect.width / (axis.axisLabelSize / temp);
            }
        }
        else {
            temp = axis.tooltipLabels.length;
        }
        if (axis.axisLabelInterval < temp) {
            compactInterval = temp;
            labels = axis.tooltipLabels;
            axisInterval = temp;
        }
        var y;
        var padding = 10;
        var lableStrtX = rect.x + (!axis.isInversed ? 0 : rect.width);
        var labelPadding;
        var angle = axis.angle;
        padding = this.padding;
        var labelElement;
        var borderElement;
        if (!heatMap.enableCanvasRendering) {
            labelElement = this.heatMap.renderer.createGroup({ id: heatMap.element.id + 'XAxisLabels' });
            borderElement = this.heatMap.renderer.createGroup({ id: heatMap.element.id + 'XAxisLabelBorder' });
        }
        if (axis.isInversed && axis.labelIntersectAction === 'MultipleRows') {
            axis.multipleRow.reverse();
        }
        isLineBreak = getIsLineBreakLabel(labels);
        for (var i = 0, len = labels.length; i < len; i++) {
            var lableRect = new Rect(lableStrtX, rect.y, interval, rect.height);
            var elementSize = measureText(labels[i], axis.textStyle);
            var label = (axis.textStyle.textOverflow !== 'Wrap' && !(isLineBreak) && axis.textStyle.textOverflow !== 'Trim' && axis.labelIntersectAction === 'Trim' && (axis.isIntersect || elementSize.width > interval)) ? axis.valueType !== 'DateTime' ||
                axis.showLabelOn === 'None' ? textTrim(interval * axisInterval, labels[i], axis.textStyle) :
                textTrim(axis.dateTimeAxisLabelInterval[i] * interval, labels[i], axis.textStyle) : labels[i];
            label = ((axis.enableTrim || axis.textStyle.textOverflow === 'Trim') && !isLineBreak) ? textTrim((axis.textStyle.textOverflow === 'Trim' ? interval - (axis.border.width / 2) : axis.maxLabelLength), labels[i], axis.textStyle) : label;
            if (heatMap.enableHtmlSanitizer) {
                label = SanitizeHtmlHelper.sanitize(label);
            }
            var wrappedLabel = label;
            var wrappedlabels = [];
            var rotateSize = new Size(0, 0);
            if ((axis.textStyle.textOverflow === 'Wrap' || isLineBreak) && !axis.enableTrim) {
                wrappedlabels = this.getLabels(wrappedLabel, interval - (axis.border.width / 2), axis, isLineBreak);
                wrappedLabel = this.getMaxLabel(wrappedlabels, axis);
            }
            else {
                if (isLineBreak && axis.enableTrim) {
                    wrappedlabels = this.getLabels(wrappedLabel, interval - (axis.border.width / 2), axis, isLineBreak);
                    wrappedLabel = textTrim(axis.maxLabelLength, wrappedlabels[0], axis.textStyle);
                    wrappedLabel = (label.indexOf('<br>') !== -1 || label.indexOf('<br/>') !== -1) && wrappedLabel.indexOf('...') === -1 ? wrappedLabel + '...' : wrappedLabel;
                    wrappedlabels = [];
                }
                wrappedlabels.push(wrappedLabel);
            }
            elementSize = measureText(wrappedLabel, axis.textStyle);
            var transform = void 0;
            labelPadding = (axis.opposedPosition) ? -(padding) : (padding + ((angle % 360) === 0 ? (elementSize.height / 2) : 0));
            elementSize.width = axis.isInversed ? (elementSize.width > interval ? interval : elementSize.width) : elementSize.width;
            var x = lableRect.x + ((!axis.isInversed) ?
                (lableRect.width / 2) - (elementSize.width / 2) : -((lableRect.width / 2) + (elementSize.width / 2)));
            if (axis.textStyle.textAlignment === 'Near') {
                x = lableRect.x - ((!axis.isInversed) ? 0 : lableRect.width);
            }
            else if (axis.textStyle.textAlignment === 'Far') {
                x = lableRect.x + ((!axis.isInversed) ?
                    (lableRect.width - elementSize.width) : -(elementSize.width));
            }
            if (axis.labelIntersectAction === 'Trim') {
                x = (!axis.isInversed) ? (x >= lableRect.x ? x : lableRect.x) : (x > (lableStrtX - interval) ? x : (lableStrtX - interval));
            }
            else if (angle % 180 === 0) {
                x = x < rect.x ? rect.x : x;
                x = ((x + elementSize.width) > (rect.x + rect.width)) ? (rect.x + rect.width - elementSize.width) : x;
            }
            if ((axis.textStyle.textOverflow === 'Wrap' || isLineBreak) && !axis.isInversed) {
                x = x < lableRect.x ? lableRect.x : x;
            }
            if (axis.labelIntersectAction === 'MultipleRows' && axis.textStyle.textOverflow !== 'Wrap' && axis.textStyle.textOverflow !== 'Trim' && axis.labelRotation === 0) {
                var a = axis.opposedPosition ? -(axis.multipleRow[i].index - 1) :
                    (axis.multipleRow[i].index - 1);
                if (axis.multipleRow[i].index > 1) {
                    y = rect.y + labelPadding + (elementSize.height * a) + (axis.opposedPosition ?
                        -(((elementSize.height * 0.5) / 2) * axis.multipleRow[i].index) :
                        (((elementSize.height * 0.5) / 2) * axis.multipleRow[i].index));
                }
                else {
                    y = rect.y + labelPadding + (axis.opposedPosition ? -((elementSize.height * 0.5) / 2) :
                        ((elementSize.height * 0.5) / 2));
                }
            }
            else {
                y = rect.y + ((axis.textStyle.textOverflow === 'Wrap' || isLineBreak) && axis.opposedPosition && angle % 360 === 0 ? -(axis.farSizes.length >= 1 ? axis.farSizes[1] : 0) + padding : labelPadding);
            }
            this.drawXAxisBorder(axis, borderElement, axis.rect, x, elementSize.width, i);
            x = (axis.textStyle.textAlignment === 'Center' && wrappedlabels.length > 1) ? x + (elementSize.width / 2) : axis.textStyle.textAlignment === 'Near' ? x + padding / 2 : axis.textStyle.textAlignment === 'Far' ? x - padding / 2 : x;
            if (angle % 360 !== 0) {
                angle = (angle > 360) ? angle % 360 : angle;
                rotateSize = rotateTextSize(axis.textStyle, wrappedlabels, angle);
                /* eslint-disable max-len */
                x = lableRect.x + (axis.isInversed ? -(lableRect.width / 2) : (lableRect.width / 2)) + (angle === 90 ? (elementSize.height * ((wrappedlabels.length - 1) / 2)) : angle === 270 ? -(elementSize.height * (wrappedlabels.length - 1) / 2) : 0);
                /* eslint-disable max-len */
                y = y + (axis.opposedPosition ? (((axis.textStyle.textOverflow === 'Wrap' || isLineBreak) && !axis.enableTrim ? (((angle % 360) === 180) ? padding : 0) + (rotateSize.height / 2) - (axis.farSizes.length >= 1 ? axis.farSizes[1] : 0) : -(rotateSize.height / 2)) + (axis.border.width / 2)) :
                    (((angle % 360) === 0) ? 0 : ((angle % 360) === 180) ? (rotateSize.height / 2) - (axis.border.width) + padding : (rotateSize.height / 2) - (axis.border.width)));
                if (wrappedlabels.length > 1) {
                    y = y - ((angle > 0 && angle < 80) || (angle > 300 && angle < 360) ? elementSize.height * ((wrappedlabels.length - 1) / 2) : (angle > 120 && angle < 240) && angle !== 180 && wrappedlabels.length > 2 ? -(elementSize.height * ((wrappedlabels.length - 2) / 2)) : 0);
                    x = x + ((angle > 0 && angle < 70) ? elementSize.height * ((wrappedlabels.length - 1) / 2) : 0);
                }
                transform = 'rotate(' + angle + ',' + x + ',' + y + ')';
            }
            if (this.heatMap.cellSettings.border.width > 5 && axis.opposedPosition) {
                y = y - (this.heatMap.cellSettings.border.width / 2);
            }
            if (this.heatMap.yAxis.opposedPosition && this.heatMap.cellSettings.border.width > 5) {
                x = x + (this.heatMap.cellSettings.border.width / 2);
            }
            if (this.heatMap.xAxis.isInversed && this.heatMap.cellSettings.border.width > 5) {
                x = x - (this.heatMap.cellSettings.border.width / 2);
            }
            if (elementSize.width >= interval) {
                x = axis.border.width ? x + (axis.border.width / 2) : x;
            }
            x = axis.textStyle.textAlignment === 'Near' ? x + (axis.border.width / 2) : axis.textStyle.textAlignment === 'Far' ?
                x - (axis.border.width / 2) : x;
            x = (angle % 360 === 0) && axis.textStyle.textAlignment === 'Center' && elementSize.width > interval ? lableRect.x + ((!axis.isInversed) ?
                (elementSize.width / 2) : -((elementSize.width / 2))) : x;
            var options = new TextOption(heatMap.element.id + '_XAxis_Label' + i, new TextBasic(x, y, (angle % 360 === 0) ? (axis.textStyle.textAlignment === 'Center' && wrappedlabels.length > 1) ? 'middle' : 'start' : 'middle', label, angle, transform), axis.textStyle, axis.textStyle.color || heatMap.themeStyle.axisLabel);
            /* eslint-disable max-len */
            options.text = isLineBreak ? wrappedlabels : getTitle(options.text, axis.textStyle, lableRect.width - (axis.border.width / 2));
            if (angle !== 0 && this.heatMap.enableCanvasRendering) {
                this.drawSvgCanvas.canvasDrawText(options, null, null, null, wrappedlabels, elementSize.height, true);
            }
            else {
                if (axis.textStyle.textOverflow === 'Wrap' || isLineBreak) {
                    this.drawSvgCanvas.createWrapText(options, axis.textStyle, labelElement);
                }
                else {
                    this.drawSvgCanvas.createText(options, labelElement, label);
                }
            }
            if (compactInterval === 0) {
                var labelInterval = (axis.valueType === 'DateTime' && axis.showLabelOn !== 'None') ?
                    axis.dateTimeAxisLabelInterval[i] : axis.axisLabelInterval;
                lableStrtX = lableStrtX + (!axis.isInversed ? (labelInterval * interval) :
                    -(labelInterval * interval));
            }
            else {
                lableStrtX = lableStrtX + (!axis.isInversed ? (compactInterval * interval) : -(compactInterval * interval));
            }
            if (wrappedLabel.indexOf('...') !== -1) {
                var xValue = axis.angle % 360 !== 0 ? x - (rotateSize.width / 2) : (axis.textStyle.textAlignment === 'Center' ? x - (elementSize.width / 2) : x);
                var yValue = y - (axis.angle % 360 !== 0 ? (rotateSize.height / 2) : elementSize.height);
                label = labels[i].indexOf('<br>') !== -1 || labels[i].indexOf('<br/>') !== -1 ? labels[i].replace(/<br\s*\/?>/g, ' ') : labels[i];
                this.heatMap.tooltipCollection.push(new CanvasTooltip(label, new Rect(xValue, yValue, axis.angle % 360 !== 0 ? rotateSize.width : elementSize.width, axis.angle % 360 !== 0 ? rotateSize.height : elementSize.height * wrappedlabels.length)));
            }
            if (compactInterval !== 0) {
                i = i + (compactInterval - 1);
            }
        }
        if (!heatMap.enableCanvasRendering) {
            parent.appendChild(labelElement);
            parent.appendChild(borderElement);
        }
    };
    AxisHelper.prototype.getWrappedLabels = function (wrappedLabel, labelInterval, axis) {
        var wrappedlabels = wrappedLabel.split(/<br\s*\/?>/, -1);
        for (var i = 0; i < wrappedlabels.length; i++) {
            var label = wrappedlabels[i];
            wrappedlabels[i] = textTrim(labelInterval, label, axis.textStyle);
        }
        return wrappedlabels;
    };
    AxisHelper.prototype.getMaxLabel = function (wrappedlabels, axis) {
        var label = '';
        var labelWidth = 0;
        var wrappedlabelSize = new Size(0, 0);
        for (var index = 0; index < wrappedlabels.length; index++) {
            wrappedlabelSize = measureText(wrappedlabels[index], axis.textStyle);
            if (wrappedlabelSize.width > labelWidth) {
                labelWidth = wrappedlabelSize.width;
                label = wrappedlabels[index];
            }
        }
        return label;
    };
    AxisHelper.prototype.getLabels = function (label, labelInterval, axis, isLineBreak) {
        var wrappedlabels = [];
        if (isLineBreak) {
            wrappedlabels = this.getWrappedLabels(label, labelInterval, axis);
        }
        else {
            wrappedlabels = textWrap(label, labelInterval, axis.textStyle);
        }
        return wrappedlabels;
    };
    AxisHelper.prototype.drawYAxisLabels = function (axis, parent, rect) {
        var heatMap = this.heatMap;
        var labels = axis.axisLabels;
        var interval = rect.height / axis.axisLabelSize;
        var compactInterval = 0;
        var tempintervel = rect.height / (axis.axisLabelSize / axis.axisLabelInterval);
        var temp = axis.axisLabelInterval;
        var label;
        if (tempintervel > 0) {
            while (tempintervel < parseInt(axis.textStyle.size, 10)) {
                temp = temp + 1;
                tempintervel = rect.height / (axis.axisLabelSize / temp);
            }
        }
        else {
            temp = axis.tooltipLabels.length;
        }
        if (axis.axisLabelInterval < temp) {
            compactInterval = temp;
            labels = axis.tooltipLabels;
        }
        var padding = 10;
        var labelPadding = 5;
        var lableStartY = rect.y + (axis.isInversed ? 0 : rect.height);
        var anchor = axis.opposedPosition ? 'start' : 'end';
        padding = axis.opposedPosition ? padding : -padding;
        var labelElement;
        var borderElement;
        if (!heatMap.enableCanvasRendering) {
            labelElement = this.heatMap.renderer.createGroup({ id: heatMap.element.id + 'YAxisLabels' });
            borderElement = this.heatMap.renderer.createGroup({ id: heatMap.element.id + 'YAxisLabelBorder' });
        }
        var isLineBreak = getIsLineBreakLabel(labels);
        for (var i = 0, len = labels.length; i < len; i++) {
            var labelRect = new Rect(rect.x, lableStartY, rect.width, interval);
            var position = axis.isInversed ? labelRect.height / 2 : -(labelRect.height / 2); //titlePositionY(lableRect, 0, 0, axis.textStyle);
            var axisWidth = this.heatMap.cellSettings.border.width >= 20 ? (this.heatMap.cellSettings.border.width / 2) : 0;
            var indexValue = this.heatMap.cellSettings.border.width > 5 ?
                (((this.heatMap.cellSettings.border.width / 2) / len) * (axis.isInversed ? (i) : (len - i))) : 0;
            label = (axis.enableTrim || axis.textStyle.textOverflow === 'Trim') && !isLineBreak ? textTrim(axis.maxLabelLength, labels[i], axis.textStyle) : labels[i];
            if (heatMap.enableHtmlSanitizer) {
                label = SanitizeHtmlHelper.sanitize(label);
            }
            var elementSize = measureText(label, axis.textStyle);
            var labelLength = 1;
            var wrappedLabel = [];
            var rotateSize = new Size(0, 0);
            if ((axis.textStyle.textOverflow === 'Wrap' || isLineBreak) && !axis.enableTrim) {
                wrappedLabel = this.getLabels(label, axis.maxLabelLength, axis, isLineBreak);
                for (var index = 0; index < wrappedLabel.length; index++) {
                    if ((elementSize.height * wrappedLabel.length) > (tempintervel + (labelPadding)) && wrappedLabel.length > 0 && (axis.angle !== 90 && axis.angle !== 270)) {
                        wrappedLabel.pop();
                        if (wrappedLabel.length > 0) {
                            wrappedLabel[wrappedLabel.length - 1] = wrappedLabel[wrappedLabel.length - 1] + '...';
                            /* eslint-disable max-len */
                            wrappedLabel[wrappedLabel.length - 1] = textTrim(axis.maxLabelLength, wrappedLabel[wrappedLabel.length - 1], axis.textStyle);
                        }
                    }
                }
                if (!(isLineBreak)) {
                    label = wrappedLabel.length !== 0 ? '' : label;
                    for (var labelIndex = 0; labelIndex < wrappedLabel.length; labelIndex++) {
                        label = isNullOrUndefined(label) ? wrappedLabel[labelIndex] : label + ' ' + wrappedLabel[labelIndex];
                    }
                }
                labelLength = wrappedLabel.length;
            }
            else {
                if (isLineBreak && axis.enableTrim) {
                    wrappedLabel = this.getLabels(label, axis.maxLabelLength, axis, isLineBreak);
                    var trimmedLabel = textTrim(axis.maxLabelLength, wrappedLabel[0], axis.textStyle);
                    label = (label.indexOf('<br>') !== -1 || label.indexOf('<br/>') !== -1) && trimmedLabel.indexOf('...') === -1 ? trimmedLabel + '...' : trimmedLabel;
                    wrappedLabel = [];
                }
                wrappedLabel.push(label);
            }
            var x = labelRect.x + padding + (axis.opposedPosition ? (axis.textStyle.textOverflow === 'Wrap' && axis.angle % 360 !== 0 ? labelLength * (elementSize.height / 2) : 0) + axisWidth : -axisWidth);
            if (axis.textStyle.textAlignment === 'Far' && axis.angle % 360 === 0) {
                /* eslint-disable max-len */
                position = axis.isInversed ? labelRect.height - (labelLength > 1 ? (elementSize.height * labelLength) - (elementSize.height / 2) : (elementSize.height / 2)) :
                    -(labelLength > 1 ? (elementSize.height * labelLength) - (elementSize.height / 2) : (elementSize.height / 2));
            }
            else if (axis.textStyle.textAlignment === 'Near' && axis.angle % 360 === 0) {
                /* eslint-disable max-len */
                position = (axis.isInversed ? elementSize.height / 2 : ((elementSize.height / 2) - labelRect.height)) + (axis.border.width / 2);
            }
            var y = (labelRect.y - indexValue) + position - ((labelLength > 1 && axis.textStyle.textAlignment === 'Center') || (axis.angle % 360 !== 0 && axis.opposedPosition) ? (((elementSize.height * labelLength) / 2) - (elementSize.height / 2)) : 0);
            if (axis.angle % 360 !== 0) {
                anchor = 'middle';
                axis.angle = (axis.angle > 360) ? axis.angle % 360 : axis.angle;
                rotateSize = rotateTextSize(axis.textStyle, wrappedLabel, axis.angle);
                x = labelRect.x + (axis.opposedPosition ? (rotateSize.width / 2 + padding) : -(rotateSize.width / 2 - padding)) + (axis.angle === 90 ? (elementSize.height * ((wrappedLabel.length - 1) / 2)) : axis.angle === 270 ? -(elementSize.height * (wrappedLabel.length - 1) / 2) : 0);
                y = labelRect.y + (axis.isInversed ? (labelRect.height / 2) : (-labelRect.height / 2)) + (axis.angle === 180 ? (elementSize.height * ((wrappedLabel.length - 1) / 2)) : 0);
                if (wrappedLabel.length > 1) {
                    var value = elementSize.height * ((wrappedLabel.length - 1) / 2);
                    y = y - ((axis.angle > 0 && axis.angle < 60) || (axis.angle > 290 && axis.angle < 360) ? value : (axis.angle > 115 && axis.angle < 240) && axis.angle !== 180 ? -value : 0);
                    x = x + (axis.angle > 20 && axis.angle < 160 && axis.angle !== 90 ? value : axis.angle > 200 && axis.angle < 330 && axis.angle !== 270 ? -value - (axis.angle > 200 && axis.angle < 240 && !axis.opposedPosition && wrappedLabel.length > 2 ? -(elementSize.height * ((wrappedLabel.length - 2) / 2)) : 0) :
                        (axis.angle >= 330 && axis.angle < 350 ? -value / 2 : 0));
                }
            }
            var options = new TextOption(heatMap.element.id + '_YAxis_Label' + i, new TextBasic(x, y, anchor, label, axis.angle, 'rotate(' + axis.angle + ',' + (x) + ',' + (y) + ')', 'middle'), axis.textStyle, axis.textStyle.color || heatMap.themeStyle.axisLabel);
            if (Browser.isIE && !heatMap.enableCanvasRendering) {
                options.dy = '1ex';
            }
            options.text = isLineBreak ? wrappedLabel : getTitle(options.text, axis.textStyle, axis.maxLabelLength);
            if (axis.angle !== 0 && this.heatMap.enableCanvasRendering) {
                this.drawSvgCanvas.canvasDrawText(options, null, null, null, wrappedLabel, elementSize.height, true);
            }
            else {
                if (axis.textStyle.textOverflow === 'Wrap' || isLineBreak) {
                    this.drawSvgCanvas.createWrapText(options, axis.textStyle, labelElement);
                }
                else {
                    this.drawSvgCanvas.createText(options, labelElement, label);
                }
            }
            if (compactInterval === 0) {
                var labelInterval = (axis.valueType === 'DateTime' && axis.showLabelOn !== 'None') ?
                    axis.dateTimeAxisLabelInterval[i] : axis.axisLabelInterval;
                lableStartY = lableStartY + (axis.isInversed ? (labelInterval * interval) :
                    -(labelInterval * interval));
            }
            else {
                lableStartY = lableStartY + (axis.isInversed ? (compactInterval * interval) : -(compactInterval * interval));
                i = i + (compactInterval - 1);
            }
            this.drawYAxisBorder(axis, borderElement, axis.rect, y, elementSize.height, i);
            label = this.getMaxLabel(wrappedLabel, axis);
            if (label.indexOf('...') !== -1) {
                var xValue = axis.opposedPosition ? x : (x - (axis.angle % 360 !== 0 ? (rotateSize.width / 2) : elementSize.width));
                var yValue = y - (axis.angle % 360 !== 0 ? (rotateSize.height / 2) : elementSize.height);
                label = labels[i].indexOf('<br>') !== -1 || labels[i].indexOf('<br/>') !== -1 ? labels[i].replace(/<br\s*\/?>/g, ' ') : labels[i];
                this.heatMap.tooltipCollection.push(new CanvasTooltip(label, new Rect(xValue, yValue, (axis.angle % 360 !== 0 ? rotateSize.width : elementSize.width), (axis.angle % 360 !== 0 ? rotateSize.height : elementSize.height * wrappedLabel.length))));
            }
        }
        if (!heatMap.enableCanvasRendering) {
            parent.appendChild(labelElement);
            parent.appendChild(borderElement);
        }
    };
    AxisHelper.prototype.drawXAxisBorder = function (axis, parent, rect, lableX, width, index) {
        var interval = rect.width / axis.axisLabelSize;
        var path = '';
        var padding = 10;
        var axisInterval = axis.interval ? axis.interval : 1;
        var startX = axis.isInversed ? rect.x + rect.width - (interval * index * axisInterval) :
            rect.x + (interval * index * axisInterval);
        var startY = rect.y;
        var endX;
        var endY;
        endY = startY + (axis.opposedPosition ? -(axis.maxLabelSize.height + padding) : axis.maxLabelSize.height + padding);
        // eslint-disable-next-line prefer-const
        endX = axis.isInversed ? startX - interval : startX + interval;
        var endY1 = axis.isInversed ? (lableX + width + padding) : (lableX - padding);
        var endY2 = axis.isInversed ? (lableX - padding) : (lableX + width + padding);
        endY2 = axis.textStyle.textAlignment === 'Near' && axis.isInversed ? endY2 + padding : axis.textStyle.textAlignment === 'Far' && !axis.isInversed ? endY2 - padding : endY2;
        endY1 = axis.textStyle.textAlignment === 'Far' && axis.isInversed ? endY1 - padding : axis.textStyle.textAlignment === 'Near' && !axis.isInversed ? endY1 + padding : endY1;
        switch (axis.border.type) {
            case 'Rectangle':
                path = ('M' + ' ' + startX + ' ' + startY + ' ' + 'L' + ' ' + startX + ' ' + endY + ' ' +
                    'L' + ' ' + endX + ' ' + endY + ' ' + 'L' + ' ' + endX + ' ' + startY + ' ' + 'L' + ' ' + startX + ' ' + startY);
                break;
            case 'WithoutTopBorder':
                path = 'M' + ' ' + startX + ' ' + startY + ' ' + 'L' + ' ' + startX + ' ' + endY + ' ' +
                    'L' + ' ' + endX + ' ' + endY + ' ' + 'L' + ' ' + endX + ' ' + startY + ' ';
                break;
            case 'WithoutBottomBorder':
                path = 'M' + ' ' + startX + ' ' + endY + ' ' + 'L' + ' ' + startX + ' ' + startY + ' ' +
                    'L' + ' ' + endX + ' ' + startY + ' ' + 'L' + ' ' + endX + ' ' + endY + ' ';
                break;
            case 'WithoutTopandBottomBorder':
                path = 'M' + ' ' + startX + ' ' + startY + ' ' + 'L' + ' ' + startX + ' ' + endY + ' ' +
                    'M' + ' ' + endX + ' ' + startY + ' ' + 'L' + ' ' + endX + ' ' + endY + ' ';
                break;
            case 'Brace':
                endY = startY + ((endY - startY) / 2) + (axis.opposedPosition ? 0 : 5);
                path = 'M' + ' ' + startX + ' ' + startY + ' ' + 'L' + ' ' + startX + ' ' + endY + ' ' +
                    'L' + ' ' + endY1 + ' ' + endY + ' ' + 'M' + ' ' + endY2 +
                    ' ' + endY + ' ' + 'L' +
                    ' ' + endX + ' ' + endY + ' ' + 'L' + ' ' + endX + ' ' + startY + ' ';
                break;
        }
        if (axis.border.width > 0 && axis.border.type !== 'WithoutBorder') {
            this.createAxisBorderElement(axis, path, parent, index);
        }
    };
    AxisHelper.prototype.drawYAxisBorder = function (axis, parent, rect, lableY, height, index) {
        var interval = rect.height / axis.axisLabelSize;
        var path = '';
        var padding = 20;
        var axisInterval = axis.interval ? axis.interval : 1;
        var startX = rect.x;
        var startY = axis.isInversed ? rect.y + (interval * index * axisInterval) :
            rect.y + rect.height - (interval * index * axisInterval);
        var endX;
        var endY;
        endX = startX + (!axis.opposedPosition ? -(axis.maxLabelSize.width + padding) : axis.maxLabelSize.width + padding);
        // eslint-disable-next-line prefer-const
        endY = axis.isInversed ? startY + interval : startY - interval;
        var endY1 = axis.isInversed ? lableY - height / 2 : lableY + height / 2;
        var endY2 = axis.isInversed ? lableY + height / 2 : lableY - height / 2;
        switch (axis.border.type) {
            case 'Rectangle':
                path = 'M' + ' ' + startX + ' ' + startY + ' ' + 'L' + ' ' + startX + ' ' + endY + ' ' +
                    'L' + ' ' + endX + ' ' + endY + ' ' + 'L' + ' ' + endX + ' ' + startY + ' ' + 'L' + ' ' + startX + ' ' + startY;
                break;
            case 'WithoutTopBorder':
                path = 'M' + ' ' + startX + ' ' + startY + ' ' + 'L' + ' ' + endX + ' ' + startY + ' ' +
                    'L' + ' ' + endX + ' ' + endY + ' ' + 'L' + ' ' + startX + ' ' + endY + ' ';
                break;
            case 'WithoutBottomBorder':
                path = 'M' + ' ' + endX + ' ' + startY + ' ' + 'L' + ' ' + startX + ' ' + startY + ' ' +
                    'L' + ' ' + startX + ' ' + endY + ' ' + 'L' + ' ' + endX + ' ' + endY + ' ';
                break;
            case 'WithoutTopandBottomBorder':
                path = 'M' + ' ' + startX + ' ' + startY + ' ' + 'L' + ' ' + endX + ' ' + startY + ' ' +
                    'M' + ' ' + endX + ' ' + endY + ' ' + 'L' + ' ' + startX + ' ' + endY + ' ';
                break;
            case 'Brace':
                endX = startX - (startX - endX) / 2;
                path = 'M' + ' ' + startX + ' ' + startY + ' ' + 'L' + ' ' + endX + ' ' + startY + ' ' +
                    'L' + ' ' + endX + ' ' + endY1 + ' ' + 'M' + ' ' +
                    endX + ' ' + endY2 + ' ' + 'L' + ' ' + endX + ' ' + endY + ' ' +
                    'L' + ' ' + startX + ' ' + endY;
                break;
        }
        if (axis.border.width > 0 && axis.border.type !== 'WithoutBorder') {
            this.createAxisBorderElement(axis, path, parent, index);
        }
    };
    /**
     * To create border element for axis.
     *
     * @returns {void}
     * @private
     */
    AxisHelper.prototype.createAxisBorderElement = function (axis, labelBorder, parent, index) {
        var canvasTranslate;
        var id = axis.orientation === 'Horizontal' ? '_XAxis_Label_Border' : '_YAxis_Label_Border';
        var pathOptions = new PathOption(this.heatMap.element.id + id + index, 'transparent', axis.border.width, axis.border.color, 1, 'none', labelBorder);
        if (!this.heatMap.enableCanvasRendering) {
            var borderElement = this.heatMap.renderer.drawPath(pathOptions);
            parent.appendChild(borderElement);
        }
        else {
            this.heatMap.canvasRenderer.drawPath(pathOptions, canvasTranslate);
        }
    };
    AxisHelper.prototype.drawMultiLevels = function (parent, axis) {
        var element;
        if (!this.heatMap.enableCanvasRendering) {
            element = this.heatMap.renderer.createGroup({ id: this.heatMap.element.id + '_' + axis.orientation + '_MultiLevelLabel' });
        }
        if (axis.orientation === 'Horizontal') {
            this.renderXAxisMultiLevelLabels(axis, element);
        }
        else {
            this.renderYAxisMultiLevelLabels(axis, element);
        }
        if (!this.heatMap.enableCanvasRendering) {
            parent.appendChild(element);
        }
    };
    /**
     * render x axis multi level labels
     *
     * @private
     * @returns {void}
     */
    AxisHelper.prototype.renderXAxisMultiLevelLabels = function (axis, parent) {
        var _this = this;
        var x = 0;
        var y;
        var padding = 10;
        var startX;
        var startY;
        var endX = 0;
        var tooltip;
        var start;
        var end;
        var labelSize;
        var anchor;
        var isInversed = axis.isInversed;
        var labelElement;
        var opposedPosition = axis.opposedPosition;
        var pathRect = '';
        var gap;
        var textLength;
        var position = (isInversed ? axis.rect.width : 0) + axis.rect.x;
        axis.multiLevelLabels.map(function (multiLevel, level) {
            labelElement = _this.heatMap.renderer.createGroup({ id: _this.heatMap.element.id + '_XAxisMultiLevelLabel' + level });
            multiLevel.categories.map(function (categoryLabel, i) {
                if (!isNullOrUndefined(categoryLabel.start) && !isNullOrUndefined(categoryLabel.end)) {
                    if (_this.heatMap.theme === 'Tailwind' || _this.heatMap.theme === 'TailwindDark') {
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        multiLevel.setProperties({ textStyle: { fontFamily: 'Inter' } }, true);
                    }
                    if (_this.heatMap.theme === 'Tailwind3' || _this.heatMap.theme === 'Tailwind3Dark') {
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        multiLevel.setProperties({ textStyle: { color: _this.heatMap.themeStyle.axisLabel, fontFamily: 'Inter', fontWeight: '400' } }, true);
                    }
                    if (_this.heatMap.theme === 'Material3' || _this.heatMap.theme === 'Material3Dark') {
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        multiLevel.setProperties({ textStyle: { fontFamily: 'Roboto' } }, true);
                    }
                    if (_this.heatMap.theme === 'Fluent' || _this.heatMap.theme === 'FluentDark') {
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        multiLevel.setProperties({ textStyle: { fontFamily: '"Segoe UI", -apple-system, BlinkMacSystemFont, "Roboto", "Helvetica Neue", sans-serif' } }, true);
                    }
                    if (_this.heatMap.theme === 'Fluent2') {
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        multiLevel.setProperties({ textStyle: { color: '#242424', size: '12px', fontWeight: '400', fontFamily: 'Segoe UI' } }, true);
                    }
                    if (_this.heatMap.theme === 'Fluent2Dark' || _this.heatMap.theme === 'Fluent2HighContrast') {
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        multiLevel.setProperties({ textStyle: { color: '#FFFFFF', size: '12px', fontWeight: '400', fontFamily: 'Segoe UI' } }, true);
                    }
                    if (_this.heatMap.theme === 'Bootstrap5') {
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        multiLevel.setProperties({ textStyle: { color: '#212529', size: '12px', fontWeight: '400', fontFamily: 'Segoe UI' } }, true);
                    }
                    if (_this.heatMap.theme === 'Bootstrap5Dark') {
                        //eslint-disable-next-line @typescript-eslint/no-explicit-any
                        multiLevel.setProperties({ textStyle: { color: '#DEE2E6', size: '12px', fontWeight: '400', fontFamily: 'Segoe UI' } }, true);
                    }
                    tooltip = false;
                    start = typeof categoryLabel.start === 'number' ? categoryLabel.start : Number(new Date(categoryLabel.start));
                    end = typeof categoryLabel.end === 'number' ? categoryLabel.end : Number(new Date(categoryLabel.end));
                    startX = position + _this.calculateLeftPosition(axis, start, categoryLabel.start, axis.rect);
                    startY = axis.multiLevelPosition[level].y;
                    endX = position + _this.calculateWidth(axis, categoryLabel.end, end, axis.rect);
                    var text = _this.heatMap.enableHtmlSanitizer ? SanitizeHtmlHelper.sanitize(categoryLabel.text) : categoryLabel.text;
                    labelSize = measureText(text, multiLevel.textStyle);
                    gap = ((categoryLabel.maximumTextWidth === null) ? Math.abs(endX - startX) : categoryLabel.maximumTextWidth) - padding;
                    y = startY + (opposedPosition ? -((axis.xAxisMultiLabelHeight[level] - labelSize.height)) : labelSize.height);
                    x = !isInversed ? startX + padding : startX - gap;
                    if (multiLevel.alignment === 'Center') {
                        x = ((endX - startX) / 2) + startX;
                        x -= (labelSize.width > gap ? gap : labelSize.width) / 2;
                    }
                    else if (multiLevel.alignment === 'Far') {
                        x = !isInversed ? endX - padding : startX - padding;
                        x -= (labelSize.width > gap ? gap : labelSize.width);
                    }
                    else {
                        x = !isInversed ? startX + padding : endX + padding;
                    }
                    if (multiLevel.overflow === 'None' && labelSize.width > Math.abs(endX - startX)) {
                        x = !isInversed ? startX + padding : startX - labelSize.width - padding;
                        anchor = 'start';
                    }
                    var textBasic = new TextBasic(x, y, anchor, text, 0, 'translate(0,0)');
                    var options = new TextOption(_this.heatMap.element.id + '_XAxis_MultiLevel' + level + '_Text' + i, textBasic, multiLevel.textStyle, multiLevel.textStyle.color || _this.heatMap.themeStyle.axisLabel);
                    if (multiLevel.overflow === 'Wrap') {
                        options.text = textWrap(text, gap, multiLevel.textStyle);
                        textLength = options.text.length;
                    }
                    else if (multiLevel.overflow === 'Trim') {
                        options.text = textTrim(gap, text, multiLevel.textStyle);
                        textLength = 1;
                    }
                    if (multiLevel.overflow === 'Wrap' && options.text.length > 1) {
                        _this.drawSvgCanvas.createWrapText(options, multiLevel.textStyle, labelElement);
                        for (var i_2 = 0; i_2 < options.text.length; i_2++) {
                            if (options.text[i_2].indexOf('...') !== -1) {
                                tooltip = true;
                                break;
                            }
                        }
                    }
                    else {
                        _this.drawSvgCanvas.createText(options, labelElement, options.text);
                    }
                    if (!_this.heatMap.enableCanvasRendering) {
                        parent.appendChild(labelElement);
                    }
                    if (options.text.indexOf('...') !== -1 || options.text[0].indexOf('...') !== -1 || tooltip) {
                        _this.heatMap.tooltipCollection.push(new CanvasTooltip(categoryLabel.text, new Rect(x, y - labelSize.height, gap, labelSize.height * textLength)));
                    }
                    if (multiLevel.border.width > 0 && multiLevel.border.type !== 'WithoutBorder') {
                        pathRect = _this.renderXAxisLabelBorder(level, axis, startX, startY, endX, pathRect, level, labelSize, gap, x);
                    }
                }
            });
            if (pathRect !== '') {
                _this.createBorderElement(level, axis, pathRect, parent);
                pathRect = '';
            }
        });
        if (!this.heatMap.enableCanvasRendering) {
            parent.appendChild(labelElement);
        }
    };
    /**
     * render x axis multi level labels border
     *
     * @private
     * @returns {void}
     */
    AxisHelper.prototype.renderXAxisLabelBorder = function (labelIndex, axis, startX, startY, endX, path, level, labelSize, gap, x) {
        var path1;
        var path2;
        var endY = startY + (axis.opposedPosition ? -(axis.xAxisMultiLabelHeight[labelIndex]) :
            axis.xAxisMultiLabelHeight[labelIndex]);
        var padding = 3;
        switch (axis.multiLevelLabels[level].border.type) {
            case 'Rectangle':
                path += 'M' + ' ' + startX + ' ' + startY + ' ' + 'L' + ' ' + startX + ' ' + endY + ' ' +
                    'L' + ' ' + endX + ' ' + endY + ' ' + 'L' + ' ' + endX + ' ' + startY + ' ' + 'L' + ' ' + startX + ' ' + startY + ' ';
                break;
            case 'WithoutTopBorder':
                path += 'M' + ' ' + startX + ' ' + startY + ' ' + 'L' + ' ' + startX + ' ' + endY + ' ' +
                    'L' + ' ' + endX + ' ' + endY + ' ' + 'L' + ' ' + endX + ' ' + startY + ' ';
                break;
            case 'WithoutBottomBorder':
                path += 'M' + ' ' + startX + ' ' + endY + ' ' + 'L' + ' ' + startX + ' ' + startY + ' ' +
                    'L' + ' ' + endX + ' ' + startY + ' ' + 'L' + ' ' + endX + ' ' + endY + ' ';
                break;
            case 'WithoutTopandBottomBorder':
                path += 'M' + ' ' + startX + ' ' + startY + ' ' + 'L' + ' ' + startX + ' ' + endY + ' ' +
                    'M' + ' ' + endX + ' ' + startY + ' ' + 'L' + ' ' + endX + ' ' + endY + ' ';
                break;
            case 'Brace':
                path1 = axis.isInversed ? (labelSize.width > gap ? gap : labelSize.width) + x + padding : x - padding;
                path2 = axis.isInversed ? x - padding : (labelSize.width > gap ? gap : labelSize.width) + x + padding;
                path += 'M' + ' ' + startX + ' ' + startY + ' ' + 'L' + ' ' + startX + ' ' + (startY + (endY - startY) / 2) + ' ' +
                    'L' + ' ' + path1 + ' ' + (startY + (endY - startY) / 2) + ' ' + 'M' + ' ' + path2 + ' ' + (startY +
                    (endY - startY) / 2) + ' ' + 'L' + ' ' + endX + ' ' + (startY + (endY - startY) / 2) +
                    ' ' + 'L' + ' ' + endX + ' ' + startY + ' ';
                break;
        }
        return path;
    };
    /**
     * render y axis multi level labels
     *
     * @private
     * @returns {void}
     */
    AxisHelper.prototype.renderYAxisMultiLevelLabels = function (axis, parent) {
        var _this = this;
        var x = 0;
        var y;
        var padding = 10;
        var startX;
        var startY;
        var endY;
        var start;
        var end;
        var labelSize;
        var isInversed = axis.isInversed;
        var labelElement;
        var pathRect = '';
        var gap;
        var text;
        var position = (!isInversed ? axis.rect.height : 0) + axis.rect.y;
        axis.multiLevelLabels.map(function (multiLevel, level) {
            startY = axis.multiLevelPosition[level].y;
            labelElement = _this.heatMap.renderer.createGroup({ id: _this.heatMap.element.id + '_YAxisMultiLevelLabel' + level });
            multiLevel.categories.map(function (categoryLabel, i) {
                if (_this.heatMap.theme === 'Tailwind' || _this.heatMap.theme === 'TailwindDark') {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    multiLevel.setProperties({ textStyle: { fontFamily: 'Inter' } }, true);
                }
                if (_this.heatMap.theme === 'Tailwind3' || _this.heatMap.theme === 'Tailwind3Dark') {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    multiLevel.setProperties({ textStyle: { color: _this.heatMap.themeStyle.axisLabel, fontFamily: 'Inter', fontWeight: '400' } }, true);
                }
                if (_this.heatMap.theme === 'Material3' || _this.heatMap.theme === 'Material3Dark') {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    multiLevel.setProperties({ textStyle: { fontFamily: 'Roboto' } }, true);
                }
                if (_this.heatMap.theme === 'Bootstrap5' || _this.heatMap.theme === 'Bootstrap5Dark') {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    multiLevel.setProperties({ textStyle: { fontFamily: 'Segoe UI' } }, true);
                }
                if (_this.heatMap.theme === 'Fluent2') {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    multiLevel.setProperties({ textStyle: { color: '#242424', size: '12px', fontWeight: '400', fontFamily: 'Segoe UI' } }, true);
                }
                if (_this.heatMap.theme === 'Fluent2Dark' || _this.heatMap.theme === 'Fluent2HighContrast') {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    multiLevel.setProperties({ textStyle: { color: '#FFFFFF', size: '12px', fontWeight: '400', fontFamily: 'Segoe UI' } }, true);
                }
                start = typeof categoryLabel.start === 'number' ? categoryLabel.start : Number(new Date(categoryLabel.start));
                end = typeof categoryLabel.end === 'number' ? categoryLabel.end : Number(new Date(categoryLabel.end));
                startY = position + _this.calculateLeftPosition(axis, start, categoryLabel.start, axis.rect);
                startX = axis.multiLevelPosition[level].x;
                endY = position + _this.calculateWidth(axis, categoryLabel.start, end, axis.rect);
                var categoryText = _this.heatMap.enableHtmlSanitizer ? SanitizeHtmlHelper.sanitize(categoryLabel.text) : categoryLabel.text;
                labelSize = measureText(categoryText, multiLevel.textStyle);
                gap = ((categoryLabel.maximumTextWidth === null) ? Math.abs(startX) : categoryLabel.maximumTextWidth) - padding;
                var maxWidth = Math.abs(startX - (startX - axis.multiLevelSize[level].width - 2 * padding)) / 2 -
                    (labelSize.width / 2);
                x = (axis.opposedPosition ? startX : startX - axis.multiLevelSize[level].width - 2 * padding) + maxWidth;
                y = startY + padding;
                if (multiLevel.overflow !== 'None') {
                    if (multiLevel.overflow === 'Wrap') {
                        text = textWrap(categoryText, gap, multiLevel.textStyle);
                    }
                    else {
                        text = textTrim(gap, categoryText, multiLevel.textStyle);
                    }
                }
                if (multiLevel.alignment === 'Center') {
                    y += ((endY - startY) / 2 - (text.length * labelSize.height) / 2);
                }
                else if (multiLevel.alignment === 'Far') {
                    y = isInversed ? endY - labelSize.height / 2 : y - labelSize.height;
                }
                else {
                    y = isInversed ? y + labelSize.height / 2 : endY + labelSize.height;
                }
                if (multiLevel.border.width > 0 && multiLevel.border.type !== 'WithoutBorder') {
                    pathRect = _this.renderYAxisLabelBorder(level, axis, startX, startY, endY, pathRect, level, labelSize, gap, y);
                }
                var textBasic = new TextBasic(x, y, 'start', _this.heatMap.enableHtmlSanitizer ? SanitizeHtmlHelper.sanitize(categoryLabel.text) : categoryLabel.text, 0, 'translate(0,0)');
                var options = new TextOption(_this.heatMap.element.id + '_YAxis_MultiLevel' + level + '_Text' + i, textBasic, multiLevel.textStyle, multiLevel.textStyle.color || _this.heatMap.themeStyle.axisLabel);
                options.text = text;
                _this.drawSvgCanvas.createText(options, labelElement, options.text);
                if (options.text.indexOf('...') !== -1) {
                    _this.heatMap.tooltipCollection.push(new CanvasTooltip(categoryLabel.text, new Rect(x, y - labelSize.height, gap, labelSize.height)));
                }
                if (!_this.heatMap.enableCanvasRendering) {
                    parent.appendChild(labelElement);
                }
            });
            if (pathRect !== '') {
                _this.createBorderElement(level, axis, pathRect, parent);
                pathRect = '';
            }
        });
        if (!this.heatMap.enableCanvasRendering) {
            parent.appendChild(labelElement);
        }
    };
    /**
     * render x axis multi level labels border
     *
     * @private
     * @returns {void}
     */
    AxisHelper.prototype.renderYAxisLabelBorder = function (labelIndex, axis, startX, startY, endY, path, level, labelSize, gap, y) {
        var padding = 20;
        var path1;
        var path2;
        var endX = startX - (axis.opposedPosition ? -(axis.multiLevelSize[labelIndex].width + padding) :
            (axis.multiLevelSize[labelIndex].width + padding));
        switch (axis.multiLevelLabels[level].border.type) {
            case 'Rectangle':
                path += 'M' + ' ' + startX + ' ' + startY + ' ' + 'L' + ' ' + endX + ' ' + startY + ' ' +
                    'L' + ' ' + endX + ' ' + endY + ' ' + 'L' + ' ' + startX + ' ' + endY + ' ' + 'L' + ' ' + startX + ' ' + startY + ' ';
                break;
            case 'WithoutTopBorder':
                path += 'M' + ' ' + startX + ' ' + startY + ' ' + 'L' + ' ' + endX + ' ' + startY + ' ' +
                    'L' + ' ' + endX + ' ' + endY + ' ' + 'L' + ' ' + startX + ' ' + endY + ' ';
                break;
            case 'WithoutBottomBorder':
                path += 'M' + ' ' + endX + ' ' + startY + ' ' + 'L' + ' ' + startX + ' ' + startY + ' ' +
                    'L' + ' ' + startX + ' ' + endY + ' ' + 'L' + ' ' + endX + ' ' + endY + ' ';
                break;
            case 'WithoutTopandBottomBorder':
                path += 'M' + ' ' + startX + ' ' + startY + ' ' + 'L' + ' ' + endX + ' ' + startY + ' ' +
                    'M' + ' ' + startX + ' ' + endY + ' ' + 'L' + ' ' + endX + ' ' + endY + ' ';
                break;
            case 'Brace':
                padding = 10;
                path1 = axis.isInversed ? (y - padding - 5) : (y + (labelSize.height) - padding);
                path2 = axis.isInversed ? (y + (labelSize.height) - padding) : (y - padding - 5);
                path += 'M' + ' ' + startX + ' ' + startY + ' ' + 'L' + ' ' + (startX + (endX - startX) / 2) + ' ' + startY + ' ' +
                    'L' + ' ' + (startX + (endX - startX) / 2) + ' ' + path1 + ' ' + 'M' + ' ' + (startX + (endX - startX) / 2) +
                    ' ' + path2 + ' ' + 'L' + ' ' + (startX + (endX - startX) / 2) + ' ' +
                    endY + ' ' + 'L' + ' ' + startX + ' ' + endY + ' ';
                break;
        }
        return path;
    };
    /**
     * create borer element
     *
     * @returns {void}
     * @private
     */
    AxisHelper.prototype.createBorderElement = function (borderIndex, axis, path, parent) {
        var canvasTranslate;
        var id = axis.orientation === 'Horizontal' ? 'XAxis' : 'YAxis';
        var pathOptions = new PathOption(this.heatMap.element.id + '_' + id + '_MultiLevel_Rect_' + borderIndex, 'Transparent', axis.multiLevelLabels[borderIndex].border.width, axis.multiLevelLabels[borderIndex].border.color, 1, '', path);
        var borderElement = this.heatMap.renderer.drawPath(pathOptions);
        if (!this.heatMap.enableCanvasRendering) {
            parent.appendChild(borderElement);
        }
        else {
            this.heatMap.canvasRenderer.drawPath(pathOptions, canvasTranslate);
        }
    };
    /**
     * calculate left position of border element
     *
     * @private
     */
    AxisHelper.prototype.calculateLeftPosition = function (axis, start, label, rect) {
        var value;
        var interval;
        if (typeof label === 'number') {
            if (axis.valueType === 'Numeric' && (axis.minimum || axis.maximum)) {
                var min = axis.minimum ? axis.minimum : 0;
                start -= min;
            }
            var size = axis.orientation === 'Horizontal' ? rect.width : rect.height;
            interval = size / (axis.axisLabelSize * axis.increment);
            value = (axis.isInversed ? -1 : 1) * start * interval;
            value = axis.orientation === 'Horizontal' ? value : -value;
        }
        else {
            interval = this.calculateNumberOfDays(start, axis, true, rect);
            value = axis.isInversed ? -interval : interval;
            value = axis.orientation === 'Horizontal' ? value : -value;
        }
        return value;
    };
    /**
     * calculate width of border element
     *
     * @private
     */
    AxisHelper.prototype.calculateWidth = function (axis, label, end, rect) {
        var interval;
        var value;
        if (typeof label === 'number') {
            if (axis.valueType === 'Numeric' && (axis.minimum || axis.maximum)) {
                var min = axis.minimum ? axis.minimum : 0;
                end -= min;
            }
            var size = axis.orientation === 'Horizontal' ? rect.width : rect.height;
            interval = size / (axis.axisLabelSize * axis.increment);
            value = (axis.isInversed ? -1 : 1) * (end + 1) * interval;
            value = axis.orientation === 'Horizontal' ? value : -value;
        }
        else {
            interval = this.calculateNumberOfDays(end, axis, false, rect);
            value = interval;
            value = axis.isInversed ? -value : value;
            value = axis.orientation === 'Horizontal' ? value : -value;
        }
        return value;
    };
    AxisHelper.prototype.calculateNumberOfDays = function (date, axis, start, rect) {
        var oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
        var oneMinute = 60 * 1000;
        var firstDate;
        var secondDate;
        var labels = axis.labelValue;
        var position;
        var interval = (axis.orientation === 'Horizontal' ? rect.width : rect.height) / axis.axisLabelSize;
        var givenDate = new Date(Number(date));
        var days = 0;
        for (var index = 0; index < axis.axisLabelSize; index++) {
            firstDate = new Date(Number(labels[index]));
            secondDate = axis.isInversed ? new Date(Number(labels[index - 1])) : new Date(Number(labels[index + 1]));
            if (index === (axis.isInversed ? 0 : axis.axisLabelSize - 1)) {
                secondDate = new Date(Number(labels[index]));
                if (axis.intervalType === 'Hours') {
                    secondDate = new Date(Number(secondDate.setHours(secondDate.getHours() + 1)));
                }
                else if ((axis.intervalType === 'Minutes')) {
                    secondDate = new Date(Number(secondDate.setMinutes(secondDate.getMinutes() + 1)));
                }
                else if ((axis.intervalType === 'Days')) {
                    secondDate = new Date(Number(secondDate.setDate(secondDate.getDate() + 1)));
                }
                else {
                    var numberOfDays = axis.intervalType === 'Months' ?
                        new Date(secondDate.getFullYear(), secondDate.getMonth() + 1, 0).getDate() :
                        secondDate.getFullYear() % 4 === 0 ? 366 : 365;
                    secondDate = new Date(Number(secondDate.setDate(secondDate.getDate() + numberOfDays)));
                }
            }
            if (Number(firstDate) <= date && Number(secondDate) >= date) {
                if (axis.intervalType === 'Minutes' || axis.intervalType === 'Hours') {
                    var totalMinutes = Math.round(Math.abs((firstDate.getTime() - secondDate.getTime()) / (oneMinute)));
                    var minutesInHours = Math.abs((firstDate.getTime() - givenDate.getTime()) / (oneMinute));
                    days = (interval / totalMinutes) * minutesInHours;
                    index = axis.isInversed ? axis.axisLabelSize - 1 - index : index;
                    position = index * interval + days;
                    break;
                }
                else {
                    var numberOfDays = Math.round(Math.abs((firstDate.getTime() - secondDate.getTime()) / (oneDay)));
                    // eslint-disable-next-line
                    start ? givenDate.getDate() : givenDate.setDate(givenDate.getDate() + 1);
                    if (numberOfDays !== 0) {
                        days = (interval / numberOfDays) * (Math.abs((firstDate.getTime() - givenDate.getTime()) / (oneDay)));
                    }
                    index = axis.isInversed ? axis.axisLabelSize - 1 - index : index;
                    position = index * interval + days;
                    break;
                }
            }
        }
        return position;
    };
    /**
     * @returns {void}
     * @private
     */
    AxisHelper.prototype.destroy = function () {
        this.drawSvgCanvas = null;
        this.element = null;
        this.htmlObject = null;
        this.initialClipRect = null;
        this.heatMap = null;
    };
    return AxisHelper;
}());
export { AxisHelper };
