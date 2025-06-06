import { createElement, remove, Property, ChildProperty, Complex, Browser, Animation as Animation$1, animationMode, isNullOrUndefined, extend, EventHandler, Event, Collection, NotifyPropertyChanges, Component } from '@syncfusion/ej2-base';
import { PathOption, Tooltip, getElement as getElement$1, measureText, SvgRenderer } from '@syncfusion/ej2-svg-base';

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
 * helper for progress bar
 */
/** @private */
var Rect = /** @class */ (function () {
    function Rect(x, y, height, width) {
        this.x = x;
        this.y = y;
        this.height = height;
        this.width = width;
    }
    return Rect;
}());
/** @private */
var Size = /** @class */ (function () {
    function Size(height, width) {
        this.height = height;
        this.width = width;
    }
    return Size;
}());
/** @private */
var Pos = /** @class */ (function () {
    function Pos(x, y) {
        this.x = x;
        this.y = y;
    }
    return Pos;
}());
/** @private */
var RectOption = /** @class */ (function (_super) {
    __extends(RectOption, _super);
    function RectOption(id, fill, width, color, opacity, rect, rx, ry, transform, dashArray) {
        var _this = _super.call(this, id, fill, width, color, opacity, dashArray) || this;
        _this.y = rect.y;
        _this.x = rect.x;
        _this.height = rect.height;
        _this.width = rect.width;
        _this.rx = rx ? rx : 0;
        _this.ry = ry ? ry : 0;
        _this.transform = transform ? transform : '';
        _this.stroke = (width !== 0 && _this.stroke !== '') ? color : 'transparent';
        return _this;
    }
    return RectOption;
}(PathOption));
/** @private */
var ColorValue = /** @class */ (function () {
    function ColorValue(r, g, b) {
        this.r = r;
        this.g = g;
        this.b = b;
    }
    return ColorValue;
}());
/**
 * Converts a color value to its hexadecimal representation.
 *
 * @param {ColorValue} value - The color value to convert.
 * @returns {string} - The hexadecimal representation of the color.
 * @private
 */
function convertToHexCode(value) {
    return '#' + componentToHex(value.r) + componentToHex(value.g) + componentToHex(value.b);
}
/**
 * Converts a color component value to its hexadecimal representation.
 *
 * @param {number} value - The color component value to convert.
 * @returns {string} - The hexadecimal representation of the color component.
 * @private
 */
function componentToHex(value) {
    var hex = value.toString(16);
    return hex.length === 1 ? '0' + hex : hex;
}
/**
 * Converts a hexadecimal color code to a ColorValue.
 *
 * @param {string} hex - The hexadecimal color code to convert.
 * @returns {ColorValue} - The ColorValue representing the color.
 * @private
 */
function convertHexToColor(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? new ColorValue(parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)) :
        new ColorValue(255, 255, 255);
}
/**
 * Converts a color name to its corresponding hexadecimal representation.
 *
 * @param {string} color - The color name to convert.
 * @returns {string} - The hexadecimal representation of the color.
 * @private
 */
function colorNameToHex(color) {
    color = color === 'transparent' ? 'white' : color;
    document.body.appendChild(createElement('text', { id: 'chartmeasuretext' }));
    var element = document.getElementById('chartmeasuretext');
    element.style.color = color;
    color = window.getComputedStyle(element).color;
    remove(element);
    var isRGBValue;
    if (color.indexOf('rgb') === 0 || color.indexOf('hsl') === 0) {
        color = color.replace(/\s/g, '').replace(/[()]/g, '');
        isRGBValue = color.slice(3).split(',');
    }
    return convertToHexCode(new ColorValue(parseInt(isRGBValue[3], 10), parseInt(isRGBValue[4], 10), parseInt(isRGBValue[5], 10)));
}
/** @private */
var TextOption = /** @class */ (function () {
    function TextOption(id, fontSize, fontStyle, fontFamily, fontWeight, textAnchor, fill, x, y, width, height) {
        this.id = id;
        this['font-size'] = fontSize;
        this['font-style'] = fontStyle;
        this['font-family'] = fontFamily;
        this['font-weight'] = fontWeight;
        this['text-anchor'] = textAnchor;
        this.fill = fill;
        this.x = x;
        this.y = y;
        this.width = width ? width : 0;
        this.height = height ? height : 0;
    }
    return TextOption;
}());
/**
 * Converts polar coordinates (angle in degrees) to Cartesian coordinates.
 *
 * @param {number} centerX - The x-coordinate of the center point.
 * @param {number} centerY - The y-coordinate of the center point.
 * @param {number} radius - The radius from the center point.
 * @param {number} angleInDegrees - The angle in degrees.
 * @returns {Pos} - The Cartesian coordinates (x, y) corresponding to the given polar coordinates.
 */
function degreeToLocation(centerX, centerY, radius, angleInDegrees) {
    var angleInRadians = (angleInDegrees - 90) * (Math.PI / 180);
    return {
        x: centerX + (radius * Math.cos(angleInRadians)),
        y: centerY + (radius * Math.sin(angleInRadians))
    };
}
/**
 * Generates an SVG path arc string based on given parameters.
 *
 * @param {number} x - The x-coordinate of the center of the arc.
 * @param {number} y - The y-coordinate of the center of the arc.
 * @param {number} radius - The radius of the arc.
 * @param {number} startAngle - The start angle of the arc in degrees.
 * @param {number} endAngle - The end angle of the arc in degrees.
 * @param {boolean} enableRtl - Indicates whether the drawing direction is right-to-left.
 * @param {boolean} pieView - Indicates whether the arc should be drawn as a pie slice.
 * @returns {string} - The SVG path arc string representing the arc.
 */
function getPathArc(x, y, radius, startAngle, endAngle, enableRtl, pieView) {
    var start = degreeToLocation(x, y, radius, startAngle);
    var end = degreeToLocation(x, y, radius, endAngle);
    var largeArcFlag = '0';
    var sweepFlag = (enableRtl) ? '0' : '1';
    if (!enableRtl) {
        largeArcFlag = ((endAngle >= startAngle) ? endAngle : endAngle + 360) - startAngle <= 180 ? '0' : '1';
    }
    else {
        largeArcFlag = ((startAngle >= endAngle) ? startAngle : startAngle + 360) - endAngle <= 180 ? '0' : '1';
    }
    var d;
    if (pieView) {
        d = 'M ' + x + ' ' + y + ' L ' + start.x + ' ' + start.y + ' A ' + radius + ' ' +
            radius + ' ' + ' 0 ' + ' ' + largeArcFlag + ' ' + sweepFlag + ' ' + end.x + ' ' + end.y + ' ' + 'Z';
    }
    else {
        d = 'M' + start.x + ' ' + start.y +
            'A' + radius + ' ' + radius + ' ' + '0' + ' ' + largeArcFlag + ' ' + sweepFlag + ' ' + end.x + ' ' + end.y;
    }
    return d;
}
/**
 * Converts a string value to a number, considering the container size.
 *
 * @param {string} value - The string value to convert to a number.
 * @param {number} containerSize - The size of the container to consider for relative values.
 * @returns {number} - The converted number value.
 * @private
 */
function stringToNumber(value, containerSize) {
    if (value !== null && value !== undefined) {
        return value.indexOf('%') !== -1 ? (containerSize / 100) * parseInt(value, 10) : parseInt(value, 10);
    }
    return null;
}
/**
 * Sets attributes on an HTML element based on the provided options.
 *
 * @param {any} options - The options object containing attributes to set.
 * @param {Element} element - The HTML element to set attributes on.
 * @returns {Element} - The modified HTML element.
 * @private
 */
function setAttributes(options, element) {
    var keys = Object.keys(options);
    for (var i = 0; i < keys.length; i++) {
        element.setAttribute(keys[i], options[keys[i]]);
    }
    return element;
}
/**
 * Calculates the effect value at a given time based on the start and end values, duration, and direction.
 *
 * @param {number} currentTime - The current time in milliseconds.
 * @param {number} startValue - The start value of the effect.
 * @param {number} endValue - The end value of the effect.
 * @param {number} duration - The duration of the effect in milliseconds.
 * @param {boolean} enableRtl - Indicates whether the effect direction is right-to-left.
 * @returns {number} - The calculated effect value at the given time.
 * @private
 */
function effect(currentTime, startValue, endValue, duration, enableRtl) {
    var start = (enableRtl) ? endValue : -endValue;
    var end = startValue + ((enableRtl) ? -endValue : endValue);
    return start * Math.cos(currentTime / duration * (Math.PI / 2)) + end;
}
/**
 * @private
 */
var annotationRender = 'annotationRender';
/**
 * Retrieves an HTML element from the DOM by its ID.
 *
 * @param {string} id - The ID of the HTML element to retrieve.
 * @returns {Element} - The HTML element with the specified ID.
 * @private
 */
function getElement(id) {
    return document.getElementById(id);
}
/**
 * Removes an HTML element from the DOM.
 *
 * @param {string | Element} id - The ID of the HTML element or the element itself to remove.
 *                                If provided as a string, it's assumed to be the ID of the element.
 * @returns {void}
 * @private
 */
function removeElement(id) {
    if (!id) {
        return null;
    }
    var element = typeof id === 'string' ? getElement(id) : id;
    if (element) {
        remove(element);
    }
}
/**
 * @private
 */
var ProgressLocation = /** @class */ (function () {
    function ProgressLocation(x, y) {
        this.x = x;
        this.y = y;
    }
    return ProgressLocation;
}());

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
 * progress bar complex interface
 */
var Margin = /** @class */ (function (_super) {
    __extends$1(Margin, _super);
    function Margin() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property(10)
    ], Margin.prototype, "top", void 0);
    __decorate([
        Property(10)
    ], Margin.prototype, "bottom", void 0);
    __decorate([
        Property(10)
    ], Margin.prototype, "left", void 0);
    __decorate([
        Property(10)
    ], Margin.prototype, "right", void 0);
    return Margin;
}(ChildProperty));
/**
 * Configures the fonts in progressbar
 */
var Font = /** @class */ (function (_super) {
    __extends$1(Font, _super);
    function Font() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property('Normal')
    ], Font.prototype, "fontStyle", void 0);
    __decorate([
        Property('16px')
    ], Font.prototype, "size", void 0);
    __decorate([
        Property('Normal')
    ], Font.prototype, "fontWeight", void 0);
    __decorate([
        Property('')
    ], Font.prototype, "color", void 0);
    __decorate([
        Property('Segoe UI')
    ], Font.prototype, "fontFamily", void 0);
    __decorate([
        Property(null)
    ], Font.prototype, "opacity", void 0);
    __decorate([
        Property('Far')
    ], Font.prototype, "textAlignment", void 0);
    __decorate([
        Property('')
    ], Font.prototype, "text", void 0);
    return Font;
}(ChildProperty));
/**
 * Animation
 */
var Animation = /** @class */ (function (_super) {
    __extends$1(Animation, _super);
    function Animation() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property(false)
    ], Animation.prototype, "enable", void 0);
    __decorate([
        Property(2000)
    ], Animation.prototype, "duration", void 0);
    __decorate([
        Property(0)
    ], Animation.prototype, "delay", void 0);
    return Animation;
}(ChildProperty));
/**
 * Annotation
 */
var ProgressAnnotationSettings = /** @class */ (function (_super) {
    __extends$1(ProgressAnnotationSettings, _super);
    function ProgressAnnotationSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property(null)
    ], ProgressAnnotationSettings.prototype, "content", void 0);
    __decorate([
        Property(0)
    ], ProgressAnnotationSettings.prototype, "annotationAngle", void 0);
    __decorate([
        Property('0%')
    ], ProgressAnnotationSettings.prototype, "annotationRadius", void 0);
    return ProgressAnnotationSettings;
}(ChildProperty));
/**
 * Configures the borders .
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
    return Border;
}(ChildProperty));
/**
 *  Options to customize the tooltip for the progress bar.
 *
 *  @default {}
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
        Property(null)
    ], TooltipSettings.prototype, "format", void 0);
    __decorate([
        Property(false)
    ], TooltipSettings.prototype, "showTooltipOnHover", void 0);
    __decorate([
        Complex({ fontFamily: null, size: '12px', fontWeight: null, fontStyle: 'Normal', color: null }, Font)
    ], TooltipSettings.prototype, "textStyle", void 0);
    __decorate([
        Complex({ color: '#cccccc', width: 0.5 }, Border)
    ], TooltipSettings.prototype, "border", void 0);
    return TooltipSettings;
}(ChildProperty));
/**
 * RangeColor
 */
var RangeColor = /** @class */ (function (_super) {
    __extends$1(RangeColor, _super);
    function RangeColor() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property('')
    ], RangeColor.prototype, "color", void 0);
    __decorate([
        Property(null)
    ], RangeColor.prototype, "start", void 0);
    __decorate([
        Property(null)
    ], RangeColor.prototype, "end", void 0);
    return RangeColor;
}(ChildProperty));

/**
 * Retrieves the theme color settings for a progress bar.
 *
 * @param {ProgressTheme} theme - The theme of the progress bar.
 * @returns {IProgressStyle} - The style settings for the progress bar based on the theme.
 * @private
 */
