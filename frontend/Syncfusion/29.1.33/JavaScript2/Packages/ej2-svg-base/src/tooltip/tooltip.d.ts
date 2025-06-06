import { INotifyPropertyChanged } from '@syncfusion/ej2-base';
import { Component } from '@syncfusion/ej2-base';
import { ChildProperty, EmitType } from '@syncfusion/ej2-base';
import { TextStyleModel, TooltipBorderModel, TooltipModel, ToolLocationModel, AreaBoundsModel } from './tooltip-model';
import { ITooltipRenderingEventArgs, ITooltipAnimationCompleteArgs, IBlazorTemplate } from './interface';
import { ITooltipLoadedEventArgs } from './interface';
import { Size, Rect } from './helper';
import { TooltipLocation } from './helper';
import { TooltipShape, TooltipTheme, TooltipPlacement } from './enum';
/**
 * Configures the fonts in charts.
 *
 * @private
 */
export declare class TextStyle extends ChildProperty<TextStyle> {
    /**
     * Font size for the text.
     *
     * @default null
     */
    size: string;
    /**
     * Color for the text.
     *
     * @default ''
     */
    color: string;
    /**
     * FontFamily for the text.
     */
    fontFamily: string;
    /**
     * FontWeight for the text.
     *
     * @default 'Normal'
     */
    fontWeight: string;
    /**
     * FontStyle for the text.
     *
     * @default 'Normal'
     */
    fontStyle: string;
    /**
     * Opacity for the text.
     *
     * @default 1
     */
    opacity: number;
    /**
     * Font size for the header text.
     *
     * @default null
     */
    headerTextSize: string;
    /**
     * Font size for the bold text.
     *
     * @default null
     */
    boldTextSize: string;
}
/**
 * Configures the borders in the chart.
 *
 * @private
 */
export declare class TooltipBorder extends ChildProperty<TooltipBorder> {
    /**
     * The color of the border that accepts value in hex and rgba as a valid CSS color string.
     *
     * @default ''
     */
    color: string;
    /**
     * The width of the border in pixels.
     *
     * @default 1
     */
    width: number;
    /**
     * The dash-array of the border.
     *
     * @default ''
     */
    dashArray: string;
}
/**
 * Configures the borders in the chart.
 *
 * @private
 */
export declare class AreaBounds extends ChildProperty<AreaBounds> {
    /**
     * The color of the border that accepts value in hex and rgba as a valid CSS color string.
     *
     * @default ''
     */
    x: number;
    /**
     * The width of the border in pixels.
     *
     * @default 1
     */
    y: number;
    /**
     * The color of the border that accepts value in hex and rgba as a valid CSS color string.
     *
     * @default ''
     */
    width: number;
    /**
     * The width of the border in pixels.
     *
     * @default 1
     */
    height: number;
}
/**
 * Configures the borders in the chart.
 *
 * @private
 */
export declare class ToolLocation extends ChildProperty<ToolLocation> {
    /**
     * The color of the border that accepts value in hex and rgba as a valid CSS color string.
     *
     * @default ''
     */
    x: number;
    /**
     * The width of the border in pixels.
     *
     * @default 1
     */
    y: number;
}
/**
 * Represents the Tooltip control.
 * ```html
 * <div id="tooltip"/>
 * <script>
 *   var tooltipObj = new Tooltip({ isResponsive : true });
 *   tooltipObj.appendTo("#tooltip");
 * </script>
 * ```
 *
 * @private
 */
