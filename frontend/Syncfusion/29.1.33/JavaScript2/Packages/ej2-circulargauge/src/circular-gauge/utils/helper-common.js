/* eslint-disable max-len */
/**
 * Specifies Circular-Gauge Common Helper methods
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
import { compile as templateComplier, isNullOrUndefined, remove, createElement, merge } from '@syncfusion/ej2-base';
import { SvgRenderer } from '@syncfusion/ej2-svg-base';
/**
 * Function to measure the height and width of the text.
 *
 * @param  {string} text - Specifies the text.
 * @param  {FontModel} font - Specifies the font.
 * @returns {Size} - Returns the size of the text.
 * @private
 */
export function measureText(text, font) {
    var htmlObject = document.getElementById('gauge-measuretext');
    if (htmlObject === null) {
        htmlObject = createElement('text', { id: 'gauge-measuretext' });
        document.body.appendChild(htmlObject);
    }
    var style = 'position: absolute; visibility: hidden;' +
        ';left: 0px; top: -100px; white-space: nowrap;' + getFontStyle(font);
    htmlObject.innerText = text;
    htmlObject.style.cssText = style;
    return new Size(htmlObject.clientWidth, htmlObject.clientHeight);
}
/**
 * Function to find number from string
 *
 * @param {string} value - Specifies the value.
 * @param {number} maxDimension - Specifies the  maximum dimension.
 * @returns {number} - Returns the number.
 * @private
 */
export function toPixel(value, maxDimension) {
    return value.indexOf('%') !== -1 ? (maxDimension / 100) * parseInt(value, 10) : parseInt(value, 10);
}
/**
 * Function to get the style from FontModel.
 *
 * @param {FontModel} font - Specifies the font.
 * @returns {string} - Returns the string.
 * @private
 */
export function getFontStyle(font) {
    var style = '';
    style = 'font-size:' + font.size +
        '; font-style:' + font.fontStyle + '; font-weight:' + font.fontWeight +
        '; font-family:' + font.fontFamily + ';opacity:' + font.opacity +
        '; color:' + font.color + ';';
    return style;
}
/**
 * Function to create the text element.
 *
 * @param {TextOption} options - Specifies the options.
 * @param {FontModel} font - Specifies the font.
 * @param {string} color - Specifies the color.
 * @param {HTMLElement | Element} parent - Specifies the html element.
 * @param {string} styles - Specifies the style.
 * @returns {Element} - Returns the element.
 * @private
 */
export function textElement(options, font, color, parent, styles) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    var renderOptions = {};
    var renderer = new SvgRenderer('');
    var style = styles + ' font-size:' + font.size + '; font-style:' + font.fontStyle +
        ' ; font-weight:' + font.fontWeight + '; font-family:' + font.fontFamily + ';';
    renderOptions = {
        'id': options.id,
        'x': options.x,
        'y': options.y,
        'fill': color,
        'text-anchor': options.anchor,
        'transform': options.transform,
        'opacity': font.opacity,
        'dominant-baseline': options.baseLine,
        'style': style
    };
    var htmlObject = renderer.createText(renderOptions, options.text);
    parent.appendChild(htmlObject);
    return htmlObject;
}
/**
 * Function to append the path to the element.
 *
 * @param {PathOption} options - Specifies the options.
 * @param {Element} element - Specifies the element.
 * @param {CircularGauge} gauge - Specifies the gauge.
 * @param {string} functionName - Specifies the function name.
 * @returns {Element} - Returns the element.
 * @private
 */
export function appendPath(options, element, gauge, functionName) {
    functionName = functionName ? functionName : 'Path';
    var htmlObject = gauge.renderer['draw' + functionName](options);
    htmlObject.setAttribute('transform', options.transform);
    htmlObject.style.cssText = options.style;
    element.appendChild(htmlObject);
    return htmlObject;
}
/**
 * Function to check whether it's a complete circle for circular gauge.
 *
 * @param {number} startAngle - Specifies the startAngle.
 * @param {number} endAngle - Specifies the endAngle.
 * @returns {boolean} Returns the boolean value.
 * @private
 */
export function isCompleteAngle(startAngle, endAngle) {
    var totalAngle = endAngle - startAngle;
    totalAngle = totalAngle <= 0 ? (totalAngle + 360) : totalAngle;
    return Math.floor(totalAngle / 360) !== 0;
}
/**
 * Function to get the degree for circular gauge.
 *
 * @param {number} startAngle - Specifies the startAngle.
 * @param {number} endAngle - Specifies the endAngle.
 * @returns {number} - Returns the number.
 * @private
 */
export function getDegree(startAngle, endAngle) {
    var degree = endAngle - startAngle;
    return degree < 0 ? (degree + 360) : degree;
}
/**
 * Function to get the angle from value for circular gauge.
 *
 * @param {number} value - Specifies the value.
 * @param {number} maximumValue - Specifies the maximumValue.
 * @param {number} minimumValue - Specifies the minimumValue.
 * @param {number} startAngle - Specifies the startAngle.
 * @param {number} endAngle - Specifies the endAngle.
 * @param {boolean} isClockWise - Specifies the isClockWise.
 * @returns {number} - Returns the number.
 * @private
 */