function getProgressThemeColor(theme) {
    var style;
    switch (theme) {
        case 'Material':
            style = {
                linearTrackColor: '#E3165B',
                linearProgressColor: '#E3165B',
                circularTrackColor: '#E3165B',
                circularProgressColor: '#E3165B',
                backgroundColor: 'transparent',
                progressOpacity: 1,
                trackOpacity: 0.26,
                bufferOpacity: 0.4,
                linearGapWidth: 4,
                circularGapWidth: 4,
                linearTrackThickness: 4,
                linearProgressThickness: 4,
                circularTrackThickness: 4,
                circularProgressThickness: 4,
                tooltipFill: '#ffffff',
                tooltipLightLabel: '#000000',
                success: '#4caf50',
                danger: '#ff6652',
                warning: '#ff9800',
                info: '#03a9f4',
                tooltipLabelFont: {
                    color: 'rgba(249, 250, 251, 1)', fontFamily: 'Roboto', fontWeight: '400'
                },
                linearLabelFont: {
                    size: '10', fontWeight: '400', color: '#000000', fontStyle: 'Normal', fontFamily: 'Roboto'
                },
                circularLabelFont: {
                    size: '12', fontWeight: '500', color: '#000000', fontStyle: 'Normal', fontFamily: 'Roboto'
                }
            };
            break;
        case 'Bootstrap':
            style = {
                linearTrackColor: '#EEEEEE',
                linearProgressColor: '#317ab9',
                circularTrackColor: '#EEEEEE',
                circularProgressColor: '#317ab9',
                backgroundColor: 'transparent',
                progressOpacity: 1,
                trackOpacity: 1,
                bufferOpacity: 0.44,
                linearGapWidth: 4,
                circularGapWidth: 4,
                linearTrackThickness: 20,
                linearProgressThickness: 20,
                circularTrackThickness: 6,
                circularProgressThickness: 6,
                tooltipFill: '#ffffff',
                tooltipLightLabel: '#000000',
                success: '#48b14c',
                danger: '#d44f4f',
                warning: '#fac168',
                info: '#2aaac0',
                tooltipLabelFont: {
                    color: '#F9FAFB', fontFamily: 'Helvetica Neue', fontWeight: '400'
                },
                linearLabelFont: {
                    size: '10', fontWeight: '400', color: '#000000', fontStyle: 'Normal', fontFamily: 'Helvetica Neue'
                },
                circularLabelFont: {
                    size: '12', fontWeight: '500', color: '#000000', fontStyle: 'Normal', fontFamily: 'Helvetica Neue'
                }
            };
            break;
        case 'Bootstrap4':
            style = {
                linearTrackColor: '#E9ECEF',
                linearProgressColor: '#007bff',
                circularTrackColor: '#E9ECEF',
                circularProgressColor: '#007bff',
                backgroundColor: 'transparent',
                progressOpacity: 1,
                trackOpacity: 1,
                bufferOpacity: 0.44,
                linearGapWidth: 4,
                circularGapWidth: 4,
                linearTrackThickness: 16,
                linearProgressThickness: 16,
                circularTrackThickness: 6,
                circularProgressThickness: 6,
                tooltipFill: '#ffffff',
                tooltipLightLabel: '#000000',
                success: '#28a745',
                danger: '#dc3545',
                warning: '#ffc107',
                info: '#17a2b8',
                tooltipLabelFont: {
                    color: '#F9FAFB', fontFamily: 'Helvetica Neue', fontWeight: '400'
                },
                linearLabelFont: {
                    size: '10', fontWeight: '400', color: '#000000', fontStyle: 'Normal', fontFamily: 'Helvetica Neue'
                },
                circularLabelFont: {
                    size: '12', fontWeight: '500', color: '#000000', fontStyle: 'Normal', fontFamily: 'Helvetica Neue'
                }
            };
            break;
        case 'HighContrast':
            style = {
                linearTrackColor: '#BFBFBF',
                linearProgressColor: '#FFD939',
                circularTrackColor: '#BFBFBF',
                circularProgressColor: '#FFD939',
                backgroundColor: 'transparent',
                progressOpacity: 1,
                trackOpacity: 1,
                bufferOpacity: 0.35,
                linearGapWidth: 2,
                circularGapWidth: 4,
                linearTrackThickness: 2,
                linearProgressThickness: 2,
                circularTrackThickness: 4,
                circularProgressThickness: 4,
                tooltipFill: '#ffffff',
                tooltipLightLabel: '#000000',
                success: '#2bc700',
                danger: '#ff6161',
                warning: '#ff7d1a',
                info: '#66b0ff',
                tooltipLabelFont: {
                    color: '#000000', fontFamily: 'Segoe UI', fontWeight: '400'
                },
                linearLabelFont: {
                    size: '10', fontWeight: '400', color: '#FFFFFF', fontStyle: 'Normal', fontFamily: 'Segoe UI'
                },
                circularLabelFont: {
                    size: '12', fontWeight: '500', color: '#FFFFFF', fontStyle: 'Normal', fontFamily: 'Segoe UI'
                }
            };
            break;
        case 'Tailwind3':
            style = {
                linearTrackColor: '#E5E7EB',
                linearProgressColor: '#4F46E5',
                circularTrackColor: '#E5E7EB',
                circularProgressColor: '#4F46E5',
                backgroundColor: 'transparent',
                progressOpacity: 1,
                trackOpacity: 1,
                bufferOpacity: 0.35,
                bufferColor: '#818CF8',
                linearGapWidth: 2,
                circularGapWidth: 4,
                linearTrackThickness: 2,
                linearProgressThickness: 2,
                circularTrackThickness: 4,
                circularProgressThickness: 4,
                tooltipFill: '#111827',
                tooltipLightLabel: '#F9FAFB',
                success: '#15803D',
                danger: '#DC2626',
                warning: '#C2410C',
                info: '#0E7490',
                tooltipLabelFont: {
                    color: '#F9FAFB', fontFamily: 'Inter', fontWeight: '500'
                },
                linearLabelFont: {
                    size: '10', fontWeight: '500', color: '#FFFFFF', fontStyle: 'Normal', fontFamily: 'Inter'
                },
                circularLabelFont: {
                    size: '10', fontWeight: '500', color: '#4F46E5', fontStyle: 'Normal', fontFamily: 'Inter'
                }
            };
            break;
        case 'Tailwind3Dark':
            style = {
                linearTrackColor: '#282F3C',
                linearProgressColor: '#6366F1',
                circularTrackColor: '#282F3C',
                circularProgressColor: '#6366F1',
                backgroundColor: 'transparent',
                progressOpacity: 1,
                trackOpacity: 1,
                bufferOpacity: 0.45,
                bufferColor: '#3730A3',
                linearGapWidth: 2,
                circularGapWidth: 4,
                linearTrackThickness: 2,
                linearProgressThickness: 2,
                circularTrackThickness: 4,
                circularProgressThickness: 4,
                tooltipFill: '#F9FAFB',
                tooltipLightLabel: '#1F2937',
                success: '#22C55E',
                danger: '#F87171',
                warning: '#F97316',
                info: '#38BDF8',
                tooltipLabelFont: {
                    color: '#1F2937', fontFamily: 'Inter', fontWeight: '500'
                },
                linearLabelFont: {
                    size: '10', fontWeight: '500', color: '#FFFFFF', fontStyle: 'Normal', fontFamily: 'Inter'
                },
                circularLabelFont: {
                    size: '10', fontWeight: '500', color: '#6366F1', fontStyle: 'Normal', fontFamily: 'Inter'
                }
            };
            break;
        case 'Tailwind':
            style = {
                linearTrackColor: '#E5E7EB',
                linearProgressColor: '#4F46E5',
                circularTrackColor: '#E5E7EB',
                circularProgressColor: '#4F46E5',
                backgroundColor: 'transparent',
                progressOpacity: 1,
                trackOpacity: 1,
                bufferOpacity: 0.35,
                linearGapWidth: 2,
                circularGapWidth: 4,
                linearTrackThickness: 2,
                linearProgressThickness: 2,
                circularTrackThickness: 4,
                circularProgressThickness: 4,
                tooltipFill: '#ffffff',
                tooltipLightLabel: '#000000',
                success: '#15803D',
                danger: '#DC2626',
                warning: '#C2410C',
                info: '#0E7490',
                tooltipLabelFont: {
                    color: '#F9FAFB', fontFamily: 'Inter', fontWeight: '400'
                },
                linearLabelFont: {
                    size: '10', fontWeight: '400', color: '#FFFFFF', fontStyle: 'Normal', fontFamily: 'Inter'
                },
                circularLabelFont: {
                    size: '12', fontWeight: '500', color: '#FFFFFF', fontStyle: 'Normal', fontFamily: 'Inter'
                }
            };
            break;
        case 'TailwindDark':
            style = {
                linearTrackColor: '#4B5563',
                linearProgressColor: '#22D3EE',
                circularTrackColor: '#4B5563',
                circularProgressColor: '#22D3EE',
                backgroundColor: 'transparent',
                progressOpacity: 1,
                trackOpacity: 1,
                bufferOpacity: 0.45,
                linearGapWidth: 2,
                circularGapWidth: 4,
                linearTrackThickness: 2,
                linearProgressThickness: 2,
                circularTrackThickness: 4,
                circularProgressThickness: 4,
                tooltipFill: '#ffffff',
                tooltipLightLabel: '#000000',
                success: '#22C55E',
                danger: '#F87171',
                warning: '#ea580c',
                info: '#06B6D4',
                tooltipLabelFont: {
                    color: '#1F2937', fontFamily: 'Inter', fontWeight: '400'
                },
                linearLabelFont: {
                    size: '10', fontWeight: '400', color: '#D1D5DB', fontStyle: 'Normal', fontFamily: 'Inter'
                },
                circularLabelFont: {
                    size: '12', fontWeight: '500', color: '#D1D5DB', fontStyle: 'Normal', fontFamily: 'Inter'
                }
            };
            break;
        case 'FabricDark':
        case 'BootstrapDark':
        case 'MaterialDark':
            style = {
                linearTrackColor: '#C8C8C8',
                linearProgressColor: '#9A9A9A',
                circularTrackColor: '#C8C8C8',
                circularProgressColor: '#9A9A9A',
                backgroundColor: 'transparent',
                progressOpacity: 1,
                trackOpacity: 1,
                bufferOpacity: 0.44,
                linearGapWidth: 2,
                circularGapWidth: 4,
                linearTrackThickness: 16,
                linearProgressThickness: 16,
                circularTrackThickness: 4,
                circularProgressThickness: 4,
                tooltipFill: '#ffffff',
                tooltipLightLabel: '#000000',
                success: '#22b24b',
                danger: '#ac2a2a',
                warning: '#ffca1c',
                info: '#489bd5',
                tooltipLabelFont: {
                    color: theme === 'BootstrapDark' ? '#1A1A1A' : theme === 'FabricDark' ? '#DADADA' : 'rgba(18, 18, 18, 1)', fontFamily: theme === 'BootstrapDark' ? 'Helvetica Neue' : theme === 'FabricDark' ? 'Segoe UI' : 'Roboto', fontWeight: '400'
                },
                linearLabelFont: {
                    size: '10', fontWeight: '400', color: '#000000', fontStyle: 'Normal', fontFamily: theme === 'BootstrapDark' ? 'Helvetica Neue' : theme === 'FabricDark' ? 'Segoe UI' : 'Roboto'
                },
                circularLabelFont: {
                    size: '12', fontWeight: '500', color: '#000000', fontStyle: 'Normal', fontFamily: theme === 'BootstrapDark' ? 'Helvetica Neue' : theme === 'FabricDark' ? 'Segoe UI' : 'Roboto'
                }
            };
            break;
        case 'Bootstrap5':
            style = {
                linearTrackColor: '#DEE2E6',
                linearProgressColor: '#0D6EFD',
                circularTrackColor: '#DEE2E6',
                circularProgressColor: '#0D6EFD',
                backgroundColor: 'transparent',
                progressOpacity: 1,
                trackOpacity: 1,
                bufferOpacity: 0.44,
                linearGapWidth: 4,
                circularGapWidth: 4,
                linearTrackThickness: 2,
                linearProgressThickness: 2,
                circularTrackThickness: 2,
                circularProgressThickness: 2,
                tooltipFill: '#000000E5',
                tooltipLightLabel: '#FFFFFF',
                success: '#198754',
                danger: '#DC3545',
                warning: '#FFC107',
                info: '#0DCAF0',
                tooltipLabelFont: {
                    color: '#F9FAFB', fontFamily: 'Segoe UI', fontWeight: '400'
                },
                linearLabelFont: {
                    size: '10', fontWeight: '400', color: '#FFFFFF', fontStyle: 'Normal', fontFamily: 'Segoe UI'
                },
                circularLabelFont: {
                    size: '12', fontWeight: '400', color: '#0D6EFD', fontStyle: 'Normal', fontFamily: 'Segoe UI'
                }
            };
            break;
        case 'Bootstrap5Dark':
            style = {
                linearTrackColor: '#495057',
                linearProgressColor: '#0D6EFD',
                circularTrackColor: '#495057',
                circularProgressColor: '#0D6EFD',
                backgroundColor: 'transparent',
                progressOpacity: 1,
                trackOpacity: 1,
                bufferOpacity: 0.4,
                linearGapWidth: 4,
                circularGapWidth: 4,
                linearTrackThickness: 2,
                linearProgressThickness: 2,
                circularTrackThickness: 2,
                circularProgressThickness: 2,
                tooltipFill: '#FFFFFFE5',
                tooltipLightLabel: '#212529',
                success: '#198754',
                danger: '#DC3545',
                warning: '#FFC107',
                info: '#0DCAF0',
                tooltipLabelFont: {
                    color: '#212529', fontFamily: 'Segoe UI', fontWeight: '400'
                },
                linearLabelFont: {
                    size: '10', fontWeight: '400', color: '#FFFFFF', fontStyle: 'Normal', fontFamily: 'Segoe UI'
                },
                circularLabelFont: {
                    size: '12', fontWeight: '400', color: '#0D6EFD', fontStyle: 'Normal', fontFamily: 'Segoe UI'
                }
            };
            break;
        case 'Fluent':
            style = {
                linearTrackColor: '#F3F2F1',
                linearProgressColor: '#0D6EFD',
                circularTrackColor: '#F3F2F1',
                circularProgressColor: '#0D6EFD',
                backgroundColor: 'transparent',
                progressOpacity: 1,
                trackOpacity: 1,
                bufferOpacity: 0.45,
                linearGapWidth: 4,
                circularGapWidth: 4,
                linearTrackThickness: 16,
                linearProgressThickness: 16,
                circularTrackThickness: 4,
                circularProgressThickness: 4,
                tooltipFill: '#ffffff',
                tooltipLightLabel: '#000000',
                success: '#0B6A0B',
                danger: '#D13438',
                warning: '#CA5010',
                info: '#038387',
                tooltipLabelFont: {
                    color: '#323130', fontFamily: 'Segoe UI', fontWeight: '400'
                },
                linearLabelFont: {
                    size: '10', fontWeight: '400', color: '#0D6EFD', fontStyle: 'Normal', fontFamily: 'Segoe UI'
                },
                circularLabelFont: {
                    size: '12', fontWeight: '500', color: '#0D6EFD', fontStyle: 'Normal', fontFamily: 'Segoe UI'
                }
            };
            break;
        case 'FluentDark':
            style = {
                linearTrackColor: '#3B4248',
                linearProgressColor: '#0D6EFD',
                circularTrackColor: '#3B4248',
                circularProgressColor: '#0D6EFD',
                backgroundColor: 'transparent',
                progressOpacity: 1,
                trackOpacity: 1,
                bufferOpacity: 0.35,
                linearGapWidth: 4,
                circularGapWidth: 4,
                linearTrackThickness: 16,
                linearProgressThickness: 16,
                circularTrackThickness: 4,
                circularProgressThickness: 4,
                tooltipFill: '#ffffff',
                tooltipLightLabel: '#000000',
                success: '#0B6A0B',
                danger: '#D13438',
                warning: '#CA5010',
                info: '#038387',
                tooltipLabelFont: {
                    color: '#F3F2F1', fontFamily: 'Segoe UI', fontWeight: '400'
                },
                linearLabelFont: {
                    size: '10', fontWeight: '400', color: '#0D6EFD', fontStyle: 'Normal', fontFamily: 'Segoe UI'
                },
                circularLabelFont: {
                    size: '12', fontWeight: '500', color: '#0D6EFD', fontStyle: 'Normal', fontFamily: 'Segoe UI'
                }
            };
            break;
        case 'Fluent2':
            style = {
                linearTrackColor: '#E6E6E6',
                linearProgressColor: '#0F6CBD',
                circularTrackColor: '#E6E6E6',
                circularProgressColor: '#0F6CBD',
                backgroundColor: 'transparent',
                progressOpacity: 1,
                trackOpacity: 1,
                bufferOpacity: 0.35,
                linearGapWidth: 4,
                circularGapWidth: 4,
                linearTrackThickness: Browser.isDevice ? 4 : 2,
                linearProgressThickness: Browser.isDevice ? 4 : 2,
                circularTrackThickness: Browser.isDevice ? 2 : 2,
                circularProgressThickness: Browser.isDevice ? 2 : 2,
                tooltipFill: '#FFFFFF',
                tooltipLightLabel: '#242424',
                success: '#107C10',
                danger: '#D13438',
                warning: '#BC4B09',
                info: '#008AA9',
                tooltipLabelFont: {
                    color: '#242424', fontFamily: 'Segoe UI', fontWeight: '400'
                },
                linearLabelFont: {
                    size: '12', fontWeight: '400', color: '#FFFFFF', fontStyle: 'Normal', fontFamily: 'Segoe UI'
                },
                circularLabelFont: {
                    size: '12', fontWeight: '500', color: '#242424', fontStyle: 'Normal', fontFamily: 'Segoe UI'
                }
            };
            break;
        case 'Fluent2Dark':
            style = {
                linearTrackColor: '#333333',
                linearProgressColor: '#115EA3',
                circularTrackColor: '#333333',
                circularProgressColor: '#115EA3',
                backgroundColor: 'transparent',
                progressOpacity: 1,
                trackOpacity: 1,
                bufferOpacity: 0.35,
                linearGapWidth: 4,
                circularGapWidth: 4,
                linearTrackThickness: Browser.isDevice ? 4 : 2,
                linearProgressThickness: Browser.isDevice ? 4 : 2,
                circularTrackThickness: Browser.isDevice ? 2 : 2,
                circularProgressThickness: Browser.isDevice ? 2 : 2,
                tooltipFill: '#292929',
                tooltipLightLabel: '#FFFFFF',
                success: '#107C10',
                danger: '#DC626D',
                warning: '#FAA06B',
                info: '#0099BC',
                tooltipLabelFont: {
                    color: '#FFFFFF', fontFamily: 'Segoe UI', fontWeight: '400'
                },
                linearLabelFont: {
                    size: '12', fontWeight: '400', color: '#FFFFFF', fontStyle: 'Normal', fontFamily: 'Segoe UI'
                },
                circularLabelFont: {
                    size: '12', fontWeight: '500', color: '#FFFFFF', fontStyle: 'Normal', fontFamily: 'Segoe UI'
                }
            };
            break;
        case 'Fluent2HighContrast':
            style = {
                linearTrackColor: '#000000',
                linearProgressColor: '#1AEBFF',
                circularTrackColor: '#000000',
                circularProgressColor: '#1AEBFF',
                backgroundColor: 'transparent',
                progressOpacity: 1,
                trackOpacity: 1,
                bufferOpacity: 0.35,
                linearGapWidth: 4,
                circularGapWidth: 4,
                linearTrackThickness: Browser.isDevice ? 4 : 2,
                linearProgressThickness: Browser.isDevice ? 4 : 2,
                circularTrackThickness: Browser.isDevice ? 2 : 2,
                circularProgressThickness: Browser.isDevice ? 2 : 2,
                tooltipFill: '#000000',
                tooltipLightLabel: '#FFFFFF',
                success: '#107C10',
                danger: '#C50F1F',
                warning: '#F7630C',
                info: '#0099BC',
                tooltipLabelFont: {
                    color: '#FFFFFF', fontFamily: 'Segoe UI', fontWeight: '400'
                },
                linearLabelFont: {
                    size: '12', fontWeight: '400', color: '#FFFFFF', fontStyle: 'Normal', fontFamily: 'Segoe UI'
                },
                circularLabelFont: {
                    size: '12', fontWeight: '400', color: '#FFFFFF', fontStyle: 'Normal', fontFamily: 'Segoe UI'
                }
            };
            break;
        case 'Material3':
            style = {
                linearTrackColor: '#E7E0EC',
                linearProgressColor: '#6750A4',
                circularTrackColor: '#E7E0EC',
                circularProgressColor: '#6750A4',
                backgroundColor: 'transparent',
                progressOpacity: 1,
                trackOpacity: 1,
                bufferOpacity: 0.24,
                linearGapWidth: 4,
                circularGapWidth: 4,
                linearTrackThickness: 4,
                linearProgressThickness: 4,
                circularTrackThickness: 4,
                circularProgressThickness: 4,
                tooltipFill: '#313033',
                tooltipLightLabel: '#F4EFF4',
                success: '#0B6A0B',
                danger: '#D13438',
                warning: '#CA5010',
                info: '#038387',
                tooltipLabelFont: {
                    size: '12px', fontWeight: '400', color: '#F4EFF4', fontStyle: 'Normal', fontFamily: 'Roboto'
                },
                linearLabelFont: {
                    size: '10', fontWeight: '400', color: '#FFFFFF', fontStyle: 'Normal', fontFamily: 'Roboto'
                },
                circularLabelFont: {
                    size: '12', fontWeight: '500', color: '#6750A4', fontStyle: 'Normal', fontFamily: 'Roboto'
                }
            };
            break;
        case 'Material3Dark':
            style = {
                linearTrackColor: '#49454F',
                linearProgressColor: '#D0BCFF',
                circularTrackColor: '#49454F',
                circularProgressColor: '#D0BCFF',
                backgroundColor: 'transparent',
                progressOpacity: 1,
                trackOpacity: 1,
                bufferOpacity: 0.24,
                linearGapWidth: 4,
                circularGapWidth: 4,
                linearTrackThickness: 4,
                linearProgressThickness: 4,
                circularTrackThickness: 4,
                circularProgressThickness: 4,
                tooltipFill: '#E6E1E5',
                tooltipLightLabel: '#313033',
                success: '#0B6A0B',
                danger: '#D13438',
                warning: '#CA5010',
                info: '#038387',
                tooltipLabelFont: {
                    color: '#313033', fontFamily: 'roboto', fontWeight: '400'
                },
                linearLabelFont: {
                    size: '10', fontWeight: '400', color: '#371E73', fontStyle: 'Normal', fontFamily: 'Roboto'
                },
                circularLabelFont: {
                    size: '12', fontWeight: '500', color: '#D0BCFF', fontStyle: 'Normal', fontFamily: 'Roboto'
                }
            };
            break;
        default:
            style = {
                linearTrackColor: '#EAEAEA',
                linearProgressColor: '#0078D6',
                circularTrackColor: '#E6E6E6',
                circularProgressColor: '#0078D6',
                backgroundColor: 'transparent',
                progressOpacity: 1,
                trackOpacity: 1,
                bufferOpacity: 0.3,
                linearGapWidth: 2,
                circularGapWidth: 4,
                linearTrackThickness: 2,
                linearProgressThickness: 2,
                circularTrackThickness: 4,
                circularProgressThickness: 4,
                tooltipFill: '#ffffff',
                tooltipLightLabel: '#000000',
                success: '#166600',
                danger: '#b30900',
                warning: '#944000',
                info: '#0056b3',
                tooltipLabelFont: {
                    color: '#333333', fontFamily: 'Segoe UI', fontWeight: '400'
                },
                linearLabelFont: {
                    size: '10', fontWeight: '400', color: null, fontStyle: 'Normal', fontFamily: 'Segoe UI'
                },
                circularLabelFont: {
                    size: '12', fontWeight: '500', color: null, fontStyle: 'Normal', fontFamily: 'Segoe UI'
                }
            };
            break;
    }
    return style;
}

/**
 * corner Radius
 */
var lineCapRadius = 0.9;
/**
 * complete Angle
 */
var completeAngle = 359.99;
/**
 * valueChanged event
 */
var valueChanged = 'valueChanged';
/**
 * progressCompleted event
 */
var progressCompleted = 'progressCompleted';
/**
 * mouseClick event
 */
var mouseClick = 'mouseClick';
/**
 * mouseDown event
 */
var mouseDown = 'mouseDown';
/**
 * mouseUp event
 */
var mouseUp = 'mouseUp';
/**
 * mouseMove event
 */
var mouseMove = 'mouseMove';
/**
 * mouseLeave event
 */
var mouseLeave = 'mouseLeave';
/**
 * svgLink
 */
var svgLink = 'http://www.w3.org/2000/svg';
/**
 * gradient type
 */
var gradientType = 'linearGradient';
/**
 * stop element
 */
var stopElement = 'stop';
/**
 * Render for the tooltip.
 */
var tooltipRender = 'tooltipRender';

/**
 * Base file for annotation
 */
