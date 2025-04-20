import { Component, Property, NotifyPropertyChanges, Internationalization, ModuleDeclaration, animationMode } from '@syncfusion/ej2-base';import { EmitType, INotifyPropertyChanged, Browser } from '@syncfusion/ej2-base';import { Event, EventHandler, Complex, Collection, isNullOrUndefined, remove, createElement, Animation, AnimationOptions } from '@syncfusion/ej2-base';import { Border, Font, Container, Margin, Annotation, TooltipSettings } from './model/base';import { FontModel, BorderModel, ContainerModel, MarginModel, AnnotationModel, TooltipSettingsModel } from './model/base-model';import { AxisModel, PointerModel} from './axes/axis-model';import { Axis, Pointer } from './axes/axis';import { load, loaded, gaugeMouseMove, gaugeMouseLeave, gaugeMouseDown, gaugeMouseUp, resized, valueChange } from './model/constant';import { ILoadedEventArgs, ILoadEventArgs, IAnimationCompleteEventArgs, IAnnotationRenderEventArgs } from './model/interface';import { ITooltipRenderEventArgs, IVisiblePointer, IMouseEventArgs, IAxisLabelRenderEventArgs, IMoveCursor } from './model/interface';import { IResizeEventArgs, IValueChangeEventArgs, IThemeStyle, IPrintEventArgs, IPointerDragEventArgs } from './model/interface';import { Size, valueToCoefficient, calculateShapes, calculateTextPosition, removeElement, getElement, VisibleRange, getExtraWidth, stringToNumberSize } from './utils/helper';import { measureText, Rect, TextOption, textElement, GaugeLocation, RectOption, PathOption } from './utils/helper';import { getBox, withInRange, getPointer, convertPixelToValue, textTrim, showTooltip, removeTooltip } from './utils/helper';import { Orientation, LinearGaugeTheme, LabelPlacement } from './utils/enum';import { dragEnd, dragMove, dragStart } from './model/constant';import { AxisLayoutPanel } from './axes/axis-panel';import { SvgRenderer } from '@syncfusion/ej2-svg-base';import { AxisRenderer } from './axes/axis-renderer';import { Annotations } from './annotations/annotations';import { GaugeTooltip } from './user-interaction/tooltip';import { getThemeStyle } from './model/theme';import { PdfPageOrientation } from '@syncfusion/ej2-pdf-export';import { ExportType } from '../linear-gauge/utils/enum';import { Print } from './model/print';import { PdfExport } from './model/pdf-export';import { ImageExport } from './model/image-export';import { Gradient } from './axes/gradient';
import {ComponentModel} from '@syncfusion/ej2-base';

/**
 * Interface for a class LinearGauge
 */
export interface LinearGaugeModel extends ComponentModel{

    /**
     * Specifies the width of the linear gauge as a string in order to provide input as both like '100px' or '100%'.
     * If specified as '100%, gauge will render to the full width of its parent element.
     *
     * @default null
     */

    width?: string;

    /**
     * Enables or disables the ability of the gauge to be rendered to the complete width. The left, right, top and bottom spacing will not be considered in the gauge when this property is disabled.
     *
     * @default true
     */
    allowMargin?: boolean;

    /**
     * Specifies the height of the linear gauge as a string in order to provide input as both like '100px' or '100%'.
     * If specified as '100%, gauge will render to the full height of its parent element.
     *
     * @default null
     */

    height?: string;

    /**
     * Defines the duration of the loading animation in linear gauge, which animates the
     * axis line, ticks, axis labels, ranges, pointers, and annotations. The value of this property will be in milliseconds.
     *
     * @default 0
     */

    animationDuration?: number;

    /**
     * Specifies the orientation of the rendering of the linear gauge.
     *
     * @default Vertical
     */
    orientation?: Orientation;

    /**
     * Specifies the placement of the label in linear gauge.
     *
     * @default None
     */
    edgeLabelPlacement?: LabelPlacement;

    /**
     * Enables or disables the print functionality in linear gauge.
     *
     * @default false
     */
    allowPrint?: boolean;

    /**
     * Enables or disables the export to image functionality in linear gauge.
     *
     * @default false
     */
    allowImageExport?: boolean;

    /**
     * Enables or disables the export to PDF functionality in linear gauge.
     *
     * @default false
     */
    allowPdfExport?: boolean;

    /**
     * Specifies the options to customize the margins of the linear gauge.
     */

    margin?: MarginModel;

