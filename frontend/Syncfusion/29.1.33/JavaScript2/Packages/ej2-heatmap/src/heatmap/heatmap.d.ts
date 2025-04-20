/**
 * Heat Map Component
 */
import { Component, Internationalization } from '@syncfusion/ej2-base';
import { ModuleDeclaration, EmitType } from '@syncfusion/ej2-base';
import { INotifyPropertyChanged } from '@syncfusion/ej2-base';
import { SvgRenderer, CanvasRenderer } from '@syncfusion/ej2-svg-base';
import { Size, Rect, CurrentRect, ToggleVisibility } from './utils/helper';
import { SelectedCellDetails } from './utils/helper';
import { CanvasTooltip } from './utils/helper';
import { HeatMapModel } from './heatmap-model';
import { MarginModel, TitleModel } from './model/base-model';
import { ColorCollection, LegendColorCollection } from './model/base';
import { IThemeStyle, ILoadedEventArgs, ICellClickEventArgs, ITooltipEventArgs, IResizeEventArgs } from './model/interface';
import { ICellEventArgs, ISelectedEventArgs } from './model/interface';
import { DrawType, HeatMapTheme, ColorGradientMode } from './utils/enum';
import { Axis } from './axis/axis';
import { AxisModel } from './axis/axis-model';
import { AxisHelper } from './axis/axis-helpers';
import { Series } from './series/series';
import { CellSettingsModel } from './series/series-model';
import { PaletteSettingsModel } from './utils/colorMapping-model';
import { TooltipSettingsModel } from './utils/tooltip-model';
import { Tooltip } from './utils/tooltip';
import { LegendSettingsModel } from '../heatmap/legend/legend-model';
import { Legend } from '../heatmap/legend/legend';
import { Adaptor } from './datasource/adaptor';
import { DataModel } from './datasource/adaptor-model';
import { ILegendRenderEventArgs } from './model/interface';
import { ExportType } from '../heatmap/utils/enum';
import { PdfPageOrientation } from '@syncfusion/ej2-pdf-export';
/**
 * Represents the heatmap control. This is used to customize the properties of the heatmap in order to visualize two-dimensional data, with values represented by gradient or solid color variations.
 * ```html
 * <div id="container"/>
 * <script>
 *   var heatmapObj = new HeatMap();
 *   heatmapObj.appendTo("#container");
 * </script>
 * ```
 */