export function getAngleFromValue(value, maximumValue, minimumValue, startAngle, endAngle, isClockWise) {
    var angle;
    endAngle -= isCompleteAngle(startAngle, endAngle) ? 0.0001 : 0;
    startAngle -= 90;
    endAngle -= 90;
    if (isClockWise) {
        angle = ((value - minimumValue) * (getDegree(startAngle, endAngle) / (maximumValue - minimumValue))) + startAngle;
    }
    else {
        angle = endAngle - ((value - minimumValue) * (getDegree(startAngle, endAngle) / (maximumValue - minimumValue)));
        angle = angle < 0 ? 360 + angle : angle;
    }
    angle = Math.round(angle) >= 360 ? (angle - 360) : Math.round(angle) < 0 ? (360 + angle) : angle;
    return angle;
}
/**
 * Function to get angle from location for circular gauge.
 *
 * @param {GaugeLocation} center - Specifies the center.
 * @param {GaugeLocation} point - Specifies the point.
 * @returns {number} - Returns the number.
 * @private
 */
export function getAngleFromLocation(center, point) {
    var angle = Math.atan2((point.y - center.y), (point.x - center.x));
    angle = Math.round((angle < 0 ? (6.283 + angle) : angle) * (180 / Math.PI)) - 270;
    angle += angle < 0 ? 360 : 0;
    return angle;
}
/**
 * Function to get the location from angle for circular gauge.
 *
 * @param {number} degree - Specifies the degree.
 * @param {number} radius - Specifies the radius.
 * @param {GaugeLocation} center - Specifies the center.
 * @returns {GaugeLocation} - Returns the gauge location.
 * @private
 */
export function getLocationFromAngle(degree, radius, center) {
    var radian = (degree * Math.PI) / 180;
    return new GaugeLocation(Math.cos(radian) * radius + center.x, Math.sin(radian) * radius + center.y);
}
/**
 * Function to get the path direction of the circular gauge.
 *
 * @param {GaugeLocation} center - Specifies the center.
 * @param {number} start - Specifies the start.
 * @param {number} end - Specifies the end.
 * @param {number} radius - Specifies the radius.
 * @param {number} startWidth - Specifies the startWidth.
 * @param {number} endWidth - Specifies the endWidth.
 * @param {Range} range - Specifies the range.
 * @param {Axis} axis - Specifies the axis.
 * @returns {string} - Returns the string.
 * @private
 */
export function getPathArc(center, start, end, radius, startWidth, endWidth, range, axis) {
    if (isNullOrUndefined(range) || (range.start !== range.end)) {
        end -= isCompleteAngle(start, end) ? 0.0001 : 0;
    }
    var degree = getDegree(start, end);
    var startRadius = !isNullOrUndefined(range) ? (range.position === 'Outside' && !range.isLinearCircularGradient
        ? radius + startWidth : range.position === 'Cross'
        && axis.direction === 'AntiClockWise' ? radius - (endWidth + startWidth) / 2 : radius - startWidth) : radius - startWidth;
    var endRadius = !isNullOrUndefined(range) ? (range.position === 'Outside'
        && !range.isLinearCircularGradient ? radius + endWidth : range.position === 'Cross' &&
        axis.direction === 'ClockWise' ? radius - (endWidth + startWidth) / 2 : radius - endWidth) : radius - endWidth;
    var arcRadius = !isNullOrUndefined(range) ? (range.position === 'Outside' && !range.isLinearCircularGradient
        ? radius + ((startWidth + endWidth) / 2) :
        range.position === 'Cross' ? (radius - ((startWidth + endWidth) / 4) - (axis.direction === 'ClockWise' ? startWidth : endWidth)
            / 2) : radius - ((startWidth + endWidth) / 2)) : radius - ((startWidth + endWidth) / 2);
    var insideArcRadius = !isNullOrUndefined(range) && range.position === 'Cross' ?
        radius + ((startWidth + endWidth) / 4)
            - (axis.direction === 'ClockWise' ? startWidth : endWidth) / 2 : radius;
    var insideEndRadius = !isNullOrUndefined(range) && range.position === 'Cross' && axis.direction === 'ClockWise' ?
        radius - ((startWidth - endWidth) / 2) : radius;
    var insideStartRadius = !isNullOrUndefined(range) && range.position === 'Cross' && axis.direction === 'AntiClockWise' ?
        radius + ((startWidth - endWidth) / 2) : radius;
    if (startWidth !== undefined && endWidth !== undefined) {
        insideEndRadius = range.position === 'Cross' ? (degree > 325 ? insideStartRadius : insideEndRadius) : insideEndRadius;
        return getRangePath(getLocationFromAngle(start, insideStartRadius, center), getLocationFromAngle(end, insideEndRadius, center), getLocationFromAngle(start, startRadius, center), getLocationFromAngle(end, endRadius, center), insideArcRadius, startRadius, endRadius, arcRadius, (degree < 180) ? 0 : 1, center, degree, range, axis);
    }
    else {
        return getCirclePath(getLocationFromAngle(start, radius, center), getLocationFromAngle(end, radius, center), radius, (degree < 180) ? 0 : 1);
    }
}
/**
 * Function to get the range path arc direction of the circular gauge.
 *
 * @param {GaugeLocation} start - Specifies the start.
 * @param {GaugeLocation} end - Specifies the end.
 * @param {number} radius - Specifies the radius.
 * @param {number} arcStartOne - Specifies the arcStartOne.
 * @param {number} arcEndOne - Specifies the arcEndOne.
 * @param {number} arcStartTwo - Specifies the arcStartTwo.
 * @param {number} arcEndTwo - Specifies the arcEndTwo.
 * @param {number} clockWise - Specifies the clockWise.
 * @param {GaugeLocation} innerStart - Specifies the innerStart.
 * @param {GaugeLocation} innerEnd - Specifies the innerEnd.
 * @param {GaugeLocation} pointPosition - Specifies the pointPosition.
 * @returns {string} - Returns the string.
 * @private
 */
