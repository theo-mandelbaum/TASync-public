var FlowchartModel = /** @class */ (function () {
    function FlowchartModel(layout, root, vertices) {
        var _this = this;
        this.dfsCount = 0;
        this.maxRank = 100000000;
        this.layout = layout;
        this.vertexMapper = new Map();
        this.ranks = new Map();
        var internalVertices = [];
        this.createInternalCells(vertices, internalVertices);
        internalVertices.forEach(function (internalVertex) {
            var edges = internalVertex.internalOutEdges;
            edges.forEach(function (internalEdge) {
                var realEdges = internalEdge.edges;
                if (realEdges && realEdges.length > 0) {
                    var realEdge = realEdges[0];
                    var targetCell = _this.layout.getVisibleTerminal(realEdge, false);
                    var internalTargetCell = _this.vertexMapper.get(targetCell.id);
                    if (internalVertex === internalTargetCell) {
                        targetCell = _this.layout.getVisibleTerminal(realEdge, true);
                        internalTargetCell = _this.vertexMapper.get(targetCell.id);
                    }
                    if (internalTargetCell && internalVertex !== internalTargetCell) {
                        internalEdge.target = internalTargetCell;
                        if (internalVertex.internalInEdges.indexOf(internalEdge) === -1) {
                            internalTargetCell.internalInEdges.push(internalEdge);
                        }
                    }
                }
            });
        });
        this.rootNode = this.vertexMapper.get(root.id);
    }
    FlowchartModel.prototype.createInternalCells = function (vertices, internalVertices) {
        for (var j = 0; j < vertices.length; j++) {
            var vertex = vertices[parseInt(j.toString(), 10)];
            var internalVertex = {
                tempRank: -1, cell: vertex, hashCode: [], maxRank: null, minRank: null,
                id: vertex.id, internalOutEdges: [], internalInEdges: [], identicalSibling: []
            };
            internalVertices.push(internalVertex);
            this.vertexMapper.set(vertex.id, internalVertex);
            var connectors = this.layout.getEdges(vertex);
            var i = 0;
            while (i < connectors.length) {
                var connector = connectors[parseInt(i.toString(), 10)];
                var childVertex = this.layout.getVisibleTerminal(connector, false);
                if (childVertex !== vertex) {
                    var undirectedEdges = this.layout.getEdgesBetween(vertex, childVertex, true);
                    if (undirectedEdges.length > 0) {
                        var internalEdge = {
                            connectorIds: [], edges: undirectedEdges, ids: [], isReversed: false,
                            source: null, target: null, tempRank: 0, maxRank: null, minRank: null
                        };
                        for (var k = 0; k < undirectedEdges.length; k++) {
                            var undirectedEdge = undirectedEdges[parseInt(k.toString(), 10)];
                            //   if (!undirectedEdge.id) {
                            //     undirectedEdge.id = randomId();
                            //   }
                            internalEdge.ids.push(undirectedEdge.id);
                            if (connectors.indexOf(undirectedEdge) !== -1) {
                                if (connectors.indexOf(undirectedEdge) < i) {
                                    i--;
                                }
                                connectors.splice(connectors.indexOf(undirectedEdge), 1);
                            }
                        }
                        internalEdge.source = internalVertex;
                        if (internalVertex.internalOutEdges.indexOf(internalEdge) === -1) {
                            internalVertex.internalOutEdges.push(internalEdge);
                        }
                    }
                }
                else {
                    i++;
                }
            }
        }
    };
    //Initializes the ranks of the vertices
    /**
     * @Private
     * @returns { void }  Initializes the ranks of the vertices .\
     */
    FlowchartModel.prototype.layeringStage = function () {
        this.recycleConnectors();
        this.initialRank();
        this.fixRanks();
    };
    FlowchartModel.prototype.recycleConnectors = function () {
        var startNodes = [this.rootNode];
        this.visit(startNodes, true);
    };
    FlowchartModel.prototype.initialRank = function () {
        var startNodes = [this.rootNode];
        var internalNodes = Array.from(this.vertexMapper.values());
        while (startNodes.length > 0) {
            var internalNode = startNodes[0];
            var outEdges = internalNode.internalOutEdges;
            var inEdges = internalNode.internalInEdges;
            var allEdgesScanned = true;
            var minimumLayer = 100000000;
            for (var i = 0; i < inEdges.length; i++) {
                var internalEdge = inEdges[parseInt(i.toString(), 10)];
                if (internalEdge.tempRank === 5270620) {
                    // This edge has been scanned, get the layer of the node on the other end
                    var otherNode = internalEdge.source;
                    minimumLayer = otherNode.tempRank ? Math.min(minimumLayer, otherNode.tempRank - 1) : minimumLayer;
                }
                else {
                    allEdgesScanned = false;
                    break;
                }
            }
            // If all edge have been scanned, assign the layer, mark all edges in the other direction and remove from the nodes list
            if (allEdgesScanned) {
                internalNode.tempRank = minimumLayer;
                this.maxRank = Math.min(this.maxRank, minimumLayer);
                if (outEdges.length) {
                    if (internalNode.cell.isDecisionNode) {
                        var yesChild = outEdges.find(function (e) { return e.target.cell.isYesChild; });
                        var decisionNode = outEdges.find(function (e) { return e.target.cell.isDecisionNode; });
                        if (outEdges.indexOf(decisionNode) === -1 && outEdges.indexOf(yesChild) !== 0) {
                            outEdges.reverse();
                        }
                        if (this.layout.yesBranchDirection === 'RightInFlow'
                            || (this.layout.yesBranchDirection === 'SameAsFlow'
                                && this.layout.noBranchDirection === 'LeftInFlow')) {
                            outEdges.reverse();
                        }
                    }
                    for (var i = 0; i < outEdges.length; i++) {
                        var internalEdge = outEdges[parseInt(i.toString(), 10)];
                        internalEdge.tempRank = 5270620;
                        // Add node on other end of edge to LinkedList of nodes to be analysed
                        var otherNode = internalEdge.target;
                        // Only add node if it hasn't been assigned a layer
                        if (otherNode.tempRank === -1) {
                            // Mark this other node as neither being unassigned nor assigned
                            //so it isn't added to this list again, but it's layer isn't used in any calculation.
                            otherNode.tempRank = -2;
                            startNodes.push(otherNode);
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
            internalNodes[parseInt(i.toString(), 10)].tempRank -= this.maxRank;
        }
        var currentMaxLayer = 0;
        var layerDeterminingEdges = this.rootNode.internalOutEdges;
        for (var j = 0; j < layerDeterminingEdges.length; j++) {
            var internalEdge = layerDeterminingEdges[parseInt(j.toString(), 10)];
            var otherNode = internalEdge.target;
            this.rootNode.tempRank = (otherNode.tempRank !== undefined && otherNode.tempRank !== null) ?
                Math.max(currentMaxLayer, otherNode.tempRank + 1) : currentMaxLayer;
            currentMaxLayer = this.rootNode.tempRank;
        }
        this.maxRank = 100000000 - this.maxRank;
    };
    FlowchartModel.prototype.fixRanks = function () {
        var rankList = new Map();
        this.ranks = new Map();
        for (var i = 0; i <= this.maxRank; i++) {
            rankList.set(i, []);
            this.ranks.set(i, rankList.get(i));
        }
        var rootsArray = [this.rootNode];
        this.visit(rootsArray, false, rankList);
    };
    /**
     * used to visit all the entries on the given dictionary with given function \
     *
     * @returns { void }  used to visit all the entries on the given dictionary with given function .\
     * @param {InternalVertex[]} dfsRoots - provide the dfsRoots value.
     * @param {boolean} trackAncestors - provide the trackAncestors value.
     * @param {Map<number, []>} rankList - provide the rankList value.
     * @private
     */
    FlowchartModel.prototype.visit = function (dfsRoots, trackAncestors, rankList) {
        if (rankList === void 0) { rankList = null; }
        if (dfsRoots) {
            for (var i = 0; i < dfsRoots.length; i++) {
                var internalNode = dfsRoots[parseInt(i.toString(), 10)];
                if (internalNode) {
                    var seenNodes = new Map();
                    if (trackAncestors) {
                        internalNode.hashCode = [this.dfsCount, i];
                        this.extendedDfs(null, internalNode, null, seenNodes, i);
                    }
                    else {
                        this.depthFirstSearch(null, internalNode, null, seenNodes, rankList);
                    }
                }
            }
            this.dfsCount++;
        }
    };
    FlowchartModel.prototype.extendedDfs = function (parent, root, connectingEdge, seen, childHash) {
        var _this = this;
        if (parent) {
            if (!root.hashCode || root.hashCode[0] !== parent.hashCode[0]) {
                root.hashCode = parent.hashCode.concat([childHash]);
            }
        }
        var rootId = root.id;
        if (!seen.has(rootId)) {
            seen.set(rootId, root);
            this.removeConnectionEdge(parent, root, connectingEdge);
            var outgoingEdges = root.internalOutEdges.slice();
            outgoingEdges.forEach(function (internalEdge, i) {
                var targetNode = internalEdge.target;
                _this.extendedDfs(root, targetNode, internalEdge, seen, i);
            });
        }
        else {
            this.removeConnectionEdge(parent, root, connectingEdge);
        }
    };
    FlowchartModel.prototype.removeConnectionEdge = function (parent, node, connectingEdge) {
        if (parent && this.isAncestor(node, parent)) {
            this.invert(connectingEdge);
            this.remove(connectingEdge, parent.internalOutEdges);
            parent.internalInEdges.push(connectingEdge);
            this.remove(connectingEdge, node.internalInEdges);
            node.internalOutEdges.push(connectingEdge);
        }
    };
    FlowchartModel.prototype.invert = function (edge) {
        var temp = edge.source;
        edge.source = edge.target;
        edge.target = temp;
        edge.isReversed = !edge.isReversed;
    };
    FlowchartModel.prototype.remove = function (edge, edges) {
        var index = edges.indexOf(edge);
        edges.splice(index, 1);
    };
    FlowchartModel.prototype.isAncestor = function (node, otherNode) {
        // Firstly, the hash code of this node needs to be shorter than the other node
        if (otherNode !== null && node.hashCode !== null && otherNode.hashCode !== null
            && node.hashCode.length < otherNode.hashCode.length) {
            if (node.hashCode === otherNode.hashCode) {
                return true;
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
    FlowchartModel.prototype.depthFirstSearch = function (parent, root, connectingEdge, seen, rankList) {
        var _this = this;
        var rootId = root.id;
        if (!seen.has(rootId)) {
            seen.set(rootId, root);
            this.updateMinMaxRank(parent, root, connectingEdge, 0, rankList);
            var outgoingEdges = root.internalOutEdges.slice();
            outgoingEdges.forEach(function (internalEdge) {
                var targetNode = internalEdge.target;
                _this.depthFirstSearch(root, targetNode, internalEdge, seen, rankList);
            });
        }
        else {
            this.updateMinMaxRank(parent, root, connectingEdge, 1, rankList);
        }
    };
    FlowchartModel.prototype.updateMinMaxRank = function (parent, node, edge, seen, rankList) {
        var rankListArray = Array.from(rankList.values());
        if (node.maxRank == null && node.maxRank !== 0) {
            node.maxRank = -1;
        }
        if (node.minRank == null && node.minRank !== 0) {
            node.minRank = -1;
        }
        if (seen === 0 && node.maxRank < 0 && node.minRank < 0) {
            if (node.tempRank >= 0) {
                var rank = node.tempRank;
                rankListArray[parseInt(rank.toString(), 10)].push(node);
                node.maxRank = rank;
                node.minRank = rank;
                node.tempRank = rankListArray[node.maxRank].length - 1;
            }
        }
        if (parent !== null && edge !== null) {
            var parentToCellRankDifference = parent.maxRank - node.maxRank;
            if (parentToCellRankDifference > 1) {
                edge.maxRank = parent.maxRank;
                edge.minRank = node.maxRank;
                for (var i = edge.minRank + 1; i < edge.maxRank; i++) {
                    rankListArray[parseInt(i.toString(), 10)].push(edge);
                    // CheckMe
                    // this.layout.setTempVariable(edge, i, rankList[i].length - 1);
                }
            }
            else if (edge.isReversed) {
                edge.maxRank = parent.maxRank;
                edge.minRank = node.maxRank;
                for (var i = edge.minRank; i <= edge.maxRank; i++) {
                    rankListArray[parseInt(i.toString(), 10)].push(edge);
                }
            }
        }
    };
    return FlowchartModel;
}());
export { FlowchartModel };