    /**
     * Specifies the options for customizing the style properties of the border for linear gauge.
     */

    border?: BorderModel;

    /**
     * Specifies the background color of the gauge. This property accepts value in hex code, rgba string as a valid CSS color string.
     *
     * @default 'transparent'
     */
    background?: string;

    /**
     * Specifies the title for linear gauge.
     */

    title?: string;

    /**
     * Specifies the options for customizing the appearance of title for linear gauge.
     */

    titleStyle?: FontModel;

    /**
     * Specifies the options for customizing the container in linear gauge.
     */

    container?: ContainerModel;

    /**
     * Specifies the options for customizing the axis in linear gauge.
     */

    axes?: AxisModel[];

    /**
     * Specifies the options for customizing the tooltip in linear gauge.
     */

    tooltip?: TooltipSettingsModel;

    /**
     * Specifies the options for customizing the annotation of linear gauge.
     */
    annotations?: AnnotationModel[];

    /**
     * Specifies the color palette for axis ranges in linear gauge.
     *
     * @default []
     */
    rangePalettes?: string[];

    /**
     * Enables or disables a grouping separator should be used for a number.
     *
     * @default false
     */
    useGroupingSeparator?: boolean;

    /**
     * Sets and gets the information about gauge for assistive technology.
     *
     * @default null
     */
    description?: string;

    /**
     * Specifies the tab index value for the linear gauge.
     *
     * @default 0
     */
    tabIndex?: number;

    /**
     * Specifies the format to apply for internationalization in linear gauge.
     *
     * @default null
     */
    format?: string;

    /**
     * Sets and gets the theme styles supported for linear gauge. When the theme is set, the styles associated with the theme will be set in the gauge.
     *
     * @default Material
     */
    theme?: LinearGaugeTheme;

    /**
     * Triggers after the gauge gets rendered.
     *
     * @event loaded
     */
    loaded?: EmitType<ILoadedEventArgs>;

    /**
     * Triggers before the gauge gets rendered.
     *
     * @event load
     */
    load?: EmitType<ILoadEventArgs>;

    /**
     * Triggers after completing the animation for pointer.
     *
     * @event animationComplete
     */
    animationComplete?: EmitType<IAnimationCompleteEventArgs>;

    /**
     * Triggers before each axis label gets rendered.
     *
     * @event axisLabelRender
     */
    axisLabelRender?: EmitType<IAxisLabelRenderEventArgs>;

    /**
     * Triggers before the pointer is dragged.
     *
     * @event dragStart
     */

    dragStart?: EmitType<IPointerDragEventArgs>;

    /**
     * Triggers while dragging the pointers.
     *
     * @event dragMove
     */

    dragMove?: EmitType<IPointerDragEventArgs>;

    /**
     * Triggers after the pointer is dragged.
     *
     * @event dragEnd
     */
    dragEnd?: EmitType<IPointerDragEventArgs>;

    /**
     * Triggers before each annotation gets rendered.
     *
     * @event annotationRender
     */
    annotationRender?: EmitType<IAnnotationRenderEventArgs>;

    /**
     * Triggers before the tooltip get rendered.
     *
     * @event tooltipRender
     * @deprecated
     */

    tooltipRender?: EmitType<ITooltipRenderEventArgs>;

    /**
     * Triggers when performing the mouse move operation on gauge area.
     *
     * @event gaugeMouseMove
     */

    gaugeMouseMove?: EmitType<IMouseEventArgs>;

    /**
     * Triggers when performing the mouse leave operation from the gauge area.
     *
     * @event gaugeMouseLeave
     */

    gaugeMouseLeave?: EmitType<IMouseEventArgs>;

    /**
     * Triggers when performing the mouse down operation on gauge area.
     *
     * @event gaugeMouseDown
     */

    gaugeMouseDown?: EmitType<IMouseEventArgs>;

    /**
     * Triggers when performing mouse up operation on gauge area.
     *
     * @event gaugeMouseUp
     */

    gaugeMouseUp?: EmitType<IMouseEventArgs>;

    /**
     * Triggers while changing the value of the pointer by UI interaction.
     *
     * @event valueChange
     */

    valueChange?: EmitType<IValueChangeEventArgs>;

    /**
     * Triggers to notify the resize of the linear gauge when the window is resized.
     *
     * @event resized
     */

    resized?: EmitType<IResizeEventArgs>;

    /**
     * Triggers before the print functionality gets started.
     *
     * @event beforePrint
     */

    beforePrint?: EmitType<IPrintEventArgs>;

}