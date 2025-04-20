/**
 * AccumulationChart file
 */
import { Component, INotifyPropertyChanged } from '@syncfusion/ej2-base';
import { ModuleDeclaration, Internationalization, EmitType } from '@syncfusion/ej2-base';
import { AccumulationChartModel } from './accumulation-model';
import { AccumulationSeries, AccPoints } from './model/acc-base';
import { AccumulationType, AccumulationSelectionMode, AccumulationHighlightMode } from './model/enum';
import { IAccSeriesRenderEventArgs, IAccTextRenderEventArgs } from './model/pie-interface';
import { IAccAnimationCompleteEventArgs, IAccPointRenderEventArgs, IAccLoadedEventArgs, IAccSelectionCompleteEventArgs } from './model/pie-interface';
import { ILegendRenderEventArgs, IMouseEventArgs, IPointEventArgs, ITooltipRenderEventArgs } from '../chart/model/chart-interface';
import { IAnnotationRenderEventArgs } from '../chart/model/chart-interface';
import { MarginModel, BorderModel, CenterLabelModel, TooltipSettingsModel, IndexesModel, AccessibilityModel, TitleStyleSettingsModel } from '../common/model/base-model';
import { AccumulationSeriesModel, PieCenterModel } from './model/acc-base-model';
import { AccumulationLegend } from './renderer/legend';
import { LegendSettingsModel } from '../common/legend/legend-model';
import { ChartLocation } from '../common/utils/helper';
import { Rect, Size, SvgRenderer, CanvasRenderer } from '@syncfusion/ej2-svg-base';
import { AccumulationTooltip } from './user-interaction/tooltip';
import { AccumulationBase } from './renderer/accumulation-base';
import { PieSeries } from './renderer/pie-series';
import { AccumulationDataLabel } from './renderer/dataLabel';
import { FunnelSeries } from './renderer/funnel-series';
import { PyramidSeries } from './renderer/pyramid-series';
import { AccumulationSelection } from './user-interaction/selection';
import { AccumulationHighlight } from './user-interaction/high-light';
import { AccumulationTheme } from './model/enum';
import { AccumulationAnnotationSettingsModel } from './model/acc-base-model';
import { AccumulationAnnotation } from './annotation/annotation';
import { IPrintEventArgs } from '../chart/model/chart-interface';
import { ExportType, SelectionPattern } from '../common/utils/enum';
import { IThemeStyle } from '../chart/model/chart-interface';
import { IAccResizeEventArgs, IAccBeforeResizeEventArgs, IAccLegendClickEventArgs } from './model/pie-interface';
import { DataManager } from '@syncfusion/ej2-data';
import { Export } from '../chart/print-export/export';
import { IAfterExportEventArgs, IExportEventArgs } from '../common/model/interface';
/**
 * Represents the AccumulationChart control.
 * ```html
 * <div id="accumulation"/>
 * <script>
 *   var accObj = new AccumulationChart({});
 *   accObj.appendTo("#accumulation");
 * </script>
 * ```
 *
 * @public
 */
