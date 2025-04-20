import { createElement, isNullOrUndefined, compile, remove, merge, setStyleAttribute, Property, ChildProperty, Complex, Collection, Animation as Animation$1, SanitizeHtmlHelper, Browser, animationMode, print, EventHandler, Internationalization, Event, NotifyPropertyChanges, Component } from '@syncfusion/ej2-base';
import { SvgRenderer, Tooltip } from '@syncfusion/ej2-svg-base';
import { PdfPageOrientation, PdfDocument, PdfBitmap } from '@syncfusion/ej2-pdf-export';

/* eslint-disable max-len */
/**
 * Specifies Circular-Gauge Common Helper methods
 */
var __extends = (undefined && undefined.__extends) || (function () {
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
/**
 * Function to measure the height and width of the text.
 *
 * @param  {string} text - Specifies the text.
 * @param  {FontModel} font - Specifies the font.
 * @returns {Size} - Returns the size of the text.
 * @private
 */
function measureText(text, font) {
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
function toPixel(value, maxDimension) {
    return value.indexOf('%') !== -1 ? (maxDimension / 100) * parseInt(value, 10) : parseInt(value, 10);
}
/**
 * Function to get the style from FontModel.
 *
 * @param {FontModel} font - Specifies the font.
 * @returns {string} - Returns the string.
 * @private
 */
function getFontStyle(font) {
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
function textElement(options, font, color, parent, styles) {
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
function appendPath(options, element, gauge, functionName) {
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
function isCompleteAngle(startAngle, endAngle) {
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
function getDegree(startAngle, endAngle) {
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
function getAngleFromValue(value, maximumValue, minimumValue, startAngle, endAngle, isClockWise) {
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
function getAngleFromLocation(center, point) {
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
function getLocationFromAngle(degree, radius, center) {
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
function getPathArc(center, start, end, radius, startWidth, endWidth, range, axis) {
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
function arcPath(start, end, radius, arcStartOne, arcEndOne, arcStartTwo, arcEndTwo, clockWise, innerStart, innerEnd, pointPosition) {
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
function arcRoundedPath(start, end, radius, outerOldEnd, innerOldEnd, arcStartOne, arcEndOne, arcStartTwo, arcEndTwo, clockWise, innerStart, innerEnd, innerOldStart, outerOldStart, pointPosition) {
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
function arcWidthPath(start, end, innerStart, innerEnd, radius, startRadius, endRadius, clockWise) {
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
function getRangePath(start, end, innerStart, innerEnd, radius, startRadius, endRadius, arcRadius, clockWise, center, degree, range, axis) {
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
function arcWidthPathCalculation(start, end, innerStart, innerEnd, radius, startRadius, endRadius, arcRadius, clockWise, center, outerOldEnd, innerOldEnd, outerOldStart, innerOldStart, startWidth, endWidth, degree, range, axis) {
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
function roundedArcWidthPathCalculation(start, end, innerStart, innerEnd, radius, startRadius, endRadius, clockWise, outerOldEnd, innerOldEnd, outerOldStart, innerOldStart) {
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
function getRoundedPathArc(center, actualStart, actualEnd, oldStart, oldEnd, radius, startWidth, endWidth, range, axis) {
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
function getCirclePath(start, end, radius, clockWise) {
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
function getTemplateFunction(template, gauge) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    var templateFn = null;
    try {
        if (typeof template === 'function') {
            templateFn = compile(template);
        }
        else if (isNaN(parseFloat(template)) && document.querySelectorAll(template).length) {
            if ((template.charAt(0) !== 'a' || template.charAt(0) !== 'A') && template.length !== 1) {
                templateFn = compile(document.querySelector(template).innerHTML.trim());
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        }
        else if (gauge.isVue || gauge.isVue3) {
            templateFn = compile(template);
        }
    }
    catch (e) {
        templateFn = compile(template);
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
function removeElement(id) {
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
function getElement(id) {
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
function stringToNumber(value, containerSize) {
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
function getPointer(targetId, gauge) {
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
function getLabelFormat(format) {
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
function calculateShapes(location, shape, size, url, options) {
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
/** @private */
var VisibleLabels = /** @class */ (function () {
    function VisibleLabels(text, value, size) {
        this.text = text;
        this.value = value;
        this.size = size;
    }
    return VisibleLabels;
}());

/**
 * Specifies Circular-Gauge Helper methods
 */
/**
 * Function to set style to the element.
 *
 * @param {HTMLElement} element - Specifies the element.
 * @param {string} fill - Specifies the fill of the element.
 * @param {BorderModel} border - Specifies the border of the element.
 * @returns {void}
 * @private
 */
function setStyles(element, fill, border) {
    setStyleAttribute(element, {
        'stroke': border.color, 'stroke-width': border.width,
        'fill': fill
    });
}
/**
 * Function to get the value from angle for circular gauge.
 *
 * @param {number} angle - Specifies the angle.
 * @param {number} maximumValue - Specifies the maximumValue.
 * @param {number} minimumValue - Specifies the minimumValue.
 * @param {number} startAngle - Specifies the startAngle.
 * @param {number} endAngle - Specifies the endAngle.
 * @param {boolean} isClockWise - Specifies the isClockWise.
 * @returns {number} - Returs the number.
 * @private
 */
function getValueFromAngle(angle, maximumValue, minimumValue, startAngle, endAngle, isClockWise) {
    endAngle -= isCompleteAngle(startAngle, endAngle) ? 0.0001 : 0;
    angle = angle < startAngle ? (angle + 360) : angle;
    if (isClockWise) {
        return (((angle - startAngle) / getDegree(startAngle, endAngle)) * (maximumValue - minimumValue)) + minimumValue;
    }
    else {
        return maximumValue - ((((angle - startAngle) / getDegree(startAngle, endAngle)) * (maximumValue - minimumValue)));
    }
}
/**
 * Function to get current point for circular gauge using element id.
 *
 * @param {string} targetId - Specifies the target id.
 * @param {CircularGauge} gauge - Specifies the gauge instance.
 * @returns {IVisibleRange} - Returns the current point.
 * @private
 */
function getRange(targetId, gauge) {
    var tempString = targetId.replace(gauge.element.id, '').split('_Axis_')[1];
    return {
        axisIndex: +tempString[0],
        rangeIndex: +tempString.split('Range_')[1]
    };
}

/**
 * Specifies gauge Themes
 */
var Theme;
(function (Theme) {
    /** @private */
    Theme.axisLabelFont = {
        size: null,
        fontWeight: null,
        color: null,
        fontStyle: 'Normal',
        fontFamily: null
    };
    Theme.legendLabelFont = {
        size: null,
        fontWeight: null,
        color: null,
        fontStyle: 'Normal',
        fontFamily: null
    };
})(Theme || (Theme = {}));
/**
 * @param {string} theme theme
 * @returns {string[]} palette
 * @private */
function getRangePalette(theme) {
    var palette = ['#50c917', '#27d5ff', '#fcde0b', '#ffb133', '#ff5985'];
    switch (theme.toLowerCase()) {
        case 'tailwind':
            palette = ['#0369A1', '#14B8A6', '#15803D', '#334155', '#5A61F6', '#65A30D', '#8B5CF6', '#9333EA', '#F59E0B', '#F97316'];
            break;
        case 'tailwinddark':
            palette = ['#10B981', '#22D3EE', '#2DD4BF', '#4ADE80', '#8B5CF6', '#E879F9', '#F472B6', '#F87171', '#F97316', '#FCD34D'];
            break;
        case 'tailwind3':
            palette = ['#2F4074', '#03B4B4', '#0D72DE', '#FF5733', '#D63384', '#F39C12', '#EF291F', '#91C822'];
            break;
        case 'tailwind3dark':
            palette = ['#8029F1', '#1ABC9C', '#0D72DE', '#FF5733', '#D63384', '#F39C12', '#EF291F', '#91C822'];
            break;
        case 'fluent':
            palette = ['#614570', '#4C6FB1', '#CC6952', '#3F579A', '#4EA09B',
                '#6E7A89', '#D4515C', '#E6AF5D', '#639751', '#9D4D69'];
            break;
        case 'fluentdark':
            palette = ['#8AB113', '#2A72D5', '#43B786', '#584EC6', '#E85F9C',
                '#6E7A89', '#EA6266', '#EBA844', '#26BC7A', '#BC4870'];
            break;
        case 'material3':
            palette = ['#6200EE', '#E77A16', '#82C100', '#7107DC', '#05BB3D',
                '#D21020', '#FAD200', '#0085FF', '#9204EA', '#08EE9B'];
            break;
        case 'material3dark':
            palette = ['#4EAAFF', '#FA4EAB', '#FFF500', '#17EA58', '#38FFE7',
                '#FF9E45', '#B3F32F', '#B93CE4', '#FC5664', '#9B55FF'];
            break;
        case 'fluent2':
            palette = ['#6200EE', '#09AF74', '#0076E5', '#CB3587', '#E7910F',
                '#0364DE', '#66CD15', '#F3A93C', '#107C10', '#C19C00'];
            break;
        case 'fluent2dark':
        case 'fluent2highcontrast':
            palette = ['#9BB449', '#2A72D5', '#43B786', '#3F579A', '#584EC6',
                '#E85F9C', '#6E7A89', '#EA6266', '#0B6A0B', '#C19C00'];
            break;
        case 'bootstrap5':
        case 'bootstrap5dark':
            palette = ['#6610F2', '#6f42C1', '#D63384', '#DC3545',
                '#FD7E14', '#FFC107', '#198754', '#0DCAF0'];
            break;
    }
    return palette;
}
/**
 * Function to get ThemeStyle
 *
 * @param {GaugeTheme} theme theme
 * @returns {IThemeStyle} style
 * @private */
function getThemeStyle(theme) {
    var style;
    switch (theme.toLowerCase()) {
        case 'materialdark':
        case 'fabricdark':
        case 'bootstrapdark':
            style = {
                backgroundColor: '#333232',
                titleFontColor: '#ffffff',
                tooltipFillColor: '#FFFFFF',
                tooltipFontColor: '#000000',
                tooltipFontSize: '13px',
                tooltipTextOpacity: 1,
                labelColor: '#DADADA',
                lineColor: '#C8C8C8',
                majorTickColor: '#C8C8C8',
                minorTickColor: '#9A9A9A',
                pointerColor: '#9A9A9A',
                capColor: '#9A9A9A',
                needleColor: '#9A9A9A',
                needleTailColor: '#9A9A9A',
                fontSize: '12px',
                titleFontSize: '15px',
                labelFontFamily: 'Segoe UI',
                fontFamily: 'Segoe UI',
                fontWeight: 'Normal',
                titleFontWeight: 'Normal'
            };
            break;
        case 'highcontrast':
            style = {
                backgroundColor: '#000000',
                titleFontColor: '#FFFFFF',
                tooltipFillColor: '#ffffff',
                tooltipFontColor: '#000000',
                tooltipFontSize: '13px',
                tooltipTextOpacity: 1,
                labelColor: '#FFFFFF',
                lineColor: '#FFFFFF',
                majorTickColor: '#FFFFFF',
                minorTickColor: '#FFFFFF',
                pointerColor: '#FFFFFF',
                capColor: '#FFFFFF',
                needleColor: '#FFFFFF',
                needleTailColor: '#FFFFFF',
                fontSize: '12px',
                titleFontSize: '15px',
                labelFontFamily: 'Segoe UI',
                fontFamily: 'Segoe UI',
                fontWeight: 'Normal',
                titleFontWeight: 'Normal'
            };
            break;
        case 'bootstrap4':
            style = {
                backgroundColor: '#FFFFFF',
                titleFontColor: '#212529',
                tooltipFillColor: '#000000',
                tooltipFontColor: '#FFFFFF',
                tooltipFontSize: '13px',
                labelColor: '#212529',
                lineColor: '#DEE2E6',
                majorTickColor: '#ADB5BD',
                minorTickColor: '#CED4DA',
                pointerColor: '#6C757D',
                capColor: '#6C757D',
                needleColor: '#6C757D',
                needleTailColor: '#6C757D',
                fontFamily: 'HelveticaNeue-Medium',
                fontSize: '12px',
                titleFontSize: '16px',
                labelFontFamily: 'HelveticaNeue',
                tooltipFillOpacity: 1,
                tooltipTextOpacity: 0.9,
                fontWeight: 'Normal',
                titleFontWeight: 'Normal'
            };
            break;
        case 'tailwind':
            style = {
                backgroundColor: 'rgba(255,255,255, 0.0)',
                titleFontColor: '#374151',
                tooltipFillColor: '#111827',
                tooltipFontColor: '#F9FAFB',
                tooltipFontSize: '13px',
                labelColor: '#6B7280',
                lineColor: '#E5E7EB',
                majorTickColor: '#9CA3AF',
                minorTickColor: '#9CA3AF',
                pointerColor: '#1F2937',
                capColor: '#1F2937',
                needleColor: '#1F2937',
                needleTailColor: '#1F2937',
                fontFamily: 'Inter',
                fontSize: '12px',
                titleFontSize: '14px',
                labelFontFamily: 'Inter',
                tooltipFillOpacity: 1,
                tooltipTextOpacity: 0.9,
                fontWeight: 'Normal',
                titleFontWeight: '500'
            };
            break;
        case 'tailwinddark':
            style = {
                backgroundColor: 'rgba(255,255,255, 0.0)',
                titleFontColor: '#D1D5DB',
                tooltipFillColor: '#F9FAFB',
                tooltipFontColor: '#1F2937',
                tooltipFontSize: '13px',
                labelColor: '#9CA3AF',
                lineColor: '#374151',
                majorTickColor: '#6B7280',
                minorTickColor: '#6B7280',
                pointerColor: '#9CA3AF',
                capColor: '#9CA3AF',
                needleColor: '#9CA3AF',
                needleTailColor: '#9CA3AF',
                fontFamily: 'Inter',
                fontSize: '12px',
                titleFontSize: '14px',
                labelFontFamily: 'Inter',
                tooltipFillOpacity: 1,
                tooltipTextOpacity: 0.9,
                fontWeight: 'Normal',
                titleFontWeight: '500'
            };
            break;
        case 'tailwind3':
            style = {
                backgroundColor: 'rgba(255,255,255, 0.0)',
                titleFontColor: '#111827',
                tooltipFillColor: '#111827',
                tooltipFontColor: '#F9FAFB',
                tooltipFontSize: '12px',
                labelColor: '#4B5563',
                lineColor: '#E5E7EB',
                majorTickColor: '#D1D5DB',
                minorTickColor: '#D1D5DB',
                pointerColor: '#1F2937',
                capColor: '#1F2937',
                needleColor: '#1F2937',
                needleTailColor: '#1F2937',
                fontFamily: 'Inter',
                fontSize: '12px',
                titleFontSize: '14px',
                labelFontFamily: 'Inter',
                tooltipFillOpacity: 1,
                tooltipTextOpacity: 1,
                fontWeight: '400',
                titleFontWeight: '600'
            };
            break;
        case 'tailwind3dark':
            style = {
                backgroundColor: 'rgba(255,255,255, 0.0)',
                titleFontColor: '#FFFFFF',
                tooltipFillColor: '#F9FAFB',
                tooltipFontColor: '#1F2937',
                tooltipFontSize: '12px',
                labelColor: '#D1D5DB',
                lineColor: '#282F3C',
                majorTickColor: '#374151',
                minorTickColor: '#374151',
                pointerColor: '#6B7280',
                capColor: '#6B7280',
                needleColor: '#6B7280',
                needleTailColor: '#6B7280',
                fontFamily: 'Inter',
                fontSize: '12px',
                titleFontSize: '14px',
                labelFontFamily: 'Inter',
                tooltipFillOpacity: 1,
                tooltipTextOpacity: 1,
                fontWeight: '400',
                titleFontWeight: '600'
            };
            break;
        case 'bootstrap5':
            style = {
                backgroundColor: 'transparent',
                titleFontColor: '#212529',
                tooltipFillColor: '#000000',
                tooltipFontColor: '#FFFFFF',
                fontSize: '10px',
                tooltipFontSize: '12px',
                labelColor: '#212529',
                lineColor: '#E9ECEF',
                majorTickColor: '#CED4DA',
                minorTickColor: '#CED4DA',
                pointerColor: '#343A40',
                capColor: '#343A40',
                needleColor: '#343A40',
                needleTailColor: '#343A40',
                fontFamily: 'Segoe UI',
                titleFontSize: '14px',
                labelFontFamily: 'Segoe UI',
                tooltipFillOpacity: 0.9,
                fontWeight: '400',
                titleFontWeight: '400'
            };
            break;
        case 'bootstrap5dark':
            style = {
                backgroundColor: 'transparent',
                titleFontColor: '#DEE2E6',
                tooltipFillColor: '#FFFFFF',
                tooltipFontColor: '#212529',
                fontSize: '10px',
                tooltipFontSize: '12px',
                labelColor: '#DEE2E6',
                lineColor: '#343A40',
                majorTickColor: '#6C757D',
                minorTickColor: '#6C757D',
                pointerColor: '#ADB5BD',
                capColor: '#ADB5BD',
                needleColor: '#ADB5BD',
                needleTailColor: '#ADB5BD',
                fontFamily: 'Segoe UI',
                titleFontSize: '14px',
                labelFontFamily: 'Segoe UI',
                tooltipFillOpacity: 0.9,
                fontWeight: '400',
                titleFontWeight: '400'
            };
            break;
        case 'fluent':
            style = {
                backgroundColor: 'rgba(255,255,255, 0.0)',
                titleFontColor: '#201F1E',
                tooltipFillColor: '#FFFFFF',
                tooltipFontColor: '#323130',
                tooltipFontSize: '13px',
                labelColor: '#3B3A39',
                lineColor: '#EDEBE9',
                majorTickColor: '#C8C6C4',
                minorTickColor: '#C8C6C4',
                pointerColor: '#A19F9D',
                capColor: '#A19F9D',
                needleColor: '#A19F9D',
                needleTailColor: '#A19F9D',
                fontFamily: 'Segoe UI',
                fontSize: '12px',
                titleFontSize: '14px',
                labelFontFamily: 'Segoe UI',
                tooltipFillOpacity: 1,
                tooltipTextOpacity: 1,
                fontWeight: 'Normal',
                titleFontWeight: '600'
            };
            break;
        case 'fluentdark':
            style = {
                backgroundColor: 'rgba(255,255,255, 0.0)',
                titleFontColor: '#F3F2F1',
                tooltipFillColor: '#252423',
                tooltipFontColor: '#F3F2F1',
                tooltipFontSize: '13px',
                labelColor: '#C8C6C4',
                lineColor: '#292827',
                majorTickColor: '#484644',
                minorTickColor: '#484644',
                pointerColor: '#797775',
                capColor: '#797775',
                needleColor: '#797775',
                needleTailColor: '#797775',
                fontFamily: 'Segoe UI',
                fontSize: '12px',
                titleFontSize: '14px',
                labelFontFamily: 'Segoe UI',
                tooltipFillOpacity: 1,
                tooltipTextOpacity: 1,
                fontWeight: 'Normal',
                titleFontWeight: '600'
            };
            break;
        case 'material3':
            style = {
                backgroundColor: 'transparent',
                titleFontColor: '#1C1B1F',
                tooltipFillColor: '#313033',
                tooltipFontColor: '#F4EFF4',
                tooltipFontSize: '14px',
                labelColor: ' #1E192B',
                lineColor: '#E7E0EC',
                majorTickColor: '#C4C7C5',
                minorTickColor: '#C4C7C5',
                pointerColor: '#49454E',
                capColor: '#49454E',
                needleColor: '#49454E',
                needleTailColor: '#49454E',
                fontFamily: 'Roboto',
                fontSize: '12px',
                titleFontSize: '16px',
                labelFontFamily: 'Roboto',
                tooltipFillOpacity: 1,
                tooltipTextOpacity: 1,
                fontWeight: '400',
                titleFontWeight: '500'
            };
            break;
        case 'material3dark':
            style = {
                backgroundColor: 'transparent',
                titleFontColor: '#E6E1E5',
                tooltipFillColor: '#E6E1E5',
                tooltipFontColor: '#313033',
                tooltipFontSize: '14px',
                labelColor: '#E6E1E5',
                lineColor: '#49454F',
                majorTickColor: '#444746',
                minorTickColor: '#444746',
                pointerColor: '#CAC4D0',
                capColor: '#CAC4D0',
                needleColor: '#CAC4D0',
                needleTailColor: '#CAC4D0',
                fontFamily: 'Roboto',
                fontSize: '12px',
                titleFontSize: '16px',
                labelFontFamily: 'Roboto',
                tooltipFillOpacity: 1,
                tooltipTextOpacity: 1,
                fontWeight: '400',
                titleFontWeight: '500'
            };
            break;
        case 'fluent2':
            style = {
                backgroundColor: 'transparent',
                titleFontColor: '#242424',
                tooltipFillColor: '#FFFFFF',
                tooltipFontColor: '#242424',
                tooltipFontSize: '12px',
                labelColor: '#242424',
                lineColor: '#EDEBE9',
                majorTickColor: '#C8C6C4',
                minorTickColor: '#C8C6C4',
                pointerColor: '#A19F9D',
                capColor: '#A19F9D',
                needleColor: '#A19F9D',
                needleTailColor: '#A19F9D',
                fontFamily: 'Segoe UI',
                fontSize: '12px',
                titleFontSize: '14px',
                labelFontFamily: 'Segoe UI',
                tooltipFillOpacity: 1,
                tooltipTextOpacity: 1,
                fontWeight: '400',
                titleFontWeight: '600'
            };
            break;
        case 'fluent2dark':
            style = {
                backgroundColor: 'transparent',
                titleFontColor: '#FFFFFF',
                tooltipFillColor: '#292929',
                tooltipFontColor: '#FFFFFF',
                tooltipFontSize: '12px',
                labelColor: '#FFFFFF',
                lineColor: '#292827',
                majorTickColor: '#484644',
                minorTickColor: '#484644',
                pointerColor: '#8A8886',
                capColor: '#8A8886',
                needleColor: '#8A8886',
                needleTailColor: '#8A8886',
                fontFamily: 'Segoe UI',
                fontSize: '12px',
                titleFontSize: '14px',
                labelFontFamily: 'Segoe UI',
                tooltipFillOpacity: 1,
                tooltipTextOpacity: 1,
                fontWeight: '400',
                titleFontWeight: '600'
            };
            break;
        case 'fluent2highcontrast':
            style = {
                backgroundColor: 'transparent',
                titleFontColor: '#FFFFFF',
                tooltipFillColor: '#000000',
                tooltipFontColor: '#FFFFFF',
                tooltipFontSize: '12px',
                labelColor: '#FFFFFF',
                lineColor: '#292827',
                majorTickColor: '#484644',
                minorTickColor: '#484644',
                pointerColor: '#8A8886',
                capColor: '#8A8886',
                needleColor: '#8A8886',
                needleTailColor: '#8A8886',
                fontFamily: 'Segoe UI',
                fontSize: '12px',
                titleFontSize: '14px',
                labelFontFamily: 'Segoe UI',
                tooltipFillOpacity: 1,
                tooltipTextOpacity: 1,
                fontWeight: '400',
                titleFontWeight: '600',
                tooltipBorderColor: '#FFF',
                legendBorderColor: '#FFF',
                legendBorderWidth: 1
            };
            break;
        default:
            style = {
                backgroundColor: '#FFFFFF',
                titleFontColor: '#424242',
                tooltipFillColor: '#363F4C',
                tooltipFontColor: '#ffffff',
                tooltipFontSize: '13px',
                tooltipTextOpacity: 1,
                labelColor: '#212121',
                lineColor: '#E0E0E0',
                majorTickColor: '#9E9E9E',
                minorTickColor: '#9E9E9E',
                pointerColor: '#757575',
                capColor: '#757575',
                needleColor: '#757575',
                needleTailColor: '#757575',
                fontSize: '12px',
                titleFontSize: '15px',
                labelFontFamily: 'Segoe UI',
                fontFamily: 'Segoe UI',
                fontWeight: 'Normal',
                titleFontWeight: 'Normal'
            };
            break;
    }
    return style;
}

var __extends$1 = (undefined && undefined.__extends) || (function () {
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
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * Sets and gets the options to customize the styles of the borders in circular gauge.
 */
var Border = /** @class */ (function (_super) {
    __extends$1(Border, _super);
    function Border() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property('')
    ], Border.prototype, "color", void 0);
    __decorate([
        Property(1)
    ], Border.prototype, "width", void 0);
    __decorate([
        Property('')
    ], Border.prototype, "dashArray", void 0);
    return Border;
}(ChildProperty));
/**
 * Sets and gets the font style for the circular gauge.
 */
var Font = /** @class */ (function (_super) {
    __extends$1(Font, _super);
    function Font() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property('16px')
    ], Font.prototype, "size", void 0);
    __decorate([
        Property('')
    ], Font.prototype, "color", void 0);
    __decorate([
        Property('segoe UI')
    ], Font.prototype, "fontFamily", void 0);
    __decorate([
        Property('Normal')
    ], Font.prototype, "fontWeight", void 0);
    __decorate([
        Property('Normal')
    ], Font.prototype, "fontStyle", void 0);
    __decorate([
        Property(1)
    ], Font.prototype, "opacity", void 0);
    return Font;
}(ChildProperty));
/**
 * Sets and gets the options to customize the tooltip properties for range tooltip.
 */
var RangeTooltip = /** @class */ (function (_super) {
    __extends$1(RangeTooltip, _super);
    function RangeTooltip() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property(null)
    ], RangeTooltip.prototype, "fill", void 0);
    __decorate([
        Complex({ size: null, fontFamily: null, opacity: null, fontWeight: null }, Font)
    ], RangeTooltip.prototype, "textStyle", void 0);
    __decorate([
        Property(null)
    ], RangeTooltip.prototype, "format", void 0);
    __decorate([
        Property(null)
    ], RangeTooltip.prototype, "template", void 0);
    __decorate([
        Property(true)
    ], RangeTooltip.prototype, "enableAnimation", void 0);
    __decorate([
        Complex({ color: null }, Border)
    ], RangeTooltip.prototype, "border", void 0);
    __decorate([
        Property(false)
    ], RangeTooltip.prototype, "showAtMousePosition", void 0);
    return RangeTooltip;
}(ChildProperty));
/**
 * Sets and gets the options to customize the tooltip for annotation in circular gauge.
 */
var AnnotationTooltip = /** @class */ (function (_super) {
    __extends$1(AnnotationTooltip, _super);
    function AnnotationTooltip() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property(null)
    ], AnnotationTooltip.prototype, "fill", void 0);
    __decorate([
        Complex({ size: '13px', fontFamily: null, opacity: null }, Font)
    ], AnnotationTooltip.prototype, "textStyle", void 0);
    __decorate([
        Property(null)
    ], AnnotationTooltip.prototype, "format", void 0);
    __decorate([
        Property(null)
    ], AnnotationTooltip.prototype, "template", void 0);
    __decorate([
        Property(true)
    ], AnnotationTooltip.prototype, "enableAnimation", void 0);
    __decorate([
        Complex({ color: null }, Border)
    ], AnnotationTooltip.prototype, "border", void 0);
    return AnnotationTooltip;
}(ChildProperty));
/**
 * Sets and gets the margin of circular gauge.
 */
var Margin = /** @class */ (function (_super) {
    __extends$1(Margin, _super);
    function Margin() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property(10)
    ], Margin.prototype, "left", void 0);
    __decorate([
        Property(10)
    ], Margin.prototype, "right", void 0);
    __decorate([
        Property(10)
    ], Margin.prototype, "top", void 0);
    __decorate([
        Property(10)
    ], Margin.prototype, "bottom", void 0);
    return Margin;
}(ChildProperty));
/**
 * Sets and gets the options to customize the tooltip of the circular gauge.
 */
var TooltipSettings = /** @class */ (function (_super) {
    __extends$1(TooltipSettings, _super);
    function TooltipSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property(false)
    ], TooltipSettings.prototype, "enable", void 0);
    __decorate([
        Property(null)
    ], TooltipSettings.prototype, "fill", void 0);
    __decorate([
        Complex({ size: null, fontFamily: null, opacity: null, fontWeight: null }, Font)
    ], TooltipSettings.prototype, "textStyle", void 0);
    __decorate([
        Complex({}, RangeTooltip)
    ], TooltipSettings.prototype, "rangeSettings", void 0);
    __decorate([
        Complex({}, AnnotationTooltip)
    ], TooltipSettings.prototype, "annotationSettings", void 0);
    __decorate([
        Property(null)
    ], TooltipSettings.prototype, "format", void 0);
    __decorate([
        Property(null)
    ], TooltipSettings.prototype, "template", void 0);
    __decorate([
        Property(true)
    ], TooltipSettings.prototype, "enableAnimation", void 0);
    __decorate([
        Complex({ color: null }, Border)
    ], TooltipSettings.prototype, "border", void 0);
    __decorate([
        Property(false)
    ], TooltipSettings.prototype, "showAtMousePosition", void 0);
    __decorate([
        Property('Pointer')
    ], TooltipSettings.prototype, "type", void 0);
    return TooltipSettings;
}(ChildProperty));
/**
 * Sets and gets the location of the legend in circular gauge.
 */
var Location = /** @class */ (function (_super) {
    __extends$1(Location, _super);
    function Location() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property(0)
    ], Location.prototype, "x", void 0);
    __decorate([
        Property(0)
    ], Location.prototype, "y", void 0);
    return Location;
}(ChildProperty));
/**
 * Sets and gets the options to customize the legend for the ranges in the circular gauge.
 */
var LegendSettings = /** @class */ (function (_super) {
    __extends$1(LegendSettings, _super);
    function LegendSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property(false)
    ], LegendSettings.prototype, "visible", void 0);
    __decorate([
        Property(true)
    ], LegendSettings.prototype, "toggleVisibility", void 0);
    __decorate([
        Property('Center')
    ], LegendSettings.prototype, "alignment", void 0);
    __decorate([
        Complex({}, Border)
    ], LegendSettings.prototype, "border", void 0);
    __decorate([
        Complex({}, Border)
    ], LegendSettings.prototype, "shapeBorder", void 0);
    __decorate([
        Property(8)
    ], LegendSettings.prototype, "padding", void 0);
    __decorate([
        Property(1)
    ], LegendSettings.prototype, "opacity", void 0);
    __decorate([
        Property('Auto')
    ], LegendSettings.prototype, "position", void 0);
    __decorate([
        Property('Circle')
    ], LegendSettings.prototype, "shape", void 0);
    __decorate([
        Property(null)
    ], LegendSettings.prototype, "height", void 0);
    __decorate([
        Property(null)
    ], LegendSettings.prototype, "width", void 0);
    __decorate([
        Complex(Theme.legendLabelFont, Font)
    ], LegendSettings.prototype, "textStyle", void 0);
    __decorate([
        Property(10)
    ], LegendSettings.prototype, "shapeHeight", void 0);
    __decorate([
        Property(10)
    ], LegendSettings.prototype, "shapeWidth", void 0);
    __decorate([
        Property(5)
    ], LegendSettings.prototype, "shapePadding", void 0);
    __decorate([
        Complex({ x: 0, y: 0 }, Location)
    ], LegendSettings.prototype, "location", void 0);
    __decorate([
        Property('transparent')
    ], LegendSettings.prototype, "background", void 0);
    __decorate([
        Complex({ left: 0, right: 0, top: 0, bottom: 0 }, Margin)
    ], LegendSettings.prototype, "margin", void 0);
    return LegendSettings;
}(ChildProperty));

var __extends$2 = (undefined && undefined.__extends) || (function () {
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
var __decorate$1 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * Sets and gets the options to customize the axis line in circular gauge.
 */
var Line = /** @class */ (function (_super) {
    __extends$2(Line, _super);
    function Line() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate$1([
        Property(2)
    ], Line.prototype, "width", void 0);
    __decorate$1([
        Property('')
    ], Line.prototype, "dashArray", void 0);
    __decorate$1([
        Property(null)
    ], Line.prototype, "color", void 0);
    return Line;
}(ChildProperty));
/**
 * Sets and gets the options to customize the axis label in circular gauge.
 */
var Label = /** @class */ (function (_super) {
    __extends$2(Label, _super);
    function Label() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate$1([
        Complex(Theme.axisLabelFont, Font)
    ], Label.prototype, "font", void 0);
    __decorate$1([
        Property('')
    ], Label.prototype, "format", void 0);
    __decorate$1([
        Property('Inside')
    ], Label.prototype, "position", void 0);
    __decorate$1([
        Property('None')
    ], Label.prototype, "hiddenLabel", void 0);
    __decorate$1([
        Property(false)
    ], Label.prototype, "autoAngle", void 0);
    __decorate$1([
        Property(false)
    ], Label.prototype, "useRangeColor", void 0);
    __decorate$1([
        Property(0)
    ], Label.prototype, "offset", void 0);
    __decorate$1([
        Property(true)
    ], Label.prototype, "shouldMaintainPadding", void 0);
    return Label;
}(ChildProperty));
/**
 * Sets and gets the option to customize the ranges of an axis in circular gauge.
 */
var Range = /** @class */ (function (_super) {
    __extends$2(Range, _super);
    function Range() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /** @private */
        _this.isLinearCircularGradient = false;
        return _this;
    }
    __decorate$1([
        Property(0)
    ], Range.prototype, "start", void 0);
    __decorate$1([
        Property(0)
    ], Range.prototype, "end", void 0);
    __decorate$1([
        Property(null)
    ], Range.prototype, "radius", void 0);
    __decorate$1([
        Property(10)
    ], Range.prototype, "startWidth", void 0);
    __decorate$1([
        Property(10)
    ], Range.prototype, "endWidth", void 0);
    __decorate$1([
        Property(null)
    ], Range.prototype, "color", void 0);
    __decorate$1([
        Property(0)
    ], Range.prototype, "roundedCornerRadius", void 0);
    __decorate$1([
        Property(1)
    ], Range.prototype, "opacity", void 0);
    __decorate$1([
        Property('')
    ], Range.prototype, "legendText", void 0);
    __decorate$1([
        Property('Auto')
    ], Range.prototype, "position", void 0);
    __decorate$1([
        Property(0)
    ], Range.prototype, "offset", void 0);
    __decorate$1([
        Property(null)
    ], Range.prototype, "linearGradient", void 0);
    __decorate$1([
        Property(null)
    ], Range.prototype, "radialGradient", void 0);
    return Range;
}(ChildProperty));
/**
 * Sets and gets the options to customize the major and minor tick lines of an axis in circular gauge.
 */
var Tick = /** @class */ (function (_super) {
    __extends$2(Tick, _super);
    function Tick() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate$1([
        Property(2)
    ], Tick.prototype, "width", void 0);
    __decorate$1([
        Property(null)
    ], Tick.prototype, "height", void 0);
    __decorate$1([
        Property(null)
    ], Tick.prototype, "interval", void 0);
    __decorate$1([
        Property(0)
    ], Tick.prototype, "offset", void 0);
    __decorate$1([
        Property(null)
    ], Tick.prototype, "color", void 0);
    __decorate$1([
        Property('Inside')
    ], Tick.prototype, "position", void 0);
    __decorate$1([
        Property(false)
    ], Tick.prototype, "useRangeColor", void 0);
    __decorate$1([
        Property('0')
    ], Tick.prototype, "dashArray", void 0);
    return Tick;
}(ChildProperty));
/**
 * Sets and gets the needle cap of pointer in circular gauge.
 */
var Cap = /** @class */ (function (_super) {
    __extends$2(Cap, _super);
    function Cap() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate$1([
        Property(null)
    ], Cap.prototype, "color", void 0);
    __decorate$1([
        Property(null)
    ], Cap.prototype, "linearGradient", void 0);
    __decorate$1([
        Property(null)
    ], Cap.prototype, "radialGradient", void 0);
    __decorate$1([
        Complex({ color: null, width: 8 }, Border)
    ], Cap.prototype, "border", void 0);
    __decorate$1([
        Property(8)
    ], Cap.prototype, "radius", void 0);
    return Cap;
}(ChildProperty));
/**
 * Sets and gets the options to customize the pointer needle in the circular gauge.
 */
var NeedleTail = /** @class */ (function (_super) {
    __extends$2(NeedleTail, _super);
    function NeedleTail() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate$1([
        Property(null)
    ], NeedleTail.prototype, "color", void 0);
    __decorate$1([
        Complex({ color: null, width: 0 }, Border)
    ], NeedleTail.prototype, "border", void 0);
    __decorate$1([
        Property('0%')
    ], NeedleTail.prototype, "length", void 0);
    __decorate$1([
        Property(null)
    ], NeedleTail.prototype, "linearGradient", void 0);
    __decorate$1([
        Property(null)
    ], NeedleTail.prototype, "radialGradient", void 0);
    return NeedleTail;
}(ChildProperty));
/**
 * Sets and gets the animation of pointers in circular gauge.
 */
var Animation = /** @class */ (function (_super) {
    __extends$2(Animation, _super);
    function Animation() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate$1([
        Property(true)
    ], Animation.prototype, "enable", void 0);
    __decorate$1([
        Property(1000)
    ], Animation.prototype, "duration", void 0);
    return Animation;
}(ChildProperty));
/**
 * Sets and gets the annotation elements for an axis in circular gauge.
 */
var Annotation = /** @class */ (function (_super) {
    __extends$2(Annotation, _super);
    function Annotation() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate$1([
        Property(null)
    ], Annotation.prototype, "content", void 0);
    __decorate$1([
        Property(90)
    ], Annotation.prototype, "angle", void 0);
    __decorate$1([
        Property('50%')
    ], Annotation.prototype, "radius", void 0);
    __decorate$1([
        Property('-1')
    ], Annotation.prototype, "zIndex", void 0);
    __decorate$1([
        Property(false)
    ], Annotation.prototype, "autoAngle", void 0);
    __decorate$1([
        Complex({ size: '12px', color: '#686868' }, Font)
    ], Annotation.prototype, "textStyle", void 0);
    __decorate$1([
        Property(null)
    ], Annotation.prototype, "description", void 0);
    return Annotation;
}(ChildProperty));
/**
 * Sets and gets the options to customize the pointers of an axis in circular gauge.
 */
var Pointer = /** @class */ (function (_super) {
    __extends$2(Pointer, _super);
    function Pointer() {
        /**
         * Sets and gets the value of the pointer in circular gauge.
         *
         * @aspDefaultValueIgnore
         * @default null
         */
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /** @private */
        _this.isPointerAnimation = true;
        return _this;
    }
    __decorate$1([
        Property(null)
    ], Pointer.prototype, "value", void 0);
    __decorate$1([
        Property('Needle')
    ], Pointer.prototype, "type", void 0);
    __decorate$1([
        Property('Auto')
    ], Pointer.prototype, "position", void 0);
    __decorate$1([
        Property(0)
    ], Pointer.prototype, "roundedCornerRadius", void 0);
    __decorate$1([
        Property(null)
    ], Pointer.prototype, "imageUrl", void 0);
    __decorate$1([
        Property(null)
    ], Pointer.prototype, "radius", void 0);
    __decorate$1([
        Property(20)
    ], Pointer.prototype, "pointerWidth", void 0);
    __decorate$1([
        Complex({}, Cap)
    ], Pointer.prototype, "cap", void 0);
    __decorate$1([
        Complex({}, Font)
    ], Pointer.prototype, "textStyle", void 0);
    __decorate$1([
        Complex({}, NeedleTail)
    ], Pointer.prototype, "needleTail", void 0);
    __decorate$1([
        Property(null)
    ], Pointer.prototype, "color", void 0);
    __decorate$1([
        Complex({ color: '#DDDDDD', width: 0 }, Border)
    ], Pointer.prototype, "border", void 0);
    __decorate$1([
        Complex(null, Animation)
    ], Pointer.prototype, "animation", void 0);
    __decorate$1([
        Property('Circle')
    ], Pointer.prototype, "markerShape", void 0);
    __decorate$1([
        Property(5)
    ], Pointer.prototype, "markerHeight", void 0);
    __decorate$1([
        Property('')
    ], Pointer.prototype, "text", void 0);
    __decorate$1([
        Property(null)
    ], Pointer.prototype, "description", void 0);
    __decorate$1([
        Property(5)
    ], Pointer.prototype, "markerWidth", void 0);
    __decorate$1([
        Property(0)
    ], Pointer.prototype, "offset", void 0);
    __decorate$1([
        Property(null)
    ], Pointer.prototype, "needleStartWidth", void 0);
    __decorate$1([
        Property(null)
    ], Pointer.prototype, "needleEndWidth", void 0);
    __decorate$1([
        Property(false)
    ], Pointer.prototype, "enableDrag", void 0);
    __decorate$1([
        Property(null)
    ], Pointer.prototype, "linearGradient", void 0);
    __decorate$1([
        Property(null)
    ], Pointer.prototype, "radialGradient", void 0);
    return Pointer;
}(ChildProperty));
/**
 * Sets and gets the options to customize the axis for the circular gauge.
 */
var Axis = /** @class */ (function (_super) {
    __extends$2(Axis, _super);
    function Axis() {
        /**
         * Sets and gets the minimum value of an axis in the circular gauge.
         *
         * @aspDefaultValueIgnore
         * @default null
         */
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /** @private */
        _this.visibleLabels = [];
        return _this;
    }
    __decorate$1([
        Property(null)
    ], Axis.prototype, "minimum", void 0);
    __decorate$1([
        Property(null)
    ], Axis.prototype, "maximum", void 0);
    __decorate$1([
        Property(false)
    ], Axis.prototype, "showLastLabel", void 0);
    __decorate$1([
        Property(false)
    ], Axis.prototype, "hideIntersectingLabel", void 0);
    __decorate$1([
        Property(null)
    ], Axis.prototype, "roundingPlaces", void 0);
    __decorate$1([
        Property(null)
    ], Axis.prototype, "radius", void 0);
    __decorate$1([
        Complex({}, Line)
    ], Axis.prototype, "lineStyle", void 0);
    __decorate$1([
        Collection([{}], Range)
    ], Axis.prototype, "ranges", void 0);
    __decorate$1([
        Collection([{}], Pointer)
    ], Axis.prototype, "pointers", void 0);
    __decorate$1([
        Collection([{}], Annotation)
    ], Axis.prototype, "annotations", void 0);
    __decorate$1([
        Complex({ width: 2, height: 10 }, Tick)
    ], Axis.prototype, "majorTicks", void 0);
    __decorate$1([
        Complex({ width: 2, height: 5 }, Tick)
    ], Axis.prototype, "minorTicks", void 0);
    __decorate$1([
        Property(200)
    ], Axis.prototype, "startAngle", void 0);
    __decorate$1([
        Property(160)
    ], Axis.prototype, "endAngle", void 0);
    __decorate$1([
        Property('ClockWise')
    ], Axis.prototype, "direction", void 0);
    __decorate$1([
        Property(null)
    ], Axis.prototype, "background", void 0);
    __decorate$1([
        Property(null)
    ], Axis.prototype, "rangeGap", void 0);
    __decorate$1([
        Property(false)
    ], Axis.prototype, "startAndEndRangeGap", void 0);
    __decorate$1([
        Complex({}, Label)
    ], Axis.prototype, "labelStyle", void 0);
    return Axis;
}(ChildProperty));

/**
 * Specifies the gauge constant value
 */
/**
 * Sets and gets loaded event name in the circular gauge.
 *
 * @private
 */
var loaded = 'loaded';
/**
 * Sets and gets load event name in the circular gauge.
 *
 * @private
 */
var load = 'load';
/**
 * Sets and gets animation complete event name in the circular gauge.
 *
 * @private
 */
var animationComplete = 'animationComplete';
/**
 * Sets and gets axis label render event name in the circular gauge.
 *
 * @private
 */
var axisLabelRender = 'axisLabelRender';
/**
 * Sets and gets radius calculate event name in the circular gauge.
 *
 * @private
 */
var radiusCalculate = 'radiusCalculate';
/**
 * Sets and gets tooltip render event name in the circular gauge.
 *
 * @private
 */
var tooltipRender = 'tooltipRender';
/**
 * Sets and gets annotation render event name in the circular gauge.
 *
 * @private
 */
var annotationRender = 'annotationRender';
/**
 * Sets and gets gauge mouse move event name in the circular gauge.
 *
 * @private
 */
var gaugeMouseMove = 'gaugeMouseMove';
/**
 * Sets and gets gauge mouse leave event name in the circular gauge.
 *
 * @private
 */
var gaugeMouseLeave = 'gaugeMouseLeave';
/**
 * Sets and gets gauge mouse down event name in the circular gauge.
 *
 * @private
 */
var gaugeMouseDown = 'gaugeMouseDown';
/**
 * Sets and gets gauge mouse up event name in circular gauge.
 *
 * @private
 */
var gaugeMouseUp = 'gaugeMouseUp';
/**
 * Sets and gets drag start event name in the circular gauge.
 *
 * @private
 */
var dragStart = 'dragStart';
/**
 * Sets and gets drag move event name in the circular gauge.
 *
 * @private
 */
var dragMove = 'dragMove';
/**
 * Sets and gets drag end event name in the circular gauge.
 *
 * @private
 */
var dragEnd = 'dragEnd';
/**
 * Sets and gets resize event name in the circular gauge.
 *
 * @private
 */
var resized = 'resized';
/**
 * Sets and gets before print event name in the circular gauge.
 *
 * @private
 */
var beforePrint = 'beforePrint';
/**
 * Sets and gets pointer start event name in the circular gauge.
 *
 * @private
 */
var pointerStart = 'pointerStart';
/**
 * Sets and gets pointer move event name in the circular gauge.
 *
 * @private
 */
var pointerMove = 'pointerMove';
/**
 * Sets and gets pointer end event name in the circular gauge.
 *
 * @private
 */
var pointerEnd = 'pointerEnd';
/**
 * Sets and gets range start event name in the circular gauge.
 *
 * @private
 */
var rangeStart = 'rangeStart';
/**
 * Sets and gets range move event name in the circular gauge.
 *
 * @private
 */
var rangeMove = 'rangeMove';
/**
 * Sets and gets range end event name in the circular gauge.
 *
 * @private
 */
var rangeEnd = 'rangeEnd';

/**
 * Annotation Module handles the Annotation of the axis.
 *
 * @hidden
 */
var Annotations = /** @class */ (function () {
    /**
     * Constructor for Annotation module.
     *
     * @param {CircularGauge} gauge - Specifies the instance of the gauge.
     * @private.
     */
    // eslint-disable-next-line
    function Annotations(gauge) {
    }
    /**
     * Method to render the annotation for circular gauge.
     *
     * @private
     */
    Annotations.prototype.renderAnnotation = function (axis, index, gauge) {
        var _this = this;
        var width = gauge.availableSize.width;
        var element = createElement('div', {
            id: gauge.element.id + '_Annotations_' + index
        });
        element.style.opacity = gauge.allowLoadingAnimation ? '0' : '1';
        var parentElement = getElement(gauge.element.id + '_Secondary_Element');
        if (!isNullOrUndefined(document.getElementById(gauge.element.id + '_Secondary_Element'))) {
            document.getElementById(gauge.element.id + '_Secondary_Element').style.width = width + 'px';
        }
        axis.annotations.map(function (annotation, annotationIndex) {
            if (annotation.content !== null) {
                _this.createTemplate(element, annotationIndex, index, gauge);
            }
        });
        if (parentElement && element.childElementCount) {
            parentElement.appendChild(element);
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        gauge.renderReactTemplates();
    };
    /**
     * Method to annotation animation for circular gauge.
     *
     * @param {CircularGauge} gauge - Specifies the instance of gauge.
     * @returns {void}
     * @private
     */
    Annotations.prototype.annotationAnimation = function (gauge) {
        for (var i = 0; i < gauge.axes.length; i++) {
            var element = document.getElementById(gauge.element.id + '_Annotations_' + i);
            if (!isNullOrUndefined(element)) {
                if (element['style']['opacity'] === '0') {
                    this.annotationAnimate(element, gauge, i);
                }
            }
        }
    };
    /**
     * Method to annotation animation for circular gauge.
     *
     * @param {Element} element - Specifies the element.
     * @param {CircularGauge} gauge - Specifies the instance of gauge.
     * @param {number} axisIndex - Specifies the axis index.
     * @returns {void}
     */
    Annotations.prototype.annotationAnimate = function (element, gauge, axisIndex) {
        var tempOpacity = 0;
        var opacity = 1;
        new Animation$1({}).animate(element, {
            duration: gauge.loadingAnimationDuration[axisIndex],
            progress: function (args) {
                if (args.timeStamp > args.delay) {
                    tempOpacity = ((args.timeStamp - args.delay) / args.duration);
                    element['style']['opacity'] = (opacity * tempOpacity);
                }
            },
            end: function () {
                element['style']['opacity'] = opacity;
                gauge.isOverAllAnimationComplete = true;
            }
        });
    };
    /**
     * Method to create annotation template for circular gauge.
     *
     * @private
     */
    Annotations.prototype.createTemplate = function (element, annotationIndex, axisIndex, gauge) {
        var _this = this;
        var axis = gauge.axes[axisIndex];
        var annotation = axis.annotations[annotationIndex];
        var childElement = createElement('div', {
            id: gauge.element.id + '_Axis_' + axisIndex + '_Annotation_' + annotationIndex
        });
        childElement.style.cssText = 'position: absolute; z-index:' + annotation.zIndex + ';transform:' +
            (annotation.autoAngle ? 'rotate(' + (annotation.angle - 90) + 'deg)' : 'rotate(0deg)') + ';';
        var argsData = {
            cancel: false, name: annotationRender, content: annotation.content,
            axis: axis, annotation: annotation, textStyle: annotation.textStyle
        };
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        gauge.trigger('annotationRender', argsData, function (observedArgs) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            var templateFn;
            var templateElement;
            if (!argsData.cancel) {
                templateFn = getTemplateFunction(argsData.content, gauge);
                if (templateFn && templateFn(axis, gauge, argsData.content, gauge.element.id + '_Axis' + axisIndex + '_ContentTemplate' + annotationIndex).length) {
                    templateElement = Array.prototype.slice.call(templateFn(axis, gauge, argsData.content, gauge.element.id + '_Axis' + axisIndex + '_ContentTemplate' + annotationIndex));
                    var length_1 = templateElement.length;
                    for (var i = 0; i < length_1; i++) {
                        childElement.appendChild(templateElement[i]);
                    }
                }
                else {
                    var annotationElement = createElement('div', {
                        innerHTML: !isNullOrUndefined(argsData.content) ? argsData.content.toString() : null,
                        id: 'StringTemplate'
                    });
                    annotationElement.style.cssText = getFontStyle(argsData.textStyle);
                    childElement.appendChild(annotationElement);
                }
                _this.updateLocation(childElement, axis, annotation, gauge);
                element.appendChild(childElement);
            }
        });
    };
    /**
     * Method to update the annotation location for circular gauge.
     *
     * @param {HTMLElement} element - Specifies the element.
     * @param {Axis} axis - Specifies the axis.
     * @param {Annotation} annotation - Specifies the annotation.
     * @returns {void}
     */
    Annotations.prototype.updateLocation = function (element, axis, annotation, gauge) {
        var location = getLocationFromAngle(annotation.angle - 90, stringToNumber(annotation.radius, axis.currentRadius), gauge.midPoint);
        var elementRect = this.measureElementRect(element);
        element.style.left = (location.x - (elementRect.width / 2)) + 'px';
        element.style.top = (location.y - (elementRect.height / 2)) + 'px';
        element.setAttribute('aria-label', annotation.description || 'Annotation');
        element.setAttribute('role', 'region');
    };
    /**
     * Get module name.
     *
     * @returns {string} - Returns the module name
     */
    Annotations.prototype.getModuleName = function () {
        // Returns te module name
        return 'Annotations';
    };
    /**
     * To destroy the annotation.
     *
     * @returns {void}
     * @private
     */
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    Annotations.prototype.destroy = function () { };
    /**
     * Function to measure the element rect.
     *
     * @param {HTMLElement} element - Specifies the html element.
     * @returns {ClientRect} - Returns the client rect.
     * @private
     */
    Annotations.prototype.measureElementRect = function (element) {
        document.body.appendChild(element);
        var bounds = element.getBoundingClientRect();
        removeElement(element.id);
        return bounds;
    };
    return Annotations;
}());

/**
 * Specifies Circular-Gauge Tooltip Helper methods
 */
/**
 * Function to get the mouse position
 *
 * @param {number} pageX - Specifies the pageX value.
 * @param {number} pageY - Specifies the pageY value.
 * @param {Element} element - Specifies the element.
 * @returns {GaugeLocation} - Returns the location.
 *
 * @private
 */
function getMousePosition(pageX, pageY, element) {
    var elementRect = element.getBoundingClientRect();
    var pageXOffset = element.ownerDocument.defaultView.pageXOffset;
    var pageYOffset = element.ownerDocument.defaultView.pageYOffset;
    var clientTop = element.ownerDocument.documentElement.clientTop;
    var clientLeft = element.ownerDocument.documentElement.clientLeft;
    var positionX = elementRect.left + pageXOffset - clientLeft;
    var positionY = elementRect.top + pageYOffset - clientTop;
    return new GaugeLocation((pageX - positionX), (pageY - positionY));
}
/**
 * function to get the size of the element.
 *
 * @param {string} template - Specifies the template element.
 * @param {CircularGauge} gauge - Specifies the gauge instance.
 * @param {HTMLElement} parent - specifies the element.
 * @returns {Size} - Return the size of the element
 *
 * @private
 */
function getElementSize(template, gauge, parent) {
    var elementSize;
    var element;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    var templateFn = getTemplateFunction(template, gauge);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    var tooltipData = templateFn ? (gauge.isVue || gauge.isVue3) ? templateFn({}, gauge, null, gauge.element.id + 'Template')
        : templateFn({}, null, null, gauge.element.id + 'Template') : [];
    if (templateFn && tooltipData.length) {
        element = gauge.createElement('div', { id: gauge.element.id + '_Measure_Element' });
        gauge.element.appendChild(element);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        var templateElement = (gauge.isVue || gauge.isVue3) ? templateFn({}, gauge, null, gauge.element.id + 'Template')
            : templateFn({}, null, null, gauge.element.id + 'Template');
        var templateLength = templateElement.length;
        while (templateLength > 0) {
            element.appendChild(templateElement[0]);
            templateLength--;
        }
        parent.appendChild(element);
        elementSize = new Size(parent.getBoundingClientRect().width, parent.getBoundingClientRect().height);
        remove(element);
    }
    return elementSize;
}

/**
 * Specifies Circular-Gauge Common Helper methods
 */
/**
 * @param {number} maxWidth - Specifies the maximum width.
 * @param {string} text - Specifies the text.
 * @param {FontModel} font - Specifies the font.
 * @returns {string} - Returns the label.
 * @private */
function textTrim(maxWidth, text, font) {
    var label = text;
    var size = measureText(text, font).width;
    if (size > maxWidth) {
        var textLength = text.length;
        for (var i = textLength - 1; i >= 0; --i) {
            label = text.substring(0, i) + '...';
            size = measureText(label, font).width;
            if (size <= maxWidth) {
                return label;
            }
        }
    }
    return label;
}
/**
 * @param {string} text - Specifies the text.
 * @param {number} x - Specifies the x value.
 * @param {number} y - Specifies the y value.
 * @param {CircularGauge} gauge - Specifies the circular gauge.
 * @param {string} type - Specifies the type
 * @returns {void}
 * @private */
function showTooltip(text, x, y, gauge, type) {
    var tooltipRect = new Rect(gauge.margin.left, gauge.margin.top + 10, gauge.availableSize.width - (gauge.margin.left + gauge.margin.right), gauge.availableSize.height - (gauge.margin.top - gauge.margin.bottom));
    var id;
    var tooltip;
    if (type === 'Title') {
        id = gauge.element.id + '_EJ2_Title_Tooltip';
        tooltip = document.getElementById(id);
        var width = measureText(text, {
            fontFamily: 'Segoe UI', size: '12px',
            fontStyle: 'Normal', fontWeight: 'Regular'
        }).width + 5;
        tooltipRect.width = width < tooltipRect.width ? width : tooltipRect.width - 10;
        if (!tooltip) {
            removeTooltip();
        }
    }
    else if (type === 'LegendText') {
        id = gauge.element.id + '_EJ2_Legend_Tooltip';
        tooltip = document.getElementById(id);
        if (!tooltip) {
            removeTooltip();
        }
        var width = measureText(text, {
            fontFamily: 'Segoe UI', size: '12px',
            fontStyle: 'Normal', fontWeight: 'Regular'
        }).width + 5;
        x = (x + width > tooltipRect.width) ? x - width : x;
        tooltipRect.x = x < 0 ? 5 : x;
        tooltipRect.y = y;
        tooltipRect.width = width;
    }
    if (!tooltip) {
        tooltip = createElement('div', { id: id, className: 'EJ2-CircularGauge-Tooltip' });
        tooltip.innerText = text;
        tooltip.style.cssText = 'top:' + (tooltipRect.y + 15).toString() + 'px;left:' + (tooltipRect.x).toString() +
            'px; background-color: rgb(255, 255, 255) !important; color:black !important; ' +
            'position:absolute; border:1px solid rgb(112, 112, 112); padding-left : 3px; padding-right : 2px;' +
            'padding-bottom: 2px; padding-top : 2px; font-size:12px; text-align: center; font-family: "Segoe UI"; width:' + (tooltipRect.width) + 'px;';
        getElement(gauge.element.id + '_Secondary_Element').appendChild(tooltip);
    }
    else {
        tooltip.innerText = text;
        tooltip.style.top = (tooltipRect.y + 15).toString() + 'px';
        tooltip.style.left = (tooltipRect.x).toString() + 'px';
    }
}
/**
 * @param {Event} event - Specifies the event.
 * @param {number} x - Specifies the x value.
 * @param {number} y - Specifies the y value.
 * @param {CircularGauge} gauge - Specifies the gauge.
 * @param {boolean} isTitleTouch - Specifies the title touch with boolean.
 * @returns {void}
 * @private */
function titleTooltip(event, x, y, gauge, isTitleTouch) {
    var targetId = event.target.id;
    var elementArray = document.getElementsByClassName('EJ2-CircularGauge-Tooltip');
    if ((targetId === (gauge.element.id + '_CircularGaugeTitle')) && (event.target.textContent.indexOf('...') > -1)) {
        showTooltip(gauge.title, x, y, gauge, 'Title');
    }
    else if (event.target.textContent.indexOf('...') > -1 && targetId.indexOf('_gauge_legend_') > -1 &&
        gauge.legendSettings.visible) {
        var axisIndex = parseInt(targetId.split(gauge.element.id + '_gauge_legend_Axis_')[1].split('_text_')[0], 10);
        var rangeIndex = parseInt(targetId.split(gauge.element.id + '_gauge_legend_Axis_')[1].split('_text_')[1], 10);
        var text = '';
        for (var _i = 0, _a = gauge.legendModule.legendCollection; _i < _a.length; _i++) {
            var legends = _a[_i];
            if (legends.rangeIndex === rangeIndex && legends.axisIndex === axisIndex) {
                text = legends.originalText;
            }
        }
        showTooltip(text, x, y, gauge, 'LegendText');
    }
    else if (elementArray.length > 0 && (elementArray[0].id.indexOf('Title_Tooltip') > -1 ||
        elementArray[0].id.indexOf('Legend_Tooltip') > -1)) {
        removeTooltip();
    }
    if (isTitleTouch && !isNullOrUndefined(this)) {
        clearTimeout(this.clearTimeout);
        this.clearTimeout = setTimeout(removeTooltip.bind(this), 2000);
    }
}
/**
 * @returns {void}
 * @private */
function removeTooltip() {
    if (document.getElementsByClassName('EJ2-CircularGauge-Tooltip').length > 0) {
        document.getElementsByClassName('EJ2-CircularGauge-Tooltip')[0].remove();
    }
}

/**
 * Sets and gets the module that handles the tooltip of the circular gauge
 *
 * @hidden
 */
var GaugeTooltip = /** @class */ (function () {
    /**
     * Constructor for Tooltip module.
     *
     * @param {CircularGauge} gauge - Specifies the instance of the gauge.
     * @private.
     */
    function GaugeTooltip(gauge) {
        this.gauge = gauge;
        this.tooltipId = this.gauge.element.id + '_CircularGauge_Tooltip';
        this.tooltip = gauge.tooltip;
        this.addEventListener();
    }
    /**
     * Method to render the tooltip for circular gauge.
     *
     * @param {PointerEvent} e - specifies the event argument.
     * @returns {void}
     *
     * @private
     */
    GaugeTooltip.prototype.renderTooltip = function (e) {
        var _this = this;
        this.gaugeId = this.gauge.element.getAttribute('id');
        var pageX;
        var pageY;
        var target;
        var touchArg;
        var location;
        var samePointerEle = false;
        var isTooltipRender = false;
        if (e.type.indexOf('touch') !== -1) {
            touchArg = e;
            target = touchArg.target;
            pageX = touchArg.changedTouches[0].pageX;
            pageY = touchArg.changedTouches[0].pageY;
        }
        else {
            target = e.target;
            pageX = e.pageX;
            pageY = e.pageY;
        }
        if ((this.tooltip.type.indexOf('Pointer') > -1) && (target.id.indexOf('_Pointer_') >= 0) &&
            (target.id.indexOf(this.gaugeId) >= 0)) {
            if (this.pointerEle !== null) {
                samePointerEle = (this.pointerEle === target);
            }
            isTooltipRender = true;
            var svgRect_1 = this.gauge.svgObject.getBoundingClientRect();
            var elementRect = this.gauge.element.getBoundingClientRect();
            var axisRect_1 = document.getElementById(this.gauge.element.id + '_AxesCollection').getBoundingClientRect();
            var rect_1 = new Rect(Math.abs(elementRect.left - svgRect_1.left), Math.abs(elementRect.top - svgRect_1.top), svgRect_1.width, svgRect_1.height);
            var currentPointer = getPointer(target.id, this.gauge);
            this.currentAxis = this.gauge.axes[currentPointer.axisIndex];
            this.currentPointer = (this.currentAxis.pointers)[currentPointer.pointerIndex];
            var angle_1 = getAngleFromValue(this.currentPointer.currentValue, this.currentAxis.visibleRange.max, this.currentAxis.visibleRange.min, this.currentAxis.startAngle, this.currentAxis.endAngle, this.currentAxis.direction === 'ClockWise') % 360;
            var tooltipFormat = this.gauge.tooltip.format || this.currentAxis.labelStyle.format;
            var customLabelFormat = tooltipFormat && tooltipFormat.match('{value}') !== null;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            var format = this.gauge.intl.getNumberFormat({
                format: getLabelFormat(tooltipFormat), useGrouping: this.gauge.useGroupingSeparator
            });
            this.tooltipElement();
            if (this.tooltipEle.childElementCount !== 0 && !this.gauge.enablePointerDrag && !this.gauge.tooltip.showAtMousePosition) {
                return null;
            }
            var roundValue = this.roundedValue(this.currentPointer.currentValue);
            var pointerContent = customLabelFormat ?
                tooltipFormat.replace(new RegExp('{value}', 'g'), format(roundValue)) :
                format(roundValue);
            location = getLocationFromAngle(angle_1, this.currentAxis.currentRadius, this.gauge.midPoint);
            location.x = (this.tooltip.template && ((angle_1 >= 150 && angle_1 <= 250) || (angle_1 >= 330 && angle_1 <= 360) ||
                (angle_1 >= 0 && angle_1 <= 45))) ? (location.x + 10) : location.x;
            // eslint-disable-next-line prefer-const
            var tooltipArgs = {
                name: tooltipRender, cancel: false, content: pointerContent, location: location, axis: this.currentAxis,
                tooltip: this.tooltip, pointer: this.currentPointer, event: e, gauge: this.gauge, appendInBodyTag: false, type: 'Pointer'
            };
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            var pointerTooltip = function (tooltipArgs) {
                var template = tooltipArgs.tooltip.template;
                if (template !== null && template.length === 1 && typeof template !== 'function') {
                    template = template[template[0]];
                }
                if (!tooltipArgs.tooltip.showAtMousePosition) {
                    if (template) {
                        var elementSize = getElementSize(template, _this.gauge, _this.tooltipEle);
                        _this.tooltipRect = Math.abs(axisRect_1.left - svgRect_1.left) > elementSize.width ?
                            _this.findPosition(rect_1, angle_1, tooltipArgs.location, true) : rect_1;
                    }
                    else {
                        _this.findPosition(rect_1, angle_1, tooltipArgs.location, false);
                    }
                }
                else {
                    tooltipArgs.location = getMousePosition(pageX, pageY, _this.gauge.svgObject);
                    _this.tooltipRect = rect_1;
                }
                if (!tooltipArgs.cancel && !samePointerEle) {
                    var pointerTextStyle = {
                        color: tooltipArgs.tooltip.textStyle.color || _this.gauge.themeStyle.tooltipFontColor,
                        opacity: tooltipArgs.tooltip.textStyle.opacity || _this.gauge.themeStyle.tooltipTextOpacity,
                        fontFamily: tooltipArgs.tooltip.textStyle.fontFamily || _this.gauge.themeStyle.fontFamily,
                        fontWeight: tooltipArgs.tooltip.textStyle.fontWeight || _this.gauge.themeStyle.fontWeight,
                        fontStyle: tooltipArgs.tooltip.textStyle.fontStyle,
                        size: tooltipArgs.tooltip.textStyle.size || _this.gauge.themeStyle.tooltipFontSize
                    };
                    _this.svgTooltip = _this.svgTooltipCreate(_this.svgTooltip, tooltipArgs, template, _this.arrowInverted, _this.tooltipRect, _this.gauge, tooltipArgs.tooltip.fill, pointerTextStyle, tooltipArgs.tooltip.border);
                    _this.svgTooltip.opacity = _this.gauge.themeStyle.tooltipFillOpacity || _this.svgTooltip.opacity;
                    _this.svgTooltip.appendTo(_this.tooltipEle);
                    if (template && (_this.tooltipPosition === 'LeftTop' || _this.tooltipPosition === 'LeftBottom')) {
                        _this.tooltipEle.style.left = (parseFloat(_this.tooltipEle.style.left) - _this.tooltipEle.getBoundingClientRect().width - 20) + 'px';
                    }
                    if (template && Math.abs(pageY - _this.tooltipEle.getBoundingClientRect().top) <= 0) {
                        _this.tooltipEle.style.top = (parseFloat(_this.tooltipEle.style.top) + 20) + 'px';
                    }
                }
            };
            this.gauge.trigger(tooltipRender, tooltipArgs, pointerTooltip);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            this.gauge.renderReactTemplates();
        }
        else if ((this.tooltip.type.indexOf('Range') > -1) && (target.id.indexOf('_Range_') >= 0) && (!this.gauge.isDrag) &&
            (target.id.indexOf(this.gaugeId) >= 0)) {
            isTooltipRender = true;
            var rangeSvgRect_1 = this.gauge.svgObject.getBoundingClientRect();
            var rangeElementRect = this.gauge.element.getBoundingClientRect();
            var rangeAxisRect_1 = document.getElementById(this.gauge.element.id + '_AxesCollection').getBoundingClientRect();
            var rect_2 = new Rect(Math.abs(rangeElementRect.left - rangeSvgRect_1.left), Math.abs(rangeElementRect.top - rangeSvgRect_1.top), rangeSvgRect_1.width, rangeSvgRect_1.height);
            var currentRange = getPointer(target.id, this.gauge);
            this.currentAxis = this.gauge.axes[currentRange.axisIndex];
            this.currentRange = (this.currentAxis.ranges)[currentRange.pointerIndex];
            var rangeAngle_1 = getAngleFromValue((this.currentRange.end - Math.abs((this.currentRange.end - this.currentRange.start) / 2)), this.currentAxis.visibleRange.max, this.currentAxis.visibleRange.min, this.currentAxis.startAngle, this.currentAxis.endAngle, this.currentAxis.direction === 'ClockWise') % 360;
            var rangeTooltipFormat = this.gauge.tooltip.rangeSettings.format || this.currentAxis.labelStyle.format;
            var customLabelFormat = rangeTooltipFormat && (rangeTooltipFormat.match('{end}') !== null ||
                rangeTooltipFormat.match('{start}') !== null);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            var rangeFormat = this.gauge.intl.getNumberFormat({
                format: getLabelFormat(rangeTooltipFormat), useGrouping: this.gauge.useGroupingSeparator
            });
            this.tooltipElement();
            var roundStartValue = this.roundedValue(this.currentRange.start);
            var roundEndValue = this.roundedValue(this.currentRange.end);
            var startData_1 = (this.currentRange.start).toString();
            var endData_1 = (this.currentRange.end).toString();
            var rangeContent = customLabelFormat ?
                rangeTooltipFormat.replace(/{start}/g, startData_1).replace(/{end}/g, endData_1) : this.gauge.enableRtl ? 'Start:' + rangeFormat(roundStartValue) + ' <br>End:' + rangeFormat(roundEndValue) + ' ' :
                'Start : ' + rangeFormat(roundStartValue) + '<br>' + 'End : ' + rangeFormat(roundEndValue);
            location = getLocationFromAngle(rangeAngle_1, this.currentRange.currentRadius, this.gauge.midPoint);
            location.x = (this.tooltip.rangeSettings.template && ((rangeAngle_1 >= 150 && rangeAngle_1 <= 250) ||
                (rangeAngle_1 >= 330 && rangeAngle_1 <= 360) ||
                (rangeAngle_1 >= 0 && rangeAngle_1 <= 45))) ? (location.x + 10) : location.x;
            // eslint-disable-next-line prefer-const
            var rangeTooltipArgs = {
                name: tooltipRender, cancel: false, content: rangeContent, location: location, axis: this.currentAxis,
                tooltip: this.tooltip, range: this.currentRange, event: e, gauge: this.gauge, appendInBodyTag: false, type: 'Range'
            };
            var rangeTooltipTextStyle_1 = { color: this.gauge.tooltip.rangeSettings.textStyle.color, opacity: this.gauge.tooltip.rangeSettings.textStyle.opacity,
                fontFamily: this.gauge.tooltip.rangeSettings.textStyle.fontFamily, fontStyle: this.gauge.tooltip.rangeSettings.textStyle.fontStyle,
                fontWeight: this.gauge.tooltip.rangeSettings.textStyle.fontWeight, size: this.gauge.tooltip.rangeSettings.textStyle.size
            };
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            var rangeTooltip = function (rangeTooltipArgs) {
                var rangeTemplate = rangeTooltipArgs.tooltip.rangeSettings.template;
                if (rangeTemplate !== null && rangeTemplate.length === 1 && typeof rangeTemplate !== 'function') {
                    rangeTemplate = rangeTemplate[rangeTemplate[0]];
                }
                if (typeof rangeTemplate !== 'function' && rangeTemplate) {
                    rangeTemplate = rangeTemplate.replace(/[$]{start}/g, startData_1);
                    rangeTemplate = rangeTemplate.replace(/[$]{end}/g, endData_1);
                }
                if (!_this.tooltip.rangeSettings.showAtMousePosition) {
                    if (rangeTemplate) {
                        var elementSize = getElementSize(rangeTemplate, _this.gauge, _this.tooltipEle);
                        _this.tooltipRect = Math.abs(rangeAxisRect_1.left - rangeSvgRect_1.left) > elementSize.width ?
                            _this.findPosition(rect_2, rangeAngle_1, rangeTooltipArgs.location, true) : rect_2;
                    }
                    else {
                        _this.findPosition(rect_2, rangeAngle_1, rangeTooltipArgs.location, false);
                    }
                }
                else {
                    rangeTooltipArgs.location = getMousePosition(pageX, pageY, _this.gauge.svgObject);
                    _this.tooltipRect = rect_2;
                }
                if (!rangeTooltipArgs.cancel) {
                    rangeTooltipTextStyle_1.color = rangeTooltipArgs.tooltip.rangeSettings.textStyle.color ||
                        _this.gauge.themeStyle.tooltipFontColor;
                    rangeTooltipTextStyle_1.fontFamily = rangeTooltipArgs.tooltip.rangeSettings.textStyle.fontFamily
                        || _this.gauge.themeStyle.fontFamily;
                    rangeTooltipTextStyle_1.fontWeight = rangeTooltipArgs.tooltip.rangeSettings.textStyle.fontWeight
                        || _this.gauge.themeStyle.fontWeight;
                    rangeTooltipTextStyle_1.opacity = rangeTooltipArgs.tooltip.rangeSettings.textStyle.opacity ||
                        _this.gauge.themeStyle.tooltipTextOpacity;
                    rangeTooltipTextStyle_1.size = rangeTooltipArgs.tooltip.rangeSettings.textStyle.size
                        || _this.gauge.themeStyle.tooltipFontSize;
                    _this.svgTooltip = _this.svgTooltipCreate(_this.svgTooltip, rangeTooltipArgs, rangeTemplate, _this.arrowInverted, _this.tooltipRect, _this.gauge, rangeTooltipArgs.tooltip.rangeSettings.fill, rangeTooltipTextStyle_1, rangeTooltipArgs.tooltip.rangeSettings.border);
                    _this.svgTooltip.opacity = _this.gauge.themeStyle.tooltipFillOpacity || _this.svgTooltip.opacity;
                    _this.svgTooltip.appendTo(_this.tooltipEle);
                    if (rangeTemplate && (_this.tooltipPosition === 'LeftTop' || _this.tooltipPosition === 'LeftBottom')) {
                        _this.tooltipEle.style.left = (parseFloat(_this.tooltipEle.style.left) - _this.tooltipEle.getBoundingClientRect().width - 20) + 'px';
                    }
                    if (rangeTemplate && Math.abs(pageY - _this.tooltipEle.getBoundingClientRect().top) <= 0) {
                        _this.tooltipEle.style.top = (parseFloat(_this.tooltipEle.style.top) + 20) + 'px';
                    }
                }
            };
            this.gauge.trigger(tooltipRender, rangeTooltipArgs, rangeTooltip);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            this.gauge.renderReactTemplates();
        }
        else if ((this.tooltip.type.indexOf('Annotation') > -1) && this.checkParentAnnotationId(target) && ((!this.gauge.isDrag)) &&
            (this.annotationTargetElement.id.indexOf(this.gaugeId) >= 0)) {
            isTooltipRender = true;
            var annotationSvgRect = this.gauge.svgObject.getBoundingClientRect();
            var annotationElementRect = this.gauge.element.getBoundingClientRect();
            var rect_3 = new Rect(Math.abs(annotationElementRect.left - annotationSvgRect.left), Math.abs(annotationElementRect.top - annotationSvgRect.top), annotationSvgRect.width, annotationSvgRect.height);
            var currentAnnotation = getPointer(this.annotationTargetElement.id, this.gauge);
            this.currentAxis = this.gauge.axes[currentAnnotation.axisIndex];
            this.currentAnnotation = (this.currentAxis.annotations)[currentAnnotation.pointerIndex];
            var annotationAngle = (this.currentAnnotation.angle - 90);
            this.tooltipElement();
            document.getElementById(this.gauge.element.id + '_Secondary_Element').appendChild(this.tooltipEle);
            var annotationContent = (this.gauge.tooltip.annotationSettings.format !== null) ?
                this.gauge.tooltip.annotationSettings.format : '';
            location = getLocationFromAngle(annotationAngle, stringToNumber(this.currentAnnotation.radius, this.currentAxis.currentRadius), this.gauge.midPoint);
            location.x = (this.tooltip.annotationSettings.template && ((annotationAngle >= 150 && annotationAngle <= 250) ||
                (annotationAngle >= 330 && annotationAngle <= 360) || (annotationAngle >= 0 && annotationAngle <= 45))) ?
                (location.x + 10) : location.x;
            // eslint-disable-next-line prefer-const
            var annotationTooltipArgs = {
                name: tooltipRender, cancel: false, content: annotationContent, location: location, axis: this.currentAxis,
                tooltip: this.tooltip, annotation: this.currentAnnotation, event: e, gauge: this.gauge, appendInBodyTag: false,
                type: 'Annotation'
            };
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            var annotationTooltip = function (annotationTooltipArgs) {
                var annotationTemplate = annotationTooltipArgs.tooltip.annotationSettings.template;
                if (annotationTemplate !== null && annotationTemplate.length === 1 && typeof annotationTemplate !== 'function') {
                    annotationTemplate = annotationTemplate[annotationTemplate[0]];
                }
                var elementSizeAn = _this.annotationTargetElement.getBoundingClientRect();
                _this.tooltipPosition = 'RightTop';
                _this.arrowInverted = true;
                annotationTooltipArgs.location.x = annotationTooltipArgs.location.x + (elementSizeAn.width / 2);
                _this.tooltipRect = new Rect(rect_3.x, rect_3.y, rect_3.width, rect_3.height);
                if (!annotationTooltipArgs.cancel && (_this.gauge.tooltip.annotationSettings.format !== null ||
                    _this.gauge.tooltip.annotationSettings.template !== null)) {
                    var annotationTextStyle = {
                        color: annotationTooltipArgs.tooltip.textStyle.color || _this.gauge.themeStyle.tooltipFontColor,
                        fontFamily: annotationTooltipArgs.tooltip.textStyle.fontFamily || _this.gauge.themeStyle.fontFamily,
                        fontWeight: annotationTooltipArgs.tooltip.textStyle.fontWeight || _this.gauge.themeStyle.fontWeight,
                        opacity: annotationTooltipArgs.tooltip.textStyle.opacity || _this.gauge.themeStyle.tooltipTextOpacity,
                        fontStyle: annotationTooltipArgs.tooltip.textStyle.fontStyle,
                        size: annotationTooltipArgs.tooltip.textStyle.size || _this.gauge.themeStyle.tooltipFontSize
                    };
                    _this.svgTooltip = _this.svgTooltipCreate(_this.svgTooltip, annotationTooltipArgs, annotationTemplate, _this.arrowInverted, _this.tooltipRect, _this.gauge, annotationTooltipArgs.tooltip.annotationSettings.fill, annotationTextStyle, annotationTooltipArgs.tooltip.annotationSettings.border);
                    _this.svgTooltip.opacity = _this.gauge.themeStyle.tooltipFillOpacity || _this.svgTooltip.opacity;
                    _this.svgTooltip.appendTo(_this.tooltipEle);
                    if (annotationTemplate && Math.abs(pageY - _this.tooltipEle.getBoundingClientRect().top) <= 0) {
                        _this.tooltipEle.style.top = (parseFloat(_this.tooltipEle.style.top) + 20) + 'px';
                    }
                }
            };
            this.gauge.trigger(tooltipRender, annotationTooltipArgs, annotationTooltip);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            this.gauge.renderReactTemplates();
        }
        else if ((target.id === (this.gauge.element.id + '_CircularGaugeTitle') || target.id.indexOf('_gauge_legend_') > -1) &&
            (e.target.textContent.indexOf('...') > -1)) {
            titleTooltip(e, pageX, pageY, this.gauge, false);
        }
        else {
            var isTooltipRemoved = this.removeTooltip();
            if (isTooltipRemoved) {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                if ((this.gauge.isVue || this.gauge.isVue3)) {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    this.gauge.clearTemplate([this.tooltipEle.children[0].id], [0]);
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                }
                else if (!this.gauge.isAngular) {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    this.gauge.clearTemplate();
                }
            }
        }
        var gaugeElement = document.getElementById(this.gaugeId);
        var gaugeRect = gaugeElement.getBoundingClientRect();
        var tooltipRect = isTooltipRender ? this.tooltipEle.getBoundingClientRect() : null;
        if (isTooltipRender && this.tooltipEle.offsetLeft < 0 && (tooltipRect.left - gaugeRect.left) < 0) {
            var tooltipLeft = this.tooltipEle.style.left.split('px')[0];
            this.tooltipEle.style.left = parseInt(tooltipLeft, 10) + (gaugeRect.left - tooltipRect.left) + 'px';
        }
        if (isTooltipRender && tooltipRect.top < 0) {
            this.tooltipEle.style.top = 0 + 'px';
        }
    };
    /**
     * Method to create tooltip svg element.
     *
     * @param {Tooltip} svgTooltip - Specifies the tooltip element.
     * @param {ITooltipRenderEventArgs} tooltipArg - Specifies the tooltip arguments.
     * @param {string} template - Specifies the tooltip template.
     * @param {boolean} arrowInverted - Specifies the boolean value.
     * @param {Rect} tooltipRect - Specifies the rect element.
     * @param {CircularGauge} gauge - Specifies the gauge instance.
     * @param {string} fill - Spcifies the fill color of the tooltip.
     * @param {FontModel} textStyle - Spcifies the text style of the tooltip.
     * @param {BorderModel} border - Specifies the border of the tooltip.
     * @returns {Tooltip} - Returns the tooltip.
     */
    GaugeTooltip.prototype.svgTooltipCreate = function (svgTooltip, tooltipArg, template, arrowInverted, tooltipRect, gauge, fill, textStyle, border) {
        var borderObject = {
            color: border.color || this.gauge.themeStyle.tooltipBorderColor || '', width: border.width, dashArray: border.dashArray
        };
        svgTooltip = new Tooltip({
            theme: gauge.theme,
            enable: true,
            data: { value: tooltipArg.content },
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            template: template,
            enableRTL: gauge.enableRtl,
            enableAnimation: tooltipArg.tooltip.enableAnimation,
            content: [SanitizeHtmlHelper.sanitize(tooltipArg.content)],
            location: tooltipArg.location,
            inverted: arrowInverted,
            areaBounds: tooltipRect,
            fill: fill || gauge.themeStyle.tooltipFillColor,
            textStyle: textStyle,
            availableSize: gauge.availableSize,
            border: borderObject,
            enableShadow: true
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if ((gauge.isVue || gauge.isVue3)) {
            svgTooltip.controlInstance = gauge;
        }
        return svgTooltip;
    };
    /**
     * Method to create or modify tolltip element.
     *
     * @returns {void}
     */
    GaugeTooltip.prototype.tooltipElement = function () {
        if (document.getElementById(this.tooltipId)) {
            this.tooltipEle = document.getElementById(this.tooltipId);
        }
        else {
            this.tooltipEle = createElement('div', {
                id: this.tooltipId,
                className: 'EJ2-CircularGauge-Tooltip'
            });
            this.tooltipEle.style.cssText = 'position: absolute;pointer-events:none;';
            document.getElementById(this.gauge.element.id + '_Secondary_Element').appendChild(this.tooltipEle);
        }
    };
    /**
     * Method to get parent annotation element.
     *
     * @param {Element} child - Specifies the annotation element.
     * @returns {boolean} - Returns the boolean value.
     */
    GaugeTooltip.prototype.checkParentAnnotationId = function (child) {
        this.annotationTargetElement = child.parentElement;
        while (this.annotationTargetElement != null) {
            if ((this.annotationTargetElement.id.indexOf('_Annotation_') >= 0)) {
                child = this.annotationTargetElement;
                return true;
            }
            this.annotationTargetElement = this.annotationTargetElement.parentElement;
        }
        return false;
    };
    /**
     * Method to apply label rounding places.
     *
     * @param {number} currentValue - Specifies the current value.
     * @returns {number} - Returns the round number.
     */
    GaugeTooltip.prototype.roundedValue = function (currentValue) {
        var roundNumber = this.currentAxis.roundingPlaces ?
            parseFloat(currentValue.toFixed(this.currentAxis.roundingPlaces)) :
            currentValue;
        return roundNumber;
    };
    /**
     * Method to find the position of the tooltip anchor for circular gauge.
     *
     * @param {Rect} rect - Specifies the rect element.
     * @param {number} angle - Specifies the angle.
     * @param {GaugeLocation} location - Specifies the location.
     * @param {boolean} isTemplate - whether it is template or not .
     * @returns {Rect} - Returns the rect element.
     */
    GaugeTooltip.prototype.findPosition = function (rect, angle, location, isTemplate) {
        var addLeft;
        var addTop;
        var addHeight;
        var addWidth;
        var padding = 10;
        switch (true) {
            case (angle >= 0 && angle < 45):
                this.arrowInverted = true;
                addLeft = (angle >= 15 && angle <= 30) ? location.y : 0;
                this.tooltipRect = new Rect(rect.x, rect.y + addTop, rect.width, rect.height);
                this.tooltipPosition = 'RightBottom';
                break;
            case (angle >= 45 && angle < 90):
                this.arrowInverted = false;
                this.tooltipRect = new Rect(rect.x, rect.y + location.y, rect.width, rect.height);
                this.tooltipPosition = 'BottomRight';
                break;
            case (angle >= 90 && angle < 135):
                this.arrowInverted = false;
                this.tooltipRect = new Rect(rect.x, rect.y + location.y, rect.width, rect.height);
                this.tooltipPosition = 'BottomLeft';
                break;
            case (angle >= 135 && angle < 180):
                this.arrowInverted = isTemplate ? true : isTemplate;
                addTop = (angle >= 150 && angle <= 160 && isTemplate) ? location.y : 0;
                this.tooltipRect = new Rect(rect.x, rect.y + addTop, rect.width, rect.height);
                this.tooltipPosition = 'LeftBottom';
                break;
            case (angle >= 180 && angle < 225):
                this.arrowInverted = true;
                addHeight = (angle >= 200 && angle <= 225) ? Math.abs(rect.y - location.y) : rect.height;
                this.tooltipRect = new Rect(rect.x - location.x, rect.y, rect.width, addHeight);
                this.tooltipPosition = 'LeftTop';
                break;
            case (angle >= 225 && angle < 270):
                this.arrowInverted = false;
                addWidth = (angle >= 250 && angle <= 290) ? rect.width : Math.abs(rect.x - location.x);
                this.tooltipRect = new Rect(rect.x + padding, rect.y, addWidth, rect.height);
                this.tooltipPosition = 'TopLeft';
                break;
            case (angle >= 270 && angle < 315):
                this.arrowInverted = false;
                addLeft = (angle >= 270 && angle > 290) ? location.x - padding : 0;
                this.tooltipRect = new Rect(rect.x + addLeft, rect.y, rect.width, rect.height);
                this.tooltipPosition = 'TopRight';
                break;
            case (angle >= 315 && angle <= 360):
                this.arrowInverted = true;
                addHeight = (angle >= 315 && angle <= 340) ? Math.abs(rect.y - location.y) : rect.height;
                this.tooltipRect = new Rect(rect.x, rect.y, rect.width, addHeight);
                this.tooltipPosition = 'RightTop';
                break;
        }
        return this.tooltipRect;
    };
    GaugeTooltip.prototype.removeTooltip = function () {
        var isTooltipRemoved = false;
        if (document.getElementsByClassName('EJ2-CircularGauge-Tooltip').length > 0) {
            var tooltip = document.getElementsByClassName('EJ2-CircularGauge-Tooltip')[0];
            if (tooltip) {
                remove(tooltip);
                isTooltipRemoved = true;
            }
            this.pointerEle = null;
        }
        return isTooltipRemoved;
    };
    GaugeTooltip.prototype.mouseUpHandler = function (e) {
        this.removeTooltip();
        this.renderTooltip(e);
        clearTimeout(this.clearTimeout);
        this.clearTimeout = setTimeout(this.removeTooltip.bind(this), 2000);
    };
    // eslint-disable-next-line valid-jsdoc
    /**
     * To bind events for tooltip module
     *
     * @private
     */
    GaugeTooltip.prototype.addEventListener = function () {
        if (this.gauge.isDestroyed) {
            return;
        }
        this.gauge.on(Browser.touchMoveEvent, this.renderTooltip, this);
        this.gauge.on(Browser.touchEndEvent, this.mouseUpHandler, this);
        this.gauge.element.addEventListener('contextmenu', this.removeTooltip);
    };
    // eslint-disable-next-line valid-jsdoc
    /**
     * To unbind events for tooltip module
     *
     * @private
     */
    GaugeTooltip.prototype.removeEventListener = function () {
        if (this.gauge) {
            if (this.gauge.isDestroyed) {
                return;
            }
            this.gauge.off(Browser.touchMoveEvent, this.renderTooltip);
            this.gauge.off(Browser.touchEndEvent, this.mouseUpHandler);
            this.gauge.element.removeEventListener('contextmenu', this.removeTooltip);
        }
    };
    /**
     * Get module name.
     *
     * @returns {string} - Returns the module name
     */
    GaugeTooltip.prototype.getModuleName = function () {
        // Returns te module name
        return 'Tooltip';
    };
    /**
     * To destroy the tooltip.
     *
     * @returns {void}
     * @private
     */
    GaugeTooltip.prototype.destroy = function () {
        this.tooltipEle = null;
        this.currentAxis = null;
        this.tooltip = null;
        this.currentPointer = null;
        this.currentRange = null;
        this.currentAnnotation = null;
        if (!isNullOrUndefined(this.svgTooltip)) {
            this.svgTooltip.destroy();
            this.svgTooltip.controlInstance = null;
            removeElement(this.tooltipId);
        }
        this.svgTooltip = null;
        this.tooltipRect = null;
        this.pointerEle = null;
        this.annotationTargetElement = null;
        this.gauge = null;
    };
    return GaugeTooltip;
}());

/**
 * Specifies Circular-Gauge axis-panel Helper methods
 */
/**
 * Function to calculate the sum of array values.
 *
 * @param {number} from - Specifies the from value.
 * @param {number} to - Specifies the to value.
 * @param {number[]} values - Specifies the number.
 * @returns {number} - Returns the number.
 * @private
 */
function calculateSum(from, to, values) {
    var sum = 0;
    var length = values.length;
    for (; from < length; from++) {
        sum += values[from];
    }
    return sum;
}

/**
 * Specifies Circular-Gauge axis-render Helper methods
 */
/**
 * Function to get range color from value for circular gauge.
 *
 * @param {number} value - Specifies the value.
 * @param {Range[]} ranges - Specifies the ranges.
 * @param {string} color - Specifies the color.
 * @returns {string} - Returns the color.
 * @private
 */
function getRangeColor(value, ranges, color) {
    var min = 0;
    var max = 0;
    var currentRange = ranges.filter(function (range) {
        min = Math.min(range.start, range.end);
        max = Math.max(range.start, range.end);
        return (value >= min && max >= value);
    });
    return currentRange.length ? currentRange[0].rangeColor : color;
}

/**
 * Specifies the Axis rendering for circular gauge
 */
var AxisRenderer = /** @class */ (function () {
    /**
     * Constructor for axis renderer.
     *
     * @param {CircularGauge} gauge - Specifies the instance of the gauge
     * @private.
     */
    function AxisRenderer(gauge) {
        this.gauge = gauge;
    }
    /**
     * Method to render the axis element of the circular gauge.
     *
     * @param {Axis} axis - Specifies the axis.
     * @param {number} index - Specifies the index.
     * @param {Element} element - Specifies the element.
     * @param {CircularGauge} gauge - Specifies the gauge.
     * @returns {void}
     * @private
     */
    AxisRenderer.prototype.drawAxisOuterLine = function (axis, index, element, gauge) {
        var background = axis.background;
        this.setRangeColor(axis);
        if (background !== null) {
            appendPath(new PathOption(gauge.element.id + '_AxisOuterLine_' + index, background, 0, 'transparent', null, '0', getPathArc(gauge.midPoint, 0, 360, (Math.min(axis.rect.width, axis.rect.height) / 2)), '', 'pointer-events:none;'), element, gauge);
        }
    };
    /**
     * Method to check the angles.
     *
     * @param {Axis} axis - Specifies the axis.
     * @returns {void}
     * @private
     */
    AxisRenderer.prototype.checkAngles = function (axis) {
        axis.startAngle = axis.startAngle >= 360 ? 360 : axis.startAngle <= -360 ? -360 : axis.startAngle;
        axis.endAngle = axis.endAngle >= 360 ? 360 : axis.endAngle <= -360 ? -360 : axis.endAngle;
    };
    /**
     * Method to render the axis line of the circular gauge.
     *
     * @param {Axis} axis - Specifies the axis.
     * @param {number} index - Specifies the index.
     * @param {Element} element - Specifies the element.
     * @param {CircularGauge} gauge - Specifies the gauge.
     * @returns {void}
     * @private
     */
    AxisRenderer.prototype.drawAxisLine = function (axis, index, element, gauge) {
        var startAngle = axis.startAngle;
        var endAngle = axis.endAngle;
        var color = axis.lineStyle.color || this.gauge.themeStyle.lineColor;
        if (axis.lineStyle.width > 0 && this.gauge.allowComponentRender) {
            startAngle = !isCompleteAngle(startAngle, endAngle) ? startAngle : [0, endAngle = 360][0];
            appendPath(new PathOption(gauge.element.id + '_AxisLine_' + index, 'transparent', axis.lineStyle.width, color, null, axis.lineStyle.dashArray, getPathArc(gauge.midPoint, startAngle - 90, endAngle - 90, axis.currentRadius), '', gauge.allowLoadingAnimation ? 'visibility: hidden; pointer-events:none;' : 'pointer-events:none;'), element, gauge);
        }
    };
    /**
     * Method to render the axis labels of the circular gauge.
     *
     * @param {Axis} axis - Specifies the axis.
     * @param {number} index - Specifies the index.
     * @param {Element} element - Specifies the element.
     * @param {CircularGauge} gauge - Specifies the gauge.
     * @returns {void}
     * @private
     */
    AxisRenderer.prototype.drawAxisLabels = function (axis, index, element, gauge) {
        var labelElement = gauge.renderer.createGroup({
            id: gauge.element.id + '_Axis_Labels_' + index, style: gauge.allowLoadingAnimation ? 'visibility: hidden;' : 'pointer-events:auto;'
        });
        var min = axis.visibleRange.min;
        var max = axis.visibleRange.max;
        var labelCollection = axis.visibleLabels;
        var location;
        var textWidth;
        var textHeight;
        var labelsVisible = true;
        var currentTextWidth;
        var currentTextHeight;
        var previousLocation;
        var currentLocation;
        var lastLabelLocation;
        var lastLabelAngle;
        var lastLabelAnchor;
        var lastTextWidth;
        var lastTextHeight;
        var style = axis.labelStyle;
        var anchor;
        var angle;
        var label;
        var radius = axis.currentRadius;
        var checkLabelOpposed = 0;
        checkLabelOpposed = (style.position === 'Inside' && axis.majorTicks.position === 'Outside' &&
            axis.minorTicks.position === 'Outside') || (style.position === 'Outside' &&
            axis.minorTicks.position === 'Inside' && axis.majorTicks.position === 'Inside') ?
            axis.lineStyle.width + axis.currentRadius / 20 :
            (style.position === axis.majorTicks.position ? axis.currentRadius / 20 : axis.currentRadius / 40);
        var labelPadding = axis.labelStyle.shouldMaintainPadding ? 10 : checkLabelOpposed;
        var color = style.font.color || this.gauge.themeStyle.labelColor;
        if (style.position === 'Outside') {
            radius += (axis.nearSize - (axis.maxLabelSize.height + axis.lineStyle.width / 2)) + (labelPadding / 2);
        }
        else if (style.position === 'Cross') {
            radius = radius - (axis.maxLabelSize.height / 4) - axis.labelStyle.offset;
        }
        else {
            radius -= (axis.farSize - (axis.maxLabelSize.height + axis.lineStyle.width / 2) + (style.autoAngle ? labelPadding : 0));
        }
        //To get and store lastlabelposition
        if (axis.hideIntersectingLabel) {
            lastLabelAngle = Math.round(getAngleFromValue(labelCollection[labelCollection.length - 1].value, max, min, axis.startAngle, axis.endAngle, axis.direction === 'ClockWise'));
            lastLabelLocation = getLocationFromAngle(lastLabelAngle, radius, gauge.midPoint);
            lastLabelAnchor = this.findAnchor(lastLabelLocation, style, lastLabelAngle, labelCollection[labelCollection.length - 1]);
            lastTextWidth = (!axis.showLastLabel && (isCompleteAngle(axis.startAngle, axis.endAngle)) && (style.hiddenLabel !== 'First')) ?
                labelCollection[0].size.width : labelCollection[labelCollection.length - 1].size.width;
            lastTextHeight = (!axis.showLastLabel && (isCompleteAngle(axis.startAngle, axis.endAngle)) && (style.hiddenLabel !== 'First')) ?
                (!style.autoAngle ? labelCollection[0].size.height : labelCollection[0].size.width) :
                (!style.autoAngle ? labelCollection[labelCollection.length - 1].size.height :
                    labelCollection[labelCollection.length - 1].size.width);
            lastTextHeight = lastTextHeight - this.offsetAxisLabelsize(lastLabelAngle, lastTextHeight);
            lastLabelLocation = this.getAxisLabelStartPosition(lastLabelLocation, lastTextWidth, lastLabelAnchor);
        }
        for (var i = 0, length_1 = labelCollection.length; i < length_1; i++) {
            label = labelCollection[i];
            angle = Math.round(getAngleFromValue(label.value, max, min, axis.startAngle, axis.endAngle, axis.direction === 'ClockWise'));
            location = getLocationFromAngle(angle, radius, gauge.midPoint);
            anchor = this.findAnchor(location, style, angle, label);
            //To get the current label and previous label position for initial stage
            if (axis.hideIntersectingLabel) {
                currentLocation = getLocationFromAngle(angle, radius, gauge.midPoint);
                currentTextWidth = label.size.width;
                currentTextHeight = !style.autoAngle ? label.size.height : currentTextWidth;
                currentTextHeight = currentTextHeight - this.offsetAxisLabelsize(angle, currentTextHeight);
                currentLocation = this.getAxisLabelStartPosition(currentLocation, currentTextWidth, anchor);
                if (i === 0) {
                    previousLocation = getLocationFromAngle(angle, radius, gauge.midPoint);
                    textWidth = label.size.width;
                    textHeight = !style.autoAngle ? label.size.height : textWidth;
                    textHeight = textHeight - this.offsetAxisLabelsize(angle, textHeight);
                    previousLocation = this.getAxisLabelStartPosition(previousLocation, textWidth, anchor);
                }
            }
            if ((i === 0 && style.hiddenLabel === 'First') || (i === (length_1 - 1) && style.hiddenLabel === 'Last')) {
                continue;
            }
            var textFont = {
                size: style.font.size || this.gauge.themeStyle.fontSize,
                color: style.font.color,
                fontFamily: style.font.fontFamily || this.gauge.themeStyle.labelFontFamily,
                fontWeight: style.font.fontWeight || this.gauge.themeStyle.fontWeight,
                fontStyle: style.font.fontStyle,
                opacity: style.font.opacity
            };
            if (axis.hideIntersectingLabel && (i !== 0)) {
                //To remove the labels which is intersecting with last label.
                var lastlabel = ((i !== (labelCollection.length - 1)) && ((isCompleteAngle(axis.startAngle, axis.endAngle) ||
                    axis.showLastLabel))) ? this.FindAxisLabelCollision(lastLabelLocation, lastTextWidth, lastTextHeight, currentLocation, currentTextWidth, currentTextHeight) : true;
                //Checking wether the axis label is intersecting with previous label or not.
                labelsVisible = (this.FindAxisLabelCollision(previousLocation, textWidth, textHeight, currentLocation, currentTextWidth, currentTextHeight) && lastlabel);
            }
            else {
                labelsVisible = true;
            }
            if (labelsVisible || (i === labelCollection.length - 1)) {
                //To hide first and last label based on requirement
                label.text = (!axis.showLastLabel && ((isCompleteAngle(axis.startAngle, axis.endAngle) && style.hiddenLabel !== 'First') ||
                    !labelsVisible)
                    && axis.hideIntersectingLabel && (i === (length_1 - 1))) ? '' : label.text;
                label.text = (axis.showLastLabel && axis.hideIntersectingLabel && isCompleteAngle(axis.startAngle, axis.endAngle)
                    && (i === 0)) ? '' : label.text;
                var labelTextElement = textElement(new TextOption(gauge.element.id + '_Axis_' + index + '_Label_' + i, location.x, location.y, anchor, label.text, style.autoAngle ? 'rotate(' + (angle + 90) + ',' + (location.x) + ',' + location.y + ')' : '', 'auto'), textFont, style.useRangeColor ? getRangeColor(label.value, axis.ranges, color) : color, labelElement, 'pointer-events:auto;');
                labelTextElement.setAttribute('aria-label', label.text);
                labelTextElement.setAttribute('role', 'region');
                if (axis.hideIntersectingLabel) {
                    textWidth = label.size.width;
                    textHeight = !style.autoAngle ? label.size.height : textWidth;
                    textHeight = textHeight - this.offsetAxisLabelsize(angle, textHeight);
                    previousLocation.x = currentLocation.x;
                    previousLocation.y = currentLocation.y;
                }
            }
        }
        element.appendChild(labelElement);
    };
    /**
     * Method to find the anchor of the axis label.
     *
     * @param {GaugeLocation} location - Specifies the location.
     * @param {Label} style - Specifies the label style.
     * @param {number} angle - Specifies the angle.
     * @param {VisibleLabels} label - Specifies the labels.
     * @returns {string} - Returns the anchor.
     * @private
     */
    AxisRenderer.prototype.findAnchor = function (location, style, angle, label) {
        if (style.autoAngle) {
            return 'middle';
        }
        var anchor = style.position === 'Inside' ?
            ((angle > 120 && angle < 240) ? 'start' : ((300 < angle || angle < 60) ? 'end' : 'middle')) :
            ((angle > 120 && angle < 240) ? 'end' : ((300 < angle || angle < 60) ? 'start' : 'middle'));
        location.y += style.position === 'Inside' ?
            ((angle >= 240 && angle <= 300) ? (label.size.height / 2) :
                (angle >= 60 && angle <= 120) ? 0 : label.size.height / 4) :
            ((angle >= 240 && angle <= 300) ? 0 :
                (angle >= 60 && angle <= 120) ? label.size.height / 2 : label.size.height / 4);
        return anchor;
    };
    /**
     * Methode to check whether the labels are intersecting or not.
     *
     * @param {GaugeLocation} previousLocation - Specifies the previous location.
     * @param {number} previousWidth - Specifies the previous width.
     * @param {number} previousHeight - Specifies the previous height.
     * @param {GaugeLocation} currentLocation - Specifies the current location.
     * @param {number} currentWidth - Specifies the current width.
     * @param {number} currentHeight - Specifies the current height.
     * @returns {boolean} - Returns the boolean value.
     * @private
     */
    AxisRenderer.prototype.FindAxisLabelCollision = function (previousLocation, previousWidth, previousHeight, currentLocation, currentWidth, currentHeight) {
        var labelVisisble = ((previousLocation.x > (currentLocation.x + (currentWidth))) ||
            ((previousLocation.x + (previousWidth)) < (currentLocation.x)) ||
            ((previousLocation.y + (previousHeight)) < (currentLocation.y)) ||
            ((previousLocation.y) > (currentLocation.y + (currentHeight))));
        return labelVisisble;
    };
    /**
     * Methode to get anchor position of label as start.
     *
     * @param {GaugeLocation} actualLocation - Specifies the actual location.
     * @param {number} textWidth - Specifies the text width.
     * @param {string} anchorPosition - Specifies the anchor position.
     * @returns {GaugeLocation} - Returns the gauge location.
     * @private
     */
    AxisRenderer.prototype.getAxisLabelStartPosition = function (actualLocation, textWidth, anchorPosition) {
        if (anchorPosition === 'end') {
            actualLocation.x = actualLocation.x - textWidth;
        }
        else if (anchorPosition === 'middle') {
            actualLocation.x = actualLocation.x - (textWidth / 2);
        }
        return actualLocation;
    };
    /**
     * Methode to offset label height and width based on angle.
     *
     * @param {number} angle - Specifies the angle.
     * @param {number} size - Specifies the size.
     * @returns {number} - Returns the fineal size.
     * @private
     */
    AxisRenderer.prototype.offsetAxisLabelsize = function (angle, size) {
        var finalSize = ((angle >= 20 && angle <= 60) || (angle >= 120 && angle <= 160) || (angle >= 200 && angle <= 240) ||
            (angle >= 300 && angle <= 340)) ? size / 5 : 0;
        return finalSize;
    };
    /**
     * Method to render the axis minor tick lines of the circular gauge.
     *
     * @param {Axis} axis - Specifies the axis.
     * @param {number} index - Specifies the index.
     * @param {Element} element - Specifies the element.
     * @param {CircularGauge} gauge - Specifies the gauge.
     * @returns {void}
     * @private
     */
    AxisRenderer.prototype.drawMinorTickLines = function (axis, index, element, gauge) {
        var minorTickElements = gauge.renderer.createGroup({
            id: gauge.element.id + '_Axis_MinorTickLines_' + index
        });
        var minorLineStyle = axis.minorTicks;
        var minorInterval = minorLineStyle.interval !== null ?
            minorLineStyle.interval : (axis.visibleRange.interval / 2);
        var isRangeColor = minorLineStyle.useRangeColor;
        var color = minorLineStyle.color || this.gauge.themeStyle.minorTickColor;
        if (minorLineStyle.width && minorLineStyle.height && minorInterval) {
            var j = 0;
            for (var i = axis.visibleRange.min, max = axis.visibleRange.max; i <= max; i += minorInterval) {
                if (this.majorValues.indexOf(+i.toFixed(3)) < 0) {
                    var tickElement = appendPath(new PathOption(gauge.element.id + '_Axis_Minor_TickLine_' + index + '_' + j++, 'transparent', minorLineStyle.width, isRangeColor ? getRangeColor(i, axis.ranges, color) : color, null, minorLineStyle.dashArray, this.calculateTicks(i, minorLineStyle, axis), '', gauge.allowLoadingAnimation ? 'visibility: hidden;pointer-events: auto;' : 'pointer-events:auto;'), minorTickElements, gauge);
                    tickElement.setAttribute('data-interval', i.toString());
                }
            }
            element.appendChild(minorTickElements);
        }
    };
    /**
     * Method to render the axis major tick lines of the circular gauge.
     *
     * @param {Axis} axis - Specifies the axis.
     * @param {number} index - Specifies the index.
     * @param {Element} element - Specifies the element.
     * @param {CircularGauge} gauge - Specifies the gauge.
     * @returns {void}
     * @private
     */
    AxisRenderer.prototype.drawMajorTickLines = function (axis, index, element, gauge) {
        var majorTickElements = gauge.renderer.createGroup({
            id: gauge.element.id + '_Axis_MajorTickLines_' + index
        });
        var majorLineStyle = axis.majorTicks;
        var isRangeColor = majorLineStyle.useRangeColor;
        this.majorValues = [];
        var color = majorLineStyle.color || this.gauge.themeStyle.majorTickColor;
        if (majorLineStyle.width && majorLineStyle.height && axis.visibleRange.interval) {
            var j = 0;
            for (var i = axis.visibleRange.min, max = axis.visibleRange.max, interval = axis.visibleRange.interval; i <= max; i += interval) {
                this.majorValues.push(+i.toFixed(3));
                var tickElement = appendPath(new PathOption(gauge.element.id + '_Axis_Major_TickLine_' + index + '_' + j, 'transparent', majorLineStyle.width, isRangeColor ? getRangeColor(i, axis.ranges, color) : color, null, majorLineStyle.dashArray, this.calculateTicks(i, majorLineStyle, axis), '', gauge.allowLoadingAnimation ? 'visibility: hidden;pointer-events:auto;' : 'pointer-events:auto;'), majorTickElements, gauge);
                tickElement.setAttribute('data-interval', i.toString());
                j++;
            }
            element.appendChild(majorTickElements);
        }
    };
    /**
     * Method to calcualte the tick elements for the circular gauge.
     *
     * @param {number} value - Specifies the value.
     * @param {Tick} options - Specifies the options.
     * @param {Axis} axis - Specifies the axis.
     * @returns {string} - Returns the string.
     * @private
     */
    AxisRenderer.prototype.calculateTicks = function (value, options, axis) {
        var axisLineWidth = (axis.lineStyle.width / 2) + options.offset;
        var angle = getAngleFromValue(value, axis.visibleRange.max, axis.visibleRange.min, axis.startAngle, axis.endAngle, axis.direction === 'ClockWise');
        var start = getLocationFromAngle(angle, axis.currentRadius +
            (options.position === 'Outside' ? axisLineWidth : options.position === 'Cross' ?
                options.height / 2 - options.offset : -axisLineWidth), this.gauge.midPoint);
        var end = getLocationFromAngle(angle, axis.currentRadius +
            (options.position === 'Outside' ? axisLineWidth : options.position === 'Cross' ?
                options.height / 2 - options.offset : -axisLineWidth) +
            (options.position === 'Outside' ? options.height : -options.height), this.gauge.midPoint);
        return 'M ' + start.x + ' ' + start.y + ' L ' + end.x + ' ' + end.y + ' ';
    };
    /**
     * Method to render the range path of the circular gauge.
     *
     * @param {Axis} axis - Specifies the axis.
     * @param {Range} range - Specifies the range.
     * @param {number} startWidth - Specifies the startwidth for the range.
     * @param {number} endWidth - Specifies the endwidth for the range.
     * @param {number} rangeIndex - Specifies the index of the range.
     * @param {number} index - Specifies the index of the axis.
     * @param {Element} rangeElement - Specifies the element.
     * @param {number} colorIndex - Specifies the index of the lineargradient colorstop.
     * @returns {void}
     * @private
     */
    AxisRenderer.prototype.drawRangePath = function (axis, range, startWidth, endWidth, rangeIndex, index, rangeElement, colorIndex) {
        var startValue;
        var direction;
        var endValue;
        var location = this.gauge.midPoint;
        var startAngle;
        var endAngle;
        var isClockWise = axis.direction === 'ClockWise';
        var min = axis.visibleRange.min;
        var max = axis.visibleRange.max;
        var roundedStartAngle;
        var roundedEndAngle;
        var oldStart;
        var oldEnd;
        var gradientRangeColor;
        if (range.isLinearCircularGradient) {
            var rangeSplitValue = ((range.end - range.start) / range.linearGradient.colorStop.length);
            var rangeStart = range.linearGradient.colorStop.length > 1 ?
                (range.start + (rangeSplitValue * (colorIndex))) : range.start;
            var rangeEnd = range.linearGradient.colorStop.length > 1 ? (rangeStart + rangeSplitValue) : range.end;
            startValue = Math.min(Math.max(rangeStart, min), rangeEnd);
            endValue = Math.min(Math.max(rangeStart, rangeEnd), max);
        }
        else {
            startValue = Math.min(Math.max(range.start, min), range.end);
            endValue = Math.min(Math.max(range.start, range.end), max);
        }
        startAngle = getAngleFromValue(startValue, max, min, axis.startAngle, axis.endAngle, isClockWise);
        endAngle = getAngleFromValue(endValue, max, min, axis.startAngle, axis.endAngle, isClockWise);
        var isAngleCross360 = (startAngle > endAngle);
        if (axis.rangeGap != null && axis.rangeGap > 0 && range.start !== range.end
            || (!isNullOrUndefined(range.linearGradient) && !range.isLinearCircularGradient
                && (colorIndex === (!isNullOrUndefined(range.linearGradient.colorStop) && range.linearGradient.colorStop.length - 1)))) {
            startAngle = (rangeIndex === 0 && !axis.startAndEndRangeGap) ? startAngle :
                colorIndex === 0 && range.isLinearCircularGradient ? axis.direction === 'AntiClockWise' ?
                    startAngle - (axis.rangeGap / Math.PI) :
                    startAngle + (axis.rangeGap / Math.PI) : !range.isLinearCircularGradient
                    ? (axis.direction === 'AntiClockWise' ? startAngle - (axis.rangeGap / Math.PI) : startAngle + (axis.rangeGap / Math.PI)) : startAngle;
            endAngle = (rangeIndex === axis.ranges.length - 1 && !axis.startAndEndRangeGap) ? endAngle :
                !isNullOrUndefined(range.linearGradient) && colorIndex === range.linearGradient.colorStop.length - 1
                    && range.isLinearCircularGradient ?
                    axis.direction === 'AntiClockWise' ? endAngle + (axis.rangeGap / Math.PI) :
                        endAngle - (axis.rangeGap / Math.PI) : !range.isLinearCircularGradient ?
                    (axis.direction === 'AntiClockWise' ? endAngle + (axis.rangeGap / Math.PI) : endAngle - (axis.rangeGap / Math.PI)) : endAngle;
        }
        if (this.gauge.allowComponentRender) {
            if ((startValue !== endValue) && (isAngleCross360 ? startAngle < (endAngle + 360) : (startAngle < endAngle)) && ((range.start >= min && range.end <= max) || (range.end >= min && range.start <= max))) {
                endAngle = isClockWise ? endAngle : [startAngle, startAngle = endAngle][0];
                endWidth = isClockWise ? endWidth : [startWidth, startWidth = endWidth][0];
                var radius = typeof range.roundedCornerRadius === 'string' ? parseFloat(range.roundedCornerRadius) : range.roundedCornerRadius;
                var process = (radius * 0.25);
                var degreeValue = getDegree(startAngle, endAngle);
                oldStart = ((((range.currentRadius - (startWidth / 2)) * ((startAngle * Math.PI) / 180) -
                    (radius / process)) / (range.currentRadius - (startWidth / 2))) * 180) / Math.PI;
                oldEnd = ((((range.currentRadius - (endWidth / 2)) * ((endAngle * Math.PI) / 180) +
                    (radius / process)) / (range.currentRadius - (endWidth / 2))) * 180) / Math.PI;
                roundedStartAngle = ((((range.currentRadius) * ((startAngle * Math.PI) / 180) +
                    (degreeValue < (range.roundedCornerRadius / 2) && range.isLinearCircularGradient
                        ? degreeValue <= 1 ? 0 : (radius / 4) : radius)) / (range.currentRadius)) * 180) / Math.PI;
                roundedEndAngle = ((((range.currentRadius) * ((endAngle * Math.PI) / 180) -
                    (degreeValue < (range.roundedCornerRadius / 2) && range.isLinearCircularGradient
                        ? degreeValue <= 1 ? 0 : (radius / 4) : radius)) / (range.currentRadius)) * 180) / Math.PI;
                if (roundedStartAngle > roundedEndAngle && (roundedStartAngle - roundedEndAngle) <= radius) {
                    roundedStartAngle = startAngle;
                    roundedEndAngle = endAngle;
                }
                if (this.gauge.gradientModule && ((!isNullOrUndefined(range.linearGradient)
                    && !isNullOrUndefined(range.linearGradient.colorStop)) || (!isNullOrUndefined(range.radialGradient)
                    && !isNullOrUndefined(range.radialGradient.colorStop)))) {
                    if (range.isLinearCircularGradient) {
                        endAngle -= isCompleteAngle(startAngle, endAngle) ? 0.0001 : 0;
                        var degree = getDegree(startAngle, endAngle);
                        var rangeColorLength = range.linearGradient.colorStop.length;
                        var degreeRange = ((axis.startAngle === axis.endAngle ?
                            (axis.startAngle === 0 && axis.endAngle === 0 ? 360 : axis.startAngle) :
                            (axis.endAngle - axis.startAngle)) - degree * (rangeColorLength - 1));
                        var degreeRangeValue = void 0;
                        if (degreeRange <= 360 && degreeRange >= 270) {
                            degreeRangeValue = 270;
                        }
                        else if (degreeRange <= 270 && degreeRange >= 180) {
                            degreeRangeValue = 180;
                        }
                        else if (degreeRange <= 180 && degreeRange >= 90) {
                            degreeRangeValue = 90;
                        }
                        else if (degreeRange <= 90 && degreeRange >= 0) {
                            degreeRangeValue = 0;
                        }
                        var gradientDegree = axis.direction === 'AntiClockWise' ?
                            (axis.startAngle === axis.endAngle ? 0 : axis.startAngle) + degree * ((rangeColorLength - 1) - colorIndex)
                            : axis.startAngle + degree * (colorIndex);
                        var gradientAngle = axis.startAngle < axis.endAngle ? axis.direction === 'AntiClockWise'
                            ? axis.ranges.length > 1 ? rangeIndex === 0 ? (360 - (axis.startAngle
                                + (degree * (colorIndex)))) : (axis.startAngle + (degree * (colorIndex + 1))) :
                                axis.startAngle + (degreeRangeValue + degree * ((rangeColorLength - 1) - colorIndex)) : axis.startAngle
                            + (degree * (colorIndex)) : axis.endAngle === 360 || axis.startAngle === axis.endAngle
                            ? axis.direction === 'AntiClockWise' ? axis.startAngle === axis.endAngle ?
                                (axis.startAngle === 0 && axis.endAngle === 0 ? 0 : 360) - axis.startAngle +
                                    degreeRangeValue + (degree * ((rangeColorLength - 1) - colorIndex))
                                : degree * ((rangeColorLength - 1) - colorIndex) : degree * (colorIndex) :
                            gradientDegree < 360 ? gradientDegree : gradientDegree - 360;
                        range.gradientAngle = rangeIndex === 0 ? axis.rangeGap ? gradientAngle + axis.rangeGap
                            : gradientAngle : axis.rangeGap > 0 ? axis.ranges[rangeIndex - 1]['gradientAngle'] + axis.rangeGap
                            : axis.ranges[rangeIndex - 1]['gradientAngle'];
                        if (axis.direction === 'AntiClockWise' && (axis.ranges.length > 1
                            ? colorIndex === rangeColorLength - 1 : colorIndex === 0)) {
                            range.gradientAntiAngle = gradientAngle;
                        }
                        if (rangeIndex !== 0) {
                            gradientAngle = axis.direction === 'AntiClockWise' ? axis.ranges.length > 1 ?
                                axis.ranges[rangeIndex - 1]['gradientAntiAngle'] - gradientAngle + axis.startAngle :
                                axis.ranges[rangeIndex - 1]['gradientAntiAngle'] + gradientAngle :
                                range.gradientAngle + gradientAngle - axis.startAngle;
                            range.gradientAngle = axis.rangeGap != null && axis.rangeGap > 0 ? colorIndex === rangeColorLength - 1 ?
                                gradientAngle + axis.ranges[rangeIndex - 1]['gradientAngle'] : gradientAngle : gradientAngle;
                            if (axis.direction === 'AntiClockWise' && (axis.ranges.length > 1
                                ? colorIndex === rangeColorLength - 1 : colorIndex === 0)) {
                                range.gradientAntiAngle = gradientAngle;
                            }
                        }
                        if (gradientAngle > 45 && gradientAngle <= 115
                            || (gradientAngle >= 0 && gradientAngle <= 45 && (rangeColorLength - 1) <= 2)) {
                            direction = axis.direction === 'AntiClockWise' ? 'bottom' : 'top';
                        }
                        else if (gradientAngle > 115 && gradientAngle < 170) {
                            direction = axis.direction === 'AntiClockWise' ? 'left' : 'right';
                        }
                        else if (gradientAngle >= 170 && gradientAngle <= 280) {
                            direction = axis.direction === 'AntiClockWise' ? 'top' : 'bottom';
                        }
                        else if (gradientAngle > 280 && gradientAngle <= 360
                            || (gradientAngle >= 0 && gradientAngle <= 45 && (rangeColorLength - 1) >= 2)) {
                            direction = axis.direction === 'AntiClockWise' ? 'right' : 'left';
                        }
                    }
                    gradientRangeColor = this.gauge.gradientModule.getGradientColorString(range, colorIndex, direction, rangeIndex);
                }
                range.rangeColor = gradientRangeColor ? gradientRangeColor : range.rangeColor;
                if (range.roundedCornerRadius) {
                    if (range.isLinearCircularGradient && range.linearGradient.colorStop.length > 1) {
                        if (colorIndex === 0 || colorIndex === range.linearGradient.colorStop.length - 1) {
                            if (axis.direction === 'ClockWise') {
                                this.roundedRangeAppendPathCalculation(range, rangeIndex, index, startWidth, endWidth, rangeElement, (colorIndex === range.linearGradient.colorStop.length - 1
                                    ? Math.floor(startAngle) : Math.floor(roundedStartAngle)), (colorIndex !== 0 ? Math.ceil(roundedEndAngle) : Math.ceil(endAngle)), ((colorIndex === range.linearGradient.colorStop.length - 1) ? startAngle : oldStart), (colorIndex !== 0 ? oldEnd : endAngle), location, colorIndex);
                            }
                            else {
                                this.roundedRangeAppendPathCalculation(range, rangeIndex, index, startWidth, endWidth, rangeElement, (colorIndex === 0 ? Math.floor(startAngle) : Math.floor(roundedStartAngle)), (colorIndex === range.linearGradient.colorStop.length - 1
                                    ? Math.ceil(endAngle) : Math.ceil(roundedEndAngle)), ((colorIndex === 0) ? startAngle : oldStart), (colorIndex === range.linearGradient.colorStop.length - 1 ? endAngle : oldEnd), location, colorIndex);
                            }
                        }
                        else {
                            this.rangeAppendPathCalculation(range, rangeIndex, index, startWidth, endWidth, rangeElement, Math.floor(startAngle), Math.ceil(endAngle), colorIndex);
                        }
                    }
                    else {
                        this.roundedRangeAppendPathCalculation(range, rangeIndex, index, startWidth, endWidth, rangeElement, Math.floor(roundedStartAngle), Math.ceil(roundedEndAngle), oldStart, oldEnd, location, colorIndex);
                    }
                }
                else {
                    this.rangeAppendPathCalculation(range, rangeIndex, index, startWidth, endWidth, rangeElement, Math.floor(startAngle), Math.ceil(endAngle), colorIndex);
                }
            }
            else if ((range.start === range.end) && ((range.start >= min && range.end <= max) || (range.end >= min && range.start <= max))) {
                this.rangeAppendPathCalculation(range, rangeIndex, index, startWidth, endWidth, rangeElement, Math.floor(startAngle), Math.ceil(endAngle), colorIndex);
            }
        }
    };
    /**
     * Method to render the rounded range path of the circular gauge.
     *
     * @param {Range} range - Specifies the range.
     * @param {number} rangeIndex - Specifies the index of the range.
     * @param {number} index - Specifies the index of the axis.
     * @param {number} startWidth - Specifies the startwidth for the range.
     * @param {number} endWidth - Specifies the endwidth for the range.
     * @param {Element} rangeElement - Specifies the element.
     * @param {number} roundedStartAngle - Specifies the rounded path of the start angle.
     * @param {number} roundedEndAngle - Specifies the rounded path of the end angle.
     * @param {number} oldStart - Specifies the rounded path of the old start value.
     * @param {number} oldEnd - Specifies the rounded path of the old end value..
     * @param {GaugeLocation} location - Specifies the location.
     * @param {number} colorIndex - Specifies the index of the lineargradient colorstop.
     * @returns {void}
     * @private
     */
    AxisRenderer.prototype.roundedRangeAppendPathCalculation = function (range, rangeIndex, index, startWidth, endWidth, rangeElement, roundedStartAngle, roundedEndAngle, oldStart, oldEnd, location, colorIndex) {
        range.pathElement.push(appendPath(new PathOption((!range.isLinearCircularGradient ? this.gauge.element.id + '_Axis_' + index + '_Range_' + rangeIndex
            : this.gauge.element.id + '_Axis_' + index + '_Range_' + rangeIndex + '_Circular_' + colorIndex), range.rangeColor, 0, range.rangeColor, range.opacity, '0', getRoundedPathArc(location, Math.floor(roundedStartAngle), Math.ceil(roundedEndAngle), oldStart, oldEnd, range.currentRadius, startWidth, endWidth, range, this.gauge.axes[index]), '', ''), rangeElement, this.gauge));
    };
    /**
     * Method to render the rounded range path of the circular gauge.
     *
     * @param {Range} range - Specifies the range.
     * @param {number} rangeIndex - Specifies the index of the range.
     * @param {number} index - Specifies the index of the axis.
     * @param {number} startWidth - Specifies the startwidth for the range.
     * @param {number} endWidth - Specifies the endwidth for the range.
     * @param {Element} rangeElement - Specifies the element.
     * @param {number} startAngle - Specifies the rounded path of the start angle.
     * @param {number} endAngle - Specifies the rounded path of the end angle.
     * @param {number} colorIndex - Specifies the index of the lineargradient colorstop.
     * @returns {void}
     * @private
     */
    AxisRenderer.prototype.rangeAppendPathCalculation = function (range, rangeIndex, index, startWidth, endWidth, rangeElement, startAngle, endAngle, colorIndex) {
        range.pathElement.push(appendPath(new PathOption(!range.isLinearCircularGradient ? this.gauge.element.id + '_Axis_' + index + '_Range_' +
            rangeIndex : this.gauge.element.id + '_Axis_' + index + '_Range_' +
            rangeIndex + '_Circular_' + colorIndex, range.rangeColor, 0, range.rangeColor, range.opacity, '0', getPathArc(this.gauge.midPoint, Math.floor(startAngle), Math.ceil(endAngle), range.currentRadius, startWidth, endWidth, range, this.gauge.axes[index]), '', ''), rangeElement, this.gauge));
    };
    /**
     * Method to render the axis range of the circular gauge.
     *
     * @param {Axis} axis - Specifies the axis.
     * @param {number} index - Specifies the index.
     * @param {Element} element - Specifies the element.
     * @returns {void}
     * @private
     */
    AxisRenderer.prototype.drawAxisRange = function (axis, index, element) {
        var _this = this;
        var ele = (document.getElementById(this.gauge.element.id + '_Axis_Ranges_ ' + index));
        var rangeElement = (ele) ? document.getElementById(this.gauge.element.id + '_Axis_Ranges_ ' + index) :
            this.gauge.renderer.createGroup({ id: this.gauge.element.id + '_Axis_Ranges_' + index,
                style: this.gauge.allowLoadingAnimation ? 'opacity: 0;' : '' });
        var startWidth;
        var startEndDifference;
        var endWidth;
        var previousEndWidth;
        var previousStartWidth;
        axis.ranges.map(function (range, rangeIndex) {
            range.isLinearCircularGradient = !isNullOrUndefined(_this.gauge.gradientModule)
                && !isNullOrUndefined(range.linearGradient) && isNullOrUndefined(range.linearGradient.startValue)
                && isNullOrUndefined(range.linearGradient.endValue) && !isNullOrUndefined(range.linearGradient.colorStop);
            range.pathElement = [];
            if (!isNullOrUndefined(range.offset) && range.offset.length > 0) {
                range.currentDistanceFromScale = stringToNumber(range.offset, axis.currentRadius);
            }
            else {
                range.currentDistanceFromScale = range.offset;
            }
            _this.calculateRangeRadius(axis, range);
            if (!isNullOrUndefined(range.startWidth) && range.startWidth.length > 0) {
                startWidth = toPixel(range.startWidth, range.currentRadius);
            }
            else {
                startWidth = range.startWidth;
            }
            if (!isNullOrUndefined(range.endWidth) && range.endWidth.length > 0) {
                endWidth = toPixel(range.endWidth, range.currentRadius);
            }
            else {
                endWidth = range.endWidth;
            }
            range.currentRadius = _this.calculateRangeRadiusWithPosition(axis, range, startWidth);
            if (range.isLinearCircularGradient) {
                for (var i = 0; i < range.linearGradient.colorStop.length; i++) {
                    if (i <= (range.linearGradient.colorStop.length - 1)) {
                        previousEndWidth = i === 0 ? endWidth : previousEndWidth;
                        previousStartWidth = i === 0 ? startWidth : previousStartWidth;
                        startEndDifference = (Math.abs(previousStartWidth - previousEndWidth) / (range.linearGradient.colorStop.length));
                        if (i > 0) {
                            startWidth = endWidth;
                            endWidth = previousStartWidth > previousEndWidth ? startWidth - startEndDifference
                                : startWidth + startEndDifference;
                        }
                        else {
                            endWidth = previousStartWidth > previousEndWidth ? startWidth - startEndDifference
                                : startWidth + startEndDifference;
                        }
                    }
                    else {
                        startWidth = previousStartWidth > previousEndWidth ? startWidth - startEndDifference
                            : startWidth + startEndDifference;
                        endWidth = (previousEndWidth);
                    }
                    _this.drawRangePath(axis, range, startWidth, endWidth, rangeIndex, index, rangeElement, i);
                }
            }
            else {
                if (!(range.start === range.end && axis.direction === 'AntiClockWise' && axis.startAngle === axis.endAngle)) {
                    _this.drawRangePath(axis, range, startWidth, endWidth, rangeIndex, index, rangeElement, null);
                }
            }
        });
        element.appendChild(rangeElement);
    };
    /**
     * Method to calculate the radius of the axis range.
     *
     * @return {void}
     */
    AxisRenderer.prototype.calculateRangeRadius = function (axis, range) {
        var radius = range.radius !== null ? range.radius : '100%';
        range.currentRadius = stringToNumber(radius, axis.currentRadius);
    };
    AxisRenderer.prototype.calculateRangeRadiusWithPosition = function (axis, range, startWidth) {
        var actualRadius = !isNullOrUndefined(range.position) && range.position !== 'Auto' && isNullOrUndefined(range.radius) ?
            (range.position === 'Outside' ? (range.currentRadius + axis.lineStyle.width / 2 + range.currentDistanceFromScale) :
                range.position === 'Inside' ? (range.currentRadius - axis.lineStyle.width / 2 - range.currentDistanceFromScale) :
                    (range.currentRadius + startWidth / 2 - range.currentDistanceFromScale)) : range.currentRadius;
        return actualRadius;
    };
    /**
     * Method to get the range color of the circular gauge.
     *
     * @param {Axis} axis - Specifies the axis
     * @returns {void}
     * @private
     */
    AxisRenderer.prototype.setRangeColor = function (axis) {
        var rangeColors = getRangePalette(this.gauge.theme);
        axis.ranges.map(function (range, index) {
            range.rangeColor = range.color ? range.color : rangeColors[index % rangeColors.length];
        });
    };
    /**
     *
     * @returns {void}
     * @private
     */
    AxisRenderer.prototype.destroy = function () {
        this.gauge = null;
        this.majorValues = [];
    };
    return AxisRenderer;
}());

/**
 * Specifies Circular-Gauge pointer-render Helper methods
 */
/**
 * Function to calculate the value for linear animation effect
 *
 * @param {number} currentTime - Specifies the currentTime.
 * @param {number} startValue - Specifies the startValue.
 * @param {number} endValue - Specifies the endValue.
 * @param {number} duration - Specifies the duration.
 * @returns {number} - Returns the number.
 * @private
 */
function linear(currentTime, startValue, endValue, duration) {
    return -endValue * Math.cos(currentTime / duration * (Math.PI / 2)) + endValue + startValue;
}
/**
 * Function to calculate the complete path arc of the circular gauge.
 *
 * @param {GaugeLocation} center - Specifies the center value.
 * @param {number} start - Specifies the start value.
 * @param {number} end - Specifies the end value.
 * @param {number} radius - Specifies the radius value.
 * @param {number} innerRadius - Specifies the innerRadius value.
 * @param {boolean} checkMinValue - Specifies the checkMinValue value.
 * @returns {string} - Returns the path value.
 * @private
 */
function getCompleteArc(center, start, end, radius, innerRadius, checkMinValue) {
    end -= isCompleteAngle(start, end) && !checkMinValue ? 0.0001 : 0;
    var degree = getDegree(start, end);
    return getCompletePath(center, getLocationFromAngle(start, radius, center), getLocationFromAngle(end, radius, center), radius, getLocationFromAngle(start, innerRadius, center), getLocationFromAngle(end, innerRadius, center), innerRadius, (degree < 180) ? 0 : 1);
}
/**
 * Function to get the complete path direction of the circular gauge.
 *
 * @param {GaugeLocation} center - Specifies the center value.
 * @param {GaugeLocation} start - Specifies the start value.
 * @param {GaugeLocation} end - Specifies the end value.
 * @param {number} radius - Specifies the radius value.
 * @param {GaugeLocation} innerStart - Specifies the innerStart value.
 * @param {GaugeLocation} innerEnd - Specifies the innerEnd value.
 * @param {number} innerRadius - Specifies the innerRadius value.
 * @param {number} clockWise - Specifies the clockWise.
 * @returns {string} - Returns the path.
 * @private
 */
function getCompletePath(center, start, end, radius, innerStart, innerEnd, innerRadius, clockWise) {
    return 'M ' + start.x + ' ' + start.y + ' A ' + radius + ' ' + radius + ' 0 ' + clockWise +
        ' 1 ' + end.x + ' ' + end.y + ' L ' + innerEnd.x + ' ' + innerEnd.y + ' A ' + innerRadius +
        ' ' + innerRadius + ' 0 ' + clockWise + ',0 ' + innerStart.x + ' ' + innerStart.y + ' Z';
}

/**
 * Specifies the Axis rendering for circular gauge
 */
var PointerRenderer = /** @class */ (function () {
    /**
     * Constructor for pointer renderer.
     *
     * @param {CircularGauge} gauge - Specifies the instance of the gauge.
     * @private.
     */
    function PointerRenderer(gauge) {
        this.gauge = gauge;
    }
    /**
     * Method to render the axis pointers of the circular gauge.
     *
     * @param {Axis} axis - Specifies the axis.
     * @param {number} axisIndex - Specifies the axis index.
     * @param {Element} element - Specifies the element.
     * @param {CircularGauge} gauge - Specifies the instance of the gauge.
     * @param {boolean} animate - Specifies the boolean value.
     * @returns {void}
     * @private
     */
    PointerRenderer.prototype.drawPointers = function (axis, axisIndex, element, gauge, animate) {
        var _this = this;
        if (animate === void 0) { animate = true; }
        var pointerElement = gauge.renderer.createGroup({
            id: gauge.element.id + '_Axis_Pointers_' + axisIndex
        });
        var childElement;
        if (this.gauge.allowComponentRender) {
            axis.pointers.map(function (pointer, pointerIndex) {
                if (!isNullOrUndefined(pointer.offset) && pointer.offset.length > 0) {
                    pointer.currentDistanceFromScale = stringToNumber(pointer.offset, axis.currentRadius);
                }
                else {
                    pointer.currentDistanceFromScale = pointer.offset;
                }
                pointer.pathElement = [];
                _this.calculatePointerRadius(axis, pointer);
                if (!gauge.allowPointerDrag) {
                    gauge.allowPointerDrag = pointer.enableDrag;
                }
                childElement = gauge.renderer.createGroup({
                    id: gauge.element.id + '_Axis_' + axisIndex + '_Pointer_' + pointerIndex
                });
                if (pointer.value != null) {
                    childElement.setAttribute('aria-label', pointer.description || 'Pointer:' + pointer.value.toString());
                    childElement.setAttribute('role', 'region');
                }
                _this['draw' + pointer.type + 'Pointer'](axis, axisIndex, pointerIndex, childElement, gauge);
                if (_this.gauge.allowLoadingAnimation) {
                    childElement.style.visibility = 'hidden';
                }
                else {
                    _this.setPointerValue(axis, pointer, pointer.currentValue);
                }
                pointerElement.appendChild(childElement);
                if (!_this.gauge.allowLoadingAnimation && ((animate || pointer.animation.enable) || animationMode === 'Enable') && (!_this.gauge.isPropertyChange || pointer.isPointerAnimation)) {
                    pointer.previousValue = !_this.gauge.isPropertyChange ? axis.minimum : pointer.previousValue;
                    _this.doPointerAnimation(childElement, pointer, axis, axisIndex);
                }
            });
            element.appendChild(pointerElement);
        }
    };
    /**
     * Measure the pointer length of the circular gauge.
     *
     * @returns {void}
     */
    PointerRenderer.prototype.calculatePointerRadius = function (axis, pointer) {
        var padding = 5;
        pointer.currentRadius = !isNullOrUndefined(pointer.radius) ?
            stringToNumber(pointer.radius, axis.currentRadius) : pointer.position !== 'Auto' ?
            this.pointerRadiusForPosition(axis, pointer) : (axis.currentRadius - (axis.farSize + padding));
    };
    /**
     * Measure the pointer length of the circular gauge based on pointer position.
     *
     * @returns {number}
     */
    PointerRenderer.prototype.pointerRadiusForPosition = function (axis, pointer) {
        if (pointer.markerShape === 'Text') {
            var pointerRadius = void 0;
            var pointerSize = parseInt(pointer.textStyle.size, 10);
            var markerOffset = pointer.position === 'Cross' ? pointerSize / 5 : 0;
            // eslint-disable-next-line prefer-const
            pointerRadius = pointer.position === 'Inside' ?
                (axis.currentRadius - pointerSize / 1.2 - axis.lineStyle.width / 2 - markerOffset - pointer.currentDistanceFromScale) :
                pointer.position === 'Outside' ?
                    (axis.currentRadius + axis.lineStyle.width / 2 + pointerSize / 4 + markerOffset +
                        pointer.currentDistanceFromScale) :
                    (axis.currentRadius - pointerSize / 6 - markerOffset - pointer.currentDistanceFromScale);
            return pointerRadius;
        }
        else {
            var pointerRadius = void 0;
            var rangeBarOffset = pointer.type === 'RangeBar' ? pointer.pointerWidth : 0;
            var markerOffset = pointer.type === 'Marker' ? ((pointer.markerShape === 'InvertedTriangle' ||
                pointer.markerShape === 'Triangle') ? (pointer.position === 'Cross' ? pointer.markerWidth / 2 : 0) :
                pointer.markerWidth / 2) : 0;
            // eslint-disable-next-line prefer-const
            pointerRadius = pointer.position === 'Inside' ?
                (axis.currentRadius - axis.lineStyle.width / 2 - markerOffset - pointer.currentDistanceFromScale) :
                pointer.position === 'Outside' ?
                    (axis.currentRadius + rangeBarOffset + axis.lineStyle.width / 2 + markerOffset + pointer.currentDistanceFromScale) :
                    (axis.currentRadius + rangeBarOffset / 2 - pointer.currentDistanceFromScale -
                        ((pointer.markerShape === 'InvertedTriangle' || pointer.markerShape === 'Triangle') ? markerOffset : 0));
            return pointerRadius;
        }
    };
    /**
     * Method to render the needle pointer of the ciruclar gauge.
     *
     * @param {Axis} axis - Specifies the axis
     * @param {number} axisIndex - Specifies the axis index.
     * @param {number} index - Specifies the index.
     * @param {Element} parentElement - Specifies the parent element.
     * @param {CircularGauge} gauge - Specifies the instance of the gauge.
     * @returns {void}
     */
    PointerRenderer.prototype.drawNeedlePointer = function (axis, axisIndex, index, parentElement, gauge) {
        var pointer = axis.pointers[index];
        var needle = pointer.needleTail;
        var cap = pointer.cap;
        var pointerRadius;
        var location;
        var direction;
        var needleStartWidth = pointer.needleStartWidth;
        var needleEndWidth = pointer.needleEndWidth;
        var mid = gauge.midPoint;
        var width = pointer.pointerWidth / 2;
        var rectDirection;
        var gradientColor;
        var gradientTailColor;
        var gradientCapColor;
        // To render the needle
        location = getLocationFromAngle(0, pointer.currentRadius, mid);
        if ((needleStartWidth === 0) && (needleEndWidth === 0) && width) {
            direction = 'M ' + mid.x + ' ' + (mid.y) + ' L ' + (location.x) + ' ' + mid.y +
                ' L ' + (mid.x) + ' ' + (mid.y) + ' Z';
        }
        else {
            direction = 'M ' + mid.x + ' ' + (mid.y - width - needleEndWidth) + ' L ' + (location.x) + ' ' + (mid.y - needleStartWidth / 2) +
                ' L ' + location.x + ' ' + (mid.y + needleStartWidth / 2) + ' L ' + mid.x + ' ' + (mid.y + width + needleEndWidth) + ' Z';
        }
        if (gauge.gradientModule) {
            gradientColor = gauge.gradientModule.getGradientColorString(pointer);
        }
        pointer.pathElement.push(appendPath(new PathOption(gauge.element.id + '_Axis_' + axisIndex + '_Pointer_Needle_' + index, gradientColor ? gradientColor :
            pointer.color || this.gauge.themeStyle.needleColor, pointer.border.width, pointer.border.color, null, pointer.border.dashArray, direction), parentElement, gauge));
        // eslint-disable-next-line prefer-const
        pointerRadius = stringToNumber(pointer.needleTail.length, pointer.currentRadius);
        // To render the rect element for touch
        rectDirection = 'M ' + mid.x + ' ' + (mid.y - width) + ' L ' + (location.x) + ' ' + (mid.y - width) +
            ' L ' + location.x + ' ' + (mid.y + width) + ' L ' + mid.x + ' ' + (mid.y + width);
        // To render the needle tail
        if (gauge.gradientModule) {
            gradientTailColor = gauge.gradientModule.getGradientColorString(needle);
        }
        if (pointerRadius) {
            location = getLocationFromAngle(180, pointerRadius, gauge.midPoint);
            direction = 'M ' + mid.x + ' ' + (mid.y - width) +
                ' L ' + (location.x) + ' ' + (mid.y - width) +
                ' L ' + (location.x) + ' ' + (mid.y + width) +
                ' L ' + (mid.x) + ' ' + (mid.y + width) + ' Z';
            pointer.pathElement.push(appendPath(new PathOption(gauge.element.id + '_Axis_' + axisIndex + '_Pointer_NeedleTail_' + index, gradientTailColor ? gradientTailColor : pointer.needleTail.color || this.gauge.themeStyle.needleTailColor, pointer.needleTail.border.width, pointer.needleTail.border.color, null, pointer.needleTail.border.dashArray, direction), parentElement, gauge));
            rectDirection += ' L ' + location.x + ' ' + (mid.y + width) + ' L ' + location.x + ' ' + (mid.y - width);
        }
        // To render the cap
        if (gauge.gradientModule) {
            gradientCapColor = gauge.gradientModule.getGradientColorString(cap);
        }
        if (pointer.cap.radius) {
            pointer.pathElement.push(appendPath(calculateShapes(mid, 'Circle', new Size(pointer.cap.radius * 2, pointer.cap.radius * 2), '', new PathOption(gauge.element.id + '_Axis_' + axisIndex + '_Pointer_NeedleCap_' + index, gradientCapColor ? gradientCapColor : pointer.cap.color || this.gauge.themeStyle.capColor, pointer.cap.border.width, pointer.cap.border.color, null, pointer.cap.border.dashArray, '', '')), parentElement, gauge, 'Ellipse'));
        }
        pointer.pathElement.push(appendPath(new PathOption(gauge.element.id + '_Axis_' + axisIndex + '_Pointer_NeedleRect_' + index, 'transparent', 0, 'transpanret', null, '0', rectDirection + ' Z'), parentElement, gauge));
    };
    /**
     * Method to set the pointer value of the circular gauge.
     *
     * @param {Axis} axis - Specifies the axis.
     * @param {Pointer} pointer - Specifies the pointer.
     * @param {number} value - Specifies the value.
     * @returns {void}
     * @private
     */
    PointerRenderer.prototype.setPointerValue = function (axis, pointer, value) {
        var _this = this;
        var checkMinValue = value === axis.visibleRange.min && pointer.type === 'RangeBar';
        var location = this.gauge.midPoint;
        var isClockWise = axis.direction === 'ClockWise';
        var radius = pointer.roundedCornerRadius;
        var minRadius = (radius * 0.25);
        if (radius > 0 && radius <= 5) {
            radius = 6;
            minRadius = (radius * 0.25);
        }
        var startAngle = getAngleFromValue(axis.visibleRange.min, axis.visibleRange.max, axis.visibleRange.min, axis.startAngle, axis.endAngle, isClockWise);
        var endAngle = getAngleFromValue(value, axis.visibleRange.max, axis.visibleRange.min, axis.startAngle, axis.endAngle, isClockWise);
        if (isClockWise) {
            if (startAngle > endAngle) {
                endAngle = Math.round(startAngle) === Math.round(endAngle) && !checkMinValue ?
                    Math.round(endAngle) - (pointer.roundedCornerRadius > 0 ? 1.5 : 0.5) : Math.round(endAngle);
            }
            else {
                endAngle = startAngle === endAngle && !checkMinValue ? endAngle + 1 : endAngle;
            }
        }
        else {
            endAngle = Math.round(startAngle) === Math.round(endAngle) && !checkMinValue ?
                [startAngle, startAngle = (endAngle > startAngle ? endAngle + (pointer.roundedCornerRadius > 0 ? 1.5 : 0.5) : endAngle - 1)][0]
                : [startAngle, startAngle = endAngle][0];
        }
        if (value <= (axis.visibleRange.min + axis.visibleRange.interval) && pointer.roundedCornerRadius) {
            radius = value === axis.visibleRange.min || (axis.visibleRange.min + 1) ? 8 : radius;
            radius /= 2;
            minRadius = radius * 0.25;
        }
        var oldStartValue = ((((pointer.currentRadius - (pointer.pointerWidth / 2)) * ((startAngle * Math.PI) / 180) -
            (radius / minRadius)) / (pointer.currentRadius - (pointer.pointerWidth / 2))) * 180) / Math.PI;
        var oldEndValue = ((((pointer.currentRadius - (pointer.pointerWidth / 2)) * ((endAngle * Math.PI) / 180) +
            (radius / minRadius)) / (pointer.currentRadius - (pointer.pointerWidth / 2))) * 180) / Math.PI;
        var angleValue = value === axis.maximum && (axis.startAngle === axis.endAngle ||
            Math.abs(axis.startAngle - axis.endAngle) === 360) && pointer.type === 'RangeBar' ? 45 : 180;
        var roundStartAngle = ((((pointer.currentRadius) * ((startAngle * Math.PI) / angleValue) +
            radius) / (pointer.currentRadius)) * angleValue) / Math.PI;
        var roundEndAngle = ((((pointer.currentRadius) * ((endAngle * Math.PI) / angleValue) -
            radius) / (pointer.currentRadius)) * angleValue) / Math.PI;
        if (roundStartAngle > roundEndAngle && (roundStartAngle - roundEndAngle) <= 36 && pointer.type === 'RangeBar') {
            roundStartAngle = startAngle;
            roundEndAngle = endAngle;
        }
        if (isNullOrUndefined(pointer.currentRadius)) {
            this.calculatePointerRadius(axis, pointer);
        }
        pointer.pathElement.map(function (element) {
            if (pointer.type === 'RangeBar') {
                if (radius && !checkMinValue) {
                    element.setAttribute('d', getRoundedPathArc(location, Math.floor(roundStartAngle), Math.ceil(roundEndAngle), oldStartValue, oldEndValue, pointer.currentRadius, pointer.pointerWidth, pointer.pointerWidth));
                    radius = 0;
                }
                else {
                    element.setAttribute('d', getCompleteArc(location, startAngle, endAngle, pointer.currentRadius, (pointer.currentRadius - pointer.pointerWidth), checkMinValue));
                }
            }
            else {
                if (pointer.type === 'Marker' && pointer.markerShape === 'Text') {
                    _this.calculateTextElement(axis, pointer, value, element);
                }
                else {
                    element.setAttribute('transform', 'rotate(' + getAngleFromValue(value, axis.visibleRange.max, axis.visibleRange.min, axis.startAngle, axis.endAngle, isClockWise) + ',' + location.x + ',' + location.y + ')');
                }
            }
        });
    };
    /**
     * Method to set the text value of the circular gauge.
     *
     * @param {Axis} axis - Specifies the axis.
     * @param {Pointer} pointer - Specifies the pointer.
     * @param {number} value - Specifies the value.
     * @param {Element} element - Specifies the text element.
     * @returns {void}
     * @private
     */
    PointerRenderer.prototype.calculateTextElement = function (axis, pointer, value, element) {
        var textangle = getAngleFromValue(value, axis.visibleRange.max, axis.visibleRange.min, axis.startAngle, axis.endAngle, axis.direction === 'ClockWise');
        var textlocation = getLocationFromAngle(textangle, pointer.currentRadius, this.gauge.midPoint);
        element.setAttribute('transform', 'rotate(' + (textangle + 90) + ',' + textlocation.x + ',' + textlocation.y + ')');
        element.setAttribute('x', String(textlocation.x));
        element.setAttribute('y', String(textlocation.y));
    };
    /**
     * Method to render the marker pointer of the ciruclar gauge.
     *
     * @param {Axis} axis - Specifies the axis
     * @param {number} axisIndex - Specifies the axis index.
     * @param {number} index - Specifies the index.
     * @param {Element} parentElement - Specifies the parent element.
     * @param {CircularGauge} gauge - Specifies the instance of the gauge.
     * @returns {void}
     */
    PointerRenderer.prototype.drawMarkerPointer = function (axis, axisIndex, index, parentElement, gauge) {
        var pointer = axis.pointers[index];
        var min = axis.visibleRange.min;
        var max = axis.visibleRange.max;
        var gradientMarkerColor;
        var angle = Math.round(getAngleFromValue(pointer.value, max, min, axis.startAngle, axis.endAngle, axis.direction === 'ClockWise'));
        var shapeBasedOnPosition = pointer.markerShape;
        if (gauge.gradientModule) {
            gradientMarkerColor = gauge.gradientModule.getGradientColorString(pointer);
        }
        if (isNullOrUndefined(pointer.radius) && !isNullOrUndefined(pointer.position) && (pointer.markerShape === 'InvertedTriangle' ||
            pointer.markerShape === 'Triangle')) {
            shapeBasedOnPosition = ((pointer.position === 'Outside' || pointer.position === 'Cross') && pointer.markerShape === 'Triangle' ?
                'InvertedTriangle' : (pointer.position === 'Inside' &&
                pointer.markerShape === 'InvertedTriangle' ? 'Triangle' : pointer.markerShape));
        }
        var location = getLocationFromAngle((pointer.markerShape === 'Text') ? angle : 0, pointer.currentRadius, gauge.midPoint);
        if (pointer.markerShape === 'Text') {
            var style = {
                size: pointer.textStyle.size,
                color: pointer.textStyle.color || this.gauge.themeStyle.pointerColor,
                fontFamily: pointer.textStyle.fontFamily,
                fontStyle: pointer.textStyle.fontStyle,
                fontWeight: pointer.textStyle.fontWeight || this.gauge.themeStyle.fontWeight,
                opacity: pointer.textStyle.opacity
            };
            var textOption = new TextOption(gauge.element.id + '_Axis_' + axisIndex + '_Pointer_Marker_' + index, location.x, location.y, 'middle', pointer.text, 'rotate(' + (angle + 90) + ',' +
                (location.x) + ',' + location.y + ')', 'auto');
            var textObject = textElement(textOption, style, style.color, parentElement, 'pointer-events : auto; ');
            textObject.style.visibility = ((pointer.animation.enable || animationMode === 'Enable') && (!this.gauge.isPropertyChange || pointer.isPointerAnimation) && this.gauge.animatePointer) ? 'hidden' : 'visible';
            pointer.pathElement.push(textObject);
        }
        else {
            pointer.pathElement.push(appendPath(calculateShapes(location, shapeBasedOnPosition, new Size(pointer.markerWidth, pointer.markerHeight), pointer.imageUrl, new PathOption(gauge.element.id + '_Axis_' + axisIndex + '_Pointer_Marker_' + index, gradientMarkerColor ? gradientMarkerColor : pointer.color || this.gauge.themeStyle.pointerColor, pointer.border.width, pointer.border.color, null, pointer.border.dashArray, '', '')), parentElement, gauge, pointer.markerShape === 'Circle' ? 'Ellipse' : (pointer.markerShape === 'Image' ? 'Image' : 'Path')));
        }
    };
    /**
     * Method to render the range bar pointer of the ciruclar gauge.
     *
     * @param {Axis} axis - Specifies the axis
     * @param {number} axisIndex - Specifies the axis index.
     * @param {number} index - Specifies the index.
     * @param {Element} parentElement - Specifies the parent element.
     * @param {CircularGauge} gauge - Specifies the instance of the gauge.
     * @returns {void}
     */
    PointerRenderer.prototype.drawRangeBarPointer = function (axis, axisIndex, index, parentElement, gauge) {
        var pointer = axis.pointers[index];
        var gradientBarColor;
        if (gauge.gradientModule) {
            gradientBarColor = gauge.gradientModule.getGradientColorString(pointer);
        }
        pointer.pathElement.push(appendPath(new PathOption(gauge.element.id + '_Axis_' + axisIndex + '_Pointer_RangeBar_' + index, gradientBarColor ? gradientBarColor :
            pointer.color || this.gauge.themeStyle.pointerColor, pointer.border.width, pointer.border.color, 1, pointer.border.dashArray, ''), parentElement, gauge));
    };
    /**
     * Method to perform the animation of the pointer in circular gauge.
     *
     * @param {Element} pointerElement - specifies the pointer element.
     * @param {Pointer} pointer - Specifies the pointer.
     * @param {Axis} axis - Specifies the axis.
     * @param {number} axisIndex - Specifies the axis index.
     * @returns {void}
     * @private
     */
    PointerRenderer.prototype.doPointerAnimation = function (pointerElement, pointer, axis, axisIndex) {
        var _this = this;
        var startValue = !isNullOrUndefined(pointer.previousValue) ? pointer.previousValue : axis.visibleRange.min;
        var endValue = pointer.currentValue;
        if (((pointer.animation.enable || animationMode === 'Enable') && startValue !== endValue && this.gauge.animatePointer) ||
            (!isNullOrUndefined(this.gauge.loadingAnimationDuration) && this.gauge.loadingAnimationDuration[axisIndex] > 0)) {
            pointer.pathElement.map(function (element) {
                if (pointer.type === 'RangeBar') {
                    _this.performRangeBarAnimation(element, startValue, endValue, axis, pointer, axisIndex);
                }
                else {
                    if (pointer.type === 'Marker' && pointer.markerShape === 'Text') {
                        _this.performTextAnimation(pointerElement, startValue, endValue, axis, pointer, axisIndex);
                    }
                    else {
                        _this.performNeedleAnimation(element, startValue, endValue, axis, pointer, axisIndex);
                    }
                }
            });
        }
    };
    /**
     * @param {HTMLElement} element - specifies the element.
     * @param {number} start - specifies the start.
     * @param {number} end - specifies the end.
     * @param {Axis} axis - specifies the axis.
     * @param {Pointer} pointer - specfies the pointer.
     * @param {number} axisIndex - Specifies the axis index.
     * @returns {void}
     * @private
     */
    PointerRenderer.prototype.performTextAnimation = function (element, start, end, axis, pointer, axisIndex) {
        var _this = this;
        var isClockWise = axis.direction === 'ClockWise';
        var textangle;
        var textlocation;
        var pointerValue = 0;
        var timeStamp;
        start = typeof (start) === 'string' ? parseInt(start, 10) : start;
        end = typeof (end) === 'string' ? parseInt(end, 10) : end;
        element = !isNullOrUndefined(element.children[0]) ? element.children[0] : element;
        var val = Math.abs(start - end);
        new Animation$1({}).animate(element, {
            duration: this.gauge.isAnimationProgress ? (isNullOrUndefined(pointer.value) || pointer.value === axis.minimum ? 0 :
                (animationMode === 'Enable' && (((!pointer.animation.enable || pointer.animation.duration === 0)
                    && !this.gauge.allowLoadingAnimation) || (this.gauge.allowLoadingAnimation && (this.gauge.animationDuration === 0
                    && pointer.animation.enable && pointer.animation.duration === 0)))) ? 1000 :
                    (this.gauge.allowLoadingAnimation ? (pointer.animation.enable && pointer.animation.duration > 0 ? pointer.animation.duration
                        : this.gauge.loadingAnimationDuration[axisIndex]) : pointer.animation.duration)) : 0,
            progress: function (args) {
                if (_this.gauge.isAnimationProgress) {
                    if (args.timeStamp > args.delay) {
                        timeStamp = (args.timeStamp / pointer.animation.duration);
                        pointerValue = end > start ? start + (timeStamp * val) : start - (timeStamp * val);
                        textangle = getAngleFromValue(pointerValue, axis.visibleRange.max, axis.visibleRange.min, axis.startAngle, axis.endAngle, isClockWise);
                        textlocation = getLocationFromAngle(textangle, pointer.currentRadius, _this.gauge.midPoint);
                        element.setAttribute('transform', 'rotate(' + (textangle + 90) + ',' + textlocation.x + ',' + textlocation.y + ')');
                        element.setAttribute('x', String(textlocation.x));
                        element.setAttribute('y', String(textlocation.y));
                        element.style.visibility = 'visible';
                    }
                }
            },
            end: function () {
                if (_this.gauge.isAnimationProgress) {
                    _this.setPointerValue(axis, pointer, end);
                    pointer.isPointerAnimation = false;
                }
                _this.gauge.trigger(animationComplete, { axis: axis, pointer: pointer });
                if (!isNullOrUndefined(_this.gauge.loadingAnimationDuration) && (_this.gauge.loadingAnimationDuration[axisIndex] > 0 && !isNullOrUndefined(_this.gauge.annotationsModule))) {
                    _this.gauge.annotationsModule.annotationAnimation(_this.gauge);
                }
                else {
                    _this.gauge.isOverAllAnimationComplete = true;
                }
            }
        });
    };
    /**
     * Perform the needle and marker pointer animation for circular gauge.
     *
     * @param {HTMLElement} element - Specifies the element
     * @param {number} start - Specifies the start
     * @param {number} end - Specifies the end
     * @param {Axis} axis - Specifies the axis
     * @param {Pointer} pointer - Specifies the pointer.
     * @param {number} axisIndex - Specifies the axis index.
     * @returns {void}
     * @private
     */
    PointerRenderer.prototype.performNeedleAnimation = function (element, start, end, axis, pointer, axisIndex) {
        var _this = this;
        var isClockWise = axis.direction === 'ClockWise';
        start = typeof (start) === 'string' ? parseInt(start, 10) : start;
        end = typeof (end) === 'string' ? parseInt(end, 10) : end;
        var startAngle = getAngleFromValue(start, axis.visibleRange.max, axis.visibleRange.min, axis.startAngle, axis.endAngle, isClockWise);
        var pointAngle = getAngleFromValue(end, axis.visibleRange.max, axis.visibleRange.min, axis.startAngle, axis.endAngle, isClockWise);
        var endAngle = startAngle > pointAngle ? (pointAngle + 360) : pointAngle;
        var sweepAngle;
        new Animation$1({}).animate(element, {
            duration: this.gauge.isAnimationProgress ? (isNullOrUndefined(pointer.value) || pointer.value === axis.minimum ? 0 :
                (animationMode === 'Enable' && (((!pointer.animation.enable || pointer.animation.duration === 0)
                    && !this.gauge.allowLoadingAnimation) || (this.gauge.allowLoadingAnimation && (this.gauge.animationDuration === 0
                    && pointer.animation.enable && pointer.animation.duration === 0)))) ? 1000 :
                    (this.gauge.allowLoadingAnimation ? (pointer.animation.enable && pointer.animation.duration > 0 ? pointer.animation.duration
                        : this.gauge.loadingAnimationDuration[axisIndex]) : pointer.animation.duration)) : 0,
            progress: function (args) {
                if (_this.gauge.isAnimationProgress) {
                    sweepAngle = (start < end || Math.round(startAngle) === Math.round(endAngle)) ?
                        isClockWise ? (endAngle - startAngle) : (endAngle - startAngle - 360) :
                        isClockWise ? (endAngle - startAngle - 360) : (endAngle - startAngle);
                    element.style.animation = 'None';
                    if (start !== end) {
                        element.setAttribute('transform', 'rotate(' + linear(args.timeStamp, startAngle, sweepAngle, args.duration) + ',' +
                            _this.gauge.midPoint.x.toString() + ',' + _this.gauge.midPoint.y.toString() + ')');
                        element.style.visibility = 'visible';
                    }
                }
            },
            end: function () {
                if (_this.gauge.isAnimationProgress) {
                    _this.setPointerValue(axis, pointer, end);
                    if (_this.gauge.animationDuration > 0) {
                        element.style.visibility = 'visible';
                    }
                    pointer.isPointerAnimation = false;
                }
                if (pointer.type === 'Marker' || (element.id.indexOf('_Pointer_NeedleCap') >= 0)) {
                    _this.gauge.trigger(animationComplete, { axis: axis, pointer: pointer });
                }
                if (!isNullOrUndefined(_this.gauge.loadingAnimationDuration) && _this.gauge.loadingAnimationDuration[axisIndex] > 0 && !isNullOrUndefined(_this.gauge.annotationsModule)) {
                    _this.gauge.annotationsModule.annotationAnimation(_this.gauge);
                }
                else {
                    _this.gauge.isOverAllAnimationComplete = true;
                }
            }
        });
    };
    /**
     * Perform the range bar pointer animation for circular gauge.
     *
     * @param {HTMLElement} element - Specifies the element.
     * @param {number} start - Specifies the start.
     * @param {number} end - Specifies the end.
     * @param {Axis} axis - Specifies the axis.
     * @param {Pointer} pointer - Specifies the pointer.
     * @param {number} axisIndex - Specifies the axis index.
     * @returns {void}
     * @private
     */
    PointerRenderer.prototype.performRangeBarAnimation = function (element, start, end, axis, pointer, axisIndex) {
        var _this = this;
        start = typeof (start) === 'string' ? parseInt(start, 10) : start;
        end = typeof (end) === 'string' ? parseInt(end, 10) : end;
        var pointerValue;
        var timeStamp;
        element.style.visibility = 'visible';
        var val = Math.abs(start - end);
        new Animation$1({}).animate(element, {
            duration: this.gauge.isAnimationProgress ? (isNullOrUndefined(pointer.value) || pointer.value === axis.minimum ? 0 :
                (animationMode === 'Enable' && (((!pointer.animation.enable || pointer.animation.duration === 0)
                    && !this.gauge.allowLoadingAnimation) || (this.gauge.allowLoadingAnimation && (this.gauge.animationDuration === 0
                    && pointer.animation.enable && pointer.animation.duration === 0)))) ? 1000 :
                    (this.gauge.allowLoadingAnimation ? (pointer.animation.enable && pointer.animation.duration > 0 ? pointer.animation.duration
                        : this.gauge.loadingAnimationDuration[axisIndex]) : pointer.animation.duration)) : 0,
            progress: function (arg) {
                if (_this.gauge.isAnimationProgress) {
                    arg.duration = !_this.gauge.isAnimationProgress ? 0 : arg.duration;
                    timeStamp = (arg.timeStamp / arg.duration);
                    pointerValue = end > start ? start + (timeStamp * val) : start - (timeStamp * val);
                    _this.setPointerValue(axis, pointer, pointerValue);
                }
            },
            end: function () {
                if (_this.gauge.isAnimationProgress) {
                    _this.setPointerValue(axis, pointer, end);
                    pointer.isPointerAnimation = false;
                }
                _this.gauge.trigger(animationComplete, { axis: axis, pointer: pointer });
                if (!isNullOrUndefined(_this.gauge.loadingAnimationDuration) && _this.gauge.loadingAnimationDuration[axisIndex] > 0 && !isNullOrUndefined(_this.gauge.annotationsModule)) {
                    _this.gauge.annotationsModule.annotationAnimation(_this.gauge);
                }
                else {
                    _this.gauge.isOverAllAnimationComplete = true;
                }
            }
        });
    };
    /**
     *
     * @returns {void}
     * @private
     */
    PointerRenderer.prototype.destroy = function () {
        this.gauge = null;
    };
    return PointerRenderer;
}());

/**
 * Specifies the CircularGauge Axis Layout.
 */
var AxisLayoutPanel = /** @class */ (function () {
    function AxisLayoutPanel(gauge) {
        this.axisOption = [];
        this.prevAnimatedMajorTickValue = [];
        this.prevAnimatedMajorTickIndex = [];
        this.prevAnimatedMinorTickValue = [];
        this.prevAnimatedMinorTickIndex = [];
        this.allowAxisCount = [];
        this.rangeAnimationCount = 0;
        this.gauge = gauge;
        this.axisRenderer = new AxisRenderer(gauge);
        this.pointerRenderer = new PointerRenderer(gauge);
    }
    /**
     * Measure the calculate the axis size and radius.
     *
     * @return {void}
     * @private
     */
    AxisLayoutPanel.prototype.measureAxis = function (rect) {
        this.measureAxisSize(this.gauge, rect);
        this.calculateAxesRadius();
    };
    /**
     * Measure to calculate the axis radius of the circular gauge.
     *
     * @returns {void}
     * @private
     */
    AxisLayoutPanel.prototype.calculateAxesRadius = function () {
        var _this = this;
        var totalRadius;
        var currentRadius;
        var rangeMaximumRadius = 0;
        var xMarginDiff = this.gauge.margin.left + this.gauge.margin.right;
        var yMarginDiff = this.gauge.margin.top + this.gauge.margin.bottom;
        var _loop_1 = function (axis) {
            totalRadius = (Math.min(axis.rect.width, axis.rect.height) / 2);
            currentRadius = axis.radius != null ? stringToNumber(axis.radius, totalRadius) : totalRadius;
            // eslint-disable-next-line prefer-spread
            rangeMaximumRadius = Math.max.apply(Math, axis.ranges.map(function (value) {
                return value.radius ?
                    (value.radius.indexOf('%') < 0 ? 100 : parseInt(value.radius, 10)) : 0;
            }));
            currentRadius = (rangeMaximumRadius > 100 && axis.radius == null) ?
                (currentRadius * 100) / rangeMaximumRadius : currentRadius;
            axis.currentRadius = currentRadius - axis.nearSize;
            if (this_1.gauge.moveToCenter && this_1.gauge.axes.length === 1 &&
                isNullOrUndefined(this_1.gauge.centerXpoint) && isNullOrUndefined(this_1.gauge.centerYpoint)) {
                var endAngle = void 0;
                var startAngle = axis.startAngle;
                var startPoint = getLocationFromAngle(startAngle - 90, currentRadius, this_1.gauge.midPoint);
                endAngle = axis.endAngle;
                endAngle -= isCompleteAngle(startAngle, endAngle) ? 0.0001 : 0;
                var endPoint = getLocationFromAngle(endAngle - 90, currentRadius, this_1.gauge.midPoint);
                var xDiff = void 0;
                var yDiff = void 0;
                var startXDiff = void 0;
                var endXDiff = void 0;
                var startYDiff = void 0;
                var endYDiff = void 0;
                var newPoint = void 0;
                if (startAngle > endAngle ? Math.abs(startAngle - endAngle) > 90 ? true : false : true) {
                    if ((startAngle >= 270 && startAngle <= 360) && ((endAngle > 270 && endAngle <= 360) ||
                        (endAngle >= 0 && endAngle <= 180))) {
                        startXDiff = Math.abs(this_1.gauge.gaugeRect.x - Math.abs(startPoint.x - this_1.gauge.gaugeRect.x));
                        newPoint = (endAngle <= 360 && endAngle >= 270) ? this_1.gauge.midPoint : (endAngle <= 90) ? endPoint :
                            getLocationFromAngle(90 - 90, currentRadius, this_1.gauge.midPoint);
                        endXDiff = Math.abs(newPoint.x - this_1.gauge.gaugeRect.width);
                        startPoint = (endAngle <= 360 && endAngle >= 270) ? endPoint :
                            getLocationFromAngle(360 - 90, currentRadius, this_1.gauge.midPoint);
                        startYDiff = Math.abs(startPoint.y - this_1.gauge.gaugeRect.y);
                        endPoint = (endAngle <= 360 && endAngle >= 270 || (endAngle >= 0 && endAngle < 90)) ?
                            this_1.gauge.midPoint : (endAngle >= 90 && endAngle <= 180) ? endPoint :
                            getLocationFromAngle(180 - 90, currentRadius, this_1.gauge.midPoint);
                        endYDiff = Math.abs(endPoint.y - (this_1.gauge.gaugeRect.y + this_1.gauge.gaugeRect.height));
                    }
                    else if ((startAngle >= 0 && startAngle < 90) && (endAngle >= 0 && endAngle <= 270)) {
                        startYDiff = Math.abs(startPoint.y - this_1.gauge.gaugeRect.y);
                        newPoint = (endAngle >= 180) ? getLocationFromAngle(180 - 90, currentRadius, this_1.gauge.midPoint) :
                            endPoint;
                        endYDiff = Math.abs(newPoint.y - (this_1.gauge.gaugeRect.y + this_1.gauge.gaugeRect.height));
                        startPoint = (endAngle >= 180) ? endPoint : this_1.gauge.midPoint;
                        startXDiff = Math.abs(this_1.gauge.gaugeRect.x - Math.abs(startPoint.x - this_1.gauge.gaugeRect.x));
                        endPoint = (endAngle >= 90) ? getLocationFromAngle(90 - 90, currentRadius, this_1.gauge.midPoint) : endPoint;
                        endXDiff = Math.abs(endPoint.x - this_1.gauge.gaugeRect.width);
                    }
                    else if ((startAngle >= 90 && startAngle < 180) && (endAngle > 90 && endAngle <= 360)) {
                        newPoint = (endAngle <= 180) ? this_1.gauge.midPoint : (endAngle >= 270) ?
                            getLocationFromAngle(270 - 90, currentRadius, this_1.gauge.midPoint) : endPoint;
                        startXDiff = Math.abs(newPoint.x - this_1.gauge.gaugeRect.x);
                        endXDiff = Math.abs(startPoint.x - this_1.gauge.gaugeRect.width);
                        startPoint = (endAngle > 270) ? getLocationFromAngle(endAngle - 90, currentRadius, this_1.gauge.midPoint) :
                            this_1.gauge.midPoint;
                        startYDiff = Math.abs(this_1.gauge.gaugeRect.y - startPoint.y);
                        endPoint = (endAngle >= 180) ? getLocationFromAngle(180 - 90, currentRadius, this_1.gauge.midPoint) : endPoint;
                        endYDiff = Math.abs(endPoint.y - (this_1.gauge.gaugeRect.y + this_1.gauge.gaugeRect.height));
                    }
                    else if ((startAngle >= 180 && startAngle <= 270) && ((endAngle <= 360 && endAngle >= 270) ||
                        (endAngle <= 180 && endAngle >= 0))) {
                        newPoint = (endAngle > 180 && endAngle < 270) ? endPoint :
                            getLocationFromAngle(270 - 90, currentRadius, this_1.gauge.midPoint);
                        startXDiff = Math.abs(this_1.gauge.gaugeRect.x - Math.abs(newPoint.x - this_1.gauge.gaugeRect.x));
                        newPoint = (endAngle >= 180 && endAngle <= 360) ? this_1.gauge.midPoint : (endAngle <= 90) ? endPoint :
                            getLocationFromAngle(0, currentRadius, this_1.gauge.midPoint);
                        endXDiff = Math.abs(newPoint.x - this_1.gauge.gaugeRect.width);
                        newPoint = (endAngle > 180 && endAngle < 270) ? this_1.gauge.midPoint : (endAngle >= 270 && endAngle <= 360) ?
                            endPoint : getLocationFromAngle(360 - 90, currentRadius, this_1.gauge.midPoint);
                        startYDiff = Math.abs(newPoint.y - this_1.gauge.gaugeRect.y);
                        endPoint = (endAngle <= 360 && endAngle >= 270 || (endAngle >= 0 && endAngle < 90)) ?
                            startPoint : ((270 - startAngle) < (endAngle - 90)) ? endPoint : startPoint;
                        endYDiff = Math.abs(endPoint.y - (this_1.gauge.gaugeRect.y + this_1.gauge.gaugeRect.height));
                    }
                    if ((!isNullOrUndefined(startXDiff) && !isNullOrUndefined(endXDiff) && !isNullOrUndefined(startYDiff) &&
                        !isNullOrUndefined(endYDiff)) && ((startXDiff > 0 || endXDiff > 0) && (startYDiff > 0 || endYDiff > 0))) {
                        xDiff = Math.abs((startXDiff + endXDiff) - xMarginDiff);
                        yDiff = Math.abs((startYDiff + endYDiff) - yMarginDiff);
                        this_1.gauge.midPoint.x = this_1.gauge.midPoint.x - (startXDiff / 2) + (endXDiff / 2);
                        this_1.gauge.midPoint.y = this_1.gauge.midPoint.y - (startYDiff / 2) + (endYDiff / 2);
                        totalRadius = (Math.min(this_1.gauge.gaugeRect.width, this_1.gauge.gaugeRect.height) / 2) +
                            (Math.min(xDiff, yDiff) / 2);
                        axis.currentRadius = (axis.radius != null ? stringToNumber(axis.radius, totalRadius) : totalRadius) - axis.nearSize;
                    }
                }
            }
            axis.visibleRange.interval = this_1.calculateNumericInterval(axis, axis.rect);
            var args = {
                cancel: false, name: radiusCalculate, currentRadius: axis.currentRadius, gauge: this_1.gauge,
                midPoint: this_1.gauge.midPoint, axis: axis
            };
            this_1.gauge.trigger('radiusCalculate', args, function () {
                axis.currentRadius = args.currentRadius;
                _this.gauge.midPoint = args.midPoint;
                _this.calculateVisibleLabels(axis);
            });
        };
        var this_1 = this;
        for (var _i = 0, _a = this.gauge.axes; _i < _a.length; _i++) {
            var axis = _a[_i];
            _loop_1(axis);
        }
    };
    /**
     * Measure to calculate the axis size.
     *
     * @return {void}
     * @private
     */
    AxisLayoutPanel.prototype.measureAxisSize = function (gauge, rect) {
        var _this = this;
        var sum;
        this.computeSize(gauge.axes, rect);
        gauge.axes.map(function (axis, index) {
            sum = calculateSum(index, _this.farSizes.length - 1, _this.farSizes);
            axis.rect = new Rect(rect.x + sum, rect.y + sum, rect.width - (sum * 2), rect.height - (sum * 2));
        });
    };
    /**
     * Calculate the axis values of the circular gauge.
     *
     * @return {void}
     * @private
     */
    AxisLayoutPanel.prototype.calculateAxisValues = function (rect) {
        for (var _i = 0, _a = this.gauge.axes; _i < _a.length; _i++) {
            var axis = _a[_i];
            this.calculateVisibleRange(axis, rect);
            this.calculateVisibleLabels(axis);
        }
    };
    /**
     * Calculate the visible range of an axis.
     *
     * @param {Axis} axis - Specifies the axis.
     * @param {Rect} rect - Specifies the rect.
     * @returns {void}
     * @private
     */
    AxisLayoutPanel.prototype.calculateVisibleRange = function (axis, rect) {
        var interval = axis.majorTicks.interval;
        var minimumValue = Math.min(axis.minimum === null ? 0 : axis.minimum, axis.maximum !== null ? axis.maximum : 100);
        var maximumValue = Math.max(axis.minimum, axis.maximum === null ? 100 : axis.maximum);
        axis.pointers.map(function (pointer) {
            pointer.currentValue = pointer.value !== null ?
                pointer.value < minimumValue ? minimumValue : pointer.value > maximumValue ? maximumValue : pointer.value
                : minimumValue;
            minimumValue = axis.minimum === null ? Math.min(pointer.currentValue, minimumValue) : minimumValue;
            maximumValue = axis.maximum === null ? Math.max(pointer.currentValue, maximumValue) : maximumValue;
        });
        minimumValue = (minimumValue === maximumValue) ?
            (interval !== null ? minimumValue - interval : minimumValue - 1) : minimumValue;
        axis.visibleRange = { min: minimumValue, max: maximumValue, interval: interval };
        axis.visibleRange.interval = this.calculateNumericInterval(axis, rect);
    };
    /**
     * Calculate the numeric intervals of an axis range.
     *
     * @return {void}
     * @private
     */
    AxisLayoutPanel.prototype.calculateNumericInterval = function (axis, rect) {
        var allowComponentRender = ((!isNullOrUndefined(axis.minimum) && !isNullOrUndefined(axis.maximum)
            && axis.minimum !== axis.maximum) || (isNullOrUndefined(axis.minimum) || isNullOrUndefined(axis.maximum)));
        if (!allowComponentRender) {
            return 0;
        }
        else if (axis.majorTicks.interval !== null) {
            return axis.majorTicks.interval;
        }
        var totalAngle = axis.endAngle - axis.startAngle;
        totalAngle = totalAngle <= 0 ? (totalAngle + 360) : totalAngle;
        return this.calculateNiceInterval(axis.visibleRange.max, axis.visibleRange.min, axis.currentRadius ? axis.currentRadius : (rect.width / 2), totalAngle);
    };
    /**
     * Calculate the nice interval of an axis range.
     *
     * @return {void}
     * @private
     */
    AxisLayoutPanel.prototype.calculateNiceInterval = function (maxValue, minValue, radius, degree) {
        var delta = maxValue - minValue;
        var circumference = 2 * Math.PI * radius * (degree / 360);
        var desiredIntervalsCount = Math.max((circumference * ((0.533 * 3) / 100)), 1);
        var niceInterval = delta / desiredIntervalsCount;
        var minInterval = Math.pow(10, Math.floor(Math.log(niceInterval) / Math.log(10)));
        for (var _i = 0, _a = [10, 5, 2, 1]; _i < _a.length; _i++) {
            var interval = _a[_i];
            var currentInterval = minInterval * interval;
            if (desiredIntervalsCount < (delta / currentInterval)) {
                break;
            }
            niceInterval = currentInterval;
        }
        return niceInterval;
    };
    /**
     * Calculate the visible labels of an axis.
     *
     * @return {void}
     * @private
     */
    AxisLayoutPanel.prototype.calculateVisibleLabels = function (axis) {
        var style = axis.labelStyle;
        var customLabelFormat = style.format && style.format.match('{value}') !== null;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        var format = this.gauge.intl.getNumberFormat({
            format: getLabelFormat(style.format), useGrouping: this.gauge.useGroupingSeparator
        });
        var argsData;
        axis.visibleLabels = [];
        var roundValue;
        var interval = axis.visibleRange.interval;
        var max = axis.visibleRange.max;
        if ((isNullOrUndefined(axis.minimum) && isNullOrUndefined(axis.maximum)) || axis.minimum !== axis.maximum) {
            var _loop_2 = function (i) {
                roundValue = axis.roundingPlaces ? parseFloat(i.toFixed(axis.roundingPlaces)) : i;
                argsData = {
                    cancel: false, name: axisLabelRender, axis: axis,
                    text: customLabelFormat ? style.format.replace(new RegExp('{value}', 'g'), format(roundValue)) :
                        format(roundValue),
                    value: roundValue
                };
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                var axisLabelRenderSuccess = function (argsData) {
                    if (!argsData.cancel) {
                        axis.visibleLabels.push(new VisibleLabels(argsData.text, i));
                    }
                };
                axisLabelRenderSuccess.bind(this_2);
                this_2.gauge.trigger(axisLabelRender, argsData, axisLabelRenderSuccess);
            };
            var this_2 = this;
            for (var i = axis.visibleRange.min; (i <= max && interval); i += interval) {
                _loop_2(i);
            }
        }
        var lastLabel = axis.visibleLabels.length ? axis.visibleLabels[axis.visibleLabels.length - 1].value : null;
        var maxVal = axis.visibleRange.max;
        if (!isNullOrUndefined(lastLabel) && lastLabel !== maxVal && axis.showLastLabel === true) {
            argsData = {
                cancel: false, name: axisLabelRender, axis: axis,
                text: customLabelFormat ? style.format.replace(new RegExp('{value}', 'g'), format(maxVal)) :
                    format(maxVal),
                value: maxVal
            };
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            var axisLabelRenderSuccess = function (argsData) {
                if (!argsData.cancel) {
                    axis.visibleLabels.push(new VisibleLabels(argsData.text, maxVal));
                }
            };
            axisLabelRenderSuccess.bind(this);
            this.gauge.trigger(axisLabelRender, argsData, axisLabelRenderSuccess);
        }
        this.getMaxLabelWidth(this.gauge, axis);
    };
    /**
     * Measure the axes available size.
     *
     * @return {void}
     * @private
     */
    AxisLayoutPanel.prototype.computeSize = function (axes, rect) {
        var lineSize;
        var outerHeight;
        var innerHeight;
        var heightForCross;
        var axisPadding = 5;
        var majorTickOffset = 0;
        var minorTickOffset = 0;
        var labelOffset = 0;
        var labelPadding = 10;
        this.farSizes = [];
        this.calculateAxisValues(rect);
        for (var _i = 0, axes_1 = axes; _i < axes_1.length; _i++) {
            var axis = axes_1[_i];
            lineSize = (axis.lineStyle.width / 2);
            outerHeight = 0;
            innerHeight = 0;
            heightForCross = axis.majorTicks.position === 'Cross' ? axis.majorTicks.height / 2 : heightForCross;
            heightForCross = (axis.minorTicks.position === 'Cross' && heightForCross < axis.minorTicks.height / 2) ?
                axis.minorTicks.height / 2 : heightForCross;
            heightForCross = (axis.labelStyle.position === 'Cross' && heightForCross < axis.maxLabelSize.height / 2) ?
                axis.maxLabelSize.height / 2 : heightForCross;
            lineSize = lineSize < heightForCross ? heightForCross : lineSize;
            majorTickOffset = axis.majorTicks.offset;
            minorTickOffset = axis.minorTicks.offset;
            labelOffset = axis.labelStyle.offset;
            labelPadding = axis.labelStyle.shouldMaintainPadding ? 10 : 0;
            // Calculating the outer space of the axis
            outerHeight += !(axis.majorTicks.position === 'Outside' && axis.minorTicks.position === 'Outside' &&
                axis.labelStyle.position === 'Outside') ? axisPadding : 0;
            outerHeight += (axis.majorTicks.position === 'Outside' ? (axis.majorTicks.height + lineSize) : 0) +
                (axis.labelStyle.position === 'Outside' ? (axis.maxLabelSize.height + labelOffset + labelPadding) : 0) +
                ((axis.minorTicks.position === 'Outside' && !(axis.majorTicks.position === 'Outside')) ?
                    (axis.minorTicks.height + lineSize) : 0) + lineSize;
            outerHeight += (axis.majorTicks.position === 'Outside' && axis.minorTicks.position === 'Outside') ?
                Math.max(majorTickOffset, minorTickOffset) : (axis.majorTicks.position === 'Outside' ?
                majorTickOffset : axis.minorTicks.position === 'Outside' ? minorTickOffset : 0);
            // Calculating the inner space of the axis
            innerHeight += ((axis.majorTicks.position === 'Inside') ? (axis.majorTicks.height + lineSize) : 0) +
                ((axis.labelStyle.position === 'Inside') ? (axis.maxLabelSize.height + labelOffset + labelPadding) : 0) +
                ((axis.minorTicks.position === 'Inside' && axis.majorTicks.position === 'Outside') ?
                    (axis.minorTicks.height + lineSize) : 0) + lineSize;
            innerHeight += ((axis.majorTicks.position === 'Inside') && (axis.minorTicks.position === 'Inside')) ?
                Math.max(majorTickOffset, minorTickOffset) : ((axis.majorTicks.position === 'Inside') ?
                majorTickOffset : (axis.minorTicks.position === 'Inside') ? minorTickOffset : 0);
            if (this.farSizes[this.farSizes.length - 1]) {
                this.farSizes[this.farSizes.length - 1] += (innerHeight + outerHeight);
            }
            axis.nearSize = outerHeight - axisPadding;
            axis.farSize = innerHeight;
            outerHeight = (this.gauge.axes.length === (this.farSizes.length + 1)) ? 0 : outerHeight;
            this.farSizes.push(outerHeight);
        }
    };
    /**
     * To render the Axis element of the circular gauge.
     *
     * @return {void}
     * @private
     */
    AxisLayoutPanel.prototype.renderAxes = function (animate) {
        var _this = this;
        if (animate === void 0) { animate = true; }
        var gauge = this.gauge;
        var renderer = this.axisRenderer;
        var element;
        var axesElements = gauge.renderer.createGroup({
            'id': gauge.element.id + '_AxesCollection',
            'clip-path': 'url(#' + gauge.element.id + '_GaugeAreaClipRect_' + ')'
        });
        // To append the secondary element for annotation and tooltip
        var annotationElement = createElement('div', {
            id: gauge.element.id + '_Secondary_Element'
        });
        annotationElement.style.position = 'relative';
        gauge.element.appendChild(annotationElement);
        gauge.axes.map(function (axis, index) {
            element = gauge.renderer.createGroup({
                id: gauge.element.id + '_Axis_Group_' + index
            });
            _this.gauge.allowComponentRender = ((!isNullOrUndefined(axis.minimum) && !isNullOrUndefined(axis.maximum)
                && axis.minimum !== axis.maximum) || (isNullOrUndefined(axis.minimum) || isNullOrUndefined(axis.maximum)));
            renderer.checkAngles(axis);
            renderer.drawAxisOuterLine(axis, index, element, gauge);
            if (gauge.allowRangePreRender) {
                renderer.drawAxisRange(axis, index, element);
            }
            renderer.drawAxisLine(axis, index, element, gauge);
            if (!gauge.allowRangePreRender) {
                renderer.drawAxisRange(axis, index, element);
            }
            renderer.drawMajorTickLines(axis, index, element, gauge);
            renderer.drawMinorTickLines(axis, index, element, gauge);
            renderer.drawAxisLabels(axis, index, element, gauge);
            _this.pointerRenderer.drawPointers(axis, index, element, gauge, animate);
            if (gauge.annotationsModule) {
                gauge.annotationsModule.renderAnnotation(axis, index, gauge);
            }
            axesElements.appendChild(element);
        });
        // For append clip rect for axes
        gauge.svgObject.appendChild(gauge.renderer.drawClipPath({
            'id': gauge.element.id + '_GaugeAreaClipRect_',
            'x': 0, 'y': 0,
            'width': gauge.availableSize.width,
            'height': gauge.availableSize.height,
            'fill': 'transparent', 'stroke': 'transparent'
        }));
        gauge.svgObject.appendChild(axesElements);
        if (gauge.allowLoadingAnimation) {
            this.durationSplitUp((gauge.animationDuration === 0 && animationMode === 'Enable') ? 3000 : gauge.animationDuration, axesElements);
        }
    };
    AxisLayoutPanel.prototype.labelElementAnimation = function (element, axisIndex) {
        var _this = this;
        if (element) {
            new Animation$1({}).animate(element, {
                duration: this.gauge.loadingAnimationDuration[axisIndex],
                progress: function () {
                    element.style.visibility = 'visible';
                },
                end: function () {
                    element.style.visibility = 'visible';
                    var axisElement = document.getElementById(_this.gauge.element.id + '_Axis_Labels_' + axisIndex);
                    if (_this.gauge.axes[axisIndex].showLastLabel && parseInt(element.id.split('Label_')[1], 10) === (axisElement.childElementCount - 2)) {
                        axisElement.style.visibility = 'visible';
                        element = document.getElementById(_this.gauge.element.id + '_Axis_' + axisIndex + '_Label_' + (axisElement.childElementCount - 1));
                        if (element) {
                            element.style.visibility = 'visible';
                        }
                    }
                }
            });
        }
    };
    AxisLayoutPanel.prototype.elementLabelAnimation = function (element, axisIndex, tickIndex, gauge) {
        var _this = this;
        if (element) {
            new Animation$1({}).animate(element, {
                duration: gauge.axes[axisIndex].labelStyle.font.size != null &&
                    (gauge.axes[axisIndex].labelStyle.font.size === '0px' || gauge.axes[axisIndex].labelStyle.font.size === '0') ? 0 :
                    ((gauge.loadingAnimationDuration[axisIndex] / this.axisOption[axisIndex].axisLabelCount)),
                progress: function () {
                    element.style.visibility = 'visible';
                },
                end: function () {
                    tickIndex += 1;
                    _this.elementLabelAnimation(document.getElementById(gauge.element.id + '_Axis_' + axisIndex + '_Label_' + tickIndex), axisIndex, tickIndex, gauge);
                    var axisElement = document.getElementById(_this.gauge.element.id + '_Axis_Labels_' + axisIndex);
                    if (_this.gauge.axes[axisIndex].showLastLabel && parseInt(element.id.split('Label_')[1], 10) === (axisElement.childElementCount - 2)) {
                        element = document.getElementById(_this.gauge.element.id + '_Axis_' + axisIndex + '_Label_' + (axisElement.childElementCount - 1));
                        if (element) {
                            element.style.visibility = 'visible';
                        }
                        axisElement.style.visibility = 'visible';
                    }
                    if (_this.rangeAnimationCount === 0 && (_this.axisOption[axisIndex].axisLabelCount - 1) === tickIndex) {
                        axisElement.style.visibility = 'visible';
                        _this.rangeAnimationCount++;
                        _this.rangeAnimation(gauge);
                    }
                }
            });
        }
    };
    AxisLayoutPanel.prototype.axisLineCalculation = function (axisElement, axis, value, gauge) {
        var checkMinValue = value === axis.visibleRange.min;
        var location = gauge.midPoint;
        var isClockWise = axis.direction === 'ClockWise';
        var axisWidth = axis.lineStyle.width / 2;
        var startAngle = getAngleFromValue(axis.visibleRange.min, axis.visibleRange.max, axis.visibleRange.min, axis.startAngle, axis.endAngle, isClockWise);
        var endAngle = getAngleFromValue(value, axis.visibleRange.max, axis.visibleRange.min, axis.startAngle, axis.endAngle, isClockWise);
        if (isClockWise) {
            if (startAngle > endAngle) {
                endAngle = Math.round(startAngle) === Math.round(endAngle) && !checkMinValue ?
                    Math.round(endAngle) - 0.5 : Math.round(endAngle);
            }
            else {
                endAngle = startAngle === endAngle && !checkMinValue ? endAngle + 1 : endAngle;
            }
        }
        else {
            endAngle = Math.round(startAngle) === Math.round(endAngle) && !checkMinValue ?
                [startAngle, startAngle = (endAngle > startAngle ? endAngle + 0.5 : endAngle - 1)][0]
                : [startAngle, startAngle = endAngle][0];
        }
        axisElement.setAttribute('d', getCompleteArc(location, startAngle, endAngle, (axis.currentRadius + axisWidth), (axis.currentRadius - axisWidth), checkMinValue));
    };
    AxisLayoutPanel.prototype.axisLineAnimation = function (axisIndex, duration, gauge) {
        var _this = this;
        // eslint-disable-next-line
        var axis = gauge.axes[axisIndex];
        this.prevAnimatedMajorTickValue.push(axis.minimum);
        this.prevAnimatedMinorTickValue.push(axis.minimum);
        this.prevAnimatedMinorTickIndex.push(0);
        this.prevAnimatedMajorTickIndex.push(0);
        this.prevAnimatedTickType = 'major';
        if (this.axisOption[axisIndex].isAxisLine) {
            var axisElement_1 = document.getElementById(gauge.element.id + '_AxisLine_' + axisIndex);
            var start_1 = axis.visibleRange.min;
            var end_1 = axis.visibleRange.max;
            var pointerValue_1;
            var timeStamp_1;
            var val_1 = Math.abs(start_1 - end_1);
            new Animation$1({}).animate(axisElement_1, {
                duration: duration,
                progress: function (arg) {
                    axisElement_1.style.visibility = 'visible';
                    axisElement_1.setAttribute('fill', axis.lineStyle.color);
                    axisElement_1.setAttribute('stroke-width', '0');
                    timeStamp_1 = (arg.timeStamp / arg.duration);
                    pointerValue_1 = end_1 > start_1 ? start_1 + (timeStamp_1 * val_1) : start_1 - (timeStamp_1 * val_1);
                    _this.axisLineCalculation(axisElement_1, axis, pointerValue_1, gauge);
                },
                end: function () {
                    axisElement_1.setAttribute('fill', 'transparent');
                    axisElement_1.setAttribute('stroke-width', axis.lineStyle.width.toString());
                    axisElement_1.setAttribute('d', getPathArc(gauge.midPoint, axis.startAngle - 90, axis.endAngle - 90, axis.currentRadius));
                    axisElement_1.style.visibility = 'visible';
                    _this.axisAnimation(axisIndex, duration, gauge);
                }
            });
        }
        else if (this.axisOption[axisIndex].isMajorTick || this.axisOption[axisIndex].isMinorTick) {
            if (this.axisOption[axisIndex].isMajorTick || (this.axisOption[axisIndex].isMajorTick &&
                this.axisOption[axisIndex].isMinorTick)) {
                this.tickElementAnimation(document.getElementById(gauge.element.id + '_Axis_Major_TickLine_' + axisIndex + '_' + 0), document.getElementById(gauge.element.id + '_Axis_' + axisIndex + '_Label_' + 0), duration, axisIndex, this.axisOption[axisIndex].isMajorTick &&
                    this.axisOption[axisIndex].isMinorTick
                    ? 0 : -1, 'major', this.axisOption[axisIndex], gauge);
            }
            else if (this.axisOption[axisIndex].isMinorTick) {
                this.tickElementAnimation(document.getElementById(gauge.element.id + '_Axis_Minor_TickLine_' + axisIndex + '_' + 0), document.getElementById(gauge.element.id + '_Axis_' + axisIndex + '_Label_' + 0), duration, axisIndex, -1, 'minor', this.axisOption[axisIndex], gauge);
            }
        }
        else if (!this.axisOption[axisIndex].isAxisLine) {
            this.labelRangeAnimation(gauge, axisIndex);
        }
    };
    AxisLayoutPanel.prototype.axisAnimation = function (axisIndex, duration, gauge) {
        var _this = this;
        var axisElement = document.getElementById(gauge.element.id + '_AxisLine_' + axisIndex);
        var axisOption = this.axisOption[axisIndex];
        new Animation$1({}).animate(axisElement, {
            duration: (this.axisOption[axisIndex].majorTickCount === 0 ? 0
                : duration / this.axisOption[axisIndex].majorTickCount),
            progress: function () {
                axisElement.style.visibility = 'visible';
            },
            end: function () {
                if (axisOption.isMajorTick) {
                    _this.tickElementAnimation(document.getElementById(gauge.element.id + '_Axis_Major_TickLine_' + axisIndex + '_' + 0), document.getElementById(gauge.element.id + '_Axis_' + axisIndex + '_Label_' + 0), duration, axisIndex, axisOption.isMajorTick && axisOption.isMinorTick ? 0 : -1, 'major', axisOption, gauge);
                }
                else if (axisOption.isMinorTick) {
                    _this.tickElementAnimation(document.getElementById(gauge.element.id + '_Axis_Minor_TickLine_' + axisIndex + '_' + 0), document.getElementById(gauge.element.id + '_Axis_' + axisIndex + '_Label_' + 0), duration, axisIndex, -1, 'minor', axisOption, gauge);
                }
                _this.labelRangeAnimation(gauge, axisIndex);
            }
        });
    };
    AxisLayoutPanel.prototype.tickElementAnimation = function (tickElement, labelElement, duration, axisIndex, 
    // eslint-disable-next-line
    tickIndex, type, axis, gauge) {
        var _this = this;
        if (tickElement && this.gauge.isAnimationProgress) {
            new Animation$1({}).animate(tickElement, {
                duration: (axis.isMinorTick ? axis.minorTickCount === 0 ? 0
                    : (duration / axis.minorTickCount) / this.allowAxisCount[axisIndex] :
                    axis.majorTickCount === 0 ? 0 : (duration / axis.majorTickCount) / this.allowAxisCount[axisIndex]),
                progress: function () {
                    tickElement.style.visibility = 'visible';
                },
                end: function () {
                    if (axis.isMajorTick && axis.isMinorTick && gauge.allowLoadingAnimation && _this.gauge.isAnimationProgress) {
                        tickElement.style.visibility = 'visible';
                        var currentTickValue = parseFloat(tickElement.getAttribute('data-interval'));
                        _this.prevAnimatedTickType = type;
                        if (type === 'major') {
                            _this.prevAnimatedMajorTickValue[axisIndex] = currentTickValue;
                            _this.prevAnimatedMajorTickIndex[axisIndex] = tickIndex;
                        }
                        else {
                            _this.prevAnimatedMinorTickValue[axisIndex] = currentTickValue;
                            _this.prevAnimatedMinorTickIndex[axisIndex] = tickIndex;
                        }
                        var minorTickInterval = (gauge.axes[axisIndex].minorTicks.interval != null
                            ? gauge.axes[axisIndex].minorTicks.interval :
                            (gauge.axes[axisIndex].visibleRange.interval / 2));
                        var minorTickValue = minorTickInterval < gauge.axes[axisIndex].visibleRange.interval ? currentTickValue +
                            minorTickInterval : _this.prevAnimatedMinorTickValue[axisIndex] + minorTickInterval;
                        var majorTickValue = _this.prevAnimatedMajorTickValue[axisIndex]
                            + gauge.axes[axisIndex].visibleRange.interval;
                        type = minorTickValue < majorTickValue ? 'minor' : 'major';
                        if (type === 'major' && axis.majorTickCount !== axis.minorTickCount && tickIndex !== 0 && _this.prevAnimatedTickType === 'minor') {
                            tickIndex = _this.prevAnimatedMajorTickIndex[axisIndex];
                        }
                        if (type === 'minor' && axis.majorTickCount !== axis.minorTickCount && tickIndex !== 0 && _this.prevAnimatedTickType === 'major') {
                            tickIndex = _this.prevAnimatedMinorTickIndex[axisIndex];
                        }
                        tickIndex = type === 'minor' ? axis.majorTickCount === axis.minorTickCount ? tickIndex : (currentTickValue ===
                            _this.prevAnimatedMajorTickValue[axisIndex] ? tickIndex : tickIndex + 1) : tickIndex + 1;
                        tickElement = type === 'minor' ? document.getElementById(gauge.element.id + '_Axis_Minor_TickLine_' + axisIndex + '_' + tickIndex) :
                            document.getElementById(gauge.element.id + '_Axis_Major_TickLine_' + axisIndex + '_' + tickIndex);
                        labelElement = type === 'minor' ? null : document.getElementById(gauge.element.id + '_Axis_' + axisIndex + '_Label_' + tickIndex);
                        if (type === 'major' || tickIndex === 0) {
                            _this.labelElementAnimation(document.getElementById(gauge.element.id + '_Axis_' + axisIndex + '_Label_' + tickIndex), axisIndex);
                        }
                        _this.tickElementAnimation(tickElement, labelElement, duration, axisIndex, tickIndex, type, axis, gauge);
                        if (_this.rangeAnimationCount === 0 && type === 'minor' && (tickIndex === axis.minorTickCount - 1 || tickIndex === axis.minorTickCount) && (gauge.axes.length - 1) === axisIndex) {
                            _this.rangeAnimationCount++;
                            _this.rangeAnimation(gauge);
                        }
                    }
                    else if (gauge.allowLoadingAnimation && axis.isMajorTick && _this.gauge.isAnimationProgress) {
                        tickElement.style.visibility = 'visible';
                        type = 'major';
                        tickIndex = tickIndex + 1;
                        tickElement = document.getElementById(gauge.element.id + '_Axis_Major_TickLine_' + axisIndex + '_' + tickIndex);
                        labelElement = document.getElementById(gauge.element.id + '_Axis_' + axisIndex + '_Label_' + tickIndex);
                        _this.tickElementAnimation(tickElement, labelElement, duration, axisIndex, tickIndex, type, axis, gauge);
                        if (type === 'major' || tickIndex === 0) {
                            _this.labelElementAnimation(document.getElementById(gauge.element.id + '_Axis_' + axisIndex + '_Label_' + tickIndex), axisIndex);
                        }
                        if (_this.rangeAnimationCount === 0 && type === 'major' && tickIndex === axis.majorTickCount - 1 && (gauge.axes.length - 1) === axisIndex) {
                            _this.rangeAnimationCount++;
                            _this.rangeAnimation(gauge);
                        }
                    }
                    else if (gauge.allowLoadingAnimation && _this.gauge.isAnimationProgress && axis.isMinorTick) {
                        tickElement.style.visibility = 'visible';
                        type = 'minor';
                        tickIndex = tickIndex + 1;
                        tickElement = document.getElementById(gauge.element.id + '_Axis_Minor_TickLine_' + axisIndex + '_' + tickIndex);
                        labelElement = document.getElementById(gauge.element.id + '_Axis_' + axisIndex + '_Label_' + tickIndex);
                        _this.tickElementAnimation(tickElement, labelElement, duration, axisIndex, tickIndex, type, axis, gauge);
                        if (type === 'minor') {
                            _this.labelElementAnimation(document.getElementById(gauge.element.id + '_Axis_' + axisIndex + '_Label_' + tickIndex), axisIndex);
                        }
                        if (_this.rangeAnimationCount === 0 && type === 'minor' && tickIndex === axis.minorTickCount - 1 && (gauge.axes.length - 1) === axisIndex) {
                            _this.rangeAnimationCount++;
                            _this.rangeAnimation(gauge);
                        }
                    }
                }
            });
        }
        this.labelRangeAnimation(gauge, axisIndex);
    };
    AxisLayoutPanel.prototype.labelRangeAnimation = function (gauge, axisIndex) {
        var options = this.axisOption[axisIndex];
        if (!isNullOrUndefined(options)) {
            if (!options.isMajorTick && !options.isMinorTick && options.isAxisLabel) {
                if (options.axisLabelCount > 0) {
                    if (gauge.axes[axisIndex].labelStyle.hiddenLabel === 'First') {
                        this.elementLabelAnimation(document.getElementById(gauge.element.id + '_Axis_' + axisIndex + '_Label_' + 1), axisIndex, 0, gauge);
                    }
                    else {
                        this.elementLabelAnimation(document.getElementById(gauge.element.id + '_Axis_' + axisIndex + '_Label_' + 0), axisIndex, 0, gauge);
                    }
                }
            }
            else if ((this.rangeAnimationCount === 0 && !options.isMajorTick &&
                !options.isMinorTick && !options.isAxisLabel && options.isRange)
                || this.rangeAnimationCount === 0 && this.gauge.isAnimationProgress
                    && !options.isMajorTick && !options.isMinorTick && !options.isAxisLabel && options.isRange) {
                this.rangeAnimationCount++;
                this.rangeAnimation(gauge);
            }
        }
    };
    AxisLayoutPanel.prototype.rangeAnimation = function (gauge) {
        for (var j = 0; j < gauge.axes.length; j++) {
            var rangesElement = document.getElementById(gauge.element.id + '_Axis_Ranges_' + j);
            if (!isNullOrUndefined(rangesElement) && gauge.allowLoadingAnimation) {
                this.rangeElementAnimation(rangesElement, j, gauge);
            }
        }
    };
    AxisLayoutPanel.prototype.rangeElementAnimation = function (rangeElement, axisIndex, gauge) {
        var _this = this;
        var height = 0;
        var opacity = 1;
        var isRangeAbsent = rangeElement.childElementCount > 0 &&
            gauge.axes[axisIndex].ranges[0].start !== gauge.axes[axisIndex].ranges[0].end;
        new Animation$1({}).animate(rangeElement, {
            duration: isRangeAbsent ? gauge.loadingAnimationDuration[axisIndex] : 0,
            progress: function (args) {
                if (args.timeStamp > args.delay) {
                    height = ((args.timeStamp - args.delay) / args.duration);
                    rangeElement['style']['opacity'] = (opacity * height);
                }
            },
            end: function () {
                rangeElement['style']['opacity'] = opacity;
                var axisElement = document.getElementById(_this.gauge.element.id + '_Axis_Labels_' + axisIndex);
                if (!isNullOrUndefined(axisElement)) {
                    axisElement.style.visibility = 'visible';
                }
                if (gauge.allowLoadingAnimation && axisIndex === 0) {
                    _this.axisOption = [];
                    gauge.axes.map(function (axis, axisindex) {
                        axis.pointers.map(function (pointer, pointerIndex) {
                            var pointerElement = document.getElementById(gauge.element.id + '_Axis_' + axisindex + '_Pointer_' + pointerIndex);
                            if (!isNullOrUndefined(pointerElement) && _this.gauge.isAnimationProgress) {
                                pointer.previousValue = !_this.gauge.isPropertyChange ? axis.minimum : pointer.previousValue;
                                gauge.gaugeAxisLayoutPanel.pointerRenderer.doPointerAnimation(pointerElement, pointer, axis, axisIndex);
                            }
                        });
                        if (axis.pointers.length === 0 && _this.gauge.isAnimationProgress) {
                            if (_this.gauge.loadingAnimationDuration[axisIndex] > 0 &&
                                !isNullOrUndefined(_this.gauge.annotationsModule)) {
                                _this.gauge.annotationsModule.annotationAnimation(_this.gauge);
                            }
                        }
                        else {
                            _this.gauge.isOverAllAnimationComplete = true;
                        }
                    });
                }
            }
        });
    };
    AxisLayoutPanel.prototype.durationSplitUp = function (duration, axesElements) {
        var splitUpCount = 0;
        this.gauge.loadingAnimationDuration = [];
        for (var i = 0; i < axesElements.childElementCount; i++) {
            splitUpCount = 0;
            var axisCount = 0;
            var element = axesElements.children[i];
            var isAxisLine = false;
            var isMajorTick = false;
            var majorTickCount = 0;
            var labelCount = 0;
            var isMinorTick = false;
            var minorTickCount = 0;
            var isLabel = false;
            var isrange = false;
            var isPointer = false;
            for (var j = 0; j < element.childElementCount; j++) {
                var elementId = element.children[j]['id'];
                if (elementId.indexOf('_AxisLine_') > 0) {
                    isAxisLine = true;
                    splitUpCount++;
                }
                else if (elementId.indexOf('MajorTickLines') > 0) {
                    isMajorTick = true;
                    axisCount++;
                    majorTickCount = element.children[j].childElementCount;
                    splitUpCount++;
                }
                else if (elementId.indexOf('MinorTickLines') > 0) {
                    isMinorTick = true;
                    axisCount++;
                    minorTickCount = element.children[j].childElementCount;
                    if (!isMajorTick) {
                        splitUpCount++;
                    }
                }
                else if (elementId.indexOf('_Axis_Labels_') > 0) {
                    isLabel = true;
                    axisCount++;
                    labelCount = element.children[j].childElementCount;
                    if (!isMajorTick && !isMinorTick && this.gauge.axes[i].labelStyle.font.size != null &&
                        (this.gauge.axes[i].labelStyle.font.size !== '0px' && this.gauge.axes[i].labelStyle.font.size !== '0')) {
                        splitUpCount++;
                    }
                }
                else if (elementId.indexOf('_Axis_Ranges_') > 0) {
                    isrange = true;
                    if (this.gauge.axes[i].ranges.length === 1
                        && (!isNullOrUndefined(this.gauge.axes[i].ranges)
                            && this.gauge.axes[i].ranges[0].start === 0
                            && this.gauge.axes[i].ranges[0].end === 0)) {
                        splitUpCount++;
                    }
                }
                else if (elementId.indexOf('_Axis_Pointers_') > 0) {
                    isPointer = true;
                    if (this.gauge.axes[i].pointers.length > 0 && this.gauge.axes[i].pointers.length !== 1 &&
                        this.gauge.axes[i].pointers[0].value !== this.gauge.axes[i].minimum) {
                        splitUpCount++;
                    }
                }
            }
            this.allowAxisCount.push(axisCount === 0 ? 1 : axisCount);
            this.axisOption.push({
                isAxisLine: isAxisLine, isMajorTick: isMajorTick, isMinorTick: isMinorTick,
                isAxisLabel: isLabel, isPointer: isPointer, isRange: isrange,
                axisLabelCount: labelCount, majorTickCount: majorTickCount, minorTickCount: minorTickCount
            });
            isAxisLine = false;
            isMajorTick = false;
            majorTickCount = 0;
            isMinorTick = false;
            labelCount = 0;
            minorTickCount = 0;
            isLabel = false;
            isrange = false;
            isPointer = false;
            if (this.gauge.axes[i].annotations != null
                && this.gauge.axes[i].annotations.length > 0
                && !isNullOrUndefined(this.gauge.annotationsModule)) {
                splitUpCount++;
            }
            this.gauge.loadingAnimationDuration.push(splitUpCount === 0 ? duration : duration / splitUpCount);
        }
    };
    /**
     * Calculate maximum label width for the axis.
     *
     * @param {CircularGauge} gauge - Specifies the instance of the gauge.
     * @param {Axis} axis - Specifies the axis.
     * @returns {void}
     */
    AxisLayoutPanel.prototype.getMaxLabelWidth = function (gauge, axis) {
        axis.maxLabelSize = new Size(0, 0);
        var textStyle = {
            size: axis.labelStyle.font.size || this.gauge.themeStyle.fontSize,
            color: axis.labelStyle.font.color || this.gauge.themeStyle.labelColor,
            fontFamily: axis.labelStyle.font.fontFamily || this.gauge.themeStyle.labelFontFamily,
            fontWeight: axis.labelStyle.font.fontWeight || this.gauge.themeStyle.fontWeight,
            fontStyle: axis.labelStyle.font.fontStyle,
            opacity: axis.labelStyle.font.opacity
        };
        for (var _i = 0, _a = axis.visibleLabels; _i < _a.length; _i++) {
            var label = _a[_i];
            label.size = measureText(label.text, textStyle);
            axis.maxLabelSize.width = label.size.width > axis.maxLabelSize.width ?
                label.size.width : axis.maxLabelSize.width;
            axis.maxLabelSize.height = label.size.height > axis.maxLabelSize.height ?
                label.size.height : axis.maxLabelSize.height;
        }
    };
    AxisLayoutPanel.prototype.destroy = function () {
        this.gauge = null;
        this.farSizes = [];
        if (!isNullOrUndefined(this.axisRenderer)) {
            this.axisRenderer.destroy();
        }
        this.axisRenderer = null;
        if (!isNullOrUndefined(this.pointerRenderer)) {
            this.pointerRenderer.destroy();
        }
        this.pointerRenderer = null;
        this.axisOption = null;
        this.prevAnimatedMajorTickValue = null;
        this.prevAnimatedMajorTickIndex = null;
        this.prevAnimatedMinorTickIndex = null;
        this.prevAnimatedMinorTickValue = null;
        this.allowAxisCount = null;
    };
    return AxisLayoutPanel;
}());

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

/**
 * Represent the Pdf export for gauge
 *
 * @hidden
 */
var PdfExport = /** @class */ (function () {
    /**
     * Constructor for gauge
     *
     * @param {CircularGauge} control - Specfies the instance of the gauge.
     */
    // eslint-disable-next-line
    function PdfExport(control) {
    }
    /**
     * To export the file as image/svg format
     *
     * @param {CircularGauge} gauge - Specifies the instance of Circular Gauge.
     * @param {ExportType} type - Specifies the type of the document.
     * @param {string} fileName Specfies the file name of the document.
     * @param {PdfPageOrientation} orientation - Specfies the orientation of the PDF document to export the gauge.
     * @param {boolean} allowDownload - Specfies whether to download the document or not.
     * @returns {Promise<string>} - Returns the promise string
     * @private
     */
    PdfExport.prototype.export = function (gauge, type, fileName, orientation, allowDownload) {
        // eslint-disable-next-line
        var promise = new Promise(function (resolve, reject) {
            var element = createElement('canvas', {
                id: 'ej2-canvas',
                attrs: {
                    'width': gauge.availableSize.width.toString(),
                    'height': gauge.availableSize.height.toString()
                }
            });
            orientation = isNullOrUndefined(orientation) ? PdfPageOrientation.Landscape : orientation;
            var exportElement = gauge.svgObject.cloneNode(true);
            var backgroundElement = exportElement.childNodes[0];
            var backgroundColor = backgroundElement.getAttribute('fill');
            if ((gauge.theme === 'Tailwind' || gauge.theme === 'Tailwind3' || gauge.theme === 'Bootstrap5' || gauge.theme === 'Fluent' || gauge.theme === 'Material3' ||
                gauge.theme === 'Fluent2')
                && (backgroundColor === 'rgba(255,255,255, 0.0)' || backgroundColor === 'transparent')) {
                exportElement.childNodes[0].setAttribute('fill', 'rgba(255,255,255, 1)');
            }
            else if ((gauge.theme === 'TailwindDark' || gauge.theme === 'Tailwind3Dark' || gauge.theme === 'Bootstrap5Dark' || gauge.theme === 'FluentDark' || gauge.theme === 'Material3Dark' ||
                gauge.theme === 'Fluent2Dark' || gauge.theme === 'Fluent2HighContrast')
                && (backgroundColor === 'rgba(255,255,255, 0.0)' || backgroundColor === 'transparent')) {
                exportElement.childNodes[0].setAttribute('fill', 'rgba(0, 0, 0, 1)');
            }
            var url = window.URL.createObjectURL(new Blob([(new XMLSerializer()).serializeToString(exportElement)], { type: 'image/svg+xml' }));
            var image = new Image();
            var context = element.getContext('2d');
            image.onload = (function () {
                context.drawImage(image, 0, 0);
                window.URL.revokeObjectURL(url);
                var document = new PdfDocument();
                var imageString = element.toDataURL('image/jpeg').replace('image/jpeg', 'image/octet-stream');
                document.pageSettings.orientation = orientation;
                imageString = imageString.slice(imageString.indexOf(',') + 1);
                document.pages.add().graphics.
                    drawImage(new PdfBitmap(imageString), 0, 0, gauge.availableSize.width, gauge.availableSize.height);
                if (allowDownload) {
                    document.save(fileName + '.pdf');
                    document.destroy();
                }
                else {
                    resolve(null);
                }
            });
            image.src = url;
        });
        return promise;
    };
    PdfExport.prototype.getModuleName = function () {
        // Returns te module name
        return 'PdfExport';
    };
    /**
     * To destroy the PdfExport.
     *
     * @returns {void}
     * @private
     */
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    PdfExport.prototype.destroy = function () { };
    return PdfExport;
}());

/**
 * Represent the Image Export for gauge
 *
 * @hidden
 */
var ImageExport = /** @class */ (function () {
    /**
     * Constructor for gauge
     *
     *  @param {CircularGauge} control - Specfies the instance of the gauge
     */
    // eslint-disable-next-line
    function ImageExport(control) {
    }
    /**
     * To export the file as image/svg format
     *
     * @param {CircularGauge} gauge - Specifies the instance of Circular Gauge.
     * @param {ExportType} type - Specifies the type of the image file.
     * @param {string} fileName - Specifies the file name of the image file.
     * @param {boolean} allowDownload - Specifies whether to download the image file or not.
     * @returns {Promise<string>} - Returns promise string.
     * @private
     */
    ImageExport.prototype.export = function (gauge, type, fileName, allowDownload) {
        var _this = this;
        // eslint-disable-next-line
        var promise = new Promise(function (resolve, reject) {
            var isDownload = !(Browser.userAgent.toString().indexOf('HeadlessChrome') > -1);
            var element = createElement('canvas', {
                id: 'ej2-canvas',
                attrs: {
                    'width': gauge.availableSize.width.toString(),
                    'height': gauge.availableSize.height.toString()
                }
            });
            var exportElement = gauge.svgObject.cloneNode(true);
            var backgroundElement = exportElement.childNodes[0];
            var backgroundColor = backgroundElement.getAttribute('fill');
            if ((gauge.theme === 'Tailwind' || gauge.theme === 'Tailwind3' || gauge.theme === 'Bootstrap5' || gauge.theme === 'Fluent' || gauge.theme === 'Material3' ||
                gauge.theme === 'Fluent2')
                && (backgroundColor === 'rgba(255,255,255, 0.0)' || backgroundColor === 'transparent')) {
                exportElement.childNodes[0].setAttribute('fill', 'rgba(255,255,255, 1)');
            }
            else if ((gauge.theme === 'TailwindDark' || gauge.theme === 'Tailwind3Dark' || gauge.theme === 'Bootstrap5Dark' || gauge.theme === 'FluentDark' || gauge.theme === 'Material3Dark' ||
                gauge.theme === 'Fluent2Dark' || gauge.theme === 'Fluent2HighContrast')
                && (backgroundColor === 'rgba(255,255,255, 0.0)' || backgroundColor === 'transparent')) {
                exportElement.childNodes[0].setAttribute('fill', 'rgba(0, 0, 0, 1)');
            }
            var svgData = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">' +
                exportElement.outerHTML +
                '</svg>';
            var url = window.URL.createObjectURL(new Blob(type === 'SVG' ? [svgData] :
                [(new XMLSerializer()).serializeToString(exportElement)], { type: 'image/svg+xml' }));
            if (type === 'SVG') {
                if (allowDownload) {
                    _this.triggerDownload(fileName, type, url, isDownload);
                }
                else {
                    resolve(null);
                }
            }
            else {
                var image_1 = new Image();
                var context_1 = element.getContext('2d');
                image_1.onload = (function () {
                    context_1.drawImage(image_1, 0, 0);
                    window.URL.revokeObjectURL(url);
                    if (allowDownload) {
                        _this.triggerDownload(fileName, type, element.toDataURL('image/png').replace('image/png', 'image/octet-stream'), isDownload);
                    }
                    else {
                        if (type === 'JPEG') {
                            resolve(element.toDataURL('image/jpeg'));
                        }
                        else if (type === 'PNG') {
                            resolve(element.toDataURL('image/png'));
                        }
                    }
                });
                image_1.src = url;
            }
        });
        return promise;
    };
    ImageExport.prototype.getModuleName = function () {
        // Returns te module name
        return 'ImageExport';
    };
    /**
     * To destroy the ImageExport.
     *
     * @returns {void}
     * @private
     */
    /* eslint-disable-next-line @typescript-eslint/no-empty-function */
    ImageExport.prototype.destroy = function () { };
    /**
     * To trigger the download element
     *
     * @param {string} fileName - Specifies the file name.
     * @param {ExportType} type - Specifies the export type.
     * @param {string} url - Specifies the url.
     * @param {boolean} isDownload - Specifies the boolean value.
     * @returns {void}
     */
    ImageExport.prototype.triggerDownload = function (fileName, type, url, isDownload) {
        createElement('a', {
            attrs: {
                'download': fileName + '.' + type.toLocaleLowerCase(),
                'href': url
            }
        }).dispatchEvent(new MouseEvent(isDownload ? 'click' : 'move', {
            view: window,
            bubbles: false,
            cancelable: true
        }));
    };
    return ImageExport;
}());

/**
 * Represent the print for gauge
 *
 * @hidden
 */
var Print = /** @class */ (function () {
    /**
     * Constructor for gauge
     *
     * @param {CircularGauge} control - Specifies the instance of the gauge.
     */
    // eslint-disable-next-line
    function Print(control) {
    }
    /**
     * To print the gauge
     *
     * @param {CircularGauge} gauge - Specifies the instance of Circular Gauge.
     * @param {string[] | string | Element} elements - Specifies the element.
     * @returns {void}
     * @private
     */
    Print.prototype.print = function (gauge, elements) {
        var printWindow = window.open('', 'print', 'height=' + window.outerHeight + ',width=' + window.outerWidth + ',tabbar=no');
        printWindow.moveTo(0, 0);
        printWindow.resizeTo(screen.availWidth, screen.availHeight);
        var argsData = {
            cancel: false, htmlContent: this.getHTMLContent(gauge, elements), name: beforePrint
        };
        // eslint-disable-next-line
        gauge.trigger('beforePrint', argsData, function (beforePrintArgs) {
            if (!argsData.cancel) {
                print(argsData.htmlContent, printWindow);
            }
        });
    };
    /**
     * To get the html string of the gauge
     *
     * @param {CircularGauge} gauge - Specifies the instance of Circular Gauge.
     * @param { string[] | string | Element} elements - Specifies the element.
     * @returns {Element} - Returns the div element.
     * @private
     */
    Print.prototype.getHTMLContent = function (gauge, elements) {
        var div = createElement('div');
        if (elements) {
            if (elements instanceof Array) {
                elements.forEach(function (value) {
                    div.appendChild(getElement(value).cloneNode(true));
                });
            }
            else if (elements instanceof Element) {
                div.appendChild(elements.cloneNode(true));
            }
            else {
                div.appendChild(getElement(elements).cloneNode(true));
            }
        }
        else {
            var exportElement = gauge.element.cloneNode(true);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            var backgroundElement = exportElement.getElementsByTagName('svg')[0];
            if (!isNullOrUndefined(backgroundElement)) {
                backgroundElement = backgroundElement.childNodes[0];
                if (!isNullOrUndefined(backgroundElement)) {
                    var backgroundColor = backgroundElement.getAttribute('fill');
                    if ((gauge.theme === 'Tailwind' || gauge.theme === 'Tailwind3' || gauge.theme === 'Bootstrap5' || gauge.theme === 'Fluent' || gauge.theme === 'Material3' ||
                        gauge.theme === 'Fluent2')
                        && (backgroundColor === 'rgba(255,255,255, 0.0)' || backgroundColor === 'transparent')) {
                        backgroundElement.setAttribute('fill', 'rgba(255,255,255, 1)');
                    }
                    else if ((gauge.theme === 'TailwindDark' || gauge.theme === 'Tailwind3Dark' || gauge.theme === 'Bootstrap5Dark' || gauge.theme === 'FluentDark' || gauge.theme === 'Material3Dark' ||
                        gauge.theme === 'Fluent2Dark' || gauge.theme === 'Fluent2HighContrast')
                        && (backgroundColor === 'rgba(255,255,255, 0.0)' || backgroundColor === 'transparent')) {
                        backgroundElement.setAttribute('fill', 'rgba(0, 0, 0, 1)');
                    }
                }
            }
            div.appendChild(exportElement);
        }
        return div;
    };
    Print.prototype.getModuleName = function () {
        // Returns te module name
        return 'Print';
    };
    /**
     * To destroy the Print.
     *
     * @returns {void}
     * @private
     */
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    Print.prototype.destroy = function () { };
    return Print;
}());

var __extends$3 = (undefined && undefined.__extends) || (function () {
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
var __decorate$2 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * Specifies the color information for the gradient in the circular gauge.
 */
var ColorStop = /** @class */ (function (_super) {
    __extends$3(ColorStop, _super);
    function ColorStop() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate$2([
        Property('#000000')
    ], ColorStop.prototype, "color", void 0);
    __decorate$2([
        Property(1)
    ], ColorStop.prototype, "opacity", void 0);
    __decorate$2([
        Property('0%')
    ], ColorStop.prototype, "offset", void 0);
    __decorate$2([
        Property('')
    ], ColorStop.prototype, "style", void 0);
    return ColorStop;
}(ChildProperty));
/**
 * Specifies the position in percentage from which the radial gradient must be applied.
 */
var GradientPosition = /** @class */ (function (_super) {
    __extends$3(GradientPosition, _super);
    function GradientPosition() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate$2([
        Property('0%')
    ], GradientPosition.prototype, "x", void 0);
    __decorate$2([
        Property('0%')
    ], GradientPosition.prototype, "y", void 0);
    return GradientPosition;
}(ChildProperty));
/**
 * This specifies the properties of the linear gradient colors for the circular gauge.
 */
var LinearGradient = /** @class */ (function (_super) {
    __extends$3(LinearGradient, _super);
    function LinearGradient() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate$2([
        Property(null)
    ], LinearGradient.prototype, "startValue", void 0);
    __decorate$2([
        Property(null)
    ], LinearGradient.prototype, "endValue", void 0);
    __decorate$2([
        Collection([{ color: '#000000', opacity: 1, offset: '0%', style: '' }], ColorStop)
    ], LinearGradient.prototype, "colorStop", void 0);
    return LinearGradient;
}(ChildProperty));
/**
 * This specifies the properties of the radial gradient colors for the circular gauge.
 */
var RadialGradient = /** @class */ (function (_super) {
    __extends$3(RadialGradient, _super);
    function RadialGradient() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate$2([
        Property('0%')
    ], RadialGradient.prototype, "radius", void 0);
    __decorate$2([
        Complex({ x: '0%', y: '0%' }, GradientPosition)
    ], RadialGradient.prototype, "outerPosition", void 0);
    __decorate$2([
        Complex({ x: '0%', y: '0%' }, GradientPosition)
    ], RadialGradient.prototype, "innerPosition", void 0);
    __decorate$2([
        Collection([{ color: '#000000', opacity: 1, offset: '0%', style: '' }], ColorStop)
    ], RadialGradient.prototype, "colorStop", void 0);
    return RadialGradient;
}(ChildProperty));
/**
 * Sets and gets the module that enables the gradient option for pointers and ranges.
 *
 * @hidden
 */
var Gradient = /** @class */ (function () {
    /**
     * Constructor for gauge
     *
     * @param {CircularGauge} gauge - Specifies the instance of the gauge
     */
    function Gradient(gauge) {
        this.gauge = gauge;
    }
    /**
     * To get linear gradient string for pointers and ranges
     *
     * @param { PointerModel | CapModel | NeedleTailModel | RangeModel} element - Specifies the element.
     * @param {name} name - Specifies the name of the gradient.
     * @param {name} direction - Specifies the gradient position.
     * @returns {string} - Returns the string value.
     * @private
     */
    Gradient.prototype.calculateLinearGradientPosition = function (element, name, direction) {
        var linearPosition = {
            id: name,
            x1: (isNullOrUndefined(element.linearGradient.startValue) && name.indexOf('range') !== -1
                ? (direction === 'right' ? '100%' : '0%')
                : (!isNullOrUndefined(element.linearGradient.startValue) ? ((element.linearGradient.startValue.indexOf('%') === -1 ?
                    element.linearGradient.startValue :
                    parseFloat(element.linearGradient.startValue).toString()) + '%') : '0%')),
            x2: (isNullOrUndefined(element.linearGradient.endValue) && name.indexOf('range') !== -1 ?
                (direction === 'left' ? '100%' : '0%') :
                (!isNullOrUndefined(element.linearGradient.endValue) ? ((element.linearGradient.endValue.indexOf('%') === -1 ?
                    element.linearGradient.endValue : parseFloat(element.linearGradient.endValue).toString()) + '%') : '100%')),
            y1: (isNullOrUndefined(element.linearGradient.startValue) && name.indexOf('range') !== -1
                ? (direction === 'bottom' ? '100%' : '0%') : '0%'),
            y2: (isNullOrUndefined(element.linearGradient.endValue) && name.indexOf('range') !== -1
                ? (direction === 'top' ? '100%' : '0%') : '0%')
        };
        return linearPosition;
    };
    /**
     * To get linear gradient string for pointers and ranges
     *
     * @param { PointerModel | CapModel | NeedleTailModel | RangeModel} element - Specifies the element.
     * @param {number} index - Specifies the index of the axis.
     * @param { string } direction - Specifies the gradient position.
     * @param { number } rangeIndex - Specifies the index of the range.
     * @returns {string} - Returns the string value.
     * @private
     */
    Gradient.prototype.getLinearGradientColor = function (element, index, direction, rangeIndex) {
        var render = new SvgRenderer('');
        var colors = (isNullOrUndefined(element.linearGradient.startValue) &&
            isNullOrUndefined(element.linearGradient.endValue) && !isNullOrUndefined(rangeIndex)) ?
            this.getCircularGradientColor(element.linearGradient.colorStop, index) :
            this.getGradientColor(element.linearGradient.colorStop);
        var name = (isNullOrUndefined(element.linearGradient.startValue) &&
            isNullOrUndefined(element.linearGradient.endValue) && !isNullOrUndefined(rangeIndex)) ?
            '_' + this.gauge.svgObject.id + '_range_' +
                rangeIndex + '_color_' + index + '_' + 'linearGradient'
            : '_' + this.gauge.svgObject.id + '_' + this.gauge.gradientCount + '_' + 'linearGradient';
        var gradientPosition = this.calculateLinearGradientPosition(element, name, direction);
        gradientPosition = {
            id: gradientPosition.id,
            x1: gradientPosition.x1,
            x2: gradientPosition.x2,
            y1: gradientPosition.y1,
            y2: gradientPosition.y2
        };
        var def = render.drawGradient('linearGradient', gradientPosition, colors);
        this.gauge.svgObject.appendChild(def);
        return 'url(#' + name + ')';
    };
    /**
     * To get color, opacity, offset and style for circular gradient path.
     *
     * @param {ColorStopModel[]} colorStop - Specifies the colorStop.
     * @param {number} index - Specifies the index.
     * @returns {GradientColor[]} - return the gradient color value.
     * @private
     */
    Gradient.prototype.getCircularGradientColor = function (colorStop, index) {
        var colors = [];
        var colorIndex = index;
        for (var j = colorIndex; j < (index === (colorStop.length - 1) ? index + 1 : index + 2); j++) {
            var color = {
                color: colorStop[j].color,
                colorStop: colorStop[j].offset,
                opacity: colorStop[j].opacity ? colorStop[j].opacity.toString() : '1',
                style: colorStop[j].style
            };
            colors.push(color);
            colorIndex++;
        }
        return colors;
    };
    /**
     * To get the radial gradient string.
     *
     * @param {PointerModel | CapModel | NeedleTailModel | RangeModel} element - Specifies the element.
     * @returns {string} - Returns the string.
     * @private
     */
    Gradient.prototype.getRadialGradientColor = function (element) {
        var render = new SvgRenderer('');
        var colors = this.getGradientColor(element.radialGradient.colorStop);
        var name = '_' + this.gauge.svgObject.id + '_' + this.gauge.gradientCount + '_' + 'radialGradient';
        var gradientPosition = {
            id: name,
            r: !isNullOrUndefined(element.radialGradient.radius) ?
                (element.radialGradient.radius.indexOf('%') === -1 ?
                    element.radialGradient.radius :
                    parseFloat(element.radialGradient.radius).toString()) + '%' : '0%',
            cx: (!isNullOrUndefined(element.radialGradient.outerPosition) && !isNullOrUndefined(element.radialGradient.outerPosition.x)) ?
                (element.radialGradient.outerPosition.x.indexOf('%') === -1 ?
                    element.radialGradient.outerPosition.x :
                    parseFloat(element.radialGradient.outerPosition.x).toString()) + '%' : '0%',
            cy: (!isNullOrUndefined(element.radialGradient.outerPosition) && !isNullOrUndefined(element.radialGradient.outerPosition.y)) ?
                (element.radialGradient.outerPosition.y.indexOf('%') === -1 ?
                    element.radialGradient.outerPosition.y :
                    parseFloat(element.radialGradient.outerPosition.y).toString()) + '%' : '0%',
            fx: (!isNullOrUndefined(element.radialGradient.innerPosition) && !isNullOrUndefined(element.radialGradient.innerPosition.x)) ?
                (element.radialGradient.innerPosition.x.indexOf('%') === -1 ?
                    element.radialGradient.innerPosition.x :
                    parseFloat(element.radialGradient.innerPosition.x).toString()) + '%' : '0%',
            fy: (!isNullOrUndefined(element.radialGradient.innerPosition) && !isNullOrUndefined(element.radialGradient.innerPosition.y)) ?
                (element.radialGradient.innerPosition.y.indexOf('%') === -1 ?
                    element.radialGradient.innerPosition.y :
                    parseFloat(element.radialGradient.innerPosition.y).toString()) + '%' : '0%'
        };
        var def = render.drawGradient('radialGradient', gradientPosition, colors);
        this.gauge.svgObject.appendChild(def);
        return 'url(#' + name + ')';
    };
    /**
     * To get color, opacity, offset and style.
     *
     * @param { ColorStopModel[]} colorStop - Specifies the color stop.
     * @returns {GradientColor[]} - Returns the gradientColor.
     * @private
     */
    Gradient.prototype.getGradientColor = function (colorStop) {
        var colors = [];
        for (var j = 0; j < colorStop.length; j++) {
            var color = {
                color: colorStop[j].color,
                colorStop: colorStop[j].offset,
                opacity: colorStop[j].opacity ? colorStop[j].opacity.toString() : '1',
                style: colorStop[j].style
            };
            colors.push(color);
        }
        return colors;
    };
    /**
     * To get a gradient color string
     *
     * @param {PointerModel | CapModel | NeedleTailModel | RangeModel} element - Specifies the element.
     * @param {number} index - specifies the index.
     * @param {string} direction - specifies the direction.
     * @param {number} rangeIndex - specifies the index of range.
     * @returns {string} - Returns the string
     * @private
     */
    Gradient.prototype.getGradientColorString = function (element, index, direction, rangeIndex) {
        var gradientColor;
        if ((element.linearGradient && !isNullOrUndefined(element.linearGradient.colorStop)) ||
            (element.radialGradient && !isNullOrUndefined(element.radialGradient.colorStop))) {
            if (element.linearGradient) {
                gradientColor = this.getLinearGradientColor(element, index, direction, rangeIndex);
            }
            else {
                gradientColor = this.getRadialGradientColor(element);
            }
            this.gauge.gradientCount = this.gauge.gradientCount + 1;
        }
        else {
            return null;
        }
        return gradientColor;
    };
    Gradient.prototype.getModuleName = function () {
        // Returns te module name
        return 'Gradient';
    };
    /**
     * To destroy the Gradient.
     *
     * @returns {void}
     * @private
     */
    Gradient.prototype.destroy = function () {
        this.gauge = null;
    };
    return Gradient;
}());

var __extends$4 = (undefined && undefined.__extends) || (function () {
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
var __decorate$3 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * Represents the circular gauge control. This is used to customize the properties of the circular gauge to visualize the data in circular scale.
 * ```html
 * <div id="gauge"/>
 * <script>
 *   var gaugeObj = new CircularGauge();
 *   gaugeObj.appendTo("#gauge");
 * </script>
 * ```
 */
var CircularGauge = /** @class */ (function (_super) {
    __extends$4(CircularGauge, _super);
    /**
     * Constructor for creating the widget
     *
     * @param {CircularGaugeModel} options - Specifies the options
     * @param {string} element - Specifies the element
     * @hidden
     */
    function CircularGauge(options, element) {
        var _this = _super.call(this, options, element) || this;
        /** @private */
        _this.allowLoadingAnimation = false;
        /** @private */
        _this.isRangeUpdate = false;
        /** @private */
        _this.isAnimationProgress = true;
        /** @private */
        _this.isResize = false;
        /** @private */
        _this.isOverAllAnimationComplete = false;
        /** @private */
        _this.isDrag = false;
        /**
         * @private
         */
        _this.gradientCount = 0;
        CircularGauge_1.Inject(Gradient);
        if (element) {
            _this.appendTo(element);
        }
        return _this;
    }
    CircularGauge_1 = CircularGauge;
    /**
     * To create svg object, renderer and binding events for the container.
     *
     * @returns {void}
     */
    CircularGauge.prototype.preRender = function () {
        if (!isNullOrUndefined(this.element)) {
            this.unWireEvents();
            this.trigger(load, { gauge: this });
            this.initPrivateVariable();
            this.setCulture();
            this.createSvg();
            this.wireEvents();
        }
    };
    /**
     * To render the circular gauge elements
     *
     * @returns {void}
     */
    CircularGauge.prototype.render = function () {
        if (!isNullOrUndefined(this.element)) {
            this.setTheme();
            this.calculateBounds();
            this.isPropertyChange = false;
            this.allowLoadingAnimation = ((this.animationDuration === 0 && animationMode === 'Enable') || this.animationDuration > 0)
                && !this.isOverAllAnimationComplete;
            this.renderElements(true);
            this.renderAnimation();
            this.renderComplete();
        }
    };
    CircularGauge.prototype.setTheme = function () {
        this.themeStyle = getThemeStyle(this.theme);
    };
    /**
     * Method to unbind events for circular gauge
     *
     * @returns {void}
     */
    CircularGauge.prototype.unWireEvents = function () {
        EventHandler.remove(this.element, Browser.touchStartEvent, this.gaugeOnMouseDown);
        EventHandler.remove(this.element, Browser.touchMoveEvent, this.mouseMove);
        EventHandler.remove(this.element, Browser.touchEndEvent, this.mouseEnd);
        EventHandler.remove(this.element, 'click', this.gaugeOnMouseClick);
        EventHandler.remove(this.element, 'contextmenu', this.gaugeRightClick);
        EventHandler.remove(this.element, (Browser.isPointer ? 'pointerleave' : 'mouseleave'), this.mouseLeave);
        window.removeEventListener((Browser.isTouch && ('orientation' in window && 'onorientationchange' in window)) ? 'orientationchange' : 'resize', this.resizeEvent);
    };
    /**
     * Method to bind events for circular gauge
     *
     * @returns {void}
     */
    CircularGauge.prototype.wireEvents = function () {
        /*! Bind the Event handler */
        EventHandler.add(this.element, Browser.touchStartEvent, this.gaugeOnMouseDown, this);
        EventHandler.add(this.element, Browser.touchMoveEvent, this.mouseMove, this);
        EventHandler.add(this.element, Browser.touchEndEvent, this.mouseEnd, this);
        EventHandler.add(this.element, 'click', this.gaugeOnMouseClick, this);
        EventHandler.add(this.element, 'contextmenu', this.gaugeRightClick, this);
        EventHandler.add(this.element, (Browser.isPointer ? 'pointerleave' : 'mouseleave'), this.mouseLeave, this);
        this.resizeEvent = this.gaugeResize.bind(this);
        window.addEventListener((Browser.isTouch && ('orientation' in window && 'onorientationchange' in window)) ? 'orientationchange' : 'resize', this.resizeEvent);
        /*! Apply the style for circular gauge */
        this.setGaugeStyle(this.element);
    };
    /**
     * Handles the mouse click on accumulation chart.
     *
     * @param {PointerEvent} e - Specifies the pointer event
     * @returns {boolean} - Returns the boolean value
     * @private
     */
    CircularGauge.prototype.gaugeOnMouseClick = function (e) {
        this.setMouseXY(e);
        if (this.legendModule && this.legendSettings.visible) {
            this.legendModule.click(e);
        }
        return false;
    };
    /**
     * Handles the mouse move.
     *
     * @param {PointerEvent} e - Specifies the pointer event
     * @returns {boolean} - Returns the boolean value
     * @private
     */
    CircularGauge.prototype.mouseMove = function (e) {
        var _this = this;
        this.setMouseXY(e);
        var args = this.getMouseArgs(e, 'touchmove', gaugeMouseMove);
        this.trigger('gaugeMouseMove', args, function (observedArgs) {
            var dragArgs;
            var pointerDrag = false;
            if ((!isNullOrUndefined(_this.activePointer) ? _this.activePointer.pathElement[0].id === args.target.id : true)) {
                var pointerIndex = args.target.id.indexOf('_Pointer_') > -1 ? parseInt(args.target.id.slice(-1), 10) : null;
                var axisIndex = args.target.id.indexOf('_Axis_') > -1 ? parseInt(args.target.id.split('_Axis_')[1], 10) : null;
                pointerDrag = (_this.allowPointerDrag && !isNullOrUndefined(axisIndex) && !isNullOrUndefined(pointerIndex))
                    ? _this.axes[axisIndex].pointers[pointerIndex].enableDrag
                    : _this.enablePointerDrag;
                _this.isPointerDragged = pointerDrag;
            }
            if (!args.cancel) {
                if ((_this.isPointerDragged || _this.enableRangeDrag) && _this.svgObject.getAttribute('cursor') !== 'grabbing') {
                    if ((args.target.id.indexOf('_Pointer_') !== -1 && _this.isPointerDragged) || (_this.enableRangeDrag && args.target.id.indexOf('_Range_') !== -1)) {
                        _this.svgObject.setAttribute('cursor', 'pointer');
                    }
                    else {
                        _this.svgObject.setAttribute('cursor', 'auto');
                    }
                }
                else if (_this.svgObject.getAttribute('cursor') !== 'grabbing') {
                    _this.svgObject.setAttribute('cursor', 'auto');
                }
                var svgElement = getElement(_this.element.id + '_svg');
                var extraWidth = _this.element.getBoundingClientRect().left - svgElement.getBoundingClientRect().left;
                if (_this.isPointerDragged && _this.activePointer) {
                    _this.isDrag = true;
                    e.preventDefault();
                    var dragPointInd = parseInt(_this.activePointer.pathElement[0].id.slice(-1), 10);
                    var dragAxisInd = parseInt(_this.activePointer.pathElement[0].id.split('_Axis_')[1], 10);
                    dragArgs = {
                        axis: _this.activeAxis,
                        pointer: _this.activePointer,
                        previousValue: _this.activePointer.currentValue,
                        name: dragMove,
                        type: pointerMove,
                        currentValue: null,
                        axisIndex: dragAxisInd,
                        pointerIndex: dragPointInd
                    };
                    _this.pointerDrag(new GaugeLocation(args.x + extraWidth, args.y), dragAxisInd, dragPointInd);
                    dragArgs.currentValue = _this.activePointer.currentValue;
                    _this.trigger(dragMove, dragArgs);
                    _this.activeRange = null;
                }
                else if (_this.enableRangeDrag && _this.activeRange) {
                    _this.isDrag = true;
                    e.preventDefault();
                    var dragAxisInd = parseInt(_this.activeRange.pathElement[0].id.split('_Axis_')[1], 10);
                    var dragRangeInd = parseInt(_this.activeRange.pathElement[0].id.split('Range_')[1], 10);
                    dragArgs = {
                        axis: _this.activeAxis,
                        name: dragMove,
                        type: rangeMove,
                        range: _this.activeRange,
                        axisIndex: dragAxisInd,
                        rangeIndex: dragRangeInd
                    };
                    _this.rangeDrag(new GaugeLocation(args.x + extraWidth, args.y), dragAxisInd, dragRangeInd);
                    _this.trigger(dragMove, dragArgs);
                }
            }
        });
        this.notify(Browser.touchMoveEvent, e);
        titleTooltip(e, e.clientX, e.clientY, this, false);
        return false;
    };
    /**
     * Handles the mouse leave.
     *
     * @param {PointerEvent} e - Specifies the pointer event
     * @returns {boolean} - Returns the boolean value
     * @private
     */
    CircularGauge.prototype.mouseLeave = function (e) {
        this.setMouseXY(e);
        this.activeAxis = null;
        this.activePointer = null;
        this.activeRange = null;
        this.svgObject.setAttribute('cursor', 'auto');
        var args = this.getMouseArgs(e, 'touchmove', gaugeMouseLeave);
        this.trigger(gaugeMouseLeave, args);
        return false;
    };
    /**
     * Handles the mouse right click.
     *
     * @param {MouseEvent | PointerEvent} event - Specifies the pointer or mouse event.
     * @returns {boolean} - Returns the boolean value.
     * @private
     */
    CircularGauge.prototype.gaugeRightClick = function (event) {
        if (event.buttons === 2 || event.pointerType === 'touch') {
            event.preventDefault();
            event.stopPropagation();
            return false;
        }
        return true;
    };
    /**
     * Handles the pointer draf while mouse move on gauge.
     *
     * @param {GaugeLocation} location - Specifies the location of the gauge
     * @param {number} axisIndex - Specifies the axis index
     * @param {number} pointerIndex - Specifies the pointer index
     * @returns {void}
     * @private
     */
    CircularGauge.prototype.pointerDrag = function (location, axisIndex, pointerIndex) {
        var axis = this.activeAxis;
        var range = axis.visibleRange;
        var value = getValueFromAngle(getAngleFromLocation(this.midPoint, location), range.max, range.min, axis.startAngle, axis.endAngle, axis.direction === 'ClockWise');
        if (value >= range.min && value <= range.max) {
            this.axes[axisIndex].pointers[pointerIndex].value = value;
            this.activePointer.currentValue = value;
            this.gaugeAxisLayoutPanel.pointerRenderer.setPointerValue(axis, this.activePointer, value);
        }
    };
    /**
     * Handles the range draf while mouse move on gauge.
     *
     * @param {GaugeLocation} location - Specifies the gauge location
     * @param {number} axisIndex - Specifies the axis index
     * @param {number} rangeIndex - Specifies the range index
     * @returns {void}
     * @private
     */
    CircularGauge.prototype.rangeDrag = function (location, axisIndex, rangeIndex) {
        if (this.activeAxis) {
            var axis = this.activeAxis;
            var range = axis.visibleRange;
            var value = getValueFromAngle(getAngleFromLocation(this.midPoint, location), range.max, range.min, axis.startAngle, axis.endAngle, axis.direction === 'ClockWise');
            if (value >= range.min && value <= range.max) {
                var previousValue1 = this.activeRange.currentValue;
                this.activeRange.currentValue = value;
                var add = (this.activeRange.end - this.activeRange.start);
                var div = add / 2;
                var avg = parseFloat(this.activeRange.start.toString()) + div;
                var start = typeof this.activeRange.start === 'string' ? parseFloat(this.activeRange.start) : this.activeRange.start;
                var end = typeof this.activeRange.end === 'string' ? parseFloat(this.activeRange.end) : this.activeRange.end;
                this.startValue = (value < avg) ? value : ((previousValue1 < avg) ? previousValue1 : ((start < end) ? this.activeRange.start : this.activeRange.end));
                this.endValue = (value < avg) ? ((previousValue1 > avg) ? previousValue1 : ((start < end) ? this.activeRange.end : this.activeRange.start)) : value;
                this.axes[axisIndex].ranges[rangeIndex].start = this.startValue;
                this.axes[axisIndex].ranges[rangeIndex].end = this.endValue;
                if (this.isTouch) {
                    this.setRangeValue(axisIndex, rangeIndex, this.startValue, this.endValue);
                }
            }
        }
    };
    /**
     * Handles the mouse down on gauge.
     *
     * @param {PointerEvent} e - Specifies the pointer event
     * @returns {boolean} - Returns the boolean value
     * @private
     */
    CircularGauge.prototype.gaugeOnMouseDown = function (e) {
        var _this = this;
        this.setMouseXY(e);
        var currentPointer;
        var currentRange;
        var args = this.getMouseArgs(e, 'touchstart', gaugeMouseDown);
        var pointerDrag = false;
        var pointerIndex = args.target.id.indexOf('_Pointer_') > -1 ? parseInt(args.target.id.slice(-1), 10) : null;
        var axisIndex = args.target.id.indexOf('_Axis_') > -1 ? parseInt(args.target.id.split('_Axis_')[1], 10) : null;
        if (!isNullOrUndefined(axisIndex) && !isNullOrUndefined(pointerIndex)) {
            pointerDrag = this.allowPointerDrag ? this.axes[axisIndex].pointers[pointerIndex].enableDrag
                : this.enablePointerDrag;
        }
        this.trigger('gaugeMouseDown', args, function (observedArgs) {
            if (!args.cancel &&
                args.target.id.indexOf(_this.element.id + '_Axis_') >= 0 &&
                args.target.id.indexOf('_Pointer_') >= 0) {
                currentPointer = getPointer(args.target.id, _this);
                _this.activeAxis = _this.axes[currentPointer.axisIndex];
                _this.activePointer = _this.activeAxis.pointers[currentPointer.pointerIndex];
                if (isNullOrUndefined(_this.activePointer.pathElement)) {
                    _this.activePointer.pathElement = [e.target];
                }
                if (_this.activePointer.type === 'Marker' && _this.activePointer.markerShape === 'Text' && _this.activePointer.pathElement.length === 0) {
                    _this.activePointer.pathElement = [e.target];
                }
                var pointInd = parseInt(_this.activePointer.pathElement[0].id.slice(-1), 10);
                var axisInd = parseInt(_this.activePointer.pathElement[0].id.split('_Axis_')[1], 10);
                _this.trigger(dragStart, {
                    axis: _this.activeAxis,
                    name: dragStart,
                    type: pointerStart,
                    pointer: _this.activePointer,
                    currentValue: _this.activePointer.currentValue,
                    pointerIndex: pointInd,
                    axisIndex: axisInd
                });
                if (pointerDrag) {
                    _this.svgObject.setAttribute('cursor', 'grabbing');
                }
            }
            else if (!args.cancel &&
                args.target.id.indexOf(_this.element.id + '_Axis_') >= 0 &&
                args.target.id.indexOf('_Range_') >= 0) {
                currentRange = getRange(args.target.id, _this);
                _this.activeAxis = _this.axes[currentRange.axisIndex];
                _this.activeRange = _this.activeAxis.ranges[currentRange.rangeIndex];
                if (isNullOrUndefined(_this.activeRange.pathElement)) {
                    _this.activeRange.pathElement = [e.target];
                }
                var rangeInd = parseInt(_this.activeRange.pathElement[0].id.split('Range_')[1], 10);
                var axisInd = parseInt(_this.activeRange.pathElement[0].id.split('_Axis_')[1], 10);
                _this.trigger(dragStart, {
                    axis: _this.activeAxis,
                    name: dragStart,
                    type: rangeStart,
                    range: _this.activeRange,
                    axisIndex: axisInd,
                    rangeIndex: rangeInd
                });
                if (_this.enableRangeDrag) {
                    _this.svgObject.setAttribute('cursor', 'grabbing');
                }
            }
        });
        return false;
    };
    /**
     * Handles the mouse end.
     *
     * @param {PointerEvent} e - Specifies the pointer event
     * @returns {boolean} - Returns the boolean value
     * @private
     */
    CircularGauge.prototype.mouseEnd = function (e) {
        this.setMouseXY(e);
        var args = this.getMouseArgs(e, 'touchend', gaugeMouseUp);
        this.isTouch = e.pointerType === 'touch' || e.pointerType === '2' || e.type === 'touchend';
        this.trigger(gaugeMouseUp, args);
        var pointerDrag = false;
        if (this.activeAxis && this.activePointer) {
            var pointerIndex = parseInt(this.activePointer.pathElement[0].id.slice(-1), 10);
            var axisIndex = parseInt(this.activePointer.pathElement[0].id.split('_Axis_')[1], 10);
            if (!isNullOrUndefined(axisIndex) && !isNullOrUndefined(pointerIndex)) {
                pointerDrag = this.allowPointerDrag ? this.axes[axisIndex].pointers[pointerIndex].enableDrag
                    : this.enablePointerDrag;
            }
            if (pointerDrag) {
                this.svgObject.setAttribute('cursor', 'auto');
                this.trigger(dragEnd, {
                    name: dragEnd,
                    type: pointerEnd,
                    axis: this.activeAxis,
                    pointer: this.activePointer,
                    currentValue: this.activePointer.currentValue,
                    axisIndex: axisIndex,
                    pointerIndex: pointerIndex
                });
                this.activeAxis = null;
                this.activePointer = null;
                this.isPointerDragged = false;
            }
        }
        else if (this.activeAxis && this.activeRange && this.enableRangeDrag) {
            this.svgObject.setAttribute('cursor', 'auto');
            var rangeInd = parseInt(this.activeRange.pathElement[0].id.slice(-1), 10);
            var axisInd = parseInt(this.activeRange.pathElement[0].id.split('_Axis_')[1], 10);
            this.trigger(dragEnd, {
                name: dragEnd,
                type: rangeEnd,
                axis: this.activeAxis,
                range: this.activeRange,
                axisIndex: axisInd,
                rangeIndex: rangeInd
            });
            this.activeAxis = null;
            this.activeRange = null;
        }
        if (!isNullOrUndefined(this.activePointer)) {
            this.activePointer = null;
        }
        this.isDrag = false;
        this.svgObject.setAttribute('cursor', 'auto');
        this.notify(Browser.touchEndEvent, e);
        if (e.type.indexOf('touch') > -1 && (args.target.id === (this.element.id + '_CircularGaugeTitle') || args.target.id.indexOf('_gauge_legend_') > -1)) {
            var touchArg = e;
            titleTooltip(e, touchArg.changedTouches[0].pageX, touchArg.changedTouches[0].pageY, this, true);
        }
        return false;
    };
    /**
     * Handles the mouse event arguments.
     *
     * @param {PointerEvent} e - Specifies the pointer event
     * @param {string} type - Specifies the type
     * @param {string} name - Specifies the name
     * @returns {IMouseEventArgs} - Returns the mouse event args
     * @private
     */
    CircularGauge.prototype.getMouseArgs = function (e, type, name) {
        var rect = this.element.getBoundingClientRect();
        var location = new GaugeLocation(-rect.left, -rect.top);
        var isTouch = (e.type === type);
        location.x += isTouch ? e.changedTouches[0].clientX : e.clientX;
        location.y += isTouch ? e.changedTouches[0].clientY : e.clientY;
        return {
            cancel: false, name: name,
            x: location.x, y: location.y,
            target: isTouch ? e.target : e.target
        };
    };
    /**
     * Handles the gauge resize.
     *
     * @param {Event} e - Specifies the event
     * @returns {boolean} - Returns the boolean value
     * @private
     */
    CircularGauge.prototype.gaugeResize = function (e) {
        var _this = this;
        if (!this.isDestroyed) {
            // eslint-disable-next-line prefer-const
            var args = {
                gauge: this,
                previousSize: this.availableSize,
                name: resized,
                cancel: false,
                currentSize: this.calculateSvgSize()
            };
            this.trigger(resized, args);
            if (!args.cancel) {
                if (this.resizeTo) {
                    clearTimeout(this.resizeTo);
                }
                if (!isNullOrUndefined(this.element) && this.element.classList.contains('e-circulargauge')) {
                    this.animatePointer = false;
                    this.resizeTo = window.setTimeout(function () {
                        _this.isResize = true;
                        _this.isPropertyChange = true;
                        _this.createSvg();
                        _this.calculateBounds();
                        _this.allowLoadingAnimation = false;
                        if (_this.isOverAllAnimationComplete) {
                            _this.loadingAnimationDuration = [];
                        }
                        _this.renderElements();
                        _this.isResize = false;
                    }, 500);
                }
            }
        }
        return false;
    };
    /**
     * Applying styles for circular gauge elements
     *
     * @param {HTMLElement} element - Specifies the html element
     * @returns {void}
     */
    CircularGauge.prototype.setGaugeStyle = function (element) {
        element.style.touchAction = 'element';
        element.style.msTouchAction = 'element';
        element.style.msContentZooming = 'none';
        element.style.msUserSelect = 'none';
        element.style.webkitUserSelect = 'none';
        element.style.position = 'relative';
    };
    /**
     * Method to set culture for gauge
     *
     * @returns {void}
     */
    CircularGauge.prototype.setCulture = function () {
        this.intl = new Internationalization();
    };
    /**
     * Methods to create svg element for circular gauge.
     *
     * @returns {void}
     */
    CircularGauge.prototype.createSvg = function () {
        this.removeSvg();
        if (isNullOrUndefined(this.renderer)) {
            this.renderer = new SvgRenderer(this.element.id);
        }
        if (isNullOrUndefined(this.gaugeAxisLayoutPanel)) {
            this.gaugeAxisLayoutPanel = new AxisLayoutPanel(this);
        }
        this.availableSize = this.calculateSvgSize();
        this.svgObject = this.renderer.createSvg({
            id: this.element.id + '_svg',
            width: this.availableSize.width,
            height: this.availableSize.height
        });
    };
    /**
     * To Remove the SVG from circular gauge.
     *
     * @returns {void}
     * @private
     */
    CircularGauge.prototype.removeSvg = function () {
        if (!isNullOrUndefined(this.element)) {
            removeElement(this.element.id + '_Secondary_Element');
            if (this.svgObject) {
                while (this.svgObject.childNodes.length > 0) {
                    while (this.svgObject.childNodes.length > 0) {
                        this.svgObject.removeChild(this.svgObject.firstChild);
                    }
                    if (!this.svgObject.hasChildNodes() && this.svgObject.parentNode) {
                        remove(this.svgObject);
                    }
                }
                if (!this.svgObject.hasChildNodes() && this.svgObject.parentNode) {
                    remove(this.svgObject);
                }
            }
            removeElement(this.element.id + '_svg');
            this.clearTemplate();
        }
    };
    /**
     * To initialize the circular gauge private variable.
     *
     * @returns {void}
     * @private
     */
    CircularGauge.prototype.initPrivateVariable = function () {
        if (this.element.id === '') {
            var collection = document.getElementsByClassName('e-circulargauge').length;
            this.element.id = 'circulargauge_control_' + collection;
        }
        this.renderer = new SvgRenderer(this.element.id);
        this.gaugeAxisLayoutPanel = new AxisLayoutPanel(this);
        this.animatePointer = true;
    };
    /**
     * To calculate the size of the circular gauge element.
     *
     * @returns {void}
     */
    CircularGauge.prototype.calculateSvgSize = function () {
        var containerWidth = this.element.offsetWidth;
        var containerHeight = this.element.offsetHeight;
        var borderWidth = parseInt(this.element.style.borderWidth.split('px').join(''), 10) * 2;
        var width = stringToNumber(this.width, containerWidth) || containerWidth || 600;
        var height = stringToNumber(this.height, containerHeight) || containerHeight || 450;
        width = !isNaN(borderWidth) ? (width - borderWidth) : width;
        height = !isNaN(borderWidth) ? (height - borderWidth) : height;
        return new Size(width, height);
    };
    /**
     * To calculate the spacing of the circular gauge element.
     *
     * @param {number} top - Specifies the top value
     * @param {number} left - Specifies the left value
     * @param {number} width - Specifies the width
     * @param {number} height - Specifies the height
     * @param {number} radius - Specifies the radius
     * @param {number} titleHeight - Specifies the titleHeight
     * @param {number} isUpperAngle - Specifies the isUpperAngle
     * @param {number} isLowerAngle - Specifies the isLowerAngle
     * @param {number} isFullPercent - Specifies the boolean value
     * @param {number} isUpper - Specifies the boolean value
     * @param {number} isLower - Specifies the boolean value
     * @returns {void}
     */
    /* eslint-disable max-len */
    CircularGauge.prototype.radiusAndCenterCalculation = function (top, left, width, height, radius, titleHeight, isUpperAngle, isLowerAngle, isFullPercent, radiusPercent, isUpper, isLower) {
        var rect;
        var bottom = this.margin.bottom + this.border.width;
        var minRadius;
        var widthRadius;
        var centerX;
        var centerY;
        if (this.moveToCenter && this.axes.length === 1 &&
            isNullOrUndefined(this.centerXpoint) && isNullOrUndefined(this.centerYpoint)) {
            rect = new Rect(left, top, width, height);
        }
        else {
            if (!this.allowMargin) {
                if (!isNullOrUndefined(this.legendModule) && (width > height) && (this.legendSettings.position === 'Top' || this.legendSettings.position === 'Bottom')) {
                    minRadius = Math.min(width, height) / 2;
                    rect = new Rect((left + (width / 2) - minRadius), (top + (height / 2) - minRadius), minRadius * 2, minRadius * 2);
                }
                else {
                    if (width > height && (isLowerAngle && isLower || isUpperAngle && isUpper)) {
                        widthRadius = ((width) / 2);
                        var heightValue = isUpper && isLower ? (height / 2) : (height * (3 / 4));
                        if (widthRadius > heightValue) {
                            widthRadius = heightValue;
                        }
                        rect = new Rect((left + (width / 2) - widthRadius), (top + (height / 2) - widthRadius), widthRadius * 2, widthRadius * 2);
                    }
                    else {
                        if (height > width) {
                            var heightRadius = height / 2;
                            rect = new Rect((left + (width / 2) - radius), (top + (height / 2) - heightRadius), radius * 2, heightRadius * 2);
                        }
                        else {
                            rect = new Rect((left + (width / 2) - radius), (top + (height / 2) - radius), radius * 2, radius * 2);
                        }
                    }
                }
            }
            else {
                rect = new Rect((left + (width / 2) - radius), (top + (height / 2) - radius), radius * 2, radius * 2);
            }
        }
        this.gaugeRect = rect;
        if (this.legendModule && this.legendSettings.visible) {
            this.legendModule.getLegendOptions(this.axes);
            this.legendModule.calculateLegendBounds(this.gaugeRect, this.availableSize);
        }
        if (!this.allowMargin) {
            if (!isNullOrUndefined(this.legendModule) && (isUpperAngle || isLowerAngle) && (width > height) && (this.legendSettings.position === 'Top' || this.legendSettings.position === 'Bottom')) {
                var difference = height - this.gaugeRect.height;
                this.gaugeRect.width = width - ((this.availableSize.width - this.gaugeRect.width) / 2);
                this.gaugeRect.y = this.gaugeRect.y - difference;
                this.gaugeRect.height = this.gaugeRect.height + difference + ((this.availableSize.height - this.gaugeRect.height) / 2);
            }
            else if (!isNullOrUndefined(this.legendModule) && (isUpperAngle || isLowerAngle) && (width > height) && (this.legendSettings.position === 'Left' || this.legendSettings.position === 'Right')) {
                var difference = this.gaugeRect.height - this.gaugeRect.width;
                this.gaugeRect.x = this.legendSettings.position === 'Right'
                    ? this.gaugeRect.x + this.margin.right : this.gaugeRect.x;
                this.gaugeRect.width = this.legendSettings.position === 'Left' ?
                    Math.abs(width - ((this.availableSize.width - this.gaugeRect.width + difference) / 2))
                    : Math.abs(width - ((this.availableSize.width - this.gaugeRect.width) / 2) - 10);
            }
            centerX = this.centerXpoint !== null ?
                stringToNumber(this.centerXpoint, this.availableSize.width) : this.gaugeRect.x + (this.gaugeRect.width / 2);
            if ((isUpperAngle || isLowerAngle) && !isNullOrUndefined(this.legendModule)) {
                centerX = (this.legendSettings.position === 'Top' || this.legendSettings.position === 'Bottom')
                    ? this.availableSize.width / 2 : this.legendSettings.position === 'Right' ? (this.gaugeRect.width / 2) + this.margin.right :
                    centerX;
            }
            centerY = ((isUpperAngle || isLowerAngle) ? (isUpperAngle ?
                (((this.gaugeRect.height * (3 / 4) + this.gaugeRect.y) - bottom))
                : (((this.gaugeRect.height * (1 / 4)) + (this.gaugeRect.y)))) : this.gaugeRect.y + (this.gaugeRect.height / 2));
            centerY = !isFullPercent && (isUpperAngle || isLowerAngle) ? (this.gaugeRect.height / 2) + this.gaugeRect.y + (radiusPercent * (3 / 4) * (1 / 2)) : centerY;
            if (!isNullOrUndefined(this.axes) && this.axes.length > 1 && !isNullOrUndefined(this.midPoint)) {
                isUpper = isUpperAngle ? isUpperAngle : isUpper;
                isLower = isLowerAngle ? isLowerAngle : isLower;
                if (isUpper && isLower) {
                    centerY = (this.availableSize.height / 2) - bottom;
                }
            }
        }
        else {
            centerX = this.centerXpoint !== null ?
                stringToNumber(this.centerXpoint, this.availableSize.width) : this.gaugeRect.x + (this.gaugeRect.width / 2);
            centerY = this.centerYpoint !== null ?
                stringToNumber(this.centerYpoint, this.availableSize.height) : this.gaugeRect.y + (this.gaugeRect.height / 2);
        }
        this.midPoint = new GaugeLocation(centerX, centerY);
    };
    /**
     * Method to calculate the availble size for circular gauge.
     *
     * @returns {void}
     */
    CircularGauge.prototype.calculateBounds = function () {
        var padding = 5;
        var margin = this.margin;
        var titleHeight = 0;
        if (this.title) {
            titleHeight = measureText(this.title, this.titleStyle).height + padding;
        }
        var top = margin.top + titleHeight + this.border.width;
        var left = margin.left + this.border.width;
        var isUpper = false;
        var isLower = false;
        var width = this.availableSize.width - left - margin.right - this.border.width;
        var height = this.availableSize.height - top - this.border.width - margin.bottom;
        var radius = Math.min(width, height) / 2;
        this.centerXpoint = (this.centerX === '') ? null : this.centerX;
        this.centerYpoint = (this.centerY === '') ? null : this.centerY;
        if (this.moveToCenter && this.axes.length === 1 &&
            isNullOrUndefined(this.centerXpoint) && isNullOrUndefined(this.centerYpoint)) ;
        if (!this.allowMargin) {
            for (var j = 0; j < this.axes.length; j++) {
                var isUpperAngle = 270 <= this.axes[j].startAngle && this.axes[j].startAngle <= 360 &&
                    0 <= this.axes[j].endAngle && this.axes[j].endAngle <= 90;
                var isLowerAngle = 90 >= this.axes[j].startAngle && this.axes[j].startAngle <= 180 &&
                    180 <= this.axes[j].endAngle && 270 <= this.axes[j].endAngle && 0 !== this.axes[j].startAngle &&
                    360 !== this.axes[j].endAngle;
                isUpper = isUpperAngle ? isUpperAngle : isUpper;
                isLower = isLowerAngle ? isLowerAngle : isLower;
                var isFullPercent = this.axes[j].radius !== null ? parseInt(this.axes[0].radius.split('%')[0], 10) >= 100 : true;
                var radiusPercent = this.axes[j].radius !== null ? radius * (parseInt(this.axes[0].radius.split('%')[0], 10) / 100) : radius;
                this.radiusAndCenterCalculation(top, left, width, height, radius, titleHeight, isUpperAngle, isLowerAngle, isFullPercent, radiusPercent, isUpper, isLower);
            }
        }
        else {
            this.radiusAndCenterCalculation(top, left, width, height, radius, titleHeight, false, false, null, null, false, false);
        }
        this.gaugeAxisLayoutPanel.measureAxis(this.gaugeRect);
    };
    /**
     * To render elements for circular gauge
     *
     * @param {boolean} animate - Specifies whether animation is true or false
     * @returns {void}
     */
    CircularGauge.prototype.renderElements = function (animate) {
        if (animate === void 0) { animate = true; }
        this.renderBorder();
        this.renderTitle();
        this.gaugeAxisLayoutPanel.renderAxes(animate);
        this.renderLegend();
        this.element.appendChild(this.svgObject);
        this.trigger(loaded, { gauge: this });
        removeElement('gauge-measuretext');
    };
    CircularGauge.prototype.renderAnimation = function () {
        if (this.allowLoadingAnimation) {
            for (var i = 0; i < this.axes.length; i++) {
                this.gaugeAxisLayoutPanel.axisLineAnimation(i, this.loadingAnimationDuration[i], this);
            }
        }
    };
    /**
     * Method to render legend for accumulation chart
     *
     * @returns {void}
     */
    CircularGauge.prototype.renderLegend = function () {
        if (!this.legendModule || !this.legendSettings.visible) {
            return null;
        }
        if (this.legendModule.legendCollection.length) {
            this.legendModule.renderLegend(this.legendSettings, this.legendModule.legendBounds);
        }
    };
    /**
     * Method to render the title for circular gauge.
     *
     * @returns {void}
     */
    CircularGauge.prototype.renderTitle = function () {
        if (this.title) {
            // eslint-disable-next-line prefer-const
            var style = {
                color: this.titleStyle.color,
                size: this.titleStyle.size || this.themeStyle.titleFontSize,
                fontFamily: this.titleStyle.fontFamily || this.themeStyle.fontFamily,
                fontStyle: this.titleStyle.fontStyle,
                fontWeight: this.titleStyle.fontWeight || this.themeStyle.titleFontWeight,
                opacity: this.titleStyle.opacity
            };
            var titleSize = style.size;
            if (!isNaN(Number(titleSize))) {
                style.size = titleSize + 'px';
            }
            var width = Math.abs((this.margin.left + this.margin.right) - this.availableSize.width);
            var trimmedTitle = textTrim(width, this.title, style);
            var size = measureText(trimmedTitle, style);
            var options = new TextOption(this.element.id + '_CircularGaugeTitle', this.availableSize.width / 2, this.margin.top + 3 * (size.height / 4), 'middle', trimmedTitle);
            var element = textElement(options, style, style.color || this.themeStyle.titleFontColor, this.svgObject, '');
            element.setAttribute('aria-label', this.description || this.title);
            element.setAttribute('role', 'region');
            element.setAttribute('tabindex', this.tabIndex.toString());
        }
    };
    /**
     * Method to render the border for circular gauge.
     *
     * @returns {void}
     */
    CircularGauge.prototype.renderBorder = function () {
        var borderWidth = this.border.width;
        if (borderWidth > 0 || (this.background || this.themeStyle.backgroundColor)) {
            this.svgObject.appendChild(this.renderer.drawRectangle(new RectOption(this.element.id + '_CircularGaugeBorder', this.background || this.themeStyle.backgroundColor, this.border, null, new Rect(borderWidth / 2, borderWidth / 2, this.availableSize.width - borderWidth, this.availableSize.height - borderWidth))));
        }
    };
    /* eslint-disable valid-jsdoc */
    /**
     * This method is used to set the pointer value dynamically for circular gauge.
     *
     * @param {number} axisIndex - Specifies the index value for the axis in circular gauge.
     * @param {number} pointerIndex - Specifies the index value for the pointer in circular gauge.
     * @param {number} value - Specifies the value for the pointer in circular gauge.
     */
    CircularGauge.prototype.setPointerValue = function (axisIndex, pointerIndex, value) {
        var _this = this;
        var axis = this.axes[axisIndex];
        var pointer = axis.pointers[pointerIndex];
        var pointerRadius = pointer.currentRadius;
        this.allowLoadingAnimation = false;
        if (!this.isDestroyed && pointer.currentValue !== value) {
            var enableAnimation_1 = pointer.animation.enable || animationMode === 'Enable';
            value = value < axis.visibleRange.min ? axis.visibleRange.min : value;
            value = value > axis.visibleRange.max ? axis.visibleRange.max : value;
            pointer['isPointerAnimation'] = true;
            document.getElementById(this.element.id + '_Axis_' + axisIndex + '_Pointer_' + pointerIndex).style.visibility = 'visible';
            if (!isNullOrUndefined(pointer.pathElement)) {
                pointer.pathElement.map(function (element) {
                    if (pointer.type === 'RangeBar') {
                        setStyles(element, pointer.color, pointer.border);
                        if (enableAnimation_1) {
                            _this.gaugeAxisLayoutPanel.pointerRenderer.performRangeBarAnimation(element, pointer.currentValue, value, axis, pointer, axisIndex);
                        }
                        else {
                            _this.isAnimationProgress = false;
                            _this.gaugeAxisLayoutPanel.pointerRenderer.setPointerValue(axis, pointer, value);
                        }
                    }
                    else {
                        if (element.id.indexOf('_Pointer_NeedleCap_') >= 0) {
                            setStyles(element, pointer.cap.color, pointer.cap.border);
                        }
                        else if (element.id.indexOf('_Pointer_NeedleTail_') >= 0) {
                            setStyles(element, pointer.needleTail.color, pointer.needleTail.border);
                        }
                        else if (element.id.indexOf('_Pointer_NeedleRect_') >= 0) {
                            setStyles(element, 'transparent', { color: 'transparent', width: 0 });
                        }
                        else if (pointer.type === 'Marker' && pointer.markerShape !== 'Text') {
                            setStyles(element, pointer.color, pointer.border);
                        }
                        if (enableAnimation_1) {
                            if (pointer.type === 'Marker' && pointer.markerShape === 'Text') {
                                _this.gaugeAxisLayoutPanel.pointerRenderer.performTextAnimation(element, pointer.currentValue, value, axis, pointer, axisIndex);
                            }
                            else {
                                _this.gaugeAxisLayoutPanel.pointerRenderer.performNeedleAnimation(element, pointer.currentValue, value, axis, pointer, axisIndex);
                            }
                        }
                        else {
                            _this.gaugeAxisLayoutPanel.pointerRenderer.setPointerValue(axis, pointer, value);
                        }
                    }
                });
            }
            if (this.allowLoadingAnimation && !pointer.animation.enable) {
                this.allowLoadingAnimation = false;
                pointer.value = value;
            }
        }
        this.isProtectedOnChange = true;
        pointer.previousValue = pointer.currentValue;
        pointer.currentValue = value;
        pointer.value = value;
        this.isProtectedOnChange = false;
    };
    /**
     * This method is used to set the annotation content dynamically for circular gauge.
     *
     * @param {number} axisIndex - Specifies the index value for the axis in circular gauge.
     * @param {number} annotationIndex - Specifies the index value for the annotation in circular gauge.
     * @param {string | Function} content - Specifies the content for the annotation in circular gauge.
     * @returns {void}
     */
    CircularGauge.prototype.setAnnotationValue = function (axisIndex, annotationIndex, content) {
        if (!this.isDestroyed) {
            this.allowLoadingAnimation = false;
            var isElementExist = getElement(this.element.id + '_Annotations_' + axisIndex) !== null;
            var element = getElement(this.element.id + '_Annotations_' + axisIndex) ||
                createElement('div', {
                    id: this.element.id + '_Annotations_' + axisIndex, styles: this.animationDuration > 0 ? 'opacity: 0' : 'opacity: 1'
                });
            var annotation = this.axes[axisIndex].annotations[annotationIndex];
            if (content !== null) {
                removeElement(this.element.id + '_Axis_' + axisIndex + '_Annotation_' + annotationIndex);
                annotation.content = content;
                this.annotationsModule.createTemplate(element, annotationIndex, axisIndex, this);
                var secondaryElement = getElement(this.element.id + '_Secondary_Element');
                if (!isElementExist && !isNullOrUndefined(secondaryElement)) {
                    secondaryElement.appendChild(element);
                }
            }
        }
    };
    /**
     * This method is used to print the rendered circular gauge.
     *
     * @param {string[] | string | Element} id - Specifies the element to print the circular gauge.
     */
    CircularGauge.prototype.print = function (id) {
        if (this.allowPrint && this.printModule) {
            this.printModule.print(this, id);
        }
    };
    /**
     * This method is used to perform the export functionality for the circular gauge.
     *
     * @param {ExportType} type - Specifies the type of the export.
     * @param {string} fileName - Specifies the file name for the exported file.
     * @param {PdfPageOrientation}  orientation - Specifies the orientation for the exported PDF document.
     * @param {boolean} allowDownload - Specifies whether to download as a file.
     * @returns {Promise<string>} - Specifies the base64 string of the exported image which is returned when the allowDownload is set to false.
     */
    CircularGauge.prototype.export = function (type, fileName, orientation, allowDownload) {
        var _this = this;
        if (isNullOrUndefined(allowDownload)) {
            allowDownload = true;
        }
        if (type === 'PDF' && this.allowPdfExport && this.pdfExportModule) {
            // eslint-disable-next-line
            return new Promise(function (resolve, reject) {
                resolve(_this.pdfExportModule.export(_this, type, fileName, orientation, allowDownload));
            });
        }
        else if (this.allowImageExport && (type !== 'PDF') && this.imageExportModule) {
            // eslint-disable-next-line
            return new Promise(function (resolve, reject) {
                resolve(_this.imageExportModule.export(_this, type, fileName, allowDownload));
            });
        }
        return null;
    };
    /**
     * Method to set mouse x, y from events
     *
     * @param {PointerEvent} e - Specifies the pointer event
     * @returns {void}
     */
    CircularGauge.prototype.setMouseXY = function (e) {
        var pageX;
        var pageY;
        var svgRect = getElement(this.element.id + '_svg').getBoundingClientRect();
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
    };
    /**
     * This method is used to set the range values dynamically for circular gauge.
     *
     * @param {number} axisIndex - Specifies the index value for the axis in circular gauge.
     * @param {number} rangeIndex - Specifies the index value for the range in circular gauge.
     * @param {number} start - Specifies the start value for the current range in circular gauge.
     * @param {number} end - Specifies the end value for the current range in circular gauge.
     */
    CircularGauge.prototype.setRangeValue = function (axisIndex, rangeIndex, start, end) {
        this.allowLoadingAnimation = false;
        var element = getElement(this.element.id + '_Axis_' + axisIndex + '_Range_' + rangeIndex);
        var axis = this.axes[axisIndex];
        var range = axis.ranges[rangeIndex];
        var axisRange = axis.visibleRange;
        var isClockWise = axis.direction === 'ClockWise';
        var startValue = Math.min(Math.max(start, axisRange.min), end);
        var endValue = Math.min(Math.max(start, end), axisRange.max);
        var oldRangeStart = range.start;
        var oldRangeEnd = range.end;
        range.start = start;
        range.end = end;
        if (range.start !== range.end && oldRangeStart === oldRangeEnd && this.legendModule && this.legendSettings.visible) {
            this.legendModule.getLegendOptions(this.axes);
            var height = this.legendModule.legendBounds.height + this.legendSettings.margin.top + this.legendSettings.margin.bottom + this.legendSettings.border.width;
            var width = this.legendModule.legendBounds.width + this.legendSettings.margin.left + this.legendSettings.margin.right + this.legendSettings.border.width;
            // eslint-disable-next-line prefer-const
            var rect = this.gaugeRect;
            var position = this.legendModule.position;
            if (position === 'Bottom') {
                rect.height = rect.height + height;
            }
            if (position === 'Top') {
                rect.height = rect.height + height;
                rect.y = rect.y - height;
            }
            if (position === 'Left') {
                rect.width = rect.width + width;
                rect.x = rect.x - width;
            }
            if (position === 'Right') {
                rect.width = rect.width + width;
            }
            this.legendModule.calculateLegendBounds(rect, this.availableSize);
            if (this.legendModule.legendCollection.length) {
                this.legendModule.renderLegend(this.legendSettings, this.legendModule.legendBounds);
            }
        }
        this.isRangeUpdate = true;
        var startAngle = getAngleFromValue(startValue, axisRange.max, axisRange.min, axis.startAngle, axis.endAngle, isClockWise);
        var endAngle = getAngleFromValue(endValue, axisRange.max, axisRange.min, axis.startAngle, axis.endAngle, isClockWise);
        var startWidth;
        if (!isNullOrUndefined(range.startWidth) && range.startWidth.length > 0) {
            startWidth = toPixel(range.startWidth, range.currentRadius);
        }
        else {
            startWidth = range.startWidth;
        }
        var endWidth;
        if (!isNullOrUndefined(range.endWidth) && range.endWidth.length > 0) {
            endWidth = toPixel(range.endWidth, range.currentRadius);
        }
        else {
            endWidth = range.endWidth;
        }
        endAngle = isClockWise ? endAngle : [startAngle, startAngle = endAngle][0];
        endWidth = isClockWise ? endWidth : [startWidth, startWidth = endWidth][0];
        element.setAttribute('d', getPathArc(this.midPoint, Math.round(startAngle), Math.round(endAngle), range.currentRadius, startWidth, endWidth, range, axis));
        setStyles(element, (range.color ? range.color : range.rangeColor), {
            color: (range.color ? range.color : range.rangeColor),
            width: 0
        });
    };
    /**
     * This method destroys the circular gauge. This method removes the events associated with the circular gauge and disposes the objects created for rendering and updating the circular gauge.
     *
     * @method destroy
     * @return {void}
     * @member of Circular-Gauge
     */
    CircularGauge.prototype.destroy = function () {
        if (!isNullOrUndefined(this.element)) {
            this.unWireEvents();
        }
        if (!isNullOrUndefined(this.tooltipModule)) {
            this.tooltipModule.removeEventListener();
        }
        _super.prototype.destroy.call(this);
        if (!isNullOrUndefined(this.gaugeAxisLayoutPanel)) {
            this.gaugeAxisLayoutPanel.destroy();
        }
        this.availableSize = null;
        this.midPoint = null;
        this.activePointer = null;
        this.activeAxis = null;
        this.activeRange = null;
        this.gaugeRect = null;
        this.gaugeAxisLayoutPanel = null;
        this.themeStyle = null;
        this.loadingAnimationDuration = null;
        this.intl = null;
        this.removeSvg();
        this.resizeEvent = null;
        this.svgObject = null;
        this.renderer = null;
    };
    /**
     * To provide the array of modules needed for control rendering
     *
     * @returns {ModuleDeclaration[]} - Returns the modules
     * @private
     */
    CircularGauge.prototype.requiredModules = function () {
        var modules = [];
        var annotationEnable = false;
        var axes = this.axes;
        axes.map(function (axis) {
            axis.annotations.map(function (annotation) {
                if (!annotationEnable) {
                    annotationEnable = ((!isNullOrUndefined(annotation.content) && annotation.content.length !== 0) || typeof (annotation.content) === 'function');
                }
            });
        });
        if (annotationEnable) {
            modules.push({
                member: 'Annotations',
                args: [this, Annotations],
                name: 'Annotations'
            });
        }
        if (this.tooltip.enable) {
            modules.push({
                member: 'Tooltip',
                args: [this, GaugeTooltip],
                name: 'Tooltip'
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
        if (this.legendSettings.visible) {
            modules.push({
                member: 'Legend',
                args: [this, Legend],
                name: 'Legend'
            });
        }
        modules.push({
            member: 'Gradient',
            args: [this, Gradient],
            name: 'Gradient'
        });
        return modules;
    };
    /**
     * Get the properties to be maintained in the persisted state.
     *
     * @returns {string} - Returns the string
     * @private
     */
    CircularGauge.prototype.getPersistData = function () {
        return this.addOnPersist([]);
    };
    /**
     * Called internally if any of the property value changed.
     *
     * @param {CircularGaugeModel} newProp - Specifies the new property
     * @param {CircularGaugeModel} oldProp - Specifies the old property
     * @returns {void}
     * @private
     */
    CircularGauge.prototype.onPropertyChanged = function (newProp, oldProp) {
        // property method calculated
        if (!this.isDestroyed) {
            this.isPropertyChange = true;
            var renderer = false;
            this.allowLoadingAnimation = this.animationDuration > 0 && !this.isOverAllAnimationComplete ? true : false;
            var refreshBounds = false;
            var refreshWithoutAnimation = false;
            var isPointerValueSame = (Object.keys(newProp).length === 1 && newProp instanceof Object &&
                !isNullOrUndefined(this.activePointer));
            for (var _i = 0, _a = Object.keys(newProp); _i < _a.length; _i++) {
                var prop = _a[_i];
                switch (prop) {
                    case 'height':
                    case 'width':
                    case 'centerX':
                    case 'centerY':
                    case 'margin':
                        this.createSvg();
                        refreshBounds = true;
                        break;
                    case 'animationDuration':
                        this.allowLoadingAnimation = true;
                        break;
                    case 'title':
                        refreshBounds = (newProp.title === '' || oldProp.title === '');
                        renderer = !(newProp.title === '' || oldProp.title === '');
                        break;
                    case 'titleStyle':
                        if (newProp.titleStyle && newProp.titleStyle.size) {
                            refreshBounds = true;
                        }
                        else {
                            renderer = true;
                        }
                        break;
                    case 'border':
                        renderer = true;
                        break;
                    case 'background':
                        renderer = true;
                        break;
                    case 'legendSettings':
                        refreshWithoutAnimation = true;
                        break;
                    case 'axes':
                        // eslint-disable-next-line no-case-declarations
                        var axesPropertyLength = this.axes.length;
                        for (var x = 0; x < axesPropertyLength; x++) {
                            if (!isNullOrUndefined(newProp.axes[x])) {
                                var collection = Object.keys(newProp.axes[x]);
                                for (var _b = 0, collection_1 = collection; _b < collection_1.length; _b++) {
                                    var collectionProp = collection_1[_b];
                                    if (collectionProp === 'pointers') {
                                        var pointerPropertyLength = Object.keys(newProp.axes[x].pointers).length;
                                        for (var y = 0; y < pointerPropertyLength; y++) {
                                            var index = parseInt(Object.keys(newProp.axes[x].pointers)[y], 10);
                                            if (!isNullOrUndefined(Object.keys(newProp.axes[x].pointers[index]))) {
                                                this.allowLoadingAnimation = false;
                                                this.loadingAnimationDuration = [];
                                                this.isAnimationProgress = this.axes[x].pointers[index].animation.enable;
                                                this.axes[x].pointers[index]['previousValue'] = this.axes[x].pointers[index]['currentValue'];
                                                this.axes[x].pointers[index]['isPointerAnimation'] = Object.keys(newProp.axes[x].pointers[index]).indexOf('value') > -1;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        refreshWithoutAnimation = true;
                        break;
                }
            }
            if (!isPointerValueSame && !this.isRangeUpdate) {
                if (!refreshBounds && renderer) {
                    this.removeSvg();
                    this.renderElements();
                }
                if (refreshBounds || this.allowLoadingAnimation) {
                    this.removeSvg();
                    this.calculateBounds();
                    this.renderElements();
                    if (this.allowLoadingAnimation) {
                        this.allowLoadingAnimation = this.animationDuration > 0 && !this.isOverAllAnimationComplete ? true : false;
                        this.renderAnimation();
                    }
                }
                if (refreshWithoutAnimation && !renderer && !refreshBounds && !this.allowLoadingAnimation) {
                    this.removeSvg();
                    this.calculateBounds();
                    this.renderElements(false);
                }
            }
            this.isRangeUpdate = false;
        }
    };
    /**
     * Get component name for circular gauge
     *
     * @returns {string} - Returns the module name
     * @private
     */
    CircularGauge.prototype.getModuleName = function () {
        return 'circulargauge';
    };
    var CircularGauge_1;
    __decorate$3([
        Property(null)
    ], CircularGauge.prototype, "width", void 0);
    __decorate$3([
        Property(null)
    ], CircularGauge.prototype, "height", void 0);
    __decorate$3([
        Complex({ color: 'transparent', width: 0 }, Border)
    ], CircularGauge.prototype, "border", void 0);
    __decorate$3([
        Property(null)
    ], CircularGauge.prototype, "background", void 0);
    __decorate$3([
        Property('')
    ], CircularGauge.prototype, "title", void 0);
    __decorate$3([
        Property(0)
    ], CircularGauge.prototype, "animationDuration", void 0);
    __decorate$3([
        Complex({ size: null, color: null, fontWeight: null, fontFamily: null }, Font)
    ], CircularGauge.prototype, "titleStyle", void 0);
    __decorate$3([
        Complex({}, Margin)
    ], CircularGauge.prototype, "margin", void 0);
    __decorate$3([
        Collection([{}], Axis)
    ], CircularGauge.prototype, "axes", void 0);
    __decorate$3([
        Complex({}, TooltipSettings)
    ], CircularGauge.prototype, "tooltip", void 0);
    __decorate$3([
        Property(false)
    ], CircularGauge.prototype, "enablePointerDrag", void 0);
    __decorate$3([
        Property(false)
    ], CircularGauge.prototype, "enableRangeDrag", void 0);
    __decorate$3([
        Property(false)
    ], CircularGauge.prototype, "allowPrint", void 0);
    __decorate$3([
        Property(false)
    ], CircularGauge.prototype, "allowImageExport", void 0);
    __decorate$3([
        Property(false)
    ], CircularGauge.prototype, "allowPdfExport", void 0);
    __decorate$3([
        Property(true)
    ], CircularGauge.prototype, "allowRangePreRender", void 0);
    __decorate$3([
        Property(null)
    ], CircularGauge.prototype, "centerX", void 0);
    __decorate$3([
        Property(null)
    ], CircularGauge.prototype, "centerY", void 0);
    __decorate$3([
        Property(false)
    ], CircularGauge.prototype, "moveToCenter", void 0);
    __decorate$3([
        Property('Material')
    ], CircularGauge.prototype, "theme", void 0);
    __decorate$3([
        Property(false)
    ], CircularGauge.prototype, "useGroupingSeparator", void 0);
    __decorate$3([
        Property(null)
    ], CircularGauge.prototype, "description", void 0);
    __decorate$3([
        Property(0)
    ], CircularGauge.prototype, "tabIndex", void 0);
    __decorate$3([
        Property(true)
    ], CircularGauge.prototype, "allowMargin", void 0);
    __decorate$3([
        Complex({}, LegendSettings)
    ], CircularGauge.prototype, "legendSettings", void 0);
    __decorate$3([
        Event()
    ], CircularGauge.prototype, "loaded", void 0);
    __decorate$3([
        Event()
    ], CircularGauge.prototype, "load", void 0);
    __decorate$3([
        Event()
    ], CircularGauge.prototype, "animationComplete", void 0);
    __decorate$3([
        Event()
    ], CircularGauge.prototype, "axisLabelRender", void 0);
    __decorate$3([
        Event()
    ], CircularGauge.prototype, "radiusCalculate", void 0);
    __decorate$3([
        Event()
    ], CircularGauge.prototype, "annotationRender", void 0);
    __decorate$3([
        Event()
    ], CircularGauge.prototype, "legendRender", void 0);
    __decorate$3([
        Event()
    ], CircularGauge.prototype, "tooltipRender", void 0);
    __decorate$3([
        Event()
    ], CircularGauge.prototype, "dragStart", void 0);
    __decorate$3([
        Event()
    ], CircularGauge.prototype, "dragMove", void 0);
    __decorate$3([
        Event()
    ], CircularGauge.prototype, "dragEnd", void 0);
    __decorate$3([
        Event()
    ], CircularGauge.prototype, "gaugeMouseMove", void 0);
    __decorate$3([
        Event()
    ], CircularGauge.prototype, "gaugeMouseLeave", void 0);
    __decorate$3([
        Event()
    ], CircularGauge.prototype, "gaugeMouseDown", void 0);
    __decorate$3([
        Event()
    ], CircularGauge.prototype, "gaugeMouseUp", void 0);
    __decorate$3([
        Event()
    ], CircularGauge.prototype, "resized", void 0);
    __decorate$3([
        Event()
    ], CircularGauge.prototype, "beforePrint", void 0);
    CircularGauge = CircularGauge_1 = __decorate$3([
        NotifyPropertyChanges
    ], CircularGauge);
    return CircularGauge;
}(Component));

export { Animation, Annotation, AnnotationTooltip, Annotations, Axis, Border, Cap, CircularGauge, ColorStop, CustomizeOption, Font, GaugeLocation, GaugeTooltip, Gradient, GradientPosition, ImageExport, Index, Label, Legend, LegendOptions, LegendSettings, Line, LinearGradient, Location, Margin, NeedleTail, PathOption, PdfExport, Pointer, Print, RadialGradient, Range, RangeTooltip, Rect, RectOption, Size, TextOption, Tick, TooltipSettings, VisibleLabels, appendPath, arcPath, arcRoundedPath, arcWidthPath, arcWidthPathCalculation, calculateShapes, calculateSum, getAngleFromLocation, getAngleFromValue, getCirclePath, getCompleteArc, getCompletePath, getDegree, getElement, getElementSize, getFontStyle, getLabelFormat, getLocationFromAngle, getMousePosition, getPathArc, getPointer, getRange, getRangeColor, getRangePath, getRoundedPathArc, getTemplateFunction, getValueFromAngle, isCompleteAngle, linear, measureText, removeElement, removeTooltip, roundedArcWidthPathCalculation, setStyles, showTooltip, stringToNumber, textElement, textTrim, titleTooltip, toPixel };
//# sourceMappingURL=ej2-circulargauge.es5.js.map
