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
/**
 * Maps base doc
 */
import { Property, ChildProperty, Complex, Collection } from '@syncfusion/ej2-base';
import { defaultFont } from './constants';
/**
 * Sets and gets the options for customizing the color and width of the border in treemap.
 */
var Border = /** @class */ (function (_super) {
    __extends(Border, _super);
    function Border() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property('#808080')
    ], Border.prototype, "color", void 0);
    __decorate([
        Property(0)
    ], Border.prototype, "width", void 0);
    return Border;
}(ChildProperty));
export { Border };
/**
 * Sets and gets the margin for the treemap.
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
 * Sets and gets the options to customize the style of the text contents in the treemap.
 */
var Font = /** @class */ (function (_super) {
    __extends(Font, _super);
    function Font() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property(null)
    ], Font.prototype, "size", void 0);
    __decorate([
        Property(null)
    ], Font.prototype, "color", void 0);
    __decorate([
        Property(defaultFont)
    ], Font.prototype, "fontFamily", void 0);
    __decorate([
        Property('')
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
 * Sets and gets the options for customizing the title of the treemap.
 */
var CommonTitleSettings = /** @class */ (function (_super) {
    __extends(CommonTitleSettings, _super);
    function CommonTitleSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property('')
    ], CommonTitleSettings.prototype, "text", void 0);
    __decorate([
        Property('')
    ], CommonTitleSettings.prototype, "description", void 0);
    return CommonTitleSettings;
}(ChildProperty));
export { CommonTitleSettings };
/**
 * Sets and gets the options for customizing the subtitle of the treemap.
 */
var SubTitleSettings = /** @class */ (function (_super) {
    __extends(SubTitleSettings, _super);
    function SubTitleSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Complex({ fontFamily: null, fontWeight: null }, Font)
    ], SubTitleSettings.prototype, "textStyle", void 0);
    __decorate([
        Property('Center')
    ], SubTitleSettings.prototype, "alignment", void 0);
    return SubTitleSettings;
}(CommonTitleSettings));
export { SubTitleSettings };
/**
 * Sets and gets the options for customizing the title of the treemap.
 */
var TitleSettings = /** @class */ (function (_super) {
    __extends(TitleSettings, _super);
    function TitleSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Complex({ fontFamily: null, fontWeight: null }, Font)
    ], TitleSettings.prototype, "textStyle", void 0);
    __decorate([
        Property('Center')
    ], TitleSettings.prototype, "alignment", void 0);
    __decorate([
        Complex({}, SubTitleSettings)
    ], TitleSettings.prototype, "subtitleSettings", void 0);
    return TitleSettings;
}(CommonTitleSettings));
export { TitleSettings };
/**
 * Sets and gets the options to customize the color-mapping in treemap.
 */
var ColorMapping = /** @class */ (function (_super) {
    __extends(ColorMapping, _super);
    function ColorMapping() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property(null)
    ], ColorMapping.prototype, "from", void 0);
    __decorate([
        Property(null)
    ], ColorMapping.prototype, "to", void 0);
    __decorate([
        Property(null)
    ], ColorMapping.prototype, "color", void 0);
    __decorate([
        Property(null)
    ], ColorMapping.prototype, "label", void 0);
    __decorate([
        Property(null)
    ], ColorMapping.prototype, "value", void 0);
    __decorate([
        Property(null)
    ], ColorMapping.prototype, "minOpacity", void 0);
    __decorate([
        Property(null)
    ], ColorMapping.prototype, "maxOpacity", void 0);
    __decorate([
        Property(true)
    ], ColorMapping.prototype, "showLegend", void 0);
    return ColorMapping;
}(ChildProperty));
export { ColorMapping };
/**
 * Sets and gets the options for customizing the legend of the treemap.
 */
