/**
 * Circular Gauge
 */
import { Component, INotifyPropertyChanged } from '@syncfusion/ej2-base';
import { EmitType, Internationalization, ModuleDeclaration } from '@syncfusion/ej2-base';
import { SvgRenderer } from '@syncfusion/ej2-svg-base';
import { CircularGaugeModel } from './circular-gauge-model';
import { ILoadedEventArgs, IAnimationCompleteEventArgs } from './model/interface';
import { IThemeStyle } from './model/interface';
import { IAxisLabelRenderEventArgs, IRadiusCalculateEventArgs, IPointerDragEventArgs, IResizeEventArgs } from './model/interface';
import { ITooltipRenderEventArgs, ILegendRenderEventArgs, IAnnotationRenderEventArgs } from './model/interface';
import { IMouseEventArgs, IPrintEventArgs } from './model/interface';
import { Size, GaugeLocation, Rect } from './utils/helper-common';
import { GaugeTheme } from './utils/enum';
import { BorderModel, MarginModel, FontModel, TooltipSettingsModel } from './model/base-model';
import { Axis, Range, Pointer } from './axes/axis';
import { Annotations } from './annotations/annotations';
import { GaugeTooltip } from './user-interaction/tooltip';
import { AxisModel } from './axes/axis-model';
import { AxisLayoutPanel } from './axes/axis-panel';
import { Legend } from './legend/legend';
import { LegendSettingsModel } from './model/base-model';
import { PdfPageOrientation } from '@syncfusion/ej2-pdf-export';
import { ExportType } from '../circular-gauge/utils/enum';
import { PdfExport } from './model/pdf-export';
import { ImageExport } from './model/image-export';
import { Print } from './model/print';
import { Gradient } from './axes/gradient';
/**
 * Represents the circular gauge control. This is used to customize the properties of the circular gauge to visualize the data in circular scale.
 * ```html
 * <div id="gauge"/>
 * <script>
 *   var gaugeObj = new CircularGauge();
 *   gaugeObj.appendTo("#gauge");
 * </script>
 * ```
 */