export function arcPath(start, end, radius, arcStartOne, arcEndOne, arcStartTwo, arcEndTwo, clockWise, innerStart, innerEnd, pointPosition) {
    return 'M ' + start.x + ' ' + start.y + ' A ' + radius + ' ' + radius + ' 0 ' +
        clockWise + ' 1 ' + end.x + ' ' + end.y + ' L ' + innerEnd.x + ' ' + innerEnd.y +
        ' A ' + arcStartOne + ' ' + arcEndOne + ' 0 ' + clockWise + ' 0 ' + pointPosition.x
        + ' ' + pointPosition.y + ' ' + ' A ' + arcStartTwo + ' ' + arcEndTwo
        + ' 0 ' + clockWise + ' 0 ' + innerStart.x + ' ' + innerStart.y + ' Z ';
}
/**
 * Function to get the range path arc direction of the circular gauge.
 *
 * @param {GaugeLocation} start - Specifies the start.
 * @param {GaugeLocation} end - Specifies the end.
 * @param {number} radius - Specifies the radius.
 * @param {GaugeLocation} outerOldEnd - Specifies the outerOldEnd.
 * @param {GaugeLocation} innerOldEnd - Specifies the innerOldEnd.
 * @param {number} arcStartOne - Specifies the arcStartOne.
 * @param {number} arcEndOne - Specifies the arcEndOne.
 * @param {number} arcStartTwo - Specifies the arcStartTwo.
 * @param {number} arcEndTwo - Specifies the arcEndTwo.
 * @param {number} clockWise - Specifies the clockWise.
 * @param {GaugeLocation} innerStart - Specifies the innerStart.
 * @param {GaugeLocation} innerEnd - Specifies the innerEnd.
 * @param {GaugeLocation} innerOldStart - Specifies the innerOldStart.
 * @param {GaugeLocation} outerOldStart - Specifies the outerOldStart.
 * @param {GaugeLocation} pointPosition - Specifies the pointPosition.
 * @returns {string} - Returns the string.
 * @private
 */
export function arcRoundedPath(start, end, radius, outerOldEnd, innerOldEnd, arcStartOne, arcEndOne, arcStartTwo, arcEndTwo, clockWise, innerStart, innerEnd, innerOldStart, outerOldStart, pointPosition) {
    var roundedPath = 'M ' + start.x + ' ' + start.y + ' A ' + radius + ' ' + radius + ' 0 ' +
        clockWise + ' 1 ' + end.x + ' ' + end.y + ' C ' + outerOldEnd.x + ' ' + outerOldEnd.y + ' ' + innerOldEnd.x + ' ' +
        innerOldEnd.y + ' ' + innerEnd.x + ' ' + innerEnd.y;
    if (isNullOrUndefined(arcStartTwo) && isNullOrUndefined(arcEndTwo)) {
        return roundedPath + ' A ' + arcStartOne + ' ' + arcEndOne + ' 0 ' + clockWise + ' 0 ' + innerStart.x + ' '
            + innerStart.y + ' C ' + innerOldStart.x + ' ' + innerOldStart.y + ' ' + outerOldStart.x + ' ' +
            outerOldStart.y + ' ' + start.x + ' ' + start.y + ' Z';
    }
    else {
        return roundedPath + ' A ' + arcStartOne + ' ' + arcEndOne + ' 0 ' + clockWise + ' 0 '
            + pointPosition.x + ' ' + pointPosition.y + ' ' + ' A ' + arcStartTwo + ' ' + arcEndTwo + ' 0 ' + clockWise + ' 0 '
            + innerStart.x + ' ' + innerStart.y + ' C ' + innerOldStart.x + ' ' + innerOldStart.y + ' ' + outerOldStart.x + ' ' +
            outerOldStart.y + ' ' + start.x + ' ' + start.y + ' Z';
    }
}
/**
 * Function to get the range path direction for different start and end width of the circular gauge.
 *
 * @param {GaugeLocation} start - Specifies the options.
 * @param {GaugeLocation} end - Specifies the end.
 * @param {GaugeLocation} innerStart - Specifies the innerStart.
 * @param {GaugeLocation} innerEnd - Specifies the innerEnd.
 * @param {number} radius - Specifies the radius.
 * @param {number} startRadius - Specifies the startRadius.
 * @param {number} endRadius - Specifies the endRadius.
 * @param {number} clockWise - Specifies the clockWise.
 * @returns {string} - Returns the string.
 * @private
 */
export function arcWidthPath(start, end, innerStart, innerEnd, radius, startRadius, endRadius, clockWise) {
    return 'M ' + start.x + ' ' + start.y +
        ' A ' + radius + ' ' + radius + ' 0 ' +
        clockWise + ' 1 ' + end.x + ' ' + end.y +
        ' L ' + innerEnd.x + ' ' + innerEnd.y +
        ' A ' + endRadius + ' ' + startRadius + ' 0 ' +
        clockWise + ' 0 ' + innerStart.x + ' ' + innerStart.y + ' Z';
}
/**
 * Function to get the range path direction of the circular gauge.
 *
 * @param {GaugeLocation} start - Specifies the start values.
 * @param {GaugeLocation} end - Specifies the end values.
 * @param {GaugeLocation} innerStart - Specifies the innerStart values.
 * @param {GaugeLocation} innerEnd - Specifies the innerEnd values.
 * @param {number} radius - Specifies the radius value.
 * @param {number} startRadius - Specifies the startRadius value.
 * @param {number} endRadius - Specifies the endRadius value.
 * @param {number} arcRadius - Specifies the arcRadius value.
 * @param {number} clockWise - Specifies the clockWise value.
 * @param {GaugeLocation} center - Specifies the center value.
 * @param {number} degree - Specifies the degree value.
 * @param {Range} range - Specifies the range value.
 * @param {Axis} axis - Specifies the axis value.
 * @returns {string} - Returns the string value.
 * @private
 */
