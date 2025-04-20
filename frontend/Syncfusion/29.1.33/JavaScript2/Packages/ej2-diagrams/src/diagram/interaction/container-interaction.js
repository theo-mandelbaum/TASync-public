import { isBlazor } from '@syncfusion/ej2-base';
import { Node } from '../objects/node';
import { Diagram } from '../diagram';
import { Selector } from '../objects/node';
import { Size } from '../primitives/size';
import { cloneObject } from './../utility/base-util';
import { getObjectType } from './../utility/diagram-util';
import { Rect } from '../primitives/rect';
import { getAdornerLayerSvg } from '../utility/dom-util';
import { swimLaneMeasureAndArrange, checkLaneSize, checkPhaseOffset, canLaneInterchange } from '../utility/swim-lane-util';
import { updatePhaseMaxWidth, updateHeaderMaxWidth, updateConnectorsProperties } from '../utility/swim-lane-util';
import { considerSwimLanePadding } from '../utility/swim-lane-util';
import { DiagramAction, DiagramConstraints, NodeConstraints } from '../enum/enum';
import { getDiagramElement } from '../utility/dom-util';
/**
 * Interaction for Container
 */
//#region canvas Container interaction
/**
 * updateCanvasBounds method\
 *
 * @returns {  void }    updateCanvasBounds method .\
 * @param {Diagram} diagram - provide the diagram value.
 * @param {NodeModel | ConnectorModel} obj - provide the isVertical value.
 * @param {PointModel} position - provide the position value.
 * @param {boolean} isBoundsUpdate - provide the isBoundsUpdate value.
 * @private
 */
export function updateCanvasBounds(diagram, obj, position, isBoundsUpdate) {
    var container;
    var connectorList = [];
    var groupAction = false;
    if (checkParentAsContainer(diagram, obj, true)) {
        diagram.protectPropertyChange(true);
        container = diagram.nameTable[obj.parentId];
        var wrapper = container.wrapper;
        if (diagram.selectedItems.nodes.length > 1) {
            diagram.multiselect = true;
        }
        else {
            diagram.multiselect = false;
        }
        if (container && container.container.type === 'Canvas') {
            if ((isBoundsUpdate || (wrapper.bounds.x <= position.x && wrapper.bounds.right >= position.x &&
                (wrapper.bounds.y <= position.y && wrapper.bounds.bottom >= position.y) && !diagram.multiselect))) {
                var parentWrapper = void 0;
                var y = wrapper.bounds.y;
                var x = wrapper.bounds.x;
                var parent_1 = diagram.nameTable[container.parentId] || container;
                var shape = parent_1.shape;
                if (shape.type === 'SwimLane') {
                    groupAction = updateLaneBoundsAfterAddChild(container, parent_1, obj, diagram, true);
                }
                else {
                    var parent_2 = diagram.nameTable[container.parentId] || container;
                    var shape_1 = parent_2.shape;
                    parentWrapper = parent_2.wrapper;
                    if (wrapper.actualSize.width < wrapper.outerBounds.width &&
                        (!(wrapper.bounds.x > wrapper.outerBounds.x))) {
                        if (container.rowIndex !== undefined) {
                            //const columnIndex:number = parent.columns.length - 1;
                            parentWrapper.updateColumnWidth(container.columnIndex, wrapper.outerBounds.width, true);
                            if (shape_1.orientation === 'Horizontal' && shape_1.phaseSize) {
                                updatePhaseMaxWidth(parent_2, diagram, wrapper, container.columnIndex);
                            }
                            updateHeaderMaxWidth(diagram, parent_2);
                            diagram.drag(parent_2, x - wrapper.bounds.x, y - wrapper.bounds.y);
                        }
                        else {
                            diagram.scale(container, (1 + ((wrapper.outerBounds.width - wrapper.actualSize.width) / wrapper.actualSize.width)), 1, ((wrapper.outerBounds.x < wrapper.bounds.x) ? { x: 1, y: 0.5 } : { x: 0, y: 0.5 }));
                        }
                    }
                    if (wrapper.actualSize.height < wrapper.outerBounds.height &&
                        (!(wrapper.bounds.y > wrapper.outerBounds.y))) {
                        if (container.rowIndex !== undefined) {
                            parentWrapper.updateRowHeight(container.rowIndex, wrapper.outerBounds.height, true);
                            diagram.drag(parent_2, x - wrapper.bounds.x, y - wrapper.bounds.y);
                        }
                        else {
                            diagram.scale(container, 1, (1 + ((wrapper.outerBounds.height - wrapper.actualSize.height) / wrapper.actualSize.height)), ((wrapper.outerBounds.y < wrapper.bounds.y) ? { x: 0.5, y: 1 } : { x: 0.5, y: 0 }));
                        }
                    }
                }
            }
            diagram.select([obj]);
            updateConnectorsProperties(connectorList, diagram);
        }
        diagram.protectPropertyChange(false);
    }
    return groupAction;
}
/**
 * removeChildInContainer method\
 *
 * @returns {  void }    removeChildInContainer method .\
 * @param {Diagram} diagram - provide the diagram value.
 * @param {NodeModel | ConnectorModel} obj - provide the isVertical value.
 * @param {PointModel} position - provide the position value.
 * @param {boolean} isBoundsUpdate - provide the isBoundsUpdate value.
 * @private
 */