export declare class CircularGauge extends Component<HTMLElement> implements INotifyPropertyChanged {
    /**
     * Sets and gets the module that is used to add annotation in the circular gauge.
     *
     * @private
     */
    annotationsModule: Annotations;
    /**
     * Sets and gets the module that is used to add Print in the circular gauge.
     *
     * @private
     */
    printModule: Print;
    /**
     * Sets and gets the module that is used to add ImageExport in the circular gauge.
     *
     * @private
     */
    imageExportModule: ImageExport;
    /**
     * Sets and gets the module that is used to add pdfExport in the circular gauge.
     *
     * @private
     */
    pdfExportModule: PdfExport;
    /**
     * Sets and gets the module that is used to show the tooltip in the circular gauge.
     *
     * @private
     */
    tooltipModule: GaugeTooltip;
    /**
     * Sets and gets the module that is used to manipulate and add legend to the circular gauge.
     *
     * @private
     */
    legendModule: Legend;
    /**
     * Sets and gets the module that enables the gradient option for pointer and ranges.
     *
     * @private
     */
    gradientModule: Gradient;
    /**
     * Sets and gets the width of the circular gauge as a string in order to provide input as both like '100px' or '100%'.
     * If specified as '100%, gauge will render to the full width of its parent element.
     *
     * @default null
     */
    width: string;
    /**
     * Sets and gets the height of the circular gauge as a string in order to provide input as both like '100px' or '100%'.
     * If specified as '100%, gauge will render to the full height of its parent element.
     *
     * @default null
     */
    height: string;
    /**
     * Sets and gets the options for customizing the style properties of the gauge border.
     */
    border: BorderModel;
    /**
     *
     */
    /**
     * Sets and gets the background color of the gauge. This property accepts value in hex code, rgba string as a valid CSS color string.
     *
     * @default null
     */
    background: string;
    /**
     * Sets and gets the title for circular gauge.
     *
     * @default ''
     */
    title: string;
    /**
     * Sets and gets the duration of animation in milliseconds in circular gauge.
     *
     * @default 0
     */
    animationDuration: number;
    /**
     * Sets and gets the options for customizing the title for circular gauge.
     */
    titleStyle: FontModel;
    /**
     * Sets and gets the options to customize the left, right, top and bottom margins of the circular gauge.
     */
    margin: MarginModel;
    /**
     * Sets and gets the options for customizing the axes of circular gauge.
     */
    axes: AxisModel[];
    /**
     * Sets and gets the options for customizing the tooltip of gauge.
     */
    tooltip: TooltipSettingsModel;
    /**
     * Enables and disables drag movement of the pointer in the circular gauge.
     *
     * @default false
     */
    enablePointerDrag: boolean;
    /**
     * Enables and disables the drag movement of the ranges in the circular gauge.
     *
     * @default false
     */
    enableRangeDrag: boolean;
    /**
     * Enables and disables the print functionality in circular gauge.
     *
     * @default false
     */
    allowPrint: boolean;
    /**
     * Enables and disables the export to image functionality in circular gauge.
     *
     * @default false
     */
    allowImageExport: boolean;
    /**
     * Enables and disables the export to pdf functionality in circular gauge.
     *
     * @default false
     */
    allowPdfExport: boolean;
    /**
     * Allow the range element to be rendered ahead of the axis element, when this property is set to "true".
     *
     * @default true
     */
    allowRangePreRender: boolean;
    /**
     * Sets and gets the X coordinate of the center of the circular gauge.
     *
     * @default null
     */
    centerX: string;
    /**
     * Sets and gets the Y coordinate of the center of the circular gauge.
     *
     * @default null
     */
    centerY: string;
    /**
     * Enables and disables placing the half or quarter circle in center, if `centerX` and `centerY` properties are not specified.
     *
     * @default false
     */
    moveToCenter: boolean;
    /**
     * Sets and gets the theme styles supported for circular gauge. When the theme is set, the styles associated with the theme will be set in the gauge.
     *
     * @default Material
     */
    theme: GaugeTheme;
    /**
     * Enables and disables the grouping separator should be used for a number.
     *
     * @default false
     */
    useGroupingSeparator: boolean;
    /**
     * Sets and gets the information about gauge for assistive technology.
     *
     * @default null
     */
    description: string;
    /**
     * Sets and gets the tab index value for the circular gauge.
     *
     * @default 0
     */
    tabIndex: number;
    /**
     * Enables or disables the ability of the gauge to be rendered to the complete width. The left, right, top and bottom spacing will not be considered in the gauge when this property is disabled.
     *
     * @default true
     */
    allowMargin: boolean;
    /**
     * Sets and gets the options for customizing the legend of the circular gauge.
     */
    legendSettings: LegendSettingsModel;
    /**
     * Triggers after the circular gauge gets loaded.
     *
     * @event loaded
     */
    loaded: EmitType<ILoadedEventArgs>;
    /**
     * Triggers before the circular gauge gets loaded.
     *
     * @event load
     */
    load: EmitType<ILoadedEventArgs>;
    /**
     * Triggers after the animation gets completed for pointers.
     *
     * @event animationComplete
     */
    animationComplete: EmitType<IAnimationCompleteEventArgs>;
    /**
     * Triggers before each axis label gets rendered.
     *
     * @event axisLabelRender
     */
    axisLabelRender: EmitType<IAxisLabelRenderEventArgs>;
    /**
     * Triggers before the radius for the circular gauge gets calculated.
     *
     * @event radiusCalculate
     */
    radiusCalculate: EmitType<IRadiusCalculateEventArgs>;
    /**
     * Triggers before each annotation for the circular gauge gets rendered.
     *
     * @event annotationRender
     */
    annotationRender: EmitType<IAnnotationRenderEventArgs>;
    /**
     * Triggers before each legend for the circular gauge gets rendered.
     *
     * @event legendRender
     * @deprecated
     */
    legendRender: EmitType<ILegendRenderEventArgs>;
    /**
     * Triggers before the tooltip for pointer of the circular gauge gets rendered.
     *
     * @event tooltipRender
     */
    tooltipRender: EmitType<ITooltipRenderEventArgs>;
    /**
     * Triggers before the pointer is dragged.
     *
     * @event dragStart
     */
    dragStart: EmitType<IPointerDragEventArgs>;
    /**
     * Triggers while dragging the pointers.
     *
     * @event dragMove
     */
    dragMove: EmitType<IPointerDragEventArgs>;
    /**
     * Triggers after the pointer is dragged.
     *
     * @event dragEnd
     */
    dragEnd: EmitType<IPointerDragEventArgs>;
    /**
     * Triggers on hovering the circular gauge.
     *
     * @event gaugeMouseMove
     */
    gaugeMouseMove: EmitType<IMouseEventArgs>;
    /**
     * Triggers while cursor leaves the circular gauge.
     *
     * @event gaugeMouseLeave
     */
    gaugeMouseLeave: EmitType<IMouseEventArgs>;
    /**
     * Triggers on mouse down.
     *
     * @event gaugeMouseDown
     */
    gaugeMouseDown: EmitType<IMouseEventArgs>;
    /**
     * Triggers when mouse up action is performed over the circular gauge.
     *
     * @event gaugeMouseUp
     */
    gaugeMouseUp: EmitType<IMouseEventArgs>;
    /**
     * Triggers to notify the resize of the circular gauge when the window is resized.
     *
     * @event resized
     */
    resized: EmitType<IResizeEventArgs>;
    /**
     * Triggers before the prints gets started.
     *
     * @event beforePrint
     */
    beforePrint: EmitType<IPrintEventArgs>;
    /** @private */
    renderer: SvgRenderer;
    /** @private */
    loadingAnimationDuration: number[];
    /** @private */
    allowLoadingAnimation: boolean;
    /** @private */
    svgObject: Element;
    /** @private */
    availableSize: Size;
    /** @private */
    intl: Internationalization;
    /** @private */
    private resizeTo;
    /** @private */
    midPoint: GaugeLocation;
    /** @private */
    activePointer: Pointer;
    /** @private */
    activeAxis: Axis;
    /** @private */
    activeRange: Range;
    /** @private */
    gaugeRect: Rect;
    /** @private */
    animatePointer: boolean;
    /** @private */
    startValue: number;
    /** @private */
    endValue: number;
    /** @private */
    private isRangeUpdate;
    /** @private */
    centerXpoint: string;
    /** @private */
    centerYpoint: string;
    /** @private */
    allowComponentRender: boolean;
    /** @private */
    private clearTimeout;
    /** @private */
    isPropertyChange: boolean;
    /** @private */
    isAnimationProgress: boolean;
    /** @private */
    isResize: boolean;
    /** @private */
    isOverAllAnimationComplete: boolean;
    private resizeEvent;
    /**
     * Render axis panel for gauge.
     *
     * @hidden
     * @private
     */
    gaugeAxisLayoutPanel: AxisLayoutPanel;
    /**
     * @private
     */
    themeStyle: IThemeStyle;
    /** @private */
    isDrag: boolean;
    /** @private */
    isTouch: boolean;
    /** @private */
    mouseX: number;
    /** @private */
    mouseY: number;
    /** @private */
    allowPointerDrag: boolean;
    /** @private */
    isPointerDragged: boolean;
    /**
     * @private
     */
    gradientCount: number;
    /**
     * Constructor for creating the widget
     *
     * @param {CircularGaugeModel} options - Specifies the options
     * @param {string} element - Specifies the element
     * @hidden
     */
    constructor(options?: CircularGaugeModel, element?: string | HTMLElement);
    /**
     * To create svg object, renderer and binding events for the container.
     *
     * @returns {void}
     */
    protected preRender(): void;
    /**
     * To render the circular gauge elements
     *
     * @returns {void}
     */
    protected render(): void;
    private setTheme;
    /**
     * Method to unbind events for circular gauge
     *
     * @returns {void}
     */
    private unWireEvents;
    /**
     * Method to bind events for circular gauge
     *
     * @returns {void}
     */
    private wireEvents;
    /**
     * Handles the mouse click on accumulation chart.
     *
     * @param {PointerEvent} e - Specifies the pointer event
     * @returns {boolean} - Returns the boolean value
     * @private
     */
    gaugeOnMouseClick(e: PointerEvent): boolean;
    /**
     * Handles the mouse move.
     *
     * @param {PointerEvent} e - Specifies the pointer event
     * @returns {boolean} - Returns the boolean value
     * @private
     */
    mouseMove(e: PointerEvent): boolean;
    /**
     * Handles the mouse leave.
     *
     * @param {PointerEvent} e - Specifies the pointer event
     * @returns {boolean} - Returns the boolean value
     * @private
     */
    mouseLeave(e: PointerEvent): boolean;
    /**
     * Handles the mouse right click.
     *
     * @param {MouseEvent | PointerEvent} event - Specifies the pointer or mouse event.
     * @returns {boolean} - Returns the boolean value.
     * @private
     */
    gaugeRightClick(event: MouseEvent | PointerEvent): boolean;
    /**
     * Handles the pointer draf while mouse move on gauge.
     *
     * @param {GaugeLocation} location - Specifies the location of the gauge
     * @param {number} axisIndex - Specifies the axis index
     * @param {number} pointerIndex - Specifies the pointer index
     * @returns {void}
     * @private
     */
    pointerDrag(location: GaugeLocation, axisIndex?: number, pointerIndex?: number): void;
    /**
     * Handles the range draf while mouse move on gauge.
     *
     * @param {GaugeLocation} location - Specifies the gauge location
     * @param {number} axisIndex - Specifies the axis index
     * @param {number} rangeIndex - Specifies the range index
     * @returns {void}
     * @private
     */
    rangeDrag(location: GaugeLocation, axisIndex: number, rangeIndex: number): void;
    /**
     * Handles the mouse down on gauge.
     *
     * @param {PointerEvent} e - Specifies the pointer event
     * @returns {boolean} - Returns the boolean value
     * @private
     */
    gaugeOnMouseDown(e: PointerEvent): boolean;
    /**
     * Handles the mouse end.
     *
     * @param {PointerEvent} e - Specifies the pointer event
     * @returns {boolean} - Returns the boolean value
     * @private
     */
    mouseEnd(e: PointerEvent): boolean;
    /**
     * Handles the mouse event arguments.
     *
     * @param {PointerEvent} e - Specifies the pointer event
     * @param {string} type - Specifies the type
     * @param {string} name - Specifies the name
     * @returns {IMouseEventArgs} - Returns the mouse event args
     * @private
     */
    private getMouseArgs;
    /**
     * Handles the gauge resize.
     *
     * @param {Event} e - Specifies the event
     * @returns {boolean} - Returns the boolean value
     * @private
     */
    gaugeResize(e: Event): boolean;
    /**
     * Applying styles for circular gauge elements
     *
     * @param {HTMLElement} element - Specifies the html element
     * @returns {void}
     */
    private setGaugeStyle;
    /**
     * Method to set culture for gauge
     *
     * @returns {void}
     */
    private setCulture;
    /**
     * Methods to create svg element for circular gauge.
     *
     * @returns {void}
     */
    private createSvg;
    /**
     * To Remove the SVG from circular gauge.
     *
     * @returns {void}
     * @private
     */
    removeSvg(): void;
    /**
     * To initialize the circular gauge private variable.
     *
     * @returns {void}
     * @private
     */
    private initPrivateVariable;
    /**
     * To calculate the size of the circular gauge element.
     *
     * @returns {void}
     */
    private calculateSvgSize;
    /**
     * To calculate the spacing of the circular gauge element.
     *
     * @param {number} top - Specifies the top value
     * @param {number} left - Specifies the left value
     * @param {number} width - Specifies the width
     * @param {number} height - Specifies the height
     * @param {number} radius - Specifies the radius
     * @param {number} titleHeight - Specifies the titleHeight
     * @param {number} isUpperAngle - Specifies the isUpperAngle
     * @param {number} isLowerAngle - Specifies the isLowerAngle
     * @param {number} isFullPercent - Specifies the boolean value
     * @param {number} isUpper - Specifies the boolean value
     * @param {number} isLower - Specifies the boolean value
     * @returns {void}
     */
    private radiusAndCenterCalculation;
    /**
     * Method to calculate the availble size for circular gauge.
     *
     * @returns {void}
     */
    private calculateBounds;
    /**
     * To render elements for circular gauge
     *
     * @param {boolean} animate - Specifies whether animation is true or false
     * @returns {void}
     */
    private renderElements;
    private renderAnimation;
    /**
     * Method to render legend for accumulation chart
     *
     * @returns {void}
     */
    private renderLegend;
    /**
     * Method to render the title for circular gauge.
     *
     * @returns {void}
     */
    private renderTitle;
    /**
     * Method to render the border for circular gauge.
     *
     * @returns {void}
     */
    private renderBorder;
    /**
     * This method is used to set the pointer value dynamically for circular gauge.
     *
     * @param {number} axisIndex - Specifies the index value for the axis in circular gauge.
     * @param {number} pointerIndex - Specifies the index value for the pointer in circular gauge.
     * @param {number} value - Specifies the value for the pointer in circular gauge.
     */
    setPointerValue(axisIndex: number, pointerIndex: number, value: number): void;
    /**
     * This method is used to set the annotation content dynamically for circular gauge.
     *
     * @param {number} axisIndex - Specifies the index value for the axis in circular gauge.
     * @param {number} annotationIndex - Specifies the index value for the annotation in circular gauge.
     * @param {string | Function} content - Specifies the content for the annotation in circular gauge.
     * @returns {void}
     */
    setAnnotationValue(axisIndex: number, annotationIndex: number, content: string | Function): void;
    /**
     * This method is used to print the rendered circular gauge.
     *
     * @param {string[] | string | Element} id - Specifies the element to print the circular gauge.
     */
    print(id?: string[] | string | Element): void;
    /**
     * This method is used to perform the export functionality for the circular gauge.
     *
     * @param {ExportType} type - Specifies the type of the export.
     * @param {string} fileName - Specifies the file name for the exported file.
     * @param {PdfPageOrientation}  orientation - Specifies the orientation for the exported PDF document.
     * @param {boolean} allowDownload - Specifies whether to download as a file.
     * @returns {Promise<string>} - Specifies the base64 string of the exported image which is returned when the allowDownload is set to false.
     */
    export(type: ExportType, fileName: string, orientation?: PdfPageOrientation, allowDownload?: boolean): Promise<string>;
    /**
     * Method to set mouse x, y from events
     *
     * @param {PointerEvent} e - Specifies the pointer event
     * @returns {void}
     */
    private setMouseXY;
    /**
     * This method is used to set the range values dynamically for circular gauge.
     *
     * @param {number} axisIndex - Specifies the index value for the axis in circular gauge.
     * @param {number} rangeIndex - Specifies the index value for the range in circular gauge.
     * @param {number} start - Specifies the start value for the current range in circular gauge.
     * @param {number} end - Specifies the end value for the current range in circular gauge.
     */
    setRangeValue(axisIndex: number, rangeIndex: number, start: number, end: number): void;
    /**
     * This method destroys the circular gauge. This method removes the events associated with the circular gauge and disposes the objects created for rendering and updating the circular gauge.
     *
     * @method destroy
     * @return {void}
     * @member of Circular-Gauge
     */
    destroy(): void;
    /**
     * To provide the array of modules needed for control rendering
     *
     * @returns {ModuleDeclaration[]} - Returns the modules
     * @private
     */
    requiredModules(): ModuleDeclaration[];
    /**
     * Get the properties to be maintained in the persisted state.
     *
     * @returns {string} - Returns the string
     * @private
     */
    getPersistData(): string;
    /**
     * Called internally if any of the property value changed.
     *
     * @param {CircularGaugeModel} newProp - Specifies the new property
     * @param {CircularGaugeModel} oldProp - Specifies the old property
     * @returns {void}
     * @private
     */
    onPropertyChanged(newProp: CircularGaugeModel, oldProp: CircularGaugeModel): void;
    /**
     * Get component name for circular gauge
     *
     * @returns {string} - Returns the module name
     * @private
     */
    getModuleName(): string;
}
