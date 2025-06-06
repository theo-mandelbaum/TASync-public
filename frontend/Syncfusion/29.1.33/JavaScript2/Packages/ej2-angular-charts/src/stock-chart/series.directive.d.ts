import { ViewContainerRef } from '@angular/core';
import { ComplexBase, ArrayBase } from '@syncfusion/ej2-angular-base';
import * as i0 from "@angular/core";
/**
 * Series Directive
 * ```html
 * <e-stockchart-series-collection>
 * <e-stockchart-series></e-stockchart-series>
 * </e-stockchart-series-collection>
 * ```
 */
export declare class StockChartSeriesDirective extends ComplexBase<StockChartSeriesDirective> {
    private viewContainerRef;
    directivePropList: any;
    childTrendlines: any;
    tags: string[];
    /**
     * The type of the series are
     * * Line
     * * Column
     * * Area
     * * Spline
     * * Hilo
     * * HiloOpenClose
     * * Candle
     * @default 'Candle'
     */
    type: any;
    /**
     * Options to customizing animation for the series.
     */
    animation: any;
    /**
     * This property is used in stock charts to visualize the price movements in stock.
     * It defines the color of the candle/point, when the opening price is less than the closing price.
     * @default '#2ecd71'
     */
    bearFillColor: any;
    /**
     * Options to customizing the border of the series. This is applicable only for `Column` and `Bar` type series.
     */
    border: any;
    /**
     * This property is used in financial charts to visualize the price movements in stock.
     * It defines the color of the candle/point, when the opening price is higher than the closing price.
     * @default '#e74c3d'
     */
    bullFillColor: any;
    /**
     * It defines tension of cardinal spline types.
     * @default 0.5
     */
    cardinalSplineTension: any;
    /**
     * The DataSource field that contains the close value of y
     * It is applicable for series and technical indicators
     * @default ''
     */
    close: any;
    /**
     * To render the column series points with particular column spacing. It takes value from 0 - 1.
     * @default 0
     */
    columnSpacing: any;
    /**
     * To render the column series points with particular column width. If the series type is histogram the
     * default value is 1 otherwise 0.7.
     * @default null
     * @aspdefaultvalueignore
     */
    columnWidth: any;
    /**
     * To render the column series points with particular rounded corner.
     */
    cornerRadius: any;
    /**
     * Defines the pattern of dashes and gaps to stroke the lines in `Line` type series.
     * @default '0'
     */
    dashArray: any;
    /**
     * Specifies the DataSource for the series. It can be an array of JSON objects or an instance of DataManager.
     * @default ''
     */
    dataSource: any;
    /**
     * options to customize the empty points in series.
     */
    emptyPointSettings: any;
    /**
     * This property is applicable for candle series.
     * It enables/disables to visually compare the current values with the previous values in stock.
     * @default false
     */
    enableSolidCandles: any;
    /**
     * If set true, the Tooltip for series will be visible.
     * @default true
     */
    enableTooltip: any;
    /**
     * The fill color for the series that accepts value in hex and rgba as a valid CSS color string.
     * It also represents the color of the signal lines in technical indicators.
     * For technical indicators, the default value is 'blue' and for series, it has null.
     * @default null
     */
    fill: any;
    /**
     * The DataSource field that contains the high value of y
     * It is applicable for series and technical indicators
     * @default ''
     */
    high: any;
    /**
     * The URL for the Image that is to be displayed as a Legend icon.  It requires  `legendShape` value to be an `Image`.
     * @default ''
     */
    legendImageUrl: any;
    /**
     * The shape of the legend. Each series has its own legend shape. They are
     * * Circle - Renders a circle.
     * * Rectangle - Renders a rectangle.
     * * Triangle - Renders a triangle.
     * * Diamond - Renders a diamond.
     * * Cross - Renders a cross.
     * * HorizontalLine - Renders a horizontalLine.
     * * VerticalLine - Renders a verticalLine.
     * * Pentagon - Renders a pentagon.
     * * InvertedTriangle - Renders a invertedTriangle.
     * * SeriesType -Render a legend shape based on series type.
     * * Image -Render a image.     *
     * @default 'SeriesType'
     */
    legendShape: any;
    /**
     * The DataSource field that contains the low value of y
     * It is applicable for series and technical indicators
     * @default ''
     */
    low: any;
    /**
     * Options for displaying and customizing markers for individual points in a series.
     */
    marker: any;
    /**
     * The name of the series visible in legend.
     * @default ''
     */
    name: any;
    /**
     * The opacity of the series.
     * @default 1
     */
    opacity: any;
    /**
     * The DataSource field that contains the open value of y
     * It is applicable for series and technical indicators
     * @default ''
     */
    open: any;
    /**
     * The DataSource field that contains the color value of point
     * It is applicable for series
     * @default ''
     */
    pointColorMapping: any;
    /**
     * Specifies query to select data from DataSource. This property is applicable only when the DataSource is `ej.DataManager`.
     * @default null
     */
    query: any;
    /**
     * Custom style for the selected series or points.
     * @default null
     */
    selectionStyle: any;
    /**
     * Enables or disables the display of tooltips for the nearest data point to the cursor for series.
     * @default true
     */
    showNearestTooltip: any;
    /**
     * The provided value will be considered as a Tooltip name
     * @default ''
     */
    tooltipMappingName: any;
    /**
     * Defines the collection of trendlines that are used to predict the trend
     */
    trendlines: any;
    /**
     * Specifies the visibility of series.
     * @default true
     */
    visible: any;
    /**
     * Defines the data source field that contains the volume value in candle charts
     * It is applicable for financial series and technical indicators
     * @default ''
     */
    volume: any;
    /**
     * The stroke width for the series that is applicable only for `Line` type series.
     * It also represents the stroke width of the signal lines in technical indicators.
     * @default 1
     */
    width: any;
    /**
     * The name of the horizontal axis associated with the series. It requires `axes` of the chart.
     * It is applicable for series and technical indicators
     * @default null
     */
    xAxisName: any;
    /**
     * The DataSource field that contains the x value.
     * It is applicable for series and technical indicators
     * @default ''
     */
    xName: any;
    /**
     * The name of the vertical axis associated with the series. It requires `axes` of the chart.
     * It is applicable for series and technical indicators
     * @default null
     */
    yAxisName: any;
    /**
     * The DataSource field that contains the y value.
     * @default ''
     */
    yName: any;
    constructor(viewContainerRef: ViewContainerRef);
    static ɵfac: i0.ɵɵFactoryDeclaration<StockChartSeriesDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<StockChartSeriesDirective, "e-stockchart-series-collection>e-stockchart-series", never, { "animation": "animation"; "bearFillColor": "bearFillColor"; "border": "border"; "bullFillColor": "bullFillColor"; "cardinalSplineTension": "cardinalSplineTension"; "close": "close"; "columnSpacing": "columnSpacing"; "columnWidth": "columnWidth"; "cornerRadius": "cornerRadius"; "dashArray": "dashArray"; "dataSource": "dataSource"; "emptyPointSettings": "emptyPointSettings"; "enableSolidCandles": "enableSolidCandles"; "enableTooltip": "enableTooltip"; "fill": "fill"; "high": "high"; "legendImageUrl": "legendImageUrl"; "legendShape": "legendShape"; "low": "low"; "marker": "marker"; "name": "name"; "opacity": "opacity"; "open": "open"; "pointColorMapping": "pointColorMapping"; "query": "query"; "selectionStyle": "selectionStyle"; "showNearestTooltip": "showNearestTooltip"; "tooltipMappingName": "tooltipMappingName"; "trendlines": "trendlines"; "type": "type"; "visible": "visible"; "volume": "volume"; "width": "width"; "xAxisName": "xAxisName"; "xName": "xName"; "yAxisName": "yAxisName"; "yName": "yName"; }, {}, ["childTrendlines"]>;
}
/**
 * StockChartSeries Array Directive
 * @private
 */
export declare class StockChartSeriesCollectionDirective extends ArrayBase<StockChartSeriesCollectionDirective> {
    constructor();
    static ɵfac: i0.ɵɵFactoryDeclaration<StockChartSeriesCollectionDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<StockChartSeriesCollectionDirective, "ejs-stockchart>e-stockchart-series-collection", never, {}, {}, ["children"]>;
}