var AnnotationBase = /** @class */ (function () {
    /**
     * Constructor for progress annotation
     *
     * @param {ProgressBar} control It called constructor
     */
    function AnnotationBase(control) {
        this.control = control;
    }
    AnnotationBase.prototype.render = function (annotation, index) {
        this.annotation = annotation;
        var childElement = createElement('div', {
            id: this.control.element.id + 'Annotation' + index,
            styles: 'position:absolute;z-index:1', innerHTML: annotation.content
        });
        return childElement;
    };
    /**
     * To process the annotation
     *
     * @param {ProgressAnnotationSettings} annotation One of the parameter called annotation
     * @param {number} index Index of the annotation
     * @param {HTMLElement} parentElement Parent element of the annotation
     * @returns {void}
     */
    AnnotationBase.prototype.processAnnotation = function (annotation, index, parentElement) {
        var location = new ProgressLocation(0, 0);
        var annotationElement = this.render(annotation, index);
        if (annotationElement) {
            this.setElementStyle(location, annotationElement, parentElement);
        }
        else if (this.control.redraw) {
            removeElement(annotationElement.id);
            if (this.control.isReact) {
                this.control.clearTemplate();
            }
        }
    };
    AnnotationBase.prototype.setElementStyle = function (location, element, parentElement) {
        var argsData = {
            cancel: false, name: annotationRender, content: element,
            location: location
        };
        this.control.trigger(annotationRender, argsData);
        if (!argsData.cancel) {
            var result = this.Location(this.annotation.annotationRadius, this.annotation.annotationAngle);
            argsData.content.style.left = result.left + 'px';
            argsData.content.style.top = result.top + 'px';
            argsData.content.style.transform = 'translate(-50%, -50%)';
            argsData.content.setAttribute('aria-label', 'Annotation');
            parentElement.appendChild(argsData.content);
            if (this.control.isReact) {
                this.control.renderReactTemplates();
            }
        }
    };
    AnnotationBase.prototype.Location = function (radius, angle) {
        var top;
        var left;
        var radius1 = parseFloat(radius);
        if (radius1 === 0 && angle === 0) {
            var rect = this.control.progressRect;
            left = rect.x + (rect.width / 2);
            top = rect.y + (rect.height / 2);
        }
        else {
            var degToRadFactor = Math.PI / 180;
            angle = angle - 90;
            angle = angle * degToRadFactor;
            var x = Math.round(this.control.progressSize.width / 2.25);
            var y = Math.round(this.control.progressSize.height / 2.25);
            left = (radius1 * Math.cos(angle)) + x;
            top = (radius1 * Math.sin(angle)) + y;
        }
        return {
            top: top, left: left
        };
    };
    return AnnotationBase;
}());

/**
 * Animation for progress bar
 */
var ProgressAnimation = /** @class */ (function () {
    function ProgressAnimation() {
    }
    /**
     * Performs linear animation on the specified element.
     *
     * @param {Element} element - The HTML element to animate.
     * @param {ProgressBar} progress - The progress bar control.
     * @param {number} delay - The delay before starting the animation, in milliseconds.
     * @param {number} previousWidth - The previous width of the progress.
     * @param {Element} active - The active element to control the animation.
     * @returns {void}
     */
    ProgressAnimation.prototype.doLinearAnimation = function (element, progress, delay, previousWidth, active) {
        var _this = this;
        var animation = new Animation$1({});
        var linearPath = element;
        var duration = (progress.isActive) ? 3000 : progress.animation.duration;
        var width = linearPath.getAttribute('width');
        var x = linearPath.getAttribute('x');
        var opacityValue = 0;
        var value = 0;
        var start = (!progress.enableRtl || (progress.cornerRadius === 'Round4px')) ? previousWidth : parseInt(x, 10);
        var end = (!progress.enableRtl || (progress.cornerRadius === 'Round4px')) ? parseInt(width, 10) - start :
            parseInt(width, 10) - previousWidth;
        var rtlX = parseInt(x, 10) - end;
        linearPath.style.visibility = 'hidden';
        animation.animate(linearPath, {
            duration: (progress.animation.duration === 0 && animationMode === 'Enable') ? 2000 : duration,
            delay: delay,
            progress: function (args) {
                progress.cancelResize = true;
                if (progress.enableRtl && !(progress.cornerRadius === 'Round4px')) {
                    if (args.timeStamp >= args.delay) {
                        linearPath.style.visibility = 'visible';
                        if (progress.isActive) {
                            value = _this.activeAnimate((args.timeStamp / args.duration), parseInt(x, 10), parseInt(width, 10), true);
                            opacityValue = effect(args.timeStamp, 0.5, 0.5, args.duration, true);
                            active.setAttribute('opacity', opacityValue.toString());
                            linearPath.setAttribute('x', value.toString());
                        }
                        else {
                            value = effect(args.timeStamp, start, end, args.duration, true);
                            linearPath.setAttribute('x', value.toString());
                        }
                    }
                }
                else {
                    if (args.timeStamp >= args.delay) {
                        linearPath.style.visibility = 'visible';
                        if (progress.isActive) {
                            value = _this.activeAnimate((args.timeStamp / args.duration), 0, parseInt(width, 10), false);
                            opacityValue = effect(args.timeStamp, 0.5, 0.5, args.duration, true);
                            active.setAttribute('opacity', opacityValue.toString());
                            linearPath.setAttribute('width', value.toString());
                        }
                        else {
                            value = effect(args.timeStamp, start, end, args.duration, false);
                            linearPath.setAttribute('width', value.toString());
                        }
                    }
                }
            },
            end: function () {
                progress.cancelResize = false;
                linearPath.style.visibility = '';
                if (progress.enableRtl && !(progress.cornerRadius === 'Round4px')) {
                    if (progress.isActive) {
                        linearPath.setAttribute('x', x.toString());
                        _this.doLinearAnimation(element, progress, delay, previousWidth, active);
                    }
                    else {
                        linearPath.setAttribute('x', rtlX.toString());
                    }
                }
                else {
                    linearPath.setAttribute('width', width);
                    if (progress.isActive) {
                        _this.doLinearAnimation(element, progress, delay, previousWidth, active);
                    }
                }
                progress.trigger('animationComplete', {
                    value: progress.value, trackColor: progress.trackColor,
                    progressColor: progress.progressColor
                });
            }
        });
    };
    /**
     * Initiates linear animation for an indeterminate progress bar.
     *
     * @param {Element} element - The HTML element representing the progress bar.
     * @param {number} progressWidth - The width of the progress bar.
     * @param {number} thickness - The thickness of the progress bar.
     * @param {ProgressBar} progress - The progress bar control.
     * @param {Element} clipPath - The SVG clip path element to control the animation.
     * @returns {void}
     */
    ProgressAnimation.prototype.doLinearIndeterminate = function (element, progressWidth, thickness, progress, clipPath) {
        var _this = this;
        var animation = new Animation$1({});
        var linearPath = element;
        var x = linearPath.getAttribute('x');
        var width = linearPath.getAttribute('width');
        var value = 0;
        var start = (width) ? -(parseInt(width, 10)) : -progressWidth;
        var end = (progress.progressRect.x + progress.progressRect.width) + ((width) ? (parseInt(width, 10)) : progressWidth);
        var duration = (!progress.enableProgressSegments) ? progress.animation.duration : progress.animation.duration + 1000;
        animation.animate(clipPath, {
            duration: (progress.animation.duration === 0 && animationMode === 'Enable') ? 2000 : duration,
            delay: 0,
            progress: function (args) {
                if (progress.enableRtl && !(progress.cornerRadius === 'Round4px')) {
                    value = effect(args.timeStamp, parseInt(x, 10) || progress.progressRect.x + progressWidth, end, args.duration, true);
                    if (!progress.enableProgressSegments) {
                        linearPath.setAttribute('x', value.toString());
                    }
                    else {
                        linearPath.setAttribute('d', progress.getPathLine(value, progressWidth, thickness));
                    }
                }
                else {
                    value = effect(args.timeStamp, start, end, args.duration, false);
                    if (!progress.enableProgressSegments) {
                        linearPath.setAttribute('x', value.toString());
                    }
                    else {
                        linearPath.setAttribute('d', progress.getPathLine(value, progressWidth, thickness));
                    }
                }
            },
            end: function () {
                if (progress.enableRtl && !progress.enableProgressSegments && !(progress.cornerRadius === 'Round4px')) {
                    linearPath.setAttribute('x', x.toString());
                }
                else if (!progress.enableProgressSegments) {
                    linearPath.setAttribute('x', start.toString());
                }
                if (!progress.destroyIndeterminate) {
                    _this.doLinearIndeterminate(element, progressWidth, thickness, progress, clipPath);
                }
            }
        });
    };
    /**
     * Performs striped animation on the specified element.
     *
     * @param {Element} element - The HTML element to animate.
     * @param {ProgressBar} progress - The progress bar object.
     * @param {number} value - The value indicating the progress of the animation.
     * @returns {void}
     */
    ProgressAnimation.prototype.doStripedAnimation = function (element, progress, value) {
        var _this = this;
        var animation = new Animation$1({});
        var point = 1000 / progress.animation.duration;
        animation.animate(element, {
            duration: (progress.animation.duration === 0 && animationMode === 'Enable') ? 2000 : progress.animation.duration,
            delay: progress.animation.delay,
            progress: function () {
                value += (progress.enableRtl) ? -point : point;
                element.setAttribute('gradientTransform', 'translate(' + value + ') rotate(-45)');
            },
            end: function () {
                if (!progress.destroyIndeterminate) {
                    _this.doStripedAnimation(element, progress, value);
                }
            }
        });
    };
    /**
     * Initiates circular animation on the specified element.
     *
     * @param {number} x - The x-coordinate of the center of the circle.
     * @param {number} y - The y-coordinate of the center of the circle.
     * @param {number} radius - The radius of the circle.
     * @param {number} progressEnd - The end value of the progress.
     * @param {number} totalEnd - The total end value of the progress.
     * @param {Element} element - The HTML element representing the circular progress.
     * @param {ProgressBar} progress - The progress bar control.
     * @param {number} thickness - The thickness of the circular progress.
     * @param {number} delay - The delay before starting the animation, in milliseconds.
     * @param {number} startValue - The starting value of the progress.
     * @param {number} previousTotal - The previous total value of the progress.
     * @param {Element} active - The active element to control the animation.
     * @returns {void}
     */
    ProgressAnimation.prototype.doCircularAnimation = function (x, y, radius, progressEnd, totalEnd, element, progress, thickness, delay, startValue, previousTotal, active) {
        var _this = this;
        var animation = new Animation$1({});
        var circularPath = element;
        var start = progress.startAngle;
        var pathRadius = radius + (thickness / 2);
        var end = 0;
        var opacityValue = 0;
        var duration = (progress.isActive) ? 3000 : progress.animation.duration;
        start += (progress.cornerRadius === 'Round' && totalEnd !== completeAngle && totalEnd !== 0) ?
            ((progress.enableRtl) ? (lineCapRadius / 2) * thickness : -(lineCapRadius / 2) * thickness) : 0;
        totalEnd += (progress.cornerRadius === 'Round' && totalEnd !== completeAngle && totalEnd !== 0) ?
            (lineCapRadius / 2) * thickness : 0;
        progressEnd += (progress.cornerRadius === 'Round' && totalEnd !== completeAngle && totalEnd !== 0) ?
            ((progress.enableRtl) ? -(lineCapRadius / 2) * thickness : (lineCapRadius / 2) * thickness) : 0;
        if (progress.cornerRadius === 'Round' && totalEnd !== completeAngle && totalEnd !== 0 && progress.startAngle === progress.endAngle) {
            var startPosition = degreeToLocation(x, y, pathRadius, start).x;
            var endPosition = degreeToLocation(x, y, pathRadius, progressEnd).x;
            while (((progress.enableRtl !== progress.startAngle >= 180) ? endPosition <= startPosition : endPosition >= startPosition)) {
                progressEnd += (progress.enableRtl ? 0.1 : -0.1);
                endPosition = degreeToLocation(x, y, pathRadius, progressEnd).x;
            }
        }
        var startPos = (!isNullOrUndefined(startValue)) ? startValue : start;
        var endPos = (!isNullOrUndefined(startValue)) ? totalEnd - previousTotal : totalEnd;
        circularPath.setAttribute('visibility', 'Hidden');
        animation.animate(circularPath, {
            duration: (progress.animation.duration === 0 && animationMode === 'Enable') ? 2000 : duration,
            delay: delay,
            progress: function (args) {
                progress.cancelResize = true;
                if (args.timeStamp >= args.delay) {
                    circularPath.setAttribute('visibility', 'visible');
                    if (progress.isActive) {
                        end = _this.activeAnimate((args.timeStamp / args.duration), startPos, endPos, progress.enableRtl);
                        opacityValue = effect(args.timeStamp, 0.5, 0.5, args.duration, true);
                        active.setAttribute('opacity', opacityValue.toString());
                        circularPath.setAttribute('d', getPathArc(x, y, pathRadius, start, end % 360, progress.enableRtl, true));
                    }
                    else {
                        end = effect(args.timeStamp, startPos, endPos, args.duration, progress.enableRtl);
                        circularPath.setAttribute('d', getPathArc(x, y, pathRadius, start, end % 360, progress.enableRtl, true));
                    }
                }
            },
            end: function () {
                progress.cancelResize = false;
                circularPath.setAttribute('visibility', '');
                circularPath.setAttribute('d', getPathArc(x, y, pathRadius, start, progressEnd, progress.enableRtl, true));
                if (progress.isActive) {
                    _this.doCircularAnimation(x, y, radius, progressEnd, totalEnd, element, progress, thickness, delay, startValue, previousTotal, active);
                }
                progress.trigger('animationComplete', {
                    value: progress.value, trackColor: progress.trackColor,
                    progressColor: progress.progressColor
                });
            }
        });
    };
    /**
     * Initiates circular animation for an indeterminate progress bar.
     *
     * @param {Element} circularProgress - The HTML element representing the circular progress bar.
     * @param {ProgressBar} progress - The progress bar object.
     * @param {number} start - The starting value of the progress.
     * @param {number} end - The ending value of the progress.
     * @param {number} x - The x-coordinate of the center of the circle.
     * @param {number} y - The y-coordinate of the center of the circle.
     * @param {number} radius - The radius of the circle.
     * @param {number} thickness - The thickness of the circular progress bar.
     * @param {Element} clipPath - The SVG clip path element to control the animation.
     * @returns {void}
     */
    ProgressAnimation.prototype.doCircularIndeterminate = function (circularProgress, progress, start, end, x, y, radius, thickness, clipPath) {
        var _this = this;
        var animation = new Animation$1({});
        var pathRadius = radius + ((!progress.enableProgressSegments) ? (thickness / 2) : 0);
        var duration = (progress.animation.duration === 0 && animationMode === 'Enable') ? 2000 : progress.animation.duration;
        var value = (!progress.enableProgressSegments) ? 6000 / duration : 4000 / duration;
        animation.animate(clipPath, {
            progress: function () {
                circularProgress.style.visibility = 'visible';
                start += (progress.enableRtl) ? -value : value;
                end += (progress.enableRtl) ? -value : value;
                circularProgress.setAttribute('d', getPathArc(x, y, pathRadius, start % 360, end % 360, progress.enableRtl, !progress.enableProgressSegments));
            },
            end: function () {
                if (!progress.destroyIndeterminate) {
                    _this.doCircularIndeterminate(circularProgress, progress, start, end, x, y, radius, thickness, clipPath);
                }
            }
        });
    };
    /**
     * Initiates label animation for a progress bar.
     *
     * @param {Element} labelPath - The SVG path element representing the label.
     * @param {number} start - The starting value of the progress.
     * @param {number} end - The ending value of the progress.
     * @param {ProgressBar} progress - The progress bar control.
     * @param {number} delay - The delay before starting the animation, in milliseconds.
     * @param {number} textSize - The size of the text.
     * @returns {void}
     */
    ProgressAnimation.prototype.doLabelAnimation = function (labelPath, start, end, progress, delay, textSize) {
        var animation = new Animation$1({});
        var label = new Animation$1({});
        var startPos;
        var endPos;
        var text = labelPath.innerHTML;
        var value = 0;
        var xPos = 0;
        var valueChanged = 0;
        var percentage = 100;
        var labelText = progress.labelStyle.text;
        var labelPos = progress.labelStyle.textAlignment;
        var posX = parseInt(labelPath.getAttribute('x'), 10);
        labelPath.setAttribute('visibility', 'Hidden');
        if (progress.type === 'Linear') {
            startPos = (progress.enableRtl) ? (progress.progressRect.x + progress.progressRect.width) + (textSize / 2) :
                start - (textSize / 2);
            startPos = (startPos <= 0) ? 0 : startPos;
            endPos = (progress.enableRtl) ? startPos - posX : posX - startPos;
        }
        animation.animate(labelPath, {
            duration: (progress.animation.duration === 0 && animationMode === 'Enable') ? 2000 : progress.animation.duration,
            delay: delay,
            progress: function (args) {
                progress.cancelResize = true;
                args.name = 'SlideRight';
                if (progress.type === 'Linear') {
                    if (args.timeStamp >= args.delay) {
                        if (labelText === '') {
                            labelPath.setAttribute('visibility', 'visible');
                            value = effect(args.timeStamp, start, end, args.duration, false);
                            valueChanged = parseInt((((Math.round(value)) / progress.progressRect.width) * percentage).toString(), 10);
                            labelPath.innerHTML = valueChanged.toString() + '%';
                            if (labelPos === 'Far' || labelPos === 'Center') {
                                xPos = effect(args.timeStamp, startPos, endPos, args.duration, progress.enableRtl);
                                labelPath.setAttribute('x', xPos.toString());
                            }
                        }
                    }
                }
                else if (progress.type === 'Circular') {
                    if (labelText === '') {
                        labelPath.setAttribute('visibility', 'visible');
                        value = effect(args.timeStamp, start, end - start, args.duration, false);
                        valueChanged = parseInt((((Math.round(value)) / progress.totalAngle) * percentage).toString(), 10);
                        labelPath.innerHTML = valueChanged.toString() + '%';
                    }
                }
            },
            end: function () {
                progress.cancelResize = false;
                if (labelText === '') {
                    labelPath.innerHTML = text;
                    labelPath.setAttribute('x', posX.toString());
                }
                else {
                    label.animate(labelPath, {
                        progress: function (args) {
                            labelPath.setAttribute('visibility', 'visible');
                            value = effect(args.timeStamp, 0, 1, args.duration, false);
                            labelPath.setAttribute('opacity', value.toString());
                        },
                        end: function () {
                            labelPath.setAttribute('opacity', '1');
                        }
                    });
                }
            }
        });
    };
    /**
     * Initiates annotation animation for a circular progress bar.
     *
     * @param {Element} circularPath - The SVG path element representing the circular progress bar.
     * @param {ProgressBar} progress - The progress bar object.
     * @param {number} previousEnd - The previous end value of the progress.
     * @param {number} previousTotal - The previous total value of the progress.
     * @returns {void}
     */
    ProgressAnimation.prototype.doAnnotationAnimation = function (circularPath, progress, previousEnd, previousTotal) {
        var animation = new Animation$1({});
        var value = 0;
        var percentage = 100;
        var isAnnotation = progress.annotations.length > 0;
        var annotatElementChanged;
        var firstAnnotatElement;
        var start = progress.startAngle;
        var totalAngle = progress.totalAngle;
        var totalEnd;
        var annotateValueChanged;
        var annotateValue;
        if (isAnnotation && progress.progressAnnotationModule) {
            firstAnnotatElement = document.getElementById(progress.element.id + 'Annotation0').children[0];
            if (firstAnnotatElement && firstAnnotatElement.children[0]) {
                if (firstAnnotatElement.children[0].tagName === 'SPAN') {
                    annotatElementChanged = firstAnnotatElement.children[0];
                }
            }
        }
        totalEnd = ((progress.argsData.value - progress.minimum) / (progress.maximum - progress.minimum)) * progress.totalAngle;
        progress.annotateTotal = totalEnd =
            (progress.argsData.value < progress.minimum) ? 0 : totalEnd;
        progress.annotateEnd = start + totalEnd;
        annotateValue = ((progress.argsData.value - progress.minimum) / (progress.maximum - progress.minimum)) * percentage;
        annotateValue = (progress.argsData.value < progress.minimum) ? 0 :
            Math.round(annotateValue);
        var startValue = (!isNullOrUndefined(previousEnd)) ? previousEnd : start;
        var endValue = (!isNullOrUndefined(previousEnd)) ? totalEnd - previousTotal : totalEnd;
        if (progress.argsData.value <= progress.minimum) {
            annotatElementChanged.innerHTML = annotateValue + '%';
        }
        else {
            animation.animate(circularPath, {
                duration: (progress.animation.duration === 0 && animationMode === 'Enable') ? 2000 : progress.animation.duration,
                delay: progress.animation.delay,
                progress: function (args) {
                    progress.cancelResize = true;
                    if (isAnnotation && annotatElementChanged) {
                        value = effect(args.timeStamp, startValue, endValue, args.duration, false);
                        annotateValueChanged = parseInt((((Math.round(value) - start) / totalAngle) * percentage).toString(), 10);
                        annotatElementChanged.innerHTML = annotateValueChanged ? annotateValueChanged.toString() + '%' : '0%';
                    }
                },
                end: function () {
                    progress.cancelResize = false;
                    annotatElementChanged.innerHTML = annotateValue + '%';
                }
            });
        }
    };
    ProgressAnimation.prototype.activeAnimate = function (t, start, end, enableRtl) {
        var time = 1 - Math.pow(1 - t, 3);
        var attrValue = start + ((!enableRtl) ? (time * end) : -(time * end));
        return attrValue;
    };
    return ProgressAnimation;
}());

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
/**
 * Class for progress annotation
 */
