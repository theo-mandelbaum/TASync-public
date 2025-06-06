import { Size } from './../primitives/size';
import { PointModel } from './../primitives/point-model';
import { Rect } from './../primitives/rect';
import { DiagramElement, Corners } from './../core/elements/diagram-element';
import { TextStyleModel } from './../core/appearance-model';
import { PortVisibility, Shapes, DiagramAction, EventState, ChangeType, ControlPointsVisibility } from './../enum/enum';
import { SelectorConstraints, ThumbsConstraints, DistributeOptions } from './../enum/enum';
import { Alignment, SegmentInfo } from '../rendering/canvas-interface';
import { PathElement } from './../core/elements/path-element';
import { DiagramNativeElement } from './../core/elements/native-element';
import { PathAnnotation } from './../objects/annotation';
import { TextModel } from './../objects/node-model';
import { Node } from './../objects/node';
import { NodeModel } from './../objects/node-model';
import { Connector } from './../objects/connector';
import { ConnectorModel } from './../objects/connector-model';
import { Diagram } from './../diagram';
import { Intersection } from './connector';
import { SelectorModel } from '../objects/node-model';
import { UserHandleModel } from '../interaction/selector-model';
import { PointPortModel } from './../objects/port-model';
import { ShapeAnnotationModel, PathAnnotationModel, HyperlinkModel, AnnotationModel } from './../objects/annotation-model';
import { DiagramHtmlElement } from '../core/elements/html-element';
import { TransformFactor as Transforms, Segment } from '../interaction/scroller';
import { SymbolPalette } from '../../symbol-palette/symbol-palette';
import { Selector } from '../objects/node';
import { Canvas } from '../core/containers/canvas';
import { PathPort, Port } from '../objects/port';
import { TreeInfo, INode } from '../layout/layout-base';
import { MouseEventArgs } from '../interaction/event-handlers';
import { IBlazorDropEventArgs, IBlazorCollectionChangeEventArgs } from '../objects/interface/IElement';
import { ConnectorFixedUserHandleModel, NodeFixedUserHandleModel } from '../objects/fixed-user-handle-model';
import { ConnectorFixedUserHandle } from '../objects/fixed-user-handle';
import { SymbolPaletteModel } from '../../symbol-palette';
import { FlowChartData } from '../data-binding/data-binding';
/**
 * completeRegion method\
 *
 * @returns {  void }    completeRegion method .\
 * @param {Rect} region - provide the region value.
 * @param {(NodeModel | ConnectorModel)[]} selectedObjects - provide the selectedObjects value.
 * @private
 */
export declare function completeRegion(region: Rect, selectedObjects: (NodeModel | ConnectorModel)[]): (NodeModel | ConnectorModel)[];
/**
 * findNodeByName method \
 *
 * @returns {  boolean } findNodeByName method .\
 * @param {(NodeModel | ConnectorModel)[]} nodes - provide the nodes  value.
 * @param {string} name - provide the orientation  value.
 * @private
 */
export declare function findNodeByName(nodes: (NodeModel | ConnectorModel)[], name: string): boolean;
/**
 * findNodeByName method \
 *
 * @returns {  string } findNodeByName method .\
 * @param {(NodeModel | ConnectorModel)[]} drawingObject - provide the drawingObject  value.
 * @private
 */
export declare function findObjectType(drawingObject: NodeModel | ConnectorModel): string;
/**
 * setSwimLaneDefaults method \
 *
 * @returns {  void } setSwimLaneDefaults method .\
 * @param {NodeModel | ConnectorModel} child - provide the child  value.
 * @param {NodeModel | ConnectorModel} node - provide the node  value.
 * @private
 */
export declare function setSwimLaneDefaults(child: NodeModel | ConnectorModel, node: NodeModel | ConnectorModel): void;
/**
 * getSpaceValue method \
 *
 * @returns {  number } getSpaceValue method .\
 * @param {number[]} intervals - provide the intervals  value.
 * @param {boolean} isLine - provide the isLine  value.
 * @param {number} i - provide the i  value.
 * @param {number} space - provide the space  value.
 * @private
 */