export function getRangePath(start, end, innerStart, innerEnd, radius, startRadius, endRadius, arcRadius, clockWise, center, degree, range, axis) {
    var startWidth = range.startWidth;
    var endWidth = range.endWidth;
    var widthDifference = Math.abs(startWidth - endWidth);
    var endArc;
    var startArc;
    if (startWidth > endWidth && degree <= 260 && range.position !== 'Cross' && range.position !== 'Outside') {
        endArc = (endRadius + (axis.direction === 'ClockWise' ? -(widthDifference / 2) : (widthDifference / 2)));
        startArc = (startRadius + (axis.direction === 'ClockWise' ? (widthDifference / 2) : -(widthDifference / 2)));
        return arcWidthPath(start, end, innerStart, innerEnd, radius, startArc, endArc, clockWise);
    }
    else if (endWidth > startWidth && degree <= 260 && range.position !== 'Cross' && range.position !== 'Outside') {
        endArc = (startRadius + (axis.direction === 'ClockWise' ? -(widthDifference / 2) : (widthDifference / 2)));
        startArc = (endRadius + (axis.direction === 'ClockWise' ? (widthDifference / 2) : -(widthDifference / 2)));
        return arcWidthPath(start, end, innerStart, innerEnd, radius, startArc, endArc, clockWise);
    }
    else if ((endWidth === startWidth) && (axis.startAngle !== 0 || axis.endAngle !== 0)) {
        return arcWidthPath(start, end, innerStart, innerEnd, radius, startRadius, endRadius, clockWise);
    }
    else if ((degree > 260) || (!range.isLinearCircularGradient && axis.startAngle === 0 && axis.endAngle === 0)) {
        if (range.roundedCornerRadius <= 0 && range.startWidth === range.endWidth) {
            return arcWidthPath(start, end, innerStart, innerEnd, radius, startRadius, endRadius, clockWise);
        }
        else {
            return arcWidthPathCalculation(start, end, innerStart, innerEnd, radius, startRadius, endRadius, arcRadius, clockWise, center, null, null, null, null, startWidth, endWidth, degree, range, axis);
        }
    }
    else {
        if (range.position === 'Cross' || range.position === 'Outside') {
            return arcWidthPath(start, end, innerStart, innerEnd, radius, arcRadius, arcRadius, clockWise);
        }
        else {
            return arcWidthPath(start, end, innerStart, innerEnd, radius, startRadius, endRadius, clockWise);
        }
    }
}
/**
 * Function to get start and end width range path calculation to the circular gauge.
 *
 * @param {GaugeLocation} start - Specifies the start value.
 * @param {GaugeLocation} end - Specifies the end value.
 * @param {GaugeLocation} innerStart - Specifies the innerStart value.
 * @param {GaugeLocation} innerEnd - Specifies the innerEnd value.
 * @param {number} radius - Specifies the radius value.
 * @param {number} startRadius - Specifies the startRadius value.
 * @param {number} endRadius - Specifies the endRadius value.
 * @param {number} arcRadius - Specifies the arcRadius value.
 * @param {number} clockWise - Specifies the clockWise value.
 * @param {GaugeLocation} center - Specifies the center value.
 * @param {GaugeLocation} outerOldEnd - Specifies the outerOldEnd value.
 * @param {GaugeLocation} innerOldEnd - Specifies the innerOldEnd value.
 * @param {GaugeLocation} outerOldStart - Specifies the outerOldStart value.
 * @param {GaugeLocation} innerOldStart - Specifies the innerOldStart value.
 * @param {number} startWidth - Specifies the startWidth value.
 * @param {number} endWidth - Specifies the endWidth value.
 * @param {number} degree - Specifies the degree value.
 * @param {Range} range - Specifies the range value.
 * @param {Axis} axis - Specifies the axis value.
 * @returns {string} - Returns the svg path.
 * @private
 */