export declare class Tooltip extends Component<HTMLElement> implements INotifyPropertyChanged {
    /**
     * Enables / Disables the visibility of the tooltip.
     *
     * @default false.
     * @private
     */
    enable: boolean;
    /**
     * If set to true, a single ToolTip will be displayed for every index.
     *
     * @default false.
     * @private
     */
    shared: boolean;
    /**
     * To enable crosshair tooltip animation.
     *
     * @default false.
     * @private
     */
    crosshair: boolean;
    /**
     * To enable shadow for the tooltip.
     *
     * @default false.
     * @private
     */
    enableShadow: boolean;
    /**
     * The fill color of the tooltip that accepts value in hex and rgba as a valid CSS color string.
     *
     * @private
     */
    fill: string;
    /**
     * Header for tooltip.
     *
     * @private
     */
    header: string;
    /**
     * The fill color of the tooltip that accepts value in hex and rgba as a valid CSS color string.
     *
     * @private
     */
    opacity: number;
    /**
     * Options to customize the ToolTip text.
     *
     * @private
     */
    textStyle: TextStyleModel;
    /**
     * Custom template to format the ToolTip content. Use ${x} and ${y} as the placeholder text to display the corresponding data point.
     *
     * @default null.
     * @aspType string
     * @private
     */
    template: string | Function;
    /**
     * If set to true, ToolTip will animate while moving from one point to another.
     *
     * @default true.
     * @private
     */
    enableAnimation: boolean;
    /**
     * Duration for Tooltip animation.
     *
     * @default 300
     * @private
     */
    duration: number;
    /**
     * To rotate the tooltip.
     *
     * @default false.
     * @private
     */
    inverted: boolean;
    /**
     * Negative value of the tooltip.
     *
     * @default true.
     * @private
     */
    isNegative: boolean;
    /**
     * Options to customize tooltip borders.
     *
     * @private
     */
    border: TooltipBorderModel;
    /**
     * Content for the tooltip.
     *
     * @private
     */
    content: string[];
    /**
     * Content for the tooltip.
     *
     * @private
     */
    markerSize: number;
    /**
     * Clip location.
     *
     * @private
     */
    clipBounds: ToolLocationModel;
    /**
     * Palette for marker.
     *
     * @private
     */
    palette: string[];
    /**
     * Shapes for marker.
     *
     * @private
     */
    shapes: TooltipShape[];
    /**
     * Location for Tooltip.
     *
     * @private
     */
    location: ToolLocationModel;
    /**
     * Location for Tooltip.
     *
     * @private
     */
    offset: number;
    /**
     * Rounded corner for x.
     *
     * @private
     */
    rx: number;
    /**
     * Rounded corner for y.
     *
     * @private
     */
    ry: number;
    /**
     * Margin for left and right.
     *
     * @private
     */
    marginX: number;
    /**
     *  Margin for top and bottom.
     *
     * @private
     */
    marginY: number;
    /**
     * Padding for arrow.
     *
     * @private
     */
    arrowPadding: number;
    /**
     * Data for template.
     *
     * @private
     */
    data: Object;
    /**
     * Specifies the theme for the chart.
     *
     * @default 'Material'
     * @private
     */
    theme: TooltipTheme;
    /**
     * Bounds for the rect.
     *
     * @private
     */
    areaBounds: AreaBoundsModel;
    /**
     * Bounds for chart.
     *
     * @private
     */
    availableSize: Size;
    /**
     * Blazor templates
     */
    blazorTemplate: IBlazorTemplate;
    /**
     * To check chart is canvas.
     *
     * @default false.
     * @private
     */
    isCanvas: boolean;
    /**
     * To check tooltip wrap for chart.
     *
     * @default false.
     * @private
     */
    isTextWrap: boolean;
    /**
     * Specifies the location of the tooltip in a fixed position.
     *
     * @default false.
     * @private
     */
    isFixed: boolean;
    /**
     * To place tooltip in a particular position.
     *
     * @default null.
     * @private
     */
    tooltipPlacement: TooltipPlacement;
    /**
     * Control instance
     *
     * @default null.
     * @private
     */
    controlInstance: object;
    /**
     * Specifies the control name.
     *
     * @default ''
     * @private
     */
    controlName: string;
    /**
     * Enables or disables the display of tooltips for the nearest data point to the cursor.
     *
     * @default false.
     */
    showNearestTooltip: boolean;
    /**
     * Triggers before each axis range is rendered.
     *
     * @event tooltipRender
     * @private
     */
    tooltipRender: EmitType<ITooltipRenderingEventArgs>;
    /**
     * Triggers after chart load.
     *
     * @event loaded
     * @private
     */
    loaded: EmitType<ITooltipLoadedEventArgs>;
    /**
     * Triggers after animation complete.
     *
     * @event animationComplete
     * @private
     */
    animationComplete: EmitType<ITooltipAnimationCompleteArgs>;
    /**
     * Enables / Disables the rtl rendering of tooltip elements.
     *
     * @default false.
     * @private
     */
    enableRTL: boolean;
    /**
     * change tooltip location.
     *
     * @default false.
     * @private
     */
    allowHighlight: boolean;
    /**
     * Specifies whether to display the header line in the tooltip.
     *
     * @default true
     */
    showHeaderLine: boolean;
    private elementSize;
    private toolTipInterval;
    private padding;
    private areaMargin;
    private highlightPadding;
    private textElements;
    private templateFn;
    private formattedText;
    private markerPoint;
    /** @private */
    private valueX;
    /** @private */
    private valueY;
    fadeOuted: boolean;
    /** @private */
    private renderer;
    /** @private */
    private themeStyle;
    private isFirst;
    private isWrap;
    private leftSpace;
    private rightSpace;
    private wrappedText;
    private revert;
    private outOfBounds;
    /**
     * Constructor for creating the widget
     *
     * @hidden
     */
    constructor(options?: TooltipModel, element?: string | HTMLElement);
    /**
     * Initialize the event handler.
     *
     * @private
     */
    protected preRender(): void;
    private initPrivateVariable;
    private removeSVG;
    /**
     * To Initialize the control rendering.
     */
    protected render(): void;
    private createTooltipElement;
    private drawMarker;
    private renderTooltipElement;
    private changeText;
    private findFormattedText;
    private renderText;
    private renderContentRTL;
    private getTooltipTextContent;
    private isValidHTMLElement;
    private isRTLText;
    private createTemplate;
    private sharedTooltipLocation;
    /** @private */
    getCurrentPosition(bounds: Rect, symbolLocation: TooltipLocation, arrowLocation: TooltipLocation, tipLocation: TooltipLocation): Rect;
    /** @private */
    tooltipLocation(bounds: Rect, symbolLocation: TooltipLocation, arrowLocation: TooltipLocation, tipLocation: TooltipLocation): Rect;
    private animateTooltipDiv;
    private updateDiv;
    private updateTemplateFn;
    /** @private */
    fadeOut(): void;
    private progressAnimation;
    private endAnimation;
    /**
     * Get the properties to be maintained in the persisted state.
     *
     * @private
     */
    getPersistData(): string;
    /**
     * Get component name
     *
     *  @private
     */
    getModuleName(): string;
    /**
     * To destroy the accumulationcharts
     *
     * @private
     */
    destroy(): void;
    /**
     * Called internally if any of the property value changed.
     *
     * @returns {void}
     * @private
     */
    onPropertyChanged(newProp: TooltipModel, oldProp: TooltipModel): void;
}