export declare function getSpaceValue(intervals: number[], isLine: boolean, i: number, space: number): number;
/**
 * getInterval method \
 *
 * @returns {  number[] } getInterval method .\
 * @param {number[]} intervals - provide the intervals  value.
 * @param {boolean} isLine - provide the isLine  value.
 * @private
 */
export declare function getInterval(intervals: number[], isLine: boolean): number[];
/**
 * setPortsEdges method \
 *
 * @returns {  Node } setPortsEdges method .\
 * @param {Node} node - provide the node  value.
 * @private
 */
export declare function setPortsEdges(node: Node): Node;
/**
 * setUMLActivityDefaults method \
 *
 * @returns {  void } setUMLActivityDefaults method .\
 * @param {NodeModel | ConnectorModel} child - provide the child  value.
 * @param {NodeModel | ConnectorModel} node - provide the node  value.
 * @private
 */
export declare function setUMLActivityDefaults(child: NodeModel | ConnectorModel, node: NodeModel | ConnectorModel): void;
/**
 * setConnectorDefaults method \
 *
 * @returns {  void } setConnectorDefaults method .\
 * @param {ConnectorModel} child - provide the child  value.
 * @param {ConnectorModel} node - provide the node  value.
 * @private
 */
export declare function setConnectorDefaults(child: ConnectorModel, node: ConnectorModel): void;
/**
 * findNearestPoint method \
 *
 * @returns {  PointModel } findNearestPoint method .\
 * @param {PointModel} reference - provide the reference  value.
 * @param {PointModel} start - provide the start  value.
 * @param {PointModel} end - provide the end  value.
 * @private
 */
export declare function findNearestPoint(reference: PointModel, start: PointModel, end: PointModel): PointModel;
/**
 * isDiagramChild method \
 *
 * @returns {  boolean } isDiagramChild method .\
 * @param {HTMLElement} htmlLayer - provide the htmlLayer  value.
 * @private
 */
export declare function isDiagramChild(htmlLayer: HTMLElement): boolean;
/**
 * groupHasType method \
 *
 * @returns {  boolean } groupHasType method .\
 * @param {NodeModel} node - provide the node  value.
 * @param {Shapes} type - provide the type  value.
 * @param {{}} nameTable - provide the nameTable  value.
 * @private
 */
export declare function groupHasType(node: NodeModel, type: Shapes, nameTable: {}): boolean;
/**
 * groupHasType method \
 *
 * @returns {  void } groupHasType method .\
 * @param {NodeModel | ConnectorModel} actualNode - provide the actualNode  value.
 * @param { NodeModel | ConnectorModel} plainValue - provide the plainValue  value.
 * @param {object} defaultValue - provide the defaultValue  value.
 * @param {NodeModel | ConnectorModel} property - provide the property  value.
 * @param {string} oldKey - provide the oldKey  value.
 * @private
 */
export declare function updateDefaultValues(actualNode: NodeModel | ConnectorModel, plainValue: NodeModel | ConnectorModel, defaultValue: object, property?: NodeModel | ConnectorModel, oldKey?: string): void;
/**
 * updateLayoutValue method \
 *
 * @returns {  void } updateLayoutValue method .\
 * @param {TreeInfo} actualNode - provide the actualNode  value.
 * @param { object} defaultValue - provide the defaultValue  value.
 * @param {INode[]} nodes - provide the nodes  value.
 * @param {INode} node - provide the node  value.
 * @private
 */
export declare function updateLayoutValue(actualNode: TreeInfo, defaultValue: object, nodes?: INode[], node?: INode): void;
/**
 * isPointOverConnector method \
 *
 * @returns {  boolean } isPointOverConnector method .\
 * @param {ConnectorModel} connector - provide the connector  value.
 * @param { PointModel} reference - provide the reference  value.
 * @private
 */