var LegendSettings = /** @class */ (function (_super) {
    __extends(LegendSettings, _super);
    function LegendSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property(false)
    ], LegendSettings.prototype, "visible", void 0);
    __decorate([
        Property('Default')
    ], LegendSettings.prototype, "mode", void 0);
    __decorate([
        Property('transparent')
    ], LegendSettings.prototype, "background", void 0);
    __decorate([
        Property('Circle')
    ], LegendSettings.prototype, "shape", void 0);
    __decorate([
        Property('')
    ], LegendSettings.prototype, "width", void 0);
    __decorate([
        Property('')
    ], LegendSettings.prototype, "height", void 0);
    __decorate([
        Complex({ size: null, fontFamily: null, fontWeight: null }, Font)
    ], LegendSettings.prototype, "textStyle", void 0);
    __decorate([
        Property(null)
    ], LegendSettings.prototype, "fill", void 0);
    __decorate([
        Property(1)
    ], LegendSettings.prototype, "opacity", void 0);
    __decorate([
        Property(15)
    ], LegendSettings.prototype, "shapeWidth", void 0);
    __decorate([
        Property(15)
    ], LegendSettings.prototype, "shapeHeight", void 0);
    __decorate([
        Property(10)
    ], LegendSettings.prototype, "shapePadding", void 0);
    __decorate([
        Property(null)
    ], LegendSettings.prototype, "imageUrl", void 0);
    __decorate([
        Complex({ color: null, width: null }, Border)
    ], LegendSettings.prototype, "border", void 0);
    __decorate([
        Complex({ color: '#000000', width: 0 }, Border)
    ], LegendSettings.prototype, "shapeBorder", void 0);
    __decorate([
        Complex({}, CommonTitleSettings)
    ], LegendSettings.prototype, "title", void 0);
    __decorate([
        Complex({ size: null, fontFamily: null, fontWeight: null }, Font)
    ], LegendSettings.prototype, "titleStyle", void 0);
    __decorate([
        Property('Bottom')
    ], LegendSettings.prototype, "position", void 0);
    __decorate([
        Property('None')
    ], LegendSettings.prototype, "orientation", void 0);
    __decorate([
        Property(false)
    ], LegendSettings.prototype, "invertedPointer", void 0);
    __decorate([
        Property('After')
    ], LegendSettings.prototype, "labelPosition", void 0);
    __decorate([
        Property('None')
    ], LegendSettings.prototype, "labelDisplayMode", void 0);
    __decorate([
        Property('Center')
    ], LegendSettings.prototype, "alignment", void 0);
    __decorate([
        Property({ x: 0, y: 0 })
    ], LegendSettings.prototype, "location", void 0);
    __decorate([
        Property(null)
    ], LegendSettings.prototype, "showLegendPath", void 0);
    __decorate([
        Property(null)
    ], LegendSettings.prototype, "valuePath", void 0);
    __decorate([
        Property(false)
    ], LegendSettings.prototype, "removeDuplicateLegend", void 0);
    return LegendSettings;
}(ChildProperty));
export { LegendSettings };
/**
 * Sets and gets the settings for drill down to visualize the treemap rendered in the initial state.
 */
var InitialDrillSettings = /** @class */ (function (_super) {
    __extends(InitialDrillSettings, _super);
    function InitialDrillSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property(null)
    ], InitialDrillSettings.prototype, "groupIndex", void 0);
    __decorate([
        Property(null)
    ], InitialDrillSettings.prototype, "groupName", void 0);
    return InitialDrillSettings;
}(ChildProperty));
export { InitialDrillSettings };
/**
 * Sets and gets the options for customizing the leaf item of the treemap.
 */
var LeafItemSettings = /** @class */ (function (_super) {
    __extends(LeafItemSettings, _super);
    function LeafItemSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property(null)
    ], LeafItemSettings.prototype, "fill", void 0);
    __decorate([
        Property(false)
    ], LeafItemSettings.prototype, "autoFill", void 0);
    __decorate([
        Complex({}, Border)
    ], LeafItemSettings.prototype, "border", void 0);
    __decorate([
        Property(0)
    ], LeafItemSettings.prototype, "gap", void 0);
    __decorate([
        Property(10)
    ], LeafItemSettings.prototype, "padding", void 0);
    __decorate([
        Property(1)
    ], LeafItemSettings.prototype, "opacity", void 0);
    __decorate([
        Property(true)
    ], LeafItemSettings.prototype, "showLabels", void 0);
    __decorate([
        Property(null)
    ], LeafItemSettings.prototype, "labelPath", void 0);
    __decorate([
        Property(null)
    ], LeafItemSettings.prototype, "labelFormat", void 0);
    __decorate([
        Property('TopLeft')
    ], LeafItemSettings.prototype, "labelPosition", void 0);
    __decorate([
        Complex({ color: null, size: null, fontFamily: null }, Font)
    ], LeafItemSettings.prototype, "labelStyle", void 0);
    __decorate([
        Property(null)
    ], LeafItemSettings.prototype, "labelTemplate", void 0);
    __decorate([
        Property('Center')
    ], LeafItemSettings.prototype, "templatePosition", void 0);
    __decorate([
        Property('Trim')
    ], LeafItemSettings.prototype, "interSectAction", void 0);
    __decorate([
        Collection([], ColorMapping)
    ], LeafItemSettings.prototype, "colorMapping", void 0);
    return LeafItemSettings;
}(ChildProperty));
export { LeafItemSettings };
/**
 * Sets and gets the options for customizing the tooltip of the treemap.
 */
