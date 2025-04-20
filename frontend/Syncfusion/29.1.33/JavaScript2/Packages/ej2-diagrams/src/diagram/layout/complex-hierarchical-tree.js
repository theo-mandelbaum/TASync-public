import { OrthogonalSegment } from '../objects/connector';
import { Rect as RectModel } from '../primitives/rect';
import { Point } from '../primitives/point';
import { findDistance, getConnectorDirection } from '../utility/diagram-util';
/**
 * Connects diagram objects with layout algorithm
 */
var ComplexHierarchicalTree = /** @class */ (function () {
    /**
     * Constructor for the hierarchical tree layout module
     *
     * @private
     */
    function ComplexHierarchicalTree() {
        //constructs the layout module
    }
    /**
     * To destroy the hierarchical tree module
     *
     * @returns {void}
     * @private
     */
    ComplexHierarchicalTree.prototype.destroy = function () {
        /**
         * Destroy method performed here
         */
    };
    /**
     * Core method to return the component name.
     *
     * @returns {string}  Core method to return the component name.
     * @private
     */
    ComplexHierarchicalTree.prototype.getModuleName = function () {
        /**
         * Returns the module name of the layout
         *
         */
        return 'ComplexHierarchicalTree';
    };
    /**
     * doLayout method\
     *
     * @returns {  void }    doLayout method .\
     * @param {INode[]} nodes - provide the nodes value.
     * @param {{}} nameTable - provide the nameTable value.
     * @param {Layout} layout - provide the layout value.
     * @param {PointModel} viewPort - provide the viewPort value.
     * @param {Diagram} diagram - provide the diagram model.
     * @private
     */
    ComplexHierarchicalTree.prototype.doLayout = function (nodes, nameTable, layout, viewPort, diagram) {
        new HierarchicalLayoutUtil().doLayout(nodes, nameTable, layout, viewPort, diagram);
    };
    ComplexHierarchicalTree.prototype.getLayoutNodesCollection = function (nodes) {
        var nodesCollection = [];
        var node;
        var parentId = 'parentId';
        var processId = 'processId';
        for (var i = 0; i < nodes.length; i++) {
            node = nodes[parseInt(i.toString(), 10)];
            //885697:Position of root node without the child node in complex hierarchical layout is not proper
            // 941582: ExcludeFromLayout Option Not Supported in Complex Hierarchical Tree
            if (!node.excludeFromLayout) {
                if (((node.inEdges.length + node.outEdges.length > 0) || (node.offsetX === 0 && node.offsetY === 0)) &&
                    !node['' + parentId] && !node['' + processId]) {
                    nodesCollection.push(node);
                }
            }
        }
        return nodesCollection;
    };
    return ComplexHierarchicalTree;
}());
export { ComplexHierarchicalTree };
/**
 * Utility that arranges the nodes in hierarchical structure
 */
