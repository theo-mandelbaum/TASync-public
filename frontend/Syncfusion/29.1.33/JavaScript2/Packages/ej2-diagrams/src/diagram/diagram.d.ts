import { Component, L10n, Droppable } from '@syncfusion/ej2-base';
import { ModuleDeclaration, EmitType } from '@syncfusion/ej2-base';
import { INotifyPropertyChanged } from '@syncfusion/ej2-base';
import { DiagramModel } from './diagram-model';
import { DiagramRenderer } from './rendering/renderer';
import { PageSettingsModel, ScrollSettingsModel } from './diagram/page-settings-model';
import { DiagramElement } from './core/elements/diagram-element';
import { ServiceLocator } from './objects/service';
import { IElement, IDataLoadedEventArgs, ISelectionChangeEventArgs, IElementDrawEventArgs, IMouseWheelEventArgs, ISegmentChangeEventArgs, ILoadEventArgs, ILoadedEventArgs, ILayoutUpdatedEventArgs } from './objects/interface/IElement';
import { IClickEventArgs, FixedUserHandleClickEventArgs } from './objects/interface/IElement';
import { UserHandleEventsArgs } from './objects/interface/IElement';
import { FixedUserHandleEventsArgs } from './objects/interface/IElement';
import { IKeyEventArgs } from './objects/interface/IElement';
import { ICommandExecuteEventArgs } from './objects/interface/IElement';
import { ISizeChangeEventArgs, IConnectionChangeEventArgs, IEndChangeEventArgs, IDoubleClickEventArgs } from './objects/interface/IElement';
import { ICollectionChangeEventArgs, IPropertyChangeEventArgs, IDraggingEventArgs, IRotationEventArgs } from './objects/interface/IElement';
import { ISegmentCollectionChangeEventArgs } from './objects/interface/IElement';
import { IDragEnterEventArgs, IDragLeaveEventArgs, IDragOverEventArgs, IDropEventArgs } from './objects/interface/IElement';
import { ITextEditEventArgs, IHistoryChangeArgs, IScrollChangeEventArgs } from './objects/interface/IElement';
import { IMouseEventArgs } from './objects/interface/IElement';
import { IBlazorCustomHistoryChangeArgs, IImageLoadEventArgs } from './objects/interface/IElement';
import { IExpandStateChangeEventArgs } from './objects/interface/IElement';
import { ZoomOptions, IPrintOptions, IExportOptions, IFitOptions, ActiveLabel, IEditSegmentOptions } from './objects/interface/interfaces';
import { View } from './objects/interface/interfaces';
import { Container } from './core/containers/container';
import { Node } from './objects/node';
import { Connector } from './objects/connector';
import { ConnectorModel } from './objects/connector-model';
import { RulerSettingsModel } from './diagram/ruler-settings-model';
import { SnapSettingsModel } from './diagram/grid-lines-model';
import { NodeModel, BpmnAnnotationModel, UmlClassMethodModel, UmlClassAttributeModel, UmlEnumerationMemberModel } from './objects/node-model';
import { LaneModel, PhaseModel } from './objects/node-model';
import { DiagramTools, AlignmentMode, ScrollActions, UmlClassChildType } from './enum/enum';
import { BlazorAction } from './enum/enum';
import { DiagramConstraints, BridgeDirection, AlignmentOptions, PortVisibility, DiagramEvent } from './enum/enum';
import { DistributeOptions, SizingOptions, RenderingMode, DiagramAction, NudgeDirection } from './enum/enum';
import { RealAction, HistoryChangeAction } from './enum/enum';
import { Rect } from './primitives/rect';
import { PathPortModel, PointPortModel } from './objects/port-model';
import { ShapeAnnotationModel, AnnotationModel, PathAnnotationModel } from './objects/annotation-model';
import { ShapeAnnotation, PathAnnotation } from './objects/annotation';
import { PointModel } from './primitives/point-model';
import { Canvas } from './core/containers/canvas';
import { GridPanel } from './core/containers/grid';
import { DataSourceModel } from './diagram/data-source-model';
import { LayoutModel } from './layout/layout-base-model';
import { ILayout } from './layout/layout-base';
import { DataBinding } from './data-binding/data-binding';
import { Selector } from './objects/node';
import { SelectorModel } from './objects/node-model';
import { CommandHandler } from './interaction/command-manager';
import { DiagramScroller } from './interaction/scroller';
import { Actions } from './interaction/actions';
import { ToolBase } from './interaction/tool';
import { BpmnDiagrams } from './objects/bpmn';
import { DiagramContextMenu } from './objects/context-menu';
import { ConnectorBridging } from './objects/connector-bridging';
import { SpatialSearch } from './interaction/spatial-search/spatial-search';
import { HistoryEntry, History } from './diagram/history';
import { UndoRedo } from './objects/undo-redo';
import { ConnectorEditing } from './interaction/connector-editing';
import { Ruler } from '../ruler/index';
import { BeforeOpenCloseMenuEventArgs, MenuEventArgs } from '@syncfusion/ej2-navigations';
import { CommandManagerModel, ContextMenuSettingsModel } from './diagram/keyboard-commands-model';
import { Snapping } from './objects/snapping';
import { DiagramTooltipModel } from './objects/tooltip-model';
import { ShadowModel } from './core/appearance-model';
import { RadialTree } from './layout/radial-tree';
import { HierarchicalTree } from './layout/hierarchical-tree';
import { ComplexHierarchicalTree } from './layout/complex-hierarchical-tree';
import { MindMap } from './layout/mind-map';
import { Tooltip } from '@syncfusion/ej2-popups';
import { PrintAndExport } from './print-settings';
import { SymmetricLayout } from './layout/symmetrical-layout';
import { LayoutAnimation } from './objects/layout-animation';
import { LayerModel } from './diagram/layer-model';
import { SerializationSettingsModel } from './diagram/serialization-settings-model';
import { CustomCursorActionModel } from './diagram/custom-cursor-model';
import { LineRouting } from './interaction/line-routing';
import { AvoidLineOverlapping } from './interaction/line-overlapping';
import { LineDistribution } from './interaction/line-distribution';
import { DiagramSettingsModel } from '../diagram/diagram-settings-model';
import { NodeFixedUserHandleModel, ConnectorFixedUserHandleModel } from './objects/fixed-user-handle-model';
import { SegmentThumbShapes } from './enum/enum';
import { Ej1Serialization } from './load-utility/modelProperties';
import { FlowchartLayout } from './layout/flowChart/flow-chart-layout';
/**
 * Represents the Diagram control
 * ```html
 * <div id='diagram'/>
 * ```
 * ```typescript
 * let diagram: Diagram = new Diagram({
 * width:'1000px', height:'500px' });
 * diagram.appendTo('#diagram');
 * ```
 */
