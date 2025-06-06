/// <reference path="node-base-model.d.ts" />
import { ChildProperty } from '@syncfusion/ej2-base';
import { StrokeStyleModel, ShapeStyleModel } from '../core/appearance-model';
import { Point } from '../primitives/point';
import { TextElement } from '../core/elements/text-element';
import { PointModel } from '../primitives/point-model';
import { Segments, DecoratorShapes, ConnectorConstraints, ControlPointsVisibility, BezierSegmentEditOrientation, Orientation, SegmentThumbShapes } from '../enum/enum';
import { Direction, LayoutOrientation, Status, BezierSmoothness } from '../enum/enum';
import { DecoratorModel, ConnectorShapeModel, BpmnFlowModel, VectorModel, DiagramConnectorShapeModel, BezierSettingsModel } from './connector-model';
import { Rect } from '../primitives/rect';
import { Bridge } from '../utility/connector';
import { PathElement } from '../core/elements/path-element';
import { PathAnnotation } from './annotation';
import { Canvas } from '../core/containers/canvas';
import { IElement } from './interface/IElement';
import { Container } from '../core/containers/container';
import { DiagramElement } from '../core/elements/diagram-element';
import { AssociationFlow, ClassifierShape, Multiplicity, DiagramAction } from '../enum/enum';
import { ConnectionShapes, UmlActivityFlows, BpmnFlows, BpmnMessageFlows, BpmnSequenceFlows, BpmnAssociationFlows } from '../enum/enum';
import { PathAnnotationModel } from './annotation-model';
import { NodeBase } from './node-base';
import { DiagramTooltipModel } from './tooltip-model';
import { OrthogonalSegmentModel, StraightSegmentModel, BezierSegmentModel, ConnectorModel } from './connector-model';
import { RelationShipModel, ClassifierMultiplicityModel, MultiplicityLabelModel } from './connector-model';
import { DiagramHtmlElement } from '../core/elements/html-element';
import { DiagramConnectorSegmentModel } from './connector-model';
import { SymbolSizeModel } from './preview-model';
import { ConnectorFixedUserHandle } from './fixed-user-handle';
import { ConnectorFixedUserHandleModel } from './fixed-user-handle-model';
import { Port } from './port';
import { PathPortModel } from './port-model';
/**
 * Decorators are used to decorate the end points of the connector with some predefined path geometry
 */
export declare class Decorator extends ChildProperty<Decorator> {
    /**
     * Sets the width of the decorator
     *
     * @default 10
     */
    width: number;
    /**
     * Sets the height of the decorator
     *
     * @default 10
     */
    height: number;
    /**
     * Sets the shape of the decorator
     * * None - Sets the decorator shape as None
     * * Arrow - Sets the decorator shape as Arrow
     * * Diamond - Sets the decorator shape as Diamond
     * * Path - Sets the decorator shape as Path
     * * OpenArrow - Sets the decorator shape as OpenArrow
     * * Circle - Sets the decorator shape as Circle
     * * Square - Sets the decorator shape as Square
     * * Fletch - Sets the decorator shape as Fletch
     * * OpenFetch - Sets the decorator shape as OpenFetch
     * * IndentedArrow - Sets the decorator shape as Indented Arrow
     * * OutdentedArrow - Sets the decorator shape as Outdented Arrow
     * * DoubleArrow - Sets the decorator shape as DoubleArrow
     *
     * @default 'Arrow'
     */
    /**
     * ```html
     * <div id='diagram'></div>
     * ```
     * ```typescript
     * let connectors: ConnectorModel[] = [{
     *   id: 'connector', type: 'Straight', sourcePoint: { x: 500, y: 100 }, targetPoint: { x: 600, y: 200 },
     *   sourceDecorator: {
     *    style: { fill: 'black' },
     *    shape: 'Arrow',
     *    pivot: { x: 0, y: 0.5 }},
     *   targetDecorator: {
     *    shape: 'Diamond',
     *    style: { fill: 'blue' },
     *    pivot: { x: 0, y: 0.5 }}
     *  },];
     * let diagram: Diagram = new Diagram({
     * ...
     * connectors: connectors
     * ...
     * });
     * diagram.appendTo('#diagram');
     * ```
     */
    shape: DecoratorShapes;
    /**
     * Defines the appearance of the decorator
     *
     * @default new ShapeStyle()
     */
    style: ShapeStyleModel;
    /**
     * Defines the position of the decorator with respect to the source/target point of the connector
     */
    pivot: PointModel;
    /**
     * Defines the geometry of the decorator shape
     *
     * @default ''
     */
    pathData: string;
}
/**
 * Describes the length and angle between the control point and the start point of bezier segment
 */