var HierarchicalLayoutUtil = /** @class */ (function () {
    function HierarchicalLayoutUtil() {
        this.nameTable = {};
        this.crossReduction = new CrossReduction();
        /**
         * The preferred vertical offset between edges exiting a vertex Default is 2.
         */
        this.previousEdgeOffset = 6;
        /**
         * The preferred horizontal distance between edges exiting a vertex Default is 5.
         */
        this.previousEdgeDistance = 5;
        /**
         * Holds the collection vertices, that are equivalent to nodes to be arranged
         */
        this.jettyPositions = {};
        /**
         * Internal cache of bottom-most value of Y for each rank
         */
        this.rankBottomY = null;
        /**
         * Internal cache of bottom-most value of X for each rank
         */
        this.limitX = null;
        /**
         * Internal cache of top-most values of Y for each rank
         */
        this.rankTopY = null;
        /**
         * The minimum parallelEdgeSpacing value is 12.
         */
        this.parallelEdgeSpacing = 10;
        /**
         * The minimum distance for an edge jetty from a vertex Default is 12.
         */
        this.minEdgeJetty = 12;
    }
    //Defines a vertex that is equivalent to a node object
    HierarchicalLayoutUtil.prototype.createVertex = function (node, value, x, y, width, height) {
        var geometry = { x: x, y: y, width: width, height: height };
        var vertex = {
            value: value, geometry: geometry, name: value, vertex: true,
            inEdges: node.inEdges.slice(), outEdges: node.outEdges.slice()
        };
        return vertex;
    };
    /**
     * Initializes the edges collection of the vertices\
     *
     * @returns {  IConnector[] }    Initializes the edges collection of the vertices\
     * @param {Vertex} node - provide the node value.
     * @private
     */
    HierarchicalLayoutUtil.prototype.getEdges = function (node) {
        var edges = [];
        var node1 = this.nameTable[node.name];
        // 941582: ExcludeFromLayout Option Not Supported in Complex Hierarchical Tree
        if (node && !node1.excludeFromLayout) {
            for (var i = 0; node.inEdges.length > 0 && i < node.inEdges.length; i++) {
                var connector = this.nameTable[node.inEdges[parseInt(i.toString(), 10)]];
                if (!this.nameTable[connector.sourceID].excludeFromLayout) {
                    edges.push(connector);
                }
            }
            for (var i = 0; node.outEdges.length > 0 && i < node.outEdges.length; i++) {
                var connector = this.nameTable[node.outEdges[parseInt(i.toString(), 10)]];
                if (!this.nameTable[connector.targetID].excludeFromLayout) {
                    edges.push(connector);
                }
            }
        }
        return edges;
    };
    //Finds the root nodes of the layout
    HierarchicalLayoutUtil.prototype.findRoots = function (vertices) {
        var roots = [];
        var best = null;
        var maxDiff = -100000;
        for (var _i = 0, _a = Object.keys(vertices); _i < _a.length; _i++) {
            var i = _a[_i];
            var cell = vertices["" + i];
            var conns = this.getEdges(cell);
            var outEdges = 0;
            var inEdges = 0;
            for (var k = 0; k < conns.length; k++) {
                var src = this.getVisibleTerminal(conns[parseInt(k.toString(), 10)], true);
                if (src.name === cell.name) {
                    outEdges++;
                }
                else {
                    inEdges++;
                }
            }
            if (inEdges === 0 && outEdges > 0) {
                roots.push(cell);
            }
            var diff = outEdges - inEdges;
            if (diff > maxDiff) {
                maxDiff = diff;
                best = cell;
            }
        }
        if (roots.length === 0 && best != null) {
            roots.push(best);
        }
        return roots;
    };
    /**
     * Returns the source/target vertex of the given connector \
     *
     * @returns {  Vertex }    Returns the source/target vertex of the given connector \
     * @param {IConnector} edge - provide the node value.
     * @param {boolean} source - provide the node value.
     * @private
     */
    HierarchicalLayoutUtil.prototype.getVisibleTerminal = function (edge, source) {
        var terminalCache = this.nameTable[edge.targetID];
        if (source) {
            terminalCache = this.nameTable[edge.sourceID];
        }
        for (var i = 0; i < this.vertices.length; i++) {
            if (this.vertices[parseInt(i.toString(), 10)].name === terminalCache.id) {
                return this.vertices[parseInt(i.toString(), 10)];
            }
        }
        return null;
    };
    /**
     * Traverses each sub tree, ensures there is no cycle in traversing \
     *
     * @returns {  {} }    Traverses each sub tree, ensures there is no cycle in traversing .\
     * @param {Vertex} vertex - provide the vertex value.
     * @param {boolean} directed - provide the directed value.
     * @param {IConnector} edge - provide the edge value.
     * @param {{}} currentComp - provide the currentComp value.
     * @param {{}[]} hierarchyVertices - provide the hierarchyVertices value.
     * @param {{}} filledVertices - provide the filledVertices value.
     * @private
     */
    HierarchicalLayoutUtil.prototype.traverse = function (vertex, directed, edge, currentComp, hierarchyVertices, filledVertices) {
        if (vertex != null) {
            var vertexID = vertex.name;
            if ((filledVertices == null ? true : filledVertices["" + vertexID] != null)) {
                if (currentComp["" + vertexID] == null) {
                    currentComp["" + vertexID] = vertex;
                }
                if (filledVertices != null) {
                    delete filledVertices["" + vertexID];
                }
                var edges = this.getEdges(vertex);
                var edgeIsSource = [];
                for (var i = 0; i < edges.length; i++) {
                    edgeIsSource[parseInt(i.toString(), 10)] = this.getVisibleTerminal(edges[parseInt(i.toString(), 10)], true) === vertex;
                }
                for (var i = 0; i < edges.length; i++) {
                    if (!directed || edgeIsSource[parseInt(i.toString(), 10)]) {
                        var next = this.getVisibleTerminal(edges[parseInt(i.toString(), 10)], !edgeIsSource[parseInt(i.toString(), 10)]);
                        var netCount = 1;
                        for (var j = 0; j < edges.length; j++) {
                            if (j === i) {
                                continue;
                            }
                            else {
                                var isSource2 = edgeIsSource[parseInt(j.toString(), 10)];
                                var otherTerm = this.getVisibleTerminal(edges[parseInt(j.toString(), 10)], !isSource2);
                                if (otherTerm === next) {
                                    if (isSource2) {
                                        netCount++;
                                    }
                                    else {
                                        netCount--;
                                    }
                                }
                            }
                        }
                        if (netCount >= 0) {
                            currentComp = this.traverse(next, directed, edges[parseInt(i.toString(), 10)], currentComp, hierarchyVertices, filledVertices);
                        }
                    }
                }
            }
            else {
                if (currentComp["" + vertexID] == null) {
                    // We've seen this vertex before, but not in the current component This component and the one it's in need to be merged
                    for (var i = 0; i < hierarchyVertices.length; i++) {
                        var comp = hierarchyVertices[parseInt(i.toString(), 10)];
                        if (comp["" + vertexID] != null) {
                            for (var _i = 0, _a = Object.keys(comp); _i < _a.length; _i++) {
                                var key = _a[_i];
                                currentComp["" + key] = comp["" + key];
                            }
                            // Remove the current component from the hierarchy set
                            hierarchyVertices.splice(i, 1);
                            return currentComp;
                        }
                    }
                }
            }
        }
        return currentComp;
    };
    //Returns the bounds of the given vertices
    HierarchicalLayoutUtil.prototype.getModelBounds = function (nodes) {
        nodes = nodes.slice();
        var rect = null;
        var rect1 = null;
        for (var i = 0; i < nodes.length; i++) {
            rect = nodes[parseInt(i.toString(), 10)].geometry;
            if (rect1) {
                var right = Math.max(rect1.x + rect1.width, rect.x + rect.width);
                var bottom = Math.max(rect1.y + rect1.height, rect.y + rect.height);
                rect1.x = Math.min(rect1.x, rect.x);
                rect1.y = Math.min(rect1.y, rect.y);
                rect1.width = right - rect1.x;
                rect1.height = bottom - rect1.y;
            }
            else {
                rect1 = { x: rect.x, y: rect.y, width: rect.width, height: rect.height };
            }
        }
        return rect1;
    };
    /* tslint:disable */
    /**
     *  Initializes the layouting process \
     *
     * @returns {  Vertex }     Initializes the layouting process \
     * @param {INode[]} nodes - provide the node value.
     * @param {{}} nameTable - provide the nameTable value.
     * @param {Layout} layoutProp - provide the layoutProp value.
     * @param {PointModel} viewPort - provide the viewPort value.
     * @param {Diagram} diagram - provide the diagram model.
     * @private
     */
    HierarchicalLayoutUtil.prototype.doLayout = function (nodes, nameTable, layoutProp, viewPort, diagram) {
        this.nameTable = nameTable;
        var canEnableRouting = layoutProp.enableRouting;
        var layout = {
            horizontalSpacing: layoutProp.horizontalSpacing, verticalSpacing: layoutProp.verticalSpacing,
            orientation: layoutProp.orientation, marginX: layoutProp.margin.left, marginY: layoutProp.margin.top,
            enableLayoutRouting: canEnableRouting
        };
        var model;
        var matrixModel = new MatrixModel();
        matrixModel.edgeMapper = [];
        matrixModel.diagram = diagram;
        var nodeWithMultiEdges = [];
        this.vertices = [];
        var filledVertexSet = {};
        for (var i = 0; i < nodes.length; i++) {
            var node1 = this.nameTable[nodes[parseInt(i.toString(), 10)].id];
            // 941582: ExcludeFromLayout Option Not Supported in Complex Hierarchical Tree
            if (!node1.excludeFromLayout) {
                var node = this.createVertex(nodes[parseInt(i.toString(), 10)], nodes[parseInt(i.toString(), 10)].id, 0, 0, nodes[parseInt(i.toString(), 10)].actualSize.width, nodes[parseInt(i.toString(), 10)].actualSize.height);
                this.vertices.push(node);
                if (nodes[parseInt(i.toString(), 10)].inEdges.length > 0
                    || nodes[parseInt(i.toString(), 10)].outEdges.length > 0) {
                    nodeWithMultiEdges.push(nodes[parseInt(i.toString(), 10)]);
                }
                filledVertexSet[node.name] = node;
                if (matrixModel) {
                    var outEdges = nodes[parseInt(i.toString(), 10)].outEdges.slice();
                    for (var j = 0; j < outEdges.length; j++) {
                        var outEdge = nameTable[outEdges[parseInt(j.toString(), 10)]];
                        matrixModel.setEdgeMapper({ key: outEdge, value: [] });
                    }
                }
            }
        }
        var hierarchyVertices = [];
        //let candidateRoots: Vertex[];
        var candidateRoots = this.findRoots(filledVertexSet);
        for (var i = 0; i < candidateRoots.length; i++) {
            var vertexSet = {};
            hierarchyVertices.push(vertexSet);
            this.traverse(candidateRoots[parseInt(i.toString(), 10)], true, null, vertexSet, hierarchyVertices, filledVertexSet);
        }
        var limit = { marginX: 0, marginY: 0 };
        var tmp = [];
        var checkLinear = false;
        var matrixModelObject;
        for (var i = 0; i < hierarchyVertices.length; i++) {
            var vertexSet = hierarchyVertices[parseInt(i.toString(), 10)];
            // eslint-disable-next-line
            for (var _i = 0, _a = Object.keys(vertexSet); _i < _a.length; _i++) {
                var key = _a[_i];
                tmp.push(vertexSet["" + key]);
            }
            if ((layoutProp.arrangement === 'Linear' && i === hierarchyVertices.length - 1) || canEnableRouting) {
                checkLinear = true;
            }
            model = new MultiParentModel(this, tmp, candidateRoots, layout);
            this.cycleStage(model);
            this.layeringStage(model);
            //897503: Child Nodes position in ComplexHierarchicalTree updated wrongly results in connector overlap
            if ((matrixModel && layoutProp.connectionPointOrigin === 'DifferentPoint') || checkLinear) {
                matrixModelObject = { model: model, matrix: [], rowOffset: [], roots: [] };
                matrixModel.arrangeElements(matrixModelObject, layoutProp);
                layoutProp.ranks = matrixModelObject.model.ranks;
            }
            else {
                if (layoutProp.arrangement === 'Nonlinear') {
                    this.crossingStage(model);
                    limit = this.placementStage(model, limit.marginX, limit.marginY);
                    tmp = [];
                }
            }
        }
        var modelBounds = this.getModelBounds(this.vertices);
        this.updateMargin(layoutProp, layout, modelBounds, viewPort);
        for (var i = 0; i < this.vertices.length; i++) {
            var clnode = this.vertices[parseInt(i.toString(), 10)];
            if (clnode) { //Check what is node.source/node.target -  && !clnode.source && !clnode.target) {
                var dnode = this.nameTable[clnode.name];
                dnode.offsetX = 0;
                dnode.offsetY = 0;
                //initialize layout
                var dx = (clnode.geometry.x - (dnode.offsetX - (dnode.actualSize.width / 2))) + layout.marginX;
                var dy = (clnode.geometry.y - (dnode.offsetY - (dnode.actualSize.height / 2))) + layout.marginY;
                var x = dx;
                var y = dy;
                if (layout.orientation === 'BottomToTop') {
                    if (canEnableRouting) {
                        clnode.geometry.y = modelBounds.height - dy - dnode.actualSize.height / 2;
                    }
                    y = modelBounds.height - dy;
                }
                else if (layout.orientation === 'RightToLeft') {
                    x = modelBounds.width - dx;
                }
                dnode.offsetX += x - dnode.offsetX;
                dnode.offsetY += y - dnode.offsetY;
                matrixModel.nodePropertyChange(dnode);
            }
        }
        if (!checkLinear) {
            for (var i = 0; i < this.vertices.length; i++) {
                this.isNodeOverLap(this.nameTable[this.vertices[parseInt(i.toString(), 10)].name], layoutProp);
            }
        }
        matrixModel.updateLayout(viewPort, modelBounds, layoutProp, layout, nodeWithMultiEdges, nameTable);
        if (canEnableRouting) {
            var vertices = {};
            var matrixrow1 = void 0;
            for (var p = 0; p < matrixModelObject.matrix.length; p++) {
                matrixrow1 = matrixModelObject.matrix[parseInt(p.toString(), 10)].value;
                for (var q = 0; q < matrixrow1.length; q++) {
                    var matrixCell = matrixrow1[parseInt(q.toString(), 10)];
                    for (var r = 0; r < matrixCell.cells.length; r++) {
                        var cell = matrixCell.cells[parseInt(r.toString(), 10)];
                        var type = this.getType(cell.type);
                        if (type === 'internalVertex') {
                            var internalVertex = cell;
                            vertices[internalVertex.id] = internalVertex;
                        }
                    }
                }
            }
            this.updateRankValuess(model);
            for (var i = 0, a = Object.keys(vertices); i < a.length; i++) {
                var key = a[parseInt(i.toString(), 10)];
                this.setVertexLocationValue(vertices["" + key], layoutProp.orientation, modelBounds);
            }
            this.localEdgeProcessing(model, vertices);
            this.assignRankOffset(model);
            this.updateEdgeSetXYValue(model);
            var edges = this.getValues(model.edgeMapper);
            for (var i = 0; i < edges.length; i++) {
                if ((edges[parseInt(i.toString(), 10)]).x.length > 0) {
                    for (var j = 0; j < (edges[parseInt(i.toString(), 10)]).x.length; j++) {
                        if (layoutProp.orientation !== 'RightToLeft' && layoutProp.orientation !== 'LeftToRight') {
                            (edges[parseInt(i.toString(), 10)]).x[parseInt(j.toString(), 10)]
                                = (edges[parseInt(i.toString(), 10)]).x[parseInt(j.toString(), 10)] + layout.marginX;
                        }
                        else if (layoutProp.orientation === 'LeftToRight') {
                            (edges[parseInt(i.toString(), 10)]).x[parseInt(j.toString(), 10)]
                                = (edges[parseInt(i.toString(), 10)]).x[parseInt(j.toString(), 10)] + layoutProp.verticalSpacing / 2;
                        }
                        else {
                            (edges[parseInt(i.toString(), 10)]).x[parseInt(j.toString(), 10)]
                                = (edges[parseInt(i.toString(), 10)]).x[parseInt(j.toString(), 10)] + layoutProp.verticalSpacing / 2;
                        }
                    }
                }
                this.setEdgePosition(edges[parseInt(i.toString(), 10)], model, layout);
            }
            for (var p = 0; p < this.vertices.length; p++) {
                var clnode = this.vertices[parseInt(p.toString(), 10)];
                if (clnode.outEdges.length > 1) {
                    this.updateMultiOutEdgesPoints(clnode);
                }
            }
        }
    };
    HierarchicalLayoutUtil.prototype.setEdgeXY = function (ranks, node, spacing, layer) {
        if (ranks && node.source.id) {
            var targetValue = void 0;
            var sourceValue = void 0;
            for (var i = 0; i < ranks.length; i++) {
                for (var k = 0; k < ranks[parseInt(i.toString(), 10)].length; k++) {
                    if (ranks[parseInt(i.toString(), 10)][parseInt(k.toString(), 10)].id === node.target.id
                        || ranks[parseInt(i.toString(), 10)][parseInt(k.toString(), 10)].id === node.source.id) {
                        if (ranks[parseInt(i.toString(), 10)][parseInt(k.toString(), 10)].id === node.target.id
                            && targetValue === undefined) {
                            targetValue = i;
                        }
                        if (ranks[parseInt(i.toString(), 10)][parseInt(k.toString(), 10)].id === node.source.id
                            && sourceValue === undefined) {
                            sourceValue = i;
                        }
                    }
                }
            }
            var rankOffsetValue = void 0;
            for (var m = targetValue; m <= sourceValue; m++) {
                if (rankOffsetValue === undefined) {
                    rankOffsetValue = this[m + '_RankOffset'];
                }
                if (rankOffsetValue !== undefined && rankOffsetValue < this[m + '_RankOffset']) {
                    rankOffsetValue = this[m + '_RankOffset'];
                }
            }
            if (this['edges'] === undefined) {
                this['edges'] = {};
            }
            this['edges'][(node).ids[0]] = { x: node.x, y: 0 };
            var value = this.resetOffsetXValue(rankOffsetValue, spacing / 10);
            node.x[layer - node.minRank - 1] = value;
            for (var k = 0; k < (node).edges.length; k++) {
                (node).edges[parseInt(k.toString(), 10)]['levelSkip'] = true;
            }
        }
    };
    HierarchicalLayoutUtil.prototype.resetOffsetXValue = function (value, spacing) {
        for (var i = 0, a = Object.keys(this['edges']); i < a.length; i++) {
            var key = a[parseInt(i.toString(), 10)];
            var length_1 = this['edges']["" + key].x;
            for (var j = 0; j < length_1.length; j++) {
                var offsetValue = void 0;
                if (this['edges']["" + key].x[parseInt(j.toString(), 10)] === value) {
                    offsetValue = value + spacing;
                    offsetValue = this.resetOffsetXValue(offsetValue, spacing);
                    return offsetValue;
                }
            }
        }
        return value;
    };
    HierarchicalLayoutUtil.prototype.setEdgePosition = function (cell, model, layout) {
        // For parallel edges we need to seperate out the points a
        // little
        var offsetX = 0;
        // Only set the edge control points once
        if (cell.temp[0] !== 101207) {
            if (cell.maxRank === undefined) {
                cell.maxRank = -1;
            }
            if (cell.minRank === undefined) {
                cell.minRank = -1;
            }
            var maxRank = cell.maxRank;
            var minRank = cell.minRank;
            if (maxRank === minRank) {
                maxRank = cell.source.maxRank;
                minRank = cell.target.minRank;
            }
            var parallelEdgeCount = 0;
            var jettys = this.jettyPositions[cell.ids[0]];
            if (cell.isReversed === undefined) {
                cell.isReversed = false;
            }
            else {
                cell.isReversed = true;
            }
            var source = cell.isReversed ? cell.target.cell : cell.source.cell;
            var layoutReversed = false;
            if (model.layout.orientation === 'TopToBottom' || model.layout.orientation === 'LeftToRight') {
                if (model.layout.orientation === 'TopToBottom') {
                    layoutReversed = false;
                }
                if (model.layout.orientation === 'LeftToRight') {
                    if (!cell.isReversed) {
                        layoutReversed = false;
                    }
                    else {
                        layoutReversed = false;
                    }
                }
            }
            else {
                if (!cell.isReversed) {
                    layoutReversed = true;
                }
            }
            for (var i = 0; i < cell.edges.length; i++) {
                var realEdge = cell.edges[parseInt(i.toString(), 10)];
                var realSource = this.getVisibleTerminal(realEdge, true);
                //List oldPoints = graph.getPoints(realEdge);
                var newPoints = [];
                // Single length reversed edges end up with the jettys in the wrong
                // places. Since single length edges only have jettys, not segment
                // control points, we just say the edge isn't reversed in this section
                var reversed = cell.isReversed;
                // if(cell.isReversed===undefined){
                //     reversed = false
                // }else{
                //     reversed =cell.isReversed
                // }
                if (realSource !== source) {
                    // The real edges include all core model edges and these can go
                    // in both directions. If the source of the hierarchical model edge
                    // isn't the source of the specific real edge in this iteration
                    // treat if as reversed
                    reversed = !reversed;
                }
                // First jetty of edge
                if (jettys != null) {
                    var arrayOffset = reversed ? 2 : 0;
                    var y = reversed ?
                        (layoutReversed ? this.rankBottomY[parseInt(minRank.toString(), 10)]
                            : this.rankTopY[parseInt(minRank.toString(), 10)])
                        : (layoutReversed ? this.rankTopY[parseInt(maxRank.toString(), 10)]
                            : this.rankBottomY[parseInt(maxRank.toString(), 10)]);
                    var jetty = jettys[parallelEdgeCount * 4 + 1 + arrayOffset];
                    if (reversed !== layoutReversed) {
                        jetty = -jetty;
                    }
                    if (layout.orientation === 'TopToBottom' || layout.orientation === 'BottomToTop') {
                        y += jetty;
                    }
                    var x = jettys[parallelEdgeCount * 4 + arrayOffset];
                    if (layout.orientation === 'TopToBottom' || layout.orientation === 'BottomToTop') {
                        newPoints.push(this.getPointvalue(x, y + layout.marginY));
                    }
                    else {
                        if (layout.orientation === 'LeftToRight') {
                            newPoints.push(this.getPointvalue(y + jetty, x + layout.marginY));
                        }
                        else {
                            newPoints.push(this.getPointvalue(y, x + layout.marginY));
                        }
                    }
                }
                var loopStart = cell.x.length - 1;
                var loopLimit = -1;
                var loopDelta = -1;
                var currentRank = cell.maxRank - 1;
                if (reversed) {
                    loopStart = 0;
                    loopLimit = cell.x.length;
                    loopDelta = 1;
                    currentRank = cell.minRank + 1;
                }
                // Reversed edges need the points inserted in
                // reverse order
                for (var j = loopStart; (cell.maxRank !== cell.minRank) && j !== loopLimit; j += loopDelta) {
                    // The horizontal position in a vertical layout
                    var positionX = cell.x[parseInt(j.toString(), 10)] + offsetX;
                    // This cell.x determines the deviated points of the connectors and jetty positions
                    //determine the src and targetgeo points .
                    // Work out the vertical positions in a vertical layout
                    // in the edge buffer channels above and below this rank
                    var topChannelY = (this.rankTopY[parseInt(currentRank.toString(), 10)]
                        + this.rankBottomY[currentRank + 1]) / 2.0;
                    var bottomChannelY = (this.rankTopY[currentRank - 1]
                        + this.rankBottomY[parseInt(currentRank.toString(), 10)]) / 2.0;
                    if (reversed) {
                        var tmp = topChannelY;
                        topChannelY = bottomChannelY;
                        bottomChannelY = tmp;
                    }
                    if (layout.orientation === 'TopToBottom' || layout.orientation === 'BottomToTop') {
                        newPoints.push(this.getPointvalue(positionX, topChannelY + layout.marginY));
                        newPoints.push(this.getPointvalue(positionX, bottomChannelY + layout.marginY));
                    }
                    else {
                        newPoints.push(this.getPointvalue(topChannelY, positionX + layout.marginY));
                        newPoints.push(this.getPointvalue(bottomChannelY, positionX + layout.marginY));
                    }
                    this.limitX = Math.max(this.limitX, positionX);
                    currentRank += loopDelta;
                }
                // Second jetty of edge
                if (jettys != null) {
                    var arrayOffset = reversed ? 2 : 0;
                    var rankY = reversed ?
                        (layoutReversed ? this.rankTopY[parseInt(maxRank.toString(), 10)]
                            : this.rankBottomY[parseInt(maxRank.toString(), 10)])
                        : (layoutReversed ? this.rankBottomY[parseInt(minRank.toString(), 10)]
                            : this.rankTopY[parseInt(minRank.toString(), 10)]);
                    var jetty = jettys[parallelEdgeCount * 4 + 3 - arrayOffset];
                    if (reversed !== layoutReversed) {
                        jetty = -jetty;
                    }
                    var y = rankY - jetty;
                    var x = jettys[parallelEdgeCount * 4 + 2 - arrayOffset];
                    if (layout.orientation === 'TopToBottom' || layout.orientation === 'BottomToTop') {
                        newPoints.push(this.getPointvalue(x, y + layout.marginY));
                    }
                    else {
                        newPoints.push(this.getPointvalue(y, x + layout.marginY));
                    }
                }
                this.setEdgePoints(realEdge, newPoints, model);
                // Increase offset so next edge is drawn next to
                // this one
                if (offsetX === 0.0) {
                    offsetX = this.parallelEdgeSpacing;
                }
                else if (offsetX > 0) {
                    offsetX = -offsetX;
                }
                else {
                    offsetX = -offsetX + this.parallelEdgeSpacing;
                }
                parallelEdgeCount++;
            }
            cell.temp[0] = 101207;
        }
    };
    /* tslint:enable */
    // eslint-disable-next-line
    HierarchicalLayoutUtil.prototype.getPointvalue = function (x, y) {
        return { 'x': Number(x) || 0, 'y': Number(y) || 0 };
    };
    HierarchicalLayoutUtil.prototype.updateEdgeSetXYValue = function (model) {
        if (model.layout.enableLayoutRouting) {
            var isHorizontal = false;
            if (model.layout.orientation === 'LeftToRight' || model.layout.orientation === 'RightToLeft') {
                isHorizontal = true;
            }
            for (var i = 0; i < model.ranks.length; i++) {
                var rank = model.ranks[parseInt(i.toString(), 10)];
                for (var k = 0; k < rank.length; k++) {
                    var cell = rank[parseInt(k.toString(), 10)];
                    if ((cell).edges && (cell).edges.length > 0) {
                        var spacing = model.layout.horizontalSpacing > 0 ? (model.layout.horizontalSpacing / 2) : 15;
                        var check = true;
                        if (!(cell.minRank === i - 1 || cell.maxRank === i - 1)) {
                            check = false;
                        }
                        if (check) {
                            this.setXY(cell, i, undefined, isHorizontal ? true : false, model.ranks, spacing);
                        }
                    }
                }
            }
        }
    };
    HierarchicalLayoutUtil.prototype.getPreviousLayerConnectedCells = function (layer, cell) {
        if (cell.previousLayerConnectedCells == null) {
            cell.previousLayerConnectedCells = [];
            cell.previousLayerConnectedCells[0] = [];
            for (var i = 0; i < cell.connectsAsSource.length; i++) {
                var edge = cell.connectsAsSource[parseInt(i.toString(), 10)];
                if (edge.minRank === -1 || edge.minRank === layer - 1) {
                    // No dummy nodes in edge, add node of other side of edge
                    cell.previousLayerConnectedCells[0].push(edge.target);
                }
                else {
                    // Edge spans at least two layers, add edge
                    cell.previousLayerConnectedCells[0].push(edge);
                }
            }
        }
        return cell.previousLayerConnectedCells[0];
    };
    HierarchicalLayoutUtil.prototype.compare = function (a, b) {
        if (a != null && b != null) {
            if (b.weightedValue > a.weightedValue) {
                return -1;
            }
            else if (b.weightedValue < a.weightedValue) {
                return 1;
            }
        }
        return 0;
    };
    /* tslint:disable */
    // eslint-disable-next-line
    HierarchicalLayoutUtil.prototype.localEdgeProcessing = function (model, vertices) {
        // Iterate through each vertex, look at the edges connected in
        // both directions.
        for (var rankIndex = 0; rankIndex < model.ranks.length; rankIndex++) {
            var rank = model.ranks[parseInt(rankIndex.toString(), 10)];
            for (var cellIndex = 0; cellIndex < rank.length; cellIndex++) {
                var cell = rank[parseInt(cellIndex.toString(), 10)];
                if (this.crossReduction.isVertex(cell)) {
                    var currentCells = this.getPreviousLayerConnectedCells(rankIndex, cell);
                    var currentRank = rankIndex - 1;
                    // Two loops, last connected cells, and next
                    for (var k = 0; k < 2; k++) {
                        if (currentRank > -1
                            && currentRank < model.ranks.length
                            && currentCells != null
                            && currentCells.length > 0) {
                            var sortedCells = [];
                            for (var j = 0; j < currentCells.length; j++) {
                                var sorter = this.weightedCellSorter(currentCells[parseInt(j.toString(), 10)], this.getX(currentRank, currentCells[parseInt(j.toString(), 10)]));
                                sortedCells.push(sorter);
                            }
                            sortedCells.sort(this.compare);
                            cell.width = vertices[cell.id].cell.geometry.width;
                            cell.height = vertices[cell.id].cell.geometry.height;
                            var leftLimit = void 0;
                            if (model.layout.orientation === 'TopToBottom' || model.layout.orientation === 'BottomToTop') {
                                cell.x[0] = vertices[cell.id].cell.geometry.x + vertices[cell.id].cell.geometry.width / 2;
                                leftLimit = cell.x[0] - cell.width / 2 + vertices[cell.id].cell.geometry.height / 2;
                            }
                            else {
                                cell.x[0] = vertices[cell.id].cell.geometry.y;
                                leftLimit = cell.x[0];
                            }
                            var rightLimit = leftLimit + cell.width;
                            // Connected edge count starts at 1 to allow for buffer
                            // with edge of vertex
                            var connectedEdgeCount = 0;
                            var connectedEdgeGroupCount = 0;
                            var connectedEdges = [];
                            // Calculate width requirements for all connected edges
                            for (var j = 0; j < sortedCells.length; j++) {
                                var innerCell = sortedCells[parseInt(j.toString(), 10)].cell;
                                var connections = void 0;
                                if (this.crossReduction.isVertex(innerCell)) {
                                    // Get the connecting edge
                                    if (k === 0) {
                                        connections = cell.connectsAsSource;
                                    }
                                    else {
                                        connections = cell.connectsAsTarget;
                                    }
                                    for (var connIndex = 0; connIndex < connections.length; connIndex++) {
                                        if (connections[parseInt(connIndex.toString(), 10)].source === innerCell
                                            || connections[parseInt(connIndex.toString(), 10)].target === innerCell) {
                                            connectedEdgeCount += connections[parseInt(connIndex.toString(), 10)].edges
                                                .length;
                                            connectedEdgeGroupCount++;
                                            connectedEdges.push(connections[parseInt(connIndex.toString(), 10)]);
                                        }
                                    }
                                }
                                else {
                                    connectedEdgeCount += innerCell.edges.length;
                                    // eslint-disable-next-line
                                    connectedEdgeGroupCount++;
                                    connectedEdges.push(innerCell);
                                }
                            }
                            var requiredWidth = (connectedEdgeCount + 1)
                                * this.previousEdgeDistance;
                            // Add a buffer on the edges of the vertex if the edge count allows
                            if (cell.width > requiredWidth
                                + (2 * this.previousEdgeDistance)) {
                                leftLimit += this.previousEdgeDistance;
                                rightLimit -= this.previousEdgeDistance;
                            }
                            var availableWidth = rightLimit - leftLimit;
                            var edgeSpacing = availableWidth / connectedEdgeCount;
                            var currentX = leftLimit + edgeSpacing / 2.0;
                            var currentYOffset = this.minEdgeJetty - this.previousEdgeOffset;
                            var maxYOffset = 0;
                            for (var j = 0; j < connectedEdges.length; j++) {
                                var numActualEdges = connectedEdges[parseInt(j.toString(), 10)].edges
                                    .length;
                                if (this.jettyPositions === undefined) {
                                    this.jettyPositions = {};
                                }
                                var pos = this.jettyPositions[connectedEdges[parseInt(j.toString(), 10)].ids[0]];
                                if (pos == null) {
                                    pos = [];
                                    this.jettyPositions[connectedEdges[parseInt(j.toString(), 10)].ids[0]] = pos;
                                }
                                if (j < connectedEdgeCount / 2) {
                                    currentYOffset += this.previousEdgeOffset;
                                }
                                else if (j > connectedEdgeCount / 2) {
                                    currentYOffset -= this.previousEdgeOffset;
                                }
                                // Ignore the case if equals, this means the second of 2
                                // jettys with the same y (even number of edges)
                                for (var m = 0; m < numActualEdges; m++) {
                                    pos[m * 4 + k * 2] = currentX;
                                    currentX += edgeSpacing;
                                    pos[m * 4 + k * 2 + 1] = currentYOffset;
                                }
                                maxYOffset = Math.max(maxYOffset, currentYOffset);
                            }
                        }
                        currentCells = this.getNextLayerConnectedCells(rankIndex, cell);
                        currentRank = rankIndex + 1;
                    }
                }
            }
        }
    };
    /* tslint:enable */
    HierarchicalLayoutUtil.prototype.updateMultiOutEdgesPoints = function (clnode) {
        for (var i = 0; i < clnode.outEdges.length / 2; i++) {
            var connector1 = this.nameTable[clnode.outEdges[parseInt(i.toString(), 10)]];
            var connector2 = this.nameTable[clnode.outEdges[clnode.outEdges.length - (i + 1)]];
            var geometry = 'geometry';
            //900930: To exclude self-loop in layouts
            if (connector1.sourceID !== connector2.targetID && connector1.targetID !== connector2.sourceID) {
                connector2["" + geometry].points[0].y = connector1["" + geometry].points[0].y;
            }
        }
    };
    HierarchicalLayoutUtil.prototype.getNextLayerConnectedCells = function (layer, cell) {
        if (cell.nextLayerConnectedCells == null) {
            cell.nextLayerConnectedCells = [];
            cell.nextLayerConnectedCells[0] = [];
            for (var i = 0; i < cell.connectsAsTarget.length; i++) {
                var edge = cell.connectsAsTarget[parseInt(i.toString(), 10)];
                if (edge.maxRank === -1 || edge.maxRank === layer + 1) {
                    // Either edge is not in any rank or
                    // no dummy nodes in edge, add node of other side of edge
                    cell.nextLayerConnectedCells[0].push(edge.source);
                }
                else {
                    // Edge spans at least two layers, add edge
                    cell.nextLayerConnectedCells[0].push(edge);
                }
            }
        }
        return cell.nextLayerConnectedCells[0];
    };
    HierarchicalLayoutUtil.prototype.getX = function (layer, cell) {
        if (this.crossReduction.isVertex(cell)) {
            return cell.x[0];
        }
        else if (!this.crossReduction.isVertex(cell)) {
            return cell.x[layer - cell.minRank - 1] || cell.temp[layer - cell.minRank - 1];
        }
        return 0.0;
    };
    HierarchicalLayoutUtil.prototype.getGeometry = function (edge) {
        var geometry = 'geometry';
        return edge["" + geometry];
    };
    HierarchicalLayoutUtil.prototype.setEdgePoints = function (edge, points, model) {
        if (edge != null) {
            var geometryValue = 'geometry';
            var geometry = this.getGeometry(edge);
            if (points != null) {
                for (var i = 0; i < points.length; i++) {
                    // eslint-disable-next-line
                    points[i].x = points[i].x;
                    // eslint-disable-next-line
                    points[i].y = points[i].y;
                }
            }
            geometry.points = points;
            edge["" + geometryValue] = geometry;
        }
    };
    HierarchicalLayoutUtil.prototype.assignRankOffset = function (model) {
        if (model) {
            for (var i = 0; i < model.ranks.length; i++) {
                this.rankCoordinatesAssigment(i, model);
            }
        }
    };
    HierarchicalLayoutUtil.prototype.rankCoordinatesAssigment = function (rankValue, model) {
        var rank = model.ranks[parseInt(rankValue.toString(), 10)];
        var spacing = model.layout.horizontalSpacing;
        var localOffset;
        for (var i = 0; i < rank.length; i++) {
            if (this[rankValue + '_' + 'RankOffset'] === undefined) {
                this[rankValue + '_' + 'RankOffset'] = 0;
            }
            localOffset = rank[parseInt(i.toString(), 10)].x[0];
            if (this[rankValue + '_' + 'RankOffset'] < localOffset) {
                this[rankValue + '_' + 'RankOffset'] = localOffset + rank[parseInt(i.toString(), 10)].width / 2 + spacing;
            }
        }
    };
    HierarchicalLayoutUtil.prototype.getType = function (type) {
        if (type === 'internalVertex') {
            return 'internalVertex';
        }
        else {
            return 'internalEdge';
        }
    };
    HierarchicalLayoutUtil.prototype.updateRankValuess = function (model) {
        this.rankTopY = [];
        this.rankBottomY = [];
        for (var i = 0; i < model.ranks.length; i++) {
            this.rankTopY[parseInt(i.toString(), 10)] = Number.MAX_VALUE;
            this.rankBottomY[parseInt(i.toString(), 10)] = -Number.MAX_VALUE;
        }
    };
    HierarchicalLayoutUtil.prototype.setVertexLocationValue = function (cell, orientation, modelBounds) {
        var cellGeomtry = cell.cell.geometry;
        var positionX;
        var positionY;
        if (orientation === 'TopToBottom' || orientation === 'BottomToTop') {
            positionX = cellGeomtry.x;
            positionY = cellGeomtry.y;
        }
        else {
            positionX = cellGeomtry.y;
            positionY = cellGeomtry.x;
        }
        if (orientation === 'RightToLeft') {
            // eslint-disable-next-line
            positionX = cellGeomtry.y;
            positionY = modelBounds.width - cellGeomtry.x - cellGeomtry.height;
            this.rankBottomY[cell.minRank] = Math.max(this.rankBottomY[cell.minRank], positionY);
            this.rankTopY[cell.minRank] = Math.min(this.rankTopY[cell.minRank], positionY + cellGeomtry.height);
        }
        else {
            this.rankTopY[cell.minRank] = Math.min(this.rankTopY[cell.minRank], positionY);
            this.rankBottomY[cell.minRank] = Math.max(this.rankBottomY[cell.minRank], positionY + cellGeomtry.height);
        }
    };
    HierarchicalLayoutUtil.prototype.calculateRectValue = function (dnode) {
        var rect = { x: 0, y: 0, right: 0, bottom: 0, height: 0, width: 0 };
        rect.x = dnode.offsetX - dnode.actualSize.width / 2;
        rect.right = dnode.offsetX + dnode.actualSize.width / 2;
        rect.y = dnode.offsetY - dnode.actualSize.height / 2;
        rect.bottom = dnode.offsetY + dnode.actualSize.height / 2;
        return rect;
    };
    HierarchicalLayoutUtil.prototype.isNodeOverLap = function (dnode, layoutProp) {
        var nodeRect = { x: 0, y: 0, right: 0, bottom: 0, height: 0, width: 0 };
        for (var i = 0; i < this.vertices.length; i++) {
            var rect = { x: 0, y: 0, width: 0, height: 0 };
            //let tempnode1: INode;
            var tempnode1 = this.nameTable[this.vertices[parseInt(i.toString(), 10)].value];
            if (dnode.id !== tempnode1.id && tempnode1.offsetX !== 0 && tempnode1.offsetY !== 0) {
                nodeRect = this.calculateRectValue(dnode);
                rect = this.calculateRectValue(tempnode1);
                if (this.isIntersect(rect, nodeRect, layoutProp)) {
                    if (layoutProp.orientation === 'TopToBottom' || layoutProp.orientation === 'BottomToTop') {
                        dnode.offsetX += layoutProp.horizontalSpacing;
                    }
                    else {
                        dnode.offsetY += layoutProp.verticalSpacing;
                    }
                    this.isNodeOverLap(dnode, layoutProp);
                }
            }
        }
    };
    HierarchicalLayoutUtil.prototype.isIntersect = function (rect, nodeRect, layoutProp) {
        if (!(Math.floor(rect.right + layoutProp.horizontalSpacing) <= Math.floor(nodeRect.x) ||
            Math.floor(rect.x - layoutProp.horizontalSpacing) >= Math.floor(nodeRect.right)
            || Math.floor(rect.y - layoutProp.verticalSpacing) >= Math.floor(nodeRect.bottom)
            || Math.floor(rect.bottom + layoutProp.verticalSpacing) <= Math.floor(nodeRect.y))) {
            return true;
        }
        else {
            return false;
        }
    };
    /* eslint-disable */
    HierarchicalLayoutUtil.prototype.updateMargin = function (layoutProp, layout, modelBounds, viewPort) {
        var viewPortBounds = { x: 0, y: 0, width: viewPort.x, height: viewPort.y };
        //let layoutBounds: Rect;
        var bounds = {
            x: modelBounds.x, y: modelBounds.y,
            right: modelBounds.x + modelBounds.width,
            bottom: modelBounds.y + modelBounds.height
        };
        var layoutBounds = layoutProp.bounds ? layoutProp.bounds : viewPortBounds;
        if (layout.orientation === 'TopToBottom' || layout.orientation === 'BottomToTop') {
            switch (layoutProp.horizontalAlignment) {
                case 'Auto':
                case 'Left':
                    layout.marginX = (layoutBounds.x - bounds.x) + layoutProp.margin.left;
                    break;
                case 'Right':
                    layout.marginX = layoutBounds.x + layoutBounds.width - layoutProp.margin.right - bounds.right;
                    break;
                case 'Center':
                    layout.marginX = layoutBounds.x + layoutBounds.width / 2 - (bounds.x + bounds.right) / 2;
                    break;
            }
            switch (layoutProp.verticalAlignment) {
                case 'Top':
                    //const top: number;
                    var top_1 = layoutBounds.y + layoutProp.margin.top;
                    layout.marginY = layout.orientation === 'TopToBottom' ? top_1 : -top_1;
                    break;
                case 'Bottom':
                    //const bottom: number;
                    var bottom = layoutBounds.y + layoutBounds.height - layoutProp.margin.bottom;
                    layout.marginY = layout.orientation === 'TopToBottom' ? bottom - bounds.bottom : -(bottom - bounds.bottom);
                    break;
                case 'Auto':
                case 'Center':
                    //const center: number;
                    var center = layoutBounds.y + layoutBounds.height / 2;
                    layout.marginY = layout.orientation === 'TopToBottom' ?
                        center - (bounds.y + bounds.bottom) / 2 : -center + (bounds.y + bounds.bottom) / 2;
                    break;
            }
        }
        else {
            switch (layoutProp.horizontalAlignment) {
                case 'Auto':
                case 'Left':
                    //let left: number;
                    var left = layoutBounds.x + layoutProp.margin.left;
                    layout.marginX = layout.orientation === 'LeftToRight' ? left : -left;
                    break;
                case 'Right':
                    var right = void 0;
                    right = layoutBounds.x + layoutBounds.width - layoutProp.margin.right;
                    layout.marginX = layout.orientation === 'LeftToRight' ? right - bounds.right : bounds.right - right;
                    break;
                case 'Center':
                    var center = void 0;
                    center = layoutBounds.width / 2 + layoutBounds.x;
                    layout.marginX = layout.orientation === 'LeftToRight' ?
                        center - (bounds.y + bounds.bottom) / 2 : -center + (bounds.x + bounds.right) / 2;
                    break;
            }
            switch (layoutProp.verticalAlignment) {
                case 'Top':
                    layout.marginY = layoutBounds.y + layoutProp.margin.top - bounds.y;
                    break;
                case 'Auto':
                case 'Center':
                    layout.marginY = layoutBounds.y + layoutBounds.height / 2 - (bounds.y + bounds.bottom) / 2;
                    break;
                case 'Bottom':
                    layout.marginY = layoutBounds.y + layoutBounds.height - layoutProp.margin.bottom - bounds.bottom;
                    break;
            }
        }
    };
    /* eslint-enable */
    //Handles positioning the nodes
    HierarchicalLayoutUtil.prototype.placementStage = function (model, marginX, marginY) {
        var placementStage = this.coordinateAssignment(marginX, marginY, parent, model);
        placementStage.model = model;
        placementStage.widestRankValue = null;
        this.placementStageExecute(placementStage);
        return {
            marginX: placementStage.marginX + model.layout.horizontalSpacing,
            marginY: placementStage.marginY + model.layout.verticalSpacing
        };
    };
    //Initializes the layout properties for positioning
    HierarchicalLayoutUtil.prototype.coordinateAssignment = function (marginX, marginY, parent, model) {
        var plalementChange = {};
        if (model.layout.orientation === 'TopToBottom' || model.layout.orientation === 'BottomToTop') {
            plalementChange.horizontalSpacing = model.layout.horizontalSpacing;
            plalementChange.verticalSpacing = model.layout.verticalSpacing;
        }
        else {
            plalementChange.horizontalSpacing = model.layout.verticalSpacing;
            plalementChange.verticalSpacing = model.layout.horizontalSpacing;
        }
        plalementChange.orientation = 'north';
        //Removed the conditions here. So check here in case of any issue
        plalementChange.marginX = plalementChange.marginX = marginX;
        plalementChange.marginY = plalementChange.marginY = marginY;
        return plalementChange;
    };
    //Calculate the largest size of the node either height or width depends upon the layoutorientation
    HierarchicalLayoutUtil.prototype.calculateWidestRank = function (plalementChange, graph, model) {
        var isHorizontal = false;
        if (plalementChange.model.layout.orientation === 'LeftToRight' || plalementChange.model.layout.orientation === 'RightToLeft') {
            isHorizontal = true;
        }
        var offset = -plalementChange.verticalSpacing;
        var lastRankMaxCellSize = 0.0;
        plalementChange.rankSizes = [];
        plalementChange.rankOffset = [];
        for (var rankValue = model.maxRank; rankValue >= 0; rankValue--) {
            var maxCellSize = 0.0;
            var rank = model.ranks[parseInt(rankValue.toString(), 10)];
            var localOffset = isHorizontal ? plalementChange.marginY : plalementChange.marginX;
            for (var i = 0; i < rank.length; i++) {
                var node = rank[parseInt(i.toString(), 10)];
                if (this.crossReduction.isVertex(node)) {
                    var vertex = node;
                    if (vertex.cell && (vertex.cell.inEdges || vertex.cell.outEdges)) {
                        var obj = this.nameTable[vertex.cell.name];
                        vertex.width = obj.actualSize.width;
                        vertex.height = obj.actualSize.height;
                        maxCellSize = Math.max(maxCellSize, (isHorizontal ? vertex.width : vertex.height));
                    }
                }
                else {
                    if (node) {
                        var edge = node;
                        var numEdges = 1;
                        if (edge.edges != null) {
                            numEdges = edge.edges.length;
                        }
                        node.width = (numEdges - 1) * 10;
                    }
                }
                if (isHorizontal) {
                    if (!node.height) {
                        node.height = 0;
                    }
                }
                // Set the initial x-value as being the best result so far
                localOffset += (isHorizontal ? node.height : node.width) / 2.0;
                this.setXY(node, rankValue, localOffset, isHorizontal ? true : false);
                this.setTempVariable(node, rankValue, localOffset);
                localOffset += ((isHorizontal ? node.height : node.width) / 2.0) + plalementChange.horizontalSpacing;
                if (localOffset > plalementChange.widestRankValue) {
                    plalementChange.widestRankValue = localOffset;
                    plalementChange.widestRank = rankValue;
                }
                plalementChange.rankSizes[parseInt(rankValue.toString(), 10)] = localOffset;
            }
            plalementChange.rankOffset[parseInt(rankValue.toString(), 10)] = offset;
            var distanceToNextRank = maxCellSize / 2.0 + lastRankMaxCellSize / 2.0 + plalementChange.verticalSpacing;
            lastRankMaxCellSize = maxCellSize;
            if (plalementChange.orientation === 'north' || plalementChange.orientation === 'west') {
                offset += distanceToNextRank;
            }
            else {
                offset -= distanceToNextRank;
            }
            for (var i = 0; i < rank.length; i++) {
                var cell = rank[parseInt(i.toString(), 10)];
                this.setXY(cell, rankValue, offset, isHorizontal ? false : true);
            }
        }
    };
    /**
     * Sets the temp position of the node on the layer \
     *
     * @returns {  void }  Sets the temp position of the node on the layer \
     * @param {IVertex} node - provide the nodes value.
     * @param {number} layer - provide the layer value.
     * @param {number} value - provide the value value.
     * @private
     */
    HierarchicalLayoutUtil.prototype.setTempVariable = function (node, layer, value) {
        if (this.crossReduction.isVertex(node)) {
            node.temp[0] = value;
        }
        else {
            node.temp[layer - node.minRank - 1] = value;
        }
    };
    // eslint-disable-next-line valid-jsdoc
    /**
     * setXY method \
     *
     * @returns { void }     setXY method .\
     * @param {IVertex} node - provide the source value.
     * @param {number} layer - provide the target value.
     * @param {number} value - provide the layoutOrientation value.
     * @param {boolean} isY - provide the layoutOrientation value.
     * @param {IVertex[][]} ranks - provide the layoutOrientation value.
     * @param {number} spacing - provide the layoutOrientation value.
     *
     * @private
     */
    HierarchicalLayoutUtil.prototype.setXY = function (node, layer, value, isY, ranks, spacing) {
        if (node && node.cell) {
            if (node.cell.inEdges.length > 0 || node.cell.outEdges.length > 0) {
                if (isY) {
                    node.y[0] = value;
                }
                else {
                    node.x[0] = value;
                }
            }
            else {
                if (isY) {
                    node.y[layer - node.minRank - 1] = value;
                }
                else {
                    node.x[layer - node.minRank - 1] = value;
                }
            }
        }
        else {
            this.setEdgeXY(ranks, node, spacing, layer);
        }
    };
    //Sets geometry position of the layout node on the layout model
    HierarchicalLayoutUtil.prototype.rankCoordinates = function (stage, rankValue, graph, model) {
        var isHorizontal = false;
        if (stage.model.layout.orientation === 'LeftToRight' || stage.model.layout.orientation === 'RightToLeft') {
            isHorizontal = true;
        }
        var rank = model.ranks[parseInt(rankValue.toString(), 10)];
        var maxOffset = 0.0;
        var localOffset = (isHorizontal ? stage.marginY : stage.marginX)
            + (stage.widestRankValue - stage.rankSizes[parseInt(rankValue.toString(), 10)]) / 2;
        for (var i = 0; i < rank.length; i++) {
            var node = rank[parseInt(i.toString(), 10)];
            if (this.crossReduction.isVertex(node)) {
                var obj = this.nameTable[node.cell.name];
                node.width = obj.actualSize.width;
                node.height = obj.actualSize.height;
                maxOffset = Math.max(maxOffset, node.height);
            }
            else {
                var edge = node;
                var numEdges = 1;
                if (edge.edges != null) {
                    numEdges = edge.edges.length;
                }
                if (isHorizontal) {
                    node.height = (numEdges - 1) * 10;
                }
                else {
                    node.width = (numEdges - 1) * 10;
                }
            }
            var size = (isHorizontal ? node.height : node.width) / 2.0;
            localOffset += size;
            this.setXY(node, rankValue, localOffset, isHorizontal ? true : false);
            this.setTempVariable(node, rankValue, localOffset);
            localOffset += (size + stage.horizontalSpacing);
        }
    };
    //sets the layout in an initial positioning.it will arange all the ranks as much as possible
    HierarchicalLayoutUtil.prototype.initialCoords = function (plalementChange, facade, model) {
        this.calculateWidestRank(plalementChange, facade, model);
        // Reverse sweep direction each time from widest rank
        for (var i = plalementChange.widestRank; i >= 0; i--) {
            if (i < model.maxRank) {
                this.rankCoordinates(plalementChange, i, facade, model);
            }
        }
        for (var i = plalementChange.widestRank + 1; i <= model.maxRank; i++) {
            if (i > 0) {
                this.rankCoordinates(plalementChange, i, facade, model);
            }
        }
    };
    /**
     *  Checks whether the given node is an ancestor \
     *
     * @returns {  boolean }  Checks whether the given node is an ancestor \
     * @param {IVertex} node - provide the nodes value.
     * @param {IVertex} otherNode - provide the layer value.
     * @private
     */
    HierarchicalLayoutUtil.prototype.isAncestor = function (node, otherNode) {
        // Firstly, the hash code of this node needs to be shorter than the other node
        if (otherNode != null && node.hashCode != null && otherNode.hashCode != null
            && node.hashCode.length < otherNode.hashCode.length) {
            if (node.hashCode === otherNode.hashCode) {
                return true;
            }
            if (node.hashCode == null || node.hashCode == null) {
                return false;
            }
            for (var i = 0; i < node.hashCode.length; i++) {
                if (node.hashCode[parseInt(i.toString(), 10)] !== otherNode.hashCode[parseInt(i.toString(), 10)]) {
                    return false;
                }
            }
            return true;
        }
        return false;
    };
    //initializes the sorter object
    HierarchicalLayoutUtil.prototype.weightedCellSorter = function (cell, weightedValue) {
        var weightedCellSorter = {};
        weightedCellSorter.cell = cell ? cell : null;
        weightedCellSorter.weightedValue = weightedValue ? weightedValue : 0;
        weightedCellSorter.visited = false;
        weightedCellSorter.rankIndex = null;
        return weightedCellSorter;
    };
    //Performs one node positioning in both directions
    HierarchicalLayoutUtil.prototype.minNode = function (plalementChange, model) {
        var nodeList = [];
        var map = { map: {} };
        var rank = [];
        for (var i = 0; i <= model.maxRank; i++) {
            rank[parseInt(i.toString(), 10)] = model.ranks[parseInt(i.toString(), 10)];
            for (var j = 0; j < rank[parseInt(i.toString(), 10)].length; j++) {
                var node = rank[parseInt(i.toString(), 10)][parseInt(j.toString(), 10)];
                var nodeWrapper = this.weightedCellSorter(node, i);
                nodeWrapper.rankIndex = j;
                nodeWrapper.visited = true;
                nodeList.push(nodeWrapper);
                model.setDictionaryForSorter(map, node, nodeWrapper, true);
            }
        }
        var maxTries = nodeList.length * 10;
        var count = 0;
        var tolerance = 1;
        while (nodeList.length > 0 && count <= maxTries) {
            var cellWrapper = nodeList.shift();
            var cell = cellWrapper.cell;
            var rankValue = cellWrapper.weightedValue;
            var rankIndex = cellWrapper.rankIndex;
            var nextLayerConnectedCells = this.crossReduction.getConnectedCellsOnLayer(cell, rankValue);
            var previousLayerConnectedCells = this.crossReduction.getConnectedCellsOnLayer(cell, rankValue, true);
            var nextConnectedCount = nextLayerConnectedCells ? nextLayerConnectedCells.length : 0;
            var prevConnectedCount = previousLayerConnectedCells ? previousLayerConnectedCells.length : 0;
            var medianNextLevel = this.medianXValue(plalementChange, nextLayerConnectedCells, rankValue + 1);
            var medianPreviousLevel = this.medianXValue(plalementChange, previousLayerConnectedCells, rankValue - 1);
            var numConnectedNeighbours = nextConnectedCount + prevConnectedCount;
            var currentPosition = this.crossReduction.getTempVariable(cell, rankValue);
            var cellMedian = currentPosition;
            if (numConnectedNeighbours > 0) {
                cellMedian = (medianNextLevel * nextConnectedCount + medianPreviousLevel * prevConnectedCount) / numConnectedNeighbours;
            }
            if (nextConnectedCount === 1 && prevConnectedCount === 1) {
                cellMedian = (medianPreviousLevel * prevConnectedCount) / prevConnectedCount;
            }
            else if (nextConnectedCount === 1) {
                cellMedian = (medianNextLevel * nextConnectedCount) / nextConnectedCount;
            }
            var positionChanged = false;
            var tempValue = undefined;
            if (cellMedian < currentPosition - tolerance) {
                if (rankIndex === 0) {
                    tempValue = cellMedian;
                    positionChanged = true;
                }
                else {
                    var leftCell = rank[parseInt(rankValue.toString(), 10)][rankIndex - 1];
                    var leftLimit = this.crossReduction.getTempVariable(leftCell, rankValue);
                    leftLimit = leftLimit + leftCell.width / 2 + plalementChange.intraCellSpacing + cell.width / 2;
                    if (leftLimit < cellMedian) {
                        tempValue = cellMedian;
                        positionChanged = true;
                    }
                    else if (leftLimit < this.crossReduction.getTempVariable(cell, rankValue) - tolerance) {
                        tempValue = leftLimit;
                        positionChanged = true;
                    }
                }
            }
            else if (cellMedian > currentPosition + tolerance) {
                var rankSize = rank[parseInt(rankValue.toString(), 10)].length;
                if (rankIndex === rankSize - 1) {
                    tempValue = cellMedian;
                    positionChanged = true;
                }
                else {
                    var rightCell = rank[parseInt(rankValue.toString(), 10)][rankIndex + 1];
                    var rightLimit = this.crossReduction.getTempVariable(rightCell, rankValue);
                    rightLimit = rightLimit - rightCell.width / 2 - plalementChange.intraCellSpacing - cell.width / 2;
                    if (rightLimit > cellMedian) {
                        tempValue = cellMedian;
                        positionChanged = true;
                    }
                    else if (rightLimit > this.crossReduction.getTempVariable(cell, rankValue) + tolerance) {
                        tempValue = rightLimit;
                        positionChanged = true;
                    }
                }
            }
            if (positionChanged) {
                this.setTempVariable(cell, rankValue, tempValue);
                // Add connected nodes to map and list
                this.updateNodeList(nodeList, map, nextLayerConnectedCells, model);
                this.updateNodeList(nodeList, map, previousLayerConnectedCells, model);
            }
            if (this.crossReduction.isVertex(cellWrapper.cell)) {
                cellWrapper.visited = false;
            }
            count++;
        }
    };
    //Updates the ndoes collection
    HierarchicalLayoutUtil.prototype.updateNodeList = function (nodeList, map, collection, model) {
        for (var i = 0; i < collection.length; i++) {
            var connectedCell = collection[parseInt(i.toString(), 10)];
            var connectedCellWrapper = model.getDictionaryForSorter(map, connectedCell);
            if (connectedCellWrapper != null) {
                if (connectedCellWrapper.visited === false) {
                    connectedCellWrapper.visited = true;
                    nodeList.push(connectedCellWrapper);
                }
            }
        }
    };
    //Calculates the node position of the connected cell on the specified rank
    HierarchicalLayoutUtil.prototype.medianXValue = function (plalementChange, connectedCells, rankValue) {
        if (!connectedCells || connectedCells.length === 0) {
            return 0;
        }
        var medianValues = [];
        for (var i = 0; i < connectedCells.length; i++) {
            medianValues[parseInt(i.toString(), 10)]
                = this.crossReduction.getTempVariable(connectedCells[parseInt(i.toString(), 10)], rankValue);
        }
        medianValues.sort(function (a, b) {
            return a - b;
        });
        if (connectedCells.length % 2 === 1) {
            return medianValues[Math.floor(connectedCells.length / 2)];
        }
        else {
            var medianPoint = connectedCells.length / 2;
            var leftMedian = medianValues[medianPoint - 1];
            var rightMedian = medianValues[parseInt(medianPoint.toString(), 10)];
            return ((leftMedian + rightMedian) / 2);
        }
    };
    //Updates the geometry of the vertices
    HierarchicalLayoutUtil.prototype.placementStageExecute = function (plalementChange) {
        var isHorizontal = false;
        if (plalementChange.model.layout.orientation === 'LeftToRight' || plalementChange.model.layout.orientation === 'RightToLeft') {
            isHorizontal = true;
        }
        plalementChange.jettyPositions = {};
        var model = plalementChange.model;
        // eslint-disable-next-line
        isHorizontal ? plalementChange.currentYDelta = 0.0 : plalementChange.currentXDelta = 0.0;
        this.initialCoords(plalementChange, { model: model }, model);
        this.minNode(plalementChange, model);
        var bestOffsetDelta = 100000000.0;
        if (!plalementChange.maxIterations) {
            plalementChange.maxIterations = 8;
        }
        for (var i = 0; i < plalementChange.maxIterations; i++) {
            // if the total offset is less for the current positioning,
            //there are less heavily angled edges and so the current positioning is used
            if ((isHorizontal ? plalementChange.currentYDelta : plalementChange.currentXDelta) < bestOffsetDelta) {
                for (var j = 0; j < model.ranks.length; j++) {
                    var rank = model.ranks[parseInt(j.toString(), 10)];
                    for (var k = 0; k < rank.length; k++) {
                        var cell = rank[parseInt(k.toString(), 10)];
                        this.setXY(cell, j, this.crossReduction.getTempVariable(cell, j), isHorizontal ? true : false);
                    }
                }
                bestOffsetDelta = isHorizontal ? plalementChange.currentYDelta : plalementChange.currentXDelta;
            }
            // eslint-disable-next-line
            isHorizontal ? plalementChange.currentYDelta = 0 : plalementChange.currentXDelta = 0;
        }
        this.setCellLocations(plalementChange, model);
    };
    //sets the cell position in the after the layout operation
    HierarchicalLayoutUtil.prototype.setCellLocations = function (plalementChange, model) {
        var vertices = this.getValues(model.vertexMapper);
        for (var i = 0; i < vertices.length; i++) {
            this.setVertexLocation(plalementChange, vertices[parseInt(i.toString(), 10)]);
        }
    };
    //used to specify the geometrical position of the layout model cell
    HierarchicalLayoutUtil.prototype.garphModelsetVertexLocation = function (plalementChange, cell, x, y) {
        //let model: MultiParentModel = plalementChange.model;
        var geometry = cell.geometry;
        var result = null;
        if (geometry != null) {
            result = { x: x, y: y, width: geometry.width, height: geometry.height };
            if (geometry.x !== x || geometry.y !== y) {
                cell.geometry = result;
            }
        }
        return result;
    };
    //set the position of the specified node
    HierarchicalLayoutUtil.prototype.setVertexLocation = function (plalementChange, cell) {
        var isHorizontal = false;
        if (plalementChange.model.layout.orientation === 'LeftToRight' || plalementChange.model.layout.orientation === 'RightToLeft') {
            isHorizontal = true;
        }
        var realCell = cell.cell;
        var positionX = cell.x[0] - cell.width / 2;
        var positionY = cell.y[0] - cell.height / 2;
        this.garphModelsetVertexLocation(plalementChange, realCell, positionX, positionY);
        if (isHorizontal) {
            if (!plalementChange.marginY) {
                plalementChange.marginY = 0;
            }
            plalementChange.marginY = Math.max(plalementChange.marginY, positionY + cell.height);
        }
        else {
            if (!plalementChange.marginX) {
                plalementChange.marginX = 0;
            }
            plalementChange.marginX = Math.max(plalementChange.marginX, positionX + cell.width);
        }
    };
    /**
     *  get the specific value from the key value pair \
     *
     * @returns {  {}[] }  get the specific value from the key value pair \
     * @param {VertexMapper} mapper - provide the mapper value.
     * @private
     */
    HierarchicalLayoutUtil.prototype.getValues = function (mapper) {
        var list = [];
        if (mapper.map) {
            for (var _i = 0, _a = Object.keys(mapper.map); _i < _a.length; _i++) {
                var key = _a[_i];
                list.push(mapper.map["" + key]);
            }
        }
        return list;
    };
    /**
     *Checks and reduces the crosses in between line segments \
     *
     * @returns { void }    Checks and reduces the crosses in between line segments.\
     * @param {End} model - provide the model value.
     *
     * @private
     */
    HierarchicalLayoutUtil.prototype.crossingStage = function (model) {
        this.crossReduction.execute(model);
    };
    //Initializes the ranks of the vertices
    HierarchicalLayoutUtil.prototype.layeringStage = function (model) {
        this.initialRank(model);
        this.fixRanks(model);
    };
    //determine the initial rank for the each vertex on the relevent direction
    HierarchicalLayoutUtil.prototype.initialRank = function (model) {
        var startNodes = model.startNodes;
        var internalNodes = model.getDictionaryValues(model.vertexMapper);
        var startNodesCopy = startNodes.slice();
        while (startNodes.length > 0) {
            var internalNode = startNodes[0];
            var layerDeterminingEdges = internalNode.connectsAsTarget;
            var edgesToBeMarked = internalNode.connectsAsSource;
            var allEdgesScanned = true;
            var minimumLayer = 100000000;
            for (var i = 0; i < layerDeterminingEdges.length; i++) {
                var internalEdge = layerDeterminingEdges[parseInt(i.toString(), 10)];
                if (internalEdge.temp[0] === 5270620) {
                    // This edge has been scanned, get the layer of the node on the other end
                    var otherNode = internalEdge.source;
                    minimumLayer = Math.min(minimumLayer, otherNode.temp[0] - 1);
                }
                else {
                    allEdgesScanned = false;
                    break;
                }
            }
            // If all edge have been scanned, assign the layer, mark all edges in the other direction and remove from the nodes list
            if (allEdgesScanned) {
                internalNode.temp[0] = minimumLayer;
                if (!model.maxRank) {
                    model.maxRank = 100000000;
                }
                model.maxRank = Math.min(model.maxRank, minimumLayer);
                if (edgesToBeMarked != null) {
                    for (var i = 0; i < edgesToBeMarked.length; i++) {
                        var internalEdge = edgesToBeMarked[parseInt(i.toString(), 10)];
                        internalEdge.temp[0] = 5270620;
                        // Add node on other end of edge to LinkedList of nodes to be analysed
                        var otherNode = internalEdge.target;
                        // Only add node if it hasn't been assigned a layer
                        if (otherNode.temp[0] === -1) {
                            startNodes.push(otherNode);
                            // Mark this other node as neither being unassigned nor assigned
                            //so it isn't added to this list again, but it's layer isn't used in any calculation.
                            otherNode.temp[0] = -2;
                        }
                    }
                }
                startNodes.shift();
            }
            else {
                // Not all the edges have been scanned, get to the back of the class and put the dunces cap on
                var removedCell = startNodes.shift();
                startNodes.push(internalNode);
                if (removedCell === internalNode && startNodes.length === 1) {
                    // This is an error condition, we can't get out of this loop.
                    //It could happen for more than one node but that's a lot harder to detect. Log the error
                    break;
                }
            }
        }
        for (var i = 0; i < internalNodes.length; i++) {
            internalNodes[parseInt(i.toString(), 10)].temp[0] -= model.maxRank;
        }
        for (var i = 0; i < startNodesCopy.length; i++) {
            var internalNode = startNodesCopy[parseInt(i.toString(), 10)];
            var currentMaxLayer = 0;
            var layerDeterminingEdges = internalNode.connectsAsSource;
            for (var j = 0; j < layerDeterminingEdges.length; j++) {
                var internalEdge = layerDeterminingEdges[parseInt(j.toString(), 10)];
                var otherNode = internalEdge.target;
                internalNode.temp[0] = Math.max(currentMaxLayer, otherNode.temp[0] + 1);
                currentMaxLayer = internalNode.temp[0];
            }
        }
        model.maxRank = 100000000 - model.maxRank;
    };
    //used to set the optimum value of each vertex on the layout
    HierarchicalLayoutUtil.prototype.fixRanks = function (model) {
        model.fixRanks();
    };
    //used to determine any cyclic stage have been created on the layout model
    HierarchicalLayoutUtil.prototype.cycleStage = function (model) {
        var seenNodes = {};
        model.startNodes = [];
        var unseenNodesArray = model.getDictionaryValues(model.vertexMapper);
        var unseenNodes = [];
        for (var i = 0; i < unseenNodesArray.length; i++) {
            unseenNodesArray[parseInt(i.toString(), 10)].temp[0] = -1;
            unseenNodes[unseenNodesArray[parseInt(i.toString(), 10)].id] = unseenNodesArray[parseInt(i.toString(), 10)];
        }
        var rootsArray = null;
        if (model.roots != null) {
            var modelRoots = model.roots;
            rootsArray = [];
            for (var i = 0; i < modelRoots.length; i++) {
                rootsArray[parseInt(i.toString(), 10)] = model.getDictionary(model.vertexMapper, modelRoots[parseInt(i.toString(), 10)]);
                if (rootsArray[parseInt(i.toString(), 10)] != null) {
                    model.startNodes.push(rootsArray[parseInt(i.toString(), 10)]);
                }
            }
        }
        model.visit('removeParentConnection', rootsArray, true, null, { seenNodes: seenNodes, unseenNodes: unseenNodes });
        var seenNodesCopy = model.clone(seenNodes, null, true);
        model.visit('removeNodeConnection', unseenNodes, true, seenNodesCopy, { seenNodes: seenNodes, unseenNodes: unseenNodes });
    };
    /**
     * removes the edge from the given collection \
     *
     * @returns {  IEdge }    removes the edge from the given collection .\
     * @param {IEdge} obj - provide the angle value.
     * @param { IEdge[]} array - provide the angle value.
     * @private
     */
    HierarchicalLayoutUtil.prototype.remove = function (obj, array) {
        var index = array.indexOf(obj);
        if (index !== -1) {
            array.splice(index, 1);
        }
        return obj;
    };
    /**
     * Inverts the source and target of an edge \
     *
     * @returns {  void }    Inverts the source and target of an edge .\
     * @param {IEdge} connectingEdge - provide the angle value.
     * @param { number} layer - provide the angle value.
     * @private
     */
    HierarchicalLayoutUtil.prototype.invert = function (connectingEdge, layer) {
        var temp = connectingEdge.source;
        connectingEdge.source = connectingEdge.target;
        connectingEdge.target = temp;
        connectingEdge.isReversed = !connectingEdge.isReversed;
    };
    /**
     * used to get the edges between the given source and target  \
     *
     * @returns {  IConnector[] }    used to get the edges between the given source and target  .\
     * @param {Vertex} source - provide the angle value.
     * @param { Vertex} target - provide the angle value.
     * @param { boolean} directed - provide the angle value.
     * @private
     */
    HierarchicalLayoutUtil.prototype.getEdgesBetween = function (source, target, directed) {
        directed = (directed != null) ? directed : false;
        var edges = this.getEdges(source);
        var result = [];
        for (var i = 0; i < edges.length; i++) {
            var src = this.getVisibleTerminal(edges[parseInt(i.toString(), 10)], true);
            var trg = this.getVisibleTerminal(edges[parseInt(i.toString(), 10)], false);
            if ((src === source && trg === target) || (!directed && src === target && trg === source)) {
                result.push(edges[parseInt(i.toString(), 10)]);
            }
        }
        return result;
    };
    return HierarchicalLayoutUtil;
}());
/**
 * Handles position the objects in a hierarchical tree structure
 */
