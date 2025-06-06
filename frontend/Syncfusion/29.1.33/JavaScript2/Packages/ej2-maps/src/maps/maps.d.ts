/**
 * Maps Component file
 */
import { Component, INotifyPropertyChanged } from '@syncfusion/ej2-base';
import { EmitType } from '@syncfusion/ej2-base';
import { L10n, Internationalization } from '@syncfusion/ej2-base';
import { ModuleDeclaration } from '@syncfusion/ej2-base';
import { SvgRenderer } from '@syncfusion/ej2-svg-base';
import { Size, Point } from './utils/helper';
import { LayerSettings } from './model/base';
import { ZoomSettingsModel, LegendSettingsModel, LayerSettingsModel } from './model/base-model';
import { MarkerSettingsModel, SelectionSettingsModel } from './model/base-model';
import { TitleSettingsModel, BorderModel, MarginModel, CenterPositionModel } from './model/base-model';
import { MapsAreaSettingsModel, AnnotationModel } from './model/base-model';
import { Bubble } from './layers/bubble';
import { Legend } from './layers/legend';
import { Marker } from './layers/marker';
import { Highlight } from './user-interaction/highlight';
import { Selection } from './user-interaction/selection';
import { MapsTooltip } from './user-interaction/tooltip';
import { Zoom } from './user-interaction/zoom';
import { ProjectionType, MapsTheme, PanDirection, TooltipGesture } from './utils/enum';
import { MapsModel } from './maps-model';
import { ILoadEventArgs, ILoadedEventArgs, IMinMaxLatitudeLongitude, IMouseEventArgs, IMouseMoveEventArgs, IResizeEventArgs, ITooltipRenderEventArgs } from './model/interface';
import { GeoPosition, ITooltipRenderCompleteEventArgs, ILegendRenderingEventArgs } from './model/interface';
import { ILayerRenderingEventArgs, IShapeRenderingEventArgs, IMarkerRenderingEventArgs, IMarkerClickEventArgs } from './model/interface';
import { IMarkerMoveEventArgs, ILabelRenderingEventArgs, IBubbleMoveEventArgs, IBubbleClickEventArgs } from './model/interface';
import { IMarkerClusterClickEventArgs, IMarkerClusterMoveEventArgs, IMarkerClusterRenderingEventArgs } from './model/interface';
import { ISelectionEventArgs, IShapeSelectedEventArgs, IMapPanEventArgs, IMapZoomEventArgs } from './model/interface';
import { IBubbleRenderingEventArgs, IAnimationCompleteEventArgs, IPrintEventArgs, IThemeStyle } from './model/interface';
import { LayerPanel } from './layers/layer-panel';
import { GeoLocation, Rect } from '../maps/utils/helper';
import { Annotations } from '../maps/user-interaction/annotation';
import { DataLabel, IAnnotationRenderingEventArgs, IMarkerDragEventArgs, BingMap } from './index';
import { NavigationLine } from './layers/navigation-selected-line';
import { Polygon } from './layers/polygon';
import { ExportType } from '../maps/utils/enum';
import { PdfPageOrientation } from '@syncfusion/ej2-pdf-export';
import { Print } from './model/print';
import { PdfExport } from './model/export-pdf';
import { ImageExport } from './model/export-image';
/**
 * Represents the maps control. It is ideal for rendering maps from GeoJSON data or other map providers like OpenStreetMap, Google Maps, Bing Maps, etc that
 * has rich feature set that includes markers, labels, bubbles and much more.
 * ```html
 * <div id="maps"/>
 * <script>
 *   var maps = new Maps();
 *   maps.appendTo("#maps");
 * </script>
 * ```
 */