export declare class Vector extends ChildProperty<Vector> {
    /**
     * Defines the angle between the connector end point and control point of the bezier segment
     *
     * @default 0
     */
    angle: number;
    /**
     * Defines the distance between the connector end point and control point of the bezier segment
     *
     * @default 0
     */
    distance: number;
}
/**
 * Describes the length and angle between the control point and the start point of bezier segment
 */
export declare class BezierSettings extends ChildProperty<BezierSettings> {
    /**
     * Defines the visibility of the control points in the Bezier connector
     *
     * @default 'All'
     */
    controlPointsVisibility: ControlPointsVisibility;
    /**
     * Defines the editing mode of intermediate point of two bezier curve
     *
     * @default 'FreeForm'
     */
    segmentEditOrientation: BezierSegmentEditOrientation;
    /**
     * Defines the value to maintain the smoothness between the neighboring bezier curves.
     *
     * @default 'Default'
     */
    smoothness: BezierSmoothness;
    /**
     * Specifies whether to reset the current segment collections in response to a change in the connector's source and target ends.
     *
     * @default 'true'
     */
    allowSegmentsReset: boolean;
}
/**
 * Sets the type of the connector
 */
export declare class ConnectorShape extends ChildProperty<ConnectorShape> {
    /**
     * Defines the application specific type of connector
     * * Bpmn - Sets the type of the connection shape as Bpmn
     *
     * @default 'None'
     */
    type: ConnectionShapes;
}
/**
 * Sets the type of the flow in a BPMN Process
 */
export declare class ActivityFlow extends ConnectorShape {
    /**
     * Defines the type of the UMLActivity flows
     * Object - Sets the type of the UMLActivity Flow as Object
     * Control - Sets the type of the UMLActivity Flow as Control
     * Exception - Sets the type of the UMLActivity Flow as Exception
     *
     * @default 'Object'
     * @IgnoreSingular
     */
    flow: UmlActivityFlows;
    /**
     * Defines the height of the exception flow.
     *
     * @default '50'
     */
    exceptionFlowHeight: number;
}
/**
 * Sets the type of the flow in a BPMN Process
 */
export declare class BpmnFlow extends ConnectorShape {
    /**
     * Sets the type of the Bpmn flows
     * * Sequence - Sets the type of the Bpmn Flow as Sequence
     * * Association - Sets the type of the Bpmn Flow as Association
     * * Message - Sets the type of the Bpmn Flow as Message
     *
     * @default 'Sequence'
     */
    flow: BpmnFlows;
    /**
     * Sets the type of the Bpmn Sequence flows
     * * Default - Sets the type of the sequence flow as Default
     * * Normal - Sets the type of the sequence flow as Normal
     * * Conditional - Sets the type of the sequence flow as Conditional
     *
     * @default 'Normal'
     */
    sequence: BpmnSequenceFlows;
    /**
     * Sets the type of the Bpmn message flows
     * * Default - Sets the type of the Message flow as Default
     * * InitiatingMessage - Sets the type of the Message flow as InitiatingMessage
     * * NonInitiatingMessage - Sets the type of the Message flow as NonInitiatingMessage
     *
     * @default ''
     */
    /**
     * ```html
     * <div id='diagram'></div>
     * ```
     * ```typescript
     * let nodes: NodeModel[] = [
     * {
     *   id: 'node1', width: 60, height: 60, offsetX: 75, offsetY: 90,
     *   shape: { type: 'Bpmn', shape: 'Event', event: { event: 'Start', trigger: 'Message' } },
     *     },
     * {
     *   id: 'node2', width: 75, height: 70, offsetX: 210, offsetY: 90,
     *   shape: { type: 'Bpmn', shape: 'Gateway', gateway: { type: 'None' } },
     *  }];
     * let connectors: ConnectorModel[] = [{
     *   id: 'connector', type: 'Straight', sourceID: 'node1', targetID: 'node2',
     *   shape: { type: 'Bpmn', flow: 'Message', message: 'InitiatingMessage' } as BpmnFlowModel
     *  },];
     * let diagram: Diagram = new Diagram({
     * ...
     * nodes: nodes, connectors: connectors
     * ...
     * });
     * diagram.appendTo('#diagram');
     * ```
     *
     * @default 'Default'
     */
    message: BpmnMessageFlows;
    /**
     * Sets the type of the Bpmn association flows
     * * Default - Sets the type of Association flow as Default
     * * Directional - Sets the type of Association flow as Directional
     * * BiDirectional - Sets the type of Association flow as BiDirectional
     * * @default 'Default'
     *
     */
    association: BpmnAssociationFlows;
}
/**
 * Defines the behavior of connector segments
 */
