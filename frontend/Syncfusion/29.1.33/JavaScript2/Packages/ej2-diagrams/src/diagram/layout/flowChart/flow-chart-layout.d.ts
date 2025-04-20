import { Margin } from '../../core/appearance';
import { Diagram } from '../../diagram';
import { BranchDirection, LayoutOrientation } from '../../enum/enum';
import { Connector } from '../../objects/connector';
import { ConnectorModel } from '../../objects/connector-model';
import { NodeModel } from '../../objects/node-model';
import { PointModel } from '../../primitives/point-model';
import { Rect } from '../../primitives/rect';
import { IConnector, INode } from '../layout-base';
/**
 * Defines the Flowchart Layout
 */
export declare class FlowchartLayout {
    private rootNodes;
    private vertexMapper;
    /** @private*/
    edgesMapper: Map<object, PointModel[]>;
    /** @private*/
    loopedgesMapper: Map<object, boolean>;
    private anchorX;
    private anchorY;
    /** @private*/
    verticalSpacing: number;
    /** @private*/
    horizontalSpacing: number;
    /** @private*/
    horizontalAlignment: string;
    /** @private*/
    verticalAlignment: string;
    /** @private*/
    margin: Margin;
    /** @private */
    orientation: LayoutOrientation;
    /** @private */
    yesBranchDirection: BranchDirection;
    /** @private */
    noBranchDirection: BranchDirection;
    /** @private */
    yesBranchValues: string[];
    /** @private */
    noBranchValues: string[];
    diagram: Diagram;
    private flowChartData;
    constructor();
    /**
     * To update the layout of the diagram.
     * @private
     * @param {NodeModel[]} nodes - provide the node value.
     * @param {Diagram} diagram - provide the diagram value.
     * @returns { void }
     */
    updateLayout(nodes: NodeModel[], diagram: Diagram): void;
    /**
     * To re-rout the flowchart connectors.
     * @private
     * @param {FlowchartLayout} layoutData - provide the layoutData value.
     * @param {Diagram} diagram - provide the diagram value.
     * @returns { void }
     */
    reRouteFlowChartConnectors(layoutData: FlowchartLayout, diagram: Diagram): void;
    private updateAnchor;
    private updateConnectorPoints;
    private inflate;
    private static isBranchConnector;
    private isYesBranchConnector;
    private isNoBranchConnector;
    private updateHorizontalSegments;
    private updateVerticalConnectorSegments;
    private getModelBounds;
    private createVertex;
    private updatePoints;
    private contains;
    updateLoopConnector(internalConnector: Connector): void;
    private checkForYesOrNoBranch;
    private getTreeVertices;
    /**
     * Initializes the edges collection of the vertices\
     *
     * @returns {  IConnector[] }    Initializes the edges collection of the vertices\
     * @param {FlowChartVertex} node - provide the node value.
     * @private
     */
    getEdges(node: FlowChartVertex): IConnector[];
    /**
     * Returns the source/target vertex of the given connector \
     *
     * @returns {  FlowChartVertex }    Returns the source/target vertex of the given connector \
     * @param {IConnector} edge - provide the node value.
     * @param {boolean} source - provide the node value.
     * @private
     */
    getVisibleTerminal(edge: ConnectorModel, source: boolean): FlowChartVertex;
    /**
     * used to get the edges between the given source and target  \
     *
     * @returns {  IConnector[] }    used to get the edges between the given source and target  .\
     * @param {FlowChartVertex} source - provide the angle value.
     * @param { FlowChartVertex} target - provide the angle value.
     * @param { boolean} directed - provide the angle value.
     * @private
     */
    getEdgesBetween(source: FlowChartVertex, target: FlowChartVertex, directed: boolean): IConnector[];
    /**
     *To destroy the FlowchartLayout
     *
     * @returns {void} To destroy the FlowchartLayout
     */
    destroy(): void;
    /**
     * @returns { string } toBounds method .\
     * Get getModuleName name.
     */
    protected getModuleName(): string;
}
export interface FlowChartVertex {
    id: string;
    geometry: Rect;
    inEdges: IConnector[];
    layoutObjectId: {};
    outEdges: IConnector[];
    item: INode;
    isDecisionNode: boolean;
    isYesChild: boolean;
    isNoChild: boolean;
}
export interface InternalVertex {
    id: string;
    cell: FlowChartVertex;
    internalOutEdges: InternalEdges[];
    internalInEdges: InternalEdges[];
    hashCode: number[];
    tempRank: number;
    maxRank: number;
    minRank: number;
    identicalSibling: string[];
}
export interface InternalEdges {
    connectorIds: string[];
    edges: IConnector[];
    source: InternalVertex;
    target: InternalVertex;
    isReversed: boolean;
    tempRank: number;
    maxRank: number;
    minRank: number;
    ids: string[];
}
export interface MatrixCellGroup {
    parents: MatrixCellGroup[];
    children: MatrixCellGroup[];
    visitedParents: MatrixCellGroup[];
    visitedChildren: MatrixCellGroup[];
    ignoredChildren: MatrixCellGroup[];
    loopChildren: MatrixCellGroup[];
    cells: InternalVertex[] | InternalEdges[];
    level: number;
    initialOffset: number;
    size: number;
    offset: number;
    key?: string[] | string;
    value?: MatrixCellGroup;
}
