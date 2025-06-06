import { PointModel } from '../primitives/point-model';
import { Node } from '../objects/node';
import { Connector, BezierSegment } from '../objects/connector';
import { NodeModel } from '../objects/node-model';
import { ConnectorModel } from '../objects/connector-model';
import { Point } from '../primitives/point';
import { IElement } from '../objects/interface/IElement';
import { IBlazorConnectionChangeEventArgs } from '../objects/interface/IElement';
import { IRotationEventArgs, IDoubleClickEventArgs, IClickEventArgs } from '../objects/interface/IElement';
import { CommandHandler } from './command-manager';
import { Rect } from '../primitives/rect';
import { ObjectTypes, State } from './../enum/enum';
import { SelectorModel } from '../objects/node-model';
import { MouseEventArgs } from './event-handlers';
import { Actions } from './actions';
/**
 * Defines the interactive tools
 */
export declare class ToolBase {
    /**
     * Initializes the tool
     *
     * @param {CommandHandler} command Command that is corresponding to the current action
     * @param protectChange
     */
    constructor(command: CommandHandler, protectChange?: boolean);
    /**
     * Command that is corresponding to the current action
     */
    protected commandHandler: CommandHandler;
    /**
     * Sets/Gets whether the interaction is being done
     */
    protected inAction: boolean;
    /**
     * Sets/Gets the protect change
     */
    protected isProtectChange: boolean;
    /**
     * Sets/Gets the current mouse position
     */
    protected currentPosition: PointModel;
    /**
     * Sets/Gets the previous mouse position
     */
    prevPosition: PointModel;
    /**
     * Sets/Gets the initial mouse position
     */
    protected startPosition: PointModel;
    /**
     * Sets/Gets the current element that is under mouse
     */
    protected currentElement: IElement;
    /**   @private  */
    blocked: boolean;
    protected isTooltipVisible: boolean;
    /** @private */
    childTable: {};
    /**
     * Sets/Gets the previous object when mouse down
     */
    protected undoElement: SelectorModel;
    private checkProperty;
    protected undoParentElement: SelectorModel;
    protected mouseDownElement: (NodeModel | ConnectorModel);
    protected startAction(currentElement: IElement): void;
    /**
     * @param args
     * @private
     */
    mouseDown(args: MouseEventArgs): void;
    checkPropertyValue(): void;
    /**
     * @param args
     * @private
     */
    mouseMove(args: MouseEventArgs): boolean;
    /**
     * @param args
     * @private
     */
    mouseUp(args: MouseEventArgs): void;
    protected endAction(): void;
    /**
     * @param args
     * @private
     */
    mouseWheel(args: MouseEventArgs): void;
    /**
     * @param args
     * @private
     */
    mouseLeave(args: MouseEventArgs): void;
    protected updateSize(shape: SelectorModel | NodeModel, startPoint: PointModel, endPoint: PointModel, corner: string, initialBounds: Rect, angle?: number): Rect;
    protected getPivot(corner: string): PointModel;
    getShapeType(): string;
    triggerElementDrawEvent(source: NodeModel | ConnectorModel, state: State, objectType: string, elementType: string, isMouseDownAction: boolean): void;
}
/**
 * Helps to select the objects
 */
export declare class SelectTool extends ToolBase {
    private action;
    constructor(commandHandler: CommandHandler, protectChange: boolean, action?: Actions);
    /**
     * @param args
     * @private
     */
    mouseDown(args: MouseEventArgs): void;
    /**
     * @param args
     * @private
     */
    mouseMove(args: MouseEventArgs): boolean;
    /**
     * @param args
     * @private
     */
    mouseUp(args: MouseEventArgs): void;
    /**
     * @param args
     * @private
     */
    mouseLeave(args: MouseEventArgs): void;
}
export declare class FixedUserHandleTool extends ToolBase {
    /**
     * @param args
     * @private
     */
    mouseUp(args: MouseEventArgs): void;
}
/**
 * Helps to edit the selected connectors
 */