export declare function isPointOverConnector(connector: ConnectorModel, reference: PointModel): boolean;
/**
 * intersect3 method \
 *
 * @returns {  Intersection } intersect3 method .\
 * @param {ConnectorModel} lineUtil1 - provide the lineUtil1  value.
 * @param { PointModel} lineUtil2 - provide the lineUtil2  value.
 * @private
 */
export declare function intersect3(lineUtil1: Segment, lineUtil2: Segment): Intersection;
/**
 * intersect2 method \
 *
 * @returns {  PointModel } intersect2 method .\
 * @param {PointModel} start1 - provide the start1  value.
 * @param { PointModel} end1 - provide the end1  value.
 * @param { PointModel} start2 - provide the start2  value.
 * @param { PointModel} end2 - provide the end2  value.
 * @private
 */
export declare function intersect2(start1: PointModel, end1: PointModel, start2: PointModel, end2: PointModel): PointModel;
/**
 * getLineSegment method \
 *
 * @returns {  Segment } getLineSegment method .\
 * @param {number} x1 - provide the x1  value.
 * @param { number} y1 - provide the y1  value.
 * @param { number} x2 - provide the x2  value.
 * @param { number} y2 - provide the y2  value.
 * @private
 */
export declare function getLineSegment(x1: number, y1: number, x2: number, y2: number): Segment;
/**
 * getPoints method \
 *
 * @returns {  PointModel[] } getPoints method .\
 * @param {number} element - provide the element  value.
 * @param { number} corners - provide the corners  value.
 * @param { number} padding - provide the padding  value.
 * @private
 */
export declare function getPoints(element: DiagramElement, corners: Corners, padding?: number): PointModel[];
/**
 * getTooltipOffset method \
 *
 * @returns {  PointModel[] } getTooltipOffset method .\
 * @param {number} diagram - provide the diagram  value.
 * @param { number} mousePosition - provide the mousePosition  value.
 * @param { NodeModel | ConnectorModel | PointPortModel} node - provide the node  value.
 * @param { string} type - provide the type  value.
 * @private
 */
export declare function getTooltipOffset(diagram: Diagram, mousePosition: PointModel, node: NodeModel | ConnectorModel | PointPortModel, type?: string): PointModel;
/**
 * Gets the fixed user handles symbol \
 *
 * @returns { DiagramElement } Gets the fixed user handles symbol .\
 * @param {ConnectorFixedUserHandleModel | NodeFixedUserHandleModel} options - provide the options  value.
 * @param { Canvas} fixedUserHandleContainer - provide the fixedUserHandleContainer  value.
 * @private
 */
export declare function initFixedUserHandlesSymbol(options: ConnectorFixedUserHandleModel | NodeFixedUserHandleModel, fixedUserHandleContainer: Canvas): DiagramElement;
/**
 * sort method \
 *
 * @returns { (NodeModel | ConnectorModel)[] } sort method .\
 * @param {(NodeModel | ConnectorModel)[]} objects - provide the options  value.
 * @param { DistributeOptions} option - provide the fixedUserHandleContainer  value.
 * @private
 */
export declare function sort(objects: (NodeModel | ConnectorModel)[], option: DistributeOptions): (NodeModel | ConnectorModel)[];
/**
 * getAnnotationPosition method \
 *
 * @returns {SegmentInfo } getAnnotationPosition method .\
 * @param {PointModel[]} pts - provide the pts  value.
 * @param { PathAnnotation | ConnectorFixedUserHandle} annotation - provide the annotation  value.
 * @param { Rect } bound - provide the bound  value.
 * @private
 */
