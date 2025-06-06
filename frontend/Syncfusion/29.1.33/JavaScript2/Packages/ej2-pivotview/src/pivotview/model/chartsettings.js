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
import { Property, ChildProperty, Event, Complex, Collection } from '@syncfusion/ej2-base';
import { titleSettings } from '@syncfusion/ej2-charts';
import { axisLabelFont, axisTitleFont, crosshairLabelFont, legendLabelFont, stripLineLabelFont, tooltipLabelFont } from '../../common/base/themes';
/**
 * Allows to configure the animation behavior for chart series such as animation duration and delay.
 */
var Animation = /** @class */ (function (_super) {
    __extends(Animation, _super);
    function Animation() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property(true)
    ], Animation.prototype, "enable", void 0);
    __decorate([
        Property(1000)
    ], Animation.prototype, "duration", void 0);
    __decorate([
        Property(0)
    ], Animation.prototype, "delay", void 0);
    return Animation;
}(ChildProperty));
export { Animation };
/**
 * Allows to customize specific region for line type series with a variety of means such as value, color, pattern of dashes.
 */
var ChartSegment = /** @class */ (function (_super) {
    __extends(ChartSegment, _super);
    function ChartSegment() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property(null)
    ], ChartSegment.prototype, "value", void 0);
    __decorate([
        Property(null)
    ], ChartSegment.prototype, "color", void 0);
    __decorate([
        Property('0')
    ], ChartSegment.prototype, "dashArray", void 0);
    return ChartSegment;
}(ChildProperty));
export { ChartSegment };
/**
 * Allows to customize the appearance of the text in the chart such as font style, font size, font weight, font color, font family, text alignment, opacity, text overflow.
 */
var Font = /** @class */ (function (_super) {
    __extends(Font, _super);
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
        Property('Center')
    ], Font.prototype, "textAlignment", void 0);
    __decorate([
        Property('Segoe UI')
    ], Font.prototype, "fontFamily", void 0);
    __decorate([
        Property(1)
    ], Font.prototype, "opacity", void 0);
    __decorate([
        Property('Trim')
    ], Font.prototype, "textOverflow", void 0);
    return Font;
}(ChildProperty));
export { Font };
/**
 * Allow options to customize the left, right, top and bottom margins of the pivot chart.
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
 * Allow options to customize the border of the chart such as color and border size in the pivot chart.
 * For example, to display the chart border color as red, set the properties `color` to either **"red"**
 * or **"#FF0000"** or **"rgba(255,0,0,1.0)"** and `width` to **0.5**.
 */
var Border = /** @class */ (function (_super) {
    __extends(Border, _super);
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
export { Border };
/**
 * Allows to configure the position of the marker such as top and left in the chart.
 */
var Offset = /** @class */ (function (_super) {
    __extends(Offset, _super);
    function Offset() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property(0)
    ], Offset.prototype, "x", void 0);
    __decorate([
        Property(0)
    ], Offset.prototype, "y", void 0);
    return Offset;
}(ChildProperty));
export { Offset };
/**
 * Allows you to highlight a specific point of the series while rendering the pivot chart.
 * For example, to highlight first point in the first series, set the properties series to 0 and points to 1. To use this option, it requires the property `selectionMode` to be **Point** or **Series**.
 *
 * @public
 */
var Indexes = /** @class */ (function (_super) {
    __extends(Indexes, _super);
    function Indexes() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property(0)
    ], Indexes.prototype, "series", void 0);
    __decorate([
        Property(0)
    ], Indexes.prototype, "point", void 0);
    return Indexes;
}(ChildProperty));
export { Indexes };
/**
 * Allow options to customize the chart area with a variety of settings such as background color, border, opacity and background image in the pivot chart.
 * For example, to change the of the pivot chart's background, set the property `opacity` to **0.5**.
 */
var ChartArea = /** @class */ (function (_super) {
    __extends(ChartArea, _super);
    function ChartArea() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Complex({}, Border)
    ], ChartArea.prototype, "border", void 0);
    __decorate([
        Property('transparent')
    ], ChartArea.prototype, "background", void 0);
    __decorate([
        Property(1)
    ], ChartArea.prototype, "opacity", void 0);
    __decorate([
        Property(null)
    ], ChartArea.prototype, "backgroundImage", void 0);
    return ChartArea;
}(ChildProperty));
export { ChartArea };
/**
 * Allow options to customize the crosshair line with different settings such as color and width of the line,
 * line types that are shown horizontally and vertically to indicate the value of the axis at the mouse hover or touch position in the pivot chart.
 */
var CrosshairSettings = /** @class */ (function (_super) {
    __extends(CrosshairSettings, _super);
    function CrosshairSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property(false)
    ], CrosshairSettings.prototype, "enable", void 0);
    __decorate([
        Property('')
    ], CrosshairSettings.prototype, "dashArray", void 0);
    __decorate([
        Complex({ color: null, width: 1 }, Border)
    ], CrosshairSettings.prototype, "line", void 0);
    __decorate([
        Property('Both')
    ], CrosshairSettings.prototype, "lineType", void 0);
    return CrosshairSettings;
}(ChildProperty));
export { CrosshairSettings };
/**
 * Allows to configure the data label with different settings such as name, fill color, opacity, rotation angle, border, margins, etc in the chart.
 */
var DataLabelSettings = /** @class */ (function (_super) {
    __extends(DataLabelSettings, _super);
    function DataLabelSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property(false)
    ], DataLabelSettings.prototype, "visible", void 0);
    __decorate([
        Property(null)
    ], DataLabelSettings.prototype, "name", void 0);
    __decorate([
        Property('transparent')
    ], DataLabelSettings.prototype, "fill", void 0);
    __decorate([
        Property(1)
    ], DataLabelSettings.prototype, "opacity", void 0);
    __decorate([
        Property(0)
    ], DataLabelSettings.prototype, "angle", void 0);
    __decorate([
        Property(false)
    ], DataLabelSettings.prototype, "enableRotation", void 0);
    __decorate([
        Property('Auto')
    ], DataLabelSettings.prototype, "position", void 0);
    __decorate([
        Property(5)
    ], DataLabelSettings.prototype, "rx", void 0);
    __decorate([
        Property(5)
    ], DataLabelSettings.prototype, "ry", void 0);
    __decorate([
        Property('Center')
    ], DataLabelSettings.prototype, "alignment", void 0);
    __decorate([
        Complex({ width: null, color: null }, Border)
    ], DataLabelSettings.prototype, "border", void 0);
    __decorate([
        Complex({ left: 5, right: 5, top: 5, bottom: 5 }, Margin)
    ], DataLabelSettings.prototype, "margin", void 0);
    __decorate([
        Complex({ size: '11px', color: '', fontStyle: 'Normal', fontWeight: 'Normal', fontFamily: 'Segoe UI' }, Font)
    ], DataLabelSettings.prototype, "font", void 0);
    __decorate([
        Property(null)
    ], DataLabelSettings.prototype, "template", void 0);
    return DataLabelSettings;
}(ChildProperty));
export { DataLabelSettings };
/**
 * Allow options to customize the pie, funnel, doughnut and pyramid chart data label connector.
 */
var PivotChartConnectorStyle = /** @class */ (function (_super) {
    __extends(PivotChartConnectorStyle, _super);
    function PivotChartConnectorStyle() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property('Line')
    ], PivotChartConnectorStyle.prototype, "type", void 0);
    __decorate([
        Property(null)
    ], PivotChartConnectorStyle.prototype, "color", void 0);
    __decorate([
        Property(1)
    ], PivotChartConnectorStyle.prototype, "width", void 0);
    __decorate([
        Property(null)
    ], PivotChartConnectorStyle.prototype, "length", void 0);
    __decorate([
        Property('')
    ], PivotChartConnectorStyle.prototype, "dashArray", void 0);
    return PivotChartConnectorStyle;
}(ChildProperty));
export { PivotChartConnectorStyle };
/**
 * Allow options to customize the pie, funnel, doughnut and pyramid chart data label connector.
 */
