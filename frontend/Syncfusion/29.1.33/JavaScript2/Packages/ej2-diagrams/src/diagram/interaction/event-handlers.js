/* eslint-disable jsdoc/require-returns */
/* eslint-disable jsdoc/require-param */
/* eslint-disable valid-jsdoc */
/* eslint-disable no-case-declarations */
import { Browser } from '@syncfusion/ej2-base';
import { Point } from '../primitives/point';
import { Container } from '../core/containers/container';
import { Connector } from '../objects/connector';
import { NodeDrawingTool, ConnectorDrawingTool, TextDrawingTool, FreeHandTool } from './tool';
import { PolygonDrawingTool, PolyLineDrawingTool, FixedUserHandleTool } from './tool';
import { Native, Node, Lane, Phase, UmlClassAttribute, UmlClassMethod, UmlEnumerationMember } from '../objects/node';
import { SelectTool, MoveTool, ResizeTool, RotateTool, ConnectTool, ExpandTool, LabelTool, ZoomPanTool } from './tool';
import { LabelDragTool, LabelResizeTool, LabelRotateTool } from './tool';
import { ConnectorEditing } from './connector-editing';
import { Selector } from '../objects/node';
import { findToolToActivate, isSelected, getCursor, contains } from './actions';
import { DiagramAction, KeyModifiers, Keys, DiagramEvent, DiagramTools, RendererAction, DiagramConstraints, PortConstraints } from '../enum/enum';
import { BlazorAction, ScrollActions } from '../enum/enum';
import { isPointOverConnector, findObjectType, insertObject, getObjectFromCollection, getTooltipOffset, findParentInSwimlane, findPort } from '../utility/diagram-util';
import { getObjectType, getInOutConnectPorts, removeChildNodes, cloneBlazorObject, checkPort } from '../utility/diagram-util';
import { canZoomPan, canDraw, canDrag, canZoomTextEdit, canVitualize, canPreventClearSelection, canSingleSelect, canMultiSelect } from './../utility/constraints-util';
import { selectionHasConnector } from '../utility/diagram-util';
import { canMove, canEnablePointerEvents, canSelect, canEnableToolTip } from './../utility/constraints-util';
import { canOutConnect, canInConnect, canPortInConnect, canPortOutConnect, canAllowDrop, canUserInteract, defaultTool } from './../utility/constraints-util';
import { updateTooltip } from '../objects/tooltip';
import { PortVisibility, NodeConstraints, ConnectorConstraints, AnnotationConstraints, RealAction } from '../enum/enum';
import { addTouchPointer, measureHtmlText, getAdornerLayerSvg } from '../utility/dom-util';
import { TextElement } from '../core/elements/text-element';
import { Size } from '../primitives/size';
import { cloneObject as clone, cloneObject } from './../utility/base-util';
import { Rect } from '../primitives/rect';
import { identityMatrix, rotateMatrix, transformPointByMatrix } from './../primitives/matrix';
import { removeRulerMarkers, drawRulerMarkers, getRulerSize, updateRuler } from '../ruler/ruler';
import { canContinuousDraw, canDrawOnce } from '../utility/constraints-util';
import { getFunction, cornersPointsBeforeRotation } from '../utility/base-util';
import { ShapeAnnotation, PathAnnotation } from '../objects/annotation';
import { updateCanvasBounds, checkChildNodeInContainer, checkParentAsContainer, removeChildInContainer } from './container-interaction';
import { moveChildInStack, renderStackHighlighter } from './container-interaction';
import { updateSwimLaneObject } from '../utility/swim-lane-util';
import { getConnectors, updateHeaderMaxWidth, laneInterChanged, updateConnectorsProperties } from '../utility/swim-lane-util';
import { DiagramHtmlElement } from '../core/elements/html-element';
import { getPoint, PathElement, randomId } from '../index';
import { isBlazor } from '@syncfusion/ej2-base';
import { PathPort, PointPort } from '../objects/port';
import { Overview } from '../../overview/overview';
import { ConnectorFixedUserHandle, NodeFixedUserHandle } from '../objects/fixed-user-handle';
import { UserHandle } from '../interaction/selector';
/**
 * This module handles the mouse and touch events
 */