var MultiParentModel = /** @class */ (function () {
    function MultiParentModel(layout, vertices, roots, dlayout) {
        this.multiObjectIdentityCounter = 0;
        //used to count the no of times the parent have been used
        this.dfsCount = 0;
        this.hierarchicalUtil = new HierarchicalLayoutUtil();
        this.roots = roots;
        this.vertexMapper = { map: {} };
        var internalVertices = [];
        this.layout = dlayout;
        this.maxRank = 100000000;
        this.edgeMapper = { map: {} };
        this.hierarchicalLayout = layout;
        this.createInternalCells(layout, vertices, internalVertices, dlayout);
        for (var i = 0; i < vertices.length; i++) {
            var edges = internalVertices[parseInt(i.toString(), 10)].connectsAsSource;
            for (var j = 0; j < edges.length; j++) {
                var internalEdge = edges[parseInt(j.toString(), 10)];
                var realEdges = internalEdge.edges;
                if (realEdges != null && realEdges.length > 0) {
                    var realEdge = realEdges[0];
                    var targetCell = layout.getVisibleTerminal(realEdge, false);
                    var internalTargetCell = this.getDictionary(this.vertexMapper, targetCell);
                    if (internalVertices[parseInt(i.toString(), 10)] === internalTargetCell) {
                        targetCell = layout.getVisibleTerminal(realEdge, true);
                        internalTargetCell = this.getDictionary(this.vertexMapper, targetCell);
                    }
                    if (internalTargetCell != null && internalVertices[parseInt(i.toString(), 10)] !== internalTargetCell) {
                        internalEdge.target = internalTargetCell;
                        if (internalTargetCell.connectsAsTarget.length === 0) {
                            internalTargetCell.connectsAsTarget = [];
                        }
                        if (internalTargetCell.connectsAsTarget.indexOf(internalEdge) < 0) {
                            internalTargetCell.connectsAsTarget.push(internalEdge);
                        }
                    }
                }
            }
            internalVertices[parseInt(i.toString(), 10)].temp[0] = 1;
        }
    }
    /* tslint:disable */
    MultiParentModel.prototype.resetEdge = function (edge) {
        var geometry = { x: 0, y: 0, width: 0, height: 0, relative: true };
        var geo = geometry;
        edge['geometry'] = geo;
        return edge;
    };
    // eslint-disable-next-line max-len
    MultiParentModel.prototype.createInternalCells = function (layout, vertices, internalVertices, dlayout) {
        for (var i = 0; i < vertices.length; i++) {
            internalVertices[parseInt(i.toString(), 10)] = {
                x: [], y: [], temp: [], cell: vertices[parseInt(i.toString(), 10)],
                id: vertices[parseInt(i.toString(), 10)].name, connectsAsTarget: [], connectsAsSource: [], type: 'internalVertex'
            };
            this.setDictionary(this.vertexMapper, vertices[parseInt(i.toString(), 10)], internalVertices[parseInt(i.toString(), 10)]);
            var conns = layout.getEdges(vertices[parseInt(i.toString(), 10)]);
            internalVertices[parseInt(i.toString(), 10)].connectsAsSource = [];
            for (var j = 0; j < conns.length; j++) {
                var cell = layout.getVisibleTerminal(conns[parseInt(j.toString(), 10)], false);
                if (cell !== vertices[parseInt(i.toString(), 10)]) {
                    var undirectedEdges = layout.getEdgesBetween(vertices[parseInt(i.toString(), 10)], cell, false);
                    var directedEdges = layout.getEdgesBetween(vertices[parseInt(i.toString(), 10)], cell, true);
                    if (undirectedEdges != null && undirectedEdges.length > 0 && directedEdges.length * 2 >= undirectedEdges.length) {
                        var internalEdge = { x: [], y: [], temp: [], edges: undirectedEdges, ids: [] };
                        if (dlayout.enableLayoutRouting) {
                            for (var k = 0; k < undirectedEdges.length; k++) {
                                var edge = undirectedEdges[parseInt(k.toString(), 10)];
                                this.setDictionary(this.edgeMapper, undefined, internalEdge, edge.id);
                                // Resets all point on the edge and disables the edge style
                                // without deleting it from the cell style
                                this.resetEdge(edge);
                            }
                        }
                        internalEdge.source = internalVertices[parseInt(i.toString(), 10)];
                        for (var m = 0; m < undirectedEdges.length; m++) {
                            internalEdge.ids.push(undirectedEdges[parseInt(m.toString(), 10)].id);
                        }
                        internalEdge.source = internalVertices[parseInt(i.toString(), 10)];
                        if (!internalVertices[parseInt(i.toString(), 10)].connectsAsSource) {
                            internalVertices[parseInt(i.toString(), 10)].connectsAsSource = [];
                        }
                        if (internalVertices[parseInt(i.toString(), 10)].connectsAsSource.indexOf(internalEdge) < 0) {
                            internalVertices[parseInt(i.toString(), 10)].connectsAsSource.push(internalEdge);
                        }
                    }
                }
            }
            internalVertices[parseInt(i.toString(), 10)].temp[0] = 0;
        }
    };
    /* tslint:enable */
    /**
     * used to set the optimum value of each vertex on the layout \
     *
     * @returns {  void }   used to set the optimum value of each vertex on the layout .\
     * @private
     */
    MultiParentModel.prototype.fixRanks = function () {
        var rankList = [];
        this.ranks = [];
        for (var i = 0; i < this.maxRank + 1; i++) {
            rankList[parseInt(i.toString(), 10)] = [];
            this.ranks[parseInt(i.toString(), 10)] = rankList[parseInt(i.toString(), 10)];
        }
        var rootsArray = null;
        if (this.roots != null) {
            var oldRootsArray = this.roots;
            rootsArray = [];
            for (var i = 0; i < oldRootsArray.length; i++) {
                var cell = oldRootsArray[parseInt(i.toString(), 10)];
                var internalNode = this.getDictionary(this.vertexMapper, cell);
                rootsArray[parseInt(i.toString(), 10)] = internalNode;
            }
        }
        this.visit('updateMinMaxRank', rootsArray, false, null, { seenNodes: null, unseenNodes: null, rankList: rankList });
    };
    //Updates the min/max rank of the layer
    MultiParentModel.prototype.updateMinMaxRank = function (layer, seen, data) {
        //let seenNodes: {} = data.seenNodes;
        //let unseenNodes: {} = data.unseenNodes;
        var parent = data.parent;
        var node = data.root;
        var edge = data.edge;
        var rankList = data.rankList;
        if (!node.maxRank && node.maxRank !== 0) {
            node.maxRank = -1;
        }
        if (!node.minRank && node.minRank !== 0) {
            node.minRank = -1;
        }
        if (seen === 0 && node.maxRank < 0 && node.minRank < 0) {
            rankList[node.temp[0]].push(node);
            node.maxRank = node.temp[0];
            node.minRank = node.temp[0];
            node.temp[0] = rankList[node.maxRank].length - 1;
        }
        if (parent != null && edge != null) {
            var parentToCellRankDifference = parent.maxRank - node.maxRank;
            if (parentToCellRankDifference > 1) {
                edge.maxRank = parent.maxRank;
                edge.minRank = node.maxRank;
                edge.temp = [];
                edge.x = [];
                edge.y = [];
                for (var i = edge.minRank + 1; i < edge.maxRank; i++) {
                    rankList[parseInt(i.toString(), 10)].push(edge);
                    this.hierarchicalUtil.setTempVariable(edge, i, rankList[parseInt(i.toString(), 10)].length - 1);
                }
            }
        }
    };
    //used to store the value of th given key on the object
    MultiParentModel.prototype.setDictionary = function (dic, key, value, edgeId) {
        if (!edgeId) {
            var id = key.name;
            var previous = dic.map["" + id];
            dic.map["" + id] = value;
            return previous;
        }
        else {
            var previous = dic.map["" + edgeId];
            dic.map["" + edgeId] = value;
            return previous;
        }
    };
    /**
     * used to store the value of th given key on the objectt \
     *
     * @returns {  IVertex }   used to store the value of th given key on the object .\
     * @param {VertexMapper} dic - provide the angle value.
     * @param {IVertex} key - provide the angle value.
     * @param {WeightedCellSorter} value - provide the angle value.
     * @param {boolean} flag - provide the angle value.
     * @private
     */
    MultiParentModel.prototype.setDictionaryForSorter = function (dic, key, value, flag) {
        var id = key.id;
        if (!id) {
            //id = this._getDictionaryForSorter(dic, key);
        }
        var previous = dic.map["" + id];
        dic.map["" + id] = value;
        return previous;
    };
    /**
     * used to get the value of the given key \
     *
     * @returns {  IVertex }  used to get the value of the given key .\
     * @param {VertexMapper} dic - provide the angle value.
     * @param {IVertex} key - provide the angle value.
     * @private
     */
    MultiParentModel.prototype.getDictionary = function (dic, key) {
        if (!this.multiObjectIdentityCounter && this.multiObjectIdentityCounter !== 0) {
            this.multiObjectIdentityCounter = 0;
        }
        var id = key.name;
        if (!id) {
            if (!key.layoutObjectId) { ///####
                key.layoutObjectId = 'graphHierarchyNode#' + this.multiObjectIdentityCounter++;
                return key.layoutObjectId;
            }
            else {
                return dic.map[key.layoutObjectId];
            }
        }
        return dic.map["" + id];
    };
    /**
     * used to get the value of the given key \
     *
     * @returns {  IVertex }  used to get the value of the given key .\
     * @param {VertexMapper} dic - provide the angle value.
     * @param {IVertex} key - provide the angle value.
     * @private
     */
    MultiParentModel.prototype.getDictionaryForSorter = function (dic, key) {
        if (!this.multiObjectIdentityCounter && this.multiObjectIdentityCounter !== 0) {
            this.multiObjectIdentityCounter = 0;
        }
        var id = key.id;
        if (!id) {
            if (!key.layoutObjectId) { ///####
                key.layoutObjectId = 'graphHierarchyNode#' + this.multiObjectIdentityCounter++;
                return key.layoutObjectId;
            }
            else {
                return dic.map[key.layoutObjectId];
            }
        }
        return dic.map["" + id];
    };
    /**
     * used to get all the values of the dictionary object \
     *
     * @returns {  IVertex[] }  used to get all the values of the dictionary object .\
     * @param {VertexMapper} dic - provide the angle value.
     * @private
     */
    MultiParentModel.prototype.getDictionaryValues = function (dic) {
        var result = [];
        for (var _i = 0, _a = Object.keys(dic.map); _i < _a.length; _i++) {
            var key = _a[_i];
            result.push(dic.map["" + key]);
        }
        return result;
    };
    /**
     * used to visit all the entries on the given dictionary with given function \
     *
     * @returns { void }  used to visit all the entries on the given dictionary with given function .\
     * @param {string} visitor - provide the visitor value.
     * @param {IVertex[]} dfsRoots - provide the dfsRoots value.
     * @param {boolean} trackAncestors - provide the trackAncestors value.
     * @param {{}} seenNodes - provide the seenNodes value.
     * @param {TraverseData} data - provide the data value.
     * @private
     */
    MultiParentModel.prototype.visit = function (visitor, dfsRoots, trackAncestors, seenNodes, data) {
        //let seenNodes1: {} = data.seenNodes;
        //let unseenNodes1: {} = data.unseenNodes;
        //let rankList: IVertex[][] = data.rankList;
        // Run depth first search through on all roots
        if (dfsRoots != null) {
            for (var i = 0; i < dfsRoots.length; i++) {
                var internalNode = dfsRoots[parseInt(i.toString(), 10)];
                if (internalNode != null) {
                    if (seenNodes == null) {
                        seenNodes = new Object();
                    }
                    data.parent = null;
                    data.root = internalNode;
                    data.edge = null;
                    if (trackAncestors) {
                        // Set up hash code for root
                        internalNode.hashCode = [];
                        internalNode.hashCode[0] = this.dfsCount;
                        internalNode.hashCode[1] = i;
                        this.extendedDfs(visitor, seenNodes, i, 0, data);
                    }
                    else {
                        this.depthFirstSearch(visitor, seenNodes, 0, data);
                    }
                }
            }
            this.dfsCount++;
        }
    };
    //used to perform the depth fisrt search on the layout model
    MultiParentModel.prototype.depthFirstSearch = function (visitor, seen, layer, data) {
        //let seenNodes1: {} = data.seenNodes;
        //let unseenNodes1: {} = data.unseenNodes;
        //let rankList: IVertex[][] = data.rankList;
        //let parent: IVertex = data.parent;
        var root = data.root;
        //let edge: IEdge = data.edge;
        if (root != null) {
            var rootId = root.id;
            if (seen["" + rootId] == null) {
                seen["" + rootId] = root;
                this.updateConnectionRank(visitor, layer, 0, data);
                // Copy the connects as source list so that visitors can change the original for edge direction inversions
                var outgoingEdges = root.connectsAsSource.slice();
                for (var i = 0; i < outgoingEdges.length; i++) {
                    var internalEdge = outgoingEdges[parseInt(i.toString(), 10)];
                    var targetNode = internalEdge.target;
                    // Root check is O(|roots|)
                    data.parent = root;
                    data.root = targetNode;
                    data.edge = internalEdge;
                    this.depthFirstSearch(visitor, seen, layer + 1, data);
                }
            }
            else {
                this.updateConnectionRank(visitor, layer, 1, data);
            }
        }
    };
    //Updates the rank of the connection
    MultiParentModel.prototype.updateConnectionRank = function (visitor, layer, seen, traversedList) {
        var parent = traversedList.parent;
        var root = traversedList.root;
        var edge = traversedList.edge;
        if (visitor === 'removeParentConnection' || visitor === 'removeNodeConnection') {
            var remove = visitor === 'removeNodeConnection';
            this.removeConnectionEdge(parent, root, edge, layer, traversedList, remove);
        }
        if (visitor === 'updateMinMaxRank') {
            this.updateMinMaxRank(layer, seen, traversedList);
        }
    };
    //Removes the edge from the collection
    MultiParentModel.prototype.removeConnectionEdge = function (parent, node, edge, layer, data, remove) {
        var seenNodes = data.seenNodes;
        var unseenNodes = data.unseenNodes;
        //let rankList: IVertex[][] = data.rankList;
        if (this.hierarchicalUtil.isAncestor(node, parent)) {
            this.hierarchicalUtil.invert(edge, 0);
            this.hierarchicalUtil.remove(edge, parent.connectsAsSource);
            if (remove) {
                node.connectsAsSource.push(edge);
                parent.connectsAsTarget.push(edge);
                this.hierarchicalUtil.remove(edge, node.connectsAsTarget);
            }
            else {
                parent.connectsAsTarget.push(edge);
                this.hierarchicalUtil.remove(edge, node.connectsAsTarget);
                node.connectsAsSource.push(edge);
            }
        }
        seenNodes[node.id] = node;
        delete unseenNodes[node.id];
    };
    //the dfs extends the default version by keeping track of cells ancestors, but it should be only used when necessary
    MultiParentModel.prototype.extendedDfs = function (visitor, seen, cHash, layer, data) {
        //let seenNodes: {} = data.seenNodes;
        //let unseenNodes: {} = data.unseenNodes;
        //let rankList: IVertex[][] = data.rankList;
        var parent = data.parent;
        var root = data.root;
        var edge = data.edge;
        if (root != null) {
            if (parent != null) {
                if (root.hashCode == null ||
                    root.hashCode[0] !== parent.hashCode[0]) {
                    var hashCodeLength = parent.hashCode.length + 1;
                    root.hashCode = parent.hashCode.slice();
                    root.hashCode[hashCodeLength - 1] = cHash;
                }
            }
            var rootId = root.id;
            if (seen["" + rootId] == null) {
                seen["" + rootId] = root;
                this.updateConnectionRank(visitor, layer, 0, data);
                var outgoingEdges = root.connectsAsSource.slice();
                for (var i = 0; i < outgoingEdges.length; i++) {
                    var internalEdge = outgoingEdges[parseInt(i.toString(), 10)];
                    var targetNode = internalEdge.target;
                    data.parent = root;
                    data.root = targetNode;
                    data.edge = internalEdge;
                    this.extendedDfs(visitor, seen, i, layer + 1, data);
                }
            }
            else {
                this.updateConnectionRank(visitor, layer, 1, data);
            }
        }
    };
    /**
     * used to clone the specified object ignoring all fieldnames in the given array of transient fields \
     *
     * @returns { void }    used to clone the specified object ignoring all fieldnames in the given array of transient fields .\
     * @param {Object} obj - provide the source value.
     * @param {string[]} transients - provide the target value.
     * @param {boolean} shallow - provide the shallow value.
     *
     * @private
     */
    MultiParentModel.prototype.clone = function (obj, transients, shallow) {
        shallow = (shallow != null) ? shallow : false;
        if (obj != null && typeof (obj.constructor) === 'function') {
            var clonedObj = obj.constructor();
            for (var _i = 0, _a = Object.keys(obj); _i < _a.length; _i++) {
                var i = _a[_i];
                if (i !== 'layoutObjectId' && (transients == null || transients.indexOf(i) < 0)) {
                    if (!shallow && typeof (obj["" + i]) === 'object') {
                        //not used
                        //  _clone[i] = $.extend(true, {}, obj[i]);
                    }
                    else {
                        clonedObj["" + i] = obj["" + i];
                    }
                }
            }
            return clonedObj;
        }
        return null;
    };
    return MultiParentModel;
}());
/**
 * Defines how to reduce the crosses in between the line segments
 */