var PivotChartDataLabel = /** @class */ (function (_super) {
    __extends(PivotChartDataLabel, _super);
    function PivotChartDataLabel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property(true)
    ], PivotChartDataLabel.prototype, "visible", void 0);
    __decorate([
        Complex({ width: null, color: null }, Border)
    ], PivotChartDataLabel.prototype, "border", void 0);
    __decorate([
        Complex({ size: '11px', color: '', fontStyle: 'Normal', fontWeight: 'Normal', fontFamily: 'Segoe UI' }, Font)
    ], PivotChartDataLabel.prototype, "font", void 0);
    __decorate([
        Property('transparent')
    ], PivotChartDataLabel.prototype, "fill", void 0);
    __decorate([
        Property(0)
    ], PivotChartDataLabel.prototype, "angle", void 0);
    __decorate([
        Property(false)
    ], PivotChartDataLabel.prototype, "enableRotation", void 0);
    __decorate([
        Property('Outside')
    ], PivotChartDataLabel.prototype, "position", void 0);
    __decorate([
        Property(5)
    ], PivotChartDataLabel.prototype, "rx", void 0);
    __decorate([
        Property(5)
    ], PivotChartDataLabel.prototype, "ry", void 0);
    __decorate([
        Property(null)
    ], PivotChartDataLabel.prototype, "template", void 0);
    __decorate([
        Complex({}, PivotChartConnectorStyle)
    ], PivotChartDataLabel.prototype, "connectorStyle", void 0);
    return PivotChartDataLabel;
}(ChildProperty));
export { PivotChartDataLabel };
/**
 *  Allows to configure the marker of the series such as shape, width, height, border, position, fill color, opacity, data label etc in the chart
 */
var MarkerSettings = /** @class */ (function (_super) {
    __extends(MarkerSettings, _super);
    function MarkerSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property(false)
    ], MarkerSettings.prototype, "visible", void 0);
    __decorate([
        Property('Circle')
    ], MarkerSettings.prototype, "shape", void 0);
    __decorate([
        Property('')
    ], MarkerSettings.prototype, "imageUrl", void 0);
    __decorate([
        Property(5)
    ], MarkerSettings.prototype, "width", void 0);
    __decorate([
        Property(5)
    ], MarkerSettings.prototype, "height", void 0);
    __decorate([
        Complex({ width: 2, color: null }, Border)
    ], MarkerSettings.prototype, "border", void 0);
    __decorate([
        Complex({ x: 0, y: 0 }, Offset)
    ], MarkerSettings.prototype, "offset", void 0);
    __decorate([
        Property(null)
    ], MarkerSettings.prototype, "fill", void 0);
    __decorate([
        Property(1)
    ], MarkerSettings.prototype, "opacity", void 0);
    __decorate([
        Complex({}, DataLabelSettings)
    ], MarkerSettings.prototype, "dataLabel", void 0);
    return MarkerSettings;
}(ChildProperty));
export { MarkerSettings };
/**
 * Allows to configure the error bar cap settings such as cap width, length, color, opacity.
 */
var ErrorBarCapSettings = /** @class */ (function (_super) {
    __extends(ErrorBarCapSettings, _super);
    function ErrorBarCapSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property(1)
    ], ErrorBarCapSettings.prototype, "width", void 0);
    __decorate([
        Property(10)
    ], ErrorBarCapSettings.prototype, "length", void 0);
    __decorate([
        Property(null)
    ], ErrorBarCapSettings.prototype, "color", void 0);
    __decorate([
        Property(1)
    ], ErrorBarCapSettings.prototype, "opacity", void 0);
    return ErrorBarCapSettings;
}(ChildProperty));
export { ErrorBarCapSettings };
/**
 * Allows options for customize the error bar chart with different settings such as type, direction, mode, color, width, etc.
 *
 * @public
 */
var ErrorBarSettings = /** @class */ (function (_super) {
    __extends(ErrorBarSettings, _super);
    function ErrorBarSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property(false)
    ], ErrorBarSettings.prototype, "visible", void 0);
    __decorate([
        Property('Fixed')
    ], ErrorBarSettings.prototype, "type", void 0);
    __decorate([
        Property('Both')
    ], ErrorBarSettings.prototype, "direction", void 0);
    __decorate([
        Property('Vertical')
    ], ErrorBarSettings.prototype, "mode", void 0);
    __decorate([
        Property(1)
    ], ErrorBarSettings.prototype, "verticalError", void 0);
    __decorate([
        Property(null)
    ], ErrorBarSettings.prototype, "color", void 0);
    __decorate([
        Property(1)
    ], ErrorBarSettings.prototype, "width", void 0);
    __decorate([
        Property(1)
    ], ErrorBarSettings.prototype, "horizontalError", void 0);
    __decorate([
        Property(3)
    ], ErrorBarSettings.prototype, "verticalNegativeError", void 0);
    __decorate([
        Property(3)
    ], ErrorBarSettings.prototype, "verticalPositiveError", void 0);
    __decorate([
        Property(1)
    ], ErrorBarSettings.prototype, "horizontalNegativeError", void 0);
    __decorate([
        Property(1)
    ], ErrorBarSettings.prototype, "horizontalPositiveError", void 0);
    __decorate([
        Complex(null, ErrorBarCapSettings)
    ], ErrorBarSettings.prototype, "errorBarCap", void 0);
    return ErrorBarSettings;
}(ChildProperty));
export { ErrorBarSettings };
/**
 * Allows to configure the trendlines of the chart such as name, period, type, tooltip, marker, animation, color, legend shape, etc.
 */
var Trendline = /** @class */ (function (_super) {
    __extends(Trendline, _super);
    function Trendline() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property('')
    ], Trendline.prototype, "name", void 0);
    __decorate([
        Property('0')
    ], Trendline.prototype, "dashArray", void 0);
    __decorate([
        Property(true)
    ], Trendline.prototype, "visible", void 0);
    __decorate([
        Property(2)
    ], Trendline.prototype, "period", void 0);
    __decorate([
        Property('Linear')
    ], Trendline.prototype, "type", void 0);
    __decorate([
        Property(0)
    ], Trendline.prototype, "backwardForecast", void 0);
    __decorate([
        Property(0)
    ], Trendline.prototype, "forwardForecast", void 0);
    __decorate([
        Property(2)
    ], Trendline.prototype, "polynomialOrder", void 0);
    __decorate([
        Complex({}, MarkerSettings)
    ], Trendline.prototype, "marker", void 0);
    __decorate([
        Property(true)
    ], Trendline.prototype, "enableTooltip", void 0);
    __decorate([
        Complex({}, Animation)
    ], Trendline.prototype, "animation", void 0);
    __decorate([
        Property('')
    ], Trendline.prototype, "fill", void 0);
    __decorate([
        Property(1)
    ], Trendline.prototype, "width", void 0);
    __decorate([
        Property(null)
    ], Trendline.prototype, "intercept", void 0);
    __decorate([
        Property('SeriesType')
    ], Trendline.prototype, "legendShape", void 0);
    return Trendline;
}(ChildProperty));
export { Trendline };
/**
 * Allows to configure the empty points with a variety of means such as fill color, border and mode in the chart.
 */
var EmptyPointSettings = /** @class */ (function (_super) {
    __extends(EmptyPointSettings, _super);
    function EmptyPointSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property(null)
    ], EmptyPointSettings.prototype, "fill", void 0);
    __decorate([
        Complex({ color: 'transparent', width: 0 }, Border)
    ], EmptyPointSettings.prototype, "border", void 0);
    __decorate([
        Property('Zero')
    ], EmptyPointSettings.prototype, "mode", void 0);
    return EmptyPointSettings;
}(ChildProperty));
export { EmptyPointSettings };
/**
 * Allows to customize the rounded corners of the column series in the chart.
 */
var CornerRadius = /** @class */ (function (_super) {
    __extends(CornerRadius, _super);
    function CornerRadius() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property(0)
    ], CornerRadius.prototype, "topLeft", void 0);
    __decorate([
        Property(0)
    ], CornerRadius.prototype, "topRight", void 0);
    __decorate([
        Property(0)
    ], CornerRadius.prototype, "bottomLeft", void 0);
    __decorate([
        Property(0)
    ], CornerRadius.prototype, "bottomRight", void 0);
    return CornerRadius;
}(ChildProperty));
export { CornerRadius };
/**
 * Allows to configure the crosshair tooltip with text style and fill color in the chart.
 */
var CrosshairTooltip = /** @class */ (function (_super) {
    __extends(CrosshairTooltip, _super);
    function CrosshairTooltip() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property(false)
    ], CrosshairTooltip.prototype, "enable", void 0);
    __decorate([
        Property(null)
    ], CrosshairTooltip.prototype, "fill", void 0);
    __decorate([
        Complex(crosshairLabelFont, Font)
    ], CrosshairTooltip.prototype, "textStyle", void 0);
    return CrosshairTooltip;
}(ChildProperty));
export { CrosshairTooltip };
/**
 * Allows to configure the strip line properties such as line position, size, color, size type, border, text and opacity in the chart.
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
        Complex(stripLineLabelFont, Font)
    ], StripLineSettings.prototype, "textStyle", void 0);
    __decorate([
        Property('Behind')
    ], StripLineSettings.prototype, "zIndex", void 0);
    __decorate([
        Property(1)
    ], StripLineSettings.prototype, "opacity", void 0);
    return StripLineSettings;
}(ChildProperty));
export { StripLineSettings };
/**
 * Allows to customize the label border with a variety of means such as label color, width and label type in the chart.
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
 * Allows to configure the major grid lines such as line width, color and dashArray in the `axis`.
 */