export declare class ConnectorSegment extends ChildProperty<ConnectorSegment> {
    /**
     * Defines the type of the segment
     * * Straight - Sets the segment type as Straight
     * * Orthogonal - Sets the segment type as Orthogonal
     * * Bezier - Sets the segment type as Bezier
     *
     * @default 'Straight'
     */
    type: Segments;
    /**
     * Defines the segment to be drag or not
     *
     * @default true
     */
    allowDrag: boolean;
    /**
     * @private
     */
    points: PointModel[];
    /**
     * @private
     */
    isTerminal: boolean;
    constructor(parent: any, propName: string, defaultValue: Object, isArray?: boolean);
}
/**
 * Defines the behavior of straight segments
 */
export declare class StraightSegment extends ConnectorSegment {
    /**
     * Sets the end point of the connector segment
     *
     * @default new Point(0,0)
     */
    point: PointModel;
    /**
     * Returns the name of class StraightSegment
     *
     * @private
     */
    getClassName(): string;
}
/**
 * Defines the behavior of bezier segments
 */
export declare class BezierSegment extends StraightSegment {
    /**
     * Sets the orientation of endpoint dragging
     *
     * @private
     */
    orientation: Orientation;
    /**
     * Identifies whether the segment is internal
     *
     * @private
     */
    isInternalSegment: boolean;
    /**
     * Sets the first control point of the bezier connector
     *
     * @private
     */
    bezierPoint1: PointModel;
    /**
     *  Sets the second control point of the bezier connector
     *
     * @private
     */
    bezierPoint2: PointModel;
    /**
     * Sets the first control point of the connector
     *
     * @default {}
     */
    point1: PointModel;
    /**
     * Sets the second control point of the connector
     *
     * @default {}
     */
    point2: PointModel;
    /**
     * Defines the length and angle between the source point and the first control point of the diagram
     *
     * @default {}
     */
    vector1: VectorModel;
    /**
     * Defines the length and angle between the target point and the second control point of the diagram
     *
     * @default {}
     */
    vector2: VectorModel;
    /**
     * @private
     * Returns the name of class BezierSegment
     */
    getClassName(): string;
    /**
     * @private
     * Returns the total points of the bezier curve
     */
    getPoints(segments: BezierSegment, start: PointModel): PointModel[];
    /**
     * @private
     * Returns the total points of the bezier curve
     */
    bezireToPoly(start: PointModel, segment: BezierSegment): PointModel[];
    /**
     * @private
     * Returns the total points of the bezier curve
     */
    flattenCubicBezier(points: PointModel[], ptStart: Point, ptCtrl1: Point, ptCtrl2: Point, ptEnd: Point, tolerance: number): void;
}
/**
 * Defines the behavior of orthogonal segments
 */