var CrossReduction = /** @class */ (function () {
    function CrossReduction() {
    }
    /**
     *  used to calculate the number of edges crossing the layout model \
     *
     * @returns { number }  used to calculate the number of edges crossing the layout model\
     * @param {MultiParentModel} model - provide the model value.
     *
     * @private
     */
    CrossReduction.prototype.calculateCrossings = function (model) {
        var numRanks = model.ranks.length;
        var totalCrossings = 0;
        for (var i = 1; i < numRanks; i++) {
            totalCrossings += this.calculateRankCrossing(i, model);
        }
        return totalCrossings;
    };
    /**
     *  used to get the temp value specified for the node or connector. \
     *
     * @returns { boolean }  used to get the temp value specified for the node or connector.\
     * @param {IVertex} node - provide the node value.
     * @param {IVertex} layer - provide the layer value.
     *
     * @private
     */
    CrossReduction.prototype.getTempVariable = function (node, layer) {
        if (node) {
            if (this.isVertex(node)) {
                return node.temp[0];
            }
            else {
                return node.temp[layer - node.minRank - 1];
            }
        }
        return 0;
    };
    //used to specify the number of conenctors crossing between the specified rank and its below rank
    CrossReduction.prototype.calculateRankCrossing = function (i, model) {
        var totalCrossings = 0;
        var rank = model.ranks[parseInt(i.toString(), 10)];
        var previousRank = model.ranks[i - 1];
        var tmpIndices = [];
        // Iterate over the top rank and fill in the connection information
        for (var j = 0; j < rank.length; j++) {
            var node = rank[parseInt(j.toString(), 10)];
            var rankPosition = this.getTempVariable(node, i);
            var connectedCells = this.getConnectedCellsOnLayer(node, i, true);
            ///####
            var nodeIndices = [];
            for (var k = 0; k < connectedCells.length; k++) {
                var connectedNode = connectedCells[parseInt(k.toString(), 10)];
                var otherCellRankPosition = this.getTempVariable(connectedNode, i - 1);
                nodeIndices.push(otherCellRankPosition);
            }
            nodeIndices.sort(function (x, y) { return x - y; });
            tmpIndices[parseInt(rankPosition.toString(), 10)] = nodeIndices;
        }
        var indices = [];
        for (var j = 0; j < tmpIndices.length; j++) {
            indices = indices.concat(tmpIndices[parseInt(j.toString(), 10)]);
        }
        var firstIndex = 1;
        while (firstIndex < previousRank.length) {
            firstIndex <<= 1;
        }
        var treeSize = 2 * firstIndex - 1;
        firstIndex -= 1;
        var tree = [];
        for (var j = 0; j < treeSize; ++j) {
            tree[parseInt(j.toString(), 10)] = 0;
        }
        for (var j = 0; j < indices.length; j++) {
            var index = indices[parseInt(j.toString(), 10)];
            var treeIndex = index + firstIndex;
            ++tree[parseInt(treeIndex.toString(), 10)];
            while (treeIndex > 0) {
                if (treeIndex % 2) {
                    totalCrossings += tree[treeIndex + 1];
                }
                treeIndex = (treeIndex - 1) >> 1;
                ++tree[parseInt(treeIndex.toString(), 10)];
            }
        }
        return totalCrossings;
    };
    /**
     * Calculates and reduces the crosses between line segments
     *
     * @returns { void }Calculates and reduces the crosses between line segments.\
     * @param {MultiParentModel} model - provide the target value.
     * @private
     */
    CrossReduction.prototype.execute = function (model) {
        // Stores initial ordering
        this.nestedBestRanks = [];
        for (var i = 0; i < model.ranks.length; i++) {
            this.nestedBestRanks[parseInt(i.toString(), 10)] = model.ranks[parseInt(i.toString(), 10)].slice();
        }
        var iterationsWithoutImprovement = 0;
        var currentBestCrossings = this.calculateCrossings(model);
        for (var i = 0; i < 24 && iterationsWithoutImprovement < 2; i++) {
            this.weightedMedian(i, model);
            var candidateCrossings = this.calculateCrossings(model);
            if (candidateCrossings < currentBestCrossings) {
                currentBestCrossings = candidateCrossings;
                iterationsWithoutImprovement = 0;
                for (var j = 0; j < this.nestedBestRanks.length; j++) {
                    var rank = model.ranks[parseInt(j.toString(), 10)];
                    for (var k = 0; k < rank.length; k++) {
                        var cell = rank[parseInt(k.toString(), 10)];
                        var obj = this.nestedBestRanks[parseInt(j.toString(), 10)][cell.temp[0]];
                        var check = true;
                        if (cell.edges && obj && !obj.edges) {
                            check = false;
                        }
                        if (obj && check) {
                            this.nestedBestRanks[parseInt(j.toString(), 10)][cell.temp[0]] = cell;
                        }
                    }
                }
            }
            else {
                // Increase count of iterations
                iterationsWithoutImprovement++;
                // Restore the best values to the cells
                for (var j = 0; j < this.nestedBestRanks.length; j++) {
                    var rank = model.ranks[parseInt(j.toString(), 10)];
                    for (var k = 0; k < rank.length; k++) {
                        var cell = rank[parseInt(k.toString(), 10)];
                        this.setTempVariable(cell, j, k);
                    }
                }
            }
            if (currentBestCrossings === 0) {
                break;
            }
        }
        // Store the best rankings but in the model
        var ranks = [];
        var rankList = [];
        for (var i = 0; i < model.maxRank + 1; i++) {
            rankList[parseInt(i.toString(), 10)] = [];
            ranks[parseInt(i.toString(), 10)] = rankList[parseInt(i.toString(), 10)];
        }
        for (var i = 0; i < this.nestedBestRanks.length; i++) {
            for (var j = 0; j < this.nestedBestRanks[parseInt(i.toString(), 10)].length; j++) {
                rankList[parseInt(i.toString(), 10)].push(this.nestedBestRanks[parseInt(i.toString(), 10)][parseInt(j.toString(), 10)]);
            }
        }
        model.ranks = ranks;
    };
    /**
     *  check whether the object is vertext or edge on the layout model. \
     *
     * @returns { boolean }  check whether the object is vertext or edge on the layout model..\
     * @param {IVertex} node - provide the iteration value.
     *
     * @private
     */
    CrossReduction.prototype.isVertex = function (node) {
        if (node && node.cell && ((node.cell.inEdges && node.cell.inEdges.length) || (node.cell.outEdges && node.cell.outEdges.length))) {
            return true;
        }
        return false;
    };
    /**
     *  used to move up or move down the node position on the adjacent ranks \
     *
     * @returns { void }  used to move up or move down the node position on the adjacent ranks.\
     * @param {number} iteration - provide the iteration value.
     * @param {MultiParentModel} model - provide the model value.
     *
     * @private
     */
    CrossReduction.prototype.weightedMedian = function (iteration, model) {
        // Reverse sweep direction each time through this method
        var downwardSweep = (iteration % 2 === 0);
        if (downwardSweep) {
            for (var j = model.maxRank - 1; j >= 0; j--) {
                this.medianRank(j, downwardSweep);
            }
        }
        else {
            for (var j = 1; j < model.maxRank; j++) {
                this.medianRank(j, downwardSweep);
            }
        }
    };
    /**
     * used to get the node next(up) connected to the specified node or connector \
     *
     * @returns { void } calculates the rank elements on the specified rank.\
     * @param {IVertex} cell - provide the cell value.
     * @param {number} layer - provide the layer value.
     * @param {boolean} isPrevious - provide the isPrevious value.
     *
     * @private
     */
    CrossReduction.prototype.getConnectedCellsOnLayer = function (cell, layer, isPrevious) {
        if (isPrevious === void 0) { isPrevious = false; }
        var connectedlayer = 'nextLayerConnectedCells';
        var connectedAs = 'connectsAsTarget';
        if (isPrevious) {
            connectedlayer = 'previousLayerConnectedCells';
            connectedAs = 'connectsAsSource';
        }
        if (cell) {
            if (this.isVertex(cell)) {
                if (cell["" + connectedlayer] == null) {
                    cell["" + connectedlayer] = [];
                    cell["" + connectedlayer][0] = [];
                    for (var i = 0; i < cell["" + connectedAs].length; i++) {
                        var edge = cell["" + connectedAs][parseInt(i.toString(), 10)];
                        if (edge.maxRank === undefined) {
                            edge.maxRank = -1;
                        }
                        if (edge.maxRank === -1 || (isPrevious ? (edge.minRank === layer - 1) : (edge.maxRank === layer + 1))) {
                            // Either edge is not in any rank or no dummy nodes in edge, add node of other side of edge
                            cell["" + connectedlayer][0].push(isPrevious ? edge.target : edge.source);
                        }
                        else {
                            // Edge spans at least two layers, add edge
                            cell["" + connectedlayer][0].push(edge);
                        }
                    }
                }
                return cell["" + connectedlayer][0];
            }
            else {
                if (cell["" + connectedlayer] == null) {
                    cell["" + connectedlayer] = [];
                    for (var i = 0; i < cell.temp.length; i++) {
                        cell["" + connectedlayer][parseInt(i.toString(), 10)] = [];
                        if (i === (isPrevious ? 0 : (cell.temp.length - 1))) {
                            cell["" + connectedlayer][parseInt(i.toString(), 10)].push(isPrevious ? cell.target : cell.source);
                        }
                        else {
                            cell["" + connectedlayer][parseInt(i.toString(), 10)].push(cell);
                        }
                    }
                }
                return cell["" + connectedlayer][layer - cell.minRank - 1];
            }
        }
        return null;
    };
    /**
     * calculates the rank elements on the specified rank \
     *
     * @returns { void } calculates the rank elements on the specified rank.\
     * @param {IVertex[]} connectedCells - provide the cell value.
     * @param {number} rankValue - provide the layer value.
     *
     * @private
     */
    CrossReduction.prototype.medianValue = function (connectedCells, rankValue) {
        var medianValues = [];
        var arrayCount = 0;
        for (var i = 0; i < connectedCells.length; i++) {
            var cell = connectedCells[parseInt(i.toString(), 10)];
            medianValues[arrayCount++] = this.getTempVariable(cell, rankValue);
        }
        // sorts numerical order sort
        medianValues.sort(function (a, b) { return a - b; });
        if (arrayCount % 2 === 1) {
            // For odd numbers of adjacent vertices return the median
            return medianValues[Math.floor(arrayCount / 2)];
        }
        else if (arrayCount === 2) {
            return ((medianValues[0] + medianValues[1]) / 2.0);
        }
        else {
            var medianPoint = arrayCount / 2;
            var leftMedian = medianValues[medianPoint - 1] - medianValues[0];
            var rightMedian = medianValues[arrayCount - 1]
                - medianValues[parseInt(medianPoint.toString(), 10)];
            return (medianValues[medianPoint - 1] * rightMedian + medianValues[parseInt(medianPoint.toString(), 10)] * leftMedian)
                / (leftMedian + rightMedian);
        }
    };
    /**
     * get the temp value of the specified layer \
     *
     * @returns { void }     getDirection method .\
     * @param {IVertex} cell - provide the cell value.
     * @param {layer} layer - provide the layer value.
     * @param {LayoutOrientation} value - provide the value value.
     *
     * @private
     */
    CrossReduction.prototype.setTempVariable = function (cell, layer, value) {
        if (cell) {
            cell.temp[0] = value;
        }
    };
    /**
     * used to minimize the node position on this rank and one of its adjacent ranks
     */
    CrossReduction.prototype.medianRank = function (rankValue, downwardSweep) {
        var numCellsForRank = this.nestedBestRanks[parseInt(rankValue.toString(), 10)].length;
        var medianValues = [];
        var reservedPositions = [];
        for (var i = 0; i < numCellsForRank; i++) {
            var cell = this.nestedBestRanks[parseInt(rankValue.toString(), 10)][parseInt(i.toString(), 10)];
            var sorterEntry = { medianValue: 0 };
            sorterEntry.cell = cell;
            // Flip whether or not equal medians are flipped on up and down sweeps
            //TODO re-implement some kind of nudge medianValues[i].nudge = !downwardSweep;
            var nextLevelConnectedCells = void 0;
            if (downwardSweep) {
                nextLevelConnectedCells = this.getConnectedCellsOnLayer(cell, rankValue);
            }
            else {
                nextLevelConnectedCells = this.getConnectedCellsOnLayer(cell, rankValue, true);
            }
            var nextRankValue = void 0;
            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            downwardSweep ? nextRankValue = rankValue + 1 : nextRankValue = rankValue - 1;
            if (nextLevelConnectedCells != null && nextLevelConnectedCells.length !== 0) {
                sorterEntry.medianValue = this.medianValue(nextLevelConnectedCells, nextRankValue);
                medianValues.push(sorterEntry);
            }
            else {
                // Nodes with no adjacent vertices are flagged in the reserved array to
                //indicate they should be left in their current position.
                reservedPositions[this.getTempVariable(cell, rankValue)] = true;
            }
        }
        medianValues.sort(this.compare);
        // Set the new position of each node within the rank using its temp variable
        for (var i = 0; i < numCellsForRank; i++) {
            if (reservedPositions[parseInt(i.toString(), 10)] == null && medianValues.length > 0) {
                var cell = medianValues.shift().cell;
                this.setTempVariable(cell, rankValue, i);
            }
        }
    };
    //compares two values, it sends the values to the compare function,
    //and sorts the values according to the returned (negative, zero, positive) value
    CrossReduction.prototype.compare = function (a, b) {
        if (a != null && b != null) {
            if (b.medianValue > a.medianValue) {
                return -1;
            }
            else if (b.medianValue < a.medianValue) {
                return 1;
            }
        }
        return 0;
    };
    return CrossReduction;
}());
var MatrixModel = /** @class */ (function () {
    function MatrixModel() {
        this.edgeMapper = [];
    }
    /* tslint:disable */
    /** @private */
    /**
     * Arrange the elements
     *
     * @returns { void }  arrange the elements.\
     * @param {MatrixModelObject} matrixModel - provide the Matrix Model Object.
     * @param {Layout} layout - provide the layout value.
     *
     * @private
     */
    MatrixModel.prototype.arrangeElements = function (matrixModel, layout) {
        var layoutSettings = matrixModel.model.layout;
        var isHorizontal;
        if (layout.orientation === 'LeftToRight' || layout.orientation === 'RightToLeft') {
            isHorizontal = true;
        }
        else {
            isHorizontal = false;
        }
        var spacing = isHorizontal ? layoutSettings.verticalSpacing : layoutSettings.horizontalSpacing;
        //let spacingInverse: number = !isHorizontal ? layoutSettings.verticalSpacing : layoutSettings.horizontalSpacing;
        // Need to group element before
        this.groupLayoutCells(matrixModel);
        this.createMatrixCells(matrixModel);
        for (var j = 0; j < matrixModel.matrix.length; j++) {
            var matrixKey = matrixModel.matrix[parseInt(j.toString(), 10)].key;
            var matrixrow = matrixModel.matrix[parseInt(matrixKey.toString(), 10)].value;
            for (var i = 1; i < matrixrow.length; i++) {
                var cell = matrixrow[parseInt(i.toString(), 10)];
                var prevCell = matrixrow[i - 1];
                cell.offset += prevCell.offset + (prevCell.size / 2) + spacing + (cell.size / 2);
            }
        }
        // Sort roots based on their indices
        matrixModel.roots.sort(function (a, b) {
            if (a.cells[0] && b.cells[0]) {
                var indexA = matrixModel.model.roots.indexOf(a.cells[0].cell);
                var indexB = matrixModel.model.roots.indexOf(b.cells[0].cell);
                return indexA - indexB;
            }
            return 0;
        });
        for (var j = 0; j < matrixModel.roots.length; j++) {
            var root = matrixModel.roots[parseInt(j.toString(), 10)];
            this.arrangeMatrix(root, null, matrixModel);
        }
        for (var k = 0; k < matrixModel.matrix.length; k++) {
            var row = matrixModel.matrix[parseInt(k.toString(), 10)].value;
            for (var i = 0; i < row.length; i++) {
                var cell = row[parseInt(i.toString(), 10)];
                if (cell.visitedParents.length > 1) {
                    var firstParent = cell.visitedParents[0];
                    var lastParent = cell.visitedParents[cell.visitedParents.length - 1];
                    var firstVertexParent = this.findParentVertexCellGroup(firstParent);
                    var lastVertexParent = this.findParentVertexCellGroup(lastParent);
                    if (firstParent !== firstVertexParent && firstVertexParent.offset < firstParent.offset) {
                        firstParent = firstVertexParent;
                    }
                    if (lastParent !== lastVertexParent && lastVertexParent.offset > lastParent.offset) {
                        lastParent = firstVertexParent;
                    }
                    var newoffset = (lastParent.offset + lastParent.size * 0.5 + firstParent.offset - firstParent.size * 0.5) / 2;
                    var availOffsetMin = cell.initialOffset;
                    var availOffsetMax = cell.offset;
                    if (!(availOffsetMax === availOffsetMin)) {
                        if (newoffset >= availOffsetMin && newoffset <= availOffsetMax) {
                            this.translateMatrixCells(newoffset - cell.offset, cell);
                        }
                        else if (newoffset < availOffsetMin) {
                            this.translateMatrixCells(availOffsetMin - cell.offset, cell);
                        }
                    }
                }
            }
        }
        this.setXYforMatrixCell(matrixModel);
    };
    /* tslint:enable */
    MatrixModel.prototype.groupLayoutCells = function (matrixModel) {
        var ranks = matrixModel.model.ranks;
        for (var j = ranks.length - 1; j >= 0; j--) {
            var vertices = [];
            for (var v = 0; v < ranks[parseInt(j.toString(), 10)].length; v++) {
                var rank = ranks[parseInt(j.toString(), 10)][parseInt(v.toString(), 10)];
                var type = this.getType(rank.type);
                if (type === 'internalVertex') {
                    vertices.push(ranks[parseInt(j.toString(), 10)][parseInt(v.toString(), 10)]);
                }
            }
            var edges = [];
            for (var e = 0; e < ranks[parseInt(j.toString(), 10)].length; e++) {
                var rank = ranks[parseInt(j.toString(), 10)][parseInt(e.toString(), 10)];
                var type = this.getType(rank.type);
                if (type === 'internalEdge') {
                    edges.push(rank);
                }
            }
            while (vertices.length > 1) {
                var vertex1 = vertices[0];
                var parentset1 = this.selectIds(vertex1.connectsAsTarget, true);
                var childset1 = this.selectIds(vertex1.connectsAsSource, false);
                while (vertices.length > 1) {
                    var vertex2 = vertices[1];
                    var parentset2 = this.selectIds(vertex2.connectsAsTarget, true);
                    var childset2 = this.selectIds(vertex2.connectsAsSource, false);
                    var parentequals = this.compareLists(parentset1, parentset2);
                    var childequals = this.compareLists(childset1, childset2);
                    if (parentequals && childequals) {
                        this.updateMutualSharing(vertices[0], vertex2.id);
                        this.updateMutualSharing(vertices[1], vertex1.id);
                        vertices.splice(1, 1);
                        continue;
                    }
                    break;
                }
                vertices.splice(0, 1);
            }
            while (edges.length > 1) {
                var internalEdge = edges[0];
                var parentset = internalEdge.source;
                var childset = internalEdge.target;
                if (parentset.identicalSibiling != null) {
                    var groupedges = [];
                    for (var i = 0; i < edges.length; i++) {
                        var edge = edges[parseInt(i.toString(), 10)];
                        if (edge.target === childset) {
                            groupedges.push(edge);
                        }
                    }
                    for (var i = 0; i < groupedges.length; i++) {
                        var internalEdgese = groupedges[parseInt(i.toString(), 10)];
                        if (this.containsValue(parentset.identicalSibiling, internalEdgese.source.id)) {
                            internalEdgese.source.identicalSibiling = null;
                        }
                    }
                    internalEdge.source.identicalSibiling = null;
                }
                edges.splice(0, 1);
            }
        }
    };
    /* tslint:disable */
    MatrixModel.prototype.createMatrixCells = function (matrixModel) {
        var layoutSettings = matrixModel.model.layout;
        var isHorizontal = layoutSettings.orientation === 'LeftToRight'
            || layoutSettings.orientation === 'RightToLeft';
        var spacing = isHorizontal ? layoutSettings.verticalSpacing : layoutSettings.horizontalSpacing;
        var spacingInverse = !isHorizontal ? layoutSettings.verticalSpacing : layoutSettings.horizontalSpacing;
        var ranks = matrixModel.model.ranks;
        var matrixCellMapper = [];
        var rowoffset = -spacingInverse;
        for (var j = ranks.length - 1; j >= 0; j--) {
            var maxDimension = 0.0;
            var index = (ranks.length - 1) - j;
            var rank = ranks[parseInt(j.toString(), 10)].slice(); //.ToList();
            // Creating new row and adding it to matrix
            var matrixRow = [];
            matrixModel.matrix.push({ key: index, value: matrixRow });
            // Creating new row mapper
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            var tempMatrixRow = [];
            matrixCellMapper.push({ index: index, value: tempMatrixRow });
            while (rank.length > 0) //.Any())
             {
                var layoutCell = rank[0];
                // eslint-disable-next-line max-len
                var matrixCell = { level: index, parents: [], children: [], visitedParents: [], visitedChildren: [], ignoredChildren: [], cells: [], size: 0, offset: 0, initialOffset: 0 };
                matrixRow.push(matrixCell);
                var type = this.getType(layoutCell.type);
                if (type === 'internalVertex') {
                    matrixCell.cells.push(layoutCell);
                    if (layoutCell.identicalSibiling != null) {
                        for (var i = 0; i < rank.length; i++) {
                            var internalVertex = rank[parseInt(i.toString(), 10)];
                            var type_1 = this.getType(internalVertex.type);
                            if (type_1 === 'internalVertex' && this.containsValue(layoutCell.identicalSibiling, internalVertex.id)) {
                                matrixCell.cells.push(internalVertex);
                                if (matrixCell.cells.length > layoutCell.identicalSibiling.length) {
                                    break;
                                }
                            }
                        }
                    }
                    for (var i = 0; i < matrixCell.cells.length; i++) {
                        var internalVertex = matrixCell.cells[parseInt(i.toString(), 10)];
                        var type_2 = this.getType(internalVertex.type);
                        if (type_2 === 'internalVertex') {
                            var geometry = internalVertex.cell.geometry;
                            matrixCell.size += isHorizontal ? geometry.height : geometry.width;
                            maxDimension = Math.max(maxDimension, !isHorizontal ? geometry.height : geometry.width);
                            tempMatrixRow.push({ key: internalVertex.id, value: matrixCell });
                            if (internalVertex.connectsAsTarget.length > 0) {
                                for (var k = 0; k < internalVertex.connectsAsTarget.length; k++) {
                                    var internalEdgese = internalVertex.connectsAsTarget[parseInt(k.toString(), 10)];
                                    var key = null;
                                    if (this.containsValue(matrixCellMapper[index - 1].value, internalEdgese.ids)) {
                                        key = internalEdgese.ids;
                                    }
                                    else if (this.containsValue(matrixCellMapper[index - 1].value, internalEdgese.source.id)) {
                                        key = internalEdgese.source.id;
                                    }
                                    if (key != null) {
                                        var parentcellValue = matrixCellMapper[index - 1].value;
                                        var parentMartixCell = void 0;
                                        for (var v = 0; v < parentcellValue.length; v++) {
                                            if (parentcellValue[parseInt(v.toString(), 10)].key === key) {
                                                parentMartixCell = parentcellValue[parseInt(v.toString(), 10)].value;
                                                break;
                                            }
                                        }
                                        if (!this.containsValue(matrixCell.parents, parentMartixCell)) {
                                            matrixCell.parents.push(parentMartixCell);
                                        }
                                        if (!this.containsValue(parentMartixCell.children, matrixCell)) {
                                            parentMartixCell.children.push(matrixCell);
                                        }
                                    }
                                }
                            }
                            // 933466: Excessive Spacing Between Nodes in Complex Hierarchical Tree Layout
                            var vertex = matrixCell.cells[parseInt(i.toString(), 10)];
                            if (rank.indexOf(vertex) !== -1) {
                                rank.splice(rank.indexOf(vertex), 1);
                            }
                        }
                    }
                    matrixCell.size += (matrixCell.cells.length - 1) * spacing;
                }
                else if (type === 'internalEdge') {
                    matrixCell.cells.push(layoutCell);
                    for (var i = 0; i < matrixCell.cells.length; i++) {
                        var internalEdge = matrixCell.cells[parseInt(i.toString(), 10)];
                        var type1 = this.getType(internalEdge.type);
                        if (type1 === 'internalEdge' && internalEdge.edges != null) {
                            // need to spacing based on its source and target Node
                            var edgeSpacing = 5;
                            var cellSize = -edgeSpacing;
                            for (var k = 0; k < internalEdge.edges.length; k++) {
                                //const internalConnector = internalEdge.edges[k];
                                // need to summ up the line width
                                cellSize += 1 + edgeSpacing;
                            }
                            matrixCell.size += cellSize;
                        }
                        tempMatrixRow.push({ key: internalEdge.ids, value: matrixCell });
                        var key = null;
                        if (this.containsValue(matrixCellMapper[index - 1].value, internalEdge.ids)) {
                            key = internalEdge.ids;
                        }
                        else if (this.containsValue(matrixCellMapper[index - 1].value, internalEdge.source.id)) {
                            key = internalEdge.source.id;
                        }
                        if (key != null) {
                            var parentcell = matrixCellMapper[index - 1].value;
                            var parentMartixCell = void 0;
                            for (var v = 0; v < parentcell.length; v++) {
                                if (parentcell[parseInt(v.toString(), 10)].key === key) {
                                    parentMartixCell = parentcell[parseInt(v.toString(), 10)].value;
                                    break;
                                }
                            }
                            if (!this.containsValue(matrixCell.parents, parentMartixCell)) {
                                matrixCell.parents.push(parentMartixCell);
                            }
                            if (!this.containsValue(parentMartixCell.children, matrixCell)) {
                                parentMartixCell.children.push(matrixCell);
                            }
                        }
                        // 933466: Excessive Spacing Between Nodes in Complex Hierarchical Tree Layout
                        var vertex = matrixCell.cells[parseInt(i.toString(), 10)];
                        if (rank.indexOf(vertex) !== -1) {
                            rank.splice(rank.indexOf(vertex), 1);
                        }
                    }
                    matrixCell.size += (matrixCell.cells.length - 1) * spacing;
                }
                if (matrixCell.cells.length) {
                    var internalVertices = matrixCell.cells.filter(function (e) { return e.type === 'internalVertex'; });
                    if (internalVertices.length > 0) {
                        var _loop_1 = function (cell) {
                            var vertex = cell.cell;
                            if (matrixModel.model.roots.some(function (root) { return root === vertex; })) {
                                matrixModel.roots.push(matrixCell);
                                return "break";
                            }
                        };
                        for (var _i = 0, internalVertices_1 = internalVertices; _i < internalVertices_1.length; _i++) {
                            var cell = internalVertices_1[_i];
                            var state_1 = _loop_1(cell);
                            if (state_1 === "break")
                                break;
                        }
                    }
                }
            }
            matrixModel.rowOffset.push(rowoffset + (maxDimension / 2) + spacingInverse);
            rowoffset += maxDimension + spacingInverse;
        }
    };
    MatrixModel.prototype.arrangeMatrix = function (cell, parent, matrixModel) {
        var layoutSettings = matrixModel.model.layout;
        var isHorizontal = layoutSettings.orientation === 'LeftToRight'
            || layoutSettings.orientation === 'RightToLeft';
        var spacing = isHorizontal ? layoutSettings.verticalSpacing : layoutSettings.horizontalSpacing;
        var matrix = matrixModel.matrix;
        var matrixRow = matrix[cell.level].value;
        var matrixIndex = matrixRow.indexOf(cell);
        if (cell.visitedParents.length > 0) {
            if (cell.visitedParents.length === 1) {
                cell.initialOffset = cell.offset;
            }
            if (matrixIndex + 1 < matrixRow.length) {
                var nextCell = matrixRow[matrixIndex + 1];
                if (nextCell.visitedParents.length > 0) {
                    if (!this.containsValue(cell.visitedParents, parent)) {
                        cell.visitedParents.push(parent);
                        parent.ignoredChildren.push(cell);
                        return;
                    }
                }
            }
        }
        if (!(cell.children.length > 0)) {
            var validOffset = cell.offset;
            if (matrixIndex > 0) {
                var prevCell = matrixRow[matrixIndex - 1];
                validOffset = prevCell.offset + (prevCell.size / 2) + spacing + (cell.size / 2);
            }
            this.shiftMatrixCells(validOffset - cell.offset, cell, false, null, matrixModel);
        }
        else {
            for (var i = 0; i < cell.children.length; i++) {
                var matrixCellChild = cell.children[parseInt(i.toString(), 10)];
                if (!this.containsValue(cell.visitedChildren, matrixCellChild)) {
                    this.arrangeMatrix(matrixCellChild, cell, matrixModel);
                    cell.visitedChildren.push(matrixCellChild);
                }
            }
            if (cell.visitedChildren.length > 0) {
                var children = cell.visitedChildren.slice();
                for (var i = 0; i < cell.ignoredChildren.length; i++) {
                    //let cellIgnoredChild: MatrixCellGroupObject = cell.ignoredChildren[i];
                    children.splice(0, 1);
                    cell.visitedChildren.splice(0, 1);
                }
                if (children.length > 0) {
                    var firstChild = cell.visitedChildren[0];
                    var lastChild = cell.visitedChildren[cell.visitedChildren.length - 1];
                    var x1 = firstChild.offset - (firstChild.size / 2);
                    var x2 = lastChild.offset + (lastChild.size / 2);
                    var newoffset = (x1 + x2) / 2;
                    if (newoffset < cell.offset) {
                        this.shiftMatrixCells(cell.offset - newoffset, firstChild, true, cell, matrixModel);
                    }
                    else if (newoffset > cell.offset) {
                        this.shiftMatrixCells(newoffset - cell.offset, cell, false, null, matrixModel);
                    }
                }
            }
        }
        if (!this.containsValue(cell.visitedParents, parent)) {
            cell.visitedParents.push(parent);
        }
    };
    MatrixModel.prototype.findParentVertexCellGroup = function (cell) {
        if (cell.cells[0]) {
            return cell;
        }
        if (cell.parents.length > 0) {
            return this.findParentVertexCellGroup(cell.parents[0]);
        }
        return cell;
    };
    MatrixModel.prototype.translateMatrixCells = function (value, cell) {
        if (!(value === 0)) {
            cell.offset += value;
            if (cell.visitedChildren.length > 0) {
                for (var i = 0; i < cell.visitedChildren.length; i++) {
                    var cellVisitedChild = cell.visitedChildren[parseInt(i.toString(), 10)];
                    this.translateMatrixCells(value, cellVisitedChild);
                }
            }
        }
    };
    MatrixModel.prototype.setXYforMatrixCell = function (matrixModel) {
        var layoutSettings = matrixModel.model.layout;
        var isHorizontal = layoutSettings.orientation === 'LeftToRight'
            || layoutSettings.orientation === 'RightToLeft';
        var spacing = isHorizontal ? layoutSettings.verticalSpacing : layoutSettings.horizontalSpacing;
        for (var i = 0; i < matrixModel.matrix.length; i++) {
            var matrixrow1 = matrixModel.matrix[parseInt(i.toString(), 10)].value;
            for (var j = 0; j < matrixrow1.length; j++) {
                var matrixCell = matrixrow1[parseInt(j.toString(), 10)];
                var start = matrixCell.offset - (matrixCell.size / 2);
                for (var k = 0; k < matrixCell.cells.length; k++) {
                    var cell = matrixCell.cells[parseInt(k.toString(), 10)];
                    var type = this.getType(cell.type);
                    if (type === 'internalVertex') {
                        var internalVertex = cell;
                        var width = internalVertex.cell.geometry.width;
                        var height = internalVertex.cell.geometry.height;
                        if (isHorizontal) {
                            internalVertex.cell.geometry = new RectModel(matrixModel.rowOffset[matrixCell.level] - (width / 2), start, width, height);
                        }
                        else {
                            internalVertex.cell.geometry = new RectModel(start, matrixModel.rowOffset[matrixCell.level] - (height / 2), width, height);
                        }
                        start += (isHorizontal ? height : width) + spacing;
                    }
                    else if (type === 'internalEdge') {
                        var internalEdges = cell;
                        var parent_1 = matrixCell.visitedParents[0];
                        var isContainSibilingVertex = false;
                        if (parent_1) {
                            for (var l = 0; l < parent_1.visitedChildren.length; l++) {
                                var children = parent_1.visitedChildren[parseInt(l.toString(), 10)];
                                var cells = [];
                                for (var m = 0; m < children.cells.length; m++) {
                                    var cell_1 = children.cells[parseInt(m.toString(), 10)];
                                    var type_3 = this.getType(cell_1.type);
                                    if (type_3 === 'internalVertex') {
                                        cells.push(cell_1);
                                    }
                                }
                                if (cells.length > 0) {
                                    isContainSibilingVertex = true;
                                    break;
                                }
                            }
                        }
                        // Need to updated line width
                        var lineWidth = 1;
                        var edgeSpacing = 5;
                        for (var m = 0; m < internalEdges.edges.length; m++) {
                            var internalConnector = internalEdges.edges[parseInt(m.toString(), 10)];
                            var pt = this.getPointvalue(start + (lineWidth / 2.0), matrixModel.rowOffset[matrixCell.level]);
                            if (isHorizontal) {
                                pt = this.getPointvalue(matrixModel.rowOffset[matrixCell.level], start + (lineWidth / 2.0));
                            }
                            if (this.containsValue(this.getEdgeMapper(), internalConnector)) {
                                var key = void 0;
                                for (var l = 0; l < this.getEdgeMapper().length; l++) {
                                    if ((this.getEdgeMapper())[parseInt(l.toString(), 10)].key === internalConnector) {
                                        key = l;
                                        break;
                                    }
                                }
                                (this.getEdgeMapper())[parseInt(key.toString(), 10)].value.push(pt);
                            }
                            start += lineWidth + edgeSpacing;
                        }
                        start += spacing;
                    }
                }
            }
        }
    };
    MatrixModel.prototype.getType = function (type) {
        if (type === 'internalVertex') {
            return 'internalVertex';
        }
        else {
            return 'internalEdge';
        }
    };
    MatrixModel.prototype.selectIds = function (node, source) {
        var returnIds = [];
        for (var i = 0; i < node.length; i++) {
            var connector = node[parseInt(i.toString(), 10)];
            if (source) {
                {
                    returnIds.push(connector.source.id);
                }
            }
            else {
                returnIds.push(connector.target.id);
            }
        }
        return returnIds;
    };
    MatrixModel.prototype.compareLists = function (list1, list2) {
        var newList1 = list1.slice();
        var newList2 = list2.slice();
        if (newList1.length === newList2.length) {
            if (newList1.length === 0) {
                return true;
            }
            else {
                var isSame = true;
                for (var i = 0; i < newList2.length; i++) {
                    var o = newList2[parseInt(i.toString(), 10)];
                    // EJ2-63944 - Nodes overlapping in Complex hierarchical tree layout in linear arrangement.
                    if (newList1.indexOf(o) === -1) {
                        isSame = false;
                        break;
                    }
                }
                return isSame;
            }
        }
        return false;
    };
    MatrixModel.prototype.updateMutualSharing = function (cell, id) {
        if (cell.identicalSibiling != null) {
            cell.identicalSibiling.push(id);
        }
        else {
            cell.identicalSibiling = [];
            cell.identicalSibiling.push(id);
        }
    };
    MatrixModel.prototype.containsValue = function (list, keyValue) {
        for (var i = 0; i < list.length; i++) {
            if (list[parseInt(i.toString(), 10)].key === keyValue
                || list[parseInt(i.toString(), 10)] === keyValue) {
                return true;
            }
        }
        return false;
    };
    MatrixModel.prototype.shiftMatrixCells = function (value, startingCell, shiftChildren, parentCell, matrixModel) {
        if (!(value === 0)) {
            var matrix = matrixModel.matrix;
            var matrixRow = matrix[startingCell.level].value;
            var index = matrixRow.indexOf(startingCell);
            for (var i = index; i < matrixRow.length; i++) {
                matrixRow[parseInt(i.toString(), 10)].offset += value;
            }
            if (shiftChildren) {
                if (startingCell.visitedChildren.length > 0) {
                    this.shiftMatrixCells(value, startingCell.visitedChildren[0], true, startingCell, matrixModel);
                }
                else {
                    var i = 1;
                    var nextSibilingwithChild = null;
                    while (index + i < matrixRow.length) {
                        var nextCell = matrixRow[index + i];
                        if (parentCell != null && this.containsValue(nextCell.visitedParents, parentCell)) {
                            if (nextCell.visitedChildren.length > 0) {
                                nextSibilingwithChild = nextCell;
                            }
                            else {
                                i++;
                                continue;
                            }
                        }
                        break;
                    }
                    if (nextSibilingwithChild != null) {
                        this.shiftMatrixCells(value, nextSibilingwithChild.visitedChildren[0], true, nextSibilingwithChild, matrixModel);
                    }
                }
            }
        }
    };
    MatrixModel.prototype.getPointvalue = function (x, y) {
        return { 'x': Number(x) || 0, 'y': Number(y) || 0 };
    };
    MatrixModel.prototype.getEdgeMapper = function () {
        return this.edgeMapper;
    };
    MatrixModel.prototype.setEdgeMapper = function (value) {
        this.edgeMapper.push(value);
    };
    MatrixModel.prototype.updateLayout = function (viewPort, modelBounds, layoutProp, layout, nodeWithMultiEdges, nameTable) {
        var trnsX = ((viewPort.x - modelBounds.width) / 2) - modelBounds.x;
        var trnsY = ((viewPort.y - modelBounds.height) / 2) - modelBounds.y;
        trnsX = Math.round(trnsX);
        trnsY = Math.round(trnsY);
        var modifiedConnectors = [];
        var transModelBounds = new RectModel(modelBounds.x + trnsX, modelBounds.y + trnsY, modelBounds.width, modelBounds.height);
        var margin = layoutProp.margin;
        var isHorizontal = layout.orientation === 'RightToLeft' || layout.orientation === 'LeftToRight';
        var inversespacing = !isHorizontal ? layout.verticalSpacing : layout.horizontalSpacing;
        for (var i = 0; i < nodeWithMultiEdges.length; i++) {
            var node = nodeWithMultiEdges[parseInt(i.toString(), 10)];
            if (node.outEdges != null && node.outEdges.length > 0) {
                var count = node.outEdges.length;
                for (var j = 0; j < count; j++) {
                    var internalConnector = nameTable[node.outEdges[parseInt(j.toString(), 10)]];
                    internalConnector['pointCollection'] = [];
                    if (count > 1) {
                        var segmentsize = inversespacing / 2.0;
                        var intermediatePoint = null;
                        var key = void 0;
                        var edgeMapper = this.getEdgeMapper();
                        for (var k = 0; k < edgeMapper.length; k++) {
                            if (edgeMapper[parseInt(k.toString(), 10)].key === internalConnector) {
                                key = k;
                                break;
                            }
                        }
                        if (key && edgeMapper[parseInt(key.toString(), 10)].value.length > 0) {
                            var edgePoint = edgeMapper[parseInt(key.toString(), 10)].value[0];
                            var dxValue1 = edgePoint.x + margin.left;
                            var dyValue1 = edgePoint.y + margin.top;
                            var x1 = dxValue1;
                            var y1 = dyValue1;
                            if (layout.orientation === 'BottomToTop') {
                                y1 = modelBounds.height - dyValue1;
                            }
                            else if (layout.orientation === 'RightToLeft') {
                                x1 = modelBounds.width - dxValue1;
                            }
                            if (modelBounds.x < 0) {
                                x1 -= modelBounds.x;
                            }
                            if (modelBounds.y < 0) {
                                y1 -= modelBounds.y;
                            }
                            intermediatePoint = this.getPointvalue(x1, y1);
                        }
                        var pts = [];
                        for (var i_1 = 0; i_1 < internalConnector.segments.length; i_1++) {
                            var pt = internalConnector.segments[parseInt(i_1.toString(), 10)].points;
                            // eslint-disable-next-line guard-for-in
                            for (var temp in pt) {
                                pts.push(pt[parseInt(temp.toString(), 10)]);
                            }
                        }
                        // eslint-disable-next-line max-len
                        pts = this.updateConnectorPoints(pts, segmentsize, intermediatePoint, transModelBounds, layout.orientation);
                        // 933466: Excessive Spacing Between Nodes in Complex Hierarchical Tree Layout
                        if (intermediatePoint != null && this.diagram.layout.connectionPointOrigin !== 'DifferentPoint') {
                            for (var p = 0; p < pts.length; p++) {
                                var pt = pts[parseInt(p.toString(), 10)];
                                internalConnector['pointCollection'].push(this.getPointvalue(pt.x, pt.y));
                            }
                        }
                        this.resetConnectorPoints(internalConnector);
                    }
                    modifiedConnectors.push(internalConnector);
                }
            }
            if (node.inEdges != null && node.inEdges.length > 1) {
                var count = node.inEdges.length;
                var edgeMapper = this.getEdgeMapper();
                for (var j = 0; j < count; j++) {
                    var internalConnector = nameTable[node.inEdges[parseInt(j.toString(), 10)]];
                    if (!this.containsValue(modifiedConnectors, internalConnector)) {
                        internalConnector['pointCollection'] = [];
                    }
                    if (count > 1) {
                        var segmentsize = inversespacing / 2.0;
                        var intermediatePoint = null;
                        var key = void 0;
                        var k = void 0;
                        for (k = 0; k < edgeMapper.length; k++) {
                            if (edgeMapper[parseInt(k.toString(), 10)].key === internalConnector) {
                                key = k;
                                break;
                            }
                        }
                        if (key && edgeMapper[parseInt(key.toString(), 10)].value.length > 0
                            && !this.containsValue(modifiedConnectors, internalConnector)) {
                            var edgePt = edgeMapper[parseInt(k.toString(), 10)].value[0];
                            var dx1 = edgePt.x + margin.left;
                            var dy1 = edgePt.y + margin.top;
                            // eslint-disable-next-line one-var
                            var x1 = dx1, y1 = dy1;
                            if (layout.orientation === 'BottomToTop') {
                                y1 = modelBounds.height - dy1;
                            }
                            else if (layout.orientation === 'RightToLeft') {
                                x1 = modelBounds.width - dx1;
                            }
                            if (modelBounds.x < 0) {
                                x1 -= modelBounds.x;
                            }
                            if (modelBounds.y < 0) {
                                y1 -= modelBounds.y;
                            }
                            intermediatePoint = this.getPointvalue(x1, y1);
                        }
                        var pts = [];
                        for (var p = 0; p < internalConnector.segments.length; p++) {
                            var pt = internalConnector.segments[parseInt(p.toString(), 10)].points;
                            // eslint-disable-next-line guard-for-in
                            for (var temp in pt) {
                                pts.push(pt[parseInt(temp.toString(), 10)]);
                            }
                        }
                        pts.reverse();
                        // eslint-disable-next-line
                        pts = this.updateConnectorPoints(pts, segmentsize, intermediatePoint, transModelBounds, layoutProp.orientation);
                        pts.reverse();
                        internalConnector['pointCollection'] = [];
                        // 933466: Excessive Spacing Between Nodes in Complex Hierarchical Tree Layout
                        if (intermediatePoint != null && this.diagram.layout.connectionPointOrigin !== 'DifferentPoint') {
                            for (var p = 0; p < pts.length; p++) {
                                var pt = pts[parseInt(p.toString(), 10)];
                                internalConnector['pointCollection'].push(this.getPointvalue(pt.x, pt.y));
                            }
                        }
                        this.resetConnectorPoints(internalConnector);
                    }
                }
            }
        }
    };
    MatrixModel.prototype.inflate = function (rect, x, y) {
        rect.x -= x;
        rect.y -= y;
        rect.width += 2 * x;
        rect.height += 2 * y;
        return rect;
    };
    MatrixModel.prototype.updateConnectorPoints = function (connectorPoints, startSegmentSize, intermediatePoint, bounds, orientation) {
        // 933466: Excessive Spacing Between Nodes in Complex Hierarchical Tree Layout
        var layoutBounds = bounds;
        var isHorizontal = orientation === 'LeftToRight' || orientation === 'RightToLeft';
        var pts = connectorPoints;
        var startPoint = pts[0];
        var endPoint = pts[pts.length - 1];
        if (intermediatePoint != null) {
            var startNext = Point.transform(startPoint, Point.findAngle(startPoint, pts[1]), startSegmentSize);
            var endBefore = Point.transform(endPoint, Point.findAngle(endPoint, pts[pts.length - 2]), startSegmentSize);
            var intermediateStart = this.getPointvalue(intermediatePoint.x, startNext.y);
            var intermediateEnd = this.getPointvalue(intermediatePoint.x, endBefore.y);
            if (isHorizontal) {
                intermediateStart.x = startNext.x;
                intermediateStart.y = intermediatePoint.y;
                intermediateEnd.x = endBefore.x;
                intermediateEnd.y = intermediatePoint.y;
            }
            var length_2 = Math.abs(Point.findAngle(intermediateEnd, endBefore));
            if (length_2 < 0.1) {
                return [startPoint, startNext, intermediateStart, endBefore, endPoint];
            }
            return [startPoint, startNext, intermediateStart, intermediateEnd, endBefore, endPoint];
        }
        else if (pts.length === 4) {
            var startNext = Point.transform(startPoint, Point.findAngle(startPoint, pts[1]), startSegmentSize);
            var intermediateStart = this.getPointvalue(pts[2].x, startNext.y);
            if (isHorizontal) {
                intermediateStart.x = startNext.x;
                intermediateStart.y = pts[2].y;
            }
            return [startPoint, startNext, intermediateStart, endPoint];
        }
        return pts;
    };
    MatrixModel.prototype.resetConnectorPoints = function (edge) {
        // 933466: Excessive Spacing Between Nodes in Complex Hierarchical Tree Layout
        if (edge['pointCollection'] && edge['pointCollection'].length > 0) {
            var connector = edge;
            connector.sourcePoint = edge['pointCollection'][0];
            connector.targetPoint = edge['pointCollection'][edge['pointCollection'].length - 1];
            var segments = [];
            for (var i = 0; i < edge['pointCollection'].length - 1; i++) {
                var point1 = edge['pointCollection'][parseInt(i.toString(), 10)];
                var point2 = edge['pointCollection'][i + 1];
                var length_3 = findDistance(point1, point2);
                var direction = getConnectorDirection(point1, point2);
                if (i === edge['pointCollection'].length - 2) {
                    if ((this.diagram.layout.orientation === 'RightToLeft' && direction === 'Left')
                        || (this.diagram.layout.orientation === 'LeftToRight' && direction === 'Right')
                        || (this.diagram.layout.orientation === 'TopToBottom' && direction === 'Bottom')
                        || (this.diagram.layout.orientation === 'BottomToTop' && direction === 'Top')) {
                        length_3 = length_3 / 2;
                    }
                }
                /* tslint:enable */
                var tempSegment = new OrthogonalSegment(edge, 'segments', { type: 'Orthogonal' }, true);
                tempSegment.length = length_3;
                tempSegment.direction = direction;
                segments.push(tempSegment);
            }
            connector.segments = segments;
            connector.type = 'Orthogonal';
            this.diagram.connectorPropertyChange(connector, {}, {
                type: 'Orthogonal',
                segments: connector.segments
            });
        }
        else if (this.diagram.layout.connectionPointOrigin === 'DifferentPoint') {
            var obstacleCollection = 'obstaclePointCollection';
            if (edge.segments[0].points
                && edge.segments[0].points.length > 0 && edge["" + obstacleCollection]) {
                var connector = edge;
                connector.sourcePoint = edge["" + obstacleCollection][0];
                connector.targetPoint = edge["" + obstacleCollection][edge["" + obstacleCollection].length - 1];
                var segments = [];
                for (var i = 0; i < edge["" + obstacleCollection].length - 1; i++) {
                    var point1 = edge["" + obstacleCollection][parseInt(i.toString(), 10)];
                    var point2 = edge["" + obstacleCollection][i + 1];
                    var length_4 = findDistance(point1, point2);
                    var direction = getConnectorDirection(point1, point2);
                    if (i === edge["" + obstacleCollection].length - 2) {
                        if ((this.diagram.layout.orientation === 'RightToLeft' && direction === 'Left')
                            || (this.diagram.layout.orientation === 'LeftToRight' && direction === 'Right')
                            || (this.diagram.layout.orientation === 'TopToBottom' && direction === 'Bottom')
                            || (this.diagram.layout.orientation === 'BottomToTop' && direction === 'Top')) {
                            length_4 = length_4 / 2;
                        }
                    }
                    /* tslint:enable */
                    var tempSegment = new OrthogonalSegment(edge, 'segments', { type: 'Orthogonal' }, true);
                    tempSegment.length = length_4;
                    tempSegment.direction = direction;
                    segments.push(tempSegment);
                }
                connector.segments = segments;
                connector.type = 'Orthogonal';
                this.diagram.connectorPropertyChange(connector, {}, {
                    type: 'Orthogonal',
                    segments: connector.segments
                });
            }
        }
    };
    MatrixModel.prototype.nodePropertyChange = function (dnode) {
        // 933466: Excessive Spacing Between Nodes in Complex Hierarchical Tree Layout
        this.diagram.nodePropertyChange(dnode, {}, { offsetX: dnode.offsetX, offsetY: dnode.offsetY });
    };
    return MatrixModel;
}());