var MajorGridLines = /** @class */ (function (_super) {
    __extends(MajorGridLines, _super);
    function MajorGridLines() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property(1)
    ], MajorGridLines.prototype, "width", void 0);
    __decorate([
        Property('')
    ], MajorGridLines.prototype, "dashArray", void 0);
    __decorate([
        Property(null)
    ], MajorGridLines.prototype, "color", void 0);
    return MajorGridLines;
}(ChildProperty));
export { MajorGridLines };
/**
 * Allows to configure the minor grid lines such as line width, dashArray and color in the `axis`.
 */
var MinorGridLines = /** @class */ (function (_super) {
    __extends(MinorGridLines, _super);
    function MinorGridLines() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property(0.7)
    ], MinorGridLines.prototype, "width", void 0);
    __decorate([
        Property('')
    ], MinorGridLines.prototype, "dashArray", void 0);
    __decorate([
        Property(null)
    ], MinorGridLines.prototype, "color", void 0);
    return MinorGridLines;
}(ChildProperty));
export { MinorGridLines };
/**
 * Allows to configure the axis line such as line width, dashArray and color in a chart.
 */
var AxisLine = /** @class */ (function (_super) {
    __extends(AxisLine, _super);
    function AxisLine() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property(1)
    ], AxisLine.prototype, "width", void 0);
    __decorate([
        Property('')
    ], AxisLine.prototype, "dashArray", void 0);
    __decorate([
        Property(null)
    ], AxisLine.prototype, "color", void 0);
    return AxisLine;
}(ChildProperty));
export { AxisLine };
/**
 * Allows to configure the major tick lines such as width, height and color in the chart.
 */
var MajorTickLines = /** @class */ (function (_super) {
    __extends(MajorTickLines, _super);
    function MajorTickLines() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property(1)
    ], MajorTickLines.prototype, "width", void 0);
    __decorate([
        Property(5)
    ], MajorTickLines.prototype, "height", void 0);
    __decorate([
        Property(null)
    ], MajorTickLines.prototype, "color", void 0);
    return MajorTickLines;
}(ChildProperty));
export { MajorTickLines };
/**
 * Allows to configure the minor tick lines such as width, height and color in the chart.
 */
var MinorTickLines = /** @class */ (function (_super) {
    __extends(MinorTickLines, _super);
    function MinorTickLines() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property(0.7)
    ], MinorTickLines.prototype, "width", void 0);
    __decorate([
        Property(5)
    ], MinorTickLines.prototype, "height", void 0);
    __decorate([
        Property(null)
    ], MinorTickLines.prototype, "color", void 0);
    return MinorTickLines;
}(ChildProperty));
export { MinorTickLines };
/**
 * Allows to configure the position of the legend such as top and left in the chart.
 */
var ChartLocation = /** @class */ (function (_super) {
    __extends(ChartLocation, _super);
    function ChartLocation() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property(0)
    ], ChartLocation.prototype, "x", void 0);
    __decorate([
        Property(0)
    ], ChartLocation.prototype, "y", void 0);
    return ChartLocation;
}(ChildProperty));
export { ChartLocation };
/**
 * Allow options to customize the border of the chart series such as color and border size in the pivot chart.
 * For example, to display the chart series border color as red, set the properties `color` to either **"red"** or **"#FF0000"** or **"rgba(255,0,0,1.0)"** and `width` to **0.5**.
 */
var PivotChartSeriesBorder = /** @class */ (function () {
    function PivotChartSeriesBorder() {
    }
    __decorate([
        Property('')
    ], PivotChartSeriesBorder.prototype, "color", void 0);
    __decorate([
        Property(1)
    ], PivotChartSeriesBorder.prototype, "width", void 0);
    return PivotChartSeriesBorder;
}());
export { PivotChartSeriesBorder };
/**
 * Allows to configure the animation behavior for chart series such as animation duration and delay.
 */
var PivotChartSeriesAnimation = /** @class */ (function () {
    function PivotChartSeriesAnimation() {
    }
    __decorate([
        Property(true)
    ], PivotChartSeriesAnimation.prototype, "enable", void 0);
    __decorate([
        Property(1000)
    ], PivotChartSeriesAnimation.prototype, "duration", void 0);
    __decorate([
        Property(0)
    ], PivotChartSeriesAnimation.prototype, "delay", void 0);
    return PivotChartSeriesAnimation;
}());
export { PivotChartSeriesAnimation };
/**
 * Allows to customize specific region for line type series with a variety of means such as value, color, pattern of dashes.
 */
var PivotChartSeriesSegment = /** @class */ (function () {
    function PivotChartSeriesSegment() {
    }
    __decorate([
        Property(null)
    ], PivotChartSeriesSegment.prototype, "value", void 0);
    __decorate([
        Property(null)
    ], PivotChartSeriesSegment.prototype, "color", void 0);
    __decorate([
        Property('0')
    ], PivotChartSeriesSegment.prototype, "dashArray", void 0);
    return PivotChartSeriesSegment;
}());
export { PivotChartSeriesSegment };
/**
 *  Allows to configure the marker of the series such as shape, width, height, border, position, fill color, opacity, data label etc in the chart
 */
var PivotChartSeriesMarkerSettings = /** @class */ (function () {
    function PivotChartSeriesMarkerSettings() {
    }
    __decorate([
        Property(false)
    ], PivotChartSeriesMarkerSettings.prototype, "visible", void 0);
    __decorate([
        Property('Circle')
    ], PivotChartSeriesMarkerSettings.prototype, "shape", void 0);
    __decorate([
        Property('')
    ], PivotChartSeriesMarkerSettings.prototype, "imageUrl", void 0);
    __decorate([
        Property(5)
    ], PivotChartSeriesMarkerSettings.prototype, "height", void 0);
    __decorate([
        Property(5)
    ], PivotChartSeriesMarkerSettings.prototype, "width", void 0);
    __decorate([
        Complex({ width: 2, color: null }, Border)
    ], PivotChartSeriesMarkerSettings.prototype, "border", void 0);
    __decorate([
        Property(null)
    ], PivotChartSeriesMarkerSettings.prototype, "fill", void 0);
    __decorate([
        Property(1)
    ], PivotChartSeriesMarkerSettings.prototype, "opacity", void 0);
    __decorate([
        Complex({}, DataLabelSettings)
    ], PivotChartSeriesMarkerSettings.prototype, "dataLabel", void 0);
    return PivotChartSeriesMarkerSettings;
}());
export { PivotChartSeriesMarkerSettings };
/**
 * Allows options for customize the error bar chart series with different settings such as type, direction, mode, color, width, etc.
 */
var PivotChartSeriesErrorSettings = /** @class */ (function () {
    function PivotChartSeriesErrorSettings() {
    }
    __decorate([
        Property(false)
    ], PivotChartSeriesErrorSettings.prototype, "visible", void 0);
    __decorate([
        Property('Fixed')
    ], PivotChartSeriesErrorSettings.prototype, "type", void 0);
    __decorate([
        Property('Both')
    ], PivotChartSeriesErrorSettings.prototype, "direction", void 0);
    __decorate([
        Property('Vertical')
    ], PivotChartSeriesErrorSettings.prototype, "mode", void 0);
    __decorate([
        Property(null)
    ], PivotChartSeriesErrorSettings.prototype, "color", void 0);
    __decorate([
        Property(1)
    ], PivotChartSeriesErrorSettings.prototype, "verticalError", void 0);
    __decorate([
        Property(1)
    ], PivotChartSeriesErrorSettings.prototype, "width", void 0);
    __decorate([
        Property(1)
    ], PivotChartSeriesErrorSettings.prototype, "horizontalError", void 0);
    __decorate([
        Property(3)
    ], PivotChartSeriesErrorSettings.prototype, "verticalPositiveError", void 0);
    __decorate([
        Property(3)
    ], PivotChartSeriesErrorSettings.prototype, "verticalNegativeError", void 0);
    __decorate([
        Property(1)
    ], PivotChartSeriesErrorSettings.prototype, "horizontalPositiveError", void 0);
    __decorate([
        Property(1)
    ], PivotChartSeriesErrorSettings.prototype, "horizontalNegativeError", void 0);
    __decorate([
        Complex(null, ErrorBarCapSettings)
    ], PivotChartSeriesErrorSettings.prototype, "errorBarCap", void 0);
    return PivotChartSeriesErrorSettings;
}());
export { PivotChartSeriesErrorSettings };
/**
 * Allows to configure the trendlines of the chart series such as name, period, type, tooltip, marker, animation, color, legend shape, etc.
 */