export declare function getAnnotationPosition(pts: PointModel[], annotation: PathAnnotation | ConnectorFixedUserHandle, bound: Rect): SegmentInfo;
/**
 * getPortsPosition method \
 *
 * @returns {SegmentInfo } getPortsPosition method .\
 * @param {PointModel[]} pts - provide the pts  value.
 * @param { Port} ports - provide the ports  value.
 * @param { Rect } bound - provide the bound  value.
 * @private
 */
export declare function getPortsPosition(pts: PointModel[], ports: Port, bound: Rect): SegmentInfo;
/**
 * getOffsetOfPorts method \
 *
 * @returns {SegmentInfo } getOffsetOfPorts method .\
 * @param {PointModel[]} points - provide the pts  value.
 * @param { PathAnnotation | ConnectorFixedUserHandle} ports - provide the ports  value.
 * @private
 */
export declare function getOffsetOfPorts(points: PointModel[], ports: Port): SegmentInfo;
/**
 * getAlignedPosition method . To get the port alignment position \
 *
 * @returns {number } getAlignedPosition method .\
 * @param {PointModel[]} ports - provide the annotation value.
 * @private
 */
export declare function getAlignedPositionForPorts(ports: Port): number;
/**
 * getOffsetOfConnector method \
 *
 * @returns {SegmentInfo } getOffsetOfConnector method .\
 * @param {PointModel[]} points - provide the pts  value.
 * @param { PathAnnotation | ConnectorFixedUserHandle} annotation - provide the annotation  value.
 * @private
 */
export declare function getOffsetOfConnector(points: PointModel[], annotation: PathAnnotation | ConnectorFixedUserHandle): SegmentInfo;
/**
 * getAlignedPosition method \
 *
 * @returns {number } getAlignedPosition method .\
 * @param {PointModel[]} annotation - provide the annotation value.
 * @private
 */
export declare function getAlignedPosition(annotation: PathAnnotation | ConnectorFixedUserHandle): number;
/**
 * alignLabelOnSegments method \
 *
 * @returns {Alignment } alignLabelOnSegments method .\
 * @param {PathAnnotation | ConnectorFixedUserHandle} obj - provide the obj  value.
 * @param { number } ang - provide the ang  value.
 * @param { PointModel[] } pts - provide the pts  value.
 * @private
 */
export declare function alignLabelOnSegments(obj: PathAnnotation | ConnectorFixedUserHandle | PathPort, ang: number, pts: PointModel[]): Alignment;
/**
 * getBezierDirection method \
 *
 * @returns {string } getBezierDirection method .\
 * @param {PointModel} src - provide the src  value.
 * @param { PointModel } tar - provide the tar  value.
 * @private
 */
export declare function getBezierDirection(src: PointModel, tar: PointModel): string;
/**
 * removeChildNodes method \
 *
 * @returns {void } removeChildNodes method .\
 * @param {NodeModel} node - provide the node  value.
 * @param { Diagram } diagram - provide the diagram  value.
 * @private
 */
export declare function removeChildNodes(node: NodeModel, diagram: Diagram): void;
/**
 * getChild method \
 *
 * @returns {string[] } getChild method .\
 * @param {Canvas} child - provide the child  value.
 * @param { string[] } children - provide the children  value.
 * @private
 */
export declare function getChild(child: Canvas, children: string[]): string[];
/**
 * serialize method \
 *
 * @returns {string } serialize method .\
 * @param {Diagram} model - provide the model  value.
 * @private
 */
export declare function serialize(model: Diagram): string;
/** @private */
export declare function deserialize(model: string | Object, diagram: Diagram): Object;
/**
 * To change the string type flip into enum type.\
 *
 * @param {(NodeModel | ConnectorModel)[]} obj - provide the node or connector collection.
 * @private
 */
export declare function changeOldFlipDirectionType(obj: (NodeModel | ConnectorModel)[]): void;
/**
 * upgrade method \
 *
 * @returns {Diagram } upgrade method .\
 * @param {Diagram} dataObj - provide the model  value.
 * @private
 */
