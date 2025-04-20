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
/* eslint-disable jsdoc/require-jsdoc */
/* eslint-disable valid-jsdoc */
/* eslint-disable jsdoc/require-param */
/* eslint-disable jsdoc/require-returns */
import { compile as templateComplier, remove, merge, createElement, isNullOrUndefined } from '@syncfusion/ej2-base';
import { SvgRenderer } from '@syncfusion/ej2-svg-base';
/**
 * Specifies Linear-Gauge Helper methods
 */
/** @private */
export function stringToNumber(value, containerSize) {
    return value.indexOf('%') !== -1 ? (containerSize / 100) * parseInt(value, 10) : parseInt(value, 10);
}
/** @private */
export function stringToNumberSize(value, containerSize) {
    if (!isNullOrUndefined(value)) {
        return value.indexOf('%') !== -1 ? containerSize : parseInt(value, 10);
    }
    return null;
}
/**
 * Function to measure the height and width of the text.
 *
 * @param  {string} text - Specifies the text to be measured.
 * @param  {FontModel} font - Specifies the font of the text.
 * @returns {Size} Returns the size of the text.
 * @private
 */
export function measureText(text, font) {
    var htmlObject = document.getElementById('gauge-measuretext');
    if (htmlObject === null) {
        htmlObject = createElement('text', { id: 'gauge-measuretext' });
        document.body.appendChild(htmlObject);
    }
    htmlObject.innerText = text;
    htmlObject.style.position = 'absolute';
    htmlObject.style.fontSize = font.size;
    htmlObject.style.fontWeight = font.fontWeight;
    htmlObject.style.fontStyle = font.fontStyle;
    htmlObject.style.fontFamily = font.fontFamily;
    htmlObject.style.visibility = 'hidden';
    htmlObject.style.top = '-100';
    htmlObject.style.left = '0';
    htmlObject.style.whiteSpace = 'nowrap';
    var size = new Size(htmlObject.clientWidth, htmlObject.clientHeight);
    //remove(htmlObject);
    return size;
}
/**
 * Trim the title text
 *
 * @private
 *
 */