var PivotChartSeriesTrendline = /** @class */ (function () {
    function PivotChartSeriesTrendline() {
    }
    __decorate([
        Property('')
    ], PivotChartSeriesTrendline.prototype, "name", void 0);
    __decorate([
        Property('Linear')
    ], PivotChartSeriesTrendline.prototype, "type", void 0);
    __decorate([
        Property(2)
    ], PivotChartSeriesTrendline.prototype, "period", void 0);
    __decorate([
        Property(2)
    ], PivotChartSeriesTrendline.prototype, "polynomialOrder", void 0);
    __decorate([
        Property(0)
    ], PivotChartSeriesTrendline.prototype, "backwardForecast", void 0);
    __decorate([
        Property(0)
    ], PivotChartSeriesTrendline.prototype, "forwardForecast", void 0);
    __decorate([
        Complex({}, Animation)
    ], PivotChartSeriesTrendline.prototype, "animation", void 0);
    __decorate([
        Complex({}, MarkerSettings)
    ], PivotChartSeriesTrendline.prototype, "marker", void 0);
    __decorate([
        Property(true)
    ], PivotChartSeriesTrendline.prototype, "enableTooltip", void 0);
    __decorate([
        Property(null)
    ], PivotChartSeriesTrendline.prototype, "intercept", void 0);
    __decorate([
        Property('')
    ], PivotChartSeriesTrendline.prototype, "fill", void 0);
    __decorate([
        Property(1)
    ], PivotChartSeriesTrendline.prototype, "width", void 0);
    __decorate([
        Property('SeriesType')
    ], PivotChartSeriesTrendline.prototype, "legendShape", void 0);
    return PivotChartSeriesTrendline;
}());
export { PivotChartSeriesTrendline };
/**
 * Allows to configure the empty points with a variety of means such as fill color, border and mode in the chart.
 */
var PivotChartSeriesEmptyPointSettings = /** @class */ (function () {
    function PivotChartSeriesEmptyPointSettings() {
    }
    __decorate([
        Property(null)
    ], PivotChartSeriesEmptyPointSettings.prototype, "fill", void 0);
    __decorate([
        Complex({ color: 'transparent', width: 0 }, Border)
    ], PivotChartSeriesEmptyPointSettings.prototype, "border", void 0);
    __decorate([
        Property('Zero')
    ], PivotChartSeriesEmptyPointSettings.prototype, "mode", void 0);
    return PivotChartSeriesEmptyPointSettings;
}());
export { PivotChartSeriesEmptyPointSettings };
/**
 * Allows to customize the rounded corners of the column series in the chart.
 */
var PivotChartSeriesCornerRadius = /** @class */ (function () {
    function PivotChartSeriesCornerRadius() {
    }
    __decorate([
        Property(0)
    ], PivotChartSeriesCornerRadius.prototype, "topLeft", void 0);
    __decorate([
        Property(0)
    ], PivotChartSeriesCornerRadius.prototype, "topRight", void 0);
    __decorate([
        Property(0)
    ], PivotChartSeriesCornerRadius.prototype, "bottomLeft", void 0);
    __decorate([
        Property(0)
    ], PivotChartSeriesCornerRadius.prototype, "bottomRight", void 0);
    return PivotChartSeriesCornerRadius;
}());
export { PivotChartSeriesCornerRadius };
/**
 * Allows to customize the appearance of the text in the chart such as font style, font size, font weight, font color, font family, text alignment, opacity, text overflow.
 */
var PivotChartAxisFont = /** @class */ (function () {
    function PivotChartAxisFont() {
    }
    __decorate([
        Property('Normal')
    ], PivotChartAxisFont.prototype, "fontStyle", void 0);
    __decorate([
        Property('16px')
    ], PivotChartAxisFont.prototype, "size", void 0);
    __decorate([
        Property('Normal')
    ], PivotChartAxisFont.prototype, "fontWeight", void 0);
    __decorate([
        Property('')
    ], PivotChartAxisFont.prototype, "color", void 0);
    __decorate([
        Property('Center')
    ], PivotChartAxisFont.prototype, "textAlignment", void 0);
    __decorate([
        Property('Segoe UI')
    ], PivotChartAxisFont.prototype, "fontFamily", void 0);
    __decorate([
        Property(1)
    ], PivotChartAxisFont.prototype, "opacity", void 0);
    __decorate([
        Property('Trim')
    ], PivotChartAxisFont.prototype, "textOverflow", void 0);
    return PivotChartAxisFont;
}());
export { PivotChartAxisFont };
/**
 * Allows to configure the crosshair tooltip with text style and fill color in the chart.
 */
var PivotChartAxisCrosshairTooltip = /** @class */ (function () {
    function PivotChartAxisCrosshairTooltip() {
    }
    __decorate([
        Property(false)
    ], PivotChartAxisCrosshairTooltip.prototype, "enable", void 0);
    __decorate([
        Property(null)
    ], PivotChartAxisCrosshairTooltip.prototype, "fill", void 0);
    __decorate([
        Complex(crosshairLabelFont, Font)
    ], PivotChartAxisCrosshairTooltip.prototype, "textStyle", void 0);
    return PivotChartAxisCrosshairTooltip;
}());
export { PivotChartAxisCrosshairTooltip };
/**
 * Allows to configure the major tick lines such as width, height and color in the chart.
 */
var PivotChartAxisMajorTickLines = /** @class */ (function () {
    function PivotChartAxisMajorTickLines() {
    }
    __decorate([
        Property(1)
    ], PivotChartAxisMajorTickLines.prototype, "width", void 0);
    __decorate([
        Property(5)
    ], PivotChartAxisMajorTickLines.prototype, "height", void 0);
    __decorate([
        Property(null)
    ], PivotChartAxisMajorTickLines.prototype, "color", void 0);
    return PivotChartAxisMajorTickLines;
}());
export { PivotChartAxisMajorTickLines };
/**
 * Allows to configure the major grid lines such as line width, color and dashArray in the `axis`.
 */
var PivotChartAxisMajorGridLines = /** @class */ (function () {
    function PivotChartAxisMajorGridLines() {
    }
    __decorate([
        Property(1)
    ], PivotChartAxisMajorGridLines.prototype, "width", void 0);
    __decorate([
        Property('')
    ], PivotChartAxisMajorGridLines.prototype, "dashArray", void 0);
    __decorate([
        Property(null)
    ], PivotChartAxisMajorGridLines.prototype, "color", void 0);
    return PivotChartAxisMajorGridLines;
}());
export { PivotChartAxisMajorGridLines };
/**
 * Allows to configure the minor tick lines such as width, height and color in the chart.
 */
var PivotChartAxisMinorTickLines = /** @class */ (function () {
    function PivotChartAxisMinorTickLines() {
    }
    __decorate([
        Property(0.7)
    ], PivotChartAxisMinorTickLines.prototype, "width", void 0);
    __decorate([
        Property(5)
    ], PivotChartAxisMinorTickLines.prototype, "height", void 0);
    __decorate([
        Property(null)
    ], PivotChartAxisMinorTickLines.prototype, "color", void 0);
    return PivotChartAxisMinorTickLines;
}());
export { PivotChartAxisMinorTickLines };
/**
 * Allows to configure the minor grid lines such as line width, dashArray and color in the `axis`.
 */
var PivotChartAxisMinorGridLines = /** @class */ (function () {
    function PivotChartAxisMinorGridLines() {
    }
    __decorate([
        Property(0.7)
    ], PivotChartAxisMinorGridLines.prototype, "width", void 0);
    __decorate([
        Property('')
    ], PivotChartAxisMinorGridLines.prototype, "dashArray", void 0);
    __decorate([
        Property(null)
    ], PivotChartAxisMinorGridLines.prototype, "color", void 0);
    return PivotChartAxisMinorGridLines;
}());
export { PivotChartAxisMinorGridLines };
/**
 * Allows to configure the axis line such as line width, dashArray and color in a chart.
 */
var PivotChartAxisAxisLine = /** @class */ (function () {
    function PivotChartAxisAxisLine() {
    }
    __decorate([
        Property(1)
    ], PivotChartAxisAxisLine.prototype, "width", void 0);
    __decorate([
        Property('')
    ], PivotChartAxisAxisLine.prototype, "dashArray", void 0);
    __decorate([
        Property(null)
    ], PivotChartAxisAxisLine.prototype, "color", void 0);
    return PivotChartAxisAxisLine;
}());
export { PivotChartAxisAxisLine };
/**
 * Allows to configure the strip line properties such as line position, size, color, size type, border, text and opacity in the chart.
 */
