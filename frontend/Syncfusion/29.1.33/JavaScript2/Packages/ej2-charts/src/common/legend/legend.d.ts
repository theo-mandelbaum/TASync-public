import { ChildProperty } from '@syncfusion/ej2-base';
import { Rect, TextOption, Size } from '@syncfusion/ej2-svg-base';
import { Chart, ILegendRegions } from '../../chart';
import { LegendSettingsModel } from './legend-model';
import { MarginModel, FontModel, BorderModel, LocationModel, ContainerPaddingModel, AccessibilityModel } from '../model/base-model';
import { ChartLocation } from '../utils/helper';
import { RectOption } from '../utils/helper';
import { ChartSeriesType, ChartShape, LegendMode } from '../../chart/utils/enum';
import { Legend } from '../../chart/legend/legend';
import { AccumulationType } from '../../accumulation-chart/model/enum';
import { AccumulationChart } from '../../accumulation-chart/accumulation';
import { AccumulationLegend } from '../../accumulation-chart/renderer/legend';
import { BulletChart } from '../../bullet-chart/bullet-chart';
import { BulletChartLegend } from '../../bullet-chart/legend/legend';
import { Alignment, LegendTitlePosition, TextWrap, LabelOverflow, LegendShape, LegendPosition, LegendLayout } from '../utils/enum';
import { StockChart } from '../../stock-chart';
import { StockLegend } from '../../stock-chart/legend/legend';
import { Chart3D } from '../../chart3d';
import { Legend3D } from '../../chart3d/legend/legend';
import { CircularChartLegend3D } from '../../circularchart3d/legend/legend';
import { CircularChart3D } from '../../circularchart3d';
/**
 * Configures the appearance and behavior of legends in charts.
 */
