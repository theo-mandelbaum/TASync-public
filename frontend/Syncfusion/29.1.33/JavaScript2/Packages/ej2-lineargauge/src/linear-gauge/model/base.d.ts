import { ChildProperty } from '@syncfusion/ej2-base';
import { BorderModel, FontModel, RangeTooltipModel } from '../model/base-model';
import { Placement, ContainerType, TooltipPosition } from '../utils/enum';
/**
 * Sets and gets the options for customizing the fonts.
 */
export declare class Font extends ChildProperty<Font> {
    /**
     * Sets and gets the size of the font in text.
     */
    size: string;
    /**
     * Sets and gets the font color for text.
     *
     * @default ''
     */
    color: string;
    /**
     * Sets and gets the font-family for text.
     */
    fontFamily: string;
    /**
     * Sets and gets the font weight of the text.
     *
     * @default 'Regular'
     */
    fontWeight: string;
    /**
     * Sets and gets the font style for the text.
     *
     * @default 'Normal'
     */
    fontStyle: string;
    /**
     * Sets and gets the opacity of the text.
     *
     * @default 1
     */
    opacity: number;
}
/**
 * Defines the font properties such as font-size, font family and others for the text pointer.
 */
export declare class TextStyle extends ChildProperty<TextStyle> {
    /**
     * Defines the font-size of the text pointer.
     */
    size: string;
    /**
     * Defines the font-family of the text pointer. The default value of this property varies based on the `theme` set in the Linear Gauge.
     */
    fontFamily: string;
    /**
     * Defines the font-weight of the text pointer.
     *
     * @default 'normal'
     */
    fontWeight: string;
    /**
     * Defines the font-style of the text pointer.
     *
     * @default 'normal'
     */
    fontStyle: string;
}
/**
 * Sets and gets the margin for the linear gauge.
 */
export declare class Margin extends ChildProperty<Margin> {
    /**
     * Sets and gets the left margin for linear gauge.
     *
     * @default 10
     */
    left: number;
    /**
     * Sets and gets the right margin for linear gauge.
     *
     * @default 10
     */
    right: number;
    /**
     * Sets and gets the top margin for linear gauge.
     *
     * @default 10
     */
    top: number;
    /**
     * Sets and gets the bottom margin for linear gauge.
     *
     * @default 10
     */
    bottom: number;
}
/**
 * Sets and gets the options to customize the style properties of the border for the linear gauge.
 */
export declare class Border extends ChildProperty<Border> {
    /**
     * Sets and gets the color of the border. This property accepts value in hex code, rgba string as a valid CSS color string.
     */
    color: string;
    /**
     * Sets and gets the width of the border.
     *
     * @default 0
     */
    width: number;
    /**
     * Sets and gets the dash-array of the border.
     */
    dashArray: string;
}
/**
 * Sets and gets the options for customizing the annotation in linear gauge.
 */
export declare class Annotation extends ChildProperty<Annotation> {
    /**
     * Sets and gets the content for the annotation.
     *
     * @default ''
     * @aspType string
     */
    content: string | Function;
    /**
     * Sets and gets the x position for the annotation in linear gauge.
     *
     * @default 0
     */
    x: number;
    /**
     * Sets and gets the y position for the annotation in linear gauge.
     *
     * @default 0
     */
    y: number;
    /**
     * Sets and gets the vertical alignment of annotation.
     *
     * @default None
     */
    verticalAlignment: Placement;
    /**
     * Sets and gets the horizontal alignment of annotation.
     *
     * @default None
     */
    horizontalAlignment: Placement;
    /**
     * Sets and gets the z-index of the annotation.
     *
     * @default '-1'
     */
    zIndex: string;
    /**
     * Sets and gets the options to customize the font of the annotation in linear gauge.
     */
    font: FontModel;
    /**
     * Sets and gets the axis index which places the annotation in the specified axis in the linear gauge.
     *
     * @aspDefaultValueIgnore
     * @default null
     */
    axisIndex: number;
    /**
     * Sets and gets the value of axis which places the annotation near the specified axis value.
     *
     * @aspDefaultValueIgnore
     * @default null
     */
    axisValue: number;
}
/**
 * Sets and gets the options for customizing the container of linear gauge.
 */
