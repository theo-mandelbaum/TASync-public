var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { Connector, getBezierPoints, isEmptyVector } from '../objects/connector';
import { Node, BpmnSubEvent, Native } from '../objects/node';
import { PathElement } from '../core/elements/path-element';
import { TextElement } from '../core/elements/text-element';
import { OrthogonalSegment } from '../objects/connector';
import { Rect } from '../primitives/rect';
import { Diagram } from '../../diagram/diagram';
import { identityMatrix, rotateMatrix, transformPointByMatrix, scaleMatrix } from './../primitives/matrix';
import { cloneObject as clone, cloneObject, getBounds, getFunction } from './../utility/base-util';
import { completeRegion, sort, findObjectIndex, intersect3, getAnnotationPosition, findParentInSwimlane, findPortIndex } from './../utility/diagram-util';
import { updatePathElement, cloneBlazorObject, getUserHandlePosition, cloneSelectedObjects } from './../utility/diagram-util';
import { randomId, cornersPointsBeforeRotation } from './../utility/base-util';
import { Selector } from '../objects/node';
import { hasSelection, isSelected, hasSingleConnection, contains } from './actions';
import { DiagramEvent, ConnectorConstraints, NodeConstraints, BezierSmoothness } from '../enum/enum';
import { BlazorAction } from '../enum/enum';
import { canSelect, canMove, canRotate, canDragSourceEnd, canDragTargetEnd, canSingleSelect, canDrag } from './../utility/constraints-util';
import { canMultiSelect, canContinuousDraw, canInConnect, canOutConnect } from './../utility/constraints-util';
import { canPanX, canPanY, canPageEditable } from './../utility/constraints-util';
import { SnapConstraints, DiagramTools, DiagramAction, RealAction } from '../enum/enum';
import { getDiagramElement, getAdornerLayerSvg, getHTMLLayer, getAdornerLayer, getSelectorElement, setAttributeHtml } from '../utility/dom-util';
import { Point } from '../primitives/point';
import { Size } from '../primitives/size';
import { getObjectType, getPoint, intersect2, getOffsetOfConnector, canShowCorner } from './../utility/diagram-util';
import { selectionHasConnector } from './../utility/diagram-util';
import { Layer } from '../diagram/layer';
import { SelectorConstraints, DiagramConstraints } from '../enum/enum';
import { remove, isBlazor, isNullOrUndefined, initializeCSPTemplate } from '@syncfusion/ej2-base';
import { getOppositeDirection, getPortDirection, findAngle } from './../utility/connector';
import { swapBounds, findPoint, orthoConnection2Segment, getIntersection } from './../utility/connector';
import { ShapeAnnotation, PathAnnotation } from '../objects/annotation';
import { Port } from '../objects/port';
import { renderContainerHelper } from './container-interaction';
import { checkChildNodeInContainer, checkParentAsContainer, addChildToContainer } from './container-interaction';
import { renderStackHighlighter } from './container-interaction';
import { getConnectors, updateConnectorsProperties, canLaneInterchange, findLane, checkSameLaneNodes, isParentNodeSelected } from './../utility/swim-lane-util';
import { swimLaneSelection, pasteSwimLane, gridSelection } from '../utility/swim-lane-util';
import { DiagramHtmlElement } from '../core/elements/html-element';
import { Overview } from '../../overview/overview';
/**
 * Defines the behavior of commands
 */
