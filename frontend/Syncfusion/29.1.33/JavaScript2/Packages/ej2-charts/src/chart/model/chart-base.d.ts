import { ChildProperty } from '@syncfusion/ej2-base';
import { ZIndex, Anchor, BorderType, SizeType } from '../utils/enum';
import { BorderModel, FontModel, AccessibilityModel, MarginModel, StackLabelsFontModel } from '../../common/model/base-model';
import { LabelBorderModel, MultiLevelCategoriesModel, ScrollbarSettingsRangeModel } from '../../chart/model/chart-base-model';
import { Units, Alignment, Regions, Position, TextOverflow, ScrollbarPosition } from '../../common/utils/enum';
/**
 * Configures the annotation settings for a chart to highlight or provide additional information about specific points or regions.
 */
export declare class ChartAnnotationSettings extends ChildProperty<ChartAnnotationSettings> {
    /**
     * If `coordinateUnit` is set to `Pixel`, x specifies the pixel value.
     * If `coordinateUnit` is set to `Point`, x specifies the axis value.
     *
     * @default '0'
     * @aspType object
     */
    x: string | Date | number;
    /**
     * If `coordinateUnit` is set to `Pixel`, y specifies the pixel value.
     * If `coordinateUnit` is set to `Point`, y specifies the axis value.
     *
     * @default '0'
     */
    y: string | number;
    /**
     * The content of the annotation, which also accepts the ID of the custom element.
     *
     * @default null
     */
    content: string;
    /**
     * Specifies the alignment of the annotation.
     * The options are:
     * * Near - Aligns the annotation element to the left side.
     * * Far - Aligns the annotation element to the right side.
     * * Center - Aligns the annotation element to the midpoint.
     *
     * @default 'Center'
     * @deprecated
     */
    horizontalAlignment: Alignment;
    /**
     * Specifies the coordinate units of the annotation.
     * The options are:
     * * Pixel - Renders the annotation based on x and y pixel values.
     * * Point - Renders the annotation based on x and y axis values.
     *
     * @default 'Pixel'
     */
    coordinateUnits: Units;
    /**
     * Specifies the regions of the annotation.
     * The options are:
     * * Chart - Renders the annotation based on chart coordinates.
     * * Series - Renders the annotation based on series coordinates.
     *
     * @default 'Chart'
     */
    region: Regions;
    /**
     * Specifies the position of the annotation.
     * The options are
     * * Top - Aligns the annotation element to the top side.
     * * Bottom - Aligns the annotation element to the bottom side.
     * * Middle - Aligns the annotation element to the midpoint.
     *
     * @default 'Middle'
     * @deprecated
     */
    verticalAlignment: Position;
    /**
     * The name of the horizontal axis associated with the annotation.
     * Requires the `axes` of the chart.
     *
     * @default null
     */
    xAxisName: string;
    /**
     * The name of the vertical axis associated with the annotation.
     * Requires the `axes` of the chart.
     *
     * @default null
     */
    yAxisName: string;
    /**
     * A description for the annotation that provides additional information about its content for screen readers.
     *
     * @default null
     * @deprecated
     */
    description: string;
    /**
     * Options to improve accessibility for chart annotation elements.
     */
    accessibility: AccessibilityModel;
}
/**
 * The `LabelBorder` class provides options to customize the border settings for chart labels.
 */
export declare class LabelBorder extends ChildProperty<LabelBorder> {
    /**
     * The color of the border, which accepts values in hex and rgba as valid CSS color strings.
     *
     * @default ''
     */
    color: string;
    /**
     * The `width` property specifies the thickness of the border in pixels.
     *
     * @default 1
     */
    width: number;
    /**
     * Specifies the border type for the labels.
     * The available types include:
     * * Rectangle
     * * Without Top Border
     * * Without Top and Bottom Border
     * * Without Border
     * * Brace
     * * Curly Brace
     *
     * @default 'Rectangle'
     */
    type: BorderType;
}
/**
 * The `MultiLevelCategories` class allows defining and customizing the categories used in multi-level labels.
 * This is particularly useful when there is a need to display hierarchical or grouped data labels on the chart axis.
 */
