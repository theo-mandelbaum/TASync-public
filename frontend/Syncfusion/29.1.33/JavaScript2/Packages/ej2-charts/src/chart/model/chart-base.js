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
import { ChildProperty, Property, Complex, Collection } from '@syncfusion/ej2-base';
import { Font, Border, Accessibility, Margin, StackLabelsFont } from '../../common/model/base';
/**
 * Configures the annotation settings for a chart to highlight or provide additional information about specific points or regions.
 */
var ChartAnnotationSettings = /** @class */ (function (_super) {
    __extends(ChartAnnotationSettings, _super);
    function ChartAnnotationSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property('0')
    ], ChartAnnotationSettings.prototype, "x", void 0);
    __decorate([
        Property('0')
    ], ChartAnnotationSettings.prototype, "y", void 0);
    __decorate([
        Property(null)
    ], ChartAnnotationSettings.prototype, "content", void 0);
    __decorate([
        Property('Center')
    ], ChartAnnotationSettings.prototype, "horizontalAlignment", void 0);
    __decorate([
        Property('Pixel')
    ], ChartAnnotationSettings.prototype, "coordinateUnits", void 0);
    __decorate([
        Property('Chart')
    ], ChartAnnotationSettings.prototype, "region", void 0);
    __decorate([
        Property('Middle')
    ], ChartAnnotationSettings.prototype, "verticalAlignment", void 0);
    __decorate([
        Property(null)
    ], ChartAnnotationSettings.prototype, "xAxisName", void 0);
    __decorate([
        Property(null)
    ], ChartAnnotationSettings.prototype, "yAxisName", void 0);
    __decorate([
        Property(null)
    ], ChartAnnotationSettings.prototype, "description", void 0);
    __decorate([
        Complex({}, Accessibility)
    ], ChartAnnotationSettings.prototype, "accessibility", void 0);
    return ChartAnnotationSettings;
}(ChildProperty));
export { ChartAnnotationSettings };
/**
 * The `LabelBorder` class provides options to customize the border settings for chart labels.
 */
var LabelBorder = /** @class */ (function (_super) {
    __extends(LabelBorder, _super);
    function LabelBorder() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property('')
    ], LabelBorder.prototype, "color", void 0);
    __decorate([
        Property(1)
    ], LabelBorder.prototype, "width", void 0);
    __decorate([
        Property('Rectangle')
    ], LabelBorder.prototype, "type", void 0);
    return LabelBorder;
}(ChildProperty));
export { LabelBorder };
/**
 * The `MultiLevelCategories` class allows defining and customizing the categories used in multi-level labels.
 * This is particularly useful when there is a need to display hierarchical or grouped data labels on the chart axis.
 */
var MultiLevelCategories = /** @class */ (function (_super) {
    __extends(MultiLevelCategories, _super);
    function MultiLevelCategories() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property(null)
    ], MultiLevelCategories.prototype, "start", void 0);
    __decorate([
        Property(null)
    ], MultiLevelCategories.prototype, "end", void 0);
    __decorate([
        Property('')
    ], MultiLevelCategories.prototype, "text", void 0);
    __decorate([
        Property(null)
    ], MultiLevelCategories.prototype, "maximumTextWidth", void 0);
    __decorate([
        Property(null)
    ], MultiLevelCategories.prototype, "customAttributes", void 0);
    __decorate([
        Property('')
    ], MultiLevelCategories.prototype, "type", void 0);
    return MultiLevelCategories;
}(ChildProperty));
export { MultiLevelCategories };
/**
 * The `StripLineSettings` class provides configuration options for strip lines in a chart.
 */