export function arcWidthPathCalculation(start, end, innerStart, innerEnd, radius, startRadius, endRadius, arcRadius, clockWise, center, outerOldEnd, innerOldEnd, outerOldStart, innerOldStart, startWidth, endWidth, degree, range, axis) {
    if (!isNullOrUndefined(range)) {
        var arcStartOne = void 0;
        var arcEndOne = void 0;
        var widthDifference = Math.abs(startWidth - endWidth);
        var arcStartTwo = void 0;
        var arcEndTwo = void 0;
        var startValueToAngle = getAngleFromValue(((range.start + range.end) / 2), axis.maximum, axis.minimum, axis.startAngle, axis.endAngle, axis.direction === 'ClockWise');
        var pointPosition = (startWidth < ((endWidth))) ?
            getLocationFromAngle(startValueToAngle, endRadius, center) : getLocationFromAngle(startValueToAngle, startRadius, center);
        var endDistance = Math.sqrt((Math.pow((innerEnd.x - pointPosition.x), 2)) + (Math.pow((innerEnd.y - pointPosition.y), 2)));
        var endRadii = endDistance / 2;
        var centerStartDistance = Math.sqrt((Math.pow((center.x - innerStart.x), 2)) + (Math.pow((center.y - innerStart.y), 2)));
        var centerDistance = Math.sqrt((Math.pow((center.x - pointPosition.x), 2)) + (Math.pow((center.y - pointPosition.y), 2)));
        if (range.roundedCornerRadius <= 0) {
            widthDifference = widthDifference === 0 ? 1 : widthDifference;
            innerEnd.y = (range.position === 'Cross' && axis.direction === 'ClockWise') ? degree > 325 ?
                innerEnd.y - (widthDifference / 2) : innerEnd.y : innerEnd.y;
            var degreeValue = range.position === 'Cross' ? 330 : 325;
            if (((degreeValue <= degree && degree <= 360))) {
                arcStartTwo = (axis.direction === 'ClockWise' ? (centerDistance / 2)
                    : (degree >= 345 ? (startRadius - (widthDifference / 2) - (endWidth / 2))
                        : range.position === 'Cross' ? (startRadius + (widthDifference / 4) - (startWidth / 2))
                            : (startRadius - (widthDifference / 2) - (startWidth / 2))));
                arcEndTwo = (axis.direction === 'ClockWise' ? (centerStartDistance / 2)
                    : range.position === 'Cross' ?
                        (endRadius + (widthDifference / 4)) - (endWidth / 4) :
                        (range.position === 'Outside' && axis.direction === 'AntiClockWise') ? degree < 345 ?
                            (startRadius - (widthDifference) - (endWidth / 4))
                            : (startRadius - (widthDifference / 2))
                            : (endRadius + (widthDifference / 2)) - (endWidth / 2));
                return arcPath(start, end, radius, endRadii, endRadii, arcStartTwo, arcEndTwo, clockWise, innerStart, innerEnd, pointPosition);
            }
            else if ((degree > 260 && degree < 325) && range.position !== 'Cross' && range.position !== 'Outside') {
                var arcStart = (arcRadius - (widthDifference / 2));
                var arcEnd = (arcRadius - (widthDifference / 2));
                var angleValueDirection = axis.direction === 'ClockWise' ? degree >= 310 : degree < 345;
                if (degree < 310) {
                    return arcWidthPath(start, end, innerStart, innerEnd, radius, arcStart, arcEnd, clockWise);
                }
                else if (degree >= 310 || angleValueDirection) {
                    arcStart = (arcRadius - (widthDifference));
                    return arcWidthPath(start, end, innerStart, innerEnd, radius, arcEnd, arcStart, clockWise);
                }
                else {
                    return arcWidthPath(start, end, innerStart, innerEnd, radius, startRadius, endRadius, clockWise);
                }
            }
            else {
                if (range.position === 'Cross') {
                    var endRadiusValue = axis.direction === 'ClockWise' ? degree <= 300 && degree >= 260 ?
                        endRadius - (widthDifference / 2) - (startWidth / 4) : endRadius
                        - (widthDifference) - (startWidth / 2) : degree <= 300 && degree >= 260 ?
                        endRadius + (widthDifference / 4) - (startWidth / 4) :
                        endRadius + (widthDifference / 4) - (startWidth / 2);
                    var startRadiusValue = axis.direction === 'ClockWise' ? degree > 325 ? degree > 340 ? (startRadius - startWidth)
                        - (widthDifference / 4) : startRadius - (widthDifference / 4)
                        : startRadius : startRadius - (widthDifference / 4);
                    return arcWidthPath(start, end, innerStart, innerEnd, radius, startRadiusValue, endRadiusValue, clockWise);
                }
                else if (range.position === 'Outside') {
                    if (degree < 325 && degree > 285) {
                        var arcTwo = void 0;
                        var startGreater = startWidth / 2;
                        var endGreater = endWidth / 2;
                        var arcOne = arcTwo = arcRadius + (widthDifference / 2) + startGreater + endGreater;
                        innerEnd.y = axis.direction === 'ClockWise' && startWidth !== endWidth && startWidth > widthDifference ?
                            innerEnd.y - (widthDifference / 2) : innerEnd.y + startGreater;
                        return arcWidthPath(start, end, innerStart, innerEnd, radius, arcOne, arcTwo, clockWise);
                    }
                    else {
                        return arcWidthPath(start, end, innerStart, innerEnd, radius, arcRadius, arcRadius, clockWise);
                    }
                }
                else {
                    return arcWidthPath(start, end, innerStart, innerEnd, radius, startRadius, endRadius, clockWise);
                }
            }
        }
        else {
            var degreeAngle = axis.endAngle < 4 ? 356 : 360;
            clockWise = degree > degreeAngle ? 0 : clockWise;
            var degreeValueOne = axis.direction === 'ClockWise' ? 327 : 322;
            var degreeValueTwo = axis.direction === 'ClockWise' ? 328 : 325;
            if ((endWidth === startWidth) && (axis.startAngle !== 0 || axis.endAngle !== 0)) {
                return roundedArcWidthPathCalculation(start, end, innerStart, innerEnd, radius, startRadius, endRadius, clockWise, outerOldEnd, innerOldEnd, outerOldStart, innerOldStart);
            }
            else if ((degree <= degreeAngle && degree > degreeValueOne) && range.roundedCornerRadius > 0) {
                arcStartOne = axis.direction === 'ClockWise' ? degree < 334 && degree > 324 ? endRadii - (widthDifference / 2) :
                    endRadii - (widthDifference / 4) : endRadii;
                arcStartTwo = (centerDistance / 2);
                arcEndTwo = axis.direction === 'ClockWise' ? ((centerStartDistance / 2) + (widthDifference / 2)) :
                    (centerStartDistance / 2);
                return arcRoundedPath(start, end, radius, outerOldEnd, innerOldEnd, arcStartOne, endRadii, arcStartTwo, arcEndTwo, clockWise, innerStart, innerEnd, innerOldStart, outerOldStart, pointPosition);
            }
            else if (degree > 270 && degree < degreeValueTwo) {
                var startAddArc = endRadius + (widthDifference / 2) - (endWidth / 2);
                var startSubArc = endRadius - (widthDifference / 2) - (endWidth / 2);
                arcStartOne = (startRadius - (widthDifference / 2) - (startWidth / 2));
                arcEndOne = (axis.direction === 'ClockWise' ? startSubArc : startAddArc);
                return arcRoundedPath(start, end, radius, outerOldEnd, innerOldEnd, arcStartOne, arcEndOne, null, null, clockWise, innerStart, innerEnd, innerOldStart, outerOldStart, null);
            }
            else {
                return roundedArcWidthPathCalculation(start, end, innerStart, innerEnd, radius, startRadius, endRadius, clockWise, outerOldEnd, innerOldEnd, outerOldStart, innerOldStart);
            }
        }
    }
    else {
        return roundedArcWidthPathCalculation(start, end, innerStart, innerEnd, radius, startRadius, endRadius, clockWise, outerOldEnd, innerOldEnd, outerOldStart, innerOldStart);
    }
}
/**
 * Function to get start and end width range rounded path calculation to the circular gauge.
 *
 * @param {GaugeLocation} start - Specifies the start value.
 * @param {GaugeLocation} end - Specifies the end value.
 * @param {GaugeLocation} innerStart - Specifies the innerStart value.
 * @param {GaugeLocation} innerEnd - Specifies the innerEnd value.
 * @param {number} radius - Specifies the radius value.
 * @param {number} startRadius - Specifies the startRadius value.
 * @param {number} endRadius - Specifies the endRadius value.
 * @param {number} clockWise - Specifies the clockWise value.
 * @param {GaugeLocation} outerOldEnd - Specifies the outerOldEnd value.
 * @param {GaugeLocation} innerOldEnd - Specifies the innerOldEnd value.
 * @param {GaugeLocation} outerOldStart - Specifies the outerOldStart value.
 * @param {GaugeLocation} innerOldStart - Specifies the innerOldStart value.
 * @returns {string} - Returns the path value.
 * @private
 */
