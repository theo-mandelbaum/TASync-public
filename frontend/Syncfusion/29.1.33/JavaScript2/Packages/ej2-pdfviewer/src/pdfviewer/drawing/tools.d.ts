import { PointModel } from '@syncfusion/ej2-drawings';
import { IElement } from '@syncfusion/ej2-drawings';
import { Rect } from '@syncfusion/ej2-drawings';
import { SelectorModel } from './selector-model';
import { DrawingElement } from '@syncfusion/ej2-drawings';
import { PdfViewer, PdfViewerBase } from '../index';
import { PdfAnnotationBaseModel } from './pdf-annotation-model';
/**
 * Defines the interactive tools
 *
 * @hidden
 */
export declare class ToolBase {
    /**
     * Initializes the tool
     *
     * @param {PdfViewer} pdfViewer - Specified the pdfviewer component.
     * @param {PdfViewerBase} pdfViewerBase - Specified the pdfViewer base component.
     * @param {boolean} protectChange - Set the default value as false.
     */
    constructor(pdfViewer: PdfViewer, pdfViewerBase: PdfViewerBase, protectChange?: boolean);
    /**   @private  */
    prevPageId: number;
    /**
     * Command that is corresponding to the current action
     */
    protected commandHandler: PdfViewer;
    /**
     * Sets/Gets whether the interaction is being done
     */
    protected inAction: boolean;
    /**
     * Sets/Gets the protect change
     */
    protected pdfViewerBase: PdfViewerBase;
    /**
     * Sets/Gets the current mouse position
     */
    protected currentPosition: PointModel;
    /**
     * Sets/Gets the previous mouse position
     */
    /**   @private  */
    prevPosition: PointModel;
    /**
     * Sets/Gets the initial mouse position
     */
    protected startPosition: PointModel;
    /**
     * Sets/Gets the current element that is under mouse
     */
    /**   @private  */
    currentElement: IElement;
    /**   @private  */
    blocked: boolean;
    protected isTooltipVisible: boolean;
    /** @private */
    childTable: {};
    /** @private */
    helper: PdfAnnotationBaseModel;
    /**
     * Sets/Gets the previous object when mouse down
     */
    protected undoElement: SelectorModel;
    protected undoParentElement: SelectorModel;
    /**
     * @param {IElement} currentElement - Specified the current element.
     * @returns {void}
     */
    protected startAction(currentElement: IElement): void;
    /**
     * @private
     * @param {MouseEventArgs} args - Mouse up event arguments.
     * @returns {void}
     */
    mouseDown(args: MouseEventArgs): void;
    /**
     * @private
     * @param {MouseEventArgs} args - Mouse up event arguments.
     * @returns {boolean} - Returns true or false.
     */
    mouseMove(args: MouseEventArgs): boolean;
    /**
     * @private
     * @param {MouseEventArgs} args - Mouse up event arguments.
     * @returns {void}
     */
    mouseUp(args: MouseEventArgs): void;
    protected endAction(): void;
    /**
     * @private
     * @param {MouseEventArgs} args - Mouse wheel event arguments.
     * @returns {void}
     */
    mouseWheel(args: MouseEventArgs): void;
    /**
     * @private
     * @param {MouseEventArgs} args - Mouse leave event arguments.
     * @returns {void}
     */
    mouseLeave(args: MouseEventArgs): void;
    protected updateSize(shape: any, startPoint: PointModel, endPoint: PointModel, corner: string, initialBounds: Rect, angle?: number, isMouseUp?: boolean): Rect;
    protected getPivot(corner: string): PointModel;
    protected getPositions(corner: string, x: number, y: number): PointModel;
}
/**
 * Helps to select the objects
 *
 * @hidden
 */