export function removeChildInContainer(diagram, obj, position, isBoundsUpdate) {
    var container; //let connectorList: string[] = [];
    if (checkParentAsContainer(diagram, obj, true) && !(diagram.cancelPositionChange)) {
        var isProtectedOnChange = 'isProtectedOnChange';
        var propertyChangeValue = diagram["" + isProtectedOnChange];
        diagram.protectPropertyChange(true);
        container = diagram.nameTable[obj.parentId];
        var wrapper = container.wrapper;
        if (container && container.container.type === 'Canvas') {
            if ((!isBoundsUpdate && (!(wrapper.bounds.x <= position.x && wrapper.bounds.right >= position.x &&
                (wrapper.bounds.y <= position.y && wrapper.bounds.bottom >= position.y))))) {
                if (!(obj.constraints & NodeConstraints.AllowMovingOutsideLane)) {
                    var undoObj = cloneObject(obj);
                    diagram.clearSelection();
                    removeChildrenInLane(diagram, obj);
                    obj.parentId = '';
                    //EJ2-65676 - Exception throws on updating node annotation after drag and drop from swimlane to diagram canvas.
                    obj.parentObj = diagram;
                    obj.propName = 'nodes';
                    var entry = {
                        type: 'ChildCollectionChanged', category: 'Internal',
                        undoObject: undoObj, redoObject: cloneObject(obj)
                    };
                    diagram.addHistoryEntry(entry);
                    if (diagram.commandHandler.isContainer) {
                        diagram.commandHandler.isContainer = false;
                        diagram.endGroupAction();
                    }
                    moveSwinLaneChild(obj, diagram);
                }
            }
        }
        diagram.protectPropertyChange(propertyChangeValue);
    }
}
/**
 * findBounds method\
 *
 * @returns {  NodeModel | ConnectorModel  }    findBounds method .\
 * @param {NodeModel} obj - provide the diagram value.
 * @param {number} columnIndex - provide the isVertical value.
 * @param {boolean} isHeader - provide the isVertical value.
 * @private
 */
export function findBounds(obj, columnIndex, isHeader) {
    var rect = new Rect();
    var rows = (obj.shape.type === 'SwimLane') ?
        obj.wrapper.children[0].rows : obj.wrapper.rows;
    for (var i = ((isHeader) ? 1 : 0); i < rows.length; i++) {
        rect.uniteRect(rows[parseInt(i.toString(), 10)].cells[parseInt(columnIndex.toString(), 10)].bounds);
    }
    return rect;
}
/**
 * createHelper method\
 *
 * @returns {  NodeModel | ConnectorModel  }    createHelper method .\
 * @param {Diagram} diagram - provide the diagram value.
 * @param {NodeModel | ConnectorModel} obj - provide the isVertical value.
 * @private
 */