export declare class ConnectTool extends ToolBase {
    protected endPoint: string;
    protected oldConnector: ConnectorModel;
    protected isConnected: boolean;
    /** @private */
    tempArgs: IBlazorConnectionChangeEventArgs;
    /** @private */
    canCancel: boolean;
    /**   @private  */
    selectedSegment: BezierSegment;
    constructor(commandHandler: CommandHandler, endPoint: string);
    /**
     * @param args
     * @private
     */
    mouseDown(args: MouseEventArgs): Promise<void>;
    /**
     * @param args
     * @private
     */
    mouseUp(args: MouseEventArgs): Promise<void>;
    /**
     * @param args
     * @private
     */
    mouseMove(args: MouseEventArgs): boolean;
    /**
     * @param args
     * @private
     */
    mouseLeave(args: MouseEventArgs): void;
    private getTooltipContent;
    private checkConnect;
    /**   @private  */
    endAction(): void;
}
/**
 * Drags the selected objects
 */
export declare class MoveTool extends ToolBase {
    /**
     * Sets/Gets the previous mouse position
     */
    prevPosition: PointModel;
    private initialOffset;
    /**   @private  */
    currentTarget: IElement;
    private objectType;
    private portId;
    private source;
    private intialValue;
    private isStartAction;
    private canCancel;
    private tempArgs;
    private canTrigger;
    constructor(commandHandler: CommandHandler, objType?: ObjectTypes);
    /**
     * @param args
     * @private
     */
    mouseDown(args: MouseEventArgs): void;
    private getPort;
    /**
     * @param args
     * @param isPreventHistory
     * @param args
     * @param isPreventHistory
     * @private
     */
    mouseUp(args: MouseEventArgs, isPreventHistory?: boolean): Promise<void>;
    private clearDiff;
    private calculateDiff;
    private connectorEndPointChangeEvent;
    private triggerEndPointEvent;
    private isSelectionHasConnector;
    /**
     * @param args
     * @private
     */
    mouseMove(args: MouseEventArgs): boolean;
    private getTooltipContent;
    /**
     * @param args
     * @private
     */
    mouseLeave(args: MouseEventArgs): void;
    /**   @private  */
    endAction(): void;
}
/**
 * Rotates the selected objects
 */
export declare class RotateTool extends ToolBase {
    /** @private */
    tempArgs: IRotationEventArgs;
    /** @private */
    canCancel: boolean;
    /** @private */
    rotateStart: boolean;
    constructor(commandHandler: CommandHandler);
    /**
     * @param args
     * @private
     */
    mouseDown(args: MouseEventArgs): void;
    /**
     * @param args
     * @private
     */
    mouseUp(args: MouseEventArgs): Promise<void>;
    /**
     * @param args
     * @private
     */
    mouseMove(args: MouseEventArgs): boolean;
    private getTooltipContent;
    /**
     * @param args
     * @private
     */
    mouseLeave(args: MouseEventArgs): void;
    /**   @private  */
    endAction(): void;
}
/**
 * Scales the selected objects
 */
export declare class ResizeTool extends ToolBase {
    /**
     * Sets/Gets the previous mouse position
     */
    prevPosition: PointModel;
    /** @private */
    corner: string;
    /**   @private  */
    initialOffset: PointModel;
    /** @private */
    resizeStart: boolean;
    /** @private */
    startValues: SelectorModel;
    /**   @private  */
    initialBounds: Rect;
    private canCancel;
    private tempArgs;
    constructor(commandHandler: CommandHandler, corner: string);
    /**
     * @param args
     * @private
     */
    mouseDown(args: MouseEventArgs): void;
    /**
     * @param args
     * @param isPreventHistory
     * @param args
     * @param isPreventHistory
     * @private
     */
    mouseUp(args: MouseEventArgs, isPreventHistory?: boolean): Promise<boolean>;
    /**
     * @param args
     * @private
     */
    mouseMove(args: MouseEventArgs): boolean;
    /**
     * @param args
     * @private
     */
    mouseLeave(args: MouseEventArgs): void;
    private getTooltipContent;
    private getChanges;
    /**
     * Updates the size with delta width and delta height using scaling.
     */
    /**
     * Aspect ratio used to resize the width or height based on resizing the height or width
     *
     * @param deltaWidth
     * @param deltaHeight
     * @param corner
     * @param startPoint
     * @param endPoint
     * @param source
     * @param deltaWidth
     * @param deltaHeight
     * @param corner
     * @param startPoint
     * @param endPoint
     * @param source
     * @param deltaWidth
     * @param deltaHeight
     * @param corner
     * @param startPoint
     * @param endPoint
     * @param source
     * @param deltaWidth
     * @param deltaHeight
     * @param corner
     * @param startPoint
     * @param endPoint
     * @param source
     * @param deltaWidth
     * @param deltaHeight
     * @param corner
     * @param startPoint
     * @param endPoint
     * @param source
     * @param deltaWidth
     * @param deltaHeight
     * @param corner
     * @param startPoint
     * @param endPoint
     * @param source
     */
    private scaleObjects;
}
/**
 * Draws a node that is defined by the user
 */