export declare class SelectTool extends ToolBase {
    private action;
    constructor(commandHandler: PdfViewer, base: PdfViewerBase);
    /**
     * @private
     * @param {MouseEventArgs} args - Mouse down event arguments.
     * @returns {void}
     */
    mouseDown(args: MouseEventArgs): void;
    private mouseEventHelper;
    /**
     * @private
     * @param {MouseEventArgs} args - Mouse move event arguments.
     * @returns {boolean} - Returns true or false.
     */
    mouseMove(args: MouseEventArgs): boolean;
    /**
     * @private
     * @param {MouseEventArgs} args - Mouse up event arguments.
     * @returns {void}
     */
    mouseUp(args: MouseEventArgs): void;
    /**
     * @private
     * @param {MouseEventArgs} args - Mouse leave event arguments.
     * @returns {void}
     */
    mouseLeave(args: MouseEventArgs): void;
}
/** @private */
export declare type Actions = 'None' | 'Select' | 'Drag' | 'ResizeWest' | 'ConnectorSourceEnd' | 'ConnectorTargetEnd' | 'ResizeEast' | 'ResizeSouth' | 'ResizeNorth' | 'ResizeSouthEast' | 'ConnectorSegmentPoint' | 'ResizeSouthWest' | 'ResizeNorthEast' | 'ResizeNorthWest' | 'Rotate' | 'ConnectorEnd' | 'Custom' | 'Draw' | 'Pan' | 'BezierSourceThumb' | 'BezierTargetThumb' | 'LayoutAnimation' | 'PinchZoom' | 'Hyperlink' | 'SegmentEnd' | 'OrthoThumb' | 'PortDrag' | 'PortDraw' | 'LabelSelect' | 'LabelDrag' | 'LabelResizeSouthEast' | 'LabelResizeSouthWest' | 'LabelResizeNorthEast' | 'LabelResizeNorthWest' | 'LabelResizeSouth' | 'LabelResizeNorth' | 'LabelResizeWest' | 'LabelResizeEast' | 'LabelRotate';
/** @hidden */
export declare class MoveTool extends ToolBase {
    /**
     * Sets/Gets the previous mouse position
     */
    /**   @private  */
    prevPosition: PointModel;
    /**   @private  */
    startPosition: PointModel;
    private offset;
    /**   @private  */
    currentTarget: IElement;
    /**   @private  */
    redoElement: PdfAnnotationBaseModel;
    /**   @private  */
    prevNode: PdfAnnotationBaseModel;
    constructor(commandHandler: PdfViewer, base: PdfViewerBase);
    /**
     * @private
     * @param {MouseEventArgs} args - Mouse down event arguments.
     * @returns {void}
     */
    mouseDown(args: MouseEventArgs): void;
    /**
     * @private
     * @param {any} args - Specified the mouse event arguments.
     * @returns {void}
     */
    mouseUp(args: any): void;
    private calculateMouseXDiff;
    private calculateMouseYDiff;
    private calculateMouseActionXDiff;
    private calculateMouseActionYDiff;
    /**
     * @private
     * @param {MouseEventArgs} args - Specified the mouse event arguments.
     * @param {boolean} isStamp - Specified the stamp annotation or not.
     * @param {boolean} isSkip - Specified the annotation skip or not.
     * @returns {boolean} - Returns the true or false.
     */
    mouseMove(args: MouseEventArgs, isStamp?: boolean, isSkip?: boolean): boolean;
    /**
     * @private
     * @param {MouseEventArgs} args - Specified the mouse event arguments.
     * @returns {void}
     */
    mouseLeave(args: MouseEventArgs): void;
    /**
     * @private
     * @returns {void}
     */
    endAction(): void;
    private checkisAnnotationMove;
}
/** @hidden */
export declare class StampTool extends MoveTool {
    /**
     * @private
     * @param {MouseEventArgs} args - Specified the mouse event arguments.
     * @returns {void}
     */
    mouseDown(args: MouseEventArgs): void;
    /**
     * @private
     * @param {MouseEventArgs} args - Specified the mouse event arguments.
     * @returns {boolean} - Returns the true or false.
     */
    mouseMove(args: MouseEventArgs): boolean;
    private getTextWidth;
    /**
     * @param {number} fontSize - Font size.
     * @returns {number} - Returns the font size.
     */
    private getFontSize;
}
/**
 * Draws a node that is defined by the user
 *
 * @hidden
 */