export declare class OrthogonalSegment extends ConnectorSegment {
    /**
     * Defines the length of orthogonal segment
     * ```html
     * <div id='diagram'></div>
     * ```
     * ```typescript
     * let connectors: ConnectorModel[] = [{
     *       id: 'link2', sourcePoint: { x: 0, y: 0 }, targetPoint: { x: 40, y: 40 }, type: 'Orthogonal',
     *       shape: {
     *           type: 'Bpmn',
     *           flow: 'Message',
     *           association: 'directional'
     *       }, style: {
     *           strokeDashArray: '2,2'
     *       },
     *       segments: [{ type: 'Orthogonal', length: 30, direction: 'Bottom' },
     *       { type: 'Orthogonal', length: 80, direction: 'Right' }]
     *   }];
     * let diagram: Diagram = new Diagram({
     * ...
     * connectors: connectors
     * ...
     * });
     * diagram.appendTo('#diagram');
     * ```
     *
     * @default 0
     */
    length: number;
    /**
     * Sets the direction of orthogonal segment
     * * Left - Sets the direction type as Left
     * * Right - Sets the direction type as Right
     * * Top - Sets the direction type as Top
     * * Bottom - Sets the direction type as Bottom
     *
     * @default null
     */
    direction: Direction;
    /**
     * Returns the module of class OrthogonalSegment
     *
     * @private
     */
    getClassName(): string;
}
/**
 * Defines the behavior of orthogonal segments
 */
export declare class DiagramConnectorSegment extends ChildProperty<DiagramConnectorSegment> {
    /**
     * Defines the type of the segment
     * * Straight - Sets the segment type as Straight
     * * Orthogonal - Sets the segment type as Orthogonal
     * * Bezier - Sets the segment type as Bezier
     *
     * @default 'Straight'
     */
    type: Segments;
    /**
     * Defines the segment to be drag or not
     *
     * @default true
     */
    allowDrag: boolean;
    /**
     * Sets the end point of the connector segment
     *
     * @default new Point(0,0)
     */
    point: PointModel;
    /**
     * Sets the first control point of the connector
     *
     * @default {}
     */
    point1: PointModel;
    /**
     * Sets the second control point of the connector
     *
     * @default {}
     */
    point2: PointModel;
    /**
     * Sets the first control point of the bezier connector
     *
     * @private
     *
     */
    bezierPoint1: PointModel;
    /**
     * @private
     *  Sets the second control point of the bezier connector
     *
     */
    bezierPoint2: PointModel;
    /**
     * Defines the length and angle between the source point and the first control point of the diagram
     *
     * @default {}
     */
    vector1: VectorModel;
    /**
     * Defines the length and angle between the target point and the second control point of the diagram
     *
     * @default {}
     */
    vector2: VectorModel;
    /**
     * Defines the length of orthogonal segment
     * ```html
     * <div id='diagram'></div>
     * ```
     * ```typescript
     * let connectors: ConnectorModel[] = [{
     *       id: 'link2', sourcePoint: { x: 0, y: 0 }, targetPoint: { x: 40, y: 40 }, type: 'Orthogonal',
     *       shape: {
     *           type: 'Bpmn',
     *           flow: 'Message',
     *           association: 'directional'
     *       }, style: {
     *           strokeDashArray: '2,2'
     *       },
     *       segments: [{ type: 'Orthogonal', length: 30, direction: 'Bottom' },
     *       { type: 'Orthogonal', length: 80, direction: 'Right' }]
     *   }];
     * let diagram: Diagram = new Diagram({
     * ...
     * connectors: connectors
     * ...
     * });
     * diagram.appendTo('#diagram');
     * ```
     *
     * @default 0
     */
    length: number;
    /**
     * Sets the direction of orthogonal segment
     * * Left - Sets the direction type as Left
     * * Right - Sets the direction type as Right
     * * Top - Sets the direction type as Top
     * * Bottom - Sets the direction type as Bottom
     *
     * @default null
     */
    direction: Direction;
    /**
     * @private
     * Returns the module of class OrthogonalSegment
     */
    getClassName(): string;
}
/**
 * Get the direction of the control points while the bezier is connected to the node
 */
export declare function getDirection(bounds: Rect, points: PointModel, excludeBounds: boolean): string;
export declare function isEmptyVector(element: VectorModel): boolean;
/**
 * Get the bezier points if control points are not given.
 */
export declare function getBezierPoints(sourcePoint: PointModel, targetPoint: PointModel, direction?: string): PointModel;
/**
 * Get the bezier curve bounds.
 */
export declare function getBezierBounds(startPoint: PointModel, controlPoint1: PointModel, controlPoint2: PointModel, endPoint: PointModel, connector: Connector): Rect;
/**
 * Get the intermediate bezier curve for point over connector
 */