var StripLineSettings = /** @class */ (function (_super) {
    __extends(StripLineSettings, _super);
    function StripLineSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property(true)
    ], StripLineSettings.prototype, "visible", void 0);
    __decorate([
        Property(false)
    ], StripLineSettings.prototype, "startFromAxis", void 0);
    __decorate([
        Property(null)
    ], StripLineSettings.prototype, "start", void 0);
    __decorate([
        Property(null)
    ], StripLineSettings.prototype, "end", void 0);
    __decorate([
        Property(null)
    ], StripLineSettings.prototype, "size", void 0);
    __decorate([
        Property('#808080')
    ], StripLineSettings.prototype, "color", void 0);
    __decorate([
        Property(null)
    ], StripLineSettings.prototype, "dashArray", void 0);
    __decorate([
        Property('Auto')
    ], StripLineSettings.prototype, "sizeType", void 0);
    __decorate([
        Property(false)
    ], StripLineSettings.prototype, "isRepeat", void 0);
    __decorate([
        Property(null)
    ], StripLineSettings.prototype, "repeatEvery", void 0);
    __decorate([
        Property(null)
    ], StripLineSettings.prototype, "repeatUntil", void 0);
    __decorate([
        Property(false)
    ], StripLineSettings.prototype, "isSegmented", void 0);
    __decorate([
        Property(null)
    ], StripLineSettings.prototype, "segmentStart", void 0);
    __decorate([
        Property(null)
    ], StripLineSettings.prototype, "segmentEnd", void 0);
    __decorate([
        Property(null)
    ], StripLineSettings.prototype, "segmentAxisName", void 0);
    __decorate([
        Complex({ color: 'transparent', width: 1 }, Border)
    ], StripLineSettings.prototype, "border", void 0);
    __decorate([
        Property('')
    ], StripLineSettings.prototype, "text", void 0);
    __decorate([
        Property(null)
    ], StripLineSettings.prototype, "rotation", void 0);
    __decorate([
        Property('Middle')
    ], StripLineSettings.prototype, "horizontalAlignment", void 0);
    __decorate([
        Property('Middle')
    ], StripLineSettings.prototype, "verticalAlignment", void 0);
    __decorate([
        Complex({ size: '12px', color: null, fontStyle: 'Normal', fontWeight: '400', fontFamily: null }, Font)
    ], StripLineSettings.prototype, "textStyle", void 0);
    __decorate([
        Property('Behind')
    ], StripLineSettings.prototype, "zIndex", void 0);
    __decorate([
        Property(1)
    ], StripLineSettings.prototype, "opacity", void 0);
    __decorate([
        Property('')
    ], StripLineSettings.prototype, "imageUrl", void 0);
    return StripLineSettings;
}(ChildProperty));
export { StripLineSettings };
/**
 * The `MultiLevelLabels` class is used to customize the appearance and behavior of multi-level labels in charts.
 */
var MultiLevelLabels = /** @class */ (function (_super) {
    __extends(MultiLevelLabels, _super);
    function MultiLevelLabels() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property('Center')
    ], MultiLevelLabels.prototype, "alignment", void 0);
    __decorate([
        Property('Wrap')
    ], MultiLevelLabels.prototype, "overflow", void 0);
    __decorate([
        Complex({ fontFamily: null, size: '12px', fontStyle: 'Normal', fontWeight: '400', color: null }, Font)
    ], MultiLevelLabels.prototype, "textStyle", void 0);
    __decorate([
        Complex({ color: null, width: 1, type: 'Rectangle' }, LabelBorder)
    ], MultiLevelLabels.prototype, "border", void 0);
    __decorate([
        Collection([], MultiLevelCategories)
    ], MultiLevelLabels.prototype, "categories", void 0);
    return MultiLevelLabels;
}(ChildProperty));
export { MultiLevelLabels };
/**
 * The `ScrollbarSettingsRange` class allows defining the start and end values for the scrollbar range in a chart.
 *
 * @public
 */