export declare function upgrade(dataObj: Diagram): Diagram;
/**
 * updateStyle method \
 *
 * @returns {void } updateStyle method .\
 * @param {TextStyleModel} changedObject - provide the changedObject  value.
 * @param {DiagramElement} target - provide the target  value.
 * @private
 */
export declare function updateStyle(changedObject: TextStyleModel, target: DiagramElement): void;
/**
 * updateHyperlink method \
 *
 * @returns {void } updateHyperlink method .\
 * @param {HyperlinkModel} changedObject - provide the changedObject  value.
 * @param {DiagramElement} target - provide the target  value.
 * @param {AnnotationModel} actualAnnotation - provide the actualAnnotation  value.
 * @private
 */
export declare function updateHyperlink(changedObject: HyperlinkModel, target: DiagramElement, actualAnnotation: AnnotationModel): void;
/**
 * updateShapeContent method \
 *
 * @returns {void } updateShapeContent method .\
 * @param {DiagramElement} content - provide the content  value.
 * @param {Node} actualObject - provide the actualObject  value.
 * @param {Diagram} diagram - provide the diagram  value.
 * @private
 */
export declare function updateShapeContent(content: DiagramElement, actualObject: Node, diagram: Diagram): void;
/**
 * updateShape method \
 *
 * @returns {void } updateShape method .\
 * @param {Node} node - provide the node  value.
 * @param {Node} actualObject - provide the actualObject  value.
 * @param {Node} oldObject - provide the oldObject  value.
 * @param {Diagram} diagram - provide the diagram  value.
 * @private
 */
export declare function updateShape(node: Node, actualObject: Node, oldObject: Node, diagram: Diagram): void;
/**
 * updateContent method \
 *
 * @returns {void } updateContent method .\
 * @param {Node} newValues - provide the newValues  value.
 * @param {Node} actualObject - provide the actualObject  value.
 * @param {Diagram} diagram - provide the diagram  value.
 * @param {Node} oldObject - provide the oldObject  value.
 * @private
 */
export declare function updateContent(newValues: Node, actualObject: Node, diagram: Diagram, oldObject: Node): void;
/**
 * updateUmlActivityNode method \
 *
 * @returns {void } updateUmlActivityNode method .\
 * @param {Node} actualObject - provide the newValues  value.
 * @param {Node} newValues - provide the actualObject  value.
 * @private
 */
export declare function updateUmlActivityNode(actualObject: Node, newValues: Node): void;
/**
 * getUMLFinalNode method \
 *
 * @returns {Canvas } getUMLFinalNode method .\
 * @param {Node} node - provide the newValues  value.
 * @private
 */
export declare function getUMLFinalNode(node: Node): Canvas;
/**
 * getUMLActivityShapes method \
 *
 * @returns {DiagramElement } getUMLActivityShapes method .\
 * @param {PathElement} umlActivityShape - provide the umlActivityShape  value.
 * @param {DiagramElement} content - provide the content  value.
 * @param {Node} node - provide the node  value.
 * @private
 */
export declare function getUMLActivityShapes(umlActivityShape: PathElement, content: DiagramElement, node: Node): DiagramElement;
/**
 * removeGradient method \
 *
 * @returns {void } removeGradient method .\
 * @param {string} svgId - provide the umlActivityShape  value.
 * @private
 */
export declare function removeGradient(svgId: string): void;
/**
 * removeItem method \
 *
 * @returns {void } removeItem method .\
 * @param {string[]} array - provide the umlActivityShape  value.
 * @param {string} item - provide the umlActivityShape  value.
 * @private
 */
export declare function removeItem(array: string[], item: string): void;
/**
 * updateConnector method \
 *
 * @returns {void } updateConnector method .\
 * @param {Connector} connector - provide the connector  value.
 * @param {PointModel[]} points - provide the points  value.
 * @param {DiagramAction} diagramActions - provide the diagramActions  value.
 * @private
 */