export declare class NodeDrawingTool extends ToolBase {
    /** @private */
    drawingObject: Node | Connector;
    /** @private */
    sourceObject: Node | Connector;
    constructor(commandHandler: CommandHandler, sourceObject: Node | Connector);
    /**
     * @param args
     * @private
     */
    mouseDown(args: MouseEventArgs): void;
    /**
     * @param args
     * @private
     */
    mouseMove(args: MouseEventArgs): boolean;
    /**
     * @param args
     * @private
     */
    mouseUp(args: MouseEventArgs): void;
    /**   @private  */
    endAction(): void;
    /**
     * @param args
     * @private
     */
    mouseLeave(args: MouseEventArgs): void;
}
/**
 * Draws a connector that is defined by the user
 */
export declare class ConnectorDrawingTool extends ConnectTool {
    /** @private */
    drawingObject: Node | Connector;
    /** @private */
    sourceObject: Node | Connector;
    constructor(commandHandler: CommandHandler, endPoint: string, sourceObject: Node | Connector);
    /**
     * @param args
     * @private
     */
    mouseDown(args: MouseEventArgs): Promise<void>;
    /**
     * @param args
     * @private
     */
    mouseMove(args: MouseEventArgs): boolean;
    private setTarget;
    /**
     * @param args
     * @private
     */
    mouseUp(args: MouseEventArgs): Promise<void>;
    /**   @private  */
    endAction(): void;
    /**
     * @param args
     * @private
     */
    mouseLeave(args: MouseEventArgs): void;
}
export declare class TextDrawingTool extends ToolBase {
    /**   @private  */
    drawingNode: Node | Connector;
    constructor(commandHandler: CommandHandler);
    /**
     * @param args
     * @private
     */
    mouseDown(args: MouseEventArgs): void;
    /**
     * @param args
     * @private
     */
    mouseMove(args: MouseEventArgs): boolean;
    /**
     * @param args
     * @private
     */
    mouseUp(args: MouseEventArgs): void;
    /**   @private  */
    endAction(): void;
}
/**
 * Pans the diagram control on drag
 */
export declare class ZoomPanTool extends ToolBase {
    private zooming;
    constructor(commandHandler: CommandHandler, zoom: boolean);
    /**
     * @param args
     * @private
     */
    mouseDown(args: MouseEventArgs): void;
    /**
     * @param args
     * @private
     */
    mouseMove(args: MouseEventArgs): boolean;
    /**
     * @param args
     * @private
     */
    mouseUp(args: MouseEventArgs): void;
    /**   @private  */
    endAction(): void;
    private getDistance;
    private updateTouch;
}
/**
 * Animate the layout during expand and collapse
 */
export declare class ExpandTool extends ToolBase {
    constructor(commandHandler: CommandHandler);
    /**
     * @param args
     * @private
     */
    mouseUp(args: MouseEventArgs): void;
}
/**
 * Opens the annotation hypeLink at mouse up
 */
export declare class LabelTool extends ToolBase {
    constructor(commandHandler: CommandHandler);
    /**
     * @param args
     * @private
     */
    mouseUp(args: MouseEventArgs): void;
}
/**
 * Draws a Polygon shape node dynamically using polygon Tool
 */
export declare class PolygonDrawingTool extends ToolBase {
    /** @private */
    drawingObject: Node | Connector;
    startPoint: PointModel;
    constructor(commandHandler: CommandHandler);
    /**
     * @param args
     * @private
     */
    mouseDown(args: MouseEventArgs): void;
    /**
     * @param args
     * @private
     */
    mouseMove(args: MouseEventArgs): boolean;
    /**
     * @param args
     * @param dblClickArgs
     * @param args
     * @param dblClickArgs
     * @private
     */
    mouseUp(args: MouseEventArgs, dblClickArgs?: IDoubleClickEventArgs | IClickEventArgs): void;
    /**
     * @param args
     * @private
     */
    mouseWheel(args: MouseEventArgs): void;
    /**   @private  */
    endAction(): void;
}
/**
 * Draws a PolyLine Connector dynamically using PolyLine Drawing Tool
 */
