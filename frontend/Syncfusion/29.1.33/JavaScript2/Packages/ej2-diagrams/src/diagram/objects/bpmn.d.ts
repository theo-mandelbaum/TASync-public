import { Node, BpmnShape } from './../objects/node';
import { DiagramElement } from './../core/elements/diagram-element';
import { Canvas } from './../core/containers/canvas';
import { Container } from './../core/containers/container';
import { PathElement } from './../core/elements/path-element';
import { Diagram } from './../../diagram/diagram';
import { Connector } from './../objects/connector';
import { TextAnnotationDirection } from '../enum/enum';
import { BpmnSubEventModel } from './../objects/node-model';
import { BpmnSubProcessModel } from './../objects/node-model';
import { NodeModel } from './../objects/node-model';
import { Rect } from '../primitives/rect';
import { Size } from '../primitives/size';
/**
 * BPMN Diagrams contains the BPMN functionalities
 */
export declare class BpmnDiagrams {
    /**   @private  */
    bpmnTextAnnotationConnector: any;
    /**   @private  */
    getSize(node: NodeModel, content: DiagramElement): Size;
    /** @private */
    initBPMNContent(content: DiagramElement, node: Node, diagram: Diagram): DiagramElement;
    private getBpmnTextAnnotationShape;
    private getBpmnTextAnnotationSymbol;
    /** @private */
    getBPMNShapes(node: Node): PathElement;
    /** @private */
    getBPMNGroup(node: Node, diagram: Diagram): Container;
    /** @private */
    getBPMNGatewayShape(node: Node): Canvas;
    /** @private */
    getBPMNDataObjectShape(node: Node): Canvas;
    /** @private */
    getBPMNTaskShape(node: Node): Canvas;
    /** @private */
    getBPMNEventShape(node: Node, subEvent: BpmnSubEventModel, sub?: boolean, id?: string): Canvas;
    private setEventVisibility;
    private setSubProcessVisibility;
    /** @private */
    getBPMNSubProcessShape(node: Node): Canvas;
    private getBPMNSubEvent;
    private getBPMNSubProcessTransaction;
    /** @private */
    getBPMNSubProcessLoopShape(node: Node): PathElement;
    /** @private */
    drag(obj: Node, tx: number, ty: number, diagram: Diagram): void;
    /** @private */
    dropBPMNchild(target: Node, source: Node, diagram: Diagram): void;
    private sortProcessOrder;
    private updateIndex;
    private updateSubprocessNodeIndex;
    /** @private */
    updateDocks(obj: Node, diagram: Diagram): void;
    /** @private */
    removeBpmnProcesses(currentObj: Node, diagram: Diagram): void;
    /** @private */
    removeChildFromBPMN(wrapper: Container, name: string, diagram?: Diagram, isDelete?: boolean): void;
    private removeGElement;
    private getNode;
    /** @private */
    removeProcess(id: string, diagram: Diagram): void;
    /** @private */
    addProcess(process: NodeModel, parentId: string, diagram: Diagram): void;
    /** @private */
    getChildrenBound(node: NodeModel, excludeChild: string, diagram: Diagram): Rect;
    /** @private */
    updateSubProcessess(bound: Rect, obj: NodeModel, diagram: Diagram): void;
    /** @private */
    getBPMNCompensationShape(node: Node, compensationNode: PathElement): PathElement;
    /** @private */
    getBPMNActivityShape(node: Node): Canvas;
    /** @private */
    getBPMNSubprocessEvent(node: Node, subProcessEventsShapes: Canvas, events: BpmnSubEventModel): void;
    /** @private */
    getBPMNAdhocShape(node: Node, adhocNode: PathElement, subProcess?: BpmnSubProcessModel): PathElement;
    /**
     *
     * @private
     * To modify the text annotation path while dragging the node and set port offset based on dragging.
     */
    setAnnotationPath(sourceBounds: Rect, wrapper: Canvas, node: NodeModel, bpmnShape: BpmnShape, direction: TextAnnotationDirection, diagram: Diagram): void;
    private setAnnotationPosition;
    /** @private */
    private getSubprocessChildCount;
    /** @private */
    private getTaskChildCount;
    /** @private */
    private setStyle;
    /** @private */
    updateBPMN(changedProp: Node, oldObject: Node, actualObject: Node, diagram: Diagram): void;
    private updateBpmnChildOpacity;
    /**
     * EJ2-60574 -BPMN shape do not get changed at runtime properly
     */
    private removeBPMNElementFromDOM;
    /** @private */
    updateBPMNStyle(elementWrapper: DiagramElement, changedProp: string): void;
    /** @private */
    updateBPMNGateway(node: Node, changedProp: Node): void;
    /**
     * Used to update Bpmn gateway child in runtime
     * EJ2-60581
     * @param elementWrapper
     * @param node
     * @param pathData
     * @returns
     */
    updateGatewaySubType(elementWrapper: Canvas, node: Node, pathData: string): PathElement;
    /** @private */
    updateBPMNDataObject(node: Node, newObject: Node, oldObject: Node): void;
    /** @private */
    getEvent(node: Node, oldObject: Node, event: string, child0: DiagramElement, child1: DiagramElement, child2: DiagramElement): void;
    /** @private */
    private updateEventVisibility;
    /** @private */
    updateBPMNEvent(node: Node, newObject: Node, oldObject: Node): void;
    /** @private */
    updateBPMNActivity(node: Node, newObject: Node, oldObject: Node, diagram: Diagram): void;
    /** @private */
    updateBPMNActivityTask(node: Node, newObject: Node): void;
    /** @private */
    updateBPMNActivityTaskLoop(node: Node, newObject: Node, x: number, subChildCount: number, area: number, start: number): void;
    /** @private */
    private updateChildMargin;
    /** @private */
    updateBPMNActivitySubProcess(node: Node, newObject: Node, oldObject: Node, diagram: Diagram): void;
    /** @private */
    updateBPMNSubProcessEvent(node: Node, newObject: Node, oldObject: Node, diagram: Diagram): void;
    private updateBPMNSubEvent;
    private updateBPMNSubProcessTransaction;
    /** @private */
    getEventSize(events: BpmnSubEventModel, wrapperChild: Canvas): void;
    /** @private */
    updateBPMNSubProcessAdhoc(node: Node, oldObject: Node, subProcess: BpmnSubProcessModel, x: number, subChildCount: number, area: number): void;
    /** @private */
    updateBPMNSubProcessBoundary(node: Node, subProcess: BpmnSubProcessModel): void;
    /** @private */
    updateElementVisibility(node: Node, visible: boolean, diagram: Diagram): void;
    /** @private */
    updateBPMNSubProcessCollapsed(node: Node, oldObject: Node, subProcess: BpmnSubProcessModel, x: number, subChildCount: number, area: number, diagram: Diagram): void;
    /** @private */
    updateBPMNSubProcessCompensation(node: Node, oldObject: Node, subProcess: BpmnSubProcessModel, x: number, subChildCount: number, area: number): void;
    /** @private */
    updateBPMNSubProcessLoop(node: Node, oldObject: Node, subProcess: BpmnSubProcessModel, x: number, subChildCount: number, area: number): void;
    /** @private */
    updateBPMNConnector(actualObject: Connector, oldObject: Connector, connection: Connector, diagram: Diagram): Connector;
    /** @private */
    getSequence(actualObject: Connector, oldObject: Connector, connection: Connector, diagram: Diagram): Connector;
    /** @private */
    getAssociation(actualObject: Connector, oldObject: Connector, connection: Connector, diagram: Diagram): Connector;
    /** @private */
    getMessage(actualObject: Connector, oldObject: Connector, connection: Connector, diagram: Diagram): Connector;
    private removeDomElement;
    private setSizeForBPMNEvents;
    /** @private */
    updateAnnotationDrag(node: NodeModel, diagram: Diagram, tx: number, ty: number): boolean;
    private getAnnotationPathAngle;
    private setSizeForBPMNGateway;
    private setSizeForBPMNDataObjects;
    private setSizeForBPMNActivity;
    private updateDiagramContainerVisibility;
    /**
     * Constructor for the BpmnDiagrams module
     *
     * @private
     */
    constructor();
    /**
     *To destroy the ruler
     *
     * @returns {void} To destroy the ruler
     */
    destroy(): void;
    /**
     * Get module name.
     *
     * @returns {string}   Get module name.
     */
    protected getModuleName(): string;
}
/**
 * getBpmnShapePathData method \
 *
 * @returns { string } getBpmnShapePathData method .\
 * @param {string} shape - provide the shape value.
 *
 * @private
 */
export declare function getBpmnShapePathData(shape: string): string;
/**
 * getBpmnTriggerShapePathData method \
 *
 * @returns { string } getBpmnTriggerShapePathData method .\
 * @param {string} shape - provide the shape value.
 *
 * @private
 */
export declare function getBpmnTriggerShapePathData(shape: string): string;
/**
 * getBpmnGatewayShapePathData method \
 *
 * @returns { string } getBpmnGatewayShapePathData method .\
 * @param {string} shape - provide the shape value.
 *
 * @private
 */
export declare function getBpmnGatewayShapePathData(shape: string): string;
/**
 * getBpmnTaskShapePathData method \
 *
 * @returns { string } getBpmnTaskShapePathData method .\
 * @param {string} shape - provide the shape value.
 *
 * @private
 */
export declare function getBpmnTaskShapePathData(shape: string): string;
/**
 * getBpmnLoopShapePathData method \
 *
 * @returns { string } getBpmnLoopShapePathData method .\
 * @param {string} shape - provide the shape value.
 *
 * @private
 */
export declare function getBpmnLoopShapePathData(shape: string): string;