export declare class Maps extends Component<HTMLElement> implements INotifyPropertyChanged {
    /**
     * Gets or sets the module to add bubbles in the maps.
     *
     * @private
     */
    bubbleModule: Bubble;
    /**
     * Sets and get the module to add the marker in the maps.
     *
     * @private
     */
    markerModule: Marker;
    /**
     * Gets or sets the module to add the data-label in the maps.
     *
     * @private
     */
    dataLabelModule: DataLabel;
    /**
     * Gets or sets the module to highlight the element when mouse has hovered on it in maps.
     *
     * @private
     */
    highlightModule: Highlight;
    /**
     * Gets or sets the module to add the navigation lines in the maps.
     *
     * @private
     */
    navigationLineModule: NavigationLine;
    /**
     * Gets or sets the module to add the polygon shapes over the maps.
     *
     * @private
     */
    polygonModule: Polygon;
    /**
     * Gets or sets the module to add the legend in maps.
     *
     * @private
     */
    legendModule: Legend;
    /**
     * Gets or sets the module to select the geometric shapes when clicking in maps.
     *
     * @private
     */
    selectionModule: Selection;
    /**
     * Gets or sets the module to add the tooltip when mouse has hovered on an element in maps.
     *
     * @private
     */
    mapsTooltipModule: MapsTooltip;
    /**
     * Gets or sets the module to add the zooming operations in maps.
     *
     * @private
     */
    zoomModule: Zoom;
    /**
     * Gets or sets the module to add annotation elements in maps.
     *
     * @private
     */
    annotationsModule: Annotations;
    /**
     * This module enables the print functionality in maps.
     *
     * @private
     */
    printModule: Print;
    /**
     * This module enables the export to PDF functionality in maps.
     *
     * @private
     */
    pdfExportModule: PdfExport;
    /**
     * This module enables the export to image functionality in maps.
     *
     * @private
     */
    imageExportModule: ImageExport;
    /**
     * This module enables the bing map functionality in maps.
     *
     * @private
     */
    bingMap: BingMap;
    /**
     * Gets or sets the background color of the maps container.
     *
     * @default null
     */
    background: string;
    /**
     * Enables or disables the visibility state of the separator for grouping.
     *
     * @default false
     */
    useGroupingSeparator: boolean;
    /**
     * Gets or sets the format to apply internationalization for the text in the maps.
     *
     * @default null
     */
    format: string;
    /**
     * Gets or sets the width in which the maps is to be rendered.
     *
     * @default null
     */
    width: string;
    /**
     * Gets or sets the height in which the maps is to be rendered.
     *
     * @default null
     */
    height: string;
    /**
     * Gets or sets the mode in which the tooltip is to be displayed.
     * The tooltip can be rendered on mouse move, click or double clicking on the
     * element on the map.
     *
     * @default 'MouseMove'
     */
    tooltipDisplayMode: TooltipGesture;
    /**
     * Enables or disables the print functionality in maps.
     *
     * @default false
     */
    allowPrint: boolean;
    /**
     * Enables or disables the export to image functionality in maps.
     *
     * @default false
     */
    allowImageExport: boolean;
    /**
     * Enables or disables the export to PDF functionality in maps.
     *
     * @default false
     */
    allowPdfExport: boolean;
    /**
     * Gets or sets the options to customize the title of the maps.
     */
    titleSettings: TitleSettingsModel;
    /**
     * Gets or sets the options to customize the zooming operations in maps.
     */
    zoomSettings: ZoomSettingsModel;
    /**
     * Gets or sets the options to customize the legend of the maps.
     */
    legendSettings: LegendSettingsModel;
    /**
     * Gets or sets the options to customize the layers of the maps.
     */
    layers: LayerSettingsModel[];
    /**
     * Gets or sets the options for customizing the annotations in the maps.
     */
    annotations: AnnotationModel[];
    /**
     * Gets or sets the options to customize the margin of the maps.
     */
    margin: MarginModel;
    /**
     * Gets or sets the options for customizing the style properties of the maps border.
     */
    border: BorderModel;
    /**
     * Gets or sets the theme styles supported for maps. When the theme is set, the styles associated with the theme will be set in the maps.
     *
     * @default Material
     */
    theme: MapsTheme;
    /**
     * Gets or sets the projection with which the maps will be rendered to show the two-dimensional curved surface of a globe on a plane.
     *
     * @default Mercator
     */
    projectionType: ProjectionType;
    /**
     * Gets or sets the index of the layer of maps which will be the base layer. It provides the option to select which layer to be visible in the maps.
     *
     * @default 0
     */
    baseLayerIndex: number;
    /**
     * Gets or sets the description of the maps for assistive technology.
     *
     * @default null
     */
    description: string;
    /**
     * Gets or sets the tab index value for the maps.
     *
     * @default 0
     */
    tabIndex: number;
    /**
     * Gets or sets the center position of the maps.
     */
    centerPosition: CenterPositionModel;
    /**
     * Gets or sets the options to customize the area around the map.
     */
    mapsArea: MapsAreaSettingsModel;
    /**
     * Triggers before the maps gets rendered.
     *
     * @event load
     */
    load: EmitType<ILoadEventArgs>;
    /**
     * Triggers before the print gets started.
     *
     * @event beforePrint
     */
    beforePrint: EmitType<IPrintEventArgs>;
    /**
     * Triggers after the maps gets rendered.
     *
     * @event loaded
     */
    loaded: EmitType<ILoadedEventArgs>;
    /**
     * Triggers when a user clicks on an element in Maps.
     *
     * @event click
     * @deprecated
     */
    click: EmitType<IMouseEventArgs>;
    /**
     * Triggers when a user clicks on an element in Maps.
     *
     * @event onclick
     */
    onclick: EmitType<IMouseEventArgs>;
    /**
     * Triggers when performing the double click operation on an element in maps.
     *
     * @event doubleClick
     */
    doubleClick: EmitType<IMouseEventArgs>;
    /**
     * Triggers when performing the right click operation on an element in maps.
     *
     * @event rightClick
     */
    rightClick: EmitType<IMouseEventArgs>;
    /**
     * Triggers to notify the resize of the maps when the window is resized.
     *
     * @event resize
     */
    resize: EmitType<IResizeEventArgs>;
    /**
     * Triggers before the maps tooltip gets rendered.
     *
     * @event tooltipRender
     */
    tooltipRender: EmitType<ITooltipRenderEventArgs>;
    /**
     * Triggers before the legend gets rendered.
     *
     * @event legendRendering
     * @deprecated
     */
    legendRendering: EmitType<ILegendRenderingEventArgs>;
    /**
     * Triggers after the maps tooltip gets rendered.
     *
     * @deprecated
     * @event tooltipRenderComplete
     */
    tooltipRenderComplete: EmitType<ITooltipRenderCompleteEventArgs>;
    /**
     * Triggers when a shape is selected in the maps.
     *
     * @event shapeSelected
     */
    shapeSelected: EmitType<IShapeSelectedEventArgs>;
    /**
     * Triggers before the shape, bubble or marker gets selected.
     *
     * @event itemSelection
     */
    itemSelection: EmitType<ISelectionEventArgs>;
    /**
     * Trigger before the shape, bubble or marker gets highlighted.
     *
     * @event itemHighlight
     */
    itemHighlight: EmitType<ISelectionEventArgs>;
    /**
     * Triggers before the shape gets highlighted.
     *
     * @event shapeHighlight
     */
    shapeHighlight: EmitType<IShapeSelectedEventArgs>;
    /**
     * Triggers before the maps layer gets rendered.
     *
     * @event layerRendering
     */
    layerRendering: EmitType<ILayerRenderingEventArgs>;
    /**
     * Triggers before the maps shape gets rendered.
     *
     * @event shapeRendering
     */
    shapeRendering: EmitType<IShapeRenderingEventArgs>;
    /**
     * Triggers before the maps marker gets rendered.
     *
     * @event markerRendering
     */
    markerRendering: EmitType<IMarkerRenderingEventArgs>;
    /**
     * Triggers before the maps marker cluster gets rendered.
     *
     * @event markerClusterRendering
     */
    markerClusterRendering: EmitType<IMarkerClusterRenderingEventArgs>;
    /**
     * Triggers when clicking on a marker element.
     *
     * @event markerClick
     */
    markerClick: EmitType<IMarkerClickEventArgs>;
    /**
     * When the marker begins to drag on the map, this event is triggered.
     *
     * @event markerDragStart
     */
    markerDragStart: EmitType<IMarkerDragEventArgs>;
    /**
     * When the marker has stopped dragging on the map, this event is triggered.
     *
     * @event markerDragEnd
     */
    markerDragEnd: EmitType<IMarkerDragEventArgs>;
    /**
     * Triggers when clicking the marker cluster in maps.
     *
     * @event markerClusterClick
     */
    markerClusterClick: EmitType<IMarkerClusterClickEventArgs>;
    /**
     * Triggers when moving the mouse over the marker cluster element in maps.
     *
     * @event markerClusterMouseMove
     */
    markerClusterMouseMove: EmitType<IMarkerClusterMoveEventArgs>;
    /**
     * Triggers when moving the mouse over the marker element in maps.
     *
     * @event markerMouseMove
     */
    markerMouseMove: EmitType<IMarkerMoveEventArgs>;
    /**
     * This event is triggered when the mouse pointer moves over the map.
     *
     * @event mouseMove
     */
    mouseMove: EmitType<IMouseMoveEventArgs>;
    /**
     * Triggers before the data-label gets rendered.
     *
     * @event dataLabelRendering
     */
    dataLabelRendering: EmitType<ILabelRenderingEventArgs>;
    /**
     * Triggers before the bubble element gets rendered on the map.
     *
     * @event bubbleRendering
     */
    bubbleRendering: EmitType<IBubbleRenderingEventArgs>;
    /**
     * Triggers when performing the click operation on the bubble element in maps.
     *
     * @event bubbleClick
     */
    bubbleClick: EmitType<IBubbleClickEventArgs>;
    /**
     * Triggers when hovering the mouse on the bubble element in maps.
     *
     * @event bubbleMouseMove
     */
    bubbleMouseMove: EmitType<IBubbleMoveEventArgs>;
    /**
     * Triggers after the animation is completed in the maps.
     *
     * @event animationComplete
     */
    animationComplete: EmitType<IAnimationCompleteEventArgs>;
    /**
     * Triggers before rendering an annotation in the maps.
     *
     * @event annotationRendering
     */
    annotationRendering: EmitType<IAnnotationRenderingEventArgs>;
    /**
     * Triggers before the zoom operations such as zoom in and zoom out in the maps.
     *
     * @event zoom
     */
    zoom: EmitType<IMapZoomEventArgs>;
    /**
     * Triggers before performing the panning operation.
     *
     * @event pan
     */
    pan: EmitType<IMapPanEventArgs>;
    /**
     * This event is triggered after performing the panning action.
     *
     * @event panComplete
     */
    panComplete: EmitType<IMapPanEventArgs>;
    /**
     * This event is triggered after the zooming operation is completed.
     *
     * @event zoomComplete
     */
    zoomComplete: EmitType<IMapPanEventArgs>;
    /**
     * Specifies the function to format the text contents in the maps.
     *
     * @private
     */
    formatFunction: any;
    /**
     * Specifies the svg renderer object.
     *
     * @private
     */
    renderer: SvgRenderer;
    /**
     * Specifies the svg element's object of maps.
     *
     * @private
     */
    svgObject: Element;
    /** @public */
    mapScaleValue: number;
    /**
     * Specifies the available height and width of maps.
     *
     * @private
     */
    availableSize: Size;
    /**
     * whether it is layer add or not.
     *
     * @private
     */
    isAddLayer: boolean;
    /**
     * Specifies the localization object.
     *
     * @private
     */
    localeObject: L10n;
    /**
     * Specifies the default values of localization values.
     */
    private defaultLocalConstants;
    /**
     * Internal use of internationalization instance.
     *
     * @private
     */
    intl: Internationalization;
    /**
     * Check layer whether is geometry or tile.
     *
     * @private
     */
    isTileMap: boolean;
    /**
     * Resize the map
     */
    private resizeTo;
    /**
     * Resize the map
     *
     * @private
     */
    isResize: boolean;
    /**
     * @private
     */
    mapAreaRect: Rect;
    /**
     * @private
     */
    layersCollection: LayerSettings[];
    /**
     * @private
     */
    isExportInitialTileMap: boolean;
    /**
     * @private
     * @hidden
     */
    mapLayerPanel: LayerPanel;
    /**
     * @private
     * @hidden
     */
    /**
     * @private
     */
    themeStyle: IThemeStyle;
    /**
     * @private
     */
    isReset: boolean;
    /**
     * @private
     */
    totalRect: Rect;
    /**
     *
     * Specifies whether the shape is selected in the maps or not.
     *
     * @returns {boolean} - Returns a boolean value to specify whether the shape is selected in the maps or not.
     */
    readonly isShapeSelected: boolean;
    dataLabel: DataLabel;
    /** @private */
    isTouch: boolean;
    /** @private */
    baseSize: Size;
    /** @private */
    scale: number;
    /** @private */
    baseScale: number;
    /** @private */
    mapSelect: boolean;
    /** @private */
    baseMapBounds: GeoLocation;
    /** @private */
    baseMapRectBounds: any;
    private resizeEvent;
    /** @public */
    translatePoint: Point;
    /** @private */
    baseTranslatePoint: Point;
    /** @public */
    zoomTranslatePoint: Point;
    /** @private */
    markerZoomFactor: number;
    /** @private */
    markerZoomCenterPoint: CenterPositionModel;
    /** @private */
    markerZoomedState: boolean;
    /** @private */
    zoomPersistence: boolean;
    /** @private */
    defaultState: boolean;
    /** @private */
    currentTiles: HTMLElement;
    /** @private */
    markerCenterLatitude: number;
    /** @private */
    markerCenterLongitude: number;
    /** @private */
    previousCenterLatitude: number;
    /** @private */
    previousCenterLongitude: number;
    /** @private */
    centerPositionChanged: boolean;
    /** @private */
    previousZoomFactor: number;
    /** @private */
    shouldZoomCurrentFactor: number;
    /** @private */
    shouldZoomPreviousFactor: number;
    /** @private */
    markerNullCount: number;
    /** @private */
    translateType: string;
    /** @public */
    previousProjection: String;
    /** @private */
    currentShapeDataLength: number;
    /** @private */
    tileTranslatePoint: Point;
    /** @private */
    baseTileTranslatePoint: Point;
    /** @private */
    isDevice: Boolean;
    /** @private */
    tileZoomLevel: number;
    /** @private */
    isZoomByPosition: boolean;
    /** @private */
    tileZoomScale: number;
    /** @private */
    staticMapZoom: number;
    /** @private */
    serverProcess: any;
    /** @private */
    toolbarProperties: any;
    /** @private */
    previousScale: number;
    /** @private */
    previousPoint: Point;
    /** @private */
    centerLatOfGivenLocation: number;
    /** @private */
    centerLongOfGivenLocation: number;
    /** @private */
    minLatOfGivenLocation: number;
    /** @private */
    minLongOfGivenLocation: number;
    /** @private */
    maxLatOfGivenLocation: number;
    /** @private */
    maxLongOfGivenLocation: number;
    /** @private */
    scaleOfGivenLocation: number;
    /** @private */
    zoomNotApplied: boolean;
    /** @public */
    dataLabelShape: number[];
    zoomShapeCollection: string[];
    zoomLabelPositions: object[];
    mouseDownEvent: Object;
    mouseClickEvent: Object;
    /** @private */
    shapeSelectionClass: Element;
    /** @private */
    selectedElementId: string[];
    /** @private */
    markerSelectionClass: Element;
    /** @private */
    selectedMarkerElementId: string[];
    /** @private */
    bubbleSelectionClass: Element;
    /** @private */
    selectedBubbleElementId: string[];
    /** @private */
    navigationSelectionClass: Element;
    /** @private */
    selectedNavigationElementId: string[];
    /** @private */
    polygonSelectionClass: Element;
    /** @private */
    selectedPolygonElementId: string[];
    /** @private */
    legendSelectionClass: SelectionSettingsModel;
    /** @private */
    selectedLegendElementId: number[];
    /** @private */
    legendSelectionCollection: any[];
    /** @private */
    shapeSelections: boolean;
    /** @private */
    legendSelection: boolean;
    /** @private */
    toggledLegendId: number[];
    /** @private */
    toggledElementId: string[];
    /** @private */
    checkInitialRender: boolean;
    /** @private */
    widthBeforeRefresh: number;
    /** @private */
    heightBeforeRefresh: number;
    /** @private */
    previousTranslate: Point;
    /** @private */
    initialTileTranslate: Point;
    /** @private */
    previousTileWidth: number;
    /** @private */
    isMarkerZoomCompleted: boolean;
    /** @private */
    markerDragId: string;
    /** @private */
    previousTileHeight: number;
    /** @private */
    initialZoomLevel: number;
    /** @private */
    initialCheck: boolean;
    /** @private */
    applyZoomReset: boolean;
    /** @private */
    markerClusterExpandCheck: boolean;
    /** @private */
    markerClusterExpand: boolean;
    /** @private */
    mouseMoveId: string;
    /** @private */
    shapeSelectionItem: any[];
    /** @private */
    markerDragArgument: any;
    /**
     * Constructor for creating the widget.
     *
     * @param {MapsModel} options Specifies the options
     * @param {string | HTMLElement} element Specifies the element
     */
    constructor(options?: MapsModel, element?: string | HTMLElement);
    /**
     * To manage persist maps data.
     *
     * @returns {void}
     */
    private mergePersistMapsData;
    /**
     * Gets the localized label by locale keyword.
     *
     * @param  {string} key - Specifies the key
     * @returns {string} - Returns the string value
     * @private
     */
    getLocalizedLabel(key: string): string;
    /**
     * Initializing pre-required values.
     *
     * @returns {void}
     */
    protected preRender(): void;
    private renderElements;
    /**
     * To Initialize the control rendering.
     *
     * @returns {void}
     */
    protected render(): void;
    protected processRequestJsonData(): void;
    private processAjaxRequest;
    /**
     * This method is used to process the JSON data to render the maps.
     *
     * @param {string} processType - Specifies the process type in maps.
     * @param {any | string} data - Specifies the data for maps.
     * @param {LayerSettings} layer - Specifies the layer for the maps.
     * @param {string} dataType - Specifies the data type for maps.
     * @returns {void}
     * @private
     */
    processResponseJsonData(processType: string, data?: any | string, layer?: LayerSettings, dataType?: string): void;
    private renderMap;
    private triggerZoomEvent;
    /**
     * To apply color to the initial selected marker.
     *
     * @param {SelectionSettingsModel} selectionSettings - Specifies the selection settings
     * @param {Maps} map - Specifies the instance of the maps
     * @param {Element} targetElement - Specifies the target element
     * @param {object} data - Specifies the data
     * @returns {void}
     * @private
     */
    markerSelection(selectionSettings: SelectionSettingsModel, map: Maps, targetElement: Element, data: object): void;
    /**
     * initial selection of marker.
     *
     * @param {number} layerIndex - Specifies the layer index
     * @param {number} markerIndex - Specifies the marker index
     * @param {MarkerSettingsModel} markerSettings - Specifies the marker settings
     * @param {number} latitude - Specifies hte latitude
     * @param {number} longitude - Specifies the longitude
     * @returns {void}
     * @private
     */
    markerInitialSelection(layerIndex: number, markerIndex: number, markerSettings: MarkerSettingsModel, latitude: number, longitude: number): void;
    /**
     * Render the map area border.
     *
     * @returns {void}
     */
    private renderArea;
    /**
     * To add tab index for map element.
     *
     * @returns {void}
     */
    private addTabIndex;
    private setSecondaryElementPosition;
    private zoomingChange;
    private createSecondaryElement;
    /**
     * @returns {void}
     */
    getMinMaxLatitudeLongitude(): IMinMaxLatitudeLongitude;
    /**
     * @returns {void}
     * @private
     */
    arrangeTemplate(): void;
    private createTile;
    /**
     * To initilize the private varibales of maps.
     *
     * @returns {void}
     */
    private initPrivateVariable;
    private findBaseAndSubLayers;
    /**
     * Render the map border.
     *
     * @private
     * @returns {void}
     */
    private renderBorder;
    /**
     * Render the title and subtitle.
     *
     * @param {TitleSettingsModel} title - Specifies the title
     * @param {string} type - Specifies the type
     * @param {Rect} bounds - Specifies the bounds
     * @param {Element} groupEle - Specifies the group element
     * @returns {void}
     * @private
     */
    private renderTitle;
    /**
     * To create svg element for maps.
     *
     * @returns {void}
     */
    private createSVG;
    /**
     * To Remove the SVG.
     *
     * @returns {void}
     */
    private removeSvg;
    /**
     * To bind event handlers for maps.
     *
     * @returns {void}
     */
    private wireEVents;
    /**
     * To unbind event handlers from maps.
     *
     * @returns {void}
     */
    private unWireEVents;
    /**
     * This method is used to perform operations when mouse pointer leave from maps.
     *
     * @param {PointerEvent} e - Specifies the pointer event on maps.
     * @returns {void}
     * @private
     */
    mouseLeaveOnMap(e: PointerEvent): void;
    /**
     * This method is used to perform operations when keyboard key from maps.
     *
     * @param {KeyboardEvent} event - Specifies the keyboard event on maps.
     * @returns {void}
     * @private
     */
    keyUpHandler(event: KeyboardEvent): void;
    private keyboardHighlightSelection;
    /**
     * This method is used to perform operations when keyboard down from maps.
     *
     * @param {KeyboardEvent} event - Specifies the keyboard event on maps.
     * @returns {void}
     * @private
     */
    keyDownHandler(event: KeyboardEvent): void;
    /**
     * Gets the selected element to be maintained or not.
     *
     * @param {Element} targetEle - Specifies the target element
     * @returns {boolean} - Returns the boolean value
     * @private
     */
    SelectedElement(targetEle: Element): boolean;
    /**
     * This method is used to perform the operations when a click operation is performed on maps.
     *
     * @param {PointerEvent} e - Specifies the pointer event on maps.
     * @returns {void}
     * @private
     */
    mapsOnClick(e: PointerEvent): void;
    private clickHandler;
    private triggerShapeSelection;
    private getMarkerClickLocation;
    /**
     * Gets the location of the mouse click.
     *
     * @param {string} targetId - Specifies the ID for the target.
     * @param {number} pageX - Defines the page X position.
     * @param {number} pageY - Defines the page Y position.
     * @param {HTMLElement} targetElement - Specifies the target element on the event.
     * @param  {number} x - Defines the x position in pixel.
     * @param {number} y - Defines the y position in pixel.
     * @param {string} type -  Specifies the type.
     * @returns {GeoPosition} -  Returns the position of the event.
     * @private
     */
    getClickLocation(targetId: string, pageX: number, pageY: number, targetElement: HTMLElement, x: number, y: number, type?: string): GeoPosition;
    private removeTileMap;
    /**
     * This method is used to perform operations when mouse click on maps.
     *
     * @param {PointerEvent} e - Specifies the pointer event on maps.
     * @returns {boolean} - Returns the boolean value
     * @private
     */
    mouseEndOnMap(e: PointerEvent): boolean;
    /**
     * This method is used to perform operations when mouse is clicked down on maps.
     *
     * @param {PointerEvent} e - Specifies the pointer event on maps
     * @returns {void}
     * @private
     */
    mouseDownOnMap(e: PointerEvent): void;
    /**
     * Merges the marker clusters.
     *
     * @returns {void}
     * @private
     */
    mergeCluster(): void;
    /**
     * @param {PointerEvent} e - Specifies the pointer event.
     * @returns {void}
     * @private
     */
    mapsOnRightClick(e: PointerEvent): void;
    /**
     * This method is used to perform operations when performing the double click operation on maps.
     *
     * @param {PointerEvent} e - Specifies the pointer event.
     * @returns {void}
     * @private
     */
    mapsOnDoubleClick(e: PointerEvent): void;
    /**
     * This method is used to perform operations while performing mouse over on maps.
     *
     * @param {PointerEvent} e - Specifies the pointer event on maps.
     * @returns {void}
     * @private
     */
    mouseMoveOnMap(e: PointerEvent): void;
    /**
     * To check and trigger mouse move event on maps.
     *
     * @param {PointerEvent} e - Specifies the pointer event on maps.
     * @returns {void}
     * @private
     */
    private mouseMoveEvent;
    /**
     * This method is used to perform operations when mouse move event is performed on maps.
     *
     * @param {PointerEvent} e - Specifies the pointer event on maps.
     * @returns {void}
     * @private
     */
    onMouseMove(e: PointerEvent): boolean;
    private legendTooltip;
    private titleTooltip;
    mapsOnResize(e: Event): boolean;
    /**
     * This method is used to zoom the map by specifying the center position.
     *
     * @param {number} centerPosition - Specifies the location of the maps to be zoomed as geographical coordinates.
     * @param {number} centerPosition.longitude - Specifies the longitude of the location to be zoomed.
     * @param {number} centerPosition.latitude - Specifies the latitude of the location to be zoomed.
     * @param {number} zoomFactor - Specifies the zoom factor for the maps.
     * @returns {void}
     */
    zoomByPosition(centerPosition: {
        latitude: number;
        longitude: number;
    }, zoomFactor: number): void;
    /**
     * This method is used to perform panning by specifying the direction.
     *
     * @param {PanDirection} direction - Specifies the direction in which the panning must be performed.
     * @param {PointerEvent | TouchEvent} mouseLocation - Specifies the location of the mouse pointer in maps in pixels.
     * @returns {void}
     */
    panByDirection(direction: PanDirection, mouseLocation?: PointerEvent | TouchEvent): void;
    /**
     * This method is used to add the layers dynamically to the maps.
     *
     * @param {object} layer - Specifies the layer to be added in the maps.
     * @returns {void}
     */
    addLayer(layer: Object): void;
    /**
     * This method is used to remove a layer from the maps.
     *
     * @param {number} index - Specifies the index number of the layer to be removed.
     * @returns {void}
     */
    removeLayer(index: number): void;
    /**
     * This method is used to add markers dynamically in the maps.
     * If we provide the index value of the layer in which the marker to be added and the settings
     * of the marker as parameters, the marker will be added in the location.
     *
     * @param {number} layerIndex - Specifies the index number of the layer.
     * @param {MarkerSettingsModel[]} markerCollection - Specifies the settings of the marker to be added.
     * @returns {void}
     */
    addMarker(layerIndex?: number, markerCollection?: MarkerSettingsModel[]): void;
    /**
     * This method is used to select the geometric shape element in the maps.
     *
     * @param {number} layerIndex - Specifies the index of the layer in maps.
     * @param {string | string[]} propertyName - Specifies the property name from the data source.
     * @param {string} name - Specifies the name of the shape, which is mapped from the data source, that is selected.
     * @param {boolean} enable - Specifies whether the shape should be selected or the selection should be removed.
     * @returns {void}
     */
    shapeSelection(layerIndex: number, propertyName: string | string[], name: string, enable?: boolean): void;
    /**
     * This method is used to zoom the maps based on the provided coordinates.
     *
     * @param {number} minLatitude - Specifies the minimum latitude of the location to be zoomed.
     * @param {number} minLongitude - Specifies the minimum latitude of the location to be zoomed.
     * @param {number} maxLatitude - Specifies the maximum latitude of the location to be zoomed.
     * @param {number} maxLongitude - Specifies the maximum longitude of the location to be zoomed.
     * @returns {void}
     */
    zoomToCoordinates(minLatitude: number, minLongitude: number, maxLatitude: number, maxLongitude: number): void;
    /**
     * This method is used to remove multiple selected shapes in the maps.
     *
     * @returns {void}
     */
    private removeShapeSelection;
    /**
     * This method is used to set culture for maps.
     *
     * @returns {void}
     */
    private setCulture;
    /**
     * This method to set locale constants to the maps.
     *
     * @returns {void}
     */
    private setLocaleConstants;
    /**
     * This method destroys the maps. This method removes the events associated with the maps and disposes the objects created for rendering and updating the maps.
     *
     * @returns {void}
     */
    destroy(): void;
    /**
     * Gets component name.
     *
     * @returns {string} - Returns the string value
     * @private
     */
    getModuleName(): string;
    /**
     * Gets the properties to be maintained in the persisted state.
     *
     * @returns {string} - Returns the string value
     * @private
     */
    getPersistData(): string;
    /**
     * Called internally if any of the property value changed.
     *
     * @param {MapsModel} newProp - Specifies the new property
     * @param {MapsModel} oldProp - Specifies the old property
     * @returns {void}
     * @private
     */
    onPropertyChanged(newProp: MapsModel, oldProp: MapsModel): void;
    /**
     * To provide the array of modules needed for maps rendering.
     *
     * @returns {ModuleDeclaration[]} - Returns the modules
     * @private
     */
    requiredModules(): ModuleDeclaration[];
    /**
     * To find marker visibility.
     *
     * @returns {boolean} - Returns whether the markers are visible or not.
     */
    private isMarkersVisible;
    /**
     * To find DataLabel visibility.
     *
     * @returns {boolean} - Returns whether the data labels are visible or not.
     */
    private isDataLabelVisible;
    /**
     * To find navigation line visibility.
     *
     * @returns {boolean} - Returns whether the navigation lines are visible or not.
     */
    private isNavigationVisible;
    /**
     * To find navigation line visibility.
     *
     * @returns {boolean} - Returns whether the navigation lines are visible or not.
     */
    private isPolygonVisible;
    /**
     * To find marker visibility.
     *
     * @returns {boolean} - Returns whether the bubble is visible or not.
     */
    private isBubbleVisible;
    /**
     * To find the bubble visibility from layer.
     *
     * @param {LayerSettingsModel} layer - Spcifies the layer settings model
     * @returns {boolean} - Returns the boolean value
     * @private
     */
    getBubbleVisible(layer: LayerSettingsModel): boolean;
    /**
     * This method handles the printing functionality for the maps.
     *
     * @param {string[] | string | Element} id - Specifies the element to be printed.
     * @returns {void}
     */
    print(id?: string[] | string | Element): void;
    /**
     * This method handles the export functionality for the maps.
     *
     * @param {ExportType} type - Specifies the type of the exported file.
     * @param {string} fileName - Specifies the name of the file with which the rendered maps need to be exported.
     * @param {PdfPageOrientation} orientation - Specifies the orientation of the PDF document while exporting.
     * @param {boolean} allowDownload - Specifies whether to download as a file or get as base64 string for the file.
     * @returns {Promise<string>} - Specifies the base64 string of the exported image which is returned when the `allowDownload` is set to false.
     */
    export(type: ExportType, fileName: string, orientation?: PdfPageOrientation, allowDownload?: boolean): Promise<string>;
    /**
     * This method is used to get the Bing maps URL.
     *
     * @param {string} url - Specifies the URL of the Bing maps along with the API key.
     * @returns {Promise<string>} - Returns the processed Bing URL as `Promise`.
     */
    getBingUrlTemplate(url: string): Promise<string>;
    /**
     * To find visibility of layers and markers for required modules load.
     *
     * @param {LayerSettingsModel[]} layers - Specifies the layers.
     * @param {boolean} isLayerVisible - Specifies whether the layer is visible or not.
     * @param {boolean} isBubblevisible - Specifies whether the bubble is visible or not.
     * @param {boolean} istooltipVisible - Specifies whether the tooltip is visible or not.
     * @param {boolean} isSelection - Specifies whether the shape is selectd or not.
     * @param {boolean} isHighlight - Specfies whether the shape is highlighted or not.
     * @returns {object} - Returns the boolean values in object.
     */
    private findVisibleLayers;
    /**
     * This method is used to get the geographical coordinates for location points in pixels when shape maps are rendered in the maps.
     *
     * @param {number} layerIndex - Specifies the index number of the layer of the maps.
     * @param {number} x - Specifies the x value in pixel.
     * @param {number} y - Specifies the y value in pixel.
     * @returns {GeoPosition}- Returns the geographical coordinates.
     */
    getGeoLocation(layerIndex: number, x: number, y: number): GeoPosition;
    private clip;
    /**
     * This method is used to get the geographical coordinates for location points in pixels when an online map provider is rendered in the maps.
     *
     * @param {number} x - Specifies the x value in pixel.
     * @param {number} y - Specifies the y value in pixel.
     * @returns {GeoPosition} - Returns the geographical coordinates.
     */
    getTileGeoLocation(x: number, y: number): GeoPosition;
    /**
     * This method is used to convert the point in pixels to latitude and longitude in maps.
     *
     * @param {number} pageX - Specifies the x position value in pixels.
     * @param {number} pageY - Specifies the y position value in pixels.
     * @returns {object} - Returns the latitude and longitude values.
     */
    pointToLatLong(pageX: number, pageY: number): Object;
}
