import { Property, ChildProperty, Complex, Collection, isNullOrUndefined, createElement, remove, compile, merge, Animation, animationMode, SanitizeHtmlHelper, Browser, Internationalization, EventHandler, Event, NotifyPropertyChanges, Component, print } from '@syncfusion/ej2-base';
import { SvgRenderer, Tooltip } from '@syncfusion/ej2-svg-base';
import { PdfPageOrientation, PdfDocument, PdfBitmap } from '@syncfusion/ej2-pdf-export';

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
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * Sets and gets the options for customizing the fonts.
 */
var Font = /** @class */ (function (_super) {
    __extends(Font, _super);
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
        Property('Segoe UI')
    ], Font.prototype, "fontFamily", void 0);
    __decorate([
        Property('Regular')
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
 * Defines the font properties such as font-size, font family and others for the text pointer.
 */
var TextStyle = /** @class */ (function (_super) {
    __extends(TextStyle, _super);
    function TextStyle() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property('16px')
    ], TextStyle.prototype, "size", void 0);
    __decorate([
        Property('')
    ], TextStyle.prototype, "fontFamily", void 0);
    __decorate([
        Property('normal')
    ], TextStyle.prototype, "fontWeight", void 0);
    __decorate([
        Property('normal')
    ], TextStyle.prototype, "fontStyle", void 0);
    return TextStyle;
}(ChildProperty));
/**
 * Sets and gets the margin for the linear gauge.
 */
var Margin = /** @class */ (function (_super) {
    __extends(Margin, _super);
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
 * Sets and gets the options to customize the style properties of the border for the linear gauge.
 */
var Border = /** @class */ (function (_super) {
    __extends(Border, _super);
    function Border() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property(null)
    ], Border.prototype, "color", void 0);
    __decorate([
        Property(0)
    ], Border.prototype, "width", void 0);
    __decorate([
        Property('')
    ], Border.prototype, "dashArray", void 0);
    return Border;
}(ChildProperty));
/**
 * Sets and gets the options for customizing the annotation in linear gauge.
 */
var Annotation = /** @class */ (function (_super) {
    __extends(Annotation, _super);
    function Annotation() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property('')
    ], Annotation.prototype, "content", void 0);
    __decorate([
        Property(0)
    ], Annotation.prototype, "x", void 0);
    __decorate([
        Property(0)
    ], Annotation.prototype, "y", void 0);
    __decorate([
        Property('None')
    ], Annotation.prototype, "verticalAlignment", void 0);
    __decorate([
        Property('None')
    ], Annotation.prototype, "horizontalAlignment", void 0);
    __decorate([
        Property('-1')
    ], Annotation.prototype, "zIndex", void 0);
    __decorate([
        Complex({ size: '12px', color: null }, Font)
    ], Annotation.prototype, "font", void 0);
    __decorate([
        Property(null)
    ], Annotation.prototype, "axisIndex", void 0);
    __decorate([
        Property(null)
    ], Annotation.prototype, "axisValue", void 0);
    return Annotation;
}(ChildProperty));
/**
 * Sets and gets the options for customizing the container of linear gauge.
 */
var Container = /** @class */ (function (_super) {
    __extends(Container, _super);
    function Container() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property('Normal')
    ], Container.prototype, "type", void 0);
    __decorate([
        Property(0)
    ], Container.prototype, "height", void 0);
    __decorate([
        Property(0)
    ], Container.prototype, "width", void 0);
    __decorate([
        Property(10)
    ], Container.prototype, "roundedCornerRadius", void 0);
    __decorate([
        Property('transparent')
    ], Container.prototype, "backgroundColor", void 0);
    __decorate([
        Complex({ width: 1, color: null }, Border)
    ], Container.prototype, "border", void 0);
    __decorate([
        Property(0)
    ], Container.prototype, "offset", void 0);
    return Container;
}(ChildProperty));
/**
 * Sets and gets the options to customize the tooltip for range in axis.
 */
var RangeTooltip = /** @class */ (function (_super) {
    __extends(RangeTooltip, _super);
    function RangeTooltip() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property(null)
    ], RangeTooltip.prototype, "fill", void 0);
    __decorate([
        Complex({ size: null, opacity: null, fontFamily: null, fontWeight: null }, Font)
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
        Complex({ color: null, width: null }, Border)
    ], RangeTooltip.prototype, "border", void 0);
    __decorate([
        Property('End')
    ], RangeTooltip.prototype, "position", void 0);
    __decorate([
        Property(false)
    ], RangeTooltip.prototype, "showAtMousePosition", void 0);
    return RangeTooltip;
}(ChildProperty));
/**
 * Sets and gets the options for customizing the tooltip in linear gauge.
 */
var TooltipSettings = /** @class */ (function (_super) {
    __extends(TooltipSettings, _super);
    function TooltipSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property(false)
    ], TooltipSettings.prototype, "enable", void 0);
    __decorate([
        Property('')
    ], TooltipSettings.prototype, "fill", void 0);
    __decorate([
        Complex({ color: '', size: null, opacity: null, fontFamily: null, fontWeight: null }, Font)
    ], TooltipSettings.prototype, "textStyle", void 0);
    __decorate([
        Property(null)
    ], TooltipSettings.prototype, "format", void 0);
    __decorate([
        Property(false)
    ], TooltipSettings.prototype, "showAtMousePosition", void 0);
    __decorate([
        Complex({}, RangeTooltip)
    ], TooltipSettings.prototype, "rangeSettings", void 0);
    __decorate([
        Property('End')
    ], TooltipSettings.prototype, "position", void 0);
    __decorate([
        Property(null)
    ], TooltipSettings.prototype, "template", void 0);
    __decorate([
        Property(true)
    ], TooltipSettings.prototype, "enableAnimation", void 0);
    __decorate([
        Complex({ color: null, width: null }, Border)
    ], TooltipSettings.prototype, "border", void 0);
    __decorate([
        Property('Pointer')
    ], TooltipSettings.prototype, "type", void 0);
    return TooltipSettings;
}(ChildProperty));

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
var __decorate$1 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/** Sets and gets the options for customizing the appearance of axis line in linear gauge. */
var Line = /** @class */ (function (_super) {
    __extends$1(Line, _super);
    function Line() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate$1([
        Property('')
    ], Line.prototype, "dashArray", void 0);
    __decorate$1([
        Property(null)
    ], Line.prototype, "height", void 0);
    __decorate$1([
        Property(2)
    ], Line.prototype, "width", void 0);
    __decorate$1([
        Property(null)
    ], Line.prototype, "color", void 0);
    __decorate$1([
        Property(0)
    ], Line.prototype, "offset", void 0);
    return Line;
}(ChildProperty));
/**
 * Sets and gets the options for customizing the appearance of the axis labels.
 */
var Label = /** @class */ (function (_super) {
    __extends$1(Label, _super);
    function Label() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate$1([
        Complex({ size: '12px', color: null, fontStyle: null, fontWeight: null, fontFamily: null }, Font)
    ], Label.prototype, "font", void 0);
    __decorate$1([
        Property(false)
    ], Label.prototype, "useRangeColor", void 0);
    __decorate$1([
        Property('')
    ], Label.prototype, "format", void 0);
    __decorate$1([
        Property(0)
    ], Label.prototype, "offset", void 0);
    __decorate$1([
        Property('Auto')
    ], Label.prototype, "position", void 0);
    return Label;
}(ChildProperty));
/**
 * Sets and gets the options for customizing the ranges of an axis.
 */
var Range = /** @class */ (function (_super) {
    __extends$1(Range, _super);
    function Range() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate$1([
        Property(0)
    ], Range.prototype, "start", void 0);
    __decorate$1([
        Property(0)
    ], Range.prototype, "end", void 0);
    __decorate$1([
        Property(null)
    ], Range.prototype, "linearGradient", void 0);
    __decorate$1([
        Property(null)
    ], Range.prototype, "radialGradient", void 0);
    __decorate$1([
        Property('Outside')
    ], Range.prototype, "position", void 0);
    __decorate$1([
        Property('')
    ], Range.prototype, "color", void 0);
    __decorate$1([
        Property(10)
    ], Range.prototype, "startWidth", void 0);
    __decorate$1([
        Property(10)
    ], Range.prototype, "endWidth", void 0);
    __decorate$1([
        Property(0)
    ], Range.prototype, "offset", void 0);
    __decorate$1([
        Complex({ color: '#000000', width: 0 }, Border)
    ], Range.prototype, "border", void 0);
    return Range;
}(ChildProperty));
/**
 * Sets and gets the options for customizing the minor tick lines in axis.
 */
var Tick = /** @class */ (function (_super) {
    __extends$1(Tick, _super);
    function Tick() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate$1([
        Property(20)
    ], Tick.prototype, "height", void 0);
    __decorate$1([
        Property(2)
    ], Tick.prototype, "width", void 0);
    __decorate$1([
        Property(null)
    ], Tick.prototype, "interval", void 0);
    __decorate$1([
        Property(null)
    ], Tick.prototype, "color", void 0);
    __decorate$1([
        Property(null)
    ], Tick.prototype, "offset", void 0);
    __decorate$1([
        Property('Auto')
    ], Tick.prototype, "position", void 0);
    return Tick;
}(ChildProperty));
/**
 * Sets and gets the options for customizing the pointers of an axis in linear gauge.
 */
var Pointer = /** @class */ (function (_super) {
    __extends$1(Pointer, _super);
    function Pointer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /** @private */
        _this.animationComplete = true;
        /** @private */
        _this.isPointerAnimation = true;
        /** @private */
        _this.currentValue = null;
        return _this;
    }
    __decorate$1([
        Property('Marker')
    ], Pointer.prototype, "type", void 0);
    __decorate$1([
        Property(null)
    ], Pointer.prototype, "linearGradient", void 0);
    __decorate$1([
        Property(null)
    ], Pointer.prototype, "radialGradient", void 0);
    __decorate$1([
        Property(null)
    ], Pointer.prototype, "value", void 0);
    __decorate$1([
        Property('InvertedTriangle')
    ], Pointer.prototype, "markerType", void 0);
    __decorate$1([
        Property(null)
    ], Pointer.prototype, "imageUrl", void 0);
    __decorate$1([
        Complex({ color: '#808080' }, Border)
    ], Pointer.prototype, "border", void 0);
    __decorate$1([
        Property(10)
    ], Pointer.prototype, "roundedCornerRadius", void 0);
    __decorate$1([
        Property('Far')
    ], Pointer.prototype, "placement", void 0);
    __decorate$1([
        Property(20)
    ], Pointer.prototype, "height", void 0);
    __decorate$1([
        Property(20)
    ], Pointer.prototype, "width", void 0);
    __decorate$1([
        Property(null)
    ], Pointer.prototype, "color", void 0);
    __decorate$1([
        Property(1)
    ], Pointer.prototype, "opacity", void 0);
    __decorate$1([
        Property(0)
    ], Pointer.prototype, "animationDuration", void 0);
    __decorate$1([
        Property(false)
    ], Pointer.prototype, "enableDrag", void 0);
    __decorate$1([
        Property(0)
    ], Pointer.prototype, "offset", void 0);
    __decorate$1([
        Property('Auto')
    ], Pointer.prototype, "position", void 0);
    __decorate$1([
        Property(null)
    ], Pointer.prototype, "description", void 0);
    __decorate$1([
        Property('')
    ], Pointer.prototype, "text", void 0);
    __decorate$1([
        Complex({ size: '16px', fontStyle: 'normal', fontWeight: 'normal', fontFamily: null }, TextStyle)
    ], Pointer.prototype, "textStyle", void 0);
    return Pointer;
}(ChildProperty));
/**
 * Sets and gets the options for customizing the axis of a gauge.
 */
var Axis = /** @class */ (function (_super) {
    __extends$1(Axis, _super);
    function Axis() {
        /**
         * Sets and gets the minimum value for the axis.
         *
         * @default 0
         */
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /** @private */
        _this.visibleLabels = [];
        return _this;
    }
    __decorate$1([
        Property(0)
    ], Axis.prototype, "minimum", void 0);
    __decorate$1([
        Property(100)
    ], Axis.prototype, "maximum", void 0);
    __decorate$1([
        Property(false)
    ], Axis.prototype, "isInversed", void 0);
    __decorate$1([
        Property(false)
    ], Axis.prototype, "showLastLabel", void 0);
    __decorate$1([
        Property(false)
    ], Axis.prototype, "opposedPosition", void 0);
    __decorate$1([
        Complex({}, Line)
    ], Axis.prototype, "line", void 0);
    __decorate$1([
        Collection([{}], Range)
    ], Axis.prototype, "ranges", void 0);
    __decorate$1([
        Collection([{}], Pointer)
    ], Axis.prototype, "pointers", void 0);
    __decorate$1([
        Complex({ width: 2, height: 20 }, Tick)
    ], Axis.prototype, "majorTicks", void 0);
    __decorate$1([
        Complex({ width: 1, height: 10 }, Tick)
    ], Axis.prototype, "minorTicks", void 0);
    __decorate$1([
        Complex({}, Label)
    ], Axis.prototype, "labelStyle", void 0);
    return Axis;
}(ChildProperty));

/**
 * Specifies the linear gauge constant value
 */
/** @private */
var loaded = 'loaded';
/** @private */
var load = 'load';
/** @private */
var animationComplete = 'animationComplete';
/** @private */
var axisLabelRender = 'axisLabelRender';
/** @private */
var tooltipRender = 'tooltipRender';
/** @private */
var annotationRender = 'annotationRender';
/** @private */
var gaugeMouseMove = 'gaugeMouseMove';
/** @private */
var gaugeMouseLeave = 'gaugeMouseLeave';
/** @private */
var gaugeMouseDown = 'gaugeMouseDown';
/** @private */
var gaugeMouseUp = 'gaugeMouseUp';
/** @private */
var dragStart = 'dragStart';
/** @private */
var dragMove = 'dragMove';
/** @private */
var dragEnd = 'dragEnd';
/** @private */
var valueChange = 'valueChange';
/** @private */
var resized = 'resized';
/** @private */
var beforePrint = 'beforePrint';

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
 * Specifies Linear-Gauge Helper methods
 */