var PivotChartAxisStripLineSettings = /** @class */ (function () {
    function PivotChartAxisStripLineSettings() {
    }
    __decorate([
        Property(true)
    ], PivotChartAxisStripLineSettings.prototype, "visible", void 0);
    __decorate([
        Property(false)
    ], PivotChartAxisStripLineSettings.prototype, "startFromAxis", void 0);
    __decorate([
        Property(null)
    ], PivotChartAxisStripLineSettings.prototype, "start", void 0);
    __decorate([
        Property(null)
    ], PivotChartAxisStripLineSettings.prototype, "end", void 0);
    __decorate([
        Property(null)
    ], PivotChartAxisStripLineSettings.prototype, "size", void 0);
    __decorate([
        Property('#808080')
    ], PivotChartAxisStripLineSettings.prototype, "color", void 0);
    __decorate([
        Property(null)
    ], PivotChartAxisStripLineSettings.prototype, "dashArray", void 0);
    __decorate([
        Property('Auto')
    ], PivotChartAxisStripLineSettings.prototype, "sizeType", void 0);
    __decorate([
        Property(false)
    ], PivotChartAxisStripLineSettings.prototype, "isRepeat", void 0);
    __decorate([
        Property(null)
    ], PivotChartAxisStripLineSettings.prototype, "repeatEvery", void 0);
    __decorate([
        Property(null)
    ], PivotChartAxisStripLineSettings.prototype, "repeatUntil", void 0);
    __decorate([
        Property(false)
    ], PivotChartAxisStripLineSettings.prototype, "isSegmented", void 0);
    __decorate([
        Property(null)
    ], PivotChartAxisStripLineSettings.prototype, "segmentStart", void 0);
    __decorate([
        Property(null)
    ], PivotChartAxisStripLineSettings.prototype, "segmentEnd", void 0);
    __decorate([
        Property(null)
    ], PivotChartAxisStripLineSettings.prototype, "segmentAxisName", void 0);
    __decorate([
        Complex({ color: 'transparent', width: 1 }, Border)
    ], PivotChartAxisStripLineSettings.prototype, "border", void 0);
    __decorate([
        Property('')
    ], PivotChartAxisStripLineSettings.prototype, "text", void 0);
    __decorate([
        Property(null)
    ], PivotChartAxisStripLineSettings.prototype, "rotation", void 0);
    __decorate([
        Property('Middle')
    ], PivotChartAxisStripLineSettings.prototype, "horizontalAlignment", void 0);
    __decorate([
        Property('Middle')
    ], PivotChartAxisStripLineSettings.prototype, "verticalAlignment", void 0);
    __decorate([
        Complex(stripLineLabelFont, Font)
    ], PivotChartAxisStripLineSettings.prototype, "textStyle", void 0);
    __decorate([
        Property('Behind')
    ], PivotChartAxisStripLineSettings.prototype, "zIndex", void 0);
    __decorate([
        Property(1)
    ], PivotChartAxisStripLineSettings.prototype, "opacity", void 0);
    return PivotChartAxisStripLineSettings;
}());
export { PivotChartAxisStripLineSettings };
/**
 * Allows to customize the label border with a variety of means such as label color, width and label type in the chart.
 */
var PivotChartAxisLabelBorder = /** @class */ (function () {
    function PivotChartAxisLabelBorder() {
    }
    __decorate([
        Property('')
    ], PivotChartAxisLabelBorder.prototype, "color", void 0);
    __decorate([
        Property(1)
    ], PivotChartAxisLabelBorder.prototype, "width", void 0);
    __decorate([
        Property('Rectangle')
    ], PivotChartAxisLabelBorder.prototype, "type", void 0);
    return PivotChartAxisLabelBorder;
}());
export { PivotChartAxisLabelBorder };
/**
 * Allow options to customize the chart area with a variety of settings such as background color, border, opacity and background image in the pivot chart.
 * For example, to change the of the pivot chart's background, set the property `opacity` to **0.5**.
 */
var PivotChartSettingsChartArea = /** @class */ (function () {
    function PivotChartSettingsChartArea() {
    }
    __decorate([
        Complex({}, Border)
    ], PivotChartSettingsChartArea.prototype, "border", void 0);
    __decorate([
        Property('transparent')
    ], PivotChartSettingsChartArea.prototype, "background", void 0);
    __decorate([
        Property(1)
    ], PivotChartSettingsChartArea.prototype, "opacity", void 0);
    return PivotChartSettingsChartArea;
}());
export { PivotChartSettingsChartArea };
/**
 * Allow options to customize the crosshair line with different settings such as color and width of the line,
 * line types that are shown horizontally and vertically to indicate the value of the axis at the mouse hover or touch position in the pivot chart.
 */
var PivotChartSettingsCrosshairSettings = /** @class */ (function () {
    function PivotChartSettingsCrosshairSettings() {
    }
    __decorate([
        Property(false)
    ], PivotChartSettingsCrosshairSettings.prototype, "enable", void 0);
    __decorate([
        Property('')
    ], PivotChartSettingsCrosshairSettings.prototype, "dashArray", void 0);
    __decorate([
        Complex({ color: null, width: 1 }, Border)
    ], PivotChartSettingsCrosshairSettings.prototype, "line", void 0);
    __decorate([
        Property('Both')
    ], PivotChartSettingsCrosshairSettings.prototype, "lineType", void 0);
    return PivotChartSettingsCrosshairSettings;
}());
export { PivotChartSettingsCrosshairSettings };
/**
 * Allow options for customizing legends with different properties such as legend visibility,
 * height, width, position, legend padding, alignment, textStyle, border, margin, background, opacity, description, tabIndex in the pivot chart.
 */
var PivotChartSettingsLegendSettings = /** @class */ (function () {
    function PivotChartSettingsLegendSettings() {
    }
    __decorate([
        Property(true)
    ], PivotChartSettingsLegendSettings.prototype, "visible", void 0);
    __decorate([
        Property(null)
    ], PivotChartSettingsLegendSettings.prototype, "height", void 0);
    __decorate([
        Property(null)
    ], PivotChartSettingsLegendSettings.prototype, "width", void 0);
    __decorate([
        Complex({ x: 0, y: 0 }, ChartLocation)
    ], PivotChartSettingsLegendSettings.prototype, "location", void 0);
    __decorate([
        Property('Auto')
    ], PivotChartSettingsLegendSettings.prototype, "position", void 0);
    __decorate([
        Property(8)
    ], PivotChartSettingsLegendSettings.prototype, "padding", void 0);
    __decorate([
        Property('Center')
    ], PivotChartSettingsLegendSettings.prototype, "alignment", void 0);
    __decorate([
        Complex(legendLabelFont, Font)
    ], PivotChartSettingsLegendSettings.prototype, "textStyle", void 0);
    __decorate([
        Property(10)
    ], PivotChartSettingsLegendSettings.prototype, "shapeHeight", void 0);
    __decorate([
        Property(10)
    ], PivotChartSettingsLegendSettings.prototype, "shapeWidth", void 0);
    __decorate([
        Complex({}, Border)
    ], PivotChartSettingsLegendSettings.prototype, "border", void 0);
    __decorate([
        Complex({ left: 0, right: 0, top: 0, bottom: 0 }, Margin)
    ], PivotChartSettingsLegendSettings.prototype, "margin", void 0);
    __decorate([
        Property(5)
    ], PivotChartSettingsLegendSettings.prototype, "shapePadding", void 0);
    __decorate([
        Property('transparent')
    ], PivotChartSettingsLegendSettings.prototype, "background", void 0);
    __decorate([
        Property(1)
    ], PivotChartSettingsLegendSettings.prototype, "opacity", void 0);
    __decorate([
        Property(true)
    ], PivotChartSettingsLegendSettings.prototype, "toggleVisibility", void 0);
    __decorate([
        Property(null)
    ], PivotChartSettingsLegendSettings.prototype, "description", void 0);
    __decorate([
        Property(3)
    ], PivotChartSettingsLegendSettings.prototype, "tabIndex", void 0);
    return PivotChartSettingsLegendSettings;
}());
export { PivotChartSettingsLegendSettings };
/**
 * Allows you to highlight a specific point of the series while rendering the pivot chart.
 * For example, to highlight first point in the first series, set the properties series to 0 and points to 1. To use this option, it requires the property `selectionMode` to be **Point** or **Series**.
 */
var PivotChartSettingsIndexes = /** @class */ (function () {
    function PivotChartSettingsIndexes() {
    }
    __decorate([
        Property(0)
    ], PivotChartSettingsIndexes.prototype, "series", void 0);
    __decorate([
        Property(0)
    ], PivotChartSettingsIndexes.prototype, "point", void 0);
    return PivotChartSettingsIndexes;
}());
export { PivotChartSettingsIndexes };
/**
 * Allow options to customize the left, right, top and bottom margins of the pivot chart.
 */
