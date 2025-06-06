import { ChildProperty } from '@syncfusion/ej2-base';
import { Point3D } from '../../common/utils/helper';
import { BaseTooltip } from '../../common/user-interaction/tooltip';
import { Chart3D } from '../chart3D';
import { Chart3DFadeOutMode } from '../model/chart3d-Interface';
import { BorderModel, FontModel, LocationModel } from '../../common/model/base-model';
/**
 * Configures the ToolTips in the chart.
 *
 * @public
 */
export declare class Chart3DTooltipSettings extends ChildProperty<Chart3DTooltipSettings> {
    /**
     * If set to true, enables the tooltip for the data points.
     *
     * @default false.
     */
    enable: boolean;
    /**
     * If set to true, enables the marker in the chart tooltip.
     *
     * @default true.
     */
    enableMarker: boolean;
    /**
     * The fill color of the tooltip, specified as a valid CSS color string in hex or rgba format.
     *
     * @default null
     */
    fill: string;
    /**
     * The header text for the tooltip. By default, it displays the series name.
     *
     * @default null
     */
    header: string;
    /**
     * The opacity of the tooltip, expressed as a numerical value.
     *
     * @default null
     */
    opacity: number;
    /**
     * Options for customizing the tooltip text appearance.
     */
    textStyle: FontModel;
    /**
     * The format for customizing the tooltip content.
     *
     * @default null.
     */
    format: string;
    /**
     * A custom template used to format the Tooltip content. You can use ${x} and ${y} as placeholder text to display the corresponding data points.
     *
     * @default null.
     * @aspType string
     */
    template: string | Function;
    /**
     * If set to true, tooltip will animate while moving from one point to another.
     *
     * @default true.
     */
    enableAnimation: boolean;
    /**
     * Duration for the Tooltip animation.
     *
     * @default 300
     */
    duration: number;
    /**
     * Duration of the fade-out animation for hiding the Tooltip.
     *
     * @default 1000
     */
    fadeOutDuration: number;
    /**
     * Fade Out duration for the Tooltip hide.
     *
     * @default Move
     */
    fadeOutMode: Chart3DFadeOutMode;
    /**
     * To wrap the tooltip long text based on available space.
     * This is only application for chart tooltip.
     *
     * @default false
     */
    enableTextWrap: boolean;
    /**
     * Options for customizing the tooltip borders.
     */
    border: BorderModel;
    /**
     * Specifies the location of the tooltip, relative to the chart.
     * If x is 20, tooltip moves by 20 pixels to the right of the chart
     * ```html
     * <div id='Chart'></div>
     * ```
     * ```typescript
     * let chart: Chart = new Chart({
     * ...
     * tooltipSettings: {
     * enable: true,
     * location: { x: 100, y: 150 },
     *   },
     * ...
     * });
     * chart.appendTo('#Chart');
     * ```
     */
    location: LocationModel;
}
/**
 * The `Tooltip` module is used to render the tooltip for chart series.
 */