export function roundedArcWidthPathCalculation(start, end, innerStart, innerEnd, radius, startRadius, endRadius, clockWise, outerOldEnd, innerOldEnd, outerOldStart, innerOldStart) {
    return 'M ' + start.x + ' ' + start.y + ' A ' + radius + ' ' + radius + ' 0 ' +
        clockWise + ' 1 ' + end.x + ' ' + end.y + ' C ' + outerOldEnd.x + ' ' + outerOldEnd.y + ' ' + innerOldEnd.x + ' ' +
        innerOldEnd.y + ' ' + innerEnd.x + ' ' + innerEnd.y +
        ' A ' + endRadius + ' ' + startRadius + ' 0 ' +
        clockWise + ' 0 ' + innerStart.x + ' ' + innerStart.y +
        ' C ' + innerOldStart.x + ' ' + innerOldStart.y + ' ' + outerOldStart.x + ' ' +
        outerOldStart.y + ' ' + start.x + ' ' + start.y + ' Z';
}
/**
 * Function to get the rounded path direction of the circular gauge.
 *
 * @param {GaugeLocation} center - Specifies the center value.
 * @param {number} actualStart - Specifies the actualStart value.
 * @param {number} actualEnd - Specifies the actualEnd value.
 * @param {number} oldStart - Specifies the oldStart value.
 * @param {number} oldEnd - Specifies the oldEnd value.
 * @param {number} radius - Specifies the radius value.
 * @param {number} startWidth - Specifies the startWidth value.
 * @param {number} endWidth - Specifies the endWidth value.
 * @param {Range} range - Specifies the range value.
 * @param {Axis} axis - Specifies the axis value.
 * @returns {string} - Returns the path value.
 * @private
 */
export function getRoundedPathArc(center, actualStart, actualEnd, oldStart, oldEnd, radius, startWidth, endWidth, range, axis) {
    actualEnd -= isCompleteAngle(actualStart, actualEnd) ? 0.0001 : 0;
    var degree = getDegree(actualStart, actualEnd);
    var startRadius = radius - startWidth;
    var endRadius = radius - endWidth;
    var arcRadius = radius - ((startWidth + endWidth) / 2);
    return arcWidthPathCalculation(getLocationFromAngle(actualStart, radius, center), getLocationFromAngle(actualEnd, radius, center), getLocationFromAngle(actualStart, startRadius, center), getLocationFromAngle(actualEnd, endRadius, center), radius, arcRadius, arcRadius, arcRadius, (degree < 180) ? 0 : 1, center, getLocationFromAngle(oldEnd, radius, center), getLocationFromAngle(oldEnd, endRadius, center), getLocationFromAngle(oldStart, radius, center), getLocationFromAngle(oldStart, startRadius, center), startWidth, endWidth, degree, range, axis);
}
/**
 * Function to get the circular path direction of the circular gauge.
 *
 * @param {GaugeLocation} start - Specifies the start value.
 * @param {GaugeLocation} end - Specifies the end value.
 * @param {number} radius - Specifies the radius value.
 * @param {number} clockWise - Specifies the clockWise.
 * @returns {string} - Returns the path.
 * @private
 */