export function createHelper(diagram, obj) {
    var newObj;
    var cloneObject = {};
    for (var _i = 0, _a = Object.keys(obj); _i < _a.length; _i++) {
        var prop = _a[_i];
        cloneObject["" + prop] = obj["" + prop];
    }
    if (getObjectType(obj) === Node) {
        newObj = new Node(diagram, 'nodes', cloneObject, true);
        newObj.id = obj.id;
        diagram.initObject(newObj);
    }
    diagram.updateDiagramObject(newObj);
    return newObj;
}
/**
 * renderContainerHelper method\
 *
 * @returns {  NodeModel | ConnectorModel  }    renderContainerHelper method .\
 * @param {Diagram} diagram - provide the diagram value.
 * @param {NodeModel | ConnectorModel} obj - provide the isVertical value.
 * @private
 */
export function renderContainerHelper(diagram, obj) {
    diagram.enableServerDataBinding(false);
    var object;
    var container;
    var nodes;
    if (!isBlazor()) {
        if (diagram.selectedObject.helperObject) {
            nodes = diagram.selectedObject.helperObject;
        }
        else if (diagram.selectedItems.nodes.length > 0 || diagram.selectedItems.connectors.length > 0) {
            if (obj instanceof Selector && obj.nodes.length + obj.connectors.length === 1) {
                object = (obj.nodes.length > 0) ? obj.nodes[0] : obj.connectors[0];
                container = diagram.selectedItems.wrapper.children[0];
            }
            else {
                object = obj;
                //Removed isBlazor code
                container = diagram.selectedItems.wrapper;
            }
            diagram.selectedObject.actualObject = object;
            // Added below code to render helper object for multiselected nodes inside swimlane to avoid interaction related issues.
            var dragObject = object instanceof Selector
                ? (object.nodes.length > 0 ? object.nodes[0] : object) : object;
            diagram.selectedObject.actualObject = object;
            if ((!diagram.currentSymbol) && (((dragObject.isLane && canLaneInterchange(dragObject, diagram) &&
                checkParentAsContainer(diagram, dragObject))
                || ((!dragObject.isLane) && checkParentAsContainer(diagram, dragObject))) ||
                ((diagram.constraints & DiagramConstraints.LineRouting) && diagram.selectedItems.nodes.length > 0))) {
                var node = {
                    id: 'helper',
                    rotateAngle: container.rotateAngle,
                    offsetX: container.offsetX, offsetY: container.offsetY,
                    minWidth: container.minWidth, minHeight: container.minHeight,
                    maxWidth: container.maxWidth, maxHeight: container.maxHeight,
                    width: container.actualSize.width,
                    height: container.actualSize.height,
                    style: { strokeDashArray: '2 2', fill: 'transparent', strokeColor: '#7D7D7D', strokeWidth: 2 }
                };
                nodes = createHelper(diagram, node);
                diagram.selectedObject.helperObject = nodes;
            }
        }
    }
    diagram.enableServerDataBinding(true);
    return nodes;
}
/**
 * checkParentAsContainer method\
 *
 * @returns {  void  }    checkParentAsContainer method .\
 * @param {Diagram} diagram - provide the diagram value.
 * @param {NodeModel | ConnectorModel} obj - provide the isVertical value.
 * @param {boolean} isChild - provide the isChild value.
 * @private
 */
export function checkParentAsContainer(diagram, obj, isChild) {
    var parentNode = (isChild) ? diagram.nameTable[obj.parentId] :
        (diagram.nameTable[obj.parentId] || obj);
    if (parentNode && parentNode.container) {
        return true;
    }
    return false;
}
/**
 * checkChildNodeInContainer method\
 *
 * @returns {  void  }    checkChildNodeInContainer method .\
 * @param {Diagram} diagram - provide the diagram value.
 * @param {NodeModel} obj - provide the isVertical value.
 * @private
 */
