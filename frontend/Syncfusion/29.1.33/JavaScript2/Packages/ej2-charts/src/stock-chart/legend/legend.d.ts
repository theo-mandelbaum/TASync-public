import { ChartLocation } from '../../common/utils/helper';
import { BaseLegend, LegendOptions } from '../../common/legend/legend';
import { LegendMode } from '../../chart/utils/enum';
import { Alignment, LegendPosition, LegendTitlePosition } from '../../common/utils/enum';
import { Size, Rect } from '@syncfusion/ej2-svg-base';
import { Series } from '../../chart/series/chart-series';
import { StockChart } from '../../stock-chart/index';
import { ChildProperty } from '@syncfusion/ej2-base';
import { StockChartLegendSettingsModel } from './legend-model';
import { StockChartFontModel, StockChartBorderModel, StockMarginModel } from '../model/base-model';
import { LocationModel } from '../../common';
import { ContainerPaddingModel } from '../../common/model/base-model';
/**
 * Configures the legends in charts.
 */
export declare class StockChartLegendSettings extends ChildProperty<StockChartLegendSettings> {
    /**
     * If set to true, legend will be visible.
     *
     * @default false
     */
    visible: boolean;
    /**
     * The height of the legend in pixels.
     *
     * @default null
     */
    height: string;
    /**
     * The width of the legend in pixels.
     *
     * @default null
     */
    width: string;
    /**
     * Specifies the location of the legend, relative to the Stock chart.
     * If x is 20, legend moves by 20 pixels to the right of the Stock chart. It requires the `position` to be `Custom`.
     * ```html
     * <div id='StockChart'></div>
     * ```
     * ```typescript
     * let stockChart: StockChart = new StockChart({
     * ...
     *   legendSettings: {
     *     visible: true,
     *     position: 'Custom',
     *     location: { x: 100, y: 150 },
     *   },
     * ...
     * });
     * stockChart.appendTo('#StockChart');
     * ```
     */
    location: LocationModel;
    /**
     * Position of the legend in the Stock chart are,
     * * Auto: Places the legend based on area type.
     * * Top: Displays the legend at the top of the stock chart.
     * * Left: Displays the legend at the left of the stock chart.
     * * Bottom: Displays the legend at the bottom of the stock chart.
     * * Right: Displays the legend at the right of the stock chart.
     * * Custom: Displays the legend  based on the given x and y values.
     *
     * @default 'Auto'
     */
    position: LegendPosition;
    /**
     * Mode of legend items.
     * * Series: Legend items generated based on series count.
     * * Point: Legend items generated based on unique data points.
     * * Range: Legend items generated based on range color mapping property.
     * * Gradient: Single linear bar generated based on range color mapping property.
     * This property is applicable for chart component only.
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
     * Legend in stock chart can be aligned as follows:
     * * Near: Aligns the legend to the left of the stock chart.
     * * Center: Aligns the legend to the center of the stock chart.
     * * Far: Aligns the legend to the right of the stock chart.
     *
     * @default 'Center'
     */
    alignment: Alignment;
    /**
     * Options to customize the legend text.
     */
    textStyle: StockChartFontModel;
    /**
     * Shape height of the legend in pixels.
     *
     * @default 10
     */
    shapeHeight: number;
    /**
     * Shape width of the legend in pixels.
     *
     * @default 10
     */
    shapeWidth: number;
    /**
     * Options to customize the border of the legend.
     */
    border: StockChartBorderModel;
    /**
     *  Options to customize left, right, top and bottom margins of the stock chart.
     */
    margin: StockMarginModel;
    /**
     *  Options to customize left, right, top and bottom padding for legend container of the stock chart.
     */
    containerPadding: ContainerPaddingModel;
    /**
     * Padding between the legend shape and text in stock chart.
     *
     * @default 8
     */
    shapePadding: number;
    /**
     * The background color of the legend that accepts value in hex and rgba as a valid CSS color string in stock chart.
     *
     * @default 'transparent'
     */
    background: string;
    /**
     * Opacity of the legend in stock chart.
     *
     * @default 1
     */
    opacity: number;
    /**
     * If set to true, series' visibility collapses based on the legend visibility in stock chart.
     *
     * @default true
     */
    toggleVisibility: boolean;
    /**
     * Description for legends in stock chart.
     *
     * @default null
     */
    description: string;
    /**
     * TabIndex value for the legend in stock chart.
     *
     * @default 3
     */
    tabIndex: number;
    /**
     * Title for legends in stock chart.
     *
     * @default null
     */
    title: string;
    /**
     * Options to customize the legend title in stock chart.
     */
    titleStyle: StockChartFontModel;
    /**
     * legend title position in stock chart.
     *
     * @default 'Top'
     */
    titlePosition: LegendTitlePosition;
    /**
     * maximum width for the legend title in stock chart.
     *
     * @default 100
     */
    maximumTitleWidth: number;
    /**
     * If set to true, legend will be visible using pages in stock chart.
     *
     * @default true
     */
    enablePages: boolean;
    /**
     * If set to true, legend will be Reversed in stock chart.
     *
     * @default false
     */
    isInversed: boolean;
}
/**
 * `Legend` module is used to render legend for the stockchart.
 */