var DiagramEventHandler = /** @class */ (function () {
    /** @private */
    function DiagramEventHandler(diagram, commandHandler) {
        this.currentAction = 'None';
        this.previousAction = 'None';
        this.previousTarget = null;
        /** @private */
        this.touchArgs = undefined;
        /**   @private  */
        this.focus = false;
        this.isBlocked = false;
        this.isMouseDown = false;
        this.inAction = false;
        this.doingAutoScroll = false;
        this.diagram = null;
        this.objectFinder = null;
        this.tool = null;
        this.eventArgs = null;
        this.previousElement = null;
        this.isKeyUp = true;
        this.keyCount = 0;
        this.isNudgeKey = false;
        this.commandObj = {};
        this.keyArgs = {};
        this.diagram = diagram;
        this.objectFinder = new ObjectFinder();
        this.commandHandler = commandHandler;
    }
    Object.defineProperty(DiagramEventHandler.prototype, "action", {
        get: function () {
            return this.currentAction;
        },
        set: function (action) {
            if (action !== this.currentAction) {
                if (this.currentAction === 'PortDraw') {
                    this.diagram.tool &= ~DiagramTools.DrawOnce;
                    //EJ2-70550 - Connector disconnected from source and target while dragging mutliple selected element
                    if (this.diagram.currentDrawingObject) {
                        this.diagram.currentDrawingObject = null;
                    }
                    if (this.tool) {
                        this.tool.mouseUp({ position: this.currentPosition });
                    }
                    this.tool = null;
                }
                if (action === 'Rotate' || action === 'LabelRotate') {
                    this.diagram.diagramCanvas.classList.add('e-diagram-rotate');
                }
                else if (this.currentAction === 'Rotate' || this.currentAction === 'LabelRotate') {
                    this.diagram.diagramCanvas.classList.remove('e-diagram-rotate');
                }
                this.currentAction = action;
                //Ej2-26204 - Exception occurs when remove method called without mouse Interaction
                if (this.currentAction !== 'None' && this.currentAction !== 'Select' &&
                    !(this.diagram.diagramActions & DiagramAction.TextEdit) &&
                    !(this.currentPosition && this.commandHandler.isUserHandle(this.currentPosition)) && !(this.currentAction === 'FixedUserHandle')) {
                    this.diagram.diagramActions = this.diagram.diagramActions | DiagramAction.ToolAction;
                }
                else {
                    this.diagram.diagramActions = this.diagram.diagramActions & ~DiagramAction.ToolAction;
                }
                this.diagram.setCursor(this.diagram.getCursor(action, this.inAction));
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DiagramEventHandler.prototype, "blocked", {
        get: function () {
            return this.isBlocked;
        },
        set: function (blocked) {
            this.isBlocked = blocked;
            if (this.blocked) {
                this.diagram.setCursor('not-allowed');
            }
            else {
                this.diagram.setCursor(this.diagram.getCursor(this.action, this.inAction));
            }
        },
        enumerable: true,
        configurable: true
    });
    /** @private */
    DiagramEventHandler.prototype.getMousePosition = function (e) {
        var touchArg;
        var offsetX;
        var offsetY;
        if (e.type.indexOf('touch') !== -1) {
            touchArg = e;
            offsetX = touchArg.changedTouches[0].clientX;
            offsetY = touchArg.changedTouches[0].clientY;
        }
        else {
            offsetX = e.clientX;
            offsetY = e.clientY;
        }
        offsetX = this.diagram.modifyClientOffset(offsetX);
        offsetY = this.diagram.modifyClientOffset(offsetY);
        var position = new Size();
        position = getRulerSize(this.diagram);
        var boundingRect = this.diagram.element.getBoundingClientRect();
        this.diagram.modifyBounds(boundingRect);
        offsetX = offsetX + this.diagram.diagramCanvas.scrollLeft - boundingRect.left - position.width;
        offsetY = offsetY + this.diagram.diagramCanvas.scrollTop - boundingRect.top - position.height;
        offsetX /= this.diagram.scroller.transform.scale;
        offsetY /= this.diagram.scroller.transform.scale;
        offsetX -= this.diagram.scroller.transform.tx;
        offsetY -= this.diagram.scroller.transform.ty;
        return { x: offsetX, y: offsetY };
    };
    /**
     * @private
     */
    DiagramEventHandler.prototype.windowResize = function (evt) {
        var _this = this;
        if (this.resizeTo) {
            clearTimeout(this.resizeTo);
        }
        this.resizeTo = setTimeout(function () {
            _this.updateViewPortSize(_this.diagram.element);
        }, 300);
        return false;
    };
    /**
     * @private
     */
    DiagramEventHandler.prototype.updateViewPortSize = function (element) {
        var container = document.getElementById(element.id);
        if (container) {
            var bounds = container.getBoundingClientRect();
            this.diagram.modifyBounds(bounds);
            this.diagram.scroller.setViewPortSize(bounds.width, bounds.height);
            var position = new Size();
            position = getRulerSize(this.diagram);
            var width = this.diagram.getSizeValue(this.diagram.width, position.width);
            var height = this.diagram.getSizeValue(this.diagram.height, position.height);
            this.diagram.diagramCanvas.style.width = width;
            this.diagram.diagramCanvas.style.height = height;
            this.diagram.scroller.setSize();
            this.diagram.transformLayers();
            if (this.diagram.rulerSettings.showRulers) {
                updateRuler(this.diagram);
            }
            if (this.diagram.views.length > 1) {
                //884316 - updating overview after window resize
                for (var _i = 0, _a = this.diagram.views; _i < _a.length; _i++) {
                    var temp = _a[_i];
                    var view = this.diagram.views["" + temp];
                    if ((view instanceof Overview)) {
                        //Calling onproperty change method to update overview.
                        view.onPropertyChanged({ sourceID: view.sourceID }, {});
                    }
                }
            }
        }
    };
    /** @private */
    DiagramEventHandler.prototype.canHideResizers = function () {
        return ((this.tool instanceof MoveTool || this.tool instanceof RotateTool) && this.isMouseDown);
    };
    /** @private */
    DiagramEventHandler.prototype.updateCursor = function () {
        if ((this.diagram.selectedItems.nodes.length === 1 || this.diagram.selectedItems.connectors.length === 1)) {
            var list = [];
            list = list.concat(this.diagram.selectedItems.nodes, this.diagram.selectedItems.connectors);
            // Bug fix - EJ2-44495 -Node does not gets selected on slight movement of mouse when drag constraints disabled for node
            this.blocked = (this.eventArgs && this.eventArgs.source && !canMove(this.eventArgs.source)) ? false :
                (this.isMouseDown && list.length === 1 && this.tool instanceof SelectTool && !canMove(list[0]));
        }
    };
    DiagramEventHandler.prototype.isForeignObject = function (target, isTextBox) {
        var foreignobject = target;
        if (foreignobject) {
            while (foreignobject.parentNode !== null) {
                if (typeof foreignobject.className === 'string' &&
                    ((!isTextBox && foreignobject.className.indexOf('foreign-object') !== -1) ||
                        (isTextBox && foreignobject.className.indexOf('e-diagram-text-edit') !== -1))) {
                    return foreignobject;
                }
                else {
                    foreignobject = foreignobject.parentNode;
                }
            }
        }
        return null;
    };
    DiagramEventHandler.prototype.isMetaKey = function (evt) {
        //EJ2-55887 - added the beow code to perform pinch zoom in mac os and windows while pinch zoom all browser return ctrl key as true.
        if (evt.type === 'mousewheel') {
            return evt.ctrlKey;
        }
        else {
            return navigator.platform.match('Mac') ? evt.metaKey : evt.ctrlKey;
        }
    };
    DiagramEventHandler.prototype.renderUmlHighLighter = function (args) {
        this.diagram.commandHandler.removeStackHighlighter();
        var node = this.diagram.selectedItems.nodes[0];
        if (node && node.container && node.container.type === 'Stack' && node.shape.type === 'UmlClassifier') {
            var bound = node.wrapper.bounds;
            if (!bound.containsPoint(this.currentPosition)) {
                // eslint-disable-next-line max-len
                var objects = this.diagram.findObjectsUnderMouse({ x: this.currentPosition.x - 20, y: this.currentPosition.y });
                var target = this.diagram.findObjectUnderMouse(objects, this.action, this.inAction);
                if (target && target.parentId && (target.parentId === node.id)) {
                    // eslint-disable-next-line max-len
                    var isVertical = this.diagram.nameTable[target.parentId].container.orientation === 'Vertical';
                    renderStackHighlighter(target.wrapper, isVertical, args.position, this.diagram, true);
                }
            }
        }
    };
    DiagramEventHandler.prototype.isDeleteKey = function (key, value) {
        return (navigator.platform.match('Mac') && key === 'Backspace' && value === 'delete');
    };
    DiagramEventHandler.prototype.isMouseOnScrollBar = function (evt) {
        var x = evt.offsetX;
        var y = evt.offsetY;
        var diagramCanvas = this.diagram.diagramCanvas;
        var height = diagramCanvas.offsetHeight;
        var width = diagramCanvas.offsetWidth;
        var topLeft;
        var topRight;
        var bottomLeft;
        var bottomRight;
        var bounds;
        if (height < diagramCanvas.scrollHeight) {
            //default scrollbar width in browser is '17pixels'.
            topLeft = { x: (width - 17), y: 0 };
            topRight = { x: width, y: 0 };
            bottomLeft = { x: (width - 17), y: height };
            bottomRight = { x: width, y: height };
            bounds = Rect.toBounds([topLeft, topRight, bottomLeft, bottomRight]);
            // EJ2-64563-Added below code to calculate the bounds x and y value if vertical offset != 0
            if (this.diagram.scroller.verticalOffset !== 0) {
                bounds.x = bounds.x - this.diagram.scroller.horizontalOffset;
                bounds.y = bounds.y - this.diagram.scroller.verticalOffset;
            }
            if (bounds.containsPoint({ x: x, y: y })) {
                return true;
            }
        }
        if (width < diagramCanvas.scrollWidth) {
            topLeft = { x: 0, y: (height - 17) };
            topRight = { x: width, y: (height - 17) };
            bottomLeft = { x: 0, y: height };
            bottomRight = { x: width, y: height };
            bounds = Rect.toBounds([topLeft, topRight, bottomLeft, bottomRight]);
            // EJ2-64563-Added below code to calculate the bounds x and y value if horizontal offset != 0
            if (this.diagram.scroller.horizontalOffset !== 0) {
                bounds.x = bounds.x - this.diagram.scroller.horizontalOffset;
                bounds.y = bounds.y - this.diagram.scroller.verticalOffset;
            }
            if (bounds.containsPoint({ x: x, y: y })) {
                return true;
            }
        }
        return false;
    };
    /**   @private  */
    DiagramEventHandler.prototype.updateVirtualization = function () {
        var _this = this;
        var delay = 50;
        //let removeObjectInterval: Object;
        var removeObjectInterval = setInterval(function (args) {
            _this.diagram.removeVirtualObjects(removeObjectInterval);
        }, delay);
        setTimeout(function () {
            _this.diagram.deleteVirtualObject = true;
        }, delay);
    };
    DiagramEventHandler.prototype.checkPreviousAction = function () {
        if (this.action !== this.previousAction && this.diagram.selectedItems.userHandles.length) {
            for (var i = 0; i < this.diagram.selectedItems.userHandles.length; i++) {
                if (this.previousAction && this.diagram.selectedItems.userHandles[parseInt(i.toString(), 10)]) {
                    this.checkUserHandleEvent(DiagramEvent.onUserHandleMouseLeave);
                    this.previousAction = 'None';
                }
            }
        }
        if (this.action !== this.previousAction) {
            // If the mouse leaves the fixed user handle, the tooltip is closed
            this.checkFixedUserHandleEvent(DiagramEvent.onFixedUserHandleMouseLeave, this.targetItem, this.previousTarget);
            this.previousTarget = null;
            this.targetItem = null;
        }
    };
    DiagramEventHandler.prototype.checkUserHandleEvent = function (eventName) {
        if (this.diagram.selectedItems && this.diagram.selectedItems.userHandles.length > 0) {
            var currentAction = (eventName === DiagramEvent.onUserHandleMouseLeave) ? this.previousAction : this.action;
            var arg = { element: undefined };
            for (var i = 0; i < this.diagram.selectedItems.userHandles.length; i++) {
                if ((currentAction === this.diagram.selectedItems.userHandles[parseInt(i.toString(), 10)].name) ||
                    (eventName === DiagramEvent.onUserHandleMouseUp && currentAction === 'Select')) {
                    arg.element = this.diagram.selectedItems.userHandles[parseInt(i.toString(), 10)];
                    this.userHandle(eventName, i, arg, null);
                }
            }
        }
    };
    DiagramEventHandler.prototype.userHandle = function (eventName, i, arg, targetItem) {
        if (eventName === DiagramEvent.onUserHandleMouseEnter || eventName === DiagramEvent.onFixedUserHandleMouseEnter) {
            this.previousAction = this.action;
            // EJ2-32213- Added the below code to check whether the userhandle has tooltip content.
            // If userhandle has tooltip content then we open the tooltip based on the userhandle shape
            if (arg.element.tooltip && arg.element.tooltip.openOn === 'Auto' && arg.element.tooltip.content !== '') {
                updateTooltip(this.diagram, arg.element);
                var targetEle = void 0;
                if (arg.element.pathData) {
                    if (eventName === DiagramEvent.onUserHandleMouseEnter) {
                        targetEle = document.getElementById(this.diagram.selectedItems.userHandles[parseInt(i.toString(), 10)].name + '_userhandle');
                    }
                    else if (eventName === DiagramEvent.onFixedUserHandleMouseEnter) {
                        targetEle = document.getElementById(targetItem.id + '_' + targetItem.fixedUserHandles[parseInt(i.toString(), 10)].id + '_groupElement');
                    }
                }
                else if (arg.element.source) {
                    targetEle = document.getElementById(this.diagram.selectedItems.userHandles[parseInt(i.toString(), 10)].name + '_image');
                }
                else if (arg.element.content) {
                    targetEle = document.getElementById(this.diagram.selectedItems.userHandles[parseInt(i.toString(), 10)].name + '_shape_native_element');
                }
                else {
                    targetEle = document.getElementById(this.diagram.selectedItems.userHandles[parseInt(i.toString(), 10)].name + '_shape_html_element');
                }
                //892828: Flickering of tooltip while hovering userhandle
                if (arg.element.tooltip.openOn === 'Auto' && (arg.element !== this.isUserHandleHover)) {
                    this.isUserHandleHover = arg.element;
                    this.diagram.tooltipObject.open(targetEle);
                }
            }
            this.diagram.triggerEvent(eventName, arg);
        }
        if (eventName === DiagramEvent.onUserHandleMouseDown) {
            this.userHandleObject = this.diagram.selectedItems.userHandles[parseInt(i.toString(), 10)].name;
            this.diagram.triggerEvent(eventName, arg);
        }
        else if (eventName === DiagramEvent.onFixedUserHandleMouseDown) {
            this.diagram.triggerEvent(eventName, arg);
        }
        if (eventName === DiagramEvent.onUserHandleMouseUp) {
            var element = document.getElementById(this.diagram.selectedItems.userHandles[parseInt(i.toString(), 10)].name + '_userhandle');
            if (this.commandHandler.isUserHandle(this.currentPosition)
                && element && element.id === this.userHandleObject + '_userhandle') {
                //EJ2-838423 -onUserHandleMouseUp event triggers multiple times
                this.diagram.triggerEvent(eventName, arg);
            }
        }
        else if (eventName === DiagramEvent.onFixedUserHandleMouseUp) {
            this.diagram.triggerEvent(eventName, arg);
        }
        if (eventName === DiagramEvent.onUserHandleMouseLeave || eventName === DiagramEvent.onFixedUserHandleMouseLeave) {
            if (this.diagram.tooltipObject && this.diagram.tooltipObject.openOn !== 'Custom') {
                this.isUserHandleHover = null;
                this.diagram.tooltipObject.close();
            }
            this.diagram.triggerEvent(eventName, arg);
        }
    };
    // In the method, verify the fixed user handle and manage the opening and closing of the tooltip according to mouse events
    DiagramEventHandler.prototype.checkFixedUserHandleEvent = function (eventName, targetItem, wrapper) {
        if (targetItem && targetItem.fixedUserHandles.length > 0) {
            var arg = { element: undefined };
            var userid = void 0;
            var currentAction = void 0;
            for (var i = 0; i < targetItem.fixedUserHandles.length; i++) {
                userid = targetItem.fixedUserHandles[parseInt(i.toString(), 10)].id;
                if (wrapper && wrapper.id && (wrapper.id.indexOf(userid) > -1)) {
                    currentAction = userid;
                    this.previousTarget = wrapper;
                    this.targetItem = targetItem;
                }
                if (currentAction === targetItem.fixedUserHandles[parseInt(i.toString(), 10)].id) {
                    arg.element = targetItem.fixedUserHandles[parseInt(i.toString(), 10)];
                    this.userHandle(eventName, i, arg, targetItem);
                }
            }
        }
    };
    DiagramEventHandler.prototype.mouseDown = function (evt) {
        var _this = this;
        //Bug 913785: Tooltip for node is not showing when touch and hold on node in mobile device.
        if (evt.type === 'touchstart') {
            this.timeOutTapHold = setTimeout(function () {
                if (_this.action === 'Select' || _this.action === 'Drag') {
                    _this.mouseMove(evt, undefined);
                }
            }, 500);
        }
        // EJ2-57541 - Added the below code to check whether diagram tool is instance of node drawing tool or connector drawing tool.
        // If node or connector drawing tool means then we have returned without perform any operation.
        // 923532: Event 'Completed' state not triggered with multiple button click Action
        if ((this.inAction === true && ((this.tool) instanceof NodeDrawingTool || this.tool instanceof ConnectorDrawingTool)) ||
            (this.inAction === true && (evt.buttons && (evt.buttons & (evt.buttons - 1)) !== 0))) {
            return;
        }
        this.focus = true;
        //let touches: TouchList;
        var touches = evt.touches;
        var isSymblDragging = document.getElementsByClassName('e-dragclone')[0] ? true : false;
        if (this.isMouseOnScrollBar(evt) && !isSymblDragging) {
            this.isScrolling = true;
            evt.preventDefault();
            return;
        }
        // commanded by gowtham- unwanted cloning of selectedItems
        // if (isBlazor()) {
        //     this.commandHandler.oldSelectedObjects = cloneObject(this.diagram.selectedItems);
        // }
        this.checkFixedUserHandleEvent(DiagramEvent.onFixedUserHandleMouseDown, this.targetItem, this.previousTarget);
        this.checkUserHandleEvent(DiagramEvent.onUserHandleMouseDown);
        if (!this.checkEditBoxAsTarget(evt) && (canUserInteract(this.diagram)) ||
            (canZoomPan(this.diagram) && !defaultTool(this.diagram))) {
            if (this.action === 'Select' || this.action === 'Drag') {
                this.diagram.updatePortVisibility(this.hoverElement, PortVisibility.Hover, true);
            }
            if (((this.tool instanceof PolygonDrawingTool || this.tool instanceof PolyLineDrawingTool)
                && (evt.button === 2 || evt.buttons === 2))) {
                // eslint-disable-next-line
                var arg = {
                    element: cloneBlazorObject(this.diagram), position: cloneBlazorObject(this.currentPosition),
                    count: evt.buttons, actualObject: cloneBlazorObject(this.eventArgs.actualObject),
                    button: (evt.button === 0) ? 'Left' : (evt.button === 1) ? 'Middle' : 'Right'
                };
                this.inAction = false;
                this.tool.mouseUp(this.eventArgs);
            }
            else if (((this.inAction === true) && this.isMouseDown === true &&
                (this.tool instanceof PolygonDrawingTool || this.tool instanceof PolyLineDrawingTool))) {
                this.isMouseDown = true;
                this.eventArgs = {};
                this.getMouseEventArgs(this.currentPosition, this.eventArgs);
                this.eventArgs.position = this.currentPosition;
                this.tool.mouseDown(this.eventArgs);
            }
            else {
                this.isMouseDown = true;
                this.currentPosition = this.prevPosition = this.getMousePosition(evt);
                this.eventArgs = {};
                if (this.diagram.textEditing && !this.isMouseOnScrollBar(evt)) {
                    this.diagram.endEdit();
                    this.diagram.textEditing = false;
                    // EJ2-57743 - Added below code to refresh the diagram layer after the annotation gets edited in canvas mode.
                    if (this.diagram.mode === 'Canvas' && this.diagram.scroller.currentZoom !== 1) {
                        this.diagram.refreshDiagramLayer();
                    }
                }
                var targetObject = this.getTargetElement();
                this.action = this.diagram.findActionToBeDone(targetObject.obj, targetObject.sourceElement, this.currentPosition, targetObject.target);
                //work around - correct it
                var ctrlKey = this.isMetaKey(evt);
                if (ctrlKey && evt.shiftKey && this.diagram.connectorEditingToolModule) {
                    this.action = 'SegmentEnd';
                    //Bug 892496: Unable to unselect selected node using CTRL+Click when zoompan is enabled.
                    //Added this condition whether single select or multi select is enabled in diagram tool.
                }
                else if ((ctrlKey || evt.shiftKey) && (canSingleSelect(this.diagram) || canMultiSelect(this.diagram))) {
                    this.action = 'Select';
                }
                this.tool = this.diagram.getTool(this.action);
                if (!this.tool) {
                    this.action = 'Select';
                    this.tool = this.diagram.getTool(this.action);
                }
                this.getMouseEventArgs(this.currentPosition, this.eventArgs);
                if (ctrlKey || evt.shiftKey) {
                    var info = (ctrlKey && evt.shiftKey) ? { ctrlKey: ctrlKey, shiftKey: evt.shiftKey } : { ctrlKey: true };
                    this.eventArgs.info = info;
                }
                this.eventArgs.position = this.currentPosition;
                //834641 -  Support to unselect the diagram element that is already selected
                var prevSelectedNode = this.diagram.selectedItems.nodes;
                this.tool.mouseDown(this.eventArgs);
                if (this.diagram.selectedItems.canToggleSelection && prevSelectedNode
                    && this.diagram.selectedItems.nodes && this.tool instanceof MoveTool) {
                    for (var i = 0; i < prevSelectedNode.length; i++) {
                        if (prevSelectedNode[parseInt(i.toString(), 10)].id
                            !== this.diagram.selectedItems.nodes[parseInt(i.toString(), 10)].id) {
                            this.isSwimlaneSelected = true;
                        }
                    }
                }
                this.initialEventArgs = { source: this.eventArgs.source, sourceWrapper: this.eventArgs.sourceWrapper };
                this.initialEventArgs.position = this.currentPosition;
                this.initialEventArgs.info = this.eventArgs.info;
                this.inAction = false;
                if (evt.type === 'touchstart') {
                    if (touches && touches.length >= 2) {
                        this.touchStartList = addTouchPointer(this.touchStartList, evt, touches);
                    }
                    if (!touches) {
                        evt.preventDefault();
                    }
                }
            }
        }
        if (!this.isForeignObject(evt.target) && !this.isForeignObject(evt.target, true) && (!touches)) {
            evt.preventDefault();
        }
    };
    /**   @private  */
    DiagramEventHandler.prototype.mouseMoveExtend = function (e, obj) {
        if (this.tool instanceof PolygonDrawingTool || this.tool instanceof PolyLineDrawingTool) {
            this.tool.mouseMove(this.eventArgs);
        }
        if (this.diagram.scrollSettings.canAutoScroll) {
            this.checkAutoScroll(e);
        }
        else {
            if (!this.blocked) {
                (this.tool.mouseMove(this.eventArgs));
            }
        }
        if (this.eventArgs.target) {
            this.hoverElement = this.eventArgs.target;
        }
        var isNode = (this.eventArgs.target instanceof Node || this.eventArgs.target instanceof Connector)
            && (obj instanceof Node || obj instanceof Connector) ? false : true;
        if (this.tool instanceof ConnectTool) {
            this.diagram.updatePortVisibility((this.hoverElement instanceof Node || this.hoverElement instanceof Connector)
                ? this.hoverElement : this.hoverNode, PortVisibility.Connect | PortVisibility.Hover, isNode);
        }
        if (this.hoverElement instanceof Node
            && this.hoverNode instanceof Node && this.hoverNode && this.hoverNode.id !== this.hoverElement.id) {
            this.diagram.updatePortVisibility(this.hoverNode, PortVisibility.Connect | PortVisibility.Hover, true);
        }
        if (this.hoverElement instanceof Connector && (this.hoverElement.ports.length > 0)) {
            this.diagram.updatePortVisibility(this.hoverElement, PortVisibility.Connect | PortVisibility.Hover, true);
        }
        // 890089: Unintended Port Visibility Issue Fix
        // Updating port visibility based on the previous hoverElement
        if (this.previousElement instanceof Node && this.hoverElement && (this.previousElement.id !== this.hoverElement.id)) {
            this.diagram.updatePortVisibility(this.previousElement, PortVisibility.Connect | PortVisibility.Hover, true);
        }
        this.previousElement = this.hoverElement;
        // Updating tooltip content on mouse relative mode
        if (this.diagram.tooltip.content !== '') {
            this.hoverElement = null;
        }
        this.hoverNode = isNode ? null : obj;
    };
    /** @private */
    DiagramEventHandler.prototype.checkAction = function (obj) {
        if (this.action === 'LabelSelect' && this.eventArgs.sourceWrapper &&
            (this.eventArgs.sourceWrapper instanceof TextElement || this.eventArgs.sourceWrapper instanceof DiagramHtmlElement)) {
            var annotation = this.commandHandler.findTarget(this.eventArgs.sourceWrapper, this.eventArgs.source);
            if (!isSelected(this.diagram, annotation, false, this.eventArgs.sourceWrapper) && canMove(annotation)) {
                this.action = 'LabelDrag';
                this.tool = this.getTool(this.action);
                this.tool.mouseDown(this.initialEventArgs);
            }
        }
        else if (canMove(obj) && canSelect(obj) && this.initialEventArgs &&
            this.initialEventArgs.source && this.action === 'Select') {
            if (!isSelected(this.diagram, this.eventArgs.source, false) &&
                this.eventArgs.source instanceof Selector) {
                this.getMouseEventArgs(this.currentPosition, this.eventArgs);
            }
            if (!(obj instanceof Connector) || (obj instanceof Connector &&
                !(contains(this.currentPosition, obj.sourcePoint, obj.hitPadding) ||
                    contains(this.currentPosition, obj.targetPoint, obj.hitPadding)))) {
                this.action = 'Drag';
            }
            this.tool = this.getTool(this.action);
            this.tool.mouseDown(this.initialEventArgs);
        }
    };
    DiagramEventHandler.prototype.isSwimlaneElements = function (obj) {
        if (obj && (obj.isLane || obj.isPhase || obj.isHeader)) {
            return false;
        }
        else {
            return true;
        }
    };
    //To decide whether to show tooltip on touch long press
    DiagramEventHandler.prototype.canShowTouchTooltip = function (evt) {
        if (evt.type === 'touchstart') {
            if ((this.diagram.tool & DiagramTools.SingleSelect) && (this.diagram.tool & DiagramTools.ZoomPan)) {
                this.isMouseDown = false;
                return true;
            }
        }
        return false;
    };
    /* tslint:disable */
    /** @private */
    DiagramEventHandler.prototype.mouseMove = function (e, touches) {
        this.focus = true;
        //Bug 914365: Node is not resizable using touch interaction
        if (e.type === 'touchmove') {
            this.touchArgs = { target: e.target, type: 'touchmove' };
        }
        if (this.isScrolling) {
            e.preventDefault();
            return;
        }
        if (canUserInteract(this.diagram) || (canZoomPan(this.diagram) && !defaultTool(this.diagram))) {
            this.currentPosition = this.getMousePosition(e);
            var objects = this.diagram.findObjectsUnderMouse(this.currentPosition);
            var obj = this.diagram.findObjectUnderMouse(objects, this.action, this.inAction);
            drawRulerMarkers(this.diagram, this.currentPosition);
            var force = false;
            var target = void 0;
            if (e.type === 'touchmove') {
                touches = e.touches;
                if (touches && touches.length > 1) {
                    this.touchMoveList = addTouchPointer(this.touchMoveList, e, touches);
                    if (this.action !== 'PinchZoom') {
                        force = true;
                    }
                }
            }
            if (Point.equals(this.currentPosition, this.prevPosition) === false || this.inAction || this.canShowTouchTooltip(e)) {
                if (this.isMouseDown === false || force) {
                    this.eventArgs = {};
                    var sourceElement = null;
                    var tooltipTarget = void 0;
                    if (obj !== null) {
                        sourceElement = this.diagram.findElementUnderMouse(obj, this.currentPosition, this.diagram);
                        //834842-Exception/error occurs when hovering on the connector
                        //tooltiptarget to be found only if the source element is not null
                        if (sourceElement) {
                            tooltipTarget = this.commandHandler.findTarget(sourceElement, obj);
                        }
                        //908569: Node Tooltip Flickers when hovering on Annotation
                        //If the annotation does not have tooltip content, set the tooltip target as an object
                        if (tooltipTarget instanceof ShapeAnnotation || tooltipTarget instanceof PathAnnotation) {
                            if (!(tooltipTarget.tooltip && tooltipTarget.tooltip.content !== '')) {
                                tooltipTarget = obj;
                            }
                        }
                        if (tooltipTarget !== this.hoverElement) {
                            var content_1 = this.getContent();
                            if (this.hoverElement && this.hoverElement.tooltip.openOn === 'Auto' && content_1 !== '') {
                                this.elementLeave();
                            }
                            this.diagram.updatePortVisibility(this.hoverElement, PortVisibility.Hover, true);
                            if (obj instanceof Node) {
                                this.hoverNode = obj;
                            }
                            var canResetElement = true;
                            if (!this.isSwimlaneElements(obj)
                                && (this.hoverElement && this.isSwimlaneElements(this.hoverElement))) {
                                canResetElement = false;
                            }
                            this.hoverElement = canResetElement ? obj : this.hoverElement;
                            //EJ2-62120 - Provide tooltip support for ports - to set hoverelement as PathElement if hovered on ports in Node
                            var portElement = null;
                            var portTarget = void 0;
                            portElement = this.diagram.findElementUnderMouse(obj, this.currentPosition, this.diagram);
                            if (portElement instanceof PathElement) {
                                portTarget = this.commandHandler.findTarget(portElement, obj);
                                if ((portTarget instanceof PointPort || portTarget instanceof PathPort)
                                    && this.hoverElement.constraints & PortConstraints.ToolTip) {
                                    this.hoverElement = portTarget;
                                }
                            }
                            //839511: Tooltip support for annotation - to set hoverelement as TextElement if hovered on annotation in Node/Connector
                            var annotationTarget = void 0;
                            if (portElement instanceof TextElement) {
                                annotationTarget = this.commandHandler.findTarget(portElement, obj);
                                if ((annotationTarget instanceof ShapeAnnotation || annotationTarget instanceof PathAnnotation)
                                    && annotationTarget.constraints & AnnotationConstraints.Tooltip) {
                                    this.hoverElement = annotationTarget;
                                }
                            }
                            if (canResetElement) {
                                this.elementEnter(this.currentPosition, false);
                            }
                            else {
                                this.hoverElement = obj;
                            }
                        }
                        // EJ2-66418 - set tooltip relativeMode as mouse
                        // Updating the tooltip position based on Mouse move
                        else if (this.hoverElement) {
                            if (this.hoverElement === tooltipTarget && this.hoverElement.tooltip.content && this.diagram.tooltipObject !== undefined && this.hoverElement.tooltip.relativeMode === 'Mouse') {
                                this.setTooltipOffset(this.currentPosition);
                            }
                        }
                        if (sourceElement) {
                            target = this.commandHandler.findTarget(sourceElement, obj);
                        }
                    }
                    this.action = this.diagram.findActionToBeDone(obj, sourceElement, this.currentPosition, target);
                    this.checkFixedUserHandleEvent(DiagramEvent.onFixedUserHandleMouseEnter, obj, sourceElement);
                    this.checkUserHandleEvent(DiagramEvent.onUserHandleMouseEnter);
                    this.checkPreviousAction();
                    this.getMouseEventArgs(this.currentPosition, this.eventArgs);
                    this.tool = this.getTool(this.action);
                    this.mouseEvents();
                    if (this.tool instanceof ConnectorDrawingTool ||
                        this.tool instanceof PolyLineDrawingTool ||
                        this.tool instanceof PolygonDrawingTool) {
                        this.tool.mouseMove(this.eventArgs);
                    }
                    else if (touches && this.tool instanceof ZoomPanTool) {
                        this.tool.mouseDown(this.eventArgs);
                    }
                    this.updateCursor();
                    this.renderUmlHighLighter(this.eventArgs);
                    var isNode = false;
                    if (!(this.hoverElement && (!(this.tool instanceof ZoomPanTool))
                        && (obj instanceof Node && this.isSwimlaneElements(obj)) &&
                        (this.diagram.selectedItems.nodes.length === 0 || !isSelected(this.diagram, this.hoverElement)))
                        && (!(this.hoverElement instanceof Connector))) {
                        isNode = true;
                    }
                    if (!(this.hoverElement && (!(this.tool instanceof ZoomPanTool))
                        && (obj instanceof Connector) &&
                        (this.diagram.selectedItems.connectors.length === 0 || !isSelected(this.diagram, this.hoverElement)))
                        && (!(this.hoverElement instanceof Node))) {
                        isNode = true;
                    }
                    this.diagram.updatePortVisibility(this.hoverElement, PortVisibility.Hover, isNode);
                    var content = this.getContent();
                    if (obj === null && this.hoverElement && this.hoverElement.tooltip.openOn === 'Auto' && content) {
                        this.hoverElement = null;
                        this.elementLeave();
                    }
                    force = false;
                }
                else {
                    this.eventArgs.position = this.currentPosition;
                    if (this.action === 'Drag' && !isSelected(this.diagram, this.eventArgs.source, false) &&
                        this.eventArgs.source instanceof Selector) {
                        this.getMouseEventArgs(this.currentPosition, this.eventArgs);
                    }
                    this.mouseEvents();
                    if (e.ctrlKey || e.shiftKey) {
                        var info = (e.ctrlKey && e.shiftKey) ? { ctrlKey: e.ctrlKey, shiftKey: e.shiftKey } : { ctrlKey: true };
                        this.eventArgs.info = info;
                    }
                    this.checkAction(obj);
                    var padding = this.getConnectorPadding(this.eventArgs);
                    this.getMouseEventArgs(this.currentPosition, this.eventArgs, this.eventArgs.source, padding);
                    this.updateCursor();
                    this.inAction = true;
                    this.initialEventArgs = null;
                    if (this.action === 'Drag' || this.action === 'Rotate') {
                        this.diagram.diagramActions = this.diagram.diagramActions | DiagramAction.Interactions;
                    }
                    //Bug 863516: Overview is not synced with diagram content while zoom-out the diagram.
                    //Checking page bounds before and after dragging node, and updating the overview rect if the page bounds modified after the drag.
                    var preDragBounds = this.diagram.scroller.getPageBounds();
                    this.mouseMoveExtend(e, obj);
                    var postDragBounds = this.diagram.scroller.getPageBounds();
                    if (obj && (preDragBounds.width !== postDragBounds.width ||
                        preDragBounds.height !== postDragBounds.height ||
                        preDragBounds.x !== postDragBounds.x ||
                        preDragBounds.y !== postDragBounds.y)) {
                        if (this.diagram.views && this.diagram.views.overview) {
                            var overview = this.diagram.views.overview;
                            overview.updateView(overview);
                        }
                    }
                }
                this.prevPosition = this.currentPosition;
                if (!this.isForeignObject(e.target, true)) {
                    e.preventDefault();
                }
            }
        }
    };
    /* tslint:enable */
    DiagramEventHandler.prototype.getContent = function () {
        var isPrivateTooltip = ((this.hoverElement instanceof Node)
            && this.hoverElement.constraints & NodeConstraints.Tooltip) ||
            ((this.hoverElement instanceof Connector) && this.hoverElement.constraints & ConnectorConstraints.Tooltip)
            || ((this.hoverElement instanceof PointPort || this.hoverElement instanceof PathPort)
                && this.hoverElement.constraints & PortConstraints.ToolTip) ||
            ((this.hoverElement instanceof ShapeAnnotation || this.hoverElement instanceof PathAnnotation)
                && this.hoverElement.constraints & AnnotationConstraints.Tooltip);
        var node = this.hoverElement;
        var childNode;
        if (node instanceof Node && node.children && node.children.length > 0) {
            childNode = this.findIntersectChild(node);
        }
        var content = isPrivateTooltip ? this.hoverElement.tooltip.content :
            this.diagram.tooltip.content;
        content = childNode ? childNode.tooltip.content : content;
        return content;
    };
    DiagramEventHandler.prototype.findIntersectChild = function (node) {
        var childNode;
        var rect = new Rect(this.currentPosition.x, this.currentPosition.y, 8, 8);
        for (var i = 0; i < node.children.length; i++) {
            childNode = this.diagram.getObject(node.children[parseInt(i.toString(), 10)]);
            if (childNode.wrapper.outerBounds.intersects(rect)) {
                return childNode;
            }
        }
        return null;
    };
    DiagramEventHandler.prototype.checkAutoScroll = function (e) {
        var autoScrollPosition = this.startAutoScroll(e);
        if (!autoScrollPosition && this.doingAutoScroll) {
            this.doingAutoScroll = false;
            clearInterval(this.timeOutValue);
        }
        else if (autoScrollPosition) {
            if ((this.tool instanceof NodeDrawingTool || this.tool instanceof ConnectorDrawingTool
                || this.tool instanceof MoveTool || this.tool instanceof ResizeTool
                || this.tool instanceof SelectTool || this.tool instanceof ConnectTool) && this.inAction) {
                // eslint-disable-next-line @typescript-eslint/no-this-alias
                var diagram_1 = this;
                var delay_1 = this.diagram.scrollSettings.autoScrollFrequency;
                if (delay_1 < 10 || isNaN(delay_1)) {
                    delay_1 = 100;
                }
                if (this.diagram.scrollSettings.canAutoScroll && autoScrollPosition && !this.doingAutoScroll) {
                    this.doingAutoScroll = true;
                    this.timeOutValue = setInterval(function (args) {
                        diagram_1.doAutoScroll(autoScrollPosition, e, delay_1);
                    }, delay_1);
                }
            }
        }
        else {
            this.blocked = !(this.tool.mouseMove(this.eventArgs));
        }
    };
    /* tslint:disable */
    /** @private */
    DiagramEventHandler.prototype.mouseUp = function (evt) {
        clearTimeout(this.timeOutTapHold);
        //Bug 914365: Node is not resizable using touch interaction
        this.touchArgs = undefined;
        this.diagram.diagramRenderer.touchMove = undefined;
        //EJ2-849817-Dropping nodes in swimlane does not consider as child in angular
        if (this.eventArgs && this.eventArgs.target && this.eventArgs.target !== this.hoverNode
            && this.eventArgs.target !== this.lastObjectUnderMouse) {
            this.hoverNode = this.eventArgs.target;
            this.lastObjectUnderMouse = this.eventArgs.target;
        }
        //Bug 881512: Wrapping of the connector annotation at run time not working properly.
        //To wrap the connector annotation text after the node rotated or dragged.
        var updateAnnotation = false;
        if (this.tool instanceof MoveTool || this.tool instanceof RotateTool) {
            updateAnnotation = true;
        }
        this.checkFixedUserHandleEvent(DiagramEvent.onFixedUserHandleMouseUp, this.targetItem, this.previousTarget);
        this.checkUserHandleEvent(DiagramEvent.onUserHandleMouseUp);
        if (this.diagram.mode === 'SVG' && canVitualize(this.diagram)) {
            this.updateVirtualization();
        }
        var prevSelectedNodes = this.diagram.selectedItems.nodes;
        var prevSelectedConnectors = this.diagram.selectedItems.connectors;
        var unSelectLaneObj;
        this.diagram.previousSelectedObject = null;
        this.diagram.diagramRenderer.rendererActions =
            this.diagram.removeConstraints(this.diagram.diagramRenderer.rendererActions, RendererAction.DrawSelectorBorder);
        var touches = evt.touches;
        if (this.isScrolling) {
            this.isScrolling = false;
            evt.preventDefault();
            return;
        }
        if (!this.checkEditBoxAsTarget(evt) && (canUserInteract(this.diagram))
            || (canZoomPan(this.diagram) && !defaultTool(this.diagram))) {
            if (this.tool && (!(this.tool instanceof PolygonDrawingTool || this.tool instanceof PolyLineDrawingTool) ||
                ((this.tool instanceof PolygonDrawingTool || this.tool instanceof PolyLineDrawingTool)
                    && evt.detail === 2))) {
                if (!this.isForeignObject(evt.target) && this.isMouseDown) {
                    document.getElementById(this.diagram.element.id + 'content').focus();
                }
                if (!this.inAction && evt.which !== 3) {
                    if (this.action === 'Drag') {
                        this.action = 'Select';
                        var oldSelectedValue = (this.diagram.selectedItems.nodes.concat(this.diagram.selectedItems.connectors));
                        var objects = this.diagram.findObjectsUnderMouse(this.currentPosition);
                        var obj = this.diagram.findObjectUnderMouse(objects, this.action, this.inAction);
                        var isMultipleSelect = true;
                        if ((!evt.ctrlKey && this.isMouseDown
                            && (this.diagram.selectedItems.nodes.length + this.diagram.selectedItems.connectors.length) > 1)
                            && evt.which === 1 && !canPreventClearSelection(this.diagram.diagramActions)) {
                            isMultipleSelect = false;
                            this.commandHandler.clearSelection();
                        }
                        if (!isSelected(this.diagram, obj) || (!isMultipleSelect)) {
                            this.commandHandler.selectObjects([obj], undefined, oldSelectedValue);
                            //834641 - Support to unselect the diagram element that is already selected
                            if (this.diagram.selectedItems.canToggleSelection) {
                                var selectedObj = this.diagram.selectedItems.nodes;
                                if (selectedObj) {
                                    if (selectedObj[0].parentObj instanceof Lane) {
                                        unSelectLaneObj = true;
                                    }
                                }
                                else if (this.diagram.selectedItems.connectors.length > 0) {
                                    unSelectLaneObj = true;
                                }
                            }
                        }
                    }
                }
                var avoidDropChildren = false;
                var history_1 = this.updateContainerProperties();
                var isGroupAction = void 0;
                this.addUmlNode();
                this.inAction = false;
                this.isMouseDown = false;
                //912163- Restricting node selection
                if (this.diagram.selectedObject.helperObject) {
                    isGroupAction = this.updateContainerBounds();
                }
                if (this.tool && (this.tool.prevPosition || this.tool instanceof LabelTool)) {
                    this.eventArgs.position = this.currentPosition;
                    var padding = this.getConnectorPadding(this.eventArgs);
                    this.getMouseEventArgs(this.currentPosition, this.eventArgs, this.eventArgs.source, padding);
                    var ctrlKey = this.isMetaKey(evt);
                    if (ctrlKey || evt.shiftKey) {
                        var info = (ctrlKey && evt.shiftKey) ? { ctrlKey: ctrlKey, shiftKey: evt.shiftKey } :
                            { ctrlKey: true };
                        this.eventArgs.info = info;
                    }
                    if (this.diagram.diagramActions & DiagramAction.Interactions) {
                        this.diagram.diagramActions = this.diagram.diagramActions & ~DiagramAction.Interactions;
                    }
                    this.eventArgs.clickCount = evt.detail;
                    if (this.diagram.selectedObject.helperObject && (this.tool instanceof MoveTool || this.tool instanceof ResizeTool)) {
                        if (this.diagram.selectedObject.actualObject &&
                            this.diagram.selectedObject.actualObject.parentId !== '') {
                            var parentNode = this.diagram.getObject(this.diagram.selectedObject.actualObject.parentId);
                            if (parentNode && parentNode.isLane) {
                                this.commandHandler.isContainer = true;
                            }
                        }
                        avoidDropChildren = this.diagram.lineRoutingModule
                            && this.diagram.nameTable['helper'] && this.eventArgs.target && this.eventArgs.target.isLane
                            && ((this.eventArgs.source instanceof Selector && this.eventArgs.source.nodes.length > 0
                                && this.eventArgs.source.nodes[0].parentId === '') || (this.eventArgs.source.parentId === ''));
                        if (avoidDropChildren) {
                            this.diagram.diagramActions = this.diagram.diagramActions | DiagramAction.PreventLaneContainerUpdate;
                        }
                        this.tool.mouseUp(this.eventArgs, history_1.isPreventHistory);
                    }
                    else {
                        //834641 - Support to unselect the diagram element that is already selected
                        if (this.diagram.selectedItems.canToggleSelection) {
                            var isGroupObj = void 0;
                            var isMultiSelect = void 0;
                            if (this.diagram.selectedItems.nodes.length > 0) {
                                for (var i = 0; i < this.diagram.selectedItems.nodes.length; i++) {
                                    var swimlane = (this.diagram.selectedItems.nodes[parseInt(i.toString(), 10)].isLane
                                        || this.diagram.selectedItems.nodes[parseInt(i.toString(), 10)].isPhase);
                                    if (!swimlane) {
                                        if ((!(this.diagram.selectedItems.nodes[parseInt(i.toString(), 10)].parentObj instanceof Lane
                                            || this.diagram.selectedItems.nodes[parseInt(i.toString(), 10)].parentObj instanceof Phase))) {
                                            isGroupObj = this.diagram.selectedItems.nodes[parseInt(i.toString(), 10)].parentId !== '' ? true : false;
                                        }
                                    }
                                }
                            }
                            var currSelectedNodes = this.diagram.selectedItems.nodes;
                            for (var i = 0; i < prevSelectedNodes.length; i++) {
                                if ((prevSelectedNodes.length > 1 && currSelectedNodes[0].id
                                    === prevSelectedNodes[parseInt(i.toString(), 10)].id) || prevSelectedConnectors.length > 0) {
                                    isMultiSelect = true;
                                }
                            }
                            if (!this.isSwimlaneSelected && !unSelectLaneObj && !isMultiSelect && this.tool instanceof MoveTool &&
                                this.currentAction === 'Select' && (!isGroupObj || this.diagram.selectedItems.connectors.length > 0)) {
                                this.commandHandler.clearSelection(true);
                            }
                        }
                        this.isSwimlaneSelected = false;
                        this.tool.mouseUp(this.eventArgs);
                        if (this.diagram.checkMenu && (window.navigator.userAgent.indexOf('Linux') !== -1 || window.navigator.userAgent.indexOf('X11') !== -1)) {
                            if (!evt.pageY && (evt instanceof TouchEvent) && evt.changedTouches) {
                                window.getSelection().removeAllRanges();
                                this.diagram.contextMenuModule.contextMenu.open(evt.changedTouches[0].pageY, evt.changedTouches[0].pageX, this.diagram.element);
                                evt.preventDefault();
                            }
                            else {
                                this.diagram.contextMenuModule.contextMenu.open(evt.pageY, evt.pageX, this.diagram.element);
                            }
                            this.diagram.checkMenu = false;
                        }
                    }
                    if (history_1.hasStack) {
                        this.diagram.endGroupAction();
                    }
                }
                if (isGroupAction) {
                    this.diagram.endGroupAction();
                }
                this.updateContainerBounds(true);
                if (this.eventArgs.clickCount !== 2) {
                    this.commandHandler.updateSelectedNodeProperties(this.eventArgs.source);
                    if (avoidDropChildren) {
                        this.diagram.diagramActions = this.diagram.diagramActions & ~DiagramAction.PreventLaneContainerUpdate;
                        var nodes = this.eventArgs.source instanceof Selector
                            ? this.eventArgs.source.nodes : [this.eventArgs.source];
                        if (nodes) {
                            for (var i = 0; i < nodes.length; i++) {
                                if (!nodes[parseInt(i.toString(), 10)].container) {
                                    this.commandHandler.dropChildToContainer(this.eventArgs.target, nodes[parseInt(i.toString(), 10)]);
                                    this.commandHandler.renderContainerHelper(nodes[parseInt(i.toString(), 10)]);
                                }
                            }
                        }
                    }
                }
                if (this.diagram.selectedObject && this.diagram.selectedObject.helperObject) {
                    //Bug 884946: Undo redo not working for swimlane child node's label edit.
                    //committed to remove the diagram actions public method when actual object is inside swimlane.
                    var isInsideLane = this.isSwimlaneChild(this.diagram.selectedObject.actualObject);
                    //isSwimlaneChildHelper is used to check whether the helper object is child's helper of lane's helper. if it is lane's helper then we should not remove the DiagramAction.PublicMethod from diagram actions.
                    //If we remove the DiagramAction.PublicMethod from diagram actions then undo redo will not work properly after dropping child from diagram to swimlane.
                    var isSwimlaneChildHelper = this.diagram.selectedObject.actualObject &&
                        this.diagram.selectedObject.actualObject.width === this.diagram.selectedObject.helperObject.width &&
                        this.diagram.selectedObject.actualObject.height === this.diagram.selectedObject.helperObject.height;
                    this.diagram.remove(this.diagram.selectedObject.helperObject);
                    if (this.commandHandler.isTargetSubProcess(this.diagram.selectedObject.actualObject) && this.diagram.selectedObject.actualObject.parentId === '') {
                        this.swapProcessChildInDom(this.diagram.element.id + '_diagramLayer', this.diagram.selectedObject.actualObject);
                    }
                    this.diagram.selectedObject = { helperObject: undefined, actualObject: undefined };
                    // EJ2-42605 - Annotation undo redo not working properly if the line routing is enabled committed by sivakumar sekar
                    // committed to remove the diagram actions public method when line routing is enabled
                    // eslint-disable-next-line
                    if ((this.diagram.diagramActions & DiagramAction.PublicMethod) && (this.diagram.constraints & DiagramConstraints.LineRouting) || (isInsideLane && isSwimlaneChildHelper)) {
                        this.diagram.diagramActions = this.diagram.diagramActions & ~DiagramAction.PublicMethod;
                    }
                }
                this.blocked = false;
                if (this.hoverElement) {
                    var portVisibility = PortVisibility.Connect;
                    if (isSelected(this.diagram, this.hoverElement)) {
                        portVisibility |= PortVisibility.Hover;
                    }
                    this.diagram.updatePortVisibility(this.hoverElement, portVisibility, true);
                    this.hoverElement = null;
                }
                this.touchStartList = null;
                this.touchMoveList = null;
                if (!(this.tool instanceof TextDrawingTool)) {
                    this.tool = null;
                }
            }
            if (!touches) {
                evt.preventDefault();
            }
            this.diagram.currentDrawingObject = undefined;
            var selector = this.diagram.selectedItems;
            var disbleRenderSelector = false;
            if (this.commandHandler.isUserHandle(this.currentPosition)) {
                if (this.isForeignObject(evt.target)) {
                    disbleRenderSelector = true;
                }
            }
            if (!this.inAction && selector.wrapper && selector.userHandles.length > 0 && !disbleRenderSelector) {
                this.diagram.renderSelector(true);
            }
            if (!this.inAction && !this.diagram.currentSymbol && this.eventArgs) {
                /**
                 *
                 * EJ2-45543 Provide Event support to notify the port click
                 */
                var targetObject = this.getTargetElement();
                //909624: click event for fixed user handle notifies node as its element.
                var arg = {
                    element: (targetObject.target instanceof PointPort || targetObject.target instanceof PathPort ||
                        targetObject.target instanceof UserHandle || targetObject.target instanceof NodeFixedUserHandle ||
                        targetObject.target instanceof ConnectorFixedUserHandle)
                        ? targetObject.target : cloneBlazorObject(this.eventArgs.source) || cloneBlazorObject(this.diagram),
                    position: cloneBlazorObject(this.eventArgs.position), count: evt.detail,
                    actualObject: cloneBlazorObject(this.eventArgs.actualObject),
                    button: (evt.button === 0) ? 'Left' : (evt.button === 1) ? 'Middle' : 'Right'
                };
                //Removed isBlazor code
                if (this.diagram.tool !== DiagramTools.ZoomPan) {
                    this.diagram.triggerEvent(DiagramEvent.click, arg);
                }
            }
            this.eventArgs = {};
        }
        this.diagram.diagramActions = this.diagram.diagramActions & ~DiagramAction.PreventLaneContainerUpdate;
        if (updateAnnotation) {
            this.updateAnnotation(this.diagram.selectedItems);
        }
        // 920132: Node Interactions Cause Previously Deleted Nodes to Reappear
        this.previousElement = null;
        this.eventArgs = {};
        this.diagram.commandHandler.removeStackHighlighter(); // end the corresponding tool
    };
    //To check whether the node is child of swimlane or not.
    DiagramEventHandler.prototype.isSwimlaneChild = function (node) {
        if (node.shape && node.shape.type !== 'SwimLane') {
            var parent_1 = this.diagram.nameTable[node.parentId];
            if (!parent_1) {
                return false;
            }
            var swimlane = parent_1.parentId ? this.diagram.nameTable[parent_1.parentId] : parent_1;
            return swimlane && swimlane.shape && swimlane.shape.type === 'SwimLane';
        }
        else {
            return false;
        }
    };
    // To wrap connector annotation text based on the connector length.
    DiagramEventHandler.prototype.updateAnnotation = function (selectedItems) {
        var nodes = selectedItems.nodes;
        if (nodes.length > 0) {
            for (var i = 0; i < nodes.length; i++) {
                var node = nodes[parseInt(i.toString(), 10)];
                this.diagram.updateConnectorEdges(node);
            }
        }
    };
    // Adding child node of sub process in the diagram layer after the subprocess dropped out from swimlane to diagram.
    DiagramEventHandler.prototype.swapProcessChildInDom = function (diagramLayerId, node) {
        var diagramLayer = document.getElementById(diagramLayerId);
        if (node.shape.activity.subProcess.processes) {
            for (var i = 0; i < node.shape.activity.subProcess.processes.length; i++) {
                var child = document.getElementById(node.shape.activity.subProcess.processes[parseInt(i.toString(), 10)] + '_groupElement');
                if (child) {
                    diagramLayer.appendChild(child);
                }
            }
        }
    };
    /**
     * return the clicked element such as node/connector/port/diagram
     */
    DiagramEventHandler.prototype.getTargetElement = function () {
        var target;
        var objects = this.objectFinder.findObjectsUnderMouse(this.currentPosition, this.diagram, this.eventArgs, null, this.action);
        var obj = this.objectFinder.findObjectUnderMouse(this.diagram, objects, this.action, this.inAction, this.eventArgs, this.currentPosition);
        //909623: click the user handle of a node, click event triggered. the element is diagram instead of fixed user handle.
        if (this.previousAction !== 'None' && this.diagram.selectedItems.userHandles) {
            for (var i = 0; i < this.diagram.selectedItems.userHandles.length; i++) {
                var userHandle = this.diagram.selectedItems.userHandles[parseInt(i.toString(), 10)];
                if (this.previousAction === userHandle.name) {
                    target = userHandle;
                }
            }
        }
        var sourceElement = null;
        if (obj !== null) {
            sourceElement = this.diagram.findElementUnderMouse(obj, this.currentPosition, this.diagram);
            if (sourceElement) {
                target = this.commandHandler.findTarget(sourceElement, obj);
            }
        }
        var targetObject = {
            'obj': obj,
            'sourceElement': sourceElement,
            'target': target
        };
        return targetObject;
    };
    /* tslint:enable */
    DiagramEventHandler.prototype.getConnectorPadding = function (eventArgs) {
        var padding;
        var targetObject = eventArgs.source;
        if (targetObject && (targetObject instanceof Selector) && targetObject.connectors.length) {
            var selectedConnector = targetObject.connectors[0];
            padding = (selectedConnector.constraints & ConnectorConstraints.ConnectToNearByPort) ? selectedConnector.connectionPadding : 0;
        }
        else if (targetObject && (targetObject instanceof Connector) && this.action === 'PortDraw' && (this.tool instanceof ConnectorDrawingTool)) {
            if (targetObject.constraints & ConnectorConstraints.ConnectToNearByPort) {
                padding = targetObject.connectionPadding;
            }
        }
        return padding || 0;
    };
    DiagramEventHandler.prototype.addSwimLaneObject = function (selectedNode) {
        var swimlaneNode;
        var targetNode;
        var shape;
        var value;
        var canInsert;
        var index = 0;
        var offset;
        var actualShape = selectedNode.shape;
        var objects = this.objectFinder.findObjectsUnderMouse(this.currentPosition, this.diagram, this.eventArgs, null, this.action);
        if (!targetNode) {
            targetNode = this.diagram.findObjectUnderMouse(objects, this.action, this.inAction);
        }
        this.diagram.clearSelectorLayer();
        if (targetNode && !(targetNode.isLane || targetNode.isPhase || targetNode.isHeader)) {
            for (var i = 0; i < objects.length; i++) {
                var laneNode = this.diagram.nameTable[objects[parseInt(i.toString(), 10)].id];
                if (laneNode.isLane || laneNode.isPhase || laneNode.isHeader) {
                    targetNode = laneNode;
                }
            }
        }
        if (targetNode && (actualShape.isPhase || (actualShape.isLane && targetNode.isLane))) {
            var id = targetNode.parentId;
            swimlaneNode = this.diagram.nameTable["" + id];
        }
        var orientationSwap = null;
        if (swimlaneNode) {
            shape = swimlaneNode.shape;
            canInsert = (actualShape.isLane) ? actualShape.orientation === shape.orientation :
                actualShape.orientation !== shape.orientation;
            if (actualShape.isLane && actualShape.orientation !== shape.orientation) {
                canInsert = true;
                orientationSwap = actualShape.orientation === 'Horizontal' ? 'height' : 'width';
            }
        }
        if (canInsert && targetNode) {
            if (shape && shape.header && shape.hasHeader && shape.orientation === 'Horizontal') {
                index = 1;
            }
            if (shape.phases.length > 0) {
                index += 1;
            }
            if (actualShape.isPhase) {
                if (shape.orientation === 'Horizontal') {
                    offset = this.currentPosition.x - swimlaneNode.wrapper.bounds.x;
                }
                else {
                    offset = this.currentPosition.y - (swimlaneNode.wrapper.bounds.y +
                        (shape.hasHeader ? shape.header.height : 0));
                }
                var phases = { id: randomId(), offset: offset, header: { annotation: {
                            content: actualShape.phases[0].header === undefined ? 'Phase' : actualShape.phases[0].header.annotation.content,
                            style: actualShape.phases[0].header === undefined ? {} : actualShape.phases[0].header.annotation.style
                        } },
                    //882239 - Fill color not applied properly while adding phase at runtime
                    style: actualShape.phases[0] === undefined ? {} : actualShape.phases[0].style };
                this.diagram.addPhases(swimlaneNode, [phases]);
            }
            else {
                //const laneHeight: number = actualShape.lanes[0].header.height;
                var lane = {
                    id: randomId(), style: actualShape.lanes[0].style,
                    //Bug 912452: Disable canMove for lane symbol won't work when its tried to swap after its addition to swimlane
                    //Added canMove property to lane symbol which is dropped from symbol palette.
                    canMove: actualShape.lanes[0].canMove,
                    header: {
                        annotation: {
                            content: actualShape.lanes[0].header.annotation.content,
                            style: actualShape.lanes[0].header.annotation.style
                        },
                        style: actualShape.lanes[0].header.style
                    }
                };
                var orientation_1 = (actualShape.orientation === 'Horizontal') ? true : false;
                // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                orientation_1 ? lane.height = actualShape.lanes[0].height : lane.width = actualShape.lanes[0].width;
                if (shape.orientation === 'Horizontal') {
                    value = targetNode.rowIndex ? targetNode.rowIndex :
                        this.diagram.nameTable[targetNode.parentId].rowIndex;
                    if (targetNode.wrapper.offsetY < this.currentPosition.y) {
                        value += 1;
                    }
                }
                else {
                    value = targetNode.columnIndex ? targetNode.columnIndex :
                        this.diagram.nameTable[targetNode.parentId].columnIndex;
                    if (this.currentPosition.x < targetNode.wrapper.bounds.center.x) {
                        value -= 1;
                    }
                }
                if (shape.lanes.length > (value)) {
                    lane.header.width = shape.lanes[parseInt(value.toString(), 10)].header.width;
                    lane.header.height = shape.lanes[parseInt(value.toString(), 10)].header.height;
                }
                else {
                    //EJ2-64457 - Not able to add lane in the existing vertical swimlane.
                    var ind = void 0;
                    if (shape.orientation === 'Horizontal') {
                        ind = targetNode.rowIndex < 3 ? 0 : value - index - 1;
                    }
                    else {
                        ind = value - 1;
                    }
                    lane.header.width = shape.lanes[parseInt(ind.toString(), 10)].header.width;
                    lane.header.height = shape.lanes[parseInt(ind.toString(), 10)].header.height;
                }
                //Bug 879093: Incorrect helperguide for vertical and horizontal swim lanes.
                //With below code, we swap the height and width property of lane based on orientationSwap value.
                if (orientationSwap) {
                    if (orientationSwap === 'height') {
                        lane.width = lane.height;
                        delete lane.height;
                    }
                    else {
                        lane.height = lane.width;
                        delete lane.width;
                    }
                }
                this.diagram.addLanes(swimlaneNode, [lane], shape.orientation === 'Horizontal' ? value - index : value);
            }
            this.commandHandler.select(swimlaneNode);
        }
        else if (actualShape.isLane) {
            var swimLaneobj = {
                id: randomId(), width: selectedNode.width, height: selectedNode.height, addInfo: selectedNode.addInfo,
                shape: {
                    type: 'SwimLane',
                    header: {
                        //864525-Issue in updating swimlane header properties dynamically
                        annotation: {
                            content: actualShape.header === undefined ? 'Header' : actualShape.header.annotation.content,
                            style: actualShape.header === undefined ? {} : actualShape.header.annotation.style
                        },
                        height: 50,
                        style: actualShape.header ? actualShape.header.style : actualShape.lanes[0].header.style
                    },
                    phases: [{
                            id: randomId(),
                            //864555-Issue in updating swimlane phase properties dynamically
                            header: {
                                annotation: {
                                    content: actualShape.phases === undefined ? 'Phase' : actualShape.phases[0].header === undefined
                                        ? 'Phase' : actualShape.phases[0].header.annotation.content,
                                    style: actualShape.phases === undefined ? {} : actualShape.phases[0].header === undefined
                                        ? {} : actualShape.phases[0].header.annotation.style
                                },
                                style: actualShape.phases === undefined ? {} : actualShape.phases[0].header === undefined
                                    ? {} : actualShape.phases[0].header.style
                            },
                            style: actualShape.phases === undefined ? {} : actualShape.phases[0].style
                        }],
                    lanes: [{
                            id: randomId(), height: selectedNode.height, width: selectedNode.width, style: actualShape.lanes[0].style,
                            //Bug 912452: Disable canMove for lane symbol won't work when its tried to swap after its addition to swimlane
                            //Added canMove property to lane symbol which is dropped from symbol palette.
                            canMove: actualShape.lanes[0].canMove,
                            header: {
                                annotation: {
                                    content: actualShape.lanes[0].header.annotation.content,
                                    style: actualShape.lanes[0].header.annotation.style
                                },
                                style: actualShape.lanes[0].header.style
                            }
                        }], orientation: actualShape.orientation
                }
            };
            if (actualShape.orientation === 'Vertical') {
                swimLaneobj.width += 20;
            }
            swimLaneobj.offsetX = this.currentPosition.x + (swimLaneobj.width / 2);
            swimLaneobj.offsetY = this.currentPosition.y + (swimLaneobj.height / 2);
            //Bug 853721: Grid lines remain hidden when lane fill is set to transparent.
            // Added below code to set swimlane style for dropped swimlane.
            swimLaneobj.style = selectedNode.style;
            this.diagram.add(swimLaneobj);
        }
    };
    /** @private */
    DiagramEventHandler.prototype.mouseLeave = function (evt) {
        //Define what has to happen on mouse leave
        if (this.tool && this.inAction) {
            this.tool.mouseLeave(this.eventArgs);
        }
        if (this.diagram.selectedObject.helperObject) {
            this.updateContainerProperties();
            var isGroupAction = this.updateContainerBounds();
            if (isGroupAction) {
                this.diagram.endGroupAction();
            }
        }
        if (this.eventArgs && this.eventArgs.source) {
            this.diagram.updatePortVisibility(this.eventArgs.source, PortVisibility.Hover, true);
            this.hoverElement = null;
        }
        if (this.eventArgs && !this.eventArgs.source && this.hoverElement) {
            this.hoverElement = null;
        }
        if (this.tool instanceof ConnectTool && this.eventArgs && this.eventArgs.target && this.eventArgs.target instanceof Node) {
            this.diagram.updatePortVisibility(this.eventArgs.target, PortVisibility.Hover | PortVisibility.Connect, true);
            this.hoverElement = null;
        }
        var selector = this.diagram.selectedItems;
        if (selector && selector.wrapper) {
            if (!(selectionHasConnector(this.diagram, selector))) {
                this.diagram.renderSelector(true);
            }
        }
        if (this.diagram.diagramActions & DiagramAction.Interactions || this.diagram.diagramActions & DiagramAction.ToolAction) {
            this.diagram.diagramActions = this.diagram.diagramActions & ~DiagramAction.ToolAction;
        }
        this.isMouseDown = false;
        this.focus = false;
        this.touchStartList = null;
        this.touchMoveList = null;
        this.elementLeave();
        this.commandHandler.removeSnap();
        this.inAction = false;
        this.eventArgs = {};
        if (this.diagram.selectedObject && this.diagram.selectedObject.helperObject) {
            this.diagram.remove(this.diagram.selectedObject.helperObject);
            this.diagram.selectedObject = { helperObject: undefined, actualObject: undefined };
        }
        this.tool = null;
        removeRulerMarkers();
        if (this.action === 'Rotate') {
            this.diagram.diagramCanvas.classList.remove('e-diagram-rotate');
        }
        evt.preventDefault();
    };
    /** @private */
    DiagramEventHandler.prototype.mouseWheel = function (evt) {
        this.diagram.blazorActions |= BlazorAction.interaction;
        // EJ2-64831 - Need to provide support to override the mousewheel event
        var arg = {
            event: evt,
            cancel: false
        };
        this.diagram.triggerEvent(DiagramEvent.mouseWheel, arg);
        if (!arg.cancel) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            var up = (evt.wheelDelta > 0 || -40 * evt.detail > 0) ? true : false;
            var mousePosition = this.getMousePosition(evt);
            this.diagram.tooltipObject.close();
            var ctrlKey = this.isMetaKey(evt);
            if (ctrlKey) {
                // SF-362356 - Command below line to implement smooth scroll in diagram.
                // this.diagram.zoom(up ? (1.2) : 1 / (1.2), mousePosition);
                // EJ2-59803 - Added the below code to get the zoom factor value from scroll settings and
                // set it to zoomFactor args in zoomTo method.
                var zoomFactor = this.diagram.scrollSettings.zoomFactor;
                if (up) {
                    this.diagram.zoomTo({ type: 'ZoomIn', zoomFactor: zoomFactor, focusPoint: mousePosition });
                }
                else {
                    this.diagram.zoomTo({ type: 'ZoomOut', zoomFactor: zoomFactor, focusPoint: mousePosition });
                }
                evt.preventDefault();
            }
            else {
                var horizontalOffset = this.diagram.scroller.horizontalOffset;
                var verticalOffset = this.diagram.scroller.verticalOffset;
                var change = up ? 10 : -10;
                if (this.tool && (this.tool instanceof PolygonDrawingTool || this.tool instanceof PolyLineDrawingTool)) {
                    this.eventArgs = {};
                    this.getMouseEventArgs(mousePosition, this.eventArgs);
                    this.eventArgs.position = mousePosition;
                    this.tool.mouseWheel(this.eventArgs);
                }
                this.diagram.scrollActions |= ScrollActions.Interaction;
                var canMouseWheel = true;
                if (evt.isTrusted) {
                    // Bug 829925: Scroll bar flickers on scrolling the diagram using touchpad.
                    // Added the below condition to check whether the mouse wheel is from trackpad or not.
                    var isTrackpadScroll = false;
                    // 878719: Resolve ESLint errors
                    // eslint-disable-next-line no-compare-neg-zero
                    if ((Math.abs(evt.deltaY) < 100 && Math.abs(evt.deltaX) === -0) ||
                        // 878719: Resolve ESLint errors
                        // eslint-disable-next-line no-compare-neg-zero
                        (Math.abs(evt.deltaX) < 100 && Math.abs(evt.deltaY) === -0)) {
                        isTrackpadScroll = true;
                    }
                    //Bug 892441: Infinite scroll not working in vertical axis of diagram.
                    //Due to the prevention of zoom method trigger in vertical scroll, the infinite scroll is not working in vertical axis.
                    //So added the below condition to check macOS and allowed the zoom method trigger in vertical scroll for non-MacOs.
                    var isMacOS = false;
                    if (evt.deltaX !== 0 || evt.deltaY !== 0) {
                        // Perform macOS detection
                        isMacOS = navigator.userAgent.includes('Macintosh');
                    }
                    //898867: Diagram scrolling is not smooth while scrolling with Track Pad in Mac.
                    if (isMacOS) {
                        var isHorizontalScroll = Math.abs(evt.deltaX) > Math.abs(evt.deltaY);
                        if (isHorizontalScroll) {
                            // eslint-disable-next-line no-compare-neg-zero
                            if (evt.shiftKey || (evt.deltaX && evt.deltaX !== -0 && (isTrackpadScroll || !isMacOS))) {
                                this.diagram.scroller.zoom(1, change, 0, mousePosition, canMouseWheel, undefined, isTrackpadScroll);
                            }
                        }
                        else {
                            // eslint-disable-next-line no-compare-neg-zero
                            if ((evt.deltaY && evt.deltaY !== -0 && (isTrackpadScroll || !isMacOS))) {
                                this.diagram.scroller.zoom(1, 0, change, mousePosition, canMouseWheel, undefined, isTrackpadScroll);
                            }
                        }
                    }
                    //Bug 837940: In mac, scrollbar flickers on horizontal and vertical scroll using trackpad.
                    else {
                        // 878719: Resolve ESLint errors
                        // eslint-disable-next-line no-compare-neg-zero
                        if (evt.shiftKey || (evt.deltaX && evt.deltaX !== -0 && (isTrackpadScroll || !isMacOS))) {
                            this.diagram.scroller.zoom(1, change, 0, mousePosition, canMouseWheel, undefined, isTrackpadScroll);
                        }
                        // eslint-disable-next-line no-compare-neg-zero
                        else if ((evt.deltaY && evt.deltaY !== -0 && (isTrackpadScroll || !isMacOS))) {
                            this.diagram.scroller.zoom(1, 0, change, mousePosition, canMouseWheel, undefined, isTrackpadScroll);
                        }
                    }
                }
                else {
                    // 878719: Resolve ESLint errors
                    // eslint-disable-next-line no-compare-neg-zero
                    if (evt.shiftKey || (evt.deltaX && evt.deltaX !== -0)) {
                        this.diagram.scroller.zoom(1, change, 0, mousePosition, canMouseWheel);
                    }
                    else {
                        this.diagram.scroller.zoom(1, 0, change, mousePosition, canMouseWheel);
                    }
                }
                this.diagram.scrollActions &= ~ScrollActions.Interaction;
                if (horizontalOffset !== this.diagram.scroller.horizontalOffset
                    || verticalOffset !== this.diagram.scroller.verticalOffset) {
                    evt.preventDefault();
                }
            }
            if (this.diagram.textEditing) {
                this.diagram.isTriggerEvent = true;
                if (this.diagram.activeLabel.parentId) {
                    var node = this.diagram.getObject(this.diagram.activeLabel.parentId);
                    this.diagram.startTextEdit(node, this.diagram.activeLabel.id);
                }
                this.diagram.isTriggerEvent = false;
            }
            this.diagram.blazorActions = this.diagram.blazorActions & ~BlazorAction.interaction;
        }
    };
    /** @private */
    DiagramEventHandler.prototype.keyDown = function (evt) {
        if (evt.fromMouseEvents) {
            if (evt.ctrlKey) {
                this.keyArgs.keyModifiers = 1;
            }
            if (evt.shiftKey) {
                this.keyArgs.keyModifiers = 4;
            }
            if (evt.shiftKey && evt.ctrlKey) {
                this.keyArgs.keyModifiers = 5;
            }
        }
        if (!(this.diagram.diagramActions & DiagramAction.TextEdit) &&
            !(this.checkEditBoxAsTarget(evt)) || (evt.key === 'Escape' || evt.keyCode === 27)) {
            var i = void 0;
            var inAction = 'inAction';
            var command = void 0;
            var keycode = evt.keyCode ? evt.keyCode : evt.which;
            var key = evt.key;
            if (key === 'ArrowDown' || key === 'ArrowUp' || key === 'ArrowLeft' || key === 'ArrowRight') {
                this.isNudgeKey = true;
            }
            var ctrlKey = this.isMetaKey(evt);
            if (this.diagram.commandManager && this.diagram.commands) {
                var commands = this.diagram.commands;
                for (var _i = 0, _a = Object.keys(commands); _i < _a.length; _i++) {
                    var i_1 = _a[_i];
                    command = this.diagram.commands["" + i_1];
                    if (command && (command.gesture.keyModifiers || command.gesture.key)) {
                        //Added the split method to split the Number string from the enum while clicking the number keys
                        if ((keycode === command.gesture.key || (Keys[command.gesture.key] && key === Keys[command.gesture.key] || key === Keys[command.gesture.key].split('Number')[1])
                            || this.isDeleteKey(key, i_1))
                            && (((!command.gesture.keyModifiers) && (!evt.altKey) && (!evt.shiftKey) && (!ctrlKey)) ||
                                (command.gesture.keyModifiers && (ctrlKey || evt.altKey || evt.shiftKey) &&
                                    (this.altKeyPressed(command.gesture.keyModifiers) && evt.altKey) ||
                                    (this.shiftKeyPressed(command.gesture.keyModifiers) && evt.shiftKey) ||
                                    //added the comparision condition of keyargs to execute the condition onclicking the Ctrl + Shift key
                                    (this.ctrlKeyPressed(command.gesture.keyModifiers) && ctrlKey)
                                        && (this.keyArgs.keyModifiers === command.gesture.keyModifiers)))) {
                            var canExecute = getFunction(command.canExecute);
                            if (isBlazor() || (canExecute &&
                                canExecute({
                                    'keyDownEventArgs': KeyboardEvent,
                                    parameter: command.parameter
                                }))) {
                                evt.preventDefault();
                                if (evt.key === 'Escape') {
                                    if (this.checkEditBoxAsTarget(evt)) {
                                        document.getElementById(this.diagram.diagramCanvas.id).focus();
                                    }
                                    else if (this.diagram.currentSymbol) {
                                        var selectedSymbols = 'selectedSymbols';
                                        var source = 'sourceElement';
                                        var intDestroy = 'intDestroy';
                                        this.diagram.removeFromAQuad(this.diagram.currentSymbol);
                                        this.diagram.removeObjectsFromLayer(this.diagram.nameTable[this.diagram.currentSymbol.id]);
                                        this.diagram.removeElements(this.diagram.currentSymbol);
                                        var currentObj = this.diagram.currentSymbol;
                                        if (((currentObj) instanceof Node
                                            && (currentObj.shape.type === 'Bpmn')
                                            && currentObj.shape.shape === 'TextAnnotation')) {
                                            this.diagram.removeDependentConnector(currentObj);
                                        }
                                        removeChildNodes(this.diagram.currentSymbol, this.diagram);
                                        delete this.diagram.nameTable[this.diagram.currentSymbol.id];
                                        var sourceElement = this.diagram.droppable["" + source];
                                        sourceElement.draggable["" + intDestroy]();
                                        var element_1 = this.diagram.droppable["" + selectedSymbols];
                                        element_1.parentNode.removeChild(element_1);
                                        var diagramActions = this.diagram.diagramActions;
                                        this.diagram.diagramActions =
                                            this.diagram.addConstraints(diagramActions, DiagramAction.PreventClearSelection);
                                        this.tool.mouseUp(this.eventArgs);
                                        this.diagram.diagramRenderer.rendererActions = this.diagram.removeConstraints(this.diagram.diagramRenderer.rendererActions, RendererAction.DrawSelectorBorder);
                                        if (this.diagram.previousSelectedObject) {
                                            this.diagram.select(this.diagram.previousSelectedObject);
                                        }
                                        this.action = 'Select';
                                        this.diagram.previousSelectedObject = null;
                                        this.diagram.currentSymbol = null;
                                        this.diagram.diagramActions =
                                            this.diagram.removeConstraints(diagramActions, DiagramAction.PreventClearSelection);
                                        this.isMouseDown = false;
                                    }
                                    else if (this.inAction && this.diagram.drawingObject && this.tool && this.tool["" + inAction]) {
                                        this.tool.mouseUp(this.eventArgs);
                                        this.tool = null;
                                        this.isMouseDown = false;
                                    }
                                }
                                if (command.execute) {
                                    this.commandObj = command;
                                    if (this.diagram.tool !== DiagramTools.ZoomPan) {
                                        // if (i === 'nudgeUp' || i === 'nudgeRight' || i === 'nudgeDown' || i === 'nudgeLeft') {
                                        //     command.execute()
                                        // } else {
                                        var execute = getFunction(command.execute);
                                        // Bug 832880: Need to improve performance while nudging multiple nodes.
                                        if (this.isNudgeKey) {
                                            if (!this.isKeyUp) {
                                                this.keyArgs.oldValue = { offsetX: this.diagram.selectedItems.offsetX,
                                                    offsetY: this.diagram.selectedItems.offsetY };
                                                this.keyCount++;
                                                if (this.keyCount > 4) {
                                                    // 914747: Position change event not triggered for Keyboard nudge commands
                                                    execute({ 'keyDownEventArgs': KeyboardEvent, parameter: command.parameter, type: 'KEYDOWN' });
                                                    this.keyCount = 0;
                                                    this.keyArgs.newValue = { offsetX: this.diagram.selectedItems.offsetX,
                                                        offsetY: this.diagram.selectedItems.offsetY };
                                                    this.diagram.triggerEvent(DiagramEvent.positionChange, this.keyArgs);
                                                }
                                            }
                                            this.isKeyUp = false;
                                        }
                                        else {
                                            execute({ 'keyDownEventArgs': KeyboardEvent, parameter: command.parameter });
                                        }
                                    }
                                    // }
                                }
                                //Removed isBlazor code
                                break;
                            }
                        }
                    }
                }
            }
        }
        // eslint-disable-next-line
        var selectedObject = (this.diagram.selectedItems.nodes.length) ?
            this.diagram.selectedItems.nodes : this.diagram.selectedItems.connectors;
        var element = cloneBlazorObject(this.diagram.selectedItems);
        this.keyArgs = {
            element: element,
            key: evt.key, keyCode: evt.keyCode ? evt.keyCode : evt.which
        };
        this.getKeyModifier(this.keyArgs, evt);
        if ((this.diagram.diagramActions & DiagramAction.TextEdit)) {
            this.getlabel(this.keyArgs, evt);
        }
        this.diagram.triggerEvent(DiagramEvent.keyDown, this.keyArgs);
    };
    DiagramEventHandler.prototype.getlabel = function (args, evt) {
        var label = this.diagram.activeLabel;
        args.target = this.diagram.element.id + '_editBox';
        var node = this.diagram.nameTable[label.parentId];
        if (document.getElementById(this.diagram.element.id + '_editBox')) {
            args.text = document.getElementById(this.diagram.element.id + '_editBox').value;
            for (var i = 0; i < node.annotations.length; i++) {
                if (node.annotations[parseInt(i.toString(), 10)].id === label.id) {
                    args.label = node.annotations[parseInt(i.toString(), 10)];
                    break;
                }
            }
        }
    };
    DiagramEventHandler.prototype.getKeyModifier = function (args, evt) {
        args.keyModifiers = KeyModifiers.None;
        if (evt.ctrlKey) {
            args.keyModifiers |= KeyModifiers.Control;
        }
        if (evt.shiftKey) {
            args.keyModifiers |= KeyModifiers.Shift;
        }
        if (evt.altKey) {
            args.keyModifiers |= KeyModifiers.Alt;
        }
        if (this.isMetaKey(evt)) {
            args.keyModifiers |= KeyModifiers.Meta;
        }
    };
    DiagramEventHandler.prototype.keyUp = function (evt) {
        var element = cloneBlazorObject(this.diagram.selectedItems);
        this.keyArgs = {
            element: element, key: evt.key, keyCode: evt.keyCode ? evt.keyCode : evt.which,
            oldValue: { offsetX: element.offsetX, offsetY: element.offsetY },
            newValue: { offsetX: element.offsetX, offsetY: element.offsetY }
        };
        var selectedObject = (this.diagram.selectedItems.nodes.length) ?
            this.diagram.selectedItems.nodes : this.diagram.selectedItems.connectors;
        this.getKeyModifier(this.keyArgs, evt);
        if ((this.diagram.diagramActions & DiagramAction.TextEdit)) {
            this.getlabel(this.keyArgs, evt);
        }
        this.diagram.triggerEvent(DiagramEvent.keyUp, this.keyArgs);
        // this.isKeyUp = true;
        // Bug 832880: Need to improve performance while nudging multiple nodes.
        if (!this.isKeyUp && this.isNudgeKey) {
            //Bug 860080: Navigation not working in keyboard interaction SB sample.
            //To execute the command manager execute method below as we restricted keydown for arrow keys.
            var execute = getFunction(this.commandObj.execute);
            execute({ 'keyDownEventArgs': KeyboardEvent, parameter: this.commandObj.parameter, type: 'KEYUP' });
            // 914747: Position change event not triggered for Keyboard nudge commands
            this.keyArgs.newValue = { offsetX: this.diagram.selectedItems.offsetX, offsetY: this.diagram.selectedItems.offsetY };
            this.diagram.triggerEvent(DiagramEvent.positionChange, this.keyArgs);
            this.isNudgeKey = false;
            this.keyCount = 0;
        }
    };
    DiagramEventHandler.prototype.startAutoScroll = function (e) {
        var position = this.getMousePosition(e);
        position.x *= this.diagram.scroller.currentZoom;
        position.y *= this.diagram.scroller.currentZoom;
        var rulerSize = getRulerSize(this.diagram);
        var movingPosition;
        var autoScrollBorder = this.diagram.scrollSettings.autoScrollBorder;
        if (Browser.info.name === 'mozilla') {
            if (this.diagram.scroller.viewPortWidth === 0) {
                var bounds = document.getElementById(this.diagram.element.id).getBoundingClientRect();
                if (bounds.width !== this.diagram.scroller.viewPortWidth) {
                    this.diagram.scroller.setViewPortSize(bounds.width, bounds.height);
                }
            }
        }
        if (this.diagram.scrollSettings.canAutoScroll) {
            if (position.x + this.diagram.scroller.horizontalOffset + autoScrollBorder.right + rulerSize.width >=
                this.diagram.scroller.viewPortWidth - 18) {
                movingPosition = 'right';
            }
            else if (position.x + this.diagram.scroller.horizontalOffset < autoScrollBorder.left) {
                movingPosition = 'left';
            }
            else if (position.y + this.diagram.scroller.verticalOffset + autoScrollBorder.bottom + rulerSize.height >
                this.diagram.scroller.viewPortHeight - 18) {
                movingPosition = 'bottom';
            }
            else if (position.y + this.diagram.scroller.verticalOffset < autoScrollBorder.top) {
                movingPosition = 'top';
            }
        }
        return movingPosition;
    };
    DiagramEventHandler.prototype.doAutoScroll = function (option, e, delay, autoScroll) {
        var position = option;
        var canAutoScroll = true;
        if ((this.tool instanceof NodeDrawingTool || this.tool instanceof ConnectorDrawingTool
            || this.tool instanceof MoveTool || this.tool instanceof ResizeTool
            || this.tool instanceof SelectTool || this.tool instanceof ConnectTool) && this.inAction) {
            // eslint-disable-next-line @typescript-eslint/no-this-alias
            var diagram = this;
            var pos = this.getMousePosition(e);
            var autoScrollBorder = this.diagram.scrollSettings.autoScrollBorder;
            var newDelay = delay ? delay : 100;
            var left = 0;
            var top_1 = 0;
            var canUpdate = false;
            var corner = '';
            var point = { x: pos.x, y: pos.y };
            // EJ2-61979 - Added below code to check whether we resize the node around four corners
            if (this.tool instanceof ResizeTool && (this.tool.corner === 'ResizeSouthEast' || this.tool.corner === 'ResizeSouthWest' ||
                this.tool.corner === 'ResizeNorthWest' || this.tool.corner === 'ResizeNorthEast')) {
                canUpdate = true;
                corner = this.tool.corner;
            }
            switch (position) {
                case 'right':
                    point.x = pos.x + 10;
                    left = 10;
                    // EJ2-61979 - If node gets resized on southeast or northeast corner means then update the y position along with x position
                    if (canUpdate) {
                        if (corner === 'ResizeSouthEast') {
                            point.y = pos.y + 10;
                            top_1 = 10;
                        }
                        else {
                            point.y = pos.y - 10;
                            top_1 = -10;
                        }
                    }
                    break;
                case 'left':
                    point.x = pos.x - 10;
                    left = -10;
                    // EJ2-61979 - If node gets resized on northwest or southwest corner means then update the y position along with x position
                    if (canUpdate) {
                        if (corner === 'ResizeNorthWest') {
                            point.y = pos.y - 10;
                            top_1 = -10;
                        }
                        else {
                            point.y = pos.y + 10;
                            top_1 = 10;
                        }
                    }
                    break;
                case 'bottom':
                    point.y = pos.y + 10;
                    top_1 = 10;
                    // EJ2-61979 - If node gets resized on southeast or southwest corner means then update the x position along with y position
                    if (canUpdate) {
                        if (corner === 'ResizeSouthEast') {
                            point.x = pos.x + 10;
                            left = 10;
                        }
                        else {
                            point.x = pos.x - 10;
                            left = -10;
                        }
                    }
                    break;
                case 'top':
                    point.y = pos.y - 10;
                    top_1 = -10;
                    // EJ2-61979 - If node gets resized on northeast or northwest corner means then update the x position along with y position
                    if (canUpdate) {
                        if (corner === 'ResizeNorthEast') {
                            point.x = pos.x + 10;
                            left = 10;
                        }
                        else {
                            point.x = pos.x - 10;
                            left = -10;
                        }
                    }
                    break;
            }
            this.eventArgs.position = { x: point.x, y: point.y };
            this.currentPosition = this.eventArgs.position;
            var objects = this.objectFinder.findObjectsUnderMouse(this.currentPosition, this.diagram, this.eventArgs, null, this.action);
            this.eventArgs.target = this.diagram.findObjectUnderMouse(objects, this.action, this.inAction);
            this.tool.mouseMove(this.eventArgs);
            this.diagram.scrollActions |= ScrollActions.Interaction;
            this.diagram.scroller.zoom(1, -left, -top_1, pos, canAutoScroll);
            this.diagram.scrollActions &= ~ScrollActions.Interaction;
        }
    };
    DiagramEventHandler.prototype.mouseEvents = function () {
        var target = this.diagram.findObjectsUnderMouse(this.currentPosition);
        for (var i = 0; i < target.length; i++) {
            if (this.eventArgs.actualObject === target[parseInt(i.toString(), 10)]) {
                target.splice(i, 1);
            }
        }
        var arg = {
            targets: {}
        };
        if (!isBlazor()) {
            arg = {
                targets: cloneBlazorObject(target),
                element: cloneBlazorObject((this.eventArgs.source === this.eventArgs.actualObject) ? undefined : this.eventArgs.source),
                actualObject: cloneBlazorObject(this.eventArgs.actualObject)
            };
        }
        //Removed isBlazor code
        if (this.lastObjectUnderMouse && this.diagram.mouseLeave
            && (!this.eventArgs.actualObject || (this.lastObjectUnderMouse !== this.eventArgs.actualObject))) {
            var arg_1 = {
                targets: undefined, element: cloneBlazorObject(this.lastObjectUnderMouse), actualObject: undefined
            };
            //Removed isBlazor code
            this.diagram.triggerEvent(DiagramEvent.mouseLeave, arg_1);
            this.lastObjectUnderMouse = null;
        }
        if (!this.lastObjectUnderMouse && this.eventArgs.source || (this.lastObjectUnderMouse !== this.eventArgs.actualObject)) {
            this.lastObjectUnderMouse = this.eventArgs.actualObject;
            if (this.eventArgs.actualObject !== undefined) {
                this.diagram.triggerEvent(DiagramEvent.mouseEnter, arg);
            }
        }
        if (this.eventArgs.actualObject) {
            this.diagram.triggerEvent(DiagramEvent.mouseOver, arg);
        }
    };
    DiagramEventHandler.prototype.elementEnter = function (mousePosition, elementOver) {
        if (!elementOver) {
            var isPrivateTooltip = ((this.hoverElement instanceof Node)
                && this.hoverElement.constraints & NodeConstraints.Tooltip)
                || ((this.hoverElement instanceof Connector)
                    && this.hoverElement.constraints & ConnectorConstraints.Tooltip)
                || ((this.hoverElement instanceof PointPort || this.hoverElement instanceof PathPort)
                    && this.hoverElement.constraints & PortConstraints.ToolTip)
                || ((this.hoverElement instanceof ShapeAnnotation || this.hoverElement instanceof PathAnnotation)
                    && this.hoverElement.constraints & AnnotationConstraints.Tooltip);
            var content = this.getContent();
            var children = void 0;
            if (this.hoverElement && this.hoverElement.children && this.hoverElement.children.length > 0) {
                // EJ2-56981 - Below method is used to check if the mouse pointer position and group children node gets intersect or not
                children = this.findIntersectChild(this.hoverElement);
            }
            if (this.hoverElement.tooltip.openOn === 'Auto' && content !== '') {
                // EJ2-56981 - If children returned means then update tooltip for child node else update tooltip for group node.
                if (children) {
                    updateTooltip(this.diagram, children);
                }
                else {
                    updateTooltip(this.diagram, isPrivateTooltip ? this.hoverElement : undefined);
                }
            }
            // EJ2-66418 - set tooltip relativeMode as mouse
            // Calculating offset position for relativeMode Mouse
            if (this.hoverElement.tooltip.content) {
                if (this.hoverElement.tooltip.relativeMode === 'Mouse') {
                    this.setTooltipOffset(mousePosition);
                }
                else {
                    this.diagram.tooltipObject.offsetX = 0;
                    this.diagram.tooltipObject.offsetY = 0;
                }
            }
            var objects = this.diagram.findObjectsUnderMouse(this.currentPosition);
            var obj = this.diagram.findObjectUnderMouse(objects, this.action, this.inAction);
            //848980 - Null exception occurs while hovering the ports
            if (obj !== null) {
                var targetEle = void 0;
                //840454 - support to provide isSticky property for tooltip in diagram control
                if (this.hoverElement.tooltip.isSticky) {
                    this.diagram.tooltipObject.isSticky = true;
                }
                if (obj instanceof Node && obj.children && obj.children.length > 0) {
                    // EJ2-56981 - If children returned means then update tooltip for child node else update tooltip for group node.
                    obj = children ? children : obj;
                }
                //EJ2-62120 - check if the Node has Ports and hoverElement is Port as mousepointer hovered over Port
                if (obj.ports && (this.hoverElement instanceof PointPort || this.hoverElement instanceof PathPort)) {
                    //executed to set target as port
                    targetEle = document.getElementById(obj.id + '_' + this.hoverElement.id);
                }
                else if (obj.annotations
                    && (this.hoverElement instanceof ShapeAnnotation || this.hoverElement instanceof PathAnnotation)) {
                    //executed to set target as annotation
                    targetEle = document.getElementById(obj.id + '_' + this.hoverElement.id);
                }
                else {
                    //executed to set target as Node or Connector
                    var idName = (obj.shape && ((obj.shape) instanceof Native)) ? '_content_native_element' : '_groupElement';
                    targetEle = document.getElementById(obj.id + idName);
                }
                if (this.hoverElement.tooltip.openOn === 'Auto' && content !== '') {
                    this.diagram.tooltipObject.close();
                    this.diagram.tooltipObject.openOn = this.hoverElement.tooltip.openOn;
                    //Removed isBlazor code
                    this.diagram.tooltipObject.dataBind();
                }
                if (canEnableToolTip(this.hoverElement, this.diagram) && this.hoverElement.tooltip.openOn === 'Auto') {
                    this.diagram.tooltipObject.target = this.hoverElement.id;
                    if (this.hoverElement.tooltip.relativeMode === 'Mouse') {
                        this.diagram.tooltipObject.open(this.diagram.element);
                    }
                    else {
                        this.diagram.tooltipObject.open(targetEle);
                    }
                }
            }
        }
    };
    DiagramEventHandler.prototype.elementLeave = function () {
        if (this.diagram.tooltipObject && !this.diagram.tooltipObject.isSticky && this.diagram.tooltipObject.openOn !== 'Custom') {
            this.diagram.tooltipObject.close();
        }
    };
    // EJ2-66418 - set tooltip relativeMode as mouse
    // Calculating offset position for relativeMode Mouse
    DiagramEventHandler.prototype.setTooltipOffset = function (mousePosition) {
        var point = this.updatePointBasedOnScale(mousePosition);
        var offset = getTooltipOffset(this.diagram, point, this.hoverElement);
        this.diagram.tooltipObject.offsetX = offset.x;
        this.diagram.tooltipObject.offsetY = offset.y;
    };
    DiagramEventHandler.prototype.updatePointBasedOnScale = function (mousePosition) {
        var scale = this.diagram.scaleValue;
        var point = { x: mousePosition.x * scale, y: mousePosition.y * scale };
        return point;
    };
    DiagramEventHandler.prototype.altKeyPressed = function (keyModifier) {
        if (keyModifier & KeyModifiers.Alt) {
            return true;
        }
        return false;
    };
    DiagramEventHandler.prototype.ctrlKeyPressed = function (keyModifier) {
        if (keyModifier & KeyModifiers.Control) {
            return true;
        }
        return false;
    };
    DiagramEventHandler.prototype.shiftKeyPressed = function (keyModifier) {
        if (keyModifier & KeyModifiers.Shift) {
            return true;
        }
        return false;
    };
    /** @private */
    DiagramEventHandler.prototype.scrolled = function (evt) {
        this.diagram.updateScrollOffset();
        //Removed isBlazor code
    };
    DiagramEventHandler.prototype.isMobileOrIPadDevice = function () {
        var userAgent = navigator.userAgent || navigator.vendor || window.opera;
        //Bug 931502: Unable to complete polyline drawing on ipad safari browser.
        // Check for iPads on iOS 13+ (Safari reports as Mac desktop)
        if (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1) {
            return 'iOS (iPad)';
        }
        // Check for iOS devices (iPhone, iPad, iPod)
        if (/iPhone|iPad|iPod/.test(userAgent) && !window.MSStream) {
            return 'iOS';
        }
        // Check for Android devices
        if (/android/i.test(userAgent)) {
            return 'Android';
        }
        // Check for other mobile devices (general fallback)
        if (/Mobile|Tablet/.test(userAgent)) {
            return 'Mobile';
        }
        return 'Desktop';
    };
    /** @private */
    DiagramEventHandler.prototype.doubleClick = function (evt) {
        if (canUserInteract(this.diagram)) {
            //Bug 916653: Issue with drawing Polyline in iPad.
            //Added below code to check for mobile and ipad device.
            var isMobileOrIPad = this.isMobileOrIPadDevice();
            var curTool = this.diagram.tool;
            if ((isMobileOrIPad !== 'Desktop') && (this.tool && (this.tool instanceof PolygonDrawingTool || this.tool instanceof PolyLineDrawingTool))) {
                this.diagram.tool = 0;
            }
            var annotation = void 0;
            var objects = this.diagram.findObjectsUnderMouse(this.currentPosition);
            var obj = this.diagram.findObjectUnderMouse(objects, this.action, this.inAction);
            if (obj !== null && canUserInteract(this.diagram)) {
                var node = obj;
                annotation = this.diagram.findElementUnderMouse(obj, this.currentPosition, this.diagram);
                if (this.tool && (this.tool instanceof PolygonDrawingTool || this.tool instanceof PolyLineDrawingTool)) {
                    var arg_2 = {
                        source: cloneBlazorObject(obj),
                        position: this.currentPosition, count: evt.detail
                    };
                    this.diagram.tool = curTool;
                    this.tool.mouseUp(this.eventArgs);
                    this.isMouseDown = false;
                    this.eventArgs = {};
                    this.tool = null;
                    evt.preventDefault();
                }
                else {
                    var layer = this.diagram.commandHandler.getObjectLayer(obj.id);
                    if (layer && !layer.lock && layer.visible) {
                        if (!(this.diagram.diagramActions & DiagramAction.TextEdit)) {
                            var id = '';
                            this.diagram.startTextEdit(obj, id || (annotation instanceof TextElement ?
                                (annotation.id).split(obj.id + '_')[1] : undefined));
                        }
                    }
                }
            }
            var arg = {
                source: cloneBlazorObject(obj) || cloneBlazorObject(this.diagram),
                position: this.currentPosition, count: evt.detail
            };
            //Removed isBlazor code
            this.diagram.triggerEvent(DiagramEvent.doubleClick, arg);
        }
    };
    /**
     * @private
     */
    DiagramEventHandler.prototype.itemClick = function (actualTarget, diagram) {
        var obj = actualTarget;
        if (checkParentAsContainer(this.diagram, obj, true)) {
            return obj;
        }
        return null;
    };
    /**
     * @private
     */
    DiagramEventHandler.prototype.inputChange = function (evt) {
        var minWidth = 90;
        var maxWidth;
        var minHeight = 12;
        var fontsize;
        var textWrapper;
        var node;
        var height;
        var width;
        var textBounds;
        var textBoxWidth;
        var transforms;
        var scale;
        var editTextBox = document.getElementById(this.diagram.element.id + '_editBox');
        var editTextBoxDiv = document.getElementById(this.diagram.element.id + '_editTextBoxDiv');
        var text = (editTextBox.value);
        var line = text.split('\n');
        node = (this.diagram.selectedItems.nodes[0]) ? this.diagram.selectedItems.nodes[0] : this.diagram.selectedItems.connectors[0];
        if ((!node && this.tool instanceof TextDrawingTool) || (node && node.shape.type === 'SwimLane')) {
            node = this.diagram.nameTable[this.diagram.activeLabel.parentId];
        }
        if (node && ((node.shape.type !== 'Text' && node.annotations.length > 0) || (node.shape.type === 'Text'))) {
            textWrapper = this.diagram.getWrapper(node.wrapper, this.diagram.activeLabel.id);
            maxWidth = node.wrapper.bounds.width < textWrapper.bounds.width ? node.wrapper.bounds.width : textWrapper.bounds.width;
            maxWidth = maxWidth > minWidth ? maxWidth : minWidth;
            textBounds = measureHtmlText(textWrapper.style, text, undefined, undefined, maxWidth);
            fontsize = Number((editTextBox.style.fontSize).split('px')[0]);
            if (line.length > 1 && line[line.length - 1] === '') {
                textBounds.height = textBounds.height + fontsize;
            }
            transforms = this.diagram.scroller.transform;
            scale = canZoomTextEdit(this.diagram) ? transforms.scale : 1;
            width = textBounds.width;
            width = ((minWidth > width) ? minWidth : width) * scale;
            height = ((minHeight > textBounds.height) ? minHeight : textBounds.height) * scale;
            editTextBoxDiv.style.left = ((((textWrapper.bounds.center.x + transforms.tx) * transforms.scale) - width / 2) - 2.5) + 'px';
            editTextBoxDiv.style.top = ((((textWrapper.bounds.center.y + transforms.ty) * transforms.scale) - height / 2) - 3) + 'px';
            editTextBoxDiv.style.width = width + 'px';
            editTextBoxDiv.style.height = height + 'px';
            editTextBox.style.minHeight = minHeight + 'px';
            editTextBox.style.minWidth = minWidth + 'px';
            editTextBox.style.width = width + 'px';
            editTextBox.style.height = height + 'px';
        }
    };
    /**
     * @private
     */
    DiagramEventHandler.prototype.isAddTextNode = function (node, focusOut) {
        if (this.tool instanceof TextDrawingTool || focusOut) {
            this.tool = null;
            if (node && (!(canContinuousDraw(this.diagram)))) {
                this.diagram.drawingObject = undefined;
                this.diagram.currentDrawingObject = undefined;
            }
            if (getObjectFromCollection(this.diagram.nodes, node.id) ||
                getObjectFromCollection(this.diagram.connectors, node.id)) {
                return false;
            }
            return true;
        }
        return false;
    };
    DiagramEventHandler.prototype.checkEditBoxAsTarget = function (evt) {
        if ((evt.target && evt.target.id === this.diagram.element.id + '_editBox')) {
            return true;
        }
        return false;
    };
    DiagramEventHandler.prototype.getMouseEventArgs = function (position, args, source, padding) {
        args.position = position;
        var obj;
        var objects;
        if (!source) {
            if (this.action === 'Drag' || this.action === 'ConnectorSourceEnd' || this.action === 'SegmentEnd' ||
                this.action === 'OrthoThumb' || this.action === 'BezierSourceThumb' || this.action === 'BezierTargetThumb' ||
                this.action === 'ConnectorTargetEnd' || this.action.indexOf('Rotate') !== -1 || this.action.indexOf('Resize') !== -1) {
                obj = this.diagram.selectedItems;
                if (!this.diagram.currentSymbol && this.action === 'Drag' && obj && this.diagram.selectedItems.nodes.length > 0 &&
                    this.diagram.selectedItems.nodes[0].shape.type === 'SwimLane') {
                    objects = this.diagram.findObjectsUnderMouse(this.currentPosition);
                    obj = this.diagram.findObjectUnderMouse(objects, this.action, this.inAction);
                }
            }
            else {
                objects = this.diagram.findObjectsUnderMouse(this.currentPosition);
                obj = this.diagram.findObjectUnderMouse(objects, this.action, this.inAction);
            }
        }
        else {
            objects = this.diagram.findObjectsUnderMouse(this.currentPosition, source);
            obj = this.diagram.findTargetObjectUnderMouse(objects, this.action, this.inAction, args.position, source);
        }
        if (obj && obj.isHeader) {
            obj = this.diagram.nameTable[obj.parentId];
            this.eventArgs.actualObject = obj;
        }
        var wrapper;
        if (obj) {
            wrapper = this.diagram.findElementUnderMouse(obj, this.currentPosition, this.diagram, padding);
            var currentConnector = void 0;
            var nearNode = void 0;
            var i = void 0;
            if ((wrapper && obj.ports && obj.ports.length
                && !checkPort(obj, wrapper) || !wrapper || !obj) && objects && objects.length
                && (source instanceof Selector)) {
                currentConnector = source.connectors[0];
                for (i = objects.length - 1; i >= 0; i--) {
                    nearNode = objects[parseInt(i.toString(), 10)];
                    if ((nearNode instanceof Node || nearNode instanceof Connector) && currentConnector
                        && currentConnector.connectionPadding) {
                        obj = nearNode;
                        wrapper = this.diagram.findElementUnderMouse(obj, this.currentPosition, this.diagram, padding);
                        if (((currentConnector.constraints & ConnectorConstraints.ConnectToNearByPort) && obj &&
                            obj.ports && obj.ports.length && checkPort(obj, wrapper))) {
                            break;
                        }
                        if ((nearNode instanceof Node || nearNode instanceof Connector) && currentConnector
                            && currentConnector.connectionPadding && nearNode.wrapper.outerBounds.containsPoint(this.currentPosition)
                            && (currentConnector.constraints & ConnectorConstraints.ConnectToNearByNode)
                            && !(currentConnector.constraints & ConnectorConstraints.ConnectToNearByPort)) {
                            obj = nearNode;
                            wrapper = this.diagram.findElementUnderMouse(obj, this.currentPosition, this.diagram, 0);
                            break;
                        }
                    }
                }
            }
        }
        if (!source) {
            args.source = obj;
            args.sourceWrapper = wrapper;
        }
        else {
            args.target = obj;
            args.targetWrapper = wrapper;
        }
        args.actualObject = this.eventArgs.actualObject;
        if (args.source instanceof Selector && args.actualObject === undefined &&
            (args.source.nodes.length > 0 || args.source.connectors.length > 0)) {
            args.actualObject = args.source.nodes.length > 0 ? this.diagram.nameTable[args.source.nodes[0].id]
                : this.diagram.nameTable[args.source.connectors[0].id];
        }
        args.startTouches = this.touchStartList;
        args.moveTouches = this.touchMoveList;
        return args;
    };
    /** @private */
    DiagramEventHandler.prototype.resetTool = function () {
        this.action = 'Select';
        this.hoverElement = null;
        this.hoverNode = null;
        this.tool = this.diagram.getTool(this.action);
        this.updateCursor();
    };
    /** @private */
    DiagramEventHandler.prototype.updateTool = function () {
        // 912436: Update Tool at runtime
        if (!this.currentPosition) {
            this.action = 'Select';
        }
        else {
            var objects = this.diagram.findObjectsUnderMouse(this.currentPosition);
            var obj = this.diagram.findObjectUnderMouse(objects, this.action, this.inAction);
            var sourceElement = null;
            var target = void 0;
            if (obj !== null) {
                sourceElement = this.diagram.findElementUnderMouse(obj, this.currentPosition, this.diagram);
            }
            if (sourceElement) {
                target = this.commandHandler.findTarget(sourceElement, obj);
            }
            this.action = this.diagram.findActionToBeDone(obj, sourceElement, this.currentPosition, target);
        }
    };
    /** @private */
    DiagramEventHandler.prototype.getTool = function (action) {
        switch (action) {
            case 'Select':
                return new SelectTool(this.commandHandler, true);
            case 'Drag':
                return new MoveTool(this.commandHandler);
            case 'Rotate':
                return new RotateTool(this.commandHandler);
            case 'LayoutAnimation':
                return new ExpandTool(this.commandHandler);
            case 'FixedUserHandle':
                return new FixedUserHandleTool(this.commandHandler, true);
            case 'Hyperlink':
                return new LabelTool(this.commandHandler);
            case 'ResizeSouthEast':
            case 'ResizeSouthWest':
            case 'ResizeNorthEast':
            case 'ResizeNorthWest':
            case 'ResizeSouth':
            case 'ResizeNorth':
            case 'ResizeWest':
            case 'ResizeEast':
                return new ResizeTool(this.commandHandler, action);
            case 'ConnectorSourceEnd':
            case 'ConnectorTargetEnd':
            case 'BezierSourceThumb':
            case 'BezierTargetThumb':
                return new ConnectTool(this.commandHandler, action);
            case 'SegmentEnd':
            case 'OrthoThumb':
                return new ConnectorEditing(this.commandHandler, action);
            case 'Draw':
                var shape = 'shape';
                var basicShape = 'basicShape';
                var type = findObjectType(this.diagram.drawingObject);
                if (type === 'Node' && this.diagram.drawingObject.shape.type === 'Text') {
                    return new TextDrawingTool(this.commandHandler);
                }
                else if (type === 'Connector' && this.diagram.drawingObject.type === 'Freehand') {
                    return new FreeHandTool(this.commandHandler);
                }
                else if (type === 'Node' && (this.diagram.drawingObject.shape["" + shape] === 'Polygon') &&
                    !(this.diagram.drawingObject.shape.points)) {
                    return new PolygonDrawingTool(this.commandHandler);
                }
                else if (type === 'Node' ||
                    (type === 'Node' && this.diagram.drawingObject.shape["" + shape] === 'Polygon' &&
                        (this.diagram.drawingObject.shape.points))) {
                    return new NodeDrawingTool(this.commandHandler, this.diagram.drawingObject);
                }
                else if (type === 'Connector' && this.diagram.drawingObject.type === 'Polyline') {
                    return new PolyLineDrawingTool(this.commandHandler);
                }
                else if (type === 'Connector') {
                    return new ConnectorDrawingTool(this.commandHandler, 'ConnectorSourceEnd', this.diagram.drawingObject);
                }
                break;
            case 'Pan':
                return new ZoomPanTool(this.commandHandler, false);
            case 'PinchZoom':
                return new ZoomPanTool(this.commandHandler, true);
            case 'PortDrag':
                return new MoveTool(this.commandHandler, 'Port');
            case 'PortDraw':
                return new ConnectorDrawingTool(this.commandHandler, 'ConnectorSourceEnd', this.diagram.drawingObject);
            case 'LabelSelect':
                return new SelectTool(this.commandHandler, true, 'LabelSelect');
            case 'LabelDrag':
                return new LabelDragTool(this.commandHandler);
            case 'LabelResizeSouthEast':
            case 'LabelResizeSouthWest':
            case 'LabelResizeNorthEast':
            case 'LabelResizeNorthWest':
            case 'LabelResizeSouth':
            case 'LabelResizeNorth':
            case 'LabelResizeWest':
            case 'LabelResizeEast':
                return new LabelResizeTool(this.commandHandler, action);
            case 'LabelRotate':
                return new LabelRotateTool(this.commandHandler);
            //for coverage
            // case 'Custom':
            //     return this.diagram.getTool(action);
        }
        return null;
    };
    /** @private */
    DiagramEventHandler.prototype.getCursor = function (action) {
        var object = (this.diagram.selectedItems.annotation) ?
            this.diagram.selectedItems.wrapper.children[0] : this.diagram.selectedItems;
        var rotateAngle = (this.diagram.selectedItems.annotation) ?
            (object.rotateAngle + object.parentTransform) : object.rotateAngle;
        return getCursor(action, rotateAngle);
    };
    //start region - interface betweend diagram and interaction
    /** @private */
    DiagramEventHandler.prototype.findElementUnderMouse = function (obj, position, diagram, padding) {
        return this.objectFinder.findElementUnderSelectedItem(obj, position, diagram, padding);
    };
    /** @private */
    DiagramEventHandler.prototype.findObjectsUnderMouse = function (position, source) {
        return this.objectFinder.findObjectsUnderMouse(position, this.diagram, this.eventArgs, source);
    };
    /** @private */
    DiagramEventHandler.prototype.findObjectUnderMouse = function (objects, action, inAction) {
        return this.objectFinder.findObjectUnderMouse(this.diagram, objects, action, inAction, this.eventArgs, this.currentPosition);
    };
    /** @private */
    DiagramEventHandler.prototype.findTargetUnderMouse = function (objects, action, inAction, position, source) {
        return this.objectFinder.findObjectUnderMouse(this.diagram, objects, action, inAction, this.eventArgs, position, source);
    };
    /** @private */
    DiagramEventHandler.prototype.findActionToBeDone = function (obj, wrapper, position, target) {
        return findToolToActivate(obj, wrapper, this.currentPosition, this.diagram, this.touchStartList, this.touchMoveList, target);
    };
    DiagramEventHandler.prototype.updateContainerBounds = function (isAfterMouseUp) {
        var isGroupAction = false;
        if (this.diagram.selectedObject.helperObject && this.diagram.selectedObject.actualObject) {
            var obj = this.diagram.selectedObject.actualObject;
            var nodes = this.diagram.selectedObject.actualObject instanceof Selector ? obj.nodes : [obj];
            for (var i = 0; i < nodes.length; i++) {
                var node = nodes[parseInt(i.toString(), 10)];
                var boundsUpdate = (this.tool instanceof ResizeTool) ? true : false;
                var parentNode = this.diagram.nameTable[node.parentId];
                if (isAfterMouseUp) {
                    removeChildInContainer(this.diagram, node, this.currentPosition, boundsUpdate);
                }
                else {
                    if (!parentNode || (parentNode && parentNode.shape.type !== 'SwimLane')) {
                        this.diagram.updateDiagramObject(node);
                    }
                    isGroupAction = updateCanvasBounds(this.diagram, node, this.currentPosition, boundsUpdate);
                    this.diagram.updateSelector();
                    if (node.isLane || node.isPhase) {
                        this.diagram.clearSelection();
                        this.commandHandler.selectObjects([node]);
                    }
                }
            }
        }
        return isGroupAction;
    };
    // tslint:disable-next-line:max-func-body-length
    DiagramEventHandler.prototype.updateContainerProperties = function () {
        var helperObject;
        var isChangeProperties = false;
        var hasStack;
        var connectors;
        var hasGroup = false;
        var obj;
        var history = { hasStack: false, isPreventHistory: false };
        if (this.diagram.selectedObject.helperObject) {
            var objects = this.diagram.findObjectsUnderMouse(this.currentPosition);
            var target = this.diagram.findObjectUnderMouse(objects, this.action, this.inAction);
            helperObject = this.diagram.selectedObject.helperObject;
            obj = this.diagram.selectedObject.actualObject;
            if (obj instanceof Node) {
                if (obj.shape.type === 'SwimLane') {
                    connectors = getConnectors(this.diagram, obj.wrapper.children[0], 0, true);
                }
                if (obj.shape.type !== 'SwimLane' && obj.parentId &&
                    this.diagram.getObject(obj.parentId).shape.type === 'SwimLane') {
                    if (target instanceof Node && this.diagram.getObject(target.parentId) &&
                        this.diagram.getObject(target.parentId).shape.type !== 'SwimLane') {
                        target = this.diagram.getObject(target.parentId);
                    }
                }
                if (this.currentAction === 'Drag' && obj.container && obj.container.type === 'Canvas' && obj.parentId &&
                    this.diagram.getObject(obj.parentId).shape.type === 'SwimLane' && target &&
                    target.container && target.container.type === 'Canvas' && target.isLane &&
                    obj.isLane && target.parentId === obj.parentId) {
                    if (target !== obj) {
                        laneInterChanged(this.diagram, obj, target, this.currentPosition);
                    }
                    history.isPreventHistory = true;
                }
                else {
                    var parentNode = this.diagram.nameTable[obj.parentId];
                    if (!parentNode || (parentNode && parentNode.shape.type !== 'SwimLane')) {
                        if (parentNode && parentNode.isLane && (obj.constraints & NodeConstraints.AllowMovingOutsideLane)) {
                            // 915151: Node Becomes Unmovable After Deleting the First Phase
                            var swimlane = this.diagram.getObject(parentNode.parentId);
                            var x = void 0;
                            var y = void 0;
                            if (swimlane.shape.orientation === 'Vertical') {
                                x = swimlane.wrapper.bounds.x + swimlane.shape.phaseSize;
                                y = swimlane.wrapper.bounds.y + swimlane.shape.header.height;
                            }
                            else {
                                var header = swimlane.shape.header.height +
                                    swimlane.shape.phaseSize;
                                x = swimlane.wrapper.bounds.x;
                                y = swimlane.wrapper.bounds.y + header;
                            }
                            var width = swimlane.wrapper.bounds.bottomRight.x - x;
                            var height = swimlane.wrapper.bounds.bottomRight.y - y;
                            var swimlaneBounds = new Rect(x, y, width, height);
                            if (swimlaneBounds.containsPoint(this.currentPosition)) {
                                obj.offsetX = helperObject.offsetX;
                                obj.offsetY = helperObject.offsetY;
                                obj.width = helperObject.width;
                                obj.height = helperObject.height;
                                obj.rotateAngle = helperObject.rotateAngle;
                            }
                        }
                        else {
                            // 902192: Diagram node resized wrongly while dragging with multiple selection Inside a swimlane Issue Fix
                            if (this.diagram.selectedItems.nodes.length === 1) {
                                // Single node move with helper
                                obj.offsetX = helperObject.offsetX;
                                obj.offsetY = helperObject.offsetY;
                                if (obj && obj.shape && obj.shape.type !== 'UmlClassifier') {
                                    obj.width = helperObject.width;
                                    obj.height = helperObject.height;
                                }
                                obj.rotateAngle = helperObject.rotateAngle;
                            }
                            else if (this.diagram.selectedItems.nodes.length > 1) {
                                // Multi selected node move with helper
                                var offsetX = (helperObject.offsetX - this.diagram.selectedItems.offsetX);
                                var offsetY = (helperObject.offsetY - this.diagram.selectedItems.offsetY);
                                var rotateAngle = (helperObject.rotateAngle - this.diagram.selectedItems.rotateAngle);
                                for (var i = 0; i < this.diagram.selectedItems.nodes.length; i++) {
                                    this.diagram.selectedItems.nodes[parseInt(i.toString(), 10)].offsetX += offsetX;
                                    this.diagram.selectedItems.nodes[parseInt(i.toString(), 10)].offsetY += offsetY;
                                    this.diagram.selectedItems.nodes[parseInt(i.toString(), 10)].rotateAngle += rotateAngle;
                                }
                            }
                        }
                    }
                    var undoElement = void 0;
                    if (parentNode && parentNode.container && parentNode.container.type === 'Stack') {
                        this.diagram.startGroupAction();
                        hasGroup = true;
                    }
                    if (!target && parentNode && parentNode.container && parentNode.container.type === 'Stack' && this.action === 'Drag') {
                        var index = parentNode.wrapper.children.indexOf(obj.wrapper);
                        undoElement = { targetIndex: undefined, target: undefined, sourceIndex: index, source: clone(obj) };
                        if (index > -1) {
                            var children = parentNode.children;
                            children.splice(children.indexOf(obj.id), 1);
                            this.diagram.nameTable[obj.id].parentId = '';
                            hasStack = true;
                            parentNode.wrapper.children.splice(index, 1);
                        }
                    }
                    moveChildInStack(obj, target, this.diagram, this.action);
                    parentNode = checkParentAsContainer(this.diagram, obj) ? this.diagram.nameTable[obj.parentId] :
                        (this.diagram.nameTable[obj.parentId] || obj);
                    if (parentNode && parentNode.container && parentNode.container.type === 'Canvas') {
                        parentNode.wrapper.maxWidth = parentNode.maxWidth = parentNode.wrapper.actualSize.width;
                        parentNode.wrapper.maxHeight = parentNode.maxHeight = parentNode.wrapper.actualSize.height;
                        isChangeProperties = true;
                    }
                    if (checkParentAsContainer(this.diagram, obj, true) && parentNode && parentNode.container.type === 'Canvas') {
                        if (this.diagram.selectedItems.nodes.length > 1) {
                            // 902192: Diagram node resized wrongly while dragging with multiple selection Inside a swimlane Issue Fix
                            for (var i = 0; i < this.diagram.selectedItems.nodes.length; i++) {
                                checkChildNodeInContainer(this.diagram, this.diagram.selectedItems.nodes[parseInt(i.toString(), 10)]);
                            }
                        }
                        else {
                            checkChildNodeInContainer(this.diagram, obj);
                        }
                    }
                    else {
                        history = this.updateContainerPropertiesExtend(parentNode, obj, connectors, helperObject, history);
                    }
                    if ((this.diagram.lineRoutingModule && (this.diagram.constraints & DiagramConstraints.LineRouting))
                        && (!checkParentAsContainer(this.diagram, obj, true))) {
                        if (obj.children) {
                            this.diagram.realActions |= RealAction.EnableGroupAction;
                        }
                        this.diagram.nodePropertyChange(obj, {}, {
                            width: obj.width, height: obj.height,
                            offsetX: obj.offsetX, offsetY: obj.offsetY
                        });
                        if (obj.children) {
                            this.diagram.realActions &= ~RealAction.EnableGroupAction;
                        }
                    }
                    if (obj.shape.lanes) {
                        this.updateLaneChildNode(obj);
                    }
                    if (isChangeProperties) {
                        parentNode.maxWidth = parentNode.wrapper.maxWidth = undefined;
                        parentNode.maxHeight = parentNode.wrapper.maxHeight = undefined;
                    }
                    if (hasStack) {
                        this.diagram.nodePropertyChange(parentNode, {}, {
                            offsetX: parentNode.offsetX, offsetY: parentNode.offsetY, width: parentNode.width, height: parentNode.height,
                            rotateAngle: parentNode.rotateAngle
                        });
                        var entry = {
                            redoObject: { sourceIndex: undefined, source: undoElement.source },
                            type: 'StackChildPositionChanged', undoObject: undoElement, category: 'Internal'
                        };
                        if (!(this.diagram.diagramActions & DiagramAction.UndoRedo)) {
                            this.diagram.addHistoryEntry(entry);
                        }
                    }
                    if (obj && obj.container && (obj.container.type === 'Stack' ||
                        (obj.container.type === 'Canvas' && obj.parentId === ''))) {
                        if (obj && obj.shape && obj.shape.type === 'UmlClassifier') {
                            obj.wrapper.measureChildren = true;
                        }
                        this.diagram.nodePropertyChange(obj, {}, {
                            offsetX: obj.offsetX, offsetY: obj.offsetY, width: obj.width, height: obj.height, rotateAngle: obj.rotateAngle
                        });
                        if (obj && obj.shape && obj.shape.type === 'UmlClassifier') {
                            obj.wrapper.measureChildren = false;
                        }
                    }
                }
                updateConnectorsProperties(connectors, this.diagram);
                history.hasStack = hasGroup;
            }
            // Bug:914714 Drag Drop Multi selected nodes between lanes.
            else if (obj instanceof Selector) {
                var offsetX = (helperObject.offsetX - obj.offsetX);
                var offsetY = (helperObject.offsetY - obj.offsetY);
                var rotateAngle = (helperObject.rotateAngle - obj.rotateAngle);
                var width = (helperObject.width - obj.width);
                var height = (helperObject.height - obj.height);
                var scaleWidth = helperObject.width / obj.width;
                var scaleHeight = helperObject.height / obj.height;
                //929543: To resize the multiselected child nodes.
                if (this.tool.corner) {
                    var pivot = this.tool.getPivot(this.tool.corner);
                    for (var i = 0; i < obj.nodes.length; i++) {
                        var node = obj.nodes[parseInt(i.toString(), 10)];
                        var element = node.wrapper;
                        var refWrapper = obj.wrapper;
                        var x = refWrapper.offsetX - refWrapper.actualSize.width * refWrapper.pivot.x;
                        var y = refWrapper.offsetY - refWrapper.actualSize.height * refWrapper.pivot.y;
                        var refPoint = getPoint(x, y, refWrapper.actualSize.width, refWrapper.actualSize.height, refWrapper.rotateAngle, refWrapper.offsetX, refWrapper.offsetY, pivot);
                        this.diagram.commandHandler.scaleObject(scaleWidth, scaleHeight, refPoint, node, element, obj);
                    }
                }
                else {
                    for (var i = 0; i < obj.nodes.length; i++) {
                        var node = obj.nodes[parseInt(i.toString(), 10)];
                        var parentNode = this.diagram.nameTable[node.parentId];
                        if (parentNode && parentNode.shape.type !== 'SwimLane' && checkParentAsContainer(this.diagram, node, true)
                            && parentNode.container.type === 'Canvas') {
                            node.offsetX += offsetX;
                            node.offsetY += offsetY;
                            if (node && node.shape && node.shape.type !== 'UmlClassifier') {
                                node.width += width;
                                node.height += height;
                            }
                            node.rotateAngle += rotateAngle;
                            checkChildNodeInContainer(this.diagram, node);
                        }
                    }
                }
            }
        }
        if (obj && (obj.isPhase || obj.isLane ||
            (obj.shape && obj.shape.type === 'SwimLane'))) {
            this.diagram.updateDiagramElementQuad();
        }
        return history;
    };
    DiagramEventHandler.prototype.updateLaneChildNode = function (obj) {
        for (var i = 0; i < (obj.shape.lanes.length); i++) {
            if (obj.shape.lanes[parseInt(i.toString(), 10)].children
                && obj.shape.lanes[parseInt(i.toString(), 10)].children.length > 0) {
                for (var j = 0; j < obj.shape.lanes[parseInt(i.toString(), 10)].children.length; j++) {
                    var id = obj.shape.lanes[parseInt(i.toString(), 10)].children[parseInt(j.toString(), 10)].id;
                    var childNode = this.diagram.nameTable["" + id];
                    //828489 - Exception occurs while dragging swimlane after adding shape & undo action is performed
                    if (childNode) {
                        childNode.offsetX = childNode.wrapper.offsetX;
                        childNode.offsetY = childNode.wrapper.offsetY;
                    }
                }
            }
        }
    };
    DiagramEventHandler.prototype.updateContainerPropertiesExtend = function (parentNode, obj, connectors, helperObject, history) {
        if (this.currentAction === 'ResizeEast' || this.currentAction === 'ResizeSouth' || obj.shape.type === 'SwimLane') {
            var undoObj = cloneObject(obj);
            var isUpdateRow = false;
            if (parentNode && parentNode.container && parentNode.container.type === 'Grid') {
                var shape = parentNode.shape.type === 'SwimLane' ? true : false;
                var container = (shape ? parentNode.wrapper.children[0] : parentNode.wrapper);
                var padding = shape ? parentNode.shape.padding : undefined;
                var x = parentNode.wrapper.bounds.x;
                var y = parentNode.wrapper.bounds.y;
                if (obj.columnIndex !== undefined && (parentNode.container.orientation === 'Horizontal' &&
                    ((shape && obj.isPhase) || (!shape && obj.rowIndex === 1))) ||
                    (parentNode.container.orientation === 'Vertical' &&
                        ((!shape && obj.rowIndex > 0 && obj.columnIndex > 0) || (shape && obj.isLane)))) {
                    if (parentNode.container.orientation === 'Horizontal' && obj.isPhase && obj.wrapper.width > obj.maxWidth) {
                        obj.maxWidth = obj.wrapper.width;
                        obj.wrapper.maxWidth = obj.wrapper.width;
                    }
                    var colWidthDiff = helperObject.wrapper.actualSize.width - obj.wrapper.actualSize.width;
                    // 910832 - Lane height updating to negative values wrongly during resizing
                    container.updateColumnWidth(obj.columnIndex, helperObject.width, true, padding);
                    updateSwimLaneObject(this.diagram, obj, parentNode, helperObject, colWidthDiff);
                    if (obj.isPhase) {
                        var id = parentNode.shape.phases[obj.columnIndex].header.id;
                        var node = this.diagram.nameTable["" + id];
                        if (node.maxWidth < helperObject.width) {
                            node.maxWidth = helperObject.width;
                            node.wrapper.maxWidth = helperObject.width;
                        }
                    }
                    if (parentNode.shape.type === 'SwimLane') {
                        parentNode.width = (parentNode.width) ? container.width : parentNode.width;
                        updateHeaderMaxWidth(this.diagram, parentNode);
                        parentNode.wrapper.width = parentNode.width;
                        connectors = getConnectors(this.diagram, container, obj.rowIndex, false);
                    }
                }
                else if (obj.rowIndex !== undefined) {
                    isUpdateRow = true;
                    var rowHeightDiff = helperObject.wrapper.actualSize.height - obj.wrapper.actualSize.height;
                    // 910832 - Lane height updating to negative values wrongly during resizing
                    container.updateRowHeight(obj.rowIndex, helperObject.height, true, padding);
                    updateSwimLaneObject(this.diagram, obj, parentNode, helperObject, undefined, rowHeightDiff);
                    if (parentNode.shape.type === 'SwimLane') {
                        parentNode.height = (parentNode.height) ? container.height : parentNode.height;
                        parentNode.wrapper.height = parentNode.height;
                        connectors = getConnectors(this.diagram, container, obj.rowIndex, true);
                    }
                }
                if (parentNode.shape.type === 'SwimLane') {
                    history.isPreventHistory = true;
                }
                this.diagram.nodePropertyChange(parentNode, {}, {
                    offsetX: parentNode.offsetX, offsetY: parentNode.offsetY,
                    rotateAngle: parentNode.rotateAngle
                });
                this.diagram.drag(parentNode, x - parentNode.wrapper.bounds.x, y - parentNode.wrapper.bounds.y);
            }
            else {
                if (obj && obj.shape && obj.shape.type === 'UmlClassifier') {
                    obj.wrapper.measureChildren = true;
                }
                this.diagram.nodePropertyChange(obj, {}, {
                    offsetX: obj.offsetX, offsetY: obj.offsetY, width: obj.width, height: obj.height, rotateAngle: obj.rotateAngle
                });
                obj.wrapper.measureChildren = false;
            }
            obj.wrapper.measure(new Size(obj.wrapper.width, obj.wrapper.height));
            obj.wrapper.arrange(obj.wrapper.desiredSize);
            if (this.currentAction === 'ResizeEast' || this.currentAction === 'ResizeSouth') {
                var redoObject = cloneObject(obj);
                var entry = {
                    category: 'Internal',
                    type: (isUpdateRow) ? 'RowHeightChanged' : 'ColumnWidthChanged',
                    undoObject: undoObj, redoObject: redoObject
                };
                this.diagram.addHistoryEntry(entry);
            }
        }
        updateConnectorsProperties(connectors, this.diagram);
        return history;
    };
    DiagramEventHandler.prototype.addUmlNode = function () {
        var node = this.diagram.selectedItems.nodes[0];
        var objects = this.diagram.findObjectsUnderMouse({ x: this.currentPosition.x + 20, y: this.currentPosition.y });
        var target = this.diagram.findObjectUnderMouse(objects, this.action, this.inAction);
        var attribute;
        var method;
        if (!target) {
            objects = this.diagram.findObjectsUnderMouse({ x: this.currentPosition.x - 20, y: this.currentPosition.y });
            target = this.diagram.findObjectUnderMouse(objects, this.action, this.inAction);
        }
        if (node && node.container && node.container.type === 'Stack' && target && target.parentId
            && target.parentId === node.id) {
            var innerNode = target;
            var adornerSvg = getAdornerLayerSvg(this.diagram.element.id);
            var highlighter = adornerSvg.getElementById(adornerSvg.id + '_stack_highlighter');
            if (highlighter) {
                var index = node.wrapper.children.indexOf(target.wrapper) + 1;
                this.diagram.enableServerDataBinding(false);
                var temp = new Node(this.diagram, 'nodes', {
                    style: {
                        fill: node.style.fill,
                        strokeColor: (node.style.strokeColor === 'black') ? '#ffffff00' : node.style.strokeColor
                    },
                    annotations: target.annotations, verticalAlignment: 'Stretch', horizontalAlignment: 'Stretch',
                    constraints: (NodeConstraints.Default | NodeConstraints.HideThumbs) & ~(NodeConstraints.Rotate | NodeConstraints.Drag | NodeConstraints.Resize),
                    minHeight: 25
                }, true);
                temp.annotations[0].content = ' + Name : Type';
                var id = innerNode.id.split('_');
                temp.id = randomId() + temp.id;
                temp.parentId = node.id;
                temp.zIndex = -1;
                temp.umlIndex = index;
                this.diagram.startGroupAction();
                var child = { name: 'Name', type: 'Type' };
                //While dynamically adding nodes at runtime using the isSeparator highlighter, make sure to include the newly added nodes in the existing arrays of the UML node for the respective child types.
                if (node.shape.classifier === 'Class') {
                    if (target.id.includes('_umlProperty') && node.shape.classShape.attributes.length > 0) {
                        attribute = new UmlClassAttribute(node, '', child);
                        node.shape.classShape.attributes.push(attribute);
                    }
                    else if (target.id.includes('_umlMethods') && node.shape.classShape.methods.length > 0) {
                        method = new UmlClassMethod(node, '', child);
                        node.shape.classShape.methods.push(method);
                    }
                }
                if (node.shape.classifier === 'Interface') {
                    if (target.id.includes('_umlProperty') && node.shape.interfaceShape.attributes.length > 0) {
                        attribute = new UmlClassAttribute(node, '', child);
                        node.shape.classShape.attributes.push(attribute);
                    }
                    else if (target.id.includes('_umlMethods') && node.shape.interfaceShape.methods.length > 0) {
                        method = new UmlClassMethod(node, '', child);
                        node.shape.interfaceShape.methods.push(method);
                    }
                }
                if (node.shape.classifier === 'Enumeration') {
                    if (target.id.includes('_umlMember') && node.shape.enumerationShape.members.length > 0) {
                        var member = new UmlEnumerationMember(node, '', child);
                        node.shape.enumerationShape.members.push(member);
                    }
                }
                var redoElement = {
                    sourceIndex: node.wrapper.children.indexOf(temp.wrapper), source: temp,
                    target: undefined, targetIndex: undefined
                };
                this.diagram.enableServerDataBinding(true);
                this.diagram.add(temp);
                this.diagram.updateConnectorEdges(node);
                this.diagram.clearSelection();
                this.diagram.select([this.diagram.nameTable[temp.id]]);
                this.diagram.endGroupAction();
                this.diagram.startTextEdit();
            }
        }
    };
    return DiagramEventHandler;
}());
export { DiagramEventHandler };
/** @private */
var ObjectFinder = /** @class */ (function () {
    function ObjectFinder() {
    }
    /** @private */
    ObjectFinder.prototype.findObjectsUnderMouse = function (pt, diagram, eventArgs, source, actions) {
        // finds the collection of the object that is under the mouse;
        var actualTarget = [];
        if (source && source instanceof Selector) {
            if (source.nodes.length + source.connectors.length === 1) {
                source = (source.nodes[0] || source.connectors[0]);
                if (source.children && source.children.length === 0) {
                    eventArgs.actualObject = source;
                }
            }
        }
        var container;
        var bounds;
        var child;
        var matrix;
        var endPadding = (source && (source instanceof Connector) &&
            ((source.constraints & ConnectorConstraints.ConnectToNearByNode) ||
                (source.constraints & ConnectorConstraints.ConnectToNearByPort)) && source.connectionPadding) || 0;
        var objArray = diagram.spatialSearch.findObjects(new Rect(pt.x - 50 - endPadding, pt.y - 50 - endPadding, 100 + endPadding, 100 + endPadding));
        var layerObjTable = {};
        var layerTarger;
        for (var _i = 0, objArray_1 = objArray; _i < objArray_1.length; _i++) {
            var obj = objArray_1[_i];
            var point = pt;
            bounds = obj.wrapper.outerBounds;
            var pointInBounds = (obj.rotateAngle) ? false : bounds.containsPoint(point, endPadding);
            if ((obj !== source || diagram.currentDrawingObject instanceof Connector) &&
                (obj instanceof Connector) ? obj !== diagram.currentDrawingObject : true && obj.wrapper.visible) {
                var layer = diagram.commandHandler.getObjectLayer(obj.id);
                if (layer && !layer.lock && layer.visible) {
                    layerTarger = layerObjTable[layer.zIndex] = layerObjTable[layer.zIndex] || [];
                    if (obj.rotateAngle) {
                        container = obj.wrapper;
                        bounds = cornersPointsBeforeRotation(container);
                        for (var _a = 0, _b = container.children; _a < _b.length; _a++) {
                            child = _b[_a];
                            matrix = identityMatrix();
                            rotateMatrix(matrix, -(child.rotateAngle + child.parentTransform), child.offsetX, child.offsetY);
                            point = transformPointByMatrix(matrix, pt);
                            if (cornersPointsBeforeRotation(child).containsPoint(point, endPadding)) {
                                pointInBounds = true;
                            }
                        }
                    }
                    if (!source || (isSelected(diagram, obj) === false)) {
                        if (canEnablePointerEvents(obj, diagram)) {
                            if ((obj instanceof Connector) ? isPointOverConnector(obj, pt) : pointInBounds) {
                                var padding = (obj instanceof Connector) ? obj.hitPadding || 0 : 0; //let element: DiagramElement;
                                var element = this.findElementUnderMouse(obj, pt, diagram, endPadding || padding);
                                if (element && obj.id !== 'helper') {
                                    insertObject(obj, 'zIndex', layerTarger);
                                }
                            }
                        }
                    }
                }
            }
        }
        for (var _c = 0, _d = diagram.layers; _c < _d.length; _c++) {
            var layer = _d[_c];
            actualTarget = actualTarget.concat(layerObjTable[layer.zIndex] || []);
            for (var _e = 0, actualTarget_1 = actualTarget; _e < actualTarget_1.length; _e++) {
                var obj = actualTarget_1[_e];
                var eventHandler = 'eventHandler';
                if (obj.shape.type === 'Bpmn' && obj.processId && (!(diagram["" + eventHandler].tool instanceof MoveTool) ||
                    (diagram["" + eventHandler].tool instanceof MoveTool) && canAllowDrop(obj))) {
                    var index = actualTarget.indexOf(diagram.nameTable[obj.processId]);
                    if (index > -1) {
                        actualTarget.splice(index, 1);
                    }
                }
                if (obj.shape.type === 'UmlClassifier' && obj.container && obj.container.type === 'Stack') {
                    var index = actualTarget.indexOf(diagram.nameTable[diagram.nameTable[obj.id].wrapper.children[0].id]);
                    if (index > -1) {
                        actualTarget.splice(index, 1);
                    }
                }
            }
        }
        for (var i = 0; i < actualTarget.length; i++) {
            var parentObj = diagram.nameTable[actualTarget[parseInt(i.toString(), 10)].parentId];
            if (parentObj) {
                var portElement = this.findElementUnderMouse(parentObj, pt, diagram);
                for (var j = 0; j < parentObj.ports.length; j++) {
                    if (portElement && portElement.id.match('_' + parentObj.ports[parseInt(j.toString(), 10)].id + '$')) {
                        var port = parentObj.ports[parseInt(j.toString(), 10)];
                        if (canDrag(port, diagram) || canDraw(port, diagram)) {
                            return actualTarget;
                        }
                    }
                }
            }
            while (parentObj) {
                var index = actualTarget.indexOf(parentObj);
                if (index !== -1) {
                    actualTarget.splice(index, 1);
                }
                else {
                    break;
                }
                parentObj = diagram.nameTable[parentObj.parentId];
            }
        }
        this.checkSwimlane(actualTarget, diagram);
        if (eventArgs && !eventArgs.source) {
            for (var i = 0; i < actualTarget.length; i++) {
                var parentNode = diagram.nameTable[actualTarget[parseInt(i.toString(), 10)].parentId];
                if (parentNode && parentNode.shape.type === 'SwimLane') {
                    for (var j = 0; j < actualTarget.length; j++) {
                        var connector = actualTarget[parseInt(j.toString(), 10)];
                        if (connector instanceof Connector) {
                            actualTarget.splice(i, 1);
                        }
                    }
                }
            }
        }
        return actualTarget;
    };
    /** @private */
    ObjectFinder.prototype.checkSwimlane = function (actualTarget, diagram) {
        var isNode;
        for (var m = 0; m < actualTarget.length; m++) {
            var obj = actualTarget[parseInt(m.toString(), 10)];
            var parentNode = void 0;
            var node = void 0;
            if (obj instanceof Node) {
                parentNode = actualTarget[parseInt(m.toString(), 10)].parentId;
                node = obj;
            }
            if (parentNode === '') {
                if (node.shape.type !== 'SwimLane') {
                    isNode = true;
                }
                else {
                    isNode = false;
                }
            }
            var parent_2 = diagram.nameTable["" + parentNode];
            if (parent_2 && parent_2.isLane && diagram.nameTable[parent_2.parentId].zIndex > obj.zIndex) {
                actualTarget[parseInt(m.toString(), 10)] = parent_2;
            }
            if (m > 0 && isNode && node && (node.isLane || node.isPhase || node.isHeader)) {
                if (actualTarget[parseInt(m.toString(), 10)].zIndex < actualTarget[m - 1].zIndex) {
                    var swap = actualTarget[parseInt(m.toString(), 10)];
                    actualTarget[parseInt(m.toString(), 10)] = actualTarget[m - 1];
                    actualTarget[m - 1] = swap;
                }
            }
        }
        if (actualTarget.length >= 2) {
            var parent_3 = '';
            for (var i = actualTarget.length - 1; i >= 0; i--) {
                if (actualTarget[parseInt(i.toString(), 10)].parentId) {
                    var parent1 = findParentInSwimlane(actualTarget[parseInt(i.toString(), 10)], diagram, parent_3);
                    var parent2 = findParentInSwimlane(actualTarget[i - 1], diagram, parent_3);
                    var parentNode1 = diagram.nameTable["" + parent1];
                    var parentNode2 = diagram.nameTable["" + parent2];
                    if (parentNode2 && parent1 !== parent2 && parentNode1.zIndex < parentNode2.zIndex) {
                        actualTarget.splice(i, 1);
                    }
                }
            }
        }
    };
    /** @private */
    ObjectFinder.prototype.isTarget = function (actualTarget, diagram, action) {
        var connector = diagram.selectedItems.connectors[0];
        var node;
        node = action === 'ConnectorSourceEnd' ? diagram.nameTable[connector.targetID] :
            node = diagram.nameTable[connector.sourceID];
        if (node && !(node.processId && !actualTarget.processId
            || node.processId !== actualTarget.processId)) {
            if (node.processId !== actualTarget.processId) {
                actualTarget = null;
            }
            if (actualTarget && actualTarget.parentId &&
                diagram.nameTable[actualTarget.parentId].shape.type === 'UmlClassifier') {
                actualTarget = diagram.nameTable[actualTarget.parentId];
            }
        }
        if (action === 'ConnectorSourceEnd' && connector.targetID) {
            var targetNode = diagram.nameTable[connector.targetID];
            if (targetNode && targetNode.shape && (targetNode.shape.shape === 'TextAnnotation')) {
                var id = connector.id.split('_');
                if (((targetNode.shape.type === 'Bpmn') && actualTarget.shape.type !== 'Bpmn') || (id[0] === actualTarget.id) ||
                    actualTarget.shape.shape === 'TextAnnotation') {
                    actualTarget = null;
                }
                if (actualTarget && actualTarget.parentId &&
                    diagram.nameTable[actualTarget.parentId].shape.type === 'UmlClassifier') {
                    actualTarget = diagram.nameTable[actualTarget.parentId];
                }
            }
        }
        //908151: The connector automatically connects to the subprocess
        //909560: prevent child connector connecting to its own parent group
        //937174: Drag and drop subprocess and add children try to connect with connector throw exception
        if (actualTarget && ((node && actualTarget.id === node.processId) ||
            ((action === 'ConnectorSourceEnd' || action === 'ConnectorTargetEnd') && actualTarget.id === connector.parentId))) {
            actualTarget = null;
        }
        return actualTarget;
    };
    /* tslint:disable */
    /** @private */
    ObjectFinder.prototype.findObjectUnderMouse = function (diagram, objects, action, inAction, eventArg, position, source) {
        //we will get the wrapper object here
        //we have to choose the object to be interacted with from the given wrapper
        //Find the object that is under mouse
        var eventHandler = 'eventHandler';
        var endPoint = 'endPoint';
        var inPort;
        var outPort;
        var actualTarget = null;
        if (objects.length !== 0) {
            if (source && source instanceof Selector) {
                if (source.nodes.length + source.connectors.length === 1) {
                    source = (source.nodes[0] || source.connectors[0]);
                }
            }
            if ((action === 'ConnectorSourceEnd' && source || action === 'PortDraw') ||
                ((canDrawOnce(diagram) || canContinuousDraw(diagram)) && getObjectType(diagram.drawingObject) === Connector)) {
                var connector = diagram.selectedItems.connectors[0];
                for (var i = objects.length - 1; i >= 0; i--) {
                    outPort = getInOutConnectPorts(objects[parseInt(i.toString(), 10)], false);
                    inPort = getInOutConnectPorts(objects[parseInt(i.toString(), 10)], true);
                    var tool = diagram["" + eventHandler].tool;
                    var portElement = this.findTargetElement(objects[parseInt(i.toString(), 10)].wrapper, position, diagram, undefined);
                    if (action === 'Draw' && portElement && (objects[parseInt(i.toString(), 10)] instanceof Node || objects[parseInt(i.toString(), 10)] instanceof Connector) && !checkPort(objects[parseInt(i.toString(), 10)], portElement)) {
                        if (((tool && tool["" + endPoint] === 'ConnectorSourceEnd') && !canOutConnect(objects[parseInt(i.toString(), 10)])) ||
                            ((tool && tool["" + endPoint] === 'ConnectorTargetEnd') && !canInConnect(objects[parseInt(i.toString(), 10)]))) {
                            return actualTarget;
                        }
                    }
                    // eslint-disable-next-line max-len
                    if ((objects[parseInt(i.toString(), 10)] instanceof Node) || (objects[parseInt(i.toString(), 10)] instanceof Connector) && ((canOutConnect(objects[parseInt(i.toString(), 10)]) || (canPortOutConnect(outPort)) || canInConnect(objects[parseInt(i.toString(), 10)]) || (canPortInConnect(inPort))) ||
                        (action === 'PortDraw' && (tool instanceof ConnectTool) && tool["" + endPoint] === 'ConnectorTargetEnd' &&
                            (canInConnect(objects[parseInt(i.toString(), 10)]) || (canPortInConnect(inPort)))))) {
                        actualTarget = objects[parseInt(i.toString(), 10)];
                        if (connector) {
                            actualTarget = this.isTarget(actualTarget, diagram, action);
                        }
                        eventArg.actualObject = actualTarget;
                        return actualTarget;
                    }
                }
            }
            else if (action === 'ConnectorTargetEnd' && source) {
                for (var i = objects.length - 1; i >= 0; i--) {
                    inPort = getInOutConnectPorts(objects[parseInt(i.toString(), 10)], true);
                    if ((objects[parseInt(i.toString(), 10)] instanceof Node || objects[parseInt(i.toString(), 10)] instanceof Connector)
                        && (canInConnect(objects[parseInt(i.toString(), 10)]) || (canPortInConnect(inPort)))) {
                        actualTarget = objects[parseInt(i.toString(), 10)];
                        actualTarget = this.isTarget(actualTarget, diagram, action);
                        eventArg.actualObject = actualTarget;
                        return actualTarget;
                    }
                }
            }
            else if (source && (action === 'Drag' || (diagram["" + eventHandler].tool instanceof MoveTool))) {
                var index = 0;
                for (var i = 0; i < objects.length; i++) {
                    var temp = objects[parseInt(i.toString(), 10)];
                    if (source !== temp && (temp instanceof Connector ||
                        !position || temp.wrapper.bounds.containsPoint(position))) {
                        if (canAllowDrop(temp)) {
                            if (!actualTarget) {
                                actualTarget = temp;
                                index = actualTarget.zIndex;
                            }
                            else {
                                actualTarget = index >= temp.zIndex ? actualTarget : temp;
                                index = Math.max(index, temp.zIndex);
                            }
                        }
                    }
                }
                if (actualTarget && actualTarget.shape.type === 'Bpmn') {
                    if (diagram.selectedItems.nodes.length > 0 && diagram.selectedItems.nodes[0].shape.type === 'Bpmn') {
                        // eslint-disable-next-line no-self-assign
                        actualTarget = actualTarget;
                    }
                    else {
                        actualTarget = null;
                    }
                }
                if (actualTarget) {
                    eventArg.actualObject = actualTarget;
                }
                return actualTarget;
            }
            else if ((action === 'Select' || action === 'Pan') && diagram["" + eventHandler].tool) {
                for (var i = objects.length - 1; i >= 0; i--) {
                    if (objects[parseInt(i.toString(), 10)] instanceof Connector) {
                        var objj1 = objects[i - 1];
                        if (objects[i - 1] instanceof Node && objj1.ports) {
                            var portElement = this.findTargetElement(objj1.wrapper, position, diagram, undefined);
                            if ((portElement && (portElement.id.match('_icon_content_shape$') || portElement.id.match('_icon_content_rect$')))) {
                                return objj1;
                            }
                            for (var j = 0; j < objj1.ports.length; j++) {
                                if (portElement && portElement.id.match('_' + objj1.ports[parseInt(j.toString(), 10)].id + '$')) {
                                    if (canDraw(objj1.ports[parseInt(j.toString(), 10)], diagram)) {
                                        return objj1;
                                    }
                                }
                            }
                        }
                    }
                }
                actualTarget = objects[objects.length - 1];
                eventArg.actualObject = actualTarget;
                if (!diagram["" + eventHandler].itemClick(actualTarget, true)) {
                    if (actualTarget.parentId) {
                        var obj = actualTarget;
                        var selected = isSelected(diagram, obj);
                        while (obj) {
                            if (isSelected(diagram, obj) && !selected) {
                                break;
                            }
                            actualTarget = obj;
                            // 912178-Tooltip for node is not shown when grouped at runtime
                            if (obj.tooltip.content !== '') {
                                break;
                            }
                            obj = diagram.nameTable[obj.parentId];
                        }
                    }
                }
            }
            else if (action === 'Pan' || action === 'LayoutAnimation') {
                for (var i = objects.length - 1; i >= 0; i--) {
                    if (objects[parseInt(i.toString(), 10)] instanceof Node || objects[parseInt(i.toString(), 10)] instanceof Connector) {
                        var portElement = this.findTargetElement(objects[parseInt(i.toString(), 10)].wrapper, position, diagram, undefined);
                        if ((action === 'Pan') || ((portElement && (portElement.id.match('_icon_content_shape$') || portElement.id.match('_icon_content_rect$'))))) {
                            return objects[parseInt(i.toString(), 10)];
                        }
                    }
                }
            }
            else {
                actualTarget = objects[objects.length - 1];
                if (eventArg && actualTarget) {
                    eventArg.actualObject = actualTarget;
                }
            }
        }
        return actualTarget;
    };
    /* tslint:enable */
    /** @private */
    ObjectFinder.prototype.findElementUnderSelectedItem = function (obj, position, diagram, padding) {
        //rewrite this for multiple selection
        if (obj instanceof Selector) {
            if (obj.nodes.length === 1 && (!obj.connectors || !obj.connectors.length)) {
                return this.findElementUnderMouse(obj.nodes[0], position, diagram);
            }
            else if ((!obj.nodes || obj.nodes.length) && obj.connectors.length === 1) {
                return this.findElementUnderMouse(obj.connectors[0], position, diagram);
            }
        }
        else {
            return this.findElementUnderMouse(obj, position, diagram, padding);
        }
        return null;
    };
    ObjectFinder.prototype.findElementUnderMouse = function (obj, position, diagram, padding) {
        return this.findTargetElement(obj.wrapper, position, diagram, padding);
    };
    /** @private */
    ObjectFinder.prototype.findTargetElement = function (container, position, diagram, padding) {
        for (var i = container.children.length - 1; i >= 0; i--) {
            var element = container.children[parseInt(i.toString(), 10)];
            //Checking whether the annotation is visible or not
            if (element && element.outerBounds.containsPoint(position, padding || 0)) {
                if (element.visible) {
                    if (element instanceof Container) {
                        var target = this.findTargetElement(element, position, diagram);
                        if (target) {
                            return target;
                        }
                    }
                    //EJ2-69047 - Node selection is improper while adding annotation for multiple nodes
                    //Checked textOverflow property to avoid the selection of text element with clip and ellipsis;
                    var textOverflow = (element.style.textOverflow === 'Clip' || element.style.textOverflow === 'Ellipsis');
                    if (element.bounds.containsPoint(position, padding || 0) && !textOverflow) {
                        return element;
                    }
                    else if (container.bounds.containsPoint(position, padding || 0) && textOverflow) {
                        // 913240 - Tooltip for annotation not visible while text overflow sets to Clip or Ellipsis
                        return element;
                    }
                }
                //(EJ2-840331)Double click on node annotation will open the edit of invisible annotation
                else if (element instanceof PathElement && container && container.id) {
                    var getNode = void 0;
                    if (container.id.includes('group_container')) {
                        var getId = container.id.slice(0, -15);
                        getNode = diagram.getObject(getId);
                    }
                    else {
                        getNode = diagram.getObject(container.id);
                    }
                    var port = findPort(getNode, element.id);
                    // 913000: Connector not connected to port when visibility hidden
                    if (port) {
                        return element;
                    }
                }
            }
        }
        if (container.bounds.containsPoint(position, padding) && container.style.fill !== 'none') {
            return container;
        }
        return null;
    };
    return ObjectFinder;
}());