export function checkChildNodeInContainer(diagram, obj) {
    var parentNode = diagram.nameTable[obj.parentId];
    obj.laneMargin = { left: obj.margin.left, right: obj.margin.right, top: obj.margin.top, bottom: obj.margin.bottom };
    //To handle the resize of bpmn node which has text annotation inside swimlane
    if (obj.hasTextAnnotation) {
        for (var i = 0; i < obj.outEdges.length; i++) {
            var connector = diagram.nameTable[obj.outEdges[parseInt(i.toString(), 10)]];
            if (connector.isBpmnAnnotationConnector) {
                var textNode = diagram.nameTable[connector.targetID];
                var oldObject = { width: obj.wrapper.actualSize.width, height: obj.wrapper.actualSize.height,
                    offsetX: obj.wrapper.offsetX, offsetY: obj.wrapper.offsetY };
                var oldX = obj.wrapper.offsetX;
                var oldY = obj.wrapper.offsetY;
                var offset = diagram.getTextAnnotationOffset(obj, textNode, oldObject, oldX, oldY);
                var difX = offset.x - oldX;
                var difY = offset.y - oldY;
                if (difX || difY || obj.width !== obj.wrapper.actualSize.width || obj.height !== obj.wrapper.actualSize.height) {
                    obj.isResized = true;
                    if (!obj.resizeDif) {
                        obj.resizeDif = [];
                    }
                    obj.resizeDif[textNode.id] = { x: difX, y: difY };
                }
            }
        }
    }
    if (parentNode.container.type === 'Canvas') {
        obj.margin.left = (obj.offsetX - parentNode.wrapper.bounds.x - (obj.width / 2));
        obj.margin.top = (obj.offsetY - parentNode.wrapper.bounds.y - (obj.height / 2));
    }
    diagram.nodePropertyChange(obj, {}, {
        width: obj.width, height: obj.height,
        offsetX: obj.offsetX, offsetY: obj.offsetY,
        margin: {
            left: obj.margin.left,
            right: obj.margin.right, top: obj.margin.top,
            bottom: obj.margin.bottom
        }, rotateAngle: obj.rotateAngle
    });
    //EJ2-913789 - Lane size gets varied upon undo redo the node drop
    if (diagram.undoRedoModule && parentNode.isLane && diagram.undoRedoModule.checkRedo &&
        (obj.margin.left < 0 || obj.margin.top < 0)) {
        removeChildrenInLane(diagram, obj);
    }
    if (!parentNode.isLane) {
        parentNode.wrapper.measure(new Size());
        parentNode.wrapper.arrange(parentNode.wrapper.desiredSize);
    }
}
function removeChildrenInLane(diagram, node) {
    if (node.parentId && node.parentId !== '') {
        var prevParentNode = diagram.nameTable[node.parentId];
        if (prevParentNode.isLane && prevParentNode.parentId) {
            var swimlane = diagram.nameTable[prevParentNode.parentId];
            var canvasId = (prevParentNode.id.slice(swimlane.id.length));
            var prevParentId = canvasId.substring(0, canvasId.length - 1);
            var lanes = swimlane.shape.lanes;
            var lane = void 0;
            for (var i = 0; i < lanes.length; i++) {
                lane = lanes[parseInt(i.toString(), 10)];
                if (prevParentId === lane.id) {
                    for (var j = 0; j < lane.children.length; j++) {
                        if (lane.children[parseInt(j.toString(), 10)].id === node.id) {
                            lane.children.splice(j, 1);
                            j--;
                        }
                    }
                }
            }
        }
        diagram.deleteChild(node);
    }
}
/**
 *
 * @param { NodeModel | ConnectorModel} obj - Provide the obj value.
 * @param { NodeModel } swimlane  - Provide the swimlane value.
 * @param { Diagram } diagram - Provide the diagram value.
 * @returns { void } updateZindex method .\
 * @private
 */
export function updateZindex(obj, swimlane, diagram) {
    var objLayer = diagram.commandHandler.getObjectLayer(obj.id);
    var zIndexTable = objLayer.zIndexTable;
    var targetZIndex = swimlane.zIndex + 1;
    // Find a unique zIndex
    while (zIndexTable[parseInt(targetZIndex.toString(), 10)] !== undefined) {
        targetZIndex++;
    }
    // Assign the unique zIndex to the node
    delete objLayer.zIndexTable[obj.zIndex];
    obj.zIndex = targetZIndex;
    objLayer.zIndexTable[parseInt(targetZIndex.toString(), 10)] = obj.id;
}
/**
 * addChildToContainer method\
 *
 * @returns {  void  }    addChildToContainer method .\
 * @param {DiagramElement} diagram - provide the element value.
 * @param {boolean} parent - provide the isVertical value.
 * @param {PointModel} node - provide the node value.
 * @param {Diagram} isUndo - provide the isUndo value.
 * @param {boolean} historyAction - provide the historyAction value.
 * @param {boolean} canUpdateZindex - provide the canUpdateZindex value.
 * @private
 */