export function getCirclePath(start, end, radius, clockWise) {
    return 'M ' + start.x + ' ' + start.y + ' A ' + radius + ' ' +
        radius + ' 0 ' + clockWise + ' 1 ' + end.x + ' ' + end.y;
}
/**
 * Function to compile the template function for circular gauge.
 *
 * @param {string} template - Specifies the template.
 * @param {CircularGauge} gauge - Specifies the gauge instance.
 * @returns {Function} - Returns the template function.
 * @private
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getTemplateFunction(template, gauge) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    var templateFn = null;
    try {
        if (typeof template === 'function') {
            templateFn = templateComplier(template);
        }
        else if (isNaN(parseFloat(template)) && document.querySelectorAll(template).length) {
            if ((template.charAt(0) !== 'a' || template.charAt(0) !== 'A') && template.length !== 1) {
                templateFn = templateComplier(document.querySelector(template).innerHTML.trim());
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        }
        else if (gauge.isVue || gauge.isVue3) {
            templateFn = templateComplier(template);
        }
    }
    catch (e) {
        templateFn = templateComplier(template);
    }
    return templateFn;
}
/**
 * Function to remove the element from id.
 *
 * @param {string} id Specifies the id
 * @returns {void}
 * @private
 */
export function removeElement(id) {
    var element = getElement(id);
    if (element) {
        remove(element);
    }
}
/**
 * Function to get element from id.
 *
 * @param {string} id - Specifies the id.
 * @returns {Element} - Returns the element.
 * @private
 */
export function getElement(id) {
    return document.getElementById(id);
}
/**
 * Function to convert the number from string.
 *
 * @param {string} value - Specifies the value.
 * @param {number} containerSize - Specifies the container size.
 * @returns {number} - Returns the number.
 * @private
 */
export function stringToNumber(value, containerSize) {
    if (value !== null && value !== undefined) {
        return value.indexOf('%') !== -1 ? (containerSize / 100) * parseInt(value, 10) : parseInt(value, 10);
    }
    return null;
}
/**
 * Function to get current point for circular gauge using element id.
 *
 * @param {string} targetId - Specifies the target id.
 * @param {CircularGauge} gauge - Specifies the gauge instance.
 * @returns {IVisiblePointer} - Returns the pointer and axis index.
 * @private
 */
export function getPointer(targetId, gauge) {
    var tempString = targetId.replace(gauge.element.id, '').split('_Axis_')[1];
    var tempStringArray = tempString.indexOf('_Range_') > -1 ? tempString.split('_Range_') : tempString.indexOf('_Pointer_NeedleCap_') > -1 ? tempString.split('_Pointer_NeedleCap_') :
        tempString.indexOf('_Pointer_NeedleTail_') > -1 ? tempString.split('_Pointer_NeedleTail_') : tempString.indexOf('_Pointer_NeedleRect_') > -1 ? tempString.split('_Pointer_NeedleRect_') :
            tempString.indexOf('_Pointer_Needle_') > -1 ? tempString.split('_Pointer_Needle_') : tempString.indexOf('_Pointer_RangeBar_') > -1 ? tempString.split('_Pointer_RangeBar_') : tempString.indexOf('_Pointer_Marker_') > -1 ?
                tempString.split('_Pointer_Marker_') : tempString.indexOf('_Pointer_') > -1 ? tempString.split('_Pointer_') : tempString.split('_Annotation_');
    return {
        axisIndex: +tempStringArray[0],
        pointerIndex: +tempStringArray[tempStringArray.length - 1]
    };
}
/**
 * Function to convert the label using format for cirular gauge.
 *
 * @param {string} format - Specifies the format.
 * @returns {string} - Returns th string.
 * @private
 */
export function getLabelFormat(format) {
    var customLabelFormat = format && format.match('{value}') !== null;
    var skeleton = customLabelFormat ? '' : format;
    return skeleton;
}
/**
 * Function to calculate the marker shape for circular gauge.
 *
 * @param {GaugeLocation} location - Specifies the location.
 * @param {string} shape - Specifies the shape.
 * @param {Size} size - Specifies the size.
 * @param {string} url - Specifies the url.
 * @param {PathOption} options - Specifies the path option.
 * @returns {PathOption} - Returns the path.
 * @private
 */
