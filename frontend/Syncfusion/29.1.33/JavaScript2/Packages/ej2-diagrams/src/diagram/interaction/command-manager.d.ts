import { IElement, IConnectionChangeEventArgs } from '../objects/interface/IElement';
import { IBlazorConnectionChangeEventArgs } from '../objects/interface/IElement';
import { Connector } from '../objects/connector';
import { Node } from '../objects/node';
import { PointModel } from '../primitives/point-model';
import { MouseEventArgs } from './event-handlers';
import { PointPortModel } from '../objects/port-model';
import { ConnectorModel, StraightSegmentModel, OrthogonalSegmentModel, BezierSegmentModel } from '../objects/connector-model';
import { Rect } from '../primitives/rect';
import { Diagram } from '../../diagram/diagram';
import { DiagramElement } from './../core/elements/diagram-element';
import { SelectorModel } from '../objects/node-model';
import { Selector } from '../objects/node';
import { AlignmentOptions, DistributeOptions, SizingOptions, DiagramEvent, AlignmentMode } from '../enum/enum';
import { EntryType } from '../enum/enum';
import { HistoryEntry } from '../diagram/history';
import { Snapping } from '../objects/snapping';
import { LayoutAnimation } from '../objects/layout-animation';
import { LayerModel } from '../diagram/layer-model';
import { ILayout } from '../layout/layout-base';
import { ShapeAnnotationModel, PathAnnotationModel } from '../objects/annotation-model';
import { ShapeAnnotation, PathAnnotation } from '../objects/annotation';
import { PathPort, PointPort } from '../objects/port';
import { NodeModel } from '../objects/node-model';
import { AnnotationModel } from '../objects/annotation-model';
/**
 * Defines the behavior of commands
 */