export declare function updateConnector(connector: Connector, points: PointModel[], diagramActions?: DiagramAction): void;
/**
 * getUserHandlePosition method \
 *
 * @returns {PointModel } getUserHandlePosition method .\
 * @param {SelectorModel} selectorItem - provide the connector  value.
 * @param {UserHandleModel} handle - provide the handle  value.
 * @param {Transforms} transform - provide the transform  value.
 * @private
 */
export declare function getUserHandlePosition(selectorItem: SelectorModel, handle: UserHandleModel, transform?: Transforms): PointModel;
/**
 * canResizeCorner method \
 *
 * @returns {SelectorConstraints } canResizeCorner method .\
 * @param {string} selectorConstraints - provide the selectorConstraints  value.
 * @param {string} action - provide the selectorConstraints  value.
 * @param {ThumbsConstraints} thumbsConstraints - provide the thumbsConstraints  value.
 * @param {Selector} selectedItems - provide the selectedItems  value.
 * @private
 */
export declare function canResizeCorner(selectorConstraints: SelectorConstraints, action: string, thumbsConstraints: ThumbsConstraints, selectedItems: Selector): boolean;
/**
 * canShowCorner method \
 *
 * @returns {boolean } canShowCorner method .\
 * @param {SelectorConstraints} selectorConstraints - provide the selectorConstraints  value.
 * @param {string} action - provide the thumbsConstraints  value.
 * @private
 */
export declare function canShowCorner(selectorConstraints: SelectorConstraints, action: string): boolean;
/**
 * canShowControlPoints method \
 *
 * @returns {boolean } canShowControlPoints method .\
 * @param {ControlPointsVisibility} bezierControlPoints - provide the bezierControlPoints value.
 * @param {string} action - provide the value.
 * @private
 */
export declare function canShowControlPoints(bezierControlPoints: ControlPointsVisibility, action: string): boolean;
/**
 * checkPortRestriction method \
 *
 * @returns {number } checkPortRestriction method .\
 * @param {PointPortModel} port - provide the port  value.
 * @param {PortVisibility} portVisibility - provide the portVisibility  value.
 * @private
 */
export declare function checkPortRestriction(port: PointPortModel, portVisibility: PortVisibility): number;
/**
 * findAnnotation method \
 *
 * @returns {ShapeAnnotationModel | PathAnnotationModel | TextModel } findAnnotation method .\
 * @param { NodeModel | ConnectorModel} node - provide the port  value.
 * @param {string} id - provide the portVisibility  value.
 * @private
 */
export declare function findAnnotation(node: NodeModel | ConnectorModel, id: string): ShapeAnnotationModel | PathAnnotationModel | TextModel;
/**
 * findPort method \
 *
 * @returns {PointPortModel} findPort method .\
 * @param { NodeModel | ConnectorModel} node - provide the port  value.
 * @param {string} id - provide the portVisibility  value.
 * @private
 */
export declare function findPort(node: NodeModel | ConnectorModel, id: string): PointPortModel;
/**
 * getInOutConnectPorts method \
 *
 * @returns {PointPortModel} getInOutConnectPorts method .\
 * @param { NodeModel} node - provide the port  value.
 * @param {boolean} isInConnect - provide the portVisibility  value.
 * @private
 */
export declare function getInOutConnectPorts(node: NodeModel | ConnectorModel, isInConnect: boolean): PointPortModel;
/**
 * findObjectIndex method \
 *
 * @returns {PointPortModel} findObjectIndex method .\
 * @param { NodeModel | ConnectorModel} node - provide the node  value.
 * @param {string} id - provide the string  value.
 * @param {boolean} annotation - provide the boolean  value.
 * @private
 */