export declare class MultiLevelCategories extends ChildProperty<MultiLevelCategories> {
    /**
     * Specifies the starting value for the multi-level labels.
     *
     * @default null
     * @aspDefaultValueIgnore
     */
    start: number | Date | string;
    /**
     * Specifies the end value for the multi-level labels.
     *
     * @default null
     * @aspDefaultValueIgnore
     */
    end: number | Date | string;
    /**
     * Specifies the text to be displayed for the multi-level labels.
     *
     * @default ''
     */
    text: string;
    /**
     * Specifies the maximum width of the text for multi-level labels.
     *
     * @default null
     * @aspDefaultValueIgnore
     */
    maximumTextWidth: number;
    /**
     * Allows adding custom data for multi-level labels.
     *
     * @default null
     */
    customAttributes: object;
    /**
     * Specifies the type of border for labels.
     * Available border types:
     * * Rectangle
     * * Without Top Border
     * * Without Top and Bottom Border
     * * Without Border
     * * Brace
     * * Curly Brace
     *
     * @default 'Rectangle'
     * @aspDefaultValueIgnore
     * @blazorDefaultValueIgnore
     */
    type: BorderType;
}
/**
 * The `StripLineSettings` class provides configuration options for strip lines in a chart.
 */
export declare class StripLineSettings extends ChildProperty<StripLineSettings> {
    /**
     * If set to true, the strip line on the axis will render.
     *
     * @default true
     */
    visible: boolean;
    /**
     * If set to true, the strip line is rendered from the axis origin.
     *
     *  @default false
     */
    startFromAxis: boolean;
    /**
     * Specifies the starting value of the strip line.
     *
     * @default null
     * @aspDefaultValueIgnore
     */
    start: Object | number | Date;
    /**
     * Specifies the ending value of the strip line.
     *
     * @default null
     * @aspDefaultValueIgnore
     */
    end: Object | number | Date;
    /**
     * Specifies the size of the strip line when starting from the origin.
     *
     * @default null
     * @aspDefaultValueIgnore
     */
    size: number;
    /**
     * The `color` property specifies the color of the strip line.
     *
     * @default '#808080'
     */
    color: string;
    /**
     * Specifies the pattern of dashes and gaps used to render the strip line.
     *
     * @default null
     * @aspDefaultValueIgnore
     */
    dashArray: string;
    /**
     * The `sizeType` property specifies how the size of the strip line is determined.
     *
     * @default Auto
     */
    sizeType: SizeType;
    /**
     * Specifies whether the strip line is repeated at regular intervals along the axis.
     *
     * @default false
     * @aspDefaultValueIgnore
     */
    isRepeat: boolean;
    /**
     * Specifies the interval at which the strip line is repeated.
     *
     * @default null
     * @aspDefaultValueIgnore
     */
    repeatEvery: Object | number | Date;
    /**
     * Specifies the maximum value of the interval at which the strip line is repeated.
     *
     * @default null
     * @aspDefaultValueIgnore
     */
    repeatUntil: Object | number | Date;
    /**
     * Specifies whether the strip line is segmented.
     *
     * @default false
     * @aspDefaultValueIgnore
     */
    isSegmented: boolean;
    /**
     * Specifies where a new segment of the strip line on the axis begins.
     *
     * @default null
     * @aspDefaultValueIgnore
     */
    segmentStart: Object | number | Date;
    /**
     * Specifies where a new segment of the strip line on the axis ends.
     *
     * @default null
     * @aspDefaultValueIgnore
     */
    segmentEnd: Object | number | Date;
    /**
     * The name of the axis where the strip line segment is applied.
     *
     * @default null
     * @aspDefaultValueIgnore
     */
    segmentAxisName: string;
    /**
     * The `border` property allows customization of the border for the strip line.
     * It includes options to set the color and width of the border.
     */
    border: BorderModel;
    /**
     * Defines the text to be displayed on the strip line.
     *
     * @default ''
     */
    text: string;
    /**
     * Defines the degree of rotation applied to the text on the strip line.
     *
     * @default null
     * @aspDefaultValueIgnore
     */
    rotation: number;
    /**
     * Defines the position of the strip line text horizontally.
     * Available options are:
     * * Start: Places the strip line text at the start.
     * * Middle: Places the strip line text in the middle.
     * * End: Places the strip line text at the end.
     *
     * @default 'Middle'
     */
    horizontalAlignment: Anchor;
    /**
     * Defines the position of the strip line text vertically.
     * Available options are:
     * * Start: Places the strip line text at the start.
     * * Middle: Places the strip line text in the middle.
     * * End: Places the strip line text at the end.
     *
     * @default 'Middle'
     */
    verticalAlignment: Anchor;
    /**
     * The `textStyle` property enables customization of the text appearance on the strip line.
     */
    textStyle: FontModel;
    /**
     * Specifies the order of the strip line.
     * The options are:
     * * Behind: Places the strip line behind the series elements.
     * * Over: Places the strip line over the series elements.
     *
     * @default 'Behind'
     */
    zIndex: ZIndex;
    /**
     * Specifies the opacity for the strip line.
     *
     * @default 1
     */
    opacity: number;
    /**
     * Specifies the URL of the background image for the strip line. The image will be displayed as the background.
     *
     * @default ''
     */
    imageUrl: string;
}
/**
 * The `MultiLevelLabels` class is used to customize the appearance and behavior of multi-level labels in charts.
 */
