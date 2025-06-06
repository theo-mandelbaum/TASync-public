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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Property, ChildProperty, Complex } from '@syncfusion/ej2-base';
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
export { Font };
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
export { TextStyle };
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
export { Margin };
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
export { Border };
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
export { Annotation };
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
export { Container };
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
export { RangeTooltip };
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
export { TooltipSettings };