export declare class Diagram extends Component<HTMLElement> implements INotifyPropertyChanged {
    /**
     * `organizationalChartModule` is used to arrange the nodes in a organizational chart like struture
     *
     * @private
     */
    organizationalChartModule: HierarchicalTree;
    /**
     * `mindMapChartModule` is used to arrange the nodes in a mind map like structure
     *
     */
    mindMapChartModule: MindMap;
    /**
     * `radialTreeModule` is used to arrange the nodes in a radial tree like structure
     *
     * @ignoreapilink
     */
    radialTreeModule: RadialTree;
    /**
     * `complexHierarchicalTreeModule` is used to arrange the nodes in a hierarchical tree like structure
     *
     * @private
     */
    complexHierarchicalTreeModule: ComplexHierarchicalTree;
    /**
     * `dataBindingModule` is used to populate nodes from given data source
     *
     * @private
     */
    dataBindingModule: DataBinding;
    /**
     * `snappingModule` is used to Snap the objects
     *
     * @private
     */
    snappingModule: Snapping;
    /**
     * `ej1SerializationModule` is used to load ej1 json
     *
     * @private
     */
    ej1SerializationModule: Ej1Serialization;
    /**
     * `printandExportModule` is used to print or export the objects
     *
     * @private
     */
    printandExportModule: PrintAndExport;
    /**
     * `bpmnModule` is used to add built-in BPMN Shapes to diagrams
     *
     * @private
     */
    bpmnModule: BpmnDiagrams;
    /**
     * 'symmetricalLayoutModule' is used to render layout in symmetrical method
     *
     * @private
     */
    symmetricalLayoutModule: SymmetricLayout;
    /**
     * 'flowchartLayoutModule' is used to render flow chart layout
     *
     * @private
     */
    flowchartLayoutModule: FlowchartLayout;
    /**
     * `bridgingModule` is used to add bridges to connectors
     *
     * @private
     */
    bridgingModule: ConnectorBridging;
    /**
     * `undoRedoModule` is used to revert and restore the changes
     *
     * @private
     */
    undoRedoModule: UndoRedo;
    /**
     * `layoutAnimateModule` is used to revert and restore the changes
     *
     * @private
     */
    layoutAnimateModule: LayoutAnimation;
    /**
     * 'contextMenuModule' is used to manipulate context menu
     *
     * @private
     */
    contextMenuModule: DiagramContextMenu;
    /**
     * `connectorEditingToolModule` is used to edit the segments for connector
     *
     * @private
     */
    connectorEditingToolModule: ConnectorEditing;
    /**
     * `lineRoutingModule` is used to connect the node's without overlapping
     *
     * @private
     */
    lineRoutingModule: LineRouting;
    /**
     * `avoidLineOverlappingModule` is used to connect the connector's without overlapping
     *
     * @private
     */
    avoidLineOverlappingModule: AvoidLineOverlapping;
    /**
     * `lineDistributionModule` is used to connect the node's without overlapping in automatic layout
     *
     */
    lineDistributionModule: LineDistribution;
    /**
     * Defines the width of the diagram model.
     * ```html
     * <div id='diagram'/>
     * ```
     * ```typescript
     * let diagram: Diagram = new Diagram({
     * width:'1000px', height:'500px' });
     * diagram.appendTo('#diagram');
     * ```
     *
     * @default '100%'
     */
    width: string | number;
    /**
     * Split the connector, when the node is dropped onto it and establish connection with that dropped node.
     *
     * @default false
     */
    enableConnectorSplit: boolean;
    /**
     * Defines the diagram rendering mode.
     * * SVG - Renders the diagram objects as SVG elements
     * * Canvas - Renders the diagram in a canvas
     *
     * @default 'SVG'
     */
    mode: RenderingMode;
    /**
     * Defines the height of the diagram model.
     *
     * @default '100%'
     */
    height: string | number;
    /**
     * Defines the segmentThumbShape
     *
     * @default 'Circle'
     */
    segmentThumbShape: SegmentThumbShapes;
    /**
     * Specifies the size of the segment thumb. When not set, it defaults to matching the underlying path data.
     *
     * @default 10
     */
    segmentThumbSize: number;
    /**
     * Defines type of menu that appears when you perform right-click operation
     * An object to customize the context menu of diagram
     * ```html
     * <div id='diagram'></div>
     * ```
     * ```typescript
     * let diagram: Diagram = new Diagram({
     * ...
     *   contextMenuSettings: { show: true },
     * ...
     * });
     * diagram.appendTo('#diagram');
     * ```
     *
     */
    contextMenuSettings: ContextMenuSettingsModel;
    /**
     * Constraints are used to enable/disable certain behaviors of the diagram.
     * * None - Disables DiagramConstraints constraints
     * * Bridging - Enables/Disables Bridging support for connector
     * * UndoRedo - Enables/Disables the Undo/Redo support
     * * Tooltip - Enables/Disables Tooltip support
     * * UserInteraction - Enables/Disables editing diagram interactively
     * * ApiUpdate - Enables/Disables editing diagram through code
     * * PageEditable - Enables/Disables editing diagrams both interactively and through code
     * * Zoom - Enables/Disables Zoom support for the diagram
     * * PanX - Enables/Disable PanX support for the diagram
     * * PanY - Enables/Disable PanY support for the diagram
     * * Pan - Enables/Disable Pan support the diagram
     *
     * @default 'Default'
     * @aspNumberEnum
     */
    constraints: DiagramConstraints;
    /**
     * Defines the precedence of the interactive tools. They are,
     * * None - Disables selection, zooming and drawing tools
     * * SingleSelect - Enables/Disables single select support for the diagram
     * * MultipleSelect - Enables/Disable MultipleSelect select support for the diagram
     * * ZoomPan - Enables/Disable ZoomPan support for the diagram
     * * DrawOnce - Enables/Disable ContinuousDraw support for the diagram
     * * ContinuousDraw - Enables/Disable ContinuousDraw support for the diagram
     *
     * @default 'Default'
     * @aspNumberEnum
     * @deprecated
     */
    tool: DiagramTools;
    /**
     * Defines the direction of the bridge that is inserted when the segments are intersected
     * * Top - Defines the direction of the bridge as Top
     * * Bottom - Defines the direction of the bridge as Bottom
     * * Left - Sets the bridge direction as left
     * * Right - Sets the bridge direction as right
     *
     * @default top
     */
    bridgeDirection: BridgeDirection;
    /**
     * Defines the background color of the diagram
     *
     * @default 'transparent'
     */
    backgroundColor: string;
    /**
     * Defines the gridlines and defines how and when the objects have to be snapped
     * ```html
     * <div id='diagram'></div>
     * ```
     * ```typescript
     * let horizontalGridlines: GridlinesModel = {lineColor: 'black', lineDashArray: '1,1' };
     * let verticalGridlines: GridlinesModel = {lineColor: 'black', lineDashArray: '1,1'};
     * let diagram: Diagram = new Diagram({
     * ...
     * snapSettings: { horizontalGridlines, verticalGridlines, constraints: SnapConstraints.ShowLines,
     * snapObjectDistance: 5, snapAngle: 5 },
     * ...
     * });
     * diagram.appendTo('#diagram');
     * ```
     *
     * @default {}
     */
    snapSettings: SnapSettingsModel;
    /**
     * Defines the properties of both horizontal and vertical guides/rulers to measure the diagram area.
     * ```html
     * <div id='diagram'></div>
     * ```
     * ```typescript
     * let arrange: Function = (args: IArrangeTickOptions) => {
     * if (args.tickInterval % 10 == 0) {
     * args.tickLength = 25;
     * }
     * }
     * let diagram: Diagram = new Diagram({
     * ...
     * rulerSettings: { showRulers: true,
     * horizontalRuler: { segmentWidth: 50, orientation: 'Horizontal', interval: 10,  arrangeTick: arrange },
     * verticalRuler: {segmentWidth: 200,interval: 20, thickness: 20,
     * tickAlignment: 'LeftOrTop', segmentWidth: 50, markerColor: 'red' }
     * },
     * ...
     * });
     * diagram.appendTo('#diagram');
     * ```
     *
     * @default {}
     */
    rulerSettings: RulerSettingsModel;
    /**
     * Page settings enable to customize the appearance, width, and height of the Diagram page.
     * ```html
     * <div id='diagram'></div>
     * ```
     * ```typescript
     * let diagram: Diagram = new Diagram({
     * ...
     * pageSettings: {  width: 800, height: 600, orientation: 'Landscape',
     * background: { color: 'blue' }, boundaryConstraints: 'Infinity'},
     * ...
     * });
     * diagram.appendTo('#diagram');
     * ```
     *
     * @default {}
     */
    pageSettings: PageSettingsModel;
    /**
     * Defines the serialization settings of diagram.
     * ```html
     * <div id='diagram'></div>
     * ```
     * ```typescript
     * let diagram: Diagram = new Diagram({
     * ...
     * serializationSettings: { preventDefaults: true },
     * ...
     * });
     * diagram.appendTo('#diagram');
     * ```
     *
     * @default {}
     */
    serializationSettings: SerializationSettingsModel;
    /**
     * Defines the collection of nodes
     * ```html
     * <div id='diagram'></div>
     * ```
     * ```typescript
     * let nodes: NodeModel[] = [{
     *           id: 'node1', width: 100, height: 100, offsetX: 100, offsetY: 100,
     *           annotations: [{ content: 'Default Shape' }]
     *       },
     *       {
     *           id: 'node2', width: 100, height: 100, offsetX: 300, offsetY: 100,
     *           shape: {
     *               type: 'Basic', shape: 'Ellipse'
     *           },
     *           annotations: [{ content: 'Path Element' }]
     *       }
     *       ];
     * let diagram: Diagram = new Diagram({
     * ...
     * nodes: nodes,
     * ...
     * });
     * diagram.appendTo('#diagram');
     * ```
     *
     * @aspDefaultValueIgnore
     * @default undefined
     */
    nodes: NodeModel[];
    /**
     * Defines the object to be drawn using drawing tool
     * ```html
     * <div id='diagram'></div>
     * ```
     * ```typescript
     * let diagram: Diagram = new Diagram({
     * ...
     * drawingObject : {id: 'connector3', type: 'Straight'},
     * ...
     * });
     * diagram.appendTo('#diagram');
     * ```
     *
     * @aspDefaultValueIgnore
     * @default undefined
     */
    drawingObject: NodeModel | ConnectorModel;
    /**
     * Defines a collection of objects, used to create link between two points, nodes or ports to represent the relationships between them
     * ```html
     * <div id='diagram'></div>
     * ```
     * ```typescript
     *       let connectors: ConnectorModel[] = [{
     *           id: 'connector1',
     *           type: 'Straight',
     *           sourcePoint: { x: 100, y: 300 },
     *           targetPoint: { x: 200, y: 400 },
     *       }];
     * let diagram: Diagram = new Diagram({
     * ...
     *       connectors: connectors,
     * ...
     * });
     * diagram.appendTo('#diagram');
     * ```
     *
     * @default []
     */
    connectors: ConnectorModel[];
    /**
     * Defines the basic elements for the diagram
     *
     * @default []
     * @hidden
     */
    basicElements: DiagramElement[];
    /**
     * Defines the tooltip that should be shown when the mouse hovers over a node or connector
     * An object that defines the description, appearance and alignments of tooltip
     *
     * @default {}
     */
    tooltip: DiagramTooltipModel;
    /**
     * Configures the data source that is to be bound with diagram
     *
     * @default {}
     */
    dataSourceSettings: DataSourceModel;
    /**
     * Allows the user to save custom information/data about diagram
     *
     * @aspDefaultValueIgnore
     * @default undefined
     */
    addInfo: Object;
    /**
     * Customizes the undo redo functionality
     *
     * @default undefined
     */
    historyManager: History;
    /**
     * Customizes the node template
     *
     * @default undefined
     * @aspType string
     */
    nodeTemplate: string | Function;
    /**
     * Customizes the annotation template
     *
     * @default undefined
     * @aspType string
     */
    annotationTemplate: string | Function;
    /**
     * This property represents the template content of a user handle. The user can define any HTML element as a template.
     *
     * @default undefined
     * @aspType string
     */
    userHandleTemplate: string | Function;
    /**
     * This property allows us to define HTML elements for fixed user handle
     *
     * @default undefined
     * @aspType string
     */
    fixedUserHandleTemplate: string | Function;
    /**
     * Helps to return the default properties of node
     * ```html
     * <div id='diagram'></div>
     * ```
     * ```typescript
     * let nodes: NodeModel[] = [{
     *           id: 'node1', height: 100, offsetX: 100, offsetY: 100,
     *           annotations: [{ content: 'Default Shape' }]
     *       },
     *       {
     *           id: 'node2', width: 100, height: 100, offsetX: 300, offsetY: 100,
     *           shape: {
     *               type: 'Basic', shape: 'Ellipse'
     *           },
     *           annotations: [{ content: 'Ellipse' }]
     *       }
     *       ];
     * let diagram: Diagram = new Diagram({
     * ...
     * nodes: nodes,
     * getNodeDefaults: (node: NodeModel) => {
     *   let obj: NodeModel = {};
     *   if (obj.width === undefined) {
     *       obj.width = 145;
     *   }
     *   obj.style = { fill: '#357BD2', strokeColor: 'white' };
     *   obj.annotations = [{ style: { color: 'white', fill: 'transparent' } }];
     *   return obj;
     *    },
     * ...
     * });
     * diagram.appendTo('#diagram');
     * ```
     *
     * @aspDefaultValueIgnore
     * @default undefined
     * @deprecated
     */
    getNodeDefaults: Function | string;
    /**
     * Helps to assign the default properties of nodes
     */
    nodeDefaults: NodeModel;
    /**
     * Helps to return the default properties of connector
     * ```html
     * <div id='diagram'></div>
     * ```
     * ```typescript
     *       let connectors: ConnectorModel[] = [{
     *           id: 'connector1',
     *           sourcePoint: { x: 100, y: 300 },
     *           targetPoint: { x: 200, y: 400 },
     *       }];
     * let diagram: Diagram = new Diagram({
     * ...
     *   connectors: connectors,
     *   getConnectorDefaults: (connector: ConnectorModel, diagram: Diagram) => {
     *   let connObj: ConnectorModel = {};
     *   connObj.targetDecorator ={ shape :'None' };
     *   connObj.type = 'Orthogonal';
     *   return connObj;
     *   },
     * ...
     * });
     * diagram.appendTo('#diagram');
     * ```
     *
     * @aspDefaultValueIgnore
     * @default undefined
     * @deprecated
     */
    getConnectorDefaults: Function | string;
    /**
     * Helps to assign the default properties of connector
     */
    connectorDefaults: ConnectorModel;
    /**
     * setNodeTemplate helps to customize the content of a node
     * ```html
     * <div id='diagram'></div>
     * ```
     * ```typescript
     * let getTextElement: Function = (text: string) => {
     * let textElement: TextElement = new TextElement();
     * textElement.width = 50;
     * textElement.height = 20;
     * textElement.content = text;
     * return textElement;
     * };
     * let nodes: NodeModel[] = [{
     *           id: 'node1', height: 100, offsetX: 100, offsetY: 100,
     *           annotations: [{ content: 'Default Shape' }]
     *       },
     *       {
     *           id: 'node2', width: 100, height: 100, offsetX: 300, offsetY: 100
     *       }
     *       ];
     * let diagram: Diagram = new Diagram({
     * ...
     * nodes: nodes,
     * setNodeTemplate : setNodeTemplate,
     * ...
     * });
     * diagram.appendTo('#diagram');
     * ```
     * function setNodeTemplate() {
     * setNodeTemplate: (obj: NodeModel, diagram: Diagram): StackPanel => {
     *   if (obj.id === 'node2') {
     *       let table: StackPanel = new StackPanel();
     *       table.orientation = 'Horizontal';
     *       let column1: StackPanel = new StackPanel();
     *       column1.children = [];
     *       column1.children.push(getTextElement('Column1'));
     *       addRows(column1);
     *       let column2: StackPanel = new StackPanel();
     *       column2.children = [];
     *       column2.children.push(getTextElement('Column2'));
     *       addRows(column2);
     *       table.children = [column1, column2];
     *       return table;
     *   }
     *   return null;
     *   }
     * ...
     * }
     *
     * @aspDefaultValueIgnore
     * @default undefined
     * @deprecated
     */
    setNodeTemplate: Function | string;
    /**
     * Allows to set accessibility content for diagram objects
     *
     * @aspDefaultValueIgnore
     * @default undefined
     */
    /**
     * ```html
     * <div id='diagram'></div>
     * ```
     * ```typescript
     * let connector1: ConnectorModel = {
     *          id: 'connector1', type: 'Straight',
     *          sourcePoint: { x: 100, y: 100 },targetPoint: { x: 200, y: 200 },
     *          annotations: [{ 'content': 'label', 'offset': 0, 'alignment': 'Center' }]
     *       };
     * let connector2: ConnectorModel = {
     *           id: 'connector2', type: 'Straight',
     *           sourcePoint: { x: 400, y: 400 }, targetPoint: { x: 600, y: 600 },
     *       };
     * let diagram: Diagram;
     * diagram = new Diagram({
     * width: 1000, height: 1000,
     * connectors: [connector1, connector2],
     * snapSettings: { constraints: SnapConstraints.ShowLines },
     * getDescription: getAccessibility
     * });
     * diagram.appendTo('#diagram');
     * function getAccessibility(obj: ConnectorModel, diagram: Diagram): string {
     * let value: string;
     * if (obj instanceof Connector) {
     * value = 'clicked on Connector';
     * } else if (obj instanceof TextElement) {
     * value = 'clicked on annotation';
     * }
     * else if (obj instanceof Decorator) {
     * value = 'clicked on Decorator';
     * }
     * else { value = undefined; }
     * return value;
     * }
     * ```
     *
     * @deprecated
     */
    getDescription: Function | string;
    /**
     * Allows to get the custom properties that have to be serialized
     * ```html
     * <div id='diagram'></div>
     * ```
     * ```typescript
     * let nodes: NodeModel[] = [{
     *           id: 'node1', width: 100, height: 100, offsetX: 100, offsetY: 100,
     *           annotations: [{ content: 'Default Shape' }]
     *       },
     *       {
     *           id: 'node2', width: 100, height: 100, offsetX: 300, offsetY: 100,
     *           shape: { type: 'Basic', shape: 'Ellipse' },
     *           annotations: [{ content: 'Path Element' }]
     *       }
     *       ];
     *       let connectors: ConnectorModel[] = [{
     *           id: 'connector1', type: 'Straight',
     *           sourcePoint: { x: 100, y: 300 }, targetPoint: { x: 200, y: 400 },
     *       }];
     * let diagram: Diagram = new Diagram({
     * ...
     * connectors: connectors, nodes: nodes,
     * getCustomProperty: (key: string) => {
     * if (key === 'nodes') {
     * return ['description'];
     * }
     *         return null;
     * }
     * ...
     * });
     * diagram.appendTo('#diagram');
     * ```
     *
     * @aspDefaultValueIgnore
     * @default undefined
     * @deprecated
     */
    getCustomProperty: Function | string;
    /**
     * Allows the user to set custom tool that corresponds to the given action
     *
     * @aspDefaultValueIgnore
     * @default undefined
     */
    /**
     * ```html
     * <div id='diagram'></div>
     * ```
     * ```typescript
     * function getTool(action: string): ToolBase {
     * let tool: ToolBase;
     * if (action === 'userHandle1') {
     * tool = new CloneTool(diagram.commandHandler, true);
     * }
     * return tool;
     * }
     * class CloneTool extends ToolBase {
     * public mouseDown(args: MouseEventArgs): void {
     * super.mouseDown(args);
     * diagram.copy();
     * diagram.paste();
     * }
     * }
     * let nodes: NodeModel[] = [{
     *           id: 'node1', width: 100, height: 100, offsetX: 100, offsetY: 100,
     *       },
     *       {
     *           id: 'node2', width: 100, height: 100, offsetX: 300, offsetY: 100,
     *           shape: { type: 'Basic', shape: 'Ellipse' },
     *       }];
     *       let connectors: ConnectorModel[] = [{
     *           id: 'connector1', type: 'Straight',
     *           sourcePoint: { x: 100, y: 300 }, targetPoint: { x: 200, y: 400 },
     *       }];
     *      let handles: UserHandleModel[] = [
     *          { name: 'handle', margin: { top: 0, bottom: 0, left: 0, right: 0 }, offset: 0,
     *            pathData: 'M 376.892,225.284L 371.279,211.95L 376.892,198.617L 350.225,211.95L 376.892,225.284 Z',
     *            side: 'Top', horizontalAlignment: 'Center', verticalAlignment: 'Center',
     *            pathColor: 'yellow' }];
     * let diagram: Diagram = new Diagram({
     * ...
     *     connectors: connectors, nodes: nodes,
     *     selectedItems: { constraints: SelectorConstraints.All, userHandles: handles },
     *     getCustomTool: getTool
     * ...
     * });
     * diagram.appendTo('#diagram');
     * ```
     *
     * @deprecated
     */
    getCustomTool: Function | string;
    /**
     * Allows the user to set custom cursor that corresponds to the given action
     *
     * @aspDefaultValueIgnore
     * @default undefined
     */
    /**
     * ```html
     * <div id='diagram'></div>
     * ```
     * ```typescript
     * function getCursor(action: string, active: boolean): string {
     * let cursor: string;
     * if (active && action === 'Drag') {
     * cursor = '-webkit-grabbing';
     * } else if (action === 'Drag') {
     * cursor = '-webkit-grab'
     * }
     * return cursor;
     * }
     * let nodes: NodeModel[] = [{
     *           id: 'node1', width: 100, height: 100, offsetX: 100, offsetY: 100,
     *       },
     *       {
     *           id: 'node2', width: 100, height: 100, offsetX: 300, offsetY: 100,
     *           shape: { type: 'Basic', shape: 'Ellipse' },
     *       }];
     * let handle: UserHandleModel[] = [
     * { name: 'handle', margin: { top: 0, bottom: 0, left: 0, right: 0 }, offset: 0,
     * pathData: 'M 376.892,225.284L 371.279,211.95L 376.892,198.617L 350.225,211.95L 376.892,225.284 Z',
     * side: 'Top', horizontalAlignment: 'Center', verticalAlignment: 'Center',
     * pathColor: 'yellow' }];
     * let diagram: Diagram = new Diagram({
     * ...
     *     nodes: nodes,
     *     selectedItems: { constraints: SelectorConstraints.All, userHandles: handle },
     *     getCustomCursor: getCursor
     * ...
     * });
     * diagram.appendTo('#diagram');
     * ```
     *
     * @deprecated
     */
    getCustomCursor: Function | string;
    /**
     * A collection of JSON objects where each object represents a custom cursor action. Layer is a named category of diagram shapes.
     *
     * @default []
     */
    customCursor: CustomCursorActionModel[];
    /**
     * Helps to set the undo and redo node selection
     * ```html
     * <div id='diagram'></div>
     * ```
     * ```typescript
     *       let connectors: ConnectorModel[] = [{
     *           id: 'connector1',
     *           sourcePoint: { x: 100, y: 300 },
     *           targetPoint: { x: 200, y: 400 },
     *       }];
     * let diagram: Diagram = new Diagram({
     * ...
     *   connectors: connectors,
     *   updateSelection: (object: ConnectorModel | NodeModel, diagram: Diagram) => {
     *   let objectCollection = [];
     *   objectCollection.push(obejct);
     *   diagram.select(objectCollection);
     *   },
     * ...
     * });
     * diagram.appendTo('#diagram');
     * ```
     *
     * @aspDefaultValueIgnore
     * @default undefined
     * @deprecated
     */
    updateSelection: Function | string;
    /**
     * Represents the diagram settings
     * ```html
     * <div id='diagram'></div>
     * ```
     * ```typescript
     * let diagram: Diagram = new Diagram({
     * ...
     * diagramSettings: { inversedAlignment: true  }
     * ...
     * });
     * diagram.appendTo('#diagram');
     * ```
     *
     * @default {}
     */
    diagramSettings: DiagramSettingsModel;
    /** @private */
    version: number;
    /**
     * Defines the collection of selected items, size and position of the selector
     *
     * @default {}
     */
    selectedItems: SelectorModel;
    /**
     * Defines the current zoom value, zoom factor, scroll status and view port size of the diagram
     *
     * @default {}
     */
    scrollSettings: ScrollSettingsModel;
    /**
     * Layout is used to auto-arrange the nodes in the Diagram area
     *
     * @default {}
     */
    layout: LayoutModel;
    /**
     * Defines a set of custom commands and binds them with a set of desired key gestures
     *
     * @default {}
     */
    commandManager: CommandManagerModel;
    /**
     * Triggers after diagram is populated from the external data source
     *
     * @event
     * @deprecated
     */
    dataLoaded: EmitType<IDataLoadedEventArgs>;
    /**
     * Triggers when a symbol is dragged into diagram from symbol palette
     *
     * @event
     */
    dragEnter: EmitType<IDragEnterEventArgs>;
    /**
     * Triggers when a symbol is dragged outside of the diagram.
     *
     * @event
     */
    dragLeave: EmitType<IDragLeaveEventArgs>;
    /**
     * Triggers when a symbol is dragged over diagram
     *
     * @event
     * @deprecated
     */
    dragOver: EmitType<IDragOverEventArgs>;
    /**
     * Triggers when a node, connector or diagram is clicked
     *
     * @event
     */
    click: EmitType<IClickEventArgs>;
    /**
     * Triggers when a change is reverted or restored(undo/redo)
     *
     * @event
     */
    historyChange: EmitType<IHistoryChangeArgs>;
    /**
     * Triggers when a custom entry change is reverted or restored(undo/redo)
     *
     * @event
     */
    historyStateChange: EmitType<IBlazorCustomHistoryChangeArgs>;
    /**
     * Triggers when a node, connector or diagram model is clicked twice
     *
     * @event
     */
    doubleClick: EmitType<IDoubleClickEventArgs>;
    /**
     * Triggers when editor got focus at the time of node’s label or text node editing.
     *
     * @event
     */
    textEdit: EmitType<ITextEditEventArgs>;
    /**
     * Triggers when the diagram is zoomed or panned
     *
     * @event
     * @deprecated
     */
    scrollChange: EmitType<IScrollChangeEventArgs>;
    /**
     * Event triggers whenever the user rotate the mouse wheel either upwards or downwards
     *
     * @event
     */
    mouseWheel: EmitType<IMouseWheelEventArgs>;
    /**
     * Triggers when the selection is changed in diagram
     *
     * @event
     */
    selectionChange: EmitType<ISelectionChangeEventArgs>;
    /**
     * Triggers when a node is resized
     *
     * @event
     */
    sizeChange: EmitType<ISizeChangeEventArgs>;
    /**
     * Triggers when the connection is changed
     *
     * @event
     */
    connectionChange: EmitType<IConnectionChangeEventArgs>;
    /**
     * Triggers when the connector's source point is changed
     *
     * @event
     * @deprecated
     */
    sourcePointChange: EmitType<IEndChangeEventArgs>;
    /**
     * Triggers when the connector's target point is changed
     *
     * @event
     * @deprecated
     */
    targetPointChange: EmitType<IEndChangeEventArgs>;
    /**
     * Triggers once the node or connector property changed.
     *
     * @event
     */
    propertyChange: EmitType<IPropertyChangeEventArgs>;
    /**
     * Triggers while dragging the elements in diagram
     *
     * @event
     */
    positionChange: EmitType<IDraggingEventArgs>;
    /**
     * Triggers when a user releases a key.
     *
     * @event
     */
    keyUp: EmitType<IKeyEventArgs>;
    /**
     * Triggers when a user is pressing a key.
     *
     * @event
     */
    keyDown: EmitType<IKeyEventArgs>;
    /**
     * Triggers after animation is completed for the diagram elements.
     *
     * @event
     * @deprecated
     */
    animationComplete: EmitType<Object>;
    /**
     * Triggers when the diagram elements are rotated
     *
     * @event
     */
    rotateChange: EmitType<IRotationEventArgs>;
    /**
     * Triggers when a node/connector is added/removed to/from the diagram.
     *
     * @deprecated
     * @event
     */
    collectionChange: EmitType<ICollectionChangeEventArgs>;
    /**
     * Triggers when a node/connector fixedUserHandle is clicked in the diagram.
     *
     * @event
     */
    fixedUserHandleClick: EmitType<FixedUserHandleClickEventArgs>;
    /**
     * Triggers when a mouseDown on the user handle.
     *
     * @event
     */
    onUserHandleMouseDown: EmitType<UserHandleEventsArgs>;
    /**
     * Triggers when a mouseUp on the user handle.
     *
     * @event
     */
    onUserHandleMouseUp: EmitType<UserHandleEventsArgs>;
    /**
     * Triggers when a mouseEnter on the user handle.
     *
     * @event
     */
    onUserHandleMouseEnter: EmitType<UserHandleEventsArgs>;
    /**
     * Triggers when a mouseLeave on the user handle.
     *
     * @event
     */
    onUserHandleMouseLeave: EmitType<UserHandleEventsArgs>;
    /**
     * Triggers when a mouseDown on the fixed user handle.
     *
     * @event
     */
    onFixedUserHandleMouseDown: EmitType<FixedUserHandleEventsArgs>;
    /**
     * Triggers when a mouseUp on the fixed user handle.
     *
     * @event
     */
    onFixedUserHandleMouseUp: EmitType<FixedUserHandleEventsArgs>;
    /**
     * Triggers when a mouseEnter on the fixed user handle.
     *
     * @event
     */
    onFixedUserHandleMouseEnter: EmitType<FixedUserHandleEventsArgs>;
    /**
     * Triggers when a mouseLeave on the fixed user handle.
     *
     * @event
     */
    onFixedUserHandleMouseLeave: EmitType<FixedUserHandleEventsArgs>;
    /**
     * Triggers when a segment is added/removed to/from the connector.
     *
     * @event
     * @deprecated
     */
    segmentCollectionChange: EmitType<ISegmentCollectionChangeEventArgs>;
    /**
     * Triggers when the image node is loaded.
     *
     * @deprecated
     * @event
     */
    onImageLoad: EmitType<IImageLoadEventArgs>;
    /**
     * Triggers when the state of the expand and collapse icon change for a node.
     *
     * @deprecated
     * @event
     */
    expandStateChange: EmitType<IExpandStateChangeEventArgs>;
    /**
     * This event triggers before the diagram load.
     *
     * @event
     */
    load: EmitType<ILoadEventArgs>;
    /**
     * Triggered when the diagram is rendered completely.
     *
     * @event
     */
    created: EmitType<Object>;
    /**
     * Triggered when mouse enters a node/connector.
     *
     * @event
     */
    mouseEnter: EmitType<IMouseEventArgs>;
    /**
     * Triggered when mouse leaves node/connector.
     *
     * @event
     */
    mouseLeave: EmitType<IMouseEventArgs>;
    /**
     * Triggered when mouse hovers a node/connector.
     *
     * @event
     * @deprecated
     */
    mouseOver: EmitType<IMouseEventArgs>;
    /**
     *
     * Triggered when an element is drawn using drawing Tool
     *  @event
     */
    elementDraw: EmitType<IElementDrawEventArgs>;
    /**
     * Triggers before opening the context menu
     *
     * @event
     */
    contextMenuOpen: EmitType<BeforeOpenCloseMenuEventArgs>;
    /**
     * Triggers before rendering the context menu item
     *
     * @event
     * @deprecated
     */
    contextMenuBeforeItemRender: EmitType<MenuEventArgs>;
    /**
     * Triggers when a context menu item is clicked
     *
     * @event
     */
    contextMenuClick: EmitType<MenuEventArgs>;
    /**
     * Triggers when a command executed.
     *
     * @event
     */
    commandExecute: EmitType<ICommandExecuteEventArgs>;
    /**
     * A collection of JSON objects where each object represents a layer. Layer is a named category of diagram shapes.
     *
     * @default []
     */
    layers: LayerModel[];
    /**
     * Triggers when a symbol is dragged and dropped from symbol palette to drawing area
     *
     * @event
     */
    drop: EmitType<IDropEventArgs>;
    /**
     *This event is triggered when we drag the segment thumb of Orthogonal/ Straight /Bezier connector
     *
     * @event
     * @deprecated
     */
    segmentChange: EmitType<ISegmentChangeEventArgs>;
    /**
     *This event triggers after the diagram elements finished loading using loadDiagram method
     *
     * @event
     */
    loaded: EmitType<ILoadedEventArgs>;
    /**
     * Triggers when the layout rendering process in the diagram has either started or completed.
     *
     *  @event
     */
    layoutUpdated: EmitType<ILayoutUpdatedEventArgs>;
    /** @private */
    preventDiagramUpdate: boolean;
    /** @private */
    checkMenu: boolean;
    /** @private */
    parentObject: NodeModel;
    /** @hidden */
    /** @private */
    localeObj: L10n;
    private defaultLocale;
    /** @private */
    isServerUpdate: boolean;
    /** @private */
    currentDrawingObject: Node | Connector;
    /** @private */
    currentSymbol: Node | Connector;
    /** @private */
    oldNodeObjects: Node[];
    /** @private */
    oldDiagramObject: object;
    /** @private */
    oldConnectorObjects: Connector[];
    /** @private */
    diagramRenderer: DiagramRenderer;
    private gridlineSvgLayer;
    private renderer;
    /** @private */
    tooltipObject: Tooltip;
    /** @private */
    hRuler: Ruler;
    /** @private */
    vRuler: Ruler;
    /** @private */
    droppable: Droppable;
    /** @private */
    diagramCanvas: HTMLElement;
    /** @private */
    diagramLayer: HTMLCanvasElement | SVGGElement;
    private diagramLayerDiv;
    private adornerLayer;
    private eventHandler;
    /** @private */
    scroller: DiagramScroller;
    /** @private */
    spatialSearch: SpatialSearch;
    /** @private */
    commandHandler: CommandHandler;
    /** @private */
    layerZIndex: number;
    /** @private */
    layerZIndexTable: {};
    /** @private */
    nameTable: {};
    /** @private */
    canEnableBlazorObject: boolean;
    /** @private */
    pathTable: {};
    /** @private */
    connectorTable: {};
    /** @private */
    groupTable: {};
    /** @private */
    private htmlLayer;
    /** @private */
    diagramActions: DiagramAction;
    /** @private */
    scrollActions: ScrollActions;
    /** @private */
    blazorActions: BlazorAction;
    /** @private */
    commands: {};
    /** @private */
    activeLabel: ActiveLabel;
    /** @private */
    activeLayer: LayerModel;
    /** @private */
    serviceLocator: ServiceLocator;
    /** @private */
    views: string[];
    /** @private */
    isLoading: Boolean;
    /** @private */
    textEditing: Boolean;
    /** @private */
    isTriggerEvent: Boolean;
    /** @private */
    preventNodesUpdate: Boolean;
    /** @private */
    preventConnectorsUpdate: Boolean;
    /** @private */
    callBlazorModel: Boolean;
    /** @private */
    selectionConnectorsList: ConnectorModel[];
    /** @private */
    deleteVirtualObject: boolean;
    /** @private */
    realActions: RealAction;
    /** @private */
    previousSelectedObject: (NodeModel | ConnectorModel | AnnotationModel)[];
    canLayout: boolean;
    cancelPositionChange: boolean;
    private isRefreshed;
    /** @private */
    swimlaneChildTable: {};
    /** @private */
    swimlaneZIndexTable: {};
    /** @private */
    canExpand: boolean;
    private changedConnectorCollection;
    private changedNodesCollection;
    private previousNodeCollection;
    private previousConnectorCollection;
    private crudDeleteNodes;
    private previousSelectedObjects;
    private blazorAddorRemoveCollection;
    private blazorRemoveIndexCollection;
    private diagramid;
    private portCenterPoint;
    /** @private */
    selectedObject: {
        helperObject: NodeModel;
        actualObject: NodeModel;
    };
    /** @private */
    deleteDependentConnector: boolean;
    /** @private */
    scaleValue: number;
    routedConnectors: string[];
    /** @private */
    pathDataStorage: Map<string, PointModel[]>;
    private isUndo;
    /**
     * Constructor for creating the widget
     */
    constructor(options?: DiagramModel, element?: HTMLElement | string);
    private updateAnnotationText;
    private clearCollection;
    /**
     * Updates the diagram control when the objects are changed by comparing new and old property values.
     *
     * @param {DiagramModel} newProp - A object that lists the new values of the changed properties.
     * @param {DiagramModel} oldProp - A object that lists the old values of the changed properties.
     */
    onPropertyChanged(newProp: DiagramModel, oldProp: DiagramModel): void;
    private updateSnapSettings;
    private updateGradient;
    private updateRulerSettings;
    /**
     * Get the properties to be maintained in the persisted state.
     *
     * @returns {string}
     */
    getPersistData(): string;
    /**
     * Initialize nodes, connectors and renderer
     */
    protected preRender(): void;
    private initializePrivateVariables;
    private initializeServices;
    /**
     * Method to set culture for chart
     */
    private setCulture;
    /**
     * Renders the diagram control with nodes and connectors
     */
    render(): void;
    private updateFitToPage;
    private updateTemplate;
    private renderInitialCrud;
    /**
     * Retrieves the module name associated with the diagram.
     *
     * @returns {string}  Retrieves the module name associated with the diagram.
     */
    getModuleName(): string;
    /**
     *
     * Returns the name of class Diagram
     * @returns {string}  Returns the module name of the diagram
     * @private
     */
    getClassName(): string;
    /**
     * To provide the array of modules needed for control rendering
     *
     * @returns {ModuleDeclaration[]} To provide the array of modules needed for control rendering .\
     * @private
     */
    requiredModules(): ModuleDeclaration[];
    private removeUserHandlesTemplate;
    /**
     *Destroys the diagram, freeing up its resources.
     *
     * @returns {void} Destroys the diagram, freeing up its resources.
     */
    destroy(): void;
    private wireEvents;
    private unWireEvents;
    /**
     * Select a specified collection of nodes and connectors in the diagram. You can specify whether to clear the existing selection and provide an old value if needed. \
     *
     * @returns { void } Select a specified collection of nodes and connectors in the diagram. You can specify whether to clear the existing selection and provide an old value if needed.\
     * @param {NodeModel | ConnectorModel} objects - An array containing the collection of nodes and connectors to be selected.
     * @param {boolean} multipleSelection - Determines whether the existing selection should be cleared (default is false).
     * @param {NodeModel | ConnectorModel} oldValue - Defines the old value
     *
     */
    select(objects: (NodeModel | ConnectorModel | AnnotationModel)[], multipleSelection?: boolean, oldValue?: (NodeModel | ConnectorModel | AnnotationModel)[]): void;
    /**
     * Returns the diagram action as a string representation.
     * @returns { string }
     * @param { DiagramAction } diagramAction - The diagram action to be converted to a string.
     */
    getDiagramAction(diagramAction: DiagramAction): string;
    /**
     *  Select all objects, including nodes and connectors, in the diagram. \
     *
     * @returns { void }  Select all objects, including nodes and connectors, in the diagram.\
     *
     */
    selectAll(): void;
    /**
     * Remove a specific object from the current selection in the diagram. \
     *
     * @returns { void } Remove a specific object from the current selection in the diagram.\
     * @param {NodeModel | ConnectorModel} obj -  The object to remove from the selection.
     *
     */
    unSelect(obj: NodeModel | ConnectorModel): void;
    /**
     * Removes all elements from the selection list, clearing the current selection.\
     *
     * @returns { void } Removes all elements from the selection list, clearing the current selection.\
     *
     */
    clearSelection(): void;
    /**
     *  Updates the dimensions of the diagram viewport. \
     *
     * @returns { void }  Updates the dimensions of the diagram viewport.\
     *
     */
    updateViewPort(): void;
    private cutCommand;
    /**
     *  Removes the selected nodes and connectors from the diagram and moves them to the diagram clipboard for cutting. \
     *
     * @returns { void }  Removes the selected nodes and connectors from the diagram and moves them to the diagram clipboard for cutting. \
     *
     */
    cut(): void;
    /**
     *   Adds a process into the sub-process. \
     *
     * @returns { void }  Adds a process into the sub-process. \
     * @param {NodeModel | ConnectorModel} process - A NodeModel representing the process to be added.
     * @param {boolean} parentId - A string representing the parent ID where the process will be added.
     *
     */
    addProcess(process: NodeModel, parentId: string): void;
    /**
     *  Removes a process from the BPMN sub-process. \
     *
     * @returns { void }  Removes a process from the BPMN sub-process.\
     * @param {string} id - The ID of the process to be removed.
     *
     */
    removeProcess(id: string): void;
    private pasteCommand;
    /**
     * Adds the given objects or the objects in the diagram clipboard to the diagram control. \
     *
     * @returns { void }  Adds the given objects or the objects in the diagram clipboard to the diagram control. \
     * @param {NodeModel[] | ConnectorModel[]} obj - An array of nodes or connectors objects to be added to diagram.
     * @deprecated
     *
     */
    paste(obj?: (NodeModel | ConnectorModel)[]): void;
    /**
     *  Fits the diagram to the page with respect to mode and region. \
     *
     * @returns { void }  Fits the diagram to the page with respect to mode and region.\
     * @param {IFitOptions} options - specify the options for fitting the diagram to the page.
     */
    fitToPage(options?: IFitOptions): void;
    /**
     * Brings the specified bounds into view within the diagram's viewport. \
     *
     * @returns { void }  Brings the specified bounds into view within the diagram's viewport.\
     * @param {Rect} bound - Representing the bounds to be brought into view.
     *
     */
    bringIntoView(bound: Rect): void;
    /**
     * Brings the specified bounds to the center of the viewport. \
     *
     * @returns { void }  Brings the specified bounds to the center of the viewport.\
     * @param {Rect} bound - representing the bounds to be centered in the viewport.
     *
     */
    bringToCenter(bound: Rect): void;
    private copyCommand;
    /**
     * Copies the selected nodes and connectors from the diagram to the diagram clipboard for copying. \
     *
     * @returns { Object } Copies the selected nodes and connectors from the diagram to the diagram clipboard for copying.\
     *
     */
    copy(): Object;
    /**
     *  Groups the selected nodes and connectors in the diagram. \
     *
     * @returns { void }   Groups the selected nodes and connectors in the diagram.\
     *
     */
    group(): void;
    /**
     *  UnGroup the selected nodes and connectors in diagram \
     *
     * @returns { void }   UnGroup the selected nodes and connectors in diagram.\
     *
     */
    unGroup(): void;
    /**
     *  Use this method to move the currently selected nodes or connectors to the back of the drawing order. This effectively places them behind other elements in the diagram. \
     *
     * @returns { void }   Use this method to move the currently selected nodes or connectors to the back of the drawing order. This effectively places them behind other elements in the diagram.\
     *
     */
    sendToBack(): void;
    /**
     * Specify which layer in the diagram should be considered the active layer. The active layer is the one where new elements will be added and where user interactions are primarily focused. \
     *
     * @returns { void } Specify which layer in the diagram should be considered the active layer. The active layer is the one where new elements will be added and where user interactions are primarily focused. \
     * @param {string} layerName - The name of the layer to set as the active layer.
     *
     */
    setActiveLayer(layerName: string): void;
    /**
     * add the layer into diagram\
     *
     * @returns { void } Adds the specified layer to the diagram control along with its associated objects.\
     * @param {LayerModel} layer - representing the layer to be added to the diagram.
     * @param {Object[]} layerObject -  An optional array of objects associated with the layer.
     * @blazorArgsType layer|DiagramLayer
     * @deprecated
     *
     */
    addLayer(layer: LayerModel, layerObject?: Object[]): void;
    /**
     * remove the layer from diagram \
     *
     * @returns { void } remove the layer from diagram.\
     * @param {string} layerId - provide the bound value.
     * @deprecated
     *
     */
    removeLayer(layerId: string): void;
    /**
     *Moves objects from one layer to another layer within the diagram. \
     *
     * @returns { void } Moves objects from one layer to another layer within the diagram. \
     * @param {string[]} objects - An array of object IDs represented as strings to be moved.
     * @param {string} targetLayer - The ID of the target layer to which the objects should be moved.
     */
    moveObjects(objects: string[], targetLayer?: string): void;
    private layerObjectUpdate;
    /**
     * Use this method to change the order of layers in the diagram. This moves the specified layer behind the layer that comes after it in the layer order. \
     *
     * @returns { void } Use this method to change the order of layers in the diagram. This moves the specified layer behind the layer that comes after it in the layer order.\
     * @param {string} layerName - The name of the layer to be moved.
     * @param {string} targetLayer - define the objects id of string array
     *
     */
    sendLayerBackward(layerName: string): void;
    /**
     * Moves the specified layer forward in the drawing order. \
     *
     * @returns { void } Moves the specified layer forward in the drawing order.\
     * @param {string} layerName - A string representing the name of the layer to be moved forward.
     *
     */
    bringLayerForward(layerName: string): void;
    /**
     * Clones a layer along with its objects.\
     *
     * @returns { void } Clones a layer along with its objects.\
     * @param {string} layerName - A string representing the name of the layer to be cloned.
     *
     */
    cloneLayer(layerName: string): void;
    /**
     *Brings the selected nodes or connectors to the front of the drawing order. \
     *
     * @returns { void } Brings the selected nodes or connectors to the front of the drawing order. \
     *
     */
    bringToFront(): void;
    /**
     *Sends the selected nodes or connectors forward in the visual order.  \
     *
     * @returns { void } Sends the selected nodes or connectors forward in the visual order. \
     *
     */
    moveForward(): void;
    /**
     *Sends the selected nodes or connectors one step backward in the z-order.\
     *
     * @returns { void } Sends the selected nodes or connectors one step backward in the z-order.\
     *
     */
    sendBackward(): void;
    /**
     *gets the node or connector having the given name \
     *
     * @returns { void } gets the node or connector having the given name.\
     * @param {string} name - define the name of the layer
     *
     */
    getObject(name: string): {};
    /**
     *Retrieves the node object for the given node ID.  \
     *
     * @returns { void } Retrieves the node object for the given node ID. \
     * @param {string} id - The ID of the node for which the node object is to be retrieved.
     *
     */
    getNodeObject(id: string): NodeModel;
    /**
     *Retrieves the connector object for the given node ID. \
     *
     * @returns { void } Retrieves the connector object for the given node ID.\
     * @param {string} id - The ID of the node for which the connector object is to be retrieved.
     *
     */
    getConnectorObject(id: string): ConnectorModel;
    /**
     * Retrieves the active layer. \
     *
     * @returns { void } Retrieves the active layer.\
     *
     */
    getActiveLayer(): LayerModel;
    private nudgeCommand;
    /**
     * Moves the selected objects towards the given direction by a specified distance.
     *
     * @returns { void }  Moves the selected objects towards the given direction by a specified distance.  \
     * @param {NudgeDirection} direction -  Defines the direction in which the objects should be moved.
     * @param {number} x - The horizontal distance by which the selected objects should be moved.
     * @param {number} y -  The vertical distance by which the selected objects should be moved.
     * @param {string} type -  A string that defines the type of nudge action.
     */
    nudge(direction: NudgeDirection, x?: number, y?: number, type?: string): void;
    private insertBlazorDiagramObjects;
    /**
     * Drags the given object (nodes, connectors, or selector) by the specified horizontal and vertical distances.
     *
     * @returns { void }  Drags the given object (nodes, connectors, or selector) by the specified horizontal and vertical distances.\
     * @param {NodeModel | ConnectorModel | SelectorModel} obj - representing the nodes, connectors, or selector to be dragged.
     * @param {number} tx - A number representing the horizontal distance by which the given objects should be moved.
     * @param {number} ty - A number representing the vertical distance by which the given objects should be moved.
     */
    drag(obj: NodeModel | ConnectorModel | SelectorModel, tx: number, ty: number): void;
    private disableStackContainerPadding;
    /**
     * Use this method to scale one or more objects in the diagram by specifying the horizontal and vertical scaling ratios. You can also provide a pivot point as a reference for scaling.
     *
     * @returns { void } Use this method to scale one or more objects in the diagram by specifying the horizontal and vertical scaling ratios. You can also provide a pivot point as a reference for scaling.\
     * @param {NodeModel | ConnectorModel | SelectorModel} obj - The objects to be resized.
     * @param {number} sx - The horizontal scaling ratio.
     * @param {number} sy - The vertical scaling ratio.
     * @param {PointModel} pivot - The reference point with respect to which the objects will be resized.
     */
    scale(obj: NodeModel | ConnectorModel | SelectorModel, sx: number, sy: number, pivot: PointModel): boolean;
    /**
     * Rotates the specified nodes, connectors, or selector by the given angle.
     *
     * @returns { void } Rotates the specified nodes, connectors, or selector by the given angle.\
     * @param {NodeModel | ConnectorModel | SelectorModel} obj - The objects to be rotated
     * @param {number} angle - The angle by which the objects should be rotated (in degrees).
     * @param {PointModel} pivot - The reference point with respect to which the objects will be rotated.
     * @param {boolean} rotateUsingHandle - Whether to rotate using the handle.
     */
    rotate(obj: NodeModel | ConnectorModel | SelectorModel, angle: number, pivot?: PointModel, rotateUsingHandle?: boolean): boolean;
    /**
     * Moves the source point of the given connector by the specified horizontal and vertical distances.
     *
     * @returns { void }  Moves the source point of the given connector by the specified horizontal and vertical distances.\
     * @param {ConnectorModel} obj - representing the connector whose source point needs to be moved.
     * @param {number} tx - A number representing the horizontal distance by which the source point should be moved.
     * @param {number} ty - A number representing the vertical distance by which the source point should be moved.
     */
    dragSourceEnd(obj: ConnectorModel, tx: number, ty: number): void;
    /**
     * Moves the target point of the given connector by the specified horizontal and vertical distances.
     *
     * @returns { void }   Moves the target point of the given connector by the specified horizontal and vertical distances.\
     * @param {ConnectorModel} obj - representing the connector whose target point needs to be moved.
     * @param {number} tx - A number representing the horizontal distance by which the target point should be moved.
     * @param {number} ty - A number representing the vertical distance by which the target point should be moved.
     */
    dragTargetEnd(obj: ConnectorModel, tx: number, ty: number): void;
    /**
     * Finds all the objects that are under the given mouse position based on specified criteria.
     *
     * @returns { void }   Finds all the objects that are under the given mouse position based on specified criteria.\
     * @param {PointModel} position - The PointModel that defines the position. The objects under this position will be found.
     * @param {IElement} source - Representing the source object. The objects under this source will be found.
     */
    findObjectsUnderMouse(position: PointModel, source?: IElement): IElement[];
    /**
     * Finds the object that is under the given mouse position based on specified criteria.
     *
     * @returns { void }   Finds the object that is under the given mouse position based on specified criteria. \
     * @param {NodeModel[] | ConnectorModel[]}objects - A collection of NodeModel or ConnectorModel objects, from which the target object has to be found.
     * @param {Actions} action - Defines the action used to find the relevant object.
     * @param {boolean} inAction - A boolean indicating the active state of the action.
     */
    findObjectUnderMouse(objects: (NodeModel | ConnectorModel)[], action: Actions, inAction: boolean): IElement;
    /**
     * Finds the object that is under the given active object (source) based on specified criteria.
     *
     * @returns { void } Finds the object that is under the given active object (source) based on specified criteria.\
     * @param {NodeModel[] | ConnectorModel[]} objects - A collection of node or connector objects, from which the target object has to be found.
     * @param {Actions} action - defines the action used to find the relevant object.
     * @param {boolean} inAction - A boolean indicating the active state of the action.
     * @param {PointModel} position - The PointModel that defines the position
     * @param {IElement} source - Representing the source element.
     */
    findTargetObjectUnderMouse(objects: (NodeModel | ConnectorModel)[], action: Actions, inAction: boolean, position: PointModel, source?: IElement): IElement;
    /**
     * Finds the child element of the given object at the given position based on specified criteria.
     *
     * @returns { void } Finds the child element of the given object at the given position based on specified criteria.\
     * @param {IElement} obj - representing the object, the child element of which has to be found.
     * @param {PointModel} position - defines the position. The child element under this position will be found.
     * @param {Diagram} diagram - defines the diagram value.
     * @param {number} padding - A number representing the padding for the search area around the position.
     */
    findElementUnderMouse(obj: IElement, position: PointModel, diagram: Diagram, padding?: number): DiagramElement;
    /**
     * Defines the action to be done, when the mouse hovers the given element of the given object
     *
     * @returns { void } Defines the action to be done, when the mouse hovers the given element of the given object .\
     * @param {NodeModel | ConnectorModel} obj - Defines the object under mouse
     * @param {DiagramElement} wrapper - Defines the target element of the object under mouse
     * @param {PointModel} position - Defines the current mouse position
     * @param { NodeModel | PointPortModel | ShapeAnnotationModel | PathAnnotationModel} target - Defines the target
     * @private
     */
    findActionToBeDone(obj: NodeModel | ConnectorModel, wrapper: DiagramElement, position: PointModel, target?: NodeModel | ConnectorModel | PointPortModel | ShapeAnnotationModel | PathAnnotationModel): Actions;
    private updateConnectorPort;
    /**
     * Returns the tool that handles the given action.
     *
     * @returns { ToolBase } Returns the tool that handles the given action. \
     * @param {string} action - A string that defines the action that is going to be performed.
     */
    getTool(action: string): ToolBase;
    /**
     * Defines the cursor that corresponds to the given action.
     *
     * @returns { string } Defines the cursor that corresponds to the given action. \
     * @param {string} action - The action for which the cursor is defined.
     * @param {boolean} active - Indicates whether the action is active.
     */
    getCursor(action: string, active: boolean): string;
    /**
     * Initializes the undo redo actions
     *
     * @returns { void } Initializes the undo redo actions \
     * @private
     */
    initHistory(): void;
    /**
     * Adds a history entry for a change in the diagram control to the track.
     *
     * @returns { void } Adds a history entry for a change in the diagram control to the track. \
     * @param {HistoryEntry} entry - The history entry that describes a change in the diagram.
     * @param {string[]} sourceId - An optional array of source IDs associated with the change.
     */
    addHistoryEntry(entry: HistoryEntry, sourceId?: string[]): void;
    private checkCurrentSymbol;
    /**
     * Adds the given custom change in the diagram control to the track
     *
     * @returns { void } Adds the given custom change in the diagram control to the track \
     * @param {HistoryEntry} entry - Defines the entry/information about a change in diagram
     */
    addCustomHistoryEntry(entry: HistoryEntry): void;
    /** @private */
    historyChangeTrigger(entry: HistoryEntry, action: HistoryChangeAction, sourceId?: string[]): void;
    /**
     * Use this method to start a group action, allowing multiple actions to be treated as a single unit during undo/redo operations. This is useful when you want to group related actions together.
     *
     * @returns { void } Use this method to start a group action, allowing multiple actions to be treated as a single unit during undo/redo operations. This is useful when you want to group related actions together. \
     */
    startGroupAction(): void;
    /**
     * Closes the grouping of actions that will be undone/restored as a whole.
     *
     * @returns { void } Closes the grouping of actions that will be undone/restored as a whole.\
     */
    endGroupAction(): void;
    /**
     * Restores the last action that was performed.
     *
     * @returns { void } Restores the last action that was performed. \
     */
    undo(): void;
    /**
     * Reverse an undo action, essentially restoring the state of the component to a previous state after an undo operation has been performed.
     *
     * @returns { void } Reverse an undo action, essentially restoring the state of the component to a previous state after an undo operation has been performed.\
     */
    redo(): void;
    private getBlazorDiagramObjects;
    /**
     * Aligns a group of objects with reference to the first object in the group.
     *
     * @returns { void } Aligns a group of objects with reference to the first object in the group.\
     * @param {AlignmentOptions}option - Defining the factor by which the objects have to be aligned.
     * @param {NodeModel[] | ConnectorModel[]} objects - A collection of node or connector objects to be aligned.
     * @param {AlignmentMode} type - Defines the type to be aligned
     */
    align(option: AlignmentOptions, objects?: (NodeModel | ConnectorModel)[], type?: AlignmentMode): void;
    /**
     * Arranges a group of objects with equal intervals within the group.
     *
     * @returns { void } Arranges a group of objects with equal intervals within the group.\
     * @param {NodeModel[] | ConnectorModel[]} option - Objects that have to be equally spaced within the group.
     * @param {DistributeOptions} objects - Object defining the factor to distribute the shapes.
     */
    distribute(option: DistributeOptions, objects?: (NodeModel | ConnectorModel)[]): void;
    /**
     * Scales the specified objects to match the size of the first object in the group.
     *
     * @returns { void } Scales the specified objects to match the size of the first object in the group.\
     * @param {SizingOptions} option - Specifies whether the objects should be horizontally scaled, vertically scaled, or both.
     * @param {NodeModel[] | ConnectorModel[]}objects - The collection of objects to be scaled.
     */
    sameSize(option: SizingOptions, objects?: (NodeModel | ConnectorModel)[]): void;
    private updateBlazorDiagramProperties;
    private getZoomingAttribute;
    /**
     * Scales the diagram control based on the provided zoom factor. You can optionally specify a focused point around which the diagram will be zoomed.
     *
     * @returns { void } Scales the diagram control based on the provided zoom factor. You can optionally specify a focused point around which the diagram will be zoomed.\
     * @param {number} factor - Defines the factor by which the diagram is zoomed.
     * @param {PointModel} focusedPoint - Defines the point with respect to which the diagram will be zoomed.
     */
    zoom(factor: number, focusedPoint?: PointModel): void;
    /**
     * Scales the diagram control based on the provided options, which include the desired zoom factor, focus point, and zoom type.
     *
     * @returns { void }  Scales the diagram control based on the provided options, which include the desired zoom factor, focus point, and zoom type.\
     * @param {ZoomOptions} options - An object specifying the zoom factor, focus point, and zoom type.
     *
     */
    zoomTo(options: ZoomOptions): void;
    /**
     * Pans the diagram control to the given horizontal and vertical offsets.
     *
     * @returns { void } Pans the diagram control to the given horizontal and vertical offsets.\
     * @param {number} horizontalOffset - The horizontal distance to which the diagram should be scrolled.
     * @param {number} verticalOffset - The vertical distance to which the diagram should be scrolled.
     * @param {PointModel} focusedPoint - representing the focused point during panning.
     * @param {boolean} isInteractiveZoomPan - A boolean indicating whether the panning is interactive zoom pan.
     */
    pan(horizontalOffset: number, verticalOffset: number, focusedPoint?: PointModel, isInteractiveZoomPan?: boolean): void;
    /**
     * Resets the zoom and scroller offsets to their default values.
     *
     * @returns { void } Resets the zoom and scroller offsets to their default values.\
     */
    reset(): void;
    /**
     * Resets the segments of the connectors to their default state. This removes any custom segments and restores the connectors to their original configuration.
     *
     * @returns { void } Resets the segments of the connectors to their default state. This removes any custom segments and restores the connectors to their original configuration. \
     */
    resetSegments(): void;
    /**
     * setBlazorDiagramProps method
     *
     * @returns {void} setBlazorDiagramProps method .\
     * @param {boolean} arg - provide the eventName value.
     * @private
     */
    setBlazorDiagramProps(arg: boolean): void;
    /**
     * getDirection method
     *
     * @returns { Promise<void | object> } getDirection method .\
     * @param {DiagramEvent} eventName - provide the eventName value.
     * @param {Object} args - provide the args value.
     * @private
     */
    triggerEvent(eventName: DiagramEvent, args: Object): Promise<void | object>;
    private updateEventValue;
    /**
     * Adds the specified node to a lane within a swimlane.
     *
     * @returns { void }     Adds the specified node to a lane within a swimlane. \
     * @param {NodeModel} node - representing the node to be added to the lane.
     * @param {string} swimLane - A string representing the ID of the swimlane containing the lane.
     * @param {string} lane - A string representing the ID of the lane where the node will be added.
     * @deprecated
     */
    addNodeToLane(node: NodeModel, swimLane: string, lane: string): void;
    /**
     * Displays a tooltip for the specified diagram object.
     *
     * @param {NodeModel | ConnectorModel} obj - The object for which the tooltip will be shown.
     */
    showTooltip(obj: NodeModel | ConnectorModel): void;
    /**
     * Hides the tooltip for the corresponding diagram object.
     *
     * @param {NodeModel | ConnectorModel} obj - The node or connector object for which the tooltip should be hidden.
     */
    hideTooltip(obj: NodeModel | ConnectorModel): void;
    /**
     * Adds the specified node to the diagram control.
     *
     * @returns { Node }     Adds the specified node to the diagram control.\
     * @param {NodeModel} obj - representing the node to be added to the diagram.
     * @param {boolean} group - A boolean value indicating whether the node should be added to a group.
     * @blazorArgsType obj|DiagramNode
     */
    addNode(obj: NodeModel, group?: boolean): Node;
    /**
     * Adds the specified diagram object to the specified group node.
     *
     * @returns { void }     Adds the specified diagram object to the specified group node.\
     * @param {NodeModel} group - The group node to which the diagram object will be added.
     * @param {string | NodeModel | ConnectorModel} child - The diagram object to be added to the group.
     * @blazorArgsType obj|DiagramNode
     */
    addChildToGroup(group: NodeModel, child: string | NodeModel | ConnectorModel): void;
    /**
     * Removes the specified diagram object from the specified group node.
     *
     * @returns { void }     Removes the specified diagram object from the specified group node.\
     * @param {NodeModel} group - The group node to which the diagram object will be removed.
     * @param {string | NodeModel | ConnectorModel} child - The diagram object to be removed from the group.
     */
    removeChildFromGroup(group: NodeModel, child: string | NodeModel | ConnectorModel): void;
    /**
     * Retrieves the history stack values for either undo or redo actions.
     *
     * @returns { void } Retrieves the history stack values for either undo or redo actions.\
     * @param {boolean} isUndoStack - If `true`, retrieves the undo stack values; if `false`, retrieves the redo stack values.
     */
    getHistoryStack(isUndoStack: boolean): HistoryEntry[];
    /**
     * Returns the edges connected to the given node.
     *
     * @returns { string[] } Returns the edges connected to the given node. \
     * @deprecated
     * @param {Object} args - An object containing information about the node for which edges are to be retrieved.
     */
    getEdges(args: Object): string[];
    /**
     * Returns the parent id for the node
     *
     * @returns { string }Returns the parent id for the node .\
     * @deprecated
     * @param {string} id - returns the parent id
     */
    getParentId(id: string): string;
    /**
     * Adds the given connector to diagram control
     * @returns { Connector } Adds the given connector to diagram control .\
     *
     * @param {ConnectorModel} obj - Defines the connector that has to be added to diagram
     * @blazorArgsType obj|DiagramConnector
     */
    addConnector(obj: ConnectorModel): Connector;
    /** @private */
    UpdateBlazorDiagramModelCollection(obj: Node | Connector, copiedObject?: (NodeModel | ConnectorModel)[], multiSelectDelete?: (NodeModel | ConnectorModel)[], isBlazorGroupUpdate?: boolean): void;
    /**
     *  UpdateBlazorDiagramModel method
     *
     * @returns { void }  UpdateBlazorDiagramModel method .\
     * @param {Node | Connector | ShapeAnnotation | PathAnnotation} obj - provide the obj value.
     * @param {string} objectType - provide the objectType value.
     * @param {number} removalIndex - provide the removalIndex value.
     * @param {number} annotationNodeIndex - provide the annotationNodeIndex value.
     *
     * @private
     */
    UpdateBlazorDiagramModel(obj: Node | Connector | ShapeAnnotation | PathAnnotation, objectType: string, removalIndex?: number, annotationNodeIndex?: number): void;
    private UpdateBlazorLabelOrPortObjects;
    /**
     *  addBlazorDiagramObjects method
     *
     * @returns { void }  addBlazorDiagramObjects method .\
     *
     * @private
     */
    addBlazorDiagramObjects(): void;
    private removeNodeEdges;
    /**
     *  insertBlazorConnector method
     *
     * @returns { void }  insertBlazorConnector method .\
     * @param {Connector} obj - provide the nodeId value.
     *
     * @private
     */
    insertBlazorConnector(obj: Connector): void;
    /**
     * Adds the provided object, which can be a node, group, or connector, onto the diagram canvas.
     *
     * @returns { Node | Connector }     Adds the provided object, which can be a node, group, or connector, onto the diagram canvas.\
     * @param {NodeModel | ConnectorModel} obj - Specifies the object to be added to the diagram.
     * @param {boolean} group - If a group object is passed, set it to true.
     */
    add(obj: NodeModel | ConnectorModel, group?: boolean): Node | Connector;
    /**
     * AddElements method allows us to add diagram elements such as nodes and connectors as a collection into the diagram canvas.
     * @returns {void} -AddElements method.
     * @param { NodeModel[] | ConnectorModel[]} obj -Specifies the colelction object to be added to the diagram.
     * @public method
     **/
    addElements(obj: NodeModel[] | ConnectorModel[]): void;
    /**
     * getPathdata from path data storage to access the path elements points
     * @returns {PointModel[]} - Ruturns points of the path data
     * @param {string} key - Path data as key
     *
     * @private
     */
    getPathData(key: string): PointModel[];
    /**
     * setPathdata to path data storage to access the path elements points
     * @returns {void} - Set Path data method
     * @param {string} key - Path data as key
     * @param {PointModel[]} data - Path data's points
     *
     * @private
     */
    setPathData(key: string, data: PointModel[]): void;
    private updateSvgNodes;
    /**
     *  updateProcesses method
     *
     * @returns { void }  updateProcesses method .\
     * @param {(Node | Connector)} node - provide the nodeId value.
     *
     * @private
     */
    updateProcesses(node: (Node | Connector)): void;
    /**
     *  moveSvgNode method
     *
     * @returns { void }  moveSvgNode method .\
     * @param {string} nodeId - provide the nodeId value.
     *
     * @private
     */
    moveSvgNode(nodeId: string): void;
    /**
     * Adds the given annotation to the specified node.
     *
     * @returns { void } Adds the given annotation to the specified node.\
     * @param {BpmnAnnotationModel} annotation - Object representing the annotation to be added.
     * @param {NodeModel} node - object representing the node to which the annotation will be added.
     * @deprecated
     */
    addTextAnnotation(annotation: BpmnAnnotationModel, node: NodeModel): void;
    private spliceConnectorEdges;
    /**
     * Remove the dependent connectors if the node is deleted
     * @returns { void } Remove the dependent connectors if the node is deleted .\
     * @param {Node} obj - provide the node value.
     *
     * @private
     */
    removeDependentConnector(obj: Node | Connector): void;
    /**
     * Remove the dependent connectors if the node is deleted
     * @returns { void } Remove the dependent connectors if the node is deleted .\
     * @param {(NodeModel | ConnectorModel)} obj - provide the node value.
     *
     * @private
     */
    removeObjectsFromLayer(obj: (NodeModel | ConnectorModel)): void;
    /**
     * removeElements method \
     *
     * @returns { string }     removeElements method .\
     * @param {NodeModel | ConnectorModel} currentObj - provide the currentObj value.
     *
     * @private
     */
    removeElements(currentObj: NodeModel | ConnectorModel): void;
    private removeCommand;
    /**
     * Removes the specified object from the diagram.
     *
     * @param {NodeModel | ConnectorModel} obj - The node or connector object to be removed from the diagram.
     */
    remove(obj?: NodeModel | ConnectorModel): void;
    private isStackChild;
    /** @private */
    deleteChild(node: NodeModel | ConnectorModel | string, parentNode?: NodeModel, allowChildInSwimlane?: boolean): void;
    /**
     * addChild method \
     *
     * @returns { string }     addChild method .\
     * @param {NodeModel} node - provide the node value.
     * @param {string | NodeModel | ConnectorModel} child - provide the child value.
     * @param {number} index - provide the layoutOrientation value.
     *
     * @private
     */
    addChild(node: NodeModel, child: string | NodeModel | ConnectorModel, index?: number): string;
    /**
     * removeChild method \
     *
     * @returns { string }     removeChild method .\
     * @param {NodeModel} node - provide the node value.
     * @param {string | NodeModel | ConnectorModel} child - provide the child value.
     *
     * @private
     */
    removeChild(node: NodeModel, child: string | NodeModel | ConnectorModel): string;
    /**
     * Clears all nodes and objects in the diagram, effectively resetting the diagram to an empty state.
     *
     * @returns { void }     Clears all nodes and objects in the diagram, effectively resetting the diagram to an empty state.\
     * @deprecated
     */
    clear(): void;
    private clearLayers;
    private clearObjects;
    private startEditCommad;
    /**
     * Initiate the editing mode for a specific annotation within a node or connector.
     *
     * @returns { void }  Initiate the editing mode for a specific annotation within a node or connector. \
     * @param {NodeModel | ConnectorModel} node - The node or connector containing the annotation to be edited.
     * @param {string} id - The ID of the annotation to be edited within the node or connector.
     */
    startTextEdit(node?: NodeModel | ConnectorModel, id?: string): void;
    private updateConnectorfixedUserHandles;
    private updateNodeExpand;
    private updateConnectorAnnotation;
    private removeChildrenFromLayout;
    /**
     * Automatically updates the diagram objects based on the type of the layout.
     * @returns { ILayout | boolean }  Automatically updates the diagram objects based on the type of the layout.\
     */
    doLayout(): ILayout | boolean;
    private refreshRoutingConnectors;
    private refreshFlowChartConnectors;
    private canDistribute;
    /**
     * Serializes the diagram control as a string.
     * @returns { string }     Serializes the diagram control as a string. \
     */
    saveDiagram(): string;
    /**
     * Converts the given string into a Diagram Control.
     *
     * @returns { Object } Converts the given string into a Diagram Control. \
     * @param {string} data - The string representing the diagram model JSON to be loaded.
     * @param {boolean} isEJ1Data - A boolean indicating whether the JSON data is EJ1 data.
     */
    loadDiagram(data: string, isEJ1Data?: boolean): Object;
    /**
     * Exports the current diagram to a string in Mermaid format.
     * This method converts the current state of the diagram into Mermaid syntax, allowing it to be saved or shared.
     * @returns {string} - A string containing the Mermaid text representation of the current diagram.
     */
    saveDiagramAsMermaid(): string;
    /**
     * Converts the diagram to Mermaid format and saves it.
     * If the diagram has a 'MindMap' layout, it will generate a Mermaid mind map.
     * @returns {string} - The Mermaid formatted string representing the diagram.
     */
    private saveMindmapDiagramInMermaidFormat;
    /**
     * Creates a text data source for sub-level children in a Mermaid diagram.
     * @param {string[]} dataSource - The data source to be updated.
     * @param {string[]} outEdges - The out edges of the current node.
     * @param {number} level - The level of the current node.
     * @returns {void} - Creates a text data source for sub-level children in a Mermaid diagram.
     */
    private updateTextDataSource;
    /**
     * Returns the text data source for the specified node in Mermaid format.
     * @param {NodeModel} node - The node for which the Mermaid data is to be generated.
     * @param {number} level - The level of the node in the diagram.
     * @returns {string} - The text data source for the specified node in Mermaid format.
     */
    private convertMindmapToMermaid;
    /**
     * Converts the flowchart diagram to Mermaid format.
     * @returns {string} - The exported flowchart diagram as Mermaid data.
     */
    private saveFlowDiagramInMermaidFormat;
    private arrowType;
    private getNodeShape;
    /** Loads a diagram from a string containing Mermaid syntax.
     * This method parses the provided Mermaid text data and updates the current diagram accordingly.
     * Currently, only Mindmap and Flowchart diagrams can be loaded.
     * To render the diagram properly, you should set the `Layout.type` to either `MindMap` or `FlowChart`, and ensure that the respective modules are injected.
     * @param {string} data - The Mermaid text data representing the diagram to be loaded.
     * @returns {void} - No return value. The method updates the diagram in place.
     */
    loadDiagramFromMermaid(data: string): void;
    /**
     * Counts the number of leading spaces in the specified string.
     * @param {string} word The string to check for leading spaces.
     * @returns { number } The number of leading spaces.
     */
    private countLeadingSpaces;
    private mermaidNodeBaseCollection;
    private convertMermaidToMindmap;
    /**
     * Creates a data source for the Mermaid diagram based on the provided hierarchy data.
     * @param { HierarchyData[] } data The list of hierarchy data to process.
     * @param { HierarchyData } parent The parent hierarchy data.
     * @param { string } parentId The ID of the parent node.
     * @returns { void }
     */
    private createDataSource;
    private bangShape;
    private cloudShape;
    /**
     * Retrieves the node details based on the provided hierarchy data for a mermaid diagram.
     * @param { HierarchyData } hierarchyData The hierarchy data.
     * @returns { NodeData } The node details.
     */
    private getNodeDetails;
    /**
     * To convert the Mermaid data to flowchart diagram
     * @param {string} data - The Mermaid data to be converted to a flowchart diagram.
     * @returns {void}
     */
    private convertMermaidToFlowChart;
    /**
     * To convert the dataCollection into flowchart nodes and connectors
     * @param { FlowChartData[] } dataCollection - The data collection to be converted to flowchart nodes and connectors.
     * @returns {void}
     */
    private createFlowChart;
    /**
     * Splits the line based on arrow
     * @param { string } line - line to split
     * @returns { string[] } - Splitted line
     */
    private getLineSplitting;
    /**
     * To parse the style of the node
     * @param { string } line - line to parse
     * @param { FlowChartData[] } dataCollection - data collection
     * @returns { void }
     */
    private parseStyle;
    /**
     * @param {string[]} lines - The lines to be processed.
     * @param {FlowChartData[]} dataCollection - The data collection to be updated.
     * @param {string} arrowType - The type of arrow.
     * @returns { void }
     */
    private getNodeData;
    /**
     * To split the text based on the nested brackets
     * @param {string} text - The text to be split based on nested brackets.
     * @returns {string[]} An array of strings split based on the nested brackets.
     */
    private splitNested;
    private getShape;
    /**
     * To  get the html diagram content
     *
     * @returns { string }     getDirection method .\
     * @param {StyleSheetList} styleSheets - defines the collection of style files to be considered while exporting.
     */
    getDiagramContent(styleSheets?: StyleSheetList): string;
    /**
     * Exports a diagram as a image.
     *
     * @returns { void } Exports a diagram as a image.\
     * @param {string} image - A string representing the image content to be exported.
     * @param {IExportOptions} options -An object defining the properties of the image export.
     */
    exportImage(image: string, options: IExportOptions): void;
    /**
     * Prints the native or HTML nodes of the diagram as an image.
     *
     * @returns { void } Prints the native or HTML nodes of the diagram as an image. \
     * @param {string} image - A string that defines the image content to be printed.
     * @param {IExportOptions} options - An IExportOptions object that defines the properties of the image and printing options.
     */
    printImage(image: string, options: IExportOptions): void;
    /**
     * Define a limit on the number of history entries that the diagram's history manager can store. This can help manage memory usage and control the undo/redo history size. Or
     * Sets the limit for the history entries in the diagram.
     *
     * @returns { void }  Define a limit on the number of history entries that the diagram's history manager can store. This can help manage memory usage and control the undo/redo history size. Or Sets the limit for the history entries in the diagram.
     * @param {number} stackLimit - The limit for the history manager's stack.
     */
    setStackLimit(stackLimit: number): void;
    /**
     * Clears the history of the diagram, removing all the recorded actions from the undo and redo history.
     * @returns { void } Clears the history of the diagram, removing all the recorded actions from the undo and redo history.\
     */
    clearHistory(): void;
    /**
     * Retrieves the bounding rectangle that encloses the entire diagram.
     * @returns { void } TRetrieves the bounding rectangle that encloses the entire diagram. \
     */
    getDiagramBounds(): Rect;
    /**
     * Exports the diagram as an image or SVG element based on the specified options.
     *
     * @returns { void } Exports the diagram as an image or SVG element based on the specified options.\
     * @param {IExportOptions} options - An object defining how the diagram image should be exported.
     */
    exportDiagram(options: IExportOptions): string | SVGElement;
    /**
     * Prints the diagram.
     *
     * @returns { void }     Prints the diagram.\
     * @param {IPrintOptions} optons - An IPrintOptions object that defines how the diagram is to be printed.
     */
    print(options: IPrintOptions): void;
    /**
     * Adds ports to a node or connector at runtime. \
     *
     * @returns { void }    Adds ports to a node or connector at runtime.\
     * @param { Node | ConnectorModel} obj - object representing the node or connector to which ports will be added.
     * @param {ShapeAnnotationModel[] | PathAnnotationModel[]} ports - objects representing the ports to be added.
     * @blazorArgsType obj|DiagramNode
     */
    addPorts(obj: NodeModel | ConnectorModel, ports: PointPortModel[] | PathPortModel[]): void;
    /**
     * Adds constraints at run time. \
     *
     * @returns { void }Add constraints at run time .\
     * @param {number} constraintsType - The source value for constraints.
     * @param {number} constraintsValue - The target value for constraints.
     *
     */
    addConstraints(constraintsType: number, constraintsValue: number): number;
    /**
     * Remove constraints at run time. \
     *
     * @returns { void }Remove constraints at run time.\
     * @param {number} constraintsType - The type of constraints to be removed.
     * @param {number} constraintsValue - The value of constraints to be removed.
     *
     */
    removeConstraints(constraintsType: number, constraintsValue: number): number;
    /**
     * Add labels in node at the run time in the blazor platform  \
     *
     * @returns { void } Add labels in node at the run time in the blazor platform  \
     * @param {NodeModel} obj - provide the obj value.
     * @param {ShapeAnnotationModel[]} labels - provide the labels value.
     *
     */
    addNodeLabels(obj: NodeModel, labels: ShapeAnnotationModel[]): void;
    /**
     * Adds labels to a connector at runtime in the Blazor platform.\
     *
     * @returns { void } Adds labels to a connector at runtime in the Blazor platform.\
     * @param {ConnectorModel} obj - The connector to which labels will be added.
     * @param {PathAnnotationModel[]} labels - An array of labels to add to the connector.
     *
     */
    addConnectorLabels(obj: ConnectorModel, labels: PathAnnotationModel[]): void;
    /**
     * Adds labels to a node or connector at runtime. \
     *
     * @returns { void } Adds labels to a node or connector at runtime.\
     * @param {NodeModel | ConnectorModel} obj - The node or connector to which labels will be added.
     * @param {ShapeAnnotationModel[] | PathAnnotation[] | PathAnnotationModel[]} labels - An array of label objects to be added.
     *
     */
    addLabels(obj: NodeModel | ConnectorModel, labels: ShapeAnnotationModel[] | PathAnnotation[] | PathAnnotationModel[]): void;
    /**
     *addChildToUmlNode - Add methods, members and attributes into a UML class runtime. \
     *
     * @returns { void } Add.
     * @param {NodeModel} node - Specifies the existing UmlClass node in the diagram to which you intend to add child elements.
     * @param {UmlClassMethodModel | UmlClassAttributeModel | UmlEnumerationMemberModel} child - Specify the child elements, such as attributes, members, or methods, to be added to the UML class.
     * @param {UmlClassChildType} umlChildType - Specify the enum that you intend to add to the UML class.
     *
     */
    addChildToUmlNode(node: NodeModel, child: UmlClassMethodModel | UmlClassAttributeModel | UmlEnumerationMemberModel, umlChildType: UmlClassChildType): void;
    /**
     * Dynamically add lanes to a swimlane at runtime. You can specify the swimlane (node), the lanes to be added (lane), and an optional index to determine where the lanes should be inserted. \
     *
     * @returns { void } Dynamically add lanes to a swimlane at runtime. You can specify the swimlane (node), the lanes to be added (lane), and an optional index to determine where the lanes should be inserted.\
     * @param {NodeModel} node - The swimlane to which lanes will be added.
     * @param {LaneModel[]} lane -An array of LaneModel objects representing the lanes to be added.
     * @param {number} index - The index at which the lanes should be inserted.
     *
     */
    addLanes(node: NodeModel, lane: LaneModel[], index?: number): void;
    /**
     * Adds phases to a swimlane at runtime.  \
     *
     * @returns { void } Adds phases to a swimlane at runtime. \
     * @param {NodeModel} node - object representing the swimlane to which phases will be added.
     * @param {PhaseModel[]} phases - objects representing the phases to be added.
     *
     */
    addPhases(node: NodeModel, phases: PhaseModel[]): void;
    /**
     *Removes a dynamic lane from a swimlane at runtime. \
     *
     * @returns { void } Removes a dynamic lane from a swimlane at runtime.\
     * @param {NodeModel} node - representing the swimlane to remove the lane from.
     * @param {LaneModel} lane - representing the dynamic lane to be removed.
     *
     */
    removeLane(node: NodeModel, lane: LaneModel): void;
    /**
     *Removes a phase from a swimlane at runtime.\
     *
     * @returns { void } Removes a phase from a swimlane at runtime.\
     * @param {NodeModel} node - representing the swimlane to remove the phase from.
     * @param {PhaseModel} phase - representing the phase to be removed.
     *
     */
    removePhase(node: NodeModel, phase: PhaseModel): void;
    /**
     * Used to add or remove intermediate segments to the straight connector.
     *
     * @returns { void }  Used to add or remove intermediate segments to the straight connector.
     * @param {IEditSegmentOptions} editOptions - An object containing various options for adding/removing segments.
     *
     */
    editSegment(editOptions: IEditSegmentOptions): void;
    private removelabelExtension;
    /**
     * Removes labels from a node or connector at runtime. \
     *
     * @returns { string }    Removes labels from a node or connector at runtime. \
     * @param { Node | ConnectorModel} obj - Representing the node or connector to remove labels from.
     * @param {ShapeAnnotationModel[] | PathAnnotationModel[]} labels - objects representing the labels to be removed.
     *
     */
    removeLabels(obj: Node | ConnectorModel, labels: ShapeAnnotationModel[] | PathAnnotationModel[]): void;
    private removePortsExtenion;
    /**
     * Removes Ports at run time. \
     *
     * @returns { void } Removes Ports at run time.\
     * @param {Node} obj - The node or connector to remove ports from.
     * @param {PointPortModel[]} ports - An array of ports to be removed.
     *
     */
    removePorts(obj: Node | Connector, ports: PointPortModel[] | PathPortModel[]): void;
    /**
     * getSizeValue method \
     *
     * @returns { string }     getSizeValue method .\
     * @param {string | number} real - provide the real value.
     * @param {string | number} rulerSize - provide the rulerSize value.
     *
     * @private
     */
    getSizeValue(real: string | number, rulerSize?: number): string;
    private renderRulers;
    private intOffPageBackground;
    private initDiagram;
    private renderHiddenUserHandleTemplateLayer;
    private renderBackgroundLayer;
    private renderGridLayer;
    private renderDiagramLayer;
    private initLayers;
    /**
     * @private
     * @param { ClientRect } bounds - provide the bounds value
     * @param { HTMLElement } container - provide the container value
     * @returns { void }
     *
     */
    setScaleFromElement(bounds: ClientRect, container: HTMLElement): void;
    /**
     * @private
     * @returns { void }
     * @param { any } bounds - provide the bounds value
     */
    modifyBounds(bounds: any): void;
    /**
     * @private
     * @returns { number } - Returns offset value
     * @param { number } offset - provide the offset value
     * @param { boolean } isTooltipOffset - provide the isTooltipOffset value
     *
     */
    modifyClientOffset(offset: number, isTooltipOffset?: boolean): number;
    private renderAdornerLayer;
    private renderPortsExpandLayer;
    private renderHTMLLayer;
    private renderNativeLayer;
    /**
     * createSvg method \
     *
     * @returns { void }     createSvg method .\
     * @param {string} id - provide the source value.
     * @param {string | number} width - provide the source value.
     * @param {string | number} height - provide the source value.
     *
     * @private
     */
    createSvg(id: string, width: string | number, height: string | number): SVGElement;
    private updateBazorShape;
    private initObjects;
    /**
     * initLayerObjects method \
     *
     * @returns { void }     initLayerObjects method .\
     *
     * @private
     */
    initLayerObjects(): void;
    private alignGroup;
    private addToLayer;
    private updateLayer;
    private updateScrollSettings;
    private initData;
    private generateData;
    private makeData;
    private initNodes;
    private initConnectors;
    private setZIndex;
    private setIndex;
    private initializeDiagramLayers;
    /**
     * resetTool method \
     *
     * @returns { void }     resetTool method .\
     *
     * @private
     */
    resetTool(): void;
    private initObjectExtend;
    /**
     * initObject method \
     *
     * @returns { void }     initObject method .\
     * @param {End} obj - provide the obj value.
     * @param {End} layer - provide the layer value.
     * @param {LayoutOrientation} independentObj - provide the independentObj value.
     * @param {boolean} group - provide the independentObj value.
     *
     * @private
     */
    initObject(obj: IElement, layer?: LayerModel, independentObj?: boolean, group?: boolean): void;
    private getConnectedPort;
    private scaleObject;
    private updateDefaultLayoutIcons;
    private updateDefaultLayoutIcon;
    /**
     * updateGroupOffset method \
     *
     * @returns { void }     updateGroupOffset method .\
     * @param {NodeModel | ConnectorModel} node - provide the source value.
     * @param {boolean} isUpdateSize - provide the target value.
     *
     * @private
     */
    updateGroupOffset(node: NodeModel | ConnectorModel, isUpdateSize?: boolean): void;
    private initNode;
    private applyWrapperFlip;
    private applyWrapperCanvasFlip;
    private addBpmnAnnotationConnector;
    /** @private */
    private getBPMNTextAnnotation;
    /**
     * updateDiagramElementQuad method \
     *
     * @returns { void }     updateDiagramElementQuad method .\
     *
     * @private
     */
    updateDiagramElementQuad(): void;
    private onLoadImageSize;
    private updateChildPosition;
    private canExecute;
    private updateStackProperty;
    private initViews;
    private initCommands;
    private overrideCommands;
    private initCommandManager;
    /**
     * updateNodeEdges method \
     *
     * @returns { void }     updateNodeEdges method .\
     * @param {Node} node - provide the source value.
     *
     * @private
     */
    updateNodeEdges(node: Node): void;
    /**
     * updateIconVisibility method \
     *
     * @returns { void }     updateIconVisibility method .\
     * @param {Node} node - provide the source value.
     * @param {boolean} visibility - provide the source value.
     *
     * @private
     */
    private updateIconVisibility;
    /**
     * updateEdges method \
     *
     * @returns { void }     updateEdges method .\
     * @param {Connector} obj - provide the source value.
     *
     * @private
     */
    updateEdges(obj: Connector): void;
    /**
     * updatePortEdges method \
     *
     * @returns { void }     updatePortEdges method .\
     * @param {NodeModel} node - provide the source value.
     * @param {ConnectorModel} obj - provide the target value.
     * @param {boolean} isInEdges - provide the layoutOrientation value.
     *
     * @private
     */
    updatePortEdges(node: NodeModel | ConnectorModel, obj: ConnectorModel, isInEdges: boolean): void;
    /**
     * refreshDiagram method \
     *
     * @returns { void }     refreshDiagram method .\
     *
     * @private
     */
    refreshDiagram(): void;
    private updateCanupdateStyle;
    private getZindexPosition;
    /**
     *updateDiagramObject method \
     *
     * @returns { void } updateDiagramObject method .\
     * @param { (NodeModel | ConnectorModel) } obj - provide the obj value.
     * @param { boolean } canIgnoreIndex - provide the canIgnoreIndex value.
     * @param { boolean } isUpdateObject - provide the isUpdateObject value.
     *
     * @private
     */
    updateDiagramObject(obj: (NodeModel | ConnectorModel), canIgnoreIndex?: boolean, isUpdateObject?: boolean): void;
    private applyMarginBezier;
    private getMidPoint;
    /**
     * Apply alignment to bezier port
     * @returns {PointModel} return the port alignment points
     * @param {PathElement | TextElement} child - provide the obj value.
     * @param {any} finalPoint - provide final point value.
     * @param {PointModel} displacement - provide displacement value.
     */
    private applyAlignment;
    private getBezierPoints;
    /**
     *updateGridContainer method \
     *
     * @returns { void } updateGridContainer method .\
     * @param { GridPanel } grid - provide the objectArray value.
     *
     * @private
     */
    updateGridContainer(grid: GridPanel): void;
    /**
     *Retrieves the node or connector with the given id. \
     *
     * @returns { (NodeModel | ConnectorModel)[] } Retrieves the node or connector with the given id.\
     * @param { string[] } objectArray - The id of the node or connector to be retrieved.
     *
     * @private
     */
    getObjectsOfLayer(objectArray: string[]): (NodeModel | ConnectorModel)[];
    /**
     *refreshDiagramLayer method \
     *
     * @returns { void } refreshDiagramLayer method .\
     *
     * @private
     */
    refreshDiagramLayer(): void;
    /**
     *refreshCanvasLayers method \
     *
     * @returns { void } refreshCanvasLayers method .\
     * @param { View } view - provide the view value.
     *
     * @private
     */
    refreshCanvasLayers(view?: View): void;
    private renderBasicElement;
    private refreshElements;
    private renderTimer;
    /**
     *refreshCanvasDiagramLayer method \
     *
     * @returns { void } refreshCanvasDiagramLayer method .\
     * @param { View } view - provide the view value.
     *
     * @private
     */
    refreshCanvasDiagramLayer(view: View): void;
    /**
     *updatePortVisibility method \
     *
     * @returns { void } updatePortVisibility method .\
     * @param { Node } obj - provide the node value.
     * @param { PortVisibility } portVisibility - provide the portVisibility value.
     * @param { Boolean } inverse - provide the inverse value.
     *
     * @private
     */
    updatePortVisibility(obj: Node | Connector, portVisibility: PortVisibility, inverse?: Boolean): void;
    /**
     *refreshSvgDiagramLayer method \
     *
     * @returns { void } refreshSvgDiagramLayer method .\
     * @param { View } view - provide the object value.
     *
     * @private
     */
    refreshSvgDiagramLayer(view: View): void;
    /**
     *removeVirtualObjects method \
     *
     * @returns { void } removeVirtualObjects method .\
     * @param { Object } clearIntervalVal - provide the object value.
     *
     * @private
     */
    removeVirtualObjects(clearIntervalVal: Object): void;
    /**
     *updateTextElementValue method \
     *
     * @returns { void } updateTextElementValue method .\
     * @param {  NodeModel | ConnectorModel } object - provide the object value.
     *
     * @private
     */
    updateTextElementValue(object: NodeModel | ConnectorModel): void;
    /**
     *updateVirtualObjects method \
     *
     * @returns { void } updateVirtualObjects method .\
     * @param { string[] } collection - provide the collection value.
     * @param { boolean } remove - provide the remove value.
     * @param { string[] } tCollection - provide the htmlLayer value.
     *
     * @private
     */
    updateVirtualObjects(collection: string[], remove: boolean, tCollection?: string[]): void;
    /**
     *renderDiagramElements method \
     *
     * @returns { void } renderDiagramElements method .\
     * @param { HTMLCanvasElement | SVGElement} canvas - provide the canvas value.
     * @param { DiagramRenderer } renderer - provide the renderer value.
     * @param { HTMLElement } htmlLayer - provide the htmlLayer value.
     * @param {boolean } transform - provide the transform value.
     * @param {boolean } fromExport - provide the fromExport value.
     * @param { boolean } isOverView - provide the isOverView value.
     *
     * @private
     */
    renderDiagramElements(canvas: HTMLCanvasElement | SVGElement, renderer: DiagramRenderer, htmlLayer: HTMLElement, transform?: boolean, fromExport?: boolean, isOverView?: boolean): void;
    /**
     *updateBridging method \
     *
     * @returns { void } updateBridging method .\
     * @param {string} isLoad - provide the isLoad value.
     *
     * @private
     */
    updateBridging(isLoad?: boolean): void;
    /**
     *setCursor method \
     *
     * @returns { void } setCursor method .\
     * @param {string} cursor - provide the width value.
     *
     * @private
     */
    setCursor(cursor: string): void;
    /**
     *clearCanvas method \
     *
     * @returns { void } clearCanvas method .\
     * @param {View} view - provide the width value.
     *
     * @private
     */
    clearCanvas(view: View): void;
    /**
     *updateScrollOffset method \
     *
     * @returns { void } updateScrollOffset method .\
     *
     * @private
     */
    updateScrollOffset(): void;
    /**
     *setOffset method \
     *
     * @returns { void } setOffset method .\
     * @param {number} offsetX - provide the width value.
     * @param {number} offsetY - provide the height value.
     *
     * @private
     */
    setOffset(offsetX: number, offsetY: number): void;
    /**
     *setSize method \
     *
     * @returns { void } setSize method .\
     * @param {number} width - provide the width value.
     * @param {number} height - provide the height value.
     *
     * @private
     */
    setSize(width: number, height: number): void;
    /**
     *transformLayers method \
     *
     * @returns { void } Defines how to remove the Page breaks .\
     *
     * @private
     */
    transformLayers(): void;
    /**
     *Defines how to remove the Page breaks \
     *
     * @returns { void } Defines how to remove the Page breaks .\
     *
     * @private
     */
    removePageBreaks(): void;
    /**
     * Defines how the page breaks has been rendered \
     *
     * @returns { void } Defines how the page breaks has been rendered .\
     * @param {Rect} bounds - provide the overview value.
     *
     * @private
     */
    renderPageBreaks(bounds?: Rect): void;
    private validatePageSize;
    /**
     * setOverview method \
     *
     * @returns { void }     setOverview method .\
     * @param {View} overview - provide the overview value.
     * @param {string} id - provide the boolean value.
     *
     * @private
     */
    setOverview(overview: View, id?: string): void;
    private renderNodes;
    private updateThumbConstraints;
    /**
     * renderSelector method \
     *
     * @returns { void }     renderSelector method .\
     * @param {boolean} multipleSelection - provide the multipleSelection value.
     * @param {boolean} isSwimLane - provide the boolean value.
     * @param { Canvas } canvas - provide the lane or swimlane canvas
     *
     * @private
     */
    renderSelector(multipleSelection: boolean, isSwimLane?: boolean, canvas?: Canvas): void;
    private updateSelectionRectangle;
    /**
     * updateSelector method \
     *
     * @returns { void }     updateSelector method .\
     *
     * @private
     */
    updateSelector(): void;
    /**
     * renderSelectorForAnnotation method \
     *
     * @returns { void }     renderSelectorForAnnotation method .\
     * @param {Selector} selectorModel - provide the x value.
     * @param {(SVGElement | HTMLCanvasElement)} selectorElement - provide the y value.
     *
     * @private
     */
    renderSelectorForAnnotation(selectorModel: Selector, selectorElement: (SVGElement | HTMLCanvasElement)): void;
    /**
     * drawSelectionRectangle method \
     *
     * @returns { void }     drawSelectionRectangle method .\
     * @param {number} x - provide the x value.
     * @param {number} y - provide the y value.
     * @param {number} width - provide the width value.
     * @param {number} height - provide the height value.
     *
     * @private
     */
    drawSelectionRectangle(x: number, y: number, width: number, height: number): void;
    /**
     * renderHighlighter method \
     *
     * @returns { void }     renderHighlighter method .\
     * @param {DiagramElement} element - provide the node value.
     *
     * @private
     */
    renderHighlighter(element: DiagramElement): void;
    /**
     * clearHighlighter method \
     *
     * @returns { void }     clearHighlighter method .\
     *
     * @private
     */
    clearHighlighter(): void;
    /**
     * getNodesConnectors method \
     *
     * @returns { (NodeModel | ConnectorModel)[] }     getNodesConnectors method .\
     * @param {(NodeModel | ConnectorModel)[]} selectedItems - provide the node value.
     *
     * @private
     */
    getNodesConnectors(selectedItems: (NodeModel | ConnectorModel)[]): (NodeModel | ConnectorModel)[];
    /**
     * clearSelectorLayer method \
     *
     * @returns { void }     clearSelectorLayer method .\
     *
     * @private
     */
    clearSelectorLayer(): void;
    /**
     * getWrapper method \
     *
     * @returns { void }     getWrapper method .\
     * @param {Container} nodes - provide the node value.
     * @param {string} id - provide the childernCollection value.
     *
     * @private
     */
    getWrapper(nodes: Container, id: string): DiagramElement;
    /**
     * DiagramElement method \
     *
     * @returns { void }     getEndNodeWrapper method .\
     * @param {NodeModel | ConnectorModel} node - provide the node value.
     * @param {ConnectorModel} connector - provide the childernCollection value.
     * @param {boolean} source - provide the childernCollection value.
     *
     * @private
     */
    getEndNodeWrapper(node: NodeModel | ConnectorModel, connector: ConnectorModel, source: boolean): DiagramElement;
    private containsMargin;
    private focusOutEdit;
    private endEditCommand;
    private fontStyleCommand;
    private applyStyle;
    private applyStyleText;
    private duplicateCommand;
    private groupCommand;
    private rotateCommand;
    private flipCommand;
    private toolCommand;
    private zoomCommand;
    private shiftCommand;
    private alignCommand;
    private updateNodesAndConnectorAnnotation;
    private orderCommand;
    private navigateItems;
    /**
     * @private
     */
    endEdit(): Promise<void>;
    /**
     * getIndex method \
     *
     * @returns { void }     getIndex method .\
     * @param {NodeModel | ConnectorModel} node - provide the node value.
     * @param {string} id - provide the childernCollection value.
     *
     * @private
     */
    getIndex(node: NodeModel | ConnectorModel, id: string): string;
    /**
     * canLogChange method \
     *
     * @returns { void }     canLogChange method .\
     *
     * @private
     */
    canLogChange(): boolean;
    private modelChanged;
    private resetDiagramActions;
    /**
     * removeNode method \
     *
     * @returns { void }     removeNode method .\
     * @param {NodeModel} node - provide the node value.
     * @param {NodeModel} childrenCollection - provide the childrenCollection value.
     *
     * @private
     */
    removeNode(node: NodeModel, childrenCollection: string[]): void;
    /**
     * deleteGroup method \
     *
     * @returns { void }     deleteGroup method .\
     * @param {NodeModel} node - provide the source value.
     *
     * @private
     */
    deleteGroup(node: NodeModel): void;
    /** @private */
    /**
     * updateObject method \
     *
     * @returns { void }     updateObject method .\
     * @param {Node | Connector} actualObject - provide the source value.
     * @param {Node | Connector} oldObject - provide the target value.
     * @param {Node | Connector} changedProp - provide the layoutOrientation value.
     *
     * @private
     */
    updateObject(actualObject: Node | Connector, oldObject: Node | Connector, changedProp: Node | Connector): void;
    private nodePropertyChangeExtend;
    private updateTextAnnotationInSwimlane;
    private swimLaneNodePropertyChange;
    /** @private */
    insertValue(oldNodeObject: any, isNode: boolean): void;
    /** @private */
    nodePropertyChange(actualObject: Node, oldObject: Node, node: Node, isLayout?: boolean, rotate?: boolean, propertyChange?: boolean): void;
    private updateWrapperChildFlip;
    private updateWrapperFlip;
    private getResizeHandle;
    /**
     * To get new offset used to calculate the text annotation offset while resizing the parent node.
     * getTextAnnotationOffset method \
     *
     * @param {Node} actualObject - The current state of the parent node being resized.
     * @param {NodeModel} textAnnotation - The text annotation attached to the parent node.
     * @param {Node} oldObject - The previous state of the parent node before resizing.
     * @param {number} oldBpmnOffsetX - The previous X offset.
     * @param {number} oldBpmnOffsetY - The previous Y offset.
     * @returns { PointModel }    - Returns new offset
     *
     * @private
     */
    getTextAnnotationOffset(actualObject: Node, textAnnotation: NodeModel, oldObject: Node, oldBpmnOffsetX: number, oldBpmnOffsetY: number): {
        x: number;
        y: number;
    };
    private getTextAnnotationQuadrant;
    private updateBpmnAnnotationPosition;
    private updatePorts;
    private updateFlipOffset;
    private updateUMLActivity;
    private updateConnectorProperties;
    /**
     * updateConnectorEdges method \
     *
     * @returns { void }     Updates the connectorPropertyChange of the diagram container .\
     * @param {Node} actualObject - provide the actualObject value.
     *
     * @private
     */
    updateConnectorEdges(actualObject: Node | Connector): void;
    private connectorProprtyChangeExtend;
    /**
     * Updates the connectorPropertyChange of the diagram container \
     *
     * @returns { void }     Updates the connectorPropertyChange of the diagram container .\
     * @param {DiagramElement} actualObject - provide the actualObject value.
     * @param {boolean} oldProp - provide the oldProp value.
     * @param {boolean} newProp - provide the newProp value.
     * @param {boolean} disableBridging - provide the disableBridging value.
     * @param {boolean} propertyChange - provide the propertyChange value.
     *
     * @private
     */
    connectorPropertyChange(actualObject: Connector, oldProp: Connector, newProp: Connector, disableBridging?: boolean, propertyChange?: boolean): void;
    /**
     * getDirection methods \
     *
     * @returns { void }  getDirection methods .\
     * @param {NodeModel} node - provide the node value.
     * @param {string} portId - provide the portId value.
     * @param {string} item - provide the item value.
     * @param {number} isInEdges - provide the isInEdges value.
     *
     * @private
     */
    removePortEdges(node: NodeModel | ConnectorModel, portId: string, item: string, isInEdges: boolean): void;
    private updateConnectorPorts;
    private triggerPropertyChange;
    private findInOutConnectPorts;
    private getPoints;
    /**
     * update the  opacity  and visibility for the node  once the layout animation starts \
     *
     * @returns { void }  update the  opacity  and visibility for the node  once the layout animation starts .\
     * @param {Container} element - provide the element value.
     * @param {boolean} visible - provide the visible value.
     * @param {number} opacity - provide the opacity value.
     *
     * @private
     */
    updateNodeProperty(element: Container, visible?: boolean, opacity?: number): void;
    /**
     * checkSelected Item for Connector \
     *
     * @returns { void }  checkSelected Item for Connector .\
     * @param {Connector | Node} actualObject - provide the element value.
     *
     * @private
     */
    checkSelectedItem(actualObject: Connector | Node): boolean;
    /**
     * Updates the visibility of the diagram container \
     *
     * @returns { void }     Updates the visibility of the diagram container .\
     * @param {DiagramElement} element - provide the element value.
     * @param {boolean} visible - provide the target value.
     *
     * @private
     */
    private updateDiagramContainerVisibility;
    /**
     * Updates the visibility of the node/connector \
     *
     * @returns { void }  Updates the visibility of the node/connector .\
     * @param {Container} element - provide the element value.
     * @param {Connector | Node} obj - provide the obj value.
     * @param {boolean} visible - provide the visible value.
     *
     * @private
     */
    updateElementVisibility(element: Container, obj: Connector | Node, visible: boolean): void;
    private updateAnnotations;
    private updatefixedUserHandle;
    /**
     * updateConnectorfixedUserHandle method \
     *
     * @returns { void }  updateConnectorfixedUserHandle method .\
     * @param {ConnectorFixedUserHandleModel} changedObject - provide the changedObject value.
     * @param {ConnectorFixedUserHandleModel} actualfixedUserHandle - provide the actualfixedUserHandle value.
     * @param {Container} nodes - provide the nodes value.
     * @param {Object} actualObject - provide the actualObject value.
     * @param {boolean} canUpdateSize - provide the canUpdateSize value.
     *
     * @private
     */
    updateConnectorfixedUserHandle(changedObject: ConnectorFixedUserHandleModel, actualfixedUserHandle: ConnectorFixedUserHandleModel, nodes: Container, actualObject?: Object, canUpdateSize?: boolean): void;
    /**
     * updateAnnotation method \
     *
     * @returns { void }  updateAnnotation method .\
     * @param {AnnotationModel} changedObject - provide the changedObject value.
     * @param {ShapeAnnotationModel} actualAnnotation - provide the actualAnnotation value.
     * @param {Container} nodes - provide the nodes value.
     * @param {Object} actualObject - provide the actualObject value.
     * @param {boolean} canUpdateSize - provide the canUpdateSize value.
     *
     * @private
     */
    updateAnnotation(changedObject: AnnotationModel, actualAnnotation: ShapeAnnotationModel, nodes: Container, actualObject?: Object, canUpdateSize?: boolean): void;
    private updatefixedUserHandleContent;
    private updateConnectorfixedUserHandleWrapper;
    private updateAnnotationContent;
    private updateAnnotationWrapper;
    /**
     * updateNodefixedUserHandle method \
     *
     * @returns { void }  updateNodefixedUserHandle method .\
     * @param {NodeFixedUserHandleModel} changedObject - provide the changedObject value.
     * @param {NodeFixedUserHandleModel} actualfixedUserHandle - provide the actualfixedUserHandle value.
     * @param {Container} nodes - provide the changedObject value.
     * @param {Object} actualObject - provide the changedObject value.
     *
     * @private
     */
    updateNodefixedUserHandle(changedObject: NodeFixedUserHandleModel, actualfixedUserHandle: NodeFixedUserHandleModel, nodes: Container, actualObject?: Object): void;
    private updatefixedUserHandleWrapper;
    /**
     * updatePort method \
     *
     * @returns { void }  updatePort method .\
     * @param {PointPortModel} changedObject - provide the changedObject value.
     * @param {PointPortModel} actualPort - provide the changedObject value.
     * @param {Container} nodes - provide the changedObject value.
     * @param {Connector} actualObject - The actual connector object to be used.
     * @private
     */
    updatePort(changedObject: PointPortModel, actualPort: PointPortModel, nodes: Container, actualObject?: Connector): void;
    /**
     * updateIcon method \
     *
     * @returns { void }  updateIcon method .\
     * @param {Node} actualObject - provide the obj value.
     *
     * @private
     */
    updateIcon(actualObject: Node): void;
    private getPortContainer;
    private updateTooltip;
    /**
     * updateQuad method \
     *
     * @returns { void }  updateQuad method .\
     * @param {IElement} obj - provide the obj value.
     *
     * @private
     */
    updateQuad(obj: IElement): void;
    /**
     * removeFromAQuad method \
     *
     * @returns { void }  removeFromAQuad method .\
     * @param {IElement} obj - provide the node value.
     *
     * @private
     */
    removeFromAQuad(obj: IElement): void;
    /**
     * updateGroupSize method \
     *
     * @returns { void }  updateGroupSize method .\
     * @param {NodeModel | ConnectorModel} node - provide the node value.
     *
     * @private
     */
    updateGroupSize(node: NodeModel | ConnectorModel): void;
    private updatePage;
    /**
     * protectPropertyChange method \
     *
     * @returns { void }  protectPropertyChange method .\
     * @param {boolean} enable - provide the enable value.
     *
     * @private
     */
    protectPropertyChange(enable: boolean): void;
    /**
     * getProtectPropertyChangeValue method \
     *
     * @returns { boolean }  getProtectPropertyChangeValue method .\
     *
     * @private
     */
    getProtectPropertyChangeValue(): boolean;
    /**
     * enableServerDataBinding method \
     *
     * @returns { void }  enableServerDataBinding method .\
     * @param {boolean} enable - provide the node value.
     *
     * @private
     */
    enableServerDataBinding(enable: boolean): void;
    /**
     * updateShadow method \
     *
     * @returns { void }  updateShadow method .\
     * @param {ShadowModel} nodeShadow - provide the node value.
     * @param {ShadowModel} changedShadow - provide the Node value.
     *
     * @private
     */
    updateShadow(nodeShadow: ShadowModel, changedShadow: ShadowModel): void;
    /**
     * updateMargin method \
     *
     * @returns { void }  updateMargin method .\
     * @param {Node} node - provide the node value.
     * @param {Node} changes - provide the Node value.
     *
     * @private
     */
    updateMargin(node: Node, changes: Node): void;
    private removePreviewChildren;
    private selectDragedNode;
    private initDroppables;
    private getDropEventArgs;
    private removeChildInNodes;
    private getBlazorDragEventArgs;
    private findChild;
    private getChildren;
    private addChildNodes;
    private moveNode;
    /**
     * Moves the node or connector forward within the given layer. \
     *
     * @returns { void }  Moves the node or connector forward within the given layer.\
     * @param {Node | Connector} node - The node or connector to be moved forward within the layer.
     * @param {LayerModel} currentLayer - representing the layer in which the node or connector should be moved.
     *
     */
    moveObjectsUp(node: NodeModel | ConnectorModel, currentLayer: LayerModel): void;
    /**
     * Inserts a newly added element into the database. \
     *
     * @returns { void }  Inserts a newly added element into the database.\
     * @param {Node | Connector} node - The node or connector to be inserted into the database.
     *
     */
    insertData(node?: Node | Connector): object;
    /**
     * Updates user-defined element properties in the existing database. \
     *
     * @returns { void }     Updates user-defined element properties in the existing database.\
     * @param {Node | Connector} node - The source value representing the element to update.
     *
     */
    updateData(node?: Node | Connector): object;
    /**
     * Removes the user-deleted element from the existing database.\
     *
     * @returns { void }     Removes the user-deleted element from the existing database.\
     * @param {Node | Connector} node - The node or connector to be removed from the database.
     *
     */
    removeData(node?: Node | Connector): object;
    private crudOperation;
    private processCrudCollection;
    private parameterMap;
    private getNewUpdateNodes;
    private getDeletedNodes;
    private raiseAjaxPost;
    private getHiddenItems;
}