var ScrollbarSettingsRange = /** @class */ (function (_super) {
    __extends(ScrollbarSettingsRange, _super);
    function ScrollbarSettingsRange() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property(null)
    ], ScrollbarSettingsRange.prototype, "minimum", void 0);
    __decorate([
        Property(null)
    ], ScrollbarSettingsRange.prototype, "maximum", void 0);
    return ScrollbarSettingsRange;
}(ChildProperty));
export { ScrollbarSettingsRange };
/**
 * Specifies properties for customizing the scrollbar settings in lazy loading.
 */
var ScrollbarSettings = /** @class */ (function (_super) {
    __extends(ScrollbarSettings, _super);
    function ScrollbarSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property(false)
    ], ScrollbarSettings.prototype, "enable", void 0);
    __decorate([
        Property(null)
    ], ScrollbarSettings.prototype, "pointsLength", void 0);
    __decorate([
        Complex({}, ScrollbarSettingsRange)
    ], ScrollbarSettings.prototype, "range", void 0);
    __decorate([
        Property(null)
    ], ScrollbarSettings.prototype, "trackColor", void 0);
    __decorate([
        Property(0)
    ], ScrollbarSettings.prototype, "scrollbarRadius", void 0);
    __decorate([
        Property(null)
    ], ScrollbarSettings.prototype, "scrollbarColor", void 0);
    __decorate([
        Property(0)
    ], ScrollbarSettings.prototype, "trackRadius", void 0);
    __decorate([
        Property(null)
    ], ScrollbarSettings.prototype, "gripColor", void 0);
    __decorate([
        Property(16)
    ], ScrollbarSettings.prototype, "height", void 0);
    __decorate([
        Property(true)
    ], ScrollbarSettings.prototype, "enableZoom", void 0);
    __decorate([
        Property('PlaceNextToAxisLine')
    ], ScrollbarSettings.prototype, "position", void 0);
    return ScrollbarSettings;
}(ChildProperty));
export { ScrollbarSettings };
/**
 * Configures the ToolbarPosition for the chart.
 */
var ToolbarPosition = /** @class */ (function (_super) {
    __extends(ToolbarPosition, _super);
    function ToolbarPosition() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property('Far')
    ], ToolbarPosition.prototype, "horizontalAlignment", void 0);
    __decorate([
        Property('Top')
    ], ToolbarPosition.prototype, "verticalAlignment", void 0);
    __decorate([
        Property(0)
    ], ToolbarPosition.prototype, "x", void 0);
    __decorate([
        Property(0)
    ], ToolbarPosition.prototype, "y", void 0);
    __decorate([
        Property(false)
    ], ToolbarPosition.prototype, "draggable", void 0);
    return ToolbarPosition;
}(ChildProperty));
export { ToolbarPosition };
/**
 * Represents the settings for configuring stack labels in a chart.
 */
var StackLabelSettings = /** @class */ (function (_super) {
    __extends(StackLabelSettings, _super);
    function StackLabelSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property(false)
    ], StackLabelSettings.prototype, "visible", void 0);
    __decorate([
        Property('transparent')
    ], StackLabelSettings.prototype, "fill", void 0);
    __decorate([
        Property(null)
    ], StackLabelSettings.prototype, "format", void 0);
    __decorate([
        Property(0)
    ], StackLabelSettings.prototype, "angle", void 0);
    __decorate([
        Property(5)
    ], StackLabelSettings.prototype, "rx", void 0);
    __decorate([
        Property(5)
    ], StackLabelSettings.prototype, "ry", void 0);
    __decorate([
        Complex({ left: 5, right: 5, top: 5, bottom: 5 }, Margin)
    ], StackLabelSettings.prototype, "margin", void 0);
    __decorate([
        Complex({ width: null, color: null }, Border)
    ], StackLabelSettings.prototype, "border", void 0);
    __decorate([
        Complex({ size: null, color: null, fontStyle: null, fontWeight: 'Bold', fontFamily: null }, StackLabelsFont)
    ], StackLabelSettings.prototype, "font", void 0);
    return StackLabelSettings;
}(ChildProperty));
export { StackLabelSettings };