export function calculateShapes(location, shape, size, url, options) {
    var path;
    var width = typeof size.width === 'string' ? parseFloat(size.width) : size.width;
    var height = typeof size.height === 'string' ? parseFloat(size.height) : size.height;
    var locX = location.x;
    var locY = location.y;
    var x = location.x + (-width / 2);
    var y = location.y + (-height / 2);
    var isLegend = options.id.indexOf('Shape') > -1;
    var space;
    switch (shape) {
        case 'Circle':
            merge(options, { 'rx': width / 2, 'ry': height / 2, 'cx': locX, 'cy': locY });
            break;
        case 'Diamond':
            path = 'M' + ' ' + x + ' ' + locY + ' ' +
                'L' + ' ' + locX + ' ' + (locY + (-height / 2)) + ' ' +
                'L' + ' ' + (locX + (width / 2)) + ' ' + locY + ' ' +
                'L' + ' ' + locX + ' ' + (locY + (height / 2)) + ' ' +
                'L' + ' ' + x + ' ' + locY + ' Z';
            merge(options, { 'd': path });
            break;
        case 'Rectangle':
            path = 'M' + ' ' + x + ' ' + (locY + (-height / 2)) + ' ' +
                'L' + ' ' + (locX + (width / 2)) + ' ' + (locY + (-height / 2)) + ' ' +
                'L' + ' ' + (locX + (width / 2)) + ' ' + (locY + (height / 2)) + ' ' +
                'L' + ' ' + x + ' ' + (locY + (height / 2)) + ' ' +
                'L' + ' ' + x + ' ' + (locY + (-height / 2)) + ' Z';
            merge(options, { 'd': path });
            break;
        case 'Triangle':
            if (isLegend) {
                path = 'M' + ' ' + (x + (width / 2)) + ' ' + y + ' ' + 'L' + ' ' + (x + width) + ' ' +
                    (y + height) + 'L' + ' ' + x + ' ' + (y + height) + ' Z';
            }
            else {
                path = 'M' + ' ' + locX + ' ' + locY + ' ' +
                    'L' + ' ' + (locX - height) + ' ' + (locY - (width / 2)) +
                    'L' + ' ' + (locX - height) + ' ' + (locY + (width / 2)) + ' Z';
            }
            merge(options, { 'd': path });
            break;
        case 'InvertedTriangle':
            if (isLegend) {
                path = 'M' + ' ' + (x + width) + ' ' + y + ' ' + 'L' + ' ' + (x + (width / 2)) + ' ' + (y + height) +
                    'L' + ' ' + x + ' ' + (y) + ' Z';
            }
            else {
                path = 'M' + ' ' + locX + ' ' + locY + ' ' +
                    'L' + ' ' + (locX + height) + ' ' + (locY - (width / 2)) +
                    'L' + ' ' + (locX + height) + ' ' + (locY + (width / 2)) + ' Z';
            }
            merge(options, { 'd': path });
            break;
        case 'Image':
            merge(options, { 'href': url, 'height': height, 'width': width, x: x, y: y });
            break;
        case 'RightArrow':
            space = 2;
            path = 'M' + ' ' + (locX + (-width / 2)) + ' ' + (locY - (height / 2)) + ' ' +
                'L' + ' ' + (locX + (width / 2)) + ' ' + (locY) + ' ' + 'L' + ' ' +
                (locX + (-width / 2)) + ' ' + (locY + (height / 2)) + ' L' + ' ' + (locX + (-width / 2)) + ' ' +
                (locY + (height / 2) - space) + ' ' + 'L' + ' ' + (locX + (width / 2) - (2 * space)) + ' ' + (locY) +
                ' L' + (locX + (-width / 2)) + ' ' + (locY - (height / 2) + space) + ' Z';
            merge(options, { 'd': path });
            break;
        case 'LeftArrow':
            options.fill = options.stroke;
            options.stroke = 'transparent';
            space = 2;
            path = 'M' + ' ' + (locX + (width / 2)) + ' ' + (locY - (height / 2)) + ' ' +
                'L' + ' ' + (locX + (-width / 2)) + ' ' + (locY) + ' ' + 'L' + ' ' +
                (locX + (width / 2)) + ' ' + (locY + (height / 2)) + ' ' + 'L' + ' ' +
                (locX + (width / 2)) + ' ' + (locY + (height / 2) - space) + ' L' + ' ' + (locX + (-width / 2) + (2 * space))
                + ' ' + (locY) + ' L' + (locX + (width / 2)) + ' ' + (locY - (height / 2) + space) + ' Z';
            merge(options, { 'd': path });
            break;
    }
    return options;
}
/** @private */
var CustomizeOption = /** @class */ (function () {
    function CustomizeOption(id) {
        this.id = id;
    }
    return CustomizeOption;
}());
export { CustomizeOption };
/** @private */
var PathOption = /** @class */ (function (_super) {
    __extends(PathOption, _super);
    function PathOption(id, fill, width, color, opacity, dashArray, d, transform, style) {
        if (transform === void 0) { transform = ''; }
        if (style === void 0) { style = ''; }
        var _this = _super.call(this, id) || this;
        _this.opacity = opacity;
        _this.fill = fill;
        _this.stroke = color;
        _this['stroke-width'] = width;
        _this['stroke-dasharray'] = dashArray;
        _this.d = d;
        _this.transform = transform;
        _this.style = style;
        return _this;
    }
    return PathOption;
}(CustomizeOption));
export { PathOption };
/** @private */
var RectOption = /** @class */ (function (_super) {
    __extends(RectOption, _super);
    function RectOption(id, fill, border, opacity, rect) {
        var _this = _super.call(this, id) || this;
        _this.y = rect.y;
        _this.x = rect.x;
        _this.height = rect.height;
        _this.width = rect.width;
        _this.opacity = opacity;
        _this.fill = fill;
        _this.stroke = border.color;
        _this['stroke-width'] = border.width;
        _this['stroke-dasharray'] = border.dashArray;
        return _this;
    }
    return RectOption;
}(CustomizeOption));
export { RectOption };
/**
 * Specifies the size information of an element.
 */
var Size = /** @class */ (function () {
    function Size(width, height) {
        this.width = width;
        this.height = height;
    }
    return Size;
}());
export { Size };
/**
 * Specifies the location of the element in the circular gauge.
 */
var GaugeLocation = /** @class */ (function () {
    function GaugeLocation(x, y) {
        this.x = x;
        this.y = y;
    }
    return GaugeLocation;
}());
export { GaugeLocation };
/** @private */
var Rect = /** @class */ (function () {
    function Rect(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
    return Rect;
}());
export { Rect };
/** @private */
var TextOption = /** @class */ (function (_super) {
    __extends(TextOption, _super);
    function TextOption(id, x, y, anchor, text, transform, baseLine) {
        if (transform === void 0) { transform = ''; }
        var _this = _super.call(this, id) || this;
        _this.transform = '';
        _this.baseLine = 'auto';
        _this.x = x;
        _this.y = y;
        _this.anchor = anchor;
        _this.text = text;
        _this.transform = transform;
        _this.baseLine = baseLine;
        return _this;
    }
    return TextOption;
}(CustomizeOption));
export { TextOption };
/** @private */
var VisibleLabels = /** @class */ (function () {
    function VisibleLabels(text, value, size) {
        this.text = text;
        this.value = value;
        this.size = size;
    }
    return VisibleLabels;
}());
export { VisibleLabels };