var ProgressAnnotation = /** @class */ (function (_super) {
    __extends$2(ProgressAnnotation, _super);
    /**
     * Constructor for ProgressBar annotation
     *
     * @private
     * @param {ProgressBar} control Passed the control
     * @param {annotations} annotations ProgressAnnotationSettings
     */
    function ProgressAnnotation(control, annotations) {
        var _this = _super.call(this, control) || this;
        _this.animation = new ProgressAnimation();
        _this.progress = control;
        _this.annotations = annotations;
        return _this;
    }
    /**
     * Method to render the annotation for ProgressBar
     *
     * @param {Element} element Annotation element.
     * @returns {void}
     * @private
     */
    ProgressAnnotation.prototype.renderAnnotations = function (element) {
        var _this = this;
        this.annotations = this.progress.annotations;
        var parentElement = document.getElementById(this.progress.element.id + 'Annotation_collections');
        this.parentElement = parentElement ? parentElement : createElement('div', {
            id: this.progress.element.id + 'Annotation_collections',
            styles: 'position:absolute'
        });
        this.annotations.map(function (annotation, index) {
            _this.processAnnotation(annotation, index, _this.parentElement);
        });
        if (!parentElement) {
            element.appendChild(this.parentElement);
        }
        if (this.progress.animation.enable && !this.progress.isIndeterminate) {
            this.animation.doAnnotationAnimation(this.progress.clipPath, this.progress);
        }
    };
    /**
     * Get module name.
     *
     * @returns {string} - Returns the module name.
     */
    ProgressAnnotation.prototype.getModuleName = function () {
        return 'ProgressAnnotation';
    };
    /**
     * To destroy the annotation.
     *
     * @returns {void}
     * @private
     */
    ProgressAnnotation.prototype.destroy = function () {
        // Destroy method performed here
    };
    return ProgressAnnotation;
}(AnnotationBase));

/**
 * class for tooltip.
 */
var ProgressTooltip = /** @class */ (function () {
    /**
     * Constructor for progress tooltip.
     *
     * @param {ProgressBar} control
     */
    function ProgressTooltip(control) {
        // Defines text collection passed to svg tooltip.
        this.text = [];
        // Defines the previous left value of tooltip.
        this.previousPosition = 0;
        this.control = control;
    }
    /**
     * Method to render the tooltip for progress bar.
     */
    ProgressTooltip.prototype.tooltip = function (e) {
        var svgElement = document.getElementById(this.control.element.id + '_tooltip');
        var isTooltip = (svgElement && parseInt(svgElement.getAttribute('opacity'), 10) > 0);
        this.previousPosition = svgElement.style.left ? parseInt(svgElement.style.left, 10) : 0;
        this.renderTooltip(e, this.control, !isTooltip);
        if (this.control.tooltip.enable && this.control.type === 'Circular' && this.control.animation.enable && !(this.control.tooltip.showTooltipOnHover)) {
            svgElement.style.visibility = 'hidden';
            var delay = this.control.secondaryProgress ? this.control.circular.delay + this.control.animation.duration :
                this.control.animation.duration;
            this.tooltipDelay(this.control, svgElement, delay);
        }
        if (this.control.animation.enable && !(this.control.tooltip.showTooltipOnHover) && !(this.control.type === 'Circular')) {
            var delay = this.control.secondaryProgress ? this.control.linear.delay : this.control.animation.delay;
            if (this.control.secondaryProgress) {
                svgElement.style.visibility = 'hidden';
            }
            this.toolTipAnimation(svgElement, this.control, delay);
        }
    };
    /**
     * Function to delay tooltip at initial stage of circular progress.
     */
    ProgressTooltip.prototype.tooltipDelay = function (progress, element, delay) {
        var animation = new Animation$1({});
        animation.animate(element, {
            duration: progress.animation.duration,
            delay: delay,
            progress: function (args) {
                args.element.style.visibility = 'visible';
            }
        });
    };
    /**
     * Function to animate tooltip.
     */
    ProgressTooltip.prototype.toolTipAnimation = function (element, progress, delay) {
        var _this = this;
        var animation = new Animation$1({});
        var endValue = parseInt(element.style.left, 10);
        var tooltipSVG = document.getElementById(this.control.element.id + '_tooltip_svg');
        var width = parseInt(tooltipSVG.getAttribute('width'), 10);
        animation.animate(element, {
            duration: progress.animation.duration,
            delay: delay,
            progress: function (args) {
                progress.cancelResize = true;
                args.name = 'SlideRight';
                if (progress.type === 'Linear') {
                    if (args.timeStamp >= args.delay) {
                        args.element.style.visibility = 'visible';
                        var start = _this.previousPosition ? _this.previousPosition :
                            (0 - (width / 2 - _this.control.progressRect.x - 5));
                        var end = _this.previousPosition ? endValue - start :
                            endValue + (width / 2 - _this.control.progressRect.x - 5);
                        var value = effect(args.timeStamp, start, end, args.duration, progress.enableRtl);
                        args.element.style.left = '';
                        args.element.style.left = value + 'px'.toString();
                    }
                }
            },
            end: function (args) {
                progress.cancelResize = false;
                args.element.style.left = '';
                args.element.style.left = endValue + 'px'.toString();
            }
        });
    };
    ProgressTooltip.prototype.renderTooltip = function (e, chart, isFirst) {
        this.textFormat = this.format((this.control.tooltip.showTooltipOnHover) ? e.target.id.indexOf('Linearbuffer') >= 0 || e.target.id.indexOf('Circularbuffer') >= 0 ? this.control.secondaryProgress : this.control.value : this.control.value);
        this.triggerTooltipRender(e, isFirst, this.textFormat);
    };
    /**
     * Function to get format of tooltip text.
     */
    ProgressTooltip.prototype.format = function (formatValue) {
        var currentFormat = formatValue.toString();
        var value;
        if (this.control.tooltip.format) {
            currentFormat = this.control.tooltip.format;
            value = new RegExp('${value' + '}', 'gm');
            currentFormat = currentFormat.replace(value.source, formatValue.toString());
        }
        return currentFormat;
    };
    /**
     * Function to remove tooltip.
     */
    ProgressTooltip.prototype.removeTooltip = function (duration) {
        var _this = this;
        var tooltipElement = document.getElementById(this.control.element.id + '_tooltip');
        if (tooltipElement) {
            this.fadeInInterval = +setTimeout(function () {
                if (_this.svgTooltip) {
                    _this.svgTooltip.fadeOut();
                }
            }, duration);
        }
    };
    /**
     * Function to get arguments of tooltip.
     */
    ProgressTooltip.prototype.triggerTooltipRender = function (e, isFirst, textCollection) {
        var padding = 5;
        var argsData = {
            cancel: false, name: tooltipRender, text: textCollection + '%'
        };
        this.control.trigger(tooltipRender, argsData);
        textCollection = argsData.text;
        if (!argsData.cancel) {
            this.text = [].concat(argsData.text);
            if (this.control.type === 'Linear') {
                var linearEndPointX = (this.control.linear.linearProgressWidth - padding / 2 + (this.control.progressRect.x));
                var linearEndPointY = (this.control.cornerRadius === 'Round4px') ? (this.control.progressRect.y + padding) : (this.control.progressRect.y + (this.control.progressRect.height / 2)) -
                    (this.control.progressThickness ? this.control.progressThickness : this.control.themeStyle.linearProgressThickness) / 2 +
                    padding;
                this.createTooltip(this.control, isFirst, (this.control.tooltip.enable && !this.control.tooltip.showTooltipOnHover || !(e.target.id.indexOf('Linearbuffer') >= 0)) ? (new ProgressLocation((this.control.cornerRadius === 'Round4px') ? linearEndPointX - padding : linearEndPointX, linearEndPointY)) : (new ProgressLocation(this.control.linear.bufferWidth - (padding / 2) + (this.control.progressRect.x), linearEndPointY)), this.control.initialClipRect);
            }
            else {
                var circularEndPointX = this.control.circular.endPosition.x - padding / 2;
                var circularEndPointY = this.control.circular.endPosition.y + this.control.progressRect.y - padding / 2;
                this.createTooltip(this.control, isFirst, (this.control.tooltip.enable && !this.control.tooltip.showTooltipOnHover || !(e.target.id.indexOf('Circularbuffer') >= 0)) ? (new ProgressLocation(circularEndPointX, circularEndPointY)) : (new ProgressLocation(this.control.circular.bufferEndPosition.x - padding / 2, this.control.circular.bufferEndPosition.y + this.control.progressRect.y - padding / 2)), this.control.initialClipRect);
            }
        }
        this.isRendered = true;
    };
    /**
     * Function to pass arguments into svg tooltip.
     *
     * @param {ProgressBar} chart - The progress bar chart for which the tooltip is being created.
     * @param {boolean} isFirst - A flag indicating whether this is the first tooltip.
     * @param {ProgressLocation} location - The location where the tooltip should be displayed.
     * @param {ProgressLocation} bounds - The bounds within which the tooltip should be confined.
     * @returns {void}
     * @private
     */
    ProgressTooltip.prototype.createTooltip = function (chart, isFirst, location, bounds) {
        var tooltipFont = extend({}, this.control.tooltip.textStyle, null, true);
        tooltipFont.fontWeight = tooltipFont.fontWeight || this.control.themeStyle.tooltipLabelFont.fontWeight;
        if (isFirst) {
            this.svgTooltip = new Tooltip({
                opacity: this.control.tooltip.textStyle.opacity ? this.control.tooltip.textStyle.opacity : ((this.control.theme === 'Material3' || this.control.theme === 'Material3Dark' || this.control.theme.indexOf('Bootstrap5') > -1) ? 1 : 0.75),
                header: '',
                content: this.text,
                fill: this.control.tooltip.fill,
                border: this.control.tooltip.border,
                enableAnimation: true,
                location: location,
                theme: this.control.theme,
                areaBounds: bounds,
                template: null,
                // To set tooltip location.
                offset: 7.5,
                // To set left and right margin of tooltip.
                marginX: 8,
                // To set top margin of tooltip.
                marginY: 4.5,
                textStyle: tooltipFont,
                arrowPadding: 7,
                availableSize: this.control.progressSize,
                duration: 300,
                blazorTemplate: { name: 'Template', parent: this.control.tooltip },
                controlInstance: this.control,
                enableRTL: chart.enableRtl,
                controlName: 'Progressbar'
            }, '#' + this.control.element.id + '_tooltip');
        }
        else {
            if (this.svgTooltip) {
                this.svgTooltip.location = location;
                this.svgTooltip.content = this.text;
                this.svgTooltip.header = '';
                this.svgTooltip.offset = 7.5;
                this.svgTooltip.textStyle = tooltipFont;
                this.svgTooltip.areaBounds = bounds;
                this.svgTooltip.arrowPadding = 7;
                this.svgTooltip.dataBind();
            }
        }
    };
    /**
     * Get module name.
     */
    ProgressTooltip.prototype.getModuleName = function () {
        return 'ProgressTooltip';
    };
    /**
     * To destroy the annotation.
     *
     * @returns {void}
     * @private
     */
    ProgressTooltip.prototype.destroy = function () {
        // Destroy method performed here
    };
    return ProgressTooltip;
}());

/**
 * Progressbar Segment
 */
var Segment = /** @class */ (function () {
    function Segment() {
    }
    /**
     * Creates a linear segment element for the progress bar.
     *
     * @param {ProgressBar} progress - The progress bar control.
     * @param {string} id - The id of the segment element.
     * @param {number} width - The width of the segment.
     * @param {number} opacity - The opacity of the segment.
     * @param {number} thickness - The thickness of the segment.
     * @param {number} progressWidth - The width of the progress.
     * @returns {Element} - The created linear segment element.
     */
    Segment.prototype.createLinearSegment = function (progress, id, width, opacity, thickness, progressWidth) {
        var locX = (progress.enableRtl) ? ((progress.cornerRadius === 'Round') ?
            (progress.progressRect.x + progress.progressRect.width) - ((lineCapRadius / 2) * thickness) :
            (progress.progressRect.x + progress.progressRect.width)) :
            ((progress.cornerRadius === 'Round') ? (progress.progressRect.x + (lineCapRadius / 2) * thickness) : progress.progressRect.x);
        var locY = (progress.progressRect.y + (progress.progressRect.height / 2));
        var gapWidth = (progress.gapWidth || progress.themeStyle.linearGapWidth);
        var avlWidth = progressWidth / progress.segmentCount;
        var avlSegWidth = (progressWidth - ((progress.segmentCount - 1) * gapWidth));
        avlSegWidth = (avlSegWidth -
            ((progress.cornerRadius === 'Round') ? progress.segmentCount * (lineCapRadius * thickness) : 0)) / progress.segmentCount;
        var gap = (progress.cornerRadius === 'Round') ? (gapWidth + (lineCapRadius * thickness)) : gapWidth;
        var segmentGroup = progress.renderer.createGroup({ 'id': progress.element.id + id });
        var count = Math.ceil(width / avlWidth);
        var segWidth;
        var color;
        var j = 0;
        var option;
        var segmentPath;
        var tolWidth = (progress.cornerRadius === 'Round') ? (width - (lineCapRadius * thickness)) : width;
        var linearThickness = progress.progressThickness || progress.themeStyle.linearProgressThickness;
        for (var i = 0; i < count; i++) {
            segWidth = (tolWidth < avlSegWidth) ? tolWidth : avlSegWidth;
            if (j < progress.segmentColor.length) {
                color = progress.segmentColor[j];
                j++;
            }
            else {
                j = 0;
                color = progress.segmentColor[j];
                j++;
            }
            option = new PathOption(progress.element.id + id + i, 'none', linearThickness, color, opacity, '0', this.getLinearSegmentPath(locX, locY, segWidth, progress.enableRtl));
            segmentPath = progress.renderer.drawPath(option);
            if (progress.cornerRadius === 'Round') {
                segmentPath.setAttribute('stroke-linecap', 'round');
            }
            segmentGroup.appendChild(segmentPath);
            locX += (progress.enableRtl) ? -avlSegWidth - gap : avlSegWidth + gap;
            tolWidth -= avlSegWidth + gap;
            tolWidth = (tolWidth < 0) ? 0 : tolWidth;
        }
        return segmentGroup;
    };
    Segment.prototype.getLinearSegmentPath = function (x, y, width, enableRtl) {
        return 'M' + ' ' + x + ' ' + y + ' ' + 'L' + (x + ((enableRtl) ? -width : width)) + ' ' + y;
    };
    /**
     * Creates a circular segment element for the progress bar.
     *
     * @param {ProgressBar} progress - The progress bar control.
     * @param {string} id - The id of the segment element.
     * @param {number} x - The x-coordinate of the center of the circle.
     * @param {number} y - The y-coordinate of the center of the circle.
     * @param {number} r - The radius of the circle.
     * @param {number} value - The value determining the angle of the segment.
     * @param {number} opacity - The opacity of the segment.
     * @param {number} thickness - The thickness of the segment.
     * @param {number} totalAngle - The total angle covered by the progress.
     * @param {number} progressWidth - The width of the progress.
     * @returns {Element} - The created circular segment element.
     */
    Segment.prototype.createCircularSegment = function (progress, id, x, y, r, value, opacity, thickness, totalAngle, progressWidth) {
        var start = progress.startAngle;
        var end = this.widthToAngle(progress.minimum, progress.maximum, value, progress.totalAngle);
        end -= (progress.cornerRadius === 'Round' && progress.totalAngle === completeAngle) ?
            this.widthToAngle(0, progressWidth, ((lineCapRadius / 2) * thickness), totalAngle) : 0;
        var size = (progressWidth - ((progress.totalAngle === completeAngle) ? progress.segmentCount :
            progress.segmentCount - 1) * (progress.gapWidth || progress.themeStyle.circularGapWidth));
        size = (size -
            ((progress.cornerRadius === 'Round') ?
                (((progress.totalAngle === completeAngle) ?
                    progress.segmentCount : progress.segmentCount - 1) * lineCapRadius * thickness) : 0)) / progress.segmentCount;
        var avlTolEnd = this.widthToAngle(0, progressWidth, (progressWidth / progress.segmentCount), totalAngle);
        avlTolEnd -= (progress.cornerRadius === 'Round' && progress.totalAngle === completeAngle) ?
            this.widthToAngle(0, progressWidth, ((lineCapRadius / 2) * thickness), totalAngle) : 0;
        var avlEnd = this.widthToAngle(0, progressWidth, size, totalAngle);
        var gap = this.widthToAngle(0, progressWidth, (progress.gapWidth || progress.themeStyle.circularGapWidth), totalAngle);
        gap += (progress.cornerRadius === 'Round') ? this.widthToAngle(0, progressWidth, (lineCapRadius * thickness), totalAngle) : 0;
        var segmentGroup = progress.renderer.createGroup({ 'id': progress.element.id + id });
        var gapCount = Math.floor(end / avlTolEnd);
        var count = Math.ceil((end - gap * gapCount) / avlEnd);
        var segmentPath;
        var circularSegment;
        var segmentEnd;
        var avlSegEnd = (start + ((progress.enableRtl) ? -avlEnd : avlEnd)) % 360;
        var color;
        var j = 0;
        var option;
        var circularThickness = progress.progressThickness || progress.themeStyle.circularProgressThickness;
        for (var i = 0; i < count; i++) {
            segmentEnd = (progress.enableRtl) ? ((progress.startAngle - end > avlSegEnd) ? progress.startAngle - end : avlSegEnd) :
                ((progress.startAngle + end < avlSegEnd) ? progress.startAngle + end : avlSegEnd);
            segmentPath = getPathArc(x, y, r, start, segmentEnd, progress.enableRtl);
            if (j < progress.segmentColor.length) {
                color = progress.segmentColor[j];
                j++;
            }
            else {
                j = 0;
                color = progress.segmentColor[j];
                j++;
            }
            option = new PathOption(progress.element.id + id + i, 'none', circularThickness, color, opacity, '0', segmentPath);
            circularSegment = progress.renderer.drawPath(option);
            if (progress.cornerRadius === 'Round') {
                circularSegment.setAttribute('stroke-linecap', 'round');
            }
            segmentGroup.appendChild(circularSegment);
            start = segmentEnd + ((progress.enableRtl) ? -gap : gap);
            avlSegEnd += (progress.enableRtl) ? -avlEnd - gap : avlEnd + gap;
        }
        return segmentGroup;
    };
    Segment.prototype.widthToAngle = function (min, max, value, totalAngle) {
        var angle = ((value - min) / (max - min)) * totalAngle;
        return angle;
    };
    Segment.prototype.createLinearRange = function (totalWidth, progress, progressWidth) {
        var posX = progress.progressRect.x + ((progress.enableRtl) ? progress.progressRect.width : 0);
        var startY = (progress.progressRect.y + (progress.progressRect.height / 2));
        var rangeGroup = progress.renderer.createGroup({ 'id': progress.element.id + '_LinearRangeGroup' });
        var range = progress.rangeColors;
        var thickness = progress.progressThickness || progress.themeStyle.linearProgressThickness;
        var opacity = progress.themeStyle.progressOpacity;
        var rangeMin = progress.minimum;
        var rangeMax = progress.value;
        var gradX = (progress.enableRtl) ? 0.1 : -0.1;
        var gradient;
        var validRange;
        var rangePath;
        var option;
        var startPos;
        var endPos;
        var startX;
        var endX;
        var color;
        var endColor;
        for (var i = 0; i < range.length; i++) {
            validRange = (range[i].start >= rangeMin && range[i].start <= rangeMax &&
                range[i].end >= rangeMin && range[i].end <= rangeMax);
            startPos = totalWidth * progress.calculateProgressRange(range[i].start, rangeMin, rangeMax);
            endPos = totalWidth * progress.calculateProgressRange(range[i].end, rangeMin, rangeMax);
            startX = posX + ((progress.enableRtl) ? -startPos : startPos);
            endX = posX + ((progress.enableRtl) ? -endPos : endPos);
            startX = (validRange) ? ((progress.isGradient && i > 0) ? startX + gradX : startX) : posX;
            endX = (validRange) ? endX : posX;
            color = (progress.isGradient) ? 'url(#lineRangeGrad_' + i + ')' : range[i].color;
            option = new PathOption(progress.element.id + '_LinearRange_' + i, 'none', thickness, color, opacity, '0', 'M' + ' ' + startX + ' ' + startY + ' ' + 'L' + endX + ' ' + startY);
            rangePath = progress.renderer.drawPath(option);
            if (progress.cornerRadius === 'Round' && progressWidth) {
                rangePath.setAttribute('stroke-linecap', 'round');
            }
            rangeGroup.appendChild(rangePath);
            if (progress.isGradient) {
                if (range.length - 1 === i) {
                    endColor = range[i].color;
                }
                else {
                    endColor = range[i + 1].color;
                }
                gradient = this.setLinearGradientColor(i, range[i].color, endColor, startX, endX, progress);
                rangeGroup.appendChild(gradient);
            }
        }
        return rangeGroup;
    };
    Segment.prototype.createCircularRange = function (centerX, centerY, radius, progress) {
        var rangeGroup = progress.renderer.createGroup({ 'id': progress.element.id + '_CircularRangeGroup' });
        var range = progress.rangeColors;
        var thickness = progress.progressThickness || progress.themeStyle.linearProgressThickness;
        var opacity = progress.themeStyle.progressOpacity;
        var rangeMin = progress.minimum;
        var rangeMax = progress.value;
        var start = progress.startAngle;
        var tolAngle = this.widthToAngle(progress.minimum, progress.maximum, progress.value, progress.totalAngle);
        var gradient;
        var startAngle;
        var endAngle;
        var rangePath;
        var isValidRange;
        var option;
        var color;
        var endColor;
        for (var i = 0; i < range.length; i++) {
            isValidRange = (range[i].start >= rangeMin && range[i].start <= rangeMax &&
                range[i].end >= rangeMin && range[i].end <= rangeMax);
            startAngle = this.widthToAngle(rangeMin, rangeMax, range[i].start, tolAngle);
            endAngle = this.widthToAngle(rangeMin, rangeMax, range[i].end, tolAngle);
            startAngle = (isValidRange) ? (start + ((progress.enableRtl) ? -startAngle : startAngle)) % 360 : start;
            endAngle = (isValidRange) ? (start + ((progress.enableRtl) ? -endAngle : endAngle)) % 360 : start;
            color = (progress.isGradient) ? 'url(#circleRangeGrad_' + i + ')' : range[i].color;
            option = new PathOption(progress.element.id + '_CircularRange_' + i, 'none', thickness, color, opacity, '0', getPathArc(centerX, centerY, radius, startAngle, endAngle, progress.enableRtl));
            rangePath = progress.renderer.drawPath(option);
            if (progress.cornerRadius === 'Round' && startAngle !== endAngle) {
                rangePath.setAttribute('stroke-linecap', 'round');
            }
            rangeGroup.appendChild(rangePath);
            if (progress.isGradient) {
                if (range.length - 1 === i) {
                    endColor = range[i].color;
                }
                else {
                    endColor = range[i + 1].color;
                }
                gradient = this.setCircularGradientColor(i, range[i].color, endColor, startAngle, endAngle, radius, centerX, centerY, progress);
                rangeGroup.appendChild(gradient);
            }
        }
        return rangeGroup;
    };
    Segment.prototype.setLinearGradientColor = function (id, startColor, endColor, start, end, progress) {
        var stopColor = [];
        var option = { id: 'lineRangeGrad_' + id + '', x1: start.toString(), x2: end.toString() };
        stopColor[0] = { color: startColor, colorStop: '50%' };
        stopColor[1] = { color: endColor, colorStop: '100%' };
        var linearGradient = progress.renderer.drawGradient('linearGradient', option, stopColor);
        linearGradient.firstElementChild.setAttribute('gradientUnits', 'userSpaceOnUse');
        return linearGradient;
    };
    Segment.prototype.setCircularGradientColor = function (id, startColor, endColor, start, end, rad, x, y, progress) {
        var stopColor = [];
        var pos1 = degreeToLocation(x, y, rad, start);
        var pos2 = degreeToLocation(x, y, rad, end);
        var option = {
            id: 'circleRangeGrad_' + id + '', x1: pos1.x.toString(), x2: pos2.x.toString(),
            y1: pos1.y.toString(), y2: pos2.y.toString()
        };
        stopColor[0] = { color: startColor, colorStop: '50%' };
        stopColor[1] = { color: endColor, colorStop: '100%' };
        var linearGradient = progress.renderer.drawGradient('linearGradient', option, stopColor);
        linearGradient.firstElementChild.setAttribute('gradientUnits', 'userSpaceOnUse');
        return linearGradient;
    };
    return Segment;
}());