export declare class LegendSettings extends ChildProperty<LegendSettings> {
    /**
     * If set to true, the legend will be displayed for the chart.
     *
     * @default true
     */
    visible: boolean;
    /**
     * Specifies the height of the legend in pixels.
     *
     * @default null
     */
    height: string;
    /**
     * Specifies the width of the legend in pixels.
     *
     * @default null
     */
    width: string;
    /**
     * Specifies the location of the legend relative to the chart.
     * If x is 20, the legend moves 20 pixels to the right of the chart.
     > Note that the `position` must be set to `Custom` for this feature to work.
     * ```html
     * <div id='Chart'></div>
     * ```
     * ```typescript
     * let chart: Chart = new Chart({
     * ...
     *   legendSettings: {
     *           visible: true,
     *           position: 'Custom',
     *           location: { x: 100, y: 150 }
     *   }
     * ...
     * });
     * chart.appendTo('#Chart');
     * ```
     */
    location: LocationModel;
    /**
     * Sets the position of the legend in the chart.
     * Available options include:
     * * Auto - Places the legend according to the area type.
     * * Top - Displays the legend at the top of the chart.
     * * Left - Displays the legend on the left side of the chart.
     * * Bottom - Displays the legend at the bottom of the chart.
     * * Right - Displays the legend to the right of the chart.
     * * Custom - Displays the legend according to the given x and y position values.
     *
     * @default 'Auto'
     */
    position: LegendPosition;
    /**
     * Defines the mode for displaying legend items.
     * * Series - Legend items are generated based on the count of series.
     * * Point - Legend items are created according to each unique data point.
     * * Range - Legend items are generated based on the range color mapping property.
     * * Gradient - Displays a single linear bar that represents the range color mapping property.
     > Note that this property is applicable only for the chart component.
     */
    mode: LegendMode;
    /**
     * Option to customize the padding around the legend items.
     *
     * @default 8
     */
    padding: number;
    /**
     * Option to customize the padding between legend items.
     *
     * @default null
     */
    itemPadding: number;
    /**
     * Defines the alignment of the legend in the chart.
     * The options are:
     * * Near - Aligns the legend to the left of the chart.
     * * Center - Aligns the legend to the center of the chart.
     * * Far - Aligns the legend to the right of the chart.
     *
     * @default 'Center'
     */
    alignment: Alignment;
    /**
     * The `textStyle` property provides options to customize the appearance of the text in the legend, including the font family, size, style, weight, and color.
     */
    textStyle: FontModel;
    /**
     * Specify the height of the legend in pixels.
     *
     * @default 10
     */
    shapeHeight: number;
    /**
     * Specify the width of the legend in pixels.
     *
     * @default 10
     */
    shapeWidth: number;
    /**
     * Options for customizing the border of the legend.
     */
    border: BorderModel;
    /**
     * Options for customizing the left, right, top, and bottom margins of the chart.
     */
    margin: MarginModel;
    /**
     * Options to customize the left, right, top, and bottom padding for the chart legend container.
     */
    containerPadding: ContainerPaddingModel;
    /**
     * Padding between the legend shape and text.
     *
     * @default 8
     */
    shapePadding: number;
    /**
     * The background color of the legend, which accepts values in hex and rgba as valid CSS color strings.
     *
     * @default 'transparent'
     */
    background: string;
    /**
     * Customizes the opacity of the legend.
     *
     * @default 1
     */
    opacity: number;
    /**
     * If set to true, the series visibility will collapse based on the legend's visibility.
     *
     * @default true
     */
    toggleVisibility: boolean;
    /**
     * If set to true, the series will be highlighted when hovering over the legend.
     *
     * @default false
     */
    enableHighlight: boolean;
    /**
     * A description of the legend that provides additional information for screen readers.
     *
     * @default null
     * @deprecated
     */
    description: string;
    /**
     * The `tabIndex` property determines the order in which the legend receives focus when navigating through elements with the keyboard.
     *
     * @default 3
     * @deprecated
     */
    tabIndex: number;
    /**
     * Specifies the title of the legend.
     *
     * @default null
     */
    title: string;
    /**
     * The `titleStyle` property configures the font settings for the legend title, including font family, size, style, weight, and color.
     */
    titleStyle: FontModel;
    /**
     * The `titlePosition` property specifies the position of the legend title.
     * Available options are:
     * * Top - Aligns the title to the top of the legend.
     * * Left - Aligns the title to the left of the legend.
     * * Right - Aligns the title to the right of the legend.
     *
     * @default 'Top'
     */
    titlePosition: LegendTitlePosition;
    /**
     * Defines the text wrap behavior for the legend text when it overflows.
     * Available options are:
     * * `Normal` - Specifies that words should only break at allowed break points.
     * * `Wrap` - Specifies that a word should break if it is too long to fit on a line by itself.
     * * `AnyWhere` - Specifies to break a word at any point if there are no acceptable break points in the line.
     *
     * @default 'Normal'
     */
    textWrap: TextWrap;
    /**
     * Defines the behavior for handling the overflow of legend text.
     * * `Clip` - Specifies that the text is clipped and not accessible.
     * * `Ellipsis` - Specifies an ellipsis (“...”) for the clipped text.
     *
     * @default 'Ellipsis'
     */
    textOverflow: LabelOverflow;
    /**
     * Specifies the maximum width of the legend title.
     *
     * @default 100
     */
    maximumTitleWidth: number;
    /**
     * Specifies the maximum width of the legend text labels.
     *
     * @default null
     */
    maximumLabelWidth: number;
    /**
     * If set to true, the legend will be displayed using pages.
     *
     * @default true
     */
    enablePages: boolean;
    /**
     * If `isInversed` is set to true, it inverses the legend item content (image and text).
     *
     * @default false.
     */
    isInversed: boolean;
    /**
     * If `reverse` is set to true, it reverses the order of the legend items.
     *
     * @default false
     */
    reverse: boolean;
    /**
     * Specifies the layout of the legend items in the chart.
     * Available options are:
     * * `Vertical`: Legend items are arranged in a single column. If the legend items exceed the available space, paging is automatically applied to allow the user to navigate through the legend.
     * * `Horizontal`: Legend items are arranged in a single row. If the legend items exceed the available space, paging is automatically applied to allow the user to navigate through the legend.
     * * `Auto` (default): Legend items are placed based on the available space.
     *
     * @default 'Auto'
     */
    layout: LegendLayout;
    /**
     * Specifies the maximum number of columns to allow in the available space when the layout is set to 'Auto'.
     *
     * @default null
     */
    maximumColumns: number;
    /**
     * When set to true, all legend items are rendered with an equal width, which is the maximum width of all items.
     *
     * @default false
     */
    fixedWidth: boolean;
    /**
     * Options to improve accessibility for legend elements.
     */
    accessibility: AccessibilityModel;
}
/**
 * Legend base class for Chart and Accumulation chart.
 *
 * @private
 */