export declare class AccumulationChart extends Component<HTMLElement> implements INotifyPropertyChanged {
    /**
     * The `accBaseModue` is used to define the common functionalities of accumulation series.
     *
     * @private
     */
    accBaseModule: AccumulationBase;
    /**
     * The `pieSeriesModule` is used to render pie series.
     *
     * @private
     */
    pieSeriesModule: PieSeries;
    /**
     * The `funnelSeriesModule` is used to render funnel series.
     *
     * @private
     */
    funnelSeriesModule: FunnelSeries;
    /**
     * The `pyramidSeriesModule` is used to render pyramid series.
     *
     * @private
     */
    pyramidSeriesModule: PyramidSeries;
    /**
     * The `accumulationLegendModule` is used to manipulate and add a legend in an accumulation chart.
     */
    accumulationLegendModule: AccumulationLegend;
    /**
     * The `accumulationDataLabelModule` is used to manipulate and add data labels in an accumulation chart.
     */
    accumulationDataLabelModule: AccumulationDataLabel;
    /**
     * The `accumulationTooltipModule` is used to manipulate and add tooltips to an accumulation chart.
     */
    accumulationTooltipModule: AccumulationTooltip;
    /**
     * The `accumulationSelectionModule` is used to manipulate and add selection in accumulation chart.
     */
    accumulationSelectionModule: AccumulationSelection;
    /**
     * The `accumulationHighlightModule` is used to manipulate and add highlights to the accumulation chart.
     */
    accumulationHighlightModule: AccumulationHighlight;
    /**
     * The `annotationModule` is used to manipulate and add annotations in the chart.
     */
    annotationModule: AccumulationAnnotation;
    /**
     * The `exportModule` is used to export the accumulation chart.
     */
    exportModule: Export;
    /**
     * The width of the chart as a string, allowing input in formats such as '100px' or '100%'.
     * If specified as '100%', the chart will render to the full width of its parent element.
     *
     * @default null
     */
    width: string;
    /**
     * The height of the chart as a string, allowing input in formats such as '100px' or '100%'.
     * If specified as '100%', the chart will render to the full height of its parent element.
     *
     * @default null
     */
    height: string;
    /**
     * The title is displayed at the top of the chart to provide information about the plotted data.
     *
     * @default null
     */
    title: string;
    /**
     * The background image of the chart accepts a string value as a URL link or the location of an image.
     *
     * @default null
     */
    backgroundImage: string;
    /**
     * The `center` property allows changing the center position of the pie chart using the `x` and `y` properties.
     * By default, the center value of the pie series is set to 50% for both the x and y coordinates.
     */
    center: PieCenterModel;
    /**
     * Specifies the data source for the accumulation chart. It can be an array of JSON objects, or an instance of `DataManager`.
     * ```html
     * <div id='Pie'></div>
     * ```
     * ```typescript
     * let dataManager: DataManager = new DataManager({
     *  url: https://services.syncfusion.com/js/production/api/orders'
     * });
     * let query: Query = new Query().take(5);
     * let pie: AccumulationChart = new AccumulationChart({
     * ...
     *     dataSource: dataManager,
     *     series: [{
     *        xName: 'CustomerID ',
     *        yName: 'Freight',
     *        query: query
     *    }],
     * ...
     * });
     * pie.appendTo('#Pie');
     * ```
     *
     * @default ''
     */
    dataSource: Object | DataManager;
    /**
     * Options for customizing the appearance of the title, which displays information about the plotted data.
     * Use the `fontFamily`, `size`, `fontStyle`, `fontWeight`, and `color` properties in `Font` to adjust the title's appearance.
     */
    titleStyle: TitleStyleSettingsModel;
    /**
     * The subtitle is positioned below the main title and provides further details about the data represented in the accumulation chart.
     *
     * @default null
     */
    subTitle: string;
    /**
     * Options for customizing the appearance of the subtitle, which displays information about the plotted data below the main title.
     * Use the `fontFamily`, `size`, `fontStyle`, `fontWeight`, and `color` properties in `Font` to adjust the subtitle's appearance.
     */
    subTitleStyle: TitleStyleSettingsModel;
    /**
     * The legend provides descriptive information about the data points displayed in the accumulation chart, helping to understand what each point represents.
     */
    legendSettings: LegendSettingsModel;
    /**
     * Tooltips display information about the data points when the mouse hovers over a point.
     */
    tooltip: TooltipSettingsModel;
    /**
     * Options to customize the label that appears at the center of the accumulation chart.
     */
    centerLabel: CenterLabelModel;
    /**
     * Specifies whether points in the accumulation chart can be selected.
     * Accepts the following values:
     * * None: Disables the selection of points.
     * * Point: Enables the selection of individual points.
     *
     * @default None
     */
    selectionMode: AccumulationSelectionMode;
    /**
     * Defines the color used to highlight a data point on mouse hover.
     *
     * @default ''
     */
    highlightColor: string;
    /**
     * Specifies whether points in the accumulation chart should be highlighted.
     * Accepts the following values:
     * * None: Disables the highlighting of points.
     * * Point: Highlights an individual point on hover.
     *
     * @default None
     */
    highlightMode: AccumulationHighlightMode;
    /**
     * Specifies the selection pattern for series or data points.
     * The `selectionPattern` property determines how the selected data points or series are visually represented.
     * The available options are:
     * * None: No selection pattern is applied.
     * * Chessboard: Applies a chessboard pattern as the selection effect.
     * * Dots: Applies a dot pattern as the selection effect.
     * * DiagonalForward: Applies a forward diagonal line pattern as the selection effect.
     * * Crosshatch: Applies a crosshatch pattern as the selection effect.
     * * Pacman: Applies a Pacman pattern as the selection effect.
     * * DiagonalBackward: Applies a backward diagonal line pattern as the selection effect.
     * * Grid: Applies a grid pattern as the selection effect.
     * * Turquoise: Applies a turquoise pattern as the selection effect.
     * * Star: Applies a star pattern as the selection effect.
     * * Triangle: Applies a triangle pattern as the selection effect.
     * * Circle: Applies a circle pattern as the selection effect.
     * * Tile: Applies a tile pattern as the selection effect.
     * * HorizontalDash: Applies a horizontal dash pattern as the selection effect.
     * * VerticalDash: Applies a vertical dash pattern as the selection effect.
     * * Rectangle: Applies a rectangle pattern as the selection effect.
     * * Box: Applies a box pattern as the selection effect.
     * * VerticalStripe: Applies a vertical stripe pattern as the selection effect.
     * * HorizontalStripe: Applies a horizontal stripe pattern as the selection effect.
     * * Bubble: Applies a bubble pattern as the selection effect.
     *
     * @default None
     */
    selectionPattern: SelectionPattern;
    /**
     * Specifies the pattern used for highlighting series or data points.
     * The `highlightPattern` property determines how the data points or series are visually highlighted.
     * The available options are:
     * * None: No highlighting pattern.
     * * Chessboard: Applies a chessboard pattern for highlighting.
     * * Dots: Applies a dot pattern for highlighting.
     * * DiagonalForward: Applies a forward diagonal line pattern for highlighting.
     * * Crosshatch: Applies a crosshatch pattern for highlighting.
     * * Pacman: Applies a Pacman pattern for highlighting.
     * * DiagonalBackward: Applies a backward diagonal line pattern for highlighting.
     * * Grid: Applies a grid pattern for highlighting.
     * * Turquoise: Applies a turquoise pattern for highlighting.
     * * Star: Applies a star pattern for highlighting.
     * * Triangle: Applies a triangle pattern for highlighting.
     * * Circle: Applies a circle pattern for highlighting.
     * * Tile: Applies a tile pattern for highlighting.
     * * HorizontalDash: Applies a horizontal dash pattern for highlighting.
     * * VerticalDash: Applies a vertical dash pattern for highlighting.
     * * Rectangle: Applies a rectangle pattern for highlighting.
     * * Box: Applies a box pattern for highlighting.
     * * VerticalStripe: Applies a vertical stripe pattern for highlighting.
     * * HorizontalStripe: Applies a horizontal stripe pattern for highlighting.
     * * Bubble: Applies a bubble pattern for highlighting.
     *
     * @default None
     */
    highlightPattern: SelectionPattern;
    /**
     * Specifies whether to display or remove the untrusted HTML values in the Accumulation Chart component.
     * If 'enableHtmlSanitizer' set to true, the component will sanitize any suspected untrusted strings and scripts before rendering them.
     *
     * @default false
     */
    enableHtmlSanitizer: boolean;
    /**
     * If set to true, enables the border in pie and accumulation charts when the mouse moves over a data point.
     *
     * @default true
     */
    enableBorderOnMouseMove: boolean;
    /**
     * When set to true, allows for the selection of multiple data points.
     > Note that `selectionMode` must be set to `Point` for multi-selection to be enabled.
     *
     * @default false
     */
    isMultiSelect: boolean;
    /**
     * If set to true, enables animation for the accumulation chart.
     *
     * @default true
     */
    enableAnimation: boolean;
    /**
     * Specifies the point indexes to be selected when the accumulation chart is initially loaded.
     > Note that `selectionMode` must be set to `Point` for this feature to work.
     * ```html
     * <div id='Pie'></div>
     * ```
     * ```typescript
     * let pie: AccumulationChart = new AccumulationChart({
     * ...
     *   selectionMode: 'Point',
     *   selectedDataIndexes: [ { series: 0, point: 1},
     *                          { series: 2, point: 3} ],
     * ...
     * });
     * pie.appendTo('#Pie');
     * ```
     *
     * @default []
     */
    selectedDataIndexes: IndexesModel[];
    /**
     * Options to customize the margins around the accumulation chart, including the left, right, top, and bottom margins.
     * These margins define the space between the outer edge of the accumulation chart and its chart area.
     */
    margin: MarginModel;
    /**
     * If set to true, labels for the points will be placed smartly to avoid overlapping.
     *
     * @default true
     */
    enableSmartLabels: boolean;
    /**
     * Options for customizing the appearance of the border in the chart by using the `color` and `width` properties in the `border`.
     */
    border: BorderModel;
    /**
     * The background color of the chart, which accepts values in hex or rgba formats as valid CSS color strings.
     *
     * @default null
     */
    background: string;
    /**
     * The configuration for series in the accumulation chart.
     */
    series: AccumulationSeriesModel[];
    /**
     * Annotations are used to highlight specific data points or areas in the chart, providing additional context and information.
     */
    annotations: AccumulationAnnotationSettingsModel[];
    /**
     * The theme applied to the accumulation chart for visual styling.
     * Choose from predefined themes to change the overall look and feel of the accumulation chart.
     * The available themes are:
     * * Fabric
     * * FabricDark
     * * Bootstrap4
     * * Bootstrap
     * * BootstrapDark
     * * HighContrastLight
     * * HighContrast
     * * Tailwind
     * * TailwindDark
     * * Bootstrap5
     * * Bootstrap5Dark
     * * Fluent
     * * FluentDark
     * * Fluent2
     * * Fluent2Dark
     * * Fluent2HighContrast
     * * Material3
     * * Material3Dark
     * * Material
     * * MaterialDark
     *
     * @default 'Material'
     */
    theme: AccumulationTheme;
    /**
     * When set to true, a grouping separator will be used for numbers to separate groups of thousands in the accumulation chart.
     *
     * @default false
     */
    useGroupingSeparator: boolean;
    /**
     * When set to true, it enables exporting the accumulation chart to various formats such as `JPEG`, `PNG`, `SVG`, `PDF`, `XLSX`, or `CSV`.
     *
     * @default true
     */
    enableExport: boolean;
    /**
     * To enable export feature in blazor chart.
     *
     * @default false
     */
    allowExport: boolean;
    /**
     * Options to improve accessibility for accumulation chart elements.
     */
    accessibility: AccessibilityModel;
    /**
     * Customize the focus border color.
     * If not specified, the element will use the default focus border color.
     *
     * @default null
     */
    focusBorderColor: string;
    /**
     * Customize the focus border width.
     * If not specified, the element will use the default focus border width.
     *
     * @default 1.5
     */
    focusBorderWidth: number;
    /**
     * Customize the focus border margin.
     * If not specified, the element will use the default focus border margin.
     *
     * @default 0
     */
    focusBorderMargin: number;
    /**
     * Triggers after the accumulation chart has been loaded.
     *
     * @event loaded
     * @blazorProperty 'Loaded'
     */
    loaded: EmitType<IAccLoadedEventArgs>;
    /**
     * Triggers after the legend is clicked.
     *
     * @event legendClick
     */
    legendClick: EmitType<IAccLegendClickEventArgs>;
    /**
     * Triggers before the accumulation chart loads. This event allows for customization and configuration before the accumulation chart is rendered.
     *
     * @event load
     */
    load: EmitType<IAccLoadedEventArgs>;
    /**
     * Triggers before the series gets rendered. This event allows for the customization of series properties before they are rendered on the accumulation chart.
     *
     * @event seriesRender
     * @deprecated
     */
    seriesRender: EmitType<IAccSeriesRenderEventArgs>;
    /**
     * Triggers before the legend gets rendered. This allows the customization of legend before rendering on the accumulation chart.
     *
     * @event legendRender
     * @deprecated
     */
    legendRender: EmitType<ILegendRenderEventArgs>;
    /**
     * Triggers before the data label for the series gets rendered. This allows customization of data labels before they are rendered on the accumulation chart.
     *
     * @event textRender
     * @deprecated
     */
    textRender: EmitType<IAccTextRenderEventArgs>;
    /**
     * Triggers before the tooltip for the series gets rendered. This event allows customization of the tooltip properties such as text, style, and template before it is rendered on the accumulation chart.
     *
     * @event tooltipRender
     */
    tooltipRender: EmitType<ITooltipRenderEventArgs>;
    /**
     * Triggers before each point in the series gets rendered. This allows for the customization of each data point before it is rendered on the accumulation chart.
     *
     * @event pointRender
     * @deprecated
     */
    pointRender: EmitType<IAccPointRenderEventArgs>;
    /**
     * Triggers before the annotation gets rendered. This event allows for modifications of the annotation content and its location before it is rendered on the accumulation chart.
     *
     * @event annotationRender
     * @deprecated
     */
    annotationRender: EmitType<IAnnotationRenderEventArgs>;
    /**
     * Triggers before the print process starts. This event allows for the modification of the accumulation chart's HTML content before it is sent to the printer.
     *
     * @event beforePrint
     * @blazorProperty 'OnPrint'
     */
    beforePrint: EmitType<IPrintEventArgs>;
    /**
     * Triggers when hovering over the accumulation chart.
     *
     * @event chartMouseMove
     * @blazorProperty 'OnChartMouseMove'
     */
    chartMouseMove: EmitType<IMouseEventArgs>;
    /**
     * Triggers when clicking on the accumulation chart.
     *
     * @event chartMouseClick
     * @blazorProperty 'OnChartMouseClick'
     */
    chartMouseClick: EmitType<IMouseEventArgs>;
    /**
     * Triggers when double-clicking the accumulation chart.
     *
     * @event chartDoubleClick
     * @blazorProperty 'OnChartDoubleClick'
     */
    chartDoubleClick: EmitType<IMouseEventArgs>;
    /**
     * Triggers when a point in the accumulation chart is clicked.
     *
     * @event pointClick
     * @blazorProperty 'OnPointClick'
     */
    pointClick: EmitType<IPointEventArgs>;
    /**
     * Triggers when a point in the accumulation chart is moved.
     *
     * @event pointMove
     * @blazorProperty 'PointMoved'
     */
    pointMove: EmitType<IPointEventArgs>;
    /**
     * Triggers after the animation for the series is completed.
     *
     * @event animationComplete
     * @blazorProperty 'OnAnimationComplete'
     */
    animationComplete: EmitType<IAccAnimationCompleteEventArgs>;
    /**
     * Triggers on the mouse down event within the accumulation chart.
     *
     * @event chartMouseDown
     * @blazorProperty 'OnChartMouseDown'
     */
    chartMouseDown: EmitType<IMouseEventArgs>;
    /**
     * Triggers when the cursor leaves the accumulation chart.
     *
     * @event chartMouseLeave
     * @blazorProperty 'OnChartMouseLeave'
     */
    chartMouseLeave: EmitType<IMouseEventArgs>;
    /**
     * Triggers on the mouse up event within the accumulation chart.
     *
     * @event chartMouseUp
     * @blazorProperty 'OnChartMouseUp'
     */
    chartMouseUp: EmitType<IMouseEventArgs>;
    /**
     * Triggers before the window resize event occurs. This event allows for modifications to the accumulation chart size before resizing.
     *
     * @event beforeResize
     * @blazorProperty 'BeforeResize'
     */
    beforeResize: EmitType<IAccBeforeResizeEventArgs>;
    /**
     * Triggers after the window resize event completes.
     *
     * @event resized
     * @blazorProperty 'Resized'
     */
    resized: EmitType<IAccResizeEventArgs>;
    /**
     * Triggers before the export process begins. This event allows for the customization of export settings before the chart is exported.
     *
     * @event beforeExport
     */
    beforeExport: EmitType<IExportEventArgs>;
    /**
     * Triggers after the export is completed.
     *
     * @event afterExport
     * @blazorProperty 'AfterExport'
     */
    afterExport: EmitType<IAfterExportEventArgs>;
    /**
     * Triggers after the selection is completed.
     *
     * @event selectionComplete
     */
    selectionComplete: EmitType<IAccSelectionCompleteEventArgs>;
    /**
     * Defines the currency code format for the accumulation chart.
     *
     * @private
     * @aspType string
     */
    private currencyCode;
    /**
     * Animate the series bounds on data change.
     *
     * @private
     * @param {number} duration - The duration of the animation.
     * @returns {void}
     */
    animate(duration?: number): void;
    /** @private */
    svgObject: Element;
    /** @private */
    private animateselected;
    /** @public */
    duration: number;
    /** @private */
    initialClipRect: Rect;
    /** @private */
    availableSize: Size;
    /** @private */
    renderer: SvgRenderer | CanvasRenderer;
    /** @private */
    intl: Internationalization;
    /** @private */
    visibleSeries: AccumulationSeries[];
    /** @private */
    seriesCounts: number;
    /** @private */
    explodeDistance: number;
    /** @private */
    mouseX: number;
    /** @private */
    mouseY: number;
    private resizeTo;
    /** @private */
    origin: ChartLocation;
    /** @private */
    currentLegendIndex: number;
    /** @private */
    currentPointIndex: number;
    /** @private */
    previousTargetId: string;
    /** @private */
    isLegendClicked: boolean;
    /**
     * Gets the type of accumulation chart.
     *
     * @returns {AccumulationType} - The type of accumulation chart.
     * @private
     * */
    readonly type: AccumulationType;
    /** @private */
    isTouch: boolean;
    /** @private */
    redraw: boolean;
    /** @private */
    animateSeries: boolean;
    /**
     * Defines the format of center label
     *
     * @private
     */
    private format;
    /** @private */
    titleCollection: string[];
    /** @private */
    subTitleCollection: string[];
    /** @private */
    themeStyle: IThemeStyle;
    private chartid;
    /** @private */
    isBlazor: boolean;
    /** @private */
    accumulationResizeBound: EventListenerOrEventListenerObject;
    /**
     * Constructor for creating the AccumulationChart widget.
     *
     * @private
     * @param {AccumulationChartModel} options - Specifies the accumulation chart model.
     * @param {string | HTMLElement} element - Specifies the element for the accumulation chart.
     */
    constructor(options?: AccumulationChartModel, element?: string | HTMLElement);
    /**
     * To create svg object, renderer and binding events for the container.
     *
     * @returns {void}
     */
    protected preRender(): void;
    /**
     * Themeing for chart goes here.
     *
     * @returns {void}
     */
    private setTheme;
    /**
     * To render the accumulation chart elements.
     *
     * @returns {void}
     */
    protected render(): void;
    /**
     * Method to unbind events for accumulation chart.
     *
     * @returns {void}
     */
    private unWireEvents;
    /**
     * Method to bind events for the accumulation chart.
     *
     * @returns {void}
     */
    private wireEvents;
    /**
     * Method to set mouse x, y from events.
     *
     * @param {PointerEvent} e - The pointer event containing mouse coordinates.
     * @returns {void}
     */
    private setMouseXY;
    /**
     * Handles the mouse end.
     *
     * @param {PointerEvent} e - The pointer event containing mouse coordinates.
     * @returns {boolean} - Mouse end of accumulation chart.
     * @private
     */
    accumulationMouseEnd(e: PointerEvent): boolean;
    /**
     * Handles the mouse start.
     *
     * @param {PointerEvent} e - The pointer event containing mouse coordinates.
     * @returns {boolean} - Mouse start of accumulation chart.
     * @private
     */
    accumulationMouseStart(e: PointerEvent): boolean;
    /**
     * Handles the accumulation chart resize.
     *
     * @returns {boolean} - Resize method of accumulation chart.
     * @private
     */
    accumulationResize(): boolean;
    /**
     * Handles the print method for accumulation chart control.
     *
     * @param {string[] | string | Element} id - The id of the accumulation chart to be printed on the page.
     * @returns {void}
     */
    print(id?: string[] | string | Element): void;
    /**
     * Export method for the chart.
     *
     * @param {ExportType} type - The type of export.
     * @param {string} fileName - The name of the file for export.
     * @returns {void}
     */
    export(type: ExportType, fileName: string): void;
    /**
     * Applying styles for accumulation chart element.
     *
     * @param {HTMLElement} element - Specifies the element.
     * @returns {void}
     */
    private setStyle;
    /**
     * Method to set the annotation content dynamically for accumulation.
     *
     * @param {number} annotationIndex - The index of the annotation.
     * @param {string} content - The content to set for the annotation.
     * @returns {void}
     */
    setAnnotationValue(annotationIndex: number, content: string): void;
    /**
     * Handles the mouse move on accumulation chart.
     *
     * @param {PointerEvent} e - The pointer event containing mouse coordinates.
     * @returns {boolean} - Mouse move of accumulation chart.
     * @private
     */
    accumulationMouseMove(e: PointerEvent): boolean;
    titleTooltip(event: Event, x: number, y: number, isTouch?: boolean): void;
    /**
     * Handles the keyboard onkeydown on chart.
     *
     * @param {KeyboardEvent} e - The keyboard event.
     * @returns {boolean} - false
     * @private
     */
    accumulationChartKeyDown(e: KeyboardEvent): boolean;
    /**
     * Handles the keyboard onkeydown on chart.
     *
     * @param {KeyboardEvent} e - The keyboard event.
     * @returns {boolean} - false
     * @private
     */
    accumulationChartKeyUp(e: KeyboardEvent): boolean;
    private setTabIndex;
    private getActualIndex;
    private focusTarget;
    /**
     * Handles the document onkey.
     *
     * @param {KeyboardEvent} e - The keyboard event.
     * @returns {void}
     * @private
     */
    private documentKeyHandler;
    /**
     * Handles to set style for key event on the document.
     *
     * @param {target} target - element which currently focused.
     * @returns {void}
     * @private
     */
    private setNavigationStyle;
    /**
     * Handles to remove style for key event on the document.
     *
     * @returns {void}
     * @private
     */
    private removeNavigationStyle;
    private chartKeyboardNavigations;
    private focusChild;
    /**
     * Handles the mouse double click on accumulation chart.
     *
     * @param {PointerEvent} e - The pointer event.
     * @returns {boolean} - Mouse double click of accumulation chart.
     * @private
     */
    accumulationOnDoubleClick(e: PointerEvent): boolean;
    /**
     * Handles the mouse click on accumulation chart.
     *
     * @param {PointerEvent} e - The pointer event.
     * @returns {boolean} - Mouse click of accumulation chart.
     * @private
     */
    accumulationOnMouseClick(e: PointerEvent): boolean;
    private triggerPointEvent;
    /**
     * Handles the mouse right click on accumulation chart.
     *
     * @param {MouseEvent | PointerEvent} event - The mouse event or pointer event.
     * @returns {boolean} - Right click of accumulation chart.
     * @private
     */
    accumulationRightClick(event: MouseEvent | PointerEvent): boolean;
    /**
     * Handles the mouse leave on accumulation chart.
     *
     * @param {PointerEvent} e - The pointer event.
     * @returns {boolean} - Mouse leave of accumulation chart.
     * @private
     */
    accumulationMouseLeave(e: PointerEvent): boolean;
    /**
     * Method to set culture for chart.
     *
     * @returns {void}
     */
    private setCulture;
    /**
     * Method to create SVG element for accumulation chart.
     *
     * @returns {void}
     */
    private createPieSvg;
    /**
     * To Remove the SVG from accumulation chart.
     *
     * @returns {boolean} - Remove svg.
     * @private
     */
    removeSvg(): void;
    /**
     * Method to create the secondary element for tooltip, datalabel and annotaitons.
     *
     * @returns {void}
     */
    private createSecondaryElement;
    /**
     * Method to find visible series based on series types.
     *
     * @returns {void}
     */
    private calculateVisibleSeries;
    /**
     * To find points from dataSource.
     *
     * @param {boolean} render - Indicates whether to render the points (default: true).
     * @returns {void}
     */
    private processData;
    /**
     * To refresh the accumulation chart.
     *
     * @private
     * @returns {void}
     */
    refreshChart(): void;
    /**
     * Method to find groupped points.
     *
     * @returns {void}
     */
    private doGrouppingProcess;
    /**
     * Method to calculate bounds for accumulation chart.
     *
     * @returns {void}
     */
    calculateBounds(): void;
    /**
     * Method to calculate legend bounds for accumulation chart.
     *
     * @returns {void}
     */
    private calculateLegendBounds;
    /**
     * To render elements for accumulation chart.
     *
     * @private
     * @returns {void}
     */
    renderElements(): void;
    /**
     * To set the left and top position for data label template for center aligned chart.
     *
     * @private
     * @returns {void}
     */
    setSecondaryElementPosition(): void;
    /**
     * To render the annotaitions for accumulation series.
     *
     * @private
     * @returns {void}
     */
    renderAnnotation(): void;
    /**
     * Method to process the explode in accumulation chart.
     *
     * @private
     * @returns {void}
     */
    processExplode(): void;
    /**
     * Method to render series for accumulation chart.
     *
     * @returns {void}
     */
    private renderSeries;
    /**
     * Method to render border for accumulation chart.
     *
     * @returns {void}
     */
    private renderBorder;
    /**
     * Method to render legend for accumulation chart.
     *
     * @returns {void}
     */
    private renderLegend;
    /**
     * To process the selection in accumulation chart.
     *
     * @private
     * @returns {void}
     */
    processSelection(): void;
    /**
     * To render title for accumulation chart.
     *
     * @returns {void}
     */
    private renderTitle;
    /**
     * To update center label on mouse move.
     *
     * @param {Event} event - The mouse move event.
     * @returns {void}
     */
    private updateCenterLabel;
    /**
     * Function to get pie data on mouse move.
     *
     * @param {PointerEvent | TouchEvent} e - The event object containing mouse or touch coordinates.
     * @returns {AccPointData} - The data of the pie.
     */
    private getPieData;
    /**
     * Function to get format of pie data on mouse move.
     *
     * @param {AccPoints} point - The point data.
     * @param {AccumulationSeries} series - The series to which the point belongs.
     * @param {string} format - The format string for the data.
     * @returns {string} - The formatted data.
     */
    private parseFormat;
    /**
     * To render center label for accumulation chart.
     *
     * @param {boolean} isanimate - Specifies whether to animate the rendering.
     * @param {boolean} pointAnimation - Specifies whether point animation is enabled.
     * @private
     * @returns {void}
     */
    renderCenterLabel(isanimate?: boolean, pointAnimation?: boolean): void;
    /**
     * Animates the x and y attributes of a tspan element.
     *
     * @param {HTMLElement} element - The tspan element to animate.
     * @param {number} startx - The initial x coordinate of the tspan.
     * @param {number} starty - The initial y coordinate of the tspan.
     * @param {number} endx - The final x coordinate of the tspan.
     * @param {number} endy - The final y coordinate of the tspan.
     * @param {number} duration - The duration of the animation in milliseconds.
     *
     * @private
     * @returns {void}
     */
    private animateTspan;
    /**
     * Function to delay Center label at initial stage of accumulation chart.
     *
     * @param {Element} element - The element to delay.
     * @returns {void}
     */
    private centerLabelDelay;
    private renderSubTitle;
    /**
     * To get the series parent element.
     *
     * @private
     * @returns {Element} - The parent element of the series.
     */
    getSeriesElement(): Element;
    /**
     * To refresh the all visible series points.
     *
     * @private
     * @returns {void}
     */
    refreshSeries(): void;
    /**
     * To refresh points label region and visible.
     *
     * @private
     * @param {AccPoints[]} points - The array of points to refresh.
     * @returns {void}
     */
    refreshPoints(points: AccPoints[]): void;
    /**
     * To get Module name.
     *
     * @private
     * @returns {string} - Returns the module name.
     */
    getModuleName(): string;
    /**
     * To destroy the accumulation charts.
     *
     * @private
     * @returns {void}
     */
    destroy(): void;
    /**
     * To provide the array of modules needed for control rendering.
     *
     * @returns {ModuleDeclaration[]} - required modules.
     * @private
     */
    requiredModules(): ModuleDeclaration[];
    /**
     * To find datalabel visibility in series.
     *
     * @returns {boolean} - false
     */
    private findDatalabelVisibility;
    /**
     * Get visible series for accumulation chart by index.
     *
     * @param {AccumulationSeries[]} visibleSeries - The array of visible series in the accumulation chart.
     * @param {number} index - The index of the series to retrieve.
     * @returns {AccumulationSeries} - The visible series at the specified index.
     */
    private changeVisibleSeries;
    /**
     * Get the properties to be maintained in the persisted state.
     *
     * @private
     * @returns {string} - The persisted data containing the properties.
     */
    getPersistData(): string;
    /**
     * Method to sanitize any potentially untrusted strings and scripts before rendering them.
     *
     * @param {string} value - Specifies the html value to sanitize
     * @returns {string} Returns the sanitized html string
     * @private
     */
    sanitize(value: string): string;
    /**
     * Called internally if any of the property value changed.
     *
     * @private
     * @param {AccumulationChartModel} newProp - The new AccumulationChartModel.
     * @param {AccumulationChartModel} oldProp - The old AccumulationChartModel.
     * @returns {void}
     */
    onPropertyChanged(newProp: AccumulationChartModel, oldProp: AccumulationChartModel): void;
}