export declare function bezierPoints(connector: ConnectorModel, startPoint: PointModel, point1: PointModel, point2: PointModel, endPoint: PointModel, i: number, max: number): PointModel;
/**
 * Defines the behavior of the UMLActivity Classifier multiplicity connection defaults
 */
export declare class MultiplicityLabel extends ChildProperty<MultiplicityLabel> {
    /**
     * Defines the type of the Classifier Multiplicity
     *
     * @default true
     * @IgnoreSingular
     */
    optional: boolean;
    /**
     * Defines the type of the Classifier Multiplicity
     *
     * @default ''
     * @IgnoreSingular
     */
    lowerBounds: string;
    /**
     * Defines the type of the Classifier Multiplicity
     *
     * @default ''
     * @IgnoreSingular
     */
    upperBounds: string;
}
/**
 * Defines the behavior of the UMLActivity Classifier multiplicity connection defaults
 */
export declare class ClassifierMultiplicity extends ChildProperty<ClassifierMultiplicity> {
    /**
     * Defines the type of the Classifier Multiplicity
     *
     * @default 'OneToOne'
     * @IgnoreSingular
     */
    type: Multiplicity;
    /**
     * Defines the type of the Classifier Multiplicity
     *
     * @default ''
     * @IgnoreSingular
     */
    target: MultiplicityLabelModel;
    /**
     * Defines the type of the Classifier Multiplicity
     *
     * @default ''
     * @IgnoreSingular
     */
    source: MultiplicityLabelModel;
}
/**
 * Defines the behavior of the UMLActivity shape
 */
export declare class RelationShip extends ConnectorShape {
    /**
     * Defines the type of the  UMLConnector
     *
     * @default 'None'
     * @IgnoreSingular
     */
    type: ConnectionShapes;
    /**
     * Defines the association direction
     *
     * @default 'Aggregation'
     * @IgnoreSingular
     */
    relationship: ClassifierShape;
    /**
     * Defines the association direction
     *
     * @default 'Directional'
     * @IgnoreSingular
     */
    associationType: AssociationFlow;
    /**
     * Defines the type of the Classifier Multiplicity
     *
     * @default ''
     * @IgnoreSingular
     */
    multiplicity: ClassifierMultiplicityModel;
}
/**
 * Connector shape for blazor
 */
export declare class DiagramConnectorShape extends ChildProperty<DiagramConnectorShape> {
    /**
     * Defines the application specific type of connector
     * * Bpmn - Sets the type of the connection shape as Bpmn
     *
     * @default 'None'
     */
    type: ConnectionShapes;
    /**
     * Defines the association direction
     *
     * @default 'Directional'
     * @IgnoreSingular
     */
    associationType: AssociationFlow;
    /**
     * Defines the association direction
     *
     * @default 'Aggregation'
     * @IgnoreSingular
     */
    relationship: ClassifierShape;
    /**
     * Defines the type of the Classifier Multiplicity
     *
     * @default ''
     * @IgnoreSingular
     */
    multiplicity: ClassifierMultiplicityModel;
    /**
     * Sets the type of the Bpmn flows
     * * Sequence - Sets the type of the Bpmn Flow as Sequence
     * * Association - Sets the type of the Bpmn Flow as Association
     * * Message - Sets the type of the Bpmn Flow as Message
     *
     * @default 'Sequence'
     */
    bpmnFlow: BpmnFlows;
    /**
     * Sets the type of the Bpmn message flows
     * * Default - Sets the type of the Message flow as Default
     * * InitiatingMessage - Sets the type of the Message flow as InitiatingMessage
     * * NonInitiatingMessage - Sets the type of the Message flow as NonInitiatingMessage
     *
     * @default ''
     */
    /**
     * ```html
     * <div id='diagram'></div>
     * ```
     * ```typescript
     * let nodes: NodeModel[] = [
     * {
     *   id: 'node1', width: 60, height: 60, offsetX: 75, offsetY: 90,
     *   shape: { type: 'Bpmn', shape: 'Event', event: { event: 'Start', trigger: 'Message' } },
     *     },
     * {
     *   id: 'node2', width: 75, height: 70, offsetX: 210, offsetY: 90,
     *   shape: { type: 'Bpmn', shape: 'Gateway', gateway: { type: 'None' } },
     *  }];
     * let connectors: ConnectorModel[] = [{
     *   id: 'connector', type: 'Straight', sourceID: 'node1', targetID: 'node2',
     *   shape: { type: 'Bpmn', flow: 'Message', message: 'InitiatingMessage' } as BpmnFlowModel
     *  },];
     * let diagram: Diagram = new Diagram({
     * ...
     * nodes: nodes, connectors: connectors
     * ...
     * });
     * diagram.appendTo('#diagram');
     * ```
     */
    message: BpmnMessageFlows;
    /**
     * Sets the type of the Bpmn Sequence flows
     * * Default - Sets the type of the sequence flow as Default
     * * Normal - Sets the type of the sequence flow as Normal
     * * Conditional - Sets the type of the sequence flow as Conditional
     *
     * @default 'Normal'
     */
    sequence: BpmnSequenceFlows;
    /**
     * Sets the type of the Bpmn association flows
     * * Default - Sets the type of Association flow as Default
     * * Directional - Sets the type of Association flow as Directional
     * * BiDirectional - Sets the type of Association flow as BiDirectional
     * * @default 'Default'
     */
    association: BpmnAssociationFlows;
    /**
     * Defines the type of the UMLActivity flows
     * Object - Sets the type of the UMLActivity Flow as Object
     * Control - Sets the type of the UMLActivity Flow as Control
     * Exception - Sets the type of the UMLActivity Flow as Exception
     *
     * @default 'Object'
     * @IgnoreSingular
     */
    umlActivityFlow: UmlActivityFlows;
    /**
     * Defines the height of the exception flow.
     *
     * @default '50'
     */
    exceptionFlowHeight: number;
}
/**
 * Connectors are used to create links between nodes
 */