export declare class BaseLegend {
    protected chart: Chart | AccumulationChart | BulletChart | StockChart | Chart3D | CircularChart3D;
    protected legend: LegendSettingsModel;
    protected maxItemHeight: number;
    protected rowHeights: number[];
    protected pageHeights: number[];
    protected columnHeights: number[];
    protected isPaging: boolean;
    private clipPathHeight;
    totalPages: number;
    protected isVertical: boolean;
    protected fivePixel: number;
    private rowCount;
    protected pageButtonSize: number;
    protected pageXCollections: number[];
    protected maxColumns: number;
    maxWidth: number;
    protected legendID: string;
    private clipRect;
    private legendTranslateGroup;
    protected currentPage: number;
    protected backwardArrowOpacity: number;
    protected forwardArrowOpacity: number;
    private isChartControl;
    private isAccChartControl;
    private isBulletChartControl;
    private isStockChartControl;
    private accessbilityText;
    protected arrowWidth: number;
    protected arrowHeight: number;
    protected library: Legend | AccumulationLegend | BulletChartLegend | StockLegend | Legend3D | CircularChartLegend3D;
    /**  @private */
    position: LegendPosition;
    chartRowCount: number;
    /**
     * Gets the legend bounds in chart.
     *
     * @private
     */
    legendBounds: Rect;
    /** @private */
    legendCollections: LegendOptions[];
    private legendTitleCollections;
    protected legendTitleSize: Size;
    private isTop;
    protected isTitle: boolean;
    /** @private */
    clearTooltip: number;
    protected pagingClipRect: RectOption;
    protected currentPageNumber: number;
    protected legendRegions: ILegendRegions[];
    protected pagingRegions: Rect[];
    protected totalNoOfPages: number;
    /** @private */
    calTotalPage: boolean;
    private bulletChart;
    protected isRtlEnable: boolean;
    protected isReverse: boolean;
    protected itemPadding: number;
    /**
     * Constructor for the dateTime module.
     *
     * @private
     */
    constructor(chart?: Chart | AccumulationChart | BulletChart | StockChart | Chart3D | CircularChart3D);
    /**
     * Calculate the bounds for the legends.
     *
     * @returns {void}
     * @private
     */
    calculateLegendBounds(rect: Rect, availableSize: Size, maxLabelSize: Size, previousLegendBounds?: Rect, pointAnimation?: boolean): void;
    /**
     * To find legend position based on available size for chart and accumulation chart
     *
     * @param position
     * @param availableSize
     * @param position
     * @param availableSize
     * @returns {void}
     */
    private getPosition;
    /**
     * To set bounds for chart and accumulation chart
     *
     * @param computedWidth
     * @param computedHeight
     * @param legend
     * @param legendBounds
     * @param computedWidth
     * @param computedHeight
     * @param legend
     * @param legendBounds
     * @param computedWidth
     * @param computedHeight
     * @param legend
     * @param legendBounds
     * @param computedWidth
     * @param computedHeight
     * @param legend
     * @param legendBounds
     * @returns {void}
     */
    protected setBounds(computedWidth: number, computedHeight: number, legend: LegendSettingsModel, legendBounds: Rect): void;
    /**
     * To find legend location based on position, alignment for chart and accumulation chart
     *
     * @param position
     * @param alignment
     * @param legendBounds
     * @param rect
     * @param availableSize
     * @param maxLabelSize
     * @param position
     * @param alignment
     * @param legendBounds
     * @param rect
     * @param availableSize
     * @param maxLabelSize
     * @param position
     * @param alignment
     * @param legendBounds
     * @param rect
     * @param availableSize
     * @param maxLabelSize
     * @param position
     * @param alignment
     * @param legendBounds
     * @param rect
     * @param availableSize
     * @param maxLabelSize
     * @param position
     * @param alignment
     * @param legendBounds
     * @param rect
     * @param availableSize
     * @param maxLabelSize
     * @param position
     * @param alignment
     * @param legendBounds
     * @param rect
     * @param availableSize
     * @param maxLabelSize
     */
    private getLocation;
    /**
     * To find legend alignment for chart and accumulation chart
     *
     * @param start
     * @param size
     * @param legendSize
     * @param alignment
     * @param start
     * @param size
     * @param legendSize
     * @param alignment
     * @param start
     * @param size
     * @param legendSize
     * @param alignment
     * @param start
     * @param size
     * @param legendSize
     * @param alignment
     */
    private alignLegend;
    /**
     * Renders the legend.
     *
     * @param chart
     * @param legend
     * @param legendBounds
     * @param redraw
     * @param chart
     * @param legend
     * @param legendBounds
     * @param redraw
     * @param chart
     * @param legend
     * @param legendBounds
     * @param redraw
     * @param chart
     * @param legend
     * @param legendBounds
     * @param redraw
     * @returns {void}
     * @private
     */
    renderLegend(chart: Chart | AccumulationChart | BulletChart | StockChart | Chart3D | CircularChart3D, legend: LegendSettingsModel, legendBounds: Rect, redraw?: boolean, pointAnimation?: boolean): void;
    /**
     * To get linear legend.
     *
     * @param {Rect} legendBounds - The bounds of the legend.
     * @param {Chart | AccumulationChart | BulletChart | StockChart | Chart3D | CircularChart3D} chart - The chart instance.
     * @param {LegendSettingsModel} legend - The legend settings.
     * @param {Element} legendTranslateGroup - The group element to translate the legend.
     * @returns {void}
     * @private
     */
    private getLinearLegend;
    /**
     * To find first valid legend text index for chart and accumulation chart
     *
     * @param legendCollection
     * @returns {number}
     * @private
     */
    private findFirstLegendPosition;
    /**
     * To get the legend title text width and height.
     *
     * @param legend
     * @param legendBounds
     */
    protected calculateLegendTitle(legend: LegendSettingsModel, legendBounds: Rect): void;
    /**
     * Render the legend title
     *
     * @param chart
     * @param legend
     * @param legendBounds
     * @param legendGroup
     */
    private renderLegendTitle;
    /**
     * To create legend rendering elements for chart and accumulation chart
     *
     * @param chart
     * @param legendBounds
     * @param legendGroup
     * @param legend
     * @param id
     * @param redraw
     */
    private createLegendElements;
    /**
     * To render legend symbols for chart and accumulation chart
     *
     * @param legendOption
     * @param group
     * @param i
     * @param legendOption
     * @param group
     * @param i
     * @param legendOption
     * @param group
     * @param i
     */
    protected renderSymbol(legendOption: LegendOptions, group: Element, legendIndex: number): void;
    /**
     * To render legend text for chart and accumulation chart
     *
     * @param chart
     * @param legendOption
     * @param group
     * @param textOptions
     * @param i
     * @param chart
     * @param legendOption
     * @param group
     * @param textOptions
     * @param i
     * @param chart
     * @param legendOption
     * @param group
     * @param textOptions
     * @param i
     * @param chart
     * @param legendOption
     * @param group
     * @param textOptions
     * @param i
     * @param chart
     * @param legendOption
     * @param group
     * @param textOptions
     * @param i
     */
    protected renderText(chart: Chart | AccumulationChart | BulletChart | StockChart | Chart3D | CircularChart3D, legendOption: LegendOptions, group: Element, textOptions: TextOption, i: number, legendIndex: number): void;
    /**
     * To render legend paging elements for chart and accumulation chart
     *
     * @param chart
     * @param bounds
     * @param textOption
     * @param legendGroup
     * @param chart
     * @param bounds
     * @param textOption
     * @param legendGroup
     * @param chart
     * @param bounds
     * @param textOption
     * @param legendGroup
     * @param chart
     * @param bounds
     * @param textOption
     * @param legendGroup
     */
    private renderPagingElements;
    private getPageHeight;
    /**
     * To translate legend pages for chart and accumulation chart
     *
     * @param pagingText
     * @param page
     * @param pageNumber
     * @param legend
     * @param pagingText
     * @param page
     * @param pageNumber
     * @param legend
     * @param pagingText
     * @param page
     * @param pageNumber
     * @param legend
     * @param pagingText
     * @param page
     * @param pageNumber
     * @param legend
     */
    protected translatePage(isCanvas: boolean, pagingText: Element, page: number, pageNumber: number, legend?: LegendSettingsModel): number;
    /**
     * To change legend pages for chart and accumulation chart
     *
     * @param event
     * @param pageUp
     * @param event
     * @param pageUp
     */
    protected changePage(event: Event, pageUp: boolean): void;
    /**
     * To hide the backward and forward arrow
     *
     * @param arrowElement
     */
    private hideArrow;
    /**
     * To show the  backward and forward arrow
     *
     * @param arrowElement
     */
    private showArrow;
    /**
     * To find legend elements id based on chart or accumulation chart
     *
     * @param option
     * @param prefix
     * @param count
     * @param option
     * @param prefix
     * @param count
     * @param option
     * @param prefix
     * @param count
     * @private
     */
    generateId(option: LegendOptions, prefix: string, count: number): string;
    /**
     * To show or hide trimmed text tooltip for legend.
     *
     * @param event
     * @returns {void}
     * @private
     */
    move(event: Event): void;
}
/**
 * Class for legend options
 *
 * @private
 */
export declare class LegendOptions {
    render: boolean;
    originalText: string;
    text: string;
    fill: string;
    shape: LegendShape;
    visible: boolean;
    type: ChartSeriesType | AccumulationType;
    textSize: Size;
    location: ChartLocation;
    url?: string;
    pointIndex?: number;
    seriesIndex?: number;
    markerShape?: ChartShape;
    markerVisibility?: boolean;
    textCollection?: string[];
    dashArray?: string;
    constructor(text: string, fill: string, shape: LegendShape, visible: boolean, type: ChartSeriesType | AccumulationType, url?: string, markerShape?: ChartShape, markerVisibility?: boolean, pointIndex?: number, seriesIndex?: number, dashArray?: string, originalText?: string);
}