var PivotChartSettingsMargin = /** @class */ (function () {
    function PivotChartSettingsMargin() {
    }
    __decorate([
        Property(10)
    ], PivotChartSettingsMargin.prototype, "left", void 0);
    __decorate([
        Property(10)
    ], PivotChartSettingsMargin.prototype, "right", void 0);
    __decorate([
        Property(10)
    ], PivotChartSettingsMargin.prototype, "top", void 0);
    __decorate([
        Property(10)
    ], PivotChartSettingsMargin.prototype, "bottom", void 0);
    return PivotChartSettingsMargin;
}());
export { PivotChartSettingsMargin };
/**
 * Allow options to customize the chart series with different settings such as fill color, animation of the series,
 * series width, border, visibility of the series, opacity, chart series types, marker, tooltip, trendlines, etc., in the pivot chart.
 * For example, to display the line type pivot chart, set the property `type` to **Line**.
 */
var PivotSeries = /** @class */ (function (_super) {
    __extends(PivotSeries, _super);
    function PivotSeries() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property(null)
    ], PivotSeries.prototype, "fill", void 0);
    __decorate([
        Property(null)
    ], PivotSeries.prototype, "endAngle", void 0);
    __decorate([
        Property(false)
    ], PivotSeries.prototype, "explode", void 0);
    __decorate([
        Property(false)
    ], PivotSeries.prototype, "explodeAll", void 0);
    __decorate([
        Property(null)
    ], PivotSeries.prototype, "explodeIndex", void 0);
    __decorate([
        Property(null)
    ], PivotSeries.prototype, "innerRadius", void 0);
    __decorate([
        Property('30%')
    ], PivotSeries.prototype, "explodeOffset", void 0);
    __decorate([
        Property(0)
    ], PivotSeries.prototype, "gapRatio", void 0);
    __decorate([
        Property('Value')
    ], PivotSeries.prototype, "groupMode", void 0);
    __decorate([
        Property(null)
    ], PivotSeries.prototype, "groupTo", void 0);
    __decorate([
        Property('20%')
    ], PivotSeries.prototype, "neckHeight", void 0);
    __decorate([
        Property('20%')
    ], PivotSeries.prototype, "neckWidth", void 0);
    __decorate([
        Property('Linear')
    ], PivotSeries.prototype, "pyramidMode", void 0);
    __decorate([
        Property([])
    ], PivotSeries.prototype, "palettes", void 0);
    __decorate([
        Property(0)
    ], PivotSeries.prototype, "startAngle", void 0);
    __decorate([
        Complex(null, Animation)
    ], PivotSeries.prototype, "animation", void 0);
    __decorate([
        Complex(null, PivotChartDataLabel)
    ], PivotSeries.prototype, "dataLabel", void 0);
    __decorate([
        Property('0')
    ], PivotSeries.prototype, "dashArray", void 0);
    __decorate([
        Property(1)
    ], PivotSeries.prototype, "width", void 0);
    __decorate([
        Property('X')
    ], PivotSeries.prototype, "segmentAxis", void 0);
    __decorate([
        Property('Line')
    ], PivotSeries.prototype, "drawType", void 0);
    __decorate([
        Property(true)
    ], PivotSeries.prototype, "isClosed", void 0);
    __decorate([
        Collection([], ChartSegment)
    ], PivotSeries.prototype, "segments", void 0);
    __decorate([
        Property('')
    ], PivotSeries.prototype, "stackingGroup", void 0);
    __decorate([
        Complex({ color: 'transparent', width: 0 }, Border)
    ], PivotSeries.prototype, "border", void 0);
    __decorate([
        Property(true)
    ], PivotSeries.prototype, "visible", void 0);
    __decorate([
        Property(1)
    ], PivotSeries.prototype, "opacity", void 0);
    __decorate([
        Property('Line')
    ], PivotSeries.prototype, "type", void 0);
    __decorate([
        Complex(null, MarkerSettings)
    ], PivotSeries.prototype, "marker", void 0);
    __decorate([
        Complex(null, ErrorBarSettings)
    ], PivotSeries.prototype, "errorBar", void 0);
    __decorate([
        Property(true)
    ], PivotSeries.prototype, "enableTooltip", void 0);
    __decorate([
        Collection([], Trendline)
    ], PivotSeries.prototype, "trendlines", void 0);
    __decorate([
        Property('')
    ], PivotSeries.prototype, "tooltipMappingName", void 0);
    __decorate([
        Property('SeriesType')
    ], PivotSeries.prototype, "legendShape", void 0);
    __decorate([
        Property(1)
    ], PivotSeries.prototype, "minRadius", void 0);
    __decorate([
        Property(null)
    ], PivotSeries.prototype, "selectionStyle", void 0);
    __decorate([
        Property('Natural')
    ], PivotSeries.prototype, "splineType", void 0);
    __decorate([
        Property(3)
    ], PivotSeries.prototype, "maxRadius", void 0);
    __decorate([
        Property(0.5)
    ], PivotSeries.prototype, "cardinalSplineTension", void 0);
    __decorate([
        Property(null)
    ], PivotSeries.prototype, "columnWidth", void 0);
    __decorate([
        Complex(null, EmptyPointSettings)
    ], PivotSeries.prototype, "emptyPointSettings", void 0);
    __decorate([
        Complex(null, CornerRadius)
    ], PivotSeries.prototype, "cornerRadius", void 0);
    __decorate([
        Property(0)
    ], PivotSeries.prototype, "columnSpacing", void 0);
    return PivotSeries;
}(ChildProperty));
export { PivotSeries };
/**
 * Allow options to customize the axis with different properties such as labelIntersectAction, labelStyle, title,
 * description, crosshairTooltip, labelFormat, titleStyle, plotOffset, edgeLabelPlacement, labelPlacement, tickPosition, opposedPosition, minor and
 * major grid lines, minor and major tick lines, border, etc. in the pivot chart.
 */
var PivotAxis = /** @class */ (function (_super) {
    __extends(PivotAxis, _super);
    function PivotAxis() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property('Rotate45')
    ], PivotAxis.prototype, "labelIntersectAction", void 0);
    __decorate([
        Complex(axisLabelFont, Font)
    ], PivotAxis.prototype, "labelStyle", void 0);
    __decorate([
        Property('')
    ], PivotAxis.prototype, "title", void 0);
    __decorate([
        Property(null)
    ], PivotAxis.prototype, "zoomFactor", void 0);
    __decorate([
        Complex({}, CrosshairTooltip)
    ], PivotAxis.prototype, "crosshairTooltip", void 0);
    __decorate([
        Property('')
    ], PivotAxis.prototype, "labelFormat", void 0);
    __decorate([
        Complex(axisTitleFont, Font)
    ], PivotAxis.prototype, "titleStyle", void 0);
    __decorate([
        Property(false)
    ], PivotAxis.prototype, "isIndexed", void 0);
    __decorate([
        Property(0)
    ], PivotAxis.prototype, "plotOffset", void 0);
    __decorate([
        Property('Shift')
    ], PivotAxis.prototype, "edgeLabelPlacement", void 0);
    __decorate([
        Property('BetweenTicks')
    ], PivotAxis.prototype, "labelPlacement", void 0);
    __decorate([
        Property('Outside')
    ], PivotAxis.prototype, "tickPosition", void 0);
    __decorate([
        Property(false)
    ], PivotAxis.prototype, "opposedPosition", void 0);
    __decorate([
        Property(true)
    ], PivotAxis.prototype, "visible", void 0);
    __decorate([
        Property('Outside')
    ], PivotAxis.prototype, "labelPosition", void 0);
    __decorate([
        Property(0)
    ], PivotAxis.prototype, "labelRotation", void 0);
    __decorate([
        Property(0)
    ], PivotAxis.prototype, "minorTicksPerInterval", void 0);
    __decorate([
        Property(null)
    ], PivotAxis.prototype, "maximum", void 0);
    __decorate([
        Property(null)
    ], PivotAxis.prototype, "minimum", void 0);
    __decorate([
        Property(34)
    ], PivotAxis.prototype, "maximumLabelWidth", void 0);
    __decorate([
        Property(null)
    ], PivotAxis.prototype, "interval", void 0);
    __decorate([
        Complex({}, MajorTickLines)
    ], PivotAxis.prototype, "majorTickLines", void 0);
    __decorate([
        Property(false)
    ], PivotAxis.prototype, "enableTrim", void 0);
    __decorate([
        Complex({}, MajorGridLines)
    ], PivotAxis.prototype, "majorGridLines", void 0);
    __decorate([
        Complex({}, MinorTickLines)
    ], PivotAxis.prototype, "minorTickLines", void 0);
    __decorate([
        Complex({}, AxisLine)
    ], PivotAxis.prototype, "lineStyle", void 0);
    __decorate([
        Complex({}, MinorGridLines)
    ], PivotAxis.prototype, "minorGridLines", void 0);
    __decorate([
        Property(false)
    ], PivotAxis.prototype, "isInversed", void 0);
    __decorate([
        Property(null)
    ], PivotAxis.prototype, "description", void 0);
    __decorate([
        Property(0)
    ], PivotAxis.prototype, "startAngle", void 0);
    __decorate([
        Property(100)
    ], PivotAxis.prototype, "coefficient", void 0);
    __decorate([
        Collection([], StripLineSettings)
    ], PivotAxis.prototype, "stripLines", void 0);
    __decorate([
        Property(2)
    ], PivotAxis.prototype, "tabIndex", void 0);
    __decorate([
        Complex({ color: null, width: 0, type: 'Rectangle' }, LabelBorder)
    ], PivotAxis.prototype, "border", void 0);
    return PivotAxis;
}(ChildProperty));
export { PivotAxis };
/**
 * Allow options to customize the tooltip of the pivot chart with different properties such as visibility of the tooltip, enableMarker, fill color, opacity, header for tooltip,
 * format, textStyle, template, border, enableAnimation.
 */
