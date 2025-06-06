import { Component, Internationalization, INotifyPropertyChanged, ModuleDeclaration, TapEventArgs } from '@syncfusion/ej2-base';
import { L10n } from '@syncfusion/ej2-base';
import { EmitType } from '@syncfusion/ej2-base';
import { Chart3DModel } from './chart3D-model';
import { Rect, Size, SvgRenderer } from '@syncfusion/ej2-svg-base';
import { Chart3DLoadedEventArgs, Chart3DThemeStyle, Chart3DBeforeResizeEventArgs, Chart3DLegendClickEventArgs, Chart3DLegendRenderEventArgs, Chart3DPointRenderEventArgs, Chart3DResizeEventArgs, Chart3DTooltipRenderEventArgs } from './model/chart3d-Interface';
import { Chart3DSeriesRenderEventArgs, Chart3DAxisLabelRenderEventArgs, Chart3DExportEventArgs, Chart3DMouseEventArgs, Chart3DPointEventArgs, Chart3DPrintEventArgs, Chart3DSelectionCompleteEventArgs, Chart3DTextRenderEventArgs, Chart3DPolygon } from './model/chart3d-Interface';
import { CartesianAxisLayoutPanel } from './axis/cartesian-panel';
import { BorderModel, IndexesModel, MarginModel } from '../common/model/base-model';
import { HighlightMode, SelectionPattern, ExportType, ChartTheme } from '../common/utils/enum';
import { Vector3D, Matrix3D, Graphics3D, BinaryTreeBuilder, Polygon3D, ChartTransform3D, Svg3DRenderer, Chart3DRender } from './utils/chart3dRender';
import { AxisRenderer, WallRenderer } from './utils/renderer';
import { Chart3DAxisModel, Chart3DColumnModel, Chart3DRowModel } from './axis/axis-model';
import { Chart3DAxis } from './axis/axis';
import { DataManager } from '@syncfusion/ej2-data';
import { Chart3DSeries } from './series/chart-series';
import { DataLabel3D } from './series/data-label';
import { Tooltip3D } from './user-interaction/tooltip';
import { Legend3D } from './legend/legend';
import { Highlight3D } from './user-interaction/high-light';
import { Selection3D } from './user-interaction/selection';
import { Export3D } from './print-export/export';
import { Chart3DSeriesModel } from './series/chart-series-model';
import { IAfterExportEventArgs } from '../common/model/interface';
import { Chart3DSelectionMode } from './utils/enum';
import { Chart3DTooltipSettingsModel } from './user-interaction/tooltip-model';
import { Chart3DLegendSettingsModel } from './legend/legend-model';
import { TitleSettingsModel } from './model/chart3d-Interface-model';
/**
 * The Chart3D class represents a 3D chart component that extends the Component class
 * and implements the INotifyPropertyChanged interface.
 *
 * @public
 * @class
 * @extends Component<HTMLElement>
 * @implements {INotifyPropertyChanged} INotifyPropertyChanged
 */
