import { RulerHelper } from '../utility/dom-util';
/**
 * Set of TickAlignment available for Ruler.
 *
 * @private
 */
export declare type TickAlignment = 'LeftOrTop' | 'RightOrBottom';
/**
 * Set of orientations available for Ruler.
 *
 * @private
 */
export declare type RulerOrientation = 'Horizontal' | 'Vertical';
/**
 * Interface for a class Point
 *
 * @private
 */
export interface PointModel {
    /**
     * Sets the x-coordinate of a position
     *
     * @default 0
     */
    x?: number;
    /**
     * Sets the y-coordinate of a position
     *
     * @default 0
     */
    y?: number;
}
/**
 * @private
 */
export declare class Ruler {
    /**
     * Defines the unique interval of the ruler.
     *
     * @default 6
     */
    interval: number;
    /**
     * Sets the segment width of the ruler.
     *
     * @default 36
     */
    segmentWidth: number;
    /**
     * Defines the orientation of the ruler.
     *
     * @default 'Horizontal'
     */
    orientation: RulerOrientation;
    /**
     * Defines the alignment of the tick in the ruler.
     *
     *
     * @default 'RightOrBottom'
     */
    tickAlignment: TickAlignment;
    /**
     * Defines the color of the marker.
     *
     * @default 'red'
     */
    markerColor: string;
    /**
     * Defines the thickness of the ruler.
     *
     * @default 15
     */
    thickness: number;
    /**
     * Sets the segment width of the ruler.
     *
     * @default null
     * @deprecated
     */
    arrangeTick: Function | string;
    /**
     * Defines the length of the ruler.
     *
     * @default 400
     */
    length: number;
    /**   @private  */
    offset: number;
    /**   @private  */
    scale: number;
    /**   @private  */
    startValue: number;
    /**   @private  */
    defStartValue: number;
    /**   @private  */
    hRulerOffset: number;
    /**   @private  */
    vRulerOffset: number;
    /**   @private  */
    startMargin: number;
    /**   @private  */
    endMargin: number;
    /**   @private  */
    pageHeight: number;
    /**   @private  */
    rulerStartValue: number;
    /**   @private  */
    zeroPosition: number;
    /**   @private  */
    addSegmentWidth: boolean;
    /**
     * @private
     */
    rulerHelper: RulerHelper;
    /**
     * @private
     */
    element: HTMLElement;
    private rulerSpacediv;
    private rulerSVGElement;
    /**
     *  Constructor for creating the Ruler Component
     *
     * @param {string | HTMLElement} element The ruler element.
     * @param {RulerHelper} rulerHelper The ruler helper.
     */
    constructor(element: HTMLElement, rulerHelper: RulerHelper);
    /**
     * @private
     * @returns {void} To append the ruler
     */
    appendTo(): void;
    /**
     * Initializes the values of private members.
     *
     * @returns {void}  Initializes the values of private members.
     * @private
     */
    protected preRender(): void;
    /**
     * Renders the rulers.
     *
     * @returns {void}  Renders the rulers.
     * @private
     */
    render(): void;
    /**
     * Core method to return the component name.
     *
     * @returns {string}  Core method to return the component name.
     * @private
     */
    getModuleName(): string;
    /**
     *To destroy the ruler
     *
     * @returns {void} To destroy the ruler
     */
    destroy(): void;
    /**
     * Refreshes the ruler when the Ruler properties are updated\
     *
     * @returns {  void}    Refreshes the ruler when the Ruler properties are updated .\
     * @param {RulerModel} newProp - provide the newProp value.
     * @param {RulerModel} oldProp - provide the oldProp value.
     * @private
     */
    /**
     * @param {boolean} show - provide the show value.
     * @private
     * @returns {void} To show or hide the ruler
     */
    showHideRuler(show: boolean): void;
    private updateRulerGeometry;
    private renderRulerSpace;
    /**
     * @private
     *
     * @returns {void} To update the ruler
     */
    updateRuler(): void;
    private updateSegments;
    private updateSegment;
    private updateTickLabel;
    private getNewSegment;
    private createNewTicks;
    private getLinePoint;
    private createTick;
    private createTickLabel;
    /**
     * @private
     * @param {number} scale
     */
    /**
     * updateSegmentWidth method\
     *
     * @returns {number}    updateSegmentWidth method .\
     * @param {string} scale - provide the scale value.
     *
     * @private
     */
    updateSegmentWidth(scale: number): number;
    private getRulerGeometry;
    private getRulerSize;
    private getRulerSVG;
    /**
     * Method to bind events for the ruler \
     *
     * @returns {void}    Method to bind events for the ruler .\
     * @private
     */
    private wireEvents;
    /**
     *  Method to unbind events for the ruler \
     *
     * @returns {void}     Method to unbind events for the ruler .\
     * @private
     */
    private unWireEvents;
}
/**
 * @private
 */
export interface RulerSegment {
    segment: SVGElement;
    label: SVGTextElement;
}
/**
 * @private
 */
export interface SegmentTranslation {
    trans: number;
}