export declare function findObjectIndex(node: NodeModel | ConnectorModel, id: string, annotation?: boolean): string;
/**
 * findPortIndex method \
 *
 * @returns {PointPortModel} findPortIndex method .\
 * @param { NodeModel | ConnectorModel} node - provide the node  value.
 * @param {string} id - provide the string  value.
 * @param {boolean} port - provide the boolean  value.
 * @private
 */
export declare function findPortIndex(node: NodeModel | ConnectorModel, id: string, port?: boolean): string;
/**
 * getObjectFromCollection method \
 *
 * @returns {boolean} getObjectFromCollection method .\
 * @param { (NodeModel | ConnectorModel)[] } obj - provide the node  value.
 * @param {string} id - provide the string  value.
 * @private
 */
export declare function getObjectFromCollection(obj: (NodeModel | ConnectorModel)[], id: string): boolean;
/**
 * scaleElement method \
 *
 * @returns {void} scaleElement method .\
 * @param { DiagramElement } element - provide the element  value.
 * @param {number} sw - provide the string  value.
 * @param {number} sh - provide the string  value.
 * @param {DiagramElement} refObject - provide the refObject  value.
 * @private
 */
export declare function scaleElement(element: DiagramElement, sw: number, sh: number, refObject: DiagramElement): void;
/**
 * scaleElement method \
 *
 * @returns {void} scaleElement method .\
 * @param { Node } obj - provide the obj  value.
 * @param {number} x - provide the x  value.
 * @param {number} y - provide the y  value.
 * @param {DiagramElement} nameTable - provide the refObject  value.
 * @param {DiagramElement} drop - provide the drop  value.
 * @param {DiagramElement} diagram - provide the diagram  value.
 * @private
 */
export declare function arrangeChild(obj: Node, x: number, y: number, nameTable: {}, drop: boolean, diagram: Diagram | SymbolPalette): void;
/**
 * insertObject method \
 *
 * @returns {void} insertObject method .\
 * @param { NodeModel | ConnectorModel } obj - provide the obj  value.
 * @param { string } key - provide the obj  value.
 * @param { Object[]} collection - provide the x  value.
 * @private
 */
export declare function insertObject(obj: NodeModel | ConnectorModel, key: string, collection: Object[]): void;
/**
 * getElement method \
 *
 * @returns {Object} getElement method .\
 * @param { DiagramHtmlElement | DiagramNativeElement } element - provide the obj  value.
 * @private
 */
export declare function getElement(element: DiagramHtmlElement | DiagramNativeElement): Object;
/**
 * getCollectionChangeEventArguements method \
 *
 * @returns {IBlazorCollectionChangeEventArgs} getCollectionChangeEventArguements method .\
 * @param { IBlazorCollectionChangeEventArgs } args1 - provide the args1  value.
 * @param { NodeModel | ConnectorModel } obj - provide the obj  value.
 * @param { EventState } state - provide the state  value.
 * @param { ChangeType } type - provide the type  value.
 * @private
 */
export declare function getCollectionChangeEventArguements(args1: IBlazorCollectionChangeEventArgs, obj: NodeModel | ConnectorModel, state: EventState, type: ChangeType): IBlazorCollectionChangeEventArgs;
/**
 * getDropEventArguements method \
 *
 * @returns {IBlazorDropEventArgs} getDropEventArguements method .\
 * @param { MouseEventArgs } args - provide the args1  value.
 * @param { IBlazorDropEventArgs } arg - provide the obj  value.
 * @private
 */
export declare function getDropEventArguements(args: MouseEventArgs, arg: IBlazorDropEventArgs): IBlazorDropEventArgs;
/**
 * getPoint method \
 *
 * @returns {PointModel} getPoint method .\
 * @param { number } x - provide the x  value.
 * @param { number } y - provide the y  value.
 * @param { number } w - provide the w  value.
 * @param { number } h - provide the y  value.
 * @param { number } angle - provide the y  value.
 * @param { number } offsetX - provide the y  value.
 * @param { number } offsetY - provide the y  value.
 * @param { PointModel } cornerPoint - provide the y  value.
 * @private
 */