export declare class InkDrawingTool extends ToolBase {
    /** @private */
    drawingObject: PdfAnnotationBaseModel;
    /** @private */
    sourceObject: PdfAnnotationBaseModel;
    /** @private */
    dragging: boolean;
    constructor(commandHandler: PdfViewer, base: PdfViewerBase, sourceObject: PdfAnnotationBaseModel);
    /**
     * @private
     * @param {MouseEventArgs} args - Specified the mouse event arguments.
     * @returns {void}
     */
    mouseDown(args: MouseEventArgs): void;
    /**
     * @private
     * @param {MouseEventArgs} args - Specified the mouse event arguments.
     * @returns {boolean} - Returns true or false.
     */
    mouseMove(args: MouseEventArgs): boolean;
    /**
     * @private
     * @param {MouseEventArgs} args - Specified the mouse event arguments.
     * @returns {boolean} - Returns true.
     */
    mouseUp(args: MouseEventArgs): boolean;
    /**
     * @private
     * @param {MouseEventArgs} args - Specified the mouse event arguments.
     * @returns {void}
     */
    mouseLeave(args: MouseEventArgs): void;
    /**
     * @private
     * @returns {void}
     */
    endAction(): void;
}
/**
 * Helps to edit the selected connectors
 *
 * @hidden
 */
export declare class ConnectTool extends ToolBase {
    /**   @private  */
    endPoint: string;
    /**   @private  */
    selectedSegment: PointModel;
    /**   @private  */
    initialPosition: PointModel;
    /**   @private  */
    prevSource: PdfAnnotationBaseModel;
    /**   @private  */
    redoElement: PdfAnnotationBaseModel;
    constructor(commandHandler: PdfViewer, base: PdfViewerBase, endPoint: string);
    /**
     * @private
     * @param {MouseEventArgs} args - Specified the mouse event arguments.
     * @returns {void}
     */
    mouseDown(args: MouseEventArgs): void;
    /**
     * @private
     * @param {MouseEventArgs} args - Specified the mouse event arguments.
     * @returns {void}
     */
    mouseUp(args: MouseEventArgs): void;
    /**
     * @private
     * @param {MouseEventArgs} args - Specified the mouse event arguments.
     * @returns {boolean} - Returns true or false.
     */
    mouseMove(args: MouseEventArgs): boolean;
    /**
     * @private
     * @param {MouseEventArgs} args - Specified the mouse event arguments.
     * @returns {void}
     */
    mouseLeave(args: MouseEventArgs): void;
    /**
     * @private
     * @returns {void}
     */
    endAction(): void;
}
/**
 * Scales the selected objects
 *
 * @hidden
 */