export declare class Tooltip3D extends BaseTooltip {
    chart3D: Chart3D;
    /**
     * Constructor for tooltip module.
     *
     * @param {Chart3D} chart - Specifies the chart instance
     * @private
     */
    constructor(chart: Chart3D);
    /**
     *  tooltip timer ID.
     */
    private timerId;
    /**
     * Adds event listeners for handling mouse and touch events on the chart.
     *
     * @returns {void}
     * @private
     */
    private addEventListener;
    /**
     * Unbinding events for selection module.
     *
     * @returns {void}
     */
    private removeEventListener;
    /**
     * Handles the mouse up event for the 3D chart.
     *
     * @param {MouseEvent | PointerEvent | TouchEvent} event - The mouse or touch event.
     * @returns {void}
     * @private
     */
    private mouseUpHandler;
    /**
     * Handles the mouse leave event for the 3D chart.
     *
     * @returns {void}
     * @private
     */
    private mouseLeaveHandler;
    /**
     * Handles the mouse move event for the 3D chart.
     *
     * @param {MouseEvent | PointerEvent | TouchEvent} event - The mouse move event.
     * @returns {void}
     * @public
     */
    mouseMoveHandler(event: MouseEvent | PointerEvent | TouchEvent): void;
    /**
     * Handles the long press on chart.
     *
     * @returns {boolean} false
     * @private
     */
    private longPress;
    private styleAdded;
    /**
     * To create Tooltip styles for series
     *
     * @returns {void}
     */
    seriesStyles(): void;
    /**
     * Handles the tooltip display for the 3D chart.
     *
     * @param {MouseEvent | PointerEvent | TouchEvent | KeyboardEvent} e - The event triggering the tooltip display.
     * @returns {void}
     * @public
     */
    tooltip(e: MouseEvent | PointerEvent | TouchEvent | KeyboardEvent): void;
    /**
     * Finds the header for the tooltip based on the provided Point3D.
     *
     * @param {Point3D} data - The Point3D used to find the header.
     * @returns {string} - The header for the tooltip.
     * @private
     */
    findHeader(data: Point3D): string;
    /**
     * Renders the tooltip for the series in the 3D chart.
     *
     * @param {Chart3D} chart - The 3D chart instance.
     * @param {boolean} isFirst - A boolean indicating whether it is the first series.
     * @param {HTMLDivElement} tooltipDiv - The tooltip div element.
     * @param {MouseEvent | PointerEvent | TouchEvent | KeyboardEvent} e - The event that triggered the tooltip.
     * @returns {void}
     * @private
     */
    private renderSeriesTooltip;
    /**
     * Triggers the rendering of the tooltip with the specified point and text information.
     *
     * @param {Point3D} point - The data point for which the tooltip is triggered.
     * @param {boolean} isFirst - A boolean indicating whether it is the first series.
     * @param {string} textCollection - The text information to be displayed in the tooltip.
     * @param {string} headerText - The header text for the tooltip.
     * @returns {void}
     * @private
     */
    triggerTooltipRender(point: Point3D, isFirst: boolean, textCollection: string, headerText: string): void;
    /**
     * Applies a blur effect to the specified series while removing the effect from others.
     *
     * @param {Chart3DSeries[]} visibleSeries - The array of visible series in the 3D chart.
     * @param {Chart3DSeries} tooltipSeries - The series associated with the tooltip.
     * @returns {void}
     * @private
     */
    private blurEffect;
    private removeBlurEffect;
    /**
     * Gets the location of the symbol based on the current mouse position in the chart.
     *
     * @param {Point3D} point - The tooltip point.
     * @returns {ChartLocation} - The location of the tooltip.
     * @private
     */
    private getSymbolLocation;
    /**
     * Gets the tooltip text based on the provided point data.
     *
     * @param {Point3D} pointData - The data of the point for which the tooltip is generated.
     * @returns {string} - The tooltip text.
     * @private
     */
    getTooltipText(pointData: Point3D): string;
    /**
     * Gets the template text based on the provided data.
     *
     * @param {Point3D} data - The data object for which the template text is generated.
     * @returns {Chart3DPoint | Chart3DPoint[]} - The template text.
     * @private
     */
    private getTemplateText;
    /**
     * Finds the mouse value based on the provided data and chart.
     *
     * @param {Point3D} data - The data object containing information about the point.
     * @param {Chart3D} chart - The Chart3D instance.
     * @returns {void}
     * @private
     */
    private findMouseValue;
    /**
     * Parses the template using the provided point, series, format, xAxis, and yAxis information.
     *
     * @param {Chart3DPoint} point - The point for which the template needs to be parsed.
     * @param {Chart3DSeries} series - The series associated with the point.
     * @param {string} format - The format string.
     * @param {Chart3DAxis} xAxis - The X-axis of the chart.
     * @param {Chart3DAxis} yAxis - The Y-axis of the chart.
     * @returns {string} - The parsed template string.
     * @private
     */
    private parseTemplate;
    /**
     * Formats the point value based on the provided point, axis, dataValue, and other flags.
     *
     * @param {Chart3DPoint} point - The point for which the value needs to be formatted.
     * @param {Chart3DAxis} axis - The axis associated with the point.
     * @param {string} dataValue - The data value to be formatted.
     * @param {boolean} isXPoint - Indicates whether the point is on the X-axis.
     * @param {boolean} isYPoint - Indicates whether the point is on the Y-axis.
     * @returns {string} - The formatted point value.
     * @private
     */
    private formatPointValue;
    /**
     * Gets the format for the tooltip based on the provided chart and series.
     *
     * @param {Chart3D} chart - The 3D chart instance.
     * @param {Chart3DSeries} series - The 3D series for which the tooltip format is needed.
     * @returns {string} - The tooltip format.
     * @private
     */
    private getFormat;
    /**
     * Gets the 3D data (point and series) associated with the provided event in the chart.
     *
     * @param {MouseEvent | PointerEvent | TouchEvent | KeyboardEvent} event - The event for which to retrieve 3D data.
     * @returns {Point3D} - The 3D data object containing the point and series information.
     * @private
     */
    get3dData(event: MouseEvent | PointerEvent | TouchEvent | KeyboardEvent): Point3D;
    /**
     * Finds data based on the provided 3D data and the previous 3D data.
     *
     * @param {Point3D} data - The current 3D data.
     * @param {Point3D} previous - The previous 3D data.
     * @returns {boolean} - Returns true if the data is found based on the conditions.
     * @private
     */
    private findData;
    /**
     * Gets the module name.
     *
     * @returns {string} - The module name.
     */
    protected getModuleName(): string;
    /**
     * To destroy the tooltip.
     *
     * @returns {void}
     * @private
     */
    destroy(): void;
}