export declare class PolyLineDrawingTool extends ToolBase {
    /** @private */
    drawingObject: Node | Connector;
    constructor(commandHandler: CommandHandler);
    /**
     * @param args
     * @private
     */
    mouseMove(args: MouseEventArgs): boolean;
    /**
     * @param args
     * @private
     */
    mouseDown(args: MouseEventArgs): void;
    /**
     * @param args
     * @private
     */
    mouseWheel(args: MouseEventArgs): void;
    /**
     * @param args
     * @private
     */
    mouseUp(args: MouseEventArgs): void;
    /**   @private  */
    endAction(): void;
}
export declare class LabelDragTool extends ToolBase {
    private annotationId;
    constructor(commandHandler: CommandHandler);
    /**
     * @param args
     * @private
     */
    mouseDown(args: MouseEventArgs): void;
    /**
     * @param args
     * @private
     */
    mouseMove(args: MouseEventArgs): boolean;
    /**
     * @param args
     * @private
     */
    mouseUp(args: MouseEventArgs): void;
    /**
     * @param args
     * @private
     */
    mouseLeave(args: MouseEventArgs): void;
}
export declare class LabelResizeTool extends ToolBase {
    private corner;
    private annotationId;
    private initialBounds;
    constructor(commandHandler: CommandHandler, corner: Actions);
    /**
     * @param args
     * @private
     */
    mouseDown(args: MouseEventArgs): void;
    /**
     * @param args
     * @private
     */
    mouseMove(args: MouseEventArgs): boolean;
    /**
     * @param args
     * @private
     */
    mouseUp(args: MouseEventArgs): void;
    /**
     * @param args
     * @private
     */
    mouseLeave(args: MouseEventArgs): void;
    /**
     * @param args
     * @private
     */
    resizeObject(args: MouseEventArgs): void;
}
export declare class LabelRotateTool extends ToolBase {
    private annotationId;
    constructor(commandHandler: CommandHandler);
    /**
     * @param args
     * @private
     */
    mouseDown(args: MouseEventArgs): void;
    /**
     * @param args
     * @private
     */
    mouseMove(args: MouseEventArgs): boolean;
    /**
     * @param args
     * @private
     */
    mouseUp(args: MouseEventArgs): void;
    /**
     * @param args
     * @private
     */
    mouseLeave(args: MouseEventArgs): void;
}
/**
 * EJ2-33302 - Freehand drawing support in diagram control.
 */
export declare class FreeHandTool extends ToolBase {
    /** @private */
    drawingObject: Node | Connector;
    startPoint: PointModel;
    constructor(commandHandler: CommandHandler);
    /**
     * mouseMove - Collect the points using current mouse position and convert it into pathData.
     * @param args
     * @private
     */
    mouseMove(args: MouseEventArgs): boolean;
    /**
     * @param args
     * @private
     */
    mouseDown(args: MouseEventArgs): void;
    /**
     * mouseUp - Remove the drawn object. Reduce and smoothen the collected points and create
     * a bezier connector using the smoothened points.
     * @param args
     * @private
     */
    mouseUp(args: MouseEventArgs): void;
    /**
     * Reduce the collected points based on tolerance value.
     * @param points
     * @param tolerance
     * @returns points
     */
    pointReduction(points: PointModel[], tolerance: number): PointModel[];
    reduction(points: PointModel[], firstPoint: number, lastPoint: number, tolerance: number, pointIndex: number[]): void;
    /**
     * Calculate the perpendicular distance of each point with first and last points
     * @param point1
     * @param point2
     * @param point3
     * @returns
     */
    perpendicularDistance(point1: Point, point2: Point, point3: Point): number;
    /**
     * Smoothen the bezier curve based on the points and smoothValue.
     * @param points
     * @param smoothValue
     * @param drawingObject
     * @param obj
     * @returns drawingObject
     */
    private bezierCurveSmoothness;
}