export declare class ResizeTool extends ToolBase {
    /**
     * Sets/Gets the previous mouse position
     */
    /**   @private  */
    prevPosition: PointModel;
    /**   @private  */
    corner: string;
    possibleRect: Rect;
    /**   @private  */
    initialOffset: PointModel;
    /**   @private  */
    initialBounds: Rect;
    /**   @private  */
    initialPosition: PointModel;
    /**   @private  */
    redoElement: PdfAnnotationBaseModel;
    /**   @private  */
    prevSource: PdfAnnotationBaseModel;
    constructor(commandHandler: PdfViewer, base: PdfViewerBase, corner: string);
    /**
     * @private
     * @param {MouseEventArgs} args - Specified the mouse event arguments.
     * @returns {void} - Returns true or false.
     */
    mouseDown(args: MouseEventArgs): void;
    /**
     * @private
     * @param {MouseEventArgs} args - Specified the mouse event arguments.
     * @param {boolean} isPreventHistory - Specified the prevent history value.
     * @returns {boolean} - Returns true or false.
     */
    mouseUp(args: MouseEventArgs, isPreventHistory?: boolean): boolean;
    /**
     * @private
     * @param {MouseEventArgs} args - Specified the mouse event arguments.
     * @returns {boolean} - Returns true or false.
     */
    mouseMove(args: MouseEventArgs): boolean;
    /**
     * @private
     * @param {MouseEventArgs} args - Specified the mouse event arguments.
     * @returns {void}
     */
    mouseLeave(args: MouseEventArgs): void;
    private getTooltipContent;
    private getChanges;
    private getPoints;
    /**
     * Updates the size with delta width and delta height using scaling.
     * Aspect ratio used to resize the width or height based on resizing the height or width.
     *
     * @param {number} deltaWidth - Specified the delta width.
     * @param {number} deltaHeight - Specified the delta height.
     * @param {string} corner - Specified the corner value.
     * @param {PointModel} startPoint - Specified the start point of the annotation.
     * @param {PointModel} endPoint - Specified the end point of the annotation.
     * @param {SelectorModel | PdfAnnotationBaseModel} source - Specified the annotation object.
     * @param {boolean} isCtrlKeyPressed - becomes true when ctrl Key is pressed.
     * @returns {boolean} - Returns true or false.
     */
    private scaleObjects;
}
/**
 * Draws a node that is defined by the user
 *
 * @hidden
 */
export declare class NodeDrawingTool extends ToolBase {
    /** @private */
    drawingObject: PdfAnnotationBaseModel;
    /** @private */
    sourceObject: PdfAnnotationBaseModel;
    /** @private */
    dragging: boolean;
    /** @private */
    isFormDesign: boolean;
    constructor(commandHandler: PdfViewer, base: PdfViewerBase, sourceObject: PdfAnnotationBaseModel);
    /**
     * @private
     * @param {MouseEventArgs} args - Specified the mouse event arguments.
     * @returns {void}
     */
    mouseDown(args: MouseEventArgs): void;
    /**
     * @private
     * @param {MouseEventArgs} args - Specified the mouse event arguments.
     * @returns {boolean} - Returns true or false.
     */
    mouseMove(args: MouseEventArgs): boolean;
    /**
     * @private
     * @param {MouseEventArgs} args - Specified the mouse event arguments.
     * @returns {void}
     */
    mouseUp(args: MouseEventArgs): void;
    /**
     * @private
     * @returns {void}
     */
    endAction(): void;
    /**
     * @private
     * @param {PdfAnnotationBaseModel} obj - Specified the annotation object.
     * @param {Rect} rect - Specified the annotation rect element.
     * @returns {void}
     */
    updateNodeDimension(obj: PdfAnnotationBaseModel, rect?: Rect): void;
    /**
     * @private
     * @param {DrawingElement} obj - Specified the drawing element.
     * @param {PdfAnnotationBaseModel} node - Specified the annotation object.
     * @returns {void}
     */
    updateRadiusLinePosition(obj: DrawingElement, node: PdfAnnotationBaseModel): void;
}
/**
 * Draws a Polygon shape node dynamically using polygon Tool
 *
 * @hidden
 */
export declare class PolygonDrawingTool extends ToolBase {
    /** @private */
    drawingObject: PdfAnnotationBaseModel;
    /** @private */
    startPoint: PointModel;
    /** @private */
    dragging: boolean;
    /** @private */
    action: string;
    constructor(commandHandler: PdfViewer, base: PdfViewerBase, action: string);
    /**
     * @private
     * @param {MouseEventArgs} args - Specified the mouse event arguments.
     * @returns {void}
     */
    mouseDown(args: MouseEventArgs): void;
    /**
     * @private
     * @param {MouseEventArgs} args - Specified the mouse event arguments.
     * @returns {boolean} - Returns true or false.
     */
    mouseMove(args: MouseEventArgs): boolean;
    /**
     * @private
     * @param {MouseEventArgs} args - Specified the mouse event arguments.
     * @param {boolean} isDoubleClineck - Specified the double click event or not.
     * @param {boolean} isMouseLeave - Specified the mouse leave event or not.
     * @returns {void}
     */
    mouseUp(args: MouseEventArgs, isDoubleClineck?: boolean, isMouseLeave?: boolean): void;
    /**
     * @private
     * @param {MouseEventArgs} args - Specified the mouse event arguments.
     * @returns {void}
     */
    mouseLeave(args: MouseEventArgs): void;
    /**
     * @private
     * @param {MouseEventArgs} args - Specified the mouse event arguments.
     * @returns {void}
     */
    mouseWheel(args: MouseEventArgs): void;
    /**
     * @private
     * @returns {void}
     */
    endAction(): void;
}
/**
 * Helps to edit the selected connectors
 *
 * @hidden
 */