export function textTrim(maxWidth, text, font) {
    var label = text;
    var size = measureText(text, font).width;
    if (size > maxWidth) {
        var textLength = text.length;
        for (var i = textLength - 1; i >= 0; --i) {
            label = text.substring(0, i) + '...';
            size = measureText(label, font).width;
            if (size <= maxWidth || label.length < 4) {
                if (label.length < 4) {
                    label = ' ';
                }
                return label;
            }
        }
    }
    return label;
}
/** @private */
export function withInRange(value, start, end, max, min, type) {
    var withIn;
    if (type === 'pointer') {
        withIn = (((value <= max) && (value >= min)));
    }
    else {
        withIn = (start != null && (start <= max) && (start >= min)) && (end != null && (end <= max) && (end >= min));
    }
    return withIn;
}
export function convertPixelToValue(parentElement, pointerElement, orientation, axis, type, location) {
    var elementRect = parentElement.getBoundingClientRect();
    var pointerRect = pointerElement.getBoundingClientRect();
    var height = (pointerElement.id.indexOf('MarkerPointer') > -1) ? (pointerRect.height / 2) :
        (!axis.isInversed) ? 0 : pointerRect.height;
    var width = (pointerElement.id.indexOf('MarkerPointer') > -1) ? (pointerRect.width / 2) :
        (!axis.isInversed) ? pointerRect.width : 0;
    var size = new Size(axis.lineBounds.width, axis.lineBounds.height);
    var y = (type === 'drag') ? (location.y - axis.lineBounds.y) :
        ((pointerRect.top + height) - elementRect.top - axis.lineBounds.y);
    var extraWidth = getExtraWidth(parentElement);
    var x = (type === 'drag') ? (location.x - axis.lineBounds.x + extraWidth) :
        ((pointerRect.left + width) - elementRect.left - axis.lineBounds.x + extraWidth);
    var newSize = (orientation === 'Vertical') ? size.height : size.width;
    var divideVal = (orientation === 'Vertical') ? y : x;
    var value = (orientation === 'Vertical') ? (axis.isInversed) ? (divideVal / newSize) :
        (1 - (divideVal / newSize)) : (axis.isInversed) ? (1 - (divideVal / newSize)) : (divideVal / newSize);
    value = value * (axis.visibleRange.delta) + axis.visibleRange.min;
    return value;
}
export function getPathToRect(path, size, parentElement) {
    var tempDiv = document.getElementById('gauge_path');
    if (tempDiv === null) {
        tempDiv = createElement('text', { id: 'gauge_path' });
        tempDiv.style.position = 'absolute';
        tempDiv.style.top = '0px';
        tempDiv.style.left = '0px';
        parentElement.appendChild(tempDiv);
    }
    var render = new SvgRenderer('id');
    var svg = render.createSvg({ id: 'box_path', width: size.width, height: size.height });
    svg.appendChild(path);
    tempDiv.appendChild(svg);
    var svgRect = path.getBBox();
    remove(tempDiv);
    return svgRect;
}
/** @private */
export function getElement(id) {
    return document.getElementById(id);
}
/** @private */
export function removeElement(id) {
    var element = getElement(id);
    if (element) {
        remove(element);
    }
}
/** @private */
export function valueToCoefficient(value, axis, orientation, range) {
    var result = (value - range.min) / range.delta;
    result = (orientation === 'Vertical') ? (!axis.isInversed) ? (1 - result) : result : (!axis.isInversed) ? result : (1 - result);
    return result;
}
export function getFontStyle(font) {
    var style = '';
    style = 'font-size:' + font.size +
        '; font-style:' + font.fontStyle + '; font-weight:' + font.fontWeight +
        '; font-family:' + font.fontFamily + ';opacity:' + font.opacity +
        '; color:' + font.color + ';';
    return style;
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function textFormatter(format, data, gauge) {
    var keys = Object.keys(data);
    for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
        var key = keys_1[_i];
        format = format.split('{' + key + '}').join(formatValue(data[key], gauge).toString());
    }
    return format;
}
export function formatValue(value, gauge) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    var formatValue;
    var formatFunction;
    if (gauge.format && !isNaN(Number(value))) {
        formatFunction = gauge.intl.getNumberFormat({ format: gauge.format, useGrouping: gauge.useGroupingSeparator });
        formatValue = formatFunction(Number(value));
    }
    else {
        formatValue = value;
    }
    return formatValue !== null ? formatValue : '';
}
// /** @private */
// export function getLabelFormat(format: string): string {
//     const customLabelFormat: boolean = format && format.match('{value}') !== null;
//     const skeleton: string = customLabelFormat ? '' : format;
//     return skeleton;
// }
/** @private */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getTemplateFunction(template, gauge) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    var templateFn = null;
    try {
        if (typeof template === 'function') {
            templateFn = templateComplier(template);
        }
        else if (document.querySelectorAll(template).length) {
            templateFn = templateComplier(document.querySelector(template).innerHTML.trim());
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
/** @private */
export function getElementOffset(childElement, parentElement) {
    parentElement.appendChild(childElement);
    var width = childElement.offsetWidth;
    var height = childElement.offsetHeight;
    parentElement.removeChild(childElement);
    return new Size(width, height);
}
/**
 * To trigger the download element
 *
 * @param {string} fileName - Specifies the name of the exported file.
 * @param {ExportType} type - Specifies the extension type of the file to which the Linear Gauge must be exported.
 * @param {string} url - Specifies the blob URL of the exported file of Linear Gauge.
 * @param {boolean} isDownload - Specifies whether the exported file must be downloaded or not.
 * @private
 */
export function triggerDownload(fileName, type, url, isDownload) {
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
}
/** @private */
var VisibleRange = /** @class */ (function () {
    function VisibleRange(min, max, interval, delta) {
        this.min = min;
        this.max = max;
        this.interval = interval;
        this.delta = delta;
    }
    return VisibleRange;
}());
export { VisibleRange };
/**
 * Specifies the location of the element in the linear gauge.
 */
var GaugeLocation = /** @class */ (function () {
    function GaugeLocation(x, y) {
        this.x = x;
        this.y = y;
    }
    return GaugeLocation;
}());
export { GaugeLocation };
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
    function PathOption(id, fill, width, color, opacity, dashArray, d, transform) {
        if (transform === void 0) { transform = ''; }
        var _this = _super.call(this, id) || this;
        _this.opacity = opacity;
        _this.fill = fill;
        _this.stroke = color;
        _this['stroke-width'] = width;
        _this['stroke-dasharray'] = dashArray;
        _this.d = d;
        _this.transform = transform;
        return _this;
    }
    return PathOption;
}(CustomizeOption));
export { PathOption };
/** @private */
var RectOption = /** @class */ (function () {
    function RectOption(id, fill, border, opacity, rect) {
        this.opacity = opacity;
        this.id = id;
        this.y = rect.y;
        this.x = rect.x;
        this.fill = fill;
        this.stroke = border.color;
        this['stroke-width'] = border.width;
        this['stroke-dasharray'] = border.dashArray;
        this.height = rect.height;
        this.width = rect.width;
    }
    return RectOption;
}());
export { RectOption };
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
    function VisibleLabels(text, value, size, x, y) {
        this.text = text;
        this.value = value;
        this.size = size;
        this.x = x;
        this.y = y;
    }
    return VisibleLabels;
}());
export { VisibleLabels };
/** @private */
var Align = /** @class */ (function () {
    function Align(axisIndex, align) {
        this.align = align;
        this.axisIndex = axisIndex;
    }
    return Align;
}());
export { Align };
/** @private */
export function textElement(options, font, color, opacity, parent) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    var renderOptions = {};
    var renderer = new SvgRenderer('');
    if (!isNullOrUndefined(options.id)) {
        removeElement(options.id);
    }
    var style = 'fill:' + color + '; font-size:' + font.size +
        '; font-style:' + font.fontStyle + ' ; font-weight:' + font.fontWeight + '; font-family:' +
        font.fontFamily + '; text-anchor:' + options.anchor + '; transform:' + options.transform +
        '; opacity:' + (!isNullOrUndefined(opacity) ? opacity : font.opacity) + '; dominant-baseline:' + options.baseLine + ';';
    renderOptions = {
        'id': options.id,
        'x': options.x,
        'y': options.y,
        'style': style
    };
    var htmlObject = renderer.createText(renderOptions, options.text);
    parent.appendChild(htmlObject);
    return htmlObject;
}
export function calculateNiceInterval(min, max, size, orientation) {
    var delta = max - min;
    var currentInterval;
    var intervalDivs = [10, 5, 2, 1];
    var desiredIntervalsCount = getActualDesiredIntervalsCount(size, orientation);
    var niceInterval = delta / desiredIntervalsCount;
    var minInterval = Math.pow(10, Math.floor(Math.log(niceInterval) / Math.log(10)));
    for (var _i = 0, intervalDivs_1 = intervalDivs; _i < intervalDivs_1.length; _i++) {
        var interval = intervalDivs_1[_i];
        currentInterval = minInterval * interval;
        if (desiredIntervalsCount < (delta / currentInterval)) {
            break;
        }
        niceInterval = currentInterval;
    }
    return niceInterval;
}
export function getActualDesiredIntervalsCount(size, orientation) {
    var maximumLabels = 5;
    var desiredIntervalsCount = (orientation === 'Horizontal' ? 0.533 : 1) * maximumLabels;
    desiredIntervalsCount = Math.max((size * (desiredIntervalsCount / 100)), 1);
    return desiredIntervalsCount;
}
/** @private */
export function getPointer(target, gauge) {
    var split = [];
    var radix = 10;
    split = target.id.replace(gauge.element.id, '').split('_');
    var axisIndex = parseInt(split[2], radix);
    var pointIndex = parseInt(split[4], radix);
    var axis = gauge.axes[axisIndex];
    var pointer = gauge.axes[axisIndex].pointers[pointIndex];
    return { axis: axis, axisIndex: axisIndex, pointer: pointer, pointerIndex: pointIndex };
}
/** @private */
export function getRangeColor(value, ranges) {
    var rangeColor = null;
    ranges.forEach(function (range) {
        if ((value >= range.start && range.end >= value) && range.start !== range.end) {
            rangeColor = range.interior;
        }
    });
    return rangeColor;
}
/**
 * Function to get the mouse position
 *
 * @param {number} pageX - Specifies the horizontal position of the click event.
 * @param {number} pageY - Specifies the vertical position of the click event.
 * @param {number} element - Specifies the target element of the client event.
 * @private
 */
