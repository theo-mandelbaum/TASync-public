import { measureText } from '@syncfusion/ej2-svg-base';
import { rotateTextSize } from '../../common/utils/helper';
import { isNullOrUndefined } from '@syncfusion/ej2-base';
import { valueToCoefficients } from './chart3dRender';
/**
 * The WallRenderer class provides methods to update the 3D wall of the chart.
 */
var WallRenderer = /** @class */ (function () {
    function WallRenderer() {
    }
    /**
     * Updates the 3D wall of the chart based on the chart area type.
     *
     * @param {Chart3D} chart - The Chart3D instance to update the 3D wall for.
     * @returns {void}
     */
    WallRenderer.prototype.update3DWall = function (chart) {
        this.updateBackWall(chart);
        for (var i = 0; i < chart.axisCollections.length; i++) {
            var axis = chart.axisCollections[i];
            var opposedPosition = axis.opposedPosition || axis.isAxisOpposedPosition;
            if (axis.orientation.toLowerCase() === 'vertical') {
                if (!opposedPosition) {
                    this.updateLeftWall(chart);
                }
                else {
                    this.updateRightWall(chart);
                }
            }
            else {
                if (!opposedPosition) {
                    this.updateBottomWall(chart);
                }
                else {
                    this.updateTopWall(chart);
                }
            }
        }
    };
    /**
     * Updates the top wall of the 3D chart based on the specified chart and axis.
     *
     * @param {Chart3D} chart - The Chart3D instance for which the top wall is updated.
     * @returns {void}
     */
    WallRenderer.prototype.updateTopWall = function (chart) {
        var offset = 0;
        var areaBounds = chart.chartAxisLayoutPanel.seriesClipRect;
        var y = areaBounds.y;
        if (chart.wallSize < y) {
            offset = y - chart.wallSize;
        }
        else {
            offset = -(chart.wallSize - y);
        }
        var topLeftFrontVector = chart.vector.vector3D(areaBounds.x + areaBounds.width, -chart.depth, y - 0.1);
        var bottomRightBackVector = chart.vector.vector3D(areaBounds.x, -0.1, offset);
        var topSideWallPlans = chart.polygon.createBox(topLeftFrontVector, bottomRightBackVector, chart, 0, chart.wallColor || chart.themeStyle.leftWallColor, chart.wallColor || chart.themeStyle.leftWallColor, 0, chart.theme.indexOf('Fluent2') > -1 ? 0.3 : chart.theme.indexOf('Bootstrap5') > -1 ? 0.1 : 0.5, false, 'top-wall-brush', chart.chart3D);
        for (var i = 0; i < topSideWallPlans.length; i++) {
            chart.polygon.transform(chart.matrixObj.tilt(Math.PI / 2), topSideWallPlans[i]);
        }
    };
    /**
     * Updates the right wall of the 3D chart based on the specified chart and axis.
     *
     * @param {Chart3D} chart - The Chart3D instance for which the right wall is updated.
     * @returns {void}
     */
    WallRenderer.prototype.updateRightWall = function (chart) {
        var areaBounds = chart.chartAxisLayoutPanel.seriesClipRect;
        var x = areaBounds.x + areaBounds.width;
        var rightRect = { left: -chart.depth, top: areaBounds.y, bottom: areaBounds.height + areaBounds.y, right: 0 };
        var topLeftFrontVector = chart.vector.vector3D(rightRect.left, rightRect.top, x + 1.5);
        var bottomRightBackVector = chart.vector.vector3D(rightRect.right, rightRect.bottom, x + chart.wallSize);
        var rightSideWallPlans = chart.polygon.createBox(topLeftFrontVector, bottomRightBackVector, chart, 0, chart.wallColor || chart.themeStyle.leftWallColor, chart.wallColor || chart.themeStyle.leftWallColor, 0, chart.theme.indexOf('Fluent2') > -1 ? 0.3 : chart.theme.indexOf('Bootstrap5') > -1 ? 0.1 : 0.5, false, 'right-wall-brush', chart.chart3D);
        for (var i = 0; i < rightSideWallPlans.length; i++) {
            chart.polygon.transform(chart.matrixObj.turn(-Math.PI / 2), rightSideWallPlans[i]);
        }
    };
    /**
     * Updates the back wall of the 3D chart based on the specified chart.
     *
     * @param {Chart3D} chart - The Chart3D instance for which the back wall is updated.
     * @returns {void}
     */
    WallRenderer.prototype.updateBackWall = function (chart) {
        var areaBounds = chart.chartAxisLayoutPanel.seriesClipRect;
        var topLeftFrontVector = chart.vector.vector3D(areaBounds.x, areaBounds.y, chart.depth === 0 ? 1.5 : chart.depth + chart.wallSize);
        var bottomRightBackVector = chart.vector.vector3D((areaBounds.x + areaBounds.width), areaBounds.y + areaBounds.height, chart.depth === 0 ? 1.5 : chart.depth);
        chart.polygon.createBox(topLeftFrontVector, bottomRightBackVector, chart, 0, chart.wallColor || chart.themeStyle.backWallColor, chart.wallColor || chart.themeStyle.backWallColor, 0, chart.theme.indexOf('Fluent2') > -1 ? 0.3 : chart.theme.indexOf('Bootstrap5') > -1 ? 0.1 : 0.25, false, 'back-wall-brush', chart.chart3D);
    };
    /**
     * Updates the left wall of the 3D chart based on the specified chart.
     *
     * @param {Chart3D} chart - The Chart3D instance for which the left wall is updated.
     * @returns {void}
     */
    WallRenderer.prototype.updateLeftWall = function (chart) {
        var areaBounds = chart.chartAxisLayoutPanel.seriesClipRect;
        var leftRect = { left: -chart.depth, top: areaBounds.y, bottom: areaBounds.height + areaBounds.y, right: 0 };
        var offset = areaBounds.x;
        var topLeftFrontVector = chart.vector.vector3D(leftRect.left, leftRect.top, offset - 0.1);
        var bottomRightBackVector = chart.vector.vector3D(leftRect.right, leftRect.bottom, offset - chart.wallSize);
        var leftSideWallPlans = chart.polygon.createBox(topLeftFrontVector, bottomRightBackVector, chart, 0, chart.wallColor || chart.themeStyle.leftWallColor, chart.wallColor || chart.themeStyle.leftWallColor, 0, chart.theme.indexOf('Fluent2') > -1 ? 0.3 : chart.theme.indexOf('Bootstrap5') > -1 ? 0.1 : 0.5, false, 'left-wall-brush', chart.chart3D);
        for (var i = 0; i < leftSideWallPlans.length; i++) {
            chart.polygon.transform(chart.matrixObj.turn(-Math.PI / 2), leftSideWallPlans[i]);
        }
    };
    /**
     * Updates the bottom wall of the 3D chart based on the specified chart.
     *
     * @param {Chart3D} chart - The Chart3D instance for which the bottom wall is updated.
     * @returns {void}
     */
    WallRenderer.prototype.updateBottomWall = function (chart) {
        var areaBounds = chart.chartAxisLayoutPanel.seriesClipRect;
        var y = areaBounds.y + areaBounds.height;
        var topLeftFrontVector = chart.vector.vector3D((areaBounds.x + areaBounds.width), -chart.depth, chart.wallSize + y);
        var bottomRightBackVector = chart.vector.vector3D(areaBounds.x, -0.1, y + 1);
        var bottomSideWallPlans = chart.polygon.createBox(bottomRightBackVector, topLeftFrontVector, chart, 0, chart.wallColor || chart.themeStyle.leftWallColor, chart.wallColor || chart.themeStyle.leftWallColor, 0, chart.theme.indexOf('Fluent2') > -1 ? 0.3 : chart.theme.indexOf('Bootstrap5') > -1 ? 0.1 : 0.5, false, 'bottom-wall-brush', chart.chart3D);
        for (var i = 0; i < bottomSideWallPlans.length; i++) {
            chart.polygon.transform(chart.matrixObj.tilt(Math.PI / 2), bottomSideWallPlans[i]);
        }
    };
    return WallRenderer;
}());
export { WallRenderer };
/**
 * 3D chart axis render/
 */
