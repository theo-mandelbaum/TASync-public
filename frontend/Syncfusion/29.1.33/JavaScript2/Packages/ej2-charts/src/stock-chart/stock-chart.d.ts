import { Component, INotifyPropertyChanged, Internationalization, ModuleDeclaration } from '@syncfusion/ej2-base';
import { EmitType } from '@syncfusion/ej2-base';
import { DataManager } from '@syncfusion/ej2-data';
import { StockChartModel } from './stock-chart-model';
import { Chart } from '../chart/chart';
import { ZoomSettingsModel, CrosshairSettingsModel } from '../chart/chart-model';
import { Axis } from '../chart/axis/axis';
import { Series } from '../chart/series/chart-series';
import { Size, Rect, SvgRenderer } from '@syncfusion/ej2-svg-base';
import { ITooltipRenderEventArgs, IMouseEventArgs, IPointEventArgs } from '../chart/model/chart-interface';
import { IRangeSelectorRenderEventArgs } from '../range-navigator/model/range-navigator-interface';
import { IAxisLabelRenderEventArgs, ISeriesRenderEventArgs, IZoomingEventArgs } from '../chart/model/chart-interface';
import { StockTooltipSettingsModel, PeriodsModel } from '../common/model/base-model';
import { RangeNavigator } from '../range-navigator/range-navigator';
import { PeriodSelector } from '../common/period-selector/period-selector';
import { CartesianChart } from './renderer/cartesian-chart';
import { RangeSelector } from './renderer/range-selector';
import { ToolBarSelector } from './renderer/toolbar-selector';
import { IStockLegendRenderEventArgs, IStockLegendClickEventArgs } from './model/base';
import { IStockChartEventArgs, IRangeChangeEventArgs } from './model/base';
import { IStockEventRenderArgs } from './model/base';
import { StockChartAnnotationSettingsModel } from './model/base-model';
import { StockSeriesModel, StockChartIndicatorModel, StockChartAxisModel, StockChartRowModel } from './model/base-model';
import { StockChartIndexesModel, StockChartFontModel, StockChartAreaModel, StockEventsSettingsModel } from './model/base-model';
import { StockChartBorderModel, StockMarginModel } from './model/base-model';
import { ChartSeriesType, TrendlineTypes, TechnicalIndicators } from '../chart/utils/enum';
import { ChartTheme, SelectionMode } from '../common/utils/enum';
import { IExportEventArgs } from '../common/model/interface';
import { ExportType } from '../common/utils/enum';
import { StockEvents } from './renderer/stock-events';
import { IThemeStyle } from '../chart/model/chart-interface';
import { StockChartLegendSettingsModel } from './legend/legend-model';
import { StockLegend } from './legend/legend';
/**
 * Stock Chart
 *
 * @public
 */