export declare class MultiLevelLabels extends ChildProperty<MultiLevelLabels[]> {
    /**
     * Defines the position of the multi-level labels.
     * The available options are:
     * * Near: Places the multi-level labels close to the chart elements.
     * * Center: Positions the multi-level labels in the center of the chart elements.
     * * Far: Places the multi-level labels further from the chart elements.
     *
     * @default 'Center'
     */
    alignment: Alignment;
    /**
     * Defines the text overflow behavior for multi-level labels.
     * The available options are:
     * * Trim: Trims the text that overflows for multi-level labels.
     * * Wrap: Wraps the text that overflows for multi-level labels.
     * * None: No text overflow handling for multi-level labels.
     *
     * @default 'Wrap'
     */
    overflow: TextOverflow;
    /**
     * Options to customize the multi-level labels.
     */
    textStyle: FontModel;
    /**
     * The `border` property allows customization of the border for multi-level labels.
     * It includes options to set the color, width, and type of the border.
     */
    border: LabelBorderModel;
    /**
     * Configures multi-level categories for multi-level labels.
     */
    categories: MultiLevelCategoriesModel[];
}
/**
 * The `ScrollbarSettingsRange` class allows defining the start and end values for the scrollbar range in a chart.
 *
 * @public
 */
export declare class ScrollbarSettingsRange extends ChildProperty<ScrollbarSettingsRange> {
    /**
     * Specifies the minimum range of a scrollbar.
     *
     * @default null
     */
    minimum: Date | string | number;
    /**
     * Specifies the maximum range of a scrollbar.
     *
     * @default null
     */
    maximum: Date | string | number;
}
/**
 * Specifies properties for customizing the scrollbar settings in lazy loading.
 */
export declare class ScrollbarSettings extends ChildProperty<ScrollbarSettings> {
    /**
     * If set to true, activates the scrollbar for lazy loading in charts.
     * If set to false, the scrollbar is disabled.
     *
     * @default false
     */
    enable: boolean;
    /**
     * Defines the length of the points for numeric and logarithmic values.
     *
     * @default null
     */
    pointsLength: number;
    /**
     * Specifies the range for date-time values only.
     */
    range: ScrollbarSettingsRangeModel;
    /**
     * Specifies the color used for the background of the track area in the scrollbar.
     *
     * @default null
     */
    trackColor: string;
    /**
     * Defines the border radius for the scrollbar.
     *
     * @default 0
     */
    scrollbarRadius: number;
    /**
     * Defines the color for the scrollbar.
     *
     * @default null
     */
    scrollbarColor: string;
    /**
     * Defines the border radius for back rect.
     *
     * @default 0
     */
    trackRadius: number;
    /**
     * The `gripColor` property specifies the color of the thumb grip of the scrollbar.
     *
     * @default null
     */
    gripColor: string;
    /**
     * Defines the height of the scrollbar.
     *
     * @default 16
     */
    height: number;
    /**
     * Specifies whether zooming by scrollbar is enabled or disabled.
     *
     * @default true
     */
    enableZoom: boolean;
    /**
     * Specifies the position of the scrollbar in the chart.
     *
     * The available options are:
     * * `Top`: Places the scrollbar at the top of the chart. Applicable only for horizontal scrollbars.
     * * `Bottom`: Places the scrollbar at the bottom of the chart. Applicable only for horizontal scrollbars.
     * * `Left`: Places the scrollbar on the left side of the chart. Applicable only for vertical scrollbars.
     * * `Right`: Places the scrollbar on the right side of the chart. Applicable only for vertical scrollbars.
     * * `PlaceNextToAxisLine`: Places the scrollbar next to the axis line.
     *
     * @default 'PlaceNextToAxisLine'
     */
    position: ScrollbarPosition;
}
/**
 * Configures the ToolbarPosition for the chart.
 */