export declare class Connector extends NodeBase implements IElement {
    /**
     * Defines the shape of the connector
     *
     * @default 'Bpmn'
     * @aspType object
     */
    shape: ConnectorShapeModel | BpmnFlowModel | RelationShipModel | DiagramConnectorShapeModel;
    /**
     * Defines the constraints of connector
     * * None - Interaction of the connectors cannot be done.
     * * Select - Selects the connector.
     * * Delete - Delete the connector.
     * * Drag - Drag the connector.
     * * DragSourceEnd - Drag the source end of the connector.
     * * DragTargetEnd - Drag the target end of the connector.
     * * DragSegmentThump - Drag the segment thumb of the connector.
     * * AllowDrop - Allow to drop a node.
     * * Bridging - Creates bridge  on intersection of two connectors.
     * * InheritBridging - Creates bridge  on intersection of two connectors.
     * * PointerEvents - Sets the pointer events.
     * * Tooltip - Displays a tooltip for the connectors.
     * * InheritToolTip - Displays a tooltip for the connectors.
     * * Interaction - Features of the connector used for interaction.
     * * ReadOnly - Enables ReadOnly
     *
     * @default 'Default'
     * @aspNumberEnum
     */
    constraints: ConnectorConstraints;
    /**
     * Defines the bridgeSpace of connector
     *
     * @default 10
     */
    bridgeSpace: number;
    /**
     * Defines the collection of textual annotations of connectors
     *
     * @aspDefaultValueIgnore
     * @default undefined
     */
    /**
     * ```html
     * <div id='diagram'></div>
     * ```
     * ```typescript
     * let connectors: ConnectorModel[] = [{
     *   id: 'connector', type: 'Straight', sourcePoint: { x: 500, y: 100 }, targetPoint: { x: 600, y: 200 },
     * annotations: [{ content: 'No', offset: 0, alignment: 'After' }]
     * ];
     * let diagram: Diagram = new Diagram({
     * ...
     * connectors: connectors
     * ...
     * });
     * diagram.appendTo('#diagram');
     * ```
     *
     */
    annotations: PathAnnotationModel[];
    /**
     * Sets the beginning point of the connector
     *
     * @default new Point(0,0)
     */
    sourcePoint: PointModel;
    /**
     * Sets the end point of the connector
     *
     * @default new Point(0,0)
     */
    targetPoint: PointModel;
    /**
     * Specifies the collection of the fixed user handle
     *
     * @aspDefaultValueIgnore
     * @default undefined
     */
    fixedUserHandles: ConnectorFixedUserHandleModel[];
    /**
     * Defines the segments
     *
     * @default []
     * @aspType object
     */
    segments: (OrthogonalSegmentModel | StraightSegmentModel | BezierSegmentModel | DiagramConnectorSegmentModel)[];
    /**
     * Sets the source node/connector object of the connector
     *
     * @default null
     */
    sourceID: string;
    /**
     * Sets the target node/connector object of the connector
     *
     * @default null
     */
    targetID: string;
    /**
     * Sets the connector padding value
     *
     * @default 10
     */
    hitPadding: number;
    /**
     * Sets the connector padding value
     *
     * @default 0
     */
    connectionPadding: number;
    /**
     * Defines the type of the connector
     * * Straight - Sets the segment type as Straight
     * * Orthogonal - Sets the segment type as Orthogonal
     * * Bezier - Sets the segment type as Bezier
     *
     * @default 'Straight'
     * @aspType Syncfusion.EJ2.Diagrams.Segments
     */
    type: Segments;
    /**
     * Defines the shape for the connector segmentThumb
     * Rhombus - Sets the segmentThumb shape as Rhombus
     * Square - Sets the segmentThumb shape as Square
     * Rectangle - Sets the segmentThumb shape as Rectangle
     * Ellipse - Sets the segmentThumb shape as Ellipse
     * Arrow - Sets the segmentThumb shape as Arrow
     * Diamond - Sets the segmentThumb shape as Diamond
     * OpenArrow - Sets the segmentThumb shape as OpenArrow
     * Circle - Sets the segmentThumb shape as Circle
     * Fletch - Sets the segmentThumb shape as Fletch
     * OpenFetch - Sets the segmentThumb shape as OpenFetch
     * IndentedArrow - Sets the segmentThumb shape as Indented Arrow
     * OutdentedArrow - Sets the segmentThumb shape as Outdented Arrow
     * DoubleArrow - Sets the segmentThumb shape as DoubleArrow
     *
     * @default 'Circle'
     */
    segmentThumbShape: SegmentThumbShapes;
    /**
     * Specifies the size of the segment thumb for individual connector. When not set, it defaults to matching the underlying path data
     *
     * @default 10
     */
    segmentThumbSize: number;
    /**
     * Sets the corner radius of the connector
     *
     * @default 0
     */
    cornerRadius: number;
    /**
     * Defines the source decorator of the connector
     *
     * @default new Decorator()
     */
    sourceDecorator: DecoratorModel;
    /**
     * Defines the target decorator of the connector
     *
     * @default new Decorator()
     */
    targetDecorator: DecoratorModel;
    /**
     * defines the tooltip for the connector
     *
     * @default new DiagramToolTip();
     */
    tooltip: DiagramTooltipModel;
    /**
     * Sets the unique id of the source port of the connector
     *
     * @default ''
     */
    sourcePortID: string;
    /**
     * Sets the unique id of the target port of the connector
     *
     * @default ''
     */
    targetPortID: string;
    /**
     * Sets the source padding of the connector
     *
     * @default 0
     */
    sourcePadding: number;
    /**
     * Defines the size of the symbol preview
     *
     * @aspDefaultValueIgnore
     * @default undefined
     */
    previewSize: SymbolSizeModel;
    /**
     * Defines the size of a drop symbol
     *
     * @aspDefaultValueIgnore
     * @default undefined
     */
    dragSize: SymbolSizeModel;
    /**
     * Sets the target padding of the connector
     *
     * @default 0
     */
    targetPadding: number;
    /**
     * Sets the distance between source node and connector
     *
     * @default 13
     */
    connectorSpacing: number;
    /**
     * Defines the appearance of the connection path
     *
     * @default ''
     */
    style: StrokeStyleModel;
    /**
     * Sets the maximum segment thumb for the connector
     *
     * @default null
     */
    maxSegmentThumb: number;
    /**
     * Specifies a value indicating whether to overlap the connector over with the source and target node.
     * If the LineRouting is enabled in the diagram, then allowNodeOverlap property will not work.
     *
     * @default false
     */
    allowNodeOverlap: boolean;
    /**
     * Sets the bezier settings of editing the segments.
     *
     * @default null
     */
    bezierSettings: BezierSettingsModel;
    /** @private */
    parentId: string;
    /**
     * Defines the behavior of connection ports
     *
     * @aspDefaultValueIgnore
     * @default undefined
     */
    ports: PathPortModel[];
    /**
     * Defines the UI of the connector
     *
     * @default null
     * @deprecated
     */
    wrapper: Container;
    /** @private */
    bridges: Bridge[];
    /** @private */
    sourceWrapper: DiagramElement;
    /** @private */
    targetWrapper: DiagramElement;
    /** @private */
    sourcePortWrapper: DiagramElement;
    /** @private */
    targetPortWrapper: DiagramElement;
    /** @private */
    intermediatePoints: PointModel[];
    /** @private */
    status: Status;
    /** @private */
    isBezierEditing: boolean;
    /** @private */
    selectedSegmentIndex: number;
    /** @private */
    outEdges: string[];
    /** @private */
    inEdges: string[];
    constructor(parent: any, propName: string, defaultValue: Object, isArray?: boolean);
    private setPortID;
    /** @private */
    init(diagram: any): Canvas;
    /** @private */
    initPorts(accessibilityContent: Function | string, container: Container, bounds: Rect): void;
    /** @private */
    initPort(ports: Port, points: PointModel[], bounds: Rect, accessibilityContent: Function | string): PathElement | DiagramElement;
    /** @private */
    initPortWrapper(ports: Port, points: PointModel[], bounds: Rect, portContent: PathElement | DiagramElement | DiagramHtmlElement, Connector?: ConnectorModel | PathElement): DiagramElement;
    private getConnectorRelation;
    private getBpmnSequenceFlow;
    /** @private */
    getUMLObjectFlow(): void;
    /** @private */
    getUMLExceptionFlow(segment: PathElement): void;
    private getBpmnAssociationFlow;
    /** @private */
    getFixedUserHandle(fixedUserHandle: ConnectorFixedUserHandle, points: PointModel[], bounds: Rect, fixedUserHandleTemplate: string | Function, diagramId: string): Canvas | DiagramHtmlElement;
    private getBpmnMessageFlow;
    /** @private */
    distance(pt1: PointModel, pt2: PointModel): number;
    /**   @private  */
    findPath(sourcePt: PointModel, targetPt: PointModel): Object;
    /** @private */
    getAnnotationElement(annotation: PathAnnotation, points: PointModel[], bounds: Rect, getDescription: Function | string, diagramId: string, annotationTemplate?: string | Function): TextElement | DiagramHtmlElement;
    /** @private */
    updateAnnotation(annotation: PathAnnotation | ConnectorFixedUserHandle, points: PointModel[], bounds: Rect, textElement: TextElement | DiagramHtmlElement | DiagramElement, canRefresh?: number): void;
    /** @private */
    getConnectorPoints(type: Segments, points?: PointModel[], layoutOrientation?: LayoutOrientation, lineDistribution?: boolean): PointModel[];
    /** @private */
    private clipDecorator;
    /** @private */
    clipDecorators(connector: Connector, pts: PointModel[], diagramAction?: DiagramAction): PointModel[];
    /** @private */
    updateSegmentElement(connector: Connector, points: PointModel[], element: PathElement, diagramActions: DiagramAction): PathElement;
    /** @private */
    getSegmentElement(connector: Connector, segmentElement: PathElement, layoutOrientation?: LayoutOrientation, diagramActions?: DiagramAction, isFlip?: boolean): PathElement;
    /** @private */
    getDecoratorElement(offsetPoint: PointModel, adjacentPoint: PointModel, decorator: DecoratorModel, isSource: Boolean, getDescription?: Function): PathElement;
    private bridgePath;
    /** @private */
    updateDecoratorElement(element: DiagramElement, pt: PointModel, adjacentPoint: PointModel, decorator: DecoratorModel): void;
    /** @private */
    getSegmentPath(connector: Connector, points: PointModel[], diagramAction?: DiagramAction): string;
    /** @private */
    updateShapeElement(connector: Connector): void;
    /** @private */
    updateShapePosition(connector: Connector, element: DiagramElement): void;
    /** @hidden */
    scale(sw: number, sh: number, width: number, height: number, refObject?: DiagramElement): PointModel;
    /**
     * @private
     * Returns the name of class Connector
     */
    getClassName(): string;
}
