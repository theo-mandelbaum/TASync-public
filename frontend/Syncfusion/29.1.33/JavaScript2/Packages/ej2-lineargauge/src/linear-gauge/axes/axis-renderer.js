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
import { isNullOrUndefined, remove, animationMode } from '@syncfusion/ej2-base';
import { Animations } from './animation';
import { Size, valueToCoefficient, PathOption, textElement, getElement, textTrim } from '../utils/helper';
import { TextOption, RectOption, calculateShapes, calculateTextPosition, getBox, getPathToRect, getRangeColor } from '../utils/helper';
/**
 * To render the axis elements.
 *
 * @private
 */
var AxisRenderer = /** @class */ (function (_super) {
    __extends(AxisRenderer, _super);
    function AxisRenderer(gauge) {
        return _super.call(this, gauge) || this;
    }
    AxisRenderer.prototype.renderAxes = function () {
        var _this = this;
        var axis;
        var major;
        var minor;
        this.axisElements = [];
        var gaugeAxesG = this.gauge.svgObject.querySelector('#' + this.gauge.element.id + '_Axis_Collections');
        if (gaugeAxesG) {
            remove(gaugeAxesG);
        }
        this.axisObject = this.gauge.renderer.createGroup({
            id: this.gauge.element.id + '_Axis_Collections',
            transform: 'translate( 0, 0 )'
        });
        this.gauge.splitUpCount = 0;
        for (var i = 0; i < this.gauge.axes.length; i++) {
            axis = this.gauge.axes[i];
            major = axis.majorTicks;
            minor = axis.minorTicks;
            this.htmlObject = this.gauge.renderer.createGroup({ id: this.gauge.element.id + '_Axis_Group_' + i });
            if (this.gauge.allowLoadingAnimation) {
                if (this.gauge.splitUpCount === 0 && (axis.line.width > 0 || (axis.majorTicks.height > 0 && axis.majorTicks.width > 0) ||
                    (axis.minorTicks.height > 0 && axis.minorTicks.width > 0) || this.gauge.container.width > 0 || (axis.ranges.length > 0
                    && !(axis.ranges.length === 1 && axis.ranges[0].start === axis.ranges[0].end && axis.ranges[0].start === 0)))) {
                    this.gauge.splitUpCount++;
                }
                if (this.gauge.splitUpCount === 0 || this.gauge.splitUpCount === 1) {
                    this.gauge.splitUpCount = axis.pointers.length > 0 ? this.gauge.splitUpCount + 1 : this.gauge.splitUpCount;
                }
            }
            this.drawAxisLine(axis, this.htmlObject, i);
            this.drawRanges(axis, this.htmlObject, i);
            this.drawTicks(axis, major, this.htmlObject, 'MajorTicks', axis.majorTickBounds, i);
            this.drawTicks(axis, minor, this.htmlObject, 'MinorTicks', axis.minorTickBounds, i);
            this.drawAxisLabels(axis, this.htmlObject, i);
            this.drawPointers(axis, this.htmlObject, i);
            this.axisElements.push(this.htmlObject);
        }
        this.axisElements.forEach(function (axisElement) {
            _this.axisObject.appendChild(axisElement);
        });
        this.gauge.svgObject.appendChild(this.axisObject);
        if (this.gauge.nearSizes.length !== this.gauge.farSizes.length && this.gauge.axes.length > 1) {
            this.axisAlign(this.gauge.axes);
        }
    };
    AxisRenderer.prototype.axisAlign = function (axes) {
        var nearAxisWidth = 0;
        var farAxisWidth = 0;
        var tranX;
        var transY;
        if (this.gauge.orientation === 'Vertical') {
            axes.forEach(function (axis) {
                if (!axis.opposedPosition) {
                    nearAxisWidth += axis.bounds.width;
                }
                else {
                    farAxisWidth += axis.bounds.width;
                }
            });
            nearAxisWidth += this.gauge.containerBounds.width / 2;
            farAxisWidth += this.gauge.containerBounds.width / 2;
            tranX = (nearAxisWidth / 2) - (farAxisWidth / 2);
            this.axisObject.setAttribute('transform', 'translate(' + tranX + ',0)');
            if (!(isNullOrUndefined(this.gauge.containerObject))) {
                this.gauge.containerObject.setAttribute('transform', 'translate(' + tranX + ',0)');
            }
        }
        else {
            axes.forEach(function (axis) {
                if (!axis.opposedPosition) {
                    nearAxisWidth += axis.bounds.height;
                }
                else {
                    farAxisWidth += axis.bounds.height;
                }
            });
            nearAxisWidth += (this.gauge.containerBounds.height / 2);
            farAxisWidth += (this.gauge.containerBounds.height / 2);
            transY = (nearAxisWidth / 2) - (farAxisWidth / 2);
            this.axisObject.setAttribute('transform', 'translate(0,' + transY + ')');
            if (!(isNullOrUndefined(this.gauge.containerObject))) {
                this.gauge.containerObject.setAttribute('transform', 'translate(0,' + transY + ')');
            }
        }
    };
    AxisRenderer.prototype.drawAxisLine = function (axis, axisObject, axisIndex) {
        var options;
        var rect = axis.lineBounds;
        var path = '';
        var color = axis.line.color || this.gauge.themeStyle.lineColor;
        if (axis.line.width > 0) {
            path = 'M' + rect.x + ' ' + rect.y + ' L ' + (this.gauge.orientation === 'Vertical' ? rect.x : rect.x + rect.width) +
                ' ' + (this.gauge.orientation === 'Vertical' ? rect.y + rect.height : rect.y) + 'z';
            options = new PathOption(this.gauge.element.id + '_AxisLine_' + axisIndex, color, axis.line.width, color, 1, axis.line.dashArray, path);
            var axisElement = this.gauge.renderer.drawPath(options);
            if (this.gauge.allowLoadingAnimation) {
                axisElement.classList.add(this.gauge.element.id + 'animation');
            }
            axisObject.appendChild(axisElement);
        }
    };
    AxisRenderer.prototype.drawTicks = function (axis, ticks, axisObject, tickID, tickBounds, axisIndex) {
        var tickPath = '';
        var pointY;
        var pointX;
        var range = axis.visibleRange;
        var line = axis.lineBounds;
        var majorTickColor = axis.majorTicks.color || this.gauge.themeStyle.majorTickColor;
        var minorTickColor = axis.minorTicks.color || this.gauge.themeStyle.minorTickColor;
        var tickColor = (tickID === 'MajorTicks') ? majorTickColor : minorTickColor;
        var interval = ((tickID === 'MajorTicks') ? axis.majorInterval : axis.minorInterval);
        var tickHeight = (axis.minimum !== axis.maximum) ? ticks.height : 0;
        // let position: string = (tickID === 'MajorTicks') ? axis.majorTicks.position : axis.minorTicks.position;
        for (var i = range.min; (i <= range.max && interval > 0); i += interval) {
            if ((tickID === 'MajorTicks') || (tickID === 'MinorTicks')) {
                if (this.gauge.orientation === 'Vertical') {
                    // pointX =  position === "Inside" ? tickBounds.x : tickBounds.x + ticks.height;
                    pointX = tickBounds.x;
                    pointY = (valueToCoefficient(i, axis, this.gauge.orientation, range) * line.height) + line.y;
                    tickPath = tickPath.concat('M' + pointX + ' ' + pointY + ' ' + 'L' + (pointX + tickHeight) + ' ' + pointY + ' ');
                }
                else {
                    pointX = (valueToCoefficient(i, axis, this.gauge.orientation, range) * line.width) + line.x;
                    // pointY = position === "Inside" ? tickBounds.y : (tickBounds.y + ticks.height);
                    pointY = tickBounds.y;
                    tickPath = tickPath.concat('M' + pointX + ' ' + pointY + ' ' + 'L' + pointX + ' ' + (pointY + tickHeight) + ' ');
                }
            }
        }
        var options = new PathOption(this.gauge.element.id + '_' + tickID + 'Line_' + axisIndex, tickColor, ticks.width, tickColor, 1, null, tickPath);
        var tickElement = this.gauge.renderer.drawPath(options);
        if (this.gauge.allowLoadingAnimation) {
            tickElement.classList.add(this.gauge.element.id + 'animation');
        }
        axisObject.appendChild(tickElement);
    };
    AxisRenderer.prototype.drawAxisLabels = function (axis, axisObject, axisIndex) {
        /* eslint-disable max-len */
        var options;
        var pointX;
        var pointY;
        var rect = axis.lineBounds;
        var bounds = axis.labelBounds;
        var tick = axis.majorTickBounds;
        var labelSize;
        var range = axis.visibleRange;
        var anchor;
        var baseline;
        var padding = 5;
        var fontColor = this.gauge.themeStyle.labelColor;
        var labelColor;
        var offset = axis.labelStyle.offset;
        var labelLength = axis.visibleLabels.length - 1;
        var labelElement = this.gauge.renderer.createGroup({ id: this.gauge.element.id + '_AxisLabelsGroup_' + axisIndex });
        for (var i = 0; i < axis.visibleLabels.length; i++) {
            labelSize = axis.visibleLabels[i].size;
            labelColor = axis.labelStyle.useRangeColor ? getRangeColor(axis.visibleLabels[i].value, axis.ranges) : null;
            labelColor = isNullOrUndefined(labelColor) ? (axis.labelStyle.font.color || fontColor) : labelColor;
            if (this.gauge.orientation === 'Vertical') {
                pointY = (valueToCoefficient(axis.visibleLabels[i].value, axis, this.gauge.orientation, range) * rect.height) + rect.y;
                pointX = axis.labelStyle.position === 'Auto' ? (!axis.opposedPosition ? (tick.x - labelSize.width - padding) + offset : bounds.x) : bounds.x;
                pointY += (labelSize.height / 4);
                axis.visibleLabels[i].x = pointX;
                axis.visibleLabels[i].y = pointY;
            }
            else {
                if ((i === 0 || i === labelLength) && this.gauge.edgeLabelPlacement !== 'None') {
                    if (this.gauge.edgeLabelPlacement === 'Shift') {
                        pointX = i === 0 ? (valueToCoefficient(axis.visibleLabels[i].value, axis, this.gauge.orientation, range) * rect.width) + rect.x + (!axis.isInversed ? (axis.visibleLabels[i].size.width / 2) : (-axis.visibleLabels[i].size.width / 2))
                            : (valueToCoefficient(axis.visibleLabels[i].value, axis, this.gauge.orientation, range) * rect.width) + rect.x - (!axis.isInversed ? (axis.visibleLabels[i].size.width / 2) : (-axis.visibleLabels[i].size.width / 2));
                        if (this.gauge.allowMargin) {
                            if (i === labelLength) {
                                if (!axis.isInversed && (pointX - (axis.visibleLabels[i].size.width / 2)) < (axis.visibleLabels[i - 1].x + (axis.visibleLabels[i - 1].size.width / 2))) {
                                    pointX += (axis.visibleLabels[i].size.width / 2);
                                }
                                else if (axis.isInversed && (pointX + (axis.visibleLabels[i].size.width / 2)) > (axis.visibleLabels[i - 1].x - (axis.visibleLabels[i - 1].size.width / 2))) {
                                    pointX -= (axis.visibleLabels[i].size.width / 2);
                                }
                            }
                        }
                    }
                    else if (this.gauge.edgeLabelPlacement === 'Trim') {
                        pointX = (valueToCoefficient(axis.visibleLabels[i].value, axis, this.gauge.orientation, range) * rect.width) + rect.x;
                        if (i === labelLength) {
                            if (!this.gauge.allowMargin) {
                                if (!axis.isInversed && this.gauge.margin.right <= 10) {
                                    var maxWidth = axis.visibleLabels[i].size.width * 0.75;
                                    axis.visibleLabels[i].text = textTrim(maxWidth, axis.visibleLabels[i].text, axis.labelStyle.font);
                                }
                                else if (axis.isInversed && (pointX + (axis.visibleLabels[i].size.width / 2)) > (axis.visibleLabels[i - 1].x - (axis.visibleLabels[i - 1].size.width / 2))) {
                                    var maxWidth = axis.visibleLabels[i].size.width - ((pointX + (axis.visibleLabels[i].size.width / 2)) - (axis.visibleLabels[i - 1].x - (axis.visibleLabels[i - 1].size.width / 2)) + 2);
                                    axis.visibleLabels[i].text = textTrim(maxWidth, axis.visibleLabels[i].text, axis.labelStyle.font);
                                }
                            }
                            else {
                                if (axis.isInversed && (pointX + (axis.visibleLabels[i].size.width / 2)) > (axis.visibleLabels[i - 1].x - (axis.visibleLabels[i - 1].size.width / 2))) {
                                    var width = axis.visibleLabels[i].size.width - ((pointX + (axis.visibleLabels[i].size.width / 2)) - (axis.visibleLabels[i - 1].x - (axis.visibleLabels[i - 1].size.width / 2)) + 2);
                                    axis.visibleLabels[i].text = textTrim(width, axis.visibleLabels[i].text, axis.labelStyle.font);
                                }
                                else if (!axis.isInversed && (pointX - (axis.visibleLabels[i].size.width / 2)) < (axis.visibleLabels[i - 1].x + (axis.visibleLabels[i - 1].size.width / 2))) {
                                    var width = axis.visibleLabels[i].size.width - ((axis.visibleLabels[i - 1].x + (axis.visibleLabels[i - 1].size.width / 2)) - (pointX - (axis.visibleLabels[i].size.width / 2)) + 2);
                                    axis.visibleLabels[i].text = textTrim(width, axis.visibleLabels[i].text, axis.labelStyle.font);
                                }
                            }
                        }
                    }
                    else if (this.gauge.edgeLabelPlacement === 'Auto') {
                        if (!this.gauge.allowMargin) {
                            pointX = i === labelLength ? (valueToCoefficient(axis.visibleLabels[i].value, axis, this.gauge.orientation, range) * rect.width) + rect.x - (!axis.isInversed ? (axis.visibleLabels[i].size.width / 2) : (-axis.visibleLabels[i].size.width / 2)) :
                                (valueToCoefficient(axis.visibleLabels[i].value, axis, this.gauge.orientation, range) * rect.width) + rect.x + (!axis.isInversed ? (axis.visibleLabels[i].size.width / 2) : (-axis.visibleLabels[i].size.width / 2));
                            if (i === labelLength) {
                                if (!axis.isInversed && (pointX - (axis.visibleLabels[i].size.width / 2)) < (axis.visibleLabels[i - 1].x + (axis.visibleLabels[i - 1].size.width / 2))) {
                                    pointX += (axis.visibleLabels[i].size.width / 2);
                                    var maxWidth = axis.visibleLabels[i].size.width * 0.75;
                                    axis.visibleLabels[i].text = textTrim(maxWidth, axis.visibleLabels[i].text, axis.labelStyle.font);
                                }
                                else if (axis.isInversed && (pointX + (axis.visibleLabels[i].size.width / 2)) > (axis.visibleLabels[i - 1].x - (axis.visibleLabels[i - 1].size.width / 2))) {
                                    pointX -= (axis.visibleLabels[i].size.width / 2);
                                    var widthValue = axis.visibleLabels[i].size.width - ((pointX + (axis.visibleLabels[i].size.width / 2)) - (axis.visibleLabels[i - 1].x - (axis.visibleLabels[i - 1].size.width / 2)) + 2);
                                    axis.visibleLabels[i].text = textTrim(widthValue, axis.visibleLabels[i].text, axis.labelStyle.font);
                                }
                            }
                        }
                        else {
                            pointX = (valueToCoefficient(axis.visibleLabels[i].value, axis, this.gauge.orientation, range) * rect.width) + rect.x;
                            if (i === labelLength && axis.isInversed && (pointX + (axis.visibleLabels[i].size.width / 2)) > (axis.visibleLabels[i - 1].x - (axis.visibleLabels[i - 1].size.width / 2))) {
                                var labelWidth = axis.visibleLabels[i].size.width - ((pointX + (axis.visibleLabels[i].size.width / 2)) - (axis.visibleLabels[i - 1].x - (axis.visibleLabels[i - 1].size.width / 2)) + 2);
                                axis.visibleLabels[i].text = textTrim(labelWidth, axis.visibleLabels[i].text, axis.labelStyle.font);
                            }
                        }
                    }
                    pointY = bounds.y;
                    axis.visibleLabels[i].x = pointX;
                    axis.visibleLabels[i].y = pointY;
                    anchor = 'middle';
                    baseline = '';
                }
                else {
                    pointX = (valueToCoefficient(axis.visibleLabels[i].value, axis, this.gauge.orientation, range) * rect.width) + rect.x;
                    pointY = bounds.y;
                    anchor = 'middle';
                    baseline = '';
                    axis.visibleLabels[i].x = pointX;
                    axis.visibleLabels[i].y = pointY;
                }
            }
            var style = {
                size: axis.labelStyle.font.size,
                color: axis.labelStyle.font.color,
                fontFamily: axis.labelStyle.font.fontFamily,
                fontWeight: axis.labelStyle.font.fontWeight,
                fontStyle: axis.labelStyle.font.fontStyle,
                opacity: axis.labelStyle.font.opacity
            };
            style.fontFamily = style.fontFamily || this.gauge.themeStyle.labelFontFamily;
            style.fontStyle = style.fontStyle || this.gauge.themeStyle.labelStyle;
            style.fontWeight = style.fontWeight || this.gauge.themeStyle.labelWeight;
            options = new TextOption(this.gauge.element.id + '_Axis_' + axisIndex + '_Label_' + i, pointX, pointY, anchor, axis.visibleLabels[i].text, null, baseline);
            var axisLabelsElement = textElement(options, style, labelColor, null, labelElement);
            axisLabelsElement.setAttribute('aria-label', axis.visibleLabels[i].text);
            axisLabelsElement.setAttribute('role', 'region');
        }
        if (this.gauge.allowLoadingAnimation) {
            labelElement.classList.add(this.gauge.element.id + 'animation');
        }
        axisObject.appendChild(labelElement);
    };
    AxisRenderer.prototype.drawPointers = function (axis, axisObject, axisIndex) {
        var pointer;
        var clipId;
        var pointerClipRectGroup;
        var pointesGroup = this.gauge.renderer.createGroup({ id: this.gauge.element.id + '_PointersGroup_' + axisIndex });
        for (var i = 0; i < axis.pointers.length; i++) {
            pointer = axis.pointers[i];
            clipId = 'url(#' + this.gauge.element.id + '_AxisIndex_' + axisIndex + '_' + '_' + pointer.type + 'ClipRect_' + i + ')';
            if (!(isNullOrUndefined(pointer.bounds))) {
                pointerClipRectGroup = this.gauge.renderer.createGroup({
                    'id': this.gauge.element.id + '_AxisIndex_' + axisIndex + '_' + pointer.type + 'PointerGroup_' + i
                });
                if (isNullOrUndefined(pointer.startValue)) {
                    pointer.startValue = axis.visibleRange.min;
                }
                if ((animationMode === 'Enable' || pointer.animationDuration > 0 || this.gauge.allowLoadingAnimation) && (!this.gauge.isPropertyChange || pointer['isPointerAnimation']) && !this.gauge.gaugeResized) {
                    pointer.startValue = !this.gauge.isPropertyChange ? axis.minimum : pointer.startValue;
                    if (this.gauge.container.type === 'Thermometer' && pointer.startValue === 0) {
                        pointerClipRectGroup.setAttribute('clip-path', clipId);
                    }
                }
                this['draw' + pointer.type + 'Pointer'](axis, axisIndex, pointer, i, pointerClipRectGroup);
                pointesGroup.appendChild(pointerClipRectGroup);
            }
        }
        this.gauge.gradientCount = 0;
        axisObject.appendChild(pointesGroup);
    };
    AxisRenderer.prototype.drawMarkerPointer = function (axis, axisIndex, pointer, pointerIndex, parentElement) {
        var options;
        var textOptions;
        var style = {};
        var pointerID = this.gauge.element.id + '_AxisIndex_' + axisIndex + '_' + pointer.type + 'Pointer' + '_' + pointerIndex;
        var transform = 'translate( 0, 0 )';
        var x;
        var y;
        var pointerElement;
        var gradientMarkerColor;
        if (this.gauge.gradientModule) {
            gradientMarkerColor = this.gauge.gradientModule.getGradientColorString(pointer);
        }
        if (getElement(pointerID) && getElement(pointerID).childElementCount > 0) {
            remove(getElement(pointerID));
        }
        var pointerColor = pointer.color || this.gauge.themeStyle.pointerColor;
        var shapeBasedOnPosition = pointer.markerType;
        if (!isNullOrUndefined(pointer.position) && (pointer.markerType === 'InvertedTriangle' ||
            pointer.markerType === 'Triangle')) {
            shapeBasedOnPosition = (((pointer.position === 'Outside' && !axis.opposedPosition) ||
                (pointer.position === 'Inside' && axis.opposedPosition) || pointer.position === 'Cross')
                && pointer.markerType === 'Triangle' ? 'InvertedTriangle' :
                (((pointer.position === 'Inside' && !axis.opposedPosition) || (pointer.position === 'Outside' && axis.opposedPosition)) &&
                    pointer.markerType === 'InvertedTriangle' ? 'Triangle' : pointer.markerType));
        }
        options = new PathOption(pointerID, (gradientMarkerColor) ? gradientMarkerColor : pointerColor, pointer.border.width, pointer.border.color, pointer.opacity, pointer.border.dashArray, null, transform);
        options = calculateShapes(pointer.bounds, shapeBasedOnPosition, new Size(pointer.width, pointer.height), pointer.imageUrl, options, this.gauge.orientation, axis, pointer);
        if (pointer.markerType === 'Text') {
            textOptions = new TextOption(pointerID, x, y, 'start', pointer.text, null, 'auto');
            textOptions = calculateTextPosition(pointer.bounds, shapeBasedOnPosition, textOptions, this.gauge.orientation, axis, pointer);
            style = {
                size: pointer.textStyle.size,
                fontFamily: pointer.textStyle.fontFamily || this.gauge.themeStyle.labelFontFamily,
                fontWeight: pointer.textStyle.fontWeight,
                fontStyle: pointer.textStyle.fontStyle
            };
        }
        // eslint-disable-next-line prefer-const
        pointerElement = ((pointer.markerType === 'Circle' ? this.gauge.renderer.drawCircle(options)
            : (pointer.markerType === 'Image') ? this.gauge.renderer.drawImage(options) : (pointer.markerType === 'Text') && !isNullOrUndefined(pointer.text) ? textElement(textOptions, style, (gradientMarkerColor) ? gradientMarkerColor : pointerColor, pointer.opacity, parentElement) :
                this.gauge.renderer.drawPath(options)));
        if (this.gauge.allowLoadingAnimation) {
            pointerElement.style.visibility = 'hidden';
        }
        parentElement.appendChild(pointerElement);
        if ((((pointer.animationDuration > 0 || animationMode === 'Enable') && (!this.gauge.allowLoadingAnimation || this.gauge.isPropertyChange)) && (!this.gauge.isPropertyChange || pointer['isPointerAnimation']) && pointer['startValue'] !== pointer.currentValue) && !this.gauge.isPointerAnimationInProgress) {
            pointer.startValue = !this.gauge.isPropertyChange ? axis.minimum : pointer.startValue;
            pointer.animationComplete = false;
            this.performMarkerAnimation(pointerElement, axis, pointer);
        }
        if (!this.gauge.allowLoadingAnimation && pointer.animationDuration === 0) {
            pointer.startValue = pointer.currentValue;
        }
        pointerElement.setAttribute('aria-label', pointer.description || 'Pointer:' + Number(pointer.currentValue).toString());
        pointerElement.setAttribute('role', 'region');
    };
    AxisRenderer.prototype.drawBarPointer = function (axis, axisIndex, pointer, pointerIndex, parentElement) {
        var rectOptions;
        var clipRectElement;
        var pointerElement;
        var path = '';
        var options;
        var box;
        var size = new Size(this.gauge.availableSize.width, this.gauge.availableSize.height);
        var pointerID = this.gauge.element.id + '_AxisIndex_' + axisIndex + '_' + pointer.type + 'Pointer' + '_' + pointerIndex;
        var gradientBarColor;
        if (this.gauge.gradientModule) {
            gradientBarColor = this.gauge.gradientModule.getGradientColorString(pointer);
        }
        if (getElement(pointerID) && getElement(pointerID).childElementCount > 0) {
            remove(getElement(pointerID));
        }
        if (this.gauge.container.type === 'Normal' || this.gauge.container.width === 0) {
            rectOptions = new RectOption(pointerID, (gradientBarColor) ?
                gradientBarColor : pointer.color || this.gauge.themeStyle.pointerColor, pointer.border, pointer.opacity, pointer.bounds);
            box = pointer.bounds;
            pointerElement = this.gauge.renderer.drawRectangle(rectOptions);
        }
        else {
            path = pointer.value > axis.minimum || this.gauge.container.type === 'Thermometer' ? getBox(pointer.bounds, this.gauge.container.type, this.gauge.orientation, new Size(pointer.bounds.width, pointer.bounds.height), 'bar', this.gauge.container.width, axis, pointer.roundedCornerRadius) : '';
            options = new PathOption(pointerID, (gradientBarColor) ? gradientBarColor : pointer.color || this.gauge.themeStyle.pointerColor, pointer.border.width, pointer.border.color, pointer.opacity, pointer.border.dashArray, path);
            pointerElement = this.gauge.renderer.drawPath(options);
            box = getPathToRect(pointerElement.cloneNode(true), size, this.gauge.element);
        }
        if (getElement(pointerID) && getElement(pointerID).childElementCount > 0) {
            var element = getElement(pointerID).firstElementChild;
            if (this.gauge.container.type === 'Normal') {
                element.setAttribute('x', rectOptions.x + '');
                element.setAttribute('y', rectOptions.y + '');
                element.setAttribute('width', rectOptions.width + '');
                element.setAttribute('height', rectOptions.height + '');
            }
            else {
                element.setAttribute('d', options.d);
            }
        }
        else {
            parentElement.appendChild(pointerElement);
        }
        pointerElement.setAttribute('aria-label', pointer.description || 'Pointer:' + Number(pointer.currentValue).toString());
        pointerElement.setAttribute('role', 'region');
        if (this.gauge.allowLoadingAnimation) {
            pointerElement.style.visibility = 'hidden';
        }
        if (((pointer.animationDuration > 0 || this.gauge.allowLoadingAnimation || animationMode === 'Enable') && (!this.gauge.isPropertyChange || pointer['isPointerAnimation']) && pointer['startValue'] !== pointer.currentValue) && !this.gauge.isPointerAnimationInProgress) {
            pointer.startValue = !this.gauge.isPropertyChange ? axis.minimum : pointer.startValue;
            if (this.gauge.container.type === 'Thermometer' && pointer.startValue === 0 && this.gauge.container.width > 0) {
                clipRectElement = this.gauge.renderer.drawClipPath(new RectOption(this.gauge.element.id + '_AxisIndex_' + axisIndex + '_' + '_' + pointer.type + 'ClipRect_' + pointerIndex, 'transparent', { width: 1, color: 'Gray' }, 1, box));
                parentElement.appendChild(clipRectElement);
            }
            if (!this.gauge.allowLoadingAnimation || this.gauge.isPropertyChange) {
                pointer.isPointerAnimation = false;
                this.performBarAnimation(pointerElement, axis, pointer);
            }
        }
        if (pointer.animationDuration === 0) {
            pointer.startValue = pointer.currentValue;
        }
    };
    /**
     * @param {Axis} axis - Specifies the axis
     * @param {number} axisIndex - Specifies the axis index
     * @returns {void}
     * @private
     */
    AxisRenderer.prototype.pointerAnimation = function (axis, axisIndex) {
        if ((!this.gauge.isPointerAnimationInProgress && this.gauge.allowLoadingAnimation)) {
            this.gauge.isPointerAnimationInProgress = true;
            for (var i = 0; i < axis.pointers.length; i++) {
                var pointer = axis.pointers[i];
                if (pointer.type === 'Bar') {
                    var barPointerGroup = getElement(this.gauge.element.id + '_AxisIndex_' + axisIndex + '_' + pointer.type + 'Pointer_' + i);
                    if (barPointerGroup) {
                        this.performBarAnimation(barPointerGroup, axis, pointer);
                    }
                }
                else {
                    var markerPointerGroup = getElement(this.gauge.element.id + '_AxisIndex_' + axisIndex + '_' + pointer.type + 'Pointer_' + i);
                    if (markerPointerGroup) {
                        this.performMarkerAnimation(markerPointerGroup, axis, pointer);
                    }
                }
            }
        }
    };
    AxisRenderer.prototype.drawRanges = function (axis, axisObject, axisIndex) {
        var range;
        var options;
        var rangeElement = this.gauge.renderer.createGroup({ id: this.gauge.element.id + '_RangesGroup_' + axisIndex });
        if (this.gauge.allowLoadingAnimation) {
            rangeElement.classList.add(this.gauge.element.id + 'animation');
        }
        for (var j = 0; j < axis.ranges.length; j++) {
            range = axis.ranges[j];
            if (!(isNullOrUndefined(range.path))) {
                options = new PathOption(this.gauge.element.id + '_AxisIndex_' + axisIndex + '_Range_' + j, range.interior, (range.start !== range.end) ? range.border.width : 0, range.border.color, 1, range.border.dashArray, range.path);
                rangeElement.appendChild(this.gauge.renderer.drawPath(options));
            }
        }
        axisObject.appendChild(rangeElement);
    };
    AxisRenderer.prototype.updateTextPointer = function (pointerId, pointer, axis) {
        var x;
        var y;
        var textOptions = new TextOption(pointerId, x, y, 'start', pointer.text, null, 'auto');
        textOptions = calculateTextPosition(pointer.bounds, 'Text', textOptions, this.gauge.orientation, axis, pointer);
        var textElement = document.getElementById(pointerId);
        textElement.setAttribute('x', textOptions.x.toString());
        textElement.setAttribute('y', textOptions.y.toString());
        textElement.textContent = pointer.text;
    };
    /**
     * @private
     */
    AxisRenderer.prototype.destroy = function () {
        this.htmlObject = null;
        this.axisObject = null;
        this.axisElements = [];
        this.gauge = null;
    };
    return AxisRenderer;
}(Animations));
export { AxisRenderer };