var PivotTooltipSettings = /** @class */ (function (_super) {
    __extends(PivotTooltipSettings, _super);
    function PivotTooltipSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property(false)
    ], PivotTooltipSettings.prototype, "enableMarker", void 0);
    __decorate([
        Property(true)
    ], PivotTooltipSettings.prototype, "enable", void 0);
    __decorate([
        Property(null)
    ], PivotTooltipSettings.prototype, "fill", void 0);
    __decorate([
        Property(false)
    ], PivotTooltipSettings.prototype, "shared", void 0);
    __decorate([
        Property(0.75)
    ], PivotTooltipSettings.prototype, "opacity", void 0);
    __decorate([
        Property(null)
    ], PivotTooltipSettings.prototype, "header", void 0);
    __decorate([
        Property(null)
    ], PivotTooltipSettings.prototype, "format", void 0);
    __decorate([
        Complex(tooltipLabelFont, Font)
    ], PivotTooltipSettings.prototype, "textStyle", void 0);
    __decorate([
        Property(null)
    ], PivotTooltipSettings.prototype, "template", void 0);
    __decorate([
        Complex({ color: '#cccccc', width: 0.5 }, Border)
    ], PivotTooltipSettings.prototype, "border", void 0);
    __decorate([
        Property(true)
    ], PivotTooltipSettings.prototype, "enableAnimation", void 0);
    return PivotTooltipSettings;
}(ChildProperty));
export { PivotTooltipSettings };
/**
 * Allow options to customize the center of the pivot pie series chart.
 */
var PivotPieChartCenter = /** @class */ (function (_super) {
    __extends(PivotPieChartCenter, _super);
    function PivotPieChartCenter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property('50%')
    ], PivotPieChartCenter.prototype, "x", void 0);
    __decorate([
        Property('50%')
    ], PivotPieChartCenter.prototype, "y", void 0);
    return PivotPieChartCenter;
}(ChildProperty));
export { PivotPieChartCenter };
/**
 * Allow options to customize the pivot chart zooming with different properties such as enablePinchZooming, enableSelectionZooming,
 * enableDeferredZooming, enableMouseWheelZooming, zoom modes, toolbarItems, enableScrollbar and enablePan.
 */
var PivotZoomSettings = /** @class */ (function (_super) {
    __extends(PivotZoomSettings, _super);
    function PivotZoomSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property(false)
    ], PivotZoomSettings.prototype, "enablePinchZooming", void 0);
    __decorate([
        Property(true)
    ], PivotZoomSettings.prototype, "enableSelectionZooming", void 0);
    __decorate([
        Property(false)
    ], PivotZoomSettings.prototype, "enableDeferredZooming", void 0);
    __decorate([
        Property(false)
    ], PivotZoomSettings.prototype, "enableMouseWheelZooming", void 0);
    __decorate([
        Property('XY')
    ], PivotZoomSettings.prototype, "mode", void 0);
    __decorate([
        Property(['Zoom', 'ZoomIn', 'ZoomOut', 'Pan', 'Reset'])
    ], PivotZoomSettings.prototype, "toolbarItems", void 0);
    __decorate([
        Property(true)
    ], PivotZoomSettings.prototype, "enableScrollbar", void 0);
    __decorate([
        Property(false)
    ], PivotZoomSettings.prototype, "enablePan", void 0);
    return PivotZoomSettings;
}(ChildProperty));
export { PivotZoomSettings };
/**
 * Allows a set of options to customize a pivot chart with a variety of settings, such as chart series, chart area, axis labels, legends, border, crosshairs, theme, title, tooltip, zooming, etc.
 * The following options are available to customize the pivot chart.
 * * `background`: Allows you to change the background color of the chart series in the pivot chart.
 * For example, to display the chart series with background color as red, set the property `background` to either **"red"** or **"#FF0000"** or **"rgba(255,0,0,1.0)"**.
 * * `border`: Allow options to customize the border of the chart series such as color and border size in the pivot chart.
 * For example, to display the chart series border color as red, set the properties `color` to either **"red"** or **"#FF0000"** or **"rgba(255,0,0,1.0)"** and `width` to **0.5**.
 * * `chartArea`: Allow options to customize the chart area with a variety of settings such as background color, border, opacity and background image in the pivot chart.
 * For example, to change the of the pivot chart's background, set the property `opacity` to **0.5**.
 * * `chartSeries`: Allow options to customize the chart series with different settings such as fill color, animation of the series,
 * series width, border, visibility of the series, opacity, chart series types, marker, tooltip, trendlines, etc., in the pivot chart.
 * For example, to display the line type pivot chart, set the property `type` to **Line**.
 * * `crosshair`: Allow options to customize the crosshair line with different settings such as color and width of the line,
 * line types that are shown horizontally and vertically to indicate the value of the axis at the mouse hover or touch position in the pivot chart.
 * * `description`: Allows you to add a description of the pivot chart.
 * * `enableAnimation`: Allows you to enable/disable the tooltip animation while performing the mouse move from one point to another in the pivot chart.
 * * `enableCanvas`: Allows you to render the pivot chart in canvas mode.
 * * `enableExport`: Allows the pivot chart to be exported to either **PDF** or **PNG** or **JPEG** or **SVG** filter formats.
 * * `enableMultipleAxis`: Allows you to draw the pivot chart with multiple value fields as separate chart area.
 * * `enableSideBySidePlacement`: Allows you to draw points of the column type pivot chart series as side by side.
 * * `isMultiSelect`: Allows you to perform multiple selection in the pivot chart. To enable this option, it requires the property `selectionMode` to be **Point** or **Series** or **Cluster**.
 * * `isTransposed`: Allows you to render the pivot chart in a transposed manner or not.
 * * `legendSettings`: Allow options for customizing legends with different properties such as legend visibility,
 * height, width, position, legend padding, alignment, textStyle, border, margin, background, opacity, description, tabIndex in the pivot chart.
 * * `margin`: Allow options to customize the left, right, top and bottom margins of the pivot chart.
 * * `palettes`: Allows you to draw the chart series points with custom color in the pivot chart.
 * * `primaryXAxis`: Allow options to customize the horizontal(row) axis with different properties such as labelIntersectAction, labelStyle, title,
 * description, crosshairTooltip, labelFormat, titleStyle, plotOffset, edgeLabelPlacement, labelPlacement, tickPosition, opposedPosition, minor and
 * major grid lines, minor and major tick lines, border, etc. in the pivot chart.
 * * `primaryYAxis`: Allow options to customize the vertical(value) axis with different properties such as labelIntersectAction, labelStyle,
 * title, description, crosshairTooltip, labelFormat, titleStyle, plotOffset, edgeLabelPlacement, labelPlacement, tickPosition, opposedPosition, minor and
 * major grid lines, minor and major tick lines, border, etc. in the pivot chart.
 * * `selectedDataIndexes`: Allows you to highlight a specific point of the series while rendering the pivot chart.
 * For example, to highlight first point in the first series, set the properties series to 0 and points to 1. To use this option, it requires the property `selectionMode` to be **Point** or **Series**.
 * * `selectionMode`: Allow options for customizing the selection mode to be done either by a specific series or point or cluster or by dragging it to the pivot chart.
 * For example, to highlight a specific point in a specific series of the pivot chart, set the property `selectionMode` to **Point**.
 * * `showMultiLevelLabels`: Allows you to display the multi-level label feature in the pivot chart. This multi-level labels used to perform drill operation in the pivot chart.
 * * `subTitle`: Allows you to add the subtitle to the pivot chart.
 * * `subTitleStyle`: Allow options to customize the subtitle in the pivot chart with different properties such as fontStyle, font size, fontWeight, font color, testAlignment, fontFamily, opacity, textOverflow.
 * * `tabIndex`: Allows you to highlight specific legends by clicking the mouse or by interacting with the keyboard in the pivot chart.
 * * `theme`: Allows you to draw a pivot chart with either material, fabric, bootstrap, highcontrast light, material dark, fabric dark, highcontrast, bootstrap dark, bootstrap4 theme.
 * * `title`: Allows you to add title to the pivot chart.
 * * `titleStyle`: Allow options to customize the title in the pivot chart with different properties such as fontStyle, font size, fontWeight, font color, testAlignment, fontFamily, opacity, textOverflow.
 * * `tooltip`: Allow options to customize the tooltip of the pivot chart with different properties such as visibility of the tooltip, enableMarker, fill color, opacity, header for tooltip,
 * format, textStyle, template, border, enableAnimation.
 * * `useGroupingSeparator`: Allows the group separator to be shown to the values in the pivot chart.
 * * `value`: Allows you to draw a pivot chart with a specific value field during initial loading.
 * * `zoomSettings`: Allow options to customize the pivot chart zooming with different properties such as enablePinchZooming, enableSelectionZooming,
 * enableDeferredZooming, enableMouseWheelZooming, zoom modes, toolbarItems, enableScrollbar and enablePan.
 */