export function addChildToContainer(diagram, parent, node, isUndo, historyAction, canUpdateZindex) {
    if (!diagram.currentSymbol) {
        diagram.protectPropertyChange(true);
        var swimlane = diagram.nameTable[parent.parentId];
        node = diagram.getObject(node.id) || node;
        //Bug 909155: Issue in connecting nodes with ports.
        //When we add child nodes at runtime and perform undo redo, the child node is not selectable as the zIndex of swimlane is higher than child node.
        //Added below code to update the zIndex of the child node.
        if (swimlane && swimlane.zIndex > node.zIndex && canUpdateZindex) {
            updateZindex(node, swimlane, diagram);
        }
        var child = (diagram.nodes.indexOf(node) !== -1) ? node.id : node;
        if (parent.container.type === 'Canvas' && !historyAction) {
            var left = (node.wrapper.offsetX - node.wrapper.actualSize.width / 2) -
                (parent.wrapper.offsetX - parent.wrapper.actualSize.width / 2);
            var top_1 = (node.wrapper.offsetY - node.wrapper.actualSize.height / 2) -
                (parent.wrapper.offsetY - parent.wrapper.actualSize.height / 2);
            node.margin.left = left;
            node.margin.top = top_1;
        }
        else if (swimlane) {
            var swimLaneBounds = swimlane.wrapper.bounds;
            var parentBounds = parent.wrapper.bounds;
            if (swimlane.shape.orientation === 'Horizontal') {
                node.margin.left -= parentBounds.x - swimLaneBounds.x;
            }
            else {
                var laneHeaderId = parent.parentId + swimlane.shape.lanes[0].id + '_0_header';
                node.margin.top -= parentBounds.y - swimLaneBounds.y - diagram.nameTable["" + laneHeaderId].wrapper.bounds.height;
            }
        }
        var container = diagram.nameTable[parent.id];
        if (!container.children) {
            container.children = [];
        }
        if (container.children.indexOf(node.id) === -1) {
            removeChildrenInLane(diagram, node);
            if (diagram.getObject(node.id)) {
                diagram.removeElements(node);
            }
            var undoObj = cloneObject(node);
            diagram.addChild(container, child);
            node = diagram.getObject(node.id);
            if (container.isLane && container.parentId) {
                swimlane = diagram.nameTable[container.parentId];
                var lanes = swimlane.shape.lanes;
                var canvasId = (container.id.slice(swimlane.id.length));
                var currentParentId = canvasId.substring(0, canvasId.length - 1);
                for (var i = 0; i < lanes.length; i++) {
                    if (container.isLane && currentParentId === lanes[parseInt(i.toString(), 10)].id) {
                        // eslint-disable-next-line
                        if (!(node.parentObj instanceof Diagram)) {
                            // eslint-disable-next-line
                            node.parentObj = lanes[parseInt(i.toString(), 10)];
                        }
                        // 878719: Resolve ESLint errors
                        // eslint-disable-next-line no-prototype-builtins
                        if (!diagram.nameTable.hasOwnProperty(node.id)) {
                            lanes[parseInt(i.toString(), 10)].children.push(node);
                        }
                    }
                }
            }
            diagram.updateDiagramObject(node);
            moveSwinLaneChild(node, diagram);
            if (!container.parentId) {
                diagram.updateDiagramObject(container);
            }
            else if (!isUndo) {
                if (!diagram.multiselect) {
                    updateLaneBoundsAfterAddChild(container, swimlane, node, diagram);
                }
                else {
                    considerSwimLanePadding(diagram, node, 20);
                    diagram.updateDiagramElementQuad();
                }
            }
            if (!(diagram.diagramActions & DiagramAction.UndoRedo)) {
                var entry = {
                    type: 'ChildCollectionChanged', category: 'Internal',
                    undoObject: undoObj, redoObject: cloneObject(node), historyAction: historyAction ? 'AddNodeToLane' : undefined
                };
                diagram.addHistoryEntry(entry);
            }
        }
        else if (!isUndo && diagram.multiselect) {
            considerSwimLanePadding(diagram, node, 20);
            diagram.updateDiagramElementQuad();
        }
        diagram.protectPropertyChange(false);
    }
}
function moveSwinLaneChild(node, diagram) {
    var sourceNode = getDiagramElement(node.id + '_groupElement', diagram.element.id);
    var targetId = (node.parentId) ? node.parentId + '_groupElement' : diagram.element.id + '_diagramLayer';
    var targetNode = getDiagramElement(targetId, diagram.element.id);
    if (sourceNode && targetNode) {
        targetNode.appendChild(sourceNode);
    }
}
export function updateLaneBoundsWithSelector(container, selector, diagram, isBoundsUpdate) {
    var swimLane = diagram.nameTable[container.parentId];
    var isSelector = true;
    updateLaneBoundsAfterAddChild(container, swimLane, selector, diagram, isBoundsUpdate, isSelector);
}
export function updateLaneBoundsAfterAddChild(container, swimLane, node, diagram, isBoundsUpdate, isSelector) {
    var undoObject = cloneObject(container);
    var isUpdateRow;
    var isUpdateColumn;
    var isGroupAction = false;
    var padding = swimLane.shape.padding;
    var containerBounds = container.wrapper.bounds;
    var containerOuterBounds = container.wrapper.outerBounds;
    var nodeBounds = node.wrapper.bounds;
    if (swimLane && swimLane.shape.type === 'SwimLane' &&
        (containerBounds.right < nodeBounds.right + padding ||
            containerBounds.bottom < nodeBounds.bottom + padding || (isSelector && containerBounds.top > nodeBounds.top + padding))) {
        var grid = swimLane.wrapper.children[0];
        var x = grid.bounds.x;
        var y = grid.bounds.y;
        var size = void 0;
        var headerSize = void 0;
        // EJ2-913788 Drag and drop a node with more size than lane height and width
        var isHeader = container.wrapper.children.find(function (child) { return child.id.includes('header'); });
        var isHorizontal = (swimLane.shape.orientation === 'Horizontal');
        if (containerBounds.right < nodeBounds.right + padding &&
            containerOuterBounds.x <= containerBounds.x) {
            if (isHorizontal && isHeader) {
                headerSize = isHeader ? isHeader.width : 0;
                size = (nodeBounds.right - containerBounds.right) + (containerBounds.left - nodeBounds.left) +
                    headerSize + padding * 2;
            }
            else {
                size = (nodeBounds.right - containerBounds.right) + (containerBounds.left - nodeBounds.left) + padding * 2;
            }
            // size = nodeBounds.right - containerBounds.right;
            isUpdateColumn = true;
            grid.updateColumnWidth(container.columnIndex, containerBounds.width + size, true, padding);
        }
        if (containerBounds.bottom < nodeBounds.bottom + padding &&
            containerOuterBounds.y <= containerBounds.y) {
            if (!isHorizontal && isHeader) {
                headerSize = isHeader ? isHeader.height : 0;
                size = (nodeBounds.bottom - containerBounds.bottom) + (containerBounds.top - nodeBounds.top) +
                    headerSize + padding * 2;
            }
            else {
                size = (nodeBounds.bottom - containerBounds.bottom) + (containerBounds.top - nodeBounds.top) + padding * 2;
            }
            // size = nodeBounds.bottom - containerBounds.bottom;
            isUpdateRow = true;
            grid.updateRowHeight(container.rowIndex, containerBounds.height + size, true, padding);
        }
        if (isSelector && containerBounds.top > nodeBounds.top - padding &&
            containerOuterBounds.y <= containerBounds.y) {
            if (!isHorizontal && isHeader) {
                headerSize = isHeader ? isHeader.height : 0;
                size = (containerBounds.top - nodeBounds.top) + (nodeBounds.bottom - containerBounds.bottom) +
                    headerSize + padding * 2;
            }
            else {
                size = (containerBounds.top - nodeBounds.top) + (nodeBounds.bottom - containerBounds.bottom) + padding * 2;
            }
            // Adjust the size based on the top boundary difference
            if (size > 0) {
                isUpdateRow = true;
                grid.updateRowHeight(container.rowIndex, containerBounds.height + size, true, padding);
            }
        }
        if (!(diagram.diagramActions & DiagramAction.UndoRedo)) {
            if (isBoundsUpdate) {
                diagram.startGroupAction();
                isGroupAction = true;
            }
            if (isUpdateRow) {
                var entry = {
                    category: 'Internal',
                    type: 'RowHeightChanged',
                    undoObject: undoObject, redoObject: cloneObject(container)
                };
                diagram.addHistoryEntry(entry);
            }
            if (isUpdateColumn) {
                var entry = {
                    category: 'Internal',
                    type: 'ColumnWidthChanged',
                    undoObject: undoObject, redoObject: cloneObject(container)
                };
                diagram.addHistoryEntry(entry);
            }
        }
        swimLane.width = swimLane.wrapper.width = grid.width;
        swimLane.height = swimLane.wrapper.height = grid.height;
        swimLaneMeasureAndArrange(swimLane);
        if (swimLane.shape.orientation === 'Horizontal') {
            updatePhaseMaxWidth(swimLane, diagram, container.wrapper, container.columnIndex);
        }
        updateHeaderMaxWidth(diagram, swimLane);
        diagram.drag(swimLane, x - grid.bounds.x, y - grid.bounds.y);
        checkPhaseOffset(swimLane, diagram);
        checkLaneSize(swimLane);
    }
    if (!isSelector) {
        considerSwimLanePadding(diagram, node, padding);
    }
    diagram.updateDiagramElementQuad();
    return isGroupAction;
}
//#endregion
//# reginon stack panel interaction
/**
 * renderStackHighlighter method\
 *
 * @returns {  void  }    renderStackHighlighter method .\
 * @param {DiagramElement} element - provide the element value.
 * @param {boolean} isVertical - provide the isVertical value.
 * @param {PointModel} position - provide the position value.
 * @param {Diagram} diagram - provide the diagram value.
 * @param {boolean} isUml - provide the isUml value.
 * @param {boolean} isSwimlane - provide the isSwimlane value.
 * @private
 */