export function getMousePosition(pageX, pageY, element) {
    var elementRect = element.getBoundingClientRect();
    var pageXOffset = element.ownerDocument.defaultView.pageXOffset;
    var pageYOffset = element.ownerDocument.defaultView.pageYOffset;
    var clientTop = element.ownerDocument.documentElement.clientTop;
    var clientLeft = element.ownerDocument.documentElement.clientLeft;
    var positionX = elementRect.left + pageXOffset - clientLeft;
    var positionY = elementRect.top + pageYOffset - clientTop;
    return new GaugeLocation((pageX - positionX), (pageY - positionY));
}
/** @private */
export function getRangePalette(theme) {
    var palette;
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
            palette = ['#6200EE', '#09AF74', '#0076E5', '#CB3587', '#E7910F', '#0364DE',
                '#66CD15', '#F3A93C', '#107C10', '#C19C00'];
            break;
        case 'fluent2dark':
        case 'fluent2highcontrast':
            palette = ['#9BB449', '#2A72D5', '#43B786', '#3F579A', '#584EC6', '#E85F9C',
                '#6E7A89', '#EA6266', '#0B6A0B', '#C19C00'];
            break;
        case 'bootstrap5':
        case 'bootstrap5dark':
            palette = ['#6610F2', '#6f42C1', '#D63384', '#DC3545',
                '#FD7E14', '#FFC107', '#198754', '#0DCAF0'];
            break;
        default:
            palette = ['#ff5985', '#ffb133', '#fcde0b', '#27d5ff', '#50c917'];
            break;
    }
    return palette;
}
/** @private */
export function calculateShapes(location, shape, size, url, options, orientation, axis, pointer) {
    var path;
    var width = size.width;
    var height = size.height;
    var locX = location.x;
    var locY = location.y;
    var radius;
    switch (shape) {
        case 'Circle':
            radius = ((width + height) / 4);
            locX = (orientation === 'Vertical') ? (!axis.opposedPosition) ? (pointer.placement !== 'Far') ? locX - radius : locX + radius :
                pointer.placement === 'Near' ? locX - radius : locX + radius : locX;
            locY = (orientation === 'Vertical') ? locY : (!axis.opposedPosition) ? (pointer.placement === 'Far') ?
                locY + radius : locY - radius : (pointer.placement === 'Near') ? locY - radius : locY + radius;
            merge(options, { 'r': radius, 'cx': locX, 'cy': locY });
            break;
        case 'Diamond':
        case 'Rectangle':
            locX = (orientation === 'Horizontal') ? ((locX - (width / 2))) : ((!axis.opposedPosition && pointer.placement !== 'Far') ||
                (axis.opposedPosition && pointer.placement === 'Near')) ? locX - width : locX;
            locY = (orientation === 'Vertical') ? locY : (!axis.opposedPosition) ?
                (pointer.placement === 'Far') ? locY + (height / 2) : locY - (height / 2) :
                (pointer.placement === 'Near') ? locY - (height / 2) : locY + (height / 2);
            if (shape === 'Diamond') {
                path = 'M' + ' ' + locX + ' ' + locY + ' ' +
                    'L' + ' ' + (locX + (width / 2)) + ' ' + (locY - (height / 2)) + ' ' +
                    'L' + ' ' + (locX + width) + ' ' + locY + ' ' +
                    'L' + ' ' + (locX + (width / 2)) + ' ' + (locY + (height / 2)) + ' ' +
                    'L' + ' ' + locX + ' ' + locY + ' z';
            }
            else {
                path = 'M' + ' ' + locX + ' ' + (locY - (height / 2)) + ' ' +
                    'L' + ' ' + (locX + width) + ' ' + (locY - (height / 2)) + ' ' +
                    'L' + ' ' + (locX + width) + ' ' + (locY + (height / 2)) + ' ' +
                    'L' + ' ' + locX + ' ' + (locY + (height / 2)) + ' ' +
                    'L' + ' ' + locX + ' ' + (locY - (height / 2)) + ' z';
            }
            merge(options, { 'd': path });
            break;
        case 'Triangle':
            if (orientation === 'Vertical') {
                path = 'M' + ' ' + locX + ' ' + locY + ' ' +
                    'L' + (locX - width) + ' ' + (locY - (height / 2)) +
                    'L' + (locX - width) + ' ' + (locY + (height / 2)) + ' Z';
            }
            else {
                path = 'M' + ' ' + locX + ' ' + locY + ' ' +
                    'L' + (locX + (width / 2)) + ' ' + (locY - height) +
                    'L' + (locX - (width / 2)) + ' ' + (locY - height) + ' Z';
            }
            merge(options, { 'd': path });
            break;
        case 'InvertedTriangle':
            if (orientation === 'Vertical') {
                path = 'M' + ' ' + locX + ' ' + locY + ' ' +
                    'L' + (locX + width) + ' ' + (locY - (height / 2)) +
                    'L' + (locX + width) + ' ' + (locY + (height / 2)) + ' Z';
            }
            else {
                path = 'M' + ' ' + locX + ' ' + locY + ' ' +
                    'L' + (locX + (width / 2)) + ' ' + (locY + height) +
                    'L' + (locX - (width / 2)) + ' ' + (locY + height) + ' Z';
            }
            merge(options, { 'd': path });
            break;
        case 'Arrow':
            if (orientation === 'Vertical') {
                path = 'M' + ' ' + locX + ' ' + locY + ' ' + 'L' + (locX - (width / 2)) + ' ' + (locY - (height / 2)) + ' ' +
                    'L' + (locX - (width / 2)) + ' ' + ((locY - (height / 2)) + (height / 4)) + ' ' + 'L' + (locX - width) + ' '
                    + ((locY - (height / 2)) + (height / 4)) + ' ' + 'L' + (locX - width) + ' ' + ((locY + (height / 2)) -
                    (height / 4)) + ' ' + 'L' + (locX - (width / 2)) + ' ' + ((locY + (height / 2)) - (height / 4)) + ' ' +
                    'L' + (locX - (width / 2)) + ' ' + (locY + height / 2) + 'z';
            }
            else {
                path = 'M' + ' ' + locX + ' ' + locY + ' ' + 'L' + (locX + (width / 2)) + ' ' + (locY - (height / 2)) + ' ' +
                    'L' + ((locX + (width / 2)) - (width / 4)) + ' ' + (locY - (height / 2)) + ' ' + 'L' + ((locX + (width / 2)) -
                    (width / 4)) + ' ' + (locY - height) + ' ' + 'L' + ((locX - (width / 2)) + (width / 4)) + ' ' + (locY - height) +
                    ' ' + 'L' + ((locX - (width / 2)) + (width / 4)) + ' ' + (locY - (height / 2)) + ' ' + 'L' + (locX - (width / 2))
                    + ' ' + (locY - (height / 2)) + 'z';
            }
            merge(options, { 'd': path });
            break;
        case 'InvertedArrow':
            if (orientation === 'Vertical') {
                path = 'M' + ' ' + locX + ' ' + locY + 'L' + (locX + (width / 2)) + ' ' + (locY - (height / 2)) + ' ' +
                    'L' + (locX + (width / 2)) + ' ' + ((locY - (height / 2)) + (height / 4)) + ' ' + 'L' + (locX + width) + ' '
                    + ((locY - (height / 2)) + (height / 4)) + ' ' + 'L' + (locX + width) + ' ' + ((locY + (height / 2)) - (height / 4))
                    + ' ' + 'L' + (locX + (width / 2)) + ' ' + ((locY + (height / 2)) - (height / 4)) + ' ' +
                    'L' + (locX + (width / 2)) + ' ' + (locY + height / 2) + 'z';
            }
            else {
                path = 'M' + ' ' + locX + ' ' + locY + ' ' + 'L' + (locX + (width / 2)) + ' ' + (locY + (height / 2)) + ' ' +
                    'L' + ((locX + (width / 2)) - (width / 4)) + ' ' + (locY + (height / 2)) + ' ' + 'L' + ((locX + (width / 2)) -
                    (width / 4)) + ' ' + (locY + height) + ' ' + 'L' + ((locX - (width / 2)) + (width / 4)) + ' ' + (locY + height)
                    + ' ' + 'L' + ((locX - (width / 2)) + (width / 4)) + ' ' + (locY + (height / 2)) + ' ' +
                    'L' + (locX - (width / 2)) + ' ' + (locY + (height / 2)) + 'z';
            }
            merge(options, { 'd': path });
            break;
        case 'Image':
            merge(options, { 'href': url, 'height': height, 'width': width, x: locX - (width / 2), y: locY - (height / 2) });
            break;
    }
    return options;
}
/** @private */
export function calculateTextPosition(location, shape, options, orientation, axis, pointer) {
    var width;
    var height;
    var textSize;
    var locX = location.x;
    var locY = location.y;
    switch (shape) {
        case 'Text':
            textSize = measureText(pointer.text, pointer.textStyle);
            height = textSize.height;
            width = textSize.width;
            locX = (orientation === 'Horizontal') ? ((locX - (width / 2))) : ((!axis.opposedPosition && pointer.placement !== 'Far') ||
                (axis.opposedPosition && pointer.placement === 'Near')) ? (pointer.position === 'Inside' && !axis.opposedPosition) ||
                (pointer.position === 'Cross') || (axis.opposedPosition && pointer.placement === 'Near' && pointer.position === 'Outside') ? locX - (width / 2) : locX - width : (pointer.position === 'Cross' && pointer.placement === 'Far') ||
                (axis.opposedPosition && pointer.position === 'Cross' && (pointer.placement === 'None' || pointer.placement === 'Center')) ? locX + (width / 2) : locX;
            locY = (orientation === 'Vertical') ? locY + (height / 4) : (!axis.opposedPosition) ?
                (pointer.placement === 'Far') ? pointer.position === 'Cross' ? locY + (height / 2) + (height / 4) : pointer.position === 'Inside' ? locY + height : locY + (height / 2) : locY :
                (pointer.placement === 'Near') ? locY : pointer.position === 'Cross' ? locY + (height / 2) + (height / 4) : pointer.position === 'Outside' ? locY + height : locY + (height / 2);
            merge(options, { x: locX, y: locY });
            break;
    }
    return options;
}
/** @private */
export function getBox(location, boxName, orientation, size, type, containerWidth, axis, cornerRadius) {
    var path = ' ';
    var radius = cornerRadius;
    var horizontalRadius;
    var x1;
    var y1;
    var rectWidth;
    var rectHeight;
    var verticalRadius;
    var bottomRadius;
    var topRadius;
    var horizontalCurve;
    var verticalCurve;
    switch (boxName) {
        case 'RoundedRectangle':
            x1 = location.x;
            y1 = location.y;
            rectWidth = location.width;
            rectHeight = location.height;
            if (((orientation === 'Vertical' && location.height === 0) || (orientation === 'Horizontal' && location.width === 0)) && radius > 10) {
                radius = 10;
            }
            horizontalCurve = x1 + rectWidth - radius;
            verticalCurve = y1 + rectHeight - radius;
            verticalRadius = radius + y1;
            horizontalRadius = radius + x1;
            if (type === 'container' || type === 'bar' && ((orientation === 'Vertical' && location.height !== 0) || (orientation === 'Horizontal' && location.width !== 0))) {
                if (horizontalRadius > (x1 + (rectWidth / 2))) {
                    horizontalRadius = x1 + (rectWidth / 2);
                    horizontalCurve = horizontalRadius;
                }
                if (verticalRadius > (y1 + (rectHeight / 2))) {
                    verticalRadius = y1 + (rectHeight / 2);
                    verticalCurve = verticalRadius;
                }
            }
            if (type === 'bar' && ((orientation === 'Vertical' && location.height === 0) || (orientation === 'Horizontal' && location.width === 0))) {
                if (location.width < radius / 2 && !axis.isInversed) {
                    horizontalCurve = horizontalCurve + radius + radius / 2;
                }
                else if (location.width < radius / 2 && axis.isInversed) {
                    horizontalRadius = x1 - Math.ceil(radius / 4);
                }
                if (location.height < radius / 2 && !axis.isInversed) {
                    verticalRadius = y1 - Math.ceil(radius / 4);
                }
                else if (location.height < radius / 2 && axis.isInversed) {
                    verticalCurve = verticalCurve + radius + radius / 2;
                }
            }
            path = 'M' + ' ' + x1 + ' ' + verticalRadius + ' Q ' + x1 + ' ' + y1 + ' ' + horizontalRadius + ' ' + y1 + ' ';
            path += 'L' + ' ' + horizontalCurve + ' ' + y1 + ' Q ' + (x1 + rectWidth) + ' ' + y1 + ' '
                + (x1 + rectWidth) + ' ' + verticalRadius + ' ';
            path += 'L ' + (x1 + rectWidth) + ' ' + verticalCurve + ' Q ' + (x1 + rectWidth) + ' ' + (y1 + rectHeight)
                + ' ' + horizontalCurve + ' ' + (y1 + rectHeight) + ' ';
            path += ' L ' + horizontalRadius + ' ' + (y1 + rectHeight) + ' Q ' + x1 + ' ' + (y1 + rectHeight)
                + ' ' + x1 + ' ' + verticalCurve + ' ';
            path += 'L' + ' ' + x1 + ' ' + verticalRadius + ' ' + 'z';
            break;
        case 'Thermometer':
            // eslint-disable-next-line no-case-declarations
            var width = (orientation === 'Vertical') ? location.width : location.height;
            bottomRadius = width + ((width / 2) / Math.PI);
            topRadius = width / 2;
            if (orientation === 'Vertical') {
                var addValue = ((containerWidth + ((containerWidth / 2) / Math.PI)) - bottomRadius);
                var y1_1 = (type === 'bar') ? location.y + addValue : location.y;
                var locY = (type === 'bar') ? location.y + (topRadius - (topRadius / Math.PI)) : location.y;
                var locHeight = location.height;
                path = 'M' + location.x + ' ' + (y1_1 + locHeight) +
                    ' A ' + bottomRadius + ' ' + bottomRadius + ', 0, 1, 0, ' + (location.x + location.width) + ' ' + (y1_1 + locHeight) +
                    ' L ' + (location.x + location.width) + ' ' + locY +
                    ' A ' + topRadius + ' ' + topRadius + ', 0, 1, 0, ' + location.x + ' ' + locY + ' z ';
            }
            else {
                var x1_1 = (type === 'bar' && !axis.isInversed) ?
                    location.x - ((containerWidth + ((containerWidth / 2) / Math.PI)) - bottomRadius) : location.x;
                var locWidth = (type === 'bar') ? (location.width - (topRadius - ((topRadius / Math.PI)))) : location.width;
                path = 'M' + x1_1 + ' ' + (location.y) +
                    ' A ' + bottomRadius + ' ' + bottomRadius + ', 0, 1, 0, ' + x1_1 + ' ' + (location.y + location.height) +
                    ' L ' + ((type === 'bar' ? location.x : x1_1) + locWidth) + ' ' + (location.y + location.height) +
                    ' A ' + topRadius + ' ' + topRadius + ', 0, 1, 0, ' +
                    ((type === 'bar' ? location.x : x1_1) + locWidth) + ' ' + (location.y) + ' z ';
            }
            break;
    }
    return path;
}
/** @private */
export function getExtraWidth(gaugeElement) {
    var svgElement = getElement(gaugeElement.id + '_svg');
    var extraWidth = 0;
    if (!isNullOrUndefined(svgElement) && !isNullOrUndefined(gaugeElement)) {
        extraWidth = gaugeElement.getBoundingClientRect().left - svgElement.getBoundingClientRect().left;
    }
    return extraWidth;
}
/**
 * @param {string} text - Specifies the text.
 * @returns {void}
 * @private */