var CommandHandler = /** @class */ (function () {
    function CommandHandler(diagram) {
        /**   @private  */
        this.clipboardData = {};
        // private newNodeObject: Object[] = [];
        // private newConnectorObject: Object[] = [];
        /**   @private  */
        this.diagramObject = {};
        /**   @private  */
        this.newSelectedObjects = {};
        /**   @private  */
        this.oldSelectedObjects = {};
        /**   @private  */
        this.changedNodeZIndexes = {};
        /**   @private  */
        this.connectorsTable = [];
        /** @private */
        this.PreventConnectorSplit = false;
        /**   @private  */
        this.processTable = {};
        /** @private */
        this.isContainer = false;
        /** @private */
        this.canUpdateTemplate = false;
        /** @private */
        this.cloningInProgress = false;
        this.childTable = {};
        this.objectStore = [];
        this.parentTable = {};
        this.blazor = 'Blazor';
        this.blazorInterop = 'sfBlazor';
        this.cloneGroupChildCollection = [];
        this.diagram = diagram;
    }
    Object.defineProperty(CommandHandler.prototype, "snappingModule", {
        /**   @private  */
        get: function () {
            return this.diagram.snappingModule;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CommandHandler.prototype, "layoutAnimateModule", {
        /**   @private  */
        get: function () {
            return this.diagram.layoutAnimateModule;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * startTransaction method\
     *
     * @returns {  void }    startTransaction method .\
     * @param {boolean} protectChange - provide the options value.
     * @private
     */
    CommandHandler.prototype.startTransaction = function (protectChange) {
        this.state = { element: this.diagram.selectedItems, backup: null };
        if (protectChange) {
            this.diagram.protectPropertyChange(true);
        }
        getAdornerLayer(this.diagram.element.id).style.pointerEvents = 'none';
    };
    /**
     * endTransaction method\
     *
     * @returns {  void }    endTransaction method .\
     * @param {boolean} protectChange - provide the options value.
     * @private
     */
    CommandHandler.prototype.endTransaction = function (protectChange) {
        this.state = null;
        if (protectChange) {
            this.diagram.protectPropertyChange(false);
        }
        getAdornerLayer(this.diagram.element.id).style.pointerEvents = 'all';
    };
    /**
     * setFocus method\
     *
     * @returns {  void }    setFocus method .\
     * @private
     */
    CommandHandler.prototype.setFocus = function () {
        document.getElementById(this.diagram.element.id).focus();
    };
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
    CommandHandler.prototype.showTooltip = function (node, position, content, toolName, isTooltipVisible) {
        var _this = this;
        var targetId;
        var targetEle;
        var isNative = false;
        if (node instanceof Selector) {
            if ((node.nodes.length === 1) && node.connectors.length === 0) {
                targetId = node.nodes[0].id;
                if (node.nodes[0].shape && node.nodes[0].shape instanceof Native) {
                    isNative = true;
                }
            }
            else if ((node.nodes.length === 0) && node.connectors.length === 1) {
                targetId = node.connectors[0].id;
            }
            else {
                targetEle = document.getElementById(this.diagram.element.id + '_SelectorElement');
            }
        }
        else if (node instanceof Node) {
            targetId = node.id;
            if (node.shape && (node.shape instanceof Native)) {
                isNative = true;
            }
        }
        else {
            targetId = node.id;
        }
        if (isNullOrUndefined(targetEle) && !isNullOrUndefined(targetId)) {
            var idName = isNative ? '_content_native_element' : '_groupElement';
            targetEle = document.getElementById(targetId + idName);
        }
        if (isTooltipVisible) {
            this.diagram.tooltipObject.position = 'BottomCenter';
            this.diagram.tooltipObject.animation = { open: { delay: 0, duration: 0 } };
            this.diagram.tooltipObject.openDelay = 0;
            this.diagram.tooltipObject.closeDelay = 0;
        }
        if (this.diagram.selectedItems.setTooltipTemplate) {
            var template = void 0;
            var setTooltipTemplate = getFunction(this.diagram.selectedItems.setTooltipTemplate);
            if (setTooltipTemplate) {
                template = setTooltipTemplate(node, this.diagram);
            }
            if (template instanceof HTMLElement) {
                content = template.cloneNode(true);
            }
            else {
                content = template ? template : content;
            }
        }
        //840454- support to provide isSticky property for tooltip in diagram control
        this.diagram.tooltipObject.isSticky = false;
        if (node.tooltip) {
            this.diagram.tooltipObject.openOn = node.tooltip.openOn;
        }
        // Task 834121: Content-Security-Policy support for diagram
        if (typeof content === 'string') {
            this.diagram.tooltipObject.content = initializeCSPTemplate(function () {
                return content;
            });
        }
        else {
            this.diagram.tooltipObject.content = content;
        }
        this.diagram.tooltipObject.offsetX = 0;
        this.diagram.tooltipObject.offsetY = 0;
        this.diagram.tooltipObject.refresh(targetEle);
        if (isTooltipVisible) {
            setTimeout(function () {
                _this.diagram.tooltipObject.open(targetEle);
            }, 1);
        }
    };
    /**
     * Split the connector, when the node is dropped onto it and establish connection with that dropped node.
     *
     * @returns {  void }   connectorSplit  method .\
     * @param {NodeModel}  droppedObject - Provide the dropped node id
     * @param {ConnectorModel} targetConnector - Provide the connector id
     * @private
     */
    CommandHandler.prototype.connectorSplit = function (droppedObject, targetConnector) {
        var droppedNodeId = droppedObject.id;
        var existingConnector = cloneObject(targetConnector);
        var connectorIndex = this.diagram.connectors.indexOf(targetConnector);
        var nodeIndex = this.diagram.nodes.indexOf(droppedObject);
        var droppedNode = cloneObject(droppedObject);
        var connectorOldChanges = {};
        var nodeOldChanges = {};
        var nodeOldProperty = {
            offsetX: droppedNode.offsetX,
            offsetY: droppedNode.offsetY
        };
        var connectorOldProperty = {
            sourceID: existingConnector.sourceID,
            sourcePoint: existingConnector.sourcePoint,
            sourcePortID: existingConnector.sourcePortID,
            targetID: existingConnector.targetID,
            targetPoint: existingConnector.targetPoint,
            targetPortID: existingConnector.targetPortID
        };
        connectorOldChanges[parseInt(connectorIndex.toString(), 10)] = connectorOldProperty;
        nodeOldChanges[parseInt(nodeIndex.toString(), 10)] = nodeOldProperty;
        var connectorNewChanges = {};
        var nodeNewChanges = {};
        var nodeNewProperty = {};
        var connectorNewProperty = {};
        //Split the connector based on the dropped node
        if (existingConnector.sourceID !== '' && existingConnector.targetID !== '') {
            connectorNewProperty.targetID = this.ConnectorTargetChange(targetConnector, droppedNodeId);
        }
        else if (existingConnector.sourceID !== '' && existingConnector.targetID === '') {
            this.nodeOffsetChange(nodeNewProperty, droppedNode, targetConnector.targetPoint);
            connectorNewProperty.targetID = this.ConnectorTargetChange(targetConnector, droppedNodeId);
        }
        else if ((existingConnector.sourceID === '' && existingConnector.targetID === '') || (existingConnector.sourceID === '' && existingConnector.targetID !== '')) {
            this.nodeOffsetChange(nodeNewProperty, droppedNode, targetConnector.sourcePoint);
            connectorNewProperty.sourceID = this.ConnectorSourceChange(targetConnector, droppedNodeId);
        }
        connectorNewChanges[parseInt(connectorIndex.toString(), 10)] = connectorNewProperty;
        nodeNewChanges[parseInt(nodeIndex.toString(), 10)] = nodeNewProperty;
        this.diagram.nodePropertyChange(droppedObject, nodeOldProperty, nodeNewProperty);
        this.diagram.updateSelector();
        this.diagram.connectorPropertyChange(targetConnector, connectorOldProperty, connectorNewProperty);
        //Check Whether the connector connects with the node
        if (existingConnector.sourceID !== '' && existingConnector.targetID !== '') {
            var newConnector = {
                id: 'connector ' + droppedNodeId,
                constraints: ConnectorConstraints.Default | ConnectorConstraints.AllowDrop,
                sourceID: droppedNodeId
            };
            // 28029: Update new connectors source and target end type and styles
            newConnector.type = existingConnector.type;
            newConnector.style = existingConnector.style;
            newConnector.sourceDecorator = existingConnector.sourceDecorator;
            newConnector.targetDecorator = existingConnector.targetDecorator;
            newConnector.targetID = existingConnector.targetID;
            //Check whether the connector connects with the ports
            if (existingConnector.targetPortID !== '') {
                newConnector.targetPortID = existingConnector.targetPortID;
            }
            this.diagram.add(newConnector);
        }
        var entry = {
            type: 'PropertyChanged', redoObject: { nodes: nodeNewChanges }, undoObject: { nodes: nodeOldChanges },
            category: 'Internal'
        };
        this.diagram.addHistoryEntry(entry);
        var entry1 = {
            type: 'PropertyChanged', redoObject: { connectors: connectorNewChanges }, undoObject: { connectors: connectorOldChanges },
            category: 'Internal'
        };
        this.diagram.addHistoryEntry(entry1);
    };
    CommandHandler.prototype.nodeOffsetChange = function (propertyChangeArg, node, nodeNewOffset) {
        propertyChangeArg.offsetX = node.offsetX = nodeNewOffset.x;
        propertyChangeArg.offsetY = node.offsetY = nodeNewOffset.y;
    };
    CommandHandler.prototype.ConnectorTargetChange = function (connector, newTarget) {
        connector.targetID = newTarget;
        return newTarget;
    };
    CommandHandler.prototype.ConnectorSourceChange = function (connector, newTarget) {
        connector.sourceID = newTarget;
        return newTarget;
    };
    /**
     * closeTooltip method\
     *
     * @returns {  void }    closeTooltip method .\
     * @private
     */
    CommandHandler.prototype.closeTooltip = function () {
        this.diagram.tooltipObject.close();
    };
    /**
     * canEnableDefaultTooltip method\
     *
     * @returns {  boolean }    canEnableDefaultTooltip method .\
     * @private
     */
    CommandHandler.prototype.canEnableDefaultTooltip = function () {
        if (this.diagram.selectedItems.constraints & SelectorConstraints.ToolTip) {
            return true;
        }
        else {
            return false;
        }
    };
    /**
     * updateSelector method\
     *
     * @returns {  void }    updateSelector method .\
     * @private
     */
    CommandHandler.prototype.updateSelector = function () {
        this.diagram.updateSelector();
    };
    // /**
    //  * updateConnectorValue method\
    //  *
    //  * @returns {  void }    updateConnectorValue method .\
    //  * @param {IBlazorConnectionChangeEventArgs} args - provide the options value.
    //  * @private
    //  */
    // public updateConnectorValue(args: IBlazorConnectionChangeEventArgs): void {
    //     //remove Blazor code
    // }
    /**
     * triggerEvent method\
     *
     * @returns {  Promise<void | object | IBlazorConnectionChangeEventArgs> }    triggerEvent method .\
     * @param {DiagramEvent} event - provide the options value.
     * @param {Object} args - provide the args value.
     * @private
     */
    CommandHandler.prototype.triggerEvent = function (event, args) {
        return __awaiter(this, void 0, void 0, function () {
            var temparg;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(event === DiagramEvent.drop || event === DiagramEvent.positionChange ||
                            event === DiagramEvent.connectionChange)) return [3 /*break*/, 3];
                        if (this.diagram.currentSymbol) {
                            return [2 /*return*/];
                        }
                        if (event === DiagramEvent.drop) {
                            args.source = cloneBlazorObject(this.diagram);
                        }
                        if (!(this.diagram.currentDrawingObject instanceof Connector && event !== DiagramEvent.positionChange)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.diagram.triggerEvent(event, args)];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        if (this.diagram.currentDrawingObject && event !== DiagramEvent.positionChange) {
                            return [2 /*return*/];
                        }
                        _a.label = 3;
                    case 3: return [4 /*yield*/, this.diagram.triggerEvent(event, args)];
                    case 4:
                        temparg = _a.sent();
                        return [2 /*return*/, temparg];
                }
            });
        });
    };
    /**
     * dragOverElement method\
     *
     * @returns { void }    dragOverElement method .\
     * @param {MouseEventArgs} args - provide the options value.
     * @param {PointModel} currentPosition - provide the args value.
     * @private
     */
    CommandHandler.prototype.dragOverElement = function (args, currentPosition) {
        if (this.diagram.currentSymbol) {
            var dragOverArg = {
                element: cloneBlazorObject(args.source), target: cloneBlazorObject(args.target),
                mousePosition: cloneBlazorObject(currentPosition), diagram: cloneBlazorObject(this.diagram)
            };
            this.triggerEvent(DiagramEvent.dragOver, dragOverArg);
        }
    };
    /**
     * disConnect method\
     *
     * @returns { IConnectionChangeEventArgs | IBlazorConnectionChangeEventArgs }    disConnect method .\
     * @param {IElement} obj - provide the obj value.
     * @param {string} endPoint - provide the endPoint value.
     * @param {boolean} canCancel - provide the canCancel value.
     * @private
     */
    CommandHandler.prototype.disConnect = function (obj, endPoint, canCancel) {
        var oldChanges = {};
        var newChanges = {};
        var returnargs;
        var selectorModel;
        var connector;
        if (obj instanceof Selector) {
            selectorModel = obj;
            connector = selectorModel.connectors[0];
        }
        else if (obj instanceof Connector && this.diagram.currentDrawingObject) {
            connector = this.diagram.currentDrawingObject;
        }
        if (obj && connector && (hasSingleConnection(this.diagram) || this.diagram.currentDrawingObject)) {
            if (endPoint && (endPoint === 'ConnectorSourceEnd' || endPoint === 'ConnectorTargetEnd')) {
                var nodeEndId = endPoint === 'ConnectorSourceEnd' ? 'sourceID' : 'targetID';
                var portEndId = endPoint === 'ConnectorSourceEnd' ? 'sourcePortID' : 'targetPortID';
                if (connector["" + nodeEndId]) { //connector.sourceID || connector.targetID
                    oldChanges["" + nodeEndId] = connector["" + nodeEndId];
                    connector["" + nodeEndId] = '';
                    newChanges["" + nodeEndId] = connector["" + nodeEndId];
                    if (connector.sourcePortID || connector.targetPortID) {
                        oldChanges["" + portEndId] = connector["" + portEndId];
                        connector["" + portEndId] = '';
                        newChanges["" + portEndId] = connector["" + portEndId];
                    }
                    returnargs = this.connectionEventChange(connector, oldChanges, newChanges, endPoint, canCancel);
                }
            }
            else if ((endPoint !== 'OrthoThumb' && endPoint !== 'SegmentEnd') && (connector.sourceID || connector.targetID)) {
                oldChanges = {
                    sourceID: connector.sourceID, sourcePortID: connector.sourcePortID,
                    targetID: connector.targetID, targetPortID: connector.targetPortID
                };
                connector.sourceID = '';
                connector.sourcePortID = '';
                connector.targetID = '';
                connector.targetPortID = '';
                newChanges = {
                    sourceID: connector.sourceID, sourcePortID: connector.sourcePortID,
                    targetID: connector.targetID, targetPortID: connector.targetPortID
                };
                var arg = {
                    connector: cloneBlazorObject(connector), oldValue: oldChanges,
                    newValue: newChanges, cancel: false, state: 'Changing', connectorEnd: endPoint
                };
                this.triggerEvent(DiagramEvent.connectionChange, arg);
                if (arg.cancel) {
                    connector.sourceID = oldChanges.sourceID;
                    connector.sourcePortID = oldChanges.sourcePortID;
                    connector.targetID = oldChanges.targetID;
                    connector.targetPortID = oldChanges.targetPortID;
                }
                else {
                    this.diagram.connectorPropertyChange(connector, oldChanges, newChanges);
                    this.diagram.updateDiagramObject(connector);
                    arg = {
                        connector: connector, oldValue: oldChanges,
                        newValue: newChanges, cancel: false, state: 'Changed', connectorEnd: endPoint
                    };
                    this.triggerEvent(DiagramEvent.connectionChange, arg);
                }
            }
        }
        return returnargs;
    };
    CommandHandler.prototype.connectionEventChange = function (connector, oldChanges, newChanges, endPoint, canCancel) {
        var nodeEndId = endPoint === 'ConnectorSourceEnd' ? 'sourceID' : 'targetID';
        var portEndId = endPoint === 'ConnectorSourceEnd' ? 'sourcePortID' : 'targetPortID';
        var connectedNode;
        if (this.enableCloneObject) {
            connectedNode = this.diagram.nameTable[newChanges["" + nodeEndId]];
            var nodeObject = cloneObject(connectedNode);
            this.diagram.insertValue(nodeObject, true);
        }
        var returnargs;
        var arg = {
            cancel: false, state: 'Changing', connectorEnd: endPoint,
            connector: cloneBlazorObject(connector), oldValue: { nodeId: oldChanges["" + nodeEndId], portId: oldChanges["" + portEndId] },
            newValue: { nodeId: newChanges["" + nodeEndId], portId: newChanges["" + portEndId] }
        };
        this.triggerEvent(DiagramEvent.connectionChange, arg);
        if (arg.cancel) {
            connector["" + nodeEndId] = oldChanges["" + nodeEndId];
            connector["" + portEndId] = oldChanges["" + portEndId];
            newChanges = oldChanges;
        }
        this.diagram.connectorPropertyChange(connector, oldChanges, newChanges);
        this.diagram.updateDiagramObject(connector);
        arg = {
            connector: cloneBlazorObject(connector), oldValue: { nodeId: oldChanges["" + nodeEndId], portId: oldChanges["" + portEndId] },
            newValue: {
                nodeId: newChanges["" + nodeEndId],
                portId: newChanges["" + portEndId]
            },
            cancel: false, state: 'Changing', connectorEnd: endPoint
        };
        if (this.enableCloneObject) {
            if (connectedNode === undefined) {
                connectedNode = this.diagram.nameTable[oldChanges["" + nodeEndId]];
                var nodeObject = cloneObject(connectedNode);
                this.diagram.insertValue(nodeObject, true);
            }
        }
        if (this.diagram.bpmnModule) {
            if (connector.isBpmnAnnotationConnector) {
                var textAnnotationNode = this.diagram.nameTable[connector.targetID];
                textAnnotationNode.shape.textAnnotation.textAnnotationTarget = connector.sourceID;
            }
        }
        return returnargs;
    };
    // /**
    //  * insertBlazorObject method\
    //  *
    //  * @returns { void }    insertBlazorObject method .\
    //  * @param {IElement} object - provide the object value.
    //  * @param {boolean} isNode - provide the isNode value.
    //  * @private
    //  */
    // public insertBlazorObject(object: SelectorModel | Node | Connector, isNode?: boolean): void {
    // }
    // /**
    //  * updatePropertiesToBlazor method\
    //  *
    //  * @returns { void }    updatePropertiesToBlazor method .\
    //  * @param {MouseEventArgs} args - provide the args value.
    //  * @param {PointModel} labelDrag - provide the labelDrag value.
    //  * @private
    //  */
    // public updatePropertiesToBlazor(args: MouseEventArgs, labelDrag: boolean): void {
    //     this.enableCloneObject(false);
    //     this.ismouseEvents(false);
    //     // this.getBlazorOldValues(args, labelDrag);
    //     // this.updateBlazorSelector();
    // }
    // /**
    //  * insertSelectedObjects method\
    //  *
    //  * @returns { void }    insertSelectedObjects method .\
    //  * @private
    //  */
    // public insertSelectedObjects(): void {
    //     // this.oldSelectedObjects = cloneSelectedObjects(this.diagram);
    // }
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
    CommandHandler.prototype.findTarget = function (element, argsTarget, source, connection) {
        var target;
        if (argsTarget instanceof Node) {
            if (element && element.id === argsTarget.id + '_content') {
                return argsTarget;
            }
            if (source && argsTarget.shape.type === 'Bpmn' && ((!isBlazor() && argsTarget.shape.shape === 'Activity'))) {
                if (argsTarget.shape.activity.subProcess.type === 'Transaction') {
                    var transaction = argsTarget.shape.activity.subProcess.transaction;
                    if (transaction.success.visible && element.id.indexOf(argsTarget.id + '_success') === 0) {
                        return transaction.success;
                    }
                    if (transaction.cancel.visible && element.id.indexOf(argsTarget.id + '_cancel') === 0) {
                        return transaction.cancel;
                    }
                    if (transaction.failure.visible && element.id.indexOf(argsTarget.id + '_failure') === 0) {
                        return transaction.failure;
                    }
                }
            }
            if (element instanceof PathElement || element instanceof DiagramHtmlElement) {
                var nodePort = this.findMatch(argsTarget.ports, argsTarget.id, element.id);
                if (nodePort) {
                    return nodePort;
                }
                var nodeFixedUserHandle = this.findMatch(argsTarget.fixedUserHandles, argsTarget.id, element.id);
                if (nodeFixedUserHandle) {
                    return nodeFixedUserHandle;
                }
            }
        }
        // Feature 826644: Support to add ports to the connector.
        // Added below condition to find the target connector port.
        if (argsTarget instanceof Connector) {
            if (element && element.id === argsTarget.id + '_path') {
                return argsTarget;
            }
            if (element instanceof PathElement || element instanceof DiagramHtmlElement) {
                var connectorPort = this.findMatch(argsTarget.ports, argsTarget.id, element.id);
                if (connectorPort) {
                    return connectorPort;
                }
                var connectorFixedUserHandle = this.findMatch(argsTarget.fixedUserHandles, argsTarget.id, element.id);
                if (connectorFixedUserHandle) {
                    return connectorFixedUserHandle;
                }
            }
        }
        if (!connection) {
            var annotation = void 0;
            for (var i = 0; i < argsTarget.annotations.length; i++) {
                annotation = argsTarget.annotations[parseInt(i.toString(), 10)];
                if (element.id === argsTarget.id + '_' + annotation.id) {
                    return annotation;
                }
            }
        }
        return argsTarget;
    };
    CommandHandler.prototype.findMatch = function (items, targetID, elementID) {
        for (var i = 0; i < items.length; i++) {
            var item = items[parseInt(i.toString(), 10)];
            if (elementID === targetID + '_' + item.id || elementID === targetID + '_' + item.id + '_shape') {
                return item;
            }
        }
    };
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
    CommandHandler.prototype.canDisconnect = function (endPoint, args, targetPortId, targetNodeId) {
        var selector;
        var connect;
        if (args.source instanceof Selector) {
            selector = args.source;
            connect = selector.connectors[0];
        }
        else if (args.source instanceof Connector && this.diagram.currentDrawingObject) {
            connect = this.diagram.currentDrawingObject;
        }
        var targetObject = this.findTarget(args.targetWrapper, args.target, endPoint === 'ConnectorSourceEnd', true);
        var nodeEnd = endPoint === 'ConnectorSourceEnd' ? 'sourceID' : 'targetID';
        var portEnd = endPoint === 'ConnectorSourceEnd' ? 'sourcePortID' : 'targetPortID';
        if (connect["" + nodeEnd] !== targetNodeId || connect["" + portEnd] !== targetPortId) {
            return true;
        }
        return false;
    };
    /* tslint:disable */
    /**
     * connect method\
     *
     * @returns { IConnectionChangeEventArgs | IBlazorConnectionChangeEventArgs }    connect method .\
     * @param {string} endPoint - provide the endPoint value.
     * @param {MouseEventArgs} args - provide the args value.
     * @param {boolean} canCancel - provide the canCancel value.
     * @private
     */
    CommandHandler.prototype.connect = function (endPoint, args, canCancel) {
        var checkBlazor;
        var newChanges = {};
        var oldChanges = {};
        var oldNodeId;
        var oldPortId;
        var selectorModel;
        var connector;
        var returnargs;
        if (args.source instanceof Selector) {
            selectorModel = args.source;
            connector = selectorModel.connectors[0];
        }
        else if (args.source instanceof Connector && this.diagram.currentDrawingObject) {
            connector = this.diagram.currentDrawingObject;
        }
        var target = this.findTarget((args.targetWrapper || args.sourceWrapper), (args.target || args.actualObject), endPoint === 'ConnectorSourceEnd', true);
        var nodeEndId = endPoint === 'ConnectorSourceEnd' ? 'sourceID' : 'targetID';
        var portEndId = endPoint === 'ConnectorSourceEnd' ? 'sourcePortID' : 'targetPortID';
        if (target instanceof Node) {
            oldChanges["" + nodeEndId] = connector["" + nodeEndId];
            connector["" + nodeEndId] = target.id;
            newChanges["" + nodeEndId] = connector["" + nodeEndId];
            oldChanges["" + portEndId] = connector["" + portEndId];
            returnargs = this.connectionEventChange(connector, oldChanges, newChanges, endPoint, canCancel);
        }
        else if (target instanceof Port || target instanceof BpmnSubEvent) {
            oldNodeId = connector["" + nodeEndId];
            oldPortId = connector["" + portEndId];
            connector["" + portEndId] = target.id;
            connector["" + nodeEndId] = (args.target && args.target.id || args.actualObject.id);
            newChanges["" + nodeEndId] = connector["" + nodeEndId];
            newChanges["" + portEndId] = connector["" + portEndId];
            var arg = {
                connector: cloneBlazorObject(connector), oldValue: { nodeId: oldNodeId, portId: oldPortId },
                newValue: { nodeId: newChanges["" + nodeEndId], portId: newChanges["" + portEndId] },
                cancel: false, state: 'Changing', connectorEnd: endPoint
            };
            if (!checkBlazor) {
                this.triggerEvent(DiagramEvent.connectionChange, arg);
            }
            if (arg.cancel) {
                connector["" + nodeEndId] = oldNodeId;
                connector["" + portEndId] = oldPortId;
                newChanges["" + nodeEndId] = oldNodeId;
                newChanges["" + portEndId] = oldPortId;
            }
            else {
                this.diagram.connectorPropertyChange(connector, oldChanges, newChanges);
                this.diagram.updateDiagramObject(connector);
                arg = {
                    connector: cloneBlazorObject(connector), oldValue: { nodeId: oldNodeId, portId: oldPortId },
                    newValue: { nodeId: newChanges["" + nodeEndId], portId: newChanges["" + portEndId] }, cancel: false,
                    state: 'Changing', connectorEnd: endPoint
                };
            }
        }
        this.renderHighlighter(args, undefined, endPoint === 'ConnectorSourceEnd');
        return returnargs;
    };
    /* tslint:enable */
    /** @private */
    /**
     * cut method\
     *
     * @returns { void }    cut method .\
     * @private
     */
    CommandHandler.prototype.cut = function () {
        var index;
        this.clipboardData.pasteIndex = 0;
        if (this.diagram.undoRedoModule) {
            this.diagram.historyManager.startGroupAction();
        }
        this.clipboardData.clipObject = this.copyObjects();
        if (this.diagram.undoRedoModule) {
            this.diagram.historyManager.endGroupAction();
        }
        if (this.diagram.mode !== 'SVG') {
            this.diagram.refreshDiagramLayer();
        }
    };
    // private UpdateBlazorDiagramModelLayers(layer: Layer, isRemove: boolean): void {
    // comment blazor code
    // }
    /**
     * addLayer method\
     *
     * @returns { void }    addLayer method .\
     * @param {LayerModel} layer - provide the endPoint value.
     * @param {Object[]} objects - provide the args value.
     * @param {boolean} isServerUpdate - provide the canCancel value.
     * @private
     */
    CommandHandler.prototype.addLayer = function (layer, objects, isServerUpdate) {
        if (isServerUpdate === void 0) { isServerUpdate = true; }
        layer.id = layer.id || randomId();
        layer.zIndex = this.diagram.layers.length;
        var isEnableServerDatabind = this.diagram.allowServerDataBinding;
        this.diagram.enableServerDataBinding(false);
        layer = new Layer(this.diagram, 'layers', layer, true);
        this.diagram.enableServerDataBinding(isEnableServerDatabind);
        layer.objectZIndex = -1;
        layer.zIndexTable = {};
        this.diagram.layers.push(layer);
        // if (isServerUpdate) {
        //     this.UpdateBlazorDiagramModelLayers(layer as Layer, false);
        // }
        this.diagram.layerZIndexTable[layer.zIndex] = layer.id;
        this.diagram.activeLayer = layer;
        var layers = layer.objects;
        if (objects) {
            for (var i = 0; i < objects.length; i++) {
                this.diagram.add(objects[parseInt(i.toString(), 10)]);
            }
        }
    };
    /**
     * getObjectLayer method\
     *
     * @returns { LayerModel }    getObjectLayer method .\
     * @param {string} objectName - provide the endPoint value.
     * @private
     */
    CommandHandler.prototype.getObjectLayer = function (objectName) {
        var layers = this.diagram.layers;
        if (layers.length > 1) {
            for (var i = 0; i < layers.length; i++) {
                var objIndex = layers[parseInt(i.toString(), 10)].objects.indexOf(objectName);
                if (objIndex > -1) {
                    return layers[parseInt(i.toString(), 10)];
                }
            }
        }
        return this.diagram.activeLayer;
    };
    /**
     * getLayer method\
     *
     * @returns { LayerModel }    getLayer method .\
     * @param {string} layerName - provide the endPoint value.
     * @private
     */
    CommandHandler.prototype.getLayer = function (layerName) {
        var layers = this.diagram.layers;
        for (var i = 0; i < layers.length; i++) {
            if (layers[parseInt(i.toString(), 10)].id === layerName) {
                return layers[parseInt(i.toString(), 10)];
            }
        }
        return undefined;
    };
    /**
     * removeLayer method\
     *
     * @returns { void }    removeLayer method .\
     * @param {string} layerId - provide the endPoint value.
     * @param {boolean} isServerUpdate - provide the endPoint value.
     * @private
     */
    CommandHandler.prototype.removeLayer = function (layerId, isServerUpdate) {
        if (isServerUpdate === void 0) { isServerUpdate = true; }
        var layers = this.getLayer(layerId);
        if (layers) {
            var index = this.diagram.layers.indexOf(layers);
            var layerObject = layers.objects;
            for (var i = layerObject.length - 1; i >= 0; i--) {
                this.diagram.unSelect(this.diagram.nameTable[layerObject[parseInt(i.toString(), 10)]]);
                this.diagram.remove(this.diagram.nameTable[layerObject[parseInt(i.toString(), 10)]]);
                if (layers.id !== 'default_layer') {
                    if (this.diagram.activeLayer.id === layerId) {
                        this.diagram.activeLayer = this.diagram.layers[this.diagram.layers.length - 1];
                    }
                }
            }
            // if (isServerUpdate) {
            //     this.UpdateBlazorDiagramModelLayers(this.diagram.layers[parseInt(index.toString(), 10)] as Layer, true);
            // }
            delete this.diagram.layerZIndexTable[layers.zIndex];
            this.diagram.layers.splice(index, 1);
            if (this.diagram.mode !== 'SVG') {
                this.diagram.refreshDiagramLayer();
            }
        }
    };
    /**
     * moveObjects method\
     *
     * @returns { void }    moveObjects method .\
     * @param {string[]]} objects - provide the objects value.
     * @param {string} targetLayer - provide the targetLayer value.
     * @private
     */
    CommandHandler.prototype.moveObjects = function (objects, targetLayer) {
        this.diagram.startGroupAction();
        var connectorObjectsDetails = {};
        var childNodes = [];
        for (var i = 0; i < objects.length; i++) {
            var obj = this.diagram.nameTable[objects[parseInt(i.toString(), 10)]];
            if (obj instanceof Node) {
                var detail = { inEdges: obj.inEdges, outEdges: obj.outEdges };
                connectorObjectsDetails["" + obj.id] = cloneObject(detail);
            }
            else if (obj instanceof Connector) {
                var detail = {
                    sourceID: obj.sourceID, targetID: obj.targetID,
                    sourcePortID: obj.sourcePortID, targetPortID: obj.targetPortID
                };
                connectorObjectsDetails["" + obj.id] = cloneObject(detail);
            }
        }
        var layer = this.getLayer(targetLayer) || this.diagram.activeLayer;
        this.diagram.setActiveLayer(layer.id);
        var targerNodes;
        for (var _i = 0, objects_1 = objects; _i < objects_1.length; _i++) {
            var i = objects_1[_i];
            var layer_1 = this.getObjectLayer(i);
            var index = layer_1.objects.indexOf(i);
            if (index > -1) {
                targerNodes = this.diagram.nameTable["" + i];
                childNodes = [];
                if (targerNodes.children) {
                    for (var _a = 0, _b = targerNodes.children; _a < _b.length; _a++) {
                        var node = _b[_a];
                        childNodes.push(this.diagram.nameTable["" + node]);
                    }
                }
                this.diagram.unSelect(targerNodes);
                //875087 - Restrict removing dependent connectors when moveing between layers
                this.diagram.deleteDependentConnector = false;
                this.diagram.remove(this.diagram.nameTable["" + i]);
                this.diagram.deleteDependentConnector = true;
                if (childNodes.length > 0) {
                    var addedObj = void 0;
                    for (var _c = 0, childNodes_1 = childNodes; _c < childNodes_1.length; _c++) {
                        var node = childNodes_1[_c];
                        addedObj = this.diagram.add(node);
                        this.setConnectorDetails(addedObj || node, connectorObjectsDetails);
                        targerNodes.children.push(addedObj.id);
                    }
                    addedObj = this.diagram.add(targerNodes);
                    this.setConnectorDetails(addedObj || targerNodes, connectorObjectsDetails);
                }
                else {
                    var addedObj = this.diagram.add(targerNodes);
                    this.setConnectorDetails(addedObj || targerNodes, connectorObjectsDetails);
                }
                if (targerNodes.parentId) {
                    var parentId = targerNodes.parentId;
                    var group = this.diagram.nameTable["" + parentId];
                    this.diagram.addChildToGroup(group, targerNodes.id);
                }
            }
        }
        this.diagram.endGroupAction();
    };
    CommandHandler.prototype.setConnectorDetails = function (obj, connectorObjectsDetails) {
        var details = connectorObjectsDetails[obj.id];
        if (obj instanceof Node) {
            if (details) {
                if (details.inEdges && details.inEdges.length > 0) {
                    for (var i = 0; i < details.inEdges.length; i++) {
                        var con = this.diagram.nameTable[details.inEdges[parseInt(i.toString(), 10)]];
                        con.targetID = obj.id;
                    }
                }
                if (details.outEdges && details.outEdges.length > 0) {
                    for (var i = 0; i < details.outEdges.length; i++) {
                        var con = this.diagram.nameTable[details.outEdges[parseInt(i.toString(), 10)]];
                        con.sourceID = obj.id;
                    }
                }
            }
        }
        else if (obj instanceof Connector) {
            if (details) {
                obj.sourceID = details.sourceID;
                obj.targetID = details.targetID;
                obj.sourcePortID = details.sourcePortID;
                obj.targetPortID = details.targetPortID;
            }
        }
    };
    /**
     * cloneLayer method\
     *
     * @returns { void }    cloneLayer method .\
     * @param {string[]} layerName - provide the objects value.
     * @private
     */
    CommandHandler.prototype.cloneLayer = function (layerName) {
        var layers = this.diagram.layers;
        var layer = this.getLayer(layerName);
        if (layer) {
            var cloneObject_1 = [];
            var newlayer = {
                id: layerName + '_' + randomId(), objects: [], visible: true, lock: false
            };
            this.addLayer(newlayer, null, true);
            newlayer.zIndex = this.diagram.layers.length - 1;
            var multiSelect = cloneObject_1.length !== 1;
            for (var _i = 0, _a = layer.objects; _i < _a.length; _i++) {
                var obj = _a[_i];
                cloneObject_1.push(this.diagram.nameTable["" + obj]);
            }
            this.paste(cloneObject_1);
        }
    };
    /**
     * copy method\
     *
     * @returns { void }    copy method .\
     * @private
     */
    CommandHandler.prototype.copy = function () {
        this.clipboardData.pasteIndex = 1;
        this.clipboardData.clipObject = this.copyObjects();
        return this.clipboardData.clipObject;
    };
    /**
     * copyObjects method\
     *
     * @returns { Object[] }    copyObjects method .\
     * @private
     */
    CommandHandler.prototype.copyObjects = function () {
        var selectedItems = [];
        var obj = [];
        this.clipboardData.childTable = {};
        if (this.diagram.selectedItems.connectors.length > 0) {
            //908602 - Issue in Cut connectors
            selectedItems = selectedItems.concat(this.diagram.selectedItems.connectors);
            for (var j = 0; j < selectedItems.length; j++) {
                var element = void 0;
                //To copy text annotation node while copying the text annotation connector.
                if (this.diagram.bpmnModule &&
                    selectedItems[parseInt(j.toString(), 10)].isBpmnAnnotationConnector) {
                    element = cloneObject((this.diagram.nameTable[selectedItems[parseInt(j.toString(), 10)].targetID]));
                }
                else {
                    element = cloneObject((selectedItems[parseInt(j.toString(), 10)]));
                }
                obj.push(element);
            }
        }
        if (this.diagram.selectedItems.nodes.length > 0) {
            selectedItems = selectedItems.concat(this.diagram.selectedItems.nodes);
            for (var j = 0; j < this.diagram.selectedItems.nodes.length; j++) {
                if (!this.diagram.selectedItems.nodes[parseInt(j.toString(), 10)].isPhase) {
                    var node = clone(this.diagram.selectedItems.nodes[parseInt(j.toString(), 10)]);
                    // Bug-913795: Pasting lane selected through rubber band selection results in multiple swimlane to be pasted
                    // Filter lane nodes-in the collection kept for clipboard data.
                    var laneNodes = obj.filter(function (node) { return node.isLane; });
                    // Flag-to check if same lane representing node already pushed in collection
                    var isCopiedLane = false;
                    // Check if same lane representing node is already pushed in collection
                    if (node.isLane) {
                        for (var _i = 0, laneNodes_1 = laneNodes; _i < laneNodes_1.length; _i++) {
                            var laneNode = laneNodes_1[_i];
                            if (checkSameLaneNodes(laneNode, node, this.diagram)) {
                                isCopiedLane = true;
                                break;
                            }
                        }
                    }
                    if (!((node.isLane || node.isHeader) && this.checkSwimlaneInSelection(node, obj))) {
                        // Restricting-child node push if parent lane node pushed & same lane nodes push
                        if (!(isParentNodeSelected(node, this.diagram) || isCopiedLane)) {
                            if (node.wrapper && (node.offsetX !== node.wrapper.offsetX)) {
                                node.offsetX = node.wrapper.offsetX;
                            }
                            if (node.wrapper && (node.offsetY !== node.wrapper.offsetY)) {
                                node.offsetY = node.wrapper.offsetY;
                            }
                            var processTable = {};
                            this.copyProcesses(node);
                            obj.push(clone(node));
                            var matrix = identityMatrix();
                            rotateMatrix(matrix, -node.rotateAngle, node.offsetX, node.offsetY);
                            if (node.children) {
                                var childTable = this.clipboardData.childTable;
                                var tempNode = void 0;
                                var elements = [];
                                var nodes = this.getAllDescendants(node, elements, true);
                                for (var i = 0; i < nodes.length; i++) {
                                    tempNode = this.diagram.nameTable[nodes[parseInt(i.toString(), 10)].id];
                                    var clonedObject = childTable[tempNode.id] = clone(tempNode);
                                    var newOffset = transformPointByMatrix(matrix, { x: clonedObject.wrapper.offsetX, y: clonedObject.wrapper.offsetY });
                                    if (tempNode instanceof Node) {
                                        clonedObject.offsetX = newOffset.x;
                                        clonedObject.offsetY = newOffset.y;
                                        clonedObject.rotateAngle -= node.rotateAngle;
                                    }
                                }
                                this.clipboardData.childTable = childTable;
                            }
                            // Adding the clonned connectors of swim lane in child table
                            if (node.shape.type === 'SwimLane') {
                                var swimlane = this.diagram.getObject(this.diagram.selectedItems.nodes[parseInt(j.toString(), 10)].id);
                                var childTable = this.clipboardData.childTable;
                                var connectorsList = getConnectors(this.diagram, swimlane.wrapper.children[0], 0, true);
                                for (var i = 0; i < connectorsList.length; i++) {
                                    var connector = this.diagram.getObject(connectorsList[parseInt(i.toString(), 10)]);
                                    childTable[connector.id] = clone(connector);
                                    childTable[connector.id].parentSwimlaneId = node.id;
                                }
                            }
                            // Adding the clonned LANE of swim lane in child table
                            if (node && node.isLane) {
                                var childTable = this.clipboardData.childTable;
                                var swimlane = this.diagram.getObject(node.parentId);
                                var lane = findLane(node, this.diagram);
                                childTable[node.id] = cloneObject(lane);
                                childTable[node.id].width = swimlane.wrapper.actualSize.width;
                            }
                        }
                    }
                }
            }
        }
        this.sortByZIndex(obj, 'zIndex');
        //892957: Remove duplicate elements while copy, paste the swimlane
        if (this.diagram.selectedItems.nodes.some(function (node) {
            return node.shape.type === 'SwimLane';
        })) {
            obj = this.removeDuplicateObjects(obj);
        }
        if (this.clipboardData.pasteIndex === 0) {
            this.startGroupAction();
            for (var _a = 0, selectedItems_1 = selectedItems; _a < selectedItems_1.length; _a++) {
                var item = selectedItems_1[_a];
                if (this.diagram.nameTable[item.id]) {
                    this.diagram.remove(item);
                }
            }
            this.endGroupAction();
        }
        return obj;
    };
    /**
     * findProcesses method\
     *
     * @returns { string[] } findProcesses method .\
     * @param {Node} node - provide the laneNode  value.
     * @private
     */
    CommandHandler.prototype.findProcesses = function (node) {
        var processes = [];
        var lanes = node.shape.lanes;
        lanes.forEach(function (lane) {
            lane.children.forEach(function (child) {
                var activity = child.shape.activity;
                if (activity && activity.subProcess.processes) {
                    activity.subProcess.processes.forEach(function (process) {
                        processes.push(process);
                    });
                }
            });
        });
        return processes;
    };
    //892957: To remove duplicate objects
    CommandHandler.prototype.removeDuplicateObjects = function (objects) {
        var uniqueObjects = {};
        for (var i = 0; i < objects.length; i++) {
            uniqueObjects[objects[parseInt(i.toString(), 10)].id] = objects[parseInt(i.toString(), 10)];
        }
        var result = [];
        //To remove objects with same id
        for (var key in uniqueObjects) {
            if (Object.prototype.hasOwnProperty.call(uniqueObjects, key)) {
                result.push(uniqueObjects["" + key]);
            }
        }
        var _loop_1 = function (i) {
            if (result[parseInt(i.toString(), 10)].parentId) {
                var lane_1 = this_1.diagram.getObject(result[parseInt(i.toString(), 10)].parentId);
                if (lane_1 && lane_1.isLane && lane_1.parentId &&
                    result.some(function (obj) { return obj.id === lane_1.parentId; })) {
                    result.splice(i, 1);
                    i--;
                }
            }
            out_i_1 = i;
        };
        var this_1 = this, out_i_1;
        //To remove the nodes which is child node of copied swimlane
        for (var i = 0; i < result.length; i++) {
            _loop_1(i);
            i = out_i_1;
        }
        // Get the keys from childTable
        var childTableKeys = Object.keys(this.clipboardData.childTable);
        // Filter the array to remove objects with ids matching the keys in childTable except lane
        var filteredArray = result.filter(function (item) {
            return (childTableKeys.indexOf(item.id) === -1 || item.isLane);
        });
        return filteredArray;
    };
    //To check if the swimlane is selected along with its child lane
    CommandHandler.prototype.checkSwimlaneInSelection = function (node, obj) {
        return this.diagram.selectedItems.nodes.some(function (item) { return item.id === node.parentId; });
    };
    CommandHandler.prototype.copyProcesses = function (node) {
        if (node.shape.type === 'Bpmn' && node.shape.activity &&
            node.shape.activity.subProcess.processes &&
            node.shape.activity.subProcess.processes.length > 0) {
            var processes = node.shape.activity.subProcess.processes;
            for (var _i = 0, processes_1 = processes; _i < processes_1.length; _i++) {
                var i = processes_1[_i];
                this.processTable["" + i] = (clone(this.diagram.nameTable["" + i]));
                if (this.processTable["" + i].shape.activity.subProcess.processes &&
                    this.processTable["" + i].shape.activity.subProcess.processes.length > 0) {
                    this.copyProcesses(this.processTable["" + i]);
                }
            }
            this.clipboardData.processTable = this.processTable;
        }
    };
    /**
     * group method\
     *
     * @returns { void }    group method .\
     * @private
     */
    CommandHandler.prototype.group = function () {
        var _this = this;
        this.oldSelectedObjects = cloneSelectedObjects(this.diagram);
        var propName = 'isProtectedOnChange';
        var protectedChange = this.diagram["" + propName];
        this.diagram.protectPropertyChange(true);
        this.diagram.diagramActions = this.diagram.diagramActions | DiagramAction.Group;
        var selectedItems = [];
        var obj = {};
        //let group: Node | Connector;
        obj.id = 'group' + randomId();
        obj = new Node(this.diagram, 'nodes', obj, true);
        obj.children = [];
        selectedItems = this.diagram.selectedItems.nodes;
        selectedItems = selectedItems.concat(this.diagram.selectedItems.connectors);
        var connectors = this.diagram.connectors;
        connectors.forEach(function (connector) {
            var sourceNode = _this.diagram.nameTable[connector.sourceID];
            var targetNode = _this.diagram.nameTable[connector.targetID];
            var isSourceNode = (sourceNode && sourceNode.processId &&
                isSelected(_this.diagram, _this.diagram.nameTable[sourceNode.processId]));
            var isTargetNode = (targetNode && targetNode.processId &&
                isSelected(_this.diagram, _this.diagram.nameTable[targetNode.processId]));
            var isAlreadySelected = selectedItems.some(function (item) { return item.id === connector.id; });
            if (!isAlreadySelected && (isSourceNode || isTargetNode)) {
                selectedItems.push(connector);
            }
        });
        var order = selectedItems.sort(function (a, b) {
            return a.zIndex - b.zIndex;
        });
        for (var i = 0; i < order.length; i++) {
            if (!order[parseInt(i.toString(), 10)].parentId) {
                obj.children.push(order[parseInt(i.toString(), 10)].id);
            }
        }
        //867606 - Exception throws while grouping the existing group nodes.
        if (obj.children.length > 0) {
            var group = this.diagram.add(obj);
            if (group) {
                this.select(group);
            }
            // 939249: Duplicate Ports Added to Group After Grouping and Undoing.
            obj.annotations = group.annotations;
            obj.ports = group.ports;
            obj.style = group.style;
            var entry = { type: 'Group', undoObject: obj, redoObject: obj, category: 'Internal' };
            this.addHistoryEntry(entry);
            this.diagram.diagramActions = this.diagram.diagramActions & ~DiagramAction.Group;
            this.diagram.protectPropertyChange(protectedChange);
            // this.updateBlazorSelector();
        }
    };
    /**
     * unGroup method\
     *
     * @returns {  void }    unGroup method .\
     * @param {NodeModel} obj - provide the angle value.
     * @private
     */
    CommandHandler.prototype.unGroup = function (obj) {
        var propName = 'isProtectedOnChange';
        var protectedChange = this.diagram["" + propName];
        this.diagram.protectPropertyChange(true);
        this.diagram.diagramActions = this.diagram.diagramActions | DiagramAction.Group;
        var selectedItems = [];
        if (obj) {
            selectedItems.push(obj);
        }
        else {
            selectedItems = this.diagram.selectedItems.nodes;
        }
        this.diagram.startGroupAction();
        for (var i = 0; i < selectedItems.length; i++) {
            var node = selectedItems[parseInt(i.toString(), 10)];
            var undoObject = cloneObject(node);
            var childCollection = [];
            for (var k = 0; k < node.children.length; k++) {
                childCollection.push(node.children[parseInt(k.toString(), 10)]);
            }
            if (node.children) {
                if (node.ports && node.ports.length > 0) {
                    this.diagram.removePorts(node, node.ports);
                }
                if (node.annotations && node.annotations.length > 0 && (!isBlazor())) {
                    this.diagram.removeLabels(node, node.annotations);
                }
                var parentNode = this.diagram.nameTable[node.parentId];
                for (var j = node.children.length - 1; j >= 0; j--) {
                    (this.diagram.nameTable[node.children[parseInt(j.toString(), 10)]]).parentId = '';
                    var childNode = node.children[parseInt(j.toString(), 10)];
                    this.diagram.deleteChild(this.diagram.nameTable[node.children[parseInt(j.toString(), 10)]], node);
                    if (node.parentId && childNode) {
                        this.diagram.addChild(parentNode, childNode);
                    }
                }
                this.resetDependentConnectors(node.inEdges, true);
                this.resetDependentConnectors(node.outEdges, false);
                var entry = {
                    type: 'UnGroup', undoObject: undoObject,
                    redoObject: undoObject, category: 'Internal'
                };
                if (!(this.diagram.diagramActions & DiagramAction.UndoRedo)) {
                    this.addHistoryEntry(entry);
                }
                if (node.parentId) {
                    this.diagram.deleteChild(node, parentNode);
                }
            }
            this.diagram.removeNode(node, childCollection);
            this.clearSelection();
        }
        this.diagram.endGroupAction();
        this.diagram.diagramActions = this.diagram.diagramActions & ~DiagramAction.Group;
        this.diagram.protectPropertyChange(protectedChange);
    };
    CommandHandler.prototype.resetDependentConnectors = function (edges, isInEdges) {
        for (var i = 0; i < edges.length; i++) {
            var newConnector = this.diagram.nameTable[edges[parseInt(i.toString(), 10)]];
            var undoObject = cloneObject(newConnector);
            var newProp = void 0;
            if (isInEdges) {
                newConnector.targetID = '';
                newConnector.targetPortID = '';
                newProp = { targetID: newConnector.targetID, targetPortID: newConnector.targetPortID };
            }
            else {
                newConnector.sourceID = '';
                newConnector.sourcePortID = '';
                newProp = { sourceID: newConnector.sourceID, sourcePortID: newConnector.sourcePortID };
            }
            this.diagram.connectorPropertyChange(newConnector, {}, newProp);
            var entry = {
                type: 'ConnectionChanged', undoObject: { connectors: [undoObject], nodes: [] },
                redoObject: { connectors: [cloneObject(newConnector)], nodes: [] }, category: 'Internal'
            };
            if (!(this.diagram.diagramActions & DiagramAction.UndoRedo)) {
                this.addHistoryEntry(entry);
            }
        }
    };
    /**
     * paste method\
     *
     * @returns { void }    paste method .\
     * @param {(NodeModel | ConnectorModel)[]} obj - provide the objects value.
     * @private
     */
    CommandHandler.prototype.paste = function (obj) {
        if (obj || this.clipboardData.clipObject) {
            this.diagram.protectPropertyChange(true);
            var copiedItems = obj ? this.getNewObject(obj) :
                this.clipboardData.clipObject;
            if (copiedItems) {
                var multiSelect = copiedItems.length !== 1;
                var groupAction = false;
                var objectTable = {};
                var keyTable = {};
                if (this.clipboardData.pasteIndex !== 0) {
                    this.clearSelection();
                }
                if (this.diagram.undoRedoModule) {
                    groupAction = true;
                    this.diagram.historyManager.startGroupAction();
                }
                for (var _i = 0, copiedItems_1 = copiedItems; _i < copiedItems_1.length; _i++) {
                    var copy = copiedItems_1[_i];
                    objectTable[copy.id] = copy;
                }
                var copiedObject = [];
                if (multiSelect) {
                    // This bool is also consider to prevent selection change event is triggered after every object clone
                    this.diagram.isServerUpdate = true;
                }
                for (var j = 0; j < copiedItems.length; j++) {
                    var copy = copiedItems[parseInt(j.toString(), 10)];
                    //EJ2-841227-Copy paste of child node from group node
                    if (copy.parentId) {
                        var parentObj = this.diagram.getObject(copy.parentId);
                        if (parentObj.shape.type !== 'SwimLane' && copy.parentId) {
                            copy.parentId = '';
                        }
                    }
                    if (getObjectType(copy) === Connector) {
                        var clonedObj = clone(copy);
                        var nodeId = clonedObj.sourceID;
                        clonedObj.sourceID = '';
                        if (objectTable["" + nodeId] && keyTable["" + nodeId]) {
                            clonedObj.sourceID = keyTable["" + nodeId];
                        }
                        nodeId = clonedObj.targetID;
                        clonedObj.targetID = '';
                        if (objectTable["" + nodeId] && keyTable["" + nodeId]) {
                            clonedObj.targetID = keyTable["" + nodeId];
                        }
                        //To check if the connector is cloned already for text annotation node.
                        var allowClone = true;
                        if (clonedObj.targetID) {
                            var targetNode = this.diagram.nameTable[clonedObj.targetID];
                            if (targetNode.shape.shape === 'TextAnnotation' && targetNode.inEdges && targetNode.inEdges.length > 0) {
                                allowClone = false;
                            }
                        }
                        if (allowClone) {
                            var newObj = this.cloneConnector(clonedObj, multiSelect);
                            copiedObject.push(newObj);
                            keyTable[copy.id] = newObj.id;
                        }
                    }
                    else {
                        // Ej2-909148-BPMN -- BPMN Subprocess Issues with Node Misplacement During Copy/Paste and Undo/Redo
                        if (copy.shape && copy.shape.type === 'Bpmn') {
                            copy.processId = '';
                        }
                        //To indicate the node cloning which helps to avoid alignment of child nodes with flip.
                        this.cloningInProgress = true;
                        var newNode = this.cloneNode(copy, multiSelect);
                        this.cloningInProgress = false;
                        copiedObject.push(newNode);
                        //bpmn text annotations will not be pasted
                        if (newNode) {
                            keyTable[copy.id] = newNode.id;
                            var edges = copy.inEdges;
                            if (edges) {
                                for (var _a = 0, edges_1 = edges; _a < edges_1.length; _a++) {
                                    var edge = edges_1[_a];
                                    if (objectTable["" + edge] && keyTable["" + edge]) {
                                        var newConnector = this.diagram.nameTable[keyTable["" + edge]];
                                        newConnector.targetID = keyTable[copy.id];
                                        this.diagram.connectorPropertyChange(newConnector, { targetID: '', targetPortID: '' }, { targetID: newConnector.targetID, targetPortID: newConnector.targetPortID });
                                    }
                                }
                            }
                            edges = copy.outEdges;
                            if (edges) {
                                for (var _b = 0, edges_2 = edges; _b < edges_2.length; _b++) {
                                    var edge = edges_2[_b];
                                    if (objectTable["" + edge] && keyTable["" + edge]) {
                                        var newConnector = this.diagram.nameTable[keyTable["" + edge]];
                                        newConnector.sourceID = keyTable[copy.id];
                                        this.diagram.connectorPropertyChange(newConnector, { sourceID: '', sourcePortID: '' }, { sourceID: newConnector.sourceID, sourcePortID: newConnector.sourcePortID });
                                    }
                                }
                            }
                        }
                    }
                }
                if (multiSelect) {
                    this.diagram.isServerUpdate = false;
                    // this.diagram.UpdateBlazorDiagramModelCollection(copiedItems[0] as Node, copiedObject);
                    // this.getBlazorOldValues();
                    this.diagram.select(copiedObject, true);
                }
                if (groupAction === true) {
                    this.diagram.historyManager.endGroupAction();
                    groupAction = false;
                }
                if (this.diagram.mode !== 'SVG') {
                    this.diagram.refreshDiagramLayer();
                }
                this.clipboardData.pasteIndex++;
                this.diagram.protectPropertyChange(false);
            }
        }
    };
    CommandHandler.prototype.getNewObject = function (obj) {
        var newObj;
        var newobjs = [];
        this.clipboardData.pasteIndex = 1;
        for (var i = 0; i < obj.length; i++) {
            newObj = cloneObject(obj[parseInt(i.toString(), 10)]);
            newobjs.push(newObj);
        }
        return newobjs;
    };
    CommandHandler.prototype.cloneConnector = function (connector, multiSelect) {
        //let newConnector: Node | Connector;
        var cloneObject = clone(connector);
        this.translateObject(cloneObject);
        cloneObject.zIndex = Number.MIN_VALUE;
        var newConnector = this.diagram.add(cloneObject);
        if (!this.diagram.isServerUpdate) {
            this.selectObjects([newConnector], multiSelect);
        }
        return newConnector;
    };
    CommandHandler.prototype.cloneNode = function (node, multiSelect, children, groupnodeID) {
        var newNode;
        var connectorsTable = {};
        var cloneObject = clone(node);
        var process;
        var temp = this.diagram.nameTable[node.parentId];
        if (node.shape && node.shape.type === 'Bpmn' && node.shape.activity &&
            node.shape.activity.subProcess.processes
            && node.shape.activity.subProcess.processes.length) {
            process = cloneObject.shape.activity.subProcess.processes;
            cloneObject.zIndex = Number.MIN_VALUE;
            cloneObject.shape.activity.subProcess.processes = undefined;
        }
        if (node.shape && node.shape.type === 'SwimLane') {
            pasteSwimLane(node, this.diagram, this.clipboardData);
        }
        else if (temp && temp.shape.type === 'SwimLane') {
            pasteSwimLane(clone(temp), this.diagram, this.clipboardData, node, true);
        }
        else if (node.children && node.children.length && (!children || !children.length)) {
            newNode = this.cloneGroup(node, multiSelect);
        }
        else {
            this.translateObject(cloneObject, groupnodeID);
            cloneObject.zIndex = Number.MIN_VALUE;
            if (children) {
                cloneObject.children = children;
            }
            if (cloneObject.shape && cloneObject.shape.shape === 'TextAnnotation') {
                cloneObject.isTextAnnotationCopied = true;
            }
            newNode = this.diagram.add(cloneObject);
        }
        for (var _i = 0, _a = Object.keys(connectorsTable); _i < _a.length; _i++) {
            var i = _a[_i];
            this.diagram.add(connectorsTable["" + i]);
        }
        if (process && process.length) {
            newNode.shape.activity.subProcess.processes = process;
            this.cloneSubProcesses(newNode);
        }
        if (newNode && !this.diagram.isServerUpdate) {
            this.selectObjects([newNode], multiSelect);
        }
        return newNode;
    };
    CommandHandler.prototype.cloneSubProcesses = function (node) {
        var connector = [];
        var temp = {};
        if (node.shape.type === 'Bpmn' && node.shape.activity &&
            node.shape.activity.subProcess.processes
            && node.shape.activity.subProcess.processes.length) {
            var process = node.shape.activity.subProcess.processes;
            for (var g = 0; g < process.length; g++) {
                var child = this.diagram.nameTable[process[parseInt(g.toString(), 10)]]
                    || this.clipboardData.processTable[process[parseInt(g.toString(), 10)]];
                for (var _i = 0, _a = child.outEdges; _i < _a.length; _i++) {
                    var j = _a[_i];
                    if (connector.indexOf(j) < 0) {
                        connector.push(j);
                    }
                }
                for (var _b = 0, _c = child.inEdges; _b < _c.length; _b++) {
                    var j = _c[_b];
                    if (connector.indexOf(j) < 0) {
                        connector.push(j);
                    }
                }
                var innerChild = cloneObject(this.clipboardData.processTable[process[parseInt(g.toString(), 10)]]);
                innerChild.processId = node.id;
                var newNode = this.cloneNode(innerChild, false);
                temp[process[parseInt(g.toString(), 10)]] = newNode.id;
                process[parseInt(g.toString(), 10)] = newNode.id;
                this.diagram.addProcess(newNode, node.id);
                for (var _d = 0, connector_1 = connector; _d < connector_1.length; _d++) {
                    var i = connector_1[_d];
                    var node_1 = this.diagram.nameTable["" + i] || this.diagram.connectorTable["" + i];
                    var clonedNode = cloneObject(node_1);
                    if (temp[clonedNode.sourceID] && temp[clonedNode.targetID]) {
                        clonedNode.zIndex = -1;
                        clonedNode.id += randomId();
                        clonedNode.sourceID = temp[clonedNode.sourceID];
                        clonedNode.targetID = temp[clonedNode.targetID];
                        connector.splice(connector.indexOf(i), 1);
                        //937235: Copy paste subprocess with connector, the connector disappears.
                        clonedNode.zIndex = Number.MIN_VALUE;
                        this.diagram.add(clonedNode);
                    }
                }
            }
        }
    };
    CommandHandler.prototype.cloneGroup = function (obj, multiSelect) {
        var value;
        var sourceId;
        var targetId;
        var newChildren = [];
        var children = [];
        var connectorObj = [];
        var newObj;
        var oldID = [];
        children = children.concat(obj.children);
        var id = randomId();
        var objectCollection = [];
        this.diagram.blazorActions |= BlazorAction.GroupClipboardInProcess;
        if (this.clipboardData.childTable || obj.children.length > 0) {
            for (var i = 0; i < children.length; i++) {
                var childObj = void 0;
                if (this.clipboardData.childTable) {
                    childObj = this.clipboardData.childTable[children[parseInt(i.toString(), 10)]];
                    // EJ2-905181 - Added to consider copy paste and clone the new group node.
                    if (!childObj) {
                        childObj = this.diagram.nameTable[children[parseInt(i.toString(), 10)]];
                    }
                }
                else {
                    childObj = this.diagram.nameTable[children[parseInt(i.toString(), 10)]];
                }
                childObj.parentId = '';
                if (childObj) {
                    if (getObjectType(childObj) === Connector) {
                        connectorObj.push(childObj);
                    }
                    else {
                        newObj = this.cloneNode(childObj, multiSelect, undefined, id);
                        oldID.push(childObj.id);
                        newChildren.push(newObj.id);
                        objectCollection.push(newObj);
                    }
                }
            }
        }
        for (var k = 0; k < connectorObj.length; k++) {
            if (connectorObj[parseInt(k.toString(), 10)].sourceID || connectorObj[parseInt(k.toString(), 10)].targetID) {
                for (var j = 0; j < oldID.length; j++) {
                    if (connectorObj[parseInt(k.toString(), 10)].sourceID === (oldID[parseInt(j.toString(), 10)])) {
                        sourceId = connectorObj[parseInt(k.toString(), 10)].sourceID;
                        connectorObj[parseInt(k.toString(), 10)].sourceID += id;
                    }
                    if (connectorObj[parseInt(k.toString(), 10)].targetID === (oldID[parseInt(j.toString(), 10)])) {
                        targetId = connectorObj[parseInt(k.toString(), 10)].targetID;
                        connectorObj[parseInt(k.toString(), 10)].targetID += id;
                    }
                }
            }
            newObj = this.cloneConnector(connectorObj[parseInt(k.toString(), 10)], multiSelect);
            //EJ2-839982 - When we copy paste the group node multiple times, the connector is not rendered properly
            connectorObj[parseInt(k.toString(), 10)].sourceID = sourceId;
            connectorObj[parseInt(k.toString(), 10)].targetID = targetId;
            newChildren.push(newObj.id);
            objectCollection.push(newObj);
        }
        var parentObj = this.cloneNode(obj, multiSelect, newChildren);
        objectCollection.push(parentObj);
        if (parentObj && parentObj.container && parentObj.shape && parentObj.shape.type === 'UmlClassifier') {
            this.diagram.updateDiagramObject(parentObj);
            parentObj.wrapper.measure(new Size());
        }
        this.diagram.blazorActions &= ~BlazorAction.GroupClipboardInProcess;
        if (!this.diagram.isServerUpdate) {
            this.diagram.UpdateBlazorDiagramModelCollection(undefined, objectCollection, undefined, true);
        }
        else {
            this.cloneGroupChildCollection = objectCollection;
        }
        return parentObj;
    };
    /**
     * translateObject method\
     *
     * @returns { Object[] }    translateObject method .\
     * @param {Node | Connector} obj - provide the objects value.
     * @param {string} groupnodeID - provide the objects value.
     * @private
     */
    CommandHandler.prototype.translateObject = function (obj, groupnodeID) {
        obj.id += groupnodeID || randomId();
        var diff = this.clipboardData.pasteIndex * 10;
        if (getObjectType(obj) === Connector) {
            obj.sourcePoint = {
                x: obj.sourcePoint.x + diff, y: obj.sourcePoint.y + diff
            };
            obj.targetPoint = {
                x: obj.targetPoint.x + diff, y: obj.targetPoint.y + diff
            };
            if (obj.type === 'Bezier') {
                var segments = obj.segments;
                for (var i = 0; i < segments.length; i++) {
                    if (!Point.isEmptyPoint(segments[parseInt(i.toString(), 10)].point1)) {
                        segments[parseInt(i.toString(), 10)].point1 = {
                            x: segments[parseInt(i.toString(), 10)].point1.x + diff, y: segments[parseInt(i.toString(), 10)].point1.y + diff
                        };
                    }
                    if (!Point.isEmptyPoint(segments[parseInt(i.toString(), 10)].point2)) {
                        segments[parseInt(i.toString(), 10)].point2 = {
                            x: segments[parseInt(i.toString(), 10)].point2.x + diff, y: segments[parseInt(i.toString(), 10)].point2.y + diff
                        };
                    }
                }
            }
            if (obj.type === 'Straight' || obj.type === 'Bezier') {
                if (obj.segments && obj.segments.length > 0) {
                    var segments = obj.segments;
                    for (var i = 0; i < segments.length - 1; i++) {
                        segments[parseInt(i.toString(), 10)].point.x += diff;
                        segments[parseInt(i.toString(), 10)].point.y += diff;
                    }
                }
            }
        }
        else {
            obj.offsetX += diff;
            obj.offsetY += diff;
        }
    };
    /**
     * drawObject method\
     *
     * @returns { Node | Connector }    drawObject method .\
     * @param {Node | Connector} obj - provide the objects value.
     * @private
     */
    CommandHandler.prototype.drawObject = function (obj) {
        var newObj;
        //let cloneObject: Node | Connector;
        if (obj && obj.shape) {
            if (obj.shape.type === 'Text') {
                obj.width = this.diagram.drawingObject.width ? this.diagram.drawingObject.width : 50;
                obj.height = this.diagram.drawingObject.height ? this.diagram.drawingObject.height : 20;
            }
        }
        var cloneObject = clone(this.diagram.drawingObject);
        for (var _i = 0, _a = Object.keys(obj); _i < _a.length; _i++) {
            var prop = _a[_i];
            cloneObject["" + prop] = obj["" + prop];
        }
        if (getObjectType(this.diagram.drawingObject) === Node || (getObjectType(this.diagram.drawingObject) === Connector && this.diagram.drawingObject.type === 'Freehand' && obj.type !== 'Bezier')) {
            newObj = new Node(this.diagram, 'nodes', cloneObject, true);
            newObj.id = (this.diagram.drawingObject.id || 'node') + randomId();
        }
        else {
            newObj = new Connector(this.diagram, 'connectors', cloneObject, true);
            newObj.id = (this.diagram.drawingObject ? (this.diagram.drawingObject.id ? this.diagram.drawingObject.id : 'connector')
                : 'connector') + randomId();
        }
        this.diagram.initObject(newObj);
        this.diagram.updateDiagramObject(newObj);
        this.diagram.currentDrawingObject = newObj;
        return newObj;
    };
    /**
     * addObjectToDiagram method\
     *
     * @returns { void }    addObjectToDiagram method .\
     * @param {Node | Connector} obj - provide the objects value.
     * @private
     */
    CommandHandler.prototype.addObjectToDiagram = function (obj) {
        //let newObj: Node | Connector;
        this.diagram.removeFromAQuad(obj);
        this.diagram.removeObjectsFromLayer(this.diagram.nameTable[obj.id]);
        delete this.diagram.nameTable[obj.id];
        //EJ2-62652 - Added below code to empty the segment collection if connector type is bezier
        if (obj instanceof Connector && obj.type === 'Bezier' && obj.segments.length > 0
            && (this.diagram.drawingObject && this.diagram.drawingObject.type === 'Bezier')) {
            obj.segments = [];
        }
        var newObj = this.diagram.add(obj);
        if (this.diagram.mode !== 'SVG') {
            this.diagram.refreshDiagramLayer();
        }
        this.selectObjects([newObj]);
        if (obj && (!(canContinuousDraw(this.diagram)))) {
            this.diagram.tool &= ~DiagramTools.DrawOnce;
            this.diagram.currentDrawingObject = undefined;
        }
    };
    /**
     * addObjectToDiagram method\
     *
     * @returns { void }    addObjectToDiagram method .\
     * @param {boolean} enable - provide the objects value.
     * @private
     */
    CommandHandler.prototype.enableServerDataBinding = function (enable) {
        this.diagram.enableServerDataBinding(enable);
    };
    /**
     * addText method\
     *
     * @returns { void }    addText method .\
     * @param {boolean} obj - provide the objects value.
     * @param {PointModel} currentPosition - provide the objects value.
     * @private
     */
    CommandHandler.prototype.addText = function (obj, currentPosition) {
        var annotation = this.diagram.findElementUnderMouse(obj, currentPosition, this.diagram);
        this.diagram.startTextEdit(obj, annotation instanceof TextElement ? (annotation.id).split('_')[1] : undefined);
    };
    /**
     * isUserHandle method\
     *
     * @returns { boolean }    isUserHandle method .\
     * @param {PointModel} position - provide the objects value.
     * @private
     */
    CommandHandler.prototype.isUserHandle = function (position) {
        var handle = this.diagram.selectedItems;
        if (handle.wrapper && canShowCorner(handle.constraints, 'UserHandle')) {
            for (var _i = 0, _a = handle.userHandles; _i < _a.length; _i++) {
                var obj = _a[_i];
                if (obj.visible) {
                    var paddedBounds = getUserHandlePosition(handle, obj, this.diagram.scroller.transform);
                    if (contains(position, paddedBounds, obj.size / (2 * this.diagram.scroller.transform.scale))) {
                        return true;
                    }
                }
            }
        }
        return false;
    };
    /**
     * selectObjects method\
     *
     * @returns { Promise<void> }    selectObjects method .\
     * @param {(NodeModel | ConnectorModel | AnnotationModel)[]} obj - provide the objects value.
     * @param {boolean} multipleSelection - provide the objects value.
     * @param {(NodeModel | ConnectorModel| AnnotationModel)[]} oldValue - provide the objects value.
     * @private
     */
    CommandHandler.prototype.selectObjects = function (obj, multipleSelection, oldValue) {
        return __awaiter(this, void 0, void 0, function () {
            var arg, swimlaneNode, laneId, j, i, parentId, select, oldSelectedItems, canDoMultipleSelection, canDoSingleSelection, i, newObj, i_1, parentNode;
            return __generator(this, function (_a) {
                arg = {
                    oldValue: oldValue ? oldValue : this.getSelectedObject(),
                    newValue: obj, cause: this.diagram.diagramActions,
                    state: 'Changing', type: 'Addition', cancel: false
                };
                // EJ2-57157 - Added to consider the lane header at selection change when selecting a lane.
                if (obj.length > 0 && (obj[0] && obj[0].isLane)) {
                    swimlaneNode = this.diagram.getObject(obj[0].parentId);
                    obj[0].shape.header = [];
                    laneId = '';
                    for (j = 0; j < obj.length; j++) {
                        for (i = 0; i < swimlaneNode.shape.lanes.length; i++) {
                            parentId = obj[0].id.split(obj[0].parentId);
                            laneId = parentId[1].slice(0, -1);
                            if (laneId === swimlaneNode.shape.lanes[parseInt(i.toString(), 10)].id) {
                                obj[0].shape.header.push(swimlaneNode.shape.lanes[parseInt(i.toString(), 10)].header);
                            }
                        }
                    }
                }
                this.diagram.enableServerDataBinding(false);
                select = true;
                if (!isBlazor()) {
                    this.diagram.triggerEvent(DiagramEvent.selectionChange, arg);
                }
                else {
                    this.oldSelectedObjects = cloneSelectedObjects(this.diagram);
                }
                oldSelectedItems = this.diagram.selectedItems.annotation ?
                    [this.diagram.selectedItems.annotation] :
                    (this.diagram.selectedItems.nodes.concat(this.diagram.selectedItems.connectors));
                canDoMultipleSelection = canMultiSelect(this.diagram);
                canDoSingleSelection = canSingleSelect(this.diagram);
                if (canDoSingleSelection || canDoMultipleSelection) {
                    if (!canDoMultipleSelection && ((obj.length > 1) || (multipleSelection && obj.length === 1))) {
                        if (obj.length === 1) {
                            this.clearSelection();
                        }
                        else {
                            return [2 /*return*/];
                        }
                    }
                    if (!(canDoSingleSelection || canDoMultipleSelection) && obj.length === 1
                        && (!multipleSelection || !hasSelection(this.diagram))) {
                        this.clearSelection();
                        return [2 /*return*/];
                    }
                }
                if (!arg.cancel) {
                    for (i = 0; i < obj.length; i++) {
                        newObj = obj[parseInt(i.toString(), 10)];
                        if (newObj) {
                            select = true;
                            if (!hasSelection(this.diagram)) {
                                this.select(newObj, i > 0 || multipleSelection, true);
                            }
                            else {
                                if ((i > 0 || multipleSelection) && newObj.children && !newObj.parentId) {
                                    for (i_1 = 0; i_1 < this.diagram.selectedItems.nodes.length; i_1++) {
                                        parentNode = this.diagram.nameTable[this.diagram.selectedItems.nodes[parseInt(i_1.toString(), 10)].parentId];
                                        if (parentNode) {
                                            parentNode = this.findParent(parentNode);
                                            if (parentNode) {
                                                if (newObj.id === parentNode.id) {
                                                    this.selectGroup(newObj);
                                                }
                                            }
                                        }
                                    }
                                }
                                this.selectProcesses(newObj);
                                select = this.selectBpmnSubProcesses(newObj);
                                if (select) {
                                    this.select(newObj, i > 0 || multipleSelection, true);
                                }
                            }
                        }
                    }
                    if (oldValue === undefined) {
                        oldValue = oldSelectedItems;
                    }
                    arg = {
                        oldValue: oldValue ? oldValue : [],
                        newValue: this.getSelectedObject(),
                        cause: this.diagram.diagramActions, state: 'Changed', type: 'Addition', cancel: false
                    };
                    this.diagram.renderSelector(multipleSelection || (obj && obj.length > 1));
                    // this.updateBlazorSelectorModel(oldValue);
                    if (!isBlazor()) {
                        this.diagram.triggerEvent(DiagramEvent.selectionChange, arg);
                    }
                    this.diagram.enableServerDataBinding(true);
                }
                return [2 /*return*/];
            });
        });
    };
    // /**
    //  * updateBlazorSelector method\
    //  *
    //  * @returns { void }    updateBlazorSelector method .\
    //  * @private
    //  */
    // public updateBlazorSelector(): void {
    //     //remove blazor code
    // }
    /**
     * findParent method\
     *
     * @returns { Node }    findParent method .\
     * @param {Node} node - provide the objects value.
     * @private
     */
    CommandHandler.prototype.findParent = function (node) {
        if (node.parentId) {
            node = this.diagram.nameTable[node.parentId];
            this.findParent(node);
        }
        return node;
    };
    CommandHandler.prototype.selectProcesses = function (newObj) {
        if (this.hasProcesses(newObj)) {
            var processes = (newObj).shape.activity.subProcess.processes;
            for (var i = 0; i < processes.length; i++) {
                var innerChild = this.diagram.nameTable[processes[parseInt(i.toString(), 10)]];
                if (this.hasProcesses(innerChild)) {
                    this.selectObjects([innerChild], true);
                }
                this.unSelect(innerChild);
            }
        }
    };
    CommandHandler.prototype.selectGroup = function (newObj) {
        for (var j = 0; j < newObj.children.length; j++) {
            var innerChild = this.diagram.nameTable[newObj.children[parseInt(j.toString(), 10)]];
            if (innerChild.children) {
                this.selectGroup(innerChild);
            }
            this.unSelect(this.diagram.nameTable[newObj.children[parseInt(j.toString(), 10)]]);
        }
    };
    CommandHandler.prototype.selectBpmnSubProcesses = function (node) {
        var select = true;
        var parent;
        if (node.processId) {
            if (isSelected(this.diagram, this.diagram.nameTable[node.processId])) {
                select = false;
            }
            else {
                select = this.selectBpmnSubProcesses(this.diagram.nameTable[node.processId]);
            }
        }
        else if (node instanceof Connector) {
            if (node.sourceID && this.diagram.nameTable[node.sourceID] &&
                this.diagram.nameTable[node.sourceID].processId) {
                parent = this.diagram.nameTable[node.sourceID].processId;
            }
            if (node.targetID && this.diagram.nameTable[node.targetID] &&
                this.diagram.nameTable[node.targetID].processId) {
                parent = this.diagram.nameTable[node.targetID].processId;
            }
            if (parent) {
                if (isSelected(this.diagram, this.diagram.nameTable["" + parent])) {
                    return false;
                }
                else {
                    select = this.selectBpmnSubProcesses(this.diagram.nameTable["" + parent]);
                }
            }
        }
        else if (node.parentId && this.diagram.nameTable[node.parentId] &&
            this.diagram.nameTable[node.parentId].shape.type === 'UmlClassifier') {
            if (isSelected(this.diagram, this.diagram.nameTable[node.parentId])) {
                select = false;
            }
        }
        return select;
    };
    CommandHandler.prototype.hasProcesses = function (node) {
        if (node) {
            if ((node.shape.type === 'Bpmn') && node.shape.activity &&
                node.shape.activity.subProcess.processes &&
                node.shape.activity.subProcess.processes.length > 0) {
                return true;
            }
        }
        return false;
    };
    /**
     * select method\
     *
     * @returns { void }    select method .\
     * @param {NodeModel | ConnectorModel} obj - provide the objects value.
     * @param {boolean} multipleSelection - provide the objects value.
     * @param {boolean} preventUpdate - provide the objects value.
     * @private
     */
    CommandHandler.prototype.select = function (obj, multipleSelection, preventUpdate) {
        var hasLayer = this.getObjectLayer(obj.id);
        if ((canSelect(obj) && !(obj instanceof Selector) && !isSelected(this.diagram, obj))
            && (hasLayer && !hasLayer.lock && hasLayer.visible) && obj.wrapper.visible) {
            multipleSelection = hasSelection(this.diagram) ? multipleSelection : false;
            if (!multipleSelection) {
                this.clearSelection();
            }
            this.diagram.enableServerDataBinding(false);
            var selectorModel = this.diagram.selectedItems;
            var convert = obj;
            if (convert instanceof Node) {
                if (obj.isHeader) {
                    var node = this.diagram.nameTable[obj.parentId];
                    selectorModel.nodes.push(node);
                }
                else {
                    selectorModel.nodes.push(obj);
                }
            }
            else {
                selectorModel.connectors.push(obj);
            }
            // EJ2-56919 - Push the newly selected objects in selectedObjects collection
            selectorModel.selectedObjects.push(obj);
            if (!multipleSelection) {
                selectorModel.init(this.diagram);
                if (selectorModel.nodes.length === 1 && selectorModel.connectors.length === 0) {
                    var wrapper = gridSelection(this.diagram, selectorModel);
                    if (wrapper) {
                        selectorModel.wrapper.children[0] = wrapper;
                    }
                    selectorModel.rotateAngle = selectorModel.nodes[0].rotateAngle;
                    selectorModel.wrapper.rotateAngle = selectorModel.nodes[0].rotateAngle;
                    selectorModel.wrapper.pivot = selectorModel.nodes[0].pivot;
                }
            }
            else {
                selectorModel.wrapper.rotateAngle = selectorModel.rotateAngle = 0;
                selectorModel.wrapper.children.push(obj.wrapper);
            }
            if (!preventUpdate) {
                this.diagram.renderSelector(multipleSelection);
            }
            this.diagram.enableServerDataBinding(true);
        }
    };
    // private getObjectCollectionId(isNode: boolean, clearSelection?: boolean): string[] {
    //     const id: string[] = [];
    //     let i: number = 0;
    //     const selectedObject: (NodeModel | ConnectorModel)[] = isNode ? this.diagram.selectedItems.nodes
    //         : this.diagram.selectedItems.connectors;
    //     while (!clearSelection && i < selectedObject.length) {
    //         id[parseInt(i.toString(), 10)] = selectedObject[parseInt(i.toString(), 10)].id;
    //         i++;
    //     }
    //     return id;
    // }
    // private updateBlazorSelectorModel(oldItemsCollection: (NodeModel | ConnectorModel)[], clearSelection?: boolean): void {
    // remove blazor code
    // }
    /**
     * labelSelect method\
     *
     * @returns { void }    labelSelect method .\
     * @param {NodeModel | ConnectorModel | AnnotationModel} obj - provide the objects value.
     * @param {DiagramElement} textWrapper - provide the objects value.
     * @private
     */
    CommandHandler.prototype.labelSelect = function (obj, textWrapper, oldValue) {
        this.oldSelectedObjects = cloneSelectedObjects(this.diagram);
        var annotation = this.findTarget(textWrapper, obj);
        // Prepare the event arguments
        var eventArgs = {
            oldValue: oldValue ? oldValue : this.getSelectedObject(),
            newValue: [annotation],
            cause: this.diagram.diagramActions,
            state: 'Changing', type: 'Addition', cancel: false
        };
        // Trigger the selectionChange event with the updated newValue
        if (!isBlazor()) {
            this.diagram.triggerEvent(DiagramEvent.selectionChange, eventArgs);
        }
        else {
            this.oldSelectedObjects = cloneSelectedObjects(this.diagram);
        }
        if (!eventArgs.cancel) {
            var selectorModel = (this.diagram.selectedItems);
            var isEnableServerDatabind = this.diagram.allowServerDataBinding;
            this.diagram.allowServerDataBinding = false;
            selectorModel.nodes = selectorModel.connectors = [];
            this.diagram.allowServerDataBinding = isEnableServerDatabind;
            if (obj instanceof Node) {
                selectorModel.nodes[0] = obj;
            }
            else {
                selectorModel.connectors[0] = obj;
            }
            selectorModel.annotation = annotation;
            selectorModel.init(this.diagram);
            this.diagram.renderSelector(false);
            eventArgs = {
                oldValue: oldValue ? oldValue : [],
                newValue: [selectorModel.annotation],
                cause: this.diagram.diagramActions, state: 'Changed', type: 'Addition', cancel: false
            };
            if (!isBlazor()) {
                this.diagram.triggerEvent(DiagramEvent.selectionChange, eventArgs);
            }
        }
    };
    /**
     * unSelect method\
     *
     * @returns { void }    unSelect method .\
     * @param {NodeModel | ConnectorModel} obj - provide the objects value.
     * @private
     */
    CommandHandler.prototype.unSelect = function (obj) {
        var objArray = [];
        objArray.push(obj);
        var items = (this.diagram.selectedItems.nodes.concat(this.diagram.selectedItems.connectors));
        var selectedObjects = items.filter(function (items) {
            return items.id !== obj.id;
        });
        var arg = {
            oldValue: items, newValue: selectedObjects, cause: this.diagram.diagramActions,
            state: 'Changing', type: 'Removal', cancel: false
        };
        if (!this.diagram.currentSymbol) {
            if (!isBlazor()) {
                this.diagram.triggerEvent(DiagramEvent.selectionChange, arg);
            }
        }
        if (isSelected(this.diagram, obj)) {
            var selectormodel = this.diagram.selectedItems;
            var index = void 0;
            if (obj instanceof Node) {
                index = selectormodel.nodes.indexOf(obj, 0);
                selectormodel.nodes.splice(index, 1);
            }
            else {
                index = selectormodel.connectors.indexOf(obj, 0);
                selectormodel.connectors.splice(index, 1);
            }
            index = selectormodel.selectedObjects.indexOf(obj, 0);
            selectormodel.selectedObjects.splice(index, 1);
            arg = {
                oldValue: items, newValue: selectedObjects, cause: this.diagram.diagramActions,
                state: 'Changed', type: 'Removal', cancel: false
            };
            // this.updateBlazorSelectorModel(objArray);
            arg = {
                oldValue: cloneBlazorObject(items), newValue: selectedObjects, cause: this.diagram.diagramActions,
                state: 'Changed', type: 'Removal', cancel: arg.cancel
            };
            if (!arg.cancel) {
                index = selectormodel.wrapper.children.indexOf(obj.wrapper, 0);
                selectormodel.wrapper.children.splice(index, 1);
                this.diagram.updateSelector();
                if (!this.diagram.currentSymbol) {
                    this.diagram.triggerEvent(DiagramEvent.selectionChange, arg);
                }
            }
        }
    };
    /**
     * getChildElements method\
     *
     * @returns { string[] }    getChildElements method .\
     * @param {DiagramElement[]} child - provide the objects value.
     * @private
     */
    // public getChildElements(child: DiagramElement[]): string[] {
    //     const children: string[] = [];
    //     for (let i: number = 0; i < child.length; i++) {
    //         const childNode: DiagramElement = child[parseInt(i.toString(), 10)];
    //         if ((childNode as Container).children && (childNode as Container).children.length > 0) {
    //             // children.concat(this.getChildElements((childNode as Container).children));
    //         } else {
    //             children.push(childNode.id);
    //             if (childNode instanceof TextElement) {
    //                 children.push(childNode.id + '_text');
    //             }
    //         }
    //     }
    //     return children;
    // }
    /**
     * moveSvgNode method\
     *
     * @returns { void }    moveSvgNode method .\
     * @param {string} nodeId - provide the objects value.
     * @param {string} targetID - provide the objects value.
     * @private
     */
    CommandHandler.prototype.moveSvgNode = function (nodeId, targetID) {
        //Bug 921994: Z-index order changes are not reflected at the UI level with Undo Redo commands.
        var node = this.diagram.nameTable["" + targetID];
        if (node.shape.type === 'Native' || node.shape.type === 'HTML') {
            this.updateNativeNodeIndex(nodeId, targetID);
        }
        else {
            var diagramDiv = getDiagramElement(targetID + '_groupElement', this.diagram.element.id);
            var backNode = getDiagramElement(nodeId + '_groupElement', this.diagram.element.id);
            diagramDiv.parentNode.insertBefore(backNode, diagramDiv);
        }
    };
    CommandHandler.prototype.moveAfterSvgNode = function (nodeId, targetID) {
        //Bug 921994: Z-index order changes are not reflected at the UI level with Undo Redo commands.
        var node = this.diagram.nameTable["" + targetID];
        if (node && (node.shape.type === 'HTML' || node.shape.type === 'Native')) {
            for (var i = 0; i < this.diagram.views.length; i++) {
                var id = node.shape.type === 'HTML' ? '_html_element' : '_content_groupElement';
                var backNode = getDiagramElement(nodeId + id, this.diagram.views[parseInt(i.toString(), 10)]);
                var diagramDiv = targetID ? getDiagramElement(targetID + id, this.diagram.views[parseInt(i.toString(), 10)])
                    : backNode.parentElement.firstChild;
                if (backNode && diagramDiv) {
                    if (backNode.parentNode.id === diagramDiv.parentNode.id) {
                        diagramDiv.insertAdjacentElement('afterend', backNode);
                    }
                }
            }
        }
        else {
            var diagramDiv = getDiagramElement(targetID + '_groupElement', this.diagram.element.id);
            var backNode = getDiagramElement(nodeId + '_groupElement', this.diagram.element.id);
            diagramDiv.insertAdjacentElement('afterend', backNode);
        }
    };
    /**
     * sendLayerBackward method\
     *
     * @returns { void }    sendLayerBackward method .\
     * @param {string} layerName - provide the objects value.
     * @private
     */
    CommandHandler.prototype.sendLayerBackward = function (layerName) {
        var layer = this.getLayer(layerName);
        if (layer && layer.zIndex !== 0) {
            var index = layer.zIndex;
            if (this.diagram.mode === 'SVG') {
                var currentLayerObject = layer.objects;
                var targetObject = this.getLayer(this.diagram.layerZIndexTable[index - 1]).objects[0];
                if (targetObject) {
                    for (var _i = 0, currentLayerObject_1 = currentLayerObject; _i < currentLayerObject_1.length; _i++) {
                        var obj = currentLayerObject_1[_i];
                        this.moveSvgNode(obj, targetObject);
                    }
                }
            }
            var targetLayer = this.getLayer(this.diagram.layerZIndexTable[index - 1]);
            targetLayer.zIndex = targetLayer.zIndex + 1;
            layer.zIndex = layer.zIndex - 1;
            var temp = this.diagram.layerZIndexTable[parseInt(index.toString(), 10)];
            this.diagram.layerZIndexTable[parseInt(index.toString(), 10)] = this.diagram.layerZIndexTable[index - 1];
            this.diagram.layerZIndexTable[index - 1] = temp;
            if (this.diagram.mode === 'Canvas') {
                this.diagram.refreshDiagramLayer();
            }
        }
    };
    /**
     * bringLayerForward method\
     *
     * @returns { void }    bringLayerForward method .\
     * @param {string} layerName - provide the objects value.
     * @private
     */
    CommandHandler.prototype.bringLayerForward = function (layerName) {
        var layer = this.getLayer(layerName);
        if (layer && layer.zIndex < this.diagram.layers.length - 1) {
            var index = layer.zIndex;
            var targetLayer = this.getLayer(this.diagram.layerZIndexTable[index + 1]);
            if (this.diagram.mode === 'SVG') {
                var currentLayerObject = layer.objects[0];
                var targetLayerObjects = targetLayer.objects;
                for (var _i = 0, targetLayerObjects_1 = targetLayerObjects; _i < targetLayerObjects_1.length; _i++) {
                    var obj = targetLayerObjects_1[_i];
                    if (obj) {
                        this.moveSvgNode(obj, currentLayerObject);
                    }
                }
            }
            targetLayer.zIndex = targetLayer.zIndex - 1;
            layer.zIndex = layer.zIndex + 1;
            var temp = this.diagram.layerZIndexTable[parseInt(index.toString(), 10)];
            this.diagram.layerZIndexTable[parseInt(index.toString(), 10)] = this.diagram.layerZIndexTable[index + 1];
            this.diagram.layerZIndexTable[index + 1] = temp;
            if (this.diagram.mode === 'Canvas') {
                this.diagram.refreshDiagramLayer();
            }
        }
    };
    /**
     * sendToBack method\
     *
     * @returns { void }    sendToBack method .\
     * @param {NodeModel | ConnectorModel} object - provide the objects value.
     * @private
     */
    CommandHandler.prototype.sendToBack = function (object) {
        this.diagram.protectPropertyChange(true);
        if (hasSelection(this.diagram) || object) {
            // EJ2-57772 - Added the below code to iterate all the selected nodes / connectors in the diagram and
            // perform send to back operation
            var selectedItems = this.diagram.selectedItems;
            var objects = [];
            if (object && object.id) {
                objects.push(object);
            }
            else {
                objects = objects.concat(selectedItems.nodes);
                objects = objects.concat(selectedItems.connectors);
            }
            var objectId = (object && object.id);
            var undoObject = cloneObject(this.diagram.selectedItems);
            objects = objects.slice().sort(function (a, b) { return a.zIndex - b.zIndex; });
            for (var i = objects.length - 1; i >= 0; i--) {
                var clonedObject = cloneObject(objects[parseInt(i.toString(), 10)]);
                objectId = objects[parseInt(i.toString(), 10)].id;
                var index = this.diagram.nameTable["" + objectId].zIndex;
                var layerNum = this.diagram.layers.indexOf(this.getObjectLayer(objectId));
                this.updateLayerZindexTable(layerNum);
                var zIndexTable = this.diagram.layers[parseInt(layerNum.toString(), 10)].zIndexTable;
                var layerObjects = this.diagram.layers[parseInt(layerNum.toString(), 10)].objects;
                var minZindex = null;
                var targetId = '';
                for (var i_2 = 0; i_2 < layerObjects.length; i_2++) {
                    var obj = this.diagram.nameTable[layerObjects[parseInt(i_2.toString(), 10)]];
                    if (minZindex === null || obj.zIndex < minZindex) {
                        minZindex = obj.zIndex;
                        targetId = obj.id;
                    }
                }
                var tempTable = JSON.parse(JSON.stringify(zIndexTable));
                var tempIndex = 0;
                //Checks whether the selected node is the only node in the node array.
                //Checks whether it is not a group and the nodes behind it are not it’s children.
                if (this.diagram.nodes.length !== 1 && (this.diagram.nameTable["" + objectId].children === undefined ||
                    this.checkObjectBehind(objectId, zIndexTable, index))) {
                    var obj = this.diagram.nameTable["" + objectId];
                    if (obj.zIndex > minZindex && obj.shape.type !== 'SwimLane') {
                        var clonedNode = cloneObject(obj);
                        var childMaxZindex = null;
                        var childCount = null;
                        if (obj.children) {
                            childMaxZindex = this.findMaxZIndex(obj);
                            childCount = childMaxZindex - obj.zIndex;
                            obj.zIndex = minZindex - 1 - childCount;
                            this.updateGroupZindex(obj, 'SendToBack', minZindex);
                        }
                        else {
                            obj.zIndex = minZindex - 1;
                        }
                        this.triggerOrderCommand(clonedNode, obj, obj);
                    }
                    else if (obj.shape.type === 'SwimLane') {
                        tempIndex = this.swapZIndexObjects(index, zIndexTable, objectId, tempTable);
                    }
                    // for (let i: number = index; i > 0; i--) {
                    //     if (zIndexTable[parseInt(i.toString(), 10)]) {
                    //         //When there are empty records in the zindex table
                    //         if (!zIndexTable[i - 1]) {
                    //             zIndexTable[i - 1] = zIndexTable[parseInt(i.toString(), 10)];
                    //             this.diagram.nameTable[zIndexTable[i - 1]].zIndex = i;
                    //             delete zIndexTable[parseInt(i.toString(), 10)];
                    //         } else {
                    //             //bringing the objects forward
                    //             let clonedNode = cloneObject( this.diagram.nameTable[zIndexTable[parseInt((i-1).toString(), 10)]]);
                    //             zIndexTable[parseInt(i.toString(), 10)] = zIndexTable[i - 1];
                    //             this.diagram.nameTable[zIndexTable[parseInt(i.toString(), 10)]].zIndex = i;
                    //             this.triggerOrderCommand(clonedNode, this.diagram.nameTable[zIndexTable[parseInt((i-1).toString(), 10)]], this.diagram.nameTable[zIndexTable[parseInt(i.toString(), 10)]]);
                    //         }
                    //     }
                    // }
                    // for (let i: number = index; i > 0; i--) {
                    //     if (zIndexTable[parseInt(i.toString(), 10)]) {
                    //         this.diagram.nameTable[zIndexTable[parseInt(i.toString(), 10)]].zIndex = i;
                    //     }
                    // }
                    // if (obj.shape.type !== 'SwimLane') {
                    //     zIndexTable[0] = this.diagram.nameTable[`${objectId}`].id;
                    //     this.diagram.nameTable[`${objectId}`].zIndex = 0;
                    //     this.triggerOrderCommand(clonedObject, objects[parseInt(i.toString(), 10)], objects[parseInt(i.toString(), 10)]);
                    // } else {
                    //     tempIndex = this.swapZIndexObjects(index, zIndexTable, objectId, tempTable);
                    // }
                    if (this.diagram.mode === 'SVG') {
                        var obj_1 = this.diagram.nameTable["" + objectId];
                        var i_3 = obj_1.shape.type !== 'SwimLane' ? minZindex : tempIndex;
                        // if (i !== tempIndex) {
                        //     i = (obj.children && obj.children.length > 0) ? index : 1;
                        // }
                        var target = zIndexTable[parseInt(i_3.toString(), 10)];
                        // EJ2-49326 - (CR issue fix) An exception raised when send the swimlane back to the normal node.
                        while (!target && i_3 < index) {
                            target = zIndexTable[++i_3];
                        }
                        // EJ2-46656 - CR issue fix
                        target = this.resetTargetNode(objectId, target, i_3, zIndexTable);
                        //EJ2-69654 - Send to back command not working when there is single node in layer
                        if (target) {
                            target = this.diagram.nameTable["" + target].parentId ? this.checkParentExist(target) : target;
                            this.moveSvgNode(objectId, target);
                        }
                        this.updateNativeNodeIndex(objectId);
                        this.updateLayerZindexTable(layerNum);
                    }
                    else {
                        this.diagram.refreshCanvasLayers();
                        this.updateLayerZindexTable(layerNum);
                    }
                }
            }
            var redoObject = cloneObject(this.diagram.selectedItems);
            var entry = { type: 'SendToBack', category: 'Internal', undoObject: undoObject, redoObject: redoObject };
            if (!(this.diagram.diagramActions & DiagramAction.UndoRedo)) {
                this.addHistoryEntry(entry);
            }
        }
        this.diagram.protectPropertyChange(false);
    };
    CommandHandler.prototype.findMaxZIndex = function (parent) {
        var _this = this;
        var childMaxZindex = null;
        // Recursive function to find the maximum zIndex among all children
        var findMax = function (parent) {
            for (var m = 0; m < parent.children.length; m++) {
                var child = _this.diagram.nameTable[parent.children[parseInt(m.toString(), 10)]];
                // Update the maximum zIndex found
                if (childMaxZindex === null || child.zIndex > childMaxZindex) {
                    childMaxZindex = child.zIndex;
                }
                // Recurse if the child has its own children
                if (child.children) {
                    findMax(child);
                }
            }
        };
        findMax(parent);
        return childMaxZindex; // Return the maximum zIndex found
    };
    CommandHandler.prototype.updateGroupZindex = function (parent, command, index) {
        var _this = this;
        var newIndex;
        if (newIndex === undefined) {
            newIndex = parent.zIndex + 1; // Assign index if it is undefined
        }
        // Recursive function to update zIndex
        var updateGroupindex = function (parent) {
            for (var n = 0; n < parent.children.length; n++) {
                var child = _this.diagram.nameTable[parent.children[parseInt(n.toString(), 10)]]; // Use the correct index without parsing to int
                if (child.children) {
                    child.zIndex = newIndex++; // Update zIndex for children with children (group)
                    updateGroupindex(child); // Recursively update child group
                }
                else {
                    child.zIndex = newIndex++; // Update zIndex for individual children
                }
            }
        };
        updateGroupindex(parent); // Start the update process from the parent
    };
    CommandHandler.prototype.updateLayersZindexTable = function (layerIndex) {
        this.updateLayerZindexTable(layerIndex);
    };
    CommandHandler.prototype.updateLayerZindexTable = function (layerIndex) {
        var layer = this.diagram.layers[parseInt(layerIndex.toString(), 10)];
        layer.zIndexTable = {};
        for (var i = 0; i < layer.objects.length; i++) {
            var obj = this.diagram.nameTable[layer.objects[parseInt(i.toString(), 10)]];
            layer.zIndexTable[obj.zIndex] = obj.id;
        }
    };
    CommandHandler.prototype.swapZIndexObjects = function (index, zIndexTable, objectId, tempTable) {
        var tempIndex = 0;
        var childCount = 0;
        var childIndex = -1;
        var j = 1;
        // Get the swimlane's Children count
        for (var i = 0; i <= index; i++) {
            if (zIndexTable[parseInt(i.toString(), 10)]
                && this.diagram.nameTable[zIndexTable[parseInt(i.toString(), 10)]].parentId === objectId) {
                // Get the swimlane's first children position from z index table
                if (childIndex === -1) {
                    childIndex = i;
                }
                childCount++;
            }
        }
        // Swap the swimlane children to the top of the z index table
        for (var i = 0; i <= index; i++) {
            if (zIndexTable[parseInt(i.toString(), 10)] && j <= childCount) {
                while (!zIndexTable[parseInt(childIndex.toString(), 10)]) {
                    childIndex++;
                }
                zIndexTable[parseInt(i.toString(), 10)] = zIndexTable[parseInt(childIndex.toString(), 10)];
                this.diagram.nameTable[zIndexTable[parseInt(i.toString(), 10)]].zIndex = i;
                childIndex++;
                j++;
            }
        }
        var k = 0;
        // Get the Z index from ZindexTable in the child's count position. In that position we want to put the swimlane
        for (var i = 0; i < childCount; i++) {
            while (!zIndexTable[parseInt(k.toString(), 10)]) {
                k++;
            }
            tempIndex = this.diagram.nameTable[zIndexTable[parseInt(k.toString(), 10)]].zIndex;
            k++;
        }
        tempIndex = tempIndex + 1;
        // Check if there is a object in the z index table or not
        while (!zIndexTable[parseInt(tempIndex.toString(), 10)]) {
            ++tempIndex;
        }
        k = 0;
        // Place the swimlane at the next position of the swimlane's last children.
        zIndexTable[parseInt(tempIndex.toString(), 10)] = this.diagram.nameTable["" + objectId].id;
        this.diagram.nameTable["" + objectId].zIndex = tempIndex;
        tempIndex = tempIndex + 1;
        // Now swap the intersect nodes at next position of the swimlane.
        for (var i = tempIndex; i <= index; i++) {
            if (zIndexTable[parseInt(i.toString(), 10)]) {
                while (!tempTable[parseInt(k.toString(), 10)]) {
                    k++;
                }
                zIndexTable[parseInt(i.toString(), 10)] = tempTable[parseInt(k.toString(), 10)];
                this.diagram.nameTable[zIndexTable[parseInt(i.toString(), 10)]].zIndex = i;
                k++;
            }
        }
        return tempIndex;
    };
    CommandHandler.prototype.resetTargetNode = function (objectId, target, i, zIndexTable) {
        if (this.diagram.nameTable["" + objectId].shape.type === 'SwimLane'
            && this.diagram.nameTable["" + target].parentId !== undefined && this.diagram.nameTable["" + target].parentId !== '' && this.diagram.nameTable[this.diagram.nameTable["" + target].parentId].isLane) {
            i = i + 1;
            if (zIndexTable[parseInt(i.toString(), 10)]) {
                target = zIndexTable[parseInt(i.toString(), 10)];
                return target = this.resetTargetNode(objectId, target, i, zIndexTable);
            }
            else {
                return target;
            }
        }
        else {
            return target;
        }
    };
    // private getZIndexObjects(): void {
    //     // const element: (NodeModel | ConnectorModel)[] = [];
    //     // let i: number; let j: number;
    //     // for (i = 0; i < this.diagram.nodes.length; i++) {
    //     //     element.push(this.diagram.nodes[parseInt(i.toString(), 10)]);
    //     // }
    //     // for (j = 0; j < this.diagram.connectors.length; j++) {
    //     //     element.push(this.diagram.connectors[parseInt(j.toString(), 10)]);
    //     // }
    //     // this.updateBlazorZIndex(element);
    // }
    // private updateBlazorZIndex(element: (NodeModel | ConnectorModel)[]): void {
    //     // const blazorInterop: string = 'sfBlazor';
    //     // const blazor: string = 'Blazor';
    //     // let diagramobject: object = {};
    //     // const nodeObject: NodeModel[] = [];
    //     // const connectorObject: ConnectorModel[] = [];
    //     // let k: number;
    //     // if (element && element.length > 0) {
    //     //     for (k = 0; k < element.length; k++) {
    //     //         const elementObject: (NodeModel | ConnectorModel) = element[parseInt(k.toString(), 10)];
    //     //         if (elementObject instanceof Node) {
    //     //             nodeObject.push(this.getBlazorObject(elementObject));
    //     //         } else if (elementObject instanceof Connector) {
    //     //             connectorObject.push(this.getBlazorObject(elementObject));
    //     //         }
    //     //     }
    //     // }
    //     // diagramobject = {
    //     //     nodes: nodeObject,
    //     //     connectors: connectorObject
    //     // };
    //     // if (window && window[`${blazor}`]) {
    //     //     const obj: object = { 'methodName': 'UpdateBlazorProperties', 'diagramobj': diagramobject };
    //     //     window[`${blazorInterop}`].updateBlazorProperties(obj, this.diagram);
    //     // }
    // }
    // private getBlazorObject(objectName: (NodeModel | ConnectorModel)): any {
    //     // const object: object = {
    //     //     sfIndex: getIndex(this.diagram, objectName.id),
    //     //     zIndex: objectName.zIndex
    //     // };
    //     // return object;
    // }
    //Checks whether the target is a child node.
    CommandHandler.prototype.checkParentExist = function (target) {
        var objBehind = target;
        while (this.diagram.nameTable["" + objBehind].parentId) {
            objBehind = this.diagram.nameTable["" + objBehind].parentId;
        }
        return objBehind;
    };
    //Checks whether the selected node is not a parent of another node.
    CommandHandler.prototype.checkObjectBehind = function (objectId, zIndexTable, index) {
        // for (let i: number = 0; i < index; i++) {
        //     const z: string = zIndexTable[parseInt(i.toString(), 10)];
        //     if (this.diagram.nameTable[`${z}`] && objectId !== this.diagram.nameTable[`${z}`].parentId) {
        //         return true;
        //     }
        // }
        return true;
    };
    /**
     * bringToFront method\
     *
     * @returns {  void  }    bringToFront method .\
     *  @param {NodeModel | ConnectorModel } obj - Provide the nodeArray element .
     * @private
     */
    CommandHandler.prototype.bringToFront = function (obj) {
        this.diagram.protectPropertyChange(true);
        if (hasSelection(this.diagram) || obj) {
            // EJ2-57772 - Added the below code to iterate all the selected nodes / connectors in the diagram and
            // perform bring to front operation
            var objectName = (obj && obj.id);
            var selectedItems = this.diagram.selectedItems;
            var objects = [];
            if (obj && obj.id) {
                objects.push(obj);
            }
            else {
                objects = objects.concat(selectedItems.nodes);
                objects = objects.concat(selectedItems.connectors);
            }
            var undoObject = cloneObject(this.diagram.selectedItems);
            objects = objects.slice().sort(function (a, b) { return a.zIndex - b.zIndex; });
            for (var i = 0; i < objects.length; i++) {
                var clonedObject = cloneObject(objects[parseInt(i.toString(), 10)]);
                objectName = objects[parseInt(i.toString(), 10)].id;
                var layerNum = this.diagram.layers.indexOf(this.getObjectLayer(objectName));
                this.updateLayerZindexTable(layerNum);
                var zIndexTable = this.diagram.layers[parseInt(layerNum.toString(), 10)].zIndexTable;
                var layerObjects = this.diagram.layers[parseInt(layerNum.toString(), 10)].objects;
                var maxZindex = null;
                for (var i_4 = 0; i_4 < layerObjects.length; i_4++) {
                    var obj_2 = this.diagram.nameTable[layerObjects[parseInt(i_4.toString(), 10)]];
                    if (maxZindex === null || obj_2.zIndex > maxZindex) {
                        maxZindex = obj_2.zIndex;
                    }
                }
                var tempTable = JSON.parse(JSON.stringify(zIndexTable));
                var tempIndex = 0;
                //find the maximum zIndex of the tabel
                var tabelLength = Number(Object.keys(zIndexTable).sort(function (a, b) { return Number(a) - Number(b); }).reverse()[0]);
                var index = this.diagram.nameTable["" + objectName].zIndex;
                var oldzIndexTable = [];
                var length_1 = 0;
                for (var i_5 = 0; i_5 <= tabelLength; i_5++) {
                    oldzIndexTable.push(zIndexTable[parseInt(i_5.toString(), 10)]);
                }
                var object = this.diagram.nameTable["" + objectName];
                if (object.shape.type === 'SwimLane') {
                    for (var i_6 = tabelLength; i_6 >= index; i_6--) {
                        if (zIndexTable[parseInt(i_6.toString(), 10)]
                            && !(this.diagram.nameTable[zIndexTable[parseInt(i_6.toString(), 10)]].parentId === objectName)) {
                            length_1 = i_6;
                            tabelLength = length_1;
                            break;
                        }
                    }
                }
                var obj_3 = this.diagram.nameTable["" + objectName];
                if (obj_3.zIndex < maxZindex && obj_3.shape.type !== 'SwimLane') {
                    var clonedNode = cloneObject(obj_3);
                    var childMaxZindex = null;
                    if (obj_3.children) {
                        childMaxZindex = this.findMaxZIndex(obj_3);
                        if (childMaxZindex < maxZindex) {
                            obj_3.zIndex = maxZindex + 1;
                            this.updateGroupZindex(obj_3, 'BringToFront', maxZindex);
                        }
                    }
                    else {
                        obj_3.zIndex = maxZindex + 1;
                    }
                    this.triggerOrderCommand(clonedNode, obj_3, obj_3);
                }
                // for (let i: number = index; i < tabelLength; i++) {
                //     //When there are empty records in the zindex table
                //     if (zIndexTable[parseInt(i.toString(), 10)]) {
                //         if (!zIndexTable[i + 1]) {
                //             zIndexTable[i + 1] = zIndexTable[parseInt(i.toString(), 10)];
                //             this.diagram.nameTable[zIndexTable[i + 1]].zIndex = i;
                //             delete zIndexTable[parseInt(i.toString(), 10)];
                //         } else {
                //             //bringing the objects backward
                //             let clonedNode = cloneObject(this.diagram.nameTable[zIndexTable[parseInt((i+1).toString(), 10)]]);
                //             zIndexTable[parseInt(i.toString(), 10)] = zIndexTable[i + 1];
                //             this.diagram.nameTable[zIndexTable[parseInt(i.toString(), 10)]].zIndex = i;
                //             this.triggerOrderCommand(clonedNode, this.diagram.nameTable[zIndexTable[parseInt((i+1).toString(), 10)]], this.diagram.nameTable[zIndexTable[parseInt(i.toString(), 10)]]);
                //         }
                //     }
                // }
                // for (let i: number = index; i < tabelLength; i++) {
                //     if (zIndexTable[parseInt(i.toString(), 10)]) {
                //         this.diagram.nameTable[zIndexTable[parseInt(i.toString(), 10)]].zIndex = i;
                //     }
                // }
                // if (object.shape.type !== 'SwimLane') {
                //     zIndexTable[parseInt(tabelLength.toString(), 10)] = this.diagram.nameTable[`${objectName}`].id;
                //     this.diagram.nameTable[`${objectName}`].zIndex = tabelLength;
                //     this.triggerOrderCommand(clonedObject, objects[parseInt(i.toString(), 10)], objects[parseInt(i.toString(), 10)]);
                // }
                else if (obj_3.shape.type === 'SwimLane') {
                    var childCount = 0;
                    var childIndex = -1;
                    var tempIndex_1 = 0;
                    var laneIndex = 0;
                    var cloneTable = JSON.parse(JSON.stringify(zIndexTable));
                    for (var i_7 = 0; i_7 <= index; i_7++) {
                        if (zIndexTable[parseInt(i_7.toString(), 10)]
                            && this.diagram.nameTable[zIndexTable[parseInt(i_7.toString(), 10)]].parentId === objectName) {
                            if (childIndex === -1) {
                                childIndex = i_7;
                                tempIndex_1 = i_7;
                                break;
                            }
                        }
                    }
                    for (var i_8 = 0; i_8 <= tabelLength; i_8++) {
                        if (tempTable[parseInt(i_8.toString(), 10)] && tempTable[parseInt(i_8.toString(), 10)] !== objectName
                            && this.diagram.nameTable[tempTable[parseInt(i_8.toString(), 10)]].parentId !== objectName) {
                            var node = this.diagram.nameTable[tempTable[parseInt(i_8.toString(), 10)]];
                            var swimlaneObject = this.diagram.nameTable["" + objectName];
                            if (node.zIndex >= swimlaneObject.zIndex) {
                                childCount++;
                            }
                        }
                    }
                    var k = childIndex;
                    for (var i_9 = 0; i_9 <= childCount; i_9++) {
                        while (!zIndexTable[parseInt(k.toString(), 10)]) {
                            k++;
                        }
                        laneIndex = this.diagram.nameTable[zIndexTable[parseInt(k.toString(), 10)]].zIndex;
                        k++;
                    }
                    for (var i_10 = laneIndex; i_10 <= tabelLength; i_10++) {
                        while (!cloneTable[parseInt(childIndex.toString(), 10)]) {
                            childIndex++;
                        }
                        while (!zIndexTable[parseInt(i_10.toString(), 10)]) {
                            i_10++;
                        }
                        zIndexTable[parseInt(i_10.toString(), 10)] = cloneTable[parseInt(childIndex.toString(), 10)];
                        this.diagram.nameTable[zIndexTable[parseInt(i_10.toString(), 10)]].zIndex = i_10;
                        childIndex++;
                    }
                    zIndexTable[parseInt(tabelLength.toString(), 10)] = this.diagram.nameTable["" + objectName].id;
                    this.diagram.nameTable["" + objectName].zIndex = tabelLength;
                    k = index + 1;
                    var j = tempIndex_1;
                    for (var i_11 = 0; i_11 < childCount; i_11++) {
                        while (!tempTable[parseInt(k.toString(), 10)]) {
                            k++;
                        }
                        while (this.diagram.nameTable[tempTable[parseInt(k.toString(), 10)]].parentId === objectName) {
                            k++;
                        }
                        while (!zIndexTable[parseInt(j.toString(), 10)]) {
                            j++;
                        }
                        zIndexTable[parseInt(j.toString(), 10)] = tempTable[parseInt(k.toString(), 10)];
                        this.diagram.nameTable[zIndexTable[parseInt(j.toString(), 10)]].zIndex = j;
                        k++;
                        j++;
                    }
                }
                if (this.diagram.mode === 'SVG') {
                    // const diagramLayer: SVGGElement = this.diagram.diagramLayer as SVGGElement;
                    // //const child: string[] = this.getChildElements(this.diagram.nameTable[objectName].wrapper.children);
                    // //const targerNodes: Object = [];
                    // let element: HTMLElement = getDiagramElement(objectName + '_groupElement', this.diagram.element.id);
                    // const nodes: NodeModel[] = this.diagram.selectedItems.nodes;
                    // if (nodes.length > 0 && (nodes[0].shape.type === 'Native' || nodes[0].shape.type === 'HTML')) {
                    //     element.parentNode.removeChild(element);
                    //     for (let j: number = 0; j < this.diagram.views.length; j++) {
                    //         element = getDiagramElement(
                    //             objectName + (nodes[0].shape.type === 'HTML' ? '_html_element' : '_content_groupElement'),
                    //             this.diagram.views[parseInt(j.toString(), 10)]);
                    //         const lastChildNode: HTMLElement = element.parentNode.lastChild as HTMLElement;
                    //         lastChildNode.parentNode.insertBefore(element, lastChildNode.nextSibling);
                    //     }
                    //     const htmlLayer: HTMLElement = getHTMLLayer(this.diagram.element.id);
                    //     this.diagram.diagramRenderer.renderElement(this.diagram.nameTable[`${objectName}`].wrapper, diagramLayer, htmlLayer);
                    // } else {
                    //     Object.keys(zIndexTable).forEach((key: string) => {
                    //         const zIndexValue: string = zIndexTable[`${key}`];
                    //         if ((zIndexValue !== objectName) && (this.diagram.nameTable[`${zIndexValue}`].parentId) !== objectName) {
                    //             //EJ2-42101 - SendToBack and BringToFront not working for connector with group node
                    //             //Added @Dheepshiva to restrict the objects with lower zIndex
                    //             if (zIndexValue !== undefined &&
                    //                 (oldzIndexTable.indexOf(objectName) < oldzIndexTable.indexOf(zIndexValue))) {
                    //                 const objectNode: Node | Connector = this.diagram.nameTable[`${objectName}`];
                    //                 const zIndexNode: Node | Connector = this.diagram.nameTable[`${zIndexValue}`];
                    //                 if (objectNode.parentId === '' && zIndexNode.parentId === '' && zIndexNode.parentId === undefined
                    //                     && objectNode.parentId !== zIndexNode.id) {
                    //                     this.moveSvgNode(zIndexValue, objectName);
                    //                     this.updateNativeNodeIndex(objectName);
                    //                 } else {
                    //                     if (this.checkGroupNode(objectName, zIndexValue, this.diagram.nameTable)) {
                    //                         this.moveSvgNode(zIndexValue, objectName);
                    //                         this.updateNativeNodeIndex(objectName);
                    //                     }
                    //                 }
                    //             }
                    //         }
                    //     });
                    //     this.updateLayerZindexTable(layerNum);
                    // }
                    var obj_4 = this.diagram.nameTable["" + objectName];
                    var i_12 = obj_4.shape.type !== 'SwimLane' ? maxZindex : tempIndex;
                    // if (i !== tempIndex) {
                    //     i = (obj.children && obj.children.length > 0) ? index : 1;
                    // }
                    var target = zIndexTable[parseInt(i_12.toString(), 10)];
                    // EJ2-49326 - (CR issue fix) An exception raised when send the swimlane back to the normal node.
                    // while (!target && i > index) {
                    //     target = zIndexTable[++i];
                    // }
                    // EJ2-46656 - CR issue fix
                    target = this.resetTargetNode(objectName, target, i_12, zIndexTable);
                    //EJ2-69654 - Send to back command not working when there is single node in layer
                    if (target) {
                        target = this.diagram.nameTable["" + target].parentId ? this.checkParentExist(target) : target;
                        this.moveAfterSvgNode(objectName, target);
                    }
                    var diagramLayer = this.diagram.diagramLayer;
                    var element = getDiagramElement(objectName + '_groupElement', this.diagram.element.id);
                    var nodes = this.diagram.selectedItems.nodes;
                    if (nodes.length > 0 && (nodes[0].shape.type === 'Native' || nodes[0].shape.type === 'HTML')) {
                        element.parentNode.removeChild(element);
                        for (var j = 0; j < this.diagram.views.length; j++) {
                            element = getDiagramElement(objectName + (nodes[0].shape.type === 'HTML' ? '_html_element' : '_content_groupElement'), this.diagram.views[parseInt(j.toString(), 10)]);
                            var lastChildNode = element.parentNode.lastChild;
                            lastChildNode.parentNode.insertBefore(element, lastChildNode.nextSibling);
                        }
                        var htmlLayer = getHTMLLayer(this.diagram.element.id);
                        this.diagram.diagramRenderer.renderElement(this.diagram.nameTable["" + objectName].wrapper, diagramLayer, htmlLayer);
                    }
                    this.updateLayerZindexTable(layerNum);
                }
                else {
                    this.diagram.refreshCanvasLayers();
                    this.updateLayerZindexTable(layerNum);
                }
            }
            var redoObject = cloneObject(this.diagram.selectedItems);
            var entry = { type: 'BringToFront', category: 'Internal', undoObject: undoObject, redoObject: redoObject };
            if (!(this.diagram.diagramActions & DiagramAction.UndoRedo)) {
                this.addHistoryEntry(entry);
            }
        }
        this.diagram.protectPropertyChange(false);
    };
    // private findGreatestZIndex (parent: Node, layerObjects: string[]): number {
    //     const layerObj: NodeModel[] = this.diagram.nodes.filter((node: any) => layerObjects.indexOf(node.id) !== -1);
    //     // Get zIndex values of nodes excluding children of the parent
    //     const zIndexes: number[] = layerObj.filter((node: any) => node.parentId === '' && node.id !== parent.id).map((node: NodeModel) => (node as Node).zIndex);
    //     // Sort zIndexes in descending order
    //     zIndexes.sort((a: number, b: number) => b - a);
    //     // Find the greatest zIndex excluding children
    //     if (zIndexes.length > 0){
    //         return zIndexes[0];
    //     }
    //     return null;
    // }
    // private findLowestZIndex (parent: Node, layerObjects: string[]): number {
    //     const layerObj: NodeModel[] = this.diagram.nodes.filter((node: any) => layerObjects.indexOf(node.id) !== -1);
    //     // Get zIndex values of nodes excluding children of the parent
    //     const zIndexes: number[] = layerObj.filter((node: any) => node.parentId === '' && node.id !== parent.id).map((node: NodeModel) => (node as Node).zIndex);
    //     // Sort zIndexes in ascending order
    //     zIndexes.sort((a: number, b: number) => a - b);
    //     // Find the lowest zIndex excluding children
    //     if (zIndexes.length > 0){
    //         return zIndexes[0];
    //     }
    //     return null;
    // }
    CommandHandler.prototype.triggerOrderCommand = function (oldObj, newObj, obj) {
        var clonedObject = cloneObject(oldObj);
        // EJ2-61653 - Added below code to get only changed values (zIndex) and passed as an argument to property change event
        var oldValue = {
            zIndex: clonedObject.zIndex
        };
        var newValue = {
            zIndex: newObj.zIndex
        };
        var arg = {
            element: obj, cause: this.diagram.diagramActions, diagramAction: this.diagram.getDiagramAction(this.diagram.diagramActions),
            oldValue: oldValue, newValue: newValue
        };
        this.diagram.triggerEvent(DiagramEvent.propertyChange, arg);
    };
    CommandHandler.prototype.checkGroupNode = function (selectedNodeName, layerObject, nameTable) {
        return nameTable["" + layerObject].parentId === nameTable["" + selectedNodeName].parentId;
    };
    /**
     * sortByZIndex method\
     *
     * @returns {  Object[] }    sortByZIndex method .\
     *  @param { Object[] } nodeArray - Provide the nodeArray element .
     *  @param { string } sortID - Provide the sortID element .
     * @private
     */
    CommandHandler.prototype.sortByZIndex = function (nodeArray, sortID, command) {
        if (command === 'BringForward') {
            var id_1 = sortID ? sortID : 'zIndex';
            nodeArray = nodeArray.sort(function (a, b) {
                return b["" + id_1] - a["" + id_1];
            });
        }
        else {
            var id_2 = sortID ? sortID : 'zIndex';
            nodeArray = nodeArray.sort(function (a, b) {
                return a["" + id_2] - b["" + id_2];
            });
        }
        return nodeArray;
    };
    /**
     * orderCommands method\
     *
     * @returns {  void }    orderCommands method .\
     *  @param { boolean } isRedo - Provide the previousObject element .
     *  @param { Selector } selector - Provide the previousObject element .
     *  @param { EntryType } action - Provide the previousObject element .
     * @private
     */
    CommandHandler.prototype.orderCommands = function (isRedo, selector, action) {
        var _this = this;
        var selectedObject = selector.nodes;
        selectedObject = selectedObject.concat(selector.connectors);
        if (isRedo) {
            var selectedItems = selector.selectedObjects;
            // sort the selected items by zIndex
            selectedItems = selectedItems.slice().sort(function (a, b) { return a.zIndex - b.zIndex; });
            if (action === 'SendBackward') {
                for (var i = 0; i < selectedItems.length; i++) {
                    this.sendBackward(selectedItems[parseInt(i.toString(), 10)]);
                }
            }
            else if (action === 'SendForward') {
                for (var i = selectedItems.length - 1; i >= 0; i--) {
                    this.sendForward(selectedItems[parseInt(i.toString(), 10)]);
                }
            }
            else if (action === 'BringToFront') {
                for (var i = 0; i < selectedItems.length; i++) {
                    this.bringToFront(selectedItems[parseInt(i.toString(), 10)]);
                }
            }
            else if (action === 'SendToBack') {
                for (var i = selectedItems.length - 1; i >= 0; i--) {
                    this.sendToBack(selectedItems[parseInt(i.toString(), 10)]);
                }
            }
        }
        else {
            // Get the first selected object's layer and zIndex information
            var firstObject = selectedObject[0];
            var layer = this.getObjectLayer(firstObject.id);
            var layerIndex = layer.zIndex;
            var zIndexTable = layer.zIndexTable;
            var objectId = void 0;
            // Handle actions for sendBackward or sendToBack
            if (action === 'SendBackward' || action === 'SendToBack') {
                // Sort objects by their zIndex
                selectedObject = selectedObject.slice().sort(function (a, b) { return a.zIndex - b.zIndex; });
                for (var i = 0; i < selectedObject.length; i++) {
                    var undoObject = selectedObject[parseInt(i.toString(), 10)];
                    var node = this.diagram.nameTable[selectedObject[parseInt(i.toString(), 10)].id];
                    node.zIndex = undoObject.zIndex; // Update each object's zIndex in selectedObject
                    this.diagram.layers[parseInt(layerIndex.toString(), 10)].zIndexTable[undoObject.zIndex] = undoObject.id;
                    objectId = undoObject.id;
                    if (action === 'SendToBack') {
                        if (selectedObject[0].shape.type === 'SwimLane') {
                            this.bringToFront(selectedObject[0]);
                        }
                        if (node.children) {
                            this.updateGroupZindex(node, '', null);
                        }
                        this.updateLayerZindexTable(layer.zIndex);
                    }
                    if (this.diagram.mode === 'SVG') {
                        // Get the selected object's layer and zIndex information
                        var object = this.diagram.nameTable["" + objectId];
                        var objectIndex = object.zIndex;
                        var layerNum = this.diagram.layers.indexOf(this.getObjectLayer(objectId));
                        var layerObjects = this.diagram.layers[parseInt(layerNum.toString(), 10)].objects;
                        var previousZindex = null;
                        var _loop_2 = function (m) {
                            var obj_5 = this_2.diagram.nameTable[layerObjects[parseInt(m.toString(), 10)]];
                            // Check if the current object is not a child of the selected object.
                            var isChildOfSelectedObject = true;
                            selector.selectedObjects.forEach(function (seletedObject) {
                                isChildOfSelectedObject = _this.notChildOfSelectedNode(obj_5, seletedObject);
                            });
                            // Find the previous zIndex
                            if (isChildOfSelectedObject && obj_5.zIndex < objectIndex &&
                                (previousZindex === null || obj_5.zIndex > previousZindex)) {
                                previousZindex = obj_5.zIndex;
                            }
                        };
                        var this_2 = this;
                        for (var m = 0; m < layerObjects.length; m++) {
                            _loop_2(m);
                        }
                        var tempIndex = 0;
                        var obj = this.diagram.nameTable["" + objectId];
                        // Determine the target index for the movement
                        var targetIndex = obj.shape.type !== 'SwimLane' ? previousZindex : tempIndex;
                        var target = void 0;
                        // Find the target using target index
                        if (!isNullOrUndefined(targetIndex)) {
                            target = zIndexTable[parseInt(targetIndex.toString(), 10)];
                        }
                        if (target) {
                            target = this.diagram.nameTable["" + target].parentId ? this.checkParentExist(target) : target;
                            if (action === 'SendBackward') {
                                // eslint-disable-next-line max-len
                                if ((object.parentId && this.notChildOfSelectedNode(object, this.diagram.nameTable["" + target])) || object.parentId === '') {
                                    this.moveAfterSvgNode(objectId, target);
                                }
                            }
                            else if (action === 'SendToBack') {
                                if (selectedObject[0].shape.type !== 'SwimLane') {
                                    this.moveAfterSvgNode(objectId, target);
                                }
                            }
                        }
                    }
                    else {
                        this.diagram.refreshCanvasLayers();
                    }
                }
            }
            // Handle actions for SendForward or BringToFront
            else if (action === 'SendForward' || action === 'BringToFront') {
                // Sort objects by their zIndex
                selectedObject = selectedObject.slice().sort(function (a, b) { return a.zIndex - b.zIndex; });
                for (var i = 0; i < selectedObject.length; i++) {
                    var undoObject = selectedObject[parseInt(i.toString(), 10)];
                    var node = this.diagram.nameTable[selectedObject[parseInt(i.toString(), 10)].id];
                    node.zIndex = undoObject.zIndex;
                    this.diagram.layers[parseInt(layerIndex.toString(), 10)].zIndexTable[undoObject.zIndex] = undoObject.id;
                    objectId = undoObject.id;
                    if (action === 'BringToFront') {
                        if (selectedObject[0].shape.type === 'SwimLane') {
                            this.sendToBack(selectedObject[0]);
                        }
                        if (node.children) {
                            this.updateGroupZindex(node, '', null);
                        }
                        this.updateLayerZindexTable(layer.zIndex);
                    }
                    if (this.diagram.mode === 'SVG') {
                        // Get the selected object's layer and zIndex information
                        var object = this.diagram.nameTable["" + objectId];
                        var objectIndex = object.zIndex;
                        var layerNum = this.diagram.layers.indexOf(this.getObjectLayer(objectId));
                        var layerObjects = this.diagram.layers[parseInt(layerNum.toString(), 10)].objects;
                        var nextZindex = null;
                        var _loop_3 = function (n) {
                            var obj_6 = this_3.diagram.nameTable[layerObjects[parseInt(n.toString(), 10)]];
                            // Check if the current object is not a child of the selected object.
                            var isChildOfSelectedObject = true;
                            selector.selectedObjects.forEach(function (seletedObject) {
                                isChildOfSelectedObject = _this.notChildOfSelectedNode(obj_6, seletedObject);
                            });
                            var isSelectedObject = selector.selectedObjects.some(function (object) {
                                return object.id === obj_6.id;
                            });
                            // Find the next zIndex
                            if (!isSelectedObject && isChildOfSelectedObject && obj_6.zIndex > objectIndex &&
                                (nextZindex === null || obj_6.zIndex < nextZindex)) {
                                nextZindex = obj_6.zIndex;
                            }
                        };
                        var this_3 = this;
                        for (var n = layerObjects.length - 1; n >= 0; n--) {
                            _loop_3(n);
                        }
                        var tempIndex = 0;
                        var obj = this.diagram.nameTable["" + objectId];
                        // Determine the target index for the movement
                        var targetIndex = obj.shape.type !== 'SwimLane' ? nextZindex : tempIndex;
                        var target = void 0;
                        // Find the target using target index
                        if (!isNullOrUndefined(targetIndex)) {
                            target = zIndexTable[parseInt(targetIndex.toString(), 10)];
                        }
                        if (target) {
                            target = this.diagram.nameTable["" + target].parentId ? this.checkParentExist(target) : target;
                            if (action === 'SendForward') {
                                if (object.parentId === '') {
                                    this.moveSvgNode(objectId, target);
                                }
                            }
                            else if (action === 'BringToFront') {
                                if (selectedObject[0].shape.type !== 'SwimLane') {
                                    this.moveSvgNode(objectId, target);
                                }
                            }
                        }
                    }
                    else {
                        this.diagram.refreshCanvasLayers();
                    }
                }
            }
        }
    };
    // private moveSBObject: (targetId: string) => void = function (targetId: string): void {
    //     if (targetId) {
    //         this.moveBackUndoNode(targetId);
    //     }
    // };
    // //The below method is for undo process for sendBackward command
    // private moveBackUndoNode: (targetId: string) => void = function (targetId: string): void {
    //     const originalZIndexTable: object = {};  // New variable to store original zIndex values
    //     // Store original zIndex values
    //     for (let i: number = 0; i < this.diagram.nodes.length; i++) {
    //         const node1: NodeModel = this.diagram.nodes[parseInt(i.toString(), 10)];
    //         originalZIndexTable[node1.id] = node1.zIndex;
    //     }
    //     for (let j: number = 0; j < this.diagram.connectors.length; j++) {
    //         const connector: ConnectorModel = this.diagram.connectors[parseInt(j.toString(), 10)];
    //         originalZIndexTable[connector.id] = connector.zIndex;
    //     }
    //     const sortedNodeIds: string[] = Object.keys(originalZIndexTable).sort((a: string, b: string) => originalZIndexTable[`${a}`] - originalZIndexTable[`${b}`]);
    //     const currentIndex: number = sortedNodeIds.indexOf(targetId);
    //     //This method moves the node/connector based on their zindex
    //     if (currentIndex !== -1) {
    //         if (currentIndex === sortedNodeIds.length - 1) {
    //             const nextNodeId: string = sortedNodeIds[currentIndex - 1];
    //             this.swapDomOrder(nextNodeId, targetId);
    //         }
    //         else {
    //             const nextNodeId: string = sortedNodeIds[currentIndex + 1];
    //             let backNode: HTMLElement;
    //             if (nextNodeId) {
    //                 const node: NodeModel = this.diagram.getObject(targetId);
    //                 if (node.shape.type === 'Native' || node.shape.type === 'HTML') {
    //                     this.updateNativeNodeIndex(targetId, nextNodeId);
    //                 } else {
    //                     const diagramDiv: HTMLElement = getDiagramElement(targetId + '_groupElement', this.diagram.element.id);
    //                     backNode = getDiagramElement(nextNodeId + '_groupElement', this.diagram.element.id);
    //                     const target: Node = this.diagram.getObject(targetId);
    //                     const newnode: Node = this.diagram.getObject(nextNodeId);
    //                     if (newnode.parentId && newnode.parentId !== target.parentId) {
    //                         backNode = getDiagramElement(newnode.parentId + '_groupElement', this.diagram.element.id);
    //                     }
    //                     if (target.parentId !== newnode.id) {
    //                         diagramDiv.parentNode.insertBefore(diagramDiv, backNode);
    //                     }
    //                 }
    //             }
    //         }
    //     }
    // };
    // private moveFBObject: (targetId: string) => void = function (targetId: string): void {
    //     if (targetId) {
    //         this.moveForwardUndoNode(targetId);
    //     }
    // };
    // //The below method is for undo process for moveForward command
    // private moveForwardUndoNode: (targetID: string) => void = function (targetID: string): void {
    //     const originalZIndexTable: object = {};  // New variable to store original zIndex values
    //     // Store original zIndex values
    //     for (let i: number = 0; i < this.diagram.nodes.length; i++) {
    //         const node1: NodeModel = this.diagram.nodes[parseInt(i.toString(), 10)];
    //         originalZIndexTable[node1.id] = node1.zIndex;
    //     }
    //     for (let j: number = 0; j < this.diagram.connectors.length; j++) {
    //         const connector: ConnectorModel = this.diagram.connectors[parseInt(j.toString(), 10)];
    //         originalZIndexTable[connector.id] = connector.zIndex;
    //     }
    //     const sortedNodeIds: string[] = Object.keys(originalZIndexTable).sort((a: string, b: string) => originalZIndexTable[`${a}`] - originalZIndexTable[`${b}`]);
    //     const currentIndex: number = sortedNodeIds.indexOf(targetID);
    //     //This method moves the node/connector based on their zindex
    //     if (currentIndex !== -1) {
    //         if (currentIndex === sortedNodeIds.length - 1) {
    //             const nextNodeId: string = sortedNodeIds[currentIndex - 1];
    //             this.swapDomOrder(nextNodeId, targetID);
    //         }
    //         else {
    //             const nextNodeId: string = sortedNodeIds[currentIndex + 1];
    //             if (nextNodeId) {
    //                 const node: NodeModel = this.diagram.getObject(targetID);
    //                 if (node.shape.type === 'Native' || node.shape.type === 'HTML') {
    //                     this.updateNativeNodeIndex(targetID, nextNodeId);
    //                 } else {
    //                     const diagramDiv: HTMLElement = getDiagramElement(targetID + '_groupElement', this.diagram.element.id);
    //                     const backNode: HTMLElement = getDiagramElement(nextNodeId + '_groupElement', this.diagram.element.id);
    //                     diagramDiv.parentNode.insertBefore(diagramDiv, backNode);
    //                 }
    //             }
    //         }
    //     }
    // };
    // private swapDomOrder(nextNodeId: string, targetId: string): void {
    //     if (nextNodeId) {
    //         //Bug 921994: Z-index order changes are not reflected at the UI level with Undo Redo commands.
    //         const node: NodeModel = this.diagram.getObject(targetId);
    //         if (node.shape.type === 'Native' || node.shape.type === 'HTML') {
    //             this.updateNativeNodeIndex(targetId, nextNodeId);
    //             this.updateNativeNodeIndex(nextNodeId, targetId);
    //         } else {
    //             const diagramDiv: HTMLElement = getDiagramElement(targetId + '_groupElement', this.diagram.element.id);
    //             const backNode: HTMLElement = getDiagramElement(nextNodeId + '_groupElement', this.diagram.element.id);
    //             diagramDiv.parentNode.insertBefore(diagramDiv, backNode);
    //             diagramDiv.parentNode.insertBefore(backNode, diagramDiv);
    //         }
    //     }
    // }
    // private moveObject(sourceId: string, targetId: string): void {
    //     if (targetId) {
    //         this.moveSvgNode(sourceId, targetId);
    //         this.updateNativeNodeIndex(sourceId, targetId);
    //     }
    // }
    /**
     * sendForward method\
     *
     * @returns {  void }    sendForward method .\
     *  @param {  NodeModel | ConnectorModel } obj - Provide the previousObject element .
     * @private
     */
    CommandHandler.prototype.sendForward = function (obj) {
        var _this = this;
        this.diagram.protectPropertyChange(true);
        if (hasSelection(this.diagram) || obj) {
            var selectedItems = this.diagram.selectedItems;
            var objects = [];
            if (obj && obj.id) {
                objects.push(obj);
            }
            else {
                objects = objects.concat(selectedItems.nodes);
                objects = objects.concat(selectedItems.connectors);
            }
            this.sortByZIndex(objects);
            var nodeId = (obj && obj.id);
            var undoObject_1 = cloneObject(this.diagram.selectedItems);
            this.diagram.startGroupAction();
            var changeNodeZIndexesArray_1 = [];
            var _loop_4 = function (s) {
                var clonedObject = cloneObject(objects[parseInt(s.toString(), 10)]);
                nodeId = objects[parseInt(s.toString(), 10)].id;
                var layerIndex = this_4.diagram.layers.indexOf(this_4.getObjectLayer(nodeId));
                var originalNameTable = cloneObject(this_4.diagram.nameTable);
                var zIndexTable = this_4.diagram.layers[parseInt(layerIndex.toString(), 10)].zIndexTable;
                //const tabelLength: number = Object.keys(zIndexTable).length;
                var index = this_4.diagram.nameTable["" + nodeId];
                var intersectArray = [];
                var temp = this_4.diagram.spatialSearch.findObjects(index.wrapper.bounds);
                if (temp.length > 2) {
                    temp = this_4.sortByZIndex(temp, undefined, 'BringForward');
                }
                var _loop_5 = function (i) {
                    if (index.id !== i.id) {
                        var currentLayer = this_4.getObjectLayer(i.id).zIndex;
                        var isSelectedObject = this_4.diagram.selectedItems.selectedObjects.some(function (object) {
                            return object.id === i.id;
                        });
                        if ((this_4.diagram.selectedItems.selectedObjects || !isSelectedObject) && layerIndex === currentLayer &&
                            (Number(this_4.diagram.nameTable["" + nodeId].zIndex) < Number(i.zIndex)) &&
                            i.parentId === '' && index.wrapper.bounds.intersects(i.wrapper.bounds)) {
                            intersectArray.push(i);
                        }
                    }
                };
                for (var _i = 0, temp_1 = temp; _i < temp_1.length; _i++) {
                    var i = temp_1[_i];
                    _loop_5(i);
                }
                for (var i = intersectArray.length - 1; i >= 0; i--) {
                    var child = this_4.diagram.nameTable[intersectArray[parseInt(i.toString(), 10)].id];
                    if (child.parentId === nodeId) {
                        intersectArray.splice(i, 1);
                    }
                }
                if (intersectArray.length > 0) {
                    var node = this_4.diagram.nameTable[intersectArray[intersectArray.length - 1].id];
                    if (node.parentId) {
                        var parentId = '';
                        var parent_1 = findParentInSwimlane(node, this_4.diagram, parentId);
                        var obj_7 = this_4.diagram.nameTable["" + parent_1];
                        if (obj_7.id !== nodeId) {
                            intersectArray[0] = obj_7;
                        }
                    }
                    var originalZIndexTable = {}; // New variable to store original zIndex values
                    // Store original zIndex values for nodes
                    for (var i = 0; i < this_4.diagram.nodes.length; i++) {
                        var node1 = this_4.diagram.nodes[parseInt(i.toString(), 10)];
                        originalZIndexTable[node1.id] = node1.zIndex;
                    }
                    // Store original zIndex values for connectors
                    for (var j = 0; j < this_4.diagram.connectors.length; j++) {
                        var connector = this_4.diagram.connectors[parseInt(j.toString(), 10)];
                        originalZIndexTable[connector.id] = connector.zIndex;
                    }
                    var overlapObject = intersectArray[0].zIndex;
                    var temp_2 = zIndexTable[parseInt(overlapObject.toString(), 10)];
                    //To store the zindex values as key value pair
                    var zIndex_1 = {};
                    intersectArray.forEach(function (item) {
                        zIndex_1[item.id] = item.zIndex;
                    });
                    // To store the intersecting zindex value
                    var greaterItems_1 = [];
                    if (index) {
                        var tempIndex_2 = index.zIndex;
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-nochec
                        if (Object.keys(zIndex_1).length > 0) {
                            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                            // @ts-ignore
                            Object.values(zIndex_1).forEach(function (val) {
                                if (val >= tempIndex_2) {
                                    greaterItems_1.push(val);
                                }
                            });
                            if (greaterItems_1.length !== 0) {
                                this_4.updateZIndexBySendForward(index, greaterItems_1, layerIndex);
                            }
                        }
                    }
                    var changedNodeZIndexesArray_1 = [];
                    Object.keys(this_4.changedNodeZIndexes).forEach(function (nodeId) {
                        var originalZIndex = originalNameTable["" + nodeId] ? originalNameTable["" + nodeId].zIndex : null;
                        var changedZIndex = _this.changedNodeZIndexes["" + nodeId];
                        //By comparing with changedNodeZIndexes to store the changed elements in undo
                        if (originalZIndex !== changedZIndex) {
                            var node_2 = cloneObject(originalNameTable["" + nodeId]);
                            changedNodeZIndexesArray_1.push(node_2);
                        }
                    });
                    this_4.updateLayerZindexTable(layerIndex);
                    changedNodeZIndexesArray_1.forEach(function (object) {
                        if (!(undoObject_1.nodes.some(function (node) { return node.id === object.id; }))) {
                            var clonedNode = cloneObject(object);
                            undoObject_1.nodes.push(clonedNode);
                        }
                    });
                    if (this_4.diagram.mode === 'SVG') {
                        var nodeIdToUpdate = intersectArray[intersectArray.length - 1].id;
                        var element = intersectArray[intersectArray.length - 1];
                        // if (element && !(element.shape.type === 'HTML'
                        //     || element.shape.type === 'Native')) {
                        // this.moveForwardSvgNode(nodeId);
                        this_4.moveAfterSvgNode(nodeId, nodeIdToUpdate);
                        // }
                        this_4.updateNativeNodeIndex(nodeIdToUpdate, nodeId);
                    }
                    else {
                        this_4.diagram.refreshCanvasLayers();
                    }
                    Object.keys(this_4.changedNodeZIndexes).forEach(function (nodeId) {
                        var originalZIndex = originalNameTable["" + nodeId] ? originalNameTable["" + nodeId].zIndex : null;
                        var changedZIndex = _this.changedNodeZIndexes["" + nodeId];
                        //By comparing with changedNodeZIndexes to store the changed elements in redo
                        if (originalZIndex !== changedZIndex) {
                            var node_3 = cloneObject(_this.diagram.nameTable["" + nodeId]);
                            changeNodeZIndexesArray_1.push(node_3);
                        }
                    });
                }
            };
            var this_4 = this;
            for (var s = objects.length - 1; s >= 0; s--) {
                _loop_4(s);
            }
            var redoObject_1 = cloneObject(this.diagram.selectedItems);
            changeNodeZIndexesArray_1.forEach(function (object) {
                if (!(redoObject_1.nodes.some(function (node) { return node.id === object.id; }))) {
                    var clonedNode = cloneObject(object);
                    redoObject_1.nodes.push(clonedNode);
                }
            });
            var historyEntry = {
                type: 'SendForward', category: 'Internal',
                undoObject: undoObject_1, redoObject: redoObject_1
            };
            if (!(this.diagram.diagramActions & DiagramAction.UndoRedo)) {
                this.addHistoryEntry(historyEntry);
            }
            this.diagram.endGroupAction();
        }
        this.diagram.protectPropertyChange(false);
    };
    //This method changes all the zindex values based on the selected node/connector
    CommandHandler.prototype.updateZIndexBySendForward = function (selectedNode, greaterItems, layerNum) {
        var clonedNode = cloneObject(selectedNode);
        var nextHigherIndex = Math.min.apply(Math, greaterItems);
        var objId = this.diagram.layers[parseInt(layerNum.toString(), 10)].
            zIndexTable[parseInt(nextHigherIndex.toString(), 10)];
        if (this.diagram.nameTable["" + objId].children) {
            nextHigherIndex = this.findGreatestChildZIndex(this.diagram.nameTable["" + objId]);
        }
        var highIndex;
        var layerObjects = this.diagram.layers[parseInt(layerNum.toString(), 10)].objects;
        var objects = this.diagram.nodes.filter(function (node) {
            return layerObjects.indexOf(node.id) !== -1;
        });
        var connectors = this.diagram.connectors.filter(function (connector) {
            return layerObjects.indexOf(connector.id) !== -1;
        });
        connectors.forEach(function (connector) {
            objects.push(connector);
        });
        var frontNode = objects.filter(function (x) { return x.zIndex === nextHigherIndex && x.id !== selectedNode.id; });
        if (selectedNode.children) {
            selectedNode.zIndex = nextHigherIndex + 1;
            this.updateGroupZindex(selectedNode, 'BringForward', selectedNode.zIndex);
            highIndex = this.findGreatestChildZIndex(selectedNode);
        }
        else {
            selectedNode.zIndex = nextHigherIndex + 1;
            highIndex = selectedNode.zIndex;
        }
        this.triggerOrderCommand(clonedNode, selectedNode, selectedNode);
        var sortedObjects = objects.slice().sort(function (a, b) { return a.zIndex - b.zIndex; });
        var notChildOfSelectedNode = true;
        for (var i = 0; i < sortedObjects.length; i++) {
            var node = sortedObjects[parseInt(i.toString(), 10)];
            if (selectedNode.children) {
                notChildOfSelectedNode = this.notChildOfSelectedNode(node, selectedNode);
            }
            if (node.zIndex > nextHigherIndex && node !== selectedNode && node.parentId !== selectedNode.id &&
                notChildOfSelectedNode && frontNode && frontNode.length > 0 && node.parentId !== frontNode[0].id) {
                var clonedNode_1 = cloneObject(node);
                if (node.zIndex <= highIndex + 1) {
                    node.zIndex = highIndex + 1;
                    highIndex++;
                    this.triggerOrderCommand(clonedNode_1, node, node);
                }
                else {
                    break;
                }
            }
            var originalZIndex = node.zIndex;
            //changedNodeZIndexes store the zindex values with node id as key value pair
            // eslint-disable-next-line no-prototype-builtins
            if (this.changedNodeZIndexes.hasOwnProperty(node.id)) {
                this.changedNodeZIndexes[node.id] = originalZIndex;
            }
            else {
                this.changedNodeZIndexes[node.id] = originalZIndex;
            }
        }
    };
    // private arrangeZIndexForLowerNodes(index: number, parent: Node, objects: NodeModel[]): void {
    //     const lesserIndexNodes: NodeModel[] = objects.filter((x: NodeModel) => x.zIndex <= index && (x as Node).parentId !== parent.id);
    //     lesserIndexNodes.sort((a: NodeModel, b: NodeModel) => b.zIndex - a.zIndex);
    //     for (let i: number = 0; i < lesserIndexNodes.length; i++){
    //         lesserIndexNodes[parseInt(i.toString(), 10)].zIndex = index - (i + 1);
    //     }
    // }
    CommandHandler.prototype.findGreatestChildZIndex = function (parent) {
        var _this = this;
        var highestZIndex = parent.zIndex;
        var findGreatestZIndex = function (parent) {
            for (var i = 0; i < parent.children.length; i++) {
                var child = _this.diagram.nameTable[parent.children[parseInt(i.toString(), 10)]];
                if (child.children) {
                    findGreatestZIndex(child);
                }
                else {
                    if (child.zIndex > highestZIndex) {
                        highestZIndex = child.zIndex; // Update zIndex for individual children
                    }
                }
            }
        };
        findGreatestZIndex(parent);
        return highestZIndex;
    };
    // check current node is not a children of selected node
    CommandHandler.prototype.notChildOfSelectedNode = function (node, selectedNode) {
        var _this = this;
        var notChildOfSelectedNode = true;
        var isNotChild = function (node, selectedNode) {
            for (var i = 0; i < selectedNode.children.length; i++) {
                var child = _this.diagram.nameTable[selectedNode.children[parseInt(i.toString(), 10)]];
                if (child.id === node.id) {
                    notChildOfSelectedNode = false;
                    return notChildOfSelectedNode;
                }
                if (child.children) {
                    isNotChild(node, child);
                }
            }
            return notChildOfSelectedNode;
        };
        if (selectedNode.children) {
            isNotChild(node, selectedNode);
        }
        return notChildOfSelectedNode;
    };
    // /**
    //  * moveForwardSvgNode method\
    //  *
    //  * @returns { void }    moveForwardSvgNode method .\
    //  * @param {string} targetID - provide the objects value.
    //  * @private
    //  */
    // public moveForwardSvgNode(targetID: string): void {
    //     const sortedNodeIds: string[] = Object.keys(this.changedNodeZIndexes).sort((a: string, b: string) => this.changedNodeZIndexes[`${a}`] - this.changedNodeZIndexes[`${b}`]);
    //     const currentIndex: number = sortedNodeIds.indexOf(targetID);
    //     if (currentIndex !== -1) {
    //         //This logic moves the node/connector based on their zindex
    //         if (currentIndex === sortedNodeIds.length - 1) {
    //             const nextNodeId: string = sortedNodeIds[currentIndex - 1];
    //             if (nextNodeId) {
    //                 const diagramDiv: HTMLElement = getDiagramElement(targetID + '_groupElement', this.diagram.element.id);
    //                 const backNode: HTMLElement = getDiagramElement(nextNodeId + '_groupElement', this.diagram.element.id);
    //                 diagramDiv.parentNode.insertBefore(diagramDiv, backNode);
    //                 diagramDiv.parentNode.insertBefore(backNode, diagramDiv);
    //             }
    //         }
    //         else {
    //             const nextNodeId: string = sortedNodeIds[currentIndex + 1];
    //             if (nextNodeId) {
    //                 const diagramDiv: HTMLElement = getDiagramElement(targetID + '_groupElement', this.diagram.element.id);
    //                 const backNode: HTMLElement = getDiagramElement(nextNodeId + '_groupElement', this.diagram.element.id);
    //                 diagramDiv.parentNode.insertBefore(diagramDiv, backNode);
    //             }
    //         }
    //     }
    // }
    /**
     * sendBackward method\
     *
     * @returns {  void }    sendBackward method .\
     *  @param {  NodeModel | ConnectorModel } obj - Provide the previousObject element .
     * @private
     */
    CommandHandler.prototype.sendBackward = function (obj) {
        var _this = this;
        this.diagram.protectPropertyChange(true);
        if (hasSelection(this.diagram) || obj) {
            var selectedItems = this.diagram.selectedItems;
            var objects = [];
            if (obj && obj.id) {
                objects.push(obj);
            }
            else {
                objects = objects.concat(selectedItems.nodes);
                objects = objects.concat(selectedItems.connectors);
            }
            this.sortByZIndex(objects);
            var objectId = (obj && obj.id);
            var undoObject_2 = cloneObject(this.diagram.selectedItems);
            this.diagram.startGroupAction();
            var changeNodeZIndexesArray_2 = [];
            var _loop_6 = function (s) {
                var clonedObject = cloneObject(objects[parseInt(s.toString(), 10)]);
                objectId = objects[parseInt(s.toString(), 10)].id;
                var layerNum = this_5.diagram.layers.indexOf(this_5.getObjectLayer(objectId));
                var originalNameTable = cloneObject(this_5.diagram.nameTable);
                var zIndexTable = this_5.diagram.layers[parseInt(layerNum.toString(), 10)].zIndexTable;
                //const tabelLength: number = Object.keys(zIndexTable).length;
                var node = this_5.diagram.nameTable["" + objectId];
                var intersectArray = [];
                var temp = this_5.diagram.spatialSearch.findObjects(node.wrapper.bounds);
                if (temp.length > 2) {
                    temp = this_5.sortByZIndex(temp);
                }
                var _loop_7 = function (i) {
                    if (node.id !== i.id) {
                        var currentLayer = this_5.getObjectLayer(i.id).zIndex;
                        var isSelectedObject = this_5.diagram.selectedItems.selectedObjects.some(function (object) {
                            return object.id === i.id;
                        });
                        if ((this_5.diagram.selectedItems.selectedObjects || !isSelectedObject) && layerNum === currentLayer &&
                            (Number(this_5.diagram.nameTable["" + objectId].zIndex) > Number(i.zIndex)) &&
                            i.parentId === '' && node.wrapper.bounds.intersects(i.wrapper.bounds)) {
                            intersectArray.push(i);
                        }
                    }
                };
                for (var _i = 0, temp_3 = temp; _i < temp_3.length; _i++) {
                    var i = temp_3[_i];
                    _loop_7(i);
                }
                for (var i = intersectArray.length - 1; i >= 0; i--) {
                    var child = this_5.diagram.nameTable[intersectArray[parseInt(i.toString(), 10)].id];
                    if (child.parentId === objectId) {
                        intersectArray.splice(i, 1);
                    }
                }
                if (intersectArray.length > 0) {
                    var child = this_5.diagram.nameTable[intersectArray[intersectArray.length - 1].id];
                    if (child.parentId) {
                        var parentId = '';
                        var parent_2 = findParentInSwimlane(child, this_5.diagram, parentId);
                        var obj_8 = this_5.diagram.nameTable["" + parent_2];
                        if (objectId !== obj_8.id) {
                            intersectArray[intersectArray.length - 1] = obj_8;
                        }
                    }
                    var originalZIndexTable = {}; // New variable to store original zIndex values
                    // Store original zIndex values for nodes
                    for (var i = 0; i < this_5.diagram.nodes.length; i++) {
                        var node1 = this_5.diagram.nodes[parseInt(i.toString(), 10)];
                        originalZIndexTable[node1.id] = node1.zIndex;
                    }
                    // Store original zIndex values for connectors
                    for (var j = 0; j < this_5.diagram.connectors.length; j++) {
                        var connector = this_5.diagram.connectors[parseInt(j.toString(), 10)];
                        originalZIndexTable[connector.id] = connector.zIndex;
                    }
                    var overlapObject = intersectArray[intersectArray.length - 1].zIndex;
                    var temp_4 = zIndexTable[parseInt(overlapObject.toString(), 10)];
                    var zIndex_2 = {};
                    intersectArray.forEach(function (item) {
                        zIndex_2[item.id] = item.zIndex;
                    });
                    var lesserItems_1 = [];
                    if (node) {
                        var tempIndex_3 = node.zIndex;
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-nochec
                        if (Object.keys(zIndex_2).length > 0) {
                            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                            // @ts-ignore
                            Object.values(zIndex_2).forEach(function (val) {
                                if (val <= tempIndex_3) {
                                    lesserItems_1.push(val);
                                }
                            });
                            if (lesserItems_1.length !== 0) {
                                this_5.updateZIndexBySendBackward(node, lesserItems_1, layerNum);
                            }
                        }
                    }
                    var changedNodeZIndexesArray_2 = [];
                    Object.keys(this_5.changedNodeZIndexes).forEach(function (nodeId) {
                        var originalZIndex = originalNameTable["" + nodeId] ? originalNameTable["" + nodeId].zIndex : null;
                        var changedZIndex = _this.changedNodeZIndexes["" + nodeId];
                        //By comparing with changedNodeZIndexes to store the changed elements in undo
                        if (originalZIndex !== changedZIndex) {
                            var node_4 = cloneObject(originalNameTable["" + nodeId]);
                            changedNodeZIndexesArray_2.push(node_4);
                        }
                    });
                    this_5.updateLayerZindexTable(layerNum);
                    changedNodeZIndexesArray_2.forEach(function (object) {
                        if (!(undoObject_2.nodes.some(function (node) { return node.id === object.id; }))) {
                            var clonedNode = cloneObject(object);
                            undoObject_2.nodes.push(clonedNode);
                        }
                    });
                    if (this_5.diagram.mode === 'SVG') {
                        var nodeIdToUpdate = intersectArray[intersectArray.length - 1].id;
                        var element = intersectArray[intersectArray.length - 1];
                        if (element && !(element.shape.type === 'HTML'
                            || element.shape.type === 'Native')) {
                            // this.moveBackSvgNode(objectId);
                            this_5.moveSvgNode(objectId, nodeIdToUpdate);
                        }
                        var node_5 = this_5.diagram.nameTable["" + nodeIdToUpdate];
                        if (node_5.children && node_5.children.length > 0) {
                            this_5.updateNativeNodeIndex(objectId);
                        }
                        else {
                            this_5.updateNativeNodeIndex(objectId, nodeIdToUpdate);
                        }
                    }
                    else {
                        this_5.diagram.refreshCanvasLayers();
                    }
                    Object.keys(this_5.changedNodeZIndexes).forEach(function (nodeId) {
                        var originalZIndex = originalNameTable["" + nodeId] ? originalNameTable["" + nodeId].zIndex : null;
                        var changedZIndex = _this.changedNodeZIndexes["" + nodeId];
                        //By comparing with changedNodeZIndexes to store the changed elements in redo
                        if (originalZIndex !== changedZIndex) {
                            var node_6 = cloneObject(_this.diagram.nameTable["" + nodeId]);
                            changeNodeZIndexesArray_2.push(node_6);
                        }
                    });
                }
            };
            var this_5 = this;
            for (var s = 0; s < objects.length; s++) {
                _loop_6(s);
            }
            var redoObject_2 = cloneObject(this.diagram.selectedItems);
            changeNodeZIndexesArray_2.forEach(function (object) {
                if (!(redoObject_2.nodes.some(function (node) { return node.id === object.id; }))) {
                    var clonedNode = cloneObject(object);
                    redoObject_2.nodes.push(clonedNode);
                }
            });
            var entry = { type: 'SendBackward', category: 'Internal', undoObject: undoObject_2, redoObject: redoObject_2 };
            if (!(this.diagram.diagramActions & DiagramAction.UndoRedo)) {
                this.addHistoryEntry(entry);
            }
            this.diagram.endGroupAction();
        }
        this.diagram.protectPropertyChange(false);
    };
    //This method changes all the zindex values based on the selected node/connector
    CommandHandler.prototype.updateZIndexBySendBackward = function (selectedNode, lesserItems, layerNum) {
        var clonedNode = cloneObject(selectedNode);
        var previousLowerIndex = Math.max.apply(Math, lesserItems);
        var layerObjects = this.diagram.layers[parseInt(layerNum.toString(), 10)].objects;
        var objects = this.diagram.nodes.filter(function (node) {
            return layerObjects.indexOf(node.id) !== -1;
        });
        var connectors = this.diagram.connectors.filter(function (connector) {
            return layerObjects.indexOf(connector.id) !== -1;
        });
        connectors.forEach(function (connector) {
            objects.push(connector);
        });
        var backNode = objects.filter(function (x) { return x.zIndex === previousLowerIndex && x.id !== selectedNode.id; });
        var childMaxZindex;
        var childCount;
        var lowIndex;
        if (selectedNode.children) {
            childMaxZindex = this.findMaxZIndex(selectedNode);
            childCount = childMaxZindex - selectedNode.zIndex;
            selectedNode.zIndex = previousLowerIndex - 1 - childCount;
            this.updateGroupZindex(selectedNode, 'SendBackward', selectedNode.zIndex);
            lowIndex = this.findLowestChildZIndex(selectedNode);
        }
        else {
            selectedNode.zIndex = previousLowerIndex - 1;
            lowIndex = selectedNode.zIndex;
        }
        this.triggerOrderCommand(clonedNode, selectedNode, selectedNode);
        var sortedObjects = objects.slice().sort(function (a, b) { return b.zIndex - a.zIndex; });
        var notChildOfSelectedNode = true;
        for (var i = 0; i < sortedObjects.length; i++) {
            var node = sortedObjects[parseInt(i.toString(), 10)];
            if (selectedNode.children) {
                notChildOfSelectedNode = this.notChildOfSelectedNode(node, selectedNode);
            }
            if (node.zIndex < previousLowerIndex && node !== selectedNode && node.parentId !== selectedNode.id &&
                notChildOfSelectedNode && backNode && backNode.length > 0 && node.parentId !== backNode[0].id) {
                var clonedNode_2 = cloneObject(node);
                if (node.zIndex >= lowIndex - 1) {
                    node.zIndex = lowIndex - 1;
                    lowIndex--;
                    this.triggerOrderCommand(clonedNode_2, node, node);
                }
                else {
                    break;
                }
            }
            var originalZIndex = node.zIndex;
            // eslint-disable-next-line no-prototype-builtins
            if (this.changedNodeZIndexes.hasOwnProperty(node.id)) {
                this.changedNodeZIndexes["" + node.id] = originalZIndex;
            }
            else {
                this.changedNodeZIndexes["" + node.id] = originalZIndex;
            }
        }
    };
    CommandHandler.prototype.findLowestChildZIndex = function (parent) {
        var lowestZIndex = parent.zIndex;
        for (var i = 0; i < parent.children.length; i++) {
            var child = this.diagram.nameTable[parent.children[parseInt(i.toString(), 10)]];
            if (child.zIndex < lowestZIndex) {
                lowestZIndex = child.zIndex;
            }
        }
        return lowestZIndex;
    };
    // /**
    //  * moveBackSvgNode method\
    //  *
    //  * @returns { void }    moveBackSvgNode method .\
    //  * @param {string} targetID - provide the objects value.
    //  * @private
    //  */
    // public moveBackSvgNode(targetID: string): void {
    //     const sortedNodeIds: string[] = Object.keys(this.changedNodeZIndexes).sort((a: string, b: string) => this.changedNodeZIndexes[`${a}`] - this.changedNodeZIndexes[`${b}`]);
    //     const currentIndex: number = sortedNodeIds.indexOf(targetID);
    //     //This logic moves the node/connector based on their zindex
    //     if (currentIndex !== -1) {
    //         const nextNodeId: string = sortedNodeIds[currentIndex + 1];
    //         if (nextNodeId) {
    //             const diagramDiv: HTMLElement = getDiagramElement(targetID + '_groupElement', this.diagram.element.id);
    //             const backNode: HTMLElement = getDiagramElement(nextNodeId + '_groupElement', this.diagram.element.id);
    //             diagramDiv.parentNode.insertBefore(diagramDiv, backNode);
    //         }
    //     }
    // }
    /**
     * updateNativeNodeIndex method\
     *
     * @returns {  void }    updateNativeNodeIndex method .\
     *  @param { string } nodeId - Provide the previousObject element .
     *  @param { string } targetID - Provide the previousObject element .
     * @private
     */
    CommandHandler.prototype.updateNativeNodeIndex = function (nodeId, targetID) {
        var node = this.diagram.selectedItems.nodes[0] || this.diagram.getObject(targetID);
        for (var i = 0; i < this.diagram.views.length; i++) {
            if (node && (node.shape.type === 'HTML'
                || node.shape.type === 'Native')) {
                var id = node.shape.type === 'HTML' ? '_html_element' : '_content_groupElement';
                var backNode = getDiagramElement(nodeId + id, this.diagram.views[parseInt(i.toString(), 10)]);
                var diagramDiv = targetID ? getDiagramElement(targetID + id, this.diagram.views[parseInt(i.toString(), 10)])
                    : backNode.parentElement.firstChild;
                if (backNode && diagramDiv) {
                    if (backNode.parentNode.id === diagramDiv.parentNode.id) {
                        diagramDiv.parentNode.insertBefore(backNode, diagramDiv);
                    }
                }
            }
        }
    };
    /**
     * initSelectorWrapper method\
     *
     * @returns {  void }    initSelectorWrapper method .\
     * @private
     */
    CommandHandler.prototype.initSelectorWrapper = function () {
        var selectorModel = this.diagram.selectedItems;
        selectorModel.init(this.diagram);
        if (selectorModel.nodes.length === 1 && selectorModel.connectors.length === 0) {
            selectorModel.rotateAngle = selectorModel.nodes[0].rotateAngle;
            selectorModel.wrapper.rotateAngle = selectorModel.nodes[0].rotateAngle;
            selectorModel.wrapper.pivot = selectorModel.nodes[0].pivot;
        }
    };
    /**
     * doRubberBandSelection method\
     *
     * @returns {  void }    doRubberBandSelection method .\
     *  @param { Rect } region - Provide the previousObject element .
     * @private
     */
    CommandHandler.prototype.doRubberBandSelection = function (region) {
        this.clearSelectionRectangle();
        var selArray = [];
        var rubberArray = [];
        selArray = this.diagram.getNodesConnectors(selArray);
        if (this.diagram.selectedItems.rubberBandSelectionMode === 'CompleteIntersect') {
            rubberArray = completeRegion(region, selArray);
        }
        else {
            rubberArray = this.diagram.spatialSearch.findObjects(region);
        }
        if (rubberArray.length) {
            this.selectObjects(rubberArray, true);
        }
    };
    CommandHandler.prototype.clearSelectionRectangle = function () {
        var adornerSvg = getAdornerLayerSvg(this.diagram.element.id);
        var element = adornerSvg.getElementById(this.diagram.element.id + '_diagramAdorner_selected_region');
        if (element) {
            remove(element);
        }
    };
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
    CommandHandler.prototype.dragConnectorEnds = function (endPoint, obj, point, segment, target, targetPortId) {
        var selectorModel;
        var connector; //let node: Node;
        var tx; //let segmentPoint: PointModel;
        var ty; //let index: number;
        var checkBezierThumb = false;
        if (obj instanceof Selector) {
            selectorModel = obj;
            connector = selectorModel.connectors[0];
        }
        else if (obj instanceof Connector && this.diagram.currentDrawingObject) {
            this.clearSelection();
            connector = this.diagram.currentDrawingObject;
        }
        if (endPoint === 'BezierSourceThumb' || endPoint === 'BezierTargetThumb') {
            checkBezierThumb = true;
            connector.isBezierEditing = true;
        }
        if (endPoint === 'ConnectorSourceEnd' || endPoint === 'BezierSourceThumb') {
            tx = point.x - (checkBezierThumb ? segment.bezierPoint1.x : connector.sourcePoint.x);
            ty = point.y - (checkBezierThumb ? segment.bezierPoint1.y : connector.sourcePoint.y);
            return this.dragSourceEnd(connector, tx, ty, null, point, endPoint, undefined, target, targetPortId, undefined, segment);
        }
        else {
            tx = point.x - (checkBezierThumb ? segment.bezierPoint2.x : connector.targetPoint.x);
            ty = point.y - (checkBezierThumb ? segment.bezierPoint2.y : connector.targetPoint.y);
            return this.dragTargetEnd(connector, tx, ty, null, point, endPoint, undefined, segment);
        }
    };
    /**
     * getSelectedObject method\
     *
     * @returns {  void }    getSelectedObject method .\
     * @private
     */
    CommandHandler.prototype.getSelectedObject = function () {
        var selectormodel = this.diagram.selectedItems;
        if (selectormodel.annotation) {
            return [selectormodel.annotation];
        }
        else {
            return (selectormodel.nodes).concat(selectormodel.connectors);
        }
    };
    // /**
    //  * updateBlazorProperties method\
    //  *
    //  * @returns {  void }    updateBlazorProperties method .\
    //  *  @param { boolean } isObjectInteraction - Provide the previousObject element .
    //  * @private
    //  */
    // public updateBlazorProperties(isObjectInteraction?: boolean): void {
    // const blazorInterop: string = 'sfBlazor';
    // const blazor: string = 'Blazor';
    // if (!isObjectInteraction) {
    //     if (window && window[`${blazor}`]) {
    //         const obj: object = { 'methodName': 'UpdateBlazorProperties', 'diagramobj': this.diagramObject };
    //         // window[`${blazorInterop}`].updateBlazorProperties(obj, this.diagram);
    //     }
    // } else {
    //     if (window && window[`${blazor}`] && JSON.stringify(this.deepDiffer.diagramObject) !== '{}') {
    //         const obj: object = { 'methodName': 'UpdateBlazorProperties', 'diagramobj': this.deepDiffer.diagramObject };
    //         if (!this.diagram.isLoading) {
    //             // window[`${blazorInterop}`].updateBlazorProperties(obj, this.diagram);
    //         }
    //     }
    // }
    // //this.diagram.enableServerDataBinding(true);
    // this.deepDiffer.newNodeObject = [];
    // this.deepDiffer.newConnectorObject = [];
    // this.diagramObject = [];
    // this.diagram.oldNodeObjects = [];
    // this.diagram.oldConnectorObjects = [];
    // }
    // /**
    //  * enableCloneObject method\
    //  *
    //  * @returns {  void }    enableCloneObject method .\
    //  *  @param { boolean } value - Provide the previousObject element .
    //  * @private
    //  */
    CommandHandler.prototype.enableCloneObject = function (value) {
        // if ((!this.diagram.lineRoutingModule || !(this.diagram.constraints & DiagramConstraints.LineRouting))) {
        //     this.diagram.canEnableBlazorObject = value;
        // }
    };
    // /**
    //  * ismouseEvents method\
    //  *
    //  * @returns {  void }    ismouseEvents method .\
    //  *  @param { boolean } value - Provide the previousObject element .
    //  * @private
    //  */
    // public ismouseEvents(value: boolean): void {
    //     // if (value) {
    //     //     this.diagram.blazorActions = this.diagram.addConstraints(this.diagram.blazorActions, BlazorAction.interaction);
    //     // } else {
    //     //     this.diagram.blazorActions = this.diagram.removeConstraints(this.diagram.blazorActions, BlazorAction.interaction);
    //     // }
    // }
    // /**
    //  * updateLayerObject method\
    //  *
    //  * @returns {  void }    updateLayerObject method .\
    //  *  @param { object } oldDiagram - Provide the previousObject element .
    //  *  @param { boolean } temp - Provide the temp element .
    //  * @private
    //  */
    // public updateLayerObject(oldDiagram: object, temp?: boolean): void {
    // comment blazor code
    // }
    // /* tslint:enable:no-string-literal */
    // /**
    //  * getDiagramOldValues method\
    //  *
    //  * @returns {  void }    getDiagramOldValues method .\
    //  *  @param { object } oldDiagram - Provide the previousObject element .
    //  *  @param { string[] } attribute - Provide the previousObject element .
    //  * @private
    //  */
    // public getDiagramOldValues(oldDiagram: object, attribute: string[]): void {
    //     const newDiagram: object = {};
    //     for (let i: number = 0; i < attribute.length; i++) {
    //         newDiagram[attribute[parseInt(i.toString(), 10)]] = cloneObject(this.diagram[attribute[parseInt(i.toString(), 10)]]);
    //     }
    //     const newObject: Object = cloneObject(newDiagram);
    //     const result: object = this.deepDiffer.map(newObject, oldDiagram);
    //     const diffValue: object = this.deepDiffer.frameObject({}, result);
    //     let diff: object = this.deepDiffer.removeEmptyValues(diffValue);
    //     diff = this.deepDiffer.changeSegments(diff, newObject);
    //     this.diagramObject = diff;
    //     if (!(this.diagram.blazorActions & BlazorAction.ClearObject)) {
    //         // this.updateBlazorProperties();
    //     }
    // }
    /* tslint:disable */
    /**
     * getBlazorOldValues method\
     *
     * @returns {  void }    getBlazorOldValues method .\
     *  @param { MouseEventArgs } args - Provide the previousObject element .
     *  @param { boolean } labelDrag - Provide the previousObject element .
     * @private
     */
    CommandHandler.prototype.getBlazorOldValues = function (args, labelDrag) {
        //comment blazor code
    };
    // /**
    //  * getObjectChanges method\
    //  *
    //  * @returns {  void }    getObjectChanges method .\
    //  *  @param { Object[] } previousObject - Provide the previousObject element .
    //  *  @param { Object[] } currentObject - Provide the previousObject element .
    //  *  @param { Object[] } previousObject - Provide the previousObject element .
    //  * @private
    //  */
    // public getObjectChanges(previousObject: Object[], currentObject: Object[], changedNodes: Object[]): void {
    // }
    /**
     * clearObjectSelection method\
     *
     * @returns {  void }    clearObjectSelection method .\
     *  @param { (NodeModel | ConnectorModel) } mouseDownElement - Provide the triggerAction element .
     * @private
     */
    // Bug fix - EJ2-44495 -Node does not gets selected on slight movement of mouse when drag constraints disabled for node
    CommandHandler.prototype.clearObjectSelection = function (mouseDownElement) {
        var selectedItems = this.diagram.selectedItems;
        var list = [];
        list = list.concat(selectedItems.nodes, selectedItems.connectors);
        if (list.indexOf(mouseDownElement) === -1) {
            this.clearSelection((list.length > 0) ? true : false);
            this.selectObjects([mouseDownElement], true);
        }
    };
    /**
     * clearSelection method\
     *
     * @returns {  void }    clearSelection method .\
     *  @param { boolean } triggerAction - Provide the triggerAction element .
     *  @param { boolean } isTriggered - Provide the isTriggered element .
     * @private
     */
    CommandHandler.prototype.clearSelection = function (triggerAction, isTriggered) {
        return __awaiter(this, void 0, void 0, function () {
            var enableServerDataBinding, selectormodel, arrayNodes, arg;
            return __generator(this, function (_a) {
                enableServerDataBinding = this.diagram.allowServerDataBinding;
                this.diagram.enableServerDataBinding(false);
                if (hasSelection(this.diagram)) {
                    selectormodel = this.diagram.selectedItems;
                    arrayNodes = this.getSelectedObject();
                    if (this.diagram.currentSymbol) {
                        this.diagram.previousSelectedObject = arrayNodes;
                    }
                    arg = {
                        oldValue: arrayNodes, newValue: [], cause: this.diagram.diagramActions,
                        state: 'Changing', type: 'Removal', cancel: false
                    };
                    // this.updateBlazorSelectorModel(arrayNodes, true);
                    if (triggerAction) {
                        if (!isBlazor()) {
                            this.diagram.triggerEvent(DiagramEvent.selectionChange, arg);
                        }
                    }
                    if (!arg.cancel) {
                        selectormodel.offsetX = 0;
                        selectormodel.offsetY = 0;
                        selectormodel.width = 0;
                        selectormodel.height = 0;
                        selectormodel.rotateAngle = 0;
                        selectormodel.nodes = [];
                        selectormodel.connectors = [];
                        selectormodel.wrapper = null;
                        selectormodel.annotation = undefined;
                        // EJ2-56919 - While clear selection empty the selectedObjects collection
                        selectormodel.selectedObjects = [];
                        this.diagram.clearSelectorLayer();
                        if (triggerAction) {
                            arg = {
                                oldValue: cloneBlazorObject(arrayNodes), newValue: [], cause: this.diagram.diagramActions,
                                state: 'Changed', type: 'Removal', cancel: false
                            };
                            if (!isBlazor()) {
                                this.diagram.triggerEvent(DiagramEvent.selectionChange, arg);
                            }
                        }
                    }
                    // this.updateBlazorSelector();
                    this.diagram.enableServerDataBinding(enableServerDataBinding);
                }
                return [2 /*return*/];
            });
        });
    };
    /**
     * clearSelectedItems method\
     *
     * @returns {  void }    clearSelectedItems method .\
     * @private
     */
    CommandHandler.prototype.clearSelectedItems = function () {
        var selectedNodes = this.diagram.selectedItems.nodes ? this.diagram.selectedItems.nodes.length : 0;
        var selectedConnectors = this.diagram.selectedItems.connectors ? this.diagram.selectedItems.connectors.length : 0;
        this.clearSelection((selectedNodes + selectedConnectors) > 0 ? true : false);
    };
    /**
     * removeStackHighlighter method\
     *
     * @returns {  void }    removeStackHighlighter method .\
     * @private
     */
    CommandHandler.prototype.removeStackHighlighter = function () {
        var adornerSvg = getAdornerLayerSvg(this.diagram.element.id);
        var highlighter = adornerSvg.getElementById(adornerSvg.id + '_stack_highlighter');
        if (highlighter) {
            highlighter.parentNode.removeChild(highlighter);
        }
    };
    /**
     * @param {End} args - provide the args  value.
     * @param {IElement} target - provide the target  value.
     * @private
     */
    CommandHandler.prototype.renderStackHighlighter = function (args, target) {
        var source = this.diagram.selectedItems.nodes[0];
        var symbolDrag;
        var node;
        var selectorModel;
        if (!target) {
            var objects = this.diagram.findObjectsUnderMouse(args.position);
            target = this.diagram.findObjectUnderMouse(objects, 'Drag', true);
            if (target && !(target.isLane || target.isPhase || target.isHeader)) {
                for (var i = 0; i < objects.length; i++) {
                    var laneNode = this.diagram.nameTable[objects[parseInt(i.toString(), 10)].id];
                    if (!laneNode.isLane || laneNode.isPhase || laneNode.isHeader) {
                        target = laneNode;
                        this.diagram.parentObject = target;
                    }
                }
            }
        }
        if (source && target && target.isLane && source.shape && !source.shape.isPhase) {
            node = this.diagram.nameTable[target.parentId];
            if (this.diagram.currentSymbol && node.shape.type === 'SwimLane') {
                symbolDrag = true;
            }
            if ((source && !source.parentId && source.shape.type !== 'SwimLane') ||
                (source && source.parentId && this.diagram.nameTable[source.parentId] && this.diagram.nameTable[source.parentId].isLane &&
                    (source.parentId !== target.parentId && source.parentId !== target.id))) {
                selectorModel = this.diagram.selectedItems;
                var canvas = gridSelection(this.diagram, selectorModel, target.id, true);
                //Bug 904547: Snapping of nodes inside the swimlane is not proper.
                //Instead of assigning the canvas to the selectorModel children, pass them to render selector to highlight the swimlane.
                this.diagram.renderSelector(false, true, canvas);
                selectorModel.wrapper.children[0] = selectorModel.nodes[0].wrapper;
            }
        }
        if (source && target && target.parentId && source.shape && source.shape.isPhase) {
            var node_7 = this.diagram.nameTable[target.parentId];
            if (node_7.shape.type === 'SwimLane') {
                //Bug 904547: Snapping of nodes inside the swimlane is not proper.
                //Instead of assigning the canvas to the selectorModel children, pass them to render selector to highlight the swimlane.
                var canvas = this.diagram.nameTable[target.parentId].wrapper;
                this.diagram.renderSelector(false, true, canvas);
            }
        }
        if ((symbolDrag && this.diagram.currentSymbol.shape.isLane) || (source && target &&
            source.parentId && target.parentId && !source.isPhase && (source.parentId === target.parentId)
            && (source.id !== target.id) && node &&
            (node.container && (node.container.type === 'Stack' || node.container.type === 'Grid')))) {
            var canvas = void 0;
            var value = node.container.orientation === 'Vertical';
            var isVertical = node.container === 'Stack' ? value : !value;
            if (node.container.type === 'Grid' && target.isLane &&
                (((node.shape.orientation === 'Horizontal' && target.rowIndex !== source.rowIndex) ||
                    (node.shape.orientation === 'Vertical' && target.columnIndex !== source.columnIndex))
                    || (this.diagram.currentSymbol &&
                        this.diagram.currentSymbol.shape.orientation === node.container.orientation))) {
                selectorModel = this.diagram.selectedItems;
                if ((source.isLane && canLaneInterchange(source, this.diagram)) || !source.isLane) {
                    canvas = gridSelection(this.diagram, selectorModel, target.id, symbolDrag);
                }
            }
            var wrapper = node.container.type === 'Stack' ? target.wrapper : canvas;
            if (wrapper) {
                renderStackHighlighter(wrapper, isVertical, args.position, this.diagram, false, true);
            }
        }
    };
    /** @private */
    CommandHandler.prototype.insertBlazorConnector = function (obj) {
        if (obj instanceof Selector) {
            for (var i = 0; i < obj.connectors.length; i++) {
                this.diagram.insertBlazorConnector(obj.connectors[parseInt(i.toString(), 10)]);
            }
        }
        else {
            this.diagram.insertBlazorConnector(obj);
        }
    };
    /** @private */
    CommandHandler.prototype.drag = function (obj, tx, ty) {
        var tempNode;
        var elements = [];
        // EJ2-846953: The below code is added to set current action to drag when we drag objects dynamically using method.
        // It is used to prevent the updateGroupSize method call for group node while dragging it.
        if (!this.diagram.rotateUsingButton && obj.shape && obj.shape.type !== 'SwimLane') {
            this.diagram.eventHandler.currentAction = 'Drag';
        }
        if (canMove(obj) && this.checkBoundaryConstraints(tx, ty, obj.wrapper.bounds) && canPageEditable(this.diagram)) {
            if (obj instanceof Node) {
                var oldValues = { offsetX: obj.offsetX, offsetY: obj.offsetY };
                obj.offsetX += tx;
                obj.offsetY += ty;
                if (obj.children && !(obj.container)) {
                    if (!(checkParentAsContainer(this.diagram, obj, true))) {
                        this.diagram.diagramActions = this.diagram.diagramActions | DiagramAction.isGroupDragging;
                    }
                    var nodes = this.getAllDescendants(obj, elements);
                    for (var i = 0; i < nodes.length; i++) {
                        tempNode = (this.diagram.nameTable[nodes[parseInt(i.toString(), 10)].id]);
                        this.drag(tempNode, tx, ty);
                    }
                    this.updateInnerParentProperties(obj);
                    this.diagram.diagramActions = this.diagram.diagramActions & ~DiagramAction.isGroupDragging;
                }
                if (checkParentAsContainer(this.diagram, obj, true)) {
                    checkChildNodeInContainer(this.diagram, obj);
                }
                else {
                    if (obj && obj.shape && obj.shape.type === 'UmlClassifier') {
                        obj.wrapper.measureChildren = true;
                    }
                    this.diagram.nodePropertyChange(obj, oldValues, { offsetX: obj.offsetX, offsetY: obj.offsetY }, undefined, undefined, false);
                    obj.wrapper.measureChildren = false;
                }
                if (obj.shape.type === 'SwimLane' && !this.diagram.currentSymbol) {
                    var grid = obj.wrapper.children[0];
                    var connectors = getConnectors(this.diagram, grid, 0, true);
                    updateConnectorsProperties(connectors, this.diagram);
                }
            }
            else {
                var connector = obj;
                // 909588: Property change new & old value are same upon connector drag
                var oldConnector = cloneObject(obj);
                var oldValues = { sourcePoint: oldConnector.sourcePoint, targetPoint: oldConnector.targetPoint };
                var update = connector.type === 'Bezier' ? true : false;
                var hasEnds = false;
                if (!connector.sourceWrapper) {
                    this.dragSourceEnd(connector, tx, ty, true, null, '', update);
                }
                else {
                    hasEnds = true;
                }
                if (!connector.targetWrapper) {
                    this.dragTargetEnd(connector, tx, ty, true, null, '', update);
                }
                else {
                    hasEnds = true;
                }
                var canDragPoints = false;
                if (obj instanceof Connector) {
                    canDragPoints = true;
                }
                if (!hasEnds || canDragPoints) {
                    this.dragControlPoint(connector, tx, ty, true);
                    var conn = { sourcePoint: connector.sourcePoint, targetPoint: connector.targetPoint };
                    this.diagram.connectorPropertyChange(connector, oldValues, conn);
                }
            }
        }
        //886700: undo and redo changes not reflected properly in overview after rotate and resize
        for (var _i = 0, _a = this.diagram.views; _i < _a.length; _i++) {
            var temp = _a[_i];
            // eslint-disable-next-line security/detect-object-injection
            var view = this.diagram.views[temp];
            if (view instanceof Overview) {
                this.diagram.refreshCanvasDiagramLayer(view);
            }
        }
    };
    /**   @private  */
    CommandHandler.prototype.connectorSegmentChange = function (actualObject, existingInnerBounds, isRotate) {
        var tx;
        var ty;
        var segmentChange = true;
        if (existingInnerBounds.equals(existingInnerBounds, actualObject.wrapper.bounds) === false) {
            if (actualObject.outEdges.length > 0) {
                for (var k = 0; k < actualObject.outEdges.length; k++) {
                    var connector = this.diagram.nameTable[actualObject.outEdges[parseInt(k.toString(), 10)]];
                    if (connector.targetID !== '') {
                        segmentChange = this.isSelected(this.diagram.nameTable[connector.targetID]) ? false : true;
                    }
                    else {
                        segmentChange = this.isSelected(this.diagram.nameTable[connector.id]) ? false : true;
                    }
                    if (connector.type === 'Orthogonal' && connector.segments && connector.segments.length > 1) {
                        if (!isRotate) {
                            if (segmentChange) {
                                switch (connector.segments[0].direction) {
                                    case 'Bottom':
                                        tx = actualObject.wrapper.bounds.bottomCenter.x - existingInnerBounds.bottomCenter.x;
                                        ty = actualObject.wrapper.bounds.bottomCenter.y - existingInnerBounds.bottomCenter.y;
                                        break;
                                    case 'Top':
                                        tx = actualObject.wrapper.bounds.topCenter.x - existingInnerBounds.topCenter.x;
                                        ty = actualObject.wrapper.bounds.topCenter.y - existingInnerBounds.topCenter.y;
                                        break;
                                    case 'Left':
                                        tx = actualObject.wrapper.bounds.middleLeft.x - existingInnerBounds.middleLeft.x;
                                        ty = actualObject.wrapper.bounds.middleLeft.y - existingInnerBounds.middleLeft.y;
                                        break;
                                    case 'Right':
                                        tx = actualObject.wrapper.bounds.middleRight.x - existingInnerBounds.middleRight.x;
                                        ty = actualObject.wrapper.bounds.middleRight.y - existingInnerBounds.middleRight.y;
                                        break;
                                }
                                this.dragSourceEnd(connector, tx, ty, true, null, 'ConnectorSourceEnd', undefined, undefined, undefined, (actualObject.parentId &&
                                    (this.diagram.diagramActions & DiagramAction.isGroupDragging)) ? false : true);
                            }
                        }
                        else {
                            var firstSegment = connector.segments[0];
                            var secondSegment = connector.segments[1];
                            var cornerPoints = swapBounds(actualObject.wrapper, actualObject.wrapper.corners, actualObject.wrapper.bounds);
                            var sourcePoint = findPoint(cornerPoints, firstSegment.direction);
                            sourcePoint = getIntersection(connector, connector.sourceWrapper, sourcePoint, { x: connector.sourceWrapper.offsetX, y: connector.sourceWrapper.offsetY }, false);
                            var source = {
                                corners: undefined, point: sourcePoint, margin: undefined, direction: firstSegment.direction
                            };
                            var target = {
                                corners: undefined, point: secondSegment.points[1], margin: undefined, direction: undefined
                            };
                            var intermediatePoints = orthoConnection2Segment(source, target);
                            firstSegment.length = Point.distancePoints(intermediatePoints[0], intermediatePoints[1]);
                            if (secondSegment.direction && secondSegment.length) {
                                secondSegment.length = Point.distancePoints(intermediatePoints[1], intermediatePoints[2]);
                            }
                        }
                    }
                }
            }
        }
    };
    /** @private */
    CommandHandler.prototype.updateEndPoint = function (connector, oldChanges) {
        var conn = {
            sourcePoint: connector.sourcePoint, targetPoint: connector.targetPoint,
            sourceID: connector.sourceID ? connector.sourceID : undefined,
            targetID: connector.targetID ? connector.targetID : undefined,
            sourcePortID: connector.sourcePortID ? connector.sourcePortID : undefined,
            targetPortID: connector.targetPortID ? connector.targetPortID : undefined,
            segments: connector.segments ? connector.segments : undefined
        };
        var newValue = { sourcePoint: connector.sourcePoint, targetPoint: connector.targetPoint };
        if (connector.sourceID) {
            newValue.sourceID = connector.sourceID;
        }
        if (connector.targetID) {
            newValue.targetID = connector.targetID;
        }
        if (connector.sourcePortID) {
            newValue.sourcePortID = connector.sourcePortID;
        }
        if (connector.targetPortID) {
            newValue.targetPortID = connector.targetPortID;
        }
        if (connector.segments) {
            newValue.segments = connector.segments;
        }
        this.diagram.connectorPropertyChange(connector, oldChanges ? oldChanges : {}, newValue);
        // this.diagram.refreshDiagramLayer();
        this.diagram.updateSelector();
    };
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
    CommandHandler.prototype.dragSourceEnd = function (obj, tx, ty, preventUpdate, point, endPoint, update, target, targetPortId, isDragSource, segment) {
        var connector = this.diagram.nameTable[obj.id];
        var oldChanges = {};
        var checkBoundaryConstraints = this.checkBoundaryConstraints(tx, ty, connector.wrapper.bounds);
        if (canDragSourceEnd(connector) && checkBoundaryConstraints
            && (endPoint !== 'BezierSourceThumb') && canPageEditable(this.diagram)) {
            oldChanges = { sourcePoint: connector.sourcePoint };
            oldChanges = cloneObject(oldChanges);
            connector.sourcePoint.x += tx;
            connector.sourcePoint.y += ty;
            if (endPoint === 'ConnectorSourceEnd' && connector.type === 'Orthogonal') {
                this.changeSegmentLength(connector, target, targetPortId, isDragSource);
            }
            if (connector.shape.type === 'Bpmn' && connector.shape.sequence === 'Default' && connector.shape.flow === 'Sequence') {
                this.updatePathElementOffset(connector);
            }
        }
        if (connector.type === 'Bezier') {
            oldChanges = { sourcePoint: connector.sourcePoint };
            if (segment) {
                this.translateBezierPoints(obj, (endPoint === '') ? 'ConnectorSourceEnd' : endPoint, tx, ty, segment, point, !update);
            }
            else {
                for (var i = 0; i < obj.segments.length; i++) {
                    this.translateBezierPoints(obj, (endPoint === '') ? 'ConnectorSourceEnd' : endPoint, tx, ty, obj.segments[parseInt(i.toString(), 10)], point, !update);
                }
            }
        }
        if (!preventUpdate) {
            this.updateEndPoint(connector, oldChanges);
        }
        if (!(this.diagram.realActions & RealAction.AnimationClick)) {
            this.diagram.refreshCanvasLayers();
        }
        return checkBoundaryConstraints;
    };
    /**
     * Update Path Element offset
     */
    CommandHandler.prototype.updatePathElementOffset = function (connector) {
        connector.wrapper.children.splice(3, 1);
        var pathElement = new PathElement();
        var anglePoints = connector.intermediatePoints;
        pathElement = updatePathElement(anglePoints, connector);
        connector.wrapper.children.splice(3, 0, pathElement);
    };
    /**
     * Upadte the connector segments when change the source node
     */
    CommandHandler.prototype.changeSegmentLength = function (connector, target, targetPortId, isDragSource) {
        // EJ2-65063 - Added below code to check condition if connector segment length can be changed or not.
        // If inconnect and outconnect removed from node constraints
        var canChangeSegment = target ? this.canConnect(connector, target) : true;
        if (connector.segments && connector.segments[0].direction !== null
            && ((!target && connector.sourceID === '') || isDragSource) && canChangeSegment) {
            var first = connector.segments[0];
            var second = connector.segments[1];
            var node = this.diagram.nameTable[connector.sourceID];
            var secPoint = void 0;
            first.points[0] = connector.sourcePoint;
            if (first.direction === 'Top' || first.direction === 'Bottom') {
                first.points[first.points.length - 1].x = connector.sourcePoint.x;
                second.points[0].y = first.points[first.points.length - 1].y;
            }
            else {
                first.points[first.points.length - 1].y = connector.sourcePoint.y;
                second.points[0].x = first.points[first.points.length - 1].x;
            }
            if (first.direction && (first.length || first.length === 0)) {
                first.length = Point.distancePoints(first.points[0], first.points[first.points.length - 1]);
            }
            if (second.direction && (second.length || second.length === 0)) {
                second.length = Point.distancePoints(first.points[first.points.length - 1], second.points[second.points.length - 1]);
                second.direction = Point.direction(first.points[first.points.length - 1], second.points[second.points.length - 1]);
            }
            if (connector.sourcePortID !== '' && first.length < 10) {
                if (connector.segments.length > 2) {
                    var next = connector.segments[2];
                    var nextDirection = Point.direction(next.points[0], next.points[1]);
                    if (first.direction === getOppositeDirection(nextDirection)) {
                        if (first.direction === 'Right') {
                            next.points[0].x = first.points[first.points.length - 1].x = node.wrapper.corners.middleRight.x + 20;
                        }
                        else if (first.direction === 'Left') {
                            next.points[0].x = first.points[first.points.length - 1].x = node.wrapper.corners.middleLeft.x - 20;
                        }
                        else if (first.direction === 'Top') {
                            next.points[0].y = first.points[first.points.length - 1].y = node.wrapper.corners.topCenter.y - 20;
                        }
                        else {
                            next.points[0].y = first.points[first.points.length - 1].y = node.wrapper.corners.bottomCenter.y + 20;
                        }
                        if (next.direction && next.length) {
                            next.length = Point.distancePoints(next.points[0], next.points[next.points.length - 1]);
                        }
                        first.length = Point.distancePoints(first.points[0], first.points[first.points.length - 1]);
                    }
                    else if (first.direction === nextDirection && next.direction && next.length) {
                        if (first.direction === 'Top' || first.direction === 'Bottom') {
                            next.points[0] = first.points[0];
                            next.points[next.points.length - 1].x = next.points[0].x;
                        }
                        else {
                            next.points[0] = first.points[0];
                            next.points[next.points.length - 1].y = next.points[0].y;
                        }
                        next.length = Point.distancePoints(next.points[0], next.points[next.points.length - 1]);
                        connector.segments.splice(0, 2);
                    }
                    else {
                        first.length = 20;
                    }
                }
                else {
                    first.length = 20;
                }
            }
            else if (first.length < 1) {
                if (connector.sourceID !== '') {
                    if (second.direction === 'Right') {
                        secPoint = node.wrapper.corners.middleRight;
                        second.points[second.points.length - 1].y = secPoint.y;
                    }
                    else if (second.direction === 'Left') {
                        secPoint = node.wrapper.corners.middleLeft;
                        second.points[second.points.length - 1].y = secPoint.y;
                    }
                    else if (second.direction === 'Top') {
                        secPoint = node.wrapper.corners.topCenter;
                        second.points[second.points.length - 1].x = secPoint.x;
                    }
                    else {
                        secPoint = node.wrapper.corners.bottomCenter;
                        second.points[second.points.length - 1].x = secPoint.x;
                    }
                    second.length = Point.distancePoints(secPoint, second.points[second.points.length - 1]);
                    if (connector.segments.length > 2) {
                        var next = connector.segments[2];
                        if (next.direction && next.length) {
                            next.length = Point.distancePoints(second.points[second.points.length - 1], next.points[next.points.length - 1]);
                        }
                    }
                    connector.segments.splice(0, 1);
                }
                else {
                    connector.segments.splice(0, 1);
                }
            }
        }
        else {
            if (target && !targetPortId && connector.sourceID !== target.id &&
                connector.segments && connector.segments[0].direction !== null
                && target && target instanceof Node && canChangeSegment) {
                this.changeSourceEndToNode(connector, target);
            }
            if (target && targetPortId && connector.sourcePortID !== targetPortId &&
                connector.segments && connector.segments[0].direction !== null
                && target && target instanceof Node && canChangeSegment) {
                this.changeSourceEndToPort(connector, target, targetPortId);
            }
        }
    };
    // EJ2-65063 - Added below method to check if target has inConnect or outConnect. If it does not have inconnect and outconnect means then return false
    CommandHandler.prototype.canConnect = function (connector, target) {
        if (canInConnect(target) && canOutConnect(target)) {
            return true;
        }
        else {
            return false;
        }
    };
    /**
     * Change the connector endPoint to port
     */
    CommandHandler.prototype.changeSourceEndToPort = function (connector, target, targetPortId) {
        var port = this.diagram.getWrapper(target.wrapper, targetPortId);
        var point = { x: port.offsetX, y: port.offsetY };
        var direction = getPortDirection(point, cornersPointsBeforeRotation(target.wrapper), target.wrapper.bounds, false);
        var firstSegment = connector.segments[0];
        var secondSegment = connector.segments[1];
        if (firstSegment.direction !== direction) {
            var segments = [];
            var segValues = {};
            if (firstSegment.direction === getOppositeDirection(direction)) {
                segValues = {};
                var segValues1 = void 0;
                if (direction === 'Top' || direction === 'Bottom') {
                    segValues1 = (direction === 'Top') ? {
                        type: 'Orthogonal', isTerminal: true, direction: direction,
                        length: Math.abs(firstSegment.points[0].y - point.y)
                    } :
                        {
                            type: 'Orthogonal', isTerminal: true, direction: direction,
                            length: Math.abs(point.y - firstSegment.points[0].y)
                        };
                    segValues = (firstSegment.points[0].x > point.x) ?
                        { type: 'Orthogonal', isTerminal: true, direction: 'Right', length: (firstSegment.points[0].x - point.x) } :
                        { type: 'Orthogonal', isTerminal: true, direction: 'Left', length: (point.x - firstSegment.points[0].x) };
                }
                else {
                    segValues1 = (direction === 'Right') ? {
                        type: 'Orthogonal', isTerminal: true, direction: direction,
                        length: Math.abs(firstSegment.points[0].x - point.x)
                    } :
                        {
                            type: 'Orthogonal', isTerminal: true, direction: direction,
                            length: Math.abs(point.x - firstSegment.points[0].x)
                        };
                    segValues = (firstSegment.points[0].y > point.y) ?
                        { type: 'Orthogonal', direction: 'Top', isTerminal: true, length: (firstSegment.points[0].y - point.y) } :
                        { type: 'Orthogonal', direction: 'Bottom', isTerminal: true, length: (point.y - firstSegment.points[0].y) };
                }
                segments.push(new OrthogonalSegment(connector, 'segments', segValues1, true));
                segments.push(new OrthogonalSegment(connector, 'segments', segValues, true));
            }
            else {
                segValues = { type: 'Orthogonal', direction: direction, length: 20, isTerminal: true };
                segments.push(new OrthogonalSegment(connector, 'segments', segValues, true));
            }
            if (firstSegment.direction !== getOppositeDirection(direction)) {
                if (direction === 'Top' || direction === 'Bottom') {
                    firstSegment.points[0].x = point.x;
                    firstSegment.points[0].y = firstSegment.points[firstSegment.points.length - 1].y = (direction === 'Top') ?
                        point.y - 20 : point.y + 20;
                }
                else {
                    firstSegment.points[0].y = point.y;
                    firstSegment.points[0].x = firstSegment.points[firstSegment.points.length - 1].x = (direction === 'Right') ?
                        point.x + 20 : point.x - 20;
                }
                firstSegment.length = Point.distancePoints(firstSegment.points[0], firstSegment.points[firstSegment.points.length - 1]);
                secondSegment.length = Point.distancePoints(firstSegment.points[firstSegment.points.length - 1], secondSegment.points[secondSegment.points.length - 1]);
            }
            connector.segments = segments.concat(connector.segments);
        }
        else {
            firstSegment.points[0] = point;
            if (direction === 'Top' || direction === 'Bottom') {
                firstSegment.points[firstSegment.points.length - 1].x = point.x;
            }
            else {
                firstSegment.points[firstSegment.points.length - 1].y = point.y;
            }
            firstSegment.length = Point.distancePoints(firstSegment.points[0], firstSegment.points[firstSegment.points.length - 1]);
            secondSegment.length = Point.distancePoints(firstSegment.points[firstSegment.points.length - 1], secondSegment.points[secondSegment.points.length - 1]);
        }
    };
    /**
     * @param connector
     * @param changeTerminal
     * @private
Remove terinal segment in initial
     */
    CommandHandler.prototype.removeTerminalSegment = function (connector, changeTerminal) {
        for (var i = 0; i < connector.segments.length - 2; i++) {
            var segment = connector.segments[0];
            if (segment.isTerminal) {
                if (changeTerminal) {
                    segment.isTerminal = false;
                }
                else {
                    connector.segments.splice(i, 1);
                    i--;
                }
            }
        }
    };
    /**
     * Change the connector endPoint from point to node
     */
    CommandHandler.prototype.changeSourceEndToNode = function (connector, target) {
        this.removeTerminalSegment(connector);
        var sourceWrapper = target.wrapper.children[0].corners;
        var sourcePoint;
        var sourcePoint2;
        var firstSegment = connector.segments[0];
        var nextSegment = connector.segments[1];
        var segments = [];
        if (firstSegment.direction === 'Right' || firstSegment.direction === 'Left') {
            sourcePoint = (firstSegment.direction === 'Left') ? sourceWrapper.middleLeft : sourceWrapper.middleRight;
            if (firstSegment.length > sourceWrapper.width || ((firstSegment.direction === 'Left' &&
                sourcePoint.x >= firstSegment.points[0].x) || (firstSegment.direction === 'Right' &&
                sourcePoint.x <= firstSegment.points[0].x))) {
                firstSegment.points[0].y = firstSegment.points[firstSegment.points.length - 1].y = sourcePoint.y;
                firstSegment.points[0].x = sourcePoint.x;
                firstSegment.length = Point.distancePoints(firstSegment.points[0], firstSegment.points[firstSegment.points.length - 1]);
                nextSegment.length = Point.distancePoints(firstSegment.points[firstSegment.points.length - 1], nextSegment.points[nextSegment.points.length - 1]);
            }
            else {
                var direction = void 0;
                if (nextSegment.direction) {
                    direction = nextSegment.direction;
                }
                else {
                    direction = Point.direction(nextSegment.points[0], nextSegment.points[nextSegment.points.length - 1]);
                }
                sourcePoint2 = (direction === 'Bottom') ? sourceWrapper.bottomCenter : sourceWrapper.topCenter;
                if (nextSegment.length && nextSegment.direction) {
                    nextSegment.length =
                        (direction === 'Top') ? firstSegment.points[firstSegment.points.length - 1].y - (sourcePoint2.y + 20) :
                            (sourcePoint2.y + 20) - firstSegment.points[firstSegment.points.length - 1].y;
                }
                firstSegment.length = firstSegment.points[firstSegment.points.length - 1].x - sourcePoint2.x;
                firstSegment.direction = (firstSegment.length > 0) ? 'Right' : 'Left';
                var segValues = { type: 'Orthogonal', direction: direction, length: 20 };
                segments.push(new OrthogonalSegment(connector, 'segments', segValues, true));
                connector.segments = segments.concat(connector.segments);
            }
        }
        else {
            sourcePoint = (firstSegment.direction === 'Bottom') ? sourceWrapper.bottomCenter : sourceWrapper.topCenter;
            if (firstSegment.length > sourceWrapper.height || ((firstSegment.direction === 'Top' &&
                sourcePoint.y >= firstSegment.points[0].y) ||
                (firstSegment.direction === 'Bottom' && sourcePoint.y <= firstSegment.points[0].y))) {
                firstSegment.points[0].x = firstSegment.points[firstSegment.points.length - 1].x = sourcePoint.x;
                firstSegment.points[0].y = sourcePoint.y;
                firstSegment.length = Point.distancePoints(firstSegment.points[0], firstSegment.points[firstSegment.points.length - 1]);
                nextSegment.length = Point.distancePoints(firstSegment.points[firstSegment.points.length - 1], nextSegment.points[nextSegment.points.length - 1]);
            }
            else {
                sourcePoint2 = (nextSegment.direction === 'Left') ? sourceWrapper.middleLeft : sourceWrapper.middleRight;
                var direction = void 0;
                if (nextSegment.direction) {
                    direction = nextSegment.direction;
                }
                else {
                    direction = Point.direction(nextSegment.points[0], nextSegment.points[nextSegment.points.length - 1]);
                }
                if (nextSegment.length && nextSegment.direction) {
                    nextSegment.length =
                        (direction === 'Left') ? firstSegment.points[firstSegment.points.length - 1].x - (sourcePoint2.x + 20) :
                            (sourcePoint2.x + 20) - firstSegment.points[firstSegment.points.length - 1].x;
                }
                firstSegment.length = firstSegment.points[firstSegment.points.length - 1].y - sourcePoint2.y;
                firstSegment.direction = (firstSegment.length > 0) ? 'Bottom' : 'Top';
                var segValues = { type: 'Orthogonal', direction: direction, length: 20 };
                segments.push(new OrthogonalSegment(connector, 'segments', segValues, true));
                connector.segments = segments.concat(connector.segments);
            }
        }
    };
    //Translate the bezier points during the interaction
    CommandHandler.prototype.translateBezierPoints = function (connector, value, tx, ty, seg, point, update) {
        var index = (connector.segments.indexOf(seg));
        var segment = connector.segments[parseInt(index.toString(), 10)];
        var prevSegment = index > 0 ? connector.segments[index - 1] : null;
        var startPoint = prevSegment !== null ? prevSegment.point : connector.sourcePoint;
        var endPoint = index === connector.segments.length - 1 ? connector.targetPoint : segment.point;
        if (segment) {
            if (value === 'BezierSourceThumb' && (segment.vector1.angle || segment.vector1.distance)) {
                var oldDistance = segment.vector1.distance;
                var oldAngle = segment.vector1.angle;
                segment.vector1 = {
                    distance: connector.distance(startPoint, point),
                    angle: Point.findAngle(startPoint, point)
                };
                var deltaLength = segment.vector1.distance - oldDistance;
                var deltaAngle = segment.vector1.angle - oldAngle;
                this.translateSubsequentSegment(connector, seg, true, deltaLength, deltaAngle);
            }
            else if (value === 'BezierTargetThumb' && (segment.vector2.angle || segment.vector2.distance)) {
                var oldDistance = segment.vector2.distance;
                var oldAngle = segment.vector2.angle;
                segment.vector2 = {
                    distance: connector.distance(endPoint, point),
                    angle: Point.findAngle(endPoint, point)
                };
                var deltaLength = segment.vector2.distance - oldDistance;
                var deltaAngle = segment.vector2.angle - oldAngle;
                this.translateSubsequentSegment(connector, seg, false, deltaLength, deltaAngle);
            }
            else if ((value === 'ConnectorSourceEnd' && !connector.sourceID || value === 'ConnectorTargetEnd' && !connector.targetID)
                && update && isEmptyVector(segment.vector1) && isEmptyVector(segment.vector2)) {
                if (Point.isEmptyPoint(segment.point1)) {
                    segment.bezierPoint1 = getBezierPoints(connector.sourcePoint, connector.targetPoint);
                }
                if (Point.isEmptyPoint(segment.point2)) {
                    segment.bezierPoint2 = getBezierPoints(connector.targetPoint, connector.sourcePoint);
                }
            }
            else if (value === 'BezierSourceThumb' || (value === 'ConnectorSourceEnd' && !update && isEmptyVector(segment.vector1))) {
                segment.bezierPoint1.x += tx;
                segment.bezierPoint1.y += ty;
                if ((!Point.isEmptyPoint(segment.point1)) || (update)) {
                    segment.point1 = { x: segment.bezierPoint1.x, y: segment.bezierPoint1.y };
                }
                // 927005: Segment next to the target end of the connector always resets
                if ((tx !== 0 || ty !== 0) && (seg.isInternalSegment === true)) {
                    seg.isInternalSegment = false;
                }
            }
            else if (value === 'BezierTargetThumb' || (value === 'ConnectorTargetEnd' && !update && isEmptyVector(segment.vector2))) {
                segment.bezierPoint2.x += tx;
                segment.bezierPoint2.y += ty;
                if ((!Point.isEmptyPoint(segment.point2)) || (update)) {
                    segment.point2 = { x: segment.bezierPoint2.x, y: segment.bezierPoint2.y };
                }
                // 927005: Segment next to the target end of the connector always resets
                if ((tx !== 0 || ty !== 0) && (seg.isInternalSegment === true)) {
                    seg.isInternalSegment = false;
                }
            }
        }
    };
    CommandHandler.prototype.translateSubsequentSegment = function (connector, seg, isSourceEnd, deltaLength, deltaAngle) {
        var index = (connector.segments.indexOf(seg));
        var segment = connector.segments[parseInt(index.toString(), 10)];
        if (!(connector.bezierSettings.smoothness & BezierSmoothness.SymmetricAngle)) {
            deltaAngle = null;
        }
        if (!(connector.bezierSettings.smoothness & BezierSmoothness.SymmetricDistance)) {
            deltaLength = null;
        }
        if (deltaLength == null && deltaAngle == null) {
            return;
        }
        if (isSourceEnd) {
            if (index !== 0) {
                this.updatePreviousBezierSegment(connector, index, deltaLength, deltaAngle);
            }
        }
        else {
            if (index !== connector.segments.length - 1) {
                this.updateNextBezierSegment(connector, index, deltaLength, deltaAngle);
            }
        }
    };
    CommandHandler.prototype.updatePreviousBezierSegment = function (connector, index, deltaLength, deltaAngle) {
        var segment = connector.segments[index - 1];
        var newDistance = segment.vector2.distance + deltaLength;
        var newAngle = (segment.vector2.angle + deltaAngle) % 360;
        if (newAngle < 0) {
            newAngle += 360;
        }
        segment.vector2 = { distance: newDistance, angle: newAngle };
    };
    CommandHandler.prototype.updateNextBezierSegment = function (connector, index, deltaLength, deltaAngle) {
        var segment = connector.segments[index + 1];
        var newDistance = segment.vector1.distance + deltaLength;
        var newAngle = (segment.vector1.angle + deltaAngle) % 360;
        if (newAngle < 0) {
            newAngle += 360;
        }
        segment.vector1 = { distance: newDistance, angle: newAngle };
    };
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
    CommandHandler.prototype.dragTargetEnd = function (obj, tx, ty, preventUpdate, point, endPoint, update, segment) {
        var connector = this.diagram.nameTable[obj.id];
        var oldChanges;
        var boundaryConstraints = this.checkBoundaryConstraints(tx, ty, connector.wrapper.bounds);
        if (canDragTargetEnd(connector) && endPoint !== 'BezierTargetThumb'
            && boundaryConstraints && canPageEditable(this.diagram)) {
            oldChanges = { targetPoint: connector.targetPoint };
            oldChanges = cloneObject(oldChanges);
            connector.targetPoint.x += tx;
            connector.targetPoint.y += ty;
            if (endPoint === 'ConnectorTargetEnd' && connector.type === 'Orthogonal' &&
                connector.segments && connector.segments.length > 0) {
                var prev = connector.segments[connector.segments.length - 2];
                if (prev && connector.segments[connector.segments.length - 1].points.length === 2) {
                    if (prev.direction === 'Left' || prev.direction === 'Right') {
                        prev.points[prev.points.length - 1].x = connector.targetPoint.x;
                    }
                    else {
                        prev.points[prev.points.length - 1].y = connector.targetPoint.y;
                    }
                    prev.length = Point.distancePoints(prev.points[0], prev.points[prev.points.length - 1]);
                    prev.direction = Point.direction(prev.points[0], prev.points[prev.points.length - 1]);
                }
            }
            if (connector.shape.type === 'Bpmn' && connector.shape.sequence === 'Default' && connector.shape.flow === 'Sequence') {
                this.updatePathElementOffset(connector);
            }
        }
        if (connector.type === 'Bezier') {
            oldChanges = { targetPoint: connector.targetPoint };
            if (segment) {
                this.translateBezierPoints(obj, (endPoint === '') ? 'ConnectorTargetEnd' : endPoint, tx, ty, segment, point, !update);
            }
            else {
                for (var i = 0; i < obj.segments.length; i++) {
                    this.translateBezierPoints(obj, (endPoint === '') ? 'ConnectorTargetEnd' : endPoint, tx, ty, obj.segments[parseInt(i.toString(), 10)], point, !update);
                }
            }
        }
        if (!preventUpdate) {
            this.updateEndPoint(connector, oldChanges);
        }
        if (!(this.diagram.realActions & RealAction.AnimationClick)) {
            this.diagram.refreshCanvasLayers();
        }
        return boundaryConstraints;
    };
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
    CommandHandler.prototype.dragControlPoint = function (obj, tx, ty, preventUpdate, segmentNumber) {
        var connector = this.diagram.nameTable[obj.id];
        if ((connector.type === 'Straight' || connector.type === 'Bezier') && connector.segments.length > 0) {
            if (segmentNumber !== undefined && connector.segments[parseInt(segmentNumber.toString(), 10)]) {
                if (connector.type === 'Bezier') {
                    var seg = connector.segments[parseInt(segmentNumber.toString(), 10)];
                    var isInternalSegment = seg.isInternalSegment;
                    if (!isInternalSegment || connector.bezierSettings === null || connector.bezierSettings.segmentEditOrientation === 'FreeForm') {
                        seg.point.x += tx;
                        seg.point.y += ty;
                    }
                    else {
                        if (seg.orientation === 'Horizontal') {
                            seg.point.x += tx;
                        }
                        else {
                            seg.point.y += ty;
                        }
                        this.updateDirectionalBezierCurve(connector);
                    }
                    if (isInternalSegment) {
                        connector.isBezierEditing = true;
                    }
                }
                else {
                    connector.segments[parseInt(segmentNumber.toString(), 10)].point.x += tx;
                    connector.segments[parseInt(segmentNumber.toString(), 10)].point.y += ty;
                }
            }
            else {
                for (var i = 0; i < connector.segments.length - 1; i++) {
                    connector.segments[parseInt(i.toString(), 10)].point.x += tx;
                    connector.segments[parseInt(i.toString(), 10)].point.y += ty;
                }
            }
            if (!preventUpdate) {
                this.updateEndPoint(connector);
            }
        }
        return true;
    };
    CommandHandler.prototype.updateDirectionalBezierCurve = function (connector) {
        var pts = [];
        pts.push(connector.sourcePoint);
        for (var i = 0; i < connector.segments.length - 1; i++) {
            var seg = connector.segments[parseInt(i.toString(), 10)];
            if (seg.orientation === 'Horizontal') {
                pts.push({ x: seg.point.x, y: pts[pts.length - 1].y });
            }
            else {
                pts.push({ x: pts[pts.length - 1].x, y: seg.point.y });
            }
            if (i === connector.segments.length - 2) {
                if (seg.orientation === 'Horizontal') {
                    pts.push({ x: seg.point.x, y: connector.targetPoint.y });
                }
                else {
                    pts.push({ x: connector.targetPoint.x, y: seg.point.y });
                }
            }
        }
        pts.push(connector.targetPoint);
        var start = pts[0];
        var end = pts[pts.length - 1];
        if (connector.segments.length > 1) {
            var mid1 = pts[1];
            var mid2 = pts[2];
            var center1 = { x: (mid1.x + mid2.x) * 0.5, y: (mid1.y + mid2.y) * 0.5 };
            var segment1 = connector.segments[0];
            segment1.vector1.angle = findAngle(start, mid1);
            segment1.vector1.distance = Point.findLength(start, mid1) * 0.5;
            segment1.vector2.angle = findAngle(center1, mid1);
            segment1.vector2.distance = Point.findLength(center1, mid1) * 0.5;
            segment1.point = center1;
            var segment2 = connector.segments[1];
            segment2.vector1.angle = findAngle(center1, mid2);
            segment2.vector1.distance = Point.findLength(center1, mid2) * 0.5;
            if (connector.segments.length > 2) {
                var mid3 = pts[3];
                var center2 = { x: (mid2.x + mid3.x) * 0.5, y: (mid2.y + mid3.y) * 0.5 };
                segment2.vector2.angle = findAngle(center2, mid2);
                segment2.vector2.distance = Point.findLength(center2, mid2) * 0.5;
                segment2.point = center2;
                var segment3 = connector.segments[2];
                segment3.vector1.angle = findAngle(center2, mid3);
                segment3.vector1.distance = Point.findLength(center2, mid3) * 0.5;
                if (connector.segments.length > 3) {
                    var mid4 = pts[4];
                    var center3 = { x: (mid3.x + mid4.x) * 0.5, y: (mid3.y + mid4.y) * 0.5 };
                    segment3.vector2.angle = findAngle(center3, mid3);
                    segment3.vector2.distance = Point.findLength(center3, mid3) * 0.5;
                    segment3.point = center3;
                    var segment4 = connector.segments[3];
                    segment4.vector1.angle = findAngle(center3, mid4);
                    segment4.vector1.distance = Point.findLength(center3, mid4) * 0.5;
                    segment4.vector2.angle = findAngle(end, mid4);
                    segment4.vector2.distance = Point.findLength(end, mid4) * 0.5;
                }
                else {
                    segment3.vector2.angle = findAngle(end, mid3);
                    segment3.vector2.distance = Point.findLength(end, mid3) * 0.5;
                }
            }
            else {
                segment2.vector2.angle = findAngle(end, mid2);
                segment2.vector2.distance = Point.findLength(end, mid2) * 0.5;
            }
        }
    };
    // /**
    //  * rotatePropertyChnage method \
    //  *
    //  * @returns { void }     rotatePropertyChnage method .\
    //  * @param {number} angle - provide the obj value.
    //  *
    //  * @private
    //  */
    // public rotatePropertyChnage(angle: number): void {
    //     const selectedItems: SelectorModel = this.diagram.selectedItems;
    //     let objects: (NodeModel | ConnectorModel)[] = [];
    //     objects = objects.concat(selectedItems.nodes);
    //     objects = objects.concat(selectedItems.connectors);
    //     const pivotValue: PointModel = { x: selectedItems.offsetX, y: selectedItems.offsetY };
    //     this.rotateObjects(selectedItems, objects, angle - selectedItems.rotateAngle, pivotValue);
    //     selectedItems.wrapper.rotateAngle = selectedItems.rotateAngle = angle;
    //     this.diagram.updateSelector();
    // }
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
    CommandHandler.prototype.rotateObjects = function (parent, objects, angle, pivot, includeParent) {
        pivot = pivot || {};
        var matrix = identityMatrix();
        rotateMatrix(matrix, angle, pivot.x, pivot.y);
        var oldValues;
        for (var _i = 0, objects_2 = objects; _i < objects_2.length; _i++) {
            var obj = objects_2[_i];
            if (obj instanceof Node) {
                if (canRotate(obj) && canPageEditable(this.diagram)) {
                    if (includeParent !== false || parent !== obj) {
                        //918299 - Flip and rotation of the group node now work properly by calculating the wrapper offset instead of the individual offset
                        oldValues = { offsetX: obj.wrapper.offsetX, offsetY: obj.wrapper.offsetY, rotateAngle: obj.rotateAngle };
                        //909137 - Undo Operation Improper After Rotating Node Counterclockwise. Remove the below line and add the angle to same line.
                        obj.rotateAngle = ((obj.rotateAngle + angle) + 360) % 360;
                        var newOffset = transformPointByMatrix(matrix, { x: obj.wrapper.offsetX, y: obj.wrapper.offsetY });
                        obj.offsetX = newOffset.x;
                        obj.offsetY = newOffset.y;
                        //909355: When rotating a node, the old value in the property change event argument is undefined. pass the old valuse as parameter
                        this.diagram.nodePropertyChange(obj, oldValues, { offsetX: obj.offsetX, offsetY: obj.offsetY, rotateAngle: obj.rotateAngle });
                    }
                    if (obj.processId) {
                        var parent_3 = this.diagram.nameTable[obj.processId];
                        var bound = this.diagram.bpmnModule.getChildrenBound(parent_3, obj.id, this.diagram);
                        this.diagram.bpmnModule.updateSubProcessess(bound, obj, this.diagram);
                    }
                    if (obj.children && obj.children.length && !obj.container) {
                        this.getChildren(obj, objects);
                    }
                }
            }
            else {
                this.rotatePoints(obj, angle, pivot || { x: obj.wrapper.offsetX, y: obj.wrapper.offsetY });
            }
            this.diagram.updateDiagramObject(obj);
        }
        this.diagram.refreshCanvasLayers();
        this.diagram.updateSelector();
    };
    /**
     * snapConnectorEnd method \
     *
     * @returns { PointModel }     snapConnectorEnd method .\
     * @param {PointModel} currentPosition - provide the parent value.
     *
     * @private
     */
    CommandHandler.prototype.snapConnectorEnd = function (currentPosition) {
        if ((this.diagram.snapSettings.constraints & SnapConstraints.SnapToLines)
            && this.snappingModule) {
            this.diagram.snappingModule.snapConnectorEnd(currentPosition);
        }
        return currentPosition;
    };
    /**
     * snapAngle method \
     *
     * @returns { number }     snapAngle method .\
     * @param {number} angle - provide the parent value.
     *
     * @private
     */
    CommandHandler.prototype.snapAngle = function (angle) {
        if ((this.diagram.snapSettings.constraints & SnapConstraints.SnapToLines)
            && this.snappingModule) {
            return this.snappingModule.snapAngle(this.diagram, angle);
        }
        else {
            return 0;
        }
    };
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
    CommandHandler.prototype.rotatePoints = function (conn, angle, pivot) {
        if (!conn.sourceWrapper || !conn.targetWrapper) {
            var matrix = identityMatrix();
            rotateMatrix(matrix, angle, pivot.x, pivot.y);
            conn.sourcePoint = transformPointByMatrix(matrix, conn.sourcePoint);
            conn.targetPoint = transformPointByMatrix(matrix, conn.targetPoint);
            if (conn.shape.type === 'Bpmn' && conn.shape.sequence === 'Default' && conn.shape.flow === 'Sequence') {
                this.updatePathElementOffset(conn);
            }
            var newProp = { sourcePoint: conn.sourcePoint, targetPoint: conn.targetPoint };
            this.diagram.connectorPropertyChange(conn, {}, newProp);
            if (conn.segments && conn.segments.length > 0) {
                this.diagram.protectPropertyChange(true);
                var connector = conn;
                connector.segments = [];
                this.diagram.connectorPropertyChange(connector, {}, { segments: connector.segments });
                this.diagram.protectPropertyChange(false);
            }
        }
    };
    CommandHandler.prototype.updateInnerParentProperties = function (tempNode) {
        var elements = [];
        var protect = 'isProtectedOnChange';
        var protectChange = this.diagram["" + protect];
        this.diagram.protectPropertyChange(true);
        var innerParents = this.getAllDescendants(tempNode, elements, false, true);
        for (var i = 0; i < innerParents.length; i++) {
            var obj = this.diagram.nameTable[innerParents[parseInt(i.toString(), 10)].id];
            obj.offsetX = obj.wrapper.offsetX;
            obj.offsetY = obj.wrapper.offsetY;
            obj.width = obj.wrapper.width;
            obj.height = obj.wrapper.height;
        }
        this.diagram.protectPropertyChange(protectChange);
    };
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
    // eslint-disable-next-line max-len
    CommandHandler.prototype.scale = function (obj, sw, sh, pivot, refObject, isOutsideBoundary) {
        var node = this.diagram.nameTable[obj.id];
        var tempNode = node;
        var elements = [];
        var element = node.wrapper;
        if (!refObject) {
            refObject = obj;
        }
        var refWrapper = refObject.wrapper;
        var x = refWrapper.offsetX - refWrapper.actualSize.width * refWrapper.pivot.x;
        var y = refWrapper.offsetY - refWrapper.actualSize.height * refWrapper.pivot.y;
        var refPoint = getPoint(x, y, refWrapper.actualSize.width, refWrapper.actualSize.height, refWrapper.rotateAngle, refWrapper.offsetX, refWrapper.offsetY, pivot);
        if (element.actualSize.width !== undefined && element.actualSize.height !== undefined && canPageEditable(this.diagram)) {
            if (tempNode.children && !(tempNode.container)) {
                var nodes = this.getAllDescendants(tempNode, elements);
                for (var _i = 0, nodes_1 = nodes; _i < nodes_1.length; _i++) {
                    var temp = nodes_1[_i];
                    this.scaleObject(sw, sh, refPoint, temp, element, refObject);
                }
                obj.wrapper.measure(new Size());
                obj.wrapper.arrange(obj.wrapper.desiredSize);
                this.diagram.updateGroupOffset(node);
                this.updateInnerParentProperties(tempNode);
            }
            else {
                this.scaleObject(sw, sh, refPoint, node, element, refObject);
            }
            var bounds = getBounds(obj.wrapper);
            var checkBoundaryConstraints = this.checkBoundaryConstraints(undefined, undefined, bounds);
            if (!checkBoundaryConstraints && isOutsideBoundary) {
                this.scale(obj, 1 / sw, 1 / sh, pivot, undefined, true);
                return false;
            }
            this.diagram.updateDiagramObject(obj);
        }
        return true;
    };
    /** @private */
    CommandHandler.prototype.getAllDescendants = function (node, nodes, includeParent, innerParent) {
        var temp = node;
        var parentNodes = [];
        for (var i = 0; i < temp.children.length; i++) {
            node = (this.diagram.nameTable[temp.children[parseInt(i.toString(), 10)]]);
            if (node) {
                if (!node.children) {
                    nodes.push(node);
                }
                else {
                    if (includeParent) {
                        nodes.push(node);
                    }
                    if (innerParent) {
                        parentNodes.push(node);
                    }
                    nodes = this.getAllDescendants(node, nodes);
                }
            }
        }
        return (innerParent) ? parentNodes : nodes;
    };
    /**
     * getChildren method \
     *
     * @returns { (NodeModel | ConnectorModel)[]): (NodeModel | ConnectorModel)[] }     getChildren method .\
     * @param {NodeModel} node - provide the sw value.
     * @param {(NodeModel | ConnectorModel)[]} nodes - provide the sw value.
     *
     * @private
     */
    CommandHandler.prototype.getChildren = function (node, nodes) {
        var temp = node;
        if (node.children && node.children.length) {
            for (var i = 0; i < temp.children.length; i++) {
                node = (this.diagram.nameTable[temp.children[parseInt(i.toString(), 10)]]);
                if (node) {
                    nodes.push(node);
                }
            }
        }
        return nodes;
    };
    /**
     * scaleObject method \
     *
     * @returns { NodeModel }     scaleObject method .\
     * @param {string} id - provide the sw value.
     *
     * @private
     */
    CommandHandler.prototype.cloneChild = function (id) {
        var node = this.diagram.nameTable["" + id];
        return node;
    };
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
    CommandHandler.prototype.scaleObject = function (sw, sh, pivot, obj, element, refObject, canUpdate) {
        sw = sw < 0 ? 1 : sw;
        sh = sh < 0 ? 1 : sh;
        var oldValues = {};
        if (sw !== 1 || sh !== 1) {
            var width = void 0;
            var height = void 0;
            if (obj instanceof Node) {
                var node = obj;
                var isResize = void 0;
                var bound = void 0;
                oldValues = {
                    width: obj.wrapper.actualSize.width, height: obj.wrapper.actualSize.height,
                    offsetX: obj.wrapper.offsetX, offsetY: obj.wrapper.offsetY,
                    margin: { top: node.margin.top, left: node.margin.left }
                };
                if (node.shape.type === 'Bpmn' && node.shape.activity.subProcess.processes
                    && node.shape.activity.subProcess.processes.length > 0) {
                    bound = this.diagram.bpmnModule.getChildrenBound(node, node.id, this.diagram);
                    isResize = node.wrapper.bounds.containsRect(bound);
                }
                width = node.wrapper.actualSize.width * sw;
                height = node.wrapper.actualSize.height * sh;
                var hasAspectRatio = (node.constraints & NodeConstraints.AspectRatio) === NodeConstraints.AspectRatio;
                var hasMinWidth = node.minWidth !== undefined && node.minWidth !== 0;
                var hasMaxWidth = node.maxWidth !== undefined && node.maxWidth !== 0;
                var hasMinHeight = node.minHeight !== undefined && node.minHeight !== 0;
                var hasMaxHeight = node.maxHeight !== undefined && node.maxHeight !== 0;
                if (hasAspectRatio) {
                    var actualSize = node.wrapper.actualSize;
                    if (hasMinWidth && hasMinHeight) {
                        if ((height / node.minHeight) < (width / node.minWidth)) {
                            if (height < node.minHeight) {
                                height = node.minHeight;
                                width = node.minHeight * (actualSize.width / actualSize.height);
                            }
                        }
                        else {
                            if (width < node.minWidth) {
                                width = node.minWidth;
                                height = node.minWidth * (actualSize.height / actualSize.width);
                            }
                        }
                    }
                    else if (hasMinWidth) {
                        if (width < node.minWidth) {
                            width = node.minWidth;
                            height = node.minWidth * (actualSize.height / actualSize.width);
                        }
                    }
                    else if (hasMinHeight) {
                        if (height < node.minHeight) {
                            height = node.minHeight;
                            width = node.minHeight * (actualSize.width / actualSize.height);
                        }
                    }
                    if (hasMaxWidth && hasMaxHeight) {
                        if ((height / node.maxHeight) > (width / node.maxWidth)) {
                            if (height > node.maxHeight) {
                                height = node.maxHeight;
                                width = node.maxHeight * (actualSize.width / actualSize.height);
                            }
                        }
                        else {
                            if (width > node.maxWidth) {
                                width = node.maxWidth;
                                height = node.maxWidth * (actualSize.height / actualSize.width);
                            }
                        }
                    }
                    else if (hasMaxWidth) {
                        if (width > node.maxWidth) {
                            width = node.maxWidth;
                            height = node.maxWidth * (actualSize.height / actualSize.width);
                        }
                    }
                    else if (hasMaxHeight) {
                        if (height > node.maxHeight) {
                            height = node.maxHeight;
                            width = node.maxHeight * (actualSize.width / actualSize.height);
                        }
                    }
                }
                else {
                    if (hasMaxWidth) {
                        width = Math.min(node.maxWidth, width);
                    }
                    if (hasMinWidth) {
                        width = Math.max(node.minWidth, width);
                    }
                    if (hasMinHeight) {
                        height = Math.max(node.minHeight, height);
                    }
                    if (hasMaxHeight) {
                        height = Math.min(node.maxHeight, height);
                    }
                }
                if (isResize) {
                    width = Math.max(width, (bound.right - node.wrapper.bounds.x));
                    height = Math.max(height, (bound.bottom - node.wrapper.bounds.y));
                }
                sw = width / node.actualSize.width;
                sh = height / node.actualSize.height;
            }
            var matrix = identityMatrix(); // let refWrapper: DiagramElement;
            if (!refObject) {
                refObject = obj;
            }
            var refWrapper = refObject.wrapper;
            rotateMatrix(matrix, -refWrapper.rotateAngle, pivot.x, pivot.y);
            scaleMatrix(matrix, sw, sh, pivot.x, pivot.y);
            rotateMatrix(matrix, refWrapper.rotateAngle, pivot.x, pivot.y);
            if (obj instanceof Node) {
                var node = obj; //let left: number; let top: number;
                var newPosition = transformPointByMatrix(matrix, { x: node.wrapper.offsetX, y: node.wrapper.offsetY });
                var oldleft = node.wrapper.offsetX - node.wrapper.actualSize.width * node.pivot.x;
                var oldtop = node.wrapper.offsetY - node.wrapper.actualSize.height * node.pivot.y;
                if (width > 0) {
                    if (node.processId) {
                        var parent_4 = this.diagram.nameTable[node.processId];
                        if (!parent_4.maxWidth || ((node.margin.left + width) < parent_4.maxWidth)) {
                            node.width = width;
                            node.offsetX = newPosition.x;
                        }
                    }
                    else {
                        node.width = width;
                        node.offsetX = newPosition.x;
                    }
                }
                if (height > 0) {
                    if (node.processId) {
                        var parent_5 = this.diagram.nameTable[node.processId];
                        if (!parent_5.maxHeight || ((node.margin.top + height) < parent_5.maxHeight)) {
                            node.height = height;
                            node.offsetY = newPosition.y;
                        }
                    }
                    else {
                        node.height = height;
                        node.offsetY = newPosition.y;
                    }
                }
                var left = node.wrapper.offsetX - node.wrapper.actualSize.width * node.pivot.x;
                var top_1 = node.wrapper.offsetY - node.wrapper.actualSize.height * node.pivot.y;
                var parent_6 = this.diagram.nameTable[node.processId];
                // 931096: In subprocess, BPMN shape nodes positions changed after undo and redo
                if (parent_6) {
                    left = node.offsetX - node.width * node.pivot.x;
                    top_1 = node.offsetY - node.height * node.pivot.y;
                }
                if (parent_6 && ((node.margin.top + (top_1 - oldtop)) <= 0 ||
                    (node.margin.left + (left - oldleft) <= 0))) {
                    if (this.diagram.eventHandler.currentAction !== 'Drag') {
                        this.diagram.nodePropertyChange(obj, {}, {
                            margin: { top: node.margin.top, left: node.margin.left }
                        });
                    }
                    else {
                        this.diagram.nodePropertyChange(obj, {}, {
                            width: node.width, height: node.height, margin: { top: node.margin.top, left: node.margin.left }
                        });
                    }
                }
                else {
                    if (checkParentAsContainer(this.diagram, obj, true)) {
                        checkChildNodeInContainer(this.diagram, obj);
                    }
                    else {
                        if (!canUpdate) {
                            this.diagram.nodePropertyChange(obj, oldValues, {
                                width: node.width, height: node.height, offsetX: node.offsetX, offsetY: node.offsetY,
                                margin: { top: node.margin.top + (top_1 - oldtop), left: node.margin.left + (left - oldleft) }
                            });
                        }
                    }
                }
            }
            else {
                var connector = obj;
                var oldValues_1 = { sourcePoint: connector.sourcePoint, targetPoint: connector.targetPoint };
                if (!connector.sourceWrapper || !connector.targetWrapper) {
                    this.scaleConnector(connector, matrix, oldValues_1, sw, sh, pivot);
                }
            }
            var parentNode = this.diagram.nameTable[obj.processId];
            if (parentNode) {
                var parent_7 = parentNode.wrapper.bounds;
                var child = obj.wrapper.bounds;
                var bound = this.diagram.bpmnModule.getChildrenBound(parentNode, obj.id, this.diagram);
                this.diagram.bpmnModule.updateSubProcessess(bound, obj, this.diagram);
            }
        }
    };
    CommandHandler.prototype.scaleConnector = function (connector, matrix, oldValues, sw, sh, pivot) {
        connector.sourcePoint = transformPointByMatrix(matrix, connector.sourcePoint);
        connector.targetPoint = transformPointByMatrix(matrix, connector.targetPoint);
        if (connector.shape.type === 'Bpmn' && connector.shape.sequence === 'Default' && connector.shape.flow === 'Sequence') {
            this.updatePathElementOffset(connector);
        }
        var newProp = { sourcePoint: connector.sourcePoint, targetPoint: connector.targetPoint };
        this.diagram.connectorPropertyChange(connector, oldValues, newProp);
        var selector = this.diagram.selectedItems;
        if (selectionHasConnector(this.diagram, selector)) {
            var clonedSelectedItems = cloneObject(this.diagram.selectedItems);
            var nodeModel = {
                offsetX: clonedSelectedItems.offsetX, offsetY: clonedSelectedItems.offsetY,
                height: clonedSelectedItems.height, width: clonedSelectedItems.width,
                rotateAngle: clonedSelectedItems.rotateAngle
            };
            var obj = new Node(this.diagram, 'nodes', nodeModel, true);
            obj.wrapper = clonedSelectedItems.wrapper;
            obj.wrapper.rotateAngle = selector.rotateAngle;
            this.scaleObject(sw, sh, pivot, obj, obj.wrapper, obj, true);
            selector.wrapper.actualSize.width = obj.width;
            selector.wrapper.actualSize.height = obj.height;
            selector.wrapper.offsetX = obj.offsetX;
            selector.wrapper.offsetY = obj.offsetY;
            var child = this.diagram.selectedItems.connectors[0];
            if (child.id !== connector.id) {
                this.measureSelector(selector);
            }
        }
    };
    CommandHandler.prototype.measureSelector = function (selector) {
        var desiredBounds = undefined;
        //Measuring the children
        var clonedSelectedItems = cloneObject(this.diagram.selectedItems);
        var objects = [];
        var bounds;
        objects = clonedSelectedItems.connectors;
        var pivot = { x: this.diagram.selectedItems.offsetX, y: this.diagram.selectedItems.offsetY };
        for (var i = 0; i < objects.length; i++) {
            var matrix_1 = identityMatrix();
            rotateMatrix(matrix_1, -selector.rotateAngle, pivot.x, pivot.y);
            objects[parseInt(i.toString(), 10)].sourcePoint
                = transformPointByMatrix(matrix_1, objects[parseInt(i.toString(), 10)].sourcePoint);
            objects[parseInt(i.toString(), 10)].targetPoint
                = transformPointByMatrix(matrix_1, objects[parseInt(i.toString(), 10)].targetPoint);
            var p1 = {
                x: objects[parseInt(i.toString(), 10)].sourcePoint.x,
                y: objects[parseInt(i.toString(), 10)].sourcePoint.y
            };
            var p2 = {
                x: objects[parseInt(i.toString(), 10)].targetPoint.x,
                y: objects[parseInt(i.toString(), 10)].targetPoint.y
            };
            bounds = (this.calculateBounds(p1, p2));
            if (desiredBounds === undefined) {
                desiredBounds = bounds;
            }
            else {
                desiredBounds.uniteRect(bounds);
            }
        }
        var offsetPt = {};
        if (desiredBounds !== undefined) {
            offsetPt = {
                x: desiredBounds.x + desiredBounds.width * selector.wrapper.pivot.x,
                y: desiredBounds.y + desiredBounds.height * selector.wrapper.pivot.y
            };
        }
        var nodeModel = {
            offsetX: offsetPt.x, offsetY: offsetPt.y,
            height: desiredBounds.height, width: desiredBounds.width, rotateAngle: 0
        };
        var obj = new Node(this.diagram, 'nodes', nodeModel, true);
        var matrix = identityMatrix();
        rotateMatrix(matrix, selector.rotateAngle, pivot.x, pivot.y);
        obj.rotateAngle += selector.rotateAngle;
        obj.rotateAngle = (obj.rotateAngle + 360) % 360;
        var newOffset = transformPointByMatrix(matrix, { x: obj.offsetX, y: obj.offsetY });
        obj.offsetX = newOffset.x;
        obj.offsetY = newOffset.y;
        selector.wrapper.actualSize.width = desiredBounds.width;
        selector.wrapper.actualSize.height = desiredBounds.height;
        selector.wrapper.offsetX = obj.offsetX;
        selector.wrapper.offsetY = obj.offsetY;
        var selectorEle = getSelectorElement(this.diagram.element.id);
        // EJ2-69511 - Added handleSize parameter to avoid exception when we perform multiselect of connectors, rotate and resize it.
        this.diagram.diagramRenderer.renderResizeHandle(selector.wrapper, selectorEle, selector.thumbsConstraints, this.diagram.scroller.currentZoom, selector.constraints, this.diagram.scroller.transform, false, canMove(selector), null, null, selector.handleSize);
    };
    CommandHandler.prototype.calculateBounds = function (p1, p2) {
        var left = Math.min(p1.x, p2.x);
        var right = Math.max(p1.x, p2.x);
        var top = Math.min(p1.y, p2.y);
        var bottom = Math.max(p1.y, p2.y);
        var width = right - left;
        var height = bottom - top;
        var rect = new Rect(left, top, width, height);
        return rect;
    };
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
    CommandHandler.prototype.portDrag = function (obj, portElement, tx, ty) {
        var oldValues;
        var changedvalues;
        var port = this.findTarget(portElement, obj);
        var bounds = getBounds(obj.wrapper);
        if (port && canDrag(port, this.diagram)) {
            // Feature 826644: Support to add ports to the connector. Added below condition to check connector port.
            if (obj instanceof Node) {
                oldValues = this.getPortChanges(obj, port);
                port.offset.x += (tx / bounds.width);
                port.offset.y += (ty / bounds.height);
                changedvalues = this.getPortChanges(obj, port);
                this.diagram.nodePropertyChange(obj, oldValues, changedvalues);
            }
            else {
                oldValues = this.getConnectorPortChanges(obj, port);
                this.updatePortOffset(obj, port, tx, ty);
                port.alignment = 'Center';
                changedvalues = this.getConnectorPortChanges(obj, port);
                this.diagram.connectorPropertyChange(obj, oldValues, changedvalues);
            }
            this.diagram.updateDiagramObject(obj);
        }
    };
    /** @private */
    CommandHandler.prototype.labelDrag = function (obj, textElement, tx, ty) {
        //let changedvalues: Object;
        //let label: ShapeAnnotationModel | PathAnnotationModel;
        // eslint-disable-next-line max-len
        var label = this.findTarget(textElement, obj);
        var bounds = cornersPointsBeforeRotation(obj.wrapper);
        var oldValues = this.getAnnotationChanges(obj, label);
        var oldValue = this.getSelectedObject();
        if (label instanceof ShapeAnnotation) {
            label.offset.x += (tx / bounds.width);
            label.offset.y += (ty / bounds.height);
        }
        else {
            this.updatePathAnnotationOffset(obj, label, tx, ty);
            if (label instanceof PathAnnotation) {
                label.alignment = 'Center';
            }
        }
        var changedvalues = this.getAnnotationChanges(obj, label);
        if (obj instanceof Node) {
            this.diagram.nodePropertyChange(obj, oldValues, changedvalues);
        }
        else {
            this.diagram.connectorPropertyChange(obj, oldValues, changedvalues);
        }
        this.diagram.updateDiagramObject(obj);
        if (!isSelected(this.diagram, label, false, textElement)) {
            this.labelSelect(obj, textElement, oldValue);
        }
        //909175: Label interaction not reflected properly in overview
        for (var _i = 0, _a = this.diagram.views; _i < _a.length; _i++) {
            var temp = _a[_i];
            // eslint-disable-next-line security/detect-object-injection
            var view = this.diagram.views[temp];
            if (!(view instanceof Diagram)) {
                this.diagram.refreshCanvasDiagramLayer(view);
            }
        }
    };
    CommandHandler.prototype.updatePathAnnotationOffset = function (object, label, tx, ty, newPosition, size) {
        var textWrapper = this.diagram.getWrapper(object.wrapper, label.id);
        var offsetX = textWrapper.offsetX;
        var offsetY = textWrapper.offsetY;
        var offset;
        var intermediatePoints = object.intermediatePoints;
        var prev;
        var pointLength = 0;
        var totalLength = 0;
        var intersectingOffset;
        var currentPosition;
        switch (label.verticalAlignment) {
            case 'Center':
                if (label.horizontalAlignment === 'Center') {
                    currentPosition = (newPosition) ? newPosition : { x: offsetX + tx, y: offsetY + ty };
                }
                else if (label.horizontalAlignment === 'Right') {
                    currentPosition = (newPosition) ? newPosition : { x: offsetX + (textWrapper.actualSize.width) / 2 + tx, y: offsetY + ty };
                }
                else if (label.horizontalAlignment === 'Left') {
                    currentPosition = (newPosition) ? newPosition : { x: offsetX - (textWrapper.actualSize.width) / 2 + tx, y: offsetY + ty };
                }
                break;
            case 'Top':
                if (label.horizontalAlignment === 'Center') {
                    currentPosition = (newPosition) ? newPosition : { x: offsetX + tx, y: offsetY - (textWrapper.actualSize.height) / 2 + ty };
                }
                else if (label.horizontalAlignment === 'Right') {
                    currentPosition = (newPosition) ? newPosition :
                        { x: offsetX + (textWrapper.actualSize.width) / 2 + tx, y: offsetY - (textWrapper.actualSize.height) / 2 + ty };
                }
                else if (label.horizontalAlignment === 'Left') {
                    currentPosition = (newPosition) ? newPosition :
                        { x: offsetX - (textWrapper.actualSize.width) / 2 + tx, y: offsetY - (textWrapper.actualSize.height) / 2 + ty };
                }
                break;
            case 'Bottom':
                if (label.horizontalAlignment === 'Center') {
                    currentPosition = (newPosition) ? newPosition : { x: offsetX + tx, y: offsetY + (textWrapper.actualSize.height) / 2 + ty };
                }
                else if (label.horizontalAlignment === 'Right') {
                    currentPosition = (newPosition) ? newPosition :
                        { x: offsetX + (textWrapper.actualSize.width) / 2 + tx, y: offsetY + (textWrapper.actualSize.height) / 2 + ty };
                }
                else if (label.horizontalAlignment === 'Left') {
                    currentPosition = (newPosition) ? newPosition :
                        { x: offsetX - (textWrapper.actualSize.width) / 2 + tx, y: offsetY + (textWrapper.actualSize.height) / 2 + ty };
                }
                break;
        }
        var intersetingPts = this.getInterceptWithSegment(currentPosition, intermediatePoints);
        var newOffset = intermediatePoints[intermediatePoints.length - 1];
        totalLength = Point.getLengthFromListOfPoints(intermediatePoints);
        if (intersetingPts.length > 0) {
            label.dragLimit = label.dragLimit ? label.dragLimit : {};
            if (label.dragLimit.top || label.dragLimit.bottom || label.dragLimit.left || label.dragLimit.right) {
                var minDistance = { minDistance: null };
                newOffset = this.getRelativeOffset(currentPosition, intermediatePoints, minDistance);
                var distance = { minDistance: null };
                intersectingOffset = this.getRelativeOffset(currentPosition, intersetingPts, distance);
                if (minDistance != null && distance.minDistance < minDistance.minDistance) {
                    newOffset = intersectingOffset;
                }
                else {
                    var connectorOffset = getOffsetOfConnector(object.intermediatePoints, label);
                    newOffset = connectorOffset.point;
                }
            }
            else {
                intersectingOffset = intersetingPts[intersetingPts.length - 1];
                newOffset = intersectingOffset;
            }
            if (newOffset) {
                var p = void 0;
                var bounds = void 0;
                for (p = 0; p < intermediatePoints.length; p++) {
                    if (prev != null) {
                        bounds = Rect.toBounds([prev, intermediatePoints[parseInt(p.toString(), 10)]]);
                        if (bounds.containsPoint(newOffset)) {
                            pointLength += Point.findLength(prev, newOffset);
                            break;
                        }
                        else {
                            pointLength += Point.findLength(prev, intermediatePoints[parseInt(p.toString(), 10)]);
                        }
                    }
                    prev = intermediatePoints[parseInt(p.toString(), 10)];
                }
                offset = { x: pointLength / totalLength, y: 0 };
            }
            this.updateLabelMargin(object, label, offset, currentPosition, size, tx, ty);
        }
        else {
            this.updateLabelMargin(object, label, null, currentPosition, size, tx, ty);
        }
    };
    // Feature 826644: Support to add ports to the connector.
    // Added below method to update the port offset when we drag the port.
    CommandHandler.prototype.updatePortOffset = function (object, port, tx, ty, newPosition, size) {
        var textWrapper = this.diagram.getWrapper(object.wrapper, port.id);
        var offsetX = textWrapper.offsetX;
        var offsetY = textWrapper.offsetY;
        var offset;
        var intermediatePoints = object.intermediatePoints;
        var prev;
        var pointLength = 0;
        var totalLength = 0;
        var intersectingOffset;
        var currentPosition;
        switch (port.verticalAlignment) {
            case 'Center':
                if (port.horizontalAlignment === 'Center') {
                    currentPosition = (newPosition) ? newPosition : { x: offsetX + tx, y: offsetY + ty };
                }
                else if (port.horizontalAlignment === 'Right') {
                    currentPosition = (newPosition) ? newPosition : { x: offsetX + (textWrapper.actualSize.width) / 2 + tx, y: offsetY + ty };
                }
                else if (port.horizontalAlignment === 'Left') {
                    currentPosition = (newPosition) ? newPosition : { x: offsetX - (textWrapper.actualSize.width) / 2 + tx, y: offsetY + ty };
                }
                break;
            case 'Top':
                if (port.horizontalAlignment === 'Center') {
                    currentPosition = (newPosition) ? newPosition : { x: offsetX + tx, y: offsetY - (textWrapper.actualSize.height) / 2 + ty };
                }
                else if (port.horizontalAlignment === 'Right') {
                    currentPosition = (newPosition) ? newPosition :
                        { x: offsetX + (textWrapper.actualSize.width) / 2 + tx, y: offsetY - (textWrapper.actualSize.height) / 2 + ty };
                }
                else if (port.horizontalAlignment === 'Left') {
                    currentPosition = (newPosition) ? newPosition :
                        { x: offsetX - (textWrapper.actualSize.width) / 2 + tx, y: offsetY - (textWrapper.actualSize.height) / 2 + ty };
                }
                break;
            case 'Bottom':
                if (port.horizontalAlignment === 'Center') {
                    currentPosition = (newPosition) ? newPosition : { x: offsetX + tx, y: offsetY + (textWrapper.actualSize.height) / 2 + ty };
                }
                else if (port.horizontalAlignment === 'Right') {
                    currentPosition = (newPosition) ? newPosition :
                        { x: offsetX + (textWrapper.actualSize.width) / 2 + tx, y: offsetY + (textWrapper.actualSize.height) / 2 + ty };
                }
                else if (port.horizontalAlignment === 'Left') {
                    currentPosition = (newPosition) ? newPosition :
                        { x: offsetX - (textWrapper.actualSize.width) / 2 + tx, y: offsetY + (textWrapper.actualSize.height) / 2 + ty };
                }
                break;
        }
        var intersectingPoints = this.getInterceptWithSegment(currentPosition, intermediatePoints);
        var newOffset = intermediatePoints[intermediatePoints.length - 1];
        totalLength = Point.getLengthFromListOfPoints(intermediatePoints);
        if (intersectingPoints.length > 0) {
            intersectingOffset = intersectingPoints[intersectingPoints.length - 1];
            newOffset = intersectingOffset;
            if (newOffset) {
                var p = void 0;
                var bounds = void 0;
                for (p = 0; p < intermediatePoints.length; p++) {
                    if (prev != null) {
                        bounds = Rect.toBounds([prev, intermediatePoints[parseInt(p.toString(), 10)]]);
                        if (bounds.containsPoint(newOffset)) {
                            pointLength += Point.findLength(prev, newOffset);
                            break;
                        }
                        else {
                            pointLength += Point.findLength(prev, intermediatePoints[parseInt(p.toString(), 10)]);
                        }
                    }
                    prev = intermediatePoints[parseInt(p.toString(), 10)];
                }
                offset = { x: pointLength / totalLength, y: 0 };
            }
            this.updateLabelMargin(object, port, offset, currentPosition, size, tx, ty);
        }
        else {
            this.updateLabelMargin(object, port, null, currentPosition, size, tx, ty);
        }
    };
    CommandHandler.prototype.getRelativeOffset = function (currentPosition, points, minDistance) {
        var newOffset;
        var distance;
        var pt;
        var i;
        for (i = 0; i < points.length; i++) {
            pt = points[parseInt(i.toString(), 10)];
            distance = Math.round(Math.sqrt(Math.pow((currentPosition.x - pt.x), 2) +
                Math.pow((currentPosition.y - pt.y), 2)));
            if (minDistance.minDistance === null ||
                Math.min(Math.abs(minDistance.minDistance), Math.abs(distance)) === Math.abs(distance)) {
                newOffset = pt;
                minDistance.minDistance = distance;
            }
        }
        return newOffset;
    };
    CommandHandler.prototype.dragLimitValue = function (label, point, tempPt, contentDimension) {
        var x = false;
        var y = false;
        if ((tempPt.x >= (point.x - label.dragLimit.left - (contentDimension.width / 2))) &&
            (tempPt.x <= point.x + label.dragLimit.right + (contentDimension.width / 2))) {
            x = true;
        }
        if ((tempPt.y >= (point.y - label.dragLimit.top - (contentDimension.height / 2))) &&
            (tempPt.y <= point.y + label.dragLimit.bottom + (contentDimension.height / 2))) {
            y = true;
        }
        return { x: x, y: y };
    };
    /* eslint-disable */
    CommandHandler.prototype.updateLabelMargin = function (node, label, offset, tempPt, size, tx, ty) {
        offset = offset ? offset : { x: label.offset, y: 0 };
        if (label && offset && offset.x > 0 && offset.x < 1) {
            //let point: PointModel;
            var length_2 = Point.getLengthFromListOfPoints(node.intermediatePoints);
            var point = this.getPointAtLength(length_2 * offset.x, node.intermediatePoints, 0);
            var curZoomfactor = this.diagram.scrollSettings.currentZoom;
            var dragLimit = label.dragLimit ? label.dragLimit : { left: 0, right: 0, top: 0, bottom: 0 };
            if (dragLimit.top || dragLimit.bottom || dragLimit.left || dragLimit.right) {
                var labelBounds = this.diagram.getWrapper(node.wrapper, label.id);
                var contentDimension = new Rect(0, 0, 0, 0);
                var annotationWrtapper = this.diagram.getWrapper(node.wrapper, label.id);
                contentDimension.x = ((annotationWrtapper).offsetX / curZoomfactor) + tx;
                contentDimension.y = (annotationWrtapper.offsetY / curZoomfactor) + ty;
                contentDimension.width = annotationWrtapper.bounds.width / curZoomfactor;
                contentDimension.height = annotationWrtapper.bounds.height / curZoomfactor;
                var draggableBounds = new Rect(point.x - (dragLimit.left || 0) - contentDimension.width / 2, point.y - (dragLimit.top || 0) - contentDimension.height / 2, (dragLimit.left || 0) + (dragLimit.right || 0) + contentDimension.width, (dragLimit.top || 0) + (dragLimit.bottom || 0) + contentDimension.height);
                if (draggableBounds.containsPoint(tempPt)) {
                    tempPt = tempPt;
                }
                else {
                    var lineIntersects = void 0;
                    var line1 = [point, tempPt];
                    lineIntersects = this.boundsInterSects(line1, draggableBounds, false);
                    for (var _i = 0, lineIntersects_1 = lineIntersects; _i < lineIntersects_1.length; _i++) {
                        var i = lineIntersects_1[_i];
                        var ptt = i;
                        tempPt = ptt;
                    }
                }
                var cursorLimit = this.dragLimitValue(label, point, tempPt, contentDimension);
                label.margin = {
                    left: cursorLimit.x ? tempPt.x - point.x : label.margin.left,
                    top: cursorLimit.y ? tempPt.y - point.y : label.margin.top, right: 0, bottom: 0
                };
            }
            else {
                label.margin = { left: tempPt.x - point.x, top: tempPt.y - point.y, right: 0, bottom: 0 };
            }
            label.offset = offset.x;
            if (size) {
                label.width = size.width;
                label.height = size.height;
            }
        }
    };
    CommandHandler.prototype.boundsInterSects = function (polyLine, bounds, self) {
        var intersects;
        if (bounds) {
            var polyLine2 = [
                { x: bounds.x, y: bounds.y },
                { x: bounds.x + bounds.width, y: bounds.y },
                { x: bounds.x + bounds.width, y: bounds.y + bounds.height },
                { x: bounds.x, y: bounds.y + bounds.height },
                { x: bounds.x, y: bounds.y }
            ];
            intersects = this.intersect(polyLine, polyLine2, self);
        }
        return intersects;
    };
    /** @private */
    CommandHandler.prototype.intersect = function (polyLine1, polyLine2, self) {
        var intersect = [];
        for (var i = 0; i < polyLine1.length - 1; i++) {
            for (var j = 0; j < polyLine2.length - 1; j++) {
                var p = intersect2(polyLine1[i], polyLine1[i + 1], polyLine2[j], polyLine2[j + 1]);
                if (p.x !== 0 && p.y !== 0) {
                    intersect.push(p);
                }
            }
        }
        return intersect;
    };
    /**
     * @private
     */
    CommandHandler.prototype.getPointAtLength = function (length, points, angle) {
        angle = 0;
        var run = 0;
        var pre;
        var found = { x: 0, y: 0 };
        var pt;
        for (var i = 0; i < points.length; i++) {
            pt = points[i];
            if (!pre) {
                pre = pt;
                continue;
            }
            else {
                var l = Point.findLength(pre, pt);
                var r = void 0;
                var deg = void 0;
                var x = void 0;
                var y = void 0;
                if (run + l >= length) {
                    r = length - run;
                    deg = Point.findAngle(pre, pt);
                    x = r * Math.cos(deg * Math.PI / 180);
                    y = r * Math.sin(deg * Math.PI / 180);
                    found = { x: pre.x + x, y: pre.y + y };
                    angle = deg;
                    break;
                }
                else {
                    run += l;
                }
            }
            pre = pt;
        }
        return found;
    };
    CommandHandler.prototype.getInterceptWithSegment = function (currentPosition, conPoints) {
        var intercepts = [];
        var imgLine = [];
        var segemnt = [];
        var tarAngle;
        var srcAngle; //let maxLength: number;
        var maxLength = Point.findLength({ x: 0, y: 0 }, { x: this.diagram.scroller.viewPortWidth, y: this.diagram.scroller.viewPortHeight });
        for (var i = 1; i < conPoints.length; i++) {
            segemnt = [conPoints[i - 1], conPoints[i]];
            imgLine = [];
            srcAngle = Math.round(Point.findAngle(segemnt[0], segemnt[1]) % 360);
            tarAngle = Math.round(Point.findAngle(segemnt[1], segemnt[0]) % 360);
            var angleAdd = (srcAngle > 0 && srcAngle <= 90) || (srcAngle > 180 && srcAngle <= 270) ? 90 : -90;
            imgLine.push(Point.transform(currentPosition, srcAngle + angleAdd, maxLength));
            imgLine.push(Point.transform(currentPosition, tarAngle + angleAdd, maxLength));
            var lineUtil1 = { x1: segemnt[0].x, y1: segemnt[0].y, x2: segemnt[1].x, y2: segemnt[1].y };
            var lineUtil2 = { x1: imgLine[0].x, y1: imgLine[0].y, x2: imgLine[1].x, y2: imgLine[1].y };
            var line3 = intersect3(lineUtil1, lineUtil2);
            if (line3.enabled) {
                intercepts.push(line3.intersectPt);
            }
        }
        return intercepts;
    };
    /** @private */
    CommandHandler.prototype.getAnnotationChanges = function (object, label) {
        var index = findObjectIndex(object, label.id, true);
        var annotations = {};
        annotations[index] = {
            width: label.width, height: label.height, offset: (object instanceof Node) ? ({
                x: label.offset.x,
                y: label.offset.y
            }) : label.offset,
            rotateAngle: label.rotateAngle,
            margin: { left: label.margin.left, right: label.margin.right, top: label.margin.top, bottom: label.margin.bottom },
            horizontalAlignment: label.horizontalAlignment, verticalAlignment: label.verticalAlignment,
            alignment: ((object instanceof Connector) ? label.alignment : undefined)
        };
        return { annotations: annotations };
    };
    // Feature 826644: Support to add ports to the connector. Added below method to get port values before and after drag.
    /** @private */
    CommandHandler.prototype.getConnectorPortChanges = function (object, label) {
        var index = findPortIndex(object, label.id, true);
        var ports = {};
        ports[index] = {
            width: label.width, height: label.height, offset: label.offset,
            margin: { left: label.margin.left, right: label.margin.right, top: label.margin.top, bottom: label.margin.bottom },
            horizontalAlignment: label.horizontalAlignment, verticalAlignment: label.verticalAlignment,
            alignment: ((object instanceof Connector) ? label.alignment : undefined)
        };
        return { ports: ports };
    };
    /** @private */
    CommandHandler.prototype.getPortChanges = function (object, port) {
        var index = findObjectIndex(object, port.id, false);
        var ports = {};
        ports[index] = { offset: port.offset };
        return { ports: ports };
    };
    /** @private */
    CommandHandler.prototype.labelRotate = function (object, label, currentPosition, selector) {
        var oldValues;
        var changedvalues;
        oldValues = this.getAnnotationChanges(object, label);
        var matrix = identityMatrix();
        var rotateAngle = label.rotateAngle;
        var labelWrapper = this.diagram.getWrapper(object.wrapper, label.id);
        var angle = findAngle({ x: labelWrapper.offsetX, y: labelWrapper.offsetY }, currentPosition) + 90;
        var snapAngle = this.snapAngle(angle);
        angle = snapAngle !== 0 ? snapAngle : angle;
        if (label instanceof PathAnnotation && label.segmentAngle) {
            var getPointloop = getAnnotationPosition(object.intermediatePoints, label, object.wrapper.bounds);
            angle -= getPointloop.angle;
        }
        angle = (angle + 360) % 360;
        label.rotateAngle += angle - (label.rotateAngle + labelWrapper.parentTransform);
        if (label instanceof PathAnnotation) {
            label.alignment = 'Center';
        }
        selector.wrapper.rotateAngle = selector.rotateAngle = label.rotateAngle;
        changedvalues = this.getAnnotationChanges(object, label);
        if (object instanceof Node) {
            this.diagram.nodePropertyChange(object, oldValues, changedvalues);
        }
        else {
            this.diagram.connectorPropertyChange(object, oldValues, changedvalues);
        }
        this.diagram.updateDiagramObject(object);
        //909175: Label interaction not reflected properly in overview
        for (var _i = 0, _a = this.diagram.views; _i < _a.length; _i++) {
            var temp = _a[_i];
            var view = this.diagram.views[temp];
            if (!(view instanceof Diagram)) {
                this.diagram.refreshCanvasDiagramLayer(view);
            }
        }
    };
    /** @private */
    CommandHandler.prototype.labelResize = function (node, label, deltaWidth, deltaHeight, pivot, selector) {
        var oldValues;
        var changedvalues;
        var rotateAngle;
        oldValues = this.getAnnotationChanges(node, label);
        var textElement = selector.wrapper.children[0];
        if ((deltaWidth && deltaWidth !== 1) || (deltaHeight && deltaHeight !== 1)) {
            var newMat = identityMatrix();
            var matrix = identityMatrix();
            rotateMatrix(newMat, -node.rotateAngle, node.offsetX, node.offsetY);
            rotateAngle = ((textElement.rotateAngle + ((node instanceof Node) ? node.rotateAngle : 0)) + 360) % 360;
            rotateMatrix(matrix, -rotateAngle, pivot.x, pivot.y);
            scaleMatrix(matrix, deltaWidth, deltaHeight, pivot.x, pivot.y);
            rotateMatrix(matrix, rotateAngle, pivot.x, pivot.y);
            var newPosition = transformPointByMatrix(matrix, { x: textElement.offsetX, y: textElement.offsetY });
            var height = textElement.actualSize.height * deltaHeight;
            var width = textElement.actualSize.width * deltaWidth;
            var shape = this.findTarget(textElement, node);
            if (shape instanceof PathAnnotation) {
                newPosition.y += (shape.verticalAlignment === 'Top') ? (-height / 2) : ((shape.verticalAlignment === 'Bottom') ? (height / 2) : 0);
                newPosition.x += (shape.horizontalAlignment === 'Left') ? (-width / 2) : ((shape.horizontalAlignment === 'Right') ? (width / 2) : 0);
            }
            if (shape instanceof PathAnnotation) {
                this.updatePathAnnotationOffset(node, label, 0, 0, newPosition, new Size(width, height));
            }
            else {
                var bounds = cornersPointsBeforeRotation(node.wrapper);
                newPosition = transformPointByMatrix(newMat, newPosition);
                newPosition.x = newPosition.x - textElement.margin.left + textElement.margin.right;
                newPosition.y = newPosition.y - textElement.margin.top + textElement.margin.bottom;
                newPosition.y += (shape.verticalAlignment === 'Top') ? (-height / 2) : ((shape.verticalAlignment === 'Bottom') ? (height / 2) : 0);
                newPosition.x += (shape.horizontalAlignment === 'Left') ? (-width / 2) : ((shape.horizontalAlignment === 'Right') ? (width / 2) : 0);
                var offsetx = bounds.width / (newPosition.x - bounds.x);
                var offsety = bounds.height / (newPosition.y - bounds.y);
                if (width > 1) {
                    shape.width = width;
                    shape.offset.x = 1 / offsetx;
                }
                if (height > 1) {
                    shape.height = height;
                    shape.offset.y = 1 / offsety;
                }
            }
        }
        if (label instanceof PathAnnotation) {
            label.alignment = 'Center';
        }
        changedvalues = this.getAnnotationChanges(node, label);
        if (node instanceof Node) {
            this.diagram.nodePropertyChange(node, oldValues, changedvalues);
        }
        else {
            this.diagram.connectorPropertyChange(node, oldValues, changedvalues);
        }
        this.diagram.updateDiagramObject(node);
        //909175: Label interaction not reflected properly in overview
        for (var _i = 0, _a = this.diagram.views; _i < _a.length; _i++) {
            var temp = _a[_i];
            var view = this.diagram.views[temp];
            if (!(view instanceof Diagram)) {
                this.diagram.refreshCanvasDiagramLayer(view);
            }
        }
    };
    /** @private */
    CommandHandler.prototype.getSubProcess = function (source) {
        var selector = { nodes: [], connectors: [] };
        var process;
        if (source instanceof Node) {
            process = source.processId;
        }
        else if (source && source.nodes && (source.nodes.length)
            && source.nodes[0].processId) {
            process = source.nodes[0].processId;
        }
        if (process) {
            selector.nodes.push(clone(this.diagram.nameTable[process]));
            return selector;
        }
        return selector;
    };
    /**   @private  */
    CommandHandler.prototype.checkBoundaryConstraints = function (tx, ty, nodeBounds, isInitialRendering) {
        var pageSettings = this.diagram.pageSettings;
        var boundaryConstraints = this.diagram.pageSettings.boundaryConstraints;
        var scroller = this.diagram.scroller;
        if (boundaryConstraints === 'Page' || boundaryConstraints === 'Diagram') {
            var selectorBounds = !nodeBounds ? this.diagram.selectedItems.wrapper.bounds : undefined;
            var width = boundaryConstraints === 'Page' ? pageSettings.width : scroller.viewPortWidth;
            var height = boundaryConstraints === 'Page' ? pageSettings.height : scroller.viewPortHeight;
            var bounds = nodeBounds;
            var right = (nodeBounds ? bounds.right : selectorBounds.right) + (tx || 0);
            var left = (nodeBounds ? bounds.left : selectorBounds.left) + (tx || 0);
            var top_2 = (nodeBounds ? bounds.top : selectorBounds.top) + (ty || 0);
            var bottom = (nodeBounds ? bounds.bottom : selectorBounds.bottom) + (ty || 0);
            //Bug 906963: Layout is not rendered when boundaryConstraints set to "Page/Diagram"
            if (right <= width && left >= 0
                && bottom <= height && top_2 >= 0 || (this.diagram.layout.type !== 'None' && isInitialRendering)) {
                return true;
            }
            return false;
        }
        return true;
    };
    //interfaces
    /** @private */
    CommandHandler.prototype.dragSelectedObjects = function (tx, ty) {
        var _this = this;
        var obj = this.diagram.selectedItems;
        if (this.state && !this.state.backup) {
            this.state.backup = {};
            this.state.backup.offsetX = obj.offsetX;
            this.state.backup.offsetY = obj.offsetY;
        }
        obj = renderContainerHelper(this.diagram, obj) || obj;
        //Bug 905527: Multiselecting and dragging Swimlane updates incorrectly
        //Added below condition to check if swimlane is selected and not the symbol symbol from the symbol palette
        //Also check if the selected swimlane is not the only object selected
        var swimLaneInSelection = this.diagram.selectedItems.nodes.filter(function (node) { return node.shape.type === 'SwimLane'; });
        var conCollection = [];
        if (swimLaneInSelection.length > 0 && !this.diagram.currentSymbol) {
            if (this.diagram.selectedItems.nodes.length + this.diagram.selectedItems.connectors.length > 1) {
                var filterObjects = this.diagram.selectedItems.nodes.filter(function (node) { return (node.parentId === '' || _this.diagram.nameTable[node.parentId].shape.type !== 'SwimLane'); });
                if (filterObjects.length > 0) {
                    for (var i = 0; i < filterObjects.length; i++) {
                        if ((this.diagram.nameTable[filterObjects[parseInt(i.toString(), 10)].parentId] &&
                            this.diagram.nameTable[filterObjects[parseInt(i.toString(), 10)].parentId].isLane)
                            || filterObjects[parseInt(i.toString(), 10)].shape.type === 'SwimLane') {
                            filterObjects.splice(i, 1);
                            i--;
                        }
                    }
                    //"obj" -  The current object being processed in the array.
                    //"index" - The index of the current object in the array.
                    //"self" - The reference to the entire array being processed by the filter function.
                    var uniqueSwimlane = swimLaneInSelection.filter(function (obj, index, self) {
                        return index === self.findIndex(function (item) { return item.id === obj.id; });
                    });
                    //Bug 913796: Multiselect swimlane with outside node, drag, rotate is not proper
                    //Added below code to get connectors connected inside swimlane and update the properties.
                    for (var i = 0; i < uniqueSwimlane.length; i++) {
                        conCollection = conCollection.concat(getConnectors(this.diagram, uniqueSwimlane[i].wrapper.children[0], 0, true));
                    }
                    if (filterObjects.length > 0 || uniqueSwimlane.length > 1 || this.diagram.selectedItems.connectors.length > 0) {
                        filterObjects = filterObjects.concat(uniqueSwimlane);
                        // Clear the nodes array without losing the reference
                        this.diagram.selectedItems.nodes.splice(0, this.diagram.selectedItems.nodes.length);
                        // Push objects from filterObjects into the nodes array
                        filterObjects.forEach(function (node) {
                            _this.diagram.selectedItems.nodes.push(node);
                        });
                        obj = this.diagram.selectedItems;
                        this.diagram.selectedObject.helperObject = undefined;
                    }
                }
            }
        }
        if (this.checkBoundaryConstraints(tx, ty)) {
            this.diagram.diagramActions = this.diagram.diagramActions | (DiagramAction.PreventZIndexOnDragging | DiagramAction.DragUsingMouse);
            var actualObject = this.diagram.selectedObject.actualObject;
            if ((actualObject && actualObject instanceof Node && actualObject.isLane &&
                canLaneInterchange(actualObject, this.diagram)) || (!actualObject || !actualObject.isLane)) {
                this.diagram.drag(obj, tx, ty);
                updateConnectorsProperties(conCollection, this.diagram);
            }
            this.diagram.diagramActions = this.diagram.diagramActions & ~(DiagramAction.PreventZIndexOnDragging | DiagramAction.DragUsingMouse);
            this.diagram.refreshCanvasLayers();
            //Bug 872140: Dragging HTML nodes in a diagram leaves shadows on the overview
            this.checkHtmlObjectDrag(obj);
            return true;
        }
        return false;
    };
    // Checks if any HTML object is being dragged and reset the canvas to clear the shadow of the HTML node border.
    CommandHandler.prototype.checkHtmlObjectDrag = function (obj) {
        var isHtmlObjDragged = false;
        if (this.diagram.views && this.diagram.views.length > 1) {
            if (obj instanceof Selector) {
                isHtmlObjDragged = obj.nodes.some(function (node) { return node.shape && node.shape.type === 'HTML'; });
            }
            else if (obj.shape && obj.shape.type === 'HTML') {
                isHtmlObjDragged = true;
            }
            if (isHtmlObjDragged) {
                this.resetOverviewCanvas();
            }
        }
    };
    //Resetting Overview canvas  
    CommandHandler.prototype.resetOverviewCanvas = function () {
        for (var _i = 0, _a = this.diagram.views; _i < _a.length; _i++) {
            var temp = _a[_i];
            var view = this.diagram.views[temp];
            if (!(view instanceof Diagram)) {
                var rect = document.getElementById(view.canvas.id + 'overviewrect');
                var x = Number(rect.getAttribute('x'));
                var y = Number(rect.getAttribute('y'));
                var width = Number(rect.getAttribute('width'));
                var height = Number(rect.getAttribute('height'));
                var attr = { x: x, y: y, width: Math.max(1, width), height: Math.max(1, height) };
                setAttributeHtml(rect, attr);
            }
        }
    };
    /** @private */
    CommandHandler.prototype.scaleSelectedItems = function (sx, sy, pivot) {
        var obj = this.diagram.selectedItems;
        if (this.state && !this.state.backup) {
            this.state.backup = {};
            this.state.backup.offsetX = obj.offsetX;
            this.state.backup.offsetY = obj.offsetY;
            this.state.backup.width = obj.width;
            this.state.backup.height = obj.height;
            this.state.backup.pivot = pivot;
        }
        obj = renderContainerHelper(this.diagram, obj) || obj;
        return this.diagram.scale(obj, sx, sy, pivot);
    };
    /** @private */
    CommandHandler.prototype.rotateSelectedItems = function (angle) {
        var obj = this.diagram.selectedItems;
        if (this.state && !this.state.backup) {
            this.state.backup = {};
            this.state.backup.angle = obj.rotateAngle;
        }
        obj = renderContainerHelper(this.diagram, obj) || obj;
        return this.diagram.rotate(obj, angle, undefined, true);
    };
    /** @private */
    CommandHandler.prototype.hasSelection = function () {
        return hasSelection(this.diagram);
    };
    /** @private */
    CommandHandler.prototype.isSelected = function (element) {
        return isSelected(this.diagram, element);
    };
    /**
     * initExpand is used for layout expand and collapse interaction
     */
    CommandHandler.prototype.initExpand = function (args) {
        var propName = 'isProtectedOnChange';
        var protectedChange = this.diagram[propName];
        this.diagram.protectPropertyChange(true);
        var node = (args.target || args.source);
        var oldValues = { isExpanded: node.isExpanded };
        node.isExpanded = !node.isExpanded;
        this.diagram.preventNodesUpdate = true;
        this.diagram.diagramActions |= DiagramAction.PreventIconsUpdate;
        this.diagram.nodePropertyChange(node, oldValues, { isExpanded: node.isExpanded });
        this.diagram.diagramActions = this.diagram.diagramActions & ~DiagramAction.PreventIconsUpdate;
        this.diagram.preventNodesUpdate = false;
        for (var _i = 0, _a = this.diagram.views; _i < _a.length; _i++) {
            var temp = _a[_i];
            var view = this.diagram.views[temp];
            if (!(view instanceof Diagram)) {
                this.diagram.refreshCanvasDiagramLayer(view);
            }
        }
        this.diagram.protectPropertyChange(protectedChange);
    };
    /** @private */
    CommandHandler.prototype.expandNode = function (node, diagram, canLayout) {
        var animation;
        //let objects: ILayout;
        var preventNodesUpdate = this.diagram.preventNodesUpdate;
        var expand = node.isExpanded;
        this.diagram.preventNodesUpdate = true;
        //Bug 883244: After expand and collapse the compex hierarchical layout, the connector are not rendered properly.
        // Removed the preventConnectorsUpdate property to update the connector properly while performing expand and collapse.
        // this.diagram.preventConnectorsUpdate = true;
        this.expandCollapse(node, expand, this.diagram, undefined);
        node.isExpanded = expand;
        var fixedNode = this.diagram.layout.fixedNode;
        this.diagram.layout.fixedNode = node.id;
        if ((this.diagram.diagramActions != DiagramAction.Render) && this.diagram.layoutAnimateModule && this.diagram.layout.enableAnimation && this.diagram.organizationalChartModule) {
            this.diagram.organizationalChartModule.isAnimation = true;
        }
        this.diagram.blazorActions |= BlazorAction.expandNode;
        var objects = {};
        if (!canLayout) {
            if (this.layoutAnimateModule && this.layoutAnimateModule.setIntervalObject.length > 0) {
                this.layoutAnimateModule.stopCurrentAnimation(this.objectStore[0], diagram, node);
                this.objectStore = [];
            }
            objects = this.diagram.doLayout();
            this.objectStore.push(objects);
        }
        this.canUpdateTemplate = false;
        this.diagram.blazorActions &= ~BlazorAction.expandNode;
        this.diagram.preventNodesUpdate = preventNodesUpdate;
        // this.diagram.preventConnectorsUpdate = false;
        if (this.diagram.layoutAnimateModule && this.diagram.organizationalChartModule && !canLayout) {
            this.diagram.allowServerDataBinding = false;
            this.layoutAnimateModule.expand(this.diagram.layout.enableAnimation, objects, node, this.diagram);
        }
        else {
            var arg = {
                element: cloneBlazorObject(clone(node)), state: (node.isExpanded) ? true : false
            };
            this.triggerEvent(DiagramEvent.expandStateChange, arg);
            //Bug 873119: Diagram throws error when setting isExpanded property as false with LineRouting injected.
            if (this.diagram.lineRoutingModule && this.diagram.constraints & DiagramConstraints.LineRouting && this.diagram.layout.type !== 'ComplexHierarchicalTree') {
                this.diagram.resetSegments();
            }
        }
        this.diagram.layout.fixedNode = fixedNode === '' ? '' : this.diagram.layout.fixedNode;
        return objects;
    };
    CommandHandler.prototype.getparentexpand = function (target, diagram, visibility, connector) {
        var boolean;
        for (var i = 0; i < target.inEdges.length; i++) {
            var newConnector = diagram.nameTable[target.inEdges[i]];
            var previousNode = diagram.nameTable[newConnector.sourceID];
            if (previousNode.isExpanded && !visibility && previousNode.id !== connector.sourceID && newConnector.visible) {
                return false;
            }
            else {
                boolean = true;
            }
        }
        return boolean;
    };
    /**
     * Setinterval and Clear interval for layout animation
     */
    /** @private */
    CommandHandler.prototype.expandCollapse = function (source, visibility, diagram, visitedNodes) {
        //937703 - Check if the node has already been visited
        if (!visitedNodes || visitedNodes.length === 0) {
            visitedNodes = [];
        }
        if (visitedNodes.some(function (node) { return node.id === source.id; })) {
            return; // Avoid infinite loop by returning early
        }
        // Mark the current node as visited
        visitedNodes.push(source);
        for (var i = 0; i < source.outEdges.length; i++) {
            var connector = diagram.nameTable[source.outEdges[i]];
            var target = diagram.nameTable[connector.targetID];
            var value = this.getparentexpand(target, diagram, visibility, connector);
            connector.visible = visibility;
            var oldValues = {
                visible: target.visible,
                style: { opacity: target.wrapper.style.opacity }
            };
            var newValues = {
                visible: target.visible,
                style: { opacity: target.wrapper.style.opacity }
            };
            if (value) {
                if (target.isExpanded) {
                    this.expandCollapse(target, visibility, diagram, visitedNodes);
                }
                target.visible = visibility;
                target.style.opacity = (this.diagram.layoutAnimateModule &&
                    this.diagram.layout.enableAnimation && visibility) ? 0.1 : target.style.opacity;
                diagram.nodePropertyChange(target, oldValues, newValues);
            }
            diagram.connectorPropertyChange(connector, oldValues, newValues);
        }
    };
    /**
     * @private
     */
    CommandHandler.prototype.updateNodeDimension = function (obj, rect) {
        if (obj instanceof Node) {
            obj.offsetX = rect.x + rect.width / 2;
            obj.offsetY = rect.y + rect.height / 2;
            obj.width = rect.width;
            obj.height = rect.height;
            obj.wrapper.children[0].canMeasurePath = true;
            this.diagram.nodePropertyChange(obj, {}, {
                width: rect.width, height: rect.height, offsetX: obj.offsetX,
                offsetY: obj.offsetY
            });
            if (this.diagram.mode !== 'SVG') {
                this.diagram.refreshDiagramLayer();
            }
        }
    };
    /**
     * @private
     */
    CommandHandler.prototype.updateConnectorPoints = function (obj, rect) {
        if (obj instanceof Connector && obj.type !== 'Bezier') {
            this.diagram.connectorPropertyChange(obj, {}, {
                targetPoint: obj.targetPoint
            });
            this.diagram.updateDiagramObject(obj);
        }
        else {
            this.diagram.connectorPropertyChange(obj, {}, { segments: obj.segments });
            this.diagram.updateDiagramObject(obj);
        }
    };
    /**
     * @private
     */
    CommandHandler.prototype.updateSelectedNodeProperties = function (object) {
        if (this.diagram.lineRoutingModule && (this.diagram.constraints & DiagramConstraints.LineRouting)) {
            var previousNodeObject = [];
            var previousConnectorObject = [];
            var updateNodeObject = [];
            var updateConnectorObject = [];
            var changeNodes = [];
            var changeConnectors = [];
            this.diagram.protectPropertyChange(true);
            var objects = [];
            var connectors = [];
            var actualObject = this.diagram.selectedObject.actualObject;
            var helperObject = this.diagram.selectedObject.helperObject;
            //EJ2-908138 - Redo not working after move and undo the multi nodes while  line routing enabled
            var undoElement = actualObject instanceof Selector ? cloneObject(actualObject) : undefined;
            if (helperObject && actualObject) {
                var offsetX = (helperObject.offsetX - actualObject.offsetX);
                var offsetY = (helperObject.offsetY - actualObject.offsetY);
                var width = (helperObject.width - actualObject.width);
                var height = (helperObject.height - actualObject.height);
                var rotateAngle = (helperObject.rotateAngle - actualObject.rotateAngle);
                if (this.diagram.selectedItems.nodes.length + this.diagram.selectedItems.connectors.length > 0) {
                    this.diagram.selectedItems.wrapper.rotateAngle = this.diagram.selectedItems.rotateAngle = helperObject.rotateAngle;
                }
                if (actualObject instanceof Node &&
                    actualObject.shape.type !== 'SwimLane' && !actualObject.isLane && !actualObject.isPhase && !actualObject.isHeader &&
                    !checkParentAsContainer(this.diagram, actualObject)) {
                    if (actualObject.offsetX !== actualObject.wrapper.offsetX || actualObject.offsetY !== actualObject.wrapper.offsetY ||
                        actualObject.width !== actualObject.wrapper.width || actualObject.height !== actualObject.wrapper.height ||
                        actualObject.rotateAngle !== actualObject.wrapper.rotateAngle) {
                        actualObject.offsetX += offsetX;
                        actualObject.offsetY += offsetY;
                        actualObject.width += width;
                        actualObject.height += height;
                        actualObject.rotateAngle += rotateAngle;
                        this.diagram.nodePropertyChange(actualObject, {}, {
                            offsetX: actualObject.offsetX, offsetY: actualObject.offsetY,
                            width: actualObject.width, height: actualObject.height, rotateAngle: actualObject.rotateAngle
                        }, false, true);
                    }
                    objects = this.diagram.spatialSearch.findObjects(actualObject.wrapper.outerBounds);
                }
                else if (actualObject instanceof Selector) {
                    //929543: To resize the multiselected nodes properly
                    var scaleWidth = helperObject.width / actualObject.width;
                    var scaleHeight = helperObject.height / actualObject.height;
                    var pivot = this.diagram.eventHandler.tool.getPivot(this.diagram.eventHandler.tool.corner);
                    if (this.diagram.eventHandler.tool.corner) {
                        for (var i = 0; i < actualObject.nodes.length; i++) {
                            var node = actualObject.nodes[parseInt(i.toString(), 10)];
                            var element = node.wrapper;
                            var refWrapper = actualObject.wrapper;
                            var x = refWrapper.offsetX - refWrapper.actualSize.width * refWrapper.pivot.x;
                            var y = refWrapper.offsetY - refWrapper.actualSize.height * refWrapper.pivot.y;
                            var refPoint = getPoint(x, y, refWrapper.actualSize.width, refWrapper.actualSize.height, refWrapper.rotateAngle, refWrapper.offsetX, refWrapper.offsetY, pivot);
                            this.diagram.commandHandler.scaleObject(scaleWidth, scaleHeight, refPoint, node, element, actualObject);
                        }
                    }
                    else {
                        for (var i = 0; i < actualObject.nodes.length; i++) {
                            var node = actualObject.nodes[i];
                            if (node instanceof Node && node.shape.type !== 'SwimLane' &&
                                !checkParentAsContainer(this.diagram, node) &&
                                !node.isLane
                                && !node.isPhase && !node.isHeader) {
                                node.offsetX += offsetX;
                                node.offsetY += offsetY;
                                node.width += width;
                                node.height += height;
                                node.rotateAngle += rotateAngle;
                                this.diagram.nodePropertyChange(node, {}, {
                                    offsetX: node.offsetX, offsetY: node.offsetY,
                                    width: node.width, height: node.height, rotateAngle: node.rotateAngle
                                });
                                objects = objects.concat(this.diagram.spatialSearch.findObjects(actualObject.wrapper.outerBounds));
                            }
                        }
                    }
                }
            }
            else {
                if (object instanceof Connector) {
                    objects.push(object);
                }
                else if (object instanceof Selector && object.connectors.length) {
                    objects = objects.concat(object.connectors);
                }
                //EJ2-909180 - Line routing does not take place when drag and drop from symbol Palatte
                if (object instanceof Selector) {
                    if (this.diagram.nodes.indexOf(object.nodes[0]) !== -1) {
                        var node = actualObject || object.nodes[0];
                        if (node instanceof Node && node.shape.type !== 'SwimLane' && !checkParentAsContainer(this.diagram, node)
                            && !node.isLane && !node.isPhase && !node.isHeader) {
                            objects = objects.concat(this.diagram.spatialSearch.findObjects(node.wrapper.outerBounds));
                        }
                    }
                }
            }
            for (var i = 0; i < objects.length; i++) {
                if (objects[i] instanceof Connector && connectors.indexOf(objects[i].id) === -1) {
                    connectors.push(objects[i].id);
                }
            }
            if (connectors.length > 0 || this.diagram.routedConnectors.length > 0) {
                this.diagram.lineRoutingModule.renderVirtualRegion(this.diagram, true);
            }
            this.diagram.lineRoutingModule.skipObstacleCheck = true;
            for (var i = 0; i < this.diagram.routedConnectors.length; i++) {
                var connector = this.diagram.nameTable[this.diagram.routedConnectors[i]];
                this.ReRouteConnector(connector);
            }
            this.diagram.lineRoutingModule.skipObstacleCheck = false;
            for (var i = 0; i < connectors.length; i++) {
                var connector = this.diagram.nameTable[connectors[i]];
                if (this.diagram.routedConnectors.indexOf(connector.id) === -1) {
                    this.ReRouteConnector(connector);
                }
            }
            this.diagram.routedConnectors = [];
            //EJ2-908138 - Redo not working after move and undo the multi nodes while  line routing enabled
            //EJ2-925499 - Undo/Redo not working after move multiselected nodes inside swimlane while line routing enabled
            if (helperObject && actualObject && undoElement && this.diagram.eventHandler.currentAction === 'Drag') {
                var canAddHistory = false;
                var nameTable = this.diagram.nameTable;
                for (var i = 0; i < actualObject.nodes.length; i++) {
                    if (!(nameTable[actualObject.nodes[i].parentId] && nameTable[actualObject.nodes[i].parentId].isLane)) {
                        canAddHistory = true;
                    }
                }
                if (canAddHistory) {
                    var obj = cloneObject(actualObject);
                    this.diagram.startGroupAction();
                    var entry = {
                        type: 'PositionChanged',
                        redoObject: cloneObject(obj), undoObject: undoElement, category: 'Internal'
                    };
                    this.diagram.addHistoryEntry(entry);
                    this.diagram.endGroupAction();
                }
            }
            this.updateSelector();
            this.diagram.protectPropertyChange(false);
        }
    };
    /** @private */
    CommandHandler.prototype.drawSelectionRectangle = function (x, y, width, height) {
        this.diagram.drawSelectionRectangle(x, y, width, height);
    };
    /** @private */
    CommandHandler.prototype.ReRouteConnector = function (connector) {
        if (connector instanceof Connector && connector.type === 'Orthogonal') {
            // EJ2-65876 - Exception occurs on line routing injection module
            //Bug 850195: Exception occurs due to line routing constraints enabled
            if (connector.sourceID && connector.targetID && connector.sourceID != connector.targetID && this.diagram.layout.type !== 'ComplexHierarchicalTree') {
                //EJ2-69573 - Excecption occurs when calling doLayout method with the lineRouting module 
                var sourceNode = this.diagram.getObject(connector.sourceID);
                var targetNode = this.diagram.getObject(connector.targetID);
                var connectorLengthX = targetNode.offsetX > sourceNode.offsetX
                    ? targetNode.wrapper.outerBounds.middleLeft.x - sourceNode.wrapper.outerBounds.middleRight.x
                    : sourceNode.wrapper.outerBounds.middleLeft.x - targetNode.wrapper.outerBounds.middleRight.x;
                var connectorLengthY = targetNode.offsetY > sourceNode.offsetY
                    ? targetNode.wrapper.outerBounds.topCenter.y - sourceNode.wrapper.outerBounds.bottomCenter.y
                    : sourceNode.wrapper.outerBounds.topCenter.y - targetNode.wrapper.outerBounds.bottomCenter.y;
                if (connectorLengthX > 30 || connectorLengthY > 30) {
                    this.diagram.lineRoutingModule.refreshConnectorSegments(this.diagram, connector, true);
                }
            }
        }
    };
    /** @private */
    CommandHandler.prototype.startGroupAction = function () {
        this.diagram.startGroupAction();
    };
    /** @private */
    CommandHandler.prototype.endGroupAction = function () {
        this.diagram.endGroupAction();
    };
    /** @private */
    CommandHandler.prototype.removeChildFromBPmn = function (child, newTarget, oldTarget) {
        var obj = this.diagram.nameTable[child.id] || child.nodes[0];
        if (oldTarget) {
            if ((obj) && obj.processId && obj.processId === oldTarget.wrapper.id) {
                var node = clone(obj);
                node.processId = obj.processId;
                // 908136: Node goes behind the subprocess and the connector connected to it is destroyed Issue Fix by commenting these lines
                // let edges: string[] = [];
                // edges = edges.concat((obj as Node).outEdges, (obj as Node).inEdges);
                // for (let i: number = edges.length - 1; i >= 0; i--) {
                //     const connector: ConnectorModel = this.diagram.nameTable[edges[i]];
                //     if (connector) {
                //         this.diagram.remove(connector);
                //     }
                // }
                var nodeCollection = (this.diagram.nameTable[obj.processId].shape.activity.subProcess.processes) || [];
                nodeCollection.splice(nodeCollection.indexOf((obj).id), 1);
                this.diagram.bpmnModule.removeChildFromBPMN(this.diagram.nameTable[obj.processId].wrapper, (obj).id, this.diagram);
                this.diagram.nameTable[(obj).id].processId = '';
                obj.offsetX = obj.wrapper.offsetX;
                obj.offsetY = obj.wrapper.offsetY;
                //909153: Removed the history entries as we have positionchange entry in mouseup
            }
        }
    };
    /** @private */
    CommandHandler.prototype.isDroppable = function (source, targetNodes) {
        var node = this.diagram.nameTable[source.id] || source.nodes[0];
        if (node instanceof Node) {
            if ((!isBlazor() && node.shape.shape === 'TextAnnotation')
            // ||(isBlazor() && (node.shape as DiagramShape).bpmnShape === 'TextAnnotation')
            ) {
                return true;
            }
            //848061 - Enabling BPMN Group Nodes to Function Like Subprocess Nodes
            if (targetNodes.shape.shape === 'Group') {
                targetNodes.shape.activity.subProcess.collapsed = false;
            }
            if (node && node.shape.type === 'Bpmn') {
                //905238 - Exception thrown while dropping BPMN shapes over a BPMN connector
                if ((node.processId === targetNodes.id) || (node.id === targetNodes.processId) ||
                    targetNodes.shape.type === 'Bpmn' && !(targetNodes instanceof Connector)
                        && targetNodes.shape.activity && targetNodes.shape.activity.subProcess
                        && targetNodes.shape.activity.subProcess.collapsed) {
                    return false;
                }
            }
            return true;
        }
        return false;
    };
    /**
     * @private
     */
    CommandHandler.prototype.renderHighlighter = function (args, connectHighlighter, source) {
        var bounds = new Rect();
        if ((args.target instanceof Node || args.target instanceof Connector) || (connectHighlighter && (args.source instanceof Node || args.source instanceof Connector))) {
            var tgt = connectHighlighter ? args.source : args.target;
            var tgtWrap = connectHighlighter ? args.sourceWrapper : args.targetWrapper;
            var target = this.findTarget(tgtWrap, tgt, source, true);
            var element = void 0;
            if (target instanceof BpmnSubEvent) {
                var portId = target.id;
                var node = args.target;
                var parent_8 = node.wrapper.children[0].children[0].children[2];
                for (var _i = 0, _a = parent_8.children; _i < _a.length; _i++) {
                    var child = _a[_i];
                    if (child.id === node.id + '_' + portId) {
                        element = child.children[0];
                        break;
                    }
                }
            }
            else {
                element = (target instanceof Node) ?
                    target.wrapper : connectHighlighter ? args.sourceWrapper : args.targetWrapper;
            }
            if (element && !(target instanceof Connector)) {
                this.diagram.renderHighlighter(element);
            }
        }
    };
    //additional events
    /** @private */
    CommandHandler.prototype.mouseOver = function (source, target, position) {
        //mouse over
        //returns whether the source can move over the target or not
        return true;
    };
    /**
     * @private
     */
    CommandHandler.prototype.snapPoint = function (startPoint, endPoint, tx, ty) {
        var obj = this.diagram.selectedItems;
        var point;
        var towardsLeft = endPoint.x < startPoint.x;
        var towardsTop = endPoint.y < startPoint.y;
        point = { x: tx, y: ty };
        var snappedPoint = point;
        if (this.snappingModule && (((obj.nodes.length > 0) && (obj.nodes[0].constraints & NodeConstraints.Drag)) || ((obj.connectors.length > 0) && (obj.connectors[0].constraints & ConnectorConstraints.Drag)))) {
            snappedPoint = this.diagram.snappingModule.snapPoint(this.diagram, obj, towardsLeft, towardsTop, point, startPoint, endPoint);
        }
        return snappedPoint;
    };
    /**
     * @private
     */
    CommandHandler.prototype.removeSnap = function () {
        if ((this.diagram.snapSettings.constraints & SnapConstraints.SnapToObject) && this.snappingModule) {
            this.snappingModule.removeGuidelines(this.diagram);
        }
    };
    /** @private */
    /**Bug(EJ2-62725): Exception occurs when drag and drop the connector inside the swimlane */
    CommandHandler.prototype.dropAnnotation = function (source, target) {
        if (source instanceof Node || source instanceof Selector) {
            var node = (source instanceof Node) ? source : source.nodes[0];
            if (this.diagram.bpmnModule && target.shape.type === 'Bpmn'
                && ((!isBlazor() && node.shape.shape === 'TextAnnotation')
                //  ||(isBlazor() && (node.shape as DiagramShape).bpmnShape === 'TextAnnotation')
                )) {
                var hasTarget = 'hasTarget';
                node[hasTarget] = target.id;
                node.shape.annotation.nodeId = target.id;
                if (!this.diagram.currentSymbol) {
                    this.diagram.addTextAnnotation(node.shape.annotation, target);
                    node.shape.annotation.nodeId = '';
                    this.diagram.remove(node);
                }
                this.diagram.refreshDiagramLayer();
            }
        }
    };
    /** @private */
    CommandHandler.prototype.drop = function (source, target, position) {
        //drop
        if (this.diagram.bpmnModule) {
            var nodesToProcess = (source instanceof Node) ? [source] : source.nodes;
            for (var i = 0; i < nodesToProcess.length; i++) {
                var node = nodesToProcess[i];
                //905238 - Exception thrown while dropping BPMN shapes over a BPMN connector
                if (node && node.shape.type === 'Bpmn' && target instanceof Node && target.shape.type === 'Bpmn'
                    && !(target instanceof Connector)) {
                    this.diagram.bpmnModule.dropBPMNchild(target, node, this.diagram);
                }
            }
            this.diagram.refreshDiagramLayer();
        }
    };
    /** @private */
    CommandHandler.prototype.addHistoryEntry = function (entry) {
        this.diagram.addHistoryEntry(entry);
    };
    /** @private */
    CommandHandler.prototype.align = function (objects, option, type) {
        if (objects.length > 0) {
            var i = 0;
            objects[0] = this.diagram.nameTable[objects[0].id] || objects[0];
            var bounds = (type === 'Object') ? getBounds(objects[0].wrapper) : this.diagram.selectedItems.wrapper.bounds;
            var undoObj = { nodes: [], connectors: [] };
            var redoObj = { nodes: [], connectors: [] };
            for (i = ((type === 'Object') ? (i + 1) : i); i < objects.length; i++) {
                var tx = 0;
                var ty = 0;
                objects[i] = this.diagram.nameTable[objects[i].id] || objects[i];
                var objectBounds = getBounds(objects[i].wrapper);
                if (option === 'Left') {
                    tx = bounds.left + objectBounds.width / 2 - objectBounds.center.x;
                }
                else if (option === 'Right') {
                    tx = bounds.right - objectBounds.width / 2 - objectBounds.center.x;
                }
                else if (option === 'Top') {
                    ty = bounds.top + objectBounds.height / 2 - objectBounds.center.y;
                }
                else if (option === 'Bottom') {
                    ty = bounds.bottom - objectBounds.height / 2 - objectBounds.center.y;
                }
                else if (option === 'Center') {
                    tx = bounds.center.x - objectBounds.center.x;
                }
                else if (option === 'Middle') {
                    ty = bounds.center.y - objectBounds.center.y;
                }
                undoObj = this.storeObject(undoObj, objects[i]);
                this.drag(objects[i], tx, ty);
                this.diagram.updateSelector();
                redoObj = this.storeObject(redoObj, objects[i]);
            }
            undoObj = clone(undoObj);
            redoObj = clone(redoObj);
            var entry = {
                type: 'Align', category: 'Internal',
                undoObject: cloneObject(undoObj), redoObject: cloneObject(redoObj)
            };
            this.addHistoryEntry(entry);
        }
    };
    /**
     * distribute method \
     *
     * @returns { void }     distribute method .\
     * @param {(NodeModel | ConnectorModel)[]} objects - provide the source value.
     * @param {SizingOptions} option - provide the target value.
     *
     * @private
     */
    CommandHandler.prototype.distribute = function (objects, option) {
        if (objects.length > 0) {
            var i = 0;
            //const j: number = 0;
            //const rect: Rect = new Rect();
            //const b: Rect[] = [];
            //let temp: NodeModel | ConnectorModel;
            var right = 0;
            var left = 0;
            var top_3 = 0;
            var bottom = 0;
            var center = 0;
            var middle = 0;
            var btt = 0;
            var rtl = 0;
            //const sum: number = 0;
            var undoSelectorObj = { nodes: [], connectors: [] };
            var redoSelectorObj = { nodes: [], connectors: [] };
            for (i = 0; i < objects.length; i++) {
                objects[i] = this.diagram.nameTable[objects[i].id] || objects[i];
            }
            objects = sort(objects, option);
            for (i = 1; i < objects.length; i++) {
                right = right + objects[i].wrapper.bounds.topRight.x - objects[i - 1].wrapper.bounds.topRight.x;
                left = left + objects[i].wrapper.bounds.topLeft.x - objects[i - 1].wrapper.bounds.topLeft.x;
                top_3 = top_3 + objects[i].wrapper.bounds.topRight.y - objects[i - 1].wrapper.bounds.topRight.y;
                bottom = bottom + objects[i].wrapper.bounds.bottomRight.y - objects[i - 1].wrapper.bounds.bottomRight.y;
                center = center + objects[i].wrapper.bounds.center.x - objects[i - 1].wrapper.bounds.center.x;
                middle = middle + objects[i].wrapper.bounds.center.y - objects[i - 1].wrapper.bounds.center.y;
                btt = btt + objects[i].wrapper.bounds.topRight.y - objects[i - 1].wrapper.bounds.bottomRight.y;
                rtl = rtl + objects[i].wrapper.bounds.middleLeft.x - objects[i - 1].wrapper.bounds.middleRight.x;
            }
            for (i = 1; i < objects.length - 1; i++) {
                var tx = 0;
                var ty = 0;
                var prev = getBounds(objects[i - 1].wrapper);
                var current = getBounds(objects[i].wrapper);
                if (option === 'Center') {
                    tx = prev.center.x - current.center.x + (center / (objects.length - 1));
                }
                else if (option === 'RightToLeft') {
                    // 926115: Distribute command RightToLeft option works incorrectly
                    tx = prev.middleRight.x - current.middleLeft.x + (rtl / (objects.length - 1));
                }
                else if (option === 'Right') {
                    tx = prev.topRight.x - current.topRight.x + (right / (objects.length - 1));
                }
                else if (option === 'Left') {
                    tx = prev.topLeft.x - current.topLeft.x + (left / (objects.length - 1));
                }
                else if (option === 'Middle') {
                    ty = prev.center.y - current.center.y + (middle / (objects.length - 1));
                }
                else if (option === 'Top') {
                    ty = prev.topRight.y - current.topRight.y + (top_3 / (objects.length - 1));
                }
                else if (option === 'Bottom') {
                    ty = prev.bottomRight.y - current.bottomRight.y + (bottom / (objects.length - 1));
                }
                else if (option === 'BottomToTop') {
                    ty = prev.bottomRight.y - current.topRight.y + (btt / (objects.length - 1));
                }
                undoSelectorObj = this.storeObject(undoSelectorObj, objects[i]);
                this.drag(objects[i], tx, ty);
                this.diagram.updateSelector();
                redoSelectorObj = this.storeObject(redoSelectorObj, objects[i]);
            }
            undoSelectorObj = clone(undoSelectorObj);
            redoSelectorObj = clone(redoSelectorObj);
            var entry = {
                type: 'Distribute', category: 'Internal',
                undoObject: cloneObject(undoSelectorObj), redoObject: cloneObject(redoSelectorObj)
            };
            this.addHistoryEntry(entry);
        }
    };
    /* eslint-enable */
    /**
     * sameSize method \
     *
     * @returns { void }     sameSize method .\
     * @param {(NodeModel | ConnectorModel)[]} objects - provide the source value.
     * @param {SizingOptions} option - provide the target value.
     *
     * @private
     */
    CommandHandler.prototype.sameSize = function (objects, option) {
        if (objects.length > 0) {
            var i = 0;
            //let pivot: PointModel;
            var pivot = { x: 0.5, y: 0.5 };
            objects[0] = this.diagram.nameTable[objects[0].id] || objects[0];
            var bounds = getBounds(objects[0].wrapper);
            var undoObject = { nodes: [], connectors: [] };
            var redoObject = { nodes: [], connectors: [] };
            for (i = 1; i < objects.length; i++) {
                objects[parseInt(i.toString(), 10)] = this.diagram.nameTable[objects[parseInt(i.toString(), 10)].id] || objects[0];
                var rect = getBounds(objects[parseInt(i.toString(), 10)].wrapper);
                var sw = 1;
                var sh = 1;
                if (option === 'Width') {
                    sw = bounds.width / rect.width;
                }
                else if (option === 'Height') {
                    sh = bounds.height / rect.height;
                }
                else if (option === 'Size') {
                    sw = bounds.width / rect.width;
                    sh = bounds.height / rect.height;
                }
                undoObject = this.storeObject(undoObject, objects[parseInt(i.toString(), 10)]);
                this.scale(objects[parseInt(i.toString(), 10)], sw, sh, pivot);
                redoObject = this.storeObject(redoObject, objects[parseInt(i.toString(), 10)]);
            }
            this.diagram.updateSelector();
            undoObject = clone(undoObject);
            redoObject = clone(redoObject);
            var entry = {
                type: 'Sizing', category: 'Internal',
                undoObject: cloneObject(undoObject), redoObject: cloneObject(redoObject)
            };
            this.addHistoryEntry(entry);
        }
    };
    CommandHandler.prototype.storeObject = function (selectorObject, obj) {
        if (obj instanceof Node) {
            selectorObject.nodes.push(clone(obj));
        }
        else {
            selectorObject.connectors.push(clone(obj));
        }
        return selectorObject;
    };
    /**
     * updatePanState method \
     *
     * @returns { any }     updatePanState method .\
     * @param {number} eventCheck - provide the eventCheck value.
     *
     * @private
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    CommandHandler.prototype.updatePanState = function (eventCheck) {
        if (eventCheck) {
            this.diagram.realActions = this.diagram.realActions | RealAction.PanInProgress;
        }
        else {
            this.diagram.dataBind();
            var diagramScrollSettings = this.diagram.scrollSettings;
            this.diagram.realActions = this.diagram.realActions & ~RealAction.PanInProgress;
            var Values = {
                VerticalOffset: diagramScrollSettings.verticalOffset, HorizontalOffset: diagramScrollSettings.horizontalOffset,
                ViewportHeight: diagramScrollSettings.viewPortHeight, ViewportWidth: diagramScrollSettings.viewPortWidth,
                CurrentZoom: diagramScrollSettings.currentZoom
            };
            var arg = {
                oldValue: Values,
                newValue: Values, source: this.diagram, panState: 'Completed'
            };
            this.triggerEvent(DiagramEvent.scrollChange, arg);
        }
    };
    /**
     * dataBinding method \
     *
     * @returns { void }     dataBinding method .\
     *
     * @private
     */
    CommandHandler.prototype.dataBinding = function () {
        this.diagram.dataBind();
    };
    CommandHandler.prototype.setBlazorDiagramProps = function (arg) {
        this.diagram.setBlazorDiagramProps(arg);
    };
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
    CommandHandler.prototype.scroll = function (scrollX, scrollY, focusPoint) {
        var panx = canPanX(this.diagram);
        var pany = canPanY(this.diagram);
        var canPan = true;
        this.diagram.pan((scrollX = panx ? scrollX : 0) * this.diagram.scroller.currentZoom, (scrollY = pany ? scrollY : 0) * this.diagram.scroller.currentZoom, focusPoint, canPan);
    };
    /**
     * drawHighlighter method \
     *
     * @returns { NodeModel | ConnectorModel }     drawHighlighter method .\
     * @param {IElement} element - provide the element value.
     *
     * @private
     */
    CommandHandler.prototype.drawHighlighter = function (element) {
        this.diagram.renderHighlighter(element.wrapper);
    };
    /**
     * removeHighlighter method \
     *
     * @returns { void }     removeHighlighter method .\
     *
     * @private
     */
    CommandHandler.prototype.removeHighlighter = function () {
        this.diagram.clearHighlighter();
    };
    /**
     * renderContainerHelper method \
     *
     * @returns { NodeModel | ConnectorModel }     renderContainerHelper method .\
     * @param {NodeModel | SelectorModel | ConnectorModel} node - provide the parent value.
     *
     * @private
     */
    CommandHandler.prototype.renderContainerHelper = function (node) {
        return renderContainerHelper(this.diagram, node);
    };
    /**
     * isParentAsContainer method \
     *
     * @returns { boolean }     isParentAsContainer method .\
     * @param {NodeModel} node - provide the parent value.
     * @param {boolean} isChild - provide the target value.
     *
     * @private
     */
    CommandHandler.prototype.isParentAsContainer = function (node, isChild) {
        return checkParentAsContainer(this.diagram, node, isChild);
    };
    /**
     * @returns { boolean } isParentAsContainer method .\
     * @param {NodeModel} node - provide the target Node value.
     * @private
     */
    CommandHandler.prototype.isTargetSubProcess = function (node) {
        if (node && node.shape && node.shape.type === 'Bpmn' && node.shape.activity && node.shape.activity.activity === 'SubProcess') {
            return true;
        }
        return false;
    };
    /**
     * dropChildToContainer method \
     *
     * @returns { void }     dropChildToContainer method .\
     * @param {NodeModel} parent - provide the parent value.
     * @param {NodeModel} node - provide the target value.
     *
     * @private
     */
    CommandHandler.prototype.dropChildToContainer = function (parent, node) {
        if (!(this.diagram.diagramActions & DiagramAction.PreventLaneContainerUpdate)) {
            addChildToContainer(this.diagram, parent, node);
            if (node.hasTextAnnotation) {
                for (var i = 0; i < node.outEdges.length; i++) {
                    var con = this.diagram.nameTable[node.outEdges[parseInt(i.toString(), 10)]];
                    if (con.isBpmnAnnotationConnector) {
                        var annotationNode = this.diagram.nameTable[con.targetID];
                        addChildToContainer(this.diagram, parent, annotationNode);
                    }
                }
            }
        }
    };
    /**
     * @returns { void }     updateLaneChildrenZindex method .\
     * @param {NodeModel} node - provide the node value.
     * @param {IElement} target - provide the target value.
     * @private
     */
    CommandHandler.prototype.updateLaneChildrenZindex = function (node, target) {
        var lowerIndexobject = this.findLeastIndexObject(node, target);
        var swimlane = this.diagram.nameTable[target.parentId];
        if (swimlane && swimlane.zIndex > lowerIndexobject.zIndex) {
            var layerIndex = this.diagram.layers.indexOf(this.diagram.getActiveLayer());
            var layerZIndexTable = this.diagram.layers[parseInt(layerIndex.toString(), 10)].zIndexTable;
            var tempTable = JSON.parse(JSON.stringify(layerZIndexTable));
            var startIndex = lowerIndexobject.zIndex;
            var endIndex = swimlane.zIndex;
            for (var i = endIndex; i >= startIndex; i--) {
                if (startIndex !== i) {
                    if (!layerZIndexTable[i - 1]) {
                        layerZIndexTable[i - 1] = layerZIndexTable[parseInt(i.toString(), 10)];
                        this.diagram.nameTable[layerZIndexTable[i - 1]].zIndex = i;
                        delete layerZIndexTable[parseInt(i.toString(), 10)];
                    }
                    else {
                        //bringing the objects forward
                        layerZIndexTable[parseInt(i.toString(), 10)] = layerZIndexTable[i - 1];
                        this.diagram.nameTable[layerZIndexTable[parseInt(i.toString(), 10)]].zIndex = i;
                    }
                }
                else {
                    var tempIndex = this.swapZIndexObjects(endIndex, layerZIndexTable, swimlane.id, tempTable);
                }
            }
            if (this.diagram.mode === 'SVG') {
                this.moveSvgNode(target.parentId, lowerIndexobject.id);
                this.updateNativeNodeIndex(target.parentId, lowerIndexobject.id);
            }
            else {
                this.diagram.refreshCanvasLayers();
            }
        }
    };
    CommandHandler.prototype.findLeastIndexConnector = function (edges, target, index) {
        for (var i = 0; i < edges.length; i++) {
            var connector = this.diagram.nameTable[edges[parseInt(i.toString(), 10)]];
            if (index.zIndex > connector.zIndex) {
                index = connector;
            }
        }
        return index;
    };
    CommandHandler.prototype.findLeastIndexObject = function (node, target) {
        var lowerIndexobject = node;
        if (node instanceof Node) {
            lowerIndexobject = this.findLeastIndexConnector(node.inEdges, target, lowerIndexobject);
            lowerIndexobject = this.findLeastIndexConnector(node.outEdges, target, lowerIndexobject);
        }
        return lowerIndexobject;
    };
    /**
     * checkSelection method \
     *
     * @returns { void }     checkSelection method .\
     * @param {SelectorModel} selector - provide the source value.
     * @param {string} corner - provide the target value.
     *
     * @private
     */
    CommandHandler.prototype.checkSelection = function (selector, corner) {
        var node; // let wrapper: GridPanel; let child: Container; let index: number; let shape: SwimLaneModel;
        if (selector.nodes.length === 1 && selector.connectors.length === 0) {
            if (checkParentAsContainer(this.diagram, selector.nodes[0], true)) {
                node = (selector.nodes[0].shape === 'SwimLane') ? selector.nodes[0] :
                    this.diagram.nameTable[selector.nodes[0].parentId];
                var child = selector.nodes[0];
                if (node.shape.type === 'SwimLane') {
                    var orientation_1 = (node.shape.orientation === 'Horizontal') ? true : false;
                    if ((child.isPhase && ((orientation_1 && corner === 'ResizeSouth') || (!orientation_1 && corner === 'ResizeEast'))) ||
                        (child.isLane && ((orientation_1 && corner === 'ResizeEast') || (!orientation_1 && corner === 'ResizeSouth')))) {
                        swimLaneSelection(this.diagram, node, corner);
                    }
                }
                else if (node.container.type === 'Grid') {
                    if (((node.container.orientation === 'Horizontal' && child.rowIndex === 1) ||
                        (node.container.orientation === 'Vertical' && child.rowIndex > 0 && child.columnIndex > 0))) {
                        if (corner === 'ResizeSouth') {
                            for (var i = 0; i < this.diagram.nodes.length; i++) {
                                var obj = this.diagram.nodes[parseInt(i.toString(), 10)];
                                if (obj.rowIndex === node.rows.length - 1 && obj.columnIndex === 0) {
                                    this.select(obj);
                                    break;
                                }
                            }
                        }
                    }
                    else {
                        if (corner === 'ResizeEast') {
                            for (var i = 0; i < this.diagram.nodes.length; i++) {
                                var obj = this.diagram.nodes[parseInt(i.toString(), 10)];
                                if (obj.rowIndex === 1 && obj.columnIndex === node.columns.length - 1) {
                                    this.select(obj);
                                    break;
                                }
                            }
                        }
                    }
                }
            }
            else {
                swimLaneSelection(this.diagram, selector.nodes[0], corner);
            }
        }
    };
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
    CommandHandler.prototype.zoom = function (scale, scrollX, scrollY, focusPoint) {
        this.diagram.scroller.zoom(scale, scrollX * this.diagram.scroller.currentZoom, scrollY * this.diagram.scroller.currentZoom, focusPoint);
    };
    return CommandHandler;
}());
export { CommandHandler };