var AxisRenderer = /** @class */ (function () {
    function AxisRenderer() {
    }
    /**
     * Draws the 3D axes at the specified index for the given axis and chart.
     *
     * @param {number} index - The index of the axis.
     * @param {Chart3DAxis} axis - The Chart3DAxis instance to draw.
     * @param {Chart3D} chart - The Chart3D instance for which the axes are drawn.
     * @returns {void}
     */
    AxisRenderer.prototype.drawAxes = function (index, axis, chart) {
        if (axis.majorGridLines.width) {
            this.drawGridLines3D(axis, chart, index);
        }
        if (axis.visible && axis.internalVisibility && axis.majorTickLines.width) {
            this.renderTicks3D(axis, axis.majorTickLines.height, axis.majorTickLines.width, chart, index);
        }
        if (axis.visible && axis.internalVisibility) {
            this.drawAxisLabel(axis, chart, index);
            this.drawAxisTitle(axis, chart, index);
        }
    };
    /**
     * Draws the title for the specified 3D axis on the given chart.
     *
     * @param {Chart3DAxis} axis - The Chart3DAxis instance for which the title is drawn.
     * @param {Chart3D} chart - The Chart3D instance on which the title is drawn.
     * @param {number} index - The index of the axis.
     * @returns {void}
     */
    AxisRenderer.prototype.drawAxisTitle = function (axis, chart, index) {
        if (axis.title) {
            var font = {
                size: axis.titleStyle.size || chart.themeStyle.axisTitleFont.size,
                fontWeight: axis.titleStyle.fontWeight || chart.themeStyle.axisTitleFont.fontWeight,
                fontStyle: axis.titleStyle.fontStyle || chart.themeStyle.axisTitleFont.fontStyle,
                fontFamily: axis.titleStyle.fontFamily || chart.themeStyle.axisTitleFont.fontFamily,
                color: axis.titleStyle.color,
                opacity: axis.titleStyle.opacity
            };
            var opposedPosition = axis.opposedPosition || axis.isAxisOpposedPosition;
            var size = { width: chart.availableSize.width, height: chart.availableSize.height };
            var transform = chart.transform3D.transform3D(size);
            transform.viewingArea = size;
            transform.rotation = 0;
            transform.tilt = 0;
            transform.depth = 100;
            transform.perspectiveAngle = 90;
            chart.transform3D.transform(transform);
            var orientation_1 = axis.orientation.toLowerCase();
            var elementSpacing = 10;
            if (orientation_1 === 'horizontal') {
                var padding = 0;
                var titlesize = (measureText(axis.title, axis.titleStyle, chart.themeStyle.axisTitleFont).height / 2);
                if (axis.titleRotation) {
                    padding = axis.titlePadding + (elementSpacing) + axis.labelPadding + (axis.titleSize.height / 2);
                }
                else {
                    padding = axis.titlePadding + titlesize + axis.labelPadding + elementSpacing;
                }
                var xtitleLocation = axis.maxLabelSize.height + padding;
                var data = {
                    text: axis.title,
                    location: {
                        x: (axis.rect.width) / 2,
                        y: (xtitleLocation + axis.majorTickLines.height + chart.wallSize)
                    }
                };
                var x1 = data.location.x + axis.rect.x;
                var y1 = (opposedPosition) ? (axis.rect.y - data.location.y) : (data.location.y + axis.rect.y);
                var element = { width: 0, height: 0, angle: axis.titleRotation ? axis.titleRotation : 0, label: data, textAnchor: 'middle', tag: 'text', font: font, id: chart.element.id + '-svg-axis-title-' + index, child: chart.chart3D };
                element.font.color = element.font.color ? element.font.color : chart.themeStyle.axisTitle;
                element.font.fontFamily = element.font.fontFamily ? element.font.fontFamily : chart.themeStyle.axisTitleFont.fontFamily;
                chart.graphics.addVisual(chart.polygon.createTextElement(chart.vector.vector3D(x1, y1, 0), element, 10, 10), chart);
            }
            else {
                var titleSize = measureText(axis.title, axis.titleStyle, chart.themeStyle.axisTitleFont);
                var padding = 0;
                if (axis.titleRotation) {
                    padding = axis.labelPadding + axis.titlePadding + axis.titleSize.width / 2;
                }
                else {
                    padding = axis.titlePadding + axis.labelPadding;
                }
                var x1 = (opposedPosition) ? axis.rect.x + ((elementSpacing) + axis.maxLabelSize.width +
                    axis.majorTickLines.height + chart.wallSize + padding) : axis.rect.x - ((elementSpacing) +
                    axis.maxLabelSize.width + axis.majorTickLines.height + chart.wallSize + padding);
                var angle = (axis.titleRotation == null ? (opposedPosition ? 90 : -90) : axis.titleRotation) % 360;
                var data = {
                    text: axis.title,
                    location: {
                        x: titleSize.width / 2,
                        y: 0
                    }
                };
                var y1 = data.location.y + (axis.rect.y + axis.rect.height) + (((axis.rect.height) / 2) * -1);
                var element = { width: titleSize.width, height: titleSize.height, angle: angle, label: data, textAnchor: 'middle', tag: 'text', font: font, id: chart.element.id + '-svg-axis-title-' + index, child: chart.chart3D };
                element.font.color = element.font.color ? element.font.color : chart.themeStyle.axisTitle;
                element.font.fontFamily = element.font.fontFamily ? element.font.fontFamily : chart.themeStyle.axisTitleFont.fontFamily;
                chart.graphics.addVisual(chart.polygon.createTextElement(chart.vector.vector3D(x1, y1, 0), element, 10, 10), chart);
            }
        }
    };
    /**
     * Trims the specified text to fit within the maximum width, applying the provided labelStyle and font settings.
     *
     * @param {number} maxWidth - The maximum width to fit the text within.
     * @param {string} text - The text to be trimmed.
     * @param {Chart3DTextFontModel} labelStyle - The label style settings to be applied.
     * @param {Chart3DTextFontModel} font - The font settings to be applied.
     * @returns {string} - The trimmed text.
     */
    AxisRenderer.prototype.textTrim = function (maxWidth, text, labelStyle, font) {
        var textLength = text.length;
        var trimmedSize;
        var label;
        var textSize = measureText(text, labelStyle, font);
        if (textSize.width > maxWidth) {
            for (var k = textLength - 1; k >= 0; --k) {
                label = text.substring(0, k) + '...';
                trimmedSize = measureText(label, labelStyle, font);
                if (trimmedSize.width <= maxWidth) {
                    return label;
                }
            }
            return '';
        }
        else {
            return text;
        }
    };
    /**
     * Distributes labels into multiple rows based on the specified length, currentX, currentLabel, axis, and font settings.
     *
     * @param {number} length - The length of the labels.
     * @param {number} currentX - The current X-coordinate.
     * @param {Visible3DLabels} currentLabel - The current label settings.
     * @param {Chart3DAxis} axis - The Chart3DAxis instance.
     * @param {Chart3DTextFontModel} font - The font settings to be applied.
     * @returns {void}
     */
    AxisRenderer.prototype.multipleRows = function (length, currentX, currentLabel, axis, font) {
        var label;
        var pointX;
        var labelSize;
        var store = [];
        var isMultiRows;
        for (var i = length - 1; i >= 0; i--) {
            label = axis.visibleLabels[i];
            labelSize = measureText(label.text, axis.labelStyle, font);
            pointX = valueToCoefficients(i, axis) * axis.rect.width + axis.rect.x;
            isMultiRows = currentX < (pointX + labelSize.width / 2);
            if (isMultiRows) {
                label.index = label.index ? label.index : 0;
                store.push(label.index);
                currentLabel.index = (currentLabel.index > label.index) ? currentLabel.index : label.index + 1;
            }
            else {
                currentLabel.index = store.indexOf(label.index) > -1 ? currentLabel.index : label.index;
            }
        }
    };
    /**
     * Draws the labels for the specified 3D axis on the given chart.
     *
     * @param {Chart3DAxis} axis - The Chart3DAxis instance for which the labels are drawn.
     * @param {Chart3D} chart - The Chart3D instance on which the labels are drawn.
     * @param {number} index - The index of the axis.
     * @returns {void}
     */
    AxisRenderer.prototype.drawAxisLabel = function (axis, chart, index) {
        var labels = [];
        var angleValue;
        var labelsCount = axis.visibleLabels.length;
        var areaBounds = chart.chartAxisLayoutPanel.seriesClipRect;
        var opposedPosition = axis.opposedPosition || axis.isAxisOpposedPosition;
        var elementSpacing = axis.angle ? 5 : 10;
        var y = areaBounds.y + (!opposedPosition && areaBounds.height);
        var x = areaBounds.x + (opposedPosition && areaBounds.width);
        for (var i = 0; i < labelsCount; i++) {
            if (!isNullOrUndefined(axis.visibleLabels[i].text)) {
                var x1 = 0;
                var y1 = 0;
                var pointX = void 0;
                axis.visibleLabels[i].originalText = axis.visibleLabels[i].text;
                var textAnchor = void 0;
                var textSize = measureText(axis.visibleLabels[i].text, axis.labelStyle, chart.themeStyle.axisLabelFont);
                var value = (axis.visibleLabels[i].value - axis.visibleRange.min) / axis.visibleRange.delta;
                value = axis.isInversed || axis.isAxisInverse ? 1 - value : value;
                value = isNaN(value) ? 0 : value;
                if (axis.orientation.toLowerCase() === 'horizontal') {
                    x1 = Math.round(axis.rect.width * value) + areaBounds.x + axis.plotOffset;
                    y1 = opposedPosition ? (y - chart.wallSize - axis.majorTickLines.height - axis.labelPadding - elementSpacing / 2) :
                        y + chart.wallSize + axis.majorTickLines.height + elementSpacing + axis.labelPadding;
                    textAnchor = 'middle';
                }
                else {
                    y1 = Math.round(axis.plotOffset + axis.rect.y + (textSize.height / 4) + (axis.rect.height * (1 - value)));
                    var padding = 0;
                    if (axis.labelRotation === 90 || axis.labelRotation === -90 ||
                        axis.labelRotation === 270 || axis.labelRotation === -270) {
                        padding = elementSpacing * 2;
                    }
                    else {
                        padding = elementSpacing;
                    }
                    x1 = opposedPosition ? (axis.rect.x + axis.majorTickLines.height + padding + axis.labelPadding) :
                        (x - chart.wallSize - axis.majorTickLines.height - padding + axis.labelPadding);
                    textAnchor = opposedPosition ? (axis.isRTLEnabled ? 'end' : 'start') : (axis.isRTLEnabled ? 'start' : 'end');
                }
                labels.push({ x: x1, y: y1, size: textSize });
                var maxWidth = axis.rect.width / axis.visibleLabels.length - 5;
                var label = labels[i];
                if (((label.x > axis.rect.x && i === 0) ||
                    (label.x + label.size.width / 2 > axis.rect.x + axis.rect.width && i === axis.visibleLabels.length - 1)) &&
                    axis.labelIntersectAction !== 'Trim' && axis.labelIntersectAction.indexOf('wrap') < 0) {
                    if (axis.edgeLabelPlacement === 'Hide') {
                        continue;
                    }
                    else if (axis.edgeLabelPlacement === 'Shift') {
                        if (i === 0) {
                            label.x = x1 = axis.rect.x + label.size.width / 2;
                        }
                        else if (i === axis.visibleLabels.length - 1) {
                            label.x = x1 = axis.rect.x + axis.rect.width - label.size.width / 2;
                        }
                    }
                }
                if (axis.orientation.toLowerCase() === 'horizontal') {
                    if (axis.labelRotation) {
                        angleValue = axis.labelRotation;
                        var rotatedSize = rotateTextSize(axis.labelStyle, axis.visibleLabels[i].text, angleValue, chart, chart.themeStyle.axisLabelFont);
                        y1 += rotatedSize.height / 2;
                    }
                    else {
                        if (axis.labelIntersectAction === 'Trim') {
                            axis.visibleLabels[i].text = this.textTrim(maxWidth, axis.visibleLabels[i].text, axis.labelStyle, chart.themeStyle.axisLabelFont);
                        }
                        else if (axis.angle && (axis.labelIntersectAction === 'Rotate45' || axis.labelIntersectAction === 'Rotate90')) {
                            var rotatedSize = rotateTextSize(axis.labelStyle, axis.visibleLabels[i].text, axis.angle, chart, chart.themeStyle.axisLabelFont);
                            y1 += rotatedSize.height / 2;
                        }
                        else if (axis.labelIntersectAction === 'MultipleRows') {
                            pointX = label.x;
                            pointX -= textSize.width / 2;
                            this.multipleRows(i, pointX, axis.visibleLabels[i], axis, chart.themeStyle.axisLabelFont);
                            y1 = axis.visibleLabels[i].index ?
                                y1 + axis.visibleLabels[i].index * (textSize.height + 5) : y1;
                        }
                        else if (axis.labelIntersectAction === 'Hide') {
                            var isAxisLabelHidden = false;
                            for (var j = 0; j < i; j++) {
                                if (labels[j].x + (labels[j].size.width / 2) >=
                                    labels[i].x - (labels[i].size.width / 2)) {
                                    isAxisLabelHidden = true;
                                    break;
                                }
                            }
                            if (isAxisLabelHidden) {
                                continue;
                            }
                        }
                    }
                }
                var font = {
                    size: axis.visibleLabels[i].labelStyle.size,
                    fontWeight: axis.visibleLabels[i].labelStyle.fontWeight,
                    fontStyle: axis.visibleLabels[i].labelStyle.fontStyle,
                    fontFamily: axis.visibleLabels[i].labelStyle.fontFamily,
                    color: axis.visibleLabels[i].labelStyle.color,
                    opacity: axis.visibleLabels[i].labelStyle.opacity
                };
                var element = {
                    width: textSize.width, height: textSize.height, label: axis.visibleLabels[i], textAnchor: textAnchor,
                    tag: 'text', font: font, id: chart.element.id + '-' + index + '-axis-label-' + i, child: chart.chart3D, angle: axis.angle
                };
                element.font.color = element.font.color ? element.font.color : chart.themeStyle.axisLabel;
                element.font.fontFamily = element.font.fontFamily ? element.font.fontFamily : chart.themeStyle.axisLabelFont.fontFamily;
                chart.graphics.addVisual(chart.polygon.createTextElement(chart.vector.vector3D(x1, y1, 0), element, 10, 10), chart);
            }
        }
    };
    /**
     * Renders the 3D ticks for the specified axis with the given size, width, and on the provided chart.
     *
     * @param {Chart3DAxis} axis - The Chart3DAxis instance for which the ticks are rendered.
     * @param {number} size - The size of the ticks.
     * @param {number} width - The width of the ticks.
     * @param {Chart3D} chart - The Chart3D instance on which the ticks are rendered.
     * @param {number} index - The index of the axis.
     * @returns {void}
     */
    AxisRenderer.prototype.renderTicks3D = function (axis, size, width, chart, index) {
        var labelsCount = axis.visibleLabels.length;
        var minorTicks;
        var areaBounds = chart.chartAxisLayoutPanel.seriesClipRect;
        var ticksbwtLabel = (axis.valueType === 'Category' && axis.labelPlacement === 'BetweenTicks') ? 0.5 : 0;
        labelsCount += (axis.valueType === 'Category' && labelsCount > 0 && axis.labelPlacement === 'BetweenTicks') ? 1 : 0;
        var labelValue;
        for (var i = 0; i < labelsCount; i++) {
            if (axis.valueType !== 'DateTimeCategory') {
                labelValue = axis.visibleLabels[i] ? axis.visibleLabels[i].value - ticksbwtLabel :
                    (axis.visibleLabels[i - 1].value + axis.visibleRange.interval) - ticksbwtLabel;
            }
            else {
                labelValue = axis.visibleLabels[i].value ? axis.visibleLabels[i].value - ticksbwtLabel
                    : axis.visibleRange.max;
            }
            var x1 = 0;
            var x2 = 0;
            var y1 = 0;
            var y2 = 0;
            var value = (labelValue - axis.visibleRange.min) / axis.visibleRange.delta;
            value = axis.isInversed || axis.isAxisInverse ? 1 - value : value;
            value = isNaN(value) ? 0 : value;
            if (axis.orientation.toLowerCase() === 'horizontal') {
                x2 = x1 = (Math.round(axis.rect.width * value)) + areaBounds.x + axis.plotOffset;
            }
            else {
                y1 = y2 = Math.round(axis.plotOffset + (axis.rect.height * (1 - value))) + axis.rect.y;
            }
            var position = this.calculatePosition3D(axis, size, width, x1, y1, x2, y2, chart);
            var line = { width: axis.majorTickLines.width, opacity: 1, stroke: axis.majorTickLines.color || chart.themeStyle.majorTickLine, child: chart.chart3D, tag: 'line', id: '' };
            line.id = chart.element.id + '-' + index + '-major-tick-lines-' + i;
            chart.graphics.addVisual(chart.polygon.createLine(line, position.x1, position.y1, position.x2, position.y2, 0), chart);
            if (axis.minorGridLines.width && axis.minorTicksPerInterval > 0 && i < labelsCount - 1) {
                minorTicks = axis.visibleRange.interval / (axis.minorTicksPerInterval + 1);
                for (var k = 0; k < axis.minorTicksPerInterval; k++) {
                    value = valueToCoefficients(axis.visibleLabels[i].value + (minorTicks * (k + 1)), axis);
                    value = isNaN(value) ? 0 : value;
                    if (axis.orientation.toLowerCase() === 'horizontal') {
                        x1 = x2 = Math.round(axis.plotOffset + (areaBounds.width * value) + areaBounds.x);
                    }
                    else {
                        y1 = y2 = Math.round(axis.plotOffset + ((areaBounds.height) * (1 - value))) + axis.rect.y;
                    }
                    var position_1 = this.calculatePosition3D(axis, size, width, x1, y1, x2, y2, chart);
                    var line_1 = { width: axis.minorTickLines.width, opacity: 0.6, stroke: axis.minorTickLines.color || chart.themeStyle.minorTickLine, child: chart.chart3D, tag: 'line', id: '' };
                    line_1.id = chart.element.id + '-' + index + '-minor-tick-lines-' + i + '-' + k;
                    chart.graphics.addVisual(chart.polygon.createLine(line_1, position_1.x1, position_1.y1, position_1.x2, position_1.y2, 0), chart);
                }
            }
        }
    };
    /**
     * Calculates the 3D position for ticks on the specified axis with the given tickSize, width, and chart dimensions.
     *
     * @param {Chart3DAxis} axis - The Chart3DAxis instance for which the tick position is calculated.
     * @param {number} tickSize - The size of the ticks.
     * @param {number} width - The width of the ticks.
     * @param {number} x1 - The X-coordinate of the starting point.
     * @param {number} y1 - The Y-coordinate of the starting point.
     * @param {number} x2 - The X-coordinate of the ending point.
     * @param {number} y2 - The Y-coordinate of the ending point.
     * @param {Chart3D} chart - The Chart3D instance.
     * @returns {Chart3DTickPosition} - The calculated 3D tick position.
     */
    AxisRenderer.prototype.calculatePosition3D = function (axis, tickSize, width, x1, y1, x2, y2, chart) {
        var isOpposed = axis.opposedPosition || axis.isAxisOpposedPosition;
        var areaBounds = chart.chartAxisLayoutPanel.seriesClipRect;
        var y = areaBounds.y + (!isOpposed && areaBounds.height);
        var x = areaBounds.x + (isOpposed && areaBounds.width);
        if (axis.orientation.toLowerCase() === 'horizontal') {
            y1 = 0;
            y2 = isOpposed ? tickSize : y1 + tickSize;
            var screenPositionTop = isOpposed ? y - chart.wallSize - tickSize : y + chart.wallSize - (tickSize / 2);
            y1 += screenPositionTop;
            y2 += screenPositionTop;
            x1 = x2 = x1;
        }
        else {
            x1 = 0;
            x2 = isOpposed ? x1 + tickSize : tickSize;
            var screenPositionLeft = isOpposed ? x + chart.wallSize : (x - chart.wallSize - tickSize);
            x1 += screenPositionLeft;
            x2 += screenPositionLeft;
            y1 = y2 = y1;
        }
        return { x1: x1, y1: y1, x2: x2, y2: y2 };
    };
    /**
     * Draws the 3D grid lines for the specified axis on the given chart.
     *
     * @param {Chart3DAxis} axis - The Chart3DAxis instance for which the grid lines are drawn.
     * @param {Chart3D} chart - The Chart3D instance on which the grid lines are drawn.
     * @param {number} index - The index of the axis.
     * @returns {void}
     */
    AxisRenderer.prototype.drawGridLines3D = function (axis, chart, index) {
        if (axis == null) {
            return;
        }
        var labelsCount = axis.visibleLabels.length;
        var minorTicks;
        var opposedPosition = axis.opposedPosition || axis.isAxisOpposedPosition;
        var orientation = axis.orientation;
        var x1;
        var x2;
        var y1;
        var y2;
        var labelValue;
        var ticksbwtLabel = (axis.valueType === 'Category' && axis.labelPlacement === 'BetweenTicks') ? 0.5 : 0;
        labelsCount += (axis.valueType === 'Category' && labelsCount > 0 && axis.labelPlacement === 'BetweenTicks') ? 1 : 0;
        var areaBounds = chart.chartAxisLayoutPanel.seriesClipRect;
        if (orientation.toLowerCase() === 'horizontal') {
            var i = void 0;
            for (i = 0; i < labelsCount; i++) {
                if (axis.valueType !== 'DateTimeCategory') {
                    labelValue = axis.visibleLabels[i] ? axis.visibleLabels[i].value - ticksbwtLabel :
                        (axis.visibleLabels[i - 1].value + axis.visibleRange.interval) - ticksbwtLabel;
                }
                else {
                    labelValue = axis.visibleLabels[i].value ? axis.visibleLabels[i].value - ticksbwtLabel
                        : axis.visibleRange.max;
                }
                var value = valueToCoefficients(labelValue, axis);
                value = isNaN(value) ? 0 : value;
                x2 = x1 = (Math.round(axis.rect.width * value)) + areaBounds.x + axis.plotOffset;
                y1 = areaBounds.y;
                y2 = areaBounds.y + areaBounds.height;
                var depth = chart.depth > 2 ? chart.depth - 2 : 1;
                var bottom = areaBounds.y + (!opposedPosition && areaBounds.height);
                var line = { opacity: 1, width: axis.majorGridLines.width, stroke: axis.majorGridLines.color || chart.themeStyle.majorGridLine, child: chart.chart3D, tag: 'line', id: '' };
                line.id = chart.element.id + '-' + index + '-grid-lines-' + i;
                chart.graphics.addVisual(chart.polygon.createLine(line, x1, y1, x2, y2, depth), chart);
                var parallelLine = { opacity: line.opacity, width: line.width, stroke: line.stroke, child: line.child, tag: line.tag, id: '' };
                parallelLine.id = line.id + '-parallel';
                parallelLine.id = chart.element.id + '-' + index + '-parallel-grid-lines-' + i;
                var line3D = chart.polygon.createLine(parallelLine, x2, 0, x2, -depth, bottom);
                // To fold the gridline alone the wall(bottom)
                chart.polygon.transform(chart.matrixObj.tilt(Math.PI / 2), line3D);
                chart.graphics.addVisual(line3D, chart);
                if (axis.minorGridLines.width && axis.minorTicksPerInterval > 0 && i < labelsCount - 1) {
                    minorTicks = axis.visibleRange.interval / (axis.minorTicksPerInterval + 1);
                    for (var k = 0; k < axis.minorTicksPerInterval; k++) {
                        value = valueToCoefficients(axis.visibleLabels[i].value + (minorTicks * (k + 1)), axis);
                        value = isNaN(value) ? 0 : value;
                        x2 = x1 = (Math.round(areaBounds.width * value) + areaBounds.x);
                        y1 = areaBounds.y;
                        y2 = areaBounds.y + areaBounds.height;
                        var line_2 = { opacity: 0.6, width: axis.minorGridLines.width, stroke: axis.minorGridLines.color || chart.themeStyle.minorGridLine, child: chart.chart3D, tag: 'line', id: '' };
                        line_2.id = chart.element.id + '-' + index + '-minor-grid-lines-' + i + '-' + k;
                        chart.graphics.addVisual(chart.polygon.createLine(line_2, x1, y1, x2, y2, depth), chart);
                        var parallelLine_1 = { opacity: line_2.opacity, width: line_2.width, stroke: line_2.stroke, child: line_2.child, tag: line_2.tag, id: '' };
                        parallelLine_1.id = chart.element.id + '-' + index + '-parallel-minor-grid-lines-' + i + '-' + k;
                        var line3D_1 = chart.polygon.createLine(parallelLine_1, x2, 0, x2, -depth, bottom);
                        // To fold the gridline alone the wall(bottom)
                        chart.polygon.transform(chart.matrixObj.tilt(Math.PI / 2), line3D_1);
                        chart.graphics.addVisual(line3D_1, chart);
                    }
                }
            }
        }
        else {
            for (var i = 0; i < labelsCount; i++) {
                labelValue = axis.visibleLabels[i] ? axis.visibleLabels[i].value - ticksbwtLabel :
                    (axis.visibleLabels[i - 1].value + axis.visibleRange.interval) - ticksbwtLabel;
                var value = (labelValue - axis.visibleRange.min) / axis.visibleRange.delta;
                x1 = areaBounds.x;
                y1 = Math.round((axis.rect.height) * (1 - value)) + 0.5;
                y1 += axis.rect.y;
                x2 = x1 + areaBounds.width;
                y2 = y1;
                var depth = chart.depth > 2 ? chart.depth - 2 : 1;
                var line = { opacity: 1, width: axis.majorGridLines.width, stroke: axis.majorGridLines.color || chart.themeStyle.majorGridLine, axisName: axis.name, child: chart.chart3D, tag: 'line', id: '' };
                line.id = chart.element.id + '-' + index + '-grid-lines-' + i;
                chart.graphics.addVisual(chart.polygon.createLine(line, x1, y1, x2, y2, depth), chart);
                var depthD = areaBounds.x + (opposedPosition && areaBounds.width + 1);
                var sideLine = { opacity: line.opacity, width: line.width, stroke: line.stroke, child: line.child, tag: line.tag, id: '' };
                sideLine.id = chart.element.id + '-' + index + '-parallel-grid-lines-' + i;
                var line3D = chart.polygon.createLine(sideLine, -depth, y2, 0, y2, depthD);
                // To fold the gridline alone the wall(right of vertical)
                chart.polygon.transform(chart.matrixObj.turn(-Math.PI / 2), line3D);
                chart.graphics.addVisual(line3D, chart);
                if (axis.minorGridLines.width && axis.minorTicksPerInterval > 0 && i < labelsCount - 1) {
                    minorTicks = axis.visibleRange.interval / (axis.minorTicksPerInterval + 1);
                    for (var k = 0; k < axis.minorTicksPerInterval; k++) {
                        var value_1 = valueToCoefficients(axis.visibleLabels[i].value + (minorTicks * (k + 1)), axis);
                        x1 = areaBounds.x;
                        y1 = Math.round((axis.rect.height) * (1 - value_1)) + 0.5;
                        y1 += axis.rect.y;
                        x2 = x1 + areaBounds.width;
                        y2 = y1;
                        var line_3 = { opacity: 0.6, width: axis.minorGridLines.width, stroke: axis.minorGridLines.color || chart.themeStyle.minorGridLine, axisName: axis.name, child: chart.chart3D, tag: 'line', id: '' };
                        line_3.id = chart.element.id + '-' + index + '-minor-grid-lines-' + i + '-' + k;
                        chart.graphics.addVisual(chart.polygon.createLine(line_3, x1, y1, x2, y2, depth), chart);
                        var sideLine_1 = { opacity: line_3.opacity, width: line_3.width, stroke: line_3.stroke, child: line_3.child, tag: line_3.tag, id: '' };
                        sideLine_1.id = chart.element.id + '-' + index + '-parallel-minor-grid-lines-' + i + k;
                        var line3D_2 = chart.polygon.createLine(sideLine_1, -depth, y2, 0, y2, depthD);
                        // To fold the gridline alone the wall(right of vertical)
                        chart.polygon.transform(chart.matrixObj.turn(-Math.PI / 2), line3D_2);
                        chart.graphics.addVisual(line3D_2, chart);
                    }
                }
            }
        }
    };
    return AxisRenderer;
}());
export { AxisRenderer };
