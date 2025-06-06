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
import { SvgRenderer } from '../svg-render/index';
import { createElement, remove, merge } from '@syncfusion/ej2-base';
/**
 * Function to measure the height and width of the text.
 *
 * @private
 * @param {string} text To get a text
 * @param {FontModel} font To get a font of the text
 * @returns {Size} measureText
 */
export function measureText(text, font, themeFontStyle, isHeader) {
    var breakText = text || ''; // For avoid NuLL value
    var htmlObject = document.getElementById('chartmeasuretext');
    if (htmlObject === null) {
        htmlObject = createElement('text', { id: 'chartmeasuretext' });
        document.body.appendChild(htmlObject);
    }
    if (typeof (text) === 'string' && (text.indexOf('<') > -1 || text.indexOf('>') > -1)) {
        var textArray = text.split(' ');
        for (var i = 0; i < textArray.length; i++) {
            if (textArray[i].indexOf('<br/>') === -1) {
                textArray[i] = textArray[i].replace(/[<>]/g, '&');
            }
        }
        text = textArray.join(' ');
    }
    htmlObject.innerHTML = (breakText.indexOf('<br>') > -1 || breakText.indexOf('<br/>') > -1) ? breakText : text;
    htmlObject.style.position = 'fixed';
    htmlObject.style.fontSize = font.size || (isHeader ? themeFontStyle.headerTextSize : themeFontStyle.size);
    htmlObject.style.fontStyle = font.fontStyle || themeFontStyle.fontStyle;
    htmlObject.style.fontFamily = font.fontFamily || themeFontStyle.fontFamily;
    htmlObject.style.visibility = 'hidden';
    htmlObject.style.top = '-100';
    htmlObject.style.left = '0';
    htmlObject.style.whiteSpace = 'nowrap';
    // For bootstrap line height issue
    htmlObject.style.lineHeight = 'normal';
    var fontWidth = htmlObject.clientWidth;
    var fontHeight = htmlObject.clientHeight;
    var fontWeight = htmlObject.style.fontWeight;
    htmlObject.style.fontWeight = font.fontWeight || themeFontStyle.fontWeight;
    return new Size(htmlObject.style.fontWeight === 'bold' && fontWeight === 'normal' ? Math.max(fontWidth, htmlObject.clientWidth) : htmlObject.clientWidth, htmlObject.style.fontWeight === 'bold' && fontWeight === 'normal' ? Math.max(fontHeight, htmlObject.clientHeight) : htmlObject.clientHeight);
}
/** @private */
export function withInAreaBounds(x, y, areaBounds, width, height) {
    if (width === void 0) { width = 0; }
    if (height === void 0) { height = 0; }
    return (x >= areaBounds.x - width && x <= areaBounds.x + areaBounds.width + width && y >= areaBounds.y - height
        && y <= areaBounds.y + areaBounds.height + height);
}
/** @private */
export function findDirection(rX, rY, rect, arrowLocation, arrowPadding, top, bottom, left, tipX, tipY, controlName) {
    if (controlName === void 0) { controlName = ''; }
    var direction = '';
    var startX = rect.x;
    var startY = rect.y;
    var width = rect.x + rect.width;
    var height = rect.y + rect.height;
    if (top) {
        direction = direction.concat('M' + ' ' + (startX) + ' ' + (startY + rY) + ' Q ' + startX + ' '
            + startY + ' ' + (startX + rX) + ' ' + startY + ' ' +
            ' L' + ' ' + (width - rX) + ' ' + (startY) + ' Q ' + width + ' '
            + startY + ' ' + (width) + ' ' + (startY + rY));
        direction = direction.concat(' L' + ' ' + (width) + ' ' + (height - rY) + ' Q ' + width + ' '
            + (height) + ' ' + (width - rX) + ' ' + (height));
        if (arrowPadding !== 0) {
            if (controlName === 'RangeNavigator') {
                if ((arrowLocation.x - arrowPadding) > width / 2) {
                    direction = direction.concat(' L' + ' ' + (arrowLocation.x + arrowPadding) + ' ' + (height));
                    direction = direction.concat(' L' + ' ' + (tipX + arrowPadding) + ' ' + (height + arrowPadding)
                        + ' L' + ' ' + (arrowLocation.x) + ' ' + height);
                }
                else {
                    direction = direction.concat(' L' + ' ' + (arrowLocation.x) + ' ' + (height));
                    direction = direction.concat(' L' + ' ' + (tipX - arrowPadding) + ' ' + (height + arrowPadding)
                        + ' L' + ' ' + (arrowLocation.x - arrowPadding) + ' ' + height);
                }
            }
            else {
                direction = direction.concat(' L' + ' ' + (arrowLocation.x + arrowPadding) + ' ' + (height));
                direction = direction.concat(' L' + ' ' + (tipX) + ' ' + (height + arrowPadding)
                    + ' L' + ' ' + (arrowLocation.x - arrowPadding) + ' ' + height);
            }
        }
        if ((arrowLocation.x - arrowPadding) > startX) {
            direction = direction.concat(' L' + ' ' + (startX + rX) + ' ' + height + ' Q ' + startX + ' '
                + height + ' ' + (startX) + ' ' + (height - rY) + ' z');
        }
        else {
            if (arrowPadding === 0) {
                direction = direction.concat(' L' + ' ' + (startX + rX) + ' ' + height + ' Q ' + startX + ' '
                    + height + ' ' + (startX) + ' ' + (height - rY) + ' z');
            }
            else {
                direction = direction.concat(' L' + ' ' + (startX) + ' ' + (height + rY) + ' z');
            }
        }
    }
    else if (bottom) {
        direction = direction.concat('M' + ' ' + (startX) + ' ' + (startY + rY) + ' Q ' + startX + ' '
            + (startY) + ' ' + (startX + rX) + ' ' + (startY) + ' L' + ' ' + (arrowLocation.x - arrowPadding) + ' ' + (startY));
        direction = direction.concat(' L' + ' ' + (tipX) + ' ' + (arrowLocation.y));
        direction = direction.concat(' L' + ' ' + (arrowLocation.x + arrowPadding) + ' ' + (startY));
        direction = direction.concat(' L' + ' ' + (width - rX) + ' ' + (startY)
            + ' Q ' + (width) + ' ' + (startY) + ' ' + (width) + ' ' + (startY + rY));
        direction = direction.concat(' L' + ' ' + (width) + ' ' + (height - rY) + ' Q ' + (width) + ' '
            + (height) + ' ' + (width - rX) + ' ' + (height) +
            ' L' + ' ' + (startX + rX) + ' ' + (height) + ' Q ' + (startX) + ' '
            + (height) + ' ' + (startX) + ' ' + (height - rY) + ' z');
    }
    else if (left) {
        direction = direction.concat('M' + ' ' + (startX) + ' ' + (startY + rY) + ' Q ' + startX + ' '
            + (startY) + ' ' + (startX + rX) + ' ' + (startY));
        direction = direction.concat(' L' + ' ' + (width - rX) + ' ' + (startY) + ' Q ' + (width) + ' '
            + (startY) + ' ' + (width) + ' ' + ((controlName === 'RangeNavigator' ? 0 : (startY + rY)) + ' L' + ' ' + (width) + ' ' + (controlName === 'RangeNavigator' ? 0 : (arrowLocation.y - arrowPadding))));
        direction = (controlName === 'RangeNavigator') ? direction.concat(' L' + ' ' + (width + arrowPadding) + ' ' + 0) :
            direction.concat(' L' + ' ' + (width + arrowPadding) + ' ' + (tipY));
        direction = (controlName === 'RangeNavigator') ? direction.concat(' L' + ' ' + (width) + ' ' + (arrowLocation.y - rY)) :
            direction.concat(' L' + ' ' + (width) + ' ' + (arrowLocation.y + arrowPadding));
        direction = direction.concat(' L' + ' ' + (width) + ' ' + (height - rY) + ' Q ' + width + ' ' + (height) + ' ' + (width - rX) + ' ' + (height));
        direction = direction.concat(' L' + ' ' + (startX + rX) + ' ' + (height) + ' Q ' + startX + ' '
            + (height) + ' ' + (startX) + ' ' + (height - rY) + ' z');
    }
    else {
        direction = direction.concat('M' + ' ' + (startX + rX) + ' ' + (startY) + ' Q ' + (startX) + ' '
            + (startY) + ' ' + (startX) + ' ' + ((controlName === 'RangeNavigator' ? 0 : (startY + rY)) + ' L' + ' ' + (startX) + ' ' + (controlName === 'RangeNavigator' ? 0 : (arrowLocation.y - arrowPadding))));
        direction = (controlName === 'RangeNavigator') ? direction.concat(' L' + ' ' + (startX - arrowPadding) + ' ' + 0) :
            direction.concat(' L' + ' ' + (startX - arrowPadding) + ' ' + (tipY));
        direction = (controlName === 'RangeNavigator') ? direction.concat(' L' + ' ' + (startX) + ' ' + (arrowLocation.y - rY)) :
            direction.concat(' L' + ' ' + (startX) + ' ' + (arrowLocation.y + arrowPadding));
        direction = direction.concat(' L' + ' ' + (startX) + ' ' + (height - rY) + ' Q ' + startX + ' '
            + (height) + ' ' + (startX + rX) + ' ' + (height));
        direction = direction.concat(' L' + ' ' + (width - rX) + ' ' + (height) + ' Q ' + width + ' '
            + (height) + ' ' + (width) + ' ' + (height - rY) +
            ' L' + ' ' + (width) + ' ' + (startY + rY) + ' Q ' + width + ' '
            + (startY) + ' ' + (width - rX) + ' ' + (startY) + ' z');
    }
    return direction;
}
/** @private */
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
var Side = /** @class */ (function () {
    function Side(bottom, right) {
        this.isRight = right;
        this.isBottom = bottom;
    }
    return Side;
}());
export { Side };
/** @private */
var CustomizeOption = /** @class */ (function () {
    function CustomizeOption(id) {
        this.id = id;
    }
    return CustomizeOption;
}());
export { CustomizeOption };
/** @private */
var TextOption = /** @class */ (function (_super) {
    __extends(TextOption, _super);
    function TextOption(id, x, y, anchor, text, transform, baseLine, labelRotation) {
        if (transform === void 0) { transform = ''; }
        var _this = _super.call(this, id) || this;
        _this.transform = '';
        _this.baseLine = 'auto';
        _this.labelRotation = 0;
        _this.x = x;
        _this.y = y;
        _this.anchor = anchor;
        _this.text = text;
        _this.transform = transform;
        _this.baseLine = baseLine;
        _this.labelRotation = labelRotation;
        return _this;
    }
    return TextOption;
}(CustomizeOption));
export { TextOption };
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
export function drawSymbol(location, shape, size, url, options, role, label) {
    var renderer = new SvgRenderer('');
    var temp = calculateShapes(location, size, shape, options, url);
    var htmlObject = renderer['draw' + temp.functionName](temp.renderOption);
    htmlObject.setAttribute('role', role);
    htmlObject.setAttribute('aria-label', label);
    return htmlObject;
}
/** @private */
export function calculateShapes(location, size, shape, options, url) {
    var path;
    var functionName = 'Path';
    var width = size.width;
    var height = size.height;
    var locX = location.x;
    var locY = location.y;
    var x = location.x + (-width / 2);
    var y = location.y + (-height / 2);
    switch (shape) {
        case 'Circle':
        case 'Bubble':
            functionName = 'Ellipse';
            merge(options, { 'rx': width / 2, 'ry': height / 2, 'cx': locX, 'cy': locY });
            break;
        case 'Plus':
            path = 'M' + ' ' + x + ' ' + locY + ' ' + 'L' + ' ' + (locX + (width / 2)) + ' ' + locY + ' ' +
                'M' + ' ' + locX + ' ' + (locY + (height / 2)) + ' ' + 'L' + ' ' + locX + ' ' +
                (locY + (-height / 2));
            merge(options, { 'd': path, stroke: options.fill });
            break;
        case 'Cross':
            path = 'M' + ' ' + x + ' ' + (locY + (-height / 2)) + ' ' + 'L' + ' ' + (locX + (width / 2)) + ' ' + (locY + (height / 2)) + ' ' +
                'M' + ' ' + x + ' ' + (locY + (height / 2)) + ' ' + 'L' + ' ' + (locX + (width / 2)) + ' ' +
                (locY + (-height / 2));
            merge(options, { 'd': path, stroke: options.fill });
            break;
        case 'HorizontalLine':
            path = 'M' + ' ' + x + ' ' + locY + ' ' + 'L' + ' ' + (locX + (width / 2)) + ' ' + locY;
            merge(options, { 'd': path, stroke: options.fill });
            break;
        case 'VerticalLine':
            path = 'M' + ' ' + locX + ' ' + (locY + (height / 2)) + ' ' + 'L' + ' ' + locX + ' ' + (locY + (-height / 2));
            merge(options, { 'd': path, stroke: options.fill });
            break;
        case 'Diamond':
            path = 'M' + ' ' + x + ' ' + locY + ' ' +
                'L' + ' ' + locX + ' ' + (locY + (-height / 2)) + ' ' +
                'L' + ' ' + (locX + (width / 2)) + ' ' + locY + ' ' +
                'L' + ' ' + locX + ' ' + (locY + (height / 2)) + ' ' +
                'L' + ' ' + x + ' ' + locY + ' z';
            merge(options, { 'd': path });
            break;
        case 'Rectangle':
            path = 'M' + ' ' + x + ' ' + (locY + (-height / 2)) + ' ' +
                'L' + ' ' + (locX + (width / 2)) + ' ' + (locY + (-height / 2)) + ' ' +
                'L' + ' ' + (locX + (width / 2)) + ' ' + (locY + (height / 2)) + ' ' +
                'L' + ' ' + x + ' ' + (locY + (height / 2)) + ' ' +
                'L' + ' ' + x + ' ' + (locY + (-height / 2)) + ' z';
            merge(options, { 'd': path });
            break;
        case 'Triangle':
            path = 'M' + ' ' + x + ' ' + (locY + (height / 2)) + ' ' +
                'L' + ' ' + locX + ' ' + (locY + (-height / 2)) + ' ' +
                'L' + ' ' + (locX + (width / 2)) + ' ' + (locY + (height / 2)) + ' ' +
                'L' + ' ' + x + ' ' + (locY + (height / 2)) + ' z';
            merge(options, { 'd': path });
            break;
        case 'InvertedTriangle':
            path = 'M' + ' ' + (locX + (width / 2)) + ' ' + (locY - (height / 2)) + ' ' +
                'L' + ' ' + locX + ' ' + (locY + (height / 2)) + ' ' +
                'L' + ' ' + (locX - (width / 2)) + ' ' + (locY - (height / 2)) + ' ' +
                'L' + ' ' + (locX + (width / 2)) + ' ' + (locY - (height / 2)) + ' z';
            merge(options, { 'd': path });
            break;
        case 'Pentagon':
            var eq = 72;
            var xValue = void 0;
            var yValue = void 0;
            for (var i = 0; i <= 5; i++) {
                xValue = (width / 2) * Math.cos((Math.PI / 180) * (i * eq));
                yValue = (height / 2) * Math.sin((Math.PI / 180) * (i * eq));
                if (i === 0) {
                    path = 'M' + ' ' + (locX + xValue) + ' ' + (locY + yValue) + ' ';
                }
                else {
                    path = path.concat('L' + ' ' + (locX + xValue) + ' ' + (locY + yValue) + ' ');
                }
            }
            path = path.concat('Z');
            merge(options, { 'd': path });
            break;
        case 'Image':
            functionName = 'Image';
            merge(options, { 'href': url, 'height': height, 'width': width, x: x, y: y });
            break;
        case 'Star': {
            var cornerPoints = 5;
            var outerRadius = Math.min(width, height) / 2;
            var innerRadius = outerRadius / 2;
            var angle = Math.PI / cornerPoints;
            var starPath = '';
            for (var i = 0; i < 2 * cornerPoints; i++) {
                var radius = (i % 2 === 0) ? outerRadius : innerRadius;
                var currentX = locX + radius * Math.cos(i * angle - Math.PI / 2);
                var currentY = locY + radius * Math.sin(i * angle - Math.PI / 2);
                starPath += (i === 0 ? 'M' : 'L') + currentX + ',' + currentY;
            }
            starPath += 'Z';
            merge(options, { 'd': starPath });
            break;
        }
    }
    return { renderOption: options, functionName: functionName };
}
/** @private */
var PathOption = /** @class */ (function (_super) {
    __extends(PathOption, _super);
    function PathOption(id, fill, width, color, opacity, dashArray, d) {
        var _this = _super.call(this, id) || this;
        _this.opacity = opacity;
        _this.fill = fill;
        _this.stroke = color;
        _this['stroke-width'] = width;
        _this['stroke-dasharray'] = dashArray;
        _this.d = d;
        return _this;
    }
    return PathOption;
}(CustomizeOption));
export { PathOption };
/** @private */
export function textElement(options, font, color, parent, themeStyle) {
    var renderOptions = {};
    var renderer = new SvgRenderer('');
    renderOptions = {
        'id': options.id,
        'x': options.x,
        'y': options.y,
        'fill': color,
        'font-size': font.size || themeStyle.size,
        'font-style': font.fontStyle || themeStyle.fontStyle,
        'font-family': font.fontFamily || themeStyle.fontFamily,
        'font-weight': font.fontWeight || themeStyle.fontWeight,
        'text-anchor': options.anchor,
        'transform': options.transform,
        'opacity': font.opacity,
        'dominant-baseline': options.baseLine
    };
    var text = typeof options.text === 'string' ? options.text : options.text[0];
    var htmlObject = renderer.createText(renderOptions, text);
    if (parent) {
        parent.appendChild(htmlObject);
    }
    return htmlObject;
}
var TooltipLocation = /** @class */ (function () {
    function TooltipLocation(x, y) {
        this.x = x;
        this.y = y;
    }
    return TooltipLocation;
}());
export { TooltipLocation };