export declare function getPoint(x: number, y: number, w: number, h: number, angle: number, offsetX: number, offsetY: number, cornerPoint: PointModel): PointModel;
/**
 * Get the object as Node | Connector \
 *
 * @returns {Object} Get the object as Node | Connector .\
 * @param { number } obj - provide the x  value.
 * @private
 */
export declare let getObjectType: Function;
/** @private */
export declare let flipConnector: Function;
/** @private */
export declare let updatePortEdges: Function;
/** @private */
export declare let alignElement: Function;
/** @private */
export declare let cloneSelectedObjects: Function;
/** @private */
export declare let updatePathElement: Function;
/** @private */
export declare let getPathOffset: Function;
/** @private */
export declare let checkPort: Function;
/** @private */
export declare let findPath: Function;
/** @private */
export declare let getConnectorDirection: Function;
/** @private */
export declare let findDistance: Function;
/**
 * cloneBlazorObject method \
 *
 * @returns {Object} cloneBlazorObject method .\
 * @param { object } args - provide the args  value.
 * @private
 */
export declare function cloneBlazorObject(args: object): Object;
/**
 * checkBrowserInfo method \
 *
 * @returns {Object} checkBrowserInfo method .\
 * @private
 */
export declare function checkBrowserInfo(): boolean;
/**
 * canMeasureDecoratorPath method \
 *
 * @returns {boolean} canMeasureDecoratorPath method .\
 * @param { string[] } objects - provide the args  value.
 * @private
 */
export declare function canMeasureDecoratorPath(objects: string[]): boolean;
/**
 * getPreviewSize method \
 *
 * @returns {Size} getPreviewSize method .\
 * @param { SymbolPaletteModel } sourceElement - provide the args  value.
 * @param { Node } clonedObject - provide the args  value.
 * @param { DiagramElement } wrapper - provide the args  value.
 * @private
 */
export declare function getPreviewSize(sourceElement: SymbolPaletteModel, clonedObject: Node, wrapper: DiagramElement): Size;
/**
 * getSymbolSize method \
 *
 * @returns {number} getSymbolSize method .\
 * @param { SymbolPaletteModel } sourceElement - provide the sourceElement  value.
 * @param { Node } clonedObject - provide the clonedObject  value.
 * @param { DiagramElement } wrapper - provide the wrapper  value.
 * @param { string } size - provide the size  value.
 * @private
 */
export declare function getSymbolSize(sourceElement: SymbolPaletteModel, clonedObject: Node, wrapper: DiagramElement, size: string): number;
/**
 * findParent method \
 *
 * @returns {string} findParent method .\
 * @param { Node } node - provide the clonedObject  value.
 * @param { Diagram } diagram - provide the diagram  element.
 * @param { string } parent - provide the parent id.
 * @private
 */
export declare function findParentInSwimlane(node: Node, diagram: Diagram, parent: string): string;
/**
 * selectionHasConnector method \
 *
 * @returns {boolean} selectionHasConnector method .\
 * @param { Diagram } diagram - provide the diagram  element.
 * @param { selector } selector - provide the selector element.
 * @private
 */
export declare function selectionHasConnector(diagram: Diagram, selector: Selector): boolean;
/**
 * To Get connector style based on the arrow type
 * @param {FlowChartData} data - provide the flow chart data.
 * @returns {ArrowStyle} - Connector style
 */
export declare function getConnectorArrowType(data: FlowChartData): {
    targetDecorator: string;
    strokeWidth: number;
    strokeDashArray?: undefined;
    opacity?: undefined;
} | {
    targetDecorator: string;
    strokeDashArray: string;
    strokeWidth?: undefined;
    opacity?: undefined;
} | {
    targetDecorator: string;
    strokeWidth: number;
    opacity: number;
    strokeDashArray?: undefined;
};