export declare class Chart3D extends Component<HTMLElement> implements INotifyPropertyChanged {
    /**
     * Title of the chart
     *
     * @default ''
     */
    title: string;
    /**
     * SubTitle of the chart.
     *
     * @default ''
     */
    subTitle: string;
    /**
     * Specifies the theme for the chart.
     *
     * @default 'Bootstrap5'
     */
    theme: ChartTheme;
    /**
     * Description for chart.
     *
     * @default null
     */
    description: string;
    /**
     * The width of the chart as a string accepts input as both like '100px' or '100%'.
     * If specified as '100%, chart renders to the full width of its parent element.
     *
     * @default null
     */
    width: string;
    /**
     * The background image of the chart that accepts value in string as url link or location of an image.
     *
     * @default null
     */
    backgroundImage: string;
    /**
     * The background color of the chart that accepts value in hex and rgba as a valid CSS color string.
     *
     * @default null
     */
    background: string;
    /**
     * Specifies the DataSource for the chart. It can be an array of JSON objects or an instance of DataManager.
     * ```html
     * <div id='Chart'></div>
     * ```
     * ```typescript
     * let dataManager: DataManager = new DataManager({
     *         url: 'http://mvc.syncfusion.com/Services/Northwnd.svc/Tasks/'
     * });
     * let query: Query = new Query().take(50).where('Estimate', 'greaterThan', 0, false);
     * let chart3D: Chart3D = new Chart3D({
     * ...
     *  dataSource:dataManager,
     *   series: [{
     *        xName: 'Id',
     *        yName: 'Estimate',
     *        query: query
     *    }],
     * ...
     * });
     * chart3D.appendTo('#Chart');
     * ```
     *
     * @default ''
     */
    dataSource: Object | DataManager;
    /**
     * The height of the chart as a string accepts input both as '100px' or '100%'.
     * If specified as '100%, chart renders to the full height of its parent element.
     *
     * @default null
     */
    height: string;
    /**
     * Depth of the 3D Chart from front view of the series to the background wall.
     *
     * @default 50
     */
    depth: number;
    /**
     * Defines the width of the 3D chart wall.
     *
     * @default 2
     */
    wallSize: number;
    /**
     * Defines the slope angle for the 3D chart.
     *
     * @default 0
     */
    tilt: number;
    /**
     * If set true, enables the rotation in the 3D chart.
     *
     * @default false
     */
    enableRotation: boolean;
    /**
     * Defines the rotating angle for the 3D chart.
     *
     * @default 0
     */
    rotation: number;
    /**
     * To enable the side by side placing the points for column type series.
     *
     * @default true
     */
    enableSideBySidePlacement: boolean;
    /**
     * Defines the perspective angle for the 3D chart.
     *
     * @default 90
     */
    perspectiveAngle: number;
    /**
     * Represents the color of the 3D wall.
     *
     * @default null
     */
    wallColor: string;
    /**
     * It specifies whether the chart should be render in transposed manner or not.
     *
     * @default false
     */
    isTransposed: boolean;
    /**
     * Defines the currencyCode format of the chart
     *
     * @private
     * @aspType string
     */
    private currencyCode;
    /**
     * Enables or disables the export feature in the 3D chart.
     *
     * @default false
     */
    enableExport: boolean;
    /**
     * Triggered before the chart is loaded.
     *
     * @event load
     */
    load: EmitType<Chart3DLoadedEventArgs>;
    /**
     * Triggered after the chart is loaded.
     *
     * @event loaded
     */
    loaded: EmitType<Chart3DLoadedEventArgs>;
    /**
     * Triggered when the user clicks on data points.
     *
     * @event pointClick
     *
     */
    pointClick: EmitType<Chart3DPointEventArgs>;
    /**
     * Triggered when the user hovers over data points.
     *
     * @event pointMove
     *
     */
    pointMove: EmitType<Chart3DPointEventArgs>;
    /**
     * Triggered when the data point is ready to render on the screen.
     *
     * @event pointRender
     * @deprecated
     */
    pointRender: EmitType<Chart3DPointRenderEventArgs>;
    /**
     * Triggered when the legend is ready to render on the screen.
     *
     * @event legendRender
     * @deprecated
     *
     */
    legendRender: EmitType<Chart3DLegendRenderEventArgs>;
    /**
     * Triggered when the user clicks on the legend.
     *
     * @event legendClick
     */
    legendClick: EmitType<Chart3DLegendClickEventArgs>;
    /**
     * Triggered when the series is ready to render on the screen.
     *
     * @event seriesRender
     * @deprecated
     */
    seriesRender: EmitType<Chart3DSeriesRenderEventArgs>;
    /**
     * Triggered when the data label is ready to render on the screen.
     *
     * @event textRender
     * @deprecated
     */
    textRender: EmitType<Chart3DTextRenderEventArgs>;
    /**
     * Triggered when the tooltip is ready to render on the screen.
     *
     * @event tooltipRender
     */
    tooltipRender: EmitType<Chart3DTooltipRenderEventArgs>;
    /**
     * Triggers before resizing of chart
     *
     * @event beforeResize
     *
     */
    beforeResize: EmitType<Chart3DBeforeResizeEventArgs>;
    /**
     * Triggers after resizing of chart.
     *
     * @event resized
     *
     */
    resized: EmitType<Chart3DResizeEventArgs>;
    /**
     * Triggered when the user hovers over a 3D chart.
     *
     * @event chart3DMouseMove
     *
     */
    chart3DMouseMove: EmitType<Chart3DMouseEventArgs>;
    /**
     * Triggered when the user clicks on a 3D chart.
     *
     * @event chart3DMouseClick
     *
     */
    chart3DMouseClick: EmitType<Chart3DMouseEventArgs>;
    /**
     * Triggered when the mouse is pressed down on a 3D chart.
     *
     * @event chart3DMouseDown
     *
     */
    chart3DMouseDown: EmitType<Chart3DMouseEventArgs>;
    /**
     * Triggered when the cursor leaves a 3D chart.
     *
     * @event chart3DMouseLeave
     *
     */
    chart3DMouseLeave: EmitType<Chart3DMouseEventArgs>;
    /**
     * Triggered when the mouse button is released on a 3D chart.
     *
     * @event chart3DMouseUp
     *
     */
    chart3DMouseUp: EmitType<Chart3DMouseEventArgs>;
    /**
     * Triggers before each axis label is rendered.
     *
     * @event axisLabelRender
     * @deprecated
     */
    axisLabelRender: EmitType<Chart3DAxisLabelRenderEventArgs>;
    /**
     * Triggers after the selection is completed.
     *
     * @event selectionComplete
     */
    selectionComplete: EmitType<Chart3DSelectionCompleteEventArgs>;
    /**
     * Triggers before the export gets started.
     *
     * @event beforeExport
     */
    beforeExport: EmitType<Chart3DExportEventArgs>;
    /**
     * Triggers after the export completed.
     *
     * @event afterExport
     */
    afterExport: EmitType<IAfterExportEventArgs>;
    /**
     * Triggers before the prints gets started.
     *
     * @event beforePrint
     */
    beforePrint: EmitType<Chart3DPrintEventArgs>;
    /**
     *  Options to customize left, right, top and bottom margins of the chart.
     */
    margin: MarginModel;
    /**
     * Options for customizing the title of the Chart.
     */
    titleStyle: TitleSettingsModel;
    /**
     * Options for customizing the Subtitle of the Chart.
     */
    subTitleStyle: TitleSettingsModel;
    /**
     * The chart legend configuration options.
     */
    legendSettings: Chart3DLegendSettingsModel;
    /**
     * Options for customizing the color and width of the chart border.
     */
    border: BorderModel;
    /**
     * Options to configure the horizontal axis.
     */
    primaryXAxis: Chart3DAxisModel;
    /**
     * Options to configure the vertical axis.
     */
    primaryYAxis: Chart3DAxisModel;
    /**
     * The chart tooltip configuration options.
     */
    tooltip: Chart3DTooltipSettingsModel;
    /**
     * Options to split Chart into multiple plotting areas horizontally.
     * Each object in the collection represents a plotting area in the Chart.
     */
    rows: Chart3DRowModel[];
    /**
     * Options to split chart into multiple plotting areas vertically.
     * Each object in the collection represents a plotting area in the chart.
     */
    columns: Chart3DColumnModel[];
    /**
     * Secondary axis collection for the chart.
     */
    axes: Chart3DAxisModel[];
    /**
     * The configuration for series in the chart.
     */
    series: Chart3DSeriesModel[];
    /**
     * Defines the color for the highlighted data point.
     *
     * @default ''
     */
    highlightColor: string;
    /**
     * Specifies whether a series or data point should be highlighted. The options are:
     * * none: Disables the selection.
     * * series: selects a series.
     * * point: selects a point.
     * * cluster: selects a cluster of point
     *
     * @default None
     */
    selectionMode: Chart3DSelectionMode;
    /**
     * Specifies whether a series or data point should be highlighted. The options are:
     * * none: Disables the highlight.
     * * series: highlight a series.
     * * point: highlight a point.
     * * cluster: highlight a cluster of point
     *
     * @default None
     */
    highlightMode: HighlightMode;
    /**
     * Specifies whether series or data point has to be selected. They are,
     * * none: sets none as selecting pattern.
     * * chessboard: sets chess board as selecting pattern.
     * * dots: sets dots as  selecting pattern.
     * * diagonalForward: sets diagonal forward as selecting pattern.
     * * crosshatch: sets crosshatch as selecting pattern.
     * * pacman: sets pacman selecting pattern.
     * * diagonalbackward: sets diagonal backward as selecting pattern.
     * * grid: sets grid as selecting pattern.
     * * turquoise: sets turquoise as selecting pattern.
     * * star: sets star as selecting pattern.
     * * triangle: sets triangle as selecting pattern.
     * * circle: sets circle as selecting pattern.
     * * tile: sets tile as selecting pattern.
     * * horizontaldash: sets horizontal dash as selecting pattern.
     * * verticaldash: sets vertical dash as selecting pattern.
     * * rectangle: sets rectangle as selecting pattern.
     * * box: sets box as selecting pattern.
     * * verticalstripe: sets vertical stripe as  selecting pattern.
     * * horizontalstripe: sets horizontal stripe as selecting pattern.
     * * bubble: sets bubble as selecting pattern.
     *
     * @default None
     */
    selectionPattern: SelectionPattern;
    /**
     * Specifies whether series or data point has to be selected. They are,
     * * none: sets none as highlighting pattern.
     * * chessboard: sets chess board as highlighting pattern.
     * * dots: sets dots as highlighting pattern.
     * * diagonalForward: sets diagonal forward as highlighting pattern.
     * * crosshatch: sets crosshatch as highlighting pattern.
     * * pacman: sets pacman highlighting  pattern.
     * * diagonalbackward: sets diagonal backward as highlighting pattern.
     * * grid: sets grid as highlighting pattern.
     * * turquoise: sets turquoise as highlighting pattern.
     * * star: sets star as highlighting  pattern.
     * * triangle: sets triangle as highlighting pattern.
     * * circle: sets circle as highlighting  pattern.
     * * tile: sets tile as highlighting pattern.
     * * horizontaldash: sets horizontal dash as highlighting pattern.
     * * verticaldash: sets vertical dash as highlighting pattern.
     * * rectangle: sets rectangle as highlighting  pattern.
     * * box: sets box as highlighting pattern.
     * * verticalstripe: sets vertical stripe as highlighting  pattern.
     * * horizontalstripe: sets horizontal stripe as highlighting  pattern.
     * * bubble: sets bubble as highlighting  pattern.
     *
     * @default None
     */
    highlightPattern: SelectionPattern;
    /**
     * If set true, enables the multi selection in chart. It requires `selectionMode` to be `Point` | `Series` | or `Cluster`.
     *
     * @default false
     */
    isMultiSelect: boolean;
    /**
     * Specifies the point indexes to be selected while loading a chart.
     * It requires `selectionMode` or `highlightMode` to be `Point` | `Series` | or `Cluster`.
     * ```html
     * <div id='Chart'></div>
     * ```
     * ```typescript
     * let chart3D: Chart3D = new Chart3D({
     * ...
     *   selectionMode: 'Point',
     *   selectedDataIndexes: [ { series: 0, point: 1},
     *                          { series: 2, point: 3} ],
     * ...
     * });
     * chart3D.appendTo('#Chart');
     * ```
     *
     * @default []
     */
    selectedDataIndexes: IndexesModel[];
    /**
     * Specifies whether a grouping separator should be used for a number.
     *
     * @default false
     */
    useGroupingSeparator: boolean;
    /**
     * Palette for the chart series.
     *
     * @default []
     */
    palettes: string[];
    /**
     *
     * Localization object.
     *
     * @private
     */
    localeObject: L10n;
    /**
     * Default values of localization values.
     */
    private defaultLocalConstants;
    /**
     * Gets the current visible series of the Chart.
     *
     * @hidden
     */
    visibleSeries: Chart3DSeries[];
    /**
     * Gets the current visible axis of the Chart.
     *
     * @hidden
     */
    axisCollections: Chart3DAxis[];
    /**
     * The `dataLabel3DModule` is used to manipulate and add data label to the series.
     */
    dataLabel3DModule: DataLabel3D;
    /**
     * The `tooltip3DModule` is used to manipulate and add tooltip to the series.
     */
    tooltip3DModule: Tooltip3D;
    /**
     * The `selection3DModule` is used to manipulate and add selection to the chart.
     */
    selection3DModule: Selection3D;
    /**
     * The `highlight3DModule` is used to manipulate and add highlight to the chart.
     */
    highlight3DModule: Highlight3D;
    /**
     * The Export Module is used to export chart.
     */
    export3DModule: Export3D;
    /**
     * The `legend3DModule` is used to manipulate and add legend to the chart.
     *
     * @private
     */
    legend3DModule: Legend3D;
    private previousTargetId;
    private currentPointIndex;
    private currentSeriesIndex;
    private currentLegendIndex;
    private isLegend;
    requireInvertedAxis: boolean;
    /** @private */
    svgObject: Element;
    /** @private */
    isTouch: boolean;
    /** @private */
    renderer: SvgRenderer;
    /** @private */
    svgRenderer: SvgRenderer;
    /** @private */
    initialClipRect: Rect;
    /** @private */
    seriesElements: Element;
    /** @private */
    visibleSeriesCount: number;
    /** @private */
    intl: Internationalization;
    /** @private */
    dataLabelCollections: Rect[];
    /** @private */
    dataLabelElements: Element;
    /** @private */
    mouseX: number;
    /** @private */
    mouseY: number;
    /** @private */
    redraw: boolean;
    /** @private */
    animateSeries: boolean;
    /** @public */
    animated: boolean;
    /** @public */
    duration: number;
    /** @private */
    availableSize: Size;
    /** @private */
    delayRedraw: boolean;
    /** @private */
    mouseDownX: number;
    /** @private */
    mouseDownY: number;
    /** @private */
    previousMouseMoveX: number;
    /** @private */
    previousMouseMoveY: number;
    /** @private */
    isPointMouseDown: boolean;
    private resizeTo;
    /** @private */
    disableTrackTooltip: boolean;
    /** @private */
    startMove: boolean;
    /** @private */
    radius: number;
    /** @private */
    visible: number;
    /** @private */
    clickCount: number;
    /** @private */
    maxPointCount: number;
    /** @private */
    singleClickTimer: number;
    /** @private */
    isRtlEnabled: boolean;
    /** @private */
    scaleX: number;
    /** @private */
    scaleY: number;
    private titleCollection;
    private subTitleCollection;
    /** @private */
    themeStyle: Chart3DThemeStyle;
    private chartId;
    /** @private */
    svgId: string;
    /** @private */
    chart3D: Element;
    /** @private */
    isRedrawSelection: boolean;
    /**
     * Touch object to unwire the touch event from element.
     */
    private touchObject;
    /** @private */
    resizeBound: any;
    /** @private */
    longPressBound: any;
    /** @private */
    isLegendClicked: boolean;
    private htmlObject;
    /** @private */
    vector: Vector3D;
    /** @private */
    wallRender: WallRenderer;
    /** @private */
    matrixObj: Matrix3D;
    /** @private */
    bspTreeObj: BinaryTreeBuilder;
    /** @private */
    polygon: Polygon3D;
    /** @private */
    graphics: Graphics3D;
    /** @private */
    transform3D: ChartTransform3D;
    /** @private */
    svg3DRenderer: Svg3DRenderer;
    /** @private */
    axisRender: AxisRenderer;
    /** @private */
    chart3DRender: Chart3DRender;
    /** @private */
    rotateActivate: boolean;
    /** @private */
    previousID: string;
    /** @private */
    isRemove: boolean;
    /** @private */
    previousCoords: {
        x: number;
        y: number;
    };
    /** @private */
    polygons: Chart3DPolygon[];
    /** @private */
    currentSeries: Chart3DSeries;
    /**
     * Render panel for chart.
     *
     * @hidden
     */
    chartAxisLayoutPanel: CartesianAxisLayoutPanel;
    /**
     * Gets all the horizontal axis of the Chart.
     *
     * @hidden
     */
    horizontalAxes: Chart3DAxis[];
    /**
     * Gets all the vertical axis of the Chart.
     *
     * @hidden
     */
    verticalAxes: Chart3DAxis[];
    /**
     * Constructor for creating the 3D chart
     *
     * @param {Chart3DModel} options - Specifies the 3D chart model.
     * @param {string | HTMLElement} element - Specifies the element for the 3D chart.
     * @hidden
     */
    constructor(options?: Chart3DModel, element?: string | HTMLElement);
    /**
     * Checks if the given elementId has special characters and modifies it if necessary.
     *
     * @param {string} elementId - The input elementId to be checked.
     * @returns {string} - The modified elementId.
     */
    private isIdHasSpecialCharacter;
    /**
     * For internal use only - Initialize the event handler;
     *
     * @returns {void}
     */
    protected preRender(): void;
    /**
     * Initializes private variables and prepares the chart component for rendering.
     *
     * @returns {void}
     */
    private initPrivateVariable;
    /**
     * Method to set culture for chart.
     *
     * @returns {void}
     */
    private setCulture;
    /**
     * To Initialize the 3D chart rendering.
     *
     * @returns {void}
     */
    protected render(): void;
    /**
     * Renders the chart using a Cartesian coordinate system.
     *
     * This function is responsible for rendering the chart's graphical elements and data points using a Cartesian coordinate system.
     * It may include actions such as drawing axes, plotting data, and applying visual styles.
     *
     * @returns {void}
     */
    private cartesianChartRendering;
    /**
     * Method to create SVG element.
     *
     * @returns {void}
     */
    createChartSvg(): void;
    /**
     * Method to remove the SVG.
     *
     * @returns {void}
     * @private
     */
    removeSvg(): void;
    /**
     * Processes and prepares data for rendering.
     *
     * @param {boolean} render - (Optional) Indicates whether to trigger rendering after data processing.
     * @returns {void}
     */
    private processData;
    /**
     * Initializes the data module for a three-dimensional series.
     *
     * @param {Chart3DSeries} series - The series for which data module is initialized.
     * @returns {void}
     */
    private initializeDataModule;
    /**
     * Animate the series bounds.
     *
     * @param {number} duration - Specifies the duration of the animation.
     * @private
     * @returns {void}
     */
    animate(duration?: number): void;
    /**
     * Refresh the chart bounds.
     *
     * @private
     * @returns {void}
     */
    refreshBound(): void;
    /**
     * Clears the selection state in the chart.
     *
     * @returns {void}
     */
    private removeSelection;
    /**
     * Calculates stacked values for three-dimensional series in the chart.
     *
     * @returns {void}
     */
    private calculateStackValues;
    /**
     * Calculates the bounds and dimensions for the chart area.
     *
     * @returns {void}
     */
    private calculateBounds;
    /**
     * Renders various chart elements, including the border, title, series, legend, and datalabel etc.
     *
     * @returns {void}
     */
    private renderElements;
    /**
     * Animates the height of an SVG element.
     *
     * @param {HTMLElement} element - The SVG element to animate.
     * @param {Chart3DSeries} series - The series related to the animation.
     * @param {Chart3DPoint} point - The point related to the animation.
     * @param {HTMLElement} dataLabelElement - The data label element related to the animation.
     * @param {HTMLElement} shapeElement - The shape element related to the animation.
     * @param {HTMLElement} templateElement - The template element related to the animation.
     * @returns {void}
     */
    private animateRect;
    /**
     * Animates the series.
     *
     * @returns {void}
     */
    private doAnimation;
    /**
     * Performs data selection based on selected data indexes.
     *
     * @returns {void}
     */
    private performSelection;
    /**
     * To render the legend.
     *
     * @returns {void}
     */
    private renderLegend;
    /**
     * To set the left and top position for secondary element in chart.
     *
     * @returns {void}
     */
    private setSecondaryElementPosition;
    /**
     * Initializes module-specific elements and settings for the chart.
     *
     * @returns {void}
     */
    private initializeModuleElements;
    /**
     * Renders elements specific to chart series.
     *
     * @returns {void}
     */
    private createSeriesElements;
    /**
     * Renders the chart title.
     *
     * @returns {void}
     */
    private renderTitle;
    /**
     * Renders the chart sub title.
     *
     * @param {TextOption} options - Specifies the text option.
     * @returns {void}
     */
    private renderSubTitle;
    /**
     * Renders the chart border.
     *
     * @returns {void}
     */
    private renderBorder;
    /**
     * To provide the array of modules needed for control rendering
     *
     * @returns {ModuleDeclaration[]} - Array of modules needed for control rendering
     * @private
     */
    requiredModules(): ModuleDeclaration[];
    /**
     * Finds axis modules within a collection of module declarations.
     *
     * @param {ModuleDeclaration[]} modules - The collection of module declarations to search for axis modules.
     * @returns {ModuleDeclaration[]} - An array of module declarations representing axis modules.
     */
    private findAxisModule;
    /**
     * Sets the theme for the chart.
     *
     * @returns {void}
     */
    private setTheme;
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
    /**
     * Renders the three-dimensional chart, creating a 3D visualization.
     *
     * The function sets up a 3D perspective, depth, rotation, and tilt to create a 3D visualization of the chart.
     *
     * @returns {void}
     */
    private render3DChart;
    /**
     * Draws three-dimensional axes for the chart.
     *
     * @returns {void}
     */
    private draw3DAxis;
    /**
     * Renders chart series elements.
     *
     * @private
     * @returns {void}
     */
    renderSeries(): void;
    /**
     * Initializes the configuration for an axis within a three-dimensional chart series.
     *
     * @param {Chart3DSeries} series - The series to which the axis belongs.
     * @param {Chart3DAxis} axis - The axis to be configured and initialized.
     * @param {boolean} isSeries - Indicates whether the axis configuration is for the series.
     * @returns {void}
     */
    private initAxis;
    /**
     * Calculate the visible axis.
     *
     * @private
     * @returns {void}
     */
    private calculateVisibleAxis;
    /**
     * Unbinding events from the element while component destroy.
     *
     * @hidden
     * @returns {void}
     */
    private unWireEvents;
    /**
     * Binding events to the element while component creation.
     *
     * @hidden
     * @returns {void}
     */
    private wireEvents;
    /**
     * Handles the long press on chart.
     *
     * @param {TapEventArgs} e - Specifies the tap event arguments.
     * @returns {boolean} false
     * @private
     */
    longPress(e?: TapEventArgs): boolean;
    /**
     * Handles the mouse click on chart.
     *
     * @param {PointerEvent | TouchEvent} e - Specifies the pointer event.
     * @returns {boolean} false
     * @private
     */
    chartOnMouseClick(e: PointerEvent | TouchEvent): boolean;
    /**
     * Export method for the chart.
     *
     * @param {ExportType} type - Specifies the type of the export.
     * @param {string} fileName - Specifies the file name of the exported file.
     * @returns {void}
     */
    export(type: ExportType, fileName: string): void;
    /**
     * Handles the chart resize.
     *
     * @returns {boolean} false
     * @private
     */
    chartResize(): boolean;
    /**
     * Triggers a point-specific event with the specified event type and event data.
     *
     * @param {string} event - The type of event to trigger.
     * @param {PointerEvent | TouchEvent} [e] - (Optional) The event data associated with the triggered event.
     * @returns {void}
     */
    private triggerPointEvent;
    /**
     * Handles the mouse down on chart.
     *
     * @param {PointerEvent} e - Specifies the pointer event.
     * @returns {boolean} false
     * @private
     */
    chartOnMouseDown(e: PointerEvent): boolean;
    /**
     * Handles the mouse move on chart.
     *
     * @param {PointerEvent} e - Specifies the pointer event.
     * @returns {boolean} false
     * @private
     */
    mouseMove(e: PointerEvent): boolean;
    /**
     * Handles the mouse leave on chart.
     *
     * @param {PointerEvent} e - Specifies the pointer event.
     * @returns {boolean} false
     * @private
     */
    mouseLeave(e: PointerEvent): boolean;
    /**
     * Handles the mouse up on chart.
     *
     * @param {PointerEvent} e - Specifies the pointer event.
     * @returns {boolean} false
     * @private
     */
    mouseEnd(e: PointerEvent): boolean;
    /**
     * Handles the mouse up on chart.
     *
     * @param {PointerEvent | TouchEvent} e - Specifies the pointer event.
     * @private
     * @returns {boolean} false
     */
    chartOnMouseUp(e: PointerEvent | TouchEvent): boolean;
    /**
     * Prints the chart in the page.
     *
     * @param {string[] | string | Element} id - The id of the chart to be printed on the page.
     * @returns {void}
     */
    print(id?: string[] | string | Element): void;
    /**
     * Handles the mouse move on chart.
     *
     * @param {PointerEvent | TouchEvent} e - Specifies the pointer event.
     * @returns {boolean} false
     * @private
     */
    private chartOnMouseMove;
    /**
     * Displays a tooltip for a title or element at the specified coordinates.
     *
     * @param {Event} event - The event triggering the tooltip display.
     * @param {number} x - The X-coordinate for the tooltip.
     * @param {number} y - The Y-coordinate for the tooltip.
     * @param {boolean} [isTouch] - (Optional) Indicates whether the event was triggered by a touch input.
     * @returns {void}
     */
    private titleTooltip;
    /**
     * To find mouse x, y coordinate for the chart.
     *
     * @param {number} pageX - Specifies the x value of the pageX.
     * @param {number} pageY - Specifies the y value of the pageY.
     * @returns {void}
     */
    private setMouseXY;
    /**
     * Handles the mouse leave on chart.
     *
     * @param {PointerEvent | TouchEvent} e - Specifies the pointer event.
     * @returns {boolean} false
     * @private
     */
    chartOnMouseLeave(e: PointerEvent | TouchEvent): boolean;
    /**
     * Handles the 'onkeydown' keyboard event on the chart.
     *
     * @param {KeyboardEvent} e - Specifies the keydown event arguments.
     * @returns {boolean} false
     * @private
     */
    chartKeyDown(e: KeyboardEvent): boolean;
    /**
     *Handles the 'onkeyup' keyboard event on the chart..
     *
     * @param {KeyboardEvent} e - Specifies the keyup event arguments.
     * @returns {boolean} false
     * @private
     */
    chartKeyUp(e: KeyboardEvent): boolean;
    /**
     * Sets the tabindex for the current element and removes it from the previous element.
     *
     * @param {HTMLElement} previousElement - The element whose tabindex should be removed.
     * @param {HTMLElement} currentElement - The element to which tabindex should be set.
     * @returns {void}
     * @private
     */
    setTabIndex(previousElement: HTMLElement, currentElement: HTMLElement): void;
    /**
     * Calculates the actual index considering boundary conditions within a given range.
     *
     * @param {number} index - The index to be adjusted.
     * @param {number} totalLength - The total length or maximum allowed index value.
     * @returns {number} - The adjusted index within the valid range.
     */
    private getActualIndex;
    /**
     *  Used to configure tooltips for the chart's axes.
     *
     * @private
     * @param {Event} event - Specifies the event args.
     * @param {number} x - Specifies the x value.
     * @param {number} y - Specifies the y value.
     * @param {boolean} isTouch - Specifies the boolean value.
     * @description - Handles the axis tooltip.
     * @returns {void}
     */
    private axisTooltip;
    /**
     * Searches for an axis label based on the provided text.
     *
     * @param {string} text - The text to search for within the axis label collection.
     * @returns {string} - The matching axis label, or an empty string if no match is found.
     */
    private findAxisLabel;
    /**
     * Sets focus on a child element within the parent element.
     *
     * @param {HTMLElement} element - The parent element containing the child to be focused.
     * @returns {string} - A message indicating the result of the focus operation.
     */
    private focusChild;
    /**
     * Handles the document onkey.
     *
     * @param {KeyboardEvent} e - The keyboard event triggering the navigation.
     * @private
     * @returns {void}
     */
    private documentKeyHandler;
    /**
     * Handles chart keyboard navigation events.
     *
     * @param {KeyboardEvent} e - The keyboard event triggering the navigation.
     * @param {string} targetId - The ID of the target element or chart component.
     * @param { string} actionKey - - The type of keyboard action (e.g., 'Tab' or 'ArrowMove').
     * @returns {void}
     */
    private chartKeyboardNavigations;
    /**
     *  Applys the style for chart.
     *
     * @private
     * @param {HTMLElement} element - Specifies the element.
     * @returns {void}
     */
    private setStyle;
    /**
     * The method to determine whether it is a secondary axis or not.
     *
     * @param  {Chart3DAxis} axis - Specifies the axis.
     * @returns {boolean} Returns the boolean value.
     * @private
     */
    isSecondaryAxis(axis: Chart3DAxis): boolean;
    /**
     * To refresh the rows and columns.
     *
     * @param {Chart3DRow[] | Chart3DColumn} definitions - Specifies the row or column definition.
     * @private
     * @returns {void}
     */
    private refreshDefinition;
    /**
     * Adds new series to the chart
     *
     * @param {Chart3DSeriesModel[]} seriesCollection - The series collection to be added to the chart.
     * @returns {void}
     */
    addSeries(seriesCollection: Chart3DSeriesModel[]): void;
    /**
     * Removes a series from the chart
     *
     * @param {number} index - The index of the series to be removed from the chart.
     * @returns {void}
     */
    removeSeries(index: number): void;
    /**
     * Refresh the axis default value.
     *
     * @private
     * @returns {void}
     */
    refreshAxis(): void;
    /**
     * Refresh the 3D chart axis.
     *
     * @param {Chart3DAxis} axis - Specifies the axis.
     * @returns {boolean} Returns the boolean value.
     * @private
     */
    private axisChange;
    /**
     * Get visible series by index.
     *
     * @param {Chart3DSeries[]} visibleSeries - Specifies the visible series.
     * @param {number} index - Specifies the index.
     * @returns {Chart3DSeries} Returns the chart 3D series.
     */
    private getVisibleSeries;
    /**
     * To remove style element.
     *
     * @private
     * @returns {void}
     */
    private removeStyles;
    /**
     * To find the 3D chart visible series.
     *
     * @private
     * @returns {void}
     */
    private calculateVisibleSeries;
    highlightAnimation(element: HTMLElement, index: number, duration: number, startOpacity: number): void;
    stopElementAnimation(element: HTMLElement, index: number): void;
    /**
     * To destroy the widget.
     *
     * @function destroy
     * @member of Chart
     * @returns {void}
     */
    destroy(): void;
    /**
     * For internal use only - Get the module name.
     *
     * @returns {string} returns the module name
     * @private
     */
    getModuleName(): string;
    /**
     * Get the properties to be maintained in the persisted state.
     *
     * @private
     * @returns {string} returns the string.
     */
    getPersistData(): string;
    /**
     * Called internally if any of the property value changed.
     *
     * @private
     * @param {Chart3DModel} newProp - Specifies the new property.
     * @param {Chart3DModel} oldProp - Specifies the old property.
     * @returns {void}
     */
    onPropertyChanged(newProp: Chart3DModel, oldProp: Chart3DModel): void;
}