export declare class StockLegend extends BaseLegend {
    constructor(chart: StockChart);
    /**
     * Binding events for Stocklegend module.
     *
     * @returns {void}
     */
    private addEventListener;
    /**
     * UnBinding events for Stocklegend module.
     *
     * @returns {void}
     */
    private removeEventListener;
    /**
     * To handle mouse move for Stocklegend module.
     *
     * @param {MouseEvent} e - The mouse move event.
     * @returns {void}
     */
    private mouseMove;
    /**
     * To handle mouse end for Stocklegend module.
     *
     * @param {MouseEvent} e - The mouse move event.
     * @returns {void}
     */
    private mouseEnd;
    getLegendOptions(visibleSeriesCollection: Series[]): void;
    /**
     * Retrieves the bounds of the legend.
     *
     * @param {Size} availableSize - The available size for the legend.
     * @param {Rect} legendBound - The bounds of the legend element.
     * @param {StockChartLegendSettingsModel} legend - The settings for the legend.
     * @returns {void}
     * @private
     */
    getLegendBounds(availableSize: Size, legendBound: Rect, legend: StockChartLegendSettingsModel): void;
    /**
     * Retrieves the render point for the legend.
     *
     * @param {LegendOptions} legendOptions - The options for the legend.
     * @param {ChartLocation} start - The starting point for rendering the legend.
     * @param {number} textPadding - The padding around legend text.
     * @param {LegendOptions} prevLegend - The options for the previous legend.
     * @param {Rect} rect - The bounding for the legend.
     * @param {number} count - The count of legends.
     * @param {number} firstLegend - The index of the first legend.
     * @returns {void}
     * @private
     */
    getRenderPoint(legendOptions: LegendOptions, start: ChartLocation, textPadding: number, prevLegend: LegendOptions, rect: Rect, count: number, firstLegend: number): void;
    /**
     * Handles the click event on the legend.
     *
     * @param {number} index - The index of the legend item.
     * @returns {void}
     * @private
     */
    legendClick(index: number): void;
    private refreshLegendToggle;
    private changeSeriesVisiblity;
    private SecondaryAxis;
    /**
     * To show the tooltip for the trimmed text in legend.
     *
     * @param {Event | PointerEvent} event - The click event.
     * @returns {void}
     */
    click(event: Event | PointerEvent): void;
    /**
     * Get module name.
     *
     * @returns {string} - Returns the module name.
     */
    protected getModuleName(): string;
    /**
     * To destroy the Legend.
     *
     * @returns {void}
     * @private
     */
    destroy(): void;
}