/**
 * Progress Bar of type Linear
 */
var Linear = /** @class */ (function () {
    function Linear(progress) {
        this.segment = new Segment();
        this.animation = new ProgressAnimation();
        this.progress = progress;
    }
    /**
     * To render the linear track.
     *
     * @returns {void}
     */
    Linear.prototype.renderLinearTrack = function () {
        var progress = this.progress;
        var linearTrackGroup = progress.renderer.createGroup({ 'id': progress.element.id + '_LinearTrackGroup' });
        var linearTrack;
        var option;
        this.isRange = (this.progress.rangeColors[0].color !== '' || this.progress.rangeColors[0].start !== null ||
            this.progress.rangeColors[0].end !== null);
        var thickness = (progress.trackThickness || progress.themeStyle.linearTrackThickness);
        var stroke = (progress.argsData.trackColor || progress.themeStyle.linearTrackColor);
        if (progress.cornerRadius === 'Round4px') {
            if (progress.segmentCount > 1) {
                linearTrack = this.createRoundCornerSegment('_LinearTrack_', stroke, thickness, true, 0, progress);
            }
            else {
                option = new PathOption(progress.element.id + '_Lineartrack', stroke, 0, 'none', progress.themeStyle.trackOpacity, '0', this.cornerRadius(progress.progressRect.x, progress.progressRect.y, progress.progressRect.width, thickness, 4, ''));
                linearTrack = progress.renderer.drawPath(option);
            }
        }
        else {
            option = new PathOption(progress.element.id + '_Lineartrack', 'none', thickness, stroke, progress.themeStyle.trackOpacity, '0', progress.getPathLine(progress.progressRect.x, progress.progressRect.width, thickness));
            linearTrack = progress.renderer.drawPath(option);
            progress.trackWidth = linearTrack.getTotalLength();
            if (progress.cornerRadius === 'Round' && !this.isRange) {
                linearTrack.setAttribute('stroke-linecap', 'round');
            }
            if (progress.segmentCount > 1 && !this.isRange && !progress.enableProgressSegments) {
                progress.segmentSize = progress.calculateSegmentSize(progress.trackWidth, thickness);
                linearTrack.setAttribute('stroke-dasharray', progress.segmentSize);
            }
        }
        linearTrackGroup.appendChild(linearTrack);
        progress.svgObject.appendChild(linearTrackGroup);
    };
    /**
     * Renders linear progress, optionally refreshing progress and specifying previous width.
     *
     * @param {boolean} refresh - Indicates whether to refresh the progress.
     * @param {number} previousWidth - The previous width of the progress. Defaults to 0.
     * @returns {void}
     */
    Linear.prototype.renderLinearProgress = function (refresh, previousWidth) {
        if (previousWidth === void 0) { previousWidth = 0; }
        var progress = this.progress;
        var option;
        var linearProgress;
        var clipPathLinear;
        var clipPathIndeterminate;
        var linearProgressGroup;
        var animationdelay;
        var segmentWidth;
        var strippedStroke;
        var ismaximum = (progress.value >= progress.maximum);
        var previousProgressWidth = progress.progressRect.width * progress.calculateProgressRange(progress.value > progress.maximum ? progress.maximum : progress.value);
        var progressWidth = progress.calculateProgressRange(progress.argsData.value > progress.maximum ?
            progress.maximum : progress.argsData.value);
        this.linearProgressWidth = progress.progressRect.width *
            ((progress.isIndeterminate && !progress.enableProgressSegments) ? 1 : progressWidth);
        if (!refresh) {
            linearProgressGroup = progress.renderer.createGroup({ 'id': progress.element.id + '_LinearProgressGroup' });
        }
        else {
            linearProgressGroup = getElement$1(progress.element.id + '_LinearProgressGroup');
        }
        var thickness = (progress.progressThickness || progress.themeStyle.linearProgressThickness);
        var stroke = (!progress.isStriped) ? this.checkingLinearProgressColor() : 'url(#' + progress.element.id + '_LinearStriped)';
        if (progress.cornerRadius === 'Round4px') {
            option = new PathOption(progress.element.id + '_Linearprogress', stroke, 0, 'none', progress.themeStyle.progressOpacity, '0', this.cornerRadius(progress.progressRect.x, progress.progressRect.y, this.linearProgressWidth, thickness, 4, (ismaximum || progress.isIndeterminate) ? '' : 'start'));
        }
        else {
            option = new PathOption(progress.element.id + '_Linearprogress', 'none', thickness, stroke, progress.themeStyle.progressOpacity, '0', progress.getPathLine(progress.progressRect.x, this.linearProgressWidth, thickness));
        }
        progress.progressWidth = progress.renderer.drawPath(option).getTotalLength();
        progress.segmentSize = (!progress.enableProgressSegments) ? progress.segmentSize :
            progress.calculateSegmentSize(progress.progressWidth, thickness);
        if (progress.secondaryProgress !== null && !progress.isIndeterminate) {
            this.renderLinearBuffer(progress);
        }
        if (progress.argsData.value !== null) {
            if (progress.cornerRadius === 'Round4px') {
                if (progress.segmentCount > 1) {
                    linearProgress = this.createRoundCornerSegment('_Linearprogress_', stroke, thickness, false, this.linearProgressWidth, progress, progress.themeStyle.progressOpacity);
                }
                else {
                    linearProgress = progress.renderer.drawPath(option);
                }
            }
            else {
                if (progress.segmentColor.length !== 0 && !progress.isIndeterminate && !this.isRange) {
                    segmentWidth = (!progress.enableProgressSegments) ? progress.trackWidth : progress.progressWidth;
                    linearProgress = this.segment.createLinearSegment(progress, '_LinearProgressSegment', this.linearProgressWidth, progress.themeStyle.progressOpacity, thickness, segmentWidth);
                }
                else if (this.isRange && !progress.isIndeterminate) {
                    linearProgress = this.segment.createLinearRange(this.linearProgressWidth, progress, progressWidth);
                }
                else {
                    if (!refresh) {
                        linearProgress = progress.renderer.drawPath(option);
                    }
                    else {
                        linearProgress = getElement$1(progress.element.id + '_Linearprogress');
                        linearProgress.setAttribute('d', progress.getPathLine(progress.progressRect.x, this.linearProgressWidth, thickness));
                        linearProgress.setAttribute('stroke', stroke);
                    }
                    if (progress.segmentCount > 1) {
                        linearProgress.setAttribute('stroke-dasharray', progress.segmentSize);
                    }
                    if (progress.cornerRadius === 'Round' && progressWidth) {
                        linearProgress.setAttribute('stroke-linecap', 'round');
                    }
                }
            }
            linearProgressGroup.appendChild(linearProgress);
            if (progress.isStriped && !progress.isIndeterminate) {
                strippedStroke = this.checkingLinearProgressColor();
                this.renderLinearStriped(strippedStroke, linearProgressGroup, progress);
            }
            if (progress.isActive && !progress.isIndeterminate && !progress.isStriped) {
                this.renderActiveState(linearProgressGroup, progressWidth, this.linearProgressWidth, thickness, refresh);
            }
            if (((progress.animation.enable && animationMode !== 'Disable') || animationMode === 'Enable') && !progress.isIndeterminate && !progress.isActive && !progress.isStriped) {
                if ((progress.secondaryProgress !== null)) {
                    animationdelay = progress.animation.delay + (this.bufferWidth - this.linearProgressWidth);
                }
                else {
                    animationdelay = progress.animation.delay;
                }
                this.delay = animationdelay;
                clipPathLinear = progress.createClipPath(progress.clipPath, progressWidth, null, refresh, thickness, false, (progress.cornerRadius === 'Round4px' && ismaximum));
                linearProgressGroup.appendChild(progress.clipPath);
                linearProgress.style.clipPath = 'url(#' + progress.element.id + '_clippath)';
                this.animation.doLinearAnimation(clipPathLinear, progress, animationdelay, refresh ? previousWidth : 0);
            }
            if (progress.isIndeterminate) {
                clipPathIndeterminate = progress.createClipPath(progress.clipPath, (progress.enableProgressSegments) ? 1 : progressWidth, null, refresh, thickness, progress.enableProgressSegments);
                linearProgressGroup.appendChild(progress.clipPath);
                linearProgress.setAttribute('style', 'clip-path:url(#' + progress.element.id + '_clippath)');
                this.animation.doLinearIndeterminate(((!progress.enableProgressSegments) ? clipPathIndeterminate : linearProgress), this.linearProgressWidth, thickness, progress, clipPathIndeterminate);
            }
            progress.svgObject.appendChild(linearProgressGroup);
            progress.previousWidth = previousProgressWidth;
        }
    };
    /**
     * To render the linear buffer.
     *
     * @param {ProgressBar} progress - The progress bar control.
     * @returns {void}
     */
    Linear.prototype.renderLinearBuffer = function (progress) {
        var linearBuffer;
        var clipPathBuffer;
        var linearBufferWidth;
        var option;
        var segmentWidth;
        var ismaximum = (progress.secondaryProgress >= progress.maximum);
        var secondaryProgressWidth = progress.calculateProgressRange(progress.secondaryProgress > progress.maximum ?
            progress.maximum : progress.secondaryProgress);
        this.bufferWidth = linearBufferWidth = progress.progressRect.width * secondaryProgressWidth;
        var linearBufferGroup = progress.renderer.createGroup({ 'id': progress.element.id + '_LinearBufferGroup' });
        var thickness = progress.secondaryProgressThickness ? progress.secondaryProgressThickness
            : (progress.progressThickness || progress.themeStyle.linearProgressThickness);
        var stroke = progress.secondaryProgressColor ? progress.secondaryProgressColor : progress.themeStyle.bufferColor ||
            this.checkingLinearProgressColor();
        if (progress.cornerRadius === 'Round4px') {
            if (progress.segmentCount > 1) {
                linearBuffer = this.createRoundCornerSegment('_Linearbuffer_', stroke, thickness, false, linearBufferWidth, progress, progress.themeStyle.bufferOpacity);
            }
            else {
                option = new PathOption(progress.element.id + '_Linearbuffer', stroke, 0, 'none', progress.themeStyle.bufferOpacity, '0', this.cornerRadius(progress.progressRect.x, progress.progressRect.y, linearBufferWidth, thickness, 4, (ismaximum) ? '' : 'start'));
                linearBuffer = progress.renderer.drawPath(option);
            }
        }
        else {
            option = new PathOption(progress.element.id + '_Linearbuffer', 'none', thickness, stroke, progress.themeStyle.bufferOpacity, '0', progress.getPathLine(progress.progressRect.x, linearBufferWidth, thickness));
            if (progress.segmentColor.length !== 0 && !progress.isIndeterminate && !this.isRange) {
                segmentWidth = (!progress.enableProgressSegments) ? progress.trackWidth : progress.progressWidth;
                linearBuffer = this.segment.createLinearSegment(progress, '_LinearBufferSegment', linearBufferWidth, progress.themeStyle.bufferOpacity, (progress.progressThickness || progress.themeStyle.linearProgressThickness), segmentWidth);
            }
            else {
                linearBuffer = progress.renderer.drawPath(option);
                if (progress.segmentCount > 1 && !this.isRange) {
                    linearBuffer.setAttribute('stroke-dasharray', progress.segmentSize);
                }
                if (progress.cornerRadius === 'Round' && !this.isRange) {
                    linearBuffer.setAttribute('stroke-linecap', 'round');
                }
            }
        }
        linearBufferGroup.appendChild(linearBuffer);
        if ((progress.animation.enable && animationMode !== 'Disable') || animationMode === 'Enable') {
            clipPathBuffer = progress.createClipPath(progress.bufferClipPath, secondaryProgressWidth, null, false, thickness, false, (progress.cornerRadius === 'Round4px' && ismaximum));
            linearBufferGroup.appendChild(progress.bufferClipPath);
            linearBuffer.setAttribute('style', 'clip-path:url(#' + progress.element.id + '_clippathBuffer)');
            this.animation.doLinearAnimation(clipPathBuffer, progress, progress.animation.delay, 0);
        }
        progress.svgObject.appendChild(linearBufferGroup);
    };
    /**
     * Render the Linear Label.
     *
     * @param {boolean} isProgressRefresh - Indicates whether the progress should be refreshed. Defaults to false.
     * @returns {void}
     */
    Linear.prototype.renderLinearLabel = function (isProgressRefresh) {
        if (isProgressRefresh === void 0) { isProgressRefresh = false; }
        var linearlabel;
        var posX;
        var posY;
        var textSize;
        var percentage = 100;
        var option;
        var defaultPos;
        var far;
        var center;
        var pos;
        var clipPath;
        var thickness = (this.progress.progressThickness || this.progress.themeStyle.linearProgressThickness);
        var padding = 5;
        var progress = this.progress;
        var textAlignment = progress.labelStyle.textAlignment;
        var labelText = progress.labelStyle.text;
        var progressWidth = progress.progressRect.width * progress.calculateProgressRange(progress.value > progress.maximum ?
            progress.maximum : progress.value);
        var linearLabelGroup = progress.renderer.createGroup({ 'id': progress.element.id + '_LinearLabelGroup' });
        if (document.getElementById(linearLabelGroup.id)) {
            document.getElementById(linearLabelGroup.id).remove();
        }
        var labelValue = ((progress.value - progress.minimum) / (progress.maximum - progress.minimum)) * percentage;
        var linearValue = (progress.value < progress.minimum) ? 0 : +labelValue.toFixed(2);
        var argsData = {
            cancel: false, text: labelText ? labelText : String(linearValue) + '%', color: progress.labelStyle.color || this.progress.themeStyle.linearLabelFont.color
        };
        progress.trigger('textRender', argsData);
        if (!argsData.cancel) {
            textSize = measureText(argsData.text, progress.labelStyle, progress.themeStyle.linearLabelFont);
            defaultPos = (progress.enableRtl) ? (progress.progressRect.x + progress.progressRect.width - textSize.width / 2) :
                (progress.progressRect.x + textSize.width / 2);
            if (progress.labelOnTrack) {
                if (textAlignment === 'Near') {
                    posX = defaultPos + ((progress.enableRtl) ? -padding : padding);
                }
                else if (textAlignment === 'Center') {
                    center = (progress.enableRtl) ? (progress.progressRect.x + progress.progressRect.width - progressWidth / 2) :
                        (progress.progressRect.x + progressWidth / 2);
                    pos = (progress.enableRtl) ? (center <= defaultPos) : (center >= defaultPos);
                    posX = (progressWidth < textSize.width / 2) ? defaultPos : center;
                    if (!progressWidth && !progress.enableRtl && posX / 2 < progress.progressRect.x + padding) {
                        posX += padding;
                    }
                }
                else {
                    far = (progress.enableRtl) ?
                        ((progress.progressRect.x + progress.progressRect.width - progressWidth) + textSize.width / 2) :
                        (progress.progressRect.x + progressWidth - textSize.width / 2);
                    far += (progress.enableRtl) ? padding : -padding;
                    pos = (progress.enableRtl) ? (far <= defaultPos) : (far >= defaultPos);
                    if (pos) {
                        posX = far;
                    }
                    else {
                        posX = defaultPos;
                    }
                    if (!progressWidth && !progress.enableRtl && posX / 2 < progress.progressRect.x + padding) {
                        posX += padding;
                    }
                }
            }
            else {
                if (textAlignment === 'Near') {
                    posX = defaultPos + ((progress.enableRtl) ? -padding : padding);
                }
                else if (textAlignment === 'Center') {
                    posX = (progress.progressRect.x + progress.progressRect.width) / 2;
                }
                else {
                    posX = (progress.enableRtl) ?
                        (progress.progressRect.x + textSize.width / 2) :
                        (progress.progressRect.x + progress.progressRect.width - textSize.width / 2);
                    posX += (progress.enableRtl) ? padding : -padding;
                }
            }
            if (this.progress.cornerRadius === 'Round4px') {
                posY = progress.progressRect.y + (thickness / 2) + (textSize.height / 4);
            }
            else {
                posY = progress.progressRect.y + (progress.progressRect.height / 2) + (textSize.height / 4);
            }
            option = new TextOption(progress.element.id + '_linearLabel', progress.labelStyle.size || progress.themeStyle.linearLabelFont.size, progress.labelStyle.fontStyle || progress.themeStyle.linearLabelFont.fontStyle, progress.labelStyle.fontFamily || progress.themeStyle.linearLabelFont.fontFamily, progress.labelStyle.fontWeight || progress.themeStyle.linearLabelFont.fontWeight, 'middle', argsData.color, posX, posY);
            linearlabel = progress.renderer.createText(option, argsData.text);
            linearLabelGroup.appendChild(linearlabel);
            if (((progress.animation.enable && animationMode !== 'Disable') || animationMode === 'Enable') && !progress.isIndeterminate) {
                clipPath = progress.renderer.createClipPath({ 'id': progress.element.id + '_clippathLabel' });
                progress.createClipPath(clipPath, 1, null, false, (progress.progressThickness || progress.themeStyle.linearProgressThickness), true);
                linearLabelGroup.appendChild(clipPath);
                linearlabel.style.clipPath = 'url(#' + progress.element.id + '_clippathLabel)';
                this.animation.doLabelAnimation(linearlabel, (isProgressRefresh ? progress.previousLabelWidth : 0), progressWidth - (isProgressRefresh ? progress.previousLabelWidth : 0), progress, this.delay, textSize.width);
            }
            progress.svgObject.appendChild(linearLabelGroup);
            progress.previousLabelWidth = progressWidth;
        }
    };
    /**
     * Renders the active state of the linear progress.
     *
     * @param {Element} progressGroup - The group element containing the progress.
     * @param {number} progressWidth - The width of the progress.
     * @param {number} linearProgressWidth - The width of the linear progress.
     * @param {number} thickness - The thickness of the progress.
     * @param {boolean} refresh - Indicates whether the progress should be refreshed.
     * @returns {void}
     * @private
     */
    Linear.prototype.renderActiveState = function (progressGroup, progressWidth, linearProgressWidth, thickness, refresh) {
        var linearActive;
        var progress = this.progress;
        var option;
        var ismaximum = (progress.value === progress.maximum);
        if (progress.cornerRadius === 'Round4px') {
            if (progress.segmentCount > 1) {
                linearActive = this.createRoundCornerSegment('_LinearActiveProgress_', '#ffffff', thickness, false, linearProgressWidth, progress, 0.5);
            }
            else {
                option = new PathOption(progress.element.id + '_LinearActiveProgress', '#ffffff', 0, 'none', 0.5, '0', this.cornerRadius(progress.progressRect.x, progress.progressRect.y, linearProgressWidth, thickness, 4, ismaximum ? '' : 'start'));
                linearActive = progress.renderer.drawPath(option);
            }
        }
        else {
            if (!refresh) {
                option = new PathOption(progress.element.id + '_LinearActiveProgress', 'none', thickness, '#ffffff', 0.5, '', progress.getPathLine(progress.progressRect.x, linearProgressWidth, thickness));
                linearActive = progress.renderer.drawPath(option);
            }
            else {
                linearActive = getElement$1(progress.element.id + '_LinearActiveProgress');
                linearActive.setAttribute('d', progress.getPathLine(progress.progressRect.x, linearProgressWidth, thickness));
            }
            if (progress.segmentCount > 1 && !this.isRange) {
                linearActive.setAttribute('stroke-dasharray', progress.segmentSize);
            }
            if (progress.cornerRadius === 'Round' && progressWidth && !this.isRange) {
                linearActive.setAttribute('stroke-linecap', 'round');
            }
        }
        var activeClip = progress.createClipPath(progress.clipPath, progressWidth, null, refresh, thickness, false);
        linearActive.setAttribute('style', 'clip-path:url(#' + progress.element.id + '_clippath)');
        progressGroup.appendChild(linearActive);
        progressGroup.appendChild(progress.clipPath);
        this.animation.doLinearAnimation(activeClip, progress, 0, 0, linearActive);
    };
    /**
     * Renders the linear progress with stripes.
     *
     * @param {string} color - The color of the progress stripes.
     * @param {Element} group - The group element containing the progress.
     * @param {ProgressBar} progress - The progress bar control.
     * @returns {void}
     * @private
     */
    Linear.prototype.renderLinearStriped = function (color, group, progress) {
        var defs = progress.renderer.createDefs();
        var linearGradient = document.createElementNS(svgLink, gradientType);
        var stripWidth = 14;
        var stop;
        var stopOption = [];
        var gradOption = {
            id: progress.element.id + '_LinearStriped', x1: (progress.progressRect.x).toString(),
            x2: (progress.progressRect.x + stripWidth).toString(),
            spreadMethod: 'repeat', gradientUnits: 'userSpaceOnUse', gradientTransform: 'rotate(-45)'
        };
        stopOption = [{ offset: '50%', 'stop-color': color, 'stop-opacity': '1' },
            { offset: '50%', 'stop-color': color, 'stop-opacity': '0.4' }];
        linearGradient = setAttributes(gradOption, linearGradient);
        for (var i = 0; i < stopOption.length; i++) {
            stop = document.createElementNS(svgLink, stopElement);
            stop = setAttributes(stopOption[i], stop);
            linearGradient.appendChild(stop);
        }
        defs.appendChild(linearGradient);
        group.appendChild(defs);
        if (((progress.animation.enable && animationMode !== 'Disable') || animationMode === 'Enable')) {
            this.animation.doStripedAnimation(linearGradient, progress, 0);
        }
    };
    /**
     * Checks and retrieves the color for the linear progress.
     *
     * @returns {string} - The color for the linear progress.
     * @private
     */
    Linear.prototype.checkingLinearProgressColor = function () {
        var linearColor;
        var progress = this.progress;
        var role = progress.role;
        switch (role) {
            case 'Success':
                linearColor = progress.themeStyle.success;
                break;
            case 'Info':
                linearColor = progress.themeStyle.info;
                break;
            case 'Warning':
                linearColor = progress.themeStyle.warning;
                break;
            case 'Danger':
                linearColor = progress.themeStyle.danger;
                break;
            default:
                linearColor = (progress.argsData.progressColor || progress.themeStyle.linearProgressColor);
        }
        return linearColor;
    };
    /**
     * Generates the SVG path string with rounded corners.
     *
     * @param {number} x - The x-coordinate of the starting point.
     * @param {number} y - The y-coordinate of the starting point.
     * @param {number} width - The width of the rectangle.
     * @param {number} height - The height of the rectangle.
     * @param {number} radius - The radius of the rounded corners.
     * @param {string} pathtype - The type of SVG path ('M' for move to, 'L' for line to).
     * @returns {string} - The SVG path string with rounded corners.
     * @private
     */
    Linear.prototype.cornerRadius = function (x, y, width, height, radius, pathtype) {
        var path = '';
        var endWidth = width;
        var endRadius = radius;
        switch (pathtype) {
            case 'start':
                path = 'M' + x + ',' + y + ' '
                    + 'h' + (width) + ' '
                    + 'v' + (height) + ' '
                    + 'h' + (-width) + ' '
                    + 'a' + radius + ',' + radius + ' 0 0 1 ' + -radius + ',' + -radius + ' '
                    + 'v' + (2 * radius - height) + ' '
                    + 'a' + radius + ',' + radius + ' 0 0 1 ' + radius + ',' + -radius + ' '
                    + 'z';
                break;
            case 'end':
                path = 'M' + x + ',' + y + ' '
                    + 'h' + (endWidth - endRadius) + ' '
                    + 'a' + endRadius + ',' + endRadius + ' 0 0 1 ' + endRadius + ',' + endRadius + ' '
                    + 'v' + (height - 2 * endRadius) + ' '
                    + 'a' + endRadius + ',' + endRadius + ' 0 0 1 ' + -endRadius + ',' + endRadius + ' '
                    + 'h' + (radius - endWidth) + ' '
                    + 'v' + (-height) + ' '
                    + 'z';
                break;
            case 'none':
                path = 'M' + x + ',' + y + ' '
                    + 'h' + (width) + ' '
                    + 'v' + (height) + ' '
                    + 'h' + (-width) + ' '
                    + 'v' + (-height) + ' '
                    + 'z';
                break;
            default:
                path = 'M' + x + ',' + y + ' '
                    + 'h' + (width - radius) + ' '
                    + 'a' + radius + ',' + radius + ' 0 0 1 ' + radius + ',' + radius + ' '
                    + 'v' + (height - 2 * radius) + ' '
                    + 'a' + radius + ',' + radius + ' 0 0 1 ' + -radius + ',' + radius + ' '
                    + 'h' + (radius - width) + ' '
                    + 'a' + radius + ',' + radius + ' 0 0 1 ' + -radius + ',' + -radius + ' '
                    + 'v' + (2 * radius - height) + ' '
                    + 'a' + radius + ',' + radius + ' 0 0 1 ' + radius + ',' + -radius + ' '
                    + 'z';
        }
        return path;
    };
    /**
     * Creates a round-corner segment element for the progress bar.
     *
     * @param {string} id - The id of the segment element.
     * @param {string} stroke - The stroke color of the segment.
     * @param {number} thickness - The thickness of the segment.
     * @param {boolean} isTrack - Indicates whether the segment is a track.
     * @param {number} progressWidth - The width of the progress.
     * @param {ProgressBar} progress - The progress bar control.
     * @param {number} opacity - The opacity of the segment.
     * @returns {Element} - The created round-corner segment element.
     */
    Linear.prototype.createRoundCornerSegment = function (id, stroke, thickness, isTrack, progressWidth, progress, opacity) {
        var locX = progress.progressRect.x;
        var locY = progress.progressRect.y;
        var width = progress.progressRect.width;
        var option;
        var pathType;
        var avlWidth;
        var gapWidth = (progress.gapWidth || progress.themeStyle.linearGapWidth);
        var segWidth = (width - ((progress.segmentCount - 1) * gapWidth)) / progress.segmentCount;
        var segmentGroup = progress.renderer.createGroup({ 'id': progress.element.id + id + 'SegmentGroup' });
        var segmentPath;
        for (var i = 1; i <= progress.segmentCount; i++) {
            if (i === 1 || i === progress.segmentCount) {
                pathType = (i === 1) ? 'start' : 'end';
            }
            else {
                pathType = 'none';
            }
            if (isTrack) {
                option = new PathOption(progress.element.id + id + i, stroke, 0, 'none', progress.themeStyle.trackOpacity, '0', this.cornerRadius(locX, locY, segWidth, thickness, 4, pathType));
                segmentPath = progress.renderer.drawPath(option);
                segmentGroup.appendChild(segmentPath);
                locX += (segWidth + gapWidth);
            }
            else {
                avlWidth = (progressWidth < segWidth) ? progressWidth : segWidth;
                option = new PathOption(progress.element.id + id + i, stroke, 0, 'none', opacity, '0', this.cornerRadius(locX, locY, avlWidth, thickness, 4, pathType));
                segmentPath = progress.renderer.drawPath(option);
                segmentGroup.appendChild(segmentPath);
                locX += (segWidth + gapWidth);
                progressWidth -= (segWidth + gapWidth);
                if (progressWidth <= 0) {
                    break;
                }
            }
        }
        return segmentGroup;
    };
    return Linear;
}());

