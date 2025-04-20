import { CircularGauge } from '../circular-gauge';
/**
 * Sets and gets the module that handles the tooltip of the circular gauge
 *
 * @hidden
 */
export declare class GaugeTooltip {
    private gauge;
    private tooltipEle;
    private currentAxis;
    private tooltip;
    private currentPointer;
    private currentRange;
    private currentAnnotation;
    private svgTooltip;
    private tooltipId;
    private gaugeId;
    private tooltipPosition;
    private arrowInverted;
    private tooltipRect;
    private clearTimeout;
    private pointerEle;
    private annotationTargetElement;
    /**
     * Constructor for Tooltip module.
     *
     * @param {CircularGauge} gauge - Specifies the instance of the gauge.
     * @private.
     */
    constructor(gauge: CircularGauge);
    /**
     * Method to render the tooltip for circular gauge.
     *
     * @param {PointerEvent} e - specifies the event argument.
     * @returns {void}
     *
     * @private
     */
    renderTooltip(e: PointerEvent): void;
    /**
     * Method to create tooltip svg element.
     *
     * @param {Tooltip} svgTooltip - Specifies the tooltip element.
     * @param {ITooltipRenderEventArgs} tooltipArg - Specifies the tooltip arguments.
     * @param {string} template - Specifies the tooltip template.
     * @param {boolean} arrowInverted - Specifies the boolean value.
     * @param {Rect} tooltipRect - Specifies the rect element.
     * @param {CircularGauge} gauge - Specifies the gauge instance.
     * @param {string} fill - Spcifies the fill color of the tooltip.
     * @param {FontModel} textStyle - Spcifies the text style of the tooltip.
     * @param {BorderModel} border - Specifies the border of the tooltip.
     * @returns {Tooltip} - Returns the tooltip.
     */
    private svgTooltipCreate;
    /**
     * Method to create or modify tolltip element.
     *
     * @returns {void}
     */
    private tooltipElement;
    /**
     * Method to get parent annotation element.
     *
     * @param {Element} child - Specifies the annotation element.
     * @returns {boolean} - Returns the boolean value.
     */
    private checkParentAnnotationId;
    /**
     * Method to apply label rounding places.
     *
     * @param {number} currentValue - Specifies the current value.
     * @returns {number} - Returns the round number.
     */
    private roundedValue;
    /**
     * Method to find the position of the tooltip anchor for circular gauge.
     *
     * @param {Rect} rect - Specifies the rect element.
     * @param {number} angle - Specifies the angle.
     * @param {GaugeLocation} location - Specifies the location.
     * @param {boolean} isTemplate - whether it is template or not .
     * @returns {Rect} - Returns the rect element.
     */
    private findPosition;
    removeTooltip(): boolean;
    mouseUpHandler(e: PointerEvent): void;
    /**
     * To bind events for tooltip module
     *
     * @private
     */
    addEventListener(): void;
    /**
     * To unbind events for tooltip module
     *
     * @private
     */
    removeEventListener(): void;
    /**
     * Get module name.
     *
     * @returns {string} - Returns the module name
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