export declare class LineTool extends ToolBase {
    protected endPoint: string;
    /**   @private  */
    selectedSegment: PointModel;
    /**   @private  */
    startPoint: PointModel;
    /** @private */
    dragging: boolean;
    /**   @private  */
    initialPosition: PointModel;
    /** @private */
    drawingObject: PdfAnnotationBaseModel;
    /**   @private  */
    prevSource: PdfAnnotationBaseModel;
    constructor(commandHandler: PdfViewer, base: PdfViewerBase, endPoint: string, drawingObject: PdfAnnotationBaseModel);
    /**
     * @private
     * @param {MouseEventArgs} args - Specified the mouse event arguments.
     * @returns {void}
     */
    mouseDown(args: MouseEventArgs): void;
    /**
     * @private
     * @param {MouseEventArgs} args - Specified the mouse event arguments.
     * @returns {void}
     */
    mouseUp(args: MouseEventArgs): void;
    /**
     * @private
     * @param {MouseEventArgs} args - Specified the mouse event arguments.
     * @returns {boolean} - Returns true or false.
     */
    mouseMove(args: MouseEventArgs): boolean;
    /**
     * @private
     * @param {MouseEventArgs} args - Specified the mouse event arguments.
     * @returns {void}
     */
    mouseLeave(args: MouseEventArgs): void;
    /**
     * @private
     * @returns {void}
     */
    endAction(): void;
}
/**
 * Rotates the selected objects
 *
 * @hidden
 */
export declare class RotateTool extends ToolBase {
    constructor(commandHandler: PdfViewer, base: PdfViewerBase);
    /**
     * @private
     * @param {MouseEventArgs} args - Specified the mouse event arguments.
     * @returns {void}
     */
    mouseDown(args: MouseEventArgs): void;
    /**
     * @private
     * @param {MouseEventArgs} args - Specified the mouse event arguments.
     * @returns {void}
     */
    mouseUp(args: MouseEventArgs): void;
    /**
     * @private
     * @param {MouseEventArgs} args - Specified the mouse event arguments.
     * @returns {boolean} - Returns true or false.
     */
    mouseMove(args: MouseEventArgs): boolean;
    private getTooltipContent;
    /**
     * @private
     * @param {MouseEventArgs} args - Specified the mouse event arguments.
     * @returns {void}
     */
    mouseLeave(args: MouseEventArgs): void;
    /**
     * @private
     * @returns {void}
     */
    endAction(): void;
}
/**
 * @hidden
 */
export interface Info {
    ctrlKey?: boolean;
    shiftKey?: boolean;
}
/**
 * @hidden
 */
export interface ITouches {
    pageX?: number;
    pageY?: number;
    pointerId?: number;
}
/**
 * @hidden
 */
export interface MouseEventArgs {
    position?: PointModel;
    source?: IElement;
    sourceWrapper?: DrawingElement;
    target?: IElement;
    targetWrapper?: DrawingElement;
    info?: Info;
    startTouches?: TouchList | ITouches[];
    moveTouches?: TouchList | ITouches[];
    clickCount?: number;
    actualObject?: IElement;
    isTouchMode?: boolean;
}