export function renderStackHighlighter(element, isVertical, position, diagram, isUml, isSwimlane) {
    var adornerSvg = getAdornerLayerSvg(diagram.element.id);
    diagram.diagramRenderer.renderStackHighlighter(element, adornerSvg, diagram.scroller.transform, isVertical, position, isUml, isSwimlane);
}
/**
 * moveChildInStack method\
 *
 * @returns {  void }    moveChildInStack method .\
 * @param {Node} sourceNode - provide the sourceNode value.
 * @param {Node} target - provide the target value.
 * @param {Diagram} diagram - provide the diagram value.
 * @param {Actions} action - provide the action value.
 * @private
 */
export function moveChildInStack(sourceNode, target, diagram, action) {
    var obj = sourceNode;
    var parent = diagram.nameTable[obj.parentId];
    var sourceParent = diagram.nameTable[obj.parentId];
    if (target && sourceParent && sourceParent.container && sourceParent.container.type === 'Stack' &&
        target.container && target.container.type === 'Stack' && (sourceParent.id !== target.parentId)) {
        var value = sourceParent.wrapper.children.indexOf(obj.wrapper);
        if (value > -1) {
            diagram.nameTable[obj.id].parentId = target.id;
            sourceParent.wrapper.children.splice(value, 1);
        }
    }
    if (target && target.parentId && obj.parentId && action === 'Drag' &&
        sourceParent.container && sourceParent.container.type === 'Stack') {
        var targetIndex = parent.wrapper.children.indexOf(target.wrapper);
        var sourceIndex = parent.wrapper.children.indexOf(obj.wrapper);
        var undoElement = {
            targetIndex: targetIndex, target: target,
            sourceIndex: sourceIndex, source: sourceNode
        };
        parent.wrapper.children.splice(sourceIndex, 1);
        parent.wrapper.children.splice(targetIndex, 0, obj.wrapper);
        var redoElement = {
            targetIndex: sourceIndex, target: target,
            sourceIndex: targetIndex, source: sourceNode
        };
        var entry = {
            type: 'StackChildPositionChanged', redoObject: redoElement,
            undoObject: undoElement, category: 'Internal'
        };
        diagram.commandHandler.addHistoryEntry(entry);
    }
}
//#end region
//# region Swimlane rendering
//#end region