/**
 * Progressbar of type circular
 */
var Circular = /** @class */ (function () {
    function Circular(progress) {
        this.segment = new Segment();
        this.animation = new ProgressAnimation();
        this.progress = progress;
    }
    /**
     * To render the circular track.
     *
     * @returns {void}
     */
    Circular.prototype.renderCircularTrack = function () {
        var progress = this.progress;
        var circularTrackGroup = progress.renderer.createGroup({ 'id': progress.element.id + '_CircularTrackGroup' });
        var radius;
        var endAngle;
        var startAngle = progress.startAngle;
        progress.totalAngle = (progress.endAngle - progress.startAngle) % 360;
        progress.totalAngle = (progress.totalAngle <= 0 ? (360 + progress.totalAngle) : progress.totalAngle);
        progress.totalAngle -= (progress.totalAngle === 360) ? 0.01 : 0;
        this.trackEndAngle = endAngle = (progress.startAngle + ((progress.enableRtl) ? -progress.totalAngle : +progress.totalAngle)) % 360;
        this.centerX = progress.progressRect.x + (progress.progressRect.width / 2);
        this.centerY = progress.progressRect.y + (progress.progressRect.height / 2);
        this.maxThickness = Math.max(progress.trackThickness, progress.progressThickness) ||
            Math.max(progress.themeStyle.circularProgressThickness, progress.themeStyle.circularTrackThickness);
        this.availableSize = (Math.min(progress.progressRect.height, progress.progressRect.width) / 2) - this.maxThickness / 2;
        radius = stringToNumber(progress.radius, this.availableSize);
        radius = (radius === null) ? 0 : radius;
        var stroke = (progress.argsData.trackColor || progress.themeStyle.circularTrackColor);
        var fill = (progress.enablePieProgress) ? (progress.argsData.trackColor || progress.themeStyle.circularTrackColor) : 'none';
        var strokeWidth = (progress.enablePieProgress) ? 0 :
            (progress.trackThickness || progress.themeStyle.circularTrackThickness);
        var circularPath = getPathArc(this.centerX, this.centerY, radius, startAngle, endAngle, progress.enableRtl, progress.enablePieProgress);
        this.isRange = (this.progress.rangeColors[0].color !== '' || this.progress.rangeColors[0].start !== null ||
            this.progress.rangeColors[0].end !== null);
        var option = new PathOption(progress.element.id + '_Circulartrack', fill, strokeWidth, stroke, progress.themeStyle.trackOpacity, '0', circularPath);
        var circularTrack = progress.renderer.drawPath(option);
        progress.trackWidth = circularTrack.getTotalLength();
        if (progress.segmentCount > 1 && !progress.enableProgressSegments && !progress.enablePieProgress && !this.isRange) {
            progress.segmentSize = progress.calculateSegmentSize(progress.trackWidth, strokeWidth);
            circularTrack.setAttribute('stroke-dasharray', progress.segmentSize);
        }
        if (progress.cornerRadius === 'Round' && !progress.enablePieProgress && !this.isRange) {
            circularTrack.setAttribute('stroke-linecap', 'round');
        }
        circularTrackGroup.appendChild(circularTrack);
        progress.svgObject.appendChild(circularTrackGroup);
    };
    /**
     * Renders circular progress to update previous progress.
     *
     * @param {number} previousEnd - The previous end value of the progress.
     * @param {number} previousTotalEnd - The previous total end value of the progress.
     * @param {boolean} refresh - Indicates whether to refresh the progress.
     * @returns {void}
     */
    Circular.prototype.renderCircularProgress = function (previousEnd, previousTotalEnd, refresh) {
        var progress = this.progress;
        var startAngle = progress.startAngle;
        var endAngle;
        var totalAngle;
        var radius;
        var previousPath;
        var progressTotalAngle;
        var progressEnd;
        var circularProgress;
        var linearClipPath;
        var circularProgressGroup;
        var segmentWidth;
        if (!refresh) {
            circularProgressGroup = progress.renderer.createGroup({ 'id': progress.element.id + '_CircularProgressGroup' });
        }
        else {
            circularProgressGroup = getElement$1(progress.element.id + '_CircularProgressGroup');
        }
        radius = stringToNumber(progress.innerRadius, this.availableSize);
        radius = (radius === null) ? 0 : radius;
        progress.previousTotalEnd = progressEnd = progress.calculateProgressRange(progress.argsData.value > progress.maximum ?
            progress.maximum : progress.argsData.value);
        var progressEndAngle = (progress.startAngle + ((progress.enableRtl) ? -progressEnd : progressEnd)) % 360;
        progress.previousEndAngle = endAngle = ((progress.isIndeterminate && !progress.enableProgressSegments) ? (progress.startAngle + ((progress.enableRtl) ? -progress.totalAngle : progress.totalAngle)) % 360 : progressEndAngle);
        progressTotalAngle = (progressEnd - progress.startAngle) % 360;
        progressTotalAngle = (progressTotalAngle <= 0 ? (360 + progressTotalAngle) : progressTotalAngle);
        progressTotalAngle -= (progressTotalAngle === 360) ? 0.01 : 0;
        var circularPath = getPathArc(this.centerX, this.centerY, radius, startAngle, endAngle, progress.enableRtl, progress.enablePieProgress);
        var stroke = this.checkingCircularProgressColor();
        var fill = (progress.enablePieProgress) ? stroke : 'none';
        var thickness = (progress.progressThickness || progress.themeStyle.circularProgressThickness);
        var strokeWidth = (progress.enablePieProgress) ? 0 : thickness;
        var option = new PathOption(progress.element.id + '_Circularprogress', fill, strokeWidth, stroke, progress.themeStyle.progressOpacity, '0', circularPath);
        progress.progressWidth = progress.renderer.drawPath(option).getTotalLength();
        progress.segmentSize = this.validateSegmentSize(progress, thickness);
        this.endPosition = degreeToLocation(this.centerX, this.centerY, radius, endAngle);
        if (progress.secondaryProgress !== null && !progress.isIndeterminate) {
            this.renderCircularBuffer(progress, radius, progressTotalAngle);
        }
        if (progress.argsData.value !== null) {
            if (progress.segmentColor.length !== 0 && !progress.isIndeterminate && !progress.enablePieProgress) {
                totalAngle = (!progress.enableProgressSegments) ? progress.totalAngle : progressTotalAngle;
                segmentWidth = (!progress.enableProgressSegments) ? progress.trackWidth : progress.progressWidth;
                circularProgress = this.segment.createCircularSegment(progress, '_CircularProgressSegment', this.centerX, this.centerY, radius, progress.argsData.value, progress.themeStyle.progressOpacity, thickness, totalAngle, segmentWidth);
            }
            else if (this.isRange && !progress.isIndeterminate) {
                circularProgress = this.segment.createCircularRange(this.centerX, this.centerY, radius, progress);
            }
            else {
                if (!refresh) {
                    circularProgress = progress.renderer.drawPath(option);
                }
                else {
                    circularProgress = getElement$1(progress.element.id + '_Circularprogress');
                    previousPath = circularProgress.getAttribute('d');
                    circularProgress.setAttribute('stroke', stroke);
                    circularProgress.setAttribute('d', circularPath);
                }
                if (progress.segmentCount > 1 && !progress.enablePieProgress) {
                    circularProgress.setAttribute('stroke-dasharray', progress.segmentSize);
                }
                if (progress.cornerRadius === 'Round' && startAngle !== endAngle) {
                    circularProgress.setAttribute('stroke-linecap', 'round');
                }
            }
            circularProgressGroup.appendChild(circularProgress);
            if (progress.isActive && !progress.isIndeterminate && !progress.enablePieProgress) {
                this.renderActiveState(circularProgressGroup, radius, strokeWidth, circularPath, progressEndAngle, progressEnd, refresh);
            }
            if (((progress.animation.enable && animationMode !== 'Disable') || animationMode === 'Enable') || progress.isIndeterminate) {
                this.delay = (progress.secondaryProgress !== null) ? 300 : progress.animation.delay;
                linearClipPath = progress.createClipPath(progress.clipPath, null, refresh ? previousPath : '', refresh);
                circularProgressGroup.appendChild(progress.clipPath);
                if (((progress.animation.enable && animationMode !== 'Disable') || animationMode === 'Enable') && !progress.isIndeterminate && !progress.isActive) {
                    circularProgress.style.clipPath = 'url(#' + progress.element.id + '_clippath)';
                    this.animation.doCircularAnimation(this.centerX, this.centerY, radius, progressEndAngle, progressEnd, linearClipPath, progress, thickness, this.delay, refresh ? previousEnd : null, refresh ? previousTotalEnd : null);
                }
                if (progress.isIndeterminate) {
                    if (progress.enableProgressSegments) {
                        linearClipPath.setAttribute('d', getPathArc(this.centerX, this.centerY, radius + (thickness / 2), progress.startAngle, this.trackEndAngle, progress.enableRtl, true));
                    }
                    circularProgress.setAttribute('style', 'clip-path:url(#' + progress.element.id + '_clippath)');
                    this.animation.doCircularIndeterminate((!progress.enableProgressSegments) ? linearClipPath : circularProgress, progress, startAngle, progressEndAngle, this.centerX, this.centerY, radius, thickness, linearClipPath);
                }
            }
            progress.svgObject.appendChild(circularProgressGroup);
        }
    };
    /**
     * Renders circular buffer for the progress bar.
     *
     * @param {ProgressBar} progress - The progress bar control.
     * @param {number} radius - The radius of the circular buffer.
     * @param {number} progressTotalAngle - The total angle covered by the progress.
     * @returns {void}
     * @private
     */
    Circular.prototype.renderCircularBuffer = function (progress, radius, progressTotalAngle) {
        var bufferClipPath;
        var circularBuffer;
        var segmentWidth;
        var totalAngle;
        var circularBufferGroup = progress.renderer.createGroup({ 'id': progress.element.id + '_ CircularBufferGroup' });
        var bufferEnd = progress.calculateProgressRange(progress.secondaryProgress > progress.maximum ?
            progress.maximum : progress.secondaryProgress);
        var endAngle = (progress.startAngle + ((progress.enableRtl) ? -bufferEnd : bufferEnd)) % 360;
        var circularPath = getPathArc(this.centerX, this.centerY, radius, progress.startAngle, endAngle, progress.enableRtl, progress.enablePieProgress);
        this.bufferEndPosition = degreeToLocation(this.centerX, this.centerY, radius, endAngle);
        var stroke = progress.secondaryProgressColor ? progress.secondaryProgressColor : progress.themeStyle.bufferColor ||
            this.checkingCircularProgressColor();
        var fill = (progress.enablePieProgress) ? stroke : 'none';
        var strokeWidth = (progress.enablePieProgress) ? 0 :
            (progress.secondaryProgressThickness ? progress.secondaryProgressThickness :
                (progress.progressThickness || progress.themeStyle.circularProgressThickness));
        var option = new PathOption(progress.element.id + '_Circularbuffer', fill, strokeWidth, stroke, progress.themeStyle.bufferOpacity, '0', circularPath);
        if (progress.segmentColor.length !== 0 && !progress.isIndeterminate && !progress.enablePieProgress && !this.isRange) {
            totalAngle = (!progress.enableProgressSegments) ? progress.totalAngle : progressTotalAngle;
            segmentWidth = (!progress.enableProgressSegments) ? progress.trackWidth : progress.progressWidth;
            circularBuffer = this.segment.createCircularSegment(progress, '_CircularBufferSegment', this.centerX, this.centerY, radius, progress.secondaryProgress > progress.maximum ? progress.maximum : progress.secondaryProgress, progress.themeStyle.bufferOpacity, strokeWidth, totalAngle, segmentWidth);
        }
        else {
            circularBuffer = progress.renderer.drawPath(option);
            if (progress.segmentCount > 1 && !progress.enablePieProgress && !this.isRange) {
                circularBuffer.setAttribute('stroke-dasharray', progress.segmentSize);
            }
            if (progress.cornerRadius === 'Round' && !this.isRange) {
                circularBuffer.setAttribute('stroke-linecap', 'round');
            }
        }
        circularBufferGroup.appendChild(circularBuffer);
        if (((progress.animation.enable && animationMode !== 'Disable') || animationMode === 'Enable') && !progress.isActive) {
            bufferClipPath = progress.createClipPath(progress.bufferClipPath, null, '', false);
            circularBufferGroup.appendChild(progress.bufferClipPath);
            circularBuffer.setAttribute('style', 'clip-path:url(#' + progress.element.id + '_clippathBuffer)');
            this.animation.doCircularAnimation(this.centerX, this.centerY, radius, endAngle, bufferEnd, bufferClipPath, progress, (progress.progressThickness || progress.themeStyle.circularProgressThickness), progress.animation.delay);
        }
        progress.svgObject.appendChild(circularBufferGroup);
    };
    /**
     * To render the circular Label.
     *
     * @param {boolean} isProgressRefresh - Indicates whether progress should be refreshed. Defaults to false.
     * @returns {void}
     */
    Circular.prototype.renderCircularLabel = function (isProgressRefresh) {
        if (isProgressRefresh === void 0) { isProgressRefresh = false; }
        var end;
        var circularLabel;
        var centerY;
        var textSize;
        var option;
        var percentage = 100;
        var progress = this.progress;
        var labelText = progress.labelStyle.text;
        var circularLabelGroup = progress.renderer.createGroup({ 'id': progress.element.id + '_CircularLabelGroup' });
        if (document.getElementById(circularLabelGroup.id)) {
            document.getElementById(circularLabelGroup.id).remove();
        }
        var labelValue = ((progress.value - progress.minimum) / (progress.maximum - progress.minimum)) * percentage;
        var circularValue = (progress.value < progress.minimum) ? 0 : +labelValue.toFixed(2);
        var argsData = {
            cancel: false, text: labelText ? labelText : String(circularValue) + '%', color: progress.labelStyle.color || progress.themeStyle.circularLabelFont.color
        };
        progress.trigger('textRender', argsData);
        if (!argsData.cancel) {
            textSize = measureText(argsData.text, progress.labelStyle, progress.themeStyle.circularLabelFont);
            centerY = this.centerY + (textSize.height / 2);
            option = new TextOption(progress.element.id + '_circularLabel', progress.labelStyle.size || progress.themeStyle.circularLabelFont.size, progress.labelStyle.fontStyle || progress.themeStyle.circularLabelFont.fontStyle, progress.labelStyle.fontFamily || progress.themeStyle.circularLabelFont.fontFamily, progress.labelStyle.fontWeight ||
                progress.themeStyle.circularLabelFont.fontWeight, 'middle', argsData.color, this.centerX, centerY, progress.progressRect.width, progress.progressRect.height);
            circularLabel = progress.renderer.createText(option, argsData.text);
            circularLabelGroup.appendChild(circularLabel);
            if (((progress.animation.enable && animationMode !== 'Disable') || animationMode === 'Enable') && !progress.isIndeterminate) {
                end = ((progress.value - progress.minimum) / (progress.maximum - progress.minimum)) * progress.totalAngle;
                end = (progress.value < progress.minimum) ? 0 : end;
                this.animation.doLabelAnimation(circularLabel, isProgressRefresh ? progress.previousWidth :
                    progress.startAngle, end, progress, this.delay);
            }
            progress.svgObject.appendChild(circularLabelGroup);
            progress.previousWidth = end;
        }
    };
    /**
     * Renders the active state of the circular progress.
     *
     * @param {Element} progressGroup - The group element containing the progress.
     * @param {number} radius - The radius of the circular progress.
     * @param {number} strokeWidth - The width of the progress stroke.
     * @param {string} circularPath - The path representing the circular progress.
     * @param {number} endAngle - The angle at which the progress ends.
     * @param {number} totalEnd - The total end value of the progress.
     * @param {boolean} refresh - Indicates whether the progress should be refreshed.
     * @returns {void}
     * @private
     */
    Circular.prototype.renderActiveState = function (progressGroup, radius, strokeWidth, circularPath, endAngle, totalEnd, refresh) {
        var circularActive;
        var option;
        var progress = this.progress;
        var thickness = strokeWidth + 1;
        if (!refresh) {
            option = new PathOption(progress.element.id + '_CircularActiveProgress', 'none', thickness, '#ffffff', 0.5, '0', circularPath);
            circularActive = progress.renderer.drawPath(option);
        }
        else {
            circularActive = getElement$1(progress.element.id + '_CircularActiveProgress');
            circularActive.setAttribute('d', circularPath);
        }
        if (progress.segmentCount > 1) {
            circularActive.setAttribute('stroke-dasharray', progress.segmentSize);
        }
        if (progress.cornerRadius === 'Round') {
            circularActive.setAttribute('stroke-linecap', 'round');
        }
        var activeClip = progress.createClipPath(progress.clipPath, null, '', refresh);
        circularActive.setAttribute('style', 'clip-path:url(#' + progress.element.id + '_clippath)');
        progressGroup.appendChild(circularActive);
        progressGroup.appendChild(progress.clipPath);
        this.animation.doCircularAnimation(this.centerX, this.centerY, radius, endAngle, totalEnd, activeClip, progress, thickness, 0, null, null, circularActive);
    };
    /**
     * Validates the segment size for the progress bar.
     *
     * @param {ProgressBar} progress - The progress bar control.
     * @param {number} thickness - The thickness of the progress segments.
     * @returns {string} - The validated segment size.
     * @private
     */
    Circular.prototype.validateSegmentSize = function (progress, thickness) {
        var validSegment;
        var progressSegment;
        var rDiff = parseInt(progress.radius, 10) - parseInt(progress.innerRadius, 10);
        if (rDiff !== 0 && !progress.enableProgressSegments) {
            progressSegment = progress.trackWidth + ((rDiff < 0) ? (progress.trackWidth * Math.abs(rDiff)) / parseInt(progress.radius, 10) :
                -(progress.trackWidth * Math.abs(rDiff)) / parseInt(progress.radius, 10));
            validSegment = progress.calculateSegmentSize(progressSegment, thickness);
        }
        else if (progress.enableProgressSegments) {
            validSegment = progress.calculateSegmentSize(progress.progressWidth, thickness);
        }
        else {
            validSegment = progress.segmentSize;
        }
        return validSegment;
    };
    /**
     * Checks and retrieves the color for the circular progress.
     *
     * @returns {string} - The color for the circular progress.
     * @private
     */
    Circular.prototype.checkingCircularProgressColor = function () {
        var circularColor;
        var progress = this.progress;
        var role = progress.role;
        switch (role) {
            case 'Success':
                circularColor = progress.themeStyle.success;
                break;
            case 'Info':
                circularColor = progress.themeStyle.info;
                break;
            case 'Warning':
                circularColor = progress.themeStyle.warning;
                break;
            case 'Danger':
                circularColor = progress.themeStyle.danger;
                break;
            default:
                circularColor = (progress.argsData.progressColor || progress.themeStyle.circularProgressColor);
        }
        return circularColor;
    };
    return Circular;
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
var __decorate$1 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 *  progress bar control
 */
var ProgressBar = /** @class */ (function (_super) {
    __extends$3(ProgressBar, _super);
    function ProgressBar(options, element) {
        var _this = _super.call(this, options, element) || this;
        /** @private */
        _this.linear = new Linear(_this);
        /** @private */
        _this.circular = new Circular(_this);
        /** @private */
        _this.annotateAnimation = new ProgressAnimation();
        /** @private */
        // private resizeTo: number;
        /** @private */
        _this.destroyIndeterminate = false;
        /** @private */
        _this.scaleX = 1;
        /** @private */
        _this.scaleY = 1;
        ProgressBar_1.Inject(ProgressTooltip);
        return _this;
    }
    ProgressBar_1 = ProgressBar;
    ProgressBar.prototype.getModuleName = function () {
        return 'progressbar';
    };
    ProgressBar.prototype.preRender = function () {
        this.unWireEvents();
        this.initPrivateVariable();
        this.wireEvents();
    };
    ProgressBar.prototype.initPrivateVariable = function () {
        this.progressRect = new Rect(0, 0, 0, 0);
        this.progressSize = new Size(0, 0);
    };
    ProgressBar.prototype.render = function () {
        var _this = this;
        this.trigger('load', { progressBar: this });
        this.element.style.display = 'block';
        this.element.style.position = 'relative';
        this.element.setAttribute('role', 'progressbar');
        this.element.setAttribute('aria-valuemin', this.minimum.toString());
        this.element.setAttribute('aria-valuemax', this.maximum.toString());
        this.element.setAttribute('aria-valuenow', this.value ? this.value.toString() : '0');
        this.element.setAttribute('tabindex', '0');
        this.element.setAttribute('aria-label', this.labelStyle.text || 'progress bar');
        this.calculateProgressBarSize();
        this.setTheme();
        this.createSVG();
        this.argsData = { value: this.value, progressColor: this.progressColor, trackColor: this.trackColor };
        if (this.argsData.value === this.maximum) {
            this.trigger(progressCompleted, this.argsData, function () { _this.controlRendering(); });
        }
        else {
            this.trigger(valueChanged, this.argsData, function () { _this.controlRendering(); });
        }
    };
    ProgressBar.prototype.controlRendering = function () {
        this.renderElements();
        this.trigger('loaded', { progressBar: this });
        this.renderComplete();
        this.controlRenderedTimeStamp = new Date().getTime();
    };
    /**
     * calculate size of the progress bar.
     *
     * @returns {void}
     */
    ProgressBar.prototype.calculateProgressBarSize = function () {
        var containerWidth = this.element.clientWidth || this.element.offsetWidth;
        var containerHeight = this.element.clientHeight;
        var width = (this.type === 'Linear') ? 200 : 120;
        var height = (this.type === 'Linear') ? 30 : 120;
        var padding = 10;
        var thickness = Math.max(this.progressThickness, this.trackThickness);
        height = (this.type === 'Linear' && thickness > (height - padding)) ? thickness + padding : height;
        this.progressSize.width = stringToNumber(this.width, containerWidth) || containerWidth || width;
        this.progressSize.height = stringToNumber(this.height, containerHeight) || containerHeight || height;
        this.progressRect.x = this.margin.left;
        this.progressRect.y = this.margin.top;
        this.progressRect.width = this.progressSize.width - (this.margin.left + this.margin.right);
        this.progressRect.height = this.progressSize.height - (this.margin.top + this.margin.bottom);
        this.initialClipRect = new Rect(this.progressRect.x, this.progressRect.y, this.progressSize.height, this.progressSize.width);
    };
    /**
     * Render Annotation in progress bar.
     *
     * @returns {void}
     */
    ProgressBar.prototype.renderAnnotations = function () {
        this.renderAnnotation();
    };
    /**
     * Render SVG Element.
     *
     * @returns {void}
     */
    ProgressBar.prototype.renderElements = function () {
        this.createSecondaryElement();
        this.renderTrack();
        this.renderProgress();
        this.renderLabel();
        if (this.annotations.length > 0) {
            this.renderAnnotations();
        }
        this.setSecondaryElementPosition();
        if (this.tooltip.enable && !(this.tooltip.showTooltipOnHover)) {
            this.progressTooltipModule.tooltip();
        }
    };
    ProgressBar.prototype.createSecondaryElement = function () {
        var secElement = document.getElementById(this.element.id + 'Secondary_Element');
        if (this.tooltip.enable) {
            this.tooltipElement = createElement('div', {
                id: this.element.id + '_tooltip',
                className: 'ejSVGTooltip',
                styles: 'pointer-events: none; position: absolute; zIndex: 1; visibility: visible'
            });
            if (secElement) {
                this.secElement.appendChild(this.tooltipElement);
            }
        }
        var tooltipElement = document.getElementById(this.element.id + '_tooltip');
        if (secElement) {
            secElement.innerHTML = '';
            this.secElement = tooltipElement ? secElement.appendChild(tooltipElement) : secElement;
            return;
        }
        this.secElement = createElement('div', {
            id: this.element.id + 'Secondary_Element',
            styles: 'position: absolute'
        });
        this.element.appendChild(this.secElement);
        if (this.tooltipElement) {
            this.secElement.appendChild(this.tooltipElement);
        }
    };
    /**
     * To set the left and top position for annotation for center aligned.
     *
     * @returns {void}
     */
    ProgressBar.prototype.setSecondaryElementPosition = function () {
        var element = this.secElement;
        var rect = this.element.getBoundingClientRect();
        if (getElement$1(this.svgObject.id)) {
            var svgRect = getElement$1(this.svgObject.id).getBoundingClientRect();
            element.style.left = Math.max(svgRect.left - rect.left, 0) + 'px';
            element.style.top = Math.max(svgRect.top - rect.top, 0) + 'px';
        }
    };
    ProgressBar.prototype.createSVG = function () {
        this.removeSvg();
        this.renderer = new SvgRenderer(this.element.id);
        this.svgObject = this.renderer.createSvg({
            id: this.element.id + 'SVG',
            width: this.progressSize.width,
            height: this.progressSize.height,
            style: 'background-color:' + this.themeStyle.backgroundColor
        });
    };
    ProgressBar.prototype.clipPathElement = function () {
        this.clipPath = this.renderer.createClipPath({ 'id': this.element.id + '_clippath' });
        this.bufferClipPath = this.renderer.createClipPath({ 'id': this.element.id + '_clippathBuffer' });
    };
    ProgressBar.prototype.renderTrack = function () {
        if (this.type === 'Linear') {
            this.linear.renderLinearTrack();
        }
        else if (this.type === 'Circular') {
            this.circular.renderCircularTrack();
        }
    };
    ProgressBar.prototype.renderProgress = function () {
        this.clipPathElement();
        if (this.type === 'Linear') {
            this.linear.renderLinearProgress();
        }
        else if (this.type === 'Circular') {
            this.circular.renderCircularProgress();
        }
    };
    ProgressBar.prototype.renderLabel = function () {
        if (this.type === 'Linear' && this.showProgressValue && !this.isIndeterminate) {
            this.linear.renderLinearLabel();
        }
        else if (this.type === 'Circular' && this.showProgressValue && !this.isIndeterminate) {
            this.circular.renderCircularLabel();
        }
        this.element.appendChild(this.svgObject);
    };
    ProgressBar.prototype.getPathLine = function (x, width, thickness) {
        var moveTo = (this.enableRtl) ? ((this.cornerRadius === 'Round') ?
            (x + this.progressRect.width) - ((lineCapRadius / 2) * thickness) : (x + this.progressRect.width)) :
            ((this.cornerRadius === 'Round') ? (x + (lineCapRadius / 2) * thickness) : x);
        //TODO : BLAZ-14309 - ProgressBar renders improperly when corner radius is set to "Round" and the value between one to four.
        thickness = width < thickness && this.cornerRadius === 'Round' ? width : thickness;
        var lineTo = (this.enableRtl) ? ((this.cornerRadius === 'Round' && width) ?
            (moveTo - width + (lineCapRadius * thickness)) : (moveTo - width)) :
            ((this.cornerRadius === 'Round' && width) ? (moveTo + width - (lineCapRadius * thickness)) : (moveTo + width));
        return 'M' + moveTo + ' ' + (this.progressRect.y + (this.progressRect.height / 2)) +
            'L' + lineTo + ' ' + (this.progressRect.y + (this.progressRect.height / 2));
    };
    ProgressBar.prototype.calculateProgressRange = function (value, minimum, maximum) {
        var min = minimum || this.minimum;
        var max = maximum || this.maximum;
        var endValue = (value - min) / (max - min) * ((this.type === 'Linear') ? 1 : this.totalAngle);
        var result = (value < min || value > max) ? 0 : endValue;
        return result;
    };
    ProgressBar.prototype.calculateSegmentSize = function (width, thickness) {
        var count = (this.type === 'Circular' && this.totalAngle === completeAngle) ? this.segmentCount : this.segmentCount - 1;
        var cornerCount = (this.totalAngle === completeAngle || this.type === 'Linear') ? this.segmentCount : this.segmentCount - 1;
        var gap = this.gapWidth || ((this.type === 'Linear') ? this.themeStyle.linearGapWidth : this.themeStyle.circularGapWidth);
        var size = (width - count * gap);
        size = (size - ((this.cornerRadius === 'Round') ? (cornerCount * (lineCapRadius * thickness)) : 0)) / this.segmentCount;
        gap += (this.cornerRadius === 'Round') ? lineCapRadius * thickness : 0;
        return ' ' + size + ' ' + gap;
    };
    ProgressBar.prototype.createClipPath = function (clipPath, range, d, refresh, thickness, isLabel, isMaximum) {
        var path;
        var rect;
        var option;
        var posx;
        var posy;
        var pathWidth;
        var x = this.progressRect.x;
        var totalWidth = this.progressRect.width;
        if (this.type === 'Linear') {
            if (this.cornerRadius === 'Round4px') {
                posx = x;
                pathWidth = totalWidth * range;
                posx += (!isLabel) ? (-4) : 0;
                posy = this.progressRect.y;
                pathWidth += ((!isLabel && isMaximum) || this.isIndeterminate) ? 4 : 0;
            }
            else {
                //TODO : BLAZ-14309 - ProgressBar renders improperly when corner radius is set to "Round" and the value between one to four.
                posx = (this.enableRtl && !isLabel) ? (x + totalWidth + (this.cornerRadius === 'Round' ? thickness / 10 : 0)) : x - (this.cornerRadius === 'Round' ? thickness / 10 : 0);
                pathWidth = totalWidth * range;
                //TODO : BLAZ-14309 - ProgressBar renders improperly when corner radius is set to "Round" and the value between one to four.
                //posx += (this.cornerRadius === 'Round' && !isLabel) ?
                //    ((this.enableRtl) ? (lineCapRadius / 2) * thickness : -(lineCapRadius / 2) * thickness) : 0;
                posy = (this.progressRect.y + (this.progressRect.height / 2)) - (thickness / 2);
                pathWidth += (this.cornerRadius === 'Round' && !isLabel) ? (lineCapRadius * thickness) : 0;
            }
            if (!refresh) {
                rect = new RectOption(this.element.id + '_clippathrect' + (isLabel ? 'label' : ''), 'transparent', 1, 'transparent', 1, new Rect(posx, posy, thickness, pathWidth));
                path = this.renderer.drawRectangle(rect);
                clipPath.appendChild(path);
            }
            else {
                path = getElement$1(this.element.id + '_clippathrect' + (isLabel ? 'label' : ''));
                path.setAttribute('width', (pathWidth).toString());
                if (this.isActive) {
                    path.setAttribute('x', (posx).toString());
                }
            }
        }
        else {
            if (!refresh) {
                option = new PathOption(this.element.id + '_clippathcircle', 'transparent', 10, 'transparent', 1, '0', d);
                path = this.renderer.drawPath(option);
                clipPath.appendChild(path);
            }
            else {
                path = getElement$1(this.element.id + '_clippathcircle');
                path.setAttribute('d', d);
            }
        }
        return path;
    };
    /**
     * Theming for progress bar.
     *
     * @returns {void}
     */
    ProgressBar.prototype.setTheme = function () {
        this.themeStyle = getProgressThemeColor(this.theme);
        switch (this.theme) {
            case 'Bootstrap':
            case 'Bootstrap4':
                this.cornerRadius = this.cornerRadius === 'Auto' ?
                    ((this.type === 'Linear') ? 'Round4px' : 'Round') : this.cornerRadius;
                break;
            case 'Fluent2':
            case 'Fluent2Dark':
            case 'Fluent2HighContrast':
            case 'Bootstrap5':
            case 'Bootstrap5Dark':
                this.cornerRadius = this.cornerRadius === 'Auto' && this.type === 'Linear' ? 'Round' : this.cornerRadius;
                break;
            default:
                this.cornerRadius = this.cornerRadius === 'Auto' ? 'Square' : this.cornerRadius;
        }
    };
    /**
     * Annotation for progress bar.
     *
     * @returns {void}
     */
    ProgressBar.prototype.renderAnnotation = function () {
        if (this.progressAnnotationModule && this.annotations.length > 0) {
            this.progressAnnotationModule.renderAnnotations(this.secElement);
        }
    };
    /**
     * Handles the progressbar resize.
     *
     * @returns {boolean} false
     * @private
     */
    ProgressBar.prototype.progressResize = function () {
        var _this = this;
        // 800 used as buffer time for resize event preventing from control rendered time
        if (!(new Date().getTime() > this.controlRenderedTimeStamp + 800)) {
            return false;
        }
        var arg = {
            bar: this,
            name: 'resized',
            currentSize: new Size(0, 0),
            previousSize: new Size(this.progressSize.width, this.progressSize.height),
            cancel: (this.cancelResize) ? true : false
        };
        if (this.resizeTo) {
            clearTimeout(this.resizeTo);
        }
        this.resizeTo = setTimeout(function () {
            if (_this.isDestroyed) {
                clearTimeout(_this.resizeTo);
                return;
            }
            arg.currentSize = _this.progressSize;
            _this.trigger('resized', arg);
            if ((_this.width === null || _this.height === null || _this.width.indexOf('%') > -1 || _this.height.indexOf('%') > -1)
                && !arg.cancel) {
                if (_this.secElement) {
                    _this.secElement.innerHTML = '';
                }
                _this.calculateProgressBarSize();
                _this.createSVG();
                _this.renderElements();
            }
        }, 500);
        return false;
    };
    ProgressBar.prototype.progressMouseClick = function (e) {
        this.mouseEvent(mouseClick, e);
    };
    ProgressBar.prototype.progressMouseDown = function (e) {
        this.mouseEvent(mouseDown, e);
    };
    ProgressBar.prototype.progressMouseMove = function (e) {
        this.mouseEvent(mouseMove, e);
        var target = e.target;
        if (this.tooltip.enable && this.tooltip.showTooltipOnHover) {
            if (target.id.indexOf('Circularprogress') >= 0 || target.id.indexOf('Circularbuffer') >= 0 || target.id.indexOf('Linearprogress') >= 0 || target.id.indexOf('Linearbuffer') >= 0 || target.id.indexOf('Linearbuffer') >= 0) {
                this.progressTooltipModule.tooltip(e);
            }
            else if (this.progressTooltipModule.isRendered) {
                this.progressTooltipModule.removeTooltip(1000);
                this.progressTooltipModule.isRendered = false;
            }
        }
    };
    ProgressBar.prototype.progressMouseUp = function (e) {
        this.mouseEvent(mouseUp, e);
    };
    ProgressBar.prototype.progressMouseLeave = function (e) {
        this.mouseEvent(mouseLeave, e);
    };
    ProgressBar.prototype.mouseEvent = function (eventName, e) {
        var element = e.target;
        this.trigger(eventName, { target: element.id });
    };
    /**
     * Method to un-bind events for progress bar.
     *
     * @returns {void}
     */
    ProgressBar.prototype.unWireEvents = function () {
        var startEvent = Browser.touchStartEvent;
        var moveEvent = Browser.touchMoveEvent;
        var stopEvent = Browser.touchEndEvent;
        /*! Find the Events type */
        var cancelEvent = Browser.isPointer ? 'pointerleave' : 'mouseleave';
        /*! UnBind the Event handler */
        EventHandler.remove(this.element, 'click', this.progressMouseClick);
        EventHandler.remove(this.element, startEvent, this.progressMouseDown);
        EventHandler.remove(this.element, moveEvent, this.progressMouseMove);
        EventHandler.remove(this.element, stopEvent, this.progressMouseUp);
        EventHandler.remove(this.element, cancelEvent, this.progressMouseLeave);
        window.removeEventListener((Browser.isTouch && ('orientation' in window && 'onorientationchange' in window)) ? 'orientationchange' : 'resize', this.resizeBounds);
    };
    /**
     * Method to bind events for bullet chart.
     *
     * @returns {void}
     */
    ProgressBar.prototype.wireEvents = function () {
        var startEvent = Browser.touchStartEvent;
        var moveEvent = Browser.touchMoveEvent;
        var stopEvent = Browser.touchEndEvent;
        /*! Find the Events type */
        var cancelEvent = Browser.isPointer ? 'pointerleave' : 'mouseleave';
        /*! Bind the Event handler */
        EventHandler.add(this.element, 'click', this.progressMouseClick, this);
        EventHandler.add(this.element, startEvent, this.progressMouseDown, this);
        EventHandler.add(this.element, moveEvent, this.progressMouseMove, this);
        EventHandler.add(this.element, stopEvent, this.progressMouseUp, this);
        EventHandler.add(this.element, cancelEvent, this.progressMouseLeave, this);
        this.resizeBounds = this.progressResize.bind(this);
        window.addEventListener((Browser.isTouch && ('orientation' in window && 'onorientationchange' in window)) ? 'orientationchange' : 'resize', this.resizeBounds);
    };
    ProgressBar.prototype.removeSvg = function () {
        var svgElement = document.getElementById(this.element.id + 'SVG');
        if (svgElement) {
            remove(svgElement);
        }
    };
    ProgressBar.prototype.onPropertyChanged = function (newProp, oldProp) {
        for (var _i = 0, _a = Object.keys(newProp); _i < _a.length; _i++) {
            var prop = _a[_i];
            switch (prop) {
                case 'annotations':
                    this.secElement.innerHTML = '';
                    this.renderAnnotation();
                    break;
                case 'value':
                    this.cancelResize = (this.animation.enable) ? true : false;
                    this.argsData = {
                        value: this.value,
                        progressColor: this.argsData.progressColor,
                        trackColor: this.argsData.trackColor
                    };
                    if (this.argsData.value < oldProp.value && this.animation.enable) {
                        this.argsData.value = oldProp.value;
                    }
                    if (this.argsData.value === this.maximum) {
                        this.trigger(progressCompleted, this.argsData);
                    }
                    else {
                        this.trigger(valueChanged, this.argsData);
                    }
                    if (this.type === 'Circular') {
                        this.circular.renderCircularProgress(this.previousEndAngle, this.previousTotalEnd, !isNullOrUndefined(oldProp.value));
                        if (this.showProgressValue) {
                            this.circular.renderCircularLabel(true);
                        }
                        if (this.progressAnnotationModule && this.animation.enable && !this.isIndeterminate) {
                            this.annotateAnimation.doAnnotationAnimation(this.clipPath, this, this.annotateEnd, this.annotateTotal);
                        }
                    }
                    else {
                        this.linear.renderLinearProgress(!isNullOrUndefined(oldProp.value), this.previousWidth);
                        if (this.showProgressValue) {
                            this.linear.renderLinearLabel(true);
                        }
                    }
                    if (this.progressTooltipModule) {
                        this.progressTooltipModule.tooltip();
                    }
                    this.element.setAttribute('aria-valuenow', this.argsData.value ? this.argsData.value.toString() : '0');
                    break;
                case 'animation':
                    this.createSVG();
                    this.renderElements();
                    break;
            }
        }
    };
    ProgressBar.prototype.requiredModules = function () {
        var modules = [];
        var enableAnnotation = false;
        enableAnnotation = this.annotations.some(function (value) {
            return (value.content !== null);
        });
        if (enableAnnotation) {
            modules.push({
                member: 'ProgressAnnotation',
                args: [this]
            });
        }
        if (this.tooltip.enable) {
            modules.push({
                member: 'ProgressTooltip',
                args: [this]
            });
        }
        return modules;
    };
    ProgressBar.prototype.getPersistData = function () {
        return ' ';
    };
    ProgressBar.prototype.show = function () {
        if (!isNullOrUndefined(this.svgObject)) {
            this.svgObject.setAttribute('visibility', 'Visible');
            if (this.isIndeterminate) {
                this.destroyIndeterminate = false;
                if (this.type === 'Linear') {
                    this.linear.renderLinearProgress(true);
                }
                else {
                    this.circular.renderCircularProgress(null, null, true);
                }
            }
        }
    };
    ProgressBar.prototype.hide = function () {
        if (!isNullOrUndefined(this.svgObject)) {
            this.svgObject.setAttribute('visibility', 'Hidden');
            if (this.isIndeterminate) {
                this.destroyIndeterminate = true;
            }
        }
    };
    /**
     * To destroy the widget.
     *
     * @returns {void}
     */
    ProgressBar.prototype.destroy = function () {
        this.unWireEvents();
        _super.prototype.destroy.call(this);
        this.removeSvg();
        if (this.isReact) {
            this.clearTemplate();
        }
        this.svgObject = null;
        this.element.classList.remove('e-progressbar');
        if (!this.refreshing) {
            this.destroyIndeterminate = true;
        }
    };
    var ProgressBar_1;
    __decorate$1([
        Property('Linear')
    ], ProgressBar.prototype, "type", void 0);
    __decorate$1([
        Property(null)
    ], ProgressBar.prototype, "value", void 0);
    __decorate$1([
        Property(null)
    ], ProgressBar.prototype, "secondaryProgress", void 0);
    __decorate$1([
        Property('')
    ], ProgressBar.prototype, "secondaryProgressColor", void 0);
    __decorate$1([
        Property(null)
    ], ProgressBar.prototype, "secondaryProgressThickness", void 0);
    __decorate$1([
        Property(0)
    ], ProgressBar.prototype, "minimum", void 0);
    __decorate$1([
        Property(100)
    ], ProgressBar.prototype, "maximum", void 0);
    __decorate$1([
        Property(0)
    ], ProgressBar.prototype, "startAngle", void 0);
    __decorate$1([
        Property(0)
    ], ProgressBar.prototype, "endAngle", void 0);
    __decorate$1([
        Property('100%')
    ], ProgressBar.prototype, "radius", void 0);
    __decorate$1([
        Property('100%')
    ], ProgressBar.prototype, "innerRadius", void 0);
    __decorate$1([
        Property(1)
    ], ProgressBar.prototype, "segmentCount", void 0);
    __decorate$1([
        Property(null)
    ], ProgressBar.prototype, "gapWidth", void 0);
    __decorate$1([
        Property('')
    ], ProgressBar.prototype, "segmentColor", void 0);
    __decorate$1([
        Property('Auto')
    ], ProgressBar.prototype, "cornerRadius", void 0);
    __decorate$1([
        Property(null)
    ], ProgressBar.prototype, "height", void 0);
    __decorate$1([
        Property(null)
    ], ProgressBar.prototype, "width", void 0);
    __decorate$1([
        Property(false)
    ], ProgressBar.prototype, "isIndeterminate", void 0);
    __decorate$1([
        Property(false)
    ], ProgressBar.prototype, "isActive", void 0);
    __decorate$1([
        Property(false)
    ], ProgressBar.prototype, "isGradient", void 0);
    __decorate$1([
        Property(false)
    ], ProgressBar.prototype, "isStriped", void 0);
    __decorate$1([
        Property('Auto')
    ], ProgressBar.prototype, "role", void 0);
    __decorate$1([
        Property(false)
    ], ProgressBar.prototype, "enableRtl", void 0);
    __decorate$1([
        Property(true)
    ], ProgressBar.prototype, "labelOnTrack", void 0);
    __decorate$1([
        Property(null)
    ], ProgressBar.prototype, "trackColor", void 0);
    __decorate$1([
        Property(null)
    ], ProgressBar.prototype, "progressColor", void 0);
    __decorate$1([
        Property(0)
    ], ProgressBar.prototype, "trackThickness", void 0);
    __decorate$1([
        Property(0)
    ], ProgressBar.prototype, "progressThickness", void 0);
    __decorate$1([
        Property(false)
    ], ProgressBar.prototype, "enablePieProgress", void 0);
    __decorate$1([
        Property('Fabric')
    ], ProgressBar.prototype, "theme", void 0);
    __decorate$1([
        Property(false)
    ], ProgressBar.prototype, "showProgressValue", void 0);
    __decorate$1([
        Property(false)
    ], ProgressBar.prototype, "enableProgressSegments", void 0);
    __decorate$1([
        Complex({ size: null, color: null, fontStyle: null, fontWeight: null, fontFamily: null }, Font)
    ], ProgressBar.prototype, "labelStyle", void 0);
    __decorate$1([
        Complex({}, Margin)
    ], ProgressBar.prototype, "margin", void 0);
    __decorate$1([
        Complex({}, Animation)
    ], ProgressBar.prototype, "animation", void 0);
    __decorate$1([
        Complex({}, TooltipSettings)
    ], ProgressBar.prototype, "tooltip", void 0);
    __decorate$1([
        Event()
    ], ProgressBar.prototype, "load", void 0);
    __decorate$1([
        Event()
    ], ProgressBar.prototype, "textRender", void 0);
    __decorate$1([
        Event()
    ], ProgressBar.prototype, "loaded", void 0);
    __decorate$1([
        Event()
    ], ProgressBar.prototype, "valueChanged", void 0);
    __decorate$1([
        Event()
    ], ProgressBar.prototype, "progressCompleted", void 0);
    __decorate$1([
        Event()
    ], ProgressBar.prototype, "animationComplete", void 0);
    __decorate$1([
        Event()
    ], ProgressBar.prototype, "mouseClick", void 0);
    __decorate$1([
        Event()
    ], ProgressBar.prototype, "mouseMove", void 0);
    __decorate$1([
        Event()
    ], ProgressBar.prototype, "mouseUp", void 0);
    __decorate$1([
        Event()
    ], ProgressBar.prototype, "mouseDown", void 0);
    __decorate$1([
        Event()
    ], ProgressBar.prototype, "mouseLeave", void 0);
    __decorate$1([
        Event()
    ], ProgressBar.prototype, "tooltipRender", void 0);
    __decorate$1([
        Collection([{}], ProgressAnnotationSettings)
    ], ProgressBar.prototype, "annotations", void 0);
    __decorate$1([
        Collection([{}], RangeColor)
    ], ProgressBar.prototype, "rangeColors", void 0);
    ProgressBar = ProgressBar_1 = __decorate$1([
        NotifyPropertyChanges
    ], ProgressBar);
    return ProgressBar;
}(Component));

export { Animation, Border, ColorValue, Font, Margin, Pos, ProgressAnimation, ProgressAnnotation, ProgressAnnotationSettings, ProgressBar, ProgressLocation, ProgressTooltip, RangeColor, Rect, RectOption, Size, TextOption, TooltipSettings, annotationRender, colorNameToHex, componentToHex, convertHexToColor, convertToHexCode, degreeToLocation, effect, getElement, getPathArc, removeElement, setAttributes, stringToNumber };
//# sourceMappingURL=ej2-progressbar.es5.js.map
