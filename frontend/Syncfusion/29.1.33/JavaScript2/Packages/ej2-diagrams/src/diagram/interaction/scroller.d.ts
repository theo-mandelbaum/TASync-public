import { Diagram } from '../diagram';
import { Rect } from '../primitives/rect';
import { PointModel } from '../primitives/point-model';
import { DiagramRegions } from '../enum/enum';
import { IFitOptions } from '../objects/interface/interfaces';
/**
 */
export declare class DiagramScroller {
    /** @private */
    transform: TransformFactor;
    /**   @private  */
    oldCollectionObjects: string[];
    /**   @private  */
    removeCollection: string[];
    private diagram;
    private objects;
    private vPortWidth;
    private vPortHeight;
    private currentZoomFActor;
    private hOffset;
    private vOffset;
    private scrolled;
    /**
     * verticalOffset method \
     *
     * @returns { number }     verticalOffset method .\
     *
     * @private
     */
    /**
    * verticalOffset method \
    *
    * @returns { void }     verticalOffset method .\
    * @param {number} offset - provide the hOffset value.
    *
    * @private
    */
    viewPortHeight: number;
    /**
     * verticalOffset method \
     *
     * @returns { number }     verticalOffset method .\
     *
     * @private
     */
    /**
    * verticalOffset method \
    *
    * @returns { void }     verticalOffset method .\
    * @param {number} offset - provide the hOffset value.
    *
    * @private
    */
    currentZoom: number;
    /**
     * verticalOffset method \
     *
     * @returns { number }     verticalOffset method .\
     *
     * @private
     */
    /**
    * verticalOffset method \
    *
    * @returns { void }     verticalOffset method .\
    * @param {number} offset - provide the hOffset value.
    *
    * @private
    */
    viewPortWidth: number;
    /**
     * verticalOffset method \
     *
     * @returns { number }     verticalOffset method .\
     *
     * @private
     */
    /**
    * verticalOffset method \
    *
    * @returns { void }     verticalOffset method .\
    * @param {number} offset - provide the hOffset value.
    *
    * @private
    */
    horizontalOffset: number;
    /**
     * verticalOffset method \
     *
     * @returns { number }     verticalOffset method .\
     *
     * @private
     */
    /**
    * verticalOffset method \
    *
    * @returns { void }     verticalOffset method .\
    * @param {number} offset - provide the hOffset value.
    *
    * @private
    */
    verticalOffset: number;
    private diagramWidth;
    private diagramHeight;
    /** @private */
    scrollerWidth: number;
    private hScrollSize;
    private vScrollSize;
    constructor(diagram: Diagram);
    private getBounds;
    /**
     * updateScrollOffsets method \
     *
     * @returns { void }     updateScrollOffsets method .\
     * @param {number} hOffset - provide the hOffset value.
     * @param {number} vOffset - provide the vOffset value.
     *
     * @private
     */
    updateScrollOffsets(hOffset?: number, vOffset?: number): void;
    /**
     * setScrollOffset method \
     *
     * @returns { void }     setScrollOffset method .\
     * @param {number} hOffset - provide the hOffset value.
     * @param {number} vOffset - provide the vOffset value.
     *
     * @private
     */
    setScrollOffset(hOffset: number, vOffset: number): void;
    /**
     * getObjects \
     *
     * @returns { string[] }     To get page pageBounds.\
     * @param {string[]} coll1 - provide the source value.
     * @param {string[]} coll2 - provide the source value.
     * @private
     */
    getObjects(coll1: string[], coll2: string[]): string[];
    /**
     * virtualizeElements \
     *
     * @returns { void }     To get page pageBounds.\
     *
     * @private
     */
    virtualizeElements(): void;
    /**
     * setSize \
     *
     * @returns { void }     To get page pageBounds.\
     * @param {PointModel} newOffset - provide the newOffset value.
     *
     * @private
     */
    setSize(newOffset?: PointModel): void;
    /**
     * setViewPortSize \
     *
     * @returns { void }     To get page pageBounds.\
     * @param {number} width - provide the factor value.
     * @param {number} height - provide the factor value.
     *
     * @private
     */
    setViewPortSize(width: number, height: number): void;
    /**
     * To get page pageBounds \
     *
     * @returns { Rect }     To get page pageBounds.\
     * @param {boolean} boundingRect - provide the factor value.
     * @param {DiagramRegions} region - provide the factor value.
     * @param {boolean} hasPadding - provide the factor value.
     * @param {boolean} isnegativeRegion - provide the isnegativeRegion value.
     *
     * @private
     */
    getPageBounds(boundingRect?: boolean, region?: DiagramRegions, hasPadding?: boolean, isnegativeRegion?: boolean): Rect;
    /**
     * To get page break when PageBreak is set as true \
     *
     * @returns { Segment[] }     To get page break when PageBreak is set as true.\
     * @param {Rect} pageBounds - provide the factor value.
     *
     * @private
     */
    getPageBreak(pageBounds: Rect): Segment[];
    /**
     * zoom method \
     *
     * @returns { void }     zoom method .\
     * @param {number} factor - provide the factor value.
     * @param {number} deltaX - provide the bounds value.
     * @param {number} deltaY - provide the bounds value.
     * @param {PointModel} focusPoint - provide the bounds value.
     * @param {boolean} isInteractiveZoomPan - provide the isInteractiveZoomPan value.
     * @param {boolean} isBringIntoView - provide the isBringIntoView value.
     * @param {boolean} isTrackpadScroll - provide the isTrackpadScroll value.
     * @param {boolean} canZoomOut - provide the canZoomOut value.
     *
     * @private
     */
    zoom(factor: number, deltaX?: number, deltaY?: number, focusPoint?: PointModel, isInteractiveZoomPan?: boolean, isBringIntoView?: boolean, isTrackpadScroll?: boolean, canZoomOut?: boolean): void;
    /**
     * fitToPage method \
     *
     * @returns { void }     fitToPage method .\
     * @param {IFitOptions} options - provide the bounds value.
     *
     * @private
     */
    fitToPage(options?: IFitOptions): void;
    /**
     * bringIntoView method \
     *
     * @returns { void }     bringIntoView method .\
     * @param {Rect} rect - provide the bounds value.
     * @param {boolean} isBringIntoView - provide the isBringIntoView value.
     *
     * @private
     */
    bringIntoView(rect: Rect, isBringIntoView?: boolean): void;
    /**
     * bringToCenter method \
     *
     * @returns { void }     bringToCenter method .\
     * @param {Rect} bounds - provide the bounds value.
     *
     * @private
     */
    bringToCenter(bounds: Rect): void;
    private applyScrollLimit;
}
/** @private */
export interface TransformFactor {
    tx: number;
    ty: number;
    scale: number;
}
export interface Segment {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
}
