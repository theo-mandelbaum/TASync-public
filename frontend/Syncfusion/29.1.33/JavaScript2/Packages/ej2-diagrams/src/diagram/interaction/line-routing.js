import { Rect } from '../primitives/rect';
import { findPoint, getIntersection, getOppositeDirection, getPortDirection } from '../utility/connector';
import { canEnableRouting } from '../utility/constraints-util';
/**
 * Line Routing
 */
var LineRouting = /** @class */ (function () {
    /**
     * Constructor for the line routing module
     *
     * @private
     */
    function LineRouting() {
        this.size = 20;
        this.intermediatePoints = [];
        this.gridCollection = [];
        this.startArray = [];
        this.targetGridCollection = [];
        this.sourceGridCollection = [];
        this.considerWalkable = [];
        this.skipObstacleCheck = false;
        //constructs the line routing module
    }
    /**
     * lineRouting method \
     *
     * @returns { void }     lineRouting method .\
     * @param {Diagram} diagram - provide the source value.
     *
     * @private
     */
    LineRouting.prototype.lineRouting = function (diagram) {
        var length = diagram.connectors.length;
        this.renderVirtualRegion(diagram);
        if (length > 0) {
            for (var k = 0; k < length; k++) {
                var connector = diagram.connectors[parseInt(k.toString(), 10)];
                if (connector.type === 'Orthogonal' && connector.visible) {
                    this.refreshConnectorSegments(diagram, connector, true);
                }
            }
        }
    };
    /** @private */
    /**
     * renderVirtualRegion method \
     *
     * @returns { void }     renderVirtualRegion method .\
     * @param {Diagram} diagram - provide the source value.
     * @param {boolean} isUpdate - provide the target value.
     *
     * @private
     */
    LineRouting.prototype.renderVirtualRegion = function (diagram, isUpdate) {
        /* tslint:disable */
        var extraBounds = this.size;
        if (diagram.spatialSearch['pageTop'] < 0 || diagram.spatialSearch['pageLeft'] < 0) {
            extraBounds = this.size + (this.size / 2);
        }
        var right = diagram.spatialSearch['pageRight'] + extraBounds;
        var bottom = diagram.spatialSearch['pageBottom'] + extraBounds;
        var left = diagram.spatialSearch['pageLeft'] - extraBounds;
        var top = diagram.spatialSearch['pageTop'] - extraBounds;
        left = left < 0 ? left - 20 : 0;
        top = top < 0 ? top - 20 : 0;
        /* tslint:enable */
        if ((isUpdate && (this.width !== (right - left) || this.height !== (bottom - top) ||
            this.diagramStartX !== left || this.diagramStartY !== top)) || isUpdate === undefined) {
            this.width = right - left;
            this.height = bottom - top;
            this.diagramStartX = left;
            this.diagramStartY = top;
            this.gridCollection = [];
            this.noOfRows = this.width / this.size;
            this.noOfCols = this.height / this.size;
            var size = this.size;
            var x = this.diagramStartX < 0 ? this.diagramStartX : 0;
            var y = this.diagramStartY < 0 ? this.diagramStartY : 0;
            for (var i = 0; i < this.noOfCols; i++) {
                for (var j = 0; j < this.noOfRows; j++) {
                    if (i === 0) {
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        this.gridCollection.push([0]);
                    }
                    var grid = {
                        x: x, y: y, width: size, height: size, gridX: j,
                        gridY: i, walkable: true, tested: undefined, nodeId: []
                    };
                    this.gridCollection[parseInt(j.toString(), 10)][parseInt(i.toString(), 10)] = grid;
                    x += size;
                }
                x = this.diagramStartX < 0 ? this.diagramStartX : 0;
                y += size;
            }
        }
        var nodes = this.findNodes(diagram.nodes);
        this.updateNodesInVirtualRegion(nodes);
    };
    LineRouting.prototype.findNodes = function (nodes) {
        var objects = [];
        var node;
        for (var i = 0; i < nodes.length; i++) {
            node = nodes[parseInt(i.toString(), 10)];
            if (node.shape.type !== 'SwimLane' && !node.isLane && !node.isPhase && !node.isHeader && node.visible) {
                objects.push(node);
            }
        }
        return objects;
    };
    LineRouting.prototype.updateNodesInVirtualRegion = function (diagramNodes) {
        var size = this.size;
        var x = this.diagramStartX < 0 ? this.diagramStartX : 0;
        var y = this.diagramStartY < 0 ? this.diagramStartY : 0;
        for (var i = 0; i < this.noOfCols; i++) {
            for (var j = 0; j < this.noOfRows; j++) {
                var grid = this.gridCollection[parseInt(j.toString(), 10)][parseInt(i.toString(), 10)];
                var rectangle = new Rect(x, y, this.size, this.size);
                var isContains = void 0;
                var k = void 0;
                grid.walkable = true;
                grid.tested = undefined;
                grid.nodeId = [];
                for (k = 0; k < diagramNodes.length; k++) {
                    if (diagramNodes[parseInt(k.toString(), 10)].wrapper.bounds) {
                        isContains = this.intersectRect(rectangle, diagramNodes[parseInt(k.toString(), 10)].wrapper.bounds);
                    }
                    if (isContains) {
                        grid.nodeId.push(diagramNodes[parseInt(k.toString(), 10)].id);
                        grid.walkable = false;
                        if (diagramNodes[parseInt(k.toString(), 10)].parentId !== '') {
                            grid.parentNodeId = diagramNodes[parseInt(k.toString(), 10)].parentId;
                        }
                    }
                }
                x += size;
            }
            x = this.diagramStartX < 0 ? this.diagramStartX : 0;
            y += size;
        }
    };
    LineRouting.prototype.intersectRect = function (r1, r2) {
        return !(r2.left >= r1.right || r2.right <= r1.left ||
            r2.top >= r1.bottom || r2.bottom <= r1.top);
    };
    LineRouting.prototype.findEndPoint = function (connector, isSource, isPortBounds) {
        var endPoint;
        var portDirection;
        // EJ2-65876 - Exception occurs on line routing injection module
        if ((isSource && connector.sourcePortID !== '' && connector.sourcePortWrapper) || (!isSource && connector.targetPortID !== '' && connector.targetPortWrapper)) {
            endPoint = (isSource) ? { x: connector.sourcePortWrapper.offsetX, y: connector.sourcePortWrapper.offsetY } :
                { x: connector.targetPortWrapper.offsetX, y: connector.targetPortWrapper.offsetY };
            portDirection = getPortDirection(endPoint, undefined, (isSource) ? connector.sourceWrapper.bounds : connector.targetWrapper.bounds, false);
            var bounds = (isSource) ? connector.sourcePortWrapper.bounds : connector.targetPortWrapper.bounds;
            if (isPortBounds) {
                if (portDirection === 'Top') {
                    endPoint = { x: bounds.topCenter.x, y: bounds.topCenter.y };
                }
                else if (portDirection === 'Left') {
                    endPoint = { x: bounds.middleLeft.x, y: bounds.middleLeft.y };
                }
                else if (portDirection === 'Right') {
                    endPoint = { x: bounds.middleRight.x, y: bounds.middleRight.y };
                }
                else {
                    endPoint = { x: bounds.bottomCenter.x, y: bounds.bottomCenter.y };
                }
            }
            else {
                endPoint = { x: bounds.center.x, y: bounds.center.y };
            }
        }
        else {
            if ((isSource && this.startNode) || (!isSource && this.targetNode)) {
                endPoint = (isSource) ? { x: this.startNode.wrapper.offsetX, y: this.startNode.wrapper.offsetY } :
                    { x: this.targetNode.wrapper.offsetX, y: this.targetNode.wrapper.offsetY };
            }
            else {
                endPoint = (isSource) ? { x: connector.sourcePoint.x, y: connector.sourcePoint.y } :
                    { x: connector.targetPoint.x, y: connector.targetPoint.y };
            }
        }
        return endPoint;
    };
    /**
     * Gets the grids that intersect with the line segment defined by the start and end points.
     * @param {PointModel} startPoint - The starting point of the line segment.
     * @param {PointModel} endPoint - The ending point of the line segment.
     * @returns {VirtualBoundaries[]} An array of VirtualBoundaries that intersect with the line segment.
     * @private
     */
    LineRouting.prototype.getGridsIntersect = function (startPoint, endPoint) {
        var grids = [];
        var minX = Math.min(startPoint.x, endPoint.x);
        var minY = Math.min(startPoint.y, endPoint.y);
        var maxX = Math.max(startPoint.x, endPoint.x);
        var maxY = Math.max(startPoint.y, endPoint.y);
        var gridSize = this.size;
        var minGridX = Math.floor((minX - this.diagramStartX) / gridSize);
        var minGridY = Math.floor((minY - this.diagramStartY) / gridSize);
        var maxGridX = Math.floor((maxX - this.diagramStartX) / gridSize);
        var maxGridY = Math.floor((maxY - this.diagramStartY) / gridSize);
        var isHorizontal = maxX - minX > maxY - minY;
        if (isHorizontal) {
            for (var x = minGridX; x <= maxGridX; x++) {
                var grid = this.gridCollection[parseInt(x.toString(), 10)][parseInt(minGridY.toString(), 10)];
                if (grid && grids.indexOf(grid) === -1) {
                    grids.push(grid);
                }
            }
        }
        else {
            for (var y = minGridY; y <= maxGridY; y++) {
                var grid = this.gridCollection[parseInt(minGridX.toString(), 10)][parseInt(y.toString(), 10)];
                if (grid && grids.indexOf(grid) === -1) {
                    grids.push(grid);
                }
            }
        }
        return grids;
    };
    /**
     * Checks if the path between the start and end points is walkable.
     * @param {PointModel} startPoint - The starting point of the path.
     * @param {PointModel} endPoint - The ending point of the path.
     * @param {Diagram} diagram - The diagram instance.
     * @param {Connector} [connector] - The connector to check for obstacles.
     * @returns {boolean} True if the path is walkable, otherwise false.
     * @private
     */
    LineRouting.prototype.isPathWalkable = function (startPoint, endPoint, diagram, connector) {
        var minX = Math.min(startPoint.x, endPoint.x);
        var minY = Math.min(startPoint.y, endPoint.y);
        var maxX = Math.max(startPoint.x, endPoint.x);
        var maxY = Math.max(startPoint.y, endPoint.y);
        var grids = this.getGridsIntersect(startPoint, endPoint);
        for (var i = 0; i < grids.length; i++) {
            var grid = grids[parseInt(i.toString(), 10)];
            // Exclude grids that contain the source or target node
            if (connector && (grid.nodeId.indexOf(connector.sourceID) !== -1 || grid.nodeId.indexOf(connector.targetID) !== -1)) {
                continue;
            }
            if (!grid.walkable) {
                var isHorizontal = maxX - minX > maxY - minY;
                for (var _i = 0, _a = grid.nodeId; _i < _a.length; _i++) {
                    var nodeId = _a[_i];
                    var node = diagram.nameTable["" + nodeId];
                    if (node) {
                        var bounds = node.wrapper.bounds;
                        var padding = 5;
                        if (isHorizontal) {
                            if (bounds.top - padding < minY && bounds.bottom + padding > maxY) {
                                return false;
                            }
                        }
                        else {
                            if (bounds.left - padding < minX && bounds.right + padding > maxX) {
                                return false;
                            }
                        }
                    }
                }
            }
        }
        return true;
    };
    LineRouting.prototype.checkObstaclesIntersect = function (segmentPoints, connector, diagram) {
        for (var i = 1; i < segmentPoints.length; i++) {
            var start = segmentPoints[i - 1];
            var end = segmentPoints[parseInt(i.toString(), 10)];
            if (!this.isPathWalkable(start, end, diagram, connector)) {
                return false;
            }
        }
        return true;
    };
    /**
     * refreshConnectorSegments method \
     *
     * @returns { void }     refreshConnectorSegments method .\
     * @param {Diagram} diagram - provide the diagram value.
     * @param {Connector} connector - provide the connector value.
     * @param {boolean} isUpdate - provide the diagram value.
     * @param {boolean} isEnableRouting - provide enableRouting value.
     *
     * @private
     */
    LineRouting.prototype.refreshConnectorSegments = function (diagram, connector, isUpdate, isEnableRouting) {
        if (!connector.sourceID || !connector.targetID || connector.sourceID === connector.targetID) {
            return;
        }
        if (!this.skipObstacleCheck && connector.intermediatePoints
            && this.checkObstaclesIntersect(connector.intermediatePoints, connector, diagram)) {
            if (diagram.avoidLineOverlappingModule && isUpdate) {
                diagram.avoidLineOverlappingModule.addConnector(connector);
                diagram.avoidLineOverlappingModule.refreshModifiedConnectors(diagram);
            }
            return;
        }
        var sourceId = connector.sourceID;
        var targetId = connector.targetID;
        var sourcePortID = connector.sourcePortID;
        var targetPortID = connector.targetPortID;
        var startPoint;
        var targetPoint;
        var sourcePortDirection;
        var targetPortDirection;
        var grid;
        var sourceTop;
        var sourceBottom;
        var isBreak;
        var sourceLeft;
        var sourceRight;
        var targetRight;
        var targetTop;
        var targetBottom;
        var targetLeft;
        if (canEnableRouting(connector, diagram) || isEnableRouting) {
            this.startNode = diagram.nameTable["" + sourceId];
            this.targetNode = diagram.nameTable["" + targetId];
            this.intermediatePoints = [];
            this.startArray = [];
            this.targetGridCollection = [];
            this.sourceGridCollection = [];
            this.startGrid = undefined;
            this.targetGrid = undefined;
            for (var i = 0; i < this.noOfCols; i++) {
                for (var j = 0; j < this.noOfRows; j++) {
                    this.gridCollection[parseInt(j.toString(), 10)][parseInt(i.toString(), 10)].tested
                        = this.gridCollection[parseInt(j.toString(), 10)][parseInt(i.toString(), 10)].parent = undefined;
                    this.gridCollection[parseInt(j.toString(), 10)][parseInt(i.toString(), 10)].previousDistance
                        = this.gridCollection[parseInt(j.toString(), 10)][parseInt(i.toString(), 10)].afterDistance = undefined;
                    this.gridCollection[parseInt(j.toString(), 10)][parseInt(i.toString(), 10)].totalDistance = undefined;
                }
            }
            // Set the source point and target point
            startPoint = this.findEndPoint(connector, true);
            targetPoint = this.findEndPoint(connector, false);
            // Find the start grid and target grid
            for (var i = 0; i < this.noOfRows; i++) {
                for (var j = 0; j < this.noOfCols; j++) {
                    grid = this.gridCollection[parseInt(i.toString(), 10)][parseInt(j.toString(), 10)];
                    var rectangle = new Rect(grid.x, grid.y, grid.width, grid.height);
                    if (rectangle.containsPoint(startPoint) && !this.startGrid &&
                        (grid.nodeId.indexOf(sourceId) !== -1 || sourceId === '')) {
                        this.startGrid = (sourcePortID && this.startGrid &&
                            (sourcePortDirection === 'Left' || sourcePortDirection === 'Top')) ? this.startGrid : grid;
                    }
                    if (rectangle.containsPoint(targetPoint) && !this.targetGrid &&
                        (grid.nodeId.indexOf(targetId) !== -1 || targetId === '')) {
                        this.targetGrid = (targetPortID && this.targetGrid &&
                            (targetPortDirection === 'Left' || targetPortDirection === 'Top')) ? this.targetGrid : grid;
                    }
                    if (!sourcePortID && this.startNode) {
                        var bounds = this.startNode.wrapper.bounds;
                        if (rectangle.containsPoint(bounds.topCenter) && !sourceTop) {
                            sourceTop = grid;
                        }
                        if (rectangle.containsPoint(bounds.middleLeft) && !sourceLeft) {
                            sourceLeft = grid;
                        }
                        if (rectangle.containsPoint(bounds.middleRight) && !sourceRight) {
                            sourceRight = grid;
                        }
                        if (rectangle.containsPoint(bounds.bottomCenter) && !sourceBottom) {
                            sourceBottom = grid;
                        }
                    }
                    if (!targetPortID && this.targetNode) {
                        var bounds = this.targetNode.wrapper.bounds;
                        if (rectangle.containsPoint(bounds.topCenter) && !targetTop) {
                            targetTop = grid;
                        }
                        if (rectangle.containsPoint(bounds.middleLeft) && !targetLeft) {
                            targetLeft = grid;
                        }
                        if (rectangle.containsPoint(bounds.middleRight) && !targetRight) {
                            targetRight = grid;
                        }
                        if (rectangle.containsPoint({ x: bounds.bottomCenter.x, y: bounds.bottomCenter.y }) && !targetBottom) {
                            targetBottom = grid;
                        }
                    }
                }
            }
            this.findEdgeBoundary(sourcePortID, sourceLeft, sourceRight, sourceTop, sourceBottom, true);
            this.findEdgeBoundary(targetPortID, targetLeft, targetRight, targetTop, targetBottom, false);
            this.startGrid.totalDistance = 0;
            this.startGrid.previousDistance = 0;
            this.intermediatePoints.push({ x: this.startGrid.gridX, y: this.startGrid.gridY });
            this.startArray.push(this.startGrid);
            if (connector && targetLeft && targetRight && targetTop && targetBottom) {
                this.checkObstacles(connector, diagram, targetLeft, targetRight, targetTop, targetBottom);
            }
            // eslint-disable-next-line no-labels
            renderPathElement: while (this.startArray.length > 0) {
                var startGridNode = this.startArray.pop();
                //890444:Exception thrown while drag and drop shapes on top of each other repeatedly with Line Routing
                if (startGridNode) {
                    for (var i = 0; i < this.targetGridCollection.length; i++) {
                        var target = this.targetGridCollection[parseInt(i.toString(), 10)];
                        if (startGridNode) {
                            if (startGridNode.gridX === target.gridX && startGridNode.gridY === target.gridY) {
                                this.getIntermediatePoints(startGridNode);
                                this.optimizeIntermediatePoints();
                                if (startGridNode.nodeId && startGridNode.nodeId.length > 1) {
                                    connector.segments = [];
                                }
                                isBreak = this.updateConnectorSegments(diagram, this.intermediatePoints, this.gridCollection, connector, isUpdate);
                                if (!isBreak) {
                                    this.targetGridCollection.splice(this.targetGridCollection.indexOf(target), 1);
                                    startGridNode = this.startArray.pop();
                                }
                                else {
                                    this.considerWalkable = [];
                                    // eslint-disable-next-line no-labels
                                    break renderPathElement;
                                }
                            }
                        }
                    }
                    if (startGridNode) {
                        this.findPath(startGridNode);
                    }
                }
            }
        }
    };
    LineRouting.prototype.checkChildNodes = function (grid, isSource) {
        var check = false;
        var reject = false;
        if (grid.nodeId.length >= 1 && !isSource) {
            for (var i = 0; i < grid.nodeId.length; i++) {
                var id = grid.nodeId[parseInt(i.toString(), 10)];
                for (var j = 0; j < grid.nodeId.length; j++) {
                    if (this.targetNode.parentId === grid.nodeId[parseInt(j.toString(), 10)]) {
                        reject = true;
                    }
                }
                if (!reject && this.targetNode.id === id) {
                    check = true;
                }
                else {
                    check = false;
                }
            }
        }
        else {
            if (grid.nodeId.length === 1) {
                check = true;
            }
        }
        return check;
    };
    LineRouting.prototype.findEdgeBoundary = function (portID, left, right, top, bottom, isSource) {
        var grid;
        var collection = (isSource) ? this.sourceGridCollection : this.targetGridCollection;
        if (!portID && ((isSource) ? this.startNode : this.targetNode)) {
            for (var i = left.gridX; i <= right.gridX; i++) {
                grid = this.gridCollection[parseInt(i.toString(), 10)][left.gridY];
                if ((this.checkChildNodes(grid, isSource) && (i === left.gridX || i === right.gridX)) ||
                    (i !== left.gridX && i !== right.gridX)) {
                    collection.push(grid);
                }
            }
            for (var i = top.gridY; i <= bottom.gridY; i++) {
                grid = this.gridCollection[top.gridX][parseInt(i.toString(), 10)];
                if (((this.checkChildNodes(grid, isSource) && (i === top.gridY || i === bottom.gridY)) ||
                    (i !== top.gridY && i !== bottom.gridY)) && collection.indexOf(grid) === -1) {
                    collection.push(grid);
                }
            }
        }
        else {
            collection.push((isSource) ? this.startGrid : this.targetGrid);
        }
    };
    LineRouting.prototype.checkObstacles = function (connector, diagram, targetLeft, targetRight, targetTop, targetBottom) {
        var neigbours = this.findNearestNeigbours(this.startGrid, this.gridCollection, true);
        if (neigbours.length === 0) {
            if (connector.sourcePortID !== '') {
                var endPoint = { x: connector.sourcePortWrapper.offsetX, y: connector.sourcePortWrapper.offsetY };
                var portDirection = getPortDirection(endPoint, undefined, connector.sourceWrapper.bounds, false);
                if (portDirection === 'Top') {
                    this.resetGridColl(this.startGrid, 'top', true);
                }
                else if (portDirection === 'Right') {
                    this.resetGridColl(this.startGrid, 'right', true);
                }
                else if (portDirection === 'Bottom') {
                    this.resetGridColl(this.startGrid, 'bottom', true);
                }
                else {
                    this.resetGridColl(this.startGrid, 'left', true);
                }
            }
            else {
                this.resetGridColl(this.startGrid, 'top', true);
                this.resetGridColl(this.startGrid, 'right', true);
                this.resetGridColl(this.startGrid, 'bottom', true);
                this.resetGridColl(this.startGrid, 'left', true);
            }
        }
        neigbours = this.findNearestNeigbours(this.targetGrid, this.gridCollection, false);
        if (neigbours.length === 0) {
            if (connector.targetPortID !== '') {
                var endPoint = { x: connector.targetPortWrapper.offsetX, y: connector.targetPortWrapper.offsetY };
                var portDirection = getPortDirection(endPoint, undefined, connector.targetWrapper.bounds, false);
                if (portDirection === 'Top') {
                    this.resetGridColl(this.targetGrid, 'top', true);
                }
                else if (portDirection === 'Right') {
                    this.resetGridColl(this.targetGrid, 'right', true);
                }
                else if (portDirection === 'Bottom') {
                    this.resetGridColl(this.targetGrid, 'bottom', true);
                }
                else {
                    this.resetGridColl(this.targetGrid, 'left', true);
                }
            }
            else {
                this.resetGridColl(this.targetGrid, 'top', false);
                this.resetGridColl(this.targetGrid, 'right', false);
                this.resetGridColl(this.targetGrid, 'bottom', false);
                this.resetGridColl(this.targetGrid, 'left', false);
            }
        }
        if (this.targetGridCollection.length > 1 && this.targetGridCollection[0].nodeId.length > 1) {
            for (var i = 0; i <= 1; i++) {
                var gridX = this.targetGridCollection[parseInt(i.toString(), 10)].gridX;
                var gridY = this.targetGridCollection[parseInt(i.toString(), 10)].gridY;
                var gridNodes = this.targetGridCollection[parseInt(i.toString(), 10)].nodeId;
                var targetNode = void 0;
                for (var k = 0; k < gridNodes.length; k++) {
                    if (this.targetNode.id !== gridNodes[parseInt(k.toString(), 10)]) {
                        targetNode = gridNodes[parseInt(k.toString(), 10)];
                        break;
                    }
                }
                var targetNodewrapper = void 0;
                var overLapNode = void 0;
                var contains = void 0;
                if (diagram.nameTable[this.targetNode.id]) {
                    targetNodewrapper = diagram.nameTable[this.targetNode.id].wrapper;
                }
                if (diagram.nameTable["" + targetNode]) {
                    overLapNode = diagram.nameTable["" + targetNode].wrapper;
                }
                if (targetNodewrapper && overLapNode) {
                    contains = this.contains(overLapNode.bounds, targetNodewrapper.bounds);
                }
                var reject = void 0;
                for (var j = 0; j < gridNodes.length; j++) {
                    if (this.targetNode.parentId === gridNodes[parseInt(j.toString(), 10)]) {
                        reject = true;
                    }
                }
                if (!this.gridCollection[parseInt(gridX.toString(), 10)][parseInt(gridY.toString(), 10)].walkable && contains && !reject) {
                    var grid = void 0;
                    var diff = void 0;
                    grid = this.getEndvalue(targetLeft, 'left');
                    diff = targetLeft.gridX - grid.gridX;
                    this.changeValue(targetLeft, diff, 'left');
                    grid = this.getEndvalue(targetRight, 'right');
                    diff = grid.gridX - targetRight.gridX;
                    this.changeValue(targetRight, diff, 'right');
                    grid = this.getEndvalue(targetTop, 'top');
                    diff = targetTop.gridY - grid.gridY;
                    this.changeValue(targetTop, diff, 'top');
                    grid = this.getEndvalue(targetBottom, 'bottom');
                    diff = targetBottom.gridY - grid.gridY;
                    this.changeValue(targetBottom, diff, 'top');
                }
            }
        }
    };
    LineRouting.prototype.contains = function (rect1, rect2) {
        return rect1.left <= rect2.left && rect1.right >= rect2.right && rect1.top <= rect2.top && rect1.bottom >= rect2.bottom;
    };
    LineRouting.prototype.getEndvalue = function (target, direction) {
        if (!this.gridCollection[target.gridX][target.gridY].walkable) {
            if (direction === 'left') {
                return this.getEndvalue(this.gridCollection[target.gridX - 1][target.gridY], direction);
            }
            if (direction === 'right') {
                return this.getEndvalue(this.gridCollection[target.gridX + 1][target.gridY], direction);
            }
            if (direction === 'top') {
                return this.getEndvalue(this.gridCollection[target.gridX][target.gridY - 1], direction);
            }
            if (direction === 'bottom') {
                return this.getEndvalue(this.gridCollection[target.gridX][target.gridY + 1], direction);
            }
        }
        else {
            return target;
        }
        return target;
    };
    LineRouting.prototype.changeValue = function (targetLeft, diff, direction) {
        if (!targetLeft.walkable) {
            this.considerWalkable.push(targetLeft);
        }
        var grid;
        for (var i = 0; i <= diff; i++) {
            if (direction === 'left') {
                grid = this.gridCollection[targetLeft.gridX - i][targetLeft.gridY];
            }
            else if (direction === 'right') {
                grid = this.gridCollection[targetLeft.gridX + i][targetLeft.gridY];
            }
            else if (direction === 'top') {
                grid = this.gridCollection[targetLeft.gridX][targetLeft.gridY - i];
            }
            else if (direction === 'bottom') {
                grid = this.gridCollection[targetLeft.gridX][targetLeft.gridY + i];
            }
            if (!grid.walkable) {
                this.considerWalkable.push(grid);
            }
        }
    };
    // Get all the intermediated points from target grid
    LineRouting.prototype.getIntermediatePoints = function (target) {
        var distance;
        this.intermediatePoints = [];
        while (target) {
            this.intermediatePoints.push({ x: target.gridX, y: target.gridY });
            target = target.parent;
        }
        this.intermediatePoints.reverse();
        //890444: Exception thrown while drag and drop shapes on top of each other repeatedly with Line Routing
        if (this.intermediatePoints.length >= 1 && this.intermediatePoints[0] !== undefined
            && this.intermediatePoints[1] !== undefined) {
            if (this.intermediatePoints[0].x === this.intermediatePoints[1].x) {
                if (this.intermediatePoints[0].y < this.intermediatePoints[1].y) {
                    distance = this.neigbour(this.startGrid, 'bottom', undefined, true);
                    this.intermediatePoints[0].y += distance - 1;
                }
                else {
                    distance = this.neigbour(this.startGrid, 'top', undefined, true);
                    this.intermediatePoints[0].y -= distance - 1;
                }
            }
            else {
                if (this.intermediatePoints[0].x < this.intermediatePoints[1].x) {
                    distance = this.neigbour(this.startGrid, 'right', undefined, true);
                    this.intermediatePoints[0].x += distance - 1;
                }
                else {
                    distance = this.neigbour(this.startGrid, 'left', undefined, true);
                    this.intermediatePoints[0].x -= distance - 1;
                }
            }
        }
    };
    LineRouting.prototype.optimizeIntermediatePoints = function () {
        this.intermediatePoints = this.removePointsInSameLine(this.intermediatePoints);
        this.intermediatePoints = this.getValidPoints(this.intermediatePoints);
    };
    LineRouting.prototype.removePointsInSameLine = function (points) {
        if (points.length < 3) {
            return points;
        }
        var result = [points[0]];
        for (var i = 1; i < points.length - 1; i++) {
            var prevPoint = result[result.length - 1];
            var currentPoint = points[parseInt(i.toString(), 10)];
            var nextPoint = points[i + 1];
            if (!this.arePointsInSameLine(prevPoint, currentPoint, nextPoint)) {
                result.push(currentPoint);
            }
        }
        result.push(points[points.length - 1]);
        return result;
    };
    LineRouting.prototype.arePointsInSameLine = function (point1, point2, point3) {
        return (point2.x - point1.x) * (point3.y - point1.y) === (point3.x - point1.x) * (point2.y - point1.y);
    };
    LineRouting.prototype.getValidPoints = function (points) {
        if (points.length < 4) {
            return points;
        }
        var i = 1;
        while (i < points.length - 3) {
            var lineStart1 = points[parseInt(i.toString(), 10)];
            var lineEnd1 = points[i + 1];
            var lineStart2 = points[i + 2];
            var lineEnd2 = points[i + 3];
            if (lineStart1.x === lineEnd1.x) {
                if ((lineEnd1.y < lineStart1.y && lineEnd2.y < lineStart2.y)
                    || (lineEnd1.y > lineStart1.y && lineEnd2.y > lineStart2.y)) {
                    var dx = lineStart1.x < lineStart2.x ? 1 : -1;
                    var dy = lineEnd1.y < lineStart1.y ? -1 : 1;
                    var neigbourGridX = lineStart1.x + dx;
                    var neigbourGridY = lineStart1.y;
                    var isValid = false;
                    while (neigbourGridX !== lineEnd2.x || neigbourGridY !== lineEnd2.y) {
                        if (!this.isWalkable(neigbourGridX, neigbourGridY)) {
                            isValid = false;
                            break;
                        }
                        else {
                            isValid = true;
                        }
                        if (neigbourGridX !== lineStart2.x) {
                            neigbourGridX += dx;
                        }
                        else {
                            neigbourGridY += dy;
                        }
                    }
                    if (isValid) {
                        lineStart1.x = lineStart2.x;
                        points.splice(i + 1, 2);
                        continue;
                    }
                }
            }
            else if (lineStart1.y === lineEnd1.y) {
                if ((lineEnd1.x < lineStart1.x && lineEnd2.x < lineStart2.x)
                    || (lineEnd1.x > lineStart1.x && lineEnd2.x > lineStart2.x)) {
                    var dy1 = lineStart1.y < lineStart2.y ? 1 : -1;
                    var dx1 = lineEnd1.x < lineStart1.x ? -1 : 1;
                    var neigbourGridY1 = lineStart1.y + dy1;
                    var neigbourGridX1 = lineStart1.x;
                    var isValid1 = false;
                    while (neigbourGridX1 !== lineEnd2.x || neigbourGridY1 !== lineEnd2.y) {
                        if (!this.isWalkable(neigbourGridX1, neigbourGridY1)) {
                            isValid1 = false;
                            break;
                        }
                        else {
                            isValid1 = true;
                        }
                        if (neigbourGridY1 !== lineStart2.y) {
                            neigbourGridY1 += dy1;
                        }
                        else {
                            neigbourGridX1 += dx1;
                        }
                    }
                    if (isValid1) {
                        lineStart1.y = lineStart2.y;
                        points.splice(i + 1, 2);
                        continue;
                    }
                }
            }
            i++;
        }
        return points;
    };
    // Connector rendering
    /* tslint:disable */
    LineRouting.prototype.updateConnectorSegments = function (diagram, intermediatePoints, gridCollection, connector, isUpdate) {
        var segments = [];
        var seg;
        var targetPoint;
        var pointX;
        var pointY;
        var node;
        var points = [];
        var direction;
        var length;
        var currentdirection;
        var prevDirection;
        var targetWrapper = connector.targetWrapper;
        var sourceWrapper = connector.sourceWrapper;
        var sourcePoint = this.findEndPoint(connector, true);
        if (connector.targetPortID !== '' || !connector.targetWrapper) {
            targetPoint = this.findEndPoint(connector, false, true);
        }
        for (var i = 0; i < intermediatePoints.length; i++) {
            node = gridCollection[intermediatePoints[parseInt(i.toString(), 10)].x][intermediatePoints[parseInt(i.toString(), 10)].y];
            if (node) {
                pointX = node.x + node.width / 2;
                pointY = node.y + node.height / 2;
                points.push({ x: pointX, y: pointY });
                if (i >= 1 && points.length > 1) {
                    if (points[points.length - 2].x !== points[points.length - 1].x) {
                        currentdirection = (points[points.length - 2].x > points[points.length - 1].x) ? 'Left' : 'Right';
                    }
                    else {
                        currentdirection = (points[points.length - 2].y > points[points.length - 1].y) ? 'Top' : 'Bottom';
                    }
                }
                if (i >= 2 && prevDirection === currentdirection && points.length > 1) {
                    points.splice(points.length - 2, 1);
                }
                prevDirection = currentdirection;
            }
        }
        if (points && points.length > 1) {
            for (var j = 0; j < points.length - 1; j++) {
                var currentPoint = points[parseInt(j.toString(), 10)];
                var nextPoint = points[j + 1];
                if (currentPoint.x !== nextPoint.x) {
                    if (j === 0 && connector.sourcePortID === '' && sourceWrapper) {
                        sourcePoint = (currentPoint.x > nextPoint.x)
                            ? sourceWrapper.bounds.middleLeft : sourceWrapper.bounds.middleRight;
                    }
                    if (j === points.length - 2 && connector.targetPortID === '' && targetWrapper) {
                        targetPoint = (currentPoint.x > nextPoint.x)
                            ? targetWrapper.bounds.middleRight : targetWrapper.bounds.middleLeft;
                    }
                    if (j === 0 && sourcePoint) {
                        currentPoint.x = sourcePoint.x;
                        currentPoint.y = nextPoint.y = sourcePoint.y;
                        //Bug:849859 -set node bounds as source point if intersected point exists inside the node
                        if (connector.sourcePortID === '') {
                            var newDirection = currentPoint.x > nextPoint.x ? 'Left' : 'Right';
                            var refPoint = findPoint(sourceWrapper.bounds, getOppositeDirection(newDirection));
                            sourcePoint = getIntersection(connector, sourceWrapper, sourcePoint, refPoint, false);
                        }
                        currentPoint.x = sourcePoint.x;
                    }
                    if (j === points.length - 2 && targetPoint) {
                        if (j > 0 && connector.targetDecorator &&
                            ((targetPoint.x - nextPoint.x) < 0) &&
                            (Math.abs(targetPoint.x - currentPoint.x) < connector.targetDecorator.width + 1)) {
                            currentPoint.x = points[j - 1].x -= this.size / 2;
                        }
                        if (j > 0 && connector.targetDecorator &&
                            ((targetPoint.x - nextPoint.x) > 0) &&
                            (Math.abs(targetPoint.x - currentPoint.x) < connector.targetDecorator.width + 1)) {
                            currentPoint.x = points[j - 1].x += this.size / 2;
                        }
                        nextPoint.x = targetPoint.x;
                        currentPoint.y = nextPoint.y = targetPoint.y;
                    }
                }
                else {
                    //EJ2-855805 - Connector target decorator is not proper in complexhierarchical layout when we call doLayout with line-routing
                    if (j === 0 && connector.sourcePortID === '' && sourceWrapper) {
                        sourcePoint = (currentPoint.y > nextPoint.y)
                            ? sourceWrapper.bounds.topCenter : sourceWrapper.bounds.bottomCenter;
                    }
                    if (j === points.length - 2 && connector.targetPortID === '' && targetWrapper) {
                        targetPoint = (currentPoint.y > nextPoint.y)
                            ? targetWrapper.bounds.bottomCenter : targetWrapper.bounds.topCenter;
                    }
                    if (j === 0 && sourcePoint) {
                        currentPoint.y = sourcePoint.y;
                        currentPoint.x = nextPoint.x = sourcePoint.x;
                        //Bug:849859 -set node bounds as source point if intersected point exists inside the node
                        if (connector.sourcePortID === '') {
                            var newDirection1 = currentPoint.y > nextPoint.y ? 'Top' : 'Bottom';
                            var refPoint = findPoint(sourceWrapper.bounds, getOppositeDirection(newDirection1));
                            sourcePoint = getIntersection(connector, sourceWrapper, sourcePoint, refPoint, false);
                        }
                        currentPoint.y = sourcePoint.y;
                    }
                    if (j === points.length - 2 && targetPoint) {
                        if (j > 0 && connector.targetDecorator &&
                            ((targetPoint.y - nextPoint.y) < 0) &&
                            (Math.abs(targetPoint.y - currentPoint.y) < connector.targetDecorator.height + 1)) {
                            currentPoint.y = points[j - 1].y -= this.size / 2;
                        }
                        if (j > 0 && connector.targetDecorator &&
                            ((targetPoint.y - nextPoint.y) > 0) &&
                            (Math.abs(targetPoint.y - currentPoint.y) < connector.targetDecorator.height + 1)) {
                            currentPoint.y = points[j - 1].y += this.size / 2;
                        }
                        nextPoint.y = targetPoint.y;
                        currentPoint.x = nextPoint.x = targetPoint.x;
                    }
                }
            }
            if (diagram.avoidLineOverlappingModule && isUpdate) {
                diagram.avoidLineOverlappingModule.addConnector(connector, points);
                var modifiedConnectors = diagram.avoidLineOverlappingModule.getModifiedConnector();
                if (modifiedConnectors.has(connector)) {
                    segments = diagram.avoidLineOverlappingModule.getModifiedConnectorSegments(connector);
                    modifiedConnectors.delete(connector);
                }
                if (modifiedConnectors.size > 0) {
                    diagram.avoidLineOverlappingModule.refreshModifiedConnectors(diagram);
                }
            }
            if (segments.length === 0) {
                for (var j = 0; j < points.length - 1; j++) {
                    var currentPoint = points[parseInt(j.toString(), 10)];
                    var nextPoint = points[j + 1];
                    if (currentPoint.x !== nextPoint.x) {
                        if (currentPoint.x > nextPoint.x) {
                            direction = 'Left';
                            length = currentPoint.x - nextPoint.x;
                        }
                        else {
                            direction = 'Right';
                            length = nextPoint.x - currentPoint.x;
                        }
                    }
                    else {
                        if (currentPoint.y > nextPoint.y) {
                            direction = 'Top';
                            length = currentPoint.y - nextPoint.y;
                        }
                        else {
                            direction = 'Bottom';
                            length = nextPoint.y - currentPoint.y;
                        }
                    }
                    seg = { type: 'Orthogonal', length: length, direction: direction };
                    segments.push(seg);
                }
            }
        }
        if (segments && segments.length > 0) {
            var lastSeg = segments[segments.length - 1];
            if (segments.length === 1) {
                lastSeg.length -= 20;
            }
            if (lastSeg.length < 10 && segments.length === 2) {
                segments.pop();
                if (segments.length > 0) {
                    segments[0].length -= 20;
                    lastSeg = segments[0];
                }
            }
            if (connector.targetDecorator &&
                ((lastSeg.direction === 'Top' || lastSeg.direction === 'Bottom') && lastSeg.length > connector.targetDecorator.height + 1) ||
                ((lastSeg.direction === 'Right' || lastSeg.direction === 'Left') && lastSeg.length > connector.targetDecorator.width + 1)) {
                if (isUpdate || !diagram.avoidLineOverlappingModule) {
                    connector.segments = segments;
                }
                if (isUpdate) {
                    diagram.connectorPropertyChange(connector, {}, { type: 'Orthogonal', segments: segments });
                }
                return true;
            }
        }
        return false;
    };
    /* tslint:enable */
    // Shortest path
    LineRouting.prototype.findPath = function (startGrid) {
        var intermediatePoint;
        var collection = [];
        var neigbours = this.findNearestNeigbours(startGrid, this.gridCollection, true);
        for (var i = 0; i < neigbours.length; i++) {
            intermediatePoint = this.findIntermediatePoints(neigbours[parseInt(i.toString(), 10)].gridX, neigbours[parseInt(i.toString(), 10)].gridY, startGrid.gridX, startGrid.gridY, this.targetGrid.gridX, this.targetGrid.gridY);
            if (intermediatePoint !== null) {
                var grid = this.gridCollection[intermediatePoint.x][intermediatePoint.y];
                var h = this.octile(Math.abs(intermediatePoint.x - startGrid.gridX), Math.abs(intermediatePoint.y - startGrid.gridY));
                if (startGrid.parent && startGrid.parent.parent) {
                    if (grid.gridX !== startGrid.parent.gridX && grid.gridY !== startGrid.parent.gridY) {
                        h += 0.1;
                    }
                }
                var l = startGrid.previousDistance + h;
                if ((!grid.previousDistance || grid.previousDistance > l) &&
                    (!(intermediatePoint.x === startGrid.gridX && intermediatePoint.y === startGrid.gridY))) {
                    collection.push(intermediatePoint);
                    grid.previousDistance = l;
                    grid.afterDistance = grid.afterDistance || this.manhattan(Math.abs(intermediatePoint.x - this.targetGrid.gridX), Math.abs(intermediatePoint.y - this.targetGrid.gridY));
                    grid.totalDistance = grid.previousDistance + grid.afterDistance;
                    grid.parent = startGrid;
                }
            }
        }
        if (collection.length > 0) {
            for (var i = 0; i < collection.length; i++) {
                var grid = this.gridCollection[collection[parseInt(i.toString(), 10)].x][collection[parseInt(i.toString(), 10)].y];
                if (this.startArray.indexOf(grid) === -1) {
                    this.startArray.push(grid);
                }
            }
        }
        this.sorting(this.startArray);
    };
    // sorting the array based on total distance between source and target node
    LineRouting.prototype.sorting = function (array) {
        var done = false;
        while (!done) {
            done = true;
            for (var i = 1; i < array.length; i += 1) {
                if (array[i - 1].totalDistance < array[parseInt(i.toString(), 10)].totalDistance) {
                    done = false;
                    var tmp = array[i - 1];
                    array[i - 1] = array[parseInt(i.toString(), 10)];
                    array[parseInt(i.toString(), 10)] = tmp;
                }
            }
        }
        return array;
    };
    LineRouting.prototype.octile = function (t, e) {
        var r = Math.SQRT2 - 1;
        return e > t ? r * t + e : r * e + t;
    };
    LineRouting.prototype.manhattan = function (t, e) {
        return t + e;
    };
    // Find the nearest neigbour from the current boundaries, the neigbour is use to find next intermdiate point.
    LineRouting.prototype.findNearestNeigbours = function (startGrid, gridCollection, isSource) {
        var neigbours = [];
        var parent = startGrid.parent;
        if (parent) {
            var dx = (startGrid.gridX - parent.gridX) / Math.max(Math.abs(startGrid.gridX - parent.gridX), 1);
            var dy = (startGrid.gridY - parent.gridY) / Math.max(Math.abs(startGrid.gridY - parent.gridY), 1);
            if (dx !== 0) {
                if (this.isWalkable(startGrid.gridX, startGrid.gridY - 1, true) &&
                    this.sourceGridCollection.indexOf(gridCollection[startGrid.gridX][startGrid.gridY - 1]) === -1) {
                    neigbours.push(gridCollection[startGrid.gridX][startGrid.gridY - 1]);
                }
                if (this.isWalkable(startGrid.gridX, startGrid.gridY + 1, true) &&
                    this.sourceGridCollection.indexOf(gridCollection[startGrid.gridX][startGrid.gridY + 1])) {
                    neigbours.push(gridCollection[startGrid.gridX][startGrid.gridY + 1]);
                }
                if (this.isWalkable(startGrid.gridX + dx, startGrid.gridY, true) &&
                    this.sourceGridCollection.indexOf(gridCollection[startGrid.gridX + dx][startGrid.gridY]) === -1) {
                    neigbours.push(gridCollection[startGrid.gridX + dx][startGrid.gridY]);
                }
            }
            else if (dy !== 0) {
                if (this.isWalkable(startGrid.gridX - 1, startGrid.gridY, true) &&
                    this.sourceGridCollection.indexOf(gridCollection[startGrid.gridX - 1][startGrid.gridY]) === -1) {
                    neigbours.push(gridCollection[startGrid.gridX - 1][startGrid.gridY]);
                }
                if (this.isWalkable(startGrid.gridX + 1, startGrid.gridY, true) &&
                    this.sourceGridCollection.indexOf(gridCollection[startGrid.gridX + 1][startGrid.gridY]) === -1) {
                    neigbours.push(gridCollection[startGrid.gridX + 1][startGrid.gridY]);
                }
                if (this.isWalkable(startGrid.gridX, startGrid.gridY + dy, true) &&
                    this.sourceGridCollection.indexOf(gridCollection[startGrid.gridX][startGrid.gridY + dy]) === -1) {
                    neigbours.push(gridCollection[startGrid.gridX][startGrid.gridY + dy]);
                }
            }
        }
        else {
            this.neigbour(startGrid, 'top', neigbours, isSource);
            this.neigbour(startGrid, 'right', neigbours, isSource);
            this.neigbour(startGrid, 'bottom', neigbours, isSource);
            this.neigbour(startGrid, 'left', neigbours, isSource);
        }
        return neigbours;
    };
    LineRouting.prototype.neigbour = function (startGrid, direction, neigbours, isSource) {
        var i = 1;
        var nearGrid;
        while (i > 0) {
            var x = (direction === 'top' || direction === 'bottom') ?
                (startGrid.gridX) : ((direction === 'left') ? startGrid.gridX - i : startGrid.gridX + i);
            var y = (direction === 'right' || direction === 'left') ?
                (startGrid.gridY) : ((direction === 'top') ? startGrid.gridY - i : startGrid.gridY + i);
            nearGrid = this.gridCollection[parseInt(x.toString(), 10)][parseInt(y.toString(), 10)];
            if (nearGrid && ((isSource && this.sourceGridCollection.indexOf(nearGrid) === -1)
                || (!isSource && this.targetGridCollection.indexOf(nearGrid) === -1))) {
                if (neigbours && this.isWalkable(x, y)) {
                    neigbours.push(nearGrid);
                }
                return i;
            }
            if (x > 0 && y > 0) {
                i++;
            }
            else {
                break;
            }
        }
        return null;
    };
    LineRouting.prototype.resetGridColl = function (grid, direction, isSource) {
        var i = 1;
        var nearGrid;
        while (i > 0) {
            var x = (direction === 'top' || direction === 'bottom') ?
                (grid.gridX) : ((direction === 'left') ? grid.gridX - i : grid.gridX + i);
            var y = (direction === 'right' || direction === 'left') ?
                (grid.gridY) : ((direction === 'top') ? grid.gridY - i : grid.gridY + i);
            nearGrid = this.gridCollection[parseInt(x.toString(), 10)][parseInt(y.toString(), 10)];
            if (nearGrid && ((isSource && this.sourceGridCollection.indexOf(nearGrid) === -1) ||
                (!isSource && this.targetGridCollection.indexOf(nearGrid) === -1))) {
                if (this.isWalkable(x, y)) {
                    break;
                }
                else {
                    var grid_1 = this.gridCollection[parseInt(x.toString(), 10)][parseInt(y.toString(), 10)];
                    this.considerWalkable.push(grid_1);
                }
            }
            if (x > 0 && y > 0) {
                if (direction === 'top' || direction === 'left') {
                    i--;
                }
                else {
                    i++;
                }
            }
            else {
                break;
            }
        }
        return null;
    };
    LineRouting.prototype.isWalkable = function (x, y, isparent) {
        if (x >= 0 && x < this.noOfRows && y >= 0 && y < this.noOfCols) {
            var grid = this.gridCollection[parseInt(x.toString(), 10)][parseInt(y.toString(), 10)];
            if (grid && (grid.walkable || ((grid.nodeId.length === 1 || (grid.nodeId.length === 2 && grid.parentNodeId
                || (this.considerWalkable.indexOf(grid) !== -1))) &&
                (this.sourceGridCollection.indexOf(grid) !== -1 || this.targetGridCollection.indexOf(grid) !== -1 ||
                    this.considerWalkable.indexOf(grid) !== -1)))) {
                if ((isparent && !grid.parent) || !isparent) {
                    return true;
                }
            }
        }
        return false;
    };
    LineRouting.prototype.findIntermediatePoints = function (neigbourGridX, neigbourGridY, startGridX, startGridY, endGridX, endGridY) {
        var dx = neigbourGridX - startGridX;
        var dy = neigbourGridY - startGridY;
        var gridX = neigbourGridX;
        var gridY = neigbourGridY;
        for (var i = 0; i < this.targetGridCollection.length; i++) {
            if (neigbourGridX === this.targetGridCollection[parseInt(i.toString(), 10)].gridX
                && neigbourGridY === this.targetGridCollection[parseInt(i.toString(), 10)].gridY) {
                return { x: neigbourGridX, y: neigbourGridY };
            }
        }
        if (!this.isWalkable(neigbourGridX, neigbourGridY)) {
            return null;
        }
        var neigbourGrid = this.gridCollection[parseInt(neigbourGridX.toString(), 10)][parseInt(neigbourGridY.toString(), 10)];
        if (neigbourGrid.tested) {
            return { x: neigbourGridX, y: neigbourGridY };
        }
        neigbourGrid.tested = true;
        if (dx !== 0) {
            dx = (dx > 0) ? 1 : -1;
            if ((this.isWalkable(gridX, gridY - 1) && !this.isWalkable(gridX - dx, gridY - 1)) ||
                (this.isWalkable(gridX, gridY + 1) && !this.isWalkable(gridX - dx, gridY + 1))) {
                return { x: neigbourGridX, y: neigbourGridY };
            }
        }
        if (dy !== 0) {
            dy = (dy > 0) ? 1 : -1;
            if ((this.isWalkable(gridX - 1, gridY) && !this.isWalkable(gridX - 1, gridY - dy)) ||
                (this.isWalkable(gridX + 1, gridY) && !this.isWalkable(gridX + 1, gridY - dy))) {
                return { x: neigbourGridX, y: neigbourGridY };
            }
            if (this.findIntermediatePoints(gridX + 1, gridY, gridX, gridY, endGridX, endGridY) ||
                this.findIntermediatePoints(gridX - 1, gridY, gridX, gridY, endGridX, endGridY)) {
                return { x: neigbourGridX, y: neigbourGridY };
            }
        }
        return this.findIntermediatePoints(gridX + dx, gridY + dy, gridX, gridY, endGridX, endGridY);
    };
    /**
     *To destroy the line routing
     *
     * @returns {void} To destroy the line routing
     */
    LineRouting.prototype.destroy = function () {
        /**
         * Destroys the line routing module
         */
    };
    /**
     * Core method to return the component name.
     *
     * @returns {string}  Core method to return the component name.
     * @private
     */
    LineRouting.prototype.getModuleName = function () {
        /**
         * Returns the module name
         */
        return 'LineRouting';
    };
    return LineRouting;
}());
export { LineRouting };