export function showTooltip(text, gauge) {
    var tooltip = getElement(gauge.element.id + '_EJ2_Title_Tooltip');
    if (!tooltip) {
        var titleWidth = measureText(text, { size: '12px', fontFamily: 'Segoe UI' }).width + 10;
        titleWidth = titleWidth < gauge.actualRect.width ? titleWidth : gauge.actualRect.width - 10;
        tooltip = createElement('div', { id: gauge.element.id + '_EJ2_Title_Tooltip', className: 'EJ2-LinearGauge-Tooltip' });
        tooltip.innerText = text;
        tooltip.style.cssText = 'top:' + (gauge.actualRect.y + 10).toString() + 'px; left:' + (gauge.actualRect.x).toString() +
            'px; background-color:rgb(255, 255, 255) !important; color:black !important; ' +
            'position:absolute; border:1px solid rgb(112, 112, 112); padding-left:3px; padding-right:2px;' +
            'padding-bottom:2px; padding-top:2px; font-size:12px; font-family:"Segoe UI";' + 'width:' + (titleWidth) + 'px;';
        document.body.style.overflow = 'hidden';
        getElement(gauge.element.id + '_Secondary_Element').appendChild(tooltip);
    }
    else {
        tooltip.innerText = text;
        tooltip.style.top = (gauge.actualRect.y + 10).toString() + 'px';
        tooltip.style.left = (gauge.actualRect.x).toString() + 'px';
    }
}
/** @private */
export function removeTooltip() {
    if (document.getElementsByClassName('EJ2-LinearGauge-Tooltip').length > 0) {
        document.getElementsByClassName('EJ2-LinearGauge-Tooltip')[0].remove();
    }
}