export declare class HeatMap extends Component<HTMLElement> implements INotifyPropertyChanged {
    /**
     * Sets and gets the width of the heatmap. The width of the heatmap accepts pixel or percentage values given in string format.
     *
     * If specified as '100%, heatmap renders to the full width of its parent element.
     *
     * @default null
     */
    width: string;
    /**
     * Sets and gets the height of the heatmap. The height of the heatmap accepts pixel or percentage values given in string format.
     *
     * @default null
     */
    height: string;
    /**
     * Enable or disable the visibility of the tooltip for heatmap.
     *
     * @default true
     */
    showTooltip: boolean;
    /**
     * Triggers before the tooltip of the heatmap is rendered on the heatmap cell.
     *
     * {% codeBlock src='heatmap/tooltipRender/index.md' %}{% endcodeBlock %}
     *
     * @event 'object'
     */
    tooltipRender: EmitType<ITooltipEventArgs>;
    /**
     * Triggers to notify the resize of the heatmap when the window is resized.
     *
     * @event 'object'
     */
    resized: EmitType<IResizeEventArgs>;
    /**
     * Triggers after heatmap is loaded.
     *
     * @event 'object'
     */
    loaded: EmitType<ILoadedEventArgs>;
    /**
     * Triggers before each heatmap cell renders.
     * {% codeBlock src='heatmap/cellRender/index.md' %}{% endcodeBlock %}
     *
     * @deprecated
     * @event 'object'
     */
    cellRender: EmitType<ICellEventArgs>;
    /**
     * Triggers when heatmap cell gets selected.
     *
     * @event 'object'
     */
    cellSelected: EmitType<ISelectedEventArgs>;
    /**
     * Specifies the rendering mode of heatmap. The following are the available rendering modes.
     * * SVG - Heatmap is rendered using SVG element.
     * * Canvas - Heatmap is rendered using Canvas element.
     * * Auto - Automatically switches the rendering mode based on number of records in the data source.
     *
     * @default SVG
     */
    renderingMode: DrawType;
    /**
     * Sets and gets the data to visualize in the heatmap.
     *
     * @isDataManager false
     * @default null
     */
    dataSource: Object;
    /**
     * Sets and gets the options to customize the data mapping for the data in the heatmap.
     * {% codeBlock src='heatmap/dataSourceSettings/index.md' %}{% endcodeBlock %}
     */
    dataSourceSettings: DataModel;
    /**
     * Specifies the background color of the entire heatmap.
     *
     * @default null
     */
    backgroundColor: string;
    /**
     *  Sets and gets the theme styles supported for heatmap. When the theme is set, the styles associated with the theme will be set in the heatmap.
     *
     * @default 'Material'
     */
    theme: HeatMapTheme;
    /**
     * Enable or disable the selection of cells in heatmap.
     * {% codeBlock src='heatmap/allowSelection/index.md' %}{% endcodeBlock %}
     *
     * @default false
     */
    allowSelection: boolean;
    /**
     * Enable or disable the multiple selection of cells in heatmap.
     *
     * @default true
     */
    enableMultiSelect: boolean;
    /**
     * Specifies whether to enable the rendering of untrusted HTML values in the HeatMap. If `enableHtmlSanitizer` set to **true**, the component will sanitize any suspected untrusted strings and scripts before rendering them.
     *
     * @default false
     */
    enableHtmlSanitizer: boolean;
    /**
     * Sets and gets the options to customize left, right, top and bottom margins of the heatmap.
     */
    margin: MarginModel;
    /**
     * Sets and gets the options to customize the title of the heatmap.
     * {% codeBlock src='heatmap/titleSettings/index.md' %}{% endcodeBlock %}
     */
    titleSettings: TitleModel;
    /**
     * Sets and gets the options to configure the horizontal axis.
     */
    xAxis: AxisModel;
    /**
     * Sets and gets the options for customizing the legend of the heatmap.
     * {% codeBlock src='heatmap/legendSettings/index.md' %}{% endcodeBlock %}
     */
    legendSettings: LegendSettingsModel;
    /**
     * Sets and gets the options for customizing the cell color of the heatmap.
     * {% codeBlock src='heatmap/paletteSettings/index.md' %}{% endcodeBlock %}
     */
    paletteSettings: PaletteSettingsModel;
    /**
     * Sets and gets the options for customizing the tooltip of the heatmap.
     * {% codeBlock src='heatmap/tooltipSettings/index.md' %}{% endcodeBlock %}
     */
    tooltipSettings: TooltipSettingsModel;
    /**
     * Sets and gets the options to configure the vertical axis.
     */
    yAxis: AxisModel;
    /**
     * Sets and gets the options to customize the heatmap cells.
     * {% codeBlock src='heatmap/cellSettings/index.md' %}{% endcodeBlock %}
     */
    cellSettings: CellSettingsModel;
    /**
     * Triggers after heatmap is completely rendered.
     *
     * @event 'object'
     */
    created: EmitType<Object>;
    /**
     * Triggers before heatmap gets loaded.
     * {% codeBlock src='heatmap/load/index.md' %}{% endcodeBlock %}
     *
     * @event 'object'
     */
    load: EmitType<ILoadedEventArgs>;
    /**
     * Triggers when clicking on the heatmap cell.
     *
     * @event 'object'
     */
    cellClick: EmitType<ICellClickEventArgs>;
    /**
     * Triggers when performing the double click operation on the cells in the HeatMap.
     *
     * @event cellDoubleClick
     */
    cellDoubleClick: EmitType<ICellClickEventArgs>;
    /**
     * Triggers before the legend is rendered.
     * {% codeBlock src='heatmap/legendRender/index.md' %}{% endcodeBlock %}
     *
     * @deprecated
     * @event 'object'
     */
    legendRender: EmitType<ILegendRenderEventArgs>;
    /** @private */
    enableCanvasRendering: boolean;
    /** @private */
    colorGradientMode: ColorGradientMode;
    /** @private */
    renderer: SvgRenderer;
    /** @private */
    canvasRenderer: CanvasRenderer;
    /** @private */
    secondaryCanvasRenderer: CanvasRenderer;
    /** @private */
    svgObject: Element;
    /** @private */
    availableSize: Size;
    /** @private */
    private elementSize;
    /** @private */
    themeStyle: IThemeStyle;
    /** @private */
    isColorRange: boolean;
    /** @private */
    initialClipRect: Rect;
    heatMapAxis: AxisHelper;
    heatMapSeries: Series;
    private drawSvgCanvas;
    private twoDimensional;
    private cellColor;
    /** @private */
    colorCollection: ColorCollection[];
    /** @private */
    legendColorCollection: LegendColorCollection[];
    /** @private */
    tempRectHoverClass: string;
    /** @private */
    legendVisibilityByCellType: boolean;
    /** @private */
    bubbleSizeWithColor: boolean;
    /** @private */
    tempTooltipRectId: string;
    /** @private */
    clonedDataSource: any[];
    /** @private */
    completeAdaptDataSource: Object;
    /** @private */
    xLength: number;
    /** @private */
    yLength: number;
    /** @private */
    isCellTapHold: boolean;
    /** @private */
    selectedCellCount: number;
    /** @private */
    currentRect: CurrentRect;
    /** @private */
    dataSourceMinValue: number;
    /** @private */
    dataMin: number[];
    /** @private */
    dataMax: number[];
    /** @private */
    dataSourceMaxValue: number;
    /** @private */
    minColorValue: number;
    /** @private */
    maxColorValue: number;
    /** @private */
    isColorValueExist: boolean;
    /** @private */
    tooltipTimer: number;
    /** @private */
    gradientTimer: number;
    /** @private */
    legendTooltipTimer: number;
    /** @private */
    resizeTimer: number;
    /** @private */
    emptyPointColor: string;
    /** @private */
    rangeSelection: boolean;
    /** @private */
    toggleValue: ToggleVisibility[];
    /** @private */
    legendOnLoad: boolean;
    /** @private */
    resizing: boolean;
    /** @private */
    rendering: boolean;
    /** @private */
    horizontalGradient: boolean;
    /** @private */
    multiSelection: boolean;
    /** @private */
    rectSelected: boolean;
    /** @private */
    previousRect: CurrentRect;
    /** @private */
    selectedCellsRect: Rect;
    /** @private */
    previousSelectedCellsRect: Rect[];
    /** @private */
    canvasSelectedCells: Rect;
    /** @private */
    multiCellCollection: SelectedCellDetails[];
    /** @private */
    selectedMultiCellCollection: SelectedCellDetails[];
    /** @private */
    tempMultiCellCollection: SelectedCellDetails[][];
    /** @private */
    titleRect: Rect;
    /** @private */
    initialCellX: number;
    /** @private */
    initialCellY: number;
    private resizeEvent;
    private touchInstance;
    /**
     * @private
     */
    tooltipCollection: CanvasTooltip[];
    /**
     * @private
     */
    isTouch: boolean;
    /**
     * @private
     */
    isRectBoundary: boolean;
    /**
     * @private
     */
    private border;
    /**
     * Gets the axis of the HeatMap.
     *
     * @hidden
     */
    axisCollections: Axis[];
    /**
     * @private
     */
    intl: Internationalization;
    /**
     * @private
     */
    isCellData: boolean;
    private titleCollection;
    /**
     * @private
     */
    mouseX: number;
    /**
     * @private
     */
    mouseY: number;
    /**
     * The `legendModule` is used to display the legend.
     *
     * @private
     */
    legendModule: Legend;
    /**
     * The `tooltipModule` is used to manipulate Tooltip item from base of heatmap.
     *
     * @private
     */
    tooltipModule: Tooltip;
    /**
     * The `adaptorModule` is used to manipulate Adaptor item from base of heatmap.
     *
     * @private
     */
    adaptorModule: Adaptor;
    protected preRender(): void;
    /**
     * This method is used to perform the export functionality for the heatmap.
     *
     * @param {ExportType} type - Specifies the type of the exported file.
     * @param {string} fileName - Specifies the file name for the exported file.
     * @param {PdfPageOrientation} orientation - Specifies the orientation for the exported PDF document.
     */
    export(type: ExportType, fileName: string, orientation?: PdfPageOrientation): void;
    private initPrivateVariable;
    /**
     * Method to set culture for heatmap
     */
    private setCulture;
    protected render(): void;
    /**
     * To re-calculate the datasource while changing datasource property dynamically.
     *
     * @private
     */
    private reRenderDatasource;
    /**
     * To process datasource property.
     *
     * @private
     */
    private processInitData;
    /**
     * To set render mode of heatmap as SVG or Canvas.
     *
     * @private
     */
    private setRenderMode;
    /**
     * To set bubble helper private property.
     *
     * @private
     */
    private updateBubbleHelperProperty;
    private renderElements;
    /**
     * Get component name
     *
     * @private
     */
    getModuleName(): string;
    /**
     * Get the properties to be maintained in the persisted state.
     *
     * @private
     */
    getPersistData(): string;
    /**
     * @private
     */
    onPropertyChanged(newProp: HeatMapModel, oldProp: HeatMapModel): void;
    private paletteCellSelectionUpdation;
    /**
     * create svg or canvas element
     *
     * @private
     */
    createSvg(): void;
    /**
     *  To Remove the SVG.
     *
     * @private
     */
    removeSvg(): void;
    private renderSecondaryElement;
    /**
     * To provide the array of modules needed for control rendering
     *
     * @returns {ModuleDeclaration[]}
     * @private
     */
    requiredModules(): ModuleDeclaration[];
    /**
     * This method destroys the heatmap. This method removes the events associated with the heatmap and disposes the objects created for rendering and updating the heatmap.
     * {% codeBlock src='heatmap/destroy/index.md' %}{% endcodeBlock %}
     *
     * @function destroy
     * @returns {void}.
     * @member of Heatmap
     */
    destroy(): void;
    /**
     * Applies all the pending property changes and render the component again.
     *
     * @function destroy
     * @returns {void}.
     */
    refresh(): void;
    /**
     * Appending svg object to the element
     *
     * @private
     */
    private appendSvgObject;
    private renderBorder;
    private calculateSize;
    private renderTitle;
    private titleTooltip;
    private axisTooltip;
    private isHeatmapRect;
    private setTheme;
    private calculateBounds;
    refreshBound(): void;
    private initAxis;
    /**
     * Method to bind events for HeatMap
     */
    private wireEvents;
    /**
     * Applying styles for heatmap element
     */
    private setStyle;
    /**
     * This method is used to print the rendered heatmap.
     */
    print(): void;
    /**
     * Method to unbind events for HeatMap
     */
    private unWireEvents;
    /**
     * Handles the heatmap resize.
     *
     * @returns {boolean}
     * @private
     */
    heatMapResize(e: Event): boolean;
    /**
     * Method to bind selection after window resize for HeatMap
     */
    private updateCellSelection;
    private clearSVGSelection;
    /**
     * Get the maximum length of data source for both horizontal and vertical
     *
     * @private
     */
    private calculateMaxLength;
    /**
     * To find mouse x, y for aligned heatmap element svg position
     */
    private setMouseXY;
    private triggerClickEvent;
    private heatMapMouseRightClick;
    private heatMapMouseDoubleClick;
    /**
     * @param {PointerEvent} e - Specifies the event.
     * @returns {boolean} Returns the boolean that that the heatmap is clicked or not
     * @private
     */
    heatMapMouseClick(e: PointerEvent): boolean;
    /**
     * Handles the mouse Move.
     *
     * @returns {boolean}
     *
     * @private
     */
    heatMapMouseMove(e: PointerEvent): boolean;
    /**
     * Handles the mouse Move.
     *
     * @returns {boolean}
     */
    private mouseAction;
    /**
     * Triggering cell selection
     */
    private cellSelectionOnMouseMove;
    /**
     * Rendering tooltip on mouse move
     */
    private tooltipOnMouseMove;
    /**
     * To select the multiple cells on mouse move action
     */
    private highlightSelectedCells;
    /**
     * Method to get selected cell data collection for HeatMap
     */
    private getDataCollection;
    /**
     * To get the selected datas.
     */
    private getCellCollection;
    /**
     * To remove the selection on mouse click without ctrl key.
     */
    private removeSelectedCellsBorder;
    /**
     * To highlight the selected multiple cells on mouse move action in canvas mode.
     */
    private highlightSelectedAreaInCanvas;
    /**
     * To get the collection of selected cells.
     */
    private getSelectedCellData;
    /**
     * To add class for selected cells
     *
     * @private
     */
    addSvgClass(element: Element): void;
    /**
     * To remove class for unselected cells
     *
     * @private
     */
    removeSvgClass(rectElement: Element, className: string): void;
    /**
     * This method is used to clear the cell selection in the heatmap.
     * {% codeBlock src='heatmap/clearSelection/index.md' %}{% endcodeBlock %}
     */
    clearSelection(): void;
    private renderMousePointer;
    /**
     * Handles the mouse end.
     *
     * @returns {boolean}
     * @private
     */
    heatMapMouseLeave(e: PointerEvent): boolean;
    /**
     * This method is used to perform operations when keyboard up on Heatmap.
     *
     * @param {KeyboardEvent} e - Specifies the keyboard event on Heatmap.
     * @returns {void}
     * @private
     */
    heatMapKeyUp(e: KeyboardEvent): void;
    /**
     * This method is used to perform operations when keyboard down on Heatmap.
     *
     * @param {KeyboardEvent} e - Specifies the keyboard event on Heatmap.
     * @returns {void}
     * @private
     */
    heatMapKeyDown(e: KeyboardEvent): void;
    /**
     * Method to find the legend index.
     */
    private calculateLegendIndex;
    /**
     * Method to handle arrow navigation in legend.
     */
    private handleArrowNavigation;
    /**
     * Method to return Current rect.
     */
    private getRectElement;
    /**
     * Method to remove the highlight outline.
     */
    private removeFocus;
    /**
     * Method to Check for deselection of cell.
     */
    private checkSelectedCells;
    /**
     * Method to remove opacity for text of selected cell for HeatMap
     */
    private removeOpacity;
    /**
     * Method to set opacity for selected cell for HeatMap
     */
    private setCellOpacity;
    /**
     * To create div container for rendering two layers of canvas.
     *
     * @returns {void}
     * @private
     */
    createMultiCellDiv(onLoad: boolean): void;
}