export declare class StockChart extends Component<HTMLElement> implements INotifyPropertyChanged {
    /**
     * `legendModule` is used to manipulate and add legend to the Stockchart.
     */
    stockLegendModule: StockLegend;
    /**
     * The width of the stockChart as a string accepts input as both like '100px' or '100%'.
     * If specified as '100%, stockChart renders to the full width of its parent element.
     *
     * @default null
     */
    width: string;
    /**
     * The height of the stockChart as a string accepts input both as '100px' or '100%'.
     * If specified as '100%, stockChart renders to the full height of its parent element.
     *
     * @default null
     */
    height: string;
    /**
     * Specifies the DataSource for the stockChart. It can be an array of JSON objects or an instance of DataManager.
     * ```html
     * <div id='financial'></div>
     * ```
     * ```typescript
     * let dataManager: DataManager = new DataManager({
     *         url: 'http://mvc.syncfusion.com/Services/Northwnd.svc/Tasks/'
     * });
     * let query: Query = new Query().take(50).where('Estimate', 'greaterThan', 0, false);
     * let financial: stockChart = new stockChart({
     * ...
     *  dataSource:dataManager,
     *   series: [{
     *        xName: 'Id',
     *        yName: 'Estimate',
     *        query: query
     *    }],
     * ...
     * });
     * financial.appendTo('#financial');
     * ```
     *
     * @default ''
     */
    dataSource: Object | DataManager;
    /**
     *  Options to customize left, right, top and bottom margins of the stockChart.
     */
    margin: StockMarginModel;
    /**
     * Options for customizing the color and width of the stockChart border.
     */
    border: StockChartBorderModel;
    /**
     * The background color of the stockChart that accepts value in hex and rgba as a valid CSS color string.
     *
     * @default null
     */
    background: string;
    /**
     * Specifies the theme for the stockChart.
     *
     * @default 'Material'
     */
    theme: ChartTheme;
    /**
     * Options to configure the horizontal axis.
     */
    primaryXAxis: StockChartAxisModel;
    /**
     * Options for configuring the border and background of the stockChart area.
     */
    chartArea: StockChartAreaModel;
    /**
     * Options to configure the vertical axis.
     */
    primaryYAxis: StockChartAxisModel;
    /**
     * Options to split stockChart into multiple plotting areas horizontally.
     * Each object in the collection represents a plotting area in the stockChart.
     */
    rows: StockChartRowModel[];
    /**
     * Secondary axis collection for the stockChart.
     */
    axes: StockChartAxisModel[];
    /**
     * The configuration for series in the stockChart.
     */
    series: StockSeriesModel[];
    /**
     * The configuration for stock events in the stockChart.
     */
    stockEvents: StockEventsSettingsModel[];
    /**
     * It specifies whether the stockChart should be render in transposed manner or not.
     *
     * @default false
     */
    isTransposed: boolean;
    /**
     * Title of the chart
     *
     * @default ''
     */
    title: string;
    /**
     * Options for customizing the title of the Chart.
     */
    titleStyle: StockChartFontModel;
    /**
     * Defines the collection of technical indicators, that are used in financial markets.
     */
    indicators: StockChartIndicatorModel[];
    /**
     * Options for customizing the tooltip of the chart.
     */
    tooltip: StockTooltipSettingsModel;
    /**
     * Options for customizing the crosshair of the chart.
     */
    crosshair: CrosshairSettingsModel;
    /**
     * Options for customizing the legend of the stockChart.
     */
    legendSettings: StockChartLegendSettingsModel;
    /**
     * Options to enable the zooming feature in the chart.
     */
    zoomSettings: ZoomSettingsModel;
    /**
     * It specifies whether the periodSelector to be rendered in financial chart
     *
     * @default true
     */
    enablePeriodSelector: boolean;
    /**
     * Custom Range
     *
     * @default true
     */
    enableCustomRange: boolean;
    /**
     * If set true, enables the animation in chart.
     *
     * @default false
     */
    isSelect: boolean;
    /**
     * It specifies whether the range navigator to be rendered in financial chart
     *
     * @default true
     */
    enableSelector: boolean;
    /**
     * To configure period selector options.
     */
    periods: PeriodsModel[];
    /**
     * The configuration for annotation in chart.
     */
    annotations: StockChartAnnotationSettingsModel[];
    /**
     * Triggers before render the selector
     *
     * @event selectorRender
     * @deprecated
     */
    selectorRender: EmitType<IRangeSelectorRenderEventArgs>;
    /**
     * Triggers on hovering the stock chart.
     *
     * @event stockChartMouseMove
     * @blazorProperty 'OnStockChartMouseMove'
     */
    stockChartMouseMove: EmitType<IMouseEventArgs>;
    /**
     * Triggers when cursor leaves the chart.
     *
     * @event stockChartMouseLeave
     * @blazorProperty 'OnStockChartMouseLeave'
     */
    stockChartMouseLeave: EmitType<IMouseEventArgs>;
    /**
     * Triggers on mouse down.
     *
     * @event stockChartMouseDown
     * @blazorProperty 'OnStockChartMouseDown'
     */
    stockChartMouseDown: EmitType<IMouseEventArgs>;
    /**
     * Triggers on mouse up.
     *
     * @event stockChartMouseUp
     * @blazorProperty 'OnStockChartMouseUp'
     */
    stockChartMouseUp: EmitType<IMouseEventArgs>;
    /**
     * Triggers on clicking the stock chart.
     *
     * @event stockChartMouseClick
     * @blazorProperty 'OnStockChartMouseClick'
     */
    stockChartMouseClick: EmitType<IMouseEventArgs>;
    /**
     * Triggers on point click.
     *
     * @event pointClick
     * @blazorProperty 'OnPointClick'
     */
    pointClick: EmitType<IPointEventArgs>;
    /**
     * Triggers on point move.
     *
     * @event pointMove
     * @blazorProperty 'PointMoved'
     */
    pointMove: EmitType<IPointEventArgs>;
    /**
     * Triggers after the zoom selection is completed.
     *
     * @event onZooming
     */
    onZooming: EmitType<IZoomingEventArgs>;
    /**
     * Triggers before the legend is rendered.
     *
     * @event legendRender
     * @deprecated
     */
    legendRender: EmitType<IStockLegendRenderEventArgs>;
    /**
     * Triggers after click on legend.
     *
     * @event legendClick
     */
    legendClick: EmitType<IStockLegendClickEventArgs>;
    /**
     * Specifies whether series or data point has to be selected. They are,
     * * none: Disables the selection.
     * * series: selects a series.
     * * point: selects a point.
     * * cluster: selects a cluster of point
     * * dragXY: selects points by dragging with respect to both horizontal and vertical axes
     * * dragX: selects points by dragging with respect to horizontal axis.
     * * dragY: selects points by dragging with respect to vertical axis.
     *
     * @default None
     */
    selectionMode: SelectionMode;
    /**
     * If set true, enables the multi selection in chart. It requires `selectionMode` to be `Point` | `Series` | or `Cluster`.
     *
     * @default false
     */
    isMultiSelect: boolean;
    /**
     * Triggers before the range navigator rendering.
     *
     * @event load
     */
    load: EmitType<IStockChartEventArgs>;
    /**
     * Triggers after the range navigator rendering.
     *
     * @event loaded
     * @blazorProperty 'Loaded'
     */
    loaded: EmitType<IStockChartEventArgs>;
    /**
     * Triggers if the range is changed
     *
     * @event rangeChange
     * @blazorProperty 'RangeChange'
     */
    rangeChange: EmitType<IRangeChangeEventArgs>;
    /**
     * Triggers before each axis label is rendered.
     *
     * @event axisLabelRender
     * @deprecated
     */
    axisLabelRender: EmitType<IAxisLabelRenderEventArgs>;
    /**
     * Triggers before the export process begins. This event allows for the customization of export settings before the chart is exported.
     *
     * @event beforeExport
     *
     */
    beforeExport: EmitType<IExportEventArgs>;
    /**
     * Triggers before the tooltip for series is rendered.
     *
     * @event tooltipRender
     * @deprecated
     */
    tooltipRender: EmitType<ITooltipRenderEventArgs>;
    /**
     * Triggers before the series is rendered.
     *
     * @event seriesRender
     * @deprecated
     */
    seriesRender: EmitType<ISeriesRenderEventArgs>;
    /**
     * Triggers before the series is rendered.
     *
     * @event stockEventRender
     * @deprecated
     */
    stockEventRender: EmitType<IStockEventRenderArgs>;
    /**
     * Specifies the point indexes to be selected while loading a chart.
     * It requires `selectionMode` to be `Point` | `Series` | or `Cluster`.
     * ```html
     * <div id='Chart'></div>
     * ```
     * ```typescript
     * let chart: Chart = new Chart({
     * ...
     *   selectionMode: 'Point',
     *   selectedDataIndexes: [ { series: 0, point: 1},
     *                          { series: 2, point: 3} ],
     * ...
     * });
     * chart.appendTo('#Chart');
     * ```
     *
     * @default []
     */
    selectedDataIndexes: StockChartIndexesModel[];
    /**
     * It specifies the types of series in financial chart.
     */
    seriesType: ChartSeriesType[];
    /**
     * It specifies the types of indicators in financial chart.
     */
    indicatorType: TechnicalIndicators[];
    /**
     * It specifies the types of Export types in financial chart.
     */
    exportType: ExportType[];
    /**
     * It specifies the types of trendline types in financial chart.
     */
    trendlineType: TrendlineTypes[];
    /**
     * Gets the current visible series of the Chart.
     *
     * @hidden
     */
    visibleSeries: Series[];
    /** @private */
    startValue: number;
    /** @private */
    isSingleAxis: boolean;
    /** @private */
    endValue: number;
    /** @private */
    seriesXMax: number;
    /** @private */
    seriesXMin: number;
    /** @private  */
    currentEnd: number;
    /** Overall SVG */
    mainObject: Element;
    /** @private */
    selectorObject: Element;
    /** @private */
    chartObject: Element;
    /** @private */
    svgObject: Element;
    /** @private */
    isTouch: boolean;
    /** @private */
    renderer: SvgRenderer;
    /** @private */
    animateSeries: boolean;
    /** @private */
    availableSize: Size;
    /** @private */
    titleSize: Size;
    /** @private */
    chartSize: Size;
    /** @private */
    intl: Internationalization;
    /** @private */
    isDoubleTap: boolean;
    /** @private */
    private threshold;
    /** @private */
    isChartDrag: boolean;
    resizeTo: number;
    /** @private */
    disableTrackTooltip: boolean;
    /** @private */
    startMove: boolean;
    /** @private */
    yAxisElements: Element;
    /** @private */
    themeStyle: IThemeStyle;
    /** @private */
    scrollElement: Element;
    private chartid;
    tempSeriesType: ChartSeriesType[];
    /** @private */
    chart: Chart;
    /** @private */
    rangeNavigator: RangeNavigator;
    /** @private */
    periodSelector: PeriodSelector;
    /** @private */
    cartesianChart: CartesianChart;
    /** @private */
    rangeSelector: RangeSelector;
    /** @private */
    toolbarSelector: ToolBarSelector;
    /** @private */
    stockEvent: StockEvents;
    /** private */
    zoomChange: boolean;
    /** @private */
    mouseDownX: number;
    /** @private */
    mouseDownY: number;
    /** @private */
    previousMouseMoveX: number;
    /** @private */
    previousMouseMoveY: number;
    /** @private */
    mouseDownXPoint: number;
    /** @private */
    mouseUpXPoint: number;
    /** @private */
    allowPan: boolean;
    /** @private  */
    onPanning: boolean;
    /** @private  */
    referenceXAxis: Axis;
    /** @private */
    mouseX: number;
    /** @private */
    mouseY: number;
    /** @private */
    indicatorElements: Element;
    /** @private */
    trendlinetriggered: boolean;
    /** @private */
    periodSelectorHeight: number;
    /** @private */
    toolbarHeight: number;
    /** @private */
    stockChartTheme: IThemeStyle;
    /** @private */
    initialRender: boolean;
    /** @private */
    rangeFound: boolean;
    /** @private */
    tempPeriods: PeriodsModel[];
    /** @private */
    legend: StockLegend;
    /** @private */
    visibleSeriesCount: number;
    /** @private */
    redraw: boolean;
    /** @private */
    initialClipRect: Rect;
    /** @private */
    legendClicked: boolean;
    /** @private */
    tempAvailableSize: Size;
    /** @private */
    mouseMoveEvent: PointerEvent;
    isDateTimeCategory: boolean;
    sortedData: number[];
    private visibleRange;
    isStockChartRendered: boolean;
    /**
     * Constructor for creating the widget.
     *
     * @param {StockChartModel} options - Specifies the stock chart model.
     * @param {string | HTMLElement} element - Specifies the element for the stock chart.
     * @hidden
     */
    constructor(options?: StockChartModel, element?: string | HTMLElement);
    /**
     * Called internally if any of the property value changed.
     *
     * @private
     * @param {StockChartModel} newProp - The new StockChartModel.
     * @returns {void}
     */
    onPropertyChanged(newProp: StockChartModel): void;
    /**
     * To change the range for chart.
     *
     * @param {number} updatedStart - The updated start value for the chart range.
     * @param {number} updatedEnd - The updated end value for the chart range.
     * @returns {void}
     */
    rangeChanged(updatedStart: number, updatedEnd: number): void;
    /**
     * Pre render for financial Chart.
     *
     * @returns {void}
     */
    protected preRender(): void;
    /**
     * Method to bind events for chart.
     *
     * @returns {void}
     */
    private unWireEvents;
    private wireEvents;
    private initPrivateVariable;
    /**
     * Method to set culture for chart.
     *
     * @returns {void}
     */
    private setCulture;
    private storeDataSource;
    /**
     * To Initialize the control rendering.
     *
     * @returns {void}
     */
    protected render(): void;
    /**
     * DataManager Success.
     *
     * @returns {void}
     */
    stockChartDataManagerSuccess(): void;
    /**
     * To set styles to resolve mvc width issue.
     *
     * @param {HTMLElement} element - The html element.
     * @returns {void}
     */
    private setStyle;
    private drawSVG;
    private calculateVisibleSeries;
    private createSecondaryElements;
    /**
     * To provide the array of modules needed for control rendering
     *
     * @returns {ModuleDeclaration[]} required modules
     * @private
     */
    requiredModules(): ModuleDeclaration[];
    findCurrentData(totalData: Object, xName: string): Object;
    /**
     * Render period selector.
     *
     * @returns {void}
     */
    renderPeriodSelector(): void;
    private chartRender;
    /**
     * To render range Selector.
     *
     * @returns {void}
     */
    private renderRangeSelector;
    /**
     * Get component name.
     *
     * @returns {string} - To get the module name.
     */
    getModuleName(): string;
    /**
     * Get the properties to be maintained in the persisted state.
     *
     * @private
     * @returns {string} - The persisted data containing the properties.
     */
    getPersistData(): string;
    /**
     * To Remove the SVG.
     *
     * @returns {void}
     * @private
     */
    removeSvg(): void;
    /**
     * Module Injection for components.
     *
     * @returns {void}
     */
    chartModuleInjection(): void;
    /**
     * Find range for financal chart.
     *
     * @returns {void}
     * @private
     */
    findRange(): void;
    /**
     * Handles the chart resize.
     *
     * @returns {boolean} false
     * @private
     */
    stockChartResize(): boolean;
    /**
     * Handles the mouse down on chart.
     *
     * @param {PointerEvent} e - The pointer event.
     * @returns {boolean} - false
     * @private
     */
    stockChartOnMouseDown(e: PointerEvent): boolean;
    /**
     * Handles the mouse up.
     *
     * @param {PointerEvent} e - The pointer event.
     * @returns {boolean} - false
     * @private
     */
    stockChartMouseEnd(e: PointerEvent): boolean;
    /**
     * Handles the mouse up.
     *
     * @param {PointerEvent | TouchEvent} e - The pointer event or touch event.
     * @returns {boolean} - false
     * @private
     */
    stockChartOnMouseUp(e: PointerEvent | TouchEvent): boolean;
    /**
     * To find mouse x, y for aligned chart element svg position.
     *
     * @param {number} pageX - The x-coordinate of the mouse pointer event.
     * @param {number} pageY - The y-coordinate of the mouse pointer event.
     * @returns {void}
     */
    private setMouseXY;
    /**
     * Handles the mouse move.
     *
     * @param {PointerEvent} e - The pointer event.
     * @returns {boolean} - false
     * @private
     */
    stockChartOnMouseMove(e: PointerEvent): boolean;
    /**
     * Handles the mouse move on chart.
     *
     * @param {PointerEvent | TouchEvent} e - The pointer event or touch event.
     * @returns {boolean} - false
     * @private
     */
    chartOnMouseMove(e: PointerEvent | TouchEvent): boolean;
    /**
     * Handles the mouse click on chart.
     *
     * @param {PointerEvent | TouchEvent} e - The pointer event or touch event.
     * @returns {boolean} - false
     * @private
     */
    stockChartOnMouseClick(e: PointerEvent | TouchEvent): boolean;
    private stockChartRightClick;
    /**
     * Handles the mouse leave.
     *
     * @param {PointerEvent} e - The pointer event.
     * @returns {boolean} false
     * @private
     */
    stockChartOnMouseLeave(e: PointerEvent): boolean;
    /**
     * Handles the mouse leave on chart.
     *
     * @param {PointerEvent | TouchEvent} e - The pointer event or touch event.
     * @returns {boolean} - false
     * @private
     */
    stockChartOnMouseLeaveEvent(e: PointerEvent | TouchEvent): boolean;
    /**
     * Destroy method.
     *
     * @returns {void}
     */
    destroy(): void;
    private renderBorder;
    /**
     * Render title for chart.
     *
     * @returns {void}
     */
    private renderTitle;
    /**
     * To calculate the legend bounds.
     *
     * @private
     * @returns {void}
     */
    calculateLegendBounds(): void;
    /**
     * To render the legend.
     *
     * @private
     * @returns {void}
     */
    renderLegend(): void;
    private findTitleColor;
    /**
     * To calculate the stock events.
     *
     * @private
     * @returns {void}
     */
    calculateStockEvents(): void;
}