export declare class Container extends ChildProperty<Container> {
    /**
     * Sets and gets the type of container in linear gauge.
     *
     * @default Normal
     */
    type: ContainerType;
    /**
     * Sets and gets the height of the container in linear gauge.
     *
     * @default 0
     */
    height: number;
    /**
     * Sets and gets the width of the container in linear gauge.
     *
     * @default 0
     */
    width: number;
    /**
     * Sets and gets the corner radius for the rounded rectangle container in linear gauge.
     *
     * @default 10
     */
    roundedCornerRadius: number;
    /**
     * Sets and gets the background color of the container in linear gauge.
     *
     * @default 'transparent'
     */
    backgroundColor: string;
    /**
     * Sets and gets the options to customize the border of container.
     */
    border: BorderModel;
    /**
     * Sets and gets the offset value from where the container must be placed in the linear gauge.
     *
     * @default 0
     */
    offset: number;
}
/**
 * Sets and gets the options to customize the tooltip for range in axis.
 */
export declare class RangeTooltip extends ChildProperty<RangeTooltip> {
    /**
     * Sets and gets the fill color of the range tooltip, which accepts the value in hex code, rgba string as a valid CSS color string.
     *
     * @default null
     */
    fill: string;
    /**
     * Sets and gets the options to customize the tooltip text of range in axis.
     */
    textStyle: FontModel;
    /**
     * Sets and gets the format for the tooltip content of the range. Use "{start}" and "{end}" as a placeholder
     * text to display the corresponding start and end value of the range in the tooltip.
     *
     * @default null
     */
    format: string;
    /**
     * Sets and gets the custom template to format the tooltip content.
     *
     * @default null
     * @aspType string
     */
    template: string | Function;
    /**
     * Enables or disables the animation for the range tooltip when moved from one place to another.
     *
     * @default true
     */
    enableAnimation: boolean;
    /**
     * Sets and gets the options to customize the border for range tooltip.
     */
    border: BorderModel;
    /**
     * Sets and gets the position type to place the tooltip in the axis .
     *
     * @default End
     */
    position: TooltipPosition;
    /**
     * Enables and disables to show the tooltip of the range at mouse position. When set as false which is the default value, the tooltip will be displayed over the axis line.
     *
     * @default false
     */
    showAtMousePosition: boolean;
}
/**
 * Sets and gets the options for customizing the tooltip in linear gauge.
 */
export declare class TooltipSettings extends ChildProperty<TooltipSettings> {
    /**
     * Enables or disables the visibility of tooltip.
     *
     * @default false
     */
    enable: boolean;
    /**
     * Sets and gets the color of the tooltip. This property accepts value in hex code, rgba string as a valid CSS color string.
     */
    fill: string;
    /**
     * Sets and gets the options to customize the text in tooltip.
     */
    textStyle: FontModel;
    /**
     * Sets and gets the format of the tooltip content in linear gauge. Use "{value}" as a placeholder
     * text to display the corresponding pointer value of in the tooltip.
     *
     * @default null
     */
    format: string;
    /**
     * Enables and disables to show the tooltip of the pointer at mouse position. When set as false which is the default value, the tooltip will be displayed over the axis line.
     *
     * @default false
     */
    showAtMousePosition: boolean;
    /**
     * Sets and gets the options to customize the range tooltip.
     */
    rangeSettings: RangeTooltipModel;
    /**
     * Sets and gets the position type to place the tooltip in the axis.
     *
     * @default End
     */
    position: TooltipPosition;
    /**
     * Sets and gets the custom template to format the tooltip content.
     *
     * @default null
     * @aspType string
     */
    template: string | Function;
    /**
     * Enables or disables the animation for the tooltip while moving from one place to another.
     *
     * @default true
     */
    enableAnimation: boolean;
    /**
     * Sets and gets the options to customize the border for tooltip.
     */
    border: BorderModel;
    /**
     * Sets and gets the option to display the tooltip for range and pointer.
     *
     * @default Pointer
     */
    type: string[];
}