var ChartSettings = /** @class */ (function (_super) {
    __extends(ChartSettings, _super);
    function ChartSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Complex({}, PivotSeries)
    ], ChartSettings.prototype, "chartSeries", void 0);
    __decorate([
        Complex({}, PivotAxis)
    ], ChartSettings.prototype, "primaryXAxis", void 0);
    __decorate([
        Complex({}, PivotAxis)
    ], ChartSettings.prototype, "primaryYAxis", void 0);
    __decorate([
        Property('')
    ], ChartSettings.prototype, "value", void 0);
    __decorate([
        Property('')
    ], ChartSettings.prototype, "columnHeader", void 0);
    __decorate([
        Property('-')
    ], ChartSettings.prototype, "columnDelimiter", void 0);
    __decorate([
        Property(false)
    ], ChartSettings.prototype, "enableMultipleAxis", void 0);
    __decorate([
        Property('Stacked')
    ], ChartSettings.prototype, "multipleAxisMode", void 0);
    __decorate([
        Property(false)
    ], ChartSettings.prototype, "enableScrollOnMultiAxis", void 0);
    __decorate([
        Property(false)
    ], ChartSettings.prototype, "showMemberSeries", void 0);
    __decorate([
        Property(false)
    ], ChartSettings.prototype, "showPointColorByMembers", void 0);
    __decorate([
        Complex({ border: { color: null, width: 0.5 }, background: 'transparent' }, titleSettings)
    ], ChartSettings.prototype, "titleStyle", void 0);
    __decorate([
        Property('')
    ], ChartSettings.prototype, "title", void 0);
    __decorate([
        Complex({ border: { color: null, width: 0.5 }, background: 'transparent' }, titleSettings)
    ], ChartSettings.prototype, "subTitleStyle", void 0);
    __decorate([
        Property('')
    ], ChartSettings.prototype, "subTitle", void 0);
    __decorate([
        Complex({ color: '#DDDDDD', width: 0 }, Border)
    ], ChartSettings.prototype, "border", void 0);
    __decorate([
        Complex({}, Margin)
    ], ChartSettings.prototype, "margin", void 0);
    __decorate([
        Complex({ border: { color: null, width: 0.5 }, background: 'transparent' }, ChartArea)
    ], ChartSettings.prototype, "chartArea", void 0);
    __decorate([
        Property(null)
    ], ChartSettings.prototype, "background", void 0);
    __decorate([
        Property('Material')
    ], ChartSettings.prototype, "theme", void 0);
    __decorate([
        Property([])
    ], ChartSettings.prototype, "palettes", void 0);
    __decorate([
        Complex({}, CrosshairSettings)
    ], ChartSettings.prototype, "crosshair", void 0);
    __decorate([
        Complex({}, PivotTooltipSettings)
    ], ChartSettings.prototype, "tooltip", void 0);
    __decorate([
        Complex(null, PivotPieChartCenter)
    ], ChartSettings.prototype, "pieCenter", void 0);
    __decorate([
        Complex({}, PivotZoomSettings)
    ], ChartSettings.prototype, "zoomSettings", void 0);
    __decorate([
        Property()
    ], ChartSettings.prototype, "legendSettings", void 0);
    __decorate([
        Property('None')
    ], ChartSettings.prototype, "selectionMode", void 0);
    __decorate([
        Property('None')
    ], ChartSettings.prototype, "accumulationSelectionMode", void 0);
    __decorate([
        Property(true)
    ], ChartSettings.prototype, "enableSmartLabels", void 0);
    __decorate([
        Property(true)
    ], ChartSettings.prototype, "enableBorderOnMouseMove", void 0);
    __decorate([
        Property('None')
    ], ChartSettings.prototype, "highlightMode", void 0);
    __decorate([
        Property('None')
    ], ChartSettings.prototype, "highlightPattern", void 0);
    __decorate([
        Property(true)
    ], ChartSettings.prototype, "enableExport", void 0);
    __decorate([
        Property(false)
    ], ChartSettings.prototype, "isMultiSelect", void 0);
    __decorate([
        Collection([], Indexes)
    ], ChartSettings.prototype, "selectedDataIndexes", void 0);
    __decorate([
        Property(true)
    ], ChartSettings.prototype, "enableAnimation", void 0);
    __decorate([
        Property(false)
    ], ChartSettings.prototype, "enableCanvas", void 0);
    __decorate([
        Property(true)
    ], ChartSettings.prototype, "useGroupingSeparator", void 0);
    __decorate([
        Property(false)
    ], ChartSettings.prototype, "isTransposed", void 0);
    __decorate([
        Property(1)
    ], ChartSettings.prototype, "tabIndex", void 0);
    __decorate([
        Property(null)
    ], ChartSettings.prototype, "description", void 0);
    __decorate([
        Event()
    ], ChartSettings.prototype, "resized", void 0);
    __decorate([
        Property(true)
    ], ChartSettings.prototype, "enableSideBySidePlacement", void 0);
    __decorate([
        Event()
    ], ChartSettings.prototype, "loaded", void 0);
    __decorate([
        Event()
    ], ChartSettings.prototype, "beforePrint", void 0);
    __decorate([
        Event()
    ], ChartSettings.prototype, "animationComplete", void 0);
    __decorate([
        Event()
    ], ChartSettings.prototype, "load", void 0);
    __decorate([
        Event()
    ], ChartSettings.prototype, "textRender", void 0);
    __decorate([
        Event()
    ], ChartSettings.prototype, "legendRender", void 0);
    __decorate([
        Event()
    ], ChartSettings.prototype, "seriesRender", void 0);
    __decorate([
        Event()
    ], ChartSettings.prototype, "multiLevelLabelRender", void 0);
    __decorate([
        Event()
    ], ChartSettings.prototype, "pointRender", void 0);
    __decorate([
        Event()
    ], ChartSettings.prototype, "tooltipRender", void 0);
    __decorate([
        Event()
    ], ChartSettings.prototype, "legendClick", void 0);
    __decorate([
        Event()
    ], ChartSettings.prototype, "axisLabelRender", void 0);
    __decorate([
        Event()
    ], ChartSettings.prototype, "multiLevelLabelClick", void 0);
    __decorate([
        Event()
    ], ChartSettings.prototype, "chartMouseClick", void 0);
    __decorate([
        Event()
    ], ChartSettings.prototype, "chartMouseMove", void 0);
    __decorate([
        Event()
    ], ChartSettings.prototype, "pointMove", void 0);
    __decorate([
        Event()
    ], ChartSettings.prototype, "pointClick", void 0);
    __decorate([
        Event()
    ], ChartSettings.prototype, "chartMouseDown", void 0);
    __decorate([
        Event()
    ], ChartSettings.prototype, "chartMouseLeave", void 0);
    __decorate([
        Event()
    ], ChartSettings.prototype, "dragComplete", void 0);
    __decorate([
        Event()
    ], ChartSettings.prototype, "chartMouseUp", void 0);
    __decorate([
        Event()
    ], ChartSettings.prototype, "scrollStart", void 0);
    __decorate([
        Event()
    ], ChartSettings.prototype, "zoomComplete", void 0);
    __decorate([
        Event()
    ], ChartSettings.prototype, "scrollChanged", void 0);
    __decorate([
        Event()
    ], ChartSettings.prototype, "scrollEnd", void 0);
    __decorate([
        Property(true)
    ], ChartSettings.prototype, "showMultiLevelLabels", void 0);
    return ChartSettings;
}(ChildProperty));
export { ChartSettings };