/** @private */
function stringToNumber(value, containerSize) {
    return value.indexOf('%') !== -1 ? (containerSize / 100) * parseInt(value, 10) : parseInt(value, 10);
}
/** @private */
function stringToNumberSize(value, containerSize) {
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
function measureText(text, font) {
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
function textTrim(maxWidth, text, font) {
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
function withInRange(value, start, end, max, min, type) {
    var withIn;
    if (type === 'pointer') {
        withIn = (((value <= max) && (value >= min)));
    }
    else {
        withIn = (start != null && (start <= max) && (start >= min)) && (end != null && (end <= max) && (end >= min));
    }
    return withIn;
}
function convertPixelToValue(parentElement, pointerElement, orientation, axis, type, location) {
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
function getPathToRect(path, size, parentElement) {
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
function getElement(id) {
    return document.getElementById(id);
}
/** @private */
function removeElement(id) {
    var element = getElement(id);
    if (element) {
        remove(element);
    }
}
/** @private */
function valueToCoefficient(value, axis, orientation, range) {
    var result = (value - range.min) / range.delta;
    result = (orientation === 'Vertical') ? (!axis.isInversed) ? (1 - result) : result : (!axis.isInversed) ? result : (1 - result);
    return result;
}
function getFontStyle(font) {
    var style = '';
    style = 'font-size:' + font.size +
        '; font-style:' + font.fontStyle + '; font-weight:' + font.fontWeight +
        '; font-family:' + font.fontFamily + ';opacity:' + font.opacity +
        '; color:' + font.color + ';';
    return style;
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function textFormatter(format, data, gauge) {
    var keys = Object.keys(data);
    for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
        var key = keys_1[_i];
        format = format.split('{' + key + '}').join(formatValue(data[key], gauge).toString());
    }
    return format;
}
function formatValue(value, gauge) {
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
function getTemplateFunction(template, gauge) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    var templateFn = null;
    try {
        if (typeof template === 'function') {
            templateFn = compile(template);
        }
        else if (document.querySelectorAll(template).length) {
            templateFn = compile(document.querySelector(template).innerHTML.trim());
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
/** @private */
function getElementOffset(childElement, parentElement) {
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
function triggerDownload(fileName, type, url, isDownload) {
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
var CustomizeOption = /** @class */ (function () {
    function CustomizeOption(id) {
        this.id = id;
    }
    return CustomizeOption;
}());
/** @private */
var PathOption = /** @class */ (function (_super) {
    __extends$2(PathOption, _super);
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
/** @private */
var TextOption = /** @class */ (function (_super) {
    __extends$2(TextOption, _super);
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
    function VisibleLabels(text, value, size, x, y) {
        this.text = text;
        this.value = value;
        this.size = size;
        this.x = x;
        this.y = y;
    }
    return VisibleLabels;
}());
/** @private */
var Align = /** @class */ (function () {
    function Align(axisIndex, align) {
        this.align = align;
        this.axisIndex = axisIndex;
    }
    return Align;
}());
/** @private */
function textElement(options, font, color, opacity, parent) {
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
function calculateNiceInterval(min, max, size, orientation) {
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
function getActualDesiredIntervalsCount(size, orientation) {
    var maximumLabels = 5;
    var desiredIntervalsCount = (orientation === 'Horizontal' ? 0.533 : 1) * maximumLabels;
    desiredIntervalsCount = Math.max((size * (desiredIntervalsCount / 100)), 1);
    return desiredIntervalsCount;
}
/** @private */
function getPointer(target, gauge) {
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
function getRangeColor(value, ranges) {
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
/** @private */
function getRangePalette(theme) {
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
function calculateShapes(location, shape, size, url, options, orientation, axis, pointer) {
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
function calculateTextPosition(location, shape, options, orientation, axis, pointer) {
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
function getBox(location, boxName, orientation, size, type, containerWidth, axis, cornerRadius) {
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
function getExtraWidth(gaugeElement) {
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
function showTooltip(text, gauge) {
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
function removeTooltip() {
    if (document.getElementsByClassName('EJ2-LinearGauge-Tooltip').length > 0) {
        document.getElementsByClassName('EJ2-LinearGauge-Tooltip')[0].remove();
    }
}

/* eslint-disable valid-jsdoc */
/**
 * To calculate the overall axis bounds for gauge.
 *
 * @private
 */
var AxisLayoutPanel = /** @class */ (function () {
    function AxisLayoutPanel(gauge) {
        this.gauge = gauge;
    }
    /**
     * To calculate the axis bounds
     */
    AxisLayoutPanel.prototype.calculateAxesBounds = function () {
        var axis;
        var bounds;
        this.gauge.nearSizes = [];
        this.gauge.farSizes = [];
        var x;
        var y;
        var width;
        var height;
        var axisPadding = 8;
        this.checkThermometer();
        for (var i = 0; i < this.gauge.axes.length; i++) {
            axis = this.gauge.axes[i];
            axis.checkAlign = new Align(i, ((!axis.opposedPosition) ? 'Near' : 'Far'));
            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            (!axis.opposedPosition) ? this.gauge.nearSizes.push(1) : this.gauge.farSizes.push(1);
            this.calculateLineBounds(axis, i);
            this.calculateTickBounds(axis);
            this.calculateLabelBounds(axis);
            if (axis.pointers.length > 0) {
                this.calculatePointerBounds(axis);
            }
            if (axis.ranges.length > 0) {
                this.calculateRangesBounds(axis);
            }
            bounds = axis.labelBounds;
            var offset = this.gauge.axes[i].labelStyle.offset;
            if (this.gauge.orientation === 'Vertical') {
                x = (!axis.opposedPosition) ? bounds.x - offset - axisPadding : axis.lineBounds.x;
                y = axis.lineBounds.y;
                height = axis.lineBounds.height;
                width = Math.abs((!axis.opposedPosition) ? (axis.lineBounds.x - x) :
                    ((bounds.x + bounds.width + axisPadding) - x - offset));
            }
            else {
                y = (!axis.opposedPosition) ? bounds.y - bounds.height - offset - axisPadding : axis.lineBounds.y;
                x = axis.lineBounds.x;
                width = axis.lineBounds.width;
                height = Math.abs((!axis.opposedPosition) ? Math.abs(axis.lineBounds.y - y) : (bounds.y + axisPadding) - y - offset);
            }
            axis.bounds = new Rect(x, y, width, height);
        }
    };
    /**
     * Calculate axis line bounds
     *
     * @param axis
     * @param axisIndex
     */
    AxisLayoutPanel.prototype.calculateLineBounds = function (axis, axisIndex) {
        var x;
        var y;
        var width;
        var height;
        var prevAxis;
        var lineHeight = axis.line.height;
        var orientation = this.gauge.orientation;
        var containerRect = this.gauge.containerBounds;
        lineHeight = (axis.line.width > 0) ? lineHeight : null;
        if (orientation === 'Vertical') {
            y = (isNullOrUndefined(lineHeight)) ? containerRect.y :
                containerRect.y + ((containerRect.height / 2) - (lineHeight / 2));
            width = axis.line.width;
            height = (isNullOrUndefined(lineHeight)) ? containerRect.height : lineHeight;
        }
        else {
            x = (isNullOrUndefined(lineHeight)) ? containerRect.x :
                containerRect.x + ((containerRect.width / 2) - (lineHeight / 2));
            height = axis.line.width;
            width = (isNullOrUndefined(lineHeight)) ? containerRect.width : lineHeight;
        }
        var index = this.checkPreviousAxes(axis, axisIndex);
        var count = 0;
        if (!isNullOrUndefined(index)) {
            for (var i = index; i >= 0; i--) {
                if (this.gauge.axes[i].minimum !== this.gauge.axes[i].maximum) {
                    index = i;
                    count++;
                    break;
                }
            }
            if (count === 0) {
                index = null;
            }
        }
        if (isNullOrUndefined(index)) {
            if (orientation === 'Vertical') {
                x = (!axis.opposedPosition ? containerRect.x : containerRect.x + containerRect.width) + axis.line.offset;
            }
            else {
                y = (!axis.opposedPosition ? containerRect.y : containerRect.y + containerRect.height) + axis.line.offset;
            }
        }
        else {
            prevAxis = this.gauge.axes[index];
            if (orientation === 'Vertical') {
                x = ((!axis.opposedPosition) ? prevAxis.bounds.x : (prevAxis.bounds.x + prevAxis.bounds.width)) + axis.line.offset;
            }
            else {
                y = ((!axis.opposedPosition) ? prevAxis.bounds.y : (prevAxis.bounds.y + prevAxis.bounds.height)) + axis.line.offset;
            }
        }
        axis.lineBounds = new Rect(x, y, width, height);
        if (axis.minimum === axis.maximum) {
            axis.lineBounds = new Rect(0, 0, 0, 0);
        }
    };
    /**
     * Calculate axis tick bounds
     *
     * @param axis
     */
    AxisLayoutPanel.prototype.calculateTickBounds = function (axis) {
        var x;
        var y;
        var min = Math.min(axis.minimum, axis.maximum);
        var max = Math.max(axis.minimum, axis.maximum);
        min = (min === max) ? max - 1 : min;
        var bounds = axis.lineBounds;
        var major = axis.majorTicks;
        var minor = axis.minorTicks;
        axis.majorInterval = major.interval;
        axis.minorInterval = minor.interval;
        var size = (this.gauge.orientation === 'Vertical' ? bounds.height : bounds.width);
        var lineSize = (this.gauge.orientation === 'Vertical' ? bounds.width : bounds.height) / 2;
        axis.majorInterval = isNullOrUndefined(axis.majorInterval) ? calculateNiceInterval(min, max, size, this.gauge.orientation)
            : major.interval;
        axis.visibleRange = new VisibleRange(min, max, axis.majorInterval, (max - min));
        axis.minorInterval = (isNullOrUndefined(axis.minorInterval)) ? axis.majorInterval / 2 : axis.minorInterval;
        if (this.gauge.orientation === 'Vertical') {
            x = axis.majorTicks.position === 'Auto' ? ((!axis.opposedPosition ? (bounds.x - lineSize - major.height) : bounds.x + lineSize)
                + major.offset) : x;
            x = axis.majorTicks.position !== 'Auto' ? (axis.majorTicks.position === 'Cross' ? bounds.x - major.height / 2 - major.offset :
                ((axis.majorTicks.position === 'Inside' && !axis.opposedPosition) ||
                    (axis.majorTicks.position === 'Outside' && axis.opposedPosition)) ? (bounds.x - lineSize - major.height - major.offset)
                    : (bounds.x + lineSize + major.offset)) : x;
            axis.majorTickBounds = new Rect(x, bounds.y, major.height, bounds.height);
            if (axis.minimum === axis.maximum) {
                axis.majorTickBounds = new Rect(0, 0, 0, 0);
            }
            x = axis.minorTicks.position === 'Auto' ? ((!axis.opposedPosition ? (bounds.x - lineSize - minor.height) : bounds.x + lineSize)
                + minor.offset) : x;
            x = axis.minorTicks.position !== 'Auto' ? (axis.minorTicks.position === 'Cross' ? bounds.x - minor.height / 2 - minor.offset :
                ((axis.minorTicks.position === 'Inside' && !axis.opposedPosition) ||
                    (axis.minorTicks.position === 'Outside' && axis.opposedPosition)) ? (bounds.x - lineSize - minor.height - minor.offset)
                    : (bounds.x + lineSize + minor.offset)) : x;
            axis.minorTickBounds = new Rect(x, bounds.y, minor.height, bounds.height);
            if (axis.minimum === axis.maximum) {
                axis.minorTickBounds = new Rect(0, 0, 0, 0);
            }
        }
        else {
            y = axis.majorTicks.position === 'Auto' ? ((!axis.opposedPosition ? (bounds.y - lineSize - major.height) : bounds.y + lineSize)
                + major.offset) : y;
            y = axis.majorTicks.position !== 'Auto' ? ((axis.majorTicks.position === 'Cross' ? bounds.y - major.height / 2 - major.offset :
                ((axis.majorTicks.position === 'Inside' && !axis.opposedPosition) ||
                    (axis.majorTicks.position === 'Outside' && axis.opposedPosition)) ?
                    (bounds.y - lineSize - major.height) - major.offset : bounds.y + lineSize + major.offset)) : y;
            axis.majorTickBounds = new Rect(bounds.x, y, bounds.width, major.height);
            if (axis.minimum === axis.maximum) {
                axis.majorTickBounds = new Rect(0, 0, 0, 0);
            }
            y = axis.minorTicks.position === 'Auto' ? ((!axis.opposedPosition ? (bounds.y - lineSize - minor.height) : bounds.y + lineSize)
                + minor.offset) : y;
            y = axis.minorTicks.position !== 'Auto' ? ((axis.minorTicks.position === 'Cross' ? bounds.y - minor.height / 2 - major.offset :
                ((axis.minorTicks.position === 'Inside' && !axis.opposedPosition) ||
                    (axis.minorTicks.position === 'Outside' && axis.opposedPosition)) ?
                    (bounds.y - lineSize - minor.height) - minor.offset : bounds.y + lineSize + minor.offset)) : y;
            axis.minorTickBounds = new Rect(bounds.x, y, bounds.width, minor.height);
            if (axis.minimum === axis.maximum) {
                axis.minorTickBounds = new Rect(0, 0, 0, 0);
            }
        }
    };
    /**
     * To Calculate axis label bounds
     *
     * @param axis
     */
    AxisLayoutPanel.prototype.calculateLabelBounds = function (axis) {
        var x;
        var y;
        var padding = 5;
        var applyPositionBounds = (axis.labelStyle.position !== 'Auto' && axis.majorTicks.position !== 'Auto' &&
            axis.minorTicks.position !== 'Auto');
        var bounds = applyPositionBounds ? (axis.labelStyle.position === axis.minorTicks.position &&
            axis.minorTicks.position !== axis.majorTicks.position ? axis.minorTickBounds : axis.majorTickBounds) :
            axis.majorTickBounds;
        var offset = axis.labelStyle.offset;
        this.calculateVisibleLabels(axis);
        if (axis.minimum === axis.maximum) {
            axis.labelBounds = new Rect(0, 0, 0, 0);
        }
        else {
            var width = axis.maxLabelSize.width;
            var height = axis.maxLabelSize.height / 2;
            if (this.gauge.orientation === 'Vertical') {
                x = axis.labelStyle.position === 'Auto' ? ((!axis.opposedPosition ? (bounds.x - width - padding) :
                    (bounds.x + bounds.width + padding)) + offset) : x;
                var boundx = bounds.x;
                var offsetForCross = axis.majorTicks.position === 'Cross' || axis.minorTicks.position === 'Cross' ?
                    (bounds.width > axis.lineBounds.width ? bounds.width / 2 : axis.lineBounds.width / 2) : axis.lineBounds.width / 2;
                boundx = applyPositionBounds ? ((axis.labelStyle.position !== axis.minorTicks.position &&
                    axis.labelStyle.position !== axis.majorTicks.position) ?
                    (axis.minorTicks.position !== 'Cross' && axis.majorTicks.position !== 'Cross' ? (axis.labelStyle.position === 'Inside' ?
                        bounds.x - axis.lineBounds.width : axis.labelStyle.position === 'Outside' ?
                        bounds.x + axis.lineBounds.width : bounds.x) : (axis.labelStyle.position === 'Inside' ?
                        axis.lineBounds.x - offsetForCross : axis.labelStyle.position === 'Outside' ?
                        axis.lineBounds.x - bounds.width + offsetForCross : bounds.x)) : bounds.x) : bounds.x;
                x = axis.labelStyle.position !== 'Auto' ? (axis.labelStyle.position === 'Cross' ? axis.lineBounds.x -
                    axis.maxLabelSize.width / 4 - offset : ((axis.labelStyle.position === 'Inside' && !axis.opposedPosition) ||
                    (axis.labelStyle.position === 'Outside' && axis.opposedPosition)) ?
                    ((boundx - width - padding) - offset) : ((boundx + bounds.width + padding) + offset)) : x;
                y = axis.lineBounds.y;
            }
            else {
                y = axis.labelStyle.position === 'Auto' ? ((!axis.opposedPosition ?
                    (bounds.y - padding) : ((bounds.y + bounds.height + padding) + height)) + offset) : y;
                var boundy = bounds.y;
                var offsetForCross = axis.majorTicks.position === 'Cross' || axis.minorTicks.position === 'Cross' ?
                    (bounds.height > axis.lineBounds.height ? bounds.height / 2 : axis.lineBounds.height / 2) : axis.lineBounds.height / 2;
                boundy = applyPositionBounds ? ((axis.labelStyle.position !== axis.minorTicks.position &&
                    axis.labelStyle.position !== axis.majorTicks.position) ?
                    (axis.minorTicks.position !== 'Cross' && axis.majorTicks.position !== 'Cross' ?
                        (axis.labelStyle.position === 'Inside' ? bounds.y - axis.lineBounds.height : axis.labelStyle.position === 'Outside' ?
                            bounds.y + axis.lineBounds.height : bounds.y) : (axis.labelStyle.position === 'Inside' ?
                        axis.lineBounds.y - offsetForCross : axis.labelStyle.position === 'Outside' ?
                        axis.lineBounds.y - bounds.height + offsetForCross : bounds.y)) : bounds.y) : bounds.y;
                y = axis.labelStyle.position !== 'Auto' ? (axis.labelStyle.position === 'Cross' ? axis.lineBounds.y +
                    axis.maxLabelSize.height / 4 - offset : ((axis.labelStyle.position === 'Inside' && !axis.opposedPosition) ||
                    (axis.labelStyle.position === 'Outside' && axis.opposedPosition)) ?
                    (boundy - padding) - offset : ((boundy + bounds.height + padding) + height) + offset) : y;
                x = axis.lineBounds.x;
            }
            axis.labelBounds = new Rect(x, y, width, height);
        }
    };
    /**
     * Calculate pointer bounds
     *
     * @param {Axis} axis - Specifies the axis.
     * @returns {void}
     */
    AxisLayoutPanel.prototype.calculatePointerBounds = function (axis) {
        var pointer;
        var range = axis.visibleRange;
        var minimumValue = Math.min(range.min, range.max);
        var maximumValue = Math.max(range.min, range.max);
        for (var i = 0; i < axis.pointers.length; i++) {
            pointer = axis.pointers[i];
            if (!isNullOrUndefined(pointer.offset) && pointer.offset.length > 0) {
                pointer.currentOffset = stringToNumber(pointer.offset, (this.gauge.orientation === 'Horizontal' ?
                    this.gauge.availableSize.height / 2 : this.gauge.availableSize.width / 2));
            }
            else {
                pointer.currentOffset = pointer.offset;
            }
            pointer.currentValue = pointer.value !== null ?
                pointer.value < minimumValue ? minimumValue : pointer.value > maximumValue ? maximumValue : pointer.value
                : minimumValue;
            if (pointer.width > 0 && withInRange(pointer.currentValue, null, null, range.max, range.min, 'pointer')) {
                this['calculate' + pointer.type + 'Bounds'](axis, pointer);
            }
        }
    };
    /**
     * Calculate marker pointer bounds
     *
     * @param axis
     * @param pointer
     */
    AxisLayoutPanel.prototype.calculateMarkerBounds = function (axis, pointer) {
        var x;
        var y;
        var line = axis.lineBounds;
        var offset = pointer.currentOffset;
        var range = axis.visibleRange;
        var placement = pointer.placement;
        var tick = axis.majorTickBounds;
        var label = axis.labelBounds;
        var border = pointer.border.width;
        var textSize = measureText(pointer.text, pointer.textStyle);
        if (this.gauge.orientation === 'Vertical') {
            if (pointer.position === 'Auto') {
                x = (!axis.opposedPosition) ? (placement === 'Near') ? label.x : (placement === 'Center') ? tick.x : line.x :
                    placement === 'Far' ? label.x + label.width : (placement === 'Center' ? tick.x + tick.width : line.x);
                x = !axis.opposedPosition ? ((pointer.placement === 'Far' ? ((pointer.markerType === 'Triangle' || pointer.markerType === 'Arrow') ? x - border : x + border) : ((pointer.markerType === 'InvertedTriangle' || pointer.markerType === 'InvertedArrow') ? x + border : x - border)) + (offset)) :
                    ((pointer.placement === 'Near' ? ((pointer.markerType === 'InvertedTriangle' || pointer.markerType === 'InvertedArrow') ? x + border : x - border) : ((pointer.markerType === 'Triangle' || pointer.markerType === 'Arrow') ? x - border : x + border)) + (offset));
            }
            else {
                x = (pointer.position === 'Cross' ? line.x - (pointer.markerType === 'Text' ? textSize.width : pointer.width / 2) - offset :
                    ((pointer.position === 'Inside' && !axis.opposedPosition) ||
                        (pointer.position === 'Outside' && axis.opposedPosition)) ?
                        (line.x - line.width / 2 - (pointer.markerType !== 'InvertedTriangle' && pointer.markerType !== 'Triangle' ?
                            (pointer.markerType === 'Text' ? textSize.width : pointer.width) : 0)) - offset : ((line.x + line.width / 2) + offset));
            }
            y = ((valueToCoefficient(pointer.currentValue, axis, this.gauge.orientation, range) * line.height) + line.y);
        }
        else {
            if (pointer.position === 'Auto') {
                y = (!axis.opposedPosition) ? (placement === 'Near') ? label.y - label.height : (placement === 'Center') ? tick.y :
                    line.y : (placement === 'Far') ? label.y : (placement === 'Center') ? tick.y + tick.height : line.y;
                y = !axis.opposedPosition ? ((pointer.placement === 'Far' ? ((pointer.markerType === 'Triangle' || pointer.markerType === 'Arrow') ? y - border : y + border) : ((pointer.markerType === 'InvertedTriangle' || pointer.markerType === 'InvertedArrow') ? y + border : y - border)) + (offset)) :
                    ((pointer.placement === 'Near' ? ((pointer.markerType === 'InvertedTriangle' || pointer.markerType === 'InvertedArrow') ? y + border : y - border) : ((pointer.markerType === 'Triangle' || pointer.markerType === 'Arrow') ? y - border : y + border)) + (offset));
            }
            else {
                y = (pointer.position === 'Cross' ? line.y - ((pointer.markerType === 'Text' ? textSize.height : pointer.height) / 2) - offset :
                    ((pointer.position === 'Inside' && !axis.opposedPosition) ||
                        (pointer.position === 'Outside' && axis.opposedPosition)) ?
                        (line.y - line.height / 2 - (pointer.markerType !== 'InvertedTriangle' && pointer.markerType !== 'Triangle' ?
                            (pointer.markerType === 'Text' ? textSize.height : pointer.height) : 0)) - offset : ((line.y + line.height / 2) + offset));
            }
            x = ((valueToCoefficient(pointer.currentValue, axis, this.gauge.orientation, range) * line.width) + line.x);
        }
        pointer.bounds = new Rect(x, y, pointer.width, pointer.height);
        if (axis.minimum === axis.maximum) {
            pointer.bounds = new Rect(0, 0, 0, 0);
            pointer.width = 0;
            pointer.height = 0;
        }
    };
    /**
     * Calculate bar pointer bounds
     *
     * @param axisIndex
     * @param axis
     * @param pointerIndex
     * @param pointer
     */
    AxisLayoutPanel.prototype.calculateBarBounds = function (axis, pointer) {
        var x1;
        var x2;
        var y1;
        var y2;
        var height;
        var width;
        var line = axis.lineBounds;
        var padding = 10;
        var range = axis.visibleRange;
        var orientation = this.gauge.orientation;
        var offset = pointer.currentOffset;
        var container = this.gauge.containerBounds;
        if (orientation === 'Vertical') {
            if (pointer.position === 'Auto') {
                x1 = (container.width > 0) ? container.x + ((container.width / 2) - (pointer.width / 2)) :
                    (!axis.opposedPosition) ? (line.x + padding) : (line.x - pointer.width - padding);
                x1 += (offset);
            }
            else {
                x1 = (pointer.position === 'Cross' ? line.x - pointer.width / 2 - offset :
                    ((pointer.position === 'Inside' && !axis.opposedPosition) ||
                        (pointer.position === 'Outside' && axis.opposedPosition)) ?
                        (line.x - line.width / 2 - pointer.width) - offset : ((line.x + line.width / 2) + offset));
            }
            y1 = ((valueToCoefficient(pointer.currentValue, axis, orientation, range) * line.height) + line.y);
            y2 = ((valueToCoefficient(range.min, axis, orientation, range) * line.height) + line.y);
            height = Math.abs(y2 - y1);
            y1 = (!axis.isInversed) ? y1 : y2;
            width = pointer.width;
        }
        else {
            if (pointer.position === 'Auto') {
                y1 = (container.height > 0) ? (container.y + (container.height / 2) - (pointer.height) / 2) :
                    (!axis.opposedPosition) ? (line.y + padding) : (line.y - pointer.height - padding);
                y1 += (offset);
            }
            else {
                y1 = (pointer.position === 'Cross' ? line.y - pointer.height / 2 - offset :
                    ((pointer.position === 'Inside' && !axis.opposedPosition) ||
                        (pointer.position === 'Outside' && axis.opposedPosition)) ?
                        (line.y - line.height / 2 - pointer.height) - offset : ((line.y + line.height / 2) + offset));
            }
            height = pointer.height;
            x1 = ((valueToCoefficient(range.min, axis, orientation, range) * line.width) + line.x);
            x2 = ((valueToCoefficient(pointer.currentValue, axis, orientation, range) * line.width) + line.x);
            width = Math.abs(x2 - x1);
            x1 = (!axis.isInversed) ? x1 : x2;
        }
        pointer.bounds = new Rect(x1, y1, width, height);
        if (axis.minimum === axis.maximum) {
            pointer.bounds = new Rect(0, 0, 0, 0);
            pointer.width = 0;
            pointer.height = 0;
        }
    };
    /**
     * Calculate ranges bounds
     *
     * @param axis
     * @param axisIndex
     */
    AxisLayoutPanel.prototype.calculateRangesBounds = function (axis) {
        var range;
        var start;
        var end;
        var line = axis.lineBounds;
        var visibleRange = axis.visibleRange;
        var orientation = this.gauge.orientation;
        var startVal;
        var endVal;
        var pointX;
        var pointY;
        var width;
        var height;
        var position;
        var gradientRangeColor;
        var startWidth;
        var endWidth;
        var colors;
        for (var i = 0; i < axis.ranges.length; i++) {
            range = axis.ranges[i];
            if (this.gauge.gradientModule) {
                gradientRangeColor = this.gauge.gradientModule.getGradientColorString(range);
            }
            if (!isNullOrUndefined(range.offset) && range.offset.length > 0) {
                range.currentOffset = stringToNumber(range.offset, (this.gauge.orientation === 'Horizontal' ?
                    this.gauge.availableSize.height / 2 : this.gauge.availableSize.width / 2));
            }
            else {
                range.currentOffset = range.offset;
            }
            start = Math.max(range.start, visibleRange.min);
            end = Math.min(range.end, visibleRange.max);
            if (withInRange(null, start, end, visibleRange.max, visibleRange.min, 'range')) {
                end = Math.max(start, end);
                start = Math.min(start, range.end);
                position = range.position;
                startWidth = range.startWidth;
                endWidth = range.endWidth;
                colors = (!isNullOrUndefined(this.gauge.rangePalettes) && this.gauge.rangePalettes.length > 0) ? this.gauge.rangePalettes :
                    getRangePalette(this.gauge.theme);
                range.interior = (gradientRangeColor) ? gradientRangeColor :
                    (range.color) ? range.color : colors[i % colors.length];
                if (this.gauge.orientation === 'Vertical') {
                    pointX = line.x + (range.currentOffset) + (position === 'Cross' ? startWidth / 2 :
                        (position === 'Outside' || position === 'Auto') ?
                            -(line.width / 2) : position === 'Inside' ? line.width / 2 : 0);
                    pointY = (valueToCoefficient(end, axis, orientation, visibleRange) * line.height) + line.y;
                    height = (valueToCoefficient(start, axis, orientation, visibleRange) * line.height) + line.y;
                    height -= pointY;
                    startVal = !axis.opposedPosition ? (position === 'Inside' ? (pointX + startWidth) : position === 'Cross' ?
                        (pointX - startWidth) : (pointX - startWidth)) : (position === 'Inside' ? (pointX - startWidth) :
                        position === 'Cross' ? (pointX - startWidth) : (pointX + startWidth));
                    endVal = !axis.opposedPosition ? position === 'Inside' ? (pointX + endWidth) : position === 'Cross' ?
                        (pointX - endWidth) : (pointX - endWidth) : position === 'Inside' ? (pointX - endWidth) :
                        position === 'Cross' ? (pointX - endWidth) : (pointX + endWidth);
                    range.path = 'M' + pointX + ' ' + pointY + ' L ' + pointX + ' ' + (pointY + height) +
                        ' L ' + startVal + ' ' + (pointY + height) + ' L ' + endVal + ' ' + pointY +
                        ' L ' + pointX + ' ' + pointY + ' z ';
                }
                else {
                    pointX = (valueToCoefficient(end, axis, orientation, visibleRange) * line.width) + line.x;
                    pointY = axis.lineBounds.y + (range.currentOffset) + (position === 'Cross' ? startWidth / 2 :
                        (position === 'Outside' || position === 'Auto') ? -(line.height / 2) : position === 'Inside' ? line.height / 2 : 0);
                    width = (valueToCoefficient(start, axis, orientation, visibleRange) * line.width) + line.x;
                    width = pointX - width;
                    startVal = !axis.opposedPosition ? position === 'Inside' ? (pointY + startWidth) : position === 'Cross' ?
                        (pointY - startWidth) : (pointY - startWidth) : (position === 'Inside') ? (pointY - startWidth) :
                        position === 'Cross' ? (pointY - startWidth) : (pointY + startWidth);
                    endVal = !axis.opposedPosition ? position === 'Inside' ? (pointY + endWidth) : position === 'Cross' ?
                        (pointY - endWidth) : (pointY - endWidth) : (position === 'Inside') ? (pointY - endWidth) :
                        position === 'Cross' ? (pointY - endWidth) : (pointY + endWidth);
                    range.path = 'M' + pointX + ' ' + pointY + ' L ' + (pointX - width) + ' ' + pointY +
                        ' L ' + (pointX - width) + ' ' + startVal + ' L ' + pointX + ' ' + endVal +
                        ' L ' + pointX + ' ' + pointY + ' z ';
                }
            }
        }
    };
    AxisLayoutPanel.prototype.checkPreviousAxes = function (currentAxis, axisIndex) {
        var index = axisIndex - 1;
        var prevAxis;
        var isPositive = (index >= 0) ? true : false;
        if (isPositive) {
            prevAxis = this.gauge.axes[index];
            index = (prevAxis.checkAlign.align === currentAxis.checkAlign.align) ? index : this.checkPreviousAxes(currentAxis, index);
        }
        else {
            index = null;
        }
        return index;
    };
    /**
     *
     * @param {Axis} axis - Specifies the axis to which labels are to be rendered.
     * @returns {void}
     */
    AxisLayoutPanel.prototype.calculateVisibleLabels = function (axis) {
        axis.visibleLabels = [];
        if (axis.minimum !== axis.maximum) {
            var min = axis.visibleRange.min;
            var max = axis.visibleRange.max;
            var interval = axis.visibleRange.interval;
            var argsData = void 0;
            var style = axis.labelStyle;
            var labelSize_1;
            var customLabelFormat = style.format && style.format.match('{value}') !== null;
            var _loop_1 = function (i) {
                var currentAxisValue = i;
                if (currentAxisValue.toString().indexOf('e') !== -1 && isNullOrUndefined(this_1.gauge.format)) {
                    var exponent = parseInt(currentAxisValue.toString().split('-')[1], 10);
                    currentAxisValue = parseInt(currentAxisValue.toFixed(exponent), 10);
                }
                argsData = {
                    cancel: false, name: axisLabelRender, axis: axis,
                    text: customLabelFormat ? textFormatter(style.format, { value: currentAxisValue }, this_1.gauge) :
                        formatValue(currentAxisValue, this_1.gauge).toString(),
                    value: currentAxisValue
                };
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                var axisLabelRenderSuccess = function (argsData) {
                    if (!argsData.cancel) {
                        axis.visibleLabels.push(new VisibleLabels(argsData.text, currentAxisValue, labelSize_1));
                    }
                };
                axisLabelRenderSuccess.bind(this_1);
                this_1.gauge.trigger(axisLabelRender, argsData, axisLabelRenderSuccess);
            };
            var this_1 = this;
            for (var i = min; (i <= max && interval > 0); i += interval) {
                _loop_1(i);
            }
            var lastLabel = axis.visibleLabels.length ? axis.visibleLabels[axis.visibleLabels.length - 1].value : null;
            var maxVal_1 = axis.visibleRange.max;
            if (lastLabel !== maxVal_1 && axis.showLastLabel === true) {
                argsData = {
                    cancel: false, name: axisLabelRender, axis: axis,
                    text: customLabelFormat ? textFormatter(style.format, { value: maxVal_1 }, this.gauge) :
                        formatValue(maxVal_1, this.gauge).toString(),
                    value: maxVal_1
                };
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                var axisLabelRenderSuccess = function (argsData) {
                    labelSize_1 = measureText(argsData.text, axis.labelStyle.font);
                    if (!argsData.cancel) {
                        axis.visibleLabels.push(new VisibleLabels(argsData.text, maxVal_1, labelSize_1));
                    }
                };
                axisLabelRenderSuccess.bind(this);
                this.gauge.trigger(axisLabelRender, argsData, axisLabelRenderSuccess);
            }
            this.getMaxLabelWidth(axis);
        }
    };
    /**
     * Calculate maximum label width for the axis.
     *
     * @param {Axis} axis - Specifies the axis to which the labels are to be rendered.
     * @return {void}
     * @private
     */
    AxisLayoutPanel.prototype.getMaxLabelWidth = function (axis) {
        axis.maxLabelSize = new Size(0, 0);
        var label;
        for (var i = 0; i < axis.visibleLabels.length; i++) {
            label = axis.visibleLabels[i];
            label.size = measureText(label.text, axis.labelStyle.font);
            if (label.size.width > axis.maxLabelSize.width) {
                axis.maxLabelSize.width = label.size.width;
            }
            if (label.size.height > axis.maxLabelSize.height) {
                axis.maxLabelSize.height = label.size.height;
            }
        }
    };
    AxisLayoutPanel.prototype.checkThermometer = function () {
        if (this.gauge.container.type === 'Thermometer') {
            this.gauge.axes.map(function (axis) {
                if (axis.isInversed) {
                    axis.pointers.map(function (pointer) {
                        if (pointer.type === 'Bar') {
                            axis.isInversed = false;
                        }
                    });
                }
            });
        }
    };
    /**
     * @private
     */
    AxisLayoutPanel.prototype.destroy = function () {
        this.gauge = null;
    };
    return AxisLayoutPanel;
}());

/**
 * To handle the animation for gauge
 *
 * @private
 */
var Animations = /** @class */ (function () {
    function Animations(gauge) {
        this.gauge = gauge;
    }
    /**
     * To do the marker pointer animation.
     *
     * @param element - Specifies the element of the marker pointer to which animation must be propagated.
     * @param axis - Specifies the axis in which the marker pointer is available to which animation must be propagated.
     * @param pointer - Specifies the pointer to which the animation must be propagated.
     */
    Animations.prototype.performMarkerAnimation = function (element, axis, pointer) {
        var _this = this;
        var markerElement = element;
        var options;
        var textOptions;
        var timeStamp;
        var range = axis.visibleRange;
        var rectHeight = (this.gauge.orientation === 'Vertical') ? axis.lineBounds.height : axis.lineBounds.width;
        var rectY = (this.gauge.orientation === 'Vertical') ? axis.lineBounds.y : axis.lineBounds.x;
        if (this.gauge.orientation === 'Vertical') {
            pointer.bounds.y = (valueToCoefficient(pointer.currentValue, axis, this.gauge.orientation, range) * rectHeight) + rectY;
        }
        else {
            pointer.bounds.x = (valueToCoefficient(pointer.currentValue, axis, this.gauge.orientation, range) * rectHeight) + rectY;
        }
        options = new PathOption(markerElement.id, null, null, null);
        options = calculateShapes(pointer.bounds, pointer.markerType, new Size(pointer.width, pointer.height), pointer.imageUrl, options, this.gauge.orientation, axis, pointer);
        if (pointer.markerType === 'Text') {
            textOptions = new TextOption(markerElement.id, 0, 0, 'middle', pointer.text, null, 'auto');
            textOptions = calculateTextPosition(pointer.bounds, pointer.markerType, textOptions, this.gauge.orientation, axis, pointer);
        }
        var currentValue;
        var start = typeof (pointer.startValue) === 'string' ? parseInt(pointer.startValue, 10) : pointer.startValue;
        var end = pointer.currentValue;
        start = (start === end) ? range.min : start;
        var val = Math.abs(start - end);
        var currentPath = options.d;
        var cx = options['cx'];
        var cy = options['cy'];
        var x = pointer.markerType === 'Text' ? textOptions['x'] : options['x'];
        var y = pointer.markerType === 'Text' ? textOptions['y'] : options['y'];
        new Animation({}).animate(markerElement, {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            name: 'Linear',
            duration: (animationMode === 'Enable' && ((pointer.animationDuration === 0 && !this.gauge.allowLoadingAnimation) ||
                this.gauge.animationDuration === 0)) ? 1000 : (this.gauge.allowLoadingAnimation && pointer.animationDuration === 0 ?
                (this.gauge.animationDuration / this.gauge.splitUpCount) : pointer.animationDuration),
            progress: function (args) {
                if (args.timeStamp >= args.delay) {
                    timeStamp = ((args.timeStamp - args.delay) / args.duration);
                    currentValue = (start < end) ? start + (timeStamp * val) : start - (timeStamp * val);
                    if (_this.gauge.orientation === 'Vertical') {
                        pointer.bounds.y = (valueToCoefficient(currentValue, axis, _this.gauge.orientation, range) *
                            rectHeight) + rectY;
                        options = calculateShapes(pointer.bounds, pointer.markerType, new Size(pointer.width, pointer.height), pointer.imageUrl, options, _this.gauge.orientation, axis, pointer);
                        if (pointer.markerType === 'Text') {
                            textOptions = calculateTextPosition(pointer.bounds, pointer.markerType, textOptions, _this.gauge.orientation, axis, pointer);
                        }
                        if (!isNullOrUndefined(options['r'])) {
                            markerElement.setAttribute('cy', options['cy'].toString());
                        }
                        else if (!isNullOrUndefined(pointer.markerType === 'Text' ? textOptions['y'] : options['y'])) {
                            markerElement.setAttribute('y', pointer.markerType === 'Text' ? textOptions['y'] : options['y'].toString());
                        }
                        else {
                            markerElement.setAttribute('d', options.d);
                        }
                        markerElement.style.visibility = 'visible';
                    }
                    else {
                        pointer.bounds.x = (valueToCoefficient(currentValue, axis, _this.gauge.orientation, range) *
                            rectHeight) + rectY;
                        options = calculateShapes(pointer.bounds, pointer.markerType, new Size(pointer.width, pointer.height), pointer.imageUrl, options, _this.gauge.orientation, axis, pointer);
                        if (pointer.markerType === 'Text') {
                            textOptions = calculateTextPosition(pointer.bounds, pointer.markerType, textOptions, _this.gauge.orientation, axis, pointer);
                        }
                        if (!isNullOrUndefined(options['r'])) {
                            markerElement.setAttribute('cx', options['cx'].toString());
                        }
                        else if (!isNullOrUndefined(pointer.markerType === 'Text' ? textOptions['x'] : options['x'])) {
                            markerElement.setAttribute('x', pointer.markerType === 'Text' ? textOptions['x'] : options['x'].toString());
                        }
                        else {
                            markerElement.setAttribute('d', options.d);
                        }
                        markerElement.style.visibility = 'visible';
                    }
                }
            },
            end: function () {
                if (!isNullOrUndefined(cy)) {
                    markerElement.setAttribute('cy', cy.toString());
                    markerElement.setAttribute('cx', cx.toString());
                }
                else if (!isNullOrUndefined(y)) {
                    markerElement.setAttribute('y', y.toString());
                    markerElement.setAttribute('x', x.toString());
                }
                else {
                    markerElement.setAttribute('d', currentPath);
                }
                markerElement.style.visibility = 'visible';
                pointer.isPointerAnimation = false;
                pointer.animationComplete = true;
                pointer.startValue = pointer.value = pointer.currentValue;
                _this.gauge.trigger(animationComplete, { axis: axis, pointer: pointer });
                if (_this.gauge.allowLoadingAnimation) {
                    if (!isNullOrUndefined(_this.gauge.annotationsModule) && (_this.gauge.annotations.length > 0 && (_this.gauge.annotations[0].content !== '' || _this.gauge.annotations.length > 1))) {
                        var element_1 = document.getElementById(_this.gauge.element.id + '_AnnotationsGroup');
                        _this.gauge.annotationsModule.annotationAnimate(element_1, _this.gauge);
                    }
                    else {
                        _this.gauge.allowLoadingAnimation = false;
                        _this.gauge.isOverAllAnimationComplete = true;
                    }
                }
            }
        });
    };
    /**
     * Perform the bar pointer animation
     *
     * @param element
     * @param axis
     * @param pointer
     */
    Animations.prototype.performBarAnimation = function (element, axis, pointer) {
        var _this = this;
        var radix = 10;
        var timeStamp;
        var value2;
        var value1;
        var currentValue;
        var clipHeight;
        var clipY;
        var clipX;
        var clipVal;
        var clipWidth;
        var currentHeight;
        var clipElement;
        var range = axis.visibleRange;
        var pointerElement = element;
        var lineHeight = (this.gauge.orientation === 'Vertical') ? axis.lineBounds.height : axis.lineBounds.width;
        var lineY = (this.gauge.orientation === 'Vertical') ? axis.lineBounds.y : axis.lineBounds.x;
        var start = typeof (pointer.startValue) === 'string' ? parseInt(pointer.startValue, 10) : pointer.startValue;
        var end = pointer.currentValue;
        start = (start === end) ? range.min : start;
        var path = '';
        var currentPath = '';
        var tagName = pointerElement.tagName;
        var val = Math.abs(start - end);
        var pointerValue = (valueToCoefficient(end, axis, this.gauge.orientation, range) * lineHeight) + lineY;
        var startPointerVal = (valueToCoefficient(range.min, axis, this.gauge.orientation, range) *
            lineHeight) + lineY;
        var rectY = (this.gauge.orientation === 'Vertical') ? !axis.isInversed ? pointerValue : startPointerVal :
            axis.isInversed ? pointerValue : startPointerVal;
        var rectHeight = Math.abs(startPointerVal - pointerValue);
        if (this.gauge.container.type === 'Thermometer' && start === 0 && this.gauge.container.width > 0) {
            if (end === axis.minimum) {
                element.style.visibility = 'visible';
            }
            else {
                clipElement = pointerElement.parentElement.childNodes[1].childNodes[0].childNodes[0];
                if (this.gauge.orientation === 'Vertical') {
                    clipY = clipElement.getAttribute('y');
                    clipHeight = clipElement.getAttribute('height');
                    clipVal = parseInt(clipY, radix) + parseInt(clipHeight, radix);
                    clipElement.setAttribute('y', clipVal.toString());
                }
                else {
                    clipX = clipElement.getAttribute('x');
                    clipWidth = clipElement.getAttribute('width');
                    clipVal = parseInt(clipX, radix) + parseInt(clipWidth, radix);
                    clipElement.setAttribute('width', '0');
                }
            }
        }
        path = pointer.value === axis.minimum && this.gauge.container.type === 'RoundedRectangle' ? '' : getBox(pointer.bounds, this.gauge.container.type, this.gauge.orientation, new Size(pointer.bounds.width, pointer.bounds.height), 'bar', this.gauge.container.width, axis, pointer.roundedCornerRadius);
        var animatedPointerWidth = pointer.bounds.width;
        var animatedPointerHeight = pointer.bounds.height;
        new Animation({}).animate(pointerElement, {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            name: 'Linear',
            duration: (animationMode === 'Enable' && ((pointer.animationDuration === 0 && !this.gauge.allowLoadingAnimation) ||
                this.gauge.animationDuration === 0)) ? 1000 : (this.gauge.allowLoadingAnimation && pointer.animationDuration === 0 ?
                (this.gauge.animationDuration / this.gauge.splitUpCount) : pointer.animationDuration),
            progress: function (animate) {
                if (animate.timeStamp >= animate.delay) {
                    timeStamp = ((animate.timeStamp - animate.delay) / animate.duration);
                    currentValue = (start < end) ? start + (timeStamp * val) : start - (timeStamp * val);
                    value2 = (valueToCoefficient(currentValue, axis, _this.gauge.orientation, range) * lineHeight) + lineY;
                    value1 = (valueToCoefficient(range.min, axis, _this.gauge.orientation, range) * lineHeight) + lineY;
                    currentHeight = Math.abs(value2 - value1);
                    if (_this.gauge.orientation === 'Vertical') {
                        pointer.bounds.y = (!axis.isInversed) ? value2 : value1;
                        animatedPointerHeight = currentHeight;
                    }
                    else {
                        pointer.bounds.x = (axis.isInversed) ? value2 : value1;
                        animatedPointerWidth = currentHeight;
                    }
                    if (tagName === 'path') {
                        if (start === 0 && _this.gauge.container.type === 'Thermometer') {
                            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                            (_this.gauge.orientation === 'Vertical') ?
                                clipElement.setAttribute('y', (clipVal - (timeStamp * parseInt(clipHeight, radix))).toString()) :
                                clipElement.setAttribute('width', (timeStamp * parseInt(clipWidth, radix)).toString());
                        }
                        currentPath = pointer.value === axis.minimum && _this.gauge.container.type === 'RoundedRectangle' ? '' : getBox(new Rect(pointer.bounds.x, pointer.bounds.y, animatedPointerWidth, animatedPointerHeight), _this.gauge.container.type, _this.gauge.orientation, new Size(animatedPointerWidth, animatedPointerHeight), 'bar', _this.gauge.container.width, axis, pointer.roundedCornerRadius);
                        pointerElement.setAttribute('d', currentPath);
                        pointerElement.style.visibility = 'visible';
                    }
                    else {
                        if (_this.gauge.orientation === 'Vertical') {
                            pointerElement.setAttribute('y', pointer.bounds.y.toString());
                            pointerElement.setAttribute('height', animatedPointerHeight.toString());
                        }
                        else {
                            pointerElement.setAttribute('x', pointer.bounds.x.toString());
                            pointerElement.setAttribute('width', animatedPointerWidth.toString());
                        }
                        pointerElement.style.visibility = 'visible';
                    }
                }
            },
            end: function () {
                if (tagName === 'path') {
                    if (start === 0 && _this.gauge.container.type === 'Thermometer') {
                        pointerElement.parentElement.children[1].remove();
                    }
                    else {
                        pointerElement.setAttribute('d', path);
                    }
                }
                else {
                    if (_this.gauge.orientation === 'Vertical') {
                        pointerElement.setAttribute('y', rectY.toString());
                        pointerElement.setAttribute('height', rectHeight.toString());
                    }
                    else {
                        pointerElement.setAttribute('x', rectY.toString());
                        pointerElement.setAttribute('width', rectHeight.toString());
                    }
                }
                pointerElement.style.visibility = 'visible';
                pointer.isPointerAnimation = false;
                pointer.startValue = pointer.value = pointer.currentValue;
                _this.gauge.trigger(animationComplete, { axis: axis, pointer: pointer });
                if (_this.gauge.allowLoadingAnimation) {
                    if (!isNullOrUndefined(_this.gauge.annotationsModule) && (_this.gauge.annotations.length > 0 && (_this.gauge.annotations[0].content !== '' || _this.gauge.annotations.length > 1))) {
                        var element_2 = document.getElementById(_this.gauge.element.id + '_AnnotationsGroup');
                        _this.gauge.annotationsModule.annotationAnimate(element_2, _this.gauge);
                    }
                    else {
                        _this.gauge.allowLoadingAnimation = false;
                        _this.gauge.isOverAllAnimationComplete = true;
                    }
                }
            }
        });
    };
    return Animations;
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
/**
 * To render the axis elements.
 *
 * @private
 */
var AxisRenderer = /** @class */ (function (_super) {
    __extends$3(AxisRenderer, _super);
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

/* eslint-disable valid-jsdoc */
/**
 * Represent the Annotation rendering for gauge
 *
 * @hidden
 */
var Annotations = /** @class */ (function () {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    function Annotations() {
    }
    /**
     * To render annotation elements.
     *
     * @param {LinearGauge} gauge - Specifies the instance of Linear Gauge.
     *
     * @private
     */
    Annotations.prototype.renderAnnotationElements = function (gauge) {
        var _this = this;
        var secondaryID = gauge.element.id + '_Secondary_Element';
        var annotationGroup = createElement('div', { id: gauge.element.id + '_AnnotationsGroup' });
        annotationGroup.style.position = 'absolute';
        annotationGroup.style.top = '0px';
        annotationGroup.style.left = '0px';
        annotationGroup.style.opacity = gauge.allowLoadingAnimation ? '0' : '1';
        gauge.splitUpCount = gauge.allowLoadingAnimation && gauge.annotations.length > 0 ? gauge.splitUpCount + 1 : gauge.splitUpCount;
        gauge.annotations.map(function (annotation, index) {
            if (annotation.content !== null) {
                _this.createAnnotationTemplate(annotationGroup, index, gauge);
            }
        });
        if (annotationGroup.childElementCount > 0 && !(isNullOrUndefined(getElement(secondaryID)))) {
            getElement(secondaryID).appendChild(annotationGroup);
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        gauge.renderReactTemplates();
    };
    /**
     * To create annotation elements
     *
     * @param {HTMLElement} element - Specifies the content of the annotation to be updated in it.
     * @param {number} annotationIndex - Specifies the index number of the annotation in which the content is to be changed.
     * @param {LinearGauge} gauge - Specifies the instance of Linear Gauge.
     *
     * @private
     */
    Annotations.prototype.createAnnotationTemplate = function (element, annotationIndex, gauge) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        var left;
        var top;
        var templateFn;
        var renderAnnotation = false;
        var templateElement;
        var axis;
        var axisIndex;
        var annotation = gauge.annotations[annotationIndex];
        var childElement = createElement('div', {
            id: gauge.element.id + '_Annotation_' + annotationIndex
        });
        childElement.style.cssText = 'position: absolute; z-index:' + annotation.zIndex + ';';
        var style = {
            size: annotation.font.size,
            color: annotation.font.color,
            fontFamily: annotation.font.fontFamily,
            fontWeight: annotation.font.fontWeight,
            fontStyle: annotation.font.fontStyle,
            opacity: annotation.font.opacity
        };
        var argsData = {
            cancel: false, name: annotationRender, content: annotation.content,
            annotation: annotation, textStyle: style
        };
        argsData.textStyle.color = style.color || gauge.themeStyle.labelColor;
        gauge.trigger(annotationRender, argsData, function () {
            if (!argsData.cancel) {
                templateFn = getTemplateFunction(argsData.content, gauge);
                if (templateFn && templateFn(gauge, gauge, argsData.content, gauge.element.id + '_ContentTemplate' + annotationIndex).length) {
                    templateElement = Array.prototype.slice.call(templateFn(gauge, gauge, argsData.content, gauge.element.id + '_ContentTemplate' + annotationIndex));
                    var length_1 = templateElement.length;
                    for (var i = 0; i < length_1; i++) {
                        childElement.appendChild(templateElement[i]);
                    }
                }
                else {
                    var annotationElement = createElement('div', {
                        innerHTML: !isNullOrUndefined(argsData.content) ? argsData.content.toString() : null
                    });
                    annotationElement.style.cssText = getFontStyle(argsData.textStyle);
                    childElement.appendChild(annotationElement);
                }
                var offset = getElementOffset(childElement.cloneNode(true), gauge.element);
                if (!(isNullOrUndefined(annotation.axisValue))) {
                    axisIndex = isNullOrUndefined(annotation.axisIndex) ? 0 : annotation.axisIndex;
                    axis = gauge.axes[axisIndex];
                    var range = axis.visibleRange;
                    renderAnnotation = (annotation.axisValue >= range.min && annotation.axisValue <= range.max) ? true : false;
                    var line = axis.lineBounds;
                    var extraWidth = getExtraWidth(gauge.element);
                    var axisCollection = getElement(gauge.element.id + '_Axis_Collections');
                    if (!isNullOrUndefined(axisCollection)) {
                        var transformValue = axisCollection.getAttribute('transform').split('(')[1].split(')')[0];
                        var leftTransformValue = parseInt(transformValue.split(',')[0], 10);
                        var topTransformValue = parseInt(transformValue.split(',')[1], 10);
                        if (gauge.orientation === 'Vertical') {
                            left = line.x + parseFloat(annotation.x.toString()) + leftTransformValue - extraWidth;
                            top = ((valueToCoefficient(parseFloat(annotation.axisValue.toString()), axis, gauge.orientation, range) * line.height) + line.y);
                            top += parseFloat(annotation.y.toString());
                        }
                        else {
                            left = ((valueToCoefficient(parseFloat(annotation.axisValue.toString()), axis, gauge.orientation, range) * line.width) + line.x - extraWidth);
                            left += parseFloat(annotation.x.toString());
                            top = line.y + parseFloat(annotation.y.toString()) + topTransformValue;
                        }
                        left -= (offset.width / 2);
                        top -= (offset.height / 2);
                    }
                }
                else {
                    var elementRect = gauge.element.getBoundingClientRect();
                    var bounds = gauge.svgObject.getBoundingClientRect();
                    renderAnnotation = true;
                    left = Math.abs(bounds.left - elementRect.left);
                    top = Math.abs(bounds.top - elementRect.top);
                    left = (annotation.horizontalAlignment === 'None') ? (left + annotation.x) : left;
                    top = (annotation.verticalAlignment === 'None') ? top + annotation.y : top;
                    switch (annotation.verticalAlignment) {
                        case 'Near':
                            top = top + annotation.y;
                            break;
                        case 'Center':
                            top = top + annotation.y + ((bounds.height / 2) - (offset.height / 2));
                            break;
                        case 'Far':
                            top = (top + bounds.height) + annotation.y - offset.height;
                            break;
                    }
                    switch (annotation.horizontalAlignment) {
                        case 'Near':
                            left = left + annotation.x;
                            break;
                        case 'Center':
                            left = left + annotation.x + ((bounds.width / 2) - (offset.width / 2));
                            break;
                        case 'Far':
                            left = (left + bounds.width) + annotation.x - offset.width;
                            break;
                    }
                }
                childElement.style.left = left + 'px';
                childElement.style.top = top + 'px';
                if (renderAnnotation) {
                    element.appendChild(childElement);
                }
            }
        });
    };
    /**
     * Method to annotation animation for circular gauge.
     *
     * @param {Element} element - Specifies the element.
     * @param {LinearGauge} gauge - Specifies the instance of gauge.
     * @returns {void}
     *
     * @private
     */
    Annotations.prototype.annotationAnimate = function (element, gauge) {
        if (element.style.opacity === '0') {
            var tempOpacity_1 = 0;
            var opacity_1 = 1;
            new Animation({}).animate(element, {
                duration: (gauge.animationDuration === 0 && animationMode === 'Enable') ? 1000 :
                    (gauge.allowLoadingAnimation && gauge.animationDuration > 0 ? gauge.animationDuration / gauge.splitUpCount : 0),
                progress: function (args) {
                    if (args.timeStamp > args.delay) {
                        tempOpacity_1 = ((args.timeStamp - args.delay) / args.duration);
                        element['style']['opacity'] = (opacity_1 * tempOpacity_1);
                    }
                },
                end: function () {
                    element['style']['opacity'] = opacity_1;
                    gauge.allowLoadingAnimation = false;
                    gauge.isOverAllAnimationComplete = true;
                }
            });
        }
    };
    /*
     * Get module name.
     */
    Annotations.prototype.getModuleName = function () {
        return 'Annotations';
    };
    /**
     * To destroy the annotation.
     *
     * @return {void}
     * @private
     */
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    Annotations.prototype.destroy = function () { };
    return Annotations;
}());

/* eslint-disable valid-jsdoc */
/**
 * Represent the tooltip rendering for gauge
 *
 * @hidden
 */
var GaugeTooltip = /** @class */ (function () {
    function GaugeTooltip(gauge) {
        this.gauge = gauge;
        this.element = gauge.element;
        this.tooltip = gauge.tooltip;
        this.tooltipId = this.gauge.element.id + '_LinearGauge_Tooltip';
        this.addEventListener();
    }
    /**
     * Internal use for tooltip rendering
     *
     * @param {PointerEvent} e - Specifies the pointer event argument
     * @private
     */
    GaugeTooltip.prototype.renderTooltip = function (e) {
        var pageX;
        var pageY;
        var target;
        var touchArg;
        if (e.type.indexOf('touch') !== -1) {
            this.isTouch = true;
            touchArg = e;
            pageX = touchArg.changedTouches[0].pageX;
            pageY = touchArg.changedTouches[0].pageY;
            target = touchArg.target;
        }
        else {
            this.isTouch = e.pointerType === 'touch';
            pageX = e.pageX;
            pageY = e.pageY;
            target = e.target;
        }
        var tooltipEle;
        var tooltipContent;
        if (target.id.indexOf('Pointer') > -1 && this.gauge.tooltip.type.indexOf('Pointer') > -1) {
            this.pointerElement = target;
            var areaRect = this.gauge.element.getBoundingClientRect();
            var current = getPointer(this.pointerElement, this.gauge);
            this.currentAxis = current.axis;
            this.axisIndex = current.axisIndex;
            this.currentPointer = current.pointer;
            var customTooltipFormat = this.tooltip.format && this.tooltip.format.match('{value}') !== null;
            var tooltipStyle = {
                size: this.tooltip.textStyle.size,
                color: this.tooltip.textStyle.color,
                fontFamily: this.tooltip.textStyle.fontFamily,
                fontWeight: this.tooltip.textStyle.fontWeight,
                fontStyle: this.tooltip.textStyle.fontStyle,
                opacity: this.tooltip.textStyle.opacity
            };
            tooltipStyle.color = tooltipStyle.color || this.gauge.themeStyle.tooltipFontColor;
            tooltipStyle.size = tooltipStyle.size || this.gauge.themeStyle.tooltipFontSize;
            tooltipStyle.fontFamily = tooltipStyle.fontFamily || this.gauge.themeStyle.fontFamily;
            tooltipStyle.fontWeight = tooltipStyle.fontWeight || this.gauge.themeStyle.labelWeight;
            tooltipStyle.opacity = tooltipStyle.opacity || this.gauge.themeStyle.tooltipTextOpacity;
            tooltipContent = customTooltipFormat ? textFormatter(this.tooltip.format, { value: this.currentPointer.currentValue }, this.gauge) :
                formatValue(this.currentPointer.currentValue, this.gauge).toString();
            tooltipEle = this.tooltipCreate(tooltipEle);
            this.tooltipRender(tooltipContent, target, tooltipEle, e, areaRect, pageX, pageY, tooltipStyle);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            this.gauge.renderReactTemplates();
        }
        else if (target.id.indexOf('Range') > -1 && this.gauge.tooltip.type.indexOf('Range') > -1) {
            this.pointerElement = target;
            var areaRect = this.gauge.element.getBoundingClientRect();
            var current = getPointer(this.pointerElement, this.gauge);
            this.currentAxis = current.axis;
            this.axisIndex = current.axisIndex;
            var rangePosition = Number(target.id.charAt(target.id.length - 1));
            this.currentRange = this.currentAxis.ranges[rangePosition];
            var startData = (this.currentRange.start).toString();
            var endData = (this.currentRange.end).toString();
            var rangeTooltipFormat = this.gauge.tooltip.rangeSettings.format || this.currentAxis.labelStyle.format;
            var customTooltipFormat = rangeTooltipFormat && (rangeTooltipFormat.match('{end}') !== null ||
                rangeTooltipFormat.match('{start}') !== null);
            var rangeTooltipStyle = {
                size: this.tooltip.rangeSettings.textStyle.size,
                color: this.tooltip.rangeSettings.textStyle.color,
                fontFamily: this.tooltip.rangeSettings.textStyle.fontFamily,
                fontWeight: this.tooltip.rangeSettings.textStyle.fontWeight,
                fontStyle: this.tooltip.rangeSettings.textStyle.fontStyle,
                opacity: this.tooltip.rangeSettings.textStyle.opacity
            };
            rangeTooltipStyle.color = rangeTooltipStyle.color || this.gauge.themeStyle.tooltipFontColor;
            rangeTooltipStyle.size = rangeTooltipStyle.size || this.gauge.themeStyle.tooltipFontSize;
            rangeTooltipStyle.fontFamily = rangeTooltipStyle.fontFamily || this.gauge.themeStyle.fontFamily;
            rangeTooltipStyle.fontWeight = rangeTooltipStyle.fontWeight || this.gauge.themeStyle.labelWeight;
            rangeTooltipStyle.opacity = rangeTooltipStyle.opacity || this.gauge.themeStyle.tooltipTextOpacity;
            tooltipContent = customTooltipFormat ? rangeTooltipFormat.replace(/{start}/g, startData).replace(/{end}/g, endData) :
                'Start : ' + startData + '<br>' + 'End : ' + endData;
            tooltipEle = this.tooltipCreate(tooltipEle);
            this.tooltipRender(tooltipContent, target, tooltipEle, e, areaRect, pageX, pageY, rangeTooltipStyle);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            this.gauge.renderReactTemplates();
        }
        else if ((target.id === (this.element.id + '_LinearGaugeTitle')) && (target.textContent.indexOf('...') > -1)) {
            showTooltip(this.gauge.title, this.gauge);
        }
        else {
            removeTooltip();
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            this.gauge.clearTemplate();
        }
    };
    GaugeTooltip.prototype.tooltipRender = function (tooltipContent, target, tooltipEle, e, areaRect, pageX, pageY, tooltipStyle) {
        var _this = this;
        var location = this.getTooltipLocation();
        if ((this.tooltip.rangeSettings.showAtMousePosition && target.id.indexOf('Range') > -1) ||
            (this.tooltip.showAtMousePosition && target.id.indexOf('Pointer') > -1)) {
            location = getMousePosition(pageX, pageY, this.gauge.svgObject);
        }
        var args = {
            name: tooltipRender,
            cancel: false,
            gauge: this.gauge,
            event: e,
            location: location,
            content: tooltipContent,
            tooltip: this.tooltip,
            axis: this.currentAxis,
            pointer: this.currentPointer
        };
        var tooltipPos = this.getTooltipPosition();
        location.y += ((this.tooltip.rangeSettings.template && tooltipPos === 'Top') ||
            (this.tooltip.template && tooltipPos === 'Top')) ? 20 : 0;
        location.x += ((this.tooltip.rangeSettings.template && tooltipPos === 'Right') ||
            (this.tooltip.template && tooltipPos === 'Right')) ? 20 : 0;
        this.gauge.trigger(tooltipRender, args, function () {
            var template = (target.id.indexOf('Range') > -1) ? args.tooltip.rangeSettings.template : args.tooltip.template;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            if (template !== null && Object.keys(template).length === 1 && typeof template !== 'function') {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                template = template[Object.keys(template)[0]];
            }
            if (!args.cancel) {
                var fillColor = (target.id.indexOf('Range') > -1) ? _this.tooltip.rangeSettings.fill : _this.tooltip.fill;
                _this.svgTooltip = _this.svgCreate(_this.svgTooltip, args, _this.gauge, areaRect, fillColor, template, tooltipPos, location, target, tooltipStyle);
                _this.svgTooltip.opacity = _this.gauge.themeStyle.tooltipFillOpacity || _this.svgTooltip.opacity;
                _this.svgTooltip.appendTo(tooltipEle);
            }
        });
    };
    GaugeTooltip.prototype.tooltipCreate = function (tooltipEle) {
        if (document.getElementById(this.tooltipId)) {
            tooltipEle = document.getElementById(this.tooltipId);
        }
        else {
            tooltipEle = createElement('div', {
                id: this.tooltipId,
                className: 'EJ2-LinearGauge-Tooltip'
            });
            tooltipEle.style.cssText = 'position: absolute;pointer-events:none;z-index: 3;';
            document.getElementById(this.gauge.element.id + '_Secondary_Element').appendChild(tooltipEle);
        }
        return tooltipEle;
    };
    // eslint-disable-next-line max-len
    GaugeTooltip.prototype.svgCreate = function (svgTooltip, args, gauge, areaRect, fill, template, tooltipPos, location, target, textStyle) {
        var tooltipBorder = (target.id.indexOf('Range') > -1) ? args.tooltip.rangeSettings.border : args.tooltip.border;
        textStyle = {
            color: args.tooltip.textStyle.color || textStyle.color,
            fontFamily: args.tooltip.textStyle.fontFamily || textStyle.fontFamily,
            fontStyle: args.tooltip.textStyle.fontStyle || textStyle.fontStyle,
            fontWeight: args.tooltip.textStyle.fontWeight || textStyle.fontWeight,
            opacity: args.tooltip.textStyle.opacity || textStyle.opacity,
            size: args.tooltip.textStyle.size || textStyle.size
        };
        var borderStyle = {
            color: tooltipBorder.color || this.gauge.themeStyle.tooltipBorderColor || 'transparent',
            width: tooltipBorder.width || this.gauge.themeStyle.tooltipBorderWidth || 0,
            dashArray: tooltipBorder.dashArray
        };
        svgTooltip = new Tooltip({
            enable: true,
            header: '',
            data: { value: args.content },
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            template: template,
            content: [SanitizeHtmlHelper.sanitize(args.content)],
            shapes: [],
            location: args.location,
            palette: [],
            inverted: !(args.gauge.orientation === 'Horizontal'),
            enableAnimation: args.tooltip.enableAnimation,
            fill: fill || gauge.themeStyle.tooltipFillColor,
            availableSize: gauge.availableSize,
            areaBounds: new Rect((this.gauge.orientation === 'Vertical') ? location.x : areaRect.left - this.element.getBoundingClientRect().left, (this.gauge.orientation === 'Vertical') ? areaRect.top : (tooltipPos === 'Bottom') ? areaRect.top : location.y, tooltipPos === 'Right' ? Math.abs(areaRect.left - location.x) : areaRect.width, areaRect.height),
            textStyle: textStyle,
            border: borderStyle,
            theme: args.gauge.theme,
            enableShadow: true
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if (gauge.isVue || gauge.isVue3) {
            svgTooltip.controlInstance = gauge;
        }
        return svgTooltip;
    };
    GaugeTooltip.prototype.getTooltipPosition = function () {
        var position;
        if (this.gauge.orientation === 'Vertical') {
            position = (!this.currentAxis.opposedPosition) ? 'Left' : 'Right';
        }
        else {
            position = (this.currentAxis.opposedPosition) ? 'Top' : 'Bottom';
        }
        return position;
    };
    GaugeTooltip.prototype.getTooltipLocation = function () {
        var lineX;
        var lineY;
        var x;
        var y;
        var lineId = this.gauge.element.id + '_AxisLine_' + this.axisIndex;
        var tickID = this.gauge.element.id + '_MajorTicksLine_' + this.axisIndex;
        var lineBounds;
        if (getElement(lineId)) {
            lineBounds = getElement(lineId).getBoundingClientRect();
            lineX = lineBounds.left;
            lineY = lineBounds.top;
        }
        else {
            lineBounds = getElement(tickID).getBoundingClientRect();
            lineX = (!this.currentAxis.opposedPosition) ? (lineBounds.left + lineBounds.width) : lineBounds.left;
            lineY = (!this.currentAxis.opposedPosition) ? (lineBounds.top + lineBounds.height) : lineBounds.top;
        }
        var bounds = this.pointerElement.getBoundingClientRect();
        var elementRect = this.gauge.element.getBoundingClientRect();
        x = bounds.left - elementRect.left;
        y = bounds.top - elementRect.top;
        var height = bounds.height;
        var width = bounds.width;
        var tooltipPosition = (this.pointerElement.id.indexOf('Range') > -1) ? this.tooltip.rangeSettings.position :
            this.tooltip.position;
        if (this.gauge.orientation === 'Vertical') {
            x = (lineX - elementRect.left);
            if (this.pointerElement.id.indexOf('Range') > -1 || this.pointerElement.id.indexOf('BarPointer') > -1) {
                y = (!this.currentAxis.isInversed) ? ((tooltipPosition === 'End') ? y : ((tooltipPosition === 'Start') ?
                    y + height : y + (height / 2))) : ((tooltipPosition === 'End') ? y + height : ((tooltipPosition === 'Start') ?
                    y + height : y + (height / 2)));
            }
            else {
                y = (this.currentPointer.type === 'Marker') ? y + (height / 2) : (!this.currentAxis.isInversed) ? y : y + height;
            }
        }
        else {
            y = (lineY - elementRect.top);
            if (this.pointerElement.id.indexOf('Range') > -1 || this.pointerElement.id.indexOf('BarPointer') > -1) {
                x = (!this.currentAxis.isInversed) ? ((tooltipPosition === 'End') ? x + width : ((tooltipPosition === 'Start') ?
                    x : x + (width / 2))) : ((tooltipPosition === 'End') ? x : ((tooltipPosition === 'Start') ? x + width : x + (width / 2)));
            }
            else {
                x = (this.currentPointer.type === 'Marker') ? (x + width / 2) : (!this.currentAxis.isInversed) ? x + width : x;
            }
        }
        var location = new GaugeLocation(x, y);
        return location;
    };
    GaugeTooltip.prototype.mouseUpHandler = function (e) {
        removeTooltip();
        this.renderTooltip(e);
        clearTimeout(this.clearTimeout);
        this.clearTimeout = setTimeout(removeTooltip.bind(this), 2000);
    };
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
    };
    /**
     * To unbind events for tooltip module
     *
     * @private
     */
    GaugeTooltip.prototype.removeEventListener = function () {
        if (this.gauge.isDestroyed) {
            return;
        }
        this.gauge.off(Browser.touchMoveEvent, this.renderTooltip);
        this.gauge.off(Browser.touchEndEvent, this.mouseUpHandler);
    };
    /*
     * Get module name.
     */
    GaugeTooltip.prototype.getModuleName = function () {
        return 'Tooltip';
    };
    /**
     *
     * @return {void}
     * @private
     */
    GaugeTooltip.prototype.destroy = function () {
        this.element = null;
        this.currentAxis = null;
        this.currentPointer = null;
        this.currentRange = null;
        if (!isNullOrUndefined(this.svgTooltip)) {
            this.svgTooltip.destroy();
            this.svgTooltip.controlInstance = null;
            removeElement(this.tooltipId);
        }
        this.svgTooltip = null;
        this.pointerElement = null;
        this.tooltip = null;
        this.removeEventListener();
        this.gauge = null;
    };
    return GaugeTooltip;
}());

/**
 *
 * @param {LinearGaugeTheme} theme - Specifies the gauge instance.
 * @returns {IThemeStyle} - Return the theme style argument.
 * @private
 */
function getThemeStyle(theme) {
    var style;
    switch (theme.toLowerCase()) {
        case 'materialdark':
        case 'fabricdark':
        case 'bootstrapdark':
            style = {
                backgroundColor: '#333232',
                titleFontColor: '#ffffff',
                titleFontSize: '15px',
                tooltipFillColor: '#FFFFFF',
                tooltipFontColor: '#000000',
                tooltipFontSize: '13px',
                labelColor: '#DADADA',
                lineColor: '#C8C8C8',
                majorTickColor: '#C8C8C8',
                minorTickColor: '#9A9A9A',
                pointerColor: '#9A9A9A',
                titleFontStyle: 'Normal',
                titleFontWeight: 'Normal',
                labelStyle: 'Normal',
                labelWeight: 'Normal',
                containerBorderColor: '#bfbfbf',
                fontFamily: 'Segoe UI',
                labelFontFamily: 'Segoe UI'
            };
            break;
        case 'highcontrast':
            style = {
                backgroundColor: '#000000',
                titleFontColor: '#FFFFFF',
                titleFontSize: '15px',
                tooltipFillColor: '#ffffff',
                tooltipFontColor: '#000000',
                tooltipFontSize: '13px',
                labelColor: '#FFFFFF',
                lineColor: '#FFFFFF',
                majorTickColor: '#FFFFFF',
                minorTickColor: '#FFFFFF',
                pointerColor: '#FFFFFF',
                titleFontStyle: 'Normal',
                titleFontWeight: 'Normal',
                labelStyle: 'Normal',
                labelWeight: 'Normal',
                containerBorderColor: '#bfbfbf',
                fontFamily: 'Segoe UI',
                labelFontFamily: 'Segoe UI'
            };
            break;
        case 'bootstrap4':
            style = {
                backgroundColor: '#FFFFFF',
                titleFontColor: '#212529',
                titleFontSize: '15px',
                tooltipFillColor: '#000000',
                tooltipFontColor: '#FFFFFF',
                tooltipFontSize: '13px',
                labelColor: '#212529',
                lineColor: '#ADB5BD',
                majorTickColor: '#ADB5BD',
                minorTickColor: '#CED4DA',
                pointerColor: '#6C757D',
                fontFamily: 'HelveticaNeue-Medium',
                fontSize: '16px',
                labelFontFamily: 'HelveticaNeue',
                tooltipFillOpacity: 1,
                tooltipTextOpacity: 0.9,
                containerBackground: '#F8F9FA',
                titleFontStyle: 'Normal',
                titleFontWeight: 'Normal',
                labelStyle: 'Normal',
                labelWeight: 'Normal',
                containerBorderColor: '#bfbfbf'
            };
            break;
        case 'tailwind':
            style = {
                backgroundColor: 'rgba(255,255,255, 0.0)',
                titleFontColor: '#374151',
                titleFontSize: '15px',
                tooltipFillColor: '#111827',
                tooltipFontColor: '#F9FAFB',
                tooltipFontSize: '13px',
                labelColor: '#6B7280',
                lineColor: '#E5E7EB',
                majorTickColor: '#9CA3AF',
                minorTickColor: '#9CA3AF',
                pointerColor: '#1F2937',
                fontFamily: 'Inter',
                fontSize: '14px',
                labelFontFamily: 'Inter',
                tooltipFillOpacity: 1,
                tooltipTextOpacity: 0.9,
                containerBackground: 'rgba(255,255,255, 0.0)',
                titleFontStyle: 'Normal',
                titleFontWeight: '500',
                labelStyle: 'Normal',
                labelWeight: 'Normal',
                containerBorderColor: '#E5E7EB'
            };
            break;
        case 'tailwinddark':
            style = {
                backgroundColor: 'rgba(255,255,255, 0.0)',
                titleFontColor: '#D1D5DB',
                titleFontSize: '15px',
                tooltipFillColor: '#F9FAFB',
                tooltipFontColor: '#1F2937',
                tooltipFontSize: '13px',
                labelColor: '#9CA3AF',
                lineColor: '#374151',
                majorTickColor: '#6B7280',
                minorTickColor: '#6B7280',
                pointerColor: '#9CA3AF',
                fontFamily: 'Inter',
                fontSize: '14px',
                labelFontFamily: 'Inter',
                tooltipFillOpacity: 1,
                tooltipTextOpacity: 0.9,
                containerBackground: 'rgba(255,255,255, 0.0)',
                titleFontStyle: 'Normal',
                titleFontWeight: '500',
                labelStyle: 'Normal',
                labelWeight: 'Normal',
                containerBorderColor: '#4b5563'
            };
            break;
        case 'tailwind3':
            style = {
                backgroundColor: 'rgba(255,255,255, 0.0)',
                titleFontColor: '#111827',
                titleFontSize: '14px',
                tooltipFillColor: '#111827',
                tooltipFontColor: '#F9FAFB',
                tooltipFontSize: '12px',
                labelColor: '#4B5563',
                lineColor: '#E5E7EB',
                majorTickColor: '#D1D5DB',
                minorTickColor: '#D1D5DB',
                pointerColor: '#1F2937',
                fontFamily: 'Inter',
                fontSize: '14px',
                labelFontFamily: 'Inter',
                tooltipFillOpacity: 1,
                tooltipTextOpacity: 1,
                containerBackground: '#E5E7EB',
                titleFontStyle: 'Normal',
                titleFontWeight: '600',
                labelStyle: 'Normal',
                labelWeight: '400',
                containerBorderColor: '#E5E7EB'
            };
            break;
        case 'tailwind3dark':
            style = {
                backgroundColor: 'rgba(255,255,255, 0.0)',
                titleFontColor: '#FFFFFF',
                titleFontSize: '14px',
                tooltipFillColor: '#F9FAFB',
                tooltipFontColor: '#1F2937',
                tooltipFontSize: '12px',
                labelColor: '#D1D5DB',
                lineColor: '#282F3C',
                majorTickColor: '#374151',
                minorTickColor: '#374151',
                pointerColor: '#6B7280',
                fontFamily: 'Inter',
                fontSize: '12px',
                labelFontFamily: 'Inter',
                tooltipFillOpacity: 1,
                tooltipTextOpacity: 1,
                containerBackground: '#282F3C',
                titleFontStyle: 'Normal',
                titleFontWeight: '600',
                labelStyle: 'Normal',
                labelWeight: '400',
                containerBorderColor: '#282F3C'
            };
            break;
        case 'bootstrap5':
            style = {
                backgroundColor: 'transparent',
                titleFontColor: '#212529',
                titleFontSize: '14px',
                tooltipFillColor: '#000000',
                tooltipFontColor: '#FFFFFF',
                tooltipFontSize: '12px',
                labelColor: '#212529',
                lineColor: '#E9ECEF',
                majorTickColor: '#CED4DA',
                minorTickColor: '#CED4DA',
                pointerColor: '#343A40',
                fontSize: '14px',
                titleFontStyle: 'normal',
                titleFontWeight: '400',
                labelStyle: 'normal',
                labelWeight: '400',
                fontFamily: 'Segoe UI',
                labelFontFamily: 'Segoe UI',
                tooltipFillOpacity: 0.9,
                containerBackground: '#E9ECEF',
                containerBorderColor: '#E9ECEF'
            };
            break;
        case 'bootstrap5dark':
            style = {
                backgroundColor: 'transparent',
                titleFontColor: '#DEE2E6',
                titleFontSize: '14px',
                titleFontStyle: 'normal',
                titleFontWeight: '400',
                tooltipFillColor: '#FFFFFF',
                tooltipFontColor: '#212529',
                tooltipFontSize: '12px',
                labelColor: '#DEE2E6',
                labelStyle: 'normal',
                labelWeight: '400',
                labelFontFamily: 'Segoe UI',
                lineColor: '#343A40',
                majorTickColor: '#6C757D',
                minorTickColor: '#6C757D',
                pointerColor: '#ADB5BD',
                fontSize: '14px',
                fontFamily: 'Segoe UI',
                tooltipFillOpacity: 0.9,
                containerBackground: '#343A40',
                containerBorderColor: '#343A40'
            };
            break;
        case 'fluent':
            style = {
                backgroundColor: 'rgba(255,255,255, 0.0)',
                titleFontColor: '#201F1E',
                titleFontSize: '15px',
                tooltipFillColor: '#FFFFFF',
                tooltipFontColor: '#323130',
                tooltipFontSize: '13px',
                labelColor: '#3B3A39',
                lineColor: '#EDEBE9',
                majorTickColor: '#C8C6C4',
                minorTickColor: '#C8C6C4',
                pointerColor: '#A19F9D',
                fontFamily: 'Segoe UI',
                fontSize: '14px',
                labelFontFamily: 'Segoe UI',
                tooltipFillOpacity: 1,
                tooltipTextOpacity: 1,
                containerBackground: 'rgba(255,255,255, 0.0)',
                titleFontStyle: 'normal',
                titleFontWeight: '600',
                labelStyle: 'normal',
                labelWeight: '400',
                containerBorderColor: '#EDEBE9'
            };
            break;
        case 'fluentdark':
            style = {
                backgroundColor: 'rgba(255,255,255, 0.0)',
                titleFontColor: '#F3F2F1',
                titleFontSize: '15px',
                tooltipFillColor: '#252423',
                tooltipFontColor: '#F3F2F1',
                tooltipFontSize: '13px',
                labelColor: '#C8C6C4',
                lineColor: '#292827',
                majorTickColor: '#484644',
                minorTickColor: '#484644',
                pointerColor: '#797775',
                fontFamily: 'Segoe UI',
                fontSize: '14px',
                labelFontFamily: 'Segoe UI',
                tooltipFillOpacity: 1,
                tooltipTextOpacity: 1,
                containerBackground: 'rgba(255,255,255, 0.0)',
                titleFontStyle: 'normal',
                titleFontWeight: '600',
                labelStyle: 'normal',
                labelWeight: '400',
                containerBorderColor: '#292827'
            };
            break;
        case 'material3':
            style = {
                backgroundColor: 'transparent',
                titleFontColor: '#1C1B1F',
                titleFontSize: '16px',
                tooltipFillColor: '#313033',
                tooltipFontColor: '#F4EFF4',
                tooltipFontSize: '14px',
                labelColor: ' #1E192B',
                lineColor: '#C4C7C5',
                majorTickColor: '#C4C7C5',
                minorTickColor: '#C4C7C5',
                pointerColor: '#49454E',
                fontFamily: 'Roboto',
                fontSize: '12px',
                labelFontFamily: 'Roboto',
                tooltipFillOpacity: 1,
                tooltipTextOpacity: 1,
                containerBackground: '#E7E0EC',
                titleFontStyle: 'normal',
                titleFontWeight: '500',
                labelStyle: 'normal',
                labelWeight: '400',
                containerBorderColor: '#E7E0EC'
            };
            break;
        case 'material3dark':
            style = {
                backgroundColor: 'transparent',
                titleFontColor: '#E6E1E5',
                titleFontSize: '16px',
                tooltipFillColor: '#E6E1E5',
                tooltipFontColor: '#313033',
                tooltipFontSize: '14px',
                labelColor: '#E6E1E5',
                lineColor: '#938F99',
                majorTickColor: '#938F99',
                minorTickColor: '#938F99',
                pointerColor: '#CAC4D0',
                fontFamily: 'Roboto',
                fontSize: '12px',
                labelFontFamily: 'Roboto',
                tooltipFillOpacity: 1,
                tooltipTextOpacity: 1,
                containerBackground: '#49454F',
                titleFontStyle: 'normal',
                titleFontWeight: '500',
                labelStyle: 'normal',
                labelWeight: '400',
                containerBorderColor: '#49454F'
            };
            break;
        case 'fluent2':
            style = {
                backgroundColor: 'transparent',
                titleFontColor: '#242424',
                titleFontSize: '14px',
                tooltipFillColor: '#FFFFFF',
                tooltipFontColor: '#242424',
                tooltipFontSize: '12px',
                labelColor: '#616161',
                lineColor: '#EDEBE9',
                majorTickColor: '#C8C6C4',
                minorTickColor: '#C8C6C4',
                pointerColor: '#A19F9D',
                fontSize: '12px',
                tooltipFillOpacity: 1,
                tooltipTextOpacity: 1,
                titleFontStyle: 'normal',
                titleFontWeight: '600',
                labelStyle: 'normal',
                labelWeight: '400',
                containerBorderColor: '#EDEBE9',
                containerBackground: '#EDEBE9',
                fontFamily: 'Segoe UI',
                labelFontFamily: 'Segoe UI'
            };
            break;
        case 'fluent2dark':
            style = {
                backgroundColor: 'transparent',
                titleFontColor: '#FFFFFF',
                titleFontSize: '14px',
                tooltipFillColor: '#292929',
                tooltipFontColor: '#FFFFFF',
                tooltipFontSize: '12px',
                labelColor: '#ADADAD',
                lineColor: '#292827',
                majorTickColor: '#484644',
                minorTickColor: '#484644',
                pointerColor: '#8A8886',
                fontSize: '12px',
                tooltipFillOpacity: 1,
                tooltipTextOpacity: 1,
                titleFontStyle: 'normal',
                titleFontWeight: '600',
                labelStyle: 'normal',
                labelWeight: '400',
                containerBorderColor: '#292827',
                containerBackground: '#292827',
                fontFamily: 'Segoe UI',
                labelFontFamily: 'Segoe UI'
            };
            break;
        case 'fluent2highcontrast':
            style = {
                backgroundColor: 'transparent',
                titleFontColor: '#FFFFFF',
                titleFontSize: '14px',
                tooltipFillColor: '#000000',
                tooltipFontColor: '#FFFFFF',
                tooltipFontSize: '12px',
                labelColor: '#FFFFFF',
                lineColor: '#292827',
                majorTickColor: '#484644',
                minorTickColor: '#484644',
                pointerColor: '#8A8886',
                fontSize: '12px',
                tooltipFillOpacity: 1,
                tooltipTextOpacity: 1,
                titleFontStyle: 'normal',
                titleFontWeight: '600',
                labelStyle: 'normal',
                labelWeight: '400',
                containerBorderColor: '#292827',
                containerBackground: '#292827',
                fontFamily: 'Segoe UI',
                labelFontFamily: 'Segoe UI',
                tooltipBorderColor: '#FFF',
                tooltipBorderWidth: 1
            };
            break;
        default:
            style = {
                backgroundColor: '#FFFFFF',
                titleFontColor: '#424242',
                titleFontSize: '15px',
                tooltipFillColor: '#FFFFF',
                tooltipFontColor: '#FFFFFF',
                tooltipFontSize: '13px',
                labelColor: '#686868',
                lineColor: '#a6a6a6',
                majorTickColor: '#a6a6a6',
                minorTickColor: '#a6a6a6',
                pointerColor: '#a6a6a6',
                containerBackground: '#e0e0e0',
                titleFontStyle: 'Normal',
                titleFontWeight: 'Normal',
                labelStyle: 'Normal',
                labelWeight: 'Normal',
                containerBorderColor: '#bfbfbf',
                fontFamily: 'Segoe UI',
                labelFontFamily: 'Segoe UI'
            };
            break;
    }
    return style;
}

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
var __decorate$2 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * Specifies the color information for the gradient in the linear gauge.
 */
var ColorStop = /** @class */ (function (_super) {
    __extends$4(ColorStop, _super);
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
    __extends$4(GradientPosition, _super);
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
 * This specifies the properties of the linear gradient colors for the linear gauge.
 */
var LinearGradient = /** @class */ (function (_super) {
    __extends$4(LinearGradient, _super);
    function LinearGradient() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate$2([
        Property('0%')
    ], LinearGradient.prototype, "startValue", void 0);
    __decorate$2([
        Property('100%')
    ], LinearGradient.prototype, "endValue", void 0);
    __decorate$2([
        Collection([{ color: '#000000', opacity: 1, offset: '0%', style: '' }], ColorStop)
    ], LinearGradient.prototype, "colorStop", void 0);
    return LinearGradient;
}(ChildProperty));
/**
 * This specifies the properties of the radial gradient colors for the linear gauge.
 */
var RadialGradient = /** @class */ (function (_super) {
    __extends$4(RadialGradient, _super);
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
 * To get the gradient support for pointers and ranges in the linear gauge.
 *
 * @hidden
 */
var Gradient = /** @class */ (function () {
    function Gradient(control) {
        this.gauge = control;
    }
    /**
     * To get the linear gradient string.
     *
     * @private
     */
    Gradient.prototype.getLinearGradientColor = function (element) {
        var render = new SvgRenderer('');
        var colorStop = element.linearGradient.colorStop;
        var colors = this.getGradientColor(colorStop);
        var name = '_' + this.gauge.svgObject.id + '_' + this.gauge.gradientCount + '_' + 'linearGradient';
        var gradientPosition = {
            id: name,
            x1: (element.linearGradient.startValue.indexOf('%') === -1 ?
                element.linearGradient.startValue :
                parseFloat(element.linearGradient.startValue).toString()) + '%',
            x2: (element.linearGradient.endValue.indexOf('%') === -1 ?
                element.linearGradient.endValue :
                parseFloat(element.linearGradient.endValue).toString()) + '%',
            y1: '0' + '%',
            y2: '0' + '%'
        };
        var def = render.drawGradient('linearGradient', gradientPosition, colors);
        this.gauge.svgObject.appendChild(def);
        return 'url(#' + name + ')';
    };
    /**
     * To get the radial gradient string.
     *
     * @private
     */
    Gradient.prototype.getRadialGradientColor = function (element) {
        var render = new SvgRenderer('');
        var colorStop = element.radialGradient.colorStop;
        var colors = this.getGradientColor(colorStop);
        var name = '_' + this.gauge.svgObject.id + '_' + this.gauge.gradientCount + '_' + 'radialGradient';
        var gradientPosition = {
            id: name,
            r: !isNullOrUndefined(element.radialGradient.radius) ?
                (element.radialGradient.radius.indexOf('%') === -1 ?
                    element.radialGradient.radius :
                    parseFloat(element.radialGradient.radius).toString()) + '%' : '0%',
            cx: element.radialGradient.outerPosition == null ? '0%' : (element.radialGradient.outerPosition.x.indexOf('%') === -1 ?
                element.radialGradient.outerPosition.x :
                parseFloat(element.radialGradient.outerPosition.x).toString()) + '%',
            cy: element.radialGradient.outerPosition == null ? '0%' : (element.radialGradient.outerPosition.y.indexOf('%') === -1 ?
                element.radialGradient.outerPosition.y :
                parseFloat(element.radialGradient.outerPosition.y).toString()) + '%',
            fx: element.radialGradient.innerPosition == null ? '0%' : (element.radialGradient.innerPosition.x.indexOf('%') === -1 ?
                element.radialGradient.innerPosition.y :
                parseFloat(element.radialGradient.innerPosition.x).toString()) + '%',
            fy: element.radialGradient.innerPosition == null ? '0%' : (element.radialGradient.innerPosition.y.indexOf('%') === -1 ?
                element.radialGradient.innerPosition.y :
                parseFloat(element.radialGradient.innerPosition.y).toString()) + '%'
        };
        var def = render.drawGradient('radialGradient', gradientPosition, colors);
        this.gauge.svgObject.appendChild(def);
        return 'url(#' + name + ')';
    };
    /**
     * To get the color, offset, opacity and style.
     *
     * @private
     */
    Gradient.prototype.getGradientColor = function (colorStop) {
        var colors = [];
        var length = !isNullOrUndefined(colorStop) ? colorStop.length : 0;
        for (var j = 0; j < length; j++) {
            var gradientColorStop = colorStop[j];
            var color = {
                color: gradientColorStop.color,
                colorStop: gradientColorStop.offset,
                opacity: gradientColorStop.opacity ? (gradientColorStop.opacity).toString() : '1',
                style: gradientColorStop.style
            };
            colors.push(color);
        }
        return colors;
    };
    /**
     * To get the gradient color string.
     *
     * @private
     */
    Gradient.prototype.getGradientColorString = function (element) {
        var gradientColor;
        if ((element.linearGradient || element.radialGradient)) {
            if (element.linearGradient) {
                gradientColor = this.getLinearGradientColor(element);
            }
            else {
                gradientColor = this.getRadialGradientColor(element);
            }
            this.gauge.gradientCount += 1;
        }
        else {
            return null;
        }
        return gradientColor;
    };
    /**
     * Get module name.
     */
    Gradient.prototype.getModuleName = function () {
        return 'Gradient';
    };
    /**
     * To destroy the gradient.
     *
     * @return {void}
     * @private
     */
    Gradient.prototype.destroy = function () {
        this.gauge = null;
    };
    return Gradient;
}());

var __extends$5 = (undefined && undefined.__extends) || (function () {
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
 * Represents the linear gauge control. This is used to customize the properties of the linear gauge to visualize the data in linear scale.
 * ```html
 * <div id="container"/>
 * <script>
 *   var gaugeObj = new LinearGauge({ });
 *   gaugeObj.appendTo("#container");
 * </script>
 * ```
 */
var LinearGauge = /** @class */ (function (_super) {
    __extends$5(LinearGauge, _super);
    /**
     * Constructor for creating the widget
     *
     * @private
     * @hidden
     */
    function LinearGauge(options, element) {
        var _this = _super.call(this, options, element) || this;
        /**
         * Specifies the gradient count of the linear gauge.
         *
         * @private
         */
        _this.gradientCount = 0;
        /** @private */
        _this.isDrag = false;
        /** @private */
        _this.splitUpCount = 0;
        /** @private */
        _this.allowLoadingAnimation = false;
        /** @private */
        _this.isPointerAnimationInProgress = false;
        /** @private */
        _this.isOverAllAnimationComplete = false;
        /** @private */
        _this.pointerDrag = false;
        _this.isTouchPointer = false;
        /** @private */
        _this.isCheckPointerDrag = false;
        /** @private */
        _this.mouseX = 0;
        /** @private */
        _this.mouseY = 0;
        /** @private */
        _this.gaugeResized = false;
        return _this;
    }
    /**
     * Initialize the preRender method.
     */
    LinearGauge.prototype.preRender = function () {
        this.unWireEvents();
        this.isPointerAnimationInProgress = false;
        this.trigger(load, { gauge: this });
        this.initPrivateVariable();
        this.setCulture();
        this.createSvg();
        this.wireEvents();
    };
    LinearGauge.prototype.setTheme = function () {
        this.themeStyle = getThemeStyle(this.theme);
    };
    LinearGauge.prototype.initPrivateVariable = function () {
        if (this.element.id === '') {
            var collection = document.getElementsByClassName('e-lineargauge').length;
            this.element.id = 'lineargauge_' + 'control_' + collection;
        }
        this.renderer = new SvgRenderer(this.element.id);
        this.gaugeAxisLayoutPanel = new AxisLayoutPanel(this);
        this.axisRenderer = new AxisRenderer(this);
    };
    /**
     * Method to set culture for chart
     */
    LinearGauge.prototype.setCulture = function () {
        this.intl = new Internationalization();
    };
    /**
     * Methods to create svg element
     */
    LinearGauge.prototype.createSvg = function () {
        this.removeSvg();
        this.calculateSize();
        if (isNullOrUndefined(this.renderer)) {
            this.renderer = new SvgRenderer(this.element.id);
        }
        if (isNullOrUndefined(this.gaugeAxisLayoutPanel)) {
            this.gaugeAxisLayoutPanel = new AxisLayoutPanel(this);
        }
        if (isNullOrUndefined(this.axisRenderer)) {
            this.axisRenderer = new AxisRenderer(this);
        }
        this.svgObject = this.renderer.createSvg({
            id: this.element.id + '_svg',
            width: this.availableSize.width,
            height: this.availableSize.height
        });
    };
    /**
     * To Remove the SVG.
     *
     * @return {boolean}
     * @private
     */
    LinearGauge.prototype.removeSvg = function () {
        removeElement(this.element.id + '_Secondary_Element');
        if (!(isNullOrUndefined(this.svgObject)) && !isNullOrUndefined(this.svgObject.parentNode)) {
            remove(this.svgObject);
        }
        this.clearTemplate();
    };
    LinearGauge.prototype.renderAnimation = function () {
        var _this = this;
        if (this.allowLoadingAnimation) {
            var element = document.getElementById(this.element.id + '_RangesGroup_0');
            this.axisElementAnimate(element);
            if (this.styleRemove) {
                clearTimeout(this.styleRemove);
            }
            this.styleRemove = setTimeout(function () {
                var styleElement = document.querySelectorAll('style.' + _this.element.id + 'animation');
                if (styleElement.length > 0) {
                    styleElement[0].remove();
                }
            }, (this.animationDuration === 0 && animationMode === 'Enable') ? 1000 : this.animationDuration);
        }
    };
    LinearGauge.prototype.axisElementAnimate = function (element) {
        var _this = this;
        var tempOpacity = 0;
        var opacity = 1;
        var elements = document.querySelectorAll('style.' + this.element.id + 'animation');
        new Animation({}).animate(element, {
            duration: (this.animationDuration === 0 && animationMode === 'Enable') ? 1000 : this.animationDuration > 0 ?
                this.animationDuration / this.splitUpCount : 0,
            progress: function (args) {
                if (args.timeStamp > args.delay) {
                    tempOpacity = ((args.timeStamp - args.delay) / args.duration);
                    elements[0].style.cssText = "opacity: " + opacity * tempOpacity + ";";
                }
            },
            end: function () {
                if (!isNullOrUndefined(elements) && elements.length !== 0) {
                    elements[0].style.cssText = 'opacity: 1;';
                }
                for (var i = 0; i < _this.axes.length; i++) {
                    _this.axisRenderer.pointerAnimation(_this.axes[i], i);
                    if ((_this.axes.length - 1) === 0 && _this.axes[i].pointers.length === 0) {
                        _this.isOverAllAnimationComplete = true;
                    }
                }
            }
        });
    };
    /**
     * Method to calculate the size of the gauge
     */
    LinearGauge.prototype.calculateSize = function () {
        if (!isNullOrUndefined(this.height)) {
            this.element.style.height = this.height;
        }
        if (!isNullOrUndefined(this.width)) {
            this.element.style.width = this.width;
        }
        var width = stringToNumberSize(this.width, this.element.offsetWidth) || this.element.offsetWidth || 600;
        var height = stringToNumberSize(this.height, this.element.offsetHeight) || this.element.offsetHeight || 450;
        this.availableSize = new Size(width, height);
    };
    LinearGauge.prototype.renderElements = function () {
        this.setTheme();
        this.renderGaugeElements();
        this.calculateBounds();
        this.renderAxisElements();
        this.renderAnimation();
        this.renderComplete();
    };
    /**
     * To Initialize the control rendering
     */
    LinearGauge.prototype.render = function () {
        this.isPropertyChange = false;
        this.isCheckPointerDrag = false;
        this.allowLoadingAnimation = ((this.animationDuration === 0 && animationMode === 'Enable') || this.animationDuration > 0)
            && !this.isOverAllAnimationComplete;
        if (this.allowLoadingAnimation) {
            var styleClass = document.getElementsByClassName(this.element.id + 'animation');
            if (styleClass.length === 0) {
                var styleClass_1 = createElement('style', {
                    className: this.element.id + 'animation'
                });
                styleClass_1.style.cssText = '.' + this.element.id + 'animation' + '{opacity: 0}';
                document.body.appendChild(styleClass_1);
            }
        }
        this.renderElements();
    };
    /**
     * To render the gauge elements
     *
     * @private
     */
    LinearGauge.prototype.renderGaugeElements = function () {
        this.appendSecondaryElement();
        this.renderBorder();
        this.renderTitle();
        this.renderContainer();
    };
    LinearGauge.prototype.appendSecondaryElement = function () {
        if (isNullOrUndefined(getElement(this.element.id + '_Secondary_Element'))) {
            var secondaryElement = createElement('div');
            secondaryElement.id = this.element.id + '_Secondary_Element';
            secondaryElement.style.position = 'relative';
            this.element.appendChild(secondaryElement);
        }
    };
    /**
     * To calculate axes bounds
     *
     * @private
     */
    LinearGauge.prototype.calculateBounds = function () {
        this.gaugeAxisLayoutPanel.calculateAxesBounds();
    };
    /**
     * To render axis elements
     *
     * @private
     */
    LinearGauge.prototype.renderAxisElements = function () {
        this.axisRenderer.renderAxes();
        this.element.appendChild(this.svgObject);
        if (this.annotationsModule) {
            this.annotationsModule.renderAnnotationElements(this);
        }
        if (!this.isCheckPointerDrag) {
            this.trigger(loaded, { gauge: this });
        }
        removeElement('gauge-measuretext');
    };
    LinearGauge.prototype.renderBorder = function () {
        var width = this.border.width;
        if (width > 0 || (this.background || this.themeStyle.backgroundColor)) {
            var rect = new RectOption(this.element.id + '_LinearGaugeBorder', this.background || this.themeStyle.backgroundColor, this.border, 1, new Rect(width / 2, width / 2, this.availableSize.width - width, this.availableSize.height - width));
            this.svgObject.appendChild(this.renderer.drawRectangle(rect));
        }
    };
    LinearGauge.prototype.renderTitle = function () {
        var width = (this.availableSize.width - this.margin.left - this.margin.right);
        var style = {
            size: this.titleStyle.size || this.themeStyle.titleFontSize,
            color: this.titleStyle.color,
            fontFamily: this.titleStyle.fontFamily || this.themeStyle.fontFamily,
            fontWeight: this.titleStyle.fontWeight || this.themeStyle.titleFontWeight,
            fontStyle: this.titleStyle.fontStyle || this.themeStyle.titleFontStyle,
            opacity: this.titleStyle.opacity
        };
        var trimmedTitle = textTrim(width, this.title, style);
        var size = measureText(trimmedTitle, style);
        var options = new TextOption(this.element.id + '_LinearGaugeTitle', this.availableSize.width / 2, this.margin.top + (size.height / 2), 'middle', trimmedTitle);
        var titleBounds = {
            x: options.x - (size.width / 2),
            y: options.y,
            width: size.width,
            height: size.height
        };
        var x = this.margin.left;
        var y = titleBounds.y;
        var height = (this.availableSize.height - y - this.margin.bottom);
        this.actualRect = { x: x, y: y, width: width, height: height };
        if (this.title) {
            var element = textElement(options, style, style.color || this.themeStyle.titleFontColor, null, this.svgObject);
            element.setAttribute('aria-label', this.description || this.title);
            element.setAttribute('role', 'region');
            element.setAttribute('tabindex', this.tabIndex.toString());
        }
    };
    /*
     * Method to unbind the gauge events
     */
    LinearGauge.prototype.unWireEvents = function () {
        EventHandler.remove(this.element, Browser.touchStartEvent, this.gaugeOnMouseDown);
        EventHandler.remove(this.element, Browser.touchMoveEvent, this.mouseMove);
        EventHandler.remove(this.element, Browser.touchEndEvent, this.mouseEnd);
        EventHandler.remove(this.element, 'contextmenu', this.gaugeRightClick);
        EventHandler.remove(this.element, (Browser.isPointer ? 'pointerleave' : 'mouseleave'), this.mouseLeave);
        window.removeEventListener((Browser.isTouch && ('orientation' in window && 'onorientationchange' in window)) ? 'orientationchange' : 'resize', this.resizeEvent);
    };
    /*
     * Method to bind the gauge events
     */
    LinearGauge.prototype.wireEvents = function () {
        /*! Bind the Event handler */
        EventHandler.add(this.element, Browser.touchStartEvent, this.gaugeOnMouseDown, this);
        EventHandler.add(this.element, Browser.touchMoveEvent, this.mouseMove, this);
        EventHandler.add(this.element, Browser.touchEndEvent, this.mouseEnd, this);
        EventHandler.add(this.element, 'contextmenu', this.gaugeRightClick, this);
        EventHandler.add(this.element, (Browser.isPointer ? 'pointerleave' : 'mouseleave'), this.mouseLeave, this);
        this.resizeEvent = this.gaugeResize.bind(this);
        EventHandler.add(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        window, (Browser.isTouch && ('orientation' in window && 'onorientationchange' in window)) ? 'orientationchange' : 'resize', this.resizeEvent);
        this.setStyle(this.element);
    };
    LinearGauge.prototype.setStyle = function (element) {
        element.style.touchAction = 'element';
        element.style.msTouchAction = 'element';
        element.style.msContentZooming = 'none';
        element.style.msUserSelect = 'none';
        element.style.webkitUserSelect = 'none';
        element.style.position = 'relative';
    };
    /**
     * Handles the gauge resize.
     *
     * @return {boolean} check whether the Linear Gauge is resized or not.
     * @private
     */
    LinearGauge.prototype.gaugeResize = function () {
        var _this = this;
        if (!this.isDestroyed) {
            var args = {
                gauge: this,
                previousSize: new Size(this.availableSize.width, this.availableSize.height),
                name: resized,
                currentSize: new Size(0, 0),
                cancel: false
            };
            var currentSize = this.element.getBoundingClientRect();
            args.currentSize = new Size(currentSize.width, currentSize.height);
            this.trigger(resized, args);
            if (!args.cancel) {
                if (this.resizeTo) {
                    clearTimeout(this.resizeTo);
                }
                if (!isNullOrUndefined(this.element) && this.element.classList.contains('e-lineargauge')) {
                    this.resizeTo = window.setTimeout(function () {
                        _this.gaugeResized = true;
                        _this.createSvg();
                        _this.allowLoadingAnimation = false;
                        _this.renderElements();
                    }, 500);
                }
            }
        }
        return false;
    };
    /**
     * This method destroys the linear gauge. This method removes the events associated with the linear gauge and disposes the objects created for rendering and updating the linear gauge.
     */
    LinearGauge.prototype.destroy = function () {
        this.unWireEvents();
        _super.prototype.destroy.call(this);
        if (!isNullOrUndefined(this.gaugeAxisLayoutPanel)) {
            this.gaugeAxisLayoutPanel.destroy();
        }
        if (!isNullOrUndefined(this.axisRenderer)) {
            this.axisRenderer.destroy();
        }
        this.gaugeAxisLayoutPanel = null;
        this.axisRenderer = null;
        this.activePointer = null;
        this.activeAxis = null;
        this.actualRect = null;
        this.containerObject = null;
        this.containerBounds = null;
        this.availableSize = null;
        this.mouseElement = null;
        this.nearSizes = [];
        this.farSizes = [];
        this.themeStyle = null;
        this.intl = null;
        this.removeSvg();
        this.resizeEvent = null;
        this.svgObject = null;
        this.renderer = null;
    };
    /**
     * To render the gauge container
     *
     * @private
     */
    LinearGauge.prototype.renderContainer = function () {
        var width;
        var height;
        var x;
        var y;
        var options;
        var labelPadding = 20;
        var extraPadding = 30;
        var path = '';
        var fill = (this.container.backgroundColor !== 'transparent'
            || (this.theme !== 'Bootstrap4' && this.theme !== 'Material' && this.theme !== 'Material3' && this.theme !== 'Material3Dark'
                && this.theme !== 'Fluent2' && this.theme !== 'Fluent2Dark' && this.theme !== 'Bootstrap5' && this.theme !== 'Bootstrap5Dark'
                && this.theme !== 'Tailwind' && this.theme !== 'TailwindDark' && this.theme !== 'Tailwind3' && this.theme !== 'Tailwind3Dark'))
            ? this.container.backgroundColor : this.themeStyle.containerBackground;
        var rect;
        var radius = this.container.width;
        var bottomRadius = radius + ((radius / 2) / Math.PI);
        var topRadius = radius / 2;
        var allowContainerRender = false;
        for (var i = 0; i < this.axes.length; i++) {
            if (this.axes[i].minimum !== this.axes[i].maximum) {
                allowContainerRender = true;
                break;
            }
        }
        if (this.orientation === 'Vertical') {
            if (this.allowMargin) {
                height = this.actualRect.height;
                height = (this.container.height > 0) ? this.container.height :
                    ((height / 2) - ((height / 2) / 4)) * 2;
                height = (this.container.type === 'Thermometer') ? height - (bottomRadius * 2) - topRadius : height;
            }
            else {
                height = this.actualRect.height - labelPadding - extraPadding;
                height = (this.container.type === 'Thermometer') ? (radius !== 0) ? (this.actualRect.height - (bottomRadius * 2) - topRadius - extraPadding) : height : height;
            }
            width = this.container.width;
            x = (this.actualRect.x + ((this.actualRect.width / 2) - (this.container.width / 2))) + this.container.offset;
            y = this.actualRect.y + ((this.actualRect.height / 2) - ((this.container.type === 'Thermometer') ?
                ((height + (bottomRadius * 2) - topRadius)) / 2 : height / 2));
        }
        else {
            if (this.allowMargin) {
                width = (this.container.height > 0) ? this.container.height :
                    ((this.actualRect.width / 2) - ((this.actualRect.width / 2) / 4)) * 2;
                width = (this.container.type === 'Thermometer') ? width - (bottomRadius * 2) - topRadius : width;
            }
            else {
                width = this.actualRect.width - labelPadding;
                width = (this.container.type === 'Thermometer') ? (this.actualRect.width - (bottomRadius * 2) - topRadius) : width;
            }
            x = this.actualRect.x + ((this.actualRect.width / 2) - ((this.container.type === 'Thermometer') ?
                (width - (bottomRadius * 2) + topRadius) / 2 : width / 2));
            y = (this.actualRect.y + ((this.actualRect.height / 2) - (this.container.width / 2))) + this.container.offset;
            height = this.container.width;
        }
        this.containerBounds = (!allowContainerRender) ? { x: 0, y: 0, width: 0, height: 0 } : { x: x, y: y, width: width, height: height };
        if ((this.containerBounds.width > 0 && this.orientation === 'Vertical') || (this.containerBounds.height > 0 && this.orientation === 'Horizontal')) {
            this.containerObject = this.renderer.createGroup({ id: this.element.id + '_Container_Group', transform: 'translate( 0, 0)' });
            if (this.container.type === 'Normal') {
                var containerBorder = { color: this.container.border.color || this.themeStyle.containerBorderColor,
                    width: this.container.border.width, dashArray: this.container.border.dashArray };
                rect = new RectOption(this.element.id + '_' + this.container.type + '_Layout', fill, containerBorder, 1, new Rect(x, y, width, height));
                this.containerObject.appendChild(this.renderer.drawRectangle(rect));
                if (this.allowLoadingAnimation) {
                    this.containerObject.classList.add(this.element.id + 'animation');
                }
            }
            else {
                path = getBox(this.containerBounds, this.container.type, this.orientation, new Size(this.container.height, this.container.width), 'container', null, null, this.container.roundedCornerRadius);
                options = new PathOption(this.element.id + '_' + this.container.type + '_Layout', fill, this.container.border.width, this.container.border.color || this.themeStyle.containerBorderColor, 1, this.container.border.dashArray, path);
                this.containerObject.appendChild(this.renderer.drawPath(options));
                if (this.allowLoadingAnimation) {
                    this.containerObject.classList.add(this.element.id + 'animation');
                }
            }
            this.svgObject.appendChild(this.containerObject);
        }
    };
    /**
     * Method to set mouse x, y from events
     */
    LinearGauge.prototype.setMouseXY = function (e) {
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
     * Handles the mouse down on gauge.
     *
     * @param {PointerEvent} e - Specifies the event argument.
     * @return {boolean}
     * @private
     */
    LinearGauge.prototype.gaugeOnMouseDown = function (e) {
        var _this = this;
        var current;
        var currentPointer;
        this.setMouseXY(e);
        var args = this.getMouseArgs(e, 'touchstart', gaugeMouseDown);
        this.trigger(gaugeMouseDown, args, function () {
            _this.mouseX = args.x;
            _this.mouseY = args.y;
            if (_this.isTouch) {
                e.preventDefault();
                _this.isTouchPointer = true;
            }
            if (args.target) {
                if (!args.cancel && ((args.target.id.indexOf('MarkerPointer') > -1) || (args.target.id.indexOf('BarPointer') > -1))) {
                    _this.isOverAllAnimationComplete = true;
                    current = _this.moveOnPointer(args.target);
                    currentPointer = getPointer(args.target, _this);
                    _this.activeAxis = _this.axes[currentPointer.axisIndex];
                    _this.activePointer = _this.activeAxis.pointers[currentPointer.pointerIndex];
                    if (isNullOrUndefined(_this.activePointer.pathElement)) {
                        _this.activePointer.pathElement = [e.target];
                    }
                    var pointInd = parseInt(_this.activePointer.pathElement[0].id.slice(-1), 10);
                    var axisInd = parseInt(_this.activePointer.pathElement[0].id.match(/\d/g)[0], 10);
                    if (currentPointer.pointer.enableDrag) {
                        _this.trigger(dragStart, {
                            axis: _this.activeAxis,
                            name: dragStart,
                            pointer: _this.activePointer,
                            currentValue: _this.activePointer.currentValue,
                            pointerIndex: pointInd,
                            axisIndex: axisInd
                        });
                    }
                    if (!isNullOrUndefined(current) && current.pointer) {
                        _this.pointerDrag = true;
                        _this.mouseElement = args.target;
                    }
                }
            }
        });
        return false;
    };
    /**
     * Handles the mouse move.
     *
     * @return {boolean}
     * @private
     */
    LinearGauge.prototype.mouseMove = function (e) {
        var _this = this;
        var current;
        this.setMouseXY(e);
        var args = this.getMouseArgs(e, 'touchmove', gaugeMouseMove);
        this.trigger(gaugeMouseMove, args, function () {
            _this.mouseX = args.x;
            _this.mouseY = args.y;
            var dragArgs;
            if (args.target && !args.cancel) {
                if (_this.pointerDrag && _this.activePointer) {
                    if (!isNullOrUndefined(_this.activePointer.pathElement)) {
                        if (_this.isTouch) {
                            _this.isTouchPointer = true;
                            e.preventDefault();
                        }
                        var pointerIndex = parseInt(_this.activePointer.pathElement[0].id.slice(-1), 10);
                        var axisIndex = parseInt(_this.activePointer.pathElement[0].id.split('AxisIndex_')[1].match(/\d/g)[0], 10);
                        if (_this.axes[axisIndex].pointers[pointerIndex].enableDrag) {
                            current = _this.moveOnPointer(_this.activePointer.pathElement[0]);
                            if (!(isNullOrUndefined(current)) && current.pointer) {
                                _this.element.style.cursor = current.style;
                            }
                            _this.isDrag = _this.isCheckPointerDrag = true;
                            dragArgs = {
                                axis: _this.activeAxis,
                                pointer: _this.activePointer,
                                previousValue: _this.activePointer.currentValue,
                                name: dragMove,
                                currentValue: null,
                                axisIndex: axisIndex,
                                pointerIndex: pointerIndex
                            };
                            if (_this.activePointer.pathElement[0].id.indexOf('MarkerPointer') > -1) {
                                _this.markerDrag(_this.activeAxis, (_this.activeAxis.pointers[pointerIndex]));
                            }
                            else {
                                _this.barDrag(_this.activeAxis, (_this.activeAxis.pointers[pointerIndex]));
                            }
                            dragArgs.currentValue = _this.activePointer.currentValue;
                            _this.trigger(dragMove, dragArgs);
                        }
                    }
                }
                else {
                    if (args.target.id.indexOf('Pointer') > -1 && isNullOrUndefined(_this.activePointer)) {
                        var pointerIndex = parseInt(args.target.id.split('Pointer_')[1], 10);
                        var axisIndex = parseInt(args.target.id.split('AxisIndex_')[1].match(/\d/g)[0], 10);
                        if (_this.axes[axisIndex].pointers[pointerIndex].enableDrag) {
                            _this.element.style.cursor = 'pointer';
                        }
                    }
                    else {
                        _this.element.style.cursor = (_this.pointerDrag) ? _this.element.style.cursor : 'auto';
                    }
                }
                _this.gaugeOnMouseMove();
            }
        });
        this.notify(Browser.touchMoveEvent, e);
        if ((!isNullOrUndefined(args.target) && args.target.id === (this.element.id + '_LinearGaugeTitle')) || document.getElementById(this.element.id + '_EJ2_Title_Tooltip')) {
            this.titleTooltip(e, false);
        }
        return false;
    };
    LinearGauge.prototype.titleTooltip = function (event, isTitleTouch) {
        var targetId = event.target.id;
        if ((targetId === (this.element.id + '_LinearGaugeTitle')) && (event.target.textContent.indexOf('...') > -1)) {
            clearTimeout(this.tooltipTimeout);
            showTooltip(this.title, this);
            if (isTitleTouch) {
                this.tooltipTimeout = setTimeout(removeTooltip.bind(this), 2000);
            }
        }
        else {
            removeElement(this.element.id + '_EJ2_Title_Tooltip');
        }
    };
    /**
     * To find the mouse move on pointer.
     *
     * @param element
     */
    LinearGauge.prototype.moveOnPointer = function (element) {
        var clientRect = this.element.getBoundingClientRect();
        var isPointer = false;
        var top;
        var left;
        var pointerElement = getElement(element.id);
        var svgPath = pointerElement;
        var cursorStyle;
        var process;
        var current = getPointer(element, this);
        var axis = current.axis;
        var pointer = current.pointer;
        if (pointer.enableDrag) {
            if (pointer.type === 'Bar') {
                if (this.orientation === 'Vertical') {
                    top = pointerElement.getBoundingClientRect().top - clientRect.top;
                    top = (!axis.isInversed) ? top : top + svgPath.getBBox().height;
                    isPointer = !axis.isInversed ? (this.mouseY < (top + 10) && this.mouseY >= top) :
                        (this.mouseY <= top && this.mouseY > (top - 10));
                    cursorStyle = 'grabbing';
                }
                else {
                    left = pointerElement.getBoundingClientRect().left - clientRect.left;
                    left = (!axis.isInversed) ? left + svgPath.getBBox().width : left;
                    isPointer = !axis.isInversed ? (this.mouseX > (left - 10) && this.mouseX <= left) :
                        (this.mouseX >= left && this.mouseX < (left + 10));
                    cursorStyle = 'grabbing';
                }
            }
            else {
                isPointer = true;
                cursorStyle = 'grabbing';
            }
        }
        if (isPointer) {
            process = { pointer: isPointer, style: cursorStyle };
        }
        return process;
    };
    /**
     * Handle the right click
     *
     * @param {PointerEvent | TouchEvent} event - Specifies the pointer event argument.
     * @returns {boolean} - Specifies whether right click is performed on the Linear Gauge.
     * @private
     *
     */
    LinearGauge.prototype.gaugeRightClick = function (event) {
        if (event.buttons === 2 || event.pointerType === 'touch') {
            event.preventDefault();
            event.stopPropagation();
            return false;
        }
        return true;
    };
    /**
     * Handles the mouse leave.
     *
     * @return {boolean}
     * @private
     */
    LinearGauge.prototype.mouseLeave = function (e) {
        this.activeAxis = null;
        this.activePointer = null;
        var args = this.getMouseArgs(e, 'touchmove', gaugeMouseLeave);
        this.trigger(gaugeMouseLeave, args);
        if (!isNullOrUndefined(this.mouseElement)) {
            this.mouseElement = null;
            this.pointerDrag = false;
        }
        return false;
    };
    /**
     * Handles the mouse move on gauge.
     *
     * @param {PointerEvent | TouchEvent} e - Specifies the pointer event argument.
     * @return {boolean}
     * @private
     */
    LinearGauge.prototype.gaugeOnMouseMove = function () {
        var current;
        if (this.pointerDrag) {
            current = getPointer(this.mouseElement, this);
            if (current.pointer.enableDrag && current.pointer.animationComplete) {
                this[current.pointer.type.toLowerCase() + 'Drag'](current.axis, current.pointer);
            }
        }
        return true;
    };
    /**
     * Handles the mouse up.
     *
     * @return {boolean}
     * @private
     */
    LinearGauge.prototype.mouseEnd = function (e) {
        this.isTouchPointer = false;
        this.setMouseXY(e);
        var isImage = isNullOrUndefined(this.activePointer) ? false : this.activePointer.markerType === 'Image';
        var args = this.getMouseArgs(e, 'touchend', gaugeMouseUp);
        this.trigger(gaugeMouseUp, args);
        if (this.activeAxis && this.activePointer) {
            var pointerInd = parseInt(this.activePointer.pathElement[0].id.slice(-1), 10);
            var axisInd = parseInt(this.activePointer.pathElement[0].id.split('_AxisIndex_')[1], 10);
            if (this.activePointer.enableDrag) {
                this.trigger(dragEnd, {
                    name: dragEnd,
                    axis: this.activeAxis,
                    pointer: this.activePointer,
                    currentValue: this.activePointer.currentValue,
                    axisIndex: axisInd,
                    pointerIndex: pointerInd
                });
                this.axes[axisInd].pointers[pointerInd].value = this.activePointer.currentValue;
                this.activeAxis = null;
                this.activePointer = null;
                this.isDrag = false;
                if (!isNullOrUndefined(this.mouseElement && !isImage)) {
                    this.triggerDragEvent(this.mouseElement);
                }
            }
        }
        if (!isNullOrUndefined(this.mouseElement)) {
            this.mouseElement = null;
            this.pointerDrag = false;
        }
        this.element.style.cursor = 'auto';
        this.notify(Browser.touchEndEvent, e);
        if (args.target.id === (this.element.id + '_LinearGaugeTitle') || document.getElementById(this.element.id + '_EJ2_Title_Tooltip')) {
            this.titleTooltip(e, true);
        }
        return true;
    };
    /**
     * This method handles the print functionality for linear gauge.
     *
     * @param id - Specifies the element to print the linear gauge.
     */
    LinearGauge.prototype.print = function (id) {
        if ((this.allowPrint) && (this.printModule)) {
            this.printModule.print(this, id);
        }
    };
    /**
     * This method handles the export functionality for linear gauge.
     *
     * @param {ExportType} type - Specifies the extension type of the exported document.
     * @param {string} fileName - Specifies file name for exporting the rendered Linear Gauge.
     * @param {PdfPageOrientation} orientation - Specifies the orientation of the PDF document.
     * @param {boolean} allowDownload - Specifies whether the exported file should be downloaded or not.
     * @returns {string} - Specifies the base64 string of the exported image which is returned when the allowDownload is set to false.
     */
    LinearGauge.prototype.export = function (type, fileName, orientation, allowDownload) {
        var _this = this;
        if (isNullOrUndefined(allowDownload)) {
            allowDownload = true;
        }
        if ((type !== 'PDF') && (this.allowImageExport) && (this.imageExportModule)) {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
            return new Promise(function (resolve, reject) {
                resolve(_this.imageExportModule.export(_this, type, fileName, allowDownload));
            });
        }
        else if ((this.allowPdfExport) && (this.pdfExportModule)) {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
            return new Promise(function (resolve, reject) {
                resolve(_this.pdfExportModule.export(_this, type, fileName, orientation, allowDownload));
            });
        }
        return null;
    };
    /**
     * Handles the mouse event arguments.
     *
     * @return {IMouseEventArgs}
     * @private
     */
    LinearGauge.prototype.getMouseArgs = function (e, type, name) {
        var rect = this.element.getBoundingClientRect();
        var location = new GaugeLocation(-rect.left, -rect.top);
        var isTouch = (e.type === type);
        location.x += isTouch ? e.changedTouches[0].clientX : e.clientX;
        location.y += isTouch ? e.changedTouches[0].clientY : e.clientY;
        return {
            cancel: false, name: name,
            model: this,
            x: location.x, y: location.y,
            target: isTouch ? e.target : e.target
        };
    };
    /**
     * @private
     * @param axis
     * @param pointer
     */
    LinearGauge.prototype.markerDrag = function (axis, pointer) {
        var options;
        var textOptions;
        var x;
        var y;
        var value = convertPixelToValue(this.element, this.mouseElement, this.orientation, axis, 'drag', new GaugeLocation(this.mouseX, this.mouseY));
        if (withInRange(value, null, null, axis.visibleRange.max, axis.visibleRange.min, 'pointer')) {
            options = new PathOption('pointerID', pointer.color || this.themeStyle.pointerColor, pointer.border.width, pointer.border.color, pointer.opacity, pointer.border.dashArray, null, '');
            if (this.orientation === 'Vertical') {
                pointer.bounds.y = this.mouseY;
            }
            else {
                pointer.bounds.x = this.mouseX + getExtraWidth(this.element);
            }
            pointer.currentValue = this.isTouch ? (pointer.startValue = value) : (pointer.value = value);
            if (pointer.markerType === 'Text') {
                textOptions = new TextOption('pointerID', x, y, 'middle', pointer.text, null, 'auto');
                textOptions = calculateTextPosition(pointer.bounds, pointer.markerType, textOptions, this.orientation, axis, pointer);
            }
            options = calculateShapes(pointer.bounds, pointer.markerType, new Size(pointer.width, pointer.height), pointer.imageUrl, options, this.orientation, axis, pointer);
            if (pointer.markerType === 'Image' || pointer.markerType === 'Text') {
                this.mouseElement.setAttribute('x', (pointer.markerType === 'Text' ? textOptions.x : pointer.bounds.x - (pointer.bounds.width / 2)).toString());
                this.mouseElement.setAttribute('y', (pointer.markerType === 'Text' ? textOptions.y : pointer.bounds.y - (pointer.bounds.height / 2)).toString());
            }
            else if (pointer.markerType === 'Circle') {
                this.mouseElement.setAttribute('cx', (options.cx).toString());
                this.mouseElement.setAttribute('cy', (options.cy).toString());
                this.mouseElement.setAttribute('r', (options.r).toString());
            }
            else {
                this.mouseElement.setAttribute('d', options.d);
            }
        }
    };
    /**
     * @private
     * @param axis
     * @param pointer
     */
    LinearGauge.prototype.barDrag = function (axis, pointer) {
        var line = axis.lineBounds;
        var range = axis.visibleRange;
        var isDrag;
        var lineHeight = (this.orientation === 'Vertical') ? line.height : line.width;
        var lineY = (this.orientation === 'Vertical') ? line.y : line.x;
        var path;
        var value1 = ((valueToCoefficient(range.min, axis, this.orientation, range) * lineHeight) + lineY);
        var value2 = ((valueToCoefficient(range.max, axis, this.orientation, range) * lineHeight) + lineY);
        if (this.orientation === 'Vertical') {
            isDrag = (!axis.isInversed) ? (this.mouseY > value2 && this.mouseY < value1) : (this.mouseY > value1 && this.mouseY < value2);
            if (isDrag) {
                if ((this.container.type === 'Normal' || this.container.width === 0) && !isNullOrUndefined(this.mouseElement)) {
                    if (!axis.isInversed) {
                        this.mouseElement.setAttribute('y', this.mouseY.toString());
                    }
                    this.mouseElement.setAttribute('height', Math.abs(value1 - this.mouseY).toString());
                }
                else {
                    if (!axis.isInversed) {
                        pointer.bounds.y = this.mouseY;
                    }
                    pointer.bounds.height = Math.abs(value1 - this.mouseY);
                }
            }
        }
        else {
            var extraWidth = getExtraWidth(this.element);
            isDrag = (!axis.isInversed) ? (this.mouseX + extraWidth > value1 && this.mouseX + extraWidth < value2) :
                (this.mouseX + extraWidth > value2 && this.mouseX + extraWidth < value1);
            if (isDrag) {
                if ((this.container.type === 'Normal' || this.container.width === 0) && !isNullOrUndefined(this.mouseElement)) {
                    if (axis.isInversed) {
                        this.mouseElement.setAttribute('x', (this.mouseX + extraWidth).toString());
                    }
                    this.mouseElement.setAttribute('width', Math.abs(value1 - (this.mouseX + extraWidth)).toString());
                }
                else {
                    if (axis.isInversed) {
                        pointer.bounds.x = this.mouseX + extraWidth;
                    }
                    pointer.bounds.width = Math.abs(value1 - (this.mouseX + extraWidth));
                }
            }
        }
        if (!isNullOrUndefined(this.mouseElement)) {
            var value = convertPixelToValue(this.element, this.mouseElement, this.orientation, axis, 'drag', new GaugeLocation(this.mouseX, this.mouseY));
            pointer.currentValue = this.isTouch ? (pointer.startValue = value) : (pointer.value = value);
        }
        if (isDrag && !isNullOrUndefined(this.mouseElement) && this.mouseElement.tagName === 'path') {
            path = getBox(pointer.bounds, this.container.type, this.orientation, new Size(pointer.bounds.width, pointer.bounds.height), 'bar', this.container.width, axis, pointer.roundedCornerRadius);
            this.mouseElement.setAttribute('d', path);
        }
    };
    /**
     * Triggers when drag the pointer
     *
     * @param activeElement
     */
    LinearGauge.prototype.triggerDragEvent = function (activeElement) {
        var _this = this;
        var active = getPointer(activeElement, this);
        var value = convertPixelToValue(this.element, activeElement, this.orientation, active.axis, 'tooltip', null);
        var dragArgs = {
            name: 'valueChange',
            gauge: this,
            element: activeElement,
            axisIndex: active.axisIndex,
            axis: active.axis,
            pointerIndex: active.pointerIndex,
            pointer: active.pointer,
            value: value
        };
        this.trigger(valueChange, dragArgs, function (pointerArgs) {
            if (value !== pointerArgs.value) {
                _this.setPointerValue(pointerArgs.axisIndex, pointerArgs.pointerIndex, pointerArgs.value);
            }
        });
    };
    /**
     * This method is used to set the pointer value in the linear gauge.
     *
     * @param {number} axisIndex - Specifies the index of the axis.
     * @param {number} pointerIndex - Specifies the index of the pointer.
     * @param {number} value - Specifies the pointer value.
     */
    LinearGauge.prototype.setPointerValue = function (axisIndex, pointerIndex, value) {
        if (!this.isDestroyed) {
            var axis = this.axes[axisIndex];
            var pointer = axis.pointers[pointerIndex];
            this.gaugeResized = false;
            if (this.allowLoadingAnimation) {
                this.allowLoadingAnimation = false;
                this.createSvg();
                this.renderGaugeElements();
                this.calculateBounds();
                this.renderAxisElements();
            }
            if (pointer.startValue !== value) {
                this.isPointerAnimationInProgress = false;
                var id = this.element.id + '_AxisIndex_' + axisIndex + '_' + pointer.type + 'Pointer_' + pointerIndex;
                var pointerElement = getElement(id);
                value = (value < axis.visibleRange.min) ? axis.visibleRange.min : ((value > axis.visibleRange.max) ?
                    axis.visibleRange.max : value);
                pointer.currentValue = value;
                pointer.isPointerAnimation = true;
                this.isPropertyChange = true;
                if ((pointerElement !== null) && withInRange(pointer.currentValue, null, null, axis.visibleRange.max, axis.visibleRange.min, 'pointer')) {
                    pointer.value = this.pointerDrag ? this.isTouch ? pointer.startValue : value : pointer.value;
                    this.gaugeAxisLayoutPanel['calculate' + pointer.type + 'Bounds'](axis, pointer);
                    this.axisRenderer['draw' + pointer.type + 'Pointer'](axis, axisIndex, pointer, pointerIndex, pointerElement.parentElement);
                }
                this.isProtectedOnChange = true;
                pointer.startValue = pointer.currentValue;
                pointer.currentValue = value;
                pointer.value = value;
                this.isProtectedOnChange = false;
            }
        }
    };
    /**
     * This method is used to set the annotation value in the linear gauge.
     *
     * @param {number} annotationIndex - Specifies the index value for the annotation in linear gauge.
     * @param {string | Function} content - Specifies the content for the annotation in linear gauge.
     * @param {number} axisValue - Specifies the axis value to which the annotation must be positioned.
     */
    LinearGauge.prototype.setAnnotationValue = function (annotationIndex, content, axisValue) {
        if (!this.isDestroyed) {
            var elementExist = getElement(this.element.id + '_Annotation_' + annotationIndex) === null;
            var element = getElement(this.element.id + '_AnnotationsGroup') ||
                createElement('div', {
                    id: this.element.id + '_AnnotationsGroup'
                });
            var annotation = this.annotations[annotationIndex];
            if (content !== null) {
                removeElement(this.element.id + '_Annotation_' + annotationIndex);
                annotation.content = content;
                annotation.axisValue = !isNullOrUndefined(axisValue) ? axisValue : annotation.axisValue;
                this.annotationsModule.createAnnotationTemplate(element, annotationIndex, this);
                if (!isNullOrUndefined(annotation.axisIndex)) {
                    var axis = this.axes[annotation.axisIndex];
                    var range = axis.visibleRange;
                    var annotationElement = getElement(this.element.id + '_Annotation_' + annotationIndex);
                    if (!elementExist && annotation.axisValue >= range.min && annotation.axisValue <= range.max
                        && !isNullOrUndefined(annotationElement) && typeof (annotationElement) === 'object') {
                        element.appendChild(annotationElement);
                    }
                }
                else if (!elementExist) {
                    var annotationElement = getElement(this.element.id + '_Annotation_' + annotationIndex);
                    if (!isNullOrUndefined(annotationElement) && typeof (annotationElement) === 'object') {
                        element.appendChild(annotationElement);
                    }
                }
            }
        }
    };
    LinearGauge.prototype.isGradientVisible = function () {
        var isVisible = false;
        for (var _i = 0, _a = this.axes; _i < _a.length; _i++) {
            var axis = _a[_i];
            for (var _b = 0, _c = axis.pointers; _b < _c.length; _b++) {
                var pointer = _c[_b];
                if (!isNullOrUndefined(pointer.linearGradient) || !isNullOrUndefined(pointer.radialGradient)) {
                    isVisible = true;
                    break;
                }
            }
            for (var _d = 0, _e = axis.ranges; _d < _e.length; _d++) {
                var range = _e[_d];
                if (!isNullOrUndefined(range.linearGradient) || !isNullOrUndefined(range.radialGradient)) {
                    isVisible = true;
                    break;
                }
            }
        }
        return isVisible;
    };
    /**
     * To provide the array of modules needed for control rendering
     *
     * @return {ModuleDeclaration[]}
     * @private
     */
    LinearGauge.prototype.requiredModules = function () {
        var modules = [];
        var annotationEnable = false;
        this.annotations.map(function (annotation) {
            if (!annotationEnable) {
                annotationEnable = ((!isNullOrUndefined(annotation.content) && annotation.content.length !== 0) || typeof (annotation.content) === 'function');
            }
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
                name: 'GaugeTooltip'
            });
        }
        if (this.allowPrint) {
            modules.push({
                member: 'Print',
                args: [this],
                name: 'Print'
            });
        }
        if (this.allowImageExport) {
            modules.push({
                member: 'ImageExport',
                args: [this],
                name: 'ImageExport'
            });
        }
        if (this.allowPdfExport) {
            modules.push({
                member: 'PdfExport',
                args: [this],
                name: 'PdfExport'
            });
        }
        if (this.isGradientVisible()) {
            modules.push({
                member: 'Gradient',
                args: [this, Gradient],
                name: 'Gradient'
            });
        }
        return modules;
    };
    /**
     * Get the properties to be maintained in the persisted state.
     *
     * @private
     */
    LinearGauge.prototype.getPersistData = function () {
        var keyEntity = ['loaded'];
        return this.addOnPersist(keyEntity);
    };
    /**
     * Get component name
     *
     * @private
     */
    LinearGauge.prototype.getModuleName = function () {
        return 'lineargauge';
    };
    /**
     * Called internally if any of the property value changed.
     *
     * @private
     */
    LinearGauge.prototype.onPropertyChanged = function (newProp, oldProp) {
        if (!this.isDestroyed) {
            var renderer = false;
            var refreshBounds = false;
            this.allowLoadingAnimation = this.animationDuration > 0 && !this.isOverAllAnimationComplete ? true : false;
            this.isPropertyChange = this.animationDuration > 0 && !this.isOverAllAnimationComplete ? false : true;
            this.gaugeResized = false;
            for (var _i = 0, _a = Object.keys(newProp); _i < _a.length; _i++) {
                var prop = _a[_i];
                switch (prop) {
                    case 'height':
                    case 'width':
                    case 'margin':
                        this.createSvg();
                        refreshBounds = true;
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
                    case 'container':
                        refreshBounds = true;
                        break;
                    case 'orientation':
                        this.isOverAllAnimationComplete = true;
                        this.isPointerAnimationInProgress = this.allowLoadingAnimation = false;
                        for (var i = 0; i < this.axes.length; i++) {
                            for (var j = 0; j < this.axes[i].pointers.length; j++) {
                                this.axes[i].pointers[j]['startValue'] = this.axes[i].minimum;
                                this.axes[i].pointers[j]['isPointerAnimation'] = true;
                            }
                        }
                        refreshBounds = true;
                        break;
                    case 'axes':
                        for (var x = 0; x < this.axes.length; x++) {
                            if (!isNullOrUndefined(newProp.axes[x])) {
                                var collection = Object.keys(newProp.axes[x]);
                                for (var _b = 0, collection_1 = collection; _b < collection_1.length; _b++) {
                                    var collectionProp = collection_1[_b];
                                    if (collectionProp === 'pointers') {
                                        var pointerPropertyLength = Object.keys(newProp.axes[x].pointers).length;
                                        for (var y = 0; y < pointerPropertyLength; y++) {
                                            var index = parseInt(Object.keys(newProp.axes[x].pointers)[y], 10);
                                            if (!isNaN(index) &&
                                                !isNullOrUndefined(Object.keys(newProp.axes[x].pointers[index]))) {
                                                this.allowLoadingAnimation = false;
                                                this.isPointerAnimationInProgress = false;
                                                this.axes[x].pointers[index]['startValue'] = this.axes[x].pointers[index]['currentValue'];
                                                this.axes[x].pointers[index]['isPointerAnimation'] = Object.keys(newProp.axes[x].pointers[index]).indexOf('value') > -1;
                                                if (this.pointerDrag) {
                                                    this.axes[x].pointers[index]['isPointerAnimation'] = false;
                                                    if (this.isTouchPointer &&
                                                        newProp.axes[x].pointers[index].text
                                                            !== oldProp.axes[x].pointers[index].text) {
                                                        var currentPointer = this.axes[x].pointers[index];
                                                        var pointerId = this.element.id + '_AxisIndex_' + x + '_' + currentPointer.type + 'Pointer' + '_' + index;
                                                        this.axisRenderer.updateTextPointer(pointerId, currentPointer, this.axes[x]);
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        refreshBounds = true;
                        break;
                }
            }
            if (!this.isTouchPointer && isNullOrUndefined(this.activePointer)) {
                if (!refreshBounds && renderer) {
                    this.removeSvg();
                    this.renderGaugeElements();
                    this.renderAxisElements();
                }
                if (refreshBounds || this.allowLoadingAnimation) {
                    this.createSvg();
                    this.renderGaugeElements();
                    this.calculateBounds();
                    this.renderAxisElements();
                    if (this.allowLoadingAnimation) {
                        this.allowLoadingAnimation = this.animationDuration > 0 && !this.isOverAllAnimationComplete ? true : false;
                        this.renderAnimation();
                    }
                }
            }
        }
    };
    __decorate$3([
        Property(null)
    ], LinearGauge.prototype, "width", void 0);
    __decorate$3([
        Property(true)
    ], LinearGauge.prototype, "allowMargin", void 0);
    __decorate$3([
        Property(null)
    ], LinearGauge.prototype, "height", void 0);
    __decorate$3([
        Property(0)
    ], LinearGauge.prototype, "animationDuration", void 0);
    __decorate$3([
        Property('Vertical')
    ], LinearGauge.prototype, "orientation", void 0);
    __decorate$3([
        Property('None')
    ], LinearGauge.prototype, "edgeLabelPlacement", void 0);
    __decorate$3([
        Property(false)
    ], LinearGauge.prototype, "allowPrint", void 0);
    __decorate$3([
        Property(false)
    ], LinearGauge.prototype, "allowImageExport", void 0);
    __decorate$3([
        Property(false)
    ], LinearGauge.prototype, "allowPdfExport", void 0);
    __decorate$3([
        Complex({}, Margin)
    ], LinearGauge.prototype, "margin", void 0);
    __decorate$3([
        Complex({ color: '', width: 0 }, Border)
    ], LinearGauge.prototype, "border", void 0);
    __decorate$3([
        Property(null)
    ], LinearGauge.prototype, "background", void 0);
    __decorate$3([
        Property('')
    ], LinearGauge.prototype, "title", void 0);
    __decorate$3([
        Complex({ size: null, color: null, fontFamily: null, fontStyle: null, fontWeight: null }, Font)
    ], LinearGauge.prototype, "titleStyle", void 0);
    __decorate$3([
        Complex({}, Container)
    ], LinearGauge.prototype, "container", void 0);
    __decorate$3([
        Collection([{}], Axis)
    ], LinearGauge.prototype, "axes", void 0);
    __decorate$3([
        Complex({}, TooltipSettings)
    ], LinearGauge.prototype, "tooltip", void 0);
    __decorate$3([
        Collection([{}], Annotation)
    ], LinearGauge.prototype, "annotations", void 0);
    __decorate$3([
        Property([])
    ], LinearGauge.prototype, "rangePalettes", void 0);
    __decorate$3([
        Property(false)
    ], LinearGauge.prototype, "useGroupingSeparator", void 0);
    __decorate$3([
        Property(null)
    ], LinearGauge.prototype, "description", void 0);
    __decorate$3([
        Property(0)
    ], LinearGauge.prototype, "tabIndex", void 0);
    __decorate$3([
        Property(null)
    ], LinearGauge.prototype, "format", void 0);
    __decorate$3([
        Property('Material')
    ], LinearGauge.prototype, "theme", void 0);
    __decorate$3([
        Event()
    ], LinearGauge.prototype, "loaded", void 0);
    __decorate$3([
        Event()
    ], LinearGauge.prototype, "load", void 0);
    __decorate$3([
        Event()
    ], LinearGauge.prototype, "animationComplete", void 0);
    __decorate$3([
        Event()
    ], LinearGauge.prototype, "axisLabelRender", void 0);
    __decorate$3([
        Event()
    ], LinearGauge.prototype, "dragStart", void 0);
    __decorate$3([
        Event()
    ], LinearGauge.prototype, "dragMove", void 0);
    __decorate$3([
        Event()
    ], LinearGauge.prototype, "dragEnd", void 0);
    __decorate$3([
        Event()
    ], LinearGauge.prototype, "annotationRender", void 0);
    __decorate$3([
        Event()
    ], LinearGauge.prototype, "tooltipRender", void 0);
    __decorate$3([
        Event()
    ], LinearGauge.prototype, "gaugeMouseMove", void 0);
    __decorate$3([
        Event()
    ], LinearGauge.prototype, "gaugeMouseLeave", void 0);
    __decorate$3([
        Event()
    ], LinearGauge.prototype, "gaugeMouseDown", void 0);
    __decorate$3([
        Event()
    ], LinearGauge.prototype, "gaugeMouseUp", void 0);
    __decorate$3([
        Event()
    ], LinearGauge.prototype, "valueChange", void 0);
    __decorate$3([
        Event()
    ], LinearGauge.prototype, "resized", void 0);
    __decorate$3([
        Event()
    ], LinearGauge.prototype, "beforePrint", void 0);
    LinearGauge = __decorate$3([
        NotifyPropertyChanges
    ], LinearGauge);
    return LinearGauge;
}(Component));

/**
 * Represent the print and export for gauge.
 *
 * @hidden
 */
var Print = /** @class */ (function () {
    /**
     * Constructor for gauge
     *
     * @param {LinearGauge} control - Specifies the linear gauge instance.
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
    function Print(control) {
    }
    /**
     * To print the gauge
     *
     * @param elements
     * @private
     */
    Print.prototype.print = function (gauge, elements) {
        var printWindow = window.open('', 'print', 'height=' + window.outerHeight + ',width=' + window.outerWidth + ',tabbar=no');
        printWindow.moveTo(0, 0);
        printWindow.resizeTo(screen.availWidth, screen.availHeight);
        var argsData = {
            cancel: false, htmlContent: this.getHTMLContent(gauge, elements), name: beforePrint
        };
        gauge.trigger('beforePrint', argsData, function () {
            if (!argsData.cancel) {
                print(argsData.htmlContent, printWindow);
            }
        });
    };
    /**
     * To get the html string of the gauge
     *
     * @param elements
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
                    if (backgroundElement.getAttribute('stroke') === '') {
                        backgroundElement.setAttribute('stroke', 'transparent');
                    }
                }
            }
            div.appendChild(exportElement);
        }
        return div;
    };
    /**
     * Get module name.
     */
    Print.prototype.getModuleName = function () {
        return 'Print';
    };
    /**
     * To destroy the print.
     *
     * @return {void}
     * @private
     */
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    Print.prototype.destroy = function () {
    };
    return Print;
}());

/**
 * Represent the print and export for gauge.
 *
 * @hidden
 */
var ImageExport = /** @class */ (function () {
    /**
     * Constructor for gauge
     *
     * @param {LinearGauge} control - Specifies the Linear Gauge instance.
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
    function ImageExport(control) {
    }
    /**
     * To export the file as image/svg format
     *
     * @param type
     * @param fileName
     * @private
     */
    ImageExport.prototype.export = function (gauge, type, fileName, allowDownload) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        var promise = new Promise(function (resolve) {
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
            var isDownload = !(Browser.userAgent.toString().indexOf('HeadlessChrome') > -1);
            var svgData = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">' +
                exportElement.outerHTML +
                '</svg>';
            var url = window.URL.createObjectURL(new Blob(type === 'SVG' ? [svgData] :
                [(new XMLSerializer()).serializeToString(exportElement)], { type: 'image/svg+xml' }));
            if (type === 'SVG') {
                if (allowDownload) {
                    triggerDownload(fileName, type, url, isDownload);
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
                        triggerDownload(fileName, type, element.toDataURL('image/png').replace('image/png', 'image/octet-stream'), isDownload);
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
    /**
     * Get module name.
     */
    ImageExport.prototype.getModuleName = function () {
        return 'ImageExport';
    };
    /**
     * To destroy the ImageExport.
     *
     * @return {void}
     * @private
     */
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    ImageExport.prototype.destroy = function () {
    };
    return ImageExport;
}());

/**
 * Represent the print and export for gauge.
 *
 * @hidden
 */
var PdfExport = /** @class */ (function () {
    /**
     * Constructor for gauge
     *
     * @param {LinearGauge} control - Specifies the Linear Gauge instance.
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
    function PdfExport(control) {
    }
    /**
     * To export the file as pdf format
     *
     * @param {LinearGauge} gauge - Specifies the Linear Gauge instance.
     * @param {ExportType} type - Specifies the extension type of the file to which the Linear Gauge to be exported.
     * @param {string} fileName - Specifies the name of the file.
     * @param {PdfPageOrientation} orientation - Specifies the orientation of the PDF document to export the gauge.
     * @param {boolean} allowDownload - Specifies whether the exported file should be downloaded or not.
     * @returns {Promise<string>} Returns the promise string
     * @private
     */
    PdfExport.prototype.export = function (gauge, type, fileName, orientation, allowDownload) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        var promise = new Promise(function (resolve) {
            var canvasElement = createElement('canvas', {
                id: 'ej2-canvas',
                attrs: {
                    'width': gauge.availableSize.width.toString(),
                    'height': gauge.availableSize.height.toString()
                }
            });
            orientation = isNullOrUndefined(orientation) ? PdfPageOrientation.Landscape : orientation;
            var svgData = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">' +
                gauge.svgObject.outerHTML +
                '</svg>';
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
            var url = window.URL.createObjectURL(new Blob(type === 'SVG' ? [svgData] :
                [(new XMLSerializer()).serializeToString(exportElement)], { type: 'image/svg+xml' }));
            var image = new Image();
            var context = canvasElement.getContext('2d');
            image.onload = (function () {
                context.drawImage(image, 0, 0);
                window.URL.revokeObjectURL(url);
                var document = new PdfDocument();
                var imageString = canvasElement.toDataURL('image/jpeg').replace('image/jpeg', 'image/octet-stream');
                document.pageSettings.orientation = orientation;
                imageString = imageString.slice(imageString.indexOf(',') + 1);
                document.pages.add().graphics.drawImage(new PdfBitmap(imageString), 0, 0, (gauge.availableSize.width - 60), gauge.availableSize.height);
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
    /**
     * Get module name.
     */
    PdfExport.prototype.getModuleName = function () {
        return 'PdfExport';
    };
    /**
     * To destroy the PdfExport.
     *
     * @return {void}
     * @private
     */
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    PdfExport.prototype.destroy = function () {
    };
    return PdfExport;
}());

export { Align, Annotation, Annotations, Axis, Border, ColorStop, Container, CustomizeOption, Font, GaugeLocation, GaugeTooltip, Gradient, GradientPosition, ImageExport, Label, Line, LinearGauge, LinearGradient, Margin, PathOption, PdfExport, Pointer, Print, RadialGradient, Range, RangeTooltip, Rect, RectOption, Size, TextOption, TextStyle, Tick, TooltipSettings, VisibleLabels, VisibleRange, calculateNiceInterval, calculateShapes, calculateTextPosition, convertPixelToValue, formatValue, getActualDesiredIntervalsCount, getBox, getElement, getElementOffset, getExtraWidth, getFontStyle, getMousePosition, getPathToRect, getPointer, getRangeColor, getRangePalette, getTemplateFunction, measureText, removeElement, removeTooltip, showTooltip, stringToNumber, stringToNumberSize, textElement, textFormatter, textTrim, triggerDownload, valueToCoefficient, withInRange };
//# sourceMappingURL=ej2-lineargauge.es5.js.map