var TooltipSettings = /** @class */ (function (_super) {
    __extends(TooltipSettings, _super);
    function TooltipSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property(false)
    ], TooltipSettings.prototype, "visible", void 0);
    __decorate([
        Property('')
    ], TooltipSettings.prototype, "template", void 0);
    __decorate([
        Property(null)
    ], TooltipSettings.prototype, "format", void 0);
    __decorate([
        Property(null)
    ], TooltipSettings.prototype, "fill", void 0);
    __decorate([
        Property(0.75)
    ], TooltipSettings.prototype, "opacity", void 0);
    __decorate([
        Property(['Circle'])
    ], TooltipSettings.prototype, "markerShapes", void 0);
    __decorate([
        Complex({ width: null, color: null }, Border)
    ], TooltipSettings.prototype, "border", void 0);
    __decorate([
        Complex({ fontFamily: null, size: null, fontWeight: null, opacity: null }, Font)
    ], TooltipSettings.prototype, "textStyle", void 0);
    return TooltipSettings;
}(ChildProperty));
export { TooltipSettings };
/**
 * Sets and gets the options for customizing the selection of the leaf items in treemap.
 */
var SelectionSettings = /** @class */ (function (_super) {
    __extends(SelectionSettings, _super);
    function SelectionSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property(false)
    ], SelectionSettings.prototype, "enable", void 0);
    __decorate([
        Property(null)
    ], SelectionSettings.prototype, "fill", void 0);
    __decorate([
        Property('0.5')
    ], SelectionSettings.prototype, "opacity", void 0);
    __decorate([
        Complex({}, Border)
    ], SelectionSettings.prototype, "border", void 0);
    __decorate([
        Property('Item')
    ], SelectionSettings.prototype, "mode", void 0);
    return SelectionSettings;
}(ChildProperty));
export { SelectionSettings };
/**
 * Sets and gets the options for customizing the highlighting of the treemap item,
 * when the mouse hover is performed in it.
 */
var HighlightSettings = /** @class */ (function (_super) {
    __extends(HighlightSettings, _super);
    function HighlightSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property(false)
    ], HighlightSettings.prototype, "enable", void 0);
    __decorate([
        Property('#808080')
    ], HighlightSettings.prototype, "fill", void 0);
    __decorate([
        Property('0.5')
    ], HighlightSettings.prototype, "opacity", void 0);
    __decorate([
        Complex({}, Border)
    ], HighlightSettings.prototype, "border", void 0);
    __decorate([
        Property('Item')
    ], HighlightSettings.prototype, "mode", void 0);
    return HighlightSettings;
}(ChildProperty));
export { HighlightSettings };
/**
 * Sets and gets the options for customizing the level leaf items of the treemap.
 */
var LevelSettings = /** @class */ (function (_super) {
    __extends(LevelSettings, _super);
    function LevelSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property(null)
    ], LevelSettings.prototype, "groupPath", void 0);
    __decorate([
        Property(0)
    ], LevelSettings.prototype, "groupGap", void 0);
    __decorate([
        Property(10)
    ], LevelSettings.prototype, "groupPadding", void 0);
    __decorate([
        Complex({}, Border)
    ], LevelSettings.prototype, "border", void 0);
    __decorate([
        Property(null)
    ], LevelSettings.prototype, "fill", void 0);
    __decorate([
        Property(false)
    ], LevelSettings.prototype, "autoFill", void 0);
    __decorate([
        Property(1)
    ], LevelSettings.prototype, "opacity", void 0);
    __decorate([
        Property(true)
    ], LevelSettings.prototype, "showHeader", void 0);
    __decorate([
        Property(20)
    ], LevelSettings.prototype, "headerHeight", void 0);
    __decorate([
        Property(null)
    ], LevelSettings.prototype, "headerTemplate", void 0);
    __decorate([
        Property(null)
    ], LevelSettings.prototype, "headerFormat", void 0);
    __decorate([
        Property('Near')
    ], LevelSettings.prototype, "headerAlignment", void 0);
    __decorate([
        Complex({ color: null, size: '13px', fontFamily: null }, Font)
    ], LevelSettings.prototype, "headerStyle", void 0);
    __decorate([
        Property('TopLeft')
    ], LevelSettings.prototype, "templatePosition", void 0);
    __decorate([
        Collection([], ColorMapping)
    ], LevelSettings.prototype, "colorMapping", void 0);
    return LevelSettings;
}(ChildProperty));
export { LevelSettings };