export declare class ToolbarPosition extends ChildProperty<ToolbarPosition> {
    /**
     * Specifies the horizontal alignment of the toolbar.
     *
     * The available options are:
     * * `Far` – Aligns the toolbar to the right side of the chart.
     * * `Center` – Centers the toolbar horizontally in the chart.
     * * `Near` – Aligns the toolbar to the left side of the chart.
     *
     * @default 'Far'
     */
    horizontalAlignment: Alignment;
    /**
     * Specifies the vertical alignment of the toolbar.
     *
     * The available options are:
     * * `Top` – Positions the toolbar at the top of the chart.
     * * `Middle` – Centers the toolbar vertically in the chart.
     * * `Bottom` – Positions the toolbar at the bottom of the chart.
     *
     * @default 'Top'
     */
    verticalAlignment: Position;
    /**
     * Specifies the horizontal offset of the toolbar in the chart.
     *
     * This value determines how far to move the toolbar horizontally from its default position.
     *
     * @default 0
     */
    x: number;
    /**
     * Specifies the vertical offset of the toolbar in the chart.
     *
     * This value determines how far to move the toolbar vertically from its default position.
     *
     * @default 0
     */
    y: number;
    /**
     * When set to true, allows dragging the zoom toolbar in the chart.
     *
     * @default false.
     */
    draggable: boolean;
}
/**
 * Represents the settings for configuring stack labels in a chart.
 */
export declare class StackLabelSettings extends ChildProperty<StackLabelSettings> {
    /**
     * Specifies whether the stack labels are visible or not in the chart.
     * Setting this property to `true` will display the stack labels, showing the total value for each stack in stacked charts.
     *
     * @default false
     */
    visible: boolean;
    /**
     * The background color of the stack labels. Accepts valid CSS color strings, including hex and RGBA values.
     *
     * @default 'transparent'
     */
    fill: string;
    /**
     * Used to format the stack label text. This property accepts a string that can contain placeholders.
     * Supports placeholders such as `{value}`, where `{value}` represents the total stack value.
     *
     * @default null
     */
    format: string;
    /**
     * Specifies the rotation angle for the stack labels. This property allows to rotate the stack labels to a specific angle (in degrees).
     *
     * @default 0
     */
    angle: number;
    /**
     * Specifies the rounded corner radius along the X-axis for the stack label background.
     * It defines how much curvature the corners of the label will have along the X-axis (horizontal direction).
     * Note: The `border` property must be set for rounded corners to be visible.
     *
     * @default 5
     */
    rx: number;
    /**
     * Specifies the rounded corner radius along the Y-axis for the stack label background.
     * It defines the curvature of the stack label's background along the Y-axis (vertical direction).
     * Note: The `border` property must be set for rounded corners to be visible.
     *
     * @default 5
     */
    ry: number;
    /**
     * Configures the margin for the stack label. This property allows you to define the spacing around the stack label by specifying the left, right, top, and bottom margins.
     */
    margin: MarginModel;
    /**
     * Configures the border appearance for the stack labels.
     * For rounded corners to appear, both the `rx` and `ry` properties must be set, and the `border` property should also be configured with a width and color.
     */
    border: BorderModel;
    /**
     * Customizes the appearance of the stack label text. Options include font size, color, style, weight, and family.
     * Customizing these properties allows to ensure that the stack labels are legible and match the overall chart design.
     *
     */
    font: StackLabelsFontModel;
}