export declare class CommandHandler {
    /**   @private  */
    clipboardData: ClipBoardObject;
    /**   @private  */
    diagramObject: object;
    /**   @private  */
    newSelectedObjects: object;
    /**   @private  */
    oldSelectedObjects: object;
    /**   @private  */
    changedNodeZIndexes: object;
    /**   @private  */
    connectorsTable: Object[];
    /** @private */
    PreventConnectorSplit: boolean;
    /**   @private  */
    processTable: {};
    /** @private */
    isContainer: boolean;
    private state;
    /** @private */
    diagram: Diagram;
    /** @private */
    canUpdateTemplate: boolean;
    /** @private */
    cloningInProgress: boolean;
    private childTable;
    private objectStore;
    private parentTable;
    private blazor;
    private blazorInterop;
    private cloneGroupChildCollection;
    enableConnectorSplit: boolean;
    /**   @private  */
    readonly snappingModule: Snapping;
    /**   @private  */
    readonly layoutAnimateModule: LayoutAnimation;
    constructor(diagram: Diagram);
    /**
     * startTransaction method\
     *
     * @returns {  void }    startTransaction method .\
     * @param {boolean} protectChange - provide the options value.
     * @private
     */
    startTransaction(protectChange: boolean): void;
    /**
     * endTransaction method\
     *
     * @returns {  void }    endTransaction method .\
     * @param {boolean} protectChange - provide the options value.
     * @private
     */
    endTransaction(protectChange: boolean): void;
    /**
     * setFocus method\
     *
     * @returns {  void }    setFocus method .\
     * @private
     */
    setFocus(): void;
    /**
     * showTooltip method\
     *
     * @returns {  void }    showTooltip method .\
     * @param {IElement} node - provide the options value.
     * @param {PointModel} position - provide the position value.
     * @param {string | HTMLElement} content - provide the content value.
     * @param {string} toolName - provide the toolName value.
     * @param {boolean} isTooltipVisible - provide the isTooltipVisible value.
     * @private
     */
    showTooltip(node: IElement, position: PointModel, content: string | HTMLElement | Function, toolName: string, isTooltipVisible: boolean): void;
    /**
     * Split the connector, when the node is dropped onto it and establish connection with that dropped node.
     *
     * @returns {  void }   connectorSplit  method .\
     * @param {NodeModel}  droppedObject - Provide the dropped node id
     * @param {ConnectorModel} targetConnector - Provide the connector id
     * @private
     */
    connectorSplit(droppedObject: NodeModel, targetConnector: ConnectorModel): void;
    private nodeOffsetChange;
    private ConnectorTargetChange;
    private ConnectorSourceChange;
    /**
     * closeTooltip method\
     *
     * @returns {  void }    closeTooltip method .\
     * @private
     */
    closeTooltip(): void;
    /**
     * canEnableDefaultTooltip method\
     *
     * @returns {  boolean }    canEnableDefaultTooltip method .\
     * @private
     */
    canEnableDefaultTooltip(): boolean;
    /**
     * updateSelector method\
     *
     * @returns {  void }    updateSelector method .\
     * @private
     */
    updateSelector(): void;
    /**
     * triggerEvent method\
     *
     * @returns {  Promise<void | object | IBlazorConnectionChangeEventArgs> }    triggerEvent method .\
     * @param {DiagramEvent} event - provide the options value.
     * @param {Object} args - provide the args value.
     * @private
     */
    triggerEvent(event: DiagramEvent, args: Object): Promise<void | object | IBlazorConnectionChangeEventArgs>;
    /**
     * dragOverElement method\
     *
     * @returns { void }    dragOverElement method .\
     * @param {MouseEventArgs} args - provide the options value.
     * @param {PointModel} currentPosition - provide the args value.
     * @private
     */
    dragOverElement(args: MouseEventArgs, currentPosition: PointModel): void;
    /**
     * disConnect method\
     *
     * @returns { IConnectionChangeEventArgs | IBlazorConnectionChangeEventArgs }    disConnect method .\
     * @param {IElement} obj - provide the obj value.
     * @param {string} endPoint - provide the endPoint value.
     * @param {boolean} canCancel - provide the canCancel value.
     * @private
     */
    disConnect(obj: IElement, endPoint?: string, canCancel?: boolean): IConnectionChangeEventArgs | IBlazorConnectionChangeEventArgs;
    private connectionEventChange;
    /**
     * findTarget method\
     *
     * @returns { NodeModel | PointPortModel | ShapeAnnotationModel | PathAnnotationModel }    findTarget method .\
     * @param {DiagramElement} element - provide the element value.
     * @param {IElement} argsTarget - provide the argsTarget value.
     * @param {boolean} source - provide the source value.
     * @param {boolean} connection - provide the connection value.
     * @private
     */
    findTarget(element: DiagramElement, argsTarget: IElement, source?: boolean, connection?: boolean): NodeModel | ConnectorModel | PointPortModel | ShapeAnnotationModel | PathAnnotationModel;
    findMatch(items: Object[], targetID: string, elementID: string): any;
    /**
     * canDisconnect method\
     *
     * @returns { boolean }    canDisconnect method .\
     * @param {string} endPoint - provide the endPoint value.
     * @param {MouseEventArgs} args - provide the args value.
     * @param {string} targetPortId - provide the targetPortId value.
     * @param {string} targetNodeId - provide the targetNodeId value.
     * @private
     */
    canDisconnect(endPoint: string, args: MouseEventArgs, targetPortId: string, targetNodeId: string): boolean;
    /**
     * connect method\
     *
     * @returns { IConnectionChangeEventArgs | IBlazorConnectionChangeEventArgs }    connect method .\
     * @param {string} endPoint - provide the endPoint value.
     * @param {MouseEventArgs} args - provide the args value.
     * @param {boolean} canCancel - provide the canCancel value.
     * @private
     */
    connect(endPoint: string, args: MouseEventArgs, canCancel?: boolean): IConnectionChangeEventArgs | IBlazorConnectionChangeEventArgs;
    /** @private */
    /**
     * cut method\
     *
     * @returns { void }    cut method .\
     * @private
     */
    cut(): void;
    /**
     * addLayer method\
     *
     * @returns { void }    addLayer method .\
     * @param {LayerModel} layer - provide the endPoint value.
     * @param {Object[]} objects - provide the args value.
     * @param {boolean} isServerUpdate - provide the canCancel value.
     * @private
     */
    addLayer(layer: LayerModel, objects?: Object[], isServerUpdate?: boolean): void;
    /**
     * getObjectLayer method\
     *
     * @returns { LayerModel }    getObjectLayer method .\
     * @param {string} objectName - provide the endPoint value.
     * @private
     */
    getObjectLayer(objectName: string): LayerModel;
    /**
     * getLayer method\
     *
     * @returns { LayerModel }    getLayer method .\
     * @param {string} layerName - provide the endPoint value.
     * @private
     */
    getLayer(layerName: string): LayerModel;
    /**
     * removeLayer method\
     *
     * @returns { void }    removeLayer method .\
     * @param {string} layerId - provide the endPoint value.
     * @param {boolean} isServerUpdate - provide the endPoint value.
     * @private
     */
    removeLayer(layerId: string, isServerUpdate?: boolean): void;
    /**
     * moveObjects method\
     *
     * @returns { void }    moveObjects method .\
     * @param {string[]]} objects - provide the objects value.
     * @param {string} targetLayer - provide the targetLayer value.
     * @private
     */
    moveObjects(objects: string[], targetLayer?: string): void;
    private setConnectorDetails;
    /**
     * cloneLayer method\
     *
     * @returns { void }    cloneLayer method .\
     * @param {string[]} layerName - provide the objects value.
     * @private
     */
    cloneLayer(layerName: string): void;
    /**
     * copy method\
     *
     * @returns { void }    copy method .\
     * @private
     */
    copy(): Object;
    /**
     * copyObjects method\
     *
     * @returns { Object[] }    copyObjects method .\
     * @private
     */
    copyObjects(): Object[];
    /**
     * findProcesses method\
     *
     * @returns { string[] } findProcesses method .\
     * @param {Node} node - provide the laneNode  value.
     * @private
     */
    findProcesses(node: Node): string[];
    private removeDuplicateObjects;
    private checkSwimlaneInSelection;
    private copyProcesses;
    /**
     * group method\
     *
     * @returns { void }    group method .\
     * @private
     */
    group(): void;
    /**
     * unGroup method\
     *
     * @returns {  void }    unGroup method .\
     * @param {NodeModel} obj - provide the angle value.
     * @private
     */
    unGroup(obj?: NodeModel): void;
    private resetDependentConnectors;
    /**
     * paste method\
     *
     * @returns { void }    paste method .\
     * @param {(NodeModel | ConnectorModel)[]} obj - provide the objects value.
     * @private
     */
    paste(obj: (NodeModel | ConnectorModel)[]): void;
    private getNewObject;
    private cloneConnector;
    private cloneNode;
    private cloneSubProcesses;
    private cloneGroup;
    /**
     * translateObject method\
     *
     * @returns { Object[] }    translateObject method .\
     * @param {Node | Connector} obj - provide the objects value.
     * @param {string} groupnodeID - provide the objects value.
     * @private
     */
    translateObject(obj: Node | Connector, groupnodeID?: string): void;
    /**
     * drawObject method\
     *
     * @returns { Node | Connector }    drawObject method .\
     * @param {Node | Connector} obj - provide the objects value.
     * @private
     */
    drawObject(obj: Node | Connector): Node | Connector;
    /**
     * addObjectToDiagram method\
     *
     * @returns { void }    addObjectToDiagram method .\
     * @param {Node | Connector} obj - provide the objects value.
     * @private
     */
    addObjectToDiagram(obj: Node | Connector): void;
    /**
     * addObjectToDiagram method\
     *
     * @returns { void }    addObjectToDiagram method .\
     * @param {boolean} enable - provide the objects value.
     * @private
     */
    enableServerDataBinding(enable: boolean): void;
    /**
     * addText method\
     *
     * @returns { void }    addText method .\
     * @param {boolean} obj - provide the objects value.
     * @param {PointModel} currentPosition - provide the objects value.
     * @private
     */
    addText(obj: Node | Connector, currentPosition: PointModel): void;
    /**
     * isUserHandle method\
     *
     * @returns { boolean }    isUserHandle method .\
     * @param {PointModel} position - provide the objects value.
     * @private
     */
    isUserHandle(position: PointModel): boolean;
    /**
     * selectObjects method\
     *
     * @returns { Promise<void> }    selectObjects method .\
     * @param {(NodeModel | ConnectorModel | AnnotationModel)[]} obj - provide the objects value.
     * @param {boolean} multipleSelection - provide the objects value.
     * @param {(NodeModel | ConnectorModel| AnnotationModel)[]} oldValue - provide the objects value.
     * @private
     */
    selectObjects(obj: (NodeModel | ConnectorModel | AnnotationModel)[], multipleSelection?: boolean, oldValue?: (NodeModel | ConnectorModel | AnnotationModel)[]): Promise<void>;
    /**
     * findParent method\
     *
     * @returns { Node }    findParent method .\
     * @param {Node} node - provide the objects value.
     * @private
     */
    findParent(node: Node): Node;
    private selectProcesses;
    private selectGroup;
    private selectBpmnSubProcesses;
    private hasProcesses;
    /**
     * select method\
     *
     * @returns { void }    select method .\
     * @param {NodeModel | ConnectorModel} obj - provide the objects value.
     * @param {boolean} multipleSelection - provide the objects value.
     * @param {boolean} preventUpdate - provide the objects value.
     * @private
     */
    select(obj: NodeModel | ConnectorModel, multipleSelection?: boolean, preventUpdate?: boolean): void;
    /**
     * labelSelect method\
     *
     * @returns { void }    labelSelect method .\
     * @param {NodeModel | ConnectorModel | AnnotationModel} obj - provide the objects value.
     * @param {DiagramElement} textWrapper - provide the objects value.
     * @private
     */
    labelSelect(obj: NodeModel | ConnectorModel, textWrapper: DiagramElement, oldValue?: (NodeModel | ConnectorModel | AnnotationModel)[]): void;
    /**
     * unSelect method\
     *
     * @returns { void }    unSelect method .\
     * @param {NodeModel | ConnectorModel} obj - provide the objects value.
     * @private
     */
    unSelect(obj: NodeModel | ConnectorModel): void;
    /**
     * getChildElements method\
     *
     * @returns { string[] }    getChildElements method .\
     * @param {DiagramElement[]} child - provide the objects value.
     * @private
     */
    /**
     * moveSvgNode method\
     *
     * @returns { void }    moveSvgNode method .\
     * @param {string} nodeId - provide the objects value.
     * @param {string} targetID - provide the objects value.
     * @private
     */
    moveSvgNode(nodeId: string, targetID: string): void;
    private moveAfterSvgNode;
    /**
     * sendLayerBackward method\
     *
     * @returns { void }    sendLayerBackward method .\
     * @param {string} layerName - provide the objects value.
     * @private
     */
    sendLayerBackward(layerName: string): void;
    /**
     * bringLayerForward method\
     *
     * @returns { void }    bringLayerForward method .\
     * @param {string} layerName - provide the objects value.
     * @private
     */
    bringLayerForward(layerName: string): void;
    /**
     * sendToBack method\
     *
     * @returns { void }    sendToBack method .\
     * @param {NodeModel | ConnectorModel} object - provide the objects value.
     * @private
     */
    sendToBack(object?: NodeModel | ConnectorModel): void;
    findMaxZIndex(parent: Node): number;
    private updateGroupZindex;
    updateLayersZindexTable(layerIndex: number): void;
    private updateLayerZindexTable;
    private swapZIndexObjects;
    private resetTargetNode;
    private checkParentExist;
    checkObjectBehind(objectId: string, zIndexTable: {}, index: number): boolean;
    /**
     * bringToFront method\
     *
     * @returns {  void  }    bringToFront method .\
     *  @param {NodeModel | ConnectorModel } obj - Provide the nodeArray element .
     * @private
     */
    bringToFront(obj?: NodeModel | ConnectorModel): void;
    private triggerOrderCommand;
    private checkGroupNode;
    /**
     * sortByZIndex method\
     *
     * @returns {  Object[] }    sortByZIndex method .\
     *  @param { Object[] } nodeArray - Provide the nodeArray element .
     *  @param { string } sortID - Provide the sortID element .
     * @private
     */
    sortByZIndex(nodeArray: Object[], sortID?: string, command?: string): Object[];
    /**
     * orderCommands method\
     *
     * @returns {  void }    orderCommands method .\
     *  @param { boolean } isRedo - Provide the previousObject element .
     *  @param { Selector } selector - Provide the previousObject element .
     *  @param { EntryType } action - Provide the previousObject element .
     * @private
     */
    orderCommands(isRedo: boolean, selector: Selector, action: EntryType): void;
    /**
     * sendForward method\
     *
     * @returns {  void }    sendForward method .\
     *  @param {  NodeModel | ConnectorModel } obj - Provide the previousObject element .
     * @private
     */
    sendForward(obj?: NodeModel | ConnectorModel): void;
    private updateZIndexBySendForward;
    private findGreatestChildZIndex;
    private notChildOfSelectedNode;
    /**
     * sendBackward method\
     *
     * @returns {  void }    sendBackward method .\
     *  @param {  NodeModel | ConnectorModel } obj - Provide the previousObject element .
     * @private
     */
    sendBackward(obj?: NodeModel | ConnectorModel): void;
    private updateZIndexBySendBackward;
    private findLowestChildZIndex;
    /**
     * updateNativeNodeIndex method\
     *
     * @returns {  void }    updateNativeNodeIndex method .\
     *  @param { string } nodeId - Provide the previousObject element .
     *  @param { string } targetID - Provide the previousObject element .
     * @private
     */
    updateNativeNodeIndex(nodeId: string, targetID?: string): void;
    /**
     * initSelectorWrapper method\
     *
     * @returns {  void }    initSelectorWrapper method .\
     * @private
     */
    initSelectorWrapper(): void;
    /**
     * doRubberBandSelection method\
     *
     * @returns {  void }    doRubberBandSelection method .\
     *  @param { Rect } region - Provide the previousObject element .
     * @private
     */
    doRubberBandSelection(region: Rect): void;
    private clearSelectionRectangle;
    /**
     * dragConnectorEnds method\
     *
     * @returns {  void }    dragConnectorEnds method .\
     *  @param { string } endPoint - Provide the previousObject element .
     *  @param { IElement } obj - Provide the previousObject element .
     *  @param { PointModel } point - Provide the point element .
     *  @param { BezierSegmentModel } segment - Provide the segment element .
     *  @param { IElement } target - Provide the target element .
     *  @param { string } targetPortId - Provide the targetPortId element .
     * @private
     */
    dragConnectorEnds(endPoint: string, obj: IElement, point: PointModel, segment: BezierSegmentModel, target?: IElement, targetPortId?: string): boolean;
    /**
     * getSelectedObject method\
     *
     * @returns {  void }    getSelectedObject method .\
     * @private
     */
    getSelectedObject(): (NodeModel | ConnectorModel | AnnotationModel)[];
    enableCloneObject(value: boolean): void;
    /**
     * getBlazorOldValues method\
     *
     * @returns {  void }    getBlazorOldValues method .\
     *  @param { MouseEventArgs } args - Provide the previousObject element .
     *  @param { boolean } labelDrag - Provide the previousObject element .
     * @private
     */
    getBlazorOldValues(args?: MouseEventArgs, labelDrag?: boolean): void;
    /**
     * clearObjectSelection method\
     *
     * @returns {  void }    clearObjectSelection method .\
     *  @param { (NodeModel | ConnectorModel) } mouseDownElement - Provide the triggerAction element .
     * @private
     */
    clearObjectSelection(mouseDownElement: (NodeModel | ConnectorModel)): void;
    /**
     * clearSelection method\
     *
     * @returns {  void }    clearSelection method .\
     *  @param { boolean } triggerAction - Provide the triggerAction element .
     *  @param { boolean } isTriggered - Provide the isTriggered element .
     * @private
     */
    clearSelection(triggerAction?: boolean, isTriggered?: boolean): Promise<void>;
    /**
     * clearSelectedItems method\
     *
     * @returns {  void }    clearSelectedItems method .\
     * @private
     */
    clearSelectedItems(): void;
    /**
     * removeStackHighlighter method\
     *
     * @returns {  void }    removeStackHighlighter method .\
     * @private
     */
    removeStackHighlighter(): void;
    /**
     * @param {End} args - provide the args  value.
     * @param {IElement} target - provide the target  value.
     * @private
     */
    renderStackHighlighter(args: MouseEventArgs, target?: IElement): void;
    /** @private */
    insertBlazorConnector(obj: Selector): void;
    /** @private */
    drag(obj: NodeModel | ConnectorModel, tx: number, ty: number): void;
    /**   @private  */
    connectorSegmentChange(actualObject: Node, existingInnerBounds: Rect, isRotate: boolean): void;
    /** @private */
    updateEndPoint(connector: Connector, oldChanges?: Connector): void;
    /**
     * @param obj
     * @param tx
     * @param ty
     * @param preventUpdate
     * @param point
     * @param endPoint
     * @param update
     * @param target
     * @param targetPortId
     * @param isDragSource
     * @param segment
     * @private
     */
    dragSourceEnd(obj: ConnectorModel, tx: number, ty: number, preventUpdate?: boolean, point?: PointModel, endPoint?: string, update?: boolean, target?: NodeModel, targetPortId?: string, isDragSource?: boolean, segment?: BezierSegmentModel): boolean;
    /**
     * Update Path Element offset
     */
    updatePathElementOffset(connector: ConnectorModel): void;
    /**
     * Upadte the connector segments when change the source node
     */
    private changeSegmentLength;
    private canConnect;
    /**
     * Change the connector endPoint to port
     */
    private changeSourceEndToPort;
    /**
     * @param connector
     * @param changeTerminal
     * @private
Remove terinal segment in initial
     */
    removeTerminalSegment(connector: Connector, changeTerminal?: boolean): void;
    /**
     * Change the connector endPoint from point to node
     */
    private changeSourceEndToNode;
    private translateBezierPoints;
    private translateSubsequentSegment;
    private updatePreviousBezierSegment;
    private updateNextBezierSegment;
    /**
     * dragTargetEnd method \
     *
     * @returns { void }     dragTargetEnd method .\
     * @param {ConnectorModel} obj - provide the obj value.
     * @param {number} tx - provide the tx value.
     * @param {number} ty - provide the ty value.
     * @param {boolean} preventUpdate - provide the preventUpdate value.
     * @param {PointModel} point - provide the point value.
     * @param {string} endPoint - provide the endPoint value.
     * @param {boolean} update - provide the update value.
     * @param {OrthogonalSegmentModel | BezierSegmentModel | StraightSegmentModel} segment - provide the segment value.
     *
     * @private
     */
    dragTargetEnd(obj: ConnectorModel, tx: number, ty: number, preventUpdate?: boolean, point?: PointModel, endPoint?: string, update?: boolean, segment?: OrthogonalSegmentModel | BezierSegmentModel | StraightSegmentModel): boolean;
    /**
     * dragControlPoint method \
     *
     * @returns { void }     dragControlPoint method .\
     * @param {ConnectorModel} obj - provide the obj value.
     * @param {number} tx - provide the tx value.
     * @param {number} ty - provide the ty value.
     * @param {boolean} preventUpdate - provide the preventUpdate value.
     * @param {number} segmentNumber - provide the segmentNumber value.
     *
     * @private
     */
    dragControlPoint(obj: ConnectorModel, tx: number, ty: number, preventUpdate?: boolean, segmentNumber?: number): boolean;
    updateDirectionalBezierCurve(connector: ConnectorModel): void;
    /**
     * rotateObjects method \
     *
     * @returns { void }     rotateObjects method .\
     * @param {NodeModel | SelectorModel} parent - provide the parent value.
     * @param {(NodeModel | ConnectorModel)[]} objects - provide the objects value.
     * @param {number} angle - provide the angle value.
     * @param {PointModel} pivot - provide the pivot value.
     * @param {boolean} includeParent - provide the includeParent value.
     *
     * @private
     */
    rotateObjects(parent: NodeModel | SelectorModel, objects: (NodeModel | ConnectorModel)[], angle: number, pivot?: PointModel, includeParent?: boolean): void;
    /**
     * snapConnectorEnd method \
     *
     * @returns { PointModel }     snapConnectorEnd method .\
     * @param {PointModel} currentPosition - provide the parent value.
     *
     * @private
     */
    snapConnectorEnd(currentPosition: PointModel): PointModel;
    /**
     * snapAngle method \
     *
     * @returns { number }     snapAngle method .\
     * @param {number} angle - provide the parent value.
     *
     * @private
     */
    snapAngle(angle: number): number;
    /**
     * rotatePoints method \
     *
     * @returns { number }     rotatePoints method .\
     * @param {Connector} conn - provide the parent value.
     * @param {number} angle - provide the parent value.
     * @param {PointModel} pivot - provide the parent value.
     *
     * @private
     */
    rotatePoints(conn: Connector, angle: number, pivot: PointModel): void;
    private updateInnerParentProperties;
    /**
     * scale method \
     *
     * @returns { boolean }     scale method .\
     * @param {NodeModel | ConnectorModel} obj - provide the parent value.
     * @param {number} sw - provide the parent value.
     * @param {number} sh - provide the parent value.
     * @param {number} pivot - provide the parent value.
     * @param {number} refObject - provide the parent value.
     * @param {boolean} isOutsideBoundary - provide the parent value.
     *
     * @private
     */
    scale(obj: NodeModel | ConnectorModel, sw: number, sh: number, pivot: PointModel, refObject?: IElement, isOutsideBoundary?: boolean): boolean;
    /** @private */
    getAllDescendants(node: NodeModel, nodes: (NodeModel | ConnectorModel)[], includeParent?: boolean, innerParent?: boolean): (NodeModel | ConnectorModel)[];
    /**
     * getChildren method \
     *
     * @returns { (NodeModel | ConnectorModel)[]): (NodeModel | ConnectorModel)[] }     getChildren method .\
     * @param {NodeModel} node - provide the sw value.
     * @param {(NodeModel | ConnectorModel)[]} nodes - provide the sw value.
     *
     * @private
     */
    getChildren(node: NodeModel, nodes: (NodeModel | ConnectorModel)[]): (NodeModel | ConnectorModel)[];
    /**
     * scaleObject method \
     *
     * @returns { NodeModel }     scaleObject method .\
     * @param {string} id - provide the sw value.
     *
     * @private
     */
    cloneChild(id: string): NodeModel;
    /**
     * scaleObject method \
     *
     * @returns { void }     scaleObject method .\
     * @param {End} sw - provide the sw value.
     * @param {End} sh - provide the sh value.
     * @param {PointModel} pivot - provide the pivot value.
     * @param {IElement} obj - provide the pivot value.
     * @param {DiagramElement} element - provide the element value.
     * @param {IElement} refObject - provide the refObject value.
     *
     * @private
     */
    scaleObject(sw: number, sh: number, pivot: PointModel, obj: IElement, element: DiagramElement, refObject: IElement, canUpdate?: boolean): void;
    private scaleConnector;
    private measureSelector;
    private calculateBounds;
    /**
     * portDrag method \
     *
     * @returns { void }     portDrag method .\
     * @param { NodeModel | ConnectorModel} obj - provide the obj value.
     * @param {DiagramElement} portElement - provide the portElement value.
     * @param {number} tx - provide the tx value.
     * @param {number} ty - provide the tx value.
     *
     * @private
     */
    portDrag(obj: NodeModel | ConnectorModel, portElement: DiagramElement, tx: number, ty: number): void;
    /** @private */
    labelDrag(obj: NodeModel | ConnectorModel, textElement: DiagramElement, tx: number, ty: number): void;
    private updatePathAnnotationOffset;
    private updatePortOffset;
    private getRelativeOffset;
    private dragLimitValue;
    private updateLabelMargin;
    private boundsInterSects;
    /** @private */
    intersect(polyLine1: PointModel[], polyLine2: PointModel[], self: boolean): PointModel[];
    /**
     * @private
     */
    getPointAtLength(length: number, points: PointModel[], angle: number): PointModel;
    private getInterceptWithSegment;
    /** @private */
    getAnnotationChanges(object: NodeModel | ConnectorModel, label: ShapeAnnotation | PathAnnotation): Object;
    /** @private */
    getConnectorPortChanges(object: NodeModel | ConnectorModel, label: PathPort): Object;
    /** @private */
    getPortChanges(object: NodeModel | ConnectorModel, port: PointPort): Object;
    /** @private */
    labelRotate(object: NodeModel | ConnectorModel, label: ShapeAnnotation | PathAnnotation, currentPosition: PointModel, selector: Selector): void;
    /** @private */
    labelResize(node: NodeModel | ConnectorModel, label: ShapeAnnotation | PathAnnotationModel, deltaWidth: number, deltaHeight: number, pivot: PointModel, selector: Selector): void;
    /** @private */
    getSubProcess(source: IElement): SelectorModel;
    /**   @private  */
    checkBoundaryConstraints(tx: number, ty: number, nodeBounds?: Rect, isInitialRendering?: boolean): boolean;
    /** @private */
    dragSelectedObjects(tx: number, ty: number): boolean;
    private checkHtmlObjectDrag;
    private resetOverviewCanvas;
    /** @private */
    scaleSelectedItems(sx: number, sy: number, pivot: PointModel): boolean;
    /** @private */
    rotateSelectedItems(angle: number): boolean;
    /** @private */
    hasSelection(): boolean;
    /** @private */
    isSelected(element: IElement): boolean;
    /**
     * initExpand is used for layout expand and collapse interaction
     */
    initExpand(args: MouseEventArgs): void;
    /** @private */
    expandNode(node: Node, diagram?: Diagram, canLayout?: boolean): ILayout;
    private getparentexpand;
    /**
     * Setinterval and Clear interval for layout animation
     */
    /** @private */
    expandCollapse(source: Node, visibility: boolean, diagram: Diagram, visitedNodes: NodeModel[]): void;
    /**
     * @private
     */
    updateNodeDimension(obj: Node | Connector, rect?: Rect): void;
    /**
     * @private
     */
    updateConnectorPoints(obj: Node | Connector, rect?: Rect): void;
    /**
     * @private
     */
    updateSelectedNodeProperties(object?: NodeModel | ConnectorModel[]): void;
    /** @private */
    drawSelectionRectangle(x: number, y: number, width: number, height: number): void;
    /** @private */
    ReRouteConnector(connector: Object): void;
    /** @private */
    startGroupAction(): void;
    /** @private */
    endGroupAction(): void;
    /** @private */
    removeChildFromBPmn(child: IElement, newTarget: IElement, oldTarget: IElement): void;
    /** @private */
    isDroppable(source: IElement, targetNodes: IElement): boolean;
    /**
     * @private
     */
    renderHighlighter(args: MouseEventArgs, connectHighlighter?: boolean, source?: boolean): void;
    /** @private */
    mouseOver(source: IElement, target: IElement, position: PointModel): boolean;
    /**
     * @private
     */
    snapPoint(startPoint: PointModel, endPoint: PointModel, tx: number, ty: number): PointModel;
    /**
     * @private
     */
    removeSnap(): void;
    /** @private */
    /**Bug(EJ2-62725): Exception occurs when drag and drop the connector inside the swimlane */
    dropAnnotation(source: IElement, target: IElement): void;
    /** @private */
    drop(source: IElement, target: IElement, position: PointModel): void;
    /** @private */
    addHistoryEntry(entry: HistoryEntry): void;
    /** @private */
    align(objects: (NodeModel | ConnectorModel)[], option: AlignmentOptions, type: AlignmentMode): void;
    /**
     * distribute method \
     *
     * @returns { void }     distribute method .\
     * @param {(NodeModel | ConnectorModel)[]} objects - provide the source value.
     * @param {SizingOptions} option - provide the target value.
     *
     * @private
     */
    distribute(objects: (NodeModel | ConnectorModel)[], option: DistributeOptions): void;
    /**
     * sameSize method \
     *
     * @returns { void }     sameSize method .\
     * @param {(NodeModel | ConnectorModel)[]} objects - provide the source value.
     * @param {SizingOptions} option - provide the target value.
     *
     * @private
     */
    sameSize(objects: (NodeModel | ConnectorModel)[], option: SizingOptions): void;
    private storeObject;
    /**
     * updatePanState method \
     *
     * @returns { any }     updatePanState method .\
     * @param {number} eventCheck - provide the eventCheck value.
     *
     * @private
     */
    updatePanState(eventCheck: boolean): any;
    /**
     * dataBinding method \
     *
     * @returns { void }     dataBinding method .\
     *
     * @private
     */
    dataBinding(): void;
    setBlazorDiagramProps(arg: boolean): void;
    /**
     * scroll method \
     *
     * @returns { void }     scroll method .\
     * @param {number} scrollX - provide the source value.
     * @param {number} scrollY - provide the target value.
     * @param {PointModel} focusPoint - provide the layoutOrientation value.
     *
     * @private
     */
    scroll(scrollX: number, scrollY: number, focusPoint?: PointModel): void;
    /**
     * drawHighlighter method \
     *
     * @returns { NodeModel | ConnectorModel }     drawHighlighter method .\
     * @param {IElement} element - provide the element value.
     *
     * @private
     */
    drawHighlighter(element: IElement): void;
    /**
     * removeHighlighter method \
     *
     * @returns { void }     removeHighlighter method .\
     *
     * @private
     */
    removeHighlighter(): void;
    /**
     * renderContainerHelper method \
     *
     * @returns { NodeModel | ConnectorModel }     renderContainerHelper method .\
     * @param {NodeModel | SelectorModel | ConnectorModel} node - provide the parent value.
     *
     * @private
     */
    renderContainerHelper(node: NodeModel | SelectorModel | ConnectorModel): NodeModel | ConnectorModel;
    /**
     * isParentAsContainer method \
     *
     * @returns { boolean }     isParentAsContainer method .\
     * @param {NodeModel} node - provide the parent value.
     * @param {boolean} isChild - provide the target value.
     *
     * @private
     */
    isParentAsContainer(node: NodeModel, isChild?: boolean): boolean;
    /**
     * @returns { boolean } isParentAsContainer method .\
     * @param {NodeModel} node - provide the target Node value.
     * @private
     */
    isTargetSubProcess(node: NodeModel): boolean;
    /**
     * dropChildToContainer method \
     *
     * @returns { void }     dropChildToContainer method .\
     * @param {NodeModel} parent - provide the parent value.
     * @param {NodeModel} node - provide the target value.
     *
     * @private
     */
    dropChildToContainer(parent: NodeModel, node: NodeModel): void;
    /**
     * @returns { void }     updateLaneChildrenZindex method .\
     * @param {NodeModel} node - provide the node value.
     * @param {IElement} target - provide the target value.
     * @private
     */
    updateLaneChildrenZindex(node: Node, target: IElement): void;
    private findLeastIndexConnector;
    private findLeastIndexObject;
    /**
     * checkSelection method \
     *
     * @returns { void }     checkSelection method .\
     * @param {SelectorModel} selector - provide the source value.
     * @param {string} corner - provide the target value.
     *
     * @private
     */
    checkSelection(selector: SelectorModel, corner: string): void;
    /**
     * zoom method \
     *
     * @returns { void }     zoom method .\
     * @param {number} scale - provide the source value.
     * @param {number} scrollX - provide the target value.
     * @param {number} scrollY - provide the layoutOrientation value.
     * @param {PointModel} focusPoint - provide the layoutOrientation value.
     *
     * @private
     */
    zoom(scale: number, scrollX: number, scrollY: number, focusPoint?: PointModel): void;
}
/** @private */
export interface ConnectorPropertyChanging {
    connectorIndex?: number;
    connectorOldProperty?: ConnectorModel;
    sourceId?: string;
    targetId?: string;
    sourcePoint?: PointModel;
    targetPoint?: PointModel;
    sourcePortId?: string;
    targetPortId?: string;
    connectors?: ConnectorModel[];
}
/** @private */
export interface NodePropertyChanging {
    nodeIndex?: number;
    nodeOldProperty?: NodeModel;
    offsetX?: number;
    offsetY?: number;
    nodes?: NodeModel[];
}
/** @private */
export interface TransactionState {
    element: SelectorModel;
    backup: ObjectState;
}
/** @private */
export interface ClipBoardObject {
    pasteIndex?: number;
    clipObject?: Object;
    childTable?: {};
    processTable?: {};
}
/** @private */
export interface ObjectState {
    offsetX?: number;
    offsetY?: number;
    width?: number;
    height?: number;
    pivot?: PointModel;
    angle?: number;
}
/** @private */
export interface Distance {
    minDistance?: number;
}
/** @private */
export interface IsDragArea {
    x?: boolean;
    y?: boolean;
}
